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

#include "arWorkBench.h"

#include <QVariant>
#include <QMessageBox>
#include <QWorkspace>
#include <QStatusBar>
#include <QFileInfo>
#include <QApplication>
#include <QSqlError>

#include <stdlib.h>

#include "arOpenItem.h"
#include "applyARCreditMemo.h"
#include "cashReceipt.h"
#include "creditMemo.h"
#include "dspInvoiceInformation.h"
#include "storedProcErrorLookup.h"

arWorkBench::arWorkBench(QWidget* parent, const char* name, Qt::WFlags fl)
    : QMainWindow(parent, name, fl)
{
  setupUi(this);

  (void)statusBar();

  connect(_viewAropen, SIGNAL(clicked()), this, SLOT(sViewAropen()));
  connect(_editAropen, SIGNAL(clicked()), this, SLOT(sEditAropen()));
  connect(_applyAropenCM, SIGNAL(clicked()), this, SLOT(sApplyAropenCM()));
  connect(_editAropenCM, SIGNAL(clicked()), this, SLOT(sEditAropenCM()));
  connect(_viewAropenCM, SIGNAL(clicked()), this, SLOT(sViewAropenCM()));
  connect(_cust, SIGNAL(newId(int)), this, SLOT(sFillList()));
  connect(_newCashrcpt, SIGNAL(clicked()), this, SLOT(sNewCashrcpt()));
  connect(_editCashrcpt, SIGNAL(clicked()), this, SLOT(sEditCashrcpt()));
  connect(_viewCashrcpt, SIGNAL(clicked()), this, SLOT(sViewCashrcpt()));
  connect(_deleteCashrcpt, SIGNAL(clicked()), this, SLOT(sDeleteCashrcpt()));
  connect(_postCashrcpt, SIGNAL(clicked()), this, SLOT(sPostCashrcpt()));
  connect(_preauth, SIGNAL(itemClicked(QTreeWidgetItem*, int)), this, SLOT(sgetCCAmount()));
  connect(_editPreauth, SIGNAL(clicked()), this, SLOT(_editPreauth_clicked()));
  connect(_aropen, SIGNAL(populateMenu(QMenu*, QTreeWidgetItem*)),
          this, SLOT(sPopulateAropenMenu(QMenu*)));
  connect(_aropenCM, SIGNAL(populateMenu(QMenu*, QTreeWidgetItem*)),
          this, SLOT(sPopulateAropenCMMenu(QMenu*)));
  connect(_cashrcpt, SIGNAL(populateMenu(QMenu*, QTreeWidgetItem*)),
          this, SLOT(sPopulateCashRcptMenu(QMenu*)));
  connect(_preauth, SIGNAL(populateMenu(QMenu*, QTreeWidgetItem*)),
          this, SLOT(sPopulatePreauthMenu(QMenu*)));

  _cashrcpt->addColumn(tr("Dist. Date"), _dateColumn,     Qt::AlignCenter );
  _cashrcpt->addColumn(tr("Amount"),     _bigMoneyColumn, Qt::AlignRight  );
  _cashrcpt->addColumn(tr("Currency"),   _currencyColumn, Qt::AlignLeft   );
  if (_privleges->check("MaintainCashReceipts"))
  {
    connect(_cashrcpt, SIGNAL(valid(bool)), _editCashrcpt, SLOT(setEnabled(bool)));
    connect(_cashrcpt, SIGNAL(valid(bool)), _deleteCashrcpt, SLOT(setEnabled(bool)));
    connect(_cashrcpt, SIGNAL(valid(bool)), _postCashrcpt, SLOT(setEnabled(bool)));
  }
  else
  {
    _newCashrcpt->setEnabled(FALSE);
    connect(_cashrcpt, SIGNAL(itemSelected(int)), _viewCashrcpt, SLOT(animateClick()));
  }
  if(_privleges->check("PostCashReceipts"))
    connect(_cashrcpt, SIGNAL(itemSelected(int)), _editCashrcpt, SLOT(animateClick()));
  connect(omfgThis, SIGNAL(cashReceiptsUpdated(int, bool)), this, SLOT(sFillList()));
                                                                       
  _aropenCM->addColumn( tr("Type"),     _ynColumn,    Qt::AlignCenter );
  _aropenCM->addColumn( tr("Doc. #"),   _itemColumn,  Qt::AlignCenter );
  _aropenCM->addColumn( tr("Amount"),   _moneyColumn, Qt::AlignRight  );
  _aropenCM->addColumn( tr("Applied"),  _moneyColumn, Qt::AlignRight  );
  _aropenCM->addColumn( tr("Balance"),  _moneyColumn, Qt::AlignRight  );
  _aropenCM->addColumn( tr("Currency"), _currencyColumn, Qt::AlignLeft );
  
  _aropen->addColumn(tr("Doc. Type"), -1,              Qt::AlignCenter );
  _aropen->addColumn(tr("Doc. #"),    _orderColumn,    Qt::AlignRight  );
  _aropen->addColumn(tr("Order #"),   _orderColumn,    Qt::AlignRight  );
  _aropen->addColumn(tr("Doc. Date"), _dateColumn,     Qt::AlignCenter );
  _aropen->addColumn(tr("Due Date"),  _dateColumn,     Qt::AlignCenter );
  _aropen->addColumn(tr("Amount"),    _bigMoneyColumn, Qt::AlignRight  );
  _aropen->addColumn(tr("Paid"),      _bigMoneyColumn, Qt::AlignRight  );
  _aropen->addColumn(tr("Balance"),   _bigMoneyColumn, Qt::AlignRight  );
  _aropen->addColumn( tr("Currency"), _currencyColumn, Qt::AlignLeft   );
  
  _preauth->addColumn(tr("Order-Seq."),  150, Qt::AlignRight  );
  _preauth->addColumn(tr("Amount"),   _bigMoneyColumn, Qt::AlignRight  );
  _preauth->addColumn(tr("Currency"), _currencyColumn, Qt::AlignLeft   );

  if(_privleges->check("EditAROpenItem"))
  {
    connect(_aropen, SIGNAL(valid(bool)), _editAropen, SLOT(setEnabled(bool)));
    connect(_aropen, SIGNAL(itemSelected(int)), _editAropen, SLOT(animateClick()));
    connect(_aropenCM, SIGNAL(valid(bool)), _editAropenCM, SLOT(setEnabled(bool)));
    connect(_aropenCM, SIGNAL(itemSelected(int)), _editAropenCM, SLOT(animateClick()));
  }
  else
  {
    connect(_aropen, SIGNAL(itemSelected(int)), _viewAropen, SLOT(animateClick()));
    connect(_aropenCM, SIGNAL(itemSelected(int)), _viewAropenCM, SLOT(animateClick()));
  }
  if (_privleges->check("ApplyARMemos"))
    connect(_aropenCM, SIGNAL(valid(bool)), _applyAropenCM, SLOT(setEnabled(bool)));

  if (omfgThis->singleCurrency())
  {
    _cashrcpt->hideColumn(2);
    _preauth->hideColumn(2);
    _aropen->hideColumn(8);
    _aropenCM->hideColumn(4);
  }

  if(_metrics->boolean("EnableCustomerDeposits"))
    _aropenCMLit->setText(tr("A/R Open Credit Memos and Deposits"));
}

arWorkBench::~arWorkBench()
{
  // no need to delete child widgets, Qt does it all for us
}

void arWorkBench::languageChange()
{
  retranslateUi(this);
}

enum SetResponse arWorkBench::set( const ParameterList & pParams )
{
  QVariant param;
  bool    valid;
  
  param = pParams.value("cust_id", &valid);
  if (valid)
    _cust->setId(param.toInt());

  return NoError;
}

void arWorkBench::sFillList()
{
  _CCAmount->clear();

  XSqlQuery currQ;
  currQ.prepare("SELECT cust_curr_id FROM cust WHERE (cust_id=:cust_id)");
  currQ.bindValue(":cust_id", _cust->id());
  currQ.exec();
  if (currQ.first())
    _aropenTotal->setId(currQ.value("cust_curr_id").toInt());
  else if (currQ.lastError().type() != QSqlError::NoError)
    systemError(this, currQ.lastError().databaseText(), __FILE__, __LINE__);

  sFillCashrcptList();
  sFillAropenCMList();
  sFillAropenList();
  sFillPreauthList();
}

void arWorkBench::sFillAropenList()
{
  q.prepare("SELECT aropen_id,"
             "       CASE WHEN (aropen_doctype='D') THEN 0"
             "            WHEN (aropen_doctype='I') THEN 1"
             "            ELSE -1"
             "       END AS altid,"
             "       CASE WHEN (aropen_doctype='D') THEN :debitMemo"
             "            WHEN (aropen_doctype='I') THEN :invoice"
             "            ELSE :other"
             "       END AS f_doctype,"
             "       aropen_docnumber, aropen_ordernumber,"
             "       formatDate(aropen_docdate) AS f_docdate,"
             "       formatDate(aropen_duedate) AS f_duedate,"
             "       formatMoney(aropen_amount) AS f_amount,"
             "       formatMoney(aropen_paid) AS f_paid,"
             "       formatMoney(aropen_amount - aropen_paid) AS balance,"
             "       currConcat(aropen_curr_id) AS currAbbr "
             "FROM aropen "
             "WHERE ( (aropen_open)"
             " AND (NOT (aropen_doctype IN ('C', 'R'))) "
             " AND (aropen_cust_id=:cust_id) ) "
             "ORDER BY aropen_docdate;" );
  q.bindValue(":cust_id", _cust->id());
  q.bindValue(":debitMemo", tr("D/M"));
  q.bindValue(":invoice", tr("Invoice"));
  q.bindValue(":other", tr("Other"));
  q.exec();
  _aropen->clear();
  _aropen->populate(q, true);
  
  q.prepare("SELECT SUM(CASE WHEN (aropen_doctype IN ('C', 'R')) THEN"
            "           (currToBase(aropen_curr_id, aropen_amount - aropen_paid, aropen_docdate) * -1)"
            "      WHEN (aropen_doctype IN ('I', 'D')) THEN"
            "           currToBase(aropen_curr_id, aropen_amount - aropen_paid, aropen_docdate)"
            "      ELSE currToBase(aropen_curr_id, aropen_amount - aropen_paid, aropen_docdate)"
            "       END) AS total_balance "
            "FROM aropen "
            "WHERE ( (aropen_open)"
            " AND (aropen_cust_id=:cust_id) ) " );
  q.bindValue(":cust_id", _cust->id());
  q.exec();
  if(q.first())
  {
    _aropenTotal->setBaseValue(q.value("total_balance").toDouble());
  }
  else if (q.lastError().type() != QSqlError::NoError)
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
}

void arWorkBench::sEditAropen()
{
  ParameterList params;
  params.append("mode", "edit");
  params.append("aropen_id", _aropen->id());
  arOpenItem newdlg(this, "", TRUE);
  newdlg.set(params);

  if (newdlg.exec() != QDialog::Rejected)
    sFillList();
}

void arWorkBench::sViewAropen()
{
  ParameterList params;
  XTreeWidgetItem * item = static_cast<XTreeWidgetItem*>(_aropen->currentItem());
  if(_aropen->altId() == 1 && item)
  {
    params.append("invoiceNumber", item->text(1));
    dspInvoiceInformation * newdlg = new dspInvoiceInformation();
    newdlg->set(params);
    omfgThis->handleNewWindow(newdlg);
  }
  else
  {
    params.append("mode", "view");
    params.append("aropen_id", _aropen->id());
    arOpenItem newdlg(this, "", TRUE);
    newdlg.set(params);
    newdlg.exec();
  }
}

void arWorkBench::sFillAropenCMList()
{
  q.prepare( "SELECT aropen_id,"
             "       CASE WHEN (aropen_doctype='C') THEN 0"
             "            WHEN (aropen_doctype='R') THEN 1"
             "            ELSE -1"
             "       END,"
             "       CASE WHEN(aropen_doctype='C') THEN :creditmemo"
             "            WHEN(aropen_doctype='R') THEN :cashdeposit"
             "            ELSE aropen_doctype"
             "       END,"
             "       aropen_docnumber,"
             "       formatMoney(aropen_amount),"
             "       formatMoney(aropen_paid),"
             "       formatMoney(aropen_amount - aropen_paid),"
             "       currConcat(aropen_curr_id) "
             "FROM aropen "
             "WHERE ( (aropen_doctype IN ('C', 'R'))"
             " AND (aropen_open)"
             " AND (aropen_cust_id=:cust_id) ) "
             "ORDER BY aropen_docnumber;" );
  q.bindValue(":cust_id", _cust->id());
  q.bindValue(":creditmemo", tr("C/M"));
  q.bindValue(":cashdeposit", tr("C/D"));
  q.exec();
  _aropenCM->clear();
  _aropenCM->populate(q, true);
}

void arWorkBench::sEditAropenCM()
{
  ParameterList params;
  params.append("mode", "edit");

  q.prepare("SELECT 1 AS type, cmhead_id AS id "
            "FROM cmhead "
            "WHERE (cmhead_number=:docnum) "
            "UNION "
            "SELECT 2 AS type, aropen_id AS id "
            "FROM aropen "
            "WHERE ((aropen_docnumber=:docnum)"
            "  AND (aropen_doctype IN ('C','R')) "
            ") ORDER BY type LIMIT 1;");
  q.bindValue(":docnum", _aropenCM->currentItem()->text(1));
  q.exec();
  if (q.first())
  {
    if (q.value("type").toInt() == 1)
    {
      params.append("cmhead_id", q.value("id"));
      creditMemo* newdlg = new creditMemo();
      newdlg->set(params);
      omfgThis->handleNewWindow(newdlg);
    }
    else if (q.value("type").toInt() == 2)
    {
      params.append("aropen_id", q.value("id"));
      arOpenItem newdlg(this, "", true);
      newdlg.set(params);
      if (newdlg.exec() != QDialog::Rejected)
        sFillList();
    }
  }
  else if (q.lastError().type() != QSqlError::None)
  {
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }
  else
  {
    QMessageBox::information(this, tr("Credit Memo Not Found"),
                             tr("<p>The Credit Memo #%1 could not be found.")
                             .arg(_aropenCM->currentItem()->text(1)));
    return;
  }
}

void arWorkBench::sViewAropenCM()
{
  ParameterList params;
  params.append("mode", "view");

  q.prepare("SELECT 1 AS type, cmhead_id AS id "
            "FROM cmhead "
            "WHERE (cmhead_number=:docnum) "
            "UNION "
            "SELECT 2 AS type, aropen_id AS id "
            "FROM aropen "
            "WHERE ((aropen_docnumber=:docnum)"
            "  AND (aropen_doctype IN ('C','R')) "
            ") ORDER BY type LIMIT 1;");
  q.bindValue(":docnum", _aropenCM->currentItem()->text(1));
  q.exec();
  if (q.first())
  {
    if (q.value("type").toInt() == 1)
    {
      params.append("cmhead_id", q.value("id"));
      creditMemo* newdlg = new creditMemo();
      newdlg->set(params);
      omfgThis->handleNewWindow(newdlg);
    }
    else if (q.value("type").toInt() == 2)
    {
      params.append("aropen_id", q.value("id"));
      arOpenItem newdlg(this, "", true);
      newdlg.set(params);
      if (newdlg.exec() != QDialog::Rejected)
        sFillList();
    }
  }
  else if (q.lastError().type() != QSqlError::None)
  {
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }
  else
  {
    QMessageBox::information(this, tr("Credit Memo Not Found"),
                             tr("<p>The Credit Memo #%1 could not be found.")
                             .arg(_aropenCM->currentItem()->text(1)));
    return;
  }
}

void arWorkBench::sApplyAropenCM()
{
  ParameterList params;
  params.append("aropen_id", _aropenCM->id());

  applyARCreditMemo newdlg(this, "", TRUE);
  newdlg.set(params);

  if (newdlg.exec() != QDialog::Rejected)
    sFillList();
}

void arWorkBench::sFillCashrcptList()
{
  q.prepare("SELECT cashrcpt_id, formatDate(cashrcpt_distdate),"
            "       formatMoney(cashrcpt_amount), currConcat(cashrcpt_curr_id) "
            "FROM cashrcpt "
            "WHERE (cashrcpt_cust_id=:cust_id) "
            "ORDER BY cashrcpt_distdate;" );
  q.bindValue(":cust_id", _cust->id());
  q.exec();
  _cashrcpt->clear();
  _cashrcpt->populate(q);
}

void arWorkBench::sNewCashrcpt()
{
  ParameterList params;
  params.append("mode", "new");
  params.append("cust_id", _cust->id());

  cashReceipt *newdlg = new cashReceipt();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void arWorkBench::sEditCashrcpt()
{
  ParameterList params;
  params.append("mode", "edit");
  params.append("cashrcpt_id", _cashrcpt->id());

  cashReceipt *newdlg = new cashReceipt();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void arWorkBench::sViewCashrcpt()
{
  ParameterList params;
  params.append("mode", "view");
  params.append("cashrcpt_id", _cashrcpt->id());

  cashReceipt *newdlg = new cashReceipt();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void arWorkBench::sDeleteCashrcpt()
{
  q.prepare( "DELETE FROM cashrcpt "
             "WHERE (cashrcpt_id=:cashrcpt_id);"

             "DELETE FROM cashrcptitem "
             "WHERE (cashrcptitem_cashrcpt_id=:cashrcpt_id);" );
  q.bindValue(":cashrcpt_id", _cashrcpt->id());
  q.exec();
  sFillCashrcptList();
}

void arWorkBench::sPostCashrcpt()
{
  int journalNumber = -1;

  q.exec("SELECT fetchJournalNumber('C/R') AS journalnumber;");
  if (q.first())
    journalNumber = q.value("journalnumber").toInt();
  else if (q.lastError().type() != QSqlError::NoError)
  {
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }

  q.prepare("SELECT postCashReceipt(:cashrcpt_id, :journalNumber) AS result;");
  q.bindValue(":cashrcpt_id", _cashrcpt->id());
  q.bindValue(":journalNumber", journalNumber);
  q.exec();
  if (q.first())
  {
    int result = q.value("result").toInt();
    if (result < 0)
    {
      systemError(this, storedProcErrorLookup("postCashReceipt", result),
                  __FILE__, __LINE__);
      return;
    }
    sFillList();
  }
  else if (q.lastError().type() != QSqlError::None)
  {
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }
}

void arWorkBench::sFillPreauthList()
{
  int ccValidDays = _metrics->value("CCValidDays").toInt();
  if(ccValidDays < 1)
    ccValidDays = 7;
  q.prepare("SELECT ccpay_id,"
            " TEXT(ccpay_order_number) || '-' || TEXT(ccpay_order_number_seq) as ordnum, "
            "        formatMoney(ccpay_amount) AS f_amount,"
            "        currConcat(ccpay_curr_id) AS currAbbr "
            "FROM ccpay "
            " WHERE ( (ccpay_status = 'A')"
            "   AND   (date_part('day', CURRENT_TIMESTAMP - ccpay_transaction_datetime) < :ccValidDays)"
            " AND (ccpay_cust_id = :cust_id) )"
            " ORDER BY ccpay_transaction_datetime;" );
  q.bindValue(":cust_id", _cust->id());
  q.bindValue(":ccValidDays", ccValidDays);
  q.exec();
  _preauth->clear();
  _preauth->populate(q);
  
}
void arWorkBench::sgetCCAmount()
{
  q.prepare("SELECT ccpay_amount, ccpay_curr_id "
             "FROM ccpay "
             " WHERE (ccpay_id = :ccpay_id);");
  q.bindValue(":ccpay_id", _preauth->id());
  if (q.exec() && q.first())
  {
    /* _CCAmount->id() defaults to customer's currency
       if CC payment is in either customer's currency or base
       set _CCAmount appropriately
       but handle it if it somehow happens to be in a 3rd currency
     */
    int ccpayCurrId = q.value("ccpay_curr_id").toInt(); 
    if (ccpayCurrId == _CCAmount->baseId())
      _CCAmount->setBaseValue(q.value("ccpay_amount").toDouble());
    else if (ccpayCurrId != _CCAmount->id())
    {
      _CCAmount->setId(ccpayCurrId);
      _CCAmount->setLocalValue(q.value("ccpay_amount").toDouble());
    }
    else
      _CCAmount->setLocalValue(q.value("ccpay_amount").toDouble());

    _ccPayAmount = _CCAmount->baseValue();
  }
  else if (q.lastError().type() != QSqlError::NoError)
    systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
  else
  {
    _CCAmount->clear();
    _ccPayAmount = 0;
  }
}


void arWorkBench::_editPreauth_clicked()
{
  _ccInputAmount = _CCAmount->baseValue();   // ##### localValue()?
    
  if (_ccInputAmount > _ccPayAmount)
  {
    QMessageBox::information(this, tr("Amount"), tr("The amount to be used cannot be greater than the amount authorized"), QMessageBox::Ok);
    return;
  }
    
  _passPrecheck = true;

  precheckCreditCard();
  
  if (!_passPrecheck)
    return;
    
  if (_metrics->value("CCConfirmTrans") == "A" || _metrics->value("CCConfirmTrans") == "B")
  {
    switch( QMessageBox::question( this, tr("Confirm Post-authorization of Credit Card Purchase"),
              tr("You must confirm that you wish to post authorize process "
                 "this charge %1 %2. Would you like to post authorize now?")
                 .arg(_CCAmount->baseCurrAbbr())
                 .arg(_CCAmount->baseValue()),
              QMessageBox::Yes | QMessageBox::Default,
              QMessageBox::No  | QMessageBox::Escape ) )
    {
      case QMessageBox::Yes:
        break;
      case QMessageBox::No:
      default:
        return;
    }
  }
    
  if(YourPay)
    processYourPay();
    
  if(VeriSign)
    QMessageBox::warning( this, tr("VeriSign"),
             tr("VeriSign is not yet supported") );
}

void arWorkBench::precheckCreditCard()
{
  if(!_metrics->boolean("CCAccept"))
  {
    QMessageBox::warning( this, tr("Credit Cards"),
                          tr("The application is not set up to process credit cards") );
    _CCAmount->setFocus();
    _passPrecheck = false;
    return;
  }
    
  key =  omfgThis->_key;
    
  if(key.length() == 0 || key.isEmpty() || key.isNull())
  {
    QMessageBox::warning( this, tr("Encryption Key"),
                          tr("You do not have an encryption key defined") );
    _CCAmount->setFocus();
    _passPrecheck = false;
    return;
  }
    
  q.prepare( "SELECT ccpay.*, "
             "       ccard_active, "
             "       formatbytea(decrypt(setbytea(ccard_number), setbytea(:key), 'bf')) AS ccard_number,"
             "       formatccnumber(decrypt(setbytea(ccard_number), setbytea(:key), 'bf')) AS ccard_number_x,"
             "       formatbytea(decrypt(setbytea(ccard_month_expired), setbytea(:key), 'bf')) AS ccard_month_expired,"
             "       formatbytea(decrypt(setbytea(ccard_year_expired), setbytea(:key), 'bf')) AS ccard_year_expired, "
             "       ccard_type "
             "FROM ccpay, ccard "
             "WHERE ((ccpay_ccard_id=ccard_id) "
             " AND (ccpay_id=:ccpay_id));");
  q.bindValue(":ccpay_id", _preauth->id());
  q.bindValue(":key",key);
  q.exec();
  q.first();
  
  _ccActive = q.value("ccard_active").toBool();
  
  if (!_ccActive)
  {
    QMessageBox::warning( this, tr("Invalid Credit Card"),
                          tr("The Credit Card you are attempting to use is not active.") );
    _CCAmount->setFocus();
    _passPrecheck = false;
    return;
  }
  
  _ccard_type = q.value("ccard_type").toString();
  _ccard_number = q.value("ccard_number").toString();
  _ccard_month_expired = q.value("ccard_month_expired").toInt();
  _ccard_year_expired = q.value("ccard_year_expired").toInt();
  _ccard_type = q.value("ccard_type").toString();
  _backrefnum = q.value("ccpay_yp_r_ordernum").toString();
  
  YourPay = false;
  VeriSign = false;
  
  if (_metrics->value("CCServer") == "test-payflow.verisign.com"  ||  _metrics->value("CCServer") == "payflow.verisign.com") 
  {
    VeriSign = true; 
  }
  
  if (_metrics->value("CCServer") == "staging.linkpt.net"  ||  _metrics->value("CCServer") == "secure.linkpt.net") 
  {
    YourPay = true; 
  }
  
  if (!YourPay && !VeriSign)
  {
    QMessageBox::warning( this, tr("Invalid Credit Card Service Selected"),
                            tr("OpenMFG only supports YourPay and VeriSign.  You have not selected either of these as your credit card processors.") );
    _CCAmount->setFocus();
    _passPrecheck = false;
    return;
  }
  
  if (VeriSign)
  {
    if ((_metrics->boolean("CCTest") && _metrics->value("CCServer") == "test-payflow.verisign.com") || (!_metrics->boolean("CCTest") && _metrics->value("CCServer") == "payflow.verisign.com"))
    {
// This is OK - We are either running test and test or production and production on Verisign
    }
    else
    {
// Not OK - we have an error
      QMessageBox::warning( this, tr("Invalid Server Configuration"),
                            tr("If Credit Card test is selected you must select a test server.  If Credit Card Test is not selected you must select a production server") );
      _CCAmount->setFocus();
      _passPrecheck = false;
      return;
    }
  }
  
  
  if (YourPay)
  {
    if ((_metrics->boolean("CCTest") && _metrics->value("CCServer") == "staging.linkpt.net") || (!_metrics->boolean("CCTest") && _metrics->value("CCServer") == "secure.linkpt.net"))
    {
// This is OK - We are either running test and test or production and production on Verisign
    }
    else
    {
// Not OK - we have an error
      QMessageBox::warning( this, tr("Invalid Server Configuration"),
                            tr("If Credit Card test is selected you must select a test server.  If Credit Card Test is not selected you must select a production server") );
      _CCAmount->setFocus();
      _passPrecheck = false;
      return;
    }
  }
 
  port = _metrics->value("CCPort").toInt();
  
  if (YourPay)
    if (port != 1129)
    {
      QMessageBox::warning( this, tr("Invalid Server Port Configuration"),
                            tr("You have an invalid port identified for the requested server") );
      _CCAmount->setFocus();
      _passPrecheck = false;
      return;
    }
  
  if (VeriSign)
    if (port != 443)
    {
      QMessageBox::warning( this, tr("Invalid Server Port Configuration"),
                            tr("You have an invalid port identified for the requested server") );
      _CCAmount->setFocus();
      _passPrecheck = false;
      return;
    }
  
  if (YourPay)
  {
// Set up all of the YourPay parameters and check them
    _storenum = _metricsenc->value("CCYPStoreNum");
     
#ifdef Q_WS_WIN
    _pemfile = _metrics->value("CCYPWinPathPEM");
#elif defined Q_WS_MACX
    _pemfile = _metrics->value("CCYPMacPathPEM");
#elif defined Q_WS_X11
    _pemfile = _metrics->value("CCYPLinPathPEM");
#endif
    
    if (_storenum.length() == 0 || _storenum.isEmpty() || _storenum.isNull())
    {
      QMessageBox::warning( this, tr("Store Number Missing"),
                            tr("The YourPay Store Number is missing") );
      _CCAmount->setFocus();
      _passPrecheck = false;
      return;
    }
      
    if (_pemfile.length() == 0 || _pemfile.isEmpty() || _pemfile.isNull())
    {
      QMessageBox::warning( this, tr("Pem File Missing"),
                            tr("The YourPay pem file is missing") );
      _CCAmount->setFocus();
      _passPrecheck = false;
      return;
    }
    
    if (_CCAmount->baseValue() <= 0)
    {
      QMessageBox::warning( this, tr("Charge Amount Missing or incorrect"),
                            tr("The Charge Amount must be greater than 0.00") );
      _CCAmount->setFocus();
      _passPrecheck = false;
      return;
    }
    
    
// We got this far time to load everything up.
    
    configfile = new char[strlen(_storenum.latin1()) + 1];
    strcpy(configfile, _storenum.latin1());
    host = new char[strlen(_metrics->value("CCServer").latin1()) + 1];
    strcpy(host, _metrics->value("CCServer").latin1());
    pemfile = new char[strlen(_pemfile.latin1()) + 1];
    strcpy(pemfile, _pemfile.latin1());
    
    QFileInfo fileinfo( pemfile );
    
    if (!fileinfo.isFile())
    {
// Oops we don't have a usable pemfile
      QMessageBox::warning( this, tr("Missing PEM FIle"),
           tr("Unable to verify that you have a PEM file for this application\nPlease contact your local support") );
     _passPrecheck = false;
     return;
    }
  }
    
  QString plogin;
  QString ppassword;
  QString pserver;
  QString pport;
  
  plogin = _metricsenc->value("CCProxyLogin");
  ppassword = _metricsenc->value("CCPassword");
  pserver = _metrics->value("CCProxyServer");
  pport = _metrics->value("CCProxyPort");

  if(_metrics->boolean("CCUseProxyServer"))
  {
    if (plogin.length() == 0 || plogin.isEmpty() || plogin.isNull())
    {
      QMessageBox::warning( this, tr("Missing Proxy Server Data"),
           tr("You have selected proxy server support, yet you have not provided a login") );
     _passPrecheck = false;
     return;
    }
    if (ppassword.length() == 0 || ppassword.isEmpty() || ppassword.isNull())
    {
      QMessageBox::warning( this, tr("Missing Proxy Server Data"),
           tr("You have selected proxy server support, yet you have not provided a password") );
     _passPrecheck = false;
     return;
    }
    if (pserver.length() == 0 || pserver.isEmpty() || pserver.isNull())
    {
      QMessageBox::warning( this, tr("Missing Proxy Server Data"),
           tr("You have selected proxy server support, yet you have not provided a proxy server to use") );
     _passPrecheck = false;
     return;
    }
    if (pport.length() == 0 || pport.isEmpty() || pport.isNull())
    {
      QMessageBox::warning( this, tr("Missing Proxy Server Data"),
           tr("You have selected proxy server support, yet you have not provided a lport to use") );
     _passPrecheck = false;
     return;
    }
  }
}

// for multicurrency implementation see comments marked ##### in salesOrder.ui.h
void arWorkBench::processYourPay()
{
  QDomDocument odoc;
  // Build the order
  QDomElement root = odoc.createElement("order");
  odoc.appendChild(root);
  QDomElement elem, sub;
  
  // add the 'credit card'
  elem = odoc.createElement("creditcard");

  QString work_month;
  work_month.setNum(_ccard_month_expired);
  if (work_month.length() == 1)
    work_month = "0" + work_month;
  sub = odoc.createElement("cardexpmonth");
  sub.appendChild(odoc.createTextNode(work_month));
  elem.appendChild(sub);

  QString work_year;
  work_year.setNum(_ccard_year_expired);
  work_year = work_year.right(2);
  sub = odoc.createElement("cardexpyear");
  sub.appendChild(odoc.createTextNode(work_year));
  elem.appendChild(sub);

  sub = odoc.createElement("cardnumber");
  sub.appendChild(odoc.createTextNode(_ccard_number));
  elem.appendChild(sub);

  root.appendChild(elem);
  
  // Build 'merchantinfo'
  elem = odoc.createElement("merchantinfo");

  sub = odoc.createElement("configfile");
  sub.appendChild(odoc.createTextNode(configfile));
  elem.appendChild(sub);
  
  root.appendChild(elem);
  
  // Build 'orderoptions'
  elem = odoc.createElement("orderoptions");

  sub = odoc.createElement("ordertype");
  sub.appendChild(odoc.createTextNode("POSTAUTH"));
  elem.appendChild(sub);
  
  sub = odoc.createElement("result");
  sub.appendChild(odoc.createTextNode("LIVE"));
  elem.appendChild(sub);
  
  root.appendChild(elem);
  
  // Build 'payment'
  elem = odoc.createElement("payment");

  QString tmp;
  sub = odoc.createElement("chargetotal");
  sub.appendChild(odoc.createTextNode(tmp.setNum(_CCAmount->baseValue(), 'f', 2))); // ##### localValue()?
  elem.appendChild(sub);

  root.appendChild(elem);
  
  // Build 'transaction details'
  elem = odoc.createElement("transactiondetails");

  sub = odoc.createElement("oid");
  sub.appendChild(odoc.createTextNode(_backrefnum));
  elem.appendChild(sub);

  root.appendChild(elem);
  
  // Process the order
  saved_order = odoc.toString();
  
  if (_metrics->boolean("CCTest"))
  {
    _metrics->set("CCOrder", saved_order);
  }
  
  proc = new QProcess( this );
  QString curl_path;
#ifdef Q_WS_WIN
  curl_path = qApp->applicationDirPath() + "\\curl";
#elif defined Q_WS_MACX
  curl_path = "/usr/bin/curl";
#elif defined Q_WS_X11
  curl_path = "/usr/bin/curl";
#endif
  
  QStringList curl_args;
  curl_args.append( "-k" );
  curl_args.append( "-d" );
  curl_args.append( saved_order );
  curl_args.append( "-E" );
  curl_args.append( pemfile );
  
  _port.setNum(port);
  doServer = "https://" + _metrics->value("CCServer") + ":" + _port;
  
  curl_args.append( doServer );
  
  QString proxy_login;
  QString proxy_server;
  
  if(_metrics->boolean("CCUseProxyServer"))
  {
    proxy_login =  _metricsenc->value("CCProxyLogin") + ":" + _metricsenc->value("CCPassword") ;
    proxy_server = _metrics->value("CCProxyServer") + ":" + _metrics->value("CCProxyPort");
    curl_args.append( "-x" );
    curl_args.append( proxy_server );
    curl_args.append( "-U" );
    curl_args.append( proxy_login );
  }
  
  _response = "";
  
  connect( proc, SIGNAL(readyReadStandardOutput()),
           this, SLOT(readFromStdout()) );
  
  QApplication::setOverrideCursor( QCursor(Qt::WaitCursor) );
  _editPreauth->setEnabled(FALSE);
  
  proc->start(curl_path, curl_args);
  if ( !proc->waitForStarted() ) 
  {
    QMessageBox::critical( 0,
                  tr("Fatal error"),
                  tr("Could not start the %1 command.").arg(curl_path),
                  tr("Quit") );
    return;
  }
  
  while (proc->state() == QProcess::Running)
    qApp->processEvents();
  
  _editPreauth->setEnabled(TRUE);
  QApplication::restoreOverrideCursor();
  
  _response =  "<myroot>" + _response + "</myroot>";
  
  QString whyMe;
  
  if (_metrics->boolean("CCTest"))
  {
    whyMe = _ccard_number + "  " + _response;
    _metrics->set("CCTestMe", whyMe);
    _metrics->set("CCOrder", saved_order);
  }
  
  /*if (_metrics->boolean("CCTest"))
  {
    QMessageBox::information(this, tr("YourPay"), tr("The return code was ") + _response, QMessageBox::Ok);
  }*/
  QDomDocument doc;
  doc.setContent(_response);
  QDomNode node;
  root = doc.documentElement();
  
  QString _r_avs;
  QString _r_ordernum;
  QString _r_error;
  QString _r_approved;
  QString _r_code;
  QString _r_score;
  QString _r_shipping;
  QString _r_tax;
  QString _r_tdate;
  QString _r_ref;
  QString _r_message;
  QString _r_time;
  
  node = root.firstChild();
  while ( !node.isNull() ) {
    if ( node.isElement() && node.nodeName() == "r_avs" ) {
      QDomElement r_avs = node.toElement();
      _r_avs = r_avs.text();
    }
    if ( node.isElement() && node.nodeName() == "r_ordernum" ) {
      QDomElement r_ordernum = node.toElement();
      _r_ordernum = r_ordernum.text();
    }
    if ( node.isElement() && node.nodeName() == "r_error" ) {
      QDomElement r_error = node.toElement();
      _r_error = r_error.text();
    }
    if ( node.isElement() && node.nodeName() == "r_approved" ) {
      QDomElement r_approved = node.toElement();
      _r_approved = r_approved.text();
    }
    if ( node.isElement() && node.nodeName() == "r_code" ) {
      QDomElement r_code = node.toElement();
      _r_code = r_code.text();
    }
    if ( node.isElement() && node.nodeName() == "r_message" ) {
      QDomElement r_message = node.toElement();
      _r_message = r_message.text();
    }
    if ( node.isElement() && node.nodeName() == "r_time" ) {
      QDomElement r_time = node.toElement();
      _r_time = r_time.text();
    }
    if ( node.isElement() && node.nodeName() == "r_ref" ) {
      QDomElement r_ref = node.toElement();
      _r_ref = r_ref.text();
    }
    if ( node.isElement() && node.nodeName() == "r_tdate" ) {
      QDomElement r_tdate = node.toElement();
      _r_tdate = r_tdate.text();
    }
    if ( node.isElement() && node.nodeName() == "r_tax" ) {
      QDomElement r_tax = node.toElement();
      _r_tax = r_tax.text();
    }
    if ( node.isElement() && node.nodeName() == "r_shipping" ) {
      QDomElement r_shipping = node.toElement();
      _r_shipping = r_shipping.text();
    }
    if ( node.isElement() && node.nodeName() == "r_score") {
      QDomElement r_score = node.toElement();
      _r_score = r_score.text();
    }
    node = node.nextSibling();
  }
  
  q.prepare( "UPDATE ccpay"
             "   SET ccpay_amount = :ccpay_amount, "
             "       ccpay_auth = FALSE, "
             "       ccpay_status = :ccpay_status, "
             "       ccpay_curr_id = :ccpay_curr_id "
             " WHERE ccpay_id = :ccpay_id;" );
  q.bindValue(":ccpay_id", _preauth->id());
  q.bindValue(":ccpay_amount",_CCAmount->baseValue());    // ##### localValue()?
  q.bindValue(":ccpay_curr_id",_CCAmount->baseId());      // ##### id()?
  
  doDollars = 0;
  
  if (_r_approved == "APPROVED")
  {
    QMessageBox::information(this, tr("YourPay"), tr("This transaction was approved\n") + _r_ref, QMessageBox::Ok);  q.bindValue(":ccpay_status","C");
    doDollars = _CCAmount->baseValue();                   // ##### localValue()?
  }
  
  if (_r_approved == "DENIED")
  {
    QMessageBox::information(this, tr("YourPay"), tr("This transaction was denied\n") + _r_message, QMessageBox::Ok);
    q.bindValue(":ccpay_status","D");
  }
  
  if (_r_approved == "DUPLICATE")
  {
    QMessageBox::information(this, tr("YourPay"), tr("This transaction is a duplicate\n") + _r_message, QMessageBox::Ok);
    q.bindValue(":ccpay_status","D");
  }
  
  if (_r_approved == "DECLINED")
  {
    QMessageBox::information(this, tr("YourPay"), tr("This transaction is a declined\n") + _r_error, QMessageBox::Ok);
    q.bindValue(":ccpay_status","D");
  }
  
  if (_r_approved == "FRAUD")
  {
    QMessageBox::information(this, tr("YourPay"), tr("This transaction is denied because of possible fraud\n") + _r_error, QMessageBox::Ok);
    q.bindValue(":ccpay_status","D");
  }
  
  if (_r_approved.length() == 0 || _r_approved.isNull() || _r_approved.isEmpty())
  {
    QMessageBox::information(this, tr("YourPay"),
                             tr("<p>No Approval Code<br>%1<br>%2<br>%3")
                               .arg(_r_error).arg(_r_message).arg(_response),
                               QMessageBox::Ok);
    q.bindValue(":ccpay_status","X");
  }
  
  q.exec();
  
  //We need to a charge here to do a cash receipt
  //  We need some logic for a successful charge and for a non-successful charge
  if (doDollars > 0)
  {
// This is a sucessful charge
    q.prepare("INSERT INTO cashrcpt (cashrcpt_id,"
              " cashrcpt_cust_id,"
              " cashrcpt_amount,"
              " cashrcpt_curr_id,"
              " cashrcpt_fundstype, "
              " cashrcpt_docnumber,"
              " cashrcpt_bankaccnt_id,"
              " cashrcpt_notes,"
              "  cashrcpt_distdate) "
              "VALUES (nextval('cashrcpt_cashrcpt_id_seq'), :cashrcpt_cust_id,"
              "       :cashrcpt_amount, :cashrcpt_curr_id, :cashrcpt_fundstype,"
              "       :cashrcpt_docnumber, :cashrcpt_bankaccnt_id,"
              "       :cashrcpt_notes, current_date);");
    q.bindValue(":cashrcpt_cust_id",_cust->id());
    q.bindValue(":cashrcpt_amount",doDollars);
    q.bindValue(":cashrcpt_curr_id", _CCAmount->baseId());      // ##### id()?
    q.bindValue(":cashrcpt_fundstype",_ccard_type);
    q.bindValue(":cashrcpt_docnumber",_backrefnum);
    q.bindValue(":cashrcpt_bankaccnt_id",_metrics->value("CCDefaultBank").toInt());
    q.bindValue(":cashrcpt_notes","Converted Pre-auth");
    q.exec();
  }
  
  //Clean up
  sFillCashrcptList();
  sFillAropenCMList();
  sFillAropenList();
  sFillPreauthList();
  _CCAmount->clear();
    
}

void arWorkBench::readFromStdout()
{
_response += QString(proc->readAllStandardOutput());
}

void arWorkBench::sPopulateAropenMenu(QMenu *pMenu)
{
  int menuItem;

  if (_aropen->altId() == 0)
  {
    menuItem = pMenu->insertItem(tr("View Apply-To Debit Memo..."), this, SLOT(sViewAropen()), 0);
    if (! _privleges->check("MaintainARMemos") &&
        ! _privleges->check("ViewARMemos"))
      pMenu->setItemEnabled(menuItem, FALSE);
  }

  else if (_aropen->altId() == 1)
  {
    menuItem = pMenu->insertItem(tr("View Apply-To Invoice..."), this, SLOT(sViewAropen()), 0);
    if (! _privleges->check("MaintainMiscInvoices") &&
        ! _privleges->check("ViewMiscInvoices"))
      pMenu->setItemEnabled(menuItem, FALSE);
  }
}

void arWorkBench::sPopulateAropenCMMenu(QMenu *pMenu)
{
  int menuItem;

  if (_aropenCM->altId() == 0)
  {
    menuItem = pMenu->insertItem(tr("Apply Credit Memo..."), this, SLOT(sApplyAropenCM()), 0);
    if (! _privleges->check("ApplyARMemos"))
      pMenu->setItemEnabled(menuItem, FALSE);

    menuItem = pMenu->insertItem(tr("Edit Credit Memo..."), this, SLOT(sEditAropenCM()), 0);
    if (! _privleges->check("EditAROpenItem"))
      pMenu->setItemEnabled(menuItem, FALSE);

    menuItem = pMenu->insertItem(tr("View Credit Memo..."), this, SLOT(sViewAropenCM()), 0);
    if (! _privleges->check("EditAROpenItem") &&
        ! _privleges->check("ViewAROpenItems"))
      pMenu->setItemEnabled(menuItem, FALSE);
  }

  /* show cash receipts here???
  else if (_aropenCM->altId() == 1)
  {
  }
  */
}

void arWorkBench::sPopulateCashRcptMenu(QMenu *pMenu)
{
  int menuItem;

  menuItem = pMenu->insertItem(tr("Edit Cash Receipt..."), this, SLOT(sEditCashrcpt()), 0);
  if (! _privleges->check("MaintainCashReceipts") &&
      ! _privleges->check("ViewCashReceipts"))
    pMenu->setItemEnabled(menuItem, FALSE);

  menuItem = pMenu->insertItem(tr("View Cash Receipt..."), this, SLOT(sViewCashrcpt()), 0);
  if (! _privleges->check("ViewCashReceipts"))
    pMenu->setItemEnabled(menuItem, FALSE);

  menuItem = pMenu->insertItem(tr("Delete Cash Receipt..."), this, SLOT(sDeleteCashrcpt()), 0);
  if (! _privleges->check("MaintainCashReceipts"))
    pMenu->setItemEnabled(menuItem, FALSE);

  menuItem = pMenu->insertItem(tr("Post Cash Receipt..."), this, SLOT(sPostCashrcpt()), 0);
  if (! _privleges->check("PostCashReceipts"))
    pMenu->setItemEnabled(menuItem, FALSE);
}

void arWorkBench::sPopulatePreauthMenu(QMenu*)
{
  /*
  id = ccpay_id
  column 0 = ccpay_order_number || ccpay_order_number_seq
  */
}

