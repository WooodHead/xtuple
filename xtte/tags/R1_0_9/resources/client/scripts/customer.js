
//find the tab list and create a new widget to insert into it.
var tablist = mywindow.findChild("_tab"); 
// load a predefined screen by name from the database
var billingPage = toolbox.loadUi("tebilling", mywindow);

//insert the new tab
toolbox.tabInsertTab(tablist,2,billingPage, "Billing Information");

var _save = mywindow.findChild("_save");
_save.clicked.connect(billingSave);
             

var _number 	= mywindow.findChild("_number");
var _rate 		= mywindow.findChild("_rate"); 
var _cust		= mywindow.findChild("_cust");
var _name 		= mywindow.findChild("_name");
mywindow.findChild("_item").visible = false;
mywindow.findChild("_itemLit").visible = false;
mywindow.findChild("_cust").visible = false;

_number['numberChanged(QString)'].connect(getCustomerRate);
_name['textChanged(QString)'].connect(getCustomerRate);

function billingSave()
{
  var params = new Object();
  params.rate = mywindow.findChild("_rate").text;
  if (params.rate == '')
  {
    params.rate = 0;
  }
  params.custname = mywindow.findChild("_name").text; 

  var q = toolbox.executeDbQuery("te","addtecustrate",params);
}


function getCustomerRate()
{
  var params = new Object();
  params.custname = mywindow.findChild("_name").text;    

  var q = toolbox.executeQuery("SELECT tecustrate_rate as rate "
        + "FROM te.tecustrate "
        + ' WHERE tecustrate_cust_name = <? value("custname") ?>;',params);

  if (q.first())
  {
    _rate.setText(q.value("rate"));
  }
}
