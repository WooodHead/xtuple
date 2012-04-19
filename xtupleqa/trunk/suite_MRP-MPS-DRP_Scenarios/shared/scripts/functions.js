

//-----Log into Applicaiton---  
try
{
    function loginAppl(userrole)
    {
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
        
        waitForObject(":Log In.Options..._QPushButton_2");
        clickButton(":Log In.Options..._QPushButton_2");
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
        waitForObject(":Login Options.Save_QPushButton_2");
        clickButton(":Login Options.Save_QPushButton_2");
        waitForObject(":_username_QLineEdit");    
        type(":_username_QLineEdit", username);
        waitForObject(":_username_QLineEdit");
        type(":_username_QLineEdit", "<Tab>");
        waitForObject(":_password_QLineEdit");
        type(":_password_QLineEdit", pwd);
        waitForObject(":Log In.Login_QPushButton_2");
        clickButton(":Log In.Login_QPushButton_2");
        test.log("Logged in Application");
    }
}
catch(e)
{
    test.fail("Error in logging to application" + e);
}


try
{
    function QOHZero(item)
    {
        //--------Reset the QOH of an Item to Zero--------
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        snooze(1);
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit",item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        waitForObject(":_qtyGroup.*_XLabel");
        if(findObject(":_qtyGroup.*_XLabel").text!= "0.00")
        {
            type(":_qty_XLineEdit", "0");
            waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
            waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            test.log("QOH of "+item+" adjusted to Zero");
        }
        else
        {
            waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            test.log("QOH of "+item+" is already Zero");
        }
        
    }
}
catch(e)
{
    test.fail("Error in resetting QOH of an item to zero" + e);
}


try
{
    function QOHZeroWh(item,wh)
    {
        //--------Reset the QOH of an Item within a Warehouse specified to Zero--------
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit",item);
        nativeType("<Tab>");
        snooze(0.5);
        
       
        waitForObject(":_itemGroup._warehouse_WComboBox");
        if(findObject(":_itemGroup._warehouse_WComboBox").currentText!=wh)
            type(":_itemGroup._warehouse_WComboBox",wh);
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        waitForObject(":_qtyGroup.*_XLabel");
        if(findObject(":_qtyGroup.*_XLabel").text!= "0.00")
        {
            type(":_qty_XLineEdit", "0");
            waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
            waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            test.log("QOH of "+item+" adjusted to Zero");
        }
        else
        {
            waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            test.log("QOH of "+item+" is already Zero");
        }
        
    }
}
catch(e)
{
    test.fail("Error in resetting QOH of an item within to warehouse to zero" + e);
}


try
{
    function UpdateQOH(item, quant)
    {
        //--------Reset the QOH of an Item to Zero--------
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit",item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        waitForObject(":_qtyGroup.*_XLabel");
        var qnt = quant +".00";
        var existing_quant = findObject(":_qtyGroup.*_XLabel").text;
        existing_quant = replaceSubstring(existing_quant.latin1(),",","");
        if(existing_quant!=qnt)
        {
            type(":_qty_XLineEdit", qnt);
            waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
            snooze(2); //wait to check for lot allocation
            if(object.exists(":_itemGroup.*_QLabel"))
            {
                waitForObject(":_lotSerial_QLineEdit");
                type(":_lotSerial_QLineEdit", "1");
                waitForObject(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit");
                var lot_quant = findObject(":_itemGroup.*_QLabel").text;
                lot_quant = replaceSubstring(lot_quant.latin1(),",","");
                type(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit", lot_quant);
                waitForObject(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit");
                type(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit", "+30");
                waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
                clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
                waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton_2");
                clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton_2");
                
                
            }
            
            waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            test.log("Update the Quantity of "+item+"to "+quant);
        }
        else
        {
            waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            test.log("QOH of "+item+" is already "+quant);
        }
        
        test.log("QOH of "+item+" adjusted to "+quant);
    }
}
catch(e)
{
    test.fail("Error in updating QOH of an item" + e);
}


try
{
    function UpdateQOHWh(item, quant,wh)
    {
        //--------Reset the QOH of an Item to Zero--------
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit",item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_itemGroup._warehouse_WComboBox");
        clickItem(":_itemGroup._warehouse_WComboBox", wh, 0, 0, 1, Qt.LeftButton);
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        waitForObject(":_qtyGroup.*_XLabel");
        var qnt = quant +".00";
        var existing_quant = findObject(":_qtyGroup.*_XLabel").text;
        existing_quant = replaceSubstring(existing_quant.latin1(),",","");
        if(existing_quant!=qnt)
        {
            type(":_qty_XLineEdit", qnt);
            waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
            snooze(2); //wait to check for lot allocation
            if(object.exists(":_itemGroup.*_QLabel"))
            {
                waitForObject(":_lotSerial_QLineEdit");
                type(":_lotSerial_QLineEdit", "1");
                waitForObject(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit");
                var lot_quant = findObject(":_itemGroup.*_QLabel").text;
                lot_quant = replaceSubstring(lot_quant.latin1(),",","");
                type(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit", lot_quant);
                waitForObject(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit");
                type(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit", "+30");
                waitForObject(":Enter Miscellaneous Adjustment.Assign_QPushButton");
                clickButton(":Enter Miscellaneous Adjustment.Assign_QPushButton");
                waitForObject(":Enter Miscellaneous Adjustment.Assign_QPushButton");
                clickButton(":Enter Miscellaneous Adjustment.Assign_QPushButton");
                
            }
            
            waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            test.log("Update the Quantity of "+item+"to "+quant);
        }
        else
        {
            waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
            test.log("QOH of "+item+" is already "+quant);
        }
        
        test.log("QOH of "+item+" adjusted to "+quant);
    }
}
catch(e)
{
    test.fail("Error in updating QOH of an item within a warehouse" + e);
}



try
{
    function MRP(period)
    {
        //--------Run MRP---------
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        waitForObjectItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
        activateItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
        waitForObject(":_warehouse.All Sites_QRadioButton");
        clickButton(":_warehouse.All Sites_QRadioButton");
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton");
        waitForObject(":_optionsGroup.XDateEdit_XDateEdit");
        type(":_optionsGroup.XDateEdit_XDateEdit", period);
        type(":_optionsGroup.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Run MRP by Planner Code.OK_QPushButton");
        clickButton(":Run MRP by Planner Code.OK_QPushButton");
        test.log("MRP run for period of "+period+" days");
        
    }
}
catch(e)
{
    test.fail("Error in running MRP" + e);
}


try
{
    function MRPbyItem(item,site,period)
    {    
        
        //---------------Run MRP By Item-----------------------
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
        waitForObjectItem(":xTuple ERP:*.Run MRP_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Run MRP_QMenu", "by Item...");
        waitForObject(":Run MRP by Item.ItemLineEdit_ItemLineEdit");
        type(":Run MRP by Item.ItemLineEdit_ItemLineEdit", item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_warehouse_WComboBox_9");
        clickItem(":_warehouse_WComboBox_9",site,10,10,0,Qt.LeftButton);
        waitForObject(":Run MRP by Item.XDateEdit_XDateEdit");
        type(":Run MRP by Item.XDateEdit_XDateEdit", period);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Run MRP by Item.Create_QPushButton");
        clickButton(":Run MRP by Item.Create_QPushButton");
        waitForObject(":Run MRP by Item.Close_QPushButton");
        clickButton(":Run MRP by Item.Close_QPushButton");
    }
    
}
catch(e)
{
    test.fail("Error in running MRP by item" + e);
}


try
{
    function MPS(period)
    {
        //---------Run MPS----------
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MPS...");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MPS...");
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_5");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_2");
        waitForObject(":Run MPS by Planner Code.XDateEdit_XDateEdit");
        type(":Run MPS by Planner Code.XDateEdit_XDateEdit", period);
        type(":Run MPS by Planner Code.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Run MPS by Planner Code.Create_QPushButton");
        clickButton(":Run MPS by Planner Code.Create_QPushButton");
        test.log("MPS run for period of "+period+" days");    
        
    }
    
}
catch(e)
{
    test.fail("Error in running MPS" + e);
}

try
{
    function DelPlanOrdrs()
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Delete Planned Orders...");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "Delete Planned Orders...");
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_4");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_4");
        waitForObject(":_warehouse.All Sites_QRadioButton_4");
        clickButton(":_warehouse.All Sites_QRadioButton_4");
        waitForObject(":_optionsGroup.XDateEdit_XDateEdit_2");
        type(":_optionsGroup.XDateEdit_XDateEdit_2", "+999");
        type(":_optionsGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Planning System.MPS and MRP_QRadioButton");
        clickButton(":Planning System.MPS and MRP_QRadioButton");
        if(!findObject(":_optionsGroup.Delete Firmed Orders_QCheckBox").checked)
            clickButton(":_optionsGroup.Delete Firmed Orders_QCheckBox");
        if(!findObject(":_optionsGroup.Delete Child Orders_QCheckBox").checked)
            clickButton(":_optionsGroup.Delete Child Orders_QCheckBox");
        waitForObject(":Delete Planned Orders by Planner Code.Delete_QPushButton");
        clickButton(":Delete Planned Orders by Planner Code.Delete_QPushButton");
        test.log("All Planned Orders deleted");
    }
}
catch(e)
{
    test.fail("Error in  deleting planned orders" + e);
}

try
{
    function SetPlng(item, plng)
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
        doubleClickItem(":_list_XTreeWidget_11", item, 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":Scheduling._planningType_XComboBox_4");
        if(findObject(":Scheduling._planningType_XComboBox_4").currentText!=plng)
            clickItem(":Scheduling._planningType_XComboBox_4", plng, 0, 0, 1, Qt.LeftButton);
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Planning for Item:"+item+" set to "+plng);
    }
}
catch(e)
{
    test.fail("Error in setting planning system of an item" + e);
}


try
{
    function newPO(item, quant, ddate)    
    {
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        snooze(1);
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
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
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
        type(":groupBox_2.ItemLineEdit_ItemLineEdit", item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", quant);
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        findObject(":_schedGroup.XDateEdit_XDateEdit_3").clear();
        type(":_schedGroup.XDateEdit_XDateEdit_3", "0");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "<Tab>");
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        snooze(2);
        if(object.exists(":Purchase Order.Continue_QPushButton"))
            clickButton(":Purchase Order.Continue_QPushButton");
        snooze(2);
        if(object.exists(":Purchase Order.Continue_QPushButton"))
            clickButton(":Purchase Order.Continue_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton_2");
        clickButton(":Purchase Order.Save_QPushButton_2");
        waitForObject(":Purchase Order.Cancel_QPushButton");
        clickButton(":Purchase Order.Cancel_QPushButton");
        waitForObject(":Open Purchase Orders.Close_QToolButton");
        clickButton(":Open Purchase Orders.Close_QToolButton");
        test.log("new Purchase Order created");
        
    }
}
catch(e)
{
    test.fail("Error in creating a new purchase order" + e);
}


try
{
    function newPOWh(item, quant, ddate,Wh)    
    {
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        snooze(1);
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
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
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
        type(":groupBox_2.ItemLineEdit_ItemLineEdit", item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":groupBox_2._warehouse_WComboBox");
        if(findObject(":groupBox_2._warehouse_WComboBox").currentText!=Wh)
            clickItem(":groupBox_2._warehouse_WComboBox", Wh, 0, 0, 1, Qt.LeftButton);
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", quant);
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        findObject(":_schedGroup.XDateEdit_XDateEdit_3").clear();
        type(":_schedGroup.XDateEdit_XDateEdit_3", "0");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "<Tab>");
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        snooze(2);
        if(object.exists(":Purchase Order.Continue_QPushButton"))
            clickButton(":Purchase Order.Continue_QPushButton");        
        waitForObject(":Purchase Order.Save_QPushButton_2");
        clickButton(":Purchase Order.Save_QPushButton_2");
        waitForObject(":Purchase Order.Cancel_QPushButton");
        clickButton(":Purchase Order.Cancel_QPushButton");
        waitForObject(":Open Purchase Orders.Close_QToolButton");
        clickButton(":Open Purchase Orders.Close_QToolButton");
        test.log("new Purchase Order created");
        
    }
}
catch(e)
{
    test.fail("Error in creating a new purchase order" + e);
}


try
{
    function DelAllPO()
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        snooze(1);
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        if(!(findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked))
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Open Purchase Orders.Query_QToolButton");
        clickButton(":Open Purchase Orders.Query_QToolButton");
        while(findObject(":_list_XTreeWidget_4").topLevelItemCount > 0)
        {
            openContextMenu(":_list_XTreeWidget_4", 5, 5, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
            waitForObject(":Open Purchase Orders.Yes_QPushButton");
            clickButton(":Open Purchase Orders.Yes_QPushButton");
            
        }
        
        
        waitForObject(":Open Purchase Orders.Close_QToolButton");
        clickButton(":Open Purchase Orders.Close_QToolButton");
        test.log("Deleted All Purchase Orders");
    }
}
catch(e)
{
    test.fail("Error in deleting purchase orders" + e);
}


try
{
    function CheckSaleable(item)
    {
        //---Check in Item Master if the item is Saleable and Not Exclusive-----
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products");
        activateItem(":xTuple ERP:*_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        snooze(1);
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        doubleClickItem(":_list_XTreeWidget_7", item, 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item.Item is Sold_QGroupBox");
        if(!findObject(":Item.Item is Sold_QGroupBox").checked)
            mouseClick(":Item.Item is Sold_QGroupBox", 0, 0, 1, Qt.LeftButton);
        if(findObject(":Item is Sold.Exclusive_QCheckBox").checked)
            clickButton(":Item is Sold.Exclusive_QCheckBox");
        waitForObject(":Item.Save_QPushButton");
        clickButton(":Item.Save_QPushButton");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
        
        
        //---Check in the Item site if the Item is Saleable from the site---
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
        doubleClickItem(":_list_XTreeWidget_11", item, 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item Sites.Sold from this Site_QGroupBox");
        if(!findObject(":Item Sites.Sold from this Site_QGroupBox").checked)
            mouseClick(":Item Sites.Sold from this Site_QGroupBox", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        
        test.log("check Saleable checkbox for Item:"+ item);
    }
}
catch(e)
{
    test.fail("Error in setting up Item" + e);
}


try
{
    function NewSO(item, quant)
    {
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        snooze(2);
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
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_2", item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit");
        type(":_qtyOrdered_XLineEdit", quant);
        type(":_qtyOrdered_XLineEdit", "<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "0");
        type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
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
        test.log("new Sales Order created");
        
    }
}
catch(e)
{
    test.fail("Error in creating a sales order" + e);
}



try
{
    function NewSOWh(item, quant, Wh)
    {
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        snooze(2);
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
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_2", item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObjectItem(":_warehouse_WComboBox_5", Wh);
        clickItem(":_warehouse_WComboBox_5", Wh, 0, 0, 1, Qt.LeftButton);
        waitForObject(":_qtyOrdered_XLineEdit");
        type(":_qtyOrdered_XLineEdit", quant);
        type(":_qtyOrdered_XLineEdit", "<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "0");
        type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
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
        test.log("new Sales Order created");
        
    }
}
catch(e)
{
    test.fail("Error in creating a sales order" + e);
}


try
{
    function DelAllSO()
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        snooze(1);
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        
        
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        
        while(findObject(":_list_XTreeWidget_3").topLevelItemCount > 0)
        {
            openContextMenu(":_list_XTreeWidget_3", 0, 0, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
            waitForObject(":Open Sales Orders.Yes_QPushButton");
            clickButton(":Open Sales Orders.Yes_QPushButton");
            
        }
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
        test.log("Deleted All Sales Order");
        
    }
}
catch(e)
{
    test.fail("Error in deleting sales orders" + e);
}

try
{
    function SetQtyScrp(item, qty, scrap)
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
        doubleClickItem(":frame_2._bomitem_XTreeWidget", item, 0, 0, 0, Qt.LeftButton);
        waitForObject(":_qtyPer_XLineEdit");
        if(findObject(":_qtyPer_XLineEdit").text!=qty)
        {
            findObject(":_qtyPer_XLineEdit").clear();
            type(":_qtyPer_XLineEdit",qty)
                }
        waitForObject(":_scrap_XLineEdit");
        if(findObject(":_scrap_XLineEdit").text!=scrap)
        {
            findObject(":_scrap_XLineEdit").clear();
            type(":_scrap_XLineEdit",scrap);
        }    
        waitForObject(":Bill of Materials.Save_QPushButton_3");
        clickButton(":Bill of Materials.Save_QPushButton_3");
        
        waitForObject(":Bill of Materials.Save_QPushButton_2");
        clickButton(":Bill of Materials.Save_QPushButton_2");
        waitForObject(":Bills of Materials.Close_QPushButton");
        clickButton(":Bills of Materials.Close_QPushButton");
        test.log("Scrap Quantity set for Item:"+item);
    }
}
catch(e)
{
    test.fail("Error in setting scrap quantity of an item" + e);
}

try
{
    function NewWO(item, quant,leadd, ddate)
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_3",item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", quant);
        waitForObject(":_itemGroup._warehouse_WComboBox");
        if(findObject(":_itemGroup._warehouse_WComboBox").currentText!="WH1")
            clickItem(":_itemGroup._warehouse_WComboBox", "WH1", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_schedGroup._leadTime_QSpinBox");
        findObject(":_schedGroup._leadTime_QSpinBox").clear();
        type(":_schedGroup._leadTime_QSpinBox", leadd);
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", ddate);
        type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Work Order.Save_QPushButton");
        clickButton(":Work Order.Save_QPushButton");
        test.log("new Work Order created");
        
    }
}
catch(e)
{
    test.fail("Error in creating a work order" + e);
}

try
{
    function NewWOWh(item, quant,leadd, ddate, Wh)
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_3");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_3",item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", quant);
        waitForObject(":_itemGroup._warehouse_WComboBox");
        if(findObject(":_itemGroup._warehouse_WComboBox").currentText!=Wh)
            clickItem(":_itemGroup._warehouse_WComboBox", Wh, 0, 0, 1, Qt.LeftButton);
        waitForObject(":_schedGroup._leadTime_QSpinBox");
        findObject(":_schedGroup._leadTime_QSpinBox").clear();
        type(":_schedGroup._leadTime_QSpinBox", leadd);
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", ddate);
        type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Work Order.Save_QPushButton");
        clickButton(":Work Order.Save_QPushButton");
        test.log("new Work Order created");
        
    }
}
catch(e)
{
    test.fail("Error in creating a work order" + e);
}

try
{
    function DelAllWO()
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        waitForObject(":xTuple ERP:*.Manufacture_QMenu");
        type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
        type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
        type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
        snooze(0.5);
        type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
        type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
        type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
        type(":xTuple ERP:*.Manufacture_QMenu", "<Right>");
        
        waitForObject(":xTuple ERP:*.Reports_QMenu_2");
        type(":xTuple ERP:*.Reports_QMenu_2", "<Return>");
        
//         
//    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
//    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
//    snooze(0.5);
//    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
//    activateItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
//        
        waitForObject(":Work Order Schedule.Query_QToolButton");
        clickButton(":Work Order Schedule.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_9");
        while(findObject(":_list_XTreeWidget_9").topLevelItemCount > 0)
        {
            openContextMenu(":_list_XTreeWidget_9", 0, 0, 0);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Delete...");
            waitForObject(":Work Order Schedule.Yes_QPushButton");
            clickButton(":Work Order Schedule.Yes_QPushButton");
            
        }
        waitForObject(":Work Order Schedule.Close_QToolButton");
        clickButton(":Work Order Schedule.Close_QToolButton");
        test.log("Deleted all Work Orders");
        
    }
}
catch(e)
{
    test.fail("Error in deleting work orders" + e);
}


try
{
    function ImplodeTopWO()
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Implode...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "Implode...");
        waitForObject(":Implode Work Order_QLabel");
        sendEvent("QMouseEvent", ":Implode Work Order_QLabel", QEvent.MouseButtonPress, 15, 9, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab.E_QModelIndex");
        mouseClick(":_listTab.E_QModelIndex", 16, 4, 0, Qt.LeftButton);
        waitForObject(":Work Orders.OK_QPushButton");
        clickButton(":Work Orders.OK_QPushButton");
        waitForObject(":Implode Work Order.Implode_QPushButton");
        clickButton(":Implode Work Order.Implode_QPushButton");
        test.log("Imploded Work Order");
    }
}
catch(e)
{
    test.fail("Error in imploding work order" + e);
}


try
{
    function ExplodeTopWO()
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Explode...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "Explode...");
        waitForObject(":Explode Work Order_QLabel");
        sendEvent("QMouseEvent", ":Explode Work Order_QLabel", QEvent.MouseButtonPress, 19, 15, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab.O_QModelIndex");
        mouseClick(":_listTab.O_QModelIndex", 20, 5, 0, Qt.LeftButton);
        waitForObject(":Work Orders.OK_QPushButton");
        clickButton(":Work Orders.OK_QPushButton");
        waitForObject(":Explode Work Order.Explode_QPushButton");
        clickButton(":Explode Work Order.Explode_QPushButton");
        waitForObject(":Explode Work Order.Close_QPushButton");
        clickButton(":Explode Work Order.Close_QPushButton");
        test.log("Exploded Work Order");
        
    }
}
catch(e)
{
    test.fail("Error in exploding work order" + e);
}

try
{
    function RescheduleWO(startd, dued)    
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Reschedule...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "Reschedule...");
        waitForObject(":Reschedule Work Order_QLabel");
        sendEvent("QMouseEvent", ":Reschedule Work Order_QLabel", QEvent.MouseButtonPress, 16, 13, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab.E_QModelIndex");
        mouseClick(":_listTab.E_QModelIndex", 19, 6, 0, Qt.LeftButton);
        waitForObject(":Work Orders.OK_QPushButton");
        clickButton(":Work Orders.OK_QPushButton");
        waitForObject(":Reschedule Work Order.XDateEdit_XDateEdit");
        type(":Reschedule Work Order.XDateEdit_XDateEdit", startd);
        waitForObject(":Reschedule Work Order.XDateEdit_XDateEdit");
        type(":Reschedule Work Order.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Reschedule Work Order.XDateEdit_XDateEdit_2");
        type(":Reschedule Work Order.XDateEdit_XDateEdit_2", dued);
        waitForObject(":Reschedule Work Order.XDateEdit_XDateEdit_2");
        type(":Reschedule Work Order.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Reschedule Work Order.Reschedule_QPushButton");
        clickButton(":Reschedule Work Order.Reschedule_QPushButton");
        waitForObject(":Reschedule Work Order.Close_QPushButton");
        clickButton(":Reschedule Work Order.Close_QPushButton");
        test.log("Rescheduled Work Order");
    }
}
catch(e)
{
    test.fail("Error in rescheduling work order" + e);
}

try
{
    function NewScheduledWO(item, quant, dued, lead)    
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
        activateItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
        
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_4");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_4",item);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_typeGroup.Work Order_QRadioButton");
        clickButton(":_typeGroup.Work Order_QRadioButton");
        waitForObject(":_qtyGroup._qty_XLineEdit_2");
        type(":_qtyGroup._qty_XLineEdit_2", quant);
        waitForObject(":_qtyGroup.XDateEdit_XDateEdit");
        type(":_qtyGroup.XDateEdit_XDateEdit", dued);
        waitForObject(":_qtyGroup.XDateEdit_XDateEdit");
        type(":_qtyGroup.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":_qtyGroup._leadTime_QSpinBox");
        findObject(":_qtyGroup._leadTime_QSpinBox").clear();
        type(":_qtyGroup._leadTime_QSpinBox", "0");
        waitForObject(":Planned Order.Save_QPushButton");
        clickButton(":Planned Order.Save_QPushButton");
        waitForObject(":Planned Order.Close_QPushButton");
        clickButton(":Planned Order.Close_QPushButton");
        test.log("Schedule-Work Order created");
    }
}
catch(e)
{
    test.fail("Error in creating work order" + e);
}

try
{
    function FirmPlndOrder()
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
        openContextMenu(":_list_XTreeWidget_10", 0, 0, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Firm Order...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Firm Order...");
        waitForObject(":Planned Orders.Firm_QPushButton");
        clickButton(":Planned Orders.Firm_QPushButton");        
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
        
        test.log("Firm Planned Orders");
    }
}
catch(e)
{
    test.fail("Error in creating firm planned orders" + e);
}

try
{
    function replaceSubstring(inputString, fromString, toString) 
    {
        // Goes through the inputString and replaces every occurrence of fromString with toString
        var temp = inputString;
        if (fromString == "") {
            return inputString;
        }
        if (toString.indexOf(fromString) == -1) { // If the string being replaced is not a part of the replacement string (normal situation)
            while (temp.indexOf(fromString) != -1) {
                var toTheLeft = temp.substring(0, temp.indexOf(fromString));
                var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
                temp = toTheLeft + toString + toTheRight;
            }
        } else { // String being replaced is part of replacement string (like "+" being replaced with "++") - prevent an infinite loop
            var midStrings = new Array("~", "`", "_", "^", "#");
            var midStringLen = 1;
            var midString = "";
            // Find a string that doesn't exist in the inputString to be used
            // as an "inbetween" string
            while (midString == "") {
                for (var i=0; i < midStrings.length; i++) {
                    var tempMidString = "";
                    for (var j=0; j < midStringLen; j++) { tempMidString += midStrings[i]; }
                    if (fromString.indexOf(tempMidString) == -1) {
                        midString = tempMidString;
                        i = midStrings.length + 1;
                    }
                }
            } // Keep on going until we build an "inbetween" string that doesn't exist
            // Now go through and do two replaces - first, replace the "fromString" with the "inbetween" string
            while (temp.indexOf(fromString) != -1) {
                var toTheLeft = temp.substring(0, temp.indexOf(fromString));
                var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
                temp = toTheLeft + midString + toTheRight;
            }
            // Next, replace the "inbetween" string with the "toString"
            while (temp.indexOf(midString) != -1) {
                var toTheLeft = temp.substring(0, temp.indexOf(midString));
                var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
                temp = toTheLeft + toString + toTheRight;
            }
        } // Ends the check to see if the string being replaced is part of the replacement string or not
        return temp; // Send the updated string back to the user
    } // Ends the "replaceSubstring" function
}
catch(e)
{
    test.fail("Error in calculating absolute value of QOH" + e);
}


try
{
    //--------check if the year is a leap year--------   
    function IsLeapYear(datea)
    {
        datea = parseInt(datea);
        if(datea%4 == 0)
        {
            if(datea%100 != 0)
                return true;
            else
            {
                if(datea%400 == 0)
                    return true;
                else
                    return false;
            }
        }
        return false;
    }
    
    
    function getForwardDate(Days)
    {
        
        var DaysFromToday = parseInt(Days);        
        var d = new Date();
        var LeapYearMonths = new Array(31,29,31,30,31,30,31,31,30,31,30,31);
        var NormalYearMonths = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        var CurrentYearFull = d.getFullYear();
        var CurrentMonth = 1+d.getMonth();
        var CurrentDate = d.getDate();
        
        if(IsLeapYear(CurrentYearFull))
        {
            while(DaysFromToday > LeapYearMonths[CurrentMonth-1])
            {
                DaysFromToday = DaysFromToday - LeapYearMonths[CurrentMonth-1];
                CurrentMonth++;
                if(CurrentMonth > 12)
                {
                    CurrentYearFull++;
                    CurrentMonth = 1;
                }
            }
            
        }
        
        if(!IsLeapYear(CurrentYearFull))
        {
            while(DaysFromToday > NormalYearMonths[CurrentMonth-1])
            {
                DaysFromToday = DaysFromToday - NormalYearMonths[CurrentMonth-1];
                CurrentMonth++;
                if(CurrentMonth > 12)
                {
                    CurrentYearFull++;
                    CurrentMonth = 1;
                }
            }
        }
        
        
        
        if(IsLeapYear(CurrentYearFull) && (CurrentDate + DaysFromToday > LeapYearMonths[CurrentMonth-1]))
        {
            CurrentDate = CurrentDate + DaysFromToday - LeapYearMonths[CurrentMonth-1];
            if(CurrentMonth ==12)
            {
                CurrentMonth = 1;
                CurrentYearFull++;
            }
            else
                CurrentMonth = CurrentMonth + 1;
        }
        
        else if((!IsLeapYear(CurrentYearFull)) && (CurrentDate + DaysFromToday > NormalYearMonths[CurrentMonth-1]))
        {
            CurrentDate = CurrentDate + DaysFromToday - NormalYearMonths[CurrentMonth-1];
            
            if(CurrentMonth == 12)
            {
                CurrentMonth = 1;
                CurrentYearFull++;
            }
            else
                CurrentMonth = CurrentMonth + 1;
            
        }
        else
            CurrentDate = CurrentDate+DaysFromToday;
        CurrentDate = CurrentDate>9?CurrentDate:("0"+CurrentDate);
        CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
        
        
        var returnString = CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate;
        return(CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate);
        
        
    }
}
catch(e)
{
    test.fail("Error in leap year function" + e);
}



try
{
    function DelAllTO()
    {
        //------Del All Transfer Order--------
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
        waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
        
        waitForObject(":Destination Site:.All Sites_QRadioButton");
        clickButton(":Destination Site:.All Sites_QRadioButton");
        
        waitForObject(":Source Site:.All Sites_QRadioButton");
        clickButton(":Source Site:.All Sites_QRadioButton");
        
        
        while(findObject(":_frame._to_XTreeWidget").topLevelItemCount>0)
        {
            waitForObject(":_frame._to_XTreeWidget");
            type(":_frame._to_XTreeWidget","<Space>");
            waitForObject(":_frame.Delete_QPushButton");
            clickButton(":_frame.Delete_QPushButton");
            waitForObject(":List Open Transfer Orders.Yes_QPushButton");
            clickButton(":List Open Transfer Orders.Yes_QPushButton");
            waitForObject(":_frame._to_XTreeWidget");
            type(":_frame._to_XTreeWidget","<Down>");
        }
        waitForObject(":List Open Transfer Orders.Close_QPushButton");
        clickButton(":List Open Transfer Orders.Close_QPushButton");
        test.log("Deleted All Transfer Orders");
        
    }
}
catch(e)
{
    test.fail("Error in deleting transfer orders" + e);
}

