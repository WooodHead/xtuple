function main()
{

    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Variable Declaration-----
    var sonumber, ponumber, vounumber, invoice, amount, polineitem, poquantity, woquantity, soquantity;
    
    //---find Application Edition------ 
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
    activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
    waitForObject(":Database Information.Save_QPushButton");
    clickButton(":Database Information.Save_QPushButton");
    
    //-----Setting Encryption Key-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
    activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    
    if(object.exists(":OK_QPushButton"))
        clickButton(":OK_QPushButton");
    waitForObject(":_ccEncKeyName_QLineEdit");
    
    if(findObject(":_ccEncKeyName_QLineEdit").text!="xTuple.key")
    {
        type(":_ccEncKeyName_QLineEdit", "<Right>");
        findObject(":_ccEncKeyName_QLineEdit").clear;
        type(":_ccEncKeyName_QLineEdit", "OpenMFG.key");
        test.log("Encryption: key name changed");
    }
    
    if(findObject(":Encryption Configuration_FileLineEdit").text!="c:/crypto")
    {
        type(":Encryption Configuration_FileLineEdit", "<Right>");
        findObject(":Encryption Configuration_FileLineEdit").clear;
        type(":Encryption Configuration_FileLineEdit", "c:/crypto");
        test.log("Encryption: Windows location changed");
    }
    
    if(findObject(":Encryption Configuration_FileLineEdit_2").text!="/home/xtuple/Desktop/crypto")
    {
        type(":Encryption Configuration_FileLineEdit_2", "<Right>");
        findObject(":Encryption Configuration_FileLineEdit_2").clear;
        type(":Encryption Configuration_FileLineEdit_2", "/home/xtuple/Desktop/crypto");
        test.log("Encryption: Linux location changed");
    }
    
    if(findObject(":Encryption Configuration_FileLineEdit_3").text!="/Users/zenemp/Desktop/crypto")
    {
        type(":Encryption Configuration_FileLineEdit_3", "<Right>");
        findObject(":Encryption Configuration_FileLineEdit_3").clear;
        type(":Encryption Configuration_FileLineEdit_3", "/Users/zenemp/Desktop/crypto");
        test.log("Encryption: Mac location changed");
    }
    
    clickButton(":Encryption Configuration.Save_QPushButton");
    test.log("Encryption defined");
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    
    snooze(5);
    
    startApplication("xtuple");
    
    snooze(5);
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Indented Bill of Materials-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Products_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Bills of Materials");
    activateItem(":xTuple ERP:*.Reports_QMenu", "Bills of Materials");
    waitForObjectItem(":xTuple ERP:*.Bills of Materials_QMenu", "Indented...");
    activateItem(":xTuple ERP:*.Bills of Materials_QMenu", "Indented...");
    
    waitForObject(":Indented Bill of Materials...._QPushButton");
    clickButton(":Indented Bill of Materials...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Indented Bill of Materials.Query_QPushButton_2");
    clickButton(":Indented Bill of Materials.Query_QPushButton_2");
    
    waitForObject(":Indented Bill of Materials._bomitem_XTreeWidget");
    if(!clickItem(":Indented Bill of Materials._bomitem_XTreeWidget", "TBODY1", 5, 5, 1, Qt.LeftButton))
        test.pass("TBODY1 - Item available");
    else test.fail("TBODY1 - Item not available");
    
    waitForObject(":Indented Bill of Materials._bomitem_XTreeWidget");
    if(!clickItem(":Indented Bill of Materials._bomitem_XTreeWidget", "YPAINT1", 5, 5, 1, Qt.LeftButton))
        test.pass("YPAINT1 - Item available");
    else test.fail("YPAINT1 - Item not available");
    
    waitForObject(":Indented Bill of Materials._bomitem_XTreeWidget");
    if(!clickItem(":Indented Bill of Materials._bomitem_XTreeWidget", "TWHEEL1", 5, 5, 1, Qt.LeftButton))
        test.pass("TWHEEL1 - Item available");
    else test.fail("TWHEEL1 - Item not available");
    
    waitForObject(":Indented Bill of Materials._bomitem_XTreeWidget");
    if(!clickItem(":Indented Bill of Materials._bomitem_XTreeWidget", "TKIT1", 5, 5, 1, Qt.LeftButton))
        test.pass("TKIT1 - Item available");
    else test.fail("TKIT1 - Item not available");
    
    waitForObject(":*.Close_QPushButton");
    clickButton(":*.Close_QPushButton");
    
    //-----Extracting Sales Order Number-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
    waitForObjectItem(":*.Configure Modules_QMenu", "Sales...");
    activateItem(":*.Configure Modules_QMenu", "Sales...");
    waitForObject(":Sales Configuration._nextSoNumber_XLineEdit");   
    
    sonumber = findObject(":Sales Configuration._nextSoNumber_XLineEdit").text;
    
    waitForObject(":Sales Configuration.Cancel_QPushButton");
    clickButton(":Sales Configuration.Cancel_QPushButton");
    
    //-----Creating a Sales Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":_headerPage...._QPushButton_2"); 
    clickButton(":_headerPage...._QPushButton_2"); 
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
    
    if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
        clickButton(":_headerPage.Print on Save_QCheckBox");
    waitForObject(":_headerPage._custPONumber_XLineEdit");
    type(":_headerPage._custPONumber_XLineEdit", "123");
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "YTRUCK1", 5, 5 , 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    
    soquantity = findObject(":_qtyOrdered_XLineEdit_2").text;
    
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "+7");  
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+8");
    waitForObject(":Sales Order.Save_QPushButton_3");
    clickButton(":Sales Order.Save_QPushButton_3");
    waitForObject(":Sales Order.Close_QPushButton_6");
    clickButton(":Sales Order.Close_QPushButton_6");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":Sales Order.Cancel_QPushButton_3");
    clickButton(":Sales Order.Cancel_QPushButton_3");
    
    waitForObject(":frame._so_XTreeWidget");
    if(!clickItem(":frame._so_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Order Created");
    else test.fail("Sales Order Failed");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //---find Application Edition------ 
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
    activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
    waitForObject(":Database Information.Save_QPushButton");
    clickButton(":Database Information.Save_QPushButton");
    
    if(appEdition == "Manufacturing")
    {    
        
        //-----Scheduling MRP by Planner Code-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        waitForObjectItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
        activateItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
        
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton");
        waitForObject(":_warehouse.Selected:_QRadioButton");
        clickButton(":_warehouse.Selected:_QRadioButton");
        waitForObject(":_warehouse._warehouses_WComboBox");
        clickItem(":_warehouse._warehouses_WComboBox", "WH1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Run MRP by Planner Code.XDateEdit_XDateEdit");
        type(":Run MRP by Planner Code.XDateEdit_XDateEdit", "+30");
        waitForObject(":Run MRP by Planner Code.Create_QPushButton");
        clickButton(":Run MRP by Planner Code.Create_QPushButton");
        test.log("Created Planned Material Requirements Planning Orders");
        
        //-----MRP Results-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders");
        activateItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders");
        waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
        activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
        
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_2");
        waitForObject(":_warehouse.Selected:_QRadioButton_2");
        clickButton(":_warehouse.Selected:_QRadioButton_2");
        waitForObject(":_warehouse._warehouses_WComboBox_2");
        clickItem(":_warehouse._warehouses_WComboBox_2", "WH1", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
        clickButton(":Planned Orders by Planner Code.Query_QPushButton");
        waitForObject(":_plannerCode.Selected:_QRadioButton");
        type(":_plannerCode.Selected:_QRadioButton", "<Down>");
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
        type(":_plannerCode.All Planner Codes_QRadioButton_2", " ");
        sendEvent("QContextMenuEvent", ":frame._planord_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
        
        waitForObject(":frame._planord_XTreeWidget");
        if(!clickItem(":frame._planord_XTreeWidget", "TKIT1", 5, 5, 1, Qt.LeftButton))
            test.pass("Planned Order for TKIT1 created ");
        else test.fail("Planned Order for TKIT1 not created");
        
        waitForObject(":frame._planord_XTreeWidget");
        var sWidgetTreeControl = ":frame._planord_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var qtkit1 = obj_TreeTopLevelItem.text(8);
        
        waitForObject(":_plannerCode.Selected:_QRadioButton");
        type(":_plannerCode.Selected:_QRadioButton", "<Down>");
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
        type(":_plannerCode.All Planner Codes_QRadioButton_2", " ");
        sendEvent("QContextMenuEvent", ":frame._planord_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
        
        waitForObject(":frame._planord_XTreeWidget");
        if(!clickItem(":frame._planord_XTreeWidget", "TBOX1", 5, 5, 1, Qt.LeftButton))
            test.pass("Planned Order for TBOX1 created ");
        else test.fail("Planned Order for TBOX1 not created");
        
        waitForObject(":frame._planord_XTreeWidget");
        var sWidgetTreeControl = ":frame._planord_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var qtbox1 = obj_TreeTopLevelItem.text(8);
        
        waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
        clickButton(":Planned Orders by Planner Code.Close_QPushButton");
        
        //-----Release Planned P/Os to Purchasing-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Release Planned Orders...");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "Release Planned Orders...");
        
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_4");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_4");
        waitForObject(":_warehouse.Selected:_QRadioButton_3");
        clickButton(":_warehouse.Selected:_QRadioButton_3");
        waitForObject(":_warehouse._warehouses_WComboBox_4");
        clickItem(":_warehouse._warehouses_WComboBox_4", "WH1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Release Planned Orders by Planner Code.XDateEdit_XDateEdit");
        type(":Release Planned Orders by Planner Code.XDateEdit_XDateEdit", "+30");
        waitForObject(":Release Planned Orders by Planner Code.Release_QPushButton");
        clickButton(":Release Planned Orders by Planner Code.Release_QPushButton");	
        test.log("Released Planned P/Os to Purchasing");
        
        //-----Converting P/Rs to P/Os-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
        waitForObjectItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code...");
        activateItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code..."); 
        
        waitForObject(":_warehouse._warehouses_WComboBox_3");
        clickItem(":_warehouse._warehouses_WComboBox_3", "WH1", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_3");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_3");   
        waitForObject(":Purchase Requests by Planner Code.Query_QPushButton");
        clickButton(":Purchase Requests by Planner Code.Query_QPushButton");
        
        while(findObject(":Purchase Requests by Planner Code._pr_XTreeWidget").topLevelItemCount >= 1)
        {
            waitForObject(":Purchase Requests by Planner Code._pr_XTreeWidget");
            openItemContextMenu(":Purchase Requests by Planner Code._pr_XTreeWidget", "O", 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
            waitForObjectItem(":_frame._itemsrc_XTreeWidget", "1");
            doubleClickItem(":_frame._itemsrc_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);  
            waitForObject(":Purchase Order Item.Save_QPushButton");
            clickButton(":Purchase Order Item.Save_QPushButton");
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            
            ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
            
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage._poitem_XTreeWidget");
            clickItem(":_lineItemsPage._poitem_XTreeWidget", "1", 5, 5, 1, Qt.LeftButton);
            waitForObject(":Purchase Order.Save_QPushButton");
            clickButton(":Purchase Order.Save_QPushButton");
            
            waitForObject(":Purchase Order.Close_QPushButton");
            clickButton(":Purchase Order.Close_QPushButton");
            
            waitForObject(":Purchase Requests by Planner Code.Query_QPushButton");
            clickButton(":Purchase Requests by Planner Code.Query_QPushButton");  
        }
        
        waitForObject(":Purchase Requests by Planner Code.Close_QPushButton");
        clickButton(":Purchase Requests by Planner Code.Close_QPushButton");   
        test.log("Converted P/Rs to P/Os");
        
        
        //-----Posting Purchase Orders-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
        
        waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
        if(!clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 1, Qt.LeftButton))
            test.pass(" Purchase Order Created ");
        
        doubleClickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._poitem_XTreeWidget");
        doubleClickItem(":_lineItemsPage._poitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Purchase Order Item.Save_QPushButton");    
        
        polineitem = findObject(":_typeGroup._itemNumber_ItemLineEdit").text;
        poquantity = findObject(":_ordered_XLineEdit").text;
        
        clickButton(":Purchase Order Item.Save_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        
        clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
        waitForObject(":List Unposted Purchase Orders.Post P/O_QPushButton");
        clickButton(":List Unposted Purchase Orders.Post P/O_QPushButton");
        waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
        clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
        
        waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
        clickButton(":List Unposted Purchase Orders.Close_QPushButton");
        test.log("Purchase Orders Posted successfully");
        
        //-----Verification of QOH by Item (Receiving Purchase Goods)-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        
        waitForObject(":Quantities on Hand by Item...._QPushButton");
        clickButton(":Quantities on Hand by Item...._QPushButton");
        waitForObject(":_item_XTreeWidget_6");
        doubleClickItem(":_item_XTreeWidget_6", polineitem, 5, 5, 0, Qt.LeftButton);
        waitForObject(":_warehouse._warehouses_WComboBox_6");
        clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Quantities on Hand by Item.Query_QPushButton");
        clickButton(":Quantities on Hand by Item.Query_QPushButton");
        
        waitForObject(":_qoh_XTreeWidget");
        var sWidgetTreeControl = ":_qoh_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
        
        waitForObject(":Quantities on Hand by Item.Close_QPushButton");
        clickButton(":Quantities on Hand by Item.Close_QPushButton");
        
        //-----Receiving Purchase Goods-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        waitForObject(":Enter Order Receipts...._QPushButton");
        clickButton(":Enter Order Receipts...._QPushButton");
        waitForObject(":_listTab_XTreeWidget_3");
        doubleClickItem(":_listTab_XTreeWidget_3",ponumber, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Enter Order Receipts.Receive All_QPushButton");
        clickButton(":Enter Order Receipts.Receive All_QPushButton");
        waitForObject(":Enter Order Receipts.Post_QPushButton");
        clickButton(":Enter Order Receipts.Post_QPushButton");
        
        waitForObject(":Enter Order Receipts.Close_QPushButton");
        clickButton(":Enter Order Receipts.Close_QPushButton");
        
        //-----Verification of updated QOH by Item (Receiving Purchase Goods)-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        
        waitForObject(":Quantities on Hand by Item...._QPushButton");
        clickButton(":Quantities on Hand by Item...._QPushButton");
        waitForObject(":_item_XTreeWidget_6");
        doubleClickItem(":_item_XTreeWidget_6", polineitem, 5, 5, 0, Qt.LeftButton);
        waitForObject(":_warehouse._warehouses_WComboBox_6");
        clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Quantities on Hand by Item.Query_QPushButton");
        clickButton(":Quantities on Hand by Item.Query_QPushButton");
        
        waitForObject(":_qoh_XTreeWidget");
        var sWidgetTreeControl = ":_qoh_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
        
        if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) + parseInt(poquantity.toString()))
            test.pass("QOH updated correctly for Receiving Purchase goods");
        else test.fail("QOH updated incorrectly for Receiving Purchase goods");
        
        waitForObject(":Quantities on Hand by Item.Close_QPushButton");
        clickButton(":Quantities on Hand by Item.Close_QPushButton");
        
        //-----Entering a Voucher-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        
        waitForObject(":_voucherGroup...._QPushButton");
        clickButton(":_voucherGroup...._QPushButton");
        waitForObject(":_pohead_XTreeWidget");
        doubleClickItem(":_pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
        
        vounumber = findObject(":_voucherNumber_XLineEdit").text; 
        
        waitForObject(":_poitems._poitem_XTreeWidget");
        doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Univoiced Recepts and Returns._uninvoiced_XTreeWidget");
        doubleClickItem(":Univoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_distTab.New_QPushButton");
        clickButton(":_distTab.New_QPushButton");
        waitForObject(":Voucher._currency_XLineEdit");
        type(":Voucher._currency_XLineEdit", "25");
        waitForObject(":Voucher.Save_QPushButton");
        clickButton(":Voucher.Save_QPushButton");
        waitForObject(":Voucher.Save_QPushButton_2");
        clickButton(":Voucher.Save_QPushButton_2");
        waitForObject(":_amount_XLineEdit");
        type(":_amount_XLineEdit", findObject(":_amount_XLineEdit_3").text);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        type(":_dateGroup.XDateEdit_XDateEdit", "+0");
        waitForObject(":_invoiceNum_XLineEdit");
        type(":_invoiceNum_XLineEdit", "VO for 20065 ");
        waitForObject(":Voucher.Save_QPushButton_3");
        clickButton(":Voucher.Save_QPushButton_3");
        
        waitForObject(":Voucher.Cancel_QPushButton");
        clickButton(":Voucher.Cancel_QPushButton");
        test.log("Voucher created successfully");
        
        snooze(2);
        
    }
    
    //---find Application Edition------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
    activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
    waitForObject(":Database Information.Save_QPushButton");
    clickButton(":Database Information.Save_QPushButton");
    
    if(appEdition=="xTupleERP")
    {
        
        //-----Creating a Purchase Order-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
        
        waitForObject(":List Unposted Purchase Orders.New_QPushButton");
        clickButton(":List Unposted Purchase Orders.New_QPushButton");
        waitForObject(":_headerPage...._QPushButton_3");
        clickButton(":_headerPage...._QPushButton_3");
        waitForObject(":_listTab_XTreeWidget_4");
        doubleClickItem(":_listTab_XTreeWidget_4", "TPARTS", 5, 5, 0, Qt.LeftButton); 
        
        var purchaseorder = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_3");
        clickButton(":_lineItemsPage.New_QPushButton_3");
        waitForObject(":_typeGroup...._QPushButton");
        clickButton(":_typeGroup...._QPushButton");
        waitForObject(":_item_XTreeWidget_3");
        doubleClickItem(":_item_XTreeWidget_3", "TBOX1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        
        var polineitem = findObject(":_typeGroup._itemNumber_ItemLineEdit").text;
        var poquantity = findObject(":_ordered_XLineEdit").text;
        
        waitForObject(":Purchase Order Item.Save_QPushButton");
        clickButton(":Purchase Order Item.Save_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        
        if(!clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", purchaseorder, 5, 5, 0, Qt.LeftButton))
            test.pass("Purhcase order created successfully");
        else test.fail("Purchase order couldn't be created");
        
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
        
        waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
        clickButton(":List Unposted Purchase Orders.Close_QPushButton");
        
        //-----Posting Purchase Orders-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
        
        waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget"); 
        clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", purchaseorder, 5, 5, 0, Qt.LeftButton);
        waitForObject(":List Unposted Purchase Orders.Post P/O_QPushButton");
        clickButton(":List Unposted Purchase Orders.Post P/O_QPushButton");
        waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
        clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
        
        waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
        clickButton(":List Unposted Purchase Orders.Close_QPushButton");
        test.log("Purchase Orders Posted successfully");
        
        //-----Verification of QOH by Item (Receiving Purchase Goods)-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        
        waitForObject(":Quantities on Hand by Item...._QPushButton");
        clickButton(":Quantities on Hand by Item...._QPushButton");
        waitForObject(":_item_XTreeWidget_6");
        doubleClickItem(":_item_XTreeWidget_6", polineitem, 5, 5, 0, Qt.LeftButton);
        waitForObject(":_warehouse.All Sites_QRadioButton_7");
        clickButton(":_warehouse.All Sites_QRadioButton_7");
        waitForObject(":Quantities on Hand by Item.Query_QPushButton");
        clickButton(":Quantities on Hand by Item.Query_QPushButton");
        
        waitForObject(":_qoh_XTreeWidget");
        var sWidgetTreeControl = ":_qoh_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
        
        waitForObject(":Quantities on Hand by Item.Close_QPushButton");
        clickButton(":Quantities on Hand by Item.Close_QPushButton");
        
        //-----Receiving Purchase Goods-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        waitForObject(":Enter Order Receipts...._QPushButton");
        clickButton(":Enter Order Receipts...._QPushButton");
        waitForObject(":_listTab_XTreeWidget_3");
        doubleClickItem(":_listTab_XTreeWidget_3",purchaseorder, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Enter Order Receipts.Receive All_QPushButton");
        clickButton(":Enter Order Receipts.Receive All_QPushButton");
        
        waitForObject(":Enter Order Receipts.Post_QPushButton");
        clickButton(":Enter Order Receipts.Post_QPushButton");
        waitForObject(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget");
        doubleClick(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Distribute to Location.Distribute_QPushButton");
        clickButton(":Distribute to Location.Distribute_QPushButton");
        waitForObject(":Distribute Stock To/From Site Locations.Post_QPushButton");
        clickButton(":Distribute Stock To/From Site Locations.Post_QPushButton");
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
        
        //-----Verification of updated QOH by Item (Receiving Purchase Goods)-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        
        waitForObject(":Quantities on Hand by Item...._QPushButton");
        clickButton(":Quantities on Hand by Item...._QPushButton");
        waitForObject(":_item_XTreeWidget_6");
        doubleClickItem(":_item_XTreeWidget_6", polineitem, 5, 5, 0, Qt.LeftButton);
        waitForObject(":_warehouse.All Sites_QRadioButton_7");
        clickButton(":_warehouse.All Sites_QRadioButton_7");
        waitForObject(":Quantities on Hand by Item.Query_QPushButton");
        clickButton(":Quantities on Hand by Item.Query_QPushButton");
        
        waitForObject(":_qoh_XTreeWidget");
        var sWidgetTreeControl = ":_qoh_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
        
        if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) + parseInt(poquantity.toString()))
            test.pass("QOH updated correctly for Receiving Purchase goods");
        else test.fail("QOH updated incorrectly for Receiving Purchase goods");
        
        waitForObject(":Quantities on Hand by Item.Close_QPushButton");
        clickButton(":Quantities on Hand by Item.Close_QPushButton");
        
        //-----Entering a Voucher-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        
        waitForObject(":_voucherGroup...._QPushButton");
        clickButton(":_voucherGroup...._QPushButton");
        waitForObject(":_pohead_XTreeWidget");
        doubleClickItem(":_pohead_XTreeWidget", purchaseorder, 5, 5, 0, Qt.LeftButton);
        
        vounumber = findObject(":_voucherNumber_XLineEdit").text; 
        
        waitForObject(":_poitems._poitem_XTreeWidget");
        doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
        waitForObject(":frame_2._uninvoiced_XTreeWidget");
        doubleClickItem(":frame_2._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
        waitForObject(":frame.New_QPushButton");
        clickButton(":frame.New_QPushButton"); 
        waitForObject(":Voucher_XLineEdit");
        type(":Voucher_XLineEdit", "25");
        waitForObject(":Voucher.Save_QPushButton");
        clickButton(":Voucher.Save_QPushButton");
        waitForObject(":Voucher.Save_QPushButton_2");
        clickButton(":Voucher.Save_QPushButton_2");
        waitForObject(":_amount_XLineEdit");
        type(":_amount_XLineEdit", findObject(":_amount_XLineEdit_3").text);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        type(":_dateGroup.XDateEdit_XDateEdit", "+0");
        waitForObject(":_invoiceNum_XLineEdit");
        type(":_invoiceNum_XLineEdit", "VO for 20065 ");
        waitForObject(":Voucher.Save_QPushButton_3");
        clickButton(":Voucher.Save_QPushButton_3");
        
        waitForObject(":Voucher.Cancel_QPushButton");
        clickButton(":Voucher.Cancel_QPushButton");
        test.log("Voucher created successfully");
        
        snooze(2);
        
    }
    
    //-----Posting Vouchers-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    if(!clickItem(":List Open Vouchers._vohead_XTreeWidget", vounumber, 5, 5, 1, Qt.LeftButton))
        test.pass(" Voucher created ");
    else test.fail(" Voucher not created");
    
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
    clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");
    test.log("Posted Voucher successfully");
    
    //---Selecting Voucher for Payment---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Select...");
    
    waitForObject(":Select Payments._select_XComboBox");
    clickItem(":Select Payments._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments._selectDate_XComboBox");
    clickItem(":Select Payments._selectDate_XComboBox", "All", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame._apopen_XTreeWidget");
    clickItem(":frame._apopen_XTreeWidget", vounumber, 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Select..._QPushButton");
    clickButton(":frame.Select..._QPushButton");
    waitForObject(":_bankaccnt_XComboBox");
    clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments.Save_QPushButton");
    clickButton(":Select Payments.Save_QPushButton");
    
    waitForObject(":Select Payments.Close_QPushButton");
    clickButton(":Select Payments.Close_QPushButton");
    test.log("Selected Voucher for Payment");
    
    //-----Prepare Check run-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
    
    waitForObjectItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account");
    clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Prepare Check Run.Prepare_QPushButton");
    clickButton(":Prepare Check Run.Prepare_QPushButton");
    test.log("Check run prepared successfully");
    
    snooze(2);
    
    //-----Extracting OS Name-----
    var linuxPath, winPath;
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
    activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    
    if(object.exists(":OK_QPushButton"))
        clickButton(":OK_QPushButton");
    
    waitForObject(":Encryption Configuration_FileLineEdit_2");
    linuxPath = findObject(":Encryption Configuration_FileLineEdit_2").text;
    waitForObject(":Encryption Configuration_FileLineEdit");
    winPath = findObject(":Encryption Configuration_FileLineEdit").text;
    
    waitForObject(":Encryption Configuration.Cancel_QPushButton");
    clickButton(":Encryption Configuration.Cancel_QPushButton");
    
    //-----View Check run-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
    
    waitForObject(":_frame._check_XTreeWidget");
    clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_frame.Print_QPushButton");
    sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 5, 5, Qt.LeftButton, 0);     
    waitForObjectItem(":_QMenu",  "Check Run...");
    activateItem(":_QMenu", "Check Run...");
    waitForObject(":View Check Run.Create ACH File_QPushButton");
    clickButton(":View Check Run.Create ACH File_QPushButton");
    if(object.exists(":View Check Run.Yes_QPushButton_2"))    
        clickButton(":View Check Run.Yes_QPushButton_2");
    waitForObject(":fileNameEdit_QLineEdit");
    
    if(OS.name=="Linux")
        findObject(":fileNameEdit_QLineEdit").text = linuxPath.toString()+"/achFile.ach";
    else if(OS.name == "Windows" )
        findObject(":fileNameEdit_QLineEdit").text = winPath.toString()+"/achFile.ach";
    
    waitForObject(":View Check Run.Save_QPushButton");
    clickButton(":View Check Run.Save_QPushButton");
    
    snooze(3);
    
    if(object.exists(":View Check Run.Yes_QPushButton_2"))    
        clickButton(":View Check Run.Yes_QPushButton_2");
    
    waitForObject(":View Check Run.Yes_QPushButton");
    clickButton(":View Check Run.Yes_QPushButton");
    
    waitForObject(":View Check Run.Cancel_QPushButton");
    clickButton(":View Check Run.Cancel_QPushButton");
    
    snooze(2);
    
    //-----Post Check run-----
    waitForObject(":_frame._check_XTreeWidget");
    clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_frame.Post_QPushButton");
    clickButton(":_frame.Post_QPushButton");
    waitForObject(":View Check Run.Post_QPushButton");
    clickButton(":View Check Run.Post_QPushButton");
    
    waitForObject(":View Check Run.Close_QPushButton");
    clickButton(":View Check Run.Close_QPushButton");
    test.log("Posted Check for Voucher: 30070");
    
    //-----Releasing WorkOrders-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_5");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_5");
    waitForObject(":_warehouse._warehouses_WComboBox_5");
    clickItem(":_warehouse._warehouses_WComboBox_5", "WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
    type(":_dateGroup.XDateEdit_XDateEdit_4", "+30");
    
    waitForObject(":Release Work Orders by Planner Code.Release_QPushButton");
    clickButton(":Release Work Orders by Planner Code.Release_QPushButton");
    test.log("Work Orders released successfully");
      
    //-----Issuing Work Order Materials-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Issue Material");
    activateItem(":xTuple ERP:*.Transactions_QMenu", "Issue Material");
    waitForObjectItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
    activateItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
    
    waitForObject(":Issue Work Order Material Batch...._QPushButton");
    clickButton(":Issue Work Order Material Batch...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "TKIT1", 5, 5, 0, Qt.LeftButton); 
    
    waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
    clickButton(":Issue Work Order Material Batch.Post_QPushButton");
    test.log("Work order materials issued successfully");
   
    //-----Verification of QOH by Item (Post Production)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TKIT1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse.All Sites_QRadioButton_7");
    clickButton(":_warehouse.All Sites_QRadioButton_7");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Post Production and Close Work order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    activateItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    
    waitForObject(":Post Production...._QPushButton");
    clickButton(":Post Production...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "I", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qty_XLineEdit");
    
    woquantity = findObject(":_qtyGroup.100.00_XLabel").text;
    
    type(":_qty_XLineEdit",woquantity);
    waitForObject(":_optionsGroup.Close W/O after Posting_XCheckBox");
    clickButton(":_optionsGroup.Close W/O after Posting_XCheckBox");
    waitForObject(":Post Production.Post_QPushButton");
    clickButton(":Post Production.Post_QPushButton");
    waitForObject(":Close Work Order.Post Comment_XCheckBox");
    clickButton(":Close Work Order.Post Comment_XCheckBox");
    
    waitForObject(":Close Work Order.Close W/O_QPushButton");
    clickButton(":Close Work Order.Close W/O_QPushButton");
    waitForObject(":Close Work Order.Close Work Order_QPushButton");
    clickButton(":Close Work Order.Close Work Order_QPushButton");
    waitForObject(":Post Production.Close_QPushButton");
    clickButton(":Post Production.Close_QPushButton");
    test.log("Work orders post production successful");
    
    //-----Verification of updated QOH by Item (Post Production)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TKIT1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse.All Sites_QRadioButton_7");
    clickButton(":_warehouse.All Sites_QRadioButton_7");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) + parseInt(woquantity.toString()))
        test.pass(" QOH updated correctly for Post Production of a WorkOrder");
    else test.fail(" QOH updated incorrectly for Post Production of a WorkOrder");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Verification of QOH by Item (BackFlush Items)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse.All Sites_QRadioButton_7");
    clickButton(":_warehouse.All Sites_QRadioButton_7");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----BackFlush Items and Close Work Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    activateItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    
    waitForObject(":Post Production...._QPushButton");
    clickButton(":Post Production...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qty_XLineEdit");
    
    var qbackflush = findObject(":_qtyGroup.100.00_XLabel").text
                     
    type(":_qty_XLineEdit", qbackflush);
    waitForObject(":_optionsGroup.Close W/O after Posting_XCheckBox");
    clickButton(":_optionsGroup.Close W/O after Posting_XCheckBox");
    waitForObject(":Post Production.Post_QPushButton");
    clickButton(":Post Production.Post_QPushButton");
    waitForObject(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget");
    doubleClickItem(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget", "No", 0, 0, 0, Qt.LeftButton);
    
    waitForObject(":Distribute to Location.Distribute_QPushButton");
    clickButton(":Distribute to Location.Distribute_QPushButton");
    waitForObject(":Distribute Stock To/From Site Locations.Post_QPushButton");
    clickButton(":Distribute Stock To/From Site Locations.Post_QPushButton");
    waitForObject(":Close Work Order.Close W/O_QPushButton");
    clickButton(":Close Work Order.Close W/O_QPushButton");
    
    waitForObject(":Close Work Order.Close Work Order_QPushButton");
    clickButton(":Close Work Order.Close Work Order_QPushButton");
    waitForObject(":Post Production.Close_QPushButton");
    clickButton(":Post Production.Close_QPushButton"); 
    test.log("Back flush of Work order materials successful");
    
    //-----Verification of updated QOH by Item (BackFlush Items)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse.All Sites_QRadioButton_7");
    clickButton(":_warehouse.All Sites_QRadioButton_7");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString())+parseInt(qbackflush.toString()))
        test.pass(" QOH updated correctly for Backflush items");
    else test.fail("QOH updated incorrectly for Backflush items");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Verification of QOH by Item (Issue Stock to Shipping)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse.All Sites_QRadioButton_7");
    clickButton(":_warehouse.All Sites_QRadioButton_7");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Issue Stock to Shipping-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_5");
    doubleClickItem(":_listTab_XTreeWidget_5", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Select for Billing_QCheckBox").checked)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    waitForObject(":groupBox.Print Packing List_XCheckBox");
    if(findObject(":groupBox.Print Packing List_XCheckBox").checked)
        clickButton(":groupBox.Print Packing List_XCheckBox");
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    test.log("Sales order Stock issued");
    
    //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse.All Sites_QRadioButton_7");
    clickButton(":_warehouse.All Sites_QRadioButton_7");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) - parseInt(soquantity.toString()))
        test.pass(" QOH updated correctly for Issue Stock to Shipping"); 
    else test.fail("QOH updated incorrectly for Issue Stock to Shipping");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Select Order for Billing-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Select Order for Billing...");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "Select Order for Billing...");
    
    waitForObject(":Select Order for Billing...._QPushButton");
    clickButton(":Select Order for Billing...._QPushButton");
    waitForObject(":Select Order for Billing._so_XTreeWidget");
    doubleClickItem(":Select Order for Billing._so_XTreeWidget", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_lineitemsTab._soitem_XTreeWidget");
    doubleClickItem(":_lineitemsTab._soitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Select Order for Billing.Save_QPushButton");
    clickButton(":Select Order for Billing.Save_QPushButton");
    waitForObject(":Select Order for Billing.Save_QPushButton_2");
    clickButton(":Select Order for Billing.Save_QPushButton_2");
    
    waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");
    
    test.log("Sales order Selected for Billing");  
    
    //-----Creating Invoices-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");  
    type(":xTuple ERP:*.Billing_QMenu","<Right>");
    type(":xTuple ERP:*.Billing_QMenu","<Right>");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Billing Selections...");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "Billing Selections...");
    
    waitForObject(":Billing Selections._cobill_XTreeWidget");
    clickItem(":Billing Selections._cobill_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton);
    waitForObject(":Billing Selections.Create Invoice_QPushButton");
    clickButton(":Billing Selections.Create Invoice_QPushButton");
    waitForObject(":*.Close_QPushButton");
    clickButton(":*.Close_QPushButton");
    
    test.log("Invoice created successful");
    
    //-----Posting Invoices-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    type(":xTuple ERP:*.Billing_QMenu","<Right>");
    type(":xTuple ERP:*.Billing_QMenu","<Right>");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices...");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices...");
    
    waitForObject(":_invchead_XTreeWidget");
    doubleClickItem(":_invchead_XTreeWidget", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.Close_QPushButton");
    
    invoice = findObject(":_invoiceNumber_XLineEdit").text;
    
    clickButton(":Invoice.Close_QPushButton");
    waitForObject(":List Unposted Invoices.Post_QPushButton");
    clickButton(":List Unposted Invoices.Post_QPushButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");
    
    waitForObject(":List Unposted Invoices.Query_QPushButton");
    clickButton(":List Unposted Invoices.Query_QPushButton");
    
    waitForObject(":*.Close_QPushButton");
    clickButton(":*.Close_QPushButton");
    test.log("Invoice posted successful");
    
    //-----Entering Cash Receipts-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Workbench...");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Workbench...");
    
    waitForObject(":Receivables Workbench._select_XComboBox");
    clickItem(":Receivables Workbench._select_XComboBox", "All Customers", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Receivables Workbench.Query_QPushButton");
    clickButton(":Receivables Workbench.Query_QPushButton");
    
    waitForObject(":_aropenFrame._aropen_XTreeWidget");
    if(!clickItem(":_aropenFrame._aropen_XTreeWidget", invoice, 5, 5, 1, Qt.LeftButton))
        test.pass("Invoice available under Receivables in AR Workbench");
    else test.fail("Invoice not found under Receivables in AR Workbench");
    
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Cash Receipts");
    waitForObject(":_cashRecptTab.New_QPushButton");
    clickButton(":_cashRecptTab.New_QPushButton");
    waitForObject(":Cash Receipt...._QPushButton");
    clickButton(":Cash Receipt...._QPushButton");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_applicationsTab._aropen_XTreeWidget");
    doubleClickItem(":_applicationsTab._aropen_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton);
    waitForObject(":Cash Receipt_XLineEdit");
    
    amount = findObject(":Cash Receipt_XLineEdit_2").text;
    
    type(":Cash Receipt_XLineEdit", amount);
    waitForObject(":Cash Receipt.Save_QPushButton");
    clickButton(":Cash Receipt.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit");
    type(":_amountGroup_XLineEdit", amount);
    waitForObject(":Cash Receipt.Save_QPushButton_2");
    clickButton(":Cash Receipt.Save_QPushButton_2");
    test.log("Cash receipt created for the Invoice");
    
    //-----Posting Cash Receipts-----
    waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
    clickItem(":_cashRecptTab._cashrcpt_XTreeWidget" ,"TTOYS", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_cashRecptTab.Post_QPushButton");
    clickButton(":_cashRecptTab.Post_QPushButton");
    
    waitForObject(":Receivables Workbench.Close_QPushButton");
    clickButton(":Receivables Workbench.Close_QPushButton");
    test.log("Cash receipt posted successful");
    
    //-----Customer History-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Reports");
    waitForObjectItem(":*.Reports_QMenu", "Customer History...");
    activateItem(":*.Reports_QMenu", "Customer History...");
    
    waitForObject(":Customer History...._QPushButton");
    clickButton(":Customer History...._QPushButton");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Customer History.XDateEdit_XDateEdit");
    type(":Customer History.XDateEdit_XDateEdit", "0");
    waitForObject(":Customer History.XDateEdit_XDateEdit");
    type(":Customer History.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":Customer History.XDateEdit_XDateEdit_2");
    type(":Customer History.XDateEdit_XDateEdit_2", "0");
    waitForObject(":Customer History.Query_QPushButton");
    clickButton(":Customer History.Query_QPushButton");
    waitForObject(":Customer History._custhist_XTreeWidget");
    if(!clickItem(":Customer History._custhist_XTreeWidget", invoice, 5, 5, 1, Qt.LeftButton))
        test.pass(" Invoice posted and available in Customer History");
    
    waitForObject(":*.Close_QPushButton");
    clickButton(":*.Close_QPushButton");
    
         
}
