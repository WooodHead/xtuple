function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE");
    snooze(2);
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
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
        }
        snooze(0.5);
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
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
        test.fail("Error in editing preferences:"+ e);
    } 
    
    //-----Extracting OS Name-----
    var linuxPath, winPath;
    
    try
    {	
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup..."));
        snooze(1);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(":Sales Order.OK_QPushButton_2");
        }
        
        waitForObjectItem(":Setup._tree_XTreeWidget", "Configure.Encryption");
        clickItem(":Setup._tree_XTreeWidget", "Configure.Encryption", 23, 5, 0, Qt.LeftButton);
        
        snooze(1);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(":Sales Order.OK_QPushButton_2");
        }    
        snooze(1);
        waitForObject(":_ccEncKeyName_QLineEdit").clear();
        type(":_ccEncKeyName_QLineEdit", "xTuple.key");
        waitForObject(":Encryption Configuration_FileLineEdit").clear();
        type(":Encryption Configuration_FileLineEdit", "c:/crypto");
        waitForObject(":Encryption Configuration_FileLineEdit_2").clear();
        type(":Encryption Configuration_FileLineEdit_2", "/home/administrator/crypto");
        waitForObject(":Encryption Configuration_FileLineEdit_3").clear();
        type(":Encryption Configuration_FileLineEdit_3", "/users/crypto")
                
                waitForObject(":Encryption Configuration_FileLineEdit_2");
        linuxPath = findObject(":Encryption Configuration_FileLineEdit_2").text;
        
        waitForObject(":Encryption Configuration_FileLineEdit");
        winPath = findObject(":Encryption Configuration_FileLineEdit").text;
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
    }
    catch(e)
    {
        test.fail("Error in extracting OS name:" + e);
    }	
    
    //----------Configure Accounting SetUp---------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup..."));   
        snooze(1);
        if(!findObject(":Transactions Post to.Journal_QRadioButton").checked)
        {
            clickButton(":Transactions Post to.Journal_QRadioButton");
        }
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        test.log("Accounting setup configured sucessfully:");
    }
    catch(e)
    {
        test.fail("Error in Configuring the Accounting SetUp:" +e);
    }
    //--------Exiting the application------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
        activateItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    }
    catch(e)
    {
        test.fail("Error in Exiting the Application:"+e);
    }
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    //-----login Application-----
    loginAppl("CONFIGURE");
   // -----Application Edition-----
       var appE = findApplicationEdition();
    
    //--------------- Set the window to Tab view mode -------------
            
            tabView();
    //-----Transactions-------
    //--SO Processing---
    
    var Jnum = [];
    var sonum = createSalesOrder("YTRUCK1", "100");
    //---Verifying Sales Order Creation------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+sonum+"' type='QModelIndex'}"))
        {
            flag = 1;
            test.pass("Sales Order verified sucessfully"); 
            
        }
        else
        {
            flag = 0;
            test.fail("Error in verifying SO created");
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");    
        test.log("Sales Order Created  Verified Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in verifying the SO Created:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton"); 
        }
        
    }
    
    if(flag == "1")
    {
        //---Issue Stock---
        var Shipnum; 
        try
        {
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
            waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
            waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
            type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit",sonum); 
            nativeType("<Tab>");
            waitForObject(":_frame.Issue All_QPushButton");
            clickButton(":_frame.Issue All_QPushButton");
            waitForObject(":Issue to Shipping.Ship_QPushButton");
            clickButton(":Issue to Shipping.Ship_QPushButton");
            snooze(1);
            //----Verification Point---
            Shipnum = findObject(":groupBox_3.VirtualClusterLineEdit_ShipmentClusterLineEdit").text;
            
            if(object.exists(":groupBox.Receive Immediately_XCheckBox"))
            {
                if(findObject(":groupBox.Receive Immediately_XCheckBox").checked)
                {
                    waitForObject(":groupBox.Receive Immediately_XCheckBox");
                    clickButton(":groupBox.Receive Immediately_XCheckBox");
                    
                }
            }
            if(object.exists(":groupBox.Select for Billing_QCheckBox"))
            {
                if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
                    clickButton(":groupBox.Select for Billing_QCheckBox");
                if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
                    clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
            }
            clickButton(waitForObject(":Issue to Shipping.Ship_QPushButton_2"));
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        catch(e)
        {
            test.fail("Error in issuing stock to item YTRUCK1:" + e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
            {
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
            }
        } 
        
        
        
        //---To avoid unexpected blocks -----
        if(OS.name != "Windows")
            doNothing();
        
        //---------Journal Entry Verification for Shipment-----
        var bool = journalVerification(/for Customer Tremendous Toys Incorporated/ , Shipnum);
        if(bool == 1)
        {
            test.pass("SO " + sonum + " has a Journal entry for Stock Issueing");
        }
        else
            test.fail("No GL entry is made for the  Stock Issue of Sales Order " + sonum);
        //---Verifying the Posted Status for Stock Issueing------------
        
        Jnum[0] =journalStatus(Shipnum,"No","before");
        var j1 = Jnum[0];
        test.log(j1);
        //----Post Journal to Ledger------
        
        postJournal2Ledger("S/R");
        
        if(bool ==1)
            test.pass("Shipment entries are posted from Journal to Ledger Sucessfully");
        else
            test.fail("Error in postinh Shipment entries from Journal to Ledger ");
        
        
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
            test.log("Invoice created successfully");
        }
        catch(e)
        {
            test.fail("Error in creating invoices:" + e);
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
            snooze(1);
            nativeType("<Tab>");
            waitForObject(":_list_XTreeWidget_3");
            
            snooze(3);
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='"+sonum+"' type='QModelIndex'}"))
            {
                test.pass("Invoice Created sucessfully");
                flag = 1;
            }
            else
            {
                test.fail("Error in creating Invoice");
                flag = 0;
            }
            if (flag == 1)
            {
                snooze(1);
                waitForObject(":_list_XTreeWidget_3");
                openItemContextMenu(":_list_XTreeWidget_3",sonum,5,5,Qt.LeftButton);
                
                waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
                snooze(2);
                invoicenum = findObject(":_invoiceNumber_XLineEdit").text;
                
                waitForObject(":Invoice.Close_QPushButton");
                clickButton(":Invoice.Close_QPushButton");
                waitForObject(":_list_XTreeWidget_3");
                openItemContextMenu(":_list_XTreeWidget_3",sonum,5,5,Qt.LeftButton);
                waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
                activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
                snooze(0.5);
                waitForObject(":List Unposted Invoices.Continue_QPushButton");
                clickButton(":List Unposted Invoices.Continue_QPushButton");
                
                test.log("Invoice posted successfully");
            }
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        catch(e)
        {
            flag = 0;
            test.fail("Error in Creating invoices:" + e);
            if(object.exists(":Quotes.Close_QToolButton"))
            {
                waitForObject(":Quotes.Close_QToolButton");
                clickButton(":Quotes.Close_QToolButton");
            }
        }
        
        if(flag ==1)
        {
            
            //---------Journal Entry Verification-----
            var bool = journalVerification(/Tremendous Toys Incorporated/ ,invoicenum);
            if(bool == 1)
            {
                test.pass("Invoice " + invoicenum + " has a Journal entry ");
            }
            else
                test.fail("No Journal entry is made for the  invoice " + invoicenum);
            
            
            //---Verifying the Posted Status for Invoice in Journal------------
            Jnum[1] =journalStatus(invoicenum,"No","before");
            var j2 = Jnum[1];
            test.log(j2);
            //----Post Journal to Ledger------
            
            var bool = postJournal2Ledger("A/R");
            if(bool ==1)
                test.pass("Invoice Entries  are posted sucessfully from journal to Ledger");
            else
                test.fail("Error in posting invoice Entries journals to ledger");
            
            //----Entering CashReceipt-------
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
                nativeType("<Tab>");
                waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
                doubleClickItem(":_applicationsTab._aropen_XTreeWidget_2",invoicenum, 5, 5, 0, Qt.LeftButton);
                waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
                
                qtinvoice= findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
                
                type(":Cash Receipt.XLineEdit_XLineEdit", qtinvoice);
                waitForObject(":Cash Receipt.Save_QPushButton_3");
                clickButton(":Cash Receipt.Save_QPushButton_3");
                waitForObject(":_amountGroup.XLineEdit_XLineEdit");
                type(":_amountGroup.XLineEdit_XLineEdit", qtinvoice);
                waitForObject(":Cash Receipt.Save_QPushButton_2");
                clickButton(":Cash Receipt.Save_QPushButton_2");
                test.log("Cash receipt is created");
            }
            catch(e)
            {
                test.fail("Error in creating cash receipt:" + e);
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
                    var flag =1;
                }   
                
                waitForObject(":Receivables Workbench.Close_QPushButton");
                clickButton(":Receivables Workbench.Close_QPushButton");
                test.log("Cash receipts posted successful");
            }
            catch(e)
            {
                flag = 0;
                test.fail("Error in posting cash receipts:" + e);
                if(object.exists(":Receivables Workbench.Close_QPushButton"))
                {
                    waitForObject(":Receivables Workbench.Close_QPushButton");
                    clickButton(":Receivables Workbench.Close_QPushButton");
                }
                
            }
            if(flag == 1)
            {
                var CRnum = "I-"+invoicenum+"";
                //---------Journal Entry Verification-----
                var bool = journalVerification(/TTOYS-Tremendous Toys Incorporated/ ,CRnum);
                if(bool == 1)
                {
                    test.pass("Cash Receipt " +CRnum+ " has a Journal entry for cash receipt posting");
                }
                else
                    test.fail("No Journal entry is made for Posting"+CRnum+" Cash Receipt" );
                
                //----To avoid unexpected blocks ---------
                if(OS.name != "Windows")
                {
                    doNothing();
                }
                //---Verifying the Posted Status for CashReceipt in Journal------------
                Jnum[2] =journalStatus(CRnum,"No","before");
                var j3 = Jnum[2];
                test.log(j3);
                //----Post Journal to Ledger------
                
                var bool = postJournal2Ledger("A/R");
                if(bool ==1)
                    test.pass("Cash Receipt entries posted from Journal to Ledger");
                else
                    test.fail("Error in posting Cash receipt entries from Journal to Ledger");
                
                
                //----Gl Verification----------
                var source1 = ["S/R", "A/R", "A/R"];
                snooze(0.5);
                var bool = glTransactions1(Jnum,"Journal Posting", source1);
                if(bool ==1)
                {
                    test.pass( "Sales Order processing made entries in General Ledger Transactions");
                }
                else
                    test.fail("No entries made  for  SalesOrder Processing in   General Ledger Transactions");
                
            }//Related to Cash Receipt
            else //Related to Cash Receipt
            { 
                test.fail("Error in Creating Cash Receipt");
                
            }
        }//Related to invoice
        else //Related to Invoice Creation
        {
            test.fail("Error in Creating Invoice");
        }
        
    }//Related to SO Created
    
    else //Related to SO Creation
    {
        test.fail("Fail to Process the SalesOrder");
    }
    
    
    var flag = 1;
    snooze(0.5);
    var Jnum = []; 
    
    //-------Purchase Orer Processing---------
    var ponumber =  createPO("TPARTS","TBOX1","100");
    test.log(ponumber);
    //-----Releasing Purchase Order--------
    //---Verify for the PO created--------
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Open_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Open_XCheckBox");
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");   
        snooze(1);        
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+ponumber+"' type='QModelIndex'}"))
        {
            test.pass("Purchase Order Created sucessfully");
            flag = 1;            
        }
        else
        {
            test.fail("Purchase Order is not created");
            flag = 0;
            snooze(0.5);
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            
        }
    }
    catch(e)
    {
        test.fail("Error in Creating purchase order:" + e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    if(flag == 1)
    {
        try
        {
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3",ponumber, 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
            snooze(0.5);
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            test.log("Purchase Orders released successfully");
        }
        catch(e)
        {
            test.fail("Error in releasing purchase order:" + e);
            if(object.exists(":Quotes.Close_QToolButton"))
            {
                waitForObject(":Quotes.Close_QToolButton");
                clickButton(":Quotes.Close_QToolButton");
            }
        }
        
        
        //---------Create and post a PO receipt--------
        createPoReceipt(ponumber);
        
        //---------Journal Entry Verification-----
        var JPOnum = ""+ponumber+"-1";
        var bool = journalVerification(/Receive Inventory from / ,JPOnum);
        if(bool == 1)
        {
            test.pass("Purchase Order Receipt " + JPOnum + " has a entry in journal");
        }
        else
            test.fail("No entry is made for the Purchase Order Receipt in Journal" +JPOnum);
        
        //---Verifying the Posted Status for POReceipt in Journal------------
        
        Jnumbr =journalStatus(JPOnum,"No","before");
        Jnum[0] = ++Jnumbr;
        var j1 = Jnum[0];
        test.log(j1);
        //----Post Journal to Ledger------
        
        var bool = postJournal2Ledger("S/R");
        if(bool ==1)
            test.pass("PO Receipt entries are posted succesfully from Journal to Ledger");
        else
            test.fail("PO Receipt entries are not  posted from Journal to Ledger");
        
        //------- To avoid unexpected blocks -------------
        if (OS.name != "Windows")
        {
            doNothing();
        }
        
        //---Create and Post Voucher---
        //---Voucher Creation---------
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
            waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
            activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
            waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
            activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
            waitForObject(":xTuple ERP:*.New_QPushButton");
            clickButton(":xTuple ERP:*.New_QPushButton");
            waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
            type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit",ponumber);
            nativeType("<Tab>");
            vocnumber = findObject(":_voucherNumber_XLineEdit").text;
            waitForObject(":_poitems._poitem_XTreeWidget");
            clickItem(":_poitems._poitem_XTreeWidget","EA",0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":_poitems.Distributions..._QPushButton"));
            waitForObjectItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "No");
            doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "No", 11, 3, 0, Qt.LeftButton);
            clickButton(waitForObject(":_distTab.New_QPushButton"));
            snooze(0.5);
            var vamnt=findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
            clickButton(waitForObject(":Voucher Item Distribution.Save_QPushButton"));
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            waitForObject(":_amount.XLineEdit_XLineEdit");
            type(":_amount.XLineEdit_XLineEdit",vamnt);
            type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
            type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "<Tab>");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            snooze(0.5);
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            
        }
        catch(e)
        {
            test.fail("Failed to create Voucher:"+e);
        }
        
        //------------Posting Voucher--------
        try
        {	
            waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
            if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+vocnumber+"' type='QModelIndex'}"))
            {
                var flag = 1;
                test.pass("Voucher Created Sucessfully:");
            }
            else
            {
                flag = 0;
                test.fail("Fail to Create Voucher"); 
            }           
            
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Failed to  create  voucher:" + e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
            {
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
            }
            
        }
        
        //------To avoid unexpected blocks -----
        if(OS.name != "Windows")
        {
            doNothing();
        }
        if(flag == 1)
        {
            
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
                waitForObject(":xTuple ERP:*._vohead_XTreeWidget")
                        openItemContextMenu(":xTuple ERP:*._vohead_XTreeWidget",vocnumber, 5, 5, Qt.LeftButton);      
                snooze(1);
                activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher..."));
                snooze(0.5);
                waitForObject(":List Unposted Invoices.Continue_QPushButton");
                clickButton(":List Unposted Invoices.Continue_QPushButton");
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
                test.log("Voucher Posted sucessfully");
            }
            catch(e)
            {
                test.fail("Failed to  Post voucher:" + e);
                if(object.exists(":Select Order for Billing.Close_QPushButton"))
                {
                    waitForObject(":Select Order for Billing.Close_QPushButton");
                    clickButton(":Select Order for Billing.Close_QPushButton");
                }
            }
            
            //---------Journal Entry Verification-----
            
            var bool = journalVerification(/TPARTS-Toy Parts Inc./ ,vocnumber);
            if(bool == 1)
            {
                test.pass("Voucher " + vocnumber + " has a Journal entry");
            }
            else
                test.fail("No Journal entry is made for the Posting voucher: " +vocnumber);
            
            //---Verifying the Posted Status for Voucher in Journal------------
            Jnum[1] =journalStatus(vocnumber,"No","before");
            var j2 = Jnum[1];
            test.log(j2);
            //----Post Journal to Ledger------
            
            var bool = postJournal2Ledger("A/P");
            if(bool ==1)
                test.pass("Entries made for Voucher sucessfully verified");
            else
                test.fail("Error in Verifying entries made by Voucher");
            
            
            //-----------Selecting Voucher for payment-------
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
                waitForObject(":frame._apopen_XTreeWidget");
                clickItem(":frame._apopen_XTreeWidget",vocnumber,0, 0, 5, Qt.LeftButton);
                waitForObject(":frame.Select..._QPushButton");
                clickButton(":frame.Select..._QPushButton");
                snooze(0.5);
                waitForObject(":_bankaccnt_XComboBox");
                clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account",0, 0, 5, Qt.LeftButton);
                snooze(0.5);
                waitForObject(":Select Order for Billing.Save_QPushButton");
                clickButton(":Select Order for Billing.Save_QPushButton");
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
            }
            catch(e)
            {
                test.fail("Selecting Voucher for payment failed:"+ e);
                if(object.exists(":Select Order for Billing.Close_QPushButton"))
                {
                    waitForObject(":Select Order for Billing.Close_QPushButton");
                    clickButton(":Select Order for Billing.Close_QPushButton");
                }
            }
            //--Enable EFT check Printing-----
            try
            {
                activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
                activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup..."));
                clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Accounts Payable");
                waitForObject(":tab.Enable EFT Check Printing_QGroupBox"); 
                if(!findObject(":tab.Enable EFT Check Printing_QGroupBox").checked)
                {
                    mouseClick(":tab.Enable EFT Check Printing_QGroupBox", 8, 12, 0, Qt.LeftButton);
                }
                test.log("Sucessfully Enabled EFT check printing:");
                clickButton(waitForObject(":View Check Run.Save_QPushButton"));
            }
            catch(e)
            {
                test.fail("Error in Enabling EFT check Printing option:"+e);
                if(object.exists(":View Check Run.Save_QPushButton"))
                    clickButton(waitForObject(":View Check Run.Save_QPushButton"));
            }
            //---------Preparing Check Run, Printing Check and Posting Check----
            //---Prepare Check Run
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
                clickItem(":Prepare Check Run._bankaccnt_XComboBox","EBANK-eBank Checking Account",0,0,5,Qt.LeftButton);
                snooze(0.5);
                waitForObject(":Prepare Check Run.Prepare_QPushButton");
                snooze(1);
                clickButton(":Prepare Check Run.Prepare_QPushButton");
            }
            catch(e)
            {
                test.fail("Failed to prepare CheckRun:"+e);
            }
            
            
            //--------View Check run-----------
            try
            {
                activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
                activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
                activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments"));
                activateItem(waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run..."));
                waitForObjectItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1");
                clickItem(":_frame._check_XTreeWidget", "TPARTS-Toy Parts Inc\\._1", 232, 12, 0, Qt.LeftButton);
                
                sendEvent("QMouseEvent", waitForObject(":_frame.Print_QPushButton"), QEvent.MouseButtonPress, 46, 11, Qt.LeftButton, 0);    
                
                snooze(2);
                if(OS.name != "Windows")
                {
                    activateItem(waitForObjectItem(":_QMenu", "Check Run..."));
                    clickButton(waitForObject(":Print Checks.Print_QPushButton"));
                    clickButton(waitForObject(":View Check Run.Yes_QPushButton_2"));
                    snooze(0.5);
                    findObject(":filename_QLineEdit").clear();
                    type(waitForObject(":filename_QLineEdit"), "2");
                    nativeType("<Tab>");
                    snooze(1);
                    clickButton(waitForObject(":Print.Print_QPushButton"));
                    snooze(0.5);
                    clickButton(waitForObject(":View Check Run.Yes_QPushButton_2"));
                    snooze(1);
                    clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
                }
                else
                {
                    snooze(0.1);
                    activateItem(waitForObjectItem(":_QMenu", "Selected Check..."));
                    waitForObject(":Print Check.Create EFT File_QPushButton");
                    clickButton(":Print Check.Create EFT File_QPushButton");
                    snooze(0.5);
                    waitForObject(":fileNameEdit_QLineEdit_2");
                    findObject(":fileNameEdit_QLineEdit_2").text = winPath.toString()+"/achFile.ach";              snooze(0.5);
                    waitForObject(":View Check Run.Save_QPushButton");
                    clickButton(":View Check Run.Save_QPushButton");
                    snooze(0.5);
                    if(object.exists(":View Check Run.Yes_QPushButton_2"))    
                        clickButton(":View Check Run.Yes_QPushButton_2");
                    
                    clickButton(waitForObject(":ACH File OK?.Yes_QPushButton"));
                }
            }
            catch(e)
            {
                test.fail("Error in printing the check: " + e);
            }
            
            //-----Post Check run-----
            try
            {
                waitForObject(":_frame._check_XTreeWidget");
                if(OS.name != "Windows")
                {
                    var widget = findObject(":_frame._check_XTreeWidget");
                    var obj_TreeTopLevelItem =widget.topLevelItem(0);
                    var checkNum = obj_TreeTopLevelItem.text(3);
                }
                clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
                snooze(0.5);
                
                
                
                waitForObject(":_frame.Post_QPushButton");
                sendEvent("QMouseEvent", ":_frame.Post_QPushButton", QEvent.MouseButtonPress, 51, 9, Qt.LeftButton, 0);
                snooze(0.5);
                waitForObjectItem(":_QMenu", "Selected Check...");
                activateItem(":_QMenu", "Selected Check...");
                snooze(0.5);
                clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
                test.log("Check has been posted");
            }
            catch(e)
            {
                test.fail("Error in posting check run:" + e);
                if(object.exists(":Select Order for Billing.Close_QPushButton"))
                {
                    clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
                }
            }
            
            
            
            //---------Journal Entry Verification for Check Post-----
            if(OS.name != "Windows")
            {
                var bool = journalVerification(/TPARTS-Toy Parts Inc./ ,checkNum);
                if(bool == 1)
                {
                    test.pass("Check posted has a Journal entry ");
                }
                else
                    test.fail("No Journal entry is made for the Posting Check ");
            }  
            else
            {
                var bool = journalVerification(/TPARTS-Toy Parts Inc./ ,-1);
                if(bool == 1)
                {
                    test.pass("Check posted has a Journal entry ");
                }
                else
                    test.fail("No Journal entry is made for the Posting Check ");
            }
            //---Verifying the Posted Status for Check in Journal------------
            if(OS.name != "Windows")
            {
                Jnum[2] = journalStatus(checkNum,"No","before");
                var j3 = Jnum[3];
                test.log(j3);
            }
            else
                Jnum[2] =journalStatus(-1,"No","before");
            
            //----Post Journal to Ledger------
            
            var bool =  postJournal2Ledger("A/P");
            if(bool ==1)
                test.pass("Check entries are posted successfully from Journals to Ledger");
            else
                test.fail("Error in posting Check entries from Journals to Ledger");
            
            //----Gl Verification----------
            var source1 = ["S/R", "A/P", "A/P"];
            snooze(0.5);
            var bool = glTransactions1(Jnum,"Journal Posting", source1);
            if(bool ==1)
            {
                test.pass( "Purchase Order Processing made entries in General Ledger Transactions");
            }
            else
                test.fail("No entries made  for  Purchase Order Processing in   General Ledger Transactions");
            
        }//Related to Voucher Creation
        else //Related to Voucher Creation
        {
            test.fail("Error in Creating Voucher");
        }
        
    }//Related to PO  release
    else //Related to PO  release
    {
        test.fail("Error in Creating Purchase Order");
    }
    
    
    //---To avoid unexpected blocks -----
    if(OS.name != "Windows")
    {
        doNothing();
    }
    snooze(0.5);
    var Jnum = [];
    //--Create Return Authorization Disposition as ‘Return’, Credit/Ship as ‘Immediately’ and Credit by as ‘None’ ----
    if(appE!="PostBooks")
    {
        //-------Extracting RA number----------
        var RANUM;
        
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
            snooze(0.5);
            activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
            waitForObject(":_stack._nextRaNumber_XLineEdit");
            RANUM = findObject(":_stack._nextRaNumber_XLineEdit").text;
            snooze(0.5);
            clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
            test.log("RA number extracted sucessfully");
        }
        catch(e)
        {
            test.fail("Error in extracting RA number:"+e);
            if(object.exists(":Cash Receipt.Save_QPushButton_3"))
            {
                clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
            }
        }
        
        //---To avoid unexpected blocks -----
        if(OS.name != "Windows")
        {
            doNothing();
        }
        //--------------- Create RA with Disposition - Return, Credit/Ship - Immediately, Credit By - None -----
        
        var Return1 = ["Return","Immediately","None","YTRUCK1","100","9.5"];
        
        flag = createRA(Return1);
        
        if(flag == 1)
        {
            test.log("RA created with Disposition - Return, Credit/Ship - Immediately, Credit By - None"); 
            //----------------Create and post receipt--------
            //-------QOH verification-------
            qohBefore = queryQoh("YTRUCK1","WH1",appE);
            snooze(1);
            //----Receipt Posting----
            postReceipt(RANUM);
            //-------QOH verification-------
            qohAfter = queryQoh("YTRUCK1","WH1",appE);
            
            if(parseInt(qohBefore) + 100 == parseInt(qohAfter))
                test.pass("QOH updated successfully");
            else
                test.fail("QOH updated incorrectly");
            //----------Verify RA ---------
            flag = verifyRa(RANUM);
            
            if(flag == 0)
                test.pass("RA"  +  RANUM +" is closed successfully");
            else
                test.fail("RA" + RANUM +" is not closed");
            
            //---------Journal Entry Verification-----
            var JRANUM = ""+ RANUM+"-1";
            //test.log(JRANUM);
            var bool = journalVerification(/Receive Inventory from/,JRANUM);
            if(bool == 1)
            {
                test.pass("RA " + JRANUM + " has a GL entry for receiving receipt");
            }
            else
            {
                test.fail("No GL entry is made for the Receipt Reveiving  for RA " +JRANUM);
                
            }
            //---Verifying the Posted Status for Check in Journal------------
            
            Jnumbr =journalStatus(JRANUM,"No","before");
            Jnum[0] = ++Jnumbr;
            //----Post Journal to Ledger------
            
            var bool = postJournal2Ledger("S/R");
            if(bool ==1)
                test.pass("Entries made for posting a receipt sucessfully verified");
            else
                test.fail("Error in Verifying entries for posting a receipt");
            //----Gl Verification----------
            var source1 = ["S/R"];
            var bool = glTransactions1(Jnum,"Journal Posting", source1);
            if(bool ==1)
            {
                test.pass( "RA Processing made entries in General Ledger Transactions");
            }
            else
                test.fail("No entries made  for RA Processing in   General Ledger Transactions");
            
            
        }//RA Verification
        else //RA Verification
        {
            test.log("Error in Creating RA");
        }
    }
    
    
    //-----------WO Processing-------------
    //----Create WO-----
    
    var Jnum = [];
    var regqty = "100";
    var wonumreg = createWorkOrder("YTRUCK1", regqty);     
    
    //----Verify for the WO Created-----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        waitForObject(":_list_XTreeWidget_3");
        snooze(1);
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonumreg+"' type='QModelIndex'}"))
        {
            test.pass("Work Order found");
            flag = 1;
            waitForObject(":_list_XTreeWidget_3");  
            openItemContextMenu(":_list_XTreeWidget_3", wonumreg , 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release");
            activateItem(":xTuple ERP:*._menu_QMenu", "Release");
            snooze(0.5);
            waitForObject(":_list_XTreeWidget_3");
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='R' type='QModelIndex'}"))        {
                
                test.pass("Work Order released successfully");
            }
        }
        else  
        {
            flag = 0;
            test.fail("Work Order not found");
        }
        snooze(1);
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating WO:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
        
    }
    if(flag == 1)
    {
        //---Issueing Material for an Item----------
        issueItem(wonumreg, "YPAINT1", appE);
        
        //----- Journal Entry verification of Issue Materials of a Work Order -----
        
        var bool = journalVerification(/Material/, wonumreg);
        if(bool == 1)
        {
            test.pass("WO " + wonumreg + " has a Journal entry for its Material Issue Transactions");
        }
        else
            test.fail("No JOurnal entry is made for the  Material Issue Transactions of work order " + wonumreg);
        
        //---Verifying the Posted Status for Material Issueing of WO on Journal------------
        
        Jnum[0] =journalStatus(wonumreg,"No","before");
        //----Post Journal to Ledger------
        
        var bool = postJournal2Ledger("W/O");
        if(bool ==1)
            test.pass("Entries made for Issueing Materials verified");
        else
            test.fail("Error in Verifying entries for Material Issueing");
        
        //----Gl Verification----------
        var source1 = [ "W/O"];
        var bool = glTransactions1(Jnum,"Journal Posting", source1);
        if(bool ==1)
        {
            test.pass( "Material Issueing for WorkOrder made entries in General Ledger Transactions");
        }
        else
            test.fail("No entries made  for  Issueing Materials for WorkOrder in   General Ledger Transactions");
        
        if(appE =="Manufacturing")
        {
         //-- Post Operations of a Work Order (after issuing the materials)of regular type Item------
            
            postOperations(wonumreg, regqty); 
            
            //----- Journal Entry verification for Post Operations of a Work Order  -----
            
            var bool = journalVerification(/Post Setup/, wonumreg);
            if(bool == 1)
            {
                test.pass("WO " + wonumreg + " has a Journal entry for PostOperation of WorkOrder");
            }
            else
                test.fail("No Journal entry is made for the  Postoperation of work order " + wonumreg);
           
            //----Post Journal to Ledger------
            
            var bool = postJournal2Ledger("W/O");
            if(bool ==1)
                test.pass("Entries made on PostOperation of WorkOrder sucessfully verified");
            else
                test.fail("Error in Verifying entries made on PostOperation of WorkOrder");
            
            //----Verify the Posted status in Journal-----
            
            var Jnumbr =journalStatus(wonumreg,"Yes","after");
            Jnum[0] =Jnumbr + 11;
            
            //----- G/L transaction verification for Post Operations of a Work Order -----
            
            var source1 = ["W/O"];
            var bool = glTransactions1(Jnum,"Journal Posting", source1);
            if(bool ==1)
            {
                test.pass("PostOperation of WorkOrder  sucessfully made entries in General Ledger Transactions");
            }
            else
                test.fail("No entries made  in  General Ledger Transactions for PostOperation of WorkOrder");
        } 
        
        
        //----- Post Production of a Work Order (after issuing the materials)-------------
        postProductionim(wonumreg, regqty, appE);
        
        
        //----- Journal Entry verification of Issue Materials of a Work Order -----
        
        var bool = journalVerification(/Receive Inventory/, wonumreg);
        if(bool == 1)
        {
            test.pass("WO " + wonumreg + " has a Journal entry for PostProduction of WorkOrder");
        }
        else
            test.fail("No Journal entry is made for the PostProduction of WorkOrder" + wonumreg);
        
        //----Post Journal to Ledger------
        
        var bool = postJournal2Ledger("W/O");
        if(bool ==1)
            test.pass("Entries made for PostProduction of WorkOrder sucessfully verified");
        else
            test.fail("PostProduction entries posted from Journal to Ledger successfully ");
        //----Verify the Posted status in Journal-----
        
        var Jnumb =journalStatus(wonumreg,"Yes","after");
        Jnum[0] = Jnumb +parseInt(16);
        
        //----Gl Verification----------
        var source1 = ["W/O"];
        var bool = glTransactions1(Jnum,"Journal Posting", source1);
        if(bool ==1)
        {
            test.pass("WorkOrder PostProduction  sucessfully made entries in General Ledger Transactions");
        }
        else
            test.fail("No entries made  in General Ledger Transactions for WorkOrder PostProduction"); 
        
        
    }//WO creation
    else //WO creation
    {
        test.fail("Error in Creating WO");
    }
    
    snooze(0.5);      
    
    if(appE!="PostBooks")
    {
        //---Create TO---
        var Jnum = [];
        var TONUM = createTo("YTRUCK1","100","WH1","WH2");
        
        //---------------Release the transfer orders---------------------    
        
        //---Verification of the TO created-----
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
            waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
            activateItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
            snooze(1);
            waitForObject(":_frame._to_XTreeWidget");
            if(object.exists("{column='0' container=':_frame._to_XTreeWidget' text='"+TONUM+"' type='QModelIndex'}"))
            {
                flag = 1;
                test.pass("Transfer Order Created Sucessfully");
            }     
            else
            {
                flag = 0;
                test.fail("Fail to create Transfer Order");
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
            }
            snooze(1);
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
        catch(e)
        {
            test.fail("Error in releasing transfer orders:" + e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
            {
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
            }
            
        }
        
        if(flag == 1)
        {
            //---Release Transfer Order------
            try
            {
                waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
                activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
                waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
                activateItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
                waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
                activateItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
                snooze(0.5);
                waitForObject(":_frame._to_XTreeWidget");
                clickItem(":_frame._to_XTreeWidget",TONUM,10,10,0,Qt.LeftButton);
                waitForObject(":_frame.Release_QPushButton");
                clickButton(":_frame.Release_QPushButton"); 
                test.log("Transfer Order released succesfully"); 
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
                
            }
            
            catch(e)
            {
                test.fail("Error in releasing transfer orders" + e);
                if(object.exists(":Select Order for Billing.Close_QPushButton"))
                {
                    waitForObject(":Select Order for Billing.Close_QPushButton");
                    clickButton(":Select Order for Billing.Close_QPushButton");
                }
            }
            
            
            //----- To avoid unexpected blocks ------------------
            if(OS.name != "Windows")
            {
                doNothing();
            }
            
            //----QOH verification before stock issueing---------
            var regQohWh1 = queryQoh("YTRUCK1","WH1",appE);
            
            //---Issue Stock---
            try
            {
                
                waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
                activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
                waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
                activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
                waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
                activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
                waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
                type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit",TONUM); 
                nativeType("<Tab>");
                snooze(0.5);
                waitForObject(":_frame.Issue All_QPushButton");
                clickButton(":_frame.Issue All_QPushButton");
                snooze(1);
                waitForObject(":Issue to Shipping.Ship_QPushButton");
                clickButton(":Issue to Shipping.Ship_QPushButton");
                if(object.exists(":groupBox.Receive Immediately_XCheckBox"))
                {
                    if(findObject(":groupBox.Receive Immediately_XCheckBox").checked)
                    {
                        waitForObject(":groupBox.Receive Immediately_XCheckBox");
                        clickButton(":groupBox.Receive Immediately_XCheckBox");
                        
                    }
                }
                
                clickButton(waitForObject(":Issue to Shipping.Ship_QPushButton_2"));
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
                test.log("Stock issued sucessfully for shipping:");
            }
            catch(e)
            {
                waitForObject(":Select Order for Billing.Close_QPushButton");
                clickButton(":Select Order for Billing.Close_QPushButton");
                test.fail("Error in issueing stock to Shipping:"+e);
            }
            //-------------------Verify Qoh for issue stock------------------
            var result = queryQoh("YTRUCK1","WH1",appE);
            if(parseInt(regQohWh1) - result=="100")
                test.pass("Quantity of YTRUCK1 is updated correctly at WH1");
            else
                test.fail("Quantity of YTRUCK1 is not updated correctly at WH1"); 
            regQohWh1 = result;
            
            //---------Journal Entry Verification-----
            var JTOshipnum = ""+TONUM+"-1";
            var bool = journalVerification(/Ship from Src to Transit Warehouse/,JTOshipnum);
            if(bool == 1)
            {
                test.pass("TO " +JTOshipnum+ " has a GL entry for Stock Issueing");
            }
            else
                test.fail("No GL entry is made for the  Stock Issue of Transfer Order " +JTOshipnum);
            //---Verifying the Posted Status for TO stock Issue in Journal------------
            var Jnumbr =journalStatus(JTOshipnum,"No","before");
            
            //----Post Journal to Ledger------
            try{
                activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
                snooze(0.5);
                activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
                snooze(0.5);
                activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Post Journals to Ledger..."));
                snooze(0.5);
                clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
                snooze(1);
                waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
                type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
                nativeType("<Tab>");
                snooze(1);
                waitForObject(":Transaction Dates.XDateEdit_XDateEdit").clear();
                type(":Transaction Dates.XDateEdit_XDateEdit", "0");
                nativeType("<Tab>");
                snooze(1);
                clickButton(waitForObject(":xTuple ERP:*.Select All_QPushButton"));
                clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
                snooze(1);
                clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
                snooze(1);
                
                var sWidgetTreeControl = ":_frame._sources_XTreeWidget";
                waitForObject(sWidgetTreeControl);
                var obj_TreeWidget = findObject(sWidgetTreeControl);
                var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
                var obj = obj_TreeWidget.topLevelItemCount;
                if(obj == parseInt(0))
                {
                    flag1 = 1;
                    test.pass("Transfer Order Journal entries sucessfully posted to Ledger:");
                }
                else
                {
                    flag1 = 0;
                    test.fail("Error in posting Transfer Order Journal entries to Ledger:");
                }
                clickButton(waitForObject(":xTuple ERP:*.Cancel_QPushButton"));
            }
            catch(e)
            {
                test.fail("Exception in posting Transfer Order journal entries to Ledger "+e);
                clickButton(waitForObject(":xTuple ERP:*.Cancel_QPushButton"));
            }
            
            //----Verify the Posted status for TO stock Issue in Journal-----
            
            var Jnumb =journalStatus(JTOshipnum,"Yes","after");
            Jnum[0] = ++Jnumb;
            
            
            
            
            //-----QOH verifiaction for WH2 Warehouse-------
            var regQohWh2 = queryQoh("YTRUCK1","WH2",appE);
            
            //------Receiving inventory for Transfer Order to WH2 warehouse-----
            createPoReceipt(TONUM);
            
            //-------------------Verification of updated QOH by Item at WH2----
            
            var result1=queryQoh("YTRUCK1","WH2",appE);
            if(result1 - parseInt(regQohWh2)=="100")
                test.pass("Quantity of YTRUCK1 is updated correctly for Post Receipt at WH2");
            else
                test.fail("Quantity of YTRUCK1 is not updated correctly Post Receipt at WH2");
            
            //---------Journal Entry Verification-----
            
            var bool = journalVerification(/Issue to Shipping/ ,JTOshipnum);
            if(bool == 1)
            {
                test.pass("TO " +JTOshipnum+ " has a GL entry for posting Receipt");
            }
            else
                test.fail("No GL entry is made for receipt posting of" +JTOshipnum);
            
            
            //----Post Journal to Ledger------
            
            var bool = postJournal2Ledger("I/M");
            if(bool ==1)
                test.pass("Entries made for receiving TO sucessfully verified");
            else
                test.fail("Error in Verifying entries for receiving TO ");
            //----Verify the Posted status for receipt in Journal-----
            
            var Jnumbr =journalStatus(JTOshipnum,"Yes","after");
            
            Jnum[1] = Jnumbr+5;
            //----Gl Verification----------
            var source1 = ["S/R","I/M"];
            var bool = glTransactions1(Jnum,"Journal Posting", source1);
            if(bool ==1)
            {
                test.pass("Receiving and shipping TO  sucessfully made entries in General Ledger Transactions");
            }
            else
                test.fail("No entries made for TO processing in General Ledger Transactions for Receiving TO ");
            
        }
        
        else  //Transfer Order Creation
        { 
            test.fail("Error in Creating Transfer Order");
        }   
    }
    
    //---Create A/P Misc. Credit Memo and post to Journal----
    var Jnum = [];
    var Memoamnt ="200";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Memos"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Memos_QMenu", "New Misc. Credit Memo..."));
        type(waitForObject(":A/P Open Item - Enter Misc. Credit Memo.VirtualClusterLineEdit_VendorLineEdit"), "TPARTS");
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        snooze(0.5);
        type(waitForObject(":_dateGroup.XDateEdit_XDateEdit_3"), "0");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_docGroup._docNumber_XLineEdit");
        var APCreditnum = findObject(":_docGroup._docNumber_XLineEdit").text;
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), Memoamnt);
        clickButton(waitForObject(":A/P Open Item - Enter Misc. Credit Memo.Post_QPushButton"));
        test.log("A/P Misc.Credit memo created sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Creating A/P Misc.Credit Memo:"+e);
        if(object.exists(":A/P Open Item - Enter Misc. Credit Memo.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":A/P Open Item - Enter Misc. Credit Memo.Cancel_QPushButton"))
                }
    }
    //---------Journal Entry Verification-----
    var bool = journalVerification(/Toy Parts Inc./,APCreditnum);
    if(bool == 1)
    {
        test.pass("A/P Misc.Credit Memo " +APCreditnum+ " has a Journal entry");
    }
    else
        test.fail("No Journal entry is made for A/P Misc.Credit Memo :" +APCreditnum);
    //---Verifying the Posted Status for A/P Misc. Credit memo in Journal------------
    var Jnumbr =journalStatus(APCreditnum,"No","before");
    
    //----Post Journal to Ledger------
    
    var bool = postJournal2Ledger("A/P");
    if(bool ==1)
        test.pass("Journals entries of A/P Misc.Credit Memo are posted to G/L sucessfully");
    else
        test.fail("Error in posting A/P Misc. Credit memo entries from Journal to Ledger");
    
    //----Verify the Posted status for A/P Misc. Credit Memo in Journal-----
    
    Jnum[0] =journalStatus(APCreditnum,"Yes","after");
    
    //----Gl Verification----------
    var source1 = ["A/P"];
    var bool = glTransactions1(Jnum,"Journal Posting", source1);
    if(bool ==1)
    {
        test.pass("A/P Misc.Credit Memo has G/L entries");
    }
    else
        test.fail("No entries has made for  A/P Misc.Credit Memo");
    
    
    
    //--------- Create A/R Credit memo and Post to Journal------
    var Jnum = [];
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Memos_QMenu_2", "New Misc. Credit Memo..."));
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), "TTOYS");
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        snooze(.5);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3").clear();
        type(":_dateGroup.XDateEdit_XDateEdit_3","0");
        nativeType("<Tab>");
        snooze(.5);
        waitForObject(":_docGroup._docNumber_XLineEdit_2");
        var ARCreditnum = findObject(":_docGroup._docNumber_XLineEdit_2").text;
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), Memoamnt);
        
        clickItem(":_docGroup._rsnCode_XComboBox_2", "SO-DAMAGED-RETURNED-SO Damaged - Returned on CM",0, 0, 5, Qt.LeftButton);     clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Notes");
        type(waitForObject(":_notesTab._notes_XTextEdit"), "New A/R Misc Credit Memo Created");
        clickButton(waitForObject(":A/R Open Item - Enter Misc. Credit Memo.Post_QPushButton"));
        clickButton(waitForObject(":A/R Open Item - Enter Misc. Credit Memo.Cancel_QPushButton"));
        test.log("A/R Misc. Credit Memo"  + ARCreditnum +  "is created");
    }
    catch(e)
    {
        test.fail("Error in Posting A/R Misc. Credit Memo:"+e);
        clickButton(waitForObject(":A/R Open Item - Enter Misc. Credit Memo.Cancel_QPushButton"));
        
    }
    //---------Journal Entry Verification-----
    var bool = journalVerification(/Tremendous Toys Incorporated/,ARCreditnum);
    if(bool == 1)
    {
        test.pass("A/R Misc.Credit Memo " +ARCreditnum+ " has a Journal entry");
    }
    else
        test.fail("No Journal entry is made on  posting A/P Misc.Credit Memo " +ARCreditnum);
    
    
    
    //---Verifying the Posted Status for A/R Misc. Credit memo in Journal------------
    Jnum[0] =journalStatus(ARCreditnum,"No","before");
    
    //----Post Journal to Ledger------
    
    var bool = postJournal2Ledger("A/R");
    if(bool ==1)
        test.pass("Entries for A/R Misc.Credit Memo has been posted from Journals to Ledger");
    else
        test.fail("Error in posting A/R Misc.Credit Memo entries from Journal to Ledger");
    
    //----Gl Verification----------
    var source1 = [ "A/R"];
    var bool = glTransactions1(Jnum,"Journal Posting", source1);
    if(bool ==1)
    {
        test.pass("A/R Misc.Credit Memo  sucessfully made entries in General Ledger Transactions");
    }
    else
        test.fail("No entries made  in General Ledger Transactions for A/R Misc.Credit Memo");
    
    
    //---Create A/P Debit Memo and post to Journal---------
    var Jnum = [];
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Memos"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Memos_QMenu", "New Misc. Debit Memo..."));
        type(waitForObject(":A/P Open Item - Enter Misc. Debit Memo.VirtualClusterLineEdit_VendorLineEdit"), "TPARTS");
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        snooze(.5);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3").clear();
        type(":_dateGroup.XDateEdit_XDateEdit_3", "0");
        nativeType("<Tab>");
        waitForObject(":_docGroup._docNumber_XLineEdit_4");
        var APDebitnum = findObject(":_docGroup._docNumber_XLineEdit_4").text;
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), Memoamnt);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Notes");
        type(waitForObject(":_notesTab._notes_XTextEdit_3"), "New A/P Misc. Debit Memo is Created");
        clickButton(waitForObject(":A/P Open Item - Enter Misc. Debit Memo.Post_QPushButton"));
        test.log("A/P Misc. Debit Memo" + APDebitnum +  "is created");
    }
    catch(e)
    {
        clickButton(waitForObject(":A/P Open Item - Enter Misc. Debit Memo.Cancel_QPushButton"));
        test.fail("Error in creating A/P Misc Debit Memo");
    }
    //---------Journal Entry Verification-----
    var bool = journalVerification(/Toy Parts Inc. New/,APDebitnum);
    if(bool == 1)
    {
        test.pass("A/P Misc.Dedit Memo " +APDebitnum+ " has a Journal entry");
    }
    else
        test.fail("No Journal entry is made on posting A/P Misc.Dedit Memo: " +APDebitnum);
    
    //---Verifying the Posted Status for A/R Misc. Credit memo in Journal------------
    
    Jnum[0] =journalStatus(APDebitnum,"No","before");
    //----Post Journal to Ledger------
    var bool = postJournal2Ledger("A/P");
    if(bool ==1)
        test.pass("Entries of A/P Debit Memo posted sucessfully from Journal to Ledger");
    else
        test.fail("Error in posting the entries of A/P Debit Memo from Journal to Ledger ");
    
    
    //----Gl Verification----------
    var source1 = [ "A/P"];
    var bool = glTransactions1(Jnum,"Journal Posting", source1);
    if(bool ==1)
    {
        test.pass("A/P Debit Memo had entries in General Ledger Transactions");
    }
    else
        
        test.fail("No entries made  in  General Ledger Transactions for A/P Debit Memo");
    
    
    
    //---Create A/R debit memo and post to Journal--
    var Jnum = [];
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Memos_QMenu_2", "New Misc. Debit Memo..."));
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), "TTOYS");
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3").clear();
        type(":_dateGroup.XDateEdit_XDateEdit_3","0")
                nativeType("<Tab>");
        waitForObject(":_docGroup._docNumber_XLineEdit_3");
        var ARDebitnum = findObject(":_docGroup._docNumber_XLineEdit_3").text;
        type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"),Memoamnt);
        clickItem(":_docGroup._rsnCode_XComboBox", "SO-DAMAGED-RETURNED-SO Damaged - Returned on CM",0, 0, 5, Qt.LeftButton);       clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Notes");
        type(waitForObject(":_notesTab._notes_XTextEdit_2"), "New A/R Misc Debit Memo is Created");
        clickButton(waitForObject(":A/R Open Item - Enter Misc. Debit Memo.Post_QPushButton"));
        clickButton(waitForObject(":A/R Open Item - Enter Misc. Debit Memo.Cancel_QPushButton"));
        test.log("A/R Misc Debit Memo"+ARDebitnum+ "is created");
    }
    catch(e)
    {
        test.fail("Error in creating A/R Misc. Debit memo:"+e);
        if(object.exists(":A/R Open Item - Enter Misc. Debit Memo.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":A/R Open Item - Enter Misc. Debit Memo.Cancel_QPushButton"));
        }
        
    }
    //---------Journal Entry Verification-----
    var bool = journalVerification(/Tremendous Toys Incorporated/, ARDebitnum);
    if(bool == 1)
    {
        test.pass("A/R Misc.Credit Memo " + ARDebitnum+ " has a Journal entry");
    }
    else
        test.fail("No Journal entry is made on posting A/R Misc.Credit Memo: " + ARDebitnum);
    
    
    
    //---Verifying the Posted Status for A/R Misc. Credit memo in Journal------------
    
    Jnum[0] =journalStatus(ARDebitnum,"No","before");
    
    //----Post Journal to Ledger------
    
    var bool = postJournal2Ledger("A/R");
    if(bool ==1)
        test.pass("A/R debit memo entries are posted sucessfully from Journals to Ledger");
    else
        test.fail("Error inposting A/R debit memo  entries from Journal to Ledger");
    //----Gl Verification----------
    var source1 = ["A/R"];
    var bool = glTransactions1(Jnum,"Journal Posting", source1);
    if(bool ==1)
    {
        test.pass("A/R debit memo  sucessfully made entries in General Ledger Transactions");
    }
    else
        test.fail("No entries made  in General Ledger Transactions for A/R debit memo");
    
    
    //-----Create Misc. Voucher---------
    var Jnum = [];
    var MiscVamnt = "100";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted..."));
        clickButton(waitForObject(":xTuple ERP:*.New Misc._QPushButton"));
        type(waitForObject(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit"), "TPARTS");
        
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        // Verification Point 'VP1'
        var MisVnum =findObject(":_voucherGroup._voucherNumber_XLineEdit").text;
        test.log(MisVnum);
        clickButton(waitForObject(":_miscDistribTab.New_QPushButton"));
        type(waitForObject(":_groupButton.VirtualClusterLineEdit_GLClusterLineEdit"),"01-01-1000-01");
        waitForObject(":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit").clear();
        type( ":Miscellaneous Voucher Distribution.XLineEdit_XLineEdit",MiscVamnt);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        type(":_amountGroup.XLineEdit_XLineEdit",MiscVamnt);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        //---Verifying for Misc Voucher created -------------
        waitForObject(":xTuple ERP:*._vohead_XTreeWidget")
                var widget = findObject(":xTuple ERP:*._vohead_XTreeWidget");
        var obj_TreeTopLevelItem =widget.topLevelItem(0);
        var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
        
        if(sNameOfRootItem == MisVnum)
        {
            var flag = 1;
            test.pass("Misc. Voucher" +MisVnum +"Created Sucessfully:");
        }
        else
            test.fail("Fail to Create Misc. Voucher:"); 
        openItemContextMenu(":xTuple ERP:*._vohead_XTreeWidget",MisVnum, 5, 5, Qt.LeftButton);         snooze(1);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Voucher..."));
        snooze(1);
        clickButton(waitForObject(":List Unposted Invoices.Continue_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Misc. Voucher Created Sucessfully:");
    }
    catch(e)
    {
        test.fail("Error in Creating Misc. Voucher:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    if(flag ==1)
    {
        
        //---------Journal Entry Verification-----
        
        var bool = journalVerification(/TPARTS-Toy Parts Inc./ ,MisVnum);
        if(bool == 1)
        {
            test.pass("Misc. Voucher " +MisVnum + " has a Journal entry");
        }
        else
            test.fail("No Journal entry is made on the Posting Misc. voucher: " +MisVnum);
        
        
        
        //---Verifying the Posted Status for Misc. Voucher in Journal------------
        
        Jnum[0] =journalStatus(MisVnum,"No","before");
        
        //----Post Journal to Ledger------
        
        var bool = postJournal2Ledger("A/P");
        if(bool ==1)
            test.pass("Misc. Voucher entries are posted sucessfully from Journal to Ledger");
        else
            test.fail("Error in posting the Misc. Voucher entries from Journal to Ledger ");
        
        
        //----Gl Verification----------
        var source1 = ["A/P"];
        var bool = glTransactions1(Jnum,"Journal Posting", source1);
        if(bool ==1)
        {
            test.pass("Misc. Voucher  sucessfully made entries in General Ledger Transactions");
        }
        else
            test.fail("No entries made  in  General Ledger Transactions for Misc. Voucher");
    }//Related to Misc Voucher
    else
    {
        test.fail("Error in Creating Misc Voucher");
    }
    
    snooze(0.5);  
    
    //-----------Create Inventory Adjustment and post to Journal-------
    var Adjnum = "1211";
    var Jnum = [];
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment..."));
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), "YTRUCK1");
        nativeType("<Tab>");
        type(waitForObject(":_qty_XLineEdit"), "300");
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        if(!findObject(":_adjustmentTypeGroup.Absolute_QRadioButton").checked)
        {
            clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
            
        }
        type(waitForObject(":_documentNum_XLineEdit"),Adjnum);
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        test.log("Inventory adjusted sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Adjusting the Inventory of item:"+e);
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        
    }
    
    //---------Journal Entry Verification-----
    
    var bool = journalVerification(/Miscellaneous Adjustment/,Adjnum);
    if(bool == 1)
    {
        test.pass( "Doc#"+Adjnum + " has a Journal entry for Adjusted inventory");
    }
    else
        test.fail("Doc#"+Adjnum+"No Journal entry is made for Adjusted inventory ");
    
    
    //---Verifying the Posted Status for Inventory Adhustment Posted in Journal------------
    
    Jnum[0] =journalStatus(Adjnum,"No","before");
    
    //----Post Journal to Ledger------
    
    var bool = postJournal2Ledger("I/M");
    if(bool ==1)
        test.pass("Adjusted inventory  entries are posted sucessfully from Jounal to Ledger");
    else
        test.fail("Error in posting the entries of Adjusting Inventory from Journal to Ledger");
    
    
    //----Gl Verification----------
    var source1 = ["I/M"];
    var bool = glTransactions1(Jnum,"Journal Posting", source1);
    if(bool ==1)
    {
        test.pass("Adjusting an Inventory sucessfully made entries in General Ledger Transactions");
    }
    else
        test.fail("No entries made  in Posting Journal to  General Ledger Transactions");
    
    
    //-----------Create and Post  G/L Journal Entry---------------
    
    var SmpleDocnum = "131";
    var smpleamnt = "100";
    var Jnum = [];
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), smpleamnt);
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"),SmpleDocnum);
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        snooze(1);
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1010-01");
        type(waitForObject(":frame._notes_XTextEdit"), "Simple Journal Entry Created");
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
        test.log("Simple G/L Journal Entry Posted sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Posting Simple G/L Journal Entry:"+e);
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
        
    }
    //---------Journal Entry Verification-----
    
    var bool = journalVerification(/Simple Journal Entry Created/,SmpleDocnum);
    if(bool == 1)
    {
        test.pass("Simple G/L Journal Entry " +SmpleDocnum + " has a Journal entry");
    }
    else
        test.fail("No Journal entry is made on the Posting Simple G/L Journal Entry " +SmpleDocnum);
    //---Verifying the Posted Status for Simple G/L Journal Entry Posted in Journal-----------
    
    Jnum[0] =journalStatus(SmpleDocnum,"No","before");
    
    //----Post Journal to Ledger------
    
    var bool = postJournal2Ledger("G/L");
    if(bool ==1)
        test.pass("Entries of 'Simple G/L Journal Entry' are posted from Journal to Ledger sucessfully");
    else
        test.fail("Error in posting the entries of 'Simple G/L Journal Entry' from Journal to Ledger");
    
    
    //----Gl Verification----------
    var source1 = ["G/L"];
    var bool = glTransactions1(Jnum,"Journal Posting", source1);
    if(bool ==1)
        if(bool ==1)
        {
        test.pass("Simple G/L Journal Entry  sucessfully made entries in General Ledger Transactions");
    }
    else
        test.fail("No entries made  in General Ledger Transactions for Simple G/L Journal Entry");
    
    snooze(0.5);  
    //---Create Series G/L Journal Entry------------
    var SrsDocnum = "Series";
    var srsamnt ="110";
    var Jnum = [];
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Series..."));
        snooze(1);
        type(waitForObject(":_docnumber_XLineEdit"),SrsDocnum );
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
        //--Debit---
        snooze(1);
        waitForObject(":General Ledger Transaction Series Item.Debit_QRadioButton");
        if(!findObject(":General Ledger Transaction Series Item.Debit_QRadioButton").checked)
            clickButton(":General Ledger Transaction Series Item.Debit_QRadioButton");
        type(waitForObject(":General Ledger Transaction Series Item.XLineEdit_XLineEdit"),srsamnt);
        type(waitForObject(":General Ledger Transaction Series Item.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");   nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":General Ledger Transaction Series Item.Cancel_QPushButton"));
        //--Credit--
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
        snooze(1);
        waitForObject(":General Ledger Transaction Series Item.Credit_QRadioButton");
        if(!findObject(":General Ledger Transaction Series Item.Credit_QRadioButton").checked)
            clickButton(":General Ledger Transaction Series Item.Credit_QRadioButton");
        type(waitForObject(":General Ledger Transaction Series Item.XLineEdit_XLineEdit"),srsamnt);
        type(waitForObject(":General Ledger Transaction Series Item.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1020-01");    nativeType("<Tab>");
        clickButton(waitForObject(":General Ledger Transaction Series Item.Save_QPushButton"));
        clickButton(waitForObject(":General Ledger Transaction Series Item.Cancel_QPushButton"));
        type(waitForObject(":_notes_XTextEdit"), "Series Journal Entry Created");
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        test.log("Series G/L JOurnal Entry created sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Creating the Series G/L Journal Entry:"+e);
        if(object.exists(":Series G/L Journal Entry.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Series G/L Journal Entry.Cancel_QPushButton"));
        }
    }
    //---Post Series G/L journal Created------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "List Unposted..."));
        if(OS.name != "Darwin")
        {
            type(waitForObject(":xTuple ERP:*.Journal Entry_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.General Ledger_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Accounting_QMenu"), "<Esc>");
        }
        //---Verify for the Series G/L Entry Created---------
        snooze(2);
        waitForObject(":_glseries_XTreeWidget");
        
        if(object.exists("{column='3' container=':_glseries_XTreeWidget' text='"+SrsDocnum+"' type='QModelIndex'}"))
            test.pass("Series G/L Journal Entry" + SrsDocnum +"Created Sucessfully:");
        else
            test.fail("Error in Creating Series G/L Journal Entry" + SrsDocnum);
        openItemContextMenu(":_glseries_XTreeWidget",SrsDocnum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post G/L Series..."));
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Series G/L Journal entry Created verified sucessfully");
    }
    catch(e)
    {
        test.fail("Error in verifying  Series G/L Journal entry Created:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //----Verify for the Series G/L Journal Entry after Posting-------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "List Unposted..."));
        if(OS.name != "Darwin")
        {
            type(waitForObject(":xTuple ERP:*.Journal Entry_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.General Ledger_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Accounting_QMenu"), "<Esc>");
        }
        snooze(1);
        waitForObject(":_glseries_XTreeWidget");
        
        if(object.exists("{column='3' container=':_glseries_XTreeWidget' text='"+SrsDocnum+"' type='QModelIndex'}"))
        {
            flag = 0;
            test.fail("Error in Creating Series G/L Journal Entry" + SrsDocnum);
        }
        else
        {
            flag =1;
            test.pass("Series G/L Journal Entry" + SrsDocnum +"Created Sucessfully");
        }
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Series G/L Journal entry posted Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Posting  Series G/L Journal entry:"+e);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }
    
    if(flag == 1)
    {
        //---------Journal Entry Verification-----
        
        var bool = journalVerification(/Series Journal Entry Created/,SrsDocnum);
        if(bool == 1)
        {
            test.pass("Series  G/L Journal Entry " + SrsDocnum + " has a Journal entry");
        }
        else
            test.fail("No Journal entry is made on the Posting Series G/L Journal Entry " +SrsDocnum);
        
        //---Verifying the Posted Status for Series G/L in Journal------------
        
        Jnum[0] =journalStatus(SrsDocnum,"No","before");
        
        //----Post Journal to Ledger------
        
        var bool = postJournal2Ledger("G/L");
        if(bool ==1)
            test.pass("Entries of Series G/L Journal Entry are posted from Journal to Ledger sucessfully");
        else
            test.fail("Error in posting the entries of Series G/L Journal Entry from Journal to Ledger");
        
        //----Verify the Posted status for TO stock Issue in Journal-----
        
        Jnum[0] =journalStatus(SrsDocnum,"Yes","after");
        
        //----Gl Verification----------
        var source1 = ["G/L"];
        var bool = glTransactions1(Jnum,"Journal Posting", source1);
        if(bool ==1)
        {
            test.pass("Series G/L Journal Entry sucessfully made entries in General Ledger Transactions");
        }
        else
            test.fail("No entries made  in  General Ledger Transactions for Series G/L Journal Entry");
    }//Verifying Series G/L
    else
    {
        test.fail("Fail to post Series G/L Journal entry");
    }
    snooze(0.5);  
    
    //------Create Standard Journals -----
    var Stdgrpamnt = "1200";
    var Jnum = [];
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "List..."));
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
        snooze(1);
        type(waitForObject(":Standard Journal._name_XLineEdit"), "Standard Journal Entry");
        type(waitForObject(":Standard Journal._descrip_XLineEdit"), "Standard Journal Entry");
        try
        {
            clickButton(waitForObject(":Standard Journal.New_QPushButton"));
            type(waitForObject(":Standard Journal Item.XLineEdit_XLineEdit"), "1200");
            type(waitForObject(":Standard Journal Item._notes_XTextEdit"), "Standard Journal Entry Created");
            type(waitForObject(":Standard Journal Item.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            test.log("Transactions related to Debit for Standard Journal Item created sucessfully:");
        }
        catch(e)
        {
            test.fail("Error in creating Transactions related to Debit for Standard Journal Item:"+e);
        }
        try
        {
            snooze(0.5);
            clickButton(waitForObject(":Standard Journal.New_QPushButton"));
            snooze(1);
            clickButton(waitForObject(":Sense.Credit_QRadioButton"));
            type(waitForObject(":Standard Journal Item.XLineEdit_XLineEdit"), "1200");
            type(waitForObject(":Standard Journal Item.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1010-01");
            type(waitForObject(":Standard Journal Item._notes_XTextEdit"), "Standard Journal Entry Created");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            test.log("Transactions related to Credit for Standard Journal Item created sucessfully:");
        }
        catch(e)
        {
            test.fail("Error in creating Transactions related to Credit for Standard Journal Item:"+e);
        }
        type(waitForObject(":Standard Journal._notes_XTextEdit"), "Standard Journal Entry Created");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Standard Journal Created Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Creating the Standard Journal :"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //----Post Standard Journal to Journal-------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "Post..."));
        clickItem(":_stdjrnl_XComboBox", "Standard Journal Entry",0, 0, 5, Qt.LeftButton); // Check out here once ..only one date....
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        clickButton(waitForObject(":Series G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Standard Journal posted sucessfully to Journal:");
    }
    catch(e)
    {
        
        test.fail("Error in Posting Standard Journal to Journal:"+e);
    }
    //---------Journal Entry Verification-----
    var gl ="Standard Journal Entry";
    var bool = journalVerification(/Standard Journal Entry Created/,gl);
    if(bool == 1)
    {
        test.pass("Standard Journal has a Journal entry for Posting");
    }
    else
        test.fail("No Journal entry is made for the Posting Standard Journal  ");
    //---Verifying the Posted Status for Standard Journal Posted in Journal------------
    
    Jnum[0] =journalStatus(gl,"No","before");
    
    //----Post Journal to Ledger------
    
    var bool = postJournal2Ledger("G/L");
    if(bool ==1)
        test.pass("Standard Journal entries are posted sucessfully from Journal to Ledger");
    else
        test.fail("Error in posting the entries of Standard Journals from Journal to Ledger");
    //----Gl Verification----------
    var source1 = ["G/L"];
    var bool = glTransactions1(Jnum,"Journal Posting", source1);
    if(bool ==1)
    {
        test.pass("Standard Journals sucessfully made entries in General Ledger Transactions:");
    }
    else
        test.fail("No entries made  in General Ledger Transactions for Standard Journals:");
    
    //----Create  Standard Journal Group ----------
    var Jnum = [];
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "List Groups..."));
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
        type(waitForObject(":GroupBox1._name_XLineEdit"), "Standard Journal Group");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"),"Standard Journal Group");
        clickButton(waitForObject(":Standard Journal Group.New_QPushButton"));
        waitForObject(":Standard Journal Group Item._stdjrnl_XComboBox");
        clickItem(":Standard Journal Group Item._stdjrnl_XComboBox","Standard Journal Entry",0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":Standard Journal Group Item.XDateEdit_XDateEdit").clear();
        type(":Standard Journal Group Item.XDateEdit_XDateEdit", "+1");
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        test.log("Standard Journal Group Created Sucessfully:");
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Standard Journal Group Created Sucessfully:");
    }
    catch(e)
    {
        test.fail("Error in Creating Standard Journal Group:"+e)
                if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    //---Post Standard Journal Group to Journal--------------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Standard Journals"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Standard Journals_QMenu", "Post Group..."));
        waitForObjectItem(":_stdjrnlgrp_XComboBox", "Standard Journal Group")
                clickItem(":_stdjrnlgrp_XComboBox", "Standard Journal Group",0, 0, 5, Qt.LeftButton);
        type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        clickButton(waitForObject(":Series G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Standard Journal Group Posted Sucessfully:");
    }
    catch(e)
    {
        test.fail("Error in Posting Standard Journal Group:"+e);
    }
    
    //---------Journal Entry Verification-----
    var gl ="Standard Journal Entry";
    var bool = journalVerification(/Standard Journal Entry Created/,gl);
    if(bool == 1)
    {
        test.pass("Standard Journal has a Journal entry for Posting");
    }
    else
        test.fail("No Journal entry is made for the Posting Standard Journal");
    
    //----Post Journal to Ledger------
    
    var bool = postJournal2Ledger("G/L");
    if(bool ==1)
        test.pass("Standard Journal Group entries are posted from Journal to Ledger sucessfully");
    else
        test.fail("Error in posting Standard Journal group from Journal to Ledger");
    
    //----Verify the Posted status for Standard Journal  Group Posted in Journal-----
    
    Jnum[0] =journalStatus(gl,"Yes","after");
    
    //----Gl Verification----------
    var source1 = ["G/L"];
    var bool = glTransactions1(Jnum,"Journal Posting", source1);
    if(bool ==1)
    {
        test.pass("Standard Journal Group  sucessfully made entries in General Ledger Transactions:");
    }
    else
        test.fail("No entries made  in General Ledger Transactions for Standard Journal Group:");
    
    //--Post the Journal to Ledger with  'GL distribution date' mentioned  in past-----
    
    //-----------Create and Post Simple G/L Journal Entry---------------
    
    var SmpleDocnum = "SJL1";
    var smpleamnt = "100";
    var Jnum = [];
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), smpleamnt);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        snooze(0.5);
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"),SmpleDocnum);
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1010-01");
        type(waitForObject(":frame._notes_XTextEdit"), "Simple Journal Entry Created");
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
        test.log("Simple G/L Journal Entry Posted sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Posting Simple G/L Journal Entry:"+e);
        if(object.exists(":Simple G/L Journal Entry.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
        }
    }
    
    
    //---------Journal Entry Verification-----
    
    var bool = journalVerification(/Simple Journal Entry Created/,SmpleDocnum);
    if(bool == 1)
        
        test.pass("Series  G/L Journal Entry " + SmpleDocnum + " has a Journal entry for Posting");
    
    else
        test.fail("No Journal entry is made for the Posting Series G/L Journal Entry " +SmpleDocnum);
    
    //---Verifying the Posted Status for Simple GL posted in Journal------------
    var JPNum =journalStatus(SmpleDocnum,"No","before");
    
    //--Verify the entries posted from Journal to General Ledger with Distribution Date in Past----
    try
    {
        var Source = "G/L";
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Post Journals to Ledger..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":Transaction Dates.XDateEdit_XDateEdit").clear();
        type(":Transaction Dates.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        //----Set 'GL distribution date' in the past  ------------
        waitForObject(":General Ledger Distribution.XDateEdit_XDateEdit").clear();
        type(":General Ledger Distribution.XDateEdit_XDateEdit", "-1");
        snooze(0.5);
        nativeType("<Tab>");
        openItemContextMenu(waitForObject(":_frame._sources_XTreeWidget"), Source , 5, 5, Qt.LeftButton);
        snooze(0.5);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post"));
        clickButton(waitForObject(":xTuple ERP:*.Cancel_QPushButton"));
        test.log("'Simple G/L Journal Entry' Sucessfully posted with GL Distribution date mentioned in past");
        
    }
    catch(e)
    {
        test.fail("Error in Posting 'Simple G/L Journal Entry' with GL distribution date mentioned as Past:"+e);
    }
    
    
    //---Verifying General Ledger entries  with Past date ----------
    try
    {
        var pat = "Journal Posting";
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
        
        //---Specify GL Distribution Date in Past---
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit","-1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit","-1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton"); 
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit",JPNum);   
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        
        waitForObject(":_list_XTreeWidget_3")
                var widget = findObject(":_list_XTreeWidget_3");
        var obj_TreeTopLevelItem =widget.topLevelItem(0);
        var sNameOfRootItem1 = obj_TreeTopLevelItem.text(3);
        var sNameOfRootItem2 = obj_TreeTopLevelItem.text(5);
        
        
        if(sNameOfRootItem1 =="JP" && sNameOfRootItem2 == pat)
        {
            test.pass("Verified GL Transactions sucessfully for 'Simple G/L Journal Entry' posted in Past date");
        }
        else
        {
            test.fail("Error in Verifying GL Transactions  for 'Simple G/L Journal Entry' posted in Past date");
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        test.log("Entries made for 'Simple G/L Journal Entry' with date mentioned in past verified sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Verifying GL Transactions for 'Simple G/L Journal Entry' posted in past:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    snooze(0.5);
    
    
    
    //--Post the Journal to Ledger  with a 'GL distribution date' mentioneed in Future-----
    
    //---Create and Post Simple GL entry---
    var SmpleDocnum = "SJLF1";
    var smpleamnt = "100";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), smpleamnt);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"),SmpleDocnum);
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1010-01");
        type(waitForObject(":frame._notes_XTextEdit"), "Simple Journal Entry Created");
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
        test.log("Simple G/L Journal Entry Posted sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Posting Simple G/L Journal Entry:"+e);
        if(object.exists(":Simple G/L Journal Entry.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
        }
    }
    
    
    //---------Journal Entry Verification-----
    
    var bool = journalVerification(/Simple Journal Entry Created/,SmpleDocnum);
    if(bool == 1)
    {
        test.pass("Simple  G/L Journal Entry " + SmpleDocnum + " has a Journal entry for Posting");
    }
    else
        test.fail("No Journal entry is made for the Posting Series G/L Journal Entry " +SmpleDocnum);
    
    //---Verifying the Posted Status for Simple GL posted in Journal------------
    JFNum =journalStatus(SmpleDocnum,"No","before");
    test.log(JFNum);
    
    snooze(0.5);
    //--Post journal To Ledger with Distribution Date Mentioned in Future----
    try
    {
        var Source = "G/L";
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Post Journals to Ledger..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(1);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Transaction Dates.XDateEdit_XDateEdit").clear();
        type(":Transaction Dates.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        //----Set 'GL distribution date' in the Future  ------------
        waitForObject(":General Ledger Distribution.XDateEdit_XDateEdit").clear();
        type(":General Ledger Distribution.XDateEdit_XDateEdit", "+1");
        snooze(0.5);
        nativeType("<Tab>");
        openItemContextMenu(waitForObject(":_frame._sources_XTreeWidget"), Source , 5, 5, Qt.LeftButton);
        snooze(0.5);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post"));
        clickButton(waitForObject(":xTuple ERP:*.Cancel_QPushButton"));
        test.log("Sucessfully posted 'Simple G/L Journal Entry' with GL Distribution date mentioned in Future");
        
    }
    catch(e)
    {
        test.fail("Error in Posting 'Simple G/L Journal Entry' with GL distribution date mentioned as Future:"+e);
    }
    
    //---Verifying entries in  GL with Future date ----------
    try
    {
        var pat = "Journal Posting";
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
        
        //---Specify GLDistribution Date in Past---
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit","+1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit","+1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton"); 
        snooze(0.5);
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit",JFNum);   
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(1);
        waitForObject(":_list_XTreeWidget_3")
                var widget = findObject(":_list_XTreeWidget_3");
        var obj_TreeTopLevelItem =widget.topLevelItem(0);
        var sNameOfRootItem1 = obj_TreeTopLevelItem.text(3);
        var sNameOfRootItem2 = obj_TreeTopLevelItem.text(5);
        
        
        if((sNameOfRootItem1 =="JP") && (sNameOfRootItem2 == pat))
        {
            test.pass("Verified GL Transactions sucessfully for 'Simple G/L Journal Entry' posted in Future date");
        }
        else
        {
            test.fail("Error in Verifying GL Transactions for 'Simple G/L Journal Entry' posted in Future Date ");
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        
    }
    catch(e)
    {
        test.fail("Error in Verifying GL Transactions for  Posting 'Simple G/L Journal Entry' with date mentioned in Future:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    snooze(0.5);
    
    
    
    //--Create Chart Of A/C----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Account"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Account_QMenu", "Chart of Accounts..."));
        snooze(0.5);
        COA("01","01","8585","01","Journal A/C","Asset","CA-Cash Assets");
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("New Chart of A/C created Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Creating New Chart of Account:"+e);
    }
    //--Create New Bank Account and Assign chart of Account-----
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Accounting Mappings.Bank Accounts");
        clickItem(":Setup._tree_XTreeWidget", "Accounting Mappings.Bank Accounts", 39, 6, 0, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
        snooze(1);
        type(waitForObject(":_name_XLineEdit"), "INBank");
        nativeType("<Tab>");
        type(waitForObject(":_stack._description_XLineEdit"), "IBBank");
        type(waitForObject(":_bankName_XLineEdit"), "INO Bank");
        type(waitForObject(":_accountNumber_XLineEdit"), "12458");
        snooze(0.5);
        if(!findObject(":_useGroup.Used in Accounts Payable_QCheckBox").checked)
            clickButton(":_useGroup.Used in Accounts Payable_QCheckBox");
        type(waitForObject(":_useGroup._nextCheckNum_XLineEdit"), "134");
        clickItem(":_useGroup._form_XComboBox","EBANKCHECK",0, 0, 5, Qt.LeftButton);
        type(waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-8585-01");
        nativeType("<Tab>");                
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    }
    catch(e)
    {
        test.fail("Error in creating New Bank Account:"+e);
        if(object.exists(":Cash Receipt.Save_QPushButton_3"))
        {
            clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        }
    }
    
    //-----------Create and Post two/more entries from Journal to Ledger at same time---------------
    //---Simple G/L Journal Entry1-----
    var Jnum = [];
    var SmpleDocnum1 = "SimpleEntry1";
    var smpleamnt = "100";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), smpleamnt);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        snooze(1);
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        snooze(0.5);
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"),SmpleDocnum1);
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-8585-01");
        type(waitForObject(":frame._notes_XTextEdit"), "Simple Journal Entry Created");
        snooze(0.5);
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
        test.log("Simple G/L Journal Entry Posted sucessfully:");
    }
    catch(e)
    {
        test.fail("Error in Posting Simple G/L Journal Entry:"+e);
        if(object.exists(":Simple G/L Journal Entry.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
        }
    }
    //-----------Inventory Adjustment and post to Journal-------
    var Adjnum = "Invadj1";
    var Adjamnt = "800";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment..."));
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), "YTRUCK1");
        nativeType("<Tab>");
        type(waitForObject(":_qty_XLineEdit"),Adjamnt);
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        if(!findObject(":_adjustmentTypeGroup.Absolute_QRadioButton").checked)
        {
            clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
            
        }
        type(waitForObject(":_documentNum_XLineEdit"),Adjnum);
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        test.log("Inventory adjusted sucessfully:");
    }
    catch(e)
    {
        test.fail("Error in Adjusting the Inventory of item:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
    }
    //---Verifying the Posted Status for Simple GL posted in Journal------------
    //----For Entry1---
    var Jnum1 =journalStatus(SmpleDocnum1,"No","before");
    
    //--For Entry2------
    var Jnum2 =journalStatus(Adjnum,"No","before");
    //--Post both the entries at a time from journal To Ledger---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Post Journals to Ledger..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":Transaction Dates.XDateEdit_XDateEdit").clear();
        type(":Transaction Dates.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":General Ledger Distribution.XDateEdit_XDateEdit").clear();
        type(":General Ledger Distribution.XDateEdit_XDateEdit", "0");
        snooze(0.5);
        nativeType("<Tab>");
        clickButton(waitForObject(":xTuple ERP:*.Select All_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        clickButton(waitForObject(":xTuple ERP:*.Cancel_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error in Posting Entries from  Journal to Ledger "+e);
    }
    
    //---Verifying the Posted Status for Simple GL posted in Journal------------
    //----For Entry1---
    
    var Jnum1 =journalStatus(SmpleDocnum1,"Yes","before");
    Jnum[0] = Jnum1+1;
    
    
    //--For Entry2------
    var Jnum2 =journalStatus(Adjnum,"Yes","before");
    Jnum[1] = ++Jnum2;
    
    //----Gl Verification----------
    //----For Entry1----
    //----Gl Verification----------
    var source1 = ["G/L", "I/M"];
    snooze(0.5);
    var bool = glTransactions1(Jnum,"Journal Posting", source1);
    if(bool ==1)
    {
        test.pass("Simple G/L Journal Entry  and Inventory Adjustment sucessfully made entries in General Ledger Transactions for");
    }
    else
        test.fail("No entries made  in   General Ledger Transactions for Simple G/L Journal Entry and and Inventory Adjustment");
    
    
    
    //----  Accounting Verifications -------
    
    //---Create Simple Journal Entry-----
    var SmpleDocnum = "SmpJrl";
    var smpleamnt = "100"
                    try
                    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Journal Entry"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Journal Entry_QMenu", "Simple..."));
        type(waitForObject(":Simple G/L Journal Entry.XLineEdit_XLineEdit"), smpleamnt);
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit","0");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"),SmpleDocnum);
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
        nativeType("<Tab>");
        type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-8585-01");
        nativeType("<Tab>");
        type(waitForObject(":frame._notes_XTextEdit"), "Simple Journal Entry Created");
        clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
        clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
        test.log("Simple G/L Journal Entry Posted sucessfully:");
    }
    catch(e)
    {
        test.fail("Error in Posting Simple G/L Journal Entry:"+e);
        if(object.exists(":Simple G/L Journal Entry.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Simple G/L Journal Entry.Cancel_QPushButton"));
        }
    }
    
    //----View Trail Balance Before Journals posted to Ledger---
    var sNameOfRootItem1;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Financial Statements"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Financial Statements_QMenu", "View Trial Balances..."));
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox", "GL Account", 0,0,5, Qt.LeftButton);
        type(waitForObject(":_filterGroup.VirtualClusterLineEdit_GLClusterLineEdit"),"01-01-8585-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        waitForObject(":_list_XTreeWidget_3"); 
        var widget = findObject(":_list_XTreeWidget_3");
        var obj_TreeTopLevelItem =widget.topLevelItem(0);
        sNameOfRootItem1 = parseInt(obj_TreeTopLevelItem.text(7));
        
        if(sNameOfRootItem1 !=(sNameOfRootItem1+parseInt(smpleamnt)))
        {
            test.pass("Trail Balance for the Chrt of Account selected verified sucessfully before Misc Check is posted:");
        }
        else
            test.fail("Error in verifying the Trail Balance for the Chart of Account selected before Misc Check is posted:");
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in Viewing Trail Balance:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
    }
    
    
    //---Post Journals To Ledger----
    
    var bool = postJournal2Ledger("G/L");
    if(bool ==1)
        test.pass("Entries of Simple G/L Journal Entry are posted from Journal to Ledger sucessfully");
    else
        test.fail("Error in posting the entries of 'Simple G/L Journal Entry' from Journal to Ledger");
    
    //----View Trail Balance after Journals posted to Ledger---
    var sNameOfRootItem2
            try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Financial Statements"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Financial Statements_QMenu", "View Trial Balances..."));
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox", "GL Account", 0,0,5, Qt.LeftButton);
        type(waitForObject(":_filterGroup.VirtualClusterLineEdit_GLClusterLineEdit"),"01-01-8585-01");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        waitForObject(":_list_XTreeWidget_3"); 
        var widget = findObject(":_list_XTreeWidget_3");
        var obj_TreeTopLevelItem =widget.topLevelItem(0);
        sNameOfRootItem2 = parseInt(obj_TreeTopLevelItem.text(7));
        
        if(sNameOfRootItem2 ==(sNameOfRootItem1+parseInt(smpleamnt)))
        {
            test.pass("Trail Balance for the Chrt of Account selected verified sucessfully after Simple G/L Journal Entry is posted");
        }
        else
            test.fail("Error in verifying the Trail Balance for the Chart of Account selected after Simple G/L Journal Entry is posted");
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in Viewing Trail Balance:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
    }
    
}
