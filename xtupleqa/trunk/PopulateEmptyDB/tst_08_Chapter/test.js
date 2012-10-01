
function main()
{
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER");       
    
   
    var appEdition = findApplicationEdition();
    
    
    //----------Create Customer Type------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 10, 10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Customer Types_QModelIndex");
        mouseClick(":Master Information.Customer Types_QModelIndex", 55, 7, 0, Qt.LeftButton);
        
        
        waitForObject(":List Customer Types.New_QPushButton");
        clickButton(":List Customer Types.New_QPushButton");   
        waitForObject(":Work Center._code_XLineEdit");
        type(":Work Center._code_XLineEdit", "NORMAL");
        type(":Work Center._description_XLineEdit", "Normal Customer");
        snooze(0.5);
        if(!findObject(":Customer Type.Enable Characteristics Profile_QGroupBox").checked)
            type(":Customer Type.Enable Characteristics Profile_QGroupBox"," ");
        
        snooze(1);
        clickButton(":Enable Characteristics Profile.New_QPushButton");
        
        waitForObject(":_value_XLineEdit_4");
        type(":_value_XLineEdit_4", "Standard");
        if(!findObject(":Customer Characteristic.Default_QCheckBox").checked)
            clickButton(":Customer Characteristic.Default_QCheckBox");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        clickButton(":Enable Characteristics Profile.New_QPushButton");
        
        waitForObject(":_value_XLineEdit_4");    
        type(":_value_XLineEdit_4", "Complete");
        if(findObject(":Customer Characteristic.Default_QCheckBox").checked)
            clickButton(":Customer Characteristic.Default_QCheckBox");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        clickButton(":Enable Characteristics Profile.New_QPushButton");
        
        waitForObject(":_value_XLineEdit_4");    
        type(":_value_XLineEdit_4", "None");
        if(findObject(":Customer Characteristic.Default_QCheckBox").checked)
            clickButton(":Customer Characteristic.Default_QCheckBox");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Customer Types._custtype_XTreeWidget");
        if(object.exists(":_custtype.NORMAL_QModelIndex"))
            test.pass("Customer Type created: NORMAL");
        else test.fail("Customer Type not created: NORMAL");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
    }catch(e){test.fail("Exception in Creating Customer types:"+e);}
    
    
    //---------------Create Shipping Zone--------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 71, 11, 0, Qt.LeftButton);
        waitForObject(":Master Information.Shipping Zones_QModelIndex");
        mouseClick(":Master Information.Shipping Zones_QModelIndex", 60, 5, 0, Qt.LeftButton);
        
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC1");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 1");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if (object.exists("{column='0' container=':List Shipping Zones._shipzone_XTreeWidget' text='DOMESTIC1' type='QModelIndex'}"))
            test.pass("Shipping Zone created: DOMESTIC1");
        else test.fail("Shipping Zone created: DOMESTIC1");
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC2");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 2");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if (object.exists("{column='0' container=':List Shipping Zones._shipzone_XTreeWidget' text='DOMESTIC2' type='QModelIndex'}"))
            
            test.pass("Shipping Zone created: DOMESTIC2");
        
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC3");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 3");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if (object.exists("{column='0' container=':List Shipping Zones._shipzone_XTreeWidget' text='DOMESTIC3' type='QModelIndex'}"))
            
            test.pass("Shipping Zone created: DOMESTIC3");
        
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC4");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 4");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if (object.exists("{column='0' container=':List Shipping Zones._shipzone_XTreeWidget' text='DOMESTIC4' type='QModelIndex'}"))
            
            test.pass("Shipping Zone created: DOMESTIC4");
        
        waitForObject(":List Shipping Zones.New_QPushButton");
        clickButton(":List Shipping Zones.New_QPushButton");
        waitForObject(":_name_XLineEdit_10");
        type(":_name_XLineEdit_10", "DOMESTIC5");
        type(":_description_XLineEdit_22", "Domestic Shipping Zone 5");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Shipping Zones._shipzone_XTreeWidget");
        if(object.exists(":_shipzone.DOMESTIC5_QModelIndex"))
            test.pass("Shipping Zone created: DOMESTIC5");
        else test.fail("Shipping Zone not created");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
    }catch(e){test.fail("Exception in created Shipping Zones:"+e);}
    
    
    //---------Create Shipping Vias---------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 71, 11, 0, Qt.LeftButton);
        waitForObject(":Master Information.Ship Vias_QModelIndex");
        mouseClick(":Master Information.Ship Vias_QModelIndex", 35, 5, 0, Qt.LeftButton);
        
        waitForObject(":List Ship Vias.New_QPushButton");
        clickButton(":List Ship Vias.New_QPushButton");
        waitForObject(":Ship Via._code_XLineEdit");
        type(":Ship Via._code_XLineEdit", "UPS-GROUND");
        type(":Ship Via._description_XLineEdit", "UPS Ground");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Ship Vias._shipvia_XTreeWidget");
        if(object.exists(":_shipvia.UPS-GROUND_QModelIndex"))
            test.pass("Shipping Vias created: UPS-GROUND");
        else test.fail("Shipping Vias not created: UPS-GROUND");
        waitForObject(":List Ship Vias.New_QPushButton");
        clickButton(":List Ship Vias.New_QPushButton");
        waitForObject(":Ship Via._code_XLineEdit");
        type(":Ship Via._code_XLineEdit", "FEDEXGROUND");
        type(":Ship Via._description_XLineEdit", "FedEx Ground");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Ship Vias._shipvia_XTreeWidget");
        if(!clickItem(":List Ship Vias._shipvia_XTreeWidget", "FEDEXGROUND", 5, 5, 1, Qt.LeftButton))
            test.pass("Shipping Vias created: FEDEXGROUND");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton"); 
        
    }catch(e){test.fail("Exception in creating Shipping Vias");}
    
    //-----------Create Shipping Charges--------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 71, 11, 0, Qt.LeftButton);
        waitForObject(":Master Information.Shipping Charge Types_QModelIndex");
        mouseClick(":Master Information.Shipping Charge Types_QModelIndex", 72, 7, 0, Qt.LeftButton);
        
        waitForObject(":List Shipping Charge Types.New_QPushButton");
        clickButton(":List Shipping Charge Types.New_QPushButton");
        waitForObject(":Shipping Charge Type._name_XLineEdit");
        type(":Shipping Charge Type._name_XLineEdit", "NOCHARGE");
        type(":Shipping Charge Type._description_XLineEdit", "No Charge for Shipping");
        if(findObject(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox").checked)
            clickButton(":Shipping Charge Type.Customer may pay Freight Charges_QCheckBox");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
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
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Shipping Charge Types._shipchrg_XTreeWidget");
        if(object.exists("{column='0' container=':List Shipping Charge Types._shipchrg_XTreeWidget' text='ADDCHARGE' type='QModelIndex'}"))
            test.pass("Shipping Charges Types created: ADDCHARGE");
        else test.fail("Shipping Charges Types created: ADDCHARGE");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
    }catch(e){test.fail("Exception in creating Shipping Charge:"+e);} 
    
    //------Define Tax Authorities-------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Authorities...");
        activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Authorities...");
        
        
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");           
        waitForObject(":_code_XLineEdit_15");
        findObject(":_code_XLineEdit_15").clear();
        type(":_code_XLineEdit_15", "VA-IRS");
        type(":_name_XLineEdit_22", "Virginia IRS");
        type(":_extref_XLineEdit", "Smith");
        if(findObject(":_currency_XComboBox_2").currentText!= "USD - $")
            type(":_currency_XComboBox_2", "USD");
        type(":Tax Authority._county_QLineEdit", "United States");
        type(":groupBox.XLineEdit_XLineEdit", "Street Addr Line1");
        type(":groupBox.XLineEdit_XLineEdit_2", "Street addr line2");
        type(":groupBox.XLineEdit_XLineEdit_3", "Street Addr line3");
        waitForObject(":groupBox._state_XComboBox_2");
        clickItem(":groupBox._state_XComboBox_2", "VA", 0, 0, 1, Qt.LeftButton);
        
        type(":groupBox.XLineEdit_XLineEdit_5", "24186");
        
        clickButton(":Tax Authority.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_4");
        if(object.exists("{column='0' container=':_list_XTreeWidget_4' text='TAX-AUTH1' type='QModelIndex'}"))
            test.pass("Tax Authority created:TAX-AUTH1");
        
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
    }catch(e){test.fail("Exception in defining Tax Authorities:"+e);}
    
    
    //---------------Define: Tax Codes-----------------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Codes...");
        activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Codes...");
        
        waitForObject(":List Tax Codes.New_QPushButton");
        clickButton(":List Tax Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_12");
        type(":_code_XLineEdit_12", "VATAX");
        type(":_description_XLineEdit_23", "Virginia Sales Tax");
        waitForObject(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit","01-01-2510-01");
        nativeType("<Tab>");
        waitForObject(":Tax Code._taxClass_XComboBox");
        clickItem(":Tax Code._taxClass_XComboBox","1-Legacy Class 1",1,0,0,Qt.LeftButton);
        waitForObject(":Tax Code._taxauth_XComboBox");
        clickItem(":Tax Code._taxauth_XComboBox","VA-IRS",1,0,0,Qt.LeftButton);
        clickButton(":_frame.New_QPushButton_2");
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "5");
        clickButton(":Tax Code Rate.Save_QPushButton");
        waitForObject(":xTuple ERP: *_QPushButton");
        clickButton(":xTuple ERP: *_QPushButton");
        waitForObject(":List Tax Codes._tax_XTreeWidget");
        if(object.exists(":_tax.VATAX_QModelIndex"))
            test.pass("Tax Code created:VATAX");
        else test.fail("Tax Code created:VATAX");
        
        waitForObject(":List Tax Codes.Close_QPushButton");
        clickButton(":List Tax Codes.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Tax Codes");}
    
    //----Define Tax Zones----
    defineTaxZone("VA-SALES-TAX-ZONE", "Virginia Sales Tax Zone");	
    
    //----------------Define: Shipping Forms---------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 71, 11, 0, Qt.LeftButton);
        waitForObject(":Master Information.Shipping Forms_QModelIndex");
        mouseClick(":Master Information.Shipping Forms_QModelIndex", 61, 4, 0, Qt.LeftButton);
        
        waitForObject(":List Shipping Forms.New_QPushButton");
        clickButton(":List Shipping Forms.New_QPushButton");
        waitForObject(":_name_XLineEdit_11");
        type(":_name_XLineEdit_11", "STANDARD-PACKING-LIST");
        waitForObject(":_report_XComboBox");
        if(findObject(":_report_XComboBox").currentText!="PackingList");
        clickItem(":_report_XComboBox", "PackingList",0,0,1,Qt.LeftButton);
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Shipping Forms._bolformat_XTreeWidget");
        snooze(1);
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
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        snooze(1);
        
        waitForObject(":List Shipping Forms._bolformat_XTreeWidget");
        if(object.exists("{column='0' container=':List Shipping Forms._bolformat_XTreeWidget' text='INTRAN-PACKING-LIST' type='QModelIndex'}"))
            test.pass("Shipping Forms created: INTRAN-PACKING-LIST");
        else test.fail("Shipping Forms not created: INTRAN-PACKING-LIST");
        
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Shipping Forms defined");
    }catch(e){test.fail("Exception in defining Shipping Forms:"+e);}
    
    
    //-----------Chart Of Accounts-------------------------------
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    
    COA("01","01","4000","01","Revenue","Revenue","SI");
    
    COA("01","01","4800","01","Customer Credits","Revenue","OI");
    
    COA("01","01","2445","01","Deferred Revenue","Liability","CL");
    
    COA("01","01","1100","01","Accounts Receivable","Asset","AR");
    
    COA("01","01","5000","01","Cost Of Goods Sold","Expense","COGS");
    
    COA("01","01","4700","01","Returns","Revenue","SI");
    
    COA("01","01","5710","01","Returned Goods","Expense","COGS");
    
    COA("01","01","5720","01","Cost of Warranty","Expense","COGS");
    
    COA("01","01","4810","01","Customer Discounts","Revenue","OI");
    waitForObject(":Chart of Accounts.Close_QPushButton_2");
    clickButton(":Chart of Accounts.Close_QPushButton_2");
    
    
    
    //-------------Create Sales Category----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 71, 11, 0, Qt.LeftButton);
        waitForObject(":Accounting Mappings.Sales Categories_QModelIndex");
        mouseClick(":Accounting Mappings.Sales Categories_QModelIndex", 21, 5, 0, Qt.LeftButton);
        waitForObject(":List Sales Categories.New_QPushButton");
        clickButton(":List Sales Categories.New_QPushButton");
        waitForObject(":_category_XLineEdit_3");
        type(":_category_XLineEdit_3", "NORMAL-SALE");
        type(":Work Center._description_XLineEdit", "Normal Sale");
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit","01-01-4000-01");
        nativeType("<Tab>");
        
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2","01-01-4800-01");
        nativeType("<Tab>");
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3","01-01-1100-01");
        nativeType("<Tab>");
        
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Sales Categories._salescat_XTreeWidget");
        if(object.exists(":_salescat.NORMAL-SALE_QModelIndex"))
            test.pass("Sales Category created: NORMAL-SALE");
        else test.fail("Sales Category not created: NORMAL-SALE");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in defining Sales Category"+ e);}
    
    //----------------A/R Account Assignments----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 81, 10, 0, Qt.LeftButton);
        waitForObject(":Accounting Mappings.Receivables Assignments_QModelIndex");
        mouseClick(":Accounting Mappings.Receivables Assignments_QModelIndex", 23, 5, 0, Qt.LeftButton);
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":_customerTypeGroup.Selected Customer Type:_QRadioButton");
        clickButton(":_customerTypeGroup.Selected Customer Type:_QRadioButton");
        if(findObject(":_customerTypeGroup._customerTypes_XComboBox").currentText!="NORMAL-Normal Customer")
            clickItem(":_customerTypeGroup._customerTypes_XComboBox", "NORMAL",0,0,1,Qt.LeftButton);   
        
        
        if(appEdition=="PostBooks")
        {
            waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit","01-01-1100-01");
            nativeType("<Tab>");
            
            
            waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2","01-01-4800-01");
            nativeType("<Tab>");
            
            waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3","01-01-4060-01");
            nativeType("<Tab>")
                    
                    
                    waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_4");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_4","01-01-4810-01");
            nativeType("<Tab>")
                }      
        
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {       
            
            waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit","01-01-1100-01");
            nativeType("<Tab>");
            
            
            waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2","01-01-4800-01");
            nativeType("<Tab>");
            
            waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3","01-01-4060-01");
            nativeType("<Tab>")
                    
                    
                    waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_4");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_4","01-01-2445-01");
            nativeType("<Tab>")
                    if(object.exists(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_5"))
            {
                type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_5", "01-01-4810-01");
                type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_5", "<Tab>");
                snooze(0.5);
            }
        }
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":_stack._araccnt_XTreeWidget");
        if(object.exists(":_araccnt.NORMAL_QModelIndex_2"))
            test.pass("A/R Accounts Assignments done");
        else test.fail("A/R Accounts Assignments not created");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton"); 
        test.log("A/R Accounts Assigned");
    }catch(e){test.fail("Exception in defining Accounting Assignments"+ e);}
    
    
    
    //----------------Customer Form Assignments--------------------
    try{
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 81, 10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Customer Form Assignments_QModelIndex");
        mouseClick(":Master Information.Customer Form Assignments_QModelIndex", 54, 7, 0, Qt.LeftButton);
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
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Customer Form Assignments._custform_XTreeWidget");
        if(object.exists(":_custform.NORMAL_QModelIndex"))
            test.pass("Customer Form Assignments done");
        else test.fail("Customer Form Assignments not created");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in defining Form assignments");}
    
    
    //--------------Define Forms--------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Master Information.Forms_QModelIndex");
        mouseClick(":Master Information.Forms_QModelIndex", 29, 12, 0, Qt.LeftButton);
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
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        snooze(1);
        waitForObject(":List Forms._form_XTreeWidget");
        if(object.exists(":_form.SO-Acknowledge_QModelIndex"))
            test.pass("Form Created: SO-Acknowledge");
        else test.fail("Form not Created: SO-Acknowledge");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("System: Forms defined");
    }catch(e){test.fail("Exception in defining Forms");}   
    
    //------------Configure Sales Module------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 81, 10, 0, Qt.LeftButton);
        waitForObject(":Configure.Sales_QModelIndex");
        mouseClick(":Configure.Sales_QModelIndex", 18, 6, 0, Qt.LeftButton);
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
        
        if(!findObject(":Credit Control.Allocate Credit Memos to New Sales Order on Save_QCheckBox").checked)		
            clickButton(":Credit Control.Allocate Credit Memos to New Sales Order on Save_QCheckBox");
        if(!findObject(":general.Print Sales Order on Save by Default_QCheckBox").checked)
            clickButton(":general.Print Sales Order on Save by Default_QCheckBox");
        if(!findObject(":Date Control.Enable Promise Dates_QCheckBox").checked)
            clickButton(":Date Control.Enable Promise Dates_QCheckBox");
        clickTab(":Sales Configuration.qt_tabwidget_tabbar_QTabBar", "Pricing");
        clickButton(":Pricing on Line Item Edits.Prompt before Updating_QRadioButton_2");
        clickTab(":Sales Configuration.qt_tabwidget_tabbar_QTabBar", "Invoice");
        waitForObject(":Invoice Date Source.Shipped Date_QRadioButton");
        clickButton(":Invoice Date Source.Shipped Date_QRadioButton");
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
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Sales Module Configured");
    }catch(e){test.fail("Exception in configuring Sales Module" + e);}   
    
    
    
    //------------Sales: Account Assignments-----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales", 77, 12, 0, Qt.LeftButton);
        waitForObject(":Accounting Mappings.Sales Assignments_QModelIndex");
        mouseClick(":Accounting Mappings.Sales Assignments_QModelIndex", 34, 7, 0, Qt.LeftButton);
        
        waitForObject(":List Sales Account Assignments.New_QPushButton");
        clickButton(":List Sales Account Assignments.New_QPushButton");
        waitForObject(":_customerTypes.All Customer Types_QRadioButton");
        clickButton(":_customerTypes.All Customer Types_QRadioButton");
        clickButton(":_productCategories.All Product Categories_QRadioButton");
        snooze(0.5);
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit","01-01-4000-01");
        nativeType("<Tab>");
        
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2","01-01-4800-01");
        nativeType("<Tab>");     
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3","01-01-5000-01");
        nativeType("<Tab>");
        
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            
            waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_4");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_4","01-01-4700-01");
            nativeType("<Tab>");  
            
            waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_5");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_5","01-01-5710-01");
            nativeType("<Tab>");
            
            waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_6");
            type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_6","01-01-5720-01");
            nativeType("<Tab>");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_4"), "Sales account assignment not found");
            test.xverify(object.exists(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_5"), "Sales account assignment not found");
            test.xverify(object.exists(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_6"), "Sales account assignment not found");
        }
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Sales Account Assignments._salesaccnt_XTreeWidget");
        if(object.exists(":_salesaccnt.Any_QModelIndex"))
            test.pass("Sales Account Assigned");
        else test.fail("Sales Account not assigned");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Sales Account Assignments done");
    }catch(e){test.fail("Exception in Sales Account assignment"+ e);}
    
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
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Setup...");
        
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 24, 5, 0, Qt.LeftButton);
        waitForObject(":List Sales Representatives.New_QPushButton");
        clickButton(":List Sales Representatives.New_QPushButton");
        waitForObject(":_number_XLineEdit_5");
        type(":_number_XLineEdit_5", "usge");
        waitForObject(":_name_XLineEdit_9");
        type(":_name_XLineEdit_9", "usge");
        waitForObject(":_commPrcnt_XLineEdit")
                type(":_commPrcnt_XLineEdit", "7.5");
        if(!findObject(":_stack.Active_QCheckBox"))
            clickButton(":_stack.Active_QCheckBox");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
        
    }
    catch(e){test.fail("Exception in creating Sales Rep.:"+e);}
    
    //----------------Create new Customer---------------
    try{
        
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "New...");
        activateItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "New...");
        waitForObject(":Customer.VirtualClusterLineEdit_CLineEdit");
        findObject(":Customer.VirtualClusterLineEdit_CLineEdit").clear();
        type(":Customer.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        type(":Customer._name_XLineEdit", "Tremendous Toys");
        
        waitForObject(":Customer._custtype_XComboBox");
        clickItem(":Customer._custtype_XComboBox","NORMAL-Normal Customer", 140, 11, 0, Qt.LeftButton);
        waitForObject(":Customer.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Customer.qt_tabwidget_tabbar_QTabBar", "Settings");
        
        waitForObject(":_defaultGroup._salesrep_XComboBox");
        if(findObject(":_defaultGroup._salesrep_XComboBox").currentText!= "USGE-usge")
            clickItem(":_defaultGroup._salesrep_XComboBox","USGE-usge",0,0,1,Qt.LeftButton);
        waitForObject(":_defaultGroup._shipform_XComboBox");
        clickItem(":_defaultGroup._shipform_XComboBox","STANDARD-PACKING-LIST",10, 10, 0, Qt.LeftButton); 
        waitForObject(":_settingsTab.Terms_QRadioButton");
        clickButton(":_settingsTab.Terms_QRadioButton");
        snooze(0.5);
        waitForObject(":_terms_XComboBox");
        if(findObject(":_terms_XComboBox").currentText!= "2-10N30-2% Discount in 10 Days - Net 30 Days")
            clickItem(":_terms_XComboBox","2-10N30-2% Discount in 10 Days - Net 30 Days",0,0,1,Qt.LeftButton);
        type(":groupBox_4._defaultDiscountPrcnt_XLineEdit", "10");
        type(":Maintain Item Costs.XLineEdit_XLineEdit", "50000");
        findObject(":_creditGroup._creditRating_XLineEdit_2").clear();
        type(":_creditGroup._creditRating_XLineEdit_2", "D&B");
        if(!findObject(":_creditGroup.Place on Credit Warning when Credit Limit/Grace Days is Exceeded_QCheckBox_2").checked)
            clickButton(":_creditGroup.Place on Credit Warning when Credit Limit/Grace Days is Exceeded_QCheckBox_2");
        clickButton(":_creditStatusGroup.In Good Standing_QRadioButton");
        if(!findObject(":groupBox_3.Uses Purchase Orders_QCheckBox").checked)
            clickButton(":groupBox_3.Uses Purchase Orders_QCheckBox");
        
        clickTab(":Customer.qt_tabwidget_tabbar_QTabBar", "Addresses");
        
        clickButton(":_addressTab.Ship To_QRadioButton");
        
        waitForObject(":_addressStack.New_QPushButton_2");
        clickButton(":_addressStack.New_QPushButton_2");
        waitForObject(":_shipToNumber_XLineEdit");
        type(":_shipToNumber_XLineEdit", "Store1");
        snooze(1);
        nativeType("<Tab>");
        snooze(1);
        type(":_name_XLineEdit_13", "Old Towne Store 1");
        if(!findObject(":Ship-To.Default_QCheckBox").checked)
            clickButton(":Ship-To.Default_QCheckBox");
        
        type(":Maintain Item Costs.XLineEdit_XLineEdit", "Street Addr line1");
        type(":Address.XLineEdit_XLineEdit", "Street Addr line2");
        type(":Address.XLineEdit_XLineEdit_2", "Street Addr line3");
        type(":Address.XLineEdit_XLineEdit_3", "City");
        
        waitForObject(":Address._state_XComboBox");
        clickItem(":Address._state_XComboBox","VA",15, 0, 0, Qt.LeftButton);
        type(":Address.XLineEdit_XLineEdit_4", "235235");
        
        snooze(1);
        findObject(":_commission_XLineEdit").clear();
        type(":_commission_XLineEdit", "7.5");
        if(findObject(":Defaults:._shipform_XComboBox").currentText!= "STANDARD-PACKING-LIST")
            clickItem(":Defaults:._shipform_XComboBox", "STANDARD-PACKING-LIST",0,0,1,Qt.LeftButton);
        snooze(2);
        if(findObject(":Defaults:._shipchrg_XComboBox")!="ADDCHARGE-Add Shipping Charges to Order")
            clickItem(":Defaults:._shipchrg_XComboBox", "ADDCHARGE-Add Shipping Charges to Order",0,0,1,Qt.LeftButton);
        waitForObject(":_shipToNumber_XLineEdit");
        mouseClick(":_shipToNumber_XLineEdit",55, 7, 0, Qt.LeftButton);
        snooze(1);
        nativeType("<Tab>");
        snooze(2);
        clickButton(":Ship-To.Save_QPushButton");
        snooze(2);
        waitForObject(":_addressStack.New_QPushButton_2");
        clickButton(":_addressStack.New_QPushButton_2");
        waitForObject(":_shipToNumber_XLineEdit");
        type(":_shipToNumber_XLineEdit", "Store2");
        nativeType("<Tab>");
        snooze(1);
        type(":_name_XLineEdit_13", "Old Towne Store 2");
        if(findObject(":Ship-To.Default_QCheckBox").checked)
            clickButton(":Ship-To.Default_QCheckBox");
        type(":Maintain Item Costs.XLineEdit_XLineEdit", "Street Addr line11");
        type(":Address.XLineEdit_XLineEdit", "Street Addr line22");
        type(":Address.XLineEdit_XLineEdit_2", "Street Addr line33");
        type(":Address.XLineEdit_XLineEdit_3", "City");
        waitForObject(":Address._state_XComboBox");
        clickItem(":Address._state_XComboBox","VA",15, 0, 0, Qt.LeftButton);
        type(":Address.XLineEdit_XLineEdit_4", "345235");
        findObject(":_commission_XLineEdit").clear();
        type(":_commission_XLineEdit", "7.5");
        waitForObject(":Defaults:._shipform_XComboBox");
        if(findObject(":Defaults:._shipform_XComboBox").currentText!= "STANDARD-PACKING-LIST")
            clickItem(":Defaults:._shipform_XComboBox", "STANDARD-PACKING-LIST",0,0,1,Qt.LeftButton);
        snooze(2);
        waitForObject(":Defaults:._shipchrg_XComboBox");
        if(findObject(":Defaults:._shipchrg_XComboBox")!="ADDCHARGE-Add Shipping Charges to Order")
            clickItem(":Defaults:._shipchrg_XComboBox", "ADDCHARGE-Add Shipping Charges to Order",0,0,1,Qt.LeftButton);	
        snooze(2);
        
        waitForObject(":_shipToNumber_XLineEdit");
        mouseClick(":_shipToNumber_XLineEdit",55, 7, 0, Qt.LeftButton);
        snooze(1);
        nativeType("<Tab>");
        waitForObject(":Ship-To.Save_QPushButton");
        clickButton(":Ship-To.Save_QPushButton");
        snooze(2);
        waitForObject(":Customer.Save_QPushButton");
        clickButton(":Customer.Save_QPushButton");
        waitForObject(":Customer.Cancel_QPushButton");
        clickButton(":Customer.Cancel_QPushButton");
        test.log("Customer: TTOYS created");
        snooze(1);
    }catch(e){test.fail("Exception in creating Customer:"+e);} 
    
    
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
        snooze(1);
        doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 10, 10, 1, Qt.LeftButton);
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
    }catch(e){test.fail("Exception in creating Customer Groups:"+e);}   
    
    //-----------------Define: Reason Codes---------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Accounting", 76, 10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Reason Codes_QModelIndex");
        mouseClick(":Master Information.Reason Codes_QModelIndex", 36, 5, 0, Qt.LeftButton);
        
        waitForObject(":List Reason Codes.New_QPushButton");
        clickButton(":List Reason Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_13");
        type(":_code_XLineEdit_13", "SO-DAMAGED-RETURNED");
        type(":_description_XLineEdit_25", "SO Damaged Returned on CM");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Reason Codes._rsncode_XTreeWidget");
        if(object.exists("{column='0' container=':List Reason Codes._rsncode_XTreeWidget' text='SO-DAMAGED-RETURNED' type='QModelIndex'}"))
            test.pass("Reason Code Created:SO-DAMAGED-RETURNED");
        else test.fail("Reason Code not Created:SO-DAMAGED-RETURNED");
        
        
        waitForObject(":List Reason Codes.New_QPushButton");
        clickButton(":List Reason Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_13");
        type(":_code_XLineEdit_13", "SO-WRONG-RETURNED");
        type(":_description_XLineEdit_25", "SO Wrong Product - Returned on CM");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Reason Codes._rsncode_XTreeWidget");
        if(object.exists(":_rsncode.SO-WRONG-RETURNED_QModelIndex"))
            test.pass("Reason Code Created:SO-WRONG-RETURNED");
        else test.fail("Reason Code not Created:SO-WRONG-RETURNED");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in defining Reason Codes");} 
    
    //---------------Define Pricing Schedule---------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
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
        
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "<Tab>");
        
        type(":_qtyBreak_XLineEdit_3", "0");
        type(":_baseTab.XLineEdit_XLineEdit", "9.99");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");    
        
        waitForObject(":Pricing Schedule.New_QPushButton");
        clickButton(":Pricing Schedule.New_QPushButton");
        
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "<Tab>");
        type(":_qtyBreak_XLineEdit_3", "100");
        type(":_baseTab.XLineEdit_XLineEdit", "9.5");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");     
        
        waitForObject(":Pricing Schedule.New_QPushButton");
        clickButton(":Pricing Schedule.New_QPushButton");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "<Tab>");
        type(":_qtyBreak_XLineEdit_3", "500");
        type(":_baseTab.XLineEdit_XLineEdit", "9.25");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");     
        
        waitForObject(":GroupBox1.Save_QPushButton_2");
        clickButton(":GroupBox1.Save_QPushButton_2");
        
        waitForObject(":_ipshead_XTreeWidget");
        if(object.exists(":_ipshead.BASE_QModelIndex"))
            test.pass("Pricing Schedule created:BASE");
        else test.fail("Pricing Schedule not created:BASE");
    }catch(e){test.fail("Exception in defining Pricing Schedule"+ e);}
    
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
        type(":Maintain Item Costs.XLineEdit_XLineEdit", ".50");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            clickButton(":From.All Sites_QRadioButton_2");
        else if(appEdition=="PostBooks")
            test.xverify(object.exists(":From.All Sites_QRadioButton_2"), "From All Sites Radiobutton not found");
        
        clickButton(":_shipViaFreightGroup.All Ship Vias_QRadioButton_2");
        clickButton(":To.All Shipping Zones_QRadioButton_2");
        snooze(0.5);
        clickButton(":_freightClassGroup.Selected:_QRadioButton_2");
        clickItem(":_freightClassGroup._freightClass_XComboBox_2", "BULK-Bulk Freight",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2"); 
        
        waitForObject(":GroupBox1.Save_QPushButton_2");
        clickButton(":GroupBox1.Save_QPushButton_2");
        snooze(0.5);
        waitForObject(":_ipshead_XTreeWidget");
        
        if(object.exists(":_ipshead.FREIGHT-BULK_QModelIndex"))
            test.pass("Pricing Schedule created:FREIGHT-BULK");
        else test.fail("Pricing Schedule not created:FREIGHT-BULK");
    }catch(e){test.fail("Exception in defining Pricing Schedule"+ e);}
    
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
        type(":Maintain Item Costs.XLineEdit_XLineEdit", ".40");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            clickButton(":From.All Sites_QRadioButton_2");
        else if(appEdition=="PostBooks")
            test.xverify(object.exists(":From.All Sites_QRadioButton_2"), "From All Sites Radiobutton not found");
        
        clickButton(":_shipViaFreightGroup.All Ship Vias_QRadioButton_2");
        clickButton(":To.All Shipping Zones_QRadioButton_2");
        clickButton(":_freightClassGroup.Selected:_QRadioButton_2");
        clickItem(":_freightClassGroup._freightClass_XComboBox_2", "BULK-Bulk Freight",0,0,1,Qt.LeftButton);
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2"); 
        
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
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Pricing");
        activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Pricing");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Pricing_QMenu", "Pricing Schedule Assignments...");
        activateItem(":xTuple ERP: OpenMFG Edition.Pricing_QMenu", "Pricing Schedule Assignments...");
        
        
        //----------Pricing Schdule Assignment: FREIGHT-TTOYS-BULK-----------
        waitForObject(":List Pricing Schedule Assignments.New_QPushButton");
        clickButton(":List Pricing Schedule Assignments.New_QPushButton");
        waitForObject(":_customerGroup.VirtualClusterLineEdit_CLineEdit");
        waitForObject(":_customerGroup_QLabel");
        sendEvent("QMouseEvent", ":_customerGroup_QLabel", QEvent.MouseButtonPress, 14, 13, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab.TTOYS_QModelIndex");
        doubleClick(":_listTab.TTOYS_QModelIndex", 38, 6, 0, Qt.LeftButton);
        clickItem(":_ipshead_XComboBox", "FREIGHT-TTOYS-BULK - Freight Pricing for Bulk Toys",0,0,1,Qt.LeftButton);
        snooze(1);
        clickButton(":List Employees.Save_QPushButton_2");
        snooze(2);
        waitForObject(":List Pricing Schedule Assignments._ipsass_XTreeWidget");
        if(object.exists(":_ipsass.FREIGHT-TTOYS-BULK_QModelIndex"))
            test.pass("Pricing Schedule Assignment created: FREIGHT-TTOYS-BULK");
        else test.fail("Pricing Schedule Assignment not created: FREIGHT-TTOYS-BULK");
        
        //----------Pricing Schdule Assignment:BASE----------------
        waitForObject(":List Pricing Schedule Assignments.New_QPushButton");
        clickButton(":List Pricing Schedule Assignments.New_QPushButton");
        waitForObject(":_customerGroup.Selected Customer Type:_QRadioButton");
        clickButton(":_customerGroup.Selected Customer Type:_QRadioButton");    
        if(findObject(":_ipshead_XComboBox").currentText!= "BASE - Base Price Schedule")
            clickItem(":_ipshead_XComboBox","BASE - Base Price Schedule",0,0,1,Qt.LeftButton);
        snooze(1);
        clickButton(":List Employees.Save_QPushButton_2");
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
        type(":_customerGroup._customerType_XLineEdit_2", ".*");
        type(":_ipshead_XComboBox", "FREIGHT-BULK");
        snooze(1);
        clickButton(":List Employees.Save_QPushButton_2");
        waitForObject(":List Pricing Schedule Assignments._ipsass_XTreeWidget");
        if(object.exists(":_ipsass.FREIGHT-BULK_QModelIndex"))
            test.pass("Pricing Schedule Assignment created: FREIGHT-BULK");
        else test.fail("Pricing Schedule Assignment not created: FREIGHT-BULK");
        
        
        waitForObject(":List Pricing Schedule Assignments.Close_QPushButton");
        clickButton(":List Pricing Schedule Assignments.Close_QPushButton");
    }catch(e){test.fail("Exception in pricing Schedule assignment"+ e);}  
    
    if(appEdition=="Manufacturing"||appEdition=="Standard")
    {
        try{     
            
            //-----------Create Item site for INTRAN------------
            waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
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
            
            type(":_addressGroup.XLineEdit_XLineEdit", "Charmy Ganesh Nilayam");
            type(":_addressGroup.XLineEdit_XLineEdit_2", "Vittal Rao Colony");
            type(":_addressGroup.XLineEdit_XLineEdit_3", "Santh Nagar");
            type(":_addressGroup.XLineEdit_XLineEdit_4", "Pune");
            clickItem(":_addressGroup._state_XComboBox", "VA", 12, 1, 0, Qt.LeftButton);
            
            type(":_addressGroup.XLineEdit_XLineEdit_5", "23234324");
            waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
            waitForObject(":_accountGroup_QLabel");
            sendEvent("QMouseEvent", ":_accountGroup_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
            waitForObjectItem(":_QMenu", "List...");
            activateItem(":_QMenu", "List...");
            waitForObject(":_listTab_XTreeWidget_9");
            doubleClickItem(":_listTab_XTreeWidget_9","1950", 10, 8, 0, Qt.LeftButton);
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
            
        }
        catch(e)
        {
            test.fail("Exception in creating INTRAN site:"+e);
        }
        
        //-----------Configure: Inventory Module--------------
        try{
            
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            waitForObject(":Setup._modules_QComboBox");
            clickItem(":Setup._modules_QComboBox","Inventory", 72, 2, 0, Qt.LeftButton);
            waitForObject(":Configure.Inventory_QModelIndex");
            mouseClick(":Configure.Inventory_QModelIndex", 36, 4, 0, Qt.LeftButton);
            waitForObject(":_defaultTransWhs_WComboBox");
            if(findObject(":_defaultTransWhs_WComboBox").currentText!= "INTRAN");
            clickItem(":_defaultTransWhs_WComboBox", "INTRAN",0,0,1,Qt.LeftButton);
            waitForObject(":Setup.Save_QPushButton");
            clickButton(":Setup.Save_QPushButton");
            test.log("Configure Module: Inventory");
        }
        catch(e)
        {
            test.fail("Exception in configuring Inventory module:"+e);
        }
        
    }
    
    else if(appEdition=="PostBooks")
    {
        try{
            waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
            
            menu = waitForObject(":xTuple ERP: OpenMFG Edition.Site_QMenu");
            menuItem = "&List...";
            
            actions = menu.actions();
            for(i=0;i<actions.count();i++)
                if(actions.at(i).text == menuItem || i==actions.count()-1) break;
            if(actions.at(i).text==menuItem)
                test.fail(menuItem+"present in "+ appEdition);
            else test.pass(menuItem+"not found in "+appEdition);
        }
        catch(e)
        {
            test.fail("Exception in verifying menu in postbooks:"+e);
        }
        
    } 
    
    
    
}
