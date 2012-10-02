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
    var regqty = "100", mlcqty = "100", serqty = "2", lotqty = "10", toolqty = "10";
    var crtqty = "50";
    var postqty = "30";
    var post2qty = "40";
    var woqty = "100";
    var cngqty = "200";
    
    
    //---find Application Edition------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex",0, 0, 0, Qt.LeftButton);
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton); 
        }
        
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        
        if(object.exists(":_stack.Use toolbars on displays when available_QCheckBox"))
        {
            waitForObject(":_stack.Use toolbars on displays when available_QCheckBox");
            if(!findObject(":_stack.Use toolbars on displays when available_QCheckBox").checked)
                clickButton(":_stack.Use toolbars on displays when available_QCheckBox");
        }
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in identifying the application edition" + e);       
        
    }
    //--------------- Set the window to Tab view mode -------------
    tabView();
    
  
    //------Creating a Tooling item------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":_itemNumber_XLineEdit");
        type(":_itemNumber_XLineEdit", "TTOOL");
        nativeType("<Tab>");
        waitForObject(":_description1_XLineEdit");
        type(":_description1_XLineEdit", "Tooling Item1");
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*._description2_XLineEdit");
        type(":xTuple ERP:*._description2_XLineEdit", "Tooling purpose");
        nativeType("<Tab>");
        waitForObject(":_itemtype_XComboBox_2");
        clickItem(":_itemtype_XComboBox_2","Tooling",0, 0, 5, Qt.LeftButton);
        waitForObject(":_itemGroup._classcode_XComboBox");
        clickItem(":_itemGroup._classcode_XComboBox","TOYS-REPAIR-Repair Toys",0, 0, 5, Qt.LeftButton);
        waitForObject(":_inventoryUOM_XComboBox");
        clickItem(":_inventoryUOM_XComboBox","EA",0, 0, 5, Qt.LeftButton);
        waitForObject(":_itemGroup._freightClass_XComboBox");
        clickItem(":_itemGroup._freightClass_XComboBox","BULK-Bulk Freight",0, 0, 5, Qt.LeftButton);
        waitForObject(":_prodcat_XComboBox");
        clickItem(":_prodcat_XComboBox","CLASSIC-METAL - Classic Metal Product Line",0, 0, 5, Qt.LeftButton); 
        
        if(findObject(":Item is Sold._listprice_XLineEdit").checked)
            clickButton(":Item is Sold._listprice_XLineEdit"); 
        snooze(2);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.No_QPushButton_2");
        clickButton(":Sales Order.No_QPushButton_2");
        waitForObject(":_list_XTreeWidget_3");
        snooze(1);
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='TTOOL' type='QModelIndex'}"))
            test.pass("Item Created: TTOOL");
        else 
            test.fail("Item not created: TTOOL");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in creating item TTOOL:"+e);
    }
    
    //----- Item Site creation for Tooling item----
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":Item Site.ItemLineEdit_ItemLineEdit");
        type(":Item Site.ItemLineEdit_ItemLineEdit", "TTOOL");
        nativeType("<Tab>");   
        if(appEdition != "PostBooks")
        {
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2","WH1",0, 0, 5, Qt.LeftButton);
        }
        waitForObject(":Items.Site can manufacture this Item_QGroupBox"); 
        mouseClick(":Items.Site can manufacture this Item_QGroupBox", 113, 3, 0, Qt.LeftButton);
        waitForObject(":Item Site.Site can purchase this Item_QGroupBox");
        mouseClick(":Item Site.Site can purchase this Item_QGroupBox", 50, 8, 0, Qt.LeftButton);
        waitForObject(":Item Site.Sold from this Site_QGroupBox");
        mouseClick(":Item Site.Sold from this Site_QGroupBox", 29, 9, 0, Qt.LeftButton);
        waitForObject(":Control._controlMethod_XComboBox_2");
        clickItem(":Control._controlMethod_XComboBox_2","Regular",0, 0, 5, Qt.LeftButton);
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2","MRP-MRP Items",0, 0, 5, Qt.LeftButton);
        nativeType("<Tab>");
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2","FINISHED-Finished Product - WH1",0, 0, 5, Qt.LeftButton);
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        if(appEdition != "PostBooks")
        {
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
        }
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        snooze(1);
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TTOOL' type='QModelIndex'}"))
            test.pass("Item Site Created for: TTOOL");
        else 
            test.fail("Item Site not created for: TTOOL");
        
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in creating item TTOOL:"+e);
    }
    
    
    //------Adjusting QOH of TSUB1 Item-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_2");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_2", "TSUB1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_qty_XLineEdit");
        type(":_qty_XLineEdit", "500");
        var x=findObject(":_qty_XLineEdit").text;
        
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        var y=findObject(":_qtyGroup_XLabel").text;
        
        if (parseInt(x)==parseInt(y))
        {
            waitForObject(":_adjustmentTypeGroup.Relative_QRadioButton");
            clickButton(":_adjustmentTypeGroup.Relative_QRadioButton");
        }
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("TSUB1 inventory is adjusted");
    }
    catch(e)
    {
        test.fail("Error in adjusting QOH of TSUB1"+ e );
    }
    
  //-------- Work Order creation for different items-----
  
    
    var wonumreg = createWorkOrder("YTRUCK1", regqty);     //---- WO for Regular Item       
    var wonummlc = createWorkOrder("WTRUCK1", mlcqty);     //---- WO for Regular MLC item
    var wonumser = createWorkOrder("STRUCK1", serqty);     //---- WO for Serial Item
    
    var wonumtool = createWorkOrder("TTOOL", toolqty);    //---- WO for Tooling Item
    var wonumregular = createWorkOrder("YTRUCK1", regqty); //---- WO for Regular Item    
//    snooze(1);
  
    if(appEdition != "PostBook")
    {
        var wonumlot = createWorkOrder("YPAINT1", lotqty);  //--- WO for Lot Controlled Item
    }
  //-------- Work Order creation for CTRUCK1(Job Cost Item)-----
  try{
      
      waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
      activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
      waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
      activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
      waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
      activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
      waitForObject(":Quotes.New_QToolButton");
      clickButton(":Quotes.New_QToolButton");
      waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
      type(":_itemGroup.ItemLineEdit_ItemLineEdit", "CTRUCK1");
      nativeType("<Tab>");
      waitForObject(":_qtyGroup._qty_XLineEdit");
      mouseClick(":_qtyGroup._qty_XLineEdit", 64, 8, 0, Qt.LeftButton);
      waitForObject(":_qtyGroup._qty_XLineEdit");
      type(":_qtyGroup._qty_XLineEdit", "100");
      nativeType("<Tab>");
      nativeType("<Tab>");
      waitForObject(":_schedGroup.XDateEdit_XDateEdit");
      type(":_schedGroup.XDateEdit_XDateEdit", "+0");     
      nativeType("<Tab>");
      // Verification Point 'VP1'
      test.xverify(findObject(":Invalid Item_QMessageBox").text, "Item CTRUCK1 is set to Job Costing on Item Site WH1.  Work Orders for Job Cost Item Sites may only be created by Sales Orders.");
      snooze(1);
      waitForObject(":Sales Order.OK_QPushButton_2");
      clickButton(":Sales Order.OK_QPushButton_2");
      waitForObject(":Sales Order.Cancel_QPushButton");
      clickButton(":Sales Order.Cancel_QPushButton");
      snooze(1);   
      waitForObject(":Quotes.Close_QToolButton");
      clickButton(":Quotes.Close_QToolButton");
  }
  catch(e)
  {
      test.fail("Error occured while creating a Work Order for CTRUCK1" +e);
  }
snooze(1);

    
    // ----- Some External Flow cases----
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        //---- Editing a Work Order----
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumreg , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit..."); //  change some fields in this case....
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        //---- Releasing a Work Order----
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumreg , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release");
        snooze(1);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='R' type='QModelIndex'}"))
            test.pass("Work Order released successfully");
        else  
            test.fail("Error in releasing a Work Order");
        snooze(1);  
        
        //---- Recalling a Work Order----
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumreg , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Recall");
        activateItem(":xTuple ERP:*._menu_QMenu", "Recall");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='E' type='QModelIndex'}"))
            test.pass("Work Order recalled successfully");
        else  
            test.fail("Error in recalling a Work Order");
        snooze(1);
        test.log("Work Order released and recalled successfully");
        
        
        //---- Imploding a Work Order----
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumreg , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Implode...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Implode...");
        waitForObject(":Implode Work Order.Implode_QPushButton");
        clickButton(":Implode Work Order.Implode_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='O' type='QModelIndex'}"))
            test.pass("Work Order Imploded successfully");
        else  
            test.fail("Error in Imploding a Work Order");
        snooze(1);  
        //---- Exploding a Work Order----   
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumreg , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Explode...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Explode...");
        waitForObject(":Level.Multiple Level Explosion_QRadioButton");
        clickButton(":Level.Multiple Level Explosion_QRadioButton");
        waitForObject(":Explode Work Order.Explode_QPushButton");
        clickButton(":Explode Work Order.Explode_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='E' type='QModelIndex'}"))
            test.pass("Work Order Exploded successfully");
        else  
            test.fail("Error in Exploding a Work Order");
        snooze(1);
        test.log("Work Order Imploded and Exploded successfully");
        
        
        //---- Deleting a Serial type item's Work Order----  
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumser , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonumser+"' type='QModelIndex'}"))
            test.fail("Work Order not deleted successfully");
        else  
            test.pass("Work Order is deleted successfully");
        snooze(1);        
//        
        // ------Verifying the Bill of Materials of a WO -------
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumreg , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "View Bill of Materials...");
        activateItem(":xTuple ERP:*._menu_QMenu", "View Bill of Materials...");
        
        waitForObject(":frame_2._bomitem_XTreeWidget");
        if(object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='TBODY1' type='QModelIndex'}"))
            test.pass("TBODy1 - Item available");
        else  
            test.fail("TBODY1 - Item  not available");
        snooze(0.5);   
        
        waitForObject(":frame_2._bomitem_XTreeWidget");
        if(object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='YPAINT1' type='QModelIndex'}"))
            test.pass("YPAINT1 - Item available");
        else 
            test.fail("YPAINT1 - Item not available");
        
        waitForObject(":frame_2._bomitem_XTreeWidget");
        if(object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='TWHEEL1' type='QModelIndex'}"))
            test.pass("TWHEEL1 - Item available");
        else 
            test.fail("TWHEEL1 - Item not available");
        
        waitForObject(":frame_2._bomitem_XTreeWidget");
        if(object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='TSUB1' type='QModelIndex'}"))
            test.pass("TSUB1 - Item available");
        else 
            test.fail("TSUB1 - Item not available");
        
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        if (appEdition == "Manufacturing")
        {
            // ------Verifying the Bill of Operations of a WO -------
            
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3", wonumreg , 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "View Bill of Operations...");
            activateItem(":xTuple ERP:*._menu_QMenu", "View Bill of Operations...");
            
            waitForObject(":_booitem_XTreeWidget");
            if(object.exists("{column='1' container=':_booitem_XTreeWidget' text='PAINT' type='QModelIndex'}"))
                test.pass("Paint1 - operation is available");
            else  
                test.fail("Paint1 - operation is not available");
            snooze(0.5);
            waitForObject(":_booitem_XTreeWidget");
            if(object.exists("{column='1' container=':_booitem_XTreeWidget' text='ASSEMBLY' type='QModelIndex'}"))
                test.pass("Assembly - operation is available");
            else  
                test.fail("Assembly - operation is not available");
            snooze(0.5);
            waitForObject(":_booitem_XTreeWidget");
            if(object.exists("{column='1' container=':_booitem_XTreeWidget' text='None' type='QModelIndex'}"))
                test.pass("Shipping - operation is available");
            else  
                test.fail("Shipping - operation is not available");
            snooze(0.5);
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("External Flow use cases performed successfully")
            }
    catch(e)
    {
        test.fail(" Error in performing External Flow use cases " + e);
    }
  snooze(1);
  
    //-----Verification of QOH by Item (Before issue Materials to Work Order)-----.
    try{
        snooze(3);
        var qtybody=queryQoh("TBODY1","WH1",appEdition);
        test.log("qtybody1"+qtybody+"");
        snooze(0.5);
        var qtywheel=queryQoh("TWHEEL1","WH1",appEdition);
        snooze(0.5);
        var qtysub=queryQoh("TSUB1","WH1",appEdition);
        snooze(0.5);
        var qtyypaint=queryQoh("YPAINT1","WH1",appEdition);
        snooze(0.5);
        
        test.log("QOH verified successfuly before issuing the materials to the Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH before issuing the materials to the Work Order "+e);
    }
    
    //--- issuing materials to the Work Order  by item------- 
    snooze(6);
    issueItem(wonumreg, "YPAINT1", appEdition);
    snooze(0.5);
    issueItem(wonumreg, "TBODY1", appEdition);
    snooze(0.5);
    issueItem(wonumreg, "TSUB1", appEdition);
    snooze(0.5);
    issueItem(wonumreg, "TWHEEL1", appEdition);
    snooze(0.5);
    
    //-----Verification of updated QOH by Item (After issuing the materials to the WO)-----   
    
    try{
        var result=queryQoh("TWHEEL1","WH1",appEdition);
        if((qtywheel-parseInt(4*regqty)==result))
            test.pass("Quantity of TWHEEL1 is updated correctly");
        else
            test.fail("Quantity of TWHEEL1 is not updated correctly");
        snooze(0.5);
        result=queryQoh("TBODY1","WH1",appEdition);
        if((qtybody-parseInt(regqty)==result))
            test.pass("Quantity of TBODY1 is updated correctly");
        else
            test.fail("Quantity of TBODY1 is not updated correctly");
        snooze(0.5);
        result=queryQoh("TSUB1","WH1",appEdition);
        
        if((qtysub-parseInt(regqty)==result))
            test.pass("Quantity of TSUB1 is updated correctly");
        else
            test.fail("Quantity of TSUB1 is not updated correctly");
        snooze(0.5);
        
        result=queryQoh("YPAINT1","WH1",appEdition);
        if((qtyypaint-parseInt(0.01*regqty)==result))
            test.pass("Quantity of YPAINT1 is updated correctly");
        else
            test.fail("Quantity of YPAINT1 is not updated correctly");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH "+e);
    }
    //----- G/L transaction verification of Issue Materials of a Work Order -----
    
    var bool = glTransactions(/Material/, wonumreg);
    if(bool == 1)
    {
        test.pass("WO " + wonumreg + " has a GL entry for its Material Issue Transactions");
    }
    else
        test.fail("No GL entry is made for the  Material Issue Transactions of work order " + wonumreg);
//    
    //----- QOH Verification by Item (Before Post Opearation of the Work Order)-----.
    try{
        
        var qtyytruck=queryQoh("YTRUCK1", "WH1", appEdition);
        snooze(0.5);
        test.log("QOH verified successfuly before Post Operations of a Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH before Post Operations of the Work Order "+e);
    }
    
    //----- Post Operations of a Work Order (after issuing the materials)of regular type Item------
    if(appEdition == "Manufacturing")
        postOperations(wonumreg, regqty); 
    else
        postProductionim(wonumreg, regqty, appEdition);
    //-----Verification of updated QOH by Item (after post production)-----   
    
    result = queryQoh("YTRUCK1", "WH1", appEdition);
    if((result - parseInt(regqty) == qtyytruck))
        test.pass("QOH of YTRUCK1 is updated correctly after post production");
    else
        test.fail("QOH of YTRUCK1 is not updated correctly after post production");
    
    
    
    
    
    //----- G/L transaction verification for Post Operations of a Work Order -----
    if(appEdition == "Manufacturing")
    {
        bool = glTransactions(/Post Setup/, wonumreg);
        if(bool == 1)
        {
            test.pass("WO " + wonumreg + " has a GL entry for its Post Operations");
        }
        else
            test.fail("No GL entry is made for the Post Operations of the work order " + wonumreg);
    }
    else
    { 
        bool = glTransactions(/Receive Inventory/, wonumreg);
        if(bool == 1)
        {
            test.pass("WO " + wonumreg + " has a GL entry for its Post Production");
        }
        else
            test.fail("No GL entry is made for the post production of work order " + wonumreg);
    }
    
    //-----Verification of QOH by Item (Before Correcting the Post Operations of a Work Order)-----.
    try{
        
        qtyytruck=queryQoh("YTRUCK1", "WH1", appEdition);
        snooze(0.5);
        test.log("QOH verified successfuly before correcting the Post Operations of a Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH before correcting the Post Operations work order"+e);
    }
    //----- Correct the Post operations of a Work Order of regular type Item------
    if(appEdition == "Manufacturing")   
        correctOperations(wonumreg, crtqty); //----- function calling to Correct post operations---
    
    else
        correctProduction(wonumreg, crtqty, appEdition); 
    //-----Verification of updated QOH by Item (after Correcting the  Operations Posted)-----  
    
    result=queryQoh("YTRUCK1", "WH1", appEdition);
    if((qtyytruck-parseInt(crtqty)==result))
        test.pass(" YTRUCK1  QOH is updated correctly");
    else
        test.fail("YTRUCK1  QOH is not updated correctly");
    
    if(appEdition == "Manufacturing")
    {
        //-----G/L transaction  verification of Correcting the Post Operations of a Work Order -----
        bool = glTransactions(/Post Setup/, wonumreg);
        if(bool == 1)
        {
            test.pass("WO " + wonumreg + " has a GL entry for its Correcting Post Operations");
        }
        else
            test.fail("No GL entry is made for the Correcting Post operations of work order " + wonumreg);
    }
    //-----  Bill of Materials verification and Qty Per value-----
    
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Products_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Bills of Materials");
        activateItem(":xTuple ERP:*.Reports_QMenu_2", "Bills of Materials");
        waitForObjectItem(":xTuple ERP:*.Bills of Materials_QMenu", "Single Level...");
        activateItem(":xTuple ERP:*.Bills of Materials_QMenu", "Single Level...");
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
//        mouseClick(":Bill of Materials.ItemLineEdit_ItemLineEdit", 94, 16, 0, Qt.LeftButton);
//        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "WTRUCK1");
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='WPAINT1' type='QModelIndex'}" && "{column='8' container=':_list_XTreeWidget_3' text='0.0100' type='QModelIndex'}"))
            test.pass("YPAINT1 - Item available and Qty per value is correct");
        else 
            test.fail("YPAINT1 - Item is not available or Qty per value is incorrect");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TBODY1' type='QModelIndex'}" && "{column='8' container=':_list_XTreeWidget_3' text='1.0000' type='QModelIndex'}"))
            test.pass("TBODY1 - Item available and Qty per value is correct");
        else 
            test.fail("TBODY1 - Item is not available or Qty per value is incorrect");
        
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TWHEEL1' type='QModelIndex'}" && "{column='8' container=':_list_XTreeWidget_3' text='4.0000' type='QModelIndex'}"))
            test.pass("TWHEEL1 - Item available and Qty per value is correct");
        else 
            test.fail("TWHEEL1 - Item is not available or Qty per value is incorrect");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TSUB1' type='QModelIndex'}" && "{column='8' container=':_list_XTreeWidget_3' occurrence='2' text='1.0000' type='QModelIndex'}"))
            test.pass("TSUB1 - Item available and Qty per value is correct");
        else 
            test.fail("TSUB1 - Item is not available or Qty per value is incorrect");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in viewing single level bill of materials" + e);
    }
    //-----Verification of QOH by Item (Before issueing the Materials to Work Order)-----.
    snooze(5);
    try{
        snooze(10);
        
        
        var qtywpaint=queryQoh("WPAINT1", "WH1", appEdition);
        snooze(0.5);
        qtywheel=queryQoh("TWHEEL1", "WH1", appEdition);
        snooze(0.5);
        qtysub=queryQoh("TSUB1", "WH1", appEdition);
        qtybody=queryQoh("TBODY1", "WH1", appEdition);
        test.log(qtybody);
        test.log("QOH verified successfuly before issuing the materials to the Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH before issuing the materials to the Work Order "+e);
    }
    //----Issuing materials by Batch------
    issueBatch(wonummlc, "WTRUCK1", appEdition);
    
    //-----Verification of updated QOH by Item (After issuing the materials to the WO)-----   
    
    try{
        result=queryQoh("TWHEEL1", "WH1", appEdition);
        if((qtywheel-parseInt(4*mlcqty)==result))
            test.pass("Quantity of TWHEEL1 is updated correctly");
        else
            test.fail("Quantity of TWHEEL1 is not updated correctly");
        
        result=queryQoh("TBODY1", "WH1", appEdition);
        test.log("result qty "+result+"");
        test.log("qtybody qty "+qtybody+"");
        test.log("mlc qty "+mlcqty+"");
        if((qtybody-parseInt(mlcqty)==result))
            test.pass("Quantity of TBODY1 is updated correctly");
        else
            test.fail("Quantity of TBODY1 is not updated correctly");
        result=queryQoh("TSUB1", "WH1", appEdition);
        
        if((qtysub-parseInt(mlcqty)==result))
            test.pass("Quantity of TSUB1 is updated correctly");
        else
            test.fail("Quantity of TSUB1 is not updated correctly");
        result=queryQoh("WPAINT1", "WH1", appEdition);
        if((qtywpaint-parseInt(0.01*mlcqty)==result))
            test.pass("Quantity of WPAINT1 is updated correctly");
        else
            test.fail("Quantity of WPAINT1 is not updated correctly");
        test.log("QOH verified successfuly after issuing the materials to the Work Order ");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH after issuing the materials to the Work Order"+e);
    }
    //-----Verification of QOH by Item (Before Post Production of a Work Order)-----.
    try{
        
        var qtywtruck=queryQoh("WTRUCK1", "WH1", appEdition);
        snooze(0.5);
        test.log("QOH verified successfuly before performing the Post operations for the "+wonummlc+"Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying QOH before performing the Post operations for the "+wonummlc+" Work Order "+e);
    }
    //------- Post Production  for WTRCUK1 WO----
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonummlc , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", mlcqty);
        nativeType("<Tab>");
        if(appEdition == "Manufacturing")
        {
            if(!findObject(":_optionsGroup.Backflush Operations_XCheckBox").checked)
                clickButton(":_optionsGroup.Backflush Operations_XCheckBox");
        }
        if(findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked)
            clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        
        waitForObject(":_frame._itemloc_XTreeWidget_3");
        clickItem(":_frame._itemloc_XTreeWidget_3", "01010101", 27, 9, 0, Qt.LeftButton);
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Post production of "+wonummlc+" WO is performed successfully");
    }
    catch(e)
    {
        test.fail("Error : Post Production of "+wonummlc+" WO"+e);
    }
    //-----Verification of updated QOH by Item (After Post Production of the WO)-----   
    
    
    result=queryQoh("WTRUCK1", "WH1", appEdition);
    if((qtywtruck+parseInt(mlcqty)==result))
        test.pass("QOH verified successfuly after Post Production for the "+wonummlc+"Work Order");
    else
        test.fail("Error in verifying the QOH after Post Production performed for the "+wonummlc+" Work Order");
    
    //-----Verification of G/L transaction for Post Production of Work Order -----
    
    bool = glTransactions(/Receive Inventory/, wonummlc);
    if(bool == 1)
    {
        test.pass("WO " + wonummlc + " has a GL entry for its Post Production");
    }
    else
        test.fail("No GL entry is made for the post production of work order " + wonummlc);
    
    //-----Verification of QOH by Item (Before Correcting the Post Production of a Work Order)-----.
    try{
        
        qtywtruck=queryQoh("WTRUCK1", "WH1", appEdition);
        snooze(0.5);
        test.log("QOH verified successfuly before correcting the Post Production for the "+wonummlc+"Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying QOH before correcting the Post Production for the "+wonummlc+" Work Order "+e);
    }
    
    //------- Correcting the Post Production for WTRUCK1 (MLC) WO----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Correct Production Posting...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Correct Production Posting...");
        waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit");
        type(":groupBox.VirtualClusterLineEdit_WoLineEdit", wonummlc);
        nativeType("<Tab>");
        if(!findObject(":_optionsGroup.Backflush Materials_XCheckBox").checked)
            clickButton(":_optionsGroup.Backflush Materials_XCheckBox");
        if(appEdition == "Manufacturing")
        {
            waitForObject(":_optionsGroup.Backflush Operations_XCheckBox_2");
            if(!findObject(":_optionsGroup.Backflush Operations_XCheckBox_2").checked)
                clickButton(":_optionsGroup.Backflush Operations_XCheckBox_2");
        } 
        waitForObject(":_qtyGroup._qty_XLineEdit").clear();
        type(":_qtyGroup._qty_XLineEdit", crtqty);
        nativeType("<Tab>");
        
        waitForObject(":Correct Production Posting.Post_QPushButton");
        clickButton(":Correct Production Posting.Post_QPushButton");
        waitForObject(":_frame._itemloc_XTreeWidget");
        clickItem(":_frame._itemloc_XTreeWidget", "01010101", 44, 7, 0, Qt.LeftButton);
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log(" Post Production Correction for MLC type item WO"+wonummlc+" is successful");
    }
    catch(e)
    {
        test.fail("Error in Correcting the Post Production for MLC type item WO"+wonummlc+" "+e);
    }
    
    //----- Updated QOH Verification by Item (After issuing the materials to the WO)-----   
    
    
    result=queryQoh("WTRUCK1", "WH1", appEdition);
    if((qtywtruck-parseInt(crtqty)==result))
        test.pass("Quantity of WTRUCK1 is updated correctly");
    else
        test.fail("Quantity of WTRUCK1 is not updated correctly");
    //----- G/L transaction verification offor Correcting the Post Production of Work Order -----
    bool = glTransactions(/Correct Receive Inventory/, wonummlc);
    if(bool == 1)
    {
        test.pass("WO " + wonummlc + " has a GL entry for its Post Production correction");
    }
    else
        test.fail("No GL entry is made for the correcting the post production of work order " + wonummlc);
    
    //------- Post Production for Tooling item -----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3");
        mouseClick(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3", 36, 14, 0, Qt.LeftButton);
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3", wonumtool);
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit",toolqty);
        if(!findObject(":_optionsGroup.Backflush Materials_XCheckBox_2").checked)
            clickButton(":_optionsGroup.Backflush Materials_XCheckBox_2");
        if(findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked)
            clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
        
        test.log("Post Production of tooling type item's "+wonumtool+" work order is successful");
    }
    catch(e)
    {
        test.fail("Error in performing the Post Production of a tooling type item's Work Order "+wonumtool+""+e);
    }
    
    
    //------ Partial Post Production for a Work order----
    
    
    
    //----Issue materials by Batch ------
    
    
    issueBatch(wonumregular, "YTRUCK1",appEdition);
    //
    test.log(wonumregular);
    //----- QOH Verification  (Before 1st Post Production of Work Order)-----.
    try{
        
        qtyytruck=queryQoh("YTRUCK1", "WH1", appEdition);
        snooze(0.5);
        test.log("QOH verified successfuly before 1st Post production of "+wonumregular+" Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH before 1st Post production the "+wonumregular+" Work Order "+e);
    }
    //----- Post Production of a Work Order (1st time)of regular type Item------
    
    postProductionim(wonumregular, postqty,appEdition); 
    
    
    //-----Updated  QOH Verification  (after 1st post production)-----   
    
    result=queryQoh("YTRUCK1", "WH1", appEdition);
    if((qtyytruck+parseInt(postqty)==result))
        test.pass(" YTRUCK1 QOH updated correctly after 1st Post Production");
    else
        test.fail("YTRUCK1 QOH is not updated  correctly after 1st Post Production");
    
    //-----QOH Verification  (Before 2nd Post Production of Work Order)-----.
    try{
        
        qtyytruck=queryQoh("YTRUCK1", "WH1", appEdition);
        snooze(0.5);
        test.log("QOH verified successfuly before 2nd Post production of a Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH before 2nd Post production the Work Order "+e);
    }
    //----- Post Production of a Work Order (2nd time)of regular type Item------
    
    postProductionim(wonumregular, postqty, appEdition);  //-----Verification of updated QOH by Item (after 2nd post production)-----   
    
    result=queryQoh("YTRUCK1", "WH1", appEdition);
    if((qtyytruck+parseInt(postqty)==result))
        test.pass("YTRUCK1 QOH updated correctly after 2nd Post Production");
    else
        test.fail("YTRUCK1 QOH is not updated  correctly after 2nd Post Production");
    
    //-----QOH Verification  (Before 3rd Post Production of Work Order)-----.
    try{
        
        qtyytruck=queryQoh("YTRUCK1", "WH1", appEdition);
        snooze(0.5);
        test.log("QOH verified successfuly before 3rd Post production of a Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH before 3rd Post production the Work Order "+e);
    }
    //----- Post Production of a Work Order (3rd Time)of regular type Item------
    
    postProductionim(wonumregular, post2qty,appEdition);  //-----Updated  QOH Verification (after 3rd post production)---   
    
    result=queryQoh("YTRUCK1", "WH1", appEdition);
    if((qtyytruck+parseInt(post2qty)==result))
        test.pass("YTRUCK1 QOH updated correctly after 3rd Post Production");
    else
        test.fail("YTRUCK1 QOH is not updated   correctly after 3rd Post Production");
    
    
  //-----------Disassembly Work Order Processing------
  
    //------ Creating a new Disassembly Work Order-----
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        mouseClick(":_qtyGroup._qty_XLineEdit", 219, 9, 0, Qt.LeftButton);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        nativeType("<Tab>");    
        waitForObject(":_itemGroup.Disassembly_QRadioButton");
        clickButton(":_itemGroup.Disassembly_QRadioButton");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        mouseClick(":_schedGroup.XDateEdit_XDateEdit", 75, 13, 0, Qt.LeftButton);
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "<0>");
        nativeType("<Tab>");
        var  wonumdis = findObject(":xTuple ERP:*._woNumber_XLineEdit").text;
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonumdis+"' type='QModelIndex'}"))
            test.pass(""+wonumdis+" Work Order is created successfully for  YTRUCK1");
        else  
            test.fail(""+wonumdis+" Work Order is not created for  YTRUCK1");
        snooze(1);  
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creatng a Disassembly WO"+e);
    }
    
    //------  Editing a Disassembly Work Order----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumdis , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Change Quantity...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Change Quantity...");
        waitForObject(":Change W/O Quantity Ordered._newQtyOrdered_XLineEdit");
        type(":Change W/O Quantity Ordered._newQtyOrdered_XLineEdit", cngqty);
        nativeType("<Tab>");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumdis , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(1);
        // test.compare(findObject(":_itemGroup.Disassembly_QRadioButton").checked, true);
        if(findObject(":_itemGroup.Disassembly_QRadioButton").checked)
            test.pass("WO method is not changed");
        else
            test.fail("WO mathod is changed");    
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Disassembly WO edited succesfully and qty is changed to "+cngqty+"");
    }
    catch(e)
    {
        test.fail("Error in editing the Disassembly WO"+e);
    }
    
    //-----  QOH verification (Before Post Production of Work Order)-----.
    try{
        
        qtyytruck=queryQoh("YTRUCK1", "WH1", appEdition);
        snooze(0.5);
        test.log("QOH verified successfuly before Post production of  "+wonumdis+" Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH before Post production of "+wonumdis+" Work Order "+e);
    }
    
    //------ Post Production of the WO------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3");
        mouseClick(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3", 36, 14, 0, Qt.LeftButton);
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3", wonumdis);
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit",cngqty);
        if(findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked)
            clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
        
        test.log("Post Production of disassemly WO "+wonumdis+"  is successful");
    }
    catch(e)
    {
        test.fail("Error in performing the Post Production of disassemly WO "+wonumtool+""+e);
    }
    
    //-----Updated QOH verification (after  post production)-----   
    
    result=queryQoh("YTRUCK1", "WH1", appEdition);
    if((qtyytruck-parseInt(cngqty)==result))
        test.pass("Quantity of YTRUCK1 is updated correctly after Post Production");
    else
        test.fail("Quantity of YTRUCK1 is not updated  correctly after 2nd Post Production");
    
    //----- verified QOH is assigned to ytruck before Post Production--------
    qtyytruck = result;
    
    
    //------ Correcting the Post Production-------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Correct Production Posting...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Correct Production Posting...");
        waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit");
        mouseClick(":groupBox.VirtualClusterLineEdit_WoLineEdit", 20, 6, 0, Qt.LeftButton);
        waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit");
        type(":groupBox.VirtualClusterLineEdit_WoLineEdit", wonumdis);
        snooze(1);
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", crtqty);
        
        nativeType("<Tab>");
        waitForObject(":Correct Production Posting.Post_QPushButton");
        clickButton(":Correct Production Posting.Post_QPushButton");
        test.log("Post Production of "+wonumdis+" workorder is corrected successfully");
        snooze(1);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Correcting the Disassembly WO");
    }
    
    
    //-----Updated QOH Verification (after correcting the post production)-----   
    
    result=queryQoh("YTRUCK1", "WH1", appEdition);
    if((qtyytruck+parseInt(crtqty)==result))
        test.pass("Quantity of YTRUCK1 is updated correctly after Correcting the Post Production");
    else
        test.fail("Quantity of YTRUCK1 is not updated  correctly after Correcting the Post Production");
    
    
  
    
    //--------- Indented Work Order Processing-----
    
    
    //-------- Enabling 'Create Child W/O at Parent W/O Explosion' option---
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        activateItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        activateItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        waitForObjectItem(":xTuple ERP:*._bom_XTreeWidget", "YTRUCK1");
        clickItem(":xTuple ERP:*._bom_XTreeWidget", "YTRUCK1", 29, 10, 0, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        waitForObjectItem(":frame_2._bomitem_XTreeWidget", "TSUB1");
        clickItem(":frame_2._bomitem_XTreeWidget", "TSUB1", 27, 4, 0, Qt.LeftButton);
        clickButton(waitForObject(":frame_2.Edit_QPushButton"));

        if(!findObject(":Bill of Materials Item.Create Child W/O at Parent W/O Explosion_QGroupBox").checked)
        {  
            
            mouseClick(":Bill of Materials Item.Create Child W/O at Parent W/O Explosion_QGroupBox", 29, 5, 0, Qt.LeftButton);
            
            if(findObject(":Create Child W/O at Parent W/O Explosion.Issue Child W/O to Parent W/O at Receipt_QCheckBox").checked)
            {
                mouseClick(":Create Child W/O at Parent W/O Explosion.Issue Child W/O to Parent W/O at Receipt_QCheckBox", 29, 5, 0, Qt.LeftButton);
                // clickButton(":Create Child W/O at Parent W/O Explosion.Issue Child W/O to Parent W/O at Receipt_QCheckBox");    
            }
        }
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Create Child W/O at Parent W/O Explosion option is successfully enabled ");
    }
    catch(e)
    {
        test.log("Error in Enabling Create Child W/O at Parent W/O Explosion option"+e);
    }
    
    snooze(3);
    var wonumindent = createWorkOrder("YTRUCK1",woqty);   
    var arr = wonumindent.toString().split("-");
    test.log(arr[0]);
    var wonumindent1 = arr[0] + "-2";
    //----- Verification for the Indented WO -------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonumindent1+"' type='QModelIndex'}"))
            test.pass(""+wonumindent1+" Work Order is created successfully for  TSUB1");
        else  
            test.fail(""+wonumindent1+" Work Order is not created for  TSUB1");
        snooze(1);   
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in verifying for the Indented Work Order"+e);
    }
    
    //-----Verification of QOH by Item (Before issue Materials to Work Order)-----.
    
    var qtybox=queryQoh("TBOX1", "WH1", appEdition);
    snooze(0.5);
    var qtyinsert=queryQoh("TINSERT1", "WH1", appEdition);
    snooze(0.5);
    qtysub=queryQoh("TSUB1", "WH1", appEdition);
    
    //----- Post Production for the Indented WO---
    
    postProductionim(wonumindent1, woqty, appEdition)
            
            //-----Verification of updated QOH by Item (After issuing the materials to the WO)-----   
            
            result=queryQoh("TBOX1", "WH1", appEdition);
    if((qtybox-parseInt(woqty)==result))
        test.pass("Quantity of TBOX1 is updated correctly");
    else
        test.fail("Quantity of TBOX1 is not updated correctly");
    snooze(0.5);
    
    result=queryQoh("TINSERT1", "WH1", appEdition);
    if((qtyinsert-parseInt((1.1)*woqty)==result))
        test.pass("Quantity of TINSERT1 is updated correctly");
    else
        test.fail("Quantity of TINSERT1 is not updated correctly");
    snooze(0.5);
    
    result=queryQoh("TSUB1", "WH1", appEdition);
    if((qtysub+parseInt(woqty)==result))
        test.pass("Quantity of TSUB1 is updated correctly");
    else
        test.fail("Quantity of TSUB1 is not updated correctly");
    snooze(0.5);      
    
    //-----Verification of G/L transaction for Post Production of Work Order -----
    
    bool = glTransactions(/Receive Inventory/, wonumindent1);
    if(bool == 1)
    {
        test.pass("WO " + wonumindent1 + " has a GL entry for its Post Production");
    }
    else
        test.fail("No GL entry is made for the post production of work order " + wonumindent1);
    
    
    //-----Verification of QOH by Item (Before issue Materials to Work Order)-----.
    
    
    qtybody=queryQoh("TBODY1", "WH1", appEdition);
    snooze(0.5);
    qtyypaint=queryQoh("YPAINT1", "WH1", appEdition);
    snooze(0.5);
    qtywheel=queryQoh("TWHEEL1", "WH1", appEdition);
    snooze(0.5);
    qtysub=queryQoh("TSUB1", "WH1", appEdition);
    snooze(0.5);
    
    
    //----Issuing materials by Batch------
    issueBatch(wonumindent, "YTRUCK1",appEdition);
    
    //-----Verification of updated QOH by Item (After issuing the materials to the WO)-----   
    
    try{
        result=queryQoh("TWHEEL1", "WH1", appEdition);
        if((qtywheel-parseInt(4*woqty)==result))
            test.pass("Quantity of TWHEEL1 is updated correctly");
        else
            test.fail("Quantity of TWHEEL1 is not updated correctly");
        
        result=queryQoh("TBODY1", "WH1", appEdition);
        if((qtybody-parseInt(woqty)==result))
            test.pass("Quantity of TBODY1 is updated correctly");
        else
            test.fail("Quantity of TBODY1 is not updated correctly");
        result=queryQoh("TSUB1", "WH1", appEdition);
        if((qtysub-parseInt(woqty)==result))
            test.pass("Quantity of TSUB1 is updated correctly");
        else
            test.fail("Quantity of TSUB1 is not updated correctly");
        result=queryQoh("YPAINT1", "WH1", appEdition);
        if((qtyypaint-parseInt(0.01*woqty)==result))
            test.pass("Quantity of YPAINT1 is updated correctly");
        else
            test.fail("Quantity of YPAINT1 is not updated correctly");
        test.log("QOH verified successfuly after issuing the materials to the Work Order ");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH after issuing the materials to the Work Order"+e);
    }
    //-----Verification of QOH by Item (Before Post Production of Work Order)
    
    
    qtyytruck=queryQoh("YTRUCK1", "WH1", appEdition);
    snooze(0.5);
    test.log("QOH verified successfuly before Post production of a "+wonumindent+" Work Order");
    
    //----- Post Production of a Work Order (after issuing the materials)of regular type Item------
    
    postProductionim(wonumindent, woqty, appEdition); // if you get any error here declare regqty as variable and assign some value to it..
    
    
    
    //-----Verification of updated QOH by Item (after post production)-----   
    
    result=queryQoh("YTRUCK1", "WH1", appEdition);
    if((qtyytruck+parseInt(woqty)==result))
        test.pass("Quantity of YTRUCK1 is updated correctly after 1st Post Production");
    else
        test.fail("Quantity of YTRUCK11 is not updated  correctly after 1st Post Production");
    
    
    
    var wonumindent2 = createWorkOrder("YTRUCK1",woqty);   
    var arr = wonumindent2.toString().split("-");
    test.log(arr[0]);
    var wonumindent3 = arr[0] + "-2";
    //----- Verification for the Indented WO -------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonumindent3+"' type='QModelIndex'}"))
            test.pass(""+wonumindent3+" Work Order is created successfully for  TSUB1");
        else  
            test.fail(""+wonumindent3+" Work Order is not created for  TSUB1");
        snooze(1);
    }
    catch(e)
    {
        test.fail("Error in verifying for the Indented Work Order"+e);
    }
    //---- Deleting the Child Work Order---- 
    try{
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumindent3 , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonumindent3+"' type='QModelIndex'}"))
            test.fail("Work Order not deleted successfully");
        else  
            test.pass("Work Order is deleted successfully");
        snooze(1);
    }
    catch(e)
    {
        test.fail("Error in deleting intended Work Order"+e);
    }
    //----- Verifying the WO's Material Requiremet after deleting the child work order---
    try{
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", wonumindent2 , 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "View Material Requirements...");
        activateItem(":xTuple ERP:*._menu_QMenu", "View Material Requirements...");
        waitForObject(":_list_XTreeWidget_9");
        if(object.exists("{column='0' container=':_list_XTreeWidget_9' text='TSUB1' type='QModelIndex'}" && "{column='7' container=':_list_XTreeWidget_9' occurrence='2' text='100.00' type='QModelIndex'}"))
            test.pass("TSUB1 - Item available and it is displaying correct  required Qty even after deleting the Child Work Order created for TSUB1");
        else 
            test.fail("TSUB1 - Item is not available or Qty per value is incorrect");
        waitForObject(":xTuple ERP:*.Close_QToolButton");
        clickButton(":xTuple ERP:*.Close_QToolButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in vewing the WO material requirement after deleting the Child Work Order"+e);
    }
    
    
    
}
