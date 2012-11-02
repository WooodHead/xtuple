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
            waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
            activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        }
        snooze(0.5);
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
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
    
    
    loginAppl("CONFIGURE"); 
    snooze(2);
    //--------------- Set the window to Tab view mode -------------
    
    tabView();
    
    //------finding Application Edition------
    var appE = findApplicationEdition();
    
    
    // ----Copying Item-------
    copyItem("KCAR1","KTRUCK6");
    
    //----Creating item site for kit type Item--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "New...");
        activateItem(":_QMenu", "New...");
        
        waitForObject(":Item Site.ItemLineEdit_ItemLineEdit");
        type(":Item Site.ItemLineEdit_ItemLineEdit","KTRUCK6");
        nativeType("<Tab>");
        snooze(0.5);
        if(object.exists(":_warehouse_WComboBox_2"))
        {
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2", "MRP-MRP Items", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2", "FINISHED-Finished Product - WH1", 0, 0, 5, Qt.LeftButton);		snooze(2);
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        test.log("Item site is created for Kit type item");
        snooze(0.5);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }
    catch(e)
    {
        test.fail("Exception in creating Itemsite for kit type item"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
    }
    
    if(appE != "PostBooks")
    {
        //----------Cancelling Item site creation---------
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
            waitForObjectItem(":_QMenu", "New...");
            activateItem(":_QMenu", "New...");
            waitForObject(":Item Site.ItemLineEdit_ItemLineEdit");
            type(":Item Site.ItemLineEdit_ItemLineEdit", "KTRUCK6");
            nativeType("<Tab>");
            snooze(0.5);
            if(object.exists(":_warehouse_WComboBox_2"))
            {
                waitForObject(":_warehouse_WComboBox_2");
                clickItem(":_warehouse_WComboBox_2", "WH2", 0, 0, 5, Qt.LeftButton);
            }
            
            waitForObject(":_plannerCode_XComboBox_2");
            clickItem(":_plannerCode_XComboBox_2", "MRP-MRP Items", 0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":_costcat_XComboBox_2");
            clickItem(":_costcat_XComboBox_2", "FINISHED-Finished Product - WH1", 0, 0, 5, Qt.LeftButton);
            snooze(2);
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            
        }
        catch(e)
        {
            test.fail("Exception in creating Itemsite for "+item+e);  
            if(object.exists(":Sales Order.Cancel_QPushButton"))
            {
                waitForObject(":Sales Order.Cancel_QPushButton");
                clickButton(":Sales Order.Cancel_QPushButton");
            }
        }
    } 
    //-------creating a Item Group-----------------
    try{ 
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "Groups...");
        activateItem(":xTuple ERP:*.Item_QMenu", "Groups...");
        clickButton(waitForObject(":_frame.New_QPushButton"));
        snooze(0.5);
        waitForObject(":GroupBox1._name_XLineEdit");
        type(":GroupBox1._name_XLineEdit", "KIT TYPE ITEMS");
        
        nativeType("<Tab>");
        waitForObject(":GroupBox1._descrip_XLineEdit");
        type(":GroupBox1._descrip_XLineEdit", "KIT TYPE ITEM GROUP");
        waitForObject(":xTuple ERP:*.New_QPushButton_2");
        clickButton(":xTuple ERP:*.New_QPushButton_2");
        waitForObject(":_search_QLineEdit");
        type(":_search_QLineEdit", "KTRUCK6");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":_itemgrp.KIT TYPE ITEMS_QModelIndex");
        mouseClick(":_itemgrp.KIT TYPE ITEMS_QModelIndex", 19, 6, 0, Qt.LeftButton);
        waitForObject(":_itemgrp.KIT TYPE ITEMS_QModelIndex");
        mouseClick(":_itemgrp.KIT TYPE ITEMS_QModelIndex", 31, 6, 0, Qt.LeftButton);
        snooze(0.5);
        if(object.exists("{column='0' container=':xTuple ERP:*._itemgrp_XTreeWidget' text='KIT TYPE ITEMS' type='QModelIndex'}"))
            test.pass("Kitting Type Group created successful");
        else
            test.fail("failed to create kitting type group");
        
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in creating a kitting type Item group"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    
    //------Performing External flows on BOM's of Kit type item------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        activateItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        activateItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        waitForObject(":xTuple ERP:*._bom_XTreeWidget");
        clickItem(":xTuple ERP:*._bom_XTreeWidget","KTRUCK6",0,0,5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Edit_QPushButton");
        clickButton(":xTuple ERP:*.Edit_QPushButton");
        snooze(2);
        //------Adding 'new' BOM to the kit type item----------
        waitForObject(":xTuple ERP:*.New_QPushButton_2");
        clickButton(":xTuple ERP:*.New_QPushButton_2");
        snooze(0.5);
        waitForObject(":Bill of Materials Item.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials Item.ItemLineEdit_ItemLineEdit", "WPAINT1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        if(object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='WPAINT1' type='QModelIndex'}"))
            test.pass("Adding a BOM item is sucessful");
        else
            test.fail("Error in adding BOM item");
        //-----Editing a BOM of kit type item-------
        waitForObject(":frame_2._bomitem_XTreeWidget");
        clickItem(":frame_2._bomitem_XTreeWidget","WPAINT1", 0, 0, 5, Qt.LeftButton);
        waitForObject(":frame_2.Edit_QPushButton");
        clickButton(":frame_2.Edit_QPushButton");
        
        waitForObject(":Effectivity.XDateEdit_XDateEdit_2");
        type(":Effectivity.XDateEdit_XDateEdit_2", 0);
        nativeType("<Tab>");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        
        //-------Expiring a selected BOM-------
        waitForObject(":frame_2._bomitem_XTreeWidget");
        clickItem(":frame_2._bomitem_XTreeWidget","WPAINT1", 0, 0, 5, Qt.LeftButton);
        waitForObject(":frame_2.Expire_QPushButton");
        clickButton(":frame_2.Expire_QPushButton");
        if(!object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='WPAINT1' type='QModelIndex'}"))
            test.pass("BOM item expired sucessfully");
        else
            test.fail("BOM item doesn't expired sucessfully");
        
        //-----Viewing the expired BOM's by selecting 'Show Expired' checkbox-------
        waitForObject(":xTuple ERP:*.Show Expired_QCheckBox");
        clickButton(":xTuple ERP:*.Show Expired_QCheckBox");
        
        if(object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='WPAINT1' type='QModelIndex'}"))
            test.pass("Expired items are displayed on selecting 'show Expired' checkbox");
        else
            test.fail("Error in displaying Expired itemson selecting 'show Expired' checkbox");
        
        
        var bom1 = new Array();
        var widg = findObject(":frame_2._bomitem_XTreeWidget");
        var count = widg.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            var row = widg.topLevelItem(i);
            var obj = row.text(0);
            bom1[i] =  obj;
            //            test.log(bom1[i]);
        }
        //----Sorting BOM Item No's ----------
        bom1.sort(function (a,b) { return a - b;});
        var countarr = bom1.length;
        
        //        for(i=0;i<countarr;i++)
        //        {
        //            test.log(bom1[i]);
        //        }
        
        var widg1 = findObject(":frame_2._bomitem_XTreeWidget");
        var count = widg.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            var row = widg1.topLevelItem(i);
            if(row.text(1) == "YPAINT2")
            {
                var obj1 = row.text(0);
                //                test.log(obj1);
            }
        }
        //-------'Moving Up' a selected BOM-------
        waitForObject(":frame_2._bomitem_XTreeWidget");
        clickItem(":frame_2._bomitem_XTreeWidget","YPAINT2", 0, 0, 5, Qt.LeftButton);
        waitForObject(":frame_2.Move Up_QPushButton");
        clickButton(":frame_2.Move Up_QPushButton");
        
        
        var widg2 = findObject(":frame_2._bomitem_XTreeWidget");
        var count = widg.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            var row = widg2.topLevelItem(i);
            if(row.text(1) == "YPAINT2")
            {
                var obj2 = row.text(0);
                //                test.log(obj2);
            }
        }
        
        if(obj1 == bom1[0])
        {
            if(obj2 == bom1[0])
                test.pass("Moving up operation of selected BOM is sucessful");
            else
                test.fail("Error in Moving up operation of selected BOM is sucessful");
        }
        
        for(i=0;i<count-1;i++)
        {
            if(obj1 == bom1[i])
            {
                if(obj2 == bom1[--i])
                {   
                    test.pass("Moving up operation of selected BOM is sucessful");
                    //                    test.log(obj2);
                    break;
                }
                else
                {   
                    test.fail("Error in Moving up operation of selected BOM is sucessful");
                    break;
                }
            }
        }
        
        //-------'Moving Down' a selected BOM-------
        waitForObject(":frame_2._bomitem_XTreeWidget");
        clickItem(":frame_2._bomitem_XTreeWidget","YPAINT2", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":frame_2.Move Down_QPushButton");
        clickButton(":frame_2.Move Down_QPushButton");
        
        var widg2 = findObject(":frame_2._bomitem_XTreeWidget");
        var count = widg.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            var row = widg2.topLevelItem(i);
            if(row.text(1) == "YPAINT2")
            {
                var obj3 = row.text(0);
                //                test.log(obj3);
            }
            
        }
        
        if(obj2 == bom1[countarr])
        {
            if(obj3 == bom1[countarr])
                test.pass("Moving Down operation of selected BOM is sucessful");
            else
                test.fail("Error in Moving Down operation of selected BOM is sucessful");
        }
        
        
        for(i=0;i<count-1;i++)
        {
            if(obj2 == bom1[i])
            {
                if(obj3 == bom1[++i])
                {  
                    test.pass("Moving Down operation of selected BOM is sucessful");
                    break;
                }
                else
                {   
                    test.fail("Error in Moving Down operation of selected BOM is sucessful");
                    break;
                }
            }
            
        }
        //-------Cancelling a BOM creation for kit type item-----
        waitForObject(":xTuple ERP:*.New_QPushButton_2");
        clickButton(":xTuple ERP:*.New_QPushButton_2");
        snooze(1);
        waitForObject(":Bill of Materials Item.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials Item.ItemLineEdit_ItemLineEdit", "YPAINT1");
        nativeType("<Tab>");
        waitForObject(":Bill of Materials Item.Cancel_QPushButton");
        clickButton(":Bill of Materials Item.Cancel_QPushButton");
        snooze(1);
        if(!object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='YPAINT1' type='QModelIndex'}"))
            test.pass("creating a BOM item cancelled sucessful");
        else
            test.fail("Error in cancelling BOM item");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        snooze(2);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in processing BOM items for kit type items"+e);
    }
    
    //------Customer Setup---------
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");        
        openItemContextMenu(":_list_XTreeWidget_3", "TTOYS",5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Settings");
        snooze(1);
        clickButton(waitForObject(":_settingsTab.Terms_QRadioButton"));
        snooze(1);
        nativeType("<Tab>");
        clickButton(waitForObject(":_creditStatusGroup.In Good Standing_QRadioButton"));
        if(findObject(":_creditGroup.Place on Credit Warning when Credit Limit/Grace Days is Exceeded_QCheckBox").checked)
            clickButton(waitForObject(":_creditGroup.Place on Credit Warning when Credit Limit/Grace Days is Exceeded_QCheckBox"));
        snooze(0.5);
        if(findObject(":_creditGroup.Place open Sales Orders on Credit Hold when Credit Limit is Exceeded_QCheckBox").checked)
            clickButton(waitForObject(":_creditGroup.Place open Sales Orders on Credit Hold when Credit Limit is Exceeded_QCheckBox"));
        
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in setting up customer"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));   
    }
    //----------Creating a Quote for a customer-----------
    try{
        flag = 0;
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
        
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit","TTOYS");
        nativeType("<Tab>");
        var quote = findObject(":_headerPage._orderNumber_XLineEdit").text;
        snooze(0.1);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "KTRUCK6");
        nativeType("<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "50");
        nativeType("<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        //----Converting quote to sales order------
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",quote, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Convert to S/O...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Convert to S/O...");
        snooze(0.5);
        clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        snooze(0.5);
        if(object.exists(":Sales Order.Yes_QPushButton"))
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        flag = 1;
    }
    catch(e)
    {
        test.fail("error in creation of quote" +e);
    }
    
    //---Verifying in sales order list------
    if(flag)
    {
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales");
            waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
            activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
            waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
            activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+quote+"' type='QModelIndex'}"))
                test.pass("Quote converted to sales order");
            else
                test.fail("failed to convert quote to sales order");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        catch(e)
        {
            test.fail("error in verifying in sales order list"+e);
        }
    }
    //-------Verifying for prospects----
    
    try{
        flag = 0;
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Prospect");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Prospect");
        waitForObjectItem(":xTuple ERP: *.Prospect_QMenu", "List...");
        activateItem(":xTuple ERP: *.Prospect_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(1);
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='WTOYS' type='QModelIndex'}"))
            test.log("WTOYS is available as a prospect");
        else
            test.fail("WTOYS is not available in prospect list");  
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        flag = 1;
    }
    catch(e)
    {
        test.fail("error in verifying in prospects list"+e);
    }
    //----------creating quote for a prospect--------------
    if(flag)
    {
        try{
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
            
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "WTOYS");
            nativeType("<Tab>");
            var quote1 = findObject(":_headerPage._orderNumber_XLineEdit").text;
            waitForObject(":_terms_XComboBox");
            clickItem(":_terms_XComboBox","2-10N30-2% Discount in 10 Days - Net 30 Days", 0, 0, 5, Qt.LeftButton);
            snooze(0.1);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            
            waitForObject(":_lineItemsPage.New_QPushButton");
            clickButton(":_lineItemsPage.New_QPushButton");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit", "KTRUCK6");
            nativeType("<Tab>");	
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            nativeType("<Tab>");	
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
            
            //----Converting quote to sales order------
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3",quote1, 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Convert to S/O...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Convert to S/O...");
            snooze(1);
            if(object.exists(":Sales Order.Yes_QPushButton"))
                clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            snooze(2);
            if(object.exists(":Sales Order.Yes_QPushButton"))
                clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            snooze(0.1);
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            flag = 1;
        }
        catch(e)
        {
            test.fail("error in creating quote for a prospect"+e);
        }
    }
    //---Verifying in Customer list----
    if(flag)
    {
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales");
            waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer");
            activateItem(":xTuple ERP: *.Sales_QMenu", "Customer");
            waitForObjectItem(":xTuple ERP: *.Customer_QMenu", "List...");
            activateItem(":xTuple ERP: *.Customer_QMenu", "List...");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(1);
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='WTOYS' type='QModelIndex'}"))
                test.pass("WTOYS is converted to customer");
            else
                test.fail("error in convertion of prospect to customer");  
            
            
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            
            //-----Verifying in sales order list-----
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales");
            waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
            activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
            waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
            activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+quote1+"' type='QModelIndex'}"))
                test.pass("Quote  converted toSales Order");
            else
                test.fail("error in convertion of quote to sales order");  
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        catch(e)
        {
            
            test.fail("error in verifying for sales order and customer"+e);
        }
    }
    //-----Creating a Sales Order-------
    
    var sonumber = createSalesOrder("KTRUCK6", "100");
    flag = 0; 
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        //----Editing a sales order line item----
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sonumber, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(2);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        snooze(0.5);
        waitForObject(":_lineItemsPage._soitem_XTreeWidget");
        clickItem(":_lineItemsPage._soitem_XTreeWidget","KTRUCK6", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_lineItemsPage.Edit_QPushButton");
        clickButton(":_lineItemsPage.Edit_QPushButton");
        snooze(1);
        waitForObject(":_qtyOrdered_XLineEdit_2");
        findObject(":_qtyOrdered_XLineEdit_2").clear();
        
        type(":_qtyOrdered_XLineEdit_2", "500");
        nativeType("<Tab>");
        snooze(0.5);
        if(object.exists(":Sales Order.Yes_QPushButton"))
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        if(object.exists(":Sales Order.Yes_QPushButton"))
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));        
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        if(object.exists(":Sales Order.Yes_QPushButton"))
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        snooze(0.5);
        waitForObject(":_lineItemsPage._soitem_XTreeWidget");
        var widget = findObject(":_lineItemsPage._soitem_XTreeWidget");
        var obj = widget.topLevelItem(0);
        
        if(obj.text(2) == "KTRUCK6" && obj.text(9) == "500.00")
            test.pass("SO line item edited sucessful");
        else
            test.fail("failed to edit SO Line item");
        
        clickButton(":Select Order for Billing.Save_QPushButton"); 
        
        //----------deleting a sales order--------
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sonumber, 5, 5, Qt.LeftButton);
        
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        snooze(2);
        if(object.exists(":Sales Order.Yes_QPushButton"))
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        snooze(0.5);
        if(!object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+sonumber+"' type='QModelIndex'}"))
            test.pass("sales order deleted sucessfully");
        else
            test.fail("error in deleting a sales order");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
        
    }
    catch(e)
    {
        test.fail("error in performing operations on sales order"+e);
    }
    
    //-----Creating a sales order--------
    var sonumber1 = createSalesOrder("KTRUCK6", "50");
    test.log(sonumber1);
    
    //--------Extarcting shipment Number--------
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Shipping and Receiving");
    waitForObject(":_nextShipmentNum_XLineEdit");
    
    var shipNo = findObject(":_nextShipmentNum_XLineEdit").text;
    test.log(shipNo);
    
    waitForObject(":Cash Receipt.Save_QPushButton_3");
    clickButton(":Cash Receipt.Save_QPushButton_3");
    shipNo++;
    //-----Issue stock to shipping---- 
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber1);
        nativeType("<Tab>");
        
        
        var widget = findObject(":_frame._soitem_XTreeWidget");
        var count = widget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            var row = widget.topLevelItem(i);
            if(row.text(1) == "KTRUCK6")
                test.fail("Parent kit type item is available in the list");
            else
                test.pass("Parent kit type item is not available in the list");
        }
        
        snooze(2);
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        snooze(0.1);
        if(object.exists(":_itemloc.Yes_QModelIndex_4"))
        {
            doubleClick(":_itemloc.Yes_QModelIndex_4", 3, 4, 0, Qt.LeftButton);
            waitForObject(":Issue to Shipping.Distribute_QPushButton");
            clickButton(":Issue to Shipping.Distribute_QPushButton");
            waitForObject(":Issue to Shipping.Post_QPushButton");
            clickButton(":Issue to Shipping.Post_QPushButton");
        }
        else if(object.exists(":_itemloc.No_QModelIndex_3"))
        {
            lotno = findObject("{column='3' container=':_frame._itemloc_XTreeWidget_3' type='QModelIndex'}").text;
            waitForObject(":_itemloc.No_QModelIndex_3");
            doubleClick(":_itemloc.No_QModelIndex_3", 3, 4, 0, Qt.LeftButton);
            
            waitForObject(":Issue to Shipping.Distribute_QPushButton");
            clickButton(":Issue to Shipping.Distribute_QPushButton");
            waitForObject(":Issue to Shipping.Post_QPushButton");
            clickButton(":Issue to Shipping.Post_QPushButton");
            
        }    
        
        
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        
        if(object.exists(":groupBox.Select for Billing_QCheckBox"))
        {
            if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
                clickButton(":groupBox.Select for Billing_QCheckBox");
            if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
                clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
        }
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        flag = 1;
    }
    catch(e)
    {
        test.fail("error in issue stock to shipping"+e);
    }
    //--------------Verifying GL Entries-----------------
    
    if(flag)
    {
        var bool1 = glTransactions(/Ship Order/,shipNo);
        if(bool1 == 1)
        {
            test.pass("Sales Order  has a GL entry for shipping its stock");
        }
        else
            test.fail("No GL entry is made for shipping the stock for a SO " + sonumber1);
    }
    shipNo++;
    
    //---------- Issuing stock to the order---------
    flag = 0;
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        mouseClick(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", 55, 16, 0, Qt.LeftButton);
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", quote);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        
        if(object.exists(":_itemloc.Yes_QModelIndex_4"))
        {
            doubleClick(":_itemloc.Yes_QModelIndex_4", 3, 4, 0, Qt.LeftButton);
            waitForObject(":Issue to Shipping.Distribute_QPushButton");
            clickButton(":Issue to Shipping.Distribute_QPushButton");
            snooze(0.5);
            waitForObject(":Issue to Shipping.Post_QPushButton");
            clickButton(":Issue to Shipping.Post_QPushButton");
        }
        else if(object.exists(":_itemloc.No_QModelIndex_3"))
        {
            lotno = findObject("{column='3' container=':_frame._itemloc_XTreeWidget_3' type='QModelIndex'}").text;
            waitForObject(":_itemloc.No_QModelIndex_3");
            doubleClick(":_itemloc.No_QModelIndex_3", 3, 4, 0, Qt.LeftButton);
            
            waitForObject(":Issue to Shipping.Distribute_QPushButton");
            clickButton(":Issue to Shipping.Distribute_QPushButton");
            snooze(0.5);
            waitForObject(":Issue to Shipping.Post_QPushButton");
            clickButton(":Issue to Shipping.Post_QPushButton");
            
        }    
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        flag = 1;
        
    }
    catch(e)
    {
        test.fail("Error in issue stock"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    
    //----Viewing in Maintain Shipping Contents----------
    if(flag)
    {
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Maintain Shipping Contents...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Maintain Shipping Contents...");
            waitForObject(":Receivables Workbench.Query_QPushButton");
            clickButton(":Receivables Workbench.Query_QPushButton");
            snooze(0.5);
            doubleClickItem(":_ship_XTreeWidget",quote,75, 4, 0, Qt.LeftButton);
            if(object.exists("{column='0' container=':_ship_XTreeWidget' text='"+shipNo+"' type='QModelIndex'}"))
                test.pass("Order existed in Maintain shipping contents screen");
            else
                test.fail("Order doesn't existed in Maintain shipping contents screen");
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            flag = 1;
        }
        
        
        catch(e)
        {
            test.fail("Error in viewing Maintain shipping contents"+e);
        }
        
    } 
    //-------Shipping Order from 'Ship Order screen-------
    if(flag)
    {
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Ship Order...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Ship Order...");
            
            waitForObject(":groupBox_2.VirtualClusterLineEdit_OrderLineEdit");
            type(":groupBox_2.VirtualClusterLineEdit_OrderLineEdit",quote);
            nativeType("<Tab>");
            
            
            if(object.exists(":groupBox.Select for Billing_QCheckBox"))
            {
                if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
                    clickButton(":groupBox.Select for Billing_QCheckBox");
                if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
                    clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
            }
            waitForObject(":Issue to Shipping.Ship_QPushButton");
            clickButton(":Issue to Shipping.Ship_QPushButton");
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in shipping the order"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
        
    }
    
    //------Customer Setup----
    flag = 0;
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP: *.Customer_QMenu", "List...");
        activateItem(":xTuple ERP: *.Customer_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        doubleClickItem(":_list_XTreeWidget_3","WTOYS", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Settings");
        snooze(0.5);
        waitForObject(":_settingsGroup.Accepts Backorders_QCheckBox");
        if(findObject(":_settingsGroup.Accepts Backorders_QCheckBox").checked)
            clickButton(":_settingsGroup.Accepts Backorders_QCheckBox");
        snooze(0.5);
        if(!(appE == "PostBooks"))
        {
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Sales Reps");
            waitForObject(":Sales Reps.New_QToolButton");
            clickButton(":Sales Reps.New_QToolButton");
            snooze(0.5);
            waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
            clickItem(":Sales Rep Assignment._salesRep_XComboBox","1000-Sam Masters", 0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            if(!findObject(":Sales Rep Assignment.Primary_XCheckBox").checked)
                clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
            waitForObject(":Cash Receipt.Save_QPushButton_3");
            clickButton(":Cash Receipt.Save_QPushButton_3");
        }
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        snooze(0.5);
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        flag = 1;
    }
    catch(e)
    {
        test.fail("Failed to setting up  customer"+e);
        
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    //----Issuing stock partially-------
    if(flag)
    {
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
            mouseClick(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", 39, 7, 0, Qt.LeftButton);
            waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
            type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", quote1);
            
            nativeType("<Tab>");
            
            waitForObject(":_frame._soitem_XTreeWidget");
            clickItem(":_frame._soitem_XTreeWidget","TWHEEL1", 0, 0, 5, Qt.LeftButton);
            waitForObject(":_frame.Issue Line_QPushButton");
            clickButton(":_frame.Issue Line_QPushButton");
            waitForObject(":_frame._soitem_XTreeWidget");
            clickItem(":_frame._soitem_XTreeWidget","CBODY1", 0, 0, 5, Qt.LeftButton);
            waitForObject(":_frame.Issue Line_QPushButton");
            clickButton(":_frame.Issue Line_QPushButton");
            
            waitForObject(":Issue to Shipping.Ship_QPushButton");
            clickButton(":Issue to Shipping.Ship_QPushButton");
            waitForObject(":Issue to Shipping.Ship_QPushButton_2");
            clickButton(":Issue to Shipping.Ship_QPushButton_2");
            snooze(1);
            if(object.exists(":Sales Order.OK_QPushButton_2"))
            {
                clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
                test.pass("it is not possible to ship the partail issued stock ");
            }
            else
                test.fail("partially issued Stock shipped sucessfullly without giving any error");
            
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            
            
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in shipping the stock"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));  
        }
    }
    
    
    //----Selecting order for billing---  
    try{
        flag = 0;
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        mouseClick(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit", 45, 3, 0, Qt.LeftButton);
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit",sonumber1);
        nativeType("<Tab>");
        
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        doubleClickItem(":_lineitemsTab._soitem_XTreeWidget","KTRUCK6", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        flag = 1;
    }
    catch(e)
    {test.fail("Error in selecting Balance for an order"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));  
        
    }
    
    //-----Recall orders for shipping----
    if(flag)
    {
        
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Recall Orders to Shipping...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Recall Orders to Shipping...");
            waitForObject(":xTuple ERP:*._ship_XTreeWidget");
            clickItem(":xTuple ERP:*._ship_XTreeWidget",sonumber1,0, 0, 5, Qt.LeftButton);
            waitForObject(":xTuple ERP:*.Recall_QPushButton");
            clickButton(":xTuple ERP:*.Recall_QPushButton");
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            flag = 1;
        }
        catch(e)
        {
            test.fail("Error in recalling shipping orders"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));  
        }
    } 
    
    //----Shipping same Sales Order again----
    if(flag)
    {
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            
            waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
            type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber1);
            
            waitForObject(":Issue to Shipping.Ship_QPushButton");
            clickButton(":Issue to Shipping.Ship_QPushButton");
            waitForObject(":Issue to Shipping.Ship_QPushButton_2");
            clickButton(":Issue to Shipping.Ship_QPushButton_2");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            flag = 1;
        }
        catch(e)
        {test.fail("Error in  shipping the sales order"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));  
        }
    }
    //---Billing Selections(creating invoice)
    if(flag)
    {
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales");
            waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
            activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
            waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
            activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
            waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
            activateItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
            snooze(1);
            if(OS.name=="Linux")
            {
                type(waitForObject(":xTuple ERP: *.Invoice_QMenu"), "<Left>");
                type(waitForObject(":xTuple ERP: *.Billing_QMenu"), "<Left>");
                type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
                snooze(1);
            }
            waitForObject(":xTuple ERP:*._cobill_XTreeWidget");
            clickItem(":xTuple ERP:*._cobill_XTreeWidget", sonumber1, 0, 0, 5, Qt.LeftButton);
            waitForObject(":xTuple ERP:*.Create Invoice_QPushButton");
            clickButton(":xTuple ERP:*.Create Invoice_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            flag = 1;
        }
        catch(e)
        {
            test.fail("error in creating invoice"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));  
            
        }
    }
    
    
    //----Posting invoice from list unposted-----------
    if(flag)
    {
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales");
            waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
            activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
            waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
            activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
            waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
            activateItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
            
            
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3",sonumber1, 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
            snooze(2);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            
            //----verifying price for line items-------
            
            var widget = findObject(":lineItemsTab._invcitem_XTreeWidget");
            var count = widget.topLevelItemCount;
            test.log(count);
            
            for(i=1;i<count;i++)
            {
                var obj = widget.topLevelItem(i);
                
                if(obj.text(8) == "0.0000")
                    test.pass("Child Kit type items doesn't have any price");
                else
                    test.fail("Child Kit type items have  price");
            }
            
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3",sonumber1, 5, 5, Qt.LeftButton);
            
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
            
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            if(!object.exists("{column='2' container=':_list_XTreeWidget_3' text='"+sonumber1+"' type='QModelIndex'}"))
                test.pass("invoice posted sucessful");
            else
                test.fail("failed to post invoice");
            
            
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            
        }
        catch(e)
        {
            test.fail("Error in processing invoice"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));  
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(waitForObject(":Quotes.Close_QToolButton"));  
        }
    }
    
    //---------Creating Work Order for kit type item---------------
    flag = 0;
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        
        var wo = findObject(":xTuple ERP:*._woNumber_XLineEdit").text;
        waitForObject(":_itemGroup_QLabel");
        sendEvent("QMouseEvent", ":_itemGroup_QLabel", QEvent.MouseButtonPress, 5, 15, Qt.LeftButton, 0);
        
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        
        waitForObject(":_listTab_XTreeWidget_11");
        if(!object.exists("{column='0' container=':_listTab_XTreeWidget_11' text='KTRUCK6' type='QModelIndex'}"))
            test.pass("kit type item is not available for creating WO");
        else
            test.fail("kit type item is available for creating WO");
        
        waitForObject(":_itemGroup.Cancel_QPushButton_2");
        clickButton(":_itemGroup.Cancel_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        
        //----Verifying in WO list-------------
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        if(!object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wo+"' type='QModelIndex'}"))
            test.pass("It is not possible to create WO for a kit type item");
        else
            test.fail("WO is created for kit type item");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creation of WO for kit type item"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }
    
    if(!(appE == "PostBooks"))
    {
        //-----Creating Planned Orders for kit type item-------
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
            activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
            waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
            activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
            waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
            activateItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
            waitForObject(":_itemGroup_QLabel");
            sendEvent("QMouseEvent", ":_itemGroup_QLabel", QEvent.MouseButtonPress, 14, 6, Qt.LeftButton, 0);
            waitForObjectItem(":_QMenu", "List...");
            activateItem(":_QMenu", "List...");
            
            waitForObject(":_listTab_XTreeWidget_11");
            if(!object.exists("{column='0' container=':_listTab_XTreeWidget_11' text='KTRUCK6' type='QModelIndex'}"))
                test.pass("kit type item is not available for creating Planned Order");
            else
                test.fail("kit type item is available for creating Planned Order");
            
            waitForObject(":_itemGroup.Cancel_QPushButton_2");
            clickButton(":_itemGroup.Cancel_QPushButton_2");
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            
            //-----Verifying in Planned Orders-----
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
            activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
            waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders...");
            activateItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders...");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            if(!object.exists("{column='4' container=':_list_XTreeWidget_3' text='KTRUCK6' type='QModelIndex'}"))
                test.pass("It is not possible to create Planned order for a kit type item");
            else
                test.fail("Planned order is created for kit type item");
            
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        catch(e)
        {
            test.fail("Error in creation of planned order for a kit type item "+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
        //------------Configure Sales setup-----------------
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales");
            waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup...");
            activateItem(":xTuple ERP: *.Sales_QMenu", "Setup...");
            
            waitForObject(":_stack._returnAuthorizationNumGeneration_NumberGenComboBox");
            clickItem(":_stack._returnAuthorizationNumGeneration_NumberGenComboBox", "Automatic, Use R/A #'s", 0, 0, 5, Qt.LeftButton);
            waitForObject(":_stack._nextRaNumber_XLineEdit");
            RANUM = findObject(":_stack._nextRaNumber_XLineEdit").text;
            
            
            waitForObject(":Setup.Apply_QPushButton");
            clickButton(":Setup.Apply_QPushButton");
            waitForObject(":Cash Receipt.Save_QPushButton_3");
            clickButton(":Cash Receipt.Save_QPushButton_3");
        }
        catch(e)
        {
            test.fail("Exception in configuring sales setup" + e);
        }
        //-----Setting Encryption Key----- 
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
            activateItem(":xTuple ERP: *_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
            activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
            
            sendEvent("QMouseEvent", waitForObject(":Setup._tree_XTreeWidget"), QEvent.MouseButtonPress, 84, 66, Qt.LeftButton, 0);
            
            if(object.exists(":Sales Order.OK_QPushButton_2"))
                clickButton(":Sales Order.OK_QPushButton_2");
            if(OS.name=="Linux")
            {
                findObject(":_stack_FileLineEdit_2").clear();
                waitForObject(":_stack_FileLineEdit_2");
                type(":_stack_FileLineEdit_2","/home/administrator/crypto");
                nativeType("<Tab>");
                snooze(1);
            }
            
            waitForObject(":Cash Receipt.Save_QPushButton_3");
            clickButton(":Cash Receipt.Save_QPushButton_3");
            snooze(0.1);
            if(object.exists(":Sales Order.No_QPushButton_2"))  
                clickButton(waitForObject(":Sales Order.No_QPushButton_2"));
        }
        catch(e)
        {
            test.fail("Error in setting the encryption configuration" + e);
        }
        
        snooze(2);
        //-------------- Enable Credit Cards setup------------
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
            activateItem(":xTuple ERP: *_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
            activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
            waitForObject(":Configure.Credit Card_QModelIndex");
            mouseClick(":Configure.Credit Card_QModelIndex", 38, 5, 0, Qt.LeftButton);
            if(object.exists(":_contactTab.OK_QPushButton"))
                clickButton(waitForObject(":_contactTab.OK_QPushButton"));
            if(!findObject(":_stack.Accept Credit Cards_QCheckBox").checked)
            {
                clickButton(":_stack.Accept Credit Cards_QCheckBox");
            }
            if(!findObject(":_stack.Work in Test Mode_QCheckBox").checked)
            {
                clickButton(":_stack.Work in Test Mode_QCheckBox");
            }
            
            waitForObject(":_stack._ccCompany_XComboBox");
            clickItem(":_stack._ccCompany_XComboBox", "External", 0, 0, 5, Qt.LeftButton);
            
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Fraud Detection");
            waitForObject(":Address Verification Service.Do not check_QRadioButton");
            clickButton(":Address Verification Service.Do not check_QRadioButton");
            clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
            snooze(1);
            if(object.exists(":Sales Order.No_QPushButton_2"))  
                clickButton(waitForObject(":Sales Order.No_QPushButton_2"));
        }
        catch(e)
        {
            test.fail("Exception in enabling credit card:"+e);
        }
        
        //---------Creating RA for a kit type item-----
        var credit1 = ["Return","Immediately","Credit Memo","KTRUCK6","30","25"];
        
        flag = createRA(credit1);
        
        if(flag == 1)
        {
            test.log("RA created with Disposition - Return, Credit By - Credit memo");
        }
        
        
        //------------Process payment----------
        if(flag)
        {
            memoNum = processPayment(RANUM);
            
            test.log("Payment processed successfully");
            test.log(memoNum);
            
        }
        //-----------------Verifying for  the credit memo-------
        
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales");
            waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
            activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
            waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Credit Memo");
            activateItem(":xTuple ERP: *.Billing_QMenu", "Credit Memo");
            waitForObjectItem(":xTuple ERP:*.Credit Memo_QMenu", "List Unposted...");
            activateItem(":xTuple ERP:*.Credit Memo_QMenu", "List Unposted...");
            
            snooze(0.1);
            
            waitForObject(":xTuple ERP:*._cmhead_XTreeWidget");
            if(object.exists("{column='0' container=':xTuple ERP:*._cmhead_XTreeWidget' text='"+memoNum+"' type='QModelIndex'}"))
                test.pass("credit memo is created");
            else
                test.fail("credit memo doesn't  created");
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        catch(e)
        {
            test.fail("Exception in verifying the credit memo: " + e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
        
    } 
}

