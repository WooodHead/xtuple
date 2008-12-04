function executeChapter11()
{ 
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Authorities...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Authorities...");
    waitForObject(":List Tax Authorities.New_QPushButton");
    clickButton(":List Tax Authorities.New_QPushButton");
    waitForObject(":_code_XLineEdit_15");
    type(":_code_XLineEdit_15", "TAX-AUTH1");
    type(":_name_XLineEdit_22", "Virginia");
    type(":_extref_XLineEdit", "Smith");
    if(findObject(":_currency_XComboBox_2").currentText!= "USD - $")
        type(":_currency_XComboBox_2", "USD");
    type(":Tax Authority._county_QLineEdit", "United States");
    type(":Tax Authority.Street\nAddress:_XLineEdit", "Street Addr Line1");
    type(":Tax Authority.Street\nAddress:_XLineEdit_2", "Street addr line2");
    type(":Tax Authority.Street\nAddress:_XLineEdit_3", "Street Addr line3");
    type(":Tax Authority.City:_XLineEdit", "VA");
    type(":Tax Authority.State:_XComboBox", "State1");
    type(":Tax Authority.Postal Code:_XLineEdit", "323525");
    type(":Tax Authority.Country:_XComboBox", "United States");
    clickButton(":Tax Authority.Save_QPushButton");
    waitForObject(":List Tax Authorities._taxauth_XTreeWidget");
    if(!clickItem(":List Tax Authorities._taxauth_XTreeWidget", "TAX-AUTH1", 5, 5, 1, Qt.LeftButton))
        test.pass("Tax Authority created:TAX-AUTH1");
    
    waitForObject(":List Tax Authorities.Close_QPushButton");
    clickButton(":List Tax Authorities.Close_QPushButton");
    
  
  
    //----------Create: Tax Codes---------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Codes...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Codes...");
        
    waitForObject(":List Tax Codes.New_QPushButton");
    clickButton(":List Tax Codes.New_QPushButton");
    waitForObject(":_code_XLineEdit_12");
    type(":_code_XLineEdit_12", "TAXAUTH1-GM");
    type(":_description_XLineEdit_23", "Tax Authority 1 General Merchandise");
    type(":_taxRateA_XLineEdit", "10");
    type(":frame._main_XLineEdit", "01-01-4050-01");
    clickButton(":Tax Code.Save_QPushButton");
    waitForObject(":List Tax Codes._tax_XTreeWidget");
    if(!clickItem(":List Tax Codes._tax_XTreeWidget", "TAXAUTH1-GM", 5, 5, 1, Qt.LeftButton))
         test.pass("Tax Code created:TAXAUTH1-GM");
    
    
    waitForObject(":List Tax Codes.New_QPushButton");
    clickButton(":List Tax Codes.New_QPushButton");
    waitForObject(":_code_XLineEdit_12");
    type(":_code_XLineEdit_12", "TAXAUTH1-EDU");
    type(":_description_XLineEdit_23", "Tax Authority 1 Educational Merchandise");
    type(":_taxRateA_XLineEdit", "1");
    type(":frame._main_XLineEdit", "01-01-4050-01");
    clickButton(":Tax Code.Save_QPushButton");
    waitForObject(":List Tax Codes._tax_XTreeWidget");
    if(!clickItem(":List Tax Codes._tax_XTreeWidget", "TAXAUTH1-EDU", 5, 5, 1, Qt.LeftButton))
         test.pass("Tax Code created:TAXAUTH1-EDU");
    
    
    waitForObject(":List Tax Codes.Close_QPushButton");
    clickButton(":List Tax Codes.Close_QPushButton");
 
  
  
    //---------Create Tax Types--------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Types...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Types...");
    waitForObject(":List Tax Types.New_QPushButton_2");
    clickButton(":List Tax Types.New_QPushButton_2");
    waitForObject(":Tax Type._name_XLineEdit");
    type(":Tax Type._name_XLineEdit", "GM");
    type(":Tax Type._description_XLineEdit", "General Merchandise");
    clickButton(":Tax Type.Save_QPushButton");
    waitForObject(":List Tax Types._taxtype_XTreeWidget");
    if(!clickItem(":List Tax Types._taxtype_XTreeWidget", "GM", 5, 5, 1, Qt.LeftButton))
         test.pass("Tax Type created:GM");
    
   
    waitForObject(":List Tax Types.New_QPushButton_2");
    clickButton(":List Tax Types.New_QPushButton_2");
    waitForObject(":Tax Type._name_XLineEdit");
    type(":Tax Type._name_XLineEdit", "EDU");
    type(":Tax Type._description_XLineEdit", "Educational Material");
    clickButton(":Tax Type.Save_QPushButton");
    waitForObject(":List Tax Types._taxtype_XTreeWidget");
    if(!clickItem(":List Tax Types._taxtype_XTreeWidget", "EDU", 5, 5, 1, Qt.LeftButton))
         test.pass("Tax Type created:EDU");
    
    waitForObject(":List Tax Types.Close_QPushButton_2");
    clickButton(":List Tax Types.Close_QPushButton_2");
 
  
    
    //------------Create: Tax Selections--------------------
     waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Selections...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Selections...");
    
    waitForObject(":List Tax Selections.New_QPushButton_2");
    clickButton(":List Tax Selections.New_QPushButton_2");
    waitForObject(":_taxauth_XComboBox_4");
    type(":_taxauth_XComboBox_4", "TAX-AUTH1");
    type(":_taxtype_XComboBox_3", "GM");
    type(":_tax_XComboBox_2", "TAXAUTH1-GM");
    clickButton(":Tax Selection.Save_QPushButton");
    waitForObject(":List Tax Selections._taxsel_XTreeWidget");
    if(!clickItem(":List Tax Selections._taxsel_XTreeWidget", "TAXAUTH1-GM", 30, 9, 1, Qt.LeftButton))
        test.pass("Tax Selections done with:TAXAUTH1-GM");

    
    waitForObject(":List Tax Selections.New_QPushButton_2");
    clickButton(":List Tax Selections.New_QPushButton_2");
    waitForObject(":_taxauth_XComboBox_4");
    type(":_taxauth_XComboBox_4", "TAX-AUTH1");
    type(":_taxtype_XComboBox_3", "EDU");
    type(":_tax_XComboBox_2", "TAXAUTH1-EDU");
    clickButton(":Tax Selection.Save_QPushButton");
    waitForObject(":List Tax Selections._taxsel_XTreeWidget");
    if(!clickItem(":List Tax Selections._taxsel_XTreeWidget", "TAXAUTH1-EDU", 30, 9, 1, Qt.LeftButton))
        test.pass("Tax Selections done with:TAXAUTH1-EDU");
     
    waitForObject(":List Tax Selections.Close_QPushButton_2");
    clickButton(":List Tax Selections.Close_QPushButton_2");
  
    
    //----------Create: Tax Registrations--------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Registrations...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Registrations...");
    waitForObject(":List Tax Registrations.New_QPushButton_2");
    clickButton(":List Tax Registrations.New_QPushButton_2");
    waitForObject(":Tax Registration Information._taxauth_XComboBox");
    type(":Tax Registration Information._taxauth_XComboBox", "TAX-AUTH1");
    type(":Tax Registration Information._number_QLineEdit", "AUTH1-0101");
    clickButton(":Tax Registration Information.Save_QPushButton");
    waitForObject(":_taxreg_XTreeWidget");
    if(!clickItem(":_taxreg_XTreeWidget", "TAX-AUTH1", 5, 5, 1, Qt.LeftButton))
        test.pass("Tax Registrations done");
 
    waitForObject(":List Tax Registrations.Close_QPushButton_2");
    clickButton(":List Tax Registrations.Close_QPushButton_2");
   
    
    
    //----------------Associate Tax with Items-------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List...");
    waitForObject(":List Items._item_XTreeWidget_3");
    
    doubleClickItem(":List Items._item_XTreeWidget_3", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_4");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_4", "Tax Types");
    waitForObject(":_taxtypesTab.New_QPushButton_2");
    clickButton(":_taxtypesTab.New_QPushButton_2");
    waitForObject(":_taxauth_XComboBox_5");
    type(":_taxauth_XComboBox_5", "TAX-AUTH1");
    type(":_taxtype_XComboBox_4", "EDU");
    waitForObject(":Item Tax.Save_QPushButton");
    clickButton(":Item Tax.Save_QPushButton");
    waitForObject(":Item.Save_QPushButton_13");
    clickButton(":Item.Save_QPushButton_13");
    test.log("Item YTRUCK1 associated with Tax Type");
   
  
      
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_5");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_5", "Tax Types");
   
    waitForObject(":_taxtypesTab.New_QPushButton_3");
    clickButton(":_taxtypesTab.New_QPushButton_3");
    waitForObject(":_taxauth_XComboBox_5");
    type(":_taxauth_XComboBox_5", "TAX-AUTH1");
    type(":_taxtype_XComboBox_4", "GM");
    waitForObject(":Item Tax.Save_QPushButton");
    clickButton(":Item Tax.Save_QPushButton");
    waitForObject(":Item.Save_QPushButton_9");
    clickButton(":Item.Save_QPushButton_9");
     test.log("Item BTRUCK1 associated with Tax Type");
    
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "WTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_6");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_6", "Tax Types");
    waitForObject(":_taxtypesTab.New_QPushButton_5");
    clickButton(":_taxtypesTab.New_QPushButton_5");
    waitForObject(":_taxauth_XComboBox_5");
    type(":_taxauth_XComboBox_5", "TAX-AUTH1");
    type(":_taxtype_XComboBox_4", "GM");
    waitForObject(":Item Tax.Save_QPushButton");
    clickButton(":Item Tax.Save_QPushButton");
    waitForObject(":Item.Save_QPushButton_18");
    clickButton(":Item.Save_QPushButton_18");
    test.log("Item WTRUCK1 associated with Tax Type");
    
    waitForObject(":List Items._item_XTreeWidget_3");
    doubleClickItem(":List Items._item_XTreeWidget_3", "RTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Item.qt_tabwidget_tabbar_QTabBar_7");
    clickTab(":Item.qt_tabwidget_tabbar_QTabBar_7", "Tax Types");
    waitForObject(":_taxtypesTab.New_QPushButton_4");
    clickButton(":_taxtypesTab.New_QPushButton_4");
    waitForObject(":_taxauth_XComboBox_5");
    type(":_taxauth_XComboBox_5", "TAX-AUTH1");
    type(":_taxtype_XComboBox_4", "GM");
    waitForObject(":Item Tax.Save_QPushButton");
    clickButton(":Item Tax.Save_QPushButton");
    waitForObject(":Item.Save_QPushButton_8");
    clickButton(":Item.Save_QPushButton_8");
    test.log("Item RTRUCK1 associated with Tax Type");    
    
    waitForObject(":List Items.Close_QPushButton_3");
    clickButton(":List Items.Close_QPushButton_3");
    
    
    
  
  
     //---------Assign Tax Authority for Customer----------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
    activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "List...");
    activateItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "List...");
    waitForObject(":List Customers._cust_XTreeWidget_2");
    doubleClickItem(":List Customers._cust_XTreeWidget_2", "NORMAL", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Customer.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Customer.qt_tabwidget_tabbar_QTabBar", "Addresses");
    waitForObject(":tabAddresses.Ship To_QRadioButton");
    clickButton(":tabAddresses.Ship To_QRadioButton");
    
    waitForObject(":_addressStack._shipto_XTreeWidget_2");
    doubleClickItem(":_addressStack._shipto_XTreeWidget_2", "Old Towne Store 1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Ship-To._taxauth_XComboBox");
    type(":Ship-To._taxauth_XComboBox", "TAX-AUTH1");
    clickButton(":Ship-To.Save_QPushButton");
    
    waitForObject(":_addressStack._shipto_XTreeWidget_2");
    doubleClickItem(":_addressStack._shipto_XTreeWidget_2", "Old Towne Store 2", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Ship-To._taxauth_XComboBox");
    type(":Ship-To._taxauth_XComboBox", "TAX-AUTH1");
    clickButton(":Ship-To.Save_QPushButton");
    
    
    waitForObject(":Customer.Save_QPushButton");
    clickButton(":Customer.Save_QPushButton");
    waitForObject(":List Customers.Close_QPushButton_2");
    clickButton(":List Customers.Close_QPushButton_2");
    test.log("Tax Authority assigned for Customer: NORMAL");
    
}