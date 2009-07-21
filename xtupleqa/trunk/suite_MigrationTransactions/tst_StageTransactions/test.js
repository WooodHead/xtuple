function main()
{
   
    //---User role -----
    var userrole="CONFIGURE";
    
    
    //--------Login into Appl----------
    var set = testData.dataset("login.tsv");
    var url, db, port, pwd,realname,username;
    db=pwd=port=url=realname=username="";
    for(var records in set)
    {
        url=testData.field(set[records],"HOST");
        db=testData.field(set[records],"DB");
        port=testData.field(set[records],"PORT");
        pwd=testData.field(set[records],"PASSWORD");
        role=testData.field(set[records],"ROLE");
        username=testData.field(set[records],"USERNAME");
        realname=testData.field(set[records],"REALNAME");
        if(userrole==role) break;
        
    }
    
    if(userrole!=role)
    {
        test.fatal("Please enter user details in login.tsv for the role: "+userrole);
        exit(1);
    }
    
    
    waitForObject(":Log In.Options..._QPushButton");
    clickButton(":Log In.Options..._QPushButton");
    waitForObject(":_server_QLineEdit");
    if(findObject(":_server_QLineEdit").text!= url)
    {findObject(":_server_QLineEdit").text=url;
        test.log("URL Changed to: "+url);
    }
    if(findObject(":_database_QLineEdit").text!=db)
    {
        findObject(":_database_QLineEdit").text=db;
        test.log("Database Changed to: "+db);
    }
    if(findObject(":_port_QLineEdit").text!=port)
    {
        findObject(":_port_QLineEdit").text=port;
        test.log("Port Changed to:" + port);
    }
    clickButton(":Login Options.Save_QPushButton");
    waitForObject(":_username_QLineEdit");    
    type(":_username_QLineEdit", username);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", pwd);
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    test.log("Logged in Application");
    waitForObject(":xTuple ERP:*.Products Tools_QWorkspace");
    
    
    
    //---Create Quote----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Quote");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Quote");
    waitForObjectItem(":xTuple ERP:*.Quote_QMenu", "List...");
    activateItem(":xTuple ERP:*.Quote_QMenu", "List...");
    
    waitForObject(":frame.New_QPushButton_3");
    clickButton(":frame.New_QPushButton_3");
    waitForObject(":_headerPage._customerNumber_CLineEdit");
    mouseClick(":_headerPage._customerNumber_CLineEdit", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_headerPage...._QPushButton_3");
    clickButton(":_headerPage...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget_3");
    doubleClickItem(":_listTab_XTreeWidget_3", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_3");
    clickButton(":_lineItemsPage.New_QPushButton_3");
    waitForObject(":_itemGroup...._QPushButton_3");
    clickButton(":_itemGroup...._QPushButton_3");
    waitForObject(":_item_XTreeWidget_3");
    doubleClickItem(":_item_XTreeWidget_3", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_3");
    type(":_qtyOrdered_XLineEdit_3", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "<Tab>");
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
    waitForObject(":Quote.Close_QPushButton");
    clickButton(":Quote.Close_QPushButton");
    waitForObject(":Quote.Save_QPushButton_2");
    clickButton(":Quote.Save_QPushButton_2");
    waitForObject(":Quote.Cancel_QPushButton");
    clickButton(":Quote.Cancel_QPushButton");
    
    waitForObject(":_quote_XTreeWidget_2");
    if(!clickItem(":_quote_XTreeWidget_2", "40012", 5, 5, 1, Qt.LeftButton))
        test.pass("Quote created: 40011");
    waitForObject(":List Quotes.Close_QPushButton");
    clickButton(":List Quotes.Close_QPushButton");
    
    
    //---Create Sales Order---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Sales Order.Save_QPushButton_3");
    clickButton(":Sales Order.Save_QPushButton_3");
    waitForObject(":Sales Order.Close_QPushButton_2");
    clickButton(":Sales Order.Close_QPushButton_2");
    waitForObject(":Sales Order.Save_QPushButton_4");
    clickButton(":Sales Order.Save_QPushButton_4");
    waitForObject(":Sales Order.Cancel_QPushButton_2");
    clickButton(":Sales Order.Cancel_QPushButton_2");
    waitForObject(":frame._so_XTreeWidget_2");
    if(!clickItem(":frame._so_XTreeWidget_2", "50194", 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Order created: 50194");
   
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Sales Order.Save_QPushButton_3");
    clickButton(":Sales Order.Save_QPushButton_3");
    waitForObject(":Sales Order.Close_QPushButton_2");
    clickButton(":Sales Order.Close_QPushButton_2");
    waitForObject(":Sales Order.Save_QPushButton_4");
    clickButton(":Sales Order.Save_QPushButton_4");
    waitForObject(":Sales Order.Cancel_QPushButton_2");
    clickButton(":Sales Order.Cancel_QPushButton_2");
    waitForObject(":frame._so_XTreeWidget_2");
    if(!clickItem(":frame._so_XTreeWidget_2", "50195", 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Order created: 50195");
    
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Sales Order.Save_QPushButton_3");
    clickButton(":Sales Order.Save_QPushButton_3");
    waitForObject(":Sales Order.Close_QPushButton_2");
    clickButton(":Sales Order.Close_QPushButton_2");
    waitForObject(":Sales Order.Save_QPushButton_4");
    clickButton(":Sales Order.Save_QPushButton_4");
    waitForObject(":Sales Order.Cancel_QPushButton_2");
    clickButton(":Sales Order.Cancel_QPushButton_2");
    waitForObject(":frame._so_XTreeWidget_2");
    if(!clickItem(":frame._so_XTreeWidget_2", "50196", 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Order created: 50196");
    
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Sales Order.Save_QPushButton_3");
    clickButton(":Sales Order.Save_QPushButton_3");
    waitForObject(":Sales Order.Close_QPushButton_2");
    clickButton(":Sales Order.Close_QPushButton_2");
    waitForObject(":Sales Order.Save_QPushButton_4");
    clickButton(":Sales Order.Save_QPushButton_4");
    waitForObject(":Sales Order.Cancel_QPushButton_2");
    clickButton(":Sales Order.Cancel_QPushButton_2");
    waitForObject(":frame._so_XTreeWidget_2");
    if(!clickItem(":frame._so_XTreeWidget_2", "50197", 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Order created: 50197");
    
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Sales Order.Save_QPushButton_3");
    clickButton(":Sales Order.Save_QPushButton_3");
    waitForObject(":Sales Order.Close_QPushButton_2");
    clickButton(":Sales Order.Close_QPushButton_2");
    waitForObject(":Sales Order.Save_QPushButton_4");
    clickButton(":Sales Order.Save_QPushButton_4");
    waitForObject(":Sales Order.Cancel_QPushButton_2");
    clickButton(":Sales Order.Cancel_QPushButton_2");
    waitForObject(":frame._so_XTreeWidget_2");
    if(!clickItem(":frame._so_XTreeWidget_2", "50198", 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Order created: 50198");
    
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Sales Order.Save_QPushButton_3");
    clickButton(":Sales Order.Save_QPushButton_3");
    waitForObject(":Sales Order.Close_QPushButton_2");
    clickButton(":Sales Order.Close_QPushButton_2");
    waitForObject(":Sales Order.Save_QPushButton_4");
    clickButton(":Sales Order.Save_QPushButton_4");
    waitForObject(":Sales Order.Cancel_QPushButton_2");
    clickButton(":Sales Order.Cancel_QPushButton_2");
    waitForObject(":frame._so_XTreeWidget_2");
    if(!clickItem(":frame._so_XTreeWidget_2", "50199", 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Order created: 50199");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton_2");
    clickButton(":List Open Sales Orders.Close_QPushButton_2");
    
    
    //---Scheduling---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
    waitForObjectItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
    waitForObject(":Run MRP by Planner Code.XDateEdit_XDateEdit");
    type(":Run MRP by Planner Code.XDateEdit_XDateEdit", "+30");
    waitForObject(":Run MRP by Planner Code.XDateEdit_XDateEdit");
    type(":Run MRP by Planner Code.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":Run MRP by Planner Code.Create_QPushButton");
    clickButton(":Run MRP by Planner Code.Create_QPushButton");
    test.log("MRP Schedule run for next 30 days");
 
    
    //---Create Planned Order----
    waitForObject(":xTuple ERP:*_QMenuBar_2");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
    waitForObject(":Planned Order...._QPushButton");
    clickButton(":Planned Order...._QPushButton");
    waitForObject(":_item_XTreeWidget_5");
    doubleClickItem(":_item_XTreeWidget_5", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Planned Order._qty_XLineEdit");
    type(":Planned Order._qty_XLineEdit", "100");
    waitForObject(":Planned Order.XDateEdit_XDateEdit");
    type(":Planned Order.XDateEdit_XDateEdit", "+9");
    waitForObject(":Planned Order.XDateEdit_XDateEdit");
    type(":Planned Order.XDateEdit_XDateEdit", "<Tab>");
    clickButton(":_typeGroup.Purchase Order_QRadioButton");
    waitForObject(":Planned Order.Save_QPushButton");
    clickButton(":Planned Order.Save_QPushButton");
    waitForObject(":Planned Order.Close_QPushButton");
    clickButton(":Planned Order.Close_QPushButton");
    test.log("new Planned Order created");
 
    
    //---Create Planned Order----
    waitForObject(":xTuple ERP:*_QMenuBar_2");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
    waitForObject(":Planned Order...._QPushButton");
    clickButton(":Planned Order...._QPushButton");
    waitForObject(":_item_XTreeWidget_5");
    doubleClickItem(":_item_XTreeWidget_5", "TBODY1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Planned Order._qty_XLineEdit");
    type(":Planned Order._qty_XLineEdit", "100");
    waitForObject(":Planned Order.XDateEdit_XDateEdit");
    type(":Planned Order.XDateEdit_XDateEdit", "+9");
    waitForObject(":Planned Order.XDateEdit_XDateEdit");
    type(":Planned Order.XDateEdit_XDateEdit", "<Tab>");
    clickButton(":_typeGroup.Purchase Order_QRadioButton");
    waitForObject(":Planned Order.Save_QPushButton");
    clickButton(":Planned Order.Save_QPushButton");
    waitForObject(":Planned Order.Close_QPushButton");
    clickButton(":Planned Order.Close_QPushButton");
    test.log("new Planned Order created");
    
    
    //---Release Planned Order---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
    activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
    
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    type(":Planned Orders by Planner Code.Query_QPushButton", "<Down>");
    openItemContextMenu(":frame._planord_XTreeWidget", "90316-1", 5, 5, 0);
    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
    waitForObject(":Planned Orders by Planner Code.Create_QPushButton");
    clickButton(":Planned Orders by Planner Code.Create_QPushButton");
    
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    test.log("Released Planned Order: 90316-1");
    
    
    //----Create Purchase Order--------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    
    waitForObject(":List Unposted Purchase Orders.New_QPushButton");
    clickButton(":List Unposted Purchase Orders.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton_4");
    clickButton(":_headerPage...._QPushButton_4");
    waitForObject(":_listTab_XTreeWidget_7");
    doubleClickItem(":_listTab_XTreeWidget_7", "TPARTS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_4");
    clickButton(":_lineItemsPage.New_QPushButton_4");
    waitForObject(":_typeGroup...._QPushButton");
    clickButton(":_typeGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TBOX1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "100");
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
    type(":_schedGroup.XDateEdit_XDateEdit_5", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
    type(":_schedGroup.XDateEdit_XDateEdit_5", "<Tab>");
    waitForObject(":Purchase Order Item.Save_QPushButton");
    clickButton(":Purchase Order Item.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    test.log("new Purchase Order created: 20064");
    
    waitForObject(":List Unposted Purchase Orders.New_QPushButton");
    clickButton(":List Unposted Purchase Orders.New_QPushButton");    
    waitForObject(":_headerPage...._QPushButton_4");
    clickButton(":_headerPage...._QPushButton_4");
    waitForObject(":_listTab_XTreeWidget_7");
    doubleClickItem(":_listTab_XTreeWidget_7", "TPARTS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_4");
    clickButton(":_lineItemsPage.New_QPushButton_4");
    waitForObject(":_typeGroup...._QPushButton");
    clickButton(":_typeGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TBOX1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "100");
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
    type(":_schedGroup.XDateEdit_XDateEdit_5", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
    type(":_schedGroup.XDateEdit_XDateEdit_5", "<Tab>");
    waitForObject(":Purchase Order Item.Save_QPushButton");
    clickButton(":Purchase Order Item.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    test.log("new Purchase Order created: 20065");
    
    waitForObject(":List Unposted Purchase Orders.New_QPushButton");
    clickButton(":List Unposted Purchase Orders.New_QPushButton");    
    waitForObject(":_headerPage...._QPushButton_4");
    clickButton(":_headerPage...._QPushButton_4");
    waitForObject(":_listTab_XTreeWidget_7");
    doubleClickItem(":_listTab_XTreeWidget_7", "TPARTS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_4");
    clickButton(":_lineItemsPage.New_QPushButton_4");
    waitForObject(":_typeGroup...._QPushButton");
    clickButton(":_typeGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TBOX1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "100");
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
    type(":_schedGroup.XDateEdit_XDateEdit_5", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
    type(":_schedGroup.XDateEdit_XDateEdit_5", "<Tab>");
    waitForObject(":Purchase Order Item.Save_QPushButton");
    clickButton(":Purchase Order Item.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    test.log("new Purchase Order created: 20066");
    
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
 
    
    //------List Unposted Purchase Order------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    waitForObjectItem(":List Unposted Purchase Orders._pohead_XTreeWidget", "20065");
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", "20065", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Post P/O_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post P/O_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    test.log("Post Purchase Order: 20065");
    
    waitForObjectItem(":List Unposted Purchase Orders._pohead_XTreeWidget", "20066");
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", "20066", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Post P/O_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post P/O_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
    test.log("Post Purchase Order: 20066");
  
    
    //----Issue stock to Shipping and Ship Order----        
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50195", 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    test.log("Issue stocked to Shipping: 50195");
 
    
    //----Ship Order----        
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50196", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Select for Billing_QCheckBox").checked == true)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
        clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
        clickButton(":groupBox.Print Packing List_XCheckBox");
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    test.log("Issue stocked and shiped: 50196");
 
    
    //----Ship Order----        
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50197", 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
        clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
        clickButton(":groupBox.Print Packing List_XCheckBox");
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    test.log("Issue stocked, shiped and selected for Billing: 50197");
  
    
    //----Ship Order----        
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50198", 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Select for Billing_QCheckBox").checked==true)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == false)
        clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
        clickButton(":groupBox.Print Packing List_XCheckBox");
    
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    
    waitForObject(":Issue to Shipping.Cancel_QPushButton");
    clickButton(":Issue to Shipping.Cancel_QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    test.log("Issue stocked,shiped and invoice created: 50198");
  
    
    //----Ship Order----        
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50199", 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Select for Billing_QCheckBox").checked==true)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == false)
        clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
        clickButton(":groupBox.Print Packing List_XCheckBox");
    
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    waitForObject(":Issue to Shipping.Cancel_QPushButton");
    clickButton(":Issue to Shipping.Cancel_QPushButton");
    
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    test.log("Issue stocked,shipped and invoice posted: 50199");
  
    
    //-----Post Invoice--------
    waitForObject(":xTuple ERP:*_QMenuBar_2");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObject(":xTuple ERP:*.Accounting_QMenu");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObject(":xTuple ERP:*.Accounts Receivable_QMenu");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    waitForObject(":xTuple ERP:*.Invoice_QMenu");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
    
    waitForObject(":_invchead_XTreeWidget");
    openItemContextMenu(":_invchead_XTreeWidget", "50199", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
    waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
    clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");
    test.log("Post Invoice: 50199");   
   
    
    //----Create Receipt----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
    waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
    activateItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
    
    waitForObject(":List Unposted Receipts.New_QPushButton");
    clickButton(":List Unposted Receipts.New_QPushButton");
    waitForObject(":Enter Order Receipts...._QPushButton");
    clickButton(":Enter Order Receipts...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_5");
    doubleClickItem(":_listTab_XTreeWidget_5", "20066", 5,5, 0, Qt.LeftButton);
    
    waitForObject(":Enter Order Receipts.Receive All_QPushButton");
    clickButton(":Enter Order Receipts.Receive All_QPushButton");
    
    waitForObject(":Enter Order Receipts.Save_QPushButton");
    clickButton(":Enter Order Receipts.Save_QPushButton");
    waitForObject(":List Unposted Receipts.Close_QPushButton");
    clickButton(":List Unposted Receipts.Close_QPushButton");
    test.log("Receive Order for PO: 20066");
    
    
    //----Create Misc Invoice-----
    waitForObject(":xTuple ERP:*_QMenuBar_2");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObject(":xTuple ERP:*.Accounting_QMenu");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObject(":xTuple ERP:*.Accounts Receivable_QMenu");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    type(":xTuple ERP:*.Accounts Receivable_QMenu","<Right>");
    type(":xTuple ERP:*.Accounts Receivable_QMenu","<Right>");
    waitForObject(":xTuple ERP:*.Invoice_QMenu");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
    
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_6");
    clickItem(":_listTab_XTreeWidget_6", "TTOYS", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_listTab_XTreeWidget_6");
    doubleClickItem(":_listTab_XTreeWidget_6", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
    waitForObject(":Item...._QPushButton");
    clickButton(":Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_4");
    doubleClickItem(":_item_XTreeWidget_4", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "100");
    waitForObject(":_billed_XLineEdit");
    type(":_billed_XLineEdit", "100");
    type(":_billed_XLineEdit","<Tab>");
    waitForObject(":Invoice.Save_QPushButton");
    clickButton(":Invoice.Save_QPushButton");
    waitForObject(":Invoice.Save_QPushButton_2");
    clickButton(":Invoice.Save_QPushButton_2");
    waitForObject(":_invchead_XTreeWidget");
    if(!clickItem(":_invchead_XTreeWidget", "60081", 5, 5, 1, Qt.LeftButton))
        test.pass("Invoice created: 60081");
    
    
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_6");
    clickItem(":_listTab_XTreeWidget_6", "TTOYS", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_listTab_XTreeWidget_6");
    doubleClickItem(":_listTab_XTreeWidget_6", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
    waitForObject(":Item...._QPushButton");
    clickButton(":Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_4");
    doubleClickItem(":_item_XTreeWidget_4", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "100");
    waitForObject(":_billed_XLineEdit");    
    type(":_billed_XLineEdit", "100");
    type(":_billed_XLineEdit","<Tab>");
    waitForObject(":Invoice.Save_QPushButton");
    clickButton(":Invoice.Save_QPushButton");
    waitForObject(":Invoice.Save_QPushButton_2");
    clickButton(":Invoice.Save_QPushButton_2");
    waitForObject(":_invchead_XTreeWidget");
    if(!clickItem(":_invchead_XTreeWidget", "60082", 5, 5, 1, Qt.LeftButton))
        test.pass("Invoice created: 60082");
    
    
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_6");
    clickItem(":_listTab_XTreeWidget_6", "TTOYS", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_listTab_XTreeWidget_6");
    doubleClickItem(":_listTab_XTreeWidget_6", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
    waitForObject(":Item...._QPushButton");
    clickButton(":Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_4");
    doubleClickItem(":_item_XTreeWidget_4", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "100");
    waitForObject(":_billed_XLineEdit");
    type(":_billed_XLineEdit", "100");
    type(":_billed_XLineEdit","<Tab>");
    waitForObject(":Invoice.Save_QPushButton");
    clickButton(":Invoice.Save_QPushButton");
    waitForObject(":Invoice.Save_QPushButton_2");
    clickButton(":Invoice.Save_QPushButton_2");
    waitForObject(":_invchead_XTreeWidget");
    if(!clickItem(":_invchead_XTreeWidget", "60083", 5, 5, 1, Qt.LeftButton))
        test.pass("Invoice created: 60083");
    
    
    //-----Post Invoice--------
    waitForObject(":_invchead_XTreeWidget");
    openItemContextMenu(":_invchead_XTreeWidget", "60082", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
    waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
    clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");
    test.log("Posted Invoice: 60082");
    
    
    //---Post Invoice--- 
    waitForObject(":_invchead_XTreeWidget");
    openItemContextMenu(":_invchead_XTreeWidget", "60083", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
    waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
    clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");
    snooze(0.5);
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");
    test.log("Posted Invoice: 60083");
    
    
    //--------Create Cash receipt and apply-----------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Cash Receipt");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Cash Receipt");
    
    waitForObjectItem(":xTuple ERP:*.Cash Receipt_QMenu", "New...");
    activateItem(":xTuple ERP:*.Cash Receipt_QMenu", "New...");
    waitForObject(":Cash Receipt...._QPushButton");
    clickButton(":Cash Receipt...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_12");
    doubleClickItem(":_listTab_XTreeWidget_12", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObjectItem(":_applicationsTab._aropen_XTreeWidget", "60083");
    clickItem(":_applicationsTab._aropen_XTreeWidget", "60083", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_applicationsTab.Apply_QPushButton");
    clickButton(":_applicationsTab.Apply_QPushButton");
    waitForObject(":Cash Receipt_XLineEdit");
    var amt = findObject(":Cash Receipt_XLineEdit_2").text;
    type(":Cash Receipt_XLineEdit", amt);
    waitForObject(":Cash Receipt.Save_QPushButton");
    clickButton(":Cash Receipt.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit_2");
    type(":_amountGroup_XLineEdit_2", amt);
    waitForObject(":Cash Receipt.Save_QPushButton_2");
    clickButton(":Cash Receipt.Save_QPushButton_2");
    test.pass("Cash Receipt created against Invoice: 60083");
    
    
    
    //---Create Voucher------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    
    waitForObject(":List Open Vouchers.New_QPushButton");
    clickButton(":List Open Vouchers.New_QPushButton");
    waitForObject(":_voucherGroup...._QPushButton");
    clickButton(":_voucherGroup...._QPushButton");
    waitForObject(":_pohead_XTreeWidget");
    doubleClickItem(":_pohead_XTreeWidget", "20065", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_poitems.Distribute All_QPushButton");
    clickButton(":_poitems.Distribute All_QPushButton");
    waitForObject(":_poitems.Distribute All_QPushButton");
    clickButton(":_poitems.Distribute All_QPushButton");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit");
    type(":_dateGroup.XDateEdit_XDateEdit", "0");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit");
    type(":_dateGroup.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":_invoiceNum_XLineEdit");
    type(":_invoiceNum_XLineEdit", "VO for PO 20065");
    waitForObject(":_reference_XLineEdit");
    type(":_reference_XLineEdit", "ref - VO for PO 20065");
    waitForObject(":Voucher.Save_QPushButton");
    clickButton(":Voucher.Save_QPushButton");
    waitForObject(":Voucher.Cancel_QPushButton");
    clickButton(":Voucher.Cancel_QPushButton");
    test.log("Voucher created for PO: 20065");
    

    
    //----Accounting - Misc Voucher----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
    
    waitForObject(":xTuple ERP:*_QPushButton");
    clickButton(":xTuple ERP:*_QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TPARTS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    waitForObject(":_groupButton.Expense Category_QRadioButton");
    clickButton(":_groupButton.Expense Category_QRadioButton");
    waitForObject(":_expenseGroup...._QPushButton");
    clickButton(":_expenseGroup...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_13");
    doubleClickItem(":_listTab_XTreeWidget_13", "OFFICE", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher_XLineEdit");
    type(":Miscellaneous Voucher_XLineEdit", "34");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton");
    clickButton(":Miscellaneous Voucher.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit");
    type(":_amountGroup_XLineEdit", "34");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":_referenceGroup._invoiceNum_XLineEdit");
    type(":_referenceGroup._invoiceNum_XLineEdit", "VO 30071");
    waitForObject(":_referenceGroup._reference_XLineEdit");
    type(":_referenceGroup._reference_XLineEdit", "ref - VO 30071");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
    clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
    waitForObject(":Miscellaneous Voucher.Cancel_QPushButton");
    clickButton(":Miscellaneous Voucher.Cancel_QPushButton");
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");
    test.log("Misc Voucher created: 30071");
    
    
    //----Accounting - Misc Voucher----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
    
    waitForObject(":xTuple ERP:*_QPushButton");
    clickButton(":xTuple ERP:*_QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TPARTS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher._voucherGroup_QGroupBox");
    mouseClick(":Miscellaneous Voucher._voucherGroup_QGroupBox", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    waitForObject(":_groupButton.Expense Category:_QRadioButton");
    clickButton(":_groupButton.Expense Category:_QRadioButton");
    waitForObject(":_groupButton._expcat_ExpenseCluster");
    mouseClick(":_groupButton._expcat_ExpenseCluster", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_groupButton...._QPushButton");
    clickButton(":_groupButton...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_9");
    doubleClickItem(":_listTab_XTreeWidget_9", "OFFICE", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher_XLineEdit");
    type(":Miscellaneous Voucher_XLineEdit", "34");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton");
    clickButton(":Miscellaneous Voucher.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit");
    type(":_amountGroup_XLineEdit", "34");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":_referenceGroup._invoiceNum_XLineEdit");
    type(":_referenceGroup._invoiceNum_XLineEdit", "VO 30072");
    waitForObject(":_referenceGroup._reference_XLineEdit");
    type(":_referenceGroup._reference_XLineEdit", "ref - VO 30072");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
    clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
    snooze(1);
    if(object.exists(":Miscellaneous Voucher.Yes_QPushButton"))
        clickButton(":Miscellaneous Voucher.Yes_QPushButton");
    waitForObject(":Miscellaneous Voucher.Cancel_QPushButton");
    clickButton(":Miscellaneous Voucher.Cancel_QPushButton");
    test.log("Misc Voucher created: 30072");
    
    
    //----Accounting - Misc Voucher----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObject(":xTuple ERP:*.Accounting_QMenu");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
    
    waitForObject(":xTuple ERP:*_QPushButton");
    clickButton(":xTuple ERP:*_QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TPARTS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher._voucherGroup_QGroupBox");
    mouseClick(":Miscellaneous Voucher._voucherGroup_QGroupBox", 50, 80, 1, Qt.LeftButton);
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    waitForObject(":_groupButton.Expense Category:_QRadioButton");
    clickButton(":_groupButton.Expense Category:_QRadioButton");
    waitForObject(":_groupButton._expcat_ExpenseCluster");
    mouseClick(":_groupButton._expcat_ExpenseCluster", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_groupButton...._QPushButton");
    clickButton(":_groupButton...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_9");
    doubleClickItem(":_listTab_XTreeWidget_9", "OFFICE", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher_XLineEdit");
    type(":Miscellaneous Voucher_XLineEdit", "34");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton");
    clickButton(":Miscellaneous Voucher.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit");
    type(":_amountGroup_XLineEdit", "34");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":_referenceGroup._invoiceNum_XLineEdit");
    type(":_referenceGroup._invoiceNum_XLineEdit", "VO 30073");
    waitForObject(":_referenceGroup._reference_XLineEdit");
    type(":_referenceGroup._reference_XLineEdit", "ref - VO 30073");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
    clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
    snooze(1);
    if(object.exists(":Miscellaneous Voucher.Yes_QPushButton"))
        clickButton(":Miscellaneous Voucher.Yes_QPushButton");
    waitForObject(":Miscellaneous Voucher.Cancel_QPushButton");
    clickButton(":Miscellaneous Voucher.Cancel_QPushButton");
    test.log("Misc Voucher created: 30073");
   
    
    //-------Post Vouchers---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    openItemContextMenu(":List Open Vouchers._vohead_XTreeWidget", "30071", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
    waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
    clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    test.log("Posted Voucher: 30071");
    
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    openItemContextMenu(":List Open Vouchers._vohead_XTreeWidget", "30073", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
    waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
    clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    test.log("Posted Voucher: 30073");
    
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");
    
      
    //-----prepare check run, post check------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Select...");
    
    waitForObject(":frame._apopen_XTreeWidget");
    clickItem(":frame._apopen_XTreeWidget", "30074", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Select..._QPushButton");
    clickButton(":frame.Select..._QPushButton");
    waitForObjectItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account");
    clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments.Save_QPushButton");
    clickButton(":Select Payments.Save_QPushButton");
    waitForObject(":Select Payments.Close_QPushButton");
    clickButton(":Select Payments.Close_QPushButton");
    test.log("Selected for Payment: 30074");
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
    
    waitForObject(":Prepare Check Run._bankaccnt_XComboBox");
    clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Prepare Check Run.Prepare_QPushButton");
    clickButton(":Prepare Check Run.Prepare_QPushButton");
    test.log("Prepared Check Run");
    
    var linuxPath, winPath;
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
    activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    
    waitForObject(":Encryption Configuration_FileLineEdit");
    winPath = findObject(":Encryption Configuration_FileLineEdit").text;
    
    
    waitForObject(":Encryption Configuration_FileLineEdit_2");
    linuxPath = findObject(":Encryption Configuration_FileLineEdit_2").text;
    waitForObject(":Encryption Configuration.Cancel_QPushButton");
    clickButton(":Encryption Configuration.Cancel_QPushButton");
   
    
    //--------Post Check------------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
    
    waitForObjectItem(":_frame._check_XTreeWidget", "No");
    clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_frame.Print_QPushButton");
    sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 5, 5, Qt.LeftButton, 0); 	waitForObjectItem(":_QMenu", "Check Run...");
    activateItem(":_QMenu", "Check Run...");
    waitForObject(":View Check Run.Create ACH File_QPushButton");
    clickButton(":View Check Run.Create ACH File_QPushButton");
    if(object.exists(":View Check Run.Yes_QPushButton_2"))    
        clickButton(":View Check Run.Yes_QPushButton_2");
    waitForObject(":fileNameEdit_QLineEdit");
    
    if(OS.name=="Linux")
        findObject(":fileNameEdit_QLineEdit").text = linuxPath.toString()+"/achFile.ach";
    else if(OS.name=="Windows")
        findObject(":fileNameEdit_QLineEdit").text = winPath.toString()+"/achFile.ach";
        
    waitForObject(":xTuple ERP:*_QPushButton");
    sendEvent("QMouseEvent", ":xTuple ERP:*_QPushButton", QEvent.MouseButtonPress, 5, 5, Qt.LeftButton, 0);
    waitForObject(":xTuple ERP:*_QPushButton");
    sendEvent("QMouseEvent", ":xTuple ERP:*_QPushButton", QEvent.MouseButtonRelease, 5, 5, Qt.LeftButton, 1);    snooze(3);
     
    if(object.exists(":View Check Run.Yes_QPushButton_2"))    
        clickButton(":View Check Run.Yes_QPushButton_2");
    
    waitForObject(":View Check Run.Yes_QPushButton");
    clickButton(":View Check Run.Yes_QPushButton");
    
    waitForObject(":View Check Run.Cancel_QPushButton");
    clickButton(":View Check Run.Cancel_QPushButton");
    
    waitForObject(":View Check Run.Close_QPushButton");
    clickButton(":View Check Run.Close_QPushButton");
    test.log("Posted Check for Voucher: 30073");
    
    
    //-------Post Vouchers---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    openItemContextMenu(":List Open Vouchers._vohead_XTreeWidget", "30072", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
    waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
    clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    test.log("Posted Voucher: 30072");
  
    
    //--------Select--------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Select...");
    
    waitForObject(":frame._apopen_XTreeWidget");
    clickItem(":frame._apopen_XTreeWidget", "30072", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Select..._QPushButton");
    clickButton(":frame.Select..._QPushButton");
    waitForObjectItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account");
    clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments.Save_QPushButton");
    clickButton(":Select Payments.Save_QPushButton");
    waitForObject(":Select Payments.Close_QPushButton");
    clickButton(":Select Payments.Close_QPushButton");
    
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");
    test.log("Selected Payment for Voucher: 30072");  
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
    
    waitForObject(":Prepare Check Run._bankaccnt_XComboBox");
    clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Prepare Check Run.Prepare_QPushButton");
    clickButton(":Prepare Check Run.Prepare_QPushButton");
    test.log("Prepared Check Run");
    
    
    //----Manufacture- new Work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "YTRUCK1", 28, 7, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Work Order.Create_QPushButton");
    clickButton(":Work Order.Create_QPushButton");
    waitForObject(":Work Order.Close_QPushButton");
    clickButton(":Work Order.Close_QPushButton");
    test.log("Created Work Order: 10061-1");
   
    
    //----Manufacture - new Work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "YTRUCK1", 28, 7, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Work Order.Create_QPushButton");
    clickButton(":Work Order.Create_QPushButton");
    waitForObject(":Work Order.Close_QPushButton");
    clickButton(":Work Order.Close_QPushButton");
    test.log("Created Work Order: 10062-1");
   
    
    //----Manufacture- new Work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "YTRUCK1", 28, 7, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Work Order.Create_QPushButton");
    clickButton(":Work Order.Create_QPushButton");
    waitForObject(":Work Order.Close_QPushButton");
    clickButton(":Work Order.Close_QPushButton");
    test.log("Created Work Order: 10063-1");    
    
    
    //----Manufacture- new Work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "YTRUCK1", 28, 7, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Work Order.Create_QPushButton");
    clickButton(":Work Order.Create_QPushButton");
    waitForObject(":Work Order.Close_QPushButton");
    clickButton(":Work Order.Close_QPushButton");
    test.log("Created Work Order: 10064-1");
  
    
    //----Manufacture- new Work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "YTRUCK1", 28, 7, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Work Order.Create_QPushButton");
    clickButton(":Work Order.Create_QPushButton");
    waitForObject(":Work Order.Close_QPushButton");
    clickButton(":Work Order.Close_QPushButton");
    test.log("Created Work Order: 10065-1");    
 
    
    //----Manufacture- new Work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "YTRUCK1", 28, 7, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Work Order.Create_QPushButton");
    clickButton(":Work Order.Create_QPushButton");
    waitForObject(":Work Order.Close_QPushButton");
    clickButton(":Work Order.Close_QPushButton");
    test.log("Created Work Order: 10066-1");    
 
    
    //----Manufacture- new Work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "YTRUCK1", 28, 7, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Work Order.Create_QPushButton");
    clickButton(":Work Order.Create_QPushButton");
    waitForObject(":Work Order.Close_QPushButton");
    clickButton(":Work Order.Close_QPushButton");
    test.log("Created Work Order: 10067-1");    
    
    
    //----implode work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
    activateItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
    waitForObjectItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
    
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
    
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10062-1", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
    waitForObject(":W/O Schedule by Planner Code.Implode_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Implode_QPushButton");
    test.log("Imploded Work Order: 10062-1");
 
    
    //-------Post Operation---------
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10066-1", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    waitForObject(":_operationGroup._wooper_XComboBox");
    type(":_operationGroup._wooper_XComboBox", "<Down>");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObject(":W/O Schedule by Planner Code._itemloc_XTreeWidget");
    doubleClickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget","No" ,5, 5, 0, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Distribute_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Distribute_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_2");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_2");
    test.log("Posted partial Operation for WO: 10066-1");
    
    
    //------Post Operation--------
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10067-1", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    waitForObject(":_operationGroup._wooper_XComboBox");
    clickItem(":_operationGroup._wooper_XComboBox", "20 - Standard Paint Operation ",0,0,1,Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObject(":W/O Schedule by Planner Code._itemloc_XTreeWidget");
    doubleClickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget","No" ,5, 5, 0, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Distribute_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Distribute_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_2");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_2");
    test.log("Posted partial operations for WO: 10067-1");
    
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10065-1", 5, 5, 0);
    waitForObject(":xTuple ERP:*._menu_QMenu");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    waitForObject(":_operationGroup._wooper_XComboBox");
    clickItem(":_operationGroup._wooper_XComboBox", "30 - Standard Operation - Assembly Assembly",0,0,1,Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10065-1", 5, 5, 0);
    waitForObject(":xTuple ERP:*._menu_QMenu");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    waitForObject(":_operationGroup._wooper_XComboBox");
    clickItem(":_operationGroup._wooper_XComboBox", "40 - SHIPPING ",0,0,1,Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    test.log("Posted partial operation for WO: 10065-1");
    
    
    //----Release Work Order---
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10064-1", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release W/O");
    activateItem(":xTuple ERP:*._menu_QMenu", "Release W/O");
    test.log("Release WO: 10064-1");
    
    waitForObject(":W/O Schedule by Planner Code.Close_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close_QPushButton");
    
  
}
