
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

    //------ Configuring General tab --------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Configure.Credit Card_QModelIndex");
        mouseClick(":Configure.Credit Card_QModelIndex", 36, 5, 0, Qt.LeftButton);
        
        waitForObject(":_stack.Accept Credit Cards_QCheckBox");
        if(!findObject(":_stack.Accept Credit Cards_QCheckBox").checked)
            clickButton(":_stack.Accept Credit Cards_QCheckBox");
        waitForObject(":_stack.Work in Test Mode_QCheckBox");
        if(!findObject(":_stack.Work in Test Mode_QCheckBox").checked)
            clickButton(":_stack.Work in Test Mode_QCheckBox");
        waitForObject(":_stack._ccCompany_XComboBox");
        clickItem(":_stack._ccCompany_XComboBox", "YourPay", 0, 0, 1, Qt.LeftButton);
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
        
        waitForObject(":_generalPage._ccValidDays_QSpinBox").clear();
        type(":_generalPage._ccValidDays_QSpinBox", "10");
        waitForObject(":_amexBank_XComboBox");
        clickItem(":_amexBank_XComboBox", "EBANK-eBank Checking Account", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_discoverBank_XComboBox");
        clickItem(":_discoverBank_XComboBox", "EBANK-eBank Checking Account", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_mastercardBank_XComboBox");
        clickItem(":_mastercardBank_XComboBox", "EBANK-eBank Checking Account", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_visaBank_XComboBox");
        clickItem(":_visaBank_XComboBox", "EBANK-eBank Checking Account", 0, 0, 1, Qt.LeftButton);
        test.log("General tab configuration is successful as a part of Credit Card setup");
    }
    catch(e)
    {
        test.fail("Erro in configuring General tab of Credit Card setup"+e);
    }
    
    //------- Configuring Server tab -------
    try{
        var loginid = "157250";
        var pwd = "2openmfg2";
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Server");
        waitForObject(":_serverPage._ccServer_QLineEdit").clear();
        type(":_serverPage._ccServer_QLineEdit", "https://staging.linkpt.net");
        nativeType("<Tab>");
        waitForObject(":_serverPage._ccPort_QLineEdit").clear();
        type(":_serverPage._ccPort_QLineEdit", "1129");   
        waitForObject(":_serverPage._ccLogin_QLineEdit").clear();
        type(":_serverPage._ccLogin_QLineEdit", loginid);
        nativeType("<Tab>");
        waitForObject(":_serverPage._ccPassword_QLineEdit").clear();
        type(":_serverPage._ccPassword_QLineEdit",pwd);
        nativeType("<Tab>");
        
        test.log("Server tab configuration  is successful as a part of Credit Card setup");
    }
    catch(e)
    {
        test.fail("Erro in configuring Server tab as a part of Credit Card setup"+e);
    }
    snooze(1);
    //--------Configuring Service Option tab --------
    try{
        // var pemloc= "C:/pemfile/1001157250.pem";
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Service Options");
        waitForObject(":_ccWidgetStack._ccYPStoreNum_QLineEdit").clear();
        type(":_ccWidgetStack._ccYPStoreNum_QLineEdit","1001157250");
        waitForObject(":Digital Certificate (PEM File) Location:._ccYPWinPathPEM_QLineEdit").clear();
        type(":Digital Certificate (PEM File) Location:._ccYPWinPathPEM_QLineEdit","C:/pemfile/1001157250.pem");
        
         waitForObject(":Digital Certificate (PEM File) Location:._ccYPLinPathPEM_QLineEdit").clear();
          type(":Digital Certificate (PEM File) Location:._ccYPLinPathPEM_QLineEdit","/home/administrator/pemfile/1001157250.pem");
           waitForObject(":Digital Certificate (PEM File) Location:._ccYPMacPathPEM_QLineEdit").clear();
          type(":Digital Certificate (PEM File) Location:._ccYPMacPathPEM_QLineEdit","/Users/openmfg/pemfile/1001157250.pem");
        waitForObject(":In Test Mode, transactions should.Always Succeed If Possible_QRadioButton");
        clickButton(":In Test Mode, transactions should.Always Succeed If Possible_QRadioButton");
        nativeType("<Tab>");
        test.log("Service Options tab configuration  is successful as a part of Credit Card setup");
    }
    catch(e)
    {
        test.fail("Error in configuring the Service Options tab"+e);
    }
    snooze(1);
    //------------------ Configuring Key File tab ---------
    try{
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Key File");
        waitForObject(":_ccEncKeyName_QLineEdit").clear();
        type(":_ccEncKeyName_QLineEdit", "xTuple.key");
        waitForObject(":_keyPage_FileLineEdit").clear();
        type(":_keyPage_FileLineEdit", "c:/crypto");
        waitForObject(":_keyPage_FileLineEdit_2").clear();
        type(":_keyPage_FileLineEdit_2", "/home/administrator/crypto");
        waitForObject(":_keyPage_FileLineEdit_3").clear();
        type(":_keyPage_FileLineEdit_3", "/users/crypto");
        waitForObject(":_keyPage_FileLineEdit_2");
        mouseClick(":_keyPage_FileLineEdit_2", 140, 8, 0, Qt.LeftButton);   
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Key File tab configuration is successful as a part of Credit Card setup");
    }
    catch(e)
    {
        test.fail("Error in configuring Key File tab as a part of Credit Card setup"+e);
    }
    //----- Sales Orders Creation-----
    var sonumber1 = createSalesOrder("YTRUCK1", "100");
  
   //----- Finding the Credit Memo number created on charging the SO ---- 
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
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        var alccamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        var result = replaceSubsting(alccamt);
        test.log("alccamt = "+result+"");
        if(soamt == result)
            test.pass("Sales Order charged successfully using Credit Card and the charged amount is equal to SO amount ");
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
        test.log("Issued stock to the SO and shipped ");
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
        test.log("Invoice creation successful");
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
    //----------------------------Deletion of Charged Sales Order -----------------------  
    
    //----- Sales Orders Creation-----
    
    var sonumber2 = createSalesOrder("YTRUCK1", "100");
     //----- Finding the Credit Memo number created on charging the SO ---- 
    cmnum++;
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
        waitForObject(":_creditCardPage.Charge_QPushButton");
        clickButton(":_creditCardPage.Charge_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
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
            test.pass("Sales Order  charged successfully using Credit Card and the charged amount is equal to the SO amount");
        else
            test.fail("Allocated(Charged) amount is  not equal to SO amount");
    }
    catch(e)
    {
        test.fail("Error in Charging a Sales Order"+e);
    }
   
    
    //------- Deleting a Charged SO ------
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
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+sonumber2+"' type='QModelIndex'}"))
            test.fail("Sales Order not deleted successfully");
        else  
            test.pass("Sales Order is deleted successfully");
        snooze(1);  
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in deleting the SO"+e);
    }
    //----Verifying Credit Memo existance -------
    
    findCreditMemo(cmnum);
    //-------------Voding an Authorized Sales Order transaction --------
    
    //--------- Sales Orders Creation  -----
    
    var sonumber3 = createSalesOrder("YTRUCK1", "100");
    
    //-------------------Authorizing a Sales Order ----------------------------
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
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
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
            test.pass("Sales Order has charged successfully for the SO amount using Credit Card");
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
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Authorized Sales Order CC transaction is voided successfully");
        
    }
    catch(e)
    {
       test.fail("Error in voiding a sales order's CC transaction from A/R Workbench ");
    }
    
    //------------------ Voided Sales Order verification ----------------------------
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
        snooze(0.5);
        waitForObject(":qt_tabwidget_stackedwidget._creditCardPage_QWidget");
        if(object.exists("{container=':qt_tabwidget_stackedwidget._creditCardPage_QWidget' name='_authorize' text='Authorize' type='QPushButton' visible='1'}")&&("{container=':qt_tabwidget_stackedwidget._creditCardPage_QWidget' name='_charge' text='Charge' type='QPushButton' visible='1'}"))
            test.pass("SO is ready for Authorizing/Charging");
        else
        {
            test.fail("SO is not ready for Authorizing or Charging");
            
        }
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        snooze(1);
        
    }
    catch(e)
    {
        test.fail("Error in verifying the status of the SO"+e);
    }
    //--------------------- Charging an Authorized Sales Order from A/R Workbench screen -------
    
    //----- Sales Orders Creation-----
    var sonumber4 = createSalesOrder("YTRUCK1", "100");
    
    //-------------------Authorizing a Sales Order ----------------------------
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
        waitForObject(":_creditCardPage.Authorize_QPushButton");
        clickButton(":_creditCardPage.Authorize_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
         waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
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
            test.pass("Sales Order charged successfully using Credit Card and the charged amount is equal is to the SO amount ");
        else
            test.fail("Allocated(Charged) amount is  not equal to SO amount");
        
    }
    catch(e)
    {
        test.fail("Error in Charging a Sales Order"+e);
    }
    
    
    //----- Charging an Authorized Sales Order  -----
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
        if(object.exists("{column='5' container=':_frame._preauth_XTreeWidget' text='"+sonumber4+"' type='QModelIndex'}"))
            test.pass("Authorized sales order found in A/R Workbench");
        else 
            test.fail("Authorized sales order not found in A/R Workbench");
        clickItem(":_frame._preauth_XTreeWidget",sonumber4,0, 0, 5, Qt.LeftButton);
        waitForObject(":_frame.Post_QPushButton");
        clickButton(":_frame.Post_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Authorized Sales Order charged successfully");
        
    }
    catch(e)
    {
        test.fail("Error in Charging an authorized sales order"+e);
    }
    
    //----- Finding the Credit Memo number created on charging the SO ---- 
    cmnum ++;
    
    //---- Refunding the Credit Memo created on charging the SO -----
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
        
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", cmnum ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Refund");
        activateItem(":xTuple ERP:*._menu_QMenu", "Refund");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Credit Memo refund operation successful");
    }
    catch(e)
    {
        test.fail("Error in Refund Operation"+e);
    }
    
    
    //----Verifying Credit Memo existance -------
    findCreditMemo(cmnum);
    
    //--------------- Cash Receipt creation using fund type as Credit Card -------
    
    //----- QOH verification before Posting the Invoice -------
    
    var qtyytruck = queryQoh("YTRUCK1","WH1", appEdition);
    
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
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+invnum+"' type='QModelIndex'}"))
            test.pass("Invoice created for TTOYS");
        else  
            test.fail("Invoice not created for TTOYS");
        snooze(1);
        
        openItemContextMenu(":_list_XTreeWidget_3",invnum, 5, 5, Qt.LeftButton); 
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        snooze(0.5);
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");         
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Invoice posted successfully");
        var result=queryQoh("YTRUCK1","WH1", appEdition);
        if((qtyytruck-100 == result))
            test.pass("QOH of YTRUCK1 is updated correctly");
        else
            test.fail("QOH of YTRUCK1 is not updated correctly");
        snooze(0.5);
        
    }
    catch(e)
    {
        test.fail("Error in creating an invoice"+e);
    }
    
    //----- Cash Receipt ------
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
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        
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
        
        waitForObject(":Receivables Workbench.Close_QPushButton");
        clickButton(":Receivables Workbench.Close_QPushButton");
        test.log("Cash receipt posted successfully");
    }
    catch(e)
    {
        test.fail("Error in posting cash receipt" + e);
    }    
//--------------------- Sales Order creation for Foreign Customer -----------------
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
        
        sonumber5 = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
        
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
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+sonumber5+"' type='QModelIndex'}"))
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
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        var alccamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        test.log("alccamt = "+alccamt+"");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        if(soamt == alccamt)
            test.pass("Sales Order charged successfully using the Credit Card and the charged amount is equal to  SO amount ");
        else
            test.fail("Allocated(Charged) amount is  not equal to SO amount");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        var result = replaceSubsting(alccamt);
        test.log("alccamt = "+result+"");
        if(soamt == result)
            test.pass("Sales Order charged successfully using Credit Card and the charged amount is equal to SO amount ");
        else
            test.fail("Allocated(Charged) amount is  not equal to SO amount");
    }
    catch(e)
    {
        test.fail("Error in Charging a Sales Order"+e);
    }
    //----- Finding the Credit Memo number created on charging the SO ---- 
    cmnum++;
    
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
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber5);
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
        test.log("Issued stock and shipped the Sales Order");
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
        test.log("Invoice created successful");
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
        openItemContextMenu(":_list_XTreeWidget_3", sonumber5 ,5, 5, Qt.LeftButton);
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
            test.fail("Invoice not created for '0' amount"+e);
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error: Invoice is not created for '0' amount and the created invoice is  posted");
        if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(":Quotes.Close_QToolButton");
    }
    //----Verifying Credit Memo existance -------
    
    findCreditMemo(cmnum);  
}
