function main()
{
    
    
    source(findFile("scripts","functions.js"));
    
    
    //---login Application--------
    loginAppl("RUNREGISTER");    
    
    
    var appEdition = findApplicationEdition();
//    
//   //-----------Chart Of Accounts-------------------------------
//    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");  
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
//    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
//   waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
//  
//    COA("01","01","4050","01","State Sales Tax Revenue","Revenue","SO");
//    
//    
//    waitForObject(":Chart of Accounts.Close_QPushButton_2");
//    clickButton(":Chart of Accounts.Close_QPushButton_2");
//    
//    
//    //-----Define Taxation------
//    defineTaxAuth("TAX-AUTH1");
//    defineTaxCode("TAXAUTH1-GM");
//    defineTaxType("GM","General Merchandise");
//    defineTaxType("EDU","Educational Material");
//    defineTaxZone("TZONE1","Tax Zone1");
//   assignTax("TZONE1","EDU","TAXAUTH1-EDU");
//    assignTax("TZONE1","GM","TAXAUTH1-GM");
//    RegTax("TZONE1","tax reg1");
//    
//    
    //----------Create Items---------------------
//    try{
//        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
//        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
//        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
//        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
//        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
//        activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
//        waitForObject(":Items.Query_QToolButton");
//        clickButton(":Items.Query_QToolButton");
//        
//        //-----------Create Item YTRUCK1---------------
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        waitForObject(":_itemNumber_XLineEdit_3");
//        type(":_itemNumber_XLineEdit_3","YTRUCK1");
//        type(":_description1_XLineEdit_3", "Yellow Tough Truck");
//        type(":Item._description2_XLineEdit_2", "Truck Type 1");
//        clickItem(":_itemtype_QComboBox_2", "Manufactured", 0, 0, 1, Qt.LeftButton);
//        waitForObject(":_itemGroup._classcode_XComboBox_2");
//        type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");    
//        waitForObject(":_inventoryUOM_XComboBox_3");
//        clickItem(":_inventoryUOM_XComboBox_3", "EA", 0, 0, 1, Qt.LeftButton);    
//        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
//        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//            type(":_itemGroup.Pick List_QCheckBox_3"," ");
//        if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//            type(":_itemGroup.Fractional_QCheckBox_3"," ");
//        type(":_itemGroup.XLineEdit_XLineEdit", "5.00");
//        
//        if(!findObject(":Item.Item is Sold_QGroupBox_3").checked)
//            type(":Item.Item is Sold_QGroupBox_3"," ");
//        type(":_prodcat_XComboBox_2", "CLASSIC-METAL");
//        type(":Item is Sold._listprice_XLineEdit_3", "10.99");
//        waitForObject(":Item is Sold._priceUOM_XComboBox_3");
//        clickItem(":Item is Sold._priceUOM_XComboBox_3", "EA", 0, 0, 1, Qt.LeftButton);
//        snooze(1);
//        findObject(":Item is Sold._warranty_QSpinBox_2").clear();
//        type(":Item is Sold._warranty_QSpinBox_2", "365");
//        type(":_prodWeight_XLineEdit_3", "3.5");
//        type(":_packWeight_XLineEdit_3", ".25");
//        
//        waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_8");
//        clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8","Characteristics");
//        snooze(1);
//        waitForObject(":_characteristicsTab.New_QPushButton_6");
//        clickButton(":_characteristicsTab.New_QPushButton_6");
//        
//        findObject(":_value_XLineEdit_3").clear();
//        type(":_value_XLineEdit_3", "PL-126");
//        if(!findObject(":Item Characteristic.Default_QCheckBox").checked)
//            clickButton(":Item Characteristic.Default_QCheckBox");
//        waitForObject(":List Employees.Save_QPushButton_2");
//        clickButton(":List Employees.Save_QPushButton_2");
//        waitForObject(":_characteristicsTab.New_QPushButton_6");
//        clickButton(":_characteristicsTab.New_QPushButton_6");
//        
//        findObject(":_value_XLineEdit_3").clear();    
//        type(":_value_XLineEdit_3", "PL-227");
//        if(findObject(":Item Characteristic.Default_QCheckBox").checked)
//            clickButton(":Item Characteristic.Default_QCheckBox");
//        waitForObject(":List Employees.Save_QPushButton_2");
//        clickButton(":List Employees.Save_QPushButton_2");
//        waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_8");
//        snooze(1);
//        clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8","Tax Types");    
//        waitForObject(":_taxtypesTab.New_QPushButton_10");
//        clickButton(":_taxtypesTab.New_QPushButton_10");
//        waitForObject(":_taxzone_XComboBox");
//        clickItem(":_taxzone_XComboBox", "Any",0,0,1,Qt.LeftButton);
//        while(findObject(":_taxzone_XComboBox").currentText!="Any")
//            snooze(0.1);
//        waitForObject(":_taxtype_XComboBox_4");
//        clickItem(":_taxtype_XComboBox_4", "Adjustment",0,0,1,Qt.LeftButton);
//        while(findObject(":_taxtype_XComboBox_4").currentText!="Adjustment")
//            snooze(0.1);
//        
//        waitForObject(":Item Tax.Save_QPushButton");
//        clickButton(":Item Tax.Save_QPushButton");
//        
//        waitForObject(":Item.Save_QPushButton_5");
//        clickButton(":Item.Save_QPushButton_5");
//        waitForObject(":_itemGroup.No_QPushButton");
//        clickButton(":_itemGroup.No_QPushButton");
//        snooze(2);
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists(":_item.YTRUCK1_QModelIndex"))
//            test.pass("Item Created: YTRUCK1");
//        else test.fail("Item not Created: YTRUCK1");
//        
//    }catch(e) {test.fail("Exception in creating Item: YTRUCK1"+e)}
//    
//    //----------Create Item YPAINT1------------
//    try{
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        waitForObject(":_itemNumber_XLineEdit_3");
//        type(":_itemNumber_XLineEdit_3","YPAINT1");
//        type(":_description1_XLineEdit_3", "Yellow Paint 1");
//        type(":Item._description2_XLineEdit_2", "Yellow Type 1");
//        clickItem(":_itemtype_QComboBox_2", "Purchased",0, 0, 1, Qt.LeftButton);
//        type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//        snooze(1);
//        waitForObject(":_inventoryUOM_XComboBox_3");
//        clickItem(":_inventoryUOM_XComboBox_3", "GL", 0, 0, 1, Qt.LeftButton);
//        
//        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
//        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//            type(":_itemGroup.Pick List_QCheckBox_3"," ");
//        if(!findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//            type(":_itemGroup.Fractional_QCheckBox_3"," ");
//        type(":_itemGroup.XLineEdit_XLineEdit", "2.00");
//        
//        if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//            type(":Item.Item is Sold_QGroupBox_3"," ");
//        type(":_prodWeight_XLineEdit_3", "8");
//        type(":_packWeight_XLineEdit_3", ".5");
//        waitForObject(":Item.Save_QPushButton_5");
//        clickButton(":Item.Save_QPushButton_5");
//        waitForObject(":_itemGroup.No_QPushButton");
//        clickButton(":_itemGroup.No_QPushButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='YPAINT1' type='QModelIndex'}"))
//            test.pass("Item Created: YPAINT1");
//        else test.fail("Item not created: YPAINT1");
//    }catch(e){test.fail("Exception in defining Item: YPAINT1"+e);}
//    
//    
//    
//    //----------Create Item TBODY1------------
//    try{
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        waitForObject(":_itemNumber_XLineEdit_3");
//        type(":_itemNumber_XLineEdit_3","TBODY1");
//        type(":_description1_XLineEdit_3", "Tough Truck Body Type 1");
//        type(":Item._description2_XLineEdit_2", "Truck Body");
//        clickItem(":_itemtype_QComboBox_2", "Purchased", 0, 0, 1, Qt.LeftButton);
//        snooze(1);
//        type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//        waitForObject(":_inventoryUOM_XComboBox_3");
//        clickItem(":_inventoryUOM_XComboBox_3", "EA", 0, 0, 1, Qt.LeftButton);
//        snooze(1);
//        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
//        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//            type(":_itemGroup.Pick List_QCheckBox_3"," ");
//        if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//            type(":_itemGroup.Fractional_QCheckBox_3"," ");
//        type(":_itemGroup.XLineEdit_XLineEdit", "1.50");
//        if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//            type(":Item.Item is Sold_QGroupBox_3"," ");
//        type(":_prodWeight_XLineEdit_3", ".75");
//        type(":_packWeight_XLineEdit_3", ".12");
//        waitForObject(":Item.Save_QPushButton_5");
//        clickButton(":Item.Save_QPushButton_5");
//        snooze(1);
//        waitForObject(":_itemGroup.No_QPushButton");
//        clickButton(":_itemGroup.No_QPushButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='TBODY1' type='QModelIndex'}"))
//            test.pass("Item Created: TBODY1");
//        else test.fail("Item not created: TBODY1");
//    }catch(e){test.fail("Exception in creating Item TBODY1"+e);}
//    
//    
//    //----------Create Item TWHEEL1------------
//    try{
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        waitForObject(":_itemNumber_XLineEdit_3");
//        type(":_itemNumber_XLineEdit_3","TWHEEL1");
//        type(":_description1_XLineEdit_3", "TruckTruck Body1");
//        type(":Item._description2_XLineEdit_2", "Wheels Type 1");
//        type(":_itemtype_QComboBox_2", "Purchased");	
//        type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//        waitForObject(":_inventoryUOM_XComboBox_3");
//        clickItem(":_inventoryUOM_XComboBox_3", "EA", 0, 0, 1, Qt.LeftButton);
//        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
//        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//            type(":_itemGroup.Pick List_QCheckBox_3"," ");
//        if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//            type(":_itemGroup.Fractional_QCheckBox_3"," ");
//        type(":_itemGroup.XLineEdit_XLineEdit", ".50");
//        if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//            type(":Item.Item is Sold_QGroupBox_3"," ");
//        type(":_prodWeight_XLineEdit_3", ".1");
//        type(":_packWeight_XLineEdit_3", ".01");
//        clickButton(":Item.Save_QPushButton_5");
//        waitForObject(":_itemGroup.No_QPushButton");
//        clickButton(":_itemGroup.No_QPushButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='TWHEEL1' type='QModelIndex'}"))
//            test.pass("Item Created: TWHEEL1");
//        else test.fail("Item not created: TWHEEL1");
//    }catch(e){test.fail("Exception in defining Item TWHEEL1:"+e);}
//    
//    
//    //----------Create Item TSUB1------------
//    try{
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        waitForObject(":_itemNumber_XLineEdit_3");
//        type(":_itemNumber_XLineEdit_3","TSUB1");
//        type(":_description1_XLineEdit_3", "Truck Kit Type 1");
//        type(":Item._description2_XLineEdit_2", "Truck Kit");
//        clickItem(":_itemtype_QComboBox_2", "Manufactured", 0, 0, 1, Qt.LeftButton);
//        type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//        waitForObject(":_inventoryUOM_XComboBox_3");    
//        clickItem(":_inventoryUOM_XComboBox_3", "EA", 0, 0, 1, Qt.LeftButton);    
//        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
//        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//            type(":_itemGroup.Pick List_QCheckBox_3"," ");
//        if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//            type(":_itemGroup.Fractional_QCheckBox_3"," ");
//        type(":_itemGroup.XLineEdit_XLineEdit", "2.00");
//        if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//            type(":Item.Item is Sold_QGroupBox_3"," ");
//        type(":_prodWeight_XLineEdit_3", ".25");
//        type(":_packWeight_XLineEdit_3", ".1");
//        clickButton(":Item.Save_QPushButton_5");
//        waitForObject(":_itemGroup.No_QPushButton");
//        clickButton(":_itemGroup.No_QPushButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='TSUB1' type='QModelIndex'}"))
//            test.pass("Item Created: TSUB1");
//        else test.fail("Item not created: TSUB1");
//    }catch(e){test.fail("Exception in defining Item TSUB1:"+e);}
//    
//    
//    
//    //----------Create Item TBOX1------------
//    try{
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        waitForObject(":_itemNumber_XLineEdit_3");
//        type(":_itemNumber_XLineEdit_3","TBOX1");
//        type(":_description1_XLineEdit_3", "Product Box Type 1");
//        type(":Item._description2_XLineEdit_2", "Product Box");
//        clickItem(":_itemtype_QComboBox_2", "Purchased", 0, 0, 1, Qt.LeftButton);    
//        type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//        waitForObject(":_inventoryUOM_XComboBox_3");       
//        clickItem(":_inventoryUOM_XComboBox_3", "EA", 0, 0, 1, Qt.LeftButton);            
//        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
//        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//            type(":_itemGroup.Pick List_QCheckBox_3"," ");
//        if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//            type(":_itemGroup.Fractional_QCheckBox_3"," ");
//        type(":_itemGroup.XLineEdit_XLineEdit", ".10");
//        if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//            type(":Item.Item is Sold_QGroupBox_3"," ");
//        type(":_prodWeight_XLineEdit_3", ".20");
//        type(":_packWeight_XLineEdit_3", "0");
//        clickButton(":Item.Save_QPushButton_5");
//        waitForObject(":_itemGroup.No_QPushButton");
//        clickButton(":_itemGroup.No_QPushButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='TBOX1' type='QModelIndex'}"))
//            
//            test.pass("Item Created: TBOX1");
//        else test.fail("Item not created: TBOX1");
//    }catch(e){test.fail("Exception in creating item TBOX1:"+e);}
//    
//    
//    //----------Create Item TINSERT1------------
//    try{
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        waitForObject(":_itemNumber_XLineEdit_3");
//        type(":_itemNumber_XLineEdit_3","TINSERT1");
//        type(":_description1_XLineEdit_3", "Packaging Insert Type 1");
//        type(":Item._description2_XLineEdit_2", "Insert Type 1");
//        clickItem(":_itemtype_QComboBox_2", "Purchased", 0, 0, 1, Qt.LeftButton);                
//        type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");                
//        waitForObject(":_inventoryUOM_XComboBox_3"); 
//        clickItem(":_inventoryUOM_XComboBox_3", "EA", 0, 0, 1, Qt.LeftButton);                    
//        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
//        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//            type(":_itemGroup.Pick List_QCheckBox_3"," ");
//        if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//            type(":_itemGroup.Fractional_QCheckBox_3"," ");
//        type(":_itemGroup.XLineEdit_XLineEdit", ".10");
//        if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//            type(":Item.Item is Sold_QGroupBox_3"," ");
//        type(":_prodWeight_XLineEdit_3", ".02");
//        type(":_packWeight_XLineEdit_3", ".01");
//        clickButton(":Item.Save_QPushButton_5");
//        waitForObject(":_itemGroup.No_QPushButton");
//        clickButton(":_itemGroup.No_QPushButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='TINSERT1' type='QModelIndex'}"))
//            
//            test.pass("Item Created: TINSERT1");
//        else test.fail("Item not created: TINSERT1");
//        
//        waitForObject(":Tax Authorities.Close_QToolButton");
//        clickButton(":Tax Authorities.Close_QToolButton");
//    }catch(e){test.fail("Exception in creating item: TINSERT1")}
//    
//    
//    
//    //---------------Create Item sites------------------------------
//    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        
//        //---------Item site: YTRUCK1----------------------
//        
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        
//        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
//        type(":Item Sites.ItemLineEdit_ItemLineEdit","YTRUCK1");
//        snooze(1);
//        nativeType("<Tab>");
//        snooze(1);
//        
//        waitForObject(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3");
//        if(appEdition=="Manufacturing"||appEdition=="Standard")
//            clickItem(":_warehouse_WComboBox_5", "WH1", 0, 0, 1, Qt.LeftButton);  
//        else if(appEdition=="PostBooks")
//            test.xverify(object.exists(":_warehouse_WComboBox_5"), "Warehouse ComboBox not found");
//        waitForObject(":Item Site.Site can manufacture this Item_QGroupBox");
//        if(!findObject(":Item Site.Site can manufacture this Item_QGroupBox").checked)
//            mouseClick(":Item Site.Site can manufacture this Item_QGroupBox", 13, 7, 0, Qt.LeftButton);
//        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
//        if(!findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
//            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
//        type(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3","<Ctrl+A>");
//        type(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3","<Del>");
//        type(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3","1");
//        clickButton(":Costing Method.Standard_QRadioButton_3");
//        clickItem(":Control._controlMethod_XComboBox_3", "Regular", 0, 0, 1, Qt.LeftButton);  
//        
//        clickItem(":_plannerCode_XComboBox_2", "MRP-ITEMS-MRP Items", 0, 0, 1, Qt.LeftButton);                   
//        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1", 0, 0, 1, Qt.LeftButton); 
//        waitForObject(":_inventory.Stocked_QCheckBox_3");
//        if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//            clickButton(":_inventory.Stocked_QCheckBox_3");
//        if(!findObject(":Settings.Allow Automatic ABC Updates_QCheckBox").checked)
//            clickButton(":Settings.Allow Automatic ABC Updates_QCheckBox");
//        type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//        type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//        type(":_cycleCountFreq_QSpinBox_3", "30");
//        type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//        type(":_eventFence_QSpinBox_4", "<Del>");
//        type(":_eventFence_QSpinBox_4", "10");
//        snooze(2);
//        waitForObject(":Item Site.qt_tabwidget_tabbar_QTabBar");
//        clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
//        snooze(1)
//                while(!object.exists(":_planningTab.Enforce Order Parameters_QGroupBox_3"))
//                    snooze(0.1);
//        snooze(1);
//        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
//        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
//            type(":_planningTab.Enforce Order Parameters_QGroupBox_3", " ");
//        
//        waitForObject(":_reorderLevel_XLineEdit_3");
//        type(":_reorderLevel_XLineEdit_3", "0.00");
//        type(":_orderUpToQty_XLineEdit_3", "0.00");
//        type(":_minimumOrder_XLineEdit_3", "100");
//        type(":_maximumOrder_XLineEdit_3", "10000");
//        type(":_orderMultiple_XLineEdit_3", "100");
//        waitForObject(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//        if(appEdition=="Manufacturing")
//        {
//            clickItem(":Scheduling._planningType_XComboBox","MRP",1,0,0,Qt.LeftButton);
//            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
//            type(":Scheduling.qt_spinbox_lineedit_QLineEdit", "7");
//            
//        }
//        else if(appEdition=="PostBooks" || appEdition=="Standard")
//        {
//            test.xverify(object.exists(":_mrp._orderGroup_QSpinBox_3"), "MRP order group not found");
//            test.xverify(object.exists(":_mrp._mpsTimeFence_QSpinBox_3"), "MPS time fence not found");
//        }   
//        if(appEdition=="Manufacturing" || appEdition=="Standard")
//        {
//            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_2").clear();
//            type(":Scheduling.qt_spinbox_lineedit_QLineEdit_2", "1");
//        }
//        
//        waitForObject(":Item Site.Save_QPushButton");
//        clickButton(":Item Site.Save_QPushButton");
//        if(appEdition=="Manufacturing"||appEdition=="Standard")
//        {
//            waitForObject(":Item Site.Cancel_QPushButton");
//            clickButton(":Item Site.Cancel_QPushButton");
//        }
//        waitForObject(":Items.Query_QToolButton");
//        clickButton(":Items.Query_QToolButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='YTRUCK1' type='QModelIndex'}"))
//            test.pass("Item Site Created: YTRUCK1");
//        else test.fail("Item Site is not Created: YTRUCK1");
//    }catch(e){test.fail("Exception in creating Item site of YTRUCK1:"+e);}
//    
//    
//    
//    //---------Item site: TBODY1----------------------
//    
//    try{
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        
//        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
//        type(":Item Sites.ItemLineEdit_ItemLineEdit","TBODY1");
//        snooze(1);
//        nativeType("<Tab>");
//        snooze(1);
//        
//        waitForObject(":Item Site.Sold from this Site_QGroupBox");
//        if(appEdition=="Manufacturing"||appEdition=="Standard")
//            clickItem(":_warehouse_WComboBox_5", "WH1", 0, 0, 1, Qt.LeftButton);
//        else if(appEdition=="PostBooks")
//            test.xverify(object.exists(":_warehouse_WComboBox_5"), " Warehouse ComboBox not found");
//        if(!findObject(":Item Site.Site can manufacture this Item_QGroupBox").checked)
//            mouseClick(":Item Site.Site can manufacture this Item_QGroupBox", 13, 7, 0, Qt.LeftButton);
//        
//        type(":Item Site.Sold from this Site_QGroupBox"," ");
//        snooze(1);
//        waitForObject(":Costing Method.Standard_QRadioButton_3");
//        clickButton(":Costing Method.Standard_QRadioButton_3");
//        waitForObject(":Control._controlMethod_XComboBox_3");
//        clickItem(":Control._controlMethod_XComboBox_3", "Regular", 0, 0, 1, Qt.LeftButton);                    	
//        waitForObject(":_plannerCode_XComboBox_2");
//        clickItem(":_plannerCode_XComboBox_2", "MRP-ITEMS-MRP Items", 0, 0, 1, Qt.LeftButton);                   
//        waitForObject(":_costcat_XComboBox_3");
//        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1", 0, 0, 1, Qt.LeftButton);                        
//        waitForObject(":_inventory.Stocked_QCheckBox_3");
//        if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//            clickButton(":_inventory.Stocked_QCheckBox_3");
//        if(!findObject(":Settings.Allow Automatic ABC Updates_QCheckBox").checked)
//            clickButton(":Settings.Allow Automatic ABC Updates_QCheckBox");
//        type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//        type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//        type(":_cycleCountFreq_QSpinBox_3", "30");
//        type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//        type(":_eventFence_QSpinBox_4", "<Del>");
//        type(":_eventFence_QSpinBox_4", "10");
//        snooze(2); 
//        waitForObject(":Item Site.qt_tabwidget_tabbar_QTabBar");
//        clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
//        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
//        snooze(2);
//        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
//            type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
//        snooze(1);
//        waitForObject(":_reorderLevel_XLineEdit_3");
//        type(":_reorderLevel_XLineEdit_3", "0.00");
//        type(":_orderUpToQty_XLineEdit_3", "0.00");
//        type(":_minimumOrder_XLineEdit_3", "100");
//        type(":_maximumOrder_XLineEdit_3", "10000");
//        type(":_orderMultiple_XLineEdit_3", "100");
//        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//        if(appEdition=="Manufacturing")
//        {
//            
//            clickItem(":Scheduling._planningType_XComboBox","MRP",1,0,0,Qt.LeftButton);
//            waitForObject(":Scheduling.qt_spinbox_lineedit_QLineEdit");
//            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
//            type(":Scheduling.qt_spinbox_lineedit_QLineEdit", "7");
//            
//        }
//        else if(appEdition=="PostBooks" || appEdition=="Standard")
//        {
//            test.xverify(object.exists(":_mrp._orderGroup_QSpinBox_3"), "MRP order group not found");
//            test.xverify(object.exists(":_mrp._mpsTimeFence_QSpinBox_3"), "MPS time fence not found");
//        } 
//        if(appEdition=="Manufacturing" || appEdition=="Standard")
//        {
//            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_2").clear();
//            type(":Scheduling.qt_spinbox_lineedit_QLineEdit_2", "1");
//        }
//        
//        waitForObject(":Item Site.Save_QPushButton");
//        clickButton(":Item Site.Save_QPushButton");
//        if(appEdition=="Manufacturing"||appEdition=="Standard")
//        {
//            
//            waitForObject(":Item Site.Cancel_QPushButton");
//            clickButton(":Item Site.Cancel_QPushButton");
//        }
//        snooze(1);
//        waitForObject(":Items.Query_QToolButton");
//        clickButton(":Items.Query_QToolButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TBODY1' type='QModelIndex'}"))
//            test.pass("Item Site Created: TBODY1");
//        else test.fail("Item site not created for TBODY1");
//    }catch(e){test.fail("Exception in creating TBODY1:"+e)}
//    
//    
//    
//    
//    //---------Item site: TINSERT1----------------------
//    snooze(1);
//    try{
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
//        type(":Item Sites.ItemLineEdit_ItemLineEdit","TINSERT1");
//        snooze(1);
//        nativeType("<Tab>");
//        snooze(1);
//        waitForObject(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3");
//        if(appEdition=="Manufacturing"||appEdition=="Standard")
//            clickItem(":_warehouse_WComboBox_5", "WH1", 0, 0, 1, Qt.LeftButton);
//        else if(appEdition=="PostBooks")
//            test.xverify(object.exists(":_warehouse_WComboBox_5"), " Warehouse ComboBox not found");
//        if(!findObject(":Item Site.Site can manufacture this Item_QGroupBox").checked)
//            mouseClick(":Item Site.Site can manufacture this Item_QGroupBox", 13, 7, 0, Qt.LeftButton);
//        type(":Item Site.Sold from this Site_QGroupBox"," ");
//        snooze(1);
//        clickButton(":Costing Method.Standard_QRadioButton_3");
//        waitForObject(":Control._controlMethod_XComboBox_3");
//        clickItem(":Control._controlMethod_XComboBox_3", "Regular", 0, 0, 1, Qt.LeftButton);                    	
//        waitForObject(":_plannerCode_XComboBox_2");
//        clickItem(":_plannerCode_XComboBox_2", "MRP-ITEMS-MRP Items", 0, 0, 1, Qt.LeftButton);                   
//        waitForObject(":_costcat_XComboBox_3");
//        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1", 0, 0, 1, Qt.LeftButton);                    
//        waitForObject(":_inventory.Stocked_QCheckBox_3");    
//        if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//            clickButton(":_inventory.Stocked_QCheckBox_3");
//        if(!findObject(":Settings.Allow Automatic ABC Updates_QCheckBox").checked)
//            clickButton(":Settings.Allow Automatic ABC Updates_QCheckBox");
//        type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//        type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//        type(":_cycleCountFreq_QSpinBox_3", "30");
//        type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//        type(":_eventFence_QSpinBox_4", "<Del>");
//        type(":_eventFence_QSpinBox_4", "10");
//        snooze(2);  
//        waitForObject(":Item Site.qt_tabwidget_tabbar_QTabBar");
//        clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
//        snooze(1);
//        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
//        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
//            type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
//        waitForObject(":_reorderLevel_XLineEdit_3");
//        type(":_reorderLevel_XLineEdit_3", "0.00");
//        type(":_orderUpToQty_XLineEdit_3", "0.00");
//        type(":_minimumOrder_XLineEdit_3", "100");
//        type(":_maximumOrder_XLineEdit_3", "10000");
//        type(":_orderMultiple_XLineEdit_3", "100");
//        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//        if(appEdition=="Manufacturing")
//        {
//            
//            clickItem(":Scheduling._planningType_XComboBox","MRP",1,0,0,Qt.LeftButton);
//            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
//            type(":Scheduling.qt_spinbox_lineedit_QLineEdit", "7");
//            
//        }
//        else if(appEdition=="PostBooks" || appEdition=="Standard")
//        {
//            test.xverify(object.exists(":_mrp._orderGroup_QSpinBox_3"), "MRP order group not found");
//            test.xverify(object.exists(":_mrp._mpsTimeFence_QSpinBox_3"), "MPS time fence not found");
//        }  
//        if(appEdition=="Manufacturing" || appEdition=="Standard")
//        {
//            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_2").clear();
//            type(":Scheduling.qt_spinbox_lineedit_QLineEdit_2", "1");
//        }
//        
//        waitForObject(":Item Site.Save_QPushButton");
//        clickButton(":Item Site.Save_QPushButton");
//        if(appEdition=="Manufacturing"||appEdition=="Standard")
//        {
//            
//            waitForObject(":Item Site.Cancel_QPushButton");
//            clickButton(":Item Site.Cancel_QPushButton");
//        }
//        waitForObject(":Items.Query_QToolButton");
//        clickButton(":Items.Query_QToolButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TINSERT1' type='QModelIndex'}"))
//            test.pass("Item Site Created: TINSERT1");
//        else test.fail("Item site not created for TINSERT1");
//    }catch(e){test.fail("Exception in creating item TINSERT1:"+e);}
//    
//    snooze(1);
//    
//    //---------Item site: TWHEEL1----------------------
//    try{
//        waitForObject(":Tax Authorities.New_QToolButton");
//        clickButton(":Tax Authorities.New_QToolButton");
//        
//        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
//        type(":Item Sites.ItemLineEdit_ItemLineEdit","TWHEEL1");
//        snooze(1);
//        nativeType("<Tab>");
//        snooze(1);
//        waitForObject(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3");
//        if(appEdition=="Manufacturing"||appEdition=="Standard")
//            clickItem(":_warehouse_WComboBox_5", "WH1", 0, 0, 1, Qt.LeftButton);
//        else if(appEdition=="PostBooks")
//            test.xverify(object.exists(":_warehouse_WComboBox_5"), " Warehouse ComboBox not found");
//        if(!findObject(":Item Site.Site can manufacture this Item_QGroupBox").checked)
//            mouseClick(":Item Site.Site can manufacture this Item_QGroupBox", 13, 7, 0, Qt.LeftButton);
//        type(":Item Site.Sold from this Site_QGroupBox"," ");
//        clickButton(":Costing Method.Standard_QRadioButton_3");
//        waitForObject(":Control._controlMethod_XComboBox_3");
//        clickItem(":Control._controlMethod_XComboBox_3", "Regular", 0, 0, 1, Qt.LeftButton);
//        waitForObject(":_plannerCode_XComboBox_2");
//        clickItem(":_plannerCode_XComboBox_2", "MRP-ITEMS-MRP Items", 0, 0, 1, Qt.LeftButton);
//        waitForObject(":_costcat_XComboBox_3");
//        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1", 0, 0, 1, Qt.LeftButton);    
//        waitForObject(":_inventory.Stocked_QCheckBox_3");
//        waitForObject(":_inventory.Stocked_QCheckBox_3");    
//        if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//            clickButton(":_inventory.Stocked_QCheckBox_3");
//        if(!findObject(":Settings.Allow Automatic ABC Updates_QCheckBox").checked)
//            clickButton(":Settings.Allow Automatic ABC Updates_QCheckBox");
//        type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//        type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//        type(":_cycleCountFreq_QSpinBox_3", "30");
//        type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//        type(":_eventFence_QSpinBox_4", "<Del>");
//        type(":_eventFence_QSpinBox_4", "10");
//        snooze(2);      
//        clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
//        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
//        snooze(1);
//        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
//            type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
//        waitForObject(":_reorderLevel_XLineEdit_3");
//        type(":_reorderLevel_XLineEdit_3", "0.00");
//        type(":_orderUpToQty_XLineEdit_3", "0.00");
//        type(":_minimumOrder_XLineEdit_3", "100");
//        type(":_maximumOrder_XLineEdit_3", "10000");
//        type(":_orderMultiple_XLineEdit_3", "100");
//        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//        if(appEdition=="Manufacturing")
//        {
//            
//            clickItem(":Scheduling._planningType_XComboBox","MRP",1,0,0,Qt.LeftButton);
//            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
//            type(":Scheduling.qt_spinbox_lineedit_QLineEdit", "7");
//            
//        }
//        else if(appEdition=="PostBooks" || appEdition=="Standard")
//        {
//            test.xverify(object.exists(":_mrp._orderGroup_QSpinBox_3"), "MRP order group not found");
//            test.xverify(object.exists(":_mrp._mpsTimeFence_QSpinBox_3"), "MPS time fence not found");
//        }  
//        if(appEdition=="Manufacturing" || appEdition=="Standard")
//        {
//            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_2").clear();
//            type(":Scheduling.qt_spinbox_lineedit_QLineEdit_2", "1");
//        }
//        waitForObject(":Item Site.Save_QPushButton");
//        clickButton(":Item Site.Save_QPushButton");
//        if(appEdition=="Manufacturing"||appEdition=="Standard")
//        {
//            
//            waitForObject(":Item Site.Cancel_QPushButton");
//            clickButton(":Item Site.Cancel_QPushButton");
//        }
//        waitForObject(":Items.Query_QToolButton");
//        clickButton(":Items.Query_QToolButton");
//        waitForObject(":_list_XTreeWidget_3");
//        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TWHEEL1' type='QModelIndex'}"))
//            test.pass("Item Site Created: TWHEEL1");
//        else test.fail("Item site not created for TWHEEL1");
//        
//    }catch(e){test.fail("Exception in creating item TWHEEL1:"+e);}
//    
    snooze(1);
    
    //---------Item site: TSUB1----------------------
    try{
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit","TSUB1");
        snooze(1);
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            clickItem(":_warehouse_WComboBox_5", "WH1", 0, 0, 1, Qt.LeftButton);
        else if(appEdition=="PostBooks")
            test.xverify(object.exists(":_warehouse_WComboBox_5"), " Warehouse ComboBox not found");
        if(!findObject(":Item Site.Site can manufacture this Item_QGroupBox").checked)
            mouseClick(":Item Site.Site can manufacture this Item_QGroupBox", 13, 7, 0, Qt.LeftButton);
        type(":Item Site.Sold from this Site_QGroupBox"," ");
        clickButton(":Costing Method.Standard_QRadioButton_3");
        clickItem(":Control._controlMethod_XComboBox_3", "Regular", 0, 0, 1, Qt.LeftButton);
        clickItem(":_plannerCode_XComboBox_2", "MRP-ITEMS-MRP Items", 0, 0, 1, Qt.LeftButton);
        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1", 0, 0, 1, Qt.LeftButton);    
        waitForObject(":_inventory.Stocked_QCheckBox_3");    
        if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
            clickButton(":_inventory.Stocked_QCheckBox_3");
        if(!findObject(":Settings.Allow Automatic ABC Updates_QCheckBox").checked)
            clickButton(":Settings.Allow Automatic ABC Updates_QCheckBox");
        type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
        type(":_cycleCountFreq_QSpinBox_3", "<Del>");
        type(":_cycleCountFreq_QSpinBox_3", "30");
        type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
        type(":_eventFence_QSpinBox_4", "<Del>");
        type(":_eventFence_QSpinBox_4", "10");
        snooze(2);
        clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
        snooze(1);
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
        waitForObject(":_reorderLevel_XLineEdit_3");
        type(":_reorderLevel_XLineEdit_3", "0.00");
        type(":_orderUpToQty_XLineEdit_3", "0.00");
        type(":_minimumOrder_XLineEdit_3", "100");
        type(":_maximumOrder_XLineEdit_3", "10000");
        type(":_orderMultiple_XLineEdit_3", "100");
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
        if(appEdition=="Manufacturing" )
        {
            clickItem(":Scheduling._planningType_XComboBox","MRP",1,0,0,Qt.LeftButton);
            snooze(1);
            waitForObject(":Scheduling.qt_spinbox_lineedit_QLineEdit");
            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
            type(":Scheduling.qt_spinbox_lineedit_QLineEdit", "7");
            
        }
        else if(appEdition=="PostBooks" || appEdition=="Standard")
        {
            test.xverify(object.exists(":_mrp._orderGroup_QSpinBox_3"), "MRP order group not found");
            test.xverify(object.exists(":_mrp._mpsTimeFence_QSpinBox_3"), "MPS time fence not found");
        }  
        if(appEdition=="Manufacturing" || appEdition=="Standard")
        {  
            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_2").clear();
            type(":Scheduling.qt_spinbox_lineedit_QLineEdit_2", "1");
        }
        
        waitForObject(":Item Site.Save_QPushButton");
        clickButton(":Item Site.Save_QPushButton");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            
            waitForObject(":Item Site.Cancel_QPushButton");
            clickButton(":Item Site.Cancel_QPushButton");
        }
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='TSUB1' type='QModelIndex'}"))
            test.pass("Item Site Created: TSUB1");
    }catch(e){test.fail("Exception in creating Item site for TSUB1:"+e);}
    
    snooze(1);
    
    //---------Item site: TBOX1----------------------
    try{
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit","TBOX1");
        snooze(1);
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            clickItem(":_warehouse_WComboBox_5", "WH1", 5, 5, 1, Qt.LeftButton);
        else if(appEdition=="PostBooks")
            test.xverify(object.exists(":_warehouse_WComboBox_5"), " Warehouse ComboBox not found");
        if(!findObject(":Item Site.Site can manufacture this Item_QGroupBox").checked)
            mouseClick(":Item Site.Site can manufacture this Item_QGroupBox", 13, 7, 0, Qt.LeftButton);
        type(":Item Site.Sold from this Site_QGroupBox"," ");
        clickButton(":Costing Method.Standard_QRadioButton_3");
        clickItem(":Control._controlMethod_XComboBox_3", "Regular", 5, 5, 1, Qt.LeftButton);
        clickItem(":_plannerCode_XComboBox_2", "MRP-ITEMS-MRP Items", 5, 5, 1, Qt.LeftButton);
        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_inventory.Stocked_QCheckBox_3");    
        if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
            clickButton(":_inventory.Stocked_QCheckBox_3");
        if(!findObject(":Settings.Allow Automatic ABC Updates_QCheckBox").checked)
            clickButton(":Settings.Allow Automatic ABC Updates_QCheckBox");
        type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
        type(":_cycleCountFreq_QSpinBox_3", "<Del>");
        type(":_cycleCountFreq_QSpinBox_3", "30");
        type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
        type(":_eventFence_QSpinBox_4", "<Del>");
        type(":_eventFence_QSpinBox_4", "10");
        snooze(2);
        waitForObject(":Item Site.qt_tabwidget_tabbar_QTabBar");
        snooze(1);
        clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
        waitForObject(":_reorderLevel_XLineEdit_3");
        type(":_reorderLevel_XLineEdit_3", "0.00");
        type(":_orderUpToQty_XLineEdit_3", "0.00");
        type(":_minimumOrder_XLineEdit_3", "100");
        type(":_maximumOrder_XLineEdit_3", "10000");
        type(":_orderMultiple_XLineEdit_3", "100");
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
        if(appEdition=="Manufacturing")
        {
            
            clickItem(":Scheduling._planningType_XComboBox","MRP",1,0,0,Qt.LeftButton);
            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
            type(":Scheduling.qt_spinbox_lineedit_QLineEdit", "7");
            
        }
        else if(appEdition=="PostBooks" || appEdition=="Standard")
        {
            test.xverify(object.exists(":_mrp._orderGroup_QSpinBox_3"), "MRP order group not found");
            test.xverify(object.exists(":_mrp._mpsTimeFence_QSpinBox_3"), "MPS time fence not found");
        }  
        if(appEdition=="Manufacturing" || appEdition=="Standard")
        {
            waitForObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_2");
            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_2").clear();
            type(":Scheduling.qt_spinbox_lineedit_QLineEdit_2", "1");
        }
        
        waitForObject(":Item Site.Save_QPushButton");
        clickButton(":Item Site.Save_QPushButton");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            
            waitForObject(":Item Site.Cancel_QPushButton");
            clickButton(":Item Site.Cancel_QPushButton");
        }
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TBOX1' type='QModelIndex'}"))
            test.pass("Item Site Created: TBOX1");
        else test.fail("Item site not created for TBOX1");
    }catch(e){test.fail("Exception in creating Item TBOX1:"+e)}
    
    //---------Item site: YPAINT1----------------------
    try{
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        snooze(0.5);
        
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit","YPAINT1");
        snooze(1);
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            clickItem(":_warehouse_WComboBox_5", "WH1", 0, 0, 1, Qt.LeftButton);
        else if(appEdition=="PostBooks")
            test.xverify(object.exists(":_warehouse_WComboBox_5"), " Warehouse ComboBox not found");
        if(!findObject(":Item Site.Site can manufacture this Item_QGroupBox").checked)
            mouseClick(":Item Site.Site can manufacture this Item_QGroupBox", 13, 7, 0, Qt.LeftButton);
        type(":Item Site.Sold from this Site_QGroupBox"," ");
        clickButton(":Costing Method.Standard_QRadioButton_3");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
            clickItem(":Control._controlMethod_XComboBox_3", "Lot #", 0, 0, 1, Qt.LeftButton);
        else if(appEdition=="PostBooks")
            clickItem(":Control._controlMethod_XComboBox_3", "Regular", 0, 0, 1, Qt.LeftButton);
        clickItem(":_plannerCode_XComboBox_2", "MRP-ITEMS-MRP Items", 0, 0, 1, Qt.LeftButton);    
        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1", 0, 0, 1, Qt.LeftButton);    
        waitForObject(":_inventory.Stocked_QCheckBox_3");    
        if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
            clickButton(":_inventory.Stocked_QCheckBox_3");
        if(!findObject(":Settings.Allow Automatic ABC Updates_QCheckBox").checked)
            clickButton(":Settings.Allow Automatic ABC Updates_QCheckBox");
        waitForObject(":_cycleCountFreq_QSpinBox_3");
        findObject(":_cycleCountFreq_QSpinBox_3").clear();
        type(":_cycleCountFreq_QSpinBox_3", "30");
        findObject(":_eventFence_QSpinBox_4").clear();
        type(":_eventFence_QSpinBox_4", "10");
        snooze(2);
        waitForObject(":Item Site.qt_tabwidget_tabbar_QTabBar");
        snooze(2);
        clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");	
        snooze(1);
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
        waitForObject(":_reorderLevel_XLineEdit_3");
        type(":_reorderLevel_XLineEdit_3", "0.00");
        type(":_orderUpToQty_XLineEdit_3", "0.00");
        type(":_minimumOrder_XLineEdit_3", "100");
        type(":_maximumOrder_XLineEdit_3", "10000");
        type(":_orderMultiple_XLineEdit_3", "100");
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
        if(appEdition=="Manufacturing")
        {
            
            waitForObject(":Scheduling._planningType_XComboBox");
            clickItem(":Scheduling._planningType_XComboBox","MRP",0,0,0,Qt.LeftButton);
            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
            type(":Scheduling.qt_spinbox_lineedit_QLineEdit", "7");
            
        }
        else if(appEdition=="PostBooks" || appEdition=="Standard")
        {
            test.xverify(object.exists(":_mrp._orderGroup_QSpinBox_3"), "MRP order group not found");
            test.xverify(object.exists(":_mrp._mpsTimeFence_QSpinBox_3"), "MPS time fence not found");
        }  
        if(appEdition=="Manufacturing" || appEdition=="Standard")
        {
            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_2").clear();
            type(":Scheduling.qt_spinbox_lineedit_QLineEdit_2", "1");
        }
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            
            clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Expiration");
            waitForObject(":_expirationTab.Perishable_QCheckBox_2");
            clickButton(":_expirationTab.Perishable_QCheckBox_2");
            clickButton(":_expirationTab.Requires Warranty when Purchased_QCheckBox_2");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_expirationTab.Perishable_QCheckBox_2"), " Expiration tab not found");
        }   
        clickButton(":Item Site.Save_QPushButton");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            
            waitForObject(":Item Site.Cancel_QPushButton");
            clickButton(":Item Site.Cancel_QPushButton");
        }
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='YPAINT1' type='QModelIndex'}"))
            test.pass("Item Site Created: YPAINT1");
        else test.fail("Item site not created for YPAINT1");
        
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
    }catch(e){test.fail("Exception in creating Item site of YPAINT1:"+e);}
    
    
    
}
