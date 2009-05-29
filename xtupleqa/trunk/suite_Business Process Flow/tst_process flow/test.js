function main()
        
        
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Variable Declaration-----
    var sonumber, ponumber, vounumber, invoice, amount, quote, quotequantity, quotechange, soquantity;
    
    //-----Setting Encryption Key-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
    activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    
    waitForObject(":OK_QPushButton");
    clickButton(":OK_QPushButton");
    waitForObject(":_ccEncKeyName_QLineEdit");
    
    if(findObject(":_ccEncKeyName_QLineEdit").text!="OpenMFG.key")
    {
        type(":_ccEncKeyName_QLineEdit", "<Right>");
        type(":_ccEncKeyName_QLineEdit", "<Ctrl+A>");
        type(":_ccEncKeyName_QLineEdit", "OpenMFG.key");
        test.log("Encryption: key name changed");
    }
    
    if(findObject(":Encryption Configuration_FileLineEdit").text!="c:/crypto")
    {
        type(":Encryption Configuration_FileLineEdit", "<Right>");
        type(":Encryption Configuration_FileLineEdit", "<Ctrl+A>");
        type(":Encryption Configuration_FileLineEdit", "c:/crypto");
        test.log("Encryption: Windows location changed");
    }
    
    if(findObject(":Encryption Configuration_FileLineEdit_2").text!="/home/xtuple/Desktop/crypto")
    {
        type(":Encryption Configuration_FileLineEdit_2", "<Right>");
        type(":Encryption Configuration_FileLineEdit_2", "<Ctrl+A>");
        type(":Encryption Configuration_FileLineEdit_2", "/home/xtuple/Desktop/crypto");
        test.log("Encryption: Linux location changed");
    }
    
    if(findObject(":Encryption Configuration_FileLineEdit_3").text!="/Users/zenemp/Desktop/crypto")
    {
        type(":Encryption Configuration_FileLineEdit_3", "<Right>");
        type(":Encryption Configuration_FileLineEdit_3", "<Ctrl+A>");
        type(":Encryption Configuration_FileLineEdit_3", "/Users/zenemp/Desktop/crypto");
        test.log("Encryption: Mac location changed");
    }
    
    clickButton(":Encryption Configuration.Save_QPushButton");
    test.log("Encryption defined");
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    
    snooze(5);
    
    startApplication("xtuple");
    
    snooze(5);
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Verification of Unbalanced QOH Items----
    waitForObject(":xTuple ERP:*_QMenuBar_2");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Utilities");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Utilities");
    waitForObjectItem(":xTuple ERP:*.Utilities_QMenu", "Unbalanced QOH...");
    activateItem(":xTuple ERP:*.Utilities_QMenu", "Unbalanced QOH...");
    
    waitForObject(":_classCode.All Class Codes_QRadioButton");
    clickButton(":_classCode.All Class Codes_QRadioButton");
    waitForObject(":_warehouse.All Sites_QRadioButton_4");
    clickButton(":_warehouse.All Sites_QRadioButton_4");
    waitForObject(":Unbalanced QOH by Class Code.Query_QPushButton");
    clickButton(":Unbalanced QOH by Class Code.Query_QPushButton");
    waitForObject(":_itemsite_XTreeWidget");
    waitForObject(":_classCode.Selected:_QRadioButton");
    type(":_classCode.Selected:_QRadioButton", "<Down>");
    waitForObject(":_classCode.All Class Codes_QRadioButton");
    type(":_classCode.All Class Codes_QRadioButton", " ");
    
    if(findObject(":_itemsite_XTreeWidget").topLevelItemCount != 0)
        test.fail(" Items have Unbalanced QOH ");
    else test.pass(" Items have Balanced QOH ");
    
    waitForObject(":Unbalanced QOH by Class Code.Close_QPushButton");
    clickButton(":Unbalanced QOH by Class Code.Close_QPushButton");
    
    //-----Creation of Items-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
    activateItem(":xTuple ERP:*.Products_QMenu", "Item");
    waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item_QMenu", "List...");
    
    
    //-----Co-Product Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "zen co-product");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen Co-Product Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "Co-Product", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-COMP-Toy Components", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_prodcat_XComboBox");
    clickItem(":_prodcat_XComboBox", "CLASSIC-METAL - Classic Metal Product Line", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Item is Sold._listprice_XLineEdit");
    type(":Item is Sold._listprice_XLineEdit", "5.66");
    waitForObject(":_prodWeight_XLineEdit");
    type(":_prodWeight_XLineEdit", "2");
    waitForObject(":_packWeight_XLineEdit");
    type(":_packWeight_XLineEdit", "0.5");
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Control._controlMethod_XComboBox");
    clickItem(":Control._controlMethod_XComboBox", "Regular", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN CO-PRODUCT", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN CO-PRODUCT");
    
    //-----By-Product Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "zen by-product");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen By-Product Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "By-Product", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-COMP-Toy Components", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_prodcat_XComboBox");
    clickItem(":_prodcat_XComboBox", "CLASSIC-METAL - Classic Metal Product Line", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Item is Sold._listprice_XLineEdit");
    type(":Item is Sold._listprice_XLineEdit", "10.8"); 
    waitForObject(":_prodWeight_XLineEdit");
    type(":_prodWeight_XLineEdit", "3");
    waitForObject(":_packWeight_XLineEdit");
    type(":_packWeight_XLineEdit", "0.2");
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Control._controlMethod_XComboBox");
    clickItem(":Control._controlMethod_XComboBox", "Regular", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN BY-PRODUCT", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN BY-PRODUCT");
    
    //-----Job Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "Zen Job");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen Job Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "Job", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-COMP-Toy Components", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_prodcat_XComboBox");
    clickItem(":_prodcat_XComboBox", "CLASSIC-METAL - Classic Metal Product Line", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Item is Sold._listprice_XLineEdit");
    type(":Item is Sold._listprice_XLineEdit", "7");
    waitForObject(":_prodWeight_XLineEdit");
    type(":_prodWeight_XLineEdit", "5");
    waitForObject(":_packWeight_XLineEdit");
    type(":_packWeight_XLineEdit", "0.1");
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN JOB", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN JOB");
    
    //-----Refernce Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "zen reference");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen Reference Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "Reference", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-OTHER-Toys Other Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_prodcat_XComboBox");
    clickItem(":_prodcat_XComboBox", "CLASSIC-METAL - Classic Metal Product Line", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Item is Sold._listprice_XLineEdit");
    type(":Item is Sold._listprice_XLineEdit", "6");
    waitForObject(":_prodWeight_XLineEdit");
    type(":_prodWeight_XLineEdit", "5");
    waitForObject(":_packWeight_XLineEdit");
    type(":_packWeight_XLineEdit", "2.3");
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN REFERENCE", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN REFERENCE");
    
    //-----Costing Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "zen costing");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen Costing Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "Costing", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-OTHER-Toys Other Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Control._controlMethod_XComboBox");
    clickItem(":Control._controlMethod_XComboBox", "Regular", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5,5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN COSTING", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN COSTING");      
    
    //-----Tooling Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "zen tooling");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen Tooling Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "Tooling", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-COMP-Toy Components", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_prodWeight_XLineEdit");
    type(":_prodWeight_XLineEdit", "3");
    waitForObject(":_packWeight_XLineEdit");
    type(":_packWeight_XLineEdit", "0.5");
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Control._controlMethod_XComboBox");
    clickItem(":Control._controlMethod_XComboBox", "Regular", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "MATERIALS-Materials - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN TOOLING", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN TOOLING");  
    
    //-----Outside Process Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "zen outside process");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen Outisde Process Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "Outside Process", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-COMP-Toy Components", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Control._controlMethod_XComboBox");
    clickItem(":Control._controlMethod_XComboBox", "Regular", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN OUTSIDE PROCESS", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN OUTSIDE PROCESS"); 
    
    //-----Breeder Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "zen breeder");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen Breeder Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "Breeder", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-COMP-Toy Components", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "OP-Outside Processing Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "MATERIALS-Materials - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN BREEDER", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN BREEDER");
    
    //-----Planning Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "zen planning");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen Planning Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "Planning", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-COMP-Toy Components", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN PLANNING", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN PLANNING");
    
    //-----Phantom Item Type-----
    waitForObject(":List Items.New_QPushButton");
    clickButton(":List Items.New_QPushButton");
    
    waitForObject(":_itemNumber_XLineEdit");
    type(":_itemNumber_XLineEdit", "zen phantom");
    waitForObject(":_description1_XLineEdit");
    type(":_description1_XLineEdit", "Zen Phantom Item Type");
    waitForObject(":_itemtype_QComboBox");
    clickItem(":_itemtype_QComboBox", "Phantom", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_itemGroup._classcode_XComboBox");
    clickItem(":_itemGroup._classcode_XComboBox", "TOYS-COMP-Toy Components", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_inventoryUOM_XComboBox");
    clickItem(":_inventoryUOM_XComboBox", "EA", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    
    waitForObject(":Item.Yes_QPushButton");
    clickButton(":Item.Yes_QPushButton");
    
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode_XComboBox");
    clickItem(":_plannerCode_XComboBox", "MRP-MRP Items", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_costcat_XComboBox");
    clickItem(":_costcat_XComboBox", "FINISHED-Finished Product - WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Item.Save_QPushButton_2");
    clickButton(":Item.Save_QPushButton_2");
    waitForObject(":Item.Cancel_QPushButton");
    clickButton(":Item.Cancel_QPushButton");
    
    waitForObject(":List Items._item_XTreeWidget");
    if(!clickItem(":List Items._item_XTreeWidget", "ZEN PHANTOM", 5, 5, 1, Qt.LeftButton))
        test.pass("Item Created: ZEN PHANTOM");
    
    waitForObject(":List Items.Close_QPushButton");
    clickButton(":List Items.Close_QPushButton");
    
    //-----Bill of Materials-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
    activateItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
    waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
    activateItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
    
    waitForObject(":Bills of Materials.New_QPushButton");
    clickButton(":Bills of Materials.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton_3");
    clickButton(":_itemGroup...._QPushButton_3");
    waitForObject(":_item_XTreeWidget_4");
    doubleClickItem(":_item_XTreeWidget_4", "ZEN BREEDER", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":frame_2.New_QPushButton");
    clickButton(":frame_2.New_QPushButton");
    waitForObject(":Bill of Materials...._QPushButton");
    clickButton(":Bill of Materials...._QPushButton");
    waitForObject(":_item_XTreeWidget_5");
    doubleClickItem(":_item_XTreeWidget_5", "ZEN CO-PRODUCT", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyPer_XLineEdit");
    type(":_qtyPer_XLineEdit", "6.2");
    waitForObject(":_scrap_XLineEdit");
    type(":_scrap_XLineEdit", "1.5");
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
    
    waitForObject(":Bill of Materials.Save_QPushButton_2");
    clickButton(":Bill of Materials.Save_QPushButton_2");
    
    waitForObject(":Bills of Materials._bom_XTreeWidget");
    if(!clickItem(":Bills of Materials._bom_XTreeWidget", "ZEN BREEDER", 5, 5, 1, Qt.LeftButton))
        test.pass("Bill of Materials Created: ZEN BREEDER");
    
    waitForObject(":Bills of Materials.Close_QPushButton");
    clickButton(":Bills of Materials.Close_QPushButton");
    
    //-----Update Actual Costs-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
    activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Update Actual Costs");
    activateItem(":xTuple ERP:*.Costing_QMenu", "Update Actual Costs");
    waitForObjectItem(":xTuple ERP:*.Update Actual Costs_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Update Actual Costs_QMenu", "by Item...");
    
    waitForObject(":Update Actual Costs by Item...._QPushButton");
    clickButton(":Update Actual Costs by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Update Actual Costs by Item.Select all Costs_QPushButton");
    clickButton(":Update Actual Costs by Item.Select all Costs_QPushButton");
    waitForObject(":Update Actual Costs by Item.Roll Up Actual Costs_QCheckBox");
    clickButton(":Update Actual Costs by Item.Roll Up Actual Costs_QCheckBox");
    waitForObject(":Update Actual Costs by Item.Update_QPushButton");
    clickButton(":Update Actual Costs by Item.Update_QPushButton");
    waitForObject(":Update Actual Costs by Item.Close_QPushButton");
    clickButton(":Update Actual Costs by Item.Close_QPushButton");
    test.log("Updated Actual Costs by item - YTRUCK1");
    
    //-----Post Actual Costs-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
    activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
    activateItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
    waitForObjectItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Item...");
    
    waitForObject(":Post Actual Costs by Item...._QPushButton");
    clickButton(":Post Actual Costs by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Post Actual Costs by Item.Select all Costs_QPushButton");
    clickButton(":Post Actual Costs by Item.Select all Costs_QPushButton");
    waitForObject(":Post Actual Costs by Item.Roll Up Standard Costs_QCheckBox");
    clickButton(":Post Actual Costs by Item.Roll Up Standard Costs_QCheckBox");
    waitForObject(":Post Actual Costs by Item.Post_QPushButton");
    clickButton(":Post Actual Costs by Item.Post_QPushButton");
    waitForObject(":Post Actual Costs by Item.Close_QPushButton");
    clickButton(":Post Actual Costs by Item.Close_QPushButton");
    test.log("Posted Actual Costs by item - YTRUCK1");
    
    //-----Post Standard Costs-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
    activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Post Standard Costs");
    activateItem(":xTuple ERP:*.Costing_QMenu", "Post Standard Costs");
    waitForObjectItem(":xTuple ERP:*.Post Standard Costs_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Post Standard Costs_QMenu", "by Item...");
    
    waitForObject(":Update Standard Costs By Item...._QPushButton");
    clickButton(":Update Standard Costs By Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Update Standard Costs By Item.Select all Costs_QPushButton");
    clickButton(":Update Standard Costs By Item.Select all Costs_QPushButton");
    waitForObject(":Update Standard Costs By Item.Roll Up Standard Costs_QCheckBox");
    clickButton(":Update Standard Costs By Item.Roll Up Standard Costs_QCheckBox");
    waitForObject(":Update Standard Costs By Item.Update_QPushButton");
    clickButton(":Update Standard Costs By Item.Update_QPushButton");
    waitForObject(":Update Standard Costs By Item.Close_QPushButton");
    clickButton(":Update Standard Costs By Item.Close_QPushButton");
    test.log("Posted Standard Costs by item - YTRUCK1");
    
    //-----Verify Standard and Actual Costs in Intended Costed BOM-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
    activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Costing_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_4", "Costed BOM");
    activateItem(":xTuple ERP:*.Reports_QMenu_4", "Costed BOM");
    waitForObjectItem(":xTuple ERP:*.Costed BOM_QMenu", "Indented...");
    activateItem(":xTuple ERP:*.Costed BOM_QMenu", "Indented...");
    
    waitForObject(":Costed Indented Bill of Materials...._QPushButton");
    clickButton(":Costed Indented Bill of Materials...._QPushButton");
    waitForObject(":_item_XTreeWidget_7");
    doubleClickItem(":_item_XTreeWidget_7", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_costsGroup.Use Actual Costs_QRadioButton");
    clickButton(":_costsGroup.Use Actual Costs_QRadioButton");
    
    var actlcost= grabWidget(findObject(":Costed Bill of Materials._bomitem_XTreeWidget"));
    actlcost.save("actlcost.png");
    waitForObject(":_costsGroup.Use Standard Costs_QRadioButton");
    clickButton(":_costsGroup.Use Standard Costs_QRadioButton");
    var strdcost= grabWidget(findObject(":Costed Bill of Materials._bomitem_XTreeWidget"));
    strdcost.save("strdcost.png");
    if(actlcost.toImage()==strdcost.toImage()) test.pass("Actual costs are equal to Standard costs");
    else test.fail("Actual costs are not equal to Standard costs");
    
    waitForObject(":Costed Indented Bill of Materials.Close_QPushButton");
    clickButton(":Costed Indented Bill of Materials.Close_QPushButton");
    
    //-----Creating a Prospect-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Prospect");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Prospect");
    waitForObjectItem(":xTuple ERP:*.Prospect_QMenu", "List...");
    activateItem(":xTuple ERP:*.Prospect_QMenu", "List...");
    
    waitForObject(":List Prospects.New_QPushButton");
    clickButton(":List Prospects.New_QPushButton");
    waitForObject(":_number_XLineEdit");
    type(":_number_XLineEdit", "zen prospect1"); 
    waitForObject(":_name_QLineEdit");
    type(":_name_QLineEdit", "Zen Prospect");
    waitForObject(":_salesrep_XComboBox");
    clickItem(":_salesrep_XComboBox", "1000-Sam Masters", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Prospect...._QPushButton");
    clickButton(":Prospect...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "Susie", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_taxauth_XComboBox");
    clickItem(":_taxauth_XComboBox", "NC TAX", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Prospect.Save_QPushButton");
    clickButton(":Prospect.Save_QPushButton");
    
    waitForObject(":List Prospects._prospect_XTreeWidget");
    if(!clickItem(":List Prospects._prospect_XTreeWidget", "ZEN PROSPECT1", 5, 5, 1, Qt.LeftButton))
        test.pass("Prospect Created: ZEN PROSPECT");
    
    waitForObject(":List Prospects.Close_QPushButton");
    clickButton(":List Prospects.Close_QPushButton");
    
    //-----Creating a Quote using Prospect-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    waitForObjectItem(":xTuple ERP:*.Quote_QMenu", "List...");
    activateItem(":xTuple ERP:*.Quote_QMenu", "List...");
    
    waitForObject(":frame.New_QPushButton_3");
    clickButton(":frame.New_QPushButton_3");
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "ZEN PROSPECT1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_headerPage._orderNumber_XLineEdit_4");
    
    quote = findObject(":_headerPage._orderNumber_XLineEdit_4").text;
    
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+8");  
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton")
            waitForObject(":Quote.Close_QPushButton_2");
    clickButton(":Quote.Close_QPushButton_2"); 
    waitForObject(":Quote.Save_QPushButton_4");
    clickButton(":Quote.Save_QPushButton_4");
    waitForObject(":Quote.Cancel_QPushButton_5");
    clickButton(":Quote.Cancel_QPushButton_5");
    
    waitForObject(":List Quotes.Show Quotes For Prospects_XCheckBox");
    if(!findObject(":List Quotes.Show Quotes For Prospects_XCheckBox").checked)
        clickButton(":List Quotes.Show Quotes For Prospects_XCheckBox");
    waitForObject(":_quote_XTreeWidget");
    if(!clickItem(":_quote_XTreeWidget", quote, 5, 5, 1, Qt.LeftButton))
        test.pass("Quote with customer as prospect created successfully");
    else test.fail("Quote with customer as prospect not created");
    
    waitForObject(":*.Close_QPushButton");
    clickButton(":*.Close_QPushButton");
    
    //-----Converting Quote to Sales Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    waitForObjectItem(":xTuple ERP:*.Quote_QMenu", "List...");
    activateItem(":xTuple ERP:*.Quote_QMenu", "List...");
    
    waitForObject(":List Quotes.Show Quotes For Prospects_XCheckBox");
    if(!findObject(":List Quotes.Show Quotes For Prospects_XCheckBox").checked)
        clickButton(":List Quotes.Show Quotes For Prospects_XCheckBox");
    
    waitForObject(":_quote_XTreeWidget");
    clickItem(":_quote_XTreeWidget", quote, 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Convert_QPushButton");
    clickButton(":frame.Convert_QPushButton");
    waitForObject(":List Quotes.Yes_QPushButton");
    clickButton(":List Quotes.Yes_QPushButton");
    snooze(2);
    waitForObject(":List Quotes.Yes_QPushButton");
    clickButton(":List Quotes.Yes_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":List Quotes.Close_QPushButton");
    clickButton(":List Quotes.Close_QPushButton");
    
    //-----Verify - Quote conversion to Sales Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    
    waitForObject(":frame._so_XTreeWidget");
    if(!clickItem(":frame._so_XTreeWidget", quote, 5, 5, 1, Qt.LeftButton))
        test.pass("Quote converted to Sales Order successfully");
    else test.fail(" Quote not converted to Sales Order");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //-----Verify - Prospect converted to Customer-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Customer");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Customer");
    waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List...");
    activateItem(":xTuple ERP:*.Customer_QMenu", "List...");
    
    waitForObject(":List Customers._cust_XTreeWidget");
    if(!clickItem(":List Customers._cust_XTreeWidget", "ZEN PROSPECT1", 5, 5, 1, Qt.LeftButton))
        test.pass("Zen Prospect successfully converted to Customer");
    else test.fail(" Zen Prospect didn't convert to Customer");
    
    waitForObject(":List Customers.Close_QPushButton");
    clickButton(":List Customers.Close_QPushButton");
    
    //-----Creating and Editing a Quote-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    waitForObjectItem(":xTuple ERP:*.Quote_QMenu", "List...");
    activateItem(":xTuple ERP:*.Quote_QMenu", "List...");
    
    waitForObject(":frame.New_QPushButton_3");
    clickButton(":frame.New_QPushButton_3");
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TTOYS", 5, 5, 0, Qt.LeftButton);
    
    quote = findObject(":_headerPage._orderNumber_XLineEdit_4").text;
    
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+9");
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
    waitForObject(":Quote.Close_QPushButton_2");
    clickButton(":Quote.Close_QPushButton_2");
    waitForObject(":Quote.Save_QPushButton_4");
    clickButton(":Quote.Save_QPushButton_4");
    waitForObject(":Quote.Cancel_QPushButton_5");
    clickButton(":Quote.Cancel_QPushButton_5");
    
    waitForObject(":_quote_XTreeWidget");
    doubleClickItem(":_quote_XTreeWidget", quote, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
    waitForObject(":_lineItemsPage._soitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "50");
    
    quotequantity = findObject(":_qtyOrdered_XLineEdit").text;
    
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
    waitForObject(":Quote.Yes_QPushButton_2");
    clickButton(":Quote.Yes_QPushButton_2");
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton"); 
    
    waitForObject(":Quote.Close_QPushButton_3");
    clickButton(":Quote.Close_QPushButton_3");
    waitForObject(":Quote.Save_QPushButton_4");
    clickButton(":Quote.Save_QPushButton_4");
    
    waitForObject(":_quote_XTreeWidget");
    doubleClickItem(":_quote_XTreeWidget", quote, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
    waitForObject(":_lineItemsPage._soitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.Save_QPushButton");
    
    quotechange = findObject(":_qtyOrdered_XLineEdit").text;
    
    waitForObject(":Quote.Close_QPushButton_3");
    clickButton(":Quote.Close_QPushButton_3");
    waitForObject(":Quote.Save_QPushButton_4");
    clickButton(":Quote.Save_QPushButton_4");
    
    if(parseInt(quotequantity.toString()) == parseInt(quotechange.toString()))
        test.pass("Quote edit successful");
    else test.fail("Quote edit failed");
    
    waitForObject(":List Quotes.Close_QPushButton");
    clickButton(":List Quotes.Close_QPushButton");
    
    //-----Deleting a Quote-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    waitForObjectItem(":xTuple ERP:*.Quote_QMenu", "List...");
    activateItem(":xTuple ERP:*.Quote_QMenu", "List...");
    
    waitForObject(":_quote_XTreeWidget");
    clickItem(":_quote_XTreeWidget", quote, 5, 5, 0, Qt.LeftButton);  
    waitForObject(":frame.Delete_QPushButton");
    clickButton(":frame.Delete_QPushButton");
    waitForObject(":List Quotes.Yes_QPushButton");
    clickButton(":List Quotes.Yes_QPushButton");
    test.log("Quote delete successful");
    waitForObject(":List Quotes.Close_QPushButton");
    clickButton(":List Quotes.Close_QPushButton");
    
    //-----Extracting Sales Order Number-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
    waitForObjectItem(":*.Configure Modules_QMenu", "Sales...");
    activateItem(":*.Configure Modules_QMenu", "Sales...");
    waitForObject(":Sales Configuration._nextSoNumber_XLineEdit");   
    
    sonumber = findObject(":Sales Configuration._nextSoNumber_XLineEdit").text;
    
    waitForObject(":Sales Configuration.Cancel_QPushButton");
    clickButton(":Sales Configuration.Cancel_QPushButton");
    
    //-----Creating a Sales Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":_headerPage...._QPushButton_2"); 
    clickButton(":_headerPage...._QPushButton_2"); 
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "YTRUCK1", 5, 5 , 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    
    var soquantity = findObject(":_qtyOrdered_XLineEdit_2").text;
    
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "+7");  
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+8");
    waitForObject(":Sales Order.Save_QPushButton_3");
    clickButton(":Sales Order.Save_QPushButton_3");
    waitForObject(":Sales Order.Close_QPushButton_6");
    clickButton(":Sales Order.Close_QPushButton_6");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":Sales Order.Cancel_QPushButton_3");
    clickButton(":Sales Order.Cancel_QPushButton_3");
    
    waitForObject(":frame._so_XTreeWidget");
    if(!clickItem(":frame._so_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Order Created");
    else test.fail("Sales Order Failed");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //-----Extracting Sales Order Number-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP:*.System_QMenu", "Configure Modules");
    waitForObjectItem(":*.Configure Modules_QMenu", "Sales...");
    activateItem(":*.Configure Modules_QMenu", "Sales...");
    waitForObject(":Sales Configuration._nextSoNumber_XLineEdit");   
    
    var salesorder = findObject(":Sales Configuration._nextSoNumber_XLineEdit").text;
    
    waitForObject(":Sales Configuration.Cancel_QPushButton");
    clickButton(":Sales Configuration.Cancel_QPushButton");
    
    //-----Creating and Copying a Sales Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2"); 
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "BTRUCK1", 5, 5 , 0, Qt.LeftButton);
    snooze(2);
    
    var soitem1 = findObject(":_itemGroup._itemNumber_ItemLineEdit_3").text;
    
    waitForObject(":_qtyOrdered_XLineEdit_3");
    type(":_qtyOrdered_XLineEdit_3", "100"); 
    
    var soquantity1 = findObject(":_qtyOrdered_XLineEdit_3").text;
    
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "+7");  
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+8"); 
    waitForObject(":Sales Order.Save_QPushButton_3");
    clickButton(":Sales Order.Save_QPushButton_3");
    waitForObject(":Sales Order.Close_QPushButton_6");
    clickButton(":Sales Order.Close_QPushButton_6");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":Sales Order.Cancel_QPushButton_3");
    clickButton(":Sales Order.Cancel_QPushButton_3");
    
    waitForObject(":frame._so_XTreeWidget");
    clickItem(":frame._so_XTreeWidget", salesorder, 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":frame.Copy_QPushButton");
    clickButton(":frame.Copy_QPushButton");
    waitForObject(":List Open Sales Orders.Copy_QPushButton");
    clickButton(":List Open Sales Orders.Copy_QPushButton");
    waitForObject(":frame._so_XTreeWidget");
    doubleClickItem(":frame._so_XTreeWidget", parseInt(salesorder.toString())+1, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_3");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_3", "Line Items");
    waitForObject(":_lineItemsPage._soitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
    snooze(1);
    
    var soitem2 = findObject(":_itemGroup._itemNumber_ItemLineEdit_3").text;
    waitForObject(":_qtyOrdered_XLineEdit_3"); 
    var soquantity2 = findObject(":_qtyOrdered_XLineEdit_3").text; 
    waitForObject(":Sales Order.Close_QPushButton_7");
    clickButton(":Sales Order.Close_QPushButton_7");
    
    if(soitem1 == soitem2 && parseInt(soquantity1.toString()) == parseInt(soquantity2.toString()))
        test.pass("Sales Order Copy successful");
    else test.fail("Sales order copy not successful");
    
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //-----Deleting Sales Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu_2", "List Open...");
    
    waitForObject(":frame._so_XTreeWidget");
    clickItem(":frame._so_XTreeWidget", parseInt(salesorder.toString())+1 , 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Delete_QPushButton_2");
    clickButton(":frame.Delete_QPushButton_2");
    waitForObject(":List Open Sales Orders.Yes_QPushButton");
    clickButton(":List Open Sales Orders.Yes_QPushButton");
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    test.log("Sales Order delete successful");
    
    //-----Scheduling MRP by Planner Code-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
    waitForObjectItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton");
    waitForObject(":_warehouse.Selected:_QRadioButton");
    clickButton(":_warehouse.Selected:_QRadioButton");
    waitForObject(":_warehouse._warehouses_WComboBox");
    clickItem(":_warehouse._warehouses_WComboBox", "WH1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Run MRP by Planner Code.XDateEdit_XDateEdit");
    type(":Run MRP by Planner Code.XDateEdit_XDateEdit", "+30");
    waitForObject(":Run MRP by Planner Code.Create_QPushButton");
    clickButton(":Run MRP by Planner Code.Create_QPushButton");
    
    //-----MRP Results-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders");
    activateItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders");
    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_2");
    waitForObject(":_warehouse.Selected:_QRadioButton_2");
    clickButton(":_warehouse.Selected:_QRadioButton_2");
    waitForObject(":_warehouse._warehouses_WComboBox_2");
    clickItem(":_warehouse._warehouses_WComboBox_2", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    waitForObject(":_plannerCode.Selected:_QRadioButton");
    type(":_plannerCode.Selected:_QRadioButton", "<Down>");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
    type(":_plannerCode.All Planner Codes_QRadioButton_2", " ");
    sendEvent("QContextMenuEvent", ":frame._planord_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    
    waitForObject(":frame._planord_XTreeWidget");
    if(!clickItem(":frame._planord_XTreeWidget", "TKIT1", 5, 5, 1, Qt.LeftButton))
        test.pass("Planned Order for TKIT1 created ");
    else test.fail("Planned Order for TKIT1 not created");
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var qtkit1 = obj_TreeTopLevelItem.text(8);
    
    waitForObject(":_plannerCode.Selected:_QRadioButton");
    type(":_plannerCode.Selected:_QRadioButton", "<Down>");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
    type(":_plannerCode.All Planner Codes_QRadioButton_2", " ");
    sendEvent("QContextMenuEvent", ":frame._planord_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    
    waitForObject(":frame._planord_XTreeWidget");
    if(!clickItem(":frame._planord_XTreeWidget", "TBOX1", 5, 5, 1, Qt.LeftButton))
        test.pass("Planned Order for TBOX1 created ");
    else test.fail("Planned Order for TBOX1 not created");
    
    waitForObject(":frame._planord_XTreeWidget");
    var sWidgetTreeControl = ":frame._planord_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var qtbox1 = obj_TreeTopLevelItem.text(8);
    
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    
    //-----Creating Planned Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
    
    waitForObject(":Planned Order...._QPushButton");
    clickButton(":Planned Order...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "CBUMP", 5, 5, 0, Qt.LeftButton);   
    waitForObject(":Planned Order._qty_XLineEdit");
    type(":Planned Order._qty_XLineEdit", "25");
    waitForObject(":Planned Order.XDateEdit_XDateEdit");
    type(":Planned Order.XDateEdit_XDateEdit", "+7");
    waitForObject(":Planned Order.Create_QPushButton");
    clickButton(":Planned Order.Create_QPushButton");
    waitForObject(":Planned Order.Close_QPushButton");
    clickButton(":Planned Order.Close_QPushButton");
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders");
    activateItem(":xTuple ERP:*.Reports_QMenu_2", "Planned Orders");
    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_5");
    clickButton(":_warehouse.All Sites_QRadioButton_5");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    waitForObject(":frame._planord_XTreeWidget");
    
    if(!clickItem(":frame._planord_XTreeWidget", "CBUMP", 5, 5, 1, Qt.LeftButton))
        test.pass("Planned Order created successfully");
    else test.fail("Planned Order could not be created");
    
    //-----Deleting Planned Order-----
    waitForObject(":_warehouse.All Sites_QRadioButton_5");
    clickButton(":_warehouse.All Sites_QRadioButton_5");
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    waitForObject(":frame._planord_XTreeWidget");
    openItemContextMenu(":frame._planord_XTreeWidget","CBUMP", 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete Order...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Delete Order...");
    waitForObject(":Planned Orders by Planner Code.Delete_QPushButton");
    clickButton(":Planned Orders by Planner Code.Delete_QPushButton");
    
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    test.log("Planned Order deleted successfully");
    
    //-----Creating a Purchase Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    
    waitForObject(":List Unposted Purchase Orders.New_QPushButton");
    clickButton(":List Unposted Purchase Orders.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton_3");
    clickButton(":_headerPage...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "TPARTS", 5, 5, 0, Qt.LeftButton); 
    
    var purchaseorder = findObject(":_headerPage._orderNumber_XLineEdit").text;
    
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_3");
    clickButton(":_lineItemsPage.New_QPushButton_3");
    waitForObject(":_typeGroup...._QPushButton");
    clickButton(":_typeGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget_3");
    doubleClickItem(":_item_XTreeWidget_3", "TWHEEL1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "16");
    waitForObject(":Purchase Order Item.Save_QPushButton");
    clickButton(":Purchase Order Item.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    
    if(!clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", purchaseorder, 5, 5, 0, Qt.LeftButton))
        test.pass("Purhcase order created successfully");
    else test.fail("Purchase order couldn't be created");
    
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    
    //-----Editing Purchase Order-----
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
    doubleClickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", purchaseorder, 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", purchaseorder, 5, 5, 1, Qt.LeftButton);
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage._poitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._poitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "25");
    
    var qpurchaseorder1 =  findObject(":_ordered_XLineEdit").text;
    
    waitForObject(":Purchase Order Item.Save_QPushButton");
    clickButton(":Purchase Order Item.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
    doubleClickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", purchaseorder, 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", purchaseorder, 5, 5, 1, Qt.LeftButton);
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage._poitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._poitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    
    var qpurchaseorder2 =  findObject(":_ordered_XLineEdit").text;
    
    waitForObject(":Purchase Order Item.Save_QPushButton");
    clickButton(":Purchase Order Item.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    
    if(parseInt(qpurchaseorder1.toString()) == parseInt(qpurchaseorder2.toString()))
        test.pass("Purchase Order Edit successful");
    else test.fail(" Purchase Order Edit not successful");
    
    //-----Deleting Purchase Order-----
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", purchaseorder, 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Delete_QPushButton");
    clickButton(":List Unposted Purchase Orders.Delete_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton"); 
    test.log(" Purchase Order Deleted");    
    
    //-----Release Planned P/Os to Purchasing-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Release Planned Orders...");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "Release Planned Orders...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_4");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_4");
    waitForObject(":_warehouse.Selected:_QRadioButton_3");
    clickButton(":_warehouse.Selected:_QRadioButton_3");
    waitForObject(":_warehouse._warehouses_WComboBox_4");
    clickItem(":_warehouse._warehouses_WComboBox_4", "WH1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Release Planned Orders by Planner Code.XDateEdit_XDateEdit");
    type(":Release Planned Orders by Planner Code.XDateEdit_XDateEdit", "+30");
    waitForObject(":Release Planned Orders by Planner Code.Release_QPushButton");
    clickButton(":Release Planned Orders by Planner Code.Release_QPushButton");
    test.log("Released Planned P/Os to Purchasing");
    
    //-----Update Buffer Status-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Constraint Management");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Constraint Management");
    waitForObjectItem(":xTuple ERP:*.Constraint Management_QMenu", "Update Status");
    activateItem(":xTuple ERP:*.Constraint Management_QMenu", "Update Status");
    waitForObjectItem(":xTuple ERP:*.Update Status_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Update Status_QMenu", "by Planner Code...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_6");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_6");
    waitForObject(":_warehouse.All Sites_QRadioButton_3");
    clickButton(":_warehouse.All Sites_QRadioButton_3");
    waitForObject(":Run Buffer Status by Planner Code.Create_QPushButton");
    clickButton(":Run Buffer Status by Planner Code.Create_QPushButton");
    test.log("Buffer Status Updated");
    
    //-----Converting P/Rs to P/Os-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
    waitForObjectItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code..."); 
    
    waitForObject(":_warehouse._warehouses_WComboBox_3");
    clickItem(":_warehouse._warehouses_WComboBox_3", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_3");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_3");   
    waitForObject(":Purchase Requests by Planner Code.Query_QPushButton");
    clickButton(":Purchase Requests by Planner Code.Query_QPushButton");
    
    while(findObject(":Purchase Requests by Planner Code._pr_XTreeWidget").topLevelItemCount >= 1)
    {
        waitForObject(":Purchase Requests by Planner Code._pr_XTreeWidget");
        openItemContextMenu(":Purchase Requests by Planner Code._pr_XTreeWidget", "O", 5, 5, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
        waitForObjectItem(":_frame._itemsrc_XTreeWidget", "1");
        doubleClickItem(":_frame._itemsrc_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);  
        waitForObject(":Purchase Order Item.Save_QPushButton");
        clickButton(":Purchase Order Item.Save_QPushButton");
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        
        ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage._poitem_XTreeWidget");
        clickItem(":_lineItemsPage._poitem_XTreeWidget", "1", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        
        waitForObject(":Purchase Order.Close_QPushButton");
        clickButton(":Purchase Order.Close_QPushButton");
        
        waitForObject(":Purchase Requests by Planner Code.Query_QPushButton");
        clickButton(":Purchase Requests by Planner Code.Query_QPushButton");  
    }
    
    waitForObject(":Purchase Requests by Planner Code.Close_QPushButton");
    clickButton(":Purchase Requests by Planner Code.Close_QPushButton");
    test.log("Converted P/Rs to P/Os");
    
    //-----Posting Purchase Orders-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
    if(!clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 1, Qt.LeftButton))
        test.pass(" Purchase Order Created ");
    
    doubleClickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage._poitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._poitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Purchase Order Item.Save_QPushButton");    
    
    var polineitem = findObject(":_typeGroup._itemNumber_ItemLineEdit").text;
    var poquantity = findObject(":_ordered_XLineEdit").text;
    
    clickButton(":Purchase Order Item.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Post P/O_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post P/O_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
    test.log("Purchase Orders Posted successfully");
    
    //-----Verification of QOH by Item (Receiving Purchase Goods)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", polineitem, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Receiving Purchase Goods-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Receiving");
    
    waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
    activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
    waitForObject(":Enter Order Receipts...._QPushButton");
    clickButton(":Enter Order Receipts...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_3");
    doubleClickItem(":_listTab_XTreeWidget_3",ponumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Enter Order Receipts.Receive All_QPushButton");
    clickButton(":Enter Order Receipts.Receive All_QPushButton");
    waitForObject(":Enter Order Receipts.Post_QPushButton");
    clickButton(":Enter Order Receipts.Post_QPushButton");
    
    waitForObject(":Enter Order Receipts.Close_QPushButton");
    clickButton(":Enter Order Receipts.Close_QPushButton");
    
    //-----Verification of updated QOH by Item (Receiving Purchase Goods)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", polineitem, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) + parseInt(poquantity.toString()))
        test.pass("QOH updated correctly for Receiving Purchase goods");
    else test.fail("QOH updated incorrectly for Receiving Purchase goods");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Entering a Voucher-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
    
    waitForObject(":_voucherGroup...._QPushButton");
    clickButton(":_voucherGroup...._QPushButton");
    waitForObject(":_pohead_XTreeWidget");
    doubleClickItem(":_pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
    
    vounumber = findObject(":_voucherNumber_XLineEdit").text; 
    
    waitForObject(":_poitems._poitem_XTreeWidget");
    doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame_2._uninvoiced_XTreeWidget");
    doubleClickItem(":frame_2._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame.New_QPushButton");
    clickButton(":frame.New_QPushButton"); 
    waitForObject(":Voucher_XLineEdit");
    type(":Voucher_XLineEdit", "50");
    waitForObject(":Voucher.Save_QPushButton");
    clickButton(":Voucher.Save_QPushButton");
    waitForObject(":Voucher.Save_QPushButton_2");
    clickButton(":Voucher.Save_QPushButton_2");
    waitForObject(":_amount_XLineEdit");
    type(":_amount_XLineEdit", findObject(":_amount_XLineEdit_3").text);
    waitForObject(":_dateGroup.XDateEdit_XDateEdit");
    type(":_dateGroup.XDateEdit_XDateEdit", "+7");
    waitForObject(":_invoiceNum_XLineEdit");
    type(":_invoiceNum_XLineEdit", "VO for 20065 ");
    waitForObject(":Voucher.Save_QPushButton_3");
    clickButton(":Voucher.Save_QPushButton_3");
    waitForObject(":Voucher.Cancel_QPushButton");
    clickButton(":Voucher.Cancel_QPushButton");
    test.log("Voucher created successfully");
    
    //-----Posting Vouchers-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    if(!clickItem(":List Open Vouchers._vohead_XTreeWidget", vounumber, 5, 5, 1, Qt.LeftButton))
        test.pass(" Voucher created ");
    else test.fail(" Voucher not created");
    
    waitForObject(":List Open Vouchers.Post_QPushButton");
    clickButton(":List Open Vouchers.Post_QPushButton");
    waitForObject(":List Open Vouchers.Continue_QPushButton");
    clickButton(":List Open Vouchers.Continue_QPushButton");
    
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");
    test.log("Posted Voucher successfully");
    
    //-----Creating Miscellaneous Voucher-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    
    waitForObject(":List Open Vouchers.New Misc._QPushButton");
    clickButton(":List Open Vouchers.New Misc._QPushButton");
    waitForObject(":_voucherGroup...._QPushButton_2");
    clickButton(":_voucherGroup...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_9");
    doubleClickItem(":_listTab_XTreeWidget_9", "NC TAX", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Distributions:.New_QPushButton");
    clickButton(":Miscellaneous Distributions:.New_QPushButton");
    waitForObject(":_groupButton...._QPushButton");
    clickButton(":_groupButton...._QPushButton");
    waitForObject(":_groupButton._accnt_XTreeWidget");
    doubleClickItem(":_groupButton._accnt_XTreeWidget", "1000", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher_XLineEdit");
    type(":Miscellaneous Voucher_XLineEdit", "50");
    
    var vouamount = findObject(":Miscellaneous Voucher_XLineEdit").text;
    
    waitForObject(":Miscellaneous Voucher.Save_QPushButton");
    clickButton(":Miscellaneous Voucher.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit_3");
    type(":_amountGroup_XLineEdit_3", vouamount);
    
    var miscvoucher = findObject(":_voucherGroup._voucherNumber_XLineEdit").text;
    
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_7");
    type(":_dateGroup.XDateEdit_XDateEdit_7", "+7");
    waitForObject(":_referenceGroup._invoiceNum_XLineEdit");
    type(":_referenceGroup._invoiceNum_XLineEdit", "Misc. Invoice");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
    clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
    waitForObject(":Miscellaneous Voucher.Cancel_QPushButton");
    clickButton(":Miscellaneous Voucher.Cancel_QPushButton");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    if(!clickItem(":List Open Vouchers._vohead_XTreeWidget", miscvoucher, 5, 5, 1, Qt.LeftButton))
        test.pass("Misc. Voucher Created");
    else test.fail("Misc. Voucher not created");
    
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");
    
    //-----Editing Miscellaneous Voucher-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    doubleClickItem(":List Open Vouchers._vohead_XTreeWidget", miscvoucher, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Distributions:._miscDistrib_XTreeWidget");
    doubleClickItem(":Miscellaneous Distributions:._miscDistrib_XTreeWidget", "01-01-1000-01 - Cash at eBank", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher_XLineEdit");
    type(":Miscellaneous Voucher_XLineEdit", "25");
    
    var editamount1 = findObject(":Miscellaneous Voucher_XLineEdit").text;
    
    waitForObject(":Miscellaneous Voucher.Save_QPushButton");
    clickButton(":Miscellaneous Voucher.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit_3");
    type(":_amountGroup_XLineEdit_3", editamount1);
    waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
    clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
    
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    doubleClickItem(":List Open Vouchers._vohead_XTreeWidget", miscvoucher, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Distributions:._miscDistrib_XTreeWidget");
    doubleClickItem(":Miscellaneous Distributions:._miscDistrib_XTreeWidget", "01-01-1000-01 - Cash at eBank", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher_XLineEdit");
    
    var editamount2 = findObject(":Miscellaneous Voucher_XLineEdit").text;
    
    waitForObject(":Miscellaneous Voucher.Save_QPushButton");
    clickButton(":Miscellaneous Voucher.Save_QPushButton");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
    clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
    
    if(parseInt(editamount1.toString()) == parseInt(editamount2.toString()))
        test.pass(" Miscellaneous voucher Edit successful");
    else test.fail(" Miscellaneous voucher Edit not successful");
    
    //-----Deleting Miscellaneous Voucher-----
    waitForObject(":List Open Vouchers._vohead_XTreeWidget");
    clickItem(":List Open Vouchers._vohead_XTreeWidget", miscvoucher, 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Open Vouchers.Delete_QPushButton");
    clickButton(":List Open Vouchers.Delete_QPushButton");
    waitForObject(":List Open Vouchers.Yes_QPushButton");
    clickButton(":List Open Vouchers.Yes_QPushButton");
    
    waitForObject(":List Open Vouchers.Close_QPushButton");
    clickButton(":List Open Vouchers.Close_QPushButton");
    test.log("Deleted Miscellaneous Voucher successfully");
    
    //---Selecting Voucher for Payment---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP:*.Payments_QMenu", "Select...");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Select...");
    
    waitForObject(":Select Payments._select_XComboBox");
    clickItem(":Select Payments._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments._selectDate_XComboBox");
    clickItem(":Select Payments._selectDate_XComboBox", "All", 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame._apopen_XTreeWidget");
    clickItem(":frame._apopen_XTreeWidget", vounumber, 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Select..._QPushButton");
    clickButton(":frame.Select..._QPushButton");
    waitForObject(":_bankaccnt_XComboBox");
    clickItem(":_bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Select Payments.Save_QPushButton");
    clickButton(":Select Payments.Save_QPushButton");
    
    waitForObject(":Select Payments.Close_QPushButton");
    clickButton(":Select Payments.Close_QPushButton");
    test.log("Selected Voucher for Payment");
    
    //-----Prepare a Check run-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Payments");
    
    waitForObject(":xTuple ERP:*.Payments_QMenu");
    activateItem(":xTuple ERP:*.Payments_QMenu", "Prepare Check Run...");
    waitForObject(":Prepare Check Run._bankaccnt_XComboBox");
    clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Prepare Check Run.Prepare_QPushButton");
    clickButton(":Prepare Check Run.Prepare_QPushButton");
    test.log("Check run prepared successfully");
    
    
    //-----Extracting OS Name-----
    var linuxPath, winPath;
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Master Information");
    activateItem(":xTuple ERP:*.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    
    waitForObject(":Encryption Configuration_FileLineEdit_2");
    linuxPath = findObject(":Encryption Configuration_FileLineEdit_2").text;
    waitForObject(":Encryption Configuration_FileLineEdit");
    winPath = findObject(":Encryption Configuration_FileLineEdit").text;
    
    waitForObject(":Encryption Configuration.Cancel_QPushButton");
    clickButton(":Encryption Configuration.Cancel_QPushButton");
    
    //-----View Check run-----
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
    sendEvent("QMouseEvent", ":_frame.Print_QPushButton", QEvent.MouseButtonPress, 5, 5, Qt.LeftButton, 0);     
    waitForObjectItem(":_QMenu",  "Check Run...");
    activateItem(":_QMenu", "Check Run...");
    waitForObject(":View Check Run.Create ACH File_QPushButton");
    clickButton(":View Check Run.Create ACH File_QPushButton");
    if(object.exists(":View Check Run.Yes_QPushButton_2"))    
        clickButton(":View Check Run.Yes_QPushButton_2");
    waitForObject(":fileNameEdit_QLineEdit");
    
    if(OS.name=="Linux")
        findObject(":fileNameEdit_QLineEdit").text = linuxPath.toString()+"/achFile.ach";
    else if(OS.name == "Windows" )
        findObject(":fileNameEdit_QLineEdit").text = winPath.toString()+"/achFile.ach";
    
    waitForObject(":View Check Run.Save_QPushButton");
    clickButton(":View Check Run.Save_QPushButton");
    
    snooze(3);
    
    if(object.exists(":View Check Run.Yes_QPushButton_2"))    
        clickButton(":View Check Run.Yes_QPushButton_2");
    
    waitForObject(":View Check Run.Yes_QPushButton");
    clickButton(":View Check Run.Yes_QPushButton");
    
    
    waitForObject(":View Check Run.Cancel_QPushButton");
    clickButton(":View Check Run.Cancel_QPushButton");
    
    //-----Post Check run-----
    waitForObject(":_frame._check_XTreeWidget");
    clickItem(":_frame._check_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_frame.Post_QPushButton");
    clickButton(":_frame.Post_QPushButton");
    waitForObject(":View Check Run.Post_QPushButton");
    clickButton(":View Check Run.Post_QPushButton");
    
    waitForObject(":View Check Run.Close_QPushButton");
    clickButton(":View Check Run.Close_QPushButton");
    test.log("Posted Check for Voucher: 30070");
    
    //-----Accounts Payable - New misc. Debit Memo-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Memos");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Memos");
    waitForObjectItem(":xTuple ERP:*.Memos_QMenu", "New Misc. Debit Memo...");
    activateItem(":xTuple ERP:*.Memos_QMenu", "New Misc. Debit Memo...");
    
    waitForObject(":A/P Open Item - Enter Misc. Debit Memo...._QPushButton_2");
    clickButton(":A/P Open Item - Enter Misc. Debit Memo...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TPARTS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_11");
    type(":_dateGroup.XDateEdit_XDateEdit_11", "+7");
    waitForObject(":_amountGroup_XLineEdit_6");
    type(":_amountGroup_XLineEdit_6", "25");
    waitForObject(":A/P Open Item - Enter Misc. Debit Memo.Post_QPushButton_2");
    clickButton(":A/P Open Item - Enter Misc. Debit Memo.Post_QPushButton_2");
    
    //-----Accounts Receivable - New misc. Debit Memo-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Memos");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Memos");
    waitForObjectItem(":xTuple ERP:*.Memos_QMenu_2", "New Misc. Debit Memo...");
    activateItem(":xTuple ERP:*.Memos_QMenu_2", "New Misc. Debit Memo...");
    
    waitForObject(":A/R Open Item - Enter Misc. Debit Memo...._QPushButton");
    clickButton(":A/R Open Item - Enter Misc. Debit Memo...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_12");
    doubleClickItem(":_listTab_XTreeWidget_12", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_10");
    type(":_dateGroup.XDateEdit_XDateEdit_10", "+8");
    waitForObject(":_amountGroup_XLineEdit_5");
    type(":_amountGroup_XLineEdit_5", "55");
    waitForObject(":_docGroup._rsnCode_XComboBox");
    clickItem(":_docGroup._rsnCode_XComboBox", "SO-DAMAGED-RETURNED-SO Damaged - Returned on CM", 5, 5, 1, Qt.LeftButton);
    waitForObject(":A/R Open Item - Enter Misc. Debit Memo.Post_QPushButton");
    clickButton(":A/R Open Item - Enter Misc. Debit Memo.Post_QPushButton");
    
    waitForObject(":A/R Open Item - Enter Misc. Debit Memo.Cancel_QPushButton");
    clickButton(":A/R Open Item - Enter Misc. Debit Memo.Cancel_QPushButton");
    
    //-----Creating a Disassembly Work Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "100");
    
    var diswoquantity = findObject(":_qtyGroup._qty_XLineEdit").text;
    
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_6");
    type(":_schedGroup.XDateEdit_XDateEdit_6", "+7");
    waitForObject(":_itemGroup.Disassembly_QRadioButton");
    doubleClick(":_itemGroup.Disassembly_QRadioButton", 5, 5, 0, Qt.LeftButton);
    
    var disassemblywo = findObject(":Work Order._woNumber_XLineEdit").text;
    
    waitForObject(":Work Order.Create_QPushButton");
    clickButton(":Work Order.Create_QPushButton");
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_6", "Work Order Schedule");
    activateItem(":xTuple ERP:*.Reports_QMenu_6", "Work Order Schedule");
    waitForObjectItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
    
    waitForObject(":_parameter.All Planner Codes_QRadioButton");
    clickButton(":_parameter.All Planner Codes_QRadioButton");
    waitForObject(":_warehouse.All Sites_QRadioButton_6");
    clickButton(":_warehouse.All Sites_QRadioButton_6");
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
    waitForObject(":frame._wo_XTreeWidget");
    
    if(!clickItem(":frame._wo_XTreeWidget", "BTRUCK1", 5, 5, 0, Qt.LeftButton))
        test.pass("Disassembly Work Order Created");
    else test.fail("Disassembly Work Order not Created");
    
    waitForObject(":W/O Schedule by Planner Code.Close_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close_QPushButton");
    
    //-----Verification of QOH by Item (Post Production of Disassembly WorkOrder)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Post Production of Disassembly WorkOrder-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    activateItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    
    waitForObject(":Post Production...._QPushButton");
    clickButton(":Post Production...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "BTRUCK1" , 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qty_XLineEdit");
    type(":_qty_XLineEdit", diswoquantity);
    waitForObject(":Post Production.Post_QPushButton");
    clickButton(":Post Production.Post_QPushButton");
    
    waitForObject(":Post Production.Close_QPushButton");
    clickButton(":Post Production.Close_QPushButton");
    
    //-----Verification of updated QOH by Item (Post Production of Disassembly WorkOrder)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) - parseInt(diswoquantity.toString()))
        test.pass(" QOH updated correctly for Post Production of a disassembly WorkOrder");
    else test.fail(" QOH updated incorrectly for Post Production of a disassembly WorkOrder");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Verification of QOH by Item (Post Misc. Production of WorkOrder)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "RTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Post Miscellaneous Production of a WorkOrder-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Post Misc. Production...");
    activateItem(":xTuple ERP:*.Transactions_QMenu", "Post Misc. Production...");
    
    waitForObject(":Post Miscellaneous Production...._QPushButton");
    clickButton(":Post Miscellaneous Production...._QPushButton");
    waitForObject(":_item_XTreeWidget_9");
    doubleClickItem(":_item_XTreeWidget_9", "RTRUCK1", 7, 4, 0, Qt.LeftButton);
    waitForObject(":_qtyToPost_XLineEdit");
    type(":_qtyToPost_XLineEdit", "50");
    
    var miscquantity = findObject(":_qtyToPost_XLineEdit").text;
    
    waitForObject(":Post Miscellaneous Production.Post_QPushButton");
    clickButton(":Post Miscellaneous Production.Post_QPushButton");
    waitForObject(":Post Miscellaneous Production.Close_QPushButton");
    clickButton(":Post Miscellaneous Production.Close_QPushButton");
    
    //-----Verification of updated QOH by Item (Post Misc.Production of a WorkOrder)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "RTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) + parseInt(miscquantity.toString()))
        test.pass(" QOH updated correctly for Post Misc.Production of a WorkOrder");
    else test.fail(" QOH updated incorrectly for Post Misc.Production of a WorkOrder");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Releasing WorkOrders-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "Release...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_5");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_5");
    waitForObject(":_warehouse._warehouses_WComboBox_5");
    clickItem(":_warehouse._warehouses_WComboBox_5", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_4");
    type(":_dateGroup.XDateEdit_XDateEdit_4", "+30");
    
    waitForObject(":Release Work Orders by Planner Code.Release_QPushButton");
    clickButton(":Release Work Orders by Planner Code.Release_QPushButton");
    test.log("Work Orders released successfully");
    
    //-----Verification of QOH by Item (Issue W/O Materials)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TBOX1" , 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem1 = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TINSERT1" , 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem3 = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Issuing Work Order Materials-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Issue Material");
    activateItem(":xTuple ERP:*.Transactions_QMenu", "Issue Material");
    waitForObjectItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
    activateItem(":xTuple ERP:*.Issue Material_QMenu", "Batch...");
    
    waitForObject(":Issue Work Order Material Batch...._QPushButton");
    clickButton(":Issue Work Order Material Batch...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "TKIT1", 5, 5, 0, Qt.LeftButton); 
    
    waitForObject(":Issue Work Order Material Batch.Post_QPushButton");
    clickButton(":Issue Work Order Material Batch.Post_QPushButton");
    test.log("Work order materials issued successfully");
    
    //-----Verification of updated QOH by Item (Issue W/O Materials)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TBOX1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem1.toString()) - parseInt(qtkit1.toString()))
        test.pass(" QOH updated correctly for issuing WorkOrder materials");
    else test.fail(" QOH updated incorrectly for issuing WorkOrder materials");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TINSERT1", 5, 5, 0, Qt.LeftButton);
    waitForObjectItem(":_warehouse._warehouses_WComboBox_6", "WH1");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem4 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem3.toString()) == parseInt(sNameOfRootItem4.toString()) - parseInt(qtkit1.toString()))
        test.pass("QOH updated correctly for issuing WorkOrder materials");
    else test.fail("QOH updated incorrectly for issuing WorkOrder materials");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Verification of QOH by Item (Post Production)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TKIT1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Post Production and Close Work order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    activateItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    
    waitForObject(":Post Production...._QPushButton");
    clickButton(":Post Production...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "I", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qty_XLineEdit");
    
    var woquantity = findObject(":_qtyGroup.100.00_XLabel").text;
    
    type(":_qty_XLineEdit",woquantity);
    waitForObject(":_optionsGroup.Close W/O after Posting_XCheckBox");
    clickButton(":_optionsGroup.Close W/O after Posting_XCheckBox");
    waitForObject(":Post Production.Post_QPushButton");
    clickButton(":Post Production.Post_QPushButton");
    waitForObject(":Close Work Order.Post Comment_XCheckBox");
    clickButton(":Close Work Order.Post Comment_XCheckBox");
    
    waitForObject(":Close Work Order.Close W/O_QPushButton");
    clickButton(":Close Work Order.Close W/O_QPushButton");
    waitForObject(":Close Work Order.Close Work Order_QPushButton");
    clickButton(":Close Work Order.Close Work Order_QPushButton");
    waitForObject(":Post Production.Close_QPushButton");
    clickButton(":Post Production.Close_QPushButton");
    test.log("Work orders post production successful");
    
    //-----Verification of updated QOH by Item (Post Production)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "TKIT1", 5, 5, 0, Qt.LeftButton);
    waitForObjectItem(":_warehouse._warehouses_WComboBox_6", "WH1");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) + parseInt(woquantity.toString()))
        test.pass(" QOH updated correctly for Post Production of a WorkOrder");
    else test.fail(" QOH updated incorrectly for Post Production of a WorkOrder");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Verification of QOH by Item (BackFlush Items)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----BackFlush Items and Close Work Order-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    activateItem(":xTuple ERP:*.Transactions_QMenu", "Post Production...");
    
    waitForObject(":Post Production...._QPushButton");
    clickButton(":Post Production...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qty_XLineEdit");
    
    var qbackflush = findObject(":_qtyGroup.100.00_XLabel").text
                     
    type(":_qty_XLineEdit", qbackflush);
    waitForObject(":_optionsGroup.Close W/O after Posting_XCheckBox");
    clickButton(":_optionsGroup.Close W/O after Posting_XCheckBox");
    waitForObject(":Post Production.Post_QPushButton");
    clickButton(":Post Production.Post_QPushButton");
    waitForObject(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget");
    doubleClickItem(":Distribute Stock To/From Site Locations._itemloc_XTreeWidget", "No", 0, 0, 0, Qt.LeftButton);
    
    waitForObject(":Distribute to Location.Distribute_QPushButton");
    clickButton(":Distribute to Location.Distribute_QPushButton");
    waitForObject(":Distribute Stock To/From Site Locations.Post_QPushButton");
    clickButton(":Distribute Stock To/From Site Locations.Post_QPushButton");
    waitForObject(":Close Work Order.Close W/O_QPushButton");
    clickButton(":Close Work Order.Close W/O_QPushButton");
    
    waitForObject(":Close Work Order.Close Work Order_QPushButton");
    clickButton(":Close Work Order.Close Work Order_QPushButton");
    waitForObject(":Post Production.Close_QPushButton");
    clickButton(":Post Production.Close_QPushButton"); 
    test.log("Back flush of Work order materials successful");
    
    //-----Verification of updated QOH by Item (BackFlush Items)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString())+parseInt(qbackflush.toString()))
        test.pass(" QOH updated correctly for Backflush items");
    else test.fail("QOH updated incorrectly for Backflush items");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Verification of QOH by Item (Issue Stock to Shipping)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Issue Stock to Shipping-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_5");
    doubleClickItem(":_listTab_XTreeWidget_5", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    if(findObject(":groupBox.Select for Billing_QCheckBox").checked)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    waitForObject(":groupBox.Print Packing List_XCheckBox");
    if(findObject(":groupBox.Print Packing List_XCheckBox").checked)
        clickButton(":groupBox.Print Packing List_XCheckBox");
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
   
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    test.log("Sales order Stock issued");
    
    //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    activateItem(":xTuple ERP:*.Reports_QMenu_5", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":Quantities on Hand by Item...._QPushButton");
    clickButton(":Quantities on Hand by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse._warehouses_WComboBox_6");
    clickItem(":_warehouse._warehouses_WComboBox_6", "WH1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) - parseInt(soquantity.toString()))
        test.pass(" QOH updated correctly for Issue Stock to Shipping"); 
    else test.fail("QOH updated incorrectly for Issue Stock to Shipping");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Select Order for Billing-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Select Order for Billing...");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "Select Order for Billing...");
    
    waitForObject(":Select Order for Billing...._QPushButton");
    clickButton(":Select Order for Billing...._QPushButton");
    waitForObject(":Select Order for Billing._so_XTreeWidget");
    doubleClickItem(":Select Order for Billing._so_XTreeWidget", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_lineitemsTab._soitem_XTreeWidget");
    doubleClickItem(":_lineitemsTab._soitem_XTreeWidget", "EA", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Select Order for Billing.Save_QPushButton");
    clickButton(":Select Order for Billing.Save_QPushButton");
    waitForObject(":Select Order for Billing.Save_QPushButton_2");
    clickButton(":Select Order for Billing.Save_QPushButton_2");
    
    waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");
    test.log("Sales order Selected for Billing");
    
    //-----Creating and Editing Invoice-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu_2", "List Unposted...");
    activateItem(":xTuple ERP:*.Invoice_QMenu_2", "List Unposted...");
    
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_10");
    doubleClickItem(":_listTab_XTreeWidget_10", "TTOYS", 5, 5, 0, Qt.LeftButton);
    
    var invoicenumber = findObject(":_invoiceNumber_XLineEdit").text;
    
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
    waitForObject(":Item...._QPushButton");
    clickButton(":Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_10");
    doubleClickItem(":_item_XTreeWidget_10", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "25");
    waitForObject(":_billed_XLineEdit");
    type(":_billed_XLineEdit", "25");
    waitForObject(":Invoice.Save_QPushButton");
    clickButton(":Invoice.Save_QPushButton");
    waitForObject(":Invoice.Save_QPushButton_2");
    clickButton(":Invoice.Save_QPushButton_2");
    
    waitForObject(":_invchead_XTreeWidget");
    if(!clickItem(":_invchead_XTreeWidget", invoicenumber, 5, 5, 1, Qt.LeftButton))
        test.pass("Invoice created successfully");
    
    waitForObject(":List Unposted Invoices.Edit_QPushButton");
    clickButton(":List Unposted Invoices.Edit_QPushButton");
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab._invcitem_XTreeWidget");
    doubleClickItem(":lineItemsTab._invcitem_XTreeWidget", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "<Tab>");
    waitForObject(":_billed_XLineEdit");
    type(":_billed_XLineEdit", "50");
    
    var qbilled1 = findObject(":_billed_XLineEdit").text;
    
    waitForObject(":_billed_XLineEdit");
    type(":_billed_XLineEdit", "<Shift+Backtab>");
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "50");
    
    var qordered1 = findObject(":_ordered_XLineEdit_2").text;
    
    waitForObject(":Invoice.Save_QPushButton");
    clickButton(":Invoice.Save_QPushButton");
    waitForObject(":Invoice.Save_QPushButton_2");
    clickButton(":Invoice.Save_QPushButton_2");
    
    waitForObject(":_invchead_XTreeWidget");
    doubleClickItem(":_invchead_XTreeWidget", invoicenumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab._invcitem_XTreeWidget");
    doubleClickItem(":lineItemsTab._invcitem_XTreeWidget", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_billed_XLineEdit");
    
    var qbilled2 = findObject(":_billed_XLineEdit").text;
    waitForObject(":_ordered_XLineEdit_2");
    var qordered2 = findObject(":_ordered_XLineEdit_2").text;
    
    if(parseInt(qbilled1.toString()) == parseInt(qbilled2.toString()) && parseInt(qordered1.toString()) == parseInt(qordered2.toString()))
        test.pass("Invoice edit successful");
    else test.fail("Invoice edit not successful");
    
    waitForObject(":Invoice.Save_QPushButton");
    clickButton(":Invoice.Save_QPushButton");
    waitForObject(":Invoice.Save_QPushButton_2");
    clickButton(":Invoice.Save_QPushButton_2");
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");
    
    //-----Deleting Invoice-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu_2", "List Unposted...");
    activateItem(":xTuple ERP:*.Invoice_QMenu_2", "List Unposted...");
    
    waitForObject(":_invchead_XTreeWidget");
    clickItem(":_invchead_XTreeWidget", invoicenumber, 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Unposted Invoices.Delete_QPushButton");
    clickButton(":List Unposted Invoices.Delete_QPushButton");
    waitForObject(":List Unposted Invoices.Delete_QPushButton_2");
    clickButton(":List Unposted Invoices.Delete_QPushButton_2");
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");
    test.log("Invoice delete successful");
    
    //-----Creating Invoices-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Billing Selections...");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "Billing Selections...");
    
    waitForObject(":Billing Selections._cobill_XTreeWidget");
    clickItem(":Billing Selections._cobill_XTreeWidget", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Billing Selections.Create Invoice_QPushButton");
    clickButton(":Billing Selections.Create Invoice_QPushButton");
    waitForObject(":Billing Selections.Close_QPushButton");
    clickButton(":Billing Selections.Close_QPushButton");
    test.log("Invoice created successful");
    
    //-----Posting Invoices-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Billing");
    waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP:*.Billing_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices...");
    activateItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices...");
    
    waitForObject(":_invchead_XTreeWidget");
    doubleClickItem(":_invchead_XTreeWidget", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.Close_QPushButton");
    
    invoice = findObject(":_invoiceNumber_XLineEdit").text;
    
    clickButton(":Invoice.Close_QPushButton");
    waitForObject(":List Unposted Invoices.Post_QPushButton");
    clickButton(":List Unposted Invoices.Post_QPushButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");
    
    waitForObject(":List Unposted Invoices.Query_QPushButton");
    clickButton(":List Unposted Invoices.Query_QPushButton");
    
    waitForObject(":*.Close_QPushButton");
    clickButton(":*.Close_QPushButton");
    test.log("Invoice posted successful");
    
    //-----Entering Cash Receipts-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Workbench...");
    activateItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Workbench...");
    
    waitForObject(":frame._select_XComboBox");
    clickItem(":frame._select_XComboBox", "All Customers", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Receivables Workbench.Query_QPushButton");
    clickButton(":Receivables Workbench.Query_QPushButton");
    waitForObject(":Receivables Workbench.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Receivables Workbench.qt_tabwidget_tabbar_QTabBar", "Cash Receipts");
    waitForObject(":_cashRecptTab.New_QPushButton");
    clickButton(":_cashRecptTab.New_QPushButton");
    waitForObject(":Cash Receipt...._QPushButton");
    clickButton(":Cash Receipt...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_6");
    doubleClickItem(":_listTab_XTreeWidget_6", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_applicationsTab._aropen_XTreeWidget");
    doubleClickItem(":_applicationsTab._aropen_XTreeWidget", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Cash Receipt_XLineEdit");
    
    amount = findObject(":Cash Receipt_XLineEdit_2").text;
    
    type(":Cash Receipt_XLineEdit", amount);
    waitForObject(":Cash Receipt.Save_QPushButton");
    clickButton(":Cash Receipt.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit");
    type(":_amountGroup_XLineEdit", amount);
    waitForObject(":Cash Receipt.Save_QPushButton_2");
    clickButton(":Cash Receipt.Save_QPushButton_2");
    test.log("Cash receipt created for the Invoice");
    
    //-----Posting Cash Receipts-----
    waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
    clickItem(":_cashRecptTab._cashrcpt_XTreeWidget" ,"TTOYS", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_cashRecptTab.Post_QPushButton");
    clickButton(":_cashRecptTab.Post_QPushButton");
    
    waitForObject(":Receivables Workbench.Close_QPushButton");
    clickButton(":Receivables Workbench.Close_QPushButton");
    test.log("Cash receipt posted successful");
    
    //-----Customer Information Workbench-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Customer");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Customer");
    waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "Workbench...");
    activateItem(":xTuple ERP:*.Customer_QMenu", "Workbench...");
    
    waitForObject(":Customer Information Workbench...._QPushButton");
    clickButton(":Customer Information Workbench...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_7");
    doubleClickItem(":_listTab_XTreeWidget_7", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Customer Information Workbench.Query_QPushButton");
    clickButton(":Customer Information Workbench.Query_QPushButton");
    waitForObject(":Customer Information Workbench.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Customer Information Workbench.qt_tabwidget_tabbar_QTabBar", "Invoices");
    waitForObject(":_invoicesTab.Show Closed_XCheckBox");
    clickButton(":_invoicesTab.Show Closed_XCheckBox");
    
    waitForObject(":_invoicesTab._invoice_XTreeWidget");
    if(!clickItem(":_invoicesTab._invoice_XTreeWidget", invoice, 5, 5, 1, Qt.LeftButton))
        test.pass(" Invoice available in Customer Workbench to view details");
    
    waitForObject(":_invoicesTab.View_QPushButton"); 
    clickButton(":_invoicesTab.View_QPushButton");
    waitForObject(":Invoice Information.Close_QPushButton_2");
    clickButton(":Invoice Information.Close_QPushButton_2");      
    
    waitForObject(":Customer Information Workbench.Close_QPushButton");
    clickButton(":Customer Information Workbench.Close_QPushButton");
    

}
