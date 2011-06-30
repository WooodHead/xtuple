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

#include "querylist.h"

#include <qvariant.h>
#include <qlineedit.h>
#include <querysource.h>
#include <q3textedit.h>
#include "queryeditor.h"

/*
 *  Constructs a QueryList as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
QueryList::QueryList(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(btnClose, SIGNAL(clicked()), this, SLOT(accept()));
    connect(lbQuerys, SIGNAL(doubleClicked(Q3ListBoxItem*)), this, SLOT(editQuery(Q3ListBoxItem*)));
    connect(btnEdit, SIGNAL(clicked()), this, SLOT(btnEdit_clicked()));
    connect(btnDelete, SIGNAL(clicked()), this, SLOT(btnDelete_clicked()));
    connect(btnAdd, SIGNAL(clicked()), this, SLOT(btnAdd_clicked()));
}

/*
 *  Destroys the object and frees any allocated resources
 */
QueryList::~QueryList()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void QueryList::languageChange()
{
    retranslateUi(this);
}

void QueryList::editQuery(Q3ListBoxItem* lbitem)
{
    //qDebug("QueryList::editQuery(%s)", lbitem->text());
    if(lbitem) {
        // run the editor dialog
        QuerySource * qs = qsList->get(lbitem->text());

        if(qs == 0) {
            //qDebug("QueryList::editQuery(): Could not find '%s' in querylist\n",lbitem->text().latin1());
            return;
        }

        QueryEditor qe(this);
        qe.tbName->setText(qs->name());
        qe.tbQuery->setText(qs->query());
        if(qe.exec() == QDialog::Accepted) {
            QString nname = qe.tbName->text();
            QString nquery = qe.tbQuery->text();
            if(qs->name() != nname) {
                // we changed the name of the query.
                // lets check to make sure we didn't change it to
                // something that already exists
                if(qsList->get(nname) != 0) {
                    // display an error to the user.
                    // for now we'll just send out a debug message
                    //qDebug("Cannot change a QuerySource name to a name that already exists.");
                    return;
                }
                //lbitem->setText(nname);
                lbQuerys->changeItem(nname, lbQuerys->index(lbitem));
            }
            qs->setName(nname);
            qs->setQuery(nquery);
        }
    }
}

void QueryList::btnEdit_clicked()
{
    // get the selected item if any then call editQuery(QListBoxItem)
    int idx = lbQuerys->currentItem();
    if(idx != -1) {
        editQuery(lbQuerys->item(idx));
    }
}


void QueryList::btnDelete_clicked()
{
    //qDebug("QueryList::btnDelete_clicked()");
    // get the selected item in the listbox them remove it
    // from the listbox and from the QueryList
    int idx = lbQuerys->currentItem();
    //qDebug("    idx = %d", idx);
    if(idx != -1) {
        Q3ListBoxItem * item = lbQuerys->item(idx);
        //qDebug("    item = %s",item->text().latin1());
        QuerySource * qs = qsList->remove(item->text());
        if(qs != NULL) {
            //qDebug("    qs = %s", qs->_name.latin1());
            delete qs;
        } else {
            //qDebug("    qs = NULL");
        }
        lbQuerys->removeItem(idx);
    }
    //qDebug("    completed");
}

void QueryList::btnAdd_clicked()
{
    // add a new querySource item
    QueryEditor qe(this);
    if(qe.exec() == QDialog::Accepted) {
        QString nname = qe.tbName->text();
        QString nquery = qe.tbQuery->text();
        QuerySource * qs = new QuerySource(nname, nquery);
        if(qsList->add(qs) == TRUE) {
            lbQuerys->insertItem(nname);
        } else {
            // The item was not inserted for some reason
            qDebug("Failed to insert into into QuerySourceList");
            delete qs;
        }
    }
}


void QueryList::init( QuerySourceList * qsl )
{
    qsList = qsl;
    lbQuerys->clear();
    for(unsigned int i = 0; i < qsList->size(); i++) {
        lbQuerys->insertItem(QString(qsList->get(i)->name()));
    }
}
