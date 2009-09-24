function main()
{
        //-----declarations------
    source(findFile("scripts","functions.js"));
    
    
    //-----Log into Applicaiton---    
    var set = testData.dataset("login.tsv");
    var url, db, port, pwd,realname,username;
    db=pwd=port=url=realname=username="";
    var userrole="CONFIGURE";
    for(var records in set)
    {
        url=testData.field(set[records],"HOST");
        db=testData.field(set[records],"DB");
        port=testData.field(set[records],"PORT");
        pwd=testData.field(set[records],"PASSWORD");
        role=testData.field(set[records],"ROLE");
        username=testData.field(set[records],"USERNAME");
        realname=testData.field(set[records],"REALNAME");
        if(userrole==role) break;
              
    }

    if(userrole!=role)
    {
        test.fatal("Please enter user details in login.tsv for the role: "+userrole);
        exit(1);
    }
      
    waitForObject(":Log In.Options..._QPushButton");
    clickButton(":Log In.Options..._QPushButton");
    waitForObject(":_server_QLineEdit");
    if(findObject(":_server_QLineEdit").text!= url)
    {
        findObject(":_server_QLineEdit").text=url;
        test.log("URL Changed to: "+url);
    }
    if(findObject(":_database_QLineEdit").text!=db)
    {
        findObject(":_database_QLineEdit").text=db;
        test.log("Database Changed to: "+db);
    }
    if(findObject(":_port_QLineEdit").text!=port)
    {
        findObject(":_port_QLineEdit").text=port;
        test.log("Port Changed to:" + port);
    }
    clickButton(":Login Options.Save_QPushButton");
    waitForObject(":_username_QLineEdit");    
    type(":_username_QLineEdit", username);
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", pwd);
    waitForObject(":Log In.Login_QPushButton");
    clickButton(":Log In.Login_QPushButton");
    test.log("Logged in Application");


    DelPlanOrdrs();
    DelAllWO();
    DelAllSO();
    DelAllPO();
    
    QOHZero("TBOX1");
    
    MRP("+999");
    MPS("+999");
    
    //--------View Planned Orders-----
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

 
    //----Setup Item site------
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
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

    //------Create Production Plan---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
    waitForObjectItem(":xTuple ERP:*.Production Plan_QMenu", "List...");
    activateItem(":xTuple ERP:*.Production Plan_QMenu", "List...");
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
    waitForObject(":List Production Plans...._QPushButton");
    clickButton(":List Production Plans...._QPushButton");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
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

    MPS("+150");

    //--------View Planned Orders-----
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
    
    
    //MPS – PLAN STATUS “U” - REORDER POINT TEST
    test.log("MPS – PLAN STATUS “U” - REORDER POINT TEST");
    DelPlanOrdrs();
    DelAllSO();
    DelAllPO();
    DelAllWO();
    DelAllTO();
    
    
    
    //----Setup Item site------
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
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
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
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
            var ExptdDate = CurrentDate+3;
            ExptdDate = ExptdDate>9?ExptdDate:("0"+ExptdDate);
            var DueDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
            CurrentDate = CurrentDate>9?CurrentDate:("0"+CurrentDate);
            var StartDate = CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate;
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(2)=="W/O" && obj_TreeTopLevelItem.text(9)=="150.00" && obj_TreeTopLevelItem.text(8)==DueDate && obj_TreeTopLevelItem.text(7)==StartDate)
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
   waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
   clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   
   
   //MPS – PLAN STATUS “R”
   test.log("MPS – PLAN STATUS “R”");
   
   DelPlanOrdrs();
   
   //----Release Production Plan-------
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
   waitForObjectItem(":xTuple ERP:*.Production Plan_QMenu", "List...");
   activateItem(":xTuple ERP:*.Production Plan_QMenu", "List...");
   waitForObject(":_list_XTreeWidget_2");
   type(":_list_XTreeWidget_2"," ");
   waitForObject(":_list_XTreeWidget_2");
   sendEvent("QContextMenuEvent", ":_list_XTreeWidget_2", QContextMenuEvent.Keyboard, 0, 0, 0);
   waitForObject(":xTuple ERP:*._menu_QMenu");
   type(":xTuple ERP:*._menu_QMenu", "<Down>");    
   waitForObject(":xTuple ERP:*._menu_QMenu");
   type(":xTuple ERP:*._menu_QMenu", "<Return>");
   waitForObject(":List Production Plans.Close_QPushButton");
   clickButton(":List Production Plans.Close_QPushButton");

   MPS("+150");
    
   
   
    //------Verify generated Planned Orders-----
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
            if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(2)=="W/O" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==getForwardDate(21) && obj_TreeTopLevelItem.text(7)==getForwardDate(18))
                test.pass("Expected Planned Order generated");
            else 
                test.fail("Incorrect Planned Order generated");
        }
        else test.fail("Incorrect Planned Order generated");
    }    
    else test.fail("No Planned Order generated");   
   waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
   clickButton(":Planned Orders by Planner Code.Close_QPushButton");

   
   //MPS – PLAN STATUS “R” - TYPE – FORECAST REPORTING
   test.log("MPS – PLAN STATUS “R” - TYPE – FORECAST REPORTING");
   
   DelPlanOrdrs();
   
   
       waitForObject(":_schedtype_QComboBox");
    if(findObject(":_schedtype_QComboBox").currentText!="Forecast Netted to MPS")
        clickItem(":_schedtype_QComboBox", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);

    
    //-------Set Schedule Type for Production Plan----
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
    waitForObjectItem(":xTuple ERP:*.Production Plan_QMenu", "List...");
    activateItem(":xTuple ERP:*.Production Plan_QMenu", "List...");
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
