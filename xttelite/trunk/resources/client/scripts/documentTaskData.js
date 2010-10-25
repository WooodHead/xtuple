/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

include("xtte");
xtte.documentTaskData = new Object;

var _buttonBox = mywindow.findChild("_buttonBox");
var _time = mywindow.findChild("_time");
var _site = mywindow.findChild("_site");
var _date = mywindow.findChild("_date");
var _item = mywindow.findChild("_item");
var _employee = mywindow.findChild("_employee");
var _tasks = mywindow.findChild("_tasks");

var _convert = _buttonBox.addButton(qsTr("Convert"), QDialogButtonBox.ActionRole);
_convert.enabled = false;

_tasks.addColumn(qsTr("Project#"),		XTreeWidget.orderColumn,Qt.AlignLeft,    true, "prj_number");
_tasks.addColumn(qsTr("Project Name"),	-1,		 Qt.AlignLeft,    true,"prj_name");
_tasks.addColumn(qsTr("Task#"),		XTreeWidget.orderColumn,Qt.AlignLeft,    true, "prjtask_number");
_tasks.addColumn(qsTr("Task Name"),		-1,		 Qt.AlignLeft,    true,"prjtask_name");

xtte.documentTaskData.setColumn = function()
{
  _tasks.columnCount = 4;

  var caption = qsTr("Expense")
  if (_time.checked)
    caption = qsTr("Hours");

  _tasks.addColumn(caption, XTreeWidget.orderColumn,Qt.AlignLeft, true, "value");
}

xtte.documentTaskData.convert = function()
{
  try
  {
    if (!_date.isValid())
      throw new Error(qsTr("Please enter a valid transaction date."));
    if (!_employee.isValid())
      throw new Error(qsTr("Please select a valid Employee."));
    if (!_item.isValid())
      throw new Error(qsTr("Please select a valid Item."));
    if (_site.id() == -1)
      throw new Error(qsTr("Please select a valid Site."));

    var tenumber;
    var teheadid;
    var line = 1;

    toolbox.executeBegin();

    var hparams = new Object;
    hparams.emp_id = _employee.id();
    hparams.warehous_id = _site.id();
    hparams.weekending = _date.date;

    var q = toolbox.executeDbQuery("timeexpensesheet","instehead",hparams);
    if (q.first())
    {
      teheadid = q.value("tehead_id");
      tenumber = q.value("tehead_number");
    }
    else
      throw new Error(qsTr("Unable to create a time and expense header.")); 

    var selected = _tasks.selectedItems();
    for (var i = 0; i < selected.length; i++)
    {
       var params = new  Object;
       params.teitem_tehead_id = teheadid;
       params.teitem_linenumber = line;
       if (_time.checked)
       {
         params.teitem_type = 'T';
         params.time = true;
       }
       else
         params.teitem_type = 'E'
       params.teitem_workdate = _date.date;
       params.teitem_item_id = _item.id();
       params.teitem_qty = selected[i].rawValue("value");
       params.teitem_rate = 0;
       params.teitem_total = 0;
       params.teitem_prjtask_id = selected[i].id();
       params.teitem_billable = false;
       params.teitem_prepaid = true;
       params.teitem_notes = qsTr("Converted from manually entered task data");
       params.teitem_curr_id = selected[i].altId();

       q = toolbox.executeDbQuery("timeexpensesheetitem","insteitem",params);
       if (!xtte.errorCheck(q))
         throw new Error(qsTr("Unable to create a time and expense item"));

       q = toolbox.executeDbQuery("documenttaskdata","updprjtask",params);
       if (!xtte.errorCheck(q))
         throw new Error(qsTr("Unable to update project task"));

       line = line + 1;
    }
    toolbox.executeCommit();

    var msg = qsTr("Time and Expense Sheet ") + tenumber + qsTr(" successfully created.");
    QMessageBox.information(mywindow, qsTr("Success"), msg);
  
    xtte.documentTaskData.fillList();
  }
  catch (e)
  {
    toolbox.executeRollback();
    QMessageBox.critical(mywindow, qsTr("Processing Error"), e.message);
  }
}

xtte.documentTaskData.fillList = function()
{
  xtte.documentTaskData.setColumn();

  var params = new Object;
  if (_time.checked)
    params.time = true;
  else
    params.expense = true;
 
  var q = toolbox.executeDbQuery("documenttaskdata","detail", params);
  _tasks.populate(q,true);
}

_time.toggled.connect(xtte.documentTaskData.fillList);
_tasks["valid(bool)"].connect(_convert["setEnabled(bool)"]);
_convert.clicked.connect(xtte.documentTaskData.convert);

_item.setQuery(xtte.itemSql);

xtte.documentTaskData.fillList();
