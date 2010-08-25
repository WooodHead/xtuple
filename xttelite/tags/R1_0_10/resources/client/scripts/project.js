
//find the tab list and create a new widget to insert into it.
var tablist = mywindow.findChild("_tab"); 
// load a predefined screen by name from the database
var billingPage = toolbox.loadUi("tebilling", mywindow);

//insert the new tab
toolbox.tabInsertTab(tablist,2,billingPage, "Billing Information");

var _save = mywindow.findChild("_save");
_save.clicked.connect(billingSave);
         
var _deleteTask = mywindow.findChild("_deleteTask");
_deleteTask.clicked.connect(deleteTask);
    

var _number 	= mywindow.findChild("_number");
var _item		= mywindow.findChild("_item");
var _itemLit	= mywindow.findChild("_itemLit");
var _rate 		= mywindow.findChild("_rate"); 
var _cust		= mywindow.findChild("_cust");

_item.visible = false;
_itemLit.visible = false;

//_number.textChanged.connect(getProject);
_number.editingFinished.connect(getProject);


function billingSave()
{

   var params = new Object();
   params.rate = mywindow.findChild("_rate").text;
   if (params.rate == '')
   {
     params.rate = 0;
   }
   params.custid = _cust.id();
   params.project = mywindow.findChild("_number").displayText;

   var q = toolbox.executeDbQuery("te","addteprj",params);


   //look for a task assigned to this project...if not found...then create a default project

   var q = toolbox.executeQuery('select prj_id from prj where prj_number = <? value("project") ?>;',params);


   if (q.first())
   {
     var _prj;
     _prj = (q.value("prj_id"));
   }

 
   getTaskbyPrj(_prj);


/*

     var params = new Object();
     params.rate = mywindow.findChild("_rate").text;
     params.custid = _cust.id();
     //params.project = mywindow.findChild("_number").displayText;
     params.task = _prjtaskid;
     params.item = mywindow.findChild("_item").text;

     var q = toolbox.executeDbQuery("te","addteprjtask",params);
*/

}


function getTaskbyPrj(prj)
{

    var params = new Object();
    params.prj = prj;

    var q = toolbox.executeQuery('select prjtask_id from prjtask where '
	+ ' prjtask_prj_id = <? value("prj") ?>;',params);

    if (q.first())
    {
      _task = (q.value("prjtask_id"));
    }
    else if (q.lastError().type != 0)
    {
      toolbox.messageBox("critical", mywindow, qsTr("Database Error"),
               q.lastError().databaseText);
      return;
    } 



/*
    var params = new Object();
    params.task = _prjtaskid;

    var q = toolbox.executeQuery("SELECT teprjtask_cust_id as custid, "
        + "teprjtask_rate as rate, "
        + "teprjtask_item_id as item "
        + "FROM te.teprjtask "
        + ' WHERE teprjtask_id = <? value("task") ?>;',params);

    if (q.first())
    {
      _rate.setText(q.value("rate"));
      _item.setId(q.value("item"));
      _cust.setId(q.value("custid"));
    }
*/

}



function deleteTask()
{
    var params = new Object();
    params.task = mywindow.findChild("_prjtask").id();

    var q = toolbox.executeQuery("delete from te.teprjtask "
        + ' WHERE teprjtask_id = <? value("task") ?>;',params);

}


function getProject()
{
    var params = new Object();
    params.project = mywindow.findChild("_number").displayText;

/*    var q = toolbox.executeQuery("SELECT teprj_cust_id as custid, "
        + "teprj_rate as rate "
        + "FROM te.teprj "
        + ' WHERE teprj_prj_id = (getprjid(<? value("project") ?>));',params);
*/
    var q = toolbox.executeQuery('SELECT te.getprjcustid(<? value("project") ?>)',params);

    if (q.lastError().type != QSqlError.NoError)

    {
      toolbox.messageBox("critical", mywindow,
                         qsTr("Database Error"), q.lastError().text);
      return;
    }

//    if (q.first())
  //  {
    //  _rate.setText(q.value("rate"));
    //  _cust.setId(q.value("custid"));
    //}
}

