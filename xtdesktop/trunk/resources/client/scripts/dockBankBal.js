/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

var _dockBankBal;
var _BankBal;

/*!
  Initializes Bank Balance dock widget and places it in the main window.
*/
function initDockBankBal()
{
  if (!privileges.check("ViewBankAccountsDock"))
    return;

  _dockBankBal = toolbox.loadUi("dockList").findChild("_dockList");
  _dockBankBal.windowTitle = qsTr("Bank Accounts");
  _dockBankBal.objectName = "_dockBankBal";
  mainwindow.addDockWidget(0x1, _dockBankBal);

  // Set columns on list
  _bankBal = _dockBankBal.findChild("_list");
  _bankBal.objectName = "_BankBal";
  _bankBal.addColumn(qsTr("Name"), -1,  Qt.AlignLeft,   true, "bankaccnt_name");
  _bankBal.addColumn(qsTr("Balance"), -1,  Qt.AlignRight,  true, "balance");
 // fillListBankBal()

  // Connect Signals and Slots
  _dtTimer.timeout.connect(fillListBankBal);
  mainwindow.bankAdjustmentsUpdated.connect(fillListBankBal);
  mainwindow.cashReceiptsUpdated.connect(fillListBankBal);
  mainwindow.checksUpdated.connect(fillListBankBal);
  mainwindow.glSeriesUpdated.connect(fillListBankBal);

  _bankBal.itemSelected.connect(openWindowBankBal);
  _bankBal["populateMenu(QMenu*,XTreeWidgetItem*,int)"]
    .connect(populateMenuBankBal);

  _dockBankBal.visibilityChanged.connect(fillListBankBal);

  if (!_hasSavedState)
    fillListBankBal();
}

/*!
  Fills the list with active Purch data.
*/
function fillListBankBal()
{
  if (!_dockBankBal.visible)
    return;

  _bankBal.populate(toolbox.executeDbQuery("desktop","bankBal"));
}

/*! 
  Opens the window associated with the selected item.
*/
function openWindowBankBal()
{
  // Make sure we can open the window
  if (!privilegeCheckBankBal())
    return;

  var q = toolbox.executeQuery("SELECT current_date - 30 AS startDate;");
  q.first();

  var params = new Object;
  params.accnt_id = _bankBal.id();
  params.startDate = q.value("startDate");
  params.endDate = mainwindow.dbDate();
  params.run = true;

  // Open the window and perform any handling required
  toolbox.openWindow("dspGLTransactions");
  toolbox.lastWindow().set(params);
}

/*!
  Adds actions to \a pMenu, typically from a right click on a bank account item.
*/
function populateMenuBankBal(pMenu, pItem)
{
  var menuItem;
  var enable = privilegeCheckBankBal();

  menuItem = toolbox.menuAddAction(pMenu, _open, enable);
  menuItem.triggered.connect(openWindowBankBal);
}

/*!
  Returns whether user has privileges to view detail.
*/
function privilegeCheckBankBal(act)
{
  return privileges.check("ViewGLTransactions");
}