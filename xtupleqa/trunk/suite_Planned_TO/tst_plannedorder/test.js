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
    
    var appEdition = findApplicationEdition();
    
    //---------------Create new Site - WH3----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Site");
        waitForObjectItem(":xTuple ERP:*.Site_QMenu", "List...");
        activateItem(":xTuple ERP:*.Site_QMenu", "List...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "WH3");
        
        waitForObject(":_sitetype_XComboBox");
        clickItem(":_sitetype_XComboBox","DIST", 0, 0, 5, Qt.LeftButton);
        
        if(!findObject(":Site.Active_QCheckBox").checked)
            clickButton(":Site.Active_QCheckBox");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Prodiem Distribution 2");
        waitForObject(":_addressGroup.XLineEdit_XLineEdit");
        type(":_addressGroup.XLineEdit_XLineEdit", "street1");
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
        type(":Cash Receipt.XLineEdit_XLineEdit_2", "street2");
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        type(":Cash Receipt.XLineEdit_XLineEdit", "street3");
        type(":_addressGroup.XLineEdit_XLineEdit_2", "City");
        waitForObject(":_addressGroup._state_XComboBox");
        type(":_addressGroup._state_XComboBox", "VA");
        waitForObject(":_addressGroup.XLineEdit_XLineEdit_3");
        type(":_addressGroup.XLineEdit_XLineEdit_3", "509876");
        waitForObject(":_addressGroup._country_XComboBox");
        type(":_addressGroup._country_XComboBox", "United States");
        
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit","01-01-1950-01");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_defaultGroup._taxzone_XComboBox");
        clickItem(":_defaultGroup._taxzone_XComboBox","GA TAX-Georgia Sales Tax", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":_numberGroup._bolNumber_XLineEdit");
        type(":_numberGroup._bolNumber_XLineEdit", "10020");
        
        waitForObject(":_numberGroup._countTagNumber_XLineEdit");
        type(":_numberGroup._countTagNumber_XLineEdit", "20020");
        
        if(!findObject(":_optionsGroup.Shipping Site_QCheckBox").checked)
        {
            clickButton(":_optionsGroup.Shipping Site_QCheckBox");
        }
        waitForObject(":_planGroup._sequence_XSpinBox");
        type(":_planGroup._sequence_XSpinBox", "3");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Contact");
        
        waitForObject(":_contactGroup.VirtualClusterLineEdit_ContactClusterLineEdit");
        type(":_contactGroup.VirtualClusterLineEdit_ContactClusterLineEdit","Frank Farley");
        
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        if(object.exists("{column='0' container=':xTuple ERP:*._warehouse_XTreeWidget' text='WH3' type='QModelIndex'}"))
            test.pass("Ware house WH3 created");
        else
            test.pass("Ware house WH3 creation failed");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in creating new site" + e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    
    //------------------Create item site with 'Create Planned TO' enabled------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        
        waitForObject(":Item Site.ItemLineEdit_ItemLineEdit");
        type(":Item Site.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_warehouse_WComboBox_2");
        clickItem(":_warehouse_WComboBox_2","WH3", 0, 0, 5, Qt.LeftButton);
        
        if(!findObject(":Items.Site can manufacture this Item_QGroupBox").checked)
        {
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        }
        if(!findObject(":Item Site.Site can purchase this Item_QGroupBox").checked)
        {
            type(":Item Site.Site can purchase this Item_QGroupBox"," ");
        }
        
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2","MRP-MRP Items", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2","DISTRIBUTION-Distribution - WH2", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Planning");
        
        waitForObject(":Scheduling._planningType_XComboBox");
        clickItem(":Scheduling._planningType_XComboBox","MRP", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":_leadTime_QSpinBox");
        type(":_leadTime_QSpinBox", "3");
        
        waitForObject(":Scheduling.Create Planned Transfer Orders_QGroupBox");
        if(!findObject(":Scheduling.Create Planned Transfer Orders_QGroupBox").checked)
        {
            type(":Scheduling.Create Planned Transfer Orders_QGroupBox"," ");
        }
        
        waitForObject(":Create Planned Transfer Orders._suppliedFromSite_WComboBox");
        clickItem(":Create Planned Transfer Orders._suppliedFromSite_WComboBox", "WH1", 0, 0, 5, Qt.LeftButton);
        
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        {
            type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
        }
        findObject(":_reorderLevel_XLineEdit").clear();
        type(":_reorderLevel_XLineEdit", "100");
        findObject(":_orderMultiple_XLineEdit").clear();
        type(":_orderMultiple_XLineEdit", "100");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox", "Item", 0, 0, 5,Qt.LeftButton);
        
        waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit");
        type(":_filterGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='WH3' type='QModelIndex'}"))
        {
            test.pass("Item site created for YTRUCK1 at WH3");
        }
        else
        {
            test.fail("Item site not created for YTRUCK1 at WH3");
        }
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in creating the itemsite " + e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }
    
    var qohWh1 = queryQoh("YTRUCK1","WH1",appEdition);
    var qohWh2 = "0";
    
    if(qohWh1 < "100")
    {
        qohWh1 = adjustQoh("YTRUCK1","100","WH1","");
    }
    
    //-----------Retrieve next Planned Order Number------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Setup...");
        snooze(2);
        var PONUM = findObject(":_stack._nextPlanNumber_XLineEdit").text;
        test.log(PONUM);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        
    }
    catch(e)
    {
        test.fail("Exception in receiving Planned order number:" + e);
        if(object.exists(":Cash Receipt.Save_QPushButton_3"))
            clickButton(":Cash Receipt.Save_QPushButton_3");
    }
    //--------Run MRP by planner code------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        waitForObjectItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
        activateItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
        
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton");
        
        waitForObject(":_warehouse.All Sites_QRadioButton_2");
        clickButton(":_warehouse.All Sites_QRadioButton_2");
        
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "+99");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        snooze(1);
    }
    catch(e)
    {
        test.fail("Exception in Run MRP by Planner code");
    }
    
    //---------------Create a Planned Transfer order ------------------
    try
    {
        PONUM++;
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        mouseClick(":_itemGroup.ItemLineEdit_ItemLineEdit", 26, 10, 0, Qt.LeftButton);
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_itemGroup._warehouse_WComboBox");
        clickItem(":_itemGroup._warehouse_WComboBox", "WH2",74, 8, 0, Qt.LeftButton);
        waitForObject(":_typeGroup.Transfer Order_QRadioButton");
        clickButton(":_typeGroup.Transfer Order_QRadioButton");
        
        waitForObject(":_typeGroup._fromWarehouse_WComboBox");
        clickItem(":_typeGroup._fromWarehouse_WComboBox", "WH1",74, 8, 0, Qt.LeftButton);
        
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "+7");
        
        waitForObject(":_qtyGroup._leadTime_QSpinBox").clear();
        type(":_qtyGroup._leadTime_QSpinBox", "3");
        
        waitForObject(":Planned Order.Save_QPushButton");
        clickButton(":Planned Order.Save_QPushButton");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in creating planned order :" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
    
    //--------Verify Planned order creation--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='T/O' type='QModelIndex'}"))
        {
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='WH3' type='QModelIndex'}"))
            {
                test.pass("Planned Transfer order created for WH3");
            }
            else
                test.fail("Planned Transfer order is not created for WH3");
        }
        else
            test.fail("Planned Transfer order not created");
        snooze(1);
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ PONUM +"-1' type='QModelIndex'}"))
        {
            test.pass("Planned Transfer order created for WH2");
        }
        else
            test.fail("Planned Transfer order is not created for WH2");
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying planned order creation" + e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    //-----------Retrieve next Transfer Order Number------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
        snooze(1);
        waitForObject(":_toNextNum_XLineEdit");
        var TONUM = findObject(":_toNextNum_XLineEdit").text;
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        
    }
    catch(e)
    {
        test.fail("Exception in receiving TO number:" + e);
        if(object.exists(":Cash Receipt.Save_QPushButton_3"))
            clickButton(":Cash Receipt.Save_QPushButton_3");
    }
    //-----------------Release the planned TO-----------------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",PONUM+"-1",5,5,Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
        if(object.exists(":Sales Order.No_QPushButton_2"))
        {
            clickButton(":Sales Order.No_QPushButton_2");
        }
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
        waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
        
        if(object.exists("{column='0' container=':_frame._to_XTreeWidget' text='"+TONUM+"' type='QModelIndex'}"))
            test.pass("Planned Transfer order created");
        else
            test.fail("Planned Transfer order creation failed");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in releasing the planned Transfer order :"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(":Sales Order.Cancel_QPushButton");
        }
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    // var TONUM = "99013";
    //---------------Release the Transfer order---------------------    
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
        waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "Release by Agent...");
        activateItem(":xTuple ERP:*.Transfer Order_QMenu", "Release by Agent...");
        waitForObject(":groupBox.All Agents_QRadioButton");
        clickButton(":groupBox.All Agents_QRadioButton");
        waitForObject(":Release Transfer Orders by Agent.Release_QPushButton");
        clickButton(":Release Transfer Orders by Agent.Release_QPushButton");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        
    }
    
    catch(e)
    {
        test.fail("Error in releasing transfer orders" + e);
    }
    
    //-----------------Issue stock and ship the order-----------------
    
    issueStock(TONUM);
    
    //-----------------------------Receive inventory for Transfer Order---------------------------   
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit",TONUM);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in receiving inventory for TO" + e);
    }
    
    //---------------------Shipments by Date--------------------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Reports");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Shipments");
        activateItem(":xTuple ERP:*.Reports_QMenu_2", "Shipments");
        waitForObjectItem(":xTuple ERP:*.Shipments_QMenu", "by Date...");
        activateItem(":xTuple ERP:*.Shipments_QMenu", "by Date...");
        
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        waitForObject(":Shipments by Date.XDateEdit_XDateEdit");
        type(":Shipments by Date.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='"+ TONUM +"' type='QModelIndex'}"))
        {
            test.pass("Transfer Order verified in shipments screen");
        }
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying shipments: " + e);
    }    
    
}
