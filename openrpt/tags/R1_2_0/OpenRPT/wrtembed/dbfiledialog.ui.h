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

void DBFileDialog::init()
{
  _list->addColumn("Name",  -1);
  _list->setColumnAlignment(1, AlignLeft);
  _list->addColumn("Grade", 50);
  _list->setColumnAlignment(2, AlignRight);

  XSqlQuery qry("SELECT report_id, report_name, report_grade "
                "  FROM report "
                "ORDER BY report_name, report_grade;");
  while(qry.next())
    new QListViewItem(_list, qry.value("report_name").toString(), qry.value("report_grade").toString(), qry.value("report_id").toString());
}

int DBFileDialog::getId()
{
  QListViewItem * item = _list->selectedItem();
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
  QListViewItem * item = _list->firstChild();
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


