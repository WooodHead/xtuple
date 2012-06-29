var _b1MessageHistory;
var _b2MessageHistory;
var _dockMessageHistory;
var _messageHistory;
var _limitmessageHistory;
var _messageHistoryIsDirty = true;
var _periodId = -1;

function initDockMessageHistory()
{  
  // Set up objects
  _dockMessageHistory = mainwindow.findChild("_dockMessageHistory");
  _messageHistory     = mainwindow.findChild("_messageHistory");

  _b1MessageHistory = _dockMessageHistory.findChild("_button3");
  _b2MessageHistory = _dockMessageHistory.findChild("_button4");

  // Set icons
  var iReload = new QIcon;
  iReload.addDbImage("reload_16");
  _b1MessageHistory.icon = iReload;
  _b1MessageHistory.text = "";
  _b1MessageHistory.toolTip = qsTr("Reload");

  var iGear = new QIcon();
  iGear.addDbImage("gear_16");
  _b2MessageHistory.icon = iGear;
  _b2MessageHistory.text = "";
  _b2MessageHistory.toolTip = qsTr("Preferences...");

  // Set columns on list
  _messageHistory.addColumn("Date",    75, 1, true, "sent");
  _messageHistory.addColumn("From",    75, 1, true, "from");
  _messageHistory.addColumn("To",      75, 1, true, "to")
  _messageHistory.addColumn("Message", -1, 1, true, "message");

  // Connect Signals and Slots
  _b1MessageHistory.clicked.connect(refreshMessageHistory);
  _b2MessageHistory.clicked.connect(preferencesMessageHistory);

  _messageHistory["populateMenu(QMenu*,XTreeWidgetItem*,int)"]
    .connect(populateMenuMessageHistory);
  _messageHistory["itemDoubleClicked(QTreeWidgetItem*, int)"].connect(myOpen);

  mainwindow["tick()"].connect(refreshMessageHistory);

  // Don't show if no privs
  var act = _dockMessageHistory.toggleViewAction();
  if (!privileges.check("viewMsgHistoryDock"))
  {  
    _dockMessageHistory.hide();
    act.enabled = false;
  }
  else
  {
    _dockMessageHistory.show();
    act.enabled = true;
  }

  // Allow rescan to let them show if privs granted
  act.setData("viewMsgHistoryDock");
  _menuDesktop.appendAction(act);

  fillListMessageHistory();
}

function fillListMessageHistory()
{
  _dockMessageHistory = mainwindow.findChild("_dockMessageHistory");
  _messageHistory     = mainwindow.findChild("_messageHistory");

  _messageHistory.clear();

  var params = new Object;
  params.limit = _limitmessageHistory;

  _messageHistory.populate(toolbox.executeDbQuery("desktop","messageHistory", params));
  _messageHistoryIsDirty = false;
}

function populateMenuMessageHistory(pMenu)
{
  try
  {
  	var menuItem = toolbox.menuAddAction(pMenu, qsTr("Open..."), true);
    menuItem.triggered.connect(myOpen);
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockMessageHistory",
                         "populateMenuMessageHistory exception: " + e);
  }
}

function preferencesMessageHistory()
{
  try
  {
    params = new Object;
    params.path = "desktop/messageHistory";
    params.limit = _limitmessageHistory;
    var newdlg = toolbox.openWindow("preferencesNumber", mainwindow,
                                     Qt.ApplicationModal, Qt.Dialog);
    toolbox.lastWindow().set(params);
    if (newdlg.exec())
    {
      loadPreferencesMessageHistory();
      refreshMessageHistory();
    }
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockMessageHistory",
                         "preferencesMessageHistory exception: " + e);
  }
}

function loadPreferencesMessageHistory()
{
  // Load preferences
  _limitmessageHistory = preferences.value("desktop/messageHistory/limit");
}

/*!
  Refreshes data if the window is visible, or the next time it becomes visible
*/
function refreshMessageHistory()
{
  try
  {
  	_messageHistoryIsDirty = true;
    fillListMessageHistory();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockMessageHistory",
                         "refreshMessageHistory exception: " + e);
  }
}

function myOpen()
{
  try
  {
    var params = new Object;
    params.msg_id = _messageHistory.id();
    var q = "SELECT msguser_id "
          + "FROM msguser "
          + "WHERE (msguser_msg_id = <? value(\"msg_id\") ?>);";
    var data = toolbox.executeQuery(q, params);
    if (data.first())
      params.msguser_id = data.value("msguser_id");
    else if (data.lastError().type != QSqlError.NoError)
    {
      QMessageBox.critical(mainwindow, qsTr("Database Error"),
                           data.lastError().text);
      return;
    }

    params.mode = "acknowledge";
    var newwnd = toolbox.openWindow("systemMessage", mainwindow, Qt.ApplicationModal, Qt.Dialog);
    toolbox.lastWindow().set(params);
    newwnd.exec();
    refreshMessageHistory();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockMessageHistory",
                         "myOpen exception: " + e);
  }
}