function main()
{
        //-----declarations------
    source(findFile("scripts","functions.js"));
    
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 

    DelPlanOrdrs();
    DelAllWO();
    DelAllSO();
    DelAllPO();
    
    QOHZero("TBOX1");
    
    MRP("+999");
    MPS("+999");

    //--------View Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    


    waitForObject(":frame._planord_XTreeWidget");
    if((findObject(":frame._planord_XTreeWidget").topLevelItemCount)==0)
        test.pass("No Planned Order generated");
    else test.fail("Planned Order generated");
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
  
  waitForObject(":_number_QLineEdit");
  type(":_number_QLineEdit", "BTRUCK-TEST");
  waitForObject(":_descrip_QLineEdit");
  type(":_descrip_QLineEdit", "BTRUCK-TEST");
  waitForObject(":_warehouse_WComboBox_2");
  if(findObject(":_warehouse_WComboBox_2").currentText!="WH1")
      clickItem(":_warehouse_WComboBox_2", "WH1", 0, 0, 1, Qt.LeftButton);
  waitForObject(":_schedtype_QComboBox");
  if(findObject(":_schedtype_QComboBox").currentText!="Forecast Netted to MPS")
      clickItem(":_schedtype_QComboBox", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
  waitForObject(":List Production Plans.XDateEdit_XDateEdit");
  type(":List Production Plans.XDateEdit_XDateEdit", "-30");
  waitForObject(":List Production Plans.XDateEdit_XDateEdit_2");
  type(":List Production Plans.XDateEdit_XDateEdit_2", "+120");
  type(":List Production Plans.XDateEdit_XDateEdit_2", "<Tab>");
  waitForObject(":frame.New_QPushButton_2");
  clickButton(":frame.New_QPushButton_2");
    
 waitForObject(":List Production Plans...._QPushButton_2");
  clickButton(":List Production Plans...._QPushButton_2");
  waitForObject(":_listTab_XTreeWidget_14");
  doubleClickItem(":_listTab_XTreeWidget_14", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
  waitForObject(":List Production Plans.XDateEdit_XDateEdit_3");
  type(":List Production Plans.XDateEdit_XDateEdit_3", "+21");
  waitForObject(":List Production Plans.XDateEdit_XDateEdit_3");
  type(":List Production Plans.XDateEdit_XDateEdit_3", "<Tab>");
  waitForObject(":List Production Plans._qty_XLineEdit");
  type(":List Production Plans._qty_XLineEdit", "100");
  waitForObject(":List Production Plans.Save_QPushButton");
  clickButton(":List Production Plans.Save_QPushButton");
  waitForObject(":List Production Plans.Save_QPushButton_2");
  clickButton(":List Production Plans.Save_QPushButton_2");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
  
        if((findObject(":frame._planord_XTreeWidget").topLevelItemCount)==0)
            test.pass("No Planned Order generated");
        else test.fail("Planned Order generated");
        waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
        clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "150");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
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
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="150.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
   waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
   clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu",  "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");

    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
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
            
            
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
   waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
  clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObject(":_schedtype_QComboBox");
    if(findObject(":_schedtype_QComboBox").currentText!="Forecast Reporting")
        clickItem(":_schedtype_QComboBox", "Forecast Reporting", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");

    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    waitForObject(":frame._planord_XTreeWidget");
    if((findObject(":frame._planord_XTreeWidget").topLevelItemCount)==0)
        test.pass("No Planned Order generated");
    else test.fail("Planned Order generated");
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObject(":_schedtype_QComboBox");
    if(findObject(":_schedtype_QComboBox").currentText!="Forecast Netted to MPS")
        clickItem(":_schedtype_QComboBox", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    snooze(2);
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    snooze(1);
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "200");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    snooze(0.5);
    waitForObject(":Order #_HeaderViewItem");
   
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
 
    if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
       
     mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
      
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
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
            
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==getForwardDate(0))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "200");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "250");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
 
    waitForObject(":Order #_HeaderViewItem");
   
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
 
    if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
       
     mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==2)
        {
            var Qnty, DispDate, item;
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="250.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==getForwardDate(0))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");


        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "150");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    

    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
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
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "50");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    waitForObject(":Order #_HeaderViewItem");
   
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
  
    if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
      
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==2)
        {
            var Qnty, DispDate, item;
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "33");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            var Qnty, DispDate, item;
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="132.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "50");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    waitForObject(":Order #_HeaderViewItem");
  
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    var a=findObject(":_planord.Col1_QModelIndex").text;
    var b=findObject(":_planord.Col2_QModelIndex").text;
    
          
   
    if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
       
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==3)
        {
            var Qnty, DispDate, item;
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==getForwardDate(0))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(22) && obj_TreeTopLevelItem.text(7)==getForwardDate(19))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "200");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    waitForObject(":Order #_HeaderViewItem");
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==2)
        {
            var Qnty, DispDate, item;
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(1) && obj_TreeTopLevelItem.text(7)==getForwardDate(0))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling._planningType_XComboBox");
    if(findObject(":Scheduling._planningType_XComboBox").currentText!="None")
        clickItem(":Scheduling._planningType_XComboBox", "None", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "200");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
     
      
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems==0)
        test.pass("No Planned Orders generated");
    else test.fail("Incorrect Planned generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
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
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling._planningType_XComboBox");
    if(findObject(":Scheduling._planningType_XComboBox").currentText!="MPS")
        clickItem(":Scheduling._planningType_XComboBox", "MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
  
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {

            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
  
    //MPS – PLAN STATUS “R” - ORDER PARAMETERS OFF & SAFETY STOCK SET TEST
    test.log("MPS – PLAN STATUS “R” - ORDER PARAMETERS OFF & SAFETY STOCK SET TEST");
    
    DelPlanOrdrs();
    
    //----Setup Item site------
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling._planningType_XComboBox");
    if(findObject(":Scheduling._planningType_XComboBox").currentText!="MPS")
        clickItem(":Scheduling._planningType_XComboBox", "MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "50");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
   waitForObject(":Order #_HeaderViewItem");
   
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    snooze(0.5);
 
    if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
       
     mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==2)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(1) && obj_TreeTopLevelItem.text(7)==getForwardDate(0))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
    
    
  
    //MPS – SUPPLY SIDE NETTING - QOH
    test.log("MPS – SUPPLY SIDE NETTING - QOH");
    
    DelPlanOrdrs();
    
    UpdateQOH("BTRUCK1",50);
    

    //----Setup Item site------
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling._planningType_XComboBox");
    if(findObject(":Scheduling._planningType_XComboBox").currentText!="MPS")
        clickItem(":Scheduling._planningType_XComboBox", "MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_5").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_5","1");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
  
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="50.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
  
    //MPS – SUPPLY SIDE NETTING – QOH – CUMULATIVE MPS
    test.log("MPS – SUPPLY SIDE NETTING – QOH – CUMULATIVE MPS");
    
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
    waitForObject(":_schedtype_QComboBox");
    if(findObject(":_schedtype_QComboBox").currentText!="Cumulative MPS")
        clickItem(":_schedtype_QComboBox", "Cumulative MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
    waitForObject(":List Production Plans.Close_QPushButton");
    clickButton(":List Production Plans.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in set up of production plan" + e);
   }
    
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
  
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
  
  //MPS – SUPPLY SIDE NETTING – WORK ORDER
    test.log("MPS – SUPPLY SIDE NETTING – WORK ORDER");
    
    DelPlanOrdrs();
    
    NewWO("BTRUCK1",25,0,0);
    
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
    waitForObject(":_schedtype_QComboBox");
    if(findObject(":_schedtype_QComboBox").currentText!="Forecast Netted to MPS")
        clickItem(":_schedtype_QComboBox", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
    waitForObject(":List Production Plans.Close_QPushButton");
    clickButton(":List Production Plans.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in set up of production plan" + e);
   }
    
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
  
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="25.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }

    //MPS – SUPPLY SIDE NETTING – WORK ORDER – CUMULATIVE MPS
    test.log("MPS – SUPPLY SIDE NETTING – WORK ORDER – CUMULATIVE MPS");
    
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
    waitForObject(":_schedtype_QComboBox");
    if(findObject(":_schedtype_QComboBox").currentText!="Cumulative MPS")
        clickItem(":_schedtype_QComboBox", "Cumulative MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
    waitForObject(":List Production Plans.Close_QPushButton");
    clickButton(":List Production Plans.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in set up of production plan" + e);
   }
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
  
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
  
    //MPS – SUPPLY SIDE NETTING – PURCHASE ORDER
    test.log("MPS – SUPPLY SIDE NETTING – PURCHASE ORDER");
    
    DelPlanOrdrs();
    
    newPO("BTRUCK1", 10, 0);
    
    
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
    waitForObject(":_schedtype_QComboBox");
    if(findObject(":_schedtype_QComboBox").currentText!="Forecast Netted to MPS")
        clickItem(":_schedtype_QComboBox", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
    waitForObject(":List Production Plans.Close_QPushButton");
    clickButton(":List Production Plans.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in set up of production plan" + e);
   }
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
 
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="15.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
  
    
   //MPS – SUPPLY SIDE NETTING – PURCHASE ORDER – CUMULATIVE MPS
    test.log("MPS – SUPPLY SIDE NETTING – PURCHASE ORDER – CUMULATIVE MPS");
    
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
    waitForObject(":_schedtype_QComboBox");
    if(findObject(":_schedtype_QComboBox").currentText!="Cumulative MPS")
        clickItem(":_schedtype_QComboBox", "Cumulative MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
    waitForObject(":List Production Plans.Close_QPushButton");
    clickButton(":List Production Plans.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in set up of production plan" + e);
   }
    
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
  
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
  
    //MPS – SUPPLY SIDE NETTING – TRANSFER ORDER
    test.log("MPS – SUPPLY SIDE NETTING – TRANSFER ORDER");
    
    //---Create Item Site----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObjectItem(":_itemSite_XTreeWidget", "BTRUCK1");
    clickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_frame.Copy_QPushButton");
    clickButton(":_frame.Copy_QPushButton");
    waitForObjectItem(":_warehouse_WComboBox_3", "WH2");
    clickItem(":_warehouse_WComboBox_3", "WH2", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in creating Item site" + e);
   }
    
 
    //---Create and Release the TO------
   try
   {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
    waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Transfer Order_QMenu", "New...");
    
    waitForObject(":Transfer Order.*_QLabel");
    var TO = findObject(":Transfer Order.*_QLabel").text;
    waitForObjectItem(":_srcWhs_WComboBox_2", "WH2");
    clickItem(":_srcWhs_WComboBox_2", "WH2", 0, 0, 1, Qt.LeftButton);
    waitForObject(":Transfer Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Transfer Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_3");
    clickButton(":_lineItemsPage.New_QPushButton_3");
    waitForObject(":_itemGroup...._QPushButton_10");
    clickButton(":_itemGroup...._QPushButton_10");
    waitForObject(":_listTab_XTreeWidget_10");
    doubleClickItem(":_listTab_XTreeWidget_10", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "5");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit");
    type(":_dateGroup.XDateEdit_XDateEdit", "0");
    type(":_dateGroup.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Transfer Order.Save_QPushButton");
    clickButton(":Transfer Order.Save_QPushButton");
    waitForObject(":Transfer Order.Close_QPushButton");
    clickButton(":Transfer Order.Close_QPushButton");
    waitForObject(":Transfer Order.Save_QPushButton_2");
    clickButton(":Transfer Order.Save_QPushButton_2");
    waitForObject(":Transfer Order.Cancel_QPushButton");
    clickButton(":Transfer Order.Cancel_QPushButton");
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
    waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
    activateItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
    waitForObject(":Source Site:.All Sites_QRadioButton");
    clickButton(":Source Site:.All Sites_QRadioButton");
    waitForObjectItem(":_frame._to_XTreeWidget", "WH2");
    clickItem(":_frame._to_XTreeWidget", TO, 0, 0, 1, Qt.LeftButton);
    waitForObject(":_frame.Release_QPushButton");
    clickButton(":_frame.Release_QPushButton");
    waitForObject(":List Open Transfer Orders.Close_QPushButton");
    clickButton(":List Open Transfer Orders.Close_QPushButton");
    }
   catch(e)
   {
        
        test.fail("Error in creating and releasing transfer order" + e);
   }
    
    
    //-----Set Schedule Type for Production Plan----
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
    waitForObject(":_schedtype_QComboBox");
    if(findObject(":_schedtype_QComboBox").currentText!="Forecast Netted to MPS")
        clickItem(":_schedtype_QComboBox", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
    waitForObject(":List Production Plans.Close_QPushButton");
    clickButton(":List Production Plans.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in set up of production plan" + e);
   }
    
    MPS("+150");

    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="10.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
  
  //MPS – DEMAND SIDE NETTING – SALES ORDER, INSIDE TIME FENCE
    test.log("MPS – DEMAND SIDE NETTING – SALES ORDER, INSIDE TIME FENCE");
    DelAllSO();
    DelAllTO();
    DelAllPO();
    DelAllWO();
    DelPlanOrdrs();    
    QOHZero("BTRUCK1");
    
    //--------Change Schedule date of Production Plan Item------
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
    waitForObject(":_list_XTreeWidget");
    doubleClickItem(":_list_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":List Production Plans.XDateEdit_XDateEdit_3");
    findObject(":List Production Plans.XDateEdit_XDateEdit_3").clear();
    type(":List Production Plans.XDateEdit_XDateEdit_3", "+7");
    type(":List Production Plans.XDateEdit_XDateEdit_3", "<Tab>");
    waitForObject(":List Production Plans.Save_QPushButton");
    clickButton(":List Production Plans.Save_QPushButton");
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
    waitForObject(":List Production Plans.Close_QPushButton");
    clickButton(":List Production Plans.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in set up of production plan" + e);
   }
    
    //---Change the Time Fence----
   try
   {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":Scheduling._mpsTimeFence_QSpinBox");
    findObject(":Scheduling._mpsTimeFence_QSpinBox").clear();
    type(":Scheduling._mpsTimeFence_QSpinBox", "14");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
   }
   
    //-----Create Sales Order-----
   try
   {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu", "New...");
    
    waitForObject(":_headerPage...._QPushButton");
    clickButton(":_headerPage...._QPushButton");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
     waitForObject(":_itemGroup...._QPushButton_8");
    clickButton(":_itemGroup...._QPushButton_8");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "75");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+7");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Sales Order.Save_QPushButton");
    clickButton(":Sales Order.Save_QPushButton");
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":Sales Order.Cancel_QPushButton");
    clickButton(":Sales Order.Cancel_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in create sales orders" + e);
   }
    
    MPS("+150");

    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
        
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="75.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(7) && obj_TreeTopLevelItem.text(7)==getForwardDate(4))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
    
  

    //MPS – DEMAND SIDE NETTING – S/O, OUTSIDE TIME FENCE < FORECAST
    test.log("MPS – DEMAND SIDE NETTING – S/O, OUTSIDE TIME FENCE < FORECAST");
    
    DelPlanOrdrs();
    
    
    //---Change the Time Fence----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":Scheduling._mpsTimeFence_QSpinBox");
    findObject(":Scheduling._mpsTimeFence_QSpinBox").clear();
    type(":Scheduling._mpsTimeFence_QSpinBox", "5");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(7) && obj_TreeTopLevelItem.text(7)==getForwardDate(4))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
   
    
    // MPS – DEMAND SIDE NETTING – S/O, OUTSIDE TIME FENCE > FORECAST
    test.log("MPS – DEMAND SIDE NETTING – S/O, OUTSIDE TIME FENCE > FORECAST");
    
    DelPlanOrdrs();
    DelAllSO();
    
     //-----Create Sales Order-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu", "New...");
    
    waitForObject(":_headerPage...._QPushButton");
    clickButton(":_headerPage...._QPushButton");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
     waitForObject(":_itemGroup...._QPushButton_8");
    clickButton(":_itemGroup...._QPushButton_8");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "125");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+7");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Sales Order.Save_QPushButton");
    clickButton(":Sales Order.Save_QPushButton");
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":Sales Order.Cancel_QPushButton");
    clickButton(":Sales Order.Cancel_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in creating sales order" + e);
   }
        
    MPS("+150");

    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==1)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="125.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(7) && obj_TreeTopLevelItem.text(7)==getForwardDate(4))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }        
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
  
    //MPS – TIME PHASED PRODUCTION SCHEDULE LINES
    test.log("MPS – TIME PHASED PRODUCTION SCHEDULE LINES");
    
    DelPlanOrdrs();
    
    DelAllSO();
    
    //-------Add Items to the Production Plan----
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
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":List Production Plans...._QPushButton_2");
    clickButton(":List Production Plans...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_14");
    doubleClickItem(":_listTab_XTreeWidget_14", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":List Production Plans.XDateEdit_XDateEdit_3");
    type(":List Production Plans.XDateEdit_XDateEdit_3", "+21");
    waitForObject(":List Production Plans.XDateEdit_XDateEdit_3");
    type(":List Production Plans.XDateEdit_XDateEdit_3", "<Tab>");
    waitForObject(":List Production Plans._qty_XLineEdit");
    type(":List Production Plans._qty_XLineEdit", "200");
    waitForObject(":List Production Plans.Save_QPushButton");
    clickButton(":List Production Plans.Save_QPushButton");
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":List Production Plans...._QPushButton_2");
    clickButton(":List Production Plans...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_14");
    doubleClickItem(":_listTab_XTreeWidget_14", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":List Production Plans.XDateEdit_XDateEdit_3");
    type(":List Production Plans.XDateEdit_XDateEdit_3", "+35");
    waitForObject(":List Production Plans.XDateEdit_XDateEdit_3");
    type(":List Production Plans.XDateEdit_XDateEdit_3", "<Tab>");
    waitForObject(":List Production Plans._qty_XLineEdit");
    type(":List Production Plans._qty_XLineEdit", "300");
    waitForObject(":List Production Plans.Save_QPushButton");
    clickButton(":List Production Plans.Save_QPushButton");
    
    waitForObject(":List Production Plans.Save_QPushButton_2");
    clickButton(":List Production Plans.Save_QPushButton_2");
    waitForObject(":List Production Plans.Close_QPushButton");
    clickButton(":List Production Plans.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in set up of Production plan" + e);
   }
  
    //---Change the Time Fence----
   try
   {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":Scheduling._mpsTimeFence_QSpinBox");
    findObject(":Scheduling._mpsTimeFence_QSpinBox").clear();
    type(":Scheduling._mpsTimeFence_QSpinBox", "1");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
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
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    waitForObject(":Order #_HeaderViewItem");
   
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
   
    if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
       
       mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==3)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(7) && obj_TreeTopLevelItem.text(7)==getForwardDate(4))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(35) && obj_TreeTopLevelItem.text(7)==getForwardDate(32))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            
        }        
        else test.fail("Incorrect Planned Order generated");
        
    }        
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
    
    //MPS – TIME PHASED PRODUCTION SCHEDULE LINES – NETTED TO W/O
    test.log("MPS – TIME PHASED PRODUCTION SCHEDULE LINES – NETTED TO W/O");
    
    DelPlanOrdrs();
    
    NewWO("BTRUCK1",250, 0, "+14");
    
    MPS("+150");

    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    waitForObject(":Order #_HeaderViewItem");
   
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
   
    if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
      
     mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==2)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(7) && obj_TreeTopLevelItem.text(7)==getForwardDate(4))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="250.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(35) && obj_TreeTopLevelItem.text(7)==getForwardDate(32))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
        }        
        else test.fail("Incorrect Planned Order generated");
        
    }        
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
  
    //MPS/MRP – TIME PHASED PRODUCTION SCHEDULE LINES – NETTED TO W/O
    test.log("MPS/MRP – TIME PHASED PRODUCTION SCHEDULE LINES – NETTED TO W/O");
    
    DelPlanOrdrs();
    
    UpdateQOH("TBODY1",2323);
    UpdateQOH("YPAINT1",2323);
    UpdateQOH("TWHEEL1",2323);
    UpdateQOH("TINSERT1",2323);
    QOHZero("TSUB1");
    QOHZero("TBOX1");

    
    //----Setup Item site------
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling._planningType_XComboBox");
    if(findObject(":Scheduling._planningType_XComboBox").currentText!="MRP")
        clickItem(":Scheduling._planningType_XComboBox", "MRP", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling._planningType_XComboBox");
    if(findObject(":Scheduling._planningType_XComboBox").currentText!="MRP")
        clickItem(":Scheduling._planningType_XComboBox", "MRP", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "0");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "0");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit","1");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");

    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in setting up Item site of TSUB1" + e);
   } 
    
    //Prepare the DB for DRP scenarios execution
    UpdateQOHWh("TWHEEL1",24000,"WH1");

    
    MPS("+150");
    
    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    waitForObject(":Order #_HeaderViewItem");
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
   if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==2)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(7) && obj_TreeTopLevelItem.text(7)==getForwardDate(4))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="250.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(35) && obj_TreeTopLevelItem.text(7)==getForwardDate(32))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
        }        
        else test.fail("Incorrect Planned Order generated");
        
    }        
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
    
     MRP("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Down>");
    type(":xTuple ERP:*.Schedule_QMenu", "<Right>");
    type(":xTuple ERP:*.Reports_QMenu", "<Right>");
    type(":xTuple ERP:*.Planned Orders_QMenu", "<Return>");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    
   
    waitForObject(":Order #_HeaderViewItem");
   
    mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
   
    if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
       
       mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    if(iNumberOfRootItems>0)
    {
        if(iNumberOfRootItems==8)
        {
            
              obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(7) && obj_TreeTopLevelItem.text(7)==getForwardDate(4))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="250.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(35) && obj_TreeTopLevelItem.text(7)==getForwardDate(32))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
            if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(4) && obj_TreeTopLevelItem.text(7)==getForwardDate(1))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(3);
            if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="250.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(14) && obj_TreeTopLevelItem.text(7)==getForwardDate(11))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(4);
            if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="250.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(32) && obj_TreeTopLevelItem.text(7)==getForwardDate(29))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            obj_TreeTopLevelItem = obj_TreeRootItem.child(5);
            if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==getForwardDate(0))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");

            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(6);
            if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(9)=="250.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(11) && obj_TreeTopLevelItem.text(7)==getForwardDate(8))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(7);
            if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(9)=="250.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(29) && obj_TreeTopLevelItem.text(7)==getForwardDate(26))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
        }        
        else test.fail("Incorrect Planned Order generated");
        
    }        
    else test.fail("No Planned Order generated");   
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
 }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
    

    
}//end main

