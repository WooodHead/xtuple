function main()
{

    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Variable Declaration-----
    var  ponumber, vounumber, polineitem, poquantity;
    
    //---find Application Edition------ 
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
    activateItem(":xTuple ERP: *_QMenuBar_3", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.*_QLabel_2");
    var appEdition = findObject(":Database Information.*_QLabel_2").text;
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
    
    //-----Posting Purchase Orders-----
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
    doubleClickItem(":_item_XTreeWidget_2", "TBOX1", 5, 5, 0, Qt.LeftButton);
    
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
    test.log(" " + sNameOfRootItem2); 
    
    var sum = absValue(sNameOfRootItem2);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sum.toString())) 
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
    
    //-----Entering a Voucher-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP: *.Voucher_QMenu", "New...");
    activateItem(":xTuple ERP: *.Voucher_QMenu", "New...");
    
    waitForObject(":_voucherGroup...._QPushButton");
    clickButton(":_voucherGroup...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_3");
    doubleClickItem(":_listTab_XTreeWidget_3", ponumber, 5, 5, 0, Qt.LeftButton);
    
    vounumber = findObject(":_voucherNumber_XLineEdit").text; 
    
    waitForObject(":_poitems._poitem_XTreeWidget");
    doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 1, Qt.LeftButton);      
    waitForObject(":Univoiced Recepts and Returns._uninvoiced_XTreeWidget");
    doubleClickItem(":Univoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_distTab.New_QPushButton");
    clickButton(":_distTab.New_QPushButton");
    waitForObject(":Voucher._currency_XLineEdit");
    type(":Voucher._currency_XLineEdit", "25");
    waitForObject(":Voucher.Save_QPushButton");
    clickButton(":Voucher.Save_QPushButton");
    waitForObject(":Voucher.Save_QPushButton_2");
    clickButton(":Voucher.Save_QPushButton_2");  
    waitForObject(":_amount._currency_XLineEdit");
    type(":_amount._currency_XLineEdit",findObject(":_amount_XLineEdit").text );
    
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_3");
    type(":_dateGroup.XDateEdit_XDateEdit_3", "+0");
    waitForObject(":_invoiceNum_XLineEdit");
    type(":_invoiceNum_XLineEdit", "VO for" + ponumber);
    waitForObject(":Voucher.Save_QPushButton_3");
    clickButton(":Voucher.Save_QPushButton_3");
    
    waitForObject(":Voucher.Cancel_QPushButton");
    clickButton(":Voucher.Cancel_QPushButton");
    test.log("Voucher created successfully");
    
    //-----Posting Vouchers-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP: *.Voucher_QMenu", "List Unposted...");
    activateItem(":xTuple ERP: *.Voucher_QMenu", "List Unposted...");
    
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
    
    //---Selecting Voucher for Payment---
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP: *.Payments_QMenu", "Select...");
    activateItem(":xTuple ERP: *.Payments_QMenu", "Select...");
    
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
    
    //-----Prepare Check run-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP: *.Payments_QMenu", "Prepare Check Run...");
    activateItem(":xTuple ERP: *.Payments_QMenu", "Prepare Check Run...");
    
    waitForObjectItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account");
    clickItem(":Prepare Check Run._bankaccnt_XComboBox", "EBANK-eBank Checking Account", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Prepare Check Run.Prepare_QPushButton");
    clickButton(":Prepare Check Run.Prepare_QPushButton");
    test.log("Check run prepared successfully");
    
    snooze(2);
    
    //-----Extracting OS Name-----
    var linuxPath, winPath;
    
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "System");
    activateItem(":xTuple ERP: *_QMenuBar_3", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu_2", "Master Information");
    waitForObjectItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    activateItem(":xTuple ERP:*.Master Information_QMenu", "Encryption...");
    
    if(object.exists(":OK_QPushButton"))
        clickButton(":OK_QPushButton");
    
    waitForObject(":Encryption Configuration_FileLineEdit_2");
    linuxPath = findObject(":Encryption Configuration_FileLineEdit_2").text;
    waitForObject(":Encryption Configuration_FileLineEdit");
    winPath = findObject(":Encryption Configuration_FileLineEdit").text;
    
    waitForObject(":Encryption Configuration.Cancel_QPushButton");
    clickButton(":Encryption Configuration.Cancel_QPushButton");
    
    //-----View Check run-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar_3", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    activateItem(":xTuple ERP: *.Accounts Payable_QMenu", "Payments");
    waitForObjectItem(":xTuple ERP: *.Payments_QMenu", "View Check Run...");
    activateItem(":xTuple ERP: *.Payments_QMenu", "View Check Run...");
    
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
    waitForObject(":fileNameEdit_QLineEdit_2");
    
    
    if(OS.name=="Linux")
        findObject(":fileNameEdit_QLineEdit_2").text = linuxPath.toString()+"/achFile.ach";
    else if(OS.name == "Windows" )
        findObject(":fileNameEdit_QLineEdit_2").text = winPath.toString()+"/achFile.ach";
    
    waitForObject(":View Check Run.Save_QPushButton");
    clickButton(":View Check Run.Save_QPushButton");
    
    snooze(3);
    
    if(object.exists(":View Check Run.Yes_QPushButton_2"))    
        clickButton(":View Check Run.Yes_QPushButton_2");
    
    waitForObject(":View Check Run.Yes_QPushButton");
    clickButton(":View Check Run.Yes_QPushButton");
    
    waitForObject(":View Check Run.Cancel_QPushButton");
    clickButton(":View Check Run.Cancel_QPushButton");
    
    snooze(2);
    
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
    
    //-----Verification of G/L transaction (Posting Checks)-----
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
    if(sNameOfRootItem == "CK")
        test.pass("Posting of Checks has a GL entry");
    else test.fail("Posting of Checks has no GL entry");
    
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
    if(sNameOfRootItem == "CK")
        test.pass("Posting of Checks has a GL entry");
    else test.fail("Posting of Checks has no GL entry");
    
    waitForObject(":General Ledger Transactions.Close_QPushButton");
    clickButton(":General Ledger Transactions.Close_QPushButton");              
    
        
}
