
debugger;

//find the tab list and create a new widget to insert into it.
var tablist = mywindow.findChild("_tab"); 
// load a predefined screen by name from the database
var billingPage = toolbox.loadUi("tebilling", mywindow);

//insert the new tab
toolbox.tabInsertTab(tablist,2,billingPage, "Billing Information");

// project.ssave() emits a "saved" signal after save
mywindow.saved.connect(billingSave);
         
// project.populate() emits a "populated" signal after populating
mywindow.populated.connect(billingPopulate);
         
// project.sdeletetask() emits a "deletedTask" signal after deleting task
mywindow.deletedTask.connect(deleteTask);

var _prjid      = 0;
var _number     = mywindow.findChild("_number");
var _item       = mywindow.findChild("_item");
var _itemLit    = mywindow.findChild("_itemLit");
var _rate       = mywindow.findChild("_rate"); 
var _cust       = mywindow.findChild("_cust");
var _prjtask    = mywindow.findChild("_prjtask");

_rate.setValidator(toolbox.moneyVal());

_item.visible = false;
_itemLit.visible = false;

function billingSave(prjid)
{
   _prjid = prjid;

   var params = new Object();
   params.rate = _rate.toDouble();
   params.custid = _cust.id();
   params.project = _number.displayText;
   params.prj_id = _prjid;

   var q = toolbox.executeDbQuery("te","addteprj",params);
}

function billingPopulate(prjid)
{
   _prjid = prjid;

   var params = new Object();
   params.prj_id = _prjid;

   var q = toolbox.executeQuery('select * from te.teprj where teprj_prj_id = <? value("prj_id") ?>;',params);
   if (q.first())
   {
     _cust.setId(q.value("teprj_cust_id"));
     _rate.text=q.value("teprj_rate");
   }
}

function deleteTask()
{
    var params = new Object();
    params.prjid = _prjid;
    var currentItem  = _prjtask.currentItem();
    if (currentItem != null)
    {
      params.number = currentItem.rawValue("prjtask_number");
    }

    var q = toolbox.executeQuery("delete from te.teprjtask "
        + ' WHERE teprjtask_prj_id = <? value("prjid") ?> AND teprjtask_prjtask_number = <? value("number") ?>;',params);

}
