function executeChapter3()
{
      
//    //----------Create Items---------------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
//    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
//  
//
//    //-----------Create Item YTRUCK1---------------
//    waitForObject(":List Items.New_QPushButton_2");
//    clickButton(":List Items.New_QPushButton_2");
//    waitForObject(":_itemNumber_XLineEdit_3");
//    type(":_itemNumber_XLineEdit_3","YTRUCK1");
//    type(":_description1_XLineEdit_3", "Yellow Tough Truck");
//    type(":Item._description2_XLineEdit_2", "Truck Type 1");
//    type(":_itemtype_QComboBox_2", "Manufactured");
//    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//    type(":_inventoryUOM_XComboBox_3", "EA");
//    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//        type(":_itemGroup.Pick List_QCheckBox_3"," ");
//    if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//         type(":_itemGroup.Fractional_QCheckBox_3"," ");
//    type(":_itemGroup_XLineEdit_3", "5.00");
//    type(":_itemGroup._planningType_QComboBox_3", "MRP");
//    if(!findObject(":Item.Item is Sold_QGroupBox_3").checked)
//        type(":Item.Item is Sold_QGroupBox_3"," ");
//    type(":_prodcat_XComboBox_2", "CLASSIC-METAL - Classic Metal Product Line");
//    type(":Item is Sold._upcCode_XLineEdit_3", "1234-5432");
//    type(":Item is Sold._listprice_XLineEdit_3", "10.99");
//    type(":Item is Sold._priceUOM_XComboBox_3", "EA");
//    type(":Item is Sold._warranty_QSpinBox_2", "365");
//    type(":_prodWeight_XLineEdit_3", "3.5");
//    type(":_packWeight_XLineEdit_3", ".25");
//    clickButton(":Item.Save_QPushButton_5");
//    waitForObject(":Create New Item Sites.No_QPushButton");
//    clickButton(":Create New Item Sites.No_QPushButton");
//    waitForObject(":List Items._item_XTreeWidget_3");
//    doubleClickItem(":List Items._item_XTreeWidget_3", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
//    waitForObject(":Item_item_11");
//    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_4", "Characteristics");
//    waitForObject(":_characteristicsTab.New_QPushButton_4");
//    clickButton(":_characteristicsTab.New_QPushButton_4");
//    waitForObject(":_char_XComboBox_2");
//    type(":_char_XComboBox_2", "I-COLOR");
//    type(":_value_XLineEdit_3", "PL-126");
//    if(!findObject(":Item Characteristic.Default_QCheckBox").checked)
//        clickButton(":Item Characteristic.Default_QCheckBox");
//    clickButton(":Item Characteristic.Save_QPushButton");
//    waitForObject(":_characteristicsTab.New_QPushButton_4");
//    clickButton(":_characteristicsTab.New_QPushButton_4");
//    waitForObject(":_char_XComboBox_2");
//    type(":_char_XComboBox_2", "I-COLOR");
//    type(":_value_XLineEdit_3", "PL-227");
//    if(findObject(":Item Characteristic.Default_QCheckBox").checked)
//        clickButton(":Item Characteristic.Default_QCheckBox");
//    clickButton(":Item Characteristic.Save_QPushButton");
//    waitForObject(":Item.Save_QPushButton_13");
//    clickButton(":Item.Save_QPushButton_13");
//    test.log("Item: YTRUCK1 created");
//  
//  
//  
//    //----------Create Item YPAINT1------------
//    waitForObject(":List Items.New_QPushButton_2");
//    clickButton(":List Items.New_QPushButton_2");
//    waitForObject(":_itemNumber_XLineEdit_3");
//    type(":_itemNumber_XLineEdit_3","YPAINT1");
//    type(":_description1_XLineEdit_3", "Yellow Paint 1");
//    type(":Item._description2_XLineEdit_2", "Yellow Type 1");
//    type(":_itemtype_QComboBox_2", "Purchased");
//    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//    type(":_inventoryUOM_XComboBox_3", "GL");
//    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//        type(":_itemGroup.Pick List_QCheckBox_3"," ");
//    if(!findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//        type(":_itemGroup.Fractional_QCheckBox_3"," ");
//    type(":_itemGroup_XLineEdit_3", "2.00");
//    type(":_itemGroup._planningType_QComboBox_3", "MRP");
//    if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//        type(":Item.Item is Sold_QGroupBox_3"," ");
//    type(":_prodWeight_XLineEdit_3", "8");
//    type(":_packWeight_XLineEdit_3", ".5");
//    clickButton(":Item.Save_QPushButton_5");
//    waitForObject(":Create New Item Sites.No_QPushButton");
//    clickButton(":Create New Item Sites.No_QPushButton");
//    test.log("Item: YPAINT1 created");
//    
//    
//    
//    
//    //----------Create Item TBODY1------------
//    waitForObject(":List Items.New_QPushButton_2");
//    clickButton(":List Items.New_QPushButton_2");
//    waitForObject(":_itemNumber_XLineEdit_3");
//    type(":_itemNumber_XLineEdit_3","TBODY1");
//    type(":_description1_XLineEdit_3", "Tough Truck Body Type 1");
//    type(":Item._description2_XLineEdit_2", "Truck Body");
//    type(":_itemtype_QComboBox_2", "Purchased");
//    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//    type(":_inventoryUOM_XComboBox_3", "EA");
//    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//        type(":_itemGroup.Pick List_QCheckBox_3"," ");
//    if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//        type(":_itemGroup.Fractional_QCheckBox_3"," ");
//    type(":_itemGroup_XLineEdit_3", "1.50");
//    type(":_itemGroup._planningType_QComboBox_3", "MRP");
//    if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//        type(":Item.Item is Sold_QGroupBox_3"," ");
//    type(":_prodWeight_XLineEdit_3", ".75");
//    type(":_packWeight_XLineEdit_3", ".12");
//    clickButton(":Item.Save_QPushButton_5");
//    waitForObject(":Create New Item Sites.No_QPushButton");
//    clickButton(":Create New Item Sites.No_QPushButton");
//    test.log("Item: TBODY1 created");
//    
//    
//    //----------Create Item TWHEEL1------------
//    waitForObject(":List Items.New_QPushButton_2");
//    clickButton(":List Items.New_QPushButton_2");
//    waitForObject(":_itemNumber_XLineEdit_3");
//    type(":_itemNumber_XLineEdit_3","TWHEEL1");
//    type(":_description1_XLineEdit_3", "TruckTruck Body1");
//    type(":Item._description2_XLineEdit_2", "Wheels Type 1");
//    type(":_itemtype_QComboBox_2", "Purchased");	
//    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//    type(":_inventoryUOM_XComboBox_3", "EA");
//    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//        type(":_itemGroup.Pick List_QCheckBox_3"," ");
//    if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//        type(":_itemGroup.Fractional_QCheckBox_3"," ");
//    type(":_itemGroup_XLineEdit_3", ".50");
//    type(":_itemGroup._planningType_QComboBox_3", "MRP");
//    if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//        type(":Item.Item is Sold_QGroupBox_3"," ");
//    type(":_prodWeight_XLineEdit_3", ".1");
//    type(":_packWeight_XLineEdit_3", ".01");
//    clickButton(":Item.Save_QPushButton_5");
//    waitForObject(":Create New Item Sites.No_QPushButton");
//    clickButton(":Create New Item Sites.No_QPushButton");
//    test.log("Item: TWHEEL1 created");
//    
//    
//    
//    //----------Create Item TKIT1------------
//    waitForObject(":List Items.New_QPushButton_2");
//    clickButton(":List Items.New_QPushButton_2");
//    waitForObject(":_itemNumber_XLineEdit_3");
//    type(":_itemNumber_XLineEdit_3","TKIT1");
//    type(":_description1_XLineEdit_3", "Truck Kit Type 1");
//    type(":Item._description2_XLineEdit_2", "Truck Kit");
//    type(":_itemtype_QComboBox_2", "Manufactured");	
//    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//    type(":_inventoryUOM_XComboBox_3", "EA");
//    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//        type(":_itemGroup.Pick List_QCheckBox_3"," ");
//    if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//        type(":_itemGroup.Fractional_QCheckBox_3"," ");
//    type(":_itemGroup_XLineEdit_3", "2.00");
//    type(":_itemGroup._planningType_QComboBox_3", "MRP");
//    if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//        type(":Item.Item is Sold_QGroupBox_3"," ");
//    type(":_prodWeight_XLineEdit_3", ".25");
//    type(":_packWeight_XLineEdit_3", ".1");
//    clickButton(":Item.Save_QPushButton_5");
//    waitForObject(":Create New Item Sites.No_QPushButton");
//    clickButton(":Create New Item Sites.No_QPushButton");
//    test.log("Item: TKIT1 created");
//    
//    
//    
//    //----------Create Item TBOX1------------
//    waitForObject(":List Items.New_QPushButton_2");
//    clickButton(":List Items.New_QPushButton_2");
//    waitForObject(":_itemNumber_XLineEdit_3");
//    type(":_itemNumber_XLineEdit_3","TBOX1");
//    type(":_description1_XLineEdit_3", "Product Box Type 1");
//    type(":Item._description2_XLineEdit_2", "Product Box");
//    type(":_itemtype_QComboBox_2", "Purchased");	
//    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//    type(":_inventoryUOM_XComboBox_3", "EA");
//    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//        type(":_itemGroup.Pick List_QCheckBox_3"," ");
//    if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//        type(":_itemGroup.Fractional_QCheckBox_3"," ");
//    type(":_itemGroup_XLineEdit_3", ".10");
//    type(":_itemGroup._planningType_QComboBox_3", "MRP");
//    if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//        type(":Item.Item is Sold_QGroupBox_3"," ");
//    type(":_prodWeight_XLineEdit_3", ".20");
//    type(":_packWeight_XLineEdit_3", "0");
//    clickButton(":Item.Save_QPushButton_5");
//    waitForObject(":Create New Item Sites.No_QPushButton");
//    clickButton(":Create New Item Sites.No_QPushButton");
//    test.log("Item: TBOX1 created");
//    
//     
//    //----------Create Item TINSERT1------------
//    waitForObject(":List Items.New_QPushButton_2");
//    clickButton(":List Items.New_QPushButton_2");
//    waitForObject(":_itemNumber_XLineEdit_3");
//    type(":_itemNumber_XLineEdit_3","TINSERT1");
//    type(":_description1_XLineEdit_3", "Packaging Insert Type 1");
//    type(":Item._description2_XLineEdit_2", "Insert Type 1");
//    type(":_itemtype_QComboBox_2", "Purchased");	
//    type(":_itemGroup._classcode_XComboBox_2", "TOY-TRUCKS");
//    type(":_inventoryUOM_XComboBox_3", "EA");
//    if(!findObject(":_itemGroup.Pick List_QCheckBox_3").checked)
//        type(":_itemGroup.Pick List_QCheckBox_3"," ");
//    if(findObject(":_itemGroup.Fractional_QCheckBox_3").checked)
//        type(":_itemGroup.Fractional_QCheckBox_3"," ");
//    type(":_itemGroup_XLineEdit_3", ".10");
//    type(":_itemGroup._planningType_QComboBox_3", "MRP");
//    if(findObject(":Item.Item is Sold_QGroupBox_3").checked)
//        type(":Item.Item is Sold_QGroupBox_3"," ");
//    type(":_prodWeight_XLineEdit_3", ".02");
//    type(":_packWeight_XLineEdit_3", ".01");
//    clickButton(":Item.Save_QPushButton_5");
//    waitForObject(":Create New Item Sites.No_QPushButton");
//    clickButton(":Create New Item Sites.No_QPushButton");
//    test.log("Item: TBOX1 created");
//    
//    waitForObject(":List Items.Close_QPushButton_3");
//    clickButton(":List Items.Close_QPushButton_3");
//    
//    
    
    //---------------Create Item sites------------------------------ 
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Item Site_QMenu", "List...");
    
//    //---------Item site: YTRUCK1----------------------
//    waitForObject(":List Item Sites.New_QPushButton_3");
//    clickButton(":List Item Sites.New_QPushButton_3");
//    waitForObject(":Item Site._itemNumber_ItemLineEdit");
//    type(":Item Site._itemNumber_ItemLineEdit", "YTRUCK1");
//    type(":Item Site._itemNumber_ItemLineEdit", "<Tab>");
//    type(":_warehouse_WComboBox_5", "WH1");
//    if(!findObject(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3").checked)
//        clickButton(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3");
//    type(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3","<Ctrl+A>");
//    type(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3","<Del>");
//    type(":Sold from this Site.qt_spinbox_lineedit_QLineEdit_3","1");
//    clickButton(":Costing Method.Standard_QRadioButton_3");
//    type(":Control._controlMethod_XComboBox_3", "Regular");
//    type(":_plannerCode_XComboBox_2", "MRP");
//    type(":_costcat_XComboBox_3", "CCWH1");
//    if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//        clickButton(":_inventory.Stocked_QCheckBox_3");
//    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_3").checked)
//        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_3");
//    type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//    type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//    type(":_cycleCountFreq_QSpinBox_3", "30");
//    type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//    type(":_eventFence_QSpinBox_4", "<Del>");
//    type(":_eventFence_QSpinBox_4", "10");type(":_locationGroup._locationComments_XLineEdit_3", "FG-01-01-01");
//    waitForObject(":Item Site.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
//    type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
//    waitForObject(":_reorderLevel_XLineEdit_3");
//    type(":_reorderLevel_XLineEdit_3", "0.00");
//    type(":_orderUpToQty_XLineEdit_3", "0.00");
//    type(":_minimumOrder_XLineEdit_3", "100");
//    type(":_maximumOrder_XLineEdit_3", "10000");
//    type(":_orderMultiple_XLineEdit_3", "100");
//    clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Del>");
//    type(":_mrp._orderGroup_QSpinBox_3", "7");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "0");
//    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
//    type(":_leadTime_QSpinBox_3", "<Del>");
//    type(":_leadTime_QSpinBox_3", "1");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Ctrl+A>");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Del>");
//    type(":_mrp._safetyStock_XLineEdit_3", "0");
//    waitForObject(":Item Site.Save_QPushButton");
//    clickButton(":Item Site.Save_QPushButton");
//    waitForObject(":Item Site.Cancel_QPushButton");
//    clickButton(":Item Site.Cancel_QPushButton");
//    test.log("Item site for YTRUCK1 created");
//    
//    
//    
//    
//    //---------Item site: TBODY1----------------------
//    waitForObject(":List Item Sites.New_QPushButton_3");
//    clickButton(":List Item Sites.New_QPushButton_3");
//    waitForObject(":Item Site._itemNumber_ItemLineEdit");
//    type(":Item Site._itemNumber_ItemLineEdit", "TBODY1");
//    type(":Item Site._itemNumber_ItemLineEdit", "<Tab>");
//    type(":_warehouse_WComboBox_5", "WH1");
//    if(findObject(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3").checked)
//        clickButton(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3");
//    type(":Item Site.Sold from this Site_QGroupBox"," ");
//    clickButton(":Costing Method.Standard_QRadioButton_3");
//    type(":Control._controlMethod_XComboBox_3", "Regular");
//    type(":_plannerCode_XComboBox_2", "MRP");
//    type(":_costcat_XComboBox_3", "CCWH1");
//    if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//        clickButton(":_inventory.Stocked_QCheckBox_3");
//    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_3").checked)
//        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_3");
//    type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//    type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//    type(":_cycleCountFreq_QSpinBox_3", "30");
//    type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//    type(":_eventFence_QSpinBox_4", "<Del>");
//    type(":_eventFence_QSpinBox_4", "10");
//    type(":_locationGroup._locationComments_XLineEdit_3", "FG-01-01-01");
//    waitForObject(":Item Site.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
//    type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
//    waitForObject(":_reorderLevel_XLineEdit_3");
//    type(":_reorderLevel_XLineEdit_3", "0.00");
//    type(":_orderUpToQty_XLineEdit_3", "0.00");
//    type(":_minimumOrder_XLineEdit_3", "100");
//    type(":_maximumOrder_XLineEdit_3", "10000");
//    type(":_orderMultiple_XLineEdit_3", "100");
//    clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Del>");
//    type(":_mrp._orderGroup_QSpinBox_3", "7");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "0");
//    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
//    type(":_leadTime_QSpinBox_3", "<Del>");
//    type(":_leadTime_QSpinBox_3", "1");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Ctrl+A>");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Del>");
//    type(":_mrp._safetyStock_XLineEdit_3", "0");
//    waitForObject(":Item Site.Save_QPushButton");
//    clickButton(":Item Site.Save_QPushButton");
//    waitForObject(":Item Site.Cancel_QPushButton");
//    clickButton(":Item Site.Cancel_QPushButton");
//    test.log("Item site for TBODY1 created");
//    
//    
//    
//    
//    //---------Item site: TINSERT1----------------------
//    waitForObject(":List Item Sites.New_QPushButton_3");
//    clickButton(":List Item Sites.New_QPushButton_3");
//    waitForObject(":Item Site._itemNumber_ItemLineEdit");
//    type(":Item Site._itemNumber_ItemLineEdit", "TINSERT1");
//    type(":Item Site._itemNumber_ItemLineEdit", "<Tab>");
//    type(":_warehouse_WComboBox_5", "WH1");
//    if(findObject(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3").checked)
//        clickButton(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3");
//    type(":Item Site.Sold from this Site_QGroupBox"," ");
//    clickButton(":Costing Method.Standard_QRadioButton_3");
//    type(":Control._controlMethod_XComboBox_3", "Regular");
//    type(":_plannerCode_XComboBox_2", "MRP");
//    type(":_costcat_XComboBox_3", "CCWH1");
//    if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//        clickButton(":_inventory.Stocked_QCheckBox_3");
//    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_3").checked)
//        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_3");
//    type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//    type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//    type(":_cycleCountFreq_QSpinBox_3", "30");
//    type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//    type(":_eventFence_QSpinBox_4", "<Del>");
//    type(":_eventFence_QSpinBox_4", "10");type(":_locationGroup._locationComments_XLineEdit_3", "FG-01-01-01");
//    waitForObject(":Item Site.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
//    type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
//    waitForObject(":_reorderLevel_XLineEdit_3");
//    type(":_reorderLevel_XLineEdit_3", "0.00");
//    type(":_orderUpToQty_XLineEdit_3", "0.00");
//    type(":_minimumOrder_XLineEdit_3", "100");
//    type(":_maximumOrder_XLineEdit_3", "10000");
//    type(":_orderMultiple_XLineEdit_3", "100");
//    clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Del>");
//    type(":_mrp._orderGroup_QSpinBox_3", "7");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "0");
//    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
//    type(":_leadTime_QSpinBox_3", "<Del>");
//    type(":_leadTime_QSpinBox_3", "1");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Ctrl+A>");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Del>");
//    type(":_mrp._safetyStock_XLineEdit_3", "0");
//    waitForObject(":Item Site.Save_QPushButton");
//    clickButton(":Item Site.Save_QPushButton");
//    waitForObject(":Item Site.Cancel_QPushButton");
//    clickButton(":Item Site.Cancel_QPushButton");
//    
//    test.log("Item site for TINSERT1 created");
//    
//    
//     //---------Item site: TWHEEL1----------------------
//    waitForObject(":List Item Sites.New_QPushButton_3");
//    clickButton(":List Item Sites.New_QPushButton_3");
//    waitForObject(":Item Site._itemNumber_ItemLineEdit");
//    type(":Item Site._itemNumber_ItemLineEdit", "TWHEEL1");
//    type(":Item Site._itemNumber_ItemLineEdit", "<Tab>");    
//    type(":_warehouse_WComboBox_5", "WH1");
//    if(findObject(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3").checked)
//        clickButton(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3");
//    type(":Item Site.Sold from this Site_QGroupBox"," ");
//    clickButton(":Costing Method.Standard_QRadioButton_3");
//    type(":Control._controlMethod_XComboBox_3", "Regular");
//    type(":_plannerCode_XComboBox_2", "MRP");
//    type(":_costcat_XComboBox_3", "CCWH1");
//    if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//        clickButton(":_inventory.Stocked_QCheckBox_3");
//    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_3").checked)
//        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_3");
//    type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//    type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//    type(":_cycleCountFreq_QSpinBox_3", "30");
//    type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//    type(":_eventFence_QSpinBox_4", "<Del>");
//    type(":_eventFence_QSpinBox_4", "10");
//    type(":_locationGroup._locationComments_XLineEdit_3", "FG-01-01-01");
//    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
//    type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
//    waitForObject(":_reorderLevel_XLineEdit_3");
//    type(":_reorderLevel_XLineEdit_3", "0.00");
//    type(":_orderUpToQty_XLineEdit_3", "0.00");
//    type(":_minimumOrder_XLineEdit_3", "100");
//    type(":_maximumOrder_XLineEdit_3", "10000");
//    type(":_orderMultiple_XLineEdit_3", "100");
//    clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Del>");
//    type(":_mrp._orderGroup_QSpinBox_3", "7");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "0");
//    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
//    type(":_leadTime_QSpinBox_3", "<Del>");
//    type(":_leadTime_QSpinBox_3", "1");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Ctrl+A>");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Del>");
//    type(":_mrp._safetyStock_XLineEdit_3", "0");
//    waitForObject(":Item Site.Save_QPushButton");
//    clickButton(":Item Site.Save_QPushButton");
//    waitForObject(":Item Site.Cancel_QPushButton");
//    clickButton(":Item Site.Cancel_QPushButton");
//    
//    test.log("Item site for TWHEEL1 created");
//    
    
    
    //---------Item site: TKIT1----------------------
    waitForObject(":List Item Sites.New_QPushButton_3");
    clickButton(":List Item Sites.New_QPushButton_3");
    waitForObject(":Item Site._itemNumber_ItemLineEdit");
    type(":Item Site._itemNumber_ItemLineEdit", "TKIT1");
    type(":Item Site._itemNumber_ItemLineEdit", "<Tab>");    
    type(":_warehouse_WComboBox_5", "WH1");
    if(findObject(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3").checked)
        clickButton(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3");
    type(":Item Site.Sold from this Site_QGroupBox"," ");
    clickButton(":Costing Method.Standard_QRadioButton_3");
    type(":Control._controlMethod_XComboBox_3", "Regular");
    type(":_plannerCode_XComboBox_2", "MRP");
    type(":_costcat_XComboBox_3", "CCWH1");
    if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
        clickButton(":_inventory.Stocked_QCheckBox_3");
    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_3").checked)
        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_3");
    type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
    type(":_cycleCountFreq_QSpinBox_3", "<Del>");
    type(":_cycleCountFreq_QSpinBox_3", "30");
    type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
    type(":_eventFence_QSpinBox_4", "<Del>");
    type(":_eventFence_QSpinBox_4", "10");
    type(":_locationGroup._locationComments_XLineEdit_3", "WP-01-01-01");
    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
    type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
    waitForObject(":_reorderLevel_XLineEdit_3");
    type(":_reorderLevel_XLineEdit_3", "0.00");
    type(":_orderUpToQty_XLineEdit_3", "0.00");
    type(":_minimumOrder_XLineEdit_3", "100");
    type(":_maximumOrder_XLineEdit_3", "10000");
    type(":_orderMultiple_XLineEdit_3", "100");
    clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
    type(":_mrp._orderGroup_QSpinBox_3", "<Ctrl+A>");
    type(":_mrp._orderGroup_QSpinBox_3", "<Del>");
    type(":_mrp._orderGroup_QSpinBox_3", "7");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_3", "0");
    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_3", "<Del>");
    type(":_leadTime_QSpinBox_3", "1");
    type(":_mrp._safetyStock_XLineEdit_3", "<Ctrl+A>");
    type(":_mrp._safetyStock_XLineEdit_3", "<Del>");
    type(":_mrp._safetyStock_XLineEdit_3", "0");
    waitForObject(":Item Site.Save_QPushButton");
    clickButton(":Item Site.Save_QPushButton");
    waitForObject(":Item Site.Cancel_QPushButton");
    clickButton(":Item Site.Cancel_QPushButton");
    
    test.log("Item site for TKIT1 created");
   
//    
//    //---------Item site: TBOX1----------------------
//    waitForObject(":List Item Sites.New_QPushButton_3");
//    clickButton(":List Item Sites.New_QPushButton_3");
//    waitForObject(":Item Site._itemNumber_ItemLineEdit");
//    type(":Item Site._itemNumber_ItemLineEdit", "TBOX1");
//    type(":Item Site._itemNumber_ItemLineEdit", "<Tab>");    
//    type(":_warehouse_WComboBox_5", "WH1");
//    if(findObject(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3").checked)
//        clickButton(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3");
//    type(":Item Site.Sold from this Site_QGroupBox"," ");
//    clickButton(":Costing Method.Standard_QRadioButton_3");
//    type(":Control._controlMethod_XComboBox_3", "Regular");
//    type(":_plannerCode_XComboBox_2", "MRP");
//    type(":_costcat_XComboBox_3", "CCWH1");
//    if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//        clickButton(":_inventory.Stocked_QCheckBox_3");
//    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_3").checked)
//        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_3");
//    type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//    type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//    type(":_cycleCountFreq_QSpinBox_3", "30");
//    type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//    type(":_eventFence_QSpinBox_4", "<Del>");
//    type(":_eventFence_QSpinBox_4", "10");
//    clickButton(":_locationGroup.Multiple Location Control_QCheckBox_3");
//    type(":_locationGroup.Use Default Location_QGroupBox_3","01010103");
//    type(":_locationGroup._locationComments_XLineEdit_3", "RM-01-01-01");
//    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");
//    type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
//    waitForObject(":_reorderLevel_XLineEdit_3");
//    type(":_reorderLevel_XLineEdit_3", "0.00");
//    type(":_orderUpToQty_XLineEdit_3", "0.00");
//    type(":_minimumOrder_XLineEdit_3", "100");
//    type(":_maximumOrder_XLineEdit_3", "10000");
//    type(":_orderMultiple_XLineEdit_3", "100");
//    clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Del>");
//    type(":_mrp._orderGroup_QSpinBox_3", "7");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "0");
//    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
//    type(":_leadTime_QSpinBox_3", "<Del>");
//    type(":_leadTime_QSpinBox_3", "1");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Ctrl+A>");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Del>");
//    type(":_mrp._safetyStock_XLineEdit_3", "0");
//    waitForObject(":Item Site.Save_QPushButton");
//    clickButton(":Item Site.Save_QPushButton");
//    waitForObject(":Item Site.Cancel_QPushButton");
//    clickButton(":Item Site.Cancel_QPushButton");
//    test.log("Item site for TBOX1 created");
//    
//    
//    //---------Item site: YPAINT1----------------------
//    waitForObject(":List Item Sites.New_QPushButton_3");
//    clickButton(":List Item Sites.New_QPushButton_3");
//    waitForObject(":Item Site._itemNumber_ItemLineEdit");
//    type(":Item Site._itemNumber_ItemLineEdit", "YPAINT1");
//    type(":Item Site._itemNumber_ItemLineEdit", "<Tab>");    
//    type(":_warehouse_WComboBox_5", "WH1");
//    if(findObject(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3").checked)
//        clickButton(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_3");
//    type(":Item Site.Sold from this Site_QGroupBox"," ");
//    clickButton(":Costing Method.Standard_QRadioButton_3");
//    type(":Control._controlMethod_XComboBox_3", "Lot");
//    type(":_plannerCode_XComboBox_2", "MRP");
//    type(":_costcat_XComboBox_3", "CCWH1");
//    if(findObject(":_inventory.Stocked_QCheckBox_3").checked)
//        clickButton(":_inventory.Stocked_QCheckBox_3");
//    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_3").checked)
//        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_3");
//    type(":_cycleCountFreq_QSpinBox_3", "<Ctrl+A>");
//    type(":_cycleCountFreq_QSpinBox_3", "<Del>");
//    type(":_cycleCountFreq_QSpinBox_3", "30");
//    type(":_eventFence_QSpinBox_4", "<Ctrl+A>");
//    type(":_eventFence_QSpinBox_4", "<Del>");
//    type(":_eventFence_QSpinBox_4", "10");
//    type(":_locationGroup._locationComments_XLineEdit_3", "RM-01-01-01");
//    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Planning");	
//    type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
//    waitForObject(":_reorderLevel_XLineEdit_3");
//    type(":_reorderLevel_XLineEdit_3", "0.00");
//    type(":_orderUpToQty_XLineEdit_3", "0.00");
//    type(":_minimumOrder_XLineEdit_3", "100");
//    type(":_maximumOrder_XLineEdit_3", "10000");
//    type(":_orderMultiple_XLineEdit_3", "100");
//    clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_3");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._orderGroup_QSpinBox_3", "<Del>");
//    type(":_mrp._orderGroup_QSpinBox_3", "7");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Ctrl+A>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "<Del>");
//    type(":_mrp._mpsTimeFence_QSpinBox_3", "0");
//    type(":_leadTime_QSpinBox_3", "<Ctrl+A>");
//    type(":_leadTime_QSpinBox_3", "<Del>");
//    type(":_leadTime_QSpinBox_3", "1");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Ctrl+A>");
//    type(":_mrp._safetyStock_XLineEdit_3", "<Del>");
//    type(":_mrp._safetyStock_XLineEdit_3", "0");
//    clickTab(":Item Site.qt_tabwidget_tabbar_QTabBar", "Expiration");
//    waitForObject(":_expirationTab.Perishable_QCheckBox_2");
//    clickButton(":_expirationTab.Perishable_QCheckBox_2");
//    clickButton(":_expirationTab.Requires Warranty when Purchased_QCheckBox_2");
//    clickButton(":Item Site.Save_QPushButton");
//    waitForObject(":Item Site.Cancel_QPushButton");
//    clickButton(":Item Site.Cancel_QPushButton");
    
    test.log("Item site for TBOX1 created");
    waitForObject(":List Item Sites.Close_QPushButton_3");
    clickButton(":List Item Sites.Close_QPushButton_3");
    
   

}
