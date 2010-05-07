function main()
{

    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
       
    //--------Edit the User Preferences----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
        activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
        snooze(2);
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            waitForObject(":Interface Options.Show windows inside workspace_QRadioButton");
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
        waitForObject(":Quote.Save_QPushButton");
        clickButton(":Quote.Save_QPushButton");
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in editing preferences" + e);
    }
    
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    
    //-----Variable Declaration-----
    var sonumber, ponumber, vounumber, invoice, amount, polineitem, poquantity, woquantity, soquantity;
    
  //---find Application Edition------ 
  try
  {
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
  }
  catch(e)
  {
      test.fail("Error in capturing database information" + e);
  }
  
    //-----Setting Encryption Key-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
        activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
        activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
        
        snooze(1);
        if(object.exists(":OK_QPushButton"))
            test.fatal("Please Define the Encryption path"); 
        
        waitForObject(":Encryption Configuration.Save_QPushButton");
        clickButton(":Encryption Configuration.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in setting the encryption key" + e);
    } 
    
    //-----------Editing the preferences-------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
        activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
        snooze(2);
        if(object.exists(":Search Navigation.Buttons_QRadioButton"))
        {
            waitForObject(":Search Navigation.Buttons_QRadioButton");
            if(!findObject(":Search Navigation.Buttons_QRadioButton").checked)
                clickButton(":Search Navigation.Buttons_QRadioButton");
        }
        waitForObject(":Quote.Save_QPushButton");
        clickButton(":Quote.Save_QPushButton");
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in editing preferences" + e);
    }
    
    //-----Indented Bill of Materials-----
    try
    {
        snooze(1);
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Products_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Bills of Materials");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Bills of Materials");
        waitForObjectItem(":xTuple ERP:*.Bills of Materials_QMenu", "Indented...");
        activateItem(":xTuple ERP:*.Bills of Materials_QMenu", "Indented...");
        waitForObject(":Indented Bill of Materials...._QPushButton_2");
        clickButton(":Indented Bill of Materials...._QPushButton_2");
        waitForObject(":_listTab_XTreeWidget");
        snooze(0.5);
        doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton);
        
        waitForObject(":Indented Bill of Materials.Query_QPushButton_2");
        clickButton(":Indented Bill of Materials.Query_QPushButton_2");
        snooze(1);
        
        waitForObject(":Indented Bill of Materials._bomitem_XTreeWidget");
        
        if(object.exists("{column='1' container=':Indented Bill of Materials._bomitem_XTreeWidget' text='TBODY1' type='QModelIndex'}"))
            test.pass("TBODY1 - Item available");
        else 
            test.fail("TBODY1 - Item not available");
        
        waitForObject(":Indented Bill of Materials._bomitem_XTreeWidget");
        if(object.exists("{column='1' container=':Indented Bill of Materials._bomitem_XTreeWidget' text='TBODY1' type='QModelIndex'}"))
            test.pass("YPAINT1 - Item available");
        else 
            test.fail("YPAINT1 - Item not available");
        
        waitForObject(":Indented Bill of Materials._bomitem_XTreeWidget");
        if(object.exists("{column='1' container=':Indented Bill of Materials._bomitem_XTreeWidget' text='TBODY1' type='QModelIndex'}"))
            test.pass("TWHEEL1 - Item available");
        else 
            test.fail("TWHEEL1 - Item not available");
        
        waitForObject(":Indented Bill of Materials._bomitem_XTreeWidget");
        if(object.exists("{column='1' container=':Indented Bill of Materials._bomitem_XTreeWidget' text='TBODY1' type='QModelIndex'}"))
            test.pass("TSUB1 - Item available");
        else 
            test.fail("TSUB1 - Item not available");
        
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in viewing intended bill of materials" + e);
    }
    
    
    //-----Extracting Sales Order Number-----
    try
    {
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
    }
    catch(e)
    {
        test.fail("Error in extracting sales order number" + e);
    }
    
    
    //-----Creating a Sales Order-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
        
        waitForObject(":frame.New_QPushButton_2");
        clickButton(":frame.New_QPushButton_2");
        waitForObject(":_headerPage...._QPushButton_5");
        clickButton(":_headerPage...._QPushButton_5");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");   
        waitForObject(":_headerPage._custPONumber_XLineEdit");
        type(":_headerPage._custPONumber_XLineEdit", "022");
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_itemGroup...._QPushButton_5");
        clickButton(":_itemGroup...._QPushButton_5");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton);
        snooze(1);
        type(":_qtyOrdered_XLineEdit_2", "100");
        
        soquantity = findObject(":_qtyOrdered_XLineEdit_2").text;
        type(":_qtyOrdered_XLineEdit_2","<Tab>");
        snooze(3);
        
        //waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+7");  
        
        waitForObject(":Sales Order.Save_QPushButton_3");
        clickButton(":Sales Order.Save_QPushButton_3");
        waitForObject(":Sales Order.Close_QPushButton_6");
        clickButton(":Sales Order.Close_QPushButton_6");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        snooze(0.5);
        waitForObject(":Sales Order.Cancel_QPushButton_3");
        clickButton(":Sales Order.Cancel_QPushButton_3");
        
        
        waitForObject(":frame._so_XTreeWidget");
        if(object.exists("{column='0' container=':frame._so_XTreeWidget' text='"+sonumber+"' type='QModelIndex'}"))
            test.pass("Sales Order Created");
        else 
            test.fail("Sales Order Failed");
        snooze(2);
        waitForObject(":List Open Sales Orders.Close_QPushButton");
        clickButton(":List Open Sales Orders.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating sales order" + e);
    }
    
    //---find Application Edition------ 
    try
    {
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
    }
    catch(e)
    {
        test.fail("Error in identifying application edition" + e);        
    }
    
    if(appEdition == "Standard")
    {
        
        //---------Adjusting QOH of YPAINT1------------
        try
        {
            
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
            activateItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
            waitForObjectItem(":*.Transactions_QMenu", "Adjustment...");
            activateItem(":*.Transactions_QMenu", "Adjustment...");
            waitForObject(":_itemGroup...._QPushButton_7");
            clickButton(":_itemGroup...._QPushButton_7");
            waitForObject(":_listTab_XTreeWidget");    
            doubleClickItem(":_listTab_XTreeWidget","YPAINT1",10, 10, 0, Qt.LeftButton);
            waitForObject(":_qty_XLineEdit_3");
            type(":_qty_XLineEdit_3", "500");
            waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
            waitForObject(":Enter Miscellaneous Adjustment._lotSerial_XComboBox");
            type(":Enter Miscellaneous Adjustment._lotSerial_XComboBox", "LOT");
            waitForObject(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit");
            type(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit", "+9");
            waitForObject(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit");
            type(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit", "500");
            
            waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
            waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in adjusting QOH of YPAINT1");
        }
    }
    
       if(appEdition == "Manufacturing")
      
       {
        //-----Scheduling MRP by Planner Code-----
        try
        {   
            snooze(1);
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
        }
        catch(e)
        {
            test.fail("Error in scheduling MRP" + e);
        }
        
        
        
        //-----MRP Results-----
        try
        {
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
            snooze(2);
            waitForObject(":frame._planord_XTreeWidget");
            if(object.exists("{column='4' container=':frame._planord_XTreeWidget' text='TSUB1' type='QModelIndex'}"))
                test.pass("Planned Order for TSUB1 created ");
            else 
                test.fail("Planned Order for TSUB1 not created");
            
            waitForObject(":frame._planord_XTreeWidget");
            var sWidgetTreeControl = ":frame._planord_XTreeWidget";
            waitForObject(sWidgetTreeControl);
            var obj_TreeWidget = findObject(sWidgetTreeControl);
            var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
            var iNumberOfRootItems = obj_TreeRootItem.childCount();
            var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            var qsub1 = obj_TreeTopLevelItem.text(8);
            
            waitForObject(":_plannerCode.Selected:_QRadioButton");
            type(":_plannerCode.Selected:_QRadioButton", "<Down>");
            waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
            type(":_plannerCode.All Planner Codes_QRadioButton_2", " ");
            
            waitForObject(":frame._planord_XTreeWidget");
            if(object.exists("{column='4' container=':frame._planord_XTreeWidget' text='TBOX1' type='QModelIndex'}"))
                test.pass("Planned Order for TBOX1 created ");
            else 
                test.fail("Planned Order for TBOX1 not created");
            
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
        }
        catch(e)
        {
            test.fail("Error in viewing planned orders" + e);
        }
        
        
        //-----Release Planned P/Os to Purchasing-----
        try
        {
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
        }
        catch(e)
        {
            test.fail("Error in releasing planned purchase order" + e);
        }
        
        
        //-----Converting P/Rs to P/Os-----
        try
        {
            snooze(1);
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
            snooze(0.5);
            
            
            
            waitForObject(":_pr.TBOX1_QModelIndex_2");
            mouseClick(":_pr.TBOX1_QModelIndex_2", 15, 5, 0, Qt.LeftButton);
            snooze(1);
            waitForObject(":_pr.TBOX1_QModelIndex_2");
            openContextMenu(":_pr.TBOX1_QModelIndex_2", 15, 5, 0);
            snooze(1);
            
            activateItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
            snooze(3);
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
            
            
            waitForObject(":Purchase Requests by Planner Code.Close_QPushButton");
            clickButton(":Purchase Requests by Planner Code.Close_QPushButton");   
            test.log("Converted P/Rs to P/Os");
        }
        catch(e)
        {
            test.fail("Error in converting P/R to P/O" + e);
        }
      
        
        
        //-----Posting Purchase Orders-----
        try
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
            waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
            activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
            waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            
            
            waitForObject(":Show.Unreleased_XCheckBox");
            if(!findObject(":Show.Unreleased_XCheckBox").checked)
                clickButton(":Show.Unreleased_XCheckBox");
            snooze(1);//Allow delay
            waitForObject(":List Open Purchase Orders._pohead_XTreeWidget");
            if(object.exists("{column='0' container=':List Open Purchase Orders._pohead_XTreeWidget' text='"+ponumber+"' type='QModelIndex'}"))
                test.pass(" Purchase Order Created ");
            else
                test.fail("Purchase  order is not created");
            
            doubleClickItem(":List Open Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            
            polineitem=findObject(":_poitem_QModelIndex").text;
            poquantity=findObject(":_poitem.100.00_QModelIndex").text;
            snooze(1);
            waitForObject(":_lineItemsPage._poitem_XTreeWidget");
            doubleClickItem(":_lineItemsPage._poitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
          
                    
            waitForObject(":Purchase Order Item.Save_QPushButton");
            clickButton(":Purchase Order Item.Save_QPushButton");
            waitForObject(":Purchase Order.Save_QPushButton");
            clickButton(":Purchase Order.Save_QPushButton");
            snooze(1);
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");
            
            
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
            waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
            activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
            waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            
            
            waitForObject(":Show.Unreleased_XCheckBox");
            if(!findObject(":Show.Unreleased_XCheckBox").checked)
                clickButton(":Show.Unreleased_XCheckBox");
            snooze(1);//Allow delay
            
            
            
            clickItem(":List Open Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
            snooze(1);
            waitForObject(":List Open Purchase Orders.Release_QPushButton");
            clickButton(":List Open Purchase Orders.Release_QPushButton");
            waitForObject(":List Open Sales Orders.Yes_QPushButton");
            clickButton(":List Open Sales Orders.Yes_QPushButton");
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");
            test.log("Purchase Orders Posted successfully");
        }
        catch(e)
        {
            test.fail("Error in posting purchase order" + e);
        }
        
        
      
        //-----Verification of QOH by Item (Receiving Purchase Goods)-----
        try
        {
            snooze(1);
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
            activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
            waitForObject(":_itemGroup...._QPushButton_6");
            clickButton(":_itemGroup...._QPushButton_6");
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget",polineitem,10,10,0,Qt.LeftButton);        
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
            var sNameOfRootItem1 = obj_TreeTopLevelItem.text(3);
            
            waitForObject(":Quantities on Hand by Item.Close_QPushButton");
            clickButton(":Quantities on Hand by Item.Close_QPushButton");
        }
        catch(e)
        {
            
            
            test.fail("Error in verifying QOH by item" + e);
        }
        
        
        //-----Receiving Purchase Goods-----
        try
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
            activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
            
            waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
            activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
            waitForObject(":Enter Order Receipts...._QPushButton");
            clickButton(":Enter Order Receipts...._QPushButton");    
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);             
            waitForObject(":Enter Order Receipts.Receive All_QPushButton");
            clickButton(":Enter Order Receipts.Receive All_QPushButton");
            waitForObject(":Enter Order Receipts.Post_QPushButton");
            clickButton(":Enter Order Receipts.Post_QPushButton");
            
            waitForObject(":Enter Order Receipts.Close_QPushButton");
            clickButton(":Enter Order Receipts.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in receiving item" + e);
        }
        
        
        //-----Verification of updated QOH by Item (Receiving Purchase Goods)-----
        try
        {
            snooze(1);
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
            activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");        
            waitForObject(":_itemGroup...._QPushButton_6");
            clickButton(":_itemGroup...._QPushButton_6");
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget",polineitem,10,10,0,Qt.LeftButton); 
            waitForObject(":_warehouse._warehouses_WComboBox_6");
            clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
            waitForObject(":Quantities on Hand by Item.Query_QPushButton");
            clickButton(":Quantities on Hand by Item.Query_QPushButton");
            snooze(1);
            
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
                test.pass("QOH updated correctly for Receiving Purchase goods");
            else test.fail("QOH updated incorrectly for Receiving Purchase goods");
            
            waitForObject(":Quantities on Hand by Item.Close_QPushButton");
            clickButton(":Quantities on Hand by Item.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in updating of QOH" + e);
        }
        
        
        //-----Verification of G/L transaction (Receiving PO)-----
        try
        {
            snooze(2);
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":*.General Ledger_QMenu", "Reports");
            activateItem(":*.General Ledger_QMenu", "Reports");
            waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
            activateItem(":*.Reports_QMenu_2", "Transactions...");
            
            waitForObject(":_accountGroup.All Accounts_QRadioButton");
            clickButton(":_accountGroup.All Accounts_QRadioButton");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_12");
            type(":_dateGroup.XDateEdit_XDateEdit_12", "0");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_13");
            type(":_dateGroup.XDateEdit_XDateEdit_13", "0");
            waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
            clickButton(":_sourceGroup.Selected Source:_QRadioButton");
            waitForObject(":_sourceGroup._source_XComboBox");
            clickItem(":_sourceGroup._source_XComboBox", "S/R", 5, 5, 1, Qt.LeftButton);
            waitForObject(":General Ledger Transactions.Query_QPushButton");
            clickButton(":General Ledger Transactions.Query_QPushButton");
            snooze(1);
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
            
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");     
        }
        catch(e)
        {
            test.fail("Error in verifying G/L transaction after receiving PO" + e);
        }
        
        
        //-----Entering a Voucher-----
        try
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
            waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
            activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
            waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
            activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
            waitForObject(":_voucherGroup...._QPushButton_4");
            clickButton(":_voucherGroup...._QPushButton_4");
            
            
            
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
            
            
            vounumber = findObject(":_voucherNumber_XLineEdit_2").text; 
            
            waitForObject(":_poitems._poitem_XTreeWidget_2");
            doubleClickItem(":_poitems._poitem_XTreeWidget_2", "EA", 5, 5, 0, Qt.LeftButton);
            waitForObject(":_uninvoiced.Receiving_QModelIndex");
            doubleClick(":_uninvoiced.Receiving_QModelIndex", 5, 5, 0, Qt.LeftButton);
            waitForObject(":_distTab.New_QPushButton_2");
            clickButton(":_distTab.New_QPushButton_2");
            
            waitForObject(":[*]Voucher._currency_XLineEdit");
            type(":[*]Voucher._currency_XLineEdit", "25");
            waitForObject(":[*]Voucher.Save_QPushButton");
            clickButton(":[*]Voucher.Save_QPushButton");
            waitForObject(":[*]Voucher.Save_QPushButton_2");
            clickButton(":[*]Voucher.Save_QPushButton_2");
            waitForObject(":_amount._currency_XLineEdit");
            type(":_amount._currency_XLineEdit", findObject(":_amount_XLineEdit_4").text);
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_14");
            type(":_dateGroup.XDateEdit_XDateEdit_14", "+0");
            waitForObject(":_invoiceNum_XLineEdit_2");
            type(":_invoiceNum_XLineEdit_2", "VO for "+ ponumber);
            waitForObject(":[*]Voucher.Save_QPushButton_3");
            clickButton(":[*]Voucher.Save_QPushButton_3");
            
            waitForObject(":[*]Voucher.Cancel_QPushButton");
            clickButton(":[*]Voucher.Cancel_QPushButton");
            
            snooze(2);
            if(object.exists(":[*]Voucher.No_QPushButton"))
                clickButton(":[*]Voucher.No_QPushButton");
            
        }
        
        catch(e)
        {
            test.fail("Error in creating a voucher" + e);
        }
    }
    if(appEdition=="PostBooks" || appEdition=="Standard")
    {
        
        //-----Creating a Purchase Order-----
        try
        {
            snooze(1);
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
            waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
            activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
            waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            
            waitForObject(":Show.Unreleased_XCheckBox");
            if(!findObject(":Show.Unreleased_XCheckBox").checked)
                clickButton(":Show.Unreleased_XCheckBox");
            
            
            waitForObject(":List Open Purchase Orders.New_QPushButton");
            clickButton(":List Open Purchase Orders.New_QPushButton");
            
            waitForObject(":_headerPage...._QPushButton_6");
            clickButton(":_headerPage...._QPushButton_6");
            waitForObject(":_listTab_XTreeWidget_4");
            doubleClickItem(":_listTab_XTreeWidget_4", "TPARTS", 5, 5, 0, Qt.LeftButton); 
            
            var purchaseorder = findObject(":_headerPage._orderNumber_XLineEdit").text;
            
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_3");
            clickButton(":_lineItemsPage.New_QPushButton_3");
            waitForObject(":groupBox_2...._QPushButton");
            clickButton(":groupBox_2...._QPushButton");
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget","TBOX1",10,10,0,Qt.LeftButton);
            
            waitForObject(":_ordered_XLineEdit");
            type(":_ordered_XLineEdit", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit");
            findObject(":_schedGroup.XDateEdit_XDateEdit").clear();
            type(":_schedGroup.XDateEdit_XDateEdit", "+7");
            
            var polineitem = findObject(":groupBox_2.VirtualClusterLineEdit_ItemLineEdit").text;
            var poquantity = findObject(":_ordered_XLineEdit").text;
            
            waitForObject(":Purchase Order Item.Save_QPushButton");
            clickButton(":Purchase Order Item.Save_QPushButton");
            waitForObject(":Purchase Order.Save_QPushButton");
            clickButton(":Purchase Order.Save_QPushButton");
            
            waitForObject(":Purchase Order.Close_QPushButton");
            clickButton(":Purchase Order.Close_QPushButton");
            
            if(object.exists("{column='0' container=':List Open Purchase Orders._pohead_XTreeWidget' text='"+purchaseorder+"' type='QModelIndex'}"))
                test.pass("Purhcase order created successfully");
            else
                test.fail("Purchase order couldn't be created");
            
            
            
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in creating purchase order" + e);
        }
        
        
        //-----Posting Purchase Orders-----
        try
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
            waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
            activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
            waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            
            waitForObject(":Show.Unreleased_XCheckBox");
            if(!findObject(":Show.Unreleased_XCheckBox").checked)
                clickButton(":Show.Unreleased_XCheckBox");
            snooze(0.5);
            
            waitForObject(":List Open Purchase Orders._pohead_XTreeWidget"); 
            clickItem(":List Open Purchase Orders._pohead_XTreeWidget", purchaseorder, 5, 5, 0, Qt.LeftButton);
            snooze(1); 
            waitForObject(":List Open Purchase Orders.Release_QPushButton");
            clickButton(":List Open Purchase Orders.Release_QPushButton");
            waitForObject(":List Open Sales Orders.Yes_QPushButton");
            clickButton(":List Open Sales Orders.Yes_QPushButton");
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");
            
            test.log("Purchase Orders Posted successfully");
        }
        catch(e)
        {
            test.fail("Error in posting purchase order" + e);
        }
        
        
        //-----Verification of QOH by Item (Receiving Purchase Goods)-----
        try
        {
            snooze(1);
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
            activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
            
            waitForObject(":_itemGroup...._QPushButton_6");
            clickButton(":_itemGroup...._QPushButton_6");
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget",polineitem,10,10,0,Qt.LeftButton); 
            
            if(appEdition=="Manufacturing" || appEdition=="Standard")
            {            
                waitForObject(":_warehouse.All Sites_QRadioButton_7");
                clickButton(":_warehouse.All Sites_QRadioButton_7");
            }
            
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
        }
        catch(e)
        {
            test.fail("Error in verifying QOH by item" + e);
        }
        
        
        //-----Receiving Purchase Goods-----
        try
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
            activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
            
            waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
            activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
            waitForObject(":Enter Order Receipts...._QPushButton");
            clickButton(":Enter Order Receipts...._QPushButton"); 
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget",  purchaseorder, 5, 5, 0, Qt.LeftButton);
            waitForObject(":Enter Order Receipts.Receive All_QPushButton");
            clickButton(":Enter Order Receipts.Receive All_QPushButton");
            
            waitForObject(":Enter Order Receipts.Post_QPushButton");
            clickButton(":Enter Order Receipts.Post_QPushButton");
            
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in receiving PO item" + e);
        }
        
        
        //-----Verification of updated QOH by Item (Receiving Purchase Goods)-----
        try
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
            activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
            
            waitForObject(":_itemGroup...._QPushButton_6");
            clickButton(":_itemGroup...._QPushButton_6");
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget",polineitem,10,10,0,Qt.LeftButton); 
            if(appEdition=="Manufacturing" || appEdition=="Standard")
            {            
                waitForObject(":_warehouse.All Sites_QRadioButton_7");
                clickButton(":_warehouse.All Sites_QRadioButton_7");
            }
            
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
        }
        catch(e)
        {
            test.fail("Error in verifying updated QOH by item" + e);
        }
        
        
        //-----Verification of G/L transaction (Receiving PO)-----
        try
        {
            snooze(1);
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":*.General Ledger_QMenu", "Reports");
            activateItem(":*.General Ledger_QMenu", "Reports");
            waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
            activateItem(":*.Reports_QMenu_2", "Transactions...");
            
            waitForObject(":_accountGroup.All Accounts_QRadioButton");
            clickButton(":_accountGroup.All Accounts_QRadioButton");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_12");
            type(":_dateGroup.XDateEdit_XDateEdit_12", "-3");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_13");
            type(":_dateGroup.XDateEdit_XDateEdit_13", "0");
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
            
            waitForObject(":_gltrans_XTreeWidget");
            type(":_gltrans_XTreeWidget", "<Down>");
            waitForObject(":_gltrans_XTreeWidget");
            type(":_gltrans_XTreeWidget", " ");
            sendEvent("QContextMenuEvent", ":_gltrans_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
            
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
            
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in verification of G/L entry" + e);
        }
        
        
        //-----Entering a Voucher-----
        try
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
            waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
            activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
            waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
            activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
         
            waitForObject(":_voucherGroup...._QPushButton_4");
            clickButton(":_voucherGroup...._QPushButton_4");
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget",  purchaseorder , 5, 5, 0, Qt.LeftButton);
            
            vounumber = findObject(":_voucherNumber_XLineEdit").text; 
            
            waitForObject(":_poitems._poitem_XTreeWidget_2");
            doubleClickItem(":_poitems._poitem_XTreeWidget_2", "EA", 5, 5, 0, Qt.LeftButton);
            waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget");
            doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
            waitForObject(":_distTab.New_QPushButton_2");
            clickButton(":_distTab.New_QPushButton_2");
            waitForObject(":[*]Voucher._currency_XLineEdit");
            type(":[*]Voucher._currency_XLineEdit", "25");
            waitForObject(":[*]Voucher.Save_QPushButton");
            clickButton(":[*]Voucher.Save_QPushButton");
            waitForObject(":[*]Voucher.Save_QPushButton_2");
            clickButton(":[*]Voucher.Save_QPushButton_2");
            waitForObject(":_amount._currency_XLineEdit");
            type(":_amount._currency_XLineEdit", findObject(":_amount_XLineEdit_4").text);
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_14");
            type(":_dateGroup.XDateEdit_XDateEdit_14", "+0");
            waitForObject(":_invoiceNum_XLineEdit_2");
            type(":_invoiceNum_XLineEdit_2", "VO for"+ purchaseorder);
            waitForObject(":[*]Voucher.Save_QPushButton_3");
            clickButton(":[*]Voucher.Save_QPushButton_3");
            
            waitForObject(":[*]Voucher.Cancel_QPushButton");
            clickButton(":[*]Voucher.Cancel_QPushButton");
            test.log("Voucher created successfully");
            
        }
        catch(e)
        {
            test.fail("Error in creating voucher" + e);
        }
    }
    //-----Posting Vouchers-----
    try
    {
        snooze(1);
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        
        waitForObject(":List Open Vouchers._vohead_XTreeWidget");
        
        if(object.exists("{column='0' container=':List Open Vouchers._vohead_XTreeWidget' text='"+vounumber+"' type='QModelIndex'}"))
        { 
            clickItem(":List Open Vouchers._vohead_XTreeWidget",vounumber,5,5,0,Qt.LeftButton);
            test.pass(" Voucher created ");
        }
        else
            test.fail("Voucher is not created ");
        waitForObject(":List Open Vouchers.Post_QPushButton");
        clickButton(":List Open Vouchers.Post_QPushButton");
        waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
        clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
        waitForObject(":List Open Vouchers.Continue_QPushButton");
        clickButton(":List Open Vouchers.Continue_QPushButton");
        
        waitForObject(":List Open Vouchers.Close_QPushButton");
        clickButton(":List Open Vouchers.Close_QPushButton");
        test.log("Posted Voucher successfully");
    }
    catch(e)
    {
        test.fail("Error in posting of voucher" + e);
    }    
    
    
       
         waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    
    
    
    //-----Verification of G/L transaction (Posting Vouchers)-----
    try
    {
        snooze(1);
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Reports");
        activateItem(":*.General Ledger_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
        activateItem(":*.Reports_QMenu_2", "Transactions...");
        
        waitForObject(":_accountGroup.All Accounts_QRadioButton");
        clickButton(":_accountGroup.All Accounts_QRadioButton");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_12");
        type(":_dateGroup.XDateEdit_XDateEdit_12", "0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_13");
        type(":_dateGroup.XDateEdit_XDateEdit_13", "0");
        waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
        clickButton(":_sourceGroup.Selected Source:_QRadioButton");
        waitForObject(":_sourceGroup._source_XComboBox");
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
        if(sNameOfRootItem == "VO")
            test.pass("Posting of voucher has a GL entry");
        else 
            test.fail("Posting of voucher has no GL entry");
        
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");                  
    }
    catch(e)
    {
        test.fail("Error in verifying G/L entry" + e);
    } 
    
    
    
         waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    
    //---Selecting Voucher for Payment---
    try
    {
        snooze(1);
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
        snooze(1);
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":Select Payments.Save_QPushButton");
        clickButton(":Select Payments.Save_QPushButton");
        
        waitForObject(":Select Payments.Close_QPushButton");
        clickButton(":Select Payments.Close_QPushButton");
        test.log("Selected Voucher for Payment");
    }
    catch(e)
    {
        test.fail("Error in selecting voucher for payment" + e);
    }    
    
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    
    //-----Prepare Check run-----
    try
    {
        snooze(1);    
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
        snooze(1);
        waitForObject(":Prepare Check Run.Prepare_QPushButton");
        clickButton(":Prepare Check Run.Prepare_QPushButton");
        test.log("Check run prepared successfully");
        
        snooze(2);
    }
    catch(e)
    {
        test.fail("Error in preparing check run" + e);
    }    
    
    
    if(appEdition == "Manufacturing")
        
    {
        //-----Extracting OS Name-----
        var linuxPath, winPath;
        try
        {
            snooze(1);
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
        }
        catch(e)
        {
            test.fail("Error in extracting OS name" + e);
        }
        
        
        //-----View Check run-----
        try
        {        
            snooze(1);
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
            waitForObject(":View Check Run.Create EFT File_QPushButton");
            clickButton(":View Check Run.Create EFT File_QPushButton");
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
        }
        catch(e)
        {
            test.fail("Error in viewing check run" + e);
        }    
        
        
        //-----Post Check run-----
        try
        {
            waitForObject(":_frame._check_XTreeWidget");
            clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);    
            waitForObject(":_frame.Post_QPushButton");
            sendEvent("QMouseEvent", ":_frame.Post_QPushButton", QEvent.MouseButtonPress, 55, 12, Qt.LeftButton, 0);
            waitForObjectItem(":_QMenu", "Selected Check...");
            activateItem(":_QMenu", "Selected Check...");
            waitForObject(":View Check Run.Post_QPushButton");
            clickButton(":View Check Run.Post_QPushButton");
            
            
            waitForObject(":View Check Run.Close_QPushButton");
            clickButton(":View Check Run.Close_QPushButton");
            test.log("Posted Check for Voucher:");
        }
        catch(e)
        {
            test.fail("Error in posting check run" + e);
        }   
        
        
        //-----Verification of G/L transaction (Posting Checks)-----
        try
        {
            snooze(1);
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":*.General Ledger_QMenu", "Reports");
            activateItem(":*.General Ledger_QMenu", "Reports");
            waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
            activateItem(":*.Reports_QMenu_2", "Transactions...");
            
            waitForObject(":_accountGroup.All Accounts_QRadioButton");
            clickButton(":_accountGroup.All Accounts_QRadioButton");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_12");
            type(":_dateGroup.XDateEdit_XDateEdit_12", "0");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_13");
            type(":_dateGroup.XDateEdit_XDateEdit_13", "0");
            waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
            clickButton(":_sourceGroup.Selected Source:_QRadioButton");
            waitForObject(":_sourceGroup._source_XComboBox");
            clickItem(":_sourceGroup._source_XComboBox", "A/P", 5, 5, 1, Qt.LeftButton);
            waitForObject(":General Ledger Transactions.Query_QPushButton");
            clickButton(":General Ledger Transactions.Query_QPushButton");
            
            while(!(object.exists(":_gltrans.CK_QModelIndex_3") && object.exists(":_gltrans.CK_QModelIndex_4")))
            {
                
                waitForObject(":Doc. Type_HeaderViewItem");
                mouseClick(":Doc. Type_HeaderViewItem",5,5,0,Qt.LeftButton);
                
            }
            
            if(object.exists(":_gltrans.25.00_QModelIndex") && object.exists(":_gltrans.25.00_QModelIndex_2") )
                test.pass("Posting of Checks has a GL entry");
            else
                test.fail("Posting of Checks has no GL entry");
            
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");                  
        }
        catch(e)
        {
            test.fail("Error in verifying G/L entry" + e);
        }     
        
    }
    
    //-----Releasing WorkOrders-----
    try
    {
        snooze(2);
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
        
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_5");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_5");
        if(appEdition=="Manufacturing")
        {
            waitForObject(":_warehouse._warehouses_WComboBox_5");
            clickItem(":_warehouse._warehouses_WComboBox_5", "WH1", 5, 5, 1, Qt.LeftButton); 
            
        }
        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
        type(":_dateGroup.XDateEdit_XDateEdit_4", "+30");
        
        waitForObject(":Release Work Orders by Planner Code.Release_QPushButton");
        clickButton(":Release Work Orders by Planner Code.Release_QPushButton");
        test.log("Work Orders released successfully");
    }
    catch(e)
    {
        test.fail("Error in releasing work orders" + e);
    }    
    
    
    //---find Application Edition------ 
    try
    {        
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
    }
    catch(e)
    {
        test.fail("Error in finding application edition" + e);
    }
    
    
    //-----Issuing Work Order Materials-----
    try
    {
        snooze(1);
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
        if(appEdition=="Manufacturing")
        {
            waitForObject(":Work Orders._wo_XTreeWidget");
            doubleClickItem(":Work Orders._wo_XTreeWidget", "TSUB1", 5, 5, 0, Qt.LeftButton);
            waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
            clickButton(":Issue Work Order Material Batch.Post_QPushButton");
        }
        
        else 
        {    
            
            if(appEdition=="Standard")
            {
                waitForObject(":Work Orders._wo_XTreeWidget");
                doubleClickItem(":Work Orders._wo_XTreeWidget", "R", 5, 5, 0, Qt.LeftButton); 
                waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
                clickButton(":Issue Work Order Material Batch.Post_QPushButton");
                waitForObject(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget");
                doubleClickItem(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget", "No", 0, 0, 0, Qt.LeftButton);
                
                waitForObject(":Distribute to Location.Distribute_QPushButton");
                clickButton(":Distribute to Location.Distribute_QPushButton");
                waitForObject(":Distribute Stock To/From Site Locations.Post_QPushButton");
                clickButton(":Distribute Stock To/From Site Locations.Post_QPushButton");
            }
            else
            {
                waitForObject(":Work Orders._wo_XTreeWidget");
                doubleClickItem(":Work Orders._wo_XTreeWidget", "R", 5, 5, 0, Qt.LeftButton); 
                waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
                clickButton(":Issue Work Order Material Batch.Post_QPushButton");
            }
        }
        
        test.log("Work order materials issued successfully");
        
        snooze(0.2);
        
        if(object.exists(":Issue Work Order Material Batch.Cancel_QPushButton"))
            clickButton(":Issue Work Order Material Batch.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in isuing work order materials" + e);
    }    
    
    if(appEdition == "Manufacturing")
    {
        
        //-----Verification of G/L transaction (Issue WO materials)-----
        try
        {
            snooze(1);
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":*.General Ledger_QMenu", "Reports");
            activateItem(":*.General Ledger_QMenu", "Reports");
            waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
            activateItem(":*.Reports_QMenu_2", "Transactions...");
            
            waitForObject(":_accountGroup.All Accounts_QRadioButton");
            clickButton(":_accountGroup.All Accounts_QRadioButton");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_12");
            type(":_dateGroup.XDateEdit_XDateEdit_12", "0");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_13");
            type(":_dateGroup.XDateEdit_XDateEdit_13", "0");
            waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
            clickButton(":_sourceGroup.Selected Source:_QRadioButton");
            waitForObject(":_sourceGroup._source_XComboBox");
            clickItem(":_sourceGroup._source_XComboBox", "W/O", 5, 5, 1, Qt.LeftButton);
            waitForObject(":General Ledger Transactions.Query_QPushButton");
            clickButton(":General Ledger Transactions.Query_QPushButton");
            
            while(!(object.exists(":_gltrans.Material TBOX1 Issue to Work Order_QModelIndex") && object.exists(":_gltrans.Material TBOX1 Issue to Work Order_QModelIndex_2") && object.exists(":_gltrans.Material TINSERT1 Issue to Work Order_QModelIndex") && object.exists(":_gltrans.Material TINSERT1 Issue to Work Order_QModelIndex_2") ))
            {
                waitForObject(":Reference_HeaderViewItem");
                mouseClick(":Reference_HeaderViewItem",5,5,0,Qt.LeftButton);
            }
            
            if((object.exists(":_gltrans.Material TBOX1 Issue to Work Order_QModelIndex") && object.exists(":_gltrans.Material TBOX1 Issue to Work Order_QModelIndex_2") && object.exists(":_gltrans.Material TINSERT1 Issue to Work Order_QModelIndex") && object.exists(":_gltrans.Material TINSERT1 Issue to Work Order_QModelIndex_2") ))
                test.pass("Material issue for TBOX1 and TINSERT1 has a GL entry");
            else
                test.fail("Material issue for TBOX1 and TINSERT1 has no GL entry");
            
            
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");                  
        }
        catch(e)
        {
            test.fail("Error in verification of G/L entry after issuing WO materials" + e);
        }    
    }
    
    //-----Verification of QOH by Item (Post Production)-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        
        
        
        if(appEdition=="Manufacturing")
        { 
            waitForObject(":_itemGroup...._QPushButton_6");
            clickButton(":_itemGroup...._QPushButton_6");
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget","TSUB1",10,10,0,Qt.LeftButton); 
            
            waitForObject(":_warehouse.All Sites_QRadioButton_7");
            clickButton(":_warehouse.All Sites_QRadioButton_7");
        }
        
        else 
        {  
            if(appEdition=="Standard")
            {
                
                waitForObject(":_itemGroup...._QPushButton_6");
                clickButton(":_itemGroup...._QPushButton_6");
                waitForObject(":_listTab_XTreeWidget");
                doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton);    
                
                waitForObject(":_warehouse.All Sites_QRadioButton_7");
                clickButton(":_warehouse.All Sites_QRadioButton_7");
            }        
            else
            {
                
                waitForObject(":_itemGroup...._QPushButton_6");
                clickButton(":_itemGroup...._QPushButton_6");
                waitForObject(":_listTab_XTreeWidget");
                doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton);  
                
            }
        }   
        
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
        
        waitForObject(":Quantities on Hand by Item.Close_QPushButton");
        clickButton(":Quantities on Hand by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in verifying QOH by item" + e);
    }    
    
    
    //-----Post Production and Close Work order-----
    try
    {
        snooze(1);
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
        
        waitForObject(":Post Production...._QPushButton");
        clickButton(":Post Production...._QPushButton");
        
        
        if(appEdition== "Manufacturing")
        { 
            
            waitForObject(":Work Orders._wo_XTreeWidget");
            doubleClickItem(":Work Orders._wo_XTreeWidget", "TSUB1", 5, 5, 0, Qt.LeftButton);
            waitForObject(":_qty_XLineEdit");
            
            woquantity = findObject(":_qtyGroup.100.00_XLabel").text;
            
            type(":_qty_XLineEdit",woquantity);
            if( findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked)
                clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
            waitForObject(":Post Production.Post_QPushButton");
            clickButton(":Post Production.Post_QPushButton");
            waitForObject(":Post Production.Close_QPushButton");
            clickButton(":Post Production.Close_QPushButton");
            test.log("Work orders post production successful");
            
        }
        
        else 
        {    
            if(appEdition=="Standard")
            {
                waitForObject(":Work Orders._wo_XTreeWidget");
                doubleClickItem(":Work Orders._wo_XTreeWidget", "I", 5, 5, 0, Qt.LeftButton);
                waitForObject(":_qty_XLineEdit");
                
                woquantity = findObject(":_qtyGroup.100.00_XLabel").text;
                
                type(":_qty_XLineEdit",woquantity);
                if(!findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked)
                    clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
                
                waitForObject(":Post Production.Post_QPushButton");
                clickButton(":Post Production.Post_QPushButton");  
                waitForObject(":Close Work Order.Close W/O_QPushButton");
                clickButton(":Close Work Order.Close W/O_QPushButton");
                waitForObject(":Close Work Order.Yes_QPushButton");
                clickButton(":Close Work Order.Yes_QPushButton");
                waitForObject(":Post Production.Close_QPushButton");
                clickButton(":Post Production.Close_QPushButton");
                test.log("Work orders post production successful");
            }
            
            else
            {
                waitForObject(":Work Orders._wo_XTreeWidget");
                doubleClickItem(":Work Orders._wo_XTreeWidget", "I", 5, 5, 0, Qt.LeftButton);
                waitForObject(":_qty_XLineEdit");
                
                woquantity = findObject(":_qtyGroup.100.00_XLabel").text;
                
                type(":_qty_XLineEdit",woquantity);
                waitForObject(":_optionsGroup.Close Work Order after Posting_XCheckBox");
                clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
                waitForObject(":Post Production.Post_QPushButton");
                clickButton(":Post Production.Post_QPushButton");
                waitForObject(":Close Work Order.Close W/O_QPushButton");
                clickButton(":Close Work Order.Close W/O_QPushButton");
                waitForObject(":Close Work Order.Yes_QPushButton");
                clickButton(":Close Work Order.Yes_QPushButton");
                waitForObject(":Post Production.Close_QPushButton");
                clickButton(":Post Production.Close_QPushButton");
            }
        }
        
    }
    catch(e)
    {
        
        test.fail("Error in post production of work order" + e);
    }    
    
    
    
    //-----Verification of updated QOH by Item (Post Production)-----
    try
    {
        snooze(1);
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        
        
        
        if(appEdition=="Manufacturing")
        { 
            
            waitForObject(":_itemGroup...._QPushButton_6");
            clickButton(":_itemGroup...._QPushButton_6");
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget","TSUB1",10,10,0,Qt.LeftButton);   
            
            waitForObject(":_warehouse.All Sites_QRadioButton_7");
            clickButton(":_warehouse.All Sites_QRadioButton_7");
        }
        
        else 
        {  
            if(appEdition=="Standard")
            {
                
                waitForObject(":_itemGroup...._QPushButton_6");
                clickButton(":_itemGroup...._QPushButton_6");
                waitForObject(":_listTab_XTreeWidget");
                doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton);  
                
                waitForObject(":_warehouse.All Sites_QRadioButton_7");
                clickButton(":_warehouse.All Sites_QRadioButton_7");
            }        
            else
            {
                waitForObject(":_itemGroup...._QPushButton_6");
                clickButton(":_itemGroup...._QPushButton_6");
                waitForObject(":_listTab_XTreeWidget");
                doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton);
                
            }
        }   
        
        
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
        
        var sum = (parseInt(woquantity.toString()) + parseInt(result.toString()));
        
        if(parseInt(qoh.toString()) == parseInt(sum.toString())) 
            test.pass(" QOH updated correctly for Post Production of a WorkOrder");
        else test.fail(" QOH updated incorrectly for Post Production of a WorkOrder");
        
        waitForObject(":Quantities on Hand by Item.Close_QPushButton");
        clickButton(":Quantities on Hand by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in verifying QOH by item" + e);
    }    
    
    
    //-----Verification of G/L transaction (Post Production)-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Reports");
        activateItem(":*.General Ledger_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
        activateItem(":*.Reports_QMenu_2", "Transactions...");
        
        waitForObject(":_accountGroup.All Accounts_QRadioButton");
        clickButton(":_accountGroup.All Accounts_QRadioButton");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_12");
        type(":_dateGroup.XDateEdit_XDateEdit_12", "0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_13");
        type(":_dateGroup.XDateEdit_XDateEdit_13", "0");
        waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
        clickButton(":_sourceGroup.Selected Source:_QRadioButton");
        waitForObject(":_sourceGroup._source_XComboBox");
        clickItem(":_sourceGroup._source_XComboBox", "W/O", 5, 5, 1, Qt.LeftButton);
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
        if(sNameOfRootItem == "WO")
            test.pass("Post Production has a GL entry");
        else test.fail("Post Production has no GL entry");
        
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in verifying G/L entry after post production" + e);
    }   
    
    
    //-----Verification of QOH by Item (BackFlush Items)-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        
        
        waitForObject(":_itemGroup...._QPushButton_6");
        clickButton(":_itemGroup...._QPushButton_6");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton);  
        if(appEdition=="Manufacturing" || appEdition=="Standard")
        {    
            waitForObject(":_warehouse.Selected:_QRadioButton_6");
            clickButton(":_warehouse.Selected:_QRadioButton_6");
            clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
            
        }
        snooze(1);    
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
        
        waitForObject(":Quantities on Hand by Item.Close_QPushButton");
        clickButton(":Quantities on Hand by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in verifying QOH by item" + e);
    }    
    
    
    if(appEdition== "Manufacturing")
    {
        
        
        //-----BackFlush Items and Close Work Order-----
        try
        {
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
            
            var qbackflush = findObject(":_qtyGroup.100.00_XLabel_2").text
                             
                             type(":_qty_XLineEdit", qbackflush);
            waitForObject(":_optionsGroup.Close Work Order after Posting_XCheckBox");
            clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
            waitForObject(":Post Production.Post_QPushButton");
            clickButton(":Post Production.Post_QPushButton");
            if(appEdition=="Manufacturing")
            {
                waitForObject(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget");
                doubleClickItem(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget", "No", 0, 0, 0, Qt.LeftButton);
                
                waitForObject(":Distribute to Location.Distribute_QPushButton");
                clickButton(":Distribute to Location.Distribute_QPushButton");
                waitForObject(":Distribute Stock To/From Site Locations.Post_QPushButton");
                clickButton(":Distribute Stock To/From Site Locations.Post_QPushButton");
                waitForObject(":Close Work Order.Close W/O_QPushButton");
                clickButton(":Close Work Order.Close W/O_QPushButton");
                snooze(1);   
                
                waitForObject(":Quote.Yes_QPushButton_2");
                clickButton(":Quote.Yes_QPushButton_2");
                waitForObject(":Post Production.Close_QPushButton");
                clickButton(":Post Production.Close_QPushButton"); 
            }
            
            test.log("Back flush of Work order materials successful");
        }
        catch(e)
        {
            test.fail("Error in back flushing of materials" + e);
        }    
        
        
        
        //-----Verification of updated QOH by Item (BackFlush Items)-----
        try
        {
            snooze(1);
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
            waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
            waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
            activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
            
            
            waitForObject(":_itemGroup...._QPushButton_6");
            clickButton(":_itemGroup...._QPushButton_6");
            waitForObject(":_listTab_XTreeWidget");
            doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton); 
            
            if(appEdition=="Manufacturing")
            {  
                waitForObject(":_warehouse.Selected:_QRadioButton_6");
                clickButton(":_warehouse.Selected:_QRadioButton_6");
                clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
                
            }
            
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
            
            var sum = (parseInt(qbackflush.toString()) + parseInt(result.toString()));
            
            if(parseInt(qoh.toString()) == parseInt(sum.toString())) 
                test.pass(" QOH updated correctly for Backflush items");
            else test.fail("QOH updated incorrectly for Backflush items");
            snooze(1);
            waitForObject(":Quantities on Hand by Item.Close_QPushButton");
            clickButton(":Quantities on Hand by Item.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in verifying updated QOH by item" + e);
        }    
        
    }
  
  
    //-----Verification of QOH by Item (Issue Stock to Shipping)-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        
        
        waitForObject(":_itemGroup...._QPushButton_6");
        clickButton(":_itemGroup...._QPushButton_6");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton);  
        
        if(appEdition=="Manufacturing" || appEdition=="Standard")
        {  
            
            waitForObject(":_warehouse.Selected:_QRadioButton_6");
            clickButton(":_warehouse.Selected:_QRadioButton_6");
            waitForObject(":_warehouse._warehouses_WComboBox_6");
            clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
            
        }
        
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
      
        waitForObject(":Quantities on Hand by Item.Close_QPushButton");
        clickButton(":Quantities on Hand by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in verifying QOH by item" + e);
    }   
    
    
    
    //-----Issue Stock to Shipping-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping...._QPushButton");
        clickButton(":Issue to Shipping...._QPushButton");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget",sonumber,10,10,0,Qt.LeftButton);
        
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        
        waitForObject(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Select for Billing_QCheckBox").checked)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        waitForObject(":groupBox.Print Packing List_XCheckBox");
        if(findObject(":groupBox.Print Packing List_XCheckBox").checked)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        
        
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
        test.log("Sales order Stock issued");
    }
    catch(e)
    {
        test.fail("Error in issuing stock to shipping" + e);
    }    
    
  
    //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----
    try
    {
        snooze(1);
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
        waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
        
        
        waitForObject(":_itemGroup...._QPushButton_6");
        clickButton(":_itemGroup...._QPushButton_6");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget","YTRUCK1",10,10,0,Qt.LeftButton);  
        
        if(appEdition=="Manufacturing" || appEdition=="Standard")
        {
            
            waitForObject(":_warehouse.Selected:_QRadioButton_6");
            clickButton(":_warehouse.Selected:_QRadioButton_6");
            waitForObject(":_warehouse._warehouses_WComboBox_6");
            clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
            
        }
        
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
        
        var sum = (parseInt(result.toString()) -  parseInt(soquantity.toString()));
        
        if(parseInt(qoh.toString()) == parseInt(sum.toString()))   
            test.pass(" QOH updated correctly for Issue Stock to Shipping"); 
        else test.fail("QOH updated incorrectly for Issue Stock to Shipping");
      
        waitForObject(":Quantities on Hand by Item.Close_QPushButton");
        clickButton(":Quantities on Hand by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in verifying QOH after issuing stock" + e);
    }    
    
    
    //-----Select Order for Billing-----
    try
    {
        snooze(1);
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
    }
    catch(e)
    {
        test.fail("Error in selecting order for billing" + e);
    }    
    
    //-----Creating Invoices-----
    try
    {
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
    }
    catch(e)
    {
        test.fail("Error in creating invoice" + e);
    }    
    
    
    //-----Posting Invoices-----
    try
    {
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
    }
    catch(e)
    {
        test.fail("Error in posting invoice" + e);
    }    
    
    //-----Verification of G/L transaction (Posting Invoice)-----
    try
    {
        snooze(1);
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Reports");
        activateItem(":*.General Ledger_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
        activateItem(":*.Reports_QMenu_2", "Transactions...");
        
        waitForObject(":_accountGroup.All Accounts_QRadioButton");
        clickButton(":_accountGroup.All Accounts_QRadioButton");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_12");
        type(":_dateGroup.XDateEdit_XDateEdit_12", "0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_13");
        type(":_dateGroup.XDateEdit_XDateEdit_13", "0");
        waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
        clickButton(":_sourceGroup.Selected Source:_QRadioButton");
        waitForObject(":_sourceGroup._source_XComboBox");
        clickItem(":_sourceGroup._source_XComboBox", "A/R", 5, 5, 1, Qt.LeftButton);
        waitForObject(":General Ledger Transactions.Query_QPushButton");
        clickButton(":General Ledger Transactions.Query_QPushButton");
        snooze(2);  
        waitForObject(":_gltrans_XTreeWidget");
        var sWidgetTreeControl = ":_gltrans_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        type(sWidgetTreeControl,"<Space>");
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
        if(sNameOfRootItem == "IN")
            test.pass("Posting Invoice has a GL entry");
        else test.fail("Posting Invoice has no GL entry");
        
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in verifying G/L entry after posting of invoice" + e);
    }    
    
  
    //-----Entering Cash Receipts-----
    try
    {
        snooze(1);
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
        snooze(1);
        waitForObject(":_aropenFrame._aropen_XTreeWidget");
        snooze(1);
        if(object.exists("{column='4' container=':_aropenFrame._aropen_XTreeWidget' text='"+invoice+"' type='QModelIndex'}"))
            test.pass("Invoice available under Receivables in AR Workbench");
        else 
            test.fail("Invoice not found under Receivables in AR Workbench");
        
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Cash Receipts");
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        waitForObject(":Cash Receipt...._QPushButton");
        clickButton(":Cash Receipt...._QPushButton");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
        var amt=findObject(":_aropen._QModelIndex").text;
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton);
        waitForObject(":Cash Receipt._currency_XLineEdit");
        
        amount = findObject(":Cash Receipt._currency_XLineEdit").text;
        
        waitForObject(":Cash Receipt_XLineEdit");
        type(":Cash Receipt_XLineEdit", amt);
        waitForObject(":Cash Receipt.Save_QPushButton");
        clickButton(":Cash Receipt.Save_QPushButton");
        waitForObject(":_amountGroup_XLineEdit");
        type(":_amountGroup_XLineEdit", amt);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");
        test.log("Cash receipt created for the Invoice");
    }
    catch(e)
    {
        test.fail("Error in creating cash receipt" + e);
    }   
    
    
    //-----Posting Cash Receipts-----
    try
    {
        waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
        clickItem(":_cashRecptTab._cashrcpt_XTreeWidget" ,"TTOYS", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_cashRecptTab.Post_QPushButton");
        clickButton(":_cashRecptTab.Post_QPushButton");
        
        waitForObject(":Receivables Workbench.Close_QPushButton");
        clickButton(":Receivables Workbench.Close_QPushButton");
        test.log("Cash receipt posted successful");
    }
    catch(e)
    {
        test.fail("Error in posting cash receipt" + e);
    }    
    
    
    //-----Verification of G/L transaction (Posting Cash Receipts)-----
    try
    {
        snooze(1);
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Reports");
        activateItem(":*.General Ledger_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
        activateItem(":*.Reports_QMenu_2", "Transactions...");
        
        waitForObject(":_accountGroup.All Accounts_QRadioButton");
        clickButton(":_accountGroup.All Accounts_QRadioButton");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_12");
        type(":_dateGroup.XDateEdit_XDateEdit_12", "0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_13");
        type(":_dateGroup.XDateEdit_XDateEdit_13", "0");
        snooze(0.5);
        waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
        clickButton(":_sourceGroup.Selected Source:_QRadioButton");
        waitForObject(":_sourceGroup._source_XComboBox");
        clickItem(":_sourceGroup._source_XComboBox", "A/R", 5, 5, 1, Qt.LeftButton);
        waitForObject(":General Ledger Transactions.Query_QPushButton");
        clickButton(":General Ledger Transactions.Query_QPushButton");
        snooze(2); 
        waitForObject(":_gltrans_XTreeWidget");
        var sWidgetTreeControl = ":_gltrans_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        type(sWidgetTreeControl,"<Space>");
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
        var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
        if(sNameOfRootItem == "CR")
            test.pass("Posting Cash Receipts has a GL entry");
        else test.fail("Posting Cash Receipts has no GL entry");
        
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in verifying G/l entry after posting cash receipt" + e);
    }    
    
    
    //-----Customer History-----
    try
    {
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
        
        if(object.exists("{column='2' container=':Customer History._custhist_XTreeWidget' text='"+invoice+"' type='QModelIndex'}"))
        {
            snooze(2); 
            test.pass(" Invoice posted and available in Customer History");
        }
        else test.fail("Invoice not available in Customer History");
        
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in viewing customer history" + e);
    }    
    
}
