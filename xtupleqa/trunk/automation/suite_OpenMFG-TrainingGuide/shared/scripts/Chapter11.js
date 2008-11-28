function executeChapter11()
{
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Authorities...");
    activateItem(":xTuple ERP: OpenMFG Edition.Tax_QMenu", "Tax Authorities...");
    waitForObject(":List Tax Authorities.New_QPushButton");
    clickButton(":List Tax Authorities.New_QPushButton");
    waitForObject(":_code_XLineEdit_15");
    type(":_code_XLineEdit_15", "TAX-AUTH1");
    type(":_name_XLineEdit_22", "Virginia");
    type(":_extref_XLineEdit", "Smith");
    if(findObject(":_currency_XComboBox_2".currentText!= "USD - $")
        type(":_currency_XComboBox_2", "USD");
    type(":Tax Authority._county_QLineEdit", "United States");
    type(":Tax Authority.Street\nAddress:_XLineEdit", "Street Addr Line1");
    type(":Tax Authority.Street\nAddress:_XLineEdit_2", "Street addr line2");
    type(":Tax Authority.Street\nAddress:_XLineEdit_3", "Street Addr line3");
    type(":Tax Authority.City:_XLineEdit", "VA");
    type(":Tax Authority.State:_XComboBox", "State1");
    type(":Tax Authority.Postal Code:_XLineEdit", "323525");
    type(":Tax Authority.Country:_XComboBox", "United States");
    clickButton(":Tax Authority.Save_QPushButton");
    waitForObject(":List Tax Authorities.Close_QPushButton");
    clickButton(":List Tax Authorities.Close_QPushButton");
}