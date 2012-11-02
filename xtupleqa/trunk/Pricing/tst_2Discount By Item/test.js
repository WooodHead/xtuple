function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(6);
    
    //--------------- Set the window to Tab view mode -------------
    
    tabView();
    //----Item Creation-----
    var discitem1 = "DISCITEM1";
    copyItem("YTRUCK1",discitem1);
    //---Create Item Site for Item---
    createRIS(discitem1);
    //---Edit the Item to obtain List Price----
    var listprice;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5",discitem1, 5, 5, Qt.LeftButton); 
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        listprice = findObject(":Item is Sold._listprice_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("List Price of an Item Obtained sucessfully");
    }
    catch(e)
    {
        test.fail("Error in obtaining List Price:"+e);
    }
    
    //---Craete New Customer----
    var dcustname1 = "DISCUST1";
    var custType = "NORMAL"+"-"+"Normal Domestic Customers";
    createCustomer(custType,dcustname1,"STORE1");
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Discount by Item using Percentage----
    //---Discount type pricing schedule Creation for an Item-----
    var prcnamed1 ="DISC PRICING SCHEDULE1";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        
        //---Create Discount Per for qty breakdown 0-----
        try
        {
            clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
            type(waitForObject(":GroupBox1._name_XLineEdit"),prcnamed1);
            type(waitForObject(":GroupBox1._descrip_XLineEdit"),prcnamed1);
            nativeType("<Tab>");
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            if(!findObject(":Type.Discount_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Discount_QRadioButton"));
            }
            if(!findObject(":Discount By.Item_QRadioButton").checked)
            {
                clickButton(waitForObject(":Discount By.Item_QRadioButton"));
            }
            
            type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"),discitem1);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreakCat_XLineEdit"), "0");
            nativeType("<Tab>");
            type(waitForObject(":_prodCatGroup._discount_XLineEdit"), "2");
            nativeType("<Tab>");
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating discount type pricing schedule Creation  for qty break 0:"+e);
            if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
            }
        }
        
        //--Create Discount Percentage for qty break down 100----
        try
        {
            
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            if(!findObject(":Type.Discount_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Discount_QRadioButton"));
            }
            if(!findObject(":Discount By.Item_QRadioButton").checked)
            {
                clickButton(waitForObject(":Discount By.Item_QRadioButton"));
            }
            type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"),discitem1);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreakCat_XLineEdit"), "100");
            nativeType("<Tab>");
            type(waitForObject(":_prodCatGroup._discount_XLineEdit"), "5");
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating Discount type pricing schedule Creation  for qty break 100:"+e);
            if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
            }
        }
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        test.log("Pricing schedule created ")
            } //End of main try
    catch(e)
    {
        test.fail("Error in creating the pricing Schedule of Discount Type:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }//End of Main catch
    
    
    
    //---Pricing Schedule Assignment for a Customer----
    var prcAssg = prcnamed1 +" - " +prcnamed1; 
    prcasscust(dcustname1,prcAssg,prcnamed1);
    //---Create SO----
    var dsonum1 = createSalesOrder1(discitem1,100,dcustname1);
    var uprc = salesunitprice(dsonum1);
    var result = listprice*(1-0.05);
    test.log("result "+result+"");
    test.log("uprc "+uprc+"");
    //---Verifying the UnitPrice----
    if(uprc == result)
    {
        test.pass("Discount percentage applied sucessfully on unit price of Sales Order");        
    }
    else
        test.fail("Error in applying the discount Percentage on unit price of Sales Order");
    //----Process of Pricing Schedule Assignment By Customer Ship -To----
    
    //---Create New Customer with Ship-to address defined-----
    
    //---Craete New Customer----
    var dcustname2 = "DISCUST2";
    var shipnum = "STORE1";
    createCustomer(custType,dcustname2,shipnum);
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Pricing Schedule Assignment to customer Ship-to--------
    prcassgship(dcustname2,shipnum,prcAssg);
    //---Create SO----
    var dsonum2 = createSalesOrder1(discitem1, 100,dcustname2);
    //---Edit the Sales Order to verify the Discount Applied----
    var uprc = salesunitprice(dsonum2);
    var result = listprice*(1-0.05);
    test.log("result "+result+"");
    test.log("uprc "+uprc+"");
    //--Verifying the UnitPrice----
    if(uprc == result)
    {
        test.pass("Discount percentage applied sucessfully on sales Order unit price");
    }
    else
        test.fail("Error in applying the discount Percentage on Unit Price of the Sales Order");
    
    //---Assigning Pricing Scheudle by selected Customer Type----
    //---Creaste New Customer Type----
    var custType = "DCUSTOMER TYPE2";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types", 43, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_code_XLineEdit"), custType);
        type(waitForObject(":_description_XLineEdit"),custType);
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
    //---Create New Customer and assign Customer Type----
    var dcustname3 = "DISCUST3";
    custType1 = custType+'-'+custType;
    createCustomer(custType1,dcustname3,"STORE1");
    //---Assigning pricing Schedule for the Customer Type-----
    
    prcAssgCustType(dcustname3,custType1,custType,prcAssg);
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Create SO----
    var dsonum3 = createSalesOrder1(discitem1, 100,dcustname3);
    //---Edit the Sales Order to verify the Discount Applied----
    var uprc = salesunitprice(dsonum3);
    //--Verifying the UnitPrice----
    if(uprc == listprice*(1-0.05))
    {
        test.pass("Discount percentage applied sucessfully on unit price");
    }
    else
        test.fail("Error in applying the discount Percentage");
    
    
    snooze(0.5);
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    snooze(0.5);
    //----Discount by Item using Amount-----
    //----Item Creation-----
    var discitem2 = "DISCITEM2";
    copyItem("YTRUCK1",discitem2);
    //---Create Item Site for Item---
    createRIS(discitem2);
    //---Edit the Item to obtain List Price----
    var listprice;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        openItemContextMenu(":_list_XTreeWidget_5",discitem2, 5, 5, Qt.LeftButton); 
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        var listprice = findObject(":Item is Sold._listprice_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("List Price of an Item Obtained sucessfully");
    }
    catch(e)
    {
        test.fail("Error in obtaining List Price:"+e);
    }
    
    //---Craete New Customer----
    var dcustname4 = "DISCUST4";
    var custType = "NORMAL"+"-"+"Normal Domestic Customers";
    createCustomer(custType,dcustname4,"STORE1");
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Discount by Item using Amount----
    //---Discount type pricing schedule Creation for an Item-----
    var prcnamed2 ="DISC PRICING SCHEDULE2";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        
        //---Create Discount Per for qty breakdown 0-----
        try
        {
            clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
            type(waitForObject(":GroupBox1._name_XLineEdit"),prcnamed2);
            nativeType("<Tab>");
            type(waitForObject(":GroupBox1._descrip_XLineEdit"),prcnamed2);
            nativeType("<Tab>");
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            snooze(0.5);
            if(!findObject(":Type.Discount_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Discount_QRadioButton"));
            }
            if(!findObject(":Discount By.Item_QRadioButton").checked)
            {
                clickButton(waitForObject(":Discount By.Item_QRadioButton"));
            }
            
            type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"),discitem2);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreakCat_XLineEdit"), "0");
            nativeType("<Tab>");
            type(waitForObject(":_prodCatGroup._fixedAmtDiscount_XLineEdit"), "2");
            nativeType("<Tab>");
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating discount type pricing schedule Creation  for qty break 0:"+e);
            if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
            }
        }
        
        //--Create Discount Percentage for qty break down 100----
        try
        {
            
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            if(!findObject(":Type.Discount_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Discount_QRadioButton"));
            }
            if(!findObject(":Discount By.Item_QRadioButton").checked)
            {
                clickButton(waitForObject(":Discount By.Item_QRadioButton"));
            }
            type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"),discitem2);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreakCat_XLineEdit"), "100");
            nativeType("<Tab>");
            type(waitForObject(":_prodCatGroup._fixedAmtDiscount_XLineEdit"), "5");
            nativeType("<Tab>");
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating Discount type pricing schedule Creation  for qty break 100:"+e);
            if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
            }
        }
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    } //End of main try
    catch(e)
    {
        test.fail("Error in creating the pricing Schedule of Discount Type:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }//End of Main catch
    
    
    
    //---Pricing Schedule Assignment for a Customer----
    var prcAssg = prcnamed2 +" - " +prcnamed2; 
    prcasscust(dcustname4,prcAssg,prcnamed2);
    //---Create SO----
    var dsonum1 = createSalesOrder1(discitem2, 100,dcustname4);
    //---Edit the Sales Order and verify the discount amount applied----
    
    var custprc =  salesCustprice(dsonum1,discitem2);
    //---Verifying the CustomerPrice----
    if(custprc == (listprice-5))
    {
        test.pass("Discount Amount calculated sucessfully on Sales Order");
    }
    else
        test.fail("Error in calculating the discount amount against the  Sales Order");
    
    //----Process of Pricing Schedule Assignment By Customer Ship -To----
    
    //---Create New Customer with Ship-to address defined-----
    
    //---Craete New Customer----
    var dcustname5 = "DISCUST5";
    var shipnum = "STORE2";  
    
    createCustomer(custType,dcustname5,shipnum);
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Pricing Schedule Assignment to customer Ship-to--------
    prcassgship(dcustname5,shipnum,prcAssg);
    //---Create SO----
    var dsonum2 = createSalesOrder1(discitem2, 100 ,dcustname5);
    //---Edit the Sales Order to verify the Discount Applied----
    var custprc =  salesCustprice(dsonum2,discitem2);
    //--Verifying the CustomerPrice----
    if(custprc == (listprice-5))
        
    {
        test.pass("Discount Amount calculated sucessfully on sales Order ");
    }
    else
        test.fail("Error in calculating discount Amount against the Sales Order");
    
    //---Assigning Pricing Scheudle by selected Customer Type----
    //---Creaste New Customer Type----
    var custType = "DCUSTOMER TYPE3";
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
    var dcustname6 = "DISCUST6";
    var custType1 = custType+'-'+custType;
    createCustomer(custType1, dcustname6,"STORE1");
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Assigning pricing Schedule for the Customer Type-----
    
    prcAssgCustType(dcustname6,custType1,custType,prcAssg);
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Create SO----
    var dsonum3 = createSalesOrder1(dcustname6,discitem2, 100);
    //---Edit the Sales Order to verify the Discount Applied----
    var custprc =  salesCustprice(dsonum3,discitem2);
    //--Verifying the CustomerPrice----
    if(custprc == (listprice-5))
    {
        test.pass("Discount amount calculated sucessfully on SalesOrder Created");
    }
    else
        test.fail("Error in calculating the discount Amount against SalesOrder");
    
    
}
