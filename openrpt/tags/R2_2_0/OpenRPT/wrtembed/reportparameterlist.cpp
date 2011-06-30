/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2007 by OpenMFG, LLC
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

#include "reportparameterlist.h"
#include "reportparameter.h"

#include <qvariant.h>

/*
 *  Constructs a ReportParameterList as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
ReportParameterList::ReportParameterList(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(_btnClose, SIGNAL(clicked()), this, SLOT(accept()));
    connect(_btnAdd, SIGNAL(clicked()), this, SLOT(sAdd()));
    connect(_btnEdit, SIGNAL(clicked()), this, SLOT(sEdit()));
    connect(_btnDelete, SIGNAL(clicked()), this, SLOT(sDelete()));
    connect(_lbParameters, SIGNAL(doubleClicked(Q3ListBoxItem*)), this, SLOT(sEdit(Q3ListBoxItem*)));
    init();
}

/*
 *  Destroys the object and frees any allocated resources
 */
ReportParameterList::~ReportParameterList()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void ReportParameterList::languageChange()
{
    retranslateUi(this);
}

void ReportParameterList::sAdd()
{
    ReportParameter rp(this);
    if(rp.exec() == QDialog::Accepted) {
	QString n = rp.paramName();
	ORParameter d = rp.paramData();
	if(!n.isEmpty() && _map) {
	    if(_map) _map->insert(n, d);
            Q3ListBoxItem * i = _lbParameters->findItem(n, Q3ListBox::ExactMatch);
            if(!i) {
                _lbParameters->insertItem(n);
            }
	}
    }
}


void ReportParameterList::sEdit()
{
    sEdit(_lbParameters->selectedItem());
}


void ReportParameterList::sDelete()
{
    if(_lbParameters->currentItem() != -1) {
        if(_map) _map->remove(_lbParameters->currentText());
        _lbParameters->removeItem(_lbParameters->currentItem());
    }
}


void ReportParameterList::sEdit(Q3ListBoxItem * item)
{
    if(item) {
       int idx = _lbParameters->index(item);
       if(idx != -1) {
           QString n = _lbParameters->text(idx);
           ORParameter d;
           if(_map) d = (*_map)[n];
           ReportParameter rp(this);
           rp.setParamName(n);
           rp.setParamData(d);
           if(rp.exec() == QDialog::Accepted) {
               if(rp.paramName() != n) {
                   if(_map) _map->remove(n);
               }
               n = rp.paramName();
               d = rp.paramData();
               if(_map) _map->insert(n, d);
               _lbParameters->changeItem(n, idx);
           }
       } 
    }
}


void ReportParameterList::setList(QMap<QString, ORParameter> * m)
{
    _map = m;
    if(_map) {
        _lbParameters->clear();
        QMap<QString,ORParameter>::iterator it;
        for(it = _map->begin(); it != _map->end(); it++) {
            _lbParameters->insertItem(it.key());
        }
    }
}


void ReportParameterList::init()
{
    _map = 0;
}
