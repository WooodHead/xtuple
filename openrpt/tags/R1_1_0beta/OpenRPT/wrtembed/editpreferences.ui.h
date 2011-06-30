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

#include <qvalidator.h>
#include <qfontdialog.h>

void EditPreferences::init()
{
    // install validator on _leGridSizeX and _leGridSizeY
    QDoubleValidator * dblval = new QDoubleValidator(0.01, 1000, 2, this);
    _leGridSizeX->setValidator(dblval);
    _leGridSizeY->setValidator(dblval);
}


void EditPreferences::changeDefaultFont()
{
    bool valid = false;
    QFont fnt = QFontDialog::getFont(&valid, _leDefaultFont->font(), this);
    if(valid) {
	setDefaultFont(fnt);
    }
}


void EditPreferences::setGridSize( double x, double y )
{
    if(x < 0.01) x = 0.01;
    if(x > 1000) x = 1000;
    if(y < 0.01) y = 0.01;
    if(y > 1000) y = 1000;
    QString sx = QString::number(x, 'g', 2);
    QString sy = QString::number(y, 'g', 2);
    _leGridSizeX->setText(sx);
    _leGridSizeY->setText(sy);
    if(sx == sy) {
	_cbGridSymetrical->setChecked(true);
    }
}


double EditPreferences::gridSizeX()
{
    bool valid = false;
    double dbl = _leGridSizeX->text().toDouble(&valid);
    if(!valid) {
	dbl = 0.01;
    }
    return dbl;
}


double EditPreferences::gridSizeY()
{
    if(_cbGridSymetrical->isChecked()) {
	return gridSizeX();
    }
    bool valid = false;
    double dbl = _leGridSizeY->text().toDouble(&valid);
    if(!valid) {
	dbl = 0.01;
    }
    return dbl;
}


bool EditPreferences::showGrid()
{
    return _cbShowGrid->isChecked();
}


bool EditPreferences::snapGrid()
{
    return _cbSnapGrid->isChecked();
}


void EditPreferences::setShowGrid( bool show )
{
    _cbShowGrid->setChecked(show);
}


void EditPreferences::setSnapGrid( bool snap )
{
    _cbSnapGrid->setChecked(snap);
}


void EditPreferences::setDefaultFont( QFont fnt )
{
    _leDefaultFont->setText(fnt.family());
    _leDefaultFont->setFont(fnt);
}


QFont EditPreferences::defaultFont()
{
    return _leDefaultFont->font();
}
