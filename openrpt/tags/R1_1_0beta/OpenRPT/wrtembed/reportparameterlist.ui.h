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

#include <reportparameter.h>

void ReportParameterList::sAdd()
{
    ReportParameter rp(this);
    if(rp.exec() == QDialog::Accepted) {
	QString n = rp.paramName();
	QString d = rp.paramDescription();
	if(!n.isEmpty() && _map) {
	    if(_map) _map->insert(n, d);
            QListBoxItem * i = _lbParameters->findItem(n, Qt::ExactMatch);
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


void ReportParameterList::sEdit(QListBoxItem * item)
{
    if(item) {
       int idx = _lbParameters->index(item);
       if(idx != -1) {
           QString n = _lbParameters->text(idx);
           QString d;
           if(_map) d = (*_map)[n];
           ReportParameter rp(this);
           rp.setParamName(n);
           rp.setParamDescription(d);
           if(rp.exec() == QDialog::Accepted) {
               if(rp.paramName() != n) {
                   if(_map) _map->remove(n);
               }
               n = rp.paramName();
               d = rp.paramDescription();
               if(_map) _map->insert(n, d);
               _lbParameters->changeItem(n, idx);
           }
       } 
    }
}


void ReportParameterList::setList(QMap<QString, QString> * m)
{
    _map = m;
    if(_map) {
        _lbParameters->clear();
        QMap<QString,QString>::iterator it;
        for(it = _map->begin(); it != _map->end(); it++) {
            _lbParameters->insertItem(it.key());
        }
    }
}


void ReportParameterList::init()
{
    _map = 0;
}
