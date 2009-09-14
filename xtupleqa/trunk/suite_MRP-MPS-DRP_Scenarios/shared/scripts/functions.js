function QOHZero(item)
{
    //--------Reset the QOH of an Item to Zero--------
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Transactions");
    waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
    activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", item , 5, 5, 0, Qt.LeftButton);
    waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
    clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
    waitForObject(":_qtyGroup.*_XLabel");
    if(findObject(":_qtyGroup.*_XLabel").text!= "0.00")
    {
        type(":_qty_XLineEdit", "0");
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
        waitForObject(":Enter Miscellaneous Adjustment.Close_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Close_QPushButton");
        test.log("QOH of "+item+" adjusted to Zero");
    }
    else
    {
        clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        test.log("QOH of "+item+" is already Zero");
    }

}

function MRP(period)
{
    //--------Run MRP---------
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MRP");
    waitForObjectItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Run MRP_QMenu", "by Planner Code...");
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton");
    waitForObject(":_optionsGroup.XDateEdit_XDateEdit");
    type(":_optionsGroup.XDateEdit_XDateEdit", period);
    type(":_optionsGroup.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":Run MRP by Planner Code.Create_QPushButton");
    clickButton(":Run MRP by Planner Code.Create_QPushButton");
}


function MPS(period)
{
    //---------Run MPS----------
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Run MPS...");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "Run MPS...");
    waitForObject(":_warehouse.All Sites_QRadioButton_3");
    clickButton(":_warehouse.All Sites_QRadioButton_3");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_2");
    waitForObject(":Run MPS by Planner Code.XDateEdit_XDateEdit");
    type(":Run MPS by Planner Code.XDateEdit_XDateEdit", period);
    type(":Run MPS by Planner Code.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":Run MPS by Planner Code.Create_QPushButton");
    clickButton(":Run MPS by Planner Code.Create_QPushButton");

}


function DelPlanOrdrs()
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "Delete Planned Orders...");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "Delete Planned Orders...");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_4");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_4");
    waitForObject(":_warehouse.All Sites_QRadioButton_4");
    clickButton(":_warehouse.All Sites_QRadioButton_4");
    waitForObject(":_optionsGroup.XDateEdit_XDateEdit_2");
    type(":_optionsGroup.XDateEdit_XDateEdit_2", "+999");
    type(":_optionsGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Planning System.MPS and MRP_QRadioButton");
    clickButton(":Planning System.MPS and MRP_QRadioButton");
    if(!findObject(":_optionsGroup.Delete Firmed Orders_QCheckBox").checked)
        clickButton(":_optionsGroup.Delete Firmed Orders_QCheckBox");
    if(!findObject(":_optionsGroup.Delete Child Orders_QCheckBox").checked)
        clickButton(":_optionsGroup.Delete Child Orders_QCheckBox");
    waitForObject(":Delete Planned Orders by Planner Code.Delete_QPushButton");
    clickButton(":Delete Planned Orders by Planner Code.Delete_QPushButton");
}

function SetPlng(item, plng)
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    waitForObject(":List Item Sites.List Item Sites_QWorkspaceTitleBar");
    
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", item, 0, 0, 0, Qt.LeftButton);
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    waitForObject(":Scheduling._planningType_XComboBox");
    if(findObject(":Scheduling._planningType_XComboBox").currentText!=plng)
        clickItem(":Scheduling._planningType_XComboBox", plng, 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
}


function DelAllPO()
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    if(findObject(":List Unposted Purchase Orders._pohead_XTreeWidget").topLevelItemCount>0)
    {
        waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
        type(":List Unposted Purchase Orders._pohead_XTreeWidget","<Space>");
    }
       
    while(findObject(":List Unposted Purchase Orders._pohead_XTreeWidget").topLevelItemCount>0)
    {
        waitForObject(":List Unposted Purchase Orders.Delete_QPushButton");
        clickButton(":List Unposted Purchase Orders.Delete_QPushButton");
        waitForObject(":List Unposted Purchase Orders.Yes_QPushButton");
        clickButton(":List Unposted Purchase Orders.Yes_QPushButton");
        snooze(0.5); //delay allowed to delete
        waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
        type(":List Unposted Purchase Orders._pohead_XTreeWidget","<Down>");
    
    }
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");

}

function CheckSaleable(item)
{
    //---Check in Item Master if the item is Saleable and Not Exclusive-----
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products");
    activateItem(":xTuple ERP:*_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
    activateItem(":xTuple ERP:*.Products_QMenu", "Item");
    waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item_QMenu", "List...");
    
    waitForObject(":List Items._item_XTreeWidget");
    doubleClickItem(":List Items._item_XTreeWidget", item, 0, 0, 0, Qt.LeftButton);
    waitForObject(":Item.Item is Sold_QGroupBox");
    if(!findObject(":Item.Item is Sold_QGroupBox").checked)
        mouseClick(":Item.Item is Sold_QGroupBox", 0, 0, 1, Qt.LeftButton);
    if(findObject(":Item is Sold.Exclusive_QCheckBox").checked)
        clickButton(":Item is Sold.Exclusive_QCheckBox");
    waitForObject(":Item.Save_QPushButton");
    clickButton(":Item.Save_QPushButton");
    waitForObject(":List Items.Close_QPushButton");
    clickButton(":List Items.Close_QPushButton");
    
    
    //---Check in the Item site if the Item is Saleable from the site---
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    activateItem(":xTuple ERP:*.Item Site_QMenu", "List...");
    
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", item, 0, 0, 0, Qt.LeftButton);
    waitForObject(":List Item Sites.Sold from this Site_QGroupBox");
    if(!findObject(":List Item Sites.Sold from this Site_QGroupBox").checked)
        mouseClick(":List Item Sites.Sold from this Site_QGroupBox", 0, 0, 1, Qt.LeftButton);
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");

}

function NewSO(item, quant)
{

    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame.New_QPushButton");
    clickButton(":frame.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton");
    clickButton(":_headerPage...._QPushButton");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 44, 15, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", item, 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", quant);
    type(":_qtyOrdered_XLineEdit", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "0");
    type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":Sales Order.Save_QPushButton");
    clickButton(":Sales Order.Save_QPushButton");
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":Sales Order.Cancel_QPushButton");
    clickButton(":Sales Order.Cancel_QPushButton");
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");

}

function DelAllSO()
{
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "admin");
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "zenx2plE");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame._so_XTreeWidget");
    if(findObject(":frame._so_XTreeWidget").topLevelItemCount>0)
    {
        type(":frame._so_XTreeWidget","<Space>");
        waitForObject(":frame.Delete_QPushButton");
        clickButton(":frame.Delete_QPushButton");
        waitForObject(":List Open Sales Orders.Yes_QPushButton");
        clickButton(":List Open Sales Orders.Yes_QPushButton");
    }
    while(findObject(":frame._so_XTreeWidget").topLevelItemCount>0)
    {
        waitForObject(":frame._so_XTreeWidget");
        type(":frame._so_XTreeWidget","<Down>");
        waitForObject(":frame.Delete_QPushButton");
        clickButton(":frame.Delete_QPushButton");
        waitForObject(":List Open Sales Orders.Yes_QPushButton");
        clickButton(":List Open Sales Orders.Yes_QPushButton");
    
    }
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");

    
}

function SetQtyScrp(item, qty, scrap)
{
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products");
    activateItem(":xTuple ERP:*_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
    activateItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials");
    waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
    activateItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List...");
    
    waitForObject(":Bills of Materials._bom_XTreeWidget");
    doubleClickItem(":Bills of Materials._bom_XTreeWidget", "TSUB1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":frame_2._bomitem_XTreeWidget");
    doubleClickItem(":frame_2._bomitem_XTreeWidget", item, 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyPer_XLineEdit");
    if(findObject(":_qtyPer_XLineEdit").text!=qty)
    {
        findObject(":_qtyPer_XLineEdit").clear();
        type(":_qtyPer_XLineEdit",qty)
    }
    waitForObject(":_scrap_XLineEdit");
    if(findObject(":_scrap_XLineEdit").text!=scrap)
    {
        findObject(":_scrap_XLineEdit").clear();
        type(":_scrap_XLineEdit",scrap);
    }    
    waitForObject(":Bill of Materials.Save_QPushButton");
    clickButton(":Bill of Materials.Save_QPushButton");
    waitForObject(":Bill of Materials.Save_QPushButton_2");
    clickButton(":Bill of Materials.Save_QPushButton_2");
    waitForObject(":Bills of Materials.Close_QPushButton");
    clickButton(":Bills of Materials.Close_QPushButton");

}


function NewWO(item,quant,leadd, ddate)
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    
    waitForObject(":_itemGroup...._QPushButton_3");
    clickButton(":_itemGroup...._QPushButton_3");
    waitForObject(":_itemGroup.Make Items Only_QCheckBox");
    if(!findObject(":_itemGroup.Make Items Only_QCheckBox").checked)        
        clickButton(":_itemGroup.Make Items Only_QCheckBox");
    waitForObject(":_itemGroup.Buy Items Only_QCheckBox");
    if(!findObject(":_itemGroup.Buy Items Only_QCheckBox").checked)
        clickButton(":_itemGroup.Buy Items Only_QCheckBox");
    waitForObject(":_item_XTreeWidget_3");
    doubleClickItem(":_item_XTreeWidget_3", item, 0, 0, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", quant);
    waitForObject(":_itemGroup._warehouse_WComboBox");
    if(findObject(":_itemGroup._warehouse_WComboBox").currentText!="WH1")
        clickItem(":_itemGroup._warehouse_WComboBox", "WH1", 0, 0, 1, Qt.LeftButton);
    waitForObject(":_schedGroup._leadTime_QSpinBox");
    findObject(":_schedGroup._leadTime_QSpinBox").clear();
    type(":_schedGroup._leadTime_QSpinBox", leadd);
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", ddate);
    type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Work Order.Save_QPushButton");
    clickButton(":Work Order.Save_QPushButton");

}
