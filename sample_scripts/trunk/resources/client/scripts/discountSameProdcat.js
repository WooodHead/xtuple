/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
function calculateDiscount()
{
  var discountWidget = mywindow.findChild("_discountFromCust");
  var discount = discountWidget.text;
  // if the discount is greater than 50% then do not bother
  if(discount >= 50)
    return;

  var orderNumber = mywindow.findChild("_orderNumber").text;
  var lineNumber = mywindow.findChild("_lineNumber").text;

  var params = new Object;
  params.orderNumber = orderNumber;
  params.lineNumber = lineNumber;
  params.item_id = mywindow.findChild("_itemNumber").id();

  var qry = toolbox.executeQuery("SELECT count(*) AS result"
                                +"  FROM coitem JOIN cohead ON (coitem_cohead_id=cohead_id)"
                                +"  JOIN itemsite ON (coitem_itemsite_id=itemsite_id)"
                                +"  JOIN item ON (itemsite_item_id=item_id)"
                                +"  JOIN (SELECT item_prodcat_id AS prodcat_id"
                                +"          FROM item"
                                +"         WHERE(item_id = <? value('item_id') ?>)) AS prodcat ON (item_prodcat_id=prodcat_id)"
                                +" WHERE((coitem_linenumber != <? value('lineNumber') ?>)"
                                +"   AND (cohead_number = <? value('orderNumber') ?>));", params);
  if(!qry.first())
  {
    QMessageBox.critical(mywindow, qsTr("Query Failed"),
                         qsTr("There was an error querying the database: %1") + qry.lastError().text);
    return;
  }

  var result = qry.value("result");
  if(result <= 0)
    return;

  discountWidget.text = "50";
  mywindow.sCalculateFromDiscount();
}

mywindow.findChild("_qtyOrdered").editingFinished.connect(calculateDiscount);
