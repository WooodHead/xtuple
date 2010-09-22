/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

// change the search_path to ensure existing client code works with overload functions
var qry = toolbox.executeQuery("SHOW search_path;", new Object);
if (! qry.first())
  toolbox.messageBox("critical", mainwindow, qsTr("Initialize te failed"),
                     qsTr("Failed to initialize the te package. "
                        + "This functionality may not work correctly. ")
                        .arg(qry.lastError().databaseText));
else
{
  // If the search path is empty set the base value to public
  var search_path = qry.value("search_path");
  if(search_path == "")
  {
    search_path = "public";
  }

  // Prepend xtmfg to the existing search path.
  qry = toolbox.executeQuery("SET search_path TO te, " + search_path + ";", new Object);
  if(!qry.isActive())
  {
    toolbox.messageBox("critical", mainwindow, qsTr("Initialize xtmfg failed"),
                       qsTr("Failed to initialize the te package. This "
                          + "functionality may not work correctly. %1")
                          .arg(qry.lastError().databaseText));
  }
}

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
