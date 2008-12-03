function executeChapter5()
{
    //-----------Copy Items--------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    
    //----------Copy and create RTRUCK1-----------------
    waitForObject(":List Items._item_XTreeWidget_3");
    clickItem(":List Items._item_XTreeWidget_3", "YTRUCK1", 5, 5, 1, Qt.LeftButton);
    clickButton(":List Items.Copy_QPushButton");
    waitForObject(":_targetItemNumber_XLineEdit");
    type(":_targetItemNumber_XLineEdit", "RTRUCK1");
    clickButton(":Copy Item.Copy_QPushButton");
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
    test.log("Item and Itemsite of RTRUCK1 created");

    
    //-----------Copy and create BTRUCK1------------------
    waitForObject(":List Items._item_XTreeWidget_3");
    clickItem(":List Items._item_XTreeWidget_3", "YTRUCK1", 5, 5, 1, Qt.LeftButton);
    clickButton(":List Items.Copy_QPushButton");
    waitForObject(":_targetItemNumber_XLineEdit");
    type(":_targetItemNumber_XLineEdit", "BTRUCK1");
    clickButton(":Copy Item.Copy_QPushButton");
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
    test.log("Item and Itemsite of BTRUCK1 created");
    
    //-----------Copy and create WTRUCK1-----------------
    waitForObject(":List Items._item_XTreeWidget_3");
    clickItem(":List Items._item_XTreeWidget_3", "YTRUCK1", 5, 5, 1, Qt.LeftButton);
    clickButton(":List Items.Copy_QPushButton");
    waitForObject(":_targetItemNumber_XLineEdit");
    type(":_targetItemNumber_XLineEdit", "WTRUCK1");
    clickButton(":Copy Item.Copy_QPushButton");
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
    test.log("Item and Itemsite of WTRUCK1 created");
  
    waitForObject(":List Items.Close_QPushButton_3");
    clickButton(":List Items.Close_QPushButton_3");
  
  

    //------Edit the created Items and change Planning Systems--------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "RTRUCK1", 5, 5, 1, Qt.LeftButton);
       
   
    waitForObject(":_description1_XLineEdit_5");
    type(":_description1_XLineEdit_5", "<Ctrl+A>");
    type(":_description1_XLineEdit_5", "<Del>");
    type(":_description1_XLineEdit_5", "Red Collector’s Truck");
    type(":Item._description2_XLineEdit_4", "<Ctrl+A>");
    type(":Item._description2_XLineEdit_4", "<Del>");
    type(":Item._description2_XLineEdit_4", "Truck Type 1");
    type(":_itemGroup._planningType_QComboBox_5", "MPS");
    clickButton(":Item.Save_QPushButton_8");
    
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "BTRUCK1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_description1_XLineEdit_6");
    type(":_description1_XLineEdit_6", "<Ctrl+A>");
    type(":_description1_XLineEdit_6", "<Del>");
    type(":_description1_XLineEdit_6", "Blue Collector’s Truck");
    type(":Item._description2_XLineEdit_5", "<Ctrl+A>");
    type(":Item._description2_XLineEdit_5", "<Del>");
    type(":Item._description2_XLineEdit_5", "Truck Type 1");
    type(":_itemGroup._planningType_QComboBox_6", "MPS");
    clickButton(":Item.Save_QPushButton_9");
        
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "WTRUCK1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_description1_XLineEdit_14");
    type(":_description1_XLineEdit_14", "<Ctrl+A>");
    type(":_description1_XLineEdit_14", "<Del>");
    type(":_description1_XLineEdit_14", "White Collector’s Truck");
    type(":Item._description2_XLineEdit_13", "<Ctrl+A>");
    type(":Item._description2_XLineEdit_13", "<Del>");
    type(":Item._description2_XLineEdit_13", "Truck Type 1");
    type(":_itemGroup._planningType_QComboBox_14", "MPS");
    clickButton(":Item.Save_QPushButton_18");
        
    waitForObject(":List Items.Close_QPushButton_3");
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


  //---------define BOM for COLLECTORS-LINE item----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "COLLECTORS-LINE", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Item.Materials..._QPushButton_3");
    clickButton(":Item.Materials..._QPushButton_3");
  
    
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
    waitForObject(":List Items.Close_QPushButton_3");
    clickButton(":List Items.Close_QPushButton_3");
  
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
    waitForObject(":List Production Plans.Close_QPushButton");
    clickButton(":List Production Plans.Close_QPushButton");
    test.log("Production Plan for COLLECTORS-LINE Item created");
    
    
    
}