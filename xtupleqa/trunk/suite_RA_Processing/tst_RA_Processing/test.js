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
      
      var flag,memoNum,RANUM,credit1,credit2,credit3;
      
     var appEdition = findApplicationEdition();
     
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
          activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
          activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup..."));
          sendEvent("QMouseEvent", waitForObject(":Setup._tree_XTreeWidget"), QEvent.MouseButtonPress, 97, 67, Qt.LeftButton, 0);
         snooze(1);
          if(object.exists(":Sales Order.OK_QPushButton_2"))
          {
              clickButton(":Sales Order.OK_QPushButton_2");
          }
          snooze(1);
          waitForObject(":_ccEncKeyName_QLineEdit").clear();
          type(":_ccEncKeyName_QLineEdit", "xTuple.key");
          waitForObject(":_stack_FileLineEdit").clear();
          type(":_stack_FileLineEdit", "c:/crypto");
          waitForObject(":_stack_FileLineEdit_2").clear();
          type(":_stack_FileLineEdit_2", "/home/administrator/crypto");
          waitForObject(":_stack_FileLineEdit_3").clear();
          type(":_stack_FileLineEdit_3", "/users/crypto");
          
          waitForObject(":Cash Receipt.Save_QPushButton_3");
          clickButton(":Cash Receipt.Save_QPushButton_3");
      }
      catch(e)
      {
          test.fail("Error in setting the encryption configuration" + e);
      }

  //-------------- Enable Credit Cards setup------------
  try
  {
      waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
      activateItem(":xTuple ERP: *_QMenuBar", "System");
      waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
      activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
      waitForObject(":Configure.Credit Card_QModelIndex");
      mouseClick(":Configure.Credit Card_QModelIndex", 38, 5, 0, Qt.LeftButton);
      waitForObject(":_stack.Accept Credit Cards_QCheckBox");
      if(!findObject(":_stack.Accept Credit Cards_QCheckBox").checked)
          clickButton(":_stack.Accept Credit Cards_QCheckBox");
      waitForObject(":_stack.Work in Test Mode_QCheckBox");
      if(!findObject(":_stack.Work in Test Mode_QCheckBox").checked)
          clickButton(":_stack.Work in Test Mode_QCheckBox");
      waitForObject(":_stack._ccCompany_XComboBox");
      clickItem(":_stack._ccCompany_XComboBox", "External", 0, 0, 1, Qt.LeftButton);
      waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
      clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Fraud Detection");
      waitForObject(":Address Verification Service.Do not check_QRadioButton");
      clickButton(":Address Verification Service.Do not check_QRadioButton");
      
      waitForObject(":Cash Receipt.Save_QPushButton_3");
      clickButton(":Cash Receipt.Save_QPushButton_3");
  }
  catch(e)
  {
      test.fail("Exception in enabling credit card:"+e);
  }
//--------Verify Credit card ------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP: *.Customer_QMenu", "List...");
        activateItem(":xTuple ERP: *.Customer_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list.Tremendous Toys Incorporated_QModelIndex_4");
        doubleClick(":_list.Tremendous Toys Incorporated_QModelIndex_4", 8, 5, 0, Qt.LeftButton);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Settings");
        waitForObject(":_settingsTab.Credit Cards_QRadioButton");
        clickButton(":_settingsTab.Credit Cards_QRadioButton");
        if(object.exists(":_settingsStack._cc_XTreeWidget"))
        {
            test.pass("Credit cards enabled");
        }
        else
            test.fail("Credit cards not enabled");
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying credit cards");
    }
  //--------------- Create RA with Disposition - Credit, Credit By - Credit memo------
  
  credit1 = ["Credit","Immediately","Credit Memo","YTRUCK1","100","9.5"];
  
    flag = createRA(credit1);
    if(flag == 1)
    {
        test.log("RA created with Disposition - Credit, Credit By - Credit memo");
    }
    
    //------------Process payment----------
    
    memoNum = processPayment(RANUM);
    
    test.log("Payment processed successfully");
    
    //-----------------Post the credit memo-------
    
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
        waitForObject(":xTuple ERP:*._cmhead_XTreeWidget");
        snooze(1);
        clickItem(":xTuple ERP:*._cmhead_XTreeWidget",memoNum.toString(),10,10,0,Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        snooze(0.5);
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Credit memo posted for 'RA created with Disposition - Credit, Credit By - Credit memo'");
    }
    catch(e)
    {
        test.fail("Exception in posting the credit memo: " + e);
    }
    //----------Verify RA ---------
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //--------------- Create RA with Disposition - Credit, Credit By - Check -----
    
    credit2 = ["Credit","Immediately","Check","YTRUCK1","100","9.5"];
    
    flag = createRA(credit2);
    if(flag == 1)
    {
        test.log("RA created with Disposition - Credit, Credit By - Check"); 
    }
    
    //------------Process payment----------
    
    RANUM++;
    memoNum = processPayment(RANUM);
    test.log("Payment processed successfully");
    
    //------View and post the Check Run -----------
    try
    {	
        var obj_tree,count,i;
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        
        waitForObject(":_frame._check_XTreeWidget");
        obj_tree = findObject(":_frame._check_XTreeWidget");
        count = obj_tree.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            snooze(0.5);
            if(object.exists(":_check.Unspecified_QModelIndex"))
            {
                mouseClick(":_check.Unspecified_QModelIndex", 5, 5, 0, Qt.LeftButton);
                waitForObject(":_frame.Print_QPushButton");
                sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 43, 11, Qt.LeftButton, 0);
                waitForObjectItem(":_QMenu", "Selected Check...");
                activateItem(":_QMenu", "Selected Check...");
                waitForObject(":Print Check.Print_QPushButton");
                clickButton(":Print Check.Print_QPushButton");
                snooze(1);
                
                nativeType("<Return>");
                snooze(0.5);
                waitForObject(":Sales Order.Yes_QPushButton");
                clickButton(":Sales Order.Yes_QPushButton");
            }
        }
        
        waitForObject(":_frame.Post_QPushButton");
        sendEvent("QMouseEvent", ":_frame.Post_QPushButton", QEvent.MouseButtonPress, 57, 9, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "All Checks...");
        activateItem(":_QMenu", "All Checks...");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Check created and posted for 'RA with Disposition - Credit, Credit By - Check'");
    }
    catch(e)
    {
        test.fail("Exception in posting check" + e);
    }
    
    //----------Verify RA ---------
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //--------------- Create RA with Disposition - Credit, Credit By - Credit Card -----
    
    credit3 = ["Credit","Immediately","Credit Card","YTRUCK1","100","9.5"];
    
    flag = createRA(credit3);
    
    if(flag == 1)
    {
        test.log("RA created with Disposition - Credit, Credit By - Credit Card"); 
    }
    
    //------------Process payment----------
    
    RANUM++;
    memoNum = processPayment(RANUM);
    
    test.log("Payment processed successfully");
    
    //-----------------Verify credit memo created-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
        waitForObjectItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
        activateItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
        snooze(0.5)
        if(object.exists("{column='0' container=':xTuple ERP:*._aropen_XTreeWidget' text='"+ memoNum +"' type='QModelIndex'}"))	
        {
            test.pass("Credit memo posted for 'RA with Disposition - Credit, Credit By - Credit Card'");
        }
        else
            test.pass("Credit memo not created for 'RA with Disposition - Credit, Credit By - Credit Card'");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying credit card");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }   
    //----------Verify RA ---------
    flag = verifyRa(RANUM);
    
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    var Return1,Return2,Return3,Return4,Return5,Return6,Return7,Return8;
    
    //--------------- Create RA with Disposition - Return, Credit/Ship - Immediately, Credit By - None -----
    
    Return1 = ["Return","Immediately","None","YTRUCK1","100","9.5"];
    
    flag = createRA(Return1);
    
    if(flag == 1)
    {
        test.log("RA created with Disposition - Return, Credit/Ship - Immediately, Credit By - None"); 
    }
    RANUM++;
    //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly");
    
    //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    
    if(flag == 0)
        test.pass("RA" + RANUM +" is closed successfully");
    else
        test.fail("RA" + RANUM +" is not closed");
  
  
    //--------------- Create RA with Disposition - Return, Credit/Ship - Immediately, Credit By - Credit Memo-----
    
    Return2 = ["Return","Immediately","Credit Memo","YTRUCK1","100","9.5"];
    flag = createRA(Return2);
    if(flag == 1)
    {
        test.log("First RA created with Disposition - Return ,  Credit/Ship - Immediately, Credit By - Credit Memo"); 
    }
    flag = createRA(Return2);
    if(flag == 1)
    {
        test.log("Second RA created with Disposition - Return ,  Credit/Ship - Immediately, Credit By - Credit Memo"); 
    }
    
    //----------Main Flow: Create receipt and process payment---------------
    test.log("Main Flow: Create receipt and process payment");
    
    RANUM++;
    
    //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly");
    
    //------------------Process payment-----------------
    
    memoNum = processPayment(RANUM);
    
    test.log("Payment processed successfully");
    
    //-----------------Post the credit memo-------
    
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
        snooze(0.5);
        waitForObject(":xTuple ERP:*._cmhead_XTreeWidget");
        
        clickItem(":xTuple ERP:*._cmhead_XTreeWidget",memoNum.toString(),10,10,0,Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Credit memo posted for 'RA  Disposition - Return, Credit/Ship - Immediately, Credit By - Credit Memo'");
    }
    catch(e)
    {
        test.fail("Exception in posting the credit memo: " + e);
    }
    //----------Verify RA ---------
    flag = verifyRa(RANUM);
    
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //----------------------Alternate Flow: Process payment immediately and then post receipt--------
    test.log("Alternate Flow: Process payment immediately and then post receipt");
    RANUM++; 
    
    //------------------Process payment-----------------
    
    memoNum = processPayment(RANUM);
    
    test.log("Payment processed successfully");
    
    //-----------------Post the credit memo-------
    
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
        snooze(0.5);
        waitForObject(":xTuple ERP:*._cmhead_XTreeWidget");
        
        clickItem(":xTuple ERP:*._cmhead_XTreeWidget",memoNum.toString(),10,10,0,Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Credit memo posted for 'RA  Disposition - Return, Credit/Ship - Immediately, Credit By - Credit Memo'");
    }
    catch(e)
    {
        test.fail("Exception in posting the credit memo: " + e);
    }
    
    //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly");
    
    //----------Verify RA ---------
    flag = verifyRa(RANUM);
    
    if(flag == 0)
        test.fail("RA is closed successfully");
    else
        test.pass("RA is not closed");
    
    //--------------- Create RA with Disposition - Return, Credit/Ship - Immediately, Credit By - Check-----
    
    Return3 = ["Return","Immediately","Check","YTRUCK1","100","9.5"];
    
    flag = createRA(Return3);
    
    if(flag == 1)
    {
        test.log("RA created with Disposition - Return, Credit/Ship - Immediately, Credit By - Check"); 
    }
    
    RANUM++;
    
    //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly");
    
    //------------------Process payment-----------------
    
    memoNum = processPayment(RANUM);
    
    test.log("Payment processed successfully");
    
    //------View and post the Check Run -----------
    try
    {	
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        
        waitForObject(":_frame._check_XTreeWidget");
        obj_tree = findObject(":_frame._check_XTreeWidget");
        count = obj_tree.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            snooze(0.5);
            if(object.exists(":_check.Unspecified_QModelIndex"))
            {
                mouseClick(":_check.Unspecified_QModelIndex", 5, 5, 0, Qt.LeftButton);
                waitForObject(":_frame.Print_QPushButton");
                sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 43, 11, Qt.LeftButton, 0);
                waitForObjectItem(":_QMenu", "Selected Check...");
                activateItem(":_QMenu", "Selected Check...");
                waitForObject(":Print Check.Print_QPushButton");
                clickButton(":Print Check.Print_QPushButton");
                snooze(1);
                
                nativeType("<Return>");
                snooze(0.5);
                waitForObject(":Sales Order.Yes_QPushButton");
                clickButton(":Sales Order.Yes_QPushButton");
            }
        }
        
        waitForObject(":_frame.Post_QPushButton");
        sendEvent("QMouseEvent", ":_frame.Post_QPushButton", QEvent.MouseButtonPress, 57, 9, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "All Checks...");
        activateItem(":_QMenu", "All Checks...");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Check created and posted for RA with Disposition - Return, Credit/Ship - Immediately, Credit By - Check");
    }
    catch(e)
    {
        test.fail("Exception in posting check" + e);
    }
    
    //----------Verify RA ---------
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //--------------- Create RA with Disposition - Return, Credit/Ship - Immediately, Credit By - Credit Card-----
    
    Return4 = ["Return","Immediately","Credit Card","YTRUCK1","100","9.5"];
    
    flag = createRA(Return4);
    
    if(flag == 1)
    {
        test.log("RA created with Disposition - Return, Credit/Ship - Immediately, Credit By - Credit Card"); 
    }
    
    RANUM++;
    
    //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly");
    
    //------------------Process payment-----------------
    
    memoNum = processPayment(RANUM);
    
    test.log("Payment processed successfully");
    
    //-----------------Verify credit memo created-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
        waitForObjectItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
        activateItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
        if(object.exists("{column='0' container=':xTuple ERP:*._aropen_XTreeWidget' text='"+ memoNum +"' type='QModelIndex'}"))	
        {
            test.pass("Credit memo posted for 'RA with Disposition - Return, Credit/Ship - Immediately, Credit By - Credit Card'");
        }
        else
            test.pass("Credit memo not created for 'RA with Disposition - Return, Credit/Ship - Immediately, Credit By - Credit Card'");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying credit card");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    } 
    
    //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //--------------- Create RA with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - None -----
    
    Return5 = ["Return","Upon Receipt","None","YTRUCK1","100","9.5"];
    
    flag = createRA(Return5);
    
    if(flag == 1)
    {
        test.log("RA created with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - None"); 
    }
    RANUM++;
    //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly");
    
    //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    
    if(flag == 0)
        test.pass("RA" + RANUM +" is closed successfully");
    else
        test.fail("RA" + RANUM +" is not closed");
    
    //--------------- Create RA with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Credit Memo-----
    
    Return6 = ["Return","Upon Receipt","Credit Memo","YTRUCK1","100","9.5"];
    
    flag = createRA(Return6);
    
    if(flag == 1)
    {
        test.log("RA created with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Credit Memo"); 
    }
    
    RANUM++;
    
    //---------------- Verify RA availability for Payment ---------------
    flag = verifyPayment(RANUM);
    if(flag == 0)
    {
        test.pass("RA not available for Payment");
    }
    else
        test.fail("RA available for payment");
    
    //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly");
    
    //------------------Process payment-----------------
    
    memoNum = processPayment(RANUM);
    
    test.log("Payment processed successfully");
    
    //-----------------Post the credit memo-------
    
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
        waitForObject(":xTuple ERP:*._cmhead_XTreeWidget");
        
        clickItem(":xTuple ERP:*._cmhead_XTreeWidget",memoNum.toString(),10,10,0,Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Credit memo posted for 'RA  Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Credit Memo'");
    }
    catch(e)
    {
        test.fail("Exception in posting the credit memo: " + e);
    }
    //----------Verify RA ---------
    flag = verifyRa(RANUM);
    
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //--------------- Create RA with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Check-----
    
    Return7 = ["Return","Upon Receipt","Check","YTRUCK1","100","9.5"];
    
    flag = createRA(Return7);
    
    if(flag == 1)
    {
        test.log("RA created with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Check"); 
    }
    
    RANUM++;
    
    //---------------- Verify RA availability for Payment ---------------
    flag = verifyPayment(RANUM);
    if(flag == 0)
    {
        test.pass("RA not available for Payment");
    }
    else
        test.fail("RA available for payment");
    
    //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly"); 
    
    //------------------Process payment-----------------
    
    memoNum = processPayment(RANUM);
    
    test.log("Payment processed successfully");
    
    //------View and post the Check Run -----------
    try
    {	
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        
        waitForObject(":_frame._check_XTreeWidget");
        obj_tree = findObject(":_frame._check_XTreeWidget");
        count = obj_tree.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            snooze(0.5);
            if(object.exists(":_check.Unspecified_QModelIndex"))
            {
                mouseClick(":_check.Unspecified_QModelIndex", 5, 5, 0, Qt.LeftButton);
                waitForObject(":_frame.Print_QPushButton");
                sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 43, 11, Qt.LeftButton, 0);
                waitForObjectItem(":_QMenu", "Selected Check...");
                activateItem(":_QMenu", "Selected Check...");
                waitForObject(":Print Check.Print_QPushButton");
                clickButton(":Print Check.Print_QPushButton");
                snooze(1);
                
                nativeType("<Return>");
                snooze(0.5);
                waitForObject(":Sales Order.Yes_QPushButton");
                clickButton(":Sales Order.Yes_QPushButton");
            }
        }
        
        waitForObject(":_frame.Post_QPushButton");
        sendEvent("QMouseEvent", ":_frame.Post_QPushButton", QEvent.MouseButtonPress, 57, 9, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "All Checks...");
        activateItem(":_QMenu", "All Checks...");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Check created and posted for RA with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Check");
    }
    catch(e)
    {
        test.fail("Exception in posting check" + e);
    }
    
    //----------Verify RA ---------
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //--------------- Create RA with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Credit Card-----
    
    Return8 = ["Return","Upon Receipt","Credit Card","YTRUCK1","100","9.5"];
    
    flag = createRA(Return8);
    
    if(flag == 1)
    {
        test.log("RA created with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Credit Card"); 
    }
    
    RANUM++;
    
    //---------------- Verify RA availability for Payment ---------------
    flag = verifyPayment(RANUM);
    if(flag == 0)
    {
        test.pass("RA not available for Payment");
    }
    else
        test.fail("RA available for payment");
    
    //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly"); 
    
    //------------------Process payment-----------------
    
    memoNum = processPayment(RANUM);
    
    test.log("Payment processed successfully");
    
    
    //-----------------Verify credit memo created-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
        waitForObjectItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
        activateItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
        snooze(0.5);
        if(object.exists("{column='0' container=':xTuple ERP:*._aropen_XTreeWidget' text='"+ memoNum +"' type='QModelIndex'}"))	
        {
            test.pass("Credit memo posted for 'RA with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Credit Card'");
        }
        else
            test.fail("Credit memo not created for 'RA with Disposition - Return, Credit/Ship - Upon Receipt, Credit By - Credit Card'");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying credit card");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    } 
    
    //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
  
  var Replace1,Replace2,Replace3,SONUM;
    
  //---------------Find Next Sales Order Number--------
  try
  {
      waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
      activateItem(":xTuple ERP: *_QMenuBar", "Sales");
      waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup...");
      activateItem(":xTuple ERP: *.Sales_QMenu", "Setup...");
      waitForObject(":_stack._orderNumGeneration_NumberGenComboBox");
      clickItem(":_stack._orderNumGeneration_NumberGenComboBox","Automatic", 10,10,0,Qt.LeftButton);
      
      waitForObject(":_stack._nextSoNumber_XLineEdit");
      SONUM = findObject(":_stack._nextSoNumber_XLineEdit").text;
      
      waitForObject(":Cash Receipt.Save_QPushButton_3");
      clickButton(":Cash Receipt.Save_QPushButton_3");
  }
  catch(e)
  {
      test.fail("Exception in finding next sales order number");
      if(object.exists(":Cash Receipt.Save_QPushButton_3"))
          clickButton(":Cash Receipt.Save_QPushButton_3");
  }

  
    //--------------- Create RA with Disposition - Replace, Credit/Ship - Immediately, Credit By - None----
    
    Replace1 = ["Replace","Immediately","None","YTRUCK1","100","9.5"];
    
    flag = createRA(Replace1);
    
    if(flag == 1)
    {
        test.log("First RA created with Disposition - Replace, Credit/Ship - Immediately, Credit By - None"); 
    }
    
    Replace2 = ["Replace","Immediately","None","YTRUCK1","100","9.5"];
    
    flag = createRA(Replace2);
    
    if(flag == 1)
    {
        test.log("Second RA created with Disposition - Replace, Credit/Ship - Immediately, Credit By - None"); 
    }
    
    RANUM++;
    
// ********************Alternate Flow: Shipping the Replace items first and then receiving the Return items **********
    
    test.log("Alternate Flow: Shipping the Replace items first and then receiving the Return items");
    
    //---------Verify Sales order generation---------------

    flag = verifySO(RANUM,SONUM);
    if(flag == 1)
        test.pass("Sales order created successfully");
    else
       test.fail("Sales order not created");
  
    //--------------------- Ship the order ----------------
    
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) - 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully after shipping");
    else
        test.fail("QOH updated incorrectly after shipping"); 
    
    
    //----------------Create and post receipt--------
    
    qohBefore = qohAfter;
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly"); 
    
    //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    // ********************Main Flow: Receiving the items first and then shipping the items ********** 
    test.log("Main Flow: Receiving the Return items first and then shipping the Replace items");
    RANUM++;
    SONUM++;
    //---------Verify Sales order generation---------------
 
      flag = verifySO(RANUM,SONUM);
    if(flag == 1)
        test.pass("Sales order created successfully");
    else
       test.fail("Sales order not created");
    
      //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly"); 
    
      //--------------------- Ship the order ----------------
    
    
    qohBefore = qohAfter;
    
    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) - 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully after shipping");
    else
        test.fail("QOH updated incorrectly after shipping"); 
    
      //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //--------------- Create RA with Disposition - Replace, Credit/Ship - Upon Receipt, Credit By - None----
    
    Replace1 = ["Replace","Upon Receipt","None","YTRUCK1","100","9.5"];
    
    flag = createRA(Replace1);
    
    if(flag == 1)
    {
        test.log(" RA created with Disposition - Replace, Credit/Ship - Upon Receipt, Credit By - None"); 
    }
    RANUM++;
    SONUM++;
    
   //---------Verify Sales order generation---------------

    flag = verifySO(RANUM,SONUM);
    if(flag == 0)
        test.pass("Sales order not created");
    else
       test.fail("Sales order created");
    
      //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully");
    else
        test.fail("QOH updated incorrectly"); 
    
      //---------Verify Sales order generation---------------
 
      flag = verifySO(RANUM,SONUM);
    if(flag == 1)
        test.pass("Sales order created successfully");
    else
       test.fail("Sales order not created");
    

      //--------------------- Ship the order ----------------
    
    if(flag == 1)
    {
        qohBefore = qohAfter;
        
        issueStock(SONUM);
        
        test.log("Ship order operation performed successfully");
        
        //------ Do Nothing------
         try
      {
          waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
          activateItem(":xTuple ERP: *_QMenuBar", "Sales");
          waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup...");
          activateItem(":xTuple ERP: *.Sales_QMenu", "Setup...");
          
//          waitForObject(":_stack._returnAuthorizationNumGeneration_NumberGenComboBox");
//          clickItem(":_stack._returnAuthorizationNumGeneration_NumberGenComboBox", "Automatic, Use R/A #'s", 0, 0, 5, Qt.LeftButton);
//          waitForObject(":_stack._nextRaNumber_XLineEdit");
//          RANUM = findObject(":_stack._nextRaNumber_XLineEdit").text;
          
          
          waitForObject(":Setup.Apply_QPushButton");
          clickButton(":Setup.Apply_QPushButton");
          waitForObject(":Cash Receipt.Save_QPushButton_3");
          clickButton(":Cash Receipt.Save_QPushButton_3");
      }
      catch(e)
      {
          test.fail("Exception in configuring sales setup" + e);
     }
        qohAfter = queryQoh("YTRUCK1","WH1");
        
        if(parseInt(qohBefore) - 100 == parseInt(qohAfter))
            test.pass("QOH updated successfully after shipping");
        else
            test.fail("QOH updated incorrectly after shipping"); 
        //----------Verify RA ---------
        
        flag = verifyRa(RANUM);
        
        if(flag == 0)
            test.pass("RA is closed successfully");
        else
        test.fail("RA is not closed");
    }
    
    var Service1,Service2,Service3,WONUM;
    
      //--------------- Create RA with Disposition - Service, Credit/Ship - Immediately, Credit By - None----
    
    Service1 = ["Service","Immediately","None","REPAIRT1","100",""];
    
    flag = createRA(Service1);
    
    if(flag == 1)
    {
        test.log("First RA created with Disposition - Service, Credit/Ship - Immediately, Credit By - None"); 
    }
  
    Service2 = ["Service","Immediately","None","REPAIRT1","100",""];
    
    flag = createRA(Service2);
    
    if(flag == 1)
    {
        test.log("Second RA created with Disposition - Service, Credit/Ship - Immediately, Credit By - None"); 
    }
    
    //-----------------Main Flow: Receiving the items first and then shipping the sales order items
    
   test.log("Main Flow: Receiving the Service items first and then shipping the sales order items");
   
    RANUM++;
    SONUM++;
           
   //---------Verify Sales order generation---------------
 
      flag = verifySO(RANUM,SONUM);
    if(flag == 1)
        test.pass("Sales order created successfully");
    else
       test.fail("Sales order not created");
    
    
    
     //---------------------Receive and post receipt--------
    
     postReceipt(RANUM);
     test.log("post Receipt completed");
     

  
    //--------------------- Ship the order ----------------
       
    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    
    
    //--------------Verify Work order --------------
    
    flag = verifyWO(SONUM);
    
    if(flag == 0)
        test.pass("Work order is closed successfully");
    else
        test.fail("Work order is not closed");
    
    //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //-----------------Exceptional flow: Shipping the Sales order items first and then receiving the items -------------
    test.log("Exceptional flow: Shipping the Sales order items first and then receiving the items");
    
    RANUM++;
    SONUM++;
    
        
   //---------Verify Sales order generation---------------
 
      flag = verifySO(RANUM,SONUM);
    if(flag == 1)
        test.pass("Sales order created successfully");
    else
       test.fail("Sales order not created");
    
    //--------------------- Ship the order ----------------
       
    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    snooze(3);
    //---------------------Receive and post receipt--------
    
     postReceipt(RANUM);
  
    //--------------Verify Work order --------------
    
    flag = verifyWO(SONUM);
    
    if(flag == 0)
        test.pass("Work order is closed successfully");
    else
        test.fail("Work order is not closed");
    
    //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
  
    //--------Create Substitute item-----------
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
        clickItem(":_list_XTreeWidget_3", "YTRUCK1", 0, 0, 5, Qt.LeftButton);
        openItemContextMenu(":_list_XTreeWidget_3", "YTRUCK1", 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        
        waitForObject(":_targetItemNumber_XLineEdit_2");
        type(":_targetItemNumber_XLineEdit_2", "YTRUCK2");
        
        
        if(!findObject(":Copy Item.Copy Item Costs_QCheckBox").checked)
        {
            clickButton(":Copy Item.Copy Item Costs_QCheckBox");
        }
        if(!findObject(":Copy Item.Copy Bill of Materials_QCheckBox").checked)
        {
            clickButton(":Copy Item.Copy Bill of Materials_QCheckBox");
        }
        if(appEdition == "Manufacturing")
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
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='YTRUCK2' type='QModelIndex'}"))
            test.pass("Item YTRUCK2 created");
        else
            test.fail("Item creation failed");
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in creating substitute item: " + e);
    }
    //---------Create Item site----------
    
    createRIS("YTRUCK2");
    test.log("Item site created for 'YTRUCK2' at WH1");
    
    //---------Adjust QOH----------------
    adjustQoh("YTRUCK2","300","WH1","")
    
    RANUM++;
    SONUM++;
    
  //-----------Create Sales order--------
    
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
       
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
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
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+SONUM+"' type='QModelIndex'}"))
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
  //--------Issue stock and ship the order-------

       
    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    
            
  //--------------- Create RA with Disposition - Substitute, Credit/Ship - Immediately, Credit By - None----
    
    //--------------- Main Flow: Receive the Return type item and then Ship the Substitute item ----------
    
    raData = ["Substitute","Immediately","None","YTRUCK2","100",""];
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "New...");
        activateItem(":xTuple ERP:*.Return_QMenu", "New...");
        
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_headerPage._disposition_XComboBox");
        clickItem(":_headerPage._disposition_XComboBox",raData[0], 0, 0, 5, Qt.LeftButton);
        waitForObject(":_headerPage._timing_XComboBox");
        clickItem(":_headerPage._timing_XComboBox",raData[1], 0, 0, 5, Qt.LeftButton);
        waitForObject(":_headerPage._creditBy_XComboBox");
        clickItem(":_headerPage._creditBy_XComboBox",raData[2], 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        mouseClick(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", 67, 8, 0, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_raitem.1_QModelIndex");
        mouseClick(":_raitem.1_QModelIndex", 15, 4, 0, Qt.LeftButton);
        waitForObject(":_lineItemsPage.Authorize Line_QPushButton");
        clickButton(":_lineItemsPage.Authorize Line_QPushButton");
        var obj_tree,obj_treeItem,string;
        obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        obj_treeItem = obj_tree.topLevelItem(0);
        string = obj_treeItem.text(10);
        
        if(string == 100)
        {
            test.pass("Line item authorized");
        }
        else
        {
            test.fail("Line item not authorized ");           
        }
        
        waitForObject(":_lineItemsPage.Clear Authorization_QPushButton");
        clickButton(":_lineItemsPage.Clear Authorization_QPushButton");
        obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        obj_treeItem = obj_tree.topLevelItem(0);
        string = obj_treeItem.text(10);
        
        if(string == 0)
        {
            test.pass("Authorization cleared");
        }
        else
        {
            test.fail("Clear Authorization failed");           
        }
        
        
        waitForObject(":_lineItemsPage.Authorize All_QPushButton");
        clickButton(":_lineItemsPage.Authorize All_QPushButton");
        obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        obj_treeItem = obj_tree.topLevelItem(0);
        string = obj_treeItem.text(10);
        
        if(string == 100)
        {
            test.pass("All items authorized");
        }
        else
        {
            test.fail("Authorization All failed");           
        }
        
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_miscGroup._disposition_XComboBox");
        clickItem(":_miscGroup._disposition_XComboBox","Ship", 0, 0, 5, Qt.LeftButton);
        
        
        waitForObject(":groupBox.ItemLineEdit_ItemLineEdit");
        type(":groupBox.ItemLineEdit_ItemLineEdit", raData[3]);
        nativeType("<Tab>");
        waitForObject(":_warehouse_WComboBox_5");
        clickItem(":_warehouse_WComboBox_5","WH1", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":_qtyAuth_XLineEdit");
        type(":_qtyAuth_XLineEdit", raData[4]);
        
        if(raData[2] != "None")
        {	
            waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
            type(":Cash Receipt.XLineEdit_XLineEdit_2", raData[5]);
            nativeType("<Tab>");
        }
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        nativeType("<Tab>");
        
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in creating RA " + e);
    }
    test.log("RA created with Disposition - Substitute, Credit/Ship - Immediately, Credit By - None");
    SONUM++;
    
    //----------Verify SO generation-------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        waitForObject(":_frame._ra_XTreeWidget");
        clickItem(":_frame._ra_XTreeWidget", RANUM, 10, 8, 0, Qt.LeftButton);
        
        waitForObject(":_frame.Edit_QPushButton");
        clickButton(":_frame.Edit_QPushButton");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._raitem_XTreeWidget");
        var obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        var count = obj_tree.topLevelItemCount;
        var obj_treeItem = obj_tree.topLevelItem(count-1);
        var string = obj_treeItem.text(21);
        
        if(string == SONUM+"-1")
        {
            test.pass("Sales order created successfully ");
            flag = 1;
        }
        else
        {
            test.fail("Sales order not created ");
            flag = 0;
        }
        waitForObject(":xTuple ERP:*.Close_QPushButton");
        clickButton(":xTuple ERP:*.Close_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying Sales order number" + e);
    }
    
      //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully for YTRUCK1");
    else
        test.fail("QOH updated incorrectly"); 
    
      //--------------------- Ship the order ----------------
    
    
    qohBefore = queryQoh("YTRUCK2","WH1");
    
    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    
    qohAfter = queryQoh("YTRUCK2","WH1");
    
    if(parseInt(qohBefore) - 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully after shipping");
    else
        test.fail("QOH updated incorrectly after shipping"); 
    
      //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    RANUM++;
    SONUM++;
    
     //-----------Create Sales order--------
    
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
       
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
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
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+SONUM+"' type='QModelIndex'}"))
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
  //--------Issue stock and ship the order-------

       
    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    
    //----------- Alternate flow : Ship the Substitute item first and then receive the Return type item------
    
    raData = ["Substitute","Immediately","None","YTRUCK2","100",""];
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "New...");
        activateItem(":xTuple ERP:*.Return_QMenu", "New...");
        
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_headerPage._disposition_XComboBox");
        clickItem(":_headerPage._disposition_XComboBox",raData[0], 0, 0, 5, Qt.LeftButton);
        waitForObject(":_headerPage._timing_XComboBox");
        clickItem(":_headerPage._timing_XComboBox",raData[1], 0, 0, 5, Qt.LeftButton);
        waitForObject(":_headerPage._creditBy_XComboBox");
        clickItem(":_headerPage._creditBy_XComboBox",raData[2], 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        mouseClick(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", 67, 8, 0, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        
        waitForObject(":_lineItemsPage.Authorize All_QPushButton");
        clickButton(":_lineItemsPage.Authorize All_QPushButton");
        obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        obj_treeItem = obj_tree.topLevelItem(0);
        string = obj_treeItem.text(10);
        
        if(string == 100)
        {
            test.pass("All items authorized");
        }
        else
        {
            test.fail("Authorization All failed");           
        }
        
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_miscGroup._disposition_XComboBox");
        clickItem(":_miscGroup._disposition_XComboBox","Ship", 0, 0, 5, Qt.LeftButton);
        
        
        waitForObject(":groupBox.ItemLineEdit_ItemLineEdit");
        type(":groupBox.ItemLineEdit_ItemLineEdit", raData[3]);
        nativeType("<Tab>");
        waitForObject(":_warehouse_WComboBox_5");
        clickItem(":_warehouse_WComboBox_5","WH1", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":_qtyAuth_XLineEdit");
        type(":_qtyAuth_XLineEdit", raData[4]);
        
        if(raData[2] != "None")
        {	
            waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
            type(":Cash Receipt.XLineEdit_XLineEdit_2", raData[5]);
            nativeType("<Tab>");
        }
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        nativeType("<Tab>");
        
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in creating RA " + e);
    }
    test.log("RA created with Disposition - Substitute, Credit/Ship - Immediately, Credit By - None");
   
    SONUM++;
    
    //----------Verify SO generation-------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        waitForObject(":_frame._ra_XTreeWidget");
        clickItem(":_frame._ra_XTreeWidget", RANUM, 10, 8, 0, Qt.LeftButton);
        
        waitForObject(":_frame.Edit_QPushButton");
        clickButton(":_frame.Edit_QPushButton");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._raitem_XTreeWidget");
        var obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        var count = obj_tree.topLevelItemCount;
        var obj_treeItem = obj_tree.topLevelItem(count-1);
        var string = obj_treeItem.text(21);
        
        if(string == SONUM+"-1")
        {
            test.pass("Sales order created successfully ");
            flag = 1;
        }
        else
        {
            test.fail("Sales order not created ");
            flag = 0;
        }
        waitForObject(":xTuple ERP:*.Close_QPushButton");
        clickButton(":xTuple ERP:*.Close_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying Sales order number" + e);
    }
    
       //--------------------- Ship the order ----------------
    
    
    qohBefore = qohAfter;
    
    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    
    qohAfter = queryQoh("YTRUCK2","WH1");
    
    if(parseInt(qohBefore) - 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully after shipping");
    else
        test.fail("QOH updated incorrectly after shipping"); 
    
       //----------------Create and post receipt--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    postReceipt(RANUM);
    test.log("Receipt posted successfully");
    
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully for YTRUCK1");
    else
        test.fail("QOH updated incorrectly"); 
    
      //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
    //---------------RA with Disposition - Substitute, Credit/Ship - Upon Receipt, Credit By - None----------
    
    RANUM++;
    SONUM++;
    //--------------Create Sales order -------------
    
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
       
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
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
      
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+SONUM+"' type='QModelIndex'}"))
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
    
  //--------Issue stock and ship the order-------

    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    
    raData = ["Substitute","Upon Receipt","None","YTRUCK2","100",""];
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "New...");
        activateItem(":xTuple ERP:*.Return_QMenu", "New...");
        
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_headerPage._disposition_XComboBox");
        clickItem(":_headerPage._disposition_XComboBox",raData[0], 0, 0, 5, Qt.LeftButton);
        waitForObject(":_headerPage._timing_XComboBox");
        clickItem(":_headerPage._timing_XComboBox",raData[1], 0, 0, 5, Qt.LeftButton);
        waitForObject(":_headerPage._creditBy_XComboBox");
        clickItem(":_headerPage._creditBy_XComboBox",raData[2], 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        mouseClick(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", 67, 8, 0, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        
        waitForObject(":_lineItemsPage.Authorize All_QPushButton");
        clickButton(":_lineItemsPage.Authorize All_QPushButton");
        obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        obj_treeItem = obj_tree.topLevelItem(0);
        string = obj_treeItem.text(10);
        
        if(string == 100)
        {
            test.pass("All items authorized");
        }
        else
        {
            test.fail("Authorization All failed");           
        }
        
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_miscGroup._disposition_XComboBox");
        clickItem(":_miscGroup._disposition_XComboBox","Ship", 0, 0, 5, Qt.LeftButton);
        
        
        waitForObject(":groupBox.ItemLineEdit_ItemLineEdit");
        type(":groupBox.ItemLineEdit_ItemLineEdit", raData[3]);
        nativeType("<Tab>");
        waitForObject(":_warehouse_WComboBox_5");
        clickItem(":_warehouse_WComboBox_5","WH1", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":_qtyAuth_XLineEdit");
        type(":_qtyAuth_XLineEdit", raData[4]);
        
        if(raData[2] != "None")
        {	
            waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
            type(":Cash Receipt.XLineEdit_XLineEdit_2", raData[5]);
            nativeType("<Tab>");
        }
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        nativeType("<Tab>");
        
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in creating RA " + e);
    }
    test.log("RA created with Disposition - Substitute, Credit/Ship - Upon Receipt, Credit By - None");
    
    SONUM++;
    
    //----------Verify SO generation-------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        waitForObject(":_frame._ra_XTreeWidget");
        clickItem(":_frame._ra_XTreeWidget", RANUM, 10, 8, 0, Qt.LeftButton);
        
        waitForObject(":_frame.Edit_QPushButton");
        clickButton(":_frame.Edit_QPushButton");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._raitem_XTreeWidget");
        var obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        var count = obj_tree.topLevelItemCount;
        var obj_treeItem = obj_tree.topLevelItem(count-1);
        var string = obj_treeItem.text(21);
        
        if(string == SONUM+"-1")
        {
            test.fail("Sales order created ");
        }
        else
        {
           test.pass("Sales order created ");         
        }
        waitForObject(":xTuple ERP:*.Close_QPushButton");
        clickButton(":xTuple ERP:*.Close_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying Sales order number" + e);
    }
    
    //----------------Create and post receipt from RA screen--------
    
    qohBefore = queryQoh("YTRUCK1","WH1");
    
    try
    {
     waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
    waitForObjectItem(":xTuple ERP:*.Return_QMenu", "List Open...");
    activateItem(":xTuple ERP:*.Return_QMenu", "List Open...");
    waitForObject(":_frame._ra_XTreeWidget");
    clickItem(":_frame._ra_XTreeWidget", RANUM, 10, 8, 0, Qt.LeftButton);
    
    waitForObject(":_frame.Edit_QPushButton");
    clickButton(":_frame.Edit_QPushButton");
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_raitem.1_QModelIndex");
    mouseClick(":_raitem.1_QModelIndex", 15, 4, 0, Qt.LeftButton);
    waitForObject(":_lineItemsPage.Enter Receipt..._QPushButton");
    clickButton(":_lineItemsPage.Enter Receipt..._QPushButton");
    waitForObject(":_inventoryGroup._toReceive_XLineEdit");
    mouseClick(":_inventoryGroup._toReceive_XLineEdit", 132, 11, 0, Qt.LeftButton);
    waitForObject(":_inventoryGroup._toReceive_XLineEdit");
    type(":_inventoryGroup._toReceive_XLineEdit", "100");

    waitForObject(":Sales Order.OK_QPushButton_2");
    clickButton(":Sales Order.OK_QPushButton_2");
    obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
    obj_treeItem = obj_tree.topLevelItem(0);
    string = obj_treeItem.text(12);
    
    if(string == 100)
    {
        test.pass("Receipt created");
    }
    else
    {
        test.fail("Receipt not created");           
    }
   
    waitForObject(":_lineItemsPage.Post Receipts_QPushButton");
    clickButton(":_lineItemsPage.Post Receipts_QPushButton");
    
    obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
    obj_treeItem = obj_tree.topLevelItem(0);
    string = obj_treeItem.text(11);
    
    if(string == 100)
    {
        test.pass("Receipt posted");
    }
    else
    {
        test.fail("Receipt not posted");           
    }
    
    waitForObject(":Select Order for Billing.Save_QPushButton");
    clickButton(":Select Order for Billing.Save_QPushButton");
    waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");
}
    catch(e)
    {
        test.fail("Exception in posting receipt:"+e);
    }
       
    qohAfter = queryQoh("YTRUCK1","WH1");
    
    if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully for YTRUCK1");
    else
        test.fail("QOH updated incorrectly"); 
    
     //----------Verify SO generation-------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        waitForObject(":_frame._ra_XTreeWidget");
        clickItem(":_frame._ra_XTreeWidget", RANUM, 10, 8, 0, Qt.LeftButton);
        
        waitForObject(":_frame.Edit_QPushButton");
        clickButton(":_frame.Edit_QPushButton");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._raitem_XTreeWidget");
        var obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        var count = obj_tree.topLevelItemCount;
        var obj_treeItem = obj_tree.topLevelItem(count-1);
        var string = obj_treeItem.text(21);
        
        if(string == SONUM+"-1")
        {
            test.pass("Sales order created  ");
        }
        else
        {
           test.fail("Sales order not created ");         
        }
        waitForObject(":xTuple ERP:*.Close_QPushButton");
        clickButton(":xTuple ERP:*.Close_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying Sales order number" + e);
    }
    
   //--------------------- Ship the order ----------------
    
    
    qohBefore = queryQoh("YTRUCK2","WH1");
    // ------- Do Nothing ------
     try
      {
          waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
          activateItem(":xTuple ERP: *_QMenuBar", "Sales");
          waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup...");
          activateItem(":xTuple ERP: *.Sales_QMenu", "Setup...");
          
//          waitForObject(":_stack._returnAuthorizationNumGeneration_NumberGenComboBox");
//          clickItem(":_stack._returnAuthorizationNumGeneration_NumberGenComboBox", "Automatic, Use R/A #'s", 0, 0, 5, Qt.LeftButton);
//          waitForObject(":_stack._nextRaNumber_XLineEdit");
//          RANUM = findObject(":_stack._nextRaNumber_XLineEdit").text;
          
          
          waitForObject(":Setup.Apply_QPushButton");
          clickButton(":Setup.Apply_QPushButton");
          waitForObject(":Cash Receipt.Save_QPushButton_3");
          clickButton(":Cash Receipt.Save_QPushButton_3");
      }
      catch(e)
      {
          test.fail("Exception in configuring sales setup" + e);
     }
    issueStock(SONUM);
    
    test.log("Ship order operation performed successfully");
    
    qohAfter = queryQoh("YTRUCK2","WH1");
    
    if(parseInt(qohBefore) - 100 == parseInt(qohAfter))
        test.pass("QOH updated successfully after shipping");
    else
        test.fail("QOH updated incorrectly after shipping"); 
    
     //----------Verify RA ---------
    
    flag = verifyRa(RANUM);
    if(flag == 0)
        test.pass("RA is closed successfully");
    else
        test.fail("RA is not closed");
    
}
