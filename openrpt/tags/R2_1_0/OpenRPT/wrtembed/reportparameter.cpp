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

#include "reportparameter.h"

#include <qvariant.h>
#include "reportparameterlistitem.h"

/*
 *  Constructs a ReportParameter as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
ReportParameter::ReportParameter(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);

    QButtonGroup * buttonGroup = new QButtonGroup(this);
    buttonGroup->addButton(_staticList, 0);
    buttonGroup->addButton(_dynamicList, 1);

    // signals and slots connections
    connect(_btnOk, SIGNAL(clicked()), this, SLOT(accept()));
    connect(_btnCancel, SIGNAL(clicked()), this, SLOT(reject()));
    connect(buttonGroup, SIGNAL(buttonClicked(int)), _stack, SLOT(setCurrentIndex(int)));
    connect(_listValues, SIGNAL(selectionChanged()), this, SLOT(sSelectionChanged()));
    connect(_add, SIGNAL(clicked()), this, SLOT(sAdd()));
    connect(_edit, SIGNAL(clicked()), this, SLOT(sEdit()));
    connect(_remove, SIGNAL(clicked()), this, SLOT(sRemove()));
}

/*
 *  Destroys the object and frees any allocated resources
 */
ReportParameter::~ReportParameter()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void ReportParameter::languageChange()
{
    retranslateUi(this);
}

static const char* types[] = { "string", "integer", "double", "bool", NULL };

QString ReportParameter::paramName()
{
    return _leName->text();
}


ORParameter ReportParameter::paramData()
{
  ORParameter param;

  param.name = _leName->text();
  param.type = QString(types[_cbType->currentItem()]);
  param.defaultValue = _leDefault->text();
  param.description = _tbDescrip->text();
  param.active = _active->isChecked();
  if(_staticList->isChecked())
  {
    param.listtype = "static";
    Q3ListViewItem * item = _listValues->firstChild();
    while(0 != item)
    {
      param.values.append(qMakePair(item->text(0), item->text(1)));
      item = item->nextSibling();
    }
  }
  else // if(_dynamicList->isChecked())
  {
    param.listtype = "dynamic";
    param.query = _dynamicQuery->text();
  }

  return param;
}


void ReportParameter::setParamName( const QString & text)
{
    _leName->setText(text);
}


void ReportParameter::setParamData( const ORParameter & param)
{
  for(int i = 0; types[i] != NULL; i++)
  {
    if(types[i] == param.type)
    {
      _cbType->setCurrentItem(i);
      break;
    }
  }
  _leDefault->setText(param.defaultValue);
  _tbDescrip->setText(param.description);
  _active->setChecked(param.active);
  if(param.listtype == "static")
  {
    _staticList->setChecked(true);
    _stack->setCurrentIndex(0);
    for(QList<QPair<QString,QString> >::const_iterator it = param.values.begin();
        it != param.values.end(); it++ )
      new Q3ListViewItem(_listValues, (*it).first, (*it).second);
  }
  else //if(param.listtype == "dynamic")
  {
    _dynamicList->setChecked(TRUE);
    _stack->setCurrentIndex(1);
    _dynamicQuery->setText(param.query);
  }
}


void ReportParameter::sSelectionChanged()
{
  bool yes = (_listValues->selectedItem() != 0);
  _edit->setEnabled(yes);
  _remove->setEnabled(yes);
}


void ReportParameter::sAdd()
{
  ReportParameterListItem newdlg(this, "", TRUE);
  if(newdlg.exec() == QDialog::Accepted)
    new Q3ListViewItem(_listValues, newdlg._value->text(), newdlg._label->text());
}


void ReportParameter::sEdit()
{
  Q3ListViewItem * item = _listValues->selectedItem();
  if(0 != item)
  {
    ReportParameterListItem newdlg(this, "", TRUE);
    newdlg._value->setText(item->text(0));
    newdlg._label->setText(item->text(1));
    if(newdlg.exec() == QDialog::Accepted)
    {
      item->setText(0, newdlg._value->text());
      item->setText(1, newdlg._label->text());
    }
  }
}


void ReportParameter::sRemove()
{
  Q3ListViewItem * item = _listValues->selectedItem();
  if(0 != item)
    delete item;
}

