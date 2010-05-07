/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

var _dockExtensions;
var _extensions;

/*!
  Initializes Extensions dock widget and places it in the main window.
*/
function initDockExtensions()
{
  _dockExtensions = mainwindow.findChild("_dockExtensions");
  _extensions = mainwindow.findChild("_extensions");

  // Set columns on list
  _extensions.addColumn(qsTr("Name"), -1, Qt.AlignLeft, true, "pkgitem_name");
  _extensions.addColumn(qsTr("Description"), -1, Qt.AlignLeft,  true, "pkgitem_descrip");

  // Connect Signals and Slots
  _dtTimer.timeout.connect(fillListExtensions);

  _extensions.itemSelected.connect(openWindowExtensions);
  _extensions["populateMenu(QMenu*,XTreeWidgetItem*,int)"]
    .connect(populateMenuExtensions);

  _dockExtensions.visibilityChanged.connect(fillListExtensions);

  // Handle privilge control
  var act = _dockExtensions.toggleViewAction();

  // Don't show if no privs
  if (!privileges.check("ViewExtensionsDock"))
  {
    _dockExtensions.hide();
    act.enabled = false;
  }

  // Allow rescan to let them show if privs granted
  act.setData("ViewExtensionsDock");
  _menuDesktop.appendAction(act);
}

/*!
  Fills the list with active sales data.
*/
function fillListExtensions()
{
  _dockExtensions = mainwindow.findChild("_dockExtensions");
  _extensions = mainwindow.findChild("_extensions");

  if (!_dockExtensions.visible)
    return;

  var params = new Object;
  params.script = qsTr("Scripts");
  params.cmd = qsTr("Custom Commands");
  params.function = qsTr("Stored Procedures");
  params.trigger = qsTr("Triggers");
  params.image = qsTr("Images");
  params.metasql = qsTr("MetaSQL");
  params.priv = qsTr("Privileges");
  params.report = qsTr("Reports");
  params.schema = qsTr("Schema");
  params.table = qsTr("Tables");
  params.uiform = qsTr("Screens");
  params.view = qsTr("Views");
  params.folder = qsTr("Folder");
  params.client = qsTr("Client");
  params.database = qsTr("Database");

  _extensions.populate(toolbox.executeDbQuery("desktop","pkgItems", params))
}

/*! 
  Opens the window associated with the selected item.
*/
function openWindowExtensions()
{
  var ui;
  var run = false;
  var act = _extensions.currentItem().rawValue("activity");
  
  // Make sure we can open the window for this activity
  if (!privilegeCheckExtensions(act))
    return;

  // Determine which window to open
  if (act == "Q")
  {
    ui = "quotes";
    run = true;
  }
  else if (act == "O")
  {
    ui = "openSalesOrders";
    run = true;
  }
  else if (act == "P")
    ui = "packingListBatch";
  else if (act == "S")
  {
    ui = "maintainShipping";
    run = true;
  }
  else if (act == "B")
    ui = "uninvoicedShipments";
  else if (act == "I")
    ui = "dspBillingSelections";
  else if (act == "T")
    ui = "unpostedInvoices";

  // Open the window and perform any handling required
  toolbox.openWindow(ui);
  if (run)
    toolbox.lastWindow().sFillList();
}

/*!
  Adds actions to \a pMenu, typically from a right click on a Sales Activity item.
*/
function populateMenuExtensions(pMenu, pItem)
{
  var menuItem;
  var act = pItem.rawValue("activity");
  var enable = privilegeCheckExtensions(act);

  menuItem = toolbox.menuAddAction(pMenu, _open, enable);
  menuItem.triggered.connect(openWindowExtensions);
}

/*!
  Returns whether user has privileges to view detail on the selected Sales Activity.
*/
function privilegeCheckExtensions(act)
{
  if (act == "Q") // Quote
    return privileges.check("ViewQuotes") || 
           privileges.check("MaintainQuotes")
  else if (act == "O") // Open Sales Orders
    return privileges.check("ViewSalesOrders") || 
           privileges.check("MaintainSalesOrders");
  else if (act == "P") // Packlist Batch
    return privileges.check("ViewPackingListBatch") || 
           privileges.check("MaintainPackingListBatch");
  else if (act == "S") // Shipping
    return privileges.check("ViewShipping");
  else if (act == "B" || 
           act == "I" || 
           act == "T") // Billing, Invoicing
    return privileges.check("SelectBilling");

  return false;
}
