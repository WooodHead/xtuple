function main()
{
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "admin");
    type(":_username_QLineEdit", "<Tab>");
    type(":_password_QLineEdit", "zenx2plE");
    type(":_password_QLineEdit", "<Return>");
    
    //---Checking Inventory Items---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Products_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Bills of Materials");
    activateItem(":xTuple ERP:*.Reports_QMenu", "Bills of Materials");
    waitForObjectItem(":xTuple ERP:*.Bills of Materials_QMenu", "Indented...");
    activateItem(":xTuple ERP:*.Bills of Materials_QMenu", "Indented...");
    waitForObject(":Indented Bill of Materials._itemNumber_ItemLineEdit_2");
    type(":Indented Bill of Materials._itemNumber_ItemLineEdit_2", "ytruck1");
    waitForObject(":Indented Bill of Materials.Query_QPushButton_2");
    clickButton(":Indented Bill of Materials.Query_QPushButton_2");
    waitForObject(":Indented Bill of Materials.Close_QPushButton_2");
    clickButton(":Indented Bill of Materials.Close_QPushButton_2");
    
    //---Update Actual Costs---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
    activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Update Actual Costs");
    activateItem(":xTuple ERP:*.Costing_QMenu", "Update Actual Costs");
    waitForObjectItem(":xTuple ERP:*.Update Actual Costs_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Update Actual Costs_QMenu", "by Item...");
    waitForObject(":Update Actual Costs by Item._itemNumber_ItemLineEdit");
    type(":Update Actual Costs by Item._itemNumber_ItemLineEdit", "tkit1");
    waitForObject(":Update Actual Costs by Item._itemNumber_ItemLineEdit");
    type(":Update Actual Costs by Item._itemNumber_ItemLineEdit", "<Tab>");
    waitForObject(":Update Actual Costs by Item.Select all Costs_QPushButton");
    clickButton(":Update Actual Costs by Item.Select all Costs_QPushButton");
    waitForObject(":Update Actual Costs by Item.Roll Up Actual Costs_QCheckBox");
    clickButton(":Update Actual Costs by Item.Roll Up Actual Costs_QCheckBox");
    waitForObject(":Update Actual Costs by Item.Update_QPushButton");
    clickButton(":Update Actual Costs by Item.Update_QPushButton");
    waitForObject(":Update Actual Costs by Item.Close_QPushButton");
    clickButton(":Update Actual Costs by Item.Close_QPushButton");
    
    //---Post Actual Costs by Item---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
    activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
    activateItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
    waitForObjectItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Item...");
    waitForObject(":Post Actual Costs by Item._itemNumber_ItemLineEdit");
    type(":Post Actual Costs by Item._itemNumber_ItemLineEdit", "tkit1");
    waitForObject(":Post Actual Costs by Item._itemNumber_ItemLineEdit");
    type(":Post Actual Costs by Item._itemNumber_ItemLineEdit", "<Tab>");
    waitForObject(":Post Actual Costs by Item.Select all Costs_QPushButton");
    clickButton(":Post Actual Costs by Item.Select all Costs_QPushButton");
    waitForObject(":Post Actual Costs by Item.Roll Up Standard Costs_QCheckBox");
    clickButton(":Post Actual Costs by Item.Roll Up Standard Costs_QCheckBox");
    waitForObject(":Post Actual Costs by Item.Post_QPushButton");
    clickButton(":Post Actual Costs by Item.Post_QPushButton");
    waitForObject(":Post Actual Costs by Item.Close_QPushButton");
    clickButton(":Post Actual Costs by Item.Close_QPushButton");
    
    //---Post Standard Costs by Item---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
    activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Post Standard Costs");
    activateItem(":xTuple ERP:*.Costing_QMenu", "Post Standard Costs");
    waitForObjectItem(":xTuple ERP:*.Post Standard Costs_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Post Standard Costs_QMenu", "by Item...");
    waitForObject(":Update Standard Costs By Item._itemNumber_ItemLineEdit");
    type(":Update Standard Costs By Item._itemNumber_ItemLineEdit", "tkit1");
    waitForObject(":Update Standard Costs By Item._itemNumber_ItemLineEdit");
    type(":Update Standard Costs By Item._itemNumber_ItemLineEdit", "<Tab>");
    waitForObject(":Update Standard Costs By Item.Select all Costs_QPushButton");
    clickButton(":Update Standard Costs By Item.Select all Costs_QPushButton");
    waitForObject(":Update Standard Costs By Item.Roll Up Standard Costs_QCheckBox");
    clickButton(":Update Standard Costs By Item.Roll Up Standard Costs_QCheckBox");
    waitForObject(":Update Standard Costs By Item.Update_QPushButton");
    clickButton(":Update Standard Costs By Item.Update_QPushButton");
    waitForObject(":Update Standard Costs By Item.Close_QPushButton");
    clickButton(":Update Standard Costs By Item.Close_QPushButton");
    
    //---Creating a Quote---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Quote");
    waitForObjectItem(":xTuple ERP:*.Quote_QMenu", "New...");
    activateItem(":xTuple ERP:*.Quote_QMenu", "New...");
    waitForObject(":_headerPage._customerNumber_CLineEdit");
    type(":_headerPage._customerNumber_CLineEdit", "ttoys");
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup._itemNumber_ItemLineEdit");
    type(":_itemGroup._itemNumber_ItemLineEdit", "ytruck1");
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "25");
    waitForObject(":_amountGroup. ... _QPushButton");
    clickButton(":_amountGroup. ... _QPushButton");
    waitForObject(":_price_XTreeWidget");
    doubleClickItem(":_price_XTreeWidget", "USD - $_3", 18, 9, 0, Qt.LeftButton);
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+8");
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
    waitForObject(":Quote.Close_QPushButton");
    clickButton(":Quote.Close_QPushButton");
    waitForObject(":Quote.Save_QPushButton_2");
    clickButton(":Quote.Save_QPushButton_2");
    waitForObject(":Quote.Cancel_QPushButton");
    clickButton(":Quote.Cancel_QPushButton");
    
    //---Creating a Sales Order---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu_2", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu_2", "New...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu_2", "New...");
    waitForObject(":_headerPage._customerNumber_CLineEdit_2");
    mouseClick(":_headerPage._customerNumber_CLineEdit_2", 82, 11, 1, Qt.LeftButton);
    waitForObject(":_headerPage._customerNumber_CLineEdit_2");
    type(":_headerPage._customerNumber_CLineEdit_2", "ttoys");
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":_itemGroup._itemNumber_ItemLineEdit_2");
    type(":_itemGroup._itemNumber_ItemLineEdit_2", "ytruck1"); 
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "10");
    waitForObject(":_amountGroup. ... _QPushButton_2");
    clickButton(":_amountGroup. ... _QPushButton_2");
    waitForObject(":_price_XTreeWidget_2");
    doubleClickItem(":_price_XTreeWidget_2", "USD - $_3", 0, 12, 0, Qt.LeftButton);
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "+7");  
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+8"); 
    waitForObject(":Sales Order.Save_QPushButton");
    clickButton(":Sales Order.Save_QPushButton");
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":Sales Order.Cancel_QPushButton");
    clickButton(":Sales Order.Cancel_QPushButton");
    
    //---Schedule---
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
    waitForObjectItem(":_warehouse._warehouses_WComboBox", "WH1");
    clickItem(":_warehouse._warehouses_WComboBox", "WH1", 39, 7, 1, Qt.LeftButton);
    waitForObject(":Run MRP by Planner Code.XDateEdit_XDateEdit");
    type(":Run MRP by Planner Code.XDateEdit_XDateEdit", "+30");
    waitForObject(":Run MRP by Planner Code.Create_QPushButton");
    clickButton(":Run MRP by Planner Code.Create_QPushButton");




}
