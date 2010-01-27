function main()
{
    
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER");     
    var appEdition = findApplicationEdition();
    
    //--------Configure: Purchase Module-------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Purchase...");
        activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Purchase...");
        waitForObject(":_orderNumGeneration_QComboBox");
        if(findObject(":_orderNumGeneration_QComboBox").currentText!="Automatic")
            clickItem(":_orderNumGeneration_QComboBox", "Automatic",0,0,1,Qt.LeftButton);
        type(":_nextPoNumber_XLineEdit", "<Ctrl+A>");
        type(":_nextPoNumber_XLineEdit", "<Del>");
        type(":_nextPoNumber_XLineEdit", "20000");
        type(":_nextVcNumber_XLineEdit", "<Ctrl+A>");
        type(":_nextVcNumber_XLineEdit", "<Del>");
        type(":_nextVcNumber_XLineEdit", "30000");
        if(findObject(":_prNumberGeneration_QComboBox").currentText!="Automatic")
            type(":_prNumberGeneration_QComboBox", "Automatic");
        type(":_nextPrNumber_XLineEdit", "<Ctrl+A>");
        type(":_nextPrNumber_XLineEdit", "<Del>");
        type(":_nextPrNumber_XLineEdit", "10000");
        if(!findObject(":Default P/O Copies:.Vendor_QCheckBox").checked)
            clickButton(":Default P/O Copies:.Vendor_QCheckBox");
        if(findObject(":Default P/O Copies:.Internal_QCheckBox").checked)
            clickButton(":Default P/O Copies:.Internal_QCheckBox");
        if(!findObject(":Purchase Configuration.Post P/O Changes to the Change Log_QCheckBox"))
            clickButton(":Purchase Configuration.Post P/O Changes to the Change Log_QCheckBox");
        if(!findObject(":Purchase Configuration.Post Vendor Changes to the Change Log_QCheckBox"))
            clickButton(":Purchase Configuration.Post Vendor Changes to the Change Log_QCheckBox");
        if(!findObject(":Purchase Configuration.Use Earliest Avail. as Due Date for P/O Item_QCheckBox"))
            clickButton(":Purchase Configuration.Use Earliest Avail. as Due Date for P/O Item_QCheckBox");
        if(!findObject(":Purchase Configuration.Prevent P/O Items when no Std. Cost Exists_QCheckBox"))
            clickButton(":Purchase Configuration.Prevent P/O Items when no Std. Cost Exists_QCheckBox");
        if(!findObject(":Purchase Configuration.Check Print P/O on Save by Default_QCheckBox"))
            clickButton(":Purchase Configuration.Check Print P/O on Save by Default_QCheckBox");
        type(":_defaultShipVia_XLineEdit", "<Ctrl+A>");    
        type(":_defaultShipVia_XLineEdit", "<Del>");
        type(":_defaultShipVia_XLineEdit", "UPS Account 1234567");
        clickButton(":Purchase Configuration.Save_QPushButton");
        test.log("Purchase Module Configured");
    }catch(e){test.fail("Exception in configuring Product Module:"+e);}
    
    //-------------Configure: Inventory Module---------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        waitForObject(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu");
        activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Inventory...");
        waitForObject(":Inventory Configuration.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Inventory Configuration.qt_tabwidget_tabbar_QTabBar", "Shipping and Receiving");
        waitForObject(":_nextShipmentNum_XLineEdit");
        findObject(":_nextShipmentNum_XLineEdit").clear();
        type(":_nextShipmentNum_XLineEdit", "10000");
        if(findObject(":tab_2.Disallow P/O Receipt of Qty greater than ordered_QCheckBox").checked)
            clickButton(":tab_2.Disallow P/O Receipt of Qty greater than ordered_QCheckBox");
        if(!findObject(":tab_2.Warn if P/O Receipt Qty differs from receivable Qty_QCheckBox").checked)
            clickButton(":tab_2.Warn if P/O Receipt Qty differs from receivable Qty_QCheckBox");
        waitForObject(":_tolerance_QLineEdit");
        type(":_tolerance_QLineEdit", "5");
        findObject(":_shipformNumOfCopies_QSpinBox").clear();
        type(":_shipformNumOfCopies_QSpinBox", "2");
        snooze(2);
        doubleClickItem(":Default Shipping Form Copies:._shipformWatermarks_XTreeWidget", "Copy #1",5,5,0,Qt.LeftButton);
        waitForObject(":Invoice/Credit Memo Watermark._watermark_XLineEdit");
        type(":Invoice/Credit Memo Watermark._watermark_XLineEdit", "Customer");
        if(!findObject(":Invoice/Credit Memo Watermark.Show Prices_QCheckBox").checked)
            clickButton(":Invoice/Credit Memo Watermark.Show Prices_QCheckBox");
        clickButton(":Invoice/Credit Memo Watermark.Save_QPushButton");
        waitForObject(":Default Shipping Form Copies:._shipformWatermarks_XTreeWidget");
        doubleClickItem(":Default Shipping Form Copies:._shipformWatermarks_XTreeWidget", "Copy #2",5,5,0,Qt.LeftButton);
        waitForObject(":Invoice/Credit Memo Watermark._watermark_XLineEdit");
        type(":Invoice/Credit Memo Watermark._watermark_XLineEdit", "Internal");
        if(!findObject(":Invoice/Credit Memo Watermark.Show Prices_QCheckBox"))
            clickButton(":Invoice/Credit Memo Watermark.Show Prices_QCheckBox");
        clickButton(":Invoice/Credit Memo Watermark.Save_QPushButton");
        
        waitForObject(":Inventory Configuration.Save_QPushButton");
        clickButton(":Inventory Configuration.Save_QPushButton");
        test.log("Inventory Module configured");
    }catch(e){test.log("Exception in configuring Inventory module:"+e)}
    
    //---------Configure: Accounting-Account Payble---------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
        activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
        waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar", "Accounts Payable");
        waitForObject(":_nextAPMemoNumber_XLineEdit");
        type(":_nextAPMemoNumber_XLineEdit", "<Ctrl>");
        type(":_nextAPMemoNumber_XLineEdit", "<Del>");
        type(":_nextAPMemoNumber_XLineEdit", "39000");
        clickButton(":Accounting Configuration.Save_QPushButton");
        test.log("Account-Accounts Payable configured");
    }catch(e){test.fail("Exception in configuring Accounting"+e);}
    
    
    //----------Define Vendor types--------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Vendor");
        activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Vendor");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Vendor_QMenu", "Types...");
        activateItem(":xTuple ERP: OpenMFG Edition.Vendor_QMenu", "Types...");
        waitForObject(":List Vendor Types.New_QPushButton");
        clickButton(":List Vendor Types.New_QPushButton");
        waitForObject(":_code_XLineEdit_8");
        type(":_code_XLineEdit_8", "STANDARD");
        type(":_description_XLineEdit_18", "Standard Vendor");
        clickButton(":Vendor Type.Save_QPushButton");
        waitForObject(":List Vendor Types._vendtype_XTreeWidget");
        if(object.exists(":_vendtype.STANDARD_QModelIndex"))
            test.pass("Vendor Types Created: STANDARD");
        else test.fail("Vendor Types not Created: STANDARD");
        
        waitForObject(":List Vendor Types.Close_QPushButton");
        clickButton(":List Vendor Types.Close_QPushButton");
    }catch(e){test.fail("Exception in Defining Vendor types:"+e);}
    
    
    //---------Purchase: define Terms--------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "Terms...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "Terms...");
        
        waitForObject(":List Terms.New_QPushButton");
        clickButton(":List Terms.New_QPushButton");
        waitForObject(":_code_XLineEdit_9");
        type(":_code_XLineEdit_9", "2-10N30");
        type(":_description_XLineEdit_19", "2% Discount in 10 Days - Net 30 Days");
        if(!findObject(":_typeGroup.Days_QRadioButton").checked)
            clickButton(":_typeGroup.Days_QRadioButton");
        if(!findObject(":Terms.Used in A/P_QCheckBox").checked)
            clickButton(":Terms.Used in A/P_QCheckBox");
        if(!findObject(":Terms.Used in A/R_QCheckBox").checked)
            clickButton(":Terms.Used in A/R_QCheckBox");
        type(":_dueDays_QSpinBox", "<Ctrl+A>");
        type(":_dueDays_QSpinBox", "<Del>");
        type(":_dueDays_QSpinBox", "30");
        type(":_discountDays_QSpinBox", "<Ctrl+A>");
        type(":_discountDays_QSpinBox", "<Del>");
        type(":_discountDays_QSpinBox", "10");
        type(":_discountPercent_XLineEdit", "<Ctrl+A>");
        type(":_discountPercent_XLineEdit", "<Del>");
        type(":_discountPercent_XLineEdit", "2");
        waitForObject(":Terms.Save_QPushButton");
        clickButton(":Terms.Save_QPushButton");
        waitForObject(":List Terms._terms_XTreeWidget");
        if(object.exists(":_terms.2-10N30_QModelIndex"))
            test.pass("Terms Created: 2-10N30");
        else test.fail("Terms not created: 2-10N30");
        waitForObject(":List Terms.Close_QPushButton");
        clickButton(":List Terms.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Terms"+e);}
    
    //-------------Define: Reject Codes-----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "Reject Codes...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "Reject Codes...");
        
        waitForObject(":List Reject Codes.New_QPushButton");
        clickButton(":List Reject Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_10");
        type(":_code_XLineEdit_10", "PO-DAMAGED-RETURNED");
        type(":_description_XLineEdit_20", "Damaged Purchased Material - Returned");
        waitForObject(":Reject Code.Save_QPushButton");
    
        clickButton(":Reject Code.Save_QPushButton");
        waitForObject(":List Reject Codes._rjctcode_XTreeWidget");
        if(object.exists(":_rjctcode.PO-DAMAGED-RETURNED_QModelIndex"))
            test.pass("Reject Codes Created: PO-DAMAGED-RETURNED");
        else test.fail("Reject Codes not Created: PO-DAMAGED-RETURNED");
        
        
        waitForObject(":List Reject Codes.New_QPushButton");
        clickButton(":List Reject Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_10");
        type(":_code_XLineEdit_10", "PO-WRONG-RETURNED");
        type(":_description_XLineEdit_20", "Wrong Purchased Product - Returned");
        waitForObject(":Reject Code.Save_QPushButton");
        clickButton(":Reject Code.Save_QPushButton");
        waitForObject(":List Reject Codes._rjctcode_XTreeWidget");
        if(object.exists(":_rjctcode.PO-WRONG-RETURNED_QModelIndex"))
            test.pass("Reject Codes Created: PO-WRONG-RETURNED");
        else test.fail("Reject Codes Created: PO-WRONG-RETURNED");
        
        waitForObject(":List Reject Codes.Close_QPushButton");
        clickButton(":List Reject Codes.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Reject codes:"+e);}
    
    
    //-----------Chart Of Accounts-------------------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        
        COA("01","01","2000","01","Accounts Payable","Liability","AP");
        
        COA("01","01","1400","01","Prepaid Account - Purchasing","Asset","CAS");
        
        COA("01","01","4900","01","Promotions and Discounts Taken","Revenue","SI");
        
        COA("01","01","4060","01","Shipping Charges Revenue","Revenue","SO");
        
        waitForObject(":Chart of Accounts.Close_QPushButton_2");
        clickButton(":Chart of Accounts.Close_QPushButton_2");
    }catch(e){test.fail("Exception in defining Chart of Accounts:"+e);}
  
    
    //----------Purchase: A/P Account Assignments-----------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "A/P Account Assignments...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_6", "A/P Account Assignments...");
        
        waitForObject(":List A/P Account Assignments.New_QPushButton");
        clickButton(":List A/P Account Assignments.New_QPushButton");
        waitForObject(":_vendorTypeGroup.All Vendor Types:_QRadioButton");
        clickButton(":_vendorTypeGroup.All Vendor Types:_QRadioButton");
        type(":A/P Account Assignment._main_XLineEdit", "01-01-2000-01");
        type(":A/P Account Assignment._main_XLineEdit_2", "01-01-1400-01");
        type(":A/P Account Assignment._main_XLineEdit_3", "01-01-4900-01");
        type(":A/P Account Assignment._main_XLineEdit_3", "<Tab>");
        clickButton(":A/P Account Assignment.Save_QPushButton");
        waitForObject(":List A/P Account Assignments._apaccnt_XTreeWidget");
        
       if(object.exists(":_apaccnt.All_QModelIndex"))
            test.pass("Accounts(A/P) Assignment created for: All");
       else test.fail("Accounts(A/P) Assignment not created for: All");
        
        waitForObject(":List A/P Account Assignments.Close_QPushButton");
        clickButton(":List A/P Account Assignments.Close_QPushButton");
        
    }catch(e){test.fail("Exception in Assigning Accounts:"+e);}
    
    //--------------Create new Vendor-------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Vendor");
        activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Vendor");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Vendor_QMenu", "List...");
        activateItem(":xTuple ERP: OpenMFG Edition.Vendor_QMenu", "List...");
        
        waitForObject(":List Vendors.New_QPushButton");
        clickButton(":List Vendors.New_QPushButton");
        waitForObject(":_number_XLineEdit_4");
        findObject(":_number_XLineEdit_4").clear();
        type(":_number_XLineEdit_4", "TPARTS");
        if(findObject(":_vendtype_XComboBox").currentText!="STANDARD-Standard Vendor")
            clickItem(":_vendtype_XComboBox", "STANDARD-Standard Vendor",0,0,1,Qt.LeftButton);
        type(":_name_XLineEdit_8", "Toy Parts Inc");
        type(":_accountNumber_XLineEdit", "110022");
        if(findObject(":Default._defaultTerms_XComboBox").currentText!="2-10N30-2% Discount in 10 Days - Net 30 Days")
            clickItem(":Default._defaultTerms_XComboBox", "2-10N30-2% Discount in 10 Days - Net 30 Days",0,0,1,Qt.LeftButton);
        clickButton(":Default FOB.Receiving Site_QRadioButton");
        if(findObject(":_settingsGroup.Sells Purchase Order Items_QCheckBox").checked)
            clickButton(":_settingsGroup.Sells Purchase Order Items_QCheckBox");
        if(findObject(":_settingsGroup.Qualified_QCheckBox").checked)
            clickButton(":_settingsGroup.Qualified_QCheckBox");
        if(!findObject(":_settingsGroup.Check for matching Voucher and Purchase Order amounts_QCheckBox").checked)
            clickButton(":_settingsGroup.Check for matching Voucher and Purchase Order amounts_QCheckBox");
        if(findObject(":_settingsGroup.May only Sell Items defined by an Item Source_QCheckBox").checked)
            clickButton(":_settingsGroup.May only Sell Items defined by an Item Source_QCheckBox");
        clickTab(":Vendor.qt_tabwidget_tabbar_QTabBar", "Contacts");
        waitForObject(":_contact1Box._honorific_XComboBox");
        clickItem(":_contact1Box._honorific_XComboBox", "Mr",0,0,1,Qt.LeftButton);
        type(":_contact1Box._first_XLineEdit", "Ramesh");
        type(":_contact1Box._middle_XLineEdit", "K");
        type(":_contact1Box._last_XLineEdit", "Thapar");
        type(":_contact1Box._title_XLineEdit", "Senior Executive");
        type(":_contact1Box._phone_XLineEdit", "124645987");
        type(":_contact1Box._fax_XLineEdit", "435433434");
        type(":_contact1Box._email_XLineEdit", "thappar@testing.com");
        clickItem(":_contact2Box._honorific_XComboBox", "Miss",0,0,1,Qt.LeftButton);
        type(":_contact2Box._first_XLineEdit", "Sunita");
        type(":_contact2Box._middle_XLineEdit", "S");
        type(":_contact2Box._last_XLineEdit", "Bhaglani");
        type(":_contact2Box._title_XLineEdit", "Financial Advisor");
        type(":_contact2Box._phone_XLineEdit", "234533534");
        type(":_contact2Box._fax_XLineEdit", "5436735654");
        type(":_contact2Box._email_XLineEdit", "sunita@testing.com");
        clickTab(":Vendor.qt_tabwidget_tabbar_QTabBar", "Order Notes");
        waitForObject(":ponotesTab._poComments_QTextEdit");
        type(":ponotesTab._poComments_QTextEdit", "Default Vendor Notes From Vendor Master");
        waitForObject(":Vendor.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Vendor.qt_tabwidget_tabbar_QTabBar", "Addresses"); 
        waitForObject(":_addressStack.Street\nAddress:_XLineEdit");
        type(":_addressStack.Street\nAddress:_XLineEdit", "#522, Park Lane");
        type(":_addressStack.Street\nAddress:_XLineEdit_2", "Alpha Industries PVt ltd");
        type(":_addressStack.Street\nAddress:_XLineEdit_3", "Vengal Rao  Nagar");
        type(":_addressStack.City:_XLineEdit", "Kolkata");
        type(":_state_QLineEdit_4", "WB");
        waitForObject(":_addressStack.Postal Code:_XLineEdit");
        type(":_addressStack.Postal Code:_XLineEdit", "300838");
        clickItem(":_addressStack._country_XComboBox", "India", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Vendor.Save_QPushButton");
        clickButton(":Vendor.Save_QPushButton");
        snooze(2); //delay for allowing to save
        waitForObject(":List Vendors._vendor_XTreeWidget");
        if(object.exists(":_vendor.STANDARD_QModelIndex"))
            test.pass("Vendor created: TPARTS");
        else test.fail("Vendor not created: TPARTS");
        
        waitForObject(":List Vendors.Close_QPushButton");
        clickButton(":List Vendors.Close_QPushButton");
    }catch(e){test.fail("Exception in creating Vendor:"+e);}
    
    
    
    //------------Create Item Sources------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Item Source");
        activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Item Source");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item Source_QMenu", "List...");
        activateItem(":xTuple ERP: OpenMFG Edition.Item Source_QMenu", "List...");
        
        //----Item source for TBOX1--------------
        waitForObject(":_frame.New_QPushButton");
        clickButton(":_frame.New_QPushButton");
        waitForObject(":Item Source._itemNumber_ItemLineEdit");
        type(":Item Source._itemNumber_ItemLineEdit", "TBOX1");
        waitForObject(":_vendorGroup...._QPushButton_2");
        clickButton(":_vendorGroup...._QPushButton_2");
        waitForObject(":_listTab_XTreeWidget_3");
        doubleClickItem(":_listTab_XTreeWidget_3","TPARTS",0,0,0,Qt.LeftButton);
        waitForObject(":_venditemGroup._vendorItemNumber_XLineEdit_2");
        type(":_venditemGroup._vendorItemNumber_XLineEdit_2", "TPBOX01");
        type(":_vendorUOM_XLineEdit", "PCS");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        type(":_venditemGroup._minOrderQty_XLineEdit", "0");
        type(":_multOrderQty_XLineEdit", "1");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "1");
        type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
        type(":_venditemGroup._leadTime_QSpinBox", "1");
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
        
        waitForObject(":widget1.Add_QPushButton");
        clickButton(":widget1.Add_QPushButton");
        waitForObject(":_qtyBreak_XLineEdit");
        type(":_qtyBreak_XLineEdit", "0");
        type(":Item Source Price_XLineEdit", ".25");
        clickButton(":Item Source Price.Save_QPushButton");
        
        waitForObject(":widget1.Add_QPushButton");
        clickButton(":widget1.Add_QPushButton");
        waitForObject(":_qtyBreak_XLineEdit");
        type(":_qtyBreak_XLineEdit", "1000");
        type(":Item Source Price_XLineEdit", ".20");
        waitForObject(":Item Source Price.Save_QPushButton");
        clickButton(":Item Source Price.Save_QPushButton");
        
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Vendor Description");
        waitForObject(":tab._vendorItemDescrip_QTextEdit");
        type(":tab._vendorItemDescrip_QTextEdit", "ProDiem Box For Truck Type 1");
        waitForObject(":Item Source.Save_QPushButton");
        clickButton(":Item Source.Save_QPushButton");
        waitForObject(":_frame._itemsrc_XTreeWidget");
        if(object.exists("{column='0' container=':_frame._itemsrc_XTreeWidget' text='TBOX1' type='QModelIndex'}"))
            test.pass("Item Source created for: TBOX1");
        else test.fail("Item Source not created for: TBOX1");
        
    }catch(e){test.fail("Exception in defining Item sources for TBOX1:"+e);}
    
    //----Item source for TBODY1--------------
    try{
        waitForObject(":_frame.New_QPushButton");
        clickButton(":_frame.New_QPushButton");
        waitForObject(":Item Source._itemNumber_ItemLineEdit");
        type(":Item Source._itemNumber_ItemLineEdit", "TBODY1");
        waitForObject(":_vendorGroup...._QPushButton_2");
        clickButton(":_vendorGroup...._QPushButton_2");
        waitForObject(":_listTab_XTreeWidget_3");
        doubleClickItem(":_listTab_XTreeWidget_3","TPARTS",0,0,0,Qt.LeftButton);
        waitForObject(":_venditemGroup._vendorItemNumber_XLineEdit");
        type(":_venditemGroup._vendorItemNumber_XLineEdit", "TPBODY01");
        type(":_vendorUOM_XLineEdit", "PCS");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        type(":_venditemGroup._minOrderQty_XLineEdit", "0");
        type(":_multOrderQty_XLineEdit", "1");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "1");
        type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
        type(":_venditemGroup._leadTime_QSpinBox", "1");
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
        
        waitForObject(":widget1.Add_QPushButton");
        clickButton(":widget1.Add_QPushButton");
        waitForObject(":_qtyBreak_XLineEdit");
        type(":_qtyBreak_XLineEdit", "0");
        type(":Item Source Price_XLineEdit", "1");
        clickButton(":Item Source Price.Save_QPushButton");
        waitForObject(":Item Source.Save_QPushButton");
        clickButton(":Item Source.Save_QPushButton");
        waitForObject(":_frame._itemsrc_XTreeWidget");
         if(object.exists("{column='0' container=':_frame._itemsrc_XTreeWidget' text='TBODY1' type='QModelIndex'}"))
            test.pass("Item Source created for: TBODY1");
         else test.fail("Item source not created for TBODY1");
    }catch(e){test.fail("Exception in defining Item sources for TBODY1:"+e);}
    
    
    
    //----Item source for TINSERT1--------------
    try{
        waitForObject(":_frame.New_QPushButton");
        clickButton(":_frame.New_QPushButton");
        try {
            waitForObject(":Item Source._itemNumber_ItemLineEdit");
            type(":Item Source._itemNumber_ItemLineEdit", "TINSERT1");
            waitForObject(":_vendorGroup...._QPushButton_2");
            clickButton(":_vendorGroup...._QPushButton_2");
            waitForObject(":_listTab_XTreeWidget_3");
            doubleClickItem(":_listTab_XTreeWidget_3","TPARTS",0,0,0,Qt.LeftButton);
            
            type(":_venditemGroup._vendorItemNumber_XLineEdit", "TPINSERT01");
            type(":_vendorUOM_XLineEdit", "PCS");
            type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
            type(":_venditemGroup._minOrderQty_XLineEdit", "0");
            type(":_multOrderQty_XLineEdit", "1");
            type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
            type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
            type(":_venditemGroup._vendorRanking_QSpinBox", "1");
            type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
            type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
            type(":_venditemGroup._leadTime_QSpinBox", "1");
            waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
            
            waitForObject(":widget1.Add_QPushButton");
            clickButton(":widget1.Add_QPushButton");
            waitForObject(":_qtyBreak_XLineEdit");
            type(":_qtyBreak_XLineEdit", "0");
            type(":Item Source Price_XLineEdit", ".25");
            clickButton(":Item Source Price.Save_QPushButton");
            waitForObject(":Item Source.Save_QPushButton");
            clickButton(":Item Source.Save_QPushButton");
            waitForObject(":_frame._itemsrc_XTreeWidget");
             if(object.exists("{column='0' container=':_frame._itemsrc_XTreeWidget' text='TINSERT1' type='QModelIndex'}"))
                test.pass("Item Source created for: TINSERT1");
             else test.fail("Item Source not created for: TINSERT1");
        }
        catch (e) {
            test.fail("Exception creating item source for TINSERT1: " + e);
            try {
                waitForObject(":Item Source.Cancel_QPushButton");
                clickButton(":Item Source.Cancel_QPushButton");
            } catch(f) {
                waitForObject(":OK_QPushButton");
                clickButton(":OK_QPushButton");
                waitForObject(":Item Source.Cancel_QPushButton");
                clickButton(":Item Source.Cancel_QPushButton");
            }
        }
    }catch(e){test.fail("Exception in defining Item sources for TINSERT1:"+e);}
    
    
    //----Item source for TWHEEL1--------------
    try{
        waitForObject(":_frame.New_QPushButton");
        clickButton(":_frame.New_QPushButton");
        waitForObject(":Item Source._itemNumber_ItemLineEdit");
        type(":Item Source._itemNumber_ItemLineEdit", "TWHEEL1");
        waitForObject(":_vendorGroup...._QPushButton_2");
        clickButton(":_vendorGroup...._QPushButton_2");
        waitForObject(":_listTab_XTreeWidget_3");
        doubleClickItem(":_listTab_XTreeWidget_3","TPARTS",0,0,0,Qt.LeftButton);
        
        type(":_venditemGroup._vendorItemNumber_XLineEdit", "TPWHEEL01");
        type(":_vendorUOM_XLineEdit", "PCS");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        type(":_venditemGroup._minOrderQty_XLineEdit", "0");
        type(":_multOrderQty_XLineEdit", "1");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "1");
        type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
        type(":_venditemGroup._leadTime_QSpinBox", "1");
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
        
        waitForObject(":widget1.Add_QPushButton");
        clickButton(":widget1.Add_QPushButton");
        waitForObject(":_qtyBreak_XLineEdit");
        type(":_qtyBreak_XLineEdit", "0");
        type(":Item Source Price_XLineEdit", ".10");
        clickButton(":Item Source Price.Save_QPushButton");
        waitForObject(":Item Source.Save_QPushButton");
        clickButton(":Item Source.Save_QPushButton");
        waitForObject(":_frame._itemsrc_XTreeWidget");
          if(object.exists("{column='0' container=':_frame._itemsrc_XTreeWidget' text='TWHEEL1' type='QModelIndex'}"))
            test.pass("Item Source created for: TWHEEL1");
          else test.fail("Item Source not created for: TWHEEL1");
    }catch(e){test.fail("Exception in defining Item sources for TWHEEL1:"+e);}

    //----Item source for YPAINT1--------------
    try{
        waitForObject(":_frame.New_QPushButton");
        clickButton(":_frame.New_QPushButton");
        waitForObject(":Item Source._itemNumber_ItemLineEdit");
        type(":Item Source._itemNumber_ItemLineEdit", "YPAINT1");
        waitForObject(":_vendorGroup...._QPushButton_2");
        clickButton(":_vendorGroup...._QPushButton_2");
        waitForObject(":_listTab_XTreeWidget_3");
        doubleClickItem(":_listTab_XTreeWidget_3","TPARTS",0,0,0,Qt.LeftButton);
        
        type(":_venditemGroup._vendorItemNumber_XLineEdit", "TPPAINT01");
        type(":_vendorUOM_XLineEdit", "PCS");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        type(":_venditemGroup._minOrderQty_XLineEdit", "0");
        type(":_multOrderQty_XLineEdit", "1");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "1");
        type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
        type(":_venditemGroup._leadTime_QSpinBox", "1");
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
        
        waitForObject(":widget1.Add_QPushButton");
        clickButton(":widget1.Add_QPushButton");
        waitForObject(":_qtyBreak_XLineEdit");
        type(":_qtyBreak_XLineEdit", "0");
        type(":Item Source Price_XLineEdit", ".10");
        clickButton(":Item Source Price.Save_QPushButton");
        waitForObject(":Item Source.Save_QPushButton");
        clickButton(":Item Source.Save_QPushButton");
        waitForObject(":_frame._itemsrc_XTreeWidget");
        if(object.exists("{column='0' container=':_frame._itemsrc_XTreeWidget' text='YPAINT1' type='QModelIndex'}"))
            test.pass("Item Source created for: YPAINT1");
        else test.fail("Item Source not created for: YPAINT1");
        waitForObject(":List Item Sources.Close_QPushButton");
        clickButton(":List Item Sources.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Item sources for YPAINT1:"+e);}   
    
    
}
