/*
 * Copyright (c) 2002-2006 by OpenMFG, LLC
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

#include <qvalidator.h>
#include <builtinformatfunctions.h>

void FieldEditor::rbAlign_changed()
{
    // ok one of the radio buttons was click.    
    // there are 8 radio buttons to check.
    // 4 in 2 groups: vertical and horizonatal group
    int f = AlignAuto;
    if(rbHAlignLeft->isChecked()) f |= AlignLeft;
    if(rbHAlignCenter->isChecked()) f |= AlignHCenter;
    if(rbHAlignRight->isChecked()) f |= AlignRight;
    if(rbVAlignTop->isChecked()) f |= AlignTop;
    if(rbVAlignMiddle->isChecked()) f |= AlignVCenter;
    if(rbVAlignBottom->isChecked()) f |= AlignBottom;
    labelPreview->setAlignment(f);
}

void FieldEditor::btnFont_clicked()
{
    // pop up a font dialog
    bool ok;
    QFont font = QFontDialog::getFont(&ok, labelPreview->font(), this);
    if(ok) {
        labelPreview->setFont(font);
    }
}

void FieldEditor::tbText_textChanged( const QString & Str )
{
    // ok update the preview
    labelPreview->setText(Str + ":" + cbQuery->currentText());
}

void FieldEditor::setLabelFlags( int f )
{
    // set the label flags
    //qDebug("FieldEditor::setLabelFlags( 0x%X )",f);
    labelPreview->setAlignment(f);
    if((f & AlignLeft) == AlignLeft) {
        //qDebug("HAlignLeft 0x%X", AlignLeft);
        rbHAlignLeft->setChecked(TRUE);
    } else if((f & AlignHCenter) == AlignHCenter) {
        //qDebug("HAlignCenter 0x%X", AlignHCenter);
        rbHAlignCenter->setChecked(TRUE);
    } else if((f & AlignRight) == AlignRight) {
        //qDebug("HAlignRight 0x%X", AlignRight);
        rbHAlignRight->setChecked(TRUE);
    } else {
        //qDebug("HAlignNone");
        rbHAlignNone->setChecked(TRUE);
    }
    if((f & AlignTop) == AlignTop) {
        //qDebug("VAlignTop 0x%X", AlignTop);
        rbVAlignTop->setChecked(TRUE);
    } else if((f & AlignVCenter) == AlignVCenter) {
        //qDebug("VAlignCenter 0x%X", AlignVCenter);
        rbVAlignMiddle->setChecked(TRUE);
    } else if((f & AlignBottom) == AlignBottom) {
        //qDebug("VAlignBottom 0x%X", AlignBottom);
        rbVAlignBottom->setChecked(TRUE);
    } else {
        //qDebug("VAlignNone");
        rbVAlignNone->setChecked(TRUE);
    }
}


void FieldEditor::rbHAlignNone_clicked()
{

}


void FieldEditor::init()
{
    leXPos->setValidator(new QDoubleValidator(0.0,100.0,3,leXPos));
    leYPos->setValidator(new QDoubleValidator(0.0,100.0,3,leYPos));
    
    leWidth->setValidator(new QDoubleValidator(0.01,100.0,3,leWidth));
    leHeight->setValidator(new QDoubleValidator(0.01,100.0,3,leHeight));
    
    _cbBuiltinFormat->insertStringList(getNameList());
}
