include("teglobal");
te.customer = new Object;

var _currency = mywindow.findChild("_currency");
var _creditGroup = mywindow.findChild("_creditGroup");
var _layout = toolbox.widgetGetLayout(_creditGroup);
var _billingGroup = toolbox.loadUi("tebilling", mywindow);

_layout.addWidget(_billingGroup, 1, 0, 1, 3);
_layout.addWidget(_creditGroup, 2, 0, 1, 3);

var _save = mywindow.findChild("_save"); 
var _number = mywindow.findChild("_number");
var _blanketPos = mywindow.findChild("_blanketPos");
var _projectGroup = mywindow.findChild("_projectGroup");
var _item = _billingGroup.findChild("_item");
var _itemLit= _billingGroup.findChild("_itemLit");
var _cust = _billingGroup.findChild("_cust");
var _custLit = _billingGroup.findChild("_custLit");
var _rate = _billingGroup.findChild("_rate");
var _tecustrateid = -1; 
var _basecurrid = _rate.id();

_item.hide();
_itemLit.hide();
_cust.hide();
_custLit.hide();

QWidget.setTabOrder(_blanketPos, _rate);

te.customer.save = function(custId)
{
  var params = new Object();
  params.tecustrate_id	= _tecustrateid;
  params.cust_id  	= custId;
  params.curr_id	= _rate.id();
  params.rate	= _rate.localValue;

  var query = "updtecustrate";
  if (_tecustrateid == -1)
    query = "instecustrate";

  var q = toolbox.executeDbQuery("customer", query, params);
  if (q.first())
    _tecustrateid = q.value("tecustrate_id");
  else
    te.errorCheck(q);
}

te.customer.populate = function()
{
  var params = new Object();
  params.cust_id = _number.id();    

  var q = toolbox.executeDbQuery("customer", "seltecustrate", params);

  if (q.first())
  {
    _projectGroup.checked = true;
    _tecustrateid = q.value("tecustrate_id");
    _rate.setId(q.value("tecustrate_curr_id"));
    _rate.localValue = q.value("tecustrate_rate");
    return;
  }
  else
    te.errorCheck(q);
  
  _projectGroup.checked = false;
  _tecustrateid = -1;
  _rate.setId(_basecurrid);
  _rate.localValue = 0;
}

// Connections
_number.newId.connect(te.customer.populate);
mywindow["saved(int)"].connect(te.customer.save);
