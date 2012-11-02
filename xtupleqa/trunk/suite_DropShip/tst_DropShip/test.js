//---Linux--- 
function main()
{
    
    //-----declarations------
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
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
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
            activateItem(":xTuple ERP:*.System_QMenu", "Preferences..."); 
        }
        snooze(0.5);
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
    //--------------- Set the window to Tab view mode -------------
    
    tabView();
    //-----Enable DropShip from Purchase setup------
    
    var ponumber1; 
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Setup...");
        waitForObject(":Options.Enable Drop Shipments_QCheckBox");
        if(!findObject(":Options.Enable Drop Shipments_QCheckBox").checked)
        {
            clickButton(":Options.Enable Drop Shipments_QCheckBox");
            waitForObject(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox");
            clickButton(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox");
        }
        else
        {
            if(!findObject(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox").checked)
                clickButton(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox");
        }
        
        if(findObject(":Options.Enable Drop Shipments_QCheckBox").checked)
        {
            test.pass("Drop ship Enabled already:");   
        }
        waitForObject(":_nextPoNumber_XLineEdit");
        ponumber1 = findObject(":_nextPoNumber_XLineEdit").text;
        test.log(ponumber1);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.pass("Purchase Order Setups made sucessfully:");
    }
    catch(e)
    {
        test.fail("Purchase setups failed" +e);
    }	
    
    var target="DROPSHIP";
    var sourceitem="TBOX1";
    //--------Creating DropShip enabled  Purchase Type item-------------
    
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        clickItem(":_list_XTreeWidget_3", sourceitem, 0, 0, 5, Qt.LeftButton);
        openItemContextMenu(":_list_XTreeWidget_3", sourceitem, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        
        waitForObject(":_targetItemNumber_XLineEdit_2");
        type(":_targetItemNumber_XLineEdit_2", target);
        
        if(!findObject(":Copy Item.Copy Item Costs_QCheckBox").checked)
        {
            clickButton(":Copy Item.Copy Item Costs_QCheckBox");
        }
        if(!findObject(":Copy Item.Copy Bill of Materials_QCheckBox").checked)
        {
            clickButton(":Copy Item.Copy Bill of Materials_QCheckBox");
        }
        if(object.exists(":Copy Item.Copy Bill of Operations_XCheckBox"))
        {
            if(!findObject(":Copy Item.Copy Bill of Operations_XCheckBox").checked)
            {
                clickButton(":Copy Item.Copy Bill of Operations_XCheckBox");
            }
            if(!findObject(":Copy Item.Copy Used At Operation_XCheckBox").checked)
            {
                clickButton(":Copy Item.Copy Used At Operation_XCheckBox");
            }
        }
        waitForObject(":Items.Copy_QPushButton");
        clickButton(":Items.Copy_QPushButton");
        
        waitForObject(":Sales Order.No_QPushButton");
        clickButton(":Sales Order.No_QPushButton");
        snooze(1);
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+target+"' type='QModelIndex'}"))
            test.pass("Item " + target +" created");
        else
            test.fail("Item creation failed");
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    atch(e)
    {
        test.fail("Exception in creating Item " + e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //------------Create Regular Item Site with DropShip enable----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "New...");
        activateItem(":_QMenu", "New...");
        
        waitForObject(":Item Site.ItemLineEdit_ItemLineEdit");
        type(":Item Site.ItemLineEdit_ItemLineEdit", target);
        nativeType("<Tab>");
        snooze(0.5);
        if(object.exists(":_warehouse_WComboBox_2"))
        {
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        snooze(0.5);
        if(!findObject(":Items.Site can manufacture this Item_QGroupBox"))
        {
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        }
        if(findObject(":Item Site.Site can purchase this Item_QGroupBox"))
        {
            type(":Item Site.Site can purchase this Item_QGroupBox", " ");
        }
        
        if(!findObject(":Site can purchase this Item.Create Purchase Orders linked to Sales Orders_QCheckBox").checked)
            clickButton(":Site can purchase this Item.Create Purchase Orders linked to Sales Orders_QCheckBox");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        if(!findObject(":Site can purchase this Item.Drop ship Items by default_QCheckBox").checked)
            clickButton(":Site can purchase this Item.Drop ship Items by default_QCheckBox");
        snooze(0.5);
        waitForObject(":Control._controlMethod_XComboBox_2");
        clickItem(":Control._controlMethod_XComboBox_2", "Regular", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2", "MRP-MRP Items", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2", "FINISHED-Finished Product - WH1", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        snooze(0.5);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }
    catch(e)
    {
        test.fail("Exception in creating Itemsite for "+target+e);
    }
    
    //------Item Source Creation for the Drop Ship item---------
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",target,5, 5, Qt.LeftButton);    
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        
        waitForObject(":Item is Sold.Exclusive_QCheckBox");
        if(findObject(":Item is Sold.Exclusive_QCheckBox").checked)
        {
            clickButton(":Item is Sold.Exclusive_QCheckBox");
        }
        waitForObject(":Item is Sold._listprice_XLineEdit").clear();
        type(":Item is Sold._listprice_XLineEdit", "1");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Sources");
        waitForObject(":_sourcesTab.New_QPushButton");
        clickButton(":_sourcesTab.New_QPushButton");
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit");
        type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        waitForObject(":_venditemGroup._vendorItemNumber_XLineEdit");
        type(":_venditemGroup._vendorItemNumber_XLineEdit", "1");
        waitForObject(":_vendorUOM_XComboBox");
        clickItem(":_vendorUOM_XComboBox","EA",0, 0, 5, Qt.LeftButton);
        waitForObject(":_venditemGroup._invVendorUOMRatio_XLineEdit");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        waitForObject(":_venditemGroup._upcCode_XLineEdit");
        type(":_venditemGroup._upcCode_XLineEdit", "1");
        
        snooze(3);
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_2");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_2", "Prices");
        waitForObject(":_pricesTab.Add_QPushButton");
        clickButton(":_pricesTab.Add_QPushButton");
        waitForObject(":_qtyBreak_XLineEdit");
        type(":_qtyBreak_XLineEdit", "100");
        waitForObject(":Item Source Price.XLineEdit_XLineEdit");
        type(":Item Source Price.XLineEdit_XLineEdit", "1");
        waitForObject(":Item Source Price.Save_QPushButton");
        clickButton(":Item Source Price.Save_QPushButton");
        waitForObject(":Item Source.Default_QCheckBox");
        if(!findObject(":Item Source.Default_QCheckBox").checked)
        {
            clickButton(":Item Source.Default_QCheckBox");
        }
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.pass("ItemSoueces Created sucessfully:");
    }
    catch(e)
    {
        
        test.fail("Failed to Create Itemsources:");
    }
    
    //--------Creating SO1 -----
    var soqty = "100";
    var soqty1 =soqty +".00";
    
    
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
        
        sonumber1 = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", target);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", soqty);
        
        soitem = findObject(":_itemGroup.ItemLineEdit_ItemLineEdit").text;
        
        soqty = findObject(":_qtyOrdered_XLineEdit_2").text;
        
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
        
        if(!findObject(":_availabilityStack.Create Purchase Order_QGroupBox"))
        {
            throw "Create purchase order link not enabled";
            
        }
        else
        {
            if(!findObject(":Create Purchase Order.Drop Ship_QCheckBox").checked)
            {
                throw "Drop ship option is not checked by default";
            }
        }
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+sonumber1+"' type='QModelIndex'}"))
            test.pass("Sales Order creation successful");
        else  
            test.fail("Sales Order creation failed");            
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in creating sales order" + e);
    }
    
    //----Verifying PO linked with SO----
    
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(1);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ponumber1+"' type='QModelIndex'}"))
            test.pass("Purchase order linked to Sales Order is created:");
        else
            test.fail("Failed to create Purchase order linked to sales order:");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        snooze(0.5);
    }
    catch(e)
    {
        test.fail("failed to open PO" + e);
    }
    
    //------Changing the Sales Order Quantity---------
    try
    {
        var cqnty = "200";
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");  
        openItemContextMenu(":_list_XTreeWidget_3", sonumber1, 5, 5, Qt.LeftButton); 
        
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(2);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._soitem_XTreeWidget");
        clickItem(":_lineItemsPage._soitem_XTreeWidget", target,0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Edit_QPushButton");
        clickButton(":xTuple ERP:*.Edit_QPushButton");
        snooze(2);
        findObject(":_qtyOrdered_XLineEdit").clear();
        type(":_qtyOrdered_XLineEdit", cqnty);
        nativeType("<Tab>");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("SalesOrder edited sucessfully:"); 
        
    }
    catch(e)
    {
        test.fail("Error in editing the SalesOrder:"+e);
    }
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //------- Verifying the Changes Made in the SO updated in PO ----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",ponumber1, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._poitem_XTreeWidget");
        clickItem(":_lineItemsPage._poitem_XTreeWidget",target, 0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Edit_QPushButton");
        clickButton(":xTuple ERP:*.Edit_QPushButton");
        snooze(1);
        // Verification Point 'VP1'
        var qty2 = findObject(":_ordered_XLineEdit_2").text;
        var qty3 = parseInt(qty2);
        if(cqnty == qty3)
            test.pass("Changes made in SO updated in PO sucessfully");
        else
            test.fail("Failed to update changes of SO to PO");
        
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Failed to update SalesOrder changes in Purchase Order:"+ e);
    }
    
    //-----------Copy SO and check related PO is created--------
    var sonumber2,ponumber2;
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sonumber1, 5, 5, Qt.LeftButton); 
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        sonumber2 = parseInt(sonumber1)+1;
        test.log(sonumber2);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+sonumber2+"' type='QModelIndex'}"))
            test.pass("Sales order copied sucessfully:");
        else
            test.fail("Failed to copy SalesOrder:");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.pass("Sales order Copied Sucessfully:");
    }
    catch(e)
    {
        test.fail("Failed to Copy SalesOrder"+ e);
    }
    //--------- Verfying PO linked to Copied SO -----
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        ponumber2 = ++ponumber1;
        test.log(ponumber2);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ponumber2+"' type='QModelIndex'}"))
            
            test.pass("Purchase order linked to copied Sales Order is found:");
        
        
        else
            test.fail("Purchase order linked to copied Sales Order is not found:");
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Failed to create Purchase Order linked to copied sales order" +e);
        
        
    }
    
    
    //------Deleting SO should delete related PO----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sonumber2, 5, 5, Qt.LeftButton);  
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+sonumber2+"' type='QModelIndex'}"))
            test.fail("Sales Order is not deleted:");
        else
            test.pass("SalesOrder deleted Sucessfully:");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
        
    }
    catch(e)
    {
        test.fail("Error in deleting sales Order" +e);
    }
    //---------verifying PO related to SO deletion----------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ponumber2+"' type='QModelIndex'}"))
            
            test.fail("PO linked to So is not deleted:");
        else
            test.pass("Purchase order linked to Sales Order is deleted Sucessfully:");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.pass("PO related to SO deleted");
    }
    catch(e)
    {
        test.fail("Error in finding the existance of PO linked to deleted sales order" + e);
        
    }
    
    
    
    
    //-------Creating Quote and verify for SO and related  PO number creation------
    var quotenum;
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
        activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":_headerPage._orderNumber_XLineEdit");
        quotenum=findObject(":_headerPage._orderNumber_XLineEdit").text;
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit",target);
        waitForObject(":_qtyOrdered_XLineEdit");
        type(":_qtyOrdered_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+quotenum+"' type='QModelIndex'}"))
        {
            
            test.pass("Quote created sucessfully:");
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Fail to create Quote:");
    }
    //-----Converting Quote to SO-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
        activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",quotenum, 5, 5, Qt.LeftButton);    
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Convert to S/O...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Convert to S/O...");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Quote is sucessfully converted to SO:");
    }
    catch(e)
    {
        test.log("error in converting  quote to SalesOrder:" +e);
    }
    //----Verifying for SalesOrder----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(findObject("{column='0' container=':_list_XTreeWidget_3' text='"+quotenum+"' type='QModelIndex'}"))
        {    
            clickItem(":_list_XTreeWidget_3",quotenum,0, 0, 5, Qt.LeftButton);
            test.log("SO created Sucessfully after Coverting Quote to SalesOrder:");
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Failed to Create SO after Converting Quote to SO:" +e);
    }
    
    //----Verifying PO after converting quote to SO----
    ponumber3=++ponumber1;
    try
    {   
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ponumber3+"' type='QModelIndex'}"))
            
            test.pass("Purchase Order created Sucesslly on Converting Quote to SalesOrder:");
        
        else
            test.fail("Purchase Order is not created on Converting Quote to SalesOrder:");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("error in  creating  Purchase Order on converting Quote to Sales Order "+ e);
    }
    
    
    
    
    var sonumber3,ponumber4;
    sonumber3 = createSalesOrder(target,soqty);
    
    //------------Releasing PO ------------ 
    ponumber4 = ponumber3+1;
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton"); 
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",ponumber4, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Purchase Orders released successfully");
    }
    catch(e)
    {
        test.fail("Error in posting purchase orders" + e);
    }
    //----QOH verification----
    
    var  qtyDropship1=queryQoh(target,"WH1",appEdition);
    
    test.log(qtyDropship1);
    //------Posting receipt------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", ponumber4);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Receipt posted sucessfully:");
    }
    catch(e)
    {
        test.fail("PO Posting failed"+ e);
    }
    
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //----QOH verification----
    
    var qtyDropship2=queryQoh(target, "WH1",appEdition);
    test.log(qtyDropship2);
    if(qtyDropship2 == qtyDropship1)
        test.pass("QOH updated sucessfully:");
    else
        test.fail("failed to update QOH:");
    
    //--------------Verifying Gl Entries-----------------
    
    var ponumbergl =ponumber4+"-1";
    
    var bool1=glTransactions(/Receive Inventory from/,ponumbergl);
    if(bool1 == 1)
    {
        test.pass("PO " + ponumbergl + " has a GL entry for Posting the receipt");
    }
    else
        test.fail("No GL entry is made for posting the rceipt" + ponumbergl);
    
    
    //-----------Creating Voucher and POsting Voucher---------
    //---Voucher Creation-----
    var vouchernum
            try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        
        vouchernum = findObject(":_voucherNumber_XLineEdit").text
                     test.log(vouchernum);
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", ponumber4);
        nativeType("<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3", "0");
        waitForObject(":_poitems._poitem_XTreeWidget");
        clickItem(":_poitems._poitem_XTreeWidget",target,0, 0, 5, Qt.LeftButton);
        waitForObject(":_poitems.Distributions..._QPushButton");
        clickButton(":_poitems.Distributions..._QPushButton");
        waitForObject(":_uninvoiced.No_QModelIndex");
        doubleClick(":_uninvoiced.No_QModelIndex", 9, 8, 0, Qt.LeftButton);
        waitForObject(":_distTab.New_QPushButton");
        clickButton(":_distTab.New_QPushButton");
        snooze(0.5);
        var amnt = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        waitForObject(":Voucher Item Distribution.Save_QPushButton");
        clickButton(":Voucher Item Distribution.Save_QPushButton");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":_amount.XLineEdit_XLineEdit");
        type(":_amount.XLineEdit_XLineEdit",amnt );
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Voucher created sucessfully:");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Failed to create Voucher:");
    }
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //------------Posting Voucher--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
        
        if(findObject("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+vouchernum+"' type='QModelIndex'}"))              {
            clickItem(":xTuple ERP:*._vohead_XTreeWidget",vouchernum,0, 0, 5, Qt.LeftButton); 
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            snooze(0.5);
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        test.log("Voucher Posted sucessfully:");
    }
    catch(e)
    {
        test.fail("Failed to  Post voucher" + e);
    }
    
    
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //----------------GL verification--------------
    
    var bool3 = glTransactions(/TPARTS-Toy Parts Inc./,vouchernum);
    
    if(bool3 == 1)
    {
        test.pass("Voucher " + vouchernum + " has a GL entry for Posting the Voucher");
    }
    else
        test.fail("No GL entry is made for posting the Voucher" + vouchernum);
    
    //-----------Selecting Voucher for payment-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "Select...");
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", vouchernum,0, 0, 5, Qt.LeftButton);
        waitForObject(":frame.Select..._QPushButton");
        clickButton(":frame.Select..._QPushButton");
        snooze(0.5);
        waitForObject(":_bankaccnt_XComboBox");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account",0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Voucher selected for payment successfully");
    }
    catch(e)
    {
        test.fail("Selecting Voucher for payment failed"+ e);
    }
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---------Preparing Check Run, Printing Check and Posting Check----
    //---Prepare Check Run
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
        snooze(0.5);
        waitForObject(":Prepare Check Run._bankaccnt_XComboBox");
        clickItem(":Prepare Check Run._bankaccnt_XComboBox","EBANK-eBank Checking Account",0,0,5,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Prepare Check Run.Prepare_QPushButton");
        clickButton(":Prepare Check Run.Prepare_QPushButton");
        test.log("Check prepared successfully");
    }
    catch(e)
    {
        test.fail("Failed to prepare CheckRun:");
    }
    //----------printing and posting check--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Configure.Encryption_QModelIndex");
        mouseClick(":Configure.Encryption_QModelIndex", 40, 8, 0, Qt.LeftButton);
        
        snooze(1);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(":Sales Order.OK_QPushButton_2");
            snooze(1);
            waitForObject(":_ccEncKeyName_QLineEdit_2").clear();
            type(":_ccEncKeyName_QLineEdit_2", "xTuple.key");
            waitForObject(":_stack_FileLineEdit").clear();
            type(":_stack_FileLineEdit", "c:/crypto");
            waitForObject(":_stack_FileLineEdit_2").clear();
            type(":_stack_FileLineEdit_2", "/home/administrator/crypto");
            waitForObject(":_stack_FileLineEdit_3").clear();
            type(":_stack_FileLineEdit_3", "/users/crypto");
        }
        
        waitForObject(":_stack_FileLineEdit_2");
        linuxPath = findObject(":_stack_FileLineEdit_2").text;
        
        waitForObject(":_stack_FileLineEdit");
        winPath = findObject(":_stack_FileLineEdit").text;
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in extracting OS name" + e);
    }
    var a = "1";
    
    //-----View Check run-----
    try {
        waitForObject(":xTuple ERP: *_QMenuBar");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        
        waitForObject(":_frame._check_XTreeWidget");
        clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_frame.Print_QPushButton");
        sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 5, 5, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "Check Run...");
        activateItem(":_QMenu", "Check Run...");
        snooze(2);
        
        if(OS.name == "Windows")
        {
            waitForObject(":View Check Run.Create EFT File_QPushButton");
            clickButton(":View Check Run.Create EFT File_QPushButton");
            if (object.exists(":Sales Order.Yes_QPushButton"))
                clickButton(":Sales Order.Yes_QPushButton");
            
            waitForObject(":fileNameEdit_QLineEdit");
            findObject(":fileNameEdit_QLineEdit").text = winPath.toString() + "/achFile.ach";     
            waitForObject(":Cash Receipt.Save_QPushButton_3");
            clickButton(":Cash Receipt.Save_QPushButton_3");
            
            snooze(3);
            nativeType("<Tab>");
            snooze(0.5);
            nativeType("<Return>");
            snooze(1);
            if (object.exists(":ACH File OK?.Yes_QPushButton"))
                clickButton(":ACH File OK?.Yes_QPushButton");
            
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            
            checkWidget = findObject(":_frame._check_XTreeWidget");
            row = checkWidget.topLevelItem(0);
            eftno = row.text(8);
            
        }
        
        else
        {
            clickButton(waitForObject(":Print Checks.Print_QPushButton"));
            snooze(1);
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            snooze(0.5);
            if(object.exists(":filename_QLineEdit"))
            {
                findObject(":filename_QLineEdit").clear();
                type(waitForObject(":filename_QLineEdit"), "2");
                
            }
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            snooze(1);
            
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            checkWidget = findObject(":_frame._check_XTreeWidget");
            row = checkWidget.topLevelItem(0);
            chkno = row.text(3);
            a++
                    
                }
        
        
    }
    catch(e)
    {
        test.fail("Exception in Printing check" + e);
        
    }
    //------------Posting the Check--------
    try
    {
        waitForObject(":_frame.Post_QPushButton_2");
        sendEvent("QMouseEvent", ":_frame.Post_QPushButton_2", QEvent.MouseButtonPress, 32, 16, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "Selected Check...");
        activateItem(":_QMenu", "Selected Check...");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton")
                waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Check posted Sucessfully:");
    }
    catch(e)
    {
        test.fail("Error in posting check"+e);
    }
    
    //---Creating and posting Invoice----
    var invoicenum;
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
        
        if(OS.name == "Linux")
        {
            snooze(1);
            type(waitForObject(":xTuple ERP: *.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        snooze(1);
        waitForObject(":xTuple ERP:*._cobill_XTreeWidget");
        if(object.exists("{column='0' container=':xTuple ERP:*._cobill_XTreeWidget' text='"+sonumber3+"' type='QModelIndex'}"))
        {
            test.pass("Shipment done automatically:");
            clickItem(":xTuple ERP:*._cobill_XTreeWidget",sonumber3,0, 0, 5, Qt.LeftButton); 
            waitForObject(":xTuple ERP:*.Create Invoice_QPushButton");
            clickButton(":xTuple ERP:*.Create Invoice_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            test.log("invoice created sucessfully:");
        }
        else
            test.fail("Shipment is not done  automatically on receiving the PO:");
        
    }
    catch(e)
    {
        test.fail("failed to create Invoice:"+e);
    }
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //------------Posting Invoice---------
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
        openItemContextMenu(":_list_XTreeWidget_3",sonumber3, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(2);
        // Verification Point 'VP1'
        invoicenum=findObject(":_invoiceNumber_XLineEdit").text;
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sonumber3, 5, 5, Qt.LeftButton); 
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        snooze(0.5);
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Invoice Posted Sucessfully:");
    }
    catch(e)
    {
        test.fail("Failed to post invoice" +e);
    }
    //---------GL Verification---
    var bool2= glTransactions(/Tremendous Toys Incorporated/,invoicenum);
    
    if(bool2 == 1)
    {
        test.pass("invoice " + invoicenum + " has a GL entry for Posting the invoice");
    }
    else
        test.fail("No GL entry is made for posting the invoice" + invoicenum);
    
    
    
    //----------Creating  Cash Receipt and Post it--------------
    try{  
        var sonumber2;
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Cash Receipts");
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget_2",sonumber3,5, 5, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        var invamount = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        type(":Cash Receipt.XLineEdit_XLineEdit", invamount);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", invamount);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");   
        test.log("Cash receipt is created");
    }
    catch(e)
    {
        test.fail("cash receipt creation failed" + e);
    }
    //------Posting Cash Receipt-------
    try
    {
        waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
        
        while(findObject(":_cashRecptTab._cashrcpt_XTreeWidget").topLevelItemCount >= 1)
        {
            clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS", 5, 5, 1, Qt.LeftButton);
            waitForObject(":_cashRecptTab.Post_QPushButton");
            clickButton(":_cashRecptTab.Post_QPushButton");
        } 
        waitForObject(":Receivables Workbench.Close_QPushButton");
        clickButton(":Receivables Workbench.Close_QPushButton");
        test.log("Cash receipts posted successful");
    }
    catch(e)
    {
        test.fail("posting cashreceipt failed"+ e);
    }
    
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    
    //---Disable DropShipped Orders for Billing on receipt option  from Purchase setup---
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Setup...");
        snooze(1);
        ponumber5 = findObject(":_nextPoNumber_XLineEdit").text;
        waitForObject(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox");
        snooze(0.5);
        if(findObject(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox").checked)
        {
            clickButton(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox");
        }
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("DropShipped Orders for Billing on receipt option disabled sucessfully:");
    }
    catch(e)
    {
        test.fail("Failed to disable DropShipped Orders for Billing on receipt:");
    }
    //---SO Creation---
    var sonumber4;
    
    sonumber4 = createSalesOrder(target,soqty);
    
    //------------Releasing PO ------------ 
    
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");    
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",ponumber5, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Purchase Orders released successfully");
    }
    catch(e)
    {
        test.fail("Error in posting purchase orders" + e);
    }
    
    //------Posting receipt------
    var rqty;
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", ponumber5);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Receipt posted sucessfully:");
    }
    catch(e)
    {
        test.fail("PO Posting failed"+ e);
    }
    
    //--------------Verifying Gl Entries-----------------
    
    var ponumbergl =ponumber5+"-1";
    bool = glTransactions(/Receive Inventory from/,ponumbergl); 
    
    if(bool == 1)
    {
        test.pass("PO receipt " + ponumbergl + " has a GL entry");
    }
    else
        test.fail("No GL entry is made for posting receipt" + ponumbergl);
    
    
    
    
    
    //----Verifying shipment status-----
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        if(OS.name == "Linux")
        {
            snooze(1);
            type(waitForObject(":xTuple ERP: *.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit", sonumber4);
        nativeType("<Tab>");
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        if(object.exists("{column='5' container=':_lineitemsTab._soitem_XTreeWidget' text='"+soqty1+"' type='QModelIndex'}"))
            test.pass("Shippment done Automatically:");
        else
            test.fail("Failed to perform Shipment Automatically:");
        snooze(0.5);
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("error in Shipping automatically:"+e);
    }
    
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    snooze(10);
    //-----------Verifying for SO for Billing----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
        snooze(0.5);
        if(OS.name == "Linux")
        {
            snooze(1);
            type(waitForObject(":xTuple ERP: *.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        waitForObject(":xTuple ERP:*._cobill_XTreeWidget");
        if(object.exists("{column='0' container=':xTuple ERP:*._cobill_XTreeWidget' text='"+sonumber4+"' type='QModelIndex'}"))
        {
            test.fail("Sales Order is selected for Billing in Billing Selections");
        }
        else
            test.pass("Sales Order is not selected for billing in Billing Selections:");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error occured in selecting SO for billing:"+e);
    }
    
}