function main()
{
    
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(3);
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
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
            activateItem(":xTuple ERP:*.System_QMenu", "Preferences..."); 
         }
        snooze(0.5);
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
        snooze(0.3);
        if(object.exists(":Notice.Notice_QDialog"))
        {
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                clickButton(":Notice.Remind me about this again._QCheckBox");
            snooze(0.2);
            waitForObject(":Notice.OK_QPushButton");
            clickButton(":Notice.OK_QPushButton");
        }
        
        waitForObject(":View Check Run.Save_QPushButton");
        clickButton(":View Check Run.Save_QPushButton");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        snooze(3);
    }
    catch(e)
    {
        test.fail("Error in editing preferences"+ e);
    }  
    
    //--------Exiting the application------
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
    activateItem(waitForObjectItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP..."));
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    snooze(3);
    //--------------- Set the window to Tab view mode -------------

    tabView();
    var target = "LOTITEM5";
    //---Creating Lot Controlled item----------
    copyItem("YTRUCK1",target);
    //---Create Item Site-----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site"));
        activateItem(waitForObjectItem(":_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.New_QToolButton"));
        type(waitForObject(":Item Site.ItemLineEdit_ItemLineEdit"),target);
        nativeType("<Tab>");
        if(object.exists(":_warehouse_WComboBox_2"))
        {
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        if(!findObject(":Items.Site can manufacture this Item_QGroupBox"))
        {
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        }
        if(findObject(":Item Site.Site can purchase this Item_QGroupBox"))
        {
            type(":Item Site.Site can purchase this Item_QGroupBox", " ");
        }
        snooze(0.5)
                waitForObject(":Control._controlMethod_XComboBox_2");
        clickItem(":Control._controlMethod_XComboBox_2","Lot #",0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2","MRP-MRP Items",0, 0, 5, Qt.LeftButton);
        
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2","DISTRIBUTION-Distribution - WH2",0, 0, 5, Qt.LeftButton);
        
        
        
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Expiration");
        if(!findObject(":_expirationTab.Perishable_QCheckBox").checked)
        { 
            clickButton(waitForObject(":_expirationTab.Perishable_QCheckBox"));
        }
        if(!findObject(":_expirationTab.Auto Register Lot/Serial at Shipping_QCheckBox").checked)
        { 
            clickButton(waitForObject(":_expirationTab.Auto Register Lot/Serial at Shipping_QCheckBox"));
        }
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in craeting the ItemSite:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        
    }
  
    
    //---Verifying the ItemSite Created-------
    try
    {
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        waitForObject(":_list_XTreeWidget_3");
        snooze(1);
        
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+target+"' type='QModelIndex'}"))
            test.pass("Item Site created successfully");
        else  
            test.fail("Item Site creation failed");            
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }
    catch(e)
    {
        test.fail("Error in Verifying the  ItemSite craeted:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
    }
    //----Adjusting Inventory-----------
    var lot = "LOT5";
    var qoh1= adjustQoh(target,"150","WH1",lot);
    
    //---Define characteristics, Registration for an Item Lot---
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Lot/Serial..."));
        type(waitForObject(":Lot/Serial.ItemLineEdit_ItemLineEdit"),target);
        nativeType("<Tab>");
        type(waitForObject(":Lot/Serial.VirtualClusterLineEdit_LotserialLineEdit"),lot);
        nativeType("<Tab>");
        clickButton(waitForObject(":_char.New_QPushButton"));
        waitForObject(":Lot Serial Characteristic._char_QComboBox");
        clickItem(":Lot Serial Characteristic._char_QComboBox","QA-RESULTS",0, 0, 5, Qt.LeftButton);
        waitForObject(":_value_XLineEdit");
        type(waitForObject(":_value_XLineEdit"), "121");
        clickButton(waitForObject(":Lot Serial Characteristic.Save_QPushButton"));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Registrations");
        clickButton(waitForObject(":_regTab.New_QPushButton"));
        type(waitForObject(":_dateGroup.XDateEdit_XDateEdit_4"), "0");
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_crmaccntGroup.VirtualClusterLineEdit_CRMAcctLineEdit"), "TTOYS");
        nativeType("<Tab>");
        type(waitForObject(":_contactTab.VirtualClusterLineEdit_ContactClusterLineEdit_2"), "Frank Farley");
        nativeType("<Tab>");
        clickButton(waitForObject(":Lot/Serial Registration.Save_QPushButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":Lot/Serial.Cancel_QPushButton"));
        test.log("Characteristic and registration made sucessfully");
    }
    catch(e)
    {
        test.fail("Error in creating registration and characteristic:"+e);
        if(object.exists(":Lot/Serial.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Lot/Serial.Cancel_QPushButton"));
        }
    }
    //----Create Sales Order for Lot Item------
    var sonum = createSalesOrder(target, 1);
    
    //---Issue Stock to Shipping------
    var shplot = issueStock(sonum);
    if(shplot == lot)
        test.pass("Stock issued sucessflly from the default lot");
    else
        test.fail("Error in issueing stock from default lot");
    //----Verifying the Sales Order under Registration-----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Lot/Serial..."));
        type(waitForObject(":Lot/Serial.ItemLineEdit_ItemLineEdit"),target);
        nativeType("<Tab>");
        type(waitForObject(":Lot/Serial.VirtualClusterLineEdit_LotserialLineEdit"),lot);
        nativeType("<Tab>");
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Registrations");
        waitForObject(":_regTab._reg_XTreeWidget");
        doubleClickItem(":_regTab._reg_XTreeWidget", "TTOYS", 14, 8, 0, Qt.LeftButton);
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        var regsonum = findObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit").text;
        if(sonum == regsonum)
        {
            test.pass("Sales Order  sucessfully made registration");
        }
        else
            test.fail("Error in registering the Sales Order");
        clickButton(waitForObject(":Lot/Serial Registration.Save_QPushButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":Lot/Serial.Cancel_QPushButton"));
    }
    
    catch(e)
    {
        test.fail("Error in verifying the registered Sales Order:"+e);
    }
    
    
}
