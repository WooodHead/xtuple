function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    snooze(1);
    
   //-----Editing of preferences----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        waitForObject(":Interface Options.Show windows inside workspace_QRadioButton");
            snooze(1);
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
                snooze(0.3);
        
        if(object.exists(":Notice.Notice_QDialog"))
        {
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                clickButton(":Notice.Remind me about this again._QCheckBox");
            snooze(0.2);
            waitForObject(":Notice.OK_QPushButton");
            clickButton(":Notice.OK_QPushButton");
        }
        waitForObject(":User Preferences.Save_QPushButton_2");
        clickButton(":User Preferences.Save_QPushButton_2");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in editing preferences"+ e);
    }  
    //--------Exiting the application------
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    snooze(3);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE");
  
  //--- Variable Declaration --------
  var qty = "100"; 
  var opname1 = "20 - Standard Paint Operation - ";
  var opname2 = "30 - Standard Operation - Assembly - Assembly";
  var opname3 = "40 - SHIPPING - ";
  
  var appEdition = findApplicationEdition();
  if(appEdition != "Manufacturing")
  {
      test.fail("Only Manufacturing edition supports ShopFloorWorkbench");
      waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
      activateItem(":xTuple ERP: *_QMenuBar", "System");
      waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
      activateItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
      
  }
  
    //--------- Shop Floor Workbench Setup -------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Setup...");
        snooze(0.5);
        waitForObject(":Shop Floor Workbench Posts:.Operations_QRadioButton");
        clickButton(":Shop Floor Workbench Posts:.Operations_QRadioButton");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Shop Floor Workbench Posts to Operations setup is successful");
    }
    catch(e)
    {
        test.fail("error in Shop Floor Workbench setup"+e);
    }
    
    //------- Work Order creation ---------
    var wonum1 =  createWorkOrder("YTRUCK1",qty);
    snooze(0.1);
    //---------- Releasing the created WO--------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");            
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",wonum1, 5, 5, Qt.LeftButton);        
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.pass(""+wonum1+" Work Order is released successfully");
    }
    catch(e)
    {
        test.fail(" error in releasing WO" +e); 
    }
    
    //---------Clock-In operation---------
    clockIn(wonum1,opname1);
    
    if(OS.name != "Windows")
    {
   //---- Do Nothing ------
    try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
       try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
}
    clockIn(wonum1,opname2);
    if(OS.name != "Windows")
    {
    //---- Do Nothing ------
    try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
    //---- Do Nothing ------
    try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
}
    clockIn(wonum1,opname3);
    if(OS.name != "Windows")
    {
    //---- Do Nothing ------
    try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
    //---- Do Nothing ------
    try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
}
    //-------- Clock-Out  operations-----------
    
    clockOut(wonum1,opname1);
    clockOut(wonum1,opname2);
    if(OS.name != "Windows")
    {
     //---- Do Nothing ------
    try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
    //---- Do Nothing ------
    try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
}
    clockOut(wonum1,opname3);
    
    //----- G/L transaction verification after clock-out of operations-----
    
    var bool = glTransactions(/Post Run Time/, wonum1);
    if(bool == 1)
    {
        test.pass("WO " + wonum1 + " has a GL entry for its posting operations Transactions ");
    }
    else
        test.fail("No GL entry is made for the  posting operations Transactions " + wonum1);
    
    //------------Verifying Production time  by Work Order--------
    timeByWo(wonum1,"20",opname1);
    timeByWo(wonum1,"30",opname2);
    timeByWo(wonum1,"40",opname3);
    
    //--------------Closing WO-----------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",wonum1, 5, 5, Qt.LeftButton);        
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Close...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Close...");
        waitForObject(":Close Work Order.Close W/O_QPushButton");
        clickButton(":Close Work Order.Close W/O_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        if(!object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonum1+"' type='QModelIndex'}"))
            test.log("WO" +wonum1+ "closed sucessfully");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("error in closing wo" +wonum1+"");
    }
    
    //--------------- Creating a New Adjustment of WO Time Clock Entry-----------
    //------- Work Order creation ---------
    var wonumDel =  createWorkOrder("YTRUCK1",qty);
    var wonumAdj =  createWorkOrder("YTRUCK1",qty);
    snooze(0.1);
    //---------- Releasing the created WO--------
    releaseWorkOrders()
            
    //---------Clock-In operation---------
     clockIn(wonumDel,opname1);
    if(OS.name != "Windows")
    {
      //---- Do Nothing ------
    try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
    //---- Do Nothing ------
    try
    {
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
   
    clickButton(waitForObject(":Setup.Cancel_QPushButton"));
    }
    catch(e)
    {
    }
}
    //--------------Verifying Production time  by user-----------
    
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        waitForObjectItem(":_QMenu", "by User...");
        activateItem(":_QMenu", "by User...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
        nativeType("<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3", "-4");
        nativeType("<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
        type(":_dateGroup.XDateEdit_XDateEdit_4", "0");
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        
        var Widget = ":_list_XTreeWidget_3";
        waitForObject(Widget);
        var obj_Widget = findObject(Widget);
        var objval = obj_Widget.topLevelItemCount;
        test.log("total count "+ objval + "");
        objUser = ++objval;
        
        openItemContextMenu(":_list_XTreeWidget_3",wonumDel, 5, 5, Qt.LeftButton); 
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "New");
        activateItem(":xTuple ERP:*._menu_QMenu", "New");
        waitForObject(":Adjust Work Order Time Clock Entry.VirtualClusterLineEdit_WoLineEdit");
        type(":Adjust Work Order Time Clock Entry.VirtualClusterLineEdit_WoLineEdit",wonumAdj);
        nativeType("<Tab>");
        waitForObject(":Adjust Work Order Time Clock Entry._wooper_XComboBox");
        clickItem(":Adjust Work Order Time Clock Entry._wooper_XComboBox",opname1, 0, 0, 5, Qt.LeftButton);
        waitForObject(":Adjust Work Order Time Clock Entry.XDateEdit_XDateEdit");
        type(":Adjust Work Order Time Clock Entry.XDateEdit_XDateEdit", "+0");
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*._timeIn_QTimeEdit");
        type(":xTuple ERP:*._timeIn_QTimeEdit", "01");
        nativeType("<Tab>");
        waitForObject(":Adjust Work Order Time Clock Entry.XDateEdit_XDateEdit_2");
        type(":Adjust Work Order Time Clock Entry.XDateEdit_XDateEdit_2", "+0");    
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*._timeOut_QTimeEdit");
        type(":xTuple ERP:*._timeOut_QTimeEdit", "02");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        
        var Widget1 = ":_list_XTreeWidget_3";
        
        waitForObject(Widget1);
        var obj_Widget1 = findObject(Widget1);
        var object1 = obj_Widget1.topLevelItemCount;
        
        if(++objUser == object1)
            test.pass("New Adjustment of WO Time Clock Entry has created");
        else
            test.fail("Failed to create new adjustment");
        --object1;
        
        
        //---------Deleting WO time clock Entry----------------------
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",wonumDel, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete");
        activateItem(":xTuple ERP:*._menu_QMenu", "Delete");
        snooze(1);
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        var Widget2 = ":_list_XTreeWidget_3";
        waitForObject(Widget2);
        var obj_Widget2 = findObject(Widget2);
        var object2 = obj_Widget2.topLevelItemCount;
        
        if(--object1 == object2)
            test.pass("WO Time Clock Entry is deleted successfully");
        else
            test.fail("Failed to delete WO Time Clock Entry");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error Occured");
    }
  
   //--------- Setting Shop Floor Workbench Post to 'Production' -------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Setup...");
        snooze(0.5);
        waitForObject(":Shop Floor Workbench Posts:.Production_QRadioButton");
        clickButton(":Shop Floor Workbench Posts:.Production_QRadioButton");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Shop Floor Workbench Posts to Productions setup is successful");
    }
    catch(e)
    {
        test.fail("error in Shop Floor Workbench setup"+e);
    }
    
    //------- Work Order creation ---------
    var wonum2;
    
    wonum2 = createWorkOrder("YTRUCK1",qty);
    
    //---------- Releasing the created WO--------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton"); 
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",wonum2, 5, 5, Qt.LeftButton);        
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");        
        test.pass(""+wonum2+" Work Order is released successfully");
    }
    catch(e)
    {
        test.fail(" error in releasing WO" +e); 
    }
    
    //---------Clock-In operation---------      
    clockIn(wonum2,"");
    snooze(0.1);
    
    //------ issue material by batch to a work order of a regular item-----
    issueBatch(wonum2,qty);  
    snooze(0.1);
    
    
    //----- QOH Verification by Item (Before Clock Out of the Work Order)-----. 
    try{
        var qtyytruck=queryQoh("YTRUCK1","WH1",appEdition);
        test.log("QOH verified successfuly before Post Production of a Work Order");
    }
    catch(e)
    {
        test.fail("Error in verifying the QOH before Post Production of the Work Order "+e);
    } 
    
    //------------------------Cancelling Production Clock-Out-------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
        nativeType("<Tab>");
        waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit_2");
        type(":groupBox.VirtualClusterLineEdit_WoLineEdit_2",wonum2);
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*._wooperList_XTreeWidget");
        clickItem(":xTuple ERP:*._wooperList_XTreeWidget",wonum2, 0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Clock Out_QPushButton");
        clickButton(":xTuple ERP:*.Clock Out_QPushButton");
        
        waitForObject(":_qty_XLineEdit_4");
        type(":_qty_XLineEdit_4", "100");
        nativeType("<Tab>");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("error occured in cancelling clock-out");
    }
    snooze(0.5);
    
    //--------Verifying and Perform the Production Clock-Out -----------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
        waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit_2");
        type(":groupBox.VirtualClusterLineEdit_WoLineEdit_2",wonum2);
        nativeType( "<Tab>");
        
        waitForObject(":xTuple ERP:*._wooperList_XTreeWidget");
        clickItem(":xTuple ERP:*._wooperList_XTreeWidget",wonum2, 0, 0, 5, Qt.LeftButton);
        if(object.exists("{column='0' container=':xTuple ERP:*._wooperList_XTreeWidget' text='"+wonum2+"' type='QModelIndex'}"))
            test.log(""+wonum2+"WO is available for Clock-out");
        
        waitForObject(":xTuple ERP:*.Clock Out_QPushButton");
        clickButton(":xTuple ERP:*.Clock Out_QPushButton");
        waitForObject(":_qty_XLineEdit_4");
        type(":_qty_XLineEdit_4", qty);
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        test.pass("clock-out operation is successfull");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("error in clock out operation"+ e);
        
    }
    snooze(0.1);
    //-----Verification of updated QOH by Item (after post production)-----   
    result = queryQoh("YTRUCK1","WH1",appEdition);
    if((result - parseInt(qty) == qtyytruck))
        test.pass("QOH of YTRUCK1 is updated correctly after post production");
    else
        test.fail("QOH of YTRUCK1 is not updated correctly after post production");
    
    //----- G/L transaction verification after Production clock-out----  
    var bool = glTransactions(/Receive Inventory/, wonum2);
    if(bool == 1)
    {
        test.pass("WO " + wonum2 + " has a GL entry for its Post Production ");
    }
    else
        test.fail("No GL entry is made for its Post Production " + wonum2);
    
    //--------------Closing WO-----------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",wonum2, 5, 5, Qt.LeftButton);        
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Close...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Close...");
        waitForObject(":Close Work Order.Close W/O_QPushButton");
        clickButton(":Close Work Order.Close W/O_QPushButton");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        if(!object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonum2+"' type='QModelIndex'}"))
            test.log("WO" +wonum2+ "closed sucessfully");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("error in closing wo" +wonum2+ e);
    }
    
    // -----------View WO Costing---------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Costing...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Costing...");
        waitForObject(":Work Order Costing.VirtualClusterLineEdit_WoLineEdit");
        type(":Work Order Costing.VirtualClusterLineEdit_WoLineEdit", wonum2);
        nativeType("<Tab>");
        if(!findObject(":Work Order Costing.Show Set Up_XCheckBox").checked)
            clickButton(":Work Order Costing.Show Set Up_XCheckBox")
            if(!findObject(":Work Order Costing.Show Run Time_XCheckBox").checked)
                clickButton(":Work Order Costing.Show Run Time_XCheckBox")
                if(!findObject(":Work Order Costing.Show Materials_XCheckBox").checked)
                    clickButton(":Work Order Costing.Show Materials_XCheckBox")
                    waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='PAINT1' type='QModelIndex'}"))
            test.pass("" +wonum2+ "Work Order's Paint operation has setup time costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's Paint operation has no setup time costing entry");
        waitForObject(":_list_XTreeWidget_3")
                if(object.exists("{column='1' container=':_list_XTreeWidget_3' occurrence='2' text='PAINT1' type='QModelIndex'}"))		    test.pass("" +wonum2+ "Work Order's Paint operation has Run Time costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's Paint operation has no Run Time costing entry");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='ASSEMBLY1' type='QModelIndex'}"))
            test.pass("" +wonum2+ "Work Order's Assembly operation has setup time costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's assembly operation has no setup time costing entry");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='ASSEMBLY1' type='QModelIndex'}"))
            test.pass("" +wonum2+ "Work Order's Assembly operation has Run Time costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's assembly operation has no Run Time costing entry");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' occurrence='2' text='SHIPPING1' type='QModelIndex'}"))		    test.pass("" +wonum2+ "Work Order's Shipping operation has setup time costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's Shipping operation has setup time costing entry");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' occurrence='2' text='SHIPPING1' type='QModelIndex'}"))     	    test.pass("" +wonum2+ "Work Order's Shipping operation has Run Time costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's Shipping operation has no Run Time costing entry");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TBODY1' type='QModelIndex'}"))
            test.pass("" +wonum2+ "Work Order's Material issue (TBODY1)transaction has a costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's Material issue (TBODY1)transaction has no costing entry");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TSUB1' type='QModelIndex'}"))
            test.pass("" +wonum2+ "Work Order's Material issue (TSUB1)transaction has a costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's Material issue (TSUB1)transaction has no costing entry");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TWHEEL1' type='QModelIndex'}"))
            test.pass("" +wonum2+ "Work Order's Material issue (TWHEEL1)transaction has a costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's Material issue (TWHEEL1)transaction has no costing entry");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='TSUB1' type='QModelIndex'}"))
            test.pass("" +wonum2+ "Work Order's Material issue (YPAINT1)transaction has a costing entry");
        else  
            test.fail("" +wonum2+ "Work Order's Material issue (YPAINT1)transaction has no costing entry");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("" +wonum2+ "WO costing entries are verified successfully");
    }
    catch(e)
    { 
        test.fail("Error in verifying WO costing entries"+e);
    } 
    
    //------------Verifying Production time from Production time clock by user---------
    
    timeByUser(wonum2,"20",opname1);
    timeByUser(wonum2,"30",opname2);
    timeByUser(wonum2,"40",opname3);
    
    //--------------- Creating a New Adjustment of WO Time Clock Entry-----------
    
    //------- Work Order creation ---------
    var woNew =  createWorkOrder("YTRUCK1",qty);
    var woDel =  createWorkOrder("YTRUCK1",qty);
    snooze(0.1);
    //---------- Releasing the created WO--------
    releaseWorkOrders();
    //---------Clock-In operation---------
    clockIn(woNew,"");
    clockIn(woDel,"");
    
    //--------------Verifying Production time  by WO-----------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        waitForObjectItem(":_QMenu", "by Work Order...");
        activateItem(":_QMenu", "by Work Order...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_6");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_6",woNew);
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        var sWidget = ":_list_XTreeWidget_3";
        waitForObject(sWidget);
        var obj_TreeWidget = findObject(sWidget);
        var obj = obj_TreeWidget.topLevelItemCount;
        
        openItemContextMenu(":_list_XTreeWidget_3","admin", 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "New");
        activateItem(":xTuple ERP:*._menu_QMenu", "New");
        waitForObject(":*.VirtualClusterLineEdit_UsernameLineEdit");
        type(":*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
        nativeType("<Tab>");
        waitForObject(":Adjust Work Order Time Clock Entry.XDateEdit_XDateEdit");
        type(":Adjust Work Order Time Clock Entry.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*._timeIn_QTimeEdit");
        type(":xTuple ERP:*._timeIn_QTimeEdit", "01");
        nativeType("<Tab>");
        waitForObject(":Adjust Work Order Time Clock Entry.XDateEdit_XDateEdit_2");
        type(":Adjust Work Order Time Clock Entry.XDateEdit_XDateEdit_2", "0");
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*._timeOut_QTimeEdit");
        type(":xTuple ERP:*._timeOut_QTimeEdit", "02");
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*._timeOut_QTimeEdit");
        type(":xTuple ERP:*._timeOut_QTimeEdit", "10");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        var sWidget2 = ":_list_XTreeWidget_3";
        waitForObject(sWidget2);
        var obj_TreeWidget2 = findObject(sWidget2);
        var obj2 = obj_TreeWidget2.topLevelItemCount;
        if(++obj == obj2)
        {
            test.log("New adjustment created succesfully for WO"+woNew+ "");
        }
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
    }
    catch(e)
    {
        test.fail("failed to create New adjustment for for WO"+woNew+ "");
    }
    
    //----------------- Deleting WO Time Entry---------------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        waitForObjectItem(":_QMenu", "by Work Order...");
        activateItem(":_QMenu", "by Work Order...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_6");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_6",woDel);
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3","admin", 5, 5, Qt.LeftButton); 
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete");
        activateItem(":xTuple ERP:*._menu_QMenu", "Delete");
        waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        
        if(!object.exists("{column='0' container=':_list_XTreeWidget_3' text='admin' type='QModelIndex'}"))
            test.log("WO Time Clock Entry deleted successfully for WO"+woDel+ "");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
    }
    catch(e)
    {
        test.fail("Failed to delete WO time clock entry for WO"+woDel+ "");
    }
    
    
    //--------------------- Clock-in job costing type Item-------------------
    //--------------- Creating Sales Order for Job costing type Item-----------------------
    
    var sonumber = createSalesOrder1("REPAIRT1","100","TTOYS");
    
    var wonum3= sonumber+"-1";
    
    test.log(""+wonum3+" WO for REPAIRT1 created successfully linked to sales order")
            
            //------------ Releasing Work Orders----------------------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",wonum3, 5, 5,  Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail(" error in releasing WO" +e); 
    }
    //-------------clock-in from Shop-Floor Work Bench-----------
    clockIn(wonum3,"");
    test.log("Clocked-in successfully");
    
    //-------- Clock-Out for job-costing type item WO -----------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
        waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit_2");
        type(":groupBox.VirtualClusterLineEdit_WoLineEdit_2",wonum3);
        nativeType( "<Tab>");
        waitForObject(":xTuple ERP:*._wooperList_XTreeWidget");
        clickItem(":xTuple ERP:*._wooperList_XTreeWidget",wonum3,0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Clock Out_QPushButton");
        clickButton(":xTuple ERP:*.Clock Out_QPushButton");
        test.pass("clock-out operation is successfull");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("error in clock out operation"+e);
    }
    snooze(0.1);
    
    //-----Verification of QOH by Item (Issue stock to ship the sales order)-----.
    
    var qtywheel = queryQoh("TWHEEL1","WH1",appEdition);
    
    //-----Issue Stock to Shipping-----
    try
    {       
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber);
        snooze(0.1);
        nativeType("<Tab>");
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        
        //-----Ship the Sales Order (with'Select for Billing' option checked)-----
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        
        if(findObject(":groupBox.Select for Billing_QCheckBox").unchecked)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
        
        if(findObject(":groupBox.Print Packing List_XCheckBox_3").checked)
            clickButton(":groupBox.Print Packing List_XCheckBox_3");
        
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issued stock and shipped the Sales Order");
    }
    catch(e)
    {
        test.fail("Error in issuing stock and shipping the sales order" + e);
    }
    //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----   
    
    var result=queryQoh("TWHEEL1","WH1",appEdition);
    if((qtywheel-parseInt(4*qty)==result))
        test.pass("Quantity of TWHEEL1 is updated correctly");
    else
        test.fail("Quantity of TWHEEL1 is not updated correctly");
    
    //-----Verification of G/L transaction for Post Production of WO -----
    var bool = glTransactions(/Receive Inventory/,wonum3);
    if(bool == 1)
    {
        test.pass("WO " + wonum3+ " has a GL entry for its Post Production ");
    }
    else
        test.fail("No GL entry is made for its Post Production " + wonum3);
    
    //------------------ Verify the WO---------------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(!object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonum3+"' type='QModelIndex'}"))
            test.pass(""+wonum3+ " WO closed successfully");
        else
            test.fail(""+wonum3+ "wo doesn't closed"); 
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("error occured in closing WO" +e);
    }
    //------- Work Order creation (for the use of clock-in operation from w/o operation screen)---------
    var wonum4 = createWorkOrder("YTRUCK1",qty);
    // //------------Updating Buffer Status------------------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Constraint Management");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Constraint Management");
        waitForObjectItem(":_QMenu", "Update Status");
        activateItem(":_QMenu", "Update Status");
        waitForObjectItem(":xTuple ERP:*.Update Status_QMenu", "by Planner Code...");
        activateItem(":xTuple ERP:*.Update Status_QMenu", "by Planner Code...");
        waitForObject(":Run Buffer Status by Planner Code.Create_QPushButton");
        clickButton(":Run Buffer Status by Planner Code.Create_QPushButton");
        test.log("Buffer status updated");
    }
    catch(e)
    {
        test.fail("error: Updating buffer status");
    }
    
    //---------- Releasing the created WO--------
    releaseWorkOrders();
    // //------------Clock-in from w/o operation screen-----------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Constraint Management");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Constraint Management");
        waitForObjectItem(":_QMenu", "W/O Operation...");
        activateItem(":_QMenu", "W/O Operation...");
        waitForObject(":_wrkcnt_XComboBox");
        clickItem(":_wrkcnt_XComboBox","ASSEMBLY1",0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",wonum4,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Clock In...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Clock In...");
        if(!object.exists(":Sales Order.OK_QPushButton_2"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            // ---------Clock-out -----------
            try{
                waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
                activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
                waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
                activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
                waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
                activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
                waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit");
                type(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
                waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit_2");
                type(":groupBox.VirtualClusterLineEdit_WoLineEdit_2",wonum4);
                nativeType( "<Tab>");
                waitForObject(":xTuple ERP:*._wooperList_XTreeWidget");
                clickItem(":xTuple ERP:*._wooperList_XTreeWidget",wonum4,0, 0, 5, Qt.LeftButton);
                waitForObject(":xTuple ERP:*.Clock Out_QPushButton");
                clickButton(":xTuple ERP:*.Clock Out_QPushButton");
                waitForObject(":_qty_XLineEdit_4");
                type(":_qty_XLineEdit_4", qty);
                nativeType("<Tab>");
                waitForObject(":List Unposted Invoices.Post_QPushButton");
                clickButton(":List Unposted Invoices.Post_QPushButton");
                waitForObject(":_frame._itemloc_XTreeWidget_3");
                doubleClickItem(":_frame._itemloc_XTreeWidget_3", "No_1", 0, 0, 5, Qt.LeftButton);
                waitForObject(":Issue to Shipping.Distribute_QPushButton");
                clickButton(":Issue to Shipping.Distribute_QPushButton");
                waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton_2")
                        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
                test.pass("clock-out operation is successfull");
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
                
            }
            catch(e)
            {
                test.fail("error in clock out operation"+e);
            }
            snooze(0.1);
        }
        else
        {
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            test.fail("Error Occured on clock in the WO "+wonum4+"");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    catch(e)
    {
        test.fail("error in clock-in operation"+e);
    }
}

