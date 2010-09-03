debugger;

//find the tab list and create a new widget to insert into it.
var tablist = mywindow.findChild("_tabWidget"); 
// load a predefined screen by name from the database
var billingPage = toolbox.loadUi("tebillingemp", mywindow);

//insert the new tab
toolbox.tabInsertTab(tablist,4,billingPage, "Billing Information");

// employee.ssave() emits a "saved" signal after save
mywindow.saved.connect(billingSave);
         
// employee.populate() emits a "populated" signal after populating
mywindow.populated.connect(getEmployeeRate);
         
var _number 	= mywindow.findChild("_number");
var _rateemp	= mywindow.findChild("_rateemp"); 
_rateemp.setValidator(toolbox.moneyVal());
var _cust		= mywindow.findChild("_cust");
var _name 		= mywindow.findChild("_name");
var _code		= mywindow.findChild("_code");
mywindow.findChild("_item").visible = false;
mywindow.findChild("_itemLit").visible = false;
mywindow.findChild("_cust").visible = false;

function set(params)
{
//toolbox.messageBox("critical", mywindow, mywindow.windowTitle,_code.text);
//getEmployeeRate();

}


function billingSave()
{
   var params = new Object();
   params.rate = _rateemp.toDouble();
   params.code = _code.text;
   var q = toolbox.executeQuery("SELECT emp_id "
                              + "FROM emp "
                              + ' WHERE emp_code = <? value("code") ?>;',params);

   if (q.first())
   {
     params.empid = q.value("emp_id");
     var q = toolbox.executeDbQuery("te","addteemprate",params);
   }
}

function getEmployeeRate()
{
   var params = new Object();
   params.code = _code.text;    
   var q = toolbox.executeQuery("SELECT teemprate_rate "
                              + "FROM emp JOIN te.teemprate ON (teemprate_emp_id=emp_id) "
                              + 'WHERE emp_code = <? value("code") ?>;',params);

    if (q.first())
    {
      _rateemp.text = (q.value("teemprate_rate"));
    }
}
