
function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
   
    
    //------Editing the preferences---
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
        activateItem(":xTuple ERP: *_QMenuBar_3", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Preferences...");
        activateItem(":xTuple ERP: *.System_QMenu_2", "Preferences...");
        
        waitForObject(":Interface Options.Show windows inside workspace_QRadioButton");
            snooze(1);
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
                snooze(0.3);
        if(object.exists(":Notice.Notice_QDialog"))
        {
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                clickButton(":Notice.Remind me about this again._QCheckBox");
            snooze(0.5);
            clickButton(":Notice.OK_QPushButton");
        }
        waitForObject(":User Preferences.Save_QPushButton_2");
        clickButton(":User Preferences.Save_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in editing preferences" + e);
    }
    
    
    //--------Exiting the application-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
    activateItem(":xTuple ERP: *_QMenuBar_3", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: *.System_QMenu_2", "Exit xTuple ERP...");
    
    snooze(5);
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
  

  //-----Variable Declaration-----
  var ponumber, vounumber, polineitem, poquantity;
  
  //---find Application Edition------ 
  try
  {
      waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
      activateItem(":xTuple ERP: *_QMenuBar_3", "System");
      waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Setup...");
      activateItem(":xTuple ERP: *.System_QMenu_2", "Setup...");
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
      
      waitForObject(":Database Information.*_QLabel_2");
      var appEdition = findObject(":Database Information.*_QLabel_2").text;
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
      test.fail("Error in identifying application edition" + e);
  }
  
  
   //-----Setting Encryption Key----- 
    
    try
    {	
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
        activateItem(":xTuple ERP: *_QMenuBar_3", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu_2", "Setup...");
         waitForObjectItem(":Setup._tree_XTreeWidget", "Configure.Encryption");
          clickItem(":Setup._tree_XTreeWidget", "Configure.Encryption", 20, 5, 0, Qt.LeftButton);
        snooze(1);
        if(object.exists(":View Check Run.OK_QPushButton"))
        {
            clickButton(":View Check Run.OK_QPushButton");
        }
        snooze(1);
        waitForObject(":_ccEncKeyName_QLineEdit").clear();
        type(":_ccEncKeyName_QLineEdit", "xTuple.key");
        waitForObject(":Encryption Configuration_FileLineEdit").clear();
        type(":Encryption Configuration_FileLineEdit", "c:/crypto");
        waitForObject(":Encryption Configuration_FileLineEdit_2").clear();
        type(":Encryption Configuration_FileLineEdit_2", "/home/administrator/crypto");
        waitForObject(":Encryption Configuration_FileLineEdit_3").clear();
        type(":Encryption Configuration_FileLineEdit_3", "/users/crypto");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in setting the encryption configuration" + e);
    }
    
    //--------Set the desired cost of TBOX1 to 0.25-------------------
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Products");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Products");
        waitForObjectItem(":xTuple ERP: *.Products_QMenu", "Item");
        activateItem(":xTuple ERP: *.Products_QMenu", "Item");    
        waitForObjectItem(":xTuple ERP: Item_QMenu", "List...");
        activateItem(":xTuple ERP: Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_6");
        doubleClickItem(":_list_XTreeWidget_6", "TBOX1", 27, 7, 0, Qt.LeftButton);
        waitForObject(":_itemGroup.XLineEdit_XLineEdit");
        findObject(":_itemGroup.XLineEdit_XLineEdit").clear();
        type(":_itemGroup.XLineEdit_XLineEdit","0.25");
        waitForObject(":Item.Save_QPushButton");
        clickButton(":Item.Save_QPushButton");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in changing the desited cost of TBOX1" + e);
    }
    if(appEdition == "Postbooks")
    {
        try{    
            waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
            waitForObjectItem(":_QMenu", "List...");
            activateItem(":_QMenu", "List...");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            waitForObject(":_list_XTreeWidget_2");
            
            openItemContextMenu(":_list_XTreeWidget_2", "WTRUCK1" , 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
            waitForObject(":Vendor.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Vendor.qt_tabwidget_tabbar_QTabBar", "Location");
            if(!findObject(":Control.Multiple Location Control_QCheckBox").checked)
                clickButton(":Control.Multiple Location Control_QCheckBox");      
            
            waitForObject(":Voucher.Save_QPushButton_3");
            clickButton(":Voucher.Save_QPushButton_3");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            test.log("MLC check box is checked sucessfully");
        }
        catch(e)
        {
            test.fail("Error in enabling MLC checkbox"+e);
        }
        
    }
    //----- Creating MLC item ------
    //-----Creating a Purchase Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
        waitForObjectItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        snooze(0.5)
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Open Purchase Orders.New_QToolButton");
        clickButton(":Open Purchase Orders.New_QToolButton");
        
        
        waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
        type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        snooze(0.5);
        nativeType("<Tab>");
        
        ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
        type(":groupBox_2.ItemLineEdit_ItemLineEdit", "TBOX1");
        snooze(0.5);
        nativeType("<Tab>");
        
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "100");
        
        polineitem = findObject(":groupBox_2.ItemLineEdit_ItemLineEdit").text; 
        
        
        poquantity = findObject(":_ordered_XLineEdit").text;       
        nativeType("<Tab>");
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton_2");
        clickButton(":Purchase Order.Save_QPushButton_2");
        waitForObject(":Purchase Order.Cancel_QPushButton");
        clickButton(":Purchase Order.Cancel_QPushButton");
        waitForObject(":_list_XTreeWidget_2");
        if(object.exists("{column='0' container=':_list_XTreeWidget_2' text= '"+ponumber+"' type='QModelIndex'}"))
            
            test.pass("Purchase order created successfully");
        else 
            test.fail("Purchase order couldn't be created");
        
        
    }
    catch(e)
    {
        test.fail("Error in creating purchase order" + e);
    }
    
    
    
    //----- Creating a Purchase Order for Serial Controlled Item Type-----
    try
    {
        waitForObject(":Open Purchase Orders.New_QToolButton");
        clickButton(":Open Purchase Orders.New_QToolButton");
        waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
        type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        snooze(0.5);
        nativeType("<Tab>");
        
        var serialpo = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
        type(":groupBox_2.ItemLineEdit_ItemLineEdit", "STRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "3");
        waitForObject(":_priceGroup.XLineEdit_XLineEdit");
        type(":_priceGroup.XLineEdit_XLineEdit", "0.50");
        findObject(":_schedGroup.XDateEdit_XDateEdit").clear();
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        
        var seriallineitem = findObject(":groupBox_2.ItemLineEdit_ItemLineEdit").text;         
        var serialqty = findObject(":_ordered_XLineEdit").text;       
        
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton_2");
        clickButton(":Purchase Order.Save_QPushButton_2");
        waitForObject(":Purchase Order.Cancel_QPushButton");
        clickButton(":Purchase Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_2");
        if(object.exists("{column='0' container=':_list_XTreeWidget_2' text= '"+serialpo+"' type='QModelIndex'}"))
            
            test.pass("Purchase order created successfully for a serial controlled item");
        else test.fail("Purchase order couldn't be created for a serial controlled item");
    }
    catch(e)
    {
        test.fail("Error in creating purchase order for serial controlled item" + e);
    }
    
    //----- Creating a Purchase Order for MLC Controlled Item Type-----
    try
    {
        waitForObject(":Open Purchase Orders.New_QToolButton");
        clickButton(":Open Purchase Orders.New_QToolButton");
        waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
        type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        snooze(0.5);
        nativeType("<Tab>");
        
        var mlcpo = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
        type(":groupBox_2.ItemLineEdit_ItemLineEdit", "WTRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "50");
        waitForObject(":_priceGroup.XLineEdit_XLineEdit");
        type(":_priceGroup.XLineEdit_XLineEdit", "0.50");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        
        var mlclineitem = findObject(":groupBox_2.ItemLineEdit_ItemLineEdit").text;         
        var mlcqty = findObject(":_ordered_XLineEdit").text;   
        
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton_2");
        clickButton(":Purchase Order.Save_QPushButton_2");
        waitForObject(":Purchase Order.Cancel_QPushButton");
        clickButton(":Purchase Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_2");
        if(object.exists("{column='0' container=':_list_XTreeWidget_2' text= '"+mlcpo+"' type='QModelIndex'}"))
            
            test.pass("Purchase order created successfully for a MLC item");
        else test.fail("Purchase order couldn't be created for a MLC item");
        waitForObject(":Open Purchase Orders.Close_QToolButton");
        clickButton(":Open Purchase Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating purchase order for MLC controlled item" + e);
    }
    
    
    if(appEdition !="PostBooks")
    {
      
        //----- UOM ratio setting-------
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Products");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Products");
        waitForObjectItem(":xTuple ERP: *.Products_QMenu", "Item");
        activateItem(":xTuple ERP: *.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP: Item_QMenu", "List...");
        activateItem(":xTuple ERP: Item_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "YPAINT1", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":Vendor.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Vendor.qt_tabwidget_tabbar_QTabBar", "Sources");
        waitForObject(":_itemsrc.TPARTS_QModelIndex");
        doubleClick(":_itemsrc.TPARTS_QModelIndex", 14, 5, 0, Qt.LeftButton);
        waitForObject(":_venditemGroup._invVendorUOMRatio_XLineEdit").clear();
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        waitForObject(":Voucher.Save_QPushButton_2");
        clickButton(":Voucher.Save_QPushButton_2");
        waitForObject(":Voucher.Save_QPushButton_3");
        clickButton(":Voucher.Save_QPushButton_3");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
        
        //----- Creating a Purchase Order for Lot Controlled Item Type-----
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
            activateItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
            waitForObjectItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
            activateItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
            waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
            waitForObject(":Open Purchase Orders.New_QToolButton");
            clickButton(":Open Purchase Orders.New_QToolButton");
            
            waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
            type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
            snooze(0.5);
            nativeType("<Tab>");
            
            var lotpo = findObject(":_headerPage._orderNumber_XLineEdit").text;
            
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton");
            clickButton(":_lineItemsPage.New_QPushButton");
            
            waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
            type(":groupBox_2.ItemLineEdit_ItemLineEdit", "YPAINT1");
            snooze(0.5);
            nativeType("<Tab>");
            
            waitForObject(":_ordered_XLineEdit");
            type(":_ordered_XLineEdit", "10");     
            nativeType("<Tab>");
            
            var lotlineitem = findObject(":groupBox_2.ItemLineEdit_ItemLineEdit").text;         
            var lotqty = findObject(":_ordered_XLineEdit").text;       
            
            waitForObject(":Purchase Order.Save_QPushButton");
            clickButton(":Purchase Order.Save_QPushButton");
            waitForObject(":Purchase Order.Save_QPushButton_2");
            clickButton(":Purchase Order.Save_QPushButton_2");
            waitForObject(":Purchase Order.Cancel_QPushButton");
            clickButton(":Purchase Order.Cancel_QPushButton");
            waitForObject(":_list_XTreeWidget_2");
            if(object.exists("{column='0' container=':_list_XTreeWidget_2' text= '"+lotpo+"' type='QModelIndex'}"))
                
                test.pass("Purchase order created successfully for a lot controlled item");
            else test.fail("Purchase order couldn't be created for a lot controlled item");
            waitForObject(":Open Purchase Orders.Close_QToolButton");
            clickButton(":Open Purchase Orders.Close_QToolButton");
        }
        catch(e)
        {
            test.fail("Error in creating purchase order for lot controlled item" + e);
        }
    }
    
    
    //-----Posting Purchase Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
        waitForObjectItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        snooze(.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_2");
        openItemContextMenu(":_list_XTreeWidget_2",ponumber, 5, 5, Qt.LeftButton);
        snooze(1);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
        
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_2");
        openItemContextMenu(":_list_XTreeWidget_2",serialpo, 5, 5, Qt.LeftButton);
        snooze(1);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_2");
        openItemContextMenu(":_list_XTreeWidget_2",mlcpo, 5, 5, Qt.LeftButton);
        snooze(1);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
        snooze(0.5);
        
        
        if(appEdition != "PostBooks")
        {
            snooze(0.5);
            waitForObject(":_list_XTreeWidget_2");
            openItemContextMenu(":_list_XTreeWidget_2",lotpo, 5, 5, Qt.LeftButton);
            snooze(1);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
            
            
        }
        waitForObject(":Open Purchase Orders.Close_QToolButton");
        clickButton(":Open Purchase Orders.Close_QToolButton");
        test.log("Purchase Orders Posted successfully");
    }
    catch(e)
    {
        test.fail("Error in posting purchase orders" + e);
    }
    
    //-----Verification of QOH by for Item (Receiving Purchase Goods)-----
    
    try{
        var qty = queryQoh(polineitem, "WH1", appEdition);
        
        var struckqty = queryQoh(seriallineitem, "WH1", appEdition);
        var wtruckqty = queryQoh(mlclineitem, "WH1", appEdition);          
        
        if(appEdition != "PostBooks")
        {
            var ypaintqty = queryQoh(lotlineitem, "WH1", appEdition);
        }
        test.log("QOH of verified successfully");
    }
    catch(e)
    {
        test.fail("Error in verifying QOH" +e);
    }
    
    
    //-----Receiving Purchase Goods-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");        
        waitForObject(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit");
        type(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit",ponumber);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":Enter Order Receipts.Post_QPushButton");
        clickButton(":Enter Order Receipts.Post_QPushButton");
        waitForObject(":Enter Order Receipts.Close_QPushButton");
        clickButton(":Enter Order Receipts.Close_QPushButton");
        test.log("Purchase Order for TBOX1  received successfully")
                
                
                waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");        
        waitForObject(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit");
        type(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit",serialpo);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":Enter Order Receipts.Post_QPushButton");
        clickButton(":Enter Order Receipts.Post_QPushButton");
        if(appEdition != "PostBooks")
        {
            for(var i=1; i<= 3; i++)
            { 
                waitForObject(":Enter Order Receipts._lotSerial_XComboBox");
                type(":Enter Order Receipts._lotSerial_XComboBox", i+9);
                
                waitForObject(":Enter Order Receipts.OK_QPushButton_2");
                clickButton(":Enter Order Receipts.OK_QPushButton_2");
                
                
            }
            
            waitForObject(":Enter Order Receipts.OK_QPushButton");
            clickButton(":Enter Order Receipts.OK_QPushButton");
            
            for(i=1; i<=3; i++)
            { 
                waitForObject(":_itemloc.No_QModelIndex");
                doubleClick(":_itemloc.No_QModelIndex", 11, 5, 0, Qt.LeftButton);
                waitForObject(":Enter Order Receipts.Distribute_QPushButton");
                clickButton(":Enter Order Receipts.Distribute_QPushButton");
                waitForObject(":Enter Order Receipts.Post_QPushButton_2");
                clickButton(":Enter Order Receipts.Post_QPushButton_2");
                
            }
        }
        else{
            waitForObject(":_itemloc.No_QModelIndex_3");
            mouseClick(":_itemloc.No_QModelIndex_3", 10, 8, 0, Qt.LeftButton);
            waitForObject(":Enter Order Receipts.Distribute_QPushButton");
            clickButton(":Enter Order Receipts.Distribute_QPushButton");
            waitForObject(":Distribute to Location._locationQty_XLineEdit").clear();
            type(":Distribute to Location._locationQty_XLineEdit", serialqty);
            waitForObject(":Enter Order Receipts.Distribute_QPushButton");
            clickButton(":Enter Order Receipts.Distribute_QPushButton");
            waitForObject(":Enter Order Receipts.Post_QPushButton_2");
            clickButton(":Enter Order Receipts.Post_QPushButton_2");
        }
        waitForObject(":Enter Order Receipts.Close_QPushButton");
        clickButton(":Enter Order Receipts.Close_QPushButton");
        test.log("Purchase Order for STRUCK1  received successfully ");
        
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");        
        waitForObject(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit");
        type(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit",mlcpo);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":Enter Order Receipts.Post_QPushButton");
        clickButton(":Enter Order Receipts.Post_QPushButton");
        waitForObject(":_itemloc.No_QModelIndex_3");
        doubleClick(":_itemloc.No_QModelIndex_3", 8, 7, 0, Qt.LeftButton);
        waitForObject(":Enter Order Receipts.Distribute_QPushButton");
        clickButton(":Enter Order Receipts.Distribute_QPushButton");
        waitForObject(":Enter Order Receipts.Post_QPushButton_2");
        clickButton(":Enter Order Receipts.Post_QPushButton_2");
        waitForObject(":Enter Order Receipts.Close_QPushButton");
        clickButton(":Enter Order Receipts.Close_QPushButton");
        test.log("Purchase Order for WTRUCK1  received successfully");
        
        
        if(appEdition != "PostBooks")
        {
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
            waitForObjectItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");
            activateItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");        
            waitForObject(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit");
            type(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit",lotpo);
            snooze(0.5);
            nativeType("<Tab>");
            waitForObject(":_frame.Receive All_QPushButton");
            clickButton(":_frame.Receive All_QPushButton"); 
            waitForObject(":Enter Order Receipts.Post_QPushButton");
            clickButton(":Enter Order Receipts.Post_QPushButton");
            
            waitForObject(":Enter Order Receipts._lotSerial_XComboBox");
            type(":Enter Order Receipts._lotSerial_XComboBox", "9");
            
            waitForObject(":Enter Order Receipts._qtyToAssign_XLineEdit");
            type(":Enter Order Receipts._qtyToAssign_XLineEdit", "10");
            
            waitForObject(":Enter Order Receipts.XDateEdit_XDateEdit");
            findObject(":Enter Order Receipts.XDateEdit_XDateEdit").clear();
            type(":Enter Order Receipts.XDateEdit_XDateEdit", "+7");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Enter Order Receipts.OK_QPushButton_2");
            clickButton(":Enter Order Receipts.OK_QPushButton_2");
            
            waitForObject(":Enter Order Receipts.OK_QPushButton");
            clickButton(":Enter Order Receipts.OK_QPushButton");
            waitForObject(":Enter Order Receipts.Close_QPushButton");
            clickButton(":Enter Order Receipts.Close_QPushButton");
            test.log("Purchase Order for YPAINT1  received successfully");
        }
    }
    catch(e)
    {
        test.fail("Error in receiving purchase order line items" + e);
    }
    
    
    
    
    
    
    //-----Verification of updated QOH by Item (Receiving Purchase Goods)-----
    try{
        var result = queryQoh(polineitem,"WH1", appEdition);
        if((qty+parseInt(poquantity)==result))
            test.pass("Quantity of TBOX1 updated correctly");
        else
            test.fail("Quantity of TBOX1 is not updated correctly");
        snooze(0.5);
        
        
        result = queryQoh(seriallineitem,"WH1", appEdition);
        if((struckqty+parseInt(serialqty)==result))
            test.pass("Quantity of STRUCK1 updated correctly");
        else
            test.fail("Quantity of STRUCK1 is not updated correctly");
        snooze(0.5);
        result = queryQoh(mlclineitem,"WH1", appEdition);
        if((wtruckqty+parseInt(mlcqty)==result))
            test.pass("Quantity of WTRUCK1 updated correctly");
        else
            test.fail("Quantity of WTRUCK1 is not updated correctly");
        snooze(0.5);
        
        
        if(appEdition != "PostBooks")
        {
            result = queryQoh(lotlineitem,"WH1", appEdition);
            if((ypaintqty+parseInt(lotqty)==result))
                test.pass("Quantity of YPAINT1 updated correctly");
            else
                test.fail("Quantity of YPAINT1 is not updated correctly");
            snooze(0.5); 
        }
        
    }
    catch(e)
    {
        test.fail("Error in verifying QOH by item" + e);
    }
    
    var ponumber1 = ponumber+"-1";
    var serialpo1 = serialpo+"-1";
    var mlcpo1 = mlcpo+"-1";
    //-----Verification of G/L transaction (Receiving PO for regular control item )-----
    
    var bool = glTransactions(/Receive/, ponumber1);
    if(bool == 1)
    {
        test.pass("PO " + ponumber + " has a GL entry for its Material Receipt transaction");
    }
    else
        test.fail("No GL entry is made for the  Receiving Purchase Order " + ponumber);
    
    var bool = glTransactions(/Receive /, serialpo1);
    if(bool == 1)
    {
        test.pass("PO " + serialpo + " has a GL entry for its Material Receipt transaction");
    }
    else
        test.fail("No GL entry is made for the  Receiving Purchase Order " + serialpo);
    
    
    
    
    
    //-----Entering a Voucher-----
    try
    {
        //--------------------Voucher for regular item----------  
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP: *.Voucher_QMenu", "New...");
        activateItem(":xTuple ERP: *.Voucher_QMenu", "New...");
        
        waitForObject(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit",ponumber);
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        
        vounumber = findObject(":_voucherNumber_XLineEdit").text; 
        
        waitForObject(":_poitems._poitem_XTreeWidget");
        doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 1, Qt.LeftButton);      
        waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget");
        doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_distTab.New_QPushButton");
        clickButton(":_distTab.New_QPushButton");
        
        waitForObject(":[*]Voucher.XLineEdit_XLineEdit");
        type(":[*]Voucher.XLineEdit_XLineEdit", "25");
        waitForObject(":Voucher.Save_QPushButton");
        clickButton(":Voucher.Save_QPushButton");
        waitForObject(":Voucher.Save_QPushButton_2");
        clickButton(":Voucher.Save_QPushButton_2");  
        waitForObject(":_amount.XLineEdit_XLineEdit");
        type(":_amount.XLineEdit_XLineEdit",findObject(":_amount.XLineEdit_XLineEdit_2").text );
        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3", "+0");
        waitForObject(":_invoiceNum_XLineEdit");
        type(":_invoiceNum_XLineEdit", "VO for" + ponumber);
        waitForObject(":Voucher.Save_QPushButton_3");
        clickButton(":Voucher.Save_QPushButton_3");
        
        waitForObject(":Voucher.Cancel_QPushButton");
        clickButton(":Voucher.Cancel_QPushButton");
        
        
        
        //-------------Voucher for serial controlled item--------- 
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP: *.Voucher_QMenu", "New...");
        activateItem(":xTuple ERP: *.Voucher_QMenu", "New...");
        
        waitForObject(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit",serialpo);
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");     
        var serialvo = findObject(":_voucherNumber_XLineEdit").text; 
        
        waitForObject(":_poitems._poitem_XTreeWidget");
        doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 1, Qt.LeftButton);      
        waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget");
        doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_distTab.New_QPushButton");
        clickButton(":_distTab.New_QPushButton");
        waitForObject(":[*]Voucher.XLineEdit_XLineEdit");
        type(":[*]Voucher.XLineEdit_XLineEdit", "10");
        waitForObject(":Voucher.Save_QPushButton");
        clickButton(":Voucher.Save_QPushButton");
        waitForObject(":Voucher.Save_QPushButton_2");
        clickButton(":Voucher.Save_QPushButton_2");  
        waitForObject(":_amount.XLineEdit_XLineEdit");
        type(":_amount.XLineEdit_XLineEdit",findObject(":_amount.XLineEdit_XLineEdit_2").text );
        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3", "+0");
        waitForObject(":_invoiceNum_XLineEdit");
        type(":_invoiceNum_XLineEdit", "VO for" + serialpo);
        waitForObject(":Voucher.Save_QPushButton_3");
        clickButton(":Voucher.Save_QPushButton_3");
        waitForObject(":Voucher.Cancel_QPushButton");
        clickButton(":Voucher.Cancel_QPushButton");
        
        //-------------Voucher for mlc controlled item------
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP: *.Voucher_QMenu", "New...");
        activateItem(":xTuple ERP: *.Voucher_QMenu", "New...");
        
        waitForObject(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit",mlcpo);
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");     
        var mlcvo = findObject(":_voucherNumber_XLineEdit").text; 
        
        waitForObject(":_poitems._poitem_XTreeWidget");
        doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 1, Qt.LeftButton);      
        waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget");
        doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_distTab.New_QPushButton");
        clickButton(":_distTab.New_QPushButton"); 
        
        waitForObject(":[*]Voucher.XLineEdit_XLineEdit");
        findObject(":[*]Voucher.XLineEdit_XLineEdit").clear();
        type(":[*]Voucher.XLineEdit_XLineEdit", "25");
        waitForObject(":Voucher.Save_QPushButton");
        clickButton(":Voucher.Save_QPushButton");
        waitForObject(":Voucher.Save_QPushButton_2");
        clickButton(":Voucher.Save_QPushButton_2");  
        waitForObject(":_amount.XLineEdit_XLineEdit");
        type(":_amount.XLineEdit_XLineEdit",findObject(":_amount.XLineEdit_XLineEdit_2").text );
        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3", "+0");
        waitForObject(":_invoiceNum_XLineEdit");
        type(":_invoiceNum_XLineEdit", "VO for" + mlcpo);
        waitForObject(":Voucher.Save_QPushButton_3");
        clickButton(":Voucher.Save_QPushButton_3"); 
        
        waitForObject(":Voucher.Cancel_QPushButton");
        clickButton(":Voucher.Cancel_QPushButton");
        if(appEdition != "PostBooks")
        {
            //------------Voucher for lot controlled item-----------
            waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
            waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
            activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
            waitForObjectItem(":xTuple ERP: *.Voucher_QMenu", "New...");
            activateItem(":xTuple ERP: *.Voucher_QMenu", "New...");
            
            waitForObject(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit");
            type(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit",lotpo);
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            
            var lotvo = findObject(":_voucherNumber_XLineEdit").text;
            
            waitForObject(":_poitems._poitem_XTreeWidget");
            doubleClickItem(":_poitems._poitem_XTreeWidget", "GL", 5, 5, 1, Qt.LeftButton);      
            waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget");
            doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
            waitForObject(":_distTab.New_QPushButton");
            clickButton(":_distTab.New_QPushButton");
            waitForObject(":[*]Voucher.XLineEdit_XLineEdit");
            type(":[*]Voucher.XLineEdit_XLineEdit", "1");
            waitForObject(":Voucher.Save_QPushButton");
            clickButton(":Voucher.Save_QPushButton");
            waitForObject(":Voucher.Save_QPushButton_2");
            clickButton(":Voucher.Save_QPushButton_2");  
            waitForObject(":_amount.XLineEdit_XLineEdit");
            type(":_amount.XLineEdit_XLineEdit",findObject(":_amount.XLineEdit_XLineEdit_2").text );
            
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
            type(":_dateGroup.XDateEdit_XDateEdit_3", "+0");
            waitForObject(":_invoiceNum_XLineEdit");
            type(":_invoiceNum_XLineEdit", "VO for" + lotpo);
            waitForObject(":Voucher.Save_QPushButton_3");
            clickButton(":Voucher.Save_QPushButton_3");
            waitForObject(":Voucher.Cancel_QPushButton");
            clickButton(":Voucher.Cancel_QPushButton");
        }
    }
    catch(e)
    {
        test.fail("Error in creating vouchers for purchase orders" + e);
    }
    
    //-----Posting Vouchers-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP: *.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP: *.Voucher_QMenu", "List Unposted...");
        
        waitForObject(":List Unposted Vouchers._vohead_XTreeWidget");
        if(object.exists("{column='0' container=':List Unposted Vouchers._vohead_XTreeWidget' text='"+vounumber+"' type='QModelIndex'}"))
            
            test.pass(" Voucher created for Regular item type");
        else test.fail(" Voucher not created Regular item type");
        
        clickItem(":List Unposted Vouchers._vohead_XTreeWidget", vounumber, 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Unposted Vouchers.Post_QPushButton");
        clickButton(":List Unposted Vouchers.Post_QPushButton");
        waitForObject(":List Unposted Vouchers.Continue_QPushButton");
        clickButton(":List Unposted Vouchers.Continue_QPushButton");
      
        waitForObject(":List Unposted Vouchers._vohead_XTreeWidget");
        if(object.exists("{column='0' container=':List Unposted Vouchers._vohead_XTreeWidget' text='"+serialvo+"' type='QModelIndex'}"))
            
            test.pass(" Voucher created for Serial controlled item type");
        else test.fail(" Voucher not created Serial controlled item type");
        
        clickItem(":List Unposted Vouchers._vohead_XTreeWidget", serialvo, 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Unposted Vouchers.Post_QPushButton");
        clickButton(":List Unposted Vouchers.Post_QPushButton");
        waitForObject(":List Unposted Vouchers.Continue_QPushButton");
        clickButton(":List Unposted Vouchers.Continue_QPushButton");
        
        waitForObject(":List Unposted Vouchers._vohead_XTreeWidget");
        if(object.exists("{column='0' container=':List Unposted Vouchers._vohead_XTreeWidget' text='"+mlcvo+"' type='QModelIndex'}"))
            
            test.pass(" Voucher created for MLC item type");
        else test.fail(" Voucher not created MLC item type");
        
        clickItem(":List Unposted Vouchers._vohead_XTreeWidget", mlcvo, 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Unposted Vouchers.Post_QPushButton");
        clickButton(":List Unposted Vouchers.Post_QPushButton");
        waitForObject(":List Unposted Vouchers.Continue_QPushButton");
        clickButton(":List Unposted Vouchers.Continue_QPushButton");
        if(appEdition != "PostBooks")
        {
            waitForObject(":List Unposted Vouchers._vohead_XTreeWidget");
            if(object.exists("{column='0' container=':List Unposted Vouchers._vohead_XTreeWidget' text='"+lotvo+"' type='QModelIndex'}"))
                
                test.pass(" Voucher created for Lot controlled item type");
            else test.fail(" Voucher not created Lot controlled item type");
            
            clickItem(":List Unposted Vouchers._vohead_XTreeWidget", lotvo, 5, 5, 1, Qt.LeftButton);
            waitForObject(":List Unposted Vouchers.Post_QPushButton");
            clickButton(":List Unposted Vouchers.Post_QPushButton");
            waitForObject(":List Unposted Vouchers.Continue_QPushButton");
            clickButton(":List Unposted Vouchers.Continue_QPushButton");
        }
        
        waitForObject(":List Unposted Vouchers.Close_QPushButton");
        clickButton(":List Unposted Vouchers.Close_QPushButton");
        test.log("Posted Voucher successfully");
    }
    catch(e)
    {
        test.fail("Error in posting vouchers" + e);
    }
    
    //---Selecting Voucher for Payment---
    try
    {
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
        snooze(0.5);
        waitForObject(":_bankaccnt_XComboBox");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Voucher.Save_QPushButton_3");
        clickButton(":Voucher.Save_QPushButton_3");
        
        waitForObject(":Select Payments._select_XComboBox");
        clickItem(":Select Payments._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Select Payments._selectDate_XComboBox");
        clickItem(":Select Payments._selectDate_XComboBox", "All", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", serialvo, 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Select..._QPushButton");
        clickButton(":frame.Select..._QPushButton");
        snooze(0.5);
        waitForObject(":_bankaccnt_XComboBox");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Voucher.Save_QPushButton_3");
        clickButton(":Voucher.Save_QPushButton_3");
        
        waitForObject(":Select Payments._select_XComboBox");
        clickItem(":Select Payments._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Select Payments._selectDate_XComboBox");
        clickItem(":Select Payments._selectDate_XComboBox", "All", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", mlcvo, 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Select..._QPushButton");
        clickButton(":frame.Select..._QPushButton");
        snooze(0.5);
        waitForObject(":_bankaccnt_XComboBox");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Voucher.Save_QPushButton_3");
        clickButton(":Voucher.Save_QPushButton_3");
        if(appEdition !="PostBooks")
        { waitForObject(":Select Payments._select_XComboBox");
            clickItem(":Select Payments._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
            waitForObject(":Select Payments._selectDate_XComboBox");
            clickItem(":Select Payments._selectDate_XComboBox", "All", 5, 5, 1, Qt.LeftButton);
            waitForObject(":frame._apopen_XTreeWidget");
            clickItem(":frame._apopen_XTreeWidget", lotvo, 5, 5, 1, Qt.LeftButton);
            waitForObject(":frame.Select..._QPushButton");
            clickButton(":frame.Select..._QPushButton");
            snooze(0.5);
            waitForObject(":_bankaccnt_XComboBox");
            clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":Voucher.Save_QPushButton_3");
            clickButton(":Voucher.Save_QPushButton_3");
        }
        waitForObject(":Select Payments.Close_QPushButton");
        clickButton(":Select Payments.Close_QPushButton");
        test.log("Selected Voucher for Payment");
    }
    catch(e)
    {
        test.fail("Error in selecting voucher for payment" + e);
    }
      //-----Extracting OS Name-----
    var linuxPath, winPath;
    
    try
    {	
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
        activateItem(":xTuple ERP: *_QMenuBar_3", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu_2", "Setup...");
       waitForObjectItem(":Setup._tree_XTreeWidget", "Configure.Encryption");
    clickItem(":Setup._tree_XTreeWidget", "Configure.Encryption", 20, 5, 0, Qt.LeftButton);
        
        snooze(1);
        if(object.exists(":View Check Run.OK_QPushButton"))
        {
            clickButton(":View Check Run.OK_QPushButton");
            
            snooze(1);
            waitForObject(":_ccEncKeyName_QLineEdit").clear();
            type(":_ccEncKeyName_QLineEdit", "xTuple.key");
            waitForObject(":Encryption Configuration_FileLineEdit").clear();
            type(":Encryption Configuration_FileLineEdit", "c:/crypto");
            waitForObject(":Encryption Configuration_FileLineEdit_2").clear();
            type(":Encryption Configuration_FileLineEdit_2", "/home/administrator/crypto");
            waitForObject(":Encryption Configuration_FileLineEdit_3").clear();
            type(":Encryption Configuration_FileLineEdit_3", "/users/crypto")
                }
        
        waitForObject(":Encryption Configuration_FileLineEdit_2");
        linuxPath = findObject(":Encryption Configuration_FileLineEdit_2").text;
        
        waitForObject(":Encryption Configuration_FileLineEdit_3");
        winPath = findObject(":Encryption Configuration_FileLineEdit_3").text;
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in extracting OS name" + e);
    }
    
    //-----Prepare Check run-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP: *.Payments_QMenu", "Prepare Check Run...");
        activateItem(":xTuple ERP: *.Payments_QMenu", "Prepare Check Run...");
        snooze(0.5);
        waitForObject(":Prepare Check Run._bankaccnt_XComboBox");
        clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Prepare Check Run.Prepare_QPushButton");
        clickButton(":Prepare Check Run.Prepare_QPushButton");
        test.log("Check run prepared successfully");
    }
    catch(e)
    {
        test.fail("Error in preparing check run" + e);
    }
    snooze(2);
    
  
 
 //-----View Check run-----
    try
    {
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
        
        snooze(2);
        if(OS.name == "Linux")
        {
            snooze(1);
            clickButton(waitForObject(":Print Checks.Print_QPushButton"));
            clickButton(waitForObject(":Voucher.Yes_QPushButton")); 	
            findObject(":filename_QLineEdit").clear();
            type(waitForObject(":filename_QLineEdit"), "2");
            clickButton(waitForObject(":Print.Print_QPushButton"));
            clickButton(waitForObject(":Voucher.Yes_QPushButton"));
            clickButton(waitForObject(":Voucher.Cancel_QPushButton"));
            snooze(1);
        }
        else  
        {
            snooze(0.1);
            clickButton(waitForObject(":View Check Run.Create EFT File_QPushButton"));
            waitForObject(":fileNameEdit_QLineEdit_2");
            findObject(":fileNameEdit_QLineEdit_2").text = winPath.toString()+"/achFile.ach";
            waitForObject(":View Check Run.Save_QPushButton");
            clickButton(":View Check Run.Save_QPushButton");
            snooze(1);
            if(object.exists(":View Check Run.Yes_QPushButton_2"))    
                clickButton(":View Check Run.Yes_QPushButton_2");
            waitForObject(":View Check Run.Yes_QPushButton");
            clickButton(":View Check Run.Yes_QPushButton");
            waitForObject(":View Check Run.Yes_QPushButton_2");
            clickButton(":View Check Run.Yes_QPushButton_2");
            waitForObject(":View Check Run.Cancel_QPushButton");
            clickButton(":View Check Run.Cancel_QPushButton");
            
        }
    }
    catch(e)
    {
        test.fail("Error in viewing check run" + e);
    }
    
    //-----Post Check run-----
    try
    {
        snooze(3);
        waitForObject(":_frame._check_XTreeWidget");
        clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_frame.Post_QPushButton");
        sendEvent("QMouseEvent", ":_frame.Post_QPushButton", QEvent.MouseButtonPress, 51, 9, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "Selected Check...");
        activateItem(":_QMenu", "Selected Check...");
        waitForObject(":View Check Run.Post_QPushButton");
        clickButton(":View Check Run.Post_QPushButton");
        waitForObject(":View Check Run.Close_QPushButton");
        clickButton(":View Check Run.Close_QPushButton");
        test.log("Posted Checks for Voucher");
    }
    catch(e)
    {
        test.fail("Error in posting check run" + e);
    }
    
    //--------verify GL ------
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Transactions...");
        activateItem(":xTuple ERP: *_.Reports_QMenu", "Transactions...");
        snooze(1);
        if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
        {
            waitForObject(":General Ledger Transactions.More_QToolButton");
            clickButton(":General Ledger Transactions.More_QToolButton");
        }
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit","0");  
        waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(":_filterGroup.XDateEdit_XDateEdit_2","0");
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton"); 
        snooze(0.5);
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Source", 80, 9, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_filterGroup.widget3_XComboBox");
        clickItem(":_filterGroup.widget3_XComboBox","A/P", 111, 12, 0, Qt.LeftButton);     
        waitForObject(":General Ledger Transactions.Query_QToolButton");
        clickButton(":General Ledger Transactions.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
      
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        obj_TreeWidget = cast(obj_TreeWidget, QTreeWidget);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        type(sWidgetTreeControl,"<Space>");
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
        if(sNameOfRootItem == "CK")
            test.pass("Posting of Checks has a GL entry");
        else test.fail("Posting of Checks has no GL entry");
        
        waitForObject(":General Ledger Transactions.Close_QToolButton");
        clickButton(":General Ledger Transactions.Close_QToolButton");  
        
    }
    catch(e)
    {
        test.fail("Error in verifying G/L entry for posted check" + e);
    }
    
}
