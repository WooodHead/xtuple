/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

var _dockPurchAct;
var _PurchAct;

/*!
  Initializes Purch Activity dock widget and places it in the main window.
*/
function initDockPurchAct()
{
  if (!privileges.check("ViewPurchaseActivitiesDock"))
    return;

  _dockPurchAct = toolbox.loadUi("dockList").findChild("_dockList");
  _dockPurchAct.windowTitle = qsTr("Purchase Activities");
  _dockPurchAct.objectName = "_dockPurchAct";
  mainwindow.addDockWidget(0x1, _dockPurchAct);

  // Set columns on list
  _purchAct = _dockPurchAct.findChild("_list");
  _purchAct.objectName = "_PurchAct";
  _purchAct.addColumn(qsTr("Type"), -1,  Qt.AlignLeft,   true, "activity");
  _purchAct.addColumn(qsTr("#"), 40,  Qt.AlignRight,  true, "count");
  _purchAct.addColumn(qsTr("Amount"), -1,  Qt.AlignRight,  true, "amount");

  // Connect Signals and Slots
  _dtTimer.timeout.connect(fillListPurchAct);
  mainwindow.purchaseOrdersUpdated.connect(fillListPurchAct);
  mainwindow.purchaseOrderReceiptsUpdated.connect(fillListPurchAct);
  mainwindow.purchaseRequestsUpdated.connect(fillListPurchAct);
  mainwindow.vouchersUpdated.connect(fillListPurchAct);

  _purchAct.itemSelected.connect(openWindowPurchAct);
  _purchAct["populateMenu(QMenu*,XTreeWidgetItem*,int)"]
    .connect(populateMenuPurchAct);

  _dockPurchAct.visibilityChanged.connect(fillListPurchAct);

  // Add to array to tabify later if need be
  _leftAreaDocks[_leftAreaDocks.length]=_dockPurchAct;

  // Hide this initially to reduce clutter
  _dockPurchAct.hide();
}

/*!
  Fills the list with active Purch data.
*/
function fillListPurchAct()
{
  if (!_dockPurchAct.visible)
    return;

  var params = new Object;
  if (!metrics.value("Application") != "PostBooks")
  {
    params.planned = qsTr("Planned");
    params.firmed = qsTr("Firmed");
  }
  params.request = qsTr("Requests");
  params.unreleased = qsTr("Unreleased");
  params.open = qsTr("Open");
  params.receiving = qsTr("At Receiving");
  params.received = qsTr("Received");
  params.vouchered = qsTr("Vouchered");

  _purchAct.populate(toolbox.executeDbQuery("desktop","purchAct", params));
}

/*! 
  Opens the window associated with the selected item.
*/
function openWindowPurchAct()
{
  var ui;
  var run = false;
  var act = _purchAct.currentItem().rawValue("activity");
  
  // Make sure we can open the window for this activity
  if (!privilegeCheckPurchAct(act))
    return;

  // Determine which window to open
  if (act == "L")
    ui = "dspPlannedOrdersByPlannerCode";
  else if (act == "Q")
    ui = "dspPurchaseReqsByPlannerCode";
  else if (act == "U" || act == "O")
    ui = "unpostedPurchaseOrders";
  else if (act == "A")
    ui = "unpostedPoReceipts";
  else if (act == "V")
    ui = "dspUninvoicedReceivings";
  else if (act == "I")
    ui = "openVouchers";

  // Open the window and perform any handling required
  toolbox.openWindow(ui);
  if (act == "L")
  {
    toolbox.lastWindow().findChild("_purchase").forgetful = true;
    toolbox.lastWindow().findChild("_manufacture").forgetful = true;
    toolbox.lastWindow().findChild("_transfer").forgetful = true;
    toolbox.lastWindow().findChild("_purchase").checked = true;
    toolbox.lastWindow().findChild("_manufacture").checked = false;
    toolbox.lastWindow().findChild("_transfer").checked = false;
  }
  if (act == "U" || act == "O") // Set options for open P/O list
  {
    var showUnreleased = toolbox.lastWindow().findChild("_showUnreleased");
    var showOpen = toolbox.lastWindow().findChild("_showOpen");
    showUnreleased.forgetful = true;
    showOpen.forgetful = true;
    if (act == "U")
    {
      showUnreleased.checked = true;
      showOpen.checked = false;
    }
    else
    {
      showUnreleased.checked = false;
      showOpen.checked = true;
    }
  }
  else if (act == "L" || act == "Q" || act == "V") 
  {
    toolbox.lastWindow().findChild("_warehouse").setAll();
    toolbox.lastWindow().sFillList();
  }
}

/*!
  Adds actions to \a pMenu, typically from a right click on a Purch Activity item.
*/
function populateMenuPurchAct(pMenu, pItem)
{
  var menuItem;
  var act = pItem.rawValue("activity");
  var enable = privilegeCheckPurchAct(act);

  menuItem = toolbox.menuAddAction(pMenu, _open, enable);
  menuItem.triggered.connect(openWindowPurchAct);
}

/*!
  Returns whether user has privileges to view detail on the selected Purch Activity.
*/
function privilegeCheckPurchAct(act)
{
  if (act == "L") // Planned Orders
    return privileges.check("ViewPlannedOrders");
  else if (act == "Q") // Purchase Requests
    return privileges.check("ViewPurchaseRequests");
  else if (act == "U" || act == "O") // Purchase Orders
    return privileges.check("ViewPurchaseOrders") || 
           privileges.check("MaintainPurchaseOrders");
  else if (act == "A") // At Receiving
    return privileges.check("EnterReceipts");
  else if (act == "V") // Unvouchered Receipts
    return privileges.check("ViewUninvoicedReceipts") || 
           privileges.check("MaintainUninvoicedReceipts");
  else if (act == "I") // Unposted Vouchers
    return privileges.check("ViewVouchers") || 
           privileges.check("MaintainVouchers");

  return false;
}
