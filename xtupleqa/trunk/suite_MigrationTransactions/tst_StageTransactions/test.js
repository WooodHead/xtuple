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
       
    waitForObject(":Log In.Options_QPushButton");
    clickButton(":Log In.Options_QPushButton");
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
        
    waitForObject(":_quote_XTreeWidget");
    clickItem(":_quote_XTreeWidget", "40011", 5, 5, 1, Qt.LeftButton);
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
    clickItem(":frame._so_XTreeWidget_2", "50194", 5, 5, 1, Qt.LeftButton);
    
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
    clickItem(":frame._so_XTreeWidget_2", "50195", 5, 5, 1, Qt.LeftButton);
    
    
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
    clickItem(":frame._so_XTreeWidget_2", "50196", 5, 5, 1, Qt.LeftButton);
    
    
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
    clickItem(":frame._so_XTreeWidget_2", "50197", 5, 5, 1, Qt.LeftButton);
    
    
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
    clickItem(":frame._so_XTreeWidget_2", "50198", 5, 5, 1, Qt.LeftButton);
    
    
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
    clickItem(":frame._so_XTreeWidget_2", "50199", 5, 5, 1, Qt.LeftButton);
    
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
    waitForObject(":Planned Order.Create_QPushButton");
    clickButton(":Planned Order.Create_QPushButton");
    waitForObject(":Planned Order.Close_QPushButton");
    clickButton(":Planned Order.Close_QPushButton");
    
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
    waitForObject(":Planned Order.Create_QPushButton");
    clickButton(":Planned Order.Create_QPushButton");
    waitForObject(":Planned Order.Close_QPushButton");
    clickButton(":Planned Order.Close_QPushButton");
    
    
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
    type(":frame._planord_XTreeWidget", " ");
    sendEvent("QContextMenuEvent", ":frame._planord_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
    waitForObject(":Planned Orders by Planner Code.Create_QPushButton");
    clickButton(":Planned Orders by Planner Code.Create_QPushButton");
  
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
  
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
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
   
    
    
     //------List Unposted Purchase Order------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    waitForObjectItem(":List Unposted Purchase Orders._pohead_XTreeWidget", "20066");
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", "20066", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Post P/O_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post P/O_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
   
      
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
    doubleClick(":_listTab_XTreeWidget_5", 69, 11, 0, Qt.LeftButton);
    waitForObject(":List Unposted Receipts.Close_QPushButton");
    clickButton(":List Unposted Receipts.Close_QPushButton");
      
  
    
    //----Create Misc Invoice-----
    waitForObject(":xTuple ERP:*_QMenuBar_2");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObject(":xTuple ERP:*.Accounting_QMenu");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObject(":xTuple ERP:*.Accounts Receivable_QMenu");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
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
    clickItem(":_invchead_XTreeWidget", "60079", 5, 5, 1, Qt.LeftButton);
    
    
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
    clickItem(":_invchead_XTreeWidget", "60080", 5, 5, 1, Qt.LeftButton);
    
   
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
    clickItem(":_invchead_XTreeWidget", "60081", 5, 5, 1, Qt.LeftButton);
   
    
    
    //----Post Invoice---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
  
    waitForObject(":_invchead_XTreeWidget");
    var sWidgetTreeControl = ":_invchead_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(":_invchead_XTreeWidget","<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=0;i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(1);
        if(sNameOfRootItem=="60080") break;
        type(sWidgetTreeControl,"<Down>"); 
    }
    sendEvent("QContextMenuEvent", ":_invchead_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
    waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
    clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");

    
    //---Post Invoice--- 
    waitForObject(":_invchead_XTreeWidget");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=0;i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(1);
        if(sNameOfRootItem=="60081") break;
        type(sWidgetTreeControl,"<Down>"); 
    }
    sendEvent("QContextMenuEvent", ":_invchead_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
    waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
    clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");
    snooze(0.5);
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");

 
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
    doubleClickItem(":_listTab_XTreeWidget_12", "TTOYS", 43, 13, 0, Qt.LeftButton);
    waitForObjectItem(":_applicationsTab._aropen_XTreeWidget", "60081");
    clickItem(":_applicationsTab._aropen_XTreeWidget", "60081", 31, 5, 1, Qt.LeftButton);
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
    waitForObject(":Miscellaneous Distributions:.New_QPushButton");
    clickButton(":Miscellaneous Distributions:.New_QPushButton");
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
    waitForObject(":Miscellaneous Voucher.Cancel_QPushButton");
    clickButton(":Miscellaneous Voucher.Cancel_QPushButton");
    
    
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
    waitForObject(":Miscellaneous Distributions:.New_QPushButton");
    clickButton(":Miscellaneous Distributions:.New_QPushButton");
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
    waitForObject(":Miscellaneous Voucher.Cancel_QPushButton");
    clickButton(":Miscellaneous Voucher.Cancel_QPushButton");
    
    
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
    waitForObject(":Miscellaneous Distributions:.New_QPushButton");
    clickButton(":Miscellaneous Distributions:.New_QPushButton");
    waitForObject(":_groupButton.Expense Category:_QRadioButton");
    clickButton(":_groupButton.Expense Category:_QRadioButton");
    waitForObject(":_groupButton._expcat_ExpenseCluster");
    mouseClick(":_groupButton._expcat_ExpenseCluster", 134, 15, 1, Qt.LeftButton);
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
    waitForObject(":Miscellaneous Voucher.Cancel_QPushButton");
    clickButton(":Miscellaneous Voucher.Cancel_QPushButton");
  
    
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
    clickItem(":List Open Vouchers._vohead_XTreeWidget", "30071", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
    clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    clickItem(":List Open Vouchers._vohead_XTreeWidget", "30072", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
    clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");

    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    clickItem(":List Open Vouchers._vohead_XTreeWidget", "30073", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
    clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");


    //--------prepare check run--------
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
    clickItem(":frame._apopen_XTreeWidget", "30073", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Select..._QPushButton");
    clickButton(":frame.Select..._QPushButton");
    waitForObjectItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account");
    clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments.Save_QPushButton");
    clickButton(":Select Payments.Save_QPushButton");
    waitForObject(":Select Payments.Close_QPushButton");
    clickButton(":Select Payments.Close_QPushButton");
  
    
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

    //--------Post Check------------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Post Check...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Post Check...");
    
    waitForObject(":Post Check._check_XComboBox");
    type(":Post Check._check_XComboBox", "<Down>");
    waitForObject(":Post Check.Post_QPushButton");
    clickButton(":Post Check.Post_QPushButton");
    waitForObject(":Post Check_postCheck");
    sendEvent("QCloseEvent", ":Post Check_postCheck");


    
   
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
    var sWidgetTreeControl = ":frame._wo_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(":frame._wo_XTreeWidget","<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=0;i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(1);
        if(sNameOfRootItem=="10062-1") break;
        type(sWidgetTreeControl,"<Down>"); 
    }
    sendEvent("QContextMenuEvent", ":frame._wo_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
    waitForObject(":W/O Schedule by Planner Code.Implode_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Implode_QPushButton");
    
        
    //-------Post Operation---------
    waitForObject(":frame._wo_XTreeWidget");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=0;i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(1);
        if(sNameOfRootItem=="10065-1") break;
        type(sWidgetTreeControl,"<Down>"); 
    }
    sendEvent("QContextMenuEvent", ":frame._wo_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
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
    
    //-------Post Operation---------
        waitForObject(":frame._wo_XTreeWidget");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=0;i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(1);
        if(sNameOfRootItem=="10066-1") break;
        type(sWidgetTreeControl,"<Down>"); 
    }
    sendEvent("QContextMenuEvent", ":frame._wo_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
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
    
    
    
    //------Post Operation--------
    waitForObject(":frame._wo_XTreeWidget");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=0;i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(1);
        if(sNameOfRootItem=="10067-1") break;
        type(sWidgetTreeControl,"<Down>"); 
    }
    sendEvent("QContextMenuEvent", ":frame._wo_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
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
    waitForObject(":frame._wo_XTreeWidget");
    sendEvent("QContextMenuEvent", ":frame._wo_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    waitForObject(":xTuple ERP:*._menu_QMenu");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    waitForObject(":_operationGroup._wooper_XComboBox");
    type(":_operationGroup._wooper_XComboBox", "<Down>");
    type(":_operationGroup._wooper_XComboBox", "<Down>");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObject(":frame._wo_XTreeWidget");
    openContextMenu(":frame._wo_XTreeWidget", 49, 22, 0);
    waitForObject(":xTuple ERP:*._menu_QMenu");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    waitForObject(":_operationGroup._wooper_XComboBox");
    type(":_operationGroup._wooper_XComboBox", "<Down>");
    type(":_operationGroup._wooper_XComboBox", "<Down>");
    type(":_operationGroup._wooper_XComboBox", "<Down>");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");

    
    //----Release Work Order---
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
    waitForObject(":frame._wo_XTreeWidget");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=0;i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(1);
        if(sNameOfRootItem=="10064-1") break;
        type(sWidgetTreeControl,"<Down>"); 
    }
    sendEvent("QContextMenuEvent", ":frame._wo_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release W/O");
    activateItem(":xTuple ERP:*._menu_QMenu", "Release W/O");
    
  
  
    
      
    
   

    

}
