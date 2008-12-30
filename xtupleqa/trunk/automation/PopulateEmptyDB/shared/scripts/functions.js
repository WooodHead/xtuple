//-***-This script doc contains all the common code libraries/functions required by the Main driver script-***-

 var iNumberOfModules=10;

//--------Login into Appl----------
function loginAppl(vrsn,database,usr)
{
   
    var set = testData.dataset("login.txt");
    var url, db, port, version, pwd, user;
    user=db=version=pwd=user="";
    for(var records in set)
    {
       url=testData.field(set[records],"URL");
       db=testData.field(set[records],"DB");
       port=testData.field(set[records],"PORT");
       version=testData.field(set[records],"VERSION");
       user=testData.field(set[records],"USER");
       pwd=testData.field(set[records],"PASS");
       if(user==usr && vrsn==version && database==db) break;
    }
    if(user!=usr || vrsn!=version || database!=db)
    {
        test.fatal("User "+usr+" not found in TestData - login.txt");
        exit(1);
    }
    waitForObject(":Log In.Options_QPushButton");
    clickButton(":Log In.Options_QPushButton");
    waitForObject(":_server_QLineEdit");
    if(findObject(":_server_QLineEdit").text!= url)
    {findObject(":_server_QLineEdit").text=url;
        test.log("URL Changed to: "+url);
    }
    if(findObject(":_database_QLineEdit").text!=db)
    {
        findObject(":_database_QLineEdit").text=db;
        test.log("Database Changed to: "+db);
    }
    if(findObject(":_port_QLineEdit").text!=port)
    {
        findObject(":_port_QLineEdit").text=port;
        test.log("Port Changed to:" + port);
    }
    clickButton(":Login Options.Save_QPushButton");
    waitForObject(":_username_QLineEdit");    
    type(":_username_QLineEdit", user);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", pwd);
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    test.log("Logged in Application");
}




//-----------Assign All Privileges to the Admin User-----------------------
function assignPrivileges()
{
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
    type(":List Users._usr_XTreeWidget_2","<Space>");
    waitForObject(":List Users.Edit_QPushButton_2");
    clickButton(":List Users.Edit_QPushButton_2");
    waitForObject(":_privTab.Add All->>_QPushButton_2");   
    clickButton(":_privTab.Add All->>_QPushButton_2");   
    var iNumberOfModules=11;
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
 

}



//--------------Create New Dept----------------------
function createDept(DeptNum, DeptName)
{

    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Departments...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Departments...");
    waitForObject(":List Departments.New_QPushButton");
    clickButton(":List Departments.New_QPushButton");
    waitForObject(":List Departments._number_XLineEdit");
    type(":List Departments._number_XLineEdit", DeptNum);
    waitForObject(":List Departments._name_XLineEdit");
    type(":List Departments._name_XLineEdit", DeptName);
    waitForObject(":List Departments.Save_QPushButton");
    clickButton(":List Departments.Save_QPushButton");
    test.log("New Department:"+ DeptNum + " created");
    waitForObject(":List Departments.Close_QPushButton");
    clickButton(":List Departments.Close_QPushButton");
       
}


//--------------Creat Shift-----------------
function createShift(ShiftNum, ShiftName)
{
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Shifts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Shifts...");
    waitForObject(":List Shifts.New_QPushButton");
    clickButton(":List Shifts.New_QPushButton");
    waitForObject(":List Shifts._number_XLineEdit");
    type(":List Shifts._number_XLineEdit",ShiftNum);
    type(":List Shifts._name_XLineEdit", ShiftName);
    clickButton(":List Shifts.Save_QPushButton");
   
    var sWidgetTreeControl = ":List Shifts._shiftList_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=1;sNameOfRootItem!="1ST" || i<iNumberOfRootItems ;i++)
    {
        type(sWidgetTreeControl,"<Down>");           
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    }
    if(sNameOfRootItem=="1ST")
        test.pass("New Shift:"+ ShiftNum + " created");
    else
        test.fail("New Shift:"+ ShiftNum + "not created")
    
    waitForObject(":List Shifts.Close_QPushButton");
    clickButton(":List Shifts.Close_QPushButton");
       
}



//----------------Create Locale-----------------------
function createLocale(LocaleCode,LocaleDesc)
{  
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Locales...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Locales...");
    clickButton(":List Locales.New_QPushButton");
    waitForObject(":_code_XLineEdit");
    type(":_code_XLineEdit", LocaleCode);
    type(":_description_XLineEdit", LocaleDesc);   
    type(":_language_XComboBox","English");
    type(":_country_XComboBox", "United");  
    snooze(0.5);
    type(":_country_XComboBox", "u");   
    if(findObject(":_currencyScale_QSpinBox").text!=2)
    {
 
        type(":_currencyScale_QSpinBox","<Del>");
        type(":_currencyScale_QSpinBox","2");
    }
    if(findObject(":_salesPriceScale_QSpinBox").text!=2)
    { 
        type(":_salesPriceScale_QSpinBox","<Del>");
        type(":_salesPriceScale_QSpinBox", "2");
    }
    if(findObject(":_purchPriceScale_QSpinBox").text!=2)
    {     
        type(":_purchPriceScale_QSpinBox", "<Del>");
        type(":_purchPriceScale_QSpinBox", "2");
    }
    if(findObject(":_extPriceScale_QSpinBox").text!=2)
    { 
        type(":_extPriceScale_QSpinBox", "<Del>");
        type(":_extPriceScale_QSpinBox", "2");
    }
    if(findObject(":_costScale_QSpinBox").text!=2)
    { 
        type(":_costScale_QSpinBox", "<Del>");
        type(":_costScale_QSpinBox", "2");
    }
    if(findObject(":_qtyScale_QSpinBox").text!=2)
    { 
        type(":_qtyScale_QSpinBox", "<Del>");
        type(":_qtyScale_QSpinBox", "2");
    }
    if(findObject(":_qtyPerScale_QSpinBox").text!=6)
    { 
        type(":_qtyPerScale_QSpinBox", "<Del>");
        type(":_qtyPerScale_QSpinBox", "6");
    }
    if(findObject(":_uomRatioScale_QSpinBox").text!=6)
    { 
        type(":_uomRatioScale_QSpinBox", "<Del>");
        type(":_uomRatioScale_QSpinBox", "6");
    }
    type(":_error_QLineEdit", "red");
    type(":_warning_QLineEdit", "orange");
    type(":_emphasis_QLineEdit", "lime");
    type(":_expired_QLineEdit", "gray");
    type(":_alternate_QLineEdit", "blue");
    type(":_future_QLineEdit", "green");
    type(":_comments_QTextEdit", "My Locale for Class");
    waitForObject(":List Locales.Save_QPushButton");
    clickButton(":List Locales.Save_QPushButton");
    var sWidgetTreeControl = ":List Locales._locale_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=1;sNameOfRootItem!="MYLOCALE" || i<iNumberOfRootItems ;i++)
    {
        type(sWidgetTreeControl,"<Down>");           
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    }
    if(sNameOfRootItem=="MYLOCALE")
        test.pass("New Locale:'"+LocaleCode+"' created ");
    else
        test.fail("New Locale:'"+LocaleCode+"' not created ");
    waitForObject(":List Locales.Close_QPushButton");
    clickButton(":List Locales.Close_QPushButton");
   
}


//----------------Create new Group----------------
function createGroup(GrpName, GrpDesc)
{
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Groups...");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Groups...");
    waitForObject(":List Groups.New_QPushButton");
    clickButton(":List Groups.New_QPushButton");
    type(":_name_XLineEdit", GrpName);
    type(":_description_XLineEdit_2", GrpDesc);
    for(var i=0;i<iNumberOfModules;i++)
    {
    waitForObject(":frame.Add All->>_QPushButton");
    clickButton(":frame.Add All->>_QPushButton");
    waitForObject(":_module_XComboBox_3");
    type(":_module_XComboBox_3", "<Down>");
    }
    waitForObject(":List Groups.Save_QPushButton");
    clickButton(":List Groups.Save_QPushButton");

    var sWidgetTreeControl = ":List Groups._list_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=1;sNameOfRootItem!=GrpName || i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
        type(sWidgetTreeControl,"<Down>"); 
    }
    if(sNameOfRootItem==GrpName)
        test.pass("New Group: '"+GrpName+"' created");
    else
        test.fail("New Group: '"+GrpName+"' not created");
    waitForObject(":List Groups.Close_QPushButton");
    clickButton(":List Groups.Close_QPushButton");

}


//-----------------Create New User and assign privileges-------------------
function createUser(user_created)
{
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
    for(i=1;sNameOfRootItem!=user_created && i<iNumberOfRootItems ;i++)
    {
        type(sWidgetTreeControl,"<Down>");           
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    }
    if(sNameOfRootItem==user_created)
        test.pass(user_created +" created and added 'SUPER' group privilege");
    else 
    {
        test.fail(user_created +" created and added 'SUPER' group privilege");
        exit(1);
    }
    clickButton(":List Users.Edit_QPushButton_2");
    clickTab(":List Users.qt_tabwidget_tabbar_QTabBar", "Groups");
    sWidgetTreeControl = ":_groupTab._availableGroup_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    obj_TreeWidget = findObject(sWidgetTreeControl);
    obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=1;sNameOfRootItem!="SUPER" || i<iNumberOfRootItems ;i++)
    {
       
        waitForObject(sWidgetTreeControl); 
        type(sWidgetTreeControl,"<Down>");           
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    }
    waitForObject(":_groupTab.Add->_QPushButton");
    clickButton(":_groupTab.Add->_QPushButton");
    waitForObject(":List Users.Save_QPushButton_2");
    clickButton(":List Users.Save_QPushButton_2");
     waitForObject(":List Users.Close_QPushButton_2");
    clickButton(":List Users.Close_QPushButton_2");
    
}

 
//--------------Accounting-Account-Companies-New---------------------
function createCompany(CompNum, CompDesc)
{
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
    waitForObject(":List Companies.New_QPushButton");
    clickButton(":List Companies.New_QPushButton");
    type(":_number_XLineEdit", "<Del>");
    type(":_number_XLineEdit", CompNum);
    type(":_descrip_XTextEdit", "<Del>");
    type(":_descrip_XTextEdit", CompDesc);
    waitForObject(":List Companies.Save_QPushButton");
    clickButton(":List Companies.Save_QPushButton");
  
    var sWidgetTreeControl = ":List Companies._company_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=1;sNameOfRootItem!=CompNum || i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(0);
        type(sWidgetTreeControl,"<Down>"); 
    }
    if(sNameOfRootItem==CompNum)
        test.pass("Company: "+CompDesc+" created");
    else
        test.fail("Company: "+CompDesc+"not created");
     
    waitForObject(":List Companies.Close_QPushButton");
    clickButton(":List Companies.Close_QPushButton");
    test.log("Company: "+CompNum+" created");

}

//------------Create Chart of Accounts-------------------
function COA(COACompany,COAProfit,COANumber,COASub,COADesc,COAType,COASubType)
{

    waitForObject(":Chart of Accounts.New_QPushButton_2");
    clickButton(":Chart of Accounts.New_QPushButton_2");
    waitForObject(":Account Number._company_XComboBox");
    if(findObject(":Account Number._company_XComboBox").currentText!=COACompany)
        type(":Chart of Accounts._company_XComboBox_2","01");
    if(findObject(":Account Number._profit_XComboBox").currentText!=COAProfit)
        type(":Account Number._profit_XComboBox","01");
    if(findObject(":Account Number._sub_XComboBox").currentText!=COASub)
        type(":Chart of Accounts._sub_XComboBox","01");
    type(":_number_XLineEdit_3", COANumber);
    type(":_description_XLineEdit_11", COADesc);
    type(":_extReference_XLineEdit_2", COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub);
    type(":Account Number._type_XComboBox",COAType);
    type(":Account Number._subType_XComboBox",COASubType);
    clickButton(":Account Number.Save_QPushButton");
    test.log("Acc: "+COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub+" created");

}

//--------check if the year is a leap year--------
function IsLeapYear(datea)
{
	datea = parseInt(datea);
	if(datea%4 == 0)
	{
		if(datea%100 != 0)
			return true;
		else
		{
			if(datea%400 == 0)
				return true;
			else
				return false;
		}
	}
return false;
}



function defineTaxation()
{
    
    //------Define Tax Authorities-------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Authorities...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Authorities...");
    waitForObject(":List Tax Authorities.New_QPushButton");
    clickButton(":List Tax Authorities.New_QPushButton");
    waitForObject(":_code_XLineEdit_15");
    type(":_code_XLineEdit_15", "TAX-AUTH1");
    type(":_name_XLineEdit_22", "Virginia");
    type(":_extref_XLineEdit", "Smith");
    if(findObject(":_currency_XComboBox_2").currentText!= "USD - $")
        type(":_currency_XComboBox_2", "USD");
    type(":Tax Authority._county_QLineEdit", "United States");
    type(":Tax Authority.Street\nAddress:_XLineEdit", "Street Addr Line1");
    type(":Tax Authority.Street\nAddress:_XLineEdit_2", "Street addr line2");
    type(":Tax Authority.Street\nAddress:_XLineEdit_3", "Street Addr line3");
    type(":Tax Authority.City:_XLineEdit", "VA");
    type(":Tax Authority.State:_XComboBox", "State1");
    type(":Tax Authority.Postal Code:_XLineEdit", "323525");
    type(":Tax Authority.Country:_XComboBox", "United States");
    clickButton(":Tax Authority.Save_QPushButton");
    waitForObject(":List Tax Authorities._taxauth_XTreeWidget");
    if(!clickItem(":List Tax Authorities._taxauth_XTreeWidget", "TAX-AUTH1", 5, 5, 1, Qt.LeftButton))
        test.pass("Tax Authority created:TAX-AUTH1");
    
    waitForObject(":List Tax Authorities.Close_QPushButton");
    clickButton(":List Tax Authorities.Close_QPushButton");
    
  
  
    //----------Create: Tax Codes---------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Codes...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Codes...");
        
    waitForObject(":List Tax Codes.New_QPushButton");
    clickButton(":List Tax Codes.New_QPushButton");
    waitForObject(":_code_XLineEdit_12");
    type(":_code_XLineEdit_12", "TAXAUTH1-GM");
    type(":_description_XLineEdit_23", "Tax Authority 1 General Merchandise");
    type(":_taxRateA_XLineEdit", "10");
    type(":frame._main_XLineEdit", "01-01-4050-01");
    clickButton(":Tax Code.Save_QPushButton");
    waitForObject(":List Tax Codes._tax_XTreeWidget");
    if(!clickItem(":List Tax Codes._tax_XTreeWidget", "TAXAUTH1-GM", 5, 5, 1, Qt.LeftButton))
         test.pass("Tax Code created:TAXAUTH1-GM");
    
    
    waitForObject(":List Tax Codes.New_QPushButton");
    clickButton(":List Tax Codes.New_QPushButton");
    waitForObject(":_code_XLineEdit_12");
    type(":_code_XLineEdit_12", "TAXAUTH1-EDU");
    type(":_description_XLineEdit_23", "Tax Authority 1 Educational Merchandise");
    type(":_taxRateA_XLineEdit", "1");
    type(":frame._main_XLineEdit", "01-01-4050-01");
    clickButton(":Tax Code.Save_QPushButton");
    waitForObject(":List Tax Codes._tax_XTreeWidget");
    if(!clickItem(":List Tax Codes._tax_XTreeWidget", "TAXAUTH1-EDU", 5, 5, 1, Qt.LeftButton))
         test.pass("Tax Code created:TAXAUTH1-EDU");
    
    
    waitForObject(":List Tax Codes.Close_QPushButton");
    clickButton(":List Tax Codes.Close_QPushButton");
 
  
  
    //---------Create Tax Types--------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Types...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Types...");
    waitForObject(":List Tax Types.New_QPushButton_2");
    clickButton(":List Tax Types.New_QPushButton_2");
    waitForObject(":Tax Type._name_XLineEdit");
    type(":Tax Type._name_XLineEdit", "GM");
    type(":Tax Type._description_XLineEdit", "General Merchandise");
    clickButton(":Tax Type.Save_QPushButton");
    waitForObject(":List Tax Types._taxtype_XTreeWidget");
    if(!clickItem(":List Tax Types._taxtype_XTreeWidget", "GM", 5, 5, 1, Qt.LeftButton))
         test.pass("Tax Type created:GM");
    
   
    waitForObject(":List Tax Types.New_QPushButton_2");
    clickButton(":List Tax Types.New_QPushButton_2");
    waitForObject(":Tax Type._name_XLineEdit");
    type(":Tax Type._name_XLineEdit", "EDU");
    type(":Tax Type._description_XLineEdit", "Educational Material");
    clickButton(":Tax Type.Save_QPushButton");
    waitForObject(":List Tax Types._taxtype_XTreeWidget");
    if(!clickItem(":List Tax Types._taxtype_XTreeWidget", "EDU", 5, 5, 1, Qt.LeftButton))
         test.pass("Tax Type created:EDU");
    
    waitForObject(":List Tax Types.Close_QPushButton_2");
    clickButton(":List Tax Types.Close_QPushButton_2");
 
  
    
    //------------Create: Tax Selections--------------------
     waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Selections...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Selections...");
    
    waitForObject(":List Tax Selections.New_QPushButton_2");
    clickButton(":List Tax Selections.New_QPushButton_2");
    waitForObject(":_taxauth_XComboBox_4");
    type(":_taxauth_XComboBox_4", "TAX-AUTH1");
    type(":_taxtype_XComboBox_3", "GM");
    type(":_tax_XComboBox_2", "TAXAUTH1-GM");
    clickButton(":Tax Selection.Save_QPushButton");
    waitForObject(":List Tax Selections._taxsel_XTreeWidget");
    if(!clickItem(":List Tax Selections._taxsel_XTreeWidget", "TAXAUTH1-GM", 30, 9, 1, Qt.LeftButton))
        test.pass("Tax Selections done with:TAXAUTH1-GM");

    
    waitForObject(":List Tax Selections.New_QPushButton_2");
    clickButton(":List Tax Selections.New_QPushButton_2");
    waitForObject(":_taxauth_XComboBox_4");
    type(":_taxauth_XComboBox_4", "TAX-AUTH1");
    type(":_taxtype_XComboBox_3", "EDU");
    type(":_tax_XComboBox_2", "TAXAUTH1-EDU");
    clickButton(":Tax Selection.Save_QPushButton");
    waitForObject(":List Tax Selections._taxsel_XTreeWidget");
    if(!clickItem(":List Tax Selections._taxsel_XTreeWidget", "TAXAUTH1-EDU", 30, 9, 1, Qt.LeftButton))
        test.pass("Tax Selections done with:TAXAUTH1-EDU");
     
    waitForObject(":List Tax Selections.Close_QPushButton_2");
    clickButton(":List Tax Selections.Close_QPushButton_2");
  
    
    //----------Create: Tax Registrations--------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Registrations...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Registrations...");
    waitForObject(":List Tax Registrations.New_QPushButton_2");
    clickButton(":List Tax Registrations.New_QPushButton_2");
    waitForObject(":Tax Registration Information._taxauth_XComboBox");
    type(":Tax Registration Information._taxauth_XComboBox", "TAX-AUTH1");
    type(":Tax Registration Information._number_QLineEdit", "AUTH1-0101");
    clickButton(":Tax Registration Information.Save_QPushButton");
    waitForObject(":_taxreg_XTreeWidget");
    if(!clickItem(":_taxreg_XTreeWidget", "TAX-AUTH1", 5, 5, 1, Qt.LeftButton))
        test.pass("Tax Registrations done");
 
    waitForObject(":List Tax Registrations.Close_QPushButton_2");
    clickButton(":List Tax Registrations.Close_QPushButton_2");
 
  
}


//---------------exit Appl-----------------------
function exitAppl()
{
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit OpenMFG...");
}







