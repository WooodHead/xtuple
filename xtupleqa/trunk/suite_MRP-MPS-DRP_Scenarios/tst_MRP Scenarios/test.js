function main()
{
    waitForObject(":Log In_login2");
    mouseClick(":Log In_login2", 139, 195, 1, Qt.LeftButton);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "admin");
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "zenx2plE");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    NewScheduledWO("TSUB1",300,0,0);
    FirmPlndOrder();
    
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
    
}

function FirmPlndOrder()
{

    waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
    activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
    waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
    waitForObject(":xTuple ERP:*.Reports_QMenu");
    activateItem(":xTuple ERP:*.Reports_QMenu", "");
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

}
