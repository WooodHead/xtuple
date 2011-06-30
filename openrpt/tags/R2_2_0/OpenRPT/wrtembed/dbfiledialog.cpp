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

#include "dbfiledialog.h"

#include <qvariant.h>
#include <qmessagebox.h>
#include <xsqlquery.h>

/*
 *  Constructs a DBFileDialog as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
DBFileDialog::DBFileDialog(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(_btnOk, SIGNAL(clicked()), this, SLOT(accept()));
    connect(_btnCancel, SIGNAL(clicked()), this, SLOT(reject()));
    connect(_list, SIGNAL(currentChanged(Q3ListViewItem*)), this, SLOT(sSelectedReport()));
    connect(_name, SIGNAL(textChanged(const QString&)), this, SLOT(sNameChanged(const QString&)));
    connect(_list, SIGNAL(doubleClicked(Q3ListViewItem*)), this, SLOT(accept()));
    connect(_grade, SIGNAL(valueChanged(int)), this, SLOT(sGradeChanged(int)));
    init();
}

/*
 *  Destroys the object and frees any allocated resources
 */
DBFileDialog::~DBFileDialog()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void DBFileDialog::languageChange()
{
    retranslateUi(this);
}

void DBFileDialog::init()
{
  _list->addColumn("Name",  -1);
  _list->setColumnAlignment(1, Qt::AlignLeft);
  _list->addColumn("Grade", 50);
  _list->setColumnAlignment(2, Qt::AlignRight);

  XSqlQuery qry("SELECT report_id, report_name, report_grade "
                "  FROM report "
                "ORDER BY report_name, report_grade;");
  while(qry.next())
    new Q3ListViewItem(_list, qry.value("report_name").toString(), qry.value("report_grade").toString(), qry.value("report_id").toString());
}

int DBFileDialog::getId()
{
  Q3ListViewItem * item = _list->selectedItem();
  if(0 == item)
    return -1;

  return item->text(2).toInt();
}

QString DBFileDialog::getName()
{
  return _name->text();
}

int DBFileDialog::getGrade()
{
  return _grade->value();
}

QString DBFileDialog::getSource()
{
  int rid = getId();
  if(rid != -1) {
    XSqlQuery src_qry;
    src_qry.prepare("SELECT report_source "
                    "  FROM report "
                    " WHERE report_id=:report_id ");
    src_qry.bindValue(":report_id", rid);
    src_qry.exec();
    if(src_qry.first())
      return src_qry.value("report_source").toString();
  }
  return QString::null;
}

QString DBFileDialog::getNameById()
{
  int rid = getId();
  if(rid != -1)
  {
	  XSqlQuery src_qry;
    src_qry.prepare("SELECT report_name "
                    "  FROM report "
                    " WHERE (report_id=:report_id);");
    src_qry.bindValue(":report_id", rid);
    src_qry.exec();
	  if(src_qry.first())
	    return src_qry.value("report_name").toString();
  }
  return QString::null;
}

int DBFileDialog::getGradeById()
{
  int rid = getId();
  if(rid != -1)
  {
	  XSqlQuery src_qry;
    src_qry.prepare("SELECT report_grade "
                    "  FROM report "
                    " WHERE (report_id=:report_id);");
    src_qry.bindValue(":report_id", rid);
    src_qry.exec();
	  if(src_qry.first())
	    return src_qry.value("report_grade").toInt();
  }
  return -1;
}

void DBFileDialog::sSelectedReport()
{
  _name->setText(getNameById());
  _name->end(false);
  _grade->setValue(getGradeById());
}

void DBFileDialog::sNameChanged( const QString & )
{
  sNameGradeChanged();
}

void DBFileDialog::sGradeChanged( int )
{
  sNameGradeChanged();
}

void DBFileDialog::sNameGradeChanged()
{
  QString name  = getName();
  QString grade = QString("%1").arg(getGrade());
  Q3ListViewItem * item = _list->firstChild();
  while(item)
  {
    if(item->text(0) == name && item->text(1) == grade)
    {
      _list->setCurrentItem(item);
      return;
    }
    item = item->nextSibling();
  }
  if(_list->currentItem())
    _list->setSelected(_list->currentItem(), FALSE);
}


