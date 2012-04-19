//--***--This script is developed to execute Batch Manager Submissions only in Windows Environment--***--

//**********PRE-REQUISITES ***********

// (1) Ensure that the Batch Manager is running before executing this script
// (2) Install a dummy printer

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
    
    //---------------Capacity UOM by Product Category----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Capacity UOMs");
        activateItem(":*.Reports_QMenu_6", "Capacity UOMs");
        waitForObjectItem(":*.Capacity UOMs_QMenu", "by Product Category...");
        activateItem(":*.Capacity UOMs_QMenu", "by Product Category...");
        waitForObject(":Capacity UOMs by Product Category.Query_QToolButton");
        clickButton(":Capacity UOMs by Product Category.Query_QToolButton");
        waitForObject(":Capacity UOMs by Product Category.Schedule_QToolButton");
        clickButton(":Capacity UOMs by Product Category.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Capacity UOMs by Product Category.Close_QToolButton");
        clickButton(":Capacity UOMs by Product Category.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Capacity UOM by product category"+ e);
    }
    
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Capacity UOM by product category");
    
    else test.fail("Batch Manager not responding");
    
    
  
    //---------------Capacity UOM by Class Code----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Capacity UOMs");
        activateItem(":*.Reports_QMenu_6", "Capacity UOMs");
        waitForObjectItem(":*.Capacity UOMs_QMenu", "by Class Code...");
        activateItem(":*.Capacity UOMs_QMenu", "by Class Code...");
        waitForObject(":Capacity UOMs by Class Code.Query_QToolButton");
        clickButton(":Capacity UOMs by Class Code.Query_QToolButton");
        waitForObject(":Capacity UOMs by Class Code.Schedule_QToolButton");
        clickButton(":Capacity UOMs by Class Code.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Capacity UOMs by Class Code.Close_QToolButton");
        clickButton(":Capacity UOMs by Class Code.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Capacity UOM by class code"+ e);
    }
    
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for capacity UOM by class code Screen");
    
    else test.fail("Batch Manager not responding");
    
    //---------------Item List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Item");
        activateItem(":*.Products_QMenu", "Item");
        waitForObjectItem(":*.Item_QMenu", "List...");
        activateItem(":*.Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":Items.Schedule_QToolButton");
        clickButton(":Items.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling item list"+ e);
    }
    
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for item list Screen");
    
    else test.fail("Batch Manager not responding");
    
    //------------Costed single level BOM----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Costed BOM");
        activateItem(":*.Reports_QMenu_7", "Costed BOM");
        waitForObjectItem(":*.Costed BOM_QMenu", "Single Level...");
        activateItem(":*.Costed BOM_QMenu", "Single Level...");    
        waitForObject(":Costed Single Level Bill of Materials.VirtualClusterLineEdit_ItemLineEdit");
        type(":Costed Single Level Bill of Materials.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Costed Single Level Bill of Materials.Query_QToolButton");
        clickButton(":Costed Single Level Bill of Materials.Query_QToolButton");
        waitForObject(":Costed Single Level Bill of Materials.Schedule_QToolButton");
        clickButton(":Costed Single Level Bill of Materials.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Costed Single Level Bill of Materials.Close_QToolButton");
        clickButton(":Costed Single Level Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in costed single level BOM"+ e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for costed single level BOM");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //------------Costed Indented level BOM----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Costed BOM");
        activateItem(":*.Reports_QMenu_7", "Costed BOM");
        waitForObjectItem(":*.Costed BOM_QMenu", "Indented...");
        activateItem(":*.Costed BOM_QMenu", "Indented...");  
        waitForObject(":Costed Single Level Bill of Materials.VirtualClusterLineEdit_ItemLineEdit_2");
        type(":Costed Single Level Bill of Materials.VirtualClusterLineEdit_ItemLineEdit_2", "YTRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Costed Indented Bill of Materials.Query_QToolButton");
        clickButton(":Costed Indented Bill of Materials.Query_QToolButton");
        waitForObject(":Costed Indented Bill of Materials.Schedule_QToolButton");
        clickButton(":Costed Indented Bill of Materials.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Costed Indented Bill of Materials.Close_QToolButton");
        clickButton(":Costed Indented Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in costed indented level BOM"+ e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for costed indented level BOM");
    
    else test.fail("Batch Manager not responding");
    
    
    //------------Costed Summarized level BOM----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Costed BOM");
        activateItem(":*.Reports_QMenu_7", "Costed BOM");
        waitForObjectItem(":*.Costed BOM_QMenu", "Summarized...");
        activateItem(":*.Costed BOM_QMenu", "Summarized...");  
        waitForObject(":Costed Summarized Bill of Materials.VirtualClusterLineEdit_ItemLineEdit");
        type(":Costed Summarized Bill of Materials.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Costed Summarized Bill of Materials.Query_QToolButton");
        clickButton(":Costed Summarized Bill of Materials.Query_QToolButton");
        waitForObject(":Costed Summarized Bill of Materials.Schedule_QToolButton");
        clickButton(":Costed Summarized Bill of Materials.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Costed Summarized Bill of Materials.Close_QToolButton");
        clickButton(":Costed Summarized Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in costed summarized level BOM"+ e);
    }
    
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for costed summarized level BOM");
    
    else test.fail("Batch Manager not responding");
  
    
    //------------Item Cost by class code----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Item Costs");
        activateItem(":*.Reports_QMenu_7", "Item Costs");
        waitForObjectItem(":*.Item Costs_QMenu", "by Class Code...");
        activateItem(":*.Item Costs_QMenu", "by Class Code...");
        waitForObject(":Item Costs by Class Code.Query_QToolButton");
        clickButton(":Item Costs by Class Code.Query_QToolButton");
        waitForObject(":Item Costs by Class Code.Schedule_QToolButton");
        clickButton(":Item Costs by Class Code.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Item Costs by Class Code.Close_QToolButton");
        clickButton(":Item Costs by Class Code.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in item cost by class code"+ e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for item cost by class code");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //------------Item cost summary----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Item Costs");
        activateItem(":*.Reports_QMenu_7", "Item Costs");
        waitForObjectItem(":*.Item Costs_QMenu", "Summary...");
        activateItem(":*.Item Costs_QMenu", "Summary...");
        waitForObject(":Item Costs Summary.VirtualClusterLineEdit_ItemLineEdit");
        type(":Item Costs Summary.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Item Costs Summary.Query_QToolButton");
        clickButton(":Item Costs Summary.Query_QToolButton");
        waitForObject(":Item Costs Summary.Schedule_QToolButton");
        clickButton(":Item Costs Summary.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Item Costs Summary.Close_QToolButton");
        clickButton(":Item Costs Summary.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in item costs by summary"+ e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for item costs by summary");
    
    else test.fail("Batch Manager not responding");
    
    
    //------------Item costs History----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Item Costs");
        activateItem(":*.Reports_QMenu_7", "Item Costs");
        waitForObjectItem(":*.Item Costs_QMenu", "History...");
        activateItem(":*.Item Costs_QMenu", "History...");
        waitForObject(":Item Costs History.VirtualClusterLineEdit_ItemLineEdit");
        type(":Item Costs History.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Item Costs History.Query_QToolButton");
        clickButton(":Item Costs History.Query_QToolButton");
        waitForObject(":Item Costs History.Schedule_QToolButton");
        clickButton(":Item Costs History.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Item Costs History.Close_QToolButton");
        clickButton(":Item Costs History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in item cost history"+ e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for item cost history");
    
    else test.fail("Batch Manager not responding");
    
    
    //------------Valid Location By Item----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Valid Locations by Item...");
        activateItem(":*.Reports_QMenu_2", "Valid Locations by Item...");
        waitForObject(":groupBox.VirtualClusterLineEdit_ItemLineEdit");
        type(":groupBox.VirtualClusterLineEdit_ItemLineEdit", "STRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Valid Locations by Item.Query_QToolButton");
        clickButton(":Valid Locations by Item.Query_QToolButton");
        waitForObject(":Valid Locations by Item.Schedule_QToolButton");
        clickButton(":Valid Locations by Item.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Valid Locations by Item.Close_QToolButton");
        clickButton(":Valid Locations by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling valid location by item"+e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for valid location by item screen");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //------------Quantity On Hand----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Quantities On Hand...");
        activateItem(":*.Reports_QMenu_2", "Quantities On Hand...");
        waitForObject(":Quantities on Hand.Query_QToolButton");
        clickButton(":Quantities on Hand.Query_QToolButton");
        waitForObject(":Quantities on Hand.Schedule_QToolButton");
        clickButton(":Quantities on Hand.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Quantities on Hand.Close_QToolButton");
        clickButton(":Quantities on Hand.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Quantity on hand"+ e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Quantity on hand screen");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //------------QOH by location----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Quantities On Hand By Location...");
        activateItem(":*.Reports_QMenu_2", "Quantities On Hand By Location...");
        waitForObject(":_locGroup._location_XComboBox");
        clickItem(":_locGroup._location_XComboBox","01010101-01-01-01-01 in RM1",10,10,0,Qt.LeftButton);
        waitForObject(":Quantities on Hand by Location.Query_QToolButton");
        clickButton(":Quantities on Hand by Location.Query_QToolButton");
        waitForObject(":Quantities on Hand by Location.Schedule_QToolButton");
        clickButton(":Quantities on Hand by Location.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Quantities on Hand by Location.Close_QToolButton");
        clickButton(":Quantities on Hand by Location.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in QOH by location"+ e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted QOH by location screen");
    
    else test.fail("Batch Manager not responding");
    
    
    //------------Location Detail----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Location/Lot/Serial # Detail...");
        activateItem(":*.Reports_QMenu_2", "Location/Lot/Serial # Detail...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_6");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_6", "STRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Location/Lot/Serial # Detail.Query_QToolButton");
        clickButton(":Location/Lot/Serial # Detail.Query_QToolButton");
        waitForObject(":Location/Lot/Serial # Detail.Schedule_QToolButton");
        clickButton(":Location/Lot/Serial # Detail.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Location/Lot/Serial # Detail.Close_QToolButton");
        clickButton(":Location/Lot/Serial # Detail.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in submitting location details"+ e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for location detail screen");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //------------Usage Statistics----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Usage Statistics...");
        activateItem(":*.Reports_QMenu_2", "Usage Statistics...");
        waitForObject(":Item Usage Statistics.Query_QToolButton");
        clickButton(":Item Usage Statistics.Query_QToolButton");
        waitForObject(":Item Usage Statistics.Schedule_QToolButton");
        clickButton(":Item Usage Statistics.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Item Usage Statistics.Close_QToolButton");
        clickButton(":Item Usage Statistics.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Usage Statistics"+ e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Usage Statistics screen");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //------------Time Phased Usage Statistics----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
        activateItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_5");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_5","YTRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Time-Phased Item Usage Statistics by Item._calendar_CalendarComboBox");
        clickItem(":Time-Phased Item Usage Statistics by Item._calendar_CalendarComboBox","2009",10,10,0,Qt.LeftButton);
        
        waitForObject(":Time-Phased Item Usage Statistics by Item.Query_QToolButton");
        clickButton(":Time-Phased Item Usage Statistics by Item.Query_QToolButton");
        waitForObject(":Time-Phased Item Usage Statistics by Item.Schedule_QToolButton");
        clickButton(":Time-Phased Item Usage Statistics by Item.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Item Usage Statistics by Item.Close_QToolButton");
        clickButton(":Time-Phased Item Usage Statistics by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Time Phased Usage Statistics"+ e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted Time Phased Usage Statistics");
    
    else test.fail("Batch Manager not responding");
    
    
    //------------Inventory History by lot/serial----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "History by Lot/Serial #...");
        activateItem(":*.Reports_QMenu_2", "History by Lot/Serial #...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_7");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_7", "STRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Detailed Inventory History by Lot/Serial #.Query_QToolButton");
        clickButton(":Detailed Inventory History by Lot/Serial #.Query_QToolButton");
        waitForObject(":Detailed Inventory History by Lot/Serial #.Schedule_QToolButton");
        clickButton(":Detailed Inventory History by Lot/Serial #.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Detailed Inventory History by Lot/Serial #.Close_QToolButton");
        clickButton(":Detailed Inventory History by Lot/Serial #.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling inventory history by lot/serial"+ e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for inventory history by lot/serial screen");
    
    else test.fail("Batch Manager not responding");
  
    
    
    //------------Inventory History by location----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "History by Location...");
        activateItem(":*.Reports_QMenu_2", "History by Location...");
        waitForObject(":Detailed Inventory History by Location.Query_QToolButton");
        clickButton(":Detailed Inventory History by Location.Query_QToolButton");
        waitForObject(":Detailed Inventory History by Location.Schedule_QToolButton");
        clickButton(":Detailed Inventory History by Location.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Detailed Inventory History by Location.Close_QToolButton");
        clickButton(":Detailed Inventory History by Location.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Inventory History by location"+ e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted Inventory History by location screen");
    
    else
        
        test.fail("Batch Manager not responding");
    
    
    //------------Location Detail----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Location/Lot/Serial # Detail...");
        activateItem(":*.Reports_QMenu_2", "Location/Lot/Serial # Detail...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_6");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_6", "STRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Location/Lot/Serial # Detail.Query_QToolButton");
        clickButton(":Location/Lot/Serial # Detail.Query_QToolButton");
        waitForObject(":Location/Lot/Serial # Detail.Schedule_QToolButton");
        clickButton(":Location/Lot/Serial # Detail.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Location/Lot/Serial # Detail.Close_QToolButton");
        clickButton(":Location/Lot/Serial # Detail.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in submitting location details"+ e);
    }
    
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for location detail screen");
    
    else test.fail("Batch Manager not responding");
    
    //------------Inventory Availability----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Inventory Availability...");
        activateItem(":*.Reports_QMenu_2", "Inventory Availability...");
        waitForObject(":Inventory Availability.Query_QToolButton");
        clickButton(":Inventory Availability.Query_QToolButton");
        waitForObject(":Inventory Availability.Schedule_QToolButton");
        clickButton(":Inventory Availability.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Inventory Availability.Close_QToolButton");
        clickButton(":Inventory Availability.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling inventory availability"+ e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for inventory availability screen");
    
    else test.fail("Batch Manager not responding");
  
    
    
    //------------Substitute Availability----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Substitute Availability...");
        activateItem(":*.Reports_QMenu_2", "Substitute Availability...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_8");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_8","STRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Substitute Availability by Root Item.Query_QToolButton");
        clickButton(":Substitute Availability by Root Item.Query_QToolButton");
        waitForObject(":Substitute Availability by Root Item.Schedule_QToolButton");
        clickButton(":Substitute Availability by Root Item.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Substitute Availability by Root Item.Close_QToolButton");
        clickButton(":Substitute Availability by Root Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling substitute availability"+ e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for substitute availability screen");
    
    else test.fail("Batch Manager not responding");
    
    
    //------------Slow Moving Inventory----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Slow Moving Inventory...");
        activateItem(":*.Reports_QMenu_2", "Slow Moving Inventory...");
        waitForObject(":groupBox.XDateEdit_XDateEdit");
        type(":groupBox.XDateEdit_XDateEdit","-365");
        nativeType("<Tab>");
        waitForObject(":Slow Moving Inventory.Query_QToolButton");
        clickButton(":Slow Moving Inventory.Query_QToolButton");
        waitForObject(":Slow Moving Inventory.Schedule_QToolButton");
        clickButton(":Slow Moving Inventory.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Slow Moving Inventory.Close_QToolButton");
        clickButton(":Slow Moving Inventory.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in submitting slow moving inventory "+ e);
    }
    
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for slow moving inventory screen");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //------------Expired Inventory----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Expired Inventory...");
        activateItem(":*.Reports_QMenu_2", "Expired Inventory...");
        waitForObject(":Expired Inventory.Query_QToolButton");
        clickButton(":Expired Inventory.Query_QToolButton");
        waitForObject(":Expired Inventory.Schedule_QToolButton");
        clickButton(":Expired Inventory.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Expired Inventory.Close_QToolButton");
        clickButton(":Expired Inventory.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in submitting expired inventory "+ e);
    }
    
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for expired inventory screen");
    
    else test.fail("Batch Manager not responding");
    
    
    //------------Item Sites----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Item Site");
        activateItem(":*.Inventory_QMenu", "Item Site");
        
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        
        waitForObject(":Item Sites.Schedule_QToolButton");
        clickButton(":Item Sites.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in submitting Item Sites "+ e);
    }
  
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Item Sites screen");
    
    else test.fail("Batch Manager not responding");
    
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
        
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_7", "YPAINT1");
        nativeType("<Tab>");
        waitForObject(":Lot/Serial #.VirtualClusterLineEdit_LotserialLineEdit");
        type(":Lot/Serial #.VirtualClusterLineEdit_LotserialLineEdit", "LOT08");
        nativeType("<Tab>");
        waitForObject(":Detailed Inventory History by Lot/Serial #.Query_QToolButton");
        clickButton(":Detailed Inventory History by Lot/Serial #.Query_QToolButton");
        waitForObject(":Detailed Inventory History by Lot/Serial #.Schedule_QToolButton");
        clickButton(":Detailed Inventory History by Lot/Serial #.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Detailed Inventory History by Lot/Serial #.Close_QToolButton");
        clickButton(":Detailed Inventory History by Lot/Serial #.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Detailed Inventory History" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Detailed inventory History screen");
    
    else test.fail("Batch Manager not responding");
    
    //----------- Running availability(Schedule) ---------------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule")
                activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Reports");
        activateItem(":*.Schedule_QMenu", "Reports");  
        waitForObjectItem(":*.Reports_QMenu", "Running Availability...");
        activateItem(":*.Reports_QMenu", "Running Availability...");
        waitForObject(":Running Availability.VirtualClusterLineEdit_ItemLineEdit");
        type(":Running Availability.VirtualClusterLineEdit_ItemLineEdit","YTRUCK1");
        nativeType("<Tab>");
        
        waitForObject(":Running Availability.Query_QToolButton");
        clickButton(":Running Availability.Query_QToolButton");
        
        waitForObject(":Running Availability.Schedule_QToolButton");
        clickButton(":Running Availability.Schedule_QToolButton");  
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Running Availability.Close_QToolButton");
        clickButton(":Running Availability.Close_QToolButton"); 
    }
    catch(e)
    {
        test.fail("Exception in scheduling Running Availability screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Running Availabality(Schedule) screen");
    
    else test.fail("Batch Manager not responding");
    
    //--------------Purchase Requests by Planner code -----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Purchase Requests")
                activateItem(":*.Purchase_QMenu", "Purchase Requests");
        waitForObjectItem(":*.Purchase Requests_QMenu", "by Planner Code...");
        activateItem(":*.Purchase Requests_QMenu", "by Planner Code...");
        waitForObject(":Purchase Requests by Planner Code.Query_QToolButton");
        clickButton(":Purchase Requests by Planner Code.Query_QToolButton");
        waitForObject(":Purchase Requests by Planner Code.Schedule_QToolButton");
        clickButton(":Purchase Requests by Planner Code.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Requests by Planner Code.Close_QToolButton");
        clickButton(":Purchase Requests by Planner Code.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Running Availability screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Purchase Requests by Planner code screen");
    
    else test.fail("Batch Manager not responding");
    
    //----------Purchase Requests by Item------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Purchase Requests")
                activateItem(":*.Purchase_QMenu", "Purchase Requests");
        waitForObjectItem(":*.Purchase Requests_QMenu", "by Item...");
        activateItem(":*.Purchase Requests_QMenu", "by Item...");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_9");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_9","CHROMING");
        nativeType("<Tab>");
        waitForObject(":Purchase Requests by Item.Query_QToolButton");
        clickButton(":Purchase Requests by Item.Query_QToolButton");
        waitForObject(":Purchase Requests by Item.Schedule_QToolButton")
                clickButton(":Purchase Requests by Item.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Purchase Requests by Item.Close_QToolButton")
                clickButton(":Purchase Requests by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Running Availability screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Purchase Requests by Item screen");
    
    else test.fail("Batch Manager not responding");
    
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
        if(!findObject(":Show.Closed_XCheckBox").checked)
        {
            clickButton(":Show.Closed_XCheckBox");
        }
        waitForObject(":Purchase Orders by Vendor.Query_QToolButton");
        clickButton(":Purchase Orders by Vendor.Query_QToolButton");
        waitForObject(":Purchase Orders by Vendor.Schedule_QToolButton");
        clickButton(":Purchase Orders by Vendor.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Purchase Orders by Vendor.Close_QToolButton")
                clickButton(":Purchase Orders by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Purchase Orders by Vendor screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Purchase Orders by Vendor screen");
    
    else test.fail("Batch Manager not responding");
    
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
        
        if(!findObject(":_showGroup.Show Closed Purchase Orders_XCheckBox").checked)
            clickButton(":_showGroup.Show Closed Purchase Orders_XCheckBox");
        waitForObject(":Purchase Orders by Date.Query_QToolButton");
        clickButton(":Purchase Orders by Date.Query_QToolButton");
        waitForObject(":Purchase Orders by Date.Schedule_QToolButton");
        clickButton(":Purchase Orders by Date.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Orders by Date.Close_QToolButton");
        clickButton(":Purchase Orders by Date.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in scheduling Purchase Orders by Date screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Purchase orders by date screen");
    
    else test.fail("Batch Manager not responding");
    
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
        waitForObject(":Purchase Order Items by Vendor.Query_QToolButton");
        clickButton(":Purchase Order Items by Vendor.Query_QToolButton");
        waitForObject(":Purchase Order Items by Vendor.Schedule_QToolButton");
        clickButton(":Purchase Order Items by Vendor.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Order Items by Vendor.Close_QToolButton");
        clickButton(":Purchase Order Items by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Purchase Order Items by Vendor");
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Purchase order Items by Vendor screen");
    
    else test.fail("Batch Manager not responding");
    
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
        waitForObject(":Purchase Order Items by Date.Query_QToolButton");
        clickButton(":Purchase Order Items by Date.Query_QToolButton");
        waitForObject(":Purchase Order Items by Date.Schedule_QToolButton");
        clickButton(":Purchase Order Items by Date.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Order Items by Date.Close_QToolButton");
        clickButton(":Purchase Order Items by Date.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Purchase Order Items by Date");
  }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Purchase Order Items by Date screen");
    
    else test.fail("Batch Manager not responding");
    
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
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_10");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_10","TBODY1");
        nativeType("<Tab>");
        waitForObject(":Purchase Order Items by Item.Query_QToolButton");
        clickButton(":Purchase Order Items by Item.Query_QToolButton");
        waitForObject(":Purchase Order Items by Item.Schedule_QToolButton");
        clickButton(":Purchase Order Items by Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Order Items by Item.Close_QToolButton");
        clickButton(":Purchase Order Items by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Purchase Order Items by Item");
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Purchase Order Items by Item screen");
    
    else test.fail("Batch Manager not responding");
  
    
    //-------- Purchase Order History------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Reports");
        activateItem(":*.Purchase_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_8", "Purchase Order History...");
        activateItem(":*.Reports_QMenu_8", "Purchase Order History...");
        waitForObject(":Purchase Order History.VirtualClusterLineEdit_OrderLineEdit")
                type(":Purchase Order History.VirtualClusterLineEdit_OrderLineEdit", "20000");
        nativeType("<Tab>");
        waitForObject(":Purchase Order History.Query_QToolButton");
        clickButton(":Purchase Order History.Query_QToolButton");
        waitForObject(":Purchase Order History.Schedule_QToolButton");
        clickButton(":Purchase Order History.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Order History.Close_QToolButton")
                clickButton(":Purchase Order History.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in scheduling Purchase Order History screen" + e);
    }
    
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Purchase Order History screen");
    
    else test.fail("Batch Manager not responding");
    
    
    
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
                type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":Receipts and Returns by Vendor.Query_QToolButton");
        clickButton(":Receipts and Returns by Vendor.Query_QToolButton");
        waitForObject(":Receipts and Returns by Vendor.Schedule_QToolButton");
        clickButton(":Receipts and Returns by Vendor.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Receipts and Returns by Vendor.Close_QToolButton");
        clickButton(":Receipts and Returns by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Receipts and Returns by Vendor" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Receipts and Returns by Vendor screen");
    
    else test.fail("Batch Manager not responding");
    
    
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
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
        type(":_dateGroup.XDateEdit_XDateEdit_2", "-365");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
        type(":_dateGroup.XDateEdit_XDateEdit_3","0");
        nativeType("<Tab>");
        waitForObject(":Receipts and Returns by Date.Query_QToolButton");
        clickButton(":Receipts and Returns by Date.Query_QToolButton");
        waitForObject(":Receipts and Returns by Date.Schedule_QToolButton");
        clickButton(":Receipts and Returns by Date.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Receipts and Returns by Date.Close_QToolButton");
        clickButton(":Receipts and Returns by Date.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Receipts and Returns by Date screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Receipts and Returns by Date screen");
    
    else test.fail("Batch Manager not responding");
    
    
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
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_11");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_11","TBOX1");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
        type(":_dateGroup.XDateEdit_XDateEdit_4","-365");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_5");
        type(":_dateGroup.XDateEdit_XDateEdit_5","0");
        waitForObject(":Receipts and Returns by Item.Query_QToolButton");
        clickButton(":Receipts and Returns by Item.Query_QToolButton");
        waitForObject(":Receipts and Returns by Item.Schedule_QToolButton");
        clickButton(":Receipts and Returns by Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Receipts and Returns by Item.Close_QToolButton");
        clickButton(":Receipts and Returns by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Receipts and Returns by Item screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Receipts and Returns by Item screen");
    
    else test.fail("Batch Manager not responding");
    
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
        waitForObject(":Voucher Distribution.XDateEdit_XDateEdit");
        type(":Voucher Distribution.XDateEdit_XDateEdit", "-365");
        waitForObject(":Voucher Distribution.XDateEdit_XDateEdit_2");
        type(":Voucher Distribution.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Purchase Price Variances by Vendor.Query_QToolButton");
        clickButton(":Purchase Price Variances by Vendor.Query_QToolButton");
        waitForObject(":Purchase Price Variances by Vendor.Schedule_QToolButton");
        clickButton(":Purchase Price Variances by Vendor.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Price Variances by Vendor.Close_QToolButton");
        clickButton(":Purchase Price Variances by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Purchase Price Variances by Vendor");
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Purchase Price Variances by Vendor screen");
    
    else test.fail("Batch Manager not responding");
    
    
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
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_12");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_12", "DTRUCK1");
        nativeType("<Tab>");
        waitForObject(":Purchase Price Variances by Item.Query_QToolButton");
        clickButton(":Purchase Price Variances by Item.Query_QToolButton");
        waitForObject(":Purchase Price Variances by Item.Schedule_QToolButton");
        clickButton(":Purchase Price Variances by Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Price Variances by Item.Close_QToolButton");
        clickButton(":Purchase Price Variances by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Scheduling Purchase Price Variances by Item");
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Purchase Price Variances by Item screen");
    
    else test.fail("Batch Manager not responding");
    
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
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2");
        type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2", "TPARTS");
        nativeType("<Tab>");
        waitForObject(":Purchase Order Delivery Date Variances by Vendor.Query_QToolButton");
        clickButton(":Purchase Order Delivery Date Variances by Vendor.Query_QToolButton");
        waitForObject(":Purchase Order Delivery Date Variances by Vendor.Schedule_QToolButton");
        clickButton(":Purchase Order Delivery Date Variances by Vendor.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Order Delivery Date Variances by Vendor.Close_QToolButton");
        clickButton(":Purchase Order Delivery Date Variances by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Scheduling Delivery Date Variances by Vendor" + e);
  }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Delivery Date Variances by Vendor screen");
    
    else test.fail("Batch Manager not responding");
    
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
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_13");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_13", "DTRUCK1");
        nativeType("<Tab>");
        waitForObject(":Purchase Order Delivery Date Variances by Item.Query_QToolButton");
        clickButton(":Purchase Order Delivery Date Variances by Item.Query_QToolButton");
        waitForObject(":Purchase Order Delivery Date Variances by Item.Schedule_QToolButton");
        clickButton(":Purchase Order Delivery Date Variances by Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Purchase Order Delivery Date Variances by Item.Close_QToolButton");
        clickButton(":Purchase Order Delivery Date Variances by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Excepiton in Scheduling Delivery Date Variances by Item screen" + e);
  }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Delivery Date Variances by Item screen");
    
    else test.fail("Batch Manager not responding");
    
    //----------Purchase order return--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Receiving");
        activateItem(":*.Inventory_QMenu", "Receiving");
        waitForObjectItem(":*.Receiving_QMenu", "Purchase Order Return...");
        activateItem(":*.Receiving_QMenu", "Purchase Order Return...");
        waitForObject(":Enter Purchase Order Returns.VirtualClusterLineEdit_OrderLineEdit");
        type(":Enter Purchase Order Returns.VirtualClusterLineEdit_OrderLineEdit","20001");
        nativeType("<Tab>");
        waitForObjectItem(":Enter Purchase Order Returns._poitem_XTreeWidget", "TBOX1");
        clickItem(":Enter Purchase Order Returns._poitem_XTreeWidget", "TBOX1", 70, 8, 0, Qt.LeftButton);
        waitForObject(":Enter Purchase Order Returns.Enter Return_QPushButton")
                clickButton(":Enter Purchase Order Returns.Enter Return_QPushButton");
        findObject(":Enter Purchase Order Returns._toReturn_XLineEdit").clear();
        type(":Enter Purchase Order Returns._toReturn_XLineEdit", "10");
        waitForObject(":Enter Purchase Order Returns._rejectCode_XComboBox");
        clickItem(":Enter Purchase Order Returns._rejectCode_XComboBox", "PO-DAMAGED-RETURNED",70, 8, 0, Qt.LeftButton);
        waitForObject(":Enter Purchase Order Returns.Return_QPushButton");
        clickButton(":Enter Purchase Order Returns.Return_QPushButton");
        waitForObject(":Enter Purchase Order Returns.Post_QPushButton");
        clickButton(":Enter Purchase Order Returns.Post_QPushButton");
        waitForObject(":Enter Purchase Order Returns.Yes_QPushButton");
        clickButton(":Enter Purchase Order Returns.Yes_QPushButton");
        waitForObject(":Enter Purchase Order Returns.Post_QPushButton_2");
        clickButton(":Enter Purchase Order Returns.Post_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Exception in processing Purchase order retunr");
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
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_3");
        type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_3", "TPARTS");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_6")
                type(":_dateGroup.XDateEdit_XDateEdit_6", "0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_7");
        type(":_dateGroup.XDateEdit_XDateEdit_7", "0");
        waitForObject(":Rejected Material by Vendor.Query_QToolButton");
        clickButton(":Rejected Material by Vendor.Query_QToolButton");
        waitForObject(":Rejected Material by Vendor.Schedule_QToolButton");
        clickButton(":Rejected Material by Vendor.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Rejected Material by Vendor.Close_QToolButton");
        clickButton(":Rejected Material by Vendor.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Rejected Material by Vendor screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Rejected Material by vendor screen");
    
    else test.fail("Batch Manager not responding");
    
    
    //------------ Vendors List ----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Vendor");
        activateItem(":*.Purchase_QMenu", "Vendor");
        waitForObjectItem(":*.Vendor_QMenu", "List...");
        activateItem(":*.Vendor_QMenu", "List...");
        waitForObject(":Vendors.Query_QToolButton");
        clickButton(":Vendors.Query_QToolButton");
        waitForObject(":Vendors.Schedule_QToolButton");
        clickButton(":Vendors.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Vendors.Close_QToolButton");
        clickButton(":Vendors.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Vendors List screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Vendors List screen");
    
    else test.fail("Batch Manager not responding");
    
    //------------ Work Order Schedule ----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Work Order Schedule");
        activateItem(":*.Reports_QMenu_5", "Work Order Schedule");
        waitForObject(":Work Order Schedule.Query_QToolButton");
        clickButton(":Work Order Schedule.Query_QToolButton");
        waitForObject(":Work Order Schedule.Schedule_QToolButton");
        clickButton(":Work Order Schedule.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Work Order Schedule.Close_QToolButton");
        clickButton(":Work Order Schedule.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Vendors List screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Work Order Schedule screen");
    
    else test.fail("Batch Manager not responding");
    
    
    
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
        waitForObject(":groupBox.VirtualClusterLineEdit_ItemLineEdit_2");
        type(":groupBox.VirtualClusterLineEdit_ItemLineEdit_2", "YPAINT1");
        nativeType("<Tab>");
        waitForObject(":W/O Material Requirements by Component Item.Query_QToolButton");
        clickButton(":W/O Material Requirements by Component Item.Query_QToolButton");
        waitForObject(":W/O Material Requirements by Component Item.Schedule_QToolButton");
        clickButton(":W/O Material Requirements by Component Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":W/O Material Requirements by Component Item.Close_QToolButton");
        clickButton(":W/O Material Requirements by Component Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order Material Requirements by Component Item screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Work Order Material Requirements By Component Item screen");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //--------------Pending W/O Material Availability-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");   
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Pending Material Availability...");
        activateItem(":*.Reports_QMenu_5", "Pending Material Availability...");
        waitForObject(":Pending W/O Material Availability.VirtualClusterLineEdit_ItemLineEdit");
        type(":Pending W/O Material Availability.VirtualClusterLineEdit_ItemLineEdit", "STRUCK1");
        nativeType("<Tab>");
        waitForObject(":Pending W/O Material Availability.Query_QToolButton");
        clickButton(":Pending W/O Material Availability.Query_QToolButton");
        waitForObject(":Pending W/O Material Availability.Schedule_QToolButton");
        clickButton(":Pending W/O Material Availability.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Pending W/O Material Availability.Close_QToolButton");
        clickButton(":Pending W/O Material Availability.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Pending W/O Material Availability screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Pending W/O Material Availability screen");
    
    else test.fail("Batch Manager not responding");
    
    
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
        waitForObject(":Work Order History by Class Code.Query_QToolButton");
        clickButton(":Work Order History by Class Code.Query_QToolButton");
        waitForObject(":Work Order History by Class Code.Schedule_QToolButton");
        clickButton(":Work Order History by Class Code.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Work Order History by Class Code.Close_QToolButton");
        clickButton(":Work Order History by Class Code.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order History by Class Code screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Work Order History by Class Code screen");
    
    else test.fail("Batch Manager not responding");
    
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
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_14");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_14", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":Work Order History by Item.Query_QToolButton");
        clickButton(":Work Order History by Item.Query_QToolButton");
        waitForObject(":Work Order History by Item.Schedule_QToolButton");
        clickButton(":Work Order History by Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Work Order History by Item.Close_QToolButton");
        clickButton(":Work Order History by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order History by Item screen");
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Work Order History by Item screen");
    
    else test.fail("Batch Manager not responding");
    
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
        waitForObject(":_woNumber_XLineEdit");
        type(":_woNumber_XLineEdit", "10001");
        nativeType("<Tab>");
        waitForObject(":Work Order History by W/O Number.Query_QToolButton");
        clickButton(":Work Order History by W/O Number.Query_QToolButton");
        waitForObject(":Work Order History by W/O Number.Schedule_QToolButton");
        clickButton(":Work Order History by W/O Number.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Work Order History by W/O Number.Close_QToolButton")
                clickButton(":Work Order History by W/O Number.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Work Order History by W/O Number screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Work Order History by W/O Number screen");
    
    else test.fail("Batch Manager not responding"); 
    
    
    
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
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_8");
        type(":_dateGroup.XDateEdit_XDateEdit_8","-365");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_9");
        type(":_dateGroup.XDateEdit_XDateEdit_9","0");
        nativeType("<Tab>");
        waitForObject(":Material Usage Variance by Site.Query_QToolButton");
        clickButton(":Material Usage Variance by Site.Query_QToolButton");
        waitForObject(":Material Usage Variance by Site.Schedule_QToolButton");
        clickButton(":Material Usage Variance by Site.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Material Usage Variance by Site.Close_QToolButton");
        clickButton(":Material Usage Variance by Site.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Material Usage Variance by Site screen:" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Material Usage Variance by Site screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_15");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_15","STOCKCAR1");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_10");
        type(":_dateGroup.XDateEdit_XDateEdit_10","-365");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_11");
        type(":_dateGroup.XDateEdit_XDateEdit_11","0");
        waitForObject(":Material Usage Variance by Item.Query_QToolButton");
        clickButton(":Material Usage Variance by Item.Query_QToolButton");
        waitForObject(":Material Usage Variance by Item.Schedule_QToolButton");
        clickButton(":Material Usage Variance by Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Material Usage Variance by Item.Close_QToolButton");
        clickButton(":Material Usage Variance by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Material Usage Variance by Item screen:" + e);
    }
    
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Material Usage Variance by Item screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_16");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_16","TSUB1");
        nativeType("<Tab>");
        waitForObject(":Material Usage Variance by Bill of Materials Item.Query_QToolButton");
        clickButton(":Material Usage Variance by Bill of Materials Item.Query_QToolButton");
        waitForObject(":Material Usage Variance by Bill of Materials Item.Schedule_QToolButton");
        clickButton(":Material Usage Variance by Bill of Materials Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Material Usage Variance by Bill of Materials Item.Close_QToolButton");
        clickButton(":Material Usage Variance by Bill of Materials Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Material Usage Variance by BOM Item screen:" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Material Usage Variance by BOM Item screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_17");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_17", "TBOX1");
        nativeType("<Tab>");
        waitForObject(":Material Usage Variance by Component Item.Query_QToolButton");
        clickButton(":Material Usage Variance by Component Item.Query_QToolButton");
        waitForObject(":Material Usage Variance by Component Item.Schedule_QToolButton");
        clickButton(":Material Usage Variance by Component Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Material Usage Variance by Component Item.Close_QToolButton");
        clickButton(":Material Usage Variance by Component Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in Material Usage Variance by Component Item screen:" + e);
    } 
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Material Usage Variance by Component Item screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Material Usage Variance by Work Order.VirtualClusterLineEdit_WoLineEdit");
        type(":Material Usage Variance by Work Order.VirtualClusterLineEdit_WoLineEdit", "10028");
        nativeType("<Tab>");
        waitForObject(":Material Usage Variance by Work Order.Query_QToolButton");
        clickButton(":Material Usage Variance by Work Order.Query_QToolButton");
        waitForObject(":Material Usage Variance by Work Order.Schedule_QToolButton");
        clickButton(":Material Usage Variance by Work Order.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Material Usage Variance by Work Order.Close_QToolButton");
        clickButton(":Material Usage Variance by Work Order.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Material Usage Variance by Work Order screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Material Usage Variance by Work Order screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //-------------Incident List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Incident");
        activateItem(":*.CRM_QMenu", "Incident");
        waitForObjectItem(":*.Incident_QMenu", "List...");
        activateItem(":*.Incident_QMenu", "List...");
        waitForObject(":Incidents.Query_QToolButton");
        clickButton(":Incidents.Query_QToolButton");
        waitForObject(":Incidents.Schedule_QToolButton");
        clickButton(":Incidents.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Incidents.Close_QToolButton");
        clickButton(":Incidents.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Incident List screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Incident List screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //---------Create To-Do List Item --------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "To-Do");
        activateItem(":*.CRM_QMenu", "To-Do");
        waitForObjectItem(":*.To-Do_QMenu", "List...");
        activateItem(":*.To-Do_QMenu", "List...");
        waitForObject(":To-Do Items.New_QToolButton")
                clickButton(":To-Do Items.New_QToolButton");
        waitForObject(":_name_QLineEdit_6");
        type(":_name_QLineEdit_6","TODO1");
        nativeType("<Tab>");
        waitForObject(":To-Do Items._description_QLineEdit");
        type(":To-Do Items._description_QLineEdit", "Sample TODO item");
        waitForObject(":To-Do Items._priority_XComboBox");
        clickItem(":To-Do Items._priority_XComboBox", "Very High", 53, 5, 0, Qt.LeftButton);
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_12");
        type(":_dateGroup.XDateEdit_XDateEdit_12","0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_13");
        type(":_dateGroup.XDateEdit_XDateEdit_13","0");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_14");
        type(":_dateGroup.XDateEdit_XDateEdit_14","0");
        waitForObject(":To-Do Items.Save_QPushButton");
        clickButton(":To-Do Items.Save_QPushButton");
        waitForObject(":To-Do Items.Close_QToolButton");
        clickButton(":To-Do Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in creating To-Do List Item" + e);
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
        waitForObject(":Show.To-Do List_XCheckBox");
        clickButton(":Show.To-Do List_XCheckBox");
        waitForObject(":To-Do Items.Schedule_QToolButton");
        clickButton(":To-Do Items.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":To-Do Items.Close_QToolButton");
        clickButton(":To-Do Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling To-Do List screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for To-Do List screen");
    
    else test.fail("Batch Manager not responding"); 
    
    
    //-------------Opportunity List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Opportunity");
        activateItem(":*.CRM_QMenu", "Opportunity");
        waitForObjectItem(":*.Opportunity_QMenu", "List...");
        activateItem(":*.Opportunity_QMenu", "List...");
        waitForObject(":Opportunities.Query_QToolButton");
        clickButton(":Opportunities.Query_QToolButton");
        waitForObject(":Opportunities.Schedule_QToolButton");
        clickButton(":Opportunities.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Opportunities.Close_QToolButton");
        clickButton(":Opportunities.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Opportunities screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Opportunity List screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //---------Order Activity by Project-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Reports");
        activateItem(":*.CRM_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_9", "Order Activity by Project...");
        activateItem(":*.Reports_QMenu_9", "Order Activity by Project...");
        waitForObject(":Order Activity by Project.VirtualClusterLineEdit_ProjectLineEdit");
        type(":Order Activity by Project.VirtualClusterLineEdit_ProjectLineEdit", "GREENLEAF");
        waitForObject(":Order Activity by Project.Query_QToolButton");
        clickButton(":Order Activity by Project.Query_QToolButton");
        waitForObject(":Order Activity by Project.Schedule_QToolButton");
        clickButton(":Order Activity by Project.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Order Activity by Project.Close_QToolButton");
        clickButton(":Order Activity by Project.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Order Activity by Project screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Order Activity by Project screen" );
    
    else test.fail("Batch Manager not responding"); 
    
    //-------Incidents by CRM Account----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Reports");
        activateItem(":*.CRM_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_9", "Incidents by CRM Account...");
        activateItem(":*.Reports_QMenu_9", "Incidents by CRM Account...");
        waitForObject(":Incidents by CRM Account.Query_QToolButton");
        clickButton(":Incidents by CRM Account.Query_QToolButton");
        waitForObject(":Incidents by CRM Account.Schedule_QToolButton");
        clickButton(":Incidents by CRM Account.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Incidents by CRM Account.Close_QToolButton");
        clickButton(":Incidents by CRM Account.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Incidents by CRM Account screen" + e);
  } 
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Incidents by CRM Account screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //-------To-Do List Items by User and Incident------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Reports");
        activateItem(":*.CRM_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_9", "To-Do List Items by User and Incident...");
        activateItem(":*.Reports_QMenu_9", "To-Do List Items by User and Incident...");
        waitForObject(":To-Do List Items by User and Incident.Query_QToolButton");
        clickButton(":To-Do List Items by User and Incident.Query_QToolButton");
        waitForObject(":To-Do List Items by User and Incident.Schedule_QToolButton");
        clickButton(":To-Do List Items by User and Incident.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":To-Do List Items by User and Incident.Close_QToolButton");
        clickButton(":To-Do List Items by User and Incident.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in scheduling To-Do List Items by User and Incident screen" + e);
    }
  
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for To-Do List Items by User and Incident screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //-------------Accounts List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Account");
        activateItem(":*.CRM_QMenu", "Account");
        waitForObjectItem(":*.Account_QMenu", "List...");
        activateItem(":*.Account_QMenu", "List...");
        waitForObject(":Accounts.Query_QToolButton");
        clickButton(":Accounts.Query_QToolButton");
        waitForObject(":Accounts.Schedule_QToolButton");
        clickButton(":Accounts.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Accounts.Close_QToolButton");
        clickButton(":Accounts.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Accounts List screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Accounts List screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //------------Contact List-------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Contact");
        activateItem(":*.CRM_QMenu", "Contact");
        waitForObjectItem(":*.Contact_QMenu", "List...");
        activateItem(":*.Contact_QMenu", "List...");
        waitForObject(":Contacts.Query_QToolButton");
        clickButton(":Contacts.Query_QToolButton");
        waitForObject(":Contacts.Schedule_QToolButton");
        clickButton(":Contacts.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Contacts.Close_QToolButton");
        clickButton(":Contacts.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Contacts List screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Contacts List screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //--------Address List----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
        activateItem(":xTuple ERP: *_QMenuBar", "CRM");
        waitForObjectItem(":*.CRM_QMenu", "Address");
        activateItem(":*.CRM_QMenu", "Address");
        waitForObjectItem(":*.Address_QMenu", "List...");
        activateItem(":*.Address_QMenu", "List...");
        waitForObject(":Addresses.Query_QToolButton");
        clickButton(":Addresses.Query_QToolButton");
        waitForObject(":Addresses.Schedule_QToolButton");
        clickButton(":Addresses.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Addresses.Close_QToolButton");
        clickButton(":Addresses.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Address List screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Address List screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //----------Sales Order List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Sales Order");
        activateItem(":*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":*.Sales Order_QMenu", "List Open...");
        activateItem(":*.Sales Order_QMenu", "List Open...");
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":Open Sales Orders.Schedule_QToolButton");
        clickButton(":Open Sales Orders.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Sales Order list screen");
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Sales Order list screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //-------------Sales Order Status----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Lookup");
        activateItem(":*.Sales_QMenu", "Lookup");
        waitForObjectItem(":*.Lookup_QMenu", "Sales Order Status...");
        activateItem(":*.Lookup_QMenu", "Sales Order Status...");
        waitForObject(":Sales Order Status.VirtualClusterLineEdit_OrderLineEdit");
        type(":Sales Order Status.VirtualClusterLineEdit_OrderLineEdit", "50001");
        nativeType("<Tab>");
        waitForObject(":Sales Order Status.Query_QToolButton");
        clickButton(":Sales Order Status.Query_QToolButton");
        waitForObject(":Sales Order Status.Schedule_QToolButton");
        clickButton(":Sales Order Status.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Sales Order Status.Close_QToolButton");
        clickButton(":Sales Order Status.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Sales Order status screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Sales Order status screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //-------------Summarized backlog----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Summarized Backlog...");
        activateItem(":*.Reports_QMenu_10", "Summarized Backlog...");
        waitForObject(":Summarized Backlog by Site.Query_QToolButton");
        clickButton(":Summarized Backlog by Site.Query_QToolButton");
        waitForObject(":Summarized Backlog by Site.Schedule_QToolButton");
        clickButton(":Summarized Backlog by Site.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Summarized Backlog by Site.Close_QToolButton");
        clickButton(":Summarized Backlog by Site.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Summarized backlog screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Summarized backlog screen");
    
    else test.fail("Batch Manager not responding"); 
    
    
    //----------Inventory Availability by Customer Type-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Availability by Customer Type...");
        activateItem(":*.Reports_QMenu_10", "Availability by Customer Type...");
        waitForObject(":Inventory Availability by Customer Type.Query_QToolButton");
        clickButton(":Inventory Availability by Customer Type.Query_QToolButton");
        waitForObject(":Inventory Availability by Customer Type.Schedule_QToolButton");
        clickButton(":Inventory Availability by Customer Type.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Inventory Availability by Customer Type.Close_QToolButton");
        clickButton(":Inventory Availability by Customer Type.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Inventory Availability by Customer Type screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Inventory Availability by Customer Type screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //----------Earned Commissions--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Earned Commissions...");
        activateItem(":*.Reports_QMenu_10", "Earned Commissions...");
        waitForObject(":Earned Commissions.Query_QToolButton");
        clickButton(":Earned Commissions.Query_QToolButton");
        waitForObject(":Earned Commissions.Schedule_QToolButton");
        clickButton(":Earned Commissions.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Earned Commissions.Close_QToolButton");
        clickButton(":Earned Commissions.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Earned Commissions screen" +  e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Earned Commissions screen");
    
    else test.fail("Batch Manager not responding"); 
    
    
    //---------Brief Earned Commissions-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Reports");
        activateItem(":*.Sales_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_10", "Brief Earned Commissions...");
        activateItem(":*.Reports_QMenu_10", "Brief Earned Commissions...");
        waitForObject(":Brief Earned Commissions.XDateEdit_XDateEdit");
        type(":Brief Earned Commissions.XDateEdit_XDateEdit", "-365");
        waitForObject(":Brief Earned Commissions.XDateEdit_XDateEdit_2");
        type(":Brief Earned Commissions.XDateEdit_XDateEdit_2", "0	");
        waitForObject(":Brief Earned Commissions.Query_QToolButton");
        clickButton(":Brief Earned Commissions.Query_QToolButton");
        waitForObject(":Brief Earned Commissions.Schedule_QToolButton");
        clickButton(":Brief Earned Commissions.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Brief Earned Commissions.Close_QToolButton");
        clickButton(":Brief Earned Commissions.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Summarized backlog screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Summarized backlog screen");
    
    else test.failc("Batch Manager not responding"); 
    
    
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
        if(!object.exists(":_filterGroup.Manage_QPushButton_2"))
        {
            waitForObject(":Bookings.More_QToolButton");
            clickButton(":Bookings.More_QToolButton");
        }
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit", "-100");
        nativeType("<Tab>");
        waitForObject(":Bookings.Query_QToolButton");
        clickButton(":Bookings.Query_QToolButton");
        waitForObject(":Bookings.Schedule_QToolButton");
        clickButton(":Bookings.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Bookings.Close_QToolButton");
        clickButton(":Bookings.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Bookings screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Bookings screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Prices by Customer Type.Query_QToolButton");
        clickButton(":Prices by Customer Type.Query_QToolButton");
        waitForObject(":Prices by Customer Type.Schedule_QToolButton");
        clickButton(":Prices by Customer Type.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Prices by Customer Type.Close_QToolButton");
        clickButton(":Prices by Customer Type.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Item Prices by Cutomer Type screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Item Prices by Cutomer Type screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Prices by Customer.VirtualClusterLineEdit_CLineEdit");
        type(":Prices by Customer.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        waitForObject(":Prices by Customer.Query_QToolButton");
        clickButton(":Prices by Customer.Query_QToolButton");
        waitForObject(":Prices by Customer.Schedule_QToolButton");
        clickButton(":Prices by Customer.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Prices by Customer.Close_QToolButton");
        clickButton(":Prices by Customer.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Item Prices by Customer screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Item Prices by Customer screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Prices by Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Prices by Item.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":Prices by Item.Query_QToolButton");
        clickButton(":Prices by Item.Query_QToolButton");
        waitForObject(":Prices by Item.Schedule_QToolButton");
        clickButton(":Prices by Item.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Prices by Item.Close_QToolButton");
        clickButton(":Prices by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Item Prices by Item screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Item Prices by Item screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Freight Prices by Customer Type.Query_QToolButton");
        clickButton(":Freight Prices by Customer Type.Query_QToolButton");
        waitForObject(":Freight Prices by Customer Type.Schedule_QToolButton");
        clickButton(":Freight Prices by Customer Type.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Freight Prices by Customer Type.Close_QToolButton");
        clickButton(":Freight Prices by Customer Type.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Freight Prices by Cutomer Type screen" + e);
    }
  
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Freight Prices by Cutomer Type screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Freight Prices by Customer.VirtualClusterLineEdit_CLineEdit");
        type(":Freight Prices by Customer.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        waitForObject(":Freight Prices by Customer.Query_QToolButton");
        clickButton(":Freight Prices by Customer.Query_QToolButton");
        waitForObject(":Freight Prices by Customer.Schedule_QToolButton");
        clickButton(":Freight Prices by Customer.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Freight Prices by Customer.Close_QToolButton");
        clickButton(":Freight Prices by Customer.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Freight Prices by Customer screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Freight Prices by Customer screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Open Payables.Query_QToolButton");
        clickButton(":Open Payables.Query_QToolButton");
        waitForObject(":Open Payables.Schedule_QToolButton");
        clickButton(":Open Payables.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Open Payables.Close_QToolButton");
        clickButton(":Open Payables.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Open Payables screen");
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Open Payables screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Voucher Register.Query_QToolButton");
        clickButton(":Voucher Register.Query_QToolButton");
        waitForObject(":Voucher Register.Schedule_QToolButton");
        clickButton(":Voucher Register.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Voucher Register.Close_QToolButton");
        clickButton(":Voucher Register.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Voucher Register screen");
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Voucher Register screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        if(!findObject(":groupBox.Show Credit Memos_XCheckBox").checked)
            clickButton(":groupBox.Show Credit Memos_XCheckBox");
        if(!findObject(":groupBox.Show Checks_XCheckBox").checked)
            clickButton(":groupBox.Show Checks_XCheckBox");
        waitForObject(":A/P Applications.Query_QToolButton");
        clickButton(":A/P Applications.Query_QToolButton");
        waitForObject(":A/P Applications.Schedule_QToolButton");
        clickButton(":A/P Applications.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":A/P Applications.Close_QToolButton");
        clickButton(":A/P Applications.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("exception in scheduling A/P Applications screen" + e);
  }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for A/P Applications screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":_vendGroup.VirtualClusterLineEdit_VendorLineEdit");
        type(":_vendGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        nativeType("<Tab>");
        waitForObject(":groupBox.XDateEdit_XDateEdit_2");
        type(":groupBox.XDateEdit_XDateEdit_2", "-365");
        waitForObject(":groupBox.XDateEdit_XDateEdit_3");
        type(":groupBox.XDateEdit_XDateEdit_3", "0");
        waitForObject(":Vendor History.Query_QToolButton");
        clickButton(":Vendor History.Query_QToolButton");
        waitForObject(":Vendor History.Schedule_QToolButton");
        clickButton(":Vendor History.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Vendor History.Close_QToolButton");
        clickButton(":Vendor History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Vendor History screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Vendor History screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Invoice Register.XDateEdit_XDateEdit");
        type(":Invoice Register.XDateEdit_XDateEdit", "-365");
        waitForObject(":Invoice Register.XDateEdit_XDateEdit_2");
        type(":Invoice Register.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Invoice Register.Query_QToolButton");
        clickButton(":Invoice Register.Query_QToolButton");
        waitForObject(":Invoice Register.Schedule_QToolButton");
        clickButton(":Invoice Register.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Invoice Register.Close_QToolButton");
        clickButton(":Invoice Register.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Invoice Register screen" + e);
  }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Invoice Register screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Cash Receipts.Query_QToolButton");
        clickButton(":Cash Receipts.Query_QToolButton");
        waitForObject(":Cash Receipts.Schedule_QToolButton");
        clickButton(":Cash Receipts.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Cash Receipts.Close_QToolButton");
        clickButton(":Cash Receipts.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Cash Receipts screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Cash Receipts screen");
    
    else test.fail("Batch Manager not responding"); 
  
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
        if(!findObject(":A/R Applications.Show Cash Receipts_XCheckBox").checked)
            clickButton(":A/R Applications.Show Cash Receipts_XCheckBox");
        if(!findObject(":A/R Applications.Show Credit Memos_XCheckBox").checked)
            clickButton(":A/R Applications.Show Credit Memos_XCheckBox");
        waitForObject(":A/R Applications.Query_QToolButton");
        clickButton(":A/R Applications.Query_QToolButton");
        waitForObject(":A/R Applications.Schedule_QToolButton");
        clickButton(":A/R Applications.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":A/R Applications.Close_QToolButton");
        clickButton(":A/R Applications.Close_QToolButton");
    }
    
    catch(e)
    {
        test.fail("exception in scheduling A/R Applications screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for A/R Applications screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Deposits Register.XDateEdit_XDateEdit");
        type(":Deposits Register.XDateEdit_XDateEdit", "-365");
        waitForObject(":Deposits Register.XDateEdit_XDateEdit_2");
        type(":Deposits Register.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Deposits Register.Query_QToolButton");
        clickButton(":Deposits Register.Query_QToolButton");
        waitForObject(":Deposits Register.Schedule_QToolButton");
        clickButton(":Deposits Register.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Deposits Register.Close_QToolButton");
        clickButton(":Deposits Register.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Deposits Register screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Deposits Register screen");
    
    else test.fail("Batch Manager not responding"); 
    
    
     //-----Exit the Application-----
   if(OS.name=="Linux")
    {
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
        activateItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
    }
    catch(e)
    {
        test.fail("Error in exiting the application" + e);
    }
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    waitForObject(":Registration Key.Yes_QPushButton");
    clickButton(":Registration Key.Yes_QPushButton");
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
        waitForObject(":Selection.VirtualClusterLineEdit_CLineEdit");
        type(":Selection.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        waitForObject(":Document Date Range.XDateEdit_XDateEdit");
        type(":Document Date Range.XDateEdit_XDateEdit", "-365");
        waitForObject(":Document Date Range.XDateEdit_XDateEdit_2");
        type(":Document Date Range.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Customer History.Query_QToolButton");
        clickButton(":Customer History.Query_QToolButton");
        waitForObject(":Customer History.Schedule_QToolButton");
        clickButton(":Customer History.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Customer History.Close_QToolButton");
        clickButton(":Customer History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Customer History screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Customer History screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":General Ledger Transactions.Query_QToolButton");
        clickButton(":General Ledger Transactions.Query_QToolButton");
        waitForObject(":General Ledger Transactions.Schedule_QToolButton");
        clickButton(":General Ledger Transactions.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":General Ledger Transactions.Close_QToolButton");
        clickButton(":General Ledger Transactions.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling General Ledger Transactions screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for General Ledger Transactions screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_15");
        type(":_dateGroup.XDateEdit_XDateEdit_15", "-365");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_16");
        type(":_dateGroup.XDateEdit_XDateEdit_16", "0");
        waitForObject(":Summarized General Ledger Transactions.Query_QToolButton");
        clickButton(":Summarized General Ledger Transactions.Query_QToolButton");
        waitForObject(":Summarized General Ledger Transactions.Schedule_QToolButton");
        clickButton(":Summarized General Ledger Transactions.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Summarized General Ledger Transactions.Close_QToolButton");
        clickButton(":Summarized General Ledger Transactions.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Summarized General Ledger Transactions screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Summarized General Ledger Transactions screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_17");
        type(":_dateGroup.XDateEdit_XDateEdit_17", "-365");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_18");
        type(":_dateGroup.XDateEdit_XDateEdit_18", "0");
        waitForObject(":Journal Series.Query_QToolButton");
        clickButton(":Journal Series.Query_QToolButton");
        waitForObject(":Journal Series.Schedule_QToolButton");
        clickButton(":Journal Series.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Journal Series.Close_QToolButton");
        clickButton(":Journal Series.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Journal Series screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Journal Series screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Standard Journal History.XDateEdit_XDateEdit");
        type(":Standard Journal History.XDateEdit_XDateEdit", "-365");
        waitForObject(":Standard Journal History.XDateEdit_XDateEdit_2");
        type(":Standard Journal History.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Standard Journal History.Query_QToolButton");
        clickButton(":Standard Journal History.Query_QToolButton");
        waitForObject(":Standard Journal History.Schedule_QToolButton");
        clickButton(":Standard Journal History.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Standard Journal History.Close_QToolButton");
        clickButton(":Standard Journal History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("exception in scheduling Standard Journal History screen" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Standard Journal History screen");
    
    else test.fail("Batch Manager not responding"); 
    
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
        waitForObject(":Summarized Bank Reconciliation History.Query_QToolButton");
        clickButton(":Summarized Bank Reconciliation History.Query_QToolButton");
        waitForObject(":Summarized Bank Reconciliation History.Schedule_QToolButton");
        clickButton(":Summarized Bank Reconciliation History.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Summarized Bank Reconciliation History.Close_QToolButton");
        clickButton(":Summarized Bank Reconciliation History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Summarized Bank Reconciliation History screen");
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Summarized Bank Reconciliation History screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //-----------------View Trial Balances---------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Financial Statements");
        activateItem(":*.Accounting_QMenu", "Financial Statements");
        waitForObjectItem(":*.Financial Statements_QMenu", "View Trial Balances...");
        activateItem(":*.Financial Statements_QMenu", "View Trial Balances...");
        waitForObject(":Trial Balances.Query_QToolButton");
        clickButton(":Trial Balances.Query_QToolButton");
        waitForObject(":Trial Balances.Schedule_QToolButton");
        clickButton(":Trial Balances.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Trial Balances.Close_QToolButton");
        clickButton(":Trial Balances.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling View Trial Balances screen");
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Trial Balances screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //-----------View Financial report--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Financial Statements");
        activateItem(":*.Accounting_QMenu", "Financial Statements");
        waitForObjectItem(":*.Financial Statements_QMenu", "View Financial Report...");
        activateItem(":*.Financial Statements_QMenu", "View Financial Report...");
        waitForObject(":_periods.12/01/12-12/31/12_QModelIndex");
        mouseClick(":_periods.12/01/12-12/31/12_QModelIndex", 65, 7, 0, Qt.LeftButton);
        waitForObject(":View Financial Report.qt_tabwidget_tabbar_QTabBar");
        clickTab(":View Financial Report.qt_tabwidget_tabbar_QTabBar", "Columns");
        if(!findObject(":_showColumnsTab.Beg. Bal._XCheckBox").checked)
            clickButton(":_showColumnsTab.Beg. Bal._XCheckBox");
        waitForObject(":View Financial Report.Query_QToolButton");
        clickButton(":View Financial Report.Query_QToolButton");
        waitForObject(":View Financial Report.Schedule_QToolButton");
        clickButton(":View Financial Report.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":View Financial Report.Close_QToolButton");
        clickButton(":View Financial Report.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling View Financial Report screen");
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Financial Report screen");
    
    else test.fail("Batch Manager not responding"); 
    
    //----------Tax Authorities----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Tax");
        activateItem(":*.Accounting_QMenu", "Tax");
        waitForObjectItem(":*.Tax_QMenu", "Tax Authorities...");
        activateItem(":*.Tax_QMenu", "Tax Authorities...");
        waitForObject(":Tax Authorities.Query_QToolButton");
        clickButton(":Tax Authorities.Query_QToolButton");
        waitForObject(":Tax Authorities.Schedule_QToolButton");
        clickButton(":Tax Authorities.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton"); 
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in scheduling Tax Authorites screen" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        
        test.pass("Batch Manager Submitted for Tax Authorites screen");
    
    else test.fail("Batch Manager not responding"); 
}
