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
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
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
    
//   
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
       //-----Setting Encryption Key----- 
    
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
        
        waitForObject(":_ccEncKeyName_QLineEdit").clear();
        type(":_ccEncKeyName_QLineEdit", "xTuple.key");
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
    //--------------- Set the window to Tab view mode -------------

    tabView();
  
    //------- G/L entry for Debit ----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "100");
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "0001");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1010");
        nativeType("<Tab>");
        type(waitForObject(":frame._notes_XTextEdit"), "notes");
        snooze(0.5);
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in posting simple GL entry");
    }
    
    //------- G/L Entry for Credit -----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "100");
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "0002");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-2000-01");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1000");
        nativeType("<Tab>");
        type(waitForObject(":frame._notes_XTextEdit"), "notes");
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in posting Journal Entry");
    }
    //-------Find Running total----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions..."));
        snooze(1);
        if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit_2"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":_filterGroup.+_QToolButton"));
        mouseClick(waitForObject(":_filterGroup.xcomboBox3_XComboBox"), 61, 16, 0, Qt.LeftButton);
        
        mouseClick(waitForObjectItem(":_filterGroup.xcomboBox3_XComboBox", "GL Account"), 37, 7, 0, Qt.LeftButton);
        type(waitForObject(":_filterGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        snooze(2);
        if(!findObject(":General Ledger Transactions.Show Running Total_XCheckBox").checked)
        {        
            clickButton(":General Ledger Transactions.Show Running Total_XCheckBox");
        }
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        var bal = findObject(":General Ledger Transactions.beginningbal_XLabel").text;
        var runtotal = new Array();
        waitForObject(":_list_XTreeWidget_3");
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var totalcount = obj_GlTree.topLevelItemCount;
        for(var y=0;y<totalcount;y++)
        {
            var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(y);
            runtotal[y] = obj_TreeTopLevelItem.text(11);
        }
        var begbal = replaceSubsting(bal);      
        var debittotal = replaceSubsting(runtotal[0]);
        var credittotal = replaceSubsting(runtotal[1]);
        
        if(debittotal == parseFloat(begbal) + 100 )
            test.pass("running total updated correctly for debit transaction");
        else
            test.fail("running total updated incorrectly for debit transaction");
        
        if(credittotal == begbal)
            
            test.pass("running total updated correctly for credit transaction");
        else
            test.fail("running total updated incorrectly for credit transaction");
        
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Exception in verifying GL transaction");
    }
    
    //------Enable Manual forward update trail balances------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup..."));
        snooze(1);
        if(!findObject(":Options:.Manual Forward Update Trial Balances_QCheckBox").checked)
        {
            clickButton(":Options:.Manual Forward Update Trial Balances_QCheckBox");
            
        }
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {
        test.fail("Exception in enabling manual forward update trial balances" + e);
    }
  
  //-------Restart the application------
  try
  {
       activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
       activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP..."));
   }
  catch(e)
  {
      test.fail("Exception in exiting the application " + e);
  }
 
  snooze(4);
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
  
  //-----login Application-----
  
  loginAppl("CONFIGURE"); 
  
  snooze(5);
  

    //------- Verify opening a closed Accounting period in closed fiscal year ----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Fiscal Calendar"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Fiscal Calendar_QMenu", "Accounting Periods..."));
        snooze(1);
        var sWidgetTreeControl = ":xTuple ERP:*._period_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var totalcount = obj_GlTree.topLevelItemCount;
        for(var y=0;y<totalcount;y++)
        {
            var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(y);
            closed = obj_TreeTopLevelItem.text(6);
            if(closed == "No")
            {
                count = y;
                break;
            }            
        }
       
        var item = obj_GlTree.topLevelItem(y-1);
        closed = item.text(0);
        waitForObject(":xTuple ERP:*._period_XTreeWidget");
        clickItem(":xTuple ERP:*._period_XTreeWidget", closed, 38, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        snooze(1);
        clickButton(waitForObject(":Accounting Period.Closed_QCheckBox"));
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        snooze(2);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            test.pass("It is not possible to open accouning period of a closed year");
            clickButton(":Sales Order.OK_QPushButton_2");
            clickButton(waitForObject(":Accounting Period.Cancel_QPushButton"));
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
        else
        {
            test.fail("It is possible to open accouning period of a closed year");
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    catch(e)
    {
        test.fail("Exception in opening a closed accounting period");
    }
    
    //----- Open a closed Fiscal year-------
    
    try
    {    
        var count,closed;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Fiscal Calendar"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Fiscal Calendar_QMenu", "Fiscal Years..."));
        var sWidgetTreeControl = ":xTuple ERP:*._period_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var totalcount = obj_GlTree.topLevelItemCount;
        for(var y=0;y<totalcount;y++)
        {
            var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(y);
            closed = obj_TreeTopLevelItem.text(2);
            if(closed == "No")
            {
                count = y;
                break;
            }            
        }
        var item = obj_GlTree.topLevelItem(y-1);
        closed = item.text(0);
       
        waitForObject(":xTuple ERP:*._period_XTreeWidget");
        clickItem(":xTuple ERP:*._period_XTreeWidget", closed, 38, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        if(findObject(":Fiscal Year.Closed_QCheckBox").checked)
        {
            clickButton(":Fiscal Year.Closed_QCheckBox");
        }
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.pass("Closed fiscal year is opened successfully");
    }
    catch(e)
    {
        test.fail("Exception in opening a closed Fiscal year" + e);
    }
    
    //-------- Open a closed Accounting period -------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Fiscal Calendar"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Fiscal Calendar_QMenu", "Accounting Periods..."));
        var sWidgetTreeControl = ":xTuple ERP:*._period_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var totalcount = obj_GlTree.topLevelItemCount;
        for(var y=0;y<totalcount;y++)
        {
            var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(y);
            closed = obj_TreeTopLevelItem.text(6);
            if(closed == "No")
            {
                count = y;
                break;
            }            
        }
        
        var item = obj_GlTree.topLevelItem(y-1);
        closed = item.text(0);
        
        waitForObject(":xTuple ERP:*._period_XTreeWidget");
        clickItem(":xTuple ERP:*._period_XTreeWidget", closed, 38, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        clickButton(waitForObject(":Accounting Period.Closed_QCheckBox"));
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.pass(" Closed accounting period opened successfully");
    }
    catch(e)
    {
        test.fail("Exception in opening a closed accounting period");
    }
    
    //------- Simple Journal Entry in closed period  -----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "200");
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "0003");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "<Tab>");
        
        findObject(":Simple G/L Journal Entry.XDateEdit_XDateEdit").clear();
        type(":Simple G/L Journal Entry.XDateEdit_XDateEdit", "12/2/11");
        
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-2000-01");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1000-01");
        nativeType("<Tab>");
        type(waitForObject(":frame._notes_XTextEdit"), "posting to closed period");
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        snooze(0.5);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            test.fail("accounting period is closed");
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
        }
        else   
            clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in posting Journal Entry");
    }
    
    //-------- Close and freeze the Accounting period -------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Fiscal Calendar"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Fiscal Calendar_QMenu", "Accounting Periods..."));
        var sWidgetTreeControl = ":xTuple ERP:*._period_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var totalcount = obj_GlTree.topLevelItemCount;
        for(var y=0;y<totalcount;y++)
        {
            var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(y);
            closed = obj_TreeTopLevelItem.text(6);
            if(closed == "No")
            {
                count = y;
                break;
            }            
        }
        
        var item = obj_GlTree.topLevelItem(y);
        closed = item.text(0);
        waitForObject(":xTuple ERP:*._period_XTreeWidget");
        clickItem(":xTuple ERP:*._period_XTreeWidget", closed, 38, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        clickButton(waitForObject(":Accounting Period.Closed_QCheckBox"));
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        
        waitForObject(":xTuple ERP:*._period_XTreeWidget");
        clickItem(":xTuple ERP:*._period_XTreeWidget", closed, 38, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        clickButton(waitForObject(":Accounting Period.Frozen_QCheckBox"));
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.pass(" Accounting period is closed and freezed successfully");
    }
    catch(e)
    {
        test.fail("Exception in freezing an accounting period");
    }
        //----Verify Trail balance before forward update----   
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Financial Statements"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Financial Statements_QMenu", "View Trial Balances..."));
        snooze(1);
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
            clickButton(waitForObject(":Quantities on Hand.More_QToolButton"));
        }
        clickButton(waitForObject(":_filterGroup.+_QToolButton"));
        waitForObject(":_filterGroup.xcomboBox2_XComboBox");
        clickItem(":_filterGroup.xcomboBox2_XComboBox", "GL Account",10, 10, 0, Qt.LeftButton);
        type(waitForObject(":_filterGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(0);
        var trialBalance = obj_TreeTopLevelItem.text(4);
        trialBalance1 = replaceSubsting(trialBalance);
        test.log(trialBalance1);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }
    catch(e)
    {
        test.fail("Exception in Verify Trail balance before forward update");
    }
    //-------Forward updated Trial Balances--------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Utilities"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Utilities_QMenu", "Forward Update Accounts..."));
        clickButton(waitForObject(":_accntGroup.All Accounts_QRadioButton"));
        clickButton(waitForObject(":Forward Update Accounts.Update_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.pass("Manual Forward Update Trial Balances done successfully");
    }
    catch(e)
    {
        test.fail("Exception in Forward updating trial balances" + e);
    }
      //----Verify Trail balance after forward update----   
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Financial Statements"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Financial Statements_QMenu", "View Trial Balances..."));
        snooze(1);
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
            clickButton(waitForObject(":Quantities on Hand.More_QToolButton"));
        }
        clickButton(waitForObject(":_filterGroup.+_QToolButton"));
        waitForObject(":_filterGroup.xcomboBox2_XComboBox");
        clickItem(":_filterGroup.xcomboBox2_XComboBox", "GL Account",10, 10, 0, Qt.LeftButton);
        type(waitForObject(":_filterGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(0);
        var trialBalance = obj_TreeTopLevelItem.text(4);
        trialBalance2 = replaceSubsting(trialBalance);
        if(trialBalance2 = parseInt(trialBalance1) - 100)
            test.pass("Trial Balance updated correctly");
        else
            test.fail("Trial Balance updated incorrectly");
        
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }
    catch(e)
    {
        test.fail("Exception in Verify Trail balance before forward update");
    }
     //--------Create a miscellaneous check --------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run..."));
        clickButton(waitForObject(":_frame.New_QPushButton"));
        clickButton(waitForObject(":Write Check To:.Vendor_QRadioButton"));
        type(waitForObject(":_widgetStack.VirtualClusterLineEdit_VendorLineEdit"), "TPARTS");
        nativeType("<Tab>");
        type(waitForObject(":Charge To:.VirtualClusterLineEdit_ExpenseLineEdit"), "VA TAX");
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "12/2/11");
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*._for_XLineEdit"), "1005");
        type(waitForObject(":_frame._notes_XTextEdit"), "MISC. CHECK");
        clickButton(waitForObject(":xTuple ERP:*.Create_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in creating miscellaneious check");
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
      waitForObject(":_ccEncKeyName_QLineEdit").clear();
      type(":_ccEncKeyName_QLineEdit", "xTuple.key");
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
  
 
     //--------View Check run-----------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run..."));
        waitForObjectItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1");
        clickItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1", 232, 12, 0, Qt.LeftButton);
        
        sendEvent("QMouseEvent", waitForObject(":_frame.Print_QPushButton"), QEvent.MouseButtonPress, 46, 11, Qt.LeftButton, 0);
        activateItem(waitForObjectItem(":_QMenu", "Selected Check..."));    
        
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
           
        }
        else
        {
           
             clickButton(waitForObject(":Print Check.Print_QPushButton_2"));
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            snooze(0.5);
            if(object.exists(":filename_QLineEdit"))
            {
            findObject(":filename_QLineEdit").clear();
            type(waitForObject(":filename_QLineEdit"), "2");
            if(object.exists(":Print.Print_QPushButton"))
                clickButton(waitForObject(":Print.Print_QPushButton"));
            }
           clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            snooze(1);
        }
    }
    catch(e)
    {
        test.fail("Error in printing the miscellaneous check " + e);
    }
        
        
     //---------- Post check run -------  
    try
    {
        waitForObjectItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1");
        clickItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1", 232, 12, 0, Qt.LeftButton);
        waitForObject(":_frame.Post_QPushButton");
        sendEvent("QMouseEvent", ":_frame.Post_QPushButton", QEvent.MouseButtonPress, 42, 10, Qt.LeftButton, 0);
        activateItem(waitForObjectItem(":_QMenu", "Selected Check..."));                
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
    snooze(0.5);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            test.pass("Unable to post the check into closed period");
            clickButton(":Sales Order.OK_QPushButton_2");
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        else
        {
            test.fail("Miscellaneous check posted to closed period");
        }
        
        waitForObject(":_frame._check_XTreeWidget");
        clickItem(":_frame._check_XTreeWidget", "No", 16, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_frame.Void_QPushButton"));
        clickButton(waitForObject(":_frame.Replace_QPushButton"));
        waitForObject(":_frame._check_XTreeWidget");
        clickItem(":_frame._check_XTreeWidget", "No", 16, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        snooze(1);
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        snooze(0.5);
        nativeType("<Tab>");
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        waitForObjectItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1");
        clickItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1", 232, 12, 0, Qt.LeftButton);
        
        sendEvent("QMouseEvent", waitForObject(":_frame.Print_QPushButton"), QEvent.MouseButtonPress, 46, 11, Qt.LeftButton, 0);
        activateItem(waitForObjectItem(":_QMenu", "Selected Check..."));
        
        if(OS.name == "Windows")
        {
            snooze(1)
              clickButton(waitForObject(":Print Check.Create EFT File_QPushButton"));
            waitForObject(":fileNameEdit_QLineEdit");
            findObject(":fileNameEdit_QLineEdit").text = winPath.toString()+"/achFile.ach";
            sendEvent("QMouseEvent", waitForObject(":Cash Receipt.Save_QPushButton_3"), QEvent.MouseButtonPress, 42, 13, Qt.LeftButton, 0);
            sendEvent("QMouseEvent", waitForObject(":Cash Receipt.Save_QPushButton_3"), QEvent.MouseButtonRelease, 42, 13, Qt.LeftButton, 1);
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            clickButton(waitForObject(":ACH File OK?.Yes_QPushButton"));
         snooze(1);
        }
        
        else 
        {
            if(object.exists(":Print.Print_QPushButton"))
                clickButton(waitForObject(":Print Check.Print_QPushButton_2"));
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            if(object.exists(":filename_QLineEdit"))
            {
            findObject(":filename_QLineEdit").clear();
            type(waitForObject(":filename_QLineEdit"), "2");
            clickButton(waitForObject(":Print.Print_QPushButton"));
            }
           clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            snooze(1);
        }
        snooze(1);
        
        waitForObjectItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1");
        clickItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1", 232, 12, 0, Qt.LeftButton);
        waitForObject(":_frame.Post_QPushButton");
        sendEvent("QMouseEvent", ":_frame.Post_QPushButton", QEvent.MouseButtonPress, 42, 10, Qt.LeftButton, 0);
        activateItem(waitForObjectItem(":_QMenu", "Selected Check..."));                
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in posting the check run" + e);
    }


    //--------- Create Purchase orders -------
    
    var ponumber1 = createPO("TPARTS", "TBOX1", "100");
    snooze(2);
    var ponumber2 = createPO("TPARTS", "TBOX1", "100");
    snooze(2);
    var ponumber3 = createPO("XPPI", "TBOX1", "100");
    snooze(2);
    
    //---------- Release POs -----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "Release..."));
        
        
        sendEvent("QMouseEvent", waitForObject(":Release Purchase Order_QLabel"), QEvent.MouseButtonPress, 14, 9, Qt.LeftButton, 0);
    activateItem(waitForObjectItem(":_QMenu", "List..."));

    type(waitForObject(":_search_QLineEdit"), ponumber1);
    clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
    nativeType("<Tab>");
    clickButton(waitForObject(":Release Purchase Order.Release_QPushButton"));    
       snooze(0.5);
        
        sendEvent("QMouseEvent", waitForObject(":Release Purchase Order_QLabel"), QEvent.MouseButtonPress, 14, 9, Qt.LeftButton, 0);
    activateItem(waitForObjectItem(":_QMenu", "List..."));

    type(waitForObject(":_search_QLineEdit"), ponumber2);
    clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
    nativeType("<Tab>");
    clickButton(waitForObject(":Release Purchase Order.Release_QPushButton"));
    snooze(0.5);
    
    
    sendEvent("QMouseEvent", waitForObject(":Release Purchase Order_QLabel"), QEvent.MouseButtonPress, 14, 9, Qt.LeftButton, 0);
    activateItem(waitForObjectItem(":_QMenu", "List..."));

    type(waitForObject(":_search_QLineEdit"), ponumber3);
    clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
    nativeType("<Tab>");
    clickButton(waitForObject(":Release Purchase Order.Release_QPushButton"));    
    
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in release POs" + e);
    }
    
    //-------------Create and post Receipts for POs
    
    createPoReceipt(ponumber1);
    createPoReceipt(ponumber2);
    createPoReceipt(ponumber3);
    
    //--------Find voucher number-----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Setup..."));
        snooze(0.5);
        var vonum = findObject(":_nextVcNumber_XLineEdit").text;
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {
        test.fail("Exception in find voucher number");
    }
////    //------ Create and post voucher ------
////    var vonum1 = "30144";
////    var vonum2 = "30145";
////    var vonum3 = "30146";
    createVoucher(ponumber1,"1011");
    var vonum1 = vonum;
    createVoucher(ponumber2,"1012");
    var vonum2 = parseInt(vonum) + 1;
      //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
      //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
    
    snooze(1);
  createVoucher(ponumber3,"1013");
    var vonum3 = parseInt(vonum) + 2;

    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "Post..."));
        
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted..."));
        
        sWidgetTreeControl = ":xTuple ERP:*._vohead_XTreeWidget";
        
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var count = obj_GlTree.topLevelItemCount;
        if(count>0)
        {
            test.fail("all vouchers not posted");
        }
        else
        {
            test.pass("vouchers posted successfully");
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Exception in posting vouchers" + e);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(":Sales Order.OK_QPushButton_2");
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
  
    //-------Assign Accounting privileges------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Maintain Users..."));
        waitForObjectItem(":xTuple ERP:*._usr_XTreeWidget", "admin");
        doubleClickItem(":xTuple ERP:*._usr_XTreeWidget", "admin", 40, 5, 0, Qt.LeftButton);
        waitForObject(":_module_XComboBox");
        clickItem(":_module_XComboBox", "Accounting", 43, 3, 0, Qt.LeftButton);
        snooze(0.5);
        clickButton(waitForObject(":_privTab.Add All->>_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        snooze(1);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges"));
        test.log("All Accounting privileges are assigned to the current user");
    }
    catch(e)
    {
        test.fail("Exception in assigning privileges to the user" + e);
    }
    
    //-------Void voucher from vendor history screen------
    
    try
    {
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Vendor History..."));
        type(waitForObject(":_vendGroup.VirtualClusterLineEdit_VendorLineEdit"), "TPARTS");
        nativeType("<Tab>");
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        
        findObject(":groupBox.XDateEdit_XDateEdit").clear();
        type(":groupBox.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var count = obj_GlTree.topLevelItemCount;
        openItemContextMenu(waitForObject(":_list_XTreeWidget_3"), vonum1, 44, 4, 0);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Void"));
        snooze(0.5);
        waitForObject(sWidgetTreeControl);
        obj_GlTree = findObject(sWidgetTreeControl);
        var count1 = obj_GlTree.topLevelItemCount;;
        var flag;
        if(count1 > parseInt(count))
        {
            for(var i=0;i<count1;i++)
            {
                var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(i);
                if(obj_TreeTopLevelItem.text(3) == "1011")
                {
                    if(obj_TreeTopLevelItem.text(0) == "No")
                    {
                        flag =1;
                        break;
                    }
                }
            }
            if(flag == 1)
            {
                test.log("Voucher is voided and closed");
            }
            else
                test.fail("Voucher is open");
            
        }
        else
            test.fail("voucher is not voided");
        
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Exception in voiding voucher" + e);
    }
    
    //-------Void voucher from A/P History screen------
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Vendor"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Vendor_QMenu", "Workbench..."));
        type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_VendorLineEdit"), "TPARTS");
        nativeType("<Tab>");
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "A/P History");
        snooze(1);
        findObject(":groupBox.XDateEdit_XDateEdit_2").clear();
        type(waitForObject(":groupBox.XDateEdit_XDateEdit_2"), "0");
        nativeType("<Tab>");
        findObject(":groupBox.XDateEdit_XDateEdit").clear();
        type(waitForObject(":groupBox.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var count = obj_GlTree.topLevelItemCount;
        openItemContextMenu(waitForObject(":_list_XTreeWidget_3"), vonum2, 42, 7, 0);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Void"));
        snooze(0.5);
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var count1 = obj_GlTree.topLevelItemCount;
        waitForObject(sWidgetTreeControl);
        obj_GlTree = findObject(sWidgetTreeControl);
        var count1 = obj_GlTree.topLevelItemCount;;
        var flag;
        if(count1 > parseInt(count))
        {
            for(var i=0;i<count1;i++)
            {
                var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(i);
                if(obj_TreeTopLevelItem.text(3) == "1012")
                {
                    if(obj_TreeTopLevelItem.text(0) == "No")
                    {
                        flag = 1;
                        break;
                    }
                }
            }
            if(flag == 1)
            {
                test.log("Voucher is voided and closed");
            }
            else
                test.fail("Voucher is open");
            
        }
        else
            test.fail("voucher is not voided");
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Exception in voiding the voucher");
    }

    //-------Void voucher for foreign currency from vendor history screen------
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Vendor History..."));
        type(waitForObject(":_vendGroup.VirtualClusterLineEdit_VendorLineEdit"), "XPPI");
        nativeType("<Tab>");
        snooze(1);
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        
        findObject(":groupBox.XDateEdit_XDateEdit").clear();
        type(":groupBox.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var count = obj_GlTree.topLevelItemCount;
        openItemContextMenu(waitForObject(":_list_XTreeWidget_3"), vonum3, 44, 4, 0);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Void"));
        snooze(0.5);
        waitForObject(sWidgetTreeControl);
        obj_GlTree = findObject(sWidgetTreeControl);
        var count1 = obj_GlTree.topLevelItemCount;;
        var flag;
        if(count1 > parseInt(count))
        {
            for(var i=0;i<count1;i++)
            {
                var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(i);
                if(obj_TreeTopLevelItem.text(3) == "1013")
                {
                    if(obj_TreeTopLevelItem.text(0) == "No")
                    {
                        flag =1;
                        break;
                    }
                }
            }
            if(flag == 1)
            {
                test.log("Voucher is voided and closed");
            }
            else
                test.fail("Voucher is open");
            
        }
        else
            test.fail("voucher is not voided");
        
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Exception in voiding voucher" + e);
    }

    //------- Verify GL entry for void voucher ------
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions..."));
            snooze(1);
        if(!(object.exists(":xTuple ERP:*.XDateEdit_XDateEdit")))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear()
                type(":_filterGroup.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear()
                type(":_filterGroup.XDateEdit_XDateEdit_2", "0");
        nativeType("<Tab>");
        
        clickButton(waitForObject(":_filterGroup.+_QToolButton"));
        
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox", "Document #",10, 10, 0, Qt.LeftButton);
        type(waitForObject(":_filterGroup.widget3_QLineEdit"), vonum3);
        clickButton(waitForObject(":_filterGroup.+_QToolButton"));
        waitForObject(":_filterGroup.xcomboBox4_XComboBox");
        clickItem(":_filterGroup.xcomboBox4_XComboBox", "GL Account",10, 10, 0, Qt.LeftButton);
        type(waitForObject(":_filterGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-2000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        var qTree = findObject(":_list_XTreeWidget_3");
        var row1 = qTree.topLevelItem(0);
        var row2 = qTree.topLevelItem(1);
        var dvalue = row1.text(7);
        var cvalue = row2.text(8);
        if(dvalue == cvalue)
        {
            test.pass("voucher amount balanced on voiding");    
        }
        else
        {
            test.fail(" voucher amount is not balanced ");
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
    }
    catch(e)
    {
        test.fail("Exception in assigning privileges to the user" + e);

    }
  
    //------- Verify voided voucher in Select payments screen------
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select..."));
        snooze(0.5);
        var treeObject = findObject(":frame._apopen_XTreeWidget");
        var count = treeObject.topLevelItemCount;
        var flag=0,value;
        for(var i=0;i<count;i++)
        {
            row = treeObject.topLevelItem(i);
            value = row.text(2);
            if(value == vonum3)
            {
                flag = 1;
                break;
            }
        }
        if(flag == 0)
            test.pass("voided voucher not available for selection");
        else
            test.fail("voided voucher available for selection");
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in verifying voided voucher in select payments screen" + e);
    }
    
    //---- Creating voucher for a PO with voided voucher------
    
    createVoucher(ponumber1,"1014");
    
    var vonum4 = parseInt(vonum3) + 1;
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "Post..."));
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Exception in posting vouchers" + e);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(":Sales Order.OK_QPushButton_2");
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        
    }
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions..."));
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear()
                type(":_filterGroup.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear()
                type(":_filterGroup.XDateEdit_XDateEdit_2", "0");
        nativeType("<Tab>");
        
        clickButton(waitForObject(":_filterGroup.+_QToolButton"));
        
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox", "Document #",10, 10, 0, Qt.LeftButton);
        type(waitForObject(":_filterGroup.widget3_QLineEdit"), vonum4);
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        var qTree = findObject(":_list_XTreeWidget_3");
        var count = qTree.topLevelItemCount;
        if(count > 1)
        {
            test.pass("Voucher posted successfully and GL entry is made");
        }
        else
            test.fail("No GL entry is made for the voucher");
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        
    }
    catch(e)
    {
        test.fail("Exception in assigning privileges to the user" + e);
    }  
    
    var miscVouch = parseInt(vonum4) + 1;
    
    //----- Create Miscellaneous voucher ------
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous..."));
        mouseClick(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_VendorLineEdit"), 74, 13, 0, Qt.LeftButton);
        type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_VendorLineEdit"), "TPARTS");
        nativeType("<Tab>");
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), "300");
        nativeType("<Tab>");
        
        //----Account----
        
        clickButton(waitForObject(":_miscDistribTab.New_QPushButton"));
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        findObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit").clear();
        type(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit","100");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        
        //----Expense category----
        
        clickButton(waitForObject(":_miscDistribTab.New_QPushButton"));
        clickButton(waitForObject(":_groupButton.Expense Category_QRadioButton"));
        type(waitForObject(":_expenseGroup.VirtualClusterLineEdit_ExpenseLineEdit"), "TRAVEL");
        nativeType("<Tab>");
        findObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit").clear();
        type(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit","100");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        
        //-----Tax Code----
        
        clickButton(waitForObject(":_miscDistribTab.New_QPushButton"));
        
        clickButton(waitForObject(":_groupButton.Tax Code_QRadioButton"));
        waitForObject(":_taxGroup._taxCode_XComboBox");
        clickItem(":_taxGroup._taxCode_XComboBox", "GA TAX-A-Georgia Sales Tax", 98, 8, 0, Qt.LeftButton);
        findObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit").clear();
        type(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit","100");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        waitForObject(":_referenceGroup._invoiceNum_XLineEdit");
        type(":_referenceGroup._invoiceNum_XLineEdit", "1018");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in creating miscellaneous voucher" + e);
    }
    //--------Post miscellaneous voucher----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "Post..."));
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Exception in posting vouchers" + e);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(":Sales Order.OK_QPushButton_2");
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        
    }
    
    //-------Void Miscellaneous voucher from vendor history screen------
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Vendor History..."));
        type(waitForObject(":_vendGroup.VirtualClusterLineEdit_VendorLineEdit"), "TPARTS");
        nativeType("<Tab>");
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        
        findObject(":groupBox.XDateEdit_XDateEdit").clear();
        type(":groupBox.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var count = obj_GlTree.topLevelItemCount;
        openItemContextMenu(waitForObject(":_list_XTreeWidget_3"), miscVouch, 44, 4, 0);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Void"));
        waitForObject(sWidgetTreeControl);
        obj_GlTree = findObject(sWidgetTreeControl);
        var count1 = obj_GlTree.topLevelItemCount;;
        var flag;
        if(count1 > parseInt(count))
        {
            for(var i=0;i<count1;i++)
            {
                var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(i);
                if(obj_TreeTopLevelItem.text(3) == "1018")
                {
                    if(obj_TreeTopLevelItem.text(0) == "No")
                    {
                        flag =1;
                        break;
                    }
                }
            }
            if(flag == 1)
            {
                test.log("Voucher is voided and closed");
            }
            else
                test.fail("Voucher is open");
            
        }
        else
            test.fail("voucher is not voided");
        
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Exception in voiding voucher" + e);
    }
    
//    
    //------- Verify GL entry for voided Miscellaneous voucher ------
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions..."));
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear()
                type(":_filterGroup.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear()
                type(":_filterGroup.XDateEdit_XDateEdit_2", "0");
        nativeType("<Tab>");
        
        clickButton(waitForObject(":_filterGroup.+_QToolButton"));
        
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox", "Document #",10, 10, 0, Qt.LeftButton);
        type(waitForObject(":_filterGroup.widget3_QLineEdit"), miscVouch);
        clickButton(waitForObject(":_filterGroup.+_QToolButton"));
        waitForObject(":_filterGroup.xcomboBox4_XComboBox");
        clickItem(":_filterGroup.xcomboBox4_XComboBox", "GL Account",10, 10, 0, Qt.LeftButton);
        type(waitForObject(":_filterGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        var qTree = findObject(":_list_XTreeWidget_3");
        var row1 = qTree.topLevelItem(0);
        var row2 = qTree.topLevelItem(1);
        var dvalue = row1.text(8);
        var cvalue = row2.text(7);
        if(dvalue == cvalue)
        {
            test.pass("voucher amount for Misc. dist. account balanced on voiding");    
        }
        else
        {
            test.fail(" voucher amount for Misc. dist. account is not balanced ");
        }
        type(waitForObject(":_filterGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-2370-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        var qTree = findObject(":_list_XTreeWidget_3");
        var row1 = qTree.topLevelItem(0);
        var row2 = qTree.topLevelItem(1);
        var dvalue = row1.text(8);
        var cvalue = row2.text(7);
        if(dvalue == cvalue)
        {
            test.pass("voucher amount for Tax code balanced on voiding");    
        }
        else
        {
            test.fail(" voucher amount for Tax code is not balanced ");
        }
        type(waitForObject(":_filterGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-6200-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        var qTree = findObject(":_list_XTreeWidget_3");
        var row1 = qTree.topLevelItem(0);
        var row2 = qTree.topLevelItem(1);
        var dvalue = row1.text(8);
        var cvalue = row2.text(7);
        if(dvalue == cvalue)
        {
            test.pass("voucher amount for Expense category balanced on voiding");    
        }
        else
        {
            test.fail(" voucher amount for Expense category is not balanced ");
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
    }
    catch(e)
    {
        test.fail("Exception in assigning privileges to the user" + e);
    } 
    
       //------------ Select voucher for payment ---------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select..."));
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", vonum4, 42, 9, 0, Qt.LeftButton);
        clickButton(waitForObject(":frame.Select..._QPushButton"));
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        var camount = findObject(":Cash Receipt.XLineEdit_XLineEdit").text;
        waitForObject(":_bankaccnt_XComboBox");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 121, 5, 0, Qt.LeftButton);
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in selecting voucher for payment" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
    
    //---------- Prepare check run, void and delete the check ------
    
    try
    {	var checkWidget,count,count1,count2,row,amount,camount1,flag,i;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run..."));
     
        checkWidget = findObject(":_frame._check_XTreeWidget");
        count = checkWidget.topLevelItemCount;
        flag = 0;       
        clickButton(waitForObject(":xTuple ERP:*.Prepare..._QPushButton"));
        clickButton(waitForObject(":Prepare Check Run.Prepare_QPushButton"));
        waitForObject(":_frame._check_XTreeWidget");
        checkWidget = findObject(":_frame._check_XTreeWidget");
        count1 = checkWidget.topLevelItemCount;
        if(count1>count)
        {
            for(i=0;i<count1;i++)
            {
                row = checkWidget.topLevelItem(i);
                amount = row.text(6);
                amount = replaceSubsting(amount);
                camount1 = replaceSubsting(camount);
                if(amount == camount1)
                {
                    flag = 1;
                    break;
                }
            }
        }
        else
            test.fail("check not created");
        
        if(flag == 1)
            test.pass("Check created successfully");
        else
            test.fail("Check not created");
        
        flag = 0;
       
        waitForObject(":_frame._check_XTreeWidget");
        clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
        clickButton(waitForObject(":_frame.Void_QPushButton"));

        waitForObject(":_frame._check_XTreeWidget");
        checkWidget = findObject(":_frame._check_XTreeWidget");        
        row = checkWidget.topLevelItem(0);
        
        if(row.text(0) == "Yes")
      
            test.pass("Check voided successfully");
       
        else
            
            test.fail("check is not voided");
        
        waitForObject(":_frame._check_XTreeWidget");
        clickItem(":_frame._check_XTreeWidget", "Yes", 5, 5, 1, Qt.LeftButton);
        clickButton(waitForObject(":_frame.Delete_QPushButton"));
        waitForObject(":_frame._check_XTreeWidget");
        checkWidget = findObject(":_frame._check_XTreeWidget");
        count2 = checkWidget.topLevelItemCount;
        if(count2 == 0)
        {
            test.pass("check deleted successfully");
        }
        else
            test.fail("Check is not deleted");
        
    clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
                  
    }
    catch(e)
    {
        test.fail("Exception in voiding check" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
 }
    
     //-----Extracting OS Name-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
       
        waitForObjectItem(":Setup._tree_XTreeWidget", "Configure.Encryption");
        clickItem(":Setup._tree_XTreeWidget", "Configure.Encryption", 26, 6, 0, Qt.LeftButton);
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
//    var linuxPath, winPath;
//    try
//    {
//   
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
//        activateItem(":xTuple ERP: *_QMenuBar", "System");
//        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...")
//        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
//        waitForObjectItem(":Setup._tree_XTreeWidget", "Configure.Encryption");
//        clickItem(":Setup._tree_XTreeWidget", "Configure.Encryption", 46, 9, 0, Qt.LeftButton);
//        
//       
//        waitForObject(":_stack_FileLineEdit_2");
//        linuxPath = findObject(":_stack_FileLineEdit_2").text;
//        waitForObject(":_stack_FileLineEdit");
//        winPath = findObject(":_stack_FileLineEdit").text;
//        
//        waitForObject(":Setup.Save_QPushButton");
//        clickButton(":Setup.Save_QPushButton");
//    }
//    catch(e)
//    {
//        test.fail("Error in extracting OS name" + e);
//    }
 

    //------------ Re-Select voucher for payment ---------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select..."));
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", vonum4, 42, 9, 0, Qt.LeftButton);
        clickButton(waitForObject(":frame.Select..._QPushButton"));
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        var camount = findObject(":Cash Receipt.XLineEdit_XLineEdit").text;
        waitForObject(":_bankaccnt_XComboBox");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 121, 5, 0, Qt.LeftButton);
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in selecting voucher for payment" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
  
    //---------- Prepare check run and print the check------
    
    try
    {	var checkWidget,count,count1,count2,row,amount,camount1,flag,i,eftno;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run..."));
      
        checkWidget = findObject(":_frame._check_XTreeWidget");
        count = checkWidget.topLevelItemCount;
        flag = 0;       
        clickButton(waitForObject(":xTuple ERP:*.Prepare..._QPushButton"));
        clickButton(waitForObject(":Prepare Check Run.Prepare_QPushButton"));
        waitForObject(":_frame._check_XTreeWidget");
        checkWidget = findObject(":_frame._check_XTreeWidget");
        count1 = checkWidget.topLevelItemCount;
        if(count1>count)
        {
            for(i=0;i<count1;i++)
            {
                row = checkWidget.topLevelItem(i);
                amount = row.text(6);
                amount = replaceSubsting(amount);
                camount1 = replaceSubsting(camount);
                if(amount == camount1)
                {
                    flag = 1;
                    break;
                }
            }
        }
        else
            test.fail("check not created");
        
        if(flag == 1)
            test.pass("Check created successfully");
        else
            test.fail("Check not created");
        
        flag = 0;
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
        if(object.exists(":Print Checks.Print_QPushButton_2"))
        {
            sendEvent("QMouseEvent", waitForObject(":Print Checks.Print_QPushButton_2"), QEvent.MouseButtonPress, 54, 15, Qt.LeftButton, 0);
            sendEvent("QMouseEvent", waitForObject(":Print Checks.Print_QPushButton_2"), QEvent.MouseButtonRelease, 54, 15, Qt.LeftButton, 1);
    }
        clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        findObject(":filename_QLineEdit").clear();
        type(waitForObject(":filename_QLineEdit"), "2");
        clickButton(waitForObject(":Print.Print_QPushButton"));
        clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        checkWidget = findObject(":_frame._check_XTreeWidget");
        row = checkWidget.topLevelItem(0);
        chkno = row.text(3);
       
    }
    clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    
}
    catch(e)
    {
        test.fail("Exception in voiding check" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    //-----Post the check---
    try
    {

        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Post Checks..."));
        waitForObject(":Post Checks._bankaccnt_XComboBox");
        clickItem(":Post Checks._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in posting checks" + e);
    }
    
    //------Check register----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Check Register..."));
        
        waitForObject(":_bankaccnt_XComboBox_2");
        clickItem(":_bankaccnt_XComboBox_2", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_dateGroup.XDateEdit_XDateEdit_3"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        if(OS.name == "Windows")
        {
            waitForObject(":_frame._check_XTreeWidget");
            clickItem(":_frame._check_XTreeWidget", eftno, 28, 4, 0, Qt.LeftButton);
            openItemContextMenu(waitForObject(":_frame._check_XTreeWidget"), eftno, 16, 8, 0);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Void Posted Check..."));
            clickButton(waitForObject(":Enter a Date.OK_QPushButton"));
            flag = 0;
            waitForObject(":_frame._check_XTreeWidget");
            var regWidget = findObject(":_frame._check_XTreeWidget");
            count = regWidget.topLevelItemCount;
            for(i=0;i<count;i++)
            {
                row = regWidget.topLevelItem(i);
                if(row.text(10) == eftno)
                {
                    if(row.text(0) == "Yes")
                    {
                        flag = 1;
                        break;
                    }
                    else
                    {
                        flag = 0;
                        break;
                    }
                }
            }
        }
        else if (OS.name == "Linux")
        {
            waitForObject(":_frame._check_XTreeWidget");
            clickItem(":_frame._check_XTreeWidget", chkno, 28, 4, 0, Qt.LeftButton);
            openItemContextMenu(waitForObject(":_frame._check_XTreeWidget"), chkno, 16, 8, 0);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Void Posted Check..."));
            
            clickButton(waitForObject(":Enter a Date.OK_QPushButton"));
            flag = 0;
            waitForObject(":_frame._check_XTreeWidget");
            var regWidget = findObject(":_frame._check_XTreeWidget");
            count = regWidget.topLevelItemCount;
            for(i=0;i<count;i++)
            {
                row = regWidget.topLevelItem(i);
                if(row.text(4) == chkno)
                {
                    if(row.text(0) == "Yes")
                    {
                        flag = 1;
                        break;
                    }
                    else
                    {
                        flag = 0;
                        break;
                    }
                }
            }
        }	
            
        if(flag == 1)
        {
            test.pass("Check voided successfully");
        }
        else
            test.fail("Check is not voided");
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Exception in voiding posted check" + e);
    }
    
    //------Verifying voided check in view check run screen----
    try
    {	
        var checkWidget,count,count1,count2,row,amount,camount1,flag,i,eftno;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run..."));
        if (OS.name == "Windows")
        {
            checkWidget = findObject(":_frame._check_XTreeWidget");
            count = checkWidget.topLevelItemCount;
            for(i=0;i<count;i++)
            {
                row = checkWidget.topLevelItem(i);
                if(eftno == row.text(8))
                {
                    test.pass("check voided and present in view check run screen");
                    break;
                }
            }
        }
        else if (OS.name == "Linux")
        {
            checkWidget = findObject(":_frame._check_XTreeWidget");
            count = checkWidget.topLevelItemCount;
            for(i=0;i<count;i++)
            {
                row = checkWidget.topLevelItem(i);
                if(chkno == row.text(3))
                {
                    test.pass("check voided and present in view check run screen");
                    break;
                }
            }
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in verifying voided check " + e);
    }
}