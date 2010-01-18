function main()
{
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER");       
    var appEdition = findApplicationEdition();
    
    
    //----------Create Customer Type------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "Types...");
        activateItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "Types...");
        
        snooze(1);
        clickButton(":List Customer Types.New_QPushButton");
        waitForObject(":_code_XLineEdit_11");
        type(":_code_XLineEdit_11", "NORMAL");
        type(":_description_XLineEdit_21", "Normal Customer");
        snooze(0.5);
        if(!findObject(":Customer Type.Enable Characteristics Profile_QGroupBox").checked)
            type(":Customer Type.Enable Characteristics Profile_QGroupBox"," ");
        
        snooze(1);
        clickButton(":Enable Characteristics Profile.New_QPushButton");
        waitForObject(":_char_XComboBox_3");
        if(findObject(":_char_XComboBox_3").currentText!="SUPPORT-PLAN - Customer Feedback")
            clickItem(":_char_XComboBox_3", "SUPPORT-PLAN - Customer Feedback",0,0,1,Qt.LeftButton);
        waitForObject(":_value_XLineEdit_4");
        type(":_value_XLineEdit_4", "Standard");
        if(!findObject(":Customer Characteristic.Default_QCheckBox").checked)
            clickButton(":Customer Characteristic.Default_QCheckBox");
        clickButton(":Customer Characteristic.Save_QPushButton");
        
        snooze(1);
        clickButton(":Enable Characteristics Profile.New_QPushButton");
        waitForObject(":_char_XComboBox_3");
        if(findObject(":_char_XComboBox_3").currentText!="SUPPORT-PLAN - Customer Feedback")
            clickItem(":_char_XComboBox_3", "SUPPORT-PLAN - Customer Feedback",0,0,1,Qt.LeftButton);
        waitForObject(":_value_XLineEdit_4");    
        type(":_value_XLineEdit_4", "Complete");
        if(findObject(":Customer Characteristic.Default_QCheckBox").checked)
            clickButton(":Customer Characteristic.Default_QCheckBox");
        clickButton(":Customer Characteristic.Save_QPushButton");
        
        snooze(1);
        clickButton(":Enable Characteristics Profile.New_QPushButton");
        waitForObject(":_char_XComboBox_3");
        if(findObject(":_char_XComboBox_3").currentText!="SUPPORT-PLAN - Customer Feedback ")
            clickItem(":_char_XComboBox_3", "SUPPORT-PLAN - Customer Feedback",0,0,1,Qt.LeftButton);
        waitForObject(":_value_XLineEdit_4");    
        type(":_value_XLineEdit_4", "None");
        if(findObject(":Customer Characteristic.Default_QCheckBox").checked)
            clickButton(":Customer Characteristic.Default_QCheckBox");
        clickButton(":Customer Characteristic.Save_QPushButton");
        
        snooze(1);
        clickButton(":Customer Type.Save_QPushButton");
        waitForObject(":List Customer Types._custtype_XTreeWidget");
        if(object.exists(":_custtype.NORMAL_QModelIndex"))
            test.pass("Customer Type created: NORMAL");
        else test.fail("Customer Type not created: NORMAL");
        
        waitForObject(":List Customer Types.Close_QPushButton");
        clickButton(":List Customer Types.Close_QPushButton");
        
    }catch(e){test.fail("Exception in Creating Customer types:"+e);}
    
    //----Read Username based on Role------
    try{
        var set = testData.dataset("login.tsv");
        var username="";
        for (var records in set)
        {
            username=testData.field(set[records],"USERNAME");
            role=testData.field(set[records],"ROLE");
            
            if(role=="RUNREGISTER") break;
        }
    }catch(e){test.fail("Exception in reading login.tsv");}
    
    //----Define Sales Rep---
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Employees");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Employees");
        waitForObjectItem(":xTuple ERP: *.Employees_QMenu", "List...");
        activateItem(":xTuple ERP: *.Employees_QMenu", "List...");
        
        waitForObject(":_frame._emp_XTreeWidget_2");
        doubleClickItem(":_frame._emp_XTreeWidget_2", username, 0, 0, 0, Qt.LeftButton);
        waitForObject(":Employee.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Employee.qt_tabwidget_tabbar_QTabBar", "Detail");
        waitForObject(":_relationshipsGroup._salesrep_XCheckBox_2");
        if(!findObject(":_relationshipsGroup._salesrep_XCheckBox_2").checked)
            clickButton(":_relationshipsGroup._salesrep_XCheckBox_2");
        waitForObject(":_relationshipsGroup.Sales Rep..._QPushButton_2");
        clickButton(":_relationshipsGroup.Sales Rep..._QPushButton_2");
        if(object.exists(":Cancel.Yes_QPushButton"))
        {
            waitForObject(":Cancel.Yes_QPushButton");
            clickButton(":Cancel.Yes_QPushButton");
        }
        waitForObject(":_name_XLineEdit_9");
        type(":_name_XLineEdit_9", username);
        waitForObject(":_commPrcnt_XLineEdit");
        type(":_commPrcnt_XLineEdit", "7.5");
        waitForObject(":Sales Representative.Save_QPushButton");
        clickButton(":Sales Representative.Save_QPushButton");
        waitForObject(":Employee.Save_QPushButton");
        clickButton(":Employee.Save_QPushButton");
        waitForObject(":_frame.Close_QPushButton_2");
        clickButton(":_frame.Close_QPushButton_2");
    }catch(e){test.fail("Exception in creating Employee record:"+e);}
    
    
    
    //---------------Create Shipping Zone--------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Zones...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Shipping Zones...");
        
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC1");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 1");
        waitForObject(":Shipping Zone.Save_QPushButton");
        clickButton(":Shipping Zone.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if (object.exists("{column='0' container=':List Shipping Zones._shipzone_XTreeWidget' text='DOMESTIC1' type='QModelIndex'}"))
            test.pass("Shipping Zone created: DOMESTIC1");
        else test.fail("Shipping Zone created: DOMESTIC1");
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC2");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 2");
        waitForObject(":Shipping Zone.Save_QPushButton");
        clickButton(":Shipping Zone.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if (object.exists("{column='0' container=':List Shipping Zones._shipzone_XTreeWidget' text='DOMESTIC2' type='QModelIndex'}"))
            
            test.pass("Shipping Zone created: DOMESTIC2");
        
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC3");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 3");
        waitForObject(":Shipping Zone.Save_QPushButton");
        clickButton(":Shipping Zone.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if (object.exists("{column='0' container=':List Shipping Zones._shipzone_XTreeWidget' text='DOMESTIC3' type='QModelIndex'}"))
            
            test.pass("Shipping Zone created: DOMESTIC3");
        
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC4");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 4");
        waitForObject(":Shipping Zone.Save_QPushButton");
        clickButton(":Shipping Zone.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if (object.exists("{column='0' container=':List Shipping Zones._shipzone_XTreeWidget' text='DOMESTIC4' type='QModelIndex'}"))
            
            test.pass("Shipping Zone created: DOMESTIC4");
        
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC5");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 5");
        waitForObject(":Shipping Zone.Save_QPushButton");
        clickButton(":Shipping Zone.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if(object.exists(":_shipzone.DOMESTIC5_QModelIndex"))
            test.pass("Shipping Zone created: DOMESTIC5");
        else test.fail("Shipping Zone not created");
        
        waitForObject(":List Shipping Zones.Close_QPushButton");
        clickButton(":List Shipping Zones.Close_QPushButton");
        
    }catch(e){test.fail("Exception in created Shipping Zones:"+e);}
    
    
    //---------Create Shipping Vias---------------
    try{
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
        if(object.exists(":_shipvia.UPS-GROUND_QModelIndex"))
            test.pass("Shipping Vias created: UPS-GROUND");
        else test.fail("Shipping Vias not created: UPS-GROUND");
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
        
    }catch(e){test.fail("Exception in creating Shipping Vias");}
    
    //-----------Create Shipping Charges--------------
    try{
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
        if(object.exists(":_shipchrg.NOCHARGE_QModelIndex"))
            test.pass("Shipping Charges Types created: NOCHARGE");
        else test.fail("Shipping Charges Types not created: NOCHARGE");
        
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
        if(object.exists("{column='0' container=':List Shipping Charge Types._shipchrg_XTreeWidget' text='ADDCHARGE' type='QModelIndex'}"))
            test.pass("Shipping Charges Types created: ADDCHARGE");
        else test.fail("Shipping Charges Types created: ADDCHARGE");
        
        waitForObject(":List Shipping Charge Types.Close_QPushButton");
        clickButton(":List Shipping Charge Types.Close_QPushButton");
        
    }catch(e){test.fail("Exception in creating Shipping Charge:"+e);} 
    
    //------Define Tax Authorities-------
    try{
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
        type(":_code_XLineEdit_15", "VA-IRS");
        type(":_name_XLineEdit_22", "Virginia IRS");
        type(":_extref_XLineEdit", "Smith");
        if(findObject(":_currency_XComboBox_2").currentText!= "USD - $")
            type(":_currency_XComboBox_2", "USD");
        type(":Tax Authority._county_QLineEdit", "United States");
        type(":Tax Authority.Street\nAddress:_XLineEdit", "Street Addr Line1");
        type(":Tax Authority.Street\nAddress:_XLineEdit_2", "Street addr line2");
        type(":Tax Authority.Street\nAddress:_XLineEdit_3", "Street Addr line3");
        type(":Tax Authority.City:_XLineEdit", "Richmond");
        type(":_state_QLineEdit_3", "VA");
        type(":groupBox.Postal Code:_XLineEdit", "24186");
        clickItem(":groupBox._country_XComboBox", "United States", 0, 0, 1, Qt.LeftButton);
        clickButton(":Tax Authority.Save_QPushButton");
        waitForObject(":List Tax Authorities._taxauth_XTreeWidget");
        if(object.exists("{column='0' container=':List Tax Authorities._taxauth_XTreeWidget' text='TAX-AUTH1' type='QModelIndex'}"))
            test.pass("Tax Authority created:TAX-AUTH1");
        
        waitForObject(":List Tax Authorities.Close_QPushButton");
        clickButton(":List Tax Authorities.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Tax Authorities:"+e);}
    
    
    //---------------Define: Tax Codes-----------------------
    try{
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
        type(":Tax Code._main_XLineEdit","01-01-2510-01");
        waitForObject(":Tax Code._taxClass_XComboBox");
        clickItem(":Tax Code._taxClass_XComboBox","1-Legacy Class 1",1,0,0,Qt.LeftButton);
        waitForObject(":Tax Code._taxauth_XComboBox");
        clickItem(":Tax Code._taxauth_XComboBox","VA-IRS",1,0,0,Qt.LeftButton);
        clickButton(":_frame.New_QPushButton_2");
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "5");
        clickButton(":Tax Code Rate.Save_QPushButton");
        waitForObject(":Tax Code.Save_QPushButton");
        clickButton(":Tax Code.Save_QPushButton");
        waitForObject(":List Tax Codes._tax_XTreeWidget");
        if(object.exists(":_tax.VATAX_QModelIndex"))
            test.pass("Tax Code created:VATAX");
        else test.fail("Tax Code created:VATAX");
        
        waitForObject(":List Tax Codes.Close_QPushButton");
        clickButton(":List Tax Codes.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Tax Codes");}
    
    //----Define Tax Zones----
    defineTaxZone("VA-SALES-TAX-ZONE", "Virginia Sales Tax Zone")
            
            //----------------Define: Shipping Forms---------------------
            try{
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
        waitForObject(":_report_XComboBox");
        if(findObject(":_report_XComboBox").currentText!="PackingList");
        clickItem(":_report_XComboBox", "PackingList",0,0,1,Qt.LeftButton);
        waitForObject(":Shipping Form.Save_QPushButton");
        clickButton(":Shipping Form.Save_QPushButton");
        waitForObject(":List Shipping Forms._bolformat_XTreeWidget");
        if(object.exists(":_bolformat.STANDARD-PACKING-LIST_QModelIndex"))
            test.pass("Shipping Forms created: STANDARD-PACKING-LIST");
        else test.fail("Shipping Forms not created: STANDARD-PACKING-LIST");
        
        
        waitForObject(":List Shipping Forms.New_QPushButton");
        clickButton(":List Shipping Forms.New_QPushButton");
        waitForObject(":_name_XLineEdit_11");
        type(":_name_XLineEdit_11", "INTRAN-PACKING-LIST");
        waitForObject(":_report_XComboBox");
        if(findObject(":_report_XComboBox").currentText!="PackingList-Shipment");
        clickItem(":_report_XComboBox", "PackingList-Shipment",0,0,1,Qt.LeftButton);
        waitForObject(":Shipping Form.Save_QPushButton");
        clickButton(":Shipping Form.Save_QPushButton");
        snooze(1);
        
        waitForObject(":List Shipping Forms._bolformat_XTreeWidget");
        if(object.exists("{column='0' container=':List Shipping Forms._bolformat_XTreeWidget' text='INTRAN-PACKING-LIST' type='QModelIndex'}"))
            test.pass("Shipping Forms created: INTRAN-PACKING-LIST");
        else test.fail("Shipping Forms not created: INTRAN-PACKING-LIST");
        
        
        waitForObject(":List Shipping Forms.Close_QPushButton");
        clickButton(":List Shipping Forms.Close_QPushButton");
        test.log("Shipping Forms defined");
    }catch(e){test.fail("Exception in defining Shipping Forms:"+e);}
    
    
    //-----------Chart Of Accounts-------------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    
    COA("01","01","4000","01","Revenue","Revenue","SI");
    
    COA("01","01","4800","01","Discounts and Allowances","Revenue","SI");
    
    COA("01","01","2445","01","Deferred Revenue","Liability","CL");
    
    COA("01","01","1100","01","Accounts Receivable","Asset","CAS");
    
    waitForObject(":Chart of Accounts.Close_QPushButton_2");
    clickButton(":Chart of Accounts.Close_QPushButton_2");
    
    
    
    //-------------Create Sales Category----------------
    try{
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
        if(object.exists(":_salescat.NORMAL-SALE_QModelIndex"))
            test.pass("Sales Category created: NORMAL-SALE");
        else test.fail("Sales Category not created: NORMAL-SALE");
        
        waitForObject(":List Sales Categories.Close_QPushButton");
        clickButton(":List Sales Categories.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Sales Category");}
    
    
    //-----------Chart Of Accounts-------------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    
    COA("01","01","5000","01","Cost Of Goods Sold","Expense","COGS");
    
    COA("01","01","4700","01","Returns","Revenue","SI");
    
    COA("01","01","5710","01","Returned Goods","Expense","COGS");
    
    COA("01","01","5720","01","Cost of Warranty","Expense","COGS");
    
    waitForObject(":Chart of Accounts.Close_QPushButton_2");
    clickButton(":Chart of Accounts.Close_QPushButton_2");
    
    
    //----------------A/R Account Assignments----------------
    try{
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
            clickItem(":_customerTypeGroup._customerTypes_XComboBox", "NORMAL",0,0,1,Qt.LeftButton);   
        type(":A/R Account Assignment._main_XLineEdit", "01-01-1100-01");
        type(":A/R Account Assignment._main_XLineEdit_2", "01-01-4800-01");
        type(":A/R Account Assignment._main_XLineEdit_3", "01-01-4060-01");
        type(":A/R Account Assignment._main_XLineEdit_4", "01-01-2445-01");
        type(":A/R Account Assignment._main_XLineEdit_4", "<Tab>");
        
        clickButton(":A/R Account Assignment.Save_QPushButton");
        waitForObject(":List A/R Account Assignments._araccnt_XTreeWidget");
        if(object.exists(":_araccnt.NORMAL_QModelIndex"))
            test.pass("A/R Accounts Assignments done");
        else test.fail("A/R Accounts Assignments not created");
        
        waitForObject(":List A/R Account Assignments.Close_QPushButton");
        clickButton(":List A/R Account Assignments.Close_QPushButton");
        test.log("A/R Accounts Assigned");
    }catch(e){test.fail("Exception in defining Accounting Assignments");}
    
    
    
    //----------------Customer Form Assignments--------------------
    try{
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
        waitForObject(":_customerTypeGroup._customerTypes_XComboBox_2");
        if(findObject(":_customerTypeGroup._customerTypes_XComboBox_2").currentText!="NORMAL-Normal Customer")
            clickItem(":_customerTypeGroup._customerTypes_XComboBox_2", "NORMAL",0,0,1,Qt.LeftButton);
        waitForObject(":Customer Form Assignment._invoiceForm_XComboBox")
                type(":Customer Form Assignment._invoiceForm_XComboBox", "Invoice");
        waitForObject(":Customer Form Assignment._creditMemoForm_XComboBox");
        type(":Customer Form Assignment._creditMemoForm_XComboBox", "CreditMemo");
        waitForObject(":Customer Form Assignment._statementForm_XComboBox");
        type(":Customer Form Assignment._statementForm_XComboBox", "Statement");
        waitForObject(":Customer Form Assignment._quoteForm_XComboBox");
        type(":Customer Form Assignment._quoteForm_XComboBox", "Quote");
        waitForObject(":Customer Form Assignment._packingListForm_XComboBox");
        type(":Customer Form Assignment._packingListForm_XComboBox", "PackingList");
        waitForObject(":Customer Form Assignment._soPickListForm_XComboBox");
        type(":Customer Form Assignment._soPickListForm_XComboBox", "PickingListSONoClosedLines");
        waitForObject(":Customer Form Assignment.Save_QPushButton");
        clickButton(":Customer Form Assignment.Save_QPushButton");
        waitForObject(":List Customer Form Assignments._custform_XTreeWidget");
        if(object.exists(":_custform.NORMAL_QModelIndex"))
            test.pass("Customer Form Assignments done");
        else test.fail("Customer Form Assignments not created");
        
        waitForObject(":List Customer Form Assignments.Close_QPushButton");
        clickButton(":List Customer Form Assignments.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Form assignments");}
    
    
    //--------------Define Forms--------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Forms...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Forms...");
        waitForObject(":List Forms.New_QPushButton");
        clickButton(":List Forms.New_QPushButton");
        waitForObject(":_name_XLineEdit_12");
        type(":_name_XLineEdit_12", "SO-Acknowledge");
        type(":Form._descrip_XLineEdit", "Sales Order Acknowledgement Form");
        if(findObject(":_report_XComboBox_2").currentText!="PickingListSOClosedLines")
            type(":_report_XComboBox_2", "PickingListSOClosedLines");
        waitForObject(":Form._key_XComboBox");
        if(findObject(":Form._key_XComboBox").currentText!="Sales Orders")
            clickItem(":Form._key_XComboBox", "Sales Orders",0,0,1,Qt.LeftButton);
        waitForObject(":Form.Save_QPushButton");
        clickButton(":Form.Save_QPushButton");
        snooze(1);
        waitForObject(":List Forms._form_XTreeWidget");
        if(object.exists(":_form.SO-Acknowledge_QModelIndex"))
            test.pass("Form Created: SO-Acknowledge");
        else test.fail("Form not Created: SO-Acknowledge");
        
        waitForObject(":List Forms.Close_QPushButton");
        clickButton(":List Forms.Close_QPushButton");
        test.log("System: Forms defined");
    }catch(e){test.fail("Exception in defining Forms");}   
    
    //------------Configure Sales Module------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Sales...");
        activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Sales...");
        waitForObject(":Sales Configuration._orderNumGeneration_QComboBox");
        if(findObject(":Sales Configuration._orderNumGeneration_QComboBox").currentText!="Automatic");
        clickItem(":Sales Configuration._orderNumGeneration_QComboBox", "Automatic",0,0,1,Qt.LeftButton);
        type(":Sales Configuration._nextSoNumber_XLineEdit", "50000");
        type(":Sales Configuration._nextQuNumber_XLineEdit", "40000");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            if(findObject(":Sales Configuration._returnAuthorizationNumGeneration_QComboBox").currentText!="Automatic, Use R/A #’s");
            type(":Sales Configuration._returnAuthorizationNumGeneration_QComboBox", "Automatic,");
            type(":Sales Configuration._nextRaNumber_XLineEdit", "80000");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":Sales Configuration._returnAuthorizationNumGeneration_QComboBox") , "Return Authorization Number Generation ComboBox not found");      
        }
        if(findObject(":Sales Configuration._creditMemoNumGeneration_QComboBox").currentText!="Automatic, Use C/M #'s")
            type(":Sales Configuration._creditMemoNumGeneration_QComboBox", "Automatic,");
        type(":Sales Configuration._nextCmNumber_XLineEdit", "70000");
        type(":Sales Configuration._nextInNumber_XLineEdit", "60000");
        if(!findObject(":Credit Control.Automatically Allocate Credit Memos to New Sales Order on Save_QCheckBox").checked)		
            clickButton(":Credit Control.Automatically Allocate Credit Memos to New Sales Order on Save_QCheckBox");
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
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            clickTab(":Sales Configuration.qt_tabwidget_tabbar_QTabBar", "Returns");
            waitForObject(":_returns.Enable Return Authorizations_QGroupBox");
            if(!findObject(":_returns.Enable Return Authorizations_QGroupBox").checked)
                type(":_returns.Enable Return Authorizations_QGroupBox"," ");
            waitForObject(":Enable Return Authorizations.Post Return Authorization Changes to the Change Log_QCheckBox")
                    clickButton(":Enable Return Authorizations.Post Return Authorization Changes to the Change Log_QCheckBox");
            if(findObject(":Enable Return Authorizations._disposition_XComboBox").currentText!="Return")
                clickItem(":Enable Return Authorizations._disposition_XComboBox", "Return",0,0,1,Qt.LeftButton);
            if(findObject(":Enable Return Authorizations._timing_XComboBox").currentText!="Upon Receipt")
                clickItem(":Enable Return Authorizations._timing_XComboBox", "Upon Receipt",0,0,1,Qt.LeftButton);
            if(findObject(":Enable Return Authorizations._creditBy_XComboBox").currentText!= "Check")
                clickItem(":Enable Return Authorizations._creditBy_XComboBox", "Check",0,0,1,Qt.LeftButton);
            if(!findObject(":Enable Return Authorizations.Check Print On Save by Default_QCheckBox").checked)
                clickButton(":Enable Return Authorizations.Check Print On Save by Default_QCheckBox");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_returns.Enable Return Authorizations_QGroupBox"), "Enable Return Atuhorization checkbox not found");
            test.xverify(object.exists(":Enable Return Authorizations.Post Return Authorization Changes to the Change Log_QCheckBox"), "Post Return Authorization Changes to change log checkbox not found");
            test.xverify(object.exists(":Enable Return Authorizations._disposition_XComboBox"), "Enable Return Authorization Default Disposition ComboBox not found");
            test.xverify(object.exists(":Enable Return Authorizations._timing_XComboBox"), "Enable Return Authoraization timing ComboBox not found");
            test.xverify(object.exists(":Enable Return Authorizations._creditBy_XComboBox"), "Enable Retunr Authorization Credit by ComboBox not found");
            test.xverify(object.exists(":Enable Return Authorizations.Check Print On Save by Default_QCheckBox"), "Enable Return Authorization Check Print on Save by Default Checkbox not found");
            
        }
        
        clickButton(":Sales Configuration.Save_QPushButton");
        test.log("Sales Module Configured");
    }catch(e){test.fail("Exception in configuring Sales Module");}   
    
    
    //------------Sales: Account Assignments-----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Master Information");
        waitForObject(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_7", "Sales Account Assignments...");
        
        waitForObject(":List Sales Account Assignments.New_QPushButton");
        clickButton(":List Sales Account Assignments.New_QPushButton");
        waitForObject(":_customerTypes.All Customer Types_QRadioButton");
        clickButton(":_customerTypes.All Customer Types_QRadioButton");
        clickButton(":_productCategories.All Product Categories_QRadioButton");
        type(":Sales Account Assignment._main_XLineEdit", "01-01-4000-01");
        type(":Sales Account Assignment._main_XLineEdit_2", "01-01-4800-01");
        type(":Sales Account Assignment._main_XLineEdit_3", "01-01-5000-01");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            type(":Sales Account Assignment._main_XLineEdit_4", "01-01-4700-01");
            type(":Sales Account Assignment._main_XLineEdit_5", "01-01-5710-01");
            type(":Sales Account Assignment._main_XLineEdit_6", "01-01-5720-01");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":Sales Account Assignment._main_XLineEdit_4"), "Sales account assignment not found");
            test.xverify(object.exists(":Sales Account Assignment._main_XLineEdit_5"), "Sales account assignment not found");
            test.xverify(object.exists(":Sales Account Assignment._main_XLineEdit_6"), "Sales account assignment not found");
        }
        
        clickButton(":Sales Account Assignment.Save_QPushButton");
        waitForObject(":List Sales Account Assignments._salesaccnt_XTreeWidget");
        if(object.exists(":_salesaccnt.Any_QModelIndex"))
            test.pass("Sales Account Assigned");
        else test.fail("Sales Account not assigned");
        
        waitForObject(":List Sales Account Assignments.Close_QPushButton");
        clickButton(":List Sales Account Assignments.Close_QPushButton");
        test.log("Sales Account Assignments done");
    }catch(e){test.fail("Exception in Sales Account assignment");}
    
    
    //----------------Create new Customer---------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "New...");
        activateItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "New...");
        
        waitForObject(":Customer._customerNumberEdit_XLineEdit");
        findObject(":Customer._customerNumberEdit_XLineEdit").clear();
        type(":Customer._customerNumberEdit_XLineEdit", "TTOYS");
        type(":Customer._name_XLineEdit", "Tremendous Toys");
        
        clickTab(":Customer.qt_tabwidget_tabbar_QTabBar","Settings");
        waitForObject(":_settingsTab.Terms_QRadioButton");
        clickButton(":_settingsTab.Terms_QRadioButton");
        snooze(0.5);
        waitForObject(":_terms_XComboBox");
        if(findObject(":_terms_XComboBox").currentText!= "2-10N30-2% Discount in 10 Days - Net 30 Days")
            clickItem(":_terms_XComboBox","2-10N30-2% Discount in 10 Days - Net 30 Days",0,0,1,Qt.LeftButton);
        type(":groupBox_4._defaultDiscountPrcnt_XLineEdit", "10");
        type(":_creditGroup._currency_XLineEdit", "50000");
        findObject(":_creditGroup._creditRating_XLineEdit_2").clear();
        type(":_creditGroup._creditRating_XLineEdit_2", "D&B");
        if(!findObject(":_creditGroup.Place on Credit Warning when Credit Limit/Grace Days is Exceeded_QCheckBox_2").checked)
            clickButton(":_creditGroup.Place on Credit Warning when Credit Limit/Grace Days is Exceeded_QCheckBox_2");
        clickButton(":_creditStatusGroup.In Good Standing_QRadioButton");
        if(!findObject(":groupBox_3.Uses Purchase Orders_QCheckBox").checked)
            clickButton(":groupBox_3.Uses Purchase Orders_QCheckBox");
        if(!findObject(":_creditGroup.Alternate Late Grace Days_QGroupBox_2").checked)
            type(":_creditGroup.Alternate Late Grace Days_QGroupBox_2", " ");
        waitForObject(":Alternate Late Grace Days.qt_spinbox_lineedit_QLineEdit_2");
        findObject(":Alternate Late Grace Days.qt_spinbox_lineedit_QLineEdit_2").clear();
        type(":Alternate Late Grace Days.qt_spinbox_lineedit_QLineEdit_2", "30");
        snooze(2);
        clickTab(":Customer.qt_tabwidget_tabbar_QTabBar", "Addresses");
        snooze(1);
        waitForObject(":_addressStack._honorific_XComboBox_2");
        clickItem(":_addressStack._honorific_XComboBox_2", "Mr",0,0,1,Qt.LeftButton);
        type(":_addressStack._first_XLineEdit_2", "Jerry");
        type(":_addressStack._middle_XLineEdit_2", "R");
        type(":_addressStack._last_XLineEdit_2", "Stapleton");
        type(":_addressStack._title_XLineEdit_2", "Senior Analyst");
        type(":_addressStack._phone_XLineEdit_2", "234325");
        type(":_addressStack._phone2_XLineEdit_2", "5352352");
        type(":_addressStack._fax_XLineEdit_2", "3523525");
        type(":_addressStack._email_XLineEdit_2", "jerry@test.com");
        type(":_addressStack._webaddr_XLineEdit_2", "www.testing.com");
        type(":_addressStack.Street\nAddress:_XLineEdit_7", "Street line addr1");
        type(":_addressStack.Street\nAddress:_XLineEdit_8", "Street line addr2");
        type(":_addressStack.Street\nAddress:_XLineEdit_9", "Street line addr3");
        type(":_addressStack.City:_XLineEdit_3", "Virginia");
        type(":_state_QLineEdit_5", "VA");
        type(":_addressStack.Postal Code:_XLineEdit_3", "2535635");
        clickItem(":_addressStack._country_XComboBox_2", "United States", 0, 0, 1, Qt.LeftButton);
        clickButton(":_addressTab.Ship To_QRadioButton");
        
        waitForObject(":_addressStack.New_QPushButton_2");
        clickButton(":_addressStack.New_QPushButton_2");
        waitForObject(":_shipToNumber_XLineEdit");
        type(":_shipToNumber_XLineEdit", "Store1");
        type(":_name_XLineEdit_13", "Old Towne Store 1");
        if(!findObject(":Ship-To.Default_QCheckBox").checked)
            clickButton(":Ship-To.Default_QCheckBox");
        type(":Ship-To.Street\nAddress:_XLineEdit", "Street Addr line1");
        type(":Ship-To.Street\nAddress:_XLineEdit_2", "Street Addr line2");
        type(":Ship-To.Street\nAddress:_XLineEdit_3", "Street Addr line 3");
        type(":Ship-To.City:_XLineEdit", "Alaska");
        type(":_state_QLineEdit_7", "WDC");
        type(":Ship-To.Postal Code:_XLineEdit", "235235");
        clickItem(":Ship-To._country_XComboBox", "United States", 0, 0, 1, Qt.LeftButton);
        snooze(1);
        clickItem(":Ship-To._honorific_XComboBox", "Mr",0,0,1,Qt.LeftButton);
        type(":Ship-To._first_XLineEdit", "Kunal");
        type(":Ship-To._middle_XLineEdit", "R");
        type(":Ship-To._last_XLineEdit", "Joshi");
        type(":Ship-To._title_XLineEdit", "Associate Consultant");
        type(":Ship-To._phone_XLineEdit", "23432");
        type(":Ship-To._fax_XLineEdit", "23425");
        type(":Ship-To._email_XLineEdit", "kunal@test.com");
        type(":_commission_XLineEdit", "7.5");
        if(findObject(":Defaults:._shipform_XComboBox").currentText!= "STANDARD-PACKING-LIST")
            clickItem(":Defaults:._shipform_XComboBox", "STANDARD-PACKING-LIST",0,0,1,Qt.LeftButton);
        snooze(2);
        if(findObject(":Defaults:._shipchrg_XComboBox")!="ADDCHARGE-Add Shipping Charges to Order")
            clickItem(":Defaults:._shipchrg_XComboBox", "ADDCHARGE-Add Shipping Charges to Order",0,0,1,Qt.LeftButton);
        clickButton(":Ship-To.Save_QPushButton");
        snooze(2);
        waitForObject(":_addressStack.New_QPushButton_2");
        clickButton(":_addressStack.New_QPushButton_2");
        waitForObject(":_shipToNumber_XLineEdit");
        type(":_shipToNumber_XLineEdit", "Store2");
        type(":_name_XLineEdit_13", "Old Towne Store 2");
        if(findObject(":Ship-To.Default_QCheckBox").checked)
            clickButton(":Ship-To.Default_QCheckBox");
        type(":Ship-To.Street\nAddress:_XLineEdit", "Street Addr line11");
        type(":Ship-To.Street\nAddress:_XLineEdit_2", "Street Addr line22");
        type(":Ship-To.Street\nAddress:_XLineEdit_3", "Street Addr line 33");
        type(":Ship-To.City:_XLineEdit", "Alaska");
        type(":_state_QLineEdit_7", "WDC");
        type(":Ship-To.Postal Code:_XLineEdit", "345235");
        clickItem(":Ship-To._country_XComboBox", "United States", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Ship-To._honorific_XComboBox");
        clickItem(":Ship-To._honorific_XComboBox", "Mr",0,0,1,Qt.LeftButton);
        waitForObject(":Ship-To._first_XLineEdit");
        type(":Ship-To._first_XLineEdit", "Rakesh");
        type(":Ship-To._middle_XLineEdit", "H");
        type(":Ship-To._last_XLineEdit", "Mittal");
        type(":Ship-To._title_XLineEdit", "Senior Consultant");
        type(":Ship-To._phone_XLineEdit", "23432");
        type(":Ship-To._fax_XLineEdit", "23425");
        type(":Ship-To._email_XLineEdit", "rakesh@test.com");
        type(":_commission_XLineEdit", "7.5");
        waitForObject(":Defaults:._shipform_XComboBox");
        if(findObject(":Defaults:._shipform_XComboBox").currentText!= "STANDARD-PACKING-LIST")
            clickItem(":Defaults:._shipform_XComboBox", "STANDARD-PACKING-LIST",0,0,1,Qt.LeftButton);
        snooze(2);
        waitForObject(":Defaults:._shipchrg_XComboBox");
        if(findObject(":Defaults:._shipchrg_XComboBox")!="ADDCHARGE-Add Shipping Charges to Order")
            clickItem(":Defaults:._shipchrg_XComboBox", "ADDCHARGE-Add Shipping Charges to Order",0,0,1,Qt.LeftButton);	
        snooze(2);
        waitForObject(":Ship-To.Save_QPushButton");
        clickButton(":Ship-To.Save_QPushButton");
        snooze(2);
        waitForObject(":Customer.Save_QPushButton");
        clickButton(":Customer.Save_QPushButton");
        waitForObject(":Customer.Cancel_QPushButton");
        clickButton(":Customer.Cancel_QPushButton");
        test.log("Customer: TTOYS created");
        snooze(1);
    }catch(e){test.fail("Exception in creating Customer");} 
    
    
    //----------------Create Customer Group---------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
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
        waitForObject(":_listTab_XTreeWidget");
        clickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Search For Customer.Select_QPushButton");
        clickButton(":Search For Customer.Select_QPushButton");
        waitForObject(":GroupBox1.Save_QPushButton");
        clickButton(":GroupBox1.Save_QPushButton");
        waitForObject(":List Customer Groups._custgrp_XTreeWidget");
        if(object.exists(":_custgrp.US-VA_QModelIndex"))
            test.pass("Customer Group Created");
        else test.fail("Customer Group not Created");
        snooze(1);
        waitForObject(":List Customer Groups.Close_QPushButton");
        clickButton(":List Customer Groups.Close_QPushButton");
        snooze(1);
    }catch(e){test.fail("Exception in creating Customer Groups");}   
    
    //-----------------Define: Reason Codes---------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
        snooze(0.5);
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
        if(object.exists("{column='0' container=':List Reason Codes._rsncode_XTreeWidget' text='SO-DAMAGED-RETURNED' type='QModelIndex'}"))
                test.pass("Reason Code Created:SO-DAMAGED-RETURNED");
        else test.fail("Reason Code not Created:SO-DAMAGED-RETURNED");
        
        
        waitForObject(":List Reason Codes.New_QPushButton");
        clickButton(":List Reason Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_13");
        type(":_code_XLineEdit_13", "SO-WRONG-RETURNED");
        type(":_description_XLineEdit_25", "SO Wrong Product - Returned on CM");
        waitForObject(":Reason Code.Save_QPushButton");
        clickButton(":Reason Code.Save_QPushButton");
        waitForObject(":List Reason Codes._rsncode_XTreeWidget");
        if(object.exists(":_rsncode.SO-WRONG-RETURNED_QModelIndex"))
            test.pass("Reason Code Created:SO-WRONG-RETURNED");
        else test.fail("Reason Code not Created:SO-WRONG-RETURNED");
        waitForObject(":List Reason Codes.Close_QPushButton");
        clickButton(":List Reason Codes.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Reason Codes");} 
    
    //---------------Define Pricing Schedule---------------
    try{
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
        
        type(":_qtyBreak_XLineEdit_3", "0");
        type(":_baseTab_XLineEdit", "9.99");
        waitForObject(":Pricing Schedule Item.Save_QPushButton");
        clickButton(":Pricing Schedule Item.Save_QPushButton");    
        
        waitForObject(":Pricing Schedule.New_QPushButton");
        clickButton(":Pricing Schedule.New_QPushButton");
        waitForObject(":_widgetStack._itemNumber_ItemLineEdit");
        type(":_widgetStack._itemNumber_ItemLineEdit", "YTRUCK1");
        type(":_qtyBreak_XLineEdit_3", "100");
        type(":_baseTab_XLineEdit", "9.5");
        waitForObject(":Pricing Schedule Item.Save_QPushButton");
        clickButton(":Pricing Schedule Item.Save_QPushButton");    
        
        waitForObject(":Pricing Schedule.New_QPushButton");
        clickButton(":Pricing Schedule.New_QPushButton");
        waitForObject(":_widgetStack._itemNumber_ItemLineEdit");
        type(":_widgetStack._itemNumber_ItemLineEdit", "YTRUCK1");
        type(":_qtyBreak_XLineEdit_3", "500");
        type(":_baseTab_XLineEdit", "9.25");
        waitForObject(":Pricing Schedule Item.Save_QPushButton");
        clickButton(":Pricing Schedule Item.Save_QPushButton");    
        
        waitForObject(":GroupBox1.Save_QPushButton_2");
        clickButton(":GroupBox1.Save_QPushButton_2");
        
        waitForObject(":_ipshead_XTreeWidget");
        if(object.exists(":_ipshead.BASE_QModelIndex"))
            test.pass("Pricing Schedule created:BASE");
        else test.fail("Pricing Schedule not created:BASE");
    }catch(e){test.fail("Exception in defining Pricing Schedule");}
    
    //--------Pricing Schedule: FREIGHT-BULK-------------
    try{
        waitForObject(":List Pricing Schedules.New_QPushButton");
        clickButton(":List Pricing Schedules.New_QPushButton");
        waitForObject(":GroupBox1._name_XLineEdit_2");
        type(":GroupBox1._name_XLineEdit_2", "FREIGHT-BULK");
        type(":GroupBox1._descrip_XLineEdit_2", "Freight Pricing for Bulk Items");
        
        clickButton(":Pricing Schedule.New_QPushButton");
        waitForObject(":Type.Freight_QRadioButton_2");
        clickButton(":Type.Freight_QRadioButton_2");
        waitForObject(":_typeFreightGroup.Price per N/A_QRadioButton");
        clickButton(":_typeFreightGroup.Price per N/A_QRadioButton");
        waitForObject(":_qtyBreakFreight_XLineEdit_2");
        type(":_qtyBreakFreight_XLineEdit_2", "0");
        type(":_freightRateGroup_XLineEdit_2", ".50");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            clickButton(":From.All Sites_QRadioButton_2");
        else if(appEdition=="PostBooks")
            test.xverify(object.exists(":From.All Sites_QRadioButton_2"), "From All Sites Radiobutton not found");
        
        clickButton(":_shipViaFreightGroup.All Ship Vias_QRadioButton_2");
        clickButton(":To.All Shipping Zones_QRadioButton_2");
        clickButton(":_freightClassGroup.Selected:_QRadioButton_2");
        clickItem(":_freightClassGroup._freightClass_XComboBox_2", "BULK-Bulk Freight",0,0,1,Qt.LeftButton);
        clickButton(":Pricing Schedule Item.Save_QPushButton");
        
        waitForObject(":GroupBox1.Save_QPushButton_2");
        clickButton(":GroupBox1.Save_QPushButton_2");
        waitForObject(":_ipshead_XTreeWidget");
        if(object.exists(":_ipshead.FREIGHT-BULK_QModelIndex"))
            test.pass("Pricing Schedule created:FREIGHT-BULK");
        else test.fail("Pricing Schedule not created:FREIGHT-BULK");
    }catch(e){test.fail("Exception in defining Pricing Schedule");}
    
    //-----------Pricing Schedule: FREIGHT-TTOYS-BULK-------------
    try{
        waitForObject(":List Pricing Schedules.New_QPushButton");
        clickButton(":List Pricing Schedules.New_QPushButton");
        waitForObject(":GroupBox1._name_XLineEdit_2");
        type(":GroupBox1._name_XLineEdit_2", "FREIGHT-TTOYS-BULK");
        waitForObject(":GroupBox1._descrip_XLineEdit_2");
        type(":GroupBox1._descrip_XLineEdit_2", "Freight Pricing for Bulk Toys");
        
        waitForObject(":Pricing Schedule.New_QPushButton");
        clickButton(":Pricing Schedule.New_QPushButton");
        waitForObject(":Type.Freight_QRadioButton_2");
        clickButton(":Type.Freight_QRadioButton_2");
        waitForObject(":_typeFreightGroup.Price per N/A_QRadioButton");
        clickButton(":_typeFreightGroup.Price per N/A_QRadioButton");
        waitForObject(":_qtyBreakFreight_XLineEdit_2");
        type(":_qtyBreakFreight_XLineEdit_2", "0");
        type(":_freightRateGroup_XLineEdit_2", ".40");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            clickButton(":From.All Sites_QRadioButton_2");
        else if(appEdition=="PostBooks")
            test.xverify(object.exists(":From.All Sites_QRadioButton_2"), "From All Sites Radiobutton not found");
        
        clickButton(":_shipViaFreightGroup.All Ship Vias_QRadioButton_2");
        clickButton(":To.All Shipping Zones_QRadioButton_2");
        clickButton(":_freightClassGroup.Selected:_QRadioButton_2");
        clickItem(":_freightClassGroup._freightClass_XComboBox_2", "BULK-Bulk Freight",0,0,1,Qt.LeftButton);
        clickButton(":Pricing Schedule Item.Save_QPushButton");
        
        waitForObject(":GroupBox1.Save_QPushButton_2");
        clickButton(":GroupBox1.Save_QPushButton_2");
        waitForObject(":_ipshead_XTreeWidget");
        if(object.exists("{column='0' container=':_ipshead_XTreeWidget' text='FREIGHT-TTOYS-BULK' type='QModelIndex'}"))
            test.pass("Pricing Schedule created:FREIGHT-TTOYS-BULK");
        
        waitForObject(":List Pricing Schedules.Close_QPushButton");
        clickButton(":List Pricing Schedules.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Pricing Schedule");}
    
    
    //-----------Assign Pricing Schedule---------------   
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Pricing");
        activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Pricing");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Pricing_QMenu", "Pricing Schedule Assignments...");
        activateItem(":xTuple ERP: OpenMFG Edition.Pricing_QMenu", "Pricing Schedule Assignments...");
        
        //----------Pricing Schdule Assignment:BASE----------------
        waitForObject(":List Pricing Schedule Assignments.New_QPushButton");
        clickButton(":List Pricing Schedule Assignments.New_QPushButton");
        waitForObject(":_customerGroup.Selected Customer Type:_QRadioButton");
        clickButton(":_customerGroup.Selected Customer Type:_QRadioButton");    
        if(findObject(":_ipshead_XComboBox").currentText!= "BASE - Base Price Schedule")
            clickItem(":_ipshead_XComboBox","BASE",0,0,1,Qt.LeftButton);
        clickButton(":Pricing Schedule Assignment.Save_QPushButton");
        waitForObject(":List Pricing Schedule Assignments._ipsass_XTreeWidget");
        if(object.exists(":_ipsass.ANY_QModelIndex"))
            test.pass("Pricing Schedule Assignment created: BASE");
        else test.fail("Pricing Schedule Assignment not created: BASE");
        
        
        //----------Pricing Schdule Assignment: FREIGHT-BULK----------------
        waitForObject(":List Pricing Schedule Assignments.New_QPushButton");
        clickButton(":List Pricing Schedule Assignments.New_QPushButton");
        waitForObject(":_customerGroup.Customer Type Pattern:_QRadioButton_2");
        clickButton(":_customerGroup.Customer Type Pattern:_QRadioButton_2");
        waitForObject(":_customerGroup._customerType_XLineEdit_2");
        type(":_customerGroup._customerType_XLineEdit_2", "*");
        type(":_ipshead_XComboBox", "FREIGHT-BULK");
        clickButton(":Pricing Schedule Assignment.Save_QPushButton");
        waitForObject(":List Pricing Schedule Assignments._ipsass_XTreeWidget");
        if(object.exists(":_ipsass.FREIGHT-BULK_QModelIndex"))
            test.pass("Pricing Schedule Assignment created: FREIGHT-BULK");
        else test.fail("Pricing Schedule Assignment not created: FREIGHT-BULK");
        
        //----------Pricing Schdule Assignment: FREIGHT-TTOYS-BULK-----------
        waitForObject(":List Pricing Schedule Assignments.New_QPushButton");
        clickButton(":List Pricing Schedule Assignments.New_QPushButton");
        waitForObject(":_customerGroup.Selected Customer:_QRadioButton_2");
        clickButton(":_customerGroup.Selected Customer:_QRadioButton_2");
        waitForObject(":_customerGroup._customerNumber_CLineEdit_2");
        type(":_customerGroup._customerNumber_CLineEdit_2", "ttoys");
        type(":_ipshead_XComboBox", "FREIGHT-TTOYS-BULK");
        clickButton(":Pricing Schedule Assignment.Save_QPushButton");
        waitForObject(":List Pricing Schedule Assignments._ipsass_XTreeWidget");
        if(object.exists(":_ipsass.FREIGHT-BULK_QModelIndex_2"))
            test.pass("Pricing Schedule Assignment created: FREIGHT-TTOYS-BULK");
        else test.fail("Pricing Schedule Assignment not created: FREIGHT-TTOYS-BULK");
        
        waitForObject(":List Pricing Schedule Assignments.Close_QPushButton");
        clickButton(":List Pricing Schedule Assignments.Close_QPushButton");
    }catch(e){test.fail("Exception in pricing Schedule assignment");}  
    
    if(appEdition=="Manufacturing"||appEdition=="Standard")
    {
        try{     
            //-----------Create Item site for INTRAN------------
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "List...");
            activateItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "List...");
            
            waitForObject(":List Sites.New_QPushButton_2");
            clickButton(":List Sites.New_QPushButton_2");
            waitForObject(":_sitetype_XComboBox_2");
            if(findObject(":_sitetype_XComboBox_2").currentText!="INTRAN")
                clickItem(":_sitetype_XComboBox_2", "INTRAN",0,0,1,Qt.LeftButton);
            type(":_code_XLineEdit_14", "INTRAN");
            type(":_description_XLineEdit_26", "Intransit Warehouse");
            type(":Site.Street\nAddress:_XLineEdit", "#582, Charmy Ganesh Nilayam");
            type(":Site.Street\nAddress:_XLineEdit_2", "Vittal Rao Colony");
            type(":Site.Street\nAddress:_XLineEdit_3", "Santh Nagar");
            type(":Site.City:_XLineEdit", "Pune");
            type(":_state_QLineEdit_6", "Maharastra");
            type(":_addressGroup.Postal Code:_XLineEdit", "534235");
            clickItem(":_addressGroup._country_XComboBox_2", "India", 0, 0, 1, Qt.LeftButton);
            clickTab(":Site.qt_tabwidget_tabbar_QTabBar","Contact");
            snooze(2);
            
            type(":_honorific_QLineEdit_3", "Mr");
            type(":_contactGroup._first_XLineEdit_2", "Gaurav");
            type(":_contactGroup._middle_XLineEdit_2", "S");
            type(":_contactGroup._last_XLineEdit_2", "Gulati");
            type(":_contactGroup._title_XLineEdit_2", "Associate Consultant");
            type(":_contactGroup._phone_XLineEdit_2", "235423");
            type(":_contactGroup._fax_XLineEdit_2", "252342");
            type(":_contactGroup._email_XLineEdit_2", "gauraasv@testing.com");
            type(":Site._main_XLineEdit", "01-01-1950-01");
            
            clickTab(":Site.qt_tabwidget_tabbar_QTabBar","General");
            snooze(2);
            clickButton(":_generalTab.Transit Site_QRadioButton");
            waitForObject(":_transitGroup._shipvia_XComboBox");
            if(findObject(":_transitGroup._shipvia_XComboBox")!= "UPS-GROUND-UPS Ground")
                clickItem(":_transitGroup._shipvia_XComboBox", "UPS-GROUND-UPS Ground",0,0,1,Qt.LeftButton);
            if(findObject(":_shipform_XComboBox_2").currentText!="INTRAN-PACKING-LIST")
                clickItem(":_shipform_XComboBox_2", "INTRAN-PACKING-LIST",0,0,1,Qt.LeftButton);
            if(findObject(":_costcat_XComboBox_5").currentText!= "CCINTRAN-Intransit Warehouse")
                type(":_costcat_XComboBox_5", "CCINTRAN-Intransit");
            type(":_transitGroup._shipcomments_QTextEdit", "This is a internal shipment between two Prodiem Toys warehouses. If you have any questions please call Anna Falactic at 757-322-2101.");	
            waitForObject(":Save_QPushButton_3");
            clickButton(":Save_QPushButton_3");
            waitForObject(":List Sites._warehouse_XTreeWidget_2");
            if(object.exists(":_warehouse.INTRAN_QModelIndex"))
                test.pass("Site Created:INTRAN");
            else test.fail("Site not Created:INTRAN");
            
            waitForObject(":List Sites.Close_QPushButton_2");
            clickButton(":List Sites.Close_QPushButton_2");
            test.log("Item site for INTRAN created");
            
        }catch(e){test.fail("Exception in creating INTRAN site:"+e);}
        
        try{
            //-----------Configure: Inventory Module--------------
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Inventory...");
            activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Inventory...");
            waitForObject(":_defaultTransWhs_WComboBox");
            if(findObject(":_defaultTransWhs_WComboBox").currentText!= "INTRAN");
            clickItem(":_defaultTransWhs_WComboBox", "INTRAN",0,0,1,Qt.LeftButton);
            clickButton(":Inventory Configuration.Save_QPushButton");
            test.log("Configure Module: Inventory");
        }catch(e){test.fail("Exception in configuring Inventory module:"+e);}
        
    }
        
    else if(appEdition=="PostBooks")
    {
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            
            menu = waitForObject(":xTuple ERP: OpenMFG Edition.Site_QMenu");
            menuItem = "&List...";
            
            actions = menu.actions();
            for(i=0;i<actions.count();i++)
                if(actions.at(i).text == menuItem || i==actions.count()-1) break;
            if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
            else test.pass(menuItem+"not found in "+appEdition);
        }catch(e){test.fail("Exception in verifying menu in postbooks:"+e);}
        
    } 
    
    
    
}
