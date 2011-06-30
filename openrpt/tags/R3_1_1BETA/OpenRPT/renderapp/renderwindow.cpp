/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2008 by OpenMFG, LLC
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
#include <QtGui>
#include <QSqlDatabase>

#include "renderwindow.h"

#include <QVariant>
#include <QPrinter>
#include <QSqlQuery>
#include <QMessageBox>
#include <QApplication>
#include <QCheckBox>
#include <QLineEdit>
#include <QComboBox>
#include <QFileDialog>
#include <QPrintDialog>
#include <QInputDialog>

#include <openreports.h>
#include <xsqlquery.h>

#include <renderobjects.h>
#include <orprerender.h>
#include <orprintrender.h>

#include <newvariant.h>
#include <intedit.h>
#include <booledit.h>
#include <stringedit.h>
#include <listedit.h>
#include <doubleedit.h>

#include "data.h"
#include "parsexmlutils.h"
#include "paramlistedit.h"
#include "previewdialog.h"
#include "builtinSqlFunctions.h"
#include "../wrtembed/dbfiledialog.h"

RenderWindow::RenderWindow(QWidget* parent, Qt::WindowFlags fl)
    : QMainWindow(parent, fl)
{
  setupUi(this);

  (void)statusBar();

  // signals and slots connections
  connect(fileOpenAction, SIGNAL(activated()), this, SLOT(fileOpen()));
  connect(fileLoadFromDB, SIGNAL(activated()), this, SLOT(fileLoad()));
  connect(filePrintPreviewAction, SIGNAL(activated()), this, SLOT(filePreview()));
  connect(filePrintAction, SIGNAL(activated()), this, SLOT(filePrint()));
  connect(filePrintToPDFAction, SIGNAL(activated()), this, SLOT(filePrintToPDF()));
  connect(fileExitAction, SIGNAL(activated()), this, SLOT(fileExit()));
  connect(helpAboutAction, SIGNAL(activated()), this, SLOT(helpAbout()));
  connect(_delete, SIGNAL(clicked()), this, SLOT(sDelete()));
  connect(_edit, SIGNAL(clicked()), this, SLOT(sEdit()));
  connect(_add, SIGNAL(clicked()), this, SLOT(sAdd()));
  connect(_table, SIGNAL(itemSelectionChanged()), this, SLOT(sSelectionChanged()));
  connect(_list, SIGNAL(clicked()), this, SLOT(sList()));
}

RenderWindow::~RenderWindow()
{
  // no need to delete child widgets, Qt does it all for us
}

void RenderWindow::languageChange()
{
  retranslateUi(this);
}

QString RenderWindow::name()
{
  return tr("OpenRPT Renderer");
}


void RenderWindow::helpAbout()
{
  QMessageBox::about(this, tr("About %1").arg(RenderWindow::name()),
    tr("%1 version %2"
       "\n\n%3 is a tool for printing report definition files against a database."
       "\n\n%4, All Rights Reserved").arg(RenderWindow::name()).arg(_version).arg(RenderWindow::name()).arg(_copyright));
}


void RenderWindow::fileOpen()
{
  QString filename = QFileDialog::getOpenFileName(this, QString(), _reportName->text(), tr("XML (*.xml);;All Files (*)"));
  if(filename.isEmpty())
    return;

  fileOpen(filename);
}

void RenderWindow::fileOpen(const QString & filename)
{
  QDomDocument doc;
  QString errMsg;
  int errLine, errColm;
  QFile file(filename);
  if(!doc.setContent(&file, &errMsg, &errLine, &errColm))
  {
    QMessageBox::critical(this, tr("Error Loading File"),
      tr("There was an error opening the file %1."
         "\n\n%2 on line %3 column %4.")
         .arg(filename).arg(errMsg).arg(errLine).arg(errColm) );
    return;
  }

  QDomElement root = doc.documentElement();
  if(root.tagName() != "report")
  {
    QMessageBox::critical(this, tr("Not a Valid File"),
      tr("The file %1 does not appear to be a valid file."
         "\n\nThe root node is not 'report'.").arg(filename) );
    return;
  }

  _report->setText(filename);
  setDocument(doc);
}

void RenderWindow::setDocument(const QDomDocument & doc)
{
  // Clear out the param list for this new document
  _params.clear();
  _lists.clear();
  _table->clear();
  _table->setRowCount(0);

  QDomElement root = doc.documentElement();
  if(root.tagName() != "report")
  {
    QMessageBox::critical(this, tr("Not a Valid Report"),
      tr("The report definition does not appear to be a valid report."
         "\n\nThe root node is not 'report'."));
    return;
  }

  _doc = doc;
  _reportInfo->setEnabled(true);

  _reportName->setText(QString::null);
  _reportTitle->setText(QString::null);
  _reportDescription->setText(QString::null);
  for(QDomNode n = root.firstChild(); !n.isNull(); n = n.nextSibling())
  {
    if(n.nodeName() == "name")
      _reportName->setText(n.firstChild().nodeValue());
    else if(n.nodeName() == "title")
      _reportTitle->setText(n.firstChild().nodeValue());
    else if(n.nodeName() == "description")
      _reportDescription->setText(n.firstChild().nodeValue());
    else if(n.nodeName() == "parameter")
    {
      QDomElement elemSource = n.toElement();
      ORParameter param;

      param.name = elemSource.attribute("name");
      if(param.name.isEmpty())
        continue;
    
      param.type = elemSource.attribute("type");
      param.defaultValue  = elemSource.attribute("default");
      param.active = (elemSource.attribute("active") == "true");
      param.listtype = elemSource.attribute("listtype");
      
      QList<QPair<QString,QString> > pairs;
      if(param.listtype.isEmpty())
        param.description = elemSource.text();
      else
      {
        QDomNodeList section = elemSource.childNodes();
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
            qDebug("While parsing parameter encountered an unknown element: %s",elemThis.tagName().toLatin1().data());
        }
      }
      QVariant defaultVar;
      if(!param.defaultValue.isEmpty())
        defaultVar = QVariant(param.defaultValue);
      if("integer" == param.type)
        defaultVar = defaultVar.toInt();
      else if("double" == param.type)
        defaultVar = defaultVar.toDouble();
      else if("bool" == param.type)
        defaultVar = QVariant(defaultVar.toBool());
      else
        defaultVar = defaultVar.toString();
      updateParam(param.name, defaultVar, param.active);
      QList<QPair<QString, QString> > list;
      if("static" == param.listtype)
        list = param.values;
      else if("dynamic" == param.listtype && !param.query.isEmpty())
      {
        QSqlQuery qry(param.query);
        while(qry.next())
          list.append(qMakePair(qry.value(0).toString(), qry.value(1).toString()));
      }
      if(!list.isEmpty())
        _lists.insert(param.name, list);
    }
  }
}

void RenderWindow::fileLoad()
{
  DBFileDialog rptDiag;
  rptDiag.setWindowTitle(tr("Load Report from Database"));
  rptDiag._name->setReadOnly(true);
  rptDiag._grade->setEnabled(false);
  if(rptDiag.exec() == QDialog::Accepted)
    fileLoad(rptDiag.getName());
}

void RenderWindow::fileLoad(const QString & reportname)
{
  XSqlQuery rq;
  rq.prepare(getSqlFromTag("fmt04", QSqlDatabase::database().driverName()));	// MANU
  rq.bindValue(":report_name", reportname);
  rq.exec();
  if(!rq.first())
  {
    QMessageBox::critical(this, tr("Error Loading Report"),
      tr("There was an error loading the report from the database."));
    return;
  }

  QDomDocument doc;
  QString errMsg;
  int errLine, errColm;
  if(!doc.setContent(rq.value("report_source").toString(), &errMsg, &errLine, &errColm))
  {
    QMessageBox::critical(this, tr("Error Loading Report"),
      tr("There was an error opening the report %1."
         "\n\n%2 on line %3 column %4.")
         .arg(reportname).arg(errMsg).arg(errLine).arg(errColm) );
    return;
  }

  QDomElement root = doc.documentElement();
  if(root.tagName() != "report")
  {
    QMessageBox::critical(this, tr("Not a Valid File"),
      tr("The file %1 does not appear to be a valid file."
         "\n\nThe root node is not 'report'.").arg(reportname) );
    return;
  }

  _report->setText(reportname);
  setDocument(doc);
}

void RenderWindow::filePreview( int numCopies )
{
  print(true, numCopies);
}

void RenderWindow::filePrint( int numCopies )
{
  print(false, numCopies);
}

void RenderWindow::print(bool showPreview, int numCopies )
{
  ORPreRender pre;
  pre.setDom(_doc);
  pre.setParamList(getParameterList());
  ORODocument * doc = pre.generate();

  if(doc)
  {
    QPrinter printer(QPrinter::HighResolution);
    printer.setNumCopies( numCopies );
    if(!_printerName.isEmpty())
    {
      printer.setPrinterName(_printerName);
      _printerName = QString::null;
    }

    if(showPreview) 
    {
      PreviewDialog preview (doc, &printer, this);
      if (preview.exec() == QDialog::Rejected) 
        return;
    }

    ORPrintRender render;
    render.setupPrinter(doc, &printer);

    QPrintDialog pd(&printer);
    pd.setMinMax(1, doc->pages());
    if(pd.exec() == QDialog::Accepted)
    {
      render.setPrinter(&printer);
      render.render(doc);
    }
    delete doc;
  }
}

void RenderWindow::filePrintToPDF()
{
  QString outfile = QFileDialog::getSaveFileName( this, tr("Choose filename to save"), tr("print.pdf"), tr("Pdf (*.pdf)") );

  if(outfile.isEmpty()) // User canceled save dialog
    return;
  
  // BVI::Sednacom
  // use the new member
  filePrintToPDF(outfile);
  // BVI::Sednacom
}

// BVI::Sednacom
// override filePrintToPDF to accept a file path
void RenderWindow::filePrintToPDF( QString & pdfFileName)
{

  // code taken from original code of the member [ void RenderWindow::filePrintToPDF() ]
  if(pdfFileName.isEmpty()) 
    return;

  if ( QFileInfo( pdfFileName ).suffix().isEmpty() )
    pdfFileName.append(".pdf");

  ORPreRender pre;
  pre.setDom(_doc);
  pre.setParamList(getParameterList());
  ORODocument *doc = pre.generate();
  if (doc) {
      ORPrintRender::exportToPDF(doc, pdfFileName);
      delete doc;
  }
}
// BVI::Sednacom

void RenderWindow::fileExit()
{
  qApp->closeAllWindows();
}

void RenderWindow::sAdd()
{
  bool ok = false;
  bool active = false;

  QString name;
  QString varType;
  QVariant var;

  NewVariant newVar(this);

  while(!ok)
  {
    if(newVar.exec() != QDialog::Accepted)
      return;

    name = newVar._name->text();
    varType = newVar._type->currentText();

    ok = !_params.contains(name);
    if(!ok)
      QMessageBox::warning(this, tr("Name already exists"), tr("The name for the parameter you specified already exists in the list."));
  }


  BoolEdit * be = 0;
  IntEdit * ie = 0;
  DoubleEdit * de = 0;
  StringEdit * se = 0;
  ListEdit * le = 0;

  if(varType == NewVariant::tr("String")) {
    se = new StringEdit(this);
    se->_name->setText(name);
    ok = (se->exec() == QDialog::Accepted);
    var = QVariant(se->_value->text());
    active = se->_active->isChecked();
    delete se;
    se = 0;
  } else if(varType == NewVariant::tr("Int")) {
    ie = new IntEdit(this);
    ie->_name->setText(name);
    ok = (ie->exec() == QDialog::Accepted);
    var = QVariant(ie->_value->text().toInt());
    active = ie->_active->isChecked();
    delete ie;
    ie = 0;
  } else if(varType == NewVariant::tr("Double")) {
    de = new DoubleEdit(this);
    de->_name->setText(name);
    ok = (de->exec() == QDialog::Accepted);
    var = QVariant(de->_value->text().toDouble());
    active = de->_active->isChecked();
    delete de;
    de = 0;
  } else if(varType == NewVariant::tr("Bool")) {
    be = new BoolEdit(this);
    be->_name->setText(name);
    ok = (be->exec() == QDialog::Accepted);
    var = QVariant((bool)be->value());
    active = be->_active->isChecked();
    delete be;
    be = 0;
  } else if(varType == NewVariant::tr("List")) {
    le = new ListEdit(this);
    le->_name->setText(name);
    ok = (le->exec() == QDialog::Accepted);
    var = QVariant(le->list());
    active = le->_active->isChecked();
    delete le;
    le = 0;
  } else {
    QMessageBox::warning(this, tr("Unknown Type"), QString(tr("I do not understand the type %1.")).arg(varType));
    return;
  }

  if(!ok)
    return;

  _params[name] = var;

  int r = _table->rowCount();
  _table->setRowCount(r+1);
  QTableWidgetItem * ctItem = new QTableWidgetItem();
  ctItem->setFlags(Qt::ItemIsUserCheckable);
  ctItem->setCheckState((active ? Qt::Checked : Qt::Unchecked));
  _table->setItem(r, 0, ctItem);
  _table->setItem(r, 1, new QTableWidgetItem(name));
  _table->setItem(r, 2, new QTableWidgetItem(var.typeName()));
  _table->setItem(r, 3, new QTableWidgetItem(var.toString()));
  sSelectionChanged();
}


void RenderWindow::sEdit()
{
  if(_table->currentRow() == -1)
    return;

  bool do_update = false;

  int r = _table->currentRow();
  QTableWidgetItem * ctItem = _table->item(r, 0);
  if(ctItem == 0)
    return;
  bool active = ctItem->checkState() == Qt::Checked;
  QString name = _table->item(r, 1)->text();
  QVariant var = _params[name];

  BoolEdit * be = 0;
  IntEdit * ie = 0;
  DoubleEdit * de = 0;
  StringEdit * se = 0;
  ListEdit * le = 0;

  switch(var.type()) {
    case QVariant::Bool:
      be = new BoolEdit(this);
      be->_name->setText(name);
      be->_active->setChecked(active);
      be->setValue(var.toBool());
      if(be->exec() == QDialog::Accepted) {
        var = QVariant((bool)be->value());
        active = be->_active->isChecked();
        do_update = TRUE;
      }
      delete be;
      be = 0;
      break;
    case QVariant::Int:
      ie = new IntEdit(this);
      ie->_name->setText(name);
      ie->_active->setChecked(active);
      ie->_value->setText(QString::number(var.toInt()));
      if(ie->exec() == QDialog::Accepted) {
        var = QVariant(ie->_value->text().toInt());
        active = ie->_active->isChecked();
        do_update = TRUE;
      }
      delete ie;
      ie = 0;
      break;
    case QVariant::Double:
      de = new DoubleEdit(this);
      de->_name->setText(name);
      de->_active->setChecked(active);
      de->_value->setText(QString::number(var.toDouble()));
      if(de->exec() == QDialog::Accepted) {
        var = QVariant(de->_value->text().toDouble());
        active = de->_active->isChecked();
        do_update = TRUE;
      }
      delete de;
      de = 0;
      break;
    case QVariant::String:
      se = new StringEdit(this);
      se->_name->setText(name);
      se->_active->setChecked(active);
      se->_value->setText(var.toString());
      if(se->exec() == QDialog::Accepted) {
        var = QVariant(se->_value->text());
        active = se->_active->isChecked();
        do_update = TRUE;
      }
      delete se;
      se = 0;
      break;
    case QVariant::List:
      le = new ListEdit(this);
      le->_name->setText(name);
      le->_active->setChecked(active);
      le->setList(var.toList());
      if(le->exec() == QDialog::Accepted) {
        var = QVariant(le->list());
        active = le->_active->isChecked();
        do_update = TRUE;
      }
      delete le;
      le = 0;
      break;
    default:
      QMessageBox::warning(this, tr("Warning"), QString(tr("I do not know how to edit QVariant type %1.")).arg(var.typeName()));
  };
  
  if(do_update) {
    _params[name] = var;
    ctItem->setCheckState((active ? Qt::Checked : Qt::Unchecked));
    _table->item(r, 1)->setText(name);
    _table->item(r, 2)->setText(var.typeName());
    _table->item(r, 3)->setText(var.toString());
  }
}


void RenderWindow::sDelete()
{
  if(_table->currentRow() == -1)
    return;

  QString name = _table->item( _table->currentRow(), 1)->text();
  _params.remove(name);
  _lists.remove(name);
  _table->removeRow(_table->currentRow());
}


ParameterList RenderWindow::getParameterList()
{
  ParameterList plist;
 
  QString name;
  QVariant value;
  QTableWidgetItem * ctItem = 0;
  for(int r = 0; r < _table->rowCount(); r++) {
    ctItem = _table->item(r, 0);
    if(ctItem->checkState() == Qt::Checked) {
      name = _table->item(r, 1)->text();
      value = _params[name];
      plist.append(name, value);
    }
  }
    
  return plist;
}

void RenderWindow::updateParam(const QString & name, const QVariant & value, bool active)
{
  QTableWidgetItem * ctItem = 0;
  _params[name] = value;
  int r;
  for(r = 0; r < _table->rowCount(); r++) {
    if(_table->item(r, 1)->text() == name)
    {
      ctItem = _table->item(r, 0);
      ctItem->setCheckState((active ? Qt::Checked : Qt::Unchecked));
      _table->item(r, 2)->setText(value.typeName());
      _table->item(r, 3)->setText(value.toString());
      return;
    }
  }

  // If we didn't find an existing parameter by the name specified add one
  r = _table->rowCount();
  _table->setRowCount(r+1);
  ctItem = new QTableWidgetItem();
  ctItem->setFlags(Qt::ItemIsUserCheckable);
  ctItem->setCheckState((active ? Qt::Checked : Qt::Unchecked));
  _table->setItem(r, 0, ctItem);
  _table->setItem(r, 1, new QTableWidgetItem(name));
  _table->setItem(r, 2, new QTableWidgetItem(value.typeName()));
  _table->setItem(r, 3, new QTableWidgetItem(value.toString()));
}


void RenderWindow::sSelectionChanged()
{
  bool yes = (_table->currentRow() != -1);
  _edit->setEnabled(yes);
  _list->setEnabled(yes);
  _delete->setEnabled(yes);
  if(yes)
  {
    int r = _table->currentRow();
    _list->setEnabled(_lists.contains(_table->item(r, 1)->text()));
  }
}

void RenderWindow::sList()
{
  if(_table->currentRow() == -1)
    return;

  int r = _table->currentRow();
  QString name = _table->item(r, 1)->text();
  QVariant var = _params[name];
  QList<QPair<QString, QString> > list = _lists[name];

  ParamListEdit newdlg(this);
  for(QList<QPair<QString, QString> >::iterator it = list.begin();
    it != list.end(); it++ )
  {
    QListWidgetItem * item = new QListWidgetItem((*it).second, newdlg._list);
    if((*it).first == var.toString())
      newdlg._list->setCurrentItem(item);
  }
  
  if(newdlg.exec() == QDialog::Accepted)
  {
    QVariant tmp(list[newdlg._list->currentRow()].first);
    if(tmp.convert(var.type()))
    {
      _params[name] = tmp;
      _table->item(r, 3)->setText(tmp.toString());
    }
  }
}

