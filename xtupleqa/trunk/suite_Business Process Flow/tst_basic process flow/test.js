    function main()
    {
        
        
        //-----includes-----
        source(findFile("scripts","functions.js"));
        
        //-----login Application-----
        loginAppl("CONFIGURE"); 
        
        
    
        //--------Edit the User Preferences----
        try
        {
            if(OS.name=="Darwin")
            {
                
                waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
                activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
                waitForObjectItem("{ title='Products' type='QMenu' visible='1' window=':xTuple ERP:*_GUIClient_2'}","Preferences...");
                
                activateItem("{ title='Products' type='QMenu' visible='1' window=':xTuple ERP:*_GUIClient_2'}","Preferences...");
            } 
            else
            {
                waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
                activateItem(":xTuple ERP:*_QMenuBar_2", "System");
                
                waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
                activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
            }
            
            snooze(2);
            waitForObject(":Interface Options.Show windows inside workspace_QRadioButton");
            snooze(1);
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
                snooze(0.3);
                if(object.exists(":Notice.Notice_QDialog"))
                {
                    waitForObject(":Notice.Remind me about this again._QCheckBox");
                    if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                        clickButton(":Notice.Remind me about this again._QCheckBox");
                    snooze(0.1);
                    waitForObject(":Notice.OK_QPushButton");
                    clickButton(":Notice.OK_QPushButton");            
                }
            }
            waitForObject(":User Preferences.Save_QPushButton");
            clickButton(":User Preferences.Save_QPushButton");
            
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
        
        snooze(4);
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
          waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
          activateItem(":xTuple ERP:*.System_QMenu", "Setup...");     
          snooze(1);
          if(findObject(":Setup._tree_XTreeWidget").itemsExpandable== true)
          {
              waitForObject(":Configure.Database_QModelIndex");
              mouseClick(":Configure.Database_QModelIndex", 41, 6, 0, Qt.LeftButton);
          }
          else
          {    
              waitForObject(":_tree.Configure_QModelIndex");
              mouseClick(":_tree.Configure_QModelIndex", -10, 5, 0, Qt.LeftButton);
              waitForObject(":Configure.Database_QModelIndex");
              mouseClick(":Configure.Database_QModelIndex", 41, 6, 0, Qt.LeftButton);
          }
          
          waitForObject(":Database Information.*_QLabel");
          var appEdition = findObject(":Database Information.*_QLabel").text;
          
          if(object.exists(":_stack.Use toolbars on displays when available_QCheckBox"))
          {
              waitForObject(":_stack.Use toolbars on displays when available_QCheckBox");
              snooze(1);
              if(!(findObject(":_stack.Use toolbars on displays when available_QCheckBox").checked))
                  clickButton(":_stack.Use toolbars on displays when available_QCheckBox");
          }
          
          waitForObject(":Setup.Save_QPushButton");
          clickButton(":Setup.Save_QPushButton");
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
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
            activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
            waitForObject(":Configure.Encryption_QModelIndex");
            mouseClick(":Configure.Encryption_QModelIndex", 40, 8, 0, Qt.LeftButton);
            
            snooze(1);
            if(object.exists(":OK_QPushButton"))
            {	
                clickButton(":OK_QPushButton");
                test.fatal("Please Define the Encryption path"); 
            }
            waitForObject(":Setup.Save_QPushButton");
            clickButton(":Setup.Save_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in setting the encryption key" + e);
        } 
      
      //--------------- Set the window to Tab view mode -------------

        tabView();
        
        //-----Indented Bill of Materials-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Products"); 
            waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Products_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Bills of Materials");
            activateItem(":xTuple ERP:*.Reports_QMenu", "Bills of Materials");
            waitForObjectItem(":xTuple ERP:*.Bills of Materials_QMenu", "Indented...");
            activateItem(":xTuple ERP:*.Bills of Materials_QMenu", "Indented...");
            if(OS.name == "Linux")
            {
                type(waitForObject(":xTuple ERP:*.Bills of Materials_QMenu"), "<Left>");
                type(waitForObject(":xTuple ERP:*.Reports_QMenu_2"), "<Left>");
                type(waitForObject(":xTuple ERP:*.Products_QMenu"), "<Esc>");
            }
            waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
            type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            
            waitForObject(":Indented Bill of Materials.Query_QToolButton_3");
            clickButton(":Indented Bill of Materials.Query_QToolButton_3");
            
            waitForObject(":_list_XTreeWidget");
            
            if(object.exists("{column='1' container=':_list_XTreeWidget' text='TBODY1' type='QModelIndex'}"))
                test.pass("TBODY1 - Item available");
            else 
                test.fail("TBODY1 - Item not available");
            
            waitForObject(":_list_XTreeWidget");
            if(object.exists("{column='1' container=':_list_XTreeWidget' text='YPAINT1' type='QModelIndex'}"))
                test.pass("YPAINT1 - Item available");
            else 
                test.fail("YPAINT1 - Item not available");
            
            waitForObject(":_list_XTreeWidget");
            if(object.exists("{column='1' container=':_list_XTreeWidget' text='TWHEEL1' type='QModelIndex'}"))
                test.pass("TWHEEL1 - Item available");
            else 
                test.fail("TWHEEL1 - Item not available");
            
            waitForObject(":_list_XTreeWidget");
            if(object.exists("{column='1' container=':_list_XTreeWidget' text='TSUB1' type='QModelIndex'}"))
                test.pass("TSUB1 - Item available");
            else 
                test.fail("TSUB1 - Item not available");
            
            waitForObject(":Indented Bill of Materials.Close_QToolButton_2");
            clickButton(":Indented Bill of Materials.Close_QToolButton_2");
            
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
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
            activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
            waitForObject(":Setup._modules_QComboBox");
            clickItem(":Setup._modules_QComboBox","Sales", 78, 9, 0, Qt.LeftButton);
            waitForObject(":Configure.Sales_QModelIndex");
            mouseClick(":Configure.Sales_QModelIndex", 17, 7, 0, Qt.LeftButton); 
            
            sonumber = findObject(":Sales Configuration._nextSoNumber_XLineEdit").text;
            test.log(sonumber);
            waitForObject(":Setup.Save_QPushButton");
            clickButton(":Setup.Save_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in extracting sales order number" + e);
        }
        
        
        //-----Creating a Sales Order-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales"); 
            waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
            activateItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
            waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
            activateItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
            
            waitForObject(":Open Sales Orders.Query_QToolButton_2");
            clickButton(":Open Sales Orders.Query_QToolButton_2");
            waitForObject(":Open Sales Orders.New_QToolButton_2");
            clickButton(":Open Sales Orders.New_QToolButton_2");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            
            if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
                clickButton(":_headerPage.Print on Save_QCheckBox");   
            waitForObject(":_headerPage._custPONumber_XLineEdit");
            type(":_headerPage._custPONumber_XLineEdit", "008");
            waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
            clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
            nativeType("<Tab>");
            waitForObject(":_lineItemsPage.New_QPushButton");
            clickButton(":_lineItemsPage.New_QPushButton");
            
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
            snooze(0.5);
            nativeType("<Tab>");
            snooze(1);
            type(":_qtyOrdered_XLineEdit_2", "100");
            
            soquantity = findObject(":_qtyOrdered_XLineEdit_2").text;
            snooze(1);
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
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
            
            snooze(.5);
            waitForObject(":_list_XTreeWidget_11");
            if(object.exists("{column='0' container=':_list_XTreeWidget_11' text='"+sonumber+"' type='QModelIndex'}"))
                test.pass("Sales Order Created");
            else 
                test.fail("Sales Order Failed");
           
            waitForObject(":Open Sales Orders.Close_QToolButton_2");
            clickButton(":Open Sales Orders.Close_QToolButton_2");
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
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
            activateItem(":xTuple ERP:*.System_QMenu", "Setup...");  
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 41, 6, 0, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":Database Information.*_QLabel");
            var appEdition = findObject(":Database Information.*_QLabel").text;
            
            waitForObject(":Setup.Save_QPushButton");
            clickButton(":Setup.Save_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in identifying application edition" + e);        
        }
    
        
        if(appEdition == "PostBooks")
        {
            
            //------- Account Payable Configuration --------
            try{
             activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting"));
             activateItem(waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Setup..."));
             clickTab(waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3"), "Accounts Payable");
             snooze(0.5);
             if(!findObject(":tab.Enable EFT Check Printing_QGroupBox").checked)
             mouseClick(":tab.Enable EFT Check Printing_QGroupBox", 78, 9, 0, Qt.LeftButton);
             waitForObject(":_nextACHBatchNumber_XLineEdit").clear();
             type(":_nextACHBatchNumber_XLineEdit","100008");
             waitForObject(":_companyId_XLineEdit");
             type(":_companyId_XLineEdit","98764");
            
             clickButton(waitForObject(":View Check Run.Save_QPushButton"));
             test.log("EFT Check Printing enabled successfully");
         }
            catch(e)
            {
                test.fail("Error in Enabling EFT CheckPrinting");
            }
            //-----------------Bank Account Configuration---------------
            try
            {
                waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
                activateItem(":xTuple ERP:*_QMenuBar_2", "System");
                waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
                activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
                waitForObject(":Setup._modules_QComboBox");
                mouseClick(":Setup._modules_QComboBox", 77, 6, 0, Qt.LeftButton);
                waitForObject(":_modules.Accounting_QModelIndex");
                mouseClick(":_modules.Accounting_QModelIndex", 32, 4, 0, Qt.LeftButton);
                waitForObject(":Accounting Mappings.Bank Accounts_QModelIndex");
                mouseClick(":Accounting Mappings.Bank Accounts_QModelIndex", 38, 6, 0, Qt.LeftButton);
                waitForObject(":_stack._bankaccnt_XTreeWidget");
                doubleClickItem(":_stack._bankaccnt_XTreeWidget","EBANK", 5, 5, 0, Qt.LeftButton);    
                waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
                clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Transmission");   
                snooze(0.5);
                 waitForObject(":_transmitTab.Enable EFT Check Printing_QGroupBox");
                  if(!findObject(":_transmitTab.Enable EFT Check Printing_QGroupBox").checked)
                mouseClick(":_transmitTab.Enable EFT Check Printing_QGroupBox", 18, 7, 0, Qt.LeftButton);
                snooze(0.5);
                waitForObject(":_routing_XLineEdit");
                findObject(":_routing_XLineEdit").clear();
                type(":_routing_XLineEdit", "123456789");
                waitForObject(":Setup.Save_QPushButton");
                clickButton(":Setup.Save_QPushButton");
                waitForObject(":Setup.Save_QPushButton");
                clickButton(":Setup.Save_QPushButton");
                test.log("Bank Account is configured");
            }
            catch(e)
            {
                test.fail("Error in configuring the Bank Accounts" + e);
            }
            
            
            //-------------------Vendor Setup----------------
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Purchase"); 
                waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Vendor");
                activateItem(":xTuple ERP:*.Purchase_QMenu", "Vendor");
                waitForObjectItem(":*.Vendor_QMenu", "List...");
                activateItem(":*.Vendor_QMenu", "List...");
                waitForObject(":Vendors.Query_QToolButton_3");
                clickButton(":Vendors.Query_QToolButton_3");
                waitForObject(":_list_XTreeWidget_8");
                doubleClickItem(":_list_XTreeWidget_8","TPARTS", 5, 5, 0, Qt.LeftButton); 
                waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
                clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Transmission");
                snooze(0.5);
                waitForObject(":_transmitStack.Enable EFT Check Printing_QGroupBox");
                if(!findObject(":_transmitStack.Enable EFT Check Printing_QGroupBox").checked)
                    mouseClick(":_transmitStack.Enable EFT Check Printing_QGroupBox", 15, 5, 0, Qt.LeftButton);
                waitForObject(":Enable EFT Check Printing._routingNumber_XLineEdit");
                findObject(":Enable EFT Check Printing._routingNumber_XLineEdit").clear();
                type(":Enable EFT Check Printing._routingNumber_XLineEdit", "123456789");
                waitForObject(":Enable EFT Check Printing._achAccountNumber_XLineEdit");
                waitForObject(":Enable EFT Check Printing._achAccountNumber_XLineEdit");
                findObject(":Enable EFT Check Printing._achAccountNumber_XLineEdit").clear();
                type(":Enable EFT Check Printing._achAccountNumber_XLineEdit", "123456789");
                waitForObject(":Enable EFT Check Printing.Use Instead of Vendor Number and Name:_QGroupBox");
                if(findObject(":Enable EFT Check Printing.Use Instead of Vendor Number and Name:_QGroupBox").checked)
                    mouseClick(":Enable EFT Check Printing.Use Instead of Vendor Number and Name:_QGroupBox", 20, 5, 0, Qt.LeftButton);
                waitForObject(":Vendor.Save_QPushButton");
                clickButton(":Vendor.Save_QPushButton");
                waitForObject(":Vendors.Close_QToolButton_3");
                clickButton(":Vendors.Close_QToolButton_3");
                test.log("Vendor is configured for EFT printing");
            }
            catch(e)
            {
                test.fail("Error in setting the vendor" + e);
            }
            
        }   
        
        
        
        if(appEdition == "Standard")
        {
            
            //---------Adjusting QOH of YPAINT1------------
            try
            {
                
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Inventory"); 
                waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
                activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
                waitForObjectItem(":*.Transactions_QMenu", "Adjustment...");
                activateItem(":*.Transactions_QMenu", "Adjustment...");
                waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit");
                type(":_filterGroup.ItemLineEdit_ItemLineEdit", "YPAINT1");
                snooze(0.5);
                nativeType("<Tab>");
                waitForObject(":_qty_XLineEdit_4");
                type(":_qty_XLineEdit_4", "500");
                waitForObject(":View Check Run.Post_QPushButton");
                clickButton(":View Check Run.Post_QPushButton");
                waitForObject(":Create Lot/Serial #._lotSerial_XComboBox");
                type(":Create Lot/Serial #._lotSerial_XComboBox", "LOTYP");
                nativeType("<Tab>");
                waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
                type(":_filterGroup.XDateEdit_XDateEdit_2", "+9");
                nativeType("<Tab>");
                waitForObject(":Create Lot/Serial #._qtyToAssign_XLineEdit");
                type(":Create Lot/Serial #._qtyToAssign_XLineEdit", "500");
                
                clickButton(waitForObject(":Create Lot/Serial #.OK_QPushButton"));
                
                waitForObject(":Assign Lot/Serial #.OK_QPushButton");
                clickButton(":Assign Lot/Serial #.OK_QPushButton");
                waitForObject(":[*]Voucher.Cancel_QPushButton");
                clickButton(":[*]Voucher.Cancel_QPushButton");
            }
            catch(e)
            {
                test.fail("Error in adjusting QOH of YPAINT1" + e);
            }
            
            
            //-----------------Bank Account Configuration---------------
            try
            {
                waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
                activateItem(":xTuple ERP:*_QMenuBar_2", "System");
                waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
                activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
                waitForObject(":Setup._modules_QComboBox");
                mouseClick(":Setup._modules_QComboBox", 77, 6, 0, Qt.LeftButton);
                waitForObject(":_modules.Accounting_QModelIndex");
                mouseClick(":_modules.Accounting_QModelIndex", 32, 4, 0, Qt.LeftButton);
                waitForObject(":Accounting Mappings.Bank Accounts_QModelIndex");
                mouseClick(":Accounting Mappings.Bank Accounts_QModelIndex", 38, 6, 0, Qt.LeftButton);
                waitForObject(":_stack._bankaccnt_XTreeWidget");
                doubleClickItem(":_stack._bankaccnt_XTreeWidget","EBANK", 5, 5, 0, Qt.LeftButton);    
                waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
                clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Transmission"); 
//                  waitForObject(":_transmitTab.Enable EFT Check Printing_QGroupBox");
                if(!findObject(":_transmitTab.Enable EFT Check Printing_QGroupBox").checked)
              mouseClick(":_transmitTab.Enable EFT Check Printing_QGroupBox", 15, 5, 0, Qt.LeftButton);
                waitForObject(":_routing_XLineEdit");
                findObject(":_routing_XLineEdit").clear();
                type(":_routing_XLineEdit", "123456789");
                waitForObject(":Setup.Save_QPushButton");
                clickButton(":Setup.Save_QPushButton");
                waitForObject(":Setup.Save_QPushButton");
                clickButton(":Setup.Save_QPushButton");
                test.log("Bank Account is configured");
            }
            catch(e)
            {
                test.fail("Error in configuring the Bank Accounts" + e);
            }
            
            
            //-------------------Vendor Setup----------------
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Purchase"); 
                waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Vendor");
                activateItem(":xTuple ERP:*.Purchase_QMenu", "Vendor");
                waitForObjectItem(":*.Vendor_QMenu", "List...");
                activateItem(":*.Vendor_QMenu", "List...");
                waitForObject(":Vendors.Query_QToolButton_3");
                clickButton(":Vendors.Query_QToolButton_3");
                waitForObject(":_list_XTreeWidget_8");
                doubleClickItem(":_list_XTreeWidget_8","TPARTS", 5, 5, 0, Qt.LeftButton); 
                waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
                clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Transmission");
                waitForObject(":_transmitStack.Enable EFT Check Printing_QGroupBox");
                if(!findObject(":_transmitStack.Enable EFT Check Printing_QGroupBox").checked)
                    mouseClick(":_transmitStack.Enable EFT Check Printing_QGroupBox", 15, 5, 0, Qt.LeftButton);
                waitForObject(":Enable EFT Check Printing._routingNumber_XLineEdit");
                findObject(":Enable EFT Check Printing._routingNumber_XLineEdit").clear();
                type(":Enable EFT Check Printing._routingNumber_XLineEdit", "1234567890");
                waitForObject(":Enable EFT Check Printing._achAccountNumber_XLineEdit");
                waitForObject(":Enable EFT Check Printing._achAccountNumber_XLineEdit");
                findObject(":Enable EFT Check Printing._achAccountNumber_XLineEdit").clear();
                type(":Enable EFT Check Printing._achAccountNumber_XLineEdit", "1234567890");
                waitForObject(":Enable EFT Check Printing.Use Instead of Vendor Number and Name:_QGroupBox");
                if(!findObject(":Enable EFT Check Printing.Use Instead of Vendor Number and Name:_QGroupBox").checked)
                    mouseClick(":Enable EFT Check Printing.Use Instead of Vendor Number and Name:_QGroupBox", 20, 5, 0, Qt.LeftButton);
                waitForObject(":Vendor.Save_QPushButton");
                clickButton(":Vendor.Save_QPushButton");
                waitForObject(":Vendors.Close_QToolButton_3");
                clickButton(":Vendors.Close_QToolButton_3");
                test.log("Vendor is configured for EFT printing");
            }
            catch(e)
            {
                test.fail("Error in setting the vendor" + e);
            }  
            
        }

      
  if(appEdition == "Manufacturing")    
      {
  
  
       //-----Scheduling MRP by Planner Code-----
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
                waitForObject(":_warehouse.Selected:_QRadioButton");
                clickButton(":_warehouse.Selected:_QRadioButton");
                waitForObject(":_warehouse._warehouses_WComboBox");
                clickItem(":_warehouse._warehouses_WComboBox", "WH1", 5, 5, 0, Qt.LeftButton);
                waitForObject(":Run MRP by Planner Code.XDateEdit_XDateEdit");
                type(":Run MRP by Planner Code.XDateEdit_XDateEdit", "+30");
                waitForObject(":Run MRP by Planner Code.OK_QPushButton");
                clickButton(":Run MRP by Planner Code.OK_QPushButton");
                
                test.log("Created Planned Material Requirements Planning Orders");
            }
            catch(e)
            {
                test.fail("Error in scheduling MRP" + e);
            }
          
          //-----------------MRP Results---------
            
            try
            {
                waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
                activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
                waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
                activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
                waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders...");
                activateItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders...");
                
                waitForObject(":Planned Orders.Query_QToolButton");
                clickButton(":Planned Orders.Query_QToolButton");     
                
                snooze(1);
                waitForObject(":_list_XTreeWidget_15");
                if(object.exists("{column='4' container=':_list_XTreeWidget_15' text='TSUB1' type='QModelIndex'}"))
                    test.pass("Planned Order for TSUB1 created ");
                else 
                    test.fail("Planned Order for TSUB1 not created");
                
                waitForObject(":_list_XTreeWidget_15");
                var sWidgetTreeControl = ":_list_XTreeWidget_15";
                waitForObject(sWidgetTreeControl);
                var obj_TreeWidget = findObject(sWidgetTreeControl);
                var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
                var iNumberOfRootItems = obj_TreeRootItem.childCount();
                var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                var qsub1 = obj_TreeTopLevelItem.text(8);
                
               
                waitForObject(":_list_XTreeWidget_15");
                if(object.exists("{column='4' container=':_list_XTreeWidget_15' text='TBOX1' type='QModelIndex'}"))
                    test.pass("Planned Order for TBOX1 created ");
                else 
                    test.fail("Planned Order for TBOX1 not created");
                
                waitForObject(":_list_XTreeWidget_15");
                var sWidgetTreeControl = ":_list_XTreeWidget_15";
                waitForObject(sWidgetTreeControl);
                var obj_TreeWidget = findObject(sWidgetTreeControl);
                var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
                var iNumberOfRootItems = obj_TreeRootItem.childCount();
                var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                var qtbox1 = obj_TreeTopLevelItem.text(8);
                
                waitForObject(":Planned Orders.Close_QToolButton");
                clickButton(":Planned Orders.Close_QToolButton");
            }
            catch(e)
            {
                test.fail("Error in viewing planned orders" + e);
            }
            
            //-----Release Planned P/Os to Purchasing-----
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Schedule"); 
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
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Purchase"); 
                waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
                activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
                waitForObjectItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code...");
                activateItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code..."); 
                
                waitForObject(":_warehouse._warehouses_WComboBox_3");
                clickItem(":_warehouse._warehouses_WComboBox_3", "WH1", 5, 5, 1, Qt.LeftButton);
                waitForObject(":_plannerCode.All Planner Codes_QRadioButton_3");
                clickButton(":_plannerCode.All Planner Codes_QRadioButton_3");   
                waitForObject(":Purchase Requests by Planner Code.Query_QToolButton_2");
                clickButton(":Purchase Requests by Planner Code.Query_QToolButton_2");
                snooze(0.5);                  
                
                
                waitForObject(":_pr.TBOX1_QModelIndex_2");
                openContextMenu(":_pr.TBOX1_QModelIndex_2", 15, 5, 0);
                snooze(1);
                
                activateItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
                snooze(1);
                waitForObjectItem(":_frame._itemsrc_XTreeWidget", "1");
                doubleClickItem(":_frame._itemsrc_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);  
                waitForObject(":Purchase Order Item.Save_QPushButton");
                clickButton(":Purchase Order Item.Save_QPushButton");
                
                waitForObject(":Invalid Unit Price.Continue_QPushButton");
                clickButton(":Invalid Unit Price.Continue_QPushButton");
                
                waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
                
                ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
                
                waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
                clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
                waitForObject(":_lineItemsPage._poitem_XTreeWidget");
                clickItem(":_lineItemsPage._poitem_XTreeWidget", "1", 5, 5, 1, Qt.LeftButton);
                waitForObject(":Purchase Order.Save_QPushButton");
                clickButton(":Purchase Order.Save_QPushButton");
                
                
                waitForObject(":Purchase Order.Cancel_QPushButton");
                clickButton(":Purchase Order.Cancel_QPushButton");
                
                
                waitForObject(":Purchase Requests by Planner Code.Query_QToolButton_2");
                clickButton(":Purchase Requests by Planner Code.Query_QToolButton_2");  
                
                
                waitForObject(":Purchase Requests by Planner Code.Close_QToolButton_2");
                clickButton(":Purchase Requests by Planner Code.Close_QToolButton_2");   
                test.log("Converted P/Rs to P/Os");
            }
            catch(e)
            {
                test.fail("Error in converting P/R to P/O" + e);
            }
        
        
            
            //-----Releasing Purchase Orders-----
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Purchase"); 
                waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
                activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
                waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
                activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
                
                waitForObject(":Open Purchase Orders.Query_QToolButton");
                clickButton(":Open Purchase Orders.Query_QToolButton");  
                waitForObject(":List Open Purchase Orders.Unreleased_XCheckBox_2");
                if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox_2").checked)
                    clickButton(":List Open Purchase Orders.Unreleased_XCheckBox_2");
                waitForObject(":Open Purchase Orders.Query_QToolButton");
                clickButton(":Open Purchase Orders.Query_QToolButton"); 
                snooze(1);//Allow delay
                waitForObject(":_list_XTreeWidget_13");
                if(object.exists("{column='0' container=':_list_XTreeWidget_13' text='"+ponumber+"' type='QModelIndex'}"))
                    test.pass(" Purchase Order Created ");
                else
                    test.fail("Purchase  order is not created");
                
                doubleClickItem(":_list_XTreeWidget_13", ponumber, 5, 5, 0, Qt.LeftButton);
                waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
                clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
                snooze(0.5);
                polineitem=findObject(":_poitem_QModelIndex").text;
                poquantity=findObject(":_poitem.100.00_QModelIndex").text;
                waitForObject(":_lineItemsPage._poitem_XTreeWidget");
                doubleClickItem(":_lineItemsPage._poitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
                       snooze(1);     
                waitForObject(":Quote.Save_QPushButton");
                clickButton(":Quote.Save_QPushButton");
                snooze(0.5);
                if(object.exists(":Invalid Unit Price.Continue_QPushButton"))
                    clickButton(":Invalid Unit Price.Continue_QPushButton");
                waitForObject(":Sales Order.Save_QPushButton_2");
                clickButton(":Sales Order.Save_QPushButton_2");
                snooze(1);
                waitForObject(":Open Purchase Orders.Close_QToolButton");
                clickButton(":Open Purchase Orders.Close_QToolButton");
                
                
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Purchase"); 
                waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
                activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
                waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
                activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
                
                
                waitForObject(":List Open Purchase Orders.Unreleased_XCheckBox_2");
                if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox_2").checked)
                    clickButton(":List Open Purchase Orders.Unreleased_XCheckBox_2");
                snooze(1);//Allow delay
                
                waitForObject(":Open Purchase Orders.Query_QToolButton");
                clickButton(":Open Purchase Orders.Query_QToolButton");          
                clickItem(":_list_XTreeWidget_13", ponumber, 5, 5, 0, Qt.LeftButton);
                snooze(1);
                waitForObject(":_list_XTreeWidget_13");
                openItemContextMenu(":_list_XTreeWidget_13",ponumber, 5, 5, 0);
                
                waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
                activateItem(":xTuple ERP:*._menu_QMenu", "Release...");           
                waitForObject(":Open Purchase Orders.Close_QToolButton");
                clickButton(":Open Purchase Orders.Close_QToolButton");
                test.log("Purchase Orders Released successfully");
            }
            catch(e)
            {
                test.fail("Error in releasing purchase order" + e);
            }
            
      
            var b;
            b = queryQoh("TBOX1","WH1",appEdition);
            
            test.log(b);
            
            //-----Receiving Purchase Goods-----
             try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Inventory"); 
                waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
                activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
                
                waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
                activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
                waitForObject(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit");
                type(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit",ponumber);
                snooze(1);
                nativeType("<Tab>");
                snooze(1);
                if(!object.exists(":Enter Order Receipts.Receive All_QPushButton"))
                {
                    nativeType("<Tab>");
                }
                waitForObject(":Enter Order Receipts.Receive All_QPushButton");
                clickButton(":Enter Order Receipts.Receive All_QPushButton");
                waitForObject(":Enter Order Receipts.Post_QPushButton");
                clickButton(":Enter Order Receipts.Post_QPushButton");
                
                waitForObject(":*.Close_QPushButton");
                clickButton(":*.Close_QPushButton");
            }
            catch(e)
            {
                test.fail("Error in receiving item" + e);
            }
            
            var qohAfter = queryQoh("TBOX1","WH1",appEdition);
            test.log(qohAfter);
            if(qohAfter == parseInt(b) + 100)
                test.pass("Qoh updated correctly");
            else
                test.fail("Qoh not updated correctly");
            
        
            
            //-----Verification of G/L transaction (Receiving PO)-----
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
                waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
                activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
                waitForObjectItem(":*.General Ledger_QMenu", "Reports");
                activateItem(":*.General Ledger_QMenu", "Reports");
               
                waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
                activateItem(":*.Reports_QMenu_2", "Transactions...");
                snooze(1);
                if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
                {
                    waitForObject(":Quantities on Hand.More_QToolButton");
                    clickButton(":Quantities on Hand.More_QToolButton");
                }
                waitForObject(":_filterGroup.XDateEdit_XDateEdit");
                findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
                type(":_filterGroup.XDateEdit_XDateEdit","0");
                waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
                findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
                type(":_filterGroup.XDateEdit_XDateEdit_2","0");
                snooze(0.5);
                waitForObject(":_filterGroup.+_QToolButton");
                clickButton(":_filterGroup.+_QToolButton"); 
                waitForObject(":_filterGroup.xcomboBox3_XComboBox");
                clickItem(":_filterGroup.xcomboBox3_XComboBox","Source", 80, 9, 0, Qt.LeftButton);
                waitForObject(":_filterGroup.widget3_XComboBox");
                clickItem(":_filterGroup.widget3_XComboBox","S/R", 111, 12, 0, Qt.LeftButton);   
                
                
                waitForObject(":General Ledger Transactions.Query_QToolButton_2");
                clickButton(":General Ledger Transactions.Query_QToolButton_2");
                snooze(.5);
                
                waitForObject(":_list_XTreeWidget_4");
                var sWidgetTreeControl = ":_list_XTreeWidget_4";
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
                
                waitForObject(":General Ledger Transactions.Close_QToolButton_2");
                clickButton(":General Ledger Transactions.Close_QToolButton_2"); 
            }
            catch(e)
            {
                test.fail("Error in verifying G/L transaction after receiving PO" + e);
            }
            
            
            //-----Entering a Voucher-----
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
                waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
                activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
                waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
                activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
                waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
                activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
                
                waitForObject(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit");  
                type(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit", ponumber);
                snooze(0.5);
                nativeType("<Tab>");
                vounumber = findObject(":_voucherNumber_XLineEdit_2").text; 
                
                waitForObject(":_poitems._poitem_XTreeWidget_2");
                doubleClickItem(":_poitems._poitem_XTreeWidget_2", "EA", 5, 5, 0, Qt.LeftButton);
                waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget");
                doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
                waitForObject(":_distTab.New_QPushButton_2");
                clickButton(":_distTab.New_QPushButton_2");
                
                waitForObject(":[*]Voucher.XLineEdit_XLineEdit");
                type(":[*]Voucher.XLineEdit_XLineEdit", "25");
                clickButton(":[*]Voucher.Save_QPushButton");
                waitForObject(":[*]Voucher.Save_QPushButton_2");
                clickButton(":[*]Voucher.Save_QPushButton_2");
                waitForObject(":_amount.XLineEdit_XLineEdit");
                type(":_amount.XLineEdit_XLineEdit", findObject(":_amount.XLineEdit_XLineEdit_2").text);
                waitForObject(":_dateGroup.XDateEdit_XDateEdit_14");
                type(":_dateGroup.XDateEdit_XDateEdit_14", "+0");
                waitForObject(":_invoiceNum_XLineEdit_2");
                type(":_invoiceNum_XLineEdit_2", "VO for "+ ponumber);
                waitForObject(":[*]Voucher.Save_QPushButton_3");
                clickButton(":[*]Voucher.Save_QPushButton_3");
                
                waitForObject(":[*]Voucher.Cancel_QPushButton");
                clickButton(":[*]Voucher.Cancel_QPushButton");
                
                
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
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Purchase"); 
                waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
                activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
                waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
                activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
                
                waitForObject(":List Open Purchase Orders.Unreleased_XCheckBox_2");
                if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox_2").checked)
                    clickButton(":List Open Purchase Orders.Unreleased_XCheckBox_2");
                waitForObject(":Open Purchase Orders.Query_QToolButton");
                clickButton(":Open Purchase Orders.Query_QToolButton");  
                
                waitForObject(":Open Purchase Orders.New_QToolButton");
                clickButton(":Open Purchase Orders.New_QToolButton");
                
                waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
                type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
                snooze(0.5);
                nativeType("<Tab>");
                
                var purchaseorder = findObject(":_headerPage._orderNumber_XLineEdit").text;
                
                waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
                clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
                waitForObject(":_lineItemsPage.New_QPushButton_3");
                clickButton(":_lineItemsPage.New_QPushButton_3");
                          
                waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit");
                type(":_filterGroup.ItemLineEdit_ItemLineEdit", "TBOX1");
                snooze(0.5);
                nativeType("<Tab>");
                waitForObject(":_ordered_XLineEdit_3");
                type(":_ordered_XLineEdit_3", "100");
                waitForObject(":_filterGroup.XDateEdit_XDateEdit");
                findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
                type(":_filterGroup.XDateEdit_XDateEdit", "+7");
                
                var polineitem = findObject(":_filterGroup.ItemLineEdit_ItemLineEdit").text;
                var poquantity = findObject(":_ordered_XLineEdit_3").text;
                
                waitForObject(":Quote.Save_QPushButton");
                clickButton(":Quote.Save_QPushButton");
                snooze(1);
                if(object.exists(":Invalid Unit Price.Continue_QPushButton"))
                {
                    
                    waitForObject(":Invalid Unit Price.Continue_QPushButton");
                    clickButton(":Invalid Unit Price.Continue_QPushButton");
                    
                }
                
                waitForObject(":[*]Voucher.Save_QPushButton_3");
                clickButton(":[*]Voucher.Save_QPushButton_3");
                
    
                clickButton(waitForObject(":[*]Voucher.Cancel_QPushButton"));
                
                if(object.exists("{column='0' container=':_list_XTreeWidget_13' text='"+purchaseorder+"' type='QModelIndex'}"))
                    test.pass("Purchase order created successfully");
                else
                    test.fail("Purchase order couldn't be created");
                
                
                waitForObject(":Open Purchase Orders.Close_QToolButton");
                clickButton(":Open Purchase Orders.Close_QToolButton");
            }
            catch(e)
            {
                test.fail("Error in creating purchase order" + e);
            }
            
            
            //-----Releasing Purchase Orders-----
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Purchase"); 
                waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
                activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
                waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
                activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
                
                waitForObject(":List Open Purchase Orders.Unreleased_XCheckBox_2");
                if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox_2").checked)
                    clickButton(":List Open Purchase Orders.Unreleased_XCheckBox_2");
                snooze(0.5);
                waitForObject(":Open Purchase Orders.Query_QToolButton");
                clickButton(":Open Purchase Orders.Query_QToolButton");
                clickItem(":_list_XTreeWidget_13", purchaseorder, 5, 5, 0, Qt.LeftButton);
                snooze(1);
                waitForObject(":_list_XTreeWidget_13");
                openItemContextMenu(":_list_XTreeWidget_13", purchaseorder, 5, 5, 0);
                waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
                activateItem(":xTuple ERP:*._menu_QMenu", "Release..."); 
                
                
                waitForObject(":Open Purchase Orders.Close_QToolButton");
                clickButton(":Open Purchase Orders.Close_QToolButton");
                
                test.log("Purchase Orders Released successfully");
            }
            catch(e)
            {
                test.fail("Error in releasing purchase order" + e);
            }
            
            
            //-----Verification of QOH by Item (Receiving Purchase Goods)-----
             var b;
            b = queryQoh("TBOX1","WH1",appEdition);
            
            test.log(b);
            //-----Receiving Purchase Goods-----
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Inventory"); 
                waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
                activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
                
                waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
                activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
                waitForObject(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit");
                type(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit",purchaseorder);
                snooze(0.5);
                nativeType("<Tab>");
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
            var qohAfter = queryQoh("TBOX1","WH1",appEdition);
            test.log(qohAfter);
            if(qohAfter == parseInt(b) + 100)
                test.pass("Qoh updated correctly");
            else
                test.fail("Qoh not updated correctly");
            
            
            
            //-----Verification of G/L transaction (Receiving PO)-----
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
                waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
                activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
                waitForObjectItem(":*.General Ledger_QMenu", "Reports");
                activateItem(":*.General Ledger_QMenu", "Reports");
                waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
                activateItem(":*.Reports_QMenu_2", "Transactions...");
                snooze(1);
                if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
                {
                    waitForObject(":Quantities on Hand.More_QToolButton");
                    clickButton(":Quantities on Hand.More_QToolButton");
                }
                waitForObject(":_filterGroup.XDateEdit_XDateEdit");
                findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
                type(":_filterGroup.XDateEdit_XDateEdit","0");
                waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
                findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
                type(":_filterGroup.XDateEdit_XDateEdit_2","0");
                waitForObject(":_filterGroup.+_QToolButton");
                clickButton(":_filterGroup.+_QToolButton"); 
                waitForObject(":_filterGroup.xcomboBox3_XComboBox");
                clickItem(":_filterGroup.xcomboBox3_XComboBox","Source", 80, 9, 0, Qt.LeftButton);
                waitForObject(":_filterGroup.widget3_XComboBox");
                clickItem(":_filterGroup.widget3_XComboBox","S/R", 111, 12, 0, Qt.LeftButton);   
                
                waitForObject(":General Ledger Transactions.Query_QToolButton_2");
                clickButton(":General Ledger Transactions.Query_QToolButton_2");
                
                waitForObject(":_list_XTreeWidget_4");
                type(":_list_XTreeWidget_4", "<Down>");
                waitForObject(":_list_XTreeWidget_4");
                var sWidgetTreeControl = ":_list_XTreeWidget_4";
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
                
                waitForObject(":General Ledger Transactions.Close_QToolButton_2");
                clickButton(":General Ledger Transactions.Close_QToolButton_2");
            }
            catch(e)
            {
                test.fail("Error in verification of G/L entry" + e);
            }
            
            
            
            //-----Entering a Voucher-----
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
                waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
                activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
                waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
                activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
                waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
                activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");         
                
                waitForObject(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit");
                type(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit", purchaseorder);
                snooze(0.5);
                nativeType("<Tab>");
                vounumber = findObject(":_voucherNumber_XLineEdit").text; 
                
                waitForObject(":_poitems._poitem_XTreeWidget_2");
                doubleClickItem(":_poitems._poitem_XTreeWidget_2", "EA", 5, 5, 0, Qt.LeftButton);
                waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget");
                doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
                waitForObject(":_distTab.New_QPushButton_2");
                clickButton(":_distTab.New_QPushButton_2");
                waitForObject(":[*]Voucher.XLineEdit_XLineEdit");
                type(":[*]Voucher.XLineEdit_XLineEdit", "20");
                waitForObject(":[*]Voucher.Save_QPushButton");
                clickButton(":[*]Voucher.Save_QPushButton");
                waitForObject(":[*]Voucher.Save_QPushButton_2");
                clickButton(":[*]Voucher.Save_QPushButton_2");
                
                waitForObject(":_amount.XLineEdit_XLineEdit");
                type(":_amount.XLineEdit_XLineEdit", findObject(":_amount.XLineEdit_XLineEdit_2").text);
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
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
            waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
            activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
            waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
            activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
            
            
            waitForObject(":List Unposted Vouchers._vohead_XTreeWidget");
            
            if(object.exists("{column='0' container=':List Unposted Vouchers._vohead_XTreeWidget' text='"+vounumber+"' type='QModelIndex'}"))
            { 
                clickItem(":List Unposted Vouchers._vohead_XTreeWidget",vounumber,5,5,0,Qt.LeftButton);
                test.pass(" Voucher created ");
            }
            else
                test.fail("Voucher is not created ");
            
            waitForObject(":List Unposted Vouchers.Post_QPushButton");
            clickButton(":List Unposted Vouchers.Post_QPushButton");
            waitForObject(":List Unposted Vouchers.Alternate Date:_QRadioButton");
            clickButton(":List Unposted Vouchers.Alternate Date:_QRadioButton");
            snooze(0.5);
            waitForObject(":List Unposted Vouchers.Continue_QPushButton");
            clickButton(":List Unposted Vouchers.Continue_QPushButton");
            
            waitForObject(":*.Close_QPushButton");
            clickButton(":*.Close_QPushButton");
            test.log("Posted Voucher successfully");
        }
        catch(e)
        {
            test.fail("Error in posting of voucher" + e);
        }   
        
         //---DO Nothing------ 
        if(OS.name != "Windows")
        {
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
            test.log("First do nothing block");
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        catch(e)
        {
              
        }
     //---Do Nothing------ 
        try
        {        
            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
            test.log("second do nothing block");
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        catch(e)
        {
            
        }
    }
        
        //-----Verification of G/L transaction (Posting Vouchers)-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":*.General Ledger_QMenu", "Reports");
            activateItem(":*.General Ledger_QMenu", "Reports");
            waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
            activateItem(":*.Reports_QMenu_2", "Transactions...");
            snooze(1);
            if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
            {
                waitForObject(":Quantities on Hand.More_QToolButton");
                clickButton(":Quantities on Hand.More_QToolButton");
            }
            waitForObject(":_filterGroup.XDateEdit_XDateEdit");
            findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
            type(":_filterGroup.XDateEdit_XDateEdit","0");
            waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
            findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
            type(":_filterGroup.XDateEdit_XDateEdit_2","0");
            snooze(0.5);
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton"); 
            waitForObject(":_filterGroup.xcomboBox3_XComboBox");
            clickItem(":_filterGroup.xcomboBox3_XComboBox","Source", 80, 9, 0, Qt.LeftButton);
            waitForObject(":_filterGroup.widget3_XComboBox");
            clickItem(":_filterGroup.widget3_XComboBox","A/P", 111, 12, 0, Qt.LeftButton);   
            
            waitForObject(":General Ledger Transactions.Query_QToolButton_2");
            clickButton(":General Ledger Transactions.Query_QToolButton_2");
            snooze(0.5);
            waitForObject(":_list_XTreeWidget_4");
            var sWidgetTreeControl = ":_list_XTreeWidget_4";
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
            
            waitForObject(":General Ledger Transactions.Close_QToolButton_2");
            clickButton(":General Ledger Transactions.Close_QToolButton_2");                 
        }
        catch(e)
        {
            test.fail("Error in verifying G/L entry" + e);
        } 
      
        //---Selecting Voucher for Payment---
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
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
            waitForObject(":frame.Select..._QPushButton");// linked to frame
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
       //----- Do nothing -----
        try{
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
            activateItem(":xTuple ERP:*_QMenuBar_2", "System");
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
            activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
             waitForObject(":Setup.Save_QPushButton");
            clickButton(":Setup.Save_QPushButton");
        }
        catch(e)
        {
            test.log();
        }
      //-----Extracting OS Name-----
        var linuxPath, winPath;
        try
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
            activateItem(":xTuple ERP:*_QMenuBar_2", "System");
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
            activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
            waitForObject(":Configure.Encryption_QModelIndex");
            mouseClick(":Configure.Encryption_QModelIndex", 40, 8, 0, Qt.LeftButton);
            
            snooze(1);
            if(object.exists(":OK_QPushButton"))
                clickButton(":OK_QPushButton");
            
            waitForObject(":Encryption Configuration_FileLineEdit_2");
            linuxPath = findObject(":Encryption Configuration_FileLineEdit_2").text;
            waitForObject(":Encryption Configuration_FileLineEdit");
            winPath = findObject(":Encryption Configuration_FileLineEdit").text;
            
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
            snooze(1); 
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
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
      
        
      
       
         //-----View Check run-----
            try {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
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
                waitForObjectItem(":_QMenu", "Check Run...");
                activateItem(":_QMenu", "Check Run...");
                snooze(2);
        if(OS.name == "Windows")
        {
            snooze(1);
             clickButton(waitForObject(":Print Check.Create EFT File_QPushButton"));
            waitForObject(":fileNameEdit_QLineEdit");
            findObject(":fileNameEdit_QLineEdit").text = winPath.toString()+"/achFile.ach";
            sendEvent("QMouseEvent", waitForObject(":Cash Receipt.Save_QPushButton_3"), QEvent.MouseButtonPress, 42, 13, Qt.LeftButton, 0);

            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            clickButton(waitForObject(":ACH File OK?.Yes_QPushButton"));  
            clickButton(waitForObject(":[*]Voucher.Cancel_QPushButton"));
           
        }
        else
        {
            
            clickButton(waitForObject(":Print Check.Print_QPushButton_2"));
            snooze(1);
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            snooze(0.5);
            if(object.exists(":filename_QLineEdit"))
            {
                findObject(":filename_QLineEdit").clear();
                type(waitForObject(":filename_QLineEdit"), "2");
            }
            snooze(1);
            if(object.exists(":Print.Print_QPushButton"))
                clickButton(waitForObject(":Print.Print_QPushButton"));
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            clickButton(waitForObject(":[*]Voucher.Cancel_QPushButton"));
        }
    }
            catch (e) {
                test.fail("Error in viewing check run" + e);
            }
            
            
            //-----Post Check run-----
            try {
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
    
//         //---DO Nothing------ 
//        if(OS.name != "Windows")
//        {
//        try
//        {
//            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
//            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
//             test.log("third do nothing block");
//            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
//        }
//        catch(e)
//        {
//              
//        }
//     //---Do Nothing------ 
//        try
//        {        
//            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
//            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
//             test.log("fourth do nothing block");
//            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
//        }
//        catch(e)
//        {
//            
//        }
//    }
                 //-----Verification of G/L transaction (Posting Checks)-----
            try {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
                waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
                activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
                waitForObjectItem(":*.General Ledger_QMenu", "Reports");
                activateItem(":*.General Ledger_QMenu", "Reports");
                waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
                activateItem(":*.Reports_QMenu_2", "Transactions...");
                snooze(1);
                if (!(object.exists(":_filterGroup.XDateEdit_XDateEdit"))) {
    
                    waitForObject(":Quantities on Hand.More_QToolButton");
                    clickButton(":Quantities on Hand.More_QToolButton");
                }
                waitForObject(":_filterGroup.XDateEdit_XDateEdit");
                findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
                type(":_filterGroup.XDateEdit_XDateEdit", "0");
                waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
                findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
                type(":_filterGroup.XDateEdit_XDateEdit_2", "0");
                waitForObject(":_filterGroup.+_QToolButton");
                clickButton(":_filterGroup.+_QToolButton");
                waitForObject(":_filterGroup.xcomboBox3_XComboBox");
                clickItem(":_filterGroup.xcomboBox3_XComboBox", "Source", 80, 9, 0, Qt.LeftButton);
                waitForObject(":_filterGroup.widget3_XComboBox");
                clickItem(":_filterGroup.widget3_XComboBox", "A/P", 111, 12, 0, Qt.LeftButton);
    
    
                waitForObject(":General Ledger Transactions.Query_QToolButton_2");
                clickButton(":General Ledger Transactions.Query_QToolButton_2");
                waitForObject(":_list_XTreeWidget_4");
                if (object.exists("{column='2' container=':_list_XTreeWidget_4' text='CK' type='QModelIndex'}"))
                    test.pass("Posting of Checks has a GL entry");
                else
                    test.fail("Posting of Checks has no GL entry");
    
                waitForObject(":General Ledger Transactions.Close_QToolButton_2");
                clickButton(":General Ledger Transactions.Close_QToolButton_2");
            }
            catch (e)
            {
                test.fail("Error in verifying G/L entry" + e);
            }
    
      
      
        //-----Releasing WorkOrders-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Manufacture"); 
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
        
      
       
        //-----Issuing Work Order Materials-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Manufacture"); 
            waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Issue Material");
            activateItem(":xTuple ERP:*.Transactions_QMenu", "Issue Material");
            waitForObjectItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
            activateItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
            if(appEdition=="Manufacturing")
            {
                
                waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
                waitForObject(":_woGroup_QLabel");
                sendEvent("QMouseEvent", ":_woGroup_QLabel", QEvent.MouseButtonPress, 12, 14, Qt.LeftButton, 0);
                waitForObjectItem(":_QMenu", "List...");
                activateItem(":_QMenu", "List...");
                waitForObject(":_listTab_XTreeWidget");
                doubleClickItem(":_listTab_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
                waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
                clickButton(":Issue Work Order Material Batch.Post_QPushButton");
            }
            
            
            else 
            {   
                waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
                type(":_woGroup.VirtualClusterLineEdit_WoLineEdit",sonumber + "-1");
                waitForObject(":_QTreeView");
                type(":_QTreeView", "<Enter>");
                snooze(0.5);
                
                if(appEdition=="Standard")
                {
                    waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
                    clickButton(":Issue Work Order Material Batch.Post_QPushButton");
                    waitForObject(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget");
                    doubleClickItem(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget", "No", 0, 0, 0, Qt.LeftButton);
                    waitForObject(":Distribute to Location.Distribute_QPushButton_2");
                    clickButton(":Distribute to Location.Distribute_QPushButton_2");
                    waitForObject(":View Check Run.Post_QPushButton");
                    clickButton(":View Check Run.Post_QPushButton");
                }
                else
                {
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
         //---DO Nothing------ 
        if(OS.name != "Windows")
        {
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
   
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        catch(e)
        {
              
        }
     //---Do Nothing------ 
        try
        {        
            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
   
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        catch(e)
        {
            
        }
    }
     
        //-----Verification of QOH by Item (Post Production)-----
       
            if(appEdition=="Manufacturing")
            { 
                var tsubQty1 =  queryQoh("TSUB1","WH1",appEdition);
            test.log(tsubQty1);
                              }
            else
            {
                var ytruckQty1 =  queryQoh("YTRUCK1","WH1",appEdition);
            test.log(ytruckQty1);
             }        
            
        
        
        
        //-----Post Production and Close Work order-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Manufacture"); 
            waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
            activateItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
            
            
            if(appEdition== "Manufacturing")
            { 
                
                waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2");
                waitForObject(":_woGroup_QLabel_2");
                sendEvent("QMouseEvent", ":_woGroup_QLabel_2", QEvent.MouseButtonPress, 11, 13, Qt.LeftButton, 0);
                waitForObjectItem(":_QMenu", "List...");
                activateItem(":_QMenu", "List...");
                
                waitForObject(":_listTab_XTreeWidget");
                doubleClickItem(":_listTab_XTreeWidget", "TSUB1", 5, 5, 0, Qt.LeftButton);
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
                
                waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2");
                type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2",sonumber + "-1");
                waitForObject(":_QTreeView");
                type(":_QTreeView", "<Enter>");
                snooze(0.5);
                
                if(appEdition=="Standard")
                {
                    
                    waitForObject(":_qty_XLineEdit");
                    
                    woquantity = findObject(":_qtyGroup.100.00_XLabel").text;
                    
                    type(":_qty_XLineEdit",woquantity);
                    
                    waitForObject(":_optionsGroup.Close Work Order after Posting_XCheckBox");
                    if(!findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked)
                         clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
                    waitForObject(":Post Production.Post_QPushButton");
                    clickButton(":Post Production.Post_QPushButton");
                    waitForObject(":Close Work Order.Close W/O_QPushButton");
                    clickButton(":Close Work Order.Close W/O_QPushButton");
                    snooze(0.5);
                    waitForObject(":Close Work Order.Yes_QPushButton");
                    clickButton(":Close Work Order.Yes_QPushButton");
                    waitForObject(":Post Production.Close_QPushButton");
                    clickButton(":Post Production.Close_QPushButton");
                }
                
                else
                {
                    waitForObject(":_qty_XLineEdit");
                    
                    woquantity = findObject(":_qtyGroup.100.00_XLabel").text;
                    
                    type(":_qty_XLineEdit",woquantity);
                    snooze(0.5);
                     waitForObject(":_optionsGroup.Close Work Order after Posting_XCheckBox");
                    if(!findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked);
                            clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
                    waitForObject(":Post Production.Post_QPushButton");
                    clickButton(":Post Production.Post_QPushButton");
                    snooze(0.5);
                    waitForObject(":Close Work Order.Close W/O_QPushButton");
                    clickButton(":Close Work Order.Close W/O_QPushButton");
                    snooze(0.5);
                    waitForObject(":Close Work Order.Yes_QPushButton");
                    clickButton(":Close Work Order.Yes_QPushButton");
                    waitForObject(":View Check Run.Close_QPushButton");
                    clickButton(":View Check Run.Close_QPushButton");
                }
            }
            
        }
        catch(e)
        {
            
            test.fail("Error in post production of work order" + e);
        }    
        
        
        
        //-----Verification of updated QOH by Item (Post Production)-----

            if(appEdition == "Manufacturing")
            { 
            var tsubQty2 = queryQoh("TSUB1","WH1",appEdition);
            test.log(tsubQty2);
            if(tsubQty2 == tsubQty1 + 100)
                test.pass("Qoh updated correctly");
            else
                test.fail("Qoh not updated correctly");
        }
            else
            {
                 var ytruckQty2 = queryQoh("YTRUCK1","WH1",appEdition);
            test.log(ytruckQty2);
            if(ytruckQty2 == ytruckQty1 + 100)
                test.pass("Qoh updated correctly");
            else
                test.fail("Qoh not updated correctly");
        }
           
        
        //-----Verification of G/L transaction (Post Production)-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":*.General Ledger_QMenu", "Reports");
            activateItem(":*.General Ledger_QMenu", "Reports");
            waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
            activateItem(":*.Reports_QMenu_2", "Transactions...");
            snooze(1);
            if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
            {
                waitForObject(":Quantities on Hand.More_QToolButton");
                clickButton(":Quantities on Hand.More_QToolButton");
            }
            waitForObject(":_filterGroup.XDateEdit_XDateEdit");
            findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
            type(":_filterGroup.XDateEdit_XDateEdit","0");
            waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
            findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
            type(":_filterGroup.XDateEdit_XDateEdit_2","0");
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton"); 
            waitForObject(":_filterGroup.xcomboBox3_XComboBox");
            clickItem(":_filterGroup.xcomboBox3_XComboBox","Source", 80, 9, 0, Qt.LeftButton);
            waitForObject(":_filterGroup.widget3_XComboBox");
            clickItem(":_filterGroup.widget3_XComboBox","W/O", 111, 12, 0, Qt.LeftButton);   
            
            
            waitForObject(":General Ledger Transactions.Query_QToolButton_2");
            clickButton(":General Ledger Transactions.Query_QToolButton_2");
            snooze(0.5);
            waitForObject(":_list_XTreeWidget_4");
            var sWidgetTreeControl = ":_list_XTreeWidget_4";
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
            
            waitForObject(":General Ledger Transactions.Close_QToolButton_2");
            clickButton(":General Ledger Transactions.Close_QToolButton_2");
        }
        catch(e)
        {
            test.fail("Error in verifying G/L entry after post production" + e);
        }   
        
        
        //-----Verification of QOH by Item (BackFlush Items)-----
          var ytruckQty3 =  queryQoh("YTRUCK1","WH1",appEdition);
            test.log(ytruckQty3);
        
//        try
//        {      
//            waitForObject(":xTuple ERP: *_QMenuBar");
//            activateItem(":xTuple ERP: *_QMenuBar", "Inventory"); 
//            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
//            activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
//            waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand...");
//            activateItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand...");
//            snooze(1);
//            if(!object.exists(":_filterGroup.Manage_QPushButton"))
//            {
//                waitForObject(":Quantities on Hand.More_QToolButton");
//                clickButton(":Quantities on Hand.More_QToolButton");
//            }
//            if(appEdition=="Manufacturing" || appEdition=="Standard")
//            {  
//                
//                waitForObject(":_filterGroup.xcomboBox1_XComboBox");
//                clickItem(":_filterGroup.xcomboBox1_XComboBox", "Site",5, 5, 1, Qt.LeftButton);
//                
//                
//                waitForObject(":_filterGroup.widget1_WComboBox");
//                clickItem(":_filterGroup.widget1_WComboBox", "WH1",5, 5, 1, Qt.LeftButton);   
//                
//                waitForObject(":_filterGroup.+_QToolButton_2");
//                clickButton(":_filterGroup.+_QToolButton_2");
//                
//                waitForObject(":_filterGroup.xcomboBox2_XComboBox");
//                clickItem(":_filterGroup.xcomboBox2_XComboBox", "Item",5, 5, 1, Qt.LeftButton);
//                
//                waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit")
//                        type(":_filterGroup.ItemLineEdit_ItemLineEdit","YTRUCK1");
//                           }
//            
//            else
//            {
//                waitForObject(":_filterGroup.xcomboBox1_XComboBox");
//                clickItem(":_filterGroup.xcomboBox1_XComboBox", "Item",5, 5, 1, Qt.LeftButton);
//                
//                waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit")
//                        type(":_filterGroup.ItemLineEdit_ItemLineEdit","YTRUCK1");
//               
//            }
//            
//            waitForObject(":Quantities on Hand.Query_QToolButton");
//            clickButton(":Quantities on Hand.Query_QToolButton");
//            snooze(0.5);
//            waitForObject(":_list_XTreeWidget_14");
//            var sWidgetTreeControl = ":_list_XTreeWidget_14";
//            waitForObject(sWidgetTreeControl);
//            var obj_TreeWidget = findObject(sWidgetTreeControl);
//            var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
//            var iNumberOfRootItems = obj_TreeRootItem.childCount();
//            var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
//            var sNameOfRootItem1 = obj_TreeTopLevelItem.text(8);
//            
//            waitForObject(":Quantities on Hand.Close_QToolButton");
//            clickButton(":Quantities on Hand.Close_QToolButton");
//        }
//        catch(e)
//        {
//            test.fail("Error in verifying QOH by item" + e);
//        }    
        
        
        if(appEdition== "Manufacturing")
        {
            
            
            //-----BackFlush Items and Close Work Order-----
            try
            {
                waitForObject(":xTuple ERP: *_QMenuBar");
                activateItem(":xTuple ERP: *_QMenuBar", "Manufacture"); 
                waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
                activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
                waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
                activateItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
                
                waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2");
                waitForObject(":_woGroup_QLabel_2");
                sendEvent("QMouseEvent", ":_woGroup_QLabel_2", QEvent.MouseButtonPress, 11, 13, Qt.LeftButton, 0);
                waitForObjectItem(":_QMenu", "List...");
                activateItem(":_QMenu", "List...");
                
                waitForObject(":_listTab_XTreeWidget");
                doubleClickItem(":_listTab_XTreeWidget", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
                snooze(0.5)
                var qbackflush = findObject(":_qtyGroup.100.00_XLabel_2").text
                                 
                                 type(":_qty_XLineEdit", qbackflush);
                waitForObject(":_optionsGroup.Close Work Order after Posting_XCheckBox");
                if(!findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked)
                         clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
                waitForObject(":Post Production.Post_QPushButton");
                clickButton(":Post Production.Post_QPushButton");
                if(appEdition=="Manufacturing")
                {
                    waitForObject(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget");
                    doubleClickItem(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget", "No", 0, 0, 0, Qt.LeftButton);
                    
                    waitForObject(":Distribute to Location.Distribute_QPushButton_2");
                    clickButton(":Distribute to Location.Distribute_QPushButton_2");
                    waitForObject(":Distribute Stock To/From Site Locations.Post_QPushButton_2");
                    clickButton(":Distribute Stock To/From Site Locations.Post_QPushButton_2");
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
            
//            //---DO Nothing------ 
//        if(OS.name != "Windows")
//        {
//        try
//        {
//            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
//            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
//   
//            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
//        }
//        catch(e)
//        {
//              
//        }
//     //---Do Nothing------ 
//        try
//        {        
//            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
//            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
//   
//            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
//        }
//        catch(e)
//        {
//            
//        }
//    }
     
            //-----Verification of updated QOH by Item (BackFlush Items)-----
          var ytruckQty4 = queryQoh("YTRUCK1","WH1",appEdition);
            test.log(ytruckQty4);
            if(ytruckQty4 == ytruckQty3 + 100)
                test.pass("Qoh updated correctly");
            else
                test.fail("Qoh not updated correctly");
//            try
//            {
//                
//                waitForObject(":xTuple ERP: *_QMenuBar");
//                activateItem(":xTuple ERP: *_QMenuBar", "Inventory"); 
//                waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
//                activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
//                waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand...");
//                activateItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand...");
//                snooze(1);
//                if(!object.exists(":_filterGroup.Manage_QPushButton"))
//                {
//                    waitForObject(":Quantities on Hand.More_QToolButton");
//                    clickButton(":Quantities on Hand.More_QToolButton");
//                }
//                waitForObject(":_filterGroup.xcomboBox1_XComboBox");
//                clickItem(":_filterGroup.xcomboBox1_XComboBox", "Site",5, 5, 1, Qt.LeftButton);
//                
//                
//                waitForObject(":_filterGroup.widget1_WComboBox");
//                clickItem(":_filterGroup.widget1_WComboBox", "WH1",5, 5, 1, Qt.LeftButton);   
//                
//                waitForObject(":_filterGroup.+_QToolButton_2");
//                clickButton(":_filterGroup.+_QToolButton_2");
//                
//                waitForObject(":_filterGroup.xcomboBox2_XComboBox");
//                clickItem(":_filterGroup.xcomboBox2_XComboBox", "Item",5, 5, 1, Qt.LeftButton);
//                
//                waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit")
//                        type(":_filterGroup.ItemLineEdit_ItemLineEdit","YTRUCK1");
//             
//                waitForObject(":Quantities on Hand.Query_QToolButton");
//                clickButton(":Quantities on Hand.Query_QToolButton");
//                snooze(1);
//                waitForObject(":_list_XTreeWidget_14");
//                var sWidgetTreeControl = ":_list_XTreeWidget_14";
//                waitForObject(sWidgetTreeControl);
//                var obj_TreeWidget = findObject(sWidgetTreeControl);
//                var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
//                var iNumberOfRootItems = obj_TreeRootItem.childCount();
//                var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
//                var sNameOfRootItem2 = obj_TreeTopLevelItem.text(8); 
//                
//                var result = replaceSubstring(sNameOfRootItem1.latin1(), ",","");
//                
//                var qoh = replaceSubstring(sNameOfRootItem2.latin1(),",","");
//                
//                var sum = (parseInt(qbackflush.toString()) + parseInt(result.toString()));
//                
//                waitForObject(":Quantities on Hand.Close_QToolButton");
//                clickButton(":Quantities on Hand.Close_QToolButton");
//                if(parseInt(qoh.toString()) == parseInt(sum.toString())) 
//                    test.pass(" QOH updated correctly for Backflush items");
//                else test.fail("QOH updated incorrectly for Backflush items");
//            }
//            catch(e)
//            {
//                test.fail("Error in verifying updated QOH by item" + e);
//            }    
//            
        }
        
       
        //-----Verification of QOH by Item (Issue Stock to Shipping)-----
       var ytruckQty5 =  queryQoh("YTRUCK1","WH1",appEdition);
            test.log(ytruckQty5);
        
        
        
        //-----Issue Stock to Shipping-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory"); 
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
            activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
            
            waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
         type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber);
            snooze(0.5);
            nativeType("<Tab>");
            
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
            
            waitForObject(":Issue to Shipping.Close_QPushButton");
            clickButton(":Issue to Shipping.Close_QPushButton");
            test.log("Sales order Stock issued");
        }
        catch(e)
        {
            test.fail("Error in issuing stock to shipping" + e);
        }    
      
        
        //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----
        var ytruckQty6 = queryQoh("YTRUCK1","WH1",appEdition);
            test.log(ytruckQty6);
            if(ytruckQty6 == ytruckQty5 - 100)
                test.pass("Qoh updated correctly");
            else
                test.fail("Qoh not updated correctly");
        //-----Select Order for Billing-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales"); 
            waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
            activateItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
            waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
            activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
            waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Select Order for Billing...");
            activateItem(":xTuple ERP:*.Invoice_QMenu", "Select Order for Billing...");
            
            waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
            type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit", sonumber);
            snooze(0.5);
            nativeType("<Tab>");
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
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales"); 
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
            //---DO Nothing------ 
        if(OS.name != "Windows")
        {
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
             test.log("Fifth do nothing block");
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        catch(e)
        {
              
        }
     //---Do Nothing------ 
        try
        {        
            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
             test.log("sixth do nothing block");
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        catch(e)
        {
            
        }
    }
     
    
        //-----Posting Invoices-----
     try
    {       
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales"); 
            waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
            activateItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
            waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
            activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
            type(":xTuple ERP:*.Billing_QMenu","<Right>");
            type(":xTuple ERP:*.Billing_QMenu","<Right>");
            waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices...");
            activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices...");
      
          
            waitForObject(":_list_XTreeWidget_14");
        openItemContextMenu(":_list_XTreeWidget_14",sonumber, 5, 5, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(2);
        var invoice = findObject(":_invoiceNumber_XLineEdit").text;
        waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
            
        var invamt=findObject(":lineItemsTab.XLineEdit_XLineEdit").text;
        waitForObject(":Invoice.Close_QPushButton");
        clickButton(":Invoice.Close_QPushButton"); 
        
        waitForObject(":_list_XTreeWidget_14");
        openItemContextMenu(":_list_XTreeWidget_14",invoice, 5, 5, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        snooze(0.5);
        waitForObject(":List Unposted Vouchers.Continue_QPushButton");
        clickButton(":List Unposted Vouchers.Continue_QPushButton");
        waitForObject(":Quantities on Hand.Close_QToolButton");
        clickButton(":Quantities on Hand.Close_QToolButton");
        
            test.log("Invoice posted successful");
        }
        catch(e)
        {
            test.fail("Error in posting invoice" + e);
        }    
        
        //-----Verification of G/L transaction (Posting Invoice)-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":*.General Ledger_QMenu", "Reports");
            activateItem(":*.General Ledger_QMenu", "Reports");
            waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
            activateItem(":*.Reports_QMenu_2", "Transactions...");
            snooze(1);
            if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
            {
                
                waitForObject(":Quantities on Hand.More_QToolButton");
                clickButton(":Quantities on Hand.More_QToolButton");
            }
            waitForObject(":_filterGroup.XDateEdit_XDateEdit");
            findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
            type(":_filterGroup.XDateEdit_XDateEdit","0");
            waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
            findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
            type(":_filterGroup.XDateEdit_XDateEdit_2","0");
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton"); 
            waitForObject(":_filterGroup.xcomboBox3_XComboBox");
            clickItem(":_filterGroup.xcomboBox3_XComboBox","Source", 80, 9, 0, Qt.LeftButton);
            waitForObject(":_filterGroup.widget3_XComboBox");
            clickItem(":_filterGroup.widget3_XComboBox","A/R", 111, 12, 0, Qt.LeftButton);   
            
            waitForObject(":General Ledger Transactions.Query_QToolButton_2");
            clickButton(":General Ledger Transactions.Query_QToolButton_2");
            snooze(2);  
            waitForObject(":_list_XTreeWidget_4");
            var sWidgetTreeControl = ":_list_XTreeWidget_4";
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
            
            waitForObject(":General Ledger Transactions.Close_QToolButton_2");
            clickButton(":General Ledger Transactions.Close_QToolButton_2");
        }
        catch(e)
        {
            test.fail("Error in verifying G/L entry after posting of invoice" + e);
        }    
        
        
        //-----Entering Cash Receipts-----
        try
        {  
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
            waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Workbench...");
            activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Workbench...");
            
            waitForObject(":Receivables Workbench._select_XComboBox");
            clickItem(":Receivables Workbench._select_XComboBox", "All Customers", 5, 5, 1, Qt.LeftButton);
            waitForObject(":Receivables Workbench.Query_QPushButton");
            clickButton(":Receivables Workbench.Query_QPushButton");
            snooze(0.5);
            waitForObject(":_list_XTreeWidget_6");
            if(object.exists("{column='4' container=':_list_XTreeWidget_6' text='"+invoice+"' type='QModelIndex'}"))
                test.pass("Invoice available under Receivables in AR Workbench");
            else 
                test.fail("Invoice not found under Receivables in AR Workbench");
            
            waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
            clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Cash Receipts");
            waitForObject(":_cashRecptTab.New_QPushButton");
            clickButton(":_cashRecptTab.New_QPushButton");
            
            waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
            type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
            snooze(0.5);
            nativeType("<Tab>");
            waitForObject(":_amountGroup.XLineEdit_XLineEdit");
            type(":_amountGroup.XLineEdit_XLineEdit", invamt);
     
            waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
            clickItem(":_applicationsTab._aropen_XTreeWidget_2", sonumber, 5, 5, 1, Qt.LeftButton);
            var amt=findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
            waitForObject(":_applicationsTab.Apply to Balance_QPushButton");
            clickButton(":_applicationsTab.Apply to Balance_QPushButton");
            
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
              //---DO Nothing------ 
        if(OS.name != "Windows")
        {
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
             test.log("seventh do nothing block");
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        catch(e)
        {
              
        }
     //---Do Nothing------ 
        try
        {        
            activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
            activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
             test.log("Eighth do nothing block");
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        catch(e)
        {
            
        }
    }
     
        
        //-----Verification of G/L transaction (Posting Cash Receipts)-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":*.General Ledger_QMenu", "Reports");
            activateItem(":*.General Ledger_QMenu", "Reports");
            waitForObjectItem(":*.Reports_QMenu_2", "Transactions...");
            activateItem(":*.Reports_QMenu_2", "Transactions...");
            snooze(1);
            if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
            {
                
                waitForObject(":Quantities on Hand.More_QToolButton");
                clickButton(":Quantities on Hand.More_QToolButton");
            }
            waitForObject(":_filterGroup.XDateEdit_XDateEdit");
            findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
            type(":_filterGroup.XDateEdit_XDateEdit","0");
            waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
            findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
            type(":_filterGroup.XDateEdit_XDateEdit_2","0");
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton"); 
            waitForObject(":_filterGroup.xcomboBox3_XComboBox");
            clickItem(":_filterGroup.xcomboBox3_XComboBox","Source", 80, 9, 0, Qt.LeftButton);
            waitForObject(":_filterGroup.widget3_XComboBox");
            clickItem(":_filterGroup.widget3_XComboBox","A/R", 111, 12, 0, Qt.LeftButton);   
            waitForObject(":General Ledger Transactions.Query_QToolButton_2");
            clickButton(":General Ledger Transactions.Query_QToolButton_2");
            snooze(2); 
            waitForObject(":_list_XTreeWidget_4");
            var sWidgetTreeControl = ":_list_XTreeWidget_4";
            waitForObject(sWidgetTreeControl);
            var obj_TreeWidget = findObject(sWidgetTreeControl);
            var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
            var iNumberOfRootItems = obj_TreeRootItem.childCount();
            type(sWidgetTreeControl,"<Space>");
            var obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
            if(object.exists("{column='2' container=':_list_XTreeWidget_4' text='CR' type='QModelIndex'}"))
                test.pass("Posting Cash Receipts has a GL entry");
            else test.fail("Posting Cash Receipts has no GL entry");
            
            waitForObject(":General Ledger Transactions.Close_QToolButton_2");
            clickButton(":General Ledger Transactions.Close_QToolButton_2");
        }
        catch(e)
        {
            test.fail("Error in verifying G/l entry after posting cash receipt" + e);
        }    
        
        
        //-----Customer History-----
        try
        {
            waitForObject(":xTuple ERP: *_QMenuBar");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting"); 
            waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
            activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
            waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Reports");
            waitForObjectItem(":*.Reports_QMenu", "Customer History...");
            activateItem(":*.Reports_QMenu", "Customer History...");
            waitForObject(":Selection.VirtualClusterLineEdit_CLineEdit");
            type(":Selection.VirtualClusterLineEdit_CLineEdit", "TTOYS");
            snooze(0.5);
            nativeType("<Tab>");
            waitForObject(":Customer History.XDateEdit_XDateEdit");
            type(":Customer History.XDateEdit_XDateEdit", "0");
            waitForObject(":Customer History.XDateEdit_XDateEdit");
            type(":Customer History.XDateEdit_XDateEdit", "<Tab>");
            waitForObject(":Customer History.XDateEdit_XDateEdit_2");
            type(":Customer History.XDateEdit_XDateEdit_2", "0");
            
            waitForObject(":Customer History.Query_QToolButton_2");
            clickButton(":Customer History.Query_QToolButton_2");
            waitForObject(":_list_XTreeWidget_3");
             snooze(.5);
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='"+invoice+"' type='QModelIndex'}"))
            {
                
                test.pass(" Invoice posted and available in Customer History");
            }
            else test.fail("Invoice not available in Customer History");
            waitForObject(":Customer History.Close_QToolButton_2");
            clickButton(":Customer History.Close_QToolButton_2");
            
        }
        catch(e)
        {
            test.fail("Error in viewing customer history" + e);
        }    
    }
    

