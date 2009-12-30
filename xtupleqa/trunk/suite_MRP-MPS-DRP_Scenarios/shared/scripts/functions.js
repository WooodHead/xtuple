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
        waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        test.log("QOH of "+item+" is already Zero");
    }

}

function QOHZeroWh(item,wh)
{
    //--------Reset the QOH of an Item within a Warehouse specified to Zero--------
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
    waitForObject(":_warehouse_WComboBox_4");
    if(findObject(":_warehouse_WComboBox_4").currentText!=wh)
        type(":_warehouse_WComboBox_4",wh);
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
        waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        test.log("QOH of "+item+" is already Zero");
    }

}




function UpdateQOH(item, quant)
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
    var qnt = quant +".00";
    var existing_quant = findObject(":_qtyGroup.*_XLabel").text;
    existing_quant = replaceSubstring(existing_quant.latin1(),",","");
    if(existing_quant!=qnt)
    {
        type(":_qty_XLineEdit", qnt);
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
        snooze(2); //wait to check for lot allocation
        if(object.exists(":_itemGroup.*_QLabel"))
        {
            waitForObject(":_lotSerial_QLineEdit");
            type(":_lotSerial_QLineEdit", "1");
            waitForObject(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit");
            var lot_quant = findObject(":_itemGroup.*_QLabel").text;
            lot_quant = replaceSubstring(lot_quant.latin1(),",","");
            type(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit", lot_quant);
            waitForObject(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit");
            type(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit", "+30");
            waitForObject(":Enter Miscellaneous Adjustment.Assign_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Assign_QPushButton");
            waitForObject(":Enter Miscellaneous Adjustment.Assign_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Assign_QPushButton");
            
        }
       
        waitForObject(":Enter Miscellaneous Adjustment.Close_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Close_QPushButton");
        test.log("Update the Quantity of "+item+"to "+quant);
    }
    else
    {
        waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        test.log("QOH of "+item+" is already "+quant);
    }

    test.log("QOH of "+item+" adjusted to "+quant);
}

function UpdateQOHWh(item, quant,wh)
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
    waitForObject(":_warehouse_WComboBox_4");
    clickItem(":_warehouse_WComboBox_4", wh, 0, 0, 1, Qt.LeftButton);
    waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
    clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
    waitForObject(":_qtyGroup.*_XLabel");
    var qnt = quant +".00";
    var existing_quant = findObject(":_qtyGroup.*_XLabel").text;
    existing_quant = replaceSubstring(existing_quant.latin1(),",","");
    if(existing_quant!=qnt)
    {
        type(":_qty_XLineEdit", qnt);
        waitForObject(":Enter Miscellaneous Adjustment.Post_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Post_QPushButton");
        snooze(2); //wait to check for lot allocation
        if(object.exists(":_itemGroup.*_QLabel"))
        {
            waitForObject(":_lotSerial_QLineEdit");
            type(":_lotSerial_QLineEdit", "1");
            waitForObject(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit");
            var lot_quant = findObject(":_itemGroup.*_QLabel").text;
            lot_quant = replaceSubstring(lot_quant.latin1(),",","");
            type(":Enter Miscellaneous Adjustment._qtyToAssign_XLineEdit", lot_quant);
            waitForObject(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit");
            type(":Enter Miscellaneous Adjustment.XDateEdit_XDateEdit", "+30");
            waitForObject(":Enter Miscellaneous Adjustment.Assign_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Assign_QPushButton");
            waitForObject(":Enter Miscellaneous Adjustment.Assign_QPushButton");
            clickButton(":Enter Miscellaneous Adjustment.Assign_QPushButton");
            
        }
       
        waitForObject(":Enter Miscellaneous Adjustment.Close_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Close_QPushButton");
        test.log("Update the Quantity of "+item+"to "+quant);
    }
    else
    {
        waitForObject(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        clickButton(":Enter Miscellaneous Adjustment.Cancel_QPushButton");
        test.log("QOH of "+item+" is already "+quant);
    }

    test.log("QOH of "+item+" adjusted to "+quant);
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
    test.log("MRP run for period of "+period+" days");

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
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_5");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_2");
    waitForObject(":Run MPS by Planner Code.XDateEdit_XDateEdit");
    type(":Run MPS by Planner Code.XDateEdit_XDateEdit", period);
    type(":Run MPS by Planner Code.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":Run MPS by Planner Code.Create_QPushButton");
    clickButton(":Run MPS by Planner Code.Create_QPushButton");
    test.log("MPS run for period of "+period+" days");    

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
    test.log("All Planned Orders deleted");
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
    test.log("Planning for Item:"+item+" set to "+plng);
}


function newPO(item, quant, ddate)    
{
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    waitForObject(":List Unposted Purchase Orders.New_QPushButton");
    clickButton(":List Unposted Purchase Orders.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton_3");
    clickButton(":_headerPage...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TPARTS", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":groupBox_2...._QPushButton");
    clickButton(":groupBox_2...._QPushButton");
    waitForObject(":groupBox_2.Buy Items Only_QCheckBox");
    if(findObject(":groupBox_2.Buy Items Only_QCheckBox").checked)
        clickButton(":groupBox_2.Buy Items Only_QCheckBox");
    waitForObject(":groupBox_2.Make Items Only_QCheckBox");
    if(findObject(":groupBox_2.Make Items Only_QCheckBox").checked)
        clickButton(":groupBox_2.Make Items Only_QCheckBox");
    waitForObject(":_item_XTreeWidget_7");
    doubleClickItem(":_item_XTreeWidget_7", item, 0, 0, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", quant);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    findObject(":_schedGroup.XDateEdit_XDateEdit_3").clear();
    type(":_schedGroup.XDateEdit_XDateEdit_3", "0");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "<Tab>");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    snooze(2);
    if(object.exists(":Purchase Order.Continue_QPushButton"))
        clickButton(":Purchase Order.Continue_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton_2");
    clickButton(":Purchase Order.Save_QPushButton_2");
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
    test.log("new Purchase Order created");

}


function newPOWh(item, quant, ddate,Wh)    
{
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Unposted...");
    waitForObject(":List Unposted Purchase Orders.New_QPushButton");
    clickButton(":List Unposted Purchase Orders.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton_3");
    clickButton(":_headerPage...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TPARTS", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":groupBox_2...._QPushButton");
    clickButton(":groupBox_2...._QPushButton");
    waitForObject(":groupBox_2.Buy Items Only_QCheckBox");
    if(findObject(":groupBox_2.Buy Items Only_QCheckBox").checked)
        clickButton(":groupBox_2.Buy Items Only_QCheckBox");
    waitForObject(":groupBox_2.Make Items Only_QCheckBox");
    if(findObject(":groupBox_2.Make Items Only_QCheckBox").checked)
        clickButton(":groupBox_2.Make Items Only_QCheckBox");
    waitForObject(":_item_XTreeWidget_7");
    doubleClickItem(":_item_XTreeWidget_7", item, 0, 0, 0, Qt.LeftButton);
    waitForObject(":groupBox_2._warehouse_WComboBox");
    if(findObject(":groupBox_2._warehouse_WComboBox").currentText!=Wh)
        clickItem(":groupBox_2._warehouse_WComboBox", Wh, 0, 0, 1, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", quant);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    findObject(":_schedGroup.XDateEdit_XDateEdit_3").clear();
    type(":_schedGroup.XDateEdit_XDateEdit_3", "0");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "<Tab>");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton_2");
    clickButton(":Purchase Order.Save_QPushButton_2");
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
    test.log("new Purchase Order created");

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
    test.log("Deleted All Purchase Orders");

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

    test.log("check Saleable checkbox for Item:"+ item);
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
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 0, 0, 0, Qt.LeftButton);
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
    test.log("new Sales Order created");

}

function NewSOWh(item, quant, Wh)
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
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", item, 0, 0, 0, Qt.LeftButton);
    waitForObjectItem(":_warehouse_WComboBox_5", Wh);
    clickItem(":_warehouse_WComboBox_5", Wh, 0, 0, 1, Qt.LeftButton);
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
    test.log("new Sales Order created");

}


function DelAllSO()
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
    activateItem(":xTuple ERP:*_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP:*.Sales Order_QMenu", "List Open...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_5");
    clickButton(":_warehouse.All Sites_QRadioButton_5");

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
        type(":frame._so_XTreeWidget","<Space>");
        waitForObject(":frame.Delete_QPushButton");
        clickButton(":frame.Delete_QPushButton");
        waitForObject(":List Open Sales Orders.Yes_QPushButton");
        clickButton(":List Open Sales Orders.Yes_QPushButton");
    
    }
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    test.log("Deleted All Sales Order");
    
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
    test.log("Scrap Quantity set for Item:"+item);
}


function NewWO(item, quant,leadd, ddate)
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
    test.log("new Work Order created");

}
function NewWOWh(item, quant,leadd, ddate, Wh)
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
    if(findObject(":_itemGroup._warehouse_WComboBox").currentText!=Wh)
        clickItem(":_itemGroup._warehouse_WComboBox", Wh, 0, 0, 1, Qt.LeftButton);
    waitForObject(":_schedGroup._leadTime_QSpinBox");
    findObject(":_schedGroup._leadTime_QSpinBox").clear();
    type(":_schedGroup._leadTime_QSpinBox", leadd);
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", ddate);
    type(":_schedGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Work Order.Save_QPushButton");
    clickButton(":Work Order.Save_QPushButton");
    test.log("new Work Order created");

}


function DelAllWO()
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    waitForObject(":xTuple ERP:*.Manufacture_QMenu");
    type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
    type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
    type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
    type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
    type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
    type(":xTuple ERP:*.Manufacture_QMenu", "<Down>");
    type(":xTuple ERP:*.Manufacture_QMenu", "<Right>");
    waitForObject(":xTuple ERP:*.Reports_QMenu_2");
    type(":xTuple ERP:*.Reports_QMenu_2", "<Right>");
    waitForObject(":xTuple ERP:*.Work Order Schedule_QMenu");
    type(":xTuple ERP:*.Work Order Schedule_QMenu", "<Return>");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_7");
    clickButton(":_warehouse.All Sites_QRadioButton_7");
    
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
    waitForObject(":frame._wo_XTreeWidget");
    while(findObject(":frame._wo_XTreeWidget").topLevelItemCount > 0)
    {
        openContextMenu(":frame._wo_XTreeWidget", 0, 0, 0);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete W/O...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Delete W/O...");
        waitForObject(":W/O Schedule by Planner Code.Yes_QPushButton");
        clickButton(":W/O Schedule by Planner Code.Yes_QPushButton");
        waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
        clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
     
    }
    waitForObject(":W/O Schedule by Planner Code.Close_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close_QPushButton");
    test.log("Deleted all Work Orders");

}


function ImplodeTopWO()
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Implode...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "Implode...");
    
    waitForObject(":Implode Work Order...._QPushButton");
    clickButton(":Implode Work Order...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "WH1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Implode Work Order.Implode_QPushButton");
    clickButton(":Implode Work Order.Implode_QPushButton");
    test.log("Imploded Work Order");
}
 
function ExplodeTopWO()
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Explode...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "Explode...");
    waitForObject(":Explode Work Order...._QPushButton");
    clickButton(":Explode Work Order...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "WH1", 0, 0, 0, Qt.LeftButton);
    waitForObject(":Level.Multiple Level Explosion_QRadioButton");
    clickButton(":Level.Multiple Level Explosion_QRadioButton");
    waitForObject(":Explode Work Order.Explode_QPushButton");
    clickButton(":Explode Work Order.Explode_QPushButton");
    waitForObject(":Explode Work Order.Close_QPushButton");
    clickButton(":Explode Work Order.Close_QPushButton");
    test.log("Exploded Work Order");

}

function RescheduleWO(startd, dued)    
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "Reschedule...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "Reschedule...");
    waitForObject(":Reschedule Work Order...._QPushButton");
    clickButton(":Reschedule Work Order...._QPushButton");
    waitForObject(":Work Orders._wo_XTreeWidget");
    doubleClickItem(":Work Orders._wo_XTreeWidget", "E", 19, 4, 0, Qt.LeftButton);
    waitForObject(":Reschedule Work Order.XDateEdit_XDateEdit");
    type(":Reschedule Work Order.XDateEdit_XDateEdit", startd);
    waitForObject(":Reschedule Work Order.XDateEdit_XDateEdit");
    type(":Reschedule Work Order.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":Reschedule Work Order.XDateEdit_XDateEdit_2");
    type(":Reschedule Work Order.XDateEdit_XDateEdit_2", dued);
    waitForObject(":Reschedule Work Order.XDateEdit_XDateEdit_2");
    type(":Reschedule Work Order.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":Reschedule Work Order.Reschedule_QPushButton");
    clickButton(":Reschedule Work Order.Reschedule_QPushButton");
    waitForObject(":Reschedule Work Order.Close_QPushButton");
    clickButton(":Reschedule Work Order.Close_QPushButton");
    test.log("Rescheduled Work Order");
}

function NewScheduledWO(item, quant, dued, lead)    
{
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
    activateItem(":xTuple ERP:*.Scheduling_QMenu", "New Planned Order...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_4");
    doubleClickItem(":_item_XTreeWidget_4", item, 0, 0, 0, Qt.LeftButton);
    waitForObject(":_typeGroup.Work Order_QRadioButton");
    clickButton(":_typeGroup.Work Order_QRadioButton");
    waitForObject(":_qtyGroup._qty_XLineEdit_2");
    type(":_qtyGroup._qty_XLineEdit_2", quant);
    waitForObject(":_qtyGroup.XDateEdit_XDateEdit");
    type(":_qtyGroup.XDateEdit_XDateEdit", dued);
    waitForObject(":_qtyGroup.XDateEdit_XDateEdit");
    type(":_qtyGroup.XDateEdit_XDateEdit", "<Tab>");
    waitForObject(":_qtyGroup._leadTime_QSpinBox");
    findObject(":_qtyGroup._leadTime_QSpinBox").clear();
    type(":_qtyGroup._leadTime_QSpinBox", "0");
    waitForObject(":Planned Order.Save_QPushButton");
    clickButton(":Planned Order.Save_QPushButton");
    waitForObject(":Planned Order.Close_QPushButton");
    clickButton(":Planned Order.Close_QPushButton");
    test.log("Schedule-Work Order created");
}

function FirmPlndOrder()
{

   
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
    activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders");
    waitForObjectItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Planned Orders_QMenu", "by Planner Code...");
    
    waitForObject(":Planned Orders by Planner Code.Query_QPushButton");
    clickButton(":Planned Orders by Planner Code.Query_QPushButton");
    waitForObject(":frame._planord_XTreeWidget");
    openContextMenu(":frame._planord_XTreeWidget", 0, 0, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Firm Order...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Firm Order...");
    waitForObject(":Planned Orders by Planner Code.Firm_QPushButton");
    clickButton(":Planned Orders by Planner Code.Firm_QPushButton");
    waitForObject(":Planned Orders by Planner Code.Close_QPushButton");
    clickButton(":Planned Orders by Planner Code.Close_QPushButton");
    test.log("Firm Planned Orders");
}



function replaceSubstring(inputString, fromString, toString) 
{
   // Goes through the inputString and replaces every occurrence of fromString with toString
   var temp = inputString;
   if (fromString == "") {
      return inputString;
   }
   if (toString.indexOf(fromString) == -1) { // If the string being replaced is not a part of the replacement string (normal situation)
      while (temp.indexOf(fromString) != -1) {
         var toTheLeft = temp.substring(0, temp.indexOf(fromString));
         var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
         temp = toTheLeft + toString + toTheRight;
      }
   } else { // String being replaced is part of replacement string (like "+" being replaced with "++") - prevent an infinite loop
      var midStrings = new Array("~", "`", "_", "^", "#");
      var midStringLen = 1;
      var midString = "";
      // Find a string that doesn't exist in the inputString to be used
      // as an "inbetween" string
      while (midString == "") {
         for (var i=0; i < midStrings.length; i++) {
            var tempMidString = "";
            for (var j=0; j < midStringLen; j++) { tempMidString += midStrings[i]; }
            if (fromString.indexOf(tempMidString) == -1) {
               midString = tempMidString;
               i = midStrings.length + 1;
            }
         }
      } // Keep on going until we build an "inbetween" string that doesn't exist
      // Now go through and do two replaces - first, replace the "fromString" with the "inbetween" string
      while (temp.indexOf(fromString) != -1) {
         var toTheLeft = temp.substring(0, temp.indexOf(fromString));
         var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
         temp = toTheLeft + midString + toTheRight;
      }
      // Next, replace the "inbetween" string with the "toString"
      while (temp.indexOf(midString) != -1) {
         var toTheLeft = temp.substring(0, temp.indexOf(midString));
         var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
         temp = toTheLeft + toString + toTheRight;
      }
   } // Ends the check to see if the string being replaced is part of the replacement string or not
   return temp; // Send the updated string back to the user
} // Ends the "replaceSubstring" function

//--------check if the year is a leap year--------
function IsLeapYear(datea)
{
	datea = parseInt(datea);
	if(datea%4 == 0)
	{
		if(datea%100 != 0)
			return true;
		else
		{
			if(datea%400 == 0)
				return true;
			else
				return false;
		}
	}
return false;
}


function getForwardDate(Days)
{
    
    var DaysFromToday = parseInt(Days);        
    var d = new Date();
        var LeapYearMonths = new Array(31,29,31,30,31,30,31,31,30,31,30,31);
        var NormalYearMonths = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        var CurrentYearFull = d.getFullYear();
        var CurrentMonth = 1+d.getMonth();
        var CurrentDate = d.getDate();
    
        if(IsLeapYear(CurrentYearFull))
        {
            while(DaysFromToday > LeapYearMonths[CurrentMonth-1])
            {
                DaysFromToday = DaysFromToday - LeapYearMonths[CurrentMonth-1];
                CurrentMonth++;
                if(CurrentMonth > 12)
                {
                    CurrentYearFull++;
                    CurrentMonth = 1;
                }
            }
            
        }
        
        if(!IsLeapYear(CurrentYearFull))
        {
            while(DaysFromToday > NormalYearMonths[CurrentMonth-1])
            {
                DaysFromToday = DaysFromToday - NormalYearMonths[CurrentMonth-1];
                CurrentMonth++;
                if(CurrentMonth > 12)
                {
                    CurrentYearFull++;
                    CurrentMonth = 1;
                }
            }
        }
        
    
        
        if(IsLeapYear(CurrentYearFull) && (CurrentDate + DaysFromToday > LeapYearMonths[CurrentMonth-1]))
        {
               CurrentDate = CurrentDate + DaysFromToday - LeapYearMonths[CurrentMonth-1];
               if(CurrentMonth ==12)
               {
                   CurrentMonth = 1;
                   CurrentYearFull++;
               }
               else
                   CurrentMonth = CurrentMonth + 1;
        }
           
        else if((!IsLeapYear(CurrentYearFull)) && (CurrentDate + DaysFromToday > NormalYearMonths[CurrentMonth-1]))
        {
              CurrentDate = CurrentDate + DaysFromToday - NormalYearMonths[CurrentMonth-1];
              
              if(CurrentMonth == 12)
               {
                   CurrentMonth = 1;
                   CurrentYearFull++;
               }
               else
                   CurrentMonth = CurrentMonth + 1;
                 
        }
        else
            CurrentDate = CurrentDate+DaysFromToday;
        CurrentDate = CurrentDate>9?CurrentDate:("0"+CurrentDate);
        CurrentMonth = CurrentMonth>9?CurrentMonth:("0"+CurrentMonth);
        
        
        var returnString = CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate;
        return(CurrentYearFull+"-"+CurrentMonth+"-"+CurrentDate);

    
}

function DelAllTO()
{
    //------Del All Transfer Order--------
    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
    waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
    activateItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
    
    waitForObject(":Destination Site:.All Sites_QRadioButton");
    clickButton(":Destination Site:.All Sites_QRadioButton");
    
    waitForObject(":Source Site:.All Sites_QRadioButton");
    clickButton(":Source Site:.All Sites_QRadioButton");

    waitForObject(":_frame._to_XTreeWidget");
    type(":_frame._to_XTreeWidget","<Space>");
    while(findObject(":_frame._to_XTreeWidget").topLevelItemCount>0)
    {
        waitForObject(":_frame.Delete_QPushButton");
        clickButton(":_frame.Delete_QPushButton");
        waitForObject(":List Open Transfer Orders.Yes_QPushButton");
        clickButton(":List Open Transfer Orders.Yes_QPushButton");
        waitForObject(":_frame._to_XTreeWidget");
        type(":_frame._to_XTreeWidget","<Down>");
    }
    waitForObject(":List Open Transfer Orders.Close_QPushButton");
    clickButton(":List Open Transfer Orders.Close_QPushButton");
    test.log("Deleted All Transfer Orders");

}


