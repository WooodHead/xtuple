function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(6);
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
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
            activateItem(":xTuple ERP:*.System_QMenu", "Preferences..."); 
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
        
        waitForObject(":View Check Run.Save_QPushButton");
        clickButton(":View Check Run.Save_QPushButton");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        snooze(3);
    }
    catch(e)
    {
        test.fail("Error in editing preferences"+ e);
    }  
    
    //--------Exiting the application------
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
    activateItem(waitForObjectItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP..."));
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    snooze(3);
    
    //--------------- Set the window to Tab view mode -------------
    
    tabView();
    //------- Variable declaration -----
    var targetitem = "PRCITEM";
    //---Create Pricing Schedule----
    var prcname = "PRICING SCHEDULE1";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":GroupBox1._name_XLineEdit"), prcname);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Pricing Schedule");
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        //---Verifying Pricing Schedule Created---------
        waitForObject(":_ipshead_XTreeWidget_3");
        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+prcname+"' type='QModelIndex'}"))
            test.pass("Pricing Schedule created successfully");
        else  
            test.fail("Pricing Schedule creation failed"); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in Creating the pricing Schedule:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    snooze(0.5);
    
    //----External Flows-----------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        waitForObject(":_ipshead_XTreeWidget_3");
        
        //----Edit the Pricing Schedule Created--------
        try
        {
            clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
            var prcedit = "Pricing Schedule edited sucessfully";
            waitForObject(":GroupBox1._descrip_XLineEdit").clear();
            type(":GroupBox1._descrip_XLineEdit", prcedit);
            nativeType("<Tab>");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            snooze(0.5);
            //-----Verify the changes made in  Pricing Schedule after editing-------
            clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
            snooze(0.5);
            var prceditvrfy = waitForObject(":GroupBox1._descrip_XLineEdit").text;
            if(prceditvrfy == prcedit)
            {
                test.pass("Princing Schedule edited sucessfully");
            }
            else
                test.fail("Fail to edit the Pricing Schedule");
            snooze(0.5);
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        }
        catch(e)
        {
            test.fail("Error in Editing the pricing Schedule:"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton_3"))
            {
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
            }
        }
        snooze(0.5);
        
        try
        {
            //---Copy the Pricing Schedule----
            clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton);
            clickButton(waitForObject(":Items.Copy_QPushButton"));
            snooze(0.5);
            var prcCpy= waitForObject(":GroupBox1._name_XLineEdit").text;
            
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            //---Verifying the Pricing Schedule Created after copying-----
            if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+prcCpy+"' type='QModelIndex'}"))
                test.pass("Pricing Schedule Copied successfully");
            else  
                test.fail("Copying Pricing Schedule failed"); 
        }
        catch(e)
        {
            test.fail("Error in copying the Pricing Schedule:"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton_3"))
            {
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
            }
        }
        
        //---Creating Duplicate Pricing Schedule---------
        try
        {
            clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton);
            clickButton(waitForObject(":Items.Copy_QPushButton"));
            waitForObject(":GroupBox1._name_XLineEdit").clear();
            type(":GroupBox1._name_XLineEdit",prcname);
            snooze(0.5);
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            snooze(0.5);
            if(object.exists(":OK_QPushButton"))
            {
                test.pass("Failed to duplicate the Pricing Schedule");
                clickButton(waitForObject(":OK_QPushButton"));
            }
            else
                test.fail("it is possible to Duplicate the Pricing Schedule");
            snooze(0.5);
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
        catch(e)
        {
            test.fail("Error in  duplicating  Pricing Schedule:"+e);
            
        }
        //---Deleting Pricing Schedule-------
        try
        {
            clickItem(":_ipshead_XTreeWidget_3",prcCpy, 5, 5, 1, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP: *.Delete_QPushButton"));
            snooze(0.5);
            //---Verifying the Pricing Schedule Created after Deleting-----
            if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+prcCpy+"' type='QModelIndex'}"))
                test.fail("Deleting Copied Pricing Schedule failed"); 
            else  
                test.pass("Copied Pricing Schedule deleted successfully");
        }
        catch(e)
        {
            test.fail("Error in deleting the Pricing Schedule:"+e);
        }
        snooze(2);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }//End of try for External FLows
    catch(e)
    {
        test.fail("Error in performing operation on Pricing Schedulr Created:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }//End of catch for External Flows
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //--Create New item----
    
    copyItem("YTRUCK1",targetitem);
    //---Create Item Site------
    createRIS(targetitem);
    
    //--Edit the item to enable Exclusive option----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        openItemContextMenu(":_list_XTreeWidget_3",targetitem, 5, 5, Qt.LeftButton);       
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        if(!findObject(":Item is Sold.Exclusive_QCheckBox_3").checked)
        {
            clickButton(waitForObject(":Item is Sold.Exclusive_QCheckBox_3"));
        }
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Exclusive option enabled sucessfully");
    }
    catch(e)
    {
        test.fail("Error in enabling the exclusive option for an ite:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            
            clickButton(waitForObject(":View Check Run.Cancel_QPushButton"));
        }
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
    }
    
    //----Add an Item to Pricing Schedule--------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        waitForObject(":_ipshead_XTreeWidget_3");
        clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
        //---Add an Item to pricing schedule by selecting Nominal Radio Button and qty break as 0----
        try
        {
            snooze(0.5);
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            if(!findObject(":Type.Nominal_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Nominal_QRadioButton"));
            }
            
            type(waitForObject(":Item Site.ItemLineEdit_ItemLineEdit"), targetitem);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreak_XLineEdit"), "0");
            type(waitForObject(":_baseTab.XLineEdit_XLineEdit"), "25");
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in adding an Nominal type item to Pricing schedule:"+e);
            if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
            }
        }
        
        //---Verifying the item added under pricing schedule----
        try
        {
            waitForObject(":Pricing Schedule._ipsitem_XTreeWidget");
            if(object.exists("{column='1' container=':Pricing Schedule._ipsitem_XTreeWidget' text='"+targetitem+"' type='QModelIndex'}")&&object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}"))
                test.pass("Item sucessfully added under Pricing Schedule with quantity break defined as 0");
            else  
                test.fail("Fail to add item under Pricing Schedule with quantity break defined as 0 "); 
            
        }
        catch(e)
        {
            test.fail("Error in adding the Item under pricing Schedule:"+e);
        }
        //---Add an Item to pricing schedule by selecting Nominal Radio Button and qty break as 100----
        try
        {
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            if(!findObject(":Type.Nominal_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Nominal_QRadioButton"));
            }
            
            type(waitForObject(":Item Site.ItemLineEdit_ItemLineEdit"), targetitem);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreak_XLineEdit"), "100");
            type(waitForObject(":_baseTab.XLineEdit_XLineEdit"), "50");
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in adding an Nominal type item to Pricing schedule:"+e);
            if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
            }
        }
        
        //---Verifying the item added under pricing schedule----
        try
        {
            waitForObject(":Pricing Schedule._ipsitem_XTreeWidget");
            if(object.exists("{column='1' container=':Pricing Schedule._ipsitem_XTreeWidget' text='"+targetitem+"' type='QModelIndex'}")&&object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='100.00' type='QModelIndex'}"))
                test.pass("Item sucessfully added under Pricing Schedule with quantity break defined as 100");
            else  
                test.fail("Fail to add item under Pricing Schedule with quantity break defined as 100 "); 
        }
        catch(e)
        {
            test.fail("Error in adding the Item under pricing Schedule:"+e);
        }
        //---Creating duplicate schedule----
        try
        {
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            if(!findObject(":Type.Nominal_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Nominal_QRadioButton"));
            }
            type(waitForObject(":Item Site.ItemLineEdit_ItemLineEdit"), targetitem);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreak_XLineEdit"), "100");
            type(waitForObject(":_baseTab.XLineEdit_XLineEdit"), "25");
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
            snooze(0.5);
            if(object.exists(":OK_QPushButton"))
            {
                test.pass("It is not possible to  duplicate Schedule");
                clickButton(waitForObject(":OK_QPushButton"));
            }
            else
                test.fail("It is possible to duplicate Schedules");
            clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in assigning duplicated item to pricing schedule:"+e);
        }    
        snooze(1);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }//end of try to add an item
    catch(e)
    {
        test.fail("Error in creating item in the Pricing Schedule:"+e);
    }//end of catch to add item
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    
    //---Create New Customer-------
    var custname5 = "CUSTOMER5";
    var custType = "NORMAL"+"-"+"Normal Domestic Customers";
    createCustomer(custType,custname5,"STORE1");
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Pricing Schedule Assignment for a Customer----
    var prcAssg = prcname +" - " +"Pricing Schedule edited sucessfully"; 
    prcasscust(custname5,prcAssg,prcname);
    //----Create SO----
    var sonumber1 =  createSalesOrder1(targetitem, 100 ,custname5);
    //-----Edit the SO to verify the unit Price -------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber1, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        var uc =findObject("{column='15' container=':_lineItemsPage.XLineEdit_XLineEdit' type='QModelIndex'}").text;
        var UC=parseInt(replaceSubstring(uc,",",""));
        if(UC == "50")
            test.pass("Unit Price of an Item populated correctly according to the pricing schedule assignied to customer");
        else
            test.fail("Incorrect Unit Price populate according to the pricing schedule assignied to customer");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        snooze(0.5);
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in verifying the unit cost for Sales Order created with Pricing Schedule assignied to customer:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    //---Creaste New Customer Type----
    var custType = "CUSTOMER TYPE1";
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
    
    //---Creating New Customer with customer type assigned----
    var custname1 = "CUSTOMER1";
    custType1 = custType+'-'+custType;
    createCustomer(custType1,custname1,"STORE1");
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Assigning pricing Schedule for the Customer Type-----
    prcAssgCustType(custname1,custType1,custType,prcAssg);
    
    //---Create Sales Order For Cusomer---
    var sonumber2 = createSalesOrder1(targetitem, 100 ,custname1); 
    //-----Edit the SO to verify the unit Price -------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber2, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        var uc =findObject("{column='15' container=':_lineItemsPage.XLineEdit_XLineEdit' type='QModelIndex'}").text;
        var UC=parseInt(replaceSubstring(uc,",",""));
        if(UC == "50")
            test.pass("Unit Price of an Item populated correctly according to the pricing schedule assignied for Customer Type");
        else
            test.fail("Incorrect Unit Price populate according to the pricing schedule assignied for Customer Type");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in verifying the unit cost for an Sales Order craeted with Pricing Schedule assigined as Custoemr Type:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    //---Create New Customer with Ship-to Address---
    var custname2 = "CUSTOMER2";
    var shipnum = "STORE2";
    var custType = "NORMAL"+"-"+"Normal Domestic Customers";
    createCustomer(custType,custname2,shipnum);
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Pricing Schedule Assignment to customer Ship-to--------
    prcassgship(custname2 ,shipnum,prcAssg);
    //---Create SO----
    var sonumber3 = createSalesOrder1(targetitem, 100 ,custname2);
    //-----Edit the SO to verify the unit Price -------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber3, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        var uc =findObject("{column='15' container=':_lineItemsPage.XLineEdit_XLineEdit' type='QModelIndex'}").text;
        var UC=parseInt(replaceSubstring(uc,",",""));
        if(UC == "50")
            test.pass("Unit Price of an Item populated correctly according to the pricing schedule assignied for Customer Type");
        else
            test.fail("Incorrect Unit Price populate according to the pricing schedule assignied for Customer Type");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in verifying the unit cost for an Sales Order craeted with Pricing Schedule assigined as Custoemr Type:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    //---Creaste New Customer Type----
    var custType = "CUSTOMER TYPE2";
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
    
    //---Creating New Customer----
    var custname3 = "CUSTOMER3";
    custType1 = custType+'-'+custType;
    createCustomer(custType1,custname3,"STORE1");
    //    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Assigning pricing Schedule for the Customer Type-----
    prcAssgCustType(custname3,custType1,custType,prcAssg);
    //---Create SO----
    var sonumber4 = createSalesOrder1(targetitem, 100 ,custname3);
    //-----Edit the SO to verify the unit Price -------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber4, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        var uc =findObject("{column='15' container=':_lineItemsPage.XLineEdit_XLineEdit' type='QModelIndex'}").text;
        var UC=parseInt(replaceSubstring(uc,",",""));
        if(UC == "50")
            test.pass("Unit Price of an Item populated correctly according to the pricing schedule assignied for Customer Type");
        else
            test.fail("Incorrect Unit Price populate according to the pricing schedule assignied for Customer Type");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in verifying the unit cost for an Sales Order craeted with Pricing Schedule assigined as Custoemr Type:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    //---Create Pricing Schedule and add kit type item---------
    //---Create Pricing Schedule----
    var prcname = "PRICING SCHEDULE2";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        snooze(0.5);
        type(waitForObject(":GroupBox1._name_XLineEdit"), prcname);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"), prcname);
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        //---Verifying Pricing Schedule Created---------
        waitForObject(":_ipshead_XTreeWidget_3");
        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+prcname+"' type='QModelIndex'}"))
            test.pass("Pricing Schedule created successfully");
        else  
            test.fail("Pricing Schedule creation failed"); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in Creating the pricing Schedule:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    //----Add an KitItem to Pricing Schedule with qty break as 0--------
    var Kititem = "KCAR1";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        waitForObject(":_ipshead_XTreeWidget_3");
        clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
        snooze(0.5);
        if(!findObject(":Type.Nominal_QRadioButton").checked)
        {
            clickButton(waitForObject(":Type.Nominal_QRadioButton"));
        }
        
        type(waitForObject(":Item Site.ItemLineEdit_ItemLineEdit"), Kititem);
        nativeType("<Tab>");
        type(waitForObject(":_qtyBreak_XLineEdit"), "0");
        type(waitForObject(":_baseTab.XLineEdit_XLineEdit"), "25");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Verifying the item added under pricing schedule----
        try
        {
            waitForObject(":Pricing Schedule._ipsitem_XTreeWidget");
            if(object.exists("{column='1' container=':Pricing Schedule._ipsitem_XTreeWidget' text='"+Kititem+"' type='QModelIndex'}")&&object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}"))
                test.pass("Item sucessfully added under Pricing Schedule with quantity break defined as 0");
            else  
                test.fail("Fail to add item under Pricing Schedule with quantity break defined as 0 "); 
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            
        }
        catch(e)
        {
            test.fail("Error in adding the Item under pricing Schedule:"+e);
        }
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in adding the kit type item with qty break 0:"+e);
    }
    
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //----Add an KitItem to Pricing Schedule with qty break as 100--------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        waitForObject(":_ipshead_XTreeWidget_3");
        clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
        snooze(0.5);
        if(!findObject(":Type.Nominal_QRadioButton").checked)
        {
            clickButton(waitForObject(":Type.Nominal_QRadioButton"));
        }
        
        type(waitForObject(":Item Site.ItemLineEdit_ItemLineEdit"), Kititem);
        nativeType("<Tab>");
        type(waitForObject(":_qtyBreak_XLineEdit"), "100");
        type(waitForObject(":_baseTab.XLineEdit_XLineEdit"), "50");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Verifying the item added under pricing schedule----
        try
        {
            waitForObject(":Pricing Schedule._ipsitem_XTreeWidget");
            if(object.exists("{column='1' container=':Pricing Schedule._ipsitem_XTreeWidget' text='"+Kititem+"' type='QModelIndex'}")&&object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='100.00' type='QModelIndex'}"))
                test.pass("Item sucessfully added under Pricing Schedule with quantity break defined as 100");
            else  
                test.fail("Fail to add item under Pricing Schedule with quantity break defined as 100 "); 
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        }
        catch(e)
        {
            test.fail("Error in adding the Item under pricing Schedule:"+e);
        }
        
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in adding the Kit Type item to Pricing schedule with qty break 100:"+e);
    }
    
    
    
    //---Creaste New Customer Type----
    var custType = "CUSTOMER TYPE3";
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
    
    //---Creating New Customer----
    var custname4 = "CUSTOMER4";
    custType1 = custType+'-'+custType;
    createCustomer(custType1,custname4,"STORE1");
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    var prcAssg = prcname+" - "+prcname;
    //---Assigning pricing Schedule for the Customer Type-----
    prcAssgCustType(custname4,custType1,custType,prcAssg);
    //---Create Sales Order For Cusomer---
    var sonumber4 = createSalesOrder1(Kititem, 100,custname4); 
    //-----Edit the SO to verify the unit Price -------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber4, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        var uc =findObject("{column='15' container=':_lineItemsPage.XLineEdit_XLineEdit' type='QModelIndex'}").text;
        var UC=parseInt(replaceSubstring(uc,",",""));
        if(UC == "50")
            test.pass("Unit Price of an KitItem populated correctly according to the pricing schedule assignied for Customer Type");
        else
            test.fail("Incorrect Unit Price populated for KitItem according to the pricing schedule assignied for Customer Type");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in verifying the unit cost for an Sales Order craeted to KitItem with Pricing Schedule assigined as Custoemr Type:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
}
