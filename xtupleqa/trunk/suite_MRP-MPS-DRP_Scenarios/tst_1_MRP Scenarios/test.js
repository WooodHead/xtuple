    function main()
    {
        //-----declarations------
        source(findFile("scripts","functions.js"));
        
        loginAppl("CONFIGURE");
        
        
        //------Remove Application Time out----    
        try
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
            activateItem(":xTuple ERP:*_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
            activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
            if(!(findObject(":Interface Options.Tabbed Windows_QRadioButton").checked))
            {
                clickButton(":Interface Options.Tabbed Windows_QRadioButton");
                if((findObject(":Notice.Remind me about this again._QCheckBox").checked))
                    clickButton(":Notice.Remind me about this again._QCheckBox");
                snooze(0.5);
                waitForObject(":Notice.OK_QPushButton");
                clickButton(":Notice.OK_QPushButton");
            }
            waitForObject(":_idleTimeout_QSpinBox");
            findObject(":_idleTimeout_QSpinBox").clear();
            type(":_idleTimeout_QSpinBox", "0");
            waitForObject(":User Preferences.Save_QPushButton_2");
            clickButton(":User Preferences.Save_QPushButton_2");
            
        }
        catch(e)
        {
            test.fail("Error in assigning user preferences" + e);
        }
          
        //-------Uncheck Enforce site calendar--------
        try
        {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Setup...");
         if((findObject(":_stack.Enforce Site Calendar for Planning and Orders_QCheckBox").checked))
            {
             clickButton(":_stack.Enforce Site Calendar for Planning and Orders_QCheckBox");
         }
        
        waitForObject(":Bill of Materials.Save_QPushButton_3");
        clickButton(":Bill of Materials.Save_QPushButton_3");
        }
        catch(e)
        {
            test.fail("Error in uncheck Enforce site calendar" + e);
        }
        
        //--------Exiting the application------
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
            snooze(1);
            activateItem(":xTuple ERP:*.System_QMenu", "Maintain Users...");
            snooze(2);
            waitForObject(":List Users._usr_XTreeWidget");
            snooze(1);
            doubleClickItem(":List Users._usr_XTreeWidget", "Administrator", 5, 5, 0, Qt.LeftButton);
            snooze(1);
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
        
        
      
    //    MRP("+999");
        MRPbyItem("TBOX1","WH1","+99");
        MPS("+999");
        
        //--------View Planned Orders----  
        try
        {
            
            waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
            activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
            waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
            activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
            if(object.exists(":_filterGroup.Manage_QPushButton"))
                waitForObject(":Planned Orders.More_QToolButton");
            clickButton(":Planned Orders.More_QToolButton");
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
            test.log("Item Site setup for: TBOX1");
        }
        catch(e)
        {
            test.fail("Error in setting up  Item Site of TBOX1" + e);
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
            test.fail("Error in setting up Item Site of TBOX1" + e);
        } 
        
    //    MRP("+99");
        MRPbyItem("TBOX1","WH1","+99");
        
        //--------Verify generated Planned Orders-----
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
                if(findObject(":_list_XTreeWidget_10").topLevelItemCount>0)
                {
                if(iNumberOfRootItems==1)
                {
                    var Qnty, DispDate, item;
                    obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                    DispDate = obj_TreeTopLevelItem.text(8);
                    Qnty = obj_TreeTopLevelItem.text(9);
                    item = obj_TreeTopLevelItem.text(4);
                    
                    
                    if(item=="TBOX1" && Qnty=="100.00" && findObject(":_list_XTreeWidget_10").topLevelItemCount==1)
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
            
            waitForObject(":_reorderLevel_XLineEdit_4");
            findObject(":_reorderLevel_XLineEdit_4").clear();
            type(":_reorderLevel_XLineEdit_4", "100");
            findObject(":_orderUpToQty_XLineEdit_4").clear();
            type(":_orderUpToQty_XLineEdit_4", "1000");
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
            test.fail("Error in setting up Item Site of TBOX1" + e);
        }
        
         MRPbyItem("TBOX1","WH1","+99");
         //MRP("+99");
        
        //--------Verify generated Planned Orders-----
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
                    DispDate = obj_TreeTopLevelItem.text(8);
                    Qnty = obj_TreeTopLevelItem.text(9);
                    item = obj_TreeTopLevelItem.text(4);
                    
                    
                    if(item=="TBOX1" && Qnty=="1,000.00" && findObject(":_list_XTreeWidget_10").topLevelItemCount==1)
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
            
            waitForObject(":_reorderLevel_XLineEdit_4");
            findObject(":_reorderLevel_XLineEdit_4").clear();
            type(":_reorderLevel_XLineEdit_4", "100");
            findObject(":_orderUpToQty_XLineEdit_4").clear();
            type(":_orderUpToQty_XLineEdit_4", "1000");
            findObject(":_minimumOrder_XLineEdit_4").clear();
            type(":_minimumOrder_XLineEdit_4", "5000");
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
            test.fail("Error in setting up Item Site of TBOX1" + e);
        }
        
    //    MRP("+99");
        MRPbyItem("TBOX1","WH1","+99");
        
        //--------Verify generated Planned Orders-----
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
                    DispDate = obj_TreeTopLevelItem.text(8);
                    Qnty = obj_TreeTopLevelItem.text(9);
                    item = obj_TreeTopLevelItem.text(4);
                    
                    if(item=="TBOX1" && Qnty=="5,000.00" && findObject(":_list_XTreeWidget_10").topLevelItemCount==1)
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
            
            waitForObject(":_reorderLevel_XLineEdit_4");
            findObject(":_reorderLevel_XLineEdit_4").clear();
            type(":_reorderLevel_XLineEdit_4", "100");
            findObject(":_orderUpToQty_XLineEdit_4").clear();
            type(":_orderUpToQty_XLineEdit_4", "1000");
            findObject(":_minimumOrder_XLineEdit_4").clear();
            type(":_minimumOrder_XLineEdit_4", "0");
            findObject(":_maximumOrder_XLineEdit_4").clear();
            type(":_maximumOrder_XLineEdit_4", "200");
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
            test.fail("Error in setting up Item Site of TBOX1" + e);
        }
        
    //    MRP("+99");
        MRPbyItem("TBOX1","WH1","+99");
        
        //--------Verify generated Planned Orders-----
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
                        if(obj_TreeTopLevelItem.text(4)=="TBOX1" && Qnty=="200.00")
                            test.pass("Expected Planned Order generated");
                        
                        else 
                            test.fail("Incorrect Planned Order generated");
                    }
                    
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
            
            waitForObject(":_reorderLevel_XLineEdit_4");
            findObject(":_reorderLevel_XLineEdit_4").clear();
            type(":_reorderLevel_XLineEdit_4", "100");
            findObject(":_orderUpToQty_XLineEdit_4").clear();
            type(":_orderUpToQty_XLineEdit_4", "1000");
            findObject(":_minimumOrder_XLineEdit_4").clear();
            type(":_minimumOrder_XLineEdit_4", "0");
            findObject(":_maximumOrder_XLineEdit_4").clear();
            type(":_maximumOrder_XLineEdit_4", "0");
            findObject(":_orderMultiple_XLineEdit_4").clear();
            type(":_orderMultiple_XLineEdit_4", "33");
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
            test.fail("Error in setting up Item Site of TBOX1" + e);
        }
        
    //    MRP("+99");
        MRPbyItem("TBOX1","WH1","+99");
        
        
        //--------Verify generated Planned Orders-----
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
                    if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="1,023.00")
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
            type(":Scheduling._safetyStock_XLineEdit_4", "100");
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
            test.fail("Error in setting up Item Site of TBOX1" + e);
        }
        
    //    MRP("+99");
        MRPbyItem("TBOX1","WH1","+99");
        
        //--------Verify generated Planned Orders-----
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
                    if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00")
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
            if(findObject(":Scheduling.First Group_QCheckBox_4").checked)
                clickButton(":Scheduling.First Group_QCheckBox_4");
            waitForObject(":Item Sites.Save_QPushButton");
            clickButton(":Item Sites.Save_QPushButton");
            waitForObject(":Item Sites.Close_QToolButton");
            clickButton(":Item Sites.Close_QToolButton");
            test.log("Item Site setup for: TBOX1");
        }
        catch(e)
        {
            test.fail("Error in setting up Item Site of TBOX1" + e);
        }
        
    //    MRP("+99");
        MRPbyItem("TBOX1","WH1","+99");
        
        //--------Verify generated Planned Orders-----
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
                    
                    if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00")
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
            findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
            type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
            waitForObject(":Item Sites.Save_QPushButton");
            clickButton(":Item Sites.Save_QPushButton");
            waitForObject(":Item Sites.Close_QToolButton");
            clickButton(":Item Sites.Close_QToolButton");
            test.log("Item Site setup for: TBOX1");
        }
        catch(e)
        {
            test.fail("Error in setting up Item Site of TBOX1" + e);
        }
        
    //    MRP("+99");
        MRPbyItem("TBOX1","WH1","+99");
        
        //--------Verify generated Planned Orders-----
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
                test.fail("Incorrect Planned Orders generated");
            else 
                test.pass("No Planned Order generated");
            waitForObject(":Planned Orders.Close_QToolButton");
            clickButton(":Planned Orders.Close_QToolButton");
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
            
            waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
            if(findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
                type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
            
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
        
        
        //--------Verify generated Planned Orders-----
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
                test.fail("Incorrect Planned Orders generated");
            else    
                test.pass("No Planned Order generated");
            waitForObject(":Planned Orders.Close_QToolButton");
            clickButton(":Planned Orders.Close_QToolButton");
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
            
            findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
            type(":Scheduling._safetyStock_XLineEdit_4", "100");
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
        
        
        //--------Verify generated Planned Orders-----
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
                    if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00")
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
                    if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="50.00")
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
        
        
    } 

