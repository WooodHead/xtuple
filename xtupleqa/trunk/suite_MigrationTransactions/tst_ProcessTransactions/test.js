function main()
{
    
    //---User role -----
    var userrole="CONFIGURE";
   
    
    //--------Login into Appl----------
    var set = testData.dataset("login.tsv");
    var url, db, port, pwd,realname,username;
    db=pwd=port=url=realname=username="";
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
       
    waitForObject(":Log In.Options_QPushButton");
    clickButton(":Log In.Options_QPushButton");
    waitForObject(":_server_QLineEdit");
    if(findObject(":_server_QLineEdit").text!= url)
    {findObject(":_server_QLineEdit").text=url;
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
    clickButton(":Login Options.Save_QPushButton");
    waitForObject(":_username_QLineEdit");    
    type(":_username_QLineEdit", username);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", pwd);
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    test.log("Logged in Application");
    waitForObject(":xTuple ERP:*.Products Tools_QWorkspace");

  
    
    //-------Convert Quote to Sales Order-------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Quote");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Quote");
    waitForObjectItem(":xTuple ERP:*.Quote_QMenu", "List...");
    activateItem(":xTuple ERP:*.Quote_QMenu", "List...");
    waitForObject(":_quote_XTreeWidget");
    clickItem(":_quote_XTreeWidget", "40011", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Convert_QPushButton");
    clickButton(":frame.Convert_QPushButton");
    waitForObject(":xTuple ERP:*_QPushButton");
    clickButton(":xTuple ERP:*_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_4");
    clickButton(":Sales Order.Save_QPushButton_4");
    waitForObject(":List Quotes.Close_QPushButton");
    clickButton(":List Quotes.Close_QPushButton");

    //----Issue stock to Shipping and Ship Order----        
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50194", 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Select for Billing_QCheckBox").checked==true)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
        clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
        clickButton(":groupBox.Print Packing List_XCheckBox");
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");

    //----Ship Order----        
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50195", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
        waitForObject(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Select for Billing_QCheckBox").checked==true)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked == true)
        clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    if(findObject(":groupBox.Print Packing List_XCheckBox").checked == true)
        clickButton(":groupBox.Print Packing List_XCheckBox");

    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    
    //----------Select Order for Billing--------
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
    doubleClickItem(":Select Order for Billing._so_XTreeWidget", "50196", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_lineitemsTab.Select Balance_QPushButton");
    clickButton(":_lineitemsTab.Select Balance_QPushButton");
    waitForObject(":Select Order for Billing.Save_QPushButton");
    clickButton(":Select Order for Billing.Save_QPushButton");
    waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");

    
    //-------Post Billing Selections-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Billing");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Billing");
    waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu_2", "Post Billing Selections...");
    activateItem(":xTuple ERP:*.Invoice_QMenu_2", "Post Billing Selections...");
    waitForObject(":Post Billing Selections.Post_QPushButton");
    clickButton(":Post Billing Selections.Post_QPushButton");
    
    
    //----Post Invoice---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
  
    waitForObject(":_invchead_XTreeWidget");
    openItemContextMenu(":_invchead_XTreeWidget", "50198", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
    waitForObject(":List Unposted Invoices.Alternate Date:_QRadioButton");
    clickButton(":List Unposted Invoices.Alternate Date:_QRadioButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");



    //--------Create Cash receipt and apply-----------
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
    clickItem(":_applicationsTab._aropen_XTreeWidget", "50199", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_applicationsTab.Apply_QPushButton");
    clickButton(":_applicationsTab.Apply_QPushButton");
    waitForObject(":Cash Receipt_XLineEdit");
    var amt = findObject(":Cash Receipt_XLineEdit_2").text;
    type(":Cash Receipt_XLineEdit", amt);
    waitForObject(":Cash Receipt.Save_QPushButton");
    clickButton(":Cash Receipt.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit_2");
    type(":_amountGroup_XLineEdit_2", amt);
    waitForObject(":Cash Receipt.Save_QPushButton_2");
    clickButton(":Cash Receipt.Save_QPushButton_2");

  	  
    //---Release Planned Order---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
    activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");

    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    waitForObject(":frame._planord_XTreeWidget");
    openItemContextMenu(":frame._planord_XTreeWidget", "90314-1", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Release Order...");
    waitForObject(":Planned Orders by Planner Code.Create_QPushButton");
    clickButton(":Planned Orders by Planner Code.Create_QPushButton");
  
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
  
  
  
    //------Release Purchase Request-------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
    waitForObjectItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code...");
    
    waitForObject(":Purchase Requests by Planner Code.Query_QPushButton");
    clickButton(":Purchase Requests by Planner Code.Query_QPushButton");
    waitForObject(":Purchase Requests by Planner Code._pr_XTreeWidget");
    openItemContextMenu(":Purchase Requests by Planner Code._pr_XTreeWidget", "10054", 5, 5, 0);
    waitForObject(":xTuple ERP:*._menu_QMenu");
    activateItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
    waitForObject(":_frame._itemsrc_XTreeWidget");
    doubleClickItem(":_frame._itemsrc_XTreeWidget", "Toy Parts Inc\\.", 5, 5, 0, Qt.LeftButton);
    snooze(2);
    if(object.exists(":An Open Purchase Order Exists.An Open Purchase Order already exists for this Vendor.\nWould you like to use this Purchase Order?\nClick Yes to use the existing Purchase Order otherwise a new one will be created._QLabel"))
        clickButton(":An Open Purchase Order Exists.Yes_QPushButton");
    waitForObject(":Purchase Order Item.Save_QPushButton");
    clickButton(":Purchase Order Item.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    
    waitForObject(":Purchase Requests by Planner Code.Close_QPushButton");
    clickButton(":Purchase Requests by Planner Code.Close_QPushButton");    
  
    
    //------List Unposted Purchase Order------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    waitForObjectItem(":List Unposted Purchase Orders._pohead_XTreeWidget", "20064");
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", "20064", 5, 5, 1, Qt.LeftButton);
    openItemContextMenu(":List Unposted Purchase Orders._pohead_XTreeWidget", "20064", 5, 5, 0);
    waitForObject(":List Unposted Purchase Orders.Post P/O_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post P/O_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");

    //----Create Receipt----
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
    doubleClickItem(":_listTab_XTreeWidget_5", "20065", 5,5, 0, Qt.LeftButton);
    
    waitForObject(":Enter Order Receipts.Receive All_QPushButton");
    clickButton(":Enter Order Receipts.Receive All_QPushButton");
  
    waitForObject(":Enter Order Receipts.Save_QPushButton");
    clickButton(":Enter Order Receipts.Save_QPushButton");
    waitForObject(":_recv_XTreeWidget");
    clickItem(":_recv_XTreeWidget", "20065", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Unposted Receipts.Post_QPushButton");
    clickButton(":List Unposted Receipts.Post_QPushButton");
    waitForObject(":List Unposted Receipts.Alternate Date:_QRadioButton");
    clickButton(":List Unposted Receipts.Alternate Date:_QRadioButton");
    waitForObject(":List Unposted Receipts.Continue_QPushButton");
    clickButton(":List Unposted Receipts.Continue_QPushButton");

    waitForObject(":List Unposted Receipts.Close_QPushButton");
    clickButton(":List Unposted Receipts.Close_QPushButton");

    
    //----Create Receipt----
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
    doubleClickItem(":_listTab_XTreeWidget_5", "20065", 5,5, 0, Qt.LeftButton);
    
    waitForObject(":Enter Order Receipts.Receive All_QPushButton");
    clickButton(":Enter Order Receipts.Receive All_QPushButton");
  
    waitForObject(":Enter Order Receipts.Save_QPushButton");
    clickButton(":Enter Order Receipts.Save_QPushButton");
    waitForObject(":List Unposted Receipts.Close_QPushButton");
    clickButton(":List Unposted Receipts.Close_QPushButton");

    
    //-----Post Receipt------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
    waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
    activateItem(":xTuple ERP:*.Receiving_QMenu", "List Unposted Receipts...");
    waitForObject(":List Unposted Receipts.List Unposted Receipts_QWorkspaceTitleBar");
    waitForObject(":_recv_XTreeWidget");
    clickItem(":_recv_XTreeWidget", "20066", 5, 5, 1, Qt.LeftButton);
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


    //----Post Invoice---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted...");
  
    waitForObject(":_invchead_XTreeWidget");
    clickItem(":_invchead_XTreeWidget", "60081", 5, 5, 1, Qt.LeftButton);
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

    
    
    //--------Create Cash receipt and apply-----------
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
    waitForObjectItem(":_applicationsTab._aropen_XTreeWidget", "60082");
    clickItem(":_applicationsTab._aropen_XTreeWidget", "60082", 5, 5, 1, Qt.LeftButton);    
    waitForObject(":_applicationsTab.Apply_QPushButton");
    clickButton(":_applicationsTab.Apply_QPushButton");
    waitForObject(":Cash Receipt_XLineEdit");
    var amt = findObject(":Cash Receipt_XLineEdit_2").text;
    type(":Cash Receipt_XLineEdit", amt);
    waitForObject(":Cash Receipt.Save_QPushButton");
    clickButton(":Cash Receipt.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit_2");
    type(":_amountGroup_XLineEdit_2", amt);
    waitForObject(":Cash Receipt.Save_QPushButton_2");
    clickButton(":Cash Receipt.Save_QPushButton_2");
    snooze(0.5);
    if(object.exists(":Cash Receipt.Yes_QPushButton"))
        clickButton(":Cash Receipt.Yes_QPushButton");


    //-------Check entry in Invoice Register--------    
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
    dformat+="\.60083\_1";
    clickItem(":frame._gltrans_XTreeWidget", dformat, 5, 5, 1, Qt.LeftButton);
    waitForObject(":Invoice Register.Close_QPushButton");
    clickButton(":Invoice Register.Close_QPushButton");


    //-------Post Vouchers---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");

    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    doubleClickItem(":List Open Vouchers._vohead_XTreeWidget", "30070", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_poitems._poitem_XTreeWidget");
    clickItem(":_poitems._poitem_XTreeWidget", "Received", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_poitems.Distribute Line_QPushButton");
    clickButton(":_poitems.Distribute Line_QPushButton");
    waitForObject(":_amount_XLineEdit");
    type(":_amount_XLineEdit", findObject(":_amount_XLineEdit_2").text);
    waitForObject(":Voucher.Save_QPushButton");
    clickButton(":Voucher.Save_QPushButton");
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    clickItem(":List Open Vouchers._vohead_XTreeWidget", "30070", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Alternate Date:_QRadioButton");
    clickButton(":List Open Vouchers.Alternate Date:_QRadioButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");


    
    //--------Post Check------------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "View Check Run...");
    
    waitForObject(":_frame._check_XTreeWidget");
    clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_frame.Print_QPushButton");
    sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 5, 5, Qt.LeftButton, 0); 	waitForObjectItem(":_QMenu", "Check Run...");
    activateItem(":_QMenu", "Check Run...");
    waitForObject(":View Check Run.Create ACH File_QPushButton");
    clickButton(":View Check Run.Create ACH File_QPushButton");
    waitForObject(":xTuple ERP:*_QPushButton");
    sendEvent("QMouseEvent", ":xTuple ERP:*_QPushButton", QEvent.MouseButtonPress, 5, 5, Qt.LeftButton, 0);
    waitForObject(":xTuple ERP:*_QPushButton");
    sendEvent("QMouseEvent", ":xTuple ERP:*_QPushButton", QEvent.MouseButtonRelease, 5, 5, Qt.LeftButton, 1);    
    snooze(1);
    if(object.exists(":View Check Run.Yes_QPushButton_2"))
        clickButton(":View Check Run.Yes_QPushButton_2");
    if(object.exists(":View Check Run.Yes_QPushButton_2"))
        clickButton(":View Check Run.Yes_QPushButton_2");
    
    waitForObject(":View Check Run.Yes_QPushButton_2");
    clickButton(":View Check Run.Yes_QPushButton_2");
    
    waitForObject(":_frame.Post_QPushButton");
    clickButton(":_frame.Post_QPushButton");
    waitForObject(":View Check Run.Post_QPushButton");
    clickButton(":View Check Run.Post_QPushButton");

    waitForObject(":View Check Run.Close_QPushButton");
    clickButton(":View Check Run.Close_QPushButton");
  
    //--------Select Payment--------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Select...");

    waitForObject(":frame._apopen_XTreeWidget");
    clickItem(":frame._apopen_XTreeWidget", "30071", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Select..._QPushButton");
    clickButton(":frame.Select..._QPushButton");
    waitForObjectItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account");
    clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments.Save_QPushButton");
    clickButton(":Select Payments.Save_QPushButton");
    waitForObject(":Select Payments.Close_QPushButton");
    clickButton(":Select Payments.Close_QPushButton");
    


    //----implode work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
    activateItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
    waitForObjectItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
    
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
  
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10061-1", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
    waitForObject(":W/O Schedule by Planner Code.Implode_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Implode_QPushButton");
    
  
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10062-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Explode W/O...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Explode W/O...");
    waitForObject(":W/O Schedule by Planner Code.Explode_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Explode_QPushButton");

    //----Release Work Order---
    waitForObject(":frame._wo_XTreeWidget");
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
    openItemContextMenu(":frame._wo_XTreeWidget", "10063-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release W/O");
    activateItem(":xTuple ERP:*._menu_QMenu", "Release W/O");    

    
    //----Issue Material------
    waitForObject(":frame._wo_XTreeWidget");
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
    openItemContextMenu(":frame._wo_XTreeWidget", "10064-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
    waitForObject(":_componentGroup._itemNumber_XComboBox");
    clickItem(":_componentGroup._itemNumber_XComboBox", "TWHEEL1",5,5,1,Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_3");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_3");
       
    waitForObject(":frame._wo_XTreeWidget");    
    openItemContextMenu(":frame._wo_XTreeWidget", "10064-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
    waitForObject(":_componentGroup._itemNumber_XComboBox");
    clickItem(":_componentGroup._itemNumber_XComboBox", "TBODY1",5,5,1,Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_3");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_3");

    waitForObject(":frame._wo_XTreeWidget");    
    openItemContextMenu(":frame._wo_XTreeWidget", "10064-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
    waitForObject(":_componentGroup._itemNumber_XComboBox");
    clickItem(":_componentGroup._itemNumber_XComboBox", "TKIT1",5,5,1,Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_3");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_3");

    waitForObject(":frame._wo_XTreeWidget");    
    openItemContextMenu(":frame._wo_XTreeWidget", "10064-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Issue Material Item...");
    waitForObject(":_componentGroup._itemNumber_XComboBox");
    clickItem(":_componentGroup._itemNumber_XComboBox", "YPAINT1",5,5,1,Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_3");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_3");
    waitForObject(":W/O Schedule by Planner Code._itemloc_XTreeWidget");
    doubleClickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget", "No",5, 5, 0, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Distribute_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Distribute_QPushButton");  
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");


    //-------Post Operation---------
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10065-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Operations...");
    waitForObject(":_operationGroup._wooper_XComboBox");
    clickItem(":_operationGroup._wooper_XComboBox", "20 - Standard Paint Operation ",0,0,1,Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObject(":W/O Schedule by Planner Code._itemloc_XTreeWidget");
    doubleClickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget","No" ,5, 5, 0, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Distribute_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Distribute_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_2");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_2");


    //---Post Production----
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10066-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
    waitForObject(":_qty_XLineEdit");
    type(":_qty_XLineEdit", "100");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObject(":W/O Schedule by Planner Code._itemloc_XTreeWidget");
    doubleClickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget","No", 5, 5, 0, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Distribute_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Distribute_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_2");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_2");
    
  
    
    //-------Close Work Order-------
    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10067-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
    waitForObject(":_qty_XLineEdit");
    type(":_qty_XLineEdit", "100");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObject(":W/O Schedule by Planner Code._itemloc_XTreeWidget");
    doubleClickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget","No", 5, 5, 0, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Distribute_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Distribute_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_2");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_2");

    waitForObject(":frame._wo_XTreeWidget");
    openItemContextMenu(":frame._wo_XTreeWidget", "10067-1", 5, 5, 0);    
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Close W/O...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Close W/O...");
    waitForObject(":W/O Schedule by Planner Code.Close W/O_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close W/O_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Close Work Order_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close Work Order_QPushButton");

    waitForObject(":W/O Schedule by Planner Code.Close_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close_QPushButton");
    
    

    
}
    
    
