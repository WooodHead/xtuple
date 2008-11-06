function main()
{
    
    source(findFile("scripts","functions.js"));
    loginAppl("3.1.0", "3empty310","admin");
//    createDept("MFG","Manufacturing");
//    assignPrivileges();
//    createShift("1ST","First");
    createLocale("MYLOCALE","My Locale For Class");
//    createGroup("SUPER","Super User Group");
    var newuser="user04";
    createUser(newuser);
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
    type(":List Profit Centers._number_XLineEdit", "01");
    type(":List Profit Centers._descrip_QTextEdit", "Profit Center 01");
    waitForObject(":List Profit Centers.Save_QPushButton");
    clickButton(":List Profit Centers.Save_QPushButton");
    waitForObject(":List Profit Centers.Close_QPushButton");
    clickButton(":List Profit Centers.Close_QPushButton");
    test.log("Profit Center Number: 01 created")
    
    //--------------Accounting-Account-SubAccount Numbers-----------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Subaccount Numbers...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Subaccount Numbers...");
    clickButton(":List Subaccounts.New_QPushButton");
    type(":List Subaccounts._number_XLineEdit", "01");
    type(":List Subaccounts._descrip_QTextEdit", "Subaccount 01 - General");
    waitForObject(":List Subaccounts.Save_QPushButton");
    clickButton(":List Subaccounts.Save_QPushButton");
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
    type(":List G/L Subaccount Types._code_XLineEdit", "SO");
    while(findObject(":List G/L Subaccount Types._type_XComboBox").currentText!="Revenue")
        type(":List G/L Subaccount Types._type_XComboBox","<Down>")
    type(":List G/L Subaccount Types._description_XLineEdit", "Other Revenue");
    waitForObject(":List G/L Subaccount Types.Save_QPushButton");
    clickButton(":List G/L Subaccount Types.Save_QPushButton");
    test.log("SubAccount: SO-Revenue-Other Revenue created");
  
    //---------------SubAccount Types: DXP-Expenses-Depreciation Expense------------
    waitForObject(":List G/L Subaccount Types.New_QPushButton");
    clickButton(":List G/L Subaccount Types.New_QPushButton");
    type(":List G/L Subaccount Types._code_XLineEdit", "DXP");
    while(findObject(":List G/L Subaccount Types._type_XComboBox").currentText!="Expense")
        type(":List G/L Subaccount Types._type_XComboBox","<Down>");
    type(":List G/L Subaccount Types._description_XLineEdit", "Depreciation Expense");
    waitForObject(":List G/L Subaccount Types.Save_QPushButton");
    clickButton(":List G/L Subaccount Types.Save_QPushButton");
    test.log("SubAccount: DXP-Expenses-Depreciation Expense created");
    waitForObject(":List G/L Subaccount Types.Close_QPushButton");
    clickButton(":List G/L Subaccount Types.Close_QPushButton");
    
    
    //--------------Create Currencies------------------------       
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Currencies...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Currencies...");
  
//    //----------Create Base Currency-----------------------
//    waitForObject(":List Currencies.New_QPushButton");
//    clickButton(":List Currencies.New_QPushButton");
//    waitForObject(":List Currencies._currName_QLineEdit");
//    type(":List Currencies._currName_QLineEdit", "US Dollars");
//    waitForObject(":List Currencies._currSymbol_QLineEdit");
//    type(":List Currencies._currSymbol_QLineEdit", "$");
//    waitForObject(":List Currencies._currSymbol_QLineEdit");
//    waitForObject(":List Currencies._currAbbr_QLineEdit");
//    type(":List Currencies._currAbbr_QLineEdit", "USD");
//    waitForObject(":List Currencies.Base Currency_QCheckBox");
//    clickButton(":List Currencies.Base Currency_QCheckBox");
//    waitForObject(":List Currencies.Yes_QPushButton");
//    clickButton(":List Currencies.Yes_QPushButton");
//    waitForObject(":List Currencies.Save_QPushButton");
//    clickButton(":List Currencies.Save_QPushButton");
//    waitForObject(":List Currencies.Yes_QPushButton");
//    clickButton(":List Currencies.Yes_QPushButton");
//    test.log("Base Currency: USD($) Created");
//  
//    //----------Create Foreign currency - EUR------------
//    waitForObject(":List Currencies.New_QPushButton");
//    clickButton(":List Currencies.New_QPushButton");
//    waitForObject(":List Currencies._currName_QLineEdit");
//    type(":List Currencies._currName_QLineEdit", "Euros");
//    waitForObject(":List Currencies._currSymbol_QLineEdit");
//    type(":List Currencies._currSymbol_QLineEdit", "EUR");
//    waitForObject(":List Currencies._currAbbr_QLineEdit");
//    type(":List Currencies._currAbbr_QLineEdit", "EUR");
//    waitForObject(":List Currencies.Save_QPushButton");
//    clickButton(":List Currencies.Save_QPushButton");
//    waitForObject(":List Currencies.Close_QPushButton");
//    clickButton(":List Currencies.Close_QPushButton");
    test.log("Foreign Currency: EUR created");
    
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
    waitForObject(":List Currency Exchange Rates.Close_QPushButton");
    clickButton(":List Currency Exchange Rates.Close_QPushButton");
    test.log("Exchange Rate for EUR created");
    

    //-----------Chart Of Accounts-------------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");

    COA("01","01","1950","01","Unassigned Inv Transactions","Asset","IN");
    COA("01","01","3030","01","Retained Earnings","Equity","EC");
    COA("01","01","3040","01","Stock Class B","Equity","EDC");
    COA("01","01","8990","01","Currency Gain / Loss","Expense","EXP");
    COA("01","01","8995","01","G/L Series Discrepancy","Expense","EXP");
    waitForObject(":Chart of Accounts.Close_QPushButton");
    clickButton(":Chart of Accounts.Close_QPushButton");

    //------------Configure:Accounting Module---------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
    type(":_gl._main_XLineEdit_3", "01-01-3030-01");
    type(":_gl._main_XLineEdit_3", "<Tab>");
    type(":_gl._main_XLineEdit", "01-01-8990-01");
    type(":_gl._main_XLineEdit", "<Tab>");
    type(":_gl._main_XLineEdit_2", "01-01-8995-01");
    type(":_gl._main_XLineEdit_2", "<Tab>");
    clickButton(":Accounting Configuration.Save_QPushButton");
    test.log("Accounting Module configured"); 
  
    
    //-----------------Configure: Products Module--------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Products...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Products...");
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
    if(!findObject(":Products Configuration.Post Item Changes to the Change Log_QCheckBox").checked)
        findObject(":Products Configuration.Post Item Changes to the Change Log_QCheckBox").checked= true;
    if(findObject(":Products Configuration.Allow Inactive Items to be Added to BOMs_QCheckBox").checked)
        findObject(":Products Configuration.Allow Inactive Items to be Added to BOMs_QCheckBox").checked=false;     
    if(findObject(":Defaults.Set Sold Items as Exclusive_QCheckBox").checked)
        findObject(":Defaults.Set Sold Items as Exclusive_QCheckBox").checked=false;
    type(":_issueMethod_QComboBox", "Mixed");
    clickButton(":Products Configuration.Save_QPushButton");
    if(object.exists(":Enable Revision Control.Yes_QPushButton"))
    clickButton(":Enable Revision Control.Yes_QPushButton");
	test.log("Product Module Configured");    

            
    //-----------Configure: Accounting Module------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
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
    if(!findObject(":Manufacture Configuration.Auto fill Post Operation Qty. to Balance_QCheckBox").checked)
        findObject(":Manufacture Configuration.Auto fill Post Operation Qty. to Balance_QCheckBox").checked=true;
    if(!findObject(":Manufacture Configuration.Post Work Order Changes to the Change Log_QCheckBox").checked)
        findObject(":Manufacture Configuration.Post Work Order Changes to the Change Log_QCheckBox").checked=true;    
    if(!findObject(":Explode W/O's Effective as of:.W/O Start Date_QRadioButton").checked)
        findObject(":Explode W/O's Effective as of:.W/O Start Date_QRadioButton").checked=true;
    if(!findObject(":Default W/O Explosion Level:.Multiple Level_QRadioButton").checked)
        findObject(":Default W/O Explosion Level:.Multiple Level_QRadioButton").checked=true;
    if(!findObject(":Inventory Item Cost Defaults.Post Material Usage Variances_QCheckBox").checked)
        findObject(":Inventory Item Cost Defaults.Post Material Usage Variances_QCheckBox").checked=true;
    if(!findObject(":Inventory Item Cost Defaults.Post Labor Variances_QCheckBox").checked)
        findObject(":Inventory Item Cost Defaults.Post Labor Variances_QCheckBox").checked=true;
    if(!findObject(":W/O Item Cost Recognition Defaults.Proportional_QRadioButton").checked)
        findObject(":W/O Item Cost Recognition Defaults.Proportional_QRadioButton").checked=true;
    if(!findObject(":Shop Floor Workbench Posts:.Operations_QRadioButton").checked)
        findObject(":Shop Floor Workbench Posts:.Operations_QRadioButton").checked=true;
    waitForObject(":Manufacture Configuration.Save_QPushButton");
    clickButton(":Manufacture Configuration.Save_QPushButton");
    test.log("Manufacturing Module configured");
    
    
    //------------Configure: CRM Module------------------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "CRM...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "CRM...");
    while(findObject(":CRM Configuration._acctGeneration_QComboBox").currentText!="Automatic, Allow Override")
        type(":CRM Configuration._acctGeneration_QComboBox", "Automatic, Allow Override","<Down>");
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
  
 
    //------Create Calendars------------------
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
    type(":List Calendars._name_XLineEdit_2", "WEEK"+ (i+1));
    type(":List Calendars._offsetCount_QSpinBox","<Ctrl+A>");
    type(":List Calendars._offsetCount_QSpinBox","<Del>");
    type(":List Calendars._offsetCount_QSpinBox",i);
    type(":List Calendars._offsetType_QComboBox", "Weeks");
    type(":List Calendars._periodCount_QSpinBox","<Ctrl+A>");
    type(":List Calendars._periodCount_QSpinBox","Del");
    type(":List Calendars._periodCount_QSpinBox",1);
    type(":List Calendars._periodType_QComboBox", "Weeks");
    clickButton(":List Calendars.Save_QPushButton");    
    }
    waitForObject(":List Calendars.Save_QPushButton_2");
    clickButton(":List Calendars.Save_QPushButton_2");
    waitForObject(":List Calendars.Close_QPushButton");
    clickButton(":List Calendars.Close_QPushButton");
    test.log("Calendars Created");
    
    
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
    type(":Schedule Configuration._calendar_CalendarComboBox", "8WRELDAYFW");
    if(!findObject(":Schedule Configuration.Enable Constraint Management_QCheckBox").checked)
        findObject(":Schedule Configuration.Enable Constraint Management_QCheckBox").checked=true;
    waitForObject(":Schedule Configuration.Save_QPushButton");
    clickButton(":Schedule Configuration.Save_QPushButton");
    test.log("Schedule Module Configured")
  


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
    waitForObject(":List Titles.Close_QPushButton");
    clickButton(":List Titles.Close_QPushButton");
    test.log("CRM-Mast Info: New Tile created");
    
  
    //-------create Inventory Site: WH1-----------------
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
    test.log("Inventory Site1: WH1 created ");
    
    
    //-------create Inventory Site: WH2-----------------
    waitForObject(":List Sites.New_QPushButton");
    clickButton(":List Sites.New_QPushButton");
    waitForObject(":_code_XLineEdit_3");
    type(":_code_XLineEdit_3", "WH2");
    type(":_description_XLineEdit_5", "Prodiem Toys Site2");
    type(":List Sites.Street\nAddress:_XLineEdit", "Street Address Line1");
    type(":List Sites.Street\nAddress:_XLineEdit_2", "Street Address Line2");
    type(":List Sites.Street\nAddress:_XLineEdit_3", "Street Address Line3");
    type(":List Sites.City:_XLineEdit", "City1");
    type(":List Sites.State:_XComboBox", "State1");
    type(":List Sites.Postal Code:_XLineEdit", "123-4324");
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
    test.log("Inventory Site2: WH2 created ");
    
    
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
    for(i=0;i<findObject(":User._user_XComboBox").count;i++)
    {
        if(findObject(":User._user_XComboBox").currentText==newuser) break;
        type(":User._user_XComboBox", "<Down>");
        
    }
    waitForObject(":Background Image.Image:_QRadioButton");
    clickButton(":Background Image.Image:_QRadioButton");
    if(!findObject(":Interface Options.Show windows as free-floating_QRadioButton").checked)
    findObject(":Interface Options.Show windows as free-floating_QRadioButton").checked=true;
    type(":_idleTimeout_QSpinBox", "<Ctrl+A>");
    type(":_idleTimeout_QSpinBox", "<Del>");
    type(":_idleTimeout_QSpinBox", "20");
    type(":_idleTimeout_QSpinBox", "<Tab>");
    if(!findObject(":Defaults.Show S/O Item Availability when Entering_QCheckBox").checked)
    findObject(":Defaults.Show S/O Item Availability when Entering_QCheckBox").checked=true;
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
    waitForObject(":_menu.Show Schedule Menu_QCheckBox");
    clickButton(":_menu.Show Schedule Menu_QCheckBox");
    waitForObject(":_menu.Show Schedule Toolbar_QCheckBox");
    clickButton(":_menu.Show Schedule Toolbar_QCheckBox");
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
    waitForObject(":User Preferences.Save_QPushButton");
    clickButton(":User Preferences.Save_QPushButton");
    test.log("User Preferences of "+newuser +":saved");
    
    
exitAppl();

}
