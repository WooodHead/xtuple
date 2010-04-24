/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

var _dockMyaccounts;
var _accountList;

/*!
  Initializes the My Accounts dock widget and places it in the main window.
*/
function initDockAccounts()
{
  if (!privileges.check("ViewMyAccountsDock"))
    return;

  _dockMyaccounts = toolbox.loadUi("dockList").findChild("_dockList");
  _dockMyaccounts.objectName = "_dockMyacconuts";
  _dockMyaccounts.windowTitle = qsTr("My Accounts");
  mainwindow.addDockWidget(0x8,_dockMyaccounts);

  // Set columns on list
  _accountList = _dockMyaccounts.findChild("_list");
  _accountList.objectName = "_accountList";
  _accountList.addColumn(qsTr("Number"), XTreeWidget.itemColumn, Qt.AlignLeft,  true, "crmacct_number");
  _accountList.addColumn(qsTr("Name"), -1, Qt.AlignLeft,  true, "crmacct_name");
  _accountList.addColumn(qsTr("Contact"), -1, Qt.AlignLeft  , true, "cntct_name" );
  _accountList.addColumn(qsTr("Phone"), -1, Qt.AlignLeft, true, "cntct_phone" );
  _accountList.addColumn(qsTr("Email"), -1, Qt.AlignLeft, true, "cntct_email" );
  _accountList.addColumn(qsTr("Address"), -1, Qt.AlignLeft  , false, "addr_line1" );
  _accountList.addColumn(qsTr("City"), XTreeWidget.docTypeColumn, Qt.AlignLeft  , false, "addr_city" );
  _accountList.addColumn(qsTr("State"), XTreeWidget.orderColumn, Qt.AlignLeft  , false, "addr_state" );
  _accountList.addColumn(qsTr("Country"), XTreeWidget.orderColumn, Qt.AlignLeft  , false, "addr_country" );
  _accountList.addColumn(qsTr("Postal Code"), XTreeWidget.docTypeColumn, Qt.AlignLeft  , false, "addr_postalcode" );

  // Connect signals and slots
  mainwindow.crmAccountsUpdated.connect(fillListMyAccts);

  _accountList.itemSelected.connect(openWindowMyAccts);
  _accountList["populateMenu(QMenu*,XTreeWidgetItem*,int)"]
    .connect(populateMenuMyAccts);

  // Add to array to tabify later if need be
  _bottomAreaDocks[_bottomAreaDocks.length]=_dockMyaccounts;

  _dockMyaccounts.visibilityChanged.connect(fillListMyAccts);

  if (!_hasSavedState)
    fillListMyAccts();
}

/*!
  Fills the My Accounts list with CRM Accounts owned by the current user.
*/
function fillListMyAccts()
{
  if (!_dockMyaccounts.visible)
    return;

  params = new Object;
  params.owner_username = mainwindow.username();
  _accountList.populate(toolbox.executeDbQuery("desktop", "crmaccounts", params));
}

/*! 
  Opens the window associated with the selected item.
*/
function openWindowMyAccts()
{
  // Make sure we can open the window
  if (!privilegeCheckMyAccts())
    return;

  // Determine which contact to open
  params = new Object;
  params.crmacct_id = _accountList.id();
  if (privileges.check("MaintainCRMAccounts"))
    params.mode = "edit"
  else
    params.mode = "view"

  // Open the window and perform any special handling required
  var win = toolbox.openWindow("crmaccount");
  win.set(params);
}

/*!
  Adds actions to \a pMenu, typically from a right click on My Contacts.
*/
function populateMenuMyAccts(pMenu)
{
  var menuItem;

  menuItem = toolbox.menuAddAction(pMenu, _open, privilegeCheckMyAccts());
  menuItem.triggered.connect(openWindowMyAccts);
}

/*!
  Returns whether user has privileges to view My Contact detail.
*/
function privilegeCheckMyAccts()
{
  return privileges.check("MaintainCRMAccounts") ||
         privileges.check("ViewCRMAccounts");
}