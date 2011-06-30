/*
 * Copyright (c) 2002-2005 by OpenMFG, LLC
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * If you do not wish to be bound by the terms of the GNU General Public
 * License, DO NOT USE THIS SOFTWARE.  Please contact OpenMFG, LLC at
 * info@openmfg.com for details on how to purchase a commercial license.
 */

#include "reportwindow.h"
#include "reportsection.h"
#include "reportgridoptions.h"
#include "reportentities.h"
#include "reporthandler.h"


// dialogs
#include <sectioneditor.h>
#include <dbfiledialog.h>
#include <pagesetup.h>
#include <reportproperties.h>
#include <reportparameterlist.h>
#include <querylist.h>
#include <colorlist.h>

// common
#include <dbtools.h>
#include <querysource.h>
#include <reportpageoptions.h>
#include <xsqlquery.h>

// qt
#include <qpixmap.h>
#include <qlayout.h>
#include <qdom.h>
#include <qtextstream.h>
#include <qiodevice.h>
#include <qfile.h>
#include <qfiledialog.h>
#include <qcombobox.h>
#include <qtextedit.h>
#include <qregexp.h>
#include <qmessagebox.h>
#include <qsqlerror.h>
#include <qlineedit.h>
#include <qspinbox.h>

// images
#include <document.xpm>


ReportWindow::ReportWindow(ReportGridOptions * rgo, QWidget * parent, const char * name)
  : QMainWindow(parent, name, WDestructiveClose) {
    lastSaveToDb = FALSE;
    dbRecordGrade = -1;
    _modified = FALSE;
    _handler = 0;
    setCaption();
    setIcon(QPixmap(document_xpm));

    qsList = new QuerySourceList();
    pageOptions = new ReportPageOptions();
    gridOptions = rgo;

    rptHead = rptFoot = 0;
    pageHeadFirst = pageHeadOdd = pageHeadEven = pageHeadLast = pageHeadAny = 0;
    pageFootFirst = pageFootOdd = pageFootEven = pageFootLast = pageFootAny = 0;

    // Set default Watermark Properties
    _wmOpacity = 25;
    _wmFont = QFont("Arial");
    _wmUseDefaultFont = true;
    _wmUseStaticText = true;
    _wmText = QString::null;
    _wmColumn = QString::null;
    _wmQuery = QString::null;

    // Set default Background Properties
    _bgEnabled = false;
    _bgStatic = true;
    _bgImage = QString::null;
    _bgQuery = QString::null;
    _bgColumn = QString::null;
    _bgResizeMode = "clip";
    _bgAlign = Qt::AlignLeft | Qt::AlignTop;
    _bgBoundsX = 100;
    _bgBoundsY = 100;
    _bgBoundsWidth = 650;
    _bgBoundsHeight = 900;
    _bgOpacity = 25;

    QScrollView * sv = new QScrollView(this);
    vbox = new QWidget(sv->viewport());
    vboxlayout = new QVBoxLayout(vbox);
    sv->addChild(vbox);
    setCentralWidget(sv);
   
    ReportSectionDetail * rsd = new ReportSectionDetail(this,vbox);
    insertSection(detailSectionCount(), rsd);

    connect(pageOptions, SIGNAL(pageOptionsChanged()), this, SLOT(setModified()));
    connect(qsList, SIGNAL(updated()), this, SLOT(setModified()));
}

ReportWindow::~ReportWindow() {
    if(qsList != 0) {
        delete qsList;
        qsList = 0;
    }
    if(pageOptions != 0) {
        delete pageOptions;
        pageOptions = 0;
    }
    gridOptions = 0;
}

void ReportWindow::setCaption() {
    QString cap = QString();
    if(_title.isEmpty()) cap = tr("Untitled Document");
    else cap = _title;
    if(isModified()) {
        cap += tr(" *");
    }
    QMainWindow::setCaption(cap);
}

void ReportWindow::closeEvent(QCloseEvent * e) {
    if(_modified != FALSE) {
        switch(QMessageBox::information(this,tr("Report Writer"),tr("The document '%1' contains unsaved changes.\nDo you want to save the changes before closing?").arg(caption()),tr("Save"),tr("Discard"),tr("Cancel"), 0, 2)) {
            case 0:
                // save the doc...
                // if we get a not save result we'll bail so the
                // user doesn't loose any work.
                if(!save()) return;
            case 1:
                // all we have to do is just accept the close event
                break;
            case 2:
                return;
            default:
                qDebug("Encountered a problem in the close event handler....");
                // should we just go ahead and close??? or should we not close???
        }
    }
    e->accept();
}

void ReportWindow::sectionEditor() {
    SectionEditor * se = new SectionEditor(this);
    se->init(this);
    se->exec();
    delete se;
}

void ReportWindow::docInfoEditor() {
    ReportProperties * diag = new ReportProperties(this);
    if(diag) {
        // Info
        diag->setReportTitle(reportTitle());
        diag->setReportName(reportName());
        diag->setReportDescription(reportDescription());
        // Background
        diag->setBgEnabled(bgEnabled());
        diag->setBgStatic(bgStatic());
        diag->setBgImageData(bgImage());
        diag->setBgQuery(qsList, bgQuery());
        diag->setBgColumn(bgColumn());
        diag->setBgResizeMode(bgResizeMode());
        diag->setBgAlign(bgAlign());
        diag->setBgBoundsX(bgBoundsX());
        diag->setBgBoundsY(bgBoundsY());
        diag->setBgBoundsWidth(bgBoundsWidth());
        diag->setBgBoundsHeight(bgBoundsHeight());
        diag->setBgOpacity(bgOpacity());
        // Watermark
        diag->setWatermarkOpacity(watermarkOpacity());
        diag->setWmFont(watermarkFont());
        diag->SetUseBestWMFont(watermarkUseDefaultFont());
        diag->setWmTextStatic(watermarkUseStaticText());
        diag->setWmText(watermarkText());
        diag->setWmColumn(watermarkColumn());
        diag->setWmQuery(qsList, watermarkQuery());
        if(diag->exec() == QDialog::Accepted) {
            // Info
            setReportTitle(diag->getReportTitle());
            setReportName(diag->getReportName());
            setReportDescription(diag->getReportDescription());
            // Background
            setBgEnabled(diag->isBgEnabled());
            setBgStatic(diag->isBgStatic());
            setBgImage(diag->getBgImageData());
            setBgQuery(diag->getBgQuery());
            setBgColumn(diag->getBgColumn());
            setBgResizeMode(diag->getBgResizeMode());
            setBgAlign(diag->getBgAlign());
            setBgBoundsX(diag->getBgBoundsX());
            setBgBoundsY(diag->getBgBoundsY());
            setBgBoundsWidth(diag->getBgBoundsWidth());
            setBgBoundsHeight(diag->getBgBoundsHeight());
            setBgOpacity(diag->getBgOpacity());
            // Watermark
            setWatermarkOpacity(diag->getWatermarkOpacity());
            setWatermarkFont(diag->getWmFont());
            setWatermarkUseDefaultFont(diag->getUseBestWmFont());
            setWatermarkUseStaticText(diag->isWmTextStatic());
            setWatermarkText(diag->getWmText());
            setWatermarkColumn(diag->getWmColumn());
            setWatermarkQuery(diag->getWmQuery());
        }
        delete diag;
    }
}

void ReportWindow::docPageSetup() {
    PageSetup * ps = new PageSetup(this);
    ps->setPortrait(pageOptions->isPortrait());
    ps->setPaperSize(pageOptions->getCustomWidth(), pageOptions->getCustomHeight());
    ps->setPaperSize(pageOptions->getPageSize());
    ps->setLabelType(pageOptions->getLabelType());
    ps->setMargins(pageOptions->getMarginTop(), pageOptions->getMarginBottom(),
                   pageOptions->getMarginLeft(), pageOptions->getMarginRight());
    if(ps->exec() == QDialog::Accepted) {
        // ok it was good so lets update everything
        pageOptions->setMarginTop(ps->getMarginTop());
        pageOptions->setMarginBottom(ps->getMarginBottom());
        pageOptions->setMarginLeft(ps->getMarginLeft());
        pageOptions->setMarginRight(ps->getMarginRight());
        pageOptions->setPageSize(ps->getPaperSize());
        pageOptions->setLabelType(ps->getLabelType());
        pageOptions->setCustomWidth(ps->getPaperWidth());
        pageOptions->setCustomHeight(ps->getPaperHeight());
        pageOptions->setPortrait(ps->isPortrait());
      
    }
    delete ps;
}

void ReportWindow::querySourceList() {
    QueryList * ql = new QueryList(this);
    ql->init(qsList);
    ql->exec();
    delete ql;
}

void ReportWindow::colorList() {

    //
    // ADD CODE HERE TO CHECK FOR CHANGES TO DOCUMENT
    //
    QMap<QString, QColor> cm = _colorMap;
    ColorList cl(this);
    cl.init(&_colorMap);
    cl.exec();
    if(cm.count() == _colorMap.count()) {
        // the two lists have the same number of items so
        // we will have to check each item for equality
        // to see if a change was made
        QMapIterator<QString, QColor> cit;
        for(cit = cm.begin(); cit != cm.end(); ++cit) {
            if(!_colorMap.contains(cit.key()) || _colorMap[cit.key()] != cm[cit.key()]) {
                setModified(TRUE);
                break;
            }
        }
    } else {
        // they don't have the same number of items
        // so we can just assume the list was changed
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getReportHead() { return rptHead; }
void ReportWindow::removeReportHead() {
    if(rptHead != NULL) {
        delete rptHead;
        rptHead = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertReportHead() {
    if(rptHead == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;
        if(pageHeadEven) idx++;
        if(pageHeadLast) idx++;
        if(pageHeadAny)  idx++;

        ReportSection * rs = new ReportSection(this,vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Report Header"));
        rs->show();
        rptHead = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getReportFoot() { return rptFoot; }
void ReportWindow::removeReportFoot() {
    if(rptFoot != NULL) {
        delete rptFoot;
        rptFoot = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertReportFoot() {
    if(rptFoot == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;
        if(pageHeadEven) idx++;
        if(pageHeadLast) idx++;
        if(pageHeadAny) idx++;
        if(rptHead) idx++;
        idx += detailSectionCount();

        ReportSection * rs = new ReportSection(this,vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Report Footer"));
        rs->show();
        rptFoot = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageHeadFirst() { return pageHeadFirst; }
void ReportWindow::removePageHeadFirst() {
    if(pageHeadFirst != NULL) {
        delete pageHeadFirst;
        pageHeadFirst = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageHeadFirst() {
    if(pageHeadFirst == NULL) {
        int idx = 0;
        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Header (First)"));
        rs->show();
        pageHeadFirst = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageHeadOdd() { return pageHeadOdd; }
void ReportWindow::removePageHeadOdd() {
    if(pageHeadOdd != NULL) {
        delete pageHeadOdd;
        pageHeadOdd = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageHeadOdd() {
    if(pageHeadOdd == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;

        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Header (Odd)"));
        rs->show();
        pageHeadOdd = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageHeadEven() { return pageHeadEven; }
void ReportWindow::removePageHeadEven() {
    if(pageHeadEven != NULL) {
        delete pageHeadEven;
        pageHeadEven = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageHeadEven() {
    if(pageHeadEven == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;

        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Header (Even)"));
        rs->show();
        pageHeadEven = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageHeadLast() { return pageHeadLast; }
void ReportWindow::removePageHeadLast() {
    if(pageHeadLast != NULL) {
        delete pageHeadLast;
        pageHeadLast = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageHeadLast() {
    if(pageHeadLast == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;
        if(pageHeadEven) idx++;

        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Header (Last)"));
        rs->show();
        pageHeadLast = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageHeadAny() { return pageHeadAny; }
void ReportWindow::removePageHeadAny() {
    if(pageHeadAny != NULL) {
        delete pageHeadAny;
        pageHeadAny = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageHeadAny() {
    if(pageHeadAny == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;
        if(pageHeadEven) idx++;
        if(pageHeadLast) idx++;

        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Header (Any)"));
        rs->show();
        pageHeadAny = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageFootFirst() { return pageFootFirst; }
void ReportWindow::removePageFootFirst() {
    if(pageFootFirst != NULL) {
        delete pageFootFirst;
        pageFootFirst = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageFootFirst() {
    if(pageFootFirst == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;
        if(pageHeadEven) idx++;
        if(pageHeadLast) idx++;
        if(pageHeadAny) idx++;
        if(rptHead) idx++;
        idx += detailSectionCount();
        if(rptFoot) idx++;

        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Footer (First)"));
        rs->show();
        pageFootFirst = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageFootOdd() { return pageFootOdd; }
void ReportWindow::removePageFootOdd() {
    if(pageFootOdd != NULL) {
        delete pageFootOdd;
        pageFootOdd = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageFootOdd() {
    if(pageFootOdd == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;
        if(pageHeadEven) idx++;
        if(pageHeadLast) idx++;
        if(pageHeadAny) idx++;
        if(rptHead) idx++;
        idx += detailSectionCount();
        if(rptFoot) idx++;
        if(pageFootFirst) idx++;

        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Footer (Odd)"));
        rs->show();
        pageFootOdd = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageFootEven() { return pageFootEven; }
void ReportWindow::removePageFootEven() {
    if(pageFootEven != NULL) {
        delete pageFootEven;
        pageFootEven = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageFootEven() {
    if(pageFootEven == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;
        if(pageHeadEven) idx++;
        if(pageHeadLast) idx++;
        if(pageHeadAny) idx++;
        if(rptHead) idx++;
        idx += detailSectionCount();
        if(rptFoot) idx++;
        if(pageFootFirst) idx++;
        if(pageFootOdd) idx++;

        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Footer (Even)"));
        rs->show();
        pageFootEven = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageFootLast() { return pageFootLast; }
void ReportWindow::removePageFootLast() {
    if(pageFootLast != NULL) {
        delete pageFootLast;
        pageFootLast = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageFootLast() {
    if(pageFootLast == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;
        if(pageHeadEven) idx++;
        if(pageHeadLast) idx++;
        if(pageHeadAny) idx++;
        if(rptHead) idx++;
        idx += detailSectionCount();
        if(rptFoot) idx++;
        if(pageFootFirst) idx++;
        if(pageFootOdd) idx++;
        if(pageFootEven) idx++;

        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Footer (Last)"));
        rs->show();
        pageFootLast = rs;
        setModified(TRUE);
    }
}

ReportSection * ReportWindow::getPageFootAny() { return pageFootAny; }
void ReportWindow::removePageFootAny() {
    if(pageFootAny != NULL) {
        delete pageFootAny;
        pageFootAny = NULL;
        setModified(TRUE);
    }
}
void ReportWindow::insertPageFootAny() {
    if(pageFootAny == NULL) {
        int idx = 0;
        if(pageHeadFirst) idx++;
        if(pageHeadOdd) idx++;
        if(pageHeadEven) idx++;
        if(pageHeadLast) idx++;
        if(pageHeadAny) idx++;
        if(rptHead) idx++;
        idx += detailSectionCount();
        if(rptFoot) idx++;
        if(pageFootFirst) idx++;
        if(pageFootOdd) idx++;
        if(pageFootEven) idx++;
        if(pageFootLast) idx++;

        ReportSection * rs = new ReportSection(this, vbox);
        vboxlayout->insertWidget(idx,rs);
        rs->setTitle(tr("Page Footer (Any)"));
        rs->show();
        pageFootAny = rs;
        setModified(TRUE);
    }
}

int ReportWindow::detailSectionCount() {
    return detailList.count();
}

ReportSectionDetail * ReportWindow::getSection(int i) {
    return detailList.at(i);
}

void ReportWindow::insertSection(int idx, ReportSectionDetail * rsd) {
    detailList.insert(idx, rsd);
    rsd->reparent(vbox, QPoint());
    if(pageHeadFirst) idx++;
    if(pageHeadOdd) idx++;
    if(pageHeadEven) idx++;
    if(pageHeadLast) idx++;
    if(pageHeadAny) idx++;
    if(rptHead) idx++;
    vboxlayout->insertWidget(idx, rsd);
    rsd->show();
    setModified(TRUE);
}

int ReportWindow::findSection(const QString & name) {
    // find the item by its name
    ReportSectionDetail * rsd = NULL;
    for(unsigned int i = 0; i < detailList.count(); i++) {
        rsd = detailList.at(i);
        if(name == rsd->getTitle()) return i;
    }
    return -1;
}

void ReportWindow::removeSection(int idx, bool del) {
    ReportSectionDetail * rsd = detailList.at(idx);
    vboxlayout->remove(rsd);
    detailList.remove(idx);
    setModified(TRUE);
    if(del == TRUE) delete rsd;
}


bool ReportWindow::save() {
    bool res = FALSE;
    // do we have a valid filename?
    if(lastSaveToDb == FALSE) {
        if(!filename.isEmpty()) {
            QFile * file = new QFile(filename);
            res = save(file);
            delete file;
        } else {
            res = saveAs();
        }
    } else {
        // do a save to the database.
        res = saveToDb();
    }
    return res;
}

bool ReportWindow::saveAs() {
    // we need to get a file to write to
    // really need to work on this....
    // but for now...
    QString file = QFileDialog::getSaveFileName(filename,tr("XML (*.xml)"),
        this, "save file dialog", "Choose a file");
    if(file.isNull()) return FALSE;

    QFileInfo fi(file);
    if(fi.extension().isEmpty())\
      file += ".xml";

    filename = file;

    QFile * f = new QFile(file);
    bool res = save(f);
    delete f;
    return res;
}

bool ReportWindow::save(QIODevice * iod) {
    // ok lets do it
    if(iod->open(IO_WriteOnly)) {
        // now write it to the file
        QTextStream ts(iod);
        ts.setEncoding(QTextStream::UnicodeUTF8);
        ts << document().toString();
        iod->close();
        lastSaveToDb = FALSE;
        setModified(FALSE);
        return TRUE;
    } else {
        //qDebug("Failed to open IODevice for writing.");
        QMessageBox::warning(this,tr("Report Writer"),
            tr("Unable to open/create file for writing!\n"
               "Save Failed! Check to make sure that you have\n"
               "permissions to the file you are trying to save to."),
            "Ok", 0, 0, 0, 0);
        return FALSE;
    }
}

QDomDocument ReportWindow::document() {
    QDomDocument doc = QDomDocument("openRPTDef");
    QDomElement root = doc.createElement("report");
    doc.appendChild(root);

    //title
    QDomElement title = doc.createElement("title");
    title.appendChild(doc.createTextNode(reportTitle()));
    root.appendChild(title);

    QDomElement rname = doc.createElement("name");
    rname.appendChild(doc.createTextNode(reportName()));
    root.appendChild(rname);

    QDomElement rdesc = doc.createElement("description");
    rdesc.appendChild(doc.createTextNode(reportDescription()));
    root.appendChild(rdesc);

    for(QMap<QString,QString>::iterator it = _definedParams.begin();
            it != _definedParams.end(); it++) {
        QDomElement param = doc.createElement("parameter");
        param.setAttribute("name", it.key());
        param.appendChild(doc.createTextNode(it.data()));
        root.appendChild(param);
    }

    if((watermarkUseStaticText() && !watermarkText().isEmpty()) || 
        (!watermarkUseStaticText() && !watermarkQuery().isEmpty() && !watermarkColumn().isEmpty())) {
        QDomElement wm = doc.createElement("watermark");
        if(watermarkUseStaticText()) {
            QDomElement wmtext = doc.createElement("text");
            wmtext.appendChild(doc.createTextNode(watermarkText()));
            wm.appendChild(wmtext);
        } else {
            QDomElement wmdata = doc.createElement("data");
            QDomElement wmdq = doc.createElement("query");
            wmdq.appendChild(doc.createTextNode(watermarkQuery()));
            wmdata.appendChild(wmdq);
            QDomElement wmdc = doc.createElement("column");
            wmdc.appendChild(doc.createTextNode(watermarkColumn()));
            wmdata.appendChild(wmdc);
            wm.appendChild(wmdata);
        }
        if(!watermarkUseDefaultFont()) {
            ReportEntity::buildXMLFont(doc,wm,watermarkFont());
        }
        QDomElement wmopac = doc.createElement("opacity");
        wmopac.appendChild(doc.createTextNode(QString::number(watermarkOpacity())));
        wm.appendChild(wmopac);
        root.appendChild(wm);
    }

    if(bgEnabled()) {
        QDomElement bg = doc.createElement("background");
        if(bgStatic()) {
            QDomElement bgimg = doc.createElement("image");
            bgimg.appendChild(doc.createTextNode(bgImage()));
            bg.appendChild(bgimg);
        } else {
            QDomElement bgdata = doc.createElement("data");
            QDomElement bgdq = doc.createElement("query");
            bgdq.appendChild(doc.createTextNode(bgQuery()));
            bgdata.appendChild(bgdq);
            QDomElement bgdc = doc.createElement("column");
            bgdc.appendChild(doc.createTextNode(bgColumn()));
            bgdata.appendChild(bgdc);
            bg.appendChild(bgdata);
        }
        QDomElement bgmode = doc.createElement("mode");
        bgmode.appendChild(doc.createTextNode(bgResizeMode()));
        bg.appendChild(bgmode);
        QDomElement bgopac = doc.createElement("opacity");
        bgopac.appendChild(doc.createTextNode(QString::number(bgOpacity())));
        bg.appendChild(bgopac);

        QDomElement bgrect = doc.createElement("rect");
        QDomElement bgrectx = doc.createElement("x");
        bgrectx.appendChild(doc.createTextNode(QString::number(bgBoundsX())));
        bgrect.appendChild(bgrectx);
        QDomElement bgrecty = doc.createElement("y");
        bgrecty.appendChild(doc.createTextNode(QString::number(bgBoundsY())));
        bgrect.appendChild(bgrecty);
        QDomElement bgrectw = doc.createElement("width");
        bgrectw.appendChild(doc.createTextNode(QString::number(bgBoundsWidth())));
        bgrect.appendChild(bgrectw);
        QDomElement bgrecth = doc.createElement("height");
        bgrecth.appendChild(doc.createTextNode(QString::number(bgBoundsHeight())));
        bgrect.appendChild(bgrecth);
        bg.appendChild(bgrect);

        int align = bgAlign();
        // horizontal
        if((align & Qt::AlignRight) == Qt::AlignRight)
            bg.appendChild(doc.createElement("right"));
        else if((align & Qt::AlignHCenter) == Qt::AlignHCenter)
            bg.appendChild(doc.createElement("hcenter"));
        else // Qt::AlignLeft
            bg.appendChild(doc.createElement("left"));
        // vertical
        if((align & Qt::AlignBottom) == Qt::AlignBottom)
            bg.appendChild(doc.createElement("bottom"));
        else if((align & Qt::AlignVCenter) == Qt::AlignVCenter)
            bg.appendChild(doc.createElement("vcenter"));
        else // Qt::AlignTop
            bg.appendChild(doc.createElement("top"));

        root.appendChild(bg);
    }

    // pageOptions
    // -- size
    QDomElement size = doc.createElement("size");
    if(pageOptions->getPageSize() == "Custom") {
        QDomElement page_width = doc.createElement("width");
        page_width.appendChild(doc.createTextNode(QString::number((int)(pageOptions->getCustomWidth()*100))));
        size.appendChild(page_width);
        QDomElement page_height = doc.createElement("height");
        page_height.appendChild(doc.createTextNode(QString::number((int)(pageOptions->getCustomHeight()*100))));
        size.appendChild(page_height);
    } else if(pageOptions->getPageSize() == "Labels") {
        size.appendChild(doc.createTextNode("Labels"));
        QDomElement labeltype = doc.createElement("labeltype");
        labeltype.appendChild(doc.createTextNode(pageOptions->getLabelType()));
        root.appendChild(labeltype);
    } else {
        size.appendChild(doc.createTextNode(pageOptions->getPageSize()));
    }
    root.appendChild(size);
    // -- orientation
    QString str_orientation;
    if(pageOptions->isPortrait()) {
        str_orientation = "portrait";
    } else {
        str_orientation = "landscape";
    }
    root.appendChild(doc.createElement(str_orientation));
    // -- margins
    QDomElement margin;
    margin = doc.createElement("topmargin");
    margin.appendChild(doc.createTextNode(QString::number((int)(pageOptions->getMarginTop()*100))));
    root.appendChild(margin);
    margin = doc.createElement("bottommargin");
    margin.appendChild(doc.createTextNode(QString::number((int)(pageOptions->getMarginBottom()*100))));
    root.appendChild(margin);
    margin = doc.createElement("rightmargin");
    margin.appendChild(doc.createTextNode(QString::number((int)(pageOptions->getMarginRight()*100))));
    root.appendChild(margin);
    margin = doc.createElement("leftmargin");
    margin.appendChild(doc.createTextNode(QString::number((int)(pageOptions->getMarginLeft()*100))));
    root.appendChild(margin);

    // write out are Query Sources
    QDomElement qsource;
    QDomElement qname;
    QDomElement qsql;
    QuerySource * qs = NULL;
    for(unsigned int i = 0; i < qsList->size(); i++) {
        qs = qsList->get(i);
        qsource = doc.createElement("querysource");
        qname = doc.createElement("name");
        qname.appendChild(doc.createTextNode(qs->name()));
        qsource.appendChild(qname);
        qsql = doc.createElement("sql");
        qsql.appendChild(doc.createTextNode(qs->query()));
        qsource.appendChild(qsql);
        root.appendChild(qsource);
    }
    qs = NULL;

    QDomElement cdef;
    QDomElement cname;
    QDomElement ccomponent;
    QMapIterator<QString, QColor> cit;
    for(cit = _colorMap.begin(); cit != _colorMap.end(); ++cit) {
        cdef = doc.createElement("colordef");
        cname = doc.createElement("name");
        cname.appendChild(doc.createTextNode(cit.key()));
        cdef.appendChild(cname);
        ccomponent = doc.createElement("red");
        ccomponent.appendChild(doc.createTextNode(QString::number(cit.data().red())));
        cdef.appendChild(ccomponent);
        ccomponent = doc.createElement("green");
        ccomponent.appendChild(doc.createTextNode(QString::number(cit.data().green())));
        cdef.appendChild(ccomponent);
        ccomponent = doc.createElement("blue");
        ccomponent.appendChild(doc.createTextNode(QString::number(cit.data().blue())));
        cdef.appendChild(ccomponent);
        root.appendChild(cdef);
    }

    QDomElement section;

    // report head
    if(rptHead) {
        section = doc.createElement("rpthead");
        rptHead->buildXML(doc, section);
        root.appendChild(section);
    }

    // page head first
    if(pageHeadFirst) {
        section = doc.createElement("pghead");
        section.appendChild(doc.createElement("firstpage"));
        pageHeadFirst->buildXML(doc, section);
        root.appendChild(section);
    }
    // page head odd
    if(pageHeadOdd) {
        section = doc.createElement("pghead");
        section.appendChild(doc.createElement("odd"));
        pageHeadOdd->buildXML(doc, section);
        root.appendChild(section);
    }
    // page head even
    if(pageHeadEven) {
        section = doc.createElement("pghead");
        section.appendChild(doc.createElement("even"));
        pageHeadEven->buildXML(doc, section);
        root.appendChild(section);
    }
    // page head last
    if(pageHeadLast) {
        section = doc.createElement("pghead");
        section.appendChild(doc.createElement("lastpage"));
        pageHeadLast->buildXML(doc, section);
        root.appendChild(section);
    }
    // page head any
    if(pageHeadAny) {
        section = doc.createElement("pghead");
        pageHeadAny->buildXML(doc, section);
        root.appendChild(section);
    }

    // detail sections
    for(int ii = 0; ii < detailSectionCount(); ii++) {
        section = doc.createElement("section");
        getSection(ii)->buildXML(doc,section);
        root.appendChild(section);
    }

    // page foot first
    if(pageFootFirst) {
        section = doc.createElement("pgfoot");
        section.appendChild(doc.createElement("firstpage"));
        pageFootFirst->buildXML(doc, section);
        root.appendChild(section);
    }
    // page foot odd
    if(pageFootOdd) {
        section = doc.createElement("pgfoot");
        section.appendChild(doc.createElement("odd"));
        pageFootOdd->buildXML(doc, section);
        root.appendChild(section);
    }
    // page foot even
    if(pageFootEven) {
        section = doc.createElement("pgfoot");
        section.appendChild(doc.createElement("even"));
        pageFootEven->buildXML(doc, section);
        root.appendChild(section);
    }
    // page foot last
    if(pageFootLast) {
        section = doc.createElement("pgfoot");
        section.appendChild(doc.createElement("lastpage"));
        pageFootLast->buildXML(doc, section);
        root.appendChild(section);
    }
    // page foot any
    if(pageFootAny) {
        section = doc.createElement("pgfoot");
        pageFootAny->buildXML(doc, section);
        root.appendChild(section);
    }

    // report foot
    if(rptFoot) {
        section = doc.createElement("rptfoot");
        rptFoot->buildXML(doc, section);
        root.appendChild(section);
    }

    return doc;
}

bool ReportWindow::saveToDb() {
    // do what we need to do
    DBFileDialog rptDiag;
    rptDiag.setCaption(tr("Save Report to Database"));
    if(!dbRecordName.isEmpty()) {
        rptDiag._name->setText(dbRecordName);
    } else {
        rptDiag._name->setText(reportName());
    }
    rptDiag._grade->setValue(dbRecordGrade);
    if(rptDiag.exec() == QDialog::Accepted) {
        QString name = rptDiag.getName();
        QString desc = reportDescription();
        QString src  = document().toString();
        int grade = rptDiag.getGrade();

        XSqlQuery q;
        XSqlQuery qry;

        q.prepare("SELECT report_id "
                  "  FROM report "
                  " WHERE ((report_name=:report_name) "
                  "   AND (report_grade=:report_grade)); ");
        q.bindValue(":report_name", name);
        q.bindValue(":report_grade", grade);
        q.exec();
        if(q.first()) {
            // update old record
            qry.prepare("UPDATE report "
                        "   SET report_source=:report_source, "
                        "       report_descrip=:report_descrip "
                        " WHERE (report_id=:report_id);");
            qry.bindValue(":report_source", src);
            qry.bindValue(":report_descrip", desc);
            qry.bindValue(":report_id", q.value("report_id").toInt());
        } else {
            // insert new record
            qry.prepare("INSERT INTO report "
                        "       (report_name, report_source, report_descrip, report_grade) "
                        "VALUES (:report_name, :report_source, :report_descrip, :report_grade);");
            qry.bindValue(":report_name", name);
            qry.bindValue(":report_source", src);
            qry.bindValue(":report_descrip", desc);
            qry.bindValue(":report_grade", grade);
        }

        if(qry.exec()) {
            lastSaveToDb = TRUE;
            setModified(FALSE);
            dbRecordName = name;
            dbRecordGrade = grade;
            if(_handler)
            {
              q.exec();
              if(q.first())
                _handler->sReportsChanged(q.value("report_id").toInt(), true);
              else
                _handler->sReportsChanged(-1, true);
            }
            return TRUE;
        } else {
            // no good lets tell the user
	          QSqlError sqlErr = qry.lastError();   
            QMessageBox::critical(this,tr("Error saving to database"),sqlErr.databaseText());
        }
    }
    return FALSE;   
}

void ReportWindow::setReportTitle(const QString & str) {
    if(_title != str) {
        _title = str;
        setModified(TRUE);
        setCaption();   // call this since setModified may not do it
    }
}
QString ReportWindow::reportTitle() { return _title; }

void ReportWindow::setReportDescription(const QString & str) {
    if(_descr != str) {
        _descr = str;
        setModified(TRUE);
    }
}
QString ReportWindow::reportDescription() { return _descr; }

void ReportWindow::setReportName(const QString & str) {
    if(_name != str) {
        _name = str;
        setModified(TRUE);
    }
}
QString ReportWindow::reportName() { return _name; }

void ReportWindow::addColorDef(QString name, QColor col) {
    // We do not make the document as having been changed when this method
    // is called as it is ued by the routine that loads the document in the
    // first place. This function should not be called to edit the existing
    // document colorMap
    if(name.length() > 0)
        _colorMap[name] = col;
}

bool ReportWindow::isModified() { return _modified; }
void ReportWindow::setModified(bool mod) {
    if(_modified != mod) {
        _modified = mod;
        setCaption();
    }
}

int ReportWindow::watermarkOpacity() { return _wmOpacity; }
void ReportWindow::setWatermarkOpacity(int o) {
    if(_wmOpacity != o) {
        _wmOpacity = o;
        setModified(TRUE);
    }
}

QFont ReportWindow::watermarkFont() { return _wmFont; }
void ReportWindow::setWatermarkFont(QFont f) {
    if(_wmFont != f) {
        _wmFont = f;
        setModified(TRUE);
    }
}

bool ReportWindow::watermarkUseDefaultFont() { return _wmUseDefaultFont; }
void ReportWindow::setWatermarkUseDefaultFont(bool b) {
    if(_wmUseDefaultFont != b) {
        _wmUseDefaultFont = b;
        setModified(TRUE);
    }
}

bool ReportWindow::watermarkUseStaticText() { return _wmUseStaticText; }
void ReportWindow::setWatermarkUseStaticText(bool b) {
    if(_wmUseStaticText != b) {
        _wmUseStaticText = b;
        setModified(TRUE);
    }
}

QString ReportWindow::watermarkText() { return _wmText; }
void ReportWindow::setWatermarkText(QString str) {
    if(_wmText != str) {
        _wmText = str;
        setModified(TRUE);
    }
}

QString ReportWindow::watermarkColumn() { return _wmColumn; }
void ReportWindow::setWatermarkColumn(QString str) {
    if(_wmColumn != str) {
        _wmColumn = str;
        setModified(TRUE);
    }
}

QString ReportWindow::watermarkQuery() { return _wmQuery; }
void ReportWindow::setWatermarkQuery(QString str) {
    if(_wmQuery != str) {
        _wmQuery = str;
        setModified(TRUE);
    }
}

bool    ReportWindow::bgEnabled() { return _bgEnabled; }
void    ReportWindow::setBgEnabled(bool b) {
    if(_bgEnabled != b) {
        _bgEnabled = b;
        setModified(TRUE);
    }
}

bool    ReportWindow::bgStatic() { return _bgStatic; }
void    ReportWindow::setBgStatic(bool b) {
    if(_bgStatic != b) {
        _bgStatic = b;
        setModified(TRUE);
    }
}

QString ReportWindow::bgImage() { return _bgImage; }
void    ReportWindow::setBgImage(QString str) {
    if(_bgImage != str) {
        _bgImage = str;
        setModified(TRUE);
    }
}

QString ReportWindow::bgQuery() { return _bgQuery; }
void    ReportWindow::setBgQuery(QString str) {
    if(_bgQuery != str) {
        _bgQuery = str;
        setModified(TRUE);
    }
}

QString ReportWindow::bgColumn() { return _bgColumn; }
void    ReportWindow::setBgColumn(QString str) {
    if(_bgColumn != str) {
        _bgColumn = str;
        setModified(TRUE);
    }
}

QString ReportWindow::bgResizeMode() { return _bgResizeMode; }
void    ReportWindow::setBgResizeMode(QString str) {
    if(_bgResizeMode != str) {
        _bgResizeMode = str;
        setModified(TRUE);
    }
}

int     ReportWindow::bgAlign() { return _bgAlign; }
void    ReportWindow::setBgAlign(int i) {
    if(_bgAlign != i) {
        _bgAlign = i;
        setModified(TRUE);
    }
}

int     ReportWindow::bgBoundsX() { return _bgBoundsX; }
void    ReportWindow::setBgBoundsX(int i) {
    if(_bgBoundsX != i) {
        _bgBoundsX = i;
        setModified(TRUE);
    }
}

int     ReportWindow::bgBoundsY() { return _bgBoundsY; }
void    ReportWindow::setBgBoundsY(int i) {
    if(_bgBoundsY != i) {
        _bgBoundsY = i;
        setModified(TRUE);
    }
}

int     ReportWindow::bgBoundsWidth() { return _bgBoundsWidth; }
void    ReportWindow::setBgBoundsWidth(int i) {
    if(_bgBoundsWidth != i) {
        _bgBoundsWidth = i;
        setModified(TRUE);
    }
}

int     ReportWindow::bgBoundsHeight() { return _bgBoundsHeight; }
void    ReportWindow::setBgBoundsHeight(int i) {
    if(_bgBoundsHeight != i) {
        _bgBoundsHeight = i;
        setModified(TRUE);
    }
}

int     ReportWindow::bgOpacity() { return _bgOpacity; }
void    ReportWindow::setBgOpacity(int i) {
    if(_bgOpacity != i) {
        _bgOpacity = i;
        setModified(TRUE);
    }
}

void ReportWindow::addDefinedParameter(const QString & n, const QString & d) {
    _definedParams.insert(n, d);
}

void ReportWindow::editDefinedParameters() {
    ReportParameterList rlist(this);
    rlist.setList(&_definedParams);
    rlist.exec();
}

