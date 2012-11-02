function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    snooze(6);
    //--------------- Set the window to Tab view mode -------------
    
    tabView();
    //--Create New Freight Class---
    var  frgname = "ZEN FREIGHT CLASS1";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Freight Classes");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Freight Classes", 36, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_freightClass_XLineEdit"), frgname);
        nativeType("<Tab>");
        snooze(0.5);
        type(waitForObject(":_description_XLineEdit"), frgname);
        nativeType("<Tab>");
        snooze(0.5);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        snooze(0.5);
        //---Verifying the Freight Class Created----
        waitForObject(":_stack._freightClass_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._freightClass_XTreeWidget' text='"+frgname+"' type='QModelIndex'}"))
            test.pass("Freight Class creation successful");
        else  
            test.fail("Freight Class creation failed"); 
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Freight class Created sucessfully:");
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
    var targetitem = "FREIGHT ITEM1";
    copyItem("YTRUCK1",targetitem);
    //----Create New ItemSite-----
    createRIS(targetitem);
    //----Edit the Item to assign Freight class-----
    var prdwgt
            try
    {
        var frgc = frgname+"-"+frgname;
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
        prdwgt = findObject(":_prodWeight_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("TargetItem edited sucessfully");
    }
    catch(e)
    {
        test.fail("Error in editing the TargetItem:"+e);
    }
    
    //---Create New Customer----
    var fcustname1 = "FCUST1";
    var custType = "NORMAL"+"-"+"Normal Domestic Customers";
    createCustomer(custType,fcustname1,"STORE1");
    //----- To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //-----Create Freight Type PricingSchedule using Falt rate------
    var Fghprcname1 ="FREIGHT PRICING SCHEDULE1 ";
    var flatrate = "120";
    var FC = Fghprcname1 +" - " +Fghprcname1;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        snooze(0.5);
        type(waitForObject(":GroupBox1._name_XLineEdit"),Fghprcname1);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"),Fghprcname1);
        nativeType("<Tab>");
        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
        snooze(0.5);
        if(!findObject(":Type.Freight_QRadioButton").checked)
        {
            clickButton(waitForObject(":Type.Freight_QRadioButton"));
        }
        if(!findObject(":_typeFreightGroup.Flat Rate_QRadioButton").checked)
        {
            clickButton(waitForObject(":_typeFreightGroup.Flat Rate_QRadioButton"));
        }
        type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2"), flatrate);
        nativeType("<Tab>");
        snooze(0.5);
        if(!findObject(":_freightClassGroup.Selected:_QRadioButton").checked)
        {
            clickButton(waitForObject(":_freightClassGroup.Selected:_QRadioButton"));
        }
        waitForObject(":_freightClassGroup._freightClass_XComboBox");
        clickItem(":_freightClassGroup._freightClass_XComboBox",frgc,0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
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
    prcasscust(fcustname1,prcAssg,Fghprcname1);
    //----Create SalesOrder----
    var fsonum1 = createSalesOrder1(targetitem, 100 ,fcustname1);
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
        famnt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Order Edited Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in editing the SalesOrder:"+e);
    }
    var frgamnt=parseInt(famnt);
    
    //---Verifying the Flatrate applied against the SalesOrder----
    if(frgamnt ==  flatrate)
    {
        test.pass("Flat rate calculated correctly on the SalesOrder");
    }
    else
        test.fail("Error in calculating the flat rate on the SalesOrder");
    
    //---Create New Customer----
    var fcustname2 = "FCUST2";
    var shipnum = "STORE2";
    createCustomer(custType,fcustname2,shipnum);
    //---Pricing Schedule Assignment to customer Ship-to--------
    prcassgship(fcustname2,shipnum,prcAssg);
    //----Create SalesOrder----
    var fsonum2 = createSalesOrder1(targetitem, 100 ,fcustname2);
    //----Edit the Sales Order to verify the flat rate applied------
    var famnt;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open..."));                  clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        openItemContextMenu(":_list_XTreeWidget_5",fsonum2, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
         snooze(0.5);
        famnt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Order Edited Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in editing the SalesOrder:"+e);
    }
    var frgamnt=parseInt(famnt);
    if(frgamnt ==  flatrate)
    {
        test.pass("Flat rate calculated correctly on the SalesOrder");
    }
    else
        test.fail("Error in calculating the flat rate on the SalesOrder");
    
    //---Assigning Pricing Scheudle by selected Customer Type----
    //---Creaste New Customer Type----
    var custType = "FREIGHT CUSTOMER TYPE1";
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
    var fcustname3 = "FCUST3";
    var custType1 = custType+'-'+custType;
    createCustomer(custType1,fcustname3,"STORE1");
    
    //---Assigning pricing Schedule for the Customer Type-----
    
    prcAssgCustType(fcustname3,custType1,custType,prcAssg);
    
    //----Create SalesOrder----
    var fsonum3 = createSalesOrder1(targetitem, 100 ,fcustname3);
    //----Edit the Sales Order to verify the flat rate applied------
    var famnt;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open..."));                  clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        openItemContextMenu(":_list_XTreeWidget_5",fsonum3, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        famnt = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Order Edited Sucessfully");
    }
    catch(e)
    {
        test.fail("Error in editing the SalesOrder:"+e);
    }
    var frgamnt=parseInt(famnt);
    //---Verifying the Flatrate applied against the SalesOrder----
    if(frgamnt ==  flatrate)
    {
        test.pass("Flat rate calculated correctly on the SalesOrder");
    }
    else
        test.fail("Error in calculating the flat rate on the SalesOrder");
    
    
    
}
