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

#include "parameteredit.h"

/*
 *  Constructs a ParameterEdit as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
ParameterEdit::ParameterEdit(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(_cancel, SIGNAL(clicked()), this, SLOT(reject()));
    connect(_ok, SIGNAL(clicked()), this, SLOT(accept()));
    connect(_new, SIGNAL(clicked()), this, SLOT(newItem()));
    connect(_edit, SIGNAL(clicked()), this, SLOT(editItem()));
    connect(_delete, SIGNAL(clicked()), this, SLOT(deleteItem()));

    _table->horizontalHeader()->setLabel( 0, tr("Active") );
    _table->horizontalHeader()->setLabel( 1, tr("Name") );
    _table->horizontalHeader()->setLabel( 2, tr("Type") );
    _table->horizontalHeader()->setLabel( 3, tr("Value") );
    
    _table->setNumRows(0);
}

/*
 *  Destroys the object and frees any allocated resources
 */
ParameterEdit::~ParameterEdit()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void ParameterEdit::languageChange()
{
    retranslateUi(this);
}

#include <qmessagebox.h>
#include <qlineedit.h>
#include <q3combobox.h>
#include <qcheckbox.h>
#include <qlabel.h>

#include "newvariant.h"
#include "booledit.h"
#include "intedit.h"
#include "doubleedit.h"
#include "stringedit.h"
#include "listedit.h"

void ParameterEdit::newItem()
{
    NewVariant newVar(this);
    if(newVar.exec() == QDialog::Accepted) {
	QString varType = newVar._type->currentText();
	QString name = newVar._name->text();
	bool active = false;
	if(_params.contains(name)) {
	    QMessageBox::warning(this, tr("Name already exists"), tr("The name for the parameter you specified already exists in the list."));
	}
	BoolEdit * be = 0;
	IntEdit * ie = 0;
	DoubleEdit * de = 0;
	StringEdit * se = 0;
	ListEdit * le = 0;
	if(varType == tr("String")) {
	    se = new StringEdit(this);
	    se->_name->setText(name);
	    if(se->exec() == QDialog::Accepted) {
		_params[name] = QVariant(se->_value->text());
		active = se->_active->isChecked();
	    }
	    delete se;
	    se = 0;
	} else if(varType == tr("Int")) {
	    ie = new IntEdit(this);
	    ie->_name->setText(name);
	    if(ie->exec() == QDialog::Accepted) {
		_params[name] = QVariant(ie->_value->text().toInt());
		active = ie->_active->isChecked();
	    }
	    delete ie;
	    ie = 0;
	} else if(varType == tr("Double")) {
	    de = new DoubleEdit(this);
	    de->_name->setText(name);
	    if(de->exec() == QDialog::Accepted) {
		_params[name] = QVariant(de->_value->text().toDouble());
		active = de->_active->isChecked();
	    }
	    delete de;
	    de = 0;
	} else if(varType == tr("Bool")) {
	    be = new BoolEdit(this);
	    be->_name->setText(name);
	    if(be->exec() == QDialog::Accepted) {
		_params[name] = QVariant(be->value(), 0);
		active = be->_active->isChecked();
	    }
	    delete be;
	    be = 0;
	} else if(varType == tr("List")) {
	    le = new ListEdit(this);
	    le->_name->setText(name);
	    if(le->exec() == QDialog::Accepted) {
		_params[name] = QVariant(le->list());
		active = le->_active->isChecked();
	    }
	    delete le;
	    le = 0;
	} else {
	    QMessageBox::warning(this, tr("Unknown Type"), QString(tr("I do not understand the type %1.")).arg(varType));
	    return;
	}
	int r = _table->numRows();
	_table->setNumRows(r+1);
	Q3CheckTableItem * ctItem = new Q3CheckTableItem(_table, QString::null);
	ctItem->setChecked(active);
	_table->setItem(r, 0, ctItem);
	_table->setText(r, 1, name);
	QVariant var = _params[name];
	_table->setText(r, 2, var.typeName());
	_table->setText(r, 3, var.toString());
    }
}


void ParameterEdit::editItem()
{
    if(_table->currentSelection() != -1) {
	bool do_update = false;
	int r = _table->currentRow();
	Q3CheckTableItem * ctItem = (Q3CheckTableItem*)_table->item(r, 0);
        if(ctItem == 0)
          return;
	bool active = ctItem->isChecked();
	QString name = _table->text(r, 1);
	QVariant var = _params[name];
	BoolEdit * be = 0;
	IntEdit * ie = 0;
	DoubleEdit * de = 0;
	StringEdit * se = 0;
	ListEdit * le = 0;
	switch(var.type()) {
	case QVariant::Bool:
	    be = new BoolEdit(this);
	    be->_name->setText(name);
	    be->_active->setChecked(active);
	    be->setValue(var.toBool());
	    if(be->exec() == QDialog::Accepted) {
		var = QVariant(be->value(), 0);
		active = be->_active->isChecked();
		do_update = TRUE;
	    }
	    delete be;
	    be = 0;
	    break;
	case QVariant::Int:
	    ie = new IntEdit(this);
	    ie->_name->setText(name);
	    ie->_active->setChecked(active);
	    ie->_value->setText(QString::number(var.toInt()));
	    if(ie->exec() == QDialog::Accepted) {
		var = QVariant(ie->_value->text().toInt());
		active = ie->_active->isChecked();
		do_update = TRUE;
	    }
	    delete ie;
	    ie = 0;
	    break;
	case QVariant::Double:
	    de = new DoubleEdit(this);
	    de->_name->setText(name);
	    de->_active->setChecked(active);
	    de->_value->setText(QString::number(var.toDouble()));
	    if(de->exec() == QDialog::Accepted) {
		var = QVariant(de->_value->text().toDouble());
		active = de->_active->isChecked();
		do_update = TRUE;
	    }
	    delete de;
	    de = 0;
	    break;
	case QVariant::String:
	    se = new StringEdit(this);
	    se->_name->setText(name);
	    se->_active->setChecked(active);
	    se->_value->setText(var.toString());
	    if(se->exec() == QDialog::Accepted) {
		var = QVariant(se->_value->text());
		active = se->_active->isChecked();
		do_update = TRUE;
	    }
	    delete se;
	    se = 0;
	    break;
	case QVariant::List:
	    le = new ListEdit(this);
	    le->_name->setText(name);
	    le->_active->setChecked(active);
	    le->setList(var.toList());
	    if(le->exec() == QDialog::Accepted) {
		var = QVariant(le->list());
		active = le->_active->isChecked();
		do_update = TRUE;
	    }
	    delete le;
	    le = 0;
	    break;
	default:
	    QMessageBox::warning(this, tr("Warning"), QString(tr("I do not know how to edit QVariant type %1.")).arg(var.typeName()));
	};
		
	if(do_update) {
	    _params[name] = var;
	    ctItem->setChecked(active);
	    _table->setText(r, 1, name);
	    _table->setText(r, 2, var.typeName());
	    _table->setText(r, 3, var.toString());
	}
    }
}


void ParameterEdit::deleteItem()
{
    if(_table->currentSelection() != -1) {
	QString name = _table->text( _table->currentRow(), 1);
	_params.erase(name);
	_table->removeRow(_table->currentRow());
    }
}


ParameterList ParameterEdit::getParameterList()
{
    ParameterList plist;
 
    QString name;
    QVariant value;
    Q3CheckTableItem * ctItem = 0;
    for(int r = 0; r < _table->numRows(); r++) {
	ctItem = (Q3CheckTableItem*)_table->item(r, 0);
	if(ctItem->isChecked()) {
	    name = _table->text(r, 1);
	    value = _params[name];
	    plist.append(name, value);
	}
    }
    
    return plist;
}
