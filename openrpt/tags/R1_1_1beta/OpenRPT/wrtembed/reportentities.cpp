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

#include "reportentities.h"
#include "reportwindow.h"

// dialogs
#include <labeleditor.h>
#include <fieldeditor.h>
#include <texteditor.h>
#include <barcodeeditor.h>
#include <imageeditor.h>
#include <grapheditor.h>

// common
#include <querysource.h>
#include <quuencode.h>
#include <parsexmlutils.h>
#include <builtinformatfunctions.h>

// qt
#include <qpainter.h>
#include <qstring.h>
#include <qlabel.h>
#include <qlineedit.h>
#include <qcombobox.h>
#include <qdom.h>
#include <qinputdialog.h>
#include <qslider.h>
#include <qdatastream.h>
#include <qcheckbox.h>
#include <qradiobutton.h>
#include <qsettings.h>

extern int dpiX;
extern int dpiY;

//
// ReportEntity
//
ReportEntity::ReportEntity() {}

void ReportEntity::buildXML(QCanvasItem * item, QDomDocument & doc, QDomElement & parent) {
     ReportEntity * re = NULL;
     switch(item->rtti()) {
         case EntityLabel:
             re = (ReportEntityLabel*)item;
             break;
         case EntityField:
             re = (ReportEntityField*)item;
             break;
         case EntityText:
             re = (ReportEntityText*)item;
             break;
         case EntityLine: 
             re = (ReportEntityLine*)item;
             break;
         case EntityBarcode:
             re = (ReportEntityBarcode*)item;
             break;
         case EntityImage:
             re = (ReportEntityImage*)item;
             break;
         case EntityGraph:
             re = (ReportEntityGraph*)item;
             break;
         default:
             qDebug("ReportEntity::buildXML(): unrecognized rtti type");
     };

     if(re != NULL) {
         re->buildXML(doc,parent);
     }
}

void ReportEntity::buildXMLRect(QDomDocument & doc, QDomElement & entity, QRect rect) {
    QDomElement element = doc.createElement("rect");

    float v = 0.0;

    QDomElement x = doc.createElement("x");
    v = ((float)rect.x() / dpiX) * 100.0;
    x.appendChild(doc.createTextNode(QString::number((int)v)));
    element.appendChild(x);
    QDomElement y = doc.createElement("y");
    v = ((float)rect.y() / dpiY) * 100.0;
    y.appendChild(doc.createTextNode(QString::number((int)v)));
    element.appendChild(y);
    QDomElement w = doc.createElement("width");
    v = ((float)rect.width() / dpiX) * 100.0;
    w.appendChild(doc.createTextNode(QString::number((int)v)));
    element.appendChild(w);
    QDomElement h = doc.createElement("height");
    v = ((float)rect.height() / dpiY) * 100.0;
    h.appendChild(doc.createTextNode(QString::number((int)v)));
    element.appendChild(h);

    entity.appendChild(element);
}

void ReportEntity::buildXMLFont(QDomDocument & doc, QDomElement & entity, QFont font) {
    QDomElement element = doc.createElement("font");

    QDomElement face = doc.createElement("face");
    face.appendChild(doc.createTextNode(font.family()));
    element.appendChild(face);

    QDomElement size = doc.createElement("size");
    size.appendChild(doc.createTextNode(QString::number(font.pointSize())));
    element.appendChild(size);

    QDomElement weight = doc.createElement("weight");
    int w = font.weight();
    if(w == QFont::Normal)
        weight.appendChild(doc.createTextNode("normal"));
    else if(w == QFont::Bold)
        weight.appendChild(doc.createTextNode("bold"));
    else
        weight.appendChild(doc.createTextNode(QString::number(w)));
    element.appendChild(weight);

    entity.appendChild(element);
}

bool ReportEntity::_readDefaultFont = false;
QFont ReportEntity::_defaultFont = QFont();

QFont ReportEntity::getDefaultEntityFont() {
    if(!_readDefaultFont) {
        QSettings settings;
        settings.setPath("OpenMFG.com", "OpenReports", QSettings::User);
        _defaultFont.fromString(settings.readEntry("/OpenMFG/rwDefaultEntityFont",_defaultFont.toString()));
        _readDefaultFont = TRUE;
    }
    return _defaultFont;
}

void ReportEntity::setDefaultEntityFont(const QFont & f) {
    _defaultFont = f;
    QSettings settings;
    settings.setPath("OpenMFG.com", "OpenReports", QSettings::User);
    settings.writeEntry("/OpenMFG/rwDefaultEntityFont", _defaultFont.toString());
    _readDefaultFont = true;
}


//
// class ReportEntityLabel
//
// methods (constructors)
ReportEntityLabel::ReportEntityLabel(ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), txt(QObject::tr("Label")), flags(0) {
    fnt = getDefaultEntityFont();
    QRect r = getTextRect();
    setSize(r.width()-1, r.height()-1);
}

ReportEntityLabel::ReportEntityLabel(const QString & t, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), txt(t), flags(0) {
    fnt = getDefaultEntityFont();
    QRect r = getTextRect();
    setSize(r.width()-1, r.height()-1);
}

ReportEntityLabel::ReportEntityLabel(const QString & t, QFont f, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), txt(t), flags(0), fnt(f) {
    QRect r = getTextRect();
    setSize(r.width()-1, r.height()-1);
}
ReportEntityLabel::ReportEntityLabel(QDomNode & element, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), flags(0) {
    fnt = getDefaultEntityFont();
    QDomNodeList nl = element.childNodes();
    QString n;
    QDomNode node;
    for(unsigned int i = 0; i < nl.count(); i++) {
        node = nl.item(i);
        n = node.nodeName();
        if(n == "string") {
            txt = node.firstChild().nodeValue();
        } else if(n == "left") {
            flags |= Qt::AlignLeft;
        } else if(n == "hcenter") {
            flags |= Qt::AlignHCenter;
        } else if(n == "right") {
            flags |= Qt::AlignRight;
        } else if(n == "top") {
            flags |= Qt::AlignTop;
        } else if(n == "vcenter") {
            flags |= Qt::AlignVCenter;
        } else if(n == "bottom") {
            flags |= Qt::AlignBottom;
        } else if(n == "rect") {
            QDomNodeList rnl = node.childNodes();
            float d = 0.0;
            for(unsigned int ri = 0; ri < rnl.count(); ri++) {
                node = rnl.item(ri);
                n = node.nodeName();
                if(n == "x") {
                    d = ((node.firstChild().nodeValue().toFloat()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setX(d);
                } else if(n == "y") {
                    d = ((node.firstChild().nodeValue().toFloat()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setY(d);
                } else if(n == "width") {
                    d = ((node.firstChild().nodeValue().toFloat()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize((int)d,height());
                } else if(n == "height") {
                    d = ((node.firstChild().nodeValue().toFloat()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize(width(),(int)d);
                } else {
                    qDebug("While parsing rect encountered unknown element: %s", n.latin1());
                }
            }
        } else if(n == "font") {
            QDomNodeList fnl = node.childNodes();
            for(unsigned int fi = 0; fi < fnl.count(); fi++) {
                node = fnl.item(fi);
                n = node.nodeName();
                if(n == "face") {
                    fnt.setFamily(node.firstChild().nodeValue());
                } else if(n == "size") {
                    fnt.setPointSize(node.firstChild().nodeValue().toInt());
                } else if(n == "weight") {
                    QString v = node.firstChild().nodeValue();
                    if(v == "bold") fnt.setBold(TRUE);
                    else if(v == "normal") fnt.setBold(FALSE);
                    else fnt.setWeight(node.firstChild().nodeValue().toInt());
                } else {
                    qDebug("while parsing font encountered unknown element: %s", n.latin1());
                }
            }
        } else {
            qDebug("while parsing label element encountered unknow element: %s",n.latin1());
        }
    }
}

// methods (deconstructor)
ReportEntityLabel::~ReportEntityLabel() {
}

QRect ReportEntityLabel::getTextRect() {
    return QFontMetrics(fnt).boundingRect(int(x()), int(y()), 0, 0, flags, txt);
}

void ReportEntityLabel::setTextFlags(int f) {
    if(flags != f) {
        flags = f;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}

QString ReportEntityLabel::text() const {
    return txt;
}

void ReportEntityLabel::setText(const QString& t) {
    if(txt != t) {
        txt = t;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}


QFont ReportEntityLabel::font() const {
    return fnt;
}

void ReportEntityLabel::setFont(const QFont& f) {
    if(f != fnt) {
        fnt = f;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}


QColor ReportEntityLabel::color() const {
    return col;
}

void ReportEntityLabel::setColor(const QColor & c) {
    if(c != col) {
        col = c;
        if(_rw) _rw->setModified(TRUE);
    }
}


void ReportEntityLabel::drawShape(QPainter & painter) {
    //QCanvasRectangle::drawShape(painter);

    // store any values we plan on changing so we can restore them
    QFont f = painter.font();
    QPen  p = painter.pen();

    painter.setFont(fnt);
    painter.setPen(col);
    painter.drawText(rect(), flags, txt);

    if(isSelected()) {
        // draw a selected border for visual purposes
        painter.setPen(QPen(QColor(128,128,255), 0, QPen::DotLine));
        painter.drawRect(rect());

        const QRect r = rect();
        int halfW = (int)(r.width() / 2);
        int halfH = (int)(r.height() / 2);
        QPoint center = r.center();
        painter.fillRect(center.x()-(halfW+2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-2,
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()-2,
                         5, 5, QColor(128, 128, 255));

    }

    // restore an values before we started just in case
    painter.setFont(f);
    painter.setPen(p);
}

void ReportEntityLabel::propertyDialog(QMap<QString,QColor>*, QuerySourceList*, QWidget * parent) {
    //qDebug("propertyDialog Called for ReportEntityLabel");
    LabelEditor * le = new LabelEditor(parent);
    le->init();
    le->labelPreview->setFont(font());
    le->tbText->setText(text());
    le->setLabelFlags(textFlags());
    double dx = (double)(rect().x())/(double)(dpiX);
    le->leXPos->setText(QString::number(dx,'g',3));
    double dy = (double)(rect().y())/(double)(dpiY);
    le->leYPos->setText(QString::number(dy,'g',3));
    double dw = (double)(rect().width())/(double)(dpiX);
    le->leWidth->setText(QString::number(dw,'g',3));
    double dh = (double)(rect().height())/(double)(dpiY);
    le->leHeight->setText(QString::number(dh,'g',3));
    if(le->exec() == QDialog::Accepted) {
        setFont(le->labelPreview->font());
        setText(le->labelPreview->text());
        setTextFlags(le->labelPreview->alignment());
        canvas()->setChanged(rect());
        double dt;
        bool ok;
        dt = le->leXPos->text().toDouble(&ok);
        if(ok) dx = dt;
        dt = le->leYPos->text().toDouble(&ok);
        if(ok) dy = dt;
        dt = le->leWidth->text().toDouble(&ok);
        if(ok) dw = dt;
        dt = le->leHeight->text().toDouble(&ok);
        if(ok) dh = dt;

        dx = dx * dpiX;
        int ix = ((dx - (int)dx) < 0.5 ? (int)dx : (int)dx + 1);
        if(rect().x() != ix) {
            setX(ix);
            if(_rw) _rw->setModified(TRUE);
        }
        dy = dy * dpiY;
        int iy = ((dy - (int)dy) < 0.5 ? (int)dy : (int)dy + 1);
        if(rect().y() != iy) {
            setY(iy);
            if(_rw) _rw->setModified(TRUE);
        }
        dw = dw * dpiX;
        dh = dh * dpiY;
        int iw = ((dw - (int)dw) < 0.5 ? (int)dw : (int)dw + 1);
        int ih = ((dh - (int)dh) < 0.5 ? (int)dh : (int)dh + 1);
        if(rect().width() != iw || rect().height() != ih) {
            setSize(iw, ih);
            if(_rw) _rw->setModified(TRUE);
        }

        canvas()->setChanged(rect());
        canvas()->update();
    }
}

void ReportEntityLabel::buildXML(QDomDocument & doc, QDomElement & parent) {
    //qDebug("ReportEntityLabel::buildXML()");
    QDomElement entity = doc.createElement("label");

    // bounding rect
    buildXMLRect(doc,entity,rect());
    // font info
    buildXMLFont(doc,entity,font());

    // text alignment
    int align = textFlags();
    // horizontal
    if((align & Qt::AlignRight) == Qt::AlignRight)
        entity.appendChild(doc.createElement("right"));
    else if((align & Qt::AlignHCenter) == Qt::AlignHCenter)
        entity.appendChild(doc.createElement("hcenter"));
    else // Qt::AlignLeft
        entity.appendChild(doc.createElement("left"));
    // vertical
    if((align & Qt::AlignBottom) == Qt::AlignBottom)
        entity.appendChild(doc.createElement("bottom"));
    else if((align & Qt::AlignVCenter) == Qt::AlignVCenter)
        entity.appendChild(doc.createElement("vcenter"));
    else // Qt::AlignTop
        entity.appendChild(doc.createElement("top"));

    // the text string
    QDomElement string = doc.createElement("string");
    string.appendChild(doc.createTextNode(text()));
    entity.appendChild(string);


    parent.appendChild(entity);
}

//QRect ReportEntityLabel::boundingRect() const { return rect(); }

// RTTI
int ReportEntityLabel::rtti() const { return RTTI; }
int ReportEntityLabel::RTTI = ReportEntity::EntityLabel;


//
// class ReportEntityField
//
// methods (constructors)
ReportEntityField::ReportEntityField(ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), qry(QString::null), flags(0) {
    fnt = getDefaultEntityFont();
    _trackTotal = FALSE;
    _trackBuiltinFormat = FALSE;
    _useSubTotal = FALSE;
    _trackTotalFormat = QString::null;
    QRect r = getTextRect();
    setSize(r.width()-1, r.height()-1);
}

ReportEntityField::ReportEntityField(const QString & s, const QString & c, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), qry(s), clmn(c), flags(0) {
    fnt = getDefaultEntityFont();
    _trackTotal = FALSE;
    _trackBuiltinFormat = FALSE;
    _useSubTotal = FALSE;
    _trackTotalFormat = QString::null;
    QRect r = getTextRect();
    setSize(r.width()-1, r.height()-1);
}

ReportEntityField::ReportEntityField(const QString & s, const QString & c, QFont f, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), qry(s), clmn(c), flags(0), fnt(f) {
    _trackTotal = FALSE;
    _trackBuiltinFormat = FALSE;
    _useSubTotal = FALSE;
    _trackTotalFormat = QString::null;
    QRect r = getTextRect();
    setSize(r.width()-1, r.height()-1);
}
ReportEntityField::ReportEntityField(QDomNode & element, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), flags(0) {
    fnt = getDefaultEntityFont();
    _trackTotal = FALSE;
    _trackBuiltinFormat = FALSE;
    _useSubTotal = FALSE;
    _trackTotalFormat = QString::null;
    QDomNodeList nl = element.childNodes();
    QString n;
    QDomNode node;
    for(unsigned int i = 0; i < nl.count(); i++) {
        node = nl.item(i);
        n = node.nodeName();
        if(n == "data") {
            QDomNodeList dnl = node.childNodes();
            for(unsigned int di = 0; di < dnl.count(); di++) {
                node = dnl.item(di);
                n = node.nodeName();
                if(n == "query") {
                    qry = node.firstChild().nodeValue();
                } else if(n == "column") {
                    clmn = node.firstChild().nodeValue();
                } else {
                    qDebug("while parsing field data encountered and unknown element: %s", n.latin1());
                }
            } 
            //txt = node.firstChild().nodeValue();
        } else if(n == "left") {
            flags |= Qt::AlignLeft;
        } else if(n == "hcenter") {
            flags |= Qt::AlignHCenter;
        } else if(n == "right") {
            flags |= Qt::AlignRight;
        } else if(n == "top") {
            flags |= Qt::AlignTop;
        } else if(n == "vcenter") {
            flags |= Qt::AlignVCenter;
        } else if(n == "bottom") {
            flags |= Qt::AlignBottom;
        } else if(n == "rect") {
            QDomNodeList rnl = node.childNodes();
            double d = 0.0;
            for(unsigned int ri = 0; ri < rnl.count(); ri++) {
                node = rnl.item(ri);
                n = node.nodeName();
                if(n == "x") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setX(d);
                } else if(n == "y") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setY(d);
                } else if(n == "width") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize((int)d,height());
                } else if(n == "height") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize(width(),(int)d);
                } else {
                    qDebug("While parsing rect encountered unknown element: %s", n.latin1());
                }
            }
        } else if(n == "font") {
            QDomNodeList fnl = node.childNodes();
            for(unsigned int fi = 0; fi < fnl.count(); fi++) {
                node = fnl.item(fi);
                n = node.nodeName();
                if(n == "face") {
                    fnt.setFamily(node.firstChild().nodeValue());
                } else if(n == "size") {
                    fnt.setPointSize(node.firstChild().nodeValue().toInt());
                } else if(n == "weight") {
                    QString v = node.firstChild().nodeValue();
                    if(v == "bold") fnt.setBold(TRUE);
                    else if(v == "normal") fnt.setBold(FALSE);
                    else fnt.setWeight(node.firstChild().nodeValue().toInt());
                } else {
                    qDebug("while parsing font encountered unknown element: %s", n.latin1());
                }
            }
        } else if(n == "tracktotal") {
            _trackBuiltinFormat = (node.toElement().attribute("builtin")=="true"?TRUE:FALSE);
            _useSubTotal = (node.toElement().attribute("subtotal")=="true"?TRUE:FALSE);
            _trackTotalFormat = node.firstChild().nodeValue();
            if(_trackTotalFormat.length() > 0) _trackTotal = TRUE;
        } else {
            qDebug("while parsing field element encountered unknow element: %s",n.latin1());
        }
    }
}

// methods (deconstructor)
ReportEntityField::~ReportEntityField() {
}

QRect ReportEntityField::getTextRect() {
    return QFontMetrics(fnt).boundingRect(int(x()), int(y()), 0, 0, flags, clmn+QObject::tr(":")+qry+QObject::tr((_trackTotal?" field total":" field")));
}

void ReportEntityField::setTextFlags(int f) {
    if(flags != f) {
        flags = f;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}

QString ReportEntityField::query() const {
    return qry;
}

void ReportEntityField::setQuery(const QString& t) {
    if(qry != t) {
        qry = t;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}

QString ReportEntityField::column() const {
    return clmn;
}

void ReportEntityField::setColumn(const QString& t) {
    if(clmn != t) {
        clmn = t;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}

bool    ReportEntityField::trackTotal()       { return _trackTotal; }
bool    ReportEntityField::trackBuiltinFormat() { return _trackBuiltinFormat; }
bool    ReportEntityField::useSubTotal() { return _useSubTotal; }
QString ReportEntityField::trackTotalFormat() { return _trackTotalFormat; }

void ReportEntityField::setTrackTotal(bool yes) {
    if(_trackTotal != yes) {
        _trackTotal = yes;
        if(_rw) _rw->setModified(TRUE);
    }
}
void ReportEntityField::setTrackTotalFormat(const QString & str, bool builtin) {
    if(_trackBuiltinFormat != builtin || _trackTotalFormat != str) {
        _trackBuiltinFormat = builtin;
        _trackTotalFormat = str;
        if(_rw) _rw->setModified(TRUE);
    }
}
void ReportEntityField::setUseSubTotal(bool yes) {
    if(_useSubTotal != yes) {
        _useSubTotal = yes;
        if(_rw) _rw->setModified(TRUE);
    }
}


QFont ReportEntityField::font() const {
    return fnt;
}

void ReportEntityField::setFont(const QFont& f) {
    if(f != fnt) {
        fnt = f;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}


QColor ReportEntityField::color() const {
    return col;
}

void ReportEntityField::setColor(const QColor & c) {
    if(c != col) {
        col = c;
        if(_rw) _rw->setModified(TRUE);
    }
}


void ReportEntityField::drawShape(QPainter & painter) {
    //QCanvasRectangle::drawShape(painter);

    // store any values we plan on changing so we can restore them
    QFont f = painter.font();
    QPen  p = painter.pen();

    painter.setFont(fnt);
    painter.setPen(col);
    painter.drawText(rect(), flags, clmn+QObject::tr(":")+qry+QObject::tr((_trackTotal?" field total":" field")));

    if(isSelected()) {
        // draw a selected border for visual purposes
        painter.setPen(QPen(QColor(128,128,255), 0, QPen::DotLine));
        painter.drawRect(rect());


        const QRect r = rect();
        int halfW = (int)(r.width() / 2);
        int halfH = (int)(r.height() / 2);
        QPoint center = r.center();
        painter.fillRect(center.x()-(halfW+2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-2,
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()-2,
                         5, 5, QColor(128, 128, 255));

    }

    // restore an values before we started just in case
    painter.setFont(f);
    painter.setPen(p);
}

void ReportEntityField::propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent) {
    //qDebug("propertyDialog Called for ReportEntityField");
    FieldEditor * le = new FieldEditor(parent);
    le->labelPreview->setFont(font());

    // populate the cbQuery item here and set it to an appropriate value
    int selected_index = -1;
    le->cbQuery->insertItem("Context Query");
    if(query() == "Context Query") selected_index = 0;
    le->cbQuery->insertItem("Parameter Query");
    if(query() == "Parameter Query") selected_index = 1;
    if(qsl != NULL) {
        for(unsigned int i = 0; i < qsl->size(); i++) {
            le->cbQuery->insertItem(qsl->get(i)->name());
            if(query() == qsl->get(i)->name()) {
                selected_index = i + 2;
            }
        }
    } else {
        qDebug("QuerySourceList is null");
    }
    if(selected_index == -1) {
        le->cbQuery->insertItem(QObject::tr("-- Select Query --"),0);
        selected_index = 0;
    }
    le->cbQuery->setCurrentItem(selected_index);

    le->tbColumn->setText(column());
    le->_cbRTotal->setChecked(_trackTotal);
    if(_trackBuiltinFormat) {
        le->_rbBuiltinFormat->setChecked(true);
        le->_cbBuiltinFormat->insertItem(getNameFromTag(_trackTotalFormat), 0);
    } else {
        le->_rbStringFormat->setChecked(true);
        le->_leRTotalFormat->setText(_trackTotalFormat);
    }
    le->_cbSubTotal->setChecked(_useSubTotal);
    le->setLabelFlags(textFlags());
    double dx = (double)(rect().x())/(double)(dpiX);
    le->leXPos->setText(QString::number(dx,'g',3));
    double dy = (double)(rect().y())/(double)(dpiY);
    le->leYPos->setText(QString::number(dy,'g',3));
    double dw = (double)(rect().width())/(double)(dpiX);
    le->leWidth->setText(QString::number(dw,'g',3));
    double dh = (double)(rect().height())/(double)(dpiY);
    le->leHeight->setText(QString::number(dh,'g',3));
    if(le->exec() == QDialog::Accepted) {
        setFont(le->labelPreview->font());
        QString qrystr = le->cbQuery->currentText();
        if(qrystr == QObject::tr("-- Select Query --")) qrystr = QString::null;
        setQuery(qrystr);
        setColumn(le->tbColumn->text());
        setTrackTotal(le->_cbRTotal->isChecked());
        if(trackTotal()) {
            if(le->_rbStringFormat->isChecked()) {
                setTrackTotalFormat(le->_leRTotalFormat->text(), FALSE);
            } else {
                setTrackTotalFormat(getTagFromName(le->_cbBuiltinFormat->currentText()), TRUE);
            }
            setUseSubTotal(le->_cbSubTotal->isChecked());
        }
        setTextFlags(le->labelPreview->alignment());
        canvas()->setChanged(rect());
        double dt;
        bool ok;
        dt = le->leXPos->text().toDouble(&ok);
        if(ok) dx = dt;
        dt = le->leYPos->text().toDouble(&ok);
        if(ok) dy = dt;
        dt = le->leWidth->text().toDouble(&ok);
        if(ok) dw = dt;
        dt = le->leHeight->text().toDouble(&ok);
        if(ok) dh = dt;

        dx = dx * dpiX;
        int ix = ((dx - (int)dx) < 0.5 ? (int)dx : (int)dx + 1);
        if(rect().x() != ix) {
            setX(ix);
            if(_rw) _rw->setModified(TRUE);
        }
        dy = dy * dpiY;
        int iy = ((dy - (int)dy) < 0.5 ? (int)dy : (int)dy + 1);
        if(rect().y() != iy) {
            setY(iy);
            if(_rw) _rw->setModified(TRUE);
        }
        dw = dw * dpiX;
        dh = dh * dpiY;
        int iw = ((dw - (int)dw) < 0.5 ? (int)dw : (int)dw + 1);
        int ih = ((dh - (int)dh) < 0.5 ? (int)dh : (int)dh + 1);
        if(rect().width() != iw || rect().height() != ih) {
            setSize(iw, ih);
            if(_rw) _rw->setModified(TRUE);
        }

        canvas()->setChanged(rect());
        canvas()->update();
    }
}

void ReportEntityField::buildXML(QDomDocument & doc, QDomElement & parent) {
    //qDebug("ReportEntityField::buildXML()");
    QDomElement entity = doc.createElement("field");

    // bounding rect
    buildXMLRect(doc,entity,rect());
    // font info
    buildXMLFont(doc,entity,font());

    // text alignment
    int align = textFlags();
    // horizontal
    if((align & Qt::AlignRight) == Qt::AlignRight)
        entity.appendChild(doc.createElement("right"));
    else if((align & Qt::AlignHCenter) == Qt::AlignHCenter)
        entity.appendChild(doc.createElement("hcenter"));
    else // Qt::AlignLeft
        entity.appendChild(doc.createElement("left"));
    // vertical
    if((align & Qt::AlignBottom) == Qt::AlignBottom)
        entity.appendChild(doc.createElement("bottom"));
    else if((align & Qt::AlignVCenter) == Qt::AlignVCenter)
        entity.appendChild(doc.createElement("vcenter"));
    else // Qt::AlignTop
        entity.appendChild(doc.createElement("top"));

    // the field data
    QDomElement data = doc.createElement("data");
    QDomElement dquery = doc.createElement("query");
    dquery.appendChild(doc.createTextNode(query()));
    data.appendChild(dquery);
    QDomElement dcolumn = doc.createElement("column");
    dcolumn.appendChild(doc.createTextNode(column()));
    data.appendChild(dcolumn);
    entity.appendChild(data);

    if(_trackTotal) {
        QDomElement tracktotal = doc.createElement("tracktotal");
        if(_trackBuiltinFormat)
            tracktotal.setAttribute("builtin","true");
        if(_useSubTotal)
            tracktotal.setAttribute("subtotal","true");
        tracktotal.appendChild(doc.createTextNode(_trackTotalFormat));
        entity.appendChild(tracktotal);
    }

    parent.appendChild(entity);
}

// RTTI
int ReportEntityField::rtti() const { return RTTI; }
int ReportEntityField::RTTI = ReportEntity::EntityField;


//
// class ReportEntityText
//
// methods (constructors)
ReportEntityText::ReportEntityText(ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), flags(0), bpad(0.0) {
    fnt = getDefaultEntityFont();
    QRect r = getTextRect();
    setSize(r.width()-1, r.height()-1);
}

ReportEntityText::ReportEntityText(const QString & s, const QString & c, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), qry(s), clmn(c), flags(0), bpad(0.0) {
    fnt = getDefaultEntityFont();
    QRect r = getTextRect();
    setSize(r.width()-1, r.height()-1);
}

ReportEntityText::ReportEntityText(const QString & s, const QString & c, QFont f, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), qry(s), clmn(c), flags(0), fnt(f), bpad(0.0) {
    QRect r = getTextRect();
    setSize(r.width()-1, r.height()-1);
}
ReportEntityText::ReportEntityText(QDomNode & element, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), flags(0), bpad(0.0) {
    fnt = getDefaultEntityFont();
    QDomNodeList nl = element.childNodes();
    QString n;
    QDomNode node;
    for(unsigned int i = 0; i < nl.count(); i++) {
        node = nl.item(i);
        n = node.nodeName();
        if(n == "data") {
            QDomNodeList dnl = node.childNodes();
            for(unsigned int di = 0; di < dnl.count(); di++) {
                node = dnl.item(di);
                n = node.nodeName();
                if(n == "query") {
                    qry = node.firstChild().nodeValue();
                } else if(n == "column") {
                    clmn = node.firstChild().nodeValue();
                } else {
                    qDebug("while parsing field data encountered and unknown element: %s", n.latin1());
                }
            } 
        } else if(n == "bottompad") {
            bpad = node.firstChild().nodeValue().toDouble() / 100.0;
        } else if(n == "left") {
            flags |= Qt::AlignLeft;
        } else if(n == "hcenter") {
            flags |= Qt::AlignHCenter;
        } else if(n == "right") {
            flags |= Qt::AlignRight;
        } else if(n == "top") {
            flags |= Qt::AlignTop;
        } else if(n == "vcenter") {
            flags |= Qt::AlignVCenter;
        } else if(n == "bottom") {
            flags |= Qt::AlignBottom;
        } else if(n == "rect") {
            QDomNodeList rnl = node.childNodes();
            double d = 0.0;
            for(unsigned int ri = 0; ri < rnl.count(); ri++) {
                node = rnl.item(ri);
                n = node.nodeName();
                if(n == "x") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setX(d);
                } else if(n == "y") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setY(d);
                } else if(n == "width") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize((int)d,height());
                } else if(n == "height") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize(width(),(int)d);
                } else {
                    qDebug("While parsing rect encountered unknown element: %s", n.latin1());
                }
            }
        } else if(n == "font") {
            QDomNodeList fnl = node.childNodes();
            for(unsigned int fi = 0; fi < fnl.count(); fi++) {
                node = fnl.item(fi);
                n = node.nodeName();
                if(n == "face") {
                    fnt.setFamily(node.firstChild().nodeValue());
                } else if(n == "size") {
                    fnt.setPointSize(node.firstChild().nodeValue().toInt());
                } else if(n == "weight") {
                    QString v = node.firstChild().nodeValue();
                    if(v == "bold") fnt.setBold(TRUE);
                    else if(v == "normal") fnt.setBold(FALSE);
                    else fnt.setWeight(node.firstChild().nodeValue().toInt());
                } else {
                    qDebug("while parsing font encountered unknown element: %s", n.latin1());
                }
            }
        } else {
            qDebug("while parsing text element encountered unknow element: %s",n.latin1());
        }
    }
}

// methods (deconstructor)
ReportEntityText::~ReportEntityText() {
}

QRect ReportEntityText::getTextRect() {
    return QFontMetrics(fnt).boundingRect(int(x()), int(y()), 0, 0, flags, clmn+QObject::tr(":")+qry+QObject::tr(" textarea"));
}

void ReportEntityText::setTextFlags(int f) {
    if(flags != f) {
        flags = f;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}

QString ReportEntityText::query() const {
    return qry;
}

void ReportEntityText::setQuery(const QString& t) {
    if(qry != t) {
        qry = t;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}

QString ReportEntityText::column() const {
    return clmn;
}

void ReportEntityText::setColumn(const QString& t) {
    if(clmn != t) {
        clmn = t;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}

double ReportEntityText::bottomPadding() const {
    return bpad;
}
void ReportEntityText::setBottomPadding(double bp) {
    if(bpad != bp) {
        bpad = bp;
        if(_rw) _rw->setModified(TRUE);
    }
}

QFont ReportEntityText::font() const {
    return fnt;
}

void ReportEntityText::setFont(const QFont& f) {
    if(f != fnt) {
        fnt = f;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}


QColor ReportEntityText::color() const {
    return col;
}

void ReportEntityText::setColor(const QColor & c) {
    if(col != c) {
        col = c;
        if(_rw) _rw->setModified(TRUE);
    }
}


void ReportEntityText::drawShape(QPainter & painter) {
    //QCanvasRectangle::drawShape(painter);

    // store any values we plan on changing so we can restore them
    QFont f = painter.font();
    QPen  p = painter.pen();

    painter.setFont(fnt);
    painter.setPen(col);
    painter.drawText(rect(), flags, clmn+QObject::tr(":")+qry+QObject::tr(" textarea"));

    if(isSelected()) {
        // draw a selected border for visual purposes
        painter.setPen(QPen(QColor(128,128,255), 0, QPen::DotLine));
        painter.drawRect(rect());


        const QRect r = rect();
        int halfW = (int)(r.width() / 2);
        int halfH = (int)(r.height() / 2);
        QPoint center = r.center();
        painter.fillRect(center.x()-(halfW+2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-2,
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()-2,
                         5, 5, QColor(128, 128, 255));

    }

    // restore an values before we started just in case
    painter.setFont(f);
    painter.setPen(p);
}

void ReportEntityText::propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent) {
    //qDebug("propertyDialog Called for ReportEntityText");
    TextEditor * le = new TextEditor(parent);
    le->init();
    le->labelPreview->setFont(font());
    // populate the cbQuery item here and set it to an appropriate value
    int selected_index = -1;
    le->cbQuery->insertItem("Context Query");
    if(query() == "Context Query") selected_index = 0;
    le->cbQuery->insertItem("Parameter Query");
    if(query() == "Parameter Query") selected_index = 1;
    if(qsl != NULL) {
        for(unsigned int i = 0; i < qsl->size(); i++) {
            le->cbQuery->insertItem(qsl->get(i)->name());
            if(query() == qsl->get(i)->name()) {
                selected_index = i + 2;
            }
        }
    } else {
        qDebug("QuerySourceList is null");
    }
    if(selected_index == -1) {
        le->cbQuery->insertItem(QObject::tr("-- Select Query --"),0);
        selected_index = 0;
    }
    le->cbQuery->setCurrentItem(selected_index);

    le->tbColumn->setText(column());
    le->setLabelFlags(textFlags());
    le->tbBottompad->setText(QString::number(bpad,'f',3));
    double dx = (double)(rect().x())/(double)(dpiX);
    le->leXPos->setText(QString::number(dx,'g',3));
    double dy = (double)(rect().y())/(double)(dpiY);
    le->leYPos->setText(QString::number(dy,'g',3));
    double dw = (double)(rect().width())/(double)(dpiX);
    le->leWidth->setText(QString::number(dw,'g',3));
    double dh = (double)(rect().height())/(double)(dpiY);
    le->leHeight->setText(QString::number(dh,'g',3));
    if(le->exec() == QDialog::Accepted) {
        setFont(le->labelPreview->font());
        QString qrystr = le->cbQuery->currentText();
        if(qrystr == QObject::tr("-- Select Query --")) qrystr = QString::null;
        setQuery(qrystr);
        setColumn(le->tbColumn->text());
        setTextFlags(le->labelPreview->alignment());
        setBottomPadding(le->tbBottompad->text().toDouble());
        canvas()->setChanged(rect());
        double dt;
        bool ok;
        dt = le->leXPos->text().toDouble(&ok);
        if(ok) dx = dt;
        dt = le->leYPos->text().toDouble(&ok);
        if(ok) dy = dt;
        dt = le->leWidth->text().toDouble(&ok);
        if(ok) dw = dt;
        dt = le->leHeight->text().toDouble(&ok);
        if(ok) dh = dt;

        dx = dx * dpiX;
        int ix = ((dx - (int)dx) < 0.5 ? (int)dx : (int)dx + 1);
        if(rect().x() != ix) {
            setX(ix);
            if(_rw) _rw->setModified(TRUE);
        }
        dy = dy * dpiY;
        int iy = ((dy - (int)dy) < 0.5 ? (int)dy : (int)dy + 1);
        if(rect().y() != iy) {
            setY(iy);
            if(_rw) _rw->setModified(TRUE);
        }
        dw = dw * dpiX;
        dh = dh * dpiY;
        int iw = ((dw - (int)dw) < 0.5 ? (int)dw : (int)dw + 1);
        int ih = ((dh - (int)dh) < 0.5 ? (int)dh : (int)dh + 1);
        if(rect().width() != iw || rect().height() != ih) {
            setSize(iw, ih);
            if(_rw) _rw->setModified(TRUE);
        }

        canvas()->setChanged(rect());
        canvas()->update();
    }
}

void ReportEntityText::buildXML(QDomDocument & doc, QDomElement & parent) {
    //qDebug("ReportEntityText::buildXML()");
    QDomElement entity = doc.createElement("text");

    // bounding rect
    buildXMLRect(doc,entity,rect());
    // bottompad
    QDomElement bottompad = doc.createElement("bottompad");
    double h = bpad * 100.0;
    bottompad.appendChild(doc.createTextNode(QString::number((int)h)));
    entity.appendChild(bottompad);
    // font info
    buildXMLFont(doc,entity,font());

    // text alignment
    int align = textFlags();
    // horizontal
    if((align & Qt::AlignRight) == Qt::AlignRight)
        entity.appendChild(doc.createElement("right"));
    else if((align & Qt::AlignHCenter) == Qt::AlignHCenter)
        entity.appendChild(doc.createElement("hcenter"));
    else // Qt::AlignLeft
        entity.appendChild(doc.createElement("left"));
    // vertical
    if((align & Qt::AlignBottom) == Qt::AlignBottom)
        entity.appendChild(doc.createElement("bottom"));
    else if((align & Qt::AlignVCenter) == Qt::AlignVCenter)
        entity.appendChild(doc.createElement("vcenter"));
    else // Qt::AlignTop
        entity.appendChild(doc.createElement("top"));

    // the field data
    QDomElement data = doc.createElement("data");
    QDomElement dquery = doc.createElement("query");
    dquery.appendChild(doc.createTextNode(query()));
    data.appendChild(dquery);
    QDomElement dcolumn = doc.createElement("column");
    dcolumn.appendChild(doc.createTextNode(column()));
    data.appendChild(dcolumn);
    entity.appendChild(data);

    parent.appendChild(entity);
}

// RTTI
int ReportEntityText::rtti() const { return RTTI; }
int ReportEntityText::RTTI = ReportEntity::EntityText;


//
// class ReportEntityLine
//
ReportEntityLine::ReportEntityLine(ReportWindow * rw, QCanvas * canvas)
  : QCanvasLine(canvas), _rw(rw) {
}
ReportEntityLine::ReportEntityLine(QDomNode & entity, ReportWindow * rw, QCanvas * canvas)
  : QCanvasLine(canvas), _rw(rw) {
     // parse the xml entity we have been passed
     QDomNodeList nl = entity.childNodes();
     QDomNode node;
     QString n;
     double sx = 0.0, sy = 0.0, ex = 0.0, ey = 0.0;
     for(unsigned int i = 0; i < nl.count(); i++) {
         node = nl.item(i);
         n = node.nodeName();
         if(n == "weight") {
             setWeight(node.firstChild().nodeValue().toInt());
         } else if(n == "xstart") {
             sx = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
             sx = ((sx - (int)sx) < 0.5 ? (int)sx : (int)sx + 1);
         } else if(n == "ystart") {
             sy = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
             sy = ((sy - (int)sy) < 0.5 ? (int)sy : (int)sy + 1);
         } else if(n == "xend") {
             ex = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
             ex = ((ex - (int)ex) < 0.5 ? (int)ex : (int)ex + 1);
         } else if(n == "yend") {
             ey = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
             ey = ((ey - (int)ey) < 0.5 ? (int)ey : (int)ey + 1);
         } else {
             qDebug("While parsing line encountered unknown element: %s", n.latin1());
         }
     }
     setPoints((int)sx, (int)sy, (int)ex, (int)ey);
}

unsigned int ReportEntityLine::weight() const { return pen().width(); }
void ReportEntityLine::setWeight(unsigned int w) {
    if(pen().width() != w) {
        QPen p = pen();
        p.setWidth(w);
        setPen(p);
        if(_rw) _rw->setModified(TRUE);
    }
}

void ReportEntityLine::drawShape(QPainter & painter) {
    QCanvasLine::drawShape(painter);

    if(isSelected()) {
        QPen p = painter.pen();

        // draw a selected border for visual purposes
        painter.setPen(QPen(QColor(128,128,255), 0, QPen::DotLine));
        QPoint pt = startPoint();
        painter.drawRect(pt.x()-2, pt.y()-2, 5, 5);
        pt = endPoint();
        painter.drawRect(pt.x()-2, pt.y()-2, 5, 5);

        painter.setPen(p);
    }
}

void ReportEntityLine::propertyDialog(QMap<QString,QColor>*, QuerySourceList*, QWidget * parent) {
    // all we have for the user to edit is the line width
    // we should be able to do that with one of the Builtin QT dialogs
    // i think a spinner of some kind would work best
    bool ok;
    int w = QInputDialog::getInteger(QObject::tr("Line width"),QObject::tr("Width"),
          weight(), 0, 100, 1, &ok, parent);
    if(ok) {
        setWeight(w);
        canvas()->setChanged(boundingRect());
        canvas()->update();
    }
}

void ReportEntityLine::buildXML(QDomDocument & doc, QDomElement & parent) {
    QDomElement entity = doc.createElement("line");

    double sx, sy, ex, ey;

    sx = ((double)(startPoint().x()) / dpiX) * 100.0;
    sy = ((double)(startPoint().y()) / dpiY) * 100.0;
    ex = ((double)(endPoint().x()) / dpiX) * 100.0;
    ey = ((double)(endPoint().y()) / dpiY) * 100.0;
    
    QDomElement e;

    e = doc.createElement("xstart");
    e.appendChild(doc.createTextNode(QString::number((int)sx)));
    entity.appendChild(e);

    e = doc.createElement("ystart");
    e.appendChild(doc.createTextNode(QString::number((int)sy)));
    entity.appendChild(e);

    e = doc.createElement("xend");
    e.appendChild(doc.createTextNode(QString::number((int)ex)));
    entity.appendChild(e);

    e = doc.createElement("yend");
    e.appendChild(doc.createTextNode(QString::number((int)ey)));
    entity.appendChild(e);

    // weight
    QDomElement wght = doc.createElement("weight");
    wght.appendChild(doc.createTextNode(QString::number(weight())));
    entity.appendChild(wght);

    parent.appendChild(entity);
}

int ReportEntityLine::rtti() const { return RTTI; }
int ReportEntityLine::RTTI = ReportEntity::EntityLine;

//
// class ReportEntityBarcode
//
// methods (constructors)
ReportEntityBarcode::ReportEntityBarcode(ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), frmt(QObject::tr("3of9")), _align(0) {
    setMaxLength(5);
    //QRect r = getTextRect();
    setSize((int)(min_width_total*dpiX), (int)(min_height*dpiY));
}

ReportEntityBarcode::ReportEntityBarcode(const QString & s, const QString & c, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), qry(s), clmn(c), frmt(QObject::tr("3of9")), _align(0) {
    setMaxLength(5);
    //QRect r = getTextRect();
    setSize((int)(min_width_total*dpiX), (int)(min_height*dpiY));
}

ReportEntityBarcode::ReportEntityBarcode(QDomNode & element, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw), frmt(QObject::tr("3of9")) {
    setMaxLength(5);
    QDomNodeList nl = element.childNodes();
    QString n;
    QDomNode node;
    for(unsigned int i = 0; i < nl.count(); i++) {
        node = nl.item(i);
        n = node.nodeName();
        if(n == "data") {
            // see "string" just below for comments on String vs. Data
            QDomNodeList dnl = node.childNodes();
            for(unsigned int di = 0; di < dnl.count(); di++) {
                node = dnl.item(di);
                n = node.nodeName();
                if(n == "query") {
                    qry = node.firstChild().nodeValue();
                } else if(n == "column") {
                    clmn = node.firstChild().nodeValue();
                } else {
                    qDebug("while parsing field data encountered and unknown element: %s", n.latin1());
                }
            } 
        } else if(n == "string") {
            // ok -- this entity wasn't really part of the initial spec for work
            // and from what i understand the data should be puilled from the database
            // however this string field as part of the xml def i received implies that it
            // is static.
        } else if(n == "format") {
            frmt = node.firstChild().nodeValue();
        } else if(n == "rect") {
            QDomNodeList rnl = node.childNodes();
            double d = 0.0;
            for(unsigned int ri = 0; ri < rnl.count(); ri++) {
                node = rnl.item(ri);
                n = node.nodeName();
                if(n == "x") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setX(d);
                } else if(n == "y") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setY(d);
                } else if(n == "width") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize((int)d,height());
                } else if(n == "height") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize(width(),(int)d);
                } else {
                    qDebug("While parsing rect encountered unknown element: %s", n.latin1());
                }
            }
        } else if(n == "maxlength") {
            // this is the maximum length of a barcode value so that we can determine reasonably
            // what the minimum height of the barcode will be
            int i = node.firstChild().nodeValue().toInt();
            if(i < 1) i = 5;
            setMaxLength(i);
        } else if(n == "left") {
            setAlignment(0);
        } else if(n == "center") {
            setAlignment(1);
        } else if(n == "right") {
            setAlignment(2);
        } else {
            qDebug("while parsing barcode element encountered unknow element: %s",n.latin1());
        }
    }
}

// methods (deconstructor)
ReportEntityBarcode::~ReportEntityBarcode() {
}

QRect ReportEntityBarcode::getTextRect() {
    QFont fnt = QFont();
    return QFontMetrics(fnt).boundingRect(int(x()), int(y()), 0, 0, 0, clmn+QObject::tr(":")+qry+QObject::tr(" barcode"));
}

void ReportEntityBarcode::setMaxLength(int i) {
    if(i > 0) {
        if(maxlength != i) {
            maxlength = i;
            if(_rw) _rw->setModified(TRUE);
        }
        if(frmt == "3of9") {
            int C = i; // number of characters
            int N = 2; // narrow mult for wide line
            int X = 1; // narrow line width
            int I = 1; // interchange line width
            min_width_data = ( ((C + 2) * ((3 * N) + 6) * X) + ((C + 1) * I) ) / 100.0;
            min_height = min_width_data * 0.15;
            /*if(min_height < 0.25)*/ min_height = 0.25;
            min_width_total = min_width_data + 0.22; // added a little buffer to make sure we don't loose any
                                                     // of our required quiet zone in conversions
        } else if(frmt == "3of9+") {
            int C = i*2; // number of characters
            int N = 2; // narrow mult for wide line
            int X = 1; // 1px narrow line
            int I = 1; // 1px narrow line interchange
            min_width_data = ( ((C + 2) * ((3 * N) + 6) * X) + ((C + 1) * I) ) / 100.0;
            min_height = min_width_data * 0.15;
            /*if(min_height < 0.25)*/ min_height = 0.25;
            min_width_total = min_width_data + 0.22; // added a little buffer to make sure we don't loose any
                                                     // of our required quiet zone in conversions
        } else if(frmt == "128") {
            int C = i; // assuming 1:1 ratio of data passed in to data actually used in encoding
            int X = 1; // 1px wide
            min_width_data = (((11 * C) + 35) * X) / 100.0; // assuming CODE A or CODE B
            min_height = min_width_data * 0.15;
            /*if(min_height < 0.25)*/ min_height = 0.25;
            min_width_total = min_width_data + 0.22; // added a little bugger to make sure we don't loose any
                                                     // of our required quiet zone in conversions
        } else if(frmt == "upc-a") {
            min_width_data = 0.95;
            min_width_total = 1.15;
            min_height = 0.25;
        } else if(frmt == "upc-e") {
            min_width_data = 0.52;
            min_width_total = 0.70;
            min_height = 0.25;
        } else if(frmt == "ean13") {
            min_width_data = 0.95;
            min_width_total = 1.15;
            min_height = 0.25;
        } else if(frmt == "ean8") {
            min_width_data = 0.67;
            min_width_total = 0.90;
            min_height = 0.25;
        } else {
            qDebug("Unknown format encountered: %s", (const char*)frmt);
        }
        setSize(rect().width(),rect().height());
    }
}
int  ReportEntityBarcode::maxLength() { return maxlength; }

void ReportEntityBarcode::setFormat(const QString & f) {
    if(frmt != f) {
        frmt = f;
        setMaxLength(maxlength); // so we get the readjusted values
        if(_rw) _rw->setModified(TRUE);
    }
}
QString ReportEntityBarcode::format() const {
    return frmt;
}

QString ReportEntityBarcode::query() const {
    return qry;
}

void ReportEntityBarcode::setQuery(const QString& t) {
    if(qry != t) {
        qry = t;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}

QString ReportEntityBarcode::column() const {
    return clmn;
}

void ReportEntityBarcode::setColumn(const QString& t) {
    if(clmn != t) {
        clmn = t;
        if(_rw) _rw->setModified(TRUE);
        //setRect();
    }
}

int ReportEntityBarcode::alignment() { return _align; }
void ReportEntityBarcode::setAlignment(int i) {
    if(_align != i) {
        _align = i;
        if(_rw) _rw->setModified(TRUE);
    }
}

QColor ReportEntityBarcode::color() const {
    return col;
}

void ReportEntityBarcode::setColor(const QColor & c) {
    if(col != c) {
        col = c;
        if(_rw) _rw->setModified(TRUE);
    }
}


void ReportEntityBarcode::drawShape(QPainter & painter) {
    // store any values we plan on changing so we can restore them
    QPen  p = painter.pen();

    painter.setPen(col);
    painter.drawText(rect(), 0, clmn+QObject::tr(":")+qry+QObject::tr(" barcode"));

    if(isSelected()) {
        // draw a selected border for visual purposes
        painter.setPen(QPen(QColor(128,128,255), 0, QPen::DotLine));
        painter.drawRect(rect());


        const QRect r = rect();
        int halfW = (int)(r.width() / 2);
        int halfH = (int)(r.height() / 2);
        QPoint center = r.center();
        painter.fillRect(center.x()-(halfW+2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-2,
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()-2,
                         5, 5, QColor(128, 128, 255));

    }

    // restore an values before we started just in case
    painter.setPen(p);
}

void ReportEntityBarcode::propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent) {
    //qDebug("propertyDialog Called for ReportEntityField");
    BarcodeEditor * le = new BarcodeEditor(parent);
    le->init();
    // populate the cbQuery item here and set it to an appropriate value
    int selected_index = -1;
    le->cbQuery->insertItem("Context Query");
    if(query() == "Context Query") selected_index = 0;
    le->cbQuery->insertItem("Parameter Query");
    if(query() == "Parameter Query") selected_index = 1;
    if(qsl != NULL) {
        for(unsigned int i = 0; i < qsl->size(); i++) {
            le->cbQuery->insertItem(qsl->get(i)->name());
            if(query() == qsl->get(i)->name()) {
                selected_index = i + 2;
            }
        }
    } else {
        qDebug("QuerySourceList is null");
    }
    if(selected_index == -1) {
        le->cbQuery->insertItem(QObject::tr("-- Select Query --"),0);
        selected_index = 0;
    }
    le->cbQuery->setCurrentItem(selected_index);

    if(alignment() < 1)
        le->rbAlignLeft->setChecked(TRUE);
    else if(alignment() == 1)
        le->rbAlignCenter->setChecked(TRUE);
    else //if(alignment > 1)
        le->rbAlignRight->setChecked(TRUE);

    le->tbColumn->setText(column());
    le->cbFormat->setCurrentText(format());
    le->sliderMaxVal->setValue(maxLength());
    double dx = (double)(rect().x())/(double)(dpiX);
    le->leXPos->setText(QString::number(dx,'g',3));
    double dy = (double)(rect().y())/(double)(dpiY);
    le->leYPos->setText(QString::number(dy,'g',3));
    double dw = (double)(rect().width())/(double)(dpiX);
    le->leWidth->setText(QString::number(dw,'g',3));
    double dh = (double)(rect().height())/(double)(dpiY);
    le->leHeight->setText(QString::number(dh,'g',3));
    if(le->exec() == QDialog::Accepted) {
        QString qrystr = le->cbQuery->currentText();
        if(qrystr == QObject::tr("-- Select Query --")) qrystr = QString::null;
        setQuery(qrystr);
        setColumn(le->tbColumn->text());
        canvas()->setChanged(rect());
        setFormat(le->cbFormat->currentText());
        setMaxLength(le->sliderMaxVal->value()); 
        canvas()->setChanged(rect());
        double dt;
        bool ok;
        dt = le->leXPos->text().toDouble(&ok);
        if(ok) dx = dt;
        dt = le->leYPos->text().toDouble(&ok);
        if(ok) dy = dt;
        dt = le->leWidth->text().toDouble(&ok);
        if(ok) dw = dt;
        dt = le->leHeight->text().toDouble(&ok);
        if(ok) dh = dt;

        dx = dx * dpiX;
        int ix = ((dx - (int)dx) < 0.5 ? (int)dx : (int)dx + 1);
        if(rect().x() != ix) {
            setX(ix);
            if(_rw) _rw->setModified(TRUE);
        }
        dy = dy * dpiY;
        int iy = ((dy - (int)dy) < 0.5 ? (int)dy : (int)dy + 1);
        if(rect().y() != iy) {
            setY(iy);
            if(_rw) _rw->setModified(TRUE);
        }
        dw = dw * dpiX;
        dh = dh * dpiY;
        int iw = ((dw - (int)dw) < 0.5 ? (int)dw : (int)dw + 1);
        int ih = ((dh - (int)dh) < 0.5 ? (int)dh : (int)dh + 1);
        if(rect().width() != iw || rect().height() != ih) {
            setSize(iw, ih);
            if(_rw) _rw->setModified(TRUE);
        }

        if(le->rbAlignLeft->isChecked())
            setAlignment(0);
        else if(le->rbAlignCenter->isChecked())
            setAlignment(1);
        else if(le->rbAlignRight->isChecked())
            setAlignment(2);

        canvas()->setChanged(rect());
        canvas()->update();
    }
}

void ReportEntityBarcode::buildXML(QDomDocument & doc, QDomElement & parent) {
    //qDebug("ReportEntityField::buildXML()");
    QDomElement entity = doc.createElement("barcode");

    // bounding rect
    buildXMLRect(doc,entity,rect());

    // format
    QDomElement fmt = doc.createElement("format");
    fmt.appendChild(doc.createTextNode(format()));
    entity.appendChild(fmt);

    QDomElement maxl = doc.createElement("maxlength");
    maxl.appendChild(doc.createTextNode(QString::number(maxLength())));
    entity.appendChild(maxl);

    // alignment
    if(alignment() < 1)
        entity.appendChild(doc.createElement("left"));
    else if(alignment() == 1)
        entity.appendChild(doc.createElement("center"));
    else // if(alignment() > 1)
        entity.appendChild(doc.createElement("right"));
    
    // the field data
    QDomElement data = doc.createElement("data");
    QDomElement dquery = doc.createElement("query");
    dquery.appendChild(doc.createTextNode(query()));
    data.appendChild(dquery);
    QDomElement dcolumn = doc.createElement("column");
    dcolumn.appendChild(doc.createTextNode(column()));
    data.appendChild(dcolumn);
    entity.appendChild(data);

    parent.appendChild(entity);
}

// i don't know if this will work like i want because the base class doesn't define this
// as a virtual method but we'll give it a try and see if we can make this work.
void ReportEntityBarcode::setSize(int w, int h) {
    if(((int)(min_width_total*dpiX)) > w) w = (int)(min_width_total*dpiX);
    if(((int)(min_height*dpiY)) > h) h = (int)(min_height*dpiY);
    QCanvasRectangle::setSize(w, h);
}

// RTTI
int ReportEntityBarcode::rtti() const { return RTTI; }
int ReportEntityBarcode::RTTI = ReportEntity::EntityBarcode;


//
// ReportEntitiesImage
//
// contructors/deconstructors
ReportEntityImage::ReportEntityImage(ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw) {
    _img_inline = false;
    setSize((int)(1.0*dpiX), (int)(0.5*dpiY));
}

ReportEntityImage::ReportEntityImage(QDomNode & element, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw) {
    QDomNodeList nl = element.childNodes();
    QString n;
    QDomNode node;
    _img_inline = FALSE;
    for(unsigned int i = 0; i < nl.count(); i++) {
        node = nl.item(i);
        n = node.nodeName();
        if(n == "data") {
            // see "string" just below for comments on String vs. Data
            QDomNodeList dnl = node.childNodes();
            for(unsigned int di = 0; di < dnl.count(); di++) {
                node = dnl.item(di);
                n = node.nodeName();
                if(n == "query") {
                    qry = node.firstChild().nodeValue();
                } else if(n == "column") {
                    clmn = node.firstChild().nodeValue();
                } else {
                    qDebug("while parsing field data encountered and unknown element: %s", n.latin1());
                }
            } 
            _img_inline = FALSE;
        } else if(n == "mode") {
            _mode = node.firstChild().nodeValue();
        } else if(n == "map") {
            // should read the format in but it will just be reset by the setImageData
            // method
            setInlineImageData(node.firstChild().nodeValue());
            _img_inline = TRUE;
        } else if(n == "rect") {
            QDomNodeList rnl = node.childNodes();
            double d = 0.0;
            for(unsigned int ri = 0; ri < rnl.count(); ri++) {
                node = rnl.item(ri);
                n = node.nodeName();
                if(n == "x") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setX(d);
                } else if(n == "y") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setY(d);
                } else if(n == "width") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiX;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize((int)d,height());
                } else if(n == "height") {
                    d = ((node.firstChild().nodeValue().toDouble()) / 100.0) * dpiY;
                    d = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
                    setSize(width(),(int)d);
                } else {
                    qDebug("While parsing rect encountered unknown element: %s", n.latin1());
                }
            }
        } else {
            qDebug("while parsing image element encountered unknown element: %s",n.latin1());
        }
    }
}


ReportEntityImage::~ReportEntityImage() {
    // do we need to clean anything up?
}

// methods

QString ReportEntityImage::query() const {
    return qry;
}

void ReportEntityImage::setQuery(const QString& t) {
    if(qry != t) {
        qry = t;
        if(_rw) _rw->setModified(TRUE);
    }
}

QString ReportEntityImage::column() const {
    return clmn;
}

void ReportEntityImage::setColumn(const QString& t) {
    if(clmn != t) {
        clmn = t;
        if(_rw) _rw->setModified(TRUE);
    }
}


bool ReportEntityImage::isInline() {
    return _img_inline;
}
void ReportEntityImage::setInline(bool yes) {
    if(_img_inline != yes) {
        _img_inline = yes;
        if(_rw) _rw->setModified(TRUE);

        canvas()->setChanged(rect());
        canvas()->update();
    }
}

QString ReportEntityImage::inlineImageData() {
    return img_data;
}
void ReportEntityImage::setInlineImageData(QString dat) {
    if(img_data != dat) {
        img_data = dat;
        QByteArray bytes = QUUDecode(img_data);
        img.loadFromData(bytes);
        _frmt = QString(QImageIO::imageFormat(QDataStream(bytes,IO_ReadOnly).device()));

        canvas()->setChanged(rect());
        canvas()->update();

        if(_rw) _rw->setModified(TRUE);
    }
}

QString ReportEntityImage::mode() { return _mode; }
void ReportEntityImage::setMode(QString m) {
    if(_mode != m) {
        _mode = m;
        if(_rw) _rw->setModified(TRUE);

        canvas()->setChanged(rect());
        canvas()->update();
    }
}


void ReportEntityImage::drawShape(QPainter & painter) {
    // store any values we plan on changing so we can restore them
    QPen  p = painter.pen();

    if(isInline()) {
        QImage t_img = img;
        if(_mode == "stretch") {
            t_img = img.scale(rect().width(), rect().height(), QImage::ScaleMin);
        }
        painter.drawImage(rect().left(), rect().top(), t_img, 0, 0, rect().width(), rect().height());
    } else {
        painter.drawText(rect(), 0, clmn+QObject::tr(":")+qry+QObject::tr(" image"));
    }

    if(isSelected()) {
        // draw a selected border for visual purposes
        painter.setPen(QPen(QColor(128,128,255), 0, QPen::DotLine));
        painter.drawRect(rect());


        const QRect r = rect();
        int halfW = (int)(r.width() / 2);
        int halfH = (int)(r.height() / 2);
        QPoint center = r.center();
        painter.fillRect(center.x()-(halfW+2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-2,
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()-2,
                         5, 5, QColor(128, 128, 255));

    }

    // restore an values before we started just in case
    painter.setPen(p);
}

void ReportEntityImage::propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent) {
    //qDebug("propertyDialog Called for ReportEntityImage");
    ImageEditor * le = new ImageEditor(parent);
    le->init();
    // populate the cbQuery item here and set it to an appropriate value
    int selected_index = -1;
    le->cbQuery->insertItem("Context Query");
    if(query() == "Context Query") selected_index = 0;
    le->cbQuery->insertItem("Parameter Query");
    if(query() == "Parameter Query") selected_index = 1;
    if(qsl != NULL) {
        for(unsigned int i = 0; i < qsl->size(); i++) {
            le->cbQuery->insertItem(qsl->get(i)->name());
            if(query() == qsl->get(i)->name()) {
                selected_index = i + 2;
            }
        }
    } else {
        qDebug("QuerySourceList is null");
    }
    if(selected_index == -1) {
        le->cbQuery->insertItem(QObject::tr("-- Select Query --"),0);
        selected_index = 0;
    }
    le->cbQuery->setCurrentItem(selected_index);

    le->tbColumn->setText(column());
    if(isInline()) {
        le->setInline(TRUE);
        le->setImageData(inlineImageData());
    } else {
        le->setInline(FALSE);
    }
    le->setMode(mode());
    double dx = (double)(rect().x())/(double)(dpiX);
    le->leXPos->setText(QString::number(dx,'g',3));
    double dy = (double)(rect().y())/(double)(dpiY);
    le->leYPos->setText(QString::number(dy,'g',3));
    double dw = (double)(rect().width())/(double)(dpiX);
    le->leWidth->setText(QString::number(dw,'g',3));
    double dh = (double)(rect().height())/(double)(dpiY);
    le->leHeight->setText(QString::number(dh,'g',3));

    if(le->exec() == QDialog::Accepted) {
        QString qrystr = le->cbQuery->currentText();
        if(qrystr == QObject::tr("-- Select Query --")) qrystr = QString::null;
        setQuery(qrystr);
        setColumn(le->tbColumn->text());

        setMode(le->getMode());

        if(le->isInline()) {
            setInline(TRUE);
            setInlineImageData(le->getImageData());
        } else {
            setInline(FALSE);
        }

        canvas()->setChanged(rect());
        double dt;
        bool ok;
        dt = le->leXPos->text().toDouble(&ok);
        if(ok) dx = dt;
        dt = le->leYPos->text().toDouble(&ok);
        if(ok) dy = dt;
        dt = le->leWidth->text().toDouble(&ok);
        if(ok) dw = dt;
        dt = le->leHeight->text().toDouble(&ok);
        if(ok) dh = dt;

        dx = dx * dpiX;
        int ix = ((dx - (int)dx) < 0.5 ? (int)dx : (int)dx + 1);
        if(rect().x() != ix) {
            setX(ix);
            if(_rw) _rw->setModified(TRUE);
        }
        dy = dy * dpiY;
        int iy = ((dy - (int)dy) < 0.5 ? (int)dy : (int)dy + 1);
        if(rect().y() != iy) {
            setY(iy);
            if(_rw) _rw->setModified(TRUE);
        }
        dw = dw * dpiX;
        dh = dh * dpiY;
        int iw = ((dw - (int)dw) < 0.5 ? (int)dw : (int)dw + 1);
        int ih = ((dh - (int)dh) < 0.5 ? (int)dh : (int)dh + 1);
        if(rect().width() != iw || rect().height() != ih) {
            setSize(iw, ih);
            if(_rw) _rw->setModified(TRUE);
        }

        canvas()->setChanged(rect());
        canvas()->update();
    }
}



void ReportEntityImage::buildXML(QDomDocument & doc, QDomElement & parent) {
    QDomElement entity = doc.createElement("image");

    buildXMLRect(doc,entity,rect());

    // mode
    QDomElement md = doc.createElement("mode");
    md.appendChild(doc.createTextNode(_mode));
    entity.appendChild(md);

    if(isInline()) {
        QDomElement map = doc.createElement("map");
        map.setAttribute("format",_frmt);
        map.appendChild(doc.createTextNode(inlineImageData()));
        entity.appendChild(map);
    } else {
        // the field data
        QDomElement data = doc.createElement("data");
        QDomElement dquery = doc.createElement("query");
        dquery.appendChild(doc.createTextNode(query()));
        data.appendChild(dquery);
        QDomElement dcolumn = doc.createElement("column");
        dcolumn.appendChild(doc.createTextNode(column()));
        data.appendChild(dcolumn);
        entity.appendChild(data);
    }

    parent.appendChild(entity);
}

// RTTI
int ReportEntityImage::rtti() const { return RTTI; }
int ReportEntityImage::RTTI = ReportEntity::EntityImage;


//
// ReportEntityGraph
//
ReportEntityGraph::ReportEntityGraph(ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw) {
    setSize((int)(1.0*dpiX), (int)(0.5*dpiY));
    _graphData.font = getDefaultEntityFont();
    _graphData.data.query = QString::null;
    _graphData.data.column = QString::null;
    _graphData.title.string = QString::null;
    _graphData.title.font_defined = FALSE;
    _graphData.dataaxis.column = QString::null;
    _graphData.dataaxis.font_defined = FALSE;
    _graphData.dataaxis.title.string = QString::null;
    _graphData.dataaxis.title.font_defined = FALSE;
    _graphData.valueaxis.min = 0;
    _graphData.valueaxis.max = 100;
    _graphData.valueaxis.autominmax = TRUE;
    _graphData.valueaxis.font_defined = FALSE;
    _graphData.valueaxis.title.string = QString::null;
    _graphData.valueaxis.title.font_defined = FALSE;
}
ReportEntityGraph::ReportEntityGraph(QDomNode & element, ReportWindow * rw, QCanvas * canvas)
  : QCanvasRectangle(canvas), _rw(rw) {
    const QDomElement elem = element.toElement();
    if(!parseReportGraphData(elem, _graphData)) {
        qDebug("Error parsing graph data. Some data may be missing or incorrect.");
    }

    double d, dx, dy, dw, dh;

    d = ((_graphData.rect.x()) / 100.0) * dpiX;
    dx = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
    setX(dx);

    d = ((_graphData.rect.y()) / 100.0) * dpiY;
    dy = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);
    setY(dy);

    d = ((_graphData.rect.width()) / 100.0) * dpiX;
    dw = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);

    d = ((_graphData.rect.height()) / 100.0) * dpiY;
    dh = ((d - (int)d) < 0.5 ? (int)d : (int)d + 1);

    setSize((int)dw, (int)dh);
}

ReportEntityGraph::ReportEntityGraph(ORGraphData & gData, ReportWindow * rw, QCanvas * canvas) :
  QCanvasRectangle(canvas), _rw(rw) {
    _graphData.data = gData.data;
    _graphData.font = gData.font;
    _graphData.rect = gData.rect;
    _graphData.title = gData.title;
    _graphData.dataaxis = gData.dataaxis;
    _graphData.valueaxis = gData.valueaxis;
    _graphData.series.setAutoDelete(TRUE);
    _graphData.series.clear();
    for(unsigned int i = 0; i < gData.series.count(); i++) {
        ORSeriesData * sd = new ORSeriesData();
        *sd = *gData.series.at(i);
        _graphData.series.append(sd);
    }
}

ReportEntityGraph::~ReportEntityGraph() {
}

void ReportEntityGraph::copyData(ORGraphData & gData) {
    gData.data = _graphData.data;
    gData.font = _graphData.font;
    gData.rect = _graphData.rect;
    gData.title = _graphData.title;
    gData.dataaxis = _graphData.dataaxis;
    gData.valueaxis = _graphData.valueaxis;
    gData.series.setAutoDelete(TRUE);
    gData.series.clear();
    for(unsigned int i = 0; i < _graphData.series.count(); i++) {
        ORSeriesData * sd = new ORSeriesData();
        *sd = *_graphData.series.at(i);
        gData.series.append(sd);
    }
    if(_rw) _rw->setModified(TRUE);
}

void ReportEntityGraph::drawShape(QPainter & painter) {
    // store any values we plan on changing so we can restore them
    painter.save();

    painter.drawText(rect(), 0, _graphData.data.query+QObject::tr(" graph"));

    if(isSelected()) {
        // draw a selected border for visual purposes
        painter.setPen(QPen(QColor(128,128,255), 0, QPen::DotLine));
        painter.drawRect(rect());

        const QRect r = rect();
        int halfW = (int)(r.width() / 2);
        int halfH = (int)(r.height() / 2);
        QPoint center = r.center();
        painter.fillRect(center.x()-(halfW+2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-(halfH+2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()-2,
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()+(halfW-2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-2, center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()+(halfH-2),
                         5, 5, QColor(128, 128, 255));
        painter.fillRect(center.x()-(halfW+2), center.y()-2,
                         5, 5, QColor(128, 128, 255));

    }

    // restore an values before we started just in case
    painter.restore();
}

void ReportEntityGraph::setQuery(const QString & str) {
    if(_graphData.data.query != str) {
        _graphData.data.query = str;
        if(_rw) _rw->setModified(TRUE);
    }
}

QString ReportEntityGraph::query() { return _graphData.data.query; }

void ReportEntityGraph::propertyDialog(QMap<QString,QColor>* cmap, QuerySourceList * qsl, QWidget * parent) {
    //qDebug("propertyDialog Called for ReportEntityGraph");
    GraphEditor * le = new GraphEditor(parent);
    le->init();
    le->setColorMap(cmap);
    unsigned int i = 0;
    // populate the cbQuery item here and set it to an appropriate value
    int selected_index = -1;
    le->cbQuery->insertItem("Context Query");
    if(query() == "Context Query") selected_index = 0;
    le->cbQuery->insertItem("Parameter Query");
    if(query() == "Parameter Query") selected_index = 1;
    if(qsl != NULL) {
        for(i = 0; i < qsl->size(); i++) {
            le->cbQuery->insertItem(qsl->get(i)->name());
            if(query() == qsl->get(i)->name()) {
                selected_index = i + 2;
            }
        }
    } else {
        qDebug("QuerySourceList is null");
    }
    if(selected_index == -1) {
        le->cbQuery->insertItem(QObject::tr("-- Select Query --"),0);
        selected_index = 0;
    }
    le->cbQuery->setCurrentItem(selected_index);

    //le->tbColumn->setText(column());
    double dx = (double)(rect().x())/(double)(dpiX);
    le->leXPos->setText(QString::number(dx,'g',3));
    double dy = (double)(rect().y())/(double)(dpiY);
    le->leYPos->setText(QString::number(dy,'g',3));
    double dw = (double)(rect().width())/(double)(dpiX);
    le->leWidth->setText(QString::number(dw,'g',3));
    double dh = (double)(rect().height())/(double)(dpiY);
    le->leHeight->setText(QString::number(dh,'g',3));

    le->setBaseFont(_graphData.font);
    le->setTitleFont(_graphData.font);
    le->setUseTitleFont(FALSE);
    le->setDataTitleFont(_graphData.font);
    le->setUseDataTitleFont(FALSE);
    le->setDataFont(_graphData.font);
    le->setUseDataFont(FALSE);
    le->setValueTitleFont(_graphData.font);
    le->setUseValueTitleFont(FALSE);
    le->setValueFont(_graphData.font);
    le->setUseValueFont(FALSE);

    le->setTitle(_graphData.title.string);
    if(_graphData.title.font_defined) {
        le->setTitleFont(_graphData.title.font);
        le->setUseTitleFont(TRUE);
    }

    le->setDataColumn(_graphData.dataaxis.column);
    if(_graphData.dataaxis.font_defined) {
        le->setDataFont(_graphData.dataaxis.font);
        le->setUseDataFont(TRUE);
    }

    le->setDataTitle(_graphData.dataaxis.title.string);
    if(_graphData.dataaxis.title.font_defined) {
        le->setDataTitleFont(_graphData.dataaxis.title.font);
        le->setUseDataTitleFont(TRUE);
    }

    le->setMinValue(_graphData.valueaxis.min);
    le->setMaxValue(_graphData.valueaxis.max);
    le->setAutoMinMax(_graphData.valueaxis.autominmax);
    if(_graphData.valueaxis.font_defined) {
        le->setValueFont(_graphData.valueaxis.font);
        le->setUseValueFont(TRUE);
    }
    le->setValueTitle(_graphData.valueaxis.title.string);
    if(_graphData.valueaxis.title.font_defined) {
        le->setValueTitleFont(_graphData.valueaxis.title.font);
        le->setUseValueTitleFont(TRUE);
    }

    ORSeriesData * sd1 = 0;
    ORSeriesData * sd2 = 0;
    for(i = 0; i < _graphData.series.count(); i++) {
        sd1 = _graphData.series.at(i);
        sd2 = new ORSeriesData();
        *sd2 = *sd1;
        le->getSeriesList().append(sd2);
        le->_cbSeries->insertItem(sd2->name);
    }
    le->_cbSeries_activated(le->_cbSeries->text(le->_cbSeries->currentItem()));
    
    // add in the code to do the value label stuff as well

    if(le->exec() == QDialog::Accepted) {
        QString qrystr = le->cbQuery->currentText();
        if(qrystr == QObject::tr("-- Select Query --")) qrystr = QString::null;
        setQuery(qrystr);

        _graphData.font = le->getBaseFont();
        _graphData.title.string = le->getTitle();
        _graphData.title.font = le->getTitleFont();
        _graphData.title.font_defined = le->getUseTitleFont();
        _graphData.dataaxis.column = le->getDataColumn();
        _graphData.dataaxis.font = le->getDataFont();
        _graphData.dataaxis.font_defined = le->getUseDataFont();
        _graphData.dataaxis.title.string = le->getDataTitle();
        _graphData.dataaxis.title.font = le->getDataTitleFont();
        _graphData.dataaxis.title.font_defined = le->getUseDataTitleFont();
        _graphData.valueaxis.min = le->getMinValue();
        _graphData.valueaxis.max = le->getMaxValue();
        _graphData.valueaxis.autominmax = le->getAutoMinMax();
        _graphData.valueaxis.font = le->getValueFont();
        _graphData.valueaxis.font_defined = le->getUseValueFont();
        _graphData.valueaxis.title.string = le->getValueTitle();
        _graphData.valueaxis.title.font = le->getValueTitleFont();
        _graphData.valueaxis.title.font_defined = le->getUseValueTitleFont();

        sd1 = sd2 = 0;
        _graphData.series.setAutoDelete(TRUE);
        _graphData.series.clear();
        for(i = 0; i < le->getSeriesList().count(); i++) {
            sd2 = le->getSeriesList().at(i);
            sd1 = new ORSeriesData();
            *sd1 = *sd2;
            if(sd1->color.length() < 1) sd1->color = le->_cbColors->currentText();
            _graphData.series.append(sd1);
        }

        canvas()->setChanged(rect());
        double dt;
        bool ok;
        dt = le->leXPos->text().toDouble(&ok);
        if(ok) dx = dt;
        dt = le->leYPos->text().toDouble(&ok);
        if(ok) dy = dt;
        dt = le->leWidth->text().toDouble(&ok);
        if(ok) dw = dt;
        dt = le->leHeight->text().toDouble(&ok);
        if(ok) dh = dt;

        dx = dx * dpiX;
        setX(((dx - (int)dx) < 0.5 ? (int)dx : (int)dx + 1));
        dy = dy * dpiY;
        setY(((dy - (int)dy) < 0.5 ? (int)dy : (int)dy + 1));
        dw = dw * dpiX;
        dh = dh * dpiY;
        setSize( ((dw - (int)dw) < 0.5 ? (int)dw : (int)dw + 1),
                 ((dh - (int)dh) < 0.5 ? (int)dh : (int)dh + 1) );

        canvas()->setChanged(rect());
        canvas()->update();

        // eek -- this one is just out of control. I'm just going to say
        // that the document has been modified and be done with it for now.
        // the graph entity is fairly new and not in standard use so it
        // shouldn't be that big of a deal.
        if(_rw) _rw->setModified(TRUE);
    }
}

void ReportEntityGraph::buildXML(QDomDocument & doc, QDomElement & parent) {
    QDomElement entity = doc.createElement("graph");

    buildXMLRect(doc,entity,rect());
    buildXMLFont(doc,entity,_graphData.font);

    QDomElement elem;

    // the field data
    QDomElement data = doc.createElement("data");
    QDomElement dquery = doc.createElement("query");
    dquery.appendChild(doc.createTextNode(query()));
    data.appendChild(dquery);
    QDomElement dcolumn = doc.createElement("column");
    data.appendChild(dcolumn);
    entity.appendChild(data);

    if(_graphData.title.string.length() > 0) {
        QDomElement title = doc.createElement("title");
        QDomElement string = doc.createElement("string");
        string.appendChild(doc.createTextNode(_graphData.title.string));
        title.appendChild(string);
        if(_graphData.title.font_defined) {
            buildXMLFont(doc, title, _graphData.title.font);
        }
        entity.appendChild(title);
    }

    if(_graphData.dataaxis.title.string.length() > 0 || _graphData.dataaxis.column.length() > 0) {
        QDomElement dataaxis = doc.createElement("dataaxis");
        entity.appendChild(dataaxis);

        if(_graphData.dataaxis.title.string.length() > 0) {
            QDomElement title = doc.createElement("title");
            QDomElement string = doc.createElement("string");
            string.appendChild(doc.createTextNode(_graphData.dataaxis.title.string));
            title.appendChild(string);
            if(_graphData.dataaxis.title.font_defined) {
                buildXMLFont(doc, title, _graphData.dataaxis.title.font);
            }
            dataaxis.appendChild(title);
        }

        if(_graphData.dataaxis.column.length() > 0) {
            QDomElement clmn = doc.createElement("column");
            clmn.appendChild(doc.createTextNode(_graphData.dataaxis.column));
            dataaxis.appendChild(clmn);
            if(_graphData.dataaxis.font_defined) {
                buildXMLFont(doc, dataaxis, _graphData.dataaxis.font);
            }
        }
    }

    if(_graphData.valueaxis.font_defined || _graphData.valueaxis.title.string.length() > 0 ||
       _graphData.valueaxis.min != 0 || _graphData.valueaxis.max != 100 ||
       _graphData.valueaxis.autominmax != TRUE) {
        QDomElement valueaxis = doc.createElement("valueaxis");

        if(_graphData.valueaxis.title.string.length() > 0) {
            QDomElement title = doc.createElement("title");
            QDomElement string = doc.createElement("string");
            string.appendChild(doc.createTextNode(_graphData.valueaxis.title.string));
            title.appendChild(string);
            if(_graphData.valueaxis.title.font_defined) {
                buildXMLFont(doc, title, _graphData.valueaxis.title.font);
            }
            valueaxis.appendChild(title);
        }

        elem = doc.createElement("min");
        elem.appendChild(doc.createTextNode(QString::number(_graphData.valueaxis.min)));
        valueaxis.appendChild(elem);

        elem = doc.createElement("max");
        elem.appendChild(doc.createTextNode(QString::number(_graphData.valueaxis.max)));
        valueaxis.appendChild(elem);

        elem = doc.createElement("autominmax");
        elem.appendChild(doc.createTextNode((_graphData.valueaxis.autominmax?"true":"false")));
        valueaxis.appendChild(elem);

        if(_graphData.valueaxis.font_defined) {
            buildXMLFont(doc, valueaxis, _graphData.valueaxis.font);
        }
        entity.appendChild(valueaxis);
    }

    for(unsigned int snum = 0; snum < _graphData.series.count(); snum++) {
        ORSeriesData * series = _graphData.series.at(snum);
        if(series) {
            QDomElement selem = doc.createElement("series");

            elem = doc.createElement("name");
            elem.appendChild(doc.createTextNode(series->name));
            selem.appendChild(elem);

            elem = doc.createElement("column");
            elem.appendChild(doc.createTextNode(series->column));
            selem.appendChild(elem);

            elem = doc.createElement("color");
            elem.appendChild(doc.createTextNode(series->color));
            selem.appendChild(elem);

            if(series->style.bar || series->style.line || series->style.point) {
                elem = doc.createElement("style");
                if(series->style.bar) elem.appendChild(doc.createElement("bar"));
                if(series->style.line) elem.appendChild(doc.createElement("line"));
                if(series->style.point) elem.appendChild(doc.createElement("point"));
                selem.appendChild(elem);
            }

            entity.appendChild(selem);
        }
    }

    parent.appendChild(entity);
}

// RTTI
int ReportEntityGraph::rtti() const { return RTTI; }
int ReportEntityGraph::RTTI = ReportEntity::EntityGraph;

