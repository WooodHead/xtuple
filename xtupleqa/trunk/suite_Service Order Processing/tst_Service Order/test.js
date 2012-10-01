
function main()
{
    
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    
    //-----Editing of preferences----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
         waitForObject(":Interface Options.Show windows inside workspace_QRadioButton");
            snooze(1);
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
                snooze(0.3);
        
        if(object.exists(":Notice.Notice_QDialog"))
        {
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                clickButton(":Notice.Remind me about this again._QCheckBox");
            snooze(0.2);
            waitForObject(":Notice.OK_QPushButton");
            clickButton(":Notice.OK_QPushButton");
        }
        
        waitForObject(":User Preferences.Save_QPushButton_2");
        clickButton(":User Preferences.Save_QPushButton_2");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in editing preferences"+ e);
    }  
    
    //--------Exiting the application------
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    
    
   
    //-----Variable Declaration-----
    var sonumber, soitem, soqty, soamount,wonumber;
    
    
    //---find Application Edition------
    
    var appEdition = findApplicationEdition();
    var qty1=queryQoh("TWHEEL1","WH1",appEdition);
    
    //---- creating a sales order for REPAIRT1----
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_headerPage._custPONumber_XLineEdit_2");
        type(":_headerPage._custPONumber_XLineEdit_2", "103");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        sonumber = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "REPAIRT1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "100");
        
        soitem = findObject(":_itemGroup.ItemLineEdit_ItemLineEdit").text;
        
        soqty = findObject(":_qtyOrdered_XLineEdit_2").text;
        
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+sonumber+"' type='QModelIndex'}"))
            test.pass("Sales Order creation successful");
        else  
            test.fail("Sales Order creation failed");
        snooze(1);
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating a sales order" + e);
    }
    
    
    var wonumber = sonumber+"-1";
    
    
    //-----Releasing WorkOrders-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        mouseClick(":_dateGroup.XDateEdit_XDateEdit_3", 50, 15, 0, Qt.LeftButton);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3", "+30");
        nativeType("<Tab>");         
        waitForObject(":Release Work Orders by Planner Code.Release_QPushButton");
        clickButton(":Release Work Orders by Planner Code.Release_QPushButton");
        test.log("Work Orders released successfully");
    }
    catch(e)
    {
        test.fail("Error in releasing work orders" + e);
    }    
    
    
    
    
    //-----Verification of QOH by Item (Issue Materials to Work Order)-----.
    
    snooze(2);
    var qty1=queryQoh("TWHEEL1","WH1",appEdition);
    
    //----- Issue materials by batch
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Issue Material");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Issue Material");
        waitForObjectItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
        activateItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2");
        mouseClick(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2", 38, 11, 0, Qt.LeftButton);
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2", wonumber);
        nativeType("<Tab>");         
        waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
        clickButton(":Issue Work Order Material Batch.Post_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log(" Materials issued successfully");     
    }
    
    catch(e)
    {
        test.fail("Error in issuing materials" +e);
    }	
    
    if(appEdition == "Manufacturing")
    {
        //----- Post operation for "Inspect" operation ---------------------
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
            activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
            waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
            mouseClick(":_woGroup.VirtualClusterLineEdit_WoLineEdit", 51, 8, 0, Qt.LeftButton);
            waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
            type(":_woGroup.VirtualClusterLineEdit_WoLineEdit", wonumber);
            nativeType("<Tab>");         
            waitForObject(":_operationGroup._wooper_XComboBox");
            sendEvent("QMouseEvent", ":_operationGroup._wooper_XComboBox", QEvent.MouseButtonPress, 190, 8, Qt.LeftButton, 0);
            waitForObject(":_operationGroup._wooper_XComboBox");
            mouseClick(":_operationGroup._wooper_XComboBox", 190, 8, 0, Qt.LeftButton);
            waitForObject(":_wooper.10 - Inspect _QModelIndex");
            mouseClick(":_wooper.10 - Inspect _QModelIndex", 139, 10, 0, Qt.LeftButton);
            waitForObject(":_qty_XLineEdit_2");
            mouseClick(":_qty_XLineEdit_2", 26, 11, 0, Qt.LeftButton);
            waitForObject(":_sutimeGroup.Post Specified Setup Time:_QRadioButton");
            clickButton(":_sutimeGroup.Post Specified Setup Time:_QRadioButton");
            waitForObject(":_sutimeGroup._specifiedSutime_XLineEdit");
            type(":_sutimeGroup._specifiedSutime_XLineEdit", "20");
            nativeType("<Tab>");         
            waitForObject(":_rntimeGroup.Post Specified Run Time:_QRadioButton");
            clickButton(":_rntimeGroup.Post Specified Run Time:_QRadioButton");
            waitForObject(":_rntimeGroup._specifiedRntime_XLineEdit");
            mouseClick(":_rntimeGroup._specifiedRntime_XLineEdit", 47, 15, 0, Qt.LeftButton);
            waitForObject(":_rntimeGroup._specifiedRntime_XLineEdit");
            type(":_rntimeGroup._specifiedRntime_XLineEdit", "25");
            nativeType("<Tab>");        
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            test.pass("inspect operation is succesful");
        }
        catch(e)
        {
            test.fail("error in posting inspect operaion " +e);
        }
        
        //----- post operation for "Repair Truck" operation----
        
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
            activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
            waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
            mouseClick(":_woGroup.VirtualClusterLineEdit_WoLineEdit", 51, 8, 0, Qt.LeftButton);
            waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
            type(":_woGroup.VirtualClusterLineEdit_WoLineEdit", wonumber);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_operationGroup._wooper_XComboBox");
            sendEvent("QMouseEvent", ":_operationGroup._wooper_XComboBox", QEvent.MouseButtonPress, 190, 8, Qt.LeftButton, 0);
            waitForObject(":_operationGroup._wooper_XComboBox");
            sendEvent("QMouseEvent", ":_operationGroup._wooper_XComboBox", QEvent.MouseButtonPress, 186, 6, Qt.LeftButton, 0);
            waitForObject(":_operationGroup._wooper_XComboBox");
            mouseClick(":_operationGroup._wooper_XComboBox", 186, 6, 0, Qt.LeftButton);
            waitForObject(":_wooper.20 - Repair Truck _QModelIndex");
            mouseClick(":_wooper.20 - Repair Truck _QModelIndex", 153, 0, 0, Qt.LeftButton);
            waitForObject(":_qty_XLineEdit_2");
            mouseClick(":_qty_XLineEdit_2", 26, 11, 0, Qt.LeftButton);
            waitForObject(":_sutimeGroup.Post Specified Setup Time:_QRadioButton");
            clickButton(":_sutimeGroup.Post Specified Setup Time:_QRadioButton");
            waitForObject(":_sutimeGroup._specifiedSutime_XLineEdit");
            type(":_sutimeGroup._specifiedSutime_XLineEdit", "20");
            nativeType("<Tab>");         
            waitForObject(":_rntimeGroup.Post Specified Run Time:_QRadioButton");
            clickButton(":_rntimeGroup.Post Specified Run Time:_QRadioButton");
            waitForObject(":_rntimeGroup._specifiedRntime_XLineEdit");
            mouseClick(":_rntimeGroup._specifiedRntime_XLineEdit", 47, 15, 0, Qt.LeftButton);
            waitForObject(":_rntimeGroup._specifiedRntime_XLineEdit");
            type(":_rntimeGroup._specifiedRntime_XLineEdit", "25");
            nativeType("<Tab>");        
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            
            test.pass("Repair Truck operation is successful");
        }
        catch(e)
        {
            test.fail("Error in posting Repair Truck operation " +e);
        }
        
        //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----   
        
        
        var result=queryQoh("TWHEEL1","WH1",appEdition);
        if((qty1-parseInt(4*soqty)==result))
            test.pass("Quantity of TWHEEL1 is updated correctly");
        else
            test.fail("Quantity of TWHEEL1 is not updated correctly");
        
        
        //-----Verification of G/L transaction for WO transactions -----
        var reference = /Post Run Time Repair Truck/;
        
        verifyGL(reference);
    }
    else
    {
        //-------- Post production in postbooks and standard edition-----
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
            activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
            waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3");
            type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3", wonumber);
            nativeType("<Tab>");
            waitForObject(":_qty_XLineEdit_3");
            type(":_qty_XLineEdit_3", "100");
            if(findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked)
            {  
                clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
            }
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Exception in post production" + e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
            {
                clickButton(":Select Order for Billing.Close_QPushButton");
            }
        }
    }
    
    //---------Verify closing work order---
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Close...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "Close...");
        waitForObject(":Close Work Order.VirtualClusterLineEdit_WoLineEdit");
        type(":Close Work Order.VirtualClusterLineEdit_WoLineEdit", wonumber);
        nativeType("<Tab>");
        
        waitForObject(":Close Work Order.Close W/O_QPushButton");
        clickButton(":Close Work Order.Close W/O_QPushButton");
        snooze(1);
                
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            test.pass("Unable to close work order");
            clickButton(":Sales Order.OK_QPushButton_2");
        }
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in closing work order" + e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }
    
    //-----Verification of QOH by Item (Issue stock to ship the sales order)-----.
    
    var qty3=queryQoh(soitem,"WH1",appEdition);
    
    //-----Issue Stock to Shipping-----
    try
    {       
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber);
        snooze(0.5);
        nativeType("<Tab>");
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        nativeType("<Tab>");
        nativeType("<Return>");
        
        
        //-----Ship the Sales Order (with'Select for Billing' option checked)-----
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        
        if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
        
        if(findObject(":groupBox.Print Packing List_XCheckBox_3").checked)
            clickButton(":groupBox.Print Packing List_XCheckBox_3");
        
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issued stock and shipped the Sales Order");
    }
    catch(e)
    {
        test.fail("Error in issuing stock and shipping the sales order" + e);
    }
    //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----   
    
    
    var result3=queryQoh(soitem,"WH1",appEdition);
    if((qty3==result3))
        test.pass("Quantity of "+soitem+" is updated correctly");
    else
        test.fail("Quantity of "+soitem+" is not updated correctly");
    
    
    //-----Verification of G/L transaction for Shipping the Sales Order -----
    
    reference = /Ship Order/;
    verifyGL(reference);
    
    //-----Creating Invoices-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Create Invoices...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Create Invoices...");
        waitForObject(":Create Invoices.Create Invoices_QPushButton");
        clickButton(":Create Invoices.Create Invoices_QPushButton");
        test.log("Invoice created successful");
    }
    catch(e)
    {
        test.fail("Error in creating invoices" + e);
    }
    
    //-----Posting Invoices-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        
        waitForObject(":_list_XTreeWidget_3");
        openContextMenu(":_list_XTreeWidget_3", 16, 8, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        openContextMenu(":_list_XTreeWidget_3", 16, 5, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        test.log("Invoice posted successful");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in posting invoices" + e);
    }
    
    
    //-----Verification of G/L transaction for posting an invoice -----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        snooze(1);
        if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
        {
            waitForObject(":General Ledger Transactions.More_QToolButton_2");
            clickButton(":General Ledger Transactions.More_QToolButton_2");
        }
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit","0");
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit","0");
        snooze(1);
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton"); 
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Source", 80, 9, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget3_XComboBox");
        clickItem(":_filterGroup.widget3_XComboBox","A/R", 111, 12, 0, Qt.LeftButton);   
        
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        type(sWidgetTreeControl,"<Space>");
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
        if(sNameOfRootItem == "IN")
            test.pass("Posting an Invoice has a GL entry");
        else test.fail(" Posting an Invoice has no GL entry");
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in verifying G/L transaction after posting an invoice" + e);
    }
    if(appEdition == "Manufacturing")
    {
        //------ WO costing entries verification-------
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Costing...");
            activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Costing...");
            waitForObject(":Work Order Costing.VirtualClusterLineEdit_WoLineEdit");
            type(":Work Order Costing.VirtualClusterLineEdit_WoLineEdit", wonumber);
            
            nativeType("<Tab>");
            
            waitForObject(":Work Order Costing.Show Set Up_XCheckBox");
            if(!findObject(":Work Order Costing.Show Set Up_XCheckBox").checked)
                clickButton(":Work Order Costing.Show Set Up_XCheckBox");
            waitForObject(":Work Order Costing.Show Run Time_XCheckBox");
            if(!findObject(":Work Order Costing.Show Run Time_XCheckBox").checked)
                clickButton(":Work Order Costing.Show Run Time_XCheckBox");
            waitForObject(":Work Order Costing.Show Materials_XCheckBox");
            if(!findObject(":Work Order Costing.Show Materials_XCheckBox").checked)
                clickButton(":Work Order Costing.Show Materials_XCheckBox");
            
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Inspect' type='QModelIndex'}"))
                test.pass("Work Order's Inspect operation has setup time costing entry");
            else  
                test.fail("Work Order's Inspect operation has no setup time costing entry");
            snooze(1);
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Inspect' type='QModelIndex'}"))
                test.pass("Work Order's Inspect operation has Run Time costing entry");
            else  
                test.fail("Work Order's Inspect operation has no Run Time costing entry");
            snooze(1);
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Repair Truck' type='QModelIndex'}"))
                test.pass("Work Order's Repair Truck operation has setup time costing entry");
            else  
                test.fail("Work Order's Repair Truck operation has no setup time costing entry");
            snooze(1);
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Repair Truck' type='QModelIndex'}"))
                test.pass("Work Order's Repair Truck operation has Run Time costing entry");
            else  
                test.fail("Work Order's Repair Truck operation has no Run Time costing entry"); 
            snooze(1);
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Truck Wheel Type 1' type='QModelIndex'}"))
                test.pass("Work Order's Material issue (TWHEEL1)transaction has a costing entry");
            else  
                test.fail("Work Order's Material issue (TWHEEL1)transaction has no costing entry");
            snooze(1);
            
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            
            test.log("WO costing entries are verified successfully");
        }
        catch(e)
        { 
            test.fail("Error in verifying WO costing entries"+e);
        }
    }
    //-------- verifying the WO history by item-----
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "History");
        activateItem(":xTuple ERP:*.Reports_QMenu", "History");
        waitForObjectItem(":xTuple ERP:*.History_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.History_QMenu", "by Item...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        mouseClick(":_itemGroup.ItemLineEdit_ItemLineEdit", 45, 15, 0, Qt.LeftButton);
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", soitem);
        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
        type(":_dateGroup.XDateEdit_XDateEdit_4", "-10");        
        nativeType("<Tab>");         
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_5");
        type(":_dateGroup.XDateEdit_XDateEdit_5", "+10");      
        nativeType("<Tab>"); 
        if(appEdition!="PostBooks")
        {
            waitForObject(":_warehouse.All Sites_QRadioButton_2");
            clickButton(":_warehouse.All Sites_QRadioButton_2");
        }
        waitForObject(":_showGroup.Show Work Order Cost_XCheckBox");
        clickButton(":_showGroup.Show Work Order Cost_XCheckBox");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_showGroup.Only Show Top Level Work Orders_XCheckBox");
        clickButton(":_showGroup.Only Show Top Level Work Orders_XCheckBox");
        var treeObject = findObject(":_list_XTreeWidget_3");
        var rootItem = treeObject.invisibleRootItem();
        var count = rootItem.childCount();
        var row,i,num;
        var flag = 0;
        for(i=0;i<count;i++)
        {
            row = rootItem.child(i);
            num = row.text(0);
            if(num == wonumber)
            {
                flag = 1;
                break;
            }
        }
        waitForObject(":_list_XTreeWidget_3");
        if(flag == 1)  
            test.pass(" "+soitem+" item has Work Order history");
        else  
            test.fail(""+soitem+" item has no Work Order history");
        snooze(0.5);
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("error in verifying the item history ny item" +e);
    }
    
}

