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