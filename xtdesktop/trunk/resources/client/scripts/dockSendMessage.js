var _dockSendMessage;
var _usr;
var _message;
var _send;
var _sendMessageIsDirty = true;
var _periodId = -1;

function initDockSendMessage()
{
  // Set up objects
  _dockSendMessage = mainwindow.findChild("_dockSendMessage");
  _usr             = mainwindow.findChild("_usr");
  _message         = mainwindow.findChild("_message");
  _send            = mainwindow.findChild("_send");

  // Don't show if no privs
  var act = _dockSendMessage.toggleViewAction();
  if (!privileges.check("viewSendMsgDock"))
  {  
    _dockSendMessage.hide();
    act.enabled = false;
  }
  else
  {
    _dockSendMessage.show();
    act.enabled = true;
  }

  // Allow rescan to let them show if privs granted
  act.setData("viewSendMsgDock");
  _menuDesktop.appendAction(act);

  _usr["newId(int)"].connect(sHandleButtons);
  _send.clicked.connect(send);
}

function getParams()
{
  var params = new Object;

  params.message = _message.plainText;
  if (_usr.id() > 0)
    params.usr_id = _usr.id();

  return params;
}

function sHandleButtons()
{
  var qry = "SELECT usr_id FROM usr WHERE usr_username = current_user;";
  var data = toolbox.executeQuery(qry, -1);
  if (data.first())
    var currenttUsr_id = data.value("usr_id");

  if (currenttUsr_id == _usr.id())
  {
    if (QMessageBox.information(mainwindow, qsTr("Send Message?"),
                            qsTr("You are trying to Send Message to Yourself."
                              +"\nAre you sure that you really want to Continue?."),
           QMessageBox.Yes | QMessageBox.Default, QMessageBox.No | QMessageBox.Escape) == QMessageBox.No)
    {
      _usr.clear();
      return;
    }
    else
      _send.enabled = (_usr.id() >= 0);
  }
  else
    _send.enabled = (_usr.id() >= 0);
}

function send()
{
  var params = getParams();
  var qry = toolbox.executeDbQuery("desktop", "sendMessageToUser", params);
  QMessageBox.information(mainwindow,'Sent','Message Sent');
  clear();
}

function set(input)
{
  if ("user" in input)
    _usr.setUsername(input.user);
  else
   QMessageBox.warning(mywindow, "Message", "Could not set username");
}

function clear()
{
  _usr.clear();
  _message.clear();
}