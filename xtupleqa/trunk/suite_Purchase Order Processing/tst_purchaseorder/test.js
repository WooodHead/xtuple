function main()
{

    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Variable Declaration-----
    var  ponumber, vounumber, invoice, amount, polineitem, poquantity, woquantity, soquantity;
    
    //---find Application Edition------ 
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
    activateItem(":xTuple ERP: *_QMenuBar_3", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
       
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
    waitForObject(":Database Information.Save_QPushButton_2");
    clickButton(":Database Information.Save_QPushButton_2");
    
    //-----Setting Encryption Key----- 
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
    activateItem(":xTuple ERP: *_QMenuBar_3", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    
    snooze(1);
    if(object.exists(":OK_QPushButton"))
        clickButton(":OK_QPushButton");
    snooze(0.5);
    waitForObject(":_ccEncKeyName_QLineEdit");
    
    if(findObject(":_ccEncKeyName_QLineEdit").text!="xTuple.key")
    {
        type(":_ccEncKeyName_QLineEdit", "<Right>");
        findObject(":_ccEncKeyName_QLineEdit").clear;
        type(":_ccEncKeyName_QLineEdit", "OpenMFG.key");
        test.log("Encryption: key name changed");
    }
    
    if(findObject(":Encryption Configuration_FileLineEdit").text!="c:/crypto")
    {
        type(":Encryption Configuration_FileLineEdit", "<Right>");
        findObject(":Encryption Configuration_FileLineEdit").clear;
        type(":Encryption Configuration_FileLineEdit", "c:/crypto");
        test.log("Encryption: Windows location changed");
    }
    
    if(findObject(":Encryption Configuration_FileLineEdit_2").text!="/home/xtuple/Desktop/crypto")
    {
        type(":Encryption Configuration_FileLineEdit_2", "<Right>");
        findObject(":Encryption Configuration_FileLineEdit_2").clear;
        type(":Encryption Configuration_FileLineEdit_2", "/home/xtuple/Desktop/crypto");
        test.log("Encryption: Linux location changed");
    }
    
    if(findObject(":Encryption Configuration_FileLineEdit_3").text!="/Users/zenemp/Desktop/crypto")
    {
        type(":Encryption Configuration_FileLineEdit_3", "<Right>");
        findObject(":Encryption Configuration_FileLineEdit_3").clear;
        type(":Encryption Configuration_FileLineEdit_3", "/Users/zenemp/Desktop/crypto");
        test.log("Encryption: Mac location changed");
    }
    
    clickButton(":Encryption Configuration.Save_QPushButton");
    test.log("Encryption defined");
    
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
    activateItem(":xTuple ERP: *_QMenuBar_3", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: *.System_QMenu_2", "Exit xTuple ERP...");

       
    snooze(5);
    
    if(OS.name=="Linux")
    {
        startApplication("xtuple.bin");
    }
    
    else
        
        startApplication("xtuple");
    
    snooze(5);
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Creating a Purchase Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
    waitForObjectItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    
    waitForObject(":List Unposted Purchase Orders.New_QPushButton");
    clickButton(":List Unposted Purchase Orders.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton");
    clickButton(":_headerPage...._QPushButton");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TPARTS", 5, 5, 0, Qt.LeftButton);
    
    ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
    
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":groupBox_2...._QPushButton");
    clickButton(":groupBox_2...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "TBOX1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "100");
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "<Tab>");
    waitForObject(":_priceGroup_XLineEdit");
    type(":_priceGroup_XLineEdit", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    
    polineitem = findObject(":groupBox_2._itemNumber_ItemLineEdit").text;         
    poquantity = findObject(":_ordered_XLineEdit").text;       
    
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton_2");
    clickButton(":Purchase Order.Save_QPushButton_2");
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    
    if(!clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton))
        test.pass("Purhcase order created successfully");
    else test.fail("Purchase order couldn't be created");
    
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
    
    //-----Posting Purchase Orders-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Purchase");
    waitForObjectItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP: *.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget"); 
    clickItem(":List Unposted Purchase Orders._pohead_XTreeWidget", ponumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Unposted Purchase Orders.Post_QPushButton");
    clickButton(":List Unposted Purchase Orders.Post_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
    clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
    
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
    test.log("Purchase Orders Posted successfully");
    
    //-----Verification of QOH by Item (Receiving Purchase Goods)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand");
    activateItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", polineitem, 5, 5, 0, Qt.LeftButton);
        
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
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
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
    waitForObjectItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");
    activateItem(":xTuple ERP: *.Receiving_QMenu", "New Receipt...");
    
    waitForObject(":Enter Order Receipts...._QPushButton");
    clickButton(":Enter Order Receipts...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", ponumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_frame.Receive All_QPushButton");
    clickButton(":_frame.Receive All_QPushButton");
    
    waitForObject(":Enter Order Receipts.Post_QPushButton");
    clickButton(":Enter Order Receipts.Post_QPushButton");
    waitForObject(":Enter Order Receipts.Close_QPushButton");
    clickButton(":Enter Order Receipts.Close_QPushButton");
        
    //-----Verification of updated QOH by Item (Receiving Purchase Goods)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand");
    activateItem(":xTuple ERP: *.Reports_QMenu", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", polineitem, 5, 5, 0, Qt.LeftButton);
        
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
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
    
    
    //-----Verification of G/L transaction (Receiving PO)----- 
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "General Ledger");
    waitForObjectItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
    activateItem(":xTuple ERP: *.General Ledger_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Transactions...");
    activateItem(":xTuple ERP: *_.Reports_QMenu", "Transactions...");
   
    waitForObject(":_accountGroup.All Accounts_QRadioButton");
    clickButton(":_accountGroup.All Accounts_QRadioButton");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit");
    type(":_dateGroup.XDateEdit_XDateEdit", "0");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
    waitForObject(":_sourceGroup.Selected Source:_QRadioButton");
    clickButton(":_sourceGroup.Selected Source:_QRadioButton");
    waitForObjectItem(":_sourceGroup._source_XComboBox", "S/R");
    clickItem(":_sourceGroup._source_XComboBox", "S/R", 5, 5, 1, Qt.LeftButton);
    waitForObject(":General Ledger Transactions.Query_QPushButton");
    clickButton(":General Ledger Transactions.Query_QPushButton");
    
    waitForObject(":_gltrans_XTreeWidget");
    var sWidgetTreeControl = ":_gltrans_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
    if(sNameOfRootItem == "PO")
        test.pass("Receiving PO has a GL entry");
    else test.fail(" Receiving PO has no GL entry");
    
    waitForObject(":_gltrans_XTreeWidget");
    type(":_gltrans_XTreeWidget", "<Down>");
    waitForObject(":_gltrans_XTreeWidget");
    type(":_gltrans_XTreeWidget", " ");
    sendEvent("QContextMenuEvent", ":_gltrans_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    
    waitForObject(":_gltrans_XTreeWidget");
    var sWidgetTreeControl = ":_gltrans_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    type(sWidgetTreeControl,"<Space>");
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
    if(sNameOfRootItem == "PO")
        test.pass("Receiving PO has a GL entry");
    else test.fail(" Receiving PO has no GL entry");
    
    waitForObject(":General Ledger Transactions.Close_QPushButton");
    clickButton(":General Ledger Transactions.Close_QPushButton");
    
       
           
        
}
