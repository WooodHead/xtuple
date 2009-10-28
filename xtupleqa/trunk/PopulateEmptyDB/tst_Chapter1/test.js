//********** This Test Suite is developed to execute the xTuple Training Guide ****************
//---Functions/common libraries created are placed in 'shared/scripts/functions.js' script



function main()
{

    
    //-----declarations------
    source(findFile("scripts","functions.js"));
        
    //---login Application--------
    loginAppl("CONFIGURE"); 
    var appEdition = findApplicationEdition();

    //-----create Entities-------
    createDept("MFG","Manufacturing");
    assignPrivileges();
    if(appEdition=="Manufacturing")
        createShift("1ST","First");
    else if(appEdition=="PostBooks" || appEdition=="xTupleERP")
    {
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
        
        menu = waitForObject(":xTuple ERP: OpenMFG Edition.Master Information_QMenu");
        menuItem = "S&hifts...";
        
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
        else test.pass(menuItem+"not found in "+appEdition);
        
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        
    }
    createLocale("MYLOCALE","My Locale For Class");
    createGroup("SUPER","Super User Group");
  

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
        findObject(":_mainSize_QSpinBox").clear();
        type(":_mainSize_QSpinBox", "4");
    }
    
    waitForObject(":_gl.Use Company Segment_QGroupBox");
    if(!findObject(":_gl.Use Company Segment_QGroupBox").checked)
        clickButton(":_gl.Use Company Segment_QGroupBox");
    
    if(findObject(":_companySegmentSize_QSpinBox_2").currentText!="2")
    {
        findObject(":_companySegmentSize_QSpinBox_2").clear();
        type(":_companySegmentSize_QSpinBox_2", "2");
    }
   
    if(findObject(":_subaccountSize_QSpinBox_2").currentText!="2")
    {
        findObject(":_subaccountSize_QSpinBox_2").clear();    
        type(":_subaccountSize_QSpinBox_2", "2");
    }
    if(appEdition=="Manufacturing"||appEdition=="Standard")
    {
        waitForObject(":Use Company Segment.Enable External Company Consolidation_QCheckBox");
        if(!findObject(":Use Company Segment.Enable External Company Consolidation_QCheckBox").checked)
            clickButton(":Use Company Segment.Enable External Company Consolidation_QCheckBox");
    }
    else if(appEdition=="PostBooks")
    {
        test.xverify(object.exists(":Use Company Segment.Enable External Company Consolidation_QCheckBox"), "External Company - checkbox not visible");
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
        findObject(":_profitCenterSize_QSpinBox_2").clear();
        type(":_profitCenterSize_QSpinBox_2", "2");
    }
    waitForObject(":_gl.Enforce mandatory notes for Manual Journal Entries_QCheckBox");
    if(!findObject(":_gl.Enforce mandatory notes for Manual Journal Entries_QCheckBox").checked)
        clickButton(":_gl.Enforce mandatory notes for Manual Journal Entries_QCheckBox");
    waitForObject(":_gl.Allow manual entry of Account Numbers_QCheckBox");
    if(!findObject(":_gl.Allow manual entry of Account Numbers_QCheckBox").checked)
        clickButton(":_gl.Allow manual entry of Account Numbers_QCheckBox");
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
    try {
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
        try {
            waitForObject(":List Currencies._curr_XTreeWidget");
        } catch (e) {
            // handle the app waiting for user to ack "Your system is configured to use multiple Currencies"
            waitForObject(":OK_QPushButton");
            clickButton(":OK_QPushButton");
            waitForObject(":List Currencies._curr_XTreeWidget");
        }
        if(!clickItem(":List Currencies._curr_XTreeWidget", "USD",5,5,1,Qt.LeftButton))
            test.pass("Currency: USD created");
        else test.fail("Currency: USD not created");
    
        if(!clickItem(":List Currencies._curr_XTreeWidget", "EUR", 5, 5, 1, Qt.LeftButton))
            test.pass("Currency: EUR created");
        else test.fail("Currency: EUR not created");
    }
    catch (e) {
        test.fail("Could not verify creation of currencies because of exception: " + e);
    }
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
  clickButton(":Products Configuration.Save_QPushButton");
  if(appEdition=="Manufacturing")
  {
      waitForObject(":Cancel.Yes_QPushButton");
      clickButton(":Cancel.Yes_QPushButton");
  }
  else if(appEdition=="Standard"||appEdition=="PostBooks")
      test.xverify(object.exists(":Cancel.Yes_QPushButton"), "Cancel Yes Button - not visible"); 
 
  test.log("Product Module Configured");    

    
  
  //----------Define Encryption (metric)------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Encryption...");
    snooze(1);
    waitForObject(":OK_QPushButton");
    clickButton(":OK_QPushButton");
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
    if(findObject(":Encryption Configuration_FileLineEdit_2").text!="\\home\\crypto")
    {
        type(":Encryption Configuration_FileLineEdit_2", "<Right>");
        type(":Encryption Configuration_FileLineEdit_2", "<Ctrl+Backspace>");
        type(":Encryption Configuration_FileLineEdit_2", "\\home\\crypto");
        test.log("Encryption: Linux location changed");
    }
    if(findObject(":Encryption Configuration_FileLineEdit_3").text!="/Users/crypto")
    {
        type(":Encryption Configuration_FileLineEdit_3", "<Right>");
        type(":Encryption Configuration_FileLineEdit_3", "<Ctrl+Backspace>");
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
        type(":_description_XLineEdit_4", "<Right>");
        type(":_description_XLineEdit_4", "<Ctrl+Backspace>");
        type(":_description_XLineEdit_4", "Practice Database");        
    }
    if(appEdition=="Manufacturing"||appEdition=="Standard")
    {
        
        if(!findObject(":Database Information.Batch Manager_QGroupBox").checked)
            type(":Database Information.Batch Manager_QGroupBox"," ");
        if(findObject(":_batchEmail_QLineEdit").text!="mike@xtuple.com")
        {
            waitForObject(":_batchEmail_QLineEdit");
            findObject(":_batchEmail_QLineEdit").clear();
            type(":_batchEmail_QLineEdit", "mike@xtuple.com");
        }
            
       
        if(findObject(":Batch Manager.qt_spinbox_lineedit_QLineEdit").currentText!="30")
        {
            findObject(":Batch Manager.qt_spinbox_lineedit_QLineEdit").clear();
            type(":Batch Manager.qt_spinbox_lineedit_QLineEdit", "30");
        }
    }
    else if(appEdition=="PostBooks")
    {
        test.xverify(object.exists(":_batchEmail_QLineEdit"), "From Address - not visible");
        test.xverify(object.exists(":Database Information.Batch Manager_QGroupBox"), "Enable Batch Manager - not visible");
                
    }
    if(!findObject(":Database Information.Disallow mismatched client versions_QCheckBox").checked)
        clickButton(":Database Information.Disallow mismatched client versions_QCheckBox");
  
    if(findObject(":_comments_QTextEdit_2").plainText!="Settings for practice database")
    {
        findObject(":_comments_QTextEdit_2").clear();
        type(":_comments_QTextEdit_2", "Settings for practice database");
    }
    clickButton(":Database Information.Save_QPushButton");
    test.log("Database Information Defined");
//    
    
    if(appEdition=="Manufacturing" || appEdition=="Standard")
    {
        //-----------Rescan privileges--------------
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
      
        //----Configure EDI Profile-----------
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
        waitForObject(":_type_XComboBox_2");
        clickItem(":_type_XComboBox_2", "EMail", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_emailFrom_QLineEdit");
        type(":_emailFrom_QLineEdit", "demo@openmfg.com");
        waitForObject(":_emailReplyTo_QLineEdit");
        type(":_emailReplyTo_QLineEdit", "demo@openmfg.com");
        waitForObject(":_emailTo_QLineEdit");
        type(":_emailTo_QLineEdit", "<");
        type(":_emailTo_QLineEdit", "/email3>");
        waitForObject(":_emailCC_QLineEdit");
        type(":_emailCC_QLineEdit", "<");
        type(":_emailCC_QLineEdit", "/email1></email2>");
        waitForObject(":_emailSubject_QLineEdit");
        type(":_emailSubject_QLineEdit", "ProDiem Toys Invoice");
        waitForObject(":_emailBody_QTextEdit");
        type(":_emailBody_QTextEdit", "There is an issue with your invoice.  Please contact us and reference </docnumber> and </description>.  Thank You,ProDiem Accounts Receivable ");
        waitForObject(":List EDI Profiles.Review Before Sending_QCheckBox");
        clickButton(":List EDI Profiles.Review Before Sending_QCheckBox");
        waitForObject(":List EDI Profiles.Save_QPushButton");
        clickButton(":List EDI Profiles.Save_QPushButton");
        
        
        waitForObject(":List EDI Profiles.New_QPushButton");
        clickButton(":List EDI Profiles.New_QPushButton");
        waitForObject(":List EDI Profiles._name_QLineEdit");
        type(":List EDI Profiles._name_QLineEdit", "CRM");
        waitForObject(":_type_XComboBox_2");
        clickItem(":_type_XComboBox_2", "EMail", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_emailFrom_QLineEdit");
        mouseClick(":_emailFrom_QLineEdit", 24, 8, 1, Qt.LeftButton);
        waitForObject(":_emailFrom_QLineEdit");
        type(":_emailFrom_QLineEdit", "demo@opemfg.com");
        waitForObject(":_emailFrom_QLineEdit");
        type(":_emailFrom_QLineEdit", "<Tab>");
        waitForObject(":_emailReplyTo_QLineEdit");
        type(":_emailReplyTo_QLineEdit", "demo@openmfg.com");
        waitForObject(":_emailTo_QLineEdit");
        type(":_emailTo_QLineEdit", "demo@openmfg.com");
        waitForObject(":_emailCC_QLineEdit");
        type(":_emailCC_QLineEdit", "demo@opemfg.com");
        waitForObject(":_emailSubject_QLineEdit");
        type(":_emailSubject_QLineEdit", "CRM Incident</docnumber>");
        waitForObject(":_emailBody_QTextEdit");
        type(":_emailBody_QTextEdit", "<");
        type(":_emailBody_QTextEdit", "/comments></description>");
        waitForObject(":List EDI Profiles.Save_QPushButton");
        clickButton(":List EDI Profiles.Save_QPushButton");
        
        
        waitForObject(":List EDI Profiles.New_QPushButton");
        clickButton(":List EDI Profiles.New_QPushButton");
        waitForObject(":List EDI Profiles._name_QLineEdit");
        type(":List EDI Profiles._name_QLineEdit", "PO");
        waitForObject(":_type_XComboBox_2");
        clickItem(":_type_XComboBox_2", "EMail", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_emailFrom_QLineEdit");
        type(":_emailFrom_QLineEdit", "demo@openmfg.com");
        waitForObject(":_emailReplyTo_QLineEdit");
        type(":_emailReplyTo_QLineEdit", "demo@openmfg.com");
        waitForObject(":_emailTo_QLineEdit");
        type(":_emailTo_QLineEdit", "demo@openmfg.com");
        waitForObject(":_emailCC_QLineEdit");
        type(":_emailCC_QLineEdit", "demo@openmfg.com");
        waitForObject(":_emailSubject_QLineEdit");
        type(":_emailSubject_QLineEdit", "ProDiem Toys Invoice PO </docnumber>");
        waitForObject(":_emailBody_QTextEdit");
        type(":_emailBody_QTextEdit", " Dear </povendor>: Please see attached PO </docnumber> from ProDiem Toys for product to be shipped to our warehouse </powarehous> via </poshipvia>.  We entered this PO on </podate>. ");
        waitForObject(":List EDI Profiles.Review Before Sending_QCheckBox");
        clickButton(":List EDI Profiles.Review Before Sending_QCheckBox");
        waitForObject(":List EDI Profiles.qt_tabwidget_tabbar_QTabBar");
        clickTab(":List EDI Profiles.qt_tabwidget_tabbar_QTabBar", "Forms");
        waitForObject(":forms.New_QPushButton_2");
        clickButton(":forms.New_QPushButton_2");
        waitForObject(":List EDI Profiles.OK_QPushButton_2");
        clickButton(":List EDI Profiles.OK_QPushButton_2");
        waitForObject(":_type_XComboBox_3");
        clickItem(":_type_XComboBox_3", "Purchase Order", 0, 0, 1, Qt.LeftButton);
        waitForObject(":List EDI Profiles._file_QLineEdit");
        type(":List EDI Profiles._file_QLineEdit", " PO</docnumber>_</poshipvia>");
        waitForObject(":List EDI Profiles._query_QTextEdit");
        type(":List EDI Profiles._query_QTextEdit", "SELECT pohead_orderdate AS podate, pohead_shipvia AS poshipvia, warehous_descrip AS powarehous, vend_name AS povendor FROM pohead, warehous, vendinfo WHERE pohead_id = <? value('docid') ?> AND pohead_warehous_id = warehous_id AND pohead_vend_id = vend_id; ");
        waitForObject(":_reportReport_XComboBox");
        clickItem(":_reportReport_XComboBox", "PurchaseOrder", 0, 0, 1, Qt.LeftButton);
        waitForObject(":List EDI Profiles.OK_QPushButton");
        clickButton(":List EDI Profiles.OK_QPushButton");
        waitForObject(":List EDI Profiles.Save_QPushButton");
        clickButton(":List EDI Profiles.Save_QPushButton");
        waitForObject(":List EDI Profiles.Close_QPushButton");
        clickButton(":List EDI Profiles.Close_QPushButton");
        test.log("EDI Profile configured");
    }
  
  
    //----------Create Incident Category-----------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    snooze(1);
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Categories...");
    activateItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Categories...");
    waitForObject(":List Incident Categories.New_QPushButton");
    clickButton(":List Incident Categories.New_QPushButton");
    
    waitForObject(":_name_XLineEdit_14");
    type(":_name_XLineEdit_14", "DUNNING");
    findObject(":Incident Category._order_QSpinBox").clear();
    type(":Incident Category._order_QSpinBox", "90");
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
    findObject(":_ar._nextARMemoNumber_XLineEdit").clear();
    type(":_ar._nextARMemoNumber_XLineEdit", "20000");
    if(findObject(":_ar.Hide 'Apply to Balance' button_QCheckBox").checked)
        clickButton(":_ar.Hide 'Apply to Balance' button_QCheckBox");
    if(!findObject(":_ar.Enable Customer Deposits_QCheckBox").checked)
        clickButton(":_ar.Enable Customer Deposits_QCheckBox");
    type(":Remit-To Address._name_XLineEdit", "<Del>");
    type(":Remit-To Address._name_XLineEdit", "Prodiem Toys");
    type(":Remit-To Address.Street\nAddress:_XLineEdit", "Account Receivable");
    type(":Remit-To Address.Street\nAddress:_XLineEdit_2", "<Del>");
    type(":Remit-To Address.Street\nAddress:_XLineEdit_2", "12100 Playland way");
    type(":Remit-To Address.Street\nAddress:_XLineEdit_3", "<Del>");
    type(":Remit-To Address.City:_XLineEdit", "Norfolk");

    findObject(":_state_QLineEdit").clear();
    type(":_state_QLineEdit", "VA");
    findObject(":_country_QLineEdit").clear();
    type(":_country_QLineEdit", "United States");
    type(":Remit-To Address._phone_XLineEdit", "<Del>");
    type(":Remit-To Address._phone_XLineEdit", "757-461-3022");
    if(!findObject(":_ar.Credit Warn Customers when Late_QGroupBox").checked)
        type(":_ar.Credit Warn Customers when Late_QGroupBox"," ");
    waitForObject(":Credit Warn Customers when Late._graceDays_QSpinBox");
    findObject(":Credit Warn Customers when Late._graceDays_QSpinBox").clear();
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
        clickButton(":Manufacture Configuration.Automatically Explode W/O's_QCheckBox");
    if(appEdition=="Manufacturing")
    {
        if(!findObject(":Manufacture Configuration.Auto Fill Post Operation Qty. to Balance_QCheckBox").checked)
            clickButton(":Manufacture Configuration.Auto Fill Post Operation Qty. to Balance_QCheckBox");
  
    }
    else if(appEdition=="Standard"||appEdition=="PostBooks")
    {
        test.xverify(object.exists(":Manufacture Configuration.Auto Fill Post Operation Qty. to Balance_QCheckBox"),"Auto fill Post Operation - not visible");
    }
    try {
    if(!findObject(":Manufacture Configuration.Post Work Order Changes to the Change Log_QCheckBox").checked)
        clickButton(":Manufacture Configuration.Post Work Order Changes to the Change Log_QCheckBox");    if(!findObject(":Explode W/O's Effective as of:.W/O Start Date_QRadioButton").checked)
        clickButton(":Explode W/O's Effective as of:.W/O Start Date_QRadioButton");
    if(!findObject(":Default W/O Explosion Level:.Multiple Level_QRadioButton_2").checked)
        clickButton(":Default W/O Explosion Level:.Multiple Level_QRadioButton_2");
    } catch (e) { test.fail("exception " + e + " handling :Default W/O Explosion Level:.Multiple Level_QRadioButton"); }
    try {
    if(!findObject(":Inventory Item Cost Defaults.Post Material Usage Variances_QCheckBox").checked)
        clickButton(":Inventory Item Cost Defaults.Post Material Usage Variances_QCheckBox");
    } catch (e) { test.fail("exception " +  e + " handling :Inventory Item Cost Defaults.Post Material Usage Variances_QCheckBox"); }
    if(appEdition=="Manufacturing")
    {
        if(!findObject(":Inventory Item Cost Defaults.Post Labor Variances_QCheckBox").checked)
            clickButton(":Inventory Item Cost Defaults.Post Labor Variances_QCheckBox");
    }
    else if(appEdition=="Standard"||appEdition=="PostBooks")
    {
        test.xverify(object.exists(":Inventory Item Cost Defaults.Post Labor Variances_QCheckBox"),"Post Labor Variances - not visible");
    }
    if(!findObject(":W/O Item Cost Recognition Defaults.Proportional_QRadioButton").checked)
        clickButton(":W/O Item Cost Recognition Defaults.Proportional_QRadioButton");
    if(appEdition=="Manufacturing")
    {
        if(!findObject(":Shop Floor Workbench Posts:.Operations_QRadioButton").checked)
            clickButton(":Shop Floor Workbench Posts:.Operations_QRadioButton");
    }
    else if(appEdition=="Standard"||appEdition=="PostBooks")
    {
        test.xverify(object.exists(":Shop Floor Workbench Posts:.Operations_QRadioButton"),"Shop Floor Workbench Posts Operations - not visible");
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
        clickButton(":CRM Configuration.Use Projects_QCheckBox");
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
    waitForObject(":List Calendars.Relative_QPushButton");
    clickButton(":List Calendars.Relative_QPushButton");
    waitForObject(":List Calendars._name_XLineEdit");
    type(":List Calendars._name_XLineEdit", "8WRELDAYFW");
    type(":List Calendars._descrip_XLineEdit", "8 Weeks Forward From Today");
    for(i=0;i<8;i++)
    {
        waitForObject(":List Calendars.New_QPushButton_2");
        clickButton(":List Calendars.New_QPushButton_2");
        waitForObject(":List Calendars._name_XLineEdit_2");
        type(":List Calendars._name_XLineEdit_2", "WEEK"+ (i+1));
        findObject(":List Calendars._offsetCount_QSpinBox").clear();
        waitForObject(":List Calendars._offsetCount_QSpinBox");
        type(":List Calendars._offsetCount_QSpinBox",i);
        waitForObject(":List Calendars._offsetType_QComboBox");
        type(":List Calendars._offsetType_QComboBox", "Weeks");
        waitForObject(":List Calendars._periodCount_QSpinBox");
        findObject(":List Calendars._periodCount_QSpinBox").clear();
        type(":List Calendars._periodCount_QSpinBox",1);
        waitForObject(":List Calendars._periodType_QComboBox");
        clickItem(":List Calendars._periodType_QComboBox", "Weeks", 0, 0, 1, Qt.LeftButton);
        waitForObject(":List Calendars.Save_QPushButton");
        clickButton(":List Calendars.Save_QPushButton");    
    }
    waitForObject(":List Calendars.Save_QPushButton_2");
    clickButton(":List Calendars.Save_QPushButton_2");
    waitForObject(":List Calendars._calhead_XTreeWidget");
    if(!clickItem(":List Calendars._calhead_XTreeWidget","8WRELDAYFW",0,0,1,Qt.LeftButton))
        test.pass("Calendar Created");
    waitForObject(":List Calendars.Close_QPushButton");
    clickButton(":List Calendars.Close_QPushButton");
  
    
    if(appEdition=="Manufacturing")
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
            clickButton(":Schedule Configuration.Enable Constraint Management_QCheckBox");
        waitForObject(":Schedule Configuration.Save_QPushButton");
        clickButton(":Schedule Configuration.Save_QPushButton");
        test.log("Schedule Module Configured")
    }
    else if(appEdition=="PostBooks" ||appEdition=="Standard")
    {
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        
        snooze(1);
        menu = waitForObject(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu");
        menuItem = "Sche&dule...";
         
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
        else test.pass(menuItem+"not found in "+appEdition);
        
        
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
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
    waitForObject(":List Site Types._sitetype_XTreeWidget");
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
    if(appEdition=="Manufacturing"||appEdition=="Standard")
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
        type(":_state_QLineEdit_2", "State1");
        type(":List Sites.Postal Code:_XLineEdit", "123-4324");
        type(":_country_QLineEdit_2", "United");
        clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar","Contact");
        waitForObject(":_honorific_QLineEdit");
        type(":_honorific_QLineEdit", "Mr");
        type(":_contactGroup._first_XLineEdit", "John ");
        type(":_contactGroup._middle_XLineEdit", "K");
        type(":_contactGroup._last_XLineEdit", "Smith");
        type(":_contactGroup._title_XLineEdit", "Senior Executive");
        type(":_contactGroup._phone_XLineEdit", "12345");
        type(":_contactGroup._fax_XLineEdit", "54321");
        type(":_contactGroup._email_XLineEdit", "demo@openmfg.com");
        type(":List Sites._main_XLineEdit", "01-01-1950-01");
  
        clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar","General");
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
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_2");

        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_3");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_4");
        clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar", "Site Zones");
        snooze(1);
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":_name_XLineEdit_32");
        type(":_name_XLineEdit_32", "FG1");
        type(":_description_XLineEdit_6", "Finished Goods Zone1");
        clickButton(":List Sites.Save_QPushButton");
        snooze(1);
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":_name_XLineEdit_32");
        type(":_name_XLineEdit_32", "RM1");
        type(":_description_XLineEdit_6", "Raw Materials Zone1");
        clickButton(":List Sites.Save_QPushButton");
        waitForObject(":Save_QPushButton");
        clickButton(":Save_QPushButton");
        waitForObject(":List Sites._warehouse_XTreeWidget");
        if(!clickItem(":List Sites._warehouse_XTreeWidget", "Prodiem Toys Site1", 5, 5, 1, Qt.LeftButton))
            test.pass("Site: Prodiem Toys Site1 created ");

 
    }
    else if(appEdition=="PostBooks")
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
        type(":_state_QLineEdit_6", "State1");
        type(":_addressGroup.Postal Code:_XLineEdit", "23234324");
        type(":_country_QLineEdit_6", "US");
        type(":_accountGroup._main_XLineEdit_2", "01-01-1950-01");
      
        clickTab(":Site.qt_tabwidget_tabbar_QTabBar","Contact");
        waitForObject(":_honorific_QLineEdit_3");
        type(":_honorific_QLineEdit_3", "Mr");
        type(":_contactGroup._first_XLineEdit_2", "John ");
        type(":_contactGroup._middle_XLineEdit_2", "K");
        type(":_contactGroup._last_XLineEdit_2", "Stapleton");
        type(":_contactGroup._title_XLineEdit_2", "Job Title 1");
        type(":_contactGroup._phone_XLineEdit_2", "34335");
        type(":_contactGroup._fax_XLineEdit_2", "5433421");
        type(":_contactGroup._email_XLineEdit_2", "john@test.com");
      
        
        clickTab(":Site.qt_tabwidget_tabbar_QTabBar","General");
        waitForObject(":_numberGroup._bolNumber_XLineEdit");
        type(":_numberGroup._bolNumber_XLineEdit", "1000");
        type(":_countTagPrefix_XLineEdit_2", "shw1");
        type(":_numberGroup._countTagNumber_XLineEdit", "2000");
        clickButton(":_whsTypeStack.Shipping Site_QCheckBox_2");
        clickButton(":_optionsGroup.Force the use of Count Slips_QCheckBox");
        clickButton(":_optionsGroup.Enforce the use of Zones_QCheckBox");
        
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
        snooze(1);
        clickButton(":_zonesTab.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_31");
        type(":_name_XLineEdit_31", "FG1");
        type(":_description_XLineEdit_38", "Finished Goods Zone1");
        clickButton(":Site Zone.Save_QPushButton");
 
        snooze(1);
        clickButton(":_zonesTab.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_31");
    
        type(":_name_XLineEdit_31", "RM1");
        type(":_description_XLineEdit_38", "Raw Materials Zone1");
        clickButton(":Site Zone.Save_QPushButton");
 
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
        type(":List Sites.Street\nAddress:_XLineEdit", "Street Address Line11");
        type(":List Sites.Street\nAddress:_XLineEdit_2", "Street Address Line22");
        type(":List Sites.Street\nAddress:_XLineEdit_3", "Street Address Line33");
        type(":List Sites.City:_XLineEdit", "City11");
        type(":_state_QLineEdit_6", "State11");
        type(":_addressGroup.Postal Code:_XLineEdit", "123-41324");
        type(":_country_QLineEdit_6", "United");
        
        clickTab(":Site.qt_tabwidget_tabbar_QTabBar","Contact");
        waitForObject(":_honorific_QLineEdit_3");
        type(":_honorific_QLineEdit_3", "Mr");
        type(":_contactGroup._first_XLineEdit_2", "John ");
        type(":_contactGroup._middle_XLineEdit_2", "K");
        type(":_contactGroup._last_XLineEdit_2", "Stapleton");
        type(":_contactGroup._title_XLineEdit_2", "Junior Executive");
        type(":_contactGroup._phone_XLineEdit_2", "12345");
        type(":_contactGroup._fax_XLineEdit_2", "54321");
        type(":_contactGroup._email_XLineEdit_2", "demo@openmfg.com");
        type(":List Sites._main_XLineEdit", "01-01-1950-01");
        
        clickTab(":Site.qt_tabwidget_tabbar_QTabBar","General");
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
        
        clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar", "Site Locations");
        waitForObject(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._aisleSize_QSpinBox", "2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "<Ctrl+A>");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._rackSize_QSpinBox", "2");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_2");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "2");
        type(":Enforce ARBL Naming Convention._binSize_QSpinBox", "<Tab>");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_3");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "<Del>");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "2");
        type(":Enforce ARBL Naming Convention._locationSize_QSpinBox", "<Tab>");
        clickButton(":Enforce ARBL Naming Convention.Allow Alpha Characters_QCheckBox_4");
        clickTab(":List Sites.qt_tabwidget_tabbar_QTabBar", "Site Zones");
        
        snooze(1);
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":_name_XLineEdit_32");
        type(":_name_XLineEdit_32", "FG1");
        type(":_description_XLineEdit_6", "Finished Goods Zone1");
        clickButton(":List Sites.Save_QPushButton");
        
        snooze(1);
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":_name_XLineEdit_32");
        type(":_name_XLineEdit_32", "RM1");
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
        type(":_toNextNum_XLineEdit", "<Ctrl+A>");
        waitForObject(":_toNextNum_XLineEdit");
        type(":_toNextNum_XLineEdit", "<Del>");
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
    if(!findObject(":Count Slip # Auditing.Disallow All Slip # Duplications_QRadioButton").checked)
        clickButton(":Count Slip # Auditing.Disallow All Slip # Duplications_QRadioButton");
    waitForObject(":Inventory Configuration.Save_QPushButton");
    clickButton(":Inventory Configuration.Save_QPushButton");
    test.log("Inventory Module Configured");


//---Create User by Role--
createUserByRole("RUNREGISTER");

//----Read Username based on Role------
var set = testData.dataset("login.tsv");
var username;
  for (var records in set)
  {
      username=testData.field(set[records],"USERNAME");
      role=testData.field(set[records],"ROLE");
      if(role=="RUNREGISTER") break;
      
  }

  
  //-------------User Preferences------------------------
  waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
  activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
  waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
  activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
  waitForObject(":User.Selected User:_QRadioButton");
  clickButton(":User.Selected User:_QRadioButton");
  waitForObject(":User._user_XComboBox");
  clickItem(":User._user_XComboBox", username, 0, 0, 1, Qt.LeftButton);
  if(appEdition=="Manufacturing"||appEdition=="Standard")
  {
      waitForObject(":Background Image.Image:_QRadioButton");
      clickButton(":Background Image.Image:_QRadioButton");
      waitForObject(":Background Image...._QPushButton");
      clickButton(":Background Image...._QPushButton");    
      waitForObject(":Image List._image_XTreeWidget");
      doubleClickItem(":Image List._image_XTreeWidget","BACKGROUND",0,0,1,Qt.LeftButton);
  }
            
  waitForObject(":Interface Options.Show windows as free-floating_QRadioButton");
  if(!findObject(":Interface Options.Show windows as free-floating_QRadioButton").checked)
      clickButton(":Interface Options.Show windows as free-floating_QRadioButton");
  type(":_idleTimeout_QSpinBox", "<Ctrl+A>");
  type(":_idleTimeout_QSpinBox", "<Del>");
  type(":_idleTimeout_QSpinBox", "20");
  type(":_idleTimeout_QSpinBox", "<Tab>");
  if(!findObject(":Interface Options.Ignore Missing Translations_QCheckBox").checked)
      clickButton(":Interface Options.Ignore Missing Translations_QCheckBox");
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
  if(appEdition=="Manufacturing")
  {
      waitForObject(":_menu.Show Schedule Menu_QCheckBox");
      clickButton(":_menu.Show Schedule Menu_QCheckBox");
      waitForObject(":_menu.Show Schedule Toolbar_QCheckBox");
      clickButton(":_menu.Show Schedule Toolbar_QCheckBox");
  }
 else if(appEdition=="Standard"||appEdition=="PostBooks")
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
  waitForObject(":_menu.Show Accountng Toolbar_QCheckBox");
  clickButton(":_menu.Show Accountng Toolbar_QCheckBox");
     
  waitForObject(":User Preferences.qt_tabwidget_tabbar_QTabBar");
  if(appEdition=="Manufacturing")
  {
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
  }	
  waitForObject(":User Preferences.qt_tabwidget_tabbar_QTabBar");
  clickTab(":User Preferences.qt_tabwidget_tabbar_QTabBar","Alarms");
  waitForObject(":Default Actions.Event_XCheckBox");
  clickButton(":Default Actions.Event_XCheckBox");
  clickButton(":Default Actions.System Message_XCheckBox");
  
  waitForObject(":User Preferences.Save_QPushButton");
  clickButton(":User Preferences.Save_QPushButton");
    
  test.log("User Preferences of "+username +":saved");
  

}
