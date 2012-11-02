function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(6);
     //--------------- Set the window to Tab view mode -------------

    tabView();

    //---Create Sales Orders for same customer---
    var sonumber1 = createSalesOrder("YTRUCK1","100");
    var sonumber2 = createSalesOrder("YTRUCK1","100");
   
    //----Issue stock to shipping for Sales Order1-----
    
    //---Issue Stock---
    var Shipnum1; 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit",sonumber1); 
        nativeType("<Tab>");
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        //----Verification Point---
        Shipnum1 = findObject(":groupBox_3.VirtualClusterLineEdit_ShipmentClusterLineEdit").text;
        test.log(Shipnum1);
        
        if(object.exists(":groupBox.Select for Billing_QCheckBox"))
        {
            if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
                clickButton(":groupBox.Select for Billing_QCheckBox");
            if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
                clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
        }
        clickButton(waitForObject(":Issue to Shipping.Ship_QPushButton_2"));
        snooze(0.5);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in issuing stock to item YTRUCK1" + e);
    } 
    //-----Issue Stock to Shipping for Sales Order2-----------------
    //---Issue Stock---
    var Shipnum2; 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        snooze(0.5);
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit",sonumber2); 
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        snooze(0.5);
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        //----Verification Point---
        Shipnum2 = findObject(":groupBox_3.VirtualClusterLineEdit_ShipmentClusterLineEdit").text;
        test.log(Shipnum2);
        if(object.exists(":groupBox.Select for Billing_QCheckBox"))
        {
            if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
                clickButton(":groupBox.Select for Billing_QCheckBox");
            if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
                clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
        }
        clickButton(waitForObject(":Issue to Shipping.Ship_QPushButton_2"));
        snooze(0.5);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in issuing stock to item YTRUCK1" + e);
    } 
    snooze(0.5);
    //---GL entry verification after issueing stock for sonumber1---------
    
    var bool = glTransactions(/for Customer Tremendous Toys Incorporated/, Shipnum1);
    if(bool == 1)
    {
        test.pass("SO " + sonumber1 + " has a GL entry for Issueing Stock");
    }
    else
        test.fail("No GL entry is made for the  Stock Issueing " + sonumber1);
    
    //---GL entry verification after issueing stock for sonumber1---------
    
    var bool = glTransactions(/for Customer Tremendous Toys Incorporated/, Shipnum2);
    if(bool == 1)
    {
        test.pass("SO " + sonumber2 + " has a GL entry for Issueing Stock");
    }
    else
        test.fail("No GL entry is made for the  Stock Issueing " + sonumber2);
  
    //----Retriving the Invoice no------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."))
        snooze(0.5);
        waitForObject(":_stack._nextInNumber_XLineEdit");
        var invnum = findObject(":_stack._nextInNumber_XLineEdit").text;
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Invoice Number retrived sucessfully");
    }
    catch(e)
    {
        test.fail("Error in retriving the invoice Number:"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }
    //----Creating Consolidate Invoice-------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Create Invoices..."));
        snooze(1);
        if(!findObject(":_customerType.All Customer Types_QRadioButton").checked)
        {
            clickButton(waitForObject(":_customerType.All Customer Types_QRadioButton"));
            
        }
        if(!findObject(":Create Invoices.Consolidate By Customer_XCheckBox").checked)
        {
            clickButton(waitForObject(":Create Invoices.Consolidate By Customer_XCheckBox"));
        }
        
        clickButton(waitForObject(":Create Invoices.Create Invoices_QPushButton"));
        snooze(1);
        test.log("Consolidation process performed sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Consolidating Invoice:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
    }
    
    var sonum1 = sonumber1+"-1";
    var sonum2 = sonumber2+"-1"; 
    
    //-----Verifying the consolidate invoice created for the Sales Orders------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));            activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted..."));
        if(OS.name != "Darwin")
        {
        type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
        type(waitForObject(":xTuple ERP: *.Accounts Receivable_QMenu"), "<Left>");
        type(waitForObject(":xTuple ERP: *.Accounting_QMenu"), "<Esc>");
        }
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        openItemContextMenu(":_list_XTreeWidget_3",invnum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(1);
        waitForObject(":lineItemsTab._invcitem_XTreeWidget");
        if(object.exists("{column='1' container=':lineItemsTab._invcitem_XTreeWidget' text='"+sonum1+"' type='QModelIndex'}")&&object.exists("{column='1' container=':lineItemsTab._invcitem_XTreeWidget' text='"+sonum2+"' type='QModelIndex'}"))
        {
            test.pass("Consolidate invoice created Sucessfully");
        }
        else
            test.fail("Error in creating Consolidate Invoice");
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in verifying the consolidate invoice created:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));}
        
    }
    
    //--------------Posting the Consolidate Invoice--------------------
    
    try
    {
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",invnum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post..."));        
        snooze(0.5);
        clickButton(waitForObject(":List Unposted Invoices.Continue_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        //---Verifying the invoice after posting-------
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+invnum+"' type='QModelIndex'}"))
        {
            test.fail("Error in posting the  Consolidate Invoice");
        }
        else
            
            test.pass("Consolidate invoice posted Sucessfully");
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in posting the Consolidate Invpoice:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        { 
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
    }
    
    //------Verifying the Posted Invoice under A/R------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));            activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        snooze(0.5);
        waitForObject(":xTuple ERP:*._select_XComboBox");
        clickItem(":xTuple ERP:*._select_XComboBox","Select",0, 0, 5, Qt.LeftButton); 
        snooze(0.5);
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), "TTOYS");
        nativeType("<Tab>");
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Receivables");
        snooze(0.5);
        if(!findObject(":_docTypeGroup.Debits_QRadioButton").checked)
        {
            clickButton(waitForObject(":_docTypeGroup.Debits_QRadioButton"));
        }
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='"+invnum+"' type='QModelIndex'}"))
        {
            test.pass("Consolidate posted sucessfully verified under A/R workbench ");
        }
        else
            test.fail("Error in Verifying  the  Consolidate Invoice under A/R workbench");
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in verifying the invoice posted under A/R workBench:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }      
    
}
