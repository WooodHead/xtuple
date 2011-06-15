debugger;
// TO DO...lot's of priv work...
//  - need privs for invoice,voucher,approve

// Define Variables
var _all		= mywindow.findChild("_all");
var _close 		= mywindow.findChild("_close");
var _query		= mywindow.findChild("_query");
var _edit 		= mywindow.findChild("_edit");
var _new		= mywindow.findChild("_new");
var _delete		= mywindow.findChild("_delete");
var _print 		= mywindow.findChild("_print");
var _sheets		= mywindow.findChild("_sheets");
var _selected	= mywindow.findChild("_selected");
var _view  		= mywindow.findChild("_view");
var _approve  	= mywindow.findChild("_approve");
var _weekending  	= mywindow.findChild("_weekending");
var _showAllEmployees  = mywindow.findChild("_showAllEmployees");
var _employees	= mywindow.findChild("_employees");
var _selected	= mywindow.findChild("_selected");
var _timeReport	= mywindow.findChild("_timeReport");
var _expenseReport	= mywindow.findChild("_expenseReport");
var _showClosed         = mywindow.findChild("_showClosed");

_weekending.setStartNull(qsTr("Earliest"), startOfTime, true);
_weekending.setEndNull(qsTr("Latest"),     endOfTime,   true);

_approve.enabled = false;
_delete.enabled = false;
_edit.enabled = false;
_view.enabled = false;

var _newMode 	= 0;
var _editMode 	= 1;
var _viewMode	= 2;

_sheets.addColumn(qsTr("Sheet Number"), -1, Qt.AlignLeft,    true, "sheet_number");
_sheets.addColumn(qsTr("Sheet Date"), -1, Qt.AlignLeft,    true, "weekending");
//_sheets.addColumn(qsTr("Qty"),   -1, Qt.AlignLeft,    true, "hours");

if (privileges.check("CanViewRates")){
  _sheets.addColumn(qsTr("Extended"),   -1, Qt.AlignRight,    true, "dollars");
}

_sheets.addColumn(qsTr("Employee"),   -1, Qt.AlignLeft,    true, "emp_code");
_sheets.addColumn(qsTr("Status"), -1, Qt.AlignLeft, true, "status");

//_sheets.valid.connect(sHandleButtons);

//if the user is part of the ADMIN group, then show the "show all employees" checkbox
_showAllEmployees.visible = false;
_sheets.valid.connect(sHandleButtons);
_sheets.itemSelected.connect(_edit, "animateClick");

// Make connections
_close.clicked.connect(mywindow, "close");
_print.clicked.connect(printReport);

_new.clicked.connect(sheetNew);
_edit.clicked.connect(sheetEdit);
_view.clicked.connect(sheetView);
_delete.clicked.connect(sheetDelete);
_query.clicked.connect(sFillList);

_approve.clicked.connect(sheetApprove);

_expenseReport.clicked.connect(expenseReport);
_timeReport.clicked.connect(timeReport);

_showAllEmployees.toggled.connect(showAllEmployeesSwitch);

_selected.checked = true;

populateEmployees();
sFillList();

//moved below the initial populateEmployees() call...was forcing extra calls to sFillList
_employees['currentIndexChanged(QString)'].connect(sFillList);
_sheets["populateMenu(QMenu *, XTreeWidgetItem *, int)"].connect(populateMenu)

//context menu
function populateMenu(pMenu, pItem, pCol)
{

var tmpact;

  if(pMenu == null)
    pMenu = _sheets.findChild("_menu");

  if(pMenu != null)
  {
    var _addsep = false;

    var currentItem  = _sheets.currentItem();
    if (currentItem != null)
    {
      _status = currentItem.rawValue("status");

      if(_status == '')
      {
        tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit..."), privileges.check("MaintainTimeExpense"));
        tmpact.triggered.connect(sheetEdit);
      }

      tmpact = toolbox.menuAddAction(pMenu, qsTr("View..."), true);
      tmpact.triggered.connect(sheetView);

      if(_status == '')
      { 
        tmpact = toolbox.menuAddAction(pMenu, qsTr("Delete..."), privileges.check("MaintainTimeExpense"));
        tmpact.triggered.connect(sheetDelete);
      }

      if(_status == '')
      {
        if(! _addsep)
        {
          pMenu.addSeparator();
          _addsep = true;
        }
        tmpact = toolbox.menuAddAction(pMenu, qsTr("Approve..."), privileges.check("MaintainTimeExpense"));
        tmpact.triggered.connect(sheetApprove);
      }
      if(_status == '')
      {
        if(! _addsep)
        {
          pMenu.addSeparator();
          _addsep = true;
        }
        tmpact = toolbox.menuAddAction(pMenu, qsTr("Close..."), privileges.check("MaintainTimeExpense"));
        tmpact.triggered.connect(sheetClose);
      }
    }
  }
}

function sheetApprove()
{
  var msgBox     = new Object();
  msgBox.Yes     = 0x00004000;
  msgBox.No      = 0x00010000;
  msgBox.Default = 0x00000100;
  msgBox.Escape  = 0x00000200;

  var selected = _sheets.selectedItems();
  var params   = new Object();
  
  var msg = "Are you sure you want to Approve this sheet?"
  if (toolbox.messageBox("question", mywindow, mywindow.windowTitle, msg, 
    msgBox.Yes | msgBox.Escape, msgBox.No | msgBox.Default) != msgBox.Yes)
  {
    return;
  }

  for (var i = 0; i < selected.length; i++){
    if (selected[i].rawValue("status") == '')
    {
      params.id = selected[i].id();
      q = toolbox.executeQuery('select te.approvesheet(<? value("id") ?>);',params );
    }  // if selected
  }  // for loop
  sFillList();
  
}  //sheetApprove


function sheetDelete()
{
  var msgBox     = new Object();
  msgBox.Yes     = 0x00004000;
  msgBox.No      = 0x00010000;
  msgBox.Default = 0x00000100;
  msgBox.Escape  = 0x00000200;

  try
  {
    var msg = "Are you sure you want to delete this sheet?"
    if (toolbox.messageBox("question", mywindow, mywindow.windowTitle, msg, 
          msgBox.Yes | msgBox.Escape, msgBox.No | msgBox.Default) == msgBox.Yes)
    {
      var params   = new Object();
      params.id = _sheets.id();    

      q = toolbox.executeQuery('DELETE FROM te.tehead WHERE tehead_id = <? value("id") ?>;', params );

      q = toolbox.executeQuery('DELETE FROM te.teitem WHERE teitem_tehead_id = <? value("id") ?>;', params );

      sFillList();
    }
  }
  catch (e)
  {
    sFillList();
    print(e);
    toolbox.messageBox("critical", mywindow, mywindow.windowTitle, e);
  }
}

function sheetClose()
{
  var msgBox     = new Object();
  msgBox.Yes     = 0x00004000;
  msgBox.No      = 0x00010000;
  msgBox.Default = 0x00000100;
  msgBox.Escape  = 0x00000200;

  try
  {
    var msg = "Are you sure you want to close this sheet?"
    if (toolbox.messageBox("question", mywindow, mywindow.windowTitle, msg, 
          msgBox.Yes | msgBox.Escape, msgBox.No | msgBox.Default) == msgBox.Yes)
    {
      var params   = new Object();
      params.id = _sheets.id();    

      q = toolbox.executeQuery("UPDATE te.tehead SET tehead_status='C' "
                             + 'WHERE tehead_id = <? value("id") ?>;', params );

      sFillList();
    }
  }
  catch (e)
  {
    sFillList();
    print(e);
    toolbox.messageBox("critical", mywindow, mywindow.windowTitle, e);
  }
}

function sheetEdit()
{
  sheetOpen(1);
}

function sheetNew()
{
  sheetOpen(0);
}

function sheetView()
{
  sheetOpen(2);
}

function sheetOpen(mode)
{
  var params   = new Object();
  params.mode   = mode;
  // edit
  if (mode == 1){
    params.filter = "tehead_id=" + _sheets.id();
    params.headid = _sheets.id();
  }
  // new
  if (mode == 0){
    if (_selected)
      params.emp_id = _employees.id();
 
  }
  //view
  if (mode == 2){
    params.filter = "tehead_id=" + _sheets.id();
    params.headid = _sheets.id();
  }

  try {
    var te = toolbox.openWindow("te", 0, Qt.NonModal, Qt.Dialog);
    toolbox.lastWindow().set(params);
    var result = te.exec();
    if(result != 0)
      sFillList();
  } catch(e) {
    print("te open sheet exception @ " + e.lineNumber + ": " + e);
  }

//  var childwnd = toolbox.openWindow("te", 0, Qt.NonModal, Qt.Dialog);

}

function sFillList()
{
  try {
    if(_showAllEmployees.checked){
      _emp = "A";
    }else{
      _emp = "O";
    }
   
    var params = new Object;
    params.startDate = _weekending.startDate;
    params.endDate   = _weekending.endDate;
    params.employee = _employees.text;
    if(!_showClosed.checked){
      params.excludeClosed = "";
    }
    // all employees
    if (_emp == "A"){  
      // all employees
      q = toolbox.executeQuery('select tehead_id,sheet_number,weekending,'
         + 'emp_code,formatmoney(sum(dollars)) as dollars,status '
         + 'from (select tehead_id,tehead_number as sheet_number,'
         + 'tehead_weekending as weekending,'
         + 'sum(teitem_qty) as hours,emp_code,'
         + 'sum(teitem_total) as dollars,'
         + 'tehead_status as status '
         + 'from te.teitem,te.tehead,emp '
         + 'where tehead_id = teitem_tehead_id '
         + 'and emp_id = teitem_emp_id '       
         + "and teitem_type = 'E' "
         + 'and tehead_weekending >= <? value("startDate") ?> '
         + 'and tehead_weekending <= <? value("endDate") ?> '
         + '<? if exists("excludeClosed") ?> '
         + "and COALESCE(tehead_status, 'O')<>'C' "
         + '<? endif ?> '
         + 'group by tehead_id,tehead_number,tehead_weekending,'
         + 'emp_code,tehead_status '
         + 'union '
         + 'select tehead_id,tehead_number as sheet_number,'
         + 'tehead_weekending as weekending, '
         + 'sum(teitem_qty) as hours,emp_code,'
         + 'sum(teitem_total) as dollars, '
         + 'tehead_status as status '
         + 'from te.teitem,te.tehead,emp '
         + 'where tehead_id = teitem_tehead_id '
         + 'and emp_id = teitem_emp_id '
         + "and teitem_type = 'T' "
         + 'and tehead_weekending >= <? value("startDate") ?> '
         + 'and tehead_weekending <= <? value("endDate") ?> '
         + '<? if exists("excludeClosed") ?> '
         + "and COALESCE(tehead_status, 'O')<>'C' "
         + '<? endif ?> '
         + 'group by '
         + 'tehead_id,tehead_number,tehead_weekending,emp_code,'
         + 'tehead_status '
         + 'order by sheet_number) rollup '
         + 'group by tehead_id,sheet_number,weekending,'
         + 'emp_code,status '
         + 'order by sheet_number;', params );
    }

    // specific employee
    if(_emp == "O"){
      q = toolbox.executeQuery('select tehead_id,sheet_number,'
         + 'weekending,emp_code, '
         + 'formatmoney(dollars) as dollars,status '
         + 'from (select tehead_id,sheet_number,weekending,'
         + 'emp_code,sum(dollars) as dollars,status '
         + 'from (select tehead_id,tehead_number as sheet_number,'
         + 'tehead_weekending as weekending,'
         + 'sum(teitem_qty) as hours,emp_code,'
         + 'sum(teitem_total) as dollars,'
         + 'tehead_status as status '
         + 'from te.teitem,te.tehead,emp '
         + 'where tehead_id = teitem_tehead_id '
         + 'and emp_id = teitem_emp_id '       
         + "and teitem_type = 'E' "
         + 'and emp_code = <? value("employee") ?> '
         + 'and tehead_weekending >= <? value("startDate") ?> '
         + 'and tehead_weekending <= <? value("endDate") ?> '
         + '<? if exists("excludeClosed") ?> '
         + "and COALESCE(tehead_status, 'O')<>'C' "
         + '<? endif ?> '
         + 'group by tehead_id,tehead_number,tehead_weekending,'
         + 'emp_code,tehead_status '
         + 'union '
         + 'select tehead_id,tehead_number as sheet_number,'
         + 'tehead_weekending as weekending, '
         + 'sum(teitem_qty) as hours,emp_code,'
         + 'sum(teitem_total) as dollars, '
         + 'tehead_status as status '
         + 'from te.teitem,te.tehead,emp '
         + 'where tehead_id = teitem_tehead_id '
         + 'and emp_id = teitem_emp_id '
         + "and teitem_type = 'T' "
         + 'and emp_code = <? value("employee") ?> '
         + 'and tehead_weekending >= <? value("startDate") ?> '
         + 'and tehead_weekending <= <? value("endDate") ?> '
         + '<? if exists("excludeClosed") ?> '
         + "and COALESCE(tehead_status, 'O')<>'C' "
         + '<? endif ?> '
         + 'group by '
         + 'tehead_id,tehead_number,tehead_weekending,emp_code,'
         + 'tehead_status '
         + 'order by sheet_number) rollup '
         + 'group by tehead_id,sheet_number,weekending,'
         + 'emp_code,status '
         + 'order by sheet_number) top '
         + ';', params );
    }

    _sheets.populate(q);
    if (q.lastError().type != QSqlError.NoError)
    {
      toolbox.messageBox("critical", mywindow,
                         qsTr("Database Error"), q.lastError().text);
      return;
    }
  }catch (e){
    print(e.lineNumber + ": " + e);
  }
}

function getParams()
{
  params = new Object();
  //if (_selected.checked)
  return params;
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
  params = new Object();
  params.headid = _sheets.id();
  toolbox.printReport("OpenSheetList",params);
}


function showAllEmployeesSwitch()
{
  if (_showAllEmployees.checked){  
    _employees.enabled = false;
  }else{
    _employees.enabled = true;
  }
  sFillList();
}

function sHandleButtons()
{

  var _status;

  _delete.enabled = false;
  _edit.enabled = false;
  _view.enabled = false;
  _approve.enabled = false;
  _expenseReport.enabled = false;
  _timeReport.enabled = false;

  var currentItem  = _sheets.currentItem();
  if (currentItem != null)
  {
    _status = currentItem.rawValue("status");
    if(_status != 'A')
    {
      if (privileges.check("MaintainTimeExpense")){
        _delete.enabled = true;
        _edit.enabled = true;
        _approve.enabled = true;
      }
      _view.enabled = true;
      _timeReport.enabled = true;
      _expenseReport.enabled = true;
    }else{
      _delete.enabled = false;
      _edit.enabled = false;
      _view.enabled = true;
      _timeReport.enabled = true;
      _expenseReport.enabled = true;

      _approve.enabled = false;
    }
  }
}


function populateEmployees()
{
  if (privileges.check("MaintainTimeExpenseOthers"))
  {
    _showAllEmployees.visible = true;

    var params = new Object; 
    q = toolbox.executeQuery("select emp_id,emp_code from emp "
                        + "where emp_code = CURRENT_USER;",params);
    if (q.first())
    {      
      _x = (q.value("emp_id"));
      _employees.populate("SELECT emp_id,emp_code FROM emp order by emp_code",_x);
    }   
    else
    {
      _employees.populate("SELECT emp_id,emp_code FROM emp order by emp_code");
      //toolbox.messageBox("critical", mywindow, mywindow.windowTitle, qsTr("It appears that your current user isn't an active employee.") );    
    }    
  }else{
    _showAllEmployees.visible = false;
    if (privileges.check("MaintainTimeExpenseSelf"))
    {
      _employees.populate("SELECT emp_id,emp_code FROM emp "
                 + "where emp_code = CURRENT_USER");

      if (!_employees.count)
      {
        toolbox.messageBox("critical", mywindow, mywindow.windowTitle, qsTr("It appears that your current user isn't an active employee.") );               
      }                    
                 
    }else{
      toolbox.messageBox("critical", mywindow, qsTr("Permissions Error"),
                    qsTr("You do not have permissions to maintain time and expense entries"));
      if (mywindow.windowModality)
        mydialog.reject();
      else
        mywindow.close();
    }
  }
} //populateEmployees

