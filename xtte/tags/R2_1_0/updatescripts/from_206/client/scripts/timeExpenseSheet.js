/*
 * This file is part of the xtte package for xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

debugger;
var _debug = false;
include("xtte");

try
{
  if (_debug)
    print("xtte.timeExpenseSheet script entered");

  // Define Variables
  xtte.timeExpenseSheet = new Object;

  var _all                = mywindow.findChild("_all");
  var _buttonBox          = mywindow.findChild("_buttonBox");
  var _edit               = mywindow.findChild("_edit");
  var _new                = mywindow.findChild("_new");
  var _delete             = mywindow.findChild("_delete");
  var _view               = mywindow.findChild("_view");
  var _print              = mywindow.findChild("_print");
  var _printSheet         = mywindow.findChild("_printSheet");
  var _lines              = mywindow.findChild("_lines");
  var _selected           = mywindow.findChild("_selected");
  var _weekending         = mywindow.findChild("_weekending");
  var _employee           = mywindow.findChild("_employee");
  var _sheetNumberExtra   = mywindow.findChild("_sheetNumberExtra");
  var _site               = mywindow.findChild("_site");
  var _orderComments      = mywindow.findChild("_orderComments");
  var _documents          = mywindow.findChild("_documents");

  var _sheet;
  var _id = -1;
  var _type;
  var _admin;

  _lines.addColumn(qsTr("Type"),		XTreeWidget.docTypeColumn,Qt.AlignLeft,    false,  "teitem_type");

  //add logic to determine the next Sunday date and populate both start and end with it
  _lines.addColumn(qsTr("Line #"),        XTreeWidget.seqColumn,    Qt.AlignLeft,    true,   "teitem_linenumber");
  _lines.addColumn(qsTr("Sheet Date"),    XTreeWidget.dateColumn,   Qt.AlignLeft,    false,  "tehead_weekending");
  _lines.addColumn(qsTr("Work Date"),     XTreeWidget.dateColumn,   Qt.AlignLeft,    true,   "teitem_workdate");
  _lines.addColumn(qsTr("Project#"),      XTreeWidget.orderColumn,  Qt.AlignLeft,    true,   "prj_number");
  _lines.addColumn(qsTr("Project Name"),  -1,                       Qt.AlignLeft,    false,  "prj_name");
  _lines.addColumn(qsTr("Task#"),         XTreeWidget.orderColumn,  Qt.AlignLeft,    true,   "prjtask_number");
  _lines.addColumn(qsTr("Task Name"),     -1,                       Qt.AlignLeft,    false,  "prjtask_name");
  _lines.addColumn(qsTr("Cust.#"),        XTreeWidget.orderColumn,  Qt.AlignLeft,    false,  "cust_number");
  _lines.addColumn(qsTr("Cust. Name"),    -1,                       Qt.AlignLeft,    false,  "cust_name");
  _lines.addColumn(qsTr("PO"),            XTreeWidget.orderColumn,  Qt.AlignLeft,    false,  "teitem_po");
  _lines.addColumn(qsTr("Item"),          XTreeWidget.itemColumn,   Qt.AlignLeft,    true,   "item_number");
  _lines.addColumn(qsTr("Description"),   -1,                       Qt.AlignLeft,    true,   "item_descrip1");
  _lines.addColumn(qsTr("Hours"),         XTreeWidget.qtyColumn,    Qt.AlignRight,   true,   "hours");
  _lines.addColumn(qsTr("Expense"),       XTreeWidget.qtyColumn,    Qt.AlignRight,   true,   "expense");
  _lines.addColumn(qsTr("Notes"),         -1,    Qt.AlignLeft,    false,  "f_notes");


  if (privileges.check("CanViewRates"))
  {
    _lines.addColumn(qsTr("Billable"),    XTreeWidget.ynColumn,     Qt.AlignLeft,    true,   "teitem_billable");
    _lines.addColumn(qsTr("Rate"),        XTreeWidget.priceColumn,  Qt.AlignRight,   false,  "teitem_rate");
    _lines.addColumn(qsTr("Extended"),    XTreeWidget.moneyColumn,  Qt.AlignRight,   false,  "teitem_total");
  }

}

catch (e)
{
  QMessageBox.critical(mywindow, "timeExpenseSheet",
                       qsTr("timeExpenseSheet.js exception: ") + e);
}

set = function(input)
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.set entered");

    if("emp_id" in input)
      _employee.setId(input.emp_id); 
    
    if("sheet" in input)  
      _sheet = input.sheet;

    if ("tehead_id" in input)
    {
      _id = input.tehead_id;
      _documents.setId(_id);
    }

    if("mode" in input)
    {
      if (input.mode <= xtte.editMode)
      {
        _lines["valid(bool)"].connect(_edit["setEnabled(bool)"]);
        _lines["valid(bool)"].connect(_delete["setEnabled(bool)"]);
        _lines.itemSelected.connect(_edit, "animateClick");
      }

      if (input.mode == xtte.newMode)
      {
        _mode = "new";
        _weekending.enabled = true;
      }
      else if (input.mode == xtte.editMode)
      {
        _mode = "edit";
        _weekending.enabled = false;
        _employee.enabled = false;
        _site.enabled = false;
        var shortcut = _buttonBox.button(QDialogButtonBox.Cancel).shortcut;
        _buttonBox.removeButton(_buttonBox.button(QDialogButtonBox.Cancel));
        _buttonBox.addButton(QDialogButtonBox.Close);
        _buttonBox.button(QDialogButtonBox.Close).shortcut = shortcut;

        xtte.timeExpenseSheet.populate();
      }
      else if (input.mode == xtte.viewMode)
      {
        _mode = "view";
        _new.enabled = false;
        _orderComments.enabled = false;
        var shortcut = _buttonBox.button(QDialogButtonBox.Cancel).shortcut;
        _buttonBox.clear();
        _buttonBox.addButton(QDialogButtonBox.Close);
        _buttonBox.button(QDialogButtonBox.Close).shortcut = shortcut;
        _lines.itemSelected.connect(_view, "animateClick");
        _printSheet.hide();

        xtte.timeExpenseSheet.populate();
      }
    }
    return mainwindow.NoError;
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("set exception: ") + e);
  }
}

xtte.timeExpenseSheet.populateMenu = function(pMenu, pItem, pCol)
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.populateMenu entered");

    var tmpact;

    if(pMenu == null)
      pMenu = _lines.findChild("_menu");

    if(pMenu != null)
    {
      var currentItem  = _lines.currentItem();
      if (currentItem != null)
      {
        tmpact = pMenu.addAction(qsTr("Edit..."));
        tmpact.triggered.connect(xtte.timeExpenseSheet.editItem);
        tmpact.enabled = (_mode != "view" && privileges.check("MaintainTimeExpense"));

        tmpact = pMenu.addAction(qsTr("View..."));
        tmpact.triggered.connect(xtte.timeExpenseSheet.viewItem);

        tmpact = pMenu.addAction(qsTr("Delete..."));
        tmpact.triggered.connect(xtte.timeExpenseSheet.deleteItem);
        tmpact.enabled = (_mode != "view" && privileges.check("MaintainTimeExpense"));
      }
    }
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("populateMenu exception: ") + e);
  }
}

xtte.timeExpenseSheet.deleteItem = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.deleteItem entered");

    var msg = qsTr("Are you sure you want to delete this line?");
    if (QMessageBox.question(mywindow, mywindow.windowTitle, msg,
          QMessageBox.Yes | QMessageBox.Escape,
          QMessageBox.No | QMessageBox.Default) == QMessageBox.Yes)
    {
      var params   = new Object();
      params.teitem_id = _lines.id();

      q = toolbox.executeDbQuery("timeexpensesheet","delteitem", params );
      xtte.errorCheck(q);
      xtte.timeExpenseSheet.fillList();
    }
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("deleteItem exception: ") + e);
  }
}

xtte.timeExpenseSheet.newItem = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.newItem entered");

    if (!xtte.timeExpenseSheet.save())
      return;

    xtte.timeExpenseSheet.openItem(xtte.newMode);
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("newItem exception: ") + e);
  }
}

xtte.timeExpenseSheet.editItem = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.editItem entered");

    xtte.timeExpenseSheet.openItem(xtte.editMode);
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("editItem exception: ") + e);
  }
}

xtte.timeExpenseSheet.viewItem = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.viewItem entered");

    xtte.timeExpenseSheet.openItem(xtte.viewMode);
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("viewItem exception: ") + e);
  }
}

xtte.timeExpenseSheet.openItem = function(mode)
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.openItem entered");

    var params   = new Object;
    params.tehead_id = _id;
    params.site = _site.text;
    params.weekending = _weekending.date;
    params.emp_id = _employee.id();
    params.mode = mode;
    if (mode) // Not new
      params.teitem_id = _lines.id();

    var wnd = toolbox.openWindow("timeExpenseSheetItem", mywindow);
    toolbox.lastWindow().set(params);
    wnd.exec();

    xtte.timeExpenseSheet.fillList();
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("openItem exception: ") + e);
  }
}

xtte.timeExpenseSheet.accepted = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.accepted entered");

    if (!xtte.timeExpenseSheet.save())
      return;

    if (_printSheet.checked)
      xtte.timeExpenseSheet.printSheet();

    mywindow.close();
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("accepted exception: ") + e);
  }
}

xtte.timeExpenseSheet.save = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.save entered");

    if (!_employee.isValid())
      throw new Error(qsTr("Employee Required"));

    if (_site.id() == -1)
      throw new Error(qsTr("Site Required"));

    if (!_weekending.isValid())
      throw new Error(qsTr("Week Ending Date Required"));

    var params   = new Object();
    params.tehead_id = _id;
    params.emp_id = _employee.id();
    params.warehous_id = _site.id();
    params.weekending = _weekending.date;
    params.notes = _orderComments.plainText;

    var query = "updtehead";
    if (_id == -1)
      query = "instehead";

    q = toolbox.executeDbQuery("timeexpensesheet", query, params );
    if (q.first())
    {
      _id = q.value("tehead_id");
      _documents.setId(_id);
      _sheetNumberExtra.text = q.value("tehead_number");
    }
    else if (!xtte.errorCheck(q))
      return false;

    _weekending.enabled = false;
    _employee.enabled = false;
    _site.enabled = false;

    return true;
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, qsTr("timeExpenseSheet"), e.message);
    return false;
  }
}

xtte.timeExpenseSheet.handleNewButton = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.handleNewButton entered");

    _new.enabled = (_weekending.isValid() &&
                    _employee.isValid() &&
                    _mode != "view");
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                        qsTr("handleNewButton exception: ") + e);
  }
}

xtte.timeExpenseSheet.populate = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.populate entered");

    var params = new Object;
    params.type = _type;
    params.emp = _employee.id();
    params.tehead_id = _id;

    q = toolbox.executeDbQuery("timeexpensesheet", "header", params);

    if (q.first())
    {
      _weekending.date = q.value("tehead_weekending");
      _sheetNumberExtra.text = q.value("tehead_number");
      _employee.setId(q.value("tehead_emp_id"));
      _site.setId(q.value("tehead_warehous_id"));
      _orderComments.setPlainText(q.value("tehead_notes"));
    }
    else if (!xtte.errorCheck(q))
      return;

    if (_mode == "view")
    {
      _weekending.enabled = false;
      _employee.enabled = false;
      _site.enabled = false;
    }

    xtte.timeExpenseSheet.fillList();
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("populate exception: ") + e);
  }
}

xtte.timeExpenseSheet.testCurrEmpId = function()
{
  var params = new Object;
  params.emp_id = _employee.id();
  qry = toolbox.executeQuery("SELECT crmacct_emp_id = <? value('emp_id') ?>::integer AS test "
                     + "FROM  crmacct "
                     + "WHERE crmacct_usr_username = getEffectiveXtUser();", params);
  if (qry.first()) {
    return qry.value("test");
  }
  else
    QMessageBox.information(mywindow, "Database Error", qry.lastError().text);
  return false;
}

xtte.timeExpenseSheet.fillList = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.fillList entered");

    if ( ( privileges.check("MaintainEmpCostSelf") && xtte.timeExpenseSheet.testCurrEmpId()) || privileges.check("MaintainEmpCostAll") )
    {
      _lines.addColumn(qsTr("Hourly Cost"),   XTreeWidget.priceColumn,  Qt.AlignRight,   false,  "teitem_hrlycost");
      _lines.addColumn(qsTr("Total Cost"),   XTreeWidget.priceColumn,  Qt.AlignRight,   false,  "teitem_totalcost");
    }

    var params = new Object;
    params.tehead_id = _id;
    params.time = qsTr("Time");
    params.expense = qsTr("Expense");
    params.error = qsTr("Error");

    q = toolbox.executeDbQuery("timeexpensesheet", "detail", params);

    _lines.populate(q);

    xtte.errorCheck(q);
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("fillList exception: ") + e);
  }
}

xtte.timeExpenseSheet.printSheet = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.printSheet entered");

    var params = new Object;
    params.tehead_id = _id;
    params.approved  = qsTr("Approved");
    params.closed    = qsTr("Closed");
    params.open      = qsTr("Open");

    toolbox.printReport("TimeExpenseSheet", params);
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("printSheet exception: ") + e);
  }
}

xtte.timeExpenseSheet.close = function()
{
  try
  {
    if (_debug)
      print("xtte.timeExpenseSheet.close entered");

    if (_mode == "new" && _id != -1)
    {
      if (QMessageBox.question(mywindow,
                         qsTr("Delete Sheet"),
                         qsTr("<p>Are you sure you want to cancel this "
                         + "sheet and discard all your changes?"),
                          QMessageBox.Yes, QMessageBox.No) == QMessageBox.Yes)
      {
        var params = new Object;
        params.tehead_id = _id;

        toolbox.executeDbQuery("timeexpensesheet", "deltehead", params);
      }
      else
        return;
    }

    mywindow.close();
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "timeExpenseSheet",
                         qsTr("close exception: ") + e);
  }
}

// Initialize
_employee.enabled = privileges.check("MaintainTimeExpenseOthers");
_new.enabled = false;

// Make connections
_employee.newId.connect(xtte.timeExpenseSheet.handleNewButton);
_weekending.newDate.connect(xtte.timeExpenseSheet.handleNewButton);
_lines["valid(bool)"].connect(_view["setEnabled(bool)"]);

_buttonBox.accepted.connect(xtte.timeExpenseSheet.accepted);
_buttonBox.rejected.connect(xtte.timeExpenseSheet.close);

_new.clicked.connect(xtte.timeExpenseSheet.newItem);
_edit.clicked.connect(xtte.timeExpenseSheet.editItem);
_delete.clicked.connect(xtte.timeExpenseSheet.deleteItem);
_view.clicked.connect(xtte.timeExpenseSheet.viewItem);

_lines["populateMenu(QMenu *, XTreeWidgetItem *, int)"].connect(xtte.timeExpenseSheet.populateMenu);