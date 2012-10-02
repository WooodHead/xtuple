
function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
  
   //-----Editing of preferences----
        try
        {
            if(OS.name == "Darwin")
            {
                 activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
                 activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Preferences..."));
            }
            else
            {

        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
    }
         waitForObject(":Interface Options.Show windows inside workspace_QRadioButton");
            snooze(0.5);
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
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
   
   var appE = findApplicationEdition();
    
    //-------------- Creating Exchange Rates-----------------------
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
        clickItem(":_queryParameters._items_XComboBox","GBP - £", 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_6");
        findObject(":_dateGroup.XDateEdit_XDateEdit_6").clear();
        
        type(":_dateGroup.XDateEdit_XDateEdit_6", "0");
        nativeType("<Tab>");
        
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        
        
        waitForObject(":_frame._conversionRates_XTreeWidget");
        if(object.exists("{column='0' container=':_frame._conversionRates_XTreeWidget' text='GBP - £' type='QModelIndex'}"))
        { 
            
            waitForObject(":_frame._conversionRates_XTreeWidget");
            clickItem(":_frame._conversionRates_XTreeWidget","GBP - £", 0, 0, 5, Qt.LeftButton);
            waitForObject(":xTuple ERP:*.Delete_QPushButton");
            clickButton(":xTuple ERP:*.Delete_QPushButton");
        }
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":_stack._currency_XComboBox");
        clickItem(":_stack._currency_XComboBox","GBP - £", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_stack._rate_XLineEdit");
        findObject(":_stack._rate_XLineEdit").clear();
        type(":_stack._rate_XLineEdit","1.56");
        nativeType("<Tab>");
        
        rate = findObject(":_stack._rate_XLineEdit").text;
        
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
        
        test.log("Exchange Rate is created sucessfully for GBP - £");
    }
    catch(e)
    {
        test.fail("failed to create exchange rates for GBP - £" + e);
    }
  
  
    //--------------- Set the window to Tab view mode -------------

    tabView();
      //------------creating sales order for foreign customer-------------
    snooze(3);
    var sonumber = createSalesOrder1("YTRUCK1", "100","XTRM");
    
    
    
    //----------------issue stock to shipping-----------------------
    issueStock(sonumber);
    
    
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
        test.log("Invoice Created successfully");
        
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
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sonumber,5,5,Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(2);
        
        soinvoice = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        
        invoic_amt = findObject(":Cash Receipt.XLineEdit_XLineEdit").text;
        
        waitForObject(":Invoice.Close_QPushButton");
        clickButton(":Invoice.Close_QPushButton");
        
        if(soamt == invoic_amt)
            test.pass("Invoice "+soinvoice+" is created with foreign currency");
        else 
            test.fail("Invoice "+soinvoice+" is not created with foreign currency");
        
        //----Posting the created Invoice----
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sonumber,5,5,Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Invoice "+soinvoice+" posted successfully");
    }
    catch(e)
    {
        test.fail("Error in posting "+soinvoice+" invoice" + e);
    }
    
    //------------------------Verifying in GL-----------------
    
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
          snooze(2);
        if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
         type(":_filterGroup.XDateEdit_XDateEdit","0");
        waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(":_filterGroup.XDateEdit_XDateEdit_2","0");
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton");
        waitForObject(":_filterGroup.xcomboBox3_XComboBox_2");
        clickItem(":_filterGroup.xcomboBox3_XComboBox_2","Document #", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit",soinvoice);
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
        var obj = obj_TreeWidget.topLevelItemCount;
       
        var obj_treeItem = obj_TreeWidget.topLevelItem(obj-3);
        var result = obj_treeItem.text(7);
        result = replaceSubsting(result);
        test.log(result);
        
        var result1 = roundNumber((soamt*rate),2);
        test.log(result1);
        
        if(result == result1)
            test.pass("foreign currency is converted into base currency and has a GL entry");
        else
            test.fail("foreign currency doesn't converted to base currency and has a GL entry");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in posting invoices" + e);
    }
    
    //-----Creating Cash Receipts-----
    try{
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
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "XTRM");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_docGroup._bankaccnt_XComboBox");
        clickItem(":_docGroup._bankaccnt_XComboBox","GBank-GBank", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget_2", sonumber, 5, 5, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        
        soamount = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        
        type(":Cash Receipt.XLineEdit_XLineEdit", soamount);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", soamount);
        waitForObject(":Cash Receipt.Save_QPushButton_2");
        clickButton(":Cash Receipt.Save_QPushButton_2");   
        test.log("Cash receipt is created");
    }
    catch(e)
    {
        test.fail("error in creating cash receipts" + e);
        
    }
    //-----Posting Cash Receipts-----
    try
    {
        
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        
        waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
        while(findObject(":_cashRecptTab._cashrcpt_XTreeWidget").topLevelItemCount >= 1)
        {
            clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "XTRM", 5, 5, 1, Qt.LeftButton);
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
    
    //----------------Verify in GL------------------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
          snooze(2);
        if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
         type(":_filterGroup.XDateEdit_XDateEdit","0");
        waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(":_filterGroup.XDateEdit_XDateEdit_2","0");
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton");
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 0, 0,5, Qt.LeftButton);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit", "C-");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='XTRM-Xtreme Toys LTD' type='QModelIndex'}"))		
            test.pass("Posting cash Receipt has a GL entry");
        else
            test.fail("Posting cash Receipt doesn't  has a GL entry");
        
        var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
        var obj = obj_TreeWidget.topLevelItemCount;
        test.log(obj);
        var obj_treeItem = obj_TreeWidget.topLevelItem(obj-1);
        var result = obj_treeItem.text(7);
        result = replaceSubsting(result);
        test.log(result);
        var result1 = roundNumber((soamount*rate),2);
            if(result == result1)
            test.pass("foreign currency is converted into base currency and has a GL entry for cash receipt");
        else
            test.fail("foreign currency doesn't converted to base currency and has a GL entry for cash receipt");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("error in verifying GL entry for Cash Receipt"+ e);
    }
    
    
    //------Editing Exchange Rate to Current date------------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Master Information.Exchange Rates_QModelIndex");
        mouseClick(":Master Information.Exchange Rates_QModelIndex", 40, 7, 0, Qt.LeftButton);
        waitForObject(":_queryParameters.Selected:_QRadioButton");
        clickButton(":_queryParameters.Selected:_QRadioButton");
        waitForObject(":_queryParameters._items_XComboBox");
        clickItem(":_queryParameters._items_XComboBox","GBP - £", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_6");
        findObject(":_dateGroup.XDateEdit_XDateEdit_6").clear();
        type(":_dateGroup.XDateEdit_XDateEdit_6", "0");
        nativeType("<Tab>");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        waitForObject(":_frame._conversionRates_XTreeWidget");
        clickItem(":_frame._conversionRates_XTreeWidget","GBP - £", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_frame.Edit_QPushButton");
        clickButton(":_frame.Edit_QPushButton");
        waitForObject(":_stack._currency_XComboBox");
        clickItem(":_stack._currency_XComboBox","GBP - £", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_stack._rate_XLineEdit");
        findObject(":_stack._rate_XLineEdit").clear();
        type(":_stack._rate_XLineEdit","1.56");
        nativeType("<Tab>");
        waitForObject(":_stack.XDateEdit_XDateEdit_2");
        findObject(":_stack.XDateEdit_XDateEdit_2").clear();
        type(":_stack.XDateEdit_XDateEdit_2", "+0");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("GBP - £ exchange rate end date is set to Current date");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
    }
    catch(e)
    {
        test.fail("failed to edit the exchange rates: "+e);
    }
    
    //------------- Creating Sales Order--------------------------------   
    
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "New...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "New...");
        waitForObject(":_headerPage.XDateEdit_XDateEdit");
        findObject(":_headerPage.XDateEdit_XDateEdit").clear();
        type(":_headerPage.XDateEdit_XDateEdit", "+1");
        nativeType("<Tab>");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "XTRM");
        nativeType("<Tab>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
         snooze(0.5);
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
         if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            test.xverify(object.exists(":Sales Order.OK_QPushButton_2"), "Exchange Rate not found");
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
        }
          waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
       
        nativeType("<Tab>");
        snooze(0.5);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            test.xverify(object.exists(":Sales Order.OK_QPushButton_2"), "Exchange Rate not found");
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
        }
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        snooze(0.5);
        waitForObject(":Sales Order.No_QPushButton_2");
        clickButton(":Sales Order.No_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.pass("Sales order is not created because it dont have exchange rate");
    }
    catch(e)
    {
        test.fail("sales order is created without any exchange rate"+e);
    }
    
    
    //---------------Creating Exchange Rate as starting Date as tommorrow's date-------------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Master Information.Exchange Rates_QModelIndex");
        mouseClick(":Master Information.Exchange Rates_QModelIndex", 40, 7, 0, Qt.LeftButton);
        waitForObject(":_queryParameters.Selected:_QRadioButton");
        clickButton(":_queryParameters.Selected:_QRadioButton");
        waitForObject(":_queryParameters._items_XComboBox");
        clickItem(":_queryParameters._items_XComboBox","GBP - £", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":_stack._currency_XComboBox");
        clickItem(":_stack._currency_XComboBox","GBP - £", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_stack._rate_XLineEdit");
        findObject(":_stack._rate_XLineEdit").clear();
        type(":_stack._rate_XLineEdit","1.788");
        nativeType("<Tab>");
        
        var newRate = findObject(":_stack._rate_XLineEdit").text;
        
        waitForObject(":_stack.XDateEdit_XDateEdit");
        findObject(":_stack.XDateEdit_XDateEdit").clear();
        type(":_stack.XDateEdit_XDateEdit", "+1");
        nativeType("<Tab>");
        waitForObject(":_stack.XDateEdit_XDateEdit_2");
        findObject(":_stack.XDateEdit_XDateEdit_2").clear();
        type(":_stack.XDateEdit_XDateEdit_2", "+365");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("GBP - £ Exchange rate is created successfully for XTRM");
        
    }
    catch(e)
    {
        test.fail("Failed to create exchange rate"+ e );
    }
    
    //---------- Creating invoice--------
    
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "XTRM");
        nativeType("<Tab>");
        waitForObject(":headerTab.XDateEdit_XDateEdit");
        findObject(":headerTab.XDateEdit_XDateEdit").clear();
        type(":headerTab.XDateEdit_XDateEdit", "+1");
        nativeType("<Tab>");
        var invNum = findObject(":_invoiceNumber_XLineEdit").text;
        waitForObject(":_billtoFrame.Copy to Ship-to ->_QPushButton");
        clickButton(":_billtoFrame.Copy to Ship-to ->_QPushButton");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":_ordered_XLineEdit_2");
        type(":_ordered_XLineEdit_2", "100");
        nativeType("<Tab>");
        waitForObject(":_billed_XLineEdit");
        type(":_billed_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        var inv_amt1 = findObject(":Cash Receipt.XLineEdit_XLineEdit").text;
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        //----------- Posting Invoice---------
        
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+invNum+"' type='QModelIndex'}"))
            test.pass("Invoice " +invNum+ " is created for XTRM");
        else
            test.fail("Invoice " +invNum+ " is not created   for XTRM");
        
        openItemContextMenu(":_list_XTreeWidget_3",invNum, 5,5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        test.log("Invoice " +invNum+ " posted successfully");
        
    }
    catch(e)
    {
        test.fail("error in processing invoice"+ e);
    }
    
    
    // -------------- Creating Cash Receipt--------------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Cash Receipt");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Cash Receipt");
        waitForObjectItem(":xTuple ERP:*.Cash Receipt_QMenu", "Edit List...");
        activateItem(":xTuple ERP:*.Cash Receipt_QMenu", "Edit List...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "XTRM");
        nativeType("<Tab>");
        waitForObject(":_docGroup._bankaccnt_XComboBox");
        clickItem(":_docGroup._bankaccnt_XComboBox","GBank-GBank", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", "10000");
        
        var recve_amt = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
        
        waitForObject(":_docGroup.XDateEdit_XDateEdit_2");
        findObject(":_docGroup.XDateEdit_XDateEdit_2").clear();
        type(":_docGroup.XDateEdit_XDateEdit_2", "+1");
        nativeType("<Tab>");
        waitForObject(":_docGroup.XDateEdit_XDateEdit");
        findObject(":_docGroup.XDateEdit_XDateEdit").clear();
        type(":_docGroup.XDateEdit_XDateEdit", "+1");
        nativeType("<Tab>");
        waitForObject(":_applicationsTab.Apply to Balance_QPushButton");
        clickButton(":_applicationsTab.Apply to Balance_QPushButton");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        nativeType("<Tab>");
        test.log("Cash receipt is created for foreign customer");
        
        //-------Posting Cash Receipt------
        waitForObject(":xTuple ERP:*._cashrcpt_XTreeWidget");
        while(findObject(":xTuple ERP:*._cashrcpt_XTreeWidget").topLevelItemCount >= 1)
        {
            clickItem(":xTuple ERP:*._cashrcpt_XTreeWidget", "XTRM", 0, 0, 5, Qt.LeftButton);
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
        }   
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Cash receipts posted successful");
        
    }
    catch(e)
    {
        test.fail("error in cash receipt creation");
    }
    //----------Verify in GL----------------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
      snooze(2);
        if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
       
        waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(":_filterGroup.XDateEdit_XDateEdit_2", "+1");
        nativeType("<Tab>");
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit", "+1");
        nativeType("<Tab>");
        
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton");
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 0, 0,5, Qt.LeftButton);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit", "C-");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='XTRM-Xtreme Toys LTD' type='QModelIndex'}"))		
            test.pass("Posting cash Receipt has a GL entry");
        else
            test.fail("Posting cash Receipt doesn't  has a GL entry");
        
        var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
        var obj = obj_TreeWidget.topLevelItemCount;
       
        var obj_treeItem = obj_TreeWidget.topLevelItem(obj-1);
        var result = obj_treeItem.text(7);
        result = replaceSubsting(result);
       
        var result1 = (recve_amt*newRate);
        test.log(result1);
        
        if(result == result1)
            test.pass("foreign currency is converted into base currency and has a GL entry for cash receipt");
        else
            test.fail("foreign currency doesn't converted to base currency and has a GL entry for cash receipt");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    
    catch(e)
    {
        test.fail("error in verifying GL entry for Cash Receipt"+e);
        
    }
    
  
    //------------------- Service Order Processing-----------------
    
    var sojob = createSalesOrder1("REPAIRT1", "100","XTRM");
    
    test.log(soamt);
    
    var wonum = sojob+"-1";
    test.log(""+wonum+" WO for REPAIRT1 created successfully linked to sales order")
            
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
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",wonum, 5, 5,  Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("WO"+wonum+"released");
        
    }
    catch(e)
    {
        test.fail(" error in releasing WO" +e); 
    }
    
    if((appE == "Manufacturing"))
    {
        
        // ----------- posting 'Inspect' operation-----------------
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
            activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
            waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
            type(":_woGroup.VirtualClusterLineEdit_WoLineEdit", wonum);
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_operationGroup._wooper_XComboBox");
            clickItem(":_operationGroup._wooper_XComboBox","10 - Inspect ", 0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":_qty_XLineEdit_2");
            findObject(":_qty_XLineEdit_2").clear();
            waitForObject(":_qty_XLineEdit_2");
            type(":_qty_XLineEdit_2", "100");
            nativeType("<Tab>");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            test.log("Inspect operation posted successfully for"+wonum+" ");
            
        }
        catch(e)
        {
            test.fail("posting Inspect operation failed" +e);
        }
        
        
        // --------Verify in GL----------
        
        var bool = glTransactions(/Post Run Time Inspect/, wonum);
        if(bool == 1)
        {
            test.pass("Voucher " + wonum + " posted successfully and has a GL entry");
        }
        else
            test.fail("Error in posting Voucher " + wonum + " ");
    }
    
    //------------- Adding WO Material----------------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Materials");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Materials");
        waitForObjectItem(":xTuple ERP:*.Materials_QMenu", "Maintain...");
        activateItem(":xTuple ERP:*.Materials_QMenu", "Maintain...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_WoLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_WoLineEdit", wonum);
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        
        waitForObject(":Component.ItemLineEdit_ItemLineEdit_2");
        type(":Component.ItemLineEdit_ItemLineEdit_2","TBODY1");
        nativeType("<Tab>");
        snooze(0.5);
        var womatl = findObject(":Component.ItemLineEdit_ItemLineEdit_2").text;
        
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        snooze(0.5);
        if(object.exists("{column='0' container=':xTuple ERP:*._womatl_XTreeWidget' text='"+womatl+"' type='QModelIndex'}"))			
            test.pass("Material"+womatl+" is added to the WO"+wonum+"");
        else
            test.fail("error in adding material");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("error in adding new material" +e);
    }
    
    //-------------------issue material to the WO-----------------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Issue Material");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Issue Material");
        waitForObjectItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
        activateItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2", wonum);
        nativeType("<Tab>");
        
        waitForObject(":_frame._womatl_XTreeWidget");
        if(object.exists("{column='0' container=':_frame._womatl_XTreeWidget' text='TWHEEL1' type='QModelIndex'}" && "{column='5' container=':_frame._womatl_XTreeWidget' text='100.00' type='QModelIndex'}"))
            test.pass("Work Order's material (TWHEEL1)found and Qty required is correct");
        else  
            test.fail("Work Order's material(TWHEEL1) is not found or  Qty required is incorrect"); 
        snooze(1);
        
        
        waitForObject(":_frame._womatl_XTreeWidget");
        if(object.exists("{column='0' container=':_frame._womatl_XTreeWidget' text='TBODY1' type='QModelIndex'}" && "{column='5' container=':_frame._womatl_XTreeWidget' text='100.00' type='QModelIndex'}"))
            test.pass("Work Order's material (TBODY1)found and Qty required is correct");
        else  
            test.fail("Work Order's material(TBODY1) is not found or  Qty required is incorrect"); 
        snooze(1);
        waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
        clickButton(":Issue Work Order Material Batch.Post_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Materials issued successfully for"+wonum+"");
    }
    catch(e)
    {
        test.fail("error in issuing material to the WO" +wonum+"");
    }
    
    
    
    //-------------posting operation--------------
    
    if((appE == "Manufacturing"))
    {
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
            waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
            waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
            activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
            waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
            type(":_woGroup.VirtualClusterLineEdit_WoLineEdit", wonum);
            nativeType("<Tab>");
            snooze(0.5);
            waitForObject(":_operationGroup._wooper_XComboBox");
            clickItem(":_operationGroup._wooper_XComboBox","20 - Repair Truck ", 0, 0, 5, Qt.LeftButton);
            waitForObject(":_qty_XLineEdit_2");
            findObject(":_qty_XLineEdit_2").clear();
            waitForObject(":_qty_XLineEdit_2");
            type(":_qty_XLineEdit_2", "100");
            nativeType("<Tab>");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            test.log("operation posted successfully");
            
        }
        catch(e)
        {
            test.fail("posting Repair Truck operation failed" +e);
        }
        
        //---------------Verify in GL----------------
        
        var bool = glTransactions(/Post Run Time Repair Truck/, wonum);
        if(bool == 1)
        {
            test.pass("WO " + wonum + " Repair Truck operation posted successfully and has a GL entry");
        }
        else
            test.fail("Error in posting operations of WO " + wonum + " ");
    }
    
    //---------------- Issue stock to SO-------------
    
    issueStock(sojob);
    
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
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sojob, 5, 5,Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(2);
        
        soinvoice1 = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        snooze(0.5);
        invoic_amt = findObject(":Cash Receipt.XLineEdit_XLineEdit").text;
        test.log(invoic_amt);
        
        waitForObject(":Invoice.Close_QPushButton");
        clickButton(":Invoice.Close_QPushButton");
        
        invoic_amt = replaceSubsting(invoic_amt);
        
        if(soamt == invoic_amt)
            test.pass("Invoice is created with foreign currency");
        else 
            test.fail("error in creation of invoice");
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sojob, 5, 5,Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        snooze(0.5);
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Invoice posted successful");
    }
    catch(e)
    {
        test.fail("Error in posting invoices" + e);
    }
    
    //------------------------Verifying in GL-----------------
    
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
         snooze(2);
        if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
         type(":_filterGroup.XDateEdit_XDateEdit","0");
        waitForObject(":_filterGroup.XDateEdit_XDateEdit_2");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(":_filterGroup.XDateEdit_XDateEdit_2","0");
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton");
        waitForObject(":_filterGroup.xcomboBox3_XComboBox_2");
        clickItem(":_filterGroup.xcomboBox3_XComboBox_2","Document #", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit",soinvoice1);
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(1);
        waitForObject(":_list_XTreeWidget_3");
        
        var obj_TreeWidget = findObject(":_list_XTreeWidget_3");
        
        var obj = obj_TreeWidget.topLevelItemCount;
        test.log(obj);
        
        var obj_treeItem = obj_TreeWidget.topLevelItem(obj-2);
        var result = obj_treeItem.text(7);
        result = replaceSubsting(result);
        test.log(result);
        
        var result1 = roundNumber(result,2);
        test.log(result1);
        
        
        var result2 = roundNumber((soamt*rate),2);        
        
        test.log(result2);
        
        if(result1 == result2)
            test.pass("foreign currency is converted into base currency and has a GL entry");
        else
            test.fail("foreign currency doesn't converted to base currency and has a GL entry");
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        
    }
    catch(e)
    {
        test.fail("Error in posting invoices" + e);
        if(object.exists("Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton"); 
        }
    }
    snooze(0.1);
    
    //------ WO costing entries verification-------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Costing...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Costing...");
        waitForObject(":Work Order Costing.VirtualClusterLineEdit_WoLineEdit");
        type(":Work Order Costing.VirtualClusterLineEdit_WoLineEdit", wonum);
        
        nativeType("<Tab>");
        snooze(0.5);
        if(appE == "Manufacturing")
        {
            waitForObject(":Work Order Costing.Show Set Up_XCheckBox");
            if(!findObject(":Work Order Costing.Show Set Up_XCheckBox").checked)
                clickButton(":Work Order Costing.Show Set Up_XCheckBox");
            waitForObject(":Work Order Costing.Show Run Time_XCheckBox");
            if(!findObject(":Work Order Costing.Show Run Time_XCheckBox").checked)
                clickButton(":Work Order Costing.Show Run Time_XCheckBox");
            waitForObject(":Work Order Costing.Show Materials_XCheckBox");
            if(!findObject(":Work Order Costing.Show Materials_XCheckBox").checked)
                clickButton(":Work Order Costing.Show Materials_XCheckBox");
        }
        
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(1);
        
        if(appE == "Manufacturing")
        {
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Inspect' type='QModelIndex'}"))
                test.pass("Work Order's Inspect operation has setup time costing entry");
            else  
                test.fail("Work Order's Inspect operation has no setup time costing entry");
            snooze(0.1);
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Inspect' type='QModelIndex'}"))
                test.pass("Work Order's Inspect operation has Run Time costing entry");
            else  
                test.fail("Work Order's Inspect operation has no Run Time costing entry");
            snooze(0.1);
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Repair Truck' type='QModelIndex'}"))
                test.pass("Work Order's Repair Truck operation has setup time costing entry");
            else  
                 test.fail("Work Order's Repair Truck operation has no setup time costing entry");
            snooze(0.1);
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Repair Truck' type='QModelIndex'}"))
                test.pass("Work Order's Repair Truck operation has Run Time costing entry");
            else  
                test.fail("Work Order's Repair Truck operation has no Run Time costing entry"); 
            snooze(0.1);
        }
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='Truck Wheel Type 1' type='QModelIndex'}"))
            test.pass("Work Order's Material issue (TWHEEL1)transaction has a costing entry");
        else  
            test.fail("Work Order's Material issue (TWHEEL1)transaction has no costing entry");
        snooze(1);
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
        test.log("WO costing entries are verified successfully");
    }
    catch(e)
    { 
        test.fail("Error in verifying WO costing entries"+e);
    }
    
    //-------- verifying the WO history by item-----
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "History");
        activateItem(":xTuple ERP:*.Reports_QMenu", "History");
        waitForObjectItem(":xTuple ERP:*.History_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.History_QMenu", "by Item...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit","REPAIRT1");
        
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
        type(":_dateGroup.XDateEdit_XDateEdit_4", "-10");        
        nativeType("<Tab>");         
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_5");
        type(":_dateGroup.XDateEdit_XDateEdit_5", "+10");      
        nativeType("<Tab>");  
        if(!(appE == "PostBooks"))
        {
            waitForObject(":_warehouse.All Sites_QRadioButton_2");
            clickButton(":_warehouse.All Sites_QRadioButton_2");
        }
        if(!findObject(":_showGroup.Show Work Order Cost_XCheckBox").checked)
                clickButton(":_showGroup.Show Work Order Cost_XCheckBox");

        if(!findObject(":_showGroup.Only Show Top Level Work Orders_XCheckBox").checked)
                clickButton(":_showGroup.Only Show Top Level Work Orders_XCheckBox");

         waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+wonum+"' type='QModelIndex'}"))  
            test.pass("REPAIRT1 item has Work Order history");
        else  
            test.fail("REPAIRT1 item has no Work Order history");
        snooze(0.5);
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("error in verifying the item history of item" +e);
    }
    
    
}

