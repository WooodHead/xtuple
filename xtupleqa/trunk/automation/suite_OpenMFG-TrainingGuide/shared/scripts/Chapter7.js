function executeChapter7()
{
    source(findFile("scripts","functions.js"));
    
//    //--------Configure: Purchase Module-------------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
//    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Purchase...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Purchase...");
//    waitForObjectItem(":_orderNumGeneration_QComboBox", "Automatic");
//    if(findObject(":_orderNumGeneration_QComboBox").currentText!="Automatic")
//        type(":_orderNumGeneration_QComboBox", "Automatic");
//    type(":_nextPoNumber_XLineEdit", "<Ctrl+A>");
//    type(":_nextPoNumber_XLineEdit", "<Del>");
//    type(":_nextPoNumber_XLineEdit", "20000");
//    type(":_nextVcNumber_XLineEdit", "<Ctrl+A>");
//    type(":_nextVcNumber_XLineEdit", "<Del>");
//    type(":_nextVcNumber_XLineEdit", "30000");
//    if(findObject(":_prNumberGeneration_QComboBox").currentText!="Automatic")
//        type(":_prNumberGeneration_QComboBox", "Automatic");
//    type(":_nextPrNumber_XLineEdit", "<Ctrl+A>");
//    type(":_nextPrNumber_XLineEdit", "<Del>");
//    type(":_nextPrNumber_XLineEdit", "10000");
//    if(!findObject(":Default P/O Copies:.Vendor_QCheckBox").checked)
//        clickButton(":Default P/O Copies:.Vendor_QCheckBox");
//    if(findObject(":Default P/O Copies:.Internal_QCheckBox").checked)
//        clickButton(":Default P/O Copies:.Internal_QCheckBox");
//    if(!findObject(":Purchase Configuration.Post P/O Changes to the Change Log_QCheckBox"))
//        clickButton(":Purchase Configuration.Post P/O Changes to the Change Log_QCheckBox");
//    if(!findObject(":Purchase Configuration.Post Vendor Changes to the Change Log_QCheckBox"))
//        clickButton(":Purchase Configuration.Post Vendor Changes to the Change Log_QCheckBox");
//    if(!findObject(":Purchase Configuration.Use Earliest Avail. as Due Date for P/O Item_QCheckBox"))
//        clickButton(":Purchase Configuration.Use Earliest Avail. as Due Date for P/O Item_QCheckBox");
//    if(!findObject(":Purchase Configuration.Prevent P/O Items when no Std. Cost Exists_QCheckBox"))
//        clickButton(":Purchase Configuration.Prevent P/O Items when no Std. Cost Exists_QCheckBox");
//    if(!findObject(":Purchase Configuration.Check Print P/O on Save by Default_QCheckBox"))
//        clickButton(":Purchase Configuration.Check Print P/O on Save by Default_QCheckBox");
//    type(":_defaultShipVia_XLineEdit", "<Ctrl+A>");    
//    type(":_defaultShipVia_XLineEdit", "<Del>");
//    type(":_defaultShipVia_XLineEdit", "UPS Account 1234567");
//    clickButton(":Purchase Configuration.Save_QPushButton");
//    test.log("Purchase Module Configured");
//    
//    
//    //-------------Configure: Inventory Module---------------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
//    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Inventory...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Inventory...");
//    waitForObject(":Inventory Configuration.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":Inventory Configuration.qt_tabwidget_tabbar_QTabBar", "Shipping and Receiving");
//    waitForObject(":_nextShipmentNum_XLineEdit");
//    type(":_nextShipmentNum_XLineEdit", "<Ctrl+A>");
//    type(":_nextShipmentNum_XLineEdit", "<Del>");
//    type(":_nextShipmentNum_XLineEdit", "10000");
//    if(findObject(":tab_2.Disallow P/O Receipt of Qty greater than ordered_QCheckBox").checked)
//        clickButton(":tab_2.Disallow P/O Receipt of Qty greater than ordered_QCheckBox");
//    if(!findObject(":tab_2.Warn if P/O Receipt Qty differs from receivable Qty_QCheckBox").checked)
//        clickButton(":tab_2.Warn if P/O Receipt Qty differs from receivable Qty_QCheckBox");
//    type(":_tolerance_QLineEdit", "5");
//    type(":_shipformNumOfCopies_QSpinBox", "2");
//    doubleClickItem(":Default Shipping Form Copies:._shipformWatermarks_XTreeWidget", "Copy #1",5,5,0,Qt.LeftButton);
//    waitForObject(":Invoice/Credit Memo Watermark._watermark_XLineEdit");
//    type(":Invoice/Credit Memo Watermark._watermark_XLineEdit", "Customer");
//    if(!findObject(":Invoice/Credit Memo Watermark.Show Prices_QCheckBox").checked)
//        clickButton(":Invoice/Credit Memo Watermark.Show Prices_QCheckBox");
//    clickButton(":Invoice/Credit Memo Watermark.Save_QPushButton");
//    waitForObject(":Default Shipping Form Copies:._shipformWatermarks_XTreeWidget");
//    doubleClickItem(":Default Shipping Form Copies:._shipformWatermarks_XTreeWidget", "Copy #2",5,5,0,Qt.LeftButton);
//    waitForObject(":Invoice/Credit Memo Watermark._watermark_XLineEdit");
//    type(":Invoice/Credit Memo Watermark._watermark_XLineEdit", "Internal");
//    if(!findObject(":Invoice/Credit Memo Watermark.Show Prices_QCheckBox"))
//        clickButton(":Invoice/Credit Memo Watermark.Show Prices_QCheckBox");
//    clickButton(":Invoice/Credit Memo Watermark.Save_QPushButton");
//    
//    waitForObject(":Inventory Configuration.Save_QPushButton");
//    clickButton(":Inventory Configuration.Save_QPushButton");
//    test.log("Inventory Module configured");
//    
//    //---------Configure: Accounting-Account Payble---------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
//    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
//    waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
//    clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar", "Accounts Payable");
//    waitForObject(":_nextAPMemoNumber_XLineEdit");
//    type(":_nextAPMemoNumber_XLineEdit", "<Ctrl>");
//    type(":_nextAPMemoNumber_XLineEdit", "<Del>");
//    type(":_nextAPMemoNumber_XLineEdit", "39000");
//    clickButton(":Accounting Configuration.Save_QPushButton");
//    waitForObject(":Company ID Correct?.Yes_QPushButton");	
//    clickButton(":Company ID Correct?.Yes_QPushButton");
//    test.log("Account-Accounts Payable configured");
//    
//   
//    //----------Define Vendor types--------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Vendor");
//    activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Vendor");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Vendor_QMenu", "Types...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Vendor_QMenu", "Types...");
//    waitForObject(":List Vendor Types.New_QPushButton");
//    clickButton(":List Vendor Types.New_QPushButton");
//    waitForObject(":_code_XLineEdit_8");
//    type(":_code_XLineEdit_8", "STANDARD");
//    type(":_description_XLineEdit_18", "Standard Vendor");
//    clickButton(":Vendor Type.Save_QPushButton");
//    waitForObject(":List Vendor Types.Close_QPushButton");
//    clickButton(":List Vendor Types.Close_QPushButton");
//    test.log("Vendor type: STANDARD defined");
//    
//    
//    //---------Purchase: define Terms--------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
//    activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "Terms...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "Terms...");
//    waitForObject(":List Terms.New_QPushButton");
//    clickButton(":List Terms.New_QPushButton");
//    waitForObject(":_code_XLineEdit_9");
//    type(":_code_XLineEdit_9", "2-10N30");
//    type(":_description_XLineEdit_19", "2% Discount in 10 Days - Net 30 Days");
//    if(!findObject(":_typeGroup.Days_QRadioButton").checked)
//        clickButton(":_typeGroup.Days_QRadioButton");
//    if(!findObject(":Terms.Used in A/P_QCheckBox"))
//        clickButton(":Terms.Used in A/P_QCheckBox");
//    if(!findObject(":Terms.Used in A/R_QCheckBox"))
//        clickButton(":Terms.Used in A/R_QCheckBox");
//    type(":_dueDays_QSpinBox", "<Ctrl+A>");
//    type(":_dueDays_QSpinBox", "<Del>");
//    type(":_dueDays_QSpinBox", "30");
//    type(":_discountDays_QSpinBox", "<Ctrl+A>");
//    type(":_discountDays_QSpinBox", "<Del>");
//    type(":_discountDays_QSpinBox", "10");
//    type(":_discountPercent_XLineEdit", "<Ctrl+A>");
//    type(":_discountPercent_XLineEdit", "<Del>");
//    type(":_discountPercent_XLineEdit", "2");
//    waitForObject(":Terms.Save_QPushButton");
//    clickButton(":Terms.Save_QPushButton");
//    waitForObject(":List Terms.Close_QPushButton");
//    clickButton(":List Terms.Close_QPushButton");
//    test.log("Purchase: Terms defined");
//    
//    
//    
//    //-------------Define: Reject Codes-----------------
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
//    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
//    activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
//    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "Reject Codes...");
//    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "Reject Codes...");
//    
//    waitForObject(":List Reject Codes.New_QPushButton");
//    clickButton(":List Reject Codes.New_QPushButton");
//    waitForObject(":_code_XLineEdit_10");
//    type(":_code_XLineEdit_10", "PO-DAMAGED-RETURNED");
//    type(":_description_XLineEdit_20", "Damaged Purchased Material - Returned");
//    waitForObject(":Reject Code.Save_QPushButton");
//    clickButton(":Reject Code.Save_QPushButton");
//    
//    waitForObject(":List Reject Codes.New_QPushButton");
//    clickButton(":List Reject Codes.New_QPushButton");
//    waitForObject(":_code_XLineEdit_10");
//    type(":_code_XLineEdit_10", "PO-WRONG-RETURNED");
//    type(":_description_XLineEdit_20", "Wrong Purchased Product - Returned");
//    waitForObject(":Reject Code.Save_QPushButton");
//    clickButton(":Reject Code.Save_QPushButton");
// 
//    waitForObject(":List Reject Codes.Close_QPushButton");
//    clickButton(":List Reject Codes.Close_QPushButton");
//    test.log("Reject codes defined");
    
    //-----------Chart Of Accounts-------------------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
    
    COA("01","01","2000","01","Accounts Payable","Liability","AP");
    COA("01","01","1400","01","Prepaid Account - Purchasing","Asset","CAS");
    COA("01","01","4900","01","Promotions and Discounts Taken","Revenue","SI");
    COA("01","01","4050","01","State Sales Tax Revenue","Revenue","SO");
    COA("01","01","4060","01","Shipping Charges Revenue","Revenue","SO");
     
    waitForObject(":Chart of Accounts.Close_QPushButton_2");
    clickButton(":Chart of Accounts.Close_QPushButton_2");
    test.log("Chart of Accounts created");
    
    
    
    
    
}