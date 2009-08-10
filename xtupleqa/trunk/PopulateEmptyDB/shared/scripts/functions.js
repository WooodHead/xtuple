//-***-This script doc contains all the common code libraries/functions required by the Main driver script-***-

 var iNumberOfModules=10;

//--------Login into Appl----------
function loginAppl(userrole)
{
   
    var set = testData.dataset("login.tsv");
    var url, db, port, pwd,realname,username;
    db=pwd=port=url=realname=username="";
    for(var records in set)
    {
        url=testData.field(set[records],"HOST");
        db=testData.field(set[records],"DB");
        port=testData.field(set[records],"PORT");
        pwd=testData.field(set[records],"PASSWORD");
        role=testData.field(set[records],"ROLE");
        username=testData.field(set[records],"USERNAME");
        realname=testData.field(set[records],"REALNAME");
        if(userrole==role) break;
              
    }

    if(userrole!=role)
    {
        test.fatal("Please enter user details in login.tsv for the role: "+userrole);
        exit(1);
    }
       
    waitForObject(":Log In.Options..._QPushButton");
    clickButton(":Log In.Options..._QPushButton");
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
    type(":_username_QLineEdit", username);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", pwd);
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    test.log("Logged in Application");
    waitForObject(":xTuple ERP: OpenMFG Edition_QWorkspace");
}




//-----------Assign All Privileges to the Admin User-----------------------
function assignPrivileges()
{
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
    waitForObject(":List Users._usr_XTreeWidget_2");
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
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu","Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Locales...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Locales...");
    waitForObject(":List Locales.New_QPushButton");
    clickButton(":List Locales.New_QPushButton");
    waitForObject(":_code_XLineEdit");
    type(":_code_XLineEdit", LocaleCode);
    type(":_description_XLineEdit", LocaleDesc);   
    snooze(0.5);
    waitForObject(":_language_XComboBox");
    type(":_language_XComboBox", "English");
    snooze(0.5);
    waitForObject(":_country_XComboBox");
    type(":_country_XComboBox", "United");	
    waitForObject(":_country_XComboBox");
    type(":_country_XComboBox", "u");
    waitForObject(":_currencyScale_QSpinBox");
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
    waitForObject(":List Locales._locale_XTreeWidget");
    if(!clickItem(":List Locales._locale_XTreeWidget","MYLOCALE", 5, 5, 1, Qt.LeftButton))
        test.pass("Locale created: MYLOCALE");
    
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
    waitForObject(":_name_XLineEdit");
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
function createUserByRole(userrole)
{
    //----Read the new User data from login.tsv based on role---
    var set = testData.dataset("login.tsv");
    var realname,username,role,pwd;
    role=realname=username=pwd="";
    
    for (var records in set)
    {
        role=testData.field(set[records],"ROLE");
        username=testData.field(set[records],"USERNAME");
        realname=testData.field(set[records],"REALNAME");
        pwd=testData.field(set[records],"PASSWORD");
        
        if(role==userrole) break;
    }

    if(userrole!=role) //User Role not found
    {
        test.fatal("Please provide user details in login.tsv for the role: "+userrole);
        exit(1);
    }
        
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Employees");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Employees");
    waitForObjectItem(":xTuple ERP: *.Employees_QMenu", "List...");
    activateItem(":xTuple ERP: *.Employees_QMenu", "List...");
    
    waitForObject(":_frame.New_QPushButton_5");
    clickButton(":_frame.New_QPushButton_5");
    waitForObject(":_code_XLineEdit_16");
    type(":_code_XLineEdit_16", username);
    waitForObject(":List Employees._number_XLineEdit");
    type(":List Employees._number_XLineEdit", "15001");
    waitForObject(":_contactTab._honorific_XComboBox");
    type(":_contactTab._honorific_XComboBox", "MR");
    waitForObject(":_contactTab._first_XLineEdit");
    type(":_contactTab._first_XLineEdit", "Susanta");
    waitForObject(":_contactTab._middle_XLineEdit");
    type(":_contactTab._middle_XLineEdit", "R");
    waitForObject(":_contactTab._last_XLineEdit");
    type(":_contactTab._last_XLineEdit", "Misra");
    waitForObject(":_contactTab._title_XLineEdit");
    type(":_contactTab._title_XLineEdit", "student");
    waitForObject(":_contactTab._phone_XLineEdit");
    type(":_contactTab._phone_XLineEdit", "234234");
    waitForObject(":_contactTab._phone2_XLineEdit");
    type(":_contactTab._phone2_XLineEdit", "234234");
    waitForObject(":_contactTab._fax_XLineEdit");
    type(":_contactTab._fax_XLineEdit", "234223");
    waitForObject(":_contactTab._email_XLineEdit");
    type(":_contactTab._email_XLineEdit", "susanta@test.com");
    waitForObject(":_contactTab.Street\nAddress:_XLineEdit");
    type(":_contactTab.Street\nAddress:_XLineEdit", "addr line1");
    waitForObject(":_contactTab.Street\nAddress:_XLineEdit_2");
    type(":_contactTab.Street\nAddress:_XLineEdit_2", "addr line2");
    waitForObject(":_contactTab.City:_XLineEdit");
    type(":_contactTab.City:_XLineEdit", "city1");
    waitForObject(":_contactTab.City:_XLineEdit");
    type(":_contactTab._state_XComboBox", "state1");
    waitForObject(":_contactTab.Postal Code:_XLineEdit");
    type(":_contactTab.Postal Code:_XLineEdit", "23423");
    waitForObject(":_contactTab._country_XComboBox");
    type(":_contactTab._country_XComboBox", "india");
    waitForObject(":Employee.qt_tabwidget_tabbar_QTabBar");
    
    clickTab(":Employee.qt_tabwidget_tabbar_QTabBar", "Detail");
    waitForObject(":_memberGroup._site_WComboBox");
    clickItem(":_memberGroup._site_WComboBox", "WH1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_timeclockGroup.VirtualClusterLineEdit_DeptClusterLineEdit");
    type(":_timeclockGroup.VirtualClusterLineEdit_DeptClusterLineEdit", "MFG");
    waitForObject(":_timeclockGroup.VirtualClusterLineEdit_ShiftClusterLineEdit");
    type(":_timeclockGroup.VirtualClusterLineEdit_ShiftClusterLineEdit", "1ST");
    waitForObject(":_rateGroup._wagetype_XComboBox");
    clickItem(":_rateGroup._wagetype_XComboBox", "Hourly", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_rateGroup_XLineEdit");
    type(":_rateGroup_XLineEdit", "100000");
    waitForObject(":_rateGroup._per_XComboBox");
    clickItem(":_rateGroup._per_XComboBox", "Year", 0, 0, 1, Qt.LeftButton);
    if(!findObject(":_relationshipsGroup._user_XCheckBox").checked)
        clickButton(":_relationshipsGroup._user_XCheckBox");
    waitForObject(":_relationshipsGroup.User..._QPushButton");
    clickButton(":_relationshipsGroup.User..._QPushButton");
    snooze(1);
    if(object.exists(":List Employees.Yes_QPushButton"))
        clickButton(":List Employees.Yes_QPushButton");
    waitForObject(":List Employees.Active_QCheckBox");
    if(!findObject(":List Employees.Active_QCheckBox").checked)
        clickButton(":List Employees.Active_QCheckBox");
    waitForObject(":_properName_XLineEdit_2");
    type(":_properName_XLineEdit_2",realname);
    type(":_initials_XLineEdit_2", "JS");
    type(":_email_XLineEdit_2", "demo@openmfg.com");
    type(":_passwd_XLineEdit_2", pwd);
    type(":_verify_XLineEdit_2", pwd);
    clickButton(":List Employees.Purchasing Agent_QCheckBox");
    clickButton(":List Employees.Can Create System Users_QCheckBox");  
    clickItem(":_locale_XComboBox_2","MYLOCALE",0,0,1,Qt.LeftButton);
    waitForObject(":List Employees.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Employees.qt_tabwidget_tabbar_QTabBar", "Groups");
    waitForObject(":_groupTab._availableGroup_XTreeWidget_2");
    sWidgetTreeControl = ":_groupTab._availableGroup_XTreeWidget_2";
    clickItem(":_groupTab._availableGroup_XTreeWidget_2","SUPER",0,0,1,Qt.LeftButton);
    waitForObject(":_groupTab.Add->_QPushButton_2");
    clickButton(":_groupTab.Add->_QPushButton_2");
    waitForObject(":List Employees.Save_QPushButton");
    clickButton(":List Employees.Save_QPushButton");
    waitForObject(":Employee.Save_QPushButton");
    clickButton(":Employee.Save_QPushButton");
    waitForObject(":_frame._emp_XTreeWidget");
    clickItem(":_frame._emp_XTreeWidget", username, 0, 0, 1, Qt.LeftButton);
    waitForObject(":_frame.Close_QPushButton");
    clickButton(":_frame.Close_QPushButton");

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
    waitForObject(":_number_XLineEdit");
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
        clickItem(":Chart of Accounts._company_XComboBox_2", "01", 0, 0, 1, Qt.LeftButton);
    if(findObject(":Account Number._profit_XComboBox").currentText!=COAProfit)
        clickItem(":Account Number._profit_XComboBox", "01", 0, 0, 1, Qt.LeftButton);
    if(findObject(":Account Number._sub_XComboBox").currentText!=COASub)
        clickItem(":Chart of Accounts._sub_XComboBox", "01", 0, 0, 1, Qt.LeftButton);
    type(":_number_XLineEdit_3", COANumber);
    type(":_description_XLineEdit_11", COADesc);
    
    type(":_extReference_XLineEdit_2", COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub);
    clickItem(":Account Number._type_XComboBox", COAType, 0, 0, 1, Qt.LeftButton);
    waitForObject(":Account Number._subType_XComboBox");
    type(":Account Number._subType_XComboBox", COASubType);
    clickButton(":Account Number.Save_QPushButton");
    test.log("Acc: "+COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub+" created");
    waitForObject(":_account_XTreeWidget_2");
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
    waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Authorities...");
    activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Authorities...");
    
    
    waitForObject(":List Tax Authorities.New_QPushButton");
    clickButton(":List Tax Authorities.New_QPushButton");
    waitForObject(":_code_XLineEdit_15");
    findObject(":_code_XLineEdit_15").clear();
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
    type(":_state_QLineEdit_3", "State1");
    type(":groupBox.Postal Code:_XLineEdit", "323525");
    type(":_country_QLineEdit_3", "United States");
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
    waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Codes...");
    activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Codes...");
        
    waitForObject(":List Tax Codes.New_QPushButton");
    clickButton(":List Tax Codes.New_QPushButton");
    waitForObject(":_code_XLineEdit_12");
    type(":_code_XLineEdit_12", "TAXAUTH1-GM");
    type(":_description_XLineEdit_23", "Tax Authority 1 General Merchandise");
    type(":Tax Code._main_XLineEdit","01-01-4050-01");
    waitForObject(":Tax Code._taxClass_XComboBox");
    clickItem(":Tax Code._taxClass_XComboBox","1-Legacy Class 1",1,0,0,Qt.LeftButton);
    waitForObject(":Tax Code._taxauth_XComboBox");
    clickItem(":Tax Code._taxauth_XComboBox","TAX-AUTH1",1,0,0,Qt.LeftButton);
    clickButton(":_frame.New_QPushButton_2");
    waitForObject(":_rateGroup._percent_XLineEdit");
    type(":_rateGroup._percent_XLineEdit", "10");
    clickButton(":Tax Code Rate.Save_QPushButton");
    waitForObject(":Tax Code.Save_QPushButton");
    clickButton(":Tax Code.Save_QPushButton");
    waitForObject(":List Tax Codes._tax_XTreeWidget");
    if(!clickItem(":List Tax Codes._tax_XTreeWidget", "TAXAUTH1-GM", 5, 5, 1, Qt.LeftButton))
         test.pass("Tax Code created:TAXAUTH1-GM");
    
    
    waitForObject(":List Tax Codes.New_QPushButton");
    clickButton(":List Tax Codes.New_QPushButton");
    waitForObject(":_code_XLineEdit_12");
    type(":_code_XLineEdit_12", "TAXAUTH1-EDU");
    type(":_description_XLineEdit_23", "Tax Authority 1 Educational Merchandise");
    type(":Tax Code._main_XLineEdit","01-01-4050-01");
    waitForObject(":Tax Code._taxClass_XComboBox");
    clickItem(":Tax Code._taxClass_XComboBox","1-Legacy Class 1",1,0,0,Qt.LeftButton);
    waitForObject(":Tax Code._taxauth_XComboBox");
    clickItem(":Tax Code._taxauth_XComboBox","TAX-AUTH1",1,0,0,Qt.LeftButton);
    clickButton(":_frame.New_QPushButton_2");
    waitForObject(":_rateGroup._percent_XLineEdit");
    type(":_rateGroup._percent_XLineEdit", "1");
    clickButton(":Tax Code Rate.Save_QPushButton");
    waitForObject(":Tax Code.Save_QPushButton");
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
    waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Types...");
    activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Types...");
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
 
    //----Define Tax Zones----
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Zones...");
    activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Zones...");
    
    waitForObject(":List Tax Zones.New_QPushButton_2");
    clickButton(":List Tax Zones.New_QPushButton_2");
    
    waitForObject(":_taxZone_XLineEdit_2");
    type(":_taxZone_XLineEdit_2", "TZONE1");
    type(":_description_XLineEdit_40", "Tax Zone1");
    waitForObject(":Tax Zone.Save_QPushButton");
    clickButton(":Tax Zone.Save_QPushButton");
    
    waitForObject(":List Tax Zones.Close_QPushButton_2");
    clickButton(":List Tax Zones.Close_QPushButton_2");
   
    
    //--------Tax Assignments-------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Assignments...");
    activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Assignments...");
   
    waitForObject(":_frame.New_QPushButton_4");
    clickButton(":_frame.New_QPushButton_4");
    waitForObject(":Tax Assignment._taxZone_XComboBox");
    clickItem(":Tax Assignment._taxZone_XComboBox", "TZONE1-Tax Zone1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":Tax Assignment._taxType_XComboBox");
    clickItem(":Tax Assignment._taxType_XComboBox", "EDU", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_frame._taxCodeOption_XTreeWidget_2");
    clickItem(":_frame._taxCodeOption_XTreeWidget_2", "TAXAUTH1-EDU", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_frame.Add->_QPushButton_2");
    clickButton(":_frame.Add->_QPushButton_2");
    waitForObject(":Tax Assignment.Close_QPushButton");
    clickButton(":Tax Assignment.Close_QPushButton");
    
    waitForObject(":_frame.New_QPushButton_4");
    clickButton(":_frame.New_QPushButton_4");
    waitForObject(":Tax Assignment._taxZone_XComboBox");
    clickItem(":Tax Assignment._taxZone_XComboBox", "TZONE1-Tax Zone1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":Tax Assignment._taxType_XComboBox");
    clickItem(":Tax Assignment._taxType_XComboBox", "GM", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_frame._taxCodeOption_XTreeWidget_2");
    clickItem(":_frame._taxCodeOption_XTreeWidget_2", "TAXAUTH1-GM", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_frame.Add->_QPushButton_2");
    clickButton(":_frame.Add->_QPushButton_2");    
    waitForObject(":Tax Assignment.Close_QPushButton");
    clickButton(":Tax Assignment.Close_QPushButton");
      
    waitForObject(":List Tax Assignments.Close_QPushButton_3");
    clickButton(":List Tax Assignments.Close_QPushButton_3");
  
    
    //----------Create: Tax Registrations--------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Registrations...");
    activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Registrations...");
  
    waitForObject(":List Tax Registrations.New_QPushButton_2");
    clickButton(":List Tax Registrations.New_QPushButton_2");
    
    waitForObject(":Tax Registration Information._taxZone_XComboBox");
    clickItem(":Tax Registration Information._taxZone_XComboBox", "TZONE1-Tax Zone1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Tax Registration Information._taxauth_XComboBox");
    clickItem(":Tax Registration Information._taxauth_XComboBox", "TAX-AUTH1", 5, 8, 1, Qt.LeftButton);
    waitForObject(":Tax Registration Information._number_QLineEdit");
    mouseClick(":Tax Registration Information._number_QLineEdit", 5, 5, 1, Qt.LeftButton);
   
    waitForObject(":Tax Registration Information._number_QLineEdit");
    type(":Tax Registration Information._number_QLineEdit", "tax reg1");
    waitForObject(":_frame._notes_XTextEdit_2");
    type(":_frame._notes_XTextEdit_2", "tax reg1");
    waitForObject(":Tax Registration Information.Save_QPushButton");
    clickButton(":Tax Registration Information.Save_QPushButton");
    waitForObject(":List Tax Registrations.Close_QPushButton_2");
    clickButton(":List Tax Registrations.Close_QPushButton_2");
 
  
}


//---------------exit Appl-----------------------
function exitAppl()
{
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit xTuple ERP...");
}







