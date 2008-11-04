//-***-This script doc contains all the common code libraries/functions required by the Main driver script-***-



//--------Login into Appl----------
function loginAppl(usr)
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
       if(user==usr) break;
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
    waitForObject(":List Departments.Close_QPushButton");
    clickButton(":List Departments.Close_QPushButton");
    test.log("New Department:"+ DeptNum + " created");
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
    waitForObject(":List Shifts.Close_QPushButton");
    clickButton(":List Shifts.Close_QPushButton");
    test.log("New Shift: "+ ShiftNum +" created");
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
    test.log("New Locale:'"+LocaleCode+"' created ");

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
    test.log("New Group: '"+GrpName+"' created");

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
    
    //-----Add the User created to the testdata file: login.txt-------------
    test.log("working directory :" +OS.cwd());
    if(!File.exists("..//shared//testdata//login.txt"))
        test.Fail("login.txt file doesnt exists in the path - ..//shared//testdata//login.txt");
    var f = File.open("..//shared//testdata//login.txt","a");
    f.write("\n121.241.172.21\t1empty310\t5432\t3.1.0\t"+user_created+"\tmfgapp");
    f.close();
    test.log("login credentials updated to testdata: login.txt");
    
    
    
}



    
//--------------Accounting-Account-Companies-New---------------------
function createComp(CompNum, CompDesc)
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
    waitForObject(":List Companies.Close_QPushButton");
    clickButton(":List Companies.Close_QPushButton");
    test.log("Company: "+CompDesc+" created");
}

//------------Create Chart of Accounts-------------------
function COA(COACompany,COAProfit,COANumber,COASub,COADesc,COAType,COASubType)
{

    waitForObject(":Chart of Accounts.New_QPushButton");
    clickButton(":Chart of Accounts.New_QPushButton");
    waitForObject(":Chart of Accounts._company_XComboBox");
    if(findObject(":Chart of Accounts._company_XComboBox").currentText!=COACompany)
        type(":Chart of Accounts._company_XComboBox","01");
    if(findObject(":Chart of Accounts._profit_XComboBox").currentText!=COAProfit)
        type(":Chart of Accounts._profit_XComboBox","01");
    if(findObject(":Chart of Accounts._sub_XComboBox").currentText!=COASub)
        type(":Chart of Accounts._sub_XComboBox","01");
    waitForObject(":_number_XLineEdit_2");
    type(":_number_XLineEdit_2", COANumber);
    waitForObject(":_description_XLineEdit_3");
    type(":_description_XLineEdit_3", COADesc);
    waitForObject(":_description_XLineEdit_3");
    type(":_description_XLineEdit_3", "<Tab>");
    waitForObject(":_extReference_XLineEdit");
    type(":_extReference_XLineEdit", COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub);
    type(":Chart of Accounts._type_XComboBox",COAType);
    type(":Chart of Accounts._subType_XComboBox",COASubType);
    waitForObject(":Chart of Accounts.Save_QPushButton");
    clickButton(":Chart of Accounts.Save_QPushButton");
    test.log("Acc: "+COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub+" created");

}


//---------------exit Appl-----------------------
function exitAppl()
{
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit OpenMFG...");
}







