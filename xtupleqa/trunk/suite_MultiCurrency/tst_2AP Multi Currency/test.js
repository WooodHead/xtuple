function main()
{
     
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
       var appE = findApplicationEdition(); 
    
    // ----------- Purchase Order Processing-------------
    //-------------- Creating Exchange Rate for the currency EUR-----------------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Master Information.Exchange Rates_QModelIndex");
        mouseClick(":Master Information.Exchange Rates_QModelIndex", 22, 9, 0, Qt.LeftButton);
        waitForObject(":_queryParameters.Selected:_QRadioButton");
        clickButton(":_queryParameters.Selected:_QRadioButton");
        waitForObject(":_queryParameters._items_XComboBox");
        clickItem(":_queryParameters._items_XComboBox","EUR - €", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_6");
        findObject(":_dateGroup.XDateEdit_XDateEdit_6").clear();
        type(":_dateGroup.XDateEdit_XDateEdit_6", "0");
        nativeType("<Tab>");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        
        if(object.exists("{column='0' container=':_frame._conversionRates_XTreeWidget' text='EUR - €' type='QModelIndex'}"))
        { 
            waitForObject(":_frame._conversionRates_XTreeWidget");
            clickItem(":_frame._conversionRates_XTreeWidget","EUR - €", 0, 0, 5, Qt.LeftButton);
            waitForObject(":xTuple ERP:*.Delete_QPushButton");
            clickButton(":xTuple ERP:*.Delete_QPushButton");
        }
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":_stack._currency_XComboBox");
        clickItem(":_stack._currency_XComboBox","EUR - €", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_stack._rate_XLineEdit");
        type(":_stack._rate_XLineEdit","2");
        nativeType("<Tab>");
        
        eurRate = findObject(":_stack._rate_XLineEdit").text;
        
        waitForObject(":_stack.XDateEdit_XDateEdit");
        findObject(":_stack.XDateEdit_XDateEdit").clear();
        type(":_stack.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":_stack.XDateEdit_XDateEdit_2");
        findObject(":_stack.XDateEdit_XDateEdit_2").clear();
        type(":_stack.XDateEdit_XDateEdit_2", "+365");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Exchange Rate is created for the currency EUR - €");
    }
    catch(e)
    {
        test.fail("failed to create exchange rates for the currency EUR - € "+ e);
    }
    snooze(3);
     //--------------- Set the window to Tab view mode -------------

    tabView();
    //-----Creating a Purchase Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
        type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "XPPI");
        snooze(0.5);
        nativeType("<Tab>");
        
        ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
        type(":groupBox_2.ItemLineEdit_ItemLineEdit", "TBOX1");
        snooze(0.1);
        nativeType("<Tab>");
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "100");
        
        polineitem = findObject(":groupBox_2.ItemLineEdit_ItemLineEdit").text;         
        poquantity = findObject(":_ordered_XLineEdit").text;       
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        snooze(0.5);
        waitForObject(":Invalid Unit Price.Continue_QPushButton");
        clickButton(":Invalid Unit Price.Continue_QPushButton");
        
        var poamount = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ponumber+"' type='QModelIndex'}"))
            test.pass("Purchase order created successfully for XPPI");
        else 
            test.fail("Purchase order couldn't be created for XPPI");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating purchase order" + e);
    }
    //-----Releasing Purchase Orders-----
    try
    {	 
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",ponumber, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("PO "+ponumber+ " released successfully");
        
    }
    catch(e)
    {
        test.fail("Error in releasing purchase orders" + e);
    }
    
    //------Verifying QOH (before receiving Goods)------------
    var  qtyItem=queryQoh(polineitem,"WH1",appE);
    
    
    //-----Receiving Purchase Goods-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");  
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit",ponumber);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("PO "+ponumber+ " goods are received");
    }
    
    catch(e)
    {
        test.fail("Error in receiving purchase order line items" + e);
    }
    //----Verifying Updated QOH----
    
    var result=queryQoh(polineitem,"WH1",appE);
    test.log(result);
    if(result-parseInt(poquantity) == qtyItem)
        test.pass(" "+polineitem+" QOH updated sucessfully:");
    else
        test.fail("failed to update QOH: "+polineitem+" ");
    
    //--------------Verifying Gl Entries-----------------
    
    var ponumbergl =ponumber+"-1";
    
    var bool1=glTransactions(/Receive Inventory/,ponumbergl);
    if(bool1 == 1)
    {
        test.pass("PO " + ponumbergl + " has a GL entry for Posting the receipt");
    }
    else
        test.fail("No GL entry is made for posting the rceipt" + ponumbergl);
    
    
    
    //-----Entering a Voucher-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        waitForObject(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_voucherGroup.VirtualClusterLineEdit_OrderLineEdit",ponumber);
        nativeType("<Tab>");
        vounumber = findObject(":_voucherNumber_XLineEdit").text; 
        test.log(vounumber);
        waitForObject(":_poitems._poitem_XTreeWidget");
        doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 1, Qt.LeftButton);  
        snooze(0.5);
        waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget");
        doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_distTab.New_QPushButton");
        clickButton(":_distTab.New_QPushButton");
        snooze(0.5);
        waitForObject(":Voucher Item Distribution.Save_QPushButton");
        clickButton(":Voucher Item Distribution.Save_QPushButton");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":_amount.XLineEdit_XLineEdit");
        
        vouamount = findObject(":_amount.XLineEdit_XLineEdit_2").text;
        type(":_amount.XLineEdit_XLineEdit",vouamount);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_6");
        type(":_dateGroup.XDateEdit_XDateEdit_6", "+0");
        nativeType("<Tab>");
        waitForObject(":_invoiceNum_XLineEdit");
        type(":_invoiceNum_XLineEdit", "VO for" + ponumber);
        
        if(vouamount ==  poamount)
            test.pass("Voucher is created in foreign currency for XPPI");
        else
            test.fail("Error in creating voucher with foreign currency for XPPI");
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating vouchers for purchase orders" + e);
    }
    
    //-----Posting Vouchers-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        
        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
        if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+vounumber+"' type='QModelIndex'}"))
            test.pass(" Voucher created for foreign vendor");
        else 
            test.fail(" Voucher not created foreign vendor");
        
        clickItem(":xTuple ERP:*._vohead_XTreeWidget",vounumber,0, 0, 5, Qt.LeftButton);
        
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in posting vouchers" + e);
    }
    
    // --------Verify in GL----------
    
    var bool = glTransactions(/XPPI/, vounumber);
    if(bool == 1)
    {
        test.pass("Voucher " + vounumber + " posted successfully and has a GL entry");
    }
    else
        test.fail("Error in posting Voucher " + vounumber + " ");
    
    //---Selecting Voucher for Payment---
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "Select...");
        waitForObject(":xTuple ERP:*._select_XComboBox");
        clickItem(":xTuple ERP:*._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
        waitForObject(":xTuple ERP:*._selectDate_XComboBox");
        clickItem(":xTuple ERP:*._selectDate_XComboBox", "All", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", vounumber, 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Select..._QPushButton");
        clickButton(":frame.Select..._QPushButton");
        
        checkamt = findObject(":Cash Receipt.XLineEdit_XLineEdit").text;
        test.log(checkamt);
        snooze(0.5);
        waitForObject(":_bankaccnt_XComboBox");
        clickItem(":_bankaccnt_XComboBox", "EuroBank-Euro Bank", 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        test.log("Selected Voucher for Payment");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in selecting voucher for payment" + e);
    }
    
    
    //-----Prepare Check run-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
        snooze(0.5);
        waitForObject(":Prepare Check Run._bankaccnt_XComboBox");
        clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EuroBank-Euro Bank", 5, 5, 1, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Prepare Check Run.Prepare_QPushButton");
        clickButton(":Prepare Check Run.Prepare_QPushButton");
        test.log("Check run prepared successfully");
    }
    catch(e)
    {
        test.fail("Error in preparing check run" + e);
    }
    snooze(0.1);
    
    //-----View Check run-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
        waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        activateItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
        snooze(0.5);
        waitForObject(":xTuple ERP:*._bankaccnt_XComboBox");
        clickItem(":xTuple ERP:*._bankaccnt_XComboBox","EuroBank-Euro Bank", 0,0,5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_frame._check_XTreeWidget");
        
        if(object.exists("{column='6' container=':_frame._check_XTreeWidget' text='"+checkamt+"' type='QModelIndex'}"))		{
            test.log("check is created");
        }
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    catch(e)
    {
        test.fail("Error in viewing check run" + e);
    }
    

}
