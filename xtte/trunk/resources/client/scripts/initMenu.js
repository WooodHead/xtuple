/*
 * This file is part of the xtte package for xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

include("xtte");
xtte.initMenu = new Object;

// Define menu and action variables
var crmMenu = mainwindow.findChild("menu.crm.projects");
crmMenu.addSeparator();

var tesheetAction = crmMenu.addAction(qsTr("Time and Expense..."), mainwindow);
tesheetAction.objectName = "pm.teSheets";
tesheetAction.setData("MaintainTimeExpense");
tesheetAction.enabled = privileges.value("MaintainTimeExpense");

var crmRptMenu = mainwindow.findChild("menu.crm.reports");
var orderActPrj = mainwindow.findChild("pm.dspOrderActivityByProject");

var historyAction = new QAction(qsTr("Time and Expense History"), mainwindow);
historyAction.objectName = "pm.teHistory";
historyAction.setData("ViewTimeExpenseHistory");
historyAction.enabled = privileges.value("ViewTimeExpenseHistory");
crmRptMenu.insertAction(orderActPrj, historyAction);

// Define function(s)
xtte.initMenu.openSheets = function()
{
  toolbox.openWindow("timeExpenseSheets");
}

xtte.initMenu.openHistory = function()
{
  toolbox.openWindow("dspTimeExpenseHistory");
}

// Connect Actions
tesheetAction.triggered.connect(xtte.initMenu.openSheets);
historyAction.triggered.connect(xtte.initMenu.openHistory);
