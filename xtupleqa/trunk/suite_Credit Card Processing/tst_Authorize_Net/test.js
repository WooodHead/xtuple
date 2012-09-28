                  
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
        if(object.exists(":Interface Options.Tabbed Windows_QRadioButton"))
        {
            if(!findObject(":Interface Options.Tabbed Windows_QRadioButton").checked)
                clickButton(":Interface Options.Tabbed Windows_QRadioButton");
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
  //-----Extracting OS Name-----
  

   try
  {	

      waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
      activateItem(":xTuple ERP: *_QMenuBar","System");
      waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
      activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
      waitForObjectItem(":Setup._tree_XTreeWidget", "Configure.Encryption");
      clickItem(":Setup._tree_XTreeWidget", "Configure.Encryption", 26, 6, 0, Qt.LeftButton);
      
      snooze(1);
      if(object.exists(":Sales Order.OK_QPushButton_2"))
      {
          clickButton(":Sales Order.OK_QPushButton_2");
      }
      snooze(1);
      waitForObject(":_ccEncKeyName_QLineEdit_2").clear();
      type(":_ccEncKeyName_QLineEdit_2", "xTuple.key");
      waitForObject(":_stack_FileLineEdit").clear();
      type(":_stack_FileLineEdit", "c:/crypto");
      waitForObject(":_stack_FileLineEdit_2").clear();
      type(":_stack_FileLineEdit_2", "/home/administrator/crypto");
      waitForObject(":_stack_FileLineEdit_3").clear();
      type(":_stack_FileLineEdit_3", "/users/crypto");
      
      waitForObject(":Setup.Save_QPushButton");
      clickButton(":Setup.Save_QPushButton");
  }
  catch(e)
  {
      test.fail("Error in setting the encryption configuration" + e);
  }

    //------ Configuring General tab --------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Configure.Credit Card_QModelIndex");
        mouseClick(":Configure.Credit Card_QModelIndex", 36, 5, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_stack.Accept Credit Cards_QCheckBox");
        if(!findObject(":_stack.Accept Credit Cards_QCheckBox").checked)
            clickButton(":_stack.Accept Credit Cards_QCheckBox");
        waitForObject(":_stack.Work in Test Mode_QCheckBox");
        if(!findObject(":_stack.Work in Test Mode_QCheckBox").checked)
            clickButton(":_stack.Work in Test Mode_QCheckBox");
              waitForObject(":_stack._ccCompany_XComboBox");
        mouseClick(":_stack._ccCompany_XComboBox", 179, 12, 0, Qt.LeftButton);
        waitForObject(":_ccCompany.Authorize.Net_QModelIndex");
        mouseClick(":_ccCompany.Authorize.Net_QModelIndex", 108, 9, 0, Qt.LeftButton);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "General");
        
        waitForObject(":Confirm Transaction.Pre-Authorization_QCheckBox");
        if(!findObject(":Confirm Transaction.Pre-Authorization_QCheckBox").checked)
            clickButton(":Confirm Transaction.Pre-Authorization_QCheckBox");
        
        waitForObject(":Confirm Transaction.Direct Charge_QCheckBox");
        if(!findObject(":Confirm Transaction.Direct Charge_QCheckBox").checked)
            clickButton(":Confirm Transaction.Direct Charge_QCheckBox"); 
        
        waitForObject(":Confirm Transaction.Charge Pre-Authorization_QCheckBox");
        if(!findObject(":Confirm Transaction.Charge Pre-Authorization_QCheckBox").checked)
            clickButton(":Confirm Transaction.Charge Pre-Authorization_QCheckBox"); 
        
        waitForObject(":Confirm Transaction.Credit_QCheckBox");
        if(!findObject(":Confirm Transaction.Credit_QCheckBox").checked)
            clickButton(":Confirm Transaction.Credit_QCheckBox"); 
        
        waitForObject(":Enable Transaction on Sales Order.Pre-Authorization_QCheckBox");
        if(!findObject(":Enable Transaction on Sales Order.Pre-Authorization_QCheckBox").checked)
            clickButton(":Enable Transaction on Sales Order.Pre-Authorization_QCheckBox"); 
        
        waitForObject(":Enable Transaction on Sales Order.Direct Charge_QCheckBox");
        if(!findObject(":Enable Transaction on Sales Order.Direct Charge_QCheckBox").checked)
            clickButton(":Enable Transaction on Sales Order.Direct Charge_QCheckBox"); 
        
        waitForObject(":General Options.Print Receipts_QCheckBox");
        if(findObject(":General Options.Print Receipts_QCheckBox").checked)
            clickButton(":General Options.Print Receipts_QCheckBox");     
         snooze(0.5);
        waitForObject(":_generalPage._ccValidDays_QSpinBox").clear();
        type(":_generalPage._ccValidDays_QSpinBox", "10");
         snooze(0.5);
        waitForObject(":_amexBank_XComboBox");
        clickItem(":_amexBank_XComboBox", "EBANK-eBank Checking Account", 0, 0, 1, Qt.LeftButton);
         snooze(0.5);
        waitForObject(":_discoverBank_XComboBox");
        clickItem(":_discoverBank_XComboBox", "EBANK-eBank Checking Account", 0, 0, 1, Qt.LeftButton);
         snooze(0.5);
        waitForObject(":_mastercardBank_XComboBox");
        clickItem(":_mastercardBank_XComboBox", "EBANK-eBank Checking Account", 0, 0, 1, Qt.LeftButton);
         snooze(0.5);
        waitForObject(":_visaBank_XComboBox");
        clickItem(":_visaBank_XComboBox", "EBANK-eBank Checking Account", 0, 0, 1, Qt.LeftButton);
        test.log("General tab cconfiguration is successfulas a part of Credit Card setup");
    }
    catch(e)
    {
        test.fail("Erro in configuring General tab of Credit Card setup"+e);
    }
    
    //------- Configuring Server tab -------
    try{
        var set = testData.dataset("account.tsv");
        var apiid,key;
        apiid=key="";
        for(var records in set)
        {
            apiid=testData.field(set[records],"LOGINID");
            key=testData.field(set[records],"TRANSKEY");
            
        }
        
        test.log(apiid);
        test.log(key);
        snooze(1);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Server");
        snooze(0.5);
        waitForObject(":_serverPage._ccServer_QLineEdit").clear();
        type(":_serverPage._ccServer_QLineEdit", "https://certification.authorize.net/gateway/transact.dll");
        nativeType("<Tab>");
        waitForObject(":_serverPage._ccPort_QLineEdit").clear();
        type(":_serverPage._ccPort_QLineEdit", "443");   
         snooze(0.5);
        waitForObject(":_serverPage._ccLogin_QLineEdit").clear();
        type(":_serverPage._ccLogin_QLineEdit", apiid);
        nativeType("<Tab>");
         snooze(0.5);
        waitForObject(":_serverPage._ccPassword_QLineEdit").clear();
        type(":_serverPage._ccPassword_QLineEdit",key);
        
        test.log("Server tab configuration is successful as a part of Credit Card setup");
    }
    catch(e)
    {
        test.fail("Erro in configuring Server tab as a part of Credit Card setup"+e);
    }
    //------------------ Configuring Key File tab ---------
    try{
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Key File");
         snooze(0.5);
        waitForObject(":_ccEncKeyName_QLineEdit").clear();
        type(":_ccEncKeyName_QLineEdit", "xTuple.key");
         snooze(0.5);
        waitForObject(":_keyPage_FileLineEdit").clear();
        type(":_keyPage_FileLineEdit", "c:/crypto");
         snooze(0.5);
        waitForObject(":_keyPage_FileLineEdit_2").clear();
        type(":_keyPage_FileLineEdit_2", "/home/administrator/crypto");
         snooze(0.5);
        waitForObject(":_keyPage_FileLineEdit_3").clear();
        type(":_keyPage_FileLineEdit_3", "/users/crypto");
        waitForObject(":_keyPage_FileLineEdit_2");
        mouseClick(":_keyPage_FileLineEdit_2", 140, 8, 0, Qt.LeftButton);   
         snooze(0.5);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Key File tab configuration is successful as a part of Credit Card setup");
    }
    catch(e)
    {
        test.fail("Error in configuring Key File tab as a part of Credit Card setup"+e);
    }
    
    //------Charging and Processing a Sales Order ----------------
    
    //----- Sales Orders Creation-----
    var sonumber1 = createSalesOrder("YTRUCK1", "100");
     //----- Finding the next Credit Memo number to be created on charging the SO ---- 
    var cmnum = creditMemoNum();
    //------ Charging a Sales Order ---------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", sonumber1 ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        var soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        test.log("Sales Order amount is "+soamt+"");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Payment");
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        if(object.exists("{column='1' container=':_creditCardPage._cc_XTreeWidget' text='Discover' type='QModelIndex'}"))
            test.pass("Credit Card list is available");
        else  
        {
            createCreditCard();
            
        }
        
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        clickItem(":_creditCardPage._cc_XTreeWidget","Discover",0, 0, 5, Qt.LeftButton);
        waitForObject(":_creditCardPage.Charge_QPushButton");
        clickButton(":_creditCardPage.Charge_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
          waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
         snooze(4);
          if(object.exists(":Sales Order.Yes_QPushButton"))
             clickButton(":Sales Order.Yes_QPushButton");
        nativeType("<Tab>");
        nativeType("<Return>");
        snooze(4);
        nativeType("<Return>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        snooze(0.5);
        var alccamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        var result = replaceSubsting(alccamt);
        test.log("alccamt = "+result+"");
        if(soamt == result)
            test.pass("Sales Order charged successfully using Credit Card and the amount is equal to the SO amount ");
        else
            test.fail("Allocated(Charged) amount is  not equal to SO amount");
    }
    catch(e)
    {
        test.fail("Error in Charging a Sales Order"+e);
    }
   
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
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber1);
        snooze(0.5);
      nativeType("<Tab>");
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        
        
        
        
        //-----Ship the Sales Order (with'Select for Billing' option checked)-----
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        
        if(findObject(":groupBox.Select for Billing_QCheckBox").unchecked)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
        
        if(findObject(":groupBox.Print Packing List_XCheckBox_3").checked)
            clickButton(":groupBox.Print Packing List_XCheckBox_3");
        
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Stock issued to the SO and shipped is done");
    }
    catch(e)
    {
        test.fail("Error in issuing stock and shipping the sales order" + e);
    }
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
        test.log("Invoice created successfully");
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
        type(":xTuple ERP: *.Billing_QMenu","<Right>");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", sonumber1 ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        if(object.exists(":Invoice Has Value 0.qt_msgbox_buttonbox_QDialogButtonBox"))
        {           
            waitForObject(":Sales Order.Yes_QPushButton");
            clickButton(":Sales Order.Yes_QPushButton");
            test.pass("Invoice posted for '0' amount");
        }
        else
            test.fail("Invoice not created for '0' amount"+e);
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in posting invoices" + e);
    }
    //----Verifying Credit Memo existance -------
   
    findCreditMemo(cmnum);
    //-----------Charging and Deleting a Sales Order -------------------
    
    //----- Sales Orders Creation-----
    var sonumber5 = createSalesOrder("YTRUCK1", "100");
    
    //------ Charging a Sales Order ---------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", sonumber5 ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        var soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        test.log("Sales Order amount is "+soamt+"");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Payment");
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        if(object.exists("{column='1' container=':_creditCardPage._cc_XTreeWidget' text='Discover' type='QModelIndex'}"))
            test.pass("Credit Card list is available");
        else  
        {
            createCreditCard();
            
        }
        
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        clickItem(":_creditCardPage._cc_XTreeWidget","Discover",0, 0, 5, Qt.LeftButton);
        waitForObject(":_creditCardPage.Charge_QPushButton");
        clickButton(":_creditCardPage.Charge_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
          waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
       snooze(4);
        if(object.exists(":Sales Order.Yes_QPushButton"))
             clickButton(":Sales Order.Yes_QPushButton");
        nativeType("<Tab>");
        nativeType("<Return>");
        snooze(4);
        nativeType("<Return>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        snooze(0.5);
        var alccamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        var result = replaceSubsting(alccamt);
        test.log("alccamt = "+result+"");
        if(soamt == result)
            test.pass("Sales Order charged successfully using Credit Card and the amount is equal to the SO amount ");
        else
            test.fail("Allocated(Charged) amount is  not equal to SO amount");
    }
    catch(e)
    {
        test.fail("Error in Charging a Sales Order"+e);
    }
    
    
    
    cmnum++
//    //----- Finding the Credit Memo number created on charging the SO ---- 
//    var cmnum = creditMemoNum();
//    
    //------- Deleting a Charged Sales Order -----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", sonumber5 ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        
         snooze(4);
         if((OS.name != "Windoews")&&(OS.name != "Linux"))
         {
         if(object.exists(":Sales Order.Yes_QPushButton"))
             clickButton(":Sales Order.Yes_QPushButton");
     }
         else
         {
        nativeType("<Tab>");
        nativeType("<Return>");
        snooze(4);
        nativeType("<Return>");
    }
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+sonumber5+"' type='QModelIndex'}"))
            test.fail("Sales Order not deleted successfully");
        else  
            test.pass("Sales Order is deleted successfully");
        snooze(1);  
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in deleting a Charged Sales Order"+e);
    }
    //----Verifying Credit Memo existance -------
    
    findCreditMemo(cmnum); 
    
    //----------- Authorizing and then Charging a  Sales Order --------
  //----- Sales Orders Creation-----
    var sonumber2 = createSalesOrder("YTRUCK1", "100");
    
    //-------------------Authorizing a Sales Order --------------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", sonumber2 ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        var soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        test.log("Sales Order amount is "+soamt+"");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Payment");
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        if(object.exists("{column='1' container=':_creditCardPage._cc_XTreeWidget' text='Discover' type='QModelIndex'}"))
            test.pass("Credit Card list is available");
        else  
        {
            createCreditCard();
            
        }
        
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        clickItem(":_creditCardPage._cc_XTreeWidget","Discover",0, 0, 5, Qt.LeftButton);
        waitForObject(":_creditCardPage.Authorize_QPushButton");
        clickButton(":_creditCardPage.Authorize_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
      snooze(4);
       if(object.exists(":Sales Order.Yes_QPushButton"))
             clickButton(":Sales Order.Yes_QPushButton");
        nativeType("<Tab>");
        nativeType("<Return>");
        snooze(4);
        nativeType("<Return>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        snooze(0.5);
        var authccpay = findObject(":_lineItemsPage.XLineEdit_XLineEdit_3").text;
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        result = replaceSubsting(authccpay);
      
        if(soamt == result)
            test.pass("Sales Order is authorized successfully using Credit Card and the amount is equal to the SO amount ");
        else
            test.fail("Allocated(Charged) amount is  not equal to SO amount");
        
    }
    catch(e)
    {
        test.fail("Error in Charging a Sales Order"+e);
    }
    
    //----- Charging an Authorized Sales Order from A/R Workbench screen -----
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        waitForObject(":_frame._select_XComboBox");
        clickItem(":_frame._select_XComboBox","Select",0, 0, 5, Qt.LeftButton);
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");  
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Credit Card");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        waitForObject(":_frame._preauth_XTreeWidget");
        if(object.exists("{column='5' container=':_frame._preauth_XTreeWidget' text='"+sonumber2+"' type='QModelIndex'}"))		    test.pass("Authorized sales order found in A/R Workbench");
        else 
            test.fail("Authorized sales order not found in A/R Workbench");
        
        clickItem(":_frame._preauth_XTreeWidget",sonumber2,0, 0, 5, Qt.LeftButton);
        waitForObject(":_frame.Post_QPushButton");
        clickButton(":_frame.Post_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        if(object.exists(":Credit Card Processing Error_QMessageBox"))
        {           
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");
            test.fail("Credit card error occured");
        }
   else{
            
        snooze(4);
         if(object.exists(":Sales Order.Yes_QPushButton"))
             clickButton(":Sales Order.Yes_QPushButton");
        nativeType("<Tab>");
        nativeType("<Return>");
         snooze(4);
         if(object.exists(":Credit Card Processing Error_QMessageBox"))
        {           
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
                 test.fail("Credit card  processing error occured");
        }
         
             waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");


}
    }
    catch(e)
    {
        test.fail("Error in Charging an authorized sales order"+e);
    }
   //--------------------------------- Authorizing and the Voiding a Sales Order -----------------------
    //----- Sales Orders Creation-----
    var sonumber3 = createSalesOrder("YTRUCK1", "100");
    
    //---------Authorizing a Sales Order ------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", sonumber3 ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        var soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        test.log("Sales Order amount is "+soamt+"");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Payment");
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        if(object.exists("{column='1' container=':_creditCardPage._cc_XTreeWidget' text='Discover' type='QModelIndex'}"))
            test.pass("Credit Card list is available");
        else  
        {
            createCreditCard();
            
        }
        
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        clickItem(":_creditCardPage._cc_XTreeWidget","Discover",0, 0, 5, Qt.LeftButton);
        waitForObject(":_creditCardPage.Authorize_QPushButton");
        clickButton(":_creditCardPage.Authorize_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
          waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        snooze(4);
          if(object.exists(":Sales Order.Yes_QPushButton"))
             clickButton(":Sales Order.Yes_QPushButton");
        nativeType("<Tab>");
        nativeType("<Return>");
        snooze(4);
        nativeType("<Return>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        snooze(0.5);
        authccpay = findObject(":_lineItemsPage.XLineEdit_XLineEdit_3").text;
        test.log("authccpay = "+authccpay+"");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        result = replaceSubsting(authccpay);
        if(soamt == result)
            test.pass("Sales Order is Authorized successfully using Credit Card and the amount is equal to the SO amount ");
        else
            test.fail("Allocated(Charged) amount is  not equal to SO amount");
    }
    catch(e)
    {
        test.fail("Error in Charging a Sales Order"+e);
    }
    //----- Voiding an Authorized Sales Order's CC transaction from A/R Workbench screen -----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        waitForObject(":_frame._select_XComboBox");
        clickItem(":_frame._select_XComboBox","Select",0, 0, 5, Qt.LeftButton);
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");  
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Credit Card");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        waitForObject(":_frame._preauth_XTreeWidget");
        if(object.exists("{column='5' container=':_frame._preauth_XTreeWidget' text='"+sonumber3+"' type='QModelIndex'}"))		    test.pass("Authorized sales order found in A/R Workbench");
        else 
            test.fail("Authorized sales order not found in A/R Workbench");
        
        clickItem(":_frame._preauth_XTreeWidget",sonumber3,0, 0, 5, Qt.LeftButton);
        waitForObject(":_frame.Void_QPushButton");
        clickButton(":_frame.Void_QPushButton");
        snooze(0.5);
        if(object.exists(":Credit Card Processing Error_QMessageBox"))
        {           
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");
            test.fail("Credit card error occured");
        }
   else{
            
        snooze(4);
          if(object.exists(":Sales Order.Yes_QPushButton"))
             clickButton(":Sales Order.Yes_QPushButton");
        nativeType("<Tab>");
        nativeType("<Return>");
         snooze(4);
         if(object.exists(":Credit Card Processing Error_QMessageBox"))
        {           
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
                 test.fail("Credit card processing error occured");
        }
         
             waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");


}
    }
    catch(e)
    {
        ("Error in voiding a sales order's CC transaction from A/R Workbench ");
    }
  
  //-------------------- Cash Receipt creation using Credit Card fund type ------------
  
    //----- QOH verification before Posting the Invoice -------
    
    var qtyytruck = queryQoh("YTRUCK1","WH1",appEdition);
    
    //----- Invoice creation -------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        // Verification Point 'VP3'
        var invnum = findObject(":_invoiceNumber_XLineEdit").text;
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":lineItemsTab.New_QPushButton");
        clickButton(":lineItemsTab.New_QPushButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        mouseClick(":_itemGroup.ItemLineEdit_ItemLineEdit", 25, 14, 0, Qt.LeftButton);
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":_ordered_XLineEdit");
        mouseClick(":_ordered_XLineEdit", 50, 10, 0, Qt.LeftButton);
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":_billed_XLineEdit");
        type(":_billed_XLineEdit", "100");
        nativeType("<Tab>");
        if(!findObject(":_qtyGroup.Update Inventory_QCheckBox").checked)
        {
            clickButton(":_qtyGroup.Update Inventory_QCheckBox");
            
        }
        
        waitForObject(":_taxtype_XComboBox");
        clickItem(":_taxtype_XComboBox","Taxable",0, 0, 5, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        snooze(0.5);
        var invamt = findObject(":Cash Receipt.XLineEdit_XLineEdit").text;
        test.log("Invoice amount is "+invamt+"");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        snooze(2);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+invnum+"' type='QModelIndex'}"))
            test.pass("Invoice created for TTOYS");
        else  
            test.fail("Invoice not created for TTOYS");
        snooze(1);
        
        openItemContextMenu(":_list_XTreeWidget_3",invnum, 5, 5, Qt.LeftButton); 
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");         
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        var result=queryQoh("YTRUCK1", "WH1", appEdition);
        if((qtyytruck-100 == result))
            test.pass("QOH of YTRUCK1 is updated correctly");
        else
            test.fail("QOH of YTRUCK1 is not updated correctly");
        snooze(0.5);
        test.log("Invoice posted successfully");
    }
    catch(e)
    {
        test.fail("Error in creating an invoice"+e);
    }

    //----- Cash Receipt creation ------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        waitForObject(":_frame._select_XComboBox");
        clickItem(":_frame._select_XComboBox","Select",0, 0, 5, Qt.LeftButton);
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");  
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Cash Receipts");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        mouseClick(":_amountGroup.XLineEdit_XLineEdit", 104, 13, 0, Qt.LeftButton);
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", invamt);
        nativeType("<Tab>");
        waitForObject(":_docGroup._fundsType_XComboBox");
        clickItem(":_docGroup._fundsType_XComboBox","Discover Card",0, 0, 5, Qt.LeftButton);
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        clickItem(":_applicationsTab._aropen_XTreeWidget_2",invnum,0, 0, 5, Qt.LeftButton);
        waitForObject(":_applicationsTab.Apply_QPushButton");
        clickButton(":_applicationsTab.Apply_QPushButton");
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        type(":Cash Receipt.XLineEdit_XLineEdit", invamt);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_2");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_2", "Credit Card");
        waitForObject(":_creditCardTab._cc_XTreeWidget");
        waitForObject(":_creditCardTab._cc_XTreeWidget");
        clickItem(":_creditCardTab._cc_XTreeWidget","Discover",0, 0, 5, Qt.LeftButton);
        waitForObject(":_creditCardTab._CCCVV_XLineEdit");
        type(":_creditCardTab._CCCVV_XLineEdit", "1437");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        snooze(4);
        if(object.exists(":Sales Order.Yes_QPushButton"))
             clickButton(":Sales Order.Yes_QPushButton");
        nativeType("<Tab>");
        nativeType("<Return>");
        snooze(4);
        nativeType("<Return>");
               test.log("Cash Receipt created for TTOYS")
            }
    catch(e)
    {
        test.fail("Error in creating a Cash Receipt"+e);
    }
    
    //-----Posting Cash Receipts-----
    try
    {
        waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
        clickItem(":_cashRecptTab._cashrcpt_XTreeWidget" ,"TTOYS", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_cashRecptTab.Post_QPushButton");
        clickButton(":_cashRecptTab.Post_QPushButton");
        snooze(1);
                       
        waitForObject(":Receivables Workbench.Close_QPushButton");
        clickButton(":Receivables Workbench.Close_QPushButton");
        test.log("Cash receipt posted successfully");
    }
    catch(e)
    {
        test.fail("Error in posting cash receipt" + e);
    }    
  
    //---------Charging and processing a foreign customer's Sales Order ------- 
    
    //------------- Sales Order creation for Foreign Customer -------
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
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "XTRM");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_headerPage._custPONumber_XLineEdit_2");
        type(":_headerPage._custPONumber_XLineEdit_2", "103");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        sonumber4 = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
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
        soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+sonumber4+"' type='QModelIndex'}"))
            test.pass("Sales Order creation successful");
        else  
            test.fail("Sales Order creation failed");            
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in creating a sales order" + e);
    }
    //------ Charging a Sales Order ---------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", sonumber4 ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        var soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        test.log("Sales Order amount is "+soamt+"");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Payment");
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        if(object.exists("{column='1' container=':_creditCardPage._cc_XTreeWidget' text='Discover' type='QModelIndex'}"))
            test.pass("Credit Card list is available");
        else  
        {
            createCreditCard();
            
        }
        
        waitForObject(":_creditCardPage._cc_XTreeWidget");
        clickItem(":_creditCardPage._cc_XTreeWidget","Discover",0, 0, 5, Qt.LeftButton);
        waitForObject(":_creditCardPage.Charge_QPushButton");
        clickButton(":_creditCardPage.Charge_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
          waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        snooze(4);
          if(object.exists(":Sales Order.Yes_QPushButton"))
             clickButton(":Sales Order.Yes_QPushButton");
        nativeType("<Tab>");
        nativeType("<Return>");
        snooze(4);
        if(object.exists(":Credit Card Processing Error.qt_msgbox_buttonbox_QDialogButtonBox"))
        {snooze(1);
             waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            test.log("Can't Process foreign customer sales order");
        }
        else
        {
            
         
            snooze(4);
            nativeType("<Return>");
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            snooze(1);
            var alccamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
            
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            var result = replaceSubsting(alccamt);
            test.log("alccamt = "+result+"");
            if(soamt == result)
                test.pass("Sales Order charged successfully using Credit Card and the amount is equal to the SO amount ");
            else
                test.fail("Allocated(Charged) amount is  not equal to SO amount");
            
            
            //----- Finding the Credit Memo number created on charging the SO ---- 
            cmnum++;
            
            //-----Issue Stock to Shipping-----
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            
            waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
            type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber4);
            snooze(0.5);
            waitForObject(":_frame.Issue All_QPushButton");
            clickButton(":_frame.Issue All_QPushButton");
                      
            
            //-----Ship the Sales Order (with'Select for Billing' option checked)-----
            waitForObject(":Issue to Shipping.Ship_QPushButton");
            clickButton(":Issue to Shipping.Ship_QPushButton");
            
            if(findObject(":groupBox.Select for Billing_QCheckBox").unchecked)
                clickButton(":groupBox.Select for Billing_QCheckBox");
            
            if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
                clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
            
            if(findObject(":groupBox.Print Packing List_XCheckBox_3").checked)
                clickButton(":groupBox.Print Packing List_XCheckBox_3");
            
            waitForObject(":Issue to Shipping.Ship_QPushButton_2");
            clickButton(":Issue to Shipping.Ship_QPushButton_2");
            
            waitForObject(":Issue to Shipping.Close_QPushButton");
            clickButton(":Issue to Shipping.Close_QPushButton");
            test.log("Stock isued to the SO and shipped it");
            //-----Creating Invoices-----
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
            test.log("Invoice created successfully");
            
            //-----Posting Invoices-----
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales");
            waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
            activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
            waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
            activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
            type(":xTuple ERP: *.Billing_QMenu","<Right>");
            waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
            activateItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
            
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3", sonumber4 ,5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
            snooze(0.5);
            if(object.exists(":Invoice Has Value 0.qt_msgbox_buttonbox_QDialogButtonBox"))
            {           
                waitForObject(":Sales Order.Yes_QPushButton");
                clickButton(":Sales Order.Yes_QPushButton");
                test.pass("Invoice posted for '0' amount");
            }
            else
                test.fail("Invoice not created for '0' amount");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            
            //----Verifying Credit Memo existance -------
            
            findCreditMemo(cmnum);   
            
        }
    }
    catch(e)
    {
        test.fail("Error in Charging a Sales Order"+e);
    }
}

