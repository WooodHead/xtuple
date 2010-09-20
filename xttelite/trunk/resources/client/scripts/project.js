include("xtte");
xtte.project = new Object;

var _tab = mywindow.findChild("_tab"); 
var _tebilling = toolbox.loadUi("tebilling", mywindow);
toolbox.tabInsertTab(_tab, 2, _tebilling, qsTr("Billing"));
_tab.setEnabled(2, privileges.check("CanViewRates"));

var _prjtask = mywindow.findChild("_prjtask");
var _newTask = mywindow.findChild("_newTask");
var _editTask = mywindow.findChild("_editTask");
var _viewTask = mywindow.findChild("_viewTask");
var _number = mywindow.findChild("_number");
var _billingGroup = mywindow.findChild("_billingGroup");
var _itemGroup = _tebilling.findChild("_itemGroup");
var _useItem = _tebilling.findChild("_useItem");
var _cust = _tebilling.findChild("_cust");
var _rate = _tebilling.findChild("_rate");
var _teprjid = -1; 
var _prjid = -1;

set = function(input)
{
  if("prj_id" in input)
  {
    _prjid = input.prj_id;
    xtte.project.populate();
  }

  if("mode" in input)
  {
    if (input.mode == "view")
    {
      _cust.enabled = false;
      _billingGroup.enabled = false;
    }
  }

  return mainwindow.NoError;
}

xtte.project.save = function(prjId)
{
  if (prjId <= 0)
    return;

  var params = new Object();
  params.teprj_id	= _teprjid;
  params.prj_id	= prjId;
  if (_cust.isValid())
    params.cust_id  	= _cust.id();
  if (_billingGroup.checked)
  {
    params.rate	= _rate.localValue;
    params.curr_id	= _rate.id();
  }

  var query = "updteprj";
  if (_teprjid == -1)
    query = "insteprj";

  var q = toolbox.executeDbQuery("project", query, params);
  xtte.errorCheck(q);
}

xtte.project.populate = function()
{
  var params = new Object();
  params.prj_id = _prjid;    

  var q = toolbox.executeDbQuery("project", "selteprj", params);

  if (q.first())
  {
    _teprjid = q.value("teprj_id");
    _cust.setId(q.value("cust_id"));
    if (q.value("curr_id") == -1)
      _billingGroup.checked = false;
    else
    {
      _billingGroup.checked = true;
      _rate.setId(q.value("curr_id"));
      _rate.localValue = q.value("teprj_rate");
    }
    return;
  }
  else
    xtte.errorCheck(q);
}

xtte.project.newTask = function()
{
  xtte.project.openTask("new");
}

xtte.project.editTask = function()
{
  xtte.project.openTask("edit");
}

xtte.project.viewTask = function()
{
  xtte.project.openTask("view");
}

xtte.project.openTask = function(mode)
{
  params = new Object;
  params.mode = mode;
  if (mode != "new")
    params.prjtask_id = _prjtask.id();
  if (_cust.isValid())
    params.cust_id = _cust.id();

  var win = toolbox.openWindow("task", mywindow, Qt.ApplicationModal);
  toolbox.lastWindow().set(params);
  var result = win.exec();
  if(result != 0)
    mywindow.sFillTaskList();
}


// Initialize
_itemGroup.hide();
_useItem.hide();

// Connections
toolbox.coreDisconnect(_newTask, "clicked()", mywindow, "sNewTask()");
toolbox.coreDisconnect(_editTask, "clicked()", mywindow, "sEditTask()");
toolbox.coreDisconnect(_viewTask, "clicked()", mywindow, "sViewTask()");

_newTask.clicked.connect(xtte.project.newTask);
_editTask.clicked.connect(xtte.project.editTask);
_viewTask.clicked.connect(xtte.project.viewTask);
mydialog["finished(int)"].connect(xtte.project.save);

