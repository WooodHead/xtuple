function main()
{
    //-----declarations------
    source(findFile("scripts","functions.js"));
    
    
    //-----Log into Applicaiton--- 
    loginAppl("CONFIGURE");
    
    DelPlanOrdrs();
    DelAllWO();
    DelAllSO();
    DelAllPO();
    
    QOHZero("TBOX1");
    MRP("+99");
    MPS("+999");
  
    //--------View Planned Orders-----
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
        if((findObject(":_list_XTreeWidget_10").topLevelItemCount)==0)
            test.pass("No Planned Order generated");
        else test.fail("Planned Order generated");
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
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
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
    } 
    
    
   //------Create Production Plan---------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":List Production Plans.New_QPushButton");
        clickButton(":List Production Plans.New_QPushButton");
        
        waitForObject(":_number_QLineEdit_2");
        type(":_number_QLineEdit_2", "BTRUCK-TEST");
        waitForObject(":_descrip_QLineEdit_2");
        type(":_descrip_QLineEdit_2", "BTRUCK-TEST");
        waitForObject(":_warehouse_WComboBox_7");
        if(findObject(":_warehouse_WComboBox_7").currentText!="WH1")
            clickItem(":_warehouse_WComboBox_7", "WH1", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_schedtype_QComboBox_2");
        if(findObject(":_schedtype_QComboBox_2").currentText!="Forecast Netted to MPS")
            clickItem(":_schedtype_QComboBox_2", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Production Plan.XDateEdit_XDateEdit");
        type(":Production Plan.XDateEdit_XDateEdit", "-30");
        waitForObject(":Production Plan.XDateEdit_XDateEdit_2");
        type(":Production Plan.XDateEdit_XDateEdit_2", "+120");
        type(":Production Plan.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":frame.New_QPushButton_3");
        clickButton(":frame.New_QPushButton_3");
        waitForObject(":Production Plan Item.ItemLineEdit_ItemLineEdit");
        type(":Production Plan Item.ItemLineEdit_ItemLineEdit", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Production Plan Item.XDateEdit_XDateEdit");
        type(":Production Plan Item.XDateEdit_XDateEdit", "+21");
        waitForObject(":Production Plan Item.XDateEdit_XDateEdit");
        type(":Production Plan Item.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Production Plan Item._qty_XLineEdit");
        type(":Production Plan Item._qty_XLineEdit", "100");
        waitForObject(":Production Plan Item.Save_QPushButton");
        clickButton(":Production Plan Item.Save_QPushButton");
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");
//        waitForObject(":Production Plan_XMainWindow");
//        sendEvent("QCloseEvent", ":Production Plan_XMainWindow");
        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating a production plan" + e);
    }
    
    
    MPS("+150");
    
    //--------View Planned Orders-----
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
        
        
        if((findObject(":_list_XTreeWidget_10").topLevelItemCount)==0)
            test.pass("No Planned Order generated");
        else test.fail("Planned Order generated");
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    } 
    
    
    //MPS – PLAN STATUS “U” - REORDER POINT TEST
    test.log("MPS – PLAN STATUS “U” - REORDER POINT TEST");
    
    DelPlanOrdrs();
    DelAllSO();
    DelAllPO();
    DelAllWO();
    DelAllTO();
    
    
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "150");
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
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of BTRUCK1" + e);
    }
    
    
    MPS("+150");
    
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
                var d = new Date();
                var CurrentYearFull = d.getFullYear();
                var CurrentMonth = 1+d.getMonth();
                CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
                var CurrentDate = d.getDate();
                CurrentDate = CurrentDate>9?CurrentDate:("0"+CurrentDate);
                var StartDate = CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate;
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                var assign1 = obj_TreeTopLevelItem.text(4);
                var assign2 = obj_TreeTopLevelItem.text(1);
                var assign3 = obj_TreeTopLevelItem.text(9);
                var assign4 = obj_TreeTopLevelItem.text(8)
                var assign5 = obj_TreeTopLevelItem.text(7)
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="150.00")
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
    
    //MPS – PLAN STATUS “R”
    test.log("MPS – PLAN STATUS “R”");
    
    DelPlanOrdrs();
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
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
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
    }
    
    
    //----Release Production Plan-------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_list_XTreeWidget_2");
        type(":_list_XTreeWidget_2"," ");   
        waitForObject(":_list_XTreeWidget_2");
        clickItem(":_list_XTreeWidget_2","BTRUCK-TEST",0,0,1,Qt.LeftButton);
        sendEvent("QContextMenuEvent", ":_list_XTreeWidget_2", QContextMenuEvent.Keyboard, 0, 0, 0);
        waitForObject(":xTuple ERP:*._menu_QMenu");
        type(":xTuple ERP:*._menu_QMenu", "<Down>");    
        waitForObject(":xTuple ERP:*._menu_QMenu");
        type(":xTuple ERP:*._menu_QMenu", "<Return>");
        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in releasing production plan" + e);
    }
    
    MPS("+150");
    
    
    
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
                a = obj_TreeTopLevelItem.text(4);
                b = obj_TreeTopLevelItem.text(1);
                c = obj_TreeTopLevelItem.text(9);
                d = getForwardDate(21);
                e = getForwardDate(18);
                
                
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00")
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
    
    //MPS – PLAN STATUS “R” - TYPE – FORECAST REPORTING
    test.log("MPS – PLAN STATUS “R” - TYPE – FORECAST REPORTING");
    
    DelPlanOrdrs();
    
    //-------Set Schedule Type for Production Plan----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
        waitForObject(":_schedtype_QComboBox_2");
        if(findObject(":_schedtype_QComboBox_2").currentText!="Forecast Reporting")
            clickItem(":_schedtype_QComboBox_2", "Forecast Reporting", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");

        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in set up of production plan" + e);
    } 
    
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
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
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
    }
    
    
    MPS("+150");
    
    //--------View Planned Orders-----
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
        if((findObject(":_list_XTreeWidget_10").topLevelItemCount)==0)
            test.pass("No Planned Order generated");
        else test.fail("Planned Order generated");
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    //MPS – PLAN STATUS “R” - REORDER POINT TEST
    test.log("MPS – PLAN STATUS “R” - REORDER POINT TEST");
    
    //-------Set Schedule Type for Production Plan----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
        waitForObject(":_schedtype_QComboBox_2");
        if(findObject(":_schedtype_QComboBox_2").currentText!="Forecast Netted to MPS")
            clickItem(":_schedtype_QComboBox_2", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");
    
        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in set up of production plan" + e);
    }
    
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "200");
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
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of BTRUCK1" + e);
    }
    
    
    MPS("+150");
    
    
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
        
        if(findObject(":_planord.Col1_QModelIndex").text > findObject(":_planord.Col2_QModelIndex").text)
            
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
                var as1= obj_TreeTopLevelItem.text(7);
                var as2= obj_TreeTopLevelItem.text(8);
                var as3= getForwardDate(3);
                var as4= getForwardDate(0);
                
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="200.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00")
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
    
    
    //MPS – PLAN STATUS “R” - ORDER UP TO TEST
    test.log("MPS – PLAN STATUS “R” - ORDER UP TO TEST");
    
    DelPlanOrdrs();
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "200");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "250");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
        
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
    } 
    
    
    MPS("+150");
    
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
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="250.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00")
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
    
    //MPS – PLAN STATUS “R” - MINIMUM ORDER QTY TEST
    test.log("MPS – PLAN STATUS “R” - MINIMUM ORDER QTY TEST");
    
    
    DelPlanOrdrs();
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
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
        type(":_minimumOrder_XLineEdit_4", "150");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
    }
    
    
    MPS("+150");
    
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
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="150.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
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
    
    
    //MPS – PLAN STATUS “R” - MAXIMUM ORDER QTY TEST
    test.log("MPS – PLAN STATUS “R” - MAXIMUM ORDER QTY TEST");
    
    DelPlanOrdrs();
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
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
        type(":_maximumOrder_XLineEdit_4", "50");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
    }
    
    
    MPS("+150");
    
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
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00")
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
    
    //MPS – PLAN STATUS “R” - ORDER MULTIPLE TEST
    test.log("MPS – PLAN STATUS “R” - ORDER MULTIPLE TEST");
    
    DelPlanOrdrs();
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
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
        type(":_orderMultiple_XLineEdit_4", "33");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
    }
    
    MPS("+150");
    
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
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="132.00")
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
    
    //MPS – PLAN STATUS “R” - SAFETY STOCK TEST
    test.log("MPS – PLAN STATUS “R” - SAFETY STOCK TEST");
    
    DelPlanOrdrs();
    
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
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
        type(":_maximumOrder_XLineEdit_4", "50");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "50");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
    }
    
    
    MPS("+150");
    
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
        var a=findObject(":_planord.Col1_QModelIndex").text;
        var b=findObject(":_planord.Col2_QModelIndex").text;
        
        
        
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
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00")
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
    
    
    //MPS – PLAN STATUS “R” - FIRST GROUP OFF TEST
    test.log("MPS – PLAN STATUS “R” - FIRST GROUP OFF TEST");
    
    DelPlanOrdrs();
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "200");
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
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
    }
    
    MPS("+150");
    
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
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="200.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00")
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
    
    //MPS – PLAN STATUS “R” - PLANNING SYSTEM NONE TEST
    test.log("MPS – PLAN STATUS “R” - PLANNING SYSTEM NONE TEST");
    
    DelPlanOrdrs();
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":Scheduling._planningType_XComboBox_4");
        if(findObject(":Scheduling._planningType_XComboBox_4").currentText!="None")
            clickItem(":Scheduling._planningType_XComboBox_4", "None", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "200");
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
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of BTRUCK1" + e);
    }
    
    MPS("+150");
    
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
        if(iNumberOfRootItems==0)
            test.pass("No Planned Orders generated");
        else test.fail("Incorrect Planned generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
    }
    
    //MPS – PLAN STATUS “R” - ORDER PARAMETERS OFF TEST
    test.log("MPS – PLAN STATUS “R” - ORDER PARAMETERS OFF TEST");
    
    DelPlanOrdrs();
    
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
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":Scheduling._planningType_XComboBox_4");
        if(findObject(":Scheduling._planningType_XComboBox_4").currentText!="MPS")
            clickItem(":Scheduling._planningType_XComboBox_4", "MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of BTRUCK1" + e);
    }
    
    
    MPS("+150");
    
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
        clickButton(":Planned Orders.Query_QToolButton")
                waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00")
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
    
    
    
    
}//end main

