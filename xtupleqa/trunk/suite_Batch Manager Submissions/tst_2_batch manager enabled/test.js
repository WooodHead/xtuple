//--***--This script is developed to execute Batch Manager Submissions(when Batch Manager is enabled)--***--

function main()
{
  
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    var set = testData.dataset("login.tsv");
    var email;
    for(var records in set)
    {
        fromemail=testData.field(set[records],"FROM EMAIL");
        toemail=testData.field(set[records],"TO EMAIL");
        role=testData.field(set[records],"ROLE")
             if(role=="CONFIGURE") break;     
    }
    
    installEventHandler("Crash", "handleCrash");
    
    //---find Application Edition and Enable Batch Manager------ 
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: *.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP: *.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
    
    waitForObject(":_interval_QSpinBox");
    findObject(":_interval_QSpinBox").clear();
    waitForObject(":_interval_QSpinBox");
    type(":_interval_QSpinBox", "0");
    
    waitForObject(":Database Information.Batch Manager_QGroupBox");
    if(!findObject(":Database Information.Batch Manager_QGroupBox").checked)
        type(":Database Information.Batch Manager_QGroupBox", " ");
    
    waitForObject(":Database Information.Batch Manager_QGroupBox");
    type(":Database Information.Batch Manager_QGroupBox", "<Tab>");
    waitForObject(":_batchEmail_QLineEdit");
    type(":_batchEmail_QLineEdit", fromemail);
    
    waitForObject(":Database Information.Save_QPushButton");
    clickButton(":Database Information.Save_QPushButton");
    test.log("Application Edition: "+appEdition);
    test.log("Batch Manager Option enabled");
    
    //-----Assign All Privileges-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Maintain Users...");
    activateItem(":xTuple ERP: *.System_QMenu", "Maintain Users...");
    
    waitForObject(":List Users._usr_XTreeWidget");
    doubleClickItem(":List Users._usr_XTreeWidget", "admin", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_email_XLineEdit");
    type(":_email_XLineEdit", fromemail);
    waitForObject(":_module_XComboBox");
    for(i = findObject(":_module_XComboBox").count;i>0;i--)
    {
        waitForObject(":_privTab.Add All->>_QPushButton");     
        clickButton(":_privTab.Add All->>_QPushButton");
        waitForObject(":_module_XComboBox");
        type(":_module_XComboBox", "<Down>");
    }
    waitForObject(":List Users.Save_QPushButton");
    clickButton(":List Users.Save_QPushButton");
    
    waitForObject(":List Users.Close_QPushButton");
    clickButton(":List Users.Close_QPushButton");
    test.log("Assigned all privileges to the user: Admin");
    
    //-----System Preferrences-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Preferences...");
    activateItem(":xTuple ERP: *.System_QMenu", "Preferences...");
    
    waitForObject(":_idleTimeout_QSpinBox");
    findObject(":_idleTimeout_QSpinBox").clear();
    waitForObject(":_idleTimeout_QSpinBox");
    type(":_idleTimeout_QSpinBox", "0");
    
    waitForObject(":User Preferences.Save_QPushButton");
    clickButton(":User Preferences.Save_QPushButton");
    
    //-----Enable Sales Reservations-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: *.System_QMenu", "Configure Modules");
    waitForObjectItem(":*.Configure Modules_QMenu", "Sales...");
    activateItem(":*.Configure Modules_QMenu", "Sales...");
    
    if(!findObject(":general.Enable Sales Reservations_QCheckBox").checked)
        clickButton(":general.Enable Sales Reservations_QCheckBox");
    
    waitForObject(":Sales Configuration.Save_QPushButton");
    clickButton(":Sales Configuration.Save_QPushButton");
    test.log("Enabled Sales Reservations");
    
    //-----Exit the Application-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Batch Manager-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Batch Manager...");
    activateItem(":xTuple ERP: *.System_QMenu", "Batch Manager...");
    
    waitForObject(":Submitted By:.Current User_QRadioButton");
    clickButton(":Submitted By:.Current User_QRadioButton");
    if(findObject(":_frame.Automatically Update_QCheckBox").unchecked)
        clickButton(":_frame.Automatically Update_QCheckBox");
    
    waitForObject(":Batch Manager.Close_QPushButton");
    clickButton(":Batch Manager.Close_QPushButton");
    test.log("Batch Manager enabled");
    
    //-----Setup EDI Profiles-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: *.Master Information_QMenu", "EDI Profiles...");
    activateItem(":xTuple ERP: *.Master Information_QMenu", "EDI Profiles...");
    
    waitForObject(":List EDI Profiles._ediprofile_XTreeWidget");
    var sWidgetTreeControl = ":List EDI Profiles._ediprofile_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    waitForObject(":List EDI Profiles._ediprofile_XTreeWidget");
    clickItem(":List EDI Profiles._ediprofile_XTreeWidget", "email", 5, 5, 1, Qt.LeftButton);
    
    for(var loop=0; loop<findObject(":List EDI Profiles._ediprofile_XTreeWidget").topLevelItemCount;loop++)
    {
        
        obj_TreeTopLevelItem = obj_TreeRootItem.child(loop);
        var text = obj_TreeTopLevelItem.text(1);
        if(obj_TreeTopLevelItem.text(1)== "email")
        {    
            waitForObject(":List EDI Profiles.Edit_QPushButton");
            clickButton(":List EDI Profiles.Edit_QPushButton");
            
            waitForObject(":_emailFrom_QLineEdit");
            findObject(":_emailFrom_QLineEdit").clear();
            type(":_emailFrom_QLineEdit", fromemail);
            waitForObject(":_emailReplyTo_QLineEdit");
            findObject(":_emailReplyTo_QLineEdit").clear();
            waitForObject(":_emailTo_QLineEdit");
            findObject(":_emailTo_QLineEdit").clear();
            type(":_emailTo_QLineEdit", toemail);
            waitForObject(":_emailCC_QLineEdit");
            findObject(":_emailCC_QLineEdit").clear();
            waitForObject(":_emailBCC_QLineEdit");
            findObject(":_emailBCC_QLineEdit").clear();
            
            waitForObject(":List EDI Profiles.Save_QPushButton");
            clickButton(":List EDI Profiles.Save_QPushButton");             
        }  
        
        waitForObject(":List EDI Profiles._ediprofile_XTreeWidget");
        type(":List EDI Profiles._ediprofile_XTreeWidget","<Down>"); 
    }
    
    waitForObject(":List EDI Profiles.Close_QPushButton");
    clickButton(":List EDI Profiles.Close_QPushButton");
    
    //-----Attach EDI Profiles to Customer-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Customer");
    activateItem(":*.Sales_QMenu", "Customer");
    waitForObjectItem(":*.Customer_QMenu", "List...");
    activateItem(":*.Customer_QMenu", "List...");
    
    waitForObject(":List Customers._cust_XTreeWidget");
    doubleClickItem(":List Customers._cust_XTreeWidget", "TTOYS", 115, 1, 0, Qt.LeftButton);
    waitForObject(":Customer.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Customer.qt_tabwidget_tabbar_QTabBar", "Transmission");
    
    waitForObject(":EDI Relationships.New_QPushButton");
    clickButton(":EDI Relationships.New_QPushButton");
    waitForObject(":_name_QLineEdit_3");
    type(":_name_QLineEdit_3", "TTOYS-CreditMemo");
    waitForObjectItem(":_type_XComboBox_3", "EMail");
    clickItem(":_type_XComboBox_3", "EMail", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Customer.Review Before Sending_QCheckBox");
    clickButton(":Customer.Review Before Sending_QCheckBox");
    waitForObject(":_emailFrom_QLineEdit_2");
    type(":_emailFrom_QLineEdit_2", fromemail);
    waitForObject(":_emailTo_QLineEdit_2");
    type(":_emailTo_QLineEdit_2",toemail);
    waitForObject(":_emailSubject_QLineEdit_2");
    type(":_emailSubject_QLineEdit_2", "enclosed Credit Memo </docnumber>");
    waitForObject(":_emailBody_QTextEdit_2");
    type(":_emailBody_QTextEdit_2", "Please find enclosed the Credit Memo </docnumber> enclosed. Thanks.");
    
    waitForObject(":forms.New_QPushButton_2");
    clickButton(":forms.New_QPushButton_2");
    waitForObject(":Customer.OK_QPushButton");
    clickButton(":Customer.OK_QPushButton");
    waitForObjectItem(":_type_XComboBox_4", "Credit Memo");
    clickItem(":_type_XComboBox_4", "Credit Memo", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_file_QLineEdit_2");
    type(":_file_QLineEdit_2", "Report");
    
    waitForObjectItem(":_reportReport_XComboBox_2", "CreditMemo");
    clickItem(":_reportReport_XComboBox_2", "CreditMemo", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Customer.OK_QPushButton_2");
    clickButton(":Customer.OK_QPushButton_2");
    waitForObject(":Customer.Save_QPushButton");
    clickButton(":Customer.Save_QPushButton");
    
    waitForObjectItem(":Customer._doctype_XComboBox", "Credit Memo");
    clickItem(":Customer._doctype_XComboBox", "Credit Memo", 5, 5, 1, Qt.LeftButton);
    waitForObjectItem(":_profile_XTreeWidget_2", "TTOYS-CreditMemo");
    clickItem(":_profile_XTreeWidget_2", "TTOYS-CreditMemo", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Customer.Attach_QPushButton");
    clickButton(":Customer.Attach_QPushButton");
    test.log("EDI Profile created for CreditMemo and attached to TTOYS");
    
    waitForObject(":EDI Relationships.New_QPushButton");
    clickButton(":EDI Relationships.New_QPushButton");
    waitForObject(":_name_QLineEdit_3");
    type(":_name_QLineEdit_3", "TTOYS-ARStatement");
    waitForObjectItem(":_type_XComboBox_3", "EMail");
    clickItem(":_type_XComboBox_3", "EMail", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Customer.Review Before Sending_QCheckBox");
    clickButton(":Customer.Review Before Sending_QCheckBox");
    waitForObject(":_emailFrom_QLineEdit_2");
    type(":_emailFrom_QLineEdit_2", fromemail);
    waitForObject(":_emailTo_QLineEdit_2");
    type(":_emailTo_QLineEdit_2",toemail);
    waitForObject(":_emailSubject_QLineEdit_2");
    type(":_emailSubject_QLineEdit_2", "please find enclosed the A/R statement enclosed");
    waitForObject(":_emailBody_QTextEdit_2");
    type(":_emailBody_QTextEdit_2", "please find enclosed the A/R statement enclosed");
    
    waitForObject(":forms.New_QPushButton_2");
    clickButton(":forms.New_QPushButton_2");
    waitForObject(":Customer.OK_QPushButton");
    clickButton(":Customer.OK_QPushButton");
    waitForObjectItem(":_type_XComboBox_4", "A/R Statement");
    clickItem(":_type_XComboBox_4", "A/R Statement", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_file_QLineEdit_2");
    type(":_file_QLineEdit_2", "Report");
    
    waitForObjectItem(":_reportReport_XComboBox_2", "ARAging");
    clickItem(":_reportReport_XComboBox_2", "ARAging", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Customer.OK_QPushButton_2");
    clickButton(":Customer.OK_QPushButton_2");
    waitForObject(":Customer.Save_QPushButton");
    clickButton(":Customer.Save_QPushButton");
    
    waitForObjectItem(":Customer._doctype_XComboBox", "A/R Statement");
    clickItem(":Customer._doctype_XComboBox", "A/R Statement", 5, 5, 1, Qt.LeftButton);
    waitForObjectItem(":_profile_XTreeWidget_2", "TTOYS-ARStatement");
    clickItem(":_profile_XTreeWidget_2", "TTOYS-ARStatement", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Customer.Attach_QPushButton");
    clickButton(":Customer.Attach_QPushButton");
    test.log("EDI Profile created for A/R Statement and attached to TTOYS");
    
    waitForObject(":Customer.Save_QPushButton_2");
    clickButton(":Customer.Save_QPushButton_2");
    waitForObject(":List Customers.Close_QPushButton");
    clickButton(":List Customers.Close_QPushButton");
    
    
    //--------Batch Manager Submissions--------
    
    //-----Purchase Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
    activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
    waitForObjectItem(":*.Purchase_QMenu", "Forms");
    activateItem(":*.Purchase_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu", "Send Electronic Purchase Order...");
    activateItem(":*.Forms_QMenu", "Send Electronic Purchase Order...");
    
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "PO", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Purchase Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create a Purchase Order-----  
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
    activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
    waitForObjectItem(":*.Purchase_QMenu", "Purchase Order");
    activateItem(":*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":*.Purchase Order_QMenu", "New...");
    activateItem(":*.Purchase Order_QMenu", "New...");
    
    waitForObject(":_headerPage...._QPushButton");
    clickButton(":_headerPage...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_3");
    doubleClickItem(":_listTab_XTreeWidget_3", "TPARTS", 5, 5, 0, Qt.LeftButton);
    
    var ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
    
    waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":groupBox_2...._QPushButton");
    clickButton(":groupBox_2...._QPushButton");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "TBOX1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "100");
    waitForObject(":_ordered_XLineEdit");
    type(":_ordered_XLineEdit", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton_2");
    clickButton(":Purchase Order.Save_QPushButton_2");
    
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    
    //-----Unposted Purchase Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
    activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
    waitForObjectItem(":*.Purchase_QMenu", "Purchase Order");
    activateItem(":*.Purchase_QMenu", "Purchase Order");
    waitForObjectItem(":*.Purchase Order_QMenu", "List Unposted...");
    activateItem(":*.Purchase Order_QMenu", "List Unposted...");
    
    waitForObject(":List Unposted Purchase Orders._pohead_XTreeWidget");
    openContextMenu(":List Unposted Purchase Orders._pohead_XTreeWidget", 5, 5, 0);
    waitForObjectItem(":*._menu_QMenu", "Send Electronic Purchase Order...");
    activateItem(":*._menu_QMenu", "Send Electronic Purchase Order...");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":List Unposted Purchase Orders.Close_QPushButton");
    clickButton(":List Unposted Purchase Orders.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Unposted Purchase Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Print Purchase Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
    activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
    waitForObjectItem(":*.Purchase_QMenu", "Forms");
    activateItem(":*.Purchase_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu", "Print Purchase Order...");
    activateItem(":*.Forms_QMenu", "Print Purchase Order...");
    
    waitForObject(":Print Purchase Order...._QPushButton");
    clickButton(":Print Purchase Order...._QPushButton");
    waitForObject(":_pohead_XTreeWidget");
    doubleClickItem(":_pohead_XTreeWidget", "20067", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Print Purchase Order.Print_QPushButton");
    clickButton(":Print Purchase Order.Print_QPushButton");
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":Print Purchase Order.Cancel_QPushButton");
    clickButton(":Print Purchase Order.Cancel_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Purchase Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create a Sales Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Sales Order");
    activateItem(":*.Sales_QMenu", "Sales Order");
    waitForObjectItem(":*.Sales Order_QMenu", "New...");
    activateItem(":*.Sales Order_QMenu", "New...");
    
    waitForObject(":_headerPage...._QPushButton_2");
    clickButton(":_headerPage...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_3");
    doubleClickItem(":_item_XTreeWidget_3", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "100"); 
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "<Tab>");
    waitForObject(":_discountFromCust_XLineEdit");
    type(":_discountFromCust_XLineEdit", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
    
    waitForObject(":Sales Order.Save_QPushButton");
    clickButton(":Sales Order.Save_QPushButton");
    
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    
    waitForObject(":Sales Order.Cancel_QPushButton");
    clickButton(":Sales Order.Cancel_QPushButton");
    
    //-----Open Sales Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Sales Order");
    activateItem(":*.Sales_QMenu", "Sales Order");
    waitForObjectItem(":*.Sales Order_QMenu", "List Open...");
    activateItem(":*.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame._so_XTreeWidget");
    openContextMenu(":frame._so_XTreeWidget", 5, 5, 0);
    waitForObjectItem(":*._menu_QMenu", "Send Electronic Acknowledgment...");
    activateItem(":*._menu_QMenu", "Send Electronic Acknowledgment...");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Open Sales Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Electronic Sales Order Form-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Forms");
    activateItem(":*.Sales_QMenu", "Forms");
    
    waitForObjectItem(":*.Forms_QMenu_3", "Send Electronic Sales Order Form ...");
    activateItem(":*.Forms_QMenu_3", "Send Electronic Sales Order Form ...");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "SO", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Sales Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create a Quote-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Quote");
    activateItem(":*.Sales_QMenu", "Quote");
    waitForObjectItem(":*.Quote_QMenu", "New...");
    activateItem(":*.Quote_QMenu", "New...");
    
    waitForObject(":_headerPage...._QPushButton_3");
    clickButton(":_headerPage...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget_6");
    doubleClickItem(":_listTab_XTreeWidget_6", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    
    waitForObject(":_lineItemsPage.New_QPushButton_3");
    clickButton(":_lineItemsPage.New_QPushButton_3");
    waitForObject(":_itemGroup...._QPushButton_5");
    clickButton(":_itemGroup...._QPushButton_5");
    waitForObject(":_item_XTreeWidget_5");
    doubleClickItem(":_item_XTreeWidget_5", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "50");
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "<Tab>");
    waitForObject(":_discountFromCust_XLineEdit_2");
    type(":_discountFromCust_XLineEdit_2", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "+7");
    
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
    
    waitForObject(":Quote.Close_QPushButton");
    clickButton(":Quote.Close_QPushButton");
    
    waitForObject(":Quote.Save_QPushButton_2");
    clickButton(":Quote.Save_QPushButton_2");
    
    waitForObject(":Quote.Cancel_QPushButton");
    clickButton(":Quote.Cancel_QPushButton");
    
    //-----Electronic Quote-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Forms");
    activateItem(":*.Sales_QMenu", "Forms");
    
    waitForObjectItem(":*.Forms_QMenu_3", "Send Electronic Quote ...");
    activateItem(":*.Forms_QMenu_3", "Send Electronic Quote ...");
    waitForObject(":_listTab_XTreeWidget_7");
    doubleClickItem(":_listTab_XTreeWidget_7", "TTOYS", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Quote");
    
    else test.fail("Batch Manager not responding");
    
    //-----Allocate Reservations-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Utilities");
    activateItem(":*.Sales_QMenu", "Utilities");
    waitForObjectItem(":*.Utilities_QMenu", "Allocate Reservations...");
    activateItem(":*.Utilities_QMenu", "Allocate Reservations...");
    
    waitForObject(":_customerGroup.Selected _QRadioButton");
    clickButton(":_customerGroup.Selected _QRadioButton");
    waitForObject(":_customerGroup...._QPushButton");
    clickButton(":_customerGroup...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Allocate Reservations.XDateEdit_XDateEdit");
    type(":Allocate Reservations.XDateEdit_XDateEdit", "0");
    waitForObject(":Allocate Reservations.XDateEdit_XDateEdit_2");
    type(":Allocate Reservations.XDateEdit_XDateEdit_2", "0");
    
    waitForObject(":Allocate Reservations.Submit_QPushButton");
    clickButton(":Allocate Reservations.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Allocate Reservations");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create Planned Orders by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
    activateItem(":*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":*.Scheduling_QMenu", "Run MRP");
    activateItem(":*.Scheduling_QMenu", "Run MRP");
    waitForObjectItem(":*.Run MRP_QMenu", "by Planner Code...");
    activateItem(":*.Run MRP_QMenu", "by Planner Code...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton");
    waitForObject(":_warehouse.All Sites_QRadioButton");
    clickButton(":_warehouse.All Sites_QRadioButton");
    waitForObject(":_optionsGroup.XDateEdit_XDateEdit");
    type(":_optionsGroup.XDateEdit_XDateEdit", "+7");
    
    waitForObject(":Run MRP by Planner Code.Submit_QPushButton");
    clickButton(":Run MRP by Planner Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for creating Planned orders by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //-----Release Planned Orders by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
    activateItem(":*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":*.Scheduling_QMenu", "Release Planned Orders...");
    activateItem(":*.Scheduling_QMenu", "Release Planned Orders...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_2");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    
    waitForObject(":groupBox_2.XDateEdit_XDateEdit");
    type(":groupBox_2.XDateEdit_XDateEdit", "+7");
    
    waitForObject(":Release Planned Orders by Planner Code.Submit_QPushButton");
    clickButton(":Release Planned Orders by Planner Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for releasing Planned orders by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create Buffer Status by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Constraint Management");
    activateItem(":*.Schedule_QMenu", "Constraint Management");
    type(":*.Schedule_QMenu","<Right>");
    type(":*.Schedule_QMenu","<Right>");
    waitForObjectItem(":*.Constraint Management_QMenu", "Update Status");
    activateItem(":*.Constraint Management_QMenu", "Update Status");
    waitForObjectItem(":*.Update Status_QMenu", "by Planner Code...");
    activateItem(":*.Update Status_QMenu", "by Planner Code...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_3");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_3");
    waitForObject(":_warehouse.All Sites_QRadioButton_3");
    clickButton(":_warehouse.All Sites_QRadioButton_3");
    
    waitForObject(":Run Buffer Status by Planner Code.Submit_QPushButton");
    clickButton(":Run Buffer Status by Planner Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for creating buffer status by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create Buffer Status by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Constraint Management");
    activateItem(":*.Schedule_QMenu", "Constraint Management");
    waitForObjectItem(":*.Constraint Management_QMenu", "Update Status");
    activateItem(":*.Constraint Management_QMenu", "Update Status");
    snooze(0.5);
    waitForObjectItem(":*.Update Status_QMenu", "by Item...");
    activateItem(":*.Update Status_QMenu", "by Item...");
    
    waitForObject(":Run Buffer Status by Item...._QPushButton");
    clickButton(":Run Buffer Status by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":Run Buffer Status by Item.Submit_QPushButton");
    clickButton(":Run Buffer Status by Item.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for creating buffer status by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Run MPS by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
    activateItem(":*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":*.Scheduling_QMenu", "Run MPS...");
    activateItem(":*.Scheduling_QMenu", "Run MPS...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_4");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_4");
    waitForObject(":_warehouse.All Sites_QRadioButton_4");
    clickButton(":_warehouse.All Sites_QRadioButton_4");
    waitForObject(":Run MPS by Planner Code.XDateEdit_XDateEdit");
    type(":Run MPS by Planner Code.XDateEdit_XDateEdit", "+7");
    
    waitForObject(":Run MPS by Planner Code.Submit_QPushButton");
    clickButton(":Run MPS by Planner Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for run MPS by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //-----Enabling Sites for creating Planned Transfer Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":*.Inventory_QMenu", "Site");
    activateItem(":*.Inventory_QMenu", "Site");
    waitForObjectItem(":*.Site_QMenu", "List...");
    activateItem(":*.Site_QMenu", "List...");
    
    waitForObject(":List Sites._warehouse_XTreeWidget");
    doubleClickItem(":List Sites._warehouse_XTreeWidget", "WH1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_planGroup._sequence_XSpinBox");
    findObject(":_planGroup._sequence_XSpinBox").clear();
    waitForObject(":_planGroup._sequence_XSpinBox");
    type(":_planGroup._sequence_XSpinBox", "20");
    
    waitForObject(":Save_QPushButton");
    clickButton(":Save_QPushButton");
    
    waitForObject(":List Sites._warehouse_XTreeWidget");
    doubleClickItem(":List Sites._warehouse_XTreeWidget", "WH2", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_planGroup._sequence_XSpinBox");
    findObject(":_planGroup._sequence_XSpinBox").clear();
    waitForObject(":_planGroup._sequence_XSpinBox");
    type(":_planGroup._sequence_XSpinBox", "20");
    
    waitForObject(":Save_QPushButton");
    clickButton(":Save_QPushButton");
    
    waitForObject(":List Sites.Close_QPushButton");
    clickButton(":List Sites.Close_QPushButton");
    
    //-----Creating a Supply site for the Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":*.Inventory_QMenu", "Item Site");
    activateItem(":*.Inventory_QMenu", "Item Site");
    waitForObjectItem(":*.Item Site_QMenu", "List...");
    activateItem(":*.Item Site_QMenu", "List...");
    
    waitForObject(":_warehouse.Selected:_QRadioButton");
    clickButton(":_warehouse.Selected:_QRadioButton");
    waitForObject(":_warehouse._warehouses_WComboBox");
    clickItem(":_warehouse._warehouses_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    
    waitForObjectItem(":_itemSite_XTreeWidget", "BTRUCK1");
    clickItem(":_itemSite_XTreeWidget", "BTRUCK1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_frame.Copy_QPushButton");
    clickButton(":_frame.Copy_QPushButton");
    waitForObject(":_warehouse_WComboBox");
    clickItem(":_warehouse_WComboBox", "WH2", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    
    waitForObject(":_itemSite_XTreeWidget");
    doubleClickItem(":_itemSite_XTreeWidget", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":List Item Sites.qt_tabwidget_tabbar_QTabBar");
    clickTab(":List Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
    if(!findObject(":Scheduling.Create Planned Transfer Orders_QGroupBox").checked)
        type(":Scheduling.Create Planned Transfer Orders_QGroupBox", " ");
    
    waitForObjectItem(":Create Planned Transfer Orders._suppliedFromSite_WComboBox", "WH2");
    clickItem(":Create Planned Transfer Orders._suppliedFromSite_WComboBox", "WH2", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Item Sites.Save_QPushButton");
    clickButton(":List Item Sites.Save_QPushButton");
    
    waitForObject(":List Item Sites.Close_QPushButton");
    clickButton(":List Item Sites.Close_QPushButton");
    
    //-----Creating Planned Transfer Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
    activateItem(":*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":*.Scheduling_QMenu", "New Planned Order...");
    activateItem(":*.Scheduling_QMenu", "New Planned Order...");
    
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_typeGroup.Transfer Order_QRadioButton");
    clickButton(":_typeGroup.Transfer Order_QRadioButton");
    waitForObjectItem(":_typeGroup._fromWarehouse_WComboBox", "WH2");
    clickItem(":_typeGroup._fromWarehouse_WComboBox", "WH2", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":_qtyGroup._qty_XLineEdit");
    type(":_qtyGroup._qty_XLineEdit", "25");
    waitForObject(":_qtyGroup.XDateEdit_XDateEdit");
    type(":_qtyGroup.XDateEdit_XDateEdit", "+7");
    waitForObject(":Planned Order.Save_QPushButton");
    clickButton(":Planned Order.Save_QPushButton");
    
    waitForObject(":Planned Order.Close_QPushButton");
    clickButton(":Planned Order.Close_QPushButton");
    test.log("Planned Transfer Order created");
    
    //-----Releasing Planned Transfer Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
    activateItem(":*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":*.Scheduling_QMenu", "Release Planned Orders...");
    activateItem(":*.Scheduling_QMenu", "Release Planned Orders...");
    
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_2");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_2");
    waitForObject(":_warehouse.All Sites_QRadioButton_2");
    clickButton(":_warehouse.All Sites_QRadioButton_2");
    waitForObject(":groupBox_2.XDateEdit_XDateEdit");
    type(":groupBox_2.XDateEdit_XDateEdit", "+7");
    
    waitForObject(":Release Planned Orders by Planner Code.Submit_QPushButton");
    clickButton(":Release Planned Orders by Planner Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for releasing Planned Transfer Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Demand by Plannercode-----  
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
    activateItem(":*.Schedule_QMenu", "Capacity Planning");
    waitForObjectItem(":*.Capacity Planning_QMenu", "Time-Phased Demand...");
    activateItem(":*.Capacity Planning_QMenu", "Time-Phased Demand...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_5");
    clickButton(":_warehouse.All Sites_QRadioButton_5");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_5");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_5");
    waitForObject(":Time Phased Demand by Planner Code._calendar_CalendarComboBox");
    clickItem(":Time Phased Demand by Planner Code._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time Phased Demand by Planner Code.Query_QPushButton");
    clickButton(":Time Phased Demand by Planner Code.Query_QPushButton");
    
    waitForObject(":Time Phased Demand by Planner Code.Submit_QPushButton");
    clickButton(":Time Phased Demand by Planner Code.Submit_QPushButton");
    
    waitForObject(":Time Phased Demand by Planner Code._fromEmail_XLineEdit");
    type(":Time Phased Demand by Planner Code._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time Phased Demand by Planner Code._email_XLineEdit");
    type(":Time Phased Demand by Planner Code._email_XLineEdit", toemail);
    
    waitForObject(":Time Phased Demand by Planner Code.Submit_QPushButton_2");
    clickButton(":Time Phased Demand by Planner Code.Submit_QPushButton_2");
    
    waitForObject(":Time Phased Demand by Planner Code.Close_QPushButton");
    clickButton(":Time Phased Demand by Planner Code.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Demand by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Production by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
    activateItem(":*.Schedule_QMenu", "Capacity Planning");
    waitForObjectItem(":*.Capacity Planning_QMenu", "Time-Phased Production");
    activateItem(":*.Capacity Planning_QMenu", "Time-Phased Production");
    waitForObjectItem(":*.Time-Phased Production_QMenu", "by Planner Code...");
    activateItem(":*.Time-Phased Production_QMenu", "by Planner Code...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_6");
    clickButton(":_warehouse.All Sites_QRadioButton_6");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_6");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_6");
    waitForObject(":Time-Phased Production by Planner Code._calendar_CalendarComboBox");
    clickItem(":Time-Phased Production by Planner Code._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Production by Planner Code.Query_QPushButton");
    clickButton(":Time-Phased Production by Planner Code.Query_QPushButton");
    
    waitForObject(":Time-Phased Production by Planner Code.Submit_QPushButton");
    clickButton(":Time-Phased Production by Planner Code.Submit_QPushButton");
    
    waitForObject(":Time-Phased Production by Planner Code._fromEmail_XLineEdit");
    type(":Time-Phased Production by Planner Code._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Production by Planner Code._email_XLineEdit");
    type(":Time-Phased Production by Planner Code._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Production by Planner Code.Submit_QPushButton_2");
    clickButton(":Time-Phased Production by Planner Code.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Production by Planner Code.Close_QPushButton");
    clickButton(":Time-Phased Production by Planner Code.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Production by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Production by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
    activateItem(":*.Schedule_QMenu", "Capacity Planning");
    waitForObjectItem(":*.Capacity Planning_QMenu", "Time-Phased Production");
    activateItem(":*.Capacity Planning_QMenu", "Time-Phased Production");
    waitForObjectItem(":*.Time-Phased Production_QMenu", "by Item...");
    activateItem(":*.Time-Phased Production_QMenu", "by Item...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_7");
    clickButton(":_warehouse.All Sites_QRadioButton_7");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_7");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_7");
    waitForObject(":Time-Phased Production by Item._calendar_CalendarComboBox");
    clickItem(":Time-Phased Production by Item._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Production by Item.Query_QPushButton");
    clickButton(":Time-Phased Production by Item.Query_QPushButton");
    
    waitForObject(":Time-Phased Production by Item.Submit_QPushButton");
    clickButton(":Time-Phased Production by Item.Submit_QPushButton");
    
    waitForObject(":Time-Phased Production by Item._fromEmail_XLineEdit");
    type(":Time-Phased Production by Item._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Production by Item._email_XLineEdit");
    type(":Time-Phased Production by Item._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Production by Item.Submit_QPushButton_2");
    clickButton(":Time-Phased Production by Item.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Production by Item.Close_QPushButton");
    clickButton(":Time-Phased Production by Item.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Production by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Availability-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Reports");
    activateItem(":*.Schedule_QMenu", "Reports");
    waitForObjectItem(":*.Reports_QMenu", "Time-Phased Availability...");
    activateItem(":*.Reports_QMenu", "Time-Phased Availability...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_8");
    clickButton(":_warehouse.All Sites_QRadioButton_8");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_8");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_8");
    waitForObject(":Time-Phased Availability._calendar_CalendarComboBox");
    clickItem(":Time-Phased Availability._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Availability.Query_QPushButton");
    clickButton(":Time-Phased Availability.Query_QPushButton");
    
    waitForObject(":Time-Phased Availability.Submit_QPushButton");
    clickButton(":Time-Phased Availability.Submit_QPushButton");
    
    waitForObject(":Time-Phased Availability._fromEmail_XLineEdit");
    type(":Time-Phased Availability._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Availability._email_XLineEdit");
    type(":Time-Phased Availability._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Availability.Submit_QPushButton_2");
    clickButton(":Time-Phased Availability.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Availability.Close_QPushButton");
    clickButton(":Time-Phased Availability.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Availability");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Booking by Customer-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    activateItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    waitForObjectItem(":*.Time-Phased Bookings_QMenu", "by Customer...");
    activateItem(":*.Time-Phased Bookings_QMenu", "by Customer...");
    
    waitForObject(":_customerType.All Customer Types_QRadioButton");
    clickButton(":_customerType.All Customer Types_QRadioButton");
    waitForObject(":Time-Phased Bookings by Customer._calendar_CalendarComboBox");
    clickItem(":Time-Phased Bookings by Customer._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Bookings by Customer.Query_QPushButton");
    clickButton(":Time-Phased Bookings by Customer.Query_QPushButton");
    
    waitForObject(":Time-Phased Bookings by Customer.Submit_QPushButton");
    clickButton(":Time-Phased Bookings by Customer.Submit_QPushButton");
    
    waitForObject(":Time-Phased Bookings by Customer._fromEmail_XLineEdit");
    type(":Time-Phased Bookings by Customer._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Bookings by Customer._email_XLineEdit");
    type(":Time-Phased Bookings by Customer._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Bookings by Customer.Submit_QPushButton_2");
    clickButton(":Time-Phased Bookings by Customer.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Bookings by Customer.Close_QPushButton");
    clickButton(":Time-Phased Bookings by Customer.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Booking by Customer");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Booking by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    activateItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    waitForObjectItem(":*.Time-Phased Bookings_QMenu", "by Item...");
    activateItem(":*.Time-Phased Bookings_QMenu", "by Item...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_9");
    clickButton(":_warehouse.All Sites_QRadioButton_9");
    waitForObject(":_productCategory.All Product Categories_QRadioButton");
    clickButton(":_productCategory.All Product Categories_QRadioButton");
    waitForObject(":Time-Phased Bookings by Item._calendar_CalendarComboBox");
    clickItem(":Time-Phased Bookings by Item._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Bookings by Item.Query_QPushButton");
    clickButton(":Time-Phased Bookings by Item.Query_QPushButton");
    
    waitForObject(":Time-Phased Bookings by Item.Submit_QPushButton");
    clickButton(":Time-Phased Bookings by Item.Submit_QPushButton");
    
    waitForObject(":Time-Phased Bookings by Item._fromEmail_XLineEdit");
    type(":Time-Phased Bookings by Item._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Bookings by Item._email_XLineEdit");
    type(":Time-Phased Bookings by Item._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Bookings by Item.Submit_QPushButton_2");
    clickButton(":Time-Phased Bookings by Item.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Bookings by Item.Close_QPushButton");
    clickButton(":Time-Phased Bookings by Item.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Booking by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Bookings by Product Category-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    activateItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    waitForObjectItem(":*.Time-Phased Bookings_QMenu", "by Product Category...");
    activateItem(":*.Time-Phased Bookings_QMenu", "by Product Category...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_10");
    clickButton(":_warehouse.All Sites_QRadioButton_10");
    waitForObject(":_productCategory.All Product Categories_QRadioButton_2");
    clickButton(":_productCategory.All Product Categories_QRadioButton_2");
    waitForObject(":_productCategory.All Product Categories_QRadioButton_2");
    clickButton(":_productCategory.All Product Categories_QRadioButton_2");
    waitForObject(":Time-Phased Bookings by Product Category._calendar_CalendarComboBox");
    clickItem(":Time-Phased Bookings by Product Category._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Bookings by Product Category.Query_QPushButton");
    clickButton(":Time-Phased Bookings by Product Category.Query_QPushButton");
    
    waitForObject(":Time-Phased Bookings by Product Category.Submit_QPushButton");
    clickButton(":Time-Phased Bookings by Product Category.Submit_QPushButton");
    
    waitForObject(":Time-Phased Bookings by Product Category._fromEmail_XLineEdit");
    type(":Time-Phased Bookings by Product Category._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Bookings by Product Category._email_XLineEdit");
    type(":Time-Phased Bookings by Product Category._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Bookings by Product Category.Submit_QPushButton_2");
    clickButton(":Time-Phased Bookings by Product Category.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Bookings by Product Category.Close_QPushButton");
    clickButton(":Time-Phased Bookings by Product Category.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Booking by Product Category");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Sales History by Customer Group-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Customer Group...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Customer Group...");
    
    waitForObject(":_customerGroup.All Customer Groups_QRadioButton");
    clickButton(":_customerGroup.All Customer Groups_QRadioButton");
    waitForObject(":_productCategory.All Product Categories_QRadioButton_3");
    clickButton(":_productCategory.All Product Categories_QRadioButton_3");
    waitForObject(":Time-Phased Sales History by Customer Group._calendar_CalendarComboBox");
    clickItem(":Time-Phased Sales History by Customer Group._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Sales History by Customer Group.Query_QPushButton");
    clickButton(":Time-Phased Sales History by Customer Group.Query_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Customer Group.Submit_QPushButton");
    clickButton(":Time-Phased Sales History by Customer Group.Submit_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Customer Group._fromEmail_XLineEdit");
    type(":Time-Phased Sales History by Customer Group._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Sales History by Customer Group._email_XLineEdit");
    type(":Time-Phased Sales History by Customer Group._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Sales History by Customer Group.Submit_QPushButton_2");
    clickButton(":Time-Phased Sales History by Customer Group.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Sales History by Customer Group.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Customer Group.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Customer Group");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Sales History by Customer-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Customer...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Customer...");
    
    waitForObject(":_customerType.All Customer Types_QRadioButton_2");
    clickButton(":_customerType.All Customer Types_QRadioButton_2");
    waitForObject(":_productCategory.All Product Categories_QRadioButton_4");
    clickButton(":_productCategory.All Product Categories_QRadioButton_4");
    waitForObject(":Time-Phased Sales History by Customer._calendar_CalendarComboBox");
    clickItem(":Time-Phased Sales History by Customer._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Sales History by Customer.Query_QPushButton");
    clickButton(":Time-Phased Sales History by Customer.Query_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Customer.Submit_QPushButton");
    clickButton(":Time-Phased Sales History by Customer.Submit_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Customer._fromEmail_XLineEdit");
    type(":Time-Phased Sales History by Customer._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Sales History by Customer._email_XLineEdit");
    type(":Time-Phased Sales History by Customer._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Sales History by Customer.Submit_QPushButton_2");
    clickButton(":Time-Phased Sales History by Customer.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Sales History by Customer.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Customer.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Customer");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Sales History by Customer by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Customer by Item...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Customer by Item...");
    
    waitForObject(":_customerType.All Customer Types_QRadioButton_3");
    clickButton(":_customerType.All Customer Types_QRadioButton_3");
    waitForObject(":_productCategory.All Product Categories_QRadioButton_5");
    clickButton(":_productCategory.All Product Categories_QRadioButton_5");
    waitForObject(":Time-Phased Sales History by Customer by Item._calendar_CalendarComboBox");
    clickItem(":Time-Phased Sales History by Customer by Item._calendar_CalendarComboBox","2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Sales History by Customer by Item.Query_QPushButton");
    clickButton(":Time-Phased Sales History by Customer by Item.Query_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Customer by Item.Submit_QPushButton");
    clickButton(":Time-Phased Sales History by Customer by Item.Submit_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Customer by Item._fromEmail_XLineEdit");
    type(":Time-Phased Sales History by Customer by Item._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Sales History by Customer by Item._email_XLineEdit");
    type(":Time-Phased Sales History by Customer by Item._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Sales History by Customer by Item.Submit_QPushButton_2");
    clickButton(":Time-Phased Sales History by Customer by Item.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Sales History by Customer by Item.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Customer by Item.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Customer by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Sales History by Product Category-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Product Category...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Product Category...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_11");
    clickButton(":_warehouse.All Sites_QRadioButton_11");
    waitForObject(":_productCategory.All Product Categories_QRadioButton_6");
    clickButton(":_productCategory.All Product Categories_QRadioButton_6");
    waitForObject(":Time-Phased Sales History by Product Category._calendar_CalendarComboBox");
    clickItem(":Time-Phased Sales History by Product Category._calendar_CalendarComboBox", "2008", 5,5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Sales History by Product Category.Query_QPushButton");
    clickButton(":Time-Phased Sales History by Product Category.Query_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Product Category.Submit_QPushButton");
    clickButton(":Time-Phased Sales History by Product Category.Submit_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Product Category._fromEmail_XLineEdit");
    type(":Time-Phased Sales History by Product Category._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Sales History by Product Category._email_XLineEdit");
    type(":Time-Phased Sales History by Product Category._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Sales History by Product Category.Submit_QPushButton_2");
    clickButton(":Time-Phased Sales History by Product Category.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Sales History by Product Category.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Product Category.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Product Category");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Sales History by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Item...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Item...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_12");
    clickButton(":_warehouse.All Sites_QRadioButton_12");
    waitForObject(":_productCategory.All Product Categories_QRadioButton_7");
    clickButton(":_productCategory.All Product Categories_QRadioButton_7");
    waitForObject(":Time-Phased Sales History by Item._calendar_CalendarComboBox");
    clickItem(":Time-Phased Sales History by Item._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Sales History by Item.Query_QPushButton");
    clickButton(":Time-Phased Sales History by Item.Query_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Item.Submit_QPushButton");
    clickButton(":Time-Phased Sales History by Item.Submit_QPushButton");
    
    waitForObject(":Time-Phased Sales History by Item._fromEmail_XLineEdit");
    type(":Time-Phased Sales History by Item._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Sales History by Item._email_XLineEdit");
    type(":Time-Phased Sales History by Item._email_XLineEdit", toemail);
    
    waitForObject(":Time-Phased Sales History by Item.Submit_QPushButton_2");
    clickButton(":Time-Phased Sales History by Item.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Sales History by Item.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Item.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Usage Statistics by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":*.Inventory_QMenu", "Reports");
    activateItem(":*.Inventory_QMenu", "Reports");
    waitForObjectItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
    activateItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
    
    waitForObject(":_itemGroup...._QPushButton_3");
    clickButton(":_itemGroup...._QPushButton_3");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "YTRUCK1", 26, 6, 0, Qt.LeftButton);
    waitForObject(":_warehouse.All Sites_QRadioButton_13");
    clickButton(":_warehouse.All Sites_QRadioButton_13");
    waitForObject(":Time-Phased Item Usage Statistics by Item._calendar_CalendarComboBox");
    clickItem(":Time-Phased Item Usage Statistics by Item._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Time-Phased Item Usage Statistics by Item.Query_QPushButton");
    clickButton(":Time-Phased Item Usage Statistics by Item.Query_QPushButton");
    
    waitForObject(":Time-Phased Item Usage Statistics by Item.Submit_QPushButton");
    clickButton(":Time-Phased Item Usage Statistics by Item.Submit_QPushButton");
    
    waitForObject(":Time-Phased Item Usage Statistics by Item._fromEmail_XLineEdit");
    type(":Time-Phased Item Usage Statistics by Item._fromEmail_XLineEdit", fromemail);
    waitForObject(":Time-Phased Item Usage Statistics by Item._email_XLineEdit");
    type(":Time-Phased Item Usage Statistics by Item._email_XLineEdit",toemail);
    
    waitForObject(":Time-Phased Item Usage Statistics by Item.Submit_QPushButton_2");
    clickButton(":Time-Phased Item Usage Statistics by Item.Submit_QPushButton_2");
    
    waitForObject(":Time-Phased Item Usage Statistics by Item.Close_QPushButton");
    clickButton(":Time-Phased Item Usage Statistics by Item.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Usage Statistics by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Actual Costs by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
    activateItem(":xTuple ERP: *_QMenuBar", "Products");
    waitForObjectItem(":*.Products_QMenu", "Costing");
    activateItem(":*.Products_QMenu", "Costing");
    waitForObjectItem(":*.Costing_QMenu", "Update Actual Costs");
    activateItem(":*.Costing_QMenu", "Update Actual Costs");
    waitForObjectItem(":*.Update Actual Costs_QMenu", "by Item...");
    activateItem(":*.Update Actual Costs_QMenu", "by Item...");
    
    waitForObject(":Update Actual Costs by Item...._QPushButton");
    clickButton(":Update Actual Costs by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Update Actual Costs by Item.Select all Costs_QPushButton");
    clickButton(":Update Actual Costs by Item.Select all Costs_QPushButton");
    
    waitForObject(":Update Actual Costs by Item.Submit_QPushButton");
    clickButton(":Update Actual Costs by Item.Submit_QPushButton"); 
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Actual Costs by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Actual Costs by Classcode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
    activateItem(":xTuple ERP: *_QMenuBar", "Products");
    waitForObjectItem(":*.Products_QMenu", "Costing");
    activateItem(":*.Products_QMenu", "Costing");
    waitForObjectItem(":*.Costing_QMenu", "Update Actual Costs");
    activateItem(":*.Costing_QMenu", "Update Actual Costs");
    waitForObjectItem(":*.Update Actual Costs_QMenu", "by Class Code...");
    activateItem(":*.Update Actual Costs_QMenu", "by Class Code...");
    
    waitForObject(":_classCode.All Class Codes_QRadioButton");
    clickButton(":_classCode.All Class Codes_QRadioButton");
    waitForObject(":Update Actual Costs by Class Code.Select all Costs_QPushButton");
    clickButton(":Update Actual Costs by Class Code.Select all Costs_QPushButton");
    
    waitForObject(":Update Actual Costs by Class Code.Submit_QPushButton");
    clickButton(":Update Actual Costs by Class Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Actual Costs by Classcode ");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Actual Costs by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
    activateItem(":xTuple ERP: *_QMenuBar", "Products");
    waitForObjectItem(":*.Products_QMenu", "Costing");
    activateItem(":*.Products_QMenu", "Costing");
    waitForObjectItem(":*.Costing_QMenu", "Post Actual Costs");
    activateItem(":*.Costing_QMenu", "Post Actual Costs");
    waitForObjectItem(":*.Post Actual Costs_QMenu", "by Item...");
    activateItem(":*.Post Actual Costs_QMenu", "by Item...");
    
    waitForObject(":Post Actual Costs by Item...._QPushButton");
    clickButton(":Post Actual Costs by Item...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Post Actual Costs by Item.Select all Costs_QPushButton");
    clickButton(":Post Actual Costs by Item.Select all Costs_QPushButton");
    
    waitForObject(":Post Actual Costs by Item.Submit_QPushButton");
    clickButton(":Post Actual Costs by Item.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Post Actual Costs by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Actual Costs by Classcode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
    activateItem(":xTuple ERP: *_QMenuBar", "Products");
    waitForObjectItem(":*.Products_QMenu", "Costing");
    activateItem(":*.Products_QMenu", "Costing");
    waitForObjectItem(":*.Costing_QMenu", "Post Actual Costs");
    activateItem(":*.Costing_QMenu", "Post Actual Costs");
    waitForObjectItem(":*.Post Actual Costs_QMenu", "by Class Code...");
    activateItem(":*.Post Actual Costs_QMenu", "by Class Code...");
    
    waitForObject(":_classCode.All Class Codes_QRadioButton_2");
    clickButton(":_classCode.All Class Codes_QRadioButton_2");
    waitForObject(":Post Actual Costs by Class Code.Select all Costs_QPushButton");
    clickButton(":Post Actual Costs by Class Code.Select all Costs_QPushButton");
    
    waitForObject(":Post Actual Costs by Class Code.Submit_QPushButton");
    clickButton(":Post Actual Costs by Class Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Post Actual Costs by Classcode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Standard Costs by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
    activateItem(":xTuple ERP: *_QMenuBar", "Products");
    waitForObjectItem(":*.Products_QMenu", "Costing");
    activateItem(":*.Products_QMenu", "Costing");
    waitForObjectItem(":*.Costing_QMenu", "Post Standard Costs");
    activateItem(":*.Costing_QMenu", "Post Standard Costs");
    waitForObjectItem(":*.Post Standard Costs_QMenu", "by Item...");
    activateItem(":*.Post Standard Costs_QMenu", "by Item...");
    
    waitForObject(":Update Standard Costs By Item...._QPushButton");
    clickButton(":Update Standard Costs By Item...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Update Standard Costs By Item.Select all Costs_QPushButton");
    clickButton(":Update Standard Costs By Item.Select all Costs_QPushButton");
    
    waitForObject(":Update Standard Costs By Item.Submit_QPushButton");
    clickButton(":Update Standard Costs By Item.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Post Standard Costs by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Standard Costs by Classcode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
    activateItem(":xTuple ERP: *_QMenuBar", "Products");
    waitForObjectItem(":*.Products_QMenu", "Costing");
    activateItem(":*.Products_QMenu", "Costing");
    waitForObjectItem(":*.Costing_QMenu", "Post Standard Costs");
    activateItem(":*.Costing_QMenu", "Post Standard Costs");
    waitForObjectItem(":*.Post Standard Costs_QMenu", "by Class Code...");
    activateItem(":*.Post Standard Costs_QMenu", "by Class Code...");
    
    waitForObject(":_classCode.All Class Codes_QRadioButton_3");
    clickButton(":_classCode.All Class Codes_QRadioButton_3");
    waitForObject(":Update Standard Costs By Class Code.Select all Costs_QPushButton");
    clickButton(":Update Standard Costs By Class Code.Select all Costs_QPushButton");
    
    waitForObject(":Update Standard Costs By Class Code.Submit_QPushButton");
    clickButton(":Update Standard Costs By Class Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Post Standard Costs by Classcode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Order Upto Level by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":*.Inventory_QMenu", "Utilities");
    activateItem(":*.Inventory_QMenu", "Utilities");
    waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
    activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
    waitForObjectItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
    activateItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
    waitForObjectItem(":*.Order Up To Levels_QMenu", "by Item...");
    activateItem(":*.Order Up To Levels_QMenu", "by Item...");
    
    waitForObject(":_itemGroup...._QPushButton_4");
    clickButton(":_itemGroup...._QPushButton_4");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_warehouse.All Sites_QRadioButton_14");
    clickButton(":_warehouse.All Sites_QRadioButton_14");
    waitForObject(":Periods to Include in Analysis._calendar_CalendarComboBox");
    clickItem(":Periods to Include in Analysis._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Update Order Up To Level by Item.Submit_QPushButton");
    clickButton(":Update Order Up To Level by Item.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Order Upto Level by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Order Upto Level by Plannercode-----   
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":*.Inventory_QMenu", "Utilities");
    activateItem(":*.Inventory_QMenu", "Utilities");
    waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
    activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
    waitForObjectItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
    activateItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
    waitForObjectItem(":*.Order Up To Levels_QMenu", "by Planner Code...");
    activateItem(":*.Order Up To Levels_QMenu", "by Planner Code...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_15");
    clickButton(":_warehouse.All Sites_QRadioButton_15");
    waitForObject(":_plannerCode.All Planner Codes_QRadioButton_9");
    clickButton(":_plannerCode.All Planner Codes_QRadioButton_9");
    waitForObjectItem(":Periods to Include in Analysis._calendar_CalendarComboBox_5", "2008");
    clickItem(":Periods to Include in Analysis._calendar_CalendarComboBox_5", "2008", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Update Order Up To Levels by Planner Code.Submit_QPushButton");
    clickButton(":Update Order Up To Levels by Planner Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Order Upto Level by Plannercode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Order Upto Level by Classcode-----    
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":*.Inventory_QMenu", "Utilities");
    activateItem(":*.Inventory_QMenu", "Utilities");
    waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
    activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
    waitForObjectItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
    activateItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
    waitForObjectItem(":*.Order Up To Levels_QMenu", "by Class Code...");
    activateItem(":*.Order Up To Levels_QMenu", "by Class Code...");
    
    waitForObject(":_warehouse.All Sites_QRadioButton_16");
    clickButton(":_warehouse.All Sites_QRadioButton_16");
    waitForObject(":_classCode.All Class Codes_QRadioButton_4");
    clickButton(":_classCode.All Class Codes_QRadioButton_4");
    waitForObjectItem(":Periods to Include in Analysis._calendar_CalendarComboBox_6", "2008");
    clickItem(":Periods to Include in Analysis._calendar_CalendarComboBox_6", "2008", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Update Order Up To Levels by Class Code.Submit_QPushButton");
    clickButton(":Update Order Up To Levels by Class Code.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Order Upto Level by Classcode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Reorder Level by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":*.Inventory_QMenu", "Utilities");
    activateItem(":*.Inventory_QMenu", "Utilities");
    waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
    activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
    waitForObjectItem(":*.Update Item Controls_QMenu", "Reorder Levels");
    activateItem(":*.Update Item Controls_QMenu", "Reorder Levels");
    waitForObjectItem(":*.Reorder Levels_QMenu", "by Item...");
    activateItem(":*.Reorder Levels_QMenu", "by Item...");
    
    waitForObject(":_stack...._QPushButton");
    clickButton(":_stack...._QPushButton"); 
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Site Selection.All Sites_QRadioButton");
    clickButton(":Site Selection.All Sites_QRadioButton");
    waitForObject(":Options.Update Immediately_QRadioButton");
    clickButton(":Options.Update Immediately_QRadioButton");
    waitForObjectItem(":Periods to Include in Analysis._calendar_CalendarComboBox_2", "2008");
    clickItem(":Periods to Include in Analysis._calendar_CalendarComboBox_2", "2008", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":_criteriaTab.Submit_QPushButton");
    clickButton(":_criteriaTab.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Reorder Level by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Reorder Level by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":*.Inventory_QMenu", "Utilities");
    activateItem(":*.Inventory_QMenu", "Utilities");
    waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
    activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
    waitForObjectItem(":*.Update Item Controls_QMenu", "Reorder Levels");
    activateItem(":*.Update Item Controls_QMenu", "Reorder Levels");
    waitForObjectItem(":*.Reorder Levels_QMenu", "by Planner Code...");
    activateItem(":*.Reorder Levels_QMenu", "by Planner Code...");
    
    waitForObject(":_parameter.All Planner Codes_QRadioButton");
    clickButton(":_parameter.All Planner Codes_QRadioButton");
    waitForObject(":Site Selection.All Sites_QRadioButton_2");
    clickButton(":Site Selection.All Sites_QRadioButton_2");
    waitForObject(":Options.Update Immediately_QRadioButton_2");
    clickButton(":Options.Update Immediately_QRadioButton_2");
    waitForObject(":Periods to Include in Analysis._calendar_CalendarComboBox_3");
    clickItem(":Periods to Include in Analysis._calendar_CalendarComboBox_3", "2008", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":_criteriaTab.Submit_QPushButton_2");
    clickButton(":_criteriaTab.Submit_QPushButton_2");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Reorder Level by Plannercode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Reorder Level by Classcode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":*.Inventory_QMenu", "Utilities");
    activateItem(":*.Inventory_QMenu", "Utilities");
    waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
    activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
    waitForObjectItem(":*.Update Item Controls_QMenu", "Reorder Levels");
    activateItem(":*.Update Item Controls_QMenu", "Reorder Levels");
    waitForObjectItem(":*.Reorder Levels_QMenu", "by Class Code...");
    activateItem(":*.Reorder Levels_QMenu", "by Class Code...");
    
    waitForObject(":_parameter.All Class Codes_QRadioButton");
    clickButton(":_parameter.All Class Codes_QRadioButton");
    waitForObject(":Site Selection.All Sites_QRadioButton_3");
    clickButton(":Site Selection.All Sites_QRadioButton_3");
    waitForObject(":Options.Update Immediately_QRadioButton_3");
    clickButton(":Options.Update Immediately_QRadioButton_3");
    waitForObject(":Periods to Include in Analysis._calendar_CalendarComboBox_4");
    clickItem(":Periods to Include in Analysis._calendar_CalendarComboBox_4", "2008", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":_criteriaTab.Submit_QPushButton_3");
    clickButton(":_criteriaTab.Submit_QPushButton_3");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Reorder Level by Classcode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Open AP Items------
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Payable");
    activateItem(":*.Accounting_QMenu", "Accounts Payable");
    waitForObjectItem(":*.Accounts Payable_QMenu", "Reports");
    activateItem(":*.Accounts Payable_QMenu", "Reports");
    waitForObjectItem(":*.Reports_QMenu_3", "Aging...");
    activateItem(":*.Reports_QMenu_3", "Aging...");
    
    waitForObject(":Payables Aging._select_XComboBox");
    clickItem(":Payables Aging._select_XComboBox", "All Vendors", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Payables Aging.Query_QPushButton");
    clickButton(":Payables Aging.Query_QPushButton");
    
    waitForObject(":Payables Aging.Submit_QPushButton");
    clickButton(":Payables Aging.Submit_QPushButton");
    waitForObject(":Payables Aging._fromEmail_XLineEdit");
    type(":Payables Aging._fromEmail_XLineEdit", fromemail);
    waitForObject(":Payables Aging._email_XLineEdit");
    type(":Payables Aging._email_XLineEdit", toemail);
    
    waitForObject(":Payables Aging.Submit_QPushButton_2");
    clickButton(":Payables Aging.Submit_QPushButton_2");
    
    waitForObject(":Payables Aging.Close_QPushButton");
    clickButton(":Payables Aging.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Open AP Items");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Open AR Items------   
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
    activateItem(":*.Accounts Receivable_QMenu", "Reports");
    waitForObjectItem(":*.Reports_QMenu_4", "Aging...");
    activateItem(":*.Reports_QMenu_4", "Aging...");
    
    waitForObject(":Receivables Aging._select_XComboBox");
    clickItem(":Receivables Aging._select_XComboBox", "All Customers", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Receivables Aging.Query_QPushButton");
    clickButton(":Receivables Aging.Query_QPushButton");
    
    waitForObject(":Receivables Aging.Submit_QPushButton");
    clickButton(":Receivables Aging.Submit_QPushButton");
    waitForObject(":Receivables Aging._fromEmail_XLineEdit");
    type(":Receivables Aging._fromEmail_XLineEdit", fromemail);
    waitForObject(":Receivables Aging._email_XLineEdit");
    type(":Receivables Aging._email_XLineEdit", toemail);
    
    waitForObject(":Receivables Aging.Submit_QPushButton_2");
    clickButton(":Receivables Aging.Submit_QPushButton_2");
    
    waitForObject(":Receivables Aging.Close_QPushButton");
    clickButton(":Receivables Aging.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Open AR Items");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create Recurring Invoice-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Utilities");
    activateItem(":*.Accounting_QMenu", "Utilities");
    waitForObjectItem(":*.Utilities_QMenu_3", "Create Recurring Invoices...");
    activateItem(":*.Utilities_QMenu_3", "Create Recurring Invoices...");
    
    waitForObject(":Create Recurring Invoices.Submit_QPushButton");
    clickButton(":Create Recurring Invoices.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Creating Recurring Invoices");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create an Invoice-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Billing");
    activateItem(":*.Sales_QMenu", "Billing");
    waitForObjectItem(":*.Billing_QMenu", "Invoice");
    activateItem(":*.Billing_QMenu", "Invoice");
    type(":*.Billing_QMenu","<Right>");
    type(":*.Billing_QMenu","<Right>");
    waitForObjectItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
    activateItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
    waitForObject(":Item...._QPushButton");
    clickButton(":Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "25");
    waitForObject(":_billed_XLineEdit");
    type(":_billed_XLineEdit", "25");
    
    waitForObject(":Invoice.Save_QPushButton");
    clickButton(":Invoice.Save_QPushButton");
    waitForObject(":Invoice.Save_QPushButton_2");
    clickButton(":Invoice.Save_QPushButton_2");
    
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");
    
    //-----Print Invoices(Sales)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Billing");
    activateItem(":*.Sales_QMenu", "Billing");
    waitForObjectItem(":*.Billing_QMenu", "Forms");
    activateItem(":*.Billing_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu_2", "Print Invoices...");
    activateItem(":*.Forms_QMenu_2", "Print Invoices...");
    
    waitForObject(":Print Invoices.Print_QPushButton");
    clickButton(":Print Invoices.Print_QPushButton");    
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":Mark Invoices as Printed?.Yes_QPushButton");
    clickButton(":Mark Invoices as Printed?.Yes_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Invoices from Sales");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create an Invoice-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Billing");
    activateItem(":*.Sales_QMenu", "Billing");
    waitForObjectItem(":*.Billing_QMenu", "Invoice");
    activateItem(":*.Billing_QMenu", "Invoice");
    type(":*.Billing_QMenu","<Right>");
    type(":*.Billing_QMenu","<Right>");
    waitForObjectItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
    activateItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
    
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
    waitForObject(":Item...._QPushButton");
    clickButton(":Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);   
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "25");
    waitForObject(":_billed_XLineEdit");
    type(":_billed_XLineEdit", "25");
    
    waitForObject(":Invoice.Save_QPushButton");
    clickButton(":Invoice.Save_QPushButton");
    waitForObject(":Invoice.Save_QPushButton_2");
    clickButton(":Invoice.Save_QPushButton_2");
    
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");
    
    //-----Print Invoice by Ship via-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Billing");
    activateItem(":*.Sales_QMenu", "Billing");
    waitForObjectItem(":*.Billing_QMenu", "Forms");
    activateItem(":*.Billing_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu_2", "Print Invoices by Ship Via...");
    activateItem(":*.Forms_QMenu_2", "Print Invoices by Ship Via...");
    
    waitForObject(":Print Invoices by Ship Via.Print_QPushButton");
    clickButton(":Print Invoices by Ship Via.Print_QPushButton");
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":Mark Invoices as Printed?.Yes_QPushButton");
    clickButton(":Mark Invoices as Printed?.Yes_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Invoices by Shipvia");
    
    else test.fail("Batch Manager not responding");
    
    //-----Re-Print Invoices-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Billing");
    activateItem(":*.Sales_QMenu", "Billing");
    waitForObjectItem(":*.Billing_QMenu", "Forms");
    activateItem(":*.Billing_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu_2", "Re-Print Invoices...");
    activateItem(":*.Forms_QMenu_2", "Re-Print Invoices...");
    
    waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit");
    type(":Re-Print Invoices.XDateEdit_XDateEdit", "-30"); 
    waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit_2");
    type(":Re-Print Invoices.XDateEdit_XDateEdit_2", "0");
    waitForObject(":Re-Print Invoices.Query_QPushButton");
    clickButton(":Re-Print Invoices.Query_QPushButton");
    waitForObject(":_invoice_XTreeWidget");
    clickItem(":_invoice_XTreeWidget", "TTOYS - Tremendous Toys Incorporated", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Re-Print Invoices.Print_QPushButton");
    clickButton(":Re-Print Invoices.Print_QPushButton");
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":Re-Print Invoices.Close_QPushButton");
    clickButton(":Re-Print Invoices.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Re-Printing Invoices from Sales");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Invoices(Sales)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Billing");
    activateItem(":*.Sales_QMenu", "Billing");
    waitForObjectItem(":*.Billing_QMenu", "Forms");
    activateItem(":*.Billing_QMenu", "Forms");
    
    waitForObjectItem(":*.Forms_QMenu_2", "Send Electronic Invoice...");
    activateItem(":*.Forms_QMenu_2", "Send Electronic Invoice...");
    waitForObject(":_listTab_XTreeWidget_5");
    doubleClickItem(":_listTab_XTreeWidget_5", "Tremendous Toys Incorporated", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Posting Invoices from Sales module");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create an Invoice-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Billing");
    activateItem(":*.Sales_QMenu", "Billing");
    waitForObjectItem(":*.Billing_QMenu", "Invoice");
    activateItem(":*.Billing_QMenu", "Invoice");
    type(":*.Billing_QMenu","<Right>");
    type(":*.Billing_QMenu","<Right>");
    waitForObjectItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
    activateItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
    waitForObject(":List Unposted Invoices.New_QPushButton");
    clickButton(":List Unposted Invoices.New_QPushButton");
    
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
    waitForObject(":Item...._QPushButton");
    clickButton(":Item...._QPushButton");
    waitForObject(":_item_XTreeWidget_6");
    doubleClickItem(":_item_XTreeWidget_6", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_ordered_XLineEdit_2");
    type(":_ordered_XLineEdit_2", "25");
    waitForObject(":_billed_XLineEdit");
    type(":_billed_XLineEdit", "25");
    
    waitForObject(":Invoice.Save_QPushButton");
    clickButton(":Invoice.Save_QPushButton");
    waitForObject(":Invoice.Save_QPushButton_2");
    clickButton(":Invoice.Save_QPushButton_2");
    
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");  
    
    //-----Print Invoices(AR)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":*.Accounts Receivable_QMenu", "Forms");
    activateItem(":*.Accounts Receivable_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu_4", "Print Invoices...");
    activateItem(":*.Forms_QMenu_4", "Print Invoices...");
    
    waitForObject(":Print Invoices.Print_QPushButton");
    clickButton(":Print Invoices.Print_QPushButton");
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":Mark Invoices as Printed?.Yes_QPushButton");
    clickButton(":Mark Invoices as Printed?.Yes_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Invoices from AR module");
    
    else test.fail("Batch Manager not responding");
    
    //-----Re-Print Invoices(AR)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":*.Accounts Receivable_QMenu", "Forms");
    activateItem(":*.Accounts Receivable_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu_4", "Re-Print Invoices...");
    activateItem(":*.Forms_QMenu_4", "Re-Print Invoices...");
    
    waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit");
    type(":Re-Print Invoices.XDateEdit_XDateEdit", "-30");
    waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit_2");
    type(":Re-Print Invoices.XDateEdit_XDateEdit_2", "0");
    waitForObject(":Re-Print Invoices.Query_QPushButton");
    clickButton(":Re-Print Invoices.Query_QPushButton");
    waitForObject(":_invoice_XTreeWidget");
    clickItem(":_invoice_XTreeWidget", "TTOYS - Tremendous Toys Incorporated", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Re-Print Invoices.Print_QPushButton");
    clickButton(":Re-Print Invoices.Print_QPushButton");
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":Re-Print Invoices.Close_QPushButton");
    clickButton(":Re-Print Invoices.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Re-Printing Invoices from AR module");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Invoices(AR)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":*.Accounts Receivable_QMenu", "Invoice");
    activateItem(":*.Accounts Receivable_QMenu", "Invoice");
    
    waitForObjectItem(":*.Invoice_QMenu", "Send Electronic Invoice...");
    activateItem(":*.Invoice_QMenu", "Send Electronic Invoice...");
    waitForObject(":_listTab_XTreeWidget_5");
    doubleClickItem(":_listTab_XTreeWidget_5", "Tremendous Toys Incorporated", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Posting Invoices from AR module");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Standard Journal-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "General Ledger");
    activateItem(":*.Accounting_QMenu", "General Ledger");
    waitForObjectItem(":*.General Ledger_QMenu", "Standard Journals");
    activateItem(":*.General Ledger_QMenu", "Standard Journals");
    waitForObjectItem(":*.Standard Journals_QMenu", "Post...");
    activateItem(":*.Standard Journals_QMenu", "Post...");
    
    waitForObjectItem(":_stdjrnl_XComboBox", "Receive Product");
    clickItem(":_stdjrnl_XComboBox", "Receive Product", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Post Standard Journal.XDateEdit_XDateEdit");
    type(":Post Standard Journal.XDateEdit_XDateEdit", "+7");
    
    waitForObject(":Post Standard Journal.Submit_QPushButton");
    clickButton(":Post Standard Journal.Submit_QPushButton");
    waitForObject(":Series G/L Journal Entry.Submit_QPushButton");
    clickButton(":Series G/L Journal Entry.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    waitForObject(":Post Standard Journal.Close_QPushButton");
    clickButton(":Post Standard Journal.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Posting Standard Journal");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Standard Journal Group-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "General Ledger");
    activateItem(":*.Accounting_QMenu", "General Ledger");
    waitForObjectItem(":*.General Ledger_QMenu", "Standard Journals");
    activateItem(":*.General Ledger_QMenu", "Standard Journals");
    waitForObjectItem(":*.Standard Journals_QMenu", "Post Group...");
    activateItem(":*.Standard Journals_QMenu", "Post Group...");
    
    waitForObjectItem(":_stdjrnlgrp_XComboBox", "PERIOD\\_END");
    clickItem(":_stdjrnlgrp_XComboBox", "PERIOD\\_END", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Post Standard Journal Group.XDateEdit_XDateEdit");
    type(":Post Standard Journal Group.XDateEdit_XDateEdit", "+8");
    
    waitForObject(":Post Standard Journal Group.Submit_QPushButton");
    clickButton(":Post Standard Journal Group.Submit_QPushButton");
    waitForObject(":Series G/L Journal Entry.Submit_QPushButton");
    clickButton(":Series G/L Journal Entry.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    waitForObject(":Post Standard Journal Group.Close_QPushButton");
    clickButton(":Post Standard Journal Group.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Posting Standard Journal Group");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Late Customer Credit Status-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Utilities");
    activateItem(":*.Accounting_QMenu", "Utilities");
    waitForObjectItem(":*.Utilities_QMenu_3", "Update Late Customer Credit Status...");
    activateItem(":*.Utilities_QMenu_3", "Update Late Customer Credit Status...");
    
    waitForObject(":Update Late Customer Credit Status.Submit_QPushButton");
    clickButton(":Update Late Customer Credit Status.Submit_QPushButton");
    waitForObject(":Submit Action to Batch Manager._email_XLineEdit");
    type(":Submit Action to Batch Manager._email_XLineEdit", toemail);
    
    waitForObject(":Submit Action to Batch Manager.Submit_QPushButton");
    clickButton(":Submit Action to Batch Manager.Submit_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Late Customer Credit Status");
    
    else test.fail("Batch Manager not responding");
    
    //-----Print CreditMemo-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
    activateItem(":*.Accounts Receivable_QMenu", "Reports");
    waitForObjectItem(":*.Reports_QMenu_4", "Open Receivables...");
    activateItem(":*.Reports_QMenu_4", "Open Receivables...");
    
    waitForObjectItem(":Open Receivables._select_XComboBox", "All Customers");
    clickItem(":Open Receivables._select_XComboBox", "All Customers", 105, 6, 1, Qt.LeftButton);
    waitForObject(":Show.Credits_QRadioButton");
    clickButton(":Show.Credits_QRadioButton");
    if(!findObject(":Show.Unposted_XCheckBox").checked)
        clickButton(":Show.Unposted_XCheckBox");
    
    waitForObject(":Open Receivables.Query_QPushButton");
    clickButton(":Open Receivables.Query_QPushButton");
    waitForObject(":_frame._aropen_XTreeWidget");
    clickItem(":_frame._aropen_XTreeWidget", "No", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_frame.Print_QPushButton");
    clickButton(":_frame.Print_QPushButton");
    waitForObject(":Open Receivables.Print_QPushButton");
    clickButton(":Open Receivables.Print_QPushButton");
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":Open Receivables.Close_QPushButton");
    clickButton(":Open Receivables.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Credit Memos");
    
    else test.fail("Batch Manager not responding");
    
    //-----Print Statement by Customer-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":*.Accounts Receivable_QMenu", "Forms");
    activateItem(":*.Accounts Receivable_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu_4", "Print Statement by Customer...");
    activateItem(":*.Forms_QMenu_4", "Print Statement by Customer...");
    
    waitForObject(":Print Statement by Customer...._QPushButton");
    clickButton(":Print Statement by Customer...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_12");
    doubleClickItem(":_listTab_XTreeWidget_12", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Print Statement by Customer.Print_QPushButton");
    clickButton(":Print Statement by Customer.Print_QPushButton");
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Print Statement by Customer.Close_QPushButton");
    clickButton(":Print Statement by Customer.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Statement by Customer");
    
    else test.fail("Batch Manager not responding");
    
    //-----Print Statement by Customer Type-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":*.Accounts Receivable_QMenu", "Forms");
    activateItem(":*.Accounts Receivable_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu_4", "Print Statements by Customer Type...");
    activateItem(":*.Forms_QMenu_4", "Print Statements by Customer Type...");
    
    waitForObject(":_customerTypes.All Customer Types_QRadioButton");
    clickButton(":_customerTypes.All Customer Types_QRadioButton");
    waitForObject(":Print Statements by Customer Type.Print_QPushButton");
    clickButton(":Print Statements by Customer Type.Print_QPushButton"); 
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Print Statements by Customer Type.Close_QPushButton");
    clickButton(":Print Statements by Customer Type.Close_QPushButton");
    
    //-----Operation Buffer Status-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
    activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
    waitForObjectItem(":*.Manufacture_QMenu", "Reports");
    activateItem(":*.Manufacture_QMenu", "Reports");
    waitForObjectItem(":*.Reports_QMenu_5", "Operation Buffer Status...");
    activateItem(":*.Reports_QMenu_5", "Operation Buffer Status...");
    
    waitForObject(":_wrkcnt_XComboBox");
    clickItem(":_wrkcnt_XComboBox", "ASSEMBLY1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":Work Order Operation Buffer Status by Work Center.Query_QPushButton");
    clickButton(":Work Order Operation Buffer Status by Work Center.Query_QPushButton");
    
    waitForObject(":Work Order Operation Buffer Status by Work Center.Submit_QPushButton");
    clickButton(":Work Order Operation Buffer Status by Work Center.Submit_QPushButton");
    waitForObject(":Work Order Operation Buffer Status by Work Center._fromEmail_XLineEdit");
    type(":Work Order Operation Buffer Status by Work Center._fromEmail_XLineEdit", fromemail);
    waitForObject(":Work Order Operation Buffer Status by Work Center._email_XLineEdit");
    type(":Work Order Operation Buffer Status by Work Center._email_XLineEdit", toemail);
    
    waitForObject(":Work Order Operation Buffer Status by Work Center.Submit_QPushButton_2");
    clickButton(":Work Order Operation Buffer Status by Work Center.Submit_QPushButton_2");
    
    waitForObject(":Work Order Operation Buffer Status by Work Center.Close_QPushButton");
    clickButton(":Work Order Operation Buffer Status by Work Center.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Operation Buffer Status");
    
    else test.fail("Batch Manager not responding");
    
    //-----Display AR Open Items-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
    activateItem(":*.Accounts Receivable_QMenu", "Reports");
    waitForObjectItem(":*.Reports_QMenu_4", "Open Receivables...");
    activateItem(":*.Reports_QMenu_4", "Open Receivables...");
    
    waitForObject(":Open Receivables._select_XComboBox");
    clickItem(":Open Receivables._select_XComboBox", "All Customers",5, 5, 1, Qt.LeftButton);
    waitForObject(":Date Range.Document_QRadioButton");
    clickButton(":Date Range.Document_QRadioButton");
    if(findObject(":Show.Only Items with Incidents_XCheckBox").checked)
        clickButton(":Show.Only Items with Incidents_XCheckBox");
    if(findObject(":Show.Unposted_XCheckBox").checked)
        clickButton(":Show.Unposted_XCheckBox");
    waitForObject(":Open Receivables.Query_QPushButton");
    clickButton(":Open Receivables.Query_QPushButton");
    
    waitForObject(":_frame._aropen_XTreeWidget");
    openContextMenu(":_frame._aropen_XTreeWidget", 5, 5, 0);
    waitForObjectItem(":*._menu_QMenu", "Print...");
    activateItem(":*._menu_QMenu", "Print...");
    waitForObject(":Open Receivables.Print_QPushButton");
    clickButton(":Open Receivables.Print_QPushButton");
    snooze(1);
    nativeType("<Tab>"); 
    nativeType("<Tab>");
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>"); 
    nativeType("<Tab>");    
    snooze(1);	  
    nativeType("<Return>");
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    waitForObject(":Open Receivables.Close_QPushButton");
    clickButton(":Open Receivables.Close_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Display AR Open Items");
    
    else test.fail("Batch Manager not responding");
    
    //-----Incident-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM");
    activateItem(":xTuple ERP: *_QMenuBar", "CRM");
    waitForObjectItem(":*.CRM_QMenu", "Incident");
    activateItem(":*.CRM_QMenu", "Incident");
    waitForObjectItem(":*.Incident_QMenu", "New...");
    activateItem(":*.Incident_QMenu", "New...");
    waitForObjectItem(":_category_XComboBox", "Customer");
    clickItem(":_category_XComboBox", "Customer", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":_description_QLineEdit");
    type(":_description_QLineEdit", "Paint Color");
    waitForObject(":_crmacctGroup...._QPushButton");
    clickButton(":_crmacctGroup...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_9");
    doubleClickItem(":_listTab_XTreeWidget_9", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Contact...._QPushButton");
    clickButton(":Contact...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_10");
    doubleClickItem(":_listTab_XTreeWidget_10", "Mike", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":Incident.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Incident.qt_tabwidget_tabbar_QTabBar", "Alarms");
    waitForObject(":_alarmTab.New_QPushButton");
    clickButton(":_alarmTab.New_QPushButton");
    waitForObject(":_alarmTab._alarmOffset_QSpinBox");
    findObject(":_alarmTab._alarmOffset_QSpinBox").clear();
    waitForObject(":_alarmTab._alarmOffset_QSpinBox");
    type(":_alarmTab._alarmOffset_QSpinBox", "1");
    waitForObjectItem(":_alarmTab._alarmQualifier_XComboBox", "minutes before");
    clickItem(":_alarmTab._alarmQualifier_XComboBox", "minutes before", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":_alarmGroup.Email_XCheckBox");
    clickButton(":_alarmGroup.Email_XCheckBox");
    
    waitForObject(":_alarmTab.Save_QPushButton");
    clickButton(":_alarmTab.Save_QPushButton");
    
    waitForObject(":Incident.Save_QPushButton");
    clickButton(":Incident.Save_QPushButton");
    test.log("Created an Incident with alarms");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Incidents");
    
    else test.fail("Batch Manager not responding");
    
    //------Create an EDI Profile-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: *.Master Information_QMenu", "EDI Profiles...");
    activateItem(":xTuple ERP: *.Master Information_QMenu", "EDI Profiles...");
    waitForObject(":List EDI Profiles.New_QPushButton");
    clickButton(":List EDI Profiles.New_QPushButton");
    waitForObject(":_name_QLineEdit");
    type(":_name_QLineEdit", "ZTOYS-Quote");
    waitForObjectItem(":_type_XComboBox", "EMail");
    clickItem(":_type_XComboBox", "EMail", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List EDI Profiles.Review Before Sending_QCheckBox");
    clickButton(":List EDI Profiles.Review Before Sending_QCheckBox");
    waitForObject(":_emailTo_QLineEdit");
    type(":_emailTo_QLineEdit", email);
    
    waitForObject(":_emailSubject_QLineEdit");
    type(":_emailSubject_QLineEdit", "Please find the Quote </docnumber> enclosed");
    
    waitForObject(":_emailBody_QTextEdit");
    type(":_emailBody_QTextEdit", "Hi ZTOYS,Please find enclosed the Quote </docnumber> Thanks.");
    
    waitForObject(":forms.New_QPushButton");
    clickButton(":forms.New_QPushButton");
    waitForObject(":List EDI Profiles.OK_QPushButton");
    clickButton(":List EDI Profiles.OK_QPushButton");
    
    waitForObjectItem(":_type_XComboBox_2", "Quote");
    clickItem(":_type_XComboBox_2", "Quote", 5, 5, 1, Qt.LeftButton);
    waitForObjectItem(":_output_XComboBox", "Report");
    clickItem(":_output_XComboBox", "Report", 5, 5, 1, Qt.LeftButton);
    waitForObject(":_file_QLineEdit");
    type(":_file_QLineEdit", "Report");
    waitForObjectItem(":_reportReport_XComboBox", "Quote");
    clickItem(":_reportReport_XComboBox", "Quote", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List EDI Profiles.OK_QPushButton_2");
    clickButton(":List EDI Profiles.OK_QPushButton_2");
    
    waitForObject(":List EDI Profiles.Save_QPushButton");
    clickButton(":List EDI Profiles.Save_QPushButton");
    
    waitForObject(":List EDI Profiles.Close_QPushButton");
    clickButton(":List EDI Profiles.Close_QPushButton");
    test.log("EDI Profile for ZTOYS-Quote is created");
    
    //-----Create a Prospect-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Prospect");
    activateItem(":*.Sales_QMenu", "Prospect");
    waitForObjectItem(":*.Prospect_QMenu", "List...");
    activateItem(":*.Prospect_QMenu", "List...");
    waitForObject(":List Prospects.New_QPushButton");
    clickButton(":List Prospects.New_QPushButton");
    
    waitForObject(":_number_XLineEdit");
    type(":_number_XLineEdit", "ZTOYS");
    waitForObject(":_name_QLineEdit_2");
    type(":_name_QLineEdit_2", "Zen Toys Ltd.");
    waitForObjectItem(":_salesrep_XComboBox", "1000-Sam Masters");
    clickItem(":_salesrep_XComboBox", "1000-Sam Masters", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Prospect...._QPushButton");
    clickButton(":Prospect...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_11");
    doubleClickItem(":_listTab_XTreeWidget_11", "Colin", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Prospect.Save_QPushButton");
    clickButton(":Prospect.Save_QPushButton");
    
    waitForObject(":List Prospects._prospect_XTreeWidget");
    if(!clickItem(":List Prospects._prospect_XTreeWidget", "ZTOYS", 5, 5, 1, Qt.LeftButton))
        test.pass("Prospect - ZTOYS created"); 
    else test.fail("Prospect - ZTOYS not created");
    
    //-----Attach an EDI Profile to Prospect-----
    waitForObject(":List Prospects._prospect_XTreeWidget");
    doubleClickItem(":List Prospects._prospect_XTreeWidget", "ZTOYS", 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":Prospect.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Prospect.qt_tabwidget_tabbar_QTabBar", "Transmission");
    
    waitForObject(":EDI Relationships.Attach_QPushButton");
    clickButton(":EDI Relationships.Attach_QPushButton");
    waitForObjectItem(":Prospect._doctype_XComboBox", "Quote");
    clickItem(":Prospect._doctype_XComboBox", "Quote", 5, 5, 1, Qt.LeftButton);
    waitForObjectItem(":_profile_XTreeWidget", "ZTOYS-Quote");
    clickItem(":_profile_XTreeWidget", "ZTOYS-Quote", 5, 5, 1, Qt.LeftButton);
    
    waitForObject(":Prospect.Attach_QPushButton");
    clickButton(":Prospect.Attach_QPushButton");
    
    waitForObject(":Prospect.Save_QPushButton");
    clickButton(":Prospect.Save_QPushButton");
    
    waitForObject(":List Prospects.Close_QPushButton");
    clickButton(":List Prospects.Close_QPushButton");
    
    //-----Create a Quote using Prospect-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Quote");
    activateItem(":*.Sales_QMenu", "Quote");
    waitForObjectItem(":*.Quote_QMenu", "New...");
    activateItem(":*.Quote_QMenu", "New...");
    waitForObject(":_headerPage...._QPushButton_3");
    clickButton(":_headerPage...._QPushButton_3");
    
    waitForObject(":_listTab_XTreeWidget_6");
    doubleClickItem(":_listTab_XTreeWidget_6", "ZTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    
    var quote = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
    
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_3");
    clickButton(":_lineItemsPage.New_QPushButton_3");
    waitForObject(":_itemGroup...._QPushButton_5");
    clickButton(":_itemGroup...._QPushButton_5");
    waitForObject(":_item_XTreeWidget_5");
    doubleClickItem(":_item_XTreeWidget_5", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "<Tab>");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "+7");
    
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
    
    waitForObject(":Quote.Close_QPushButton");
    clickButton(":Quote.Close_QPushButton");
    
    waitForObject(":Quote.Save_QPushButton_2");
    clickButton(":Quote.Save_QPushButton_2");
    
    waitForObject(":Quote.Cancel_QPushButton"); 
    clickButton(":Quote.Cancel_QPushButton");
    
    //-----Electronic Quote for Prospect-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Forms");
    activateItem(":*.Sales_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu_3", "Send Electronic Quote ...");
    activateItem(":*.Forms_QMenu_3", "Send Electronic Quote ...");
    
    waitForObject(":_listTab_XTreeWidget_7");
    doubleClickItem(":_listTab_XTreeWidget_7", quote, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":Review EDI Before Sending.Accept_QPushButton");
    clickButton(":Review EDI Before Sending.Accept_QPushButton");
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Quote using Prospects ");
    
    else test.fail("Batch Manager not responding");
    
    
}
