/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "salesRep.h"

#include <QMessageBox>
#include <QSqlError>
#include <QValidator>
#include <QVariant>

#define DEBUG false

salesRep::salesRep(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : XDialog(parent, name, modal, fl)
{
  setupUi(this);

  connect(_save, SIGNAL(clicked()), this, SLOT(sSave()));
  connect(_number, SIGNAL(lostFocus()), this, SLOT(sCheck()));

  _commPrcnt->setValidator(omfgThis->percentVal());
}

salesRep::~salesRep()
{
  // no need to delete child widgets, Qt does it all for us
}

void salesRep::languageChange()
{
  retranslateUi(this);
}

enum SetResponse salesRep::set(const ParameterList &pParams)
{
  QVariant param;
  bool     valid;

  param = pParams.value("emp_id", &valid);
  if (valid)
  {
    _employee->setId(param.toInt());
    _employee->setEnabled(false);
    _number->setText(_employee->number());
    _number->setEnabled(false);
    _active->setFocus();
    if (DEBUG)
      qDebug("salesRep::set() got emp_id %d with number %s",
             param.toInt(), qPrintable(_employee->number()));
  }

  param = pParams.value("salesrep_id", &valid);
  if (valid)
  {
    _salesrepid = param.toInt();
    populate();
  }

  param = pParams.value("mode", &valid);
  if (valid)
  {
    if (param.toString() == "new")
    {
      _mode = cNew;
      _number->setFocus();
    }
    else if (param.toString() == "edit")
    {
      _mode = cEdit;
      _name->setFocus();
    }
    else if (param.toString() == "view")
    {
      _mode = cView;
      _number->setEnabled(FALSE);
      _name->setEnabled(FALSE);
      _active->setEnabled(FALSE);
      _commPrcnt->setEnabled(FALSE);
      _employee->setEnabled(FALSE);
      _close->setText(tr("&Close"));
      _save->hide();
      _close->setFocus();
    }
  }

  return NoError;
}

void salesRep::sCheck()
{
  _number->setText(_number->text().trimmed());
  if ((_mode == cNew) && (_number->text().length()))
  {
    q.prepare( "SELECT salesrep_id "
               "FROM salesrep "
               "WHERE (UPPER(salesrep_number)=UPPER(:salesrep_number));" );
    q.bindValue(":salesrep_number", _number->text());
    q.exec();
    if (q.first())
    {
      _salesrepid = q.value("salesrep_id").toInt();
      _mode = cEdit;
      populate();

      _number->setEnabled(FALSE);
    }
    else if (q.lastError().type() != QSqlError::NoError)
    {
      systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }
  }
}

void salesRep::sSave()
{
  if (_number->text().trimmed().length() == 0)
  {
    QMessageBox::critical( this, tr("Cannot Save Sales Rep."),
                           tr("You must enter a Number for this Sales Rep.") );
    _number->setFocus();
    return;
  }

  if (_commPrcnt->text().trimmed().length() == 0)
  {
    QMessageBox::critical( this, tr("Cannot Save Sales Rep."),
                           tr("You must enter a Commission Rate for this Sales Rep.") );
    _commPrcnt->setFocus();
    return;
  }

  if (_mode == cNew)
  {
    q.exec("SELECT NEXTVAL('salesrep_salesrep_id_seq') AS salesrep_id;");
    if (q.first())
      _salesrepid = q.value("salesrep_id").toInt();
    else if (q.lastError().type() != QSqlError::NoError)
    {
      systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }
 
    q.prepare( "INSERT INTO salesrep "
               "(salesrep_id, salesrep_number, salesrep_active, salesrep_name, salesrep_commission) "
               "VALUES "
               "(:salesrep_id, :salesrep_number, :salesrep_active, :salesrep_name, :salesrep_commission);" );
  }
  else if (_mode == cEdit)
    q.prepare( "UPDATE salesrep "
               "SET salesrep_active=:salesrep_active, salesrep_number=:salesrep_number,"
               "    salesrep_name=:salesrep_name, salesrep_commission=:salesrep_commission "
               "WHERE (salesrep_id=:salesrep_id);" );

  q.bindValue(":salesrep_id", _salesrepid);
  q.bindValue(":salesrep_number", _number->text());
  q.bindValue(":salesrep_name", _name->text());
  q.bindValue(":salesrep_commission", (_commPrcnt->toDouble() / 100));
  q.bindValue(":salesrep_active", QVariant(_active->isChecked()));
  q.exec();
  if (q.lastError().type() != QSqlError::NoError)
  {
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }

  done(_salesrepid);
}

void salesRep::populate()
{
  q.prepare( "SELECT salesrep_number, salesrep_active, salesrep_name,"
             "       salesrep_commission "
             "FROM salesrep "
             "WHERE (salesrep_id=:salesrep_id);" );
  q.bindValue(":salesrep_id", _salesrepid);
  q.exec();
  if (q.first())
  {
    _number->setText(q.value("salesrep_number").toString());
    _active->setChecked(q.value("salesrep_active").toBool());
    _name->setText(q.value("salesrep_name").toString());
    _commPrcnt->setDouble(q.value("salesrep_commission").toDouble() * 100);
  }
  else if (q.lastError().type() != QSqlError::NoError)
  {
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }
}
