/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

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
  var wind = toolbox.openWindow("timeExpenseSheets", mainwindow);
  wind.set(param);
}

// Connect Action(s)
tesheetAction.triggered.connect(sOpenSheets);
