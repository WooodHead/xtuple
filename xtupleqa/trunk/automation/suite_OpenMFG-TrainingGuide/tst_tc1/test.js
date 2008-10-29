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
    
//-----------Assign All Privileges to the Admin User-----------------------
    
   
    type(":_username_QLineEdit", user);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", pwd);
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
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
    
    //--------Rescan Privileges----------------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Rescan Privileges");
    
    
    
    
    
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
    
    
    
    
    
    
    
    //---------------exit Appl-----------------------
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit OpenMFG...");


}