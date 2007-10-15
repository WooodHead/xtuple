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

#include "shipOrder.h"

#include <QMessageBox>
#include <QSqlError>
#include <QVariant>

#include <metasql.h>

#include "enterPoReceipt.h"
#include "itemSite.h"
#include "mqlutil.h"
#include "printInvoice.h"
#include "printPackingList.h"
#include "salesOrderList.h"
#include "storedProcErrorLookup.h"

shipOrder::shipOrder(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
  setupUi(this);

  connect(_create,   SIGNAL(toggled(bool)), this, SLOT(sCreateToggled(bool)));
  connect(_select,   SIGNAL(toggled(bool)), this, SLOT(sSelectToggled(bool)));
  connect(_ship,     SIGNAL(clicked()),     this, SLOT(sShip()));
  connect(_shipment, SIGNAL(newId(int)),    this, SLOT(sFillList()));
  connect(_shipment, SIGNAL(newId(int)),    this, SLOT(sFillTracknum()));
  connect(_soList,   SIGNAL(clicked()),     this, SLOT(sSoList()));
  connect(_soNumber, SIGNAL(newId(int)),    this, SLOT(sHandleSo()));
  connect(_soNumber, SIGNAL(requestList()), this, SLOT(sSoList()));
  connect(_toNumber, SIGNAL(newId(int)),    this, SLOT(sHandleTo()));
  connect(_tracknum, SIGNAL(activated(const QString&)), this, SLOT(sFillFreight()));
  connect(_tracknum, SIGNAL(currentIndexChanged(const QString&)), this, SLOT(sFillFreight()));
  connect(_tracknum, SIGNAL(highlighted(const QString&)), this, SLOT(sFillFreight()));

  _captive = FALSE;

#ifndef Q_WS_MAC
  _soList->setMaximumWidth(25);
#endif
  
  _coitem->addColumn( tr("#"),           _whsColumn,  Qt::AlignCenter );
  _coitem->addColumn( tr("Item Number"), _itemColumn, Qt::AlignLeft   );
  _coitem->addColumn( tr("Description"), -1,          Qt::AlignLeft   );
  _coitem->addColumn( tr("UOM"),         _uomColumn,  Qt::AlignCenter );
  _coitem->addColumn( tr("Qty."),        _qtyColumn,  Qt::AlignRight  );

  _select->setChecked(_privleges->check("SelectBilling") && _metrics->boolean("AutoSelectForBilling"));
  _select->setEnabled(_privleges->check("SelectBilling"));
  _create->setEnabled(_privleges->check("SelectBilling"));

  _toNumber->setVisible(_metrics->boolean("MultiWhs"));

  sCreateToggled(_create->isChecked());
  sHandleButtons();
}

shipOrder::~shipOrder()
{
    // no need to delete child widgets, Qt does it all for us
}

void shipOrder::languageChange()
{
    retranslateUi(this);
}

enum SetResponse shipOrder::set(const ParameterList &pParams)
{
  QString  returnValue;
  QVariant param;
  bool     valid;

  param = pParams.value("cosmisc_id", &valid);
  if (valid)
  {
    q.prepare( "SELECT cosmisc_cohead_id "
               "FROM cosmisc "
               "WHERE (cosmisc_id=:cosmisc_id);" );
    q.bindValue(":cosmisc_id", param.toInt());
    q.exec();
    if (q.first())
    {
      _soNumber->setId(q.value("cosmisc_cohead_id").toInt());
      _captive = TRUE;
    }
    else if (q.lastError().type() != QSqlError::None)
    {
      systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
      return UndefinedError;
    }

    _shipment->setId(param.toInt());	// last because of signal cascade
  }

  param = pParams.value("shiphead_id", &valid);
  if (valid)
  {
    q.prepare( "SELECT shiphead_order_id, shiphead_order_type "
               "FROM shiphead "
               "WHERE (shiphead_id=:shiphead_id);" );
    q.bindValue(":shiphead_id", param.toInt());
    q.exec();
    if (q.first())
    {
      if (q.value("shiphead_order_type").toString() == "SO")
      {
	_toNumber->setId(-1);
	_soNumber->setId(q.value("shiphead_order_id").toInt());
	_select->setEnabled(_privleges->check("SelectBilling"));
      }
      else if (q.value("shiphead_order_type").toString() == "TO")
      {
	_soNumber->setId(-1);
	_toNumber->setId(q.value("shiphead_order_id").toInt());
	_select->setEnabled(false);
      }
      _captive = TRUE;
    }
    else if (q.lastError().type() != QSqlError::None)
    {
      systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
      return UndefinedError;
    }

    _shipment->setId(param.toInt());	// last because of signal cascade
  }

  return NoError;
}

void shipOrder::sShip()
{
  XSqlQuery shipq;
  shipq.prepare( "UPDATE shiphead "
	     "   SET shiphead_shipvia=:shiphead_shipvia,"
	     "       shiphead_freight=:shiphead_freight,"
	     "       shiphead_freight_curr_id=:shiphead_freight_curr_id,"
	     "       shiphead_tracknum=:shiphead_tracknum "
	     " WHERE (shiphead_id=:shiphead_id);");
  shipq.bindValue(":shiphead_shipvia",	_shipVia->currentText());
  shipq.bindValue(":shiphead_freight",	_freight->localValue());
  shipq.bindValue(":shiphead_freight_curr_id", _freight->id());
  shipq.bindValue(":shiphead_tracknum",	_tracknum->currentText());
  shipq.bindValue(":shiphead_id",		_shipment->id());
  shipq.exec();
  if (shipq.lastError().type() != QSqlError::None)
  {
    systemError(this, shipq.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }

  XSqlQuery rollback;
  rollback.prepare("ROLLBACK;");
  // failed insertGLTransaction RETURNs -5 rather than RAISE EXCEPTION
  shipq.exec("BEGIN;");

  shipq.prepare( "SELECT shipShipment(:shiphead_id) AS result;");
  shipq.bindValue(":shiphead_id", _shipment->id());
  shipq.exec();
  if (shipq.first())
  {
    int result = shipq.value("result").toInt();
    if (result == -6)
    {
      rollback.exec();
      shipq.prepare("SELECT itemsite_id, tohead_trns_warehous_id,"
	        "       tohead_dest_warehous_id "
	        "FROM shiphead, shipitem, tohead, toitem, itemsite "
	        "WHERE ((itemsite_item_id=toitem_item_id)"
	        "  AND  (itemsite_warehous_id=tohead_src_warehous_id)"
	        "  AND  (toitem_tohead_id=tohead_id)"
	        "  AND  (shipitem_orderitem_id=toitem_id)"
	        "  AND  (shiphead_id=shipitem_shiphead_id)"
	        "  AND  (shiphead_order_type='TO')"
	        "  AND  (NOT shiphead_shipped)"
	        "  AND  (shiphead_id=:shiphead_id));");
      shipq.bindValue(":shiphead_id", _shipment->id());
      shipq.exec();
      while (shipq.next())
      {
	// missing transit itemsite is fatal here but not missing dest
	int transis = itemSite::createItemSite(this,
					       shipq.value("itemsite_id").toInt(),
				     shipq.value("tohead_trns_warehous_id").toInt(),
				     false);
	int destis  = itemSite::createItemSite(this,
					       shipq.value("itemsite_id").toInt(),
				     shipq.value("tohead_dest_warehous_id").toInt(),
				     true);
	if (transis <= 0 || destis < 0)
	  return;
      }
      if (shipq.lastError().type() != QSqlError::None)
      {
	systemError(this, shipq.lastError().databaseText(), __FILE__, __LINE__);
	return;
      }
      sShip();	// beware of endless loop if you change createItemSite err check
      return;	// return because the recursive call cleans up for us
    }
    else if (result < 0)
    {
      rollback.exec();
      systemError(this, storedProcErrorLookup("shipShipment", result),
		  __FILE__, __LINE__);
      return;
    }
  }
  else if (shipq.lastError().type() != QSqlError::None)
  {
    rollback.exec();
    systemError(this, shipq.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }

  shipq.exec("COMMIT;");
  if (shipq.lastError().type() != QSqlError::None)
  {
    systemError(this, shipq.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }
  // END the transaction

  if (_print->isChecked())
  {
    ParameterList params;
    params.append("cosmisc_id",  _shipment->id());
    params.append("shiphead_id", _shipment->id());
    params.append("print");

    printPackingList newdlg(this, "", TRUE);
    newdlg.set(params);
  }

  if (_soNumber->isValid() && _select->isChecked())
  {
    shipq.prepare("SELECT selectUninvoicedShipment(:shiphead_id) AS result;");
    shipq.bindValue(":shiphead_id", _shipment->id());
    shipq.exec();
    if (shipq.first())
    {
      int cobmiscid = shipq.value("result").toInt();
      if (cobmiscid < 0)
      {
	systemError(this,
	      storedProcErrorLookup("selectUninvoicedShipment", cobmiscid),
	      __FILE__, __LINE__);
	return;
      }
      else if (0 == cobmiscid)
      {
	QMessageBox::information(this, tr("Already Invoiced"),
				 tr("<p>This shipment appears to have been "
				   "invoiced already. It will not be selected "
				   "for billing again."));
      }
      else if (_create->isChecked())
      {
	shipq.prepare("SELECT postBillingSelection(:cobmisc_id) AS result;");
	shipq.bindValue(":cobmisc_id", cobmiscid);
	shipq.exec();
	if (shipq.first())
	{
	  int result = shipq.value("result").toInt();
	  if (result < 0)
	  {
	    systemError(this,
		      storedProcErrorLookup("postBillingSelection", result),
		      __FILE__, __LINE__);
	    return;
	  }
	  ParameterList params;
	  params.append("invchead_id", result);

	  printInvoice newdlg(this, "", TRUE);
	  newdlg.set(params);
	  newdlg.exec();

	  omfgThis->sInvoicesUpdated(result, TRUE);
	  omfgThis->sSalesOrdersUpdated(_soNumber->id());
	}
	else if (shipq.lastError().type() != QSqlError::None)
	{
	  systemError(this, shipq.lastError().databaseText() +
		      tr("<p>Although Sales Order %1 was successfully shipped "
			 "and selected for billing, the Invoice was not "
			 "created properly. You may need to create an Invoice "
			 "manually from the Billing Selection.")
			.arg(_soNumber->id()),
		      __FILE__, __LINE__);
	  return;
	}

	omfgThis->sBillingSelectionUpdated(_soNumber->id(), TRUE);
      }
    }
    else if (shipq.lastError().type() != QSqlError::None)
    {
      systemError(this, shipq.lastError().databaseText() +
		  tr("<p>Although Sales Order %1 was successfully shipped, "
		     "it was not selected for billing. You must manually "
		     "select this Sales Order for Billing.")
		    .arg(_soNumber->id()),
		  __FILE__, __LINE__);
      return;
    }
  }

  if (_toNumber->isValid() && _receive->isChecked())
  {
    QString recverr = tr("<p>Receiving inventory for this Transfer Order "
			"failed although Shipping the Order succeeded. "
			"Manually receive this order using the Enter Order "
			"Receipt window.");
    shipq.exec("BEGIN;");
    ParameterList params;

    if (_metrics->boolean("MultiWhs"))
      params.append("MultiWhs");
    params.append("tohead_id", _toNumber->id());
    params.append("ordertype", "TO");

    MetaSQLQuery recvm = mqlLoad(":/sr/enterReceipt/ReceiveAll.mql");
    shipq = recvm.toQuery(params);

    while (shipq.next())
    {
      int result = shipq.value("result").toInt();
      if (result < 0)
      {
	rollback.exec();
	systemError(this,
		    recverr + storedProcErrorLookup("enterReceipt", result),
		    __FILE__, __LINE__);
      }
      omfgThis->sPurchaseOrderReceiptsUpdated();
    }
    if (shipq.lastError().type() != QSqlError::None)
    {
      rollback.exec();
      systemError(this, recverr + "<br>" + shipq.lastError().databaseText(),
		  __FILE__, __LINE__);
    }

    shipq.exec("COMMIT;");
    if (shipq.lastError().type() != QSqlError::None)
    {
      systemError(this,
		  recverr + "<br>" + shipq.lastError().databaseText(),
		  __FILE__, __LINE__);
    }

    ParameterList recvParams;
    recvParams.append("tohead_id", _toNumber->id());
    enterPoReceipt *newdlg = new enterPoReceipt();
    newdlg->set(recvParams);

    // to address bug 5680, replace
    // omfgThis->handleNewWindow(newdlg, Qt::ApplicationModal);
    // with
    newdlg->sPost();
    // end of replacement
  }

  if (_captive)
    accept();
  else
  {
    _soNumber->setId(-1);
    _toNumber->setId(-1);
    _soNumber->setEnabled(true);
    _toNumber->setEnabled(true);
    _select->setChecked(_privleges->check("SelectBilling") && _metrics->boolean("AutoSelectForBilling"));
    _select->setEnabled(_privleges->check("SelectBilling"));
    _create->setEnabled(_privleges->check("SelectBilling"));
    _billToName->clear();
    _shipToName->clear();
    _shipToAddr1->clear();
    _freight->setEnabled(TRUE);
    _freight->reset();
    _shipVia->clear();
    _shipment->clear();
    _shipment->setEnabled(false);
    _close->setText(tr("&Close"));

    _soNumber->setFocus();
  }

  // Update the shipdatasum record to reflect shipped     
  shipq.prepare( "UPDATE shipdatasum "
	    "   SET shipdatasum_shipped=true "
	    " WHERE  (shipdatasum_cosmisc_tracknum = :cosmisc_tracknum);");
  shipq.bindValue(":cosmisc_tracknum", _tracknum->currentText());
  shipq.exec();
  if (shipq.lastError().type() != QSqlError::None)
  {
    systemError(this, shipq.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }
}

void shipOrder::sSoList()
{
  ParameterList params;
  params.append("sohead_id", _soNumber->id());
  params.append("soType", cSoAtShipping);
  
  salesOrderList newdlg(this, "", TRUE);
  newdlg.set(params);

  _soNumber->setId(newdlg.exec());
}

void shipOrder::sHandleSo()
{
  _coitem->clear();
  _shipment->setEnabled(false);
  _shipment->removeOrderLimit();

  sHandleButtons();

  if (_soNumber->isValid())
  {
    _toNumber->setId(-1);

    q.prepare( "SELECT cohead_holdtype, cust_name, cohead_shiptoname, "
	       "       cohead_shiptoaddress1, cohead_curr_id, cohead_freight "
               "FROM cohead, cust "
               "WHERE ((cohead_cust_id=cust_id) "
	       "  AND  (cohead_id=:sohead_id));" );
    q.bindValue(":sohead_id", _soNumber->id());
    q.exec();
    if (q.first())
    {
      if ( (q.value("cohead_holdtype").toString() == "P") ||
           (q.value("cohead_holdtype").toString() == "C") ||
           (q.value("cohead_holdtype").toString() == "S") )
      {
        QMessageBox::warning( this, tr("Cannot Ship Order"),
                              tr("<p>The selected Sales Order cannot be "
			         "shipped as it has been placed on Shipping "
				 "Hold. It must be released from Shipping Hold "
				 "before it may be shipped." ) );
        _soNumber->setId(-1);
        return;
      }

      _freight->setId(q.value("cohead_curr_id").toInt());
      _freight->setLocalValue(q.value("cohead_freight").toDouble());
      _billToName->setText(q.value("cust_name").toString());
      _shipToName->setText(q.value("cohead_shiptoname").toString());
      _shipToAddr1->setText(q.value("cohead_shiptoaddress1").toString());

      QString sql( "SELECT shiphead_id "
		   "FROM shiphead "
		   "WHERE ( (NOT shiphead_shipped)"
		   "<? if exists(\"shiphead_id\") ?>"
		   " AND (shiphead_id=<? value(\"shiphead_id\") ?>)"
		   "<? endif ?>"
		   " AND (shiphead_order_id=<? value(\"sohead_id\") ?>)"
		   " AND (shiphead_order_type='SO'));" );
      ParameterList params;
      params.append("sohead_id", _soNumber->id());
      if (_shipment->isValid())
	params.append("shiphead_id", _shipment->id());
      MetaSQLQuery mql(sql);
      q = mql.toQuery(params);
      if (q.first())
      {
	if (_shipment->id() != q.value("shiphead_id").toInt())
	  _shipment->setId(q.value("shiphead_id").toInt());

	if (q.next())
	{
	  _shipment->setType("SO");
	  _shipment->limitToOrder(_soNumber->id());
	  _shipment->setEnabled(true);
	}
      }
      else if (q.lastError().type() != QSqlError::None)
      {
	systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
	return;
      }
      else if (_shipment->isValid())
      {
	params.clear();
	params.append("sohead_id", _soNumber->id());
	MetaSQLQuery mql(sql);
	q = mql.toQuery(params);
	if (q.first())
	{
	  _shipment->setId(q.value("shiphead_id").toInt());
	  if (q.next())
	  {
	    _shipment->setType("SO");
	    _shipment->limitToOrder(_soNumber->id());
	    _shipment->setEnabled(true);
	  }
	}
	else if (q.lastError().type() != QSqlError::None)
	{
	  systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
	  return;
	}
	else
	  _shipment->clear();
      }
      else
      {
	QMessageBox::warning(this, tr("Nothing to ship"),
			  tr("<p>You may not ship this Sales Order because "
			     "no stock has been issued to shipping for it."));
	_soNumber->setFocus();
	return;
      }
    }
    else if (q.lastError().type() != QSqlError::None)
    {
      systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }

    _soNumber->setEnabled(true);
  }
  else
  {
    _shipment->clear();
  }

  _toNumber->setEnabled(! _soNumber->isValid());
}

void shipOrder::sHandleTo()
{
  _coitem->clear();
  _shipment->setEnabled(false);
  _shipment->removeOrderLimit();

  sHandleButtons();

  if (_toNumber->isValid())
  {
    _soNumber->setId(-1);

    q.prepare("SELECT tohead_freight_curr_id, tohead_destname,"
	      "       tohead_destaddress1,"
	      "       SUM(toitem_freight) + tohead_freight AS freight "
	      "FROM tohead, toitem "
	      "WHERE ((toitem_tohead_id=tohead_id)"
	      "  AND  (toitem_status<>'X')"
	      "  AND  (tohead_id=:tohead_id)) "
	      "GROUP BY tohead_freight_curr_id, tohead_destname,"
	      "         tohead_destaddress1, tohead_freight;");
    q.bindValue(":tohead_id", _toNumber->id());
    q.exec();
    if (q.first())
    {
      _freight->setId(q.value("tohead_freight_curr_id").toInt());
      _freight->setLocalValue(q.value("freight").toDouble());
      _billToName->setText(tr("Transfer Order"));
      _shipToName->setText(q.value("tohead_destname").toString());
      _shipToAddr1->setText(q.value("tohead_destaddress1").toString());
    }
    else if (q.lastError().type() != QSqlError::None)
    {
      systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }

    QString sql( "SELECT shiphead_id "
		 "FROM shiphead "
		 "WHERE ( (NOT shiphead_shipped)"
		 "<? if exists(\"shiphead_id\") ?>"
		 " AND (shiphead_id=<? value(\"shiphead_id\") ?>)"
		 "<? endif ?>"
		 " AND (shiphead_order_id=<? value(\"tohead_id\") ?>)"
		 " AND (shiphead_order_type='TO'));" );
    ParameterList params;
    params.append("tohead_id", _toNumber->id());
    if (_shipment->isValid())
      params.append("shiphead_id", _shipment->id());
    MetaSQLQuery mql(sql);
    q = mql.toQuery(params);
    if (q.first())
    {
      if (_shipment->id() != q.value("shiphead_id").toInt())
	_shipment->setId(q.value("shiphead_id").toInt());

      if (q.next())
      {
	_shipment->setType("TO");
	_shipment->limitToOrder(_toNumber->id());
	_shipment->setEnabled(true);
      }
    }
    else if (q.lastError().type() != QSqlError::None)
    {
      systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }
    else if (_shipment->isValid())
    {
      params.clear();
      params.append("tohead_id", _toNumber->id());
      MetaSQLQuery mql(sql);
      q = mql.toQuery(params);
      if (q.first())
      {
	_shipment->setId(q.value("shiphead_id").toInt());
	if (q.next())
	{
	  _shipment->setType("TO");
	  _shipment->limitToOrder(_toNumber->id());
	  _shipment->setEnabled(true);
	}
      }
      else if (q.lastError().type() != QSqlError::None)
      {
	systemError(this, q.lastError().databaseText(), __FILE__, __LINE__);
	return;
      }
      else
	_shipment->clear();
    }
    else
    {
      QMessageBox::warning(this, tr("Nothing to ship"),
			tr("<p>You may not ship this Transfer Order because "
			   "no stock has been issued to shipping for it."));
      _toNumber->setFocus();
      return;
    }
    _toNumber->setEnabled(true);
  }
  else
  {
    _shipment->clear();
  }

  _soNumber->setEnabled(! _toNumber->isValid());
}

void shipOrder::sHandleButtons()
{
  _select->setChecked(_privleges->check("SelectBilling") &&
		     _metrics->boolean("AutoSelectForBilling"));

  _select->setEnabled(_soNumber->isValid() &&
		      _privleges->check("SelectBilling"));
  _create->setEnabled(_soNumber->isValid() &&
		      _privleges->check("SelectBilling"));
  _print->setEnabled(_soNumber->isValid() || _toNumber->isValid());
  _receive->setEnabled(_toNumber->isValid() &&
		       _privleges->check("EnterReceipts"));

  // logic here is reversed to ensure that by default all checkboxes are visible
  if (Preferences(omfgThis->username()).boolean("XCheckBox/forgetful"))
  {
    _select->setChecked(! _toNumber->isValid());
    _create->setChecked(! _toNumber->isValid());
    _receive->setChecked(! _soNumber->isValid());
  }
  else
  {
    _select->setVisible(! _toNumber->isValid());
    _create->setVisible(! _toNumber->isValid());
    _receive->setVisible(! _soNumber->isValid());
  }
}

void shipOrder::sFillList()
{
  if (_shipment->isValid())
  {
    QString ordertype;
    XSqlQuery shipq;
    shipq.prepare("SELECT shiphead_shipvia, shiphead_order_type,"
		  "       shiphead_freight, shiphead_freight_curr_id,"
		  "       COALESCE(shipchrg_custfreight, TRUE) AS custfreight,"
		  "       CURRENT_DATE AS effective "
		  "FROM shiphead LEFT OUTER JOIN "
		  "     shipchrg ON (shiphead_shipchrg_id=shipchrg_id) "
		  "WHERE ( (NOT shiphead_shipped)"
		  " AND (shiphead_id=:shiphead_id));" );
    shipq.bindValue(":shiphead_id", _shipment->id());
    shipq.exec();
    if (shipq.first())
    {
      _shipVia->setText(shipq.value("shiphead_shipvia").toString());
      ordertype = shipq.value("shiphead_order_type").toString();

      if (shipq.value("custfreight").toBool())
      {
	_freight->setEnabled(TRUE);
	_freight->set(shipq.value("shiphead_freight").toDouble(),
		      shipq.value("shiphead_freight_curr_id").toInt(),
		      shipq.value("effective").toDate(), false);
      }
      else
      {
	_freight->setEnabled(FALSE);
	_freight->set(0,
		      shipq.value("shiphead_freight_curr_id").toInt(),
		      shipq.value("effective").toDate());
      }
    }
    else if (shipq.lastError().type() != QSqlError::None)
    {
      systemError(this, shipq.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }
    else
    {
      QMessageBox::warning(this, tr("Shipment/Order mismatch"),
			   tr("<p>Shipment #%1 either is not part of "
			      "Order #%2 or has already shipped. Please change "
			      "either the Order # or Shipment #.")
			     .arg(_shipment->number())
			     .arg(_soNumber->text()));
      _shipment->clear();
      _shipment->setEnabled(false);
      return;
    }

    ParameterList itemp;
    itemp.append("ordertype", ordertype);
    if (ordertype == "SO")
      itemp.append("sohead_id", _soNumber->id());
    else if (ordertype == "TO")
      itemp.append("tohead_id", _toNumber->id());

    QString items = "<? if exists(\"sohead_id\") ?>"
		 "SELECT coitem_id,"
		 "       coitem_linenumber, item_number,"
		 "       (item_descrip1 || ' ' || item_descrip2) AS itemdescrip,"
		 "       uom_name,"
		 "       formatQty(SUM(shipitem_qty)) "
		 "FROM coitem, shiphead, shipitem, itemsite, item, uom "
		 "WHERE ( (shipitem_orderitem_id=coitem_id)"
		 " AND (shipitem_shiphead_id=shiphead_id)"
		 " AND (NOT shiphead_shipped)"
		 " AND (shiphead_order_type=<? value(\"ordertype\") ?>)"
		 " AND (coitem_itemsite_id=itemsite_id)"
		 " AND (itemsite_item_id=item_id)"
                 " AND (item_inv_uom_id=uom_id)"
		 " AND (shiphead_order_id=<? value(\"sohead_id\") ?>) ) "
		 "GROUP BY coitem_id, coitem_linenumber, item_number,"
		 "         uom_name, itemdescrip;"
		 "<? elseif exists(\"tohead_id\") ?>"
		 "SELECT toitem_id,"
		 "       toitem_linenumber, item_number,"
		 "       (item_descrip1 || ' ' || item_descrip2) AS itemdescrip,"
		 "       uom_name,"
		 "       formatQty(SUM(shipitem_qty)) "
		 "FROM toitem, shiphead, shipitem, item, uom "
		 "WHERE ( (shipitem_orderitem_id=toitem_id)"
		 " AND (shipitem_shiphead_id=shiphead_id)"
		 " AND (NOT shiphead_shipped)"
		 " AND (shiphead_order_type=<? value(\"ordertype\") ?>)"
		 " AND (toitem_item_id=item_id)"
                 " AND (item_inv_uom_id=uom_id)"
		 " AND (shiphead_order_id=<? value(\"tohead_id\") ?>) ) "
		 "GROUP BY toitem_id, toitem_linenumber, item_number,"
		 "         uom_name, itemdescrip;"
		 "<? endif ?>" ;
    MetaSQLQuery itemm(items);
    shipq = itemm.toQuery(itemp);
    _coitem->populate(shipq);
    if (shipq.lastError().type() != QSqlError::None)
    {
      systemError(this, shipq.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }
    
    QString vals = "<? if exists(\"sohead_id\") ?>"
	    "SELECT formatMoney(SUM(round(shipitem_qty * coitem_price / iteminvpricerat(item_id),2))) AS f_value "
	    "FROM coitem, shiphead, shipitem, itemsite, item "
	    "WHERE ( (shipitem_orderitem_id=coitem_id)"
	    " AND (shipitem_shiphead_id=shiphead_id)"
	    " AND (NOT shiphead_shipped)"
	    " AND (shiphead_order_type='SO')"
	    " AND (coitem_itemsite_id=itemsite_id)"
	    " AND (itemsite_item_id=item_id)"
	    " AND (shiphead_order_id=<? value(\"sohead_id\") ?>) );"
	    "<? elseif exists(\"tohead_id\") ?>"
	    "SELECT formatMoney(SUM(toitem_stdcost * shipitem_qty)) AS f_value "
	    "FROM toitem, shiphead, shipitem "
	    "WHERE ((shipitem_orderitem_id=toitem_id)"
	    "  AND  (shipitem_shiphead_id=shiphead_id)"
	    "  AND  (NOT shiphead_shipped)"
	    "  AND  (shiphead_order_type='TO')"
	    "  AND  (shiphead_order_id=<? value(\"tohead_id\") ?>) );"
	    "<? endif ?>" ;
    MetaSQLQuery valm(vals);
    shipq = valm.toQuery(itemp);	// shared parameters
    if(shipq.first())
      _shipValue->setText(shipq.value("f_value").toString());
    else if (shipq.lastError().type() != QSqlError::None)
    {
      systemError(this, shipq.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }
  }
  else
  {
    _billToName->clear();
    _shipToName->clear();
    _shipToAddr1->clear();
    _freight->setEnabled(TRUE);
    _freight->reset();
    _shipVia->clear();
    _tracknum->clear();
    _shipment->clear();
    _shipment->setEnabled(false);
  }
}

void shipOrder::sSelectToggled( bool yes )
{
  if(!yes && _create->isChecked())
    _create->setChecked(false);
}

void shipOrder::sCreateToggled( bool yes )
{
  if(yes && !_select->isChecked())
    _select->setChecked(true);
}

// TODO: add cosmisc_id to shipdata and shipdatasum tables
// TODO: integrate transfer orders with shipdatasum table
void shipOrder::sFillFreight()
{
  if (_soNumber->isValid())
  {
    XSqlQuery shipdataQ;
    shipdataQ.prepare( "SELECT shipdatasum_base_freight,"
	       "     shipdatasum_shipper || ' - ' || shipdatasum_billing_option AS shipper_data "
	       "FROM shipdatasum, cohead "
	       "WHERE ( (shipdatasum_cohead_number=cohead_number)"
	       " AND (cohead_id=:sohead_id)  "
	       " AND (shipdatasum_cosmisc_tracknum=:tracknum) ) ;");
    shipdataQ.bindValue(":sohead_id", _soNumber->id());
    shipdataQ.bindValue(":tracknum",  _tracknum->currentText());
    shipdataQ.exec();
    if (shipdataQ.first())
    {
      _freight->setEnabled(TRUE);
      _freight->setLocalValue(shipdataQ.value("shipdatasum_base_freight").toDouble());
      _shipVia->setText(shipdataQ.value("shipper_data").toString());
    }
    else if (shipdataQ.lastError().type() != QSqlError::None)
    {
      systemError(this, shipdataQ.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }
  }
}

void shipOrder::sFillTracknum()
{
  if (_toNumber->isValid())
  {
    QMessageBox::warning(this, tr("Not Supported in Transfer Order"),
			 tr("<p>Automatic insertion of Tracking Numbers is "
			    "not yet supported for Transfer Orders."));
    return;
  }

  if (_soNumber->isValid())
  {
    XSqlQuery shipdataQ;
    _tracknum->clear();
    shipdataQ.prepare( "SELECT -2, shipdatasum_cosmisc_tracknum "
		       "FROM shipdatasum, cohead  "
		       "WHERE ( (shipdatasum_cohead_number=cohead_number)"
		       " AND (cohead_id=:sohead_id) "
		       " AND (NOT shipdatasum_shipped) ) "
		       "ORDER BY shipdatasum_lastupdated;" );
    shipdataQ.bindValue(":sohead_id", _soNumber->id());
    shipdataQ.exec();
    _tracknum->populate(shipdataQ);
    if (shipdataQ.lastError().type() != QSqlError::None)
    {
      systemError(this, shipdataQ.lastError().databaseText(), __FILE__, __LINE__);
      return;
    }
  }
}
