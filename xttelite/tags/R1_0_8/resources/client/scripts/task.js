//find the tab list and create a new widget to insert into it.
var tablist = mywindow.findChild("_tab"); 
// load a predefined screen by name from the database
var billingPage = toolbox.loadUi("tebilling", mywindow);

//insert the new tab
toolbox.tabInsertTab(tablist,2,billingPage, "Billing Information");

var _save = mywindow.findChild("_save");
             
var _mode = "new";
var _number 	= mywindow.findChild("_number");
var _item		= mywindow.findChild("_item");
var _itemLit	= mywindow.findChild("_itemLit");
var _rate 		= mywindow.findChild("_rate"); 
var _cust		= mywindow.findChild("_cust");
var _prjid;
var _prjtaskid;
var _prjtask	= mywindow.findChild("_prjtask");
var _prjtasknumber;

_item.visible = true;
_itemLit.visible = true;

_item.populate("select item_id,item_number,item_descrip1,item_listprice from item where item_sold = true and item_active = true and item_type = 'R' and item_id not in (select teexp_id from te.teexp)");

_number.setFocus();

function set(params)
{
  _prjid = params.prj_id;

  if(params.mode == "new")
  {
    _mode = "new";
    mywindow.findChild("_save").clicked.connect(sScriptSave);
  }

  if(params.mode == "edit")
  {
    _mode = "edit";
    mywindow.findChild("_save").clicked.connect(sScriptSave);
  }

  if("prjtask_id" in params)
  {
    _prjtaskid = params.prjtask_id;
  }else{
    _prjtaskid = "-1";
  }

  if(_prjid == null && _prjtaskid > 0)
  {
    var q = toolbox.executeQuery("SELECT prjtask_prj_id as prj_id, "
      + "prjtask_number "
      + "FROM prjtask "
      + ' WHERE prjtask_id = <? value("prjtask_id") ?>;',params);

    if (q.first())
    {
      _prjid = q.value("prj_id");
      params.prjtask_number = q.value("prjtask_number");
      params.prjid = _prjid;
      _prjtasknumber = params.prjtask_number;
  
      var _qry = "SELECT teprjtask_cust_id as custid, "
        + "teprjtask_rate as rate, "
        + "teprjtask_item_id as item "
        + "FROM te.teprjtask "
        + " WHERE teprjtask_prjtask_number = '"
        + params.prjtask_number
        + "' and teprjtask_prj_id ="
        + params.prjid
        + ';';

      var q = toolbox.executeQuery(_qry,params);

      if (q.first())
      {
        _rate.setText(q.value("rate"));
        _item.setId(q.value("item"));
        _cust.setId(q.value("custid"));
      }
    }
  }

  return 0;
}


function sScriptSave()
{
 
  var params = new Object();
  params.rate = mywindow.findChild("_rate").text;
  if (params.rate == '')
    params.rate = 0;

  params.custid = _cust.id();

  if (_prjtaskid > 0)
  {
   params.task = _prjtaskid;
  } 
  params.item = mywindow.findChild("_item").text;

  params.prjtask_prj_id = _prjid;
  params.prjtask_number = mywindow.findChild("_number").text;
  params.prjtask_name = mywindow.findChild("_name").text;
  params.prjtask_descrip = mywindow.findChild("_descrip").plainText;


  var _status = mywindow.findChild("_status");
  
  switch(_status.code)
  {
    case "Concept":
    default:
      _statusCode = "P";
      break;
    case "In-Process":
      _statusCode = "O";
      break;
    case "Complete":
      _statusCode = "C";
      break;
  }

  params.prjtask_status = _statusCode;
  params.prjtask_hours_budget = mywindow.findChild("_budgetHours").toDouble();
  params.prjtask_hours_actual = mywindow.findChild("_actualHours").toDouble();
  params.prjtask_exp_budget = mywindow.findChild("_budgetExp").toDouble();
  params.prjtask_exp_actual = mywindow.findChild("_actualExp").toDouble();

  params.prjtask_start_date = mywindow.findChild("_started").date;
  params.prjtask_due_date = mywindow.findChild("_due").date;
  params.prjtask_assigned_date = mywindow.findChild("_assigned").date;
  params.prjtask_completed_date = mywindow.findChild("_completed").date;
  params.prjtask_owner_username = mywindow.findChild("_owner").username();
  params.prjtask_username = mywindow.findChild("_assignedTo").username();

  //test the owner/assigned to....if they're null...
  // ...or not active...prompt the user with a message

  var q = toolbox.executeQuery('SELECT current_user',params);
  if (q.first())
  {
    var _curuser = q.value("current_user");
  }

  if (params.prjtask_username == '')
  {
    params.prjtask_username = _curuser;
  }
  if (params.prjtask_owner_username == '')
  {
    params.prjtask_owner_username = _curuser;
  }


  if (_prjtasknumber != '')
  {
    params.task = _prjtaskid;
    params.prjtask_id = _prjtaskid;
    params.prj_id = _prjid;
  }  

  var q = toolbox.executeDbQuery("te","addteprjtask",params);
  
  mywindow.close();
}


