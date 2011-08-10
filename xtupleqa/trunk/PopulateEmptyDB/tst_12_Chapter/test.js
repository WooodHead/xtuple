function main()
{
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER");   
    waitForObject(":Cancel.Yes_QPushButton");
    clickButton(":Cancel.Yes_QPushButton");
    var appEdition = findApplicationEdition();
    
    //---------Assign Tax Authority for Customer----------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP: OpenMFG Edition.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "List...");
        activateItem(":xTuple ERP: OpenMFG Edition.Customer_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_5");
        doubleClickItem(":_list_XTreeWidget_5", "NORMAL", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Customer.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Customer.qt_tabwidget_tabbar_QTabBar", "Addresses");
        waitForObject(":_addressTab.Ship To_QRadioButton");
        clickButton(":_addressTab.Ship To_QRadioButton");
        
        waitForObject(":_addressStack._shipto_XTreeWidget_3");
        doubleClickItem(":_addressStack._shipto_XTreeWidget_3", "Old Towne Store 1", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Ship-To._taxzone_XComboBox");
        clickItem(":Ship-To._taxzone_XComboBox", "TZONE1-Tax Zone1",0,0,1,Qt.LeftButton);
        snooze(1);
        
        waitForObject(":Ship-To.Save_QPushButton");
        clickButton(":Ship-To.Save_QPushButton");
        waitForObject(":_addressStack._shipto_XTreeWidget_3");
        doubleClickItem(":_addressStack._shipto_XTreeWidget_3", "Old Towne Store 2", 5, 5, 0, Qt.LeftButton);
        waitForObject(":Ship-To._taxzone_XComboBox");
        clickItem(":Ship-To._taxzone_XComboBox", "TZONE1-Tax Zone1",0,0,1,Qt.LeftButton);
        snooze(1);
        waitForObject(":Ship-To.Save_QPushButton");
        clickButton(":Ship-To.Save_QPushButton");
        waitForObject(":Customer.Save_QPushButton");
        clickButton(":Customer.Save_QPushButton");
        
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
        test.log("Tax Authority assigned for Customer: NORMAL");
        test.log("--Empty database staged for further transactions--");
        
        //---execution completed - exit Application----
        exitAppl();	
    }catch(e){test.fail("Exception in assigning Tax Authority"+ e);}
}
