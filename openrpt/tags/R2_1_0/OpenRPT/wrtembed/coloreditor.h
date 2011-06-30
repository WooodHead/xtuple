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

#ifndef COLOREDITOR_H
#define COLOREDITOR_H

#include <qvariant.h>


#include <QtGui/QDialog>

#include "ui_coloreditor.h"

class ColorEditor : public QDialog, public Ui::ColorEditor
{
    Q_OBJECT

public:
    ColorEditor(QWidget* parent = 0, const char* name = 0, bool modal = false, Qt::WFlags fl = 0);
    ~ColorEditor();

public slots:
    virtual void _btnColor_clicked();
    virtual void init();
    virtual void setColorName( QString name );
    virtual void setColor( const QColor & col );
    virtual QColor getColor();
    virtual QString getColorName();

protected slots:
    virtual void languageChange();

};

#endif // COLOREDITOR_H
