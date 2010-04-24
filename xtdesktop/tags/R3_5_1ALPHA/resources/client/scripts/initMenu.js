/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

// Import code from related scripts
include("dockBankBal");
include("dockDesktop");
include("dockMyAccounts");
include("dockMyContacts");
include("dockMyTodo");
include("dockPurchActive");
include("dockPurchHist");
include("dockSalesActive");
include("dockSalesHistory");

var _desktopStack;
var _open = qsTr("Open...");
var _dtTimer;
var _leftAreaDocks = new Array();
var _bottomAreaDocks = new Array();
var _hasSavedState = settingsValue("hasSavedState").length > 0;

// Add desktop to main window
if (preferences.value("InterfaceWindowOption") != "Workspace")
{
  // Set up refresh timer
  _dtTimer = new QTimer(mainwindow);
  _dtTimer.setInterval(metrics.value("desktop/timer"));
  _dtTimer.start();

  // Set the desktop
  // TODO: The QStackedWidget prototype doesn't work for this.  Why?
  _desktopStack = toolbox.createWidget("QStackedWidget", mainwindow, "_desktopStack");
  mainwindow.setCentralWidget(_desktopStack);

  // Initialize Desktop Dock
  initDockDesktop();

  // Set up browser for home Page
  var _welcome = new QWebView(mainwindow);
  var url = new QUrl(metrics.value("desktop/welcome"));
  _welcome.objectName = "_welcome";
  _welcome["loadFinished(bool)"].connect(loadLocalHtml);
  _welcome.load(url);
  _desktopStack.addWidget(_welcome);
  var item = new XTreeWidgetItem(_desktopList, 0, "Welcome");

  // Initialize additional desktop UIs
  addDesktop("desktopCRM", "ViewCRMDesktop");
  addDesktop("desktopSales", "ViewSalesDesktop");
  addDesktop("desktopPurchase", "ViewPurchaseDesktop");
  addDesktop("desktopManufacture", "ViewManufactureDesktop");
  addDesktop("desktopAccounting", "ViewAccountingDesktop");

  // Initialize other docks 
  // (These functions come from the code pulled in by the include statements)
  initDockTodo();
  initDockAccounts();
  initDockMyCntcts();
  initDockBankBal();
  initDockSalesAct();
  initDockSalesHist();
  initDockPurchAct();
  initDockPurchHist();

  // Set up default lay out arrangements, user changes will prevail
  // Nest docks
  if (_leftAreaDocks.length > 1)
  {
    for (var i = 0; i < _leftAreaDocks.length - 1; i++)
    {
      var dock1 = _leftAreaDocks[i];
      var dock2 = _leftAreaDocks[i + 1];
      mainwindow.tabifyDockWidget(dock1, dock2);
    }
  }

  if (_bottomAreaDocks.length > 1)
  {
    for (var i = 0; i < _bottomAreaDocks.length - 1; i++)
    {
      var dock1 = _bottomAreaDocks[i];
      var dock2 = _bottomAreaDocks[i + 1];
      mainwindow.tabifyDockWidget(dock1, dock2);
    }
  }

  // Window state will save when application closes so next time we'll have this
  settingsSetValue("hasSavedState", true);
}

/*!
  Adds screen with name of \a uiName to the desktop stack so long as the user has
  been granted the privilege a\ privName. The a\ windowTitle of the UI object is 
  added to the Desktop Dock so that when it is clicked, the associated window is 
  selected on the Desktop.
*/
function addDesktop(uiName, privName)
{
  if (!privileges.check(privName))
    return;

  // Get the UI and add to desktop stack
  var desktop = toolbox.loadUi(uiName);
  var listName = desktop.windowTitle;
  _desktopStack.addWidget(toolbox.loadUi(desktop));

  // Add to the desktop dock
  var id = _desktopList.topLevelItemCount;
  var item = new XTreeWidgetItem(_desktopList, id, listName);
}

function loadLocalHtml(ok)
{
  if (ok) // Successful load of xTuple page so exit
    return;

  var q = toolbox.executeQuery("SELECT fetchWelcomeHtml() AS html");
  q.first();
  _welcome.setHtml(q.value("html"));
}

