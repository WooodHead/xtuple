/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "customerFormAssignment.h"

#include <QMessageBox>
#include <QSqlError>
#include <QVariant>

customerFormAssignment::customerFormAssignment(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : XDialog(parent, name, modal, fl)
{
  setupUi(this);

  connect(_save, SIGNAL(clicked()), this, SLOT(sSave()));
}

customerFormAssignment::~customerFormAssignment()
{
  // no need to delete child widgets, Qt does it all for us
}

void customerFormAssignment::languageChange()
{
  retranslateUi(this);
}

enum SetResponse customerFormAssignment::set(const ParameterList &pParams)
{
  QVariant param;
  bool     valid;

  param = pParams.value("custform_id", &valid);
  if (valid)
  {
    _custformid = param.toInt();
    populate();
  }

  param = pParams.value("mode", &valid);
  if (valid)
  {
    if (param.toString() == "new")
    {
      _mode = cNew;
      _customerType->setFocus();
    }
    else if (param.toString() == "edit")
    {
      _mode = cEdit;
      _save->setFocus();
    }
    else if (param.toString() == "view")
    {
      _mode = cView;

      _customerTypeGroup->setEnabled(FALSE);
      _invoiceForm->setEnabled(FALSE);
      _creditMemoForm->setEnabled(FALSE);
      _statementForm->setEnabled(FALSE);
      _quoteForm->setEnabled(FALSE);
      _packingListForm->setEnabled(FALSE);
      _soPickListForm->setEnabled(FALSE);
      _close->setText(tr("&Close"));
      _save->hide();

      _close->setFocus();
    }
  }

  return NoError;
}

void customerFormAssignment::sSave()
{
  int custtypeid   = -1;
  QString custtype = ""; 

  if (_selectedCustomerType->isChecked())
    custtypeid = _customerTypes->id();
  else if (_customerTypePattern->isChecked())
    custtype = _customerType->text().trimmed();

  q.prepare("SELECT custform_id"
            "  FROM custform"
            " WHERE((custform_id != :custform_id)"
            "   AND (custform_custtype = :custform_custtype)"
            "   AND (custform_custtype_id=:custform_custtype_id))");
  q.bindValue(":custform_id", _custformid);
  q.bindValue(":custform_custtype", custtype);
  q.bindValue(":custform_custtype_id", custtypeid);
  q.exec();
  if(q.first())
  {
    QMessageBox::critical(this, tr("Duplicate Entry"),
      tr("The Customer Type specified is already in the database.") );
    return;
  }

  if (_mode == cNew)
  {
    q.exec("SELECT NEXTVAL('custform_custform_id_seq') AS _custformid");
    if (q.first())
      _custformid = q.value("_custformid").toInt();
    else if (q.lastError().type() != QSqlError::NoError)
    {
      systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }

    q.prepare( "INSERT INTO custform "
               "( custform_id, custform_custtype, custform_custtype_id,"
               "  custform_invoice_report_id, custform_creditmemo_report_id,"
               "  custform_statement_report_id, custform_quote_report_id,"
               "   custform_packinglist_report_id, custform_sopicklist_report_id ) "
               "VALUES "
               "( :custform_id, :custform_custtype, :custform_custtype_id,"
               "  :custform_invoice_report_id, :custform_creditmemo_report_id,"
               "  :custform_statement_report_id, :custform_quote_report_id,"
               "  :custform_packinglist_report_id, :custform_sopicklist_report_id );" );
  }
  else if (_mode == cEdit)
    q.prepare( "UPDATE custform "
               "SET custform_custtype=:custform_custtype, custform_custtype_id=:custform_custtype_id,"
               "    custform_invoice_report_id=:custform_invoice_report_id,"
               "    custform_creditmemo_report_id=:custform_creditmemo_report_id,"
               "    custform_statement_report_id=:custform_statement_report_id,"
               "    custform_quote_report_id=:custform_quote_report_id,"
               "    custform_packinglist_report_id=:custform_packinglist_report_id,"
	       "    custform_sopicklist_report_id=:custform_sopicklist_report_id "
               "WHERE (custform_id=:custform_id);" );

  q.bindValue(":custform_id", _custformid);
  q.bindValue(":custform_custtype", custtype);
  q.bindValue(":custform_custtype_id", custtypeid);
  q.bindValue(":custform_invoice_report_id", _invoiceForm->id());
  q.bindValue(":custform_creditmemo_report_id", _creditMemoForm->id());
  q.bindValue(":custform_statement_report_id", _statementForm->id());
  q.bindValue(":custform_quote_report_id", _quoteForm->id());
  q.bindValue(":custform_packinglist_report_id", _packingListForm->id());
  q.bindValue(":custform_sopicklist_report_id",	_soPickListForm->id());
  q.exec();
  if (q.lastError().type() != QSqlError::NoError)
  {
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }

  done(_custformid);
}

void customerFormAssignment::populate()
{
  q.prepare( "SELECT custform_custtype_id, custform_custtype,"
             "       custform_invoice_report_id, custform_creditmemo_report_id,"
             "       custform_statement_report_id, custform_quote_report_id,"
             "       custform_packinglist_report_id, custform_sopicklist_report_id "
             "FROM custform "
             "WHERE (custform_id=:custform_id);" );
  q.bindValue(":custform_id", _custformid);
  q.exec();
  if (q.first())
  {
    if (q.value("custform_custtype_id").toInt() == -1)
    {
      _customerTypePattern->setChecked(TRUE);
      _customerType->setText(q.value("custform_custtype").toString());
    }
    else
    {
      _selectedCustomerType->setChecked(TRUE);
      _customerTypes->setId(q.value("custform_custtype_id").toInt());
    }

    _invoiceForm->setId(q.value("custform_invoice_report_id").toInt());
    _creditMemoForm->setId(q.value("custform_creditmemo_report_id").toInt());
    _statementForm->setId(q.value("custform_statement_report_id").toInt());
    _quoteForm->setId(q.value("custform_quote_report_id").toInt());
    _packingListForm->setId(q.value("custform_packinglist_report_id").toInt());
    _soPickListForm->setId(q.value("custform_sopicklist_report_id").toInt());
  }
  else if (q.lastError().type() != QSqlError::NoError)
  {
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }
}
