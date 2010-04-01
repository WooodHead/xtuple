function main()
{
    //-----declarations------
    source(findFile("scripts","functions.js"));
    
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
     //------------Editing the preferences-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
    activateItem(":xTuple ERP:*_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
    activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
    if(object.exists(":Search Navigation.Buttons_QRadioButton"))
    {
    waitForObject(":Interface Options.Show windows inside workspace_QRadioButton");
    if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
    clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
    }
    waitForObject(":User Preferences.Save_QPushButton");
    clickButton(":User Preferences.Save_QPushButton");
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
    activateItem(":xTuple ERP:*_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");   
        
    }
    catch(e)
    {
        test.fail("Error in editing the preferences" + e);
    }
    
    //------Restart the application--
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
    activateItem(":xTuple ERP:*_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    
    
    
    //-------Assign all Privileges------
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
    activateItem(":xTuple ERP:*_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Maintain Users...");
    activateItem(":xTuple ERP:*.System_QMenu", "Maintain Users...");
    waitForObject(":List Users._usr_XTreeWidget");
    doubleClickItem(":List Users._usr_XTreeWidget", "Administrator", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_module_XComboBox");
    for(i = findObject(":_module_XComboBox").count;i>0;i--)
    {
        waitForObject(":_privTab.Add All->>_QPushButton");     
        clickButton(":_privTab.Add All->>_QPushButton");
        waitForObject(":_module_XComboBox");
        type(":_module_XComboBox", "<Down>");
    }
    waitForObject(":List Users.Save_QPushButton");
    clickButton(":List Users.Save_QPushButton");
    waitForObject(":List Users.Close_QPushButton");
    clickButton(":List Users.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in assigning privileges" + e);
    }
    
    
    //------------Editing the preferences-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
    activateItem(":xTuple ERP:*_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
    activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
    if(object.exists(":Search Navigation.Buttons_QRadioButton"))
    {
    waitForObject(":Search Navigation.Buttons_QRadioButton");
    if(!findObject(":Search Navigation.Buttons_QRadioButton").checked)
    clickButton(":Search Navigation.Buttons_QRadioButton");
    }
    waitForObject(":User Preferences.Save_QPushButton");
    clickButton(":User Preferences.Save_QPushButton");
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
    activateItem(":xTuple ERP:*_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");   
        
    }
    catch(e)
    {
        test.fail("Error in editing the preferences" + e);
    }
  
  
     
    //------Remove Application Time out----    
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
    activateItem(":xTuple ERP:*_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
    activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
    waitForObject(":_idleTimeout_QSpinBox");
    findObject(":_idleTimeout_QSpinBox").clear();
    type(":_idleTimeout_QSpinBox", "0");
    waitForObject(":User Preferences.Save_QPushButton");
    clickButton(":User Preferences.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in assigning user preferences" + e);
    }
    
    //-----System Rescan Privileges-    
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
    activateItem(":xTuple ERP:*_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in rescanning privileges" + e);
  }
    
    
        
    MRP("+999");
    MPS("+999");
    
    //--------View Planned Orders----  
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
    
    
    //MRP NO DEMAND / REORDER POINT / SAFETY STOCK TEST    
    test.log("MRP NO DEMAND / REORDER POINT / SAFETY STOCK TEST");
    
    QOHZero("TBOX1");    
    
    //----Setup Item site-----    
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
    waitForObject(":_reorderLevel_XLineEdit");
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
    findObject(":Scheduling._orderGroup_QSpinBox").clear();
    type(":Scheduling._orderGroup_QSpinBox", "7");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
    test.log("Item Site setup for: TBOX1");
    }
    catch(e)
    {
        test.fail("Error in setting up  Item Site of TBOX1" + e);
    } 
    
    MRP("+99");
  
    
    //--------View Planned Orders----        
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
    
    //MRP REORDER POINT TEST   
    test.log("MRP REORDER POINT TEST");
    
    DelPlanOrdrs();
    
    QOHZero("TBOX1");    
    
    //----Setup Item site-----  
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
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "100");
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
    findObject(":Scheduling._orderGroup_QSpinBox").clear();
    type(":Scheduling._orderGroup_QSpinBox", "7");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
    test.log("Item Site setup for: TBOX1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of TBOX1" + e);
    } 
     
    MRP("+99");
   
    //--------Verify generated Planned Orders-----
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
    if(findObject(":frame._planord_XTreeWidget").topLevelItemCount>0)
    {
        if(iNumberOfRootItems==1)
        {
           var Qnty, DispDate, item;
obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            DispDate = obj_TreeTopLevelItem.text(8);
            Qnty = obj_TreeTopLevelItem.text(9);
            item = obj_TreeTopLevelItem.text(4);
           
          
            if(item=="TBOX1" && Qnty=="100.00" && DispDate==getForwardDate(3) && findObject(":frame._planord_XTreeWidget").topLevelItemCount==1)
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

    
    
    //MRP ORDER UP TO TEST
   test.log("MRP ORDER UP TO TEST");
    
    DelPlanOrdrs();
    
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
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "100");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "1000");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling._orderGroup_QSpinBox").clear();
    type(":Scheduling._orderGroup_QSpinBox", "7");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
    test.log("Item Site setup for: TBOX1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of TBOX1" + e);
    }
    
        MRP("+99");
    
    //--------Verify generated Planned Orders-----
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
            DispDate = obj_TreeTopLevelItem.text(8);
            Qnty = obj_TreeTopLevelItem.text(9);
            item = obj_TreeTopLevelItem.text(4);
            

            if(item=="TBOX1" && Qnty=="1,000.00" && DispDate==getForwardDate(3) && findObject(":frame._planord_XTreeWidget").topLevelItemCount==1)
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

    
    //MRP MINIMUM ORDER QUANTITY TEST
   test.log("MRP MINIMUM ORDER QUANTITY TEST");
    
    DelPlanOrdrs();
    
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
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "100");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "1000");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "5000");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "0");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling._orderGroup_QSpinBox").clear();
    type(":Scheduling._orderGroup_QSpinBox", "7");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
    test.log("Item Site setup for: TBOX1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of TBOX1" + e);
    }

    MRP("+99");
    
    //--------Verify generated Planned Orders-----
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
            DispDate = obj_TreeTopLevelItem.text(8);
            Qnty = obj_TreeTopLevelItem.text(9);
            item = obj_TreeTopLevelItem.text(4);
            
           if(item=="TBOX1" && Qnty=="5,000.00" && DispDate==getForwardDate(3) && findObject(":frame._planord_XTreeWidget").topLevelItemCount==1)
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
      
    
    //MRP MAXIMUM ORDER QUANTITY TEST
    test.log("MRP MAXIMUM ORDER QUANTITY TEST");
    DelPlanOrdrs();
    
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
    waitForObject(":_reorderLevel_XLineEdit");
    findObject(":_reorderLevel_XLineEdit").clear();
    type(":_reorderLevel_XLineEdit", "100");
    findObject(":_orderUpToQty_XLineEdit").clear();
    type(":_orderUpToQty_XLineEdit", "1000");
    findObject(":_minimumOrder_XLineEdit").clear();
    type(":_minimumOrder_XLineEdit", "0");
    findObject(":_maximumOrder_XLineEdit").clear();
    type(":_maximumOrder_XLineEdit", "200");
    findObject(":_orderMultiple_XLineEdit").clear();
    type(":_orderMultiple_XLineEdit", "0");
    findObject(":Scheduling._safetyStock_XLineEdit").clear();
    type(":Scheduling._safetyStock_XLineEdit", "0");
    findObject(":Scheduling._orderGroup_QSpinBox").clear();
    type(":Scheduling._orderGroup_QSpinBox", "7");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
    test.log("Item Site setup for: TBOX1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of TBOX1" + e);
    } 
    
    MRP("+99");
    
    
    //--------Verify generated Planned Orders-----
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
        if(iNumberOfRootItems==5)
        {
            var Qnty, DispDate, item;
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            DispDate = obj_TreeTopLevelItem.text(8);
            Qnty = obj_TreeTopLevelItem.text(9);
            item = obj_TreeTopLevelItem.text(4);
            
           for(var i=0;i<5;i++)
            {
                obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && Qnty=="200.00" && DispDate==getForwardDate(3))
                    test.pass("Expected Planned Order generated");
                
                else 
                    test.fail("Incorrect Planned Order generated");
            }
            
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
   
   
   //MRP ORDER MULTIPLE QUANTITY TEST
   test.log("MRP ORDER MULTIPLE QUANTITY TEST");
   
   DelPlanOrdrs();
   
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
   findObject(":_reorderLevel_XLineEdit").clear();
   type(":_reorderLevel_XLineEdit", "100");
   findObject(":_orderUpToQty_XLineEdit").clear();
   type(":_orderUpToQty_XLineEdit", "1000");
   findObject(":_minimumOrder_XLineEdit").clear();
   type(":_minimumOrder_XLineEdit", "0");
   findObject(":_maximumOrder_XLineEdit").clear();
   type(":_maximumOrder_XLineEdit", "0");
   findObject(":_orderMultiple_XLineEdit").clear();
   type(":_orderMultiple_XLineEdit", "33");
   findObject(":Scheduling._safetyStock_XLineEdit").clear();
   type(":Scheduling._safetyStock_XLineEdit", "0");
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   waitForObject(":List Item Sites.Close_QPushButton");
   clickButton(":List Item Sites.Close_QPushButton");
   test.log("Item Site setup for: TBOX1");
   }
    catch(e)
    {
        test.fail("Error in setting up Item Site of TBOX1" + e);
    }
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
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
           

           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="1,023.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
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
 

    //MRP SAFETY STOCK TEST
    test.log("MRP SAFETY STOCK TEST");
    
    DelPlanOrdrs();
    
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
    type(":Scheduling._safetyStock_XLineEdit", "100");
    findObject(":Scheduling._orderGroup_QSpinBox").clear();
    type(":Scheduling._orderGroup_QSpinBox", "7");
    findObject(":_leadTime_QSpinBox").clear();
    type(":_leadTime_QSpinBox", "3");
    waitForObject(":Scheduling.First Group_QCheckBox");
    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
        clickButton(":Scheduling.First Group_QCheckBox");
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
   test.log("Item Site setup for: TBOX1");
   }
    catch(e)
    {
        test.fail("Error in setting up Item Site for TBOX1" + e);
    } 
   
   
   MRP("+99");
 
 
 //--------Verify generated Planned Orders-----
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
         
         
         obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
         if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
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
 
 

   //MRP FIRST GROUP TEST
   test.log("MRP FIRST GROUP TEST");
   
   DelPlanOrdrs();
   
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
   waitForObject(":_reorderLevel_XLineEdit");
   findObject(":_reorderLevel_XLineEdit").clear();
   type(":_reorderLevel_XLineEdit", "100");
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   waitForObject(":List Item Sites.Close_QPushButton");
   clickButton(":List Item Sites.Close_QPushButton");
   test.log("Item Site setup for: TBOX1");
   }
   catch(e)
   {
        test.fail("Error in setting up Item Site of TBOX1" + e);
   }
   
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
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
           
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(7))
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

   
   //MRP PLANNING SYSTEM NONE TEST
   test.log("MRP PLANNING SYSTEM NONE TEST");
   
   SetPlng("TBOX1","None");
   
   DelPlanOrdrs();
   
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
   findObject(":_reorderLevel_XLineEdit").clear();
   type(":_reorderLevel_XLineEdit", "100");
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
   test.log("Item Site setup for: TBOX1");
   }
   catch(e)
   {
        test.fail("Error in setting up Item site of TBOX1" + e);
   }
   
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
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
       test.fail("Incorrect Planned Orders generated");
   else 
       test.pass("No Planned Order generated");
   waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
   clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
   
   
   //MRP ENFORCE ORDER PARAMETERS OFF TEST
   test.log("MRP ENFORCE ORDER PARAMETERS OFF TEST");
   
   SetPlng("TBOX1","MRP");
   
   DelPlanOrdrs();
   
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
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
   findObject(":Scheduling._safetyStock_XLineEdit").clear();
   type(":Scheduling._safetyStock_XLineEdit", "0");
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   waitForObject(":List Item Sites.Close_QPushButton");
   clickButton(":List Item Sites.Close_QPushButton");
   test.log("Item Site setup for: TBOX1");
   }
   catch(e)
   {
        test.fail("Error in setting  up Item Site of TBOX1 " + e);
   }
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
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
       test.fail("Incorrect Planned Orders generated");
   else    
       test.pass("No Planned Order generated");
   waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
   clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }
   catch(e)
   {
        test.fail("Error in viewing planned orders" + e);
   }
    
   
   
   //MRP ENFORCE ORDER PARAMETERS OFF / SAFETY STOCK SET TEST
   test.log("MRP ENFORCE ORDER PARAMETERS OFF / SAFTEY STOCK SET TEST");
   
   SetPlng("TBOX1","MRP");
   
   DelPlanOrdrs();
   DelAllSO();
   
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
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
   findObject(":Scheduling._safetyStock_XLineEdit").clear();
   type(":Scheduling._safetyStock_XLineEdit", "100");
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   waitForObject(":List Item Sites.Close_QPushButton");
   clickButton(":List Item Sites.Close_QPushButton");
   test.log("Item Site setup for: TBOX1");
   }
   catch(e)
   {
        test.fail("Error in setting up Item Site of TBOX1" + e);
   }
   
   
 MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
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
          
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
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
 
   //MRP SUPPLY SIDE NETTING
   test.log("MRP SUPPLY SIDE NETTING");
   
   SetPlng("TBOX1","MRP");
   
   DelPlanOrdrs();
   DelAllSO();
   
   QOHZero("TBOX1");
   
   DelAllPO();
   
   newPO("TBOX1",50,0)
   
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
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       type(":_planningTab.Enforce Order Parameters_QGroupBox"," ");
   findObject(":_reorderLevel_XLineEdit").clear();
   type(":_reorderLevel_XLineEdit", "100");
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   waitForObject(":List Item Sites.Close_QPushButton");
   clickButton(":List Item Sites.Close_QPushButton");
   test.log("Item Site setup for: TBOX1");
   }
   catch(e)
   {
        test.fail("Error in setting up Item site of TBOX1" + e);
   }
   
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
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
         
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="50.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
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
 
 
   //MRP DEMAND SIDE NETTING - SALES ORDER
   test.log("MRP DEMAND SIDE NETTING - SALES ORDER");
   
   SetPlng("TBOX1","MRP");
   DelPlanOrdrs();
   QOHZero("TBOX1");
   DelAllPO();
   CheckSaleable("TBOX1");
   NewSO("TBOX1",500);   
   
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
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
   findObject(":_reorderLevel_XLineEdit").clear();
   type(":_reorderLevel_XLineEdit", "100");
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   waitForObject(":List Item Sites.Close_QPushButton");
   clickButton(":List Item Sites.Close_QPushButton");
   test.log("Item Site setup for: TBOX1");
   }
   catch(e)
   {
        test.fail("Error in setting up Item Site of TBOX1" + e);
   }
           
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
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
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="600.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
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
   waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
   activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   test.log("Item Site setup for: TSUB1");
   }
   catch(e)
   {
        test.fail("Error in setting up Item site of TSUB1" + e);
   }
   
   
   //----Setup Item site------   
   try
   {        
   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
   findObject(":_reorderLevel_XLineEdit").clear();
   type(":_reorderLevel_XLineEdit", "100");
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
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
        test.fail("Error in setting up Item Site of TBOX1" + e);
   }
   
   
   NewWO("TSUB1",300,0,0)
   
   
   MRP("+99");

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
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="400.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
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
   waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
   activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");

   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   }
   catch(e)
   {
        test.fail("Error in setting up Item Site of TSUB1" + e);
   }
   
   
   //----Setup Item site------   
   try
   {
   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
   findObject(":_reorderLevel_XLineEdit").clear();
   type(":_reorderLevel_XLineEdit", "100");
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
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
        test.fail("Error in setting up Item Site of TBOX1" + e);
   }
   
   
   NewWO("TSUB1",350,0,0);
   
   MRP("+99");

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
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="520.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
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
   
   waitForObject(":List Items._item_XTreeWidget");
   doubleClickItem(":List Items._item_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
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
   waitForObject(":List Items.Close_QPushButton");
   clickButton(":List Items.Close_QPushButton");
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
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
    waitForObject(":Bill of Materials.Save_QPushButton_2");
    clickButton(":Bill of Materials.Save_QPushButton_2");
    waitForObject(":Bills of Materials.Close_QPushButton");
    clickButton(":Bills of Materials.Close_QPushButton");
    }
   catch(e)
   {
        test.fail("Error in changing UOM of TBOX1" + e);
   }
   
   
   NewWO("TSUB1",300,0,0)

   
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
   doubleClickItem(":_itemSite_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   }
   catch(e)
   {
        test.fail("Error in setting up Item Site of TSUB1" + e);
   }
   
   //----Setup Item site------   
   try
   {
   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
   findObject(":_reorderLevel_XLineEdit").clear();
   type(":_reorderLevel_XLineEdit", "100");
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
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
        test.fail("Error in setting up Item Site of TBOX1" + e);
   }
   
   MRP("+99");
   
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
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="700.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
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
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
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
          
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(4))
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
 
 
   //MRP DEMAND SIDE NETTING – FIRM PLANNED WORK ORDER
   test.log("MRP DEMAND SIDE NETTING – FIRM PLANNED WORK ORDER");
   
   DelPlanOrdrs();
   QOHZero("TBOX1");
   DelAllWO();
   NewScheduledWO("TSUB1",200,"+10",0);
   FirmPlndOrder();
   MRP("+99");

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
           var Qnty, DispDate, item;
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           var d = new Date();
           var CurrentYearFull = d.getFullYear();
           var CurrentMonth = 1+d.getMonth();
           CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
            var CurrentDate = d.getDate();
            var StartDate = CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate;
                      
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(10) )
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3))
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(4))
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
   waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
   activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");

   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "YTRUCK1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
   if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
   clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   }
   catch(e)
   {
        test.fail("Error in setting up Item Site of YTRUCK1"+ e);
   }
   
   
   try
   {
   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
   if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
   findObject(":_leadTime_QSpinBox").clear();
   type(":_leadTime_QSpinBox", "3");
   waitForObject(":Scheduling.First Group_QCheckBox");
   if(!findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   }
   catch(e)
   {
        test.fail("Error in setting up Item site of TSUB1" + e);
   }
   
   
   try
   {
   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").enabled && findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
   waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox");
   if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox").checked)
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
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
   findObject(":Scheduling._orderGroup_QSpinBox").clear();
   type(":Scheduling._orderGroup_QSpinBox", "7");
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
        test.fail("Error in setting up Item Site of TSUB1" + e);
   }
   
   NewSO("YTRUCK1",200);
   
   MRP("+99");
 
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
          
           
           if(obj_TreeTopLevelItem.text(4)=="YTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           

           obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
           if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");

           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
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
   
    waitForObjectItem(":List Items._item_XTreeWidget", "TSUB1");
    clickItem(":List Items._item_XTreeWidget", "TSUB1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Items.Copy_QPushButton");
    clickButton(":List Items.Copy_QPushButton");
    waitForObject(":List Items.Copy Bill of Materials_QCheckBox");
    clickButton(":List Items.Copy Bill of Materials_QCheckBox");
    waitForObject(":_targetItemNumber_XLineEdit");
    type(":_targetItemNumber_XLineEdit", "TSUB2");
    waitForObject(":List Items.Copy_QPushButton_2");
    clickButton(":List Items.Copy_QPushButton_2");
    waitForObject(":List Items.Yes_QPushButton");
    clickButton(":List Items.Yes_QPushButton");
    
    waitForObject(":List Items.Site can manufacture this Item_QGroupBox");
    mouseClick(":List Items.Site can manufacture this Item_QGroupBox", 18, 9, 0, Qt.LeftButton);
    snooze(0.5);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
    if(!findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
    waitForObjectItem(":_warehouse_WComboBox", "WH1");
    clickItem(":_warehouse_WComboBox", "WH1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox" );
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 0, 0, 1, Qt.LeftButton);
    clickTab(":List Items.qt_tabwidget_tabbar_QTabBar", "Planning");
   
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_2");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_2").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    waitForObject(":_reorderLevel_XLineEdit_2");
    findObject(":_reorderLevel_XLineEdit_2").clear();
    type(":_reorderLevel_XLineEdit_2", "0");
    findObject(":_orderUpToQty_XLineEdit_2").clear();
    type(":_orderUpToQty_XLineEdit_2", "0");
    findObject(":_minimumOrder_XLineEdit_2").clear();
    type(":_minimumOrder_XLineEdit_2", "0");
    findObject(":_maximumOrder_XLineEdit_2").clear();
    type(":_maximumOrder_XLineEdit_2", "0");
    findObject(":_orderMultiple_XLineEdit_2").clear();
    type(":_orderMultiple_XLineEdit_2", "0");
    waitForObject(":Scheduling._planningType_XComboBox_2");
    if(findObject(":Scheduling._planningType_XComboBox_2").currentText!="MRP")
        type(":Scheduling._planningType_XComboBox_2", "MRP");
    findObject(":Scheduling._safetyStock_XLineEdit_2").clear();
    type(":Scheduling._safetyStock_XLineEdit_2", "0");
    findObject(":Scheduling._safetyStock_XLineEdit_2").clear();
    type(":Scheduling._safetyStock_XLineEdit_2","0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_3").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_3","7");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_4").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_4","3");
    if(!findObject(":Scheduling.First Group_QCheckBox_2").checked)
        clickButton(":Scheduling.First Group_QCheckBox_2");
    waitForObject(":List Items.Save_QPushButton");
    clickButton(":List Items.Save_QPushButton");
    waitForObject(":List Items.Cancel_QPushButton");
    clickButton(":List Items.Cancel_QPushButton");
   
    
    waitForObjectItem(":List Items._item_XTreeWidget", "TSUB1");
    clickItem(":List Items._item_XTreeWidget", "TSUB1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Items.Copy_QPushButton");
    clickButton(":List Items.Copy_QPushButton");
    waitForObject(":List Items.Copy Bill of Materials_QCheckBox");
    clickButton(":List Items.Copy Bill of Materials_QCheckBox");
    waitForObject(":_targetItemNumber_XLineEdit");
    type(":_targetItemNumber_XLineEdit", "TSUB3");
    waitForObject(":List Items.Copy_QPushButton_2");
    clickButton(":List Items.Copy_QPushButton_2");
    waitForObject(":List Items.Yes_QPushButton");
    clickButton(":List Items.Yes_QPushButton");
    waitForObject(":List Items.Site can manufacture this Item_QGroupBox");
    mouseClick(":List Items.Site can manufacture this Item_QGroupBox", 18, 9, 0, Qt.LeftButton);
    snooze(0.5);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
    if(!findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
    waitForObjectItem(":_warehouse_WComboBox", "WH1");
    clickItem(":_warehouse_WComboBox", "WH1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox" );
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 0, 0, 1, Qt.LeftButton);
    clickTab(":List Items.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_2");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_2").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    waitForObject(":_reorderLevel_XLineEdit_2");
    findObject(":_reorderLevel_XLineEdit_2").clear();
    type(":_reorderLevel_XLineEdit_2", "0");
    findObject(":_orderUpToQty_XLineEdit_2").clear();
    type(":_orderUpToQty_XLineEdit_2", "0");
    findObject(":_minimumOrder_XLineEdit_2").clear();
    type(":_minimumOrder_XLineEdit_2", "0");
    findObject(":_maximumOrder_XLineEdit_2").clear();
    type(":_maximumOrder_XLineEdit_2", "0");
    findObject(":_orderMultiple_XLineEdit_2").clear();
    type(":_orderMultiple_XLineEdit_2", "0");

    waitForObject(":Scheduling._planningType_XComboBox_2");
    if(findObject(":Scheduling._planningType_XComboBox_2").currentText!="MRP")
        type(":Scheduling._planningType_XComboBox_2", "MRP");
    findObject(":Scheduling._safetyStock_XLineEdit_2").clear();
    type(":Scheduling._safetyStock_XLineEdit_2", "0");
    findObject(":Scheduling._safetyStock_XLineEdit_2").clear();
    type(":Scheduling._safetyStock_XLineEdit_2","0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_3").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_3","7");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_4").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_4","3");
    if(!findObject(":Scheduling.First Group_QCheckBox_2").checked)
        clickButton(":Scheduling.First Group_QCheckBox_2");

    waitForObject(":List Items.Save_QPushButton");
    clickButton(":List Items.Save_QPushButton");
    waitForObject(":List Items.Cancel_QPushButton");
    clickButton(":List Items.Cancel_QPushButton");
    
    waitForObjectItem(":List Items._item_XTreeWidget", "TSUB1");
    clickItem(":List Items._item_XTreeWidget", "TSUB1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Items.Copy_QPushButton");
    clickButton(":List Items.Copy_QPushButton");
    waitForObject(":List Items.Copy Bill of Materials_QCheckBox");
    clickButton(":List Items.Copy Bill of Materials_QCheckBox");
    waitForObject(":_targetItemNumber_XLineEdit");
    type(":_targetItemNumber_XLineEdit", "TSUB4");
    waitForObject(":List Items.Copy_QPushButton_2");
    clickButton(":List Items.Copy_QPushButton_2");
    waitForObject(":List Items.Yes_QPushButton");
    clickButton(":List Items.Yes_QPushButton");   
    waitForObject(":List Items.Site can manufacture this Item_QGroupBox");
    mouseClick(":List Items.Site can manufacture this Item_QGroupBox", 18, 9, 0, Qt.LeftButton);
    snooze(0.5);
    waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
    if(!findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
        clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
    waitForObjectItem(":_warehouse_WComboBox", "WH1");
    clickItem(":_warehouse_WComboBox", "WH1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox" );
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 0, 0, 1, Qt.LeftButton);
    clickTab(":List Items.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_2");
    if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_2").checked)
        type(":_planningTab.Enforce Order Parameters_QGroupBox_2"," ");
    waitForObject(":_reorderLevel_XLineEdit_2");
    findObject(":_reorderLevel_XLineEdit_2").clear();
    type(":_reorderLevel_XLineEdit_2", "0");
    findObject(":_orderUpToQty_XLineEdit_2").clear();
    type(":_orderUpToQty_XLineEdit_2", "0");
    findObject(":_minimumOrder_XLineEdit_2").clear();
    type(":_minimumOrder_XLineEdit_2", "0");
    findObject(":_maximumOrder_XLineEdit_2").clear();
    type(":_maximumOrder_XLineEdit_2", "0");
    findObject(":_orderMultiple_XLineEdit_2").clear();
    type(":_orderMultiple_XLineEdit_2", "0");
    
    waitForObject(":Scheduling._planningType_XComboBox_2");
    if(findObject(":Scheduling._planningType_XComboBox_2").currentText!="MRP")
        type(":Scheduling._planningType_XComboBox_2", "MRP");
    findObject(":Scheduling._safetyStock_XLineEdit_2").clear();
    type(":Scheduling._safetyStock_XLineEdit_2", "0");
    findObject(":Scheduling._safetyStock_XLineEdit_2").clear();
    type(":Scheduling._safetyStock_XLineEdit_2","0");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_3").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_3","7");
    findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_4").clear();
    type(":Scheduling.qt_spinbox_lineedit_QLineEdit_4","3");
    if(!findObject(":Scheduling.First Group_QCheckBox_2").checked)
        clickButton(":Scheduling.First Group_QCheckBox_2");
    waitForObject(":List Items.Save_QPushButton");
    clickButton(":List Items.Save_QPushButton");
    waitForObject(":List Items.Cancel_QPushButton");
    clickButton(":List Items.Cancel_QPushButton");
    
    waitForObject(":List Items.Close_QPushButton");
    clickButton(":List Items.Close_QPushButton");
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
    waitForObject(":_itemGroup...._QPushButton_12");
    clickButton(":_itemGroup...._QPushButton_12");
    waitForObject(":_listTab_XTreeWidget_12");
    doubleClickItem(":_listTab_XTreeWidget_12", "TSUB3", 0, 0, 0, Qt.LeftButton);
    waitForObject(":frame_2.New_QPushButton");
    clickButton(":frame_2.New_QPushButton");
    waitForObject(":Bill of Materials...._QPushButton_3");
    clickButton(":Bill of Materials...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget_13");
    doubleClickItem(":_listTab_XTreeWidget_13", "TSUB4", 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyPer_XLineEdit");
    type(":_qtyPer_XLineEdit", "1");
    waitForObject(":_scrap_XLineEdit");
    type(":_scrap_XLineEdit", "0");
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
    waitForObject(":Bill of Materials.Save_QPushButton_2");
    clickButton(":Bill of Materials.Save_QPushButton_2");
    
    
    waitForObject(":Bills of Materials.New_QPushButton");
    clickButton(":Bills of Materials.New_QPushButton");
   waitForObject(":_itemGroup...._QPushButton_12");
    clickButton(":_itemGroup...._QPushButton_12");
    waitForObject(":_listTab_XTreeWidget_12");
    doubleClickItem(":_listTab_XTreeWidget_12", "TSUB2", 0, 0, 0, Qt.LeftButton);
    waitForObject(":frame_2.New_QPushButton");
    clickButton(":frame_2.New_QPushButton");
    waitForObject(":Bill of Materials...._QPushButton_3");
    clickButton(":Bill of Materials...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget_13");
    doubleClickItem(":_listTab_XTreeWidget_13", "TSUB3", 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyPer_XLineEdit");
    type(":_qtyPer_XLineEdit", "1");
    waitForObject(":_scrap_XLineEdit");
    type(":_scrap_XLineEdit", "0");
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
    waitForObject(":Bill of Materials.Save_QPushButton_2");
    clickButton(":Bill of Materials.Save_QPushButton_2");

    
    waitForObject(":Bills of Materials.New_QPushButton");
    clickButton(":Bills of Materials.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton_12");
    clickButton(":_itemGroup...._QPushButton_12");
    waitForObject(":_listTab_XTreeWidget_12");
    doubleClickItem(":_listTab_XTreeWidget_12", "TSUB1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":frame_2.New_QPushButton");
    clickButton(":frame_2.New_QPushButton");
    waitForObject(":Bill of Materials...._QPushButton_3");
    clickButton(":Bill of Materials...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget_13");
    doubleClickItem(":_listTab_XTreeWidget_13", "TSUB2", 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyPer_XLineEdit");
    type(":_qtyPer_XLineEdit", "1");
    waitForObject(":_scrap_XLineEdit");
    type(":_scrap_XLineEdit", "0");
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
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
    
    waitForObject(":frame.New_QPushButton");
    clickButton(":frame.New_QPushButton");
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
    doubleClickItem(":_listTab_XTreeWidget_8", "YTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "300");
    type(":_qtyOrdered_XLineEdit", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "0");
    type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Supply");
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
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
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
            
            if(obj_TreeTopLevelItem.text(4)=="YTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
            if(obj_TreeTopLevelItem.text(4)=="TSUB2" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(3);
            if(obj_TreeTopLevelItem.text(4)=="TSUB3" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(4);
            if(obj_TreeTopLevelItem.text(4)=="TSUB4" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(5);
            if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3)&& obj_TreeTopLevelItem.text(7)==StartDate)
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
  
    //-----Edit the scheduled date for the Sales order-----
    try
    {
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    waitForObject(":frame._so_XTreeWidget");
    type(":frame._so_XTreeWidget", " ");
    waitForObject(":frame.Edit_QPushButton");
    clickButton(":frame.Edit_QPushButton");
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
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
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
            if(obj_TreeTopLevelItem.text(4)=="YTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(4) && obj_TreeTopLevelItem.text(7)==getForwardDate(1))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
            if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
            if(obj_TreeTopLevelItem.text(4)=="TSUB2" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(3);
            if(obj_TreeTopLevelItem.text(4)=="TSUB3" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
                        obj_TreeTopLevelItem = obj_TreeRootItem.child(4);
            if(obj_TreeTopLevelItem.text(4)=="TSUB4" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
            
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(5);
            if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(3) && obj_TreeTopLevelItem.text(7)==StartDate)
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
    waitForObjectItem(":frame_2._bomitem_XTreeWidget", "TSUB2");
    clickItem(":frame_2._bomitem_XTreeWidget", "TSUB2", 0, 0, 1, Qt.LeftButton);
    waitForObject(":frame_2.Expire_QPushButton");
    clickButton(":frame_2.Expire_QPushButton");
    waitForObject(":_itemGroup.Show Expired Components_QCheckBox");
    clickButton(":_itemGroup.Show Expired Components_QCheckBox");
    waitForObject(":frame_2._bomitem_XTreeWidget");
    doubleClickItem(":frame_2._bomitem_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Effectivity.XDateEdit_XDateEdit");
    findObject(":Effectivity.XDateEdit_XDateEdit").clear();
    waitForObject(":Effectivity.XDateEdit_XDateEdit");
    type(":Effectivity.XDateEdit_XDateEdit", "-1");
    waitForObject(":Effectivity.XDateEdit_XDateEdit_2");
    type(":Effectivity.XDateEdit_XDateEdit_2", "Never");
    type(":Effectivity.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
    waitForObject(":frame_2._bomitem_XTreeWidget");
    doubleClickItem(":frame_2._bomitem_XTreeWidget", "TINSERT1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Effectivity.XDateEdit_XDateEdit");
    findObject(":Effectivity.XDateEdit_XDateEdit").clear();
    waitForObject(":Effectivity.XDateEdit_XDateEdit");
    type(":Effectivity.XDateEdit_XDateEdit", "-1");
    waitForObject(":Effectivity.XDateEdit_XDateEdit_2");
    type(":Effectivity.XDateEdit_XDateEdit_2", "Never");
    waitForObject(":Effectivity.XDateEdit_XDateEdit_2");
    type(":Effectivity.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
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

