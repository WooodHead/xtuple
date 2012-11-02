//-***-This script doc contains all the common code libraries/functions required by the Main driver script-***-



//--------Login into Appl----------
try
{
    function loginAppl(userrole)
    {
        
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
        
        
        waitForObject(":Log In.Options..._QPushButton_2");
        clickButton(":Log In.Options..._QPushButton_2");
        waitForObject(":_server_QLineEdit");
        if(findObject(":_server_QLineEdit").text!= url)
        {
            findObject(":_server_QLineEdit").text=url;
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
        waitForObject(":Login Options.Save_QPushButton_2");
        clickButton(":Login Options.Save_QPushButton_2");
        waitForObject(":_username_QLineEdit");    
        type(":_username_QLineEdit", username);
        waitForObject(":_username_QLineEdit");
        type(":_username_QLineEdit", "<Tab>");
        waitForObject(":_password_QLineEdit");
        type(":_password_QLineEdit", pwd);
        waitForObject(":_password_QLineEdit");
        type(":_password_QLineEdit", "<Return>");
        try
        {
            waitForObject(":Registration Key.Yes_QPushButton");
            clickButton(":Registration Key.Yes_QPushButton");
        }
        catch(e)
        {
            test.log("Registration key not found");
        }
        test.log("Logged in Application");
        
    }
}
catch(e)
{
    test.fail("Error in logging to application" + e);
}

//--------To Calculate Absolute Value of QOH ----------
try
{
    function replaceSubstring(inputString, fromString, toString) 
    {
        // Goes through the inputString and replaces every occurrence of fromString with toString
        var temp = inputString;
        
        if (fromString == " ") 
        {
            return inputString;
        }
        if (toString.indexOf(fromString) == -1) 
        { // If the string being replaced is not a part of the replacement string (normal situation)
            // while (temp.indexOf(fromString) != -1)
            do
            {
                var toTheLeft = temp.substring(0, temp.indexOf(fromString));
                var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
                temp = toTheLeft + toString + toTheRight;
            }while (temp.indexOf(fromString) != -1); 
        } 
        else
        { // String being replaced is part of replacement string (like "+" being replaced with "++") - prevent an infinite loop
            var midStrings = new Array("~", "`", "_", "^", "#");
            var midStringLen = 1;
            var midString = "";
            // Find a string that doesn't exist in the inputString to be used as an "inbetween" string
            while (midString == "") 
            {
                for (var i=0; i < midStrings.length; i++)
                {
                    var tempMidString = "";
                    for (var j=0; j < midStringLen; j++) 
                    { 
                        tempMidString += midStrings[i]; 
                    }
                    if (fromString.indexOf(tempMidString) == -1)
                    {
                        midString = tempMidString;
                        i = midStrings.length + 1;
                    }
                }
            } // Keep on going until we build an "inbetween" string that doesn't exist
            // Now go through and do two replaces - first, replace the "fromString" with the "inbetween" string
            while (temp.indexOf(fromString) != -1) 
            {
                var toTheLeft = temp.substring(0, temp.indexOf(fromString));
                var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
                temp = toTheLeft + midString + toTheRight;
            }
            // Next, replace the "inbetween" string with the "toString"
            while (temp.indexOf(midString) != -1)
            {
                var toTheLeft = temp.substring(0, temp.indexOf(midString));
                var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
                temp = toTheLeft + toString + toTheRight;
            }
        } // Ends the check to see if the string being replaced is part of the replacement string or not
        return temp; // Send the updated string back to the user
    } // Ends the "replaceSubstring" function
    
}
catch(e)
{
    test.fail("Error in calculating the absolute value of QOH" + e);
}

//----------Find application edition-----

function findApplicationEdition()
{

    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
    activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
    snooze(2);
    
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
  
    waitForObject(":Cash Receipt.Save_QPushButton_3");
    clickButton(":Cash Receipt.Save_QPushButton_3");
    test.log("Application Edition: " + appEdition);
    
    return appEdition;
}
//--------------- Set the window to Tab view mode -------------

function tabView()
{
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
    snooze(.5);
    if(object.exists(":Quotes.Close_QToolButton"))
    {
        test.log("item screen opened");
     activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Window"));
     snooze(.5);
        if(waitForObjectItem(":xTuple ERP:*.Window_QMenu", "Tab View"))
        {
         activateItem(waitForObjectItem(":xTuple ERP:*.Window_QMenu", "Tab View"));
        }
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    }
    catch(e)
    {
        test.fail("exception in changing to Tab view mode" + e);
    }
}
//-----------------To verify the QOH by item-------------


function queryQoh(inputString,site,appE)
{
    try
    {
        if(object.exists(":xTuple ERP: *_QMenuBar"))
        {
            snooze(0.5);
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        }
        else
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
        }
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
        
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand..."));
       
        snooze(1);
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        
        
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Item",10,10,0, Qt.LeftButton);
        waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit");
        type(":_filterGroup.ItemLineEdit_ItemLineEdit", inputString);
        nativeType("<Tab>");
        snooze(1);
        if(appE != "PostBooks")
        {
            snooze(0.5);
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton");
            waitForObject(":_filterGroup.xcomboBox2_XComboBox");
            clickItem(":_filterGroup.xcomboBox2_XComboBox","Site",10,10,0, Qt.LeftButton);
            snooze(0.5);
            if(object.exists(":_filterGroup.widget2_XComboBox"))
                clickItem(":_filterGroup.widget2_XComboBox",site,10,10,0, Qt.LeftButton);
            if(object.exists(":_filterGroup.widget2_WComboBox_2"))
                clickItem(":_filterGroup.widget2_WComboBox_2",site,10,10,0, Qt.LeftButton);
        }
        snooze(0.5);
        
        waitForObject(":Quantities on Hand.Query_QToolButton");
        clickButton(":Quantities on Hand.Query_QToolButton");
        snooze(1);
        waitForObject(":_list.QOH_QModelIndex");
        var qoh=findObject(":_list.QOH_QModelIndex").text;
        var qohi=parseInt(replaceSubstring(qoh,",",""));
        snooze(1);
        waitForObject(":Quantities on Hand.Close_QToolButton");
        clickButton(":Quantities on Hand.Close_QToolButton");
        return qohi;
    }

catch(e)
{
    test.fail("Error in querying QOH by item" + e);
}
}
//-----------------Transfer order-------------
//--------------To adjust QOH of an item -----------


    
    function adjustQoh(item,qty,site,name)
    {
        try
        {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_2");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_2", item);
        snooze(0.5);
        nativeType("<Tab>");
        if(object.exists(":_warehouse_WComboBox_4"))
        {
            waitForObject(":_warehouse_WComboBox_4");
            clickItem(":_warehouse_WComboBox_4", site ,5,5, 0, Qt.LeftButton);
        }
        if(object.exists(":_itemGroup._warehouse_WComboBox"))
        {
            waitForObject(":_itemGroup._warehouse_WComboBox");
            clickItem(":_itemGroup._warehouse_WComboBox", site ,5,5, 0, Qt.LeftButton);
        }
        waitForObject(":_qty_XLineEdit");
        type(":_qty_XLineEdit", qty);
        var trqty=findObject(":_qty_XLineEdit").text;
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
        snooze(0.5);
        if(object.exists(":Enter Miscellaneous Adjustment._lotSerial_XComboBox"))
        {
        type(":Enter Miscellaneous Adjustment._lotSerial_XComboBox", lname);
        if(findObject(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit").enabled)
        {
            type(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit", trqty);
        }
        type(waitForObject(":Create Lot/Serial #.XDateEdit_XDateEdit"), "+365");
           nativeType("<Tab>");
        waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment.OK_QPushButton_2");
        clickButton(":Enter Miscellaneous Adjustment.OK_QPushButton_2");
        }
        if(object.exists(":Distribute Stock To/From Site Locations.Default and Post_QPushButton"))
        {
            clickButton(":Distribute Stock To/From Site Locations.Default and Post_QPushButton");
        }
        waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        return trqty;              
    
}
    catch(e)
    {
        test.fail("Error in adjusting QOH of " + item + e);
        if(object.exists(":Enter Miscellaneous Adjustment.Cancel_QPushButton"))
        {
            clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        }
    }
}        
//-----------To create Transfer order---------
    
    function createTo(toitem,qty,fromsite,tosite)
    {
        try
 
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Transfer Order");
            waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
            activateItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
    
            waitForObject(":_frame.New_QPushButton");
            clickButton(":_frame.New_QPushButton");
   
            var tono=findObject(":_headerPage._orderNumber_XLineEdit").text;
            waitForObject(":_srcWhs_WComboBox");
            clickItem(":_srcWhs_WComboBox", fromsite, 5,5, 0, Qt.LeftButton);
            waitForObject(":_dstWhs_WComboBox");
            clickItem(":_dstWhs_WComboBox", tosite, 5,5, 0, Qt.LeftButton);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
            waitForObject(":_lineItemsPage.New_QPushButton");
            clickButton(":_lineItemsPage.New_QPushButton");
            waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
            type(":_itemGroup.ItemLineEdit_ItemLineEdit", toitem);
            waitForObject(":_qtyOrdered_XLineEdit_3");
            type(":_qtyOrdered_XLineEdit_3", qty);
            waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
            type(":xTuple ERP:*.XDateEdit_XDateEdit", "+7");
            nativeType("<Tab>");
            waitForObject(":Select Order for Billing.Save_QPushButton_2");
            clickButton(":Select Order for Billing.Save_QPushButton_2");
            waitForObject(":Sales Order.Close_QPushButton");
            clickButton(":Sales Order.Close_QPushButton");
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            return tono;
        }
    
  catch(e)
    {
        test.fail("Error in creating transfer order for "+ toitem + e);
    }
}

//----------------Issue stock--------------
    
 function issueStock(tonum)
{
    try
    {
        var lotno="0";           
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit",tonum); 
        nativeType("<Tab>");
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        
        if(object.exists(":_itemloc.Yes_QModelIndex_4"))
        {
            doubleClick(":_itemloc.Yes_QModelIndex_4", 3, 4, 0, Qt.LeftButton);
            waitForObject(":Issue to Shipping.Distribute_QPushButton");
            clickButton(":Issue to Shipping.Distribute_QPushButton");
            waitForObject(":Issue to Shipping.Post_QPushButton");
            clickButton(":Issue to Shipping.Post_QPushButton");
        }
        else if(object.exists(":_itemloc.No_QModelIndex_3"))
        {
            lotno = findObject("{column='3' container=':_frame._itemloc_XTreeWidget_3' type='QModelIndex'}").text;
            waitForObject(":_itemloc.No_QModelIndex_3");
            doubleClick(":_itemloc.No_QModelIndex_3", 3, 4, 0, Qt.LeftButton);
            
            waitForObject(":Issue to Shipping.Distribute_QPushButton");
            clickButton(":Issue to Shipping.Distribute_QPushButton");
            waitForObject(":Issue to Shipping.Post_QPushButton");
            clickButton(":Issue to Shipping.Post_QPushButton");
            
        }    
        
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
        if(object.exists(":groupBox.Select for Billing_QCheckBox"))
        {
            if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
                clickButton(":groupBox.Select for Billing_QCheckBox");
            if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
                clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
        }
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        return lotno;
    }
    catch(e)
    {
        test.fail("Error in issuing stock to transfer order for regular item" + e);
    }  
    
}
  //----------costing----------------
 function copyItem(sourceitem,targetitem)
{
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
       
       waitForObject(":_list_XTreeWidget_3");
       clickItem(":_list_XTreeWidget_3", sourceitem, 0, 0, 5, Qt.LeftButton);
       openItemContextMenu(":_list_XTreeWidget_3", sourceitem, 5, 5, Qt.LeftButton);
       waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
       activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
       
       waitForObject(":_targetItemNumber_XLineEdit_2");
       type(":_targetItemNumber_XLineEdit_2", targetitem);
       
       if(findObject(":Copy Item.Copy Item Costs_QCheckBox").checked)
       {
           clickButton(":Copy Item.Copy Item Costs_QCheckBox");
       }
       if(!findObject(":Copy Item.Copy Bill of Materials_QCheckBox").checked)
       {
           clickButton(":Copy Item.Copy Bill of Materials_QCheckBox");
       }
       if(object.exists(":Copy Item.Copy Bill of Operations_XCheckBox"))
       {
           if(!findObject(":Copy Item.Copy Bill of Operations_XCheckBox").checked)
           {
               clickButton(":Copy Item.Copy Bill of Operations_XCheckBox");
           }
           if(!findObject(":Copy Item.Copy Used At Operation_XCheckBox").checked)
           {
               clickButton(":Copy Item.Copy Used At Operation_XCheckBox");
           }
       }
       waitForObject(":Items.Copy_QPushButton");
       clickButton(":Items.Copy_QPushButton");
       
       waitForObject(":Sales Order.No_QPushButton");
       clickButton(":Sales Order.No_QPushButton");
       snooze(1);
       if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+targetitem+"' type='QModelIndex'}"))
           test.pass("Item " + targetitem +" created");
       else
           test.fail("Item creation failed");
       
       waitForObject(":Quotes.Close_QToolButton");
       clickButton(":Quotes.Close_QToolButton");
   }
   catch(e)
   {
       test.fail("Exception in creating Item " + e);
       if(object.exists(":Quotes.Close_QToolButton"))
           clickButton(":Quotes.Close_QToolButton");
   }
}
 //------------Create Regular Item Site----------
function createRIS(item)
{
    try
   {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "New...");
        activateItem(":_QMenu", "New...");
        
        waitForObject(":Item Site.ItemLineEdit_ItemLineEdit");
        type(":Item Site.ItemLineEdit_ItemLineEdit", item);
        nativeType("<Tab>");
        snooze(0.5);
        if(object.exists(":_warehouse_WComboBox_2"))
        {
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        if(!findObject(":Items.Site can manufacture this Item_QGroupBox"))
        {
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        }
        if(findObject(":Item Site.Site can purchase this Item_QGroupBox"))
        {
            type(":Item Site.Site can purchase this Item_QGroupBox", " ");
        }
        
        snooze(0.5);
        waitForObject(":Control._controlMethod_XComboBox_2");
        clickItem(":Control._controlMethod_XComboBox_2", "Regular", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2", "MRP-MRP Items", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2", "FINISHED-Finished Product - WH1", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
        }
        test.log("Item site created for item");
   }
    catch(e)
    {
        test.fail("Exception in creating Itemsite for "+item+e);
    }
}
//----- Do nothing ------
    function doNothing()
    {
        try{
             activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
    activateItem(waitForObjectItem(":xTuple ERP:  *.System_QMenu", "Setup..."));
    test.log("1st block");
        clickButton(waitForObject(":Setup.Cancel_QPushButton"));
}
        catch(e)
        {
            if(object.exists(":Setup.Cancel_QPushButton"))
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
         try{
             activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
    activateItem(waitForObjectItem(":xTuple ERP:  *.System_QMenu", "Setup..."));
    test.log("2nd block");
        clickButton(waitForObject(":Setup.Cancel_QPushButton"));
}
        catch(e)
        {
            if(object.exists(":Setup.Cancel_QPushButton"))
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
    }
//-----------------------Verify GL entries-----------
function verifyGL(reference)
{
    try
    {
        snooze(3);
    if(object.exists(":xTuple ERP: *_QMenuBar"))
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    }
    else
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    }
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        activateItem(":xTuple ERP: *.Reports_QMenu", "Transactions...");
        
        snooze(1);
        if(!(object.exists(":xTuple ERP:*.XDateEdit_XDateEdit")))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
       
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit","0");
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
       
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit","0");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_GlTree = findObject(sWidgetTreeControl);
        var totalcount = obj_GlTree.topLevelItemCount;
        for(var y=0;y<totalcount;y++)
        {
            var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(y);
            var sNameOfRootItem = obj_TreeTopLevelItem.text(4);
            var bool = reference.test(sNameOfRootItem);
            if(bool)
            {    
                break;
            }
            
        }
        if(bool)
            test.pass("G/L entry is verified ");
        else
            test.fail("No G/L Entry made");
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
    }
    catch(e)
    {
        test.fail("Exception in verifying GL entry" + e);
    }
}
//------------------RA processing------------
//------------------Create Return Authorization-----------

function createRA(raData)
{
    try
    {
        var flag = 1;    
        var count = raData.length;
        
        lineItemCount = (count-3)/3;
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "New...");
        activateItem(":xTuple ERP:*.Return_QMenu", "New...");
        
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_headerPage._disposition_XComboBox");
        clickItem(":_headerPage._disposition_XComboBox",raData[0], 0, 0, 5, Qt.LeftButton);
        waitForObject(":_headerPage._timing_XComboBox");
        clickItem(":_headerPage._timing_XComboBox",raData[1], 0, 0, 5, Qt.LeftButton);
        waitForObject(":_headerPage._creditBy_XComboBox");
        clickItem(":_headerPage._creditBy_XComboBox",raData[2], 0, 0, 5, Qt.LeftButton);
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        
        for(var i=1;i<=lineItemCount;i++)
        {
            j = i*3;    
            waitForObject(":_lineItemsPage.New_QPushButton");
            clickButton(":_lineItemsPage.New_QPushButton");
            waitForObject(":groupBox.ItemLineEdit_ItemLineEdit");
            type(":groupBox.ItemLineEdit_ItemLineEdit", raData[j]);
            nativeType("<Tab>");
            waitForObject(":_warehouse_WComboBox_5");
            clickItem(":_warehouse_WComboBox_5","WH1", 0, 0, 5, Qt.LeftButton);
            
            waitForObject(":_qtyAuth_XLineEdit");
            type(":_qtyAuth_XLineEdit", raData[j+1]);
            
            if(raData[2] != "None")
            {   
                waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
                type(":Cash Receipt.XLineEdit_XLineEdit_2", raData[j+2]);
                nativeType("<Tab>");
            }
            
            if(raData[0] == "Replace"|raData[0] == "Service"| raData[0] == "Substitute")
            {
                waitForObject(":_schedGroup.XDateEdit_XDateEdit");
                type(":_schedGroup.XDateEdit_XDateEdit", "+7");
                nativeType("<Tab>");
            }
        }
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        return flag;
    }
    catch(e)
    {   flag = 0;
        test.fail("Exception in creating RA" + e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":xTuple ERP:*.Cancel_QPushButton"))
            clickButton(":xTuple ERP:*.Cancel_QPushButton");
        return flag
    }
}

//--------------Process payment for a Return Authorization-------
function processPayment(RANUM)
{
    try
    {   
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "Workbench...");
        activateItem(":xTuple ERP:*.Return_QMenu", "Workbench...");
        
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Due Credit");
        if(!findObject(":_dueCredit.Credit Memo_XCheckBox").checked)
        {
            clickButton(":_dueCredit.Credit Memo_XCheckBox");
        }
        if(!findObject(":_dueCredit.Check_XCheckBox").checked)
        {
            clickButton(":_dueCredit.Check_XCheckBox");
        }
        if(!findObject(":_dueCredit.Credit Card_XCheckBox").checked)
        {
            clickButton(":_dueCredit.Credit Card_XCheckBox");
        }
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        snooze(0.5);
        waitForObject(":_dueCredit._radue_XTreeWidget");
        clickItem(":_dueCredit._radue_XTreeWidget",RANUM, 0, 0, 5, Qt.LeftButton);
        waitForObject(":_dueCredit.Process_QPushButton");
        clickButton(":_dueCredit.Process_QPushButton");
        
        snooze(1);
        waitForObject(":New Credit Memo Created_QMessageBox");
        var messageText = findObject(":New Credit Memo Created_QMessageBox").text;
        var patt = /\d{5}$/;
        var memoNum = patt.exec(messageText);
        test.log("Credit Memo number "+memoNum+"");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        snooze(1);
        if(object.exists(":Select Order for Billing.Save_QPushButton"))
        {
            clickButton(":Select Order for Billing.Save_QPushButton");
        }
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
        return memoNum;
    }
    catch(e)
    {
        test.fail("Exception in processing the RA payment" + e);
    }
}

//----------------Create and post item receipt------------

function postReceipt(RANUM)
{
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit",RANUM);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in posting receipt: " + e);
    }
}

//--------------Verify RA --------

function verifyRa(RANUM)
{
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
    waitForObjectItem(":xTuple ERP:*.Return_QMenu", "List Open...");
    activateItem(":xTuple ERP:*.Return_QMenu", "List Open...");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":_frame._ra_XTreeWidget");
    var raWidget,count,topItem,i,flag;
    flag = 0;
    raWidget = findObject(":_frame._ra_XTreeWidget");
    count = raWidget.topLevelItemCount;
    for(i=0;i<count;i++)
    {   
        topItem = raWidget.topLevelItem(i);
        if(topItem.text(0) == RANUM)
        {
            flag = 1;
            break;
        }
        
    }
    waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");
    return flag;
}
//-------------Verify Payment-----------

function verifyPayment(RANUM)
{
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "Workbench...");
        activateItem(":xTuple ERP:*.Return_QMenu", "Workbench...");
        
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Due Credit");
        if(!findObject(":_dueCredit.Credit Memo_XCheckBox").checked)
        {
            clickButton(":_dueCredit.Credit Memo_XCheckBox");
        }
        if(!findObject(":_dueCredit.Check_XCheckBox").checked)
        {
            clickButton(":_dueCredit.Check_XCheckBox");
        }
        if(!findObject(":_dueCredit.Credit Card_XCheckBox").checked)
        {
            clickButton(":_dueCredit.Credit Card_XCheckBox");
        }
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        
        var raWidget,count,topItem,i,flag;
        flag = 0;
        raWidget = findObject(":_dueCredit._radue_XTreeWidget");
        count = raWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {   
            topItem = raWidget.topLevelItem(i);
            if(topItem.text(0) == RANUM)
            {
                flag = 1;
                break;
            }
            
        }
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        return flag;
    }
    catch(e)
    {
        test.fail("Exception in verifying payment" + e);
    }
}
//----------Verify Work order creation--------

function verifyWO(SONUM)
{
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_3", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu_3", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        WONUM = SONUM + "-1";   
        waitForObject(":_list_XTreeWidget_3");
        var raWidget,count,topItem,i,flag;
        flag = 0;
        woWidget = findObject(":_list_XTreeWidget_3");
        count = woWidget.topLevelItemCount;
        for(i=0;i<count;i++)
        {   
            topItem = woWidget.topLevelItem(i);
            if(topItem.text(1) == WONUM)
            {
                flag = 1;
                break;
            }
            
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
        return flag;
    }
    catch(e)
    {
        test.fail("Exception in verifying Work order number" + e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
}

//-----------Release work orders---------

function releaseWorkOrders()
{
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
        activateItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "+30");
        nativeType("<Tab>");
        waitForObject(":_dateGroup.by Start Date_QRadioButton");
        clickButton(":_dateGroup.by Start Date_QRadioButton");
        waitForObject(":_warehouse.All Sites_QRadioButton_2");
        clickButton(":_warehouse.All Sites_QRadioButton_2");
        waitForObject(":Release Work Orders by Planner Code.Release_QPushButton");
        clickButton(":Release Work Orders by Planner Code.Release_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in releasing work orders " + e);
    }
}
//------Post Production of a work order----------
function postProduction(WONUM)
{
    try
    {
        //Post production
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit", WONUM);
        nativeType("<Tab>");
        if(!findObject(":_optionsGroup.Backflush Materials_XCheckBox"))
            clickButton(":_optionsGroup.Backflush Materials_XCheckBox");
        if(!findObject(":_optionsGroup.Backflush Operations_XCheckBox"))
            clickButton(":_optionsGroup.Backflush Operations_XCheckBox");
        
        waitForObject(":_qty_XLineEdit_2");
        type(":_qty_XLineEdit_2", "100");
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        
        if(object.exists(":_itemloc.No_QModelIndex_3"))
        {
            waitForObject(":_itemloc.No_QModelIndex_3");
            doubleClick(":_itemloc.No_QModelIndex_3", 3, 4, 0, Qt.LeftButton);
            
            waitForObject(":Issue to Shipping.Distribute_QPushButton");
            clickButton(":Issue to Shipping.Distribute_QPushButton");
            waitForObject(":Issue to Shipping.Post_QPushButton");
            clickButton(":Issue to Shipping.Post_QPushButton");
            
        }  
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in post production of work order" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
}
//To verify the post production of a work order
function verifyProduction(WONUM)
{
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_3", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu_3", "Work Order Schedule");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        var wo_Tree = findObject(":_list_XTreeWidget_3");
        var wo_count = wo_Tree.topLevelItemCount;
        var wo_item
                for(i=0;i<wo_count;i++)
        {
            wo_item = wo_Tree.topLevelItem(i);
            if(wo_item.text(1) == WONUM)
            {
                if(wo_item.text(9) == 100)
                    test.pass("post production performed successfully");
                else
                    test.fail("post production is not successful");
            }
        }
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in processing the work order " + e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
}
 //---------Verify Sales order generation---------------

function verifySO(RANUM,SONUM)
{
 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Return");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Return");
        waitForObjectItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Return_QMenu", "List Open...");
        waitForObject(":_frame._ra_XTreeWidget");
        clickItem(":_frame._ra_XTreeWidget", RANUM, 10, 8, 0, Qt.LeftButton);
        
        waitForObject(":_frame.Edit_QPushButton");
        clickButton(":_frame.Edit_QPushButton");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._raitem_XTreeWidget");
        var obj_tree = findObject(":_lineItemsPage._raitem_XTreeWidget");
        var obj_treeItem = obj_tree.topLevelItem(0);
        var string = obj_treeItem.text(21);
        
        if(string == SONUM+"-1")
        {
            flag = 1;
        }
        else
        {
            flag = 0;
        }
        waitForObject(":xTuple ERP:*.Close_QPushButton");
        clickButton(":xTuple ERP:*.Close_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        return flag;
    }
    catch(e)
    {
        test.fail("Exception in verifying Sales order number" + e);
    }
}


//------- Work Order creation ---------
try{
    function createWorkOrder(item, woqty)
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Work Order Schedule");
        snooze(0.5);
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", item);
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", woqty);
        nativeType("<Tab>");
        nativeType("<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+0");     
        
        nativeType("<Tab>");
        var  wonumber = findObject(":xTuple ERP:*._woNumber_XLineEdit").text;
        //  var woqty = findObject(":_qtyGroup._qty_XLineEdit").text;
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+wonumber+"' type='QModelIndex'}"))
            test.pass(""+wonumber+" Work Order is created successfully for  "+item+"");
        else  
            test.fail(""+wonumber+" Work Order is not created for  "+item+"");
        snooze(1);   
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
        return wonumber;
        
    }
}
catch(e)
{
    test.fail("Error in creating WO for "+item+""+ e );
}
//--- Issue Material By Item to the WO
try{
    function issueItem(wonumber, item, appE)
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Issue Material");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Issue Material");
        waitForObjectItem(":xTuple ERP:*.Issue Material_QMenu", "Item...");
        activateItem(":xTuple ERP:*.Issue Material_QMenu", "Item...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
        mouseClick(":_woGroup.VirtualClusterLineEdit_WoLineEdit", 65, 7, 0, Qt.LeftButton);
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit", wonumber);
        
        nativeType("<Tab>");
        
        waitForObject(":_componentGroup._itemNumber_XComboBox");
        if(appE != "PostBooks")
        {
        if(item == "YPAINT1")
        {
            clickItem(":_componentGroup._itemNumber_XComboBox",item,0, 0, 5, Qt.LeftButton); 
            
            waitForObject(":Issue Work Order Material Item.Post_QPushButton");
            clickButton(":Issue Work Order Material Item.Post_QPushButton");
            waitForObject(":_frame._itemloc_XTreeWidget");
            mouseClick(":_frame._itemloc_XTreeWidget", 70, 8, 0, Qt.LeftButton);
            waitForObject(":Issue to Shipping.Distribute_QPushButton");
            clickButton(":Issue to Shipping.Distribute_QPushButton");
            waitForObject(":Issue to Shipping.Distribute_QPushButton");
            clickButton(":Issue to Shipping.Distribute_QPushButton");
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            
        }
        else
        {
            //waitForObject(":_componentGroup._itemNumber_XComboBox");
            clickItem(":_componentGroup._itemNumber_XComboBox",item,0, 0, 5, Qt.LeftButton); 
            waitForObject(":Issue Work Order Material Item.Post_QPushButton");
            clickButton(":Issue Work Order Material Item.Post_QPushButton");
            //    waitForObject(":Select Order for Billing.Close_QPushButton");
            //   clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
        else
        {
              clickItem(":_componentGroup._itemNumber_XComboBox",item,0, 0, 5, Qt.LeftButton); 
            waitForObject(":Issue Work Order Material Item.Post_QPushButton");
            clickButton(":Issue Work Order Material Item.Post_QPushButton");
        }
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log(" "+item+" is issued successfully for  the "+wonumber+" work order");
    }
}

catch(e)
{
    test.fail("Error in issuing "+item+" to the "+wonumber+" work order");
}


//------ issue material by batch to a work order of a regular item-----
try{
    function issueBatch(wonumber1, woitem, appE)
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Issue Material");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Issue Material");
        waitForObjectItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
        activateItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_4");
        mouseClick(":_woGroup.VirtualClusterLineEdit_WoLineEdit_4", 38, 11, 0, Qt.LeftButton);
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_4");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_4", wonumber1);
        nativeType("<Tab>"); 
        waitForObject(":_frame._womatl_XTreeWidget");
        if(object.exists("{column='0' container=':_frame._womatl_XTreeWidget' text='TBODY1' type='QModelIndex'}" && "{column='5' container=':_frame._womatl_XTreeWidget' occurrence='2' text='100.00' type='QModelIndex'}"))
            test.pass("Work Order's material (TBODY1)found and Qty required is correct");
        else  
            test.fail("Work Order's material(TBODY1) is not found or  Qty required is incorrect"); 
        snooze(1);
        waitForObject(":_frame._womatl_XTreeWidget");
        if(object.exists("{column='0' container=':_frame._womatl_XTreeWidget' text='TSUB1' type='QModelIndex'}" && "{column='5' container=':_frame._womatl_XTreeWidget' occurrence='2' text='100.00' type='QModelIndex'}"))
            test.pass("Work Order's material (TSUB1)found and Qty required is correct");
        else  
            test.fail("Work Order's material(TSUB1) is not found or  Qty required is incorrect"); 
        snooze(1);
        
        waitForObject(":_frame._womatl_XTreeWidget");
        if(object.exists("{column='0' container=':_frame._womatl_XTreeWidget' text='TWHEEL1' type='QModelIndex'}" && "{column='5' container=':_frame._womatl_XTreeWidget' text='400.00' type='QModelIndex'}"))
            test.pass("Work Order's material (TWHEEL1)found and Qty required is correct");
        else  
            test.fail("Work Order's material(TWHEEL1) is not found or  Qty required is incorrect"); 
        snooze(1);
        waitForObject(":_frame._womatl_XTreeWidget");
        if (woitem == "YTRUCK1")
        {
            
            if(object.exists("{column='0' container=':_frame._womatl_XTreeWidget' text='YPAINT1' type='QModelIndex'}" && "{column='5' container=':_frame._womatl_XTreeWidget' text='1.00' type='QModelIndex'}"))
                test.pass("Work Order's material (YPAINT1)found and Qty required is correct");
            else  
                test.fail("Work Order's material(YPAINT1) is not found or  Qty required is incorrect"); 
            snooze(1);
            
        } else if(woitem == "WTRUCK1")
        {
            if(object.exists("{column='0' container=':_frame._womatl_XTreeWidget' text='WPAINT1' type='QModelIndex'}" && "{column='5' container=':_frame._womatl_XTreeWidget' text='1.00' type='QModelIndex'}"))
                test.pass("Work Order's material (WPAINT1)found and Qty required is correct");
            else  
                test.fail("Work Order's material(WPAINT1) is not found or  Qty required is incorrect"); 
            snooze(1);
        }
        waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
        clickButton(":Issue Work Order Material Batch.Post_QPushButton");
        if (appE != "PostBooks")
        {
        waitForObject(":_frame._itemloc_XTreeWidget_3");
        mouseClick(":_frame._itemloc_XTreeWidget_3", 66, 9, 0, Qt.LeftButton);
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        waitForObject(":Issue to Shipping.Distribute_QPushButton");
        clickButton(":Issue to Shipping.Distribute_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        test.log("Materials are Issued by batch successfully ")
            }
                waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
    }
}

catch(e)
{
    test.fail("Error in issuing the materials by batch to the Work Order "+e);
}




//-------- Post Operations -------
try{
    function postOperations(wonumber, woqty)
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Operation...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_2", wonumber);
        nativeType("<Tab>");
        waitForObject(":_operationGroup._wooper_XComboBox");
        clickItem(":_operationGroup._wooper_XComboBox","20 - Standard Paint Operation ",0, 0, 5, Qt.LeftButton); 
        waitForObject(":_qty_XLineEdit_2").clear();
        type(":_qty_XLineEdit_2", woqty);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        nativeType("<Tab>");
        waitForObject(":_operationGroup._wooper_XComboBox");
        clickItem(":_operationGroup._wooper_XComboBox","30 - Standard Operation - Assembly Assembly",0, 0, 5, Qt.LeftButton);
        waitForObject(":_qty_XLineEdit_2");
        type(":_qty_XLineEdit_2", woqty);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        nativeType("<Tab>");
        waitForObject(":_operationGroup._wooper_XComboBox");
        clickItem(":_operationGroup._wooper_XComboBox","40 - SHIPPING ",0, 0, 5, Qt.LeftButton); 
        waitForObject(":_qty_XLineEdit_2");
        type(":_qty_XLineEdit_2", woqty);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("All Operations are posted successfully for "+wonumber+" WO");
        
    }
}
catch(e)
{
    test.fail("Error in performing Post Operations for the "+wonumber+" work order");
}

//-------- Correcting the Post Operations of a WO ---------------
try{
    function correctOperations(wonumber, crtqty)
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Correct Operation Posting...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Correct Operation Posting...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_5");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_5", wonumber);
        nativeType("<Tab>");
        waitForObject(":_operationGroup._wooper_XComboBox_2");
        clickItem(":_operationGroup._wooper_XComboBox_2","20 - Standard Paint Operation ",0, 0, 5, Qt.LeftButton); 
        mouseClick(":_qty_XLineEdit_3", 48, 11, 0, Qt.LeftButton);
        waitForObject(":_qty_XLineEdit_3");
        type(":_qty_XLineEdit_3", crtqty);
        nativeType("<Tab>")
                waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        test.log("Paint Operation corrected by "+crtqty+"  for the "+wonumber+" WO successfully");
        waitForObject(":_operationGroup._wooper_XComboBox_2");
        clickItem(":_operationGroup._wooper_XComboBox_2","30 - Standard Operation - Assembly Assembly",0, 0, 5, Qt.LeftButton);
        waitForObject(":_qty_XLineEdit_3");
        type(":_qty_XLineEdit_3", crtqty);
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        test.log("Assembly operation corrected by "+crtqty+"  for the "+wonumber+" WO successfully");
        waitForObject(":_operationGroup._wooper_XComboBox_2");
        clickItem(":_operationGroup._wooper_XComboBox_2","40 - SHIPPING ",0, 0, 5, Qt.LeftButton);
        waitForObject(":_qty_XLineEdit_3");
        type(":_qty_XLineEdit_3", crtqty);
        nativeType("Tab");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        test.log("Shipping operation corrected by "+crtqty+"  for the "+wonumber+" WO successfully");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
        
    }
}
catch(e)
{
    test.fail("Error in performing Post Operations for the "+wonumber+" work order");
}
//------ Post Production of a WO after issuing the  materials-------
try{ 
    function postProductionim(wonumber, woqty, appE)
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Post Production...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3");
        mouseClick(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3", 36, 14, 0, Qt.LeftButton);
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_3", wonumber);
        nativeType("<Tab>");
//        if(!findObject(":_optionsGroup.Backflush Materials_XCheckBox_2").checked)
//            clickButton(":_optionsGroup.Backflush Materials_XCheckBox_2");
        if(appE == "Manufacturing")
        {
        if(!findObject(":_optionsGroup.Backflush Operations_XCheckBox").checked)
            clickButton(":_optionsGroup.Backflush Operations_XCheckBox");
    }
        if(findObject(":_optionsGroup.Close Work Order after Posting_XCheckBox").checked)
            clickButton(":_optionsGroup.Close Work Order after Posting_XCheckBox");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", woqty);
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log(""+wonumber+" Work Order posted successfully for a Qty of "+woqty+" ");
    }
}
catch(e)
{
    test.fail("Error in posting the "+wonumber+" WO");
}

//------- Correcting the Post production of a WO --------
try
{
    function correctProduction(wonumber, crtqty, appE)
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Correct Production Posting...");
        activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Correct Production Posting...");
        waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit");
        mouseClick(":groupBox.VirtualClusterLineEdit_WoLineEdit", 20, 6, 0, Qt.LeftButton);
        waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit");
        type(":groupBox.VirtualClusterLineEdit_WoLineEdit", wonumber);
        snooze(1);
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", crtqty);
        
        nativeType("<Tab>");
        waitForObject(":_optionsGroup.Backflush Materials_XCheckBox");
        if(!findObject(":_optionsGroup.Backflush Materials_XCheckBox").checked)
            clickButton(":_optionsGroup.Backflush Materials_XCheckBox");
        if(appE == "Manufacturing")
        {
        waitForObject(":_optionsGroup.Backflush Operations_XCheckBox_2");
        if(!findObject(":_optionsGroup.Backflush Operations_XCheckBox_2").checked)
            clickButton(":_optionsGroup.Backflush Operations_XCheckBox_2");
    }
        waitForObject(":Correct Production Posting.Post_QPushButton");
        clickButton(":Correct Production Posting.Post_QPushButton");
        test.log("Post Production of "+wonumber+" workorder is corrected successfully");
        snooze(1);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
}
catch(e)
    {
    test.fail("Error in Post Production of "+wonumber+" workorder is corrected successfully"+e);
    }



//------------G/L transaction verification ------
try
{
    function glTransactions(pat, docnum)
    {
        
        var flag1 = 0;
         if(object.exists(":xTuple ERP: *_QMenuBar"))
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    }
    else
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    }
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
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit",docnum);   
        
        
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        
      
        waitForObject(":_list_XTreeWidget_3");
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var obj = obj_TreeWidget.topLevelItemCount;
        for(var i=0;i<obj;i++)
        {
            var obj_TreeTopLevelItem = obj_TreeWidget.topLevelItem(i);
            var sNameOfRootItem = obj_TreeTopLevelItem.text(4);
            var bool = pat.test(sNameOfRootItem);
            if(bool)
            {    
                break;
            }
            
        }
        if(bool)
            flag1 = 1;
        else
            flag1 = 0;
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        return flag1;
    }
}
catch(e)
{
    test.fail("Error in verifying G/L transaction after receiving PO" + e);
}

//-------- Removing ',' from the value ----
function replaceSubsting(string)
    {
    //var string = "17,000.00";
    var arr = string.toString();
  // test.log(arr[0]);
    var reg = /,/gi;
    var newstring = arr.replace(reg,"");
    return newstring;
}
//-------- Sales Order creation ------------
try
{
    function createSalesOrder(item, qty)
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
        snooze(0.5);
        nativeType("<Tab>");
        
        waitForObject(":_headerPage._custPONumber_XLineEdit_2");
        type(":_headerPage._custPONumber_XLineEdit_2", "103");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        sonumber = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", item);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit_2");
        findObject(":_qtyOrdered_XLineEdit_2").clear();
        type(":_qtyOrdered_XLineEdit_2", qty);
        
        soitem = findObject(":_itemGroup.ItemLineEdit_ItemLineEdit").text;
        
        soqty = findObject(":_qtyOrdered_XLineEdit_2").text;
        
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+sonumber+"' type='QModelIndex'}"))
            test.pass("Sales Order creation successful");
        else  
            test.fail("Sales Order creation failed");            
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        return sonumber;
    }
}
catch(e)
{
    test.fail("Error in creating a sales order" + e);
}

//-------Credit Card (Discover type) Creation -------
try{
    function createCreditCard()
    {
        waitForObject(":_creditCardPage.New_QPushButton");
        clickButton(":_creditCardPage.New_QPushButton");
        waitForObject(":Credit Card._fundsType2_XComboBox");
         clickItem(":Credit Card._fundsType2_XComboBox","Discover",0, 0, 5, Qt.LeftButton);
//        mouseClick(":Credit Card._fundsType2_XComboBox", 189, 6, 0, Qt.LeftButton);
//        waitForObject(":_fundsType2.Visa_QModelIndex");
//        mouseClick(":_fundsType2.Visa_QModelIndex", 150, 5, 0, Qt.LeftButton);
        waitForObject(":_creditCardNumber_XLineEdit");
        mouseClick(":_creditCardNumber_XLineEdit", 104, 15, 0, Qt.LeftButton);
        waitForObject(":_creditCardNumber_XLineEdit");
        type(":_creditCardNumber_XLineEdit", "6011000000000012");
        waitForObject(":xTuple ERP:*.Active_QCheckBox");
        if(!findObject(":xTuple ERP:*.Active_QCheckBox").checked)
            clickButton(":xTuple ERP:*.Active_QCheckBox");
        waitForObject(":_name_XLineEdit");
        type(":_name_XLineEdit", "ZEN QA");
         waitForObject(":Cash Receipt.XLineEdit_XLineEdit");
    type(":Cash Receipt.XLineEdit_XLineEdit", "<Tab>");
        waitForObject(":_name_XLineEdit");
        mouseClick(":_name_XLineEdit", 55, 5, 0, Qt.LeftButton);
        nativeType("<Tab>");
        waitForObject(":_expireMonth_XLineEdit");
        type(":_expireMonth_XLineEdit", "11");
        nativeType("<Tab>");
        waitForObject(":_expireYear_XLineEdit");
        type(":_expireYear_XLineEdit", "2025");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
    clickButton(":Select Order for Billing.Save_QPushButton_2");
     if(object.exists(":Third Address Line Ignored_QMessageBox"))
      {           
          waitForObject(":Sales Order.Yes_QPushButton");
          clickButton(":Sales Order.Yes_QPushButton");
         
      }

        test.log("New Credit Card of type 'Discover' created for TTOYS");
    }
}
catch(e)
{
    test.fail("Error in creating a Credit Card of type 'Visa'"+e);
}
//------ finding the Credit Memo number created on charging the SO ------
try{
    function creditMemoNum()
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup..."));
    clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Accounts Receivable");		snooze(0.5);
    var cmnum = findObject(":_nextARMemoNumber_XLineEdit").text;
   
    clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
            test.log("Credit Memo created on charging the SO and the number is "+cmnum+"");
        return cmnum;
    }
}
    catch(e)
    {
        test.fail("Error in finding the Credit Card number"+e);
    }
    //----Verifying Credit Memo existance ........
    try{
        function findCreditMemo(cmnum)
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
            waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
            activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
            waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
            activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
            waitForObjectItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
            activateItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
            waitForObject(":xTuple ERP:*._aropen_XTreeWidget");
            if(object.exists("{column='0' container=':xTuple ERP:*._aropen_XTreeWidget' text='"+cmnum+"' type='QModelIndex'}"))
                test.fail("Credit Memo not closed ");
            else  
                test.pass("Credit Memo  closed successfully ");
            snooze(1);      
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
        }
    }
    catch(e)
    {
        test.fail("Error in verifying the Credit Memo existance"+e);
    }
    
    //***** Accounting process flow ******
    
  //-------Create Purchase order -----------
   try{
        function createPO(vendor,item,qty)
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open..."));
            clickButton(waitForObject(":Quotes.New_QToolButton"));
            type(waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit"), vendor);
            
            nativeType("<Tab>");
            clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
            clickButton(waitForObject(":_lineItemsPage.New_QPushButton"));
            var ponumber = findObject(":Purchase Order Item._QLabel").text;
            type(waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit"), item);
            nativeType("<Tab>");
            type(waitForObject(":_ordered_XLineEdit"), qty);
            nativeType("<Tab>");
            findObject(":_schedGroup.XDateEdit_XDateEdit").clear();
            type(waitForObject(":_schedGroup.XDateEdit_XDateEdit"), "+1");
            nativeType("<Tab>");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            clickButton(waitForObject(":Invalid Unit Price.Continue_QPushButton"));
            if(object.exists(":Invalid Due Date .Continue_QPushButton"))
            {
               clickButton(":Invalid Due Date .Continue_QPushButton");
           }
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
            test.pass("Purchase order created:" + ponumber);
            return ponumber;
        }
    }
   catch(e)
   {
       test.fail("Exception in creating purchase order" + e);
   }
   //---------Create and post a PO receipt--------
    try
    {
        function createPoReceipt(ponumber)
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt..."));
            mouseClick(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit"), 46, 12, 0, Qt.LeftButton);
            type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit"), ponumber);
            nativeType("<Tab>");
            clickButton(waitForObject(":_frame.Receive All_QPushButton"));
            clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            test.pass("Receipt created and posted successfully for PO# " + ponumber);
        }
    }
    catch(e)
    {
        test.fail("Exception in creating and posting the receipt" + e);
    }

    
    //------ Create and post voucher ------
    
    try
    {
        function createVoucher(ponumber,vinvoice)
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New..."));
            mouseClick(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit"), 37, 12, 0, Qt.LeftButton);
            type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit"), ponumber);
            nativeType("<Tab>");
            
            
            clickItem(":_poitems._poitem_XTreeWidget", "1", 10, 10, 0, Qt.LeftButton);
            clickButton(waitForObject(":_poitems.Distribute Line_QPushButton"));
            
            var sWidgetTreeControl = ":_poitems._poitem_XTreeWidget";
            
            waitForObject(sWidgetTreeControl);
            var obj_GlTree = findObject(sWidgetTreeControl);
            var obj_TreeTopLevelItem = obj_GlTree.topLevelItem(0);
            var amount = obj_TreeTopLevelItem.text(11);
            
            mouseClick(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), 177, 9, 0, Qt.LeftButton);
            type(waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit"), amount);
            type(waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit"), "0");
            nativeType("<Tab>");
            type(waitForObject(":_invoiceNum_XLineEdit"), vinvoice);
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            test.pass("Voucher created successfully for PO #:" + ponumber);
        }
    }
    catch(e)
    {
        test.fail("Exception in creating voucher: " + e);
    }
    //------- Get current date -------
    function getCurrentDate()
    {
        var d = new Date();
        var month=d.getMonth()+1;
        var currentdate=d.getDate();
        var year=d.getYear();
        var ystring = year.toString();
        var year2 = ystring.substring(1,3);
        var date= "20" + year2 + "-" + month + "-" + currentdate;
        return date;
    }
    //------- Create Miscellaneous Invoice -----
    
    function createMiscInvoice(cust,item,qty)
    {
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Invoice"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "New..."));
            mouseClick(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), 32, 13, 0, Qt.LeftButton);
            type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), cust);
            nativeType("<Tab>");
            clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
            clickButton(waitForObject(":lineItemsTab.New_QPushButton"));
            mouseClick(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), 26, 10, 0, Qt.LeftButton);
            type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), item);
            nativeType("<Tab>");
            type(waitForObject(":_ordered_XLineEdit_2"), qty);
            nativeType("<Tab>");
            type(waitForObject(":_billed_XLineEdit"), qty);
            nativeType("<Tab>");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Exception in creating invoice" + e);
        }

    }
    function voidPostedCR(crnumber)
    {  
        try
        {
            var cashReceipts;
            flag = 0;
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Reports"));
            activateItem(waitForObjectItem(":xTuple ERP:  *.Reports_QMenu", "Cash Receipts..."));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            openItemContextMenu(waitForObject(":_list_XTreeWidget_3"), crnumber, 25, 7, 0);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Void Posted Cash Receipt"));
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
            cashReceipts = findObject(":_list_XTreeWidget_3");
            count = cashReceipts.topLevelItemCount;
            for(i=0;i<count;i++)
            {
                row = cashReceipts.topLevelItem(i);
                if(row.text(0) == crnumber && row.text(5) == "Yes")
                {     
                    test.pass("Cash Receipt voided successfully");
                    flag = 1;
                    break;
                }
            }
            if(flag != 1)
            {
                test.fail("cash receipt not voided" + e);
            }
            
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        catch(e)
        {
            test.fail("Exception in voiding posted cash receipt" + e);
            if(object.exists(":Quotes.Close_QToolButton"))
            {
                clickButton(":Quotes.Close_QToolButton");
            }
        }
    }
    
    //--------- Shop Floor Workbench ----------
    // --------Clock-In function for shop-floor work-bench----------------------
        function clockIn(wonum,opname)
        {
            try{
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
    activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
    activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
    waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit");
    type(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
    nativeType("<Tab>");
    waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit_2");
    type(":groupBox.VirtualClusterLineEdit_WoLineEdit_2", wonum);
    nativeType( "<Tab>");
    if(object.exists("{buddy=':xTuple ERP:*.Operation:_QLabel' name='_wooper' type='XComboBox' visible='1'}"))
    {
        waitForObject(":_wooper_XComboBox");
        clickItem(":_wooper_XComboBox", opname,0, 0, 5, Qt.LeftButton); 
  
    }

    waitForObject(":xTuple ERP:*.Clock In_QPushButton");
    clickButton(":xTuple ERP:*.Clock In_QPushButton");
    waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");
    test.pass("" +opname+ " operation successfully clocked in for" +wonum+ " ");    
}
    catch(e)
    {
        test.fail(" failed in Clock-In operation" +e);
    }
}   
 // //---------- Clock-Out function for Shop-Floor work-bench ---------  
    function clockOut(wonum,opname)
    {
    try{
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
    activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
    activateItem(":xTuple ERP:*.Transactions_QMenu_2", "Shop Floor Workbench...");
    waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit");
    type(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
    waitForObject(":groupBox.VirtualClusterLineEdit_WoLineEdit_2");
    type(":groupBox.VirtualClusterLineEdit_WoLineEdit_2", wonum);   
    nativeType( "<Tab>");    
    if(opname == "20 - Standard Paint Operation - ")
    {
    waitForObject(":xTuple ERP:*._wooperList_XTreeWidget");
    clickItem(":xTuple ERP:*._wooperList_XTreeWidget",opname,0, 0, 5, Qt.LeftButton);            
    waitForObject(":xTuple ERP:*.Clock Out_QPushButton");
    clickButton(":xTuple ERP:*.Clock Out_QPushButton");    
    waitForObject(":List Unposted Invoices.Post_QPushButton");
    clickButton(":List Unposted Invoices.Post_QPushButton");
    waitForObject(":_frame._itemloc_XTreeWidget");
    clickItem(":_frame._itemloc_XTreeWidget", "LOT16",0, 0, 5, Qt.LeftButton);
    waitForObject(":Issue to Shipping.Distribute_QPushButton");
    clickButton(":Issue to Shipping.Distribute_QPushButton");
    waitForObject(":Issue to Shipping.Distribute_QPushButton");
    clickButton(":Issue to Shipping.Distribute_QPushButton");
    waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
    clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton_2");
    test.pass("clock out operation sucessful for" +opname+"operation");
    }  
    else
    {
    waitForObject(":xTuple ERP:*._wooperList_XTreeWidget");
    clickItem(":xTuple ERP:*._wooperList_XTreeWidget",opname,0, 0, 5, Qt.LeftButton);            
    waitForObject(":xTuple ERP:*.Clock Out_QPushButton");
    clickButton(":xTuple ERP:*.Clock Out_QPushButton");    
    waitForObject(":List Unposted Invoices.Post_QPushButton");
    clickButton(":List Unposted Invoices.Post_QPushButton");
    test.pass("clock out operation sucessfull for "+opname+"operation");  
    }
    waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");
    }
        catch(e)
    {
        test.fail(" error in clock-out operation"+e);
    }
    }
//---------------Verifying Production time from Production Time Clock by User---------
    
    function timeByUser(wonum,opNum,opname)
    {
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        waitForObjectItem(":_QMenu", "by User...");
        activateItem(":_QMenu", "by User...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_UsernameLineEdit", "admin");
        nativeType("<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3", "-4");
        nativeType("<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
        type(":_dateGroup.XDateEdit_XDateEdit_4", "0");
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+wonum+"' type='QModelIndex'}"&&"{column='4' container=':_list_XTreeWidget_3' text='"+opNum+"' type='QModelIndex'}"))
            test.pass(""+wonum+" has a production time entry for"+opname+"operation");
        else  
            test.fail(""+wonum+" has no production time entry for"+opname+"operation");
        snooze(0.1);
        
    waitForObject(":Quotes.Close_QToolButton");
    clickButton(":Quotes.Close_QToolButton");   
    }
   catch(e)
    {
        test.fail("error in production time entry");
    }
   
   }
    
// //---------------Verifying Production time from Production Time Clock by WO---------
function timeByWo(wonum,opNum,opname)
{
     try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Production Time Clock");
        waitForObjectItem(":_QMenu", "by Work Order...");
        activateItem(":_QMenu", "by Work Order...");
        waitForObject(":_woGroup.VirtualClusterLineEdit_WoLineEdit_6");
        type(":_woGroup.VirtualClusterLineEdit_WoLineEdit_6", wonum);
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='1' container=':_list_XTreeWidget_3' text='"+opNum+"' type='QModelIndex'}"))
            test.pass(" "+wonum+" has a production time entry for" +opname+ " operation");
        else  
            test.fail(""+wonum+"has no production time entry for"+opname+"operation");
        snooze(0.1);    

       waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");  
    }
    catch(e)
    {
        test.fail("error in production time entry of"+wonum+"from Production time clock by Work Order screen");
    }
}
function roundNumber(num, dec)
{
    
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}

//--------Recurring items ---------
//-----------To add numerics to the date obtained-----
    function addDate(numberOfDaysToAdd)
     {
            var someDate = new Date();
            someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
            //Formatting to dd/mm/yyyy :
            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();
             if(parseInt(mm)<=9&&parseInt(dd)<=9)
            {
                var FormattedDate = y+'-'+'0'+mm+'-'+'0'+dd;
                
            }
          else if(parseInt(mm)<=9||parseInt(dd)<=9)
            {
                if(parseInt(mm)<=9)
                {
                var FormattedDate = y+'-'+'0'+mm+'-'+dd;
                
                }
                if(parseInt(dd)<=9)
               {
                var FormattedDate = y+'-'+mm+'-'+'0'+dd;
                
              }
           }
           else
             {
               var FormattedDate = y+'-'+mm+'-'+dd;
               
              }
            return FormattedDate;
 }    
    
 //****************************** Taxation *************************************
try
{
    function createSalesOrder1(item, qty, cust)
    {
        snooze(2);
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", cust);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_headerPage._custPONumber_XLineEdit_2");
        type(":_headerPage._custPONumber_XLineEdit_2", "103");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        sonumber = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", item);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit_2");
        findObject(":_qtyOrdered_XLineEdit_2").clear();
        type(":_qtyOrdered_XLineEdit_2", qty);
        
        soitem = findObject(":_itemGroup.ItemLineEdit_ItemLineEdit").text;
        
        soqty = findObject(":_qtyOrdered_XLineEdit_2").text;
        
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+sonumber+"' type='QModelIndex'}"))
            test.pass("Sales Order creation successful");
        else  
            test.fail("Sales Order creation failed");            
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        return sonumber;
    }
}
catch(e)
{
    test.fail("Error in creating a sales order" + e);
}
 //------------Create Chart of Accounts-------------------
function COA(COACompany,COAProfit,COANumber,COASub,COADesc,COAType,COASubType)
{
    
    try{
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        snooze(1);
        waitForObject(":Account Number._company_XComboBox");
        if(findObject(":Account Number._company_XComboBox").currentText!=COACompany)
            clickItem(":Account Number._company_XComboBox","01",0,0,1,Qt.LeftButton);
        snooze(1);
        waitForObject(":Account Number._profit_XComboBox");
        if(findObject(":Account Number._profit_XComboBox").currentText!=COAProfit)
            clickItem(":Account Number._profit_XComboBox", "01",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Account Number._sub_XComboBox");
        snooze(1);
        if(findObject(":Account Number._sub_XComboBox").currentText!=COASub)
            clickItem(":Chart of Accounts._sub_XComboBox", "01",0,0,1,Qt.LeftButton);
        snooze(0.5);
        type(":_number_XLineEdit_2", COANumber);
        type(":_description_XLineEdit_2", COADesc);
        type(":_extReference_XLineEdit", COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub);
        waitForObject(":Account Number._type_XComboBox");
        clickItem(":Account Number._type_XComboBox", COAType, 0, 0, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":Account Number._subType_XComboBox");
        type(":Account Number._subType_XComboBox", COASubType);
        snooze(0.5);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Acc: "+COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub+" created");
        
        createdCOA = "{column='2' container=':_account_XTreeWidget_2' text='"+COANumber+"' type='QModelIndex'}";
        //wait till save
        
    }
    catch(e){test.fail("Exception caught in creating Chart of Account:"+e);}
}

//-------- Tax History Verification ----------
function taxHistory(docnum)
{
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Reports");
        waitForObjectItem(":_QMenu", "Tax History...");
        activateItem(":_QMenu", "Tax History...");
        
        waitForObject(":Type.Detail_QRadioButton");
        clickButton(":Type.Detail_QRadioButton");
        waitForObject(":Show.Sales_XCheckBox");
        if(!findObject(":Show.Sales_XCheckBox").checked)
            clickButton(":Show.Sales_XCheckBox");
        waitForObject(":Show.Purchases_XCheckBox");
        if(!findObject(":Show.Purchases_XCheckBox").checked)
            clickButton(":Show.Purchases_XCheckBox");
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3", "<0>");
        nativeType("<Tab>");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        waitForObject(":_frame._taxdet_XTreeWidget");
        if(object.exists("{column='0' container=':_frame._taxdet_XTreeWidget' text='"+docnum+"' type='QModelIndex'}"))
            flag = "1";
        else 
            flag = "0";
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        return flag;
    }
    
    catch(e)
    {
        test.fail("Error in finding the tax history of "+docnum+""+e);
    }
}
//-------- Tax History Verification for A/R Misc.Credit Memo ----------
function cmTaxHistory(Code)
{
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Reports");
        waitForObjectItem(":_QMenu", "Tax History...");
        activateItem(":_QMenu", "Tax History...");
        
        waitForObject(":Type.Detail_QRadioButton");
        clickButton(":Type.Detail_QRadioButton");
        waitForObject(":Show.Sales_XCheckBox");
        if(!findObject(":Show.Sales_XCheckBox").checked)
            clickButton(":Show.Sales_XCheckBox");
        waitForObject(":Show.Purchases_XCheckBox");
        if(!findObject(":Show.Purchases_XCheckBox").checked)
            clickButton(":Show.Purchases_XCheckBox");
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3", "0");
        nativeType("<Tab>");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        snooze(0.5);
        waitForObject(":_frame._taxdet_XTreeWidget");
        if(object.exists("{column='14' container=':_frame._taxdet_XTreeWidget' occurrence='4' text='A/R Misc Credit Memo' type='QModelIndex'}"&&"{column='8' container=':_frame._taxdet_XTreeWidget' occurrence='3' text='"+Code+"' type='QModelIndex'}"))
            flag = "1";
        else 
            flag = "0";
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        return flag;
    }
    
    catch(e)
    {
        test.fail("Error in finding the tax history of "+Code+" Misc.Credit Memo"+e);
    }
}

//-------- Tax Authority Creation --------
function taxAuthority(num)
{
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Authorities...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "Authority "+num+"");
        waitForObject(":_name_XLineEdit_2");
        type(":_name_XLineEdit_2", "Tax Authority "+num+"");
        waitForObject(":_currency_XComboBox");
        clickItem(":_currency_XComboBox","USD - $",0, 0, 5, Qt.LeftButton); 
        waitForObject(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_accountGroup.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-2350-01");
        nativeType("<Tab>");
        waitForObject(":groupBox...._QPushButton");
        clickButton(":groupBox...._QPushButton");
	snooze(0.5);
        waitForObject(":_listTab_XTreeWidget_15");
        clickItem(":_listTab_XTreeWidget_15","Packaging Pros LTD",0, 0, 5, Qt.LeftButton);         
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='AUTHORITY "+num+"' type='QModelIndex'}"))
            test.pass("Tax authority "+num+" is created");
        else
            test.fail("Tax authority "+num+" is not created");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    
    catch(e)
    {
        test.fail("Error in creating tax authority "+num+"" + e);
    }
}
//--------- Tax Zone creation -------
function taxZone(num)
{
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Zones...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":_taxZone_XLineEdit");
        type(":_taxZone_XLineEdit", "ZONE "+num+"");
        waitForObject(":_description_XLineEdit_3");
        type(":_description_XLineEdit_3", "Tax Zone "+num+"");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":xTuple ERP:*._taxZone_XTreeWidget");
        if(object.exists("{column='0' container=':xTuple ERP:*._taxZone_XTreeWidget' text='ZONE "+num+"' type='QModelIndex'}"))
            test.pass("Tax Zone "+num+" is created");
        else
            test.fail("Tax Zone "+num+" is not created");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in creating tax zone "+num+"" + e);
    }
}

//------------ Tax Class creation --------
function taxClass(num, seqnum)
{
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Classes...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":_taxClass_XLineEdit");
        type(":_taxClass_XLineEdit", "Class "+num+"");
        waitForObject(":_description_XLineEdit_4");
        waitForObject(":Tax Class._seq_XSpinBox").clear();
        type(":Tax Class._seq_XSpinBox", seqnum);
        type(":_description_XLineEdit_4", "Tax Class "+num+"");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":xTuple ERP:*._taxclass_XTreeWidget");
        if(object.exists("{column='0' container=':xTuple ERP:*._taxclass_XTreeWidget' text='Class "+num+"' type='QModelIndex'}"))
            test.pass("Tax Class "+num+" is created with sequnce number "+seqnum+"");
        else
            test.fail("Tax Class "+num+" is not created with sequnce number "+seqnum+"");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in creating tax class "+num+" with sequnce number "+seqnum+"" + e);
    }
}
//------------- Tax Type creation -------------
function taxType(num)
{
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Types...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":Tax Type._name_XLineEdit");
        type(":Tax Type._name_XLineEdit", "Type "+num+"");
        waitForObject(":Tax Type._description_XLineEdit");
        type(":Tax Type._description_XLineEdit", "Tax Type "+num+"");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":xTuple ERP:*._taxtype_XTreeWidget");
        if(object.exists("{column='0' container=':xTuple ERP:*._taxtype_XTreeWidget' text='Type "+num+"' type='QModelIndex'}"))           test.pass("Tax Type "+num+" is created");
        else
            test.fail("Tax Type "+num+" is not created");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating tax type" + e);
    }
  }
    //------ Assiging TAX TYPE to the Item-----
    function assignTaxType(item,num)
    {
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
            activateItem(":xTuple ERP: *_QMenuBar", "Products");
            waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
            activateItem(":xTuple ERP:*.Products_QMenu", "Item");
            waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
            activateItem(":xTuple ERP:*.Item_QMenu", "List...");
            waitForObject(":Items.Query_QToolButton");
            clickButton(":Items.Query_QToolButton");       
            waitForObject(":_list_XTreeWidget_3");
            doubleClickItem(":_list_XTreeWidget_3",item,10,10,0,Qt.LeftButton);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Tax Types");
            waitForObject(":_taxtypesTab._itemtax_XTreeWidget");
            waitForObject(":_taxtypesTab._itemtax_XTreeWidget");
            if(object.exists("{column='1' container=':_taxtypesTab._itemtax_XTreeWidget' text='Any' type='QModelIndex'}"))
            {
                clickItem(":_taxtypesTab._itemtax_XTreeWidget","Any",0, 0, 5, Qt.LeftButton); 
                waitForObject(":_taxtypesTab.Delete_QPushButton");
                clickButton(":_taxtypesTab.Delete_QPushButton");
            }
            waitForObject(":_taxtypesTab.New_QPushButton");
            clickButton(":_taxtypesTab.New_QPushButton");
            waitForObject(":_taxzone_XComboBox_3");
            clickItem(":_taxzone_XComboBox_3","ZONE "+num+"-Tax Zone "+num+"",10,10,0,Qt.LeftButton);
            snooze(0.5);
            waitForObject(":_taxtype_XComboBox_2");
            clickItem(":_taxtype_XComboBox_2","Type "+num+"",10,10,0,Qt.LeftButton);
            snooze(0.5);
            waitForObject(":Select Order for Billing.Save_QPushButton_2");
            clickButton(":Select Order for Billing.Save_QPushButton_2");
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Items.Close_QToolButton");
            clickButton(":Items.Close_QToolButton");
            test.log("Tax Type "+num+" is assigned to the item");
        }
        catch(e)
        {
            test.fail("Error in  Assigning item to the Tax Type" + e);
        }
    }
    
//------------G/L transaction verification ------
try
{
    function glTaxTransactions(pat, docnum)
    {
        
        var flag1 = 0;
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
        type(":_filterGroup.widget3_QLineEdit",docnum);   
        
        
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        
   
        waitForObject(":_list_XTreeWidget_3");
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var obj = obj_TreeWidget.topLevelItemCount;
        for(var i=0;i<obj;i++)
        {
            var obj_TreeTopLevelItem = obj_TreeWidget.topLevelItem(i);
            var sNameOfRootItem = obj_TreeTopLevelItem.text(6);
            var bool = pat.test(sNameOfRootItem);
            if(bool)
            {    
                break;
            }
            
        }
        if(bool)
            flag1 = 1;
        else
            flag1 = 0;
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        return flag1;
    }
}
catch(e)
{
    test.fail("Error in verifying G/L transaction after receiving PO" + e);
}

//************************* Average costing *************
  // -------Verifying Inventory Value --------------
function inventoryVariables(inputString, site,appE)
{
    try{
        snooze(0.5);
          waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        snooze(0.5);
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
        snooze(0.5);
        waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand...");
        activateItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand...");
        snooze(2);
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        
        snooze(0.5);
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Item",10,10,0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit");
        type(":_filterGroup.ItemLineEdit_ItemLineEdit", inputString);
        nativeType("<Tab>");
        snooze(1);
        if(appE != "PostBooks")
        {
            waitForObject(":_filterGroup.+_QToolButton");
            clickButton(":_filterGroup.+_QToolButton");
            waitForObject(":_filterGroup.xcomboBox2_XComboBox");
            clickItem(":_filterGroup.xcomboBox2_XComboBox","Site",10,10,0, Qt.LeftButton);
            snooze(0.5);
            if(object.exists(":_filterGroup.widget2_XComboBox"))
                clickItem(":_filterGroup.widget2_XComboBox",site,10,10,0, Qt.LeftButton);
            if(object.exists(":_filterGroup.widget2_WComboBox_2"))
                clickItem(":_filterGroup.widget2_WComboBox_2",site,10,10,0, Qt.LeftButton);
        }
        snooze(0.5);
        if(!findObject(":Quantities on Hand.Show Inventory Value_QGroupBox").checked)
           mouseClick(":Quantities on Hand.Show Inventory Value_QGroupBox", 38, 3, 0, Qt.LeftButton);
         waitForObject(":Show Inventory Value.Use Posted Costs_QRadioButton");
         clickButton(":Show Inventory Value.Use Posted Costs_QRadioButton");
         snooze(0.5);
        waitForObject(":Quantities on Hand.Query_QToolButton");
        clickButton(":Quantities on Hand.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list.unitcost_QModelIndex");
        var invenuc = findObject(":_list.unitcost_QModelIndex").text;

        waitForObject(":_list.invenvalue_QModelIndex_2");
        var invenval = findObject(":_list.invenvalue_QModelIndex_2").text;

        waitForObject(":_list.QOH_QModelIndex");
        var qoh = findObject(":_list.QOH_QModelIndex").text;
        var qohi=parseInt(replaceSubstring(qoh,",",""));
        snooze(2);
        var array = [qohi, invenuc, invenval];
        waitForObject(":Quantities on Hand.Close_QToolButton");
        clickButton(":Quantities on Hand.Close_QToolButton");
        return array;
   
}

    catch(e)
    {
        test.fail("Error in finding the values"+e);
    }
}    

function createRIS1(item, site)
{
    try
   {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "New...");
        activateItem(":_QMenu", "New...");
        
        waitForObject(":Item Site.ItemLineEdit_ItemLineEdit");
        type(":Item Site.ItemLineEdit_ItemLineEdit", item);
        nativeType("<Tab>");
        snooze(0.5);
        if(object.exists(":_warehouse_WComboBox_2"))
        {
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2", site, 0, 0, 5, Qt.LeftButton);
        }
        if(!findObject(":Items.Site can manufacture this Item_QGroupBox"))
        {
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        }
        if(findObject(":Item Site.Site can purchase this Item_QGroupBox"))
        {
            type(":Item Site.Site can purchase this Item_QGroupBox", " ");
        }
        
        
        waitForObject(":Control._controlMethod_XComboBox_2");
        clickItem(":Control._controlMethod_XComboBox_2", "Regular", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2", "MRP-MRP Items", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2", "FINISHED-Finished Product - WH1", 0, 0, 5, Qt.LeftButton);		snooze(1);	
 
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
        }
   }
    catch(e)
    {
        test.fail("Exception in creating Itemsite for "+item+e);
    }
}

    //-------------Pricing--------


  
    function salesunitprice(dsonum)
   { 
        try
   {
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open..."));
    clickButton(waitForObject(":Quotes.Query_QToolButton"));
    snooze(0.5);
    openItemContextMenu(":_list_XTreeWidget_5",dsonum, 5, 5, Qt.LeftButton); 
    openItemContextMenu(waitForObject(":_list_XTreeWidget_5"),dsonum, 6, 6, 0);
    activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
    snooze(0.5);
    clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
    uprc = findObject("{column='15' container=':_lineItemsPage.XLineEdit_XLineEdit' type='QModelIndex'}").text;
     clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
    clickButton(waitForObject(":Quotes.Query_QToolButton"));
    clickButton(waitForObject(":Quotes.Close_QToolButton"));
    test.log("Sales Order Edited Sucessfully");
    return uprc;
  
  }
   catch(e)
   {
       test.fail("Error in diting the SalesOrder:"+e);
   }
}   
   
  
    function salesCustprice(dsonum,disitem)
   {
           try
   {
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open..."));
    clickButton(waitForObject(":Quotes.Query_QToolButton"));
    snooze(0.5);
    openItemContextMenu(":_list_XTreeWidget_5",dsonum, 5, 5, Qt.LeftButton); 
    openItemContextMenu(waitForObject(":_list_XTreeWidget_5"),dsonum, 6, 6, 0);
    activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
    snooze(0.5);
    clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
    openItemContextMenu(waitForObject(":_lineItemsPage.XLineEdit_XLineEdit"),disitem, 12, 3, 0);
    activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit Line..."));
    clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
    snooze(0.5);
    // Verification Point 'VP1'
    var custprce = findObject(":In USD - $:.XLineEdit_XLineEdit").text;
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
    clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
    clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
    clickButton(waitForObject(":Quotes.Query_QToolButton"));
    clickButton(waitForObject(":Quotes.Close_QToolButton"));
    test.log("Sales Order Edited Sucessfully");
    return custprce;
   }
 
   catch(e)
   {
       test.fail("Error in editing the SalesOrder:"+e);
   }
   
}   
   
    function frgissueStock(tonum)
{
    try
    {
                
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit",tonum); 
        nativeType("<Tab>");
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
         waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        if(object.exists(":groupBox.Select for Billing_QCheckBox"))
        {
            if(!findObject(":groupBox.Select for Billing_QCheckBox").checked)
                clickButton(":groupBox.Select for Billing_QCheckBox");
            if(findObject(":groupBox.Create and Print Invoice_XCheckBox").checked)
                clickButton(":groupBox.Create and Print Invoice_XCheckBox");
        }
         var shpfrg = findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text;
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        return shpfrg;
    }
    catch(e)
    {
        test.fail("Error in issuing stock to Sales order for regular item" + e);
    }  
}
  
    //---Create New Customer 
    
           function createCustomer(custType,custname,shipnum)
           {
                try
       {
           activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
           activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
           activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
           clickButton(waitForObject(":Quotes.Query_QToolButton"));
           clickButton(waitForObject(":Open Sales Orders.New_QToolButton"));
           type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"),custname);
           nativeType("<Tab>");
           waitForObject(":xTuple ERP: *._custtype_XComboBox");
           clickItem(":xTuple ERP: *._custtype_XComboBox",custType,0, 0, 5, Qt.LeftButton);
           type(waitForObject(":xTuple ERP: *._name_XLineEdit"), custname );
           nativeType("<Tab>");
           snooze(0.5);
           if(!findObject(":_addressTab.Ship To_QRadioButton_2").checked)
           {
               clickButton(waitForObject(":_addressTab.Ship To_QRadioButton_2"));
           }
           snooze(1);
           nativeType("<Tab>");
           clickButton(waitForObject(":_addressStack.New_QPushButton"));
           snooze(0.5);
           type(waitForObject(":_shipToNumber_XLineEdit"),shipnum);
         
           if(!findObject(":Ship-To.Active_QCheckBox").checked)
           {
               clickButton(waitForObject(":Ship-To.Active_QCheckBox"));
           }
           
           if(!findObject(":Ship-To.Default_QCheckBox").checked)
           {
               clickButton(waitForObject(":Ship-To.Default_QCheckBox"));
           }
       
           type(waitForObject(":_name_XLineEdit"), "New Store");
           nativeType("<Tab>");
           clickButton(waitForObject(":Address...._QPushButton"));
           snooze(0.5);
           waitForObjectItem(":_listTab_XTreeWidget", "World Toys Ltd\\.");
           clickItem(":_listTab_XTreeWidget", "World Toys Ltd\\.", 24, 7, 0, Qt.LeftButton);
           clickButton(waitForObject(":Address.OK_QPushButton"));
           clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
           clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
           snooze(0.5);
           clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
           snooze(1);
           clickButton(waitForObject(":Quotes.Query_QToolButton"));
           snooze(.5);
           //----Verifying the Customer created----
           waitForObject(":_list_XTreeWidget_5");
           if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+custname+"' type='QModelIndex'}"))
               test.pass("Customer  created successfully");
           else  
               test.fail("Customer  creation failed"); 
           snooze(3);
           clickButton(waitForObject(":Quotes.Close_QToolButton"));
       }
       
       catch(e)
       {
           test.fail("Error in creating the Customer:"+e);
           if(object.exists(":Quotes.Close_QToolButton"))
           {
               clickButton(waitForObject(":Quotes.Close_QToolButton"));
           }
          
        }
   }
    //--Pricing Schedule Assgnment for Customer----
  
        function prcasscust(custname,prcAssg,prcname)
        {
              try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedule Assignments..."));
                   
            clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
             snooze(1);
            if(!findObject(":_customerGroup.Selected Customer:_QRadioButton").checked)
            {
                clickButton(waitForObject(":_customerGroup.Selected Customer:_QRadioButton"));
            }
            type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"),custname);
            nativeType("<Tab>");
            waitForObject(":_ipshead_XComboBox");
            clickItem(":_ipshead_XComboBox",prcAssg,0, 0, 5, Qt.LeftButton);
            nativeType("<Tab>");
             snooze(0.5);
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
            snooze(2);
            waitForObject(":xTuple ERP: *._ipsass_XTreeWidget");
            //---Verifying the Pricing Schedule Assignment created--------
            if(object.exists("{column='2' container=':xTuple ERP: *._ipsass_XTreeWidget' text='"+custname+"' type='QModelIndex'}") && object.exists("{column='4' container=':xTuple ERP: *._ipsass_XTreeWidget' text='"+prcname+"' type='QModelIndex'}"))
                test.pass("Pricing Schedule Assigment by Customer created successfully");
            else
                test.fail("Pricing Schedule Assignments creation failed"); 
            snooze(0.5);
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
  
        catch(e)
        {
            test.fail("Error in creating Pricing Schedule Assignments:"+e);
            if(object.exists(":Pricing Schedule Assignment.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Assignment.Cancel_QPushButton"));
            }
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
            {
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            }
        }
    }
        //---Pricing Schedule Assignment to Ship-To------
        
        
            function prcassgship(custname,shipnum,prcAssg)
            {
                try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedule Assignments..."));
             clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
            snooze(1);
       if(!findObject(":_customerGroup.Selected Customer:_QRadioButton").checked)
       {
           clickButton(waitForObject(":_customerGroup.Selected Customer:_QRadioButton"));
           
       }
       type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"), custname);
           nativeType("<Tab>");
       if(!findObject(":_customerGroup.Selected Customer Ship-To:_QRadioButton").checked)
       {
           clickButton(waitForObject(":_customerGroup.Selected Customer Ship-To:_QRadioButton"));
          
       }
        snooze(0.5);
        waitForObject(":_customerGroup._customerShipto_XComboBox");
           clickItem(":_customerGroup._customerShipto_XComboBox",shipnum,0, 0, 5, Qt.LeftButton);
           nativeType("<Tab>");
           snooze(0.5);
       waitForObject(":_ipshead_XComboBox");
       clickItem(":_ipshead_XComboBox",prcAssg,0, 0, 5, Qt.LeftButton);
       nativeType("<Tab>");
       snooze(0.5);
       clickButton(waitForObject(":View Check Run.Save_QPushButton"));
       snooze(1);
       waitForObject(":xTuple ERP: *._ipsass_XTreeWidget");
       //---Verifying the Pricing Schedule Assignment created--------
       if(object.exists("{column='2' container=':xTuple ERP: *._ipsass_XTreeWidget' text='"+custname+"' type='QModelIndex'}") && object.exists("{column='0' container=':xTuple ERP: *._ipsass_XTreeWidget' text='"+shipnum+"' type='QModelIndex'}"))
           test.pass("Pricing Schedule Assigment by Customer Ship-to  created successfully");
       else  
           test.fail("Pricing Schedule Assignments creation failed"); 
       clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
   }

        catch(e)
        {
            test.fail("Error in creating Pricing Schedule Assignments:"+e);
            if(object.exists(":Pricing Schedule Assignment.Cancel_QPushButton"))
            {
                clickButton(waitForObject(":Pricing Schedule Assignment.Cancel_QPushButton"));
            }
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
            {
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            }
        }
    }
      //---Assigning pricing Schedule for the Customer Type-----
      
           function prcAssgCustType(custname,custType1,custType,prcAssg)
           {
               try
               {
           activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
           activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedule Assignments..."));
            clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
            snooze(0.5);
           if(!findObject(":_customerGroup.Selected Customer:_QRadioButton").checked)
       {
           clickButton(waitForObject(":_customerGroup.Selected Customer:_QRadioButton"));
           
       }
           type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"),custname);
           nativeType("<Tab>");
           if(!findObject(":_customerGroup.Selected Customer Type:_QRadioButton").checked)
           {
               clickButton(waitForObject(":_customerGroup.Selected Customer Type:_QRadioButton"));
           }
           waitForObject(":_customerGroup._customerTypes_XComboBox");  
           clickItem(":_customerGroup._customerTypes_XComboBox",custType1,0, 0, 5, Qt.LeftButton);
           snooze(0.5);
           waitForObject(":_ipshead_XComboBox");
           clickItem(":_ipshead_XComboBox",prcAssg,0, 0, 5, Qt.LeftButton);
           snooze(1);
           clickButton(waitForObject(":View Check Run.Save_QPushButton"));
           snooze(2)
           //---Verifying the Assignment created for the customer type------
           waitForObject(":xTuple ERP: *._ipsass_XTreeWidget");
          if(object.exists("{column='3' container=':xTuple ERP: *._ipsass_XTreeWidget' text='"+custType+"' type='QModelIndex'}"))
               test.pass("Pricing schedule Assignment  created successfully for the Customer Type ");
           else  
               test.fail("Pricing Schedule Assignment by creation failed for the Customer Type"); 
           snooze(1);
           clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
       } 
      
       catch(e)
       {
           test.fail("Error in creating Pricing Schedule Assignment  for the Customer Type:"+e);
           if(object.exists(":Select Order for Billing.Close_QPushButton"))
           {
               clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
           }
    }
}

//************************* Journals *************

 //----Verifying Journal Transactions---
 try
       
{
    function journalVerification(pat, docnum)
    {
        
        var flag1 = 0;
        snooze(0.5);
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        snooze(1);
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
        snooze(0.5);
        waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
        activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
                snooze(0.5);
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Journals..."));
        snooze(1);
        if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit","0");
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit","0");
         snooze(0.5);
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton"); 
        snooze(0.5);
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit",docnum);   
         waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        
        waitForObject(":_list_XTreeWidget_3");
        var sWidgetTreeControl = ":_list_XTreeWidget_3";
        
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var obj = obj_TreeWidget.topLevelItemCount;
        for(var i=0;i<obj;i++)
        {
            var obj_TreeTopLevelItem = obj_TreeWidget.topLevelItem(i);
            var sNameOfRootItem = obj_TreeTopLevelItem.text(4);
            var bool = pat.test(sNameOfRootItem);
            if(bool)
            {    
                break;
            }
            
        }
        if(bool)
            flag1 = 1;
        else
            flag1 = 0;
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        return flag1;
   }
}
catch(e)
{
    waitForObject(":Quotes.Close_QToolButton");
    clickButton(":Quotes.Close_QToolButton");
    test.fail("Error in verifying G/L transaction after receiving PO" + e);
}

//--------Verifying Posting Status in Journals----
try
{
    function journalStatus(Docnum,sts,period)
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));                 activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports"));
        snooze(0.5);
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Journals..."));
       snooze(1);
        if(!(object.exists(":_filterGroup.XDateEdit_XDateEdit")))
        {
            waitForObject(":Quantities on Hand.More_QToolButton");
            clickButton(":Quantities on Hand.More_QToolButton");
        }
        snooze(0.5);
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        findObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit","0");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        snooze(0.5);
        type(":_filterGroup.XDateEdit_XDateEdit","0");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton"); 
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);        snooze(0.5);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        type(":_filterGroup.widget3_QLineEdit",Docnum);  
        snooze(0.5);
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(1);
        waitForObject(":_list_XTreeWidget_3");
        var widget = findObject(":_list_XTreeWidget_3");
        var obj_TreeTopLevelItem = widget.topLevelItem(0);
        var sNameOfRootItem1 = obj_TreeTopLevelItem.text(9);
        var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
        Jrnum =obj_TreeTopLevelItem.text(5);
        Jrlnum = ++Jrnum;
        if( sNameOfRootItem2 == Docnum && sNameOfRootItem1 == sts)
        {
            test.pass("Posted status verified sucessfully "  +  period  + "posting Journals to ledger");
        }
        else
            test.fail("Error in verifying the Posted Status:");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        return Jrlnum;
    }
}
catch(e)
{
    waitForObject(":Quotes.Close_QToolButton");
    clickButton(":Quotes.Close_QToolButton");
    test.fail("Error in Verifying Status:"+e);
}

//----Post Journals to Ledger------
try
{
    function postJournal2Ledger(Source)
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger"));
        activateItem(waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Post Journals to Ledger..."));
        snooze(0.5);
        
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit").clear();
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":Transaction Dates.XDateEdit_XDateEdit").clear();
        type(":Transaction Dates.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(1);
        openItemContextMenu(waitForObject(":_frame._sources_XTreeWidget"), Source , 5, 5, Qt.LeftButton);
        snooze(0.5);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post"));
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
            test.pass("Journals sucessfully posted to Ledger:");
        }
        else
        {
            flag1 = 0;
            test.fail("Error in posting Journals to Ledger:");
        }
        clickButton(waitForObject(":xTuple ERP:*.Cancel_QPushButton"));
        return flag1;
    }
}
catch(e)
{
    clickButton(waitForObject(":xTuple ERP:*.Cancel_QPushButton"));
    test.fail("Error in Posting Journals to Ledger:"+e);
}


//------------G/L transaction verification on Journals ------
try
{
    function glTransactions1(Jnum,pat,source)
    {
        if(object.exists(":xTuple ERP: *_QMenuBar"))
        {
            snooze(1);
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        }
        else
        {    
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
            activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
        }
        snooze(0.5);
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
        nativeType("<Tab>");
        waitForObject(":_filterGroup.XDateEdit_XDateEdit");
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit","0");
        waitForObject(":_filterGroup.+_QToolButton");
        clickButton(":_filterGroup.+_QToolButton"); 
        snooze(0.5);
        waitForObject(":_filterGroup.xcomboBox3_XComboBox");
        clickItem(":_filterGroup.xcomboBox3_XComboBox","Document #", 80, 9, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget3_QLineEdit");
        waitForObject(":_filterGroup.widget3_QLineEdit").clear(); 
        snooze(1);
        for(var j=0;j<Jnum.length; j++)
        {
            snooze(0.5);
            type(":_filterGroup.widget3_QLineEdit",Jnum[j]);   
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            snooze(1);
            waitForObject(":_list_XTreeWidget_3");
            var sWidgetTreeControl = ":_list_XTreeWidget_3";
            waitForObject(sWidgetTreeControl);
            var obj_TreeWidget = findObject(sWidgetTreeControl);
            var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
            var obj = obj_TreeWidget.topLevelItemCount;
            for(var i=0;i<obj;i++)
            {
                var obj_TreeTopLevelItem = obj_TreeWidget.topLevelItem(i);
                var sNameOfRootItem1 = obj_TreeTopLevelItem.text(5);
                var sNameOfRootItem2 = obj_TreeTopLevelItem.text(2);
                snooze(1);
                if(sNameOfRootItem1 == pat &&  sNameOfRootItem2 == source[j])
                {
                    bool = 1;
                }
                else
                    bool = 0;
            }
            nativeType("<Tab>");
            snooze(0.5);
          }
        snooze(1);
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton"); 
        return bool;
    }
    
}
catch(e)
{
    test.fail("Error in verifying G/L transaction after receiving PO" + e);
}
//************************* For use of Count tags *************

//------------Verifying Count tag-----------
function verifyCntTag(item)
{
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_3", "Count Tag Edit List...");
        activateItem(":xTuple ERP:*.Reports_QMenu_3", "Count Tag Edit List...");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        snooze(1);
        waitForObject(":_frame._cnttag_XTreeWidget");
        if(object.exists("{column='3' container=':_frame._cnttag_XTreeWidget' text='"+item+"' type='QModelIndex'}"))
        {
            test.pass("count tag is created and it is available in count tag edit list");
        }
        else
            test.fail("count tag is not available in count tag edit list")
        nativeType("<Tab>");
        snooze(1);
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton")
            }
    catch(e)
    {
        test.fail("error in verifying count tag in count tag edit list");
        
    }
}

//------------creating Count tags by Item-----------
function createCTItem(item,site,appE)
{
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Create Count Tags");
        activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Create Count Tags");
        waitForObjectItem(":xTuple ERP:*.Create Count Tags_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Create Count Tags_QMenu", "by Item...");
        snooze(0.5);
        waitForObject(":Create Count Tag by Item/Site.ItemLineEdit_ItemLineEdit");
        type(":Create Count Tag by Item/Site.ItemLineEdit_ItemLineEdit",item);
        nativeType("<Tab>");
        snooze(0.5);
        if(appE!="PostBooks")
        {
            waitForObject(":Create Count Tag by Item/Site._warehouse_WComboBox");
            clickItem(":Create Count Tag by Item/Site._warehouse_WComboBox", site, 0, 0, 5, Qt.LeftButton);
        }
        waitForObject(":Create Count Tag by Item/Site.Freeze Inventory_QCheckBox");
        if(!findObject(":Create Count Tag by Item/Site.Freeze Inventory_QCheckBox").checked)
            clickButton(":Create Count Tag by Item/Site.Freeze Inventory_QCheckBox");
        snooze(0.5);
        waitForObject(":Create Count Tag by Item/Site.Create Tag_QPushButton");
        clickButton(":Create Count Tag by Item/Site.Create Tag_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("creating count tags by item is successful");
    }
    catch(e)
    {
        test.fail("Failed to create count tag by item"+e);
    }
    
}  


