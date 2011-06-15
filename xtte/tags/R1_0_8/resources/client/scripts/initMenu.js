
function sOpenSheets()
{
  var param = new Object;
  var wind = toolbox.openWindow("tesheet", 0, Qt.NonModal, Qt.Window);
  wind.set(param);
}

// Sale menu references
var saleMenu 	= mainwindow.findChild("menu.sales");
var lookupMenu	= mainwindow.findChild("menu.sales.lookup");

// Retail menu
var teMenu 	= toolbox.menuInsertMenu(saleMenu, lookupMenu, "Time and Expense"); 

// Separator
toolbox.menuInsertSeparator(saleMenu, lookupMenu);

// Open Sheets action
var tesheetAction	= toolbox.menuAddAction(teMenu, "Open Sheets...", 
              		(privileges.value("MaintainTimeExpense")));

tesheetAction.setData("MaintainTimeExpense");
tesheetAction.objectName = "so.listOpenSheets";
tesheetAction.triggered.connect(sOpenSheets);


// Separator
//toolbox.menuAddSeparator(teMenu);



// Remove custom command actions

var tesheetAction	= mainwindow.findChild("custom.tesheet");

var customSalesMenu	= mainwindow.findChild("menu.sales.custom");

/*
toolbox.menuRemove(customSalesMenu,tesheetAction);


// Remove custom menu if no custom commands left
if (!toolbox.menuActionCount(customSalesMenu))
  toolbox.menuRemove(saleMenu,customSalesMenu);

*/