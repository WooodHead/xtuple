//debugger;

var _save  = mywindow.findChild("_save");
var layout = toolbox.widgetGetLayout(_save);
var _user  = mywindow.findChild("_user");

var _reply = toolbox.createWidget("QPushButton", mywindow, "_reply");
_reply.text = qsTr("Reply");
toolbox.layoutBoxInsertWidget(layout, 0, _reply);

_reply.clicked.connect(sendReply);

function sendReply() 
{
  var params = new Object;
  params.user = _user.text;

  var newwnd = toolbox.openWindow("sendMessageToUser", mywindow, Qt.ApplicationModal, Qt.Dialog);
  toolbox.lastWindow().set(params);
  newwnd.exec();
  mydialog.accept();
}