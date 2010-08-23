function main()
{
    
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Editing of preferences----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
        
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
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    
    //-----Variable Declaration-----
    var quote, quoteitem, quoteqty, sonumber, soitem, soqty, qtinvoice, qtamount, soinvoice, soamount;
    
    
    //---find Application Edition------
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex",0, 0, 0, Qt.LeftButton);
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton); 
        }
        
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in identifying the application edition" + e);       
        
    }
    
    
    //------Creating a Lot controlled item------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":List Items._item_XTreeWidget");
        clickItem(":List Items._item_XTreeWidget","YTRUCK1",5,5,0,Qt.LeftButton);
        waitForObject(":List Items.Copy_QPushButton");
        clickButton(":List Items.Copy_QPushButton");
        waitForObject(":_targetItemNumber_XLineEdit");
        type(":_targetItemNumber_XLineEdit", "ZTRUCK1");
        waitForObject(":List Items.Copy_QPushButton_2");
        clickButton(":List Items.Copy_QPushButton_2");
        waitForObject(":List Items.Yes_QPushButton");
        clickButton(":List Items.Yes_QPushButton");
        
        waitForObject(":_warehouse_WComboBox");
        mouseClick(":_warehouse_WComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_warehouse.WH1_QModelIndex");
        mouseClick(":_warehouse.WH1_QModelIndex", 5, 5, 0, Qt.LeftButton);
        
        waitForObject(":Control._controlMethod_XComboBox");
        mouseClick(":Control._controlMethod_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_controlMethod.Lot #_QModelIndex");
        mouseClick(":_controlMethod.Lot #_QModelIndex", 31, 1, 0, Qt.LeftButton);
        
        waitForObject(":_plannerCode_XComboBox");
        mouseClick(":_plannerCode_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_plannerCode.MRP-MRP Items_QModelIndex");
        mouseClick(":_plannerCode.MRP-MRP Items_QModelIndex", 31, 1, 0, Qt.LeftButton);
        
        waitForObject(":_costcat_XComboBox");
        mouseClick(":_costcat_XComboBox", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_costcat.DISTRIBUTION-Distribution - WH2_QModelIndex");
        mouseClick(":_costcat.DISTRIBUTION-Distribution - WH2_QModelIndex", 46, 5, 0, Qt.LeftButton);
        
        waitForObject(":List Items.Save_QPushButton");
        clickButton(":List Items.Save_QPushButton");
        waitForObject(":List Items.Cancel_QPushButton");
        clickButton(":List Items.Cancel_QPushButton");
        
        waitForObject(":List Items.Close_QPushButton");
        clickButton(":List Items.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating item " + e);
    }
    
    
    //-----Adjusting QOH of Item----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_2");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_2", "ZTRUCK1");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_qty_XLineEdit");
        type(":_qty_XLineEdit", "200");
        var trqty=findObject(":_qty_XLineEdit").text;
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment._lotSerial_XComboBox");
        type(":Enter Miscellaneous Adjustment._lotSerial_XComboBox", "LOT2");
        waitForObject(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit");
        type(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit", trqty);
        
        waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment.Close_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in adjusting QOH of ZTRUCK1"+ e);
    }
    
    
    //------Adjusting QOH of Location controlled Item-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_2");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_2", "WTRUCK1");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_qty_XLineEdit");
        type(":_qty_XLineEdit", "100");
        var x=findObject(":_qty_XLineEdit").text;
        
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        var y=findObject(":_qtyGroup_XLabel").text;
        
        if (parseInt(x)==parseInt(y))
        {
            waitForObject(":_adjustmentTypeGroup.Relative_QRadioButton");
            clickButton(":_adjustmentTypeGroup.Relative_QRadioButton");
        }
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
        waitForObject(":_frame._itemloc_XTreeWidget");
        doubleClickItem(":_frame._itemloc_XTreeWidget","Yes",5,5,0,Qt.LeftButton);
        waitForObject(":Enter Miscellaneous Adjustment.Distribute_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Distribute_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        waitForObject(":Enter Miscellaneous Adjustment.Close_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in adjusting QOH of WTRUCK1"+ e );
    }
    
    //-------Adjusting QOH of Serial Controlled Item--------- 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_2");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_2", "STRUCK1");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_qty_XLineEdit");
        type(":_qty_XLineEdit", "1");
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment._lotSerial_XComboBox");
        type(":Enter Miscellaneous Adjustment._lotSerial_XComboBox", "SERIAL1");
        waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
        waitForObject(":_frame._itemloc_XTreeWidget");
        doubleClickItem(":_frame._itemloc_XTreeWidget","Yes",5,5,0,Qt.LeftButton);
        waitForObject(":Enter Miscellaneous Adjustment.Distribute_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Distribute_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
        waitForObject(":Enter Miscellaneous Adjustment.Close_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in adjusting QOH of STRUCK1" + e);
    }
    
    //-----Create a Quote-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
        activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
        
        waitForObject(":frame.New_QPushButton");
        clickButton(":frame.New_QPushButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_headerPage._custPONumber_XLineEdit");
        type(":_headerPage._custPONumber_XLineEdit", "100");
        
        quote = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
        
        
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3", "YTRUCK1");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit");
        type(":_qtyOrdered_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        waitForObject(":Quote.Save_QPushButton");
        clickButton(":Quote.Save_QPushButton");
        
        waitForObject(":Quote.Close_QPushButton");
        clickButton(":Quote.Close_QPushButton");
        waitForObject(":Quote.Save_QPushButton_2");
        clickButton(":Quote.Save_QPushButton_2");
        waitForObject(":Quote.Cancel_QPushButton");
        clickButton(":Quote.Cancel_QPushButton");
        
        waitForObject(":_quote_XTreeWidget");
        if(object.exists("{column='0' container=':_quote_XTreeWidget' text='"+quote+"' type='QModelIndex'}"))
            test.pass("Quote Created Successfully");
        else 
            test.fail("Quote Creation Failed");
    }
    catch(e)
    {
        test.fail("Error in creating the quote" + e);
    }
    
    
    //-----Convert Quote To Sales Order-----
    try
    {
        clickItem(":_quote_XTreeWidget", quote, 5, 5, 0, Qt.LeftButton);
        waitForObject(":frame.Convert_QPushButton");
        clickButton(":frame.Convert_QPushButton");
        
        waitForObject(":List Quotes.Yes_QPushButton");
        clickButton(":List Quotes.Yes_QPushButton");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");    
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        quoteitem =findObject(":_soitem_QModelIndex").text;
        waitForObject(":_lineItemsPage._soitem_XTreeWidget");
        doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
        snooze(0.5);
        
        
        
        quoteqty = findObject(":_qtyOrdered_XLineEdit_2").text;      
        
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        
        
        waitForObject(":List Quotes.Close_QPushButton");
        clickButton(":List Quotes.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in converting quote to sales order" + e);
    }
    
    
    
    //-----Verify - Conversion of Quote to Sales Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        waitForObject(":frame._so_XTreeWidget");
        if(object.exists("{column='0' container=':frame._so_XTreeWidget' text='"+quote+"' type='QModelIndex'}"))
            test.pass("Quote successfully converted to Sales Order");
        else 
            test.fail("Quote convertion failed");
        
        waitForObject(":List Open Sales Orders.Close_QPushButton");
        clickButton(":List Open Sales Orders.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in conversion of quote" + e);
    }
    
    
    //-----Create a Prospect-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Prospect");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Prospect");
        waitForObjectItem(":xTuple ERP: *.Prospect_QMenu", "List...");
        activateItem(":xTuple ERP: *.Prospect_QMenu", "List...");
        
        waitForObject(":List Prospects.New_QPushButton");
        clickButton(":List Prospects.New_QPushButton");
        waitForObject(":_number_XLineEdit");
        type(":_number_XLineEdit", "zenprospect");
        waitForObject(":_name_QLineEdit");
        type(":_name_QLineEdit", "Zen Prospect");
        if(appEdition=="Manufacturing")
        {
            waitForObject(":_salesrep_XComboBox");
            clickItem(":_salesrep_XComboBox", "1000-Sam Masters", 5, 5, 1, Qt.LeftButton);
        }
        
        else
        { 
            waitForObject(":_salesrep_XComboBox");
            clickItem(":_salesrep_XComboBox", "usge-usge", 5, 5, 1, Qt.LeftButton);
        }  
        
        
        waitForObject(":_contactTab.VirtualClusterLineEdit_ContactClusterLineEdit");
        waitForObject(":_contactTab_QLabel");
        sendEvent("QMouseEvent", ":_contactTab_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        
        
        if(appEdition=="Manufacturing")
        {
            
            
            waitForObject(":_listTab.Coltraine_QModelIndex");
            doubleClick(":_listTab.Coltraine_QModelIndex", 34, 4, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_listTab_XTreeWidget_10");
            doubleClickItem(":_listTab_XTreeWidget_10", "Susanta", 5, 5, 0, Qt.LeftButton);
        }
        
        waitForObject(":Prospect.Save_QPushButton");
        clickButton(":Prospect.Save_QPushButton");
        
        waitForObject(":List Prospects._prospect_XTreeWidget");
        if(object.exists("{column='0' container=':List Prospects._prospect_XTreeWidget' text='ZENPROSPECT' type='QModelIndex'}"))         test.pass("ZENPROSPECT created");
        else 
            test.fail("Prospect creation failed");
        
        waitForObject(":List Prospects.Close_QPushButton");
        clickButton(":List Prospects.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating a prospect" + e);
    }
    
    
    //-----Create a Quote using Prospect-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
        activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
        
        waitForObject(":frame.New_QPushButton");
        clickButton(":frame.New_QPushButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "ZENPROSPECT");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_headerPage._custPONumber_XLineEdit");
        type(":_headerPage._custPONumber_XLineEdit", "101");
        
        var pquote = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3", "YTRUCK1");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit");
        type(":_qtyOrdered_XLineEdit", "10");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        waitForObject(":Quote.Save_QPushButton");
        clickButton(":Quote.Save_QPushButton");
        
        waitForObject(":Quote.Close_QPushButton");
        clickButton(":Quote.Close_QPushButton");
        waitForObject(":Quote.Save_QPushButton_2");
        clickButton(":Quote.Save_QPushButton_2");
        waitForObject(":Quote.Cancel_QPushButton");
        clickButton(":Quote.Cancel_QPushButton");
        
        if(!findObject(":Show.Quotes For Prospects_XCheckBox").checked)
            clickButton(":Show.Quotes For Prospects_XCheckBox");
        snooze(0.5);
        waitForObject(":_quote_XTreeWidget");
        
        if(object.exists("{column='0' container=':_quote_XTreeWidget' text='"+pquote+"' type='QModelIndex'}"))
            
            test.pass("Quote using Prospect as Customer created Successfully");
        else 
            test.fail("Quote using Prospect as Customer creation Failed");
    }
    catch(e)
    {
        test.fail("Error in creating quote wiyh prospect" + e);
    }
    
    
    //-----Conversion of Quote to Sales Order & Prospect to Customer-----
    try
    {
        clickItem(":_quote_XTreeWidget", pquote, 5, 5, 0, Qt.LeftButton);
        waitForObject(":_quote_XTreeWidget");
        clickItem(":_quote_XTreeWidget", pquote, 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Convert_QPushButton");
        clickButton(":frame.Convert_QPushButton");
        
        waitForObject(":List Quotes.Yes_QPushButton");
        clickButton(":List Quotes.Yes_QPushButton");
        snooze(0.5);
        
        waitForObject(":List Quotes.Yes_QPushButton");
        clickButton(":List Quotes.Yes_QPushButton");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        
        waitForObject(":List Quotes.Close_QPushButton");
        clickButton(":List Quotes.Close_QPushButton");
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        waitForObject(":frame._so_XTreeWidget");
        
        if(object.exists("{column='0' container=':frame._so_XTreeWidget' text='"+pquote+"' type='QModelIndex'}"))
            test.pass("Quote using prospect as Customer converted successfully");
        else 
            test.fail("Quote using prospect as Customer conversion failed");
        
        waitForObject(":List Open Sales Orders.Close_QPushButton");
        clickButton(":List Open Sales Orders.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in converting quote to salesorder" + e);
    }
    
    
    //-----Verify - Conversion of Prospect to Customer-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP: *.Customer_QMenu", "List...");
        activateItem(":xTuple ERP: *.Customer_QMenu", "List...");
        
        waitForObject(":List Customers._cust_XTreeWidget");
        if(object.exists("{column='1' container=':List Customers._cust_XTreeWidget' text='ZENPROSPECT' type='QModelIndex'}"))
            test.pass("Prospect converted to Customer successfully");
        else
            test.fail("Prospect conversion to Customer failed");
        
        waitForObject(":List Customers.Close_QPushButton");
        clickButton(":List Customers.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in converting prospect to customer" + e);
    }
    
    
    //-----Create and Edit a Quote-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
        activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
        
        waitForObject(":frame.New_QPushButton");
        clickButton(":frame.New_QPushButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_headerPage._custPONumber_XLineEdit");
        type(":_headerPage._custPONumber_XLineEdit", "102");
        
        var quotenumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3", "YTRUCK1");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit");
        type(":_qtyOrdered_XLineEdit", "100");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        waitForObject(":Quote.Save_QPushButton");
        clickButton(":Quote.Save_QPushButton");
        
        waitForObject(":Quote.Close_QPushButton");
        clickButton(":Quote.Close_QPushButton");
        waitForObject(":Quote.Save_QPushButton_2");
        clickButton(":Quote.Save_QPushButton_2");
        waitForObject(":Quote.Cancel_QPushButton");
        clickButton(":Quote.Cancel_QPushButton");  
        
        
    }
    catch(e)
    {
        test.fail("Error in creating a quote" + e);
    }
    
    try
    {
        waitForObject(":_quote_XTreeWidget");
        doubleClickItem(":_quote_XTreeWidget",  quotenumber, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._soitem_XTreeWidget_2");
        doubleClickItem(":_lineItemsPage._soitem_XTreeWidget_2", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_qtyOrdered_XLineEdit");
        findObject(":_qtyOrdered_XLineEdit").clear();
        type(":_qtyOrdered_XLineEdit", "50");
        
        var quotequantity = findObject(":_qtyOrdered_XLineEdit").text;   
        
        waitForObject(":Quote.Save_QPushButton");
        sendEvent("QMouseEvent", ":Quote.Save_QPushButton", QEvent.MouseButtonPress, 53, 13, Qt.LeftButton, 0);
        if(object.exists(":Update Price?_QMessageBox"))
            waitForObject(":Quote.Yes_QPushButton");
        clickButton(":Quote.Yes_QPushButton");
        waitForObject(":Quote.Save_QPushButton");
        clickButton(":Quote.Save_QPushButton");
        waitForObject(":Quote.Close_QPushButton_2");
        clickButton(":Quote.Close_QPushButton_2");
        waitForObject(":Quote.Save_QPushButton_2");
        clickButton(":Quote.Save_QPushButton_2")
                
                waitForObject(":_quote_XTreeWidget");
        doubleClickItem(":_quote_XTreeWidget", quotenumber, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._soitem_XTreeWidget_2");
        doubleClickItem(":_lineItemsPage._soitem_XTreeWidget_2", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_qtyOrdered_XLineEdit");
        
        var quotechange = findObject(":_qtyOrdered_XLineEdit").text;  
        
        waitForObject(":Quote.Save_QPushButton");
        clickButton(":Quote.Save_QPushButton");
        
        waitForObject(":Quote.Close_QPushButton_2");
        clickButton(":Quote.Close_QPushButton_2");
        waitForObject(":Quote.Save_QPushButton_2");
        clickButton(":Quote.Save_QPushButton_2");
        
        if(parseInt(quotequantity.toString()) == parseInt(quotechange.toString()))
            test.pass("Quote edit successful");
        else test.fail("Quote edit failed");
        
        waitForObject(":List Quotes.Close_QPushButton");
        clickButton(":List Quotes.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in editing a quote" + e);
    }
    
    
    
    //-----Delete a Quote-----    
    try
    {        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
        waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
        activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
        
        waitForObject(":_quote_XTreeWidget");
        clickItem(":_quote_XTreeWidget",quotenumber, 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Delete_QPushButton_2");
        clickButton(":frame.Delete_QPushButton_2");
        waitForObject(":List Quotes.Yes_QPushButton");
        clickButton(":List Quotes.Yes_QPushButton");
        
        test.verify(quotenumber, "Quote deleted");
        
        waitForObject(":List Quotes.Close_QPushButton");
        clickButton(":List Quotes.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in deleting a quote" + e);
    }
    
    
    
    //-----Create a Sales Order-----
    try
    {
        
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
            activateItem(":xTuple ERP: *_QMenuBar", "Sales");
            waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
            activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
            waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
            activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
            
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_headerPage._custPONumber_XLineEdit_2");
            type(":_headerPage._custPONumber_XLineEdit_2", "103");
            
            if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
                clickButton(":_headerPage.Print on Save_QCheckBox");
            
            sonumber = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
            
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit");
            type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            
            soitem = findObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit").text;
            
            soqty = findObject(":_qtyOrdered_XLineEdit_2").text;
            
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
            type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
            waitForObject(":Sales Order.Save_QPushButton");
            clickButton(":Sales Order.Save_QPushButton");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_2");
            clickButton(":Sales Order.Save_QPushButton_2");
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            
            waitForObject(":frame._so_XTreeWidget");
            if(object.exists("{column='0' container=':frame._so_XTreeWidget' text='"+sonumber+"' type='QModelIndex'}"))
                test.pass("Sales Order creation successful");
            else  
                test.fail("Sales Order creation failed");
            
        }
        catch(e)
        {
            test.fail("Error in creating a sales order" + e);
        }
        
        
        //-----Creating Sales Order for Lot Item--
        try
        {
            
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_headerPage._custPONumber_XLineEdit_2");
            type(":_headerPage._custPONumber_XLineEdit_2", "104");
            
            if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
                clickButton(":_headerPage.Print on Save_QCheckBox");
            
            var sonumlot = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
            
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit");
            type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit", "ZTRUCK1");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "100");
            
            soqtylot = findObject(":_qtyOrdered_XLineEdit_2").text;
            
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
            type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
            waitForObject(":Sales Order.Save_QPushButton");
            clickButton(":Sales Order.Save_QPushButton");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_2");
            clickButton(":Sales Order.Save_QPushButton_2");
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            
            waitForObject(":frame._so_XTreeWidget");
            if(object.exists("{column='0' container=':frame._so_XTreeWidget' text='"+sonumlot+"' type='QModelIndex'}"))
                test.pass("Sales Order creation successful");
            else  
                test.fail("Sales Order creation failed");
            
            
        }
        catch(e)
        {
            test.fail("Error in creating a sales order" + e);
        }
        
        
        //------Creating Sales Order for Location Controlled Item---
        try
        {
            
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_headerPage._custPONumber_XLineEdit_2");
            type(":_headerPage._custPONumber_XLineEdit_2", "105");
            
            if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
                clickButton(":_headerPage.Print on Save_QCheckBox");
            
            var sonumloc = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
            
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit");
            type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit", "WTRUCK1");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "50");   
            
            soqtyloc = findObject(":_qtyOrdered_XLineEdit_2").text;
            
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
            type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
            waitForObject(":Sales Order.Save_QPushButton");
            clickButton(":Sales Order.Save_QPushButton");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_2");
            clickButton(":Sales Order.Save_QPushButton_2");
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            
            waitForObject(":frame._so_XTreeWidget");
            if(object.exists("{column='0' container=':frame._so_XTreeWidget' text='"+sonumloc+"' type='QModelIndex'}"))
                test.pass("Sales Order creation successful");
            else  
                test.fail("Sales Order creation failed");
            
        }
        catch(e)
        {
            test.fail("Error in creating a sales order" + e);
        }
        
        //----Creating Sales Order for Serial Controlled Item------
        
        try
        {
            
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_headerPage._custPONumber_XLineEdit_2");
            type(":_headerPage._custPONumber_XLineEdit_2", "106");
            
            if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
                clickButton(":_headerPage.Print on Save_QCheckBox");
            
            var sonumser = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
            
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit");
            type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit", "STRUCK1");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "1");
            
            soqtyser = findObject(":_qtyOrdered_XLineEdit_2").text;
            
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
            type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
            waitForObject(":Sales Order.Save_QPushButton");
            clickButton(":Sales Order.Save_QPushButton");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_2");
            clickButton(":Sales Order.Save_QPushButton_2");
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            
            waitForObject(":frame._so_XTreeWidget");
            if(object.exists("{column='0' container=':frame._so_XTreeWidget' text='"+sonumser+"' type='QModelIndex'}"))
                test.pass("Sales Order creation successful");
            else  
                test.fail("Sales Order creation failed");
        }
        catch(e)
        {
            test.fail("Error in creating a sales order" + e);
        }
        
        //----Creating Sales Order for Kit Item------
        
        try
        {
            
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_headerPage._custPONumber_XLineEdit_2");
            type(":_headerPage._custPONumber_XLineEdit_2", "107");
            
            if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
                clickButton(":_headerPage.Print on Save_QCheckBox");
            
            var sonumkit = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
            
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit");
            type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit", "KCAR1");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "30");
            
            soqtykit = findObject(":_qtyOrdered_XLineEdit_2").text;
            
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
            type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
            waitForObject(":Sales Order.Save_QPushButton");
            clickButton(":Sales Order.Save_QPushButton");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_2");
            clickButton(":Sales Order.Save_QPushButton_2");
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            
            waitForObject(":frame._so_XTreeWidget");
            if(object.exists("{column='0' container=':frame._so_XTreeWidget' text='"+sonumkit+"' type='QModelIndex'}"))
                test.pass("Sales Order creation successful");
            else  
                test.fail("Sales Order creation failed");
            
        }
        catch(e)
        {
            test.fail("Error in creating a sales order" + e);
        }
        
        
        
        //----Creating Sales Order for Return------
        
        try
        {
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
            type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_headerPage._custPONumber_XLineEdit_2");
            type(":_headerPage._custPONumber_XLineEdit_2", "108");
            
            if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
                clickButton(":_headerPage.Print on Save_QCheckBox");
            
            var soret = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
            
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton_2");
            clickButton(":_lineItemsPage.New_QPushButton_2");
            waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit");
            type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit", "BTRUCK1");
            snooze(0.5);
            waitForObject(":_QTreeView");
            type(":_QTreeView", "<Tab>");
            waitForObject(":_qtyOrdered_XLineEdit_2");
            type(":_qtyOrdered_XLineEdit_2", "30");
            
            soqtyret = findObject(":_qtyOrdered_XLineEdit_2").text;
            
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
            type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
            waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
            type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
            waitForObject(":Sales Order.Save_QPushButton");
            clickButton(":Sales Order.Save_QPushButton");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
            waitForObject(":Sales Order.Save_QPushButton_2");
            clickButton(":Sales Order.Save_QPushButton_2");
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            
            waitForObject(":frame._so_XTreeWidget");
            if(object.exists("{column='0' container=':frame._so_XTreeWidget' text='"+soret+"' type='QModelIndex'}"))
                test.pass("Sales Order creation successful");
            else  
                test.fail("Sales Order creation failed");
            
        }
        catch(e)
        {
            test.fail("Error in creating a sales order" + e);
        }
        
        waitForObject(":List Open Sales Orders.Close_QPushButton");
        clickButton(":List Open Sales Orders.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in opening list of sales orders screen " + e);
    }
    
    //-----Copy a Sales Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        waitForObject(":frame._so_XTreeWidget");
        clickItem(":frame._so_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Copy_QPushButton");
        clickButton(":frame.Copy_QPushButton");
        waitForObject(":List Open Sales Orders.Copy_QPushButton");
        clickButton(":List Open Sales Orders.Copy_QPushButton");
        waitForObject(":frame._so_XTreeWidget");
        
        waitForObject(":frame._so_XTreeWidget");
        doubleClickItem(":frame._so_XTreeWidget", parseInt(sonumber.toString()) + 6, 5, 5, 0, Qt.LeftButton);
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        waitForObject(":_headerPage._custPONumber_XLineEdit_2");
        type(":_headerPage._custPONumber_XLineEdit_2", "104");
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._soitem_XTreeWidget");
        doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
        snooze(0.5);
        
        var soitem1 =findObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit").text;
        
        var soqty1 = findObject(":_qtyOrdered_XLineEdit_2").text;
        
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        
        if(soitem == soitem1 && parseInt(soqty.toString()) == parseInt(soqty1.toString()))
            test.pass("Sales Order Copy successful");
        else test.fail("Sales order copy not successful");
        
        snooze(0.5);
        waitForObject(":List Open Sales Orders.Close_QPushButton");
        clickButton(":List Open Sales Orders.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in copying a sales order" + e);
    }
    
    
    //-----Edit a Sales Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        waitForObject(":frame._so_XTreeWidget");
        doubleClickItem(":frame._so_XTreeWidget", parseInt(sonumber.toString()) + 6, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._soitem_XTreeWidget");
        doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_qtyOrdered_XLineEdit_2");
        findObject(":_qtyOrdered_XLineEdit_2").clear();
        type(":_qtyOrdered_XLineEdit_2", "50");
        
        var soquantity = findObject(":_qtyOrdered_XLineEdit_2").text; 
        
        waitForObject(":Sales Order.Save_QPushButton");
        sendEvent("QMouseEvent", ":Sales Order.Save_QPushButton", QEvent.MouseButtonPress, 25, 15, Qt.LeftButton, 0);
        
        if(object.exists(":Update Price?_QMessageBox"))
            waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        
        if(object.exists(":Change W/O Quantity?_QMessageBox"))
            waitForObject(":Sales Order.Yes_QPushButton");
        clickButton(":Sales Order.Yes_QPushButton");
        
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        
        waitForObject(":List Open Sales Orders.Close_QPushButton");
        clickButton(":List Open Sales Orders.Close_QPushButton");
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        
        var x=parseInt(sonumber.toString()) + 6;
        waitForObject(":frame._so_XTreeWidget");
        doubleClickItem(":frame._so_XTreeWidget",x , 5, 5, 0, Qt.LeftButton);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._soitem_XTreeWidget");
        doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_qtyOrdered_XLineEdit_2");
        
        var  sochange = findObject(":_qtyOrdered_XLineEdit_2").text; 
        
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        
        if(parseInt(soquantity.toString()) == parseInt(sochange.toString()))
            test.pass("Sales Order edit successful");
        else test.fail("Sales Order edit failed");
        
        waitForObject(":List Open Sales Orders.Close_QPushButton");
        clickButton(":List Open Sales Orders.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in editing sales order" + e);
    }
    
    
    //-----Delete a Sales Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        waitForObject(":frame._so_XTreeWidget");
        clickItem(":frame._so_XTreeWidget",  parseInt(sonumber.toString()) + 6, 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":frame.Delete_QPushButton");
        clickButton(":frame.Delete_QPushButton");
        
        waitForObject(":List Open Sales Orders.Yes_QPushButton");
        clickButton(":List Open Sales Orders.Yes_QPushButton");
        
        test.verify(parseInt(sonumber.toString()) + 6, "Sales Order deleted");
        
        waitForObject(":List Open Sales Orders.Close_QPushButton");
        clickButton(":List Open Sales Orders.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in deleting sales order" + e);
    }
    
    
    //--***--Ship the Sales Order with 'Select for Billing' option checked--***--    
    
    //-----Verification of QOH by Item (Issue Stock to Shipping)-----.
    
    
    var qty=queryQoh("YTRUCK1");
    var qtylot=queryQoh("ZTRUCK1");
    var qtyloc=queryQoh("WTRUCK1");
    var qtyser=queryQoh("STRUCK1");
    var qtyTWHEEL1=queryQoh("TWHEEL1");
    var qtyCBODY1=queryQoh("CBODY1");
    var qtyHUB1=queryQoh("HUB1");
    var qtyCBUMP=queryQoh("CBUMP");
    var qtyret=queryQoh("BTRUCK1");
    
    
    
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
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", quote);
        snooze(0.5);
        waitForObject(":_QTreeView");   
        type(":_QTreeView", "<Tab>");
        
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
    
    
    //----------Issuing Stock to Shipping(Lot Item)--------
    try
    {       
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit",  sonumlot);
        snooze(0.5);
        waitForObject(":_QTreeView");   
        type(":_QTreeView", "<Tab>");
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":_frame._itemloc_XTreeWidget_3");
        doubleClickItem(":_frame._itemloc_XTreeWidget_3","No",5,5,0,Qt.LeftButton);
        
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        waitForObject(":Issue to Shipping.Post_QPushButton");
        clickButton(":Issue to Shipping.Post_QPushButton");
        
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
    
    
    //----------Issuing Stock to Shipping(Location Controlled Item)--------
    
    try
    {       
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumloc);
        snooze(0.5);
        waitForObject(":_QTreeView");   
        type(":_QTreeView", "<Tab>");
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":_itemloc.Yes_QModelIndex_4");
        doubleClick(":_itemloc.Yes_QModelIndex_4", 3, 4, 0, Qt.LeftButton);
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        
        waitForObject(":Issue to Shipping.Post_QPushButton");
        clickButton(":Issue to Shipping.Post_QPushButton");
        
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
    
    
    
    //----------Issuing Stock to Shipping(Serial Controlled Item)--------
    try
    {       
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumser);
        snooze(0.5);
        waitForObject(":_QTreeView");   
        type(":_QTreeView", "<Tab>");
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":_itemloc.Yes_QModelIndex_4");
        doubleClick(":_itemloc.Yes_QModelIndex_4", 3, 4, 0, Qt.LeftButton);
        
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        waitForObject(":Issue to Shipping.Post_QPushButton");
        clickButton(":Issue to Shipping.Post_QPushButton");
        
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
    
    
    
    //----------Issuing Stock to Shipping(kit Item)--------
    try
    {       
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumkit);
        snooze(0.5);
        waitForObject(":_QTreeView");   
        type(":_QTreeView", "<Tab>");   
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":_itemloc.No_QModelIndex_2");
        doubleClick(":_itemloc.No_QModelIndex_2", 5, 2, 0, Qt.LeftButton);
        
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        waitForObject(":Issue to Shipping.Post_QPushButton");
        clickButton(":Issue to Shipping.Post_QPushButton");
        
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
    
    
    
    //-------Issue Stock to order------
    try
    {       
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", soret);
        snooze(0.5);
        waitForObject(":_QTreeView");   
        type(":_QTreeView", "<Tab>");
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issued stock to order");
    }
    catch(e)
    {
        test.fail("Error in issuing stock  to the order" + e);
    }
    
    //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----   
    
    
    var result=queryQoh("YTRUCK1");
    if((qty-parseInt(soqty)==result))
        test.pass("Quantity of YTRUCK1 is updated correctly");
    else
        test.fail("Quantity of YTRUCK1 is not updated correctly");
    
    
    var result=queryQoh("ZTRUCK1");
    if((qtylot-parseInt(soqtylot)==result))
        test.pass("Quantity of ZTRUCK1 is updated correctly");
    else
        test.fail("Quantity of ZTRUCK1 is not updated correctly");
    
    var result=queryQoh("WTRUCK1");
    if((qtyloc-parseInt(soqtyloc)==result))
        test.pass("Quantity of WTRUCK1 is updated correctly");
    else
        test.fail("Quantity of WTRUCK1 is not updated correctly");
    
    var result=queryQoh("STRUCK1");
    if((qtyser-parseInt(soqtyser)==result))
        test.pass("Quantity of STRUCK1 is updated correctly");
    else
        test.fail("Quantity of STRUCK1 is not updated correctly");
    
    var result=queryQoh("TWHEEL1");
    if((qtyTWHEEL1-parseInt(4*soqtykit)==result))
        test.pass("Quantity of TWHEEL1 is updated correctly");
    else
        test.fail("Quantity of TWHEEL1 is not updated correctly");
    
    var result=queryQoh("CBODY1");
    if((qtyCBODY1-parseInt(soqtykit)==result))
        test.pass("Quantity of CBODY1 is updated correctly");
    else
        test.fail("Quantity of CBODY1 is not updated correctly");
    
    var result=queryQoh("HUB1");
    if((qtyHUB1-parseInt(4*soqtykit)==result))
        test.pass("Quantity of HUB1 is updated correctly");
    else
        test.fail("Quantity of HUB1 is not updated correctly");
    
    var result=queryQoh("CBUMP");
    if((qtyCBUMP-parseInt(soqtykit)==result))
        test.pass("Quantity of CBUMP is updated correctly");
    else
        test.fail("Quantity of CBUMP is not updated correctly");
    
    var result=queryQoh("BTRUCK1");
    if((qtyret-parseInt(soqtyret)==result))
        test.pass("Quantity of BTRUCK1 is updated correctly");
    else
        test.fail("Quantity of BTRUCK1 is not updated correctly");
    
    //------------Return the Stock to Order---
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Maintain Shipping Contents...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Maintain Shipping Contents...");
        waitForObject(":Maintain Shipping.Query_QPushButton");
        clickButton(":Maintain Shipping.Query_QPushButton");
        
        if(object.exists("{column='2' container=':_ship_XTreeWidget' text='"+soret+"' type='QModelIndex'}"))
            test.pass("Selected order is ready for shipping");
        else
            test.fail("Selected order doesn't exist");
        waitForObject(":_ship.SO_QModelIndex_2");
        mouseClick(":_ship.SO_QModelIndex_2", 0, 0, 0, Qt.LeftButton);
        openContextMenu(":_ship.SO_QModelIndex_2", 0, 0, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Return ALL Stock Issued to Order...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Return ALL Stock Issued to Order...");
        waitForObject(":Maintain Shipping.Close_QPushButton");
        clickButton(":Maintain Shipping.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in returning stock to order" + e);
    }
    
    
    //---------Verification of QOH by item----
    var result=queryQoh("BTRUCK1");
    if(result==qtyret)
        test.pass("Stock is returned");
    else
        test.fail("Stock is not returned");
    
    
    //--***--Ship the Sales Order with 'Select for Billing' option unchecked--***--   
    
    //-----Verification of QOH by Item (Issue Stock to Shipping)-----
    
    var qty=queryQoh("YTRUCK1");
    
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
        snooze(0.5);
        waitForObject(":_QTreeView");   
        type(":_QTreeView", "<Tab>");
        
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        
        //-----Ship the Sales Order (with'Select for Billing' option unchecked)-----
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        
        if(findObject(":groupBox.Select for Billing_QCheckBox").checked)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        
        if(findObject(":groupBox.Print Packing List_XCheckBox_3").checked)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        
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
    
    var result=queryQoh("YTRUCK1");
    if((qty-parseInt(soqty)==result))
        test.pass("Quantity of YTRUCK1 is updated correctly");
    else
        test.fail("Quantity of YTRUCK1 is not updated correctly");
    
    
    
    //-----Select Order for Billing-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit", sonumber);
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        doubleClickItem(":_lineitemsTab._soitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Sales order Selected for Billing"); 
    }
    catch(e)
    {
        test.fail("Error in selecting order for billing" + e);
    }
    
    //-----Select Order for Billing-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit", sonumlot);
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        doubleClickItem(":_lineitemsTab._soitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Sales order Selected for Billing"); 
    }
    catch(e)
    {
        test.fail("Error in selecting order for billing" + e);
    }
    
    //-----Select Order for Billing-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit", sonumloc);
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        doubleClickItem(":_lineitemsTab._soitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Sales order Selected for Billing"); 
    }
    catch(e)
    {
        test.fail("Error in selecting order for billing" + e);
    }
    
    //-----Select Order for Billing-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit", sonumser);
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        doubleClickItem(":_lineitemsTab._soitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Sales order Selected for Billing"); 
    }
    catch(e)
    {
        test.fail("Error in selecting order for billing" + e);
    }
    
    
    //-----Select Order for Billing-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit",sonumkit);
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        doubleClickItem(":_lineitemsTab._soitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Sales order Selected for Billing"); 
    }
    catch(e)
    {
        test.fail("Error in selecting order for billing" + e);
    }
    
    
    //-----Creating Invoices-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Create Invoices...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Create Invoices...");
        waitForObject(":Create Invoices.Create Invoices_QPushButton");
        clickButton(":Create Invoices.Create Invoices_QPushButton");
        test.log("Invoice created successful");
    }
    catch(e)
    {
        test.fail("Error in creating invoices" + e);
    }
    
    
    //-----Posting Invoices-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        type(":xTuple ERP: *.Billing_QMenu","<Right>");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        
        waitForObject(":_invchead_XTreeWidget");
        doubleClickItem(":_invchead_XTreeWidget", quote, 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        
        qtinvoice = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Invoice.Close_QPushButton");
        clickButton(":Invoice.Close_QPushButton");
        
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        
        waitForObject(":List Unposted Invoices.Query_QPushButton");
        clickButton(":List Unposted Invoices.Query_QPushButton");
        
        waitForObject(":_invchead_XTreeWidget");
        doubleClickItem(":_invchead_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        
        soinvoice = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Invoice.Close_QPushButton");
        clickButton(":Invoice.Close_QPushButton");
        
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        
        
        waitForObject(":List Unposted Invoices.Query_QPushButton");
        clickButton(":List Unposted Invoices.Query_QPushButton");
        
        waitForObject(":_invchead_XTreeWidget");
        doubleClickItem(":_invchead_XTreeWidget", sonumlot, 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        
        var lotinvoice = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Invoice.Close_QPushButton");
        clickButton(":Invoice.Close_QPushButton");
        
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        
        waitForObject(":List Unposted Invoices.Query_QPushButton");
        clickButton(":List Unposted Invoices.Query_QPushButton");
        
        waitForObject(":_invchead_XTreeWidget");
        doubleClickItem(":_invchead_XTreeWidget", sonumloc, 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        
        var locinvoice = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Invoice.Close_QPushButton");
        clickButton(":Invoice.Close_QPushButton");
        
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        
        waitForObject(":List Unposted Invoices.Query_QPushButton");
        clickButton(":List Unposted Invoices.Query_QPushButton");
        
        waitForObject(":_invchead_XTreeWidget");
        doubleClickItem(":_invchead_XTreeWidget", sonumser, 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        
        var serinvoice = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Invoice.Close_QPushButton");
        clickButton(":Invoice.Close_QPushButton");
        
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        
        
        waitForObject(":List Unposted Invoices.Query_QPushButton");
        clickButton(":List Unposted Invoices.Query_QPushButton");
        
        waitForObject(":_invchead_XTreeWidget");
        doubleClickItem(":_invchead_XTreeWidget", sonumkit, 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        
        var kitinvoice = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Invoice.Close_QPushButton");
        clickButton(":Invoice.Close_QPushButton");
        
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        
        
        
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Invoice posted successful");
    }
    catch(e)
    {
        test.fail("Error in posting invoices" + e);
    }
    
    
    
    //-----Entering Cash Receipts-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
        waitForObject(":Receivables Workbench.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Receivables Workbench.qt_tabwidget_tabbar_QTabBar", "Cash Receipts");
        
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget", quote, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        
        qtamount = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        
        type(":Cash Receipt.XLineEdit_XLineEdit", qtamount);
        waitForObject(":Cash Receipt.Save_QPushButton");
        clickButton(":Cash Receipt.Save_QPushButton");
        
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", qtamount);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");
        test.log("Cash receipt is created");
        
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget", sonumber, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        
        soamount = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        
        type(":Cash Receipt.XLineEdit_XLineEdit", soamount);
        waitForObject(":Cash Receipt.Save_QPushButton");
        clickButton(":Cash Receipt.Save_QPushButton");
        
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", soamount);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");   
        test.log("Cash receipt is created");
        
        
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");    
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget", sonumlot, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        
        var soamountlot = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        
        type(":Cash Receipt.XLineEdit_XLineEdit", soamountlot);
        waitForObject(":Cash Receipt.Save_QPushButton");
        clickButton(":Cash Receipt.Save_QPushButton");
        
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", soamountlot);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");
        test.log("Cash receipt is created");
        
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget", sonumloc, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        
        var soamountloc = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        
        type(":Cash Receipt.XLineEdit_XLineEdit", soamountloc);
        waitForObject(":Cash Receipt.Save_QPushButton");
        clickButton(":Cash Receipt.Save_QPushButton");
        
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", soamountloc);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");      
        test.log("Cash receipt is created");
        
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget", sonumser, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        
        var soamountser = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        
        type(":Cash Receipt.XLineEdit_XLineEdit", soamountser);
        waitForObject(":Cash Receipt.Save_QPushButton");
        clickButton(":Cash Receipt.Save_QPushButton");
        
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", soamountser);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");    
        
        test.log("Cash receipt is created");
        
        
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget", sonumkit, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        
        var soamountkit = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        
        type(":Cash Receipt.XLineEdit_XLineEdit", soamountkit);
        waitForObject(":Cash Receipt.Save_QPushButton");
        clickButton(":Cash Receipt.Save_QPushButton");
        
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", soamountkit);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");
        test.log("Cash receipt is created");
        
    }
    catch(e)
    {
        test.fail("Error in creating cash receipt" + e);
    }
    
    //-----Posting Cash Receipts-----
    try
    {
        waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
        
        while(findObject(":_cashRecptTab._cashrcpt_XTreeWidget").topLevelItemCount >= 1)
        {
            clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS", 5, 5, 1, Qt.LeftButton);
            waitForObject(":_cashRecptTab.Post_QPushButton");
            clickButton(":_cashRecptTab.Post_QPushButton");
        }   
        
        waitForObject(":Receivables Workbench.Close_QPushButton");
        clickButton(":Receivables Workbench.Close_QPushButton");
        test.log("Cash receipts posted successful");
    }
    catch(e)
    {
        test.fail("Error in posting cash receipts" + e);
    }
    
    
    //-----Customer History-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Reports");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:  *.Reports_QMenu", "Customer History...");
        activateItem(":xTuple ERP:  *.Reports_QMenu", "Customer History...");
        
        waitForObject(":Selection.VirtualClusterLineEdit_CLineEdit");
        type(":Selection.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        snooze(0.5);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");  
        waitForObject(":Document Date Range.XDateEdit_XDateEdit");
        type(":Document Date Range.XDateEdit_XDateEdit", "0");  
        waitForObject(":Document Date Range.XDateEdit_XDateEdit_2");
        type(":Document Date Range.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Customer History.Query_QPushButton");
        clickButton(":Customer History.Query_QPushButton");
        waitForObject(":_list_XTreeWidget");
        
        if(object.exists("{column='2' container=':_frame._custhist_XTreeWidget' text='"+qtinvoice+"' type='QModelIndex'}"))
            test.pass(" Invoice for Quote posted and available in Customer History");
        else 
            test.fail("Invoice for Quote not available in Customer History");
        
        if(object.exists("{column='2' container=':_frame._custhist_XTreeWidget' text='"+soinvoice+"' type='QModelIndex'}"))
            test.pass(" Invoice for Sales Order posted and available in Customer History");
        else 
            test.fail("Invoice for Sales Order not available in Customer History");
        
        
        if(object.exists("{column='2' container=':_frame._custhist_XTreeWidget' text='"+lotinvoice+"' type='QModelIndex'}"))
            test.pass(" Invoice for Sales Order posted and available in Customer History");
        else 
            test.fail("Invoice for Sales Order not available in Customer History");
        
        if(object.exists("{column='2' container=':_frame._custhist_XTreeWidget' text='"+locinvoice+"' type='QModelIndex'}"))
            test.pass(" Invoice for Sales Order posted and available in Customer History");
        else 
            test.fail("Invoice for Sales Order not available in Customer History");
        
        if(object.exists("{column='2' container=':_frame._custhist_XTreeWidget' text='"+serinvoice+"' type='QModelIndex'}"))
            test.pass(" Invoice for Sales Order posted and available in Customer History");
        else 
            test.fail("Invoice for Sales Order not available in Customer History");
        
        if(object.exists("{column='2' container=':_frame._custhist_XTreeWidget' text='"+kitinvoice+"' type='QModelIndex'}"))
            test.pass(" Invoice for Sales Order posted and available in Customer History");
        else 
            test.fail("Invoice for Sales Order not available in Customer History");
        
        nativeType("<Ctrl+w>");
    }
    catch(e)
    {
        test.fail("Error in viewing the customer history" + e);
    }
    
}
