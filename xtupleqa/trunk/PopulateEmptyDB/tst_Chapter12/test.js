function main()
{
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER");       
    var appEdition = findApplicationEdition();
    
    //---------Assign Tax Authority for Customer----------
    try{
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
        waitForObject(":_addressTab.Ship To_QRadioButton");
        clickButton(":_addressTab.Ship To_QRadioButton");
        
        waitForObject(":_addressStack._shipto_XTreeWidget_3");
        doubleClickItem(":_addressStack._shipto_XTreeWidget_3", "Old Towne Store 1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Ship-To._taxzone_XComboBox");
        clickItem(":Ship-To._taxzone_XComboBox", "TZONE1-Tax Zone1",0,0,1,Qt.LeftButton);
        waitForObject(":Ship-To.Save_QPushButton");
        clickButton(":Ship-To.Save_QPushButton");
        waitForObject(":_addressStack._shipto_XTreeWidget_3");
        doubleClickItem(":_addressStack._shipto_XTreeWidget_3", "Old Towne Store 2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Ship-To._taxzone_XComboBox");
        clickItem(":Ship-To._taxzone_XComboBox", "TZONE1-Tax Zone1",0,0,1,Qt.LeftButton);
        waitForObject(":Ship-To.Save_QPushButton");
        clickButton(":Ship-To.Save_QPushButton");
        waitForObject(":Customer.Save_QPushButton");
        clickButton(":Customer.Save_QPushButton");
        waitForObject(":List Customers.Close_QPushButton_2");
        clickButton(":List Customers.Close_QPushButton_2");
        test.log("Tax Authority assigned for Customer: NORMAL");
        test.log("--Empty database staged for further transactions--");
        
        //---execution completed - exit Application----
        exitAppl();	
    }catch(e){test.fail("Exception in assigning Tax Authority");}
}
