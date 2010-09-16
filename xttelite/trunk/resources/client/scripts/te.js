include("teglobal");

// Define Variables
var _all		= mywindow.findChild("_all");
var _buttonBox 	= mywindow.findChild("_buttonBox");
var _edit 		= mywindow.findChild("_edit");
var _new		= mywindow.findChild("_new");
var _delete		= mywindow.findChild("_delete");
var _view		= mywindow.findChild("_view");
var _print 		= mywindow.findChild("_print");
var _printSheet	= mywindow.findChild("_printSheet");
var _lines		= mywindow.findChild("_lines");
var _selected	= mywindow.findChild("_selected");
var _weekending	= mywindow.findChild("_weekending");
var _employee	= mywindow.findChild("_employee");
var _sheetNumberExtra  = mywindow.findChild("_sheetNumberExtra");
var _site		= mywindow.findChild("_site");
var _orderComments     = mywindow.findChild("_orderComments");

var _sheet;
var _id = -1;
var _type;
var _admin;

_printSheet.visible = false; // Not implemented yet

//add logic to determine the next Sunday date and populate both start and end with it
_lines.addColumn(qsTr("Line #"),		XTreeWidget.seqColumn,  Qt.AlignLeft,    true, "teitem_linenumber");
_lines.addColumn(qsTr("Sheet Date"),	XTreeWidget.dateColumn, Qt.AlignLeft,    false, "tehead_weekending");
_lines.addColumn(qsTr("Work Date"),	XTreeWidget.dateColumn, Qt.AlignLeft,    true, "teitem_workdate");
_lines.addColumn(qsTr("Project#"),		XTreeWidget.orderColumn,Qt.AlignLeft,    true, "prj_number");
_lines.addColumn(qsTr("Project Name"),	-1,		 Qt.AlignLeft,    false,"prj_name");
_lines.addColumn(qsTr("Task#"),		XTreeWidget.orderColumn,Qt.AlignLeft,    true, "prjtask_number");
_lines.addColumn(qsTr("Task Name"),	-1,		 Qt.AlignLeft,    false,"prjtask_name");
_lines.addColumn(qsTr("Cust.#"),		XTreeWidget.orderColumn,Qt.AlignLeft,    false, "cust_number");
_lines.addColumn(qsTr("Cust. Name"),	-1,		 Qt.AlignLeft,    false, "cust_name");
_lines.addColumn(qsTr("PO"),		XTreeWidget.orderColumn,Qt.AlignLeft,    false, "teitem_po");
_lines.addColumn(qsTr("Item"),		XTreeWidget.itemColumn, Qt.AlignLeft,    true, "item_number");
_lines.addColumn(qsTr("Description"),	-1,  		 Qt.AlignLeft,    true, "item_descrip1");
_lines.addColumn(qsTr("Units"), 		XTreeWidget.qtyColumn,  Qt.AlignRight,   true, "teitem_qty");

if (privileges.check("CanViewRates"))
{
  _lines.addColumn(qsTr("Billable"),	XTreeWidget.ynColumn, Qt.AlignLeft,    true, "teitem_billable");
  _lines.addColumn(qsTr("Rate"),		XTreeWidget.priceColumn, Qt.AlignRight,   false, "teitem_rate");
  _lines.addColumn(qsTr("Extended"),	XTreeWidget.moneyColumn, Qt.AlignRight,   false, "teitem_total");
}
_lines.addColumn(qsTr("Type"),		XTreeWidget.docTypeColumn,  Qt.AlignLeft,    true, "teitem_type");

_employee.enabled = privileges.check("MaintainTimeExpenseOthers");
_new.enabled = false;

// Make connections
_lines.itemSelected.connect(_edit, "animateClick");
_employee.newId.connect(sHandleNewButton);
_weekending.newDate.connect(sHandleNewButton);

_buttonBox.accepted.connect(saveClicked);
_buttonBox.rejected.connect(sClose);

_new.clicked.connect(lineNew);
_edit.clicked.connect(lineEdit);
_delete.clicked.connect(lineDelete);
_view.clicked.connect(lineView);

function set(input)
{
  _sheet = input.sheet;

  if("emp_id" in input)
    _employee.setId(input.emp_id);

  if ("tehead_id" in input)
    _id = input.tehead_id;

  if("mode" in input)
  {
    if (input.mode == _newMode)
    {
      _mode = "new";
      _weekending.enabled = true;
    }
    else if (input.mode == _editMode)
    {
      _mode = "edit";
      _weekending.enabled = false;
      _employee.enabled = false;
      _site.enabled = false;
      var shortcut = _buttonBox.button(QDialogButtonBox.Cancel).shortcut;
      _buttonBox.removeButton(_buttonBox.button(QDialogButtonBox.Cancel));
      _buttonBox.addButton(QDialogButtonBox.Close);
      _buttonBox.button(QDialogButtonBox.Close).shortcut = shortcut;

      populate();
    }
    else if (input.mode == _viewMode)
    {
      _mode = "view";
      _lines.enabled = false;
      _orderComments.enabled = false;
      var shortcut = _buttonBox.button(QDialogButtonBox.Cancel).shortcut;
      _buttonBox.clear();
      _buttonBox.addButton(QDialogButtonBox.Close);
      _buttonBox.button(QDialogButtonBox.Close).shortcut = shortcut;

      populate();
    }
  }

  return mainwindow.NoError;
}

function lineDelete()
{
  var msg = qsTr("Are you sure you want to delete this line?");
  if (QMessageBox.question(mywindow, mywindow.windowTitle, msg, 
        QMessageBox.Yes | QMessageBox.Escape, 
       QMessageBox.No | QMessageBox.Default) == QMessageBox.Yes)
  {
    var params   = new Object();
    params.teitem_id = _lines.id();  

    q = toolbox.executeDbQuery("te","delteitem", params );
    errorCheck(q);
    sFillList();
  }
}

function lineNew()
{
  if (!sSave())
    return;

  lineOpen(_newMode);  

  _weekending.enabled = false;
  _employee.enabled = false;
  _site.enabled = false;

  //need to get the id here
  sFillList();
}

function lineEdit()
{
  lineOpen(_editMode);
}


function lineView()
{
  lineOpen(_viewMode);
}


function lineOpen(mode)
{  
  var params   = new Object;
  params.tehead_id = _id;
  params.site = _site.text;
  params.weekending = _weekending.date;
  params.emp_id = _employee.id();
  params.mode = mode;
  if (mode) // Not new
    params.teitem_id = _lines.id();

  var wnd = toolbox.openWindow("time_expense", mywindow);
  toolbox.lastWindow().set(params);
  wnd.exec();

  sFillList();
}

function saveClicked()
{
  if (!sSave())
    return;

  mywindow.close();
}

function sSave()
{
  try
  {
    if (!_employee.isValid())
      throw new Error(qsTr("Employee Required"));

    if (!_weekending.isValid())
      throw new Error(qsTr("Week Ending Date Required"));
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, qsTr("Processing Error"), e.message);
    return;
  }

  var params   = new Object();
  params.emp_id = _employee.id();
  params.site = _site.text;
  params.weekending = _weekending.date;
  params.notes = _orderComments.plainText;

  var query = "updtehead";
  if (_id == -1)
    query = "instehead";

  q = toolbox.executeDbQuery("te", query, params );
  if (q.first())
  {
    _id = q.value("tehead_id");
    _sheetNumberExtra.text = q.value("tehead_number");
  }
  else if (!errorCheck(q))
    return false;

  return true;
}

function sHandleNewButton()
{
  _new.enabled = _weekending.isValid() && _employee.isValid();
}

function populate()
{
  var params = new Object;
  params.type = _type;
  params.emp = _employee.id();
  params.tehead_id = _id;

  q = toolbox.executeDbQuery("te", "header", params);

  if (q.first())
  {    
    _weekending.date = q.value("tehead_weekending");
    _sheetNumberExtra.text = q.value("tehead_number");
    _employee.setId(q.value("tehead_emp_id"));
    _site.text = q.value("tehead_site");
    _orderComments.setPlainText(q.value("tehead_notes"));
  }
  else if (!errorCheck(q))
    return;

  if (_mode == "view")
  {
    _weekending.enabled = false;
    _employee.enabled = false;
    _site.enabled = false;
  }

  sFillList();
}

function sFillList()
{
  var params = new Object;
  params.tehead_id = _id;
  params.time = qsTr("Time");
  params.expense = qsTr("Expense");
  params.error = qsTr("Error");

  q = toolbox.executeDbQuery("te", "detail", params);

  _lines.populate(q);

  errorCheck(q);
}

function sClose()
{
  if (_mode == _newMode && _id != -1)
  {
    if (MessageBox.question(mywindow,
                       qsTr("Delete Sheet"),
                       qsTr("<p>Are you sure you want to cancel this "
                       + "sheet and discard all your changes?"),
                        QMessageBox.Yes, QMessageBox.No) == QMessageBox.Yes)
    {
      var params = new Object;
      params.tehead_id = _id;

      toolbox.executeDbQuery("te", "deltehead", params);
    }
    else
      return;
  }

  mywindow.close();
}



