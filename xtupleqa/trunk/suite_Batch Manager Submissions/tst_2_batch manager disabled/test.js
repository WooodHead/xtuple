function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    waitForObject(":Registration Key.Yes_QPushButton");
    clickButton(":Registration Key.Yes_QPushButton");
    
    var set = testData.dataset("login.tsv");
    var email;
    for(var records in set)
    {
        fromemail=testData.field(set[records],"FROM EMAIL");
        toemail=testData.field(set[records],"TO EMAIL");
        role=testData.field(set[records],"ROLE")
             if(role=="CONFIGURE") break;     
    }
    
    //---find Application Edition------ 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu", "Setup...");
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);  
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex",0, 0, 0, Qt.LeftButton);
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton); 
        }
        
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in identifying application edition" + e);
    }
    
    //-----Send Electronic Invoice(AR)-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Invoice");
        activateItem(":*.Accounts Receivable_QMenu", "Invoice");
        type(":*.Accounts Receivable_QMenu","<Right>");
        
        snooze(1);
        menu = waitForObject(":*.Invoice_QMenu");
        menuItem = "Send &Electronic Invoice...";
        
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+appEdition);
        else test.pass(menuItem+"not found in "+appEdition);
    }
    catch(e)
    {
        test.fail("Error in checking Send Electronic Invoice(AR)" + e);
    }
    
        
    //------------Valid Location By Item----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        if(OS.name=="Linux")
        {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    }
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Valid Locations by Item...");
        activateItem(":*.Reports_QMenu_2", "Valid Locations by Item...");
        
        if(object.exists(":Valid Locations by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Valid Locations by Item screen");
        else
            test.pass("Schedule button doesn't exists in Valid Locations by Item screen");
        waitForObject(":Valid Locations by Item.Close_QToolButton");
        clickButton(":Valid Locations by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling valid location by item"+ e);
    }
    
    
    //------------Quantity On Hand----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Quantities On Hand...");
        activateItem(":*.Reports_QMenu_2", "Quantities On Hand...");
        if(object.exists(":Quantities on Hand.Schedule_QToolButton"))
            test.fail("Schedule button exists in Quantities on Hand screen");
        else
            test.pass("Schedule button doesn't exists in Quantities on Hand screen");
        
        waitForObject(":Quantities on Hand.Close_QToolButton");
        clickButton(":Quantities on Hand.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Quantity on hand"+ e);
    }
    
    
    
    //------------QOH by location----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Quantities On Hand By Location...");
        activateItem(":*.Reports_QMenu_2", "Quantities On Hand By Location...");
        if(object.exists(":Quantities on Hand by Location.Schedule_QToolButton"))
            test.fail("Schedule button exists in Quantities on Hand by Location screen");
        else
            test.pass("Schedule button doesn't exists in Quantities on Hand by Location screen");
        waitForObject(":Quantities on Hand by Location.Close_QToolButton");
        clickButton(":Quantities on Hand by Location.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in QOH by location"+ e);
    }
    
    //------------Location Detail----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Location/Lot/Serial # Detail...");
        activateItem(":*.Reports_QMenu_2", "Location/Lot/Serial # Detail...");
        if(object.exists(":Location/Lot/Serial # Detail.Schedule_QToolButton"))
            test.fail("Schedule button exists in Location/Lot/Serial # Detail screen");
        else
            test.pass("Schedule button doesn't exists in Location/Lot/Serial # Detail screen");
        waitForObject(":Location/Lot/Serial # Detail.Close_QToolButton");
        clickButton(":Location/Lot/Serial # Detail.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in submitting location details"+ e);
    }
    
    //------------Usage Statistics----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Usage Statistics...");
        activateItem(":*.Reports_QMenu_2", "Usage Statistics...");
        if(object.exists(":Item Usage Statistics.Schedule_QToolButton"))
            test.fail("Schedule button exists in Item Usage Statistics screen");
        else
            test.pass("Schedule button doesn't exists in Item Usage Statistics screen");
        waitForObject(":Item Usage Statistics.Close_QToolButton");
        clickButton(":Item Usage Statistics.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Usage Statistics"+ e);
    }
    
    
    //------------Time Phased Usage Statistics----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
        activateItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
        
        if(object.exists(":Time-Phased Item Usage Statistics by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Time-Phased Item Usage Statistics by Item screen");
        else
            test.pass("Schedule button doesn't exists in Time-Phased Item Usage Statistics by Item screen");
        waitForObject(":Time-Phased Item Usage Statistics by Item.Close_QToolButton");
        clickButton(":Time-Phased Item Usage Statistics by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Time Phased Usage Statistics"+ e);
    }
    
    //------------Inventory History by lot/serial----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "History by Lot/Serial #...");
        activateItem(":*.Reports_QMenu_2", "History by Lot/Serial #...");
        
        if(object.exists(":Detailed Inventory History by Lot/Serial #.Schedule_QToolButton"))
            
            test.fail("Schedule button exists in Detailed Inventory History by Lot/Serial # screen");
        else
            test.pass("Schedule button doesn't exists in Detailed Inventory History by Lot/Serial # screen");
        
        waitForObject(":Detailed Inventory History by Lot/Serial #.Close_QToolButton");
        clickButton(":Detailed Inventory History by Lot/Serial #.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling inventory history by lot/serial"+ e);
    }
    
    
    //------------Inventory History by location----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "History by Location...");
        activateItem(":*.Reports_QMenu_2", "History by Location...");
        if(object.exists(":Detailed Inventory History by Location.Schedule_QToolButton"))
            test.fail("Schedule button exists in Detailed Inventory History by Location screen");
        else
            test.pass("Schedule button doesn't exists in Detailed Inventory History by Location screen");    
        waitForObject(":Detailed Inventory History by Location.Close_QToolButton");
        clickButton(":Detailed Inventory History by Location.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Inventory History by location"+ e);
    }
    //------------Location Detail----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Location/Lot/Serial # Detail...");
        activateItem(":*.Reports_QMenu_2", "Location/Lot/Serial # Detail...");
        if(object.exists(":Location/Lot/Serial # Detail.Schedule_QToolButton"))
            test.fail("Schedule button exists in Location/Lot/Serial # Detail screen");
        else
            test.pass("Schedule button doesn't exists in Location/Lot/Serial # Detail screen");    
        
        waitForObject(":Location/Lot/Serial # Detail.Close_QToolButton");
        clickButton(":Location/Lot/Serial # Detail.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in submitting location details"+ e);
    }
    
    
    //------------Inventory Availability----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Inventory Availability...");
        activateItem(":*.Reports_QMenu_2", "Inventory Availability...");
        if(object.exists(":Inventory Availability.Schedule_QToolButton"))
            test.fail("Schedule button exists in Inventory Availability screen");
        else
            test.pass("Schedule button doesn't exists in Inventory Availability screen");    
        
        waitForObject(":Inventory Availability.Close_QToolButton");
        clickButton(":Inventory Availability.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling inventory availability"+ e);
    }
    
    
    //------------Substitute Availability----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Substitute Availability...");
        activateItem(":*.Reports_QMenu_2", "Substitute Availability...");
        if(object.exists(":Substitute Availability by Root Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Substitute Availability by Root Item screen");
        else
            test.pass("Schedule button doesn't exists in Substitute Availability by Root Item screen");    
        
        waitForObject(":Substitute Availability by Root Item.Close_QToolButton");
        clickButton(":Substitute Availability by Root Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in  substitute availability"+ e);
    }
    
    //------------Slow Moving Inventory----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Slow Moving Inventory...");
        activateItem(":*.Reports_QMenu_2", "Slow Moving Inventory...");
        if(object.exists(":Slow Moving Inventory.Schedule_QToolButton"))
            test.fail("Schedule button exists in Slow Moving Inventory screen");
        else
            test.pass("Schedule button doesn't exists in Slow Moving Inventory screen");    
        
        waitForObject(":Slow Moving Inventory.Close_QToolButton");
        clickButton(":Slow Moving Inventory.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in slow moving inventory "+ e);
    }
    
    
    //------------Expired Inventory----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Expired Inventory...");
        activateItem(":*.Reports_QMenu_2", "Expired Inventory...");
        if(object.exists(":Expired Inventory.Schedule_QToolButton"))
            test.fail("Schedule button exists in Expired Inventory screen");
        else
            test.pass("Schedule button doesn't exists in Expired Inventory screen");    
        
        waitForObject(":Expired Inventory.Close_QToolButton");
        clickButton(":Expired Inventory.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in expired inventory "+ e);
    }
    

    //------------Item Sites----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Item Site");
        activateItem(":*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        if(object.exists(":Item Sites.Schedule_QToolButton"))
            test.fail("Schedule button exists in Item Sites screen");
        else
            test.pass("Schedule button doesn't exists in Item Sites screen");    
        
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Item Sites screen"+ e);
    }
    
    //------------ Detailed Inventory History ----------
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory")
                activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Lot/Serial Control");
        activateItem(":*.Inventory_QMenu", "Lot/Serial Control");
        waitForObjectItem(":*.Lot/Serial Control_QMenu", "Detailed Inventory History...");
        activateItem(":*.Lot/Serial Control_QMenu", "Detailed Inventory History...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_7");
        if(object.exists(":Detailed Inventory History by Lot/Serial #.Schedule_QToolButton"))
            test.fail("Schedule button exists in Detailed Inventory History by Lot/Serial # screen");
        else
            test.pass("Schedule button doesn't exists in Detailed Inventory History by Lot/Serial # screen");    
        
        waitForObject(":Detailed Inventory History by Lot/Serial #.Close_QToolButton");
        clickButton(":Detailed Inventory History by Lot/Serial #.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Detailed Inventory History" + e);
    }
    
    //----------- Running availability(Schedule) ---------------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule")
                activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Reports");
        activateItem(":*.Schedule_QMenu", "Reports");  
        waitForObjectItem(":*.Reports_QMenu", "Running Availability...");
        activateItem(":*.Reports_QMenu", "Running Availability...");
        if(object.exists(":Running Availability.Schedule_QToolButton"))
            test.fail("Schedule button exists in Running Availability screen");
        else
            test.pass("Schedule button doesn't exists in Running Availability screen");    
        
        waitForObject(":Running Availability.Close_QToolButton");
        clickButton(":Running Availability.Close_QToolButton"); 
    }
    catch(e)
    {
        test.fail("Exception in Running Availability screen" + e);
    }
    
    //--------------Purchase Requests by Planner code -----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Purchase Requests")
                activateItem(":*.Purchase_QMenu", "Purchase Requests");
        waitForObjectItem(":*.Purchase Requests_QMenu", "by Planner Code...");
        activateItem(":*.Purchase Requests_QMenu", "by Planner Code...");
        if(object.exists(":Purchase Requests by Planner Code.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Requests by Planner Code screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Requests by Planner Code screen");    
        
        waitForObject(":Purchase Requests by Planner Code.Close_QToolButton");
        clickButton(":Purchase Requests by Planner Code.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Purchase Requests by Planner Code screen" + e);
    }
    
    //----------Purchase Requests by Item------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Purchase Requests")
                activateItem(":*.Purchase_QMenu", "Purchase Requests");
        waitForObjectItem(":*.Purchase Requests_QMenu", "by Item...");
        activateItem(":*.Purchase Requests_QMenu", "by Item...");
        if(object.exists(":Purchase Requests by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Requests by Item screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Requests by Item screen");    
        
        waitForObject(":Purchase Requests by Item.Close_QToolButton")
                clickButton(":Purchase Requests by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Purchase Requests by Item screen" + e);
    }
    
    //--------------Purchase orders by vendor -----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Purchase Orders");
        activateItem(":*.Reports_QMenu_8", "Purchase Orders");
        waitForObjectItem(":*.Purchase Orders_QMenu", "by Vendor...");
        activateItem(":*.Purchase Orders_QMenu", "by Vendor...");
        if(object.exists(":Purchase Orders by Vendor.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Orders by Vendor screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Orders by Vendor screen");    
        
        waitForObject(":Purchase Orders by Vendor.Close_QToolButton")
                clickButton(":Purchase Orders by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Purchase Orders by Vendor screen" + e);
    }
    
    //--------------Purchase orders by Date -----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Purchase Orders");
        activateItem(":*.Reports_QMenu_8", "Purchase Orders");
        waitForObjectItem(":*.Purchase Orders_QMenu", "by Date...");
        activateItem(":*.Purchase Orders_QMenu", "by Date...");
        if(object.exists(":Purchase Orders by Date.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Orders by date screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Orders by date screen");    
        
        waitForObject(":Purchase Orders by Date.Close_QToolButton");
        clickButton(":Purchase Orders by Date.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in Purchase Orders by Date screen" + e);
    }
    
    //--------------Purchase order Items by Vendor -----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Purchase Order Items");
        activateItem(":*.Reports_QMenu_8", "Purchase Order Items");
        waitForObjectItem(":*.Purchase Order Items_QMenu", "by Vendor...");
        activateItem(":*.Purchase Order Items_QMenu", "by Vendor...");
        if(object.exists(":Purchase Order Items by Vendor.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Order Items by Vendor screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Order Items by Vendor screen");    
        
        waitForObject(":Purchase Order Items by Vendor.Close_QToolButton");
        clickButton(":Purchase Order Items by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Purchase Order Items by Vendor");
    }
    
    //--------------Purchase order Items by Date -----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Purchase Order Items");
        activateItem(":*.Reports_QMenu_8", "Purchase Order Items");
        waitForObjectItem(":*.Purchase Order Items_QMenu", "by Date...");
        activateItem(":*.Purchase Order Items_QMenu", "by Date...");
        if(object.exists(":Purchase Order Items by Date.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Order Items by date screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Order Items by date screen");    
        
        waitForObject(":Purchase Order Items by Date.Close_QToolButton");
        clickButton(":Purchase Order Items by Date.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Purchase Order Items by Date");
    }
    
    //-------- Purchase Order Items by Item------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Purchase Order Items");
        activateItem(":*.Reports_QMenu_8", "Purchase Order Items");
        waitForObjectItem(":*.Purchase Order Items_QMenu", "by Item...");
        activateItem(":*.Purchase Order Items_QMenu", "by Item...");
        if(object.exists(":Purchase Order Items by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Order Items by Item screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Order Items by Item screen");    
        
        waitForObject(":Purchase Order Items by Item.Close_QToolButton");
        clickButton(":Purchase Order Items by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Purchase Order Items by Item");
    }
    
    
    //-------- Purchase Order History------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Purchase Order History...");
        activateItem(":*.Reports_QMenu_8", "Purchase Order History...");
        if(object.exists(":Purchase Order History.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Order History screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Order History screen");    
        
        waitForObject(":Purchase Order History.Close_QToolButton")
                clickButton(":Purchase Order History.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in Purchase Order History screen" + e);
    }
    
    
    
    //------------Receipts and Returns by Vendor-----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Receipts and Returns");
        activateItem(":*.Reports_QMenu_8", "Receipts and Returns");
        waitForObjectItem(":*.Receipts and Returns_QMenu", "by Vendor...");
        activateItem(":*.Receipts and Returns_QMenu", "by Vendor...");
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit")
                if(object.exists(":Receipts and Returns by Vendor.Schedule_QToolButton"))
                    test.fail("Schedule button exists in Receipts and Returns by Vendor screen");
        else
            test.pass("Schedule button doesn't exists in Receipts and Returns by Vendor screen");    
        
        waitForObject(":Receipts and Returns by Vendor.Close_QToolButton");
        clickButton(":Receipts and Returns by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Receipts and Returns by Vendor" + e);
    }
    
    
    //------------Receipts and Returns by Date-----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");   
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Receipts and Returns");
        activateItem(":*.Reports_QMenu_8", "Receipts and Returns");
        waitForObjectItem(":*.Receipts and Returns_QMenu", "by Date...");
        activateItem(":*.Receipts and Returns_QMenu", "by Date...");
        if(object.exists(":Receipts and Returns by Date.Schedule_QToolButton"))
            test.fail("Schedule button exists in Receipts and Returns by date screen");
        else
            test.pass("Schedule button doesn't exists in Receipts and Returns by date screen");    
        
        waitForObject(":Receipts and Returns by Date.Close_QToolButton");
        clickButton(":Receipts and Returns by Date.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Receipts and Returns by Date screen" + e);
    }
    
    
    //-----------Receipts and Returns by Item---------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");   
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Receipts and Returns");
        activateItem(":*.Reports_QMenu_8", "Receipts and Returns");
        waitForObjectItem(":*.Receipts and Returns_QMenu", "by Item...");
        activateItem(":*.Receipts and Returns_QMenu", "by Item..."); 
        if(object.exists(":Receipts and Returns by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Receipts and Returns by Item screen");
        else
            test.pass("Schedule button doesn't exists in Receipts and Returns by Item screen");    
        
        waitForObject(":Receipts and Returns by Item.Close_QToolButton");
        clickButton(":Receipts and Returns by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Receipts and Returns by Item screen" + e);
    }
    
    //-------- Purchase Price Variances by Vendor ------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Price Variances");
        activateItem(":*.Reports_QMenu_8", "Price Variances");
        waitForObjectItem(":*.Price Variances_QMenu", "by Vendor...");
        activateItem(":*.Price Variances_QMenu", "by Vendor...");
        
        if(object.exists(":Purchase Price Variances by Vendor.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Price Variances by Vendor screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Price Variances by Vendor screen");    
        
        waitForObject(":Purchase Price Variances by Vendor.Close_QToolButton");
        clickButton(":Purchase Price Variances by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Purchase Price Variances by Vendor");
    }
    
    
    //-------- Purchase Price Variances by Item ------------
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Price Variances");
        activateItem(":*.Reports_QMenu_8", "Price Variances");
        waitForObjectItem(":*.Price Variances_QMenu", "by Item...");
        activateItem(":*.Price Variances_QMenu", "by Item...");
        if(object.exists(":Purchase Price Variances by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Price Variances by Item screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Price Variances by Item screen");    
        
        waitForObject(":Purchase Price Variances by Item.Close_QToolButton");
        clickButton(":Purchase Price Variances by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Scheduling Purchase Price Variances by Item");
    }
    
    
    //-------- Delivery Date Variances by Vendor ------------
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Delivery Date Variances");
        activateItem(":*.Reports_QMenu_8", "Delivery Date Variances");
        waitForObjectItem(":*.Delivery Date Variances_QMenu", "by Vendor...");
        activateItem(":*.Delivery Date Variances_QMenu", "by Vendor...");
        if(object.exists(":Purchase Order Delivery Date Variances by Vendor.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Order Delivery Date Variances by Vendor screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Order Delivery Date Variances by Vendor screen");    
        
        waitForObject(":Purchase Order Delivery Date Variances by Vendor.Close_QToolButton");
        clickButton(":Purchase Order Delivery Date Variances by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Scheduling Delivery Date Variances by Vendor" + e);
    }
    
    //-------- Delivery Date Variances by Item ------------
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Delivery Date Variances");
        activateItem(":*.Reports_QMenu_8", "Delivery Date Variances");
        waitForObjectItem(":*.Delivery Date Variances_QMenu", "by Item...");
        activateItem(":*.Delivery Date Variances_QMenu", "by Item...");
        if(object.exists(":Purchase Order Delivery Date Variances by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Purchase Order Delivery Date Variances by Item screen");
        else
            test.pass("Schedule button doesn't exists in Purchase Order Delivery Date Variances by item screen");    
        
        waitForObject(":Purchase Order Delivery Date Variances by Item.Close_QToolButton");
        clickButton(":Purchase Order Delivery Date Variances by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Excepiton in Delivery Date Variances by Item screen" + e);
    }
    
    
    //------------ Rejected Material by vendor ----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");   
        waitForObjectItem(":*.Reports_QMenu_8", "Rejected Material...");
        activateItem(":*.Reports_QMenu_8", "Rejected Material..."); 
        if(object.exists(":Rejected Material by Vendor.Schedule_QToolButton"))
            test.fail("Schedule button exists in Rejected Material by Vendor screen");
        else
            test.pass("Schedule button doesn't exists in Rejected Material by Vendor screen");    
        
        waitForObject(":Rejected Material by Vendor.Close_QToolButton");
        clickButton(":Rejected Material by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Rejected Material by Vendor screen" + e);
    }
    
    
    //------------ Vendors List ----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Vendor");
        activateItem(":*.Purchase_QMenu", "Vendor");
        waitForObjectItem(":*.Vendor_QMenu", "List...");
        activateItem(":*.Vendor_QMenu", "List...");
        if(object.exists(":Vendors.Schedule_QToolButton"))
            test.fail("Schedule button exists in Vendors list screen");
        else
            test.pass("Schedule button doesn't exists in Vendors list screen");    
        
        waitForObject(":Vendors.Close_QToolButton");
        clickButton(":Vendors.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Vendors List screen" + e);
    }
    
    
    //------------ Work Order Schedule ----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Work Order Schedule");
        activateItem(":*.Reports_QMenu_5", "Work Order Schedule");
        if(object.exists(":Work Order Schedule.Schedule_QToolButton"))
            test.fail("Schedule button exists in Work Order Schedule screen");
        else
            test.pass("Schedule button doesn't exists in Work Order Schedule screen");    
        
        waitForObject(":Work Order Schedule.Close_QToolButton");
        clickButton(":Work Order Schedule.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Vendors List screen" + e);
    }
    
    
    //------------ Work Order Material Requirements By Work Order ----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Material Requirements")
                activateItem(":*.Reports_QMenu_5", "Material Requirements");
        waitForObjectItem(":*.Material Requirements_QMenu", "by Work Order...");
        activateItem(":*.Material Requirements_QMenu", "by Work Order...");
        if(object.exists(":Work Order Material Requirements By Work Order.Schedule_QToolButton"))
            test.fail("Schedule button exists in Work Order Material Requirements By Work Order screen");
        else
            test.pass("Schedule button doesn't exists in Work Order Material Requirements By Work Order screen");    
        
        waitForObject(":Work Order Material Requirements By Work Order.Close_QToolButton");
        clickButton(":Work Order Material Requirements By Work Order.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order Material Requirements By Work Order screen" + e);
    }
    
    
    
    
    //------------ Work Order Material Requirements By Component Item----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Material Requirements");
        activateItem(":*.Reports_QMenu_5", "Material Requirements");
        waitForObjectItem(":*.Material Requirements_QMenu", "by Component Item...");
        activateItem(":*.Material Requirements_QMenu", "by Component Item...");
        if(object.exists(":W/O Material Requirements by Component Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Work Order Material Requirements By Component Itemscreen");
        else
            test.pass("Schedule button doesn't exists in Work Order Material Requirements By Component Item screen");    
        
        waitForObject(":W/O Material Requirements by Component Item.Close_QToolButton");
        clickButton(":W/O Material Requirements by Component Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order Material Requirements by Component Item screen" + e);
    }
    
    //-------------Inventory Availability----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports")
                activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Inventory Availability...");
        activateItem(":*.Reports_QMenu_5", "Inventory Availability...");
        if(object.exists(":Inventory Availability by Work Order.Schedule_QToolButton"))
            test.fail("Schedule button exists in Inventory Availability by Work Order screen");
        else
            test.pass("Schedule button doesn't exists in Inventory Availability by Work Order screen");    
        
        waitForObject(":Inventory Availability by Work Order.Close_QToolButton");
        clickButton(":Inventory Availability by Work Order.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Inventory Availability screen" + e);
    }
    
    //--------------Pending W/O Material Availability-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");   
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Pending Material Availability...");
        activateItem(":*.Reports_QMenu_5", "Pending Material Availability...");
        if(object.exists(":Pending W/O Material Availability.Schedule_QToolButton"))
            test.fail("Schedule button exists in Pending W/O Material Availability screen");
        else
            test.pass("Schedule button doesn't exists in Pending W/O Material Availability screen");    
        
        waitForObject(":Pending W/O Material Availability.Close_QToolButton");
        clickButton(":Pending W/O Material Availability.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Pending W/O Material Availability screen" + e);
    }
    
    
    //------Work Order History by Class Code----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");   
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "History");
        activateItem(":*.Reports_QMenu_5", "History");
        waitForObjectItem(":*.History_QMenu", "by Class Code...");
        activateItem(":*.History_QMenu", "by Class Code...");
        if(object.exists(":Work Order History by Class Code.Schedule_QToolButton"))
            test.fail("Schedule button exists in Work Order History by Class Code screen");
        else
            test.pass("Schedule button doesn't exists in Work Order History by Class Code screen");    
        
        waitForObject(":Work Order History by Class Code.Close_QToolButton");
        clickButton(":Work Order History by Class Code.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order History by Class Code screen" + e);
    }
    
    //------Work Order History by Item----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");   
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "History");
        activateItem(":*.Reports_QMenu_5", "History");
        waitForObjectItem(":*.History_QMenu", "by Item...");
        activateItem(":*.History_QMenu", "by Item...");
        if(object.exists(":Work Order History by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Work Order History by Item screen");
        else
            test.pass("Schedule button doesn't exists in Work Order History by Item screen");    
        
        waitForObject(":Work Order History by Item.Close_QToolButton");
        clickButton(":Work Order History by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order History by Item screen");
    }
    
    
    //------Work Order History by W/O Number ----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");   
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "History");
        activateItem(":*.Reports_QMenu_5", "History");
        waitForObjectItem(":*.History_QMenu", "by W/O Number...");
        activateItem(":*.History_QMenu", "by W/O Number...");
        if(object.exists(":Work Order History by W/O Number.Schedule_QToolButton"))
            test.fail("Schedule button exists in Work Order History by W/O Number screen");
        else
            test.pass("Schedule button doesn't exists in Work Order History by W/O Number screen");    
        
        waitForObject(":Work Order History by W/O Number.Close_QToolButton")
                clickButton(":Work Order History by W/O Number.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order History by W/O Number screen" + e);
    }
    
    //------Work Order Costing----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");   
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Work Order Costing...");
        activateItem(":*.Reports_QMenu_5", "Work Order Costing...");
        if(object.exists(":Work Order Costing.Schedule_QToolButton"))
            test.fail("Schedule button exists in Work Order Costing screen");
        else
            test.pass("Schedule button doesn't exists in Work Order Costing screen");    
        
        waitForObject(":Work Order Costing.Close_QToolButton");
        clickButton(":Work Order Costing.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order Costing screen:" + e);
    }
    
    
    //---------Material Usage Variance by Site----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Material Usage Variance");
        activateItem(":*.Reports_QMenu_5", "Material Usage Variance");
        waitForObjectItem(":*.Material Usage Variance_QMenu", "by Site...");
        activateItem(":*.Material Usage Variance_QMenu", "by Site...");
        if(object.exists(":Material Usage Variance by Site.Schedule_QToolButton"))
            test.fail("Schedule button exists in Material Usage Variance by Site screen");
        else
            test.pass("Schedule button doesn't exists in Material Usage Variance by Site screen");    
        
        waitForObject(":Material Usage Variance by Site.Close_QToolButton");
        clickButton(":Material Usage Variance by Site.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Material Usage Variance by Site screen:" + e);
    }
    
    //---------Material Usage Variance by Item----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Material Usage Variance");
        activateItem(":*.Reports_QMenu_5", "Material Usage Variance");
        waitForObjectItem(":*.Material Usage Variance_QMenu", "by Item...");
        activateItem(":*.Material Usage Variance_QMenu", "by Item...");
        if(object.exists(":Material Usage Variance by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Material Usage Variance by Item screen");
        else
            test.pass("Schedule button doesn't exists in Material Usage Variance by Item screen");    
        
        waitForObject(":Material Usage Variance by Item.Close_QToolButton");
        clickButton(":Material Usage Variance by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Material Usage Variance by Item screen:" + e);
    }
    
    //---------------Material Usage Variance by BOM Item-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Material Usage Variance");
        activateItem(":*.Reports_QMenu_5", "Material Usage Variance");
        waitForObjectItem(":*.Material Usage Variance_QMenu", "by BOM Item...");
        activateItem(":*.Material Usage Variance_QMenu", "by BOM Item...");
        if(object.exists(":Material Usage Variance by Bill of Materials Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Material Usage Variance by Bill of Materials Item screen");
        else
            test.pass("Schedule button doesn't exists in Material Usage Variance by Bill of Materials Item screen");    
        
        waitForObject(":Material Usage Variance by Bill of Materials Item.Close_QToolButton");
        clickButton(":Material Usage Variance by Bill of Materials Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Material Usage Variance by BOM Item screen:" + e);
    }
    
    //-------------Material Usage Variance by Component Item----------
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Material Usage Variance");
        activateItem(":*.Reports_QMenu_5", "Material Usage Variance");
        waitForObjectItem(":*.Material Usage Variance_QMenu", "by Component Item...")
                activateItem(":*.Material Usage Variance_QMenu", "by Component Item...");
        if(object.exists(":Material Usage Variance by Component Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Material Usage Variance by Component Item screen");
        else
            test.pass("Schedule button doesn't exists in Material Usage Variance by Component Item screen");    
        
        waitForObject(":Material Usage Variance by Component Item.Close_QToolButton");
        clickButton(":Material Usage Variance by Component Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Material Usage Variance by Component Item screen:" + e);
    } 
    
    
    //-------------Material Usage Variance by Work Order----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Material Usage Variance");
        activateItem(":*.Reports_QMenu_5", "Material Usage Variance");
        waitForObjectItem(":*.Material Usage Variance_QMenu", "by Work Order...");
        activateItem(":*.Material Usage Variance_QMenu", "by Work Order...");
        if(object.exists(":Material Usage Variance by Work Order.Schedule_QToolButton"))
            test.fail("Schedule button exists in Material Usage Variance by Work Order screen");
        else
            test.pass("Schedule button doesn't exists in Material Usage Variance by Work Order screen");    
        
        waitForObject(":Material Usage Variance by Work Order.Close_QToolButton");
        clickButton(":Material Usage Variance by Work Order.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Material Usage Variance by Work Order screen" + e);
    }
    
    //-------------Incident List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Incident");
        activateItem(":*.CRM_QMenu", "Incident");
        waitForObjectItem(":*.Incident_QMenu", "List...");
        activateItem(":*.Incident_QMenu", "List...");
        if(object.exists(":Incidents.Schedule_QToolButton"))
            test.fail("Schedule button exists in Incidents screen");
        else
            test.pass("Schedule button doesn't exists in Incidents screen");    
        
        waitForObject(":Incidents.Close_QToolButton");
        clickButton(":Incidents.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Incident List screen" + e);
    }
    
    
    //------------To-Do List screen------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "To-Do");
        activateItem(":*.CRM_QMenu", "To-Do");
        waitForObjectItem(":*.To-Do_QMenu", "List...");
        activateItem(":*.To-Do_QMenu", "List..."); 
        if(object.exists(":To-Do Items.Schedule_QToolButton"))
            test.fail("Schedule button exists in To-Do Items screen");
        else
            test.pass("Schedule button doesn't exists in To-Do Items screen");    
        
        waitForObject(":To-Do Items.Close_QToolButton");
        clickButton(":To-Do Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in To-Do List screen" + e);
    }
    
    
    //-------------Opportunity List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Opportunity");
        activateItem(":*.CRM_QMenu", "Opportunity");
        waitForObjectItem(":*.Opportunity_QMenu", "List...");
        activateItem(":*.Opportunity_QMenu", "List...");
        if(object.exists(":Opportunities.Schedule_QToolButton"))
            test.fail("Schedule button exists in Opportunities screen");
        else
            test.pass("Schedule button doesn't exists in Opportunities screen");    
        
        waitForObject(":Opportunities.Close_QToolButton");
        clickButton(":Opportunities.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Opportunities screen");
    }
    
    //---------Order Activity by Project-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Reports");
        activateItem(":*.CRM_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_9", "Order Activity by Project...");
        activateItem(":*.Reports_QMenu_9", "Order Activity by Project...");
        if(object.exists(":Order Activity by Project.Schedule_QToolButton"))
            test.fail("Schedule button exists in Order Activity by Project screen");
        else
            test.pass("Schedule button doesn't exists in Order Activity by Project screen");    
        
        waitForObject(":Order Activity by Project.Close_QToolButton");
        clickButton(":Order Activity by Project.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Order Activity by Project screen");
    }
    //-------Incidents by CRM Account----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Reports");
        activateItem(":*.CRM_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_9", "Incidents by CRM Account...");
        activateItem(":*.Reports_QMenu_9", "Incidents by CRM Account...");
        if(object.exists(":Incidents by CRM Account.Schedule_QToolButton"))
            test.fail("Schedule button exists in Incidents by CRM Account screen");
        else
            test.pass("Schedule button doesn't exists in Incidents by CRM Account screen"); 
        waitForObject(":Incidents by CRM Account.Close_QToolButton");
        clickButton(":Incidents by CRM Account.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Incidents by CRM Account screen");
    } 
    
    //-------To-Do List Items by User and Incident------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Reports");
        activateItem(":*.CRM_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_9", "To-Do List Items by User and Incident...");
        activateItem(":*.Reports_QMenu_9", "To-Do List Items by User and Incident...");
        if(object.exists(":To-Do List Items by User and Incident.Schedule_QToolButton"))
            test.fail("Schedule button exists in To-Do List Items by User and Incident screen");
        else
            test.pass("Schedule button doesn't exists in To-Do List Items by User and Incident screen"); 
        waitForObject(":To-Do List Items by User and Incident.Close_QToolButton");
        clickButton(":To-Do List Items by User and Incident.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in To-Do List Items by User and Incident screen" + e);
    }
    
    
    //-------------Accounts List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Account");
        activateItem(":*.CRM_QMenu", "Account");
        waitForObjectItem(":*.Account_QMenu", "List...");
        activateItem(":*.Account_QMenu", "List...");
        if(object.exists(":Accounts.Schedule_QToolButton"))
            test.fail("Schedule button exists in Accounts screen");
        else
            test.pass("Schedule button doesn't exists in Accounts screen"); 
        waitForObject(":Accounts.Close_QToolButton");
        clickButton(":Accounts.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Accounts List screen" + e);
    }
    
    //------------Contact List-------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Contact");
        activateItem(":*.CRM_QMenu", "Contact");
        waitForObjectItem(":*.Contact_QMenu", "List...");
        activateItem(":*.Contact_QMenu", "List...");
        if(object.exists(":Contacts.Schedule_QToolButton"))
            test.fail("Schedule button exists in Contacts screen");
        else
            test.pass("Schedule button doesn't exists in Contacts screen"); 
        waitForObject(":Contacts.Close_QToolButton");
        clickButton(":Contacts.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Contacts List screen" + e);
    }
    
    //--------Address List----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Address");
        activateItem(":*.CRM_QMenu", "Address");
        waitForObjectItem(":*.Address_QMenu", "List...");
        activateItem(":*.Address_QMenu", "List...");
        if(object.exists(":Addresses.Schedule_QToolButton"))
            test.fail("Schedule button exists in Addresses screen");
        else
            test.pass("Schedule button doesn't exists in Addresses screen"); 
        waitForObject(":Addresses.Close_QToolButton");
        clickButton(":Addresses.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Address List screen" + e);
    }
    
    //----------Sales Order List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Sales Order");
        activateItem(":*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":*.Sales Order_QMenu", "List Open...");
        activateItem(":*.Sales Order_QMenu", "List Open...");
        if(object.exists(":Open Sales Orders.Schedule_QToolButton"))
            test.fail("Schedule button exists in Open Sales Orders screen");
        else
            test.pass("Schedule button doesn't exists in Open Sales Orders screen"); 
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Sales Order list screen");
    }
    
    //-------------Sales Order Status----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Lookup");
        activateItem(":*.Sales_QMenu", "Lookup");
        waitForObjectItem(":*.Lookup_QMenu", "Sales Order Status...");
        activateItem(":*.Lookup_QMenu", "Sales Order Status...");
        if(object.exists(":Sales Order Status.Schedule_QToolButton"))
            test.fail("Schedule button exists in Sales Order Status screen");
        else
            test.pass("Schedule button doesn't exists in Sales Order Status screen"); 
        waitForObject(":Sales Order Status.Close_QToolButton");
        clickButton(":Sales Order Status.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Sales Order status screen" + e);
    }
    
    //-------------Summarized backlog----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Summarized Backlog...");
        activateItem(":*.Reports_QMenu_10", "Summarized Backlog...");
        if(object.exists(":Summarized Backlog by Site.Schedule_QToolButton"))
            test.fail("Schedule button exists in Summarized Backlog by Site screen");
        else
            test.pass("Schedule button doesn't exists in Summarized Backlog by Site screen"); 
        waitForObject(":Summarized Backlog by Site.Close_QToolButton");
        clickButton(":Summarized Backlog by Site.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Summarized backlog screen" + e);
    }
    
    
    //---------Partially Shipped orders---------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Partially Shipped Orders...");
        activateItem(":*.Reports_QMenu_10", "Partially Shipped Orders...");
        if(object.exists(":Partially Shipped Orders.Schedule_QToolButton"))
            test.fail("Schedule button exists in Partially Shipped Orders screen");
        else
            test.pass("Schedule button doesn't exists in Partially Shipped Orders screen"); 
        waitForObject(":Partially Shipped Orders.Close_QToolButton");
        clickButton(":Partially Shipped Orders.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in scheduling Partiall Shipped orders screen" + e);
    }
    
    //------------- Inventory Availability by Sales Order ----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Availability by Sales Order...");
        activateItem(":*.Reports_QMenu_10", "Availability by Sales Order...");
        if(object.exists(":Inventory Availability by Sales Order.Schedule_QToolButton"))
            test.fail("Schedule button exists in Inventory Availability by Sales Order screen");
        else
            test.pass("Schedule button doesn't exists in Inventory Availability by Sales Order screen"); 
        waitForObject(":Inventory Availability by Sales Order.Close_QToolButton");
        clickButton(":Inventory Availability by Sales Order.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Summarized backlog screen" + e);
    }
    //----------Inventory Availability by Customer Type-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Availability by Customer Type...");
        activateItem(":*.Reports_QMenu_10", "Availability by Customer Type...");
        if(object.exists(":Inventory Availability by Customer Type.Schedule_QToolButton"))
            test.fail("Schedule button exists in Inventory Availability by Customer Type screen");
        else
            test.pass("Schedule button doesn't exists in Inventory Availability by Customer Type screen"); 
        waitForObject(":Inventory Availability by Customer Type.Close_QToolButton");
        clickButton(":Inventory Availability by Customer Type.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Inventory Availability by Customer Type screen" + e);
    }
    //----------Earned Commissions--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Earned Commissions...");
        activateItem(":*.Reports_QMenu_10", "Earned Commissions...");
        if(object.exists(":Earned Commissions.Schedule_QToolButton"))
            test.fail("Schedule button exists in Earned Commissions screen");
        else
            test.pass("Schedule button doesn't exists in Earned Commissions screen"); 
        
        waitForObject(":Earned Commissions.Close_QToolButton");
        clickButton(":Earned Commissions.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Earned Commissions screen" +  e);
    }
    
    //---------Brief Earned Commissions-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Brief Earned Commissions...");
        activateItem(":*.Reports_QMenu_10", "Brief Earned Commissions...");
        if(object.exists(":Brief Earned Commissions.Schedule_QToolButton"))
            test.fail("Schedule button exists in Brief Earned Commissions screen");
        else
            test.pass("Schedule button doesn't exists in Brief Earned Commissions screen"); 
        waitForObject(":Brief Earned Commissions.Close_QToolButton");
        clickButton(":Brief Earned Commissions.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Summarized backlog screen" + e);
    }
    
    
    //-------------Sales Bookings ----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Bookings...");
        activateItem(":*.Analysis_QMenu", "Bookings...");
        snooze(1);
        if(object.exists(":Bookings.Schedule_QToolButton"))
            test.fail("Schedule button exists in Bookings screen");
        else
            test.pass("Schedule button doesn't exists in Bookings screen"); 
        waitForObject(":Bookings.Close_QToolButton");
        clickButton(":Bookings.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Bookings screen" + e);
    }
    
    //-----------Item Prices by Cutomer Type--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Pricing");
        activateItem(":*.Sales_QMenu", "Pricing");
        waitForObjectItem(":*.Pricing_QMenu", "Reports");
        activateItem(":*.Pricing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_11", "Item Prices by Customer Type...");
        activateItem(":*.Reports_QMenu_11", "Item Prices by Customer Type...");
        if(object.exists(":Prices by Customer Type.Schedule_QToolButton"))
            test.fail("Schedule button exists in Prices by Customer Type screen");
        else
            test.pass("Schedule button doesn't exists in Prices by Customer Type screen"); 
        waitForObject(":Prices by Customer Type.Close_QToolButton");
        clickButton(":Prices by Customer Type.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Item Prices by Cutomer Type screen" + e);
    }
    
    //----------Item Prices by Customer----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Pricing");
        activateItem(":*.Sales_QMenu", "Pricing");
        waitForObjectItem(":*.Pricing_QMenu", "Reports");
        activateItem(":*.Pricing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_11", "Item Prices by Customer...");
        activateItem(":*.Reports_QMenu_11", "Item Prices by Customer...");
        if(object.exists(":Prices by Customer.Schedule_QToolButton"))
            test.fail("Schedule button exists in Prices by Customer screen");
        else
            test.pass("Schedule button doesn't exists in Prices by Customer screen"); 
        waitForObject(":Prices by Customer.Close_QToolButton");
        clickButton(":Prices by Customer.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Item Prices by Cutomer screen" + e);
    }
    //----------Item Prices by Item----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Pricing");
        activateItem(":*.Sales_QMenu", "Pricing");
        waitForObjectItem(":*.Pricing_QMenu", "Reports");
        activateItem(":*.Pricing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_11", "Item Prices by Item...");
        activateItem(":*.Reports_QMenu_11", "Item Prices by Item...");
        if(object.exists(":Prices by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Prices by Item screen");
        else
            test.pass("Schedule button doesn't exists in Prices by Item screen"); 
        waitForObject(":Prices by Item.Close_QToolButton");
        clickButton(":Prices by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Item Prices by Item screen" + e);
    }
    //-----------Freight Prices by Customer Type--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Pricing");
        activateItem(":*.Sales_QMenu", "Pricing");
        waitForObjectItem(":*.Pricing_QMenu", "Reports");
        activateItem(":*.Pricing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_11", "Freight Prices by Customer Type...");
        activateItem(":*.Reports_QMenu_11", "Freight Prices by Customer Type...");
        if(object.exists(":Freight Prices by Customer Type.Schedule_QToolButton"))
            test.fail("Schedule button exists in Freight Prices by Customer Type screen");
        else
            test.pass("Schedule button doesn't exists in Freight Prices by Customer Type screen"); 
        waitForObject(":Freight Prices by Customer Type.Close_QToolButton");
        clickButton(":Freight Prices by Customer Type.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Freight Prices by Cutomer Type screen" + e);
    }
    //-----------Freight Prices by Customer--------
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Pricing");
        activateItem(":*.Sales_QMenu", "Pricing");
        waitForObjectItem(":*.Pricing_QMenu", "Reports");
        activateItem(":*.Pricing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_11", "Freight Prices by Customer...");
        activateItem(":*.Reports_QMenu_11", "Freight Prices by Customer...");
        if(object.exists(":Freight Prices by Customer.Schedule_QToolButton"))
            test.fail("Schedule button exists in Freight Prices by Customer screen");
        else
            test.pass("Schedule button doesn't exists in Freight Prices by Customer screen"); 
        waitForObject(":Freight Prices by Customer.Close_QToolButton");
        clickButton(":Freight Prices by Customer.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception inFreight Prices by Customer screen" + e);
    }
    //------------- Open Payables ----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Payable");
        activateItem(":*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":*.Accounts Payable_QMenu", "Reports");
        activateItem(":*.Accounts Payable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_3", "Open Payables...");
        activateItem(":*.Reports_QMenu_3", "Open Payables...");
        if(object.exists(":Open Payables.Schedule_QToolButton"))
            test.fail("Schedule button exists in Open Payables screen");
        else
            test.pass("Schedule button doesn't exists in Open Payables screen"); 
        waitForObject(":Open Payables.Close_QToolButton");
        clickButton(":Open Payables.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Open Payables screen");
    }
    //---------Voucher Register---------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Payable");
        activateItem(":*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":*.Accounts Payable_QMenu", "Reports");
        activateItem(":*.Accounts Payable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_3", "Voucher Register...");
        activateItem(":*.Reports_QMenu_3", "Voucher Register...");
        if(object.exists(":Voucher Register.Schedule_QToolButton"))
            test.fail("Schedule button exists in Voucher Register screen");
        else
            test.pass("Schedule button doesn't exists in Voucher Register screen"); 
        waitForObject(":Voucher Register.Close_QToolButton");
        clickButton(":Voucher Register.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Voucher Register screen");
    }
    //-------A/P Applications--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Payable");
        activateItem(":*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":*.Accounts Payable_QMenu", "Reports");
        activateItem(":*.Accounts Payable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_3", "Applications...");
        activateItem(":*.Reports_QMenu_3", "Applications...");
        if(object.exists(":A/P Applications.Schedule_QToolButton"))
            test.fail("Schedule button exists in A/P Applications screen");
        else
            test.pass("Schedule button doesn't exists in A/P Applications screen"); 
        waitForObject(":A/P Applications.Close_QToolButton");
        clickButton(":A/P Applications.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("exception in A/P Applications screen" + e);
    }
    //-------Vendor History--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Payable");
        activateItem(":*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":*.Accounts Payable_QMenu", "Reports");
        activateItem(":*.Accounts Payable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_3", "Vendor History...");
        activateItem(":*.Reports_QMenu_3", "Vendor History...");
        if(object.exists(":Vendor History.Schedule_QToolButton"))
            test.fail("Schedule button exists in Vendor History screen");
        else
            test.pass("Schedule button doesn't exists in Vendor History screen"); 
        waitForObject(":Vendor History.Close_QToolButton");
        clickButton(":Vendor History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Vendor History screen" + e);
    }
    
    //-------Invoice Register--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
        activateItem(":*.Accounts Receivable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_4", "Invoice Register...");
        activateItem(":*.Reports_QMenu_4", "Invoice Register...");
        if(object.exists(":Invoice Register.Schedule_QToolButton"))
            test.fail("Schedule button exists in Invoice Register screen");
        else
            test.pass("Schedule button doesn't exists in Invoice Register screen"); 
        waitForObject(":Invoice Register.Close_QToolButton");
        clickButton(":Invoice Register.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Invoice Register screen" + e);
    }
    
    //----------Cash Receipts---------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
        activateItem(":*.Accounts Receivable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_4", "Cash Receipts...");
        activateItem(":*.Reports_QMenu_4", "Cash Receipts...");
        if(object.exists(":Cash Receipts.Schedule_QToolButton"))
            test.fail("Schedule button exists in Cash Receipts screen");
        else
            test.pass("Schedule button doesn't exists in Cash Receipts screen"); 
        waitForObject(":Cash Receipts.Close_QToolButton");
        clickButton(":Cash Receipts.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Cash Receipts screen" + e);
    }
    
    //-------A/R Application--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
        activateItem(":*.Accounts Receivable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_4", "Applications...");
        activateItem(":*.Reports_QMenu_4", "Applications...");
        if(object.exists(":A/R Applications.Schedule_QToolButton"))
            test.fail("Schedule button exists in A/R Applications screen");
        else
            test.pass("Schedule button doesn't exists in A/R Applications screen"); 
        waitForObject(":A/R Applications.Close_QToolButton");
        clickButton(":A/R Applications.Close_QToolButton");
    }
    
    catch(e)
    {
        test.fail("exception in A/R Applications screen" + e);
    }
    
    //--------Deposits Register---------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable")
                waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
        activateItem(":*.Accounts Receivable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_4", "Deposits Register...");
        activateItem(":*.Reports_QMenu_4", "Deposits Register...");
        if(object.exists(":Deposits Register.Schedule_QToolButton"))
            test.fail("Schedule button exists in Deposits Register screen");
        else
            test.pass("Schedule button doesn't exists in Deposits Register screen"); 
        waitForObject(":Deposits Register.Close_QToolButton");
        clickButton(":Deposits Register.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Deposits Register screen" + e);
    }
    
    //--------Customer History---------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
        activateItem(":*.Accounts Receivable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_4", "Customer History...");
        activateItem(":*.Reports_QMenu_4", "Customer History...");
        if(object.exists(":Customer History.Schedule_QToolButton"))
            test.fail("Schedule button exists in Customer History screen");
        else
            test.pass("Schedule button doesn't exists in Customer History screen"); 
        waitForObject(":Customer History.Close_QToolButton");
        clickButton(":Customer History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Customer History screen" + e);
    }
    //-------G/L transactions--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "General Ledger");
        activateItem(":*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Reports");
        activateItem(":*.General Ledger_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_12", "Transactions...");
        activateItem(":*.Reports_QMenu_12", "Transactions...");
        if(object.exists(":General Ledger Transactions.Schedule_QToolButton"))
            test.fail("Schedule button exists in General Ledger Transactions screen");
        else
            test.pass("Schedule button doesn't exists in General Ledger Transactions screen"); 
        waitForObject(":General Ledger Transactions.Close_QToolButton");
        clickButton(":General Ledger Transactions.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in General Ledger Transactions screen" + e);
    }
    //------------Summarized Transactions---------   
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "General Ledger");
        activateItem(":*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Reports");
        activateItem(":*.General Ledger_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_12", "Summarized Transactions...");
        activateItem(":*.Reports_QMenu_12", "Summarized Transactions...");
        if(object.exists(":Summarized General Ledger Transactions.Schedule_QToolButton"))
            test.fail("Schedule button exists in Summarized General Ledger Transactions screen");
        else
            test.pass("Schedule button doesn't exists in Summarized General Ledger Transactions screen"); 
        waitForObject(":Summarized General Ledger Transactions.Close_QToolButton");
        clickButton(":Summarized General Ledger Transactions.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Summarized General Ledger Transactions screen" + e);
    }
    
    //--------Journal Series------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "General Ledger");
        activateItem(":*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Reports");
        activateItem(":*.General Ledger_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_12", "Series...");
        activateItem(":*.Reports_QMenu_12", "Series...");
        if(object.exists(":Journal Series.Schedule_QToolButton"))
            test.fail("Schedule button exists in Journal Series screen");
        else
            test.pass("Schedule button doesn't exists in Journal Series screen"); 
        waitForObject(":Journal Series.Close_QToolButton");
        clickButton(":Journal Series.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Journal Series screen" + e);
    }
    //------Standard Journal History------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "General Ledger");
        activateItem(":*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Reports");
        activateItem(":*.General Ledger_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_12", "Standard Journal History...");
        activateItem(":*.Reports_QMenu_12", "Standard Journal History...");
        if(object.exists(":Standard Journal History.Schedule_QToolButton"))
            test.fail("Schedule button exists in Standard Journal History screen");
        else
            test.pass("Schedule button doesn't exists in Standard Journal History screen"); 
        waitForObject(":Standard Journal History.Close_QToolButton");
        clickButton(":Standard Journal History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in Standard Journal History screen" + e);
    }
    
    //-------Summarized Bank Reconciliation History--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Bank Reconciliation");
        activateItem(":*.Accounting_QMenu", "Bank Reconciliation");
        waitForObjectItem(":*.Bank Reconciliation_QMenu", "Reports");
        activateItem(":*.Bank Reconciliation_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_13", "Summarized History");
        activateItem(":*.Reports_QMenu_13", "Summarized History");
        if(object.exists(":Summarized Bank Reconciliation History.Schedule_QToolButton"))
            test.fail("Schedule button exists in Summarized Bank Reconciliation History screen");
        else
            test.pass("Schedule button doesn't exists in Summarized Bank Reconciliation History screen"); 
        waitForObject(":Summarized Bank Reconciliation History.Close_QToolButton");
        clickButton(":Summarized Bank Reconciliation History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in  Summarized Bank Reconciliation History screen");
    }
    
    //-----------------View Trial Balances---------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Financial Statements");
        activateItem(":*.Accounting_QMenu", "Financial Statements");
        waitForObjectItem(":*.Financial Statements_QMenu", "View Trial Balances...");
        activateItem(":*.Financial Statements_QMenu", "View Trial Balances...");
        if(object.exists(":Trial Balances.Schedule_QToolButton"))
            test.fail("Schedule button exists in Trial Balances screen");
        else
            test.pass("Schedule button doesn't exists in Trial Balances screen"); 
        waitForObject(":Trial Balances.Close_QToolButton");
        clickButton(":Trial Balances.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in View Trial Balances screen");
    }
    
    //-----------View Financial report--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Financial Statements");
        activateItem(":*.Accounting_QMenu", "Financial Statements");
        waitForObjectItem(":*.Financial Statements_QMenu", "View Financial Report...");
        activateItem(":*.Financial Statements_QMenu", "View Financial Report...");
        if(object.exists(":View Financial Report.Schedule_QToolButton"))
            test.fail("Schedule button exists in View Financial Report screen");
        else
            test.pass("Schedule button doesn't exists in View Financial Report screen"); 
        waitForObject(":View Financial Report.Close_QToolButton");
        clickButton(":View Financial Report.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in View Financial Report screen");
    }
    
    //----------Tax Authorities----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Tax");
        activateItem(":*.Accounting_QMenu", "Tax");
        waitForObjectItem(":*.Tax_QMenu", "Tax Authorities...");
        activateItem(":*.Tax_QMenu", "Tax Authorities...");
        if(object.exists(":Tax Authorities.Schedule_QToolButton"))
            test.fail("Schedule button exists in Tax Authorities screen");
        else
            test.pass("Schedule button doesn't exists in Tax Authorities screen"); 
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in Tax Authorites screen" + e);
    }
}    

    