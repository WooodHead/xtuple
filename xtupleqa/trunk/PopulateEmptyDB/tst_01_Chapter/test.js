////********** This Test Suite is developed to execute the xTuple Training Guide ****************
//---Functions/common libraries created are placed in 'shared/scripts/functions.js' script



function main()
{
    
    
    //-----declarations------
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("CONFIGURE"); 
    
    snooze(1);
  
  
    //----------Create Base Currency-----------------------
    try
    {
        waitForObject(":_zonesTab.New_QPushButton");
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":Currency._currName_QLineEdit");
        type(":Currency._currName_QLineEdit", "US Dollars");
        waitForObject(":Currency._currSymbol_QLineEdit");
        type(":Currency._currSymbol_QLineEdit", "$");
        waitForObject(":Currency._currAbbr_QLineEdit");
        type(":Currency._currAbbr_QLineEdit",  "USD");         
        waitForObject(":Currency.Base Currency_QCheckBox");
        clickButton(":Currency.Base Currency_QCheckBox");
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
        snooze(0.1);
        waitForObject(":Cancel.Yes_QPushButton");
        clickButton(":Cancel.Yes_QPushButton");
        waitForObject(":Tax Assignment.Close_QPushButton");
        clickButton(":Tax Assignment.Close_QPushButton");
        test.log("Currencies are created");
        
    }
    catch(e)
    {
        test.fail("Exception in creating base currency" + e);
    }
    
    //-----Editing the preferences----
    
    if(OS.name=="Darwin")
    {
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem("{ title='Products' type='QMenu' visible='1' window=':xTuple ERP: OpenMFG Edition_GUIClient'}","Preferences...");
        
        activateItem("{ title='Products' type='QMenu' visible='1' window=':xTuple ERP: OpenMFG Edition_GUIClient'}","Preferences...");
    } 
    else
    {
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
    }
    
  
    waitForObject(":Interface Options.Tabbed Windows_QRadioButton");
    snooze(1);
    if(!findObject(":Interface Options.Tabbed Windows_QRadioButton").checked)
        clickButton(":Interface Options.Tabbed Windows_QRadioButton");
    snooze(1);
    if(object.exists(":Notice.Remind me about this again._QCheckBox"))
    {  
        waitForObject(":Notice.Remind me about this again._QCheckBox");
        if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
            clickButton(":Notice.Remind me about this again._QCheckBox");
        snooze(0.1);
        waitForObject(":Notice.OK_QPushButton");
        clickButton(":Notice.OK_QPushButton");
    }
    waitForObject(":xTuple ERP: *_QPushButton");
    clickButton(":xTuple ERP: *_QPushButton");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
    
    //----------Define Encryption (metric)------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        snooze(2);
        
        if(OS.name=="Darwin")
        {
            if(object.exists(":Cancel_QMessageBox"))
            {
                waitForObject(":OK_QPushButton");
                clickButton(":OK_QPushButton");        
            }
            snooze(1);
            if(object.exists(":Cancel_QMessageBox"))
            {
                waitForObject(":OK_QPushButton");
                clickButton(":OK_QPushButton");        
            }
        }
        else
        {
            if(object.exists(":Cannot Read Configuration_QMessageBox"))
            {
                waitForObject(":OK_QPushButton");
                clickButton(":OK_QPushButton");
            }
            if(object.exists(":Cannot Read Configuration_QMessageBox"))
            {
                waitForObject(":OK_QPushButton");
                clickButton(":OK_QPushButton");
            }
        }
        snooze(2);
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Configure.Encryption_QModelIndex");
            mouseClick(":Configure.Encryption_QModelIndex", 35, 9, 0, Qt.LeftButton);        
        }
        else
        {
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex", -11, 6, 0, Qt.LeftButton);
            waitForObject(":Configure.Encryption_QModelIndex");
            mouseClick(":Configure.Encryption_QModelIndex", 35, 9, 0, Qt.LeftButton);            
        }
        snooze(1);
        if(object.exists(":OK_QPushButton"))
        {
            clickButton(":OK_QPushButton");
        }
        waitForObject(":_ccEncKeyName_QLineEdit");
        if(findObject(":_ccEncKeyName_QLineEdit").text!="xTuple.key")
        {
            type(":_ccEncKeyName_QLineEdit", "<Right>");
            type(":_ccEncKeyName_QLineEdit", "<Ctrl+Backspace>");
            type(":_ccEncKeyName_QLineEdit", "xTuple.key");
            test.log("Encryption: key name changed");
        }
        if(findObject(":Encryption Configuration_FileLineEdit").text!="c:\\crypto")
        {
            type(":Encryption Configuration_FileLineEdit", "<Right>");
            type(":Encryption Configuration_FileLineEdit", "<Ctrl+Backspace>");
            type(":Encryption Configuration_FileLineEdit", "c:\\crypto");
            test.log("Encryption: Windows location changed");
        }
        if(findObject(":Encryption Configuration_FileLineEdit_2").text!="//home//crypto")
        {
            type(":Encryption Configuration_FileLineEdit_2", "<Right>");
            type(":Encryption Configuration_FileLineEdit_2", "<Ctrl+Backspace>");
            type(":Encryption Configuration_FileLineEdit_2", "//home//administrator//crypto");
            test.log("Encryption: Linux location changed");
        }
        if(findObject(":Encryption Configuration_FileLineEdit_3").text!="/Users/crypto")
        {
            type(":Encryption Configuration_FileLineEdit_3", "<Right>");
            type(":Encryption Configuration_FileLineEdit_3", "<Ctrl+Backspace>");
            type(":Encryption Configuration_FileLineEdit_3", "/Users/crypto");
            test.log("Encryption: Mac location changed");
        }
        waitForObject(":xTuple ERP: *_QPushButton");
        clickButton(":xTuple ERP: *_QPushButton");
        test.log("Encryption defined");
    }catch(e){test.fail("Exception in defining Encryption:"+e);}
    
    
    //---Restarting Application--
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit xTuple ERP...");
    
    snooze(4);
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
 

var appEdition = findApplicationEdition(); 

  
    //-----create Entities-------
    createDept("MFG","Manufacturing");
    assignAllPrivileges("CONFIGURE");

var appEdition = findApplicationEdition();
    if(appEdition=="Manufacturing")
        createShift("1ST","First");
    else if(appEdition=="PostBooks" || appEdition=="xTupleERP")
    {
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            
            if(object.exists("{column='0' container=':_tree.Master Information_QModelIndex' text='Shifts' type='QModelIndex'}"))
                test.fail("shifts menu found in "+appEdition);
            else
                test.pass(" shifts  menu not found in "+appEdition);
            waitForObject(":Setup.Save_QPushButton");
            clickButton(":Setup.Save_QPushButton");     
            
        }
        catch(e){test.fail("Exception in verifying Shifts Menu");}
        
    }
    
  
    createLocale("MYLOCALE","My Locale For Class");
    createRole("SUPER","Super User Group");
    
    //-------------Configure: Accounting Module----------------
    try{    
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox", "Accounting",10, 10, 0, Qt.LeftButton);
        waitForObject(":Configure.Accounting_QModelIndex");
        mouseClick(":Configure.Accounting_QModelIndex", 42, 6, 0, Qt.LeftButton);    
        if(findObject(":_mainSize_QSpinBox").currentText!="4")
        {
            findObject(":_mainSize_QSpinBox").clear();
            type(":_mainSize_QSpinBox", "4");
        }
        
        
        waitForObject(":_gl.Use Company Segment_QCheckBox");
        if(!findObject(":_gl.Use Company Segment_QCheckBox").checked)
            clickButton(":_gl.Use Company Segment_QCheckBox");
        
        if(findObject(":_companySegmentSize_QSpinBox_3").currentText!="2")
        {
            findObject(":_companySegmentSize_QSpinBox_3").clear();
            type(":_companySegmentSize_QSpinBox_3", "2");
        }
        
        if(findObject(":_subaccountSize_QSpinBox_3").currentText!="2")
        {
            findObject(":_subaccountSize_QSpinBox_3").clear();    
            type(":_subaccountSize_QSpinBox_3", "2");
        }
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            waitForObject(":_useCompanySegmentGroup.Enable External Company Consolidation_QCheckBox");
            if(!findObject(":_useCompanySegmentGroup.Enable External Company Consolidation_QCheckBox").checked)
                clickButton(":_useCompanySegmentGroup.Enable External Company Consolidation_QCheckBox");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_useCompanySegmentGroup.Enable External Company Consolidation_QCheckBox"), "External Company - checkbox not visible");
        }
        waitForObject(":_gl.Use Profit Centers_QCheckBox");
        if(!findObject(":_gl.Use Profit Centers_QCheckBox").checked)
            type(":_gl.Use Profit Centers_QCheckBox"," ");
        waitForObject(":_useProfitCentersGroup.Allow Free-Form Profit Centers_QCheckBox");
        if(!findObject(":_useProfitCentersGroup.Allow Free-Form Profit Centers_QCheckBox").checked)
            clickButton(":_useProfitCentersGroup.Allow Free-Form Profit Centers_QCheckBox");
        waitForObject(":_gl.Use Subaccounts_QCheckBox");
        if(!findObject(":_gl.Use Subaccounts_QCheckBox").checked)
            type(":_gl.Use Subaccounts_QCheckBox"," ");
        waitForObject(":_useSubaccountsGroup.Allow Free-Form Subaccounts_QCheckBox");
        if(findObject(":_useSubaccountsGroup.Allow Free-Form Subaccounts_QCheckBox").checked)
            clickButton(":_useSubaccountsGroup.Allow Free-Form Subaccounts_QCheckBox");
        if(findObject(":_profitCenterSize_QSpinBox_3").currentText!="2")
        {
            waitForObject(":_profitCenterSize_QSpinBox_3");
            findObject(":_profitCenterSize_QSpinBox_3").clear();
            type(":_profitCenterSize_QSpinBox_3", "2");
        }
        waitForObject(":_miscGroup.Mandatory notes for Manual Journal Entries_QCheckBox");
        if(!findObject(":_miscGroup.Mandatory notes for Manual Journal Entries_QCheckBox").checked)
            clickButton(":_miscGroup.Mandatory notes for Manual Journal Entries_QCheckBox");
        snooze(1);
        waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar", "Global");
        
        waitForObject(":Meaning of Currency Exchange Rates:.Foreign × Exchange Rate = Base_QRadioButton_2");
        clickButton(":Meaning of Currency Exchange Rates:.Foreign × Exchange Rate = Base_QRadioButton_2");
           waitForObject(":List Departments.Save_QPushButton");
           clickButton(":List Departments.Save_QPushButton");
        snooze(0.5);
        if(object.exists(":Company ID Correct?.Yes_QPushButton"))
            clickButton(":Company ID Correct?.Yes_QPushButton");
        test.log("Acconting Module Configured");
    }
    catch(e){test.fail("Exception in configuring Accounting:"+e);}
    
    //-------Create Company: Prodiem---------
    createCompany("01","Prodiem");
    
    //--------------Create Currencies------------------------       
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Master Information.Currencies_QModelIndex");
        mouseClick(":Master Information.Currencies_QModelIndex", 34, 2, 0, Qt.LeftButton);
        
        
        //----------Create Foreign currency - EUR------------
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":_stack._currName_QLineEdit");
        type(":_stack._currName_QLineEdit", "Euros");
        waitForObject(":_stack._currSymbol_QLineEdit");
        type(":_stack._currSymbol_QLineEdit", "EUR");
        waitForObject(":_stack._currAbbr_QLineEdit");
        type(":_stack._currAbbr_QLineEdit",  "EUR"); 
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");               
        snooze(2);
        
        waitForObject(":_stack._curr_XTreeWidget");
        if(object.exists(":_curr.US Dollars_QModelIndex"))
            test.pass("Currency: USD created");
        else test.fail("Currency: USD not created");
        
        if(object.exists("{column='3' container=':_stack._curr_XTreeWidget' text='EUR' type='QModelIndex'}"))
            test.pass("Currency: EUR created");
        else test.fail("Currency: EUR not created");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Currencies are created");
    }
    catch(e){test.fail("Exception caught in creating Currencies");
    }
    
    
    //----------Create Exchange Rates-------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Master Information.Exchange Rates_QModelIndex");
        mouseClick(":Master Information.Exchange Rates_QModelIndex", 55, 11, 0, Qt.LeftButton);
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        type(":_stack._rate_XLineEdit", "1.36");
        type(":_stack.XDateEdit_XDateEdit", "-30");
        type(":_stack.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":_stack.XDateEdit_XDateEdit_2");
        type(":_stack.XDateEdit_XDateEdit_2", "+365");
        type(":_stack.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":_stack.Save_QPushButton");
        clickButton(":_stack.Save_QPushButton");
        waitForObject(":_frame._conversionRates_XTreeWidget");
        if(findObject(":_conversionRates.EUR - EUR_QModelIndex").text== "EUR - EUR")
            test.pass("Exchange Rate of EUR created");
        else test.fail("Exchange Rate of EUR not created");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Exchange Rate for the currency is created");
    }
    catch(e){test.fail("Exception in creating Exchange Rates:"+e);
    }
    
    
    //-------------Accounting-Profit Center Number---------------------
    try{      
        
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Profit Center Numbers...");
        activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Profit Center Numbers...");
        
        waitForObject(":List Profit Centers.New_QPushButton");
        clickButton(":List Profit Centers.New_QPushButton");
        waitForObject(":List Profit Centers._number_XLineEdit");
        type(":List Profit Centers._number_XLineEdit", "01");
        type(":List Profit Centers._descrip_QTextEdit", "Profit Center 01");
        waitForObject(":List Profit Centers.Save_QPushButton");
        clickButton(":List Profit Centers.Save_QPushButton");
        
        waitForObject(":List Profit Centers._prftcntr_XTreeWidget");
        if(object.exists(":_prftcntr.01_QModelIndex"))
            test.pass("Profit Center Number: 01 created");
        else
            test.fail("Profit Center Number: 01 not created");
        waitForObject(":List Profit Centers.Close_QPushButton");
        clickButton(":List Profit Centers.Close_QPushButton");
        test.log("Profit Center is created");
    }
    catch(e){test.fail("Exception in defining Profit Centers:"+e);}
    
    //--------------Accounting-Account-SubAccount Numbers-----------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Subaccount Numbers...");
        activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Subaccount Numbers...");
        waitForObject(":List Subaccounts.New_QPushButton");
        clickButton(":List Subaccounts.New_QPushButton");
        waitForObject(":List Subaccounts._number_XLineEdit");
        type(":List Subaccounts._number_XLineEdit", "01");
        type(":List Subaccounts._descrip_QTextEdit", "Subaccount 01 - General");
        
        waitForObject(":List Subaccounts.Save_QPushButton");
        clickButton(":List Subaccounts.Save_QPushButton");
        snooze(2);
        if(object.exists(":_subaccnt.Subaccount 01 - General_QModelIndex")) 
            test.pass("Profit Center Number: 01 created");
        else
            test.fail("Profit Center Number: 01 not created");
        waitForObject(":List Subaccounts.Close_QPushButton");
        clickButton(":List Subaccounts.Close_QPushButton");
        test.log("Sub Account Number is created");
    }
    catch(e){test.fail("Exception in defining Subaccount Numbers"+e);}
    
    
    
    
    //------------Account-Account-SubAccount Types-----------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Subaccount Types...");
        activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Subaccount Types...");
        
        
          //--SubAccount Types: SO-Revenue-Other Revenue--
  
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":Work Center._code_XLineEdit");
        type(":Work Center._code_XLineEdit", "SO");
        clickItem(":Subaccount Type._type_XComboBox", "Revenue", 0, 0, 1, Qt.LeftButton);
        type(":Work Center._description_XLineEdit", "Other Revenue");
        waitForObject(":Work Center.Save_QPushButton");
        clickButton(":Work Center.Save_QPushButton");
        test.log("SubAccount: SO-Revenue-Other Revenue created");
        
        //--SubAccount Types: DXP-Expenses-Depreciation Expense--
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":Work Center._code_XLineEdit");
        type(":Work Center._code_XLineEdit", "DXP");
        clickItem(":Subaccount Type._type_XComboBox", "Expense", 0, 0, 1, Qt.LeftButton);
        type(":Work Center._description_XLineEdit", "Depreciation Expense");
        waitForObject(":Work Center.Save_QPushButton");
        clickButton(":Work Center.Save_QPushButton");
        
        
        //--SubAccount Types: OI-Revenue-Other Income--
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":Work Center._code_XLineEdit");
        type(":Work Center._code_XLineEdit", "OI");
        clickItem(":Subaccount Type._type_XComboBox", "Revenue", 0, 0, 1, Qt.LeftButton);
        type(":Work Center._description_XLineEdit", "Other Income");
        waitForObject(":Work Center.Save_QPushButton");
        clickButton(":Work Center.Save_QPushButton");
        
        snooze(1);
        waitForObject(":List G/L Subaccount Types.Close_QPushButton");
        
        if(object.exists(":_subaccnttypes.SO_QModelIndex"))
            test.pass("SubAccountL:SO Revenue created");
        else 
            test.fail("SubAccountL:SO Revenue not created");
        
        if(object.exists(":_subaccnttypes.DXP_QModelIndex_2"))
            test.pass("SubAccount: DXP Expense created");
        else
            test.fail("SubAccount: DXP Expense not created");
        
        if(object.exists(":_subaccnttypes.OI_QModelIndex_2"))
            test.pass("SubAccount: OI Expense created");
        else
            test.fail("SubAccount: OI Expense not created");
        snooze(0.1);
        
        waitForObject(":List Work Centers.Close_QPushButton");
        clickButton(":List Work Centers.Close_QPushButton");
    }
    catch(e){test.fail("Exception in creating Subaccounts:"+e);}
    
    
    
    
    
    
    //-----------Create Chart Of Accounts-------------------------------
    try{    
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        waitForObject(":_account_XTreeWidget");
        
        COA("01","01","1950","01","Unassigned Inv Transactions","Asset","IN");
        
        COA("01","01","3030","01","Retained Earnings","Equity","EC");
        
        COA("01","01","3040","01","Stock Class B","Equity","EDC");
        
        COA("01","01","8990","01","Currency Gain / Loss","Expense","EXP");
        
        COA("01","01","8995","01","G/L Series Discrepancy","Expense","EXP");   
        
        waitForObject(":Chart of Accounts.Close_QPushButton");
        clickButton(":Chart of Accounts.Close_QPushButton");
        
    }catch(e){test.fail("Exception caught in creating Chart of Accounts:"+e);}
    
    
    
    //-----------------Configure: Products Module--------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox", "Products",10, 10, 0, Qt.LeftButton);
        waitForObject(":Configure.Products_QModelIndex");
        mouseClick(":Configure.Products_QModelIndex", 37, 4, 0, Qt.LeftButton);
        waitForObject(":Products Configuration.Post Item Changes to the Change Log_QCheckBox");
        if(appEdition=="Manufacturing")
        {
            if(!findObject(":Products Configuration.Enable Work Center Routings_QGroupBox").checked)
                type(":Products Configuration.Enable Work Center Routings_QGroupBox"," ");
            if(!findObject(":Track Machine Overhead.as Machine Overhead_QRadioButton").checked)
                clickButton(":Track Machine Overhead.as Machine Overhead_QRadioButton");
            if(!findObject(":Products Configuration.Enable Breeder Bills of Materials_QCheckBox").checked)
                clickButton(":Products Configuration.Enable Breeder Bills of Materials_QCheckBox");
            if(!findObject(":Products Configuration.Enable Transforms_QCheckBox").checked)
                clickButton(":Products Configuration.Enable Transforms_QCheckBox");
            if(!findObject(":Products Configuration.Enable Revision Control_QCheckBox").checked)
                clickButton(":Products Configuration.Enable Revision Control_QCheckBox");
        }
        else if(appEdition=="Standard"||appEdition=="PostBooks")
        {
            test.xverify(object.exists(":Products Configuration.Enable Work Center Routings_QGroupBox"), "Enable Work Center - groupbox not visible");
            test.xverify(object.exists(":Track Machine Overhead.as Machine Overhead_QRadioButton"), "Machine Overhead - RadioButton not visible"); 
            test.xverify(object.exists(":Products Configuration.Enable Breeder Bills of Materials_QCheckBox"), "Enable Breeder Bills of Materials - not visible"); 
            
        }
        
        if(!findObject(":Products Configuration.Post Item Changes to the Change Log_QCheckBox").checked)
            findObject(":Products Configuration.Post Item Changes to the Change Log_QCheckBox").checked= true;
        if(findObject(":Products Configuration.Allow Inactive Items to be Added to BOMs_QCheckBox").checked)
            findObject(":Products Configuration.Allow Inactive Items to be Added to BOMs_QCheckBox").checked=false;     
        if(findObject(":Defaults.Set Sold Items as Exclusive_QCheckBox").checked)
            findObject(":Defaults.Set Sold Items as Exclusive_QCheckBox").checked=false;
        type(":_issueMethod_QComboBox", "Mixed");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        if(appEdition=="Manufacturing")
        {
            waitForObject(":Cancel.Yes_QPushButton");
            clickButton(":Cancel.Yes_QPushButton");
        }
        else if(appEdition=="Standard"||appEdition=="PostBooks")
            test.xverify(object.exists(":Cancel.Yes_QPushButton"), "Cancel Yes Button - not visible"); 
        
        test.log("Product Module Configured");
    }catch(e){test.fail("Exception in configuring Products Module");}
    
    
    
    //----------Create Incident Category-----------
    try{       
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10, 10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Incident Categories_QModelIndex");
        mouseClick(":Master Information.Incident Categories_QModelIndex", 73, 4, 0, Qt.LeftButton);
        waitForObject(":List Incident Categories.New_QPushButton");
        clickButton(":List Incident Categories.New_QPushButton");
        waitForObject(":_name_XLineEdit_14");
        type(":_name_XLineEdit_14", "DUNNING");
        waitForObject(":Incident Category._order_QSpinBox");
        findObject(":Incident Category._order_QSpinBox").clear();
        snooze(0.1);
        type(":Incident Category._order_QSpinBox", "90");
        type(":Incident Category._descrip_QTextEdit", "Dunning Incident");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton"); 
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        test.log("Incident Category is created");
    }catch(e)
    {
        test.fail("Exception in creating Incident Categories"+e);
    }
    
    //----------Configure Accounts Receivable-------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Setup...");
        waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar","Accounts Receivable");
        waitForObject(":_ar._nextARMemoNumber_XLineEdit");
        findObject(":_ar._nextARMemoNumber_XLineEdit").clear();
        snooze(0.5);
        type(":_ar._nextARMemoNumber_XLineEdit","20000");
        waitForObject(":_ar._nextCashRcptNumber_XLineEdit");
        findObject(":_ar._nextCashRcptNumber_XLineEdit").clear();
        snooze(0.5);
        type(":_ar._nextCashRcptNumber_XLineEdit","10000");
        waitForObject(":Remit-To Address._name_XLineEdit");
        findObject(":Remit-To Address._name_XLineEdit").clear();
        type(":Remit-To Address._name_XLineEdit", "ProDium Toys");
        waitForObject(":Maintain Item Costs.XLineEdit_XLineEdit");
        findObject(":Maintain Item Costs.XLineEdit_XLineEdit").clear();
        type(":Maintain Item Costs.XLineEdit_XLineEdit", "Accounts Receivable");
        waitForObject(":Remit-To Address.XLineEdit_XLineEdit");
        findObject(":Remit-To Address.XLineEdit_XLineEdit").clear();
        type(":Remit-To Address.XLineEdit_XLineEdit", "12100 Playland Way");
        waitForObject(":Remit-To Address.XLineEdit_XLineEdit_2");
        findObject(":Remit-To Address.XLineEdit_XLineEdit_2").clear();
        waitForObject(":Remit-To Address.XLineEdit_XLineEdit_3");
        findObject(":Remit-To Address.XLineEdit_XLineEdit_3").clear();
        type(":Remit-To Address.XLineEdit_XLineEdit_3", "Norfolk");
        waitForObject(":Remit-To Address._state_XComboBox");
        
        
        while(findObject(":Remit-To Address._country_XComboBox").currentText!="United States")
            type(":Remit-To Address._country_XComboBox","<Down>");
        snooze(1);
        waitForObject(":Remit-To Address._phone_XLineEdit");
        findObject(":Remit-To Address._phone_XLineEdit").clear();
        snooze(0.5);
        type(":Remit-To Address._phone_XLineEdit", "757-461-3022");
        
        if(!findObject(":_ar.Credit Warn Customers when Late_QGroupBox").checked)
            type(":_ar.Credit Warn Customers when Late_QGroupBox"," ");
        waitForObject(":Credit Warn Customers when Late._graceDays_QSpinBox");
        findObject(":Credit Warn Customers when Late._graceDays_QSpinBox").clear();
        snooze(0.5);
        type(":Credit Warn Customers when Late._graceDays_QSpinBox", "15");
        snooze(1);
        waitForObject(":_ar._incdtCategory_XComboBox_2");
        clickItem(":_ar._incdtCategory_XComboBox_2","DUNNING",10,10,0, Qt.LeftButton);
        if(!findObject(":_ar.Auto Close Incidents when Invoice Paid_QCheckBox").checked)
            clickButton(":_ar.Auto Close Incidents when Invoice Paid_QCheckBox");
        snooze(1);
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        test.log("Accounting Module is configured");
    }
    catch(e){
        test.fail("Exception in configuring Accounting module:"+e);
    }
    
    //------------Configure Manufacture Module----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Manufacture_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.Manufacture_QMenu", "Setup...");
        
        waitForObject(":Configure.Manufacture_QModelIndex");
        mouseClick(":Configure.Manufacture_QModelIndex", 45, 2, 0, Qt.LeftButton);
        
        waitForObject(":Manufacture Configuration._nextWoNumber_XLineEdit");
        findObject(":Manufacture Configuration._nextWoNumber_XLineEdit").clear();
        type(":Manufacture Configuration._nextWoNumber_XLineEdit", "10000");
        
        if(object.exists(":Manufacture Configuration.Auto Fill Post Operation Qty. to Balance_QCheckBox"))
        {
            if(!findObject(":Manufacture Configuration.Auto Fill Post Operation Qty. to Balance_QCheckBox").checked)
                mouseClick(":Manufacture Configuration.Auto Fill Post Operation Qty. to Balance_QCheckBox",73, 4, 0, Qt.LeftButton);
        }
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        test.log("Manufacture Module is configured");
        
    }
    catch(e){
        test.fail("Exception in configuring Manufacture module:"+e);
    }
    
    
    //------------Configure CRM Module----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Setup...");
        
        waitForObject(":Configure.CRM_QModelIndex");
        mouseClick(":Configure.CRM_QModelIndex", 45, 2, 0, Qt.LeftButton);
        
        waitForObject(":CRM Configuration._nextInNumber_XLineEdit");
        findObject(":CRM Configuration._nextInNumber_XLineEdit").clear();
        type(":CRM Configuration._nextInNumber_XLineEdit", "15000");
        
        if(!findObject(":CRM Configuration.Use Projects_QCheckBox").checked)
            mouseClick(":CRM Configuration.Use Projects_QCheckBox", 35, 10, 0, Qt.LeftButton);
        
        if(!findObject(":_stack.Post Opportunity Changes to the Change Log_QCheckBox").checked)
            clickButton(":_stack.Post Opportunity Changes to the Change Log_QCheckBox");
        
        waitForObject(":_country_XComboBox_3");
        while(findObject(":_country_XComboBox_3").currentText!="United States")
            type(":_country_XComboBox_3","<Down>");
        snooze(1);
        
        if(findObject(":_stack.Enforce Valid Country Names_XCheckBox").active)
        {
            if(!findObject(":_stack.Enforce Valid Country Names_XCheckBox").checked)
                clickButton(":_stack.Enforce Valid Country Names_XCheckBox");
        }
        
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        test.log("CRM Module is configured");
    }
    catch(e){
        test.fail("Exception in configuring CRM module:"+e);
    }
    
    //-----------create new calendar---------------
    try{
        
        var i,j;
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Master Information.Calendars_QModelIndex");
        mouseClick(":Master Information.Calendars_QModelIndex", 34, 4, 0, Qt.LeftButton);
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":_stack.Relative_QPushButton");
        clickButton(":_stack.Relative_QPushButton"); 
        waitForObject(":_stack._name_XLineEdit");
        type(":_stack._name_XLineEdit", "8WRELDAYFW");
        waitForObject(":_stack._descrip_XLineEdit");
        type(":_stack._descrip_XLineEdit", "8 Weeks Forward From Today");
        while(findObject(":Calendar Type:._origin_QComboBox").currentText!="Current Day")
            type(":Calendar Type:._origin_QComboBox","<Down>");
        
        for(i=0;i<8;i++)
        {
            waitForObject(":_stack.New_QPushButton_2");
            clickButton(":_stack.New_QPushButton_2");
            j=i+1;
            waitForObject(":_stack._name_XLineEdit_2");
            type(":_stack._name_XLineEdit_2", "WEEK"+j);
            findObject(":_stack._offsetCount_QSpinBox").clear();
            type(":_stack._offsetCount_QSpinBox",i);
            waitForObject(":_stack._offsetType_QComboBox");
            clickItem(":_stack._offsetType_QComboBox","Weeks",10,10,0, Qt.LeftButton);
            snooze(1);
            waitForObject(":Work Center.Save_QPushButton");
            clickButton(":Work Center.Save_QPushButton");
        }
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        test.log("New Calendar is created");
    }
    catch(e){
        test.fail("Exception in creating new calendar:"+e);
    }
    
    if(appEdition=="Manufacturing"|| appEdition=="Standard")
    {
        //----------Configure Schedule module--------------
        try{
            
            
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Setup...");
            activateItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Setup...");    
            waitForObject(":Configure.Schedule_QModelIndex");
            mouseClick(":Configure.Schedule_QModelIndex", 11, 4, 0, Qt.LeftButton);
            
            findObject(":Schedule Configuration._nextPlanNumber_XLineEdit").clear();
            type(":Schedule Configuration._nextPlanNumber_XLineEdit", "90000");
            
            waitForObject(":Schedule Configuration._calendar_CalendarComboBox");
            clickItem(":Schedule Configuration._calendar_CalendarComboBox","8WRELDAYFW",10,10,0, Qt.LeftButton);
            snooze(1);
            
            if(object.exists(":Schedule Configuration.Enable Constraint Management_QCheckBox"))
            {
                if(!findObject(":Schedule Configuration.Enable Constraint Management_QCheckBox").checked)
                    clickButton(":Schedule Configuration.Enable Constraint Management_QCheckBox");
            }
            
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
            test.log("Schedule Module is configured");
            
        }
        catch(e){
            test.fail("Exception in configuring Schedule module:"+e);
        }
        
    }
    
    //----------Create new Title--------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10, 10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Titles_QModelIndex");
        mouseClick(":Master Information.Titles_QModelIndex", 12, 9, 0, Qt.LeftButton);
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":Work Center._code_XLineEdit");
        type(":Work Center._code_XLineEdit", "Master");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        snooze(1);
        if(object.exists(":_honorifics.Master_QModelIndex_2"))
            test.pass("Title: Master created");
        else test.fail("Title: Master not created");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("New Title is created");
    }catch(e){test.fail("Exception in defining Title:"+e);}
    
    
    //-------------Create Site Types------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Inventory",10,10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Site Types_QModelIndex");
        mouseClick(":Master Information.Site Types_QModelIndex", 42, 4, 0, Qt.LeftButton);
        
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":Work Center._code_XLineEdit");
        type(":Work Center._code_XLineEdit",  "INTRAN");
        waitForObject(":Work Center._description_XLineEdit");
        type(":Work Center._description_XLineEdit","Intransit Site");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        snooze(1);
        if(object.exists("{column='0' container=':_stack._sitetype_XTreeWidget' text='INTRAN' type='QModelIndex'}"))
            test.pass("Site Type: INTRAN created");
        
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":Work Center._code_XLineEdit");
        type(":Work Center._code_XLineEdit",  "STORAGE");
        waitForObject(":Work Center._description_XLineEdit");
        type(":Work Center._description_XLineEdit","Storage Site");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");           
        if(object.exists("{column='0' container=':_stack._sitetype_XTreeWidget' text='STORAGE' type='QModelIndex'}"))
            test.pass("Site Type: STORAGE created");    
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
    }
    catch(e)
    {test.fail("Exception in Creating Site Type:"+e);
    }
  
//---find Application Edition---
var appEdition = findApplicationEdition();
  
    //-------------------Assigning Accounts to Company-------------------
    if(appEdition=="Manufacturing"||appEdition=="Standard")
    {
        try
        {
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
            activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
            activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
            waitForObject(":List Companies._company_XTreeWidget");
            doubleClickItem(":List Companies._company_XTreeWidget","01", 10, 10,0,Qt.LeftButton);
            
            waitForObject(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit");
            type(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit","01-01-3030-01");
            nativeType("<Tab>");
            waitForObject(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit_2");
            type(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit_2","01-01-8990-01");
            nativeType("<Tab>");
            waitForObject(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit_3");
            type(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit_3","01-01-8995-01");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":List Companies.Close_QPushButton");
            clickButton(":List Companies.Close_QPushButton");
            test.log("Accounts Assigned to the company");
        }
        catch(e)
        {
            test.fail("Error in assigning accounts to the company"+ e);
        }
    }
    else
    {
        try  
        {
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
            activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
            activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
            waitForObject(":List Companies._company_XTreeWidget");
            doubleClickItem(":List Companies._company_XTreeWidget","01", 10, 10,0,Qt.LeftButton);
            waitForObject(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit");
            type(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit_3","01-01-3030-01");
            nativeType("<Tab>");
            waitForObject(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit");
            type(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit","01-01-8990-01");
            nativeType("<Tab>");
            waitForObject(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit_2");
            type(":List Companies.VirtualClusterLineEdit_GLClusterLineEdit_2","01-01-8995-01");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":List Companies.Close_QPushButton");
            clickButton(":List Companies.Close_QPushButton");
            test.log("Accounts Assigned to the company");
        }
        catch(e)
        {
            test.fail("Error in assigning accounts to the company"+ e);
        }
    }
    
  
    
  //-----------Create Inventory Site: WH1-----------------
    try{
        if(appEdition=="Manufacturing"|| appEdition=="Standard")
        {
           
            waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");           
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "List...");
            activateItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "List...");
            waitForObject(":List Sites.New_QPushButton");
            clickButton(":List Sites.New_QPushButton");
            
            waitForObject(":_code_XLineEdit_3");
            type(":_code_XLineEdit_3", "WH1");
            type(":_description_XLineEdit_5", "Prodiem Toys Site1");
            if(findObject(":_sitetype_XComboBox").currentText!= "WHSE")
                clickItem(":_sitetype_XComboBox", "WHSE", 0, 0, 1, Qt.LeftButton);
            type(":_addressGroup.XLineEdit_XLineEdit", "street addr line1");
            type(":_addressGroup.XLineEdit_XLineEdit_2", "street addr line2");
            type(":_addressGroup.XLineEdit_XLineEdit_3", "street addr line3");
            type(":_addressGroup.XLineEdit_XLineEdit_4", "city1");
            type(":_addressGroup.XLineEdit_XLineEdit_5", "23234324");
            clickItem(":_addressGroup._country_XComboBox_2", "United States", 0, 0, 1, Qt.LeftButton);
            snooze(1);
            waitForObject(":_addressGroup._state_XComboBox_4");
            clickItem(":_addressGroup._state_XComboBox_4","VA",0, 0, 1, Qt.LeftButton);
            snooze(1);
            
            waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
            waitForObject(":_accountGroup_QLabel");
            sendEvent("QMouseEvent", ":_accountGroup_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
            waitForObjectItem(":_QMenu", "List...");
            activateItem(":_QMenu", "List...");
            waitForObject(":_listTab_XTreeWidget_9");
            doubleClickItem(":_listTab_XTreeWidget_9","1950", 10, 8, 0, Qt.LeftButton);
            
            clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar","General");
            waitForObject(":_generalTab.Inventory Site_QRadioButton");
            clickButton(":_generalTab.Inventory Site_QRadioButton");
            waitForObject(":_whsTypeStack._bolNumber_XLineEdit");
            type(":_whsTypeStack._bolNumber_XLineEdit", "10000");
            type(":_whsTypeStack._countTagNumber_XLineEdit", "20000");
            clickButton(":_whsTypeStack.Shipping Site_QCheckBox");
            clickButton(":_whsTypeStack.Force the use of Count Slips_QCheckBox");
            clickButton(":_whsTypeStack.Enforce the use of Zones_QCheckBox");
            type(":_whsTypeStack._shipcomm_XLineEdit", "0.00");
            
            clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar", "Site Locations");
            waitForObject(":_locationsTab.Enforce ARBL Naming Convention_QGroupBox");    
            type(":_locationsTab.Enforce ARBL Naming Convention_QGroupBox","Space>");
            findObject(":Enforce ARBL Naming Convention._aisleSize_QSpinBox").clear();
            type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox");
            findObject(":Enforce ARBL Naming Convention._rackSize_QSpinBox").clear();
            type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_2");
            findObject(":Enforce ARBL Naming Convention._binSize_QSpinBox").clear();
            type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_3");
            findObject(":Enforce ARBL Naming Convention._locationSize_QSpinBox");
            type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_4");
            clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar", "Site Zones");
            snooze(1);
            
            waitForObject(":List Calendars.New_QPushButton_2");
            clickButton(":List Calendars.New_QPushButton_2");
            waitForObject(":_name_XLineEdit_32");
            type(":_name_XLineEdit_32", "FG1");
            type(":_description_XLineEdit_43", "Finished Goods Zone1");
            clickButton(":List Sites.Save_QPushButton");
            snooze(1);
            clickButton(":List Calendars.New_QPushButton_2");
            waitForObject(":_name_XLineEdit_32");
            type(":_name_XLineEdit_32", "RM1");
            type(":_description_XLineEdit_43", "Raw Materials Zone1");
            clickButton(":List Sites.Save_QPushButton");
            waitForObject(":Save_QPushButton");
            clickButton(":Save_QPushButton");
            waitForObject(":List Sites._warehouse_XTreeWidget");
            if(object.exists("{column='0' container=':List Sites._warehouse_XTreeWidget' text='WH1' type='QModelIndex'}"))
                test.pass("Site: Prodiem Toys Site1 created ");
            else test.fail("Site: Prodiem Toys Site1 not created ");
            
            
        }
        else if(appEdition=="PostBooks")
        {
            waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");   
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "Maintain...");
            activateItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "Maintain...");
            waitForObject(":_code_XLineEdit_14");
            type(":_code_XLineEdit_14", "WH1");
            type(":_sitetype_XComboBox_2", "WHSE");
            type(":_description_XLineEdit_26", "Prodiem Toys Site1");
            type(":_addressGroup.XLineEdit_XLineEdit", "street addr line1");
            type(":_addressGroup.XLineEdit_XLineEdit_2", "street addr line2");
            type(":_addressGroup.XLineEdit_XLineEdit_3", "street addr line3");
            type(":_addressGroup.XLineEdit_XLineEdit_4", "city1");
            type(":_addressGroup.XLineEdit_XLineEdit_5", "23234324");
            clickItem(":_addressGroup._country_XComboBox_2", "United States", 0, 0, 1, Qt.LeftButton);
            snooze(1);
            waitForObject(":_addressGroup._state_XComboBox_4");
            clickItem(":_addressGroup._state_XComboBox_4","VA",0, 0, 1, Qt.LeftButton);
            snooze(1);          
            
            waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
            waitForObject(":_accountGroup_QLabel");
            sendEvent("QMouseEvent", ":_accountGroup_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
            waitForObjectItem(":_QMenu", "List...");
            activateItem(":_QMenu", "List...");
            waitForObject(":_listTab_XTreeWidget_9");
            doubleClickItem(":_listTab_XTreeWidget_9","1950", 10, 8, 0, Qt.LeftButton);
            
            snooze(0.1);
            clickTab(":Site.qt_tabwidget_tabbar_QTabBar", "Site Locations");
            waitForObject(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2");
            findObject(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2").clear();
            waitForObject(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2");
            type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2", "2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_5");
            findObject(":Enforce ARBL Naming Convention._rackSize_QSpinBox_2").clear();
            waitForObject(":Enforce ARBL Naming Convention._rackSize_QSpinBox_2");
            type(":Enforce ARBL Naming Convention._rackSize_QSpinBox_2","2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_6");
            findObject(":Enforce ARBL Naming Convention._binSize_QSpinBox_2").clear();
            waitForObject(":Enforce ARBL Naming Convention._binSize_QSpinBox_2");
            type(":Enforce ARBL Naming Convention._binSize_QSpinBox_2","2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_7");
            findObject(":Enforce ARBL Naming Convention._locationSize_QSpinBox_2").clear();
            waitForObject(":Enforce ARBL Naming Convention._locationSize_QSpinBox_2");
            type(":Enforce ARBL Naming Convention._locationSize_QSpinBox_2","2");
            waitForObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_8");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_8");
            snooze(1);
            clickTab(":Site.qt_tabwidget_tabbar_QTabBar", "Site Zones");
            snooze(1);

              waitForObject(":_zonesTab.New_QPushButton");
            clickButton(":_zonesTab.New_QPushButton");
            waitForObject(":_name_XLineEdit_32");
            type(":_name_XLineEdit_32", "FG1");
            type(":_description_XLineEdit_43", "Finished Goods Zone1");
            clickButton(":List Sites.Save_QPushButton");
            
            snooze(1);
            clickButton(":_zonesTab.New_QPushButton");
            waitForObject(":_name_XLineEdit_32");
            
            type(":_name_XLineEdit_32", "RM1");
            type(":_description_XLineEdit_43", "Raw Materials Zone1");
            clickButton(":List Sites.Save_QPushButton");
            
            waitForObject(":Save_QPushButton_2");
            clickButton(":Save_QPushButton_2");
            test.log("site created:WH1");
            
        }
        
        
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            
            //-------Create Inventory Site: WH2-----------------
            waitForObject(":List Sites.New_QPushButton");
            clickButton(":List Sites.New_QPushButton");
            waitForObject(":_code_XLineEdit_3");
            type(":_code_XLineEdit_3", "WH2");
            type(":_description_XLineEdit_5", "Prodiem Toys Site2");
            if(findObject(":_sitetype_XComboBox").currentText!= "WHSE")
                type(":_sitetype_XComboBox","WHSE");
            type(":_addressGroup.XLineEdit_XLineEdit", "street addr line1");
            type(":_addressGroup.XLineEdit_XLineEdit_2", "street addr line2");
            type(":_addressGroup.XLineEdit_XLineEdit_3", "street addr line3");
            type(":_addressGroup.XLineEdit_XLineEdit_4", "city1");
            type(":_addressGroup.XLineEdit_XLineEdit_5", "23234324");
            clickItem(":_addressGroup._country_XComboBox_2", "United States", 0, 0, 1, Qt.LeftButton);
            snooze(1);
            waitForObject(":_addressGroup._state_XComboBox_4");
            clickItem(":_addressGroup._state_XComboBox_4","VA",0, 0, 1, Qt.LeftButton);
            snooze(1);
            
            waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
            waitForObject(":_accountGroup_QLabel");
            sendEvent("QMouseEvent", ":_accountGroup_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
            waitForObjectItem(":_QMenu", "List...");
            activateItem(":_QMenu", "List...");
            waitForObject(":_listTab_XTreeWidget_9");
            doubleClickItem(":_listTab_XTreeWidget_9","1950", 10, 8, 0, Qt.LeftButton);
            snooze(0.1);
            clickTab(":Site.qt_tabwidget_tabbar_QTabBar", "Site Locations");
            waitForObject(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2");
            findObject(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2").clear();
            waitForObject(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2");
            type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2", "2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_5");
            findObject(":Enforce ARBL Naming Convention._rackSize_QSpinBox_2").clear();
            waitForObject(":Enforce ARBL Naming Convention._rackSize_QSpinBox_2");
            type(":Enforce ARBL Naming Convention._rackSize_QSpinBox_2","2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_6");
            findObject(":Enforce ARBL Naming Convention._binSize_QSpinBox_2").clear();
            waitForObject(":Enforce ARBL Naming Convention._binSize_QSpinBox_2");
            type(":Enforce ARBL Naming Convention._binSize_QSpinBox_2","2");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_7");
            findObject(":Enforce ARBL Naming Convention._locationSize_QSpinBox_2").clear();
            waitForObject(":Enforce ARBL Naming Convention._locationSize_QSpinBox_2");
            type(":Enforce ARBL Naming Convention._locationSize_QSpinBox_2","2");
            waitForObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_8");
            clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_8");
            snooze(1);
            clickTab(":Site.qt_tabwidget_tabbar_QTabBar", "Site Zones");
            snooze(1);

              waitForObject(":List Calendars.New_QPushButton_2");
            clickButton(":List Calendars.New_QPushButton_2");
            waitForObject(":_name_XLineEdit_31");
            type(":_name_XLineEdit_31", "FG1");
            type(":_description_XLineEdit_43", "Finished Goods Zone1");
            clickButton(":Site Zone.Save_QPushButton");
            
            snooze(1);
            clickButton(":List Calendars.New_QPushButton_2");
            waitForObject(":_name_XLineEdit_31");
            
            type(":_name_XLineEdit_31", "RM1");
            type(":_description_XLineEdit_43", "Raw Materials Zone1");
            clickButton(":Site Zone.Save_QPushButton");
            
            
            clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar","General");
            waitForObject(":_generalTab.Inventory Site_QRadioButton");
            clickButton(":_generalTab.Inventory Site_QRadioButton");
            waitForObject(":_numberGroup._bolNumber_XLineEdit");
            findObject(":_numberGroup._bolNumber_XLineEdit").clear();
            type(":_numberGroup._bolNumber_XLineEdit", "WH2");
            findObject(":_countTagPrefix_XLineEdit_2").clear();
            type(":_countTagPrefix_XLineEdit_2", "WH2");
            type(":_whsTypeStack._bolNumber_XLineEdit", "10000");
            type(":_whsTypeStack._countTagNumber_XLineEdit", "20000");
            clickButton(":_whsTypeStack.Shipping Site_QCheckBox");
            clickButton(":_whsTypeStack.Force the use of Count Slips_QCheckBox");
            clickButton(":_whsTypeStack.Enforce the use of Zones_QCheckBox");
            type(":_whsTypeStack._shipcomm_XLineEdit", "0.00");
            
            waitForObject(":Save_QPushButton_2");
            clickButton(":Save_QPushButton_2");
            waitForObject(":List Sites._warehouse_XTreeWidget");
            if(object.exists("{column='0' container=':List Sites._warehouse_XTreeWidget' text='WH2' type='QModelIndex'}"))
                test.pass("Site: Prodiem Toys Site2 created");
            else test.fail("Site: Prodiem Toys Site2 not created");
            
            waitForObject(":List Sites.Close_QPushButton");
            clickButton(":List Sites.Close_QPushButton");
            
            
        }
        
    } catch(e){test.fail("Exception in Creating Site"+ e );}
    
    
    
    //----------Configure: Inventory Module-----------------
    try{

        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Inventory",10,10, 0, Qt.LeftButton);
        waitForObject(":Configure.Inventory_QModelIndex");
        mouseClick(":Configure.Inventory_QModelIndex", 30, 3, 0, Qt.LeftButton);
        waitForObject(":_eventFence_QSpinBox");
        type(":_eventFence_QSpinBox", "<Ctrl+A>");
        type(":_eventFence_QSpinBox", "<Del>");
        type(":_eventFence_QSpinBox", "30");
        if(!findObject(":_inventory.Post Item Site Changes to the Change Log_QCheckBox").checked)
            clickButton(":_inventory.Post Item Site Changes to the Change Log_QCheckBox");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            if(!findObject(":Multiple Sites.Enable Shipping Interface from Transfer Order screen_QCheckBox").checked)
                clickButton(":Multiple Sites.Enable Shipping Interface from Transfer Order screen_QCheckBox");
            if(!findObject(":Multiple Sites.Post Transfer Order Changes to the Change Log_QCheckBox").checked)
                clickButton(":Multiple Sites.Post Transfer Order Changes to the Change Log_QCheckBox");
            while(findObject(":_toNumGeneration_QComboBox").currentText!="Automatic")
                type(":_toNumGeneration_QComboBox","<Down>");
            waitForObject(":_toNextNum_XLineEdit");
            findObject(":_toNextNum_XLineEdit").clear();
            waitForObject(":_toNextNum_XLineEdit");
            type(":_toNextNum_XLineEdit", "90000");
            if(!findObject(":_inventory.Enable Lot/Serial Control_QCheckBox").checked)
                clickButton(":_inventory.Enable Lot/Serial Control_QCheckBox");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":Multiple Sites.Enable Shipping Interface from Transfer Order screen_QCheckBox"),"Enable Shipping Interface - not visible");
            test.xverify(object.exists(":Multiple Sites.Post Transfer Order Changes to the Change Log_QCheckBox"),"Post Transfer Order Changes - not visible");
            test.xverify(object.exists(":_toNumGeneration_QComboBox"),"To Number Generation combobox - not visible");
            test.xverify(object.exists(":_toNextNum_XLineEdit"),"To Next number - not visible");
            test.xverify(object.exists(":_inventory.Enable Lot/Serial Control_QCheckBox"),"Enable Lot/Serial Control - not visible");        
            
        }
        if(!findObject(":Costing Methods Allowed.Average_QCheckBox").checked)
            clickButton(":Costing Methods Allowed.Average_QCheckBox");
        if(!findObject(":When Count Tag Qty. exceeds Slip Qty..Do Not Post Count Tag_QRadioButton").checked)
            clickButton(":When Count Tag Qty. exceeds Slip Qty..Do Not Post Count Tag_QRadioButton");
        if(!findObject(":Count Slip # Auditing.Allow Duplications_QRadioButton").checked)
            clickButton(":Count Slip # Auditing.Allow Duplications_QRadioButton");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Inventory Module Configured");
    }catch(e){test.fail("Exception in configuring Inventory module"+ e);}
    


    //---Create User by Role--
    createUserByRole("RUNREGISTER");
    
    try{
        //----Read Username based on Role------
        var set = testData.dataset("login.tsv");
        var username;
        for (var records in set)
        {
            username=testData.field(set[records],"USERNAME");
            role=testData.field(set[records],"ROLE");
            if(role=="RUNREGISTER") break;
            
        }
    }catch(e){test.fail("Exception caught in reading login.tsv");}
    
    snooze(2);
    
    //-------------User Preferences------------------------
    try{
        
        if(OS.name=="Darwin")
        {
            
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
            waitForObjectItem("{ title='Products' type='QMenu' visible='1' window=':xTuple ERP: OpenMFG Edition_GUIClient'}","Preferences...");
            
            activateItem("{ title='Products' type='QMenu' visible='1' window=':xTuple ERP: OpenMFG Edition_GUIClient'}","Preferences...");
        } 
        else
        {
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
        }
        
        waitForObject(":_userGroup.Selected User:_QRadioButton");
        clickButton(":_userGroup.Selected User:_QRadioButton");
        waitForObject(":_userGroup._user_XComboBox");
        clickItem(":_userGroup._user_XComboBox", username, 0, 0, 1, Qt.LeftButton);
//        waitForObject(":Interface Options.Tabbed Windows_QRadioButton");
//        
//        if(!findObject(":Interface Options.Tabbed Windows_QRadioButton").checked)
//            clickButton(":Interface Options.Tabbed Windows_QRadioButton");
//        snooze(1);
//        if(object.exists(":Notice.Remind me about this again._QCheckBox"))
//        {
//            waitForObject(":Notice.Remind me about this again._QCheckBox");
//            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
//                clickButton(":Notice.Remind me about this again._QCheckBox");
//            snooze(0.1);
//            waitForObject(":Notice.OK_QPushButton");
//            clickButton(":Notice.OK_QPushButton");
//        }
        snooze(1);
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            snooze(1);
            waitForObject(":Background Image.Image:_QRadioButton");
            clickButton(":Background Image.Image:_QRadioButton");
            while(findObject(":Background Image.Image:_QRadioButton").checked!=true)
                snooze(0.1);
            while(findObject(":Background Image...._QPushButton").enabled!=true)
                snooze(0.1);
            waitForObject(":Background Image...._QPushButton");
            clickButton(":Background Image...._QPushButton");    
            waitForObject(":Image List._image_XTreeWidget");
            doubleClickItem(":Image List._image_XTreeWidget","BACKGROUND",0,0,1,Qt.LeftButton);
        }
        
        snooze(1);
        findObject(":_idleTimeout_QSpinBox").clear();
        snooze(2);
        if(!findObject(":Interface Options.Ignore Missing Translations_QCheckBox").checked)
            clickButton(":Interface Options.Ignore Missing Translations_QCheckBox");
        snooze(1);
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            clickButton(":Preferred Site:.Site:_QRadioButton");
        else if(appEdition=="PostBooks")
            test.xverify(object.exists(":Preferred Site:.Site:_QRadioButton"),"Preferred Site - not visible");
        waitForObject(":User Preferences.qt_tabwidget_tabbar_QTabBar");
        clickTab(":User Preferences.qt_tabwidget_tabbar_QTabBar", "Menu");
        waitForObject(":_menu.Show Inventory Menu_QCheckBox");
        clickButton(":_menu.Show Inventory Menu_QCheckBox");
        waitForObject(":_menu.Show Inventory Toolbar_QCheckBox");
        clickButton(":_menu.Show Inventory Toolbar_QCheckBox");
        waitForObject(":_menu.Show Products Menu_QCheckBox");
        clickButton(":_menu.Show Products Menu_QCheckBox");
        waitForObject(":_menu.Show Products Toolbar_QCheckBox");
        clickButton(":_menu.Show Products Toolbar_QCheckBox");
        if(appEdition=="Manufacturing" || appEdition=="Standard")
        {
            waitForObject(":_menu.Show Schedule Menu_QCheckBox");
            clickButton(":_menu.Show Schedule Menu_QCheckBox");
            waitForObject(":_menu.Show Schedule Toolbar_QCheckBox");
            clickButton(":_menu.Show Schedule Toolbar_QCheckBox");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_menu.Show Schedule Menu_QCheckBox"),"Show Schedule Menu_QCheckBox - not visible");
            test.xverify(object.exists(":_menu.Show Schedule Toolbar_QCheckBox"),"Show Schedule Toolbar - not visible");
        }
        waitForObject(":_menu.Show Purchase Menu_QCheckBox");
        clickButton(":_menu.Show Purchase Menu_QCheckBox");
        waitForObject(":_menu.Show Purchase Toolbar_QCheckBox");
        clickButton(":_menu.Show Purchase Toolbar_QCheckBox");
        waitForObject(":_menu.Show Manufacture Menu_QCheckBox");
        clickButton(":_menu.Show Manufacture Menu_QCheckBox");
        waitForObject(":_menu.Show Manufacture Toolbar_QCheckBox");
        clickButton(":_menu.Show Manufacture Toolbar_QCheckBox");
        waitForObject(":_menu.Show CRM Menu_QCheckBox");
        clickButton(":_menu.Show CRM Menu_QCheckBox");
        waitForObject(":_menu.Show CRM Toolbar_QCheckBox");
        clickButton(":_menu.Show CRM Toolbar_QCheckBox");
        waitForObject(":_menu.Show Sales Menu_QCheckBox");
        clickButton(":_menu.Show Sales Menu_QCheckBox");
        waitForObject(":_menu.Show Sales Toolbar_QCheckBox");
        clickButton(":_menu.Show Sales Toolbar_QCheckBox");
        waitForObject(":_menu.Show Accounting Menu_QCheckBox");
        clickButton(":_menu.Show Accounting Menu_QCheckBox");
        waitForObject(":_menu.Show Accounting Toolbar_QCheckBox");
        clickButton(":_menu.Show Accounting Toolbar_QCheckBox");
        snooze(1);
        waitForObject(":User Preferences.qt_tabwidget_tabbar_QTabBar");
        snooze(1);
        if(appEdition=="Manufacturing")
        {
            clickTab(":User Preferences.qt_tabwidget_tabbar_QTabBar", "Events");
            snooze(1);
            var sWidgetTreeControl = ":_events._event_XTreeWidget";
            waitForObject(sWidgetTreeControl);
            var obj_TreeWidget = findObject(sWidgetTreeControl);
            obj_TreeWidget = cast(obj_TreeWidget, QTreeWidget);
            var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
            var iNumberOfRootItems = obj_TreeRootItem.childCount();
            type(sWidgetTreeControl,"<Space>");
            var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
            for(i=0; i<=iNumberOfRootItems ;i++)
            {
                clickItem(":_events._warehouses_XTreeWidget", "WH1", 5, 5, 1, Qt.LeftButton);
                type(sWidgetTreeControl,"<Down>"); 
            }
            clickItem(":_events._warehouses_XTreeWidget", "WH1", 5, 5, 1, Qt.LeftButton); 
        }
        snooze(2);
        waitForObject(":User Preferences.qt_tabwidget_tabbar_QTabBar");
        clickTab(":User Preferences.qt_tabwidget_tabbar_QTabBar","Alarms");
        snooze(1);
        waitForObject(":Default Actions.Event_XCheckBox");
        clickButton(":Default Actions.Event_XCheckBox");
        clickButton(":Default Actions.System Message_XCheckBox");
        
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
        snooze(1);
        test.log("User Preferences of "+username +":saved");
    }catch(e){test.fail("Exception in defining User Preferences:"+e);}
    
}
