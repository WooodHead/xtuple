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

#include "imageeditor.h"

#include <QVariant>
#include <QImage>
#include <QPainter>
#include <QFile>
#include <Q3FileDialog>
#include <QValidator>

#include <quuencode.h>

/*
 *  Constructs a ImageEditor as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
ImageEditor::ImageEditor(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(cbStatic, SIGNAL(toggled(bool)), this, SLOT(cbStatic_toggled(bool)));
    connect(buttonOk, SIGNAL(clicked()), this, SLOT(accept()));
    connect(buttonCancel, SIGNAL(clicked()), this, SLOT(reject()));
    connect(btnLoad, SIGNAL(clicked()), this, SLOT(btnLoad_clicked()));
    init();
}

/*
 *  Destroys the object and frees any allocated resources
 */
ImageEditor::~ImageEditor()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void ImageEditor::languageChange()
{
    retranslateUi(this);
}

void ImageEditor::cbStatic_toggled( bool yes )
{
    gbDynamic->setEnabled(!yes);
   
    gbStatic->setEnabled(yes);
}

QString ImageEditor::getImageData()
{
    return uudata;
}

void ImageEditor::setImageData( QString dat )
{
    uudata = dat;
    QByteArray bytes = QUUDecode(dat);
    QImage i = QImage(bytes);
    QPainter p(frmPreview);
    p.drawImage(frmPreview->frameRect(),i);
}

QString ImageEditor::getMode()
{
    if(rbClip->isChecked()) return "clip";
    if(rbStretch->isChecked()) return "stretch";
    return "clip";
}

bool ImageEditor::isInline()
{
    return cbStatic->isChecked();
}

void ImageEditor::setMode( QString m)
{
    if(m == "clip") rbClip->setChecked(TRUE);
    else if(m == "stretch") rbStretch->setChecked(TRUE);
    else rbClip->setChecked(TRUE);
}

void ImageEditor::setInline( bool yes )
{
    cbStatic->setChecked(yes);
}

void ImageEditor::btnLoad_clicked()
{
    QString fn = Q3FileDialog::getOpenFileName(QString::null, tr("Images(*.png *.jpg *.xpm)"),
					      this, "open file dialog", tr("Choose a file"));
    if(!fn.isEmpty()) {
	QFile file(fn);
	setImageData(QUUEncode(file));
    }
}



void ImageEditor::init()
{
    leXPos->setValidator(new QDoubleValidator(0.0,100.0,3,leXPos));
    leYPos->setValidator(new QDoubleValidator(0.0,100.0,3,leYPos));
    
    leWidth->setValidator(new QDoubleValidator(0.01,100.0,3,leWidth));
    leHeight->setValidator(new QDoubleValidator(0.01,100.0,3,leHeight));
}
