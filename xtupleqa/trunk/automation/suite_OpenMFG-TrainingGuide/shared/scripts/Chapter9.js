function executeChapter9()
{
    //--------------Define: Check Formats-------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Check Formats...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Check Formats...");
    waitForObject(":List Check Formats.New_QPushButton");
    clickButton(":List Check Formats.New_QPushButton");
    waitForObject(":_name_XLineEdit_17");
    type(":_name_XLineEdit_17", "GENERIC-CHECK");
    type(":Check Format._descrip_XLineEdit", "Generic Check Format");
    if(findObject(":_report_XComboBox_3").currentText!="APCheck")
        type(":_report_XComboBox_3", "APCheck");
    clickButton(":Check Format.Save_QPushButton");
    waitForObject(":List Check Formats.Close_QPushButton");
    clickButton(":List Check Formats.Close_QPushButton");
    test.log("Defined Check Formats");
 
    
     //-----------Chart Of Accounts-------------------------------
     waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
     activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
     activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
     activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
     
     COA("01","01","1000","01","Cash at eBank","Asset","CA"); 
     COA("01","01","1010","01","Cash at EuroBank","Asset","CA"); 
     COA("01","01","6750","01","Finance Fees and Expenses","Expense","EXP"); 
     COA("01","01","1500","01","Fixed Assets","Asset","FA");
     COA("01","01","6400","01","Depreciation Expense","Expense","DXP");
     COA("01","01","3010","01","Paid-In Capital","Equity","EDC");
     
     waitForObject(":Chart of Accounts.Close_QPushButton_2");
//     clickButton(":Chart of Accounts.Close_QPushButton_2");
     
     
     
    
    //---------------Define: Bank Accounts------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Bank Accounts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Bank Accounts...");
    
    waitForObject(":List Bank Accounts.New_QPushButton");
    clickButton(":List Bank Accounts.New_QPushButton");
    waitForObject(":_name_XLineEdit_18");
    type(":_name_XLineEdit_18", "EBANK");
    type(":_description_XLineEdit_27", "eBank Checking Account");
    type(":_bankName_XLineEdit", "eBank");
    type(":_accountNumber_XLineEdit_2", "123456");
     if(!findObject(":_currency_XComboBox").currentText!= "USD -$");
        type(":_currency_XComboBox","USD");
    waitForObjectItem(":_type_XComboBox", "Checking");
    if(findObject(":_type_XComboBox").currentText!="Checking")
        type(":Bank Account._bankGroup_QGroupBox","Checking");
    if(!findObject(":_useGroup.Used in Accounts Payable_QCheckBox").checked)
        clickButton(":_useGroup.Used in Accounts Payable_QCheckBox");
    type(":_useGroup._nextCheckNum_XLineEdit", "3000");
    if(!findObject(":_type_XComboBox")!= "GENERIC-CHECK")
        type(":_type_XComboBox", "GENERIC");
    if(!findObject(":_useGroup.Used in Accounts Receivable_QCheckBox").checked)
        clickButton(":_useGroup.Used in Accounts Receivable_QCheckBox");
    type(":_accountGroup._main_XLineEdit", "01-01-1000-01");
    clickButton(":Bank Account.Save_QPushButton");
    test.log("Bank Account: EBANK defined");
    
    waitForObject(":List Bank Accounts.New_QPushButton");
    clickButton(":List Bank Accounts.New_QPushButton");
    waitForObject(":_name_XLineEdit_18");
    type(":_name_XLineEdit_18", "EURBANK");
    type(":_description_XLineEdit_27", "Euro Bank Checking");
    type(":_bankName_XLineEdit", "Euro Bank");
    type(":_accountNumber_XLineEdit_2", "654321");
    if(!findObject(":_currency_XComboBox").currentText!= "EUR -EUR");
        type(":_currency_XComboBox","EUR");
    if(findObject(":_type_XComboBox").currentText!="Checking")
        type(":Bank Account._bankGroup_QGroupBox","Checking");
    if(!findObject(":_useGroup.Used in Accounts Payable_QCheckBox").checked)
        clickButton(":_useGroup.Used in Accounts Payable_QCheckBox");
    type(":_useGroup._nextCheckNum_XLineEdit", "9000");
    if(!findObject(":_type_XComboBox")!= "GENERIC-CHECK")
        type(":_type_XComboBox", "GENERIC");
    if(!findObject(":_useGroup.Used in Accounts Receivable_QCheckBox").checked)
        clickButton(":_useGroup.Used in Accounts Receivable_QCheckBox");
    type(":_accountGroup._main_XLineEdit", "01-01-1010-01");
    clickButton(":Bank Account.Save_QPushButton");
    waitForObject(":List Bank Accounts.Close_QPushButton");
    clickButton(":List Bank Accounts.Close_QPushButton");
    test.log("Bank Account: EURBANK defined"); 
}