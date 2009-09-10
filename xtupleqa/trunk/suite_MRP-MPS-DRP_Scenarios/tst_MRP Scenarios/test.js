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
    
    //--------View Planned Orders-----
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
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    var Qnty, DispDate;
    for(i=0;i<findObject(":frame._planord_XTreeWidget").columnCount;i++)
    {
       obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
       sNameOfRootItem = obj_TreeTopLevelItem.text(0);
       if(i==8)
           DispDate= sNameOfRootItem;
       if(i==9)
           Qnty = sNameOfRootItem;
   }
    
    var d = new Date();
    var CurrentYearFull = d.getFullYear();
    var CurrentYear = CurrentYearFull.toString().slice(2);
    var CurrentMonth = 1+d.getMonth();
    var CurrentDate = d.getDate();
    var ExptdDate = CurrentDate+3;
    var fDate = CurrentMonth+"/"+ExptdDate+"/"+CurrentYear;
    
      
    if(Qnty=="100.00" && DispDate==fdate && findObject(":frame._planord_XTreeWidget").topLevelItemCount==1)
        test.pass("Expected Planned Order generated");
    else test.fail("Incorrect Planned Order generated");
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    
    
    
}
