/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2007 by OpenMFG, LLC
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 * Please contact info@openmfg.com with any questions on this license.
 */

#include "reporthandler.h"
#include "reportgridoptions.h"
#include "reportwindow.h"
#include "reportsection.h"
#include "reportentities.h"
#include "data.h"

// dialogs
#include "dbfiledialog.h"
#include "editpreferences.h"

// common
#include <login.h>
#include <parsexmlutils.h>
#include <parameter.h>

// qt
#include <QApplication>
#include <QSqlDatabase>
#include <QMessageBox>
#include <QCursor>
#include <QEvent>
#include <QToolBar>
#include <QMenuBar>
#include <QRect>
#include <QMainWindow>
#include <QAction>
#include <Q3Canvas>
#include <QPixmap>
#include <QFile>
#include <QFileDialog>
#include <QInputDialog>
#include <QSpinBox>
#include <QWorkspace>
#include <QMouseEvent>
#include <Q3ValueList>
#include <QDesktopWidget>

//int dpi  = 72; // assume a 72 dpi until we can get to the code that sets the proper value
int dpiX = 72;
int dpiY = 72;

QString strMenuConnect = QObject::tr("Connect to Database");
QString strMenuDisconnect = QObject::tr("Disconnect from Database");

QRect padRect(QRect r)
{
  return QRect(r.x() - 3, r.y() - 3, r.width() + 6, r.height() + 6);
}

class ReportWriterCopyData
{
  public:
    ReportWriterCopyData()
    {
      copy_item = 0;
    }

    // copy information
    int copy_offset_x;
    int copy_offset_y;

    int copy_item; // the item type that we have information on

    QString copy_str1;     // string 1 (label:text  field/text/barcode/image:queryname)
    QString copy_str2;     // string 2 (field/text/barcode/image:column)
    QString copy_str3;     // string 3 (barcode:format image:inlineImageData field:trackTotalFormat)
    QString copy_str4;     // string 4 (image:mode)

    QFont copy_font;       // font (label/field/text:font)
    QRect copy_rect;       // rect (all but line)

    double copy_dbl;       // text bottom padding
    int    copy_int1;      // line:startx barcode:maxlength
    int    copy_int2;      // line:starty barcode:alignment
    int    copy_int3;      // line:endx
    int    copy_int4;      // line:endy
    int    copy_int5;      // line:weight

    bool   copy_bool1;     // image:isInline field:trackTotal
    bool   copy_bool2;     // field: trackBuiltinFormat
    bool   copy_bool3;     // field: useSubTotal

    ORGraphData copy_graph; // graph
};

//
// define and implement the ReportWriterSectionData class
// a simple class to hold/hide data in the ReportHandler class
//
class ReportWriterSectionData
{
  public:
    ReportWriterSectionData()
    {
      selected_items.clear();
      selected_items_rw = 0;
      mouseAction = ReportWriterSectionData::MA_None;
      insertItem = NoItem;
      copy_canvas = 0;
      copy_rw = 0;
    }
    virtual ~ReportWriterSectionData()
    {
      selected_items.clear();
      selected_items_rw = 0;
      copy_canvas = 0;
      copy_rw = 0;
    }

    enum ItemType
    {
      NoItem = 0,
      LabelItem,
      FieldItem,
      TextItem,
      LineItem,
      BarcodeItem,
      ImageItem,
      GraphItem
    };
    enum MouseAction
    {
      MA_None = 0,
      MA_Insert = 1,
      MA_Grab = 2,
      MA_MoveStartPoint,
      MA_MoveEndPoint,
      MA_ResizeNW = 8,
      MA_ResizeN,
      MA_ResizeNE,
      MA_ResizeE,
      MA_ResizeSE,
      MA_ResizeS,
      MA_ResizeSW,
      MA_ResizeW
    };

    int selected_x_offset;
    int selected_y_offset;

    //QCanvasItem * selected_item;
    Q3CanvasItemList selected_items;
    ReportWindow * selected_items_rw;

    MouseAction mouseAction;
    ItemType insertItem;

    // copy data
    int copy_x_pos;        // the base x position of the copy (typically the first items original pos)
    int copy_y_pos;        // the base y position of the copy (typically the first items original pos)
    Q3ValueList<ReportWriterCopyData> copy_list;
    Q3Canvas * copy_canvas; // the canvas of the original copied item
    ReportWindow * copy_rw; // the ReportWindow of the original copied item
};


//
// Constructor(s)
//
ReportHandler::ReportHandler(QObject * parent, const char * name)
  : QObject(parent, name)
{
  // initialize data
  _parentWindow = 0;
  _parentWindowIsWorkspace = false;
  _noDatabase = FALSE;
  _allowDBConnect = TRUE;
  _placeMenusOnWindows = FALSE;
  _placeToolbarsOnWindows = FALSE;

  Q_INIT_RESOURCE(OpenRPTWrtembed);

  gridOptions = new ReportGridOptions(qApp->desktop()->logicalDpiX(),
                                      qApp->desktop()->logicalDpiY(),
                                      this, "grid options");
  sectionData = new ReportWriterSectionData();

  fileNewAction = new QAction( QIcon(":/OpenRPT/icons/document_32.png"),
                              tr("&New File"),Qt::CTRL+Qt::Key_N,this,"file new");
  fileOpenAction = new QAction( QIcon(":/OpenRPT/icons/files_zoom_32.png"),
                               tr("&Open File..."),Qt::CTRL+Qt::Key_O,this,"file open");
  fileSaveAction = new QAction( QIcon(":/OpenRPT/icons/diskette_32.png"),
                               tr("&Save File"),Qt::CTRL+Qt::Key_S,this,"file save");
  fileSaveAsAction = new QAction( tr("Save &As..."),0,this,"file save as");
  fileCloseAction = new QAction( tr("&Close"),Qt::CTRL+Qt::Key_F4,this,"file close");
  fileExitAction = new QAction( tr("E&xit"),Qt::ALT+Qt::Key_F4,this,"file exit");

  editCutAction = new QAction( QIcon(":/OpenRPT/icons/scissors_32.png"),
                              tr("Cu&t"), Qt::CTRL+Qt::Key_X, this, "edit cut");
  editCopyAction = new QAction( QIcon(":/OpenRPT/icons/copy_32.png"),
                               tr("&Copy"), Qt::CTRL+Qt::Key_C, this, "edit copy");
  editPasteAction = new QAction( QIcon(":/OpenRPT/icons/paste_32.png"),
                                tr("&Paste"), Qt::CTRL+Qt::Key_V, this, "edit paste");
  editDeleteAction = new QAction( QIcon(":/OpenRPT/icons/delete_32.png"),
                                 tr("&Delete"), Qt::Key_Delete, this, "edit delete");
  editPreferencesAction = new QAction( QIcon(":/OpenRPT/icons/font_32.png"),
                                      tr("Preferences"), 0, this, "edit preferences");

  gridShowAction = new QAction( QIcon(":/OpenRPT/icons/numeric_field_32.png"),
                               tr("Align to Grid"), 0, this, "grid show");
  gridShowAction->setCheckable(true);
  gridShowAction->setOn(gridOptions->isVisible());

  gridSnapAction = new QAction( QIcon(":/OpenRPT/icons/numeric_field_ok_32.png"),
                               tr("Snap to Grid"), 0, this, "grid snap");
  gridSnapAction->setCheckable(true);
  gridSnapAction->setOn(gridOptions->isSnap());

  itemLabelAction = new QAction( QIcon(":/OpenRPT/icons/attribute_32.png"),
                                tr("Insert Label"), 0, this, "item label");
  itemFieldAction = new QAction( QIcon(":/OpenRPT/icons/filed_32.png"),
                                tr("Insert Field"), 0, this, "item field");
  itemTextAction = new QAction( QIcon(":/OpenRPT/icons/text_field_32.png"),
                               tr("Insert Text"), 0, this, "item text");
  itemLineAction = new QAction( QIcon(":/OpenRPT/icons/line_32.png"),
                               tr("Insert Line"), 0, this, "item line");
  itemBarcodeAction = new QAction( QIcon(":/OpenRPT/icons/barcode_32.png"),
                                  tr("Insert Bar Code"), 0, this, "item barcode");
  itemImageAction = new QAction( QIcon(":/OpenRPT/icons/image_field_32.png"),
                                tr("Insert Image"), 0, this, "item image");
  itemGraphAction = new QAction( QIcon(":/OpenRPT/icons/statistic_32.png"),
                                tr("Insert Chart/Graph"), 0, this, "item graph");

  dbConnectAction = new QAction( strMenuConnect, 0, this, "db connect");
  dbLoadAction = new QAction( QIcon(":/OpenRPT/icons/export_database_32.png"),
                             tr("Load from Database"), 0, this, "db load");
  dbSaveAction = new QAction( QIcon(":/OpenRPT/icons/database_add_32.png"),
                             tr("Save to Database"), 0, this, "db save");


  // connect the actions to various slots so they functions properly
  connect(fileNewAction, SIGNAL(activated()), this, SLOT(fileNew()));
  connect(fileOpenAction, SIGNAL(activated()), this, SLOT(fileOpen()));
  connect(fileSaveAction, SIGNAL(activated()), this, SLOT(fileSave()));
  connect(fileSaveAsAction, SIGNAL(activated()), this, SLOT(fileSaveAs()));
  connect(fileCloseAction, SIGNAL(activated()), this, SLOT(fileClose()));
  connect(editCutAction, SIGNAL(activated()), this, SLOT(editCut()));
  connect(editCopyAction, SIGNAL(activated()), this, SLOT(editCopy()));
  connect(editPasteAction, SIGNAL(activated()), this, SLOT(editPaste()));
  connect(editDeleteAction, SIGNAL(activated()), this, SLOT(editDelete()));
  connect(editPreferencesAction, SIGNAL(activated()), this, SLOT(editPreferences()));
  connect(gridShowAction, SIGNAL(toggled(bool)), gridOptions, SLOT(setVisible(bool)));
  connect(gridSnapAction, SIGNAL(toggled(bool)), gridOptions, SLOT(setSnap(bool)));
  connect(itemLabelAction, SIGNAL(activated()), this, SLOT(itemLabel()));
  connect(itemFieldAction, SIGNAL(activated()), this, SLOT(itemField()));
  connect(itemTextAction, SIGNAL(activated()), this, SLOT(itemText()));
  connect(itemLineAction, SIGNAL(activated()), this, SLOT(itemLine()));
  connect(itemBarcodeAction, SIGNAL(activated()), this, SLOT(itemBarcode()));
  connect(itemImageAction, SIGNAL(activated()), this, SLOT(itemImage()));
  connect(itemGraphAction, SIGNAL(activated()), this, SLOT(itemGraph()));
  connect(dbConnectAction, SIGNAL(activated()), this, SLOT(dbConnect()));
  connect(dbLoadAction, SIGNAL(activated()), this, SLOT(dbLoadDoc()));
  connect(dbSaveAction, SIGNAL(activated()), this, SLOT(dbSaveDoc()));
}

ReportHandler::~ReportHandler()
{
}

//
// toolbar and menu creation methods
//
void ReportHandler::docToolBars(QMainWindow * mw, Qt::ToolBarDock /*edge*/, bool /*newLine*/)
{
  if(mw)
  {
    // create the toolbars
    QToolBar * tbFiles = mw->addToolBar(tr("File Operations"));
    tbFiles->setIconSize(QSize(32, 32));
    tbFiles->addAction(fileNewAction);
    tbFiles->addAction(fileOpenAction);
    tbFiles->addAction(fileSaveAction);

    QToolBar * tbDatabase = mw->addToolBar(tr("Database Operations"));
    tbDatabase->setIconSize(QSize(32, 32));
    tbDatabase->addAction(dbLoadAction);
    tbDatabase->addAction(dbSaveAction);

    QToolBar * tbEdit = mw->addToolBar(tr("Edit Operations"));
    tbEdit->setIconSize(QSize(32, 32));
    tbEdit->addAction(editCutAction);
    tbEdit->addAction(editCopyAction);
    tbEdit->addAction(editPasteAction);
    tbEdit->addAction(editDeleteAction);
  
    QToolBar * tbOptions = mw->addToolBar(tr("Layout Options"));
    tbOptions->setIconSize(QSize(32, 32));
    tbOptions->addAction(gridShowAction);
    tbOptions->addAction(gridSnapAction);
    tbOptions->addAction(editPreferencesAction);

    QToolBar * tbItems = mw->addToolBar(tr("Report Elements"));
    tbItems->setIconSize(QSize(32, 32));
    tbItems->addAction(itemLabelAction);
    tbItems->addAction(itemFieldAction);
    tbItems->addAction(itemTextAction);
    tbItems->addAction(itemLineAction);
    tbItems->addAction(itemBarcodeAction);
    tbItems->addAction(itemImageAction);
    tbItems->addAction(itemGraphAction);
  }
}

QAction * ReportHandler::populateMenuBar(QMenuBar * menubar, QAction * exitAction)
{
  QMenu * mFile = menubar->addMenu(tr("&File"));
  fileNewAction->addTo(mFile);
  fileOpenAction->addTo(mFile);
  fileSaveAction->addTo(mFile);
  fileSaveAsAction->addTo(mFile);
  fileCloseAction->addTo(mFile);
  if(exitAction)
  {
    mFile->insertSeparator();
    exitAction->addTo(mFile);
  }

  if(!_noDatabase)
  {
    QMenu * mDb = menubar->addMenu(tr("Data&base"));
    connect(mDb, SIGNAL(aboutToShow()), this, SLOT(dbMenuAboutToShow()));
    dbLoadAction->addTo(mDb);
    dbSaveAction->addTo(mDb);
    if(_allowDBConnect)
    {
      mDb->insertSeparator();
      dbConnectAction->addTo(mDb);
    }
  }

  QMenu * mEdit = menubar->addMenu(tr("&Edit"));
  editCutAction->addTo(mEdit);
  editCopyAction->addTo(mEdit);
  editPasteAction->addTo(mEdit);
  editDeleteAction->addTo(mEdit);
  mEdit->insertSeparator();
  editPreferencesAction->addTo(mEdit);

  QMenu * mInsert = menubar->addMenu(tr("&Insert"));
  itemLabelAction->addTo(mInsert);
  itemFieldAction->addTo(mInsert);
  itemTextAction->addTo(mInsert);
  itemLineAction->addTo(mInsert);
  itemBarcodeAction->addTo(mInsert);
  itemImageAction->addTo(mInsert);
  itemGraphAction->addTo(mInsert);

  QMenu * mDoc = menubar->addMenu(tr("&Document"));
  mDoc->insertItem(tr("Properties..."), this, SLOT(docTitle()));
  mDoc->insertItem(tr("&Page Setup..."), this, SLOT(docPageSetup()));
  mDoc->insertItem(tr("Query &Sources..."), this, SLOT(docQuerySourceList()));
  mDoc->insertItem(tr("Section Editor..."), this, SLOT(docSectionEditor()));
  mDoc->insertItem(tr("Color Definitions..."), this, SLOT(docColorList()));
  mDoc->insertItem(tr("Defined Parameters..."), this, SLOT(docDefinedParams()));

  QAction * sid = menubar->addSeparator();

  /*QMenu * mHelp =*/ menubar->addMenu(tr("&Help"));

  return sid;
}

void ReportHandler::setParentWindow(QWidget * pw)
{
  _parentWindow = pw;
  _parentWindowIsWorkspace = (pw && pw->isA("QWorkspace"));
}

//
// helper function used below
//
void itemPropertyDialog(Q3CanvasItem * selected_item, QMap<QString,QColor>* cm, QuerySourceList * qsl, QWidget * parent)
{
  if(selected_item)
  {
    ReportEntity * ent = 0;
    switch(selected_item->rtti())
    {
      case ReportEntity::EntityLabel:
        ent = (ReportEntityLabel*)(selected_item);
        break;
      case ReportEntity::EntityField:
        ent = (ReportEntityField*)(selected_item);
        break;
      case ReportEntity::EntityText:
        ent = (ReportEntityText*)(selected_item);
        break;
      case ReportEntity::EntityLine:
        ent = (ReportEntityLine*)(selected_item);
        break;
      case ReportEntity::EntityBarcode:
        ent = (ReportEntityBarcode*)(selected_item);
        break;
      case ReportEntity::EntityImage:
        ent = (ReportEntityImage*)(selected_item);
        break;
      case ReportEntity::EntityGraph:
        ent = (ReportEntityGraph*)(selected_item);
        break;
      default:
        qDebug("Property event on unknown Entity");
    }
    if(ent)
      ent->propertyDialog(cm, qsl, parent);
  }
}

//
// methods for the sectionMouse*Event()
//
void ReportHandler::sectionMousePressEvent(ReportCanvasView * v, QMouseEvent * e)
{
  e->accept();
  bool shiftDown = ((e->state() & Qt::ShiftModifier) == Qt::ShiftModifier);
  if(sectionData->mouseAction == ReportWriterSectionData::MA_None)
  {
    if(!shiftDown)
    {
      clearSelectedEntity();
      sectionData->mouseAction = ReportWriterSectionData::MA_None;
    }
    Q3CanvasItemList lst = v->canvas()->collisions(e->pos());
    if(!lst.isEmpty())
    {
      if(shiftDown)
        addSelectedEntity(v->document(), lst.first());
      else
        setSelectedEntity(v->document(), lst.first());
      sectionData->selected_x_offset = e->x();
      sectionData->selected_y_offset = e->y();
      sectionData->mouseAction = ReportWriterSectionData::MA_Grab;
    }
  }

  if(e->button() == Qt::LeftButton)
  {
    switch(sectionData->mouseAction)
    {
      case ReportWriterSectionData::MA_Grab:
      case ReportWriterSectionData::MA_ResizeNW:
      case ReportWriterSectionData::MA_ResizeN:
      case ReportWriterSectionData::MA_ResizeNE:
      case ReportWriterSectionData::MA_ResizeE:
      case ReportWriterSectionData::MA_ResizeSE:
      case ReportWriterSectionData::MA_ResizeS:
      case ReportWriterSectionData::MA_ResizeSW:
      case ReportWriterSectionData::MA_ResizeW:
      case ReportWriterSectionData::MA_MoveStartPoint:
      case ReportWriterSectionData::MA_MoveEndPoint:
        // ok sectionData->selected_item _should_ be valid
        // and we already know where the mouse is and what action we should be
        // taking.... but lets just do a sanity check on the selected_item
        if(selectionCount() == 0)
        {
          qDebug("Sanity Check failed on sectionMousePressEvent() for MA_Grab+MA_Resize*");
          break;
        }
        sectionData->selected_x_offset = e->x();
        sectionData->selected_y_offset = e->y();
        break;
      case ReportWriterSectionData::MA_Insert:
        // do we need to do anything here?
        // yes if this is a Line then we need to add it now and then
        // jump straight into the MA_MoveEndPoint
        if(sectionData->insertItem == ReportWriterSectionData::LineItem)
        {
          ReportEntityLine * rel = new ReportEntityLine(v->document(), v->canvas());
          rel->setPoints(e->x(), e->y(), e->x(), e->y());
          rel->setVisible(TRUE);
          setSelectedEntity(v->document(), rel);
          sectionData->mouseAction = ReportWriterSectionData::MA_MoveEndPoint;
          sectionData->insertItem = ReportWriterSectionData::NoItem;
          if(v && v->document())
            v->document()->setModified(TRUE);
        }
        break;
      case ReportWriterSectionData::MA_None:
        // nothing to do with the other cases
        break;
    }
  }
  else if(e->button() == Qt::RightButton)
  {
    QMenu pop(v);

    QAction *popCut = 0;
    QAction *popCopy = 0;
    QAction *popPaste = 0;
    QAction *popProperties = 0;
    if(selectionCount() > 0)
    {
      popCut = pop.addAction(tr("Cut"));
      popCopy = pop.addAction(tr("Copy"));
    }
    if(sectionData->copy_list.count() > 0)
      popPaste = pop.addAction(tr("Paste"));
    if(selectionCount() == 1)
    {
      pop.insertSeparator();
      popProperties = pop.addAction(tr("Properties"));
    }

    QAction * ret = pop.exec(QCursor::pos());
    if(ret == popCut)
      editCut();
    else if(ret == popCopy)
      editCopy();
    else if(ret == popPaste)
      editPaste(v->document(), v->canvas(), e->pos());
    else if(ret == popProperties)
    { 
      ReportWindow * rw = v->document();
      QuerySourceList * qsl = ( rw ? rw->qsList : 0 );
      QMap<QString, QColor>* cm = ( rw ? &rw->_colorMap : 0 );
      itemPropertyDialog(sectionData->selected_items.first(),cm,qsl,rw);
      updateSelectedEntity();
    }
  }
}

void ReportHandler::sectionMouseReleaseEvent(ReportCanvasView * v, QMouseEvent * e)
{
  e->accept();
  Q3CanvasItem * item = 0;
  if(e->button() == Qt::LeftButton)
  {
    switch(sectionData->mouseAction)
    {
      case ReportWriterSectionData::MA_Insert:
        switch(sectionData->insertItem)
        {
          case ReportWriterSectionData::LabelItem :
            item = new ReportEntityLabel(v->document(), v->canvas());
            break;
          case ReportWriterSectionData::FieldItem :
            item = new ReportEntityField(v->document(), v->canvas());
            break;
          case ReportWriterSectionData::TextItem :
            item = new ReportEntityText(v->document(), v->canvas());
            break;
          case ReportWriterSectionData::BarcodeItem :
            item = new ReportEntityBarcode(v->document(), v->canvas());
            break;
          case ReportWriterSectionData::ImageItem :
            item = new ReportEntityImage(v->document(), v->canvas());
            break;
          case ReportWriterSectionData::GraphItem :
            item = new ReportEntityGraph(v->document(), v->canvas());
            break;
          default:
            qDebug("attempted to insert an unknown item");
        }
        if(item)
        {
          item->setX(e->x()); item->setY(e->y());
          item->setVisible(TRUE);
          setSelectedEntity(v->document(), item);
          if(v && v->document())
            v->document()->setModified(TRUE);
        }

        sectionData->mouseAction = ReportWriterSectionData::MA_None;
        sectionData->insertItem = ReportWriterSectionData::NoItem;
        break;
      default:
        // what to do? Nothing
        // either we don't know what is going on
        // or everything has been done elsewhere
        break;
    }
  }
}

void ReportHandler::sectionMouseMoveEvent(ReportCanvasView * v, QMouseEvent * e)
{
  e->accept();
  //qDebug("Pos(%d,%d) LeftButtonDown:%s", e->x(), e->y(),
  //  ((e->state() & LeftButton) == LeftButton ? "true" : "false") );
  const QPoint pos = e->pos();

  if(sectionData->mouseAction == ReportWriterSectionData::MA_Insert)
  {
    // this is a special case where we don't want to do anything
    // this may need to be worked into the code a little better to
    // allow for functionality expansion
    return;
  }

  if(selectionCount() > 0 && selectionCanvas() == v->canvas())
  {
    int i = 0;
    Q3CanvasPolygonalItem * item = (Q3CanvasPolygonalItem*)sectionData->selected_items.first();
    QRect r = item->boundingRect();
    if((e->state() & Qt::LeftButton) == Qt::LeftButton)
    {
      QPoint p;
      for(i = 0; i < sectionData->selected_items.count(); i++)
      {
        // the button is pushed so we want to act accordinly to our mouseAction
        item = (Q3CanvasPolygonalItem*)sectionData->selected_items[i];
        r = item->boundingRect();
        p = gridOptions->snapPoint(pos);
        ReportEntityLine * rel = 0;
        int sx, sy, ex, ey;
        switch(sectionData->mouseAction)
        {
          case ReportWriterSectionData::MA_Grab:
            // move the selected item around
            p = QPoint(e->x() - sectionData->selected_x_offset,
                       e->y() - sectionData->selected_y_offset);

            if(item->rtti() == ReportEntity::EntityLine)
            {
              ReportEntityLine * line = (ReportEntityLine*)item;
              p = gridOptions->snapPoint(
                QPoint(line->startPoint().x() + p.x(),
                       line->startPoint().y() + p.y()));
              line->setPoints(
                p.x(), p.y(),
                line->endPoint().x() + (p.x() - line->startPoint().x()),
                line->endPoint().y() + (p.y() - line->startPoint().y()) );
            }
            else
            {
              p = gridOptions->snapPoint(QPoint((int)(item->x() + p.x()), (int)(item->y() + p.y())));
              item->move(p.x(), p.y());
            }
            break;
          case ReportWriterSectionData::MA_ResizeNW:
            if(item->rtti() == ReportEntity::EntityBarcode)
              ((ReportEntityBarcode*)item)->setSize((int)((item->x() - p.x()) + ((Q3CanvasRectangle*)item)->width()), (int)((item->y() - p.y()) + ((Q3CanvasRectangle*)item)->height()));
            else
              ((Q3CanvasRectangle*)item)->setSize((int)((item->x() - p.x()) + ((Q3CanvasRectangle*)item)->width()), (int)((item->y() - p.y()) + ((Q3CanvasRectangle*)item)->height()));
            item->move(p.x(), p.y());
            break;
          case ReportWriterSectionData::MA_ResizeN:
            if(item->rtti() == ReportEntity::EntityBarcode)
              ((ReportEntityBarcode*)item)->setSize(((Q3CanvasRectangle*)item)->width(), (int)((item->y() - p.y()) + ((Q3CanvasRectangle*)item)->height()));
            else
              ((Q3CanvasRectangle*)item)->setSize(((Q3CanvasRectangle*)item)->width(), (int)((item->y() - p.y()) + ((Q3CanvasRectangle*)item)->height()));
            item->move((int)(item->x()), p.y());
            break;
          case ReportWriterSectionData::MA_ResizeNE:
            if(item->rtti() == ReportEntity::EntityBarcode)
              ((ReportEntityBarcode*)item)->setSize((int)(p.x() - item->x()), (int)((item->y() - p.y()) + ((Q3CanvasRectangle*)item)->height()));
            else
              ((Q3CanvasRectangle*)item)->setSize((int)(p.x() - item->x()), (int)((item->y() - p.y()) + ((Q3CanvasRectangle*)item)->height()));
            item->move((int)(item->x()), p.y());
            break;
          case ReportWriterSectionData::MA_ResizeE:
            if(item->rtti() == ReportEntity::EntityBarcode)
              ((ReportEntityBarcode*)item)->setSize(p.x() - (int)(item->x()), (int)(((Q3CanvasRectangle*)item)->height()));
            else
              ((Q3CanvasRectangle*)item)->setSize(p.x() - (int)(item->x()), (int)(((Q3CanvasRectangle*)item)->height()));
            break;
          case ReportWriterSectionData::MA_ResizeSE:
            if(item->rtti() == ReportEntity::EntityBarcode)
              ((ReportEntityBarcode*)item)->setSize(p.x() - (int)(item->x()), p.y() - (int)(item->y()));
            else
              ((Q3CanvasRectangle*)item)->setSize(p.x() - (int)(item->x()), p.y() - (int)(item->y()));
            break;
          case ReportWriterSectionData::MA_ResizeS:
            if(item->rtti() == ReportEntity::EntityBarcode)
              ((ReportEntityBarcode*)item)->setSize((int)(((Q3CanvasRectangle*)item)->width()), p.y() - (int)(item->y()));
            else
              ((Q3CanvasRectangle*)item)->setSize((int)(((Q3CanvasRectangle*)item)->width()), p.y() - (int)(item->y()));
            break;
          case ReportWriterSectionData::MA_ResizeSW:
            if(item->rtti() == ReportEntity::EntityBarcode)
             ((ReportEntityBarcode*)item)->setSize((int)((item->x()-p.x())+((Q3CanvasRectangle*)item)->width()), (int)(p.y() - item->y()));
            else
              ((Q3CanvasRectangle*)item)->setSize((int)((item->x()-p.x())+((Q3CanvasRectangle*)item)->width()), (int)(p.y() - item->y()));
            item->move(p.x(), item->y());
            break;
          case ReportWriterSectionData::MA_ResizeW:
            if(item->rtti() == ReportEntity::EntityBarcode)
              ((ReportEntityBarcode*)item)->setSize((int)((item->x()-p.x())+((Q3CanvasRectangle*)item)->width()), (int)((Q3CanvasRectangle*)item)->height());
            else
              ((Q3CanvasRectangle*)item)->setSize((int)((item->x()-p.x())+((Q3CanvasRectangle*)item)->width()), (int)((Q3CanvasRectangle*)item)->height());
            item->move(p.x(), item->y());
            break;
          case ReportWriterSectionData::MA_MoveStartPoint:
            rel = (ReportEntityLine*)item;
            sx = p.x();
            sy = p.y();

            ex = rel->endPoint().x();
            ey = rel->endPoint().y();

            if((e->state() & Qt::ShiftModifier) == Qt::ShiftModifier)
              sy = ey;
            else if((e->state() & Qt::AltModifier) == Qt::AltModifier)
              sx = ex; 

            rel->setPoints(sx, sy, ex, ey );
            rel = 0;
            break;
          case ReportWriterSectionData::MA_MoveEndPoint:
            rel = (ReportEntityLine*)item;
            sx = rel->startPoint().x();
            sy = rel->startPoint().y();

            ex = p.x();
            ey = p.y();

            if((e->state() & Qt::ShiftModifier) == Qt::ShiftModifier)
              ey = sy;
            else if((e->state() & Qt::AltModifier) == Qt::AltModifier)
              ex = sx; 

            rel->setPoints( sx, sy, ex, ey );
            rel = 0;
            break;
          default:
            qDebug("ReportHandler::sectionMouseMoveEvent(): Unhandled mouseAction %d", sectionData->mouseAction);
        }

        // update the old and new areas on the canvas of the selected item
        v->canvas()->setChanged(padRect(r));
        v->canvas()->setChanged(padRect(item->boundingRect()));
      }
      p = gridOptions->snapPoint(e->pos());
      sectionData->selected_x_offset = p.x();
      sectionData->selected_y_offset = p.y();

      v->canvas()->update();
      if(v && v->document())
        v->document()->setModified(TRUE);
      updateSelectedEntity();
    }
    else
    {
      // we need to determine which mouseAction we should perform if the
      // mouse button where pushed
      sectionData->mouseAction = ReportWriterSectionData::MA_None;
      if(selectionCount() == 1)
      {
        int halfW = (int)(r.width() / 2);
        int halfH = (int)(r.height() / 2);
        QPoint center = r.center();
        if(item->rtti() == ReportEntity::EntityLine)
        {
          QPoint sp = ((ReportEntityLine*)item)->startPoint();
          QPoint ep = ((ReportEntityLine*)item)->endPoint();
          if(QRect(ep.x()-2,ep.y()-2,5,5).contains(pos))
          {
            sectionData->mouseAction = ReportWriterSectionData::MA_MoveEndPoint;
            v->viewport()->setCursor(Qt::SizeAllCursor);
          }
          else if(QRect(sp.x()-2,sp.y()-2,5,5).contains(pos))
          {
            sectionData->mouseAction = ReportWriterSectionData::MA_MoveStartPoint;
            v->viewport()->setCursor(Qt::SizeAllCursor);
          }
        }
        else if (QRect(center.x()-(halfW+2),center.y()-(halfH+2),5,5).contains(pos))
        {
          // we are over the top-left handle
          sectionData->mouseAction = ReportWriterSectionData::MA_ResizeNW;
          v->viewport()->setCursor(Qt::SizeFDiagCursor);
        }
        else if (QRect(center.x()-2,center.y()-(halfH+2),5,5).contains(pos))
        {
          // top-middle handle
          sectionData->mouseAction = ReportWriterSectionData::MA_ResizeN;
          v->viewport()->setCursor(Qt::SizeVerCursor);
        }
        else if (QRect(center.x()+(halfW-2),center.y()-(halfH+2),5,5).contains(pos))
        {
          // top-right
          sectionData->mouseAction = ReportWriterSectionData::MA_ResizeNE;
          v->viewport()->setCursor(Qt::SizeBDiagCursor);
        }
        else if(QRect(center.x()+(halfW-2),center.y()-2,5,5).contains(pos))
        {
          // middle-right
          sectionData->mouseAction = ReportWriterSectionData::MA_ResizeE;
          v->viewport()->setCursor(Qt::SizeHorCursor);
        }
        else if(QRect(center.x()+(halfW-2),center.y()+(halfH-2),5,5).contains(pos))
        {
          // bottom-left
          sectionData->mouseAction = ReportWriterSectionData::MA_ResizeSE;
          v->viewport()->setCursor(Qt::SizeFDiagCursor);
        }
        else if(QRect(center.x()-2,center.y()+(halfH-2),5,5).contains(pos))
        {
          // bottom-middle
          sectionData->mouseAction = ReportWriterSectionData::MA_ResizeS;
          v->viewport()->setCursor(Qt::SizeVerCursor);
        }
        else if(QRect(center.x()-(halfW+2),center.y()+(halfH-2),5,5).contains(pos))
        {
          // bottom-right
          sectionData->mouseAction = ReportWriterSectionData::MA_ResizeSW;
          v->viewport()->setCursor(Qt::SizeBDiagCursor);
        }
        else if(QRect(center.x()-(halfW+2),center.y()-2,5,5).contains(pos))
        {
          // middle-right
          sectionData->mouseAction = ReportWriterSectionData::MA_ResizeW;
          v->viewport()->setCursor(Qt::SizeHorCursor);
        }
      }

      if(sectionData->mouseAction == ReportWriterSectionData::MA_None)
      {
        for(i = 0; i < sectionData->selected_items.count(); i++)
        {
          item = (Q3CanvasPolygonalItem*)sectionData->selected_items[i];
          r = item->boundingRect();
          if(r.contains(pos))
          {
            // if the mouse isn't over one of the handles so it's either
            // over the object in general or not
            sectionData->mouseAction = ReportWriterSectionData::MA_Grab;
            v->viewport()->setCursor(Qt::SizeAllCursor);
          }
        }
      }

      if(sectionData->mouseAction == ReportWriterSectionData::MA_None)
      {
        // the mouse isn't over anything
        v->viewport()->unsetCursor();
      }
    }
  }
  else
  {
    sectionData->mouseAction = ReportWriterSectionData::MA_None;
    v->viewport()->unsetCursor();
  }
}

void ReportHandler::sectionMouseDoubleClickEvent(ReportCanvasView * v, QMouseEvent * e)
{
  e->accept();
  if(selectionCount() == 1 && e->button() == Qt::LeftButton)
  {
    ReportWindow * rw = v->document();
    QuerySourceList * qsl = ( rw ? rw->qsList : 0 );
    QMap<QString,QColor>* cm = ( rw ? &rw->_colorMap : 0 );
    itemPropertyDialog(sectionData->selected_items.first(),cm,qsl,rw);
  }
}

//
// utility methods for selecting entities
//
void ReportHandler::clearSelectedEntity()
{
  Q3CanvasItem * item = 0;

  for(int i = 0; i < sectionData->selected_items.count(); i++)
  {
    item = sectionData->selected_items[i];
    if(item)
    {
      item->setSelected(FALSE);
      item->canvas()->setChanged(padRect(item->boundingRect()));
      item->canvas()->update();
    }
  }
  sectionData->selected_items.clear();
  sectionData->selected_items_rw = 0;
  updateSelectedEntity();
}

void ReportHandler::setSelectedEntity(ReportWindow * rw, Q3CanvasItem * item)
{
  clearSelectedEntity();
  addSelectedEntity(rw, item);
}

void ReportHandler::addSelectedEntity(ReportWindow * rw, Q3CanvasItem * item)
{
  if(selectionCount() > 0 && sectionData->selected_items.first()->canvas() != item->canvas())
    clearSelectedEntity();

  if(item)
  {
    if(!sectionData->selected_items.contains(item))
      sectionData->selected_items.append(item);
    sectionData->selected_items_rw = rw;
    item->setSelected(TRUE);
    item->canvas()->setChanged(padRect(item->boundingRect()));
    item->canvas()->update();
  }

  updateSelectedEntity();
}

void ReportHandler::updateSelectedEntity()
{
  if(selectionCount() > 0)
  {
    QString message = QString::null;
    if(selectionCount() == 1)
    {
      Q3CanvasItem * item = sectionData->selected_items.first();

      Q3CanvasRectangle * qcr = 0;
      Q3CanvasLine * qcl = 0;
      double dx, dy, dw, dh;

      switch(item->rtti())
      {
        case ReportEntity::EntityLabel:
        case ReportEntity::EntityField:
        case ReportEntity::EntityText:
        case ReportEntity::EntityBarcode:
        case ReportEntity::EntityImage:
        case ReportEntity::EntityGraph:
          qcr = (Q3CanvasRectangle*)item;
          dx = (double)(qcr->rect().x())/(double)(dpiX);
          dy = (double)(qcr->rect().y())/(double)(dpiY);
          dw = (double)(qcr->rect().width())/(double)(dpiX);
          dh = (double)(qcr->rect().height())/(double)(dpiY);

          message = QString().sprintf(tr("Position [X: %s, Y: %s]    Size [W: %s, H: %s]"),
                                               QString::number(dx,'g',3).latin1(),
                                               QString::number(dy,'g',3).latin1(),
                                               QString::number(dw,'g',3).latin1(),
                                               QString::number(dh,'g',3).latin1() );
          break;
        case ReportEntity::EntityLine:
          qcl = (Q3CanvasLine*)item;

          dx = ((double)(qcl->startPoint().x()) / dpiX);
          dy = ((double)(qcl->startPoint().y()) / dpiY);
          dw = ((double)(qcl->endPoint().x()) / dpiX);
          dh = ((double)(qcl->endPoint().y()) / dpiY);

          message = QString().sprintf(tr("Start Point [X: %s, Y: %s]    End Point [X: %s, Y: %s]"),
                                               QString::number(dx,'g',3).latin1(),
                                               QString::number(dy,'g',3).latin1(),
                                               QString::number(dw,'g',3).latin1(),
                                               QString::number(dh,'g',3).latin1() );

          break;
        default:
          message = tr("Unknown Entity Type");

      }
    }
    else
      message = tr("Group Selection");
    emit messageChanged(message);
  }
  else
    emit messageCleared();
}

unsigned int ReportHandler::selectionCount()
{
  return sectionData->selected_items.count();
}

Q3Canvas * ReportHandler::selectionCanvas()
{
  if(selectionCount() > 0)
  {
    Q3CanvasItem * item = sectionData->selected_items.first();
    return item->canvas();
  }
  return 0;
}

ReportWindow * ReportHandler::selectionReport()
{
  if(selectionCount() > 0)
    return sectionData->selected_items_rw;
  return 0;
}


//
// slot implementations
//
ReportWindow* ReportHandler::fileNew() {
    ReportWindow * rw = new ReportWindow(gridOptions, _parentWindow,"report window");

    if(_placeMenusOnWindows) {
        QMenuBar * mb = 0;
#ifdef Q_WS_MACX
	mb = new QMenuBar();
	rw->setMenuBar(mb);
#else
	mb = rw->menuBar();
#endif
        populateMenuBar(mb);
    }
    if(_placeToolbarsOnWindows)
        docToolBars(rw);

    addReportWindow(rw);
    //if(ws->windowList().isEmpty()) {
    //    rw->showMaximized();
    //} else {
        rw->show();
    //}
    rw->updateGeometry();
    return rw;
}

void ReportHandler::fileOpen()
{
  // ok first we need to get a file to open.
  QString file = QFileDialog::getOpenFileName(
        qApp->mainWidget(), tr("Open File"),
        QString::null, tr("XML (*.xml)") );
  fileOpen(file);
}

void ReportHandler::fileOpen(const QString &fileName)
{
  QString file = fileName;

  if(file.isNull())
    return; // user canceled

  // once we have a file lets go ahead and load it all up.
  QFile * f = new QFile(file);

  QDomDocument doc = QDomDocument();
  QString errMsg;
  int errLine, errCol;
  if(doc.setContent(f,&errMsg,&errLine,&errCol))
  {
    // ok lets read it
    ReportWindow* rw = fileOpen(doc);
    if(rw)
      rw->filename = file;
  }
  else
  {
    // ERROR
    QMessageBox::critical(qApp->mainWidget(), tr("Failed read on Open File"),
        QString().sprintf(tr("Encountered and error while parsing %s\n\n\t%s (Line %d Column %d)"),file.latin1(),errMsg.latin1(),errLine,errCol));
  }
  delete f;
}


//
// File Actions
//
ReportWindow * ReportHandler::fileOpen(const QDomDocument & doc, const QString & rptName, int rptGrade) {
    ReportWindow * rw = fileOpen(doc);
    if(rw) {
        // setup any variables to let this doc know how it was loaded
        // so when a save command is issued it knows what to do
        rw->lastSaveToDb = TRUE;
        rw->dbRecordName = rptName;
        rw->dbRecordGrade = rptGrade;
    }
    return rw;
}
ReportWindow * ReportHandler::fileOpen(const QDomDocument & doc) {
    QDomElement root = doc.documentElement();
    if(root.tagName() != "report") {
        // arg we got an xml file but not one i know of
        qDebug("root element was not <report>");
        return 0;
    }
    ReportWindow * rw = fileNew();
    rw->removeSection(0,TRUE);

    QDomNodeList nlist = root.childNodes();
    QDomNode it;

    for(int i = 0; i < nlist.count(); i++ ) {
        it = nlist.item(i);
        // at this level all the children we get should be Elements
        if(it.isElement()) {
            QString n = it.nodeName();
            if(n == "title") {
                rw->setReportTitle(it.firstChild().nodeValue());
            } else if(n == "name") {
                rw->setReportName(it.firstChild().nodeValue());
            } else if(n == "description") {
                rw->setReportDescription(it.firstChild().nodeValue());
            } else if(n == "parameter") {
                ORParameter param;
                param.name = it.toElement().attribute("name");
                param.type = it.toElement().attribute("type");
                param.defaultValue = it.toElement().attribute("default");
                param.active = (it.toElement().attribute("active") == "true");
                param.listtype = it.toElement().attribute("listtype");
                if(param.listtype.isEmpty())
                  param.description = it.firstChild().nodeValue();
                else
                {
                  QDomNodeList section = it.childNodes();
                  for(int nodeCounter = 0; nodeCounter < section.count(); nodeCounter++)
                  {
                    QDomElement elemThis = section.item(nodeCounter).toElement();
                    if(elemThis.tagName() == "description")
                      param.description = elemThis.text();
                    else if(elemThis.tagName() == "query")
                      param.query = elemThis.text();
                    else if(elemThis.tagName() == "item")
                      param.values.append(qMakePair(elemThis.attribute("value"), elemThis.text()));
                    else
                      qDebug("While parsing parameter encountered an unknown element: %s",(const char*)elemThis.tagName());
                  }
                }
                rw->addDefinedParameter(param.name, param);
            } else if(n == "watermark") {
                ORWatermarkData wmData;
                parseReportWatermark(it.toElement(), wmData);
                rw->setWatermarkOpacity(wmData.opacity);
                rw->setWatermarkFont(wmData.font);
                rw->setWatermarkText(wmData.text);
                rw->setWatermarkUseDefaultFont(wmData.useDefaultFont);
                rw->setWatermarkUseStaticText(wmData.staticText);
                rw->setWatermarkQuery(wmData.data.query);
                rw->setWatermarkColumn(wmData.data.column);
            } else if(n == "background") {
                ORBackgroundData bgData;
                parseReportBackground(it.toElement(), bgData);
                rw->setBgEnabled(bgData.enabled);
                rw->setBgStatic(bgData.staticImage);
                rw->setBgImage(bgData.image);
                rw->setBgQuery(bgData.data.query);
                rw->setBgColumn(bgData.data.column);
                rw->setBgOpacity(bgData.opacity);
                rw->setBgResizeMode(bgData.mode);
                rw->setBgAlign(bgData.align);
                rw->setBgBoundsX(bgData.rect.x());
                rw->setBgBoundsY(bgData.rect.y());
                rw->setBgBoundsWidth(bgData.rect.width());
                rw->setBgBoundsHeight(bgData.rect.height());
            } else if(n == "size") {
                if(it.firstChild().isText()) {
                    rw->pageOptions->setPageSize(it.firstChild().nodeValue());
                } else {
                    //bad code! bad code!
                    // this code doesn't check the elemts and assums they are what
                    // they should be.
                    QDomNode n1 = it.firstChild();
                    QDomNode n2 = n1.nextSibling();
                    if(n1.nodeName() == "width") {
                        rw->pageOptions->setCustomWidth(n1.firstChild().nodeValue().toDouble() / 100.0);
                        rw->pageOptions->setCustomHeight(n2.firstChild().nodeValue().toDouble() / 100.0);
                    } else {
                        rw->pageOptions->setCustomWidth(n2.firstChild().nodeValue().toDouble() / 100.0);
                        rw->pageOptions->setCustomHeight(n1.firstChild().nodeValue().toDouble() / 100.0);
                    }
                    rw->pageOptions->setPageSize("Custom");
                }
            } else if(n == "labeltype") {
                rw->pageOptions->setLabelType(it.firstChild().nodeValue());
            } else if(n == "portrait") {
                rw->pageOptions->setPortrait(TRUE);
            } else if(n == "landscape") {
                rw->pageOptions->setPortrait(FALSE);
            } else if(n == "topmargin") {
                rw->pageOptions->setMarginTop(it.firstChild().nodeValue().toDouble() / 100.0);
            } else if(n == "bottommargin") {
                rw->pageOptions->setMarginBottom(it.firstChild().nodeValue().toDouble() / 100.0);
            } else if(n == "leftmargin") {
                rw->pageOptions->setMarginLeft(it.firstChild().nodeValue().toDouble() / 100.0);
            } else if(n == "rightmargin") {
                rw->pageOptions->setMarginRight(it.firstChild().nodeValue().toDouble() / 100.0);
            } else if(n == "querysource") {
                QDomNodeList qnl = it.childNodes();
                QString qname, qsql;
                QDomNode qit;
                for(int qi = 0; qi < qnl.count(); qi++) {
                    qit = qnl.item(qi);
                    if(qit.nodeName() == "name")
                        qname = qit.firstChild().nodeValue();
                    else if(qit.nodeName() == "sql")
                        qsql = qit.firstChild().nodeValue();
                    else
                        qDebug("Qhile parsing quersource elements encountered unknown node.");
                }
                rw->qsList->add(new QuerySource(qname,qsql));
            } else if(n == "colordef") {
                QDomNodeList qnl = it.childNodes();
                QString cname = QString::null;
                int red = 0, green = 0, blue = 0;
                QDomNode qit;
                for(int qi = 0; qi < qnl.count(); qi++) {
                    qit = qnl.item(qi);
                    if(qit.nodeName() == "name")
                        cname = qit.firstChild().nodeValue();
                    else if(qit.nodeName() == "red")
                        red = qit.firstChild().nodeValue().toInt();
                    else if(qit.nodeName() == "green")
                        green = qit.firstChild().nodeValue().toInt();
                    else if(qit.nodeName() == "blue")
                        blue = qit.firstChild().nodeValue().toInt();
                    if(cname.length() > 0) {
                        rw->addColorDef(cname, QColor(red, green, blue));
                    }
                }
            } else if(n == "rpthead") {
                if(rw->getReportHead() == 0) {
                    rw->insertReportHead();
                    rw->getReportHead()->initFromXML(it);
                } else {
                    qDebug("While loading xml tried to add more than one rpthead");
                }
            } else if(n == "rptfoot") {
                if(rw->getReportFoot() == 0) {
                    rw->insertReportFoot();
                    rw->getReportFoot()->initFromXML(it);
                } else {
                    qDebug("While loading xml tried to add more than one rpthead");
                }
            } else if(n == "pghead") {
                // we need to determine which page this is for
                // firstpage | odd | even | lastpage
                // or any if none was specified
                ReportSection * rs = 0;
                if(!it.namedItem("firstpage").isNull()) {
                    if(rw->getPageHeadFirst() == 0) {
                        rw->insertPageHeadFirst();
                        rs = rw->getPageHeadFirst();
                    } else {
                        qDebug("tried to load more than one page head first");
                    }
                } else if(!it.namedItem("odd").isNull()) {
                    if(rw->getPageHeadOdd() == 0) {
                        rw->insertPageHeadOdd();
                        rs = rw->getPageHeadOdd();
                    } else {
                        qDebug("tried to load more than one page head odd");
                    }
                } else if(!it.namedItem("even").isNull()) {
                    if(rw->getPageHeadEven() == 0) {
                        rw->insertPageHeadEven();
                        rs = rw->getPageHeadEven();
                    } else {
                        qDebug("tried to load more than one page head even");
                    }
                } else if(!it.namedItem("lastpage").isNull()) {
                    if(rw->getPageHeadLast() == 0) {
                        rw->insertPageHeadLast();
                        rs = rw->getPageHeadLast();
                    } else {
                        qDebug("tried to load more than one page head last");
                    }
                } else {
                    // we have an any pghead
                    if(rw->getPageHeadAny() == 0) {
                        rw->insertPageHeadAny();
                        rs = rw->getPageHeadAny();
                    } else {
                        qDebug("tried to load more than one page head any");
                    }
                }
                if(rs) rs->initFromXML(it);
            } else if(n == "pgfoot") {
                // we need to determine which page this is for
                ReportSection * rs = 0;
                if(!it.namedItem("firstpage").isNull()) {
                    if(rw->getPageFootFirst() == 0) {
                        rw->insertPageFootFirst();
                        rs = rw->getPageFootFirst();
                    } else {
                        qDebug("tried to load more than one page foot first");
                    }
                } else if(!it.namedItem("odd").isNull()) {
                    if(rw->getPageFootOdd() == 0) {
                        rw->insertPageFootOdd();
                        rs = rw->getPageFootOdd();
                    } else {
                        qDebug("tried to load more than one page foot odd");
                    }
                } else if(!it.namedItem("even").isNull()) {
                    if(rw->getPageFootEven() == 0) {
                        rw->insertPageFootEven();
                        rs = rw->getPageFootEven();
                    } else {
                        qDebug("tried to load more than one page foot even");
                    }
                } else if(!it.namedItem("lastpage").isNull()) {
                    if(rw->getPageFootLast() == 0) {
                        rw->insertPageFootLast();
                        rs = rw->getPageFootLast();
                    } else {
                        qDebug("tried to load more than one page foot last");
                    }
                } else {
                    // we have the any page foot
                    if(rw->getPageFootAny() == 0) {
                        rw->insertPageFootAny();
                        rs = rw->getPageFootAny();
                    } else {
                        qDebug("tried to load more than one page foot any");
                    }
                }
                if(rs) rs->initFromXML(it);
            } else if(n == "section") {
                // we need to load a section.
                ReportSectionDetail * rsd = new ReportSectionDetail(rw, rw->vbox);
                rsd->initFromXML(it);
                rw->insertSection(rw->detailSectionCount(),rsd);
            } else {
                qDebug("Encountered an unknown Element: %s", n.latin1());
            }
        } else {
            qDebug("Encountered a child node of root that is not an Element");
        }
    }
    if(rw != 0) {
        rw->setModified(FALSE);
    }
    return rw;
}

void ReportHandler::fileSave() {
    ReportWindow * rw = activeReportWindow();
    if(rw) {
        rw->save();
    }
}

void ReportHandler::fileSaveAs() {
    ReportWindow * rw = activeReportWindow();
    if(rw) {
        rw->saveAs();
    }
}

void ReportHandler::fileClose() {
    ReportWindow *rw = activeReportWindow();
    if(rw) {
        rw->close();
    }
}

//
// Edit Actions
//
void ReportHandler::editDelete() {
    Q3CanvasItem * item = 0;
    while(selectionCount() > 0) {
        item = sectionData->selected_items[0];
        sectionData->selected_items.remove(item);
        if(item) {
            if(selectionReport()) selectionReport()->setModified(TRUE);
            Q3Canvas * canvas = item->canvas();
            delete item;
            canvas->update();
            sectionData->mouseAction = ReportWriterSectionData::MA_None;
        }
    }
    sectionData->selected_items.clear();
    sectionData->selected_items_rw = 0;
    updateSelectedEntity();
}

void ReportHandler::editCut() {
    if(selectionCount() > 0) {
        editCopy();
        editDelete();
    }
}

void ReportHandler::editCopy() {
    if(selectionCount() < 1)
        return;
    Q3CanvasItem * item = sectionData->selected_items.first();
    if(item) {
        sectionData->copy_list.clear();
        if(item->rtti() == ReportEntity::EntityLine) {
            sectionData->copy_x_pos = ((ReportEntityLine*)item)->startPoint().x();
            sectionData->copy_y_pos = ((ReportEntityLine*)item)->startPoint().y();
        } else {
            sectionData->copy_x_pos = (int)item->x();
            sectionData->copy_y_pos = (int)item->y();
        }
        sectionData->copy_rw = sectionData->selected_items_rw;
        sectionData->copy_canvas = item->canvas();
        ReportWriterCopyData cp;
        for(int i = 0; i < sectionData->selected_items.count(); i++) {
            item = sectionData->selected_items[i];
            int rtti = item->rtti();
            if(rtti == ReportEntity::EntityLabel) {
                ReportEntityLabel * ent = (ReportEntityLabel*)item;
                cp.copy_item = ReportWriterSectionData::LabelItem;
                cp.copy_str1 = ent->text();
                cp.copy_font = ent->font();
                cp.copy_int1 = ent->textFlags();
                cp.copy_rect = ent->rect();
                cp.copy_offset_x = cp.copy_rect.x() - sectionData->copy_x_pos;
                cp.copy_offset_y = cp.copy_rect.y() - sectionData->copy_y_pos;
                sectionData->copy_list.append(cp);
            } else if(rtti == ReportEntity::EntityField) {
                ReportEntityField * ent = (ReportEntityField*)item;
                cp.copy_item = ReportWriterSectionData::FieldItem;
                cp.copy_str1 = ent->query();
                cp.copy_str2 = ent->column();
                cp.copy_str3 = ent->trackTotalFormat();
                cp.copy_font = ent->font();
                cp.copy_int1 = ent->textFlags();
                cp.copy_rect = ent->rect();
                cp.copy_bool1 = ent->trackTotal();
                cp.copy_bool2 = ent->trackBuiltinFormat();
                cp.copy_bool3 = ent->useSubTotal();
                cp.copy_offset_x = cp.copy_rect.x() - sectionData->copy_x_pos;
                cp.copy_offset_y = cp.copy_rect.y() - sectionData->copy_y_pos;
                sectionData->copy_list.append(cp);
            } else if(rtti == ReportEntity::EntityText) {
                ReportEntityText * ent = (ReportEntityText*)item;
                cp.copy_item = ReportWriterSectionData::TextItem;
                cp.copy_str1 = ent->query();
                cp.copy_str2 = ent->column();
                cp.copy_font = ent->font();
                cp.copy_int1 = ent->textFlags();
                cp.copy_rect = ent->rect();
                cp.copy_dbl = ent->bottomPadding();
                cp.copy_offset_x = cp.copy_rect.x() - sectionData->copy_x_pos;
                cp.copy_offset_y = cp.copy_rect.y() - sectionData->copy_y_pos;
                sectionData->copy_list.append(cp);
            } else if(rtti == ReportEntity::EntityLine) {
                ReportEntityLine * ent = (ReportEntityLine*)item;
                cp.copy_item = ReportWriterSectionData::LineItem;
                cp.copy_int1 = ent->startPoint().x();
                cp.copy_int2 = ent->startPoint().y();
                cp.copy_int3 = ent->endPoint().x();
                cp.copy_int4 = ent->endPoint().y();
                cp.copy_int5 = ent->weight();
                cp.copy_offset_x = cp.copy_int1 - sectionData->copy_x_pos;
                cp.copy_offset_y = cp.copy_int2 - sectionData->copy_y_pos;
                sectionData->copy_list.append(cp);
            } else if(rtti == ReportEntity::EntityBarcode) {
                ReportEntityBarcode * ent = (ReportEntityBarcode*)item;
                cp.copy_item = ReportWriterSectionData::BarcodeItem;
                cp.copy_str1 = ent->query();
                cp.copy_str2 = ent->column();
                cp.copy_str3 = ent->format();
                cp.copy_int1 = ent->maxLength();
                cp.copy_int2 = ent->alignment();
                cp.copy_rect = ent->rect();
                cp.copy_offset_x = cp.copy_rect.x() - sectionData->copy_x_pos;
                cp.copy_offset_y = cp.copy_rect.y() - sectionData->copy_y_pos;
                sectionData->copy_list.append(cp);
            } else if(rtti == ReportEntity::EntityImage) {
                ReportEntityImage * ent = (ReportEntityImage*)item;
                cp.copy_item = ReportWriterSectionData::ImageItem;
                cp.copy_str1 = ent->query();
                cp.copy_str2 = ent->column();
                cp.copy_str3 = ent->inlineImageData();
                cp.copy_str4 = ent->mode();
                cp.copy_bool1 = ent->isInline();
                cp.copy_rect = ent->rect();
                cp.copy_offset_x = cp.copy_rect.x() - sectionData->copy_x_pos;
                cp.copy_offset_y = cp.copy_rect.y() - sectionData->copy_y_pos;
                sectionData->copy_list.append(cp);
            } else if(rtti == ReportEntity::EntityGraph) {
                ReportEntityGraph * ent = (ReportEntityGraph*)item;
                cp.copy_item = ReportWriterSectionData::GraphItem;
                cp.copy_rect = ent->rect();
                ent->copyData(cp.copy_graph);
                cp.copy_offset_x = cp.copy_rect.x() - sectionData->copy_x_pos;
                cp.copy_offset_y = cp.copy_rect.y() - sectionData->copy_y_pos;
                sectionData->copy_list.append(cp);
            } else {
                qDebug("Tried to copy an item I know nothing about!");
            }
        }
    }
}

void ReportHandler::editPaste() {
    // call the editPaste function passing it a reportsection and point
    //  that make sense as defaults (same canvas / slightly offset pos of orig copy)
    QPoint p;
    p.setX(sectionData->copy_x_pos + 7);
    p.setY(sectionData->copy_y_pos + 7);
    editPaste(sectionData->copy_rw, sectionData->copy_canvas, p);
}

void ReportHandler::editPaste(ReportWindow * rw, Q3Canvas * canvas, const QPoint & pos) {
    // paste a new item of the copy we have in the specified location
    if(sectionData->copy_list.count() > 0) {
        Q3CanvasItem * pasted_ent = 0;
        clearSelectedEntity();
        sectionData->mouseAction = ReportWriterSectionData::MA_None;
        ReportWriterCopyData cp;
        for(int i = 0; i < sectionData->copy_list.count(); i++) {
            pasted_ent = 0;
            cp = sectionData->copy_list[i];
            if(cp.copy_item == ReportWriterSectionData::LabelItem) {
                ReportEntityLabel * ent = new ReportEntityLabel(
                        cp.copy_str1, cp.copy_font, rw, canvas);
                ent->setTextFlags(cp.copy_int1);
                ent->setX(pos.x() + cp.copy_offset_x);
                ent->setY(pos.y() + cp.copy_offset_y);
                ent->setSize(cp.copy_rect.width(),cp.copy_rect.height());
                ent->show();
                pasted_ent = ent;
            } else if(cp.copy_item == ReportWriterSectionData::FieldItem) {
                ReportEntityField * ent = new ReportEntityField(
                        cp.copy_str1, cp.copy_str2,
                        cp.copy_font, rw, canvas);
                ent->setTextFlags(cp.copy_int1);
                ent->setTrackTotal(cp.copy_bool1);
                ent->setTrackTotalFormat(cp.copy_str3, cp.copy_bool2);
                ent->setUseSubTotal(cp.copy_bool3);
                ent->setX(pos.x() + cp.copy_offset_x);
                ent->setY(pos.y() + cp.copy_offset_y);
                ent->setSize(cp.copy_rect.width(),cp.copy_rect.height());
                ent->show();
                pasted_ent = ent;
            } else if(cp.copy_item == ReportWriterSectionData::TextItem) {
                ReportEntityText * ent = new ReportEntityText(
                        cp.copy_str1, cp.copy_str2,
                        cp.copy_font, rw, canvas);
                ent->setTextFlags(cp.copy_int1);
                ent->setX(pos.x() + cp.copy_offset_x);
                ent->setY(pos.y() + cp.copy_offset_y);
                ent->setSize(cp.copy_rect.width(),cp.copy_rect.height());
                ent->setBottomPadding(cp.copy_dbl);
                ent->show();
                pasted_ent = ent;
            } else if(cp.copy_item == ReportWriterSectionData::LineItem) {
                ReportEntityLine * ent = new ReportEntityLine(rw, canvas);
                int dx = cp.copy_int3 - cp.copy_int1;
                int dy = cp.copy_int4 - cp.copy_int2;
                ent->setPoints(pos.x() + cp.copy_offset_x, pos.y() + cp.copy_offset_y,
                               pos.x() + cp.copy_offset_x + dx,
                               pos.y() + cp.copy_offset_y + dy);
                ent->setWeight(cp.copy_int5);
                ent->show();
                pasted_ent = ent;
            } else if(cp.copy_item == ReportWriterSectionData::BarcodeItem) {
                ReportEntityBarcode * ent = new ReportEntityBarcode(
                        cp.copy_str1, cp.copy_str2, rw, canvas);
                ent->setFormat(cp.copy_str3);
                ent->setMaxLength(cp.copy_int1);
                ent->setAlignment(cp.copy_int2);
                ent->setX(pos.x() + cp.copy_offset_x);
                ent->setY(pos.y() + cp.copy_offset_y);
                ent->setSize(cp.copy_rect.width(),cp.copy_rect.height());
                ent->show();
                pasted_ent = ent;
            } else if(cp.copy_item == ReportWriterSectionData::ImageItem) {
                ReportEntityImage * ent = new ReportEntityImage( rw, canvas );
                ent->setQuery(cp.copy_str1);
                ent->setColumn(cp.copy_str2);
                ent->setInlineImageData(cp.copy_str3);
                ent->setMode(cp.copy_str4);
                ent->setInline(cp.copy_bool1);
                ent->setX(pos.x() + cp.copy_offset_x);
                ent->setY(pos.y() + cp.copy_offset_y);
                ent->setSize(cp.copy_rect.width(),cp.copy_rect.height());
                ent->show();
                pasted_ent = ent;
            } else if(cp.copy_item == ReportWriterSectionData::GraphItem) {
                ReportEntityGraph * ent = new ReportEntityGraph(cp.copy_graph, rw, canvas);
                ent->setX(pos.x() + cp.copy_offset_x);
                ent->setY(pos.y() + cp.copy_offset_y);
                ent->setSize(cp.copy_rect.width(), cp.copy_rect.height());
                ent->show();
                pasted_ent = ent;
            } else {
                qDebug("tried to paste an item I don't understand.");
            }

            if(pasted_ent) {
                addSelectedEntity(rw, pasted_ent);
                sectionData->selected_x_offset = pos.x();
                sectionData->selected_y_offset = pos.y();
                sectionData->mouseAction = ReportWriterSectionData::MA_Grab;
                if(rw) rw->setModified(TRUE);
            }
        }
    }
}

void ReportHandler::editPreferences() {
    EditPreferences * dlgPref = new EditPreferences(qApp->mainWidget());
    if(dlgPref) {
        dlgPref->setDefaultFont(QFont(ReportEntity::getDefaultEntityFont()));
        dlgPref->setShowGrid(gridOptions->isVisible());
        dlgPref->setSnapGrid(gridOptions->isSnap());
        dlgPref->setGridSize(gridOptions->xInterval() ,gridOptions->yInterval());
        if(dlgPref->exec() == QDialog::Accepted) {
            ReportEntity::setDefaultEntityFont(dlgPref->defaultFont());
            gridShowAction->setOn(dlgPref->showGrid());
            gridSnapAction->setOn(dlgPref->snapGrid());
            gridOptions->setXInterval(dlgPref->gridSizeX());
            gridOptions->setYInterval(dlgPref->gridSizeY());
        }
        delete dlgPref;
    }
}

//
// Doc Actions
//
void ReportHandler::docTitle() {
    ReportWindow * rw = activeReportWindow();
    if(rw) {
        rw->docInfoEditor();
    }
}

void ReportHandler::docPageSetup() {
    ReportWindow * rw = activeReportWindow();
    if(rw) {
        rw->docPageSetup();
    }
}

void ReportHandler::docQuerySourceList() {
    ReportWindow * rw = activeReportWindow();
    if(rw) {
        rw->querySourceList();
    }
}

void ReportHandler::docSectionEditor() {
    ReportWindow * rw = activeReportWindow();
    if(rw) {
        rw->sectionEditor();
    }
}

void ReportHandler::docColorList() {
    ReportWindow * rw = activeReportWindow();
    if(rw) {
        rw->colorList();
    }
}

void ReportHandler::docDefinedParams() {
    ReportWindow * rw = activeReportWindow();
    if(rw) {
        rw->editDefinedParameters();
    }
}

//
// Item Actions
//
void ReportHandler::itemLabel() {
    sectionData->mouseAction = ReportWriterSectionData::MA_Insert;
    sectionData->insertItem = ReportWriterSectionData::LabelItem;
}

void ReportHandler::itemField() {
    sectionData->mouseAction = ReportWriterSectionData::MA_Insert;
    sectionData->insertItem = ReportWriterSectionData::FieldItem;
}

void ReportHandler::itemText() {
    sectionData->mouseAction = ReportWriterSectionData::MA_Insert;
    sectionData->insertItem = ReportWriterSectionData::TextItem;
}

void ReportHandler::itemLine() {
    sectionData->mouseAction = ReportWriterSectionData::MA_Insert;
    sectionData->insertItem = ReportWriterSectionData::LineItem;
}

void ReportHandler::itemBarcode() {
    sectionData->mouseAction = ReportWriterSectionData::MA_Insert;
    sectionData->insertItem = ReportWriterSectionData::BarcodeItem;
}

void ReportHandler::itemImage() {
    sectionData->mouseAction = ReportWriterSectionData::MA_Insert;
    sectionData->insertItem = ReportWriterSectionData::ImageItem;
}

void ReportHandler::itemGraph() {
    sectionData->mouseAction = ReportWriterSectionData::MA_Insert;
    sectionData->insertItem = ReportWriterSectionData::GraphItem;
}

//
// Db Actions
//
void ReportHandler::dbConnect() {
    if(!_allowDBConnect) return;

    bool dbConnected = (dbConnectAction->menuText() == strMenuDisconnect);

    if(dbConnected) {
        // disconnect
        QSqlDatabase db = QSqlDatabase::database(QSqlDatabase::defaultConnection,FALSE);
        if(db.isValid()) db.close();
        QSqlDatabase::removeDatabase(QSqlDatabase::defaultConnection);
    } else {
        // connect
        ParameterList params;
        params.append("name", _name);
        params.append("copyright", _copyright);
        params.append("version", _version);
        params.append("build", QString("%1 %2").arg(__DATE__).arg(__TIME__));
        params.append("databaseURL", _databaseURL);

        login newdlg(qApp->mainWidget(), "", TRUE);
        newdlg.set(params);

        if(newdlg.exec() == QDialog::Accepted) {
            _databaseURL = newdlg._databaseURL;
        }
    }

    emit dbOpenClosed();
}

void ReportHandler::dbLoadDoc() {
    QSqlDatabase db = QSqlDatabase::database(QSqlDatabase::defaultConnection, FALSE);
    if(db.isValid()) {
        DBFileDialog rptDiag;
        rptDiag.setCaption(tr("Load Report from Database"));
        rptDiag._name->setReadOnly(true);
        rptDiag._grade->setEnabled(false);
        if(rptDiag.exec() == QDialog::Accepted) {
            QDomDocument doc;
            QString errMsg;
            int errLine, errCol;
            if(doc.setContent(rptDiag.getSource(),&errMsg,&errLine,&errCol)) {
                ReportWindow * rw = fileOpen(doc);
                if(rw) {
                    // setup any variables to let this doc know how it was loaded
                    // so when a save command is issued it knows what to do
                    rw->lastSaveToDb = TRUE;
                    rw->dbRecordName = rptDiag.getNameById();
                    rw->dbRecordGrade = rptDiag.getGradeById();
                }
            } else {
                QMessageBox::warning(qApp->mainWidget(), tr("Error Loading Report"),
                    QString().sprintf(tr("ReportWriterWindow::dbLoadDoc() : ERROR on setContent()\n\t%s (Line %d Column %d)"),errMsg.latin1(),errLine,errCol));
            }
        }
    } else {
        QMessageBox::warning(qApp->mainWidget(), tr("No Database Connection"),
            tr("There is no database connection that can be used to load a document."));
    }
}

void ReportHandler::dbSaveDoc() {
    QSqlDatabase db = QSqlDatabase::database(QSqlDatabase::defaultConnection, FALSE);
    if(db.isValid()) {
        ReportWindow * rw = activeReportWindow();
        if(rw) {
            rw->saveToDb();
        }
    } else {
        QMessageBox::warning(qApp->mainWidget(), tr("No Database Connection"),
            tr("There is no database connection that can be used to save this document."));
    }
}


//
// ReportWindow tracking methods
//
ReportWindow * ReportHandler::activeReportWindow()
{
  ReportWindow * rw = 0;
  // Using the activeWindow call from QWorkspace is more
  // reliable cross platform.
  if(_parentWindowIsWorkspace)
    return (ReportWindow*)((QWorkspace*)_parentWindow)->activeWindow();
  else
  {
    for(rw = rwList.first(); rw; rw = rwList.next())
      if(rw && QApplication::activeWindow() == rw)
        return rw;
  }
  return 0;
}

void ReportHandler::addReportWindow(ReportWindow * rw) {
    if(rw) {
        rw->_handler = this;
        rwList.append(rw);
        connect(rw, SIGNAL(destroyed(QObject*)), this, SLOT(removeReportWindow(QObject*)));
        if(_parentWindowIsWorkspace)
          ((QWorkspace*)_parentWindow)->addWindow(rw);
    }
}

void ReportHandler::removeReportWindow(QObject * obj) {
    ReportWindow * rw = (ReportWindow *)obj;
    rwList.remove(rw);
}

//
// dbMenuAboutToShow
//
void ReportHandler::dbMenuAboutToShow() {
    QSqlDatabase db = QSqlDatabase::database(QSqlDatabase::defaultConnection, FALSE);
    if(db.isValid() && db.isOpen()) {
        dbLoadAction->setEnabled(true);
        dbSaveAction->setEnabled(true);
        dbConnectAction->setMenuText(strMenuDisconnect);
    } else {
        dbLoadAction->setEnabled(false);
        dbSaveAction->setEnabled(false);
        dbConnectAction->setMenuText(strMenuConnect);
    }
}

void ReportHandler::sReportsChanged(int pReportid, bool pLocaleUpdate)
{
  emit reportsChanged(pReportid, pLocaleUpdate);
}
