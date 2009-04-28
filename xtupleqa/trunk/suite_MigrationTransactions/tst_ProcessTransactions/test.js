- function main()
{
    waitForObject(":_username_QLineEdit");
    mouseClick(":_username_QLineEdit", 94, 8, 1, Qt.LeftButton);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "admin");
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "zex2plE");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    waitForObject(":Cannot Connect to xTuple ERP Server.OK_QPushButton");
    clickButton(":Cannot Connect to xTuple ERP Server.OK_QPushButton");
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "admin");
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "zenx2plE");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    
    
    //----Accounting - Misc Voucher----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Accounting");
    waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    activateItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
    waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
    activateItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
    waitForObject(":xTuple ERP:*_QPushButton");
    clickButton(":xTuple ERP:*_QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TPARTS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher._voucherGroup_QGroupBox");
    mouseClick(":Miscellaneous Voucher._voucherGroup_QGroupBox", 50, 80, 1, Qt.LeftButton);
    waitForObject(":Miscellaneous Distributions:.New_QPushButton");
    clickButton(":Miscellaneous Distributions:.New_QPushButton");
    waitForObject(":_groupButton.Expense Category:_QRadioButton");
    clickButton(":_groupButton.Expense Category:_QRadioButton");
    waitForObject(":_groupButton._expcat_ExpenseCluster");
    mouseClick(":_groupButton._expcat_ExpenseCluster", 134, 15, 1, Qt.LeftButton);
    waitForObject(":_groupButton...._QPushButton");
    clickButton(":_groupButton...._QPushButton");
    waitForObject(":_groupButton...._QPushButton");
    clickButton(":_groupButton...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_9");
    doubleClickItem(":_listTab_XTreeWidget_9", "OFFICE", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Miscellaneous Voucher_XLineEdit");
    type(":Miscellaneous Voucher_XLineEdit", "34");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton");
    clickButton(":Miscellaneous Voucher.Save_QPushButton");
    waitForObject(":_amountGroup_XLineEdit");
    type(":_amountGroup_XLineEdit", "34");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
    waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
    type(":_dateGroup.XDateEdit_XDateEdit_2", "<Tab>");
    waitForObject(":_referenceGroup._invoiceNum_XLineEdit");
    type(":_referenceGroup._invoiceNum_XLineEdit", "VO 30072");
    waitForObject(":_referenceGroup._reference_XLineEdit");
    type(":_referenceGroup._reference_XLineEdit", "ref - VO 30072");
    waitForObject(":Miscellaneous Voucher.Save_QPushButton_2");
    clickButton(":Miscellaneous Voucher.Save_QPushButton_2");
    waitForObject(":Miscellaneous Voucher.Cancel_QPushButton");
    clickButton(":Miscellaneous Voucher.Cancel_QPushButton");
    
    
    
    
    //----Manufacture- new Work Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Work Order");
    waitForObjectItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    activateItem(":xTuple ERP:*.Work Order_QMenu", "New...");
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget_8");
    doubleClickItem(":_item_XTreeWidget_8", "YTRUCK1", 28, 7, 0, Qt.LeftButton);
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "100");
    waitForOb	ject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "+9");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
    type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
    waitForObject(":Work Order.Create_QPushButton");
    clickButton(":Work Order.Create_QPushButton");
    
    
    
    
    //----Release Work Order---
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Manufacture");
    waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
    activateItem(":xTuple ERP:*.Manufacture_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
    activateItem(":xTuple ERP:*.Reports_QMenu_2", "Work Order Schedule");
    waitForObjectItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Work Order Schedule_QMenu", "by Planner Code...");
    waitForObject(":W/O Schedule by Planner Code.Query_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Query_QPushButton");
    waitForObject(":frame._wo_XTreeWidget");
    clickItem(":frame._wo_XTreeWidget", "50194-1", 5, 5, 1, Qt.RightButton);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release W/O");
    activateItem(":xTuple ERP:*._menu_QMenu", "Release W/O");
    
    
    //----implode work Order----
    waitForObject(":frame._wo_XTreeWidget");
    clickItem(":frame._wo_XTreeWidget", "50195-1", 5, 5, 1, Qt.RightButton);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Implode W/O...");
    waitForObject(":W/O Schedule by Planner Code.Implode_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Implode_QPushButton");
    
    //---Post Production----
    waitForObject(":frame._wo_XTreeWidget");
    clickItem(":frame._wo_XTreeWidget", "50195-1", 5, 5, 1, Qt.RightButton);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
    waitForObject(":_qty_XLineEdit");
    type(":_qty_XLineEdit", "100");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObjectItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget", "50196-1");
    clickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget", "50196-1", 58, 4, 1, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code._itemloc_XTreeWidget");
    doubleClickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget","No", 5, 5, 0, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Distribute_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Distribute_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_2");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_2");
    
    waitForObject(":W/O Schedule by Planner Code.Close_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close_QPushButton");

}
