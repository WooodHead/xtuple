var _b1CommentConsole;
var _b2CommentConsole;
var _dockCommentConsole;
var _commentConsole;
var _commentConsoleIsDirty = true;
var _periodId = -1;

function initDockCommentConsole()
{  
  // Set up objects
  _dockCommentConsole = mainwindow.findChild("_dockCommentConsole");
  _commentConsole     = mainwindow.findChild("_commentConsole");

  _b1CommentConsole = _dockCommentConsole.findChild("_button1");
  _b2CommentConsole = _dockCommentConsole.findChild("_button2");

  // Set icons
  var iReload = new QIcon;
  iReload.addDbImage("reload_16");
  _b1CommentConsole.icon = iReload;
  _b1CommentConsole.text = "";
  _b1CommentConsole.toolTip = qsTr("Reload");

  var iGear = new QIcon();
  iGear.addDbImage("gear_16");
  _b2CommentConsole.icon = iGear;
  _b2CommentConsole.text = "";
  _b2CommentConsole.toolTip = qsTr("Preferences...");

  // Set columns on list
  _commentConsole.addColumn("Date",           75,  1, true, "comment_date");
  _commentConsole.addColumn("Comment Type",   115, 1, true, "cmnttype_name");
  _commentConsole.addColumn("Text",           90,  1, true, "comment_text");
  _commentConsole.addColumn("Source",         115, 1, true, "comment_source")
  _commentConsole.addColumn("User",           65,  1, true, "comment_user")
  _commentConsole.addColumn("Detail",         -1,  1, true, "info");
  _commentConsole.addColumn("Points",         40,  3, true, "points");

  mainwindow.itemsitesUpdated.connect(refreshCommentConsole);
  mainwindow.warehousesUpdated.connect(refreshCommentConsole);
  mainwindow.customersUpdated.connect(refreshCommentConsole)
  mainwindow.employeeUpdated.connect(refreshCommentConsole);
  mainwindow.vendorsUpdated.connect(refreshCommentConsole);
  mainwindow.returnAuthorizationsUpdated.connect(refreshCommentConsole);
  mainwindow.salesOrdersUpdated.connect(refreshCommentConsole)
  mainwindow.quotesUpdated.connect(refreshCommentConsole);
  mainwindow.workOrdersUpdated.connect(refreshCommentConsole);
  mainwindow.purchaseOrdersUpdated.connect(refreshCommentConsole);
  mainwindow.bomsUpdated.connect(refreshCommentConsole)
  mainwindow.bbomsUpdated.connect(refreshCommentConsole);
  mainwindow.boosUpdated.connect(refreshCommentConsole);
  mainwindow.projectsUpdated.connect(refreshCommentConsole);
  mainwindow.crmAccountsUpdated.connect(refreshCommentConsole)
  mainwindow.transferOrdersUpdated.connect(refreshCommentConsole);

  // Connect Signals and Slots
  _b1CommentConsole.clicked.connect(refreshCommentConsole);
  _b2CommentConsole.clicked.connect(preferencesCommentConsole);

  _commentConsole["populateMenu(QMenu*,XTreeWidgetItem*,int)"]
    .connect(populateMenuCommentConsole);

  // Don't show if no privs
  var act = _dockCommentConsole.toggleViewAction();
  if (!privileges.check("viewCommentsDock"))
  {  
    _dockCommentConsole.hide();
    act.enabled = false;
  }
  else
  {
    _dockCommentConsole.show();
    act.enabled = true;
  }

  // Allow rescan to let them show if privs granted
  act.setData("viewCommentsDock");
  _menuDesktop.appendAction(act);

  fillListCommentConsole();
}

function fillListCommentConsole()
{
  _dockCommentConsole = mainwindow.findChild("_dockCommentConsole");
  _commentConsole = mainwindow.findChild("_commentConsole");

  var cmmntTypeList = preferences.value("MonitoredCommentTypes");
  var cmmntSrcList = preferences.value("MonitoredCommentSrcs");
  var cmmntUsrList = preferences.value("MonitoredCommentUsrs");

  var params = new Object;

  //Checkinfg whether xtmfg package exists in the database or not
  var checkxtmfg = "SELECT pkghead_id AS xtmfg_exist "
                 + "FROM pkghead "
                 + "WHERE (pkghead_name = 'xtmfg');";
  var datacheckxtmfg = toolbox.executeQuery(checkxtmfg, params);
  if (datacheckxtmfg.first())
    params.xtmfg_exist = datacheckxtmfg.value("pkghead_id");
  else if (datacheckxtmfg.lastError().type != QSqlError.NoError)
  {
    QMessageBox.critical(mainwindow, qsTr("Database Error"),
                         datacheckxtmfg.lastError().text);
    return;
  }

  var getDate = "SELECT CURRENT_DATE + CAST(<? literal(\"offSet\") ?> AS INTEGER) AS datevalue;";

  params.offSet = ((preferences.value("MonitoredCommentStrtDate") != '')?preferences.value("MonitoredCommentStrtDate"):-1);
  var data = toolbox.executeQuery(getDate, params);
  if (data.first())
    params.startDate = data.value("datevalue");
  else if (data.lastError().type != QSqlError.NoError)
  {
    QMessageBox.critical(mainwindow, qsTr("Database Error"),
                         data.lastError().text);
    return;
  }

  params.offSet = ((preferences.value("MonitoredCommentEndDate") != '')?preferences.value("MonitoredCommentEndDate"):0);
  var data = toolbox.executeQuery(getDate, params);
  if (data.first())
    params.endDate = data.value("datevalue");
  else if (data.lastError().type != QSqlError.NoError)
  {
    QMessageBox.critical(mainwindow, qsTr("Database Error"),
                         data.lastError().text);
    return;
  }

  _commentConsole.clear();
  
  if (cmmntTypeList.length)
    params.commenttype_id = cmmntTypeList;

  if (cmmntSrcList.length)
  {
    params.sourceidlist = cmmntSrcList;
    var sourceList = new Array();
    var data = toolbox.executeDbQuery("desktop","cmmntPrefSrc", params);
    var i = 0;
    while (data.next())
      sourceList.push(data.value("cmntsource_name"));
    params.source = sourceList;
  }

  if(cmmntUsrList.length)
    params.usr_id = cmmntUsrList;

  _commentConsole.populate(toolbox.executeDbQuery("desktop","commentConsole", params));
  _commentConsoleIsDirty = false;
}

function populateMenuCommentConsole(pMenu, pItem, pCol)
{
  try
  {
    _dockCommentConsole = mainwindow.findChild("_dockCommentConsole");
    _commentConsole = mainwindow.findChild("_commentConsole");

    if(pMenu == null)
      pMenu = _commentConsole.findChild("_menu");
    if(pMenu != null)
    {
      if(pItem.text(3) == "ADDR")//Address
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Address..."),
                                           privileges.check("MaintainAddresses"));
        tmpact.triggered.connect(editaddr);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Address..."),
                                           privileges.check("MaintainAddresses") ||
                                           privileges.check("ViewAddresses"));
        tmpact.triggered.connect(viewaddr);
      }
      else if(pItem.text(3) == "BBH")//BBomhead
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Breeder Bill of Material..."),
                                           privileges.check("MaintainBBOMs"));
        tmpact.triggered.connect(editbbh);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Breeder Bill of Material..."),
                                           privileges.check("MaintainBBOMs") ||
                                           privileges.check("ViewBBOMs"));
        tmpact.triggered.connect(viewbbh);
      }
      else if(pItem.text(3) == "BBI")//BBOMItem
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Breeder Bill of Material Item..."),
                                           privileges.check("MaintainBBOMs"));
        tmpact.triggered.connect(editbbi);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Breeder Bill of Material Item..."),
                                           privileges.check("MaintainBBOMs") ||
                                           privileges.check("ViewBBOMs"));
        tmpact.triggered.connect(viewbbi);
      }
      else if(pItem.text(3) == "BMH")//BOMHead
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Bill of Material..."),
                                           privileges.check("MaintainBOMs"));
        tmpact.triggered.connect(editbmh);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Bill of Material..."),
                                           privileges.check("MaintainBOMs") ||
                                           privileges.check("ViewBOMs"));
        tmpact.triggered.connect(viewbmh);
      }
      else if(pItem.text(3) == "BMI")//BOM Item
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit BOM Item..."),
                                           privileges.check("MaintainBOMs"));
        tmpact.triggered.connect(editbomitem);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View BOM Item..."),
                                           privileges.check("MaintainBOMs") ||
                                           privileges.check("ViewBOMs"));
        tmpact.triggered.connect(viewbomitem);
      }
      else if(pItem.text(3) == "BOH")//BOO Head
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit BOO Head..."),
                                           privileges.check("MaintainBOOs"));
        tmpact.triggered.connect(editboh);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View BOO Head..."),
                                          privileges.check("MaintainBOOs") ||
                                           privileges.check("ViewBOOs"));
        tmpact.triggered.connect(viewboh);
      }
      else if(pItem.text(3) == "BOI")//BOO Item
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit BOO Item..."),
                                           privileges.check("MaintainBOOs"));
        tmpact.triggered.connect(editboi);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View BOO Item..."),
                                          privileges.check("MaintainBOOs") ||
                                           privileges.check("ViewBOOs"));
        tmpact.triggered.connect(viewboi);
      }
      else if(pItem.text(3) == "CRMA")//CRMAccount
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit CRM Account..."),
                                          privileges.check("MaintainPersonalCRMAccounts") ||
                                           privileges.check("MaintainAllCRMAccounts"));
        tmpact.triggered.connect(editcrma);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View CRM Account..."),
                                          privileges.check("MaintainPersonalCRMAccounts") ||
                                          privileges.check("ViewPersonalCRMAccounts")||
                                          privileges.check("MaintainPersonalCRMAccounts") ||
                                          privileges.check("ViewAllCRMAccounts"));
        tmpact.triggered.connect(viewcrma);
      }
      else if(pItem.text(3) == "T-Contact")//Contact
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Contact..."),
                                          privileges.check("MaintainPersonalContacts") ||
                                           privileges.check("MaintainAllContacts"));
        tmpact.triggered.connect(editcntct);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Contact..."),
                                          privileges.check("MaintainPersonalContacts") ||
                                          privileges.check("ViewPersonalContacts")||
                                          privileges.check("MaintainAllContacts") ||
                                          privileges.check("ViewAllContacts"));
        tmpact.triggered.connect(viewcntct);
      }
      else if(pItem.text(3) == "C")//Customer
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Customer..."),
                                           privileges.check("MaintainCustomerMasters"));
        tmpact.triggered.connect(editcustomer);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Customer..."),
                                          privileges.check("MaintainCustomerMasters") ||
                                          privileges.check("ViewCustomerMasters"));
        tmpact.triggered.connect(viewcustomer);
      }
      else if(pItem.text(3) == "EMP")//Employee
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Employee..."),
                                           privileges.check("MaintainEmployees"));
        tmpact.triggered.connect(editemp);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Employee..."),
                                          privileges.check("MaintainEmployees") ||
                                          privileges.check("ViewEmployees"));
        tmpact.triggered.connect(viewemp);
      }
      else if(pItem.text(3) == "INCDT")//Incident
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Incident..."),
                                           privileges.check("MaintainPersonalIncidents") ||
                                           privileges.check("MaintainAllIncidents"));
        tmpact.triggered.connect(editincdt);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Incident..."),
                                          privileges.check("MaintainPersonalIncidents") ||
                                          privileges.check("ViewPersonalIncidents")||
                                          privileges.check("MaintainAllIncidents") ||
                                          privileges.check("ViewAllIncidents"));
        tmpact.triggered.connect(viewincdt);
      }
      else if(pItem.text(3) == "I")//Item
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Item..."),
                                           privileges.check("MaintainItemMasters"));
        tmpact.triggered.connect(edititem);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Item..."),
                                          privileges.check("MaintainItemMasters") ||
                                          privileges.check("ViewItemMasters"));
        tmpact.triggered.connect(viewitem);
      }
      else if(pItem.text(3) == "IS")//ItemSite
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit ItemSite..."),
                                           privileges.check("MaintainItemSites"));
        tmpact.triggered.connect(edititemsite);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View ItemSite..."),
                                          privileges.check("MaintainItemSites") ||
                                          privileges.check("ViewItemSites"));
        tmpact.triggered.connect(viewitemsite);
      }
      else if(pItem.text(3) == "IR")//ItemSource
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit ItemSource..."),
                                           privileges.check("MaintainItemSources"));
        tmpact.triggered.connect(edititemsource);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View ItemSource..."),
                                          privileges.check("MaintainItemSources") ||
                                          privileges.check("ViewItemSources"));
        tmpact.triggered.connect(viewitemsource);
      }
      else if(pItem.text(3) == "L")//Location
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Location..."),
                                           privileges.check("MaintainLocations"));
        tmpact.triggered.connect(editlocation);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Location..."),
                                          privileges.check("MaintainLocations") ||
                                          privileges.check("ViewLocations"));
        tmpact.triggered.connect(viewlocation);
      }
      else if(pItem.text(3) == "LS")//LotSerial
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit LotSerial..."),
                                           true);
        tmpact.triggered.connect(editlotserial);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View LotSerial..."),
                                           true);
        tmpact.triggered.connect(viewlotserial);
      }
      else if(pItem.text(3) == "OPP-Opportunity")//Opportunity
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Opportunity..."),
                                           privileges.check("MaintainPersonalOpportunities") ||
                                           privileges.check("MaintainAllOpportunities"));
        tmpact.triggered.connect(editopp);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Opportunity..."),
                                           privileges.check("MaintainPersonalOpportunities") ||
                                           privileges.check("ViewPersonalOpportunities")||
                                           privileges.check("MaintainAllOpportunities") ||
                                           privileges.check("ViewAllOpportunities"));
        tmpact.triggered.connect(viewopp);
      }
      else if(pItem.text(3) == "J")//Project
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Project..."),
                                           privileges.check("MaintainPersonalProjects") ||
                                           privileges.check("MaintainAllProjects"));
        tmpact.triggered.connect(editprj);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Project..."),
                                           privileges.check("MaintainPersonalProjects") ||
                                           privileges.check("ViewPersonalProjects")||
                                           privileges.check("MaintainAllProjects") ||
                                           privileges.check("ViewAllProjects"));
        tmpact.triggered.connect(viewprj);
      }
      else if(pItem.text(3) == "P")//Purchase Order
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Purchase Order..."),
                                           privileges.check("MaintainPurchaseOrders"));
        tmpact.triggered.connect(editpo);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Purchase Order..."),
                                          privileges.check("MaintainPurchaseOrders") ||
                                          privileges.check("ViewPurchaseOrders"));
        tmpact.triggered.connect(viewpo);
      }
      else if(pItem.text(3) == "PI")//Purchase Order Item
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Purchase Order Item..."),
                                           privileges.check("MaintainPurchaseOrders"));
        tmpact.triggered.connect(editpoitem);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Purchase Order Item..."),
                                          privileges.check("MaintainPurchaseOrders") ||
                                          privileges.check("ViewPurchaseOrders"));
        tmpact.triggered.connect(viewpoitem);
      }
      else if(pItem.text(3) == "RA")//Return Authorisation
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Return Authorisation..."),
                                           privileges.check("MaintainReturns"));
        tmpact.triggered.connect(editreturnauth);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Return Authorisation..."),
                                          privileges.check("MaintainReturns") ||
                                          privileges.check("ViewReturns"));
        tmpact.triggered.connect(viewreturnauth);
      }
      else if(pItem.text(3) == "RI")//Return Authorisation Item
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Return Authorisation Item..."),
                                           privileges.check("MaintainReturns"));
        tmpact.triggered.connect(editreturnauthitem);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Return Authorisation Item..."),
                                          privileges.check("MaintainReturns") ||
                                          privileges.check("ViewReturns"));
        tmpact.triggered.connect(viewreturnauthitem);
      }
      else if(pItem.text(3) == "Q")//Quote
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Quote..."),
                                           privileges.check("MaintainQuotes"));
        tmpact.triggered.connect(editquote);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Quote..."),
                                          privileges.check("MaintainQuotes") ||
                                          privileges.check("ViewQuotes"));
        tmpact.triggered.connect(viewquote);
      }
      else if(pItem.text(3) == "QI")//Quote Item
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Quote Item..."),
                                           privileges.check("MaintainQuotes"));
        tmpact.triggered.connect(editquoteitem);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Quote Item..."),
                                          privileges.check("MaintainQuotes") ||
                                          privileges.check("ViewQuotes"));
        tmpact.triggered.connect(viewquoteitem);
      }
      else if(pItem.text(3) == "S")//Sales Order
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Sales Order..."),
                                           privileges.check("MaintainSalesOrders"));
        tmpact.triggered.connect(editso);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Sales Order..."),
                                          privileges.check("MaintainSalesOrders") ||
                                          privileges.check("ViewSalesOrders"));
        tmpact.triggered.connect(viewso);
      }
      else if(pItem.text(3) == "SI")//Sales Order Item
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Sales Order Item..."),
                                           privileges.check("MaintainSalesOrders"));
        tmpact.triggered.connect(editsoitem);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Sales Order Item..."),
                                          privileges.check("MaintainSalesOrders") ||
                                          privileges.check("ViewSalesOrders"));
        tmpact.triggered.connect(viewsoitem);
      }
      else if(pItem.text(3) == "TA")//Task
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Task..."),
                                           privileges.check("MaintainPersonalProjects") ||
                                           privileges.check("MaintainAllProjects"));
        tmpact.triggered.connect(edittask);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Task..."),
                                           privileges.check("MaintainPersonalProjects") ||
                                           privileges.check("ViewPersonalProjects")||
                                           privileges.check("MaintainAllProjects") ||
                                           privileges.check("ViewAllProjects"));
        tmpact.triggered.connect(viewtask);
      }
      else if(pItem.text(3) == "TD")//TodoItem
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit TodoItem..."),
                                           privileges.check("MaintainPersonalToDoItems") ||
                                           privileges.check("MaintainAllToDoItems"));
        tmpact.triggered.connect(edittodoitem);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View TodoItem..."),
                                           privileges.check("MaintainPersonalToDoItems") ||
                                           privileges.check("ViewPersonalToDoItems")||
                                           privileges.check("MaintainAllToDoItems") ||
                                           privileges.check("ViewAllToDoItems"));
        tmpact.triggered.connect(viewtodoitem);
      }
      else if(pItem.text(3) == "TO")//Transfer Order
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Transfer Order..."),
                                           privileges.check("MaintainTransferOrders"));
        tmpact.triggered.connect(editto);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Transfer Order..."),
                                          privileges.check("MaintainTransferOrders") ||
                                          privileges.check("ViewTransferOrders"));
        tmpact.triggered.connect(viewto);
      }
      else if(pItem.text(3) == "TI")//Transfer Order Item
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Transfer Order Item..."),
                                           privileges.check("MaintainTransferOrders"));
        tmpact.triggered.connect(edittoitem);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Transfer Order Item..."),
                                          privileges.check("MaintainTransferOrders") ||
                                          privileges.check("ViewTransferOrders"));
        tmpact.triggered.connect(viewtoitem);
      }
      else if(pItem.text(3) == "V")//Vendor
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Vendor..."),
                                           privileges.check("MaintainVendors"));
        tmpact.triggered.connect(editvend);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Vendor..."),
                                          privileges.check("MaintainVendors") ||
                                          privileges.check("ViewVendors"));
        tmpact.triggered.connect(viewvend);
      }
      else if(pItem.text(3) == "WH")//WareHouse
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit WareHouse..."),
                                           privileges.check("MaintainWarehouses"));
        tmpact.triggered.connect(editwh);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View WareHouse..."),
                                          privileges.check("MaintainWarehouses") ||
                                          privileges.check("ViewWarehouses"));
        tmpact.triggered.connect(viewwh);
      }
      else if(pItem.text(3) == "W")//Work Order
      {
        var tmpact = toolbox.menuAddAction(pMenu, qsTr("Edit Work Order..."),
                                           privileges.check("MaintainWorkOrders"));
        tmpact.triggered.connect(editwo);

        tmpact = toolbox.menuAddAction(pMenu, qsTr("View Work Order..."),
                                           privileges.check("MaintainWorkOrders"));
        tmpact.triggered.connect(viewwo);
      }
    }
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "populateMenuCommentConsole exception: " + e);
  }
}

function preferencesCommentConsole()
{
  try
  {
  	params = new Object;
    var newdlg = toolbox.openWindow("preferencesComment", mainwindow,
                                  Qt.ApplicationModal, Qt.Dialog);
    toolbox.lastWindow().set(params);
    if (newdlg.exec())
      refreshCommentConsole();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "preferencesCommentConsole exception: " + e);
  }
}

/*!
  Refreshes data if the window is visible, or the next time it becomes visible
*/
function refreshCommentConsole()
{
  try
  {
  	_commentConsoleIsDirty = true;
    fillListCommentConsole();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "refreshCommentConsole exception: " + e);
  }
}

function editaddr()
{
  try
  {
    var params =  new Object();
    params.addr_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("address", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editaddr exception: " + e);
  }
}

function viewaddr()
{
  try
  {
    var params =  new Object();
    params.addr_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("address", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewaddr exception: " + e);
  }
}

function editbbh()
{
  try
  {
    var params =  new Object();
    params.item_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("bbom", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editbbh exception: " + e);
  }
}

function viewbbh()
{
  try
  {
    var params =  new Object();
    params.item_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("bbom", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewbbh exception: " + e);
  }
}

function editbbi()
{
  try
  {
    var params =  new Object();
    params.bbomitem_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("bbomItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editbbi exception: " + e);
  }
}

function viewbbi()
{
  try
  {
    var params =  new Object();
    params.bbomitem_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("bbomItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewbbi exception: " + e);
  }
}

function editbmh()
{
  try
  {
    var params =  new Object();
    params.item_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("bom", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editbmh exception: " + e);
  }
}

function viewbmh()
{
  try
  {
    var params =  new Object();
    params.item_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("bom", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewbmh exception: " + e);
  }
}

function editbomitem()
{
  try
  {
    params = new Object;
    params.bomitem_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("bomItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editbomitem exception: " + e);
  }
}

function viewbomitem()
{
  try
  {
    params = new Object;
    params.bomitem_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("bomItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewbomitem exception: " + e);
  }
}

function editboh()
{
  try
  {
    params = new Object;
    params.item_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("boo", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editboh exception: " + e);
  }
}

function viewboh()
{
  try
  {
    params = new Object;
    params.item_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("boo", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewboh exception: " + e);
  }
}

function editboi()
{
  try
  {
    params = new Object;
    params.booitem_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("booItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editboi exception: " + e);
  }
}

function viewboi()
{
  try
  {
    params = new Object;
    params.booitem_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("booItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewboi exception: " + e);
  }
}

function editcntct()
{
  try
  {
    var params =  new Object();
    params.cntct_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("contact", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editcntct exception: " + e);
  }
}

function viewcntct()
{
  try
  {
    var params =  new Object();
    params.cntct_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("contact", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewcntct exception: " + e);
  }
}

function editcrma()
{
  try
  {
    var params =  new Object();
    params.crmacct_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("crmaccount", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editcrma exception: " + e);
  }
}

function viewcrma()
{
  try
  {
    var params =  new Object();
    params.crmacct_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("crmaccount", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewcrma exception: " + e);
  }
}

function editcustomer()
{
  try
  {
    var params =  new Object();
    params.cust_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("customer", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editcustomer exception: " + e);
  }
}

function viewcustomer()
{
  try
  {
    var params =  new Object();
    params.cust_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("customer", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewcustomer exception: " + e);
  }
}

function editemp()
{
  try
  {
    var params =  new Object();
    params.emp_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("employee", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editemp exception: " + e);
  }
}

function viewemp()
{
  try
  {
    var params =  new Object();
    params.emp_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("employee", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewemp exception: " + e);
  }
}

function editincdt()
{
  try
  {
    params = new Object;
    params.incdt_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("incident", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editincdt exception: " + e);
  }
}

function viewincdt()
{
  try
  {
    var params =  new Object();
    params.incdt_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("incident", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewincdt exception: " + e);
  }
}

function edititem()
{
  try
  {
    var params =  new Object();
    params.item_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("item", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "edititem exception: " + e);
  }
}

function viewitem()
{
  try
  {
    var params =  new Object();
    params.item_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("item", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewitem exception: " + e);
  }
}

function edititemsite()
{
  try
  {
    params = new Object;
    params.itemsite_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("itemSite", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "edititemsite exception: " + e);
  }
}

function viewitemsite()
{
  try
  {
    params = new Object;
    params.itemsite_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("itemSite", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewitemsite exception: " + e);
  }
}

function edititemsource()
{
  try
  {
    params = new Object;
    params.itemsrc_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("itemSource", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "edititemsource exception: " + e);
  }
}

function viewitemsource()
{
  try
  {
    params = new Object;
    params.itemsrc_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("itemSource", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewitemsource exception: " + e);
  }
}

function editlocation()
{
  try
  {
    var params =  new Object();
    params.location_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("location", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editlocation exception: " + e);
  }
}

function viewlocation()
{
  try
  {
    var params =  new Object();
    params.location_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("location", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewlocation exception: " + e);
  }
}

function editlotserial()
{
  try
  {
    var params =  new Object();
    params.ls_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("lotSerial", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editlotserial exception: " + e);
  }
}

function viewlotserial()
{
  try
  {
    var params =  new Object();
    params.ls_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("lotSerial", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewlotserial exception: " + e);
  }
}

function editopp()
{
  try
  {
    var params =  new Object();
    params.ophead_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("opportunity", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editopp exception: " + e);
  }
}

function viewopp()
{
  try
  {
    var params =  new Object();
    params.ophead_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("opportunity", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewopp exception: " + e);
  }
}

function editprj()
{
  try
  {
    var params =  new Object();
    params.prj_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("project", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editprj exception: " + e);
  }
}

function viewprj()
{
  try
  {
    var params =  new Object();
    params.prj_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("project", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewprj exception: " + e);
  }
}

function editpo()
{
  try
  {
    var params =  new Object();
    params.pohead_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("purchaseOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editpo exception: " + e);
  }
}

function viewpo()
{
  try
  {
    var params =  new Object();
    params.pohead_id = _commentConsole.id();

    params.mode = "view";
    var newdlg = toolbox.openWindow("purchaseOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewpo exception: " + e);
  }
}

function editpoitem()
{
  try
  {
    params = new Object;
    params.poitem_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("purchaseOrderItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editpoitem exception: " + e);
  }
}

function viewpoitem()
{
  try
  {
    params = new Object;
    params.poitem_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("purchaseOrderItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewpoitem exception: " + e);
  }
}

function editquote()
{
  try
  {
    var params =  new Object();
    params.quhead_id = _commentConsole.id();

    params.mode = "editQuote";
    var newdlg = toolbox.openWindow("salesOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editquote exception: " + e);
  }
}

function viewquote()
{
  try
  {
    var params =  new Object();
    params.quhead_id = _commentConsole.id();

    params.mode = "viewQuote";
    var newdlg = toolbox.openWindow("salesOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewquote exception: " + e);
  }
}

function editquoteitem()
{
  try
  {
    params = new Object;
    params.soitem_id = _commentConsole.id();
    params.mode = "editQuote";
    var newdlg = toolbox.openWindow("salesOrderItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editquoteitem exception: " + e);
  }
}

function viewquoteitem()
{
  try
  {
    params = new Object;
    params.soitem_id = _commentConsole.id();
    params.mode = "viewQuote";

    var newdlg = toolbox.openWindow("salesOrderItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewquoteitem exception: " + e);
  }
}

function editreturnauth()
{
  try
  {
    var params =  new Object();
    params.rahead_id = _commentConsole.id();

    params.mode = "edit";
    var newdlg = toolbox.openWindow("returnAuthorization", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editreturnauth exception: " + e);
  }
}

function viewreturnauth()
{
  try
  {
    var params =  new Object();
    params.rahead_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("returnAuthorization", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewreturnauth exception: " + e);
  }
}

function editreturnauthitem()
{
  try
  {
    var params =  new Object();
    params.raitem_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("returnAuthorizationItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editreturnauthitem exception: " + e);
  }
}

function viewreturnauthitem()
{
  try
  {
    var params =  new Object();
    params.raitem_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("returnAuthorizationItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewreturnauthitem exception: " + e);
  }
}

function editso()
{
  try
  {
    var params =  new Object();
    params.sohead_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("salesOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editso exception: " + e);
  }
}

function viewso()
{
  try
  {
    var params =  new Object();
    params.sohead_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("salesOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewso exception: " + e);
  }
}

function editsoitem()
{
  try
  {
    params = new Object;
    params.soitem_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("salesOrderItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editsoitem exception: " + e);
  }
}

function viewsoitem()
{
  try
  {
    params = new Object;
    params.soitem_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("salesOrderItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewsoitem exception: " + e);
  }
}

function edittask()
{
  try
  {
    params = new Object;
    params.prjtask_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("task", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "edittask exception: " + e);
  }
}

function viewtask()
{
  try
  {
    params = new Object;
    params.prjtask_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("task", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewtask exception: " + e);
  }
}

function edittodoitem()
{
  try
  {
    params = new Object;
    params.todoitem_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("todoItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "edittodoitem exception: " + e);
  }
}

function viewtodoitem()
{
  try
  {
    params = new Object;
    params.todoitem_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("todoItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewtodoitem exception: " + e);
  }
}

function editto()
{
  try
  {
    var params =  new Object();
    params.tohead_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("transferOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editto exception: " + e);
  }
}

function viewto()
{
  try
  {
    var params =  new Object();
    params.tohead_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("transferOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewto exception: " + e);
  }
}

function edittoitem()
{
  try
  {
    params = new Object;
    params.toitem_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("transferOrderItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "edittoitem exception: " + e);
  }
}

function viewtoitem()
{
  try
  {
    params = new Object;
    params.toitem_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("transferOrderItem", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewtoitem exception: " + e);
  }
}

function editvend()
{
  try
  {
    var params =  new Object();
    params.vend_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("vendor", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editvend exception: " + e);
  }
}

function viewvend()
{
  try
  {
    var params =  new Object();
    params.vend_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("vendor", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewvend exception: " + e);
  }
}

function editwh()
{
  try
  {
    params = new Object;
    params.warehous_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("warehouse", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editwh exception: " + e);
  }
}

function viewwh()
{
  try
  {
    params = new Object;
    params.warehous_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("warehouse", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    var execval = newdlg.exec();
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewwh exception: " + e);
  }
}

function editwo()
{
  try
  {
    var params =  new Object();
    params.wo_id = _commentConsole.id();
    params.mode = "edit";

    var newdlg = toolbox.openWindow("workOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "editwo exception: " + e);
  }
}

function viewwo()
{
  try
  {
    var params =  new Object();
    params.wo_id = _commentConsole.id();
    params.mode = "view";

    var newdlg = toolbox.openWindow("workOrder", mainwindow, 0, 1);
    var tmp = toolbox.lastWindow().set(params);
    newdlg.exec;
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockCommentConsole",
                         "viewwo exception: " + e);
  }
}