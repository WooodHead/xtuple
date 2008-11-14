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
    
    
    
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "RTRUCK1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_description1_XLineEdit_4");
    type(":_description1_XLineEdit_4", "Red Collector’s Truck");
    type(":Item._description2_XLineEdit_3", "Truck Type 1");
    type(":_itemGroup._planningType_QComboBox_4", "MPS");
    clickButton(":Item.Save_QPushButton_7");
    
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "BTRUCK1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_description1_XLineEdit_5");
    type(":_description1_XLineEdit_5", "Blue Collector’s Truck");
    type(":Item._description2_XLineEdit_4", "Truck Type 1");
    type(":_itemGroup._planningType_QComboBox_5", "MPS");
    clickButton(":Item.Save_QPushButton_8");
    
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "WTRUCK1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_description1_XLineEdit_6");
    type(":_description1_XLineEdit_6", "White Collector’s Truck");
    type(":Item._description2_XLineEdit_5", "Truck Type 1");
    type(":_itemGroup._planningType_QComboBox_6", "MPS");
    clickButton(":Item.Save_QPushButton_9");
    
    waitForObject(":List Items.Close_QPushButton_3");
    clickButton(":List Items.Close_QPushButton_3");
}