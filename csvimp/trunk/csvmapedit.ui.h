/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include <QSqlDatabase>
#include <QSqlRecord>
#include <QValueList>
#include <QInputDialog>
#include <QMessageBox>
#include <QSpinBox>
#include <QFileDialog>

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
