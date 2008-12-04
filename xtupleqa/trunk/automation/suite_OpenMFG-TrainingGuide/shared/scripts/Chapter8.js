function executeChapter8()
{
    //----------Create Customer Type------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "Types...");
    activateItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "Types...");
    waitForObject(":List Customer Types.New_QPushButton");
    clickButton(":List Customer Types.New_QPushButton");
    waitForObject(":_code_XLineEdit_11");
    type(":_code_XLineEdit_11", "NORMAL");
    type(":_description_XLineEdit_21", "Normal Customer");
    if(!findObject(":Customer Type.Enable Characteristics Profile_QGroupBox").checked)
        type(":Customer Type.Enable Characteristics Profile_QGroupBox"," ");
   
    waitForObject(":Enable Characteristics Profile.New_QPushButton");
    clickButton(":Enable Characteristics Profile.New_QPushButton");
    waitForObject(":_char_XComboBox_3");
    if(findObject(":_char_XComboBox_3").currentText!="SUPPORT-PLAN")
        type(":_char_XComboBox_3", "SUPPORT");
    type(":_value_XLineEdit_4", "Standard");
    if(!findObject(":Customer Characteristic.Default_QCheckBox").checked)
        clickButton(":Customer Characteristic.Default_QCheckBox");
    clickButton(":Customer Characteristic.Save_QPushButton");
    
    waitForObject(":Enable Characteristics Profile.New_QPushButton");
    clickButton(":Enable Characteristics Profile.New_QPushButton");
    waitForObject(":_char_XComboBox_3");
    if(findObject(":_char_XComboBox_3").currentText!="SUPPORT-PLAN")
        type(":_char_XComboBox_3", "SUPPORT");
    type(":_value_XLineEdit_4", "Complete");
    if(findObject(":Customer Characteristic.Default_QCheckBox").checked)
        clickButton(":Customer Characteristic.Default_QCheckBox");
    clickButton(":Customer Characteristic.Save_QPushButton");
    
    waitForObject(":Enable Characteristics Profile.New_QPushButton");
    clickButton(":Enable Characteristics Profile.New_QPushButton");
    waitForObject(":_char_XComboBox_3");
    if(findObject(":_char_XComboBox_3").currentText!="SUPPORT-PLAN")
        type(":_char_XComboBox_3", "SUPPORT");
    type(":_value_XLineEdit_4", "None");
    if(findObject(":Customer Characteristic.Default_QCheckBox").checked)
        clickButton(":Customer Characteristic.Default_QCheckBox");
    clickButton(":Customer Characteristic.Save_QPushButton");
       
    waitForObject(":Customer Type.Save_QPushButton");
    clickButton(":Customer Type.Save_QPushButton");
    waitForObject(":List Customer Types._custtype_XTreeWidget");
    if(!clickItem(":List Customer Types._custtype_XTreeWidget", "NORMAL", 5, 5, 1, Qt.LeftButton))
        test.pass("Customer Type created: NORMAL");
     
    waitForObject(":List Customer Types.Close_QPushButton");
    clickButton(":List Customer Types.Close_QPushButton");
     
    
    //---------------Create Sales Reps----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Reps...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Reps...");
    waitForObject(":List Sales Representatives.New_QPushButton");
    clickButton(":List Sales Representatives.New_QPushButton");
    waitForObject(":_number_XLineEdit_5");
    type(":_number_XLineEdit_5", "1000");
    type(":_name_XLineEdit_9", "Sam Masters");
    type(":_commPrcnt_XLineEdit", "7.5");
    waitForObject(":Sales Representative.Save_QPushButton");
    clickButton(":Sales Representative.Save_QPushButton");
    waitForObject(":List Sales Representatives._salesrep_XTreeWidget");
    if(!clickItem(":List Sales Representatives._salesrep_XTreeWidget", "1000", 5, 5, 1, Qt.LeftButton))
        test.pass("Customer Type created: NORMAL");
    
    waitForObject(":List Sales Representatives.Close_QPushButton");
    clickButton(":List Sales Representatives.Close_QPushButton");
   
   
    //---------------Create Shipping Zone--------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Zones...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Zones...");
    
    waitForObject(":List Shipping Zones.New_QPushButton");
    clickButton(":List Shipping Zones.New_QPushButton");
    type(":_name_XLineEdit_10", "DOMESTIC1");
    type(":_description_XLineEdit_22", "Domestic Shipping Zone 1");
    waitForObject(":Shipping Zone.Save_QPushButton");
    clickButton(":Shipping Zone.Save_QPushButton");
    waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
    if(!clickItem(":List Shipping Zones._shipzone_XTreeWidget", "DOMESTIC1", 5, 5, 1, Qt.LeftButton))
        test.pass("Shipping Zone created: DOMESTIC1");
    
    
    waitForObject(":List Shipping Zones.New_QPushButton");
    clickButton(":List Shipping Zones.New_QPushButton");
    type(":_name_XLineEdit_10", "DOMESTIC2");
    type(":_description_XLineEdit_22", "Domestic Shipping Zone 2");
    waitForObject(":Shipping Zone.Save_QPushButton");
    clickButton(":Shipping Zone.Save_QPushButton");
    waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
    if(!clickItem(":List Shipping Zones._shipzone_XTreeWidget", "DOMESTIC2", 5, 5, 1, Qt.LeftButton))
        test.pass("Shipping Zone created: DOMESTIC2");
    
    
    waitForObject(":List Shipping Zones.New_QPushButton");
    clickButton(":List Shipping Zones.New_QPushButton");
    type(":_name_XLineEdit_10", "DOMESTIC3");
    type(":_description_XLineEdit_22", "Domestic Shipping Zone 3");
    waitForObject(":Shipping Zone.Save_QPushButton");
    clickButton(":Shipping Zone.Save_QPushButton");
    waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
    if(!clickItem(":List Shipping Zones._shipzone_XTreeWidget", "DOMESTIC3", 5, 5, 1, Qt.LeftButton))
        test.pass("Shipping Zone created: DOMESTIC3");
    
    
    waitForObject(":List Shipping Zones.New_QPushButton");
    clickButton(":List Shipping Zones.New_QPushButton");
    type(":_name_XLineEdit_10", "DOMESTIC4");
    type(":_description_XLineEdit_22", "Domestic Shipping Zone 4");
    waitForObject(":Shipping Zone.Save_QPushButton");
    clickButton(":Shipping Zone.Save_QPushButton");
    waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
    if(!clickItem(":List Shipping Zones._shipzone_XTreeWidget", "DOMESTIC4", 5, 5, 1, Qt.LeftButton))
        test.pass("Shipping Zone created: DOMESTIC4");
    
    
    
    waitForObject(":List Shipping Zones.New_QPushButton");
    clickButton(":List Shipping Zones.New_QPushButton");
    type(":_name_XLineEdit_10", "DOMESTIC5");
    type(":_description_XLineEdit_22", "Domestic Shipping Zone 5");
    waitForObject(":Shipping Zone.Save_QPushButton");
    clickButton(":Shipping Zone.Save_QPushButton");
    waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
    if(!clickItem(":List Shipping Zones._shipzone_XTreeWidget", "DOMESTIC5", 5, 5, 1, Qt.LeftButton))
        test.pass("Shipping Zone created: DOMESTIC5");
    
    waitForObject(":List Shipping Zones.Close_QPushButton");
    clickButton(":List Shipping Zones.Close_QPushButton");

  
    
    //---------Create Shipping Vias---------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Ship Vias...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Ship Vias...");
    
    waitForObject(":List Ship Vias.New_QPushButton");
    clickButton(":List Ship Vias.New_QPushButton");
    waitForObject(":Ship Via._code_XLineEdit");
    type(":Ship Via._code_XLineEdit", "UPS-GROUND");
    type(":Ship Via._description_XLineEdit", "UPS Ground");
    clickButton(":Ship Via.Save_QPushButton");
    waitForObject(":List Ship Vias._shipvia_XTreeWidget");
    if(!clickItem(":List Ship Vias._shipvia_XTreeWidget", "UPS-GROUND", 5, 5, 1, Qt.LeftButton))
        test.pass("Shipping Vias created: UPS-GROUND");
    
    
    waitForObject(":List Ship Vias.New_QPushButton");
    clickButton(":List Ship Vias.New_QPushButton");
    waitForObject(":Ship Via._code_XLineEdit");
    type(":Ship Via._code_XLineEdit", "FEDEXGROUND");
    type(":Ship Via._description_XLineEdit", "FedEx Ground");
    clickButton(":Ship Via.Save_QPushButton");
    waitForObject(":List Ship Vias._shipvia_XTreeWidget");
    if(!clickItem(":List Ship Vias._shipvia_XTreeWidget", "FEDEXGROUND", 5, 5, 1, Qt.LeftButton))
        test.pass("Shipping Vias created: FEDEXGROUND");
    
    waitForObject(":List Ship Vias.Close_QPushButton");
    clickButton(":List Ship Vias.Close_QPushButton");
      
  
    //-----------Create Shipping Charges--------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Charge Types...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Charge Types...");
    
    waitForObject(":List Shipping Charge Types.New_QPushButton");
    clickButton(":List Shipping Charge Types.New_QPushButton");
    waitForObject(":Shipping Charge Type._name_XLineEdit");
    type(":Shipping Charge Type._name_XLineEdit", "NOCHARGE");
    type(":Shipping Charge Type._description_XLineEdit", "No Charge for Shipping");
    if(findObject(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox").checked)
    clickButton(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox");
    waitForObject(":Shipping Charge Type.Save_QPushButton");
    clickButton(":Shipping Charge Type.Save_QPushButton");
    waitForObject(":List Shipping Charge Types._shipchrg_XTreeWidget");
    if(!clickItem(":List Shipping Charge Types._shipchrg_XTreeWidget", "NOCHARGE", 5, 5, 1, Qt.LeftButton))
        test.pass("Shipping Charges Types created: NOCHARGE");

    
    waitForObject(":List Shipping Charge Types.New_QPushButton");
    clickButton(":List Shipping Charge Types.New_QPushButton");
    waitForObject(":Shipping Charge Type._name_XLineEdit");
    type(":Shipping Charge Type._name_XLineEdit", "ADDCHARGE");
    type(":Shipping Charge Type._description_XLineEdit", "Add Shipping Charges to Order");
    if(!findObject(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox").checked)
        clickButton(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox");
    waitForObject(":Shipping Charge Type.Save_QPushButton");
    clickButton(":Shipping Charge Type.Save_QPushButton");
    waitForObject(":List Shipping Charge Types._shipchrg_XTreeWidget");
    if(!clickItem(":List Shipping Charge Types._shipchrg_XTreeWidget", "ADDCHARGE", 5, 5, 1, Qt.LeftButton))
        test.pass("Shipping Charges Types created: ADDCHARGE");
 
    waitForObject(":List Shipping Charge Types.Close_QPushButton");
    clickButton(":List Shipping Charge Types.Close_QPushButton");

       
    //---------------Define: Tax Codes-----------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Tax Codes...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Tax Codes...");
    waitForObject(":List Tax Codes.New_QPushButton");
    clickButton(":List Tax Codes.New_QPushButton");
    waitForObject(":_code_XLineEdit_12");
    type(":_code_XLineEdit_12", "VATAX");
    type(":_description_XLineEdit_23", "Virginia Sales Tax");
    waitForObject(":_description_XLineEdit_23");
    type(":_taxRateA_XLineEdit", "5.00");
    type(":frame._main_XLineEdit", "01-01-2510-01");
    type(":frame._main_XLineEdit", "<Tab>");
    clickButton(":Tax Code.Save_QPushButton");
    waitForObject(":List Tax Codes._tax_XTreeWidget");
    if(!clickItem(":List Tax Codes._tax_XTreeWidget", "TAXAUTH1-EDU", 5, 5, 1, Qt.LeftButton))
        test.pass("Tax Codes created: TAXAUTH1-EDU");
    
    waitForObject(":List Tax Codes.Close_QPushButton");
    clickButton(":List Tax Codes.Close_QPushButton");
 
  
  
    //----------------Define: Shipping Forms---------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Forms...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Forms...");
   
    waitForObject(":List Shipping Forms.New_QPushButton");
    clickButton(":List Shipping Forms.New_QPushButton");
    waitForObject(":_name_XLineEdit_11");
    type(":_name_XLineEdit_11", "STANDARD-PACKING-LIST");
    if(findObject(":_report_XComboBox").currentText!="PackingList");
        type(":_report_XComboBox", "PackingList");
    waitForObject(":Shipping Form.Save_QPushButton");
    clickButton(":Shipping Form.Save_QPushButton");
    waitForObject(":List Shipping Forms._bolformat_XTreeWidget");
    if(!clickItem(":List Shipping Forms._bolformat_XTreeWidget", "STANDARD-PACKING-LIST", 97, 3, 1, Qt.LeftButton))
        test.pass("Shipping Forms created: STANDARD-PACKING-LIST");
    
    
    waitForObject(":List Shipping Forms.New_QPushButton");
    clickButton(":List Shipping Forms.New_QPushButton");
    waitForObject(":_name_XLineEdit_11");
    type(":_name_XLineEdit_11", "INTRAN-PACKING-LIST");
    if(findObject(":_report_XComboBox").currentText!="PackingList-Shipment");
        type(":_report_XComboBox", "PackingList-Shipment");
    waitForObject(":Shipping Form.Save_QPushButton");
    clickButton(":Shipping Form.Save_QPushButton");
    
    waitForObject(":List Shipping Forms._bolformat_XTreeWidget");
    if(!clickItem(":List Shipping Forms._bolformat_XTreeWidget", "INTRAN-PACKING-LIST", 97, 3, 1, Qt.LeftButton))
        test.pass("Shipping Forms created: INTRAN-PACKING-LIST");

    
    waitForObject(":List Shipping Forms.Close_QPushButton");
    clickButton(":List Shipping Forms.Close_QPushButton");
    test.log("Shipping Forms defined");
    
    
     //-----------Chart Of Accounts-------------------------------
     waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
     activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
     activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
     activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
     
     COA("01","01","4000","01","Revenue","Revenue","SI");
     if(!clickItem(":_account_XTreeWidget_2", "Revenue", 5,5, 1, Qt.LeftButton))
        test.pass("COA created: Revenue");
        
     COA("01","01","4800","01","Discounts and Allowances","Revenue","SI");
     if(!clickItem(":_account_XTreeWidget_2", "Discounts and Allowances", 5,5, 1, Qt.LeftButton))
        test.pass("COA created: Discounts and Allowances");

     COA("01","01","2445","01","Deferred Revenue","Liability","CL");
     if(!clickItem(":_account_XTreeWidget_2", "Deferred Revenue", 5,5, 1, Qt.LeftButton))
        test.pass("COA created: Deferred Revenue");
     
     COA("01","01","1100","01","Accounts Receivable","Asset","CAS");
     if(!clickItem(":_account_XTreeWidget_2", "Accounts Receivable", 5,5, 1, Qt.LeftButton))
        test.pass("COA created: Accounts Receivable");
     
     waitForObject(":Chart of Accounts.Close_QPushButton_2");
     clickButton(":Chart of Accounts.Close_QPushButton_2");
   
     
     
     //-------------Create Sales Category----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Categories...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Categories...");
    waitForObject(":List Sales Categories.New_QPushButton");
    clickButton(":List Sales Categories.New_QPushButton");
    waitForObject(":_category_XLineEdit_3");
    type(":_category_XLineEdit_3", "NORMAL-SALE");
    type(":_description_XLineEdit_24", "Normal Sale");
    type(":Sales Category._main_XLineEdit", "01-01-4000-01");
    type(":Sales Category._main_XLineEdit_2", "01-01-4800-01");
    type(":Sales Category._main_XLineEdit_3", "01-01-1100-01");
    clickButton(":Sales Category.Save_QPushButton");
    waitForObject(":List Sales Categories._salescat_XTreeWidget");
    if(!clickItem(":List Sales Categories._salescat_XTreeWidget", "NORMAL-SALE", 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Category created: NORMAL-SALE");
    
    waitForObject(":List Sales Categories.Close_QPushButton");
    clickButton(":List Sales Categories.Close_QPushButton");
   
    
  
    //-----------Chart Of Accounts-------------------------------
     waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
     activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
     activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
     waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
     activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
     
     COA("01","01","5000","01","Cost Of Goods Sold","Expense","COGS");
     if(!clickItem(":_account_XTreeWidget_2", "Cost Of Goods Sold", 5,5, 1, Qt.LeftButton))
        test.pass("COA created: Cost Of Goods Sold");
     
     COA("01","01","4700","01","Returns","Revenue","SI");
     if(!clickItem(":_account_XTreeWidget_2", "Returns", 5,5, 1, Qt.LeftButton))
        test.pass("COA created: Returns");
     
     COA("01","01","5710","01","Returned Goods","Expense","COGS");
     if(!clickItem(":_account_XTreeWidget_2", "Returned Goods", 5,5, 1, Qt.LeftButton))
        test.pass("COA created: Returned Goods");
     
     COA("01","01","5720","01","Cost of Warranty","Expense","COGS");
     if(!clickItem(":_account_XTreeWidget_2", "Cost of Warranty", 5,5, 1, Qt.LeftButton))
        test.pass("COA created: Cost of Warranty");
 
     waitForObject(":Chart of Accounts.Close_QPushButton_2");
     clickButton(":Chart of Accounts.Close_QPushButton_2");
  
   
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
    if(findObject(":_customerTypeGroup._customerTypes_XComboBox").currentText!="NORMAL-Normal Customer")
    type(":_customerTypeGroup._customerTypes_XComboBox", "NORMAL");
    type(":A/R Account Assignment._main_XLineEdit", "01-01-1100-01");
    type(":A/R Account Assignment._main_XLineEdit_2", "01-01-4800-01");
    type(":A/R Account Assignment._main_XLineEdit_3", "01-01-4060-01");
    type(":A/R Account Assignment._main_XLineEdit_4", "01-01-2445-01");
    type(":A/R Account Assignment._main_XLineEdit_4", "<Tab>");
    
    clickButton(":A/R Account Assignment.Save_QPushButton");
    waitForObject(":List A/R Account Assignments._araccnt_XTreeWidget");
    if(!clickItem(":List A/R Account Assignments._araccnt_XTreeWidget", "NORMAL", 5, 5, 1, Qt.LeftButton))
       test.pass("A/R Accounts Assignments done");
    
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
    type(":Customer Form Assignment._invoiceForm_XComboBox", "Invoice");
    type(":Customer Form Assignment._creditMemoForm_XComboBox", "CreditMemo");
    type(":Customer Form Assignment._statementForm_XComboBox", "Statement");
    type(":Customer Form Assignment._quoteForm_XComboBox", "Quote");
    type(":Customer Form Assignment._packingListForm_XComboBox", "PackingList");
    type(":Customer Form Assignment._soPickListForm_XComboBox", "PickingListSONoClosedLines");
    clickButton(":Customer Form Assignment.Save_QPushButton");
    waitForObject(":List Customer Form Assignments._custform_XTreeWidget");
    if(!clickItem(":List Customer Form Assignments._custform_XTreeWidget", "Invoice", 5, 5, 1, Qt.LeftButton))
       test.pass("Customer Form Assignments done");
    
    waitForObject(":List Customer Form Assignments.Close_QPushButton");
    clickButton(":List Customer Form Assignments.Close_QPushButton");
    
    
    
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
    waitForObject(":List Forms._form_XTreeWidget");
    if(!clickItem(":List Forms._form_XTreeWidget", "SO-Acknowledge", 5, 5, 1, Qt.LeftButton))
        test.pass("Form Created: SO-Acknowledge");
     
    waitForObject(":List Forms.Close_QPushButton");
    clickButton(":List Forms.Close_QPushButton");
    test.log("System: Forms defined");
    
    
    //------------Configure Sales Module------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Sales...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Sales...");
    waitForObject(":Sales Configuration._orderNumGeneration_QComboBox");
    if(findObject(":Sales Configuration._orderNumGeneration_QComboBox").currentText!="Automatic");
       type(":Sales Configuration._orderNumGeneration_QComboBox", "Automatic");
    type(":Sales Configuration._nextSoNumber_XLineEdit", "50000");
    type(":Sales Configuration._nextQuNumber_XLineEdit", "40000");
    if(findObject(":Sales Configuration._returnAuthorizationNumGeneration_QComboBox").currentText!="Automatic, Use R/A #’s");
       type(":Sales Configuration._returnAuthorizationNumGeneration_QComboBox", "Automatic,");
    type(":Sales Configuration._nextRaNumber_XLineEdit", "80000");
    if(findObject(":Sales Configuration._creditMemoNumGeneration_QComboBox").currentText!="Automatic, Use C/M #'s")
        type(":Sales Configuration._creditMemoNumGeneration_QComboBox", "Automatic,");
    type(":Sales Configuration._nextCmNumber_XLineEdit", "70000");
    type(":Sales Configuration._nextInNumber_XLineEdit", "60000");
    if(!findObject(":Credit Control.Automatically Allocate Credit Memos to New Sales Order on Save_QCheckBox").checked)		clickButton(":Credit Control.Automatically Allocate Credit Memos to New Sales Order on Save_QCheckBox");
    if(!findObject(":general.Check Print Sales Order on Save by Default_QCheckBox").checked)
        clickButton(":general.Check Print Sales Order on Save by Default_QCheckBox");
    if(!findObject(":Date Control.Enable Promise Dates_QCheckBox").checked)
        clickButton(":Date Control.Enable Promise Dates_QCheckBox");
    clickButton(":Pricing on Line Item Edits.Prompt before Updating Price_QRadioButton");
    clickTab(":Sales Configuration.qt_tabwidget_tabbar_QTabBar", "Invoice");
    waitForObject(":Invoice Date Source.Shipped Date_QRadioButton");
    clickButton(":Invoice Date Source.Shipped Date_QRadioButton");
    clickTab(":Sales Configuration.qt_tabwidget_tabbar_QTabBar", "Customer Defaults");
    waitForObject(":groupBox_6._creditLimit_XLineEdit");
    type(":groupBox_6._creditLimit_XLineEdit", "20000");
    clickTab(":Sales Configuration.qt_tabwidget_tabbar_QTabBar", "Returns");
    waitForObject(":_returns.Enable Return Authorizations_QGroupBox");
    if(!findObject(":_returns.Enable Return Authorizations_QGroupBox").checked)
        type(":_returns.Enable Return Authorizations_QGroupBox"," ");
    if(!findObject(":Enable Return Authorizations.Post Return Authorization Changes to the Change Log_QCheckBox").checked)
        clickButton(":Enable Return Authorizations.Post Return Authorization Changes to the Change Log_QCheckBox");
    if(findObject(":Enable Return Authorizations._disposition_XComboBox").currentText!="Return")
        type(":Enable Return Authorizations._disposition_XComboBox", "Return");
    if(findObject(":Enable Return Authorizations._timing_XComboBox").currentText!="Upon Receipt")
        type(":Enable Return Authorizations._timing_XComboBox", "Upon");
    if(findObject(":Enable Return Authorizations._creditBy_XComboBox").currentText!= "Check")
        type(":Enable Return Authorizations._creditBy_XComboBox", "Check");
    if(!findObject(":Enable Return Authorizations.Check Print On Save by Default_QCheckBox").checked)
        clickButton(":Enable Return Authorizations.Check Print On Save by Default_QCheckBox");
    clickButton(":Sales Configuration.Save_QPushButton");
    test.log("Sales Module Configured");
    
    
    
    //------------Sales: Account Assignments-----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Account Assignments...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Account Assignments...");
    
    waitForObject(":List Sales Account Assignments.New_QPushButton");
    clickButton(":List Sales Account Assignments.New_QPushButton");
    waitForObject(":_customerTypes.All Customer Types_QRadioButton");
    clickButton(":_customerTypes.All Customer Types_QRadioButton");
    clickButton(":_productCategories.All Product Categories_QRadioButton");
    type(":Sales Account Assignment._main_XLineEdit", "01-01-4000-01");
    type(":Sales Account Assignment._main_XLineEdit_2", "01-01-4800-01");
    type(":Sales Account Assignment._main_XLineEdit_3", "01-01-5000-01");
    type(":Sales Account Assignment._main_XLineEdit_4", "01-01-4700-01");
    type(":Sales Account Assignment._main_XLineEdit_5", "01-01-5710-01");
    type(":Sales Account Assignment._main_XLineEdit_6", "01-01-5720-01");
    clickButton(":Sales Account Assignment.Save_QPushButton");
    waitForObject(":List Sales Account Assignments._salesaccnt_XTreeWidget");
    if(!clickItem(":List Sales Account Assignments._salesaccnt_XTreeWidget", "Any", 5, 5, 1, Qt.LeftButton))
       test.pass("Sales Account Assigned");
    
    waitForObject(":List Sales Account Assignments.Close_QPushButton");
    clickButton(":List Sales Account Assignments.Close_QPushButton");
    test.log("Sales Account Assingments done");
  
  
    
    //----------------Create new Customer---------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "New...");
    activateItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "New...");
   
    waitForObject(":Customer._number_XLineEdit");
    type(":Customer._number_XLineEdit", "TTOYS");
    type(":Customer._name_XLineEdit", "Tremendous Toys");
    if(findObject(":Defaults._shipvia_XComboBox").currentText!="UPS-GROUND-UPS Ground")
        type(":Defaults._shipvia_XComboBox","UPS");
    if(findObject(":Defaults._shipchrg_XComboBox").currentText!= "ADDCHARGE-Add Shipping Charges to Order")
        type(":Defaults._shipchrg_XComboBox", "ADDCHARGE");
    if(!findObject(":Settings.Allow Free-Form Bill-To_QCheckBox").checked)
        clickButton(":Settings.Allow Free-Form Bill-To_QCheckBox");
    if(findObject(":Settings._sellingWarehouse_WComboBox").currentText!= "WH1");
        type(":Settings._sellingWarehouse_WComboBox", "WH1");
    clickTab(":Customer.qt_tabwidget_tabbar_QTabBar", "Credit");
    waitForObject(":Defaults._defaultDiscountPrcnt_XLineEdit");
    type(":Defaults._defaultDiscountPrcnt_XLineEdit", "10");
    type(":_creditGroup_XLineEdit", "50000");
    type(":_creditGroup._creditRating_XLineEdit", "<Ctrl+A>");
    type(":_creditGroup._creditRating_XLineEdit", "<Del>");
    type(":_creditGroup._creditRating_XLineEdit", "D&B");
    if(!findObject(":_creditGroup.Place on Credit Warning when Credit Limit/Grace Days is Exceeded_QCheckBox").checked)		clickButton(":_creditGroup.Place on Credit Warning when Credit Limit/Grace Days is Exceeded_QCheckBox");
    clickButton(":Credit Status.In Good Standing_QRadioButton");
    if(!findObject(":Requirements.Uses Purchase Orders_QCheckBox").checked)
        clickButton(":Requirements.Uses Purchase Orders_QCheckBox");
    if(!findObject(":Requirements.Uses Blanket P/O's_QCheckBox").checked)
        clickButton(":Requirements.Uses Blanket P/O's_QCheckBox");
    if(!findObject(":_creditGroup.Alternate Late Grace Days_QGroupBox").checked)
        type(":_creditGroup.Alternate Late Grace Days_QGroupBox", " ");
    type(":Alternate Late Grace Days._graceDays_QSpinBox", "<Ctrl+A>");
    type(":Alternate Late Grace Days._graceDays_QSpinBox", "<Del>");
    type(":Alternate Late Grace Days._graceDays_QSpinBox", "30");
    clickTab(":Customer.qt_tabwidget_tabbar_QTabBar", "Addresses");
    waitForObject(":_addressStack._honorific_XComboBox");
    type(":_addressStack._honorific_XComboBox", "MR");
    type(":_addressStack._first_XLineEdit", "Jerry");
    type(":_addressStack._middle_XLineEdit", "R");
    type(":_addressStack._last_XLineEdit", "Stapleton");
    type(":_addressStack._title_XLineEdit", "Senior Analyst");
    type(":_addressStack._phone_XLineEdit", "234325");
    type(":_addressStack._phone2_XLineEdit", "5352352");
    type(":_addressStack._fax_XLineEdit", "3523525");
    type(":_addressStack._email_XLineEdit", "jerry@test.com");
    type(":_addressStack._webaddr_XLineEdit", "www.testing.com");
    type(":_addressStack.Street\nAddress:_XLineEdit_4", "Street line addr1");
    type(":_addressStack.Street\nAddress:_XLineEdit_5", "Street line addr2");
    type(":_addressStack.Street\nAddress:_XLineEdit_6", "Street line addr3");
    type(":_addressStack.City:_XLineEdit_2", "Virginia");
    type(":_addressStack.State:_XComboBox_2", "VA");
    type(":_addressStack.Postal Code:_XLineEdit_2", "2535635");
    type(":_addressStack.Country:_XComboBox_2", "United States");
    clickButton(":tabAddresses.Ship To_QRadioButton");
    waitForObject(":_addressStack.New_QPushButton");
    clickButton(":_addressStack.New_QPushButton");
    waitForObject(":_shipToNumber_XLineEdit");
    type(":_shipToNumber_XLineEdit", "Store1");
    type(":_name_XLineEdit_13", "Old Towne Store 1");
    if(!findObject(":Ship-To.Default_QCheckBox").checked)
        clickButton(":Ship-To.Default_QCheckBox");
    type(":Ship-To.Street\nAddress:_XLineEdit", "Street Addr line1");
    type(":Ship-To.Street\nAddress:_XLineEdit_2", "Street Addr line2");
    type(":Ship-To.Street\nAddress:_XLineEdit_3", "Street Addr line 3");
    type(":Ship-To.City:_XLineEdit", "Alaska");
    type(":Ship-To.State:_XComboBox", "WDC");
    type(":Ship-To.Postal Code:_XLineEdit", "235235");
    type(":Ship-To.Country:_XComboBox", "United States");
    type(":Ship-To._honorific_XComboBox", "MR");
    type(":Ship-To._first_XLineEdit", "Kunal");
    type(":Ship-To._middle_XLineEdit", "R");
    type(":Ship-To._last_XLineEdit", "Joshi");
    type(":Ship-To._title_XLineEdit", "Associate Consultant");
    type(":Ship-To._phone_XLineEdit", "23432");
    type(":Ship-To._fax_XLineEdit", "23425");
    type(":Ship-To._email_XLineEdit", "kunal@test.com");
    type(":_commission_XLineEdit", "7.5");
    if(findObject(":Defaults:._shipform_XComboBox").currentText!= "STANDARD-PACKING-LIST")
        type(":Defaults:._shipform_XComboBox", "STANDARD");
    if(findObject(":Defaults:._shipchrg_XComboBox")!="ADDCHARGE-Add Shipping Charges to Order")
        type(":Defaults:._shipchrg_XComboBox", "ADDCHARGE");
    clickButton(":Ship-To.Save_QPushButton");
    
    
    waitForObject(":_addressStack.New_QPushButton");
    clickButton(":_addressStack.New_QPushButton");
    waitForObject(":_shipToNumber_XLineEdit");
    type(":_shipToNumber_XLineEdit", "Store2");
    type(":_name_XLineEdit_13", "Old Towne Store 2");
    if(findObject(":Ship-To.Default_QCheckBox").checked)
        clickButton(":Ship-To.Default_QCheckBox");
    type(":Ship-To.Street\nAddress:_XLineEdit", "Street Addr line11");
    type(":Ship-To.Street\nAddress:_XLineEdit_2", "Street Addr line22");
    type(":Ship-To.Street\nAddress:_XLineEdit_3", "Street Addr line 33");
    type(":Ship-To.City:_XLineEdit", "Alaska");
    type(":Ship-To.State:_XComboBox", "WDC");
    type(":Ship-To.Postal Code:_XLineEdit", "345235");
    type(":Ship-To.Country:_XComboBox", "United States");
    type(":Ship-To._honorific_XComboBox", "MR");
    type(":Ship-To._first_XLineEdit", "Rakesh");
    type(":Ship-To._middle_XLineEdit", "H");
    type(":Ship-To._last_XLineEdit", "Mittal");
    type(":Ship-To._title_XLineEdit", "Senior Consultant");
    type(":Ship-To._phone_XLineEdit", "23432");
    type(":Ship-To._fax_XLineEdit", "23425");
    type(":Ship-To._email_XLineEdit", "rakesh@test.com");
    type(":_commission_XLineEdit", "7.5");
    if(findObject(":Defaults:._shipform_XComboBox").currentText!= "STANDARD-PACKING-LIST")
        type(":Defaults:._shipform_XComboBox", "STANDARD");
    if(findObject(":Defaults:._shipchrg_XComboBox")!="ADDCHARGE-Add Shipping Charges to Order")
        type(":Defaults:._shipchrg_XComboBox", "ADDCHARGE");
    clickButton(":Ship-To.Save_QPushButton");
    
    
    waitForObject(":Customer.Save_QPushButton");
    clickButton(":Customer.Save_QPushButton");
    test.log("Customer: TTOYS created");
    
    
    
    //----------------Create Customer Group---------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "Groups...");
    activateItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "Groups...");
    
    waitForObject(":List Customer Groups.New_QPushButton");
    clickButton(":List Customer Groups.New_QPushButton");
    waitForObject(":GroupBox1._name_XLineEdit");
    type(":GroupBox1._name_XLineEdit", "US-VA");
    type(":GroupBox1._descrip_XLineEdit", "National Accounts");
    clickButton(":Customer Group.New_QPushButton");
    waitForObjectItem(":_listTab_XTreeWidget", "TTOYS");
    clickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Search For Customer.Select_QPushButton");
    clickButton(":Search For Customer.Select_QPushButton");
    waitForObject(":GroupBox1.Save_QPushButton");
    clickButton(":GroupBox1.Save_QPushButton");
    waitForObject(":List Customer Groups._custgrp_XTreeWidget");
    if(!clickItem(":List Customer Groups._custgrp_XTreeWidget", "US-VA", 5, 5, 1, Qt.LeftButton))
        test.pass("Customer Group Created");
    
    waitForObject(":List Customer Groups.Close_QPushButton");
    clickButton(":List Customer Groups.Close_QPushButton");
  
    
    
    //-----------------Define: Reason Codes---------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Reason Codes...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Reason Codes...");
    
    waitForObject(":List Reason Codes.New_QPushButton");
    clickButton(":List Reason Codes.New_QPushButton");
    waitForObject(":_code_XLineEdit_13");
    type(":_code_XLineEdit_13", "SO-DAMAGED-RETURNED");
    type(":_description_XLineEdit_25", "SO Damaged Returned on CM");
    waitForObject(":Reason Code.Save_QPushButton");
    clickButton(":Reason Code.Save_QPushButton");
    waitForObject(":List Reason Codes._rsncode_XTreeWidget");
    if(!clickItem(":List Reason Codes._rsncode_XTreeWidget", "SO-DAMAGED-RETURNED", 5, 5, 1, Qt.LeftButton))
        test.pass("Reason Code Created:SO-DAMAGED-RETURNED");
    
    
    waitForObject(":List Reason Codes.New_QPushButton");
    clickButton(":List Reason Codes.New_QPushButton");
    waitForObject(":_code_XLineEdit_13");
    type(":_code_XLineEdit_13", "SO-WRONG-RETURNED");
    type(":_description_XLineEdit_25", "SO Wrong Product - Returned on CM");
    waitForObject(":Reason Code.Save_QPushButton");
    clickButton(":Reason Code.Save_QPushButton");
    waitForObject(":List Reason Codes._rsncode_XTreeWidget");
    if(!clickItem(":List Reason Codes._rsncode_XTreeWidget", "SO-WRONG-RETURNED", 5, 5, 1, Qt.LeftButton))
        test.pass("Reason Code Created:SO-WRONG-RETURNED");
    
    waitForObject(":List Reason Codes.Close_QPushButton");
    clickButton(":List Reason Codes.Close_QPushButton");
 
    
    //---------------Define Pricing Schedule---------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Pricing");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Pricing");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Pricing_QMenu", "Pricing Schedules...");
    activateItem(":xTuple ERP: OpenMFG Edition.Pricing_QMenu", "Pricing Schedules...");
    waitForObject(":List Pricing Schedules.New_QPushButton");
    clickButton(":List Pricing Schedules.New_QPushButton");
    
    waitForObject(":GroupBox1._name_XLineEdit_2");
    type(":GroupBox1._name_XLineEdit_2", "BASE");
    type(":GroupBox1._descrip_XLineEdit_2", "Base Price Schedule");
    waitForObject(":Pricing Schedule.New_QPushButton");
    clickButton(":Pricing Schedule.New_QPushButton");
    waitForObject(":_widgetStack._itemNumber_ItemLineEdit");
    type(":_widgetStack._itemNumber_ItemLineEdit", "YTRUCK1");
    type(":_qtyBreak_XLineEdit_2", "0");
    type(":_baseTab_XLineEdit", "9.99");
    waitForObject(":Pricing Schedule Item.Save_QPushButton");
    clickButton(":Pricing Schedule Item.Save_QPushButton");    
    
    waitForObject(":Pricing Schedule.New_QPushButton");
    clickButton(":Pricing Schedule.New_QPushButton");
    waitForObject(":_widgetStack._itemNumber_ItemLineEdit");
    type(":_widgetStack._itemNumber_ItemLineEdit", "YTRUCK1");
    type(":_qtyBreak_XLineEdit_2", "100");
    type(":_baseTab_XLineEdit", "9.5");
    waitForObject(":Pricing Schedule Item.Save_QPushButton");
    clickButton(":Pricing Schedule Item.Save_QPushButton");    
    
    waitForObject(":Pricing Schedule.New_QPushButton");
    clickButton(":Pricing Schedule.New_QPushButton");
    waitForObject(":_widgetStack._itemNumber_ItemLineEdit");
    type(":_widgetStack._itemNumber_ItemLineEdit", "YTRUCK1");
    type(":_qtyBreak_XLineEdit_2", "500");
    type(":_baseTab_XLineEdit", "9.25");
    waitForObject(":Pricing Schedule Item.Save_QPushButton");
    clickButton(":Pricing Schedule Item.Save_QPushButton");    
    
    waitForObject(":GroupBox1.Save_QPushButton_2");
    clickButton(":GroupBox1.Save_QPushButton_2");
    
    waitForObject(":_ipshead_XTreeWidget");
    if(!clickItem(":_ipshead_XTreeWidget", "BASE", 5, 5, 1, Qt.LeftButton))
        test.pass("Pricing Schedule created:BASE");
    
    waitForObject(":List Pricing Schedules.Close_QPushButton");
    clickButton(":List Pricing Schedules.Close_QPushButton");
    
    
    //-----------Assign Pricing Schedule---------------    
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Pricing");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Pricing");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Pricing_QMenu", "Pricing Schedule Assignments...");
    activateItem(":xTuple ERP: OpenMFG Edition.Pricing_QMenu", "Pricing Schedule Assignments...");
    waitForObject(":List Pricing Schedule Assignments.New_QPushButton");
    clickButton(":List Pricing Schedule Assignments.New_QPushButton");
    waitForObject(":_customerGroup.Selected Customer Type:_QRadioButton");
    clickButton(":_customerGroup.Selected Customer Type:_QRadioButton");
    if(findObject(":_ipshead_XComboBox").currentText!= "BASE - Base Price Schedule")
        type(":_ipshead_XComboBox","BASE");
    clickButton(":Pricing Schedule Assignment.Save_QPushButton");
    waitForObject(":List Pricing Schedule Assignments._ipsass_XTreeWidget");
    if(!clickItem(":List Pricing Schedule Assignments._ipsass_XTreeWidget", "ANY", 5, 5, 1, Qt.LeftButton))
      test.pass("Pricing Schedule Assigned");
    
    waitForObject(":List Pricing Schedule Assignments.Close_QPushButton");
    clickButton(":List Pricing Schedule Assignments.Close_QPushButton");

    
    //-----------Create Item site for INTRAN------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
    activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "List...");
    
    waitForObject(":List Sites.New_QPushButton_2");
    clickButton(":List Sites.New_QPushButton_2");
    if(findObject(":_sitetype_XComboBox_2").currentText!="INTRAN")
        type(":_sitetype_XComboBox_2", "INTRAN");
   type(":_code_XLineEdit_14", "INTRAN");
    type(":_description_XLineEdit_26", "Intransit Warehouse");
    type(":Site.Street\nAddress:_XLineEdit", "#582, Charmy Ganesh Nilayam");
    type(":Site.Street\nAddress:_XLineEdit_2", "Vittal Rao Colony");
    type(":Site.Street\nAddress:_XLineEdit_3", "Santh Nagar");
    type(":Site.City:_XLineEdit", "Pune");
    type(":Site.State:_XComboBox", "Maharastra");
    type(":Site.Postal Code:_XLineEdit", "534235");
    type(":Site.Country:_XComboBox", "india");
    type(":Site._honorific_XComboBox", "Mr");
    type(":Site._first_XLineEdit", "Gaurav");
    type(":Site._middle_XLineEdit", "S");
    type(":Site._last_XLineEdit", "Gulati");
    type(":Site._title_XLineEdit", "Associate Consultant");
    type(":Site._phone_XLineEdit", "235423");
    type(":Site._fax_XLineEdit", "252342");
    type(":Site._email_XLineEdit", "gauraasv@testing.com");
    type(":Site._main_XLineEdit", "01-01-1950-01");
    clickButton(":_generalTab.Transit Site_QRadioButton");
    if(findObject(":_whsTypeStack._shipvia_XComboBox")!= "UPS-GROUND-UPS Ground")
        type(":_whsTypeStack._shipvia_XComboBox", "UPS");
    if(findObject(":_shipform_XComboBox").currentText!="INTRAN-PACKING-LIST")
        type(":_shipform_XComboBox", "INTRAN");
    if(findObject(":_costcat_XComboBox_4").currentText!= "CCINTRAN-Intransit Warehouse")
        type(":_costcat_XComboBox_4", "CCINTRAN");
    type(":_whsTypeStack._shipcomments_QTextEdit", "This is a internal shipment between two Prodiem Toys warehouses. If you have any questions please call Anna Falactic at 757-322-2101.");	
    waitForObject(":Save_QPushButton_2");
    clickButton(":Save_QPushButton_2");
    waitForObject(":List Sites._warehouse_XTreeWidget_2");
    if(!clickItem(":List Sites._warehouse_XTreeWidget_2", "INTRAN_1", 5, 5, 1, Qt.LeftButton))
        test.pass("Site Created:INTRAN");
    
    waitForObject(":List Sites.Close_QPushButton_2");
    clickButton(":List Sites.Close_QPushButton_2");
    test.log("Item site for INTRAN created");
    
    
    
     //-----------Configure: Inventory Module--------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Inventory...");
    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Inventory...");
    if(findObject(":_defaultTransWhs_WComboBox").currentText!= "INTRAN");
       type(":_defaultTransWhs_WComboBox", "INTRAN");
    clickButton(":Inventory Configuration.Save_QPushButton");
    test.log("Configure Module: Inventory");
    
    //---------Define: Incident Categories----------------
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
    type(":_name_XLineEdit_14", "Product");
    type(":Incident Category._order_QSpinBox", "<Ctrl+A>");
    type(":Incident Category._order_QSpinBox", "<Del>");
    type(":Incident Category._order_QSpinBox", "10");
    type(":Incident Category._descrip_QTextEdit", "Product related incidents");
    waitForObject(":Incident Category.Save_QPushButton");
    clickButton(":Incident Category.Save_QPushButton");
    waitForObject(":List Incident Categories._incidentCategories_XTreeWidget");
    if(clickItem(":List Incident Categories._incidentCategories_XTreeWidget", "Product", 5, 5, 1, Qt.LeftButton))
        test.pass("Incident Categories created for: Product");
    
   
    waitForObject(":List Incident Categories.New_QPushButton");
    clickButton(":List Incident Categories.New_QPushButton");
    waitForObject(":_name_XLineEdit_14");
    type(":_name_XLineEdit_14", "Customer");
    type(":Incident Category._order_QSpinBox", "<Ctrl+A>");
    type(":Incident Category._order_QSpinBox", "<Del>");
    type(":Incident Category._order_QSpinBox", "20");
    type(":Incident Category._descrip_QTextEdit", "Customer related incidents");
    waitForObject(":Incident Category.Save_QPushButton");
    clickButton(":Incident Category.Save_QPushButton");
    waitForObject(":List Incident Categories._incidentCategories_XTreeWidget");
    if(clickItem(":List Incident Categories._incidentCategories_XTreeWidget", "Customer", 5, 5, 1, Qt.LeftButton))
        test.pass("Incident Categories created for: Customer");
    
    
    waitForObject(":List Incident Categories.New_QPushButton");
    clickButton(":List Incident Categories.New_QPushButton");
    waitForObject(":_name_XLineEdit_14");
    type(":_name_XLineEdit_14", "Vendor");
    type(":Incident Category._order_QSpinBox", "<Ctrl+A>");
    type(":Incident Category._order_QSpinBox", "<Del>");
    type(":Incident Category._order_QSpinBox", "30");
    type(":Incident Category._descrip_QTextEdit", "Vendor related incidents");
    waitForObject(":Incident Category.Save_QPushButton");
    clickButton(":Incident Category.Save_QPushButton");
    waitForObject(":List Incident Categories._incidentCategories_XTreeWidget");
    if(clickItem(":List Incident Categories._incidentCategories_XTreeWidget", "Vendor", 5, 5, 1, Qt.LeftButton))
        test.pass("Incident Categories created for: Vendor");
  
    waitForObject(":List Incident Categories.Close_QPushButton");
    clickButton(":List Incident Categories.Close_QPushButton");

    //--------------Create: Incident Severities----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Severities...");
    activateItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Severities...");
    waitForObject(":List Incident Severities.New_QPushButton");
    clickButton(":List Incident Severities.New_QPushButton");
    waitForObject(":_name_XLineEdit_15");
    type(":_name_XLineEdit_15", "Crash");
    type(":Incident Severity._order_QSpinBox", "<Ctrl+A>");
    type(":Incident Severity._order_QSpinBox", "<Del>");
    type(":Incident Severity._order_QSpinBox", "5");
    type(":Incident Severity._descrip_QTextEdit", "System Down");
    clickButton(":Incident Severity.Save_QPushButton");
    waitForObject(":List Incident Severities._incidentSeverities_XTreeWidget");
    if(!clickItem(":List Incident Severities._incidentSeverities_XTreeWidget", "Crash", 5, 5, 1, Qt.LeftButton))
        test.pass("Incident Severity created : Crash");
    
    waitForObject(":List Incident Severities.Close_QPushButton");
    clickButton(":List Incident Severities.Close_QPushButton");

    
    
    //--------------Create Incident Resolutions----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Resolutions...");
    activateItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Resolutions...");
    
    waitForObject(":List Incident Resolutions.New_QPushButton");
    clickButton(":List Incident Resolutions.New_QPushButton");
    waitForObject(":_name_XLineEdit_16");
    type(":_name_XLineEdit_16", "Replace");
    type(":Incident Resolution._order_QSpinBox", "<Ctrl+A>");
    type(":Incident Resolution._order_QSpinBox", "<Del>");
    type(":Incident Resolution._order_QSpinBox", "40");
    type(":Incident Resolution._descrip_QTextEdit", "Replace Unit");
    waitForObject(":Incident Resolution.Save_QPushButton");
    clickButton(":Incident Resolution.Save_QPushButton");
    waitForObject(":List Incident Resolutions._incidentResolutions_XTreeWidget");
    if(!clickItem(":List Incident Resolutions._incidentResolutions_XTreeWidget", "Replace", 5, 5, 1, Qt.LeftButton))
        test.pass("Incident Resolution created : Replace");
    
    waitForObject(":List Incident Resolutions.Close_QPushButton");
    clickButton(":List Incident Resolutions.Close_QPushButton");
 
}