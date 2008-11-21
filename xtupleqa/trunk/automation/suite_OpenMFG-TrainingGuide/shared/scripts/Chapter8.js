function executeChapter8()
{
//    //----------Create Customer Type------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
//    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "Types...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "Types...");
//    waitForObject(":List Customer Types.New_QPushButton");
//    clickButton(":List Customer Types.New_QPushButton");
//    waitForObject(":_code_XLineEdit_11");
//    type(":_code_XLineEdit_11", "NORMAL");
//    type(":_description_XLineEdit_21", "Normal Customer");
//    if(!findObject(":Customer Type.Enable Characteristics Profile_QGroupBox").checked)
//        type(":Customer Type.Enable Characteristics Profile_QGroupBox"," ");
//   
//    waitForObject(":Enable Characteristics Profile.New_QPushButton");
//    clickButton(":Enable Characteristics Profile.New_QPushButton");
//    waitForObject(":_char_XComboBox_3");
//    if(findObject(":_char_XComboBox_3").currentText!="SUPPORT-PLAN")
//        type(":_char_XComboBox_3", "SUPPORT");
//    type(":_value_XLineEdit_4", "Standard");
//    if(!findObject(":Customer Characteristic.Default_QCheckBox").checked)
//        clickButton(":Customer Characteristic.Default_QCheckBox");
//    clickButton(":Customer Characteristic.Save_QPushButton");
//    
//    waitForObject(":Enable Characteristics Profile.New_QPushButton");
//    clickButton(":Enable Characteristics Profile.New_QPushButton");
//    waitForObject(":_char_XComboBox_3");
//    if(findObject(":_char_XComboBox_3").currentText!="SUPPORT-PLAN")
//        type(":_char_XComboBox_3", "SUPPORT");
//    type(":_value_XLineEdit_4", "Complete");
//    if(findObject(":Customer Characteristic.Default_QCheckBox").checked)
//        clickButton(":Customer Characteristic.Default_QCheckBox");
//    clickButton(":Customer Characteristic.Save_QPushButton");
//    
//    waitForObject(":Enable Characteristics Profile.New_QPushButton");
//    clickButton(":Enable Characteristics Profile.New_QPushButton");
//    waitForObject(":_char_XComboBox_3");
//    if(findObject(":_char_XComboBox_3").currentText!="SUPPORT-PLAN")
//        type(":_char_XComboBox_3", "SUPPORT");
//    type(":_value_XLineEdit_4", "None");
//    if(findObject(":Customer Characteristic.Default_QCheckBox").checked)
//        clickButton(":Customer Characteristic.Default_QCheckBox");
//    clickButton(":Customer Characteristic.Save_QPushButton");
//       
//    waitForObject(":Customer Type.Save_QPushButton");
//    clickButton(":Customer Type.Save_QPushButton");
//    waitForObject(":List Customer Types.Close_QPushButton");
//    clickButton(":List Customer Types.Close_QPushButton");
//    test.log("Customer Type: NORMAL created");
//    
//    
//    
//    //---------------Create Sales Reps----------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Reps...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Reps...");
//    waitForObject(":List Sales Representatives.New_QPushButton");
//    clickButton(":List Sales Representatives.New_QPushButton");
//    waitForObject(":_number_XLineEdit_5");
//    type(":_number_XLineEdit_5", "1000");
//    type(":_name_XLineEdit_9", "Sam Masters");
//    type(":_commPrcnt_XLineEdit", "7.5");
//    waitForObject(":Sales Representative.Save_QPushButton");
//    clickButton(":Sales Representative.Save_QPushButton");
//    waitForObject(":List Sales Representatives.Close_QPushButton");
//    clickButton(":List Sales Representatives.Close_QPushButton");
//    test.log("Sales Rep: 1000 Sam Masters created");
//   
//    //---------------Create Shipping Zone--------------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Zones...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Zones...");
//    
//    waitForObject(":List Shipping Zones.New_QPushButton");
//    clickButton(":List Shipping Zones.New_QPushButton");
//    type(":_name_XLineEdit_10", "DOMESTIC1");
//    type(":_description_XLineEdit_22", "Domestic Shipping Zone 1");
//    waitForObject(":Shipping Zone.Save_QPushButton");
//    clickButton(":Shipping Zone.Save_QPushButton");
//    
//    waitForObject(":List Shipping Zones.New_QPushButton");
//    clickButton(":List Shipping Zones.New_QPushButton");
//    type(":_name_XLineEdit_10", "DOMESTIC2");
//    type(":_description_XLineEdit_22", "Domestic Shipping Zone 2");
//    waitForObject(":Shipping Zone.Save_QPushButton");
//    clickButton(":Shipping Zone.Save_QPushButton");
//    
//    waitForObject(":List Shipping Zones.New_QPushButton");
//    clickButton(":List Shipping Zones.New_QPushButton");
//    type(":_name_XLineEdit_10", "DOMESTIC3");
//    type(":_description_XLineEdit_22", "Domestic Shipping Zone 3");
//    waitForObject(":Shipping Zone.Save_QPushButton");
//    clickButton(":Shipping Zone.Save_QPushButton");
//    
//    waitForObject(":List Shipping Zones.New_QPushButton");
//    clickButton(":List Shipping Zones.New_QPushButton");
//    type(":_name_XLineEdit_10", "DOMESTIC4");
//    type(":_description_XLineEdit_22", "Domestic Shipping Zone 4");
//    waitForObject(":Shipping Zone.Save_QPushButton");
//    clickButton(":Shipping Zone.Save_QPushButton");
//    
//    
//    waitForObject(":List Shipping Zones.New_QPushButton");
//    clickButton(":List Shipping Zones.New_QPushButton");
//    type(":_name_XLineEdit_10", "DOMESTIC5");
//    type(":_description_XLineEdit_22", "Domestic Shipping Zone 5");
//    waitForObject(":Shipping Zone.Save_QPushButton");
//    clickButton(":Shipping Zone.Save_QPushButton");
//    
//    waitForObject(":List Shipping Zones.Close_QPushButton");
//    clickButton(":List Shipping Zones.Close_QPushButton");
//    test.log("Shipping Zones created");
//  
//    
//    //---------Create Shipping Vias---------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Ship Vias...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Ship Vias...");
//    
//    waitForObject(":List Ship Vias.New_QPushButton");
//    clickButton(":List Ship Vias.New_QPushButton");
//    waitForObject(":Ship Via._code_XLineEdit");
//    type(":Ship Via._code_XLineEdit", "UPS-GROUND");
//    type(":Ship Via._description_XLineEdit", "UPS Ground");
//    clickButton(":Ship Via.Save_QPushButton");
//    
//    waitForObject(":List Ship Vias.New_QPushButton");
//    clickButton(":List Ship Vias.New_QPushButton");
//    waitForObject(":Ship Via._code_XLineEdit");
//    type(":Ship Via._code_XLineEdit", "FEDEXGROUND");
//    type(":Ship Via._description_XLineEdit", "FedEx Ground");
//    clickButton(":Ship Via.Save_QPushButton");
//        
//    waitForObject(":List Ship Vias.Close_QPushButton");
//    clickButton(":List Ship Vias.Close_QPushButton");
//    test.log("Shipping Vias created");
//  
//  
//    //-----------Create Shipping Charges--------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Charge Types...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Charge Types...");
//    
//    waitForObject(":List Shipping Charge Types.New_QPushButton");
//    clickButton(":List Shipping Charge Types.New_QPushButton");
//    waitForObject(":Shipping Charge Type._name_XLineEdit");
//    type(":Shipping Charge Type._name_XLineEdit", "NOCHARGE");
//    type(":Shipping Charge Type._description_XLineEdit", "No Charge for Shipping");
//    if(findObject(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox").checked)
//    clickButton(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox");
//    waitForObject(":Shipping Charge Type.Save_QPushButton");
//    clickButton(":Shipping Charge Type.Save_QPushButton");
//
//    
//    waitForObject(":List Shipping Charge Types.New_QPushButton");
//    clickButton(":List Shipping Charge Types.New_QPushButton");
//    waitForObject(":Shipping Charge Type._name_XLineEdit");
//    type(":Shipping Charge Type._name_XLineEdit", "ADDCHARGE");
//    type(":Shipping Charge Type._description_XLineEdit", "Add Shipping Charges to Order");
//    if(!findObject(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox").checked)
//        clickButton(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox");
//    waitForObject(":Shipping Charge Type.Save_QPushButton");
//    clickButton(":Shipping Charge Type.Save_QPushButton");
//    
//    
//    waitForObject(":List Shipping Charge Types.Close_QPushButton");
//    clickButton(":List Shipping Charge Types.Close_QPushButton");
//    test.log("Shipping Charges Created");
//    
//    
//       
//    //---------------Define: Tax Codes-----------------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Tax Codes...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Tax Codes...");
//    waitForObject(":List Tax Codes.New_QPushButton");
//    clickButton(":List Tax Codes.New_QPushButton");
//    waitForObject(":_code_XLineEdit_12");
//    type(":_code_XLineEdit_12", "VATAX");
//    type(":_description_XLineEdit_23", "Virginia Sales Tax");
//    waitForObject(":_description_XLineEdit_23");
//    type(":_taxRateA_XLineEdit", "5.00");
//    type(":frame._main_XLineEdit", "01-01-2510-01");
//    type(":frame._main_XLineEdit", "<Tab>");
//    clickButton(":Tax Code.Save_QPushButton");
//    waitForObject(":List Tax Codes.Close_QPushButton");
//    clickButton(":List Tax Codes.Close_QPushButton");
//    test.log("Tax Codes defined");
//  
//  
//    //----------------Define: Shipping Forms---------------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Forms...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Forms...");
//   
//    waitForObject(":List Shipping Forms.New_QPushButton");
//    clickButton(":List Shipping Forms.New_QPushButton");
//    waitForObject(":_name_XLineEdit_11");
//    type(":_name_XLineEdit_11", "STANDARD-PACKING-LIST");
//    if(findObject(":_report_XComboBox").currentText!="PackingList");
//        type(":_report_XComboBox", "PackingList");
//    waitForObject(":Shipping Form.Save_QPushButton");
//    clickButton(":Shipping Form.Save_QPushButton");
//    
//    waitForObject(":List Shipping Forms.New_QPushButton");
//    clickButton(":List Shipping Forms.New_QPushButton");
//    waitForObject(":_name_XLineEdit_11");
//    type(":_name_XLineEdit_11", "INTRAN-PACKING-LIST");
//    if(findObject(":_report_XComboBox").currentText!="PackingList-Shipment");
//        type(":_report_XComboBox", "PackingList-Shipment");
//    waitForObject(":Shipping Form.Save_QPushButton");
//    clickButton(":Shipping Form.Save_QPushButton");
//    
//    waitForObject(":List Shipping Forms.Close_QPushButton");
//    clickButton(":List Shipping Forms.Close_QPushButton");
//    test.log("Shipping Forms defined");
//    
//    
//     //-----------Chart Of Accounts-------------------------------
//     waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
//     activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
//     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
//     activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
//     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
//     activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
//     
//     COA("01","01","4000","01","Revenue","Revenue","SI");
//     COA("01","01","4800","01","Discounts and Allowances","Revenue","SI");
//     COA("01","01","2445","01","Deferred Revenue","Liability","CL");
//     COA("01","01","1100","01","Accounts Receivable","Asset","CAS");
//       
//     waitForObject(":Chart of Accounts.Close_QPushButton_2");
//     clickButton(":Chart of Accounts.Close_QPushButton_2");
//     test.log("Chart of Account created");
//     
//     
//     //-------------Create Sales Category----------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Categories...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Categories...");
//    waitForObject(":List Sales Categories.New_QPushButton");
//    clickButton(":List Sales Categories.New_QPushButton");
//    waitForObject(":_category_XLineEdit_3");
//    type(":_category_XLineEdit_3", "NORMAL-SALE");
//    type(":_description_XLineEdit_24", "Normal Sale");
//    type(":Sales Category._main_XLineEdit", "01-01-4000-01");
//    type(":Sales Category._main_XLineEdit_2", "01-01-4800-01");
//    type(":Sales Category._main_XLineEdit_3", "01-01-1100-01");
//    clickButton(":Sales Category.Save_QPushButton");
//    waitForObject(":List Sales Categories.Close_QPushButton");
//    clickButton(":List Sales Categories.Close_QPushButton");
//    test.log("Sales Category: NORMAL-SALE created");
//    
//  
//    //-----------Chart Of Accounts-------------------------------
//     waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
//     activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
//     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
//     activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
//     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
//     activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
//     
//     COA("01","01","5000","01","Cost Of Goods Sold","Expense","COGS");
//     COA("01","01","4700","01","Returns","Revenue","SI");
//     COA("01","01","5710","01","Returned Goods","Expense","COGS");
//     COA("01","01","5720","01","Cost of Warranty","Expense","COGS");
//    
//     waitForObject(":Chart of Accounts.Close_QPushButton_2");
//     clickButton(":Chart of Accounts.Close_QPushButton_2");
//     test.log("Chart of Account created");
     
     
         //----------------A/R Account Assignments----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "A/R Account Assignments...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "A/R Account Assignments...");
    
    waitForObject(":List A/R Account Assignments.New_QPushButton");
    clickButton(":List A/R Account Assignments.New_QPushButton");
    waitForObject(":_customerTypeGroup.Selected Customer Type:_QRadioButton");
    clickButton(":_customerTypeGroup.Selected Customer Type:_QRadioButton");
    if(findObject(":_customerTypeGroup._customerTypes_XComboBox", "NORMAL-Normal Customer").currentText!="NORMAL-Normal Customer")
    type(":_customerTypeGroup._customerTypes_XComboBox", "NORMAL");
    type(":A/R Account Assignment._main_XLineEdit", "01-01-1100-01");
    type(":A/R Account Assignment._main_XLineEdit_2", "01-01-4800-01");
    type(":A/R Account Assignment._main_XLineEdit_3", "01-01-4060-01");
    type(":A/R Account Assignment._main_XLineEdit_4", "01-01-2445-01");
    type(":A/R Account Assignment._main_XLineEdit_4", "<Tab>");
    
    clickButton(":A/R Account Assignment.Save_QPushButton");
    waitForObject(":List A/R Account Assignments.Close_QPushButton");
    clickButton(":List A/R Account Assignments.Close_QPushButton");
    test.log("A/R Accounts Assigned");
    
    
    
    //----------------Customer Form Assignments--------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Customer Form Assignments...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Customer Form Assignments...");
    
    waitForObject(":List Customer Form Assignments.New_QPushButton");
    clickButton(":List Customer Form Assignments.New_QPushButton");
    waitForObject(":_customerTypeGroup.Selected Customer Type:_QRadioButton_2");
    clickButton(":_customerTypeGroup.Selected Customer Type:_QRadioButton_2");
    if(findObject(":_customerTypeGroup._customerTypes_XComboBox_2").currentText!="NORMAL-Normal Customer")
        type(":_customerTypeGroup._customerTypes_XComboBox_2", "NORMAL");
    type(":_invoiceForm_QComboBoxListView", "Invoice");
    type(":Customer Form Assignment._creditMemoForm_XComboBox", "CreditMemo");
    type(":_statementForm_QComboBoxListView", "Statement");
    type(":_quoteForm_QComboBoxListView", "Quote");
    type(":_packingListForm_QComboBoxListView", "PackingList");
    type(":Customer Form Assignment._soPickListForm_XComboBox", "PickingListSONoClosedLines");
    clickButton(":Customer Form Assignment.Save_QPushButton");
    waitForObject(":List Customer Form Assignments.Close_QPushButton");
    clickButton(":List Customer Form Assignments.Close_QPushButton");
    test.log("Customer Form Assigned");
    
    
    
    
    //--------------Define Forms--------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Forms...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Forms...");
    waitForObject(":List Forms.New_QPushButton");
    clickButton(":List Forms.New_QPushButton");
    type(":_name_XLineEdit_12", "SO-Acknowledge");
    type(":Form._descrip_XLineEdit", "Sales Order Acknowledgement Form");
    if(findObject(":_report_XComboBox_2").currentText!="PickingListSOClosedLines")
        type(":_report_XComboBox_2", "PickingListSOClosedLines");
    if(findObject(":Form._key_XComboBox").currentText!="Sales Orders")
        type(":Form._key_XComboBox", "Sales");
    waitForObject(":Form.Save_QPushButton");
    clickButton(":Form.Save_QPushButton");
    waitForObject(":List Forms.Close_QPushButton");
    clickButton(":List Forms.Close_QPushButton");
    test.log("System: Forms defined");
    
    
    
    
}