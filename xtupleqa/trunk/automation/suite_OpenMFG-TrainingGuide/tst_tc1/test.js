function main()
{
    
//----------Retreive data from Shared testdata------------------
    var set = testData.dataset("login.txt");
    for(var records in set)
    {
        url=testData.field(set[records],"URL");
        db=testData.field(set[records],"DB");
        port=testData.field(set[records],"PORT");
        version=testData.field(set[records],"VERSION");
        user=testData.field(set[records],"USER");
        pwd=testData.field(set[records],"PASS");
        if(version=="3.1.0" && db=="1empty310") break; 
    }
    

    type(":_username_QLineEdit", user);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", pwd);
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    
    
    
  
//-----------Assign All Privileges to the Admin User-----------------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
    type(":List Users._usr_XTreeWidget_2","<Space>");
    waitForObject(":List Users.Edit_QPushButton_2");
    clickButton(":List Users.Edit_QPushButton_2");
    waitForObject(":_privTab.Add All->>_QPushButton_2");   
    clickButton(":_privTab.Add All->>_QPushButton_2");   
    var iNumberOfModules=10;
    for(i=0;i<iNumberOfModules;i++)
    {
     waitForObject(":_module_XComboBox_2");
     type(":_module_XComboBox_2", "<Down>");
     waitForObject(":_privTab.Add All->>_QPushButton_2");
     clickButton(":_privTab.Add All->>_QPushButton_2");
    }    
    waitForObject(":List Users.Save_QPushButton_2");
    clickButton(":List Users.Save_QPushButton_2");
    waitForObject(":List Users.Close_QPushButton_2");
    clickButton(":List Users.Close_QPushButton_2");
    test.log("Admin User assigned with all Privileges");
  
  
    //------------Rescan Privileges----------------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
    test.log("User Privileges Rescaned");
    
    
    
    //--------------Create New Dept----------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Departments...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Departments...");
    waitForObject(":List Departments.New_QPushButton");
    clickButton(":List Departments.New_QPushButton");
    waitForObject(":List Departments._number_XLineEdit");
    type(":List Departments._number_XLineEdit", "MFG");
    waitForObject(":List Departments._name_XLineEdit");
    type(":List Departments._name_XLineEdit", "Manufacturing");
    waitForObject(":List Departments.Save_QPushButton");
    clickButton(":List Departments.Save_QPushButton");
    waitForObject(":List Departments.Close_QPushButton");
    clickButton(":List Departments.Close_QPushButton");
    test.log("New Department: 'MFG' created");
  
  
  
    //--------------Creat Shift-----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Shifts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Shifts...");
    waitForObject(":List Shifts.New_QPushButton");
    clickButton(":List Shifts.New_QPushButton");
    waitForObject(":List Shifts._number_XLineEdit");
    type(":List Shifts._number_XLineEdit","1ST");
    type(":List Shifts._name_XLineEdit", "First");
    clickButton(":List Shifts.Save_QPushButton");
    waitForObject(":List Shifts.Close_QPushButton");
    clickButton(":List Shifts.Close_QPushButton");
    test.log("New Shift: '1ST' created");
  
    
    //----------------Create Locale-----------------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Locales...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Locales...");
    clickButton(":List Locales.New_QPushButton");
    waitForObject(":_code_XLineEdit");
    type(":_code_XLineEdit", "MYLOCALE");
    type(":_description_XLineEdit", "My Locale For Class");   
    type(":_language_XComboBox","English");
    type(":_country_XComboBox", "United");   
    type(":_country_XComboBox", "u");   
    type(":_currencyScale_QSpinBox","<Del>");
    type(":_currencyScale_QSpinBox","2");
    type(":_salesPriceScale_QSpinBox","<Del>");
    type(":_salesPriceScale_QSpinBox", "2");
    type(":_purchPriceScale_QSpinBox", "<Del>");
    type(":_purchPriceScale_QSpinBox", "2");
    type(":_extPriceScale_QSpinBox", "<Del>");
    type(":_extPriceScale_QSpinBox", "2");
    type(":_costScale_QSpinBox", "<Del>");
    type(":_costScale_QSpinBox", "2");
    type(":_qtyScale_QSpinBox", "<Del>");
    type(":_qtyScale_QSpinBox", "2");
    type(":_qtyPerScale_QSpinBox", "<Del>");
    type(":_qtyPerScale_QSpinBox", "6");
    type(":_uomRatioScale_QSpinBox", "<Del>");
    type(":_uomRatioScale_QSpinBox", "6");
    type(":_error_QLineEdit", "red");
    type(":_warning_QLineEdit", "orange");
    type(":_emphasis_QLineEdit", "lime");
    type(":_expired_QLineEdit", "gray");
    type(":_alternate_QLineEdit", "blue");
    type(":_future_QLineEdit", "green");
    type(":_comments_QTextEdit", "My Locale for Class");
    clickButton(":List Locales.Save_QPushButton");
    waitForObject(":List Locales.Close_QPushButton");
    clickButton(":List Locales.Close_QPushButton");
    test.log("New Locale:'MYLOCALE' created ");
  
  
  
    //----------------Create new Group----------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Groups...");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Groups...");
    waitForObject(":List Groups.New_QPushButton");
    clickButton(":List Groups.New_QPushButton");
    type(":_name_XLineEdit", "SUPER");
    type(":_description_XLineEdit_2", "Super User Group");
    for(var i=0;i<10;i++)
    {
    waitForObject(":frame.Add All->>_QPushButton");
    clickButton(":frame.Add All->>_QPushButton");
    waitForObject(":_module_XComboBox_3");
    type(":_module_XComboBox_3", "<Down>");
    }
    waitForObject(":List Groups.Save_QPushButton");
    clickButton(":List Groups.Save_QPushButton");
    waitForObject(":List Groups.Close_QPushButton");
    clickButton(":List Groups.Close_QPushButton");
    test.log("New Group: 'SUPER' created");
  
  
    
    //-----------------Create New User and assign privileges-------------------
    var user_created="user25";
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
    clickButton(":List Users.New_QPushButton");
    type(":_username_XLineEdit", user_created);
    type(":_properName_XLineEdit", "Test User");
    type(":_initials_XLineEdit", "JS");
    type(":_email_XLineEdit", "demo@openmfg.com");
    type(":_passwd_XLineEdit", "mfgapp");
    type(":_verify_XLineEdit", "mfgapp");
    clickButton(":List Users.Purchasing Agent_QCheckBox");
    clickButton(":List Users.Can Create System Users_QCheckBox");    
    while(findObject(":_locale_XComboBox").currentText!= "MYLOCALE")
    type(":_locale_XComboBox", "<Down>");
    waitForObject(":List Users.Save_QPushButton_2");
    clickButton(":List Users.Save_QPushButton_2");
    var sWidgetTreeControl = ":List Users._usr_XTreeWidget_2";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    test.log("Number of Users"+iNumberOfRootItems);
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=1;i<iNumberOfRootItems && sNameOfRootItem!=user_created;i++)
    {
        type(sWidgetTreeControl,"<Down>");           
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    }
    clickButton(":List Users.Edit_QPushButton_2");
    clickTab(":List Users.qt_tabwidget_tabbar_QTabBar", "Groups");
    type(":_groupTab._availableGroup_XTreeWidget","<Space>");
    waitForObject(":_groupTab.Add->_QPushButton");
    clickButton(":_groupTab.Add->_QPushButton");
    waitForObject(":List Users.Save_QPushButton_2");
    clickButton(":List Users.Save_QPushButton_2");
    waitForObject(":List Users.Close_QPushButton_2");
    clickButton(":List Users.Close_QPushButton_2");
	test.log(user_created +" created and added 'SUPER' group privilege");
  
  
  
  
    
    //--------------Accounting-Account-Companies-New---------------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
    waitForObject(":List Companies.New_QPushButton");
    clickButton(":List Companies.New_QPushButton");
    type(":_number_XLineEdit", "<Del>");
    type(":_number_XLineEdit", "01");
    type(":_descrip_XTextEdit", "<Del>");
    type(":_descrip_XTextEdit", "Prodiem");
    waitForObject(":List Companies.Save_QPushButton");
    clickButton(":List Companies.Save_QPushButton");
    waitForObject(":List Companies.Close_QPushButton");
    clickButton(":List Companies.Close_QPushButton");
    test.log("Company: Prodien created");
    
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
//    
//  -----------------------Account-Account-SubAccount Types-----------------
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
    test.log("Base Currency: USD($) Created");
  
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
    waitForObject(":List Currencies.Close_QPushButton");
    clickButton(":List Currencies.Close_QPushButton");
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
    
    //---------Acc: 01-01-1950-01-------------    
    waitForObject(":Chart of Accounts.New_QPushButton");
    clickButton(":Chart of Accounts.New_QPushButton");
    waitForObject(":_number_XLineEdit_2");
    type(":_number_XLineEdit_2", "1950");
    waitForObject(":_number_XLineEdit_2");
    type(":_number_XLineEdit_2", "<Tab>");
    waitForObject(":Chart of Accounts._sub_XComboBox");
    type(":Chart of Accounts._sub_XComboBox", "<Tab>");
    waitForObject(":_description_XLineEdit_3");
    type(":_description_XLineEdit_3", "Unassigned Inv Transactions");
    waitForObject(":_description_XLineEdit_3");
    type(":_description_XLineEdit_3", "<Tab>");
    waitForObject(":_extReference_XLineEdit");
    type(":_extReference_XLineEdit", "01-01-1950-01");
    type(":Chart of Accounts._type_XComboBox","Asset");
    type(":Chart of Accounts._subType_XComboBox","IN");
    waitForObject(":Chart of Accounts.Save_QPushButton");
    clickButton(":Chart of Accounts.Save_QPushButton");
    test.log("Acc: 01-01-1950-01 created");
    
    //---------Acc: 01-01-3030-01-------------
    waitForObject(":Chart of Accounts.New_QPushButton");
    clickButton(":Chart of Accounts.New_QPushButton");
    waitForObject(":_number_XLineEdit_2");
    type(":_number_XLineEdit_2", "3030");
    waitForObject(":_description_XLineEdit_3");
    type(":_description_XLineEdit_3", "Retained Earnings");
    waitForObject(":_extReference_XLineEdit");
    type(":_extReference_XLineEdit", "01-01-3030-01");
    type(":Chart of Accounts._type_XComboBox","Equity");
    type(":Chart of Accounts._subType_XComboBox","EC");
    waitForObject(":Chart of Accounts.Save_QPushButton");
    clickButton(":Chart of Accounts.Save_QPushButton");
    test.log("Acc: 01-01-3030-01 created");
    
    //---------Acc: 01-01-3040-01-------------
    waitForObject(":Chart of Accounts.New_QPushButton");
    clickButton(":Chart of Accounts.New_QPushButton");
    waitForObject(":_number_XLineEdit_2");
    type(":_number_XLineEdit_2", "3040");
    waitForObject(":_description_XLineEdit_3");
    type(":_description_XLineEdit_3", "Stock Class B");
    waitForObject(":_extReference_XLineEdit");
    type(":_extReference_XLineEdit", "01-01-3040-01");
    type(":Chart of Accounts._type_XComboBox","Equity")
    type(":Chart of Accounts._subType_XComboBox","EDC");
    waitForObject(":Chart of Accounts.Save_QPushButton");
    clickButton(":Chart of Accounts.Save_QPushButton");
    test.log("Acc: 01-01-3040-01 created");
    
    
    //---------Acc: 01-01-8990-01-------------
    waitForObject(":Chart of Accounts.New_QPushButton");
    clickButton(":Chart of Accounts.New_QPushButton");
    waitForObject(":_number_XLineEdit_2");
    type(":_number_XLineEdit_2", "8990");
    waitForObject(":_description_XLineEdit_3");
    type(":_description_XLineEdit_3", "Currency Gain / Loss");
    waitForObject(":_extReference_XLineEdit");
    type(":_extReference_XLineEdit", "01-01-8990-01");
    waitForObject(":_extReference_XLineEdit");
    type(":Chart of Accounts._type_XComboBox","Expense");
    type(":Chart of Accounts._subType_XComboBox","EXP");
    waitForObject(":Chart of Accounts.Save_QPushButton");
    clickButton(":Chart of Accounts.Save_QPushButton");
    test.log("Acc: 01-01-8990-01 created");
    
    
    //---------Acc: 01-01-8995-01-------------
    waitForObject(":Chart of Accounts.New_QPushButton");
    clickButton(":Chart of Accounts.New_QPushButton");
    waitForObject(":_number_XLineEdit_2");
    type(":_number_XLineEdit_2", "8995");
    waitForObject(":_description_XLineEdit_3");
    type(":_description_XLineEdit_3", "G/L Series Discrepancy");
    waitForObject(":_extReference_XLineEdit");
    type(":_extReference_XLineEdit", "01-01-8990-01");
    waitForObject(":_extReference_XLineEdit");
    type(":Chart of Accounts._type_XComboBox","Expense");
    type(":Chart of Accounts._subType_XComboBox","EXP");
    waitForObject(":Chart of Accounts.Save_QPushButton");
    clickButton(":Chart of Accounts.Save_QPushButton");
    test.log("Acc: 01-01-8995-01 created");

    waitForObject(":Chart of Accounts.Close_QPushButton");
    clickButton(":Chart of Accounts.Close_QPushButton");

    
    
    
    
    
    
    //---------------exit Appl-----------------------
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit OpenMFG...");


}