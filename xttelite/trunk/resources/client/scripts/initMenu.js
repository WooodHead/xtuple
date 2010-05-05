// Define menu and action variables
var crmMenu = mainwindow.findChild("menu.crm.projects");
crmMenu.addSeparator();

var tesheetAction = crmMenu.addAction(qsTr("Time and Expense..."), mainwindow);
tesheetAction.objectName = "pm.timesheets";
tesheetAction.setData("MaintainTimeExpense");
tesheetAction.enabled = privileges.value("MaintainTimeExpense");

// Define function(s)
function sOpenSheets()
{
  var param = new Object;
  var wind = toolbox.openWindow("tesheet", mainwindow);
  wind.set(param);
}

// Connect Action(s)
tesheetAction.triggered.connect(sOpenSheets);
