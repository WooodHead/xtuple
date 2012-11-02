function main()
{

        //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
   
   snooze(3);

    //--------Retrieve invoice number-----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        snooze(1);
        var invnumber = findObject(":_stack._nextInNumber_XLineEdit").text;
        invnumber = parseInt(invnumber);
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {
        test.fail("Exception in retreiving invoice number" + e);
    }
    
    //------- Create Miscellaneous invoices ---
    
    for(var i=0;i<4;i++)
    {
        createMiscInvoice("TTOYS","YTRUCK1","100");
    }
    createMiscInvoice("XTRM","YTRUCK1","100");
    createMiscInvoice("XTRM","YTRUCK1","100");
    
    
  //-------- Post Invoices -----

  try
  {
      activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
      activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
      activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Invoice"));
      activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Post..."));
      snooze(1);
      if(!findObject(":Post Invoices.Post Unprinted Invoices_XCheckBox").checked)
      {       
          clickButton(":Post Invoices.Post Unprinted Invoices_XCheckBox");
      }
      clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
      snooze(1);
      if(object.exists(":Invoices for 0 Amount.Post All_QPushButton"))
      {
          clickButton(":Invoices for 0 Amount.Post All_QPushButton");
      }
      test.log("Invoices posted successfully");
  }
  catch(e)
  {
      test.fail("Exception in posting invoices:" + e);
  }
    
    //-------- Verify unposted invoices ------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted..."));
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        var invlist = findObject(":_list_XTreeWidget_3");
        var count = invlist.topLevelItemCount;
        if(count>0)
            test.fail("Some unposted invoices exist");
        else
            test.pass("All invoices are posted successfully");
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Exception in verifying unposted invoices");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //-----Do nothing----
    if(!(OS.name == "Windows"))
    {
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
            
            clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        }
        catch(e)
        {
            
        }
        //-----Do nothing----
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
            
            clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        }
        catch(e)
        {
            
        }
    }
     //-------- Create and post Cash Receipt - full amount -----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Cash Receipts");
        clickButton(waitForObject(":_cashRecptTab.New_QPushButton"));
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), "TTOYS");
        nativeType("<Tab>");
        
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        var cashWidget = findObject(":_applicationsTab._aropen_XTreeWidget_2");
        count = cashWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = cashWidget.topLevelItem(i);
            if(row.text(1) == invnumber)
            {
                amount = row.text(5);
                flag = 1;
                break;
            }
        }
         if(flag == 0)
        {
            throw "Invoice Not found";
        }
         snooze(0.5);
        var crnumber = findObject(":xTuple ERP:*.CR_QLabel").text;
        clickItem(":_applicationsTab._aropen_XTreeWidget_2", invnumber, 24, 11, 0, Qt.LeftButton);
        clickButton(waitForObject(":_applicationsTab.Apply_QPushButton_2"));
        type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit"), amount);
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), amount);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(0.5);
        waitForObjectItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS");
        clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS", 26, 9, 0, Qt.LeftButton);
        clickButton(waitForObject(":_cashRecptTab.Post_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.pass("Cash receipt created for full amount");
    }
    catch(e)
    {
        test.fail("Exception in creating cash receipt:" + e);
         if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }
    //-----Do nothing----
    if(!(OS.name == "Windows"))
    {
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
            
            clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        }
        catch(e)
        {
            
        }
        
        //-----Do nothing----
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
            
            clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        }
        catch(e)
        {
            
        }
    }
    voidPostedCR(crnumber);
    
    //-------- Verify Invoice -----
    try
    {
        flag = 0;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(1);
        receivables = findObject(":_list_XTreeWidget_3");
        count = receivables.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = receivables.topLevelItem(i);
            if(row.text(2) == invnumber)
            {
                flag = 1;
                test.pass("invoice reopened on voiding cash receipt");
                break;
            }
        }
        if(flag != 0)
        {
            test.fail("Invoice not reopenend on voiding cahs receipt");
        }
        snooze(1);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in verifying invoice");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    invnumber++;
    
   //-------- Create and post Cash Receipt - partial amount -----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Cash Receipts");
        clickButton(waitForObject(":_cashRecptTab.New_QPushButton"));
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), "TTOYS");
        nativeType("<Tab>");
        
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        var cashWidget = findObject(":_applicationsTab._aropen_XTreeWidget_2");
        count = cashWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = cashWidget.topLevelItem(i);
            if(row.text(1) == invnumber)
            {
                amount = row.text(5);
                flag = 1;
                break;
            }
        }
        if(flag == 0)
        {
            throw "Invoice Not found";
        }
        amount = parseFloat(amount) - 100;
        var crnumber = findObject(":xTuple ERP:*.CR_QLabel").text;
        clickItem(":_applicationsTab._aropen_XTreeWidget_2", invnumber, 24, 11, 0, Qt.LeftButton);
        clickButton(waitForObject(":_applicationsTab.Apply_QPushButton_2"));
        type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit"), amount);
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), amount);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(0.5);
        waitForObjectItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS");
        clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS", 26, 9, 0, Qt.LeftButton);
        clickButton(waitForObject(":_cashRecptTab.Post_QPushButton"));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Receivables");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        var invoiceWidget = findObject(":_list_XTreeWidget_3");
        count = invoiceWidget.topLevelItemCount;
        flag = 0;
        for(i=0;i<count;i++)
        {
            row = invoiceWidget.topLevelItem(i);
            if(row.text(4) == invnumber && row.text(12) == amount)
            {
                test.pass("Receipt posted for partial amount");
                flag = 1;
                break;
            }
        }
        if(flag != 1)
        {
            test.fail("Receipt posted incorrectly");
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.pass("Cash receipt created for partial amount");
    }
    catch(e)
    {
        test.fail("Exception in creating cash receipt:" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
         if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }
  //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
      //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
    voidPostedCR(crnumber);

   //------Verify voided cash receipt -----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(0.5);
         waitForObject(":_list_XTreeWidget_3");
        var invoiceWidget = findObject(":_list_XTreeWidget_3");
        count = invoiceWidget.topLevelItemCount;
        flag = 0;
        for(i=0;i<count;i++)
        {
            row = invoiceWidget.topLevelItem(i);
            if(row.text(4) == invnumber && row.text(12) == "0.00")
            {
                test.pass("Cash Receipt voided correctly");
                flag = 1;
                break;
            }
        }
        if(flag != 1)
        {
            test.fail("Cash Receipt not voided correctly");
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
             
    }
    catch(e)
    {
        test.fail("Exception in voiding cash receipt " + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }  
  
    //------- Get Next AR memo number-----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Accounts Receivable");
        snooze(1);
        var armemo = findObject(":_nextARMemoNumber_XLineEdit").text;
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        test.log("ar memo number retrieved");
    }
    catch(e)
    {
        test.fail("Exception in retrieving next AR memo number" + e);
        if(object.exists("ar memo number retrieved"))
        {
            clickButton("ar memo number retrieved");
        }
    }
    
    invnumber++;
  //-------- Create and post Cash Receipt - Extra amount -----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Cash Receipts");
        clickButton(waitForObject(":_cashRecptTab.New_QPushButton"));
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), "TTOYS");
        nativeType("<Tab>");
        
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        cashWidget = findObject(":_applicationsTab._aropen_XTreeWidget_2");
        count = cashWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = cashWidget.topLevelItem(i);
            if(row.text(1) == invnumber)
            {
                amount = row.text(5);
                flag = 1;
                break;
            }
        }
        if(flag == 0)
        {
            throw "Invoice Not found";
        }
        applyAmount = parseFloat(amount) + 100;
        crnumber = findObject(":xTuple ERP:*.CR_QLabel").text;
        clickItem(":_applicationsTab._aropen_XTreeWidget_2", invnumber, 24, 11, 0, Qt.LeftButton);
        clickButton(waitForObject(":_applicationsTab.Apply_QPushButton_2"));
        type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit"), amount);
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), applyAmount);
        clickButton(waitForObject(":_amountGroup.Credit Memo_QRadioButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
       
        //-------post cash receipt------
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        waitForObjectItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS");
        clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS", 26, 9, 0, Qt.LeftButton);
        clickButton(waitForObject(":_cashRecptTab.Post_QPushButton"));
        test.pass("Cash receipt created and posted for extra amount");
        
        //-------Verify credit memo-------
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Receivables");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        invoiceWidget = findObject(":_list_XTreeWidget_3");
        count = invoiceWidget.topLevelItemCount;
        flag = 0;
        for(i=0;i<count;i++)
        {
            row = invoiceWidget.topLevelItem(i);
            if(row.text(0) == "Credit Memo" && row.text(4) == armemo && row.text(10) == "100.00")
            {
                test.pass("Credit memo created");
                flag = 1;
                break;
            }
        }
        if(flag != 1)
        {
            test.fail("credit memo not created correctly");
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in creating cash receipt:" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
 //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
     //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
  
    voidPostedCR(crnumber);

   //------Verify voided cash receipt and debit memo creation -----
    try
    {	armemo++;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(1);
        waitForObject(":_list_XTreeWidget_3");
        var invoiceWidget = findObject(":_list_XTreeWidget_3");
        count = invoiceWidget.topLevelItemCount;
        flag = 0;
        for(i=0;i<count;i++)
        {
            row = invoiceWidget.topLevelItem(i);
        
            if(row.text(0) == "Debit Memo" && row.text(4) == armemo && row.text(10) == "100.00")
            {
                test.pass("Cash Receipt voided correctly");
                flag = 1;
                break;
            }
        }
        if(flag != 1)
        {
            test.fail("Cash Receipt not voided correctly");
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
             
    }
    catch(e)
    {
        test.fail("Exception in voiding cash receipt " + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
    
  
     //-------- Create and post Cash Receipt - Discount amount -----
    try
    {	var flag = 0,discount1,discount2,amount1;
        invnumber++;
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Cash Receipts");
        clickButton(waitForObject(":_cashRecptTab.New_QPushButton"));
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), "TTOYS");
        nativeType("<Tab>");
        
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");

        cashWidget = findObject(":_applicationsTab._aropen_XTreeWidget_2");
        count = cashWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = cashWidget.topLevelItem(i);
            if(row.text(1) == invnumber)
            {
                amount = row.text(5);
                flag = 1;
                break;
            }
        }
        if(flag == 0)
        {
            throw "Invoice Not found";
        }

        crnumber = findObject(":xTuple ERP:*.CR_QLabel").text;     
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), amount);
        clickItem(":_applicationsTab._aropen_XTreeWidget_2", invnumber, 24, 11, 0, Qt.LeftButton);
        clickButton(waitForObject(":_applicationsTab.Apply Line Bal._QPushButton"));
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        cashWidget = findObject(":_applicationsTab._aropen_XTreeWidget_2");
        count = cashWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = cashWidget.topLevelItem(i);
            if(row.text(1) == invnumber)
            {
                amount1 = row.text(7);
                discount = row.text(9);
                flag = 1;
                break;
            }
        }
        if(flag == 0)
        {
            throw "Invoice Not found";
        }
        
        discount1 = parseFloat(amount) * 0.02;
        discount2 = parseFloat(discount);
        if(discount2 == discount1)
        {
            test.pass("Discount amount calculated correctly");
        }
        else
            test.fail("Discount amount calculated incorrectly");
        findObject(":_amountGroup.XLineEdit_XLineEdit").clear();
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), amount1);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
       
        //-------post cash receipt------
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        waitForObjectItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS");
        clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS", 26, 9, 0, Qt.LeftButton);
        clickButton(waitForObject(":_cashRecptTab.Post_QPushButton"));
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Cash Receipt created and posted with discount amount");
    }
    catch(e)
    {
        test.fail("Exception in creating cash receipt:" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }

    //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
      //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
    voidPostedCR(crnumber);

   //------Verify voided cash receipt and debit memo creation -----
    try
    {	
        armemo = parseInt(armemo) + 2;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(1);
        waitForObject(":_list_XTreeWidget_3");
        var invoiceWidget = findObject(":_list_XTreeWidget_3");
        count = invoiceWidget.topLevelItemCount;
        flag = 0;
        for(i=0;i<count;i++)
        {
            row = invoiceWidget.topLevelItem(i);
            snooze(1);
            if(row.text(0) == "Debit Memo" && row.text(4) == armemo && row.text(10) == discount)
            {	
               
                test.pass("Cash Receipt voided correctly and debit memo created for discount amount");
                flag = 1;
                break;
            }
        }
        if(flag != 1)
        {
            test.fail("Debit memo not created for discount amount");
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
             
    }
    catch(e)
    {
        test.fail("Exception in voiding cash receipt " + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
    
     //-------- Verify Invoice -----
    try
    {
        var invamount,invusd,paid,paidusd;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(0.5);
        receivables = findObject(":_list_XTreeWidget_3");
        count = receivables.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = receivables.topLevelItem(i);
            if(row.text(2) == invnumber)
            {	
                
                invamount = row.text(10);
                invusd = row.text(11);
                paid = row.text(12);
                paidusd = row.text(13);
                test.pass("invoice reopened on voiding cash receipt");
                break;
            }
        }
      
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in verifying invoice");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    invnumber++;
    
    //-------- Create and post Cash Receipt (foreign account) - full amount -----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Cash Receipts");
        clickButton(waitForObject(":_cashRecptTab.New_QPushButton"));
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), "XTRM");
        nativeType("<Tab>");
        
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        var cashWidget = findObject(":_applicationsTab._aropen_XTreeWidget_2");
        count = cashWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = cashWidget.topLevelItem(i);
            if(row.text(1) == invnumber)
            {
                amount = row.text(5);
                flag = 1;
                break;
            }
        }
         if(flag == 0)
        {
            throw "Invoice Not found";
        }
        var crnumber = findObject(":xTuple ERP:*.CR_QLabel").text;
        
        waitForObject(":_docGroup._bankaccnt_XComboBox")
        clickItem(":_docGroup._bankaccnt_XComboBox", "GBank-GBank", 24, 11, 0, Qt.LeftButton);
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        clickItem(":_applicationsTab._aropen_XTreeWidget_2", invnumber, 24, 11, 0, Qt.LeftButton);
        clickButton(waitForObject(":_applicationsTab.Apply_QPushButton_2"));
        type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit"), amount);
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), amount);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        waitForObjectItem(":_cashRecptTab._cashrcpt_XTreeWidget", "XTRM");
        clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "XTRM", 26, 9, 0, Qt.LeftButton);
        clickButton(waitForObject(":_cashRecptTab.Post_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.pass("Cash Receipt created and posted for foreign customer");
    }
    catch(e)
    {
        test.fail("Exception in creating cash receipt:" + e);
         if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }
      //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }  //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
    voidPostedCR(crnumber);
    
    //-------- Verify Invoice -----
    try
    {
        var invamount1,invusd1,paid1,paidusd1;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(0.5);
        receivables = findObject(":_list_XTreeWidget_3");
        count = receivables.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = receivables.topLevelItem(i);
            if(row.text(2) == invnumber)
            {
                invamount1 = row.text(10);
                invusd1 = row.text(11);
                paid1 = row.text(12);
                paidusd1 = row.text(13);
                break;
            }
        }
        if(invamount == invamount1 && invusd == invusd1 && paid == paid1 && paidusd == paidusd1)
        {
            test.pass("Cash receipt voided successfully and invoice reopened");
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in verifying invoice");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    invnumber++;
     //-------- Create and post Cash Receipt (foreign account) - with discount -----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Cash Receipts");
        clickButton(waitForObject(":_cashRecptTab.New_QPushButton"));
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), "XTRM");
        nativeType("<Tab>");
        
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        var cashWidget = findObject(":_applicationsTab._aropen_XTreeWidget_2");
        count = cashWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = cashWidget.topLevelItem(i);
            if(row.text(1) == invnumber)
            {
                amount = row.text(5);
                flag = 1;
                break;
            }
        }
         if(flag == 0)
        {
            throw "Invoice Not found";
        }
        var crnumber = findObject(":xTuple ERP:*.CR_QLabel").text;
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), amount);
        waitForObject(":_docGroup._bankaccnt_XComboBox")
        clickItem(":_docGroup._bankaccnt_XComboBox", "GBank-GBank", 24, 11, 0, Qt.LeftButton);
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        clickItem(":_applicationsTab._aropen_XTreeWidget_2", invnumber, 24, 11, 0, Qt.LeftButton);
        
        clickButton(waitForObject(":_applicationsTab.Apply Line Bal._QPushButton"));
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        cashWidget = findObject(":_applicationsTab._aropen_XTreeWidget_2");
        count = cashWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = cashWidget.topLevelItem(i);
            if(row.text(1) == invnumber)
            {
                amount1 = row.text(7);
                discount = row.text(9);
                break;
            }
        }
        discount1 = parseInt(amount) * 0.02;
        discount2 = parseInt(discount);
        if(discount == discount1)
        {
            test.pass("Discount amount calculated correctly");
        }
        else
            test.fail("Discount amount calculated incorrectly");
        findObject(":_amountGroup.XLineEdit_XLineEdit").clear();
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), amount1);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        test.pass("Cash Receipt created and posted for foreign customer with discount");
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        waitForObjectItem(":_cashRecptTab._cashrcpt_XTreeWidget", "XTRM");
        clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "XTRM", 26, 9, 0, Qt.LeftButton);
        clickButton(waitForObject(":_cashRecptTab.Post_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in creating cash receipt:" + e);
         if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }

     //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
     //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
  //--------- Voucher discounts ---------
    
    var ponumber1 = createPO("TPARTS", "TBOX1", "100");
    var ponumber2 = createPO("TPARTS", "TBOX1", "100");
    
    //---------- Release POs -----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "Release..."));
         
        sendEvent("QMouseEvent", waitForObject(":Release Purchase Order_QLabel"), QEvent.MouseButtonPress, 14, 9, Qt.LeftButton, 0);
    activateItem(waitForObjectItem(":_QMenu", "List..."));

    type(waitForObject(":_search_QLineEdit"), ponumber1);
    clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
    nativeType("<Tab>");
     
    clickButton(waitForObject(":Release Purchase Order.Release_QPushButton"));    
         snooze(2);
         nativeType("<Tab>");
        sendEvent("QMouseEvent", waitForObject(":Release Purchase Order_QLabel"), QEvent.MouseButtonPress, 14, 9, Qt.LeftButton, 0);
    activateItem(waitForObjectItem(":_QMenu", "List..."));

    type(waitForObject(":_search_QLineEdit"), ponumber2);
    clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
    nativeType("<Tab>");
      clickButton(waitForObject(":Release Purchase Order.Release_QPushButton"));   
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in release POs" + e);
    }
    
    //-------------Create and post Receipts for POs
    
    createPoReceipt(ponumber1);
    createPoReceipt(ponumber2);
 
    
    //--------Find voucher number-----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Setup..."));
        snooze(0.5);
        var vonum = findObject(":_nextVcNumber_XLineEdit").text;
        test.log(vonum);
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {
        test.fail("Exception in find voucher number");
    }
    
    createVoucher(ponumber1,"1033");
    
    //------- Post voucher ------ 
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "Post..."));
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in posting vouchers " + e);
    }
   //-------- Select order for payments -----
    try
    {
        var vamount,vdiscount,temp;
        flag = 0;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select..."));
        waitForObject(":frame._bankaccnt_XComboBox");
        clickItem(":frame._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 107, 7, 0, Qt.LeftButton);
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", ponumber1, 49, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":frame.Select Line_QPushButton"));
        var voucherWidget = findObject(":frame._apopen_XTreeWidget");
        var count = voucherWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = voucherWidget.topLevelItem(i);
            if(row.text(4) == ponumber1)
            {
                vamount = row.text(7);
                vamount = parseFloat(vamount);
                vdiscount = row.text(13);
                vdiscount = parseFloat(vdiscount);
                temp = 0.02 * vamount;
                if(vdiscount == temp)
                {
                    test.pass("discount amount calculated corrrectly");
                }
                else
                {
                    test.fail("discount amount calculated incorrectly");
                }
                break;
            }
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in selecting order for payments" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
    
   //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
       //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
    //-------- Create split voucher ------
    try
    {	
        flag = 0;
        var voucherWidget;
         activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
         activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
         activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
         activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New..."));
         type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit"), ponumber2);
         nativeType("<Tab>");
         waitForObjectItem(":_poitems._poitem_XTreeWidget", "1");
         clickItem(":_poitems._poitem_XTreeWidget", "1", 20, 9, 0, Qt.LeftButton);
         clickButton(waitForObject(":_poitems.Distributions..._QPushButton"));
         openItemContextMenu(waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget"), "No", 19, 9, 0);
         activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Split Receipt..."));
         type(waitForObject(":Split Receipt._toSplit_XLineEdit"), "50");
         clickButton(waitForObject(":Split Receipt.Split_QPushButton"));
         waitForObjectItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "No_1");
         doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "No_1", 26, 6, 0, Qt.LeftButton);
         waitForObjectItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "No");
         doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "No", 22, 7, 0, Qt.LeftButton);
         clickButton(waitForObject(":_distTab.New_QPushButton"));
         var amount = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
         var split1 = parseFloat(amount)/2;
         findObject(":Cash Receipt.XLineEdit_XLineEdit_2").clear();
         type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2"), split1);
         if(!findObject(":Voucher Item Distribution.Discountable_XCheckBox").checked)
         {
             clickButton(":Voucher Item Distribution.Discountable_XCheckBox");
         }
         clickButton(waitForObject(":Voucher Item Distribution.Save_QPushButton"));
         clickButton(waitForObject(":_distTab.New_QPushButton"));
         waitForObject(":Voucher Item Distribution._costelem_XComboBox");
         clickItem(":Voucher Item Distribution._costelem_XComboBox", "Special Handling", 57, 3, 0, Qt.LeftButton);
         waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
         findObject(":Cash Receipt.XLineEdit_XLineEdit_2").clear();
         type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2"), split1);
         if(findObject(":Voucher Item Distribution.Discountable_XCheckBox").checked)
         {
             clickButton(":Voucher Item Distribution.Discountable_XCheckBox");
         }
         clickButton(waitForObject(":Voucher Item Distribution.Save_QPushButton"));
         clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
         voucherWidget = findObject(":_poitems._poitem_XTreeWidget");
         row = voucherWidget.topLevelItem(0);
         amount = row.text(11);
         type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), amount);
         type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
         nativeType("<Tab>");
         clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
         clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
     }
    catch(e)
    {
        test.fail("Exception in creating voucher: " + e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(":Sales Order.Cancel_QPushButton");
            clickButton(waitForObject(":Sales Order.No_QPushButton_2"));
            
        }
        flag = 1;
    }
    if(flag = 0)
    {
    //-------- Select order for payments -----
    try
    {
        var vamount,vdiscount,temp;
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select..."));
        waitForObject(":frame._bankaccnt_XComboBox");
        clickItem(":frame._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 107, 7, 0, Qt.LeftButton);
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", ponumber2, 49, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":frame.Select Line_QPushButton"));
        var voucherWidget = findObject(":frame._apopen_XTreeWidget");
        var count = voucherWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = voucherWidget.topLevelItem(i);
            if(row.text(4) == ponumber1)
            {
                vamount = row.text(7);
                vamount = parseFloat(vamount)/2;
                vdiscount = row.text(13);
                vdiscount = parseFloat(vdiscount);
                temp = 0.02 * vamount;
                if(vdiscount == temp)
                {
                    test.pass("discount amount calculated corrrectly");
                }
                else
                {
                    test.fail("discount amount calculated incorrectly");
                }
                break;
            }
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in selecting order for payments" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
    
}
       //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }
     
       //-----Do nothing----
     try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));

        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {

    }//-------- Create Miscellaneous voucher --------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous..."));
        mouseClick(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_VendorLineEdit"), 14, 10, 0, Qt.LeftButton);
        type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_VendorLineEdit"), "TPARTS");
        nativeType("<Tab>");
       
        //------- Voucher Distribution to GL account -------
        clickButton(waitForObject(":_miscDistribTab.New_QPushButton"));
        mouseClick(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), 70, 8, 0, Qt.LeftButton);
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>"); 
        findObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit").clear();
        type(waitForObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit"), "100");
        if(!findObject(":Miscellaneous Voucher Distribution.Discountable_XCheckBox").checked)
        {
            clickButton(":Miscellaneous Voucher Distribution.Discountable_XCheckBox");
        }
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        
        //------- Voucher Distribution to Expense Category -------

        clickButton(waitForObject(":_miscDistribTab.New_QPushButton"));
        clickButton(waitForObject(":_groupButton.Expense Category_QRadioButton"));
        type(waitForObject(":_expenseGroup.VirtualClusterLineEdit_ExpenseLineEdit"), "TRAVEL");
        nativeType("<Tab>");   
        findObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit").clear();
        type(waitForObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit"), "100");
        if(!findObject(":Miscellaneous Voucher Distribution.Discountable_XCheckBox").checked)
        {
            clickButton(":Miscellaneous Voucher Distribution.Discountable_XCheckBox");
        }
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        
         //------- Voucher Distribution to Tax Category -------
        
        clickButton(waitForObject(":_miscDistribTab.New_QPushButton"));
        clickButton(waitForObject(":_groupButton.Tax Code_QRadioButton"));
        waitForObject(":_taxGroup._taxCode_XComboBox");
        clickItem(":_taxGroup._taxCode_XComboBox", "GA TAX-A-Georgia Sales Tax", 58, 5, 0, Qt.LeftButton)
        findObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit").clear();
        type(waitForObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit"), "100");
        if(findObject(":Miscellaneous Voucher Distribution.Discountable_XCheckBox").checked)
        {
            clickButton(":Miscellaneous Voucher Distribution.Discountable_XCheckBox");
        }
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), "300");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        test.log("Miscellaneous voucher created");
    }
    catch(e)
    {
        test.fail("Exception in creating Miscellaneous voucher:" + e);
    }
        
        
    //------- Post voucher ------ 
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "Post..."));
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        test.log("Miscellaneous voucher posted");
    }
    catch(e)
    {
        test.fail("Exception in posting vouchers " + e);
    }
    

       //------- Verify GL Transactions for account and amount --------
    try
    {	
        vonum = parseInt(vonum)+2;
        test.log(vonum);
        var account = [/Cash at eBank/,/Travel Expense/,/Georgia Sales Tax/];
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        snooze(1);
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
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit",vonum);   
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        
        for(var j=0;j<3;j++) 
        {
            var bool = 0;    
            waitForObject(":_list_XTreeWidget_3");
            var sWidgetTreeControl = ":_list_XTreeWidget_3";
            waitForObject(sWidgetTreeControl);
            var obj_TreeWidget = findObject(sWidgetTreeControl);
            var obj = obj_TreeWidget.topLevelItemCount;
            for(i=0;i<obj;i++)
            {
                row = obj_TreeWidget.topLevelItem(i);
                account1 = row.text(7);
                bool = account[j].test(account1);
                if(bool)
                {
                    break;
                }
                
            }
            if(bool)
                test.pass(" GL entry is made");
            else
                test.fail(" GL entry is not made");
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
       
    }
    catch(e)
    {
        test.fail("Exception in verifying GL entry" + e);
         if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(":Quotes.Close_QToolButton");
        }
        
    }
    
     //-------- Select order for payments -----
    try
    {
        var vamount,vdiscount,temp;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select..."));
        waitForObject(":frame._bankaccnt_XComboBox");
        clickItem(":frame._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 107, 7, 0, Qt.LeftButton);
        waitForObject(":frame._apopen_XTreeWidget");
        clickItem(":frame._apopen_XTreeWidget", vonum, 49, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":frame.Select..._QPushButton"));
        waitForObject(":_bankaccnt_XComboBox");
        clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 127, 4, 0, Qt.LeftButton);
        clickButton(waitForObject(":Select Payment.Edit Discount_QPushButton"));
        
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
        var discount = findObject(":Cash Receipt.XLineEdit_XLineEdit").text;
        discount = parseInt(discount);
        if(discount == 4)
        {
            test.log("discount amount calculated correctly");
        }
        else
            test.log("discount amount is calculated incorrectly");
            
        clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        voucherWidget = findObject(":frame._apopen_XTreeWidget");
        count = voucherWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {
            row = voucherWidget.topLevelItem(i);
            if(row.text(2) == vonum && row.text(13) == "4.00")
            {               
                test.pass("discount amount saved corrrectly");
                break;
            }
           
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Exception in selecting order for payments" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
    
}
