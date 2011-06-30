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

#include <qfontdialog.h>
#include <qfiledialog.h>
#include <qvalidator.h>
#include <quuencode.h>
#include <qpainter.h>
#include <qimage.h>

void ReportProperties::init()
{
    _tabBg->setEnabled(false);
    _uudata = QString::null;
    
    QDoubleValidator * dblval = new QDoubleValidator(0.0, 100.0, 2, this);
    _leBgX->setValidator(dblval);
    _leBgY->setValidator(dblval);
    _leBgWidth->setValidator(dblval);
    _leBgHeight->setValidator(dblval);
}

//
// Info
//
QString ReportProperties::getReportDescription()
{
    return _leDescription->text();
}

QString ReportProperties::getReportName()
{
    return _leName->text();
}

QString ReportProperties::getReportTitle()
{
    return _leTitle->text();
}

void ReportProperties::setReportDescription(QString str)
{
    _leDescription->setText(str);
}

void ReportProperties::setReportName(QString str)
{
    _leName->setText(str);
}

void ReportProperties::setReportTitle(QString str)
{
    _leTitle->setText(str);
}

//
// Watermark
//
int ReportProperties::getWatermarkOpacity()
{
    return _slWmOpacity->value();
}

void ReportProperties::setWatermarkOpacity( int i )
{
    if(_slWmOpacity->value() != i) {
	_slWmOpacity->setValue(i);
    }
    double d = i / 2.55;
    _lblWmOpacity->setText(QString("%1%").arg(QString::number((int)d)));
}

void ReportProperties::changeWmFont()
{
    bool valid = false;
    QFont fnt = QFontDialog::getFont(&valid, getWmFont(), this);
    if(valid) {
	setWmFont(fnt);
    }
}

void ReportProperties::setWmFont( QFont fnt )
{
    _leWmFont->setFont(fnt);
    _leWmFont->setText(fnt.family());
}


QFont ReportProperties::getWmFont()
{
    return _leWmFont->font();
}

void ReportProperties::SetUseBestWMFont( bool b )
{
    _cbWmUseBest->setChecked(b);
}

bool ReportProperties::getUseBestWmFont()
{
    return _cbWmUseBest->isChecked();
}

bool ReportProperties::isWmTextStatic()
{
    return _cbWmStatic->isChecked();
}

void ReportProperties::setWmTextStatic( bool b )
{
    _cbWmStatic->setChecked(b);
}

QString ReportProperties::getWmText()
{
    return _leWmText->text();
}

void ReportProperties::setWmText( QString str )
{
    _leWmText->setText(str);
}


void ReportProperties::setWmColumn( QString str )
{
    _leWmColumn->setText(str);
}


QString ReportProperties::getWmColumn()
{
    return _leWmColumn->text();
}


void ReportProperties::setWmQuery( QuerySourceList * qsl, QString query)
{
    _cbWmQuery->clear();
    // populate the cbQuery item here and set it to an appropriate value
    int selected_index = -1;
    _cbWmQuery->insertItem("Context Query");
    if(query == "Context Query") selected_index = 0;
    _cbWmQuery->insertItem("Parameter Query");
    if(query == "Parameter Query") selected_index = 1;
    if(qsl != NULL) {
        for(unsigned int i = 0; i < qsl->size(); i++) {
            _cbWmQuery->insertItem(qsl->get(i)->name());
            if(query == qsl->get(i)->name()) {
                selected_index = i + 2;
            }
        }
    } else {
        qDebug("QuerySourceList is null");
    }
    if(selected_index == -1) {
        _cbWmQuery->insertItem(QObject::tr("-- Select Query --"),0);
        selected_index = 0;
    }
    _cbWmQuery->setCurrentItem(selected_index);
}


QString ReportProperties::getWmQuery()
{
    QString str = _cbWmQuery->currentText();
    if(str == tr("-- Select Query --")) {
	str = QString::null;
    }
    return str;
}

//
// Background
//
QString ReportProperties::getBgColumn()
{
    return _leBgColumn->text();
}

void ReportProperties::setBgColumn( QString str )
{
    _leBgColumn->setText(str);
}

QString ReportProperties::getBgQuery()
{
    QString str = _cbBgQuery->currentText();
    if(str == tr("-- Select Query --")) {
	str = QString::null;
    }
    return str;
}

void ReportProperties::setBgQuery( QuerySourceList * qsl, QString query )
{
    _cbBgQuery->clear();
    // populate the _cbBgQuery item here and set it to an appropriate value
    int selected_index = -1;
    _cbBgQuery->insertItem("Context Query");
    if(query == "Context Query") selected_index = 0;
    _cbBgQuery->insertItem("Parameter Query");
    if(query == "Parameter Query") selected_index = 1;
    if(qsl != NULL) {
        for(unsigned int i = 0; i < qsl->size(); i++) {
            _cbBgQuery->insertItem(qsl->get(i)->name());
            if(query == qsl->get(i)->name()) {
                selected_index = i + 2;
            }
        }
    } else {
        qDebug("QuerySourceList is null");
    }
    if(selected_index == -1) {
        _cbBgQuery->insertItem(QObject::tr("-- Select Query --"),0);
        selected_index = 0;
    }
    _cbBgQuery->setCurrentItem(selected_index);
}

int ReportProperties::getBgOpacity()
{
    return _slBgOpacity->value();
}

void ReportProperties::setBgOpacity( int i )
{
    if(_slBgOpacity->value() != i) {
	_slBgOpacity->setValue(i);
    }
    double d = i / 2.55;
    _lblBgOpacity->setText(QString("%1%").arg(QString::number((int)d)));
}


bool ReportProperties::isBgEnabled()
{
    return _cbBgEnable->isChecked();
}


void ReportProperties::setBgEnabled( bool b )
{
    _cbBgEnable->setChecked(b);
}


bool ReportProperties::isBgStatic()
{
    return _rbBgStatic->isChecked();
}


void ReportProperties::setBgStatic( bool b )
{
    if(b) {
	_rbBgStatic->setChecked(TRUE);
    } else {
	_rbBgDynamic->setChecked(TRUE);
    }
}


QString ReportProperties::getBgResizeMode()
{
    if(_rbBgClip->isChecked()) return "clip";
    if(_rbBgStretch->isChecked()) return "stretch";
    return "clip";
}


void ReportProperties::setBgResizeMode( QString m )
{
    if(m == "stretch") {
	_rbBgStretch->setChecked(TRUE);
    } else /* if(m == "clip") */ {
	_rbBgClip->setChecked(TRUE);
    }
    
}


QString ReportProperties::getBgImageData()
{
    return _uudata;
}


void ReportProperties::setBgImageData( QString dat )
{
    _uudata = dat;
    if(!_uudata.isEmpty()) {
        QByteArray bytes = QUUDecode(dat);
        QImage i = QImage(bytes);
        _pixmap->setPixmap(i);
    } else {
        _pixmap->setPixmap(QPixmap());
    }
}

void ReportProperties::sLoadBgImage() {
    QString fn = QFileDialog::getOpenFileName(QString::null, tr("Images(*.png *.jpg *.xpm)"),
                                              this, "open file dialog", tr("Choose a file"));
    if(!fn.isEmpty()) {
        QFile file(fn);
        setBgImageData(QUUEncode(file));
    }
}

void ReportProperties::setBgAlign( int f )
{
    if((f & AlignLeft) == AlignLeft) {
        _rbBgHAlignLeft->setChecked(TRUE);
    } else if((f & AlignHCenter) == AlignHCenter) {
        _rbBgHAlignCenter->setChecked(TRUE);
    } else if((f & AlignRight) == AlignRight) {
        _rbBgHAlignRight->setChecked(TRUE);
    } else {
	_rbBgHAlignLeft->setChecked(TRUE);
    }
    
    if((f & AlignTop) == AlignTop) {
        _rbBgVAlignTop->setChecked(TRUE);
    } else if((f & AlignVCenter) == AlignVCenter) {
        _rbBgVAlignMiddle->setChecked(TRUE);
    } else if((f & AlignBottom) == AlignBottom) {
        _rbBgVAlignBottom->setChecked(TRUE);
    } else {
	_rbBgVAlignTop->setChecked(TRUE);
    }
}

int ReportProperties::getBgAlign()
{
    int f = 0;
    if(_rbBgHAlignRight->isChecked()) {
	f = Qt::AlignRight;
    } else if(_rbBgHAlignCenter->isChecked()) {
	f = Qt::AlignHCenter;
    } else /*if(_rbBgHAlignLeft->isChecked())*/ {
	f = Qt::AlignLeft;
    }
    if(_rbBgVAlignBottom->isChecked()) {
	f |= Qt::AlignBottom;
    } else if(_rbBgVAlignMiddle->isChecked()) {
	f |= Qt::AlignVCenter;
    } else /*if(_rbBgVAlignMiddle->isChecked())*/ {
	f |= Qt::AlignTop;
    }
    return f;
}


int ReportProperties::getBgBoundsX()
{
    return (int)(_leBgX->text().toDouble() * 100.0);
}


int ReportProperties::getBgBoundsY()
{
    return (int)(_leBgY->text().toDouble() * 100.0);
}


int ReportProperties::getBgBoundsWidth()
{
    return (int)(_leBgWidth->text().toDouble() * 100.0);
}


int ReportProperties::getBgBoundsHeight()
{
    return (int)(_leBgHeight->text().toDouble() * 100.0);
}


void ReportProperties::setBgBoundsX( int i )
{
    _leBgX->setText(QString::number((double)i/100.0, 'g', 2));
}


void ReportProperties::setBgBoundsY( int i )
{
    _leBgY->setText(QString::number((double)i/100.0, 'g', 2));
}


void ReportProperties::setBgBoundsWidth( int i )
{
    _leBgWidth->setText(QString::number((double)i/100.0, 'g', 2));
}


void ReportProperties::setBgBoundsHeight( int i )
{
    _leBgHeight->setText(QString::number((double)i/100.0, 'g', 2));
}
