// Define Variables
var _all		= mywindow.findChild("_all");
var _close 		= mywindow.findChild("_close");
var _query		= mywindow.findChild("_query");
var _new		= mywindow.findChild("_new");
var _print 		= mywindow.findChild("_print");
var _sheets		= mywindow.findChild("_sheets");
var _selected	= mywindow.findChild("_selected");
var _approve  	= mywindow.findChild("_approve");
var _weekending  	= mywindow.findChild("_weekending");
var _showAllEmployees  = mywindow.findChild("_showAllEmployees");
var _employee	= mywindow.findChild("_employee");
var _selected	= mywindow.findChild("_selected");
var _open              = mywindow.findChild("_open");
var _approved          = mywindow.findChild("_approved");
var _closed            = mywindow.findChild("_closed");
var _uninvoiced        = mywindow.findChild("_uninvoiced");
var _unvouchered       = mywindow.findChild("_unvouchered");
var _unposted          = mywindow.findChild("_unposted");

_weekending.setStartNull(qsTr("Earliest"), startOfTime, true);
_weekending.setEndNull(qsTr("Latest"),     endOfTime,   true);

_approve.enabled = false;

var _newMode 	= 0;
var _editMode 	= 1;
var _viewMode	= 2;

// Set up columns
_sheets.addColumn(qsTr("Sheet#"), -1, Qt.AlignLeft,    true, "tehead_number");
_sheets.addColumn(qsTr("Date"),   -1, Qt.AlignLeft,    true, "tehead_weekending");
_sheets.addColumn(qsTr("Employee"),   -1, Qt.AlignLeft,    true, "emp_code");
_sheets.addColumn(qsTr("Status"),     XTreeWidget.statusColumn, Qt.AlignCenter, true, "tehead_status");
if (privileges.check("CanViewRates"))
  _sheets.addColumn(qsTr("Extended"),   -1, Qt.AlignRight,    true, "total");
_sheets.addColumn(qsTr("Uninvoiced"), -1, Qt.AlignLeft, true, "uninvoiced");
_sheets.addColumn(qsTr("Unvouchered"),-1, Qt.AlignLeft, true, "unvouchered");
_sheets.addColumn(qsTr("Unposted"),   -1, Qt.AlignLeft, true, "unvouchered");

//if the user is part of the ADMIN group, then show the "show all employees" checkbox
_showAllEmployees.visible = false;

// Make connections
_close.triggered.connect(mywindow, "close");
_print.triggered.connect(printReport);
_new.triggered.connect(sheetNew);
_query.triggered.connect(sFillList);

_approve.triggered.connect(sheetApprove);
_showAllEmployees.toggled.connect(showAllEmployeesSwitch);

if (privileges.check("MaintainTimeExpense"))
  _sheets.itemSelected.connect(sheetEdit);
else
{
  _new.enabled = false;
  _sheets.itemSelected.connect(sheetView);
}

_selected.checked = true;

populateEmployees();
sFillList();

//moved below the initial populateEmployees() call...was forcing extra calls to sFillList
_employee["newId(int)"].connect(sFillList);
_sheets["populateMenu(QMenu *, XTreeWidgetItem *, int)"].connect(populateMenu)

//context menu
function populateMenu(pMenu, pItem, pCol)
{
  var tmpact;

  if(pMenu == null)
    pMenu = _sheets.findChild("_menu");

  if(pMenu != null)
  {
    var currentItem  = _sheets.currentItem();
    if (currentItem != null)
    {
      var status = currentItem.rawValue("tehead_status");

      tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit..."), true);
      tmpact.triggered.connect(sheetEdit);
      tmpact.enabled = (status == 'O' && privileges.check("MaintainTimeExpense"));

      tmpact = toolbox.menuAddAction(pMenu, qsTr("View..."), true);
      tmpact.triggered.connect(sheetView);

      tmpact = toolbox.menuAddAction(pMenu, qsTr("Delete..."), true);
      tmpact.triggered.connect(sheetDelete);
      tmpact.enabled = (status == 'O' && privileges.check("MaintainTimeExpense"));

      pMenu.addSeparator();

      tmpact = toolbox.menuAddAction(pMenu, qsTr("Approve..."), true);
      tmpact.triggered.connect(sheetApprove);
      tmpact.enabled = (status == 'O' && privileges.check("CanApprove"));

      pMenu.addSeparator();
      tmpact = toolbox.menuAddAction(pMenu, qsTr("Invoice..."), true);
      tmpact.triggered.connect(sheetInvoice);
      tmpact.enabled = (status == 'A' && 
                        privileges.check("allowInvoicing") &&
                        currentItem.rawValue("uninvoiced"));

      tmpact = toolbox.menuAddAction(pMenu, qsTr("Voucher..."),true);
      tmpact.triggered.connect(sheetVoucher);
      tmpact.enabled = (status == 'A' && 
                        privileges.check("allowVouchering") &&
                      currentItem.rawValue("unvouchered"));

      tmpact = toolbox.menuAddAction(pMenu, qsTr("Post..."), true);
      tmpact.triggered.connect(sheetVoucher);
      tmpact.enabled = (status == 'A' && 
                      privileges.check("PostTimesheets") &&
                      currentItem.rawValue("unposted"));

    }
  }
}

function sheetApprove()
{
  
  for (var i = 0; i < selected.length; i++){
    if (selected[i].rawValue("bill_status") == '' && selected[i].rawValue("pay_status") == '' )
    {
      params.id = selected[i].id();
      q = toolbox.executeQuery('select te.approvesheet(<? value("id") ?>);',params );
    }  // if selected
  }  // for loop
  sFillList();
  
}  //sheetApprove


function sheetInvoice()
{
  var params   = new Object();
  params.id = _sheets.id();    

  toolbox.executeQuery('select te.invoicesheet(<? value("id") ?>);', params );	

  sFillList();
} 

function sheetVoucher()
{
  var params   = new Object();
  params.id = _sheets.id();    
  params.employee = currentItem.rawValue("emp_code");

  toolbox.executeQuery('select te.vouchersheet(<? value("id") ?>);',params);
  sFillList();
}

function sheetDelete()
{
  var msg = qsTr("Are you sure you want to delete this sheet?");
  if (QMessageBox.question( mywindow, mywindow.windowTitle, msg, 
      QMessageBox.Yes | QMessageBox.Escape, QMessageBox.No | QMessageBox.Default) == QMessageBox.Yes)
  {
    var params   = new Object();
    params.tehead_id = _sheets.id();    

    toolbox.executeDbQuery("te", "deltehead", params );

    sFillList();
  }
}

function sheetClose()
{
  var params   = new Object();
  params.id = _sheets.id();    

  toolbox.executeQuery("UPDATE te.tehead SET tehead_status='C' "
                     + "WHERE tehead_id = <? value(\"id\") ?>;", params );
  sFillList();
}

function sheetEdit()
{
  sheetOpen(_editMode);
}

function sheetNew()
{
  sheetOpen(_newMode);
}

function sheetView()
{
  sheetOpen(_viewMode);
}

function sheetOpen(mode)
{
  var params   = new Object();
  params.mode   = mode;
  if (mode ) // Not new
    params.tehead_id = _sheets.id();
  // new
  else
  {
    if (_selected)
      params.emp_id = _employee.id();
  }

  var te = toolbox.openWindow("te", mywindow, Qt.ApplicationModal);
  toolbox.lastWindow().set(params);
  var result = te.exec();
  if(result != 0)
    sFillList();
}

function sheetConsolidate()
{
  var selected = _sheets.selectedItems();
  
  for (var i = 0; i < selected.length; i++){
    // check the billing status.  If it's already been invoiced, prompt the user with 
    // an error.  Require the invoices to be at an Approved status
    if (selected[i].rawValue("bill_status") != 'A')
    {
      toolbox.messageBox("critical", mywindow,qsTr("Error"), 
          qsTr("Invoices should be at an Approved status to be consolidated") );
      return;
    }  
  }

  var params = new Object;

  // get the next number for the teselect_cons_id field
  var q;
  q = toolbox.executeQuery("select nextval('te.cons_seq') as cons_id;",params);

  if (q.first())
  {
    params.cons_id = (q.value("cons_id"));
  }

  for (var i = 0; i < selected.length; i++){

    params.id = selected[i].id();

    if (params.cons_id > 0)
    {
      var q;
      q = toolbox.executeQuery('INSERT INTO te.teselect '
           +'(teselect_cons_id, teselect_tehead_id) '
           +'VALUES '
           +'(<? value("cons_id") ?>,<? value("id") ?>);',params);
    }
  }

  var q;
  q = toolbox.executeQuery("select te.consolidateinvoice(<? value('cons_id') ?>);",params);

  sFillList();

}

function getParams()
{
  params = new Object;

  if (!_open.checked &&
      !_approved.checked &&
      !_closed.checked)
    return params;

  params.startDate = _weekending.startDate;
  params.endDate   = _weekending.endDate;
  if (!_showAllEmployees.checked)
    params.emp_id  = _employee.id();

  var statusList = [];
  var num = 0;
  
  if (_open.checked)
  {
    statusList[num] = "'O'";
    num = num + 1;
  }
  if (_approved.checked)
  {
    statusList[num] = "'A'";
    num = num + 1;
  }
  if (_closed.checked)
    statusList[num] = "'C'";
  
  params.statusList  = statusList.toString();
  params.approved  = qsTr("Approved");
  params.closed    = qsTr("Closed");
  params.open      = qsTr("Open");

  return params;
}


function sFillList()
{  
  var params = getParams();
  if (!params.statusList.length)
    return;

  q = toolbox.executeDbQuery("tesheet","detail", params);

  _sheets.populate(q);
  if (q.lastError().type != QSqlError.NoError)
  {
    toolbox.messageBox("critical", mywindow,
                       qsTr("Database Error"), q.lastError().text);
    return;
  }
}

function timeReport()
{
  params = new Object();
  params.headid = _sheets.id();
  toolbox.printReport("TimeReport",params);
}

function expenseReport()
{
  params = new Object();
  params.headid = _sheets.id();
  toolbox.printReport("ExpenseReport",params);
}


function printReport()
{
  new params = getParams()
  if (!params.statusList.length)
    return;

  toolbox.printReport("OpenSheetList",params);
}


function showAllEmployeesSwitch()
{
  _employees.enabled = _showAllEmployees.checked;
  sFillList();
}


function populateEmployees()
{
  currSql = "SELECT emp_id "
          + "FROM  emp "
          + "WHERE emp_username = CURRENT_USER;";
  q = toolbox.executeQuery(currSql);
  if (q.first())  
    _employee.setId(q.value("emp_id"));

  if (privileges.check("MaintainTimeExpenseOthers"))
  {
    _showAllEmployees.visible = true;
    id = -1;

    if (q.first())  
      _employee.setId(q.value("emp_id"));
  }
  else
  {
    _showAllEmployees.visible = false;
    if (privileges.check("MaintainTimeExpenseSelf"))
    {
      if (_employee.id() == -1)
        toolbox.messageBox("critical", mywindow, mywindow.windowTitle, qsTr("It appears that your current user isn't an active employee.") );                                            
    }
    else
    {
      toolbox.messageBox("critical", mywindow, qsTr("Permissions Error"),
                    qsTr("You do not have permissions to maintain time and expense entries"));
      if (mywindow.windowModality)
        mydialog.reject();
      else
        mywindow.close();
    }
  }
} //populateEmployees

