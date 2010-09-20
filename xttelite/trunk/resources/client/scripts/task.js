include("teglobal");
te.task = new Object;

var _tab = mywindow.findChild("_tab"); 
var _tebilling = toolbox.loadUi("tebilling", mywindow);
toolbox.tabInsertTab(_tab, 2, _tebilling, qsTr("Billing"));
_tab.setEnabled(2, privileges.check("CanViewRates"));

var _number = mywindow.findChild("_number");
var _billingGroup = _tebilling.findChild("_billingGroup");
var _itemGroup = _tebilling.findChild("_itemGroup");
var _cust = _tebilling.findChild("_cust");
var _rate = _tebilling.findChild("_rate");
var _item = _tebilling.findChild("_item");
var _teprjtaskid = -1; 
var _prjtaskid = -1;

set = function(input)
{
  if("prjtask_id" in input)
  {
    _prjtaskid = input.prjtask_id;
    te.task.populate();
  }

  if("cust_id" in input)
  {
    cust.setId(input.cust_id);
    cust.setEnabled = false;
  }

  if("mode" in input)
  {
    if (input.mode == "view")
    {
      _cust.enabled = false;
      _billingGroup.enabled = false;
      _itemGroup.enabled = false;
    }
  }

  return mainwindow.NoError;
}

te.task.save = function(prjtaskId)
{
  if (prjtaskId <= 0)
    return;

  var params = new Object();
  params.teprjtask_id	= _teprjtaskid;
  params.prjtask_id	= prjtaskId;
  if (_cust.isValid())
    params.cust_id  	= _cust.id();
  if (_billingGroup.checked)
  {
    params.rate	= _rate.localValue;
    params.curr_id	= _rate.id();
  }
  if (_itemGroup.checked && _item.isValid())
    params.item_id	= _item.id()

  var query = "updteprjtask";
  if (_teprjtaskid == -1)
    query = "insteprjtask";

  var q = toolbox.executeDbQuery("task", query, params);
  te.errorCheck(q);
}

te.task.populate = function()
{
  var params = new Object();
  params.prjtask_id = _prjtaskid;    

  var q = toolbox.executeDbQuery("task", "selteprjtask", params);

  if (q.first())
  {
    _teprjtaskid = q.value("teprjtask_id");

    if (!_cust.isValid())
      _cust.setId(q.value("cust_id"));

    if (q.value("curr_id") == -1)
      _billingGroup.checked = false;
    else
    {
      _billingGroup.checked = true;
      _rate.setId(q.value("curr_id"));
      _rate.localValue = q.value("teprjtask_rate");
    }

    if (q.value("item_id") == -1)
      _itemGroup.checked = false;
    else
    {
      _itemGroup.checked = true;
      _item.setId(q.value("item_id"));
    }

    return;
  }
  else
    te.errorCheck(q);
}

// Connections
mydialog["finished(int)"].connect(te.task.save);

