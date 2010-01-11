function main()
{
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER"); 
    var appEdition = findApplicationEdition();
    
    
    
    //----------Create Items---------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
        waitForObject(":xTuple ERP: OpenMFG Edition.Item_QMenu");
        activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
        
        
        //-----------Create Item RTRUCK1---------------
        waitForObject(":List Items.New_QPushButton_2");
        clickButton(":List Items.New_QPushButton_2");
        waitForObject(":_itemNumber_XLineEdit_3");
        type(":_itemNumber_XLineEdit_3","RTRUCK1");
        type(":_description1_XLineEdit_3", "Red Collector’s Truck");
        type(":Item._description2_XLineEdit_2", "Truck Type 1");
        clickItem(":_itemtype_QComboBox_2", "Manufactured",0,0,1,Qt.LeftButton);
        clickItem(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS-Toy Trucks",0,0,1,Qt.LeftButton);
        waitForObject(":_inventoryUOM_XComboBox_3");
        clickItem(":_inventoryUOM_XComboBox_3", "EA",0,0,1,Qt.LeftButton);
        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
            type(":_itemGroup.Pick List_QCheckBox_3"," ");
        if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
            type(":_itemGroup.Fractional_QCheckBox_3"," ");
        type(":_itemGroup_XLineEdit_3", "5.00");
        
        if(!findObject(":Item.Item is Sold_QGroupBox_3").checked)
            type(":Item.Item is Sold_QGroupBox_3"," ");
        snooze(2);
        waitForObject(":_prodcat_XComboBox_2");
        clickItem(":_prodcat_XComboBox_2", "CLASSIC-METAL - Classic Metal Product Line",0,0,1,Qt.LeftButton);
        snooze(1);
        waitForObject(":Item is Sold._upcCode_XLineEdit_3");
        type(":Item is Sold._upcCode_XLineEdit_3", "1234-5432");
        waitForObject(":Item is Sold._listprice_XLineEdit_3");
        type(":Item is Sold._listprice_XLineEdit_3", "10.99");
        waitForObject(":Item is Sold._priceUOM_XComboBox_3");
        clickItem(":Item is Sold._priceUOM_XComboBox_3", "EA",0,0,1,Qt.LeftButton);  
        type(":Item is Sold._warranty_QSpinBox_2", "365");
        type(":_prodWeight_XLineEdit_3", "3.5");
        type(":_packWeight_XLineEdit_3", ".25");
        snooze(2);
        clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Characteristics");
        snooze(1);
        waitForObject(":_characteristicsTab.New_QPushButton_6");
        clickButton(":_characteristicsTab.New_QPushButton_6");
        snooze(1);
        waitForObject(":_char_XComboBox_2");
        clickItem(":_char_XComboBox_2", "I-COLOR - Product Color",0,0,1,Qt.LeftButton);
        snooze(1);
        waitForObject(":_value_XLineEdit_3");
        type(":_value_XLineEdit_3", "PL-126");
        waitForObject(":Item Characteristic.Save_QPushButton");
        clickButton(":Item Characteristic.Save_QPushButton");
        
        snooze(2);
        waitForObject(":_characteristicsTab.New_QPushButton_6");
        clickButton(":_characteristicsTab.New_QPushButton_6");
        waitForObject(":_char_XComboBox_2");
        clickItem(":_char_XComboBox_2", "I-COLOR - Product Color",0,0,1,Qt.LeftButton);
        snooze(1);
        type(":_value_XLineEdit_3", "PL-227");
        waitForObject(":Item Characteristic.Save_QPushButton");    
        clickButton(":Item Characteristic.Save_QPushButton");
        snooze(1);
        waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_8");
        clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Tax Types");
        snooze(1);
        waitForObject(":_taxtypesTab.New_QPushButton_10");
        clickButton(":_taxtypesTab.New_QPushButton_10");
        
        waitForObject(":_taxzone_XComboBox");
        clickItem(":_taxzone_XComboBox", "TZONE1-Tax Zone1", 0, 0, 1, Qt.LeftButton);
        while(findObject(":_taxzone_XComboBox").currentText!="TZONE1-Tax Zone1")
            snooze(0.5);
        waitForObject(":_taxtype_XComboBox_4");
        clickItem(":_taxtype_XComboBox_4", "GM",0,0,1,Qt.LeftButton);
        while(findObject(":_taxtype_XComboBox_4").currentText!="GM")
            snooze(1);
        waitForObject(":Item Tax.Save_QPushButton");
        clickButton(":Item Tax.Save_QPushButton");
        
        waitForObject(":Item.Save_QPushButton_5");
        clickButton(":Item.Save_QPushButton_5");
        waitForObject(":_itemGroup.Yes_QPushButton");
        clickButton(":_itemGroup.Yes_QPushButton");
        
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            waitForObject(":_warehouse_WComboBox_5");
            type(":_warehouse_WComboBox_5", "WH1");
            
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_warehouse_WComboBox_5"), "Warehouse ComboBox is not found");
        }
        
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2", "MPS-ITEMS-MPS Items",0,0,1,Qt.LeftButton);
        waitForObject(":_costcat_XComboBox_3");
        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1",0,0,1,Qt.LeftButton);
        snooze(1);
        clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
        snooze(1);
        waitForObject(":Item Site.Save_QPushButton");
        clickButton(":Item Site.Save_QPushButton");
        if(appEdition=="Manufacturing"|| appEdition=="Standard")
        {
            waitForObject(":Item Site.Cancel_QPushButton");
            clickButton(":Item Site.Cancel_QPushButton");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":Item Site.Cancel_QPushButton"), "Cancel button not found");
        }
        
        waitForObject(":List Items._item_XTreeWidget_3");
         if(object.exists("{column='0' container=':List Items._item_XTreeWidget_3' text='RTRUCK1' type='QModelIndex'}"))
            test.pass("Item Created: RTRUCK1");
        
    }catch(e){test.fail("Exception in creating Item RTRUCK1:"+e)}
    
    //-----------Create Item BTRUCK1---------------
    try{
        waitForObject(":List Items.New_QPushButton_2");
        clickButton(":List Items.New_QPushButton_2");
        waitForObject(":_itemNumber_XLineEdit_3");
        type(":_itemNumber_XLineEdit_3","BTRUCK1");
        type(":_description1_XLineEdit_3", "Blue Collector’s Truck");
        type(":Item._description2_XLineEdit_2", "Truck Type 1");
        clickItem(":_itemtype_QComboBox_2", "Manufactured",0,0,1,Qt.LeftButton);
        clickItem(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS-Toy Trucks",0,0,1,Qt.LeftButton);
        waitForObject(":_inventoryUOM_XComboBox_3");
        type(":_inventoryUOM_XComboBox_3", "EA");
        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
            type(":_itemGroup.Pick List_QCheckBox_3"," ");
        if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
            type(":_itemGroup.Fractional_QCheckBox_3"," ");
        type(":_itemGroup_XLineEdit_3", "5.00");
        
        if(!findObject(":Item.Item is Sold_QGroupBox_3").checked)
            type(":Item.Item is Sold_QGroupBox_3"," ");
        type(":_prodcat_XComboBox_2", "CLASSIC-METAL - Classic Metal Product Line");
        waitForObject(":Item is Sold._upcCode_XLineEdit_3");
        type(":Item is Sold._upcCode_XLineEdit_3", "1234-5432");
        type(":Item is Sold._listprice_XLineEdit_3", "10.99");
        clickItem(":Item is Sold._priceUOM_XComboBox_3", "EA",0,0,1,Qt.LeftButton);
        type(":Item is Sold._warranty_QSpinBox_2", "365");
        type(":_prodWeight_XLineEdit_3", "3.5");
        type(":_packWeight_XLineEdit_3", ".25");
        snooze(1);
        clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Characteristics");
        snooze(1);
        waitForObject(":_characteristicsTab.New_QPushButton_6");
        clickButton(":_characteristicsTab.New_QPushButton_6");
        waitForObject(":_char_XComboBox_2");
        type(":_char_XComboBox_2", "I-COLOR");
        snooze(0.5);
        type(":_value_XLineEdit_3", "PL-126");
        waitForObject(":Item Characteristic.Save_QPushButton");
        clickButton(":Item Characteristic.Save_QPushButton");
        
        waitForObject(":_characteristicsTab.New_QPushButton_6");
        clickButton(":_characteristicsTab.New_QPushButton_6");
        waitForObject(":_char_XComboBox_2");
        type(":_char_XComboBox_2", "I-COLOR");
        snooze(0.5);
        type(":_value_XLineEdit_3", "PL-227");
        waitForObject(":Item Characteristic.Save_QPushButton");    
        clickButton(":Item Characteristic.Save_QPushButton");
        
        waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_8");
        clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Tax Types");
        waitForObject(":_taxtypesTab.New_QPushButton_10");
        clickButton(":_taxtypesTab.New_QPushButton_10");
        waitForObject(":_taxzone_XComboBox");
        clickItem(":_taxzone_XComboBox", "TZONE1-Tax Zone1", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_taxtype_XComboBox_4");
        clickItem(":_taxtype_XComboBox_4", "GM",0,0,1,Qt.LeftButton);
        waitForObject(":Item Tax.Save_QPushButton");
        clickButton(":Item Tax.Save_QPushButton");
        
        waitForObject(":Item.Save_QPushButton_5");
        clickButton(":Item.Save_QPushButton_5");
        waitForObject(":_itemGroup.Yes_QPushButton");
        clickButton(":_itemGroup.Yes_QPushButton");
        
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            waitForObject(":_warehouse_WComboBox_5");
            clickItem(":_warehouse_WComboBox_5", "WH1",0,0,1,Qt.LeftButton);
            
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_warehouse_WComboBox_5"), "Warehouse ComboBox is not found");
        }
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2", "MPS-ITEMS-MPS Items",0,0,1,Qt.LeftButton);
        snooze(0.5)
        waitForObject(":_costcat_XComboBox_3");
        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1",0,0,1,Qt.LeftButton);
        snooze(2);
        waitForObject(":Item Site.Save_QPushButton");
        clickButton(":Item Site.Save_QPushButton");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            waitForObject(":Item Site.Cancel_QPushButton");
            clickButton(":Item Site.Cancel_QPushButton");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":Item Site.Cancel_QPushButton"), "Cancel button not found");
        }   
        waitForObject(":List Items._item_XTreeWidget_3");
        if(object.exists("{column='0' container=':List Items._item_XTreeWidget_3' text='BTRUCK1' type='QModelIndex'}"))
            test.pass("Item Created: BTRUCK1");
        else test.fail("Item not created: BTRUCK1");
    }catch(e){test.fail("Exception in creating item BTRUCK1:"+e);}
    
    
    //-----------Create Item WTRUCK1---------------
    snooze(1);
    try{
        waitForObject(":List Items.New_QPushButton_2");
        clickButton(":List Items.New_QPushButton_2");
        waitForObject(":_itemNumber_XLineEdit_3");
        type(":_itemNumber_XLineEdit_3","WTRUCK1");
        type(":_description1_XLineEdit_3", "White Collector’s Truck");
        type(":Item._description2_XLineEdit_2", "Truck Type 1");
        clickItem(":_itemtype_QComboBox_2", "Manufactured",0,0,1,Qt.LeftButton);
        clickItem(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS-Toy Trucks",0,0,1,Qt.LeftButton);
        waitForObject(":_inventoryUOM_XComboBox_3");
        clickItem(":_inventoryUOM_XComboBox_3", "EA",0,0,1,Qt.LeftButton);
        waitForObject(":_itemGroup.Pick List_QCheckBox_3");
        if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
            type(":_itemGroup.Pick List_QCheckBox_3"," ");
        if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
            type(":_itemGroup.Fractional_QCheckBox_3"," ");
        type(":_itemGroup_XLineEdit_3", "5.00");
        
        if(!findObject(":Item.Item is Sold_QGroupBox_3").checked)
            type(":Item.Item is Sold_QGroupBox_3"," ");
        clickItem(":_prodcat_XComboBox_2", "CLASSIC-METAL - Classic Metal Product Line",0,0,1,Qt.LeftButton);
        type(":Item is Sold._upcCode_XLineEdit_3", "1234-5432");
        type(":Item is Sold._listprice_XLineEdit_3", "10.99");
        clickItem(":Item is Sold._priceUOM_XComboBox_3", "EA",0,0,1,Qt.LeftButton);
        type(":Item is Sold._warranty_QSpinBox_2", "365");
        waitForObject(":_prodWeight_XLineEdit_3");
        type(":_prodWeight_XLineEdit_3", "3.5");
        waitForObject(":_packWeight_XLineEdit_3");
        type(":_packWeight_XLineEdit_3", ".25");
        waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_8",5);
        clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Characteristics");
        
        waitForObject(":_characteristicsTab.New_QPushButton_6");
        clickButton(":_characteristicsTab.New_QPushButton_6");
        waitForObject(":_char_XComboBox_2");
        clickItem(":_char_XComboBox_2", "I-COLOR - Product Color",0,0,1,Qt.LeftButton);
        waitForObject(":_value_XLineEdit_3");
        type(":_value_XLineEdit_3", "PL-126");
        waitForObject(":Item Characteristic.Save_QPushButton");    
        clickButton(":Item Characteristic.Save_QPushButton");
        
        waitForObject(":_characteristicsTab.New_QPushButton_6",2);
        clickButton(":_characteristicsTab.New_QPushButton_6");
        waitForObject(":_char_XComboBox_2");
        clickItem(":_char_XComboBox_2", "I-COLOR - Product Color",0,0,1,Qt.LeftButton);
        type(":_value_XLineEdit_3", "PL-227");
        waitForObject(":Item Characteristic.Save_QPushButton");    
        clickButton(":Item Characteristic.Save_QPushButton");
        
        snooze(2);
        waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_8");
        clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Tax Types");
        snooze(1);
        waitForObject(":_taxtypesTab.New_QPushButton_10",5);
        clickButton(":_taxtypesTab.New_QPushButton_10");
        waitForObject(":_taxzone_XComboBox");
        clickItem(":_taxzone_XComboBox", "TZONE1-Tax Zone1", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_taxtype_XComboBox_4");
        clickItem(":_taxtype_XComboBox_4", "GM",0,0,1,Qt.LeftButton);
        waitForObject(":Item Tax.Save_QPushButton");
        clickButton(":Item Tax.Save_QPushButton");
        
        waitForObject(":Item.Save_QPushButton_5");
        clickButton(":Item.Save_QPushButton_5");
        waitForObject(":_itemGroup.Yes_QPushButton");
        clickButton(":_itemGroup.Yes_QPushButton");
        
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            waitForObject(":_warehouse_WComboBox_5");
            clickItem(":_warehouse_WComboBox_5", "WH1",0,0,1,Qt.LeftButton);
            
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_warehouse_WComboBox_5"), "Warehouse ComboBox is not found");
        }
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2", "MPS-ITEMS-MPS Items",0,0,1,Qt.LeftButton);
        snooze(1);
        waitForObject(":_costcat_XComboBox_3");
        clickItem(":_costcat_XComboBox_3", "CCWH1-Warehouse 1",0,0,1,Qt.LeftButton);
        snooze(1);
        
        waitForObject(":Item Site.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
        
        waitForObject(":Item Site.Save_QPushButton");
        clickButton(":Item Site.Save_QPushButton");
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            waitForObject(":Item Site.Cancel_QPushButton");
            clickButton(":Item Site.Cancel_QPushButton");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":Item Site.Cancel_QPushButton"), "Cancel button not found");
        } 
        while(!object.exists(":List Items._item_XTreeWidget_3"))
            snooze(0.1);
        
        waitForObject(":List Items._item_XTreeWidget_3");
        if(object.exists("{column='0' container=':List Items._item_XTreeWidget_3' text='WTRUCK1' type='QModelIndex'}"))
            test.pass("Item Created: WTRUCK1");
        else test.fail("Item not created:WTRUCK1");
        
        waitForObject(":List Items.Close_QPushButton_3");
        clickButton(":List Items.Close_QPushButton_3");
        
    }catch(e){test.fail("Exception in creating Item WTRUCK1"+e);}
    
    
    
    //------------Create Planning Item: COLLECTORS-LINE-----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "New...");
        activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "New...");
        
        waitForObject(":_itemNumber_XLineEdit_3");
        type(":_itemNumber_XLineEdit_3", "COLLECTORS-LINE");
        type(":_description1_XLineEdit_3", "Truck Family Planning Item");
        type(":Item._description2_XLineEdit_2", "Trucks");
        waitForObject(":_itemtype_QComboBox_2");
        clickItem(":_itemtype_QComboBox_2", "Planning",0,0,1,Qt.LeftButton);
        waitForObject(":_itemGroup._classcode_XComboBox_2");
        type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS-Toy Trucks");
        waitForObject(":_inventoryUOM_XComboBox_3");
        clickItem(":_inventoryUOM_XComboBox_3", "EA",0,0,1,Qt.LeftButton);
        while(findObject(":_inventoryUOM_XComboBox_3").currentText!="EA")
            snooze(0.1);
        waitForObject(":Item.Save_QPushButton_5");
        waitForObject(":Item.Save_QPushButton_5");
        clickButton(":Item.Save_QPushButton_5");
        waitForObject(":_itemGroup.Yes_QPushButton");
        clickButton(":_itemGroup.Yes_QPushButton");
        
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            waitForObject(":_warehouse_WComboBox_5");
            clickItem(":_warehouse_WComboBox_5", "WH1",0,0,1,Qt.LeftButton);
            
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":_warehouse_WComboBox_5"), "Warehouse ComboBox is not found");
        }
        
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2", "MPS-ITEMS-MPS Items",0,0,1,Qt.LeftButton);
        while(findObject(":_plannerCode_XComboBox_2").currentText!="MPS-ITEMS-MPS Items")
            snooze(0.1);
        waitForObject(":_costcat_XComboBox_3");
        type(":_costcat_XComboBox_3", "CCWH1");
        while(findObject(":_costcat_XComboBox_3").currentText!="CCWH1-Warehouse 1")
            snooze(0.1);
        
        
        
        waitForObject(":Item Site.Save_QPushButton");
        clickButton(":Item Site.Save_QPushButton");
        
        if(appEdition=="Manufacturing"||appEdition=="Standard")
        {
            waitForObject(":Item Site.Cancel_QPushButton");
            clickButton(":Item Site.Cancel_QPushButton");
        }
        else if(appEdition=="PostBooks")
        {
            test.xverify(object.exists(":Item Site.Cancel_QPushButton"), "Cancel button not found");
        }
        
        test.log("Planning Item: COLLECTORS-LINE created");
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
        waitForObject(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu");
        activateItem(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu", "List...");
        waitForObject(":Bills of Materials.New_QPushButton");
        clickButton(":Bills of Materials.New_QPushButton");
        waitForObject(":_itemGroup...._QPushButton");
        clickButton(":_itemGroup...._QPushButton");
        waitForObject(":_item_XTreeWidget_2");
        doubleClickItem(":_item_XTreeWidget_2", "COLLECTORS-LINE", 5, 5, 0, Qt.LeftButton);
        
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        
        waitForObject(":Bill of Materials Item...._QPushButton_2");
        clickButton(":Bill of Materials Item...._QPushButton_2");
        waitForObject(":_item_XTreeWidget_3");
        doubleClickItem(":_item_XTreeWidget_3", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", ".30");
        type(":_scrap_XLineEdit", "0");
        waitForObject(":Bill of Materials Item.Save_QPushButton");
        clickButton(":Bill of Materials Item.Save_QPushButton");
        
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        waitForObject(":Bill of Materials Item...._QPushButton_2");
        clickButton(":Bill of Materials Item...._QPushButton_2");
        waitForObject(":_item_XTreeWidget_3");
        doubleClickItem(":_item_XTreeWidget_3", "WTRUCK1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", ".20");
        type(":_scrap_XLineEdit", "0");
        waitForObject(":Bill of Materials Item.Save_QPushButton");
        clickButton(":Bill of Materials Item.Save_QPushButton");
        
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        waitForObject(":Bill of Materials Item...._QPushButton_2");
        clickButton(":Bill of Materials Item...._QPushButton_2");
        snooze(1);
        waitForObject(":_item_XTreeWidget_3");
        doubleClickItem(":_item_XTreeWidget_3", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", ".50");
        type(":_scrap_XLineEdit", "0");
        waitForObject(":Bill of Materials Item.Save_QPushButton");
        clickButton(":Bill of Materials Item.Save_QPushButton");
        
        waitForObject(":_costsGroup.Total Qty. Per should equal_QCheckBox");
        if(!findObject(":_costsGroup.Total Qty. Per should equal_QCheckBox").checked)
            clickButton(":_costsGroup.Total Qty. Per should equal_QCheckBox");
        snooze(0.5);
        waitForObject(":_costsGroup._requiredQtyPer_XLineEdit");
        type(":_costsGroup._requiredQtyPer_XLineEdit", "1.00");
        
        waitForObject(":Bill of Materials.Save_QPushButton");
        clickButton(":Bill of Materials.Save_QPushButton");
        test.log("BOMs added for COLLECTORS-LINE item");
        
        waitForObject(":Bills of Materials.Close_QPushButton");
        clickButton(":Bills of Materials.Close_QPushButton");
        
    }catch(e){test.fail("Exception in creating Item COLLECTORS-LINE:"+e);}
    
    if(appEdition=="Manufacturing")
    {
        //-------------Schedule: Production Plan-----------------
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Production Plan");
            activateItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Production Plan");
            waitForObjectItem(":xTuple ERP: *.Production Plan_QMenu", "List...");
            activateItem(":xTuple ERP: *.Production Plan_QMenu", "List...");
            waitForObject(":List Production Plans.New_QPushButton");
            clickButton(":List Production Plans.New_QPushButton");
            waitForObject(":_number_QLineEdit");
            type(":_number_QLineEdit", "COLLECTORS-LINE-PLAN");
            type(":_descrip_QLineEdit", "Truck Production Plan");
            type(":Production Plan.XDateEdit_XDateEdit", "-30");
            type(":Production Plan.XDateEdit_XDateEdit", "<Tab>");
            type(":Production Plan.XDateEdit_XDateEdit_2", "+365");
            type(":Production Plan.XDateEdit_XDateEdit_2", "<Tab>");
            if(findObject(":_warehouse_WComboBox_6").currentText!="WH1")
                clickItem(":_warehouse_WComboBox_6", "WH1",0,0,1,Qt.LeftButton);
            if(findObject(":_schedtype_QComboBox").currentText!="Forecast Netted to MPS")
                clickItem(":_schedtype_QComboBox", "Forecast Netted to MPS",0,0,1,Qt.LeftButton);
            
            snooze(1);
            waitForObject(":frame.New_QPushButton_3");
            clickButton(":frame.New_QPushButton_3");
            waitForObject(":Production Plan Item...._QPushButton");
            type(":Production Plan Item._itemNumber_ItemLineEdit", "COLLECTORS-LINE");
            type(":Production Plan Item.XDateEdit_XDateEdit", "+45");
            type(":Production Plan Item._qty_XLineEdit", "500");
            waitForObject(":Production Plan Item.Save_QPushButton");
            clickButton(":Production Plan Item.Save_QPushButton");
            
            snooze(1);
            waitForObject(":frame.New_QPushButton_3");
            clickButton(":frame.New_QPushButton_3");
            waitForObject(":Production Plan Item...._QPushButton");
            type(":Production Plan Item._itemNumber_ItemLineEdit", "COLLECTORS-LINE");
            type(":Production Plan Item.XDateEdit_XDateEdit", "+75");
            type(":Production Plan Item._qty_XLineEdit", "1000");
            waitForObject(":Production Plan Item.Save_QPushButton");
            clickButton(":Production Plan Item.Save_QPushButton");
            
            waitForObject(":Production Plan.Save_QPushButton");
            clickButton(":Production Plan.Save_QPushButton");
            
            waitForObject(":_list_XTreeWidget");
            if(!clickItem(":_list_XTreeWidget", "COLLECTORS-LINE-PLAN", 5, 5, 1, Qt.LeftButton))
                test.pass("Production Plan Created: COLLECTORS-LINE-PLAN");
            waitForObject(":List Production Plans.Close_QPushButton");
            clickButton(":List Production Plans.Close_QPushButton");
        }catch(e){test.fail("Exception in creating COLLECTORS-LINE-PLAN:"+e);}
        
    }
    else if(appEdition=="PostBooks")
    {
        menu = waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        menuItem = "Sche&dule";
        
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
        else test.pass(menuItem+"not found in "+appEdition);
    }    
    
}
