function executeChapter1(appVersion)
{
    source(findFile("scripts","functions.js"));
    createDept("MFG","OpenMFG");
    assignPrivileges();
    if(appVersion=="manufacturing")
        createShift("1ST","First");
    createLocale("MYLOCALE","My Locale For Class");
    createGroup("SUPER","Super User Group");
    var newuser="user01";
    createUser(newuser);

    //-------------Configure: Accounting Module----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
    waitForObject(":_mainSize_QSpinBox");
    if(findObject(":_mainSize_QSpinBox").currentText!="4")
    {
        type(":_mainSize_QSpinBox", "<Ctrl+A>");
        type(":_mainSize_QSpinBox", "<Del>");
        type(":_mainSize_QSpinBox", "4");
    }
    waitForObject(":_gl.Use Company Segment_QGroupBox");
    if(!findObject(":_gl.Use Company Segment_QGroupBox").checked)
        clickButton(":_gl.Use Company Segment_QGroupBox");
    if(findObject(":_companySegmentSize_QSpinBox_2").currentText!="2")
    {
        type(":_companySegmentSize_QSpinBox_2", "<Ctrl+A>");
        type(":_companySegmentSize_QSpinBox_2", "<Del>");
        type(":_companySegmentSize_QSpinBox_2", "2");
    }
   
    if(findObject(":_subaccountSize_QSpinBox_2").currentText!="2")
    {
        type(":_subaccountSize_QSpinBox_2", "<Ctrl+A>");    
        type(":_subaccountSize_QSpinBox_2", "<Del>");
        type(":_subaccountSize_QSpinBox_2", "2");
    }
    if(appVersion=="manufacturing"||appVersion=="standard")
    {
        waitForObject(":Use Company Segment.Enable External Company Consolidation_QCheckBox");
        if(!findObject(":Use Company Segment.Enable External Company Consolidation_QCheckBox").checked)
            clickButton(":Use Company Segment.Enable External Company Consolidation_QCheckBox");
    }
    waitForObject(":_gl.Use Profit Centers_QGroupBox");
    if(!findObject(":_gl.Use Profit Centers_QGroupBox").checked)
        type(":_gl.Use Profit Centers_QGroupBox"," ");
    waitForObject(":Use Profit Centers.Allow Free-Form Profit Centers_QCheckBox");
    if(!findObject(":Use Profit Centers.Allow Free-Form Profit Centers_QCheckBox").checked)
        clickButton(":Use Profit Centers.Allow Free-Form Profit Centers_QCheckBox");
    waitForObject(":_gl.Use Subaccounts_QGroupBox");
    if(!findObject(":_gl.Use Subaccounts_QGroupBox").checked)
       type(":_gl.Use Subaccounts_QGroupBox"," ");
    waitForObject(":Use Subaccounts.Allow Free-Form Subaccounts_QCheckBox");
    if(findObject(":Use Subaccounts.Allow Free-Form Subaccounts_QCheckBox").checked)
        findObject(":Use Subaccounts.Allow Free-Form Subaccounts_QCheckBox").checked=false;
    if(findObject(":_profitCenterSize_QSpinBox_2").currentText!="2")
    {
        waitForObject(":_profitCenterSize_QSpinBox_2");
        type(":_profitCenterSize_QSpinBox_2", "<Ctrl+A>");
        type(":_profitCenterSize_QSpinBox_2", "<Del>");
        type(":_profitCenterSize_QSpinBox_2", "2");
    }
    waitForObject(":_gl.Enforce mandatory notes for Manual G/L Entries_QCheckBox");
    if(!findObject(":_gl.Enforce mandatory notes for Manual G/L Entries_QCheckBox").checked)
        clickButton(":_gl.Enforce mandatory notes for Manual G/L Entries_QCheckBox");
    waitForObject(":_gl.Allow manual entry of G/L Account Numbers_QCheckBox");
    if(!findObject(":_gl.Allow manual entry of G/L Account Numbers_QCheckBox").checked)
        clickButton(":_gl.Allow manual entry of G/L Account Numbers_QCheckBox");
    waitForObject(":_taxauth_XComboBox");
    clickItem(":_taxauth_XComboBox", "None", 0, 0, 1, Qt.LeftButton);
    waitForObject(":Meaning of Currency Exchange Rates:.Foreign × Exchange Rate = Base_QRadioButton");
    clickButton(":Meaning of Currency Exchange Rates:.Foreign × Exchange Rate = Base_QRadioButton");
    waitForObject(":Accounting Configuration.Save_QPushButton");
    clickButton(":Accounting Configuration.Save_QPushButton");
    snooze(0.5);
    if(object.exists(":Company ID Correct?.Yes_QPushButton"))
    clickButton(":Company ID Correct?.Yes_QPushButton");
    test.log("Acconting Module Configured");
  
    //-------Create Company: Prodiem---------
    createCompany("01","Prodiem");
    


    //-------------Accounting-Profit Center Number---------------------
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
    
    var sWidgetTreeControl = ":List Profit Centers._prftcntr_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=1;sNameOfRootItem!="01" || i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
        type(sWidgetTreeControl,"<Down>"); 
    }
    if(sNameOfRootItem=="01")
        test.pass("Profit Center Number: 01 created");
    else
        test.fail("Profit Center Number: 01 not created");
    waitForObject(":List Profit Centers.Close_QPushButton");
    clickButton(":List Profit Centers.Close_QPushButton");

  
    //--------------Accounting-Account-SubAccount Numbers-----------------
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
    
    var sWidgetTreeControl = ":List Subaccounts._subaccnt_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=1;sNameOfRootItem!="01" || i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
        type(sWidgetTreeControl,"<Down>"); 
    }
    if(sNameOfRootItem=="01")
        test.pass("Profit Center Number: 01 created");
    else
        test.fail("Profit Center Number: 01 not created");
    waitForObject(":List Subaccounts.Close_QPushButton");
    clickButton(":List Subaccounts.Close_QPushButton");
    test.log("SubAccount: 01-General created");

  
  
    //------------Account-Account-SubAccount Types-----------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Subaccount Types...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Subaccount Types...");

  
    //--------------SubAccount Types: SO-Revenue-Other Revenue------------------
    waitForObject(":List G/L Subaccount Types.New_QPushButton");
    clickButton(":List G/L Subaccount Types.New_QPushButton");
    waitForObject(":List G/L Subaccount Types._code_XLineEdit");
    type(":List G/L Subaccount Types._code_XLineEdit", "SO");
    clickItem(":List G/L Subaccount Types._type_XComboBox", "Revenue", 0, 0, 1, Qt.LeftButton);
    type(":List G/L Subaccount Types._description_XLineEdit", "Other Revenue");
    waitForObject(":List G/L Subaccount Types.Save_QPushButton");
    clickButton(":List G/L Subaccount Types.Save_QPushButton");
    test.log("SubAccount: SO-Revenue-Other Revenue created");
  
    //---------------SubAccount Types: DXP-Expenses-Depreciation Expense------------
    waitForObject(":List G/L Subaccount Types.New_QPushButton");
    clickButton(":List G/L Subaccount Types.New_QPushButton");
    waitForObject(":List G/L Subaccount Types._code_XLineEdit");
    type(":List G/L Subaccount Types._code_XLineEdit", "DXP");
    clickItem(":List G/L Subaccount Types._type_XComboBox", "Expense", 0, 0, 1, Qt.LeftButton);
    type(":List G/L Subaccount Types._description_XLineEdit", "Depreciation Expense");
    waitForObject(":List G/L Subaccount Types.Save_QPushButton");
    clickButton(":List G/L Subaccount Types.Save_QPushButton");
      test.log("SubAccount: DXP-Expenses-Depreciation Expense created");
    
    var sWidgetTreeControl = ":List G/L Subaccount Types._subaccnttypes_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    var cnt=0;
    for(i=1;i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
        if(sNameOfRootItem=="SO" || sNameOfRootItem=="DXP") cnt++;
        type(sWidgetTreeControl,"<Down>"); 
    }
    if(cnt==2)
        test.pass("SubAccounts created");
    else
        test.fail("SubAccounts not created");
    waitForObject(":List G/L Subaccount Types.Close_QPushButton");
    clickButton(":List G/L Subaccount Types.Close_QPushButton");
  
    
    //--------------Create Currencies------------------------       
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Currencies...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Currencies...");

    //----------Create Base Currency-----------------------
    waitForObject(":List Currencies.New_QPushButton");
    clickButton(":List Currencies.New_QPushButton");
    waitForObject(":List Currencies._currName_QLineEdit");
    type(":List Currencies._currName_QLineEdit", "US Dollars");
    waitForObject(":List Currencies._currSymbol_QLineEdit");
    type(":List Currencies._currSymbol_QLineEdit", "$");
    waitForObject(":List Currencies._currSymbol_QLineEdit");
    waitForObject(":List Currencies._currAbbr_QLineEdit");
    type(":List Currencies._currAbbr_QLineEdit", "USD");
    waitForObject(":List Currencies.Base Currency_QCheckBox");
    clickButton(":List Currencies.Base Currency_QCheckBox");
    waitForObject(":List Currencies.Yes_QPushButton");
    clickButton(":List Currencies.Yes_QPushButton");
    waitForObject(":List Currencies.Save_QPushButton");
    clickButton(":List Currencies.Save_QPushButton");
    waitForObject(":List Currencies.Yes_QPushButton");
    clickButton(":List Currencies.Yes_QPushButton");
   
    //----------Create Foreign currency - EUR------------
    waitForObject(":List Currencies.New_QPushButton");
    clickButton(":List Currencies.New_QPushButton");
    waitForObject(":List Currencies._currName_QLineEdit");
    type(":List Currencies._currName_QLineEdit", "Euros");
    waitForObject(":List Currencies._currSymbol_QLineEdit");
    type(":List Currencies._currSymbol_QLineEdit", "EUR");
    waitForObject(":List Currencies._currAbbr_QLineEdit");
    type(":List Currencies._currAbbr_QLineEdit", "EUR");
    waitForObject(":List Currencies.Save_QPushButton");
    clickButton(":List Currencies.Save_QPushButton"); 
     waitForObject(":List Currencies._curr_XTreeWidget");
    if(!clickItem(":List Currencies._curr_XTreeWidget", "USD",5,5,1,Qt.LeftButton))
        test.pass("Currency: USD created");
    else test.fail("Currency: USD not created");
    
    if(!clickItem(":List Currencies._curr_XTreeWidget", "EUR", 5, 5, 1, Qt.LeftButton))
        test.pass("Currency: EUR created");
    else test.fail("Currency: EUR not created");
    waitForObject(":List Currencies.Close_QPushButton");
    clickButton(":List Currencies.Close_QPushButton");
   
  
    //----------Create Exchange Rates-------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Exchange Rates...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Exchange Rates...");
    waitForObject(":List Currency Exchange Rates.New_QPushButton");
    clickButton(":List Currency Exchange Rates.New_QPushButton");
    waitForObject(":List Currency Exchange Rates._rate_XLineEdit");
    type(":List Currency Exchange Rates._rate_XLineEdit", "1.36");
    type(":List Currency Exchange Rates.XDateEdit_XDateEdit", "-30");
    type(":List Currency Exchange Rates.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":List Currency Exchange Rates.XDateEdit_XDateEdit_2");
    type(":List Currency Exchange Rates.XDateEdit_XDateEdit_2", "+365");
    type(":List Currency Exchange Rates.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":List Currency Exchange Rates.Save_QPushButton");
    clickButton(":List Currency Exchange Rates.Save_QPushButton");
    waitForObject(":List Currency Exchange Rates._conversionRates_XTreeWidget");
    if(!clickItem(":List Currency Exchange Rates._conversionRates_XTreeWidget", "EUR - EUR", 5, 5, 1, Qt.LeftButton))
        test.pass("Exchange Rate of EUR created");
    else test.fail("Exchange Rate of EUR not created");
    waitForObject(":List Currency Exchange Rates.Close_QPushButton");
    clickButton(":List Currency Exchange Rates.Close_QPushButton");
    


    //-----------Chart Of Accounts-------------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    waitForObject(":_account_XTreeWidget");
    
    COA("01","01","1950","01","Unassigned Inv Transactions","Asset","IN");
    if(!clickItem(":_account_XTreeWidget","Unassigned Inv Transactions",5,5,1,Qt.LeftButton))
        test.pass("Chart of Account: Unassigned Inv Transactions created");
    
    COA("01","01","3030","01","Retained Earnings","Equity","EC");
    if(!clickItem(":_account_XTreeWidget","Retained Earnings",5,5,1,Qt.LeftButton))
        test.pass("Chart of Account: Retained Earnings created");
  
    COA("01","01","3040","01","Stock Class B","Equity","EDC");
    if(!clickItem(":_account_XTreeWidget","Stock Class B",5,5,1,Qt.LeftButton))
        test.pass("Chart of Account: Stock Class B created");
 
    COA("01","01","8990","01","Currency Gain / Loss","Expense","EXP");
    if(!clickItem(":_account_XTreeWidget","Currency Gain / Loss",5,5,1,Qt.LeftButton))
        test.pass("Chart of Account: Currency Gain / Loss created");
     
    COA("01","01","8995","01","G/L Series Discrepancy","Expense","EXP");   
    if(!clickItem(":_account_XTreeWidget","G/L Series Discrepancy",5,5,1,Qt.LeftButton))
        test.pass("Chart of Account: G/L Series Discrepancy created");
    
    waitForObject(":Chart of Accounts.Close_QPushButton");
    clickButton(":Chart of Accounts.Close_QPushButton");

    //------------Configure:Accounting Module---------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
    waitForObject(":_gl._main_XLineEdit_3");
    type(":_gl._main_XLineEdit_3", "01-01-3030-01");
    type(":_gl._main_XLineEdit_3", "<Tab>");
    type(":_gl._main_XLineEdit", "01-01-8990-01");
    type(":_gl._main_XLineEdit", "<Tab>");
    type(":_gl._main_XLineEdit_2", "01-01-8995-01");
    type(":_gl._main_XLineEdit_2", "<Tab>");
    clickButton(":Accounting Configuration.Save_QPushButton");
    snooze(0.5);
    if(object.exists(":Company ID Correct?.Yes_QPushButton"))
    clickButton(":Company ID Correct?.Yes_QPushButton");
    test.log("Accounting Module configured"); 

  
    //-----------------Configure: Products Module--------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Products...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Products...");
    waitForObject(":Products Configuration.Post Item Changes to the Change Log_QCheckBox");
    if(appVersion=="manufacturing")
    {
        if(!findObject(":Products Configuration.Enable Work Center Routings_QGroupBox").checked)
            findObject(":Products Configuration.Enable Work Center Routings_QGroupBox").checked=true;
        if(!findObject(":Track Machine Overhead.as Machine Overhead_QRadioButton").checked)
            findObject(":Track Machine Overhead.as Machine Overhead_QRadioButton").checked=true;
        if(!findObject(":Products Configuration.Enable Breeder Bills of Materials_QCheckBox").checked)
            findObject(":Products Configuration.Enable Breeder Bills of Materials_QCheckBox").checked=true;
        if(!findObject(":Products Configuration.Enable Transforms_QCheckBox").checked)
            findObject(":Products Configuration.Enable Transforms_QCheckBox").checked=true;
        if(!findObject(":Products Configuration.Enable Revision Control_QCheckBox").checked)
        findObject(":Products Configuration.Enable Revision Control_QCheckBox").checked=true;
    }
    if(!findObject(":Products Configuration.Post Item Changes to the Change Log_QCheckBox").checked)
        findObject(":Products Configuration.Post Item Changes to the Change Log_QCheckBox").checked= true;
    if(findObject(":Products Configuration.Allow Inactive Items to be Added to BOMs_QCheckBox").checked)
        findObject(":Products Configuration.Allow Inactive Items to be Added to BOMs_QCheckBox").checked=false;     
    if(findObject(":Defaults.Set Sold Items as Exclusive_QCheckBox").checked)
        findObject(":Defaults.Set Sold Items as Exclusive_QCheckBox").checked=false;
    type(":_issueMethod_QComboBox", "Mixed");
    clickButton(":Products Configuration.Save_QPushButton");
    waitForObject(":Enable Revision Control.Yes_QPushButton");
    clickButton(":Enable Revision Control.Yes_QPushButton");
    test.log("Product Module Configured");    

    
    
    //----------Define Encryption (metric)------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Encryption...");
    waitForObject(":Cannot Read Configuration.<p>Cannot read encrypted information from database._QLabel");
    waitForObject(":xTuple ERP: *_QPushButton");
    clickButton(":xTuple ERP: *_QPushButton");
    waitForObject(":_ccEncKeyName_QLineEdit");
     
    if(findObject(":_ccEncKeyName_QLineEdit").text!="xTuple.key")
    {
        type(":_ccEncKeyName_QLineEdit", "<Ctrl+A>");
        type(":_ccEncKeyName_QLineEdit", "<Del>");
        type(":_ccEncKeyName_QLineEdit", "xTuple.key");
        test.log("Encryption: key name changed");
    }
    if(findObject(":Encryption Configuration_FileLineEdit").text!="c:\\crypto")
    {
        type(":Encryption Configuration_FileLineEdit", "<Ctrl+A>");
        type(":Encryption Configuration_FileLineEdit", "<Del>");
        type(":Encryption Configuration_FileLineEdit", "c:\\crypto");
        test.log("Encryption: Windows location changed");
    }
    if(findObject(":Encryption Configuration_FileLineEdit_2").text!="\\home\\crypto")
    {
        type(":Encryption Configuration_FileLineEdit_2", "<Ctrl+A>");
        type(":Encryption Configuration_FileLineEdit_2", "<Del>");
        type(":Encryption Configuration_FileLineEdit_2", "\\home\\crypto");
        test.log("Encryption: Linux location changed");
    }
    if(findObject(":Encryption Configuration_FileLineEdit_3").text!="/Users/crypto")
    {
        type(":Encryption Configuration_FileLineEdit_3", "<Ctrl+A>");
        type(":Encryption Configuration_FileLineEdit_3", "<Del>");
        type(":Encryption Configuration_FileLineEdit_3", "/Users/crypto");
        test.log("Encryption: Mac location changed");
    }
    clickButton(":Encryption Configuration.Save_QPushButton");
    test.log("Encryption defined");
  
  
    //---------Define Database Information----------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Database Information...");
    waitForObject(":_description_XLineEdit_4");
    if(findObject(":_description_XLineEdit_4").text!="Practice Database")
    {
        type(":_description_XLineEdit_4", "<Ctrl+A>");
        type(":_description_XLineEdit_4", "<Del>");
        type(":_description_XLineEdit_4", "Practice Database");        
    }
    if(appVersion=="manufacturing"||appVersion=="standard")
    {
        if(findObject(":_defaultFromAddress_XLineEdit").text!="mike@xtuple.com")
        {
            type(":_defaultFromAddress_XLineEdit", "<Ctrl+A>");
            type(":_defaultFromAddress_XLineEdit", "<Del>");
            type(":_defaultFromAddress_XLineEdit", "mike@xtuple.com");
        }
            
        if(!findObject(":Database Information.Enable Batch Manager_QCheckBox").checked)
            clickButton(":Database Information.Enable Batch Manager_QCheckBox");
    
        if(findObject(":Database Information.qt_spinbox_lineedit_QLineEdit").currentText!="30")
        {
            type(":_purgeDays_QSpinBox", "<Ctrl+A>");
            type(":_purgeDays_QSpinBox", "<Del>");
            type(":_purgeDays_QSpinBox", "30");
        }
    }
    if(findObject(":_interval_QSpinBox").currentText!="1")
    {
        type(":_interval_QSpinBox", "<Ctrl+A>");
        type(":_interval_QSpinBox", "<Del>");
        type(":_interval_QSpinBox", "1");    
    }
    if(!findObject(":Database Information.Disallow mismatched client versions_QCheckBox").checked)
        clickButton(":Database Information.Disallow mismatched client versions_QCheckBox");
  
    if(findObject(":_comments_QTextEdit_2").plainText!="Settings for practice database")
    {
        type(":_comments_QTextEdit_2", "<Ctrl+A>");
        type(":_comments_QTextEdit_2", "<Del>");
        type(":_comments_QTextEdit_2", "Settings for practice database");
    }
    clickButton(":Database Information.Save_QPushButton");
    test.log("Database Information Defined");
    
    
     //-----------Rescan privileges--------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");

    
  
    if(appVersion=="manufacturing")
    {
        //---------Setup EDI profiles---------------
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "EDI Profiles...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "EDI Profiles...");
        waitForObject(":List EDI Profiles.New_QPushButton");
        clickButton(":List EDI Profiles.New_QPushButton");
        
        waitForObject(":List EDI Profiles._name_QLineEdit");
        type(":List EDI Profiles._name_QLineEdit", "DUNNING");
        clickItem(":List EDI Profiles._type_QComboBox", "Email", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_stack._emailTo_QLineEdit");
        type(":_stack._emailTo_QLineEdit", "/</email3>");
        type(":_stack._emailTo_QLineEdit", "<home>");
        type(":_stack._emailTo_QLineEdit", "<Del>");
        type(":_stack._emailCC_QLineEdit", "/</email1></email2>");
        type(":_stack._emailCC_QLineEdit", "<home>");
        type(":_stack._emailCC_QLineEdit", "<Del>");
        type(":_stack._emailSubject_QLineEdit", "ProDiem Toys Invoice");
        type(":_stack._emailBody_QTextEdit", "There is an issue with your invoice. Please contact us and reference </docnumber> and </description>. Thank You, ProDiem Accounts Receivable");
        clickButton(":List EDI Profiles.OK_QPushButton");
        waitForObject(":List EDI Profiles.Close_QPushButton");
        clickButton(":List EDI Profiles.Close_QPushButton");
        test.log("EDI Profiles setup completed");
   
    }
  
    //----------Create Incident Category-----------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Categories...");
    activateItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Categories...");
    waitForObject(":List Incident Categories.New_QPushButton");
    clickButton(":List Incident Categories.New_QPushButton");
    
    waitForObject(":_name_XLineEdit_14");
    type(":_name_XLineEdit_14", "DUNNING");
    type(":Incident Category._order_QSpinBox", "<Ctrl+A>");
    type(":Incident Category._order_QSpinBox", "<Del>");
    type(":Incident Category._order_QSpinBox", "90");
    if(appVersion=="manufacturing"||appVersion=="standard")
        clickItem(":List Incident Categories._ediprofile_XComboBox", "DUNNING", 0, 0, 1, Qt.LeftButton);
    type(":Incident Category._descrip_QTextEdit", "Dunning Incident");
    clickButton(":Incident Category.Save_QPushButton");
    waitForObject(":List Incident Categories.Close_QPushButton");
    clickButton(":List Incident Categories.Close_QPushButton");
    test.log("Incident category: Dunning incident created");
    
    
    //-----------Rescan privileges--------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");

    
          
    //-----------Configure: Accounting Module------------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
    waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar", "Accounts Receivable");
    waitForObject(":_ar._nextARMemoNumber_XLineEdit");
    type(":_ar._nextARMemoNumber_XLineEdit", "<Del>");
    type(":_ar._nextARMemoNumber_XLineEdit", "20000");
    if(findObject(":_ar.Hide 'Apply to Balance' button_QCheckBox").checked)
        findObject(":_ar.Hide 'Apply to Balance' button_QCheckBox").checked=false;
    if(!findObject(":_ar.Enable Customer Deposits_QCheckBox").checked)
        findObject(":_ar.Enable Customer Deposits_QCheckBox").checked=true;
    type(":Remit-To Address._name_XLineEdit", "<Del>");
    type(":Remit-To Address._name_XLineEdit", "Prodiem Toys");
    type(":Remit-To Address.Street\nAddress:_XLineEdit", "Account Receivable");
    type(":Remit-To Address.Street\nAddress:_XLineEdit_2", "<Del>");
    type(":Remit-To Address.Street\nAddress:_XLineEdit_2", "12100 Playland way");
    type(":Remit-To Address.Street\nAddress:_XLineEdit_3", "<Del>");
    type(":Remit-To Address.City:_XLineEdit", "Norfolk");
    type(":Remit-To Address.State:_XComboBox", "<Ctrl+A>");
    type(":Remit-To Address.State:_XComboBox", "<Del>");
    type(":Remit-To Address.State:_XComboBox", "VA");
    type(":Country:_QLineEdit", "<Ctrl+A>");
    type(":Country:_QLineEdit", "<Del>");
    type(":Country:_QLineEdit", "United States");
    type(":Remit-To Address._phone_XLineEdit", "<Del>");
    type(":Remit-To Address._phone_XLineEdit", "757-461-3022");
    if(!findObject(":_ar.Credit Warn Customers when Late_QGroupBox").checked)
        findObject(":_ar.Credit Warn Customers when Late_QGroupBox").checked=true;
    type(":Credit Warn Customers when Late._graceDays_QSpinBox", "<Ctrl+A>");
    type(":Credit Warn Customers when Late._graceDays_QSpinBox", "<Del>");
    type(":Credit Warn Customers when Late._graceDays_QSpinBox", "30");
    type(":Credit Warn Customers when Late._graceDays_QSpinBox", "<Tab>");
    waitForObject(":_ar._recurringBuffer_QSpinBox");
    type(":_ar._recurringBuffer_QSpinBox", "<Ctrl+A>");
    type(":_ar._recurringBuffer_QSpinBox", "<Del>");
    type(":_ar._recurringBuffer_QSpinBox", "7");
    type(":_ar._recurringBuffer_QSpinBox", "<Tab>");
    clickItem(":_ar._incdtCategory_XComboBox", "DUNNING", 0, 0, 1, Qt.LeftButton);
    waitForObject(":Accounting Configuration.Save_QPushButton");
    clickButton(":Accounting Configuration.Save_QPushButton");
    test.log("Accounting Module Configured"); 
 
    //---------Configure: Manufacture Module-------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Manufacture...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Manufacture...");
    waitForObject(":Manufacture Configuration._nextWoNumber_XLineEdit");
    type(":Manufacture Configuration._nextWoNumber_XLineEdit", "10000");
    if(findObject(":Manufacture Configuration.Next Work Order #:_QLabel").currentText!="Automatic")
        type(":Manufacture Configuration.Next Work Order #:_QLabel","Automatic");
    if(!findObject(":Manufacture Configuration.Automatically Explode W/O's_QCheckBox").checked)
        findObject(":Manufacture Configuration.Automatically Explode W/O's_QCheckBox").checked=true;
    if(appVersion=="manufacturing")
    {
        if(!findObject(":Manufacture Configuration.Auto fill Post Operation Qty. to Balance_QCheckBox").checked)
            findObject(":Manufacture Configuration.Auto fill Post Operation Qty. to Balance_QCheckBox").checked=true;
    }
    if(!findObject(":Manufacture Configuration.Post Work Order Changes to the Change Log_QCheckBox").checked)
        findObject(":Manufacture Configuration.Post Work Order Changes to the Change Log_QCheckBox").checked=true;     if(!findObject(":Explode W/O's Effective as of:.W/O Start Date_QRadioButton").checked)
        findObject(":Explode W/O's Effective as of:.W/O Start Date_QRadioButton").checked=true;
    if(!findObject(":Default W/O Explosion Level:.Multiple Level_QRadioButton").checked)
        findObject(":Default W/O Explosion Level:.Multiple Level_QRadioButton").checked=true;
    if(!findObject(":Inventory Item Cost Defaults.Post Material Usage Variances_QCheckBox").checked)
        findObject(":Inventory Item Cost Defaults.Post Material Usage Variances_QCheckBox").checked=true;
    if(appVersion=="manufacturing")
    {
        if(!findObject(":Inventory Item Cost Defaults.Post Labor Variances_QCheckBox").checked)
            findObject(":Inventory Item Cost Defaults.Post Labor Variances_QCheckBox").checked=true;
    }
    if(!findObject(":W/O Item Cost Recognition Defaults.Proportional_QRadioButton").checked)
        findObject(":W/O Item Cost Recognition Defaults.Proportional_QRadioButton").checked=true;
    if(appVersion=="manufacturing")
    {
        if(!findObject(":Shop Floor Workbench Posts:.Operations_QRadioButton").checked)
            findObject(":Shop Floor Workbench Posts:.Operations_QRadioButton").checked=true;
    }
    waitForObject(":Manufacture Configuration.Save_QPushButton");
    clickButton(":Manufacture Configuration.Save_QPushButton");
    test.log("OpenMFG Module configured");

  
    //------------Configure: CRM Module------------------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "CRM...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "CRM...");
    waitForObject(":CRM Configuration._acctGeneration_QComboBox");
    clickItem(":CRM Configuration._acctGeneration_QComboBox", "Automatic, Allow Override", 0, 0, 1, Qt.LeftButton);
    waitForObject(":CRM Configuration._nextAcctNumber_XLineEdit");
    type(":CRM Configuration._nextAcctNumber_XLineEdit", "<Del>");
    type(":CRM Configuration._nextAcctNumber_XLineEdit", "100");
    type(":CRM Configuration._nextInNumber_XLineEdit", "<Del>");
    type(":CRM Configuration._nextInNumber_XLineEdit", "10000");
    if(!findObject(":CRM Configuration.Use Projects_QCheckBox").checked)
        findObject(":CRM Configuration.Use Projects_QCheckBox").checked=true;
    waitForObject(":CRM Configuration.Save_QPushButton");
    clickButton(":CRM Configuration.Save_QPushButton");
    test.log("CRM Module configured");  

 
    //--------------Create Calendars------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Calendars...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Calendars...");
    waitForObject(":List Calendars.New_QPushButton");
    clickButton(":List Calendars.New_QPushButton");
    waitForObject(":New Calendar Type?_QMessageBox");
    clickButton(":List Calendars.Relative_QPushButton");
    waitForObject(":List Calendars._name_XLineEdit");
    type(":List Calendars._name_XLineEdit", "8WRELDAYFW");
    type(":List Calendars._descrip_XLineEdit", "8 Weeks Forward From Today");
    for(i=0;i<8;i++)
    {
        waitForObject(":List Calendars.New_QPushButton_2");
        clickButton(":List Calendars.New_QPushButton_2");
        waitForObject(":List Calendars._name_XLineEdit_2");
        type(":List Calendars._name_XLineEdit_2","<Ctrl+A");
        type(":List Calendars._name_XLineEdit_2","<Del>");
        type(":List Calendars._name_XLineEdit_2", "WEEK"+ (i+1));
        type(":List Calendars._offsetCount_QSpinBox","<Ctrl+A>");
        type(":List Calendars._offsetCount_QSpinBox","<Del>");
        type(":List Calendars._offsetCount_QSpinBox",i);
        type(":List Calendars._offsetType_QComboBox", "Weeks");
        type(":List Calendars._periodCount_QSpinBox","<Ctrl+A>");
        type(":List Calendars._periodCount_QSpinBox","Del");
        type(":List Calendars._periodCount_QSpinBox",1);
        clickItem(":List Calendars._periodType_QComboBox", "Weeks", 0, 0, 1, Qt.LeftButton);
        clickButton(":List Calendars.Save_QPushButton");    
    }
    waitForObject(":List Calendars.Save_QPushButton_2");
    clickButton(":List Calendars.Save_QPushButton_2");
    
    var sWidgetTreeControl = ":List Calendars._calhead_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=1;sNameOfRootItem!="8WRELDAYFW" || i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
        type(sWidgetTreeControl,"<Down>"); 
    }
    if(sNameOfRootItem=="8WRELDAYFW")
        test.pass("Calendars Created");
    else
        test.fail("Calendars not Created");
    waitForObject(":List Calendars.Close_QPushButton");
    clickButton(":List Calendars.Close_QPushButton");
  
    
    if(appVersion=="manufacturing")
    {
        //----------Configure:Schedule Module-------------------
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Schedule...");
        activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Schedule...");
        waitForObject(":Schedule Configuration._nextPlanNumber_XLineEdit");
        type(":Schedule Configuration._nextPlanNumber_XLineEdit", "<Del>");
        waitForObject(":Schedule Configuration._nextPlanNumber_XLineEdit");
        type(":Schedule Configuration._nextPlanNumber_XLineEdit", "90000");
        clickItem(":Schedule Configuration._calendar_CalendarComboBox", "8WRELDAYFW", 0, 0, 1, Qt.LeftButton);
        if(!findObject(":Schedule Configuration.Enable Constraint Management_QCheckBox").checked)
            findObject(":Schedule Configuration.Enable Constraint Management_QCheckBox").checked=true;
        waitForObject(":Schedule Configuration.Save_QPushButton");
        clickButton(":Schedule Configuration.Save_QPushButton");
        test.log("Schedule Module Configured")
    }


    //----------Create new Title--------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Titles...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Titles...");
    waitForObject(":List Titles.New_QPushButton");
    clickButton(":List Titles.New_QPushButton");
    waitForObject(":_code_XLineEdit_2");
    type(":_code_XLineEdit_2", "Master");
    clickButton(":List Titles.Save_QPushButton");
    waitForObject(":List Titles._honorifics_XTreeWidget");
    if(!clickItem(":List Titles._honorifics_XTreeWidget", "Master", 5, 5, 1, Qt.LeftButton))
        test.pass("Title: Master created");
    else test.fail("Title: Master not created");
    waitForObject(":List Titles.Close_QPushButton");
    clickButton(":List Titles.Close_QPushButton");
 
    
    //-------------Create Site Types------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Site Types...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Site Types...");
 
    waitForObject(":List Site Types.New_QPushButton");
    clickButton(":List Site Types.New_QPushButton");
    waitForObject(":List Site Types._code_XLineEdit");
    type(":List Site Types._code_XLineEdit", "WHSE");
    type(":List Site Types._description_XLineEdit", "Warehouse");
    clickButton(":List Site Types.Save_QPushButton");
    if(!clickItem(":List Site Types._sitetype_XTreeWidget", "WHSE", 5, 5, 1, Qt.LeftButton))
        test.pass("Site Type: WHSE created");
    waitForObject(":List Site Types.New_QPushButton");
    clickButton(":List Site Types.New_QPushButton");
    waitForObject(":List Site Types._code_XLineEdit");
    type(":List Site Types._code_XLineEdit", "INTRAN");
    type(":List Site Types._description_XLineEdit", "Intransit Site");
    clickButton(":List Site Types.Save_QPushButton");
    waitForObject(":List Site Types._sitetype_XTreeWidget");
    if(!clickItem(":List Site Types._sitetype_XTreeWidget", "INTRAN", 5, 5, 1, Qt.LeftButton))
        test.pass("Site Type: INTRAN created");
    
    waitForObject(":List Site Types.New_QPushButton");
    clickButton(":List Site Types.New_QPushButton");
    waitForObject(":List Site Types._code_XLineEdit");
    type(":List Site Types._code_XLineEdit", "STORAGE");
    type(":List Site Types._description_XLineEdit", "Storage Site");
    clickButton(":List Site Types.Save_QPushButton");
    waitForObject(":List Site Types._sitetype_XTreeWidget");
    if(!clickItem(":List Site Types._sitetype_XTreeWidget", "STORAGE", 5, 5, 1, Qt.LeftButton))
        test.pass("Site Type: STORAGE created");
        
    waitForObject(":List Site Types.Close_QPushButton");
    clickButton(":List Site Types.Close_QPushButton");
 

   
  //-----------Create Inventory Site: WH1-----------------
    if(appVersion=="manufacturing"||appVersion=="standard")
    {
    
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
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
        type(":List Sites.Street\nAddress:_XLineEdit", "Street Address Line1");
        type(":List Sites.Street\nAddress:_XLineEdit_2", "Street Address Line2");
        type(":List Sites.Street\nAddress:_XLineEdit_3", "Street Address Line3");
        type(":List Sites.City:_XLineEdit", "City1");
        type(":List Sites.State:_XComboBox", "State1");
        type(":List Sites.Postal Code:_XLineEdit", "123-4324");
        type(":List Sites.Country:_XComboBox", "United");
        type(":List Sites._honorific_XComboBox", "Mr");
        type(":List Sites._first_XLineEdit", "John ");
        type(":List Sites._middle_XLineEdit", "K");
        type(":List Sites._last_XLineEdit", "Smith");
        type(":List Sites._title_XLineEdit", "Senior Executive");
        type(":List Sites._phone_XLineEdit", "12345");
        type(":List Sites._fax_XLineEdit", "54321");
        type(":List Sites._email_XLineEdit", "demo@openmfg.com");
        type(":List Sites._main_XLineEdit", "01-01-1950-01");
        clickButton(":_generalTab.Inventory Site_QRadioButton");
        type(":_whsTypeStack._bolNumber_XLineEdit", "10000");
        type(":_whsTypeStack._countTagNumber_XLineEdit", "20000");
        clickButton(":_whsTypeStack.Shipping Site_QCheckBox");
        clickButton(":_whsTypeStack.Force the use of Count Slips_QCheckBox");
        clickButton(":_whsTypeStack.Enforce the use of Zones_QCheckBox");
        type(":_whsTypeStack._shipcomm_XLineEdit", "0.00");
        clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar", "Site Locations");
        waitForObject(":_locationsTab.Enforce ARBL Naming Convention_QGroupBox");    
        type(":_locationsTab.Enforce ARBL Naming Convention_QGroupBox","Space>");
        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox").checked=true;
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "2");
        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox").checked=true;
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "2");
        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_2").checked=true;
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "2");
        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_3").checked=true;
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "2");

        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_4").checked=true;
        clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar", "Site Zones");
        waitForObject(":_zonesTab.New_QPushButton");
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":_name_XLineEdit_2");
        type(":_name_XLineEdit_2", "FG1");
        type(":_description_XLineEdit_6", "Finished Goods Zone1");
        clickButton(":List Sites.Save_QPushButton");
        waitForObject(":_zonesTab.New_QPushButton");
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":_name_XLineEdit_2");
        type(":_name_XLineEdit_2", "RM1");
        type(":_description_XLineEdit_6", "Raw Materials Zone1");
        clickButton(":List Sites.Save_QPushButton");
        waitForObject(":Save_QPushButton");
        clickButton(":Save_QPushButton");
        waitForObject(":List Sites._warehouse_XTreeWidget");
        if(!clickItem(":List Sites._warehouse_XTreeWidget", "Prodiem Toys Site1", 5, 5, 1, Qt.LeftButton))
            test.pass("Site: Prodiem Toys Site1 created ");

 
    }
    else if(appVersion=="postbooks")
    {
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
        activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "Maintain...");
        activateItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "Maintain...");
        waitForObject(":_code_XLineEdit_14");
        type(":_code_XLineEdit_14", "WH1");
        type(":_sitetype_XComboBox_2", "WHSE");
        type(":_description_XLineEdit_26", "Prodiem Toys Site1");
        type(":Site.Street\nAddress:_XLineEdit", "street addr line1");
        type(":Site.Street\nAddress:_XLineEdit_2", "street addr line2");
        type(":Site.Street\nAddress:_XLineEdit_3", "street addr line3");
        type(":Site.City:_XLineEdit", "city1");
        type(":Site.State:_XComboBox", "state1");
        type(":Site.Postal Code:_XLineEdit", "2235234");
        type(":Site.Country:_XComboBox", "US");
        type(":Site._honorific_XComboBox", "Mr");
        type(":Site._first_XLineEdit", "John");
        type(":Site._middle_XLineEdit", "K");
        type(":Site._last_XLineEdit", "Stapleton");
        type(":Site._title_XLineEdit", "job title1");
        type(":Site._phone_XLineEdit", "23423");
        type(":Site._phone_XLineEdit", "235423");
        type(":Site._fax_XLineEdit", "53252354");
        type(":Site._email_XLineEdit", "john@test.com");
        type(":Site._main_XLineEdit", "01-01-1950-01");
        type(":_bolPrefix_XLineEdit_2", "WH1");
        type(":_whsTypeStack._bolNumber_XLineEdit_2", "1000");
        type(":_countTagPrefix_XLineEdit_2", "shw1");
        type(":_whsTypeStack._countTagNumber_XLineEdit_2", "2000");
        clickButton(":_whsTypeStack.Shipping Site_QCheckBox_2");
        clickButton(":_whsTypeStack.Force the use of Count Slips_QCheckBox_2");
        clickButton(":_whsTypeStack.Enforce the use of Zones_QCheckBox_2");
        clickTab(":Site.qt_tabwidget_tabbar_QTabBar", "Site Locations");
        waitForObject(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox_2", "2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_5");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox_2","2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_6");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox_2","2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_7");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox_2","2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_8");
        clickTab(":Site.qt_tabwidget_tabbar_QTabBar", "Site Zones");
        waitForObject(":_zonesTab.New_QPushButton_2");
        clickButton(":_zonesTab.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_31");
        type(":_name_XLineEdit_31", "FG1");
        type(":_description_XLineEdit_38", "Finished Goods Zone1");
        clickButton(":Site Zone.Save_QPushButton");
 
        waitForObject(":_zonesTab.New_QPushButton_2");
        clickButton(":_zonesTab.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_31");
        type(":_name_XLineEdit_31", "RM1");
        type(":_description_XLineEdit_38", "Raw Materials Zone1");
        clickButton(":Site Zone.Save_QPushButton");
 
        waitForObject(":Save_QPushButton_2");
        clickButton(":Save_QPushButton_2");
        test.log("site created:WH1");
        
    }
         
    if(appVersion=="manufacturing"||appVersion=="standard")
    {
        
        //-------Create Inventory Site: WH2-----------------
        waitForObject(":List Sites.New_QPushButton");
        clickButton(":List Sites.New_QPushButton");
        waitForObject(":_code_XLineEdit_3");
        type(":_code_XLineEdit_3", "WH2");
        type(":_description_XLineEdit_5", "Prodiem Toys Site2");
        if(findObject(":_sitetype_XComboBox").currentText!= "WHSE")
            type(":_sitetype_XComboBox","WHSE");
        type(":List Sites.Street\nAddress:_XLineEdit", "Street Address Line11");
        type(":List Sites.Street\nAddress:_XLineEdit_2", "Street Address Line22");
        type(":List Sites.Street\nAddress:_XLineEdit_3", "Street Address Line33");
        type(":List Sites.City:_XLineEdit", "City11");
        type(":List Sites.State:_XComboBox", "State11");
        type(":List Sites.Postal Code:_XLineEdit", "123-41324");
        type(":List Sites.Country:_XComboBox", "United");
        type(":List Sites._honorific_XComboBox", "Mr");
        type(":List Sites._first_XLineEdit", "Keshav ");
        type(":List Sites._middle_XLineEdit", "K");
        type(":List Sites._last_XLineEdit", "Stapleton");
        type(":List Sites._title_XLineEdit", "Junior Executive");
        type(":List Sites._phone_XLineEdit", "12345");
        type(":List Sites._fax_XLineEdit", "54321");
        type(":List Sites._email_XLineEdit", "demo@openmfg.com");
        type(":List Sites._main_XLineEdit", "01-01-1950-01");
        type(":_bolPrefix_XLineEdit", "<Ctrl+A>");
        type(":_bolPrefix_XLineEdit", "<Del>");
        type(":_bolPrefix_XLineEdit", "WH2");
        type(":_countTagPrefix_XLineEdit", "<Ctrl+A>");
        type(":_countTagPrefix_XLineEdit", "<Del>");
        type(":_countTagPrefix_XLineEdit", "WH2");
        clickButton(":_generalTab.Inventory Site_QRadioButton");
        type(":_whsTypeStack._bolNumber_XLineEdit", "10000");
        type(":_whsTypeStack._countTagNumber_XLineEdit", "20000");
        clickButton(":_whsTypeStack.Shipping Site_QCheckBox");
        clickButton(":_whsTypeStack.Force the use of Count Slips_QCheckBox");
        clickButton(":_whsTypeStack.Enforce the use of Zones_QCheckBox");
        type(":_whsTypeStack._shipcomm_XLineEdit", "0.00");
        clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar", "Site Locations");
        waitForObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox");
        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox").checked=true;
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "2");
        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox").checked=true;
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "2");
        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_2").checked=true;
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "2");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "<Tab>");
        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_3").checked=true;
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "2");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "<Tab>");
        findObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_4").checked=true;
        clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar", "Site Zones");
        waitForObject(":_zonesTab.New_QPushButton");
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":_name_XLineEdit_2");
        type(":_name_XLineEdit_2", "FG1");
        type(":_description_XLineEdit_6", "Finished Goods Zone1");
        clickButton(":List Sites.Save_QPushButton");
        waitForObject(":_zonesTab.New_QPushButton");
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":_name_XLineEdit_2");
        type(":_name_XLineEdit_2", "RM1");
        type(":_description_XLineEdit_6", "Raw Materials Zone1");
        clickButton(":List Sites.Save_QPushButton");
        waitForObject(":Save_QPushButton");
        clickButton(":Save_QPushButton");
        waitForObject(":List Sites._warehouse_XTreeWidget");
        if(!clickItem(":List Sites._warehouse_XTreeWidget", "Prodiem Toys Site2", 5, 5, 1, Qt.LeftButton))
            test.pass("Site: Prodiem Toys Site2 created");
        
        waitForObject(":List Sites.Close_QPushButton");
        clickButton(":List Sites.Close_QPushButton");
    }
 
    
    
    //----------Configure: Inventory Module-----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Inventory...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Inventory...");
    waitForObject(":_eventFence_QSpinBox");
    type(":_eventFence_QSpinBox", "<Ctrl+A>");
    type(":_eventFence_QSpinBox", "<Del>");
    type(":_eventFence_QSpinBox", "30");
    if(!findObject(":_inventory.Post Item Site Changes to the Change Log_QCheckBox").checked)
        findObject(":_inventory.Post Item Site Changes to the Change Log_QCheckBox").checked=true;
    if(appVersion=="manufacturing"||appVersion=="standard")
    {
        if(!findObject(":Multiple Sites.Enable Shipping Interface from Transfer Order screen_QCheckBox").checked)
            findObject(":Multiple Sites.Enable Shipping Interface from Transfer Order screen_QCheckBox").checked=true;
        if(!findObject(":Multiple Sites.Post Transfer Order Changes to the Change Log_QCheckBox").checked)
            findObject(":Multiple Sites.Post Transfer Order Changes to the Change Log_QCheckBox").checked=true;
        while(findObject(":_toNumGeneration_QComboBox").currentText!="Automatic")
            type(":_toNumGeneration_QComboBox","<Down>");
        waitForObject(":_toNextNum_XLineEdit");
        type(":_toNextNum_XLineEdit", "<Ctrl+A>");
        waitForObject(":_toNextNum_XLineEdit");
        type(":_toNextNum_XLineEdit", "<Del>");
        waitForObject(":_toNextNum_XLineEdit");
        type(":_toNextNum_XLineEdit", "90000");
        if(!findObject(":_inventory.Enable Lot/Serial Control_QCheckBox").checked)
            findObject(":_inventory.Enable Lot/Serial Control_QCheckBox").checked=true;
    }
    if(!findObject(":Costing Methods Allowed.Average_QCheckBox").checked)
        findObject(":Costing Methods Allowed.Average_QCheckBox").checked=true;
    if(!findObject(":When Count Tag Qty. exceeds Slip Qty..Do Not Post Count Tag_QRadioButton").checked)
        findObject(":When Count Tag Qty. exceeds Slip Qty..Do Not Post Count Tag_QRadioButton").checked=true;
    if(!findObject(":Count Slip # Auditing.Disallow All Slip # Duplications_QRadioButton").checked)
        findObject(":Count Slip # Auditing.Disallow All Slip # Duplications_QRadioButton").checked=true;
    waitForObject(":Inventory Configuration.Save_QPushButton");
    clickButton(":Inventory Configuration.Save_QPushButton");
    test.log("Inventory Module Configured");
    
  
    
    //-------------User Preferences------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
    waitForObject(":User.Selected User:_QRadioButton");
    clickButton(":User.Selected User:_QRadioButton");
    waitForObject(":User._user_XComboBox");
    clickItem(":User._user_XComboBox", newuser, 0, 0, 1, Qt.LeftButton);
    waitForObject(":Background Image.Image:_QRadioButton");
    clickButton(":Background Image.Image:_QRadioButton");
    if(!findObject(":Interface Options.Show windows as free-floating_QRadioButton").checked)
    findObject(":Interface Options.Show windows as free-floating_QRadioButton").checked=true;
    type(":_idleTimeout_QSpinBox", "<Ctrl+A>");
    type(":_idleTimeout_QSpinBox", "<Del>");
    type(":_idleTimeout_QSpinBox", "20");
    type(":_idleTimeout_QSpinBox", "<Tab>");
    if(!findObject(":Interface Options.Ignore Missing Translations_QCheckBox").checked)
        type(":Interface Options.Ignore Missing Translations_QCheckBox"," ");
    if(appVersion=="manufacturing"||appVersion=="standard")
        clickButton(":Preferred Site:.Site:_QRadioButton");
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
    if(appVersion=="manufacturing")
    {
        waitForObject(":_menu.Show Schedule Menu_QCheckBox");
        clickButton(":_menu.Show Schedule Menu_QCheckBox");
        waitForObject(":_menu.Show Schedule Toolbar_QCheckBox");
        clickButton(":_menu.Show Schedule Toolbar_QCheckBox");
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
    waitForObject(":_menu.Show Accountng Toolbar_QCheckBox");
    clickButton(":_menu.Show Accountng Toolbar_QCheckBox");
       
    waitForObject(":User Preferences.qt_tabwidget_tabbar_QTabBar");
    clickTab(":User Preferences.qt_tabwidget_tabbar_QTabBar", "Events");
        
    var sWidgetTreeControl = ":_events._event_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
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
    waitForObject(":User Preferences.qt_tabwidget_tabbar_QTabBar");
    clickTab(":User Preferences.qt_tabwidget_tabbar_QTabBar","Alarms");
    waitForObject(":Default Actions.Event_XCheckBox");
    clickButton(":Default Actions.Event_XCheckBox");
    clickButton(":Default Actions.System Message_XCheckBox");
    
    waitForObject(":User Preferences.Save_QPushButton");
    clickButton(":User Preferences.Save_QPushButton");
      
    test.log("User Preferences of "+newuser +":saved");
    
}//end chapter1