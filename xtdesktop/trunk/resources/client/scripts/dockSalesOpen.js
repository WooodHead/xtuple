/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

var _dockSalesOpen;
var _salesOpen;

/*!
  Initializes Open Sales Order dock widget and places it in the main window.
*/
function initDockSalesOpen()
{
  if (!privileges.check("ViewSalesOpenDock"))
    return;

  _dockSalesOpen = mainwindow.findChild("_dockSalesOpen");
  _salesOpen = mainwindow.findChild("_salesOpen");

  // Set columns on list
  _salesOpen.addColumn(qsTr("Order#"), XTreeWidget.orderColumn,  Qt.AlignLeft,   true, "cohead_number");
  _salesOpen.addColumn(qsTr("Customer#"), XTreeWidget.orderColumn,  Qt.AlignLeft,  true, "cust_number");
  _salesOpen.addColumn(qsTr("Status"), XTreeWidget.statusColumn,  Qt.AlignLeft,  true, "status");
  _salesOpen.addColumn(qsTr("Bill To"), -1,  Qt.AlignLeft,  true, "cohead_billtoname");
  _salesOpen.addColumn(qsTr("Bill Contact"), -1,  Qt.AlignLeft,  false, "billto_cntct");
  _salesOpen.addColumn(qsTr("Bill Phone"), -1,  Qt.AlignLeft,  false, "cohead_billto_cntct_phone"); 
  _salesOpen.addColumn(qsTr("Ship To"), -1, Qt.AlignLeft,  true, "cohead_shiptoname");
  _salesOpen.addColumn(qsTr("Ship Contact"), -1,  Qt.AlignLeft,  false, "shipto_cntct");
  _salesOpen.addColumn(qsTr("Ship Phone"), -1,  Qt.AlignLeft,  false, "cohead_shipto_cntct_phone");
  _salesOpen.addColumn(qsTr("Ship Via"), -1,  Qt.AlignLeft,  false, "cohead_shipvia"); 
  _salesOpen.addColumn(qsTr("Sched. Date"), XTreeWidget.dateColumn,  Qt.AlignLeft,  true, "scheddate");
  _salesOpen.addColumn(qsTr("Amount"), XTreeWidget.moneyColumn,  Qt.AlignRight,  true, "amount");

  // Connect Signals and Slots
  _dtTimer.timeout.connect(fillListSalesOpen);
  mainwindow.invoicesUpdated.connect(fillListSalesOpen);
  mainwindow.salesOrdersUpdated.connect(fillListSalesOpen);

  _salesOpen.itemSelected.connect(openWindowSalesOpen);
  _salesOpen["populateMenu(QMenu*,XTreeWidgetItem*,int)"]
    .connect(populateMenuSalesOpen);

  _dockSalesOpen.visibilityChanged.connect(fillListSalesOpen);

  if (!_hasSavedState)
    fillListSalesOpen();
}

/*!
  Fills the list with open sales data.
*/
function fillListSalesOpen()
{
  _dockSalesOpen = mainwindow.findChild("_dockSalesOpen");
  _salesOpen = mainwindow.findChild("_salesOpen");

  if (!_dockSalesOpen.visible)
    return;

  _salesOpen.populate(toolbox.executeDbQuery("desktop","salesOpen"));
}

/*! 
  Opens the window associated with the selected item.
*/
function openWindowSalesOpen()
{ 
  // Make sure we can open the window for this activity
  if (!privilegeCheckSalesOpen)
    return;

  params = new Object;
  params.sohead_id = _salesOpen.id;
  if (privileges.check("MaintainSalesOrders"))
    params.mode = "edit";
  else
    params.mode = "view";

  // Open the window and perform any handling required
  toolbox.openWindow("salesOrder");
  toolbox.lastWindow().set(params);
}

/*!
  Adds actions to \a pMenu, typically from a right click on a Sales Order item.
*/
function populateMenuSalesOpen(pMenu, pItem)
{
  var menuItem;
  var enable = privilegeCheckSalesOpen();

  menuItem = toolbox.menuAddAction(pMenu, _open, enable);
  menuItem.triggered.connect(openWindowSalesOpen);
}

/*!
  Returns whether user has privileges to view detail on the selected Sales Order.
*/
function privilegeCheckSalesOpen()
{
  return privileges.check("ViewSalesOrders") || 
         privileges.check("MaintainSalesOrders");

  return false;
}