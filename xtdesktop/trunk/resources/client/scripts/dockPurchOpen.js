/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

var _dockPurchOpen;
var _purchOpen;

/*!
  Initializes Open Purchase Order dock widget and places it in the main window.
*/
function initDockPurchOpen()
{
  if (!privileges.check("ViewPurchaseOpenDock"))
    return;

  _dockPurchOpen = mainwindow.findChild("_dockPurchOpen");
  _purchOpen = mainwindow.findChild("_purchOpen");

  // Set columns on list
  _purchOpen.addColumn(qsTr("Order#"), XTreeWidget.orderColumn, Qt.AlignLeft, true, "pohead_number");
  _purchOpen.addColumn(qsTr("Vendor#"), XTreeWidget.orderColumn, Qt.AlignLeft, true, "vend_number");
  _purchOpen.addColumn(qsTr("Name"), -1,  Qt.AlignLeft, true, "vend_name");
  _purchOpen.addColumn(qsTr("Contact"), -1,  Qt.AlignLeft, true, "vend_cntct");
  _purchOpen.addColumn(qsTr("Phone"), -1,  Qt.AlignLeft, true, "pohead_vend_cntct_phone"); 
  _purchOpen.addColumn(qsTr("Status"), -1, Qt.AlignLeft,  true, "status");
  _purchOpen.addColumn(qsTr("Ship Contact"), -1,  Qt.AlignLeft, false, "shipto_cntct");
  _purchOpen.addColumn(qsTr("Ship Phone"), -1,  Qt.AlignLeft, false, "pohead_shipto_cntct_phone"); 
  _purchOpen.addColumn(qsTr("Ship Via"), -1,  Qt.AlignLeft, true, "pohead_shipvia"); 
  _purchOpen.addColumn(qsTr("Due Date"), XTreeWidget.dateColumn,  Qt.AlignLeft,  true, "duedate");
  _purchOpen.addColumn(qsTr("Amount"), XTreeWidget.moneyColumn,  Qt.AlignRight,  true, "amount");

  // Connect Signals and Slots
  _dtTimer.timeout.connect(fillListPurchOpen);
  mainwindow.purchaseOrderReceiptsUpdated.connect(fillListPurchOpen);
  mainwindow.purchaseOrdersUpdated.connect(fillListPurchOpen);

  _purchOpen.itemSelected.connect(openWindowPurchOpen);
  _purchOpen["populateMenu(QMenu*,XTreeWidgetItem*,int)"]
    .connect(populateMenuPurchOpen);

  _dockPurchOpen.visibilityChanged.connect(fillListPurchOpen);

  if (!_hasSavedState)
    fillListPurchOpen();
}

/*!
  Fills the list with open purchase data.
*/
function fillListPurchOpen()
{
  _dockPurchOpen = mainwindow.findChild("_dockPurchOpen");
  _purchOpen = mainwindow.findChild("_purchOpen");

  if (!_dockPurchOpen.visible)
    return;

  var params = new Object;
  params.open = qsTr("Open");
  params.unreleased = qsTr("Unreleased");

  _purchOpen.populate(toolbox.executeDbQuery("desktop","purchOpen",params));
}

/*! 
  Opens the window associated with the selected item.
*/
function openWindowPurchOpen()
{ 
  // Make sure we can open the window for this activity
  if (!privilegeCheckPurchOpen)
    return;

  params = new Object;
  params.pohead_id = _purchOpen.id;
  if (privileges.check("MaintainPurchaseOrders"))
    params.mode = "edit";
  else
    params.mode = "view";

  // Open the window and perform any handling required
  toolbox.openWindow("purchaseOrder");
  toolbox.lastWindow().set(params);
}

/*!
  Adds actions to \a pMenu, typically from a right click on a Purchase Order item.
*/
function populateMenuPurchOpen(pMenu, pItem)
{
  var menuItem;
  var enable = privilegeCheckPurchOpen();

  menuItem = toolbox.menuAddAction(pMenu, _open, enable);
  menuItem.triggered.connect(openWindowPurchOpen);
}

/*!
  Returns whether user has privileges to view detail on the selected Purchase Order.
*/
function privilegeCheckPurchOpen()
{
  return privileges.check("ViewPurchaseOrders") || 
         privileges.check("MaintainPurchaseOrders");

  return false;
}
