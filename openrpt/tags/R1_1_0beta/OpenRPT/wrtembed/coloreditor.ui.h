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

#include <qcolordialog.h>
#include <qvalidator.h>
void ColorEditor::_btnColor_clicked()
{
    QColor col = QColorDialog::getColor(getColor(), this);
    if(col.isValid()) {
	setColor(col);
    }
}

void ColorEditor::init()
{
    QIntValidator * intv = new QIntValidator(0, 255, this);
    _editRed->setValidator(intv);
    _editRed->setText(tr("0"));
    _editGreen->setValidator(intv);
    _editGreen->setText(tr("0"));
    _editBlue->setValidator(intv);
    _editBlue->setText(tr("0"));
}

void ColorEditor::setColorName( QString name )
{
    _editName->setText(name);
}

void ColorEditor::setColor( const QColor & col )
{
    _editRed->setText(QString::number(col.red()));
    _editGreen->setText(QString::number(col.green()));
    _editBlue->setText(QString::number(col.blue()));
}

QColor ColorEditor::getColor()
{
    return QColor(_editRed->text().toInt(),
	            _editGreen->text().toInt(),
	            _editBlue->text().toInt());
}

QString ColorEditor::getColorName()
{
    return _editName->text();
}
