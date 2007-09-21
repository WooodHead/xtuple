/*
 * Common Public Attribution License Version 1.0. 
 * 
 * The contents of this file are subject to the Common Public Attribution 
 * License Version 1.0 (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License 
 * at http://www.xTuple.com/CPAL.  The License is based on the Mozilla 
 * Public License Version 1.1 but Sections 14 and 15 have been added to 
 * cover use of software over a computer network and provide for limited 
 * attribution for the Original Developer. In addition, Exhibit A has 
 * been modified to be consistent with Exhibit B.
 * 
 * Software distributed under the License is distributed on an "AS IS" 
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See 
 * the License for the specific language governing rights and limitations 
 * under the License. 
 * 
 * The Original Code is PostBooks Accounting, ERP, and CRM Suite. 
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2007 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
 * 
 * Contributor(s): ______________________.
 * 
 * Alternatively, the contents of this file may be used under the terms 
 * of the xTuple End-User License Agreeement (the xTuple License), in which 
 * case the provisions of the xTuple License are applicable instead of 
 * those above.  If you wish to allow use of your version of this file only 
 * under the terms of the xTuple License and not to allow others to use 
 * your version of this file under the CPAL, indicate your decision by 
 * deleting the provisions above and replace them with the notice and other 
 * provisions required by the xTuple License. If you do not delete the 
 * provisions above, a recipient may use your version of this file under 
 * either the CPAL or the xTuple License.
 * 
 * EXHIBIT B.  Attribution Information
 * 
 * Attribution Copyright Notice: 
 * Copyright (c) 1999-2007 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by PostBooks, an open source solution from xTuple
 * 
 * Attribution URL: www.xtuple.org 
 * (to be included in the "Community" menu of the application if possible)
 * 
 * Graphic Image as provided in the Covered Code, if any. 
 * (online at www.xtuple.com/poweredby)
 * 
 * Display of Attribution Information is required in Larger Works which 
 * are defined in the CPAL as a work which combines Covered Code or 
 * portions thereof with code not governed by the terms of the CPAL.
 */

#include <qsqldatabase.h>
#include <qsqlrecord.h>
#include <qvaluelist.h>
#include <qinputdialog.h>
#include <qmessagebox.h>
#include <qspinbox.h>
#include <qfiledialog.h>

void CSVMapEdit::sChangeTable()
{
  if(!continueOperation())
    return;
  
  QSqlDatabase * db = QSqlDatabase::database();
  if(db)
  {
    QStringList tables = db->tables();
    tables.sort();
    bool ok = FALSE;
    QString table = QInputDialog::getItem(tr("Select Table"), tr("Table:"), tables, 0, FALSE, &ok, this);
    if(ok)
    {
      _table->setText(table);
      _fields->setNumRows(0);
     
      QSqlRecordInfo fields = db->recordInfo(table);
      _fields->setNumRows(fields.count());
      
      QSqlRecordInfo::iterator field;
      int row;
      for(row = 0, field = fields.begin();
        field != fields.end(); ++field, ++row)
      {
        _fields->setItem(row, 0, new QCheckTableItem(_fields, QString("")));
        _fields->setText(row, 1, (*field).name());
        _fields->setText(row, 2, QVariant::typeToName((*field).type()));
        _fields->setText(row, 3, ((*field).isRequired()>0?tr("Yes"):(*field).isRequired()==0?tr("No"):tr("Unknown")));
        QSpinBox * spinner = new QSpinBox(0, 999, 1, _fields);
        spinner->setSpecialValueText(tr("default"));
        spinner->setPrefix(tr("Column "));
        connect(spinner, SIGNAL(valueChanged(int)), this, SLOT(sUpdated()));
        _fields->setCellWidget(row, 4, spinner);
      }
      _modified = FALSE;
    }
  }
  else
    QMessageBox::critical(this, tr("No Database"), tr("Could not get the database connection."));
}


void CSVMapEdit::sNew()
{
  if(continueOperation())
  {
    _table->setText("");
    _fields->setNumRows(0);
    _modified = FALSE;
  }
}


void CSVMapEdit::sOpen()
{
  if(!continueOperation())
    return;

  QString filename = QFileDialog::getOpenFileName(_filename, QString::null, this);
  if(filename.isNull())
    return;

  QMessageBox::information(this, tr("Not yet implimented"), tr("This feature has not yet been implimented."));
}

void CSVMapEdit::sSave()
{
  saveMap();
}

void CSVMapEdit::reject()
{
  if(!continueOperation())
    return;
  QDialog::reject();
}

void CSVMapEdit::init()
{
  _fields->setColumnReadOnly(1, TRUE);
  _fields->setColumnReadOnly(2, TRUE);
  _fields->setColumnReadOnly(3, TRUE);
  _fields->adjustColumn(0);
  _fields->adjustColumn(3);
  
  _modified = FALSE;
  _filename = QString::null;
}

bool CSVMapEdit::continueOperation()
{
  if(_modified)
  {
    int result = QMessageBox::question(this, tr("Save changes"), tr("You have unsaved changes which you are about to lose\nWould you like to save these changes before continuing?"), QMessageBox::Yes | QMessageBox::Default, QMessageBox::No, QMessageBox::Cancel | QMessageBox::Escape);
    if(QMessageBox::Cancel == result)
      return FALSE;
    if(QMessageBox::Yes == result)
    {
      if(!saveMap())
        return FALSE;
    }
  }
  return TRUE;
}


bool CSVMapEdit::saveMap()
{
  QMessageBox::information(this, tr("Not yet implimented"), tr("This feature has not yet been implimented."));
  return TRUE;
}


void CSVMapEdit::sUpdated()
{
  _modified = TRUE;
}
