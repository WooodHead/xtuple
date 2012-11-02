

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
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    snooze(1);
    
    
    //----------Setting the Encryption Key----------
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
    
    //--------------- Set the window to Tab view mode -------------
    
    tabView();
    
    //-----Set Invoice Buffer to 30days-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Accounts Receivable");
        waitForObject(":_recurringBuffer_QSpinBox").clear();
        type(":_recurringBuffer_QSpinBox", "30");
        waitForObject(":Setup.Apply_QPushButton");
        clickButton(":Setup.Apply_QPushButton");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Invoice buffer adjusted sucessfully to 30days");
        
    }
    catch(e)
    {
        test.fail("Error in adjusting Invoice buffer to 30days:"+e);
    }
    
    //----Create Recurring Invoice----
    try
    {
        snooze(1);
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        snooze(0.5);
        var Invwidget = findObject(":_list_XTreeWidget_3");
        var Invcount = Invwidget.topLevelItemCount;
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        // Verification Point 'VP1'
        var Invnum =findObject(":_invoiceNumber_XLineEdit").text;
        var Pinvnum = Invnum;
        
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":lineItemsTab.New_QPushButton");
        clickButton(":lineItemsTab.New_QPushButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "100");
        waitForObject(":_billed_XLineEdit");
        type(":_billed_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
        snooze(0.5);
        waitForObject(":advancedTab.Recurring_QGroupBox");
        mouseClick(":advancedTab.Recurring_QGroupBox", 13, 10, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Recurring._period_XComboBox_3");
        clickItem(":Recurring._period_XComboBox_3","Days",0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_max_XSpinBox_4").clear();
        var InRnum1 = "5";
        type(":_max_XSpinBox_4", InRnum1);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Header Information");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        test.log("Recurring Invoice created sucessfully with buffer set to 30days:"+Invnum);
        
    }
    catch(e)
    {
        test.fail("Error in creating recurring Invoice with buffer 30days:"+e);
    }
    //----Verify Child Recurring Invoices Created and dates of Child invoices-----
    try
    {
        var Cinvnum = ++Invnum;
        var u =new Array(5);
        u[1] = 1;
        u[2] = 2;
        u[3] = 3;
        u[4] = 4;
        u[5] = 5;
        for(var i=1;i<InRnum1;i++)
        {
            var Inday1 = addDate(u[i]);   
            snooze(0.5);
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+Cinvnum+"' type='QModelIndex'}")&&("{column='4' container=':_list_XTreeWidget_3' text='"+Inday1+"' type='QModelIndex'}"))
            {
                test.pass("Child Invoices created sucessfully with buffer set to 30days:");
                test.log("Recurring child invoices created:"+Cinvnum);
                
            }
            
            else
                test.fail("Error in creating child invoices with buffer set to 30days:");
            ++Cinvnum;
        }
    }
    catch(e)
    {
        test.fail("Error in Child recurring Invoices with buffer set to 30days:"+e);
    }
    //-----Delete the Invoices created------
    
    try
    {
        for(var i=0;i<InRnum1;i++)
        {          
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ Pinvnum+"' type='QModelIndex'}"))         
            {
                waitForObject(":_list_XTreeWidget_3");
                openItemContextMenu(":_list_XTreeWidget_3",Pinvnum,5, 5, Qt.LeftButton); 
                activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
                snooze(1);
                clickButton(":Delete Selected Invoices.Delete_QPushButton");
                test.log("Recurring Invoices deleted sucessfully with buffer set to 30days"+Pinvnum);
                ++Pinvnum;
            }
            else
                test.fail("Error in deleting recurring invoices with buffer set to 30days:");
        }
        var Invcount1 = Invwidget.topLevelItemCount;
        if(Invcount==Invcount1)
        {
            test.pass("All Recurring Invoices are deleted sucessfully:");
        }
        else
            test.fail("Error in deleting Recurring Invoices:");
    }
    catch(e)
    {
        test.fail("Error in deleting recurring Invoices:"+e);
    }
    
    //----Set Invoice buffer to 7 days------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Accounts Receivable");
        waitForObject(":_recurringBuffer_QSpinBox").clear();
        var invBuffr = "7";
        type(":_recurringBuffer_QSpinBox", invBuffr);
        waitForObject(":Setup.Apply_QPushButton");
        clickButton(":Setup.Apply_QPushButton");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Invoice buffer adjusted sucessfully to 7days:");
        
    }   
    catch(e)
    {
        test.fail("Error in adjusting Invoice buffer to 7days:"+e);
    }
    //----Create recurring Invoice for 10days-----
    try
    {
        
        var Invwidget = findObject(":_list_XTreeWidget_3");
        var Invcount = Invwidget.topLevelItemCount;
        
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        // Verification Point 'VP1'
        
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        var Invnum4 =findObject(":_invoiceNumber_XLineEdit").text;
        var Pinvnum4 = Invnum4;
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":lineItemsTab.New_QPushButton");
        clickButton(":lineItemsTab.New_QPushButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "100");
        waitForObject(":_billed_XLineEdit");
        type(":_billed_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
        waitForObject(":advancedTab.Recurring_QGroupBox");
        mouseClick(":advancedTab.Recurring_QGroupBox", 13, 10, 0, Qt.LeftButton);
        waitForObject(":Recurring._period_XComboBox_3");
        clickItem(":Recurring._period_XComboBox_3","Days",0, 0, 5, Qt.LeftButton);
        waitForObject(":_max_XSpinBox_4").clear();
        var InRnum4 = "10";
        type(":_max_XSpinBox_4", InRnum4);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Header Information");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        test.log("Recurring Invoice created sucessfully with buffer set to 7days:"+Invnum4);
        
    }
    catch(e)
    {
        test.fail("Error in creating recurring Invoice with buffer set to 7days:"+e);
    }
    
    //----Verify child recurring Invoices created for Invoice buffer set to 7days----------
    var C1invnum4 = ++Invnum4;
    var C2invnum4 = ++Invnum4;
    var C3invnum4 = ++Invnum4;
    test.log(C1invnum4);
    test.log(C2invnum4);
    var Chldinvnum4 = C1invnum4;
    try
    {
        var y =new Array(5);
        y[1] = 1;
        y[2] = 2;
        y[3] = 3;
        y[4] = 4;
        y[5] = 5;
        for(var i=0;i<invBuffr;i++)
        {
            var Inday4 = addDate(y[i]);  
            test.log(Inday4);
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+Chldinvnum4+"' type='QModelIndex'}")&&("{column='4' container=':_list_XTreeWidget_3' text='"+Inday4+"' type='QModelIndex'}"))
            {
                test.pass("Child Invoices"+Chldinvnum4+" created sucessfully with buffer set to 7days:");
                test.log("Recurring child invoices:"+Chldinvnum4);
                ++Chldinvnum4;
            }
            
            else
                test.fail("Error in creating child invoices with buffer set to 7days:");
        }
    }
    catch(e)
    {
        test.fail("Error in Child recurring Invoices with buffer set to 7days:"+e);
    }  
    
    //----Uncheck the recurring option in parent Recurring Invoice-----
    try
    {
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",Pinvnum4, 5, 5, Qt.LeftButton);  
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
        waitForObject(":advancedTab.Recurring_QGroupBox");
        mouseClick(":advancedTab.Recurring_QGroupBox", 13, 10, 0, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        //---Click No in the confirmation dialogue---
        waitForObject(":Sales Order.No_QPushButton_2");
        clickButton(":Sales Order.No_QPushButton_2");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        test.log("Recurring Option Unchecked sucessfully in parent Invoice:");
    }    
    catch(e)
    {
        test.fail("Error in unchecking recurring option  in parent Invoice:"+e);
    }
    
    
    //---verify 'NO' chlid recurring invoices get deleted---
    test.log(C1invnum4);
    try
    {
        for(var i=0;i<invBuffr;i++)
        {
            snooze(2);                      
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+C1invnum4+"' type='QModelIndex'}"))
            {
                test.pass("Child recurring invoice are not deleted by seleting 'NO' in the confirmation dialogue obtained by unchecking recurring option in parent Invoice:");
                
            }
            
            else
                test.fail("Error in unchecking recurring option in parent invoice:");
            ++C1invnum4;
        }
    }
    catch(e)
    {
        test.fail("Recurring child invoices deleted by seleting 'NO' in the confirmation dialogue:"+e);
    }  
    //-----Edit recurring information in parent Invoice -----
    try
    {
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",Pinvnum4, 5, 5, Qt.LeftButton);  
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced"); 
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
        waitForObject(":advancedTab.Recurring_QGroupBox");
        mouseClick(":advancedTab.Recurring_QGroupBox", 13, 10, 0, Qt.LeftButton);
        waitForObject(":Recurring._period_XComboBox_3");
        clickItem(":Recurring._period_XComboBox_3","Days",0, 0, 5, Qt.LeftButton);
        waitForObject(":_max_XSpinBox_4").clear();
        type(":_max_XSpinBox_4", InRnum4);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Header Information");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        test.pass("Sucessfully edited recurring information of Parent Invoice with Buffer set to 7days::"+Invnum4);
    }
    catch(e)
    {
        test.fail("Error in editing recurring information of Parent Invoice with Buffer set to 7days:"+e);
        
    }
    //-------------Uncheck recurring option in parent Invoice-----
    try
    {
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",Pinvnum4, 5, 5, Qt.LeftButton);  
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
        waitForObject(":advancedTab.Recurring_QGroupBox");
        mouseClick(":advancedTab.Recurring_QGroupBox", 13, 10, 0, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        //----Select YES in the confirmation dialogue----
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in editng Parent Invoice for unchecking recurring option:"+e);
    }
    //---Verify all child invoices get deleted----
    try
    {
        for(var i=0;i<invBuffr;i++)
        {
            
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+C2invnum4+"' type='QModelIndex'}"))
            {
                test.fail("Error in editing parent recurring invoice and child invoices aren't deleted:");
                test.log("Recurring child invoices:"+C2invnum4);
                ++C2invnum4;
            }
            
            else
                test.pass("Parent recurring Information edited sucessfully and all child invoice are deleted")
                    }
            }
                catch(e)
                {
                    test.fail("Error in deleting child recurring Invoice:"+e);
                }  
                //----Delete Parent Invoice-----
                try
                {
                    openItemContextMenu(":_list_XTreeWidget_3",Pinvnum4,5, 5, Qt.LeftButton); 
                    activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
                    snooze(0.5);
                    clickButton(":Delete Selected Invoices.Delete_QPushButton");
                    test.log("Child invoice Deleted:"+Pinvnum4);
                    test.log("Parent Recurring Invoices deleted sucessfully");
                    
                }
                catch(e)
                {
                    test.fail("Error in deleting Parent Invoice:"+e);
                }
                
                
                //-----Set Invoice Buffer to 30days-----
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
                    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
                    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
                    activateItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Accounts Receivable");
                    waitForObject(":_recurringBuffer_QSpinBox").clear();
                    type(":_recurringBuffer_QSpinBox", "30");
                    waitForObject(":Setup.Apply_QPushButton");
                    clickButton(":Setup.Apply_QPushButton");
                    waitForObject(":Cash Receipt.Save_QPushButton_3");
                    clickButton(":Cash Receipt.Save_QPushButton_3");
                    test.log("Invoice buffer adjusted sucessfully to 30days:");
                    
                }
                catch(e)
                {
                    test.fail("Error in adjusting Invoice buffer to 30days:"+e);
                }
                
                
                
                //----Create Recurring Invoice with Recurring Information set to Weeks---------
                
                //----Create Recurring Invoice----
                try
                {
                    
                    waitForObject(":Quotes.New_QToolButton");
                    clickButton(":Quotes.New_QToolButton");
                    // Verification Point 'VP1'
                    
                    waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
                    type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
                    nativeType("<Tab>");
                    var Invnum1 =findObject(":_invoiceNumber_XLineEdit").text;
                    var PInvnum1 = Invnum1;
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
                    waitForObject(":lineItemsTab.New_QPushButton");
                    clickButton(":lineItemsTab.New_QPushButton");
                    waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
                    type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
                    nativeType("<Tab>");
                    waitForObject(":_ordered_XLineEdit");
                    type(":_ordered_XLineEdit", "100");
                    waitForObject(":_billed_XLineEdit");
                    type(":_billed_XLineEdit", "100");
                    nativeType("<Tab>");
                    waitForObject(":Select Order for Billing.Save_QPushButton_2");
                    clickButton(":Select Order for Billing.Save_QPushButton_2");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    waitForObject(":advancedTab.Recurring_QGroupBox");
                    mouseClick(":advancedTab.Recurring_QGroupBox", 13, 10, 0, Qt.LeftButton);
                    waitForObject(":Recurring._period_XComboBox_3");
                    clickItem(":Recurring._period_XComboBox_3","Weeks",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_max_XSpinBox_4").clear();
                    var InRnum2 = "7";
                    type(":_max_XSpinBox_4", InRnum2);
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Header Information");
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    test.log("Recurring Invoice created sucessfully for WEEK days with buffer set to 30days: "+Invnum1);
                }
                catch(e)
                {
                    test.fail("Error in creating recurring Invoice for WEEK days for buffer set to 30days:"+e);
                }
                //----------Verify the Child recurring invoices Created-----
                try
                {
                    var Cinvnum1 = ++Invnum1;
                    var Weeknum = "5";
                    var v =new Array(5);
                    v[1] = 7;
                    v[2] = 14;
                    v[3] = 21;
                    v[4] = 28;
                    for(var i=1;i<Weeknum;i++)
                    {
                        
                        var Inday2 = addDate(v[i]);
                        if(findObject("{column='0' container=':_list_XTreeWidget_3' text='"+Cinvnum1+"' type='QModelIndex'}")&&("{column='4' container=':_list_XTreeWidget_3' text='"+Inday2+"' type='QModelIndex'}"))
                        {
                            test.pass("Child Invoices created sucessfully with recurring  information set to WEEKS :");
                            test.log("Recurring child invoices:"+Cinvnum1);
                            ++Cinvnum1;
                        }
                        else
                            test.fail("Error in creating child invoices with recurring information set to WEEKS :");
                    }
                }
                catch(e)
                {
                    test.fail("Error in creating child recurring Invoices with recurring information set to WEEKS: ");
                }
                //-----------Deleting Recurring invoices created-----
                try
                {
                    for(var i=0;i<Weeknum;i++)
                    {    
                        waitForObject(":_list_XTreeWidget_3");
                        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+PInvnum1+"' type='QModelIndex'}"))
                        {
                            openItemContextMenu(":_list_XTreeWidget_3",PInvnum1,5, 5, Qt.LeftButton); 
                            activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
                            snooze(0.5);
                            clickButton(":Delete Selected Invoices.Delete_QPushButton");
                            test.log("Child invoice Deleted with recurring  information set to WEEKS:"+PInvnum1);
                            ++PInvnum1;
                        }
                        else
                            test.fail("Error in deleting recurring invoices with recurring information set to WEEKS:");
                    }
                    var Invcount2 = Invwidget.topLevelItemCount;
                    if(Invcount==Invcount1)
                    {
                        test.pass("All Recurring Invoices  created with recurring information set to WEEKS deleted sucessfully:");
                    }
                    else
                        test.fail("Error in deleting Recurring Invoices with recurring information set to WEEKS:");
                }
                catch(e)
                {
                    test.fail("Error in deleting recurring Invoices  with recurring information set to WEEKS :"+e);
                }
                //-----Set Invoice Buffer to 50days-----
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
                    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
                    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
                    activateItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Accounts Receivable");
                    waitForObject(":_recurringBuffer_QSpinBox").clear();
                    type(":_recurringBuffer_QSpinBox", "50");
                    waitForObject(":Setup.Apply_QPushButton");
                    clickButton(":Setup.Apply_QPushButton");
                    waitForObject(":Cash Receipt.Save_QPushButton_3");
                    clickButton(":Cash Receipt.Save_QPushButton_3");
                    test.log("Invoice buffer adjusted sucessfully to 50days:");
                    
                }
                catch(e)
                {
                    test.fail("Error in adjusting Invoice buffer to 50days:"+e);
                }
                
                //----Create Recurring Invoice----
                try
                {
                    waitForObject(":Quotes.New_QToolButton");
                    clickButton(":Quotes.New_QToolButton");
                    
                    
                    waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
                    type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
                    nativeType("<Tab>");
                    var Invnum2 =findObject(":_invoiceNumber_XLineEdit").text;
                    PInvnum2 = Invnum2;
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
                    waitForObject(":lineItemsTab.New_QPushButton");
                    clickButton(":lineItemsTab.New_QPushButton");
                    waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
                    type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
                    nativeType("<Tab>");
                    waitForObject(":_ordered_XLineEdit");
                    type(":_ordered_XLineEdit", "100");
                    waitForObject(":_billed_XLineEdit");
                    type(":_billed_XLineEdit", "100");
                    nativeType("<Tab>");
                    waitForObject(":Select Order for Billing.Save_QPushButton_2");
                    clickButton(":Select Order for Billing.Save_QPushButton_2");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    waitForObject(":advancedTab.Recurring_QGroupBox");
                    mouseClick(":advancedTab.Recurring_QGroupBox", 13, 10, 0, Qt.LeftButton);
                    waitForObject(":Recurring._period_XComboBox_3");
                    clickItem(":Recurring._period_XComboBox_3","Months",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_max_XSpinBox_4").clear();
                    var InRnum3 = "30";
                    type(":_max_XSpinBox_4", InRnum3);
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Header Information");
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    test.pass("Recurring Invoice created sucessfully for recurring information set to Months :"+ PInvnum2);
                    
                }
                catch(e)
                {
                    test.fail("Error in creating recurring Invoice for recurring information set to Months:"+e);
                }
                //----Verify Child Recurring Invoices Created and dates of Child invoices-----
                try
                {
                    var  Cinvnum2 =ChldRnum= ++Invnum2;
                    var Mnths = "2";
                    for(var i=1;i<Mnths;i++)
                    {
                        
                        var w =new Array(5);
                        w[1] = 30;
                        var Inday3 = addDate(w[i]); 
                        test.log(Inday3);
                        waitForObject(":_list_XTreeWidget_3");
                        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+Cinvnum2+"' type='QModelIndex'}")&&("{column='4' container=':_list_XTreeWidget_3' text='"+Inday3+"' type='QModelIndex'}"))
                        {
                            test.pass("Child Invoices"+Cinvnum2+ " created sucessfully with recurring information set to Months :");              
                        }
                        
                        else
                            test.fail("Error in creating child invoices with recurring information set to Months:");
                        ++Cinvnum2;
                    }
                }
                catch(e)
                {
                    test.fail("Error in creating recurring Invoices  with recurring information set to Months:"+e);
                }
                //-----Delete the Invoices created------
                //-----Delete the Invoices created------
                try
                {
                    for(var i=1;i<Mnths;i++)
                    {    
                        
                        waitForObject(":_list_XTreeWidget_3");
                        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ ChldRnum+"' type='QModelIndex'}"))
                        {
                            openItemContextMenu(":_list_XTreeWidget_3",ChldRnum,5, 5, Qt.LeftButton); 
                            activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
                            snooze(0.5);
                            clickButton(":Delete Selected Invoices.Delete_QPushButton");
                            test.log("Recurring Invoices"+ChldRnum+" deleted sucessfully  with recurring information set to Months");             }
                        else
                            test.fail("Error in deleting recurring invoices with recurring information set to Months:");
                        ++ChldRnum;
                    }
                }
                catch(e)
                {
                    test.fail("Error in deleting recurring Invoices with recurring information set to Months:"+e);
                }
                
                //----Run Utility----
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
                    activateItem(":xTuple ERP: *_QMenuBar", "CRM");
                    waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    activateItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    waitForObjectItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    activateItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    snooze(0.5);
                    waitForObject(":Create Recurring Items.Invoices_XCheckBox");
                    if(!findObject(":Create Recurring Items.Invoices_XCheckBox").checked)
                    {
                        clickButton(":Create Recurring Items.Invoices_XCheckBox");
                    }
                    waitForObject(":Create Recurring Items.Create_QPushButton");
                    clickButton(":Create Recurring Items.Create_QPushButton");
                    snooze(0.5);
                    waitForObject(":Sales Order.OK_QPushButton_2");
                    clickButton(":Sales Order.OK_QPushButton_2");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    test.log("Recurring invoices created sucessfully by UtilityRun:");
                }
                catch(e)
                {
                    test.fail("Error in creating recurring invocies by  UtilityRun:"+e);
                }
                //-------------Verifying the recurring invoices after running the utility----
                
                try
                {
                    for(var i=1;i<Mnths;i++)
                    {
                        
                        Uinvnum = parseInt(PInvnum2)+parseInt(Mnths);
                        waitForObject(":_list_XTreeWidget_3");
                        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+Uinvnum+"' type='QModelIndex'}"))
                        {
                            test.pass("Child Invoices created sucessfully after running Utility:");
                            ++Uinvnum;
                        }
                        
                        else
                            test.fail("Error in creating child invoices after Utility Run:");
                    }
                    waitForObject(":Quotes.Close_QToolButton");
                    clickButton(":Quotes.Close_QToolButton");
                }
                catch(e)
                {
                    test.fail("Error in creating invoices after utility Run:"+e);
                }
                
                
                
                
                //---Incident Creation---------
                var RcNum ="5";
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
                    activateItem(":xTuple ERP: *_QMenuBar", "CRM");
                    waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Incident");
                    activateItem(":xTuple ERP:*.CRM_QMenu", "Incident");
                    waitForObjectItem(":xTuple ERP:*.Incident_QMenu", "List...");
                    activateItem(":xTuple ERP:*.Incident_QMenu", "List...");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    waitForObject(":Quotes.New_QToolButton");
                    clickButton(":Quotes.New_QToolButton");
                    waitForObject(":_category_XComboBox");
                    clickItem(":_category_XComboBox","Customer",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_description_QLineEdit");
                    type(":_description_QLineEdit", "New Incident Created For customer catageory");
                    waitForObject(":_crmacctGroup.VirtualClusterLineEdit_CRMAcctLineEdit");
                    type(":_crmacctGroup.VirtualClusterLineEdit_CRMAcctLineEdit", "admin");
                    waitForObject(":Contact.VirtualClusterLineEdit_ContactClusterLineEdit");
                    type(":Contact.VirtualClusterLineEdit_ContactClusterLineEdit", "Jake Sweet");
                    nativeType("<Tab>");
                    waitForObject(":_infoGroup._status_XComboBox");
                    clickItem(":_infoGroup._status_XComboBox","New",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_infoGroup._severity_XComboBox");
                    clickItem(":_infoGroup._severity_XComboBox","Normal",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_infoGroup._priority_XComboBox");
                    clickItem(":_infoGroup._priority_XComboBox","Normal",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_infoGroup._resolution_XComboBox");
                    clickItem(":_infoGroup._resolution_XComboBox","Fixed",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_notesTab._notes_XTextEdit_2");
                    type(":_notesTab._notes_XTextEdit_2", "New Incident Created");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Relationships");
                    waitForObject(":_relationshipsTab.Recurring_QGroupBox");
                    mouseClick(":_relationshipsTab.Recurring_QGroupBox", 44, 6, 0, Qt.LeftButton);
                    waitForObject(":Recurring._period_XComboBox");
                    clickItem(":Recurring._period_XComboBox","Days",0, 0, 5, Qt.LeftButton);
                    waitForObject(":Recurring.qt_spinbox_lineedit_QLineEdit").clear();
                    type(":Recurring.qt_spinbox_lineedit_QLineEdit",RcNum);
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    // Verification Point 'VP1'
                    snooze(1);
                    var PincidentNum = findObject(":_number_QLineEdit").text;
                    var incidentNum=PincidentNum;
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+PincidentNum+"' type='QModelIndex'}"))
                    {
                        test.pass("Incident created Sucessfully with Recurring information set to Days:");
                    }
                    else
                        test.fail("Failed to create Incident with Recurring information set to Days:");
                }
                catch(e)
                {
                    test.fail("Error in creating Incidents with Recurring information set to Days:"+e);
                }
                //--------------Verifying Child Incidents created------
                try
                {
                    
                    CincidentNum=++incidentNum;
                    test.log(CincidentNum);
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    var i;
                    for(i=0;i<parseInt(RcNum)-parseInt(1);i++)
                    {
                        snooze(0.5);
                        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ CincidentNum +"' type='QModelIndex'}"))
                        {    
                            test.pass("Recurring incidents"+CincidentNum+" creted Sucessfully with Recurring information set to Days:");
                            
                        }
                        else      
                            test.fail("Failed to create Recurring Incidents with Recurring information set to Days:");
                        ++CincidentNum;
                    }
                    
                    
                }
                catch(e)
                {
                    test.fail("Error Occured in creating Incident with Recurring information set to Days:"+ e);
                }
                //---Editing the Recurring Information in Parent Incident and click 'NO' in the Comfirmation dialogue-----
                try
                {
                    var CRcNum1 = "3",PincidentNum,RcNum;
                    var EincidentNum1=parseInt(PincidentNum)+parseInt(RcNum);
                    test.log(EincidentNum1);
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    waitForObject(":_list_XTreeWidget_3");
                    openItemContextMenu(":_list_XTreeWidget_3",PincidentNum, 5, 5, Qt.LeftButton); 
                    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Relationships");
                    waitForObject(":Recurring.qt_spinbox_lineedit_QLineEdit").clear();
                    type(":_max_XSpinBox",CRcNum1);
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    test.log("Parent incident recurring information edited sucessfully:");
                }
                catch(e)
                {
                    test.fail("Error in Editing Parent incident recurring information:"+e);
                }
                //--Click "NO" in the confirmation dialogue---
                
                try
                {
                    waitForObject(":Sales Order.No_QPushButton_2");
                    clickButton(":Sales Order.No_QPushButton_2");
                    var i;
                    for(i=0;i<(CRcNum1-parseInt(1));i++)
                    {
                        snooze(0.5);
                        if(!object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ EincidentNum1 +"' type='QModelIndex'}"))      {    
                            test.log(" Incident edited"+EincidentNum1);
                            test.pass("No Child recurring incidents are created on selecting 'NO' in the confirmation dialogue obtained by editing parent Incident:");
                            ++EincidentNum1;
                        }
                        else      
                            test.fail("New child incidents are created on selecting 'NO' in the confirmation dialogue obtained by editing parent Incident");
                    }
                }
                catch(e)
                {
                    test.fail("Error Occured in creating Child recurring Incidents:");
                }
                
                //-----Editing parent Recurring Incident and click 'Yes' in the-----------
                
                try
                {
                    var CRcNum2 = "4";
                    var EincidentNum2=parseInt(PincidentNum)+parseInt(RcNum);
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    waitForObject(":_list_XTreeWidget_3");
                    openItemContextMenu(":_list_XTreeWidget_3",PincidentNum, 5, 5, Qt.LeftButton); 
                    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Relationships");
                    waitForObject(":Recurring.qt_spinbox_lineedit_QLineEdit").clear();
                    type(":_max_XSpinBox",CRcNum2);
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    //------Click"YES" in the confirmation dialogue---
                    waitForObject(":Sales Order.Yes_QPushButton");
                    clickButton(":Sales Order.Yes_QPushButton");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                }
                catch(e)
                {
                    test.fail("Error in Editing Parent incident recurring Information:");
                }
                try
                {
                    var i;
                    for(i=0;i<(CRcNum2-parseInt(1));i++)
                    {
                        snooze(0.5);
                        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ EincidentNum2+"' type='QModelIndex'}"))
                        {    
                            
                            test.pass("Child recurring incidents"+EincidentNum2+" edited Sucessfully  on selecting 'YES' in the confirmation dialogue obtained by editing parent Incident:");
                            ++EincidentNum2;
                        }
                        else      
                            test.fail("Error in creating  child Recurring Incidents on selecting 'YES' in the confirmation dialogue obtained by editing parent Incident :");
                    }
                }
                catch(e)
                {
                    test.fail("Error occured in creating  Child recurring Incidents on selecting 'YES' in the confirmation dialogue obtained by editing parent Incident :");
                }
                
                
                //----UnCheck Recurring option in parent incident---------
                snooze(0.5);
                try
                {
                    var UCincidentNum=parseInt(PincidentNum)+parseInt(RcNum);
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    waitForObject(":_list_XTreeWidget_3");
                    openItemContextMenu(":_list_XTreeWidget_3",PincidentNum, 5, 5, Qt.LeftButton);  
                    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Relationships");
                    waitForObject(":_relationshipsTab.Recurring_QGroupBox");
                    mouseClick(":_relationshipsTab.Recurring_QGroupBox", 14, 7, 0, Qt.LeftButton);
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    waitForObject(":Sales Order.Yes_QPushButton");
                    clickButton(":Sales Order.Yes_QPushButton");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    //---Verifying the deletion of child incidents--------
                    var i;
                    for(i=0;i<parseInt(CRcNum2)-parseInt(1);i++)
                    {
                        snooze(0.5);
                        if(!object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+UCincidentNum +"' type='QModelIndex'}"))
                        {    
                            test.pass("Child recurring incidents "+UCincidentNum+" deleted sucessfully on unchecking recurrin option in Parent incident:");
                        }
                        else      
                            test.fail("Failed to delete recurring child incidents  on unchecking recurrin option in Parent incident:");
                        ++UCincidentNum;
                    }
                }
                catch(e)
                {
                    test.fail("Error occured while unchecking recurring option in Parent Incident:"+e);
                }
                //-----Run Recurring Utility-------
                //---------Enable recurring in parent incident---------
                try
                {
                    var RccNum = "3";
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    waitForObject(":_list_XTreeWidget_3");
                    openItemContextMenu(":_list_XTreeWidget_3",PincidentNum, 5, 5, Qt.LeftButton); 
                    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Relationships");
                    waitForObject(":_relationshipsTab.Recurring_QGroupBox");
                    mouseClick(":_relationshipsTab.Recurring_QGroupBox", 12, 8, 0, Qt.LeftButton);
                    waitForObject(":Recurring.qt_spinbox_lineedit_QLineEdit").clear();
                    type(":_max_XSpinBox", RccNum);
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    test.log("Recurring enabled sucessfully in parent incident:");
                }
                catch(e)
                {
                    test.fail("error encountered in enabiling recurring option in parent incident:"+e);
                }
                //-----------Close all child recurring Incidents-------------
                try
                {
                    UtlyincidentNum=parseInt(PincidentNum)+parseInt(RcNum)+parseInt(CRcNum2)-parseInt(1);
                    var i;
                    for(i=0;i<parseInt(RccNum)-parseInt(1);i++)
                    {
                        snooze(0.5);
                        waitForObject(":_list_XTreeWidget_3");
                        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ UtlyincidentNum +"' type='QModelIndex'}"))
                        {    
                            
                            openItemContextMenu(":_list_XTreeWidget_3",UtlyincidentNum, 5, 5, Qt.LeftButton);  
                            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                            activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                            snooze(0.5);
                            waitForObject(":_infoGroup._status_XComboBox");
                            clickItem(":_infoGroup._status_XComboBox","Closed",0, 0, 5, Qt.LeftButton);
                            snooze(0.5);
                            waitForObject(":Select Order for Billing.Save_QPushButton");
                            clickButton(":Select Order for Billing.Save_QPushButton");
                            waitForObject(":Quotes.Query_QToolButton");
                            clickButton(":Quotes.Query_QToolButton");
                            test.pass("Child recurring incidents"+UtlyincidentNum+" closed Sucessfully:");
                            
                        }
                        else      
                            test.fail("Failed to create Recurring Incidents:");
                        ++UtlyincidentNum;
                    }
                }
                catch(e)
                {
                    test.fail("Error occured in closing child incidents:"+e);
                }
                //---------------- Run Utility-------------
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
                    activateItem(":xTuple ERP: *_QMenuBar", "CRM");
                    waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    activateItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    waitForObjectItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    activateItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    snooze(0.5);
                    waitForObject(":Create Recurring Items.Incidents_XCheckBox");
                    if(!findObject(":Create Recurring Items.Incidents_XCheckBox").checked)
                    {
                        clickButton(":Create Recurring Items.Incidents_XCheckBox");
                    }
                    waitForObject(":Create Recurring Items.Create_QPushButton");
                    clickButton(":Create Recurring Items.Create_QPushButton");
                    snooze(0.5);
                    waitForObject(":Sales Order.OK_QPushButton_2");
                    clickButton(":Sales Order.OK_QPushButton_2");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                }
                catch(e)
                {
                    test.fail("Failed to run utility:"+e);
                }
                //-----Verify child incidents after running utility------            
                
                try
                {   snooze(1);
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    waitForObject(":_list_XTreeWidget_3");
                    UtlyincidentNum1=UtlyincidentNum;
                    test.log( UtlyincidentNum1);
                    var i;
                    for(i=0;i<(RccNum-1);i++)
                    {
                        snooze(0.5);
                        waitForObject(":_list_XTreeWidget_3");
                        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ UtlyincidentNum1 +"' type='QModelIndex'}"))
                        {
                            test.pass("Recurring incidents "+UtlyincidentNum1+"Created  sucessfully on Utility Run:");
                            UtlyincidentNum1++;
                            
                            
                        }
                        else 
                            test.fail("Failed to create Incident on Utility Run:");
                    }  
                    waitForObject(":Quotes.Close_QToolButton");
                    clickButton(":Quotes.Close_QToolButton");
                }
                catch(e)
                {
                    test.fail("Error in creating Incidents after Utility Run:");
                }
                
                //--------Account Payable Buffer Setup to 30days------//
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
                    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
                    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
                    activateItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Accounts Payable");
                    waitForObject(":_recurringVoucherBuffer_QSpinBox").clear();
                    type(":_recurringVoucherBuffer_QSpinBox", "30");
                    waitForObject(":Cash Receipt.Save_QPushButton_3");
                    clickButton(":Cash Receipt.Save_QPushButton_3");
                    test.pass("Voucher buffer set sucessfully to 30days:");
                }
                catch(e)
                {
                    test.fail("Error in entering  Voucher buffer status to 30days:"+e);
                }
                
                //---------Create  Misc Voucher------
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
                    waitForObject(":xTuple ERP:*.New Misc._QPushButton");
                    clickButton(":xTuple ERP:*.New Misc._QPushButton");
                    
                    waitForObject(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit");
                    type(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
                    var voucherNum1=findObject(":_voucherGroup._voucherNumber_XLineEdit").text
                                    P2voucherNum1 = voucherNum1;
                    
                    var NextVchrNum1 = ++voucherNum1;
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_6");
                    type(":_dateGroup.XDateEdit_XDateEdit_6", "0");
                    nativeType("<Tab>");
                    waitForObject(":_amountGroup.XLineEdit_XLineEdit");
                    type(":_amountGroup.XLineEdit_XLineEdit", "1200");
                    waitForObject(":_miscDistribTab.New_QPushButton");
                    clickButton(":_miscDistribTab.New_QPushButton");
                    waitForObject(":_groupButton.VirtualClusterLineEdit_GLClusterLineEdit");
                    type(":_groupButton.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1010-01");
                    waitForObject(":Select Order for Billing.Save_QPushButton_2");
                    clickButton(":Select Order for Billing.Save_QPushButton_2");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    waitForObject(":advancedTab.Recurring_QGroupBox");
                    mouseClick(":advancedTab.Recurring_QGroupBox", 14, 7, 0, Qt.LeftButton);
                    snooze(0.5);
                    waitForObject(":Recurring._period_XComboBox_3");
                    clickItem(":Recurring._period_XComboBox_3","Days",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_max_XSpinBox_4").clear();
                    var VochRnum1 = "4"
                                    type(":_max_XSpinBox_4", VochRnum1);
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    waitForObject(":Sales Order.Cancel_QPushButton");
                    clickButton(":Sales Order.Cancel_QPushButton");
                    test.log("Voucher created Sucessfully with recurring information:");
                }
                catch(e)
                {
                    test.fail("Error in creating Voucher with recurring information defined:"+e);
                }
                
                //-----------Verifying Child recurring vouchers and dates of the child vouchers created-------------//
                
                Rnum1 = "4";
                
                try
                {
                    waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                    var i;
                    for(i=0;i<parseInt(Rnum1);i++)
                    {     var a=new Array(3);
                        a[1] = 1;
                        a[2] = 2;
                        a[3] = 3;
                        var day1 = addDate(a[i]);
                        if(("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+NextVchrNum1+"' type='QModelIndex'}")&&("{column='5' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+day1+"' type='QModelIndex'}"))
                        {
                            ++NextVchrNum1;
                            test.pass("recurring child vouchers"+NextVchrNum1+" created sucessfully with recurring set to Weeks:");
                            
                        }
                        else
                            test.fail("Error in creating recurring vouchers with recurring set to Weeks:");
                    }
                }
                catch(e)
                {
                    test.fail("Error in creating Recurring vouchers with recurring set to Weeks:"+e);
                }
                //-------Delete the recurring Vouchers Created----
                snooze(1);
                waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                snooze(1);    
                for(var i=0;i<VochRnum1;i++)
                {
                    
                    waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                    if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+  P2voucherNum1+"' type='QModelIndex'}"))
                    {
                        
                        openItemContextMenu(":xTuple ERP:*._vohead_XTreeWidget", P2voucherNum1, 5, 5, Qt.LeftButton);
                        activateItem(":xTuple ERP:*._menu_QMenu", "Delete Voucher...");
                        snoze(0.5);
                        waitForObject(":Sales Order.Yes_QPushButton");
                        clickButton(":Sales Order.Yes_QPushButton");
                        test.log("voucher"+ P2voucherNum1+" with recurring set to Weeks is deleted :");
                        ++ P2voucherNum1;
                    }
                    else
                        test.fail("Error in deleting voucher with recurring set to Weeks:");
                    snooze(1);
                }
                
                //---------Create Voucher------
                try
                {  
                    waitForObject(":xTuple ERP:*.New Misc._QPushButton");
                    clickButton(":xTuple ERP:*.New Misc._QPushButton");
                    
                    waitForObject(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit");
                    type(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
                    var voucherNum1=findObject(":_voucherGroup._voucherNumber_XLineEdit").text
                                    P2voucherNum1 = voucherNum1;
                    
                    var NextVchrNum1 = ++voucherNum1;
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_6");
                    type(":_dateGroup.XDateEdit_XDateEdit_6", "0");
                    nativeType("<Tab>");
                    waitForObject(":_amountGroup.XLineEdit_XLineEdit");
                    type(":_amountGroup.XLineEdit_XLineEdit", "1200");
                    waitForObject(":_miscDistribTab.New_QPushButton");
                    clickButton(":_miscDistribTab.New_QPushButton");
                    waitForObject(":_groupButton.VirtualClusterLineEdit_GLClusterLineEdit");
                    type(":_groupButton.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1010-01");
                    waitForObject(":Select Order for Billing.Save_QPushButton_2");
                    clickButton(":Select Order for Billing.Save_QPushButton_2");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    waitForObject(":advancedTab.Recurring_QGroupBox");
                    mouseClick(":advancedTab.Recurring_QGroupBox", 14, 7, 0, Qt.LeftButton);
                    waitForObject(":Recurring._period_XComboBox_3");
                    clickItem(":Recurring._period_XComboBox_3","Weeks",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_max_XSpinBox_4").clear();
                    var VochRnum1 = "7"
                                    type(":_max_XSpinBox_4", VochRnum1);
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    waitForObject(":Sales Order.Cancel_QPushButton");
                    clickButton(":Sales Order.Cancel_QPushButton");
                    test.log("Voucher created Sucessfully with Buffer set to 30days:");
                }
                catch(e)
                {
                    test.fail("Error in creating Voucher with recurring information defined with Buffer set to 30days:"+e);
                }
                //-----------Verifying Child recurring vouchers and dates-------------//
                
                Rnum1 = "5";
                
                
                waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                var i;
                var b=new Array(3);
                b[1] = 7;
                b[2] = 14;
                b[3] = 21;
                b[4] = 28;
                snooze(1);
                for(i=1;i<parseInt(Rnum1);i++)
                {
                    
                    var day2 = addDate(b[i]);
                    
                    if(object.exists("{column='5' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+day2+"' type='QModelIndex'}")&&("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+NextVchrNum1+"' type='QModelIndex'}"))
                    {
                        test.pass("recurring child vouchers created sucessfully with Buffer set to 30days:");
                        
                    }
                    else
                        test.fail("Error in creating recurring vouchers with Buffer set to 30days:");
                }
                
                //-------Delete the recurring Vouchers Created----
                
                for(var i=0;i<VochRnum1;i++)
                {
                    
                    waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                    if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+P2voucherNum1+"' type='QModelIndex'}"))
                    {
                        
                        openItemContextMenu(":xTuple ERP:*._vohead_XTreeWidget",  P2voucherNum1, 5, 5, Qt.LeftButton);
                        activateItem(":xTuple ERP:*._menu_QMenu", "Delete Voucher...");
                        waitForObject(":Sales Order.Yes_QPushButton");
                        clickButton(":Sales Order.Yes_QPushButton");
                        test.log("recurring voucher deleted with Buffer set to 30days:"+ P2voucherNum1);
                        ++ P2voucherNum1;
                    }
                }
                //--------SetUp the Buffer Status to 50days------//
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
                    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
                    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
                    activateItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Accounts Payable");
                    waitForObject(":_recurringVoucherBuffer_QSpinBox").clear();
                    type(":_recurringVoucherBuffer_QSpinBox", "50");
                    waitForObject(":Cash Receipt.Save_QPushButton_3");
                    clickButton(":Cash Receipt.Save_QPushButton_3");
                    test.pass("Voucher buffer set sucessfully to 50days:");
                }
                catch(e)
                {
                    test.fail("Error in entering buffer status to 50days:"+e);
                }
                //---------Create Voucher------
                try
                {
                    waitForObject(":xTuple ERP:*.New Misc._QPushButton");
                    clickButton(":xTuple ERP:*.New Misc._QPushButton");
                    
                    waitForObject(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit");
                    type(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
                    var voucherNum2=findObject(":_voucherGroup._voucherNumber_XLineEdit").text
                                    var P3voucherNum2 =voucherNum2;
                    var NextVchrNum2 = ++voucherNum2;
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_6");
                    type(":_dateGroup.XDateEdit_XDateEdit_6", "0");
                    nativeType("<Tab>");
                    waitForObject(":_amountGroup.XLineEdit_XLineEdit");
                    type(":_amountGroup.XLineEdit_XLineEdit", "1200");
                    waitForObject(":_miscDistribTab.New_QPushButton");
                    clickButton(":_miscDistribTab.New_QPushButton");
                    waitForObject(":_groupButton.VirtualClusterLineEdit_GLClusterLineEdit");
                    type(":_groupButton.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1010-01");
                    waitForObject(":Select Order for Billing.Save_QPushButton_2");
                    clickButton(":Select Order for Billing.Save_QPushButton_2");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    waitForObject(":advancedTab.Recurring_QGroupBox");
                    mouseClick(":advancedTab.Recurring_QGroupBox", 14, 7, 0, Qt.LeftButton);
                    waitForObject(":Recurring._period_XComboBox_3");
                    clickItem(":Recurring._period_XComboBox_3","Months",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_max_XSpinBox_4").clear();
                    
                    type(":_max_XSpinBox_4", "30");
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    waitForObject(":Sales Order.Cancel_QPushButton");
                    clickButton(":Sales Order.Cancel_QPushButton");
                    test.log("Voucher created Sucessfully with buffer set to 50days:");
                }
                catch(e)
                {
                    test.fail("Error in creating Voucher with recurring information defined and with buffer set to 50days:"+e);
                }
                //-----------Verifying Child recurring vouchers-------------//
                
                
                
                Rnum2 = "2";
                try
                {
                    waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                    var i;
                    snooze(1);
                    for(i=1;i<parseInt(Rnum2);i++)
                    {
                        var c=new Array(1);
                        c[1] = 30;
                        var day3 = addDate(c[i]);
                        test.log(day3);
                        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                        if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+NextVchrNum2+"' type='QModelIndex'}")&&("{column='5' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+day3+"' type='QModelIndex'}"))
                        {
                            
                            test.pass("recurring child vouchers"+NextVchrNum2+ " created sucessfully with buffer set to 50days:");
                            
                            ++NextVchrNum2;
                        }
                        else
                            test.fail("Error in creating recurring vouchers with buffer set to 50days:");
                        snooze(1);
                    }
                }
                catch(e)
                {
                    test.fail("Error in creating Recurring vouchers with buffer set to 50days:"+e);
                }
                //-------Delete the recurring Vouchers Created----
                try
                {
                    snooze(1);
                    for(var i=0;i<parseInt(Rnum2);i++)
                    {
                        
                        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                        if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+P3voucherNum2+"' type='QModelIndex'}"))
                        {
                            
                            openItemContextMenu(":xTuple ERP:*._vohead_XTreeWidget",P3voucherNum2, 5, 5, Qt.LeftButton);
                            activateItem(":xTuple ERP:*._menu_QMenu", "Delete Voucher...");
                            snooze(0.5);
                            waitForObject(":Sales Order.Yes_QPushButton");
                            clickButton(":Sales Order.Yes_QPushButton");
                            test.log("Recurring voucher deleted with buffer set to 50days:"+P3voucherNum2);
                            ++P3voucherNum2;
                        }
                        snooze(1);
                    }
                }
                catch(e)
                {
                    test.fail("Error in deleting recurring Vouchers with buffer set to 50days:"+e);
                }
                
                //------------Create Voucher and edit the Parent Voucher----------
                try
                {
                    
                    waitForObject(":xTuple ERP:*.New Misc._QPushButton");
                    clickButton(":xTuple ERP:*.New Misc._QPushButton");
                    
                    
                    waitForObject(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit");
                    type(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
                    var PrntvchrNum=findObject(":_voucherGroup._voucherNumber_XLineEdit").text;
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_6");
                    type(":_dateGroup.XDateEdit_XDateEdit_6", "0");
                    nativeType("<Tab>");
                    waitForObject(":_amountGroup.XLineEdit_XLineEdit");
                    type(":_amountGroup.XLineEdit_XLineEdit", "1200");
                    waitForObject(":_miscDistribTab.New_QPushButton");
                    clickButton(":_miscDistribTab.New_QPushButton");
                    waitForObject(":_groupButton.VirtualClusterLineEdit_GLClusterLineEdit");
                    type(":_groupButton.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1010-01");
                    waitForObject(":Select Order for Billing.Save_QPushButton_2");
                    clickButton(":Select Order for Billing.Save_QPushButton_2");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    waitForObject(":advancedTab.Recurring_QGroupBox");
                    mouseClick(":advancedTab.Recurring_QGroupBox", 14, 7, 0, Qt.LeftButton);
                    waitForObject(":Recurring._period_XComboBox_3");
                    clickItem(":Recurring._period_XComboBox_3","Days",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_max_XSpinBox_4").clear();
                    var VochRnum3 = "5"
                                    type(":_max_XSpinBox_4", VochRnum3);
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    waitForObject(":Sales Order.Cancel_QPushButton");
                    clickButton(":Sales Order.Cancel_QPushButton");
                    test.log("Voucher created Sucessfully:");
                }
                catch(e)
                {
                    test.fail("Error in creating Voucher with recurring information defined:"+e);
                }
                //----------Edit Parent Voucher and select 'No' in the confirmation dialoge displayed----
                
                try
                {
                    waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                    openItemContextMenu(":xTuple ERP:*._vohead_XTreeWidget",PrntvchrNum, 5, 5, Qt.LeftButton);
                    activateItem(":xTuple ERP:*._menu_QMenu", "Edit Voucher...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    var R1num = "3"
                                waitForObject(":_max_XSpinBox_4").clear();
                    type(":_max_XSpinBox_4",  R1num );
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    //-----------Click No in the Confirmation dialoge------------
                    waitForObject(":Sales Order.No_QPushButton_2");
                    clickButton(":Sales Order.No_QPushButton_2");
                    //----Verify Child Recurring Vouchers----
                    snooze(1)
                            for(i=1;i<R1num;i++)
                    {
                        nNextnum = parseInt(PrntvchrNum)+parseInt(VochRnum3);
                        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                        if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+nNextnum +"' type='QModelIndex'}"))
                        {
                            test.fail("New Recurring vouchers Created:"); 
                            ++nNextnum;
                        }
                        else
                            test.pass("No new recurring voucher created:");
                        snooze(1);
                    }
                }
                catch(e)
                {
                    test.fail("Error in editing parent Voucher:"+e);
                    
                }
                
                
                //------Edit the parent recurring Voucher and click 'Yes' in the confirmation dialogue-------
                try
                {
                    waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                    openItemContextMenu(":xTuple ERP:*._vohead_XTreeWidget",PrntvchrNum, 5, 5, Qt.LeftButton);
                    activateItem(":xTuple ERP:*._menu_QMenu", "Edit Voucher...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    var R2num = "6"
                                waitForObject(":_max_XSpinBox_4").clear();
                    type(":_max_XSpinBox_4",  R2num );
                    
                    //---------Click Yes in the confirmation dialogue--------
                    waitForObject(":Select Order for Billing.Save_QPushButton");
                    clickButton(":Select Order for Billing.Save_QPushButton");
                    waitForObject(":Sales Order.Yes_QPushButton");
                    clickButton(":Sales Order.Yes_QPushButton");
                    snooze(1);
                    for(j=1;j<R2num;j++)
                    {
                        YNextnum = parseInt(PrntvchrNum)+parseInt(VochRnum3);
                        test.log(YNextnum);
                        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                        if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+YNextnum +"' type='QModelIndex'}"))
                        {
                            test.pass("New Recurring vouchers Created by selecting 'YES' in the confirmation dialogue obtained on editng parent Voucher recurring information:"); 
                            ++YNextnum;
                        }
                        else
                            test.fail("No new recurring voucher created on selecting 'YES' in the confirmation dialogue obtained on editng parent Voucher recurring information:");
                        snooze(0.5);
                    }
                    
                }
                catch(e)
                {
                    test.fail("Error in Editing parent Voucher selecting 'YES' in the confirmation dialogue obtained on editng parent Voucher recurring information:"+e);
                }
                //----Delete all the child recurring Vouchers Created----------
                try
                {
                    snooze(1);
                    for(var i=1;i<R2num;i++)
                    {
                        
                        C1vchrNum = CvchrNum = ++PrntvchrNum;
                        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                        if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+ CvchrNum+"' type='QModelIndex'}"))
                        {
                            
                            openItemContextMenu(":xTuple ERP:*._vohead_XTreeWidget", CvchrNum, 5, 5, Qt.LeftButton);
                            activateItem(":xTuple ERP:*._menu_QMenu", "Delete Voucher...");
                            waitForObject(":Sales Order.Yes_QPushButton");
                            clickButton(":Sales Order.Yes_QPushButton");
                            test.log("voucher deleted:"+ CvchrNum);
                            ++ CvchrNum;
                            test.pass("Child recurring vouchers deleted:");
                        }
                        
                        else
                            test.fail("Error in deleting child recurring vouchers:");
                    }
                    waitForObject(":Select Order for Billing.Close_QPushButton");
                    clickButton(":Select Order for Billing.Close_QPushButton");
                }
                catch(e)
                {
                    test.fail("Error in deleting child recurring vouchers:"+e);
                }
                //-----------Run Utility--------
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
                    activateItem(":xTuple ERP: *_QMenuBar", "CRM");
                    waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    activateItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    waitForObjectItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    activateItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    waitForObject(":Create Recurring Items.Vouchers_XCheckBox");
                    
                    snooze(0.5);
                    if(!findObject(":Create Recurring Items.Vouchers_XCheckBox").checked)
                    {
                        clickButton(":Create Recurring Items.Vouchers_XCheckBox");
                    } 
                    waitForObject(":Create Recurring Items.Create_QPushButton");
                    clickButton(":Create Recurring Items.Create_QPushButton");
                    waitForObject(":Sales Order.OK_QPushButton_2");
                    clickButton(":Sales Order.OK_QPushButton_2");
                    test.log("recurring vouchers created sucessfully on  running utility:");
                }
                catch(e)
                {
                    test.fail("Fail to create recurring voucher on  utility run: "+e);
                }
                //-----------Verify recurring vouchers created after running utility----------
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
                    snooze(1);
                    //  test.log(C1vchrNum);
                    for(var i=1;i<R2num;i++)
                    {
                        
                        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
                        if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+ C1vchrNum+"' type='QModelIndex'}"))
                        {
                            test.pass("recurring voucher created sucessfully on utility run:"+ C1vchrNum);
                            
                        }
                        else
                            test.fail("Error in creating recurring VOuchers after Utility Run:");
                        --C1vchrNum
                            }
                    waitForObject(":Select Order for Billing.Close_QPushButton");
                    clickButton(":Select Order for Billing.Close_QPushButton");
                }
                catch(e)
                {
                    test.fail("Error in deleting child recurring vouchers obtain on utility run:"+e);
                }
                //-----------Create Recurring ToDo----------
                var ToDoRnum1 = "4";
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
                    activateItem(":xTuple ERP: *_QMenuBar", "CRM");
                    waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "To-Do");
                    activateItem(":xTuple ERP:*.CRM_QMenu", "To-Do");
                    waitForObjectItem(":xTuple ERP:*.To-Do_QMenu", "List...");
                    activateItem(":xTuple ERP:*.To-Do_QMenu", "List...");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    waitForObject(":Show.To-Do List_XCheckBox");
                    snooze(0.5);
                    if(!findObject(":Show.To-Do List_XCheckBox").checked)
                    {
                        clickButton(":Show.To-Do List_XCheckBox");
                    }
                    var widget = findObject(":_list_XTreeWidget_3");
                    var count1 = widget.topLevelItemCount;
                    waitForObject(":Quotes.New_QToolButton");
                    clickButton(":Quotes.New_QToolButton");
                    waitForObject(":_name_QLineEdit_2");
                    type(":_name_QLineEdit_2", "ToDo List Item");
                    waitForObject(":To-Do List Item._description_QLineEdit");
                    type(":To-Do List Item._description_QLineEdit", "ToDo List Item");
                    waitForObject(":To-Do List Item._priority_XComboBox");
                    clickItem(":To-Do List Item._priority_XComboBox","Normal",0, 0, 5, Qt.LeftButton);
                    mouseClick(":To-Do List Item._priority_XComboBox", 34, 6, 0, Qt.LeftButton);
                    waitForObject(":_priority.Normal_QModelIndex_2");
                    mouseClick(":_priority.Normal_QModelIndex_2", 15, 5, 0, Qt.LeftButton);
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
                    type(":_dateGroup.XDateEdit_XDateEdit_3", "0");
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
                    type(":_dateGroup.XDateEdit_XDateEdit_4", "0");
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_5");
                    type(":_dateGroup.XDateEdit_XDateEdit_5", "0");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Status");
                    waitForObject(":_statusTab.Recurring_QGroupBox");
                    mouseClick(":_statusTab.Recurring_QGroupBox", 15, 8, 0, Qt.LeftButton);
                    waitForObject(":_max_XSpinBox_2").clear();
                    type(":_max_XSpinBox_2",ToDoRnum1);
                    waitForObject(":Cash Receipt.Save_QPushButton_3");
                    clickButton(":Cash Receipt.Save_QPushButton_3");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    test.log("Parent ToDo Created Sucessfully:");
                }
                catch(e)
                {
                    test.fail("Error in creating ToDo with recurring information:"+e);
                }
                //---------Verifying Child ToDo's------------
                try
                {
                    var count2 = widget.topLevelItemCount;
                    var NewWidgetCount1=parseInt(count1)+parseInt(ToDoRnum1);
                    if(parseInt(count2) == parseInt(NewWidgetCount1))
                    {
                        test.pass("Recurring ToDo's created sucessfully:");
                    }
                    else
                        test.fail("Failed to create recurring ToDo's:");
                    
                }
                catch(e)
                {
                    test.fail("Error occured in creating  child recurring ToDo:"+e);
                }
                //------Editing recurring Information in parent ToDo--------
                var ToDoRnum2 = "5";
                try
                {
                    
                    //----Click 'No' on Confirmatin dialogue----
                    waitForObject(":_list_XTreeWidget_3");
                    if(findObject("{column='6' container=':_list_XTreeWidget_3' text='InProcess' type='QModelIndex'}"))
                    {
                        doubleClick(":_list_XTreeWidget_3", 0, 0, 5, Qt.LeftButton);
                        waitForObject(":Recurring.qt_spinbox_lineedit_QLineEdit_2").clear();
                        type(":_max_XSpinBox_2", ToDoRnum2);
                        waitForObject(":Cash Receipt.Save_QPushButton_3");
                        clickButton(":Cash Receipt.Save_QPushButton_3");
                        waitForObject(":Sales Order.No_QPushButton_2");
                        clickButton(":Sales Order.No_QPushButton_2");
                        waitForObject(":Quotes.Query_QToolButton");
                        clickButton(":Quotes.Query_QToolButton");
                        
                        var count3 = widget.topLevelItemCount;
                        var NewWidgetCount2 = NewWidgetCount1;
                        if(parseInt(count3)==parseInt(NewWidgetCount2))
                        {
                            test.pass("No new Recurring ToDo's created  on selecting 'NO' in the confirmation dialgue obtained on editing parent TODO recurring information:");
                        }
                        else
                            test.fail("New Recurring ToDo's created on selecting 'NO' in the confirmation dialgue obtained on editing parent TODO recurring information:");
                    }
                }
                catch(e)
                {
                    test.fail("error Occured in editng Parent ToDo recurring Information:"+e);
                }
                //------Click 'Yes' in the confirmation dialogue-----
                var ToDoRnum3 = "6";
                try
                {
                    if(findObject("{column='6' container=':_list_XTreeWidget_3' text='InProcess' type='QModelIndex'}"))
                    {
                        doubleClick(":_list_XTreeWidget_3", 0, 0, 5, Qt.LeftButton);
                        waitForObject(":Recurring.qt_spinbox_lineedit_QLineEdit_2").clear();
                        var ToDoRnum2 = "7";
                        type(":_max_XSpinBox_2", ToDoRnum3);
                        waitForObject(":Cash Receipt.Save_QPushButton_3");
                        clickButton(":Cash Receipt.Save_QPushButton_3");
                        waitForObject(":Sales Order.Yes_QPushButton");
                        clickButton(":Sales Order.Yes_QPushButton");
                        waitForObject(":Quotes.Query_QToolButton");
                        clickButton(":Quotes.Query_QToolButton");
                        snooze(0.5);
                        var count4 = widget.topLevelItemCount;
                        var NewWidgetCount3 =parseInt(count1)+ parseInt(ToDoRnum3);
                        
                        
                        if(parseInt(count4)==parseInt(NewWidgetCount3))
                        {
                            test.pass("New recurring  ToDo's are created on selecting 'YES' in the confirmation dialgue obtained on editing parent TODO recurring information:");
                        }
                        else
                            test.fail("failed to create New recurring ToDo's on selecting 'YES' in the confirmation dialgue obtained on editing parent TODO recurring information:");
                    }
                }
                catch(e)
                {
                    test.fail("error occured in creating new ToDo on selecting 'YES' in the confirmation dialgue obtained on editing parent TODO recurring information:"+e);
                }
                //-------------Runnning Utility-----------
                //-------Deleting all Child ToDo's----
                
                for(var i=1;i<parseInt(ToDoRnum3);i++)
                {
                    waitForObject(":_list_XTreeWidget_3");
                    if(findObject("{column='6' container=':_list_XTreeWidget_3' text='New' type='QModelIndex'}"))
                    {
                        openItemContextMenu(":_list_XTreeWidget_3", "New",5, 5, Qt.LeftButton);
                        activateItem(":xTuple ERP:*._menu_QMenu", "Delete To-Do");
                        snooze(0.5);
                        waitForObject(":Sales Order.Yes_QPushButton");
                        clickButton(":Sales Order.Yes_QPushButton");
                        waitForObject(":Quotes.Query_QToolButton");
                        clickButton(":Quotes.Query_QToolButton");
                        test.log("Child ToD's deleted Sucessfully:");
                    }
                    else
                        test.fail("Error occured in deleting Child ToDo's:");
                }
                //-----Run Utility-------
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
                    activateItem(":xTuple ERP: *_QMenuBar", "CRM");
                    waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    activateItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    waitForObjectItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    activateItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    waitForObject(":Create Recurring Items.To-Do Items_XCheckBox");
                    if(!findObject(":Create Recurring Items.To-Do Items_XCheckBox").checked)
                    {
                        clickButton(":Create Recurring Items.To-Do Items_XCheckBox");
                    }
                    
                    waitForObject(":Create Recurring Items.Create_QPushButton");
                    clickButton(":Create Recurring Items.Create_QPushButton");
                    waitForObject(":Sales Order.OK_QPushButton_2");
                    clickButton(":Sales Order.OK_QPushButton_2");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    snooze(0.5);
                    var widget = findObject(":_list_XTreeWidget_3");
                    var count5 = widget.topLevelItemCount;
                    var NewWidgetCount4 =parseInt(count1)+ parseInt(ToDoRnum3);
                    if(parseInt(count5)==parseInt(NewWidgetCount4))
                    {
                        test.pass("Recurring  ToDo's  created on running Utility:");
                    }
                    else
                        test.fail("failed to create  recurring ToDo's on running Utility:");
                }
                catch(e)
                {
                    test.fail("Error occured in creating ToDo's on running utility:"+e);
                }
                //--------Deleting Parent and related child ToDo's--------
                try
                {	
                    waitForObject(":_list_XTreeWidget_3");
                    if(findObject("{column='6' container=':_list_XTreeWidget_3' text='InProcess' type='QModelIndex'}"))
                    {
                        openItemContextMenu(":_list_XTreeWidget_3", "InProcess",5, 5, Qt.LeftButton);
                        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete To-Do");
                        activateItem(":xTuple ERP:*._menu_QMenu", "Delete To-Do");
                        snooze(0.5);
                        waitForObject(":Delete Recurring Item?.Yes to All_QPushButton");
                        clickButton(":Delete Recurring Item?.Yes to All_QPushButton");
                        waitForObject(":Quotes.Query_QToolButton");
                        clickButton(":Quotes.Query_QToolButton");
                        snooze(0.5);
                        var widget = findObject(":_list_XTreeWidget_3");
                        var count1 = widget.topLevelItemCount;
                        var count5 = widget.topLevelItemCount;
                        if(parseInt(count1) == parseInt(count5))
                        {
                            test.pass("Parent and recurring child Todo's deleted sucessfully:");
                        }
                        else
                            test.fail("error occured in deleting parent and related child Todo's:");
                    }
                }
                catch(e)
                {
                    test.fail("failed to deleted parent ToDo and related Child ToDo's:"+e);
                }
                //-------Deleting only parent ToDo--------
                var ToDoRnum4 = "5";
                
                try
                {
                    waitForObject(":Quotes.New_QToolButton");
                    clickButton(":Quotes.New_QToolButton");
                    waitForObject(":_name_QLineEdit_2");
                    type(":_name_QLineEdit_2", "ToDo List Item");
                    waitForObject(":To-Do List Item._description_QLineEdit");
                    type(":To-Do List Item._description_QLineEdit", "ToDo List Item");
                    snooze(0.5);
                    waitForObject(":To-Do List Item._priority_XComboBox");
                    clickItem(":To-Do List Item._priority_XComboBox","Normal",0, 0, 5, Qt.LeftButton);
                    snooze(0.5);
                    mouseClick(":To-Do List Item._priority_XComboBox", 34, 6, 0, Qt.LeftButton);
                    waitForObject(":_priority.Normal_QModelIndex_2");
                    mouseClick(":_priority.Normal_QModelIndex_2", 15, 5, 0, Qt.LeftButton);
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
                    type(":_dateGroup.XDateEdit_XDateEdit_3", "0");
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
                    type(":_dateGroup.XDateEdit_XDateEdit_4", "0");
                    waitForObject(":_dateGroup.XDateEdit_XDateEdit_5");
                    type(":_dateGroup.XDateEdit_XDateEdit_5", "0");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Status");
                    waitForObject(":_statusTab.Recurring_QGroupBox");
                    mouseClick(":_statusTab.Recurring_QGroupBox", 15, 8, 0, Qt.LeftButton);
                    waitForObject(":_max_XSpinBox_2").clear();
                    type(":_max_XSpinBox_2",ToDoRnum4);
                    waitForObject(":Cash Receipt.Save_QPushButton_3");
                    clickButton(":Cash Receipt.Save_QPushButton_3");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    test.log("Parent To-Do Created Sucessfully:");
                    snooze(0.5);
                    waitForObject(":_list_XTreeWidget_3");
                    openItemContextMenu(":_list_XTreeWidget_3","InProcess", 5, 5, Qt.LeftButton);  
                    snooze(0.5);
                    activateItem(":xTuple ERP:*._menu_QMenu", "Delete To-Do");
                    snooze(1);
                    waitForObject(":Sales Order.Yes_QPushButton");
                    clickButton(":Sales Order.Yes_QPushButton");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    snooze(0.5);
                    waitForObject(":_list_XTreeWidget_3");
                    if(object.exists("{column='6' container=':_list_XTreeWidget_3' text='InProcess' type='QModelIndex'}"))
                    {
                        test.fail("Fail to delete only  Parent ToDo:");
                    }
                    else               
                        test.pass("Parent ToDo  deleted Sucessfully:");   
                    waitForObject(":Quotes.Close_QToolButton");
                    clickButton(":Quotes.Close_QToolButton");
                }
                catch(e)
                {
                    test.fail("Error Occured in deleting parent ToDo:"+e);
                }
                
                
                //----------Create Project---------
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
                    activateItem(":xTuple ERP: *_QMenuBar", "CRM");
                    waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Project");
                    activateItem(":xTuple ERP:*.CRM_QMenu", "Project");
                    waitForObjectItem(":xTuple ERP:*.Project_QMenu", "List...");
                    activateItem(":xTuple ERP:*.Project_QMenu", "List...");
                    snooze(1);
                    var widget = findObject(":_list_XTreeWidget_3");
                    var Prjcount = widget.topLevelItemCount;
                    waitForObject(":Quotes.New_QToolButton");
                    clickButton(":Quotes.New_QToolButton");
                    var name ="UGREENLEAF4";
                    waitForObject(":Project._number_XLineEdit");
                    type(":Project._number_XLineEdit",name);
                    waitForObject(":Project._name_XLineEdit");
                    type(":Project._name_XLineEdit",name);
                    waitForObject(":_infoGroup.VirtualClusterLineEdit_CRMAcctLineEdit");
                    type(":_infoGroup.VirtualClusterLineEdit_CRMAcctLineEdit", "TTOYS");
                    waitForObject(":_scheduleGroup.XDateEdit_XDateEdit");
                    type(":_scheduleGroup.XDateEdit_XDateEdit", "0");
                    waitForObject(":_scheduleGroup.XDateEdit_XDateEdit_2");
                    type(":_scheduleGroup.XDateEdit_XDateEdit_2", "0");
                    waitForObject(":_scheduleGroup.XDateEdit_XDateEdit_3");
                    type(":_scheduleGroup.XDateEdit_XDateEdit_3", "0");
                    waitForObject(":groupBox_2.VirtualClusterLineEdit_ContactClusterLineEdit");
                    type(":groupBox_2.VirtualClusterLineEdit_ContactClusterLineEdit", "Jake Sweet");
                    nativeType("<Tab>");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    nativeType("<Tab>");
                    snooze(1);
                    waitForObject(":_advancedTab.Recurring_QGroupBox");
                    mouseClick(":_advancedTab.Recurring_QGroupBox", 25, 7, 0, Qt.LeftButton);
                    snooze(1);
                    waitForObject(":Recurring._period_XComboBox_2");
                    clickItem(":Recurring._period_XComboBox_2","Days",0, 0, 5, Qt.LeftButton);
                    waitForObject(":_max_XSpinBox_3").clear();
                    var PRnum1 = "4";
                    type(":_max_XSpinBox_3", PRnum1);
                    waitForObject(":Cash Receipt.Save_QPushButton_3");
                    clickButton(":Cash Receipt.Save_QPushButton_3");
                    test.log("Project created sucessfully with recurring information:");
                }
                catch(e)
                {
                    test.fail("Error in creating Project with recurring information:"+e);
                }
                //---------Verifying child recurring projects------------
                
                var Prjcount1 = widget.topLevelItemCount;
                test.log(Prjcount1);
                try
                {
                    
                    var i,j;
                    for(i=(PRnum1-1),j=Prjcount1-1;i>=1&&j>=3;i--,j--)
                    {
                        var d=new Array(1);
                        var Pdate1 = addDate(i);
                        var chldP1=name+'-'+Pdate1;
                        var row,pname;
                        row = widget.topLevelItem(j);
                        pname = row.text(0);
                        if(pname == chldP1)
                            test.pass("Child recurring projects created sucessfully:");
                        else
                            test.fail("failed to create child recurring projects:");
                    }
                }
                catch(e)
                {
                    test.fail("Error in creating child recurring projects:"+e);
                }
                //-----------Edit the parent Recurring project---------
                try
                {
                    waitForObject(":_list_XTreeWidget_3");
                    openItemContextMenu(":_list_XTreeWidget_3",name,5, 5, Qt.LeftButton);   
                    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    waitForObject(":_max_XSpinBox_3").clear();
                    var ERum1= "5";
                    type(":_max_XSpinBox_3", ERum1);
                    waitForObject(":Cash Receipt.Save_QPushButton_3");
                    clickButton(":Cash Receipt.Save_QPushButton_3");
                    //----Clicke 'No' in the confirmatin dialogue-----
                    waitForObject(":Sales Order.No_QPushButton_2");
                    clickButton(":Sales Order.No_QPushButton_2");
                }
                catch(e)
                {
                    test.fail("Error in editing Parent Project recurring information:"+e);
                }
                //---Verify for new child recurring projects---
                
                try
                {
                    waitForObject(":_list_XTreeWidget_3");
                    var Prjcount2 = widget.topLevelItemCount;
                    test.log(Prjcount2);
                    if(parseInt(Prjcount2)==parseInt(Prjcount1))
                    {
                        test.pass("No new recurring projects created on selecting 'NO' in the confirmation dialgue obtained on editing parent Project recurring information:");
                    }
                    else
                        test.fail("New recurring projects created on selecting 'NO' in the confirmation dialgue obtained on editing parent Project recurring information:");
                }
                catch(e)
                {
                    test.fail("New recurring projects created on selecting 'NO' in the confirmation dialgue obtained on editing parent Project recurring information:"+e);
                }
                
                
                
                //----Edit parentProject recurring information----
                try
                {
                    waitForObject(":_list_XTreeWidget_3");
                    openItemContextMenu(":_list_XTreeWidget_3",name,5, 5, Qt.LeftButton);   
                    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
                    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Advanced");
                    waitForObject(":_max_XSpinBox_3").clear();
                    var  ERnum2 ="6";
                    type(":_max_XSpinBox_3",ERnum2);
                    waitForObject(":Cash Receipt.Save_QPushButton_3");
                    clickButton(":Cash Receipt.Save_QPushButton_3");
                    //----Click YES in the confirmation dialogue------
                    snooze(0.5);
                    waitForObject(":Sales Order.Yes_QPushButton");
                    clickButton(":Sales Order.Yes_QPushButton");
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    snooze(0.5);
                    var Prjcount3 = widget.topLevelItemCount;
                    test.log(Prjcount3);
                    var a=parseInt(Prjcount)+parseInt(ERnum2);
                    test.log(a);
                    if(Prjcount3==parseInt(a))
                    {
                        test.pass("New recurring projects created on editing parent project recurring information and selecting 'YES' in the confirmation dialogue:");
                    }
                    else
                        test.fail("No new recurring projects created on editing parent project recurring information and selecting 'YES' in the confirmation dialogue:");
                }
                catch(e)
                {
                    test.fail("NO new recurring projects created on editing parent project recurring information and selecting 'YES' in the confirmation dialogue:"+e);
                }
                
                //-----Run the Utility-----
                //----Delete all child recurring projects-----
                try
                {
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    var i,j;
                    snooze(0.5);
                    for(i=(ERnum2-1),j=Prjcount3-1;i>=1&&j>=3;i--,j--)
                    {
                        var d=new Array(1);
                        var Pdate1 = addDate(i);
                        var chldP1=name+'-'+Pdate1;
                        var row,pname;
                        row = widget.topLevelItem(j);
                        pname = row.text(0);
                        test.log(pname);
                        test.log(chldP1);
                        snooze(0.5);
                        if(pname == chldP1) 
                        {
                            snooze(1);
                            waitForObject(":_list_XTreeWidget_3");
                            openItemContextMenu(":_list_XTreeWidget_3", pname ,5, 5, Qt.LeftButton);  
                            snooze(0.5);
                            activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
                            test.log("Child recurring projects deleted:"+ pname);
                        }
                        else
                            test.fail("Error in deleting child recurring projects:");
                        snooze(1);
                    }
                }
                catch(e)
                {
                    test.fail("Error in deleting child  recurring Projects:"+e);
                    
                }
                snooze(3);
                //---Run the Utility----
                try
                {
                    waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
                    activateItem(":xTuple ERP: *_QMenuBar", "CRM");
                    waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    activateItem(":xTuple ERP:*.CRM_QMenu", "Utilities");
                    waitForObjectItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    activateItem(":xTuple ERP:*.Utilities_QMenu", "Create Recurring Items...");
                    waitForObject(":Create Recurring Items.Projects_XCheckBox");
                    if(!findObject(":Create Recurring Items.Projects_XCheckBox").checked)
                    {
                        clickButton(":Create Recurring Items.Projects_XCheckBox");
                    }
                    clickButton(":Create Recurring Items.Create_QPushButton"); 
                    snooze(0.1);
                    waitForObject(":Sales Order.OK_QPushButton_2");
                    clickButton(":Sales Order.OK_QPushButton_2");
                    snooze(1);
                    waitForObject(":Quotes.Query_QToolButton");
                    clickButton(":Quotes.Query_QToolButton");
                    //---Verifying for the recurring Projects---
                    waitForObject(":_list_XTreeWidget_3");
                    var Prjcount4 = widget.topLevelItemCount;
                    test.log(Prjcount3);
                    test.log(Prjcount4);
                    if(Prjcount4==Prjcount3)
                        test.pass("Child recurring projects created sucessfully with Utility Run:");
                    else
                        test.fail("Error in creating child recurring projects after Utility Run:"); 
                    waitForObject(":Quotes.Close_QToolButton");
                    clickButton(":Quotes.Close_QToolButton");    
                    
                }
                catch(e)
                {
                    test.fail("Error in creating Projects after utility run:"+e);
                }
                
                
            }
