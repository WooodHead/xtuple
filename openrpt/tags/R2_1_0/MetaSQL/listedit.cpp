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

#include "listedit.h"

/*
 *  Constructs a ListEdit as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
ListEdit::ListEdit(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(_ok, SIGNAL(clicked()), this, SLOT(accept()));
    connect(_cancel, SIGNAL(clicked()), this, SLOT(reject()));
    connect(_new, SIGNAL(clicked()), this, SLOT(newItem()));
    connect(_up, SIGNAL(clicked()), this, SLOT(moveItemUp()));
    connect(_edit, SIGNAL(clicked()), this, SLOT(editItem()));
    connect(_down, SIGNAL(clicked()), this, SLOT(moveItemDown()));
    connect(_delete, SIGNAL(clicked()), this, SLOT(deleteItem()));
}

/*
 *  Destroys the object and frees any allocated resources
 */
ListEdit::~ListEdit()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void ListEdit::languageChange()
{
    retranslateUi(this);
}

#include <qmessagebox.h>
#include <qlineedit.h>
#include <q3combobox.h>
//Added by qt3to4:
#include <QList>

#include "booledit.h"
#include "intedit.h"
#include "stringedit.h"
#include "doubleedit.h"
#include "newvariant.h"

#include "qlistboxvariant.h"

void ListEdit::newItem()
{
    NewVariant newVar(this);
    newVar._lblName->hide();
    newVar._name->hide();
    if(newVar.exec() == QDialog::Accepted) {
	QString varType = newVar._type->currentText();
	BoolEdit * be = 0;
	IntEdit * ie = 0;
	DoubleEdit * de = 0;
	StringEdit * se = 0;
	ListEdit * le = 0;
	if(varType == tr("String")) {
	    se = new StringEdit(this);
	    se->_lblName->hide();
	    se->_name->hide();
	    se->_active->hide();
	    if(se->exec() == QDialog::Accepted) {
		new QListBoxVariant(_list, QVariant(se->_value->text()));
	    }
	    delete se;
	    se = 0;
	} else if(varType == tr("Int")) {
	    ie = new IntEdit(this);
	    ie->_lblName->hide();
	    ie->_name->hide();
	    ie->_active->hide();
	    if(ie->exec() == QDialog::Accepted) {
		new QListBoxVariant(_list, QVariant(ie->_value->text().toInt()));
	    }
	    delete ie;
	    ie = 0;
	} else if(varType == tr("Double")) {
	    de = new DoubleEdit(this);
	    de->_lblName->hide();
	    de->_name->hide();
	    de->_active->hide();
	    if(de->exec() == QDialog::Accepted) {
		new QListBoxVariant(_list, QVariant(de->_value->text().toDouble()));
	    }
	    delete de;
	    de = 0;
	} else if(varType == tr("Bool")) {
	    be = new BoolEdit(this);
	    be->_lblName->hide();
	    be->_name->hide();
	    be->_active->hide();
	    if(be->exec() == QDialog::Accepted) {
		new QListBoxVariant(_list, QVariant(be->value(), 0));
	    }
	    delete be;
	    be = 0;
	} else if(varType == tr("List")) {
	    le = new ListEdit(this);
	    le->_lblName->hide();
	    le->_name->hide();
	    le->_active->hide();
	    if(le->exec() == QDialog::Accepted) {
		new QListBoxVariant(_list, QVariant(le->list()));
	    }
	    delete le;
	    le = 0;
	} else {
	    QMessageBox::warning(this, tr("Unknown Type"), QString(tr("I do not understand the type %1.")).arg(varType));
	}
    }
}


void ListEdit::editItem()
{
    Q3ListBoxItem * item = _list->selectedItem();
    if(item) {
	if(item->rtti() == QListBoxVariant::RTTI) {
	    QListBoxVariant * lbvar = (QListBoxVariant*)item;
	    QVariant var = lbvar->variant();
	    BoolEdit * be = 0;
	    IntEdit * ie = 0;
	    DoubleEdit * de = 0;
	    StringEdit * se = 0;
	    ListEdit * le = 0;
	    switch(var.type()) {
	    case QVariant::Bool:
		be = new BoolEdit(this);
		be->_lblName->hide();
		be->_name->hide();
		be->_active->hide();
		be->setValue(var.toBool());
		if(be->exec() == QDialog::Accepted) {
		    lbvar->setVariant(QVariant(be->value(), 0));
		}
		delete be;
		be = 0;
		break;
	    case QVariant::Int:
		ie = new IntEdit(this);
		ie->_lblName->hide();
		ie->_name->hide();
		ie->_active->hide();
		ie->_value->setText(QString::number(var.toInt()));
		if(ie->exec() == QDialog::Accepted) {
		    lbvar->setVariant(QVariant(ie->_value->text().toInt()));
		}
		delete ie;
		ie = 0;
		break;
	    case QVariant::Double:
		de = new DoubleEdit(this);
		de->_lblName->hide();
		de->_name->hide();
		de->_active->hide();
		de->_value->setText(QString::number(var.toDouble()));
		if(de->exec() == QDialog::Accepted) {
		    lbvar->setVariant(QVariant(de->_value->text().toDouble()));
		}
		delete de;
		de = 0;
		break;
	    case QVariant::String:
		se = new StringEdit(this);
		se->_lblName->hide();
		se->_name->hide();
		se->_active->hide();
		se->_value->setText(var.toString());
		if(se->exec() == QDialog::Accepted) {
		    lbvar->setVariant(QVariant(se->_value->text()));
		}
		delete se;
		se = 0;
		break;
	    case QVariant::List:
		le = new ListEdit(this);
		le->_lblName->hide();
		le->_name->hide();
		le->_active->hide();
		le->setList(var.toList());
		if(le->exec() == QDialog::Accepted) {
		    lbvar->setVariant(QVariant(le->list()));
		}
		delete le;
		le = 0;
		break;
	    default:
		QMessageBox::warning(this, tr("Warning"), QString(tr("I do not know how to edit QVariant type %1.")).arg(var.typeName()));
	    };
	} else {
	    QMessageBox::warning(this, tr("Warning"), tr("The item you selected is not a QListBoxVariant item. I do not know what to do."));
	}   
    }
}


void ListEdit::deleteItem()
{
    Q3ListBoxItem * item = _list->selectedItem();
    if(item) {
	delete item;  
    }
}


void ListEdit::moveItemUp()
{
    Q3ListBoxItem * item = _list->selectedItem();
    if(item) {
	Q3ListBoxItem * prev = item->prev();
	if(prev) {
	    _list->insertItem(item, prev->prev());
	}
    }
}


void ListEdit::moveItemDown()
{
    Q3ListBoxItem * item = _list->selectedItem();
    if(item) {
	Q3ListBoxItem * next = item->next();
	if(next) {
	    _list->insertItem(item, next);
	}
    }
}


void ListEdit::setList( const QList<QVariant> & l )
{
    _list->clear();
    
    QList<QVariant>::const_iterator it;
    for(it = l.begin(); it != l.end(); ++it) {
	new QListBoxVariant(_list, (*it));
    }
    
}


QList<QVariant> ListEdit::list()
{
    QList<QVariant> varlist;
    Q3ListBoxItem * item = 0;
    QListBoxVariant * var = 0;
    item = _list->item(0);
    while(item) {
	if(item->rtti() == QListBoxVariant::RTTI) {
	    var = (QListBoxVariant*)item;
	    varlist.append(var->variant());
	}
	item = item->next();
    }
    return varlist;
}
