function main()
{
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "a");
    waitForObject(":Log In._frame_QFrame");
    sendEvent("QMouseEvent", ":Log In._frame_QFrame", QEvent.MouseButtonPress, 344, 45, Qt.LeftButton, 0);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "dm");
    waitForObject(":Log In._frame_QFrame");
    sendEvent("QMouseEvent", ":Log In._frame_QFrame", QEvent.MouseButtonRelease, 344, 45, Qt.LeftButton, 1);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "in");
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "1zenqa1");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    ctx_0 = defaultApplicationContext();
    setApplicationContext(ctx_0);
 
    
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Shifts...");
    type(":List Shifts._number_XLineEdit", "1ST");
    type(":List Shifts._name_XLineEdit", "First");
    clickButton(":List Shifts.Save_QPushButton");
    waitForObject(":List Shifts.Close_QPushButton");
    clickButton(":List Shifts.Close_QPushButton");
    
    
    
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu", "Locales...");

    clickButton(":List Locales.New_QPushButton");
    waitForObject(":_code_XLineEdit");
    type(":_code_XLineEdit", "MYLOCALE");
    type(":_description_XLineEdit", "My Locale For Class");
   
    type("_language_XComboBox","English");
    type(":_country_XComboBox", "United States");
    
    type(":_salesPriceScale_QSpinBox","<Del>");
    type(":_salesPriceScale_QSpinBox", "2");
    
    mouseClick(":List Locales.qt_spinbox_lineedit_QLineEdit_3", 38, 16, 1, Qt.LeftButton);
    snooze(0.3);
    mouseDrag(":List Locales.qt_spinbox_lineedit_QLineEdit_3", 36, 13, 64, -2, 1, Qt.LeftButton);
    snooze(1.9);
    type(":_purchPriceScale_QSpinBox", "2");
    snooze(1.9);
    mouseDrag(":List Locales.qt_spinbox_lineedit_QLineEdit_4", 31, 6, 84, -1, 1, Qt.LeftButton);
    snooze(1.1);
    type(":_extPriceScale_QSpinBox", "<Del>");
    snooze(0.7);
    type(":_extPriceScale_QSpinBox", "2");
    snooze(1.9);
    mouseDrag(":List Locales.qt_spinbox_lineedit_QLineEdit_5", 30, 7, 129, -4, 1, Qt.LeftButton);
    snooze(2.3);
    type(":_costScale_QSpinBox", "<Del>");
    snooze(0.6);
    type(":_costScale_QSpinBox", "2");
    snooze(12.5);
    mouseDrag(":List Locales.qt_spinbox_lineedit_QLineEdit_6", 31, 15, 54, -2, 1, Qt.LeftButton);
    snooze(2.3);
    type(":_qtyScale_QSpinBox", "<Del>");
    snooze(0.4);
    type(":_qtyScale_QSpinBox", "2");
    snooze(2.9);
    mouseDrag(":List Locales.qt_spinbox_lineedit_QLineEdit_7", 42, 9, 56, 0, 1, Qt.LeftButton);
    snooze(1.3);
    type(":_qtyPerScale_QSpinBox", "<Del>");
    snooze(0.7);
    type(":_qtyPerScale_QSpinBox", "6");
    snooze(2.3);
    mouseDrag(":List Locales.qt_spinbox_lineedit_QLineEdit_8", 29, 0, 145, -5, 1, Qt.LeftButton);
    snooze(1.1);
    type(":_uomRatioScale_QSpinBox", "<Del>");
    snooze(1.0);
    type(":_uomRatioScale_QSpinBox", "6");
    snooze(9.4);
    mouseClick(":_error_QLineEdit", 79, 5, 1, Qt.LeftButton);
    snooze(2.3);
    type(":_error_QLineEdit", "red");
    snooze(2.5);
    mouseClick(":_warning_QLineEdit", 28, 10, 1, Qt.LeftButton);
    snooze(5.1);
    type(":_warning_QLineEdit", "orange");
    snooze(2.8);
    mouseClick(":_emphasis_QLineEdit", 48, 12, 1, Qt.LeftButton);
    snooze(11.4);
    type(":_emphasis_QLineEdit", "lime");
    snooze(2.5);
    mouseClick(":_alternate_QLineEdit", 65, 9, 1, Qt.LeftButton);
    snooze(5.4);
    mouseClick(":_expired_QLineEdit", 53, 8, 1, Qt.LeftButton);
    snooze(3.0);
    type(":_expired_QLineEdit", "gray");
    type(":_alternate_QLineEdit", "blue");
    snooze(5.9);
    mouseClick(":_comments_QTextEdit", 465, 12, 1, Qt.LeftButton);
    snooze(9.6);
    type(":_future_QLineEdit", "green");
    snooze(6.3);
    clickButton(":List Locales.Save_QPushButton");
    mouseClick(":_future_QLineEdit", 67, 9, 1, Qt.LeftButton);
    snooze(11.7);
    clickButton(":List Locales.Close_QPushButton");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    
    
    
    
    
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit OpenMFG...");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit OpenMFG...");

}
