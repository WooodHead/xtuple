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
    waitForObject(":xTuple ERP:*.List_QToolButton");
    clickButton(":xTuple ERP:*.List_QToolButton");
    waitForObjectItem(":_itemSite_XTreeWidget", "COLLECTORS-LINE");
    clickItem(":_itemSite_XTreeWidget", "COLLECTORS-LINE", 61, 12, 1, Qt.LeftButton);
    waitForObject(":_itemSite_XTreeWidget");
    openContextMenu(":_itemSite_XTreeWidget", 61, 102, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit Item Site");
    activateItem(":xTuple ERP:*._menu_QMenu", "Edit Item Site");
    waitForObject(":List Item Sites.Cancel_QPushButton");
    clickButton(":List Item Sites.Cancel_QPushButton");
    waitForObject(":List Item Sites.List Item Sites_QWorkspaceTitleBar");
    mouseDrag(":List Item Sites.List Item Sites_QWorkspaceTitleBar", 366, 22, 536, -27, 1, Qt.LeftButton);

}
