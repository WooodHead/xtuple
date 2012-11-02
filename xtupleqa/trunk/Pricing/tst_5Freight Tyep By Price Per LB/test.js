function main()
{
    
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(6);
    
    //--------------- Set the window to Tab view mode -------------
    
    tabView();
    --Create New Freight Class---
            var frgname = "FREIGHT CLASS2";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
        
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Freight Classes");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Freight Classes", 36, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_freightClass_XLineEdit"), frgname);
        nativeType("<Tab>");
        type(waitForObject(":_description_XLineEdit"), frgname);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        snooze(0.5);
        //---Verifying the Freight Class Created----
        waitForObject(":_stack._freightClass_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._freightClass_XTreeWidget' text='"+frgname+"' type='QModelIndex'}"))
            test.pass("Freight Class creation successful");
        else  
            test.fail("Freight Class creation failed"); 
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error in Creating the Freight Class:"+e);
        if(object.exists(":_stack.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":_stack.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }
    snooze(0.5);
    //---Create New Item---
    var targetitem = "FREIGHT ITEM2";
    copyItem("YTRUCK1",targetitem);
    //----Create New ItemSite-----
    createRIS(targetitem);
    //----Edit the Item to assign Freight class-----
    var prdwgt;
    var frgc = frgname+"-"+frgname;
    try
    {
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        openItemContextMenu(":_list_XTreeWidget_5",targetitem, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        waitForObject(":_itemGroup._freightClass_XComboBox_2");
        clickItem(":_itemGroup._freightClass_XComboBox_2",frgc,0, 0, 5, Qt.LeftButton);   
        snooze(0.5);
        prdwgt =findObject(":_prodWeight_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Item edited sucessfully");
    }
    catch(e)
    {
        test.fail("Error in editing the TargetItem:"+e);
    }
    //---Create New Customer----
    var fcustname4 = "FCUST4";
    var custType = "NORMAL"+"-"+"Normal Domestic Customers";
    createCustomer(custType,fcustname4,"STORE1");
    //----- To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //-----Create Freight Type PricingSchedule using Price Per LB------
    var Fghprcname1 ="FREIGHT PRICING SCHEDULE2 ";
    var FC = Fghprcname1 +" - " +Fghprcname1;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":GroupBox1._name_XLineEdit"),Fghprcname1);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"),Fghprcname1);
        nativeType("<Tab>");
        //----Price per LB for qty brk 0------
        try
        {
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            snooze(0.5);
            if(!findObject(":Type.Freight_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Freight_QRadioButton"));
            }
            if(!findObject(":_typeFreightGroup.Price per LB_QRadioButton").checked)
            {
                clickButton(waitForObject(":_typeFreightGroup.Price per LB_QRadioButton"));
            }
            type(waitForObject(":_qtyBreakFreight_XLineEdit"),"0");
            nativeType("<Tab>");
            snooze(0.5);
            type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2"),"5");
            if(!findObject(":_freightClassGroup.Selected:_QRadioButton").checked)
            {
                clickButton(waitForObject(":_freightClassGroup.Selected:_QRadioButton"));
            }
            waitForObject(":_freightClassGroup._freightClass_XComboBox");
            clickItem(":_freightClassGroup._freightClass_XComboBox",frgc,0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
            test.log("Pricing Schedule Item for Price Per LB on qty break 0 sucessfully created");
        }
        catch(e)
        {
            test.fail("Error in craeting Pricing Schedule Item for Price Per LB on qty break 0 :"+e);
        }
        //----Price per LB for qty brk 100------
        try
        {
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            snooze(0.5);
            if(!findObject(":Type.Freight_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Freight_QRadioButton"));
            }
            if(!findObject(":_typeFreightGroup.Price per LB_QRadioButton").checked)
            {
                clickButton(waitForObject(":_typeFreightGroup.Price per LB_QRadioButton"));
            }
            type(waitForObject(":_qtyBreakFreight_XLineEdit"),"100");
            nativeType("<Tab>");
            snooze(0.5);
            type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2"),"10");
            
            if(!findObject(":_freightClassGroup.Selected:_QRadioButton").checked)
            {
                clickButton(waitForObject(":_freightClassGroup.Selected:_QRadioButton"));
            }
            snooze(0.5);
            waitForObject(":_freightClassGroup._freightClass_XComboBox");
            clickItem(":_freightClassGroup._freightClass_XComboBox",frgc,0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
            test.log("Pricing Schedule Item for Price Per LB on qty break 100 sucessfully created");
        }
        catch(e)
        {
            test.fail("Error in craeting Pricing Schedule Item for Price Per LB on qty break 100 :"+e);
        }
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Freight type Pricing Schedule  using FlatRate created Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in Creating Freight type Pricing Schedule  using FlatRate:"+e);
        if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
        }
        if(object.exists(":Select Order for Billing.Close_QPushButton")) 
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //---Pricing Schedule Assignment for a Customer----
    var prcAssg = Fghprcname1 +" - " +Fghprcname1; 
    prcasscust(fcustname4,prcAssg,Fghprcname1);
    //----Create SalesOrder----
    var qty = "100";
    var fsonum1 = createSalesOrder1(targetitem,qty,fcustname4);
    //----Edit the Sales Order to verify the flat rate applied------
    var famnt;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        openItemContextMenu(":_list_XTreeWidget_5",fsonum1, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        var famnt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Order Edited Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in editing the SalesOrder:"+e);
    }
    var frgamnt=parseInt(famnt);
    test.log("prdwgt "+prdwgt+"");
    test.log("frgamt "+frgamnt+"");
    var result = parseInt(prdwgt*qty*10);
    test.log("result "+result+"")
            //---Verifying the Price Per LB  calculated against the SalesOrder created----
            if(frgamnt == result)
    {
        test.pass("Price per LB freight amount calculated correctly on the SalesOrder");
    }
    else
        test.fail("Error in calculating the Price per LB freight amount on the SalesOrder");
    
    //--Ship the SO Created---
    var shpfamnt =  frgissueStock(fsonum1);
    var shfamnt = parseInt(shpfamnt);
    test.log("prdwgt "+prdwgt+"");
    test.log("shpfamt "+shpfamnt+"");
    var result = parseInt(prdwgt*qty*10);
    test.log("resut "+result+"")
            //---Verifying the Price Per LB  calculated against against the SalesOrder created----
            if(shfamnt == result)
    {
        test.pass("Price per LB freight amount calculated correctly on the SalesOrder Shipment ");
    }
    else
        test.fail("Error in calculating the Price per LB freight amount on the SalesOrder Shipment");
    //----Create Invoice and verify the freight amount applied----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Billing Selections..."));
        if(OS.name != "Darwin")
        {
            type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP:*.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        openItemContextMenu(":Billing Selections._cobill_XTreeWidget",fsonum1, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Create Invoice"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating the Invoice:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //---Verifying the freight amount calculate in invoice----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices..."));
        if(OS.name != "Darwin")
        {
            type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP:*.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+fsonum1+"' type='QModelIndex'}"))
            test.pass("Invoice creation successful");
        else  
            test.fail("Invoice creation failed");  
        openItemContextMenu(":_list_XTreeWidget_5",fsonum1, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        var invframnt = findObject(":lineItemsTab.XLineEdit_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));  
    }
    catch(e)
    {
        test.fail("Error in verifying the Invoice craeted:"+e);
        
    }
    var invfamnt = parseInt(invframnt);
    test.log("prdwgt "+prdwgt+"");
    test.log("invfamt "+invfamnt+"");
    var result = parseInt(prdwgt*qty*10);
    test.log("resut "+result+"")
            //----Verifying the Freight in Price Per LB  applied in Invoice-
            if(invfamnt == result)
    {
        test.pass("Price per LB freight amount calculated correctly on the Invoice Process ");
    }
    else
        test.fail("Error in calculating the Freight amount on the Invoice Processing");
    
    //----Pricing Schedule Assignment by Ship-to Address---------
    
    //---Create New Customer----
    var fcustname5 = "FCUST5";
    var shipnum = "STORE2";
    createCustomer(custType,fcustname5,shipnum);
    //----- To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Pricing Schedule Assignment to customer Ship-to--------
    prcassgship(fcustname5,shipnum,prcAssg);
    //----Create SalesOrder----
    var qty = "100";
    var fsonum2 = createSalesOrder1(targetitem,qty,fcustname5);
    //----Edit the Sales Order to verify the flat rate applied------
    var famnt;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        openItemContextMenu(":_list_XTreeWidget_5",fsonum2, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        famnt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Order Edited Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in editing the SalesOrder:"+e);
    }
    var frgamnt=parseInt(famnt);
    test.log("prdwgt "+prdwgt+"");
    test.log("frgamt "+frgamnt+"");
    var result = parseInt(prdwgt*qty*10);
    test.log("resut "+result+"")
    //---Verifying the Price Per LB  calculated against the SalesOrder created----
    if(frgamnt == result)
    {
        test.pass("Price per LB freight amount calculated correctly on the SalesOrder");
    }
    else
        test.fail("Error in calculating the flat rate on the SalesOrder");
    
    //--Ship the SO Created---
    var shpfamnt =  frgissueStock(fsonum2);
    var shfamnt = parseInt(shpfamnt);
    //---Verifying the Price Per LB  calculated against against the SalesOrder created----
    if(shfamnt == (prdwgt*qty*10) )
    {
        test.pass("Price per LB freight amount calculated correctly on the SalesOrder Shipment ");
    }
    else
        test.fail("Error in calculating the Freight amount on the SalesOrder Shipment");
    //----Create Invoice and verify the freight amount applied----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Billing Selections..."));
        snooze(0.5);
        if(OS.name != "Darwin")
        {
            type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP:*.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        snooze(0.5);
        openItemContextMenu(":Billing Selections._cobill_XTreeWidget",fsonum2, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Create Invoice"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating the Invoice:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //---Verifying the freight amount calculate in invoice----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));                                  activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices..."));
        if(OS.name != "Darwin")
        {
            type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP:*.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+fsonum2+"' type='QModelIndex'}"))
            test.pass("Invoice creation successful");
        else  
            test.fail("Invoice creation failed");  
        openItemContextMenu(":_list_XTreeWidget_5",fsonum2, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        var invframnt = findObject(":lineItemsTab.XLineEdit_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));  
    }
    catch(e)
    {
        test.fail("Error in verifying the Invoice craeted:"+e);
        
    }
    var invfamnt = parseInt(invframnt);
    //----Verifying the Freight in Price Per LB  applied in Invoice-
    if(invfamnt == (prdwgt*qty*10))
    {
        test.pass("Price per LB freight amount calculated correctly on the Invoice Process ");
    }
    else
        test.fail("Error in calculating the Price per LB freight amount on the Invoice Processing");   
    //---Assigning Pricing Scheudle by selected Customer Type----
    //---Creaste New Customer Type----
    var custType = "FREIGHT CUSTOMER TYPE2";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types", 43, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_code_XLineEdit"), custType);
        nativeType("<Tab>");
        type(waitForObject(":_description_XLineEdit"),custType);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the Customer type created-----------
        snooze(0.5);
        waitForObject(":_stack._custtype_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._custtype_XTreeWidget' text='"+custType+"' type='QModelIndex'}"))
            test.pass("Customer Type created successfully");
        else  
            test.fail("Customer Type creation failed"); 
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating the Customer Type:"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }
    //---Create New Customer and assign Customer Type----
    var fcustname6 = "FCUST6";
    var custType1 = custType+'-'+custType;
    createCustomer(custType1,fcustname6,"STORE1");
    //---Assigning pricing Schedule for the Customer Type-----
    prcAssgCustType(fcustname6,custType1,custType,prcAssg);
    //----Create SalesOrder----
    var qty = "100";
    var fsonum3 = createSalesOrder1(targetitem,qty,fcustname5);
    //----Edit the Sales Order to verify the flat rate applied------
    var famnt;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5",fsonum3, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        famnt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Order Edited Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in editing the SalesOrder:"+e);
    }
    var frgamnt=parseInt(famnt);
    test.log("prdwgt "+prdwgt+"");
    test.log("frgamt "+frgamnt+"");
    var result = parseInt(prdwgt*qty*10);
    test.log("resut "+result+"")
            //---Verifying the Price Per LB  calculated against the SalesOrder created----
            if(frgamnt == (prdwgt*qty*10))
    {
        test.pass("Price per LB freight amount calculated correctly on the SalesOrder");
    }
    else
        test.fail("Error in calculating the Price per LB freight amount on the SalesOrder");
    
    //--Ship the SO Created---
    var shpfamnt =  frgissueStock(fsonum3);
    var shfamnt = parseInt(shpfamnt);
    //---Verifying the Price Per LB  calculated against against the SalesOrder created----
    if(shfamnt == (prdwgt*qty*10))
    {
        test.pass("Price per LB freight amount calculated correctly on the SalesOrder Shipment ");
    }
    else
        test.fail("Error in calculating thePrice per LB freight amount on the SalesOrder Shipment");
    //----Create Invoice and verify the freight amount applied----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Billing Selections..."));
        snooze(0.5);
        if(OS.name != "Darwin")
        {
            type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP:*.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        openItemContextMenu(":Billing Selections._cobill_XTreeWidget",fsonum3, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Create Invoice"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating the Invoice:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //---Verifying the freight amount calculate in invoice----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices..."));
        if(OS.name != "Darwin")
        {
            type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP:*.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+fsonum3+"' type='QModelIndex'}"))
            test.pass("Invoice creation successful");
        else  
            test.fail("Invoice creation failed");  
        openItemContextMenu(":_list_XTreeWidget_5",fsonum3, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        var invframnt = findObject(":lineItemsTab.XLineEdit_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));  
    }
    catch(e)
    {
        test.fail("Error in verifying the Invoice craeted:"+e);
        
    }
    var invfamnt = parseInt(invframnt);
    //----Verifying the Freight in Price Per LB  applied in Invoice-
    if(invfamnt == (prdwgt*qty*10))
    {
        test.pass("Price per LB freight amount calculated correctly on the Invoice Process ");
    }
    else
        test.fail("Error in calculating the Price per LB freight amount on the Invoice Processing");
}
