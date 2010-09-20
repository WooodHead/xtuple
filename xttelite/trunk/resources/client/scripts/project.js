include("teglobal");
te.project = new Object;

var _tab = mywindow.findChild("_tab"); 
var _tebilling = toolbox.loadUi("tebilling", mywindow);
toolbox.tabInsertTab(_tab, 2, _tebilling, qsTr("Billing"));
_tab.setEnabled(2, privileges.check("CanViewRates"));

var _prjtask = mywindow.findChild("_prjtask");
var _number = mywindow.findChild("_number");
var _billingGroup = mywindow.findChild("_billingGroup");
var _itemGroup = _tebilling.findChild("_itemGroup");
var _cust = _tebilling.findChild("_cust");
var _rate = _tebilling.findChild("_rate");
var _teprjid = -1; 
var _prjid = -1;

set = function(input)
{
  if("prj_id" in input)
  {
    _prjid = input.prj_id;
    te.project.populate();
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

te.project.save = function(prjId)
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
  te.errorCheck(q);
}

te.project.populate = function()
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
    te.errorCheck(q);
}

te.project.newTask = function()
{
  openTask("new");
}

te.project.editTask = function()
{
  openTask("edit");
}

te.project.viewTask = function()
{
  openTask("view");
}

te.project.openTask = function(mode)
{
  params = new Object;
  params.mode = mode;
  if (mode != "new")
    params.prjtask_id = _prjtask.id();
  if (cust.isValid())
    params.cust_id = _cust.id();

  var win = toolbox.openWindow("task", mywindow, Qt.ApplicationModal);
  toolbox.lastWindow().set(params);
  var result = win.exec();
  if(result != 0)
    sFillList();
}


// Initialize
_itemGroup.hide();

// Connections
toolbox.coreDisconnect();
toolbox.coreDisconnect();

_new
mydialog["finished(int)"].connect(te.project.save);

