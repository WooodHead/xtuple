var _dockSendMessage;
var _usr;
var _message;
var _send;
var _sendMessageIsDirty = true;
var _periodId = -1;
var _b1CommentConsole;
var _b2CommentConsole;
var _commentConsole;
var _commentConsoleIsDirty = true;
var _periodId = -1;

function initDockSendMessage()
{
  // Set up objects
  _dockSendMessage = mainwindow.findChild("_dockSendMessage");
  _usr             = mainwindow.findChild("_usr");
  _message         = mainwindow.findChild("_message");
  _send            = mainwindow.findChild("_send");

  _commentConsole   = mainwindow.findChild("_commentConsole");

  _b1CommentConsole = mainwindow.findChild("_button1");
  _b2CommentConsole = mainwindow.findChild("_button2");

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

  mainwindow["tick()"].connect(refreshCommentConsole);

  // Don't show if no privs
  var act = _dockSendMessage.toggleViewAction();
  if (!privileges.check("viewSendMsgDock"))
  {  
    _dockSendMessage.hide();
    act.enabled = false;
  }
  else
  {
    _dockSendMessage.show();
    act.enabled = true;
  }

  // Allow rescan to let them show if privs granted
  act.setData("viewSendMsgDock");
  _menuDesktop.appendAction(act);

  _usr["newId(int)"].connect(sHandleButtons);
  _send.clicked.connect(send);

  fillListCommentConsole();
}

function getParams()
{
  var params = new Object;

  params.message = _message.plainText;
  if (_usr.id() > 0)
    params.usr_id = _usr.id();

  return params;
}

function sHandleButtons()
{
  var qry = "SELECT usr_id FROM usr WHERE usr_username = current_user;";
  var data = toolbox.executeQuery(qry, -1);
  if (data.first())
    var currenttUsr_id = data.value("usr_id");

  if (currenttUsr_id == _usr.id())
  {
    if (QMessageBox.information(mainwindow, qsTr("Send Message?"),
                            qsTr("You are trying to Send Message to Yourself."
                              +"\nAre you sure that you really want to Continue?."),
           QMessageBox.Yes | QMessageBox.Default, QMessageBox.No | QMessageBox.Escape) == QMessageBox.No)
    {
      _usr.clear();
      return;
    }
    else
      _send.enabled = (_usr.id() >= 0);
  }
  else
    _send.enabled = (_usr.id() >= 0);
}

function send()
{
  var params = getParams();
  var qry = toolbox.executeDbQuery("desktop", "sendMessageToUser", params);
  QMessageBox.information(mainwindow,'Sent','Message Sent');
  mainwindow.sSystemMessageAdded();
  clear();
}

function set(input)
{
  if ("user" in input)
    _usr.setUsername(input.user);
  else
   QMessageBox.warning(mywindow, "Message", "Could not set username");
}

function clear()
{
  _usr.clear();
  _message.clear();
}

function fillListCommentConsole()
{
  _commentConsole = mainwindow.findChild("_commentConsole");

  var cmmntTypeList = preferences.value("MonitoredCommentTypes");
  var cmmntSrcList = preferences.value("MonitoredCommentSrcs");
  var cmmntUsrList = preferences.value("MonitoredCommentUsrs");

  var params = new Object;

  //Checking whether xtmfg package exists in the database or not
  var checkxtmfg = "SELECT pkghead_id "
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

  var getDate = "SELECT CURRENT_DATE + CAST(<? literal('offSet') ?> AS INTEGER) AS datevalue;";

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
    _commentConsole = mainwindow.findChild("_commentConsole");

    if(pMenu == null)
      pMenu = _commentConsole.findChild("_menu");
    if(pMenu != null)
    {
      var tmpact;
      if(pItem.text(3) == "ADDR")//Address
      {
        tmpact = pMenu.addAction(qsTr("Edit Address..."));
        tmpact.enabled = privileges.check("MaintainAddresses");
        tmpact.triggered.connect(editaddr);

        tmpact = pMenu.addAction(qsTr("View Address..."));
        tmpact.enabled = privileges.check("MaintainAddresses") ||
                         privileges.check("ViewAddresses");
        tmpact.triggered.connect(viewaddr);
      }
      else if(pItem.text(3) == "BBH")//BBomhead
      {
        tmpact = pMenu.addAction(qsTr("Edit Breeder Bill of Material..."));
        tmpact.enabled = (privileges.check("MaintainBBOMs"));
        tmpact.triggered.connect(editbbh);

        tmpact = pMenu.addAction(qsTr("View Breeder Bill of Material..."));
        tmpact.enabled = (privileges.check("MaintainBBOMs") ||
                          privileges.check("ViewBBOMs"));
        tmpact.triggered.connect(viewbbh);
      }
      else if(pItem.text(3) == "BBI")//BBOMItem
      {
        tmpact = pMenu.addAction(qsTr("Edit Breeder Bill of Material Item..."));
        tmpact.enabled = (privileges.check("MaintainBBOMs"));
        tmpact.triggered.connect(editbbi);

        tmpact = pMenu.addAction(qsTr("View Breeder Bill of Material Item..."));
        tmpact.enabled = (privileges.check("MaintainBBOMs") ||
                          privileges.check("ViewBBOMs"));
        tmpact.triggered.connect(viewbbi);
      }
      else if(pItem.text(3) == "BMH")//BOMHead
      {
        tmpact = pMenu.addAction(qsTr("Edit Bill of Material..."));
        tmpact.enabled = (privileges.check("MaintainBOMs"));
        tmpact.triggered.connect(editbmh);

        tmpact = pMenu.addAction(qsTr("View Bill of Material..."));
        tmpact.enabled = (privileges.check("MaintainBOMs") ||
                          privileges.check("ViewBOMs"));
        tmpact.triggered.connect(viewbmh);
      }
      else if(pItem.text(3) == "BMI")//BOM Item
      {
        tmpact = pMenu.addAction(qsTr("Edit BOM Item..."));
        tmpact.enabled = (privileges.check("MaintainBOMs"));
        tmpact.triggered.connect(editbomitem);

        tmpact = pMenu.addAction(qsTr("View BOM Item..."));
        tmpact.enabled = (privileges.check("MaintainBOMs") ||
                          privileges.check("ViewBOMs"));
        tmpact.triggered.connect(viewbomitem);
      }
      else if(pItem.text(3) == "BOH")//BOO Head
      {
        tmpact = pMenu.addAction(qsTr("Edit BOO Head..."));
        tmpact.enabled = (privileges.check("MaintainBOOs"));
        tmpact.triggered.connect(editboh);

        tmpact = pMenu.addAction(qsTr("View BOO Head..."));
        tmpact.enabled = (privileges.check("MaintainBOOs") ||
                          privileges.check("ViewBOOs"));
        tmpact.triggered.connect(viewboh);
      }
      else if(pItem.text(3) == "BOI")//BOO Item
      {
        tmpact = pMenu.addAction(qsTr("Edit BOO Item..."));
        tmpact.enabled = (privileges.check("MaintainBOOs"));
        tmpact.triggered.connect(editboi);

        tmpact = pMenu.addAction(qsTr("View BOO Item..."));
        tmpact.enabled = (privileges.check("MaintainBOOs") ||
                          privileges.check("ViewBOOs"));
        tmpact.triggered.connect(viewboi);
      }
      else if(pItem.text(3) == "CRMA")//CRMAccount
      {
        tmpact = pMenu.addAction(qsTr("Edit CRM Account..."));
        tmpact.enabled = (privileges.check("MaintainPersonalCRMAccounts") ||
                          privileges.check("MaintainAllCRMAccounts"));
        tmpact.triggered.connect(editcrma);

        tmpact = pMenu.addAction(qsTr("View CRM Account..."));
        tmpact.enabled = (privileges.check("MaintainPersonalCRMAccounts") ||
                          privileges.check("ViewPersonalCRMAccounts")||
                          privileges.check("MaintainPersonalCRMAccounts") ||
                          privileges.check("ViewAllCRMAccounts"));
        tmpact.triggered.connect(viewcrma);
      }
      else if(pItem.text(3) == "T-Contact")//Contact
      {
        tmpact = pMenu.addAction(qsTr("Edit Contact..."));
        tmpact.enabled = (privileges.check("MaintainPersonalContacts") ||
                          privileges.check("MaintainAllContacts"));
        tmpact.triggered.connect(editcntct);

        tmpact = pMenu.addAction(qsTr("View Contact..."));
        tmpact.enabled = (privileges.check("MaintainPersonalContacts") ||
                          privileges.check("ViewPersonalContacts")||
                          privileges.check("MaintainAllContacts") ||
                          privileges.check("ViewAllContacts"));
        tmpact.triggered.connect(viewcntct);
      }
      else if(pItem.text(3) == "C")//Customer
      {
        tmpact = pMenu.addAction(qsTr("Edit Customer..."));
        tmpact.enabled = (privileges.check("MaintainCustomerMasters"));
        tmpact.triggered.connect(editcustomer);

        tmpact = pMenu.addAction(qsTr("View Customer..."));
        tmpact.enabled = (privileges.check("MaintainCustomerMasters") ||
                          privileges.check("ViewCustomerMasters"));
        tmpact.triggered.connect(viewcustomer);
      }
      else if(pItem.text(3) == "EMP")//Employee
      {
        tmpact = pMenu.addAction(qsTr("Edit Employee..."));
        tmpact.enabled = (privileges.check("MaintainEmployees"));
        tmpact.triggered.connect(editemp);

        tmpact = pMenu.addAction(qsTr("View Employee..."));
        tmpact.enabled = (privileges.check("MaintainEmployees") ||
                          privileges.check("ViewEmployees"));
        tmpact.triggered.connect(viewemp);
      }
      else if(pItem.text(3) == "INCDT")//Incident
      {
        tmpact = pMenu.addAction(qsTr("Edit Incident..."));
        tmpact.enabled = (privileges.check("MaintainPersonalIncidents") ||
                          privileges.check("MaintainAllIncidents"));
        tmpact.triggered.connect(editincdt);

        tmpact = pMenu.addAction(qsTr("View Incident..."));
        tmpact.enabled = (privileges.check("MaintainPersonalIncidents") ||
                          privileges.check("ViewPersonalIncidents")||
                          privileges.check("MaintainAllIncidents") ||
                          privileges.check("ViewAllIncidents"));
        tmpact.triggered.connect(viewincdt);
      }
      else if(pItem.text(3) == "I")//Item
      {
        tmpact = pMenu.addAction(qsTr("Edit Item..."));
        tmpact.enabled = (privileges.check("MaintainItemMasters"));
        tmpact.triggered.connect(edititem);

        tmpact = pMenu.addAction(qsTr("View Item..."));
        tmpact.enabled = (privileges.check("MaintainItemMasters") ||
                          privileges.check("ViewItemMasters"));
        tmpact.triggered.connect(viewitem);
      }
      else if(pItem.text(3) == "IS")//ItemSite
      {
        tmpact = pMenu.addAction(qsTr("Edit ItemSite..."));
        tmpact.enabled = (privileges.check("MaintainItemSites"));
        tmpact.triggered.connect(edititemsite);

        tmpact = pMenu.addAction(qsTr("View ItemSite..."));
        tmpact.enabled = (privileges.check("MaintainItemSites") ||
                          privileges.check("ViewItemSites"));
        tmpact.triggered.connect(viewitemsite);
      }
      else if(pItem.text(3) == "IR")//ItemSource
      {
        tmpact = pMenu.addAction(qsTr("Edit ItemSource..."));
        tmpact.enabled = (privileges.check("MaintainItemSources"));
        tmpact.triggered.connect(edititemsource);

        tmpact = pMenu.addAction(qsTr("View ItemSource..."));
        tmpact.enabled = (privileges.check("MaintainItemSources") ||
                          privileges.check("ViewItemSources"));
        tmpact.triggered.connect(viewitemsource);
      }
      else if(pItem.text(3) == "L")//Location
      {
        tmpact = pMenu.addAction(qsTr("Edit Location..."));
        tmpact.enabled = (privileges.check("MaintainLocations"));
        tmpact.triggered.connect(editlocation);

        tmpact = pMenu.addAction(qsTr("View Location..."));
        tmpact.enabled = (privileges.check("MaintainLocations") ||
                          privileges.check("ViewLocations"));
        tmpact.triggered.connect(viewlocation);
      }
      else if(pItem.text(3) == "LS")//LotSerial
      {
        tmpact = pMenu.addAction(qsTr("Edit LotSerial..."));
        tmpact.triggered.connect(editlotserial);

        tmpact = pMenu.addAction(qsTr("View LotSerial..."));
        tmpact.triggered.connect(viewlotserial);
      }
      else if(pItem.text(3) == "OPP-Opportunity")//Opportunity
      {
        tmpact = pMenu.addAction(qsTr("Edit Opportunity..."));
        tmpact.enabled = (privileges.check("MaintainPersonalOpportunities") ||
                          privileges.check("MaintainAllOpportunities"));
        tmpact.triggered.connect(editopp);

        tmpact = pMenu.addAction(qsTr("View Opportunity..."));
        tmpact.enabled = (privileges.check("MaintainPersonalOpportunities") ||
                          privileges.check("ViewPersonalOpportunities")||
                          privileges.check("MaintainAllOpportunities") ||
                          privileges.check("ViewAllOpportunities"));
        tmpact.triggered.connect(viewopp);
      }
      else if(pItem.text(3) == "J")//Project
      {
        tmpact = pMenu.addAction(qsTr("Edit Project..."));
        tmpact.enabled = (privileges.check("MaintainPersonalProjects") ||
                          privileges.check("MaintainAllProjects"));
        tmpact.triggered.connect(editprj);

        tmpact = pMenu.addAction(qsTr("View Project..."));
        tmpact.enabled = (privileges.check("MaintainPersonalProjects") ||
                          privileges.check("ViewPersonalProjects")||
                          privileges.check("MaintainAllProjects") ||
                          privileges.check("ViewAllProjects"));
        tmpact.triggered.connect(viewprj);
      }
      else if(pItem.text(3) == "P")//Purchase Order
      {
        tmpact = pMenu.addAction(qsTr("Edit Purchase Order..."));
        tmpact.enabled = (privileges.check("MaintainPurchaseOrders"));
        tmpact.triggered.connect(editpo);

        tmpact = pMenu.addAction(qsTr("View Purchase Order..."));
        tmpact.enabled = (privileges.check("MaintainPurchaseOrders") ||
                          privileges.check("ViewPurchaseOrders"));
        tmpact.triggered.connect(viewpo);
      }
      else if(pItem.text(3) == "PI")//Purchase Order Item
      {
        tmpact = pMenu.addAction(qsTr("Edit Purchase Order Item..."));
        tmpact.enabled = (privileges.check("MaintainPurchaseOrders"));
        tmpact.triggered.connect(editpoitem);

        tmpact = pMenu.addAction(qsTr("View Purchase Order Item..."));
        tmpact.enabled = (privileges.check("MaintainPurchaseOrders") ||
                          privileges.check("ViewPurchaseOrders"));
        tmpact.triggered.connect(viewpoitem);
      }
      else if(pItem.text(3) == "RA")//Return Authorisation
      {
        tmpact = pMenu.addAction(qsTr("Edit Return Authorisation..."));
        tmpact.enabled = (privileges.check("MaintainReturns"));
        tmpact.triggered.connect(editreturnauth);

        tmpact = pMenu.addAction(qsTr("View Return Authorisation..."));
        tmpact.enabled = (privileges.check("MaintainReturns") ||
                          privileges.check("ViewReturns"));
        tmpact.triggered.connect(viewreturnauth);
      }
      else if(pItem.text(3) == "RI")//Return Authorisation Item
      {
        tmpact = pMenu.addAction(qsTr("Edit Return Authorisation Item..."));
        tmpact.enabled = (privileges.check("MaintainReturns"));
        tmpact.triggered.connect(editreturnauthitem);

        tmpact = pMenu.addAction(qsTr("View Return Authorisation Item..."));
        tmpact.enabled = (privileges.check("MaintainReturns") ||
                          privileges.check("ViewReturns"));
        tmpact.triggered.connect(viewreturnauthitem);
      }
      else if(pItem.text(3) == "Q")//Quote
      {
        tmpact = pMenu.addAction(qsTr("Edit Quote..."));
        tmpact.enabled = (privileges.check("MaintainQuotes"));
        tmpact.triggered.connect(editquote);

        tmpact = pMenu.addAction(qsTr("View Quote..."));
        tmpact.enabled = (privileges.check("MaintainQuotes") ||
                          privileges.check("ViewQuotes"));
        tmpact.triggered.connect(viewquote);
      }
      else if(pItem.text(3) == "QI")//Quote Item
      {
        tmpact = pMenu.addAction(qsTr("Edit Quote Item..."));
        tmpact.enabled = (privileges.check("MaintainQuotes"));
        tmpact.triggered.connect(editquoteitem);

        tmpact = pMenu.addAction(qsTr("View Quote Item..."));
        tmpact.enabled = (privileges.check("MaintainQuotes") ||
                          privileges.check("ViewQuotes"));
        tmpact.triggered.connect(viewquoteitem);
      }
      else if(pItem.text(3) == "S")//Sales Order
      {
        tmpact = pMenu.addAction(qsTr("Edit Sales Order..."));
        tmpact.enabled = (privileges.check("MaintainSalesOrders"));
        tmpact.triggered.connect(editso);

        tmpact = pMenu.addAction(qsTr("View Sales Order..."));
        tmpact.enabled = (privileges.check("MaintainSalesOrders") ||
                          privileges.check("ViewSalesOrders"));
        tmpact.triggered.connect(viewso);
      }
      else if(pItem.text(3) == "SI")//Sales Order Item
      {
        tmpact = pMenu.addAction(qsTr("Edit Sales Order Item..."));
        tmpact.enabled = (privileges.check("MaintainSalesOrders"));
        tmpact.triggered.connect(editsoitem);

        tmpact = pMenu.addAction(qsTr("View Sales Order Item..."));
        tmpact.enabled = (privileges.check("MaintainSalesOrders") ||
                          privileges.check("ViewSalesOrders"));
        tmpact.triggered.connect(viewsoitem);
      }
      else if(pItem.text(3) == "TA")//Task
      {
        tmpact = pMenu.addAction(qsTr("Edit Task..."));
        tmpact.enabled = (privileges.check("MaintainPersonalProjects") ||
                          privileges.check("MaintainAllProjects"));
        tmpact.triggered.connect(edittask);

        tmpact = pMenu.addAction(qsTr("View Task..."));
        tmpact.enabled = (privileges.check("MaintainPersonalProjects") ||
                          privileges.check("ViewPersonalProjects")||
                          privileges.check("MaintainAllProjects") ||
                          privileges.check("ViewAllProjects"));
        tmpact.triggered.connect(viewtask);
      }
      else if(pItem.text(3) == "TD")//TodoItem
      {
        tmpact = pMenu.addAction(qsTr("Edit TodoItem..."));
        tmpact.enabled = (privileges.check("MaintainPersonalToDoItems") ||
                          privileges.check("MaintainAllToDoItems"));
        tmpact.triggered.connect(edittodoitem);

        tmpact = pMenu.addAction(qsTr("View TodoItem..."));
        tmpact.enabled = (privileges.check("MaintainPersonalToDoItems") ||
                          privileges.check("ViewPersonalToDoItems")||
                          privileges.check("MaintainAllToDoItems") ||
                          privileges.check("ViewAllToDoItems"));
        tmpact.triggered.connect(viewtodoitem);
      }
      else if(pItem.text(3) == "TO")//Transfer Order
      {
        tmpact = pMenu.addAction(qsTr("Edit Transfer Order..."));
        tmpact.enabled = (privileges.check("MaintainTransferOrders"));
        tmpact.triggered.connect(editto);

        tmpact = pMenu.addAction(qsTr("View Transfer Order..."));
        tmpact.enabled = (privileges.check("MaintainTransferOrders") ||
                          privileges.check("ViewTransferOrders"));
        tmpact.triggered.connect(viewto);
      }
      else if(pItem.text(3) == "TI")//Transfer Order Item
      {
        tmpact = pMenu.addAction(qsTr("Edit Transfer Order Item..."));
        tmpact.enabled = (privileges.check("MaintainTransferOrders"));
        tmpact.triggered.connect(edittoitem);

        tmpact = pMenu.addAction(qsTr("View Transfer Order Item..."));
        tmpact.enabled = (privileges.check("MaintainTransferOrders") ||
                          privileges.check("ViewTransferOrders"));
        tmpact.triggered.connect(viewtoitem);
      }
      else if(pItem.text(3) == "V")//Vendor
      {
        tmpact = pMenu.addAction(qsTr("Edit Vendor..."));
        tmpact.enabled = (privileges.check("MaintainVendors"));
        tmpact.triggered.connect(editvend);

        tmpact = pMenu.addAction(qsTr("View Vendor..."));
        tmpact.enabled = (privileges.check("MaintainVendors") ||
                          privileges.check("ViewVendors"));
        tmpact.triggered.connect(viewvend);
      }
      else if(pItem.text(3) == "WH")//WareHouse
      {
        tmpact = pMenu.addAction(qsTr("Edit WareHouse..."));
        tmpact.enabled = (privileges.check("MaintainWarehouses"));
        tmpact.triggered.connect(editwh);

        tmpact = pMenu.addAction(qsTr("View WareHouse..."));
        tmpact.enabled = (privileges.check("MaintainWarehouses") ||
                          privileges.check("ViewWarehouses"));
        tmpact.triggered.connect(viewwh);
      }
      else if(pItem.text(3) == "W")//Work Order
      {
        tmpact = pMenu.addAction(qsTr("Edit Work Order..."));
        tmpact.enabled = (privileges.check("MaintainWorkOrders"));
        tmpact.triggered.connect(editwo);

        tmpact = pMenu.addAction(qsTr("View Work Order..."));
        tmpact.enabled = (privileges.check("MaintainWorkOrders"));
        tmpact.triggered.connect(viewwo);
      }
    }
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
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
    QMessageBox.critical(mainwindow, "dockSendMessage",
                         "viewwo exception: " + e);
  }
}
