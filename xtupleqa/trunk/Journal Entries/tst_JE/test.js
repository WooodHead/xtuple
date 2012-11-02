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
            waitForObjectItem(":xTuple ERP:  *.System_QMenu", "Preferences...");
            activateItem(":xTuple ERP:  *.System_QMenu", "Preferences..."); 
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
        
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP:  *.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:  *.System_QMenu", "Rescan Privileges");
        snooze(3);
    }
    catch(e)
    {
        test.fail("Error in editing preferences"+ e);
    }  
    
    //--------Exiting the application------
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
    activateItem(waitForObjectItem(":xTuple ERP:  *.System_QMenu", "Exit xTuple ERP..."));
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    snooze(3);
    
  
  //---find Application Edition------ 
  var appEdition = findApplicationEdition();
  
    //-----Setting Encryption Key----- 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        snooze(0.5);
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
    }
    catch(e)
    {
        test.fail("Error in setting the encryption configuration" + e);
    }
  
    //------Accounting Setup-------
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup..."));
    snooze(1);
    if(!findObject(":Options:.Mandatory notes for Manual Journal Entries_QCheckBox").checked)
        clickButton(waitForObject(":Options:.Mandatory notes for Manual Journal Entries_QCheckBox"));
    clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    if(object.exists(":Sales Order.No_QPushButton_2"))
        clickButton(waitForObject(":Sales Order.No_QPushButton_2"));
    //--------------- Set the window to Tab view mode -------------
    
    tabView(); 
    //---------Creating a simple Journal entry-------
    var flag = 0;
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt._currency_XComboBox");
        clickItem(":Cash Receipt._currency_XComboBox", "USD - $", 0, 0, 5, Qt.LeftButton);
        findObject(":Simple G/L Journal Entry.XDateEdit_XDateEdit").clear();
        type(waitForObject(":Simple G/L Journal Entry.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "1246");
        
        var docNum = findObject(":Simple G/L Journal Entry._docNumber_XLineEdit").text;
        
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1010-01");
        nativeType("<Tab>");
        type(waitForObject(":frame._notes_XTextEdit"), "Simple GL entry");
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
        flag = 1;
    }
    catch(e)
    {
        test.fail("error in creating simple Journal entry"+ e);
        if(object.exists(":Simple G/L Journal Entry.Cancel_QPushButton"))
            clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
    }
    //----- G/L transaction verification  -----
    if(flag)
    {
        var bool = glTransactions(/Simple GL entry/,docNum);
        if(bool == 1)
        {
            test.pass("JE " + docNum + " has a GL entry ");
        }
        else
            test.fail("No GL entry is made for the  simple Journal entry " + docNum);
    }
    //---------Posting a simple Journal entry without 'Notes'-------
    
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt._currency_XComboBox");
        clickItem(":Cash Receipt._currency_XComboBox", "USD - $", 0, 0, 5, Qt.LeftButton);
        findObject(":Simple G/L Journal Entry.XDateEdit_XDateEdit").clear();
        type(waitForObject(":Simple G/L Journal Entry.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "1247");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1010-01");
        nativeType("<Tab>");
        
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        snooze(1);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            test.pass("unable to post Journal entry without notes");
            clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
        }
        else 
            test.fail("Journal entry posted sucessfully without notes");
        
    }
    catch(e)
    {
        test.fail("error in creating simple Journal entry"+e);
        if(object.exists(":Simple G/L Journal Entry.Cancel_QPushButton"))
            clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
    }
    
    //------Accounting Setup-----------
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup..."));
    snooze(1);
    if(findObject(":Options:.Mandatory notes for Manual Journal Entries_QCheckBox").checked)
        clickButton(waitForObject(":Options:.Mandatory notes for Manual Journal Entries_QCheckBox"));
    clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    snooze(0.5);
    if(object.exists(":Sales Order.No_QPushButton_2"))
        clickButton(waitForObject(":Sales Order.No_QPushButton_2"));
    //-----Posting a journal entry without notes-------
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt._currency_XComboBox");
        clickItem(":Cash Receipt._currency_XComboBox", "USD - $", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        findObject(":Simple G/L Journal Entry.XDateEdit_XDateEdit").clear();
        type(waitForObject(":Simple G/L Journal Entry.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "1247");
        var docNum = findObject(":Simple G/L Journal Entry._docNumber_XLineEdit").text;
        
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1010-01");
        nativeType("<Tab>");
        
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
        test.log("Journal Entry has been posted without notes succesfully");
        
    }
    catch(e)
    {
        test.fail("error in creating simple Journal entry"+e);
        if(object.exists(":Simple G/L Journal Entry.Cancel_QPushButton"))
            clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
        
    }
    
    //---------Cancelling a Journal entry without saving-----
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt._currency_XComboBox");
        clickItem(":Cash Receipt._currency_XComboBox", "USD - $", 0, 0, 5, Qt.LeftButton);
        findObject(":Simple G/L Journal Entry.XDateEdit_XDateEdit").clear();
        type(waitForObject(":Simple G/L Journal Entry.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "1245");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1010-01");
        nativeType("<Tab>");
        type(waitForObject(":frame._notes_XTextEdit"), "Simple G/L entry");
        clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
        test.log("Cancelling a simple G/L entry is successful ")
                
            }
    catch(e)
    {
        test.fail("error in cancelling simple Journal entry"+e);
    }
    //---------------Series G/L  Entries-----------------
    //------Accounting Setup--------
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup..."));
    snooze(1);
    if(!findObject(":Options:.Mandatory notes for Manual Journal Entries_QCheckBox").checked)
        clickButton(waitForObject(":Options:.Mandatory notes for Manual Journal Entries_QCheckBox"));
    clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    snooze(0.5);
    if(object.exists(":Sales Order.No_QPushButton_2"))
        clickButton(waitForObject(":Sales Order.No_QPushButton_2"));
    
    //---------Creating a series Journal entry-------
    flag = 0;
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Series..."));
        
        type(waitForObject(":_docnumber_XLineEdit"), "1250");
        var docNum = findObject(":_docnumber_XLineEdit").text;
        
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Series G/L Journal Entry.New_QPushButton"));
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Debit_QRadioButton"));
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        snooze(0.5);
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Credit_QRadioButton"));
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1010-01");
        nativeType("<Tab>");
        snooze(0.5);
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":General Ledger Transaction Series Item.Cancel_QPushButton"));
        type(waitForObject(":_notes_XTextEdit"), "Series GL entry");
        
        clickButton(waitForObject(":Series G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Series G/L Journal Entry.Cancel_QPushButton")); 
        flag = 1;
    }
    catch(e)
    {
        test.fail("error in creating series journal entry" +e);
        if(object.exists(":Series G/L Journal Entry.Cancel_QPushButton"))
            clickButton(waitForObject(":Series G/L Journal Entry.Cancel_QPushButton"));
    }
    
    //----- G/L transaction verification  -----
    if(flag)
    {
        var bool = glTransactions(/Series GL entry/,docNum);
        if(bool == 1)
        {
            test.pass("JE " + docNum + " has a GL entry ");
        }
        else
            test.fail("No GL entry is made for the  simple Journal entry " + docNum);
    }
    //---------Saving  a series Journal entry-------
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Series..."));
        snooze(0.5);
        type(waitForObject(":_docnumber_XLineEdit"), "1251");
        var docNum1 = findObject(":_docnumber_XLineEdit").text;
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Series G/L Journal Entry.New_QPushButton"));
        snooze(0.5);
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Debit_QRadioButton"));
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Credit_QRadioButton"));
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1010-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":General Ledger Transaction Series Item.Cancel_QPushButton"));
        type(waitForObject(":_notes_XTextEdit"), "Series GL entry");
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {
        test.fail("error in saving series journal entry" +e);
        if(object.exists(":Series G/L Journal Entry.Cancel_QPushButton"))
            clickButton(waitForObject(":Series G/L Journal Entry.Cancel_QPushButton"));
    }
    //---------Creating a series Journal entry without notes-------
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Series..."));
        snooze(0.5);
        type(waitForObject(":_docnumber_XLineEdit"), "1252");
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Series G/L Journal Entry.New_QPushButton"));
        snooze(0.5);
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Debit_QRadioButton"));
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        
        clickButton(waitForObject(":General Ledger Transaction Series Item.Credit_QRadioButton"));
        
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1010-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":General Ledger Transaction Series Item.Cancel_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":Series G/L Journal Entry.Post_QPushButton"));
        snooze(0.5);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            test.pass("unable to post series journal entry without notes");
            type(waitForObject(":_notes_XTextEdit"), "Series GL entry");
            clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        }
        else 
            test.fail("Series Journal entry posted sucessfully without notes");
    }
    catch(e)
    {
        test.fail("error in creating series Journal entry"+e);
        if(object.exists(":Series G/L Journal Entry.Cancel_QPushButton"))
            clickButton(waitForObject(":Series G/L Journal Entry.Cancel_QPushButton"));
    } 
    
    //---------Creating a series Journal entry-------
    
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Series..."));
        snooze(0.5);
        type(waitForObject(":_docnumber_XLineEdit"), "1253");
        var docNum = findObject(":_docnumber_XLineEdit").text;
        nativeType("<Tab>");
        
        //-------Create 'Transaction Series Item' without entering ditribution date-----
        clickButton(waitForObject(":Series G/L Journal Entry.New_QPushButton"));
        snooze(0.5);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        { 
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            test.pass("Unable to create Transaction Series Item without entering ditribution date");
            type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
            nativeType("<Tab>");
        }
        else
            test.fail("Transaction Series Item is created without entering ditribution date");
        
        //------Creating 'debit'  type ‘Transaction Series Item’-----
        clickButton(waitForObject(":Series G/L Journal Entry.New_QPushButton"));
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Debit_QRadioButton"));
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        //------Creating 'Credit'  type ‘Transaction Series Item’-----
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        
        clickButton(waitForObject(":General Ledger Transaction Series Item.Credit_QRadioButton"));
        
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1010-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":General Ledger Transaction Series Item.Cancel_QPushButton"));
        
        //--------Editing a ‘Transaction Series Item’----
        waitForObject(":Series G/L Journal Entry._glseries_XTreeWidget");
        clickItem(":Series G/L Journal Entry._glseries_XTreeWidget", "01-01-1000-01-Cash at eBank", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        snooze(0.5);
        findObject(":xTuple ERP:*.XLineEdit_XLineEdit").clear();
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "200");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        //-----Posting an unbalanced  ‘Series  G/L   Journal Entry’--------  
        clickButton(waitForObject(":Series G/L Journal Entry.Post_QPushButton"));
        snooze(0.5);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        { 
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            test.pass("Unable to post an unbalanced  Series  G/L Journal Entry");
        }
        else
            test.fail("able to post an unbalanced  Series  G/L   Journal Entry");
        //-----Deleting a ‘Transaction Series Item’----------
        waitForObject(":Series G/L Journal Entry._glseries_XTreeWidget");
        clickItem(":Series G/L Journal Entry._glseries_XTreeWidget", "01-01-1000-01-Cash at eBank", 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Series G/L Journal Entry.Delete_QPushButton"));
        nativeType("<Tab>");
        snooze(1);
        nativeType("<Tab>");
        clickButton(waitForObject(":Series G/L Journal Entry.New_QPushButton"));
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "100");
        nativeType("<Tab>");        
        clickButton(waitForObject(":General Ledger Transaction Series Item.Debit_QRadioButton"));
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":General Ledger Transaction Series Item.Cancel_QPushButton"));
        //-------Cancelling ‘Series  G/L   Journal Entry’-----------
        //-----Selecting 'No' in Confirmation dialog-----
        clickButton(waitForObject(":Series G/L Journal Entry.Cancel_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":Sales Order.No_QPushButton_2"));
        if(object.exists(":Series G/L Journal Entry_glSeries"))
            test.pass("Journal Entry series screen doesn't closed by selecting 'No' in the 'Delete G/L series' dialog");
        
        //-----Selecting  'Yes' in Confirmation dialog----------
        clickButton(waitForObject(":Series G/L Journal Entry.Cancel_QPushButton"));
        clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
    }
    catch(e)
    {
        test.fail("error in creating series Journal entry"+e);
        if(object.exists(":General Ledger Transaction Series Item.Cancel_QPushButton"))
            clickButton(waitForObject(":General Ledger Transaction Series Item.Cancel_QPushButton"));
        if(object.exists(":Series G/L Journal Entry.Cancel_QPushButton"))
            clickButton(waitForObject(":Series G/L Journal Entry.Cancel_QPushButton"));
        if(object.exists(":Sales Order.Yes_QPushButton"))
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        
    } 
    
    
    //---------List of Unposted  Journal entries-------
    
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry");
        waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "List Unposted...")
                activateItem(":xTuple ERP:*.Journal Entry_QMenu", "List Unposted...");
        
        //----Creating 'New' Journal series------
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
        type(waitForObject(":_docnumber_XLineEdit"), "1261");
        nativeType("<Tab>");
        
        var docNum = findObject(":_docnumber_XLineEdit").text;
        
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Series G/L Journal Entry.New_QPushButton"));
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), "20");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Credit_QRadioButton"));
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1010-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":General Ledger Transaction Series Item.Cancel_QPushButton"));
        type(waitForObject(":_notes_XTextEdit"), "GL notes");
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        
        if(object.exists("{column='3' container=':_glseries_XTreeWidget' text='"+docNum+"' type='QModelIndex'}"))
            test.pass("journal entry series created sucessful from List Unposted screen");
        else
            test.fail("error in creation of journal entry series from List Unposted screen");
    }
    catch(e)
    {
        test.fail("Error in creating series journal entry" +e);
        if(object.exists(":Series G/L Journal Entry.Cancel_QPushButton"))
            clickButton(waitForObject(":Series G/L Journal Entry.Cancel_QPushButton"));
    }
    
    //---------Some external flows in List -------
    flag = 0;
    try{
        //---Editing a Journal entry series---------
        waitForObject(":_glseries_XTreeWidget");
        clickItem(":_glseries_XTreeWidget", docNum, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        snooze(1);
        waitForObject(":_notes_XTextEdit").clear();
        type(waitForObject(":_notes_XTextEdit"), "GL Inv");
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        snooze(0.5);
        //----Posting a Journal entry series---------
        waitForObject(":_glseries_XTreeWidget");
        clickItem(":_glseries_XTreeWidget", docNum, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        
        //------Deleting a Journal entry series---------
        waitForObject(":_glseries_XTreeWidget");
        clickItem(":_glseries_XTreeWidget", "1251", 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Delete_QPushButton"));
        nativeType("<Tab>");
        snooze(1);
        nativeType("<Tab>");
        //---selecting 'no' in confirmation dialog---
        clickButton(waitForObject(":Sales Order.No_QPushButton_2"));
        if(object.exists("{column='3' container=':_glseries_XTreeWidget' text='"+docNum1+"' type='QModelIndex'}"))
            test.pass("Journal Entry series doesn't deleted by selecting 'No' in the 'Delete G/L series' dialog");
        else
            test.fail("Journal Entry series deleted by selecting 'No' in the 'Delete G/L series' dialog");
        //---selecting 'Yes' in confirmation dialog---
        waitForObject(":_glseries_XTreeWidget");
        clickItem(":_glseries_XTreeWidget", docNum1,  0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Delete_QPushButton"));
       snooze(0.5);
        clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
         nativeType("<Tab>");
        snooze(1);
        nativeType("<Tab>");
        if(!object.exists("{column='3' container=':_glseries_XTreeWidget' text='"+docNum1+"' type='QModelIndex'}"))
            test.pass("Journal Entry series deleted by selecting 'Yes' in the 'Delete G/L series' dialog");
        else
            test.fail("Journal Entry series doesn't  deleted by selecting 'Yes' in the 'Delete G/L series' dialog");
        
        
        //----Posting a Journal entry series into closed Accounting period---------
        waitForObject(":_glseries_XTreeWidget");
        clickItem(":_glseries_XTreeWidget","1252",  0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        snooze(1);
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "1/1/10");
        snooze(0.5);
        nativeType("<Tab>");
        
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        
        
        waitForObject(":_glseries_XTreeWidget");
        clickItem(":_glseries_XTreeWidget", "1252",  0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        
        
        if(object.exists(":Failed Post List._label_QTextEdit"))
        {
            clickButton(waitForObject(":Failed Post List.OK_QPushButton"));
            test.pass("it is not possible to post Journal entry series into closed period");
        }
        else 
            test.fail("it is possible to post Journal entry series into closed period");
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        flag = 1;
    }
    catch(e)
    {
        test.fail("Error in saving series journal entry" +e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    //----- G/L transaction verification  -----
    if(flag)
    {
        var bool = glTransactions(/GL Inv/,docNum);
        if(bool == 1)
        {
            test.pass("JE "+docNum+ " has a GL entry ");
        }
        else
            test.fail("No GL entry is made for the  simple Journal entry "+docNum);
    }
  
    //--------Creating a new Company-----------
    flag = 0;
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP:*.Account_QMenu", "Companies...");
        activateItem(":xTuple ERP:*.Account_QMenu", "Companies...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        snooze(1);
        waitForObject(":_number_XLineEdit_2");
        type(":_number_XLineEdit_2", "02");
        waitForObject(":_descrip_XTextEdit");
        type(":_descrip_XTextEdit", "Company New-05");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        snooze(0.5);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {	waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
        }
        snooze(0.5);
        if(object.exists("{column='0' container=':xTuple ERP:*._company_XTreeWidget' text='02' type='QModelIndex'}"))
        {
            test.pass("Company created sucessful");
            flag = 1;
        }
        else
        {
            test.fail("Error in creating a Company");
            flag = 0;
        }
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in creating a company" + e);
        if(object.exists(":Company Number.Cancel_QPushButton"))
            clickButton(waitForObject(":Company Number.Cancel_QPushButton"));
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    
    //-----------Creating Chart of Accounts--------
    if(flag)
    {
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Account");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "Account");
            waitForObjectItem(":xTuple ERP:*.Account_QMenu", "Chart of Accounts...");
            activateItem(":xTuple ERP:*.Account_QMenu", "Chart of Accounts...");
            snooze(1);
            COA("02","01","2136","01","Desc1","Equity","ERE-Equity Retained Earnings");
            snooze(1);
            COA("02","01","2163","01","Desc2","Expense","EXP-Expenses");
            snooze(0.5);
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in creating Chart of Accounts"+e);
            if(object.exists(":Account Number.Cancel_QPushButton"))
                clickButton(waitForObject(":Account Number.Cancel_QPushButton"));
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            
        }
        //-----------Creating a Simple Journal Entry-------
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry");
            activateItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry");
            waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple...");
            activateItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple...");
            
            waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit");
            type(":Simple G/L Journal Entry.XLineEdit_XLineEdit", "100");
            nativeType("<Tab>");
            
            waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit");
            type(":Simple G/L Journal Entry._docNumber_XLineEdit", "1256");
            nativeType("<Tab>");
            
            waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit");
            type(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit", "02-01-2163-01");
            nativeType("<Tab>");
            snooze(0.1);
            if(object.exists(":Sales Order.OK_QPushButton_2"))  
            {	
                waitForObject(":Sales Order.OK_QPushButton_2");
                clickButton(":Sales Order.OK_QPushButton_2");
                test.pass("Unable to assign incomplete Company Accounts");
            }
            else
                test.fail("Incomplete Company accounts assigned sucessful");
            
            waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2");
            type(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2", "02-01-2136-01");
            nativeType("<Tab>");
            snooze(0.1);
            if(object.exists(":Sales Order.OK_QPushButton_2"))  
            {	
                waitForObject(":Sales Order.OK_QPushButton_2");
                clickButton(":Sales Order.OK_QPushButton_2");
                test.pass("Unable to assign incomplete Company Accounts");
            }
            else
                test.fail("Incomplete Company accounts assigned sucessful");
            waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton");
            clickButton(":Simple G/L Journal Entry.Cancel_QPushButton");
            
        }
        catch(e)
        {
            test.fail("error in creating a simple journal entry"+e);
            snooze(1);
            if(object.exists(":Simple G/L Journal Entry.Cancel_QPushButton"))
                clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
        }
    }
    //------------------Standard Journals---------------------
    //----------------Creating a Standard Journal-------
    
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "New...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "New...");
        waitForObject(":Standard Journal._name_XLineEdit");
        type(":Standard Journal._name_XLineEdit", "START-ORDER");
        
        waitForObject(":Standard Journal._descrip_XLineEdit");
        type(":Standard Journal._descrip_XLineEdit", "Standard Journal-1");
        
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Sense.Debit_QRadioButton");
        clickButton(":Sense.Debit_QRadioButton");
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1000-01");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Item._notes_XTextEdit");
        type(":Standard Journal Item._notes_XTextEdit", "Standard Journal Debit");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Sense.Credit_QRadioButton");
        clickButton(":Sense.Credit_QRadioButton");
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit","01-01-1010-01");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Item._notes_XTextEdit");
        type(":Standard Journal Item._notes_XTextEdit", "Standard Journal Credit");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Standard Journal._notes_XTextEdit");
        type(":Standard Journal._notes_XTextEdit", "Std. Journal Notes");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        test.log("Standard Journal created");
    }
    catch(e)
    {
        test.fail("Error in creating Standard Journal");
        if(object.exists(":Sales Order.Cancel_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_2"));
    }
    
    //------Creating a Standard Journal to Perform Some External Flow cases-----------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "New...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "New...");
        waitForObject(":Standard Journal._name_XLineEdit");
        type(":Standard Journal._name_XLineEdit", "journal_2");
        nativeType("<Tab>");
        waitForObject(":Standard Journal._descrip_XLineEdit");
        type(":Standard Journal._descrip_XLineEdit", "journal2");
        nativeType("<Tab>");
        //-----Creating a Debit type Standard Journal Item
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1000-01");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Item._notes_XTextEdit");
        type(":Standard Journal Item._notes_XTextEdit", "Standard Journal Debit");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        //-----Creating a Credit type Standard Journal Item
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Sense.Credit_QRadioButton");
        clickButton(":Sense.Credit_QRadioButton");
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit","01-01-1010-01");
        waitForObject(":Standard Journal Item._notes_XTextEdit");
        type(":Standard Journal Item._notes_XTextEdit", "Standard Journal Credit");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        //---Editing a  Standard Journal Item
        waitForObject(":_stdjrnlitem.01-01-1000-01-Cash at eBank_QModelIndex");
        mouseClick(":_stdjrnlitem.01-01-1000-01-Cash at eBank_QModelIndex", 98, 9, 0, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Edit_QPushButton");
        clickButton(":xTuple ERP:*.Edit_QPushButton");
        findObject(":xTuple ERP:*.XLineEdit_XLineEdit").clear();
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit", "200");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        //---Deleting Standard Journal Item
        waitForObject(":_stdjrnlitem.01-01-1000-01-Cash at eBank_QModelIndex");
        mouseClick(":_stdjrnlitem.01-01-1000-01-Cash at eBank_QModelIndex", 129, 2, 0, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Delete_QPushButton");
        clickButton(":xTuple ERP:*.Delete_QPushButton");
        
        
        //-------Creating Standard Journal Item
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Sense.Debit_QRadioButton");
        clickButton(":Sense.Debit_QRadioButton");
        
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1000-01");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Item._notes_XTextEdit");
        type(":Standard Journal Item._notes_XTextEdit", "Standard Journal Debit");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        //------Cancelling Standard Journal Item
        
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Sense.Debit_QRadioButton");
        clickButton(":Sense.Debit_QRadioButton");
        
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1000-01");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Item._notes_XTextEdit");
        type(":Standard Journal Item._notes_XTextEdit", "Standard Journal Debit");
        waitForObject(":Sales Order.Cancel_QPushButton_2");
        clickButton(":Sales Order.Cancel_QPushButton_2");
        
        //---Cancelling Standard Journal without Saving
        
        waitForObject(":Standard Journal._notes_XTextEdit");
        type(":Standard Journal._notes_XTextEdit", "Standard journal Cancelling");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
    }
    catch(e)
    { 
        test.fail("Error in creating Standard Journal");
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    
    //---------List of Standard Journals-------------
    flag = 0;
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "List...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "List...");
        
        //-------Creating a Standard Journal from the list-------
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":Standard Journal._name_XLineEdit");
        type(":Standard Journal._name_XLineEdit", "END-ORDER");
        nativeType("<Tab>");
        waitForObject(":Standard Journal._descrip_XLineEdit");
        type(":Standard Journal._descrip_XLineEdit", "02new");
        nativeType("<Tab>");
        snooze(2);
        
        waitForObject(":Standard Journal.New_QPushButton");
        clickButton(":Standard Journal.New_QPushButton");
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Sense.Debit_QRadioButton");
        clickButton(":Sense.Debit_QRadioButton");
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1000-01");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Item._notes_XTextEdit");
        type(":Standard Journal Item._notes_XTextEdit", "Standard Journal Debit");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Standard Journal.New_QPushButton");
        clickButton(":Standard Journal.New_QPushButton");
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Sense.Credit_QRadioButton");
        clickButton(":Sense.Credit_QRadioButton");
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit","01-01-1010-01");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Item._notes_XTextEdit");
        type(":Standard Journal Item._notes_XTextEdit", "Standard Journal Credit");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Standard Journal._notes_XTextEdit");
        type(":Standard Journal._notes_XTextEdit", "Creating a Standard Journal from the list");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        if(object.exists("{column='0' container=':xTuple ERP:*._stdjrnl_XTreeWidget' text='END-ORDER' type='QModelIndex'}"))
            test.pass("Standard Journal Creation from the list is sucessful");
        else
            test.fail("Error in creating Standard Journal from the list");
        
        
        //---Edting a Standard Journal from the list
        
        waitForObject(":xTuple ERP:*._stdjrnl_XTreeWidget");
        clickItem(":xTuple ERP:*._stdjrnl_XTreeWidget","END-ORDER",0, 0, 5, Qt.LeftButton);
        
        waitForObject(":xTuple ERP:*.Edit_QPushButton");
        clickButton(":xTuple ERP:*.Edit_QPushButton");
        
        waitForObject(":Standard Journal._notes_XTextEdit");
        
        type(":Standard Journal._notes_XTextEdit", "editing from list");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        //----Deleting a Standard Journal
        waitForObject(":xTuple ERP:*._stdjrnl_XTreeWidget");
        clickItem(":xTuple ERP:*._stdjrnl_XTreeWidget","END-ORDER", 0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Delete_QPushButton");
        clickButton(":xTuple ERP:*.Delete_QPushButton");
        if(!object.exists("{column='0' container=':xTuple ERP:*._stdjrnl_XTreeWidget' text='END-ORDER' type='QModelIndex'}"))
            test.pass("Standard Journal deleted sucessful");
        else
            test.fail("Error in deleting Standard Journal");
        snooze(1);
        //-----Posting a Standard Journal
        waitForObject(":xTuple ERP:*._stdjrnl_XTreeWidget");
        clickItem(":xTuple ERP:*._stdjrnl_XTreeWidget","START-ORDER", 0, 0, 5, Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        snooze(1);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        snooze(0.5);
        waitForObject(":Series G/L Journal Entry.Post_QPushButton");
        clickButton(":Series G/L Journal Entry.Post_QPushButton");
        
        //---Closing Standard Journal list
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        flag = 1;
    }
    catch(e)
    {
        test.fail("Error in performing Some External Flow cases from the Standard Journal list"+ e);
        if(object.exists(":Sales Order.Cancel_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_2"));
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }
    
    
    //----- G/L transaction verification  -----
    if(flag)
    {
        var bool = glTransactions(/Standard Journal Debit/,"START-ORDER");
        if(bool == 1)
        {
            test.pass(" Standard Journal Entry START-ORDER has a GL entry ");
        }
        else
            test.fail("No GL entry is made for the  Standard Journal entry " + "START-ORDER");   
    }
    //--------------Standard Journal Groups-----------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "List Groups...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "List Groups...");
        //-------Creating a Standard Journal Group------
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":GroupBox1._name_XLineEdit");
        type(":GroupBox1._name_XLineEdit", "Group-1");
        nativeType("<Tab>");
        waitForObject(":GroupBox1._descrip_XLineEdit");
        type(":GroupBox1._descrip_XLineEdit", "Group-1");
        
        waitForObject(":Standard Journal Group.New_QPushButton");
        clickButton(":Standard Journal Group.New_QPushButton");
        
        waitForObject(":Standard Journal Group Item._stdjrnl_XComboBox");
        clickItem(":Standard Journal Group Item._stdjrnl_XComboBox","START-ORDER", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in creating Std journal Group"+e);
        if(object.exists(":Sales Order.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order.Close_QPushButton"));
    }
    
    
    //-----Creating a Standard Journal Group for some External Flow cases
    try{
        
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        
        waitForObject(":GroupBox1._name_XLineEdit");
        type(":GroupBox1._name_XLineEdit", "PERIOD-START");
        nativeType("<Tab>");
        waitForObject(":GroupBox1._descrip_XLineEdit");
        type(":GroupBox1._descrip_XLineEdit", "Period Start group");
        //---creating a 'New' Standard Journal Group Item----- 
        waitForObject(":Standard Journal Group.New_QPushButton");
        clickButton(":Standard Journal Group.New_QPushButton");
        snooze(0.5);
        waitForObject(":Standard Journal Group Item._stdjrnl_XComboBox");
        clickItem(":Standard Journal Group Item._stdjrnl_XComboBox","Receive Product", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        snooze(0.5);
        waitForObject(":Standard Journal Group.New_QPushButton");
        clickButton(":Standard Journal Group.New_QPushButton");
        snooze(0.5);
        waitForObject(":Standard Journal Group Item._stdjrnl_XComboBox");
        clickItem(":Standard Journal Group Item._stdjrnl_XComboBox","Ship Order", 0, 0, 5, Qt.LeftButton);	
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        //---Editing  Standard Journal Group Item---
        waitForObject(":Standard Journal Group._stdjrnlgrpitem_XTreeWidget");
        clickItem(":Standard Journal Group._stdjrnlgrpitem_XTreeWidget","Receive Product", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Standard Journal Group.Edit_QPushButton");
        clickButton(":Standard Journal Group.Edit_QPushButton");
        snooze(0.5);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Group Item.XDateEdit_XDateEdit");
        findObject(":Standard Journal Group Item.XDateEdit_XDateEdit").clear();
        type(":Standard Journal Group Item.XDateEdit_XDateEdit", "+365");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        snooze(0.5);
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        //---Deleting Standard Journal Group Item----
        waitForObject(":Standard Journal Group._stdjrnlgrpitem_XTreeWidget");
        clickItem(":Standard Journal Group._stdjrnlgrpitem_XTreeWidget","Ship Order", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Standard Journal Group.Delete_QPushButton");
        clickButton(":Standard Journal Group.Delete_QPushButton");
        nativeType("<Tab>");
        snooze(1);
        nativeType("<Tab>");
        if(!object.exists("{column='0' container=':Standard Journal Group._stdjrnlgrpitem_XTreeWidget' text='Ship Order' type='QModelIndex'}"))
            test.pass("Standard Journal Group Item deleted sucessful");
        else
            test.fail("Error in deleting Standard Journal Group Item");
        snooze(1);
        //---Cancelling a Standard Journal Group Item----
        waitForObject(":Standard Journal Group.New_QPushButton");
        clickButton(":Standard Journal Group.New_QPushButton");
        snooze(0.5);
        waitForObject(":Standard Journal Group Item._stdjrnl_XComboBox");
        clickItem(":Standard Journal Group Item._stdjrnl_XComboBox","Ship Order", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Group Item.XDateEdit_XDateEdit");
        findObject(":Standard Journal Group Item.XDateEdit_XDateEdit").clear();
        type(":Standard Journal Group Item.XDateEdit_XDateEdit", "+365");
        nativeType("<Tab>");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        
        //---Entering Expiration date is earlier to the Effective date in a Standard Journal Group Item---
        waitForObject(":Standard Journal Group.New_QPushButton");
        clickButton(":Standard Journal Group.New_QPushButton");
        snooze(0.5);
        waitForObject(":Standard Journal Group Item._stdjrnl_XComboBox");
        clickItem(":Standard Journal Group Item._stdjrnl_XComboBox","Receive Product", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "+2");
        nativeType("<Tab>");
        findObject(":Standard Journal Group Item.XDateEdit_XDateEdit").clear();
        waitForObject(":Standard Journal Group Item.XDateEdit_XDateEdit");
        type(":Standard Journal Group Item.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        snooze(0.5);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        { 
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            test.pass("Unable to save Standard Journal Group Item: Expiration date is earlier to the Effective date");
        }
        else
            test.fail("Standard Journal Group Item is created with Expiration date is earlier to the Effective date");
        snooze(0.5);
        waitForObject(":Standard Journal Group Item.XDateEdit_XDateEdit");
        findObject(":Standard Journal Group Item.XDateEdit_XDateEdit").clear();
        type(":Standard Journal Group Item.XDateEdit_XDateEdit", "+365");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        //------Closing Standard Journal Group without saving-------
        snooze(0.5);
        waitForObject(":Standard Journal Group.Show Expired Standard Journal Members_QCheckBox");
        clickButton(":Standard Journal Group.Show Expired Standard Journal Members_QCheckBox");
        snooze(0.5);
        waitForObject(":Standard Journal Group.Show Future Standard Journal Members_QCheckBox");
        clickButton(":Standard Journal Group.Show Future Standard Journal Members_QCheckBox");
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in performing operations on Std.Journals");
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        
        if(object.exists(":Sales Order.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order.Close_QPushButton"));
    }
    //----Creating a Standard Journal Group---------
    
    try{
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        snooze(0.5);
        waitForObject(":GroupBox1._name_XLineEdit");
        type(":GroupBox1._name_XLineEdit", "PERIOD-START");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":GroupBox1._descrip_XLineEdit");
        type(":GroupBox1._descrip_XLineEdit", "Period Start group");
        
        waitForObject(":Standard Journal Group.New_QPushButton");
        clickButton(":Standard Journal Group.New_QPushButton");
        snooze(0.5);
        waitForObject(":Standard Journal Group Item._stdjrnl_XComboBox");
        clickItem(":Standard Journal Group Item._stdjrnl_XComboBox","Receive Product", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        //---Editing a Standard Journal Group-------
        waitForObject(":xTuple ERP:*._stdjrnlgrp_XTreeWidget");
        clickItem(":xTuple ERP:*._stdjrnlgrp_XTreeWidget","PERIOD-START", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":xTuple ERP:*.Edit_QPushButton");
        clickButton(":xTuple ERP:*.Edit_QPushButton");
        snooze(0.5);
        waitForObject(":Standard Journal Group.New_QPushButton");
        clickButton(":Standard Journal Group.New_QPushButton");
        snooze(1);
        waitForObject(":Standard Journal Group Item._stdjrnl_XComboBox");
        clickItem(":Standard Journal Group Item._stdjrnl_XComboBox","START-ORDER", 0, 0, 5, Qt.LeftButton);	
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        //--------Posting a Standard Journal Group-------
        waitForObject(":xTuple ERP:*._stdjrnlgrp_XTreeWidget");
        clickItem(":xTuple ERP:*._stdjrnlgrp_XTreeWidget","Group-1", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        snooze(1);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "<0>");
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        snooze(0.5);
        waitForObject(":Series G/L Journal Entry.Post_QPushButton");
        clickButton(":Series G/L Journal Entry.Post_QPushButton");
        
        
        //---------Deleting a Standard Journal Group------	
        waitForObject(":xTuple ERP:*._stdjrnlgrp_XTreeWidget");
        clickItem(":xTuple ERP:*._stdjrnlgrp_XTreeWidget","Group-1", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":xTuple ERP:*.Delete_QPushButton");
        clickButton(":xTuple ERP:*.Delete_QPushButton");
        nativeType("<Tab>");
        snooze(1);
        if(!object.exists("{column='0' container=':xTuple ERP:*._stdjrnlgrp_XTreeWidget' text='Group-1' type='QModelIndex'}"))
            test.pass("Standard Journal Group deleted sucessful");
        else
            test.fail("Error in deleting Standard Journal Group ");
        nativeType("<Tab>");
        snooze(2);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in performing operations on Std.Journals");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }  
    
    //----------Posting Standard Journals------------
    flag = 0;
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "Post...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "Post...");
        snooze(0.5);
        waitForObject(":_stdjrnl_XComboBox");
        clickItem(":_stdjrnl_XComboBox","Receive Product", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        snooze(0.5);
        waitForObject(":Series G/L Journal Entry.Post_QPushButton");
        clickButton(":Series G/L Journal Entry.Post_QPushButton");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        flag = 1;
    }
    catch(e)
    {
        test.fail("Error in posting Standard journal entries"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    //----- G/L transaction verification  -----
    if(flag)
    {
        var bool = glTransactions(/Cash Payment/,"Receive Product");
        if(bool == 1)
        {
            test.pass("Standard Journal  Receive Product  has a GL entry ");
        }
        else
            test.fail("No GL entry is made for the  Standard Journal entry  Receive Product");
        
    }
    //---------------Posting Reverse Standard Journal entries--------
    flag = 0;
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "Post...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "Post...");
        snooze(0.5);
        waitForObject(":_stdjrnl_XComboBox");
        clickItem(":_stdjrnl_XComboBox","Receive Product",  0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":Post Standard Journal.Reverse Journal Entries_QCheckBox");
        clickButton(":Post Standard Journal.Reverse Journal Entries_QCheckBox");
        
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        snooze(0.5);
        waitForObject(":Series G/L Journal Entry.Post_QPushButton");
        clickButton(":Series G/L Journal Entry.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        flag = 1;
    }
    catch(e)
    {
        test.fail("Error in posting reverse Standard journal entries"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    //----- G/L transaction verification after reversing Journal Entries-----
    if(flag)
    {
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
            activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
            snooze(2);
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
            clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);
            waitForObject(":_filterGroup.widget3_QLineEdit");
            type(":_filterGroup.widget3_QLineEdit","Receive Product");   
            
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton");
            
            waitForObject(":_filterGroup.xcomboBox4_XComboBox");
            clickItem(":_filterGroup.xcomboBox4_XComboBox","GL Account", 80, 9, 0, Qt.LeftButton);
            
            waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
            type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1000-01");
            nativeType("<Tab>");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(0.5);
            
            
            if(appEdition == "PostBooks")
                var qty ="50,000.00";
            else
                var qty ="100,000.00";
            
            var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
            var obj = obj_TreeWidget.topLevelItemCount;
            
            
            for(var i=0;i<obj;i++)
            {
                var row = obj_TreeWidget.topLevelItem(i);
                var bool;
                if(qty == row.text(7))
                    bool = 1;
                else
                    bool = 0;
                if(bool)
                {    
                    break;
                }
                
            }
            if(bool)
                test.pass("Reverse Standard Journal Entries has a GL entry for Receive Product");
            else
                test.fail("No GL entry is made for the reversing Standard Journal entries "+"Receive Product");
            
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton"); 
        }
        catch(e)
        {
            test.fail("Error in verifying GL entries"+e);
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
    }
    //-----------Cancelling Posting Standard Journals---------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "Post...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "Post...");
        snooze(1);
        waitForObject(":_stdjrnl_XComboBox");
        clickItem(":_stdjrnl_XComboBox","Receive Product",  0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Standard Journal cancellation succesful");
    }
    catch(e)
    {
        test.fail("Error in cancelling post Standard journal entries"+e);
    }
    
    
    //---------------Posting Standard Journal Groups---------------
    flag = 0;
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "Post Group...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "Post Group...");
        snooze(0.5);
        waitForObject(":_stdjrnlgrp_XComboBox");
        clickItem(":_stdjrnlgrp_XComboBox","PERIOD-START" ,0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        snooze(0.5);
        waitForObject(":Series G/L Journal Entry.Post_QPushButton");
        clickButton(":Series G/L Journal Entry.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Standard Journal has been posted succesfully");
        flag =1;
    }
    catch(e)
    {
        test.fail("Error in  posting Standard journal Group"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    //----- G/L transaction verification  -----
    if(flag)
    {
        var bool = glTransactions(/Standard Journal Credit/,"START-ORDER");
        if(bool == 1)
        {
            test.pass("Standard Journal Group PERIOD-START has a GL entry ");
        }
        else
            test.fail("No GL entry is made for posting  Standard Journal Group  PERIOD-START");
    }
    //---------------Posting Reverse Standard Journal Groups---------------
    flag = 0;
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "Post Group...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "Post Group...");
        snooze(0.5);
        waitForObject(":_stdjrnlgrp_XComboBox");
        clickItem(":_stdjrnlgrp_XComboBox","PERIOD-START" ,0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":Post Standard Journal Group.Reverse Journal Entries_QCheckBox");
        clickButton(":Post Standard Journal Group.Reverse Journal Entries_QCheckBox");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        snooze(0.5);
        waitForObject(":Series G/L Journal Entry.Post_QPushButton");
        clickButton(":Series G/L Journal Entry.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("reversing of Standard Journal transaction done");
    }
    catch(e)
    {
        test.fail("Error in Posting reverse Standard journal group entries"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    //----- G/L transaction verification after reversing Journal Group Entries-----
    if(flag)
    {
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
            activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
            snooze(2);
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
            clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":_filterGroup.widget3_QLineEdit");
            type(":_filterGroup.widget3_QLineEdit","START-ORDER");   
            
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton");
            snooze(0.5);
            waitForObject(":_filterGroup.xcomboBox4_XComboBox");
            clickItem(":_filterGroup.xcomboBox4_XComboBox","GL Account", 80, 9, 0, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
            type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-1000-01");
            
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(0.5);
            var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
            var obj = obj_TreeWidget.topLevelItemCount;
            var qty ="100.00";
            for(var i=0;i<obj;i++)
            {
                var row = obj_TreeWidget.topLevelItem(i);
                var bool;
                if(qty == row.text(8))
                {
                    bool = 1;
                    break;
                }
                else
                    bool = 0;
                if(bool)
                {    
                    break;
                }
                
            }
            if(bool)
                test.pass("Reverse Standard Journal Group Entries has a GL entry");
            else
                test.fail("No GL entry is made for the reversing Standard Journal Group entries "+"START-ORDER");
            snooze(0.5);
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton"); 
        }
        
        catch(e)
        {
            test.fail("Error in verifying GL entries"+e);
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
    }
        
        //-----------Cancelling Posting Standard Journal Group---------
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
            activateItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals");
            waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "Post Group...");
            activateItem(":xTuple ERP:*.Standard Journals_QMenu", "Post Group...");
            snooze(0.5);
            waitForObject(":_stdjrnlgrp_XComboBox");
            clickItem(":_stdjrnlgrp_XComboBox","PERIOD-START" ,0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
            type(":xTuple ERP:*.XDateEdit_XDateEdit", "<0>");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            test.log("Cancellation of posting Standard Journal group successful");
        }
        catch(e)
        {
            test.fail("Error in cancelling post Standard journal Group"+e);
        }   
        //-------------------Reports--------------------
        //---------Retrieving today's date----
        
        var d = new Date();
        var mm =d.getMonth()+1;
        var dd =d.getDate();
        var year=d.getYear();
        var ystring = year.toString();
        var year2 = ystring.substring(1,3);
        
        if(dd<10){dd='0'+dd}
        if(mm<10){mm='0'+mm} 
        var date = "20" + year2 + "-" + mm + "-" + dd;
        test.log(date);
        //--------Summarized Transcations-----------
        
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Summarized Transactions...");
            activateItem(":xTuple ERP: *.Reports_QMenu", "Summarized Transactions...");
            snooze(1);
            
            waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
            type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
            nativeType("<Tab>");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
            type(":_dateGroup.XDateEdit_XDateEdit_3", "0");
            nativeType("<Tab>");
            
            waitForObject(":_sourceGroup.All Sources_QRadioButton");
            clickButton(":_sourceGroup.All Sources_QRadioButton");
            waitForObject(":Transactions.All_QRadioButton");
            clickButton(":Transactions.All_QRadioButton");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(2);
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='01-01-1000-01' type='QModelIndex'}"))
                test.pass("Account 01-01-1000-01 has a entry in Summarized G/L Transactions");
            else
                test.fail("Account 01-01-1000-01 doesn't has entry in Summarized G/L Transactions");
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='01-01-1010-01' type='QModelIndex'}"))
                test.pass("Account 01-01-1010-01 has a entry in Summarized G/L Transactions");
            else
                test.fail("Account 01-01-1010-01 doesn't has entry in Summarized G/L Transactions");
        }
        catch(e)
        {
            test.fail("Error in viewing Summarized Transcations"+e);
        }
        
        //----------Verifying for Posted Transcations-----------------
        try{
            waitForObject(":Transactions.Posted_QRadioButton");
            clickButton(":Transactions.Posted_QRadioButton");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(2);
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='01-01-1000-01' type='QModelIndex'}"))
                test.pass("Account 01-01-1000-01 has a entry in Summarized G/L Transactions as posted Transactions");
            else
                test.fail("Account 01-01-1000-01 doesn't has entry in Summarized G/L Transactions as posted Transactions");
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='01-01-1010-01' type='QModelIndex'}"))
                test.pass("Account 01-01-1010-01 has a entry in Summarized G/L Transactions as posted Transactions");
            else
                test.fail("Account 01-01-1010-01 doesn't has entry in Summarized G/L Transactions as posted Transactions");
            //---Verifying for a Selected Source  Transcations---------------
            waitForObject(":_sourceGroup.Selected Source:_QRadioButton_2");
            clickButton(":_sourceGroup.Selected Source:_QRadioButton_2");
            waitForObject(":_sourceGroup._source_XComboBox_2");
            clickItem(":_sourceGroup._source_XComboBox_2", "G/L", 0, 0, 5, Qt.LeftButton);
            
            waitForObject(":Transactions.All_QRadioButton");
            clickButton(":Transactions.All_QRadioButton");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(2);
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='01-01-1000-01' type='QModelIndex'}"))
                test.pass("Account 01-01-1000-01 has a entry in Summarized G/L Transactions");
            else
                test.fail("Account 01-01-1000-01 doesn't has entry in Summarized G/L Transactions");
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='01-01-1010-01' type='QModelIndex'}"))
                test.pass("Account 01-01-1010-01 has a entry in Summarized G/L Transactions");
            else
                test.fail("Account 01-01-1010-01 doesn't has entry in Summarized G/L Transactions");
            
            
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        catch(e)
        {
            test.fail("Error in viewing Summarized Transcations"+e);
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        //---------Journal Series-----------
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Series...");
            activateItem(":xTuple ERP: *.Reports_QMenu", "Series...");
            waitForObject(":_sourceGroup.All Sources_QRadioButton_2");
            clickButton(":_sourceGroup.All Sources_QRadioButton_2");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(1);
            if(object.exists(":Sales Order.OK_QPushButton_2"))
            {
                waitForObject(":Sales Order.OK_QPushButton_2");
                clickButton(":Sales Order.OK_QPushButton_2");
                test.pass("Date fields are Empty: Unable to query the screen");
            }
            else
                test.fail("It is possible to query the screen without date range");
            //------Entering Date range----------
            waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
            type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
            nativeType("<Tab>");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
            type(":_dateGroup.XDateEdit_XDateEdit_3", "0");
            nativeType("<Tab>");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(0.5);
            waitForObject(":_list_XTreeWidget_3");
            var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
            var obj = obj_TreeWidget.topLevelItemCount;
            
            for(var i=0;i<obj;i++)
            {
                var row = obj_TreeWidget.topLevelItem(i);
                var bool;
                if(date == row.text(0))
                    bool = 1;
                else
                    bool = 0;
                if(bool)
                {    
                    break;
                }
                
            }
            if(bool)
                test.pass("All Journal transactions under the specified date range are displayed");
            else
                test.fail("failed to view Journal Transactions under specified date range");
        }
        catch(e)
        {
            test.fail("Error in viewing Journal Transactions series"+ e);	
        }
        //-------Some External Flow cases in Journal Series-----------
        try{
            //---Editing the posted date in Journal Entry--
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3","Series GL entry", 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit Journal...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Edit Journal...");
            snooze(0.5);
            waitForObject(":Series G/L Journal Entry.XDateEdit_XDateEdit");
            findObject(":Series G/L Journal Entry.XDateEdit_XDateEdit").clear();
            waitForObject(":Series G/L Journal Entry.XDateEdit_XDateEdit");
            type(":Series G/L Journal Entry.XDateEdit_XDateEdit", "+1");
            nativeType("<Tab>");
            waitForObject(":Series G/L Journal Entry.Post_QPushButton");
            clickButton(":Series G/L Journal Entry.Post_QPushButton");
            
            //-------Verifying for edited Journal entry------------
            waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
            findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
            type(":xTuple ERP:*.XDateEdit_XDateEdit", "+1");
            nativeType("<Tab>");
            waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
            type(":_dateGroup.XDateEdit_XDateEdit_3", "+1");
            nativeType("<Tab>");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(1);
            if(object.exists("{column='3' container=':_list_XTreeWidget_3' text='JE' type='QModelIndex'}"))
                test.pass("Journal Entry edited succesful and posted to tomorrow's date");
            else
                test.fail("Error in editing Journal Entry");
            
            waitForObject(":_list_XTreeWidget_3");
            var widget = findObject(":_list_XTreeWidget_3");
            var count = widget.topLevelItemCount;
            test.log(count);
            
            //--------Reversing a Journal Entry-----------
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3","JE", 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Reverse Journal...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Reverse Journal...");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            snooze(0.5);
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            
            waitForObject(":_list_XTreeWidget_3");
            var widget = findObject(":_list_XTreeWidget_3");
            var count1 = widget.topLevelItemCount;
            test.log(count1);
            
            if(++count == count1)
                test.pass("Reversing Journal entry sucessful");
            else
                test.fail("Error occured in reversing journal entries");
            
            //---------Cancelling 'Reverse Journal Entry'-------------   
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3","JE", 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Reverse Journal...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Reverse Journal...");
            snooze(0.5);
            waitForObject(":Reverse Journal.Cancel_QPushButton");
            clickButton(":Reverse Journal.Cancel_QPushButton");
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3","JE", 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete Journal...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Delete Journal...");
            nativeType("<Tab>");
            snooze(0.5);
            
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        catch(e)
        {
            test.fail("Error in performing external flow cases in Journal Series screen"+e);
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
            
        }
        //--------Standard Journal History-------------
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
            waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Standard Journal History...");
            activateItem(":xTuple ERP: *.Reports_QMenu", "Standard Journal History...");
            waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
            type(":xTuple ERP:*.XDateEdit_XDateEdit", "-1");
            nativeType("<Tab>");
            waitForObject(":Standard Journal History.XDateEdit_XDateEdit");
            type(":Standard Journal History.XDateEdit_XDateEdit", "0");
            nativeType("<Tab>");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(0.5);
            waitForObject(":_list_XTreeWidget_3");
            var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
            var obj = obj_TreeWidget.topLevelItemCount;
            
            for(var i=0;i<obj;i++)
            {
                var row = obj_TreeWidget.topLevelItem(i);
                var bool;
                
                if(date == row.text(0))
                    bool = 1;
                else
                    bool = 0;
                if(bool)
                {    
                    break;
                }
                
            }
            if(bool)
                test.pass("All Standard Journals under the specified date range are available");
            else
                test.fail("Error in viewing Standard Journals");
            
        }
        catch(e)
        {
            test.fail("Error in viewing Standard Journal History screen");
        }
        
        //-----Deleting a Standard Journal from Standard Journal History screen-----
        try{
            
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3", date, 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete Journal...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Delete Journal...");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_list_XTreeWidget_3");
            var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
            var obj1 = obj_TreeWidget.topLevelItemCount;
            if(--obj == obj1)
                test.pass("Standard Journal deletion successful");
            else
                test.fail("Error in Standard Journal deletion");
            
            //-----Reversing a Standard Journal from Standard Journal History screen-----
            
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3", date, 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Reverse Journal...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Reverse Journal...");
            snooze(0.5);
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            snooze(0.5);
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(0.5);
            waitForObject(":_list_XTreeWidget_3");
            var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
            var obj2 = obj_TreeWidget.topLevelItemCount;
            if(++obj == obj2)
                test.pass("Reverse Standard Journal successful");
            else
                test.fail("Error in reversing Standard Journal entry");
            snooze(1);
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        catch(e)
        {
            test.fail("Error in processing Standard Journal History screen");
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
    }
