
function main()
{
    
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER"); 
    var appEdition = findApplicationEdition();
  
  
    //-----------Chart Of Accounts------------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        
        COA("01","01","1250","01","Warehouse 1 Asset","Asset","IN");
        COA("01","01","1252","01","Intransit Asset","Asset","IN");
        COA("01","01","1254","01","Warehouse 2 Asset","Asset","IN");
        COA("01","01","1210","01","WIP Asset","Asset","IN");
        COA("01","01","1620","01","Inventory Cost Variance","Asset","IN");
        COA("01","01","1470","01","Material Usage Variance","Asset","IN");
        COA("01","01","1930","01","Transform Clearing","Asset","IN");  
        COA("01","01","1460","01","Purchase Price Variance","Asset","IN");
        COA("01","01","8910","01","Inventory Adjustment","Expense","EXP");   
        COA("01","01","8920","01","Inventory Scrap","Expense","EXP"); 
        COA("01","01","8930","01","OpenMFG Scrap","Expense","EXP");  
        COA("01","01","8980","01","Purchase Expense Variance","Expense","EXP");
        COA("01","01","2320","01","Labor and Overhead Costs Accrued","Liability","CL");
        COA("01","01","2490","01","P/O Liability Clearing","Liability","CL");
        COA("01","01","2510","01","Sales Tax Liability","Liability","CL");   
        COA("01","01","1260","01","Shipping Asset","Asset","IN");
        COA("01","01","6000","01","Office Supplies","Expense","EXP");  
        COA("01","01","6550","01","P/O Line Freight Expense","Expense","EXP");
        COA("01","01","2480","01","Transfer Order Liability Clearing","Liability","CL");	  
        COA("01","01","6050","01","State Sales Tax Expense","Expense","EXP");  
        COA("01","01","6060","01","Shipping Charge Expense","Expense","EXP");  
        
        waitForObject(":Chart of Accounts.Close_QPushButton_2");
        clickButton(":Chart of Accounts.Close_QPushButton_2");
    }catch(e){test.fail("Exception while creating Chart of Accounts:"+e);}
  

    //---------------Create Inventory - new Cost Catergory------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Cost Categories...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Cost Categories...");
        waitForObject(":List Cost Categories.New_QPushButton_2");
        clickButton(":List Cost Categories.New_QPushButton_2");
        waitForObject(":Cost Category._category_XLineEdit");
        type(":Cost Category._category_XLineEdit", "CCWH1");
        type(":Cost Category._description_XLineEdit", "Warehouse 1");
        type(":Cost Category._main_XLineEdit", "01-01-1250-01");
        type(":Cost Category._main_XLineEdit_2", "01-01-1210-01");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            type(":Cost Category._main_XLineEdit_3", "01-01-1620-01");
        else if (appEdition=="PostBooks")
            test.xverify(object.exists(":Cost Category._main_XLineEdit_3"),"Cost Category text field - not visible");
        type(":Cost Category._main_XLineEdit_4", "01-01-1930-01");
        type(":Cost Category._main_XLineEdit_5", "01-01-1460-01");
        type(":Cost Category._main_XLineEdit_6", "01-01-8910-01");
        type(":Cost Category._main_XLineEdit_7", "01-01-8920-01");
        type(":Cost Category._main_XLineEdit_8", "01-01-8930-01");
        type(":Cost Category._main_XLineEdit_9", "01-01-2320-01");
        type(":Cost Category._main_XLineEdit_10", "01-01-2490-01");
        type(":Cost Category._main_XLineEdit_11", "01-01-1260-01");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            type(":Cost Category._main_XLineEdit_12", "01-01-6550-01");
        else if (appEdition=="PostBooks")
            test.xverify(object.exists(":Cost Category._main_XLineEdit_12"),"Cost Category text field - not visible");
        if(appEdition=="Manufacturing")
            type(":Cost Category._main_XLineEdit_13", "01-01-2480-01");
        else if(appEdition=="Standard"||appEdition=="PostBooks")
            test.xverify(object.exists(":Cost Category._main_XLineEdit_13"),"Cost Category text field - not visible");
        type(":List Cost Categories._main_XLineEdit_14", "01-01-2320-01");
        
        waitForObject(":Cost Category.Save_QPushButton");
        clickButton(":Cost Category.Save_QPushButton");
        snooze(2);
        waitForObject(":List Cost Categories._costcat_XTreeWidget_2");
        if(object.exists(":_costcat.CCWH1_QModelIndex"))
            test.pass("Cost Category: CCWH1 created");
        else test.fail("Cost Category: CCWH1 not created");
        waitForObject(":List Cost Categories.Close_QPushButton_2");
        clickButton(":List Cost Categories.Close_QPushButton_2");
    }catch(e){test.fail("Exception in creating new Cost category:"+e);}
    
    
    //----------Inventory-Cost Categories: copy and create for INTRAN------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Cost Categories...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Cost Categories...");
        
        waitForObject(":List Cost Categories._costcat_XTreeWidget_2");
        clickItem(":List Cost Categories._costcat_XTreeWidget_2", "CCWH1",0,0,1,Qt.LeftButton);
        waitForObject(":List Cost Categories.Copy_QPushButton_2");
        clickButton(":List Cost Categories.Copy_QPushButton_2");
        waitForObject(":Cost Category._category_XLineEdit");
        findObject(":Cost Category._category_XLineEdit").clear();
        type(":Cost Category._category_XLineEdit", "CCINTRAN");
        findObject(":Cost Category._description_XLineEdit").clear();
        type(":Cost Category._description_XLineEdit", "Intransit Warehouse");
        findObject(":Cost Category._main_XLineEdit").clear();
        type(":Cost Category._main_XLineEdit", "01-01-1252-01");
        type(":Cost Category._main_XLineEdit", "<Tab>");
        waitForObject(":Cost Category.Save_QPushButton");
        clickButton(":Cost Category.Save_QPushButton");
        waitForObject(":List Cost Categories.Close_QPushButton_2");
        if(object.exists(":_costcat.CCINTRAN_QModelIndex"))
            test.pass("Cost Category: CCINTRAN created");
        else test.fail("Cost Category: CCINTRAN not created");
        waitForObject(":List Cost Categories.Close_QPushButton_2");
        clickButton(":List Cost Categories.Close_QPushButton_2");
        test.log("Inventory Cost Category CCINTRAN created");
    }catch(e){test.fail("Exception in creating Cost Category");}
    
    
    //----------Inventory-Cost Categories: copy and create for WH2------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Cost Categories...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Cost Categories...");
        waitForObject(":List Cost Categories._costcat_XTreeWidget_2");
        clickItem(":List Cost Categories._costcat_XTreeWidget_2", "CCWH1",0,0,1,Qt.LeftButton);
        waitForObject(":List Cost Categories.Copy_QPushButton_2");
        clickButton(":List Cost Categories.Copy_QPushButton_2");
        snooze(1);
        waitForObject(":Cost Category._category_XLineEdit");
        findObject(":Cost Category._category_XLineEdit").clear();
        type(":Cost Category._category_XLineEdit", "CCWH2");
        findObject(":Cost Category._description_XLineEdit").clear();
        type(":Cost Category._description_XLineEdit", "Warehouse 2");
        findObject(":Cost Category._main_XLineEdit").clear();
        type(":Cost Category._main_XLineEdit", "01-01-1254-01");
        waitForObject(":Cost Category.Save_QPushButton");
        clickButton(":Cost Category.Save_QPushButton");
        snooze(2);
        waitForObject(":List Cost Categories._costcat_XTreeWidget_2");
        if(object.exists(":_costcat.CCWH2_QModelIndex"))
            test.pass("Cost Category: CCWH2 created");
        else test.fail("Cost Category: CCWH2 not created");
        clickButton(":List Cost Categories.Close_QPushButton_2");
    }catch(e){test.fail("Exception in Creating Cost Categories:"+e);}
    


    //------------Inventory: create Expense Categories---------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Expense Categories...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_3", "Expense Categories...");
        waitForObject(":List Expense Categories.New_QPushButton_2");
        clickButton(":List Expense Categories.New_QPushButton_2");
        waitForObject(":_category_XLineEdit_2");
        type(":_category_XLineEdit_2", "OFFICE-SUPPLIES");
        type(":_description_XLineEdit_13", "Print Paper");
        type(":Expense Category._main_XLineEdit", "01-01-6000-01");
        type(":Expense Category._main_XLineEdit_2", "01-01-8980-01");
        type(":Expense Category._main_XLineEdit_3", "01-01-2490-01");
        type(":Expense Category._main_XLineEdit_4", "01-01-6550-01");
        type(":Expense Category._main_XLineEdit_4", "<Tab>");
        waitForObject(":Expense Category.Save_QPushButton");
        clickButton(":Expense Category.Save_QPushButton");
        waitForObject(":List Expense Categories._expcat_XTreeWidget");
        snooze(1);
        if(object.exists(":_expcat.OFFICE-SUPPLIES_QModelIndex"))
            test.pass("Expense Category: OFFICE-SUPPLIES created");
        else test.fail("Expense Category: OFFICE-SUPPLIES not created");
        
        waitForObject(":List Expense Categories.New_QPushButton_2");
        clickButton(":List Expense Categories.New_QPushButton_2");
        waitForObject(":_category_XLineEdit_2");
        type(":_category_XLineEdit_2", "SALES_TAX");
        type(":_description_XLineEdit_13", "Sales Tax");
        type(":Expense Category._main_XLineEdit", "01-01-2510-01");
        type(":Expense Category._main_XLineEdit_2", "01-01-8980-01");
        type(":Expense Category._main_XLineEdit_3", "01-01-2490-01");
        type(":Expense Category._main_XLineEdit_4", "01-01-6550-01");
        type(":Expense Category._main_XLineEdit_4", "<Tab>");
        waitForObject(":Expense Category.Save_QPushButton");
        clickButton(":Expense Category.Save_QPushButton");
        waitForObject(":List Expense Categories._expcat_XTreeWidget");
       snooze(1);
        if(object.exists(":_expcat.SALES_TAX_QModelIndex"))
            test.pass("Expense Category: SALES_TAX created");
        else test.fail("Expense Category: SALES_TAX not created");
        
        
        waitForObject(":List Expense Categories.New_QPushButton_2");
        clickButton(":List Expense Categories.New_QPushButton_2");
        waitForObject(":_category_XLineEdit_2");
        type(":_category_XLineEdit_2", "SHIPPING_CHARGES");
        type(":_description_XLineEdit_13", "Shipping Charges Expense");
        type(":Expense Category._main_XLineEdit", "01-01-6060-01");
        type(":Expense Category._main_XLineEdit_2", "01-01-8980-01");
        type(":Expense Category._main_XLineEdit_3", "01-01-2490-01");
        type(":Expense Category._main_XLineEdit_4", "01-01-6550-01");
        type(":Expense Category._main_XLineEdit_4", "<Tab>");
        waitForObject(":Expense Category.Save_QPushButton");
        clickButton(":Expense Category.Save_QPushButton");
        waitForObject(":List Expense Categories._expcat_XTreeWidget");
        snooze(1);
        if(object.exists(":_expcat.SHIPPING_CHARGES_QModelIndex"))
            test.pass("Expense Category: SALES_TAX created");
        else test.fail("Expense Category: SALES_TAX not created");
        
        waitForObject(":List Expense Categories.Close_QPushButton_2");
        clickButton(":List Expense Categories.Close_QPushButton_2");
    }catch(e){test.fail("Exception in defining Expense categories:"+e);}
    
    
    
    //------------------Inventory: create site Locations--------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
        activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Site");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "Locations...");
        activateItem(":xTuple ERP: OpenMFG Edition.Site_QMenu", "Locations...");
        
        waitForObject(":List Site Locations.New_QPushButton_2");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            if(findObject(":_warehouse._warehouses_WComboBox_3").currentText!= "WH1")
            {    
                clickItem(":_warehouse._warehouses_WComboBox_3", "WH1", 0, 0, 1, Qt.LeftButton);    
            }
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_warehouse._warehouses_WComboBox_3"),"warehouses_WComboBox - not visible");
        }
        
        clickButton(":List Site Locations.New_QPushButton_2");
        waitForObject(":_whsezone_XComboBox_2");
        clickItem(":_whsezone_XComboBox_2", "RM1", 0, 0, 1, Qt.LeftButton);
        if(!findObject(":Location.Netable_QCheckBox").checked)
            clickButton(":Location.Netable_QCheckBox");
        if(findObject(":Location.Restricted_QCheckBox").checked)
            clickButton(":Location.Restricted_QCheckBox");
        type(":Location._aisle_XLineEdit", "01");
        type(":Location._rack_XLineEdit", "01");
        type(":Location._bin_XLineEdit", "01");
        type(":_location_XLineEdit_2", "01");
        type(":_description_QTextEdit_3", "Location 01-01-01-01 in Zone RM1");
        clickButton(":Location.Save_QPushButton"); 
        waitForObject(":List Site Locations._location_XTreeWidget");
        snooze(2);
        if(object.exists("{column='2' container=':List Site Locations._location_XTreeWidget' text='Location 01-01-01-01 in Zone RM1' type='QModelIndex'}"))
            test.pass("Location 01-01-01-01 in Zone RM1 created");
        else test.fail("Location 01-01-01-01 in Zone RM1 not created");
        waitForObject(":List Site Locations.New_QPushButton_2");
        clickButton(":List Site Locations.New_QPushButton_2");
        waitForObject(":_whsezone_XComboBox_2");
        clickItem(":_whsezone_XComboBox_2", "RM1", 0, 0, 1, Qt.LeftButton);
        if(!findObject(":Location.Netable_QCheckBox").checked)
            clickButton(":Location.Netable_QCheckBox");
        if(findObject(":Location.Restricted_QCheckBox").checked)
            clickButton(":Location.Restricted_QCheckBox");
        type(":Location._aisle_XLineEdit", "01");
        type(":Location._rack_XLineEdit", "01");
        type(":Location._bin_XLineEdit", "01");
        type(":_location_XLineEdit_2", "02");
        type(":_description_QTextEdit_3", "Location 01-01-01-02 in Zone RM1");
        clickButton(":Location.Save_QPushButton");
        waitForObject(":List Site Locations._location_XTreeWidget");
        if(object.exists("{column='2' container=':List Site Locations._location_XTreeWidget' text='Location 01-01-01-02 in Zone RM1' type='QModelIndex'}"))
            test.pass("Location 01-01-01-02 in Zone RM1 created");
        else test.fail("Location 01-01-01-02 in Zone RM1 not created");
        waitForObject(":List Site Locations.New_QPushButton_2");
        clickButton(":List Site Locations.New_QPushButton_2");
        waitForObject(":_whsezone_XComboBox_2");
        clickItem(":_whsezone_XComboBox_2", "RM1", 0, 0, 1, Qt.LeftButton);
        if(!findObject(":Location.Netable_QCheckBox").checked)
            clickButton(":Location.Netable_QCheckBox");
        if(findObject(":Location.Restricted_QCheckBox").checked)
            clickButton(":Location.Restricted_QCheckBox");
        type(":Location._aisle_XLineEdit", "01");
        type(":Location._rack_XLineEdit", "01");
        type(":Location._bin_XLineEdit", "01");
        type(":_location_XLineEdit_2", "03");
        type(":_description_QTextEdit_3", "Location 01-01-01-03 in Zone RM1");
        clickButton(":Location.Save_QPushButton");
        waitForObject(":List Site Locations._location_XTreeWidget");
        if(object.exists("{column='2' container=':List Site Locations._location_XTreeWidget' text='Location 01-01-01-03 in Zone RM1' type='QModelIndex'}"))
            test.pass("Location 01-01-01-03 in Zone RM1 created");
        else test.fail("Location 01-01-01-03 in Zone RM1 not created");
        waitForObject(":List Site Locations.New_QPushButton_2");
        clickButton(":List Site Locations.New_QPushButton_2");
        waitForObject(":_whsezone_XComboBox_2");
        clickItem(":_whsezone_XComboBox_2", "FG1", 0, 0, 1, Qt.LeftButton);
        if(!findObject(":Location.Netable_QCheckBox").checked)
            clickButton(":Location.Netable_QCheckBox");
        if(findObject(":Location.Restricted_QCheckBox").checked)
            clickButton(":Location.Restricted_QCheckBox");
        type(":Location._aisle_XLineEdit", "99");
        type(":Location._rack_XLineEdit", "01");
        type(":Location._bin_XLineEdit", "01");
        type(":_location_XLineEdit_2", "01");
        type(":_description_QTextEdit_3", "Location 01-01-01-01 in Zone FG1");
        clickButton(":Location.Save_QPushButton");
        snooze(2);
        waitForObject(":List Site Locations._location_XTreeWidget");
        if(object.exists("{column='2' container=':List Site Locations._location_XTreeWidget' text='Location 01-01-01-01 in Zone FG1' type='QModelIndex'}"))
            test.pass("Location 01-01-01-01 in Zone FG1 created");
        else test.fail("Location 01-01-01-01 in Zone FG1 not created");
        
        waitForObject(":List Site Locations.New_QPushButton_2");
        clickButton(":List Site Locations.New_QPushButton_2");
        waitForObject(":_whsezone_XComboBox_2");
        clickItem(":_whsezone_XComboBox_2", "FG1", 0, 0, 1, Qt.LeftButton);
        if(!findObject(":Location.Netable_QCheckBox").checked)
            clickButton(":Location.Netable_QCheckBox");
        if(findObject(":Location.Restricted_QCheckBox").checked)
            clickButton(":Location.Restricted_QCheckBox");
        type(":Location._aisle_XLineEdit", "99");
        type(":Location._rack_XLineEdit", "01");
        type(":Location._bin_XLineEdit", "01");
        type(":_location_XLineEdit_2", "02");
        type(":_description_QTextEdit_3", "Location 01-01-01-02 in Zone FG1");
        clickButton(":Location.Save_QPushButton");
        snooze(2);
        waitForObject(":List Site Locations._location_XTreeWidget");
        if(object.exists("{column='2' container=':List Site Locations._location_XTreeWidget' text='Location 01-01-01-02 in Zone FG1' type='QModelIndex'}"))
            test.pass("Location 01-01-01-02 in Zone FG1 created");
        else test.fail("Location 01-01-01-02 in Zone FG1 not created");
        
        
        waitForObject(":List Site Locations.New_QPushButton_2");
        clickButton(":List Site Locations.New_QPushButton_2");
        waitForObject(":_whsezone_XComboBox_2");
        clickItem(":_whsezone_XComboBox_2", "FG1", 0, 0, 1, Qt.LeftButton);
        if(!findObject(":Location.Netable_QCheckBox").checked)
            clickButton(":Location.Netable_QCheckBox");
        if(findObject(":Location.Restricted_QCheckBox").checked)
            clickButton(":Location.Restricted_QCheckBox");
        type(":Location._aisle_XLineEdit", "99");
        type(":Location._rack_XLineEdit", "01");
        type(":Location._bin_XLineEdit", "01");
        type(":_location_XLineEdit_2", "03");
        type(":_description_QTextEdit_3", "Location 01-01-01-03 in Zone FG1");
        clickButton(":Location.Save_QPushButton");
        snooze(2);
        waitForObject(":List Site Locations._location_XTreeWidget");
        if(object.exists("{column='2' container=':List Site Locations._location_XTreeWidget' text='Location 01-01-01-03 in Zone FG1' type='QModelIndex'}"))
            test.pass("Location 01-01-01-03 in Zone FG1 created");
        else test.fail("Location 01-01-01-03 in Zone FG1 not created");
        
        waitForObject(":List Site Locations.Close_QPushButton_2");
        clickButton(":List Site Locations.Close_QPushButton_2");
        test.log("Inventory Site Locations created");
    }catch(e){test.fail("Exception in creating Site locations");}
    
    
    
    //----------Define: Unit of Measure---------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Units of Measure...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Units of Measure...");
        
        waitForObject(":List Units of Measure.New_QPushButton_2");
        clickButton(":List Units of Measure.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_5");
        type(":_name_XLineEdit_5", "EA");
        type(":_description_XLineEdit_14", "Each");
        clickButton(":Unit of Measure.Save_QPushButton");
        waitForObject(":List Units of Measure._uoms_XTreeWidget_2");
        if(object.exists(":_uoms.EA_QModelIndex"))
            test.pass("UOM: EA created");
        else test.fail("UOM: EA not created");
        
        
        waitForObject(":List Units of Measure.New_QPushButton_2");
        clickButton(":List Units of Measure.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_5");    
        type(":_name_XLineEdit_5", "CA");
        type(":_description_XLineEdit_14", "Case");
        clickButton(":Unit of Measure.Save_QPushButton");
        waitForObject(":List Units of Measure._uoms_XTreeWidget_2");
        if(object.exists("{column='0' container=':List Units of Measure._uoms_XTreeWidget_2' text='CA' type='QModelIndex'}"))
            test.pass("UOM: CA created");
        else test.fail("UOM: CA not created");
        
        
        waitForObject(":List Units of Measure.New_QPushButton_2");
        clickButton(":List Units of Measure.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_5");
        type(":_name_XLineEdit_5", "PL");
        type(":_description_XLineEdit_14", "Pallet");
        waitForObject(":Unit of Measure.Save_QPushButton");
        clickButton(":Unit of Measure.Save_QPushButton");
        waitForObject(":List Units of Measure._uoms_XTreeWidget_2");
        if(object.exists("{column='0' container=':List Units of Measure._uoms_XTreeWidget_2' text='PL' type='QModelIndex'}"))
            test.pass("UOM: PL created");
        else test.fail("UOM: PL created");
        
        
        waitForObject(":List Units of Measure.New_QPushButton_2");
        clickButton(":List Units of Measure.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_5");
        type(":_name_XLineEdit_5", "GL");
        type(":_description_XLineEdit_14", "Gallon");
        waitForObject(":Unit of Measure.Save_QPushButton");
        clickButton(":Unit of Measure.Save_QPushButton");
        waitForObject(":List Units of Measure._uoms_XTreeWidget_2");
        if(object.exists("{column='0' container=':List Units of Measure._uoms_XTreeWidget_2' text='GL' type='QModelIndex'}"))
            test.pass("UOM: GL created");
        else test.fail("UOM: GL not created");
        
      
        waitForObject(":List Units of Measure.New_QPushButton_2");
        clickButton(":List Units of Measure.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_5");
        type(":_name_XLineEdit_5", "LB");
        type(":_description_XLineEdit_14", "Pound");
        waitForObject(":Unit of Measure.Save_QPushButton");
        clickButton(":Unit of Measure.Save_QPushButton");
        waitForObject(":List Units of Measure._uoms_XTreeWidget_2");
        if(object.exists("{column='0' container=':List Units of Measure._uoms_XTreeWidget_2' text='LB' type='QModelIndex'}"))
            test.pass("UOM: LB created");
        else test.fail("UOM: LB not created");
        
        
      waitForObject(":List Units of Measure.New_QPushButton_2");
        clickButton(":List Units of Measure.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_5");
        type(":_name_XLineEdit_5", "KG");
        type(":_description_XLineEdit_14", "Kilo");
        waitForObject(":Unit of Measure.Save_QPushButton");
        clickButton(":Unit of Measure.Save_QPushButton");
        waitForObject(":List Units of Measure._uoms_XTreeWidget_2");
        if(object.exists("{column='0' container=':List Units of Measure._uoms_XTreeWidget_2' text='KG' type='QModelIndex'}"))
            test.pass("UOM: KG created");
        else test.fail("UOM: KG not created");
        
        snooze(1);
        waitForObject(":List Units of Measure._uoms_XTreeWidget_2");
        doubleClickItem(":List Units of Measure._uoms_XTreeWidget_2","KG",0,0,1,Qt.LeftButton);
        snooze(1);
        waitForObject(":Global Conversion Ratios:.New_QPushButton");
        clickButton(":Global Conversion Ratios:.New_QPushButton");
        
        waitForObject(":Conversion._uomFrom_XComboBox");
        clickItem(":Conversion._uomFrom_XComboBox", "KG", 0, 0, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":Conversion._uomTo_XComboBox");
        clickItem(":Conversion._uomTo_XComboBox", "LB", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Conversion._toValue_XLineEdit");
        type(":Conversion._toValue_XLineEdit", "2.20462262");
        if(!findObject(":Conversion.Fractional_QCheckBox").checked)
            clickButton(":Conversion.Fractional_QCheckBox");
        
        waitForObject(":Conversion.Save_QPushButton");
        clickButton(":Conversion.Save_QPushButton");
        snooze(0.5);
        waitForObject(":Unit of Measure.Save_QPushButton");
        clickButton(":Unit of Measure.Save_QPushButton");
        snooze(2);
        waitForObject(":List Units of Measure.Close_QPushButton_2");
        clickButton(":List Units of Measure.Close_QPushButton_2");
        test.log("Unit of Measures created");
    }catch(e){test.fail("Exception in defining Unit of Measure:"+e);}
    

  
    //----------Define: Class Codes------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Class Codes...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Class Codes...");
        
        snooze(1);
        waitForObject(":List Class Codes.New_QPushButton_2");
        clickButton(":List Class Codes.New_QPushButton_2");
        waitForObject(":_classCode_XLineEdit_2");
        type(":_classCode_XLineEdit_2", "TOY-TRUCKS");
        type(":_description_XLineEdit_15", "Toy Trucks");
        waitForObject(":Class Code.Save_QPushButton");
        clickButton(":Class Code.Save_QPushButton");
        waitForObject(":List Class Codes._classcode_XTreeWidget");
        if(object.exists(":_classcode.TOY-TRUCKS_QModelIndex"))
            test.pass("Class Code: TOY-TRUCKS created");
        else test.fail("Class Code: TOY-TRUCKS not created");
        waitForObject(":List Class Codes.New_QPushButton_2");
        clickButton(":List Class Codes.New_QPushButton_2");
        waitForObject(":_classCode_XLineEdit_2");
        type(":_classCode_XLineEdit_2", "TOYS-CARS");
        type(":_description_XLineEdit_15", "Toy Cars");
        waitForObject(":Class Code.Save_QPushButton");
        clickButton(":Class Code.Save_QPushButton");
        waitForObject(":List Class Codes._classcode_XTreeWidget");
        if(object.exists("{column='0' container=':List Class Codes._classcode_XTreeWidget' text='TOY-CARS' type='QModelIndex'}"))
            test.pass("Class Code: TOYS-CARS created");
        
        
        waitForObject(":List Class Codes.New_QPushButton_2");
        clickButton(":List Class Codes.New_QPushButton_2");
        waitForObject(":_classCode_XLineEdit_2");
        type(":_classCode_XLineEdit_2", "TOYS-PLANES");
        type(":_description_XLineEdit_15", "Toy Planes");
        waitForObject(":Class Code.Save_QPushButton");
        clickButton(":Class Code.Save_QPushButton");
        waitForObject(":List Class Codes._classcode_XTreeWidget");
        if(object.exists("{column='0' container=':List Class Codes._classcode_XTreeWidget' text='TOY-PLANES' type='QModelIndex'}"))
            test.pass("Class Code: TOYS-PLANES created");
        
        waitForObject(":List Class Codes.Close_QPushButton_2");
        clickButton(":List Class Codes.Close_QPushButton_2");
    }catch(e){test.fail("Exception in defining Class Code:"+e);}
    
    
    //-----------Define: Product Categories----------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QWorkspace");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Product Categories...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Product Categories...");
        
        
        waitForObject(":List Product Categories.New_QPushButton_2");
        clickButton(":List Product Categories.New_QPushButton_2");
        waitForObject(":Product Category._category_XLineEdit");
        type(":Product Category._category_XLineEdit", "CLASSIC-METAL");
        type(":Product Category._description_XLineEdit", "Classic Metal Product Line");
        waitForObject(":Product Category.Save_QPushButton");
        clickButton(":Product Category.Save_QPushButton");
        waitForObject(":List Product Categories._prodcat_XTreeWidget");
        if(object.exists(":_prodcat.CLASSIC-METAL_QModelIndex"))
            test.pass("Product Category: CLASSIC-METAL created");
        else test.fail("Product Category: CLASSIC-METAL not created");
        
        
        waitForObject(":List Product Categories.New_QPushButton_2");
        clickButton(":List Product Categories.New_QPushButton_2");
        waitForObject(":Product Category._category_XLineEdit");
        type(":Product Category._category_XLineEdit", "CLASSIC-WOOD");
        type(":Product Category._description_XLineEdit", "Classic Wood Product Line");
        waitForObject(":Product Category.Save_QPushButton");
        clickButton(":Product Category.Save_QPushButton");
        waitForObject(":List Product Categories._prodcat_XTreeWidget");
        if(object.exists("{column='0' container=':List Product Categories._prodcat_XTreeWidget' text='CLASSIC-WOOD' type='QModelIndex'}"))
            test.pass("Product Category: CLASSIC-WOOD created");
        else test.fail("Product Category: CLASSIC-WOOD not created");
        
        
        waitForObject(":List Product Categories.New_QPushButton_2");
        clickButton(":List Product Categories.New_QPushButton_2");
        waitForObject(":Product Category._category_XLineEdit");
        type(":Product Category._category_XLineEdit", "COLLECTORS-METAL");
        type(":Product Category._description_XLineEdit", "Collectors Metal Product Line");
        waitForObject(":Product Category.Save_QPushButton");
        clickButton(":Product Category.Save_QPushButton");
        waitForObject(":List Product Categories._prodcat_XTreeWidget");
        if(object.exists("{column='0' container=':List Product Categories._prodcat_XTreeWidget' text='COLLECTORS-METAL' type='QModelIndex'}"))
            test.pass("Product Category: COLLECTORS-METAL created");
        else test.fail("Product Category: COLLECTORS-METAL not created");
        
        
        waitForObject(":List Product Categories.New_QPushButton_2");
        clickButton(":List Product Categories.New_QPushButton_2");
        waitForObject(":Product Category._category_XLineEdit");
        type(":Product Category._category_XLineEdit", "COLLECTORS-WOOD");
        type(":Product Category._description_XLineEdit", "Collectors Wood Product Line");
        waitForObject(":Product Category.Save_QPushButton");
        clickButton(":Product Category.Save_QPushButton");
        waitForObject(":List Product Categories._prodcat_XTreeWidget");
        if(object.exists("{column='0' container=':List Product Categories._prodcat_XTreeWidget' text='COLLECTORS-WOOD' type='QModelIndex'}"))
            test.pass("Product Category: COLLECTORS-WOOD created");
        else test.fail("Product Category: COLLECTORS-WOOD not created");
        
        waitForObject(":List Product Categories.Close_QPushButton_2");
        clickButton(":List Product Categories.Close_QPushButton_2");
        test.log("Product Categories created");
    }catch(e){test.fail("Exception in defining Product Category:"+e);}
    
    
    
    //---------Create Freight Classes-----------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Freight Classes...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Freight Classes...");
        waitForObject(":List Freight Classes.New_QPushButton_2");
        clickButton(":List Freight Classes.New_QPushButton_2");
        waitForObject(":_freightClass_XLineEdit_2");
        type(":_freightClass_XLineEdit_2", "BULK");
        mouseClick(":_description_XLineEdit_34", 40, 16, 0, Qt.LeftButton);
        type(":_description_XLineEdit_34", "Bulk Freight");
        waitForObject(":Freight Class.Save_QPushButton");
        clickButton(":Freight Class.Save_QPushButton");
        waitForObject(":List Freight Classes.Close_QPushButton_2");
        if(object.exists(":_freightClass.BULK_QModelIndex"))
            test.pass("Freight Class created: BULK");
        else test.fail("Freight Class not created: BULK");
        waitForObject(":List Freight Classes.Close_QPushButton_2");
        clickButton(":List Freight Classes.Close_QPushButton_2");
        test.log("Freight Class: BULK created");
    }catch(e){test.fail("Exception in creating Freight Classes:"+e);}
    
    
    //----Define Characterisitics-------
    defineChartcs("I-COLOR","Product Color","item");
    defineChartcs("SUPPORT-PLAN","Customer Feedback","customer");
    defineChartcs("SALES-VOLUME","Customer Sales Volume","customer");
    defineChartcs("CRM-ACCOUNT-REGION","Account Region","crm");
    defineChartcs("ADR-ROUTE","Delivery Route","address");
    defineChartcs("CTC-BDAY","Birthday","contact");
    defineChartcs("LOT-QA-TEST1","QA Results for Test Type 1","lot");
  
  

 if(appEdition=="Manufacturing")
 {
    
        //----------------Schedule: Create Planner Code----------------
        try{
            
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Master Information");
            activateItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Master Information");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_5", "Planner Codes...");	     
            activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_5", "Planner Codes...");
            
            waitForObject(":List Planner Codes.New_QPushButton_2");
            clickButton(":List Planner Codes.New_QPushButton_2");
            waitForObject(":_code_XLineEdit_6");
            type(":_code_XLineEdit_6", "MPS-ITEMS");
            type(":_description_XLineEdit_16", "MPS Items");
            if(!findObject(":Planner Code.Automatically Explode Planned Orders_QCheckBox").checked)
                clickButton(":Planner Code.Automatically Explode Planned Orders_QCheckBox");
            waitForObject(":_explosionGroup.Multiple Level Explosion_QRadioButton_2");
            if(!findObject(":_explosionGroup.Multiple Level Explosion_QRadioButton_2").checked)
                clickButton(":_explosionGroup.Multiple Level Explosion_QRadioButton_2");
            waitForObject(":Planner Code.Save_QPushButton");
            clickButton(":Planner Code.Save_QPushButton");
            waitForObject(":List Planner Codes._plancode_XTreeWidget");
            if(object.exists(":_plancode.MPS-ITEMS_QModelIndex"))
                test.pass("Planner Code: MPS-ITEMS created");
            else test.fail("Planner Code: MPS-ITEMS not created");
            waitForObject(":List Planner Codes.New_QPushButton_2");
            clickButton(":List Planner Codes.New_QPushButton_2");
            snooze(1);
            waitForObject(":_code_XLineEdit_6");
            type(":_code_XLineEdit_6", "MRP-ITEMS");
            type(":_description_XLineEdit_16", "MRP Items");
            if(!findObject(":Planner Code.Automatically Explode Planned Orders_QCheckBox").checked)
                clickButton(":Planner Code.Automatically Explode Planned Orders_QCheckBox");
            waitForObject(":_explosionGroup.Multiple Level Explosion_QRadioButton_2");
            if(!findObject(":_explosionGroup.Multiple Level Explosion_QRadioButton_2").checked)
                clickButton(":_explosionGroup.Multiple Level Explosion_QRadioButton_2");
            waitForObject(":Planner Code.Save_QPushButton");
            clickButton(":Planner Code.Save_QPushButton");
            waitForObject(":List Planner Codes._plancode_XTreeWidget");
            if(object.exists(":_plancode.MRP-ITEMS_QModelIndex"))
                test.pass("Planner Code: MRP-ITEMS created");
            else test.fail("Planner Code: MRP-ITEMS not created");
            
            waitForObject(":List Planner Codes.Close_QPushButton_2");
            clickButton(":List Planner Codes.Close_QPushButton_2");
            test.log("Planner Codes created");
        }catch(e){test.fail("Exception in defining Planner Codes:"+e);}
        
        snooze(2);
      
      //--------------Schedule: Site week--------------
      try{
 
          waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
          activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
          waitForObjectItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Master Information");
          activateItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Master Information");
          snooze(0.1);
          waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_5", "Site Week...");
          activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_5", "Site Week...");
          snooze(1);
          waitForObject(":_warehouse.Selected:_QRadioButton_6");
          clickButton(":_warehouse.Selected:_QRadioButton_6");
          waitForObject(":_warehouse._warehouses_WComboBox_7");
          clickItem(":_warehouse._warehouses_WComboBox_7", "WH1", 0, 0, 1, Qt.LeftButton);
          waitForObject(":Site Work Week.Sunday_QCheckBox_3");
          if(findObject(":Site Work Week.Sunday_QCheckBox_3").checked)
              clickButton(":Site Work Week.Sunday_QCheckBox_3");
          if(!findObject(":Site Work Week.Monday_QCheckBox_3").checked)
              clickButton(":Site Work Week.Monday_QCheckBox_3");
          if(!findObject(":Site Work Week.Monday_QCheckBox_3").checked)
              clickButton(":Site Work Week.Monday_QCheckBox_3");
          if(!findObject(":Site Work Week.Tuesday_QCheckBox_3").checked)
              clickButton(":Site Work Week.Tuesday_QCheckBox_3");
          if(!findObject(":Site Work Week.Wednesday_QCheckBox_3").checked)
              clickButton(":Site Work Week.Wednesday_QCheckBox_3");
          if(!findObject(":Site Work Week.Thursday_QCheckBox_3").checked)
              clickButton(":Site Work Week.Thursday_QCheckBox_3");
          if(!findObject(":Site Work Week.Friday_QCheckBox_3").checked)
              clickButton(":Site Work Week.Friday_QCheckBox_3");
          if(findObject(":Site Work Week.Saturday_QCheckBox_3").checked)
              clickButton(":Site Work Week.Saturday_QCheckBox_3");
          waitForObject(":Site Work Week.Save_QPushButton_3");
          clickButton(":Site Work Week.Save_QPushButton_3");
          
          test.log("Site Week created");
      }catch(e){test.fail("Exception in creating Site Week:"+e);}
      
      
        //----------Schedule: Site Calendar Exceptions---------------
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Master Information");
            activateItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Master Information");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_5", "Site Calendar Exceptions...");
            activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_5", "Site Calendar Exceptions...");
            
            waitForObject(":List Site Calendar Exceptions.New_QPushButton_3");
            clickButton(":List Site Calendar Exceptions.New_QPushButton_3");
            waitForObject(":_warehouse.Selected:_QRadioButton_7");
            clickButton(":_warehouse.Selected:_QRadioButton_7");
            waitForObject(":_warehouse._warehouses_WComboBox_8");
            clickItem(":_warehouse._warehouses_WComboBox_8", "WH1", 0, 0, 1, Qt.LeftButton);
            var d = new Date();
            var CurrentYearFull = d.getFullYear();
            var CurrentYear = CurrentYearFull.toString().slice(2);
            
            waitForObject(":_description_QLineEdit_3");
            type(":_description_QLineEdit_3", "Christmas "+CurrentYearFull);
            waitForObject(":Site Calendar Exception.XDateEdit_XDateEdit_3");
            findObject(":Site Calendar Exception.XDateEdit_XDateEdit_3").clear();
            type(":Site Calendar Exception.XDateEdit_XDateEdit_3", "12/25/"+CurrentYear);
            findObject(":Site Calendar Exception.XDateEdit_XDateEdit_4").clear();
            type(":Site Calendar Exception.XDateEdit_XDateEdit_4", "12/26/"+CurrentYear);
            type(":Site Calendar Exception.XDateEdit_XDateEdit_4", "<Tab>");
            waitForObject(":Exception Type.Closed_QRadioButton_3");
            clickButton(":Exception Type.Closed_QRadioButton_3");
            waitForObject(":Site Calendar Exception.Save_QPushButton_2");
            clickButton(":Site Calendar Exception.Save_QPushButton_2");
            snooze(2);
            waitForObject(":List Site Calendar Exceptions.Close_QPushButton_3");
            if(object.exists(":_whsecal.Christmas 2010_QModelIndex"))
                test.pass("Calendar Exception: Christmas "+CurrentYearFull+" created");            
            else test.fail("Calendar Expceptin: Christmas "+CurrentYearFull+" not created");
            clickButton(":List Site Calendar Exceptions.Close_QPushButton_3");
        }catch(e){test.fail("Exception in defining Site Calendar Exception:"+e);}
    }
    else if(appEdition=="PostBooks")
    {
        try{
            menu = waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
            menuItem = "Sche&dule";
            
            actions = menu.actions();
            for(i=0;i<actions.count();i++)
                if(actions.at(i).text == menuItem || i==actions.count()-1) break;
            if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
            else test.pass(menuItem+"not found in "+appEdition);
        }catch(e){test.fail("Exception in verifying Schedule Menu");}
        
    }
    
    if(appEdition=="PostBooks"||appEdition=="Standard")
    {
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
            activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
            waitForObject(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6");
            activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "Planner Codes...");
            
            waitForObject(":List Planner Codes.New_QPushButton_2");
            clickButton(":List Planner Codes.New_QPushButton_2");
            waitForObject(":_code_XLineEdit_6");
            type(":_code_XLineEdit_6", "MRP-Items");
            type(":_description_XLineEdit_16", "MRP Items");
            clickButton(":Planner Code.Save_QPushButton");
            waitForObject(":List Planner Codes._plancode_XTreeWidget");
            if(object.exists("{column='0' container=':List Planner Codes._plancode_XTreeWidget' text='MRP-ITEMS' type='QModelIndex'}"))
                test.pass("Planner Code: MRP-ITEMS created");
            else test.fail("Planner Code: MRP-ITEMS not created");
            
            waitForObject(":List Planner Codes.New_QPushButton_2");
            clickButton(":List Planner Codes.New_QPushButton_2");
            waitForObject(":_code_XLineEdit_6");
            type(":_code_XLineEdit_6", "MPS-Items");
            type(":_description_XLineEdit_16", "MPS Items");
            clickButton(":Planner Code.Save_QPushButton");
            waitForObject(":List Planner Codes._plancode_XTreeWidget");
            if(object.exists(":_plancode.MPS-ITEMS_QModelIndex"))
                test.pass("Planner Code: MPS-ITEMS created");
            else test.fail("Planner Code: MPS-ITEMS not created");
            
            waitForObject(":List Planner Codes.Close_QPushButton_2");
            clickButton(":List Planner Codes.Close_QPushButton_2");
            test.log("Planner Codes created");
            
        }catch(e){test.fail("Exception in defining Planner Codes");}
        
    }//end if
    
}//end main
