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

#include "reportwindow.h"
#include "reportsection.h"
#include "reportgridoptions.h"
#include "reportentities.h"
#include "reporthandler.h"

// common
#include <reportpageoptions.h>
#include <pagesizeinfo.h>
#include <labelsizeinfo.h>

// qt
#include <qapplication.h>
#include <qlabel.h>
#include <qcolor.h>
#include <qpainter.h>
#include <qrect.h>
#include <qcursor.h>
#include <qdom.h>
#include <qmessagebox.h>
#include <qlayout.h>
//Added by qt3to4:
#include <Q3Frame>
#include <QVBoxLayout>
#include <QMouseEvent>


extern int dpiX;
extern int dpiY;


//
// ReportSection method implementations
//

ReportSection::ReportSection(ReportWindow * rptwin, QWidget * parent, const char * name)
  : QWidget(parent,name) {
    QVBoxLayout * vboxlayout = new QVBoxLayout(this);
    vboxlayout->setSpacing(0);
    vboxlayout->setMargin(0);

    // ok create the base interface
    title = new QLabel(this);
    title->setObjectName("section title");
    title->setText(tr("SECTION TITLE"));
    title->setFrameStyle(Q3Frame::StyledPanel | Q3Frame::Raised);
    vboxlayout->addWidget(title);

    grid = rptwin->gridOptions;

    canvas = new ReportCanvas(1, dpiY); // when we set the pageOptions value it will adjust
    canvas->setGridOptions(rptwin->gridOptions);
    canvas->setPageOptions(rptwin->pageOptions);
    canvasview = new ReportCanvasView(rptwin, canvas, this,"canvas view");
    vboxlayout->addWidget(canvasview);

    ReportResizeBar * rb = new ReportResizeBar(this);
    connect(rb,SIGNAL(barDragged(int)),this,SLOT(resizeBarDragged(int)));
    vboxlayout->addWidget(rb);

    this->setLayout(vboxlayout);
}

ReportSection::~ReportSection() {
    // Qt should be handling everything for us
}

void ReportSection::setTitle(const QString & s) {
    title->setText(s);
}

void ReportSection::resizeBarDragged(int delta) {
    if(canvasview->document() && canvasview->document()->pageOptions
        && canvasview->document()->pageOptions->getPageSize() == "Labels") {
        return; // we don't want to allow this on reports that are for labels
    }

    int h = canvas->height() + delta;
    if(h < 1) h = 1;
    if(grid->isSnap()) {
        int incr = (int)(grid->yInterval() * dpiY);
        int nh = (h / incr) * incr;
        if(nh == 0) nh = incr;
        h = nh;
    }
    canvas->resize(canvas->width(), h);

    //resize(width(), h + title->height() + 5);
    if(canvasview->document()) canvasview->document()->setModified(TRUE);

    adjustSize();
    QWidget * w = parentWidget();
    if(w)
    {
      w->adjustSize();
      if(w->isA("ReportSectionDetail"))
        w->parentWidget()->adjustSize();
    }
}

void ReportSection::buildXML(QDomDocument & doc, QDomElement & section) {
    //qDebug("ReportSection::buildXML()");
    float f = (float)canvas->height() / dpiY * 100.0;
    f = ((f - (int)f) > .5 ? (int)f : (int)f + 1);
    QDomElement height = doc.createElement("height");
    height.appendChild(doc.createTextNode(QString::number((int)f)));
    section.appendChild(height);

    // now get a list of all the QCanvasItems on this canvas and output them.
    Q3CanvasItemList list = canvas->allItems();
    for(Q3CanvasItemList::iterator it = list.begin();
          it != list.end(); it++ ) {
          ReportEntity::buildXML((*it),doc,section);
    }
}

void ReportSection::initFromXML(QDomNode & section) {
    QDomNodeList nl = section.childNodes();
    QDomNode node;
    QString n;
    for(int i = 0; i < nl.count(); i++) {
        node = nl.item(i);
        n = node.nodeName();
        if(n == "height") {
            double h = node.firstChild().nodeValue().toDouble() / 100.0;
            h *= dpiY;
            canvas->resize(canvas->width(),(int)h);
        } else if(n == "label") {
            (new ReportEntityLabel(node, canvasview->document(), canvas))->setVisible(TRUE);
        } else if(n == "field") {
            (new ReportEntityField(node, canvasview->document(), canvas))->setVisible(TRUE);
        } else if(n == "text") {
            (new ReportEntityText(node, canvasview->document(), canvas))->setVisible(TRUE);
        } else if(n == "line") {
            (new ReportEntityLine(node, canvasview->document(), canvas))->setVisible(TRUE);
        } else if(n == "rect") {
            (new ReportEntityRect(node, canvasview->document(), canvas))->setVisible(TRUE);
        } else if(n == "barcode") {
            (new ReportEntityBarcode(node, canvasview->document(), canvas))->setVisible(TRUE);
        } else if(n == "image") {
            (new ReportEntityImage(node, canvasview->document(), canvas))->setVisible(TRUE);
        } else if(n == "graph") {
            (new ReportEntityGraph(node, canvasview->document(), canvas))->setVisible(TRUE);
        } else if(n == "key" || n == "firstpage" || n == "lastpage"
                    || n == "odd" || n == "even") {
            // these are all handled elsewhere but we don't want to show errors
            // because they are expected sometimes
        } else {
            qDebug("Encountered unknown node while parsing section: %s", n.latin1());
        }
    }
}

//
// ReportSectionDetailGroup
//
ReportSectionDetailGroup::ReportSectionDetailGroup(const QString & title, ReportSectionDetail * rsd, QWidget * parent, const char * name)
  : QObject(parent, name), _rsd(rsd) {
    _pagebreak = BreakNone;
    ReportWindow * rw = 0;
    if(_rsd) {
        rw = rsd->reportWindow();
    }
    _head = new ReportSection(rw, _rsd);
    _foot = new ReportSection(rw, _rsd);
    showGroupHead(FALSE);
    showGroupFoot(FALSE);

    setTitle(title);
}

ReportSectionDetailGroup::~ReportSectionDetailGroup() {
    // Qt should be handling everything for us
    _rsd = 0;
}

void ReportSectionDetailGroup::showGroupHead(bool yes) {
    if(isGroupHeadShowing() != yes) {
        if(_rsd && _rsd->reportWindow()) _rsd->reportWindow()->setModified(TRUE);
    }
    if(yes) _head->show();
    else _head->hide();
    _rsd->adjustSize();
}
 
void ReportSectionDetailGroup::showGroupFoot(bool yes) {
    if(isGroupFootShowing() != yes) {
        if(_rsd && _rsd->reportWindow()) _rsd->reportWindow()->setModified(TRUE);
    }
    if(yes) _foot->show();
    else _foot->hide();
    _rsd->adjustSize();
}

void ReportSectionDetailGroup::setPageBreak(int pb) {
    _pagebreak = pb;
}

bool ReportSectionDetailGroup::isGroupHeadShowing() { return _head->isVisible(); }
bool ReportSectionDetailGroup::isGroupFootShowing() { return _foot->isVisible(); }
int ReportSectionDetailGroup::pageBreak() const { return _pagebreak; }

QString ReportSectionDetailGroup::column() { return _column; }
void ReportSectionDetailGroup::setColumn(const QString & s) {
    if(_column != s) {
        _column = s;
        if(_rsd && _rsd->reportWindow()) _rsd->reportWindow()->setModified(TRUE);
    }
}

ReportSection * ReportSectionDetailGroup::getGroupHead() { return _head; }
ReportSection * ReportSectionDetailGroup::getGroupFoot() { return _foot; }

QString ReportSectionDetailGroup::getTitle() { return _name; }
void ReportSectionDetailGroup::setTitle(const QString & s) {
    if(_name != s) {
        _name = s;
        if(_rsd && _rsd->reportWindow()) _rsd->reportWindow()->setModified(TRUE);
    }
    _head->setTitle(_name + " Group Header");
    _foot->setTitle(_name + " Group Footer");
}

//
// ReportSectionDetail
//
ReportSectionDetail::ReportSectionDetail(ReportWindow * rptwin, QWidget * parent, const char * name )
  : QWidget(parent, name) {
    _pagebreak = BreakNone;
    vboxlayout = new QVBoxLayout(this);
    vboxlayout->setSpacing(0);
    vboxlayout->setMargin(0);
    _rw = rptwin;
    _detail = new ReportSection(rptwin, this);
    vboxlayout->addWidget(_detail);
    setTitle(tr("unnamed"));

    this->setLayout(vboxlayout);
}
ReportSectionDetail::~ReportSectionDetail() {
    // Qt should be handling everything for us
    _rw = 0;
}

void ReportSectionDetail::adjustSize()
{
  QWidget::adjustSize();
  parentWidget()->adjustSize();
}

QString ReportSectionDetail::getTitle() { return _name; }
void ReportSectionDetail::setTitle(const QString & s) {
    if(_name != s) {
        _name = s;
        if(_rw) _rw->setModified(TRUE);
    }
    _detail->setTitle(_name + " Detail");
}

QString ReportSectionDetail::query() { return _query; }
void ReportSectionDetail::setQuery(const QString & s) {
    if(_query != s) {
        _query = s;
        if(_rw) _rw->setModified(TRUE);
    }
}

int ReportSectionDetail::pageBreak() const { return _pagebreak; }
void ReportSectionDetail::setPageBreak(int pb) { _pagebreak = pb; }

ReportSection * ReportSectionDetail::getDetail() { return _detail; }

void ReportSectionDetail::buildXML(QDomDocument & doc, QDomElement & section) {
    // name/title
    QDomElement name = doc.createElement("name");
    name.appendChild(doc.createTextNode(getTitle()));
    section.appendChild(name);

    if(pageBreak() != ReportSectionDetail::BreakNone)
    {
      QDomElement spagebreak = doc.createElement("pagebreak");
      if(pageBreak() == ReportSectionDetail::BreakAtEnd)
        spagebreak.setAttribute("when", "at end");
      section.appendChild(spagebreak);
    }

    for(unsigned int i = 0; i < groupList.count(); i++) {
        ReportSectionDetailGroup * rsdg = groupList.at(i);
        QDomNode grp = doc.createElement("group");

        QDomNode gname = doc.createElement("name");
        gname.appendChild(doc.createTextNode(rsdg->getTitle()));
        grp.appendChild(gname);

        QDomNode gcol = doc.createElement("column");
        gcol.appendChild(doc.createTextNode(rsdg->column()));
        grp.appendChild(gcol);

        if(rsdg->pageBreak() != ReportSectionDetailGroup::BreakNone)
        {
          QDomElement pagebreak = doc.createElement("pagebreak");
          if(rsdg->pageBreak() == ReportSectionDetailGroup::BreakAfterGroupFooter)
            pagebreak.setAttribute("when", "after foot");
          grp.appendChild(pagebreak);
        }

        //group head
        if(rsdg->isGroupHeadShowing()) {
            QDomElement ghead = doc.createElement("head");
            rsdg->getGroupHead()->buildXML(doc,ghead);
            grp.appendChild(ghead);
        }
        // group foot
        if(rsdg->isGroupFootShowing()) {
            QDomElement gfoot = doc.createElement("foot");
            rsdg->getGroupFoot()->buildXML(doc,gfoot);
            grp.appendChild(gfoot);
        }

        section.appendChild(grp);
    }

    // detail section
    QDomElement gdetail = doc.createElement("detail");
    QDomElement key = doc.createElement("key");
    QDomElement kquery = doc.createElement("query");
    kquery.appendChild(doc.createTextNode(query()));
    key.appendChild(kquery);
    gdetail.appendChild(key);
    _detail->buildXML(doc,gdetail);
    section.appendChild(gdetail);

}

void ReportSectionDetail::initFromXML(QDomNode & section) {
    QDomNodeList nl = section.childNodes();
    QDomNode node;
    QString n;

    // some code to handle old style defs
    QString o_name = "unnamed";
    QString o_column = QString::null;
    bool old_head = FALSE;
    QDomNode o_head;
    bool old_foot = FALSE;
    QDomNode o_foot;

    for(int i = 0; i < nl.count(); i++) {
        node = nl.item(i);
        n = node.nodeName();
        if(n == "name") {
            o_name = node.firstChild().nodeValue();
            setTitle(o_name);
        } else if(n == "pagebreak") {
          QDomElement eThis = node.toElement();
          if(eThis.attribute("when") == "at end")
            setPageBreak(BreakAtEnd);
        } else if(n == "group") {
            ReportSectionDetailGroup * rsdg = new ReportSectionDetailGroup("unnamed", this, this);
            QDomNodeList gnl = node.childNodes();
            QDomNode gnode;
            bool show_head = FALSE;
            bool show_foot = FALSE;
            for(int gi = 0; gi < gnl.count(); gi++) {
                gnode = gnl.item(gi);
                if(gnode.nodeName() == "name") {
                    rsdg->setTitle(gnode.firstChild().nodeValue());
                } else if(gnode.nodeName() == "column") {
                    rsdg->setColumn(gnode.firstChild().nodeValue());
                } else if(gnode.nodeName() == "pagebreak") {
                  QDomElement elemThis = gnode.toElement();
                  QString n = elemThis.attribute("when");
                  if("after foot" == n)
                    rsdg->setPageBreak(ReportSectionDetailGroup::BreakAfterGroupFooter);
                } else if(gnode.nodeName() == "head") {
                    rsdg->getGroupHead()->initFromXML(gnode);
                    rsdg->showGroupHead(TRUE);
                    show_head = TRUE;
                } else if(gnode.nodeName() == "foot") {
                    rsdg->getGroupFoot()->initFromXML(gnode);
                    rsdg->showGroupFoot(TRUE);
                    show_foot = TRUE;
                } else {
                    qDebug("encountered unknown element while parsing group element: %s", gnode.nodeName().latin1());
                }
            }
            insertSection(groupSectionCount(), rsdg);
            rsdg->showGroupHead(show_head);
            rsdg->showGroupFoot(show_foot);
        } else if(n == "grouphead") {
            o_head = node;
            old_head = TRUE;
        } else if(n == "groupfoot") {
            o_foot = node;
            old_foot = TRUE;
        } else if(n == "detail") {
            // need to pull out the query key values
            QDomNode key = node.namedItem("key");
            if(key.isNull()) {
                qDebug("Did not find a key element while parsing detail section");
            } else {
                QDomNodeList knl = key.childNodes();
                QDomNode knode;
                for(int ki = 0; ki < knl.count(); ki++) {
                    knode = knl.item(ki);
                    if(knode.nodeName() == "query") {
                        setQuery(knode.firstChild().nodeValue());
                    } else if(knode.nodeName() == "column") {
                        o_column = knode.firstChild().nodeValue();
                    } else {
                        qDebug("encountered unknown element while parsing key element: %s", knode.nodeName().latin1());
                    }
                }
            }
            _detail->initFromXML(node);
        } else {
            // unknown element
            qDebug("while parsing section encountered and unknown element: %s", n.latin1());
        }
    }

    if(old_head || old_foot) {
        ReportSectionDetailGroup * rsdg = new ReportSectionDetailGroup(o_name, this, this);

        rsdg->setColumn(o_column);
        if(old_head)
            rsdg->getGroupHead()->initFromXML(o_head);
        if(old_foot)
            rsdg->getGroupFoot()->initFromXML(o_foot);

        // if we encountered this situation then we shouldn't have
        // any other sections but to be sure we will just tack this one
        // onto the end
        insertSection(groupSectionCount(), rsdg);

        rsdg->showGroupHead(old_head);
        rsdg->showGroupFoot(old_foot);
    }
}

ReportWindow * ReportSectionDetail::reportWindow() { return _rw; }

int ReportSectionDetail::groupSectionCount() {
    return groupList.count();
}

ReportSectionDetailGroup * ReportSectionDetail::getSection(int i) {
    return groupList.at(i);
}

void ReportSectionDetail::insertSection(int idx, ReportSectionDetailGroup * rsd) {
    groupList.insert(idx, rsd);

    rsd->getGroupHead()->setParent(this);
    rsd->getGroupFoot()->setParent(this);

    idx = 0;
    int gi = 0;
    for(gi = 0; gi < (int)groupList.count(); gi++) {
        rsd = groupList.at(gi);
        vboxlayout->remove(rsd->getGroupHead());
        vboxlayout->insertWidget(idx, rsd->getGroupHead());
        idx++;
    }
    vboxlayout->remove(_detail);
    vboxlayout->insertWidget(idx, _detail);
    idx++;
    for(gi = ((int)groupList.count() - 1); gi >= 0; gi--) {
        rsd = groupList.at(gi);
        vboxlayout->remove(rsd->getGroupFoot());
        vboxlayout->insertWidget(idx, rsd->getGroupFoot());
        idx++;
    }

    if(_rw) _rw->setModified(TRUE);
    adjustSize();
}

int ReportSectionDetail::findSection(const QString & name) {
    // find the item by its name
    ReportSectionDetailGroup * rsd = 0;
    for(unsigned int i = 0; i < groupList.count(); i++) {
        rsd = groupList.at(i);
        if(name == rsd->getTitle()) return i;
    }
    return -1;
}

void ReportSectionDetail::removeSection(int idx, bool del) {
    ReportSectionDetailGroup * rsd = groupList.at(idx);
    groupList.remove(idx);
    if(_rw) _rw->setModified(TRUE);
    if(del == TRUE) delete rsd;
    adjustSize();
}

//
// ReportCanvas method implementations
//
ReportCanvas::ReportCanvas(int w, int h)
  : Q3Canvas(w, h) {
    grid = 0;
    page = 0;
}
ReportCanvas::~ReportCanvas() {
    // Qt should be handling everything for us
}

void ReportCanvas::setGridOptions(ReportGridOptions * rgo) {
    if(grid) {
        disconnect(grid, SIGNAL(gridOptionsChanged()), this, SLOT(gridOptionsChanged()));
    }
    grid = rgo;
    if(grid) {
        connect(grid, SIGNAL(gridOptionsChanged()), this, SLOT(gridOptionsChanged()));
    }
    gridOptionsChanged();
}

void ReportCanvas::setPageOptions(ReportPageOptions * rpo) {
    if(page) {
        disconnect(page, SIGNAL(pageOptionsChanged()), this, SLOT(pageOptionsChanged()));
    }
    page = rpo;
    if(page) {
        connect(page, SIGNAL(pageOptionsChanged()), this, SLOT(pageOptionsChanged()));
    }
    pageOptionsChanged();
}

void ReportCanvas::drawForeground(QPainter & painter, const QRect & clip) {
    if(grid && grid->isVisible()) {
        int x_pixel_increment, y_pixel_increment;
        // I really should determine this value based on some
        // of the ReportGridOption parameters
        x_pixel_increment = (int)(dpiX * grid->xInterval());
        y_pixel_increment = (int)(dpiY * grid->yInterval());
        QPen pen = painter.pen();
        painter.setPen(QColor(128,128,128));
        // draw it up
        for(int y = 0; y < clip.bottom(); y += y_pixel_increment) {
            for(int x = 0; x < clip.right(); x += x_pixel_increment) {
                if(x >= clip.left() && y >= clip.top())
                    painter.drawPoint(x, y);
            }
        }
        painter.setPen(pen);
        setChanged(clip);
    }
}

void ReportCanvas::gridOptionsChanged() {
    //qDebug("ReportCanvas::gridOptionsChanged()");
    // request that the canvas be redrawn
    setAllChanged();
    update();
}

void ReportCanvas::pageOptionsChanged() {
    int cw = 0;
    int ch = 0;
    int width = 0;
    int height = 0;

    if(page->getPageSize() == "Labels") {
        // add code here to determine how big our canvas area
        // should be the type of label specified
        LabelSizeInfo lbl = LabelSizeInfo::getByName(page->getLabelType());
        if(!lbl.isNull()) {
            if(page->getOrientation() == ReportPageOptions::Portrait) {
                width = lbl.width();
                height = lbl.height();
            } else /*if(page->getOrientation() == ReportPageOptions::Landscape)*/ {
                width = lbl.height();
                height = lbl.width();
            }
        }
    } else {
        PageSizeInfo pi = PageSizeInfo::getByName(page->getPageSize());
        if(pi.isNull()) {
            cw = (int)(page->getCustomWidth() * dpiX);
            ch = (int)(page->getCustomHeight() * dpiX);
        } else {
            cw = (int)((pi.width() / 100.0) * dpiX);
            ch = (int)((pi.height() / 100.0) * dpiX);
        }

        width = (page->getOrientation() == ReportPageOptions::Portrait ? cw : ch)
                    - (int)((page->getMarginLeft() + page->getMarginRight()) * dpiX);
        height = this->height();
    }


    if(width < 1) {
        qDebug("ReportCanvas::pageOptionsChanged(): ERROR: width = %d", width);
        width = 1;
    }
    if(height < 1) {
        qDebug("ReportCanvas::pageOptionsChanged(): ERROR: height = %d", height);
        height = 1;
    }
    resize(width, height);
}

//
// ReportCanvasView method implementations
//

ReportCanvasView::ReportCanvasView(ReportWindow * rw, QWidget * parent, const char * name) 
  : Q3CanvasView(parent, name) {
    //qDebug("ReportCanvasView::ReportCanvasView(QWidget*,const char*)");

    _rw = rw;

    viewport()->setMouseTracking(TRUE);

    setVScrollBarMode(AlwaysOff);
    setHScrollBarMode(AlwaysOff);
}

ReportCanvasView::ReportCanvasView(ReportWindow * rw, Q3Canvas * canvas, QWidget * parent, const char * name)
  : Q3CanvasView(parent, name) {
    //qDebug("ReportCanvasView::ReportCanvasView(QCanvas*,QWidget*,const char*)");

    _rw = rw;

    viewport()->setMouseTracking(TRUE);

    setVScrollBarMode(AlwaysOff);
    setHScrollBarMode(AlwaysOff);

    setCanvas(canvas);
}

ReportCanvasView::~ReportCanvasView() {
    viewport()->setMouseTracking(FALSE);
}

void ReportCanvasView::resizeContents(int w, int h) {
    //qDebug("ReportCanvasView::resizeContents(%d, %d)", w, h);
    setMinimumWidth(w+4);
    setMaximumWidth(w+4);
    setMinimumHeight(h+4);
    setMaximumHeight(h+4);

    resize(w+4,h+4);

    Q3CanvasView::resizeContents(w, h);
}

ReportWindow * ReportCanvasView::document() { return _rw; }

void ReportCanvasView::contentsMouseMoveEvent(QMouseEvent * e) {
    //qDebug("ReportCanvasView::contentsMouseMoveEvent()");
    //ReportWriterWindow* w = (ReportWriterWindow*)topLevelWidget();
    _rw->handler()->sectionMouseMoveEvent(this, e);
}
void ReportCanvasView::contentsMousePressEvent(QMouseEvent * e) {
    //qDebug("ReportCanvasView::contentsMousePressEvent()");
    //ReportWriterWindow* w = (ReportWriterWindow*)topLevelWidget();
    _rw->handler()->sectionMousePressEvent(this, e);
}
void ReportCanvasView::contentsMouseReleaseEvent(QMouseEvent * e) {
    //qDebug("ReportCanvasView::contentsMouseReleaseEvent()");
    //ReportWriterWindow* w = (ReportWriterWindow*)topLevelWidget();
    _rw->handler()->sectionMouseReleaseEvent(this, e);
}
void ReportCanvasView::contentsMouseDoubleClickEvent(QMouseEvent * e) {
    //qDebug("ReportCanvasView::contentsMouseDoubleClickEvent()");
    //ReportWriterWindow* w = (ReportWriterWindow*)topLevelWidget();
    _rw->handler()->sectionMouseDoubleClickEvent(this, e);
}

//
// class ReportResizeBar
//
ReportResizeBar::ReportResizeBar(QWidget * parent, Qt::WFlags f)
  : QFrame(parent, f) {
    setMinimumHeight(5);
    setMaximumHeight(5);
    setCursor(QCursor(Qt::SizeVerCursor));
    setFrameShape(QFrame::StyledPanel);
    setFrameShadow(QFrame::Raised);
}

void ReportResizeBar::mouseMoveEvent(QMouseEvent * e) {
    e->accept();
    //qDebug("%d", e->y());
    emit barDragged(e->y());
}

