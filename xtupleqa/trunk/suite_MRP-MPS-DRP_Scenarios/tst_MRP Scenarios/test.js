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
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", pwd);
    waitForObject(":Log In.Login_QPushButton");
    clickButton(":Log In.Login_QPushButton");
    test.log("Logged in Application");
    
//    //-------Assign all Privileges-------
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "System");
//    activateItem(":xTuple ERP:*_QMenuBar", "System");
//    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Maintain Users...");
//    activateItem(":xTuple ERP:*.System_QMenu", "Maintain Users...");
//    waitForObject(":List Users._usr_XTreeWidget");
//    doubleClickItem(":List Users._usr_XTreeWidget", "Administrator", 5, 5, 0, Qt.LeftButton);
//    waitForObject(":_module_XComboBox");
//    for(i = findObject(":_module_XComboBox").count;i>0;i--)
//    {
//        waitForObject(":_privTab.Add All->>_QPushButton");     
//        clickButton(":_privTab.Add All->>_QPushButton");
//        waitForObject(":_module_XComboBox");
//        type(":_module_XComboBox", "<Down>");
//    }
//    waitForObject(":List Users.Save_QPushButton");
//    clickButton(":List Users.Save_QPushButton");
//    waitForObject(":List Users.Close_QPushButton");
//    clickButton(":List Users.Close_QPushButton");
//    
//        
//    MRP("+999");
//    MPS("+999");
//    
//    //--------View Planned Orders-----
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    waitForObject(":_warehouse.All Sites_QRadioButton_2");
//    clickButton(":_warehouse.All Sites_QRadioButton_2");
//    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
//    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
//    waitForObject(":frame._planord_XTreeWidget");
//    if((findObject(":frame._planord_XTreeWidget").topLevelItemCount)==0)
//        test.pass("No Planned Order generated");
//    else test.fail("Planned Order generated");
//    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
//    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
//    
//    
//    
//    //MRP NO DEMAND / REORDER POINT / SAFETY STOCK TEST
//    
//    QOHZero("TBOX1");    
//    
//    //----Setup Item site------
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    waitForObject(":_itemSite_XTreeWidget");
//    doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
//    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
//    findObject(":_reorderLevel_XLineEdit").clear();
//    type(":_reorderLevel_XLineEdit", "0");
//    findObject(":_orderUpToQty_XLineEdit").clear();
//    type(":_orderUpToQty_XLineEdit", "0");
//    findObject(":_minimumOrder_XLineEdit").clear();
//    type(":_minimumOrder_XLineEdit", "0");
//    findObject(":_maximumOrder_XLineEdit").clear();
//    type(":_maximumOrder_XLineEdit", "0");
//    findObject(":_orderMultiple_XLineEdit").clear();
//    type(":_orderMultiple_XLineEdit", "0");
//    findObject(":Scheduling._safetyStock_XLineEdit").clear();
//    type(":Scheduling._safetyStock_XLineEdit", "0");
//    findObject(":Scheduling._orderGroup_QSpinBox").clear();
//    type(":Scheduling._orderGroup_QSpinBox", "7");
//    findObject(":_leadTime_QSpinBox").clear();
//    type(":_leadTime_QSpinBox", "3");
//    waitForObject(":Scheduling.First Group_QCheckBox");
//    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
//        clickButton(":Scheduling.First Group_QCheckBox");
//    waitForObject(":List Item Sites.Save_QPushButton");
//    clickButton(":List Item Sites.Save_QPushButton");
//    waitForObject(":List Item Sites.Close_QPushButton");
//    clickButton(":List Item Sites.Close_QPushButton");
//    test.log("Item Site setup for: TBOX1");
//
//    MRP("+99");
//    
//    //--------View Planned Orders-----
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    snooze(0.5);
//    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    snooze(0.5);    
//    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    waitForObject(":_warehouse.All Sites_QRadioButton_2");
//    clickButton(":_warehouse.All Sites_QRadioButton_2");
//    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
//    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
//    waitForObject(":frame._planord_XTreeWidget");
//    if((findObject(":frame._planord_XTreeWidget").topLevelItemCount)==0)
//        test.pass("No Planned Order generated");
//    else test.fail("Planned Order generated");
//    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
//    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
//
//    
//    //MRP REORDER POINT TEST
//    
//    DelPlanOrdrs();
//    
//    QOHZero("TBOX1");    
//    
//    //----Setup Item site------
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    waitForObject(":_itemSite_XTreeWidget");
//    doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
//    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
//    findObject(":_reorderLevel_XLineEdit").clear();
//    type(":_reorderLevel_XLineEdit", "0");
//    findObject(":_orderUpToQty_XLineEdit").clear();
//    type(":_orderUpToQty_XLineEdit", "0");
//    findObject(":_minimumOrder_XLineEdit").clear();
//    type(":_minimumOrder_XLineEdit", "0");
//    findObject(":_maximumOrder_XLineEdit").clear();
//    type(":_maximumOrder_XLineEdit", "0");
//    findObject(":_orderMultiple_XLineEdit").clear();
//    type(":_orderMultiple_XLineEdit", "0");
//    findObject(":Scheduling._safetyStock_XLineEdit").clear();
//    type(":Scheduling._safetyStock_XLineEdit", "0");
//    findObject(":Scheduling._orderGroup_QSpinBox").clear();
//    type(":Scheduling._orderGroup_QSpinBox", "7");
//    findObject(":_leadTime_QSpinBox").clear();
//    type(":_leadTime_QSpinBox", "3");
//    waitForObject(":Scheduling.First Group_QCheckBox");
//    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
//        clickButton(":Scheduling.First Group_QCheckBox");
//    waitForObject(":List Item Sites.Save_QPushButton");
//    clickButton(":List Item Sites.Save_QPushButton");
//    waitForObject(":List Item Sites.Close_QPushButton");
//    clickButton(":List Item Sites.Close_QPushButton");
//    test.log("Item Site setup for: TBOX1");
//
//    MRP("+99");
//    
//    //--------Verify generated Planned Orders-----
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    snooze(0.5);
//    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    snooze(0.5);    
//    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    waitForObject(":_warehouse.All Sites_QRadioButton_2");
//    clickButton(":_warehouse.All Sites_QRadioButton_2");
//    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
//    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
//    
//    waitForObject(":frame._planord_XTreeWidget");
//    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
//    var obj_TreeWidget = findObject(sWidgetTreeControl);
//    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
//    var iNumberOfRootItems = obj_TreeRootItem.childCount();
//    if(iNumberOfRootItems>0)
//    {
//        if(iNumberOfRootItems==1)
//        {
//            var Qnty, DispDate, item;
//            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
//            DispDate = obj_TreeTopLevelItem.text(8);
//            Qnty = obj_TreeTopLevelItem.text(9);
//            item = obj_TreeTopLevelItem.text(4);
//            
//            var d = new Date();
//            var CurrentYearFull = d.getFullYear();
//            var CurrentMonth = 1+d.getMonth();
//            CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
//            var CurrentDate = d.getDate();
//            var ExptdDate = CurrentDate+3;
//            ExptdDate = ExptdDate>9?ExptdDate:("0"+ExptdDate);
//            var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
//            if(item=="TBOX1" && Qnty=="100.00" && DispDate==fdate && findObject(":frame._planord_XTreeWidget").topLevelItemCount==1)
//                test.pass("Expected Planned Order generated");
//            else 
//                test.fail("Incorrect Planned Order generated");
//        }
//        
//        else test.fail("Incorrect Planned Order generated");
//        waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
//        clickButton(":Planned Orders by Planner Code.Close_QPushButton");
//   }    
//    else test.fail("No Planned Order generated");
//
//    
//    
//    //MRP ORDER UP TO TEST
//    
//    DelPlanOrdrs();
//    
//    QOHZero("TBOX1");
//    
//        //----Setup Item site------
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    waitForObject(":_itemSite_XTreeWidget");
//    doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
//    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
//    findObject(":_reorderLevel_XLineEdit").clear();
//    type(":_reorderLevel_XLineEdit", "100");
//    findObject(":_orderUpToQty_XLineEdit").clear();
//    type(":_orderUpToQty_XLineEdit", "1000");
//    findObject(":_minimumOrder_XLineEdit").clear();
//    type(":_minimumOrder_XLineEdit", "0");
//    findObject(":_maximumOrder_XLineEdit").clear();
//    type(":_maximumOrder_XLineEdit", "0");
//    findObject(":_orderMultiple_XLineEdit").clear();
//    type(":_orderMultiple_XLineEdit", "0");
//    findObject(":Scheduling._safetyStock_XLineEdit").clear();
//    type(":Scheduling._safetyStock_XLineEdit", "0");
//    findObject(":Scheduling._orderGroup_QSpinBox").clear();
//    type(":Scheduling._orderGroup_QSpinBox", "7");
//    findObject(":_leadTime_QSpinBox").clear();
//    type(":_leadTime_QSpinBox", "3");
//    waitForObject(":Scheduling.First Group_QCheckBox");
//    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
//        clickButton(":Scheduling.First Group_QCheckBox");
//    waitForObject(":List Item Sites.Save_QPushButton");
//    clickButton(":List Item Sites.Save_QPushButton");
//    waitForObject(":List Item Sites.Close_QPushButton");
//    clickButton(":List Item Sites.Close_QPushButton");
//    test.log("Item Site setup for: TBOX1");
//
//        MRP("+99");
//    
//    //--------Verify generated Planned Orders-----
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    snooze(0.5);
//    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    snooze(0.5);    
//    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    waitForObject(":_warehouse.All Sites_QRadioButton_2");
//    clickButton(":_warehouse.All Sites_QRadioButton_2");
//    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
//    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
//    
//    waitForObject(":frame._planord_XTreeWidget");
//    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
//    var obj_TreeWidget = findObject(sWidgetTreeControl);
//    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
//    var iNumberOfRootItems = obj_TreeRootItem.childCount();
//    if(iNumberOfRootItems>0)
//    {
//        if(iNumberOfRootItems==1)
//        {
//            var Qnty, DispDate, item;
//            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
//            DispDate = obj_TreeTopLevelItem.text(8);
//            Qnty = obj_TreeTopLevelItem.text(9);
//            item = obj_TreeTopLevelItem.text(4);
//            
//            var d = new Date();
//            var CurrentYearFull = d.getFullYear();
//            var CurrentMonth = 1+d.getMonth();
//            CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
//            var CurrentDate = d.getDate();
//            var ExptdDate = CurrentDate+3;
//            ExptdDate = ExptdDate>9?ExptdDate:("0"+ExptdDate);
//            var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
//            if(item=="TBOX1" && Qnty=="1000.00" && DispDate==fdate && findObject(":frame._planord_XTreeWidget").topLevelItemCount==1)
//                test.pass("Expected Planned Order generated");
//            else 
//                test.fail("Incorrect Planned Order generated");
//        }
//        
//        else test.fail("Incorrect Planned Order generated");
//        waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
//        clickButton(":Planned Orders by Planner Code.Close_QPushButton");
//   }    
//    else test.fail("No Planned Order generated");
//
//
//    
//    //MRP MINIMUM ORDER QUANTITY TEST
//    
//    DelPlanOrdrs();
//    
//    QOHZero("TBOX1");
//    
//    //----Setup Item site------
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    waitForObject(":_itemSite_XTreeWidget");
//    doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
//    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
//    findObject(":_reorderLevel_XLineEdit").clear();
//    type(":_reorderLevel_XLineEdit", "100");
//    findObject(":_orderUpToQty_XLineEdit").clear();
//    type(":_orderUpToQty_XLineEdit", "1000");
//    findObject(":_minimumOrder_XLineEdit").clear();
//    type(":_minimumOrder_XLineEdit", "5000");
//    findObject(":_maximumOrder_XLineEdit").clear();
//    type(":_maximumOrder_XLineEdit", "0");
//    findObject(":_orderMultiple_XLineEdit").clear();
//    type(":_orderMultiple_XLineEdit", "0");
//    findObject(":Scheduling._safetyStock_XLineEdit").clear();
//    type(":Scheduling._safetyStock_XLineEdit", "0");
//    findObject(":Scheduling._orderGroup_QSpinBox").clear();
//    type(":Scheduling._orderGroup_QSpinBox", "7");
//    findObject(":_leadTime_QSpinBox").clear();
//    type(":_leadTime_QSpinBox", "3");
//    waitForObject(":Scheduling.First Group_QCheckBox");
//    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
//        clickButton(":Scheduling.First Group_QCheckBox");
//    waitForObject(":List Item Sites.Save_QPushButton");
//    clickButton(":List Item Sites.Save_QPushButton");
//    waitForObject(":List Item Sites.Close_QPushButton");
//    clickButton(":List Item Sites.Close_QPushButton");
//    test.log("Item Site setup for: TBOX1");
//
//    MRP("+99");
//    
//    //--------Verify generated Planned Orders-----
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    snooze(0.5);
//    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    snooze(0.5);    
//    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    waitForObject(":_warehouse.All Sites_QRadioButton_2");
//    clickButton(":_warehouse.All Sites_QRadioButton_2");
//    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
//    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
//    
//    waitForObject(":frame._planord_XTreeWidget");
//    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
//    var obj_TreeWidget = findObject(sWidgetTreeControl);
//    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
//    var iNumberOfRootItems = obj_TreeRootItem.childCount();
//    if(iNumberOfRootItems>0)
//    {
//        if(iNumberOfRootItems==1)
//        {
//            var Qnty, DispDate, item;
//            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
//            DispDate = obj_TreeTopLevelItem.text(8);
//            Qnty = obj_TreeTopLevelItem.text(9);
//            item = obj_TreeTopLevelItem.text(4);
//            
//            var d = new Date();
//            var CurrentYearFull = d.getFullYear();
//            var CurrentMonth = 1+d.getMonth();
//            CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
//            var CurrentDate = d.getDate();
//            var ExptdDate = CurrentDate+3;
//            ExptdDate = ExptdDate>9?ExptdDate:("0"+ExptdDate);
//            var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
//            if(item=="TBOX1" && Qnty=="5000.00" && DispDate==fdate && findObject(":frame._planord_XTreeWidget").topLevelItemCount==1)
//                test.pass("Expected Planned Order generated");
//            else 
//                test.fail("Incorrect Planned Order generated");
//        }
//        
//        else test.fail("Incorrect Planned Order generated");
//        waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
//        clickButton(":Planned Orders by Planner Code.Close_QPushButton");
//   }    
//    else test.fail("No Planned Order generated");
//
//    
//    
//    //MRP MAXIMUM ORDER QUANTITY TEST
//    test.log("MRP MAXIMUM ORDER QUANTITY TEST");
//    DelPlanOrdrs();
//    
//    QOHZero("TBOX1");
//    
//    //----Setup Item site------
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
//    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
//    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
//    waitForObject(":_itemSite_XTreeWidget");
//    doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
//    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
//    findObject(":_reorderLevel_XLineEdit").clear();
//    type(":_reorderLevel_XLineEdit", "100");
//    findObject(":_orderUpToQty_XLineEdit").clear();
//    type(":_orderUpToQty_XLineEdit", "1000");
//    findObject(":_minimumOrder_XLineEdit").clear();
//    type(":_minimumOrder_XLineEdit", "0");
//    findObject(":_maximumOrder_XLineEdit").clear();
//    type(":_maximumOrder_XLineEdit", "200");
//    findObject(":_orderMultiple_XLineEdit").clear();
//    type(":_orderMultiple_XLineEdit", "0");
//    findObject(":Scheduling._safetyStock_XLineEdit").clear();
//    type(":Scheduling._safetyStock_XLineEdit", "0");
//    findObject(":Scheduling._orderGroup_QSpinBox").clear();
//    type(":Scheduling._orderGroup_QSpinBox", "7");
//    findObject(":_leadTime_QSpinBox").clear();
//    type(":_leadTime_QSpinBox", "3");
//    waitForObject(":Scheduling.First Group_QCheckBox");
//    if(!findObject(":Scheduling.First Group_QCheckBox").checked)
//        clickButton(":Scheduling.First Group_QCheckBox");
//    waitForObject(":List Item Sites.Save_QPushButton");
//    clickButton(":List Item Sites.Save_QPushButton");
//    waitForObject(":List Item Sites.Close_QPushButton");
//    clickButton(":List Item Sites.Close_QPushButton");
//    test.log("Item Site setup for: TBOX1");
//
//    MRP("+99");
//    
//    
//    //--------Verify generated Planned Orders-----
//    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
//    snooze(0.5);
//    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
//    snooze(0.5);    
//    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
//    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
//    waitForObject(":_warehouse.All Sites_QRadioButton_2");
//    clickButton(":_warehouse.All Sites_QRadioButton_2");
//    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
//    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
//    
//    waitForObject(":frame._planord_XTreeWidget");
//    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
//    var obj_TreeWidget = findObject(sWidgetTreeControl);
//    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
//    var iNumberOfRootItems = obj_TreeRootItem.childCount();
//    if(iNumberOfRootItems>0)
//    {
//        if(iNumberOfRootItems==5)
//        {
//            var Qnty, DispDate, item;
//            obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
//            DispDate = obj_TreeTopLevelItem.text(8);
//            Qnty = obj_TreeTopLevelItem.text(9);
//            item = obj_TreeTopLevelItem.text(4);
//            
//            var d = new Date();
//            var CurrentYearFull = d.getFullYear();
//            var CurrentMonth = 1+d.getMonth();
//            CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
//            var CurrentDate = d.getDate();
//            var ExptdDate = CurrentDate+3;
//            ExptdDate = ExptdDate>9?ExptdDate:("0"+ExptdDate);
//            var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
//            
//            for(i=0;i<5;j++)
//            {
//                obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
//                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && Qnty=="200.00" && DispDate==fdate)
//                    test.pass("Expected Planned Order generated");
//                else 
//                test.fail("Incorrect Planned Order generated");
//            }
//            
//        }
//        else test.fail("Incorrect Planned Order generated");
//        waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
//        clickButton(":Planned Orders by Planner Code.Close_QPushButton");
//   }    
//   else test.fail("No Planned Order generated");
//   
//   
   
   //MRP ORDER MULTIPLE QUANTITY TEST
   test.log("MRP ORDER MULTIPLE QUANTITY TEST");
   
   DelPlanOrdrs();
   
   QOHZero("TBOX1");
   
   //----Setup Item site------
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
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="1023.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");
 
 
  
   //MRP SAFETY STOCK TEST
   test.log("MRP SAFETY STOCK TEST");
   
   DelPlanOrdrs();
   
   QOHZero("TBOX1");
   
   //----Setup Item site------
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
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");
   
   
  
   //MRP FIRST GROUP TEST
   test.log("MRP FIRST GROUP TEST");
   
   DelPlanOrdrs();
   
   QOHZero("TBOX1");
   
   //----Setup Item site------
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
   if(findObject(":Scheduling.First Group_QCheckBox").checked)
       clickButton(":Scheduling.First Group_QCheckBox");
   waitForObject(":List Item Sites.Save_QPushButton");
   clickButton(":List Item Sites.Save_QPushButton");
   waitForObject(":List Item Sites.Close_QPushButton");
   clickButton(":List Item Sites.Close_QPushButton");
   test.log("Item Site setup for: TBOX1");
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
           var ExptdDate = CurrentDate+7;
           ExptdDate = ExptdDate>9?ExptdDate:("0"+ExptdDate);
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");
   

   
   //MRP PLANNING SYSTEM NONE TEST
   test.log("MRP PLANNING SYSTEM NONE TEST");
   
   SetPlng("TBOX1","None");
   
   DelPlanOrdrs();
   
   QOHZero("TBOX1");
   
   //----Setup Item site------
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
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
   else test.pass("No Planned Order generated");

   
   
   
   //MRP ENFORCE ORDER PARAMETERS OFF TEST
   test.log("MRP ENFORCE ORDER PARAMETERS OFF TEST");
   
   SetPlng("TBOX1","MRP");
   
   DelPlanOrdrs();
   
   QOHZero("TBOX1");
   
   //----Setup Item site------
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
   mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
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
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
   else test.pass("No Planned Order generated");
   
   
   //MRP ENFORCE ORDER PARAMETERS OFF / SAFTEY STOCK SET TEST
   test.log("MRP ENFORCE ORDER PARAMETERS OFF / SAFTEY STOCK SET TEST");
   
   SetPlng("TBOX1","MRP");
   
   DelPlanOrdrs();
   
   QOHZero("TBOX1");
   
   //----Setup Item site------
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
       mouseClick(":_planningTab.Enforce Order Parameters_QGroupBox", 0, 0, 1, Qt.LeftButton);
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
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");
   
   
   //MRP SUPPLY SIDE NETTING
   test.log("MRP SUPPLY SIDE NETTING");
   
   SetPlng("TBOX1","MRP");
   
   DelPlanOrdrs();
   
   QOHZero("TBOX1");
   
   //----Setup Item site------
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
   
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="50.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");

   
   
   //MRP DEMAND SIDE NETTING - SALES ORDER
   test.log("MRP DEMAND SIDE NETTING - SALES ORDER");
   
   SetPlng("TBOX1","MRP");
   DelPlanOrdrs();
   QOHZero("TBOX1");
   DelAllPO();
   CheckSaleable("TBOX1");
   NewSO("TBOX1",500);   
   
   //----Setup Item site------
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
   
           
   MRP("+99");
   
 
   //--------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="600.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");

           
           
   //MRP DEMAND SIDE NETTING - WORK ORDER
   test.log("MRP DEMAND SIDE NETTING - WORK ORDER");
   
   SetPlng("TBOX1","MRP");
   DelPlanOrdrs();
   QOHZero("TBOX1");
   DelAllPO();
   DelAllSO();
   SetQtyScrp("TBOX1","1.00", "0.00");

   
   //----Setup Item site------
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
   test.log("Item Site setup for: TBOX1");
   
   //----Setup Item site------   
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

   NewWO("TSUB1",300,0,0)
   
   
   MRP("+99");

   //------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="400.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");

   
}




//MRP DEMAND SIDE NETTING – WORK ORDER – SCRAP %
test.log("MRP DEMAND SIDE NETTING – WORK ORDER – SCRAP %");

   SetPlng("TBOX1","MRP");
   DelPlanOrdrs();
   QOHZero("TBOX1");
   DelAllPO();
   DelAllSO();
   SetQtyScrp("TBOX1","1.00", "20.00");
   
   //----Setup Item site------   
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

   //----Setup Item site------   
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

   NewWO("TSUB1",350,0,0);
   
   MRP("+99");

   //------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="520.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");

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
   
   SetQtyScrp("TBOX1","0.20", "0.00");
   NewWO("TSUB1",300,0,0)

   
   //----Setup Item site------   
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

   //----Setup Item site------   
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
   
   //------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="700.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");



   //MRP DEMAND SIDE NETTING – WORK ORDER (RESCHEDULED)
   
   test.log("MRP DEMAND SIDE NETTING – WORK ORDER (RESCHEDULED)");
   SetPlng("TBOX1","MRP");
   DelPlanOrdrs();
   QOHZero("TBOX1");
   DelAllPO();
   DelAllSO();   
   SetQtyScrp("TBOX1","1.00", "0.00");
   ImplodeTopWO();
   ExplodeTopWO();
   RescheduleWO("+10","+10");
   
   MRP("+99");

   //------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
       if(iNumberOfRootItems==2)
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
           var fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
           ExptdDate++;
           fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="300.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");

           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");   
   
   
   
   //MRP DEMAND SIDE NETTING – FIRM PLANNED WORK ORDER
   test.log("MRP DEMAND SIDE NETTING – FIRM PLANNED WORK ORDER");
   
   DelPlanOrdrs();
   QOHZero("TBOX1");
   DelAllWO();
   NewScheduledWO("TSUB1",200,"+10",0);
   FirmPlndOrder();
   MRP("+99");
   
   //------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
       if(iNumberOfRootItems==2)
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
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="100.00" && obj_TreeTopLevelItem.text(8)==DueDate && obj_TreeTopLevelItem.text(7)==StartDate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
           ExptdDate++;
           StartDate++;
           fDate = CurrentYearFull+"-"+CurrentMonth+"-"+ExptdDate;
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==fdate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");

           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");   

   
   //MRP MULTILEVEL DEMAND – SIMPLE
   test.log("MRP MULTILEVEL DEMAND – SIMPLE");
   DelPlanOrdrs();
   QOHZero("YTRUCK1");
   QOHZero("TSUB1");
   QOHZero("TBOX1");
   DelAllWO();
   DelAllSO();
   
   //----Setup Item site------   
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
   activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
   waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
   activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
   waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
   activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");

   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "YTRUCK1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   waitForObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
   if(findObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
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

   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
   if(findObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
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

   
   waitForObject(":_itemSite_XTreeWidget");
   doubleClickItem(":_itemSite_XTreeWidget", "TBOX1", 0, 0, 0, Qt.LeftButton);
   waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
   waitForObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
    if(findObject(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox").checked)
        clickButton(":Supply Rules.Create Work Orders linked to Sales Orders_QCheckBox");
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
   
   NewSO("YTRUCK1",200);
   
   MRP("+99");
   
   //------Verify generated Planned Orders-----
   waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
   activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
   snooze(0.5);
   waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
   snooze(0.5);    
   waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
   waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
   activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
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
       if(iNumberOfRootItems==3)
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
           if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(2)=="P/O" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==DueDate && obj_TreeTopLevelItem.text(7)==StartDate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");
           

           obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
           if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(2)=="W/O" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==DueDate && obj_TreeTopLevelItem.text(7)==StartDate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");

           
           obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
           if(obj_TreeTopLevelItem.text(4)=="YTRUCK1" && obj_TreeTopLevelItem.text(2)=="W/O" && obj_TreeTopLevelItem.text(9)=="200.00" && obj_TreeTopLevelItem.text(8)==DueDate && obj_TreeTopLevelItem.text(7)==StartDate)
               test.pass("Expected Planned Order generated");
           else 
               test.fail("Incorrect Planned Order generated");

           
       }
       else test.fail("Incorrect Planned Order generated");
       waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
       clickButton(":Planned Orders by Planner Code.Close_QPushButton");
   }    
   else test.fail("No Planned Order generated");   

   
   
   //MRP MULTILEVEL DEMAND – ADVANCED
   test.log("MRP MULTILEVEL DEMAND – ADVANCED");
   DelPlanOrdrs();
   QOHZero("YTRUCK1");
   QOHZero("TSUB1");
   QOHZero("TBOX1");
   DelAllWO();
   DelAllSO();
   
   
   
   
   
   
   
}

