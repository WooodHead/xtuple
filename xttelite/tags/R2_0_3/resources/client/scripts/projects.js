/*
 * This file is part of the xtte package for xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

include("xtte");
xtte.projects = new Object;

xtte.projects.init = function()
{
  mywindow.setMetaSQLOptions("projects","detailte");

  var _list = mywindow.list();

  _list.addColumn("Assigned To", -1, Qt.AlignLeft, true, "prj_username");
  _list.addColumn("Budget Hrs.", -1, Qt.AlignLeft, true, "budget_hrs");
  _list.addColumn("Actual Hrs.", -1, Qt.AlignLeft, true, "actual_hrs");
  _list.addColumn("Balance Hrs.", -1, Qt.AlignLeft, true, "balance_hrs");

  mywindow.list().populated.disconnect(xtte.projects.init);
  mywindow.sFillList();
}

// TO DO:  We really need to keep the core window from populating first
mywindow.list().populated.connect(xtte.projects.init);



