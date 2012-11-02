function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    snooze(6);
    //--------------- Set the window to Tab view mode -------------
    
    tabView();
    //---Discount by Product catageory using Percentage-------
    //---Create Product Catageory----
    var  prdctry = "PRODUCTCAT";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories", 30, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        snooze(0.5);
        type(waitForObject(":_stack._category_XLineEdit"),prdctry);
        nativeType("<Tab>");
        type(waitForObject(":_stack._description_XLineEdit"),prdctry);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Product category created");
    }
    catch(e)
    {
        test.fail("Error in creating Product Catageory:"+e);
    }
    //----Item Creation-----
    var dispitem1 = "DISCITEM3";
    copyItem("YTRUCK1",dispitem1);
    
    //---Edit the Item to obtain List Price----
    var listprice;
    var prdctry1 = prdctry +" - " +prdctry;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5",dispitem1, 5, 5, Qt.LeftButton); 
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        if(!findObject(":xTuple ERP: *.Item is Sold_QGroupBox").checked)
        {
            clickButton(waitForObject(":xTuple ERP: *.Item is Sold_QGroupBox"));
        }
        
        waitForObject(":_prodcat_XComboBox_3");
        clickItem(":_prodcat_XComboBox_3",prdctry1,0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        var listprice = findObject(":Item is Sold._listprice_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("List Price of an Item Obtained sucessfully");
    }
    catch(e)
    {
        test.fail("Error in obtaining List Price:"+e);
    }
    //---Create Item Site for Item---
    createRIS(dispitem1);
    //---Craete New Customer----
    var prdcname1 = "PRDCUST1";
    var custType = "NORMAL"+"-"+"Normal Domestic Customers";
    createCustomer(custType,prdcname1,"STORE1");
    //---- To avoid unexpected blocks ----
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Discount by Product Catageory using Percentage----
    //---Discount type pricing schedule Creation for an Item-----
    var Prdprcname1 ="PRDCTRY PRICING SCHEDULE1 ";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        
        //---Create Discount Per for qty breakdown 0-----
        try
        {
            clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
            snooze(0.5);
            type(waitForObject(":GroupBox1._name_XLineEdit"),Prdprcname1);
            nativeType("<Tab>");
            type(waitForObject(":GroupBox1._descrip_XLineEdit"),Prdprcname1);
            nativeType("<Tab>");
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            snooze(1);
            if(!findObject(":Type.Discount_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Discount_QRadioButton"));
            }
            if(!findObject(":Discount By.Product Category_QRadioButton").checked)
            {
                clickButton(waitForObject(":Discount By.Product Category_QRadioButton"));
            }
            
            waitForObject(":_prodCatGroup._prodcat_XComboBox");
            clickItem(":_prodCatGroup._prodcat_XComboBox",prdctry1,0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            type(waitForObject(":_qtyBreakCat_XLineEdit"), "0");
            nativeType("<Tab>");
            type(waitForObject(":_prodCatGroup._discount_XLineEdit"),"2");
            nativeType("<Tab>");
            snooze(0.5);
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating discount type by Product Catageory pricing schedule   for qty break 0:"+e);
            if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
            }
        }
        
        //--Create Discount Percentage for qty break down 100----
        try
        {
            
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            snooze(0.5);
            if(!findObject(":Type.Discount_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Discount_QRadioButton"));
            }
            if(!findObject(":Discount By.Product Category_QRadioButton").checked)
            {
                clickButton(waitForObject(":Discount By.Product Category_QRadioButton"));
            }
            
            waitForObject(":_prodCatGroup._prodcat_XComboBox");
            clickItem(":_prodCatGroup._prodcat_XComboBox",prdctry1,0, 0, 5, Qt.LeftButton);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreakCat_XLineEdit"), "100");
            nativeType("<Tab>");
            type(waitForObject(":_prodCatGroup._discount_XLineEdit"),"5");
            nativeType("<Tab>");
            snooze(0.5);
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating Discount type by Product Catageory pricing schedule Creation  for qty break 100:"+e);
            if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
            }
        }
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
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
    var prcAssg = Prdprcname1 +" - " +Prdprcname1; 
    prcasscust(prdcname1,prcAssg,Prdprcname1);
    //---Create SO----
    var prdsonum1 = createSalesOrder1(dispitem1, 100,prdcname1);
    //---Edit the Sales Order and verify the discount amount applied----
    var uprc = salesunitprice(prdsonum1);
    //---Verifying the UnitPrice----
    if(uprc == listprice*(1-0.05))
    {
        test.pass("Discount percentage by product-catageory applied sucessfully on unit price of SalesOrder");
    }
    else
        test.fail("Error in applying the discount Percentage by product-catageory on SalesOrder unit Ppice");
    
    
    //----Process of Pricing Schedule Assignment By Customer Ship -To----
    
    //---Create New Customer with Ship-to address defined-----
    
    var prdcname2 = "PRDCUST2";
    var shipnum = "STORE2";
    createCustomer(custType,prdcname2,shipnum);
    //---- To avoid unexpected blocks ----
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Pricing Schedule Assignment to customer Ship-to--------
    prcassgship(prdcname2 ,shipnum,prcAssg);
    //---Create SO----
    var prdsonum2 = createSalesOrder1(dispitem1, 100,prdcname2);
    //---Edit the Sales Order to verify the Discount Applied----
    var uprc = salesunitprice(prdsonum2);
    //---Verifying the UnitPrice----
    if(uprc == listprice*(1-0.05))
    {
        test.pass("Discount percentage by product-catageory applied sucessfully on unit price");
    }
    else
        test.fail("Error in applying the discount Percentage");
    
    //---Assigning Pricing Scheudle by selected Customer Type----
    //---Creaste New Customer Type----
    var custType = "CUSTOMER TYPE4";
    
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
    var prdcname3 = "PRDCUST3";
    var custType1 = custType+'-'+custType;
    createCustomer(custType1,prdcname3,shipnum);
    //---Assigning pricing Schedule for the Customer Type-----
    prcAssgCustType(prdcname3,custType1,custType,prcAssg);
    //---Create SO----
    var prdsonum3 = createSalesOrder1(dispitem1, 100,prdcname3);
    //---Edit the Sales Order to verify the Discount Applied----
    var uprc = salesunitprice(prdsonum3);
    //---Verifying the UnitPrice----
    if(uprc == listprice*(1-0.05))
    {
        test.pass("Discount percentage by product-catageory applied sucessfully on unit price of SalesOrder");
    }
    else
        test.fail("Error in applying the discount Percentage by product-catageory on Sales ORder unit price");
    
    snooze(0.5);
    //---Discount by Product catageory using Fixed Amount-------
    //---Create Product Catageory----
    var prdctry = "PRODUCTCAT1";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories", 30, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_stack._category_XLineEdit"),prdctry);
        nativeType("<Tab>");
        type(waitForObject(":_stack._description_XLineEdit"),prdctry);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating Product Catageory:"+e);
    }
    //----Item Creation-----
    var dispitem2 = "DISCITEM4";
    copyItem("YTRUCK1",dispitem2);
    
    //---Edit the Item to obtain List Price----
    var listprice;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        openItemContextMenu(":_list_XTreeWidget_5",dispitem2, 5, 5, Qt.LeftButton); 
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        if(!findObject(":xTuple ERP: *.Item is Sold_QGroupBox").checked)
        {
            clickButton(waitForObject(":xTuple ERP: *.Item is Sold_QGroupBox"));
        }
        var prdctry1 = prdctry +" - " +prdctry;
        waitForObject(":_prodcat_XComboBox_3");
        clickItem(":_prodcat_XComboBox_3",prdctry1,0, 0, 5, Qt.LeftButton);
        listprice = findObject(":Item is Sold._listprice_XLineEdit_2").text;
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("List Price of an Item Obtained sucessfully");
    }
    catch(e)
    {
        test.fail("Error in obtaining List Price:"+e);
    }
    //---Create Item Site for Item---
    createRIS(dispitem2);
    //---Craete New Customer----
    var prdcname4 = "PRDCUST4";
    var shipnum = "STORE1";
    var custType = "NORMAL"+"-"+"Normal Domestic Customers";
    createCustomer(custType,prdcname4,shipnum);
    
    //---- To avoid unexpected blocks ----
    if(OS.name != "Windows")
    {
        doNothing();
    }
    
    //---Discount by Product Catageory using Fixed Amount----
    //---Discount type pricing schedule Creation for an ProductCatageory-----
    var Prdprcname2 ="PRDCTRY PRICING SCHEDULE2 ";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        
        //---Create Discount Per for qty breakdown 0-----
        try
        {
            clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
            type(waitForObject(":GroupBox1._name_XLineEdit"),Prdprcname2);
            nativeType("<Tab>");
            type(waitForObject(":GroupBox1._descrip_XLineEdit"),Prdprcname2);
            nativeType("<Tab>");
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            snooze(0.5);
            if(!findObject(":Type.Discount_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Discount_QRadioButton"));
            }
            if(!findObject(":Discount By.Product Category_QRadioButton").checked)
            {
                clickButton(waitForObject(":Discount By.Product Category_QRadioButton"));
            }
            
            waitForObject(":_prodCatGroup._prodcat_XComboBox");
            clickItem(":_prodCatGroup._prodcat_XComboBox",prdctry1,0, 0, 5, Qt.LeftButton);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreakCat_XLineEdit"), "0");
            nativeType("<Tab>");
            type(waitForObject(":_prodCatGroup._fixedAmtDiscount_XLineEdit"),"2");
            nativeType("<Tab>");
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating Discount type by Product Catageory pricing schedule using fixed amount for qty break 0:"+e);
            if(object.exists(":Pricing Schedule Item.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Item.Cancel_QPushButton"));
            }
        }
        
        //--Create Discount Percentage for qty break down 100----
        try
        {
            
            clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
            snooze(0.5);
            if(!findObject(":Type.Discount_QRadioButton").checked)
            {
                clickButton(waitForObject(":Type.Discount_QRadioButton"));
            }
            if(!findObject(":Discount By.Product Category_QRadioButton").checked)
            {
                clickButton(waitForObject(":Discount By.Product Category_QRadioButton"));
            }
            
            waitForObject(":_prodCatGroup._prodcat_XComboBox");
            clickItem(":_prodCatGroup._prodcat_XComboBox",prdctry1,0, 0, 5, Qt.LeftButton);
            nativeType("<Tab>");
            type(waitForObject(":_qtyBreakCat_XLineEdit"), "100");
            nativeType("<Tab>");
            type(waitForObject(":_prodCatGroup._fixedAmtDiscount_XLineEdit"),"5");
            nativeType("<Tab>");
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating Discount type by Product Catageory pricing schedule Creation using fixed amount for qty break 100:"+e);
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
    var prcAssg = Prdprcname2 +" - " +Prdprcname2; 
    prcasscust(prdcname4,prcAssg,Prdprcname2);
    //---Create SO----
    var prdsonum4 = createSalesOrder1(dispitem2, 100 ,prdcname4);
    
    //---Edit the Sales Order and verify the discount amount calculated----
    var custprc =  salesCustprice(prdsonum4,dispitem2);
    
    //--Verifying the CustomerPrice----
    if(custprc == (listprice-5))
    {
        test.pass("Discount Amount by product-catageory calculated sucessfully on sales Order ");
    }
    else
        test.fail("Error in calculating discount Amount by product-catageory against the Sales Order");
    //----Process of Pricing Schedule Assignment By Customer Ship -To----
    
    //---Create New Customer with Ship-to address defined-----
    
    //---Craete New Customer----
    var prdcname5 = "PRDCUST5";
    var shipnum = "STORE2";
    createCustomer(custType,prdcname5,shipnum);
    //---Pricing Schedule Assignment to customer Ship-to--------
    prcassgship(prdcname5,shipnum,prcAssg);
    //---Create SO----
    var prdsonum5 = createSalesOrder1(dispitem2, 100 , prdcname5);
    //---Edit the Sales Order to verify the Discount Applied----
    var custprc =  salesCustprice(prdsonum5,dispitem2);
    //--Verifying the CustomerPrice----
    if(custprc == (listprice-5))
    {
        test.pass("Discount amount by product-catageory  calculated sucessfully on SalesOrder Created");
    }
    else
        test.fail("Error in calculating the discount Amount by product-catageory  against SalesOrder");
    //---Assigning Pricing Scheudle by selected Customer Type----
    //---Creaste New Customer Type----
    var custType = "CUSTOMER TYPE5";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types", 43, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        snooze(0.5);
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
    //---Create New Customer and assign Customer Type----
    var prdcname6 = "PRDCUST6";
    custType1 = custType+'-'+custType;
    createCustomer(custType1,prdcname6,shipnum);
    //---Assigning pricing Schedule for the Customer Type-----
    prcAssgCustType(prdcname6,custType1,custType,prcAssg);
    //---Create SO----
    var prdsonum6 = createSalesOrder1(dispitem2, 100 ,prdcname6);
    //---Edit the Sales Order to verify the Customer Price Calculated ---
    var cusprc =  salesCustprice(prdsonum6,dispitem2);
    //--Verifying the CustomerPrice----
    if(cusprc == (listprice-5))
    {
        test.pass("Discount amount by product-catageory calculated sucessfully on SalesOrder Created");
    }
    else
        test.fail("Error in calculating the discount Amount by product-catageory against SalesOrder");     
}
