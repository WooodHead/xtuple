/*
 * Copyright (c) 2002-2007 by OpenMFG, LLC
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

#ifndef EDITPREFERENCES_H
#define EDITPREFERENCES_H

#include <QtGui/QDialog>

#include "ui_editpreferences.h"

class EditPreferences : public QDialog, public Ui::EditPreferences
{
    Q_OBJECT

public:
    EditPreferences(QWidget* parent = 0, const char* name = 0, bool modal = false, Qt::WFlags fl = 0);
    ~EditPreferences();

public slots:
    virtual void setGridSize( double x, double y );
    virtual double gridSizeX();
    virtual double gridSizeY();
    virtual bool showGrid();
    virtual bool snapGrid();
    virtual void setShowGrid( bool show );
    virtual void setSnapGrid( bool snap );
    virtual void setDefaultFont( QFont fnt );
    virtual QFont defaultFont();

protected slots:
    virtual void languageChange();

    virtual void init();
    virtual void changeDefaultFont();


};

#endif // EDITPREFERENCES_H
