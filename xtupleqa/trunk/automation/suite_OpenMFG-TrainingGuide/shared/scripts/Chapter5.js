function executeChapter5()
{
    source(findFile("scripts","functions.js"));
  
    //-----------Chart Of Accounts-------------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");

    COA("01","01","4050","01","State Sales Tax Revenue","Revenue","SO");
    waitForObject(":_account_XTreeWidget_2");
    if(!clickItem(":_account_XTreeWidget_2", "State Sales Tax Revenue", 5, 5, 1, Qt.LeftButton))
        test.pass("COA Created for: State Sales Tax Revenue");
    
    waitForObject(":Chart of Accounts.Close_QPushButton_2");
    clickButton(":Chart of Accounts.Close_QPushButton_2");

    
    //-----Define Taxation------
    defineTaxation();
    
    //----------Create Items---------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
  
    //-----Associate: YTRUCK1 with taxation--------
    doubleClickItem(":List Items._item_XTreeWidget_3", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_4");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_4", "Tax Types");
    waitForObject(":_taxtypesTab.New_QPushButton_2");
    clickButton(":_taxtypesTab.New_QPushButton_2");
    waitForObject(":_taxauth_XComboBox_5");
    type(":_taxauth_XComboBox_5", "TAX-AUTH1");
    type(":_taxtype_XComboBox_4", "EDU");
    waitForObject(":Item Tax.Save_QPushButton");
    clickButton(":Item Tax.Save_QPushButton");
    waitForObject(":Item.Save_QPushButton_13");
    clickButton(":Item.Save_QPushButton_13");
    test.log("Item YTRUCK1 associated with Tax Type");
  

    //-----------Create Item RTRUCK1---------------
    waitForObject(":List Items.New_QPushButton_2");
    clickButton(":List Items.New_QPushButton_2");
    waitForObject(":_itemNumber_XLineEdit_3");
    type(":_itemNumber_XLineEdit_3","RTRUCK1");
    type(":_description1_XLineEdit_3", "Red Collector’s Truck");
    type(":Item._description2_XLineEdit_2", "Truck Type 1");
    type(":_itemtype_QComboBox_2", "Manufactured");
    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
    type(":_inventoryUOM_XComboBox_3", "EA");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
        type(":_itemGroup.Pick List_QCheckBox_3"," ");
    if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
         type(":_itemGroup.Fractional_QCheckBox_3"," ");
    type(":_itemGroup_XLineEdit_3", "5.00");
    type(":_itemGroup._planningType_QComboBox_3", "MPS");
    if(!findObject(":Item.Item is Sold_QGroupBox_3").checked)
        type(":Item.Item is Sold_QGroupBox_3"," ");
    type(":_prodcat_XComboBox_2", "CLASSIC-METAL");
    type(":Item is Sold._upcCode_XLineEdit_3", "1234-5432");
    type(":Item is Sold._listprice_XLineEdit_3", "10.99");
    type(":Item is Sold._priceUOM_XComboBox_3", "EA");
    type(":Item is Sold._warranty_QSpinBox_2", "365");
    type(":_prodWeight_XLineEdit_3", "3.5");
    type(":_packWeight_XLineEdit_3", ".25");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Characteristics");
    
    clickButton(":_characteristicsTab.New_QPushButton_6");
    waitForObject(":_char_XComboBox_2");
    type(":_char_XComboBox_2", "I-COLOR");
    type(":_value_XLineEdit_3", "PL-126");
    clickButton(":Item Characteristic.Save_QPushButton");
    
    waitForObject(":_characteristicsTab.New_QPushButton_6");
    clickButton(":_characteristicsTab.New_QPushButton_6");
    waitForObject(":_char_XComboBox_2");
    type(":_char_XComboBox_2", "I-COLOR");
    type(":_value_XLineEdit_3", "PL-227");
    clickButton(":Item Characteristic.Save_QPushButton");
    
    waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_8");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Tax Types");
    waitForObject(":_taxtypesTab.New_QPushButton_10");
    clickButton(":_taxtypesTab.New_QPushButton_10");
    waitForObject(":_taxauth_XComboBox_5");
    type(":_taxauth_XComboBox_5", "TAX-AUTH1");
    type(":_taxtype_XComboBox_4", "GM");
    clickButton(":Item Tax.Save_QPushButton");
       
    waitForObject(":Item.Save_QPushButton_5");
    clickButton(":Item.Save_QPushButton_5");
    waitForObject(":Create New Item Sites.Yes_QPushButton");
    clickButton(":Create New Item Sites.Yes_QPushButton");
    
    waitForObjectItem(":_warehouse_WComboBox_5", "WH1");
    type(":_warehouse_WComboBox_5", "WH1");
    type(":_plannerCode_XComboBox_2", "MPS");
    type(":_costcat_XComboBox_3", "CCWH1");
    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_mrp._mpsTimeFence_QSpinBox_3");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "14");
    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_3", "<Del>");
    type(":_leadTime_QSpinBox_3", "1");
    clickButton(":Item Site.Save_QPushButton");
    waitForObject(":Item Site.Cancel_QPushButton");
    clickButton(":Item Site.Cancel_QPushButton");
        
    waitForObject(":List Items._item_XTreeWidget_3");
    if(!clickItem(":List Items._item_XTreeWidget_3", "RTRUCK1", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: RTRUCK1");
    
    
    //-----------Create Item BTRUCK1---------------
    waitForObject(":List Items.New_QPushButton_2");
    clickButton(":List Items.New_QPushButton_2");
    waitForObject(":_itemNumber_XLineEdit_3");
    type(":_itemNumber_XLineEdit_3","BTRUCK1");
    type(":_description1_XLineEdit_3", "Blue Collector’s Truck");
    type(":Item._description2_XLineEdit_2", "Truck Type 1");
    type(":_itemtype_QComboBox_2", "Manufactured");
    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
    type(":_inventoryUOM_XComboBox_3", "EA");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
        type(":_itemGroup.Pick List_QCheckBox_3"," ");
    if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
         type(":_itemGroup.Fractional_QCheckBox_3"," ");
    type(":_itemGroup_XLineEdit_3", "5.00");
    type(":_itemGroup._planningType_QComboBox_3", "MPS");
    if(!findObject(":Item.Item is Sold_QGroupBox_3").checked)
        type(":Item.Item is Sold_QGroupBox_3"," ");
    type(":_prodcat_XComboBox_2", "CLASSIC-METAL");
    type(":Item is Sold._upcCode_XLineEdit_3", "1234-5432");
    type(":Item is Sold._listprice_XLineEdit_3", "10.99");
    type(":Item is Sold._priceUOM_XComboBox_3", "EA");
    type(":Item is Sold._warranty_QSpinBox_2", "365");
    type(":_prodWeight_XLineEdit_3", "3.5");
    type(":_packWeight_XLineEdit_3", ".25");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Characteristics");
    
    clickButton(":_characteristicsTab.New_QPushButton_6");
    waitForObject(":_char_XComboBox_2");
    type(":_char_XComboBox_2", "I-COLOR");
    type(":_value_XLineEdit_3", "PL-126");
    clickButton(":Item Characteristic.Save_QPushButton");
    
    waitForObject(":_characteristicsTab.New_QPushButton_6");
    clickButton(":_characteristicsTab.New_QPushButton_6");
    waitForObject(":_char_XComboBox_2");
    type(":_char_XComboBox_2", "I-COLOR");
    type(":_value_XLineEdit_3", "PL-227");
    clickButton(":Item Characteristic.Save_QPushButton");
       
    waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_8");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Tax Types");
    waitForObject(":_taxtypesTab.New_QPushButton_10");
    clickButton(":_taxtypesTab.New_QPushButton_10");
    waitForObject(":_taxauth_XComboBox_5");
    type(":_taxauth_XComboBox_5", "TAX-AUTH1");
    type(":_taxtype_XComboBox_4", "GM");
    clickButton(":Item Tax.Save_QPushButton");
    
    waitForObject(":Item.Save_QPushButton_5");
    clickButton(":Item.Save_QPushButton_5");
    waitForObject(":Create New Item Sites.Yes_QPushButton");
    clickButton(":Create New Item Sites.Yes_QPushButton");
    
    waitForObjectItem(":_warehouse_WComboBox_5", "WH1");
    type(":_warehouse_WComboBox_5", "WH1");
    type(":_plannerCode_XComboBox_2", "MPS");
    type(":_costcat_XComboBox_3", "CCWH1");
    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_mrp._mpsTimeFence_QSpinBox_3");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "14");
    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_3", "<Del>");
    type(":_leadTime_QSpinBox_3", "1");
    clickButton(":Item Site.Save_QPushButton");
    waitForObject(":Item Site.Cancel_QPushButton");
    clickButton(":Item Site.Cancel_QPushButton");
        
    waitForObject(":List Items._item_XTreeWidget_3");
    if(!clickItem(":List Items._item_XTreeWidget_3", "BTRUCK1", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: BTRUCK1");

    
    //-----------Create Item WTRUCK1---------------
    waitForObject(":List Items.New_QPushButton_2");
    clickButton(":List Items.New_QPushButton_2");
    waitForObject(":_itemNumber_XLineEdit_3");
    type(":_itemNumber_XLineEdit_3","WTRUCK1");
    type(":_description1_XLineEdit_3", "White Collector’s Truck");
    type(":Item._description2_XLineEdit_2", "Truck Type 1");
    type(":_itemtype_QComboBox_2", "Manufactured");
    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
    type(":_inventoryUOM_XComboBox_3", "EA");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
        type(":_itemGroup.Pick List_QCheckBox_3"," ");
    if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
         type(":_itemGroup.Fractional_QCheckBox_3"," ");
    type(":_itemGroup_XLineEdit_3", "5.00");
    type(":_itemGroup._planningType_QComboBox_3", "MPS");
    if(!findObject(":Item.Item is Sold_QGroupBox_3").checked)
        type(":Item.Item is Sold_QGroupBox_3"," ");
    type(":_prodcat_XComboBox_2", "CLASSIC-METAL");
    type(":Item is Sold._upcCode_XLineEdit_3", "1234-5432");
    type(":Item is Sold._listprice_XLineEdit_3", "10.99");
    type(":Item is Sold._priceUOM_XComboBox_3", "EA");
    type(":Item is Sold._warranty_QSpinBox_2", "365");
    type(":_prodWeight_XLineEdit_3", "3.5");
    type(":_packWeight_XLineEdit_3", ".25");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Characteristics");
    
    clickButton(":_characteristicsTab.New_QPushButton_6");
    waitForObject(":_char_XComboBox_2");
    type(":_char_XComboBox_2", "I-COLOR");
    type(":_value_XLineEdit_3", "PL-126");
    clickButton(":Item Characteristic.Save_QPushButton");
    
    waitForObject(":_characteristicsTab.New_QPushButton_6");
    clickButton(":_characteristicsTab.New_QPushButton_6");
    waitForObject(":_char_XComboBox_2");
    type(":_char_XComboBox_2", "I-COLOR");
    type(":_value_XLineEdit_3", "PL-227");
    clickButton(":Item Characteristic.Save_QPushButton");
       
    waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_8");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_8", "Tax Types");
    waitForObject(":_taxtypesTab.New_QPushButton_10");
    clickButton(":_taxtypesTab.New_QPushButton_10");
    waitForObject(":_taxauth_XComboBox_5");
    type(":_taxauth_XComboBox_5", "TAX-AUTH1");
    type(":_taxtype_XComboBox_4", "GM");
    clickButton(":Item Tax.Save_QPushButton");
    
    waitForObject(":Item.Save_QPushButton_5");
    clickButton(":Item.Save_QPushButton_5");
    waitForObject(":Create New Item Sites.Yes_QPushButton");
    clickButton(":Create New Item Sites.Yes_QPushButton");
    
    waitForObjectItem(":_warehouse_WComboBox_5", "WH1");
    type(":_warehouse_WComboBox_5", "WH1");
    type(":_plannerCode_XComboBox_2", "MPS");
    type(":_costcat_XComboBox_3", "CCWH1");
    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_mrp._mpsTimeFence_QSpinBox_3");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "14");
    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_3", "<Del>");
    type(":_leadTime_QSpinBox_3", "1");
    clickButton(":Item Site.Save_QPushButton");
    waitForObject(":Item Site.Cancel_QPushButton");
    clickButton(":Item Site.Cancel_QPushButton");
        
    waitForObject(":List Items._item_XTreeWidget_3");
    if(!clickItem(":List Items._item_XTreeWidget_3", "WTRUCK1", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: WTRUCK1");

    clickButton(":List Items.Close_QPushButton_3");
  
  
  
    //------------create Planning Item: COLLECTORS-LINE-----------------
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
    type(":_itemtype_QComboBox_2", "Planning");
    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
    type(":_inventoryUOM_XComboBox_3", "EA");
    clickButton(":Item.Save_QPushButton_5");
    waitForObject(":Create New Item Sites.Yes_QPushButton");
    clickButton(":Create New Item Sites.Yes_QPushButton");
    waitForObject(":_warehouse_WComboBox_5");
    type(":_warehouse_WComboBox_5", "WH1");
    type(":_plannerCode_XComboBox_2", "MPS-ITEMS");
    type(":_costcat_XComboBox_3", "CCWH1");
    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
    type(":_mrp._orderGroup_QSpinBox_3", "<Ctrl+A>");
    type(":_mrp._orderGroup_QSpinBox_3", "<Del>");
    type(":_mrp._orderGroup_QSpinBox_3", "7");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "0");
    waitForObject(":Item Site.Save_QPushButton");
    clickButton(":Item Site.Save_QPushButton");
    waitForObject(":Item Site.Cancel_QPushButton");
    clickButton(":Item Site.Cancel_QPushButton");
    test.log("Planning Item: COLLECTORS-LINE created");



    
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu", "List...");
    waitForObject(":Bills of Materials.New_QPushButton");
    clickButton(":Bills of Materials.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "COLLECTORS-LINE", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":frame_2.New_QPushButton");
    clickButton(":frame_2.New_QPushButton");
    waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
    type(":Bill of Materials Item._itemNumber_ItemLineEdit", "YTRUCK1");
    type(":Bill of Materials Item._itemNumber_ItemLineEdit", "<Tab>");
    type(":_qtyPer_XLineEdit", ".30");
    type(":_scrap_XLineEdit", "0");
    waitForObject(":Bill of Materials Item.Save_QPushButton");
    clickButton(":Bill of Materials Item.Save_QPushButton");
        
    waitForObject(":frame_2.New_QPushButton");
    clickButton(":frame_2.New_QPushButton");
    waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
    type(":Bill of Materials Item._itemNumber_ItemLineEdit", "WTRUCK1");
    waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
    type(":Bill of Materials Item._itemNumber_ItemLineEdit", "<Tab>");
    waitForObject(":_qtyPer_XLineEdit");
    type(":_qtyPer_XLineEdit", ".20");
    type(":_scrap_XLineEdit", "0");
    waitForObject(":Bill of Materials Item.Save_QPushButton");
    clickButton(":Bill of Materials Item.Save_QPushButton");
    
    waitForObject(":frame_2.New_QPushButton");
    clickButton(":frame_2.New_QPushButton");
    waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
    type(":Bill of Materials Item._itemNumber_ItemLineEdit", "BTRUCK1");
    waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
    type(":Bill of Materials Item._itemNumber_ItemLineEdit", "<Tab>");
    waitForObject(":_qtyPer_XLineEdit");
    type(":_qtyPer_XLineEdit", ".50");
    type(":_scrap_XLineEdit", "0");
    waitForObject(":Bill of Materials Item.Save_QPushButton");
    clickButton(":Bill of Materials Item.Save_QPushButton");
        
    waitForObject(":_costsGroup.Total Qty. Per should equal_QCheckBox");
    if(!findObject(":_costsGroup.Total Qty. Per should equal_QCheckBox").checked)
        clickButton(":_costsGroup.Total Qty. Per should equal_QCheckBox");
    type(":_costsGroup._requiredQtyPer_XLineEdit", "1.00");
    
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
    test.log("BOMs added for COLLECTORS-LINE item");
  
    waitForObject(":Bills of Materials.Close_QPushButton");
    clickButton(":Bills of Materials.Close_QPushButton");

    
    
    //-------------Schedule: Production Plan-----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Schedule");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Production Plan");
    activateItem(":xTuple ERP: OpenMFG Edition.Schedule_QMenu", "Production Plan");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Production Plan_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Production Plan_QMenu", "List...");
    waitForObject(":List Production Plans.New_QPushButton");
    clickButton(":List Production Plans.New_QPushButton");
    waitForObject(":_number_QLineEdit");
    type(":_number_QLineEdit", "COLLECTORS-LINE-PLAN");
    type(":_descrip_QLineEdit", "Truck Production Plan");
    type(":Production Plan.XDateEdit_XDateEdit", "-30");
    type(":Production Plan.XDateEdit_XDateEdit_2", "+365");
    if(findObject(":_warehouse_WComboBox_6").currentText!="WH1")
        type(":_warehouse_WComboBox_6", "WH1");
    if(findObject(":_schedtype_QComboBox").currentText!="Forecast Netted to MPS")
        type(":_schedtype_QComboBox", "Forecast Netted to MPS");
    
    clickButton(":frame.New_QPushButton_3");
    waitForObject(":Production Plan Item...._QPushButton");
    type(":Production Plan Item._itemNumber_ItemLineEdit", "COLLECTORS-LINE");
    type(":Production Plan Item.XDateEdit_XDateEdit", "+45");
    type(":Production Plan Item._qty_XLineEdit", "500");
    waitForObject(":Production Plan Item.Save_QPushButton");
    clickButton(":Production Plan Item.Save_QPushButton");
    
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
 
    
    
    
}