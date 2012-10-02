function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
   //-----Editing of preferences----
        try
        {
            if(OS.name == "Darwin")
            {
              activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
              activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Preferences..."));
            }
            else
            {

        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
    }
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
    
  //-----------Inventory setup------------
    if(appEdition != "PostBooks")
    {
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
            waitForObject(":_toNumGeneration_QComboBox");
            clickItem(":_toNumGeneration_QComboBox", "Automatic",0,0,5,Qt.LeftButton);
            waitForObject(":_defaultTransWhs_WComboBox");
            clickItem(":_defaultTransWhs_WComboBox","INTRAN",0,0,5,Qt.LeftButton);
            waitForObject(":Cash Receipt.Save_QPushButton_3");
            clickButton(":Cash Receipt.Save_QPushButton_3");
            
        }
        catch(e)
        {
            test.fail("Unable to setup the inventory" + e);
            if(object.exists(":Cash Receipt.Save_QPushButton_3"))
                clickButton(":Cash Receipt.Save_QPushButton_3");
        }
    }
        else
        {
            test.log("Can't process Transfer Orders in PostBooks Edition");
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
            activateItem(":xTuple ERP: *_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
            activateItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
            
        }
        //--------------- Set the window to Tab view mode -------------
        tabView();
    
        //------Creating a Tooling item------
        try
        {
            snooze(3);
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
            activateItem(":xTuple ERP: *_QMenuBar", "Products");
            waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
            activateItem(":xTuple ERP:*.Products_QMenu", "Item");
            waitForObjectItem(":xTuple ERP:*.Item_QMenu", "New...");
            activateItem(":xTuple ERP:*.Item_QMenu", "New...");
            waitForObject(":_itemNumber_XLineEdit");
            type(":_itemNumber_XLineEdit", "TTOOL1");
            waitForObject(":_description1_XLineEdit");
            type(":_description1_XLineEdit", "Tooling item");
            waitForObject(":_itemtype_XComboBox_2");
            clickItem(":_itemtype_XComboBox_2","Tooling",0,0, 5, Qt.LeftButton);
            waitForObject(":_itemGroup._classcode_XComboBox");
            clickItem(":_itemGroup._classcode_XComboBox", "TOYS-OTHER-Toys Other Items", 171, 12, 0, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":_inventoryUOM_XComboBox_2");
            clickItem(":_inventoryUOM_XComboBox_2", "EA", 0, 0, 1, Qt.LeftButton);
            waitForObject(":_itemGroup._freightClass_XComboBox");
            clickItem(":_itemGroup._freightClass_XComboBox", "BULK-Bulk Freight", 0, 0, 1, Qt.LeftButton);
             snooze(2);
            if(findObject(":xTuple ERP:*.Item is Sold_QGroupBox").checked)
              mouseClick(":xTuple ERP:*.Item is Sold_QGroupBox", 76, 14, 0, Qt.LeftButton);
            snooze(1);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Sites");
            
            //---------Item site creation - WH1-----
            waitForObject(":_itemsitesTab.New_QPushButton");
            clickButton(":_itemsitesTab.New_QPushButton");
             waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2","WH1",5,5, 0, Qt.LeftButton);
            snooze(2);
            if(!findObject(":Item Site.Active_QCheckBox").checked)
                clickButton(":Item Site.Active_QCheckBox");
           
            waitForObject(":_plannerCode_XComboBox_3");
            clickItem(":_plannerCode_XComboBox_3","MRP-MRP Items",5,5, 0, Qt.LeftButton);
            waitForObject(":_costcat_XComboBox_3");
            clickItem(":_costcat_XComboBox_3","MATERIALS-Materials - WH1",5,5, 0, Qt.LeftButton);
            snooze(1);
             if(!findObject(":Item Site.Active_QCheckBox").checked)
                clickButton(":Item Site.Active_QCheckBox");
            waitForObject(":Select Order for Billing.Save_QPushButton_2");
            clickButton(":Select Order for Billing.Save_QPushButton_2");
            test.log("site WH1 is created for TTOOL1 Item");
            
            //---------Item site creation - WH2-----
            snooze(2);
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2","WH2",0,0, 5, Qt.LeftButton);
            
            waitForObject(":_plannerCode_XComboBox_3");
            clickItem(":_plannerCode_XComboBox_3","MRP-MRP Items",0,0, 5, Qt.LeftButton);
            waitForObject(":_plannerCode_XComboBox_3");
            clickItem(":_plannerCode_XComboBox_3","MRP-MRP Items",5,5, 0, Qt.LeftButton);
            waitForObject(":_costcat_XComboBox_3");
            clickItem(":_costcat_XComboBox_3","DISTRIBUTION-Distribution - WH2",5,5, 0, Qt.LeftButton);
            snooze(2);
            if(!findObject(":Item Site.Active_QCheckBox").checked)
                clickButton(":Item Site.Active_QCheckBox");
            waitForObject(":Select Order for Billing.Save_QPushButton_2");
            clickButton(":Select Order for Billing.Save_QPushButton_2");
            test.log("site WH2 is created for TTOOL1 Item");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");    
        }
        catch(e)
        {
            test.fail("Error in creating item " + e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
            {
                clickButton(":Sales Order.Cancel_QPushButton");
            }
        }
        
        
        //-------Create item site for YPAINT2 in WH2----------
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
            if(!(object.exists(":_filterGroup.Manage_QPushButton")))
            {
                waitForObject(":Quantities on Hand.More_QToolButton");
                clickButton(":Quantities on Hand.More_QToolButton");
            }
            waitForObject(":_filterGroup.xcomboBox1_XComboBox");
            clickItem(":_filterGroup.xcomboBox1_XComboBox","Item",10,10,0,Qt.LeftButton);
            waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit");
            type(":_filterGroup.ItemLineEdit_ItemLineEdit", "YPAINT1");
            nativeType("<Tab>");
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton");
            waitForObject(":_filterGroup.xcomboBox2_XComboBox");
            clickItem(":_filterGroup.xcomboBox2_XComboBox","Site",10,10,0,Qt.LeftButton);
            waitForObject(":_filterGroup.widget2_WComboBox");
            clickItem(":_filterGroup.widget2_WComboBox","WH1",10,10,0,Qt.LeftButton);  
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");   
            waitForObject(":_list_XTreeWidget_3");
            clickItem(":_list_XTreeWidget_3","YPAINT1",10,10,0,Qt.LeftButton);
            openItemContextMenu(":_list_XTreeWidget_3","YPAINT1", 10, 10, 10);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2","WH2", 0, 0, 5, Qt.LeftButton);
            snooze(2);
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        catch(e)
        {
            test.fail("Error in creating item site " + e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
            {
                clickButton(":Sales Order.Cancel_QPushButton");
            } 
            
        }
      var lotQohWh1 = queryQoh("YPAINT1","WH1",appEdition);
      test.log(lotQohWh1);
      var lotQohWh2 = queryQoh("YPAINT1","WH2",appEdition);
      test.log(lotQohWh2);
        var regQohWh1 = queryQoh("YTRUCK1","WH1",appEdition);
        var regQohWh2 = queryQoh("YTRUCK1","WH2",appEdition);
        var mlcQohWh1 = queryQoh("WTRUCK1","WH1",appEdition);
        var mlcQohWh2 = queryQoh("WTRUCK1","WH2",appEdition);
        var serialQohWh1 = queryQoh("STRUCK1","WH1",appEdition);
        var serialQohWh2 = queryQoh("STRUCK1","WH2",appEdition);
        var toolQohWh1 = adjustQoh("TTOOL1","100","WH1","",appEdition);
        var toolQohWh2 = "0";
        
        if(mlcQohWh1<"100")
        {
            mlcQohWh1 = adjustQoh("WTRUCK1","100","WH1","");
        }
        if(serialQohWh1<"1")
        {
            serialQohWh1 = adjustQoh("STRUCK1","1","WH1","SERIAL10");
        }
        if(lotQohWh1<"10")
        {
            lotQohWh1 = adjustQoh("YPAINT1","10","WH1","LOT21");
        }
        if(regQohWh1<"300")
        {
            regQohWh1 = adjustQoh("YTRUCK1","300","WH1","");
        }
        
        
        //---------------Create new Transfer Order for regular item--------
        var regto = createTo("YTRUCK1","100","WH1","WH2");
        var mlcto = createTo("WTRUCK1","100","WH1","WH2");
        var lotto = createTo("YPAINT1","10","WH1","WH2");
        var toolto = createTo("TTOOL1","100","WH1","WH2");
        var serialto = createTo("STRUCK1","1","WH1","WH2");
        var drto = createTo("YTRUCK1","100","WH1","WH2");
        
        //-----------Retrieve next Transfer Order Number------------
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
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
        //---------------Create a Planned Transfer order ------------------
        try
        {
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
            
            waitForObject(":_qtyGroup._leadTime_QSpinBox");
            type(":_qtyGroup._leadTime_QSpinBox", "<3>");
            
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
            openItemContextMenu(":_list_XTreeWidget_3","T/O",5,5,Qt.LeftButton)
                    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
            snooze(2);
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
            snooze(1);
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
            snooze(3);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
            {
                clickButton(":Sales Order.Cancel_QPushButton");
            }
            if(object.exists(":Quotes.Close_QToolButton"))
            {
                clickButton(":Quotes.Close_QToolButton");
            }
        }
        
        
        //---------------Release the transfer orders---------------------    
        
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
            waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
            activateItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
            waitForObject(":_frame._to_XTreeWidget");
            
            clickItem(":_frame._to_XTreeWidget",regto,10,10,0,Qt.LeftButton);
            waitForObject(":_frame.Release_QPushButton");
            clickButton(":_frame.Release_QPushButton");    
            snooze(1);
            
            clickItem(":_frame._to_XTreeWidget",toolto,10,10,0,Qt.LeftButton);
            waitForObject(":_frame.Release_QPushButton");
            clickButton(":_frame.Release_QPushButton");    
            snooze(1);
            
            clickItem(":_frame._to_XTreeWidget",mlcto,10,10,0,Qt.LeftButton);
            waitForObject(":_frame.Release_QPushButton");
            clickButton(":_frame.Release_QPushButton");    
            snooze(1);
            
            clickItem(":_frame._to_XTreeWidget",serialto,10,10,0,Qt.LeftButton);
            waitForObject(":_frame.Release_QPushButton");
            clickButton(":_frame.Release_QPushButton");    
            snooze(1);
            
            clickItem(":_frame._to_XTreeWidget",lotto,10,10,0,Qt.LeftButton);
            waitForObject(":_frame.Release_QPushButton");
            clickButton(":_frame.Release_QPushButton");    
            snooze(1);
            
            clickItem(":_frame._to_XTreeWidget",drto,10,10,0,Qt.LeftButton);
            waitForObject(":_frame.Release_QPushButton");
            clickButton(":_frame.Release_QPushButton");    
            snooze(1);
            
            clickItem(":_frame._to_XTreeWidget",TONUM,10,10,0,Qt.LeftButton);
            waitForObject(":_frame.Release_QPushButton");
            clickButton(":_frame.Release_QPushButton");    
            snooze(1);
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        
        catch(e)
        {
            test.fail("Error in releasing transfer orders" + e);
        }
        //------- Do Nothing--------
        if(OS.name != "Windows")
        {
            try{
                activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM"));
                activateItem(waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Setup..."));
                
                clickButton(waitForObject(":Cash Receipt Application.Cancel_QPushButton"));
                test.log("1st Do nothing Block");
            }
            catch(e)
            {
            }
            try{
                activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM"));
                activateItem(waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Setup..."));
                
                clickButton(waitForObject(":Cash Receipt Application.Cancel_QPushButton"));
                test.log("1st Do nothing Block");
            }
            catch(e)
            {
            }
        }
        
        //-------------------Issue stock----------------------------
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
            type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit",TONUM); 
            nativeType("<Tab>");
            waitForObject(":_frame.Issue All_QPushButton");
            clickButton(":_frame.Issue All_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Exception in issueing stock: " + e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
            {
                clickButton(":Select Order for Billing.Close_QPushButton");
            }
        }
        //--------------------Verify Shipping Information---------------
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Maintain Shipping Contents...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Maintain Shipping Contents...");
            waitForObject(":Receivables Workbench.Query_QPushButton");
            clickButton(":Receivables Workbench.Query_QPushButton");
            snooze(1);
            if(object.exists("{column='2' container=':_ship_XTreeWidget' text='"+TONUM+"' type='QModelIndex'}"))
                test.pass("Stock at shipping is displayed in Maintain Shipping screen");
            else
                test.pass("Stock at shipping is displayed in Maintain Shipping screen");
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Exception in verifying maintain shipping contents: "+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
            {
                clickButton(":Select Order for Billing.Close_QPushButton");
            }
            
        }
        //-------------------Verify Qoh for issue stock------------------
        var result = queryQoh("YTRUCK1","WH1");
        if(parseInt(regQohWh1) - result=="100")
            test.pass("Quantity of YTRUCK1 is updated correctly at WH1");
        else
            test.fail("Quantity of YTRUCK1 is not updated correctly at WH1"); 
        
        regQohWh1 = result;
        
        
        //-------------------Issuing stock and ship the order--------------
        
        issueStock(regto);
        issueStock(toolto);
        issueStock(mlcto);
        var lotno = issueStock(lotto);
        var serialno = issueStock(serialto);
        
        
        //-------------------Verification of updated QOH by Item at WH1----
        
        result = queryQoh("YTRUCK1","WH1",appEdition);
        if(parseInt(regQohWh1) - result=="100")
            test.pass("Quantity of YTRUCK1 is updated correctly for Ship order at WH1");
        else
            test.fail("Quantity of YTRUCK1 is not updated correctly for Ship order at WH1");
        
        result = queryQoh("TTOOL1","WH1",appEdition);
        if(parseInt(toolQohWh1) - result=="100")
            test.pass("Quantity of TTOOL1 is updated correctly for Ship order at WH1");
        else
            test.fail("Quantity of TTOOL1 is not updated correctly for Ship order at WH1");
        
        result = queryQoh("WTRUCK1","WH1",appEdition);
        if(parseInt(mlcQohWh1) - result=="100")
            test.pass("Quantity of WTRUCK1 is updated correctly for Ship order at WH1");
        else
            test.fail("Quantity of WTRUCK1 is not updated correctly for Ship order at WH1");
        
        result = queryQoh("YPAINT1","WH1",appEdition);
        if(parseInt(lotQohWh1) - result=="10")
            test.pass("Quantity of YPAINT1 is updated correctly for Ship order at WH1");
        else
            test.fail("Quantity of YPAINT1 is not updated correctly for Ship order at WH1");
        
        result = queryQoh("STRUCK1","WH1",appEdition);
        if(parseInt(serialQohWh1) - result=="1")
            test.pass("Quantity of STRUCK1 is updated correctly for Ship order at WH1");
        else
            test.fail("Quantity of STRUCK1 is not updated correctly for Ship order at WH1");
        
        
        
        //--------------------------Receive inventory for Transfer Orders---------------------------   
        
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
            waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
            activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
            
            //----------Regular item------------
            waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
            type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit",regto);
            snooze(0.5);
            nativeType("<Tab>");
            waitForObject(":_frame.Receive All_QPushButton");
            clickButton(":_frame.Receive All_QPushButton");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            
            //----------lot item-----------------
            waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
            type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit",lotto);
            snooze(0.5);
            nativeType("<Tab>");
            waitForObject(":_frame.Receive All_QPushButton");
            clickButton(":_frame.Receive All_QPushButton");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":Create Lot/Serial #._lotSerial_XComboBox");
            clickItem(":Create Lot/Serial #._lotSerial_XComboBox",lotno, 0, 0, 5, Qt.LeftButton);
            waitForObject(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit");
            type(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit", "10");
            waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
            type(":xTuple ERP:*.XDateEdit_XDateEdit", "+100");
            nativeType("<Tab>");
            waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
            waitForObject(":Sales Order.Yes_QPushButton");
            clickButton(":Sales Order.Yes_QPushButton");
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            
            
            //------------Tooling item--------------
            waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
            type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit",toolto);
            snooze(0.5);
            nativeType("<Tab>");
            waitForObject(":_frame.Receive All_QPushButton");
            clickButton(":_frame.Receive All_QPushButton");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            
            //------------mlc item-------------------
            waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
            type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit",mlcto);
            snooze(0.5);
            nativeType("<Tab>");
            waitForObject(":_frame.Receive All_QPushButton");
            clickButton(":_frame.Receive All_QPushButton");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            
            //------------serial item-----------------
            waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
            type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit",serialto);
            snooze(0.5);
            nativeType("<Tab>");
            waitForObject(":_frame.Receive All_QPushButton");
            clickButton(":_frame.Receive All_QPushButton");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            snooze(2);
            waitForObject(":Create Lot/Serial #._lotSerial_XComboBox");
            clickItem(":Create Lot/Serial #._lotSerial_XComboBox","SRN7", 0, 0, 5, Qt.LeftButton);
            snooze(2);
            nativeType("<Tab>");
            waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
            snooze(2);
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        
        catch(e)
        {
            test.fail("Exception in receiving item: " + e);
        }
        
        //-------------------Verification of updated QOH by Item at WH2----
        
        var result=queryQoh("YTRUCK1","WH2",appEdition);
        if(result - parseInt(regQohWh2)=="100")
            test.pass("Quantity of YTRUCK1 is updated correctly for Post Receipt at WH2");
        else
            test.fail("Quantity of YTRUCK1 is not updated correctly Post Receipt at WH2");
        
        result = queryQoh("TTOOL1","WH2",appEdition);
        if(result - parseInt(toolQohWh2)=="100")
            test.pass("Quantity of TTOOL1 is updated correctly Post Receipt at WH2");
        else
            test.fail("Quantity of TTOOL1 is not updated correctly Post Receipt at WH2");
        //------- Do Nothing--------
        if(OS.name != "Windows")
        {
            try{
                activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM"));
                activateItem(waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Setup..."));
                
                clickButton(waitForObject(":Cash Receipt Application.Cancel_QPushButton"));
                test.log("1st Do nothing Block");
            }
            catch(e)
            {
            }
            try{
                activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM"));
                activateItem(waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Setup..."));
                
                clickButton(waitForObject(":Cash Receipt Application.Cancel_QPushButton"));
                test.log("1st Do nothing Block");
            }
            catch(e)
            {
            }
        }
        result = queryQoh("WTRUCK1","WH2",appEdition);
        if(result - parseInt(mlcQohWh2)=="100")
            test.pass("Quantity of WTRUCK1 is updated correctly Post Receipt at WH2");
        else
            test.fail("Quantity of WTRUCK1 is not updated correctly Post Receipt at WH2");
        
        result = queryQoh("YPAINT1","WH2",appEdition);
        if(result - parseInt(lotQohWh2)=="10")
            test.pass("Quantity of YPAINT1 is updated correctly Post Receipt at WH2");
        else
            test.fail("Quantity of YPAINT1 is not updated correctly Post Receipt at WH2");
        
        result = queryQoh("STRUCK1","WH2",appEdition);
        if(result - parseInt(serialQohWh2)=="1")
            test.pass("Quantity of STRUCK1 is updated correctly Post Receipt at WH2");
        else
            test.fail("Quantity of STRUCK1 is not updated correctly Post Receipt at WH2");
        
        //-------------------Verification of inventory history ------------
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "History...");
            activateItem(":xTuple ERP: *_.Reports_QMenu", "History...");
            snooze(1);
            if(!object.exists(":_filterGroup.Manage_QPushButton"))
            {
                waitForObject(":Quantities on Hand.More_QToolButton");
                clickButton(":Quantities on Hand.More_QToolButton");
            }
            snooze(1);
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton");
            waitForObject(":_filterGroup.xcomboBox3_XComboBox");
            clickItem(":_filterGroup.xcomboBox3_XComboBox", "Item",0, 0, 5, Qt.LeftButton);     
            
            waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit");
            type(":_filterGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(1);
            if(object.exists("{column='5' container=':_list_XTreeWidget_3' text='TO-"+ regto +"-1' type='QModelIndex'}"))
                test.pass("Inventory history exists for item 'YTRUCK1'");
            else
                test.fail("Inventory history doesn't exists for item 'YTRUCK1'");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            
        }
        catch(e)
        {
            test.fail("exception in verifying inventory history: " + e);
            if(object.exists(":Quotes.Close_QToolButton"))
            {
                clickButton(":Quotes.Close_QToolButton");
            }
        }
        
        
        var drQohwh1 = queryQoh("YTRUCK1","WH1",appEdition);
        var drQohwh2 = queryQoh("YTRUCK1","WH2",appEdition);
        
        //---------------------Ship order with receive immediately option enabled-----
        
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
            type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit",drto); 
            nativeType("<Tab>");
            waitForObject(":_frame.Issue All_QPushButton");
            clickButton(":_frame.Issue All_QPushButton");
            waitForObject(":Issue to Shipping.Ship_QPushButton");
            clickButton(":Issue to Shipping.Ship_QPushButton");
            if(!findObject(":groupBox.Receive Immediately_XCheckBox").checked)
            {
                waitForObject(":groupBox.Receive Immediately_XCheckBox");
                clickButton(":groupBox.Receive Immediately_XCheckBox");
                
            }
            
            waitForObject(":Issue to Shipping.Ship_QPushButton_2");
            clickButton(":Issue to Shipping.Ship_QPushButton_2");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Exception in Shipping the order with Receive immediately enabled: " + e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
            {
                clickButton(":Select Order for Billing.Close_QPushButton");
            }
            
        }
        
        //---------------------Verificaton of updated Qoh ---------------
        result = queryQoh("YTRUCK1","WH1",appEdition);
        if(parseInt(drQohwh1) - result == "100")
        {
            test.pass("Quantity of YTRUCK1 is updated correctly at WH1");
        }
        else
        {
            test.fail("Quantity of YTRUCK1 is not updated correctly at WH1");
        }
        result = queryQoh("YTRUCK1","WH2",appEdition);
        if(result - parseInt(drQohwh2) == "100")
        {
            test.pass("Quantity of YTRUCK1 is updated correctly at WH2");
        }
        else
        {
            test.fail("Quantitiy of YTRUCK1 is not updated correctly at WH2");
        }
        
        //---------------------Verification of G/L Transactions-----------
        
        try
        {
            var text = new Array(3);
            text[0] = /Issue to Shipping/;
            text[1] = /Ship from Src to Transit Warehouse/;
            text[2] = /Inter-Warehouse Transfer/;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
            activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
            snooze(1);
            
            if(!(object.exists(":xTuple ERP:*.XDateEdit_XDateEdit")))
            {
                waitForObject(":Quantities on Hand.More_QToolButton");
                clickButton(":Quantities on Hand.More_QToolButton");
            }
            waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
            findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
            type(":xTuple ERP:*.XDateEdit_XDateEdit","0");
            waitForObject(":_filterGroup.XDateEdit_XDateEdit");
            findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
            type(":_filterGroup.XDateEdit_XDateEdit","0");
            snooze(1);
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton"); 
            waitForObject(":_filterGroup.xcomboBox3_XComboBox");
            clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);
            snooze(1);
            waitForObject(":_filterGroup.widget3_QLineEdit");
            type(":_filterGroup.widget3_QLineEdit",drto + "-1");   
            
            
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(0.5);
            
            
            for(var x=0;x<3;x++)
            {
                
                waitForObject(":_list_XTreeWidget_3");
                var sWidgetTreeControl = ":_list_XTreeWidget_3";
                waitForObject(sWidgetTreeControl);
                var obj_TreeWidget = findObject(sWidgetTreeControl);
                var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
                var obj = obj_TreeWidget.topLevelItemCount;
                for(var y=0;y<obj;y++)
                {
                    var obj_TreeTopLevelItem = obj_TreeWidget.topLevelItem(y);
                    var sNameOfRootItem = obj_TreeTopLevelItem.text(4);
                    var bool = text[x].test(sNameOfRootItem);
                    if(bool)
                    {    
                        break;
                    }
                    
                }
                if(bool)
                    test.pass("G/L entry is verified ");
                else
                    test.fail("No G/L Entry made");
            }
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton"); 
        }
        catch(e)
        {
            test.fail("Error in verifying G/L transaction after receiving PO" + e);
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
            if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='"+ regto +"' type='QModelIndex'}"))
            {
                test.pass("Regular item TO verified in shipments screen");
            }
            if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='"+ lotto +"' type='QModelIndex'}"))
            {
                test.pass("Lot item TO verified in shipments screen");
            }
            if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='"+ toolto +"' type='QModelIndex'}"))
            {
                test.pass("Tooling item TO verified in shipments screen");
            }
            if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='"+ serialto +"' type='QModelIndex'}"))
            {
                test.pass("Serial item TO verified in shipments screen");
            }
            if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='"+ mlcto +"' type='QModelIndex'}"))
            {
                test.pass("MLC item TO verified in shipments screen");
            }
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        catch(e)
        {
            test.fail("Exception in verifying shipments: " + e);
        }
    }
    