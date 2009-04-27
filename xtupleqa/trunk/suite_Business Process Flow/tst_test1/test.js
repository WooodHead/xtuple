function main()
{
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "admin");
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "zenx2plE");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    waitForObject(":xTuple ERP:*_GUIClient_2");
    sendEvent("QMoveEvent", ":xTuple ERP:*_GUIClient_2", 320, 138, 894, 151);
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
    waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
    activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
    activateItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
    waitForObjectItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Item...");
    activateItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Item...");
    waitForObject(":Post Actual Costs by Item._itemNumber_ItemLineEdit");
    type(":Post Actual Costs by Item._itemNumber_ItemLineEdit", "tl");
    waitForObject(":Post Actual Costs by Item._itemNumber_ItemLineEdit");
    type(":Post Actual Costs by Item._itemNumber_ItemLineEdit", "<Backspace>");
    waitForObject(":Post Actual Costs by Item._itemNumber_ItemLineEdit");
    type(":Post Actual Costs by Item._itemNumber_ItemLineEdit", "kit1");
    waitForObject(":Post Actual Costs by Item._itemNumber_ItemLineEdit");
    type(":Post Actual Costs by Item._itemNumber_ItemLineEdit", "<Tab>");
    waitForObject(":Post Actual Costs by Item.Select all Costs_QPushButton");
    clickButton(":Post Actual Costs by Item.Select all Costs_QPushButton");
    waitForObject(":Post Actual Costs by Item.Cancel_QPushButton");
    clickButton(":Post Actual Costs by Item.Cancel_QPushButton");
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
    waitForObject(":Update Standard Costs By Item.Cancel_QPushButton");
    clickButton(":Update Standard Costs By Item.Cancel_QPushButton");

}
