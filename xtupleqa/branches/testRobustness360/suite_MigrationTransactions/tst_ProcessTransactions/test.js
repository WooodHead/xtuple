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
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
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
    
    
    
    //-----Edit the preferences-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
        activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
        if(object.exists(":Search Navigation.Buttons_QRadioButton"))
        {
            if(!findObject(":Search Navigation.Buttons_QRadioButton").checked)
                clickButton(":Search Navigation.Buttons_QRadioButton");
        }
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in editing preferences" + e);
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
        activateItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
        waitForObjectItem(":xTuple ERP:*.Configure Modules_QMenu", "Purchase...");
        activateItem(":xTuple ERP:*.Configure Modules_QMenu", "Purchase...");
        
        //-------Capturing Purchase order,Voucher,Purchase request numbers---
        var PONUM=findObject(":_nextPoNumber_XLineEdit").text;
        var VONUM=findObject(":_nextVcNumber_XLineEdit").text;
        var PRNUM=findObject(":_nextPrNumber_XLineEdit").text;
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing purchase order numbers" + e);
    }
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
        activateItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
        waitForObjectItem(":xTuple ERP:*.Configure Modules_QMenu", "Sales...");
        activateItem(":xTuple ERP:*.Configure Modules_QMenu", "Sales...");
        
        
        //-----Capturing Sales order,Quote,Invoice numbers----------
        var SONUM=parseInt(findObject(":Sales Configuration._nextSoNumber_XLineEdit").text);
        var QUNUM=findObject(":Sales Configuration._nextQuNumber_XLineEdit").text;
        var INNUM=findObject(":Sales Configuration._nextInNumber_XLineEdit").text;
        
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing sales order numbers" + e);
    }
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
        activateItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
        waitForObjectItem(":xTuple ERP:*.Configure Modules_QMenu", "Manufacture...");
        activateItem(":xTuple ERP:*.Configure Modules_QMenu", "Manufacture...");
        
        //-------Capturing Work order Number----- 
        var WONUM=findObject(":Manufacture Configuration._nextWoNumber_XLineEdit").text;
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing work order numbers" + e);
    }
    
    
//    //------Release Purchase Request-------
//    try
//    {
//        PRNUM--;
//        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
//        activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
//        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
//        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
//        waitForObjectItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code...");
//        activateItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code...");
//        
//        waitForObject(":Purchase Requests by Planner Code.Query_QPushButton");
//        clickButton(":Purchase Requests by Planner Code.Query_QPushButton");
//        waitForObject(":Purchase Requests by Planner Code._pr_XTreeWidget");
//        openItemContextMenu(":Purchase Requests by Planner Code._pr_XTreeWidget", PRNUM, 5, 5, 0);
//        waitForObject(":xTuple ERP:*._menu_QMenu");
//        activateItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
//        waitForObject(":_frame._itemsrc_XTreeWidget");
//        doubleClickItem(":_frame._itemsrc_XTreeWidget", "Toy Parts Inc\\.", 5, 5, 0, Qt.LeftButton);
//        snooze(2);
//        if(object.exists(":An Open Purchase Order Exists.An Open Purchase Order already exists for this Vendor.\nWould you like to use this Purchase Order?\nClick Yes to use the    existing Purchase Order otherwise a new one will be created._QLabel"))
//         clickButton(":An Open Purchase Order Exists.Yes_QPushButton");
//        waitForObject(":An Open Purchase Order Exists.Yes_QPushButton");
//        clickButton(":An Open Purchase Order Exists.Yes_QPushButton");
//        waitForObject(":Open Purchase Orders._po_XTreeWidget");
//        
//       clickItem(":Open Purchase Orders._po_XTreeWidget", "admin",10, 10,0, Qt.LeftButton);
//       waitForObject(":Open Purchase Orders.Select_QPushButton");
//       clickButton(":Open Purchase Orders.Select_QPushButton");
//        waitForObject(":*.Save_QPushButton");
//        clickButton(":*.Save_QPushButton");
//        waitForObject(":*.Save_QPushButton");
//        clickButton(":*.Save_QPushButton");
//        waitForObject(":Purchase Requests by Planner Code.Close_QPushButton");
//        clickButton(":Purchase Requests by Planner Code.Close_QPushButton");    
//        test.log("Release Purchase Request:"+ PRNUM);
//    }
//    catch(e)
//    {
//        test.fail("Error in releasing purchase request"+ e );
//    }
//  
//    //----------Reverse the Journal---------
//    try
//    {
//        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
//        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
//        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
//        activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
//        waitForObjectItem(":xTuple ERP:*.General Ledger_QMenu", "Reports");
//        activateItem(":xTuple ERP:*.General Ledger_QMenu", "Reports");
//        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Standard Journal History...");
//        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Standard Journal History...");
//        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
//        type(":_dateGroup.XDateEdit_XDateEdit", "0");
//        waitForObject(":*.XDateEdit_XDateEdit");
//        mouseClick(":*.XDateEdit_XDateEdit", 5, 5, 0, Qt.LeftButton);
//        waitForObject(":*.XDateEdit_XDateEdit");
//        type(":*.XDateEdit_XDateEdit", "0");
//        waitForObject(":List Unposted Invoices.Query_QPushButton");
//        clickButton(":List Unposted Invoices.Query_QPushButton");
//        waitForObject(":_gltrans.Yes_QModelIndex");
//        openContextMenu(":_gltrans.Yes_QModelIndex", 5, 5, 0);
//        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Reverse Journal...");
//        activateItem(":xTuple ERP:*._menu_QMenu", "Reverse Journal...");
//        waitForObject(":List Unposted Invoices.Post_QPushButton");
//       clickButton(":List Unposted Invoices.Post_QPushButton");
//       waitForObject(":Standard Journal History.OK_QPushButton");
//       clickButton(":Standard Journal History.OK_QPushButton");
//        waitForObject(":List Unposted Invoices.Close_QPushButton");
//        clickButton(":List Unposted Invoices.Close_QPushButton");
//    }
//    catch(e)
//    {
//        test.fail("Journal is not reversed");
//    }
//    
//    //------------Verification of Journal Entry-----------
//    try
//    {
//        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
//        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
//        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
//        activateItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger");
//        waitForObjectItem(":xTuple ERP:*.General Ledger_QMenu", "Reports");
//        activateItem(":xTuple ERP:*.General Ledger_QMenu", "Reports");
//        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Transactions...");
//        activateItem(":xTuple ERP:*.Reports_QMenu_5", "Transactions...");
//        waitForObject(":_accountGroup.All Accounts_QRadioButton");
//        clickButton(":_accountGroup.All Accounts_QRadioButton");
//        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
//        mouseClick(":_dateGroup.XDateEdit_XDateEdit", 5, 5, 0, Qt.LeftButton);
//        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
//        type(":_dateGroup.XDateEdit_XDateEdit", "<0>");
//        waitForObject(":*.XDateEdit_XDateEdit");
//        mouseClick(":*.XDateEdit_XDateEdit", 5, 5, 0, Qt.LeftButton);
//        waitForObject(":*.XDateEdit_XDateEdit");
//        type(":*.XDateEdit_XDateEdit", "<0>");
//        waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
//        clickButton(":_sourceGroup.Selected Source:_QRadioButton");
//        waitForObject(":_sourceGroup._source_XComboBox");
//        mouseClick(":_sourceGroup._source_XComboBox", 5, 5, 0, Qt.LeftButton);
//        waitForObject(":_source.G/L_QModelIndex");
//        mouseClick(":_source.G/L_QModelIndex", 5, 0, 0, Qt.LeftButton);
//        waitForObject(":List Unposted Invoices.Query_QPushButton");
//        clickButton(":List Unposted Invoices.Query_QPushButton");
//        test.log("Entry is present for reverse of a journal"); 
//        
//        waitForObject(":List Unposted Invoices.Close_QPushButton");
//        clickButton(":List Unposted Invoices.Close_QPushButton");
//    }
//    catch(e)
//    {
//        test.fail("Error in reversing the journal entry" + e);
//    }

    //-------Convert Quote to Sales Order-------
    try
    {
        QUNUM--;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Quote");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Quote");
        waitForObjectItem(":xTuple ERP:*.Quote_QMenu", "List...");
        activateItem(":xTuple ERP:*.Quote_QMenu", "List...");
        waitForObject(":_quote_XTreeWidget_2");
        clickItem(":_quote_XTreeWidget_2", QUNUM, 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Convert_QPushButton");
        clickButton(":frame.Convert_QPushButton");
        waitForObject(":xTuple ERP:*_QPushButton");
        clickButton(":xTuple ERP:*_QPushButton");
        waitForObject(":Sales Order.Save_QPushButton_4");
        clickButton(":Sales Order.Save_QPushButton_4");
        waitForObject(":List Quotes.Close_QPushButton");
        clickButton(":List Quotes.Close_QPushButton");
        test.log("Quote converted to Sales Order:" + QUNUM);
    }
    catch(e)
    {
        test.fail("Error in converting quote "+ e );
    }
    
    
    //-----Verification of Item Reservation----------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_4", "Reservations by Item...");
        activateItem(":xTuple ERP:*.Reports_QMenu_4", "Reservations by Item...");
        waitForObject(":_voucherGroup...._QPushButton_2");
        clickButton(":_voucherGroup...._QPushButton_2");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","BTRUCK1",0,0,0,Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Query_QPushButton");
        clickButton(":List Unposted Invoices.Query_QPushButton");
        if(findObject(":_allocations._QModelIndex").text == 50);
        test.pass("Item is reserved");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in opening the reservations screen "+ e );
    }
    
    
    //------------Unreserving the stock------------
    try
    {
        SONUM=SONUM-6;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        waitForObject(":frame._so_XTreeWidget_2");
        doubleClickItem(":frame._so_XTreeWidget_2",SONUM,0,0,0,Qt.LeftButton);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar_2");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar_2", "Line Items");
        waitForObject(":_soitem.BTRUCK1_QModelIndex");
        mouseClick(":_soitem.BTRUCK1_QModelIndex", 5, 5, 5, Qt.LeftButton);
        waitForObject(":_soitem.BTRUCK1_QModelIndex");
        openContextMenu(":_soitem.BTRUCK1_QModelIndex", 5, 5, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Unreserve Stock");
        activateItem(":xTuple ERP:*._menu_QMenu", "Unreserve Stock");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":List Open Sales Orders.Close_QPushButton_2");
        clickButton(":List Open Sales Orders.Close_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in unreserving the stock"+ e );
    }
    
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_4", "Reservations by Item...");
        activateItem(":xTuple ERP:*.Reports_QMenu_4", "Reservations by Item...");
        waitForObject(":_voucherGroup...._QPushButton_2");
        clickButton(":_voucherGroup...._QPushButton_2");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","BTRUCK1",0,0,0,Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Query_QPushButton");
        clickButton(":List Unposted Invoices.Query_QPushButton");
        if(findObject(":frame._allocations_XTreeWidget").topLevelItemCount==0)
            test.pass("No reservation for item");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in opening the reservations screen "+ e );
    }
    
   
    
    
    //--------Adjust the QOH of YTRUCK1-------------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_voucherGroup...._QPushButton_2");
        clickButton(":_voucherGroup...._QPushButton_2");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15","YTRUCK1",0,0,0,Qt.LeftButton);
        waitForObject(":_qty_XLineEdit_2");
        mouseClick(":_qty_XLineEdit_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_qty_XLineEdit_2");
        type(":_qty_XLineEdit_2", "10000");
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in adjusting QOH "+ e );
    }
    
    
    //--------Post Billing Selections-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP:*.Invoice_QMenu_2", "Create Invoices...");
        activateItem(":xTuple ERP:*.Invoice_QMenu_2", "Create Invoices...");
        if(findObject(":Create Invoices.Consolidate By Customer_XCheckBox").checked == false)
            clickButton(":Create Invoices.Consolidate By Customer_XCheckBox");
        waitForObject(":Create Invoices.Create Invoices_QPushButton");
        clickButton(":Create Invoices.Create Invoices_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Post Billing Sections" + e);
    }
    
    //------------Verification of Consolidated Invoice----------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
        activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        
        if(findObject(":_invchead.MULTIPLE_QModelIndex").text, "MULTIPLE");
        test.pass("Consolidated Invoice is created");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creation of consolidated Invoice");
    }
    
    //----------Return Stock----------------
    try
    {   
        
        SONUM--;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping...._QPushButton");
        clickButton(":Issue to Shipping...._QPushButton");
        waitForObject(":_listTab_XTreeWidget_4");
        doubleClickItem(":_listTab_XTreeWidget_4", SONUM, 5, 5, 0, Qt.LeftButton);
        waitForObject(":_soitem.YTRUCK1_QModelIndex_3");
        mouseClick(":_soitem.YTRUCK1_QModelIndex_3", 42, 9, 0, Qt.LeftButton);
        waitForObject(":_frame.Return Stock_QPushButton");
        clickButton(":_frame.Return Stock_QPushButton");
        
        test.pass("Stock has been returned");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in returning stock" + e);
    }
    
    
    
    
    
    
    //----Ship Order----   
    try
    {
        SONUM=SONUM-7;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping...._QPushButton");
        clickButton(":Issue to Shipping...._QPushButton");
        waitForObject(":_listTab_XTreeWidget_4");
        doubleClickItem(":_listTab_XTreeWidget_4", SONUM, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        waitForObject(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Select for Billing_QCheckBox").checked==true)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Shipped Order:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in shipping the order" + e);
    }
    
    
    //----Issue stock to Shipping and Ship Order----   
    try
    {
        SONUM--;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":Issue to Shipping...._QPushButton");
        clickButton(":Issue to Shipping...._QPushButton");
        waitForObject(":_listTab_XTreeWidget_4");
        doubleClickItem(":_listTab_XTreeWidget_4", SONUM, 5, 5, 0, Qt.LeftButton);
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        waitForObject(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Select for Billing_QCheckBox").checked==true)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
            clickButton(":groupBox.Print Packing List_XCheckBox");
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Issue stocked to Shipping:" + SONUM);
    }
    catch(e)
    {
        test.fail("Error in issuing stock to the order" + e);
    }
    
    
    
    //-------Post Billing Selections-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP:*.Invoice_QMenu_2", "Create Invoices...");
        activateItem(":xTuple ERP:*.Invoice_QMenu_2", "Create Invoices...");
        waitForObject(":Create Invoices.Create Invoices_QPushButton");
        clickButton(":Create Invoices.Create Invoices_QPushButton");
        test.log("Posted Billing Selection");
    }
    catch(e)
    {
        test.fail("Error in post billing " + e);
    }
    
    
    
    
    //----Post Invoice---------
    try
    {
        
        SONUM++;
        SONUM++;
        SONUM++;
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
        activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        
        waitForObject(":_invchead_XTreeWidget");
        if(!clickItem(":_invchead_XTreeWidget", INNUM, 5, 5, 1, Qt.LeftButton))
            test.pass("Invoice created:"+ INNUM);
        
        
        waitForObject(":_invchead_XTreeWidget");
        openItemContextMenu(":_invchead_XTreeWidget", SONUM, 5, 5, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
        clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Posted Invoice: ");
    }
    catch(e)
    {
        test.fail("Error in posting invoice"+ e);
        
    }
    
    
    //--------Create Cash receipt and apply-----------
    try
    {
        SONUM++;  
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Cash Receipt");
        activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Cash Receipt");
        
        waitForObjectItem(":xTuple ERP:*.Cash Receipt_QMenu", "New...");
        activateItem(":xTuple ERP:*.Cash Receipt_QMenu", "New...");
        waitForObject(":Cash Receipt...._QPushButton");
        clickButton(":Cash Receipt...._QPushButton");
        waitForObject(":_listTab_XTreeWidget_12");
        doubleClickItem(":_listTab_XTreeWidget_12", "TTOYS", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        clickItem(":_applicationsTab._aropen_XTreeWidget", SONUM, 5, 5, 1, Qt.LeftButton);
        
        
        
        waitForObject(":_applicationsTab.Apply_QPushButton");
        clickButton(":_applicationsTab.Apply_QPushButton");
        var amount=findObject(":Cash Receipt._currency_XLineEdit_2").text;
        
        waitForObject(":Cash Receipt_XLineEdit_2");
        type(":Cash Receipt_XLineEdit_2", amount);
        waitForObject(":Cash Receipt.Save_QPushButton");
        clickButton(":Cash Receipt.Save_QPushButton");
        waitForObject(":_amountGroup_XLineEdit_2");
        type(":_amountGroup_XLineEdit_2", amount);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");
        test.log("Created Cash Receipt for the Invoice created for the Sales Order: "+ SONUM);
    }
    catch(e)
    {
        test.fail("Error in creating cash receipt"+ e);
    }
    
    
    
    
    //------List Unposted Purchase Order------
    try
    {
        PONUM=PONUM-5;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":Show.Unreleased_XCheckBox");
        if(!findObject(":Show.Unreleased_XCheckBox").checked)
            clickButton(":Show.Unreleased_XCheckBox");
        waitForObject(":List Open Purchase Orders._pohead_XTreeWidget");
        clickItem(":List Open Purchase Orders._pohead_XTreeWidget", PONUM, 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Open Purchase Orders.Release_QPushButton");
        clickButton(":List Open Purchase Orders.Release_QPushButton");
        waitForObject(":*.Yes_QPushButton");
        clickButton(":*.Yes_QPushButton");
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("release Purchase Order:" + PONUM);
    }
    catch(e)
    {
        test.fail("Error in posting purchase order"+ e);
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
        waitForObject(":Enter Order Receipts...._QPushButton");
        clickButton(":Enter Order Receipts...._QPushButton");
        waitForObject(":_listTab_XTreeWidget_5");
        doubleClickItem(":_listTab_XTreeWidget_5", PONUM, 5,5, 0, Qt.LeftButton);
        
        waitForObject(":Enter Order Receipts.Receive All_QPushButton");
        clickButton(":Enter Order Receipts.Receive All_QPushButton");
        
        waitForObject(":Enter Order Receipts.Save_QPushButton");
        clickButton(":Enter Order Receipts.Save_QPushButton");
        test.log("Create Receipt for PO:"+ PONUM);
        
        
        waitForObject(":_recv_XTreeWidget");
        clickItem(":_recv_XTreeWidget", PONUM, 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Unposted Receipts.Post_QPushButton");
        clickButton(":List Unposted Receipts.Post_QPushButton");
        waitForObject(":List Unposted Receipts.Alternate Date:_QRadioButton");
        clickButton(":List Unposted Receipts.Alternate Date:_QRadioButton");
        waitForObject(":List Unposted Receipts.Continue_QPushButton");
        clickButton(":List Unposted Receipts.Continue_QPushButton");
        
        waitForObject(":List Unposted Receipts.Close_QPushButton");
        clickButton(":List Unposted Receipts.Close_QPushButton");
        test.log("Post Receipt for PO:"+ PONUM);
    }
    catch(e)
    {
        test.fail("Error in creating receipt for  purchase order"+ e);
    }
    
    
    //-----Post Receipt------
    try
    {
        PONUM++;  
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
        waitForObject(":List Unposted Receipts.List Unposted Receipts_QWorkspaceTitleBar");
        waitForObject(":_recv_XTreeWidget");
        clickItem(":_recv_XTreeWidget", PONUM, 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Unposted Receipts.Post_QPushButton");
        clickButton(":List Unposted Receipts.Post_QPushButton");
        if(object.exists(":List Unposted Invoices.Alternate Date:_QRadioButton_2"))
            clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton_2");
        if(object.exists(":List Unposted Invoices.Alternate Date:_QRadioButton"))
            clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
        waitForObject(":List Unposted Receipts.Continue_QPushButton");
        clickButton(":List Unposted Receipts.Continue_QPushButton");
        waitForObject(":List Unposted Receipts.Close_QPushButton");
        clickButton(":List Unposted Receipts.Close_QPushButton");
        test.log("Post Receipt for PO:"+ PONUM);
    }
    catch(e)
    {
        test.fail("Error in posting receipt for  purchase order"+ e);
    }
    
    
    
    //-------Purchase Order Return---------
    try
    {
        PONUM++;
        PONUM++;
//       waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
//        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
//        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
//        activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
//        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "Purchase Order Return...");
//        activateItem(":xTuple ERP:*.Receiving_QMenu", "Purchase Order Return...");
//        waitForObject(":_voucherGroup...._QPushButton_2");
//        clickButton(":_voucherGroup...._QPushButton_2");
//        waitForObject(":_listTab_XTreeWidget_15");
//        doubleClickItem(":_listTab_XTreeWidget_15",PONUM, 5, 5, 0, Qt.LeftButton);
//        waitForObject(":_poitem.100.00_QModelIndex_2");
//        mouseClick(":_poitem.100.00_QModelIndex_2", 5, 5, 0, Qt.LeftButton);
//        waitForObject(":*.Enter Return_QPushButton");
//        clickButton(":*.Enter Return_QPushButton");
//        waitForObject(":*._toReturn_XLineEdit");
//        type(":*._toReturn_XLineEdit", "50");
//        waitForObject(":*._rejectCode_XComboBox");
//        mouseClick(":*._rejectCode_XComboBox", 5, 5, 0, Qt.LeftButton);
//        waitForObject(":_rejectCode.PO-DAMAGED-RETURNED_QModelIndex");
//        mouseClick(":_rejectCode.PO-DAMAGED-RETURNED_QModelIndex", 5, 5, 0, Qt.LeftButton);
//        waitForObject(":*.Return_QPushButton");
//        clickButton(":*.Return_QPushButton");
//        waitForObject(":List Unposted Invoices.Post_QPushButton");
//        clickButton(":List Unposted Invoices.Post_QPushButton");
//        
//        
//        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
//        activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
//        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
//        activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
//        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "Purchase Order Return...");
//        activateItem(":xTuple ERP:*.Receiving_QMenu", "Purchase Order Return...");
//        waitForObject(":_voucherGroup...._QPushButton_2");
//        clickButton(":_voucherGroup...._QPushButton_2");
//        waitForObject(":_listTab_XTreeWidget_15");
//        doubleClickItem(":_listTab_XTreeWidget_15",PONUM, 5, 5, 0, Qt.LeftButton);
//        waitForObject(":_poitem.100.00_QModelIndex_2");
//        mouseClick(":_poitem.100.00_QModelIndex_2", 5, 5, 0, Qt.LeftButton);
//        waitForObject(":*.Enter Return_QPushButton");
//        clickButton(":*.Enter Return_QPushButton");
//        var x=parseInt(findObject(":_poitem.50.00_QModelIndex").text);
//        var y=parseInt(findObject(":*.50.00_XLabel").text);
//        var z=parseInt(findObject(":_poitem.100.00_QModelIndex_4").text);
//        waitForObject(":*.Cancel_QPushButton_3");
//        clickButton(":*.Cancel_QPushButton_3");
//        if(z==x+y)
//            test.pass("Purchase order item quantity is returned");
//        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
//        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
  }
    catch(e)
    {
        test.fail("Error in purchase order return" + e);
    }
    
    
  
    //----Post Invoice---------
    try
    {
        INNUM=INNUM-3;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
        activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        
        waitForObject(":_invchead_XTreeWidget");
        clickItem(":_invchead_XTreeWidget", INNUM, 5, 5, 1, Qt.LeftButton);
        snooze(2);//wait for the Post button to be enabled
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
        clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        snooze(0.5);
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
        test.log("Posted Invoice:" + INNUM);
    }
    catch(e)
    {
        test.fail("Error in posting invoice" + e);
    }
    
    
    
    //--------Create Cash receipt and apply-----------
    try
    {
        INNUM++;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Cash Receipt");
        activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Cash Receipt");
        
        waitForObjectItem(":xTuple ERP:*.Cash Receipt_QMenu", "New...");
        activateItem(":xTuple ERP:*.Cash Receipt_QMenu", "New...");
        waitForObject(":Cash Receipt...._QPushButton");
        clickButton(":Cash Receipt...._QPushButton");
        waitForObject(":_listTab_XTreeWidget_12");
        doubleClickItem(":_listTab_XTreeWidget_12", "TTOYS", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_applicationsTab._aropen_XTreeWidget");
        clickItem(":_applicationsTab._aropen_XTreeWidget", INNUM, 5, 5, 1, Qt.LeftButton);    
        waitForObject(":_applicationsTab.Apply_QPushButton");
        clickButton(":_applicationsTab.Apply_QPushButton");
        
        var amount=findObject(":Cash Receipt._currency_XLineEdit_2").text;
        
        waitForObject(":Cash Receipt_XLineEdit_2");
        type(":Cash Receipt_XLineEdit_2", amount);
        waitForObject(":Cash Receipt.Save_QPushButton");
        clickButton(":Cash Receipt.Save_QPushButton");
        waitForObject(":_amountGroup_XLineEdit_2");
        type(":_amountGroup_XLineEdit_2", amount);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");
        snooze(0.5);
        if(object.exists(":Cash Receipt.Yes_QPushButton"))
            clickButton(":Cash Receipt.Yes_QPushButton");
        test.log("Created Cash Receipt and applied against invoice: "+ INNUM);
    }
    catch(e)
    {
        test.fail("Error in creating cash receipt" + e);
    }
    
    
    //-------Check entry in Invoice Register--------   
    try
    {
        INNUM--;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_3", "Invoice Register...");
        activateItem(":xTuple ERP:*.Reports_QMenu_3", "Invoice Register...");
        
        waitForObject(":Invoice Register.XDateEdit_XDateEdit");
        type(":Invoice Register.XDateEdit_XDateEdit", "0");
        waitForObject(":Invoice Register.XDateEdit_XDateEdit_2");
        type(":Invoice Register.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Invoice Register.Query_QPushButton");
        clickButton(":Invoice Register.Query_QPushButton");
        waitForObject(":frame._gltrans_XTreeWidget");
        var d = new Date();
        var dyear= d.getFullYear();
        var dmonth = d.getMonth();
        var dday = d.getDate();
        dmonth++; 
        var dformat = dyear +"-"+(dmonth>10?dmonth:"0"+dmonth)+"-"+(dday>10?dday:"0"+dday);
        dformat+="\."+INNUM+"\_1";
        clickItem(":frame._gltrans_XTreeWidget", dformat, 5, 5, 1, Qt.LeftButton);
        waitForObject(":Invoice Register.Close_QPushButton");
        clickButton(":Invoice Register.Close_QPushButton");
        test.log("Invoice verified in Register:"+ INNUM);
    }
    catch(e)
    {
        test.fail("Error in posting of invoice" + e);
    }
    
    //-------Create Voucher--------.
    try
    {
        PONUM--;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        waitForObject(":_voucherGroup...._QPushButton_2");
        clickButton(":_voucherGroup...._QPushButton_2");
        waitForObject(":_listTab_XTreeWidget_15");
        doubleClickItem(":_listTab_XTreeWidget_15",PONUM, 0, 0, 0, Qt.LeftButton);
        waitForObject(":_poitem.100.00_QModelIndex");
        doubleClick(":_poitem.100.00_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_uninvoiced.Receiving_QModelIndex");
        doubleClick(":_uninvoiced.Receiving_QModelIndex", 5, 5, 0, Qt.LeftButton);
        waitForObject(":List Unposted Invoices.New_QPushButton");
        clickButton(":List Unposted Invoices.New_QPushButton");
        waitForObject(":*.Save_QPushButton_2");
        clickButton(":*.Save_QPushButton_2");
        waitForObject(":*.Save_QPushButton_3");
        clickButton(":*.Save_QPushButton_3");
        waitForObject(":_amount_currency_XLineEdit");
        type(":_amount_currency_XLineEdit", findObject(":_amount_XLineEdit_3").text);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        mouseClick(":_dateGroup.XDateEdit_XDateEdit", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        type(":_dateGroup.XDateEdit_XDateEdit", "<0>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        mouseClick(":_dateGroup.XDateEdit_XDateEdit_3", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_invoiceNum_XLineEdit_2");
        mouseClick(":_invoiceNum_XLineEdit_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_invoiceNum_XLineEdit_2");
        type(":_invoiceNum_XLineEdit_2", "VO for left over PO  ");
        waitForObject(":_reference_XLineEdit_2");
        mouseClick(":_reference_XLineEdit_2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_reference_XLineEdit_2");
        type(":_reference_XLineEdit_2", "ref- VO for left over PO ");
        waitForObject(":*.Save_QPushButton");
        clickButton(":*.Save_QPushButton");
        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
        test.log("Voucher created for PO:");
    }
    catch(e)
    {
        test.fail("Error in creating voucher" + e);
    }
    
    
    //-------Post Vouchers---------
    try
    {
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
        waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        
        waitForObject(":List Open Vouchers._vohead_XTreeWidget");
        openItemContextMenu(":List Open Vouchers._vohead_XTreeWidget", VONUM, 5, 5, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post Voucher...");
        waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
        clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
        waitForObject(":List Open Vouchers.Continue_QPushButton");
        clickButton(":List Open Vouchers.Continue_QPushButton");
        test.log("Posted Voucher:" + VONUM);
        
        //VONUM=VONUM-5;
        
        
        waitForObject(":List Open Vouchers.Close_QPushButton");
        clickButton(":List Open Vouchers.Close_QPushButton");
        test.log("Posted voucher:" + VONUM);
    }
    catch(e)
    {
        test.fail("Error in posting vouchers" + e);
    }
    
    var linuxPath, winPath;
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
        activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
        activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
        
        waitForObject(":Encryption Configuration_FileLineEdit");
        winPath = findObject(":Encryption Configuration_FileLineEdit").text;
        
        waitForObject(":Encryption Configuration_FileLineEdit_2");
        linuxPath = findObject(":Encryption Configuration_FileLineEdit_2").text;
        waitForObject(":Encryption Configuration.Cancel_QPushButton");
        clickButton(":Encryption Configuration.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in configuring encrypted file" + e);
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
        sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 67, 11, Qt.LeftButton, 0);
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
        
        waitForObject(":*.Yes_QPushButton");
        clickButton(":*.Yes_QPushButton");     
        waitForObject(":ACH File OK?.Yes_QPushButton");
        clickButton(":ACH File OK?.Yes_QPushButton");    
        
        waitForObject(":View Check Run.Close_QPushButton");
        clickButton(":View Check Run.Close_QPushButton");
        test.log("Posted Check");
    }
    catch(e)
    {
        test.fail("Error in posting check" + e);
    }
    
    
    //--------Select Payment--------
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
        clickItem(":frame._apopen_XTreeWidget", VONUM, 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Select..._QPushButton");
        clickButton(":frame.Select..._QPushButton");
        waitForObjectItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Select Payments.Save_QPushButton");
        clickButton(":Select Payments.Save_QPushButton");
        test.log("Invoice selected for payment");
        
        waitForObject(":Select Payments.Close_QPushButton");
        clickButton(":Select Payments.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in selecting PO for payment" + e);
    }
    
  
  
  
  
//    //----implode work Order----
//    try
//  {  
//    WONUM=WONUM-9;
//    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
//    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
//    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
//    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
//    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
//    activateItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
//    waitForObjectItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
//    activateItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
//    
//  
//    waitForObject(":Include Status.Open_XCheckBox");
//    if(!findObject(":Include Status.Open_XCheckBox").checked)
//    clickButton(":Include Status.Open_XCheckBox");
//    waitForObject(":Include Status.Released_XCheckBox");
//    if(!findObject(":Include Status.Released_XCheckBox").checked)
//    clickButton(":Include Status.Released_XCheckBox");
//    waitForObject(":Include Status.Exploded_XCheckBox");
//     if(!findObject(":Include Status.Exploded_XCheckBox").checked)
//    clickButton(":Include Status.Exploded_XCheckBox");
//    waitForObject(":Include Status.In-Process_XCheckBox");
//     if(!findObject(":Include Status.In-Process_XCheckBox").checked)
//    clickButton(":Include Status.In-Process_XCheckBox");
//   
//    
//    waitForObject(":List Unposted Invoices.Query_QPushButton");
//    clickButton(":List Unposted Invoices.Query_QPushButton");
//  
//      try
//      {
//          waitForObject(":*._wo_XTreeWidget");
//          openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);
//          waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
//          activateItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
//          waitForObject(":W/O Schedule by Planner Code.Implode_QPushButton");
//          clickButton(":W/O Schedule by Planner Code.Implode_QPushButton");
//          test.log("Work Order imploded:" + WONUM+"-1");
//      }
//      catch(e)
//      {
//          test.fail("Error in imploding WO" + e);
//      }
//      
//      try
//      {
//          WONUM++;
//          waitForObject(":*._wo_XTreeWidget");
//          openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
//          waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Explode W/O...");
//          activateItem(":xTuple ERP:*._menu_QMenu", "Explode W/O...");
//          waitForObject(":W/O Schedule by Planner Code.Explode_QPushButton");
//          clickButton(":W/O Schedule by Planner Code.Explode_QPushButton");
//          test.log("Work Order Exploded: " + WONUM+"-1");
//      }
//      catch(e)
//      {
//          test.fail("Error in exploding WO" + e);
//      }
//    
//    
//    //----Release Work Order---
//    try
//    {
//          WONUM++;
//          waitForObject(":*._wo_XTreeWidget");
//          waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
//          clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
//          openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
//          waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release W/O");
//          activateItem(":xTuple ERP:*._menu_QMenu", "Release W/O");    
//          test.log("Work Order Released: " + WONUM+"-1");  
//    }
//    catch(e)
//    {
//        test.fail("Error in releasing WO" + e);
//    }
//    
//    
//    
//    //----Issue Material------
//    try
//    {
//          WONUM++;
//          waitForObject(":*._wo_XTreeWidget");
//          waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
//          clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
//          openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
//          waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
//          activateItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
//          waitForObject(":_componentGroup._itemNumber_XComboBox");
//          clickItem(":_componentGroup._itemNumber_XComboBox", "TWHEEL1",5,5,1,Qt.LeftButton);
//          waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_3");
//          clickButton(":W/O Schedule by Planner Code.Post_QPushButton_3");
//          
//          waitForObject(":*._wo_XTreeWidget");    
//          openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
//          waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
//          activateItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
//          waitForObject(":_componentGroup._itemNumber_XComboBox");
//          clickItem(":_componentGroup._itemNumber_XComboBox", "TBODY1",5,5,1,Qt.LeftButton);
//          waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_3");
//          clickButton(":W/O Schedule by Planner Code.Post_QPushButton_3");
//          
//          waitForObject(":*._wo_XTreeWidget");    
//          openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
//          waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
//          activateItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
//          waitForObject(":_componentGroup._itemNumber_XComboBox");
//          clickItem(":_componentGroup._itemNumber_XComboBox", "TSUB1",5,5,1,Qt.LeftButton);
//          waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_3");
//          clickButton(":W/O Schedule by Planner Code.Post_QPushButton_3");
//          
//          waitForObject(":*._wo_XTreeWidget");    
//          openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
//          waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
//          activateItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
//          waitForObject(":_componentGroup._itemNumber_XComboBox");
//          clickItem(":_componentGroup._itemNumber_XComboBox", "YPAINT1",5,5,1,Qt.LeftButton);
//          waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_3");
//          clickButton(":W/O Schedule by Planner Code.Post_QPushButton_3");
//          waitForObject(":_frame._itemloc_XTreeWidget");
//          if(findObject(":_frame._itemloc_XTreeWidget").topLevelItemCount>1)
//          {
//              waitForObject(":Qty. Before_HeaderViewItem"); 
//              mouseClick(":Qty. Before_HeaderViewItem",10,10,0,Qt.LeftButton);
//              var x=findObject(":_itemloc1._QModelIndex").text;
//              var y=findObject(":_itemloc2._QModelIndex").text;
//              if(findObject(":_itemloc1._QModelIndex").text < findObject(":_itemloc2._QModelIndex").text)
//               mouseClick(":Qty. Before_HeaderViewItem",10,10,0,Qt.LeftButton);
//          }
//          
//          waitForObject(":W/O Schedule by Planner Code._itemloc_XTreeWidget");
//          doubleClickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget", "No",5, 5, 0, Qt.LeftButton);
//          waitForObject(":W/O Schedule by Planner Code.Distribute_QPushButton");
//          clickButton(":W/O Schedule by Planner Code.Distribute_QPushButton");  
//          waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
//          clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
//          test.log("Issued Materials: " + WONUM+"-1");
//    }
//    catch(e)
//    {
//        test.fail("Error in issuing material to WO" + e);
//      }
//    
//    
//    //-------Post Operation---------
//    try
//    {
//            WONUM++;
////            waitForObject(":*._wo_XTreeWidget");
////            openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
////            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
////            activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
////            waitForObject(":_operationGroup._wooper_XComboBox_2")
////             clickItem(":_operationGroup._wooper_XComboBox_2", "20 - Standard Paint Operation ",0,0,1,Qt.LeftButton);
////            waitForObject(":Post Operations.Post_QPushButton");
////            clickButton(":Post Operations.Post_QPushButton")
////             doubleClickItem(":_frame._itemloc_XTreeWidget","No" ,5, 5, 0, Qt.LeftButton);
////            
////            waitForObject(":Distribute to Location.Distribute_QPushButton");
////            clickButton(":Distribute to Location.Distribute_QPushButton");
////            waitForObject(":Distribute Stock To/From Site Locations.Post_QPushButton");
////            clickButton(":Distribute Stock To/From Site Locations.Post_QPushButton");
////            test.log("Posted partial Operation for WO: " + WONUM+"-1");
//    }
//    catch(e)
//    {
//        test.fail("Error in posting operations to WO" + e);
//    }
//    
//    
//    
//    
//    //---Post Production----
//    try
//    {
//            WONUM++;
////            waitForObject(":*._wo_XTreeWidget");
////            openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
////            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
////            activateItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
////            waitForObject(":_qty_XLineEdit");
////            type(":_qty_XLineEdit", "100");
////            waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
////            clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
////           test.log("Posted Production for WO: " + WONUM+"-1");
//    }
//    catch(e)
//    {
//        test.fail("Error in post production of WO" + e);
//    }
//    
//    
//    
//    //-------Close Work Order-------
//    try
//    {
//            WONUM++;
////            waitForObject(":*._wo_XTreeWidget");
////            openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
////            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
////            activateItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
////            waitForObject(":_qty_XLineEdit");
////            type(":_qty_XLineEdit", "100");
////            waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
////            clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
////                      
////            waitForObject(":*._wo_XTreeWidget");
////            openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);    
////            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Close W/O...");
////            activateItem(":xTuple ERP:*._menu_QMenu", "Close W/O...");
////            waitForObject(":W/O Schedule by Planner Code.Close W/O_QPushButton");
////            clickButton(":W/O Schedule by Planner Code.Close W/O_QPushButton");
////            waitForObject(":W/O Schedule by Planner Code.Yes_QPushButton");
////            clickButton(":W/O Schedule by Planner Code.Yes_QPushButton");
////            waitForObject(":*.Close_QPushButton");
////            clickButton(":*.Close_QPushButton");
//            
//            test.log("Closed WO: "+ WONUM+"-1");
//     }
//      catch(e)
//      {
//          test.fail("Error in closing WO" + e);
//      }
//      
//      waitForObject(":List Unposted Invoices.Close_QPushButton");
//      clickButton(":List Unposted Invoices.Close_QPushButton");
//  }
//  catch(e)
//  {
//      test.fail("Error in opening list of orders screen"+ e);
//  }
//  
//
//
//  //-------------Clock Out Operation----------
//  try
//  {
//      WONUM++;
//      waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
//      activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
//      waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
//      activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
//      waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
//      activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
//      waitForObject(":_voucherGroup...._QPushButton_2");
//      clickButton(":_voucherGroup...._QPushButton_2");
//       waitForObject(":_listTab_XTreeWidget_15");
//        doubleClickItem(":_listTab_XTreeWidget_15","admin", 10, 10, 0, Qt.LeftButton);
//      waitForObject(":*._wooperList_XTreeWidget");
//      clickItem(":*._wooperList_XTreeWidget",WONUM+"-1", 5, 5, 0, Qt.LeftButton);
//      
////      waitForObject(":*.Clock Out_QPushButton");
////      clickButton(":*.Clock Out_QPushButton");
////      waitForObject(":Post Operations.Post_QPushButton");
////      clickButton(":Post Operations.Post_QPushButton");
////      waitForObject(":_itemloc.N/A_QModelIndex");
////      mouseClick(":_itemloc.N/A_QModelIndex", 23, 7, 0, Qt.LeftButton);
////      waitForObject(":_frame.Distribute_QPushButton");
////      clickButton(":_frame.Distribute_QPushButton");
////      waitForObject(":Distribute to Location.Distribute_QPushButton");
////      clickButton(":Distribute to Location.Distribute_QPushButton");
////      waitForObject(":Distribute Stock To/From Site Locations.Post_QPushButton");
////      clickButton(":Distribute Stock To/From Site Locations.Post_QPushButton");
////      waitForObject(":Scrap Work Order Material from W/O.Close_QPushButton");
////      clickButton(":Scrap Work Order Material from W/O.Close_QPushButton");
//      waitForObject(":List Unposted Invoices.Close_QPushButton");
//      clickButton(":List Unposted Invoices.Close_QPushButton");
//      
////      waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
////      activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
////      waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
////      activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
////      waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
////      activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
////      waitForObject(":xTuple ERP:*_QPushButton");
////      clickButton(":xTuple ERP:*_QPushButton");
////      waitForObject(":_user.admin_QModelIndex");
////      doubleClick(":_user.admin_QModelIndex", 5, 5, 0, Qt.LeftButton);
////      if(findObject(":*._wooperList_XTreeWidget").topLevelItemCount==0)
////          test.pass("Paint Operation is clocked out");
////      waitForObject(":List Unposted Invoices.Close_QPushButton");
////      clickButton(":List Unposted Invoices.Close_QPushButton");
//  }
//  catch(e)
//  {
//      test.fail("Error in the clock out operation" + e);
//  }
//  
//  
//  //-------Correct Post Production-----
//  try
//  {
//        WONUM++;
//        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
//        activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
//        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
//        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
//        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
//        activateItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
//        waitForObjectItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
//        activateItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
//        
//        waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
//        clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
//        waitForObject(":*._wo_XTreeWidget");
//        openItemContextMenu(":*._wo_XTreeWidget",WONUM+"-1" , 5, 5, 0);
//        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Correct Production Posting...");
//        activateItem(":xTuple ERP:*._menu_QMenu", "Correct Production Posting...");
//        waitForObject(":_qty_XLineEdit_3");
//        type(":_qty_XLineEdit_3", "50");
//        waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_4");
//        clickButton(":W/O Schedule by Planner Code.Post_QPushButton_4");
//        waitForObject(":*._wo_XTreeWidget");
//        openItemContextMenu(":*._wo_XTreeWidget", WONUM+"-1", 5, 5, 0);
//        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Correct Production Posting...");
//        activateItem(":xTuple ERP:*._menu_QMenu", "Correct Production Posting...");
//        var x=findObject(":_qtyGroup.50.00_XLabel").text;
//        var y=findObject(":_qtyGroup.50.00_XLabel_2").text
//              var z=findObject(":_qtyGroup.100.00_XLabel_2").text;
//        if(z==x+y)
//            test.log("Correct post production fo WO :" + WONUM+"-1");
//        waitForObject(":Miscellaneous Voucher.Cancel_QPushButton_2");
//        clickButton(":Miscellaneous Voucher.Cancel_QPushButton_2");
//        
//        
//        
//        waitForObject(":List Unposted Invoices.Close_QPushButton");
//        clickButton(":List Unposted Invoices.Close_QPushButton");
//    }
//    catch(e)
//    {
//        test.fail("Error in correcting post production" + e);
//    }
//    
     
  
    //-------------Verification of tax calculations-------------
    
    try
    {
        SONUM=SONUM+6;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
        
        try
        {
            
            waitForObject(":frame._so_XTreeWidget_2");
            doubleClickItem(":frame._so_XTreeWidget_2",SONUM,0,0,0,Qt.LeftButton);
            waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
            clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.Tax:_XURLLabel");
            mouseClick(":_lineItemsPage.Tax:_XURLLabel",56,11,0,Qt.LeftButton);
            
            
            if(findObject(":groupBox._currency_XLineEdit").text == "0.00")
                test.pass("Tax is caculated correctly");
            waitForObject(":Sales Order.Close_QPushButton_3");
            clickButton(":Sales Order.Close_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
        }
        catch(e)
        {
            test.fail("Error in opening sales order"+ e);
        }
        
        try
        {
            SONUM++; 
            waitForObject(":frame._so_XTreeWidget_2");
            doubleClickItem(":frame._so_XTreeWidget_2",SONUM,0,0,0,Qt.LeftButton);
            waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
            clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Line Items");
            var a=replaceSubstring((findObject(":_lineItemsPage_XLineEdit").text).latin1(),",","");
            var x=parseFloat(a);
            waitForObject(":_lineItemsPage.Tax:_XURLLabel");
            mouseClick(":_lineItemsPage.Tax:_XURLLabel",56,11,0,Qt.LeftButton);
            var y=parseFloat(findObject(":groupBox._currency_XLineEdit").text);
            var z=x * 0.05;
            if(y==(x*0.05))
                test.pass("Tax is caculated correctly");
            waitForObject(":Sales Order.Close_QPushButton_3");
            clickButton(":Sales Order.Close_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
        }
        catch(e)
        {
            test.fail("Error in opening sales order"+ e);
            
        }
        
        try
        {
            SONUM++;
            waitForObject(":frame._so_XTreeWidget_2");
            doubleClickItem(":frame._so_XTreeWidget_2",SONUM,0,0,0,Qt.LeftButton);
            waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
            clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Line Items");
            var a=replaceSubstring((findObject(":_lineItemsPage_XLineEdit").text).latin1(),",","");
            var x=parseInt(a);
            waitForObject(":_lineItemsPage.Tax:_XURLLabel");
            mouseClick(":_lineItemsPage.Tax:_XURLLabel",56,11,0,Qt.LeftButton);
            var y=parseInt(findObject(":groupBox._currency_XLineEdit").text);
            var z=parseInt(x*(0.05+0.10));
            if(y==z)
                test.pass("Tax is caculated correctly");
            waitForObject(":Sales Order.Close_QPushButton_3");
            clickButton(":Sales Order.Close_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
        }
        catch(e)
        {
            test.fail("Error in opening sales order"+ e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":frame._so_XTreeWidget_2");
            doubleClickItem(":frame._so_XTreeWidget_2",SONUM,0,0,0,Qt.LeftButton);
            waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
            clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Line Items");
            var a=replaceSubstring((findObject(":_lineItemsPage_XLineEdit").text).latin1(),",","");
            var x=parseInt(a);
            waitForObject(":_lineItemsPage.Tax:_XURLLabel");
            mouseClick(":_lineItemsPage.Tax:_XURLLabel",56,11,0,Qt.LeftButton);
            var y=parseInt(findObject(":groupBox._currency_XLineEdit").text);
            var z=parseInt(x *(0.05+0.10+0.15));
            if(y==z)
                test.pass("Tax is caculated correctly");
            waitForObject(":Sales Order.Close_QPushButton_3");
            clickButton(":Sales Order.Close_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
        }
        catch(e)
        {
            test.fail("Error in opening sales order"+ e);
        }
        
        try
        {
            SONUM++;
            waitForObject(":frame._so_XTreeWidget_2");
            doubleClickItem(":frame._so_XTreeWidget_2",SONUM,0,0,0,Qt.LeftButton);
            waitForObject(":*.qt_tabwidget_tabbar_QTabBar");
            clickTab(":*.qt_tabwidget_tabbar_QTabBar", "Line Items");
            var a=replaceSubstring((findObject(":_lineItemsPage_XLineEdit").text).latin1(),",","");
            var x=parseInt(a);
            waitForObject(":_lineItemsPage.Tax:_XURLLabel");
            mouseClick(":_lineItemsPage.Tax:_XURLLabel",56,11,0,Qt.LeftButton);
            var y=parseInt(findObject(":groupBox._currency_XLineEdit").text);
            var z=(x * 0.05);
            var b=x+z;
            var c=parseFloat(b*0.10);
            var d=parseInt(z+c);
            if(y==d)
                test.pass("Tax is caculated correctly");
            waitForObject(":Sales Order.Close_QPushButton_3");
            clickButton(":Sales Order.Close_QPushButton_3");
            waitForObject(":Sales Order.Close_QPushButton_2");
            clickButton(":Sales Order.Close_QPushButton_2");
        }
        catch(e)
        {
            test.fail("Error in opening sales order"+ e);
        }   
        
        waitForObject(":List Open Sales Orders.Close_QPushButton_2");
        clickButton(":List Open Sales Orders.Close_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in opening list of sales orders screen"+ e);
    }
    
  
    //----------Select Order for Billing--------
    try
    {
        SONUM=SONUM-12;
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP:*.Invoice_QMenu_2", "Select Order for Billing...");
        activateItem(":xTuple ERP:*.Invoice_QMenu_2", "Select Order for Billing...");
        waitForObject(":Select Order for Billing...._QPushButton");
        clickButton(":Select Order for Billing...._QPushButton");
        waitForObject(":Select Order for Billing._so_XTreeWidget");
        doubleClickItem(":Select Order for Billing._so_XTreeWidget", SONUM, 5, 5, 0, Qt.LeftButton);
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
        test.fail("Error in selcting order for billing" + e);
    }  
    
    
    
}


