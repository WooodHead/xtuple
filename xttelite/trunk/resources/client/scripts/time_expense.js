include("teglobal");

// Define local variables
var _hours              = mywindow.findChild("_hours");
var _total              = mywindow.findChild("_total");	
var _totalLit           = mywindow.findChild("_totalLit");	
var _rate               = mywindow.findChild("_rate");
var _rateLit            = mywindow.findChild("_rateLit");
var _clients            = mywindow.findChild("_clients");
var _employee           = mywindow.findChild("_employee");
var _items              = mywindow.findChild("_items");
var _po		 = mywindow.findChild("_po");
var _project            = mywindow.findChild("_project");
var _task               = mywindow.findChild("_task");
var _linenumber         = mywindow.findChild("_linenumber");
var _sheet              = mywindow.findChild("_sheet");
var _buttonBox          = mywindow.findChild("_buttonBox");
var _weekending         = mywindow.findChild("_weekending");
var _workdate           = mywindow.findChild("_workdate");
var _radioTime          = mywindow.findChild("_radioTime");
var _radioExpense       = mywindow.findChild("_radioExpense");
var _qtyLabel           = mywindow.findChild("_qtyLabel");
var _billable           = mywindow.findChild("_billable");
var _prepaid            = mywindow.findChild("_prepaid");
var _budgetactual       = mywindow.findChild("_budgetactual");	
var _actual             = mywindow.findChild("_actual");
var _budget             = mywindow.findChild("_budget");
var _actualCost         = mywindow.findChild("_actualCost");
var _budgetCost         = mywindow.findChild("_budgetCost");
var _notes              = mywindow.findChild("_notes");
var _prev               = mywindow.findChild("_previous");
var _next               = mywindow.findChild("_new");
var _sheetLit 	 = mywindow.findChild("_sheetLit");

_cancel = _buttonBox.button(QDialogButtonBox.Cancel);
_prev = _buttonBox.addButton(qsTr("Prev"), QDialogButtonBox.ActionRole);
_next = _buttonBox.addButton(qsTr("Next"), QDialogButtonBox.ActionRole);

_prev.enabled = false;
_next.enabled = false;

var _sheetnum;
var _linenum;
var _teitemid = -1;
var _headid = -1;
var _taskid = -1;
var _site;
var _mode = _newMode;
var _modified = false;

_task.enabled = false;

// Define connections
_buttonBox.accepted.connect(sSaveClose);
_buttonBox.rejected.connect(mydialog, "reject");
_prev.clicked.connect(sPrev);
_next.clicked.connect(sNext);

_task.newID.connect(sHandleTask);
_rate.valueChanged.connect(extension);
_hours.valueChanged.connect(extension);
_items["newId(int)"].connect(getPrice);
_radioTime.toggled.connect(timeswitch);
_radioExpense.toggled.connect(expenseswitch);
_clients["newId(int)"].connect(getPrice);
_project["newId(int)"].connect(projectChange);
_employee.newId.connect(modified);
_po.textChanged.connect(modified);
_workdate.newDate.connect(modified);
_billable.toggled.connect(modified);
_prepaid.toggled.connect(modified);
_notes.textChanged.connect(modified);

// Initialize default states
_weekending.enabled = false;
_linenumber.enabled = true;
_task.enabled = false;
_employee.enabled = false;
_prev.enabled = false;
_next.enabled = false;
_total.enabled=false;
_total.readonly = true;
_radioTime.checked = true;
_billable.visible = true;
_prepaid.visible = false;

_items.setQuery("SELECT item_id,item_number,item_descrip1,item_descrip2, "
              + "       item_type,item_config,item_upccode,uom_name "
              + "FROM item JOIN uom ON (uom_id=item_inv_uom_id) "
              + "          JOIN te.teexp ON (teexp_id=item_id) "
              + "WHERE item_type='R' ");


function set(input)
{
  if("emp_id" in input)
    _employee.setId(input.emp_id);
  
  if("weekending" in input)
  {
    _weekending.date = input.weekending;
    _weekending.enabled = false;
  }

  if ("tehead_id" in input)
    _headid = input.tehead_id;

  if ("site" in input)
    _site = input.site;

  if ("teitem_id" in input)
    _teitemid = input.teitem_id;

  if ("mode" in input)
  {
    _mode = input.mode;

    if (input.mode == _newMode)
      sNew();
    else 
    { 
      populate();
      if (input.mode == _viewMode)
      {
        _buttonBox.setStandardButtons(QDialogButtonBox.Close);
        _sheetLit.visible=true;
        _weekending.enabled = false;
        _next.enabled = false;
        _prepaid.enabled = false;
        _radioTime.enabled = false;
        _radioExpense.enabled = false;
        _weekending.enabled = false;
        _workdate.enabled = false;
        _hours.enabled = false;
        _rate.enabled = false;
        _items.enabled = false;
        _employee.enabled = false;
        _clients.enabled = false;
        _po.enabled = false;
        _project.enabled = false;
        _task.enabled = false;
        _notes.enabled = false;
        _billable.enabled = false; 
      }
    }
  }
  
  return mainwindow.NoError;
}

function extension()
{
  _total.localValue = (_hours.localValue * _rate.localValue)
  _modified = true;
}

function gettask()
{
  if (_project.isValid())
  {
    var params = new Object();
    params.prj = _project.id();
    params.prjnum = _project.number;
    params.name = qsTr("Default");

    var qry = toolbox.executeDbQuery("te", "gettask", params);
    if(!errorCheck(qry))
      return;

    _task.populate(qry);

    if(_taskid > 0)
      _task.setId(_taskid);

    if (!qry.first())
    {
      var msg = qsTr("No task found. A default task will be added");
      toolbox.messageBox("critical", mywindow, qsTr("task"), msg);
      toolbox.executeDbQuery("time_expense","instask",params);

      qry = toolbox.executeDbQuery("te", "gettask", params);
      _task.populate(qry);
    }

    getPrice();
    setActualBudget();
  }
}

function modified()
{
  _modified = true;
}

function sHandleTask()
{  
  getPrice();
  setActualBudget();
  modified();
}

function getPrice()
{
  if (_modified)
    return;

  var params = new Object();
  params.item_id = _items.id();
  params.task_id = _task.id();
  params.prj_id = _project.id();
  params.cust_id = _clients.id();
  params.emp_id = _employee.id();
  if (_radioTime.checked)
    params.time = true;
  
  var qry = toolbox.executeDbQuery("time_expense","getterate");
  
  if (qry.first())
    _rate.setLocalValue(qry.value("rate"));
  else
    errorCheck(qry);

  modified();
}

function populate()
{
  _modified = false;
 
  // Edit or View mode
  var params = new Object();
  params.teitem_id = _teitemid;

  q = toolbox.executeDbQuery("time_expense","detail", params);
  if (q.first())
  {
    if (q.value("teitem_type") == "T") 
      _radioTime.checked = true;
    else
      _radioExpense.checked = true;

    _billable.checked = q.value("teitem_billable");
    _prepaid.checked = q.value("teitem_prepaid")
    _weekending.date = (q.value("tehead_weekending"));
    _workdate.date = (q.value("teitem_workdate"));
    _rate.localValue = (q.value("teitem_rate"));
    _saverate = q.value("teitem_rate");
    _hours.localValue = (q.value("teitem_qty"));
    _items.setId(q.value("teitem_item_id"));
    _employee.setId(q.value("tehead_emp_id"));
    _clients.setId(q.value("teitem_cust_id"));
    _po.text = (q.value("teitem_po"));
    _project.setId(q.value("teitem_prj_id"));
    _taskid = q.value("teitem_prjtask_id");
    _sheet.text = (q.value("tehead_number"));
    _sheetnum = (q.value("tehead_number"));
    _linenumber.text = (q.value("teitem_linenumber"));
    _linenum = (q.value("teitem_linenumber"));
    _notes.plainText = q.value("teitem_notes");

    _rate.localValue = _saverate;
    _total.localValue = (q.value("teitem_total"));

    _next.enabled = (!q.value("ismax"));
    _prev.enabled = (_linenum > 1);

    _modified = false;
  }
  else if (!errorCheck)
    return;
}

function sSaveClose()
{
  if (sSave())
  {
    if (_mode == _newMode)
      sNew();
    else
      mywindow.close();
  }
}

function sSave()
{
    try
    {
      if (!_clients.isValid())
        throw new Error(qsTr("Customer Required"));

      if (!_workdate.isValid())
        throw new Error(qsTr("Work Date Required"));
    
      if (!_project.isValid())
        throw new Error(qsTr("Project Required"));
 
      if (!_items.isValid())
        throw new Error(qsTr("Item Required"));

      if (_task.id == -1)
        throw new Error(qsTr("Task Required"));
    }
    catch (e)
    {
      QMessageBox.critical(mywindow, qsTr("Processing Error"), e.message);
      return false;
    }

    var params = new Object();
    params.teitem_tehead_id      = _headid;
    params.teitem_linenumber     = _linenum;
    if (_radioTime.checked)
      params.teitem_type = "T";
    else
      params.teitem_type = "E";
    params.teitem_workdate       = _workdate.date;
    params.teitem_cust_id        = _clients.id();
    params.teitem_po             = _po.text;
    params.teitem_item_id        = _items.id();
    params.teitem_qty            = _hours.localValue;
    params.teitem_rate           = _rate.localValue;
    params.teitem_total          = _total.localValue;
    params.teitem_prj_id         = _project.id();
    params.teitem_prjtask_id     = _task.id();
    params.teitem_billable       = _billable.checked;
    params.teitem_prepaid        = _prepaid.checked;
    params.teitem_notes          = _notes.plainText;
    params.teitem_id             = _teitemid;

    var query;
    if (_teitemid > 0)
      query = "updteitem";
    else
      query = "insteitem";

    var q = toolbox.executeDbQuery("time_expense", query, params);
    if (q.first())
      _teitemid = q.value("teitem_id");
    else if (!errorCheck(q))
      return;

    _prev.enabled = true;

    return true;
}


function timeswitch()
{
  if (_radioTime.checked)
  {
    _qtyLabel.text = "Hours:";
    _billable.visible = true;
    _prepaid.visible = false;
  }
  getPrice();
  modified();
}


function expenseswitch()
{
  if (_radioExpense.checked)
  {
    _qtyLabel.text = "Qty:";
    _billable.visible = true;
    _prepaid.visible = true;
    _rate.localValue = 0;
  }
  getPrice();
  modified();
}

function projectChange()
{
  //enable and reset the task fields
  if(_project.isValid() && _mode != _viewMode)
  {
    _next.enabled = true;
    _task.enabled = true;
    gettask();
  }
  else
  {
    _next.enabled = false;
    _task.enabled = false;
  }
  modified();
}


function setActualBudget()
{
  var params = new Object;
  params.prjid = _project.id();
  params.taskid = _task.id();
 
  var q = toolbox.executeDbQuery("time_expense", "taskbudg",params);
  if (q.first())
  {
    _budget.text = q.value("budget_hours");        
    _actual.text = q.value("actual_hours");       
    _budgetCost.text = q.value("budget_cost");        
    _actualCost.text = q.value("actual_cost");        
    
  }
  else 
    errorCheck(q);
}


function rollupActual()
{
  var parms = new Object;
  parms.taskid = _task.id();

  _totalCost = 0;
  _totalhrs = 0;    

  // get the task actuals then add the current
  var q = toolbox.executeDbQuery("time_expense","taskrollup",parms);

  if (q.first())
  {
    if(_radioTime.checked)
      _actual.setText(q.value("total_hours"));

    _actualCost.setText(q.value("total_cost"));
  } 
  else
    errorCheck(q);
}


function sPrev()
{

  if (_modified)
  {
    if (MessageBox.question(mywindow,
                       qsTr("Unsaved Changed"),
                       qsTr("<p>You have made some changes "
                       + "which have not yet been saved!\n" 
                       + "Would you like to save them now?"),
                        QMessageBox.Save, QMessageBox.Cancel) != QMessageBox.Save)
      return;

    sSave();
  }

  var params = new Object;
  params.teitem_id = _teitemid;

  var q = toolbox.executeDbQuery("time_expense", "teitemprev", params);

  if (q.first())
  {
    _teitemid = q.value("teitem_id");
    _modified = false;

    if (_mode == _newMode)
      _mode = _editMode;

    _next.enabled = true;
    populate();
  }
  else
    errorCheck(q);
}


function sNext()
{
  if (_modified)
  {

    if (toolbox.messageBox("question", mywindow,
                       qsTr("Unsaved Changed"),
                       qsTr("<p>You have made some changes "
                       + "which have not yet been saved!\n" 
                       + "Would you like to save them now?"),
                        QMessageBox.Save, QMessageBox.Cancel) != QMessageBox.Save)
    return;

    sSave();
  }

  var params = new Object;
  params.teitem_id = _teitemid;
  var q = toolbox.executeDbQuery("time_expense","teitemnext",params);

  if (q.first())
  {
    _modified = false;
    _teitemid = q.value("teitem_id");
    _prev.enabled = true;
    populate();
  }
  else if (errorCheck(q))
    sNew();
}

function sNew()
{
  var params = new Object();
  params.tehead_id = _headid;

  var q = toolbox.executeDbQuery("te","header",params);

  if (q.first())
  {
    _weekending.date = (q.value("tehead_weekending"));      
    _sheet.text = (q.value("tehead_number"));
    _sheetnum = (q.value("tehead_number"));
    _employee.setId(q.value("tehead_emp_id"));
  }
  else if (!errorCheck(q))
    return;

  q = toolbox.executeDbQuery("time_expense", "nextlinenum", params);
  if (q.first())
  {
    _linenumber.setText(q.value("linenumber"));
    _linenum = (q.value("linenumber"));
  } 
  else 
    errorCheck(q);

  _teitemid = -1;
  _prev.enabled = true;
  _radioTime.enabled = true;
  _radioExpense.enabled = true;
  _workdate.clear();
  _workdate.enabled = true;
  _workdate.setFocus();
  _hours.localValue = 0;
  _hours.enabled = true;
  _rate.localValue = 0;
  _rate.enabled = true;
  _items.enabled = true;
  _items.setId(-1);
  _employee.enabled = false;
  _clients.enabled = true;
  _po.clear();
  _po.enabled = true;
  _project.enabled = true;
  _task.enabled = true;
  _notes.clear();
  _notes.enabled = true;

  getPrice();

  _modified = false;
}


function sSetSecurity()
{
  if (privileges.check("CanViewRates")){
    _rate.visible = true;
    _total.visible = true;
    _budgetactual.visible = true;
    _rateLit.visible = true;
    _totalLit.visible = true;
  }
  else
  {
    _rate.visible = false;
    _total.visible = false;
    _budgetactual.visible = false;
    _rateLit.visible = false;
    _totalLit.visible = false;
  }
}

getPrice();
sSetSecurity();