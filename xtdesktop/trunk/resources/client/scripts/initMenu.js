/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
debugger;
// Import code from related scripts
include("dockBankBal");
include("dockExtensions");
include("dockGLAccounts")
include("dockMfgActive");
include("dockMfgHist");
include("dockMfgOpen");
include("dockMyAccounts");
include("dockMyContacts");
include("dockMyTodo");
include("dockPayables");
include("dockPurchActive");
include("dockPurchHist");
include("dockPurchOpen");
include("dockReceivables");
include("dockSalesActive");
include("dockSalesHistory");
include("dockSalesOpen");
include("dockUserOnline");

var _desktopStack;
var _open = qsTr("Open...");
var _dtTimer;
var _leftAreaDocks = new Array();
var _bottomAreaDocks = new Array();
var _hasSavedState = settingsValue("hasSavedState").length > 0;
var _vToolBar;
var _vToolBarActions = new Array();
var _menuDesktop = new QMenu(mainwindow);

// Add desktop to main window
if (mainwindow.showTopLevel())
{
  // Set up refresh timer
  _dtTimer = new QTimer(mainwindow);
  _dtTimer.setInterval(metrics.value("desktop/timer"));
  _dtTimer.start();

  // Intialize the left toolbar
  _vToolBar = new QToolBar(mainwindow);
  _vToolBar.objectName = "_vToolBar";
  _vToolBar.windowTitle = "Desktop Toolbar";
  _vToolBar.floatable = false;
  _vToolBar.movable = false;
  _vToolBar.visible = true;
  _vToolBar.toolButtonStyle = Qt.ToolButtonTextUnderIcon;
  mainwindow.addToolBar(Qt.LeftToolBarArea, _vToolBar);

  // Set the desktop
  // TODO: The QStackedWidget prototype doesn't work for this.  Why?
  //_desktopStack = new QStackedWidget(mainwindow);
  //_desktopStack.objectName = "_desktopStack";

  _desktopStack = toolbox.createWidget("QStackedWidget", mainwindow, "_desktopStack");
  mainwindow.setCentralWidget(_desktopStack);

  // Initialize Desktop
  // Set up browser for home Page
  var _welcome = new QWebView(mainwindow);
  var url = new QUrl(metrics.value("desktop/welcome"));
  _welcome.objectName = "_welcome";
  _welcome["loadFinished(bool)"].connect(loadLocalHtml);
  _welcome.load(url);
  _desktopStack.addWidget(_welcome);
  addToolBarAction(qsTr("Welcome"), "home_32");
  _vToolBarActions[0].checked = true;

  // Initialize additional desktop UIs and Dock Widgets
  // (Init functions come from the code pulled in by the include statements)
  addDesktop("desktopCRM", "clients_32", "ViewCRMDesktop");
  initDockTodo();
  initDockAccounts();
  initDockMyCntcts();

  addDesktop("desktopSales", "reward_32", "ViewSalesDesktop");
  initDockSalesAct();
  initDockSalesHist();
  initDockSalesOpen();

  addDesktop("desktopAccounting", "accounting_32", "ViewAccountingDesktop");
  initDockPayables();
  initDockReceivables();
  initDockBankBal();
  initDockGLAccounts();

  addDesktop("desktopPurchase", "order_32", "ViewPurchaseDesktop");
  initDockPurchAct();
  initDockPurchHist();
  initDockPurchOpen();

  addDesktop("desktopManufacture", "industry_32", "ViewManufactureDesktop");
  initDockMfgAct();
  initDockMfgHist();
  initDockMfgOpen();

  addDesktop("desktopMaintenance", "gear_32", "ViewMaintenanceDesktop");
  initDockExtensions();
  initDockUserOnline();

  // Change behavior of item site button if commercial edition
  if (!metrics.value("Application") != "PostBooks")
  {
    var button = mainwindow.findChild("_sites");
    button.label = qsTr("Sites");
    button.actionName = "im.warehouses";
  }
}
else
{
  if (!preferences.boolean("NoDesktopNotice"))
    toolbox.openWindow("desktopNotice",mainwindow, Qt.WindowModal, Qt.Dialog);
}

/*!
  Adds screen with name of \a uiName to the desktop stack so long as the user has
  been granted the privilege a\ privName. The a\ windowTitle of the UI object is 
  added to the Desktop Dock so that when it is clicked, the associated window is 
  selected on the Desktop.
*/
function addDesktop(uiName, imageName, privilege)
{
  // Get the UI and add to desktop stack
  var desktop = toolbox.loadUi(uiName);
  _desktopStack.addWidget(desktop);
  addToolBarAction(desktop.windowTitle, imageName, privilege);

  return desktop;
}

/*!
  Add a buttun with \a label and \a imageName to the left desktop toolbar
*/
function addToolBarAction(label, imageName, privilege)
{
  // Get the icon
  var icn = new QIcon();
  icn.addDbImage(imageName);

  // Create the action (add to menu not seen to ensure priv rescans work)
  var act = _menuDesktop.addAction(icn, label);
  act.checkable = true;
  if (privilege)
  {
    act.setEnabled(privileges.check(privilege));
    act.setData(privilege);
  }

  // Add to toolbar
  _vToolBar.addAction(act);
  _vToolBarActions[_vToolBarActions.length] = act;
  _vToolBar["actionTriggered(QAction*)"].connect(toolbarActionTriggered);
}

/*!
  Loads a local HTML page from the database if the xTuple weclome page
  fails to load.
*/
function loadLocalHtml(ok)
{
  if (ok) // Successful load of xTuple page so exit
    return;

  var q = toolbox.executeQuery("SELECT xtdesktop.fetchWelcomeHtml() AS html");
  q.first();
  _welcome.setHtml(q.value("html"));
}

function toolbarActionTriggered(action)
{
  // Move to the desktop page specified
  for (i in _vToolBarActions)
  {
    if (_vToolBarActions[i] == action)
      _desktopStack.currentIndex = i
    else
      _vToolBarActions[i].checked = false;
  }
}

