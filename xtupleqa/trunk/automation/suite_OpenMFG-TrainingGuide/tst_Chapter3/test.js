function main()
{

    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "admin");
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "1zenqa1");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    
    
    //-------------Create Items--------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");

    
    //-----------Create Item: YTRUCK1------------------
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    waitForObject(":_itemNumber_XLineEdit_2");
    type(":_itemNumber_XLineEdit_2", "YTRUCK1");
    if(!findObject(":Item.Active_QCheckBox_2").checked)
        clickButton(":Item.Active_QCheckBox_2");
    waitForObject(":_description1_XLineEdit_2");
    type(":_description1_XLineEdit_2", "Yellow Tough Truck");
    type(":Item._description2_XLineEdit","Truck Type 1");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_2").checked)
        clickButton(":_itemGroup.Pick List_QCheckBox_2");
    if(findObject(":_itemGroup.Fractional_QCheckBox_2").checked)
        clickButton(":_itemGroup.Fractional_QCheckBox_2");
    waitForObject(":_itemGroup_XLineEdit_2");
    type(":_itemGroup_XLineEdit_2", "5.00");
    if(findObject(":_itemtype_QComboBox").currentText!= "Manufactured")
    type(":_itemtype_QComboBox","Manufactured");
    if(findObject(":_itemGroup._classcode_XComboBox").currentText!="TOY-TRUCKS")
    type(":_itemGroup._classcode_XComboBox","TOY-TRUCKS");
    waitForObject(":_inventoryUOM_XComboBox_2");
    if(findObject(":_inventoryUOM_XComboBox_2").currentText!="EA");
    type(":_inventoryUOM_XComboBox_2", "EA");
    if(findObject(":_itemGroup._planningType_QComboBox_2").currentText!= "MRP")
    type(":_itemGroup._planningType_QComboBox_2","MRP");
    if(!findObject(":Item.Item is Sold_QGroupBox_2").checked)
    type(":Item.Item is Sold_QGroupBox_2","<Space>");
    if(findObject(":_prodcat_XComboBox").currentText!= "CLASSIC-METAL")
    type(":_prodcat_XComboBox","CLASSIC-METAL");
    type(":Item is Sold._listprice_XLineEdit_2", "10.99");
    type(":Item is Sold.qt_spinbox_lineedit_QLineEdit_2", "<Ctrl+A>");
    type(":Item is Sold.qt_spinbox_lineedit_QLineEdit_2", "<Del>");
    type(":Item is Sold.qt_spinbox_lineedit_QLineEdit_2", "365");
    type(":Item is Sold._upcCode_XLineEdit_2", "1234-5432");
    type(":_prodWeight_XLineEdit_2", "3.5");
    type(":_packWeight_XLineEdit_2", ".25");
    waitForObject(":Item.Save_QPushButton_3");
    clickButton(":Item.Save_QPushButton_3");
    snooze(0.5);
    if(object.exists(":Item.Would you like to create Item site inventory settings for the newly created Item now?_QLabel"))
    clickButton(":Item.No_QPushButton_2");
    test.log("Item: YTRUCK1 created");
    clickButton(":List Items.Edit_QPushButton");
    waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_2", "Characteristics");
    clickButton(":_characteristicsTab.New_QPushButton_2");
    waitForObject(":_char_XComboBox");
    type(":_char_XComboBox", "I-COLOR");
    type(":_value_XLineEdit_2", "Yellow-PL126");
    if(!findObject(":Item.Default_QCheckBox_2").checked)
        clickButton(":Item.Default_QCheckBox_2");
    clickButton(":Item.Save_QPushButton_4");
    waitForObject(":Item.Save_QPushButton_3");
    clickButton(":Item.Save_QPushButton_3");
    
    
    
    //--------------Create Item: YPAINT1----------------
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    waitForObject(":_itemNumber_XLineEdit_2");
    type(":_itemNumber_XLineEdit_2", "YPAINT1");
    if(!findObject(":Item.Active_QCheckBox_2").checked)
        clickButton(":Item.Active_QCheckBox_2");
    waitForObject(":_description1_XLineEdit_2");
    type(":_description1_XLineEdit_2", "Yellow Paint 1");
    type(":Item._description2_XLineEdit","Yellow Type 1");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_2").checked)
        clickButton(":_itemGroup.Pick List_QCheckBox_2");
    if(!findObject(":_itemGroup.Fractional_QCheckBox_2").checked)
        clickButton(":_itemGroup.Fractional_QCheckBox_2");
    waitForObject(":_itemGroup_XLineEdit_2");
    type(":_itemGroup_XLineEdit_2", "2.00");
    if(findObject(":_itemtype_QComboBox").currentText!= "Purchased")
    type(":_itemtype_QComboBox","Purchased");
    if(findObject(":_itemGroup._classcode_XComboBox").currentText!="TOY-TRUCKS")
    type(":_itemGroup._classcode_XComboBox","TOY-TRUCKS");
    waitForObject(":_inventoryUOM_XComboBox_2");
    if(findObject(":_inventoryUOM_XComboBox_2").currentText!="GL");
    type(":_inventoryUOM_XComboBox_2", "GL");
    if(findObject(":_itemGroup._planningType_QComboBox_2").currentText!= "MRP")
    type(":_itemGroup._planningType_QComboBox_2","MRP");
    if(findObject(":Item.Item is Sold_QGroupBox_2").checked)
        type(":Item.Item is Sold_QGroupBox_2"," ");
    type(":_prodWeight_XLineEdit_2", "8");
    type(":_packWeight_XLineEdit_2", ".5");
    waitForObject(":Item.Save_QPushButton_3");
    clickButton(":Item.Save_QPushButton_3");
    snooze(0.5);
    if(object.exists(":Item.Would you like to create Item site inventory settings for the newly created Item now?_QLabel"))
    clickButton(":Item.No_QPushButton_2");
    test.log("Item: YPAINT1 created");
    
    
    
    //--------------Create Item: TBODY1----------------
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    waitForObject(":_itemNumber_XLineEdit_2");
    type(":_itemNumber_XLineEdit_2", "TBODY1");
    if(!findObject(":Item.Active_QCheckBox_2").checked)
        clickButton(":Item.Active_QCheckBox_2");
    waitForObject(":_description1_XLineEdit_2");
    type(":_description1_XLineEdit_2", "Tough Truck Body Type 1");
    type(":Item._description2_XLineEdit","Truck Body");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_2").checked)
        clickButton(":_itemGroup.Pick List_QCheckBox_2");
    if(findObject(":_itemGroup.Fractional_QCheckBox_2").checked)
        clickButton(":_itemGroup.Fractional_QCheckBox_2");
    waitForObject(":_itemGroup_XLineEdit_2");
    type(":_itemGroup_XLineEdit_2", "1.50");
    if(findObject(":_itemtype_QComboBox").currentText!= "Purchased")
    type(":_itemtype_QComboBox","Purchased");
    if(findObject(":_itemGroup._classcode_XComboBox").currentText!="TOY-TRUCKS")
    type(":_itemGroup._classcode_XComboBox","TOY-TRUCKS");
    waitForObject(":_inventoryUOM_XComboBox_2");
    if(findObject(":_inventoryUOM_XComboBox_2").currentText!="EA");
    type(":_inventoryUOM_XComboBox_2", "EA");
    if(findObject(":_itemGroup._planningType_QComboBox_2").currentText!= "MRP")
    type(":_itemGroup._planningType_QComboBox_2","MRP");
    if(findObject(":Item.Item is Sold_QGroupBox_2").checked)
    type(":Item.Item is Sold_QGroupBox_2"," ");
    type(":_prodWeight_XLineEdit_2", ".75");
    type(":_packWeight_XLineEdit_2", ".12");
    waitForObject(":Item.Save_QPushButton_3");
    clickButton(":Item.Save_QPushButton_3");
    snooze(0.5);
    if(object.exists(":Item.Would you like to create Item site inventory settings for the newly created Item now?_QLabel"))
    clickButton(":Item.No_QPushButton_2");
    test.log("Item: TBODY1 created");
    
    
    
    //--------------Create Item: TWHEEL1----------------
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    waitForObject(":_itemNumber_XLineEdit_2");
    type(":_itemNumber_XLineEdit_2", "TWHEEL1");
    if(!findObject(":Item.Active_QCheckBox_2").checked)
        clickButton(":Item.Active_QCheckBox_2");
    waitForObject(":_description1_XLineEdit_2");
    type(":_description1_XLineEdit_2", "Truck Wheels Type 1");
    type(":Item._description2_XLineEdit","Wheels Type 1");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_2").checked)
        clickButton(":_itemGroup.Pick List_QCheckBox_2");
    if(findObject(":_itemGroup.Fractional_QCheckBox_2").checked)
        clickButton(":_itemGroup.Fractional_QCheckBox_2");
    waitForObject(":_itemGroup_XLineEdit_2");
    type(":_itemGroup_XLineEdit_2", ".50");
    if(findObject(":_itemtype_QComboBox").currentText!= "Purchased")
    type(":_itemtype_QComboBox","Purchased");
    if(findObject(":_itemGroup._classcode_XComboBox").currentText!="TOY-TRUCKS")
    type(":_itemGroup._classcode_XComboBox","TOY-TRUCKS");
    waitForObject(":_inventoryUOM_XComboBox_2");
    if(findObject(":_inventoryUOM_XComboBox_2").currentText!="EA");
    type(":_inventoryUOM_XComboBox_2", "EA");
    if(findObject(":_itemGroup._planningType_QComboBox_2").currentText!= "MRP")
    type(":_itemGroup._planningType_QComboBox_2","MRP");
    if(findObject(":Item.Item is Sold_QGroupBox_2").checked)
    type(":Item.Item is Sold_QGroupBox_2"," ");
    type(":_prodWeight_XLineEdit_2", ".1");
    type(":_packWeight_XLineEdit_2", ".01");
    waitForObject(":Item.Save_QPushButton_3");
    clickButton(":Item.Save_QPushButton_3");
    snooze(0.5);
    if(object.exists(":Item.Would you like to create Item site inventory settings for the newly created Item now?_QLabel"))
    clickButton(":Item.No_QPushButton_2");
    test.log("Item: TWHEEL1 created");
    
    
    
    //--------------Create Item: TKIT1----------------
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    waitForObject(":_itemNumber_XLineEdit_2");
    type(":_itemNumber_XLineEdit_2", "TKIT1");
    if(!findObject(":Item.Active_QCheckBox_2").checked)
        clickButton(":Item.Active_QCheckBox_2");
    waitForObject(":_description1_XLineEdit_2");
    type(":_description1_XLineEdit_2", "Truck Kit Type 1");
    type(":Item._description2_XLineEdit","Truck Kit");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_2").checked)
        clickButton(":_itemGroup.Pick List_QCheckBox_2");
    if(findObject(":_itemGroup.Fractional_QCheckBox_2").checked)
        clickButton(":_itemGroup.Fractional_QCheckBox_2");
    waitForObject(":_itemGroup_XLineEdit_2");
    type(":_itemGroup_XLineEdit_2", "2.00");
    if(findObject(":_itemtype_QComboBox").currentText!= "Purchased")
    type(":_itemtype_QComboBox","Purchased");
    if(findObject(":_itemGroup._classcode_XComboBox").currentText!="TOY-TRUCKS")
    type(":_itemGroup._classcode_XComboBox","TOY-TRUCKS");
    waitForObject(":_inventoryUOM_XComboBox_2");
    if(findObject(":_inventoryUOM_XComboBox_2").currentText!="EA");
    type(":_inventoryUOM_XComboBox_2", "EA");
    if(findObject(":_itemGroup._planningType_QComboBox_2").currentText!= "MRP")
    type(":_itemGroup._planningType_QComboBox_2","MRP");
    if(findObject(":Item.Item is Sold_QGroupBox_2").checked)
    type(":Item.Item is Sold_QGroupBox_2"," ");
    type(":_prodWeight_XLineEdit_2", ".25");
    type(":_packWeight_XLineEdit_2", ".1");
    waitForObject(":Item.Save_QPushButton_3");
    clickButton(":Item.Save_QPushButton_3");
    snooze(0.5);
    if(object.exists(":Item.Would you like to create Item site inventory settings for the newly created Item now?_QLabel"))
    clickButton(":Item.No_QPushButton_2");
    test.log("Item: TKIT1 created");
    
    
    //--------------Create Item: TBOX1----------------
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    waitForObject(":_itemNumber_XLineEdit_2");
    type(":_itemNumber_XLineEdit_2", "TBOX1");
    if(!findObject(":Item.Active_QCheckBox_2").checked)
        clickButton(":Item.Active_QCheckBox_2");
    waitForObject(":_description1_XLineEdit_2");
    type(":_description1_XLineEdit_2", "Product Box Type 1");
    type(":Item._description2_XLineEdit","Product Box");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_2").checked)
        clickButton(":_itemGroup.Pick List_QCheckBox_2");
    if(findObject(":_itemGroup.Fractional_QCheckBox_2").checked)
        clickButton(":_itemGroup.Fractional_QCheckBox_2");
    waitForObject(":_itemGroup_XLineEdit_2");
    type(":_itemGroup_XLineEdit_2", ".10");
    if(findObject(":_itemtype_QComboBox").currentText!= "Purchased")
    type(":_itemtype_QComboBox","Purchased");
    if(findObject(":_itemGroup._classcode_XComboBox").currentText!="TOY-TRUCKS")
    type(":_itemGroup._classcode_XComboBox","TOY-TRUCKS");
    waitForObject(":_inventoryUOM_XComboBox_2");
    if(findObject(":_inventoryUOM_XComboBox_2").currentText!="EA");
    type(":_inventoryUOM_XComboBox_2", "EA");
    if(findObject(":_itemGroup._planningType_QComboBox_2").currentText!= "MRP")
    type(":_itemGroup._planningType_QComboBox_2","MRP");
    if(findObject(":Item.Item is Sold_QGroupBox_2").checked)
    type(":Item.Item is Sold_QGroupBox_2"," ");
    type(":_prodWeight_XLineEdit_2", ".20");
    type(":_packWeight_XLineEdit_2", "0");
    waitForObject(":Item.Save_QPushButton_3");
    clickButton(":Item.Save_QPushButton_3");
    snooze(0.5);
    if(object.exists(":Item.Would you like to create Item site inventory settings for the newly created Item now?_QLabel"))
    clickButton(":Item.No_QPushButton_2");
    test.log("Item: TBOX1 created");
    
    
    
    
    //--------------Create Item: TINSERT1----------------
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    waitForObject(":_itemNumber_XLineEdit_2");
    type(":_itemNumber_XLineEdit_2", "TINSERT1");
    if(!findObject(":Item.Active_QCheckBox_2").checked)
        clickButton(":Item.Active_QCheckBox_2");
    waitForObject(":_description1_XLineEdit_2");
    type(":_description1_XLineEdit_2", "Packaging Insert Type 1");
    type(":Item._description2_XLineEdit","Insert Type 1");
    if(!findObject(":_itemGroup.Pick List_QCheckBox_2").checked)
        clickButton(":_itemGroup.Pick List_QCheckBox_2");
    if(findObject(":_itemGroup.Fractional_QCheckBox_2").checked)
        clickButton(":_itemGroup.Fractional_QCheckBox_2");
    waitForObject(":_itemGroup_XLineEdit_2");
    type(":_itemGroup_XLineEdit_2", ".10");
    if(findObject(":_itemtype_QComboBox").currentText!= "Purchased")
    type(":_itemtype_QComboBox","Purchased");
    if(findObject(":_itemGroup._classcode_XComboBox").currentText!="TOY-TRUCKS")
    type(":_itemGroup._classcode_XComboBox","TOY-TRUCKS");
    waitForObject(":_inventoryUOM_XComboBox_2");
    if(findObject(":_inventoryUOM_XComboBox_2").currentText!="EA");
    type(":_inventoryUOM_XComboBox_2", "EA");
    if(findObject(":_itemGroup._planningType_QComboBox_2").currentText!= "MRP")
    type(":_itemGroup._planningType_QComboBox_2","MRP");
    if(findObject(":Item.Item is Sold_QGroupBox_2").checked)
    type(":Item.Item is Sold_QGroupBox_2"," ");
    type(":_prodWeight_XLineEdit_2", ".02");
    type(":_packWeight_XLineEdit_2", ".01");
    waitForObject(":Item.Save_QPushButton_3");
    clickButton(":Item.Save_QPushButton_3");
    snooze(0.5);
    if(object.exists(":Item.Would you like to create Item site inventory settings for the newly created Item now?_QLabel"))
    clickButton(":Item.No_QPushButton_2");
    test.log("Item: TINSERT1 created");
    clickButton(":List Items.Close_QPushButton_2");

    
    
    
    
    //-----------CRAEATE ITEM SITES---------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP: OpenMFG Edition.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Item Site_QMenu", "List...");
    
    
    //------Item site for YTRUCK1----------------
    waitForObject(":List Item Sites.New_QPushButton_2");
    clickButton(":List Item Sites.New_QPushButton_2");
    waitForObject(":List Item Sites._itemNumber_ItemLineEdit");
    type(":List Item Sites._itemNumber_ItemLineEdit", "ytruck1");
    type(":_warehouse_WComboBox_3","WH1");
    if(!findObject(":List Item Sites.Supplied at this Site_QGroupBox_2").checked)
       type(":List Item Sites.Supplied at this Site_QGroupBox_2"," ");	
    waitForObject(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_2");
    if(!findObject(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_2").checked)
        clickButton(":Supplied at this Site.Create W/Os to Meet Sales Demand_QCheckBox_2");
    waitForObject(":Sold from this Site._soldRanking_QSpinBox_2");
    type(":Sold from this Site._soldRanking_QSpinBox_2", "<Ctrl+A>");
    type(":Sold from this Site._soldRanking_QSpinBox_2", "<Del>");
    type(":Sold from this Site._soldRanking_QSpinBox_2", "1");
    clickButton(":Costing Method.Standard_QRadioButton_2");
    type(":Control._controlMethod_XComboBox_2", "Regular");
    type(":_plannerCode_XComboBox", "MRP");
    type(":_costcat_XComboBox_2", "CCWH1");
    if(findObject(":_inventory.Stocked_QCheckBox_2").checked)
         clickButton(":_inventory.Stocked_QCheckBox_2");
    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_2").checked)
        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_2");
    type(":_cycleCountFreq_QSpinBox_2", "<Ctrl+A>");
    type(":_cycleCountFreq_QSpinBox_2", "<Del>");
    type(":_cycleCountFreq_QSpinBox_2", "30");
    type(":_eventFence_QSpinBox_3", "<Ctrl+A>");
    type(":_eventFence_QSpinBox_3", "<Del>");
    type(":_eventFence_QSpinBox_3", "10");
    type(":_locationGroup._locationComments_XLineEdit_2", "FG-01-01-01");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2", "Planning");
    type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    type(":_reorderLevel_XLineEdit_2", "0.00");
    type(":_orderUpToQty_XLineEdit_2", "0.00");
    type(":_minimumOrder_XLineEdit_2", "100");
    type(":_maximumOrder_XLineEdit_2", "10000");
    type(":_orderMultiple_XLineEdit_2", "100");
    if(!findObject(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2").checked)
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Ctrl+A>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Del>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","7");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "0");
    type(":_leadTime_QSpinBox_2", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_2", "<Del>");
    type(":_leadTime_QSpinBox_2", "1");
    type(":_mrp._safetyStock_XLineEdit_2", "<Ctrl+A>");
    type(":_mrp._safetyStock_XLineEdit_2", "<Del>");
    type(":_mrp._safetyStock_XLineEdit_2", "0.00");
    waitForObject(":List Item Sites.Save_QPushButton_2");
    clickButton(":List Item Sites.Save_QPushButton_2");
    waitForObject(":List Item Sites.Cancel_QPushButton_2");
    clickButton(":List Item Sites.Cancel_QPushButton_2");
    test.log("Item YTRUCK1 created");
    
    //---------Item site for TBODY1--------------
    waitForObject(":List Item Sites.New_QPushButton_2");
    clickButton(":List Item Sites.New_QPushButton_2");
    waitForObject(":List Item Sites._itemNumber_ItemLineEdit");
    type(":List Item Sites._itemNumber_ItemLineEdit", "tbody1");
    type(":_warehouse_WComboBox_3","WH1");
    if(!findObject(":List Item Sites.Supplied at this Site_QGroupBox_2").checked)
       type(":List Item Sites.Supplied at this Site_QGroupBox_2"," ");	
    if(findObject(":List Item Sites.Sold from this Site_QGroupBox_2").checked)
        type(":List Item Sites.Sold from this Site_QGroupBox_2"," ");
    clickButton(":Costing Method.Standard_QRadioButton_2");
    type(":Control._controlMethod_XComboBox_2", "Regular");
    type(":_plannerCode_XComboBox", "MRP");
    type(":_costcat_XComboBox_2", "CCWH1");
    if(findObject(":_inventory.Stocked_QCheckBox_2").checked)
         clickButton(":_inventory.Stocked_QCheckBox_2");
    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_2").checked)
        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_2");
    type(":_cycleCountFreq_QSpinBox_2", "<Ctrl+A>");
    type(":_cycleCountFreq_QSpinBox_2", "<Del>");
    type(":_cycleCountFreq_QSpinBox_2", "30");
    type(":_eventFence_QSpinBox_3", "<Ctrl+A>");
    type(":_eventFence_QSpinBox_3", "<Del>");
    type(":_eventFence_QSpinBox_3", "10");
    type(":_locationGroup._locationComments_XLineEdit_2", "FG-01-01-01");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2", "Planning");
    type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    type(":_reorderLevel_XLineEdit_2", "0.00");
    type(":_orderUpToQty_XLineEdit_2", "0.00");
    type(":_minimumOrder_XLineEdit_2", "100");
    type(":_maximumOrder_XLineEdit_2", "10000");
    type(":_orderMultiple_XLineEdit_2", "100");
    if(!findObject(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2").checked)
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Ctrl+A>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Del>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","7");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "0");
    type(":_leadTime_QSpinBox_2", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_2", "<Del>");
    type(":_leadTime_QSpinBox_2", "1");
    type(":_mrp._safetyStock_XLineEdit_2", "<Ctrl+A>");
    type(":_mrp._safetyStock_XLineEdit_2", "<Del>");
    type(":_mrp._safetyStock_XLineEdit_2", "0.00");
    waitForObject(":List Item Sites.Save_QPushButton_2");
    clickButton(":List Item Sites.Save_QPushButton_2");
    waitForObject(":List Item Sites.Cancel_QPushButton_2");
    clickButton(":List Item Sites.Cancel_QPushButton_2");
    test.log("Item TBODY1 created");
    
    
     //---------Item site for TINSERT1--------------
    waitForObject(":List Item Sites.New_QPushButton_2");
    clickButton(":List Item Sites.New_QPushButton_2");
    waitForObject(":List Item Sites._itemNumber_ItemLineEdit");
    type(":List Item Sites._itemNumber_ItemLineEdit", "tinsert1");
    type(":_warehouse_WComboBox_3","WH1");
    if(!findObject(":List Item Sites.Supplied at this Site_QGroupBox_2").checked)
       type(":List Item Sites.Supplied at this Site_QGroupBox_2"," ");	
    if(findObject(":List Item Sites.Sold from this Site_QGroupBox_2").checked)
        type(":List Item Sites.Sold from this Site_QGroupBox_2"," ");
    clickButton(":Costing Method.Standard_QRadioButton_2");
    type(":Control._controlMethod_XComboBox_2", "Regular");
    type(":_plannerCode_XComboBox", "MRP");
    type(":_costcat_XComboBox_2", "CCWH1");
    if(findObject(":_inventory.Stocked_QCheckBox_2").checked)
         clickButton(":_inventory.Stocked_QCheckBox_2");
    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_2").checked)
        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_2");
    type(":_cycleCountFreq_QSpinBox_2", "<Ctrl+A>");
    type(":_cycleCountFreq_QSpinBox_2", "<Del>");
    type(":_cycleCountFreq_QSpinBox_2", "30");
    type(":_eventFence_QSpinBox_3", "<Ctrl+A>");
    type(":_eventFence_QSpinBox_3", "<Del>");
    type(":_eventFence_QSpinBox_3", "10");
    type(":_locationGroup._locationComments_XLineEdit_2", "FG-01-01-01");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2", "Planning");
    type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    type(":_reorderLevel_XLineEdit_2", "0.00");
    type(":_orderUpToQty_XLineEdit_2", "0.00");
    type(":_minimumOrder_XLineEdit_2", "100");
    type(":_maximumOrder_XLineEdit_2", "10000");
    type(":_orderMultiple_XLineEdit_2", "100");
    if(!findObject(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2").checked)
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Ctrl+A>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Del>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","7");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "0");
    type(":_leadTime_QSpinBox_2", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_2", "<Del>");
    type(":_leadTime_QSpinBox_2", "1");
    type(":_mrp._safetyStock_XLineEdit_2", "<Ctrl+A>");
    type(":_mrp._safetyStock_XLineEdit_2", "<Del>");
    type(":_mrp._safetyStock_XLineEdit_2", "0.00");
    waitForObject(":List Item Sites.Save_QPushButton_2");
    clickButton(":List Item Sites.Save_QPushButton_2");
    waitForObject(":List Item Sites.Cancel_QPushButton_2");
    clickButton(":List Item Sites.Cancel_QPushButton_2");
    test.log("Item TINSERT1 created");
    
    
     //---------Item site for TWHEEL1--------------
    waitForObject(":List Item Sites.New_QPushButton_2");
    clickButton(":List Item Sites.New_QPushButton_2");
    waitForObject(":List Item Sites._itemNumber_ItemLineEdit");
    type(":List Item Sites._itemNumber_ItemLineEdit", "twheel1");
    type(":_warehouse_WComboBox_3","WH1");
    if(!findObject(":List Item Sites.Supplied at this Site_QGroupBox_2").checked)
       type(":List Item Sites.Supplied at this Site_QGroupBox_2"," ");	
    if(findObject(":List Item Sites.Sold from this Site_QGroupBox_2").checked)
        type(":List Item Sites.Sold from this Site_QGroupBox_2"," ");
    clickButton(":Costing Method.Standard_QRadioButton_2");
    type(":Control._controlMethod_XComboBox_2", "Regular");
    type(":_plannerCode_XComboBox", "MRP");
    type(":_costcat_XComboBox_2", "CCWH1");
    if(findObject(":_inventory.Stocked_QCheckBox_2").checked)
         clickButton(":_inventory.Stocked_QCheckBox_2");
    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_2").checked)
        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_2");
    type(":_cycleCountFreq_QSpinBox_2", "<Ctrl+A>");
    type(":_cycleCountFreq_QSpinBox_2", "<Del>");
    type(":_cycleCountFreq_QSpinBox_2", "30");
    type(":_eventFence_QSpinBox_3", "<Ctrl+A>");
    type(":_eventFence_QSpinBox_3", "<Del>");
    type(":_eventFence_QSpinBox_3", "10");
    type(":_locationGroup._locationComments_XLineEdit_2", "FG-01-01-01");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2", "Planning");
    type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    type(":_reorderLevel_XLineEdit_2", "0.00");
    type(":_orderUpToQty_XLineEdit_2", "0.00");
    type(":_minimumOrder_XLineEdit_2", "100");
    type(":_maximumOrder_XLineEdit_2", "10000");
    type(":_orderMultiple_XLineEdit_2", "100");
    if(!findObject(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2").checked)
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Ctrl+A>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Del>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","7");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "0");
    type(":_leadTime_QSpinBox_2", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_2", "<Del>");
    type(":_leadTime_QSpinBox_2", "1");
    type(":_mrp._safetyStock_XLineEdit_2", "<Ctrl+A>");
    type(":_mrp._safetyStock_XLineEdit_2", "<Del>");
    type(":_mrp._safetyStock_XLineEdit_2", "0.00");
    waitForObject(":List Item Sites.Save_QPushButton_2");
    clickButton(":List Item Sites.Save_QPushButton_2");
    waitForObject(":List Item Sites.Cancel_QPushButton_2");
    clickButton(":List Item Sites.Cancel_QPushButton_2");
    test.log("Item TINSERT1 created");
  
  
    //---------Item site for TKIT1--------------
    waitForObject(":List Item Sites.New_QPushButton_2");
    clickButton(":List Item Sites.New_QPushButton_2");
    waitForObject(":List Item Sites._itemNumber_ItemLineEdit");
    type(":List Item Sites._itemNumber_ItemLineEdit", "tkit1");
    type(":_warehouse_WComboBox_3","WH1");
    if(!findObject(":List Item Sites.Supplied at this Site_QGroupBox_2").checked)
       type(":List Item Sites.Supplied at this Site_QGroupBox_2"," ");	
    if(findObject(":List Item Sites.Sold from this Site_QGroupBox_2").checked)
        type(":List Item Sites.Sold from this Site_QGroupBox_2"," ");
    clickButton(":Costing Method.Standard_QRadioButton_2");
    type(":Control._controlMethod_XComboBox_2", "Regular");
    type(":_plannerCode_XComboBox", "MRP");
    type(":_costcat_XComboBox_2", "CCWH1");
    if(findObject(":_inventory.Stocked_QCheckBox_2").checked)
         clickButton(":_inventory.Stocked_QCheckBox_2");
    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_2").checked)
        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_2");
    type(":_cycleCountFreq_QSpinBox_2", "<Ctrl+A>");
    type(":_cycleCountFreq_QSpinBox_2", "<Del>");
    type(":_cycleCountFreq_QSpinBox_2", "30");
    type(":_eventFence_QSpinBox_3", "<Ctrl+A>");
    type(":_eventFence_QSpinBox_3", "<Del>");
    type(":_eventFence_QSpinBox_3", "10");
    type(":_locationGroup._locationComments_XLineEdit_2", "WP-01-01-01");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2", "Planning");
    type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    type(":_reorderLevel_XLineEdit_2", "0.00");
    type(":_orderUpToQty_XLineEdit_2", "0.00");
    type(":_minimumOrder_XLineEdit_2", "100");
    type(":_maximumOrder_XLineEdit_2", "10000");
    type(":_orderMultiple_XLineEdit_2", "100");
    if(!findObject(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2").checked)
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Ctrl+A>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Del>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","7");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "0");
    type(":_leadTime_QSpinBox_2", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_2", "<Del>");
    type(":_leadTime_QSpinBox_2", "1");
    type(":_mrp._safetyStock_XLineEdit_2", "<Ctrl+A>");
    type(":_mrp._safetyStock_XLineEdit_2", "<Del>");
    type(":_mrp._safetyStock_XLineEdit_2", "0.00");
    waitForObject(":List Item Sites.Save_QPushButton_2");
    clickButton(":List Item Sites.Save_QPushButton_2");
    waitForObject(":List Item Sites.Cancel_QPushButton_2");
    clickButton(":List Item Sites.Cancel_QPushButton_2");
    test.log("Item TKIT1 created");
    
    
    //---------Item site for TBOX1--------------
    waitForObject(":List Item Sites.New_QPushButton_2");
    clickButton(":List Item Sites.New_QPushButton_2");
    waitForObject(":List Item Sites._itemNumber_ItemLineEdit");
    type(":List Item Sites._itemNumber_ItemLineEdit", "tbox1");
    type(":_warehouse_WComboBox_3","WH1");
    if(!findObject(":List Item Sites.Supplied at this Site_QGroupBox_2").checked)
       type(":List Item Sites.Supplied at this Site_QGroupBox_2"," ");	
    if(findObject(":List Item Sites.Sold from this Site_QGroupBox_2").checked)
        type(":List Item Sites.Sold from this Site_QGroupBox_2"," ");
    clickButton(":Costing Method.Standard_QRadioButton_2");
    type(":Control._controlMethod_XComboBox_2", "Regular");
    type(":_plannerCode_XComboBox", "MRP");
    type(":_costcat_XComboBox_2", "CCWH1");
    if(findObject(":_inventory.Stocked_QCheckBox_2").checked)
         clickButton(":_inventory.Stocked_QCheckBox_2");
    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_2").checked)
        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_2");
    type(":_cycleCountFreq_QSpinBox_2", "<Ctrl+A>");
    type(":_cycleCountFreq_QSpinBox_2", "<Del>");
    type(":_cycleCountFreq_QSpinBox_2", "30");
    type(":_eventFence_QSpinBox_3", "<Ctrl+A>");
    type(":_eventFence_QSpinBox_3", "<Del>");
    type(":_eventFence_QSpinBox_3", "10");
    if(!findObject(":_locationGroup.Multiple Location Control_QCheckBox_2").checked)
        type(":_locationGroup.Multiple Location Control_QCheckBox_2"," ");
    if(!findObject(":_locationGroup.Use Default Location_QGroupBox_2").checked)
        type(":_locationGroup.Use Default Location_QGroupBox_2"," ");
    type(":Use Default Location._locations_XComboBox", "01010103");
    type(":_locationGroup._locationComments_XLineEdit_2", "RM-01-01-01");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2", "Planning");
    type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    type(":_reorderLevel_XLineEdit_2", "0.00");
    type(":_orderUpToQty_XLineEdit_2", "0.00");
    type(":_minimumOrder_XLineEdit_2", "100");
    type(":_maximumOrder_XLineEdit_2", "10000");
    type(":_orderMultiple_XLineEdit_2", "100");
    if(!findObject(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2").checked)
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Ctrl+A>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Del>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","7");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "0");
    type(":_leadTime_QSpinBox_2", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_2", "<Del>");
    type(":_leadTime_QSpinBox_2", "1");
    type(":_mrp._safetyStock_XLineEdit_2", "<Ctrl+A>");
    type(":_mrp._safetyStock_XLineEdit_2", "<Del>");
    type(":_mrp._safetyStock_XLineEdit_2", "0.00");
    waitForObject(":List Item Sites.Save_QPushButton_2");
    clickButton(":List Item Sites.Save_QPushButton_2");
    waitForObject(":List Item Sites.Cancel_QPushButton_2");
    clickButton(":List Item Sites.Cancel_QPushButton_2");
    test.log("Item TBOX1 created");
    
    
  //---------Item site for YPAINT1--------------
    waitForObject(":List Item Sites.New_QPushButton_2");
    clickButton(":List Item Sites.New_QPushButton_2");
    waitForObject(":List Item Sites._itemNumber_ItemLineEdit");
    type(":List Item Sites._itemNumber_ItemLineEdit", "ypaint1");
    type(":_warehouse_WComboBox_3","WH1");
    if(!findObject(":List Item Sites.Supplied at this Site_QGroupBox_2").checked)
       type(":List Item Sites.Supplied at this Site_QGroupBox_2"," ");	
    if(findObject(":List Item Sites.Sold from this Site_QGroupBox_2").checked)
        type(":List Item Sites.Sold from this Site_QGroupBox_2"," ");
    clickButton(":Costing Method.Standard_QRadioButton_2");
    type(":Control._controlMethod_XComboBox_2", "Lot");
    type(":_plannerCode_XComboBox", "MRP");
    type(":_costcat_XComboBox_2", "CCWH1");
    if(findObject(":_inventory.Stocked_QCheckBox_2").checked)
         clickButton(":_inventory.Stocked_QCheckBox_2");
    if(!findObject(":_inventory.Allow Automatic Updates_QCheckBox_2").checked)
        clickButton(":_inventory.Allow Automatic Updates_QCheckBox_2");
    type(":_cycleCountFreq_QSpinBox_2", "<Ctrl+A>");
    type(":_cycleCountFreq_QSpinBox_2", "<Del>");
    type(":_cycleCountFreq_QSpinBox_2", "30");
    type(":_eventFence_QSpinBox_3", "<Ctrl+A>");
    type(":_eventFence_QSpinBox_3", "<Del>");
    type(":_eventFence_QSpinBox_3", "10");
    if(findObject(":_locationGroup.Multiple Location Control_QCheckBox_2").checked)
        type(":_locationGroup.Multiple Location Control_QCheckBox_2"," ");
    type(":_locationGroup._locationComments_XLineEdit_2", "RM-01-01-01");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2", "Planning");
    type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    type(":_reorderLevel_XLineEdit_2", "0.00");
    type(":_orderUpToQty_XLineEdit_2", "0.00");
    type(":_minimumOrder_XLineEdit_2", "100");
    type(":_maximumOrder_XLineEdit_2", "10000");
    type(":_orderMultiple_XLineEdit_2", "100");
    if(!findObject(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2").checked)
        clickButton(":Enforce Order Parameters.Enforce on Manual Orders_QCheckBox_2");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Ctrl+A>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","<Del>");
    type(":_mrp.qt_spinbox_lineedit_QLineEdit_2","7");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Ctrl+A>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "<Del>");
    type(":_mrp._mpsTimeFence_QSpinBox_2", "0");
    type(":_leadTime_QSpinBox_2", "<Ctrl+A>");
    type(":_leadTime_QSpinBox_2", "<Del>");
    type(":_leadTime_QSpinBox_2", "1");
    type(":_mrp._safetyStock_XLineEdit_2", "<Ctrl+A>");
    type(":_mrp._safetyStock_XLineEdit_2", "<Del>");
    type(":_mrp._safetyStock_XLineEdit_2", "0.00");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar_2", "Expiration");
    clickButton(":_expirationTab.Perishable_QCheckBox");
    clickButton(":_expirationTab.Requires Warranty when Purchased_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton_2");
    clickButton(":List Item Sites.Save_QPushButton_2");
    waitForObject(":List Item Sites.Cancel_QPushButton_2");
    clickButton(":List Item Sites.Cancel_QPushButton_2");
    test.log("Item YPAINT1 created");
    
    
    waitForObject(":List Item Sites.Close_QPushButton_2");
    clickButton(":List Item Sites.Close_QPushButton_2");
    
    
    
}
