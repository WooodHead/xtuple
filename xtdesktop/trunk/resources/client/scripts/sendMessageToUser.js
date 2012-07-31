//debugger;

var _usr       = mywindow.findChild("_usr");
var _message   = mywindow.findChild("_message");
var _send      = mywindow.findChild("_send");

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
                            qsTr("You are trying to Send Reply Message to Yourself."
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
  QMessageBox.information(mywindow,'Sent','Message Sent');
  mywindow.close();
}

function set(input)
{
  if ("user" in input)
    _usr.setUsername(input.user);
  else
   QMessageBox.warning(mywindow, "Message", "Could not set username");
}

_usr["newId(int)"].connect(sHandleButtons);
_send.clicked.connect(send);
mywindow.findChild("_close").clicked.connect(mywindow, "close");
