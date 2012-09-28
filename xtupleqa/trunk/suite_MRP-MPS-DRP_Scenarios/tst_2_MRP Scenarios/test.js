function main()
{
    
     //-----declarations------
    source(findFile("scripts","functions.js"));
    
    loginAppl("CONFIGURE");
  
    waitForObject(":Registration Key.Yes_QPushButton");
    clickButton(":Registration Key.Yes_QPushButton");
    
    
    
    //MRP DEMAND SIDE NETTING - SALES ORDER
    test.log("MRP DEMAND SIDE NETTING - SALES ORDER");
    
    SetPlng("TBOX1","MRP");
    DelPlanOrdrs();
    QOHZero("TBOX1");
    DelAllPO();
    CheckSaleable("TBOX1");
    snooze(3);
    NewSO("TBOX1",500);   
    
    //----Setup Item site------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
          if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TBOX1", 0, 0, 0, Qt.LeftButton);
        
        
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        nativeType("<Tab>");
        snooze(1);
        
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "100");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: TBOX1");
        
    }
    catch(e)
    {
        test.fail("Error in setting  up Item Site of TBOX1 " + e);
    }
    
//    MRP("+99");
    MRPbyItem("TBOX1","WH1","+99");
    
    //--------View Planned Orders----        
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");      
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                var Qnty, DispDate, item;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(10)=="600.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    
    //MRP DEMAND SIDE NETTING - WORK ORDER
    test.log("MRP DEMAND SIDE NETTING - WORK ORDER");
    
    SetPlng("TBOX1","MRP");
    DelPlanOrdrs();
    QOHZero("TBOX1");
    DelAllPO();
    DelAllSO();
    SetQtyScrp("TBOX1","1.00", "0.00");
    
    
    //----Setup Item site------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
          if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TSUB1", 0, 0, 0, Qt.LeftButton);
        
        
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "0");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        test.log("Item Site setup for: TSUB1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of TSUB1" + e);
    }
    
    
    //----Setup Item site------   
    try
    {        
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TBOX1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "100");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        test.log("Item Site setup for: TBOX1");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of TBOX1" + e);
    }
    
    
    NewWO("TSUB1",300,0,0)
            
            
//    MRP("+99");
    MRPbyItem("TSUB1","WH1","+99");
    MRPbyItem("TBOX1","WH1","+99");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");    
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                var Qnty, DispDate, item;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(10)=="400.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    
    
    //MRP DEMAND SIDE NETTING – WORK ORDER – SCRAP %
    test.log("MRP DEMAND SIDE NETTING – WORK ORDER – SCRAP %");
    
    SetPlng("TBOX1","MRP");
    DelPlanOrdrs();
    QOHZero("TBOX1");
    DelAllPO();
    DelAllSO();
    DelAllWO();
    SetQtyScrp("TBOX1","1.00", "20.00");
    
    
    //----Setup Item site------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
          if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TSUB1", 0, 0, 0, Qt.LeftButton);
        
        
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "0");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        test.log("Item Site setup for: TSUB1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of TSUB1" + e);
    }
    
    
    //----Setup Item site------   
    try
    {        
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TBOX1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "100");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        test.log("Item Site setup for: TBOX1");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of TBOX1" + e);
    }
    
    
    NewWO("TSUB1",350,0,0);
    
//    MRP("+99");
    MRPbyItem("TSUB1","WH1","+99");
    MRPbyItem("TBOX1","WH1","+99");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");      
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                var Qnty, DispDate, item;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(10)=="520.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    SetQtyScrp("TBOX1","1.00", "0.00");
    
    
    //MRP DEMAND SIDE NETTING – WORK ORDER – MATERIAL ISSUE UOM
    test.log("MRP DEMAND SIDE NETTING – WORK ORDER – MATERIAL ISSUE UOM");
    SetPlng("TBOX1","MRP");
    DelPlanOrdrs();
    QOHZero("TBOX1");
    DelAllPO();
    DelAllSO();
    DelAllWO();
    
    //----Define Conversion---
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products");
        activateItem(":xTuple ERP:*_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        doubleClickItem(":_list_XTreeWidget_7", "TBOX1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item.qt_tabwidget_tabbar_QTabBar", "Conversions");
        waitForObject(":_tabUOM.New_QPushButton");
        clickButton(":_tabUOM.New_QPushButton");
        waitForObjectItem(":Item._uomTo_XComboBox", "CS");
        clickItem(":Item._uomTo_XComboBox", "CS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Item._fromValue_XLineEdit");
        findObject(":Item._fromValue_XLineEdit").clear();
        type(":Item._fromValue_XLineEdit", "10");    
        waitForObjectItem(":_typeFrame._available_QListWidget", "AltCapacity");
        clickItem(":_typeFrame._available_QListWidget", "AltCapacity", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_typeFrame.Add >_QPushButton");
        clickButton(":_typeFrame.Add >_QPushButton");
        waitForObjectItem(":_typeFrame._available_QListWidget", "Capacity");
        clickItem(":_typeFrame._available_QListWidget", "Capacity", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_typeFrame.Add >_QPushButton");
        clickButton(":_typeFrame.Add >_QPushButton");
        waitForObjectItem(":_typeFrame._available_QListWidget", "MaterialIssue");
        clickItem(":_typeFrame._available_QListWidget", "MaterialIssue", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_typeFrame.Add >_QPushButton");
        clickButton(":_typeFrame.Add >_QPushButton");
        waitForObjectItem(":_typeFrame._available_QListWidget", "Selling");
        clickItem(":_typeFrame._available_QListWidget", "Selling", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_typeFrame.Add >_QPushButton");
        clickButton(":_typeFrame.Add >_QPushButton");
        
        waitForObject(":Item.Save_QPushButton_2");
        clickButton(":Item.Save_QPushButton_2");
        waitForObject(":Item.Save_QPushButton");
        clickButton(":Item.Save_QPushButton");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in defining conversion for TBOX1" + e);
    }
    
    
    SetQtyScrp("TBOX1","0.20", "0.00");
    
    //---change UOM in BOM--
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products");
        activateItem(":xTuple ERP:*_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        activateItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        activateItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        
        waitForObject(":Bills of Materials._bom_XTreeWidget");
        doubleClickItem(":Bills of Materials._bom_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":frame_2._bomitem_XTreeWidget");
        doubleClickItem(":frame_2._bomitem_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Bill of Materials._uom_XComboBox");
        if(findObject(":Bill of Materials._uom_XComboBox").currentText!="CS")
            type(":Bill of Materials._uom_XComboBox","CS");    
        waitForObject(":Bill of Materials.Save_QPushButton_3");
        clickButton(":Bill of Materials.Save_QPushButton_3");
        waitForObject(":Bill of Materials.Save_QPushButton_2");
        clickButton(":Bill of Materials.Save_QPushButton_2");
        waitForObject(":Bills of Materials.Close_QPushButton");
        clickButton(":Bills of Materials.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in changing UOM of TBOX1" + e);
    }
    
    
    NewWO("TSUB1",300,0,0);
            
            
       //----Setup Item site------
            try
       {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
          if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TSUB1", 0, 0, 0, Qt.LeftButton);
        
        
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox_4", 0, 0, 1, Qt.LeftButton);
        
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "0");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        test.log("Item Site setup for: TSUB1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of TSUB1" + e);
    }
    
    
    //----Setup Item site------   
    try
    {        
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TBOX1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "100");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        test.log("Item Site setup for: TBOX1");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of TBOX1" + e);
    }
    
//    MRP("+99");
    
    MRPbyItem("TSUB1","WH1","+99");
    MRPbyItem("TBOX1","WH1","+99");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");   
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                var Qnty, DispDate, item;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(10)=="700.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    
    //MRP DEMAND SIDE NETTING – WORK ORDER (RESCHEDULED)
    
    test.log("MRP DEMAND SIDE NETTING – WORK ORDER (RESCHEDULED)");
    SetPlng("TBOX1","MRP");
    DelPlanOrdrs();
    QOHZero("TBOX1");
    DelAllPO();
    DelAllSO();   
    SetQtyScrp("TBOX1","1.00", "0.00");
    
    //---change UOM in BOM--
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products");
        activateItem(":xTuple ERP:*_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        activateItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        activateItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        
        waitForObject(":Bills of Materials._bom_XTreeWidget");
        doubleClickItem(":Bills of Materials._bom_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":frame_2._bomitem_XTreeWidget");
        doubleClickItem(":frame_2._bomitem_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Bill of Materials._uom_XComboBox");
        if(findObject(":Bill of Materials._uom_XComboBox").currentText!="EA")
            type(":Bill of Materials._uom_XComboBox","EA");    
        waitForObject(":Bill of Materials.Save_QPushButton_3");
        clickButton(":Bill of Materials.Save_QPushButton_3");
        waitForObject(":Bill of Materials.Save_QPushButton_2");
        clickButton(":Bill of Materials.Save_QPushButton_2");
        waitForObject(":Bills of Materials.Close_QPushButton");
        clickButton(":Bills of Materials.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in changing UOM of TBOX1" + e);
    }
    
    
    ImplodeTopWO();
    ExplodeTopWO();
    RescheduleWO("+10","+10");
    
    MRP("+99");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
        
        waitForObject(":Order #_HeaderViewItem");
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
            mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==2)
            {
                var Qnty, DispDate, item;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(10)=="300.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    
    //MRP DEMAND SIDE NETTING – FIRM PLANNED WORK ORDER
    test.log("MRP DEMAND SIDE NETTING – FIRM PLANNED WORK ORDER");
    
    DelPlanOrdrs();
    QOHZero("TBOX1");
    DelAllWO();
    NewScheduledWO("TSUB1",200,"+10",0);
    FirmPlndOrder();
    MRPbyItem("TBOX1","WH1","+99");
//    MRP("+99");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");  
        
        waitForObject(":Order #_HeaderViewItem");
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
            mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==3)
            {
                var Qnty, DispDate, item;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                var d = new Date();
                var CurrentYearFull = d.getFullYear();
                var CurrentMonth = 1+d.getMonth();
                CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
                var CurrentDate = d.getDate();
                var StartDate = CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate;
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(10)=="200.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(10)=="200.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    //MRP MULTILEVEL DEMAND – SIMPLE
    test.log("MRP MULTILEVEL DEMAND – SIMPLE");
    DelPlanOrdrs();
    QOHZero("YTRUCK1");
    QOHZero("TSUB1");
    QOHZero("TBOX1");
    DelAllWO();
    DelAllSO();
    
    //----Setup Item site------   
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
          if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "YTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox_4", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "0");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of YTRUCK1"+ e);
    }
    
    
    try
    {
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TSUB1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox_4", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "0");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of TSUB1" + e);
    }
    
    
    try
    {
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TBOX1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").enabled && findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox_4", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "0");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of TSUB1" + e);
    }
    
    NewSO("YTRUCK1",200);
    
    MRP("+99");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");   
        
        waitForObject(":Order #_HeaderViewItem");
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
            mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==3)
            {
                var Qnty, DispDate, item;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                var d = new Date();
                var CurrentYearFull = d.getFullYear();
                var CurrentMonth = 1+d.getMonth();
                CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
                var CurrentDate = d.getDate();
                CurrentDate = CurrentDate>9?CurrentDate:("0"+CurrentDate);
                var StartDate = CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate;
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                
                
                if(obj_TreeTopLevelItem.text(4)=="YTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="200.00" )
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="200.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(10)=="200.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    
    //MRP MULTILEVEL DEMAND – ADVANCED
    test.log("MRP MULTILEVEL DEMAND – ADVANCED");
    DelPlanOrdrs();
    QOHZero("YTRUCK1");
    QOHZero("TSUB1");
    QOHZero("TBOX1");
    DelAllWO();
    DelAllSO();
    
    
    //-----Copy TSUB1 into 3 items-------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products");
        activateItem(":xTuple ERP:*_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        openItemContextMenu(":_list_XTreeWidget_7","TBOX1",5,5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        if((findObject(":Items.Copy Bill of Materials_QCheckBox").checked))
            clickButton(":Items.Copy Bill of Materials_QCheckBox");
        waitForObject(":_targetItemNumber_XLineEdit_2");
        type(":_targetItemNumber_XLineEdit_2", "TSUB3");
        waitForObject(":Items.Copy_QPushButton");
        clickButton(":Items.Copy_QPushButton");
        waitForObject(":Items.Yes_QPushButton");
        clickButton(":Items.Yes_QPushButton");
        waitForObject(":Items.Site can manufacture this Item_QGroupBox");
        if(!findObject(":Items.Site can manufacture this Item_QGroupBox").checked)
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        waitForObjectItem(":_warehouse_WComboBox_6", "WH1");
        clickItem(":_warehouse_WComboBox_6", "WH1", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_plannerCode_XComboBox_3" );
        clickItem(":_plannerCode_XComboBox_3", "MRP-MRP Items", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2", "FINISHED-Finished Product - WH1", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Items.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Items.qt_tabwidget_tabbar_QTabBar", "Planning");
        
        
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
        waitForObject(":_reorderLevel_XLineEdit_3");
        findObject(":_reorderLevel_XLineEdit_3").clear();
        type(":_reorderLevel_XLineEdit_3", "0");
        findObject(":_orderUpToQty_XLineEdit_3").clear();
        type(":_orderUpToQty_XLineEdit_3", "0");
        findObject(":_minimumOrder_XLineEdit_3").clear();
        type(":_minimumOrder_XLineEdit_3", "0");
        findObject(":_maximumOrder_XLineEdit_3").clear();
        type(":_maximumOrder_XLineEdit_3", "0");
        findObject(":_orderMultiple_XLineEdit_3").clear();
        type(":_orderMultiple_XLineEdit_3", "0");
        waitForObject(":Scheduling._planningType_XComboBox_3");
        if(findObject(":Scheduling._planningType_XComboBox_3").currentText!="MRP")
            type(":Scheduling._planningType_XComboBox_3", "MRP");
        findObject(":Scheduling._safetyStock_XLineEdit_3").clear();
        type(":Scheduling._safetyStock_XLineEdit_3","0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_6").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_6","7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_7").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_7","3");
        if(!findObject(":Scheduling.First Group_QCheckBox_3").checked)
            clickButton(":Scheduling.First Group_QCheckBox_3");
        waitForObject(":Items.Save_QPushButton");
        clickButton(":Items.Save_QPushButton");
        waitForObject(":Items.Cancel_QPushButton");
        clickButton(":Items.Cancel_QPushButton");
        
        
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        openItemContextMenu(":_list_XTreeWidget_7","TBOX1",5,5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        if((findObject(":Items.Copy Bill of Materials_QCheckBox").checked))
            clickButton(":Items.Copy Bill of Materials_QCheckBox");
        waitForObject(":_targetItemNumber_XLineEdit_2");
        type(":_targetItemNumber_XLineEdit_2", "TSUB4");
        waitForObject(":Items.Copy_QPushButton");
        clickButton(":Items.Copy_QPushButton");
        waitForObject(":Items.Yes_QPushButton");
        clickButton(":Items.Yes_QPushButton");
        waitForObject(":Items.Site can manufacture this Item_QGroupBox");
        if(!findObject(":Items.Site can manufacture this Item_QGroupBox").checked)
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        waitForObjectItem(":_warehouse_WComboBox_6", "WH1");
        clickItem(":_warehouse_WComboBox_6", "WH1", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_plannerCode_XComboBox_3" );
        clickItem(":_plannerCode_XComboBox_3", "MRP-MRP Items", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2", "FINISHED-Finished Product - WH1", 0, 0, 1, Qt.LeftButton);
        clickTab(":Items.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
        waitForObject(":_reorderLevel_XLineEdit_3");
        findObject(":_reorderLevel_XLineEdit_3").clear();
        type(":_reorderLevel_XLineEdit_3", "0");
        findObject(":_orderUpToQty_XLineEdit_3").clear();
        type(":_orderUpToQty_XLineEdit_3", "0");
        findObject(":_minimumOrder_XLineEdit_3").clear();
        type(":_minimumOrder_XLineEdit_3", "0");
        findObject(":_maximumOrder_XLineEdit_3").clear();
        type(":_maximumOrder_XLineEdit_3", "0");
        findObject(":_orderMultiple_XLineEdit_3").clear();
        type(":_orderMultiple_XLineEdit_3", "0");
        
        waitForObject(":Scheduling._planningType_XComboBox_3");
        if(findObject(":Scheduling._planningType_XComboBox_3").currentText!="MRP")
            type(":Scheduling._planningType_XComboBox_3", "MRP");
        findObject(":Scheduling._safetyStock_XLineEdit_3").clear();
        type(":Scheduling._safetyStock_XLineEdit_3", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_6").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_6","7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_7").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_7","3");
        if(!findObject(":Scheduling.First Group_QCheckBox_3").checked)
            clickButton(":Scheduling.First Group_QCheckBox_3");
        
        waitForObject(":Items.Save_QPushButton");
        clickButton(":Items.Save_QPushButton");
        waitForObject(":Items.Cancel_QPushButton");
        clickButton(":Items.Cancel_QPushButton");
        
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        openItemContextMenu(":_list_XTreeWidget_7","TBOX1",5,5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        if((findObject(":Items.Copy Bill of Materials_QCheckBox").checked))
            clickButton(":Items.Copy Bill of Materials_QCheckBox");
        waitForObject(":_targetItemNumber_XLineEdit_2");
        type(":_targetItemNumber_XLineEdit_2", "TSUB5");
        waitForObject(":Items.Copy_QPushButton");
        clickButton(":Items.Copy_QPushButton");
        waitForObject(":Items.Yes_QPushButton");
        clickButton(":Items.Yes_QPushButton");
        waitForObject(":Items.Site can manufacture this Item_QGroupBox");
        if(!findObject(":Items.Site can manufacture this Item_QGroupBox").checked)
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        waitForObjectItem(":_warehouse_WComboBox_6", "WH1");
        clickItem(":_warehouse_WComboBox_6", "WH1", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_plannerCode_XComboBox_3" );
        clickItem(":_plannerCode_XComboBox_3", "MRP-MRP Items", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2", "FINISHED-Finished Product - WH1", 0, 0, 1, Qt.LeftButton);
        clickTab(":Items.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_3");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_3").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_3"," ");
        waitForObject(":_reorderLevel_XLineEdit_3");
        findObject(":_reorderLevel_XLineEdit_3").clear();
        type(":_reorderLevel_XLineEdit_3", "0");
        findObject(":_orderUpToQty_XLineEdit_3").clear();
        type(":_orderUpToQty_XLineEdit_3", "0");
        findObject(":_minimumOrder_XLineEdit_3").clear();
        type(":_minimumOrder_XLineEdit_3", "0");
        findObject(":_maximumOrder_XLineEdit_3").clear();
        type(":_maximumOrder_XLineEdit_3", "0");
        findObject(":_orderMultiple_XLineEdit_3").clear();
        type(":_orderMultiple_XLineEdit_3", "0");
        
        waitForObject(":Scheduling._planningType_XComboBox_3");
        if(findObject(":Scheduling._planningType_XComboBox_3").currentText!="MRP")
            type(":Scheduling._planningType_XComboBox_3", "MRP");
        findObject(":Scheduling._safetyStock_XLineEdit_3").clear();
        type(":Scheduling._safetyStock_XLineEdit_3","0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_6").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_6","7");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_7").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_7","3");
        if(!findObject(":Scheduling.First Group_QCheckBox_3").checked)
            clickButton(":Scheduling.First Group_QCheckBox_3");
        waitForObject(":Items.Save_QPushButton");
        clickButton(":Items.Save_QPushButton");
        waitForObject(":Items.Cancel_QPushButton");
        clickButton(":Items.Cancel_QPushButton");
        
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in copying BOM of TSUB1" + e);
    }
    
    
    //---------Create BOM for the newly created 3 items--------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products");
        activateItem(":xTuple ERP:*_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        activateItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        activateItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        
        waitForObject(":Bills of Materials.New_QPushButton");
        clickButton(":Bills of Materials.New_QPushButton");
   
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "TSUB4");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "TSUB5");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", "1");
        waitForObject(":_scrap_XLineEdit");
        type(":_scrap_XLineEdit", "0");
        waitForObject(":Bill of Materials.Save_QPushButton_3");
        clickButton(":Bill of Materials.Save_QPushButton_3");
        waitForObject(":Bill of Materials.Save_QPushButton_2");
        clickButton(":Bill of Materials.Save_QPushButton_2");
        
        
        waitForObject(":Bills of Materials.New_QPushButton");
        clickButton(":Bills of Materials.New_QPushButton");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "TSUB3");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "TSUB4");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", "1");
        waitForObject(":_scrap_XLineEdit");
        type(":_scrap_XLineEdit", "0");
        waitForObject(":Bill of Materials.Save_QPushButton_3");
        clickButton(":Bill of Materials.Save_QPushButton_3");
        waitForObject(":Bill of Materials.Save_QPushButton_2");
        clickButton(":Bill of Materials.Save_QPushButton_2");
        
        
        waitForObject(":Bills of Materials.New_QPushButton");
        clickButton(":Bills of Materials.New_QPushButton");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "TSUB1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "TSUB3");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", "1");
        waitForObject(":_scrap_XLineEdit");
        type(":_scrap_XLineEdit", "0");
        waitForObject(":Bill of Materials.Save_QPushButton_3");
        clickButton(":Bill of Materials.Save_QPushButton_3");
        waitForObject(":Bill of Materials.Save_QPushButton_2");
        clickButton(":Bill of Materials.Save_QPushButton_2");
        
        waitForObject(":Bills of Materials.Close_QPushButton");
        clickButton(":Bills of Materials.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating BOM" + e);
    } 
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_2");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_2", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit");
        type(":_qtyOrdered_XLineEdit", "300");
        type(":_qtyOrdered_XLineEdit", "<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "0");
        type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":_availabilityStack.Create Work Order_QGroupBox");
        if(findObject(":_availabilityStack.Create Work Order_QGroupBox").checked)
            type(":_availabilityStack.Create Work Order_QGroupBox"," ");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating sales order" + e);
    }
    
    
    MRP("+99");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");    
        
        waitForObject(":Order #_HeaderViewItem");
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
            mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==6)
            {
                var Qnty, DispDate, item;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                var d = new Date();
                var CurrentYearFull = d.getFullYear();
                var CurrentMonth = 1+d.getMonth();
                CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
                var CurrentDate = d.getDate();
                CurrentDate = CurrentDate>9?CurrentDate:("0"+CurrentDate);
                var StartDate = CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
               
                if(obj_TreeTopLevelItem.text(4)=="YTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
                  test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
                
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
                
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(3);
                if(obj_TreeTopLevelItem.text(4)=="TSUB3" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
                
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(4);
                if(obj_TreeTopLevelItem.text(4)=="TSUB4" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
                 
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(5);
                
                if(obj_TreeTopLevelItem.text(4)=="TSUB5" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3)&& obj_TreeTopLevelItem.text(8)==StartDate)
                
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    } 
    
    //-----Edit the scheduled date for the Sales order-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        openContextMenu(":_list_XTreeWidget_3", 0, 0, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._soitem_XTreeWidget");
        doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "YTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        findObject(":_schedGroup.XDateEdit_XDateEdit").clear();
        type(":_schedGroup.XDateEdit_XDateEdit", "+10");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in editing scheduled date of sales order" + e);
    }
    
    
    MRP("+99");
    
    //------Verify generated Planned Orders-----
    try
    {        
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");    
        
        waitForObject(":Order #_HeaderViewItem");
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
            mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==6)
            {
                var Qnty, DispDate, item;
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                var d = new Date();
                var CurrentYearFull = d.getFullYear();
                var CurrentMonth = 1+d.getMonth();
                CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
                var CurrentDate = d.getDate();
                CurrentDate = CurrentDate>9?CurrentDate:("0"+CurrentDate);
                var StartDate = CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate;
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="YTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(4) && obj_TreeTopLevelItem.text(8)==getForwardDate(1))
                 
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
              
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
                 
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(3);
                if(obj_TreeTopLevelItem.text(4)=="TSUB3" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
             
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(4);
                if(obj_TreeTopLevelItem.text(4)=="TSUB4" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
              
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(5);
                if(obj_TreeTopLevelItem.text(4)=="TSUB5" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00" && obj_TreeTopLevelItem.text(9)==getForwardDate(3) && obj_TreeTopLevelItem.text(8)==StartDate)
              
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    //------Restore the BOM of TSUB1--------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products");
        activateItem(":xTuple ERP:*_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        activateItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
        waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        activateItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
        
        waitForObject(":Bills of Materials._bom_XTreeWidget");
        doubleClickItem(":Bills of Materials._bom_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
        waitForObjectItem(":frame_2._bomitem_XTreeWidget", "TSUB3");
        clickItem(":frame_2._bomitem_XTreeWidget", "TSUB3", 0, 0, 1, Qt.LeftButton);
        waitForObject(":frame_2.Expire_QPushButton");
        clickButton(":frame_2.Expire_QPushButton");
        waitForObject(":Bill of Materials.Save_QPushButton_2");
        clickButton(":Bill of Materials.Save_QPushButton_2");
        
        waitForObject(":Bills of Materials.Close_QPushButton");
        clickButton(":Bills of Materials.Close_QPushButton");
        test.log("BOM of TSUB1 restored");
    }
    catch(e)
    {
        test.fail("Error in restoring BOM of TSUB1" + e);
    } 
    
    
}
