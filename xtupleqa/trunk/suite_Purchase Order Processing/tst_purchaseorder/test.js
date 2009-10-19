function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Variable Declaration-----
    var ponumber, vounumber, polineitem, poquantity;
    
    //---find Application Edition------ 
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
    activateItem(":xTuple ERP: *_QMenuBar_3", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.*_QLabel_2");
    var appEdition = findObject(":Database Information.*_QLabel_2").text;
    waitForObject(":Database Information.Save_QPushButton_2");
    clickButton(":Database Information.Save_QPushButton_2");
    
    //-----Setting Encryption Key----- 
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
    activateItem(":xTuple ERP: *_QMenuBar_3", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    
    snooze(1);
    if(object.exists(":OK_QPushButton"))
        test.fatal("Please Define the Encryption path"); 
    
    waitForObject(":Encryption Configuration.Save_QPushButton");
    clickButton(":Encryption Configuration.Save_QPushButton");
    
    //-----Creating a Purchase Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
    waitForObjectItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    
    waitForObject(":List Unposted Purchase Orders.New_QPushButton");
    clickButton(":List Unposted Purchase Orders.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton");
    clickButton(":_headerPage...._QPushButton");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TPARTS", 5, 5, 0, Qt.LeftButton);
    
    ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
    
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":groupBox_2...._QPushButton");
    clickButton(":groupBox_2...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "TBOX1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    
    polineitem = findObject(":groupBox_2._itemNumber_ItemLineEdit").text;         
    poquantity = findObject(":_ordered_XLineEdit").text;       
    
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton_2");
    clickButton(":Purchase Order.Save_QPushButton_2");
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    
    if(!clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton))
        test.pass("Purhcase order created successfully");
    else test.fail("Purchase order couldn't be created");
    
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
    
    if(appEdition =="Manufacturing")
    {
        
        //-----Creating a MLC item-----        
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
        
        waitForObject(":_itemSite_XTreeWidget");
        doubleClickItem(":_itemSite_XTreeWidget", "YPAINT2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_locationGroup.Multiple Location Control_QCheckBox");
        if(!findObject(":_locationGroup.Multiple Location Control_QCheckBox").checked)
            clickButton(":_locationGroup.Multiple Location Control_QCheckBox");
        
        waitForObject(":_locationGroup.Use Default Location_QGroupBox");
        if(!findObject(":_locationGroup.Use Default Location_QGroupBox").checked)
            type(":_locationGroup.Use Default Location_QGroupBox", " ");    
        
        waitForObjectItem(":Use Default Location._locations_XComboBox", "01010101");
        clickItem(":Use Default Location._locations_XComboBox", "01010101", 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        
        waitForObject(":_reorderLevel_XLineEdit");
        type(":_reorderLevel_XLineEdit", "100");
        waitForObject(":List Item Sites.Save_QPushButton");
        clickButton(":List Item Sites.Save_QPushButton");
        waitForObject(":List Item Sites.Close_QPushButton");
        clickButton(":List Item Sites.Close_QPushButton");
        test.log("MLC Item created");
        
        //----- Creating a Purchase Order for Lot Controlled Item Type-----
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
        waitForObjectItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
        
        waitForObject(":List Unposted Purchase Orders.New_QPushButton");
        clickButton(":List Unposted Purchase Orders.New_QPushButton");
        waitForObject(":_headerPage...._QPushButton");
        clickButton(":_headerPage...._QPushButton");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget", "TPARTS", 5, 5, 0, Qt.LeftButton);
        
        var lotpo = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":groupBox_2...._QPushButton");
        clickButton(":groupBox_2...._QPushButton");
        waitForObject(":_item_XTreeWidget");
        doubleClickItem(":_item_XTreeWidget", "YPAINT1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "10");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        
        var lotlineitem = findObject(":groupBox_2._itemNumber_ItemLineEdit").text;         
        var lotqty = findObject(":_ordered_XLineEdit").text;       
        
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton_2");
        clickButton(":Purchase Order.Save_QPushButton_2");
        waitForObject(":Purchase Order.Close_QPushButton");
        clickButton(":Purchase Order.Close_QPushButton");
        
        if(!clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", lotpo, 5, 5, 0, Qt.LeftButton))
            test.pass("Purhcase order created successfully for a lot controlled item");
        else test.fail("Purchase order couldn't be created for a lot controlled item");
        
        //----- Creating a Purchase Order for Serial Controlled Item Type-----
        waitForObject(":List Unposted Purchase Orders.New_QPushButton");
        clickButton(":List Unposted Purchase Orders.New_QPushButton");
        waitForObject(":_headerPage...._QPushButton");
        clickButton(":_headerPage...._QPushButton");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget", "TPARTS", 5, 5, 0, Qt.LeftButton);
        
        var serialpo = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":groupBox_2...._QPushButton");
        clickButton(":groupBox_2...._QPushButton");
        waitForObject(":_item_XTreeWidget");
        
        if(findObject(":groupBox_2.Buy Items Only_QCheckBox").checked)
            clickButton(":groupBox_2.Buy Items Only_QCheckBox");
        waitForObject(":_item_XTreeWidget");
        doubleClickItem(":_item_XTreeWidget", "STRUCK1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "3");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        
        var seriallineitem = findObject(":groupBox_2._itemNumber_ItemLineEdit").text;         
        var serialqty = findObject(":_ordered_XLineEdit").text;       
        
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton_2");
        clickButton(":Purchase Order.Save_QPushButton_2");
        waitForObject(":Purchase Order.Close_QPushButton");
        clickButton(":Purchase Order.Close_QPushButton");
        
        if(!clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", serialpo, 5, 5, 0, Qt.LeftButton))
            test.pass("Purhcase order created successfully for a serial controlled item");
        else test.fail("Purchase order couldn't be created for a serial controlled item");
        
        //----- Creating a Purchase Order for Lot Controlled Item Type-----
        waitForObject(":List Unposted Purchase Orders.New_QPushButton");
        clickButton(":List Unposted Purchase Orders.New_QPushButton");
        waitForObject(":_headerPage...._QPushButton");
        clickButton(":_headerPage...._QPushButton");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget", "TPARTS", 5, 5, 0, Qt.LeftButton);
        
        var mlcpo = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":groupBox_2...._QPushButton");
        clickButton(":groupBox_2...._QPushButton");
        waitForObject(":_item_XTreeWidget");      
        doubleClickItem(":_item_XTreeWidget", "YPAINT2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "10");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        
        var mlclineitem = findObject(":groupBox_2._itemNumber_ItemLineEdit").text;         
        var mlcqty = findObject(":_ordered_XLineEdit").text;   
        
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton_2");
        clickButton(":Purchase Order.Save_QPushButton_2");
        waitForObject(":Purchase Order.Close_QPushButton");
        clickButton(":Purchase Order.Close_QPushButton");
        
        if(!clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", mlcpo, 5, 5, 0, Qt.LeftButton))
            test.pass("Purhcase order created successfully for a MLC item");
        else test.fail("Purchase order couldn't be created for a MLC item");
        
    }
    
    //-----Posting Purchase Orders-----
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget"); 
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Post_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget"); 
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", lotpo, 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Post_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget"); 
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", serialpo, 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Post_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget"); 
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", mlcpo, 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Post_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
    test.log("Purchase Orders Posted successfully");
    
    //-----Verification of QOH by Item (Receiving Purchase Goods)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand");
    activateItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", polineitem, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem1 = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", lotlineitem, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem3 = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", seriallineitem, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem5 = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", mlclineitem, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem7 = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Receiving Purchase Goods-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
    waitForObjectItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");
    activateItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");
    
    waitForObject(":Enter Order Receipts...._QPushButton");
    clickButton(":Enter Order Receipts...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", ponumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_frame.Receive All_QPushButton");
    clickButton(":_frame.Receive All_QPushButton");
    waitForObject(":Enter Order Receipts.Post_QPushButton");
    clickButton(":Enter Order Receipts.Post_QPushButton");
    
    waitForObject(":Enter Order Receipts...._QPushButton");
    clickButton(":Enter Order Receipts...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", lotpo, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_frame.Receive All_QPushButton");
    clickButton(":_frame.Receive All_QPushButton"); 
    waitForObject(":Enter Order Receipts.Post_QPushButton");
    clickButton(":Enter Order Receipts.Post_QPushButton");
    waitForObject(":Enter Order Receipts._lot_XLineEdit");
    type(":Enter Order Receipts._lot_XLineEdit", "1");
    waitForObject(":Enter Order Receipts._lot_XLineEdit");
    type(":Enter Order Receipts._lot_XLineEdit", "<Tab>");
    waitForObject(":Enter Order Receipts.XDateEdit_XDateEdit");
    type(":Enter Order Receipts.XDateEdit_XDateEdit", "+7");
    waitForObject(":Enter Order Receipts.Assign_QPushButton");
    clickButton(":Enter Order Receipts.Assign_QPushButton");
    
    waitForObject(":Enter Order Receipts...._QPushButton");
    clickButton(":Enter Order Receipts...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", serialpo, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_frame.Receive All_QPushButton");
    clickButton(":_frame.Receive All_QPushButton");
    waitForObject(":Enter Order Receipts.Post_QPushButton");
    clickButton(":Enter Order Receipts.Post_QPushButton");
    
    for(var i=1; i<= 3; i++)
    { 
        waitForObject(":Enter Order Receipts._lotSerial_XComboBox");
        type(":Enter Order Receipts._lotSerial_XComboBox", i );
        waitForObject(":Enter Order Receipts.Assign_QPushButton");
        clickButton(":Enter Order Receipts.Assign_QPushButton");
    }
    
    waitForObject(":Enter Order Receipts.Assign_QPushButton");
    clickButton(":Enter Order Receipts.Assign_QPushButton");
    
    for(i=1; i<=3; i++)
    { 
        waitForObject(":_frame._itemloc_XTreeWidget");
        doubleClick(":_frame._itemloc_XTreeWidget", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Enter Order Receipts.Distribute_QPushButton");
        clickButton(":Enter Order Receipts.Distribute_QPushButton");
        waitForObject(":Enter Order Receipts.Post_QPushButton_2");
        clickButton(":Enter Order Receipts.Post_QPushButton_2");           
    }
    
    waitForObject(":Enter Order Receipts...._QPushButton");
    clickButton(":Enter Order Receipts...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", mlcpo, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_frame.Receive All_QPushButton");
    clickButton(":_frame.Receive All_QPushButton"); 
    waitForObject(":Enter Order Receipts.Post_QPushButton");
    clickButton(":Enter Order Receipts.Post_QPushButton");
    waitForObject(":Enter Order Receipts._lot_XLineEdit");
    type(":Enter Order Receipts._lot_XLineEdit", "2");
    
    waitForObject(":Enter Order Receipts.XDateEdit_XDateEdit");
    type(":Enter Order Receipts.XDateEdit_XDateEdit", "+7");
    waitForObject(":Enter Order Receipts.Assign_QPushButton");
    clickButton(":Enter Order Receipts.Assign_QPushButton");
    waitForObject(":_frame._itemloc_XTreeWidget");
    doubleClick(":_frame._itemloc_XTreeWidget", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Enter Order Receipts.Distribute_QPushButton");
    clickButton(":Enter Order Receipts.Distribute_QPushButton");
    waitForObject(":Enter Order Receipts.Post_QPushButton_2");
    clickButton(":Enter Order Receipts.Post_QPushButton_2");
    
    waitForObject(":Enter Order Receipts.Close_QPushButton");
    clickButton(":Enter Order Receipts.Close_QPushButton");
    
    //-----Verification of updated QOH by Item (Receiving Purchase Goods)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand");
    activateItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", polineitem, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
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
    
    var result = replaceSubstring(sNameOfRootItem1.latin1(), ",","");
    
    var qoh = replaceSubstring(sNameOfRootItem2.latin1(),",","");
    
    var sum = (parseInt(poquantity.toString()) + parseInt(result.toString()));
    
    if(parseInt(qoh.toString()) == parseInt(sum.toString())) 
        test.pass("QOH updated correctly for Receiving Purchase goods for Regular item types");
    else test.fail("QOH updated incorrectly for Receiving Purchase goods for Regular item types");
    
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton"); 
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", lotlineitem, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem4 = obj_TreeTopLevelItem.text(3); 
    var lotquantity = 1.25;
    
    var result = replaceSubstring(sNameOfRootItem3.latin1(), ",","");
    
    var qoh = replaceSubstring(sNameOfRootItem4.latin1(),",","");
    
    var sum = (parseInt(lotquantity.toString()) + parseInt(result.toString()));
    
    if(parseInt(qoh.toString()) == parseInt(sum.toString())) 
        test.pass("QOH updated correctly for Receiving Purchase goods for Lot controlled item types");
    else test.fail("QOH updated incorrectly for Receiving Purchase goods for Lot controlled item types");
    
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", seriallineitem, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem6 = obj_TreeTopLevelItem.text(3); 
    
    var result = replaceSubstring(sNameOfRootItem5.latin1(), ",","");
    
    var qoh = replaceSubstring(sNameOfRootItem6.latin1(),",","");
    
    var sum = (parseInt(serialqty.toString()) + parseInt(result.toString()));
    
    if(parseInt(qoh.toString()) == parseInt(sum.toString())) 
        test.pass("QOH updated correctly for Receiving Purchase goods for Serial controlled item types");
    else test.fail("QOH updated incorrectly for Receiving Purchase goods for Serial controlled item types"); 
    
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", mlclineitem, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem8 = obj_TreeTopLevelItem.text(3); 
    
    var result = replaceSubstring(sNameOfRootItem7.latin1(), ",","");
    
    var qoh = replaceSubstring(sNameOfRootItem8.latin1(),",","");
    
    var sum = (parseInt(mlcqty.toString()) + parseInt(result.toString()));
    
    if(parseInt(qoh.toString()) == parseInt(sum.toString())) 
        test.pass("QOH updated correctly for Receiving Purchase goods for MLC item types");
    else test.fail("QOH updated incorrectly for Receiving Purchase goods for MLC item types");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Verification of G/L transaction (Receiving PO)----- 
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
    waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
    activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Transactions...");
    activateItem(":xTuple ERP: *_.Reports_QMenu", "Transactions...");
    
    waitForObject(":_accountGroup.All Accounts_QRadioButton");
    clickButton(":_accountGroup.All Accounts_QRadioButton");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit");
    type(":_dateGroup.XDateEdit_XDateEdit", "0");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
    waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
    clickButton(":_sourceGroup.Selected Source:_QRadioButton");
    waitForObjectItem(":_sourceGroup._source_XComboBox", "S/R");
    clickItem(":_sourceGroup._source_XComboBox", "S/R", 5, 5, 1, Qt.LeftButton);
    waitForObject(":General Ledger Transactions.Query_QPushButton");
    clickButton(":General Ledger Transactions.Query_QPushButton");
    
    waitForObject(":_gltrans_XTreeWidget");
    var sWidgetTreeControl = ":_gltrans_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
    if(sNameOfRootItem == "PO")
        test.pass("Receiving PO has a GL entry");
    else test.fail(" Receiving PO has no GL entry");
    
    waitForObject(":General Ledger Transactions.Close_QPushButton");
    clickButton(":General Ledger Transactions.Close_QPushButton");
    
    //-----Entering a Voucher-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP: *.Voucher_QMenu", "New...");
    activateItem(":xTuple ERP: *.Voucher_QMenu", "New...");
    
    waitForObject(":_voucherGroup...._QPushButton");
    clickButton(":_voucherGroup...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_3");
    doubleClickItem(":_listTab_XTreeWidget_3", ponumber, 5, 5, 0, Qt.LeftButton);
    
    vounumber = findObject(":_voucherNumber_XLineEdit").text; 
    
    waitForObject(":_poitems._poitem_XTreeWidget");
    doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 1, Qt.LeftButton);      
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
    waitForObject(":_amount._currency_XLineEdit");
    type(":_amount._currency_XLineEdit",findObject(":_amount_XLineEdit").text );
    
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
    type(":_dateGroup.XDateEdit_XDateEdit_3", "+0");
    waitForObject(":_invoiceNum_XLineEdit");
    type(":_invoiceNum_XLineEdit", "VO for" + ponumber);
    waitForObject(":Voucher.Save_QPushButton_3");
    clickButton(":Voucher.Save_QPushButton_3");
    
    waitForObject(":_voucherGroup...._QPushButton");
    clickButton(":_voucherGroup...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_3");
    doubleClickItem(":_listTab_XTreeWidget_3", lotpo, 5, 5, 0, Qt.LeftButton);
    
    var lotvo = findObject(":_voucherNumber_XLineEdit").text;
    
    waitForObject(":_poitems._poitem_XTreeWidget");
    doubleClickItem(":_poitems._poitem_XTreeWidget", "GL", 5, 5, 1, Qt.LeftButton);      
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
    waitForObject(":_amount._currency_XLineEdit");
    type(":_amount._currency_XLineEdit",findObject(":_amount_XLineEdit").text );
    
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
    type(":_dateGroup.XDateEdit_XDateEdit_3", "+0");
    waitForObject(":_invoiceNum_XLineEdit");
    type(":_invoiceNum_XLineEdit", "VO for" + lotpo);
    waitForObject(":Voucher.Save_QPushButton_3");
    clickButton(":Voucher.Save_QPushButton_3");
    
    waitForObject(":_voucherGroup...._QPushButton");
    clickButton(":_voucherGroup...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_3");
    doubleClickItem(":_listTab_XTreeWidget_3", serialpo, 5, 5, 0, Qt.LeftButton);
    
    var serialvo = findObject(":_voucherNumber_XLineEdit").text; 
    
    waitForObject(":_poitems._poitem_XTreeWidget");
    doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 1, Qt.LeftButton);      
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
    waitForObject(":_amount._currency_XLineEdit");
    type(":_amount._currency_XLineEdit",findObject(":_amount_XLineEdit").text );
    
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
    type(":_dateGroup.XDateEdit_XDateEdit_3", "+0");
    waitForObject(":_invoiceNum_XLineEdit");
    type(":_invoiceNum_XLineEdit", "VO for" + serialpo);
    waitForObject(":Voucher.Save_QPushButton_3");
    clickButton(":Voucher.Save_QPushButton_3");
    
    waitForObject(":_voucherGroup...._QPushButton");
    clickButton(":_voucherGroup...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_3");
    doubleClickItem(":_listTab_XTreeWidget_3", mlcpo, 5, 5, 0, Qt.LeftButton);
    
    var mlcvo = findObject(":_voucherNumber_XLineEdit").text; 
    
    waitForObject(":_poitems._poitem_XTreeWidget");
    doubleClickItem(":_poitems._poitem_XTreeWidget", "GL", 5, 5, 1, Qt.LeftButton);      
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
    waitForObject(":_amount._currency_XLineEdit");
    type(":_amount._currency_XLineEdit",findObject(":_amount_XLineEdit").text );
    
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
    type(":_dateGroup.XDateEdit_XDateEdit_3", "+0");
    waitForObject(":_invoiceNum_XLineEdit");
    type(":_invoiceNum_XLineEdit", "VO for" + mlcpo);
    waitForObject(":Voucher.Save_QPushButton_3");
    clickButton(":Voucher.Save_QPushButton_3"); 
    
    waitForObject(":Voucher.Cancel_QPushButton");
    clickButton(":Voucher.Cancel_QPushButton");
    
    //-----Posting Vouchers-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP: *.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP: *.Voucher_QMenu", "List Unposted...");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    if(!clickItem(":List Open Vouchers._vohead_XTreeWidget", vounumber, 5, 5, 1, Qt.LeftButton))
        test.pass(" Voucher created for Regular item type");
    else test.fail(" Voucher not created Regular item type");
    
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    if(!clickItem(":List Open Vouchers._vohead_XTreeWidget", lotvo, 5, 5, 1, Qt.LeftButton))
        test.pass(" Voucher created for Lot controlled item type");
    else test.fail(" Voucher not created Lot controlled item type");
    
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    if(!clickItem(":List Open Vouchers._vohead_XTreeWidget", serialvo, 5, 5, 1, Qt.LeftButton))
        test.pass(" Voucher created for Serial controlled item type");
    else test.fail(" Voucher not created Serial controlled item type");
    
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    if(!clickItem(":List Open Vouchers._vohead_XTreeWidget", mlcvo, 5, 5, 1, Qt.LeftButton))
        test.pass(" Voucher created for MLC item type");
    else test.fail(" Voucher not created MLC item type");
    
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");
    test.log("Posted Voucher successfully");
    
    //---Selecting Voucher for Payment---
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP: *.Payments_QMenu", "Select...");
    activateItem(":xTuple ERP: *.Payments_QMenu", "Select...");
    
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
    
    waitForObject(":Select Payments._select_XComboBox");
    clickItem(":Select Payments._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments._selectDate_XComboBox");
    clickItem(":Select Payments._selectDate_XComboBox", "All", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame._apopen_XTreeWidget");
    clickItem(":frame._apopen_XTreeWidget", lotvo, 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Select..._QPushButton");
    clickButton(":frame.Select..._QPushButton");
    waitForObject(":_bankaccnt_XComboBox");
    clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments.Save_QPushButton");
    clickButton(":Select Payments.Save_QPushButton");
    
    waitForObject(":Select Payments._select_XComboBox");
    clickItem(":Select Payments._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments._selectDate_XComboBox");
    clickItem(":Select Payments._selectDate_XComboBox", "All", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame._apopen_XTreeWidget");
    clickItem(":frame._apopen_XTreeWidget", serialvo, 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Select..._QPushButton");
    clickButton(":frame.Select..._QPushButton");
    waitForObject(":_bankaccnt_XComboBox");
    clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments.Save_QPushButton");
    clickButton(":Select Payments.Save_QPushButton");
    
    waitForObject(":Select Payments._select_XComboBox");
    clickItem(":Select Payments._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments._selectDate_XComboBox");
    clickItem(":Select Payments._selectDate_XComboBox", "All", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame._apopen_XTreeWidget");
    clickItem(":frame._apopen_XTreeWidget", mlcvo, 5, 5, 1, Qt.LeftButton);
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
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP: *.Payments_QMenu", "Prepare Check Run...");
    activateItem(":xTuple ERP: *.Payments_QMenu", "Prepare Check Run...");
    
    waitForObjectItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account");
    clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Prepare Check Run.Prepare_QPushButton");
    clickButton(":Prepare Check Run.Prepare_QPushButton");
    test.log("Check run prepared successfully");
    
    snooze(2);
    
    //-----Extracting OS Name-----
    var linuxPath, winPath;
    
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
    activateItem(":xTuple ERP: *_QMenuBar_3", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
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
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP: *.Payments_QMenu", "View Check Run...");
    activateItem(":xTuple ERP: *.Payments_QMenu", "View Check Run...");
    
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
    waitForObject(":fileNameEdit_QLineEdit_2");
    
    if(OS.name=="Linux")
        findObject(":fileNameEdit_QLineEdit_2").text = linuxPath.toString()+"/achFile.ach";
    else if(OS.name == "Windows" )
        findObject(":fileNameEdit_QLineEdit_2").text = winPath.toString()+"/achFile.ach";
    
    waitForObject(":View Check Run.Save_QPushButton");
    clickButton(":View Check Run.Save_QPushButton");
    
    snooze(2);
    
    if(object.exists(":View Check Run.Yes_QPushButton_2"))    
        clickButton(":View Check Run.Yes_QPushButton_2");
    
    waitForObject(":View Check Run.Yes_QPushButton");
    clickButton(":View Check Run.Yes_QPushButton");
    
    waitForObject(":View Check Run.Yes_QPushButton_2");
    clickButton(":View Check Run.Yes_QPushButton_2");
    
    snooze(0.5);
    waitForObject(":View Check Run.Cancel_QPushButton");
    clickButton(":View Check Run.Cancel_QPushButton");
    
    snooze(0.5);
    
    //-----Post Check run-----
    waitForObject(":_frame._check_XTreeWidget");
    clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":_frame.Post_QPushButton");
    clickButton(":_frame.Post_QPushButton");
    waitForObject(":View Check Run.Post_QPushButton");
    clickButton(":View Check Run.Post_QPushButton");
    
    waitForObject(":View Check Run.Close_QPushButton");
    clickButton(":View Check Run.Close_QPushButton");
    test.log("Posted Checks for Voucher");
    
    //-----Verification of G/L transaction (Posting Checks)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
    waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
    activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Transactions...");
    activateItem(":xTuple ERP: *_.Reports_QMenu", "Transactions...");
    
    waitForObject(":_accountGroup.All Accounts_QRadioButton");
    clickButton(":_accountGroup.All Accounts_QRadioButton");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit");
    type(":_dateGroup.XDateEdit_XDateEdit", "0");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
    waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
    clickButton(":_sourceGroup.Selected Source:_QRadioButton");
    waitForObjectItem(":_sourceGroup._source_XComboBox", "A/P");
    clickItem(":_sourceGroup._source_XComboBox", "A/P", 5, 5, 1, Qt.LeftButton);
    waitForObject(":General Ledger Transactions.Query_QPushButton");
    clickButton(":General Ledger Transactions.Query_QPushButton");
    
    waitForObject(":_gltrans_XTreeWidget");
    var sWidgetTreeControl = ":_gltrans_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
    if(sNameOfRootItem == "CK")
        test.pass("Posting of Checks has a GL entry");
    else test.fail("Posting of Checks has no GL entry");
    
    waitForObject(":General Ledger Transactions.Close_QPushButton");
    clickButton(":General Ledger Transactions.Close_QPushButton");              
    
        
}
