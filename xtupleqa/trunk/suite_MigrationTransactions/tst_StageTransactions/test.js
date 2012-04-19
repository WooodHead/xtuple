function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
  
    
    //-----Edit the preferences-----
    try
    {
        
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
        activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
        if(object.exists(":Interface Options.Tabbed Windows_QRadioButton"))
        {
            if(!findObject(":Interface Options.Tabbed Windows_QRadioButton").checked)
                clickButton(":Interface Options.Tabbed Windows_QRadioButton");
            
            
            if(object.exists(":Notice.Notice_QDialog"))
            {
                if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                    clickButton(":Notice.Remind me about this again._QCheckBox");
                waitForObject(":Notice.OK_QPushButton");   
                clickButton(":Notice.OK_QPushButton");
                
            }
        }
        waitForObject(":xTuple ERP:*_QPushButton");
        clickButton(":xTuple ERP:*_QPushButton");
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in editing preferences" + e);
    }
    
    //-------Exiting the application----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 

    
    //---------------Enabling the database options--------- 
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        snooze(1);
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {   
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 31, 4, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex", -7, 5, 0, Qt.LeftButton);
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 31, 4, 0, Qt.LeftButton);
        }
        
        if(object.exists(":_stack.Use toolbars on displays when available_QCheckBox"))
        {
            waitForObject(":_stack.Use toolbars on displays when available_QCheckBox");
            snooze(1);
            if(!(findObject(":_stack.Use toolbars on displays when available_QCheckBox").checked))
                clickButton(":_stack.Use toolbars on displays when available_QCheckBox");
            
        }
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in setting up the database" + e);
    }    
    
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales",10,10,0,Qt.LeftButton);
        
        
        //-----Capturing Sales order,Quote,Invoice numbers----------
        var SONUM=findObject(":Sales Configuration._nextSoNumber_XLineEdit").text;
        var QUNUM=findObject(":Sales Configuration._nextQuNumber_XLineEdit").text;
        var INNUM=findObject(":Sales Configuration._nextInNumber_XLineEdit").text;
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing sales order numbers" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Purchase",10,10,0,Qt.LeftButton);
        
        //-------Capturing Purchase order,Voucher,Purchase request numbers---
        var PONUM=findObject(":_nextPoNumber_XLineEdit").text;
        var VONUM=findObject(":_nextVcNumber_XLineEdit").text;
        var PRNUM=findObject(":_nextPrNumber_XLineEdit").text;
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing purchase order numbers" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Manufacture",10,10,0,Qt.LeftButton);
        
        //-------Capturing Work order Number----- 
        var WONUM=parseInt(findObject(":Manufacture Configuration._nextWoNumber_XLineEdit").text);
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing work order numbers" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Schedule",10,10,0,Qt.LeftButton);
        
        //-------Capturing Planned order Number----
        var PLNUM=parseInt(findObject(":Schedule Configuration._nextPlanNumber_XLineEdit").text);
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing planned order numbers" + e);
    }
    
    
    //-------Create Quote----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Quote");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Quote");
        waitForObjectItem(":xTuple ERP:*.Quote_QMenu", "List...");
        activateItem(":xTuple ERP:*.Quote_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_3");
        clickButton(":_lineItemsPage.New_QPushButton_3");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_2");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_2", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_qtyOrdered_XLineEdit_3");
        type(":_qtyOrdered_XLineEdit_3", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "<Tab>");
        waitForObject(":Quote.Save_QPushButton");
        clickButton(":Quote.Save_QPushButton");
        waitForObject(":Quote.Close_QPushButton");
        clickButton(":Quote.Close_QPushButton");
        waitForObject(":Quote.Save_QPushButton_2");
        clickButton(":Quote.Save_QPushButton_2");
        waitForObject(":Quote.Cancel_QPushButton");
        clickButton(":Quote.Cancel_QPushButton");
        waitForObject(":_list_XTreeWidget");
        if (object.exists("{column='0' container=':_list_XTreeWidget' text='"+QUNUM+"' type='QModelIndex'}"))
            test.pass("Quote created:"+ QUNUM);
        else
            test.fail("Quote is not created");   
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating Quote" + e);
    }
    
    
    //----Manufacture- new Work Order----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4","YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        test.log("Created Work Order"+ WONUM+"-1");
    }
    catch(e)
    {
        test.fail("Error in creating work order" + e);
    }
    
    
    
    //----Manufacture - new Work Order----
    try
    {
        WONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4","YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        test.log("Created Work Order:"+ WONUM+"-1");
    }
    catch(e)
    {
        test.fail("Error in creating work order" + e);
    }
    
    
    //----Manufacture- new Work Order----
    try
    {
        WONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4","YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        test.log("Created Work Order:"+ WONUM+"-1");    
    }
    catch(e)
    {
        test.fail("Error in creating work order" + e);
    }
    
    //----Manufacture- new Work Order----
    try       
    {
        WONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4","YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        test.log("Created Work Order:" + WONUM+"-1");
    }
    catch(e)
    {
        test.fail("Error in creating work order" + e);
    }
    
    
    //----Manufacture- new Work Order----
    try
    {
        WONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4","YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        test.log("Created Work Order:"+ WONUM+"-1");    
    }
    catch(e)
    {
        test.fail("Error in creating work order" + e);
    }
    
    
    //----Manufacture- new Work Order----
    try
    {
        WONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4","YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        test.log("Created Work Order:"+ WONUM+"-1");    
    }
    catch(e)
    {
        test.fail("Error in creating work order" + e);
    }
    
    
    
    //----Manufacture- new Work Order----.
    try
    {
        WONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4","YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        test.log("Created Work Order:"+ WONUM+"-1");    
    }
    catch(e)
    {
        test.fail("Error in creating work order" + e);
    }
    
    
    //----Manufacture- new Work Order----
    try
    {
        WONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4","YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        test.log("Created Work Order:"+ WONUM +"-1"); 
    }    catch(e)
    {
        test.fail("Error in creating work order" + e);
    }
    
    
    //----Manufacture- new Work Order----
    try
    {
        WONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4","YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        test.log("Created Work Order:" + WONUM +"-1"); 
    }
    catch(e)
    {
        test.fail("Error in creating work order" + e);
    }
    
    //----implode work Order----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
        waitForObject(":Work Order Schedule.Query_QToolButton");
        clickButton(":Work Order Schedule.Query_QToolButton");
        try
        {
            
            WONUM=WONUM-7;
            waitForObject(":_list_XTreeWidget_12");
            openItemContextMenu(":_list_XTreeWidget_12", WONUM+"-1", 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Implode...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Implode...");
            waitForObject(":Work Order Schedule.Implode_QPushButton");
            clickButton(":Work Order Schedule.Implode_QPushButton");
            test.log("Imploded Work Order:" + WONUM+"-1");
        }
        catch(e)
        {
            test.fail("Error in imploding work order" + e);
        }
        
        
        //----Release Work Order--- 
        try
        {
            WONUM=WONUM+2;
            waitForObject(":Work Order Schedule.Query_QToolButton");
            clickButton(":Work Order Schedule.Query_QToolButton");
            waitForObject(":_list_XTreeWidget_12");
            openItemContextMenu(":_list_XTreeWidget_12", WONUM+"-1", 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release");
            test.log("Release WO:" + WONUM+"-1");
        }
        catch(e)
        {
            test.fail("Error in releasing work order" + e);
        }
        
        //--------Post Operation-------------   
        try
        {
            WONUM++;
            waitForObject(":_list_XTreeWidget_12");
            openItemContextMenu(":_list_XTreeWidget_12", WONUM+"-1", 5, 5, 0);
            
            waitForObject(":xTuple ERP:*._menu_QMenu");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
            
            waitForObject(":_operationGroup._wooper_XComboBox_2");
            clickItem(":_operationGroup._wooper_XComboBox_2", "30 - Standard Operation - Assembly Assembly",0,0,1,Qt.LeftButton);
            waitForObject(":Post Operations.Post_QPushButton");
            clickButton(":Post Operations.Post_QPushButton");
            waitForObject(":_list_XTreeWidget_12");
            openItemContextMenu(":_list_XTreeWidget_12", WONUM+"-1", 5, 5, 0);
            waitForObject(":xTuple ERP:*._menu_QMenu");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
            waitForObject(":_operationGroup._wooper_XComboBox_2");
            clickItem(":_operationGroup._wooper_XComboBox_2", "40 - SHIPPING ",0,0,1,Qt.LeftButton);
            waitForObject(":Post Operations.Post_QPushButton");
            clickButton(":Post Operations.Post_QPushButton");
            test.log("Posted partial operation for WO: " + WONUM+"-1");
        }
        catch(e)
        {
            test.fail("Error in posting operations for work  order" + e);
        }
        
        
        
        
        //-------Post Operation---------   
        try
        {
            WONUM++;
            waitForObject(":_list_XTreeWidget_12");
            openItemContextMenu(":_list_XTreeWidget_12", WONUM+"-1", 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
            waitForObject(":_operationGroup._wooper_XComboBox_2");
            type(":_operationGroup._wooper_XComboBox_2", "<Down>");
            waitForObject(":Post Operations.Post_QPushButton");
            clickButton(":Post Operations.Post_QPushButton");
            waitForObject(":_frame._itemloc_XTreeWidget");
            doubleClickItem(":_frame._itemloc_XTreeWidget","No" ,5, 5, 0, Qt.LeftButton);
            waitForObject(":Distribute to Location.Distribute_QPushButton");
            clickButton(":Distribute to Location.Distribute_QPushButton");
            waitForObject(":Distribute Stock To/From Site Locations.Post_QPushButton");
            clickButton(":Distribute Stock To/From Site Locations.Post_QPushButton");
            test.log("Posted partial Operation for WO:" + WONUM+"-1");
        }
        catch(e)
        {
            test.fail("Error in posting operations for work order" + e);
        }
        
        
        
        
        //-------Post Production-------
        try
        {
            WONUM++;
            waitForObject(":_list_XTreeWidget_12");
            openItemContextMenu(":_list_XTreeWidget_12", WONUM+"-1", 5, 5, 0);    
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
            waitForObject(":_qty_XLineEdit_6");
            type(":_qty_XLineEdit_6", "100");
            
            if(findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox_3").checked==true)
                clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox_3");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":_frame._itemloc_XTreeWidget");
            doubleClickItem(":_frame._itemloc_XTreeWidget","No", 5, 5, 0, Qt.LeftButton);
            waitForObject(":Distribute to Location.Distribute_QPushButton");
            clickButton(":Distribute to Location.Distribute_QPushButton");
            waitForObject(":*.Post_QPushButton");
            clickButton(":*.Post_QPushButton");
            test.log("Posted Production for WO:" + WONUM+"-1");   
        }
        catch(e)
        {
            test.fail("Error in post production for work order" + e);
        }
        
        
        
        
        //--------------Release WO--------    
        try
        {
            
            WONUM++;
            waitForObject(":Work Order Schedule.Query_QToolButton");
            clickButton(":Work Order Schedule.Query_QToolButton");
            waitForObject(":_list_XTreeWidget_12");
            openItemContextMenu(":_list_XTreeWidget_12", WONUM+"-1", 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release");
            test.log("Release WO:"+ WONUM+"-1")
                }
        catch(e)
        {
            test.fail("Error in releasing work order" + e);
        }        
        
        
        //---------- post production-------   
        try
        {
            WONUM++;
            waitForObject(":_list_XTreeWidget_12");
            openItemContextMenu(":_list_XTreeWidget_12", WONUM+"-1", 5, 5, 0);    
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
            waitForObject(":_qty_XLineEdit_6");
            type(":_qty_XLineEdit_6", "100");
            if(findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox_3").checked==true)
                clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox_3");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":_frame._itemloc_XTreeWidget");
            doubleClickItem(":_frame._itemloc_XTreeWidget","No", 5, 5, 0, Qt.LeftButton);
            waitForObject(":Distribute to Location.Distribute_QPushButton");
            clickButton(":Distribute to Location.Distribute_QPushButton");
            waitForObject(":*.Post_QPushButton");
            clickButton(":*.Post_QPushButton");
            test.log("Posted Production for WO:" + WONUM+"-1");   
        }
        catch(e)
        {
            test.fail("Error in post production for work order" + e);
        }
        
        waitForObject(":Work Order Schedule.Close_QToolButton");
        clickButton(":Work Order Schedule.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in opening list of work orders  screen" + e);
    }
    
    
    //---------Production Time clock for work Order---
    try
    {
        WONUM--;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        waitForObject(":Shop Floor Workbench.VirtualClusterLineEdit_UsernameLineEdit");
        type(":Shop Floor Workbench.VirtualClusterLineEdit_UsernameLineEdit", "admin");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit");
        type(":groupBox.VirtualClusterLineEdit_WoLineEdit", WONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_operationGroup._wooper_XComboBox_2");
        sendEvent("QMouseEvent", ":_operationGroup._wooper_XComboBox_2", QEvent.MouseButtonPress, 354, 9, Qt.LeftButton, 0);
        waitForObject(":_wooper.20 - Standard Paint Operation - _QModelIndex_2");
        mouseClick(":_wooper.20 - Standard Paint Operation - _QModelIndex_2", 151, 7, 0, Qt.LeftButton);
        waitForObject(":*.Clock In_QPushButton");
        clickButton(":*.Clock In_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in performing clock in operation " + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
        waitForObject(":Shop Floor Workbench.VirtualClusterLineEdit_UsernameLineEdit");
        type(":Shop Floor Workbench.VirtualClusterLineEdit_UsernameLineEdit", "admin");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(':*._wooperList_XTreeWidget');
        if (object.exists("{column='0' container=':*._wooperList_XTreeWidget' text='"+WONUM+"-1' type='QModelIndex'}"))
            test.pass("Paint Operation is clocked in");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in opening of shop floor work bench screen" + e);
    }
    
    
    
    //---Create Sales Order---
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        
        try
        {
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_4");
            clickButton(":Sales Order.Save_QPushButton_4");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:" + SONUM);
            else
                test.fail("Sales Order is not created");
        }
        catch(e)
        {
            test.fail("Error in creating sales order" + e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_4");
            clickButton(":Sales Order.Save_QPushButton_4");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:" + SONUM);
            else
                test.fail("Sales Order is not created");
        }
        catch(e)
        {
            test.fail("Error in creating sales order" + e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_4");
            clickButton(":Sales Order.Save_QPushButton_4");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:" + SONUM);
            else
                test.fail("Sales Order is not created");
        }
        catch(e)
        {
            test.fail("Error in creating sales order" + e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_4");
            clickButton(":Sales Order.Save_QPushButton_4");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:" + SONUM);
            else
                test.fail("Sales Order is not created" + SONUM);
        }
        catch(e)
        {
            test.fail("Error in creating sales order" + e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_4");
            clickButton(":Sales Order.Save_QPushButton_4");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:" + SONUM);
            else
                test.fail("Sales Order is not created");
        }
        catch(e)
        {
            test.fail("Error in creating sales order " + e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_4");
            clickButton(":Sales Order.Save_QPushButton_4");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:" + SONUM );
            else
                test.fail("Sales Order is not created");
        }
        catch(e)
        {
            test.fail("Error in creating sales order " + e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "XRETAIL");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_4");
            clickButton(":Sales Order.Save_QPushButton_4");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:" + SONUM );
            else
                test.fail("Sales Order is not created");
        }
        catch(e)
        {
            test.fail("Error in creating sales order " + e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "XRETAIL");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_4");
            clickButton(":Sales Order.Save_QPushButton_4");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:" + SONUM);
            else
                test.fail("Sales Order is not created");
        }
        catch(e)
        {
            test.fail("Error in creating sales order" + e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_4");
            clickButton(":Sales Order.Save_QPushButton_4");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:"  + SONUM);
            else
                test.fail("Sales Order is not created");
        }
        catch(e)
        {
            test.fail("Error in creating sales order " + e);
        }
        
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in opening list of sales order screen" + e);
    }
    
    
    //--------Run MRP by planner code---//
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        waitForObjectItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
        activateItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
        waitForObject(":Run MRP by Planner Code.XDateEdit_XDateEdit");
        type(":Run MRP by Planner Code.XDateEdit_XDateEdit", "+30");
        waitForObject(":Run MRP by Planner Code.XDateEdit_XDateEdit");
        type(":Run MRP by Planner Code.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Run MRP by Planner Code.OK_QPushButton");
        clickButton(":Run MRP by Planner Code.OK_QPushButton");
        test.log("MRP Schedule run for next 30 days");
    }
    catch(e)
    {
        test.fail("Error in running MRP" + e);
    }
    
    
    //---Create Planned Order----
    try
    {
        waitForObject(":xTuple ERP:*_QMenuBar_2");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_5");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_5","YTRUCK1"); 
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Planned Order._qty_XLineEdit");
        type(":Planned Order._qty_XLineEdit", "100");
        waitForObject(":Planned Order.XDateEdit_XDateEdit");
        type(":Planned Order.XDateEdit_XDateEdit", "+9");
        waitForObject(":Planned Order.XDateEdit_XDateEdit");
        type(":Planned Order.XDateEdit_XDateEdit", "<Tab>");
        clickButton(":_typeGroup.Purchase Order_QRadioButton");
        waitForObject(":Planned Order.Save_QPushButton");
        clickButton(":Planned Order.Save_QPushButton");
        waitForObject(":Planned Order.Close_QPushButton");
        clickButton(":Planned Order.Close_QPushButton");
        test.log("new Planned Order created");
    }
    catch(e)
    {
        test.fail("Error in creating planned order"+ e);
    }
    
    
    //---Create Planned Order----
    try
    {
        waitForObject(":xTuple ERP:*_QMenuBar_2");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_5");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_5","TBODY1"); 
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Planned Order._qty_XLineEdit");
        type(":Planned Order._qty_XLineEdit", "100");
        waitForObject(":Planned Order.XDateEdit_XDateEdit");
        type(":Planned Order.XDateEdit_XDateEdit", "+9");
        waitForObject(":Planned Order.XDateEdit_XDateEdit");
        type(":Planned Order.XDateEdit_XDateEdit", "<Tab>");
        clickButton(":_typeGroup.Purchase Order_QRadioButton");
        waitForObject(":Planned Order.Save_QPushButton");
        clickButton(":Planned Order.Save_QPushButton");
        waitForObject(":Planned Order.Close_QPushButton");
        clickButton(":Planned Order.Close_QPushButton");
        test.log("new Planned Order created");
    }
    catch(e)
    {
        test.fail("Error in creating planned order" + e);
    }
    
    
    //---Release Planned Order---------
    try
    {
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_13");
        if (object.exists("{column='1' container=':_list_XTreeWidget_13' text='P/O' type='QModelIndex'}"))
            test.pass("Planned Order is created" );
        else
            test.fail("Planned Order is not created");
        openItemContextMenu(":_list_XTreeWidget_13",'P/O', 5, 5, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
        waitForObject(":Planned Orders.Create_QPushButton");
        clickButton(":Planned Orders.Create_QPushButton");
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
        test.log("Released Planned Order:");
    }
    catch(e)
    {
        test.fail("Error in releasing planned order" + e);
    }
    
    //----Create Purchase Order--------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":List Open Purchase Orders.Unreleased_XCheckBox");
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        
        try
        {
            waitForObject(":Open Purchase Orders.Query_QToolButton");
            clickButton(":Open Purchase Orders.Query_QToolButton");
            waitForObject(":Open Purchase Orders.New_QToolButton");
            clickButton(":Open Purchase Orders.New_QToolButton");
            waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
            type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_4");
            clickButton(":_lineItemsPage.New_QPushButton_4");
            waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
            type(":groupBox_2.ItemLineEdit_ItemLineEdit", "TBOX1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_ordered_XLineEdit_2");
            type(":_ordered_XLineEdit_2", "100");
            findObject(":_schedGroup.XDateEdit_XDateEdit_5").clear();
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
            type(":_schedGroup.XDateEdit_XDateEdit_5", "+9");
            
            waitForObject(":Purchase Order Item.Save_QPushButton");
            clickButton(":Purchase Order Item.Save_QPushButton");
            if(object.exists(":Purchase Order.Continue_QPushButton"))
            clickButton(":Purchase Order.Continue_QPushButton");
            
            
            waitForObject(":Purchase Order.Save_QPushButton");
            clickButton(":Purchase Order.Save_QPushButton");
            waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
            clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
            if (object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+PONUM+"' type='QModelIndex'}"))
                test.pass("Purchase Order is created" + PONUM);
            else
                test.fail("Purchase Order is not created");
            test.log("new Purchase Order created");
        }
        catch(e)
        {
            test.fail("Error in creating purchase order" + e);
        }
        
        
        
        try
        {
            PONUM++;
            waitForObject(":Open Purchase Orders.Query_QToolButton");
            clickButton(":Open Purchase Orders.Query_QToolButton");
            waitForObject(":Open Purchase Orders.New_QToolButton");
            clickButton(":Open Purchase Orders.New_QToolButton");
            waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
            type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_4");
            clickButton(":_lineItemsPage.New_QPushButton_4");
            waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
            type(":groupBox_2.ItemLineEdit_ItemLineEdit", "TBOX1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_ordered_XLineEdit_2");
            type(":_ordered_XLineEdit_2", "100");
            findObject(":_schedGroup.XDateEdit_XDateEdit_5").clear();
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
            type(":_schedGroup.XDateEdit_XDateEdit_5", "+9");            
            waitForObject(":Purchase Order Item.Save_QPushButton");
            clickButton(":Purchase Order Item.Save_QPushButton");
            if(object.exists(":Purchase Order.Continue_QPushButton"))
            clickButton(":Purchase Order.Continue_QPushButton");
            waitForObject(":Purchase Order.Save_QPushButton");
            clickButton(":Purchase Order.Save_QPushButton");
            waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
            clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");          
            if (object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+PONUM+"' type='QModelIndex'}"))
                test.pass("Purchase Order is created" + PONUM );
            else
                test.fail("Purchase Order is not created");
            test.log("new Purchase Order created");
        }
        catch(e)
        {
            test.fail("Error in creating purchase order" + e);
        }
        
        try
        {
            PONUM++;
            waitForObject(":Open Purchase Orders.Query_QToolButton");
            clickButton(":Open Purchase Orders.Query_QToolButton");
            waitForObject(":Open Purchase Orders.New_QToolButton");
            clickButton(":Open Purchase Orders.New_QToolButton");
            waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
            type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
            nativeType("<Tab>");
            snooze(0.5);       
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_4");
            clickButton(":_lineItemsPage.New_QPushButton_4");
            waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
            type(":groupBox_2.ItemLineEdit_ItemLineEdit", "TBOX1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_ordered_XLineEdit_2");
            type(":_ordered_XLineEdit_2", "100");
            findObject(":_schedGroup.XDateEdit_XDateEdit_5").clear();
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
            type(":_schedGroup.XDateEdit_XDateEdit_5", "+9");            
            waitForObject(":Purchase Order Item.Save_QPushButton");
            clickButton(":Purchase Order Item.Save_QPushButton");
            if(object.exists(":Purchase Order.Continue_QPushButton"))
            clickButton(":Purchase Order.Continue_QPushButton");
            waitForObject(":Purchase Order.Save_QPushButton");
            clickButton(":Purchase Order.Save_QPushButton");
            waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
            clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");            
            if (object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+PONUM+"' type='QModelIndex'}"))
                test.pass("Purchase Order is created" + PONUM);
            else
                test.fail("Purchase Order is not created");
            test.log("new Purchase Order created");
        }
        catch(e)
        {
            test.fail("Error in creating purchase order" + e);
        }
        
        try
        {
            PONUM++;
            waitForObject(":Open Purchase Orders.Query_QToolButton");
            clickButton(":Open Purchase Orders.Query_QToolButton");
            waitForObject(":Open Purchase Orders.New_QToolButton");
            clickButton(":Open Purchase Orders.New_QToolButton");
            waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
            type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
            nativeType("<Tab>");
            snooze(0.5);           
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_4");
            clickButton(":_lineItemsPage.New_QPushButton_4");
            waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
            type(":groupBox_2.ItemLineEdit_ItemLineEdit", "TBOX1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_ordered_XLineEdit_2");
            type(":_ordered_XLineEdit_2", "100");
            findObject(":_schedGroup.XDateEdit_XDateEdit_5").clear();
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
            type(":_schedGroup.XDateEdit_XDateEdit_5", "+9");            
            waitForObject(":Purchase Order Item.Save_QPushButton");
            clickButton(":Purchase Order Item.Save_QPushButton");
            if(object.exists(":Purchase Order.Continue_QPushButton"))
            clickButton(":Purchase Order.Continue_QPushButton");
            waitForObject(":Purchase Order.Save_QPushButton");
            clickButton(":Purchase Order.Save_QPushButton");
            waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
            clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");            
            if (object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+PONUM+"' type='QModelIndex'}"))
                test.pass("Purchase Order is created" + PONUM);
            else
                test.fail("Purchase Order is not created");
            test.log("new Purchase Order created");
        }
        catch(e)
        {
            test.fail("Error in creating purchase order" + e);
        }
        
        try
        { 
            PONUM++;
            waitForObject(":Open Purchase Orders.Query_QToolButton");
            clickButton(":Open Purchase Orders.Query_QToolButton");
            waitForObject(":Open Purchase Orders.New_QToolButton");
            clickButton(":Open Purchase Orders.New_QToolButton");
            waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
            type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
            nativeType("<Tab>");
            snooze(0.5);          
            waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_4");
            clickButton(":_lineItemsPage.New_QPushButton_4");
            waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
            type(":groupBox_2.ItemLineEdit_ItemLineEdit", "TBOX1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_ordered_XLineEdit_2");
            type(":_ordered_XLineEdit_2", "100");
            findObject(":_schedGroup.XDateEdit_XDateEdit_5").clear();
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_5");
            type(":_schedGroup.XDateEdit_XDateEdit_5", "+9");            
            waitForObject(":Purchase Order Item.Save_QPushButton");
            clickButton(":Purchase Order Item.Save_QPushButton");
            if(object.exists(":Purchase Order.Continue_QPushButton"))
            clickButton(":Purchase Order.Continue_QPushButton");
            waitForObject(":Purchase Order.Save_QPushButton");
            clickButton(":Purchase Order.Save_QPushButton");
            waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
            clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");           
            if (object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+PONUM+"' type='QModelIndex'}"))
                test.pass("Purchase Order is created" + PONUM);
            else
                test.fail("Purchase Order is not created");
            test.log("new Purchase Order created");
        }
        catch(e)
        {
            test.fail("Error in creating purchase order" + e);
        }
        
        
        waitForObject(":Open Purchase Orders.Close_QToolButton");
        clickButton(":Open Purchase Orders.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in opening list of purchase orders screen" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Purchase",10,10,0,Qt.LeftButton);
        
        //-------Capturing Purchase order,Voucher,Purchase request numbers---
        var PONUM=findObject(":_nextPoNumber_XLineEdit").text;
        var VONUM=findObject(":_nextVcNumber_XLineEdit").text;
        var PRNUM=findObject(":_nextPrNumber_XLineEdit").text;
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing purchase order numbers" + e);
    }
    
    
    //------List Unposted Purchase Order------  
    try
    {
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":List Open Purchase Orders.Unreleased_XCheckBox");
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        snooze(0.5);
        waitForObject(":Open Purchase Orders.Query_QToolButton");
        clickButton(":Open Purchase Orders.Query_QToolButton");     
        try
        {
            PONUM--;
            waitForObject(":_list_XTreeWidget_5");
            openItemContextMenu(":_list_XTreeWidget_5",PONUM,5,5,0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
            test.log("Post Purchase Order:" + PONUM);
        }
        catch(e)
        {
            test.fail("Error in posting purchase order" + e);
        }
        
        try
        {
            PONUM--;
            waitForObject(":_list_XTreeWidget_5");
            openItemContextMenu(":_list_XTreeWidget_5",PONUM,5,5,0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
            test.log("Post Purchase Order:" + PONUM);
        }
        catch(e)
        {
            test.fail("Error in posting purchase order" + e);
        }
        
        
        
        try
        {
            PONUM--;
            waitForObject(":_list_XTreeWidget_5");
            openItemContextMenu(":_list_XTreeWidget_5",PONUM,5,5,0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
            test.log("Post Purchase Order:" + PONUM);
        }
        catch(e)
        {
            test.fail("Error in posting purchase order" + e);
        }
        
        try
        {
            PONUM--;
            waitForObject(":_list_XTreeWidget_5");
            openItemContextMenu(":_list_XTreeWidget_5",PONUM,5,5,0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
            test.log("Post Purchase Order:" + PONUM);
        }
        catch(e)
        {
            test.fail("Error in posting purchase order" + e);
        }
        
        waitForObject(":Open Purchase Orders.Close_QToolButton");
        clickButton(":Open Purchase Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in opening list of purchase orders screen " + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales",10,10,0,Qt.LeftButton);
        
        
        //-----Capturing Sales order,Quote,Invoice numbers----------
        var SONUM=findObject(":Sales Configuration._nextSoNumber_XLineEdit").text;
        var QUNUM=findObject(":Sales Configuration._nextQuNumber_XLineEdit").text;
        var INNUM=findObject(":Sales Configuration._nextInNumber_XLineEdit").text;
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing sales order numbers" + e);
    }
    
    
    
    //----Issue stock to Shipping ----    
    try
    {
        SONUM=SONUM-8;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit");
        type(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issue stocked to Shipping:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in  issuing stock to sales order" + e);
    }
    
    
    //----Ship Order----   
    try
    {
        SONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit");
        type(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        waitForObject(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Select for Billing_QCheckBox").checked == true)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issue stocked and shiped:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in shipping sales  order" + e);
    }
    
    
    //----Ship Order----  
    try
    {
        SONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit");
        type(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        waitForObject(":groupBox.Select for Billing_QCheckBox");
        if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issue stocked, shiped and selected for Billing:"+ SONUM);
    }
    catch(e)
    {
        test.fail("Error in shipping sales  order" + e);
    }
    
    //----Ship Order----
    try
    {
        SONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit");
        type(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        waitForObject(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Select for Billing_QCheckBox").checked==false)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked ==false)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        
        waitForObject(":Issue to Shipping.Cancel_QPushButton");
        clickButton(":Issue to Shipping.Cancel_QPushButton");
        
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issue stocked,shiped and invoice created:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in shipping sales order" + e);
    }
    
    //----Ship Order----   
    try
    {
        SONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit");
        type(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        waitForObject(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Select for Billing_QCheckBox").checked==true)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == false)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        waitForObject(":*.Cancel_QPushButton_3");
        clickButton(":*.Cancel_QPushButton_3")
                
                waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issue stocked,shipped and invoice posted:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in shipping sales order" + e);
    }
    
    
    
    
    //----Ship Order----  
    try
    {
        SONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit");
        type(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        waitForObject(":groupBox.Select for Billing_QCheckBox");
        if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issue stocked, shiped and selected for Billing:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in shipping sales order" + e);
    }
    
    
    
    //----Ship Order----   
    try
    {
        SONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit");
        type(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        waitForObject(":groupBox.Select for Billing_QCheckBox");
        if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issue stocked, shiped and selected for Billing:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in shipping sales order" + e);
    }
    
    
    //----------Issue Stock--------------
    try
    {
        SONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit");
        type(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit", SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issue stocked to Shipping:" + SONUM);   
    }
    catch(e)
    {
        test.fail("Error in issuing stock to sales order" + e);
    }
    
    
    
    
    //----Create Receipt----
    try
    {
        PONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit");
        type(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit", PONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":Enter Order Receipts.Save_QPushButton");
        clickButton(":Enter Order Receipts.Save_QPushButton");
        test.log("Receive Order for PO:" + PONUM);
        waitForObject(":List Unposted Receipts.Close_QPushButton");
        clickButton(":List Unposted Receipts.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in receiving purchase order" + e);
    }
    
    try
    {
        PONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit");
        type(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit", PONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":_frame._orderitem_XTreeWidget");
        clickItem(":_frame._orderitem_XTreeWidget", "TBOX1", 5, 5, 1, Qt.LeftButton);
        waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_2");
        clickButton(":W/O Schedule by Planner Code.Post_QPushButton_2");
        waitForObject(":W/O Schedule by Planner Code.Close_QPushButton_2");
        clickButton(":W/O Schedule by Planner Code.Close_QPushButton_2");
        test.log("Receive Order for PO:" + PONUM);
        waitForObject(":List Unposted Receipts.Close_QPushButton");
        clickButton(":List Unposted Receipts.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in receiving purchase order" + e);
    }
    
    try
    {
        PONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit");
        type(":Enter Order Receipts.VirtualClusterLineEdit_OrderLineEdit", PONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":_frame._orderitem_XTreeWidget");
        clickItem(":_frame._orderitem_XTreeWidget", "TBOX1", 5, 5, 1, Qt.LeftButton);
        waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_2");
        clickButton(":W/O Schedule by Planner Code.Post_QPushButton_2");
        test.log("Receive Order for PO:" + PONUM);
        waitForObject(":W/O Schedule by Planner Code.Close_QPushButton_2");
        clickButton(":W/O Schedule by Planner Code.Close_QPushButton_2");
        waitForObject(":List Unposted Receipts.Close_QPushButton");
        clickButton(":List Unposted Receipts.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in receiving purchase order" + e);
    }
    
    
    
    //-----Post Invoice--------
    try
    {
        waitForObject(":xTuple ERP:*_QMenuBar_2");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObject(":xTuple ERP:*.Accounting_QMenu");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        waitForObject(":xTuple ERP:*.Accounts Receivable_QMenu");
        activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
        type(":xTuple ERP:*.Accounts Receivable_QMenu","<Right>");
        type(":xTuple ERP:*.Accounts Receivable_QMenu","<Right>");
        waitForObject(":xTuple ERP:*.Invoice_QMenu");
        activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        
        try
        {
            waitForObject(":_list_XTreeWidget");
            openItemContextMenu(":_list_XTreeWidget", INNUM, 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
            waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
            clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
//            
//    waitForObject(":Work Order Schedule.Query_QToolButton");
//    clickButton(":Work Order Schedule.Query_QToolButton");
//    waitForObject(":Tax Authorities.New_QToolButton");
//    clickButton(":Tax Authorities.New_QToolButton");
//    waitForObject(":Work Order.Close_QPushButton");
//    clickButton(":Work Order.Close_QPushButton");
//    waitForObject(":Work Order Schedule.Close_QToolButton");
//    clickButton(":Work Order Schedule.Close_QToolButton");
//    
            waitForObject(":Work Order Schedule.Close_QToolButton");
            clickButton(":Work Order Schedule.Close_QToolButton");
            test.log("Post Invoice:" + INNUM);
        }
        catch(e)
        {
            test.fail("Error in posting Invoices" + e);
        }
        
    }
    catch(e)
    {
        test.fail("Error in openning list of unposted invoices" + e);
    }
    
    
    
    //----Create Misc Invoice-----
    try
    {
        INNUM++;
        INNUM++;
        waitForObject(":xTuple ERP:*_QMenuBar_2");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObject(":xTuple ERP:*.Accounting_QMenu");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        waitForObject(":xTuple ERP:*.Accounts Receivable_QMenu");
        activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
        type(":xTuple ERP:*.Accounts Receivable_QMenu","<Right>");
        type(":xTuple ERP:*.Accounts Receivable_QMenu","<Right>");
        waitForObject(":xTuple ERP:*.Invoice_QMenu");
        activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        
        try
        {
            waitForObject(":Tax Authorities.New_QToolButton");
            clickButton(":Tax Authorities.New_QToolButton");
            waitForObject(":_billtoFrame.VirtualClusterLineEdit_CLineEdit");
            type(":_billtoFrame.VirtualClusterLineEdit_CLineEdit", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":lineItemsTab.New_QPushButton");
            clickButton(":lineItemsTab.New_QPushButton");
            waitForObject(":Item.ItemLineEdit_ItemLineEdit");
            type(":Item.ItemLineEdit_ItemLineEdit", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_ordered_XLineEdit");
            type(":_ordered_XLineEdit", "100");
            waitForObject(":_billed_XLineEdit");
            type(":_billed_XLineEdit", "100");
            type(":_billed_XLineEdit","<Tab>");
            waitForObject(":Invoice.Save_QPushButton");
            clickButton(":Invoice.Save_QPushButton");
            waitForObject(":Invoice.Save_QPushButton_2");
            clickButton(":Invoice.Save_QPushButton_2");
            waitForObject(":_list_XTreeWidget");
            if(!clickItem(":_list_XTreeWidget", INNUM, 5, 5, 1, Qt.LeftButton))
                test.pass("Invoice created:" + INNUM);
        }
        catch(e)
        {
            test.fail("Error in creating Invoice" + e);
        }
        
        try
        {
            INNUM++;
            waitForObject(":Tax Authorities.New_QToolButton");
            clickButton(":Tax Authorities.New_QToolButton");
            waitForObject(":_billtoFrame.VirtualClusterLineEdit_CLineEdit");
            type(":_billtoFrame.VirtualClusterLineEdit_CLineEdit", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":lineItemsTab.New_QPushButton");
            clickButton(":lineItemsTab.New_QPushButton");
            waitForObject(":Item.ItemLineEdit_ItemLineEdit");
            type(":Item.ItemLineEdit_ItemLineEdit", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_ordered_XLineEdit");
            type(":_ordered_XLineEdit", "100");
            waitForObject(":_billed_XLineEdit");    
            type(":_billed_XLineEdit", "100");
            type(":_billed_XLineEdit","<Tab>");
            waitForObject(":Invoice.Save_QPushButton");
            clickButton(":Invoice.Save_QPushButton");
            waitForObject(":Invoice.Save_QPushButton_2");
            clickButton(":Invoice.Save_QPushButton_2");
            waitForObject(":_list_XTreeWidget");
            if(!clickItem(":_list_XTreeWidget", INNUM, 5, 5, 1, Qt.LeftButton))
                test.pass("Invoice created:" + INNUM);
        }
        catch(e)
        {
            test.fail("Error in creating Invoice" + e);
        }
        
        
        try
        {
            INNUM++;
            waitForObject(":Tax Authorities.New_QToolButton");
            clickButton(":Tax Authorities.New_QToolButton");
            waitForObject(":_billtoFrame.VirtualClusterLineEdit_CLineEdit");
            type(":_billtoFrame.VirtualClusterLineEdit_CLineEdit", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":lineItemsTab.New_QPushButton");
            clickButton(":lineItemsTab.New_QPushButton");
            waitForObject(":Item.ItemLineEdit_ItemLineEdit");
            type(":Item.ItemLineEdit_ItemLineEdit", "YTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_ordered_XLineEdit");
            type(":_ordered_XLineEdit", "100");
            waitForObject(":_billed_XLineEdit");
            type(":_billed_XLineEdit", "100");
            type(":_billed_XLineEdit","<Tab>");
            waitForObject(":Invoice.Save_QPushButton");
            clickButton(":Invoice.Save_QPushButton");
            waitForObject(":Invoice.Save_QPushButton_2");
            clickButton(":Invoice.Save_QPushButton_2");
            waitForObject(":_list_XTreeWidget");
            if(!clickItem(":_list_XTreeWidget", INNUM, 5, 5, 1, Qt.LeftButton))
                test.pass("Invoice created:" + INNUM);
        }
        catch(e)
        {
            test.fail("Error in creating Invoice" + e);
        }
        
        
        
        
        //-----Post Invoice--------
        try
        {
            waitForObject(":_list_XTreeWidget");
            openItemContextMenu(":_list_XTreeWidget", INNUM, 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
            waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
            clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
            test.log("Posted Invoice:" + INNUM);
        }
        catch(e)
        {
            test.fail("Error in posting invoice" + e);
        }
        
        
        //---Post Invoice--- 
        try
        {
            INNUM--;
            waitForObject(":_list_XTreeWidget");
            openItemContextMenu(":_list_XTreeWidget", INNUM, 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
            waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
            clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
            snooze(0.5);
        }
        catch(e)
        {
            test.fail("Error in posting invoice" + e);
        }
        waitForObject(":Work Order Schedule.Close_QToolButton");
        clickButton(":Work Order Schedule.Close_QToolButton");
        test.log("Posted Invoice:" + INNUM);
    }
    catch(e)
    {
        test.fail("Error in opening list of unposted invoices screen " + e);
    }
    
    
    //--------Create Cash receipt and apply-----------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Cash Receipt");
        activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Cash Receipt");
        INNUM++;
        waitForObjectItem(":xTuple ERP:*.Cash Receipt_QMenu", "New...");
        activateItem(":xTuple ERP:*.Cash Receipt_QMenu", "New...");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        clickItem(":_applicationsTab._aropen_XTreeWidget", INNUM, 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":_applicationsTab.Apply_QPushButton");
        clickButton(":_applicationsTab.Apply_QPushButton");
        
        
        var amount=findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        type(":Cash Receipt.XLineEdit_XLineEdit", amount);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":_amountGroup.XLineEdit_XLineEdit_2");
        type(":_amountGroup.XLineEdit_XLineEdit_2", amount);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");
        test.pass("Cash Receipt created against Invoice:" + INNUM);
    }
    catch(e)
    {
        test.fail("Error in creating cash receipt" + e);
    }
    
    
    
    
    
    //----Accounting - Misc Voucher----
    try
    {
        VONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
        
        waitForObject(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit");
        type(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", "34");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_groupButton.Expense Category_QRadioButton");
        clickButton(":_groupButton.Expense Category_QRadioButton");
        waitForObject(":_expenseGroup.VirtualClusterLineEdit_ExpenseLineEdit");
        type(":_expenseGroup.VirtualClusterLineEdit_ExpenseLineEdit", "OFFICE");
        nativeType("<Tab>");
        snooze(0.5); 
        waitForObject(":Miscellaneous Voucher.Save_QPushButton");
        clickButton(":Miscellaneous Voucher.Save_QPushButton");        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
        type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
        type(":_dateGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":_referenceGroup._invoiceNum_XLineEdit");
        type(":_referenceGroup._invoiceNum_XLineEdit", "VOUCHER ");
        waitForObject(":_referenceGroup._reference_XLineEdit");
        type(":_referenceGroup._reference_XLineEdit", "ref - VOUCHER");
        waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
        test.log("Misc Voucher created:");
    }
    catch(e)
    {
        test.fail("Error in creating Misc voucher" + e);
    }
    
    
    //----Accounting - Misc Voucher----
    try
    {
        VONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
        
        waitForObject(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit");
        type(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", "34");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_groupButton.Expense Category_QRadioButton");
        clickButton(":_groupButton.Expense Category_QRadioButton");
        waitForObject(":_groupButton._expcat_ExpenseCluster");
        mouseClick(":_groupButton._expcat_ExpenseCluster", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_expenseGroup.VirtualClusterLineEdit_ExpenseLineEdit");
        type(":_expenseGroup.VirtualClusterLineEdit_ExpenseLineEdit", "OFFICE");
        nativeType("<Tab>");
        snooze(0.5); 
        waitForObject(":Miscellaneous Voucher.Save_QPushButton");
        clickButton(":Miscellaneous Voucher.Save_QPushButton");        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
        type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
        type(":_dateGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":_referenceGroup._invoiceNum_XLineEdit");
        type(":_referenceGroup._invoiceNum_XLineEdit", "VOUCHER");
        waitForObject(":_referenceGroup._reference_XLineEdit");
        type(":_referenceGroup._reference_XLineEdit", "ref - VOUCHER");
        waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
        snooze(1);
        if(object.exists(":Miscellaneous Voucher.Yes_QPushButton"))
            clickButton(":Miscellaneous Voucher.Yes_QPushButton");
        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
        test.log("Misc Voucher created:");
    }
    catch(e)
    {
        test.fail("Error in creating Misc voucher" + e);
    }
    
    
    
    //----Accounting - Misc Voucher----
    try
    {
        VONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObject(":xTuple ERP:*.Accounting_QMenu");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
        
        waitForObject(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit");
        type(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", "34");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_groupButton.Expense Category_QRadioButton");
        clickButton(":_groupButton.Expense Category_QRadioButton");
        waitForObject(":_groupButton._expcat_ExpenseCluster");
        mouseClick(":_groupButton._expcat_ExpenseCluster", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_expenseGroup.VirtualClusterLineEdit_ExpenseLineEdit");
        type(":_expenseGroup.VirtualClusterLineEdit_ExpenseLineEdit", "OFFICE");
        nativeType("<Tab>");
        snooze(0.5); 
        waitForObject(":Miscellaneous Voucher.Save_QPushButton");
        clickButton(":Miscellaneous Voucher.Save_QPushButton");        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
        type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
        type(":_dateGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":_referenceGroup._invoiceNum_XLineEdit");
        type(":_referenceGroup._invoiceNum_XLineEdit", "VOUCHER");
        waitForObject(":_referenceGroup._reference_XLineEdit");
        type(":_referenceGroup._reference_XLineEdit", "ref - VOUCHER");
        waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
        snooze(1);
        if(object.exists(":Miscellaneous Voucher.Yes_QPushButton"))
            clickButton(":Miscellaneous Voucher.Yes_QPushButton");
        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
        test.log("Misc Voucher created:");
    }
    catch(e)
    {
        test.fail("Error in creating Misc voucher" + e);
    }
    
    
    //-------Voucher----------
    try
    {
        PONUM--;
        VONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        
        waitForObject(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit", PONUM);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_poitem.100.00_QModelIndex");
        doubleClick(":_poitem.100.00_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_uninvoiced.Receiving_QModelIndex");
        openContextMenu(":_uninvoiced.Receiving_QModelIndex", 50, 9, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Split Receipt...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Split Receipt...");
        waitForObject(":*._toSplit_XLineEdit");
        type(":*._toSplit_XLineEdit", "50");
        waitForObject(":*.Split_QPushButton");
        clickButton(":*.Split_QPushButton");
        waitForObject(":_uninvoiced.Receiving_QModelIndex");
        doubleClick(":_uninvoiced.Receiving_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":*.Save_QPushButton_2");
        clickButton(":*.Save_QPushButton_2");
        waitForObject(":*.Save_QPushButton_3");
        clickButton(":*.Save_QPushButton_3");
        waitForObject(":_amount.XLineEdit_XLineEdit_2");
        type(":_amount.XLineEdit_XLineEdit_2", findObject(":_amount.XLineEdit_XLineEdit").text);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        mouseClick(":_dateGroup.XDateEdit_XDateEdit", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        type(":_dateGroup.XDateEdit_XDateEdit", "<0>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        mouseClick(":_dateGroup.XDateEdit_XDateEdit_3", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_invoiceNum_XLineEdit_2");
        mouseClick(":_invoiceNum_XLineEdit_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_invoiceNum_XLineEdit_2");
        type(":_invoiceNum_XLineEdit_2", "VO for Split Test");
        waitForObject(":_reference_XLineEdit_2");
        mouseClick(":_reference_XLineEdit_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_reference_XLineEdit_2");
        type(":_reference_XLineEdit_2", "ref- VO for Split Test")
                waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
        test.log("Voucher created for PO:" + PONUM);
    }
    catch(e)
    {
        test.fail("Error in creating voucher" + e);
    }
    
    
    
    //-------Post Vouchers---------
    try
    {
        VONUM=VONUM-3;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        
        try
        {
            waitForObject(":List Unposted Vouchers._vohead_XTreeWidget");
            openItemContextMenu(":List Unposted Vouchers._vohead_XTreeWidget", VONUM, 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
            waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
            clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
            test.log("Posted Voucher:" + VONUM);
        }
        catch(e)
        {
            test.fail("Error in posting voucher" + e);
        }
        
        try
        {
            VONUM++;
            waitForObject(":List Unposted Vouchers._vohead_XTreeWidget");
            openItemContextMenu(":List Unposted Vouchers._vohead_XTreeWidget", VONUM, 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
            waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
            clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
            test.log("Posted Voucher:" + VONUM);
        }
        catch(e)
        {
            test.fail("Error in posting voucher" + e);
        }
        
        try
        {
            VONUM++;
            waitForObject(":List Unposted Vouchers._vohead_XTreeWidget");
            openItemContextMenu(":List Unposted Vouchers._vohead_XTreeWidget", VONUM, 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
            waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
            clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
            test.log("Posted Voucher:" + VONUM);
        }
        catch(e)
        {
            test.fail("Error in posting voucher" + e);
        }
        
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in opening list of unposted vouchers" + e);
    }
    
    
    
    //-----prepare check run, post check------
    try
    {        
        VONUM--;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "Select...");
        
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", VONUM,5,5, 1, Qt.LeftButton);
        waitForObject(":frame.Select..._QPushButton");
        clickButton(":frame.Select..._QPushButton");
        waitForObjectItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Select Payments.Save_QPushButton");
        clickButton(":Select Payments.Save_QPushButton");
        waitForObject(":Select Payments.Close_QPushButton");
        clickButton(":Select Payments.Close_QPushButton");
        test.log("Selected for Payment:" + VONUM);
    }
    catch(e)
    {
        test.fail("Error in selecting voucher for payment" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
        
        waitForObject(":Prepare Check Run._bankaccnt_XComboBox");
        clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Prepare Check Run.Prepare_QPushButton");
        clickButton(":Prepare Check Run.Prepare_QPushButton");
        test.log("Prepared Check Run");
    }
    catch(e)
    {
        test.fail("Error in preparing check run" + e);
    }
    
    var linuxPath, winPath;
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Configure.Encryption_QModelIndex");
        mouseClick(":Configure.Encryption_QModelIndex", 41, 3, 0, Qt.LeftButton);
        
        waitForObject(":Encryption Configuration_FileLineEdit");
        winPath = findObject(":Encryption Configuration_FileLineEdit").text;
        
        
        waitForObject(":Encryption Configuration_FileLineEdit_2");
        linuxPath = findObject(":Encryption Configuration_FileLineEdit_2").text;
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in configuring the Encryption" + e);
    }
    
    
    //--------Post Check------------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        
        waitForObjectItem(":_frame._check_XTreeWidget", "No");
        clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_frame.Print_QPushButton");
        sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 5, 5, Qt.LeftButton, 0); 	
        waitForObjectItem(":_QMenu", "Selected Check...");
        activateItem(":_QMenu", "Selected Check...");
        waitForObject(":Print Check.Create EFT File_QPushButton");
        clickButton(":Print Check.Create EFT File_QPushButton");
        if(object.exists(":View Check Run.Yes_QPushButton_2"))    
            clickButton(":View Check Run.Yes_QPushButton_2");
        
        waitForObject(":fileNameEdit_QLineEdit_2");
        
        if(OS.name=="Linux")
            findObject(":fileNameEdit_QLineEdit_2").text = linuxPath.toString()+"/achFile.ach";
        else if(OS.name=="Windows")
            findObject(":fileNameEdit_QLineEdit_2").text = winPath.toString()+"/achFile.ach";  
        
        
        waitForObject(":EFT Output File.Save_QPushButton");
        clickButton(":EFT Output File.Save_QPushButton"); 
        snooze(3);     
        
        if(object.exists(":View Check Run.Yes_QPushButton_2"))    
            clickButton(":View Check Run.Yes_QPushButton_2");     
        
//        waitForObject(":*.Yes_QPushButton");
//        clickButton(":*.Yes_QPushButton");     
        waitForObject(":ACH File OK?.Yes_QPushButton");
        clickButton(":ACH File OK?.Yes_QPushButton");    
        
        
        test.log("Posted Check for Voucher:");
        
        snooze(1);
        waitForObject(":_frame.Post_QPushButton");
        sendEvent("QMouseEvent", ":_frame.Post_QPushButton", QEvent.MouseButtonPress, 61, 9, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "Selected Check...");
        activateItem(":_QMenu", "Selected Check...");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        
        waitForObject(":View Check Run.Close_QPushButton");
        clickButton(":View Check Run.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in posting checks" + e);
    }
    
    
    //-------Post Vouchers---------
    try
    {
        VONUM=VONUM-2;
    
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        
        try
        {
            waitForObject(":List Unposted Vouchers._vohead_XTreeWidget");
            openItemContextMenu(":List Unposted Vouchers._vohead_XTreeWidget",VONUM,5,5,0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
            waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
            clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
            waitForObject(":List Unposted Invoices.Continue_QPushButton");
            clickButton(":List Unposted Invoices.Continue_QPushButton");
            test.log("Posted Voucher:"+ VONUM);
        }
        catch(e)
        {
            test.fail("Error in posting voucher" + e);
        }
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton"); 
    }
    catch(e)
    {
        test.fail("Error in opening list of unposted vouchers screen" + e);
    }
    
    
    
    
    //--------Select--------
    try
    {
        VONUM++;
        VONUM++;  
        VONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "Select...");
        
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", VONUM,5,5, 1, Qt.LeftButton);
        waitForObject(":frame.Select..._QPushButton");
        clickButton(":frame.Select..._QPushButton");
        waitForObjectItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Select Payments.Save_QPushButton");
        clickButton(":Select Payments.Save_QPushButton");
        waitForObject(":Select Payments.Close_QPushButton");
        clickButton(":Select Payments.Close_QPushButton");
        
        test.log("Selected Payment for Voucher:" + VONUM);  
    }
    catch(e)
    {
        test.fail("Error in selecting payment for voucher" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
        
        waitForObject(":Prepare Check Run._bankaccnt_XComboBox");
        clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Prepare Check Run.Prepare_QPushButton");
        clickButton(":Prepare Check Run.Prepare_QPushButton");
        test.log("Prepared Check Run");
    }
    catch(e)
    {
        test.fail("Error in preparing check run" + e);
    }
    
    
    //--------Posting of Standard Journal---------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP:*.General Ledger_QMenu", "Standard Journals");
        activateItem(":xTuple ERP:*.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "List...");
        activateItem(":xTuple ERP:*.Standard Journals_QMenu", "List...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":Standard Journal_standardJournal");
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "STD journal");
        waitForObject(":*._descrip_XLineEdit");
        type(":*._descrip_XLineEdit", "standard journal");
        waitForObject(":*.New_QPushButton");
        clickButton(":*.New_QPushButton");
        
        waitForObject(":List Standard Journals_QLabel");
        sendEvent("QMouseEvent", ":List Standard Journals_QLabel", QEvent.MouseButtonPress, 11, 8, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","1000",10,10,0,Qt.LeftButton);
        waitForObject(":List Standard Journals.XLineEdit_XLineEdit");
        mouseClick(":List Standard Journals.XLineEdit_XLineEdit", 5, 5, 0, Qt.LeftButton);
        waitForObject(":List Standard Journals.XLineEdit_XLineEdit");
        type(":List Standard Journals.XLineEdit_XLineEdit", "500");
        waitForObject(":*.Save_QPushButton_3");
        clickButton(":*.Save_QPushButton_3");
        waitForObject(":*.New_QPushButton");
        clickButton(":*.New_QPushButton");
        waitForObject(":List Standard Journals_QLabel");
        sendEvent("QMouseEvent", ":List Standard Journals_QLabel", QEvent.MouseButtonPress, 11, 8, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","1100",10,10,0,Qt.LeftButton);
        waitForObject(":List Standard Journals.XLineEdit_XLineEdit");
        type(":List Standard Journals.XLineEdit_XLineEdit", "500");
        waitForObject(":*.Sense_QGroupBox");
        mouseClick(":*.Sense_QGroupBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Sense.Credit_QRadioButton");
        mouseClick(":Sense.Credit_QRadioButton", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*.Save_QPushButton_3");
        clickButton(":*.Save_QPushButton_3");
        waitForObject(":Standard Journal._notes_XTextEdit");
        type(":Standard Journal._notes_XTextEdit", "notes");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":_stdjrnl.standard journal_QModelIndex");
        mouseClick(":_stdjrnl.standard journal_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        mouseClick(":_dateGroup.XDateEdit_XDateEdit", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        type(":_dateGroup.XDateEdit_XDateEdit", "<0>");
        waitForObject(":*.Post_QPushButton");
        clickButton(":*.Post_QPushButton");
        waitForObject(":List Standard Journals.Post_QPushButton");
        clickButton(":List Standard Journals.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Journal Posted");
    }
    catch(e)
    {
        test.fail("Error in posting standard journal" + e);
    }
    
    
    
    //--------Verification of Journal Entry---------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP:*.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP:*.General Ledger_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Standard Journal History...");
        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Standard Journal History...");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        type(":_dateGroup.XDateEdit_XDateEdit", "<0>");
        waitForObject(":*.XDateEdit_XDateEdit");
        mouseClick(":*.XDateEdit_XDateEdit", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*.XDateEdit_XDateEdit");
        type(":*.XDateEdit_XDateEdit", "<0>");
        waitForObject(":Standard Journal History.Query_QToolButton");
        clickButton(":Standard Journal History.Query_QToolButton");
        snooze(0.5);
        if(object.exists(":_list.Yes_QModelIndex"))
            test.pass("Journal Entry is created ");
        waitForObject(":Standard Journal History.Close_QToolButton");
        clickButton(":Standard Journal History.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in posting of G/L entry" + e);
    }
    
    
    
    //----Enable Sales Reservation-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales",10,10,0,Qt.LeftButton);
        if(findObject(":general.Enable Sales Reservations_QCheckBox").checked==false)
            clickButton(":general.Enable Sales Reservations_QCheckBox");
        type(":general.Reserve by Location_QGroupBox"," ");
        snooze(0.5);
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Sales Reservation is enabled");
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in configuring sales module" + e);
    }
    
    
    //---Create Sales Order---
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        
        try
        {
            SONUM++;
            waitForObject(":Open Sales Orders.Query_QToolButton");
            clickButton(":Open Sales Orders.Query_QToolButton");
            waitForObject(":Open Sales Orders.New_QToolButton");
            clickButton(":Open Sales Orders.New_QToolButton");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "BTRUCK1");
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
            waitForObject(":Sales Order.Save_QPushButton_3");
            clickButton(":Sales Order.Save_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":_soitem.BTRUCK1_QModelIndex");
            mouseClick(":_soitem.BTRUCK1_QModelIndex", 5, 5, 0, Qt.LeftButton);
            waitForObject(":_lineItemsPage.Reserve Stock_QPushButton");
            clickButton(":_lineItemsPage.Reserve Stock_QPushButton");
            waitForObject(":To Reserve._qtyToIssue_XLineEdit");
            findObject(":To Reserve._qtyToIssue_XLineEdit").clear();
            type(":To Reserve._qtyToIssue_XLineEdit", "50");
            waitForObject(":Sales Order.Reserve_QPushButton");
            clickButton(":Sales Order.Reserve_QPushButton");
            waitForObject(":*.Save_QPushButton");
            clickButton(":*.Save_QPushButton");
            waitForObject(":Sales Order.Cancel_QPushButton_2");
            clickButton(":Sales Order.Cancel_QPushButton_2");
            waitForObject(":_list_XTreeWidget_4");
            if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
                test.pass("Sales Order created:" + SONUM);
            else
                test.fail("Sales Order is not created");
        }
        catch(e)
        {
            test.fail("Error in creating sales order" + e);
        }
        
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in opening list of sales order screen" + e);
    }
    
    
    //------------Sales order without tax-------
    
    //--------------Disassociating tax for an item-------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        doubleClickItem(":_list_XTreeWidget_7","STRUCK1",10,10,0,Qt.LeftButton);
        waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Tax Types");
        waitForObject(":_itemtax.Any_QModelIndex_2");
        mouseClick(":_itemtax.Any_QModelIndex_2", 20, 6, 0, Qt.LeftButton);
        waitForObject(":_taxtypesTab.Delete_QPushButton_2");
        clickButton(":_taxtypesTab.Delete_QPushButton_2");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
        test.log("Tax for item STRUCK1 is disassociated");
    }
    catch(e)
    {
        test.fail("Error in deleting tax for an item" + e);
    }
    
    
    //-----------Sales order creation---------------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        
        SONUM++;    
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "STRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Sales Order.Save_QPushButton_3");
        clickButton(":Sales Order.Save_QPushButton_3");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        waitForObject(":Sales Order.Save_QPushButton_4");
        clickButton(":Sales Order.Save_QPushButton_4");
        waitForObject(":Sales Order.Cancel_QPushButton_2");
        clickButton(":Sales Order.Cancel_QPushButton_2");
        waitForObject(":_list_XTreeWidget_4");
        if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
            test.pass("Sales Order created:" + SONUM);
        else
            test.fail("Sales Order is not created");
        
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating sales order" + e);
    }
    
    
    
    //-------------Sales Order with single tax 5%--------
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        waitForObject(":Tax Authorities.Query_QToolButton");
        clickButton(":Tax Authorities.Query_QToolButton");
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "Authority5");
        waitForObject(":*._name_XLineEdit");
        mouseClick(":*._name_XLineEdit", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Tax Authority5");
        waitForObject(":_currency_XComboBox");
        mouseClick(":_currency_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_currency.USD - $_QModelIndex");
        mouseClick(":_currency.USD - $_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_accountGroup_QLabel");
        sendEvent("QMouseEvent", ":_accountGroup_QLabel", QEvent.MouseButtonPress, 14, 8, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","1000",10,10,0,Qt.LeftButton);
        
        waitForObject(":groupBox...._QPushButton");
        clickButton(":groupBox...._QPushButton");
        waitForObject(":_listTab.1 Internal Revenue Way_QModelIndex_2");
        doubleClick(":_listTab.1 Internal Revenue Way_QModelIndex_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
        test.log("Tax authority is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax authority" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_taxZone_XLineEdit");
        type(":_taxZone_XLineEdit", "ZONE5");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Zone 5");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Zone is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax zone" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_taxClass_XLineEdit");
        type(":_taxClass_XLineEdit", "Class5");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Class5");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Class is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax class" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "Code5");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Code5");
        waitForObject(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit");
        mouseClick(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit", 58, 10, 0, Qt.LeftButton);
        waitForObject(":List Tax Codes_QLabel");
        sendEvent("QMouseEvent", ":List Tax Codes_QLabel", QEvent.MouseButtonPress, 13, 10, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","2000",10,10,0,Qt.LeftButton);
        waitForObject(":*._taxClass_XComboBox");
        mouseClick(":*._taxClass_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxClass_XComboBox", "Class5-Tax Class5");
        clickItem(":*._taxClass_XComboBox", "Class5-Tax Class5", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*._taxauth_XComboBox");
        mouseClick(":*._taxauth_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxauth_XComboBox", "AUTHORITY5");
        clickItem(":*._taxauth_XComboBox", "AUTHORITY5", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*.New_QPushButton");
        clickButton(":*.New_QPushButton");
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "5");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":xTuple ERP:*_QPushButton");
        clickButton(":xTuple ERP:*_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Code is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax code" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Type 5");
        waitForObject(":*._description_XLineEdit");
        type(":*._description_XLineEdit", "Tax Type5");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Type is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax type" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":*._taxZone_XComboBox");
        mouseClick(":*._taxZone_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_taxZone.ZONE5-Tax Zone 5_QModelIndex");
        mouseClick(":_taxZone.ZONE5-Tax Zone 5_QModelIndex", 5, 0, 0, Qt.LeftButton);
        waitForObject(":*._taxType_XComboBox");
        mouseClick(":*._taxType_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_taxType.Type 5_QModelIndex");
        mouseClick(":_taxType.Type 5_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_taxCodeOption.Code5_QModelIndex");
        mouseClick(":_taxCodeOption.Code5_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_frame.Add->_QPushButton");
        clickButton(":_frame.Add->_QPushButton");
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Assignment is created");
    }
    
    catch(e)
    {
        test.fail("Error in creating tax assignment" + e);
    }
    
    
    //--------Copy YTRUCK1-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        openItemContextMenu(":_list_XTreeWidget_7", "YTRUCK1",10,10,0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        waitForObject(":_targetItemNumber_XLineEdit");
        type(":_targetItemNumber_XLineEdit", "TAXTRUCK 5");
        waitForObject(":*.Copy_QPushButton");
        clickButton(":*.Copy_QPushButton");
        waitForObject(":*.Yes_QPushButton");
        clickButton(":*.Yes_QPushButton");
        waitForObject(":_warehouse_WComboBox_2");
        clickItem(":_warehouse_WComboBox_2","WH1",10,10,0,Qt.LeftButton);
        waitForObject(":_plannerCode_XComboBox");
        clickItem(":_plannerCode_XComboBox","MRP-MRP Items",10,10,0,Qt.LeftButton);
        waitForObject(":_costcat_XComboBox");
        clickItem(":_costcat_XComboBox","FINISHED-Finished Product - WH1",10,10,0,Qt.LeftButton);
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":*.Cancel_QPushButton_3");
        clickButton(":*.Cancel_QPushButton_3");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_7");
        doubleClickItem(":_list_XTreeWidget_7","TAXTRUCK 5",10,10,0,Qt.LeftButton);
        waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Tax Types");
        waitForObject(":_itemtax.Any_QModelIndex_2");
        mouseClick(":_itemtax.Any_QModelIndex_2", 51, 6, 0, Qt.LeftButton);
        waitForObject(":_taxtypesTab.Delete_QPushButton_2");
        clickButton(":_taxtypesTab.Delete_QPushButton_2");
        waitForObject(":_taxtypesTab.New_QPushButton_2");
        clickButton(":_taxtypesTab.New_QPushButton_2");
        waitForObject(":_taxtype_XComboBox_2");
        clickItem(":_taxtype_XComboBox_2","Type 5",10,10,0,Qt.LeftButton);
        
        waitForObject(":_taxzone_XComboBox_2");
        clickItem(":_taxzone_XComboBox_2","ZONE5-Tax Zone 5",10,10,0,Qt.LeftButton);
        waitForObject(":_taxzone_XComboBox_2");
        waitForObject(":Item.Save_QPushButton");
        clickButton(":Item.Save_QPushButton");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating item" + e);
    }
    
    
    
    
    //-------------Creating Customer--------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP:*.Customer_QMenu_2", "New...");
        activateItem(":xTuple ERP:*.Customer_QMenu_2", "New...");
        waitForObject(":Customer.VirtualClusterLineEdit_CLineEdit");
        type(":Customer.VirtualClusterLineEdit_CLineEdit", "Customer 5");
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Customer with tax 5");
        
        
       waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Settings");
        waitForObject(":_defaultGroup._salesrep_XComboBox");
        if(findObject(":_defaultGroup._salesrep_XComboBox").currentText!= "1000-Sam Masters")
            clickItem(":_defaultGroup._salesrep_XComboBox","1000-Sam Masters",0,0,1,Qt.LeftButton);
        waitForObject(":_settingsTab.Tax_QRadioButton");
        clickButton(":_settingsTab.Tax_QRadioButton");
        waitForObject(":_settingsStack._taxzone_XComboBox");
        mouseClick(":_settingsStack._taxzone_XComboBox", 55, 16, 0, Qt.LeftButton);
        waitForObject(":_taxzone.ZONE5-Tax Zone 5_QModelIndex_2");
        mouseClick(":_taxzone.ZONE5-Tax Zone 5_QModelIndex_2", 50, 2, 0, Qt.LeftButton);
        waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Addresses");
        
        waitForObject(":_addressTab.Ship To_QRadioButton");
        clickButton(":_addressTab.Ship To_QRadioButton");
        waitForObject(":_addressStack.New_QPushButton");
        clickButton(":_addressStack.New_QPushButton");
        waitForObject(":_shipToNumber_XLineEdit");
        type(":_shipToNumber_XLineEdit", "Store1");
        waitForObject(":_name_XLineEdit");
        type(":_name_XLineEdit", "Store1");
        waitForObject(":*._taxzone_XComboBox");
        mouseClick(":*._taxzone_XComboBox", 31, 10, 0, Qt.LeftButton);
        waitForObject(":_taxzone.ZONE5-Tax Zone 5_QModelIndex");
        mouseClick(":_taxzone.ZONE5-Tax Zone 5_QModelIndex", 33, 3, 0, Qt.LeftButton);
        waitForObject(":*.Save_QPushButton_3");
        clickButton(":*.Save_QPushButton_3");
        
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
        test.log("Customer Record is created");
    }
    catch(e)
    {
        test.fail("Error in creating customer" + e);
    }
    
    
    //--------------Create Sales order-----------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        SONUM++;
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "CUSTOMER 5");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "TAXTRUCK 5");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Sales Order.Save_QPushButton_3");
        clickButton(":Sales Order.Save_QPushButton_3");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        waitForObject(":Sales Order.Save_QPushButton_4");
        clickButton(":Sales Order.Save_QPushButton_4");
        waitForObject(":Sales Order.Cancel_QPushButton_2");
        clickButton(":Sales Order.Cancel_QPushButton_2");
        waitForObject(":_list_XTreeWidget_4");
        if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
            test.pass("Sales Order created:" + SONUM);
        else
            test.fail("Sales Order is not created");
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating sales order" + e);
    }
    
    
    
    //---------Sales Order with Multiple taxes(5% + 10%)-------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        waitForObject(":Tax Authorities.Query_QToolButton");
        clickButton(":Tax Authorities.Query_QToolButton");
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "Authority10");
        waitForObject(":*._name_XLineEdit");
        mouseClick(":*._name_XLineEdit", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Tax Authority10");
        waitForObject(":_currency_XComboBox");
        mouseClick(":_currency_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_currency.USD - $_QModelIndex");
        mouseClick(":_currency.USD - $_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_accountGroup_QLabel");
        sendEvent("QMouseEvent", ":_accountGroup_QLabel", QEvent.MouseButtonPress, 14, 8, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","1000",10,10,0,Qt.LeftButton);
        
        waitForObject(":groupBox...._QPushButton");
        clickButton(":groupBox...._QPushButton");
        waitForObject(":_listTab.1 Internal Revenue Way_QModelIndex_2");
        doubleClick(":_listTab.1 Internal Revenue Way_QModelIndex_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
        test.log("Tax Authority is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax authority" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_taxZone_XLineEdit");
        type(":_taxZone_XLineEdit", "ZONE10");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Zone 10");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Zone is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax zone" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_taxClass_XLineEdit");
        type(":_taxClass_XLineEdit", "Class10");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Class10");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Class is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax class" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "Code10");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Code10");
        waitForObject(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit");
        mouseClick(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit", 58, 10, 0, Qt.LeftButton);
        waitForObject(":List Tax Codes_QLabel");
        sendEvent("QMouseEvent", ":List Tax Codes_QLabel", QEvent.MouseButtonPress, 13, 10, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","2000",10,10,0,Qt.LeftButton);
        waitForObject(":*._taxClass_XComboBox");
        mouseClick(":*._taxClass_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxClass_XComboBox", "Class10-Tax Class10");
        clickItem(":*._taxClass_XComboBox", "Class10-Tax Class10", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*._taxauth_XComboBox");
        mouseClick(":*._taxauth_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxauth_XComboBox", "AUTHORITY10");
        clickItem(":*._taxauth_XComboBox", "AUTHORITY10", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*.New_QPushButton");
        clickButton(":*.New_QPushButton");
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "10");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":xTuple ERP:*_QPushButton");
        clickButton(":xTuple ERP:*_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Code is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax code" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Type 10");
        waitForObject(":*._description_XLineEdit");
        type(":*._description_XLineEdit", "Tax Type10");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Type is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax type" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":*._taxZone_XComboBox");
        mouseClick(":*._taxZone_XComboBox",5,5,0,Qt.LeftButton);
        waitForObject(":_taxZone.ZONE10-Tax Zone 10_QModelIndex");
        mouseClick(":_taxZone.ZONE10-Tax Zone 10_QModelIndex", 84, 4, 0, Qt.LeftButton);
        waitForObject(":*._taxType_XComboBox");
        mouseClick(":*._taxType_XComboBox",5,5,0,Qt.LeftButton);
        waitForObject(":_taxType.Type 10_QModelIndex");
        mouseClick(":_taxType.Type 10_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_taxCodeOption.Code10_QModelIndex");
        mouseClick(":_taxCodeOption.Code10_QModelIndex", 5, 5, 5, Qt.LeftButton);
        waitForObject(":_frame.Add->_QPushButton");
        clickButton(":_frame.Add->_QPushButton");
        waitForObject(":_taxCodeOption.Code5_QModelIndex");
        mouseClick(":_taxCodeOption.Code5_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_frame.Add->_QPushButton");
        clickButton(":_frame.Add->_QPushButton");
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Assignment is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax assignment" + e);
    }
    
    
    //--------Copy YTRUCK1-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        openItemContextMenu(":_list_XTreeWidget_7", "YTRUCK1",10,10,0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        waitForObject(":_targetItemNumber_XLineEdit");
        type(":_targetItemNumber_XLineEdit", "TAXTRUCK 10");
        waitForObject(":*.Copy_QPushButton");
        clickButton(":*.Copy_QPushButton");
        waitForObject(":*.Yes_QPushButton");
        clickButton(":*.Yes_QPushButton");
        waitForObject(":_warehouse_WComboBox_2");
        clickItem(":_warehouse_WComboBox_2","WH1",10,10,0,Qt.LeftButton);
        waitForObject(":_plannerCode_XComboBox");
        clickItem(":_plannerCode_XComboBox","MRP-MRP Items",10,10,0,Qt.LeftButton);
        waitForObject(":_costcat_XComboBox");
        clickItem(":_costcat_XComboBox","FINISHED-Finished Product - WH1",10,10,0,Qt.LeftButton);
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":*.Cancel_QPushButton_3");
        clickButton(":*.Cancel_QPushButton_3");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_7");
        doubleClickItem(":_list_XTreeWidget_7","TAXTRUCK 10",10,10,0,Qt.LeftButton);
        waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Tax Types");
        waitForObject(":_itemtax.Any_QModelIndex_2");
        mouseClick(":_itemtax.Any_QModelIndex_2", 51, 6, 0, Qt.LeftButton);
        waitForObject(":_taxtypesTab.Delete_QPushButton_2");
        clickButton(":_taxtypesTab.Delete_QPushButton_2");
        waitForObject(":_taxtypesTab.New_QPushButton_2");
        clickButton(":_taxtypesTab.New_QPushButton_2");
        waitForObject(":_taxtype_XComboBox_2");
        clickItem(":_taxtype_XComboBox_2","Type 10",10,10,0,Qt.LeftButton);
        
        waitForObject(":_taxzone_XComboBox_2");
        clickItem(":_taxzone_XComboBox_2","ZONE10-Tax Zone 10",10,10,0,Qt.LeftButton);
        waitForObject(":_taxzone_XComboBox_2");
        waitForObject(":Item.Save_QPushButton");
        clickButton(":Item.Save_QPushButton");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating item" + e);
    }
    
    
    
    //-------------Creating Customer--------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP:*.Customer_QMenu_2", "New...");
        activateItem(":xTuple ERP:*.Customer_QMenu_2", "New...");
        waitForObject(":Customer.VirtualClusterLineEdit_CLineEdit");
        type(":Customer.VirtualClusterLineEdit_CLineEdit", "Customer 10");
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Customer with tax 10");
        
        
        
          waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Settings");
        waitForObject(":_defaultGroup._salesrep_XComboBox");
        if(findObject(":_defaultGroup._salesrep_XComboBox").currentText!= "1000-Sam Masters")
            clickItem(":_defaultGroup._salesrep_XComboBox","1000-Sam Masters",0,0,1,Qt.LeftButton);
        waitForObject(":_settingsTab.Tax_QRadioButton");
        clickButton(":_settingsTab.Tax_QRadioButton");
        waitForObject(":_settingsStack._taxzone_XComboBox");
        mouseClick(":_settingsStack._taxzone_XComboBox", 55, 16, 0, Qt.LeftButton);
         waitForObject(":_taxzone.ZONE10-Tax Zone 10_QModelIndex_3");
        mouseClick(":_taxzone.ZONE10-Tax Zone 10_QModelIndex_3",5, 5, 0, Qt.LeftButton);
        waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Addresses");
        
        
        waitForObject(":_addressTab.Ship To_QRadioButton");
        clickButton(":_addressTab.Ship To_QRadioButton");
        waitForObject(":_addressStack.New_QPushButton");
        clickButton(":_addressStack.New_QPushButton");
        
        
        
        waitForObject(":_shipToNumber_XLineEdit");
        type(":_shipToNumber_XLineEdit", "Store1");
        waitForObject(":_name_XLineEdit");
        type(":_name_XLineEdit", "Store1");
        waitForObject(":*._taxzone_XComboBox");
        mouseClick(":*._taxzone_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_taxzone.ZONE10-Tax Zone 10_QModelIndex_2");
        mouseClick(":_taxzone.ZONE10-Tax Zone 10_QModelIndex_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*.Save_QPushButton_3");
        clickButton(":*.Save_QPushButton_3");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
        test.log("Customer Record is created");
    }
    catch(e)
    {
        test.fail("Error in creating customer" + e);
    }
    
    
    
    //--------------Create Sales order-----------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        SONUM++;
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "CUSTOMER 10");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "TAXTRUCK 10");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Sales Order.Save_QPushButton_3");
        clickButton(":Sales Order.Save_QPushButton_3");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        waitForObject(":Sales Order.Save_QPushButton_4");
        clickButton(":Sales Order.Save_QPushButton_4");
        waitForObject(":Sales Order.Cancel_QPushButton_2");
        clickButton(":Sales Order.Cancel_QPushButton_2");
        waitForObject(":_list_XTreeWidget_4");
        if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
            test.pass("Sales Order created:" + SONUM);
        else
            test.fail("Sales Order is not created");
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating sales order" + e);
    }
    
    
    
    
    
    //---------Sales Order with Multiple taxes(5% + 10% + 15%)-------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        waitForObject(":Tax Authorities.Query_QToolButton");
        clickButton(":Tax Authorities.Query_QToolButton");
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "Authority15");
        waitForObject(":*._name_XLineEdit");
        mouseClick(":*._name_XLineEdit", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Tax Authority15");
        waitForObject(":_currency_XComboBox");
        mouseClick(":_currency_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_currency.USD - $_QModelIndex");
        mouseClick(":_currency.USD - $_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_accountGroup_QLabel");
        sendEvent("QMouseEvent", ":_accountGroup_QLabel", QEvent.MouseButtonPress, 14, 8, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","1000",10,10,0,Qt.LeftButton);
        
        waitForObject(":groupBox...._QPushButton");
        clickButton(":groupBox...._QPushButton");
        waitForObject(":_listTab.1 Internal Revenue Way_QModelIndex_2");
        doubleClick(":_listTab.1 Internal Revenue Way_QModelIndex_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
        test.log("Tax Authority is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax authority" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_taxZone_XLineEdit");
        type(":_taxZone_XLineEdit", "ZONE15");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Zone 15");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Zone is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax zone" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_taxClass_XLineEdit");
        type(":_taxClass_XLineEdit", "Class15");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Class15");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Class is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax class" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "Code15");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Code15");
        waitForObject(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit");
        mouseClick(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit", 58, 10, 0, Qt.LeftButton);
        waitForObject(":List Tax Codes_QLabel");
        sendEvent("QMouseEvent", ":List Tax Codes_QLabel", QEvent.MouseButtonPress, 13, 10, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","2000",10,10,0,Qt.LeftButton);
        waitForObject(":*._taxClass_XComboBox");
        mouseClick(":*._taxClass_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxClass_XComboBox", "Class15-Tax Class15");
        clickItem(":*._taxClass_XComboBox", "Class15-Tax Class15", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*._taxauth_XComboBox");
        mouseClick(":*._taxauth_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxauth_XComboBox", "AUTHORITY15");
        clickItem(":*._taxauth_XComboBox", "AUTHORITY15", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*.New_QPushButton");
        clickButton(":*.New_QPushButton");
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "15");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":xTuple ERP:*_QPushButton");
        clickButton(":xTuple ERP:*_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Code is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax code" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Type 15");
        waitForObject(":*._description_XLineEdit");
        type(":*._description_XLineEdit", "Tax Type15");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Type is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax type" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":*._taxZone_XComboBox");
        mouseClick(":*._taxZone_XComboBox",5,5,0,Qt.LeftButton);
        waitForObject(":_taxZone.ZONE15-Tax Zone 15_QModelIndex");
        mouseClick(":_taxZone.ZONE15-Tax Zone 15_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*._taxType_XComboBox");
        mouseClick(":*._taxType_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_taxType.Type 15_QModelIndex");
        mouseClick(":_taxType.Type 15_QModelIndex", 5, 0, 0, Qt.LeftButton);
        waitForObject(":_taxCodeOption.Code5_QModelIndex");
        mouseClick(":_taxCodeOption.Code5_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_frame.Add->_QPushButton");
        clickButton(":_frame.Add->_QPushButton");
        waitForObject(":_taxCodeOption.Code10_QModelIndex");
        mouseClick(":_taxCodeOption.Code10_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_frame.Add->_QPushButton");
        clickButton(":_frame.Add->_QPushButton");
        waitForObject(":_taxCodeOption.Code15_QModelIndex");
        mouseClick(":_taxCodeOption.Code15_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_frame.Add->_QPushButton");
        clickButton(":_frame.Add->_QPushButton");
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Assignment is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax assignment" + e);
    }
    
    
    
    //--------Copy YTRUCK1-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        openItemContextMenu(":_list_XTreeWidget_7", "YTRUCK1",10,10,0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        waitForObject(":_targetItemNumber_XLineEdit");
        type(":_targetItemNumber_XLineEdit", "TAXTRUCK 15");
        waitForObject(":*.Copy_QPushButton");
        clickButton(":*.Copy_QPushButton");
        waitForObject(":*.Yes_QPushButton");
        clickButton(":*.Yes_QPushButton");
        waitForObject(":_warehouse_WComboBox_2");
        clickItem(":_warehouse_WComboBox_2","WH1",10,10,0,Qt.LeftButton);
        waitForObject(":_plannerCode_XComboBox");
        clickItem(":_plannerCode_XComboBox","MRP-MRP Items",10,10,0,Qt.LeftButton);
        waitForObject(":_costcat_XComboBox");
        clickItem(":_costcat_XComboBox","FINISHED-Finished Product - WH1",10,10,0,Qt.LeftButton);
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":*.Cancel_QPushButton_3");
        clickButton(":*.Cancel_QPushButton_3");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_7");
        doubleClickItem(":_list_XTreeWidget_7","TAXTRUCK 15",10,10,0,Qt.LeftButton);
        waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Tax Types");
        waitForObject(":_itemtax.Any_QModelIndex_2");
        mouseClick(":_itemtax.Any_QModelIndex_2", 51, 6, 0, Qt.LeftButton);
        waitForObject(":_taxtypesTab.Delete_QPushButton_2");
        clickButton(":_taxtypesTab.Delete_QPushButton_2");
        waitForObject(":_taxtypesTab.New_QPushButton_2");
        clickButton(":_taxtypesTab.New_QPushButton_2");
        waitForObject(":_taxtype_XComboBox_2");
        clickItem(":_taxtype_XComboBox_2","Type 15",10,10,0,Qt.LeftButton);
        
        waitForObject(":_taxzone_XComboBox_2");
        clickItem(":_taxzone_XComboBox_2","ZONE15-Tax Zone 15",10,10,0,Qt.LeftButton);
        waitForObject(":_taxzone_XComboBox_2");
        waitForObject(":Item.Save_QPushButton");
        clickButton(":Item.Save_QPushButton");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating item" + e);
    }
    
    
    
    //-------------Creating Customer--------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP:*.Customer_QMenu_2", "New...");
        activateItem(":xTuple ERP:*.Customer_QMenu_2", "New...");
        waitForObject(":Customer.VirtualClusterLineEdit_CLineEdit");
        type(":Customer.VirtualClusterLineEdit_CLineEdit", "Customer 15");
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Customer with tax 15");
        
        
            waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Settings");
        waitForObject(":_defaultGroup._salesrep_XComboBox");
        if(findObject(":_defaultGroup._salesrep_XComboBox").currentText!= "1000-Sam Masters")
            clickItem(":_defaultGroup._salesrep_XComboBox","1000-Sam Masters",0,0,1,Qt.LeftButton);
        waitForObject(":_settingsTab.Tax_QRadioButton");
        clickButton(":_settingsTab.Tax_QRadioButton");
        waitForObject(":_settingsStack._taxzone_XComboBox");
        mouseClick(":_settingsStack._taxzone_XComboBox", 55, 16, 0, Qt.LeftButton);
         waitForObject(":_taxzone.ZONE15-Tax Zone 15_QModelIndex_3");
        mouseClick(":_taxzone.ZONE15-Tax Zone 15_QModelIndex_3",5, 5, 0, Qt.LeftButton);
        waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Addresses");
                               
        waitForObject(":_addressTab.Ship To_QRadioButton");
        clickButton(":_addressTab.Ship To_QRadioButton");
        waitForObject(":_addressStack.New_QPushButton");
        clickButton(":_addressStack.New_QPushButton");
        waitForObject(":_shipToNumber_XLineEdit");
        type(":_shipToNumber_XLineEdit", "Store1");
        waitForObject(":_name_XLineEdit");
        type(":_name_XLineEdit", "Store1");
        waitForObject(":*._taxzone_XComboBox");
        mouseClick(":*._taxzone_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_taxzone.ZONE15-Tax Zone 15_QModelIndex_2");
        mouseClick(":_taxzone.ZONE15-Tax Zone 15_QModelIndex_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*.Save_QPushButton_3");
        clickButton(":*.Save_QPushButton_3");
        
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
        test.log("Customer Record is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating customer" + e);
    }
    
    
    
    
    //--------------Create Sales order-----------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        
        SONUM++;
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "CUSTOMER 15");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "TAXTRUCK 15");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Sales Order.Save_QPushButton_3");
        clickButton(":Sales Order.Save_QPushButton_3");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        waitForObject(":Sales Order.Save_QPushButton_4");
        clickButton(":Sales Order.Save_QPushButton_4");
        waitForObject(":Sales Order.Cancel_QPushButton_2");
        clickButton(":Sales Order.Cancel_QPushButton_2");
        waitForObject(":_list_XTreeWidget_4");
        if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
            test.pass("Sales Order created:" + SONUM);
        else
            test.fail("Sales Order is not created");
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating sales order" + e);
    }
    
    
    //---------Sales Order with Nested tax(5% + 10% )-------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        waitForObject(":Tax Authorities.Query_QToolButton");
        clickButton(":Tax Authorities.Query_QToolButton");
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "AuthorityNested");
        waitForObject(":*._name_XLineEdit");
        mouseClick(":*._name_XLineEdit", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Tax Authority Nested");
        waitForObject(":_currency_XComboBox");
        mouseClick(":_currency_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_currency.USD - $_QModelIndex");
        mouseClick(":_currency.USD - $_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_accountGroup_QLabel");
        sendEvent("QMouseEvent", ":_accountGroup_QLabel", QEvent.MouseButtonPress, 14, 8, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","1000",10,10,0,Qt.LeftButton);
        
        waitForObject(":groupBox...._QPushButton");
        clickButton(":groupBox...._QPushButton");
        waitForObject(":_listTab.1 Internal Revenue Way_QModelIndex_2");
        doubleClick(":_listTab.1 Internal Revenue Way_QModelIndex_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
        test.log("Tax Authority is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax authority" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_taxZone_XLineEdit");
        type(":_taxZone_XLineEdit", "ZONE NESTED");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Zone Nested");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Zone is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax zone" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_taxClass_XLineEdit");
        type(":_taxClass_XLineEdit", "Class Sequence 2");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Class Sequence 2");
        waitForObject(":List Tax Classes.qt_spinbox_lineedit_QLineEdit");
        mouseDrag(":List Tax Classes.qt_spinbox_lineedit_QLineEdit", 5, 5, 5, 0, 1, Qt.LeftButton);
        waitForObject(":List Tax Classes._seq_XSpinBox");
        type(":List Tax Classes._seq_XSpinBox", "2");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Class is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax class" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_taxClass_XLineEdit");
        type(":_taxClass_XLineEdit", "Class Sequence 3");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Class Sequence 3");
        waitForObject(":List Tax Classes.qt_spinbox_lineedit_QLineEdit");
        mouseDrag(":List Tax Classes.qt_spinbox_lineedit_QLineEdit", 5, 5, 5, 0, 1, Qt.LeftButton);
        waitForObject(":List Tax Classes._seq_XSpinBox");
        type(":List Tax Classes._seq_XSpinBox", "3");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Class is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax class" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "Code Sequence 2");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Code Sequence 2");
        waitForObject(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit");
        mouseClick(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit", 58, 10, 0, Qt.LeftButton);
        waitForObject(":List Tax Codes_QLabel");
        sendEvent("QMouseEvent", ":List Tax Codes_QLabel", QEvent.MouseButtonPress, 13, 10, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","2000",10,10,0,Qt.LeftButton);
        waitForObject(":*._taxClass_XComboBox");
        mouseClick(":*._taxClass_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxClass_XComboBox", "Class Sequence 2-Tax Class Sequence 2");
        clickItem(":*._taxClass_XComboBox", "Class Sequence 2-Tax Class Sequence 2", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*._taxauth_XComboBox");
        mouseClick(":*._taxauth_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxauth_XComboBox", "AUTHORITYNESTED");
        clickItem(":*._taxauth_XComboBox", "AUTHORITYNESTED", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*.New_QPushButton");
        clickButton(":*.New_QPushButton");
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "5");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":xTuple ERP:*_QPushButton");
        clickButton(":xTuple ERP:*_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Code is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax code" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "Code Sequence 3");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "Tax Code Sequence 3");
        waitForObject(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit");
        mouseClick(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit", 58, 10, 0, Qt.LeftButton);
        waitForObject(":List Tax Codes_QLabel");
        sendEvent("QMouseEvent", ":List Tax Codes_QLabel", QEvent.MouseButtonPress, 13, 10, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","2000",10,10,0,Qt.LeftButton);
        waitForObject(":*._taxClass_XComboBox");
        mouseClick(":*._taxClass_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxClass_XComboBox", "Class Sequence 3-Tax Class Sequence 3");
        clickItem(":*._taxClass_XComboBox", "Class Sequence 3-Tax Class Sequence 3", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*._taxauth_XComboBox");
        mouseClick(":*._taxauth_XComboBox",0,0,0,Qt.LeftButton);
        waitForObjectItem(":*._taxauth_XComboBox", "AUTHORITYNESTED");
        clickItem(":*._taxauth_XComboBox", "AUTHORITYNESTED", 5, 5, 1, Qt.LeftButton);
        waitForObject(":*.New_QPushButton");
        clickButton(":*.New_QPushButton");
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "10");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":xTuple ERP:*_QPushButton");
        clickButton(":xTuple ERP:*_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Code is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax code" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Type Nested");
        waitForObject(":*._description_XLineEdit");
        type(":*._description_XLineEdit", "Tax Type Nested");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Type is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax type" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        waitForObject(":List Unposted Receipts.New_QPushButton");
        clickButton(":List Unposted Receipts.New_QPushButton");
        waitForObject(":*._taxZone_XComboBox");
        mouseClick(":*._taxZone_XComboBox",5,5,0,Qt.LeftButton);
        waitForObjectItem(":*._taxZone_XComboBox","ZONE NESTED-Tax Zone Nested");
        clickItem(":*._taxZone_XComboBox","ZONE NESTED-Tax Zone Nested",5,5,0,Qt.LeftButton);
        waitForObject(":*._taxType_XComboBox");
        mouseClick(":*._taxType_XComboBox",5,5,0,Qt.LeftButton);
        waitForObjectItem(":*._taxType_XComboBox","Type Nested");
        clickItem(":*._taxType_XComboBox","Type Nested",5,5,0,Qt.LeftButton);
        waitForObject(":_frame._taxCodeOption_XTreeWidget");
        clickItem(":_frame._taxCodeOption_XTreeWidget","Code Sequence 2",5,5,0,Qt.LeftButton);
        waitForObject(":_frame.Add->_QPushButton");
        clickButton(":_frame.Add->_QPushButton");
        waitForObject(":_frame._taxCodeOption_XTreeWidget");
        clickItem(":_frame._taxCodeOption_XTreeWidget","Code Sequence 3",5,5,0,Qt.LeftButton);
        clickButton(":_frame.Add->_QPushButton");
        waitForObject(":*.Close_QPushButton");
        clickButton(":*.Close_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Tax Assignment is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating tax assignment" + e);
    }
    
    
    //--------Copy YTRUCK1-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        openItemContextMenu(":_list_XTreeWidget_7", "YTRUCK1",10,10,0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        waitForObject(":_targetItemNumber_XLineEdit");
        type(":_targetItemNumber_XLineEdit", "TAXTRUCK NESTED");
        waitForObject(":*.Copy_QPushButton");
        clickButton(":*.Copy_QPushButton");
        waitForObject(":*.Yes_QPushButton");
        clickButton(":*.Yes_QPushButton");
        waitForObject(":_warehouse_WComboBox_2");
        clickItem(":_warehouse_WComboBox_2","WH1",10,10,0,Qt.LeftButton);
        waitForObject(":_plannerCode_XComboBox");
        clickItem(":_plannerCode_XComboBox","MRP-MRP Items",10,10,0,Qt.LeftButton);
        waitForObject(":_costcat_XComboBox");
        clickItem(":_costcat_XComboBox","FINISHED-Finished Product - WH1",10,10,0,Qt.LeftButton);
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":*.Cancel_QPushButton_3");
        clickButton(":*.Cancel_QPushButton_3");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_7");
        doubleClickItem(":_list_XTreeWidget_7","TAXTRUCK NESTED",10,10,0,Qt.LeftButton);
        waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Tax Types");
        waitForObject(":_itemtax.Any_QModelIndex_2");
        mouseClick(":_itemtax.Any_QModelIndex_2", 51, 6, 0, Qt.LeftButton);
        waitForObject(":_taxtypesTab.Delete_QPushButton_2");
        clickButton(":_taxtypesTab.Delete_QPushButton_2");
        waitForObject(":_taxtypesTab.New_QPushButton_2");
        clickButton(":_taxtypesTab.New_QPushButton_2");
        waitForObject(":_taxtype_XComboBox_2");
        clickItem(":_taxtype_XComboBox_2","Type Nested",10,10,0,Qt.LeftButton);
        
        waitForObject(":_taxzone_XComboBox_2");
        clickItem(":_taxzone_XComboBox_2","ZONE NESTED-Tax Zone Nested",10,10,0,Qt.LeftButton);
        waitForObject(":_taxzone_XComboBox_2");
        waitForObject(":Item.Save_QPushButton");
        clickButton(":Item.Save_QPushButton");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in creating item" + e);
    }
    
    
    //-------------Creating Customer--------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP:*.Customer_QMenu_2", "New...");
        activateItem(":xTuple ERP:*.Customer_QMenu_2", "New...");
        waitForObject(":Customer.VirtualClusterLineEdit_CLineEdit");
        type(":Customer.VirtualClusterLineEdit_CLineEdit", "Customer Nested");
        waitForObject(":*._name_XLineEdit");
        type(":*._name_XLineEdit", "Customer with Nested Tax");
        
            waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Settings");
        waitForObject(":_defaultGroup._salesrep_XComboBox");
        if(findObject(":_defaultGroup._salesrep_XComboBox").currentText!= "1000-Sam Masters")
            clickItem(":_defaultGroup._salesrep_XComboBox","1000-Sam Masters",0,0,1,Qt.LeftButton);
        waitForObject(":_settingsTab.Tax_QRadioButton");
        clickButton(":_settingsTab.Tax_QRadioButton");
        waitForObject(":_settingsStack._taxzone_XComboBox");
        mouseClick(":_settingsStack._taxzone_XComboBox", 55, 16, 0, Qt.LeftButton);
         waitForObject(":_taxzone.ZONE NESTED-Tax Zone Nested_QModelIndex_3");
        mouseClick(":_taxzone.ZONE NESTED-Tax Zone Nested_QModelIndex_3",5, 5, 0, Qt.LeftButton);
        waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
        clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Addresses");
        
        
        waitForObject(":_addressTab.Ship To_QRadioButton");
        clickButton(":_addressTab.Ship To_QRadioButton");
        waitForObject(":_addressStack.New_QPushButton");
        clickButton(":_addressStack.New_QPushButton");
        waitForObject(":_shipToNumber_XLineEdit");
        type(":_shipToNumber_XLineEdit", "Store1");
        waitForObject(":_name_XLineEdit");
        type(":_name_XLineEdit", "Store1");
        waitForObject(":*._taxzone_XComboBox");
        mouseClick(":*._taxzone_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_taxzone.ZONE NESTED-Tax Zone Nested_QModelIndex_2");
        mouseClick(":_taxzone.ZONE NESTED-Tax Zone Nested_QModelIndex_2", 87, 7, 0, Qt.LeftButton);
        waitForObject(":*.Save_QPushButton_3");
        clickButton(":*.Save_QPushButton_3");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
        test.log("Customer Record is created"); 
    }
    catch(e)
    {
        test.fail("Error in creating customer" + e);
    }
    
    
    
    
    //--------------Create Sales order-----------
    try
    {
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        SONUM++;
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "CUSTOMER NESTED");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_3", "TAXTRUCK NESTED");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Sales Order.Save_QPushButton_3");
        clickButton(":Sales Order.Save_QPushButton_3");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        waitForObject(":Sales Order.Save_QPushButton_4");
        clickButton(":Sales Order.Save_QPushButton_4");
        waitForObject(":Sales Order.Cancel_QPushButton_2");
        clickButton(":Sales Order.Cancel_QPushButton_2");
        waitForObject(":_list_XTreeWidget_4");
        if (object.exists("{column='0' container=':_list_XTreeWidget_4' text='"+SONUM+"' type='QModelIndex'}"))
            test.pass("Sales Order created:" + SONUM);
        else
            test.fail("Sales Order is not created");
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating sales order" + e);
    }
    
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales",10,10,0,Qt.LeftButton);
        
        
        //-----Capturing Sales order,Quote,Invoice numbers----------
        var SONUM=findObject(":Sales Configuration._nextSoNumber_XLineEdit").text;
        var QUNUM=findObject(":Sales Configuration._nextQuNumber_XLineEdit").text;
        var INNUM=findObject(":Sales Configuration._nextInNumber_XLineEdit").text;
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing sales order numbers" + e);
    }
    
    
    //----------Select Order for Billing--------
    try
    {
        SONUM=SONUM-9;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP:*.Invoice_QMenu_2", "Select Order for Billing...");
        activateItem(":xTuple ERP:*.Invoice_QMenu_2", "Select Order for Billing...");
        
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit",SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        clickItem(":_lineitemsTab._soitem_XTreeWidget","EA",10,10,0, Qt.LeftButton);
        
        waitForObject(":_lineitemsTab.Select Balance_QPushButton");
        clickButton(":_lineitemsTab.Select Balance_QPushButton");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Selected for Billing:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in selecting order for billing" + e);
    }
    
    
    //----------Select Order for Billing--------
    try
    {
        SONUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        type(":xTuple ERP:*.Sales_QMenu", "<Down>");
        type(":xTuple ERP:*.Sales_QMenu", "<Down>");
        type(":xTuple ERP:*.Sales_QMenu", "<Down>");
        waitForObject(":xTuple ERP:*.Sales_QMenu");
        type(":xTuple ERP:*.Sales_QMenu", "<Right>");
        type(":xTuple ERP:*.Billing_QMenu", "<Right>");
        waitForObject(":xTuple ERP:*.Invoice_QMenu_2");
        type(":xTuple ERP:*.Invoice_QMenu_2", "<Down>");
        type(":xTuple ERP:*.Invoice_QMenu_2", "<Down>");
        waitForObject(":xTuple ERP:*.Invoice_QMenu_2");
        type(":xTuple ERP:*.Invoice_QMenu_2", "<Return>");
        
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit",SONUM);
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        clickItem(":_lineitemsTab._soitem_XTreeWidget","EA",10,10,0, Qt.LeftButton);
        
        waitForObject(":_lineitemsTab.Select Balance_QPushButton");
        clickButton(":_lineitemsTab.Select Balance_QPushButton");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Selected for Billing:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in selecting order for billing" + e);
    }
    
    
}
