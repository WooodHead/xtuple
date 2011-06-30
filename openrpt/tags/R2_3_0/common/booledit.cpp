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

#include "booledit.h"

/*
 *  Constructs a BoolEdit as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
BoolEdit::BoolEdit(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(_ok, SIGNAL(clicked()), this, SLOT(accept()));
    connect(_cancel, SIGNAL(clicked()), this, SLOT(reject()));
}

/*
 *  Destroys the object and frees any allocated resources
 */
BoolEdit::~BoolEdit()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void BoolEdit::languageChange()
{
    retranslateUi(this);
}


void BoolEdit::setValue( bool b )
{
    if(b)
	_value->setCurrentItem(0);
    else
	_value->setCurrentItem(1);
}


bool BoolEdit::value()
{
    if(_value->currentItem() == 0) return TRUE;
    return FALSE;
}
