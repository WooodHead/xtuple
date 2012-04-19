//--***--This script is developed to execute Batch Manager Submissions only in Windows Environment--***--

//**********PRE-REQUISITES ***********

// (1) Ensure that the Batch Manager is running before executing this script
// (2) Install a dummy printer

function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    waitForObject(":Registration Key.Yes_QPushButton");
    clickButton(":Registration Key.Yes_QPushButton");
    
    var set = testData.dataset("login.tsv");
    var email;
    for(var records in set)
    {
        fromemail=testData.field(set[records],"FROM EMAIL");
        toemail=testData.field(set[records],"TO EMAIL");
        role=testData.field(set[records],"ROLE")
             if(role=="CONFIGURE") break;     
    }
    
    
    //---find Application Edition and Enable Batch Manager------ 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu", "Setup...");
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);  
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        
        waitForObjectItem(":Setup._tree_XTreeWidget", "Configure.xTuple Connect");
        clickItem(":Setup._tree_XTreeWidget", "Configure.xTuple Connect", 34, 7, 0, Qt.LeftButton);
        
        if(!findObject(":_stack.xTuple Connect Enabled_QGroupBox").checked)
            type(":_stack.xTuple Connect Enabled_QGroupBox"," ");
        waitForObject(":_batchEmail_QLineEdit_2");
        findObject(":_batchEmail_QLineEdit_2").clear();
        type(":_batchEmail_QLineEdit_2", "vinay.singu@zenqa.com");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Application Edition: "+appEdition);
        test.log("Batch Manager Option enabled");
        
    }
    catch(e)
    {
        test.fail("Error in Enabling Batch Manager: "+e);
    }
    
    //-----Assign All Privileges-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Maintain Users...");
        activateItem(":xTuple ERP: *.System_QMenu", "Maintain Users...");
        
        
        waitForObject(":List Users._usr_XTreeWidget");
        doubleClickItem(":List Users._usr_XTreeWidget", "admin", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_email_XLineEdit");
        findObject(":_email_XLineEdit").clear();
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
    }
    catch(e)
    {
        test.fail("Error in assigning privileges" + e);
    }
    
    //-----System Preferrences-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Preferences...");
        activateItem(":xTuple ERP: *.System_QMenu", "Preferences...");
        
        waitForObject(":_idleTimeout_QSpinBox");
        findObject(":_idleTimeout_QSpinBox").clear();
        waitForObject(":_idleTimeout_QSpinBox");
        type(":_idleTimeout_QSpinBox", "0");
        
        waitForObject(":User Preferences.Save_QPushButton_2");
        clickButton(":User Preferences.Save_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in assigning preferences" + e);
    }
    
    //-----Enable Sales Reservations-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales",10,10,0, Qt.LeftButton);
        
        if(!findObject(":general.Enable Sales Reservations_QCheckBox").checked)
            clickButton(":general.Enable Sales Reservations_QCheckBox");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");  
        test.log("Enabled Sales Reservations");
    }
    catch(e)
    {
        test.fail("Error in enabling sales reservations" + e);
    }
    
    //-----Exit the Application-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
        activateItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
    }
    catch(e)
    {
        test.fail("Error in exiting the Application " + e);
    }
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    waitForObject(":Registration Key.Yes_QPushButton");
    clickButton(":Registration Key.Yes_QPushButton");
    
    //-----Batch Manager-----
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "xTuple Connect Console...");
        activateItem(":xTuple ERP: *.System_QMenu", "xTuple Connect Console...");
        waitForObject(":Submitted By:.Current User_QRadioButton_2");
        clickButton(":Submitted By:.Current User_QRadioButton_2");
        if(!findObject(":_frame.Automatically Update_QCheckBox_2").checked)
            clickButton(":_frame.Automatically Update_QCheckBox_2");
        
        
        waitForObject(":xTuple Connect Console.Close_QPushButton_2");
        clickButton(":xTuple Connect Console.Close_QPushButton_2");
        test.log("xtconnect enabled");
    }
    catch(e)
    {
        test.fail("Error in verifying the status of batch manager" + e);
    }
    
    //-----Setup EDI Profiles-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu", "Setup...");
        waitForObject(":Master Information.EDI Profiles_QModelIndex");
        mouseClick(":Master Information.EDI Profiles_QModelIndex", 20, 2, 0, Qt.LeftButton);
        
        waitForObject(":_stack._ediprofile_XTreeWidget");
        
        var sWidgetTreeControl = ":_stack._ediprofile_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        waitForObject(":_stack._ediprofile_XTreeWidget");
        clickItem(":_stack._ediprofile_XTreeWidget", "email", 5, 5, 1, Qt.LeftButton);
        
        for(var loop=0; loop<findObject(":_stack._ediprofile_XTreeWidget").topLevelItemCount;loop++)
        {
            
            obj_TreeTopLevelItem = obj_TreeRootItem.child(loop);
            var text = obj_TreeTopLevelItem.text(1);
            if(obj_TreeTopLevelItem.text(1)== "email")
            {    
                waitForObject(":_stack.Edit_QPushButton");
                clickButton(":_stack.Edit_QPushButton");
                waitForObject(":_emailFrom_QLineEdit_3");
                findObject(":_emailFrom_QLineEdit_3").clear();
                type(":_emailFrom_QLineEdit_3", fromemail);
                waitForObject(":_emailReplyTo_QLineEdit_3");
                findObject(":_emailReplyTo_QLineEdit_3").clear();
                waitForObject(":_emailTo_QLineEdit_3");
                findObject(":_emailTo_QLineEdit_3").clear();
                type(":_emailTo_QLineEdit_3", toemail);
                waitForObject(":_emailCC_QLineEdit_2");
                findObject(":_emailCC_QLineEdit_2").clear();
                waitForObject(":_emailBCC_QLineEdit_2");
                findObject(":_emailBCC_QLineEdit_2").clear();
                
                waitForObject(":_stack.Save_QPushButton");
                clickButton(":_stack.Save_QPushButton");             
            }  
            
            waitForObject(":_stack._ediprofile_XTreeWidget");
            type(":_stack._ediprofile_XTreeWidget","<Down>"); 
        }
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in setting EDI profiles" + e);
    }
    
    
    
    //-----Attach EDI Profiles to Customer-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Customer");
        activateItem(":*.Sales_QMenu", "Customer");
        waitForObjectItem(":*.Customer_QMenu", "List...");
        activateItem(":*.Customer_QMenu", "List...");
        waitForObject(":Customers.Query_QToolButton");
        clickButton(":Customers.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget");
        doubleClickItem(":_list_XTreeWidget", "TTOYS", 115, 1, 0, Qt.LeftButton);
        waitForObject(":Customer.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Customer.qt_tabwidget_tabbar_QTabBar", "Transmission");
        
        //----------------Edi profile for credit memo-----
        waitForObject(":EDI Relationships.New_QPushButton_2");
        clickButton(":EDI Relationships.New_QPushButton_2");
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
        
        waitForObject(":_formsTab.New_QPushButton");
        clickButton(":_formsTab.New_QPushButton");
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
        
        //----------------Edi profile for AR Statement-----
        waitForObject(":EDI Relationships.New_QPushButton_2");
        clickButton(":EDI Relationships.New_QPushButton_2");
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
        
        waitForObject(":_formsTab.New_QPushButton");
        clickButton(":_formsTab.New_QPushButton");
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
        
        
        //----------------Edi profile for Sales Order-----
        waitForObject(":EDI Relationships.New_QPushButton_2");
        clickButton(":EDI Relationships.New_QPushButton_2");
        waitForObject(":_name_QLineEdit_3");
        type(":_name_QLineEdit_3", "TTOYS-SO");
        waitForObjectItem(":_type_XComboBox_3", "EMail");
        clickItem(":_type_XComboBox_3", "EMail", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Customer.Review Before Sending_QCheckBox");
        clickButton(":Customer.Review Before Sending_QCheckBox");
        waitForObject(":_emailFrom_QLineEdit_2");
        type(":_emailFrom_QLineEdit_2", fromemail);
        waitForObject(":_emailTo_QLineEdit_2");
        type(":_emailTo_QLineEdit_2",toemail);
        waitForObject(":_emailSubject_QLineEdit_2");
        type(":_emailSubject_QLineEdit_2", "Sales Order Order Status </docnumber>");
        waitForObject(":_emailBody_QTextEdit_2");
        type(":_emailBody_QTextEdit_2", "Please see the attached document containing information about your order number: </d        ocnumber>. Regards, ProDiem Toys");
        
        waitForObject(":_formsTab.New_QPushButton");
        clickButton(":_formsTab.New_QPushButton");
        waitForObject(":Customer.OK_QPushButton");
        clickButton(":Customer.OK_QPushButton");
        waitForObjectItem(":_type_XComboBox_4", "Sales Order");
        clickItem(":_type_XComboBox_4", "Sales Order", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_file_QLineEdit_2");
        type(":_file_QLineEdit_2", "Report");
        
        waitForObjectItem(":_reportReport_XComboBox_2", "SalesOrderStatus");
        clickItem(":_reportReport_XComboBox_2", "SalesOrderStatus", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Customer.OK_QPushButton_2");
        clickButton(":Customer.OK_QPushButton_2");
        waitForObject(":Customer.Save_QPushButton");
        clickButton(":Customer.Save_QPushButton");
        
        waitForObjectItem(":Customer._doctype_XComboBox", "Sales Order");
        clickItem(":Customer._doctype_XComboBox", "Sales Order", 5, 5, 1, Qt.LeftButton);
        waitForObjectItem(":_profile_XTreeWidget_2", "TTOYS-SO");
        clickItem(":_profile_XTreeWidget_2", "TTOYS-SO", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Customer.Attach_QPushButton");
        clickButton(":Customer.Attach_QPushButton");
        test.log("EDI Profile created for Sales Order and attached to TTOYS");
        
        //----------------Edi profile for Invoice-----
        waitForObject(":EDI Relationships.New_QPushButton_2");
        clickButton(":EDI Relationships.New_QPushButton_2");
        waitForObject(":_name_QLineEdit_3");
        type(":_name_QLineEdit_3", "TTOYS-IN");
        waitForObjectItem(":_type_XComboBox_3", "EMail");
        clickItem(":_type_XComboBox_3", "EMail", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Customer.Review Before Sending_QCheckBox");
        clickButton(":Customer.Review Before Sending_QCheckBox");
        waitForObject(":_emailFrom_QLineEdit_2");
        type(":_emailFrom_QLineEdit_2", fromemail);
        waitForObject(":_emailTo_QLineEdit_2");
        type(":_emailTo_QLineEdit_2",toemail);
        waitForObject(":_emailSubject_QLineEdit_2");
        type(":_emailSubject_QLineEdit_2", "Invoice </docnumber> From ProDiem Attached");
        waitForObject(":_emailBody_QTextEdit_2");
        type(":_emailBody_QTextEdit_2", "Dear Tremendous Toys:Attached please find a current invoice. Contact us immediately at 800-234-2311 if there are any questions.Thank You For Your Order,ProDiem Toys");
        
        waitForObject(":_formsTab.New_QPushButton");
        clickButton(":_formsTab.New_QPushButton");
        waitForObject(":Customer.OK_QPushButton");
        clickButton(":Customer.OK_QPushButton");
        waitForObjectItem(":_type_XComboBox_4", "Invoice");
        clickItem(":_type_XComboBox_4", "Invoice", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_file_QLineEdit_2");
        type(":_file_QLineEdit_2", "Report");
        
        waitForObjectItem(":_reportReport_XComboBox_2", "Invoice");
        clickItem(":_reportReport_XComboBox_2", "Invoice", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Customer.OK_QPushButton_2");
        clickButton(":Customer.OK_QPushButton_2");
        waitForObject(":Customer.Save_QPushButton");
        clickButton(":Customer.Save_QPushButton");
        
        waitForObjectItem(":Customer._doctype_XComboBox", "Invoice");
        clickItem(":Customer._doctype_XComboBox", "Invoice", 5, 5, 1, Qt.LeftButton);
        waitForObjectItem(":_profile_XTreeWidget_2", "TTOYS-IN");
        clickItem(":_profile_XTreeWidget_2", "TTOYS-IN", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Customer.Attach_QPushButton");
        clickButton(":Customer.Attach_QPushButton");
        test.log("EDI Profile created for Invoice and attached to TTOYS");
        
        waitForObject(":Customer.Save_QPushButton_2");
        clickButton(":Customer.Save_QPushButton_2");
        waitForObject(":Customers.Close_QToolButton");
        clickButton(":Customers.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in attaching EDI profiles to customer" + e);
    }
    
    //----------------Attach EDI profile to vendor--------------------------------------
    
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":*.Purchase_QMenu", "Vendor");
        activateItem(":*.Purchase_QMenu", "Vendor");
        waitForObjectItem(":*.Vendor_QMenu", "List...");
        activateItem(":*.Vendor_QMenu", "List...");
        waitForObject(":Vendors.Query_QToolButton");
        clickButton(":Vendors.Query_QToolButton");
        waitForObjectItem(":_list_XTreeWidget_6", "TPARTS");
        doubleClickItem(":_list_XTreeWidget_6", "TPARTS", 12, 7, 0, Qt.LeftButton);
        waitForObject(":Vendor.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Vendor.qt_tabwidget_tabbar_QTabBar", "Transmission");
        waitForObject(":_transmitStack.New_QPushButton");
        clickButton(":_transmitStack.New_QPushButton");
        waitForObject(":_name_QLineEdit_5");
        type(":_name_QLineEdit_5","TPARTS-PO");
        waitForObjectItem(":_type_XComboBox_7","EMail");
        clickItem(":_type_XComboBox_7","EMail", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Vendor.Review Before Sending_QCheckBox");
        clickButton(":Vendor.Review Before Sending_QCheckBox");
        waitForObject(":_emailFrom_QLineEdit_4");
        type(":_emailFrom_QLineEdit_4", fromemail);
        waitForObject(":_emailTo_QLineEdit_4");
        type(":_emailTo_QLineEdit_4",toemail);
        waitForObject(":_emailSubject_QLineEdit_4");
        type(":_emailSubject_QLineEdit_4", "PO </docnumber> Attached");
        waitForObject(":_emailBody_QTextEdit_5");
        type(":_emailBody_QTextEdit_5", "Please see the attached PO and contact us immediately if there are any issues.");
        
        waitForObject(":_formsTab.New_QPushButton_3");
        clickButton(":_formsTab.New_QPushButton_3");
        waitForObject(":Vendor.OK_QPushButton");
        clickButton(":Vendor.OK_QPushButton");
        waitForObjectItem(":_type_XComboBox_8", "Purchase Order");
        clickItem(":_type_XComboBox_8", "Purchase Order", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_file_QLineEdit_4");
        type(":_file_QLineEdit_4", "Report");
        
        waitForObjectItem(":_reportReport_XComboBox_4", "PurchaseOrder");
        clickItem(":_reportReport_XComboBox_4", "PurchaseOrder", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Vendor.OK_QPushButton_2");
        clickButton(":Vendor.OK_QPushButton_2");
        waitForObject(":Vendor.Save_QPushButton");
        clickButton(":Vendor.Save_QPushButton");
        
        waitForObjectItem(":Vendor._doctype_XComboBox", "Purchase Order");
        clickItem(":Vendor._doctype_XComboBox", "Purchase Order", 5, 5, 1, Qt.LeftButton);
        waitForObjectItem(":_profile_XTreeWidget_3", "TPARTS-PO");
        clickItem(":_profile_XTreeWidget_3", "TPARTS-PO", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Vendor.Attach_QPushButton");
        clickButton(":Vendor.Attach_QPushButton");
        test.log("EDI Profile created for Purchase Order and attached to TPARTS");
        
        waitForObject(":Database Information.Save_QPushButton");
        clickButton(":Database Information.Save_QPushButton");
        waitForObject(":Vendors.Close_QToolButton");
        clickButton(":Vendors.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in attaching EDI profiles to vendor" + e);
    }
    
    
    
    //**************************Batch Manager Submissions********************************
    
    //-----Purchase Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Forms");
        activateItem(":*.Purchase_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu", "Send Electronic Purchase Order...");
        activateItem(":*.Forms_QMenu", "Send Electronic Purchase Order...");
        waitForObject(":_docstack_QLabel");
        sendEvent("QMouseEvent", ":_docstack_QLabel", QEvent.MouseButtonPress, 10, 8, Qt.RightButton, 0);
        waitForObject(":_QMenu");
        sendEvent("QContextMenuEvent", ":_QMenu", QContextMenuEvent.Mouse, 0, 0, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget");
        doubleClickItem(":_listTab_XTreeWidget","PO", 48, 3, 1, Qt.LeftButton);
        
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in submitting electronic purchase order" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Purchase Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create a Purchase Order----- 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Purchase Order");
        activateItem(":*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":*.Purchase Order_QMenu", "New...");
        activateItem(":*.Purchase Order_QMenu", "New...");
        
        waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
        type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        
        var ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Purchase Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Purchase Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":groupBox_2.VirtualClusterLineEdit_ItemLineEdit");
        type(":groupBox_2.VirtualClusterLineEdit_ItemLineEdit", "TBOX1");
        nativeType( "<Tab>");
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "100");
        waitForObject(":_ordered_XLineEdit");
        type(":_ordered_XLineEdit", "<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        findObject(":_schedGroup.XDateEdit_XDateEdit").clear();
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        
        waitForObject(":Purchase Order.Save_QPushButton");
        clickButton(":Purchase Order.Save_QPushButton");
        waitForObject(":Purchase Order.Save_QPushButton_2");
        clickButton(":Purchase Order.Save_QPushButton_2");
        
        waitForObject(":Purchase Order.Cancel_QPushButton_2");
        clickButton(":Purchase Order.Cancel_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in creating purchase order" + e);
    }
    
    //-----Unposted Purchase Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Purchase Order");
        activateItem(":*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":*.Purchase Order_QMenu", "List Open...");
        activateItem(":*.Purchase Order_QMenu", "List Open...");
        
        if(!findObject(":List Open Purchase Orders.Open_XCheckBox").checked)
        {
            clickButton(":List Open Purchase Orders.Open_XCheckBox");
        }
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
        {
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        }
        waitForObject(":Open Purchase Orders.Query_QToolButton");
        clickButton(":Open Purchase Orders.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_2");
        openItemContextMenu(":_list_XTreeWidget_2",ponumber, 5, 5, 0);
        waitForObjectItem(":*._menu_QMenu", "Send Electronic Purchase Order...");
        activateItem(":*._menu_QMenu", "Send Electronic Purchase Order...");
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
        
        waitForObject(":Open Purchase Orders.Close_QToolButton");
        clickButton(":Open Purchase Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in submitting unposted purchase order" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Unposted Purchase Order");
    
    else test.fail("Batch Manager not responding");
  
    //-----Print Purchase Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Forms");
        activateItem(":*.Purchase_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu", "Print Purchase Order...");
        activateItem(":*.Forms_QMenu", "Print Purchase Order...");
        
        waitForObject(":Print Purchase Order.VirtualClusterLineEdit_OrderLineEdit");
        type(":Print Purchase Order.VirtualClusterLineEdit_OrderLineEdit",ponumber);
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":Print Purchase Order.Print_QPushButton");
        clickButton(":Print Purchase Order.Print_QPushButton");  
        snooze(1);	  
        nativeType("<Return>");
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
        
        waitForObject(":Print Purchase Order.Cancel_QPushButton");
        clickButton(":Print Purchase Order.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in printing purchase order" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Purchase Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create a Sales Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Sales Order");
        activateItem(":*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":*.Sales Order_QMenu", "New...");
        activateItem(":*.Sales Order_QMenu", "New...");
        
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        
        var sonumber=findObject(":Sales Order._QLabel").text;
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_2");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_2", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        
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
    }
    catch(e)
    {
        test.fail("Error in creating sales order" + e);
    }
    
    //-----Open Sales Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Sales Order");
        activateItem(":*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":*.Sales Order_QMenu", "List Open...");
        activateItem(":*.Sales Order_QMenu", "List Open...");
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",sonumber, 25, 8, 0);
        
        waitForObjectItem(":*._menu_QMenu", "Send Electronic Acknowledgment...");
        activateItem(":*._menu_QMenu", "Send Electronic Acknowledgment...");
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
        
        waitForObject(":Open Sales Orders.Close_QToolButton");
        clickButton(":Open Sales Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in sending electronic acknowledgement of sales order" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Open Sales Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Electronic Sales Order Form-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Forms");
        activateItem(":*.Sales_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu_3", "Send Electronic Sales Order Form ...");
        activateItem(":*.Forms_QMenu_3", "Send Electronic Sales Order Form ...");
        waitForObject(":_docstack.VirtualClusterLineEdit_OrderLineEdit");
        type(":_docstack.VirtualClusterLineEdit_OrderLineEdit", sonumber);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in sending electronic sales order form" + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Sales Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create a Quote-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Quote");
        activateItem(":*.Sales_QMenu", "Quote");
        waitForObjectItem(":*.Quote_QMenu", "New...");
        activateItem(":*.Quote_QMenu", "New...");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        var qnumber = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
        
        
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
        
        waitForObject(":_lineItemsPage.New_QPushButton_3");
        clickButton(":_lineItemsPage.New_QPushButton_3");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        
        
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "50");
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "<Tab>");
        waitForObject(":_discountFromCust_XLineEdit_2");
        type(":_discountFromCust_XLineEdit_2", "<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        findObject(":_schedGroup.XDateEdit_XDateEdit_3").clear();
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+7");
        
        waitForObject(":Quote.Save_QPushButton");
        clickButton(":Quote.Save_QPushButton");
        
        waitForObject(":Quote.Close_QPushButton");
        clickButton(":Quote.Close_QPushButton");
        
        waitForObject(":Quote.Save_QPushButton_2");
        clickButton(":Quote.Save_QPushButton_2");
        
        waitForObject(":Quote.Cancel_QPushButton");
        clickButton(":Quote.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating a quote" + e);
    }
    
    //-----Electronic Quote-----
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Forms");
        activateItem(":*.Sales_QMenu", "Forms");
        
        waitForObjectItem(":*.Forms_QMenu_3", "Send Electronic Quote ...");
        activateItem(":*.Forms_QMenu_3", "Send Electronic Quote ...");
        waitForObject(":_docstack_QLabel");
        sendEvent("QMouseEvent", ":_docstack_QLabel", QEvent.MouseButtonPress, 9, 10, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_7");
        doubleClickItem(":_listTab_XTreeWidget_7", qnumber, 5, 5, 0, Qt.LeftButton);
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in sending electronic quote" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Quote");
    
    else test.fail("Batch Manager not responding");
    
    //-----Allocate Reservation-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Utilities");
        activateItem(":*.Sales_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu", "Allocate Reservations...");
        activateItem(":*.Utilities_QMenu", "Allocate Reservations...");
        
        waitForObject(":_customerGroup_QLabel");
        sendEvent("QMouseEvent", ":_customerGroup_QLabel", QEvent.MouseButtonPress, 7, 11, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_12");
        doubleClickItem(":_listTab_XTreeWidget_12","TTOYS", 52, 12, 0, Qt.LeftButton);
        waitForObject(":Allocate Reservations.XDateEdit_XDateEdit");
        type(":Allocate Reservations.XDateEdit_XDateEdit", "0");
        waitForObject(":Allocate Reservations.XDateEdit_XDateEdit_2");
        type(":Allocate Reservations.XDateEdit_XDateEdit_2", "0");
        
        waitForObject(":Allocate Reservations.Schedule_QPushButton");
        clickButton(":Allocate Reservations.Schedule_QPushButton");
        
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Allocate Reservations screnn" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Allocate Reservations");
    
    else test.fail("Batch Manager not responding");
    
    
    //Release Work Orders
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Work Order");
        activateItem(":*.Manufacture_QMenu", "Work Order");
        waitForObjectItem(":*.Work Order_QMenu", "Release...");
        activateItem(":*.Work Order_QMenu", "Release...");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        type(":_dateGroup.XDateEdit_XDateEdit","+1");
        nativeType("<Tab>");
        waitForObject(":Release Work Orders by Planner Code.Release_QPushButton");
        clickButton(":Release Work Orders by Planner Code.Release_QPushButton");
    }
    catch(e)
    { 
        test.fail("Exception in releasing Work Orders" + e);
    }
    
    //-----Create Planned Orders by Plannercode-----
    try
    {
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
        
        
        waitForObject(":Run MRP by Planner Code.Submit_QPushButton_2");
        clickButton(":Run MRP by Planner Code.Submit_QPushButton_2");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Run MRP by Planner Code.Schedule_QPushButton");
        clickButton(":Run MRP by Planner Code.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating planned order" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for creating Planned orders by planner code");
    
    else test.fail("Batch Manager not responding");
  
    //----------Verify Planned orders-----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Reports");
        activateItem(":*.Schedule_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu", "Planned Orders...");
        activateItem(":*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");
        
        if(findObject(":_list_XTreeWidget_8").topLevelItemCount!=0)
            
            test.pass("Run MRP successful");
        else
            test.fail("Run MRP failed");
        
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying Planned orders" + e);
    }
    
    //------------Schedule Planned orders--------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule")
                activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Reports");
        activateItem(":*.Schedule_QMenu", "Reports");  
        waitForObjectItem(":*.Reports_QMenu", "Planned Orders...");
        activateItem(":*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Schedule_QToolButton");
        clickButton(":Planned Orders.Schedule_QToolButton");  
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton"); 
    }
    catch(e)
    {
        test.fail("Exception in scheduling planned orders report" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Scheduled for Planned orders by planner code screen");
    
    else test.fail("Batch Manager not responding");
    
    //-----Release Planned Orders by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
        activateItem(":*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":*.Scheduling_QMenu", "Release Planned Orders...");
        activateItem(":*.Scheduling_QMenu", "Release Planned Orders...");
        
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_10");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_10");
        waitForObject(":_warehouse.All Sites_QRadioButton_2");
        clickButton(":_warehouse.All Sites_QRadioButton_2");
        
        waitForObject(":groupBox_2.XDateEdit_XDateEdit");
        type(":groupBox_2.XDateEdit_XDateEdit", "+7");
        
        waitForObject(":Release Planned Orders by Planner Code.Schedule_QPushButton");
        clickButton(":Release Planned Orders by Planner Code.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    
    catch(e)
    {
        test.fail("Error in releasing planned order" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for releasing Planned orders by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create Buffer Status by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Constraint Management");
        activateItem(":*.Schedule_QMenu", "Constraint Management");
        waitForObjectItem(":*.Constraint Management_QMenu_2", "Update Status");
        activateItem(":*.Constraint Management_QMenu_2", "Update Status");
        waitForObjectItem(":*.Update Status_QMenu_2", "by Planner Code...");
        activateItem(":*.Update Status_QMenu_2", "by Planner Code...");
        
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_3");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_3");
        waitForObject(":_warehouse.All Sites_QRadioButton_3");
        clickButton(":_warehouse.All Sites_QRadioButton_3");
        
        waitForObject(":Run Buffer Status by Planner Code.Schedule_QPushButton");
        clickButton(":Run Buffer Status by Planner Code.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Creating Buffer Status by Planner code" + e);
    }
    
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for creating buffer status by planner code");
    
    else test.fail("Batch Manager not responding");
    
    
    //-----Create Buffer Status by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Constraint Management");
        activateItem(":*.Schedule_QMenu", "Constraint Management");
        waitForObjectItem(":*.Constraint Management_QMenu_2", "Update Status");
        activateItem(":*.Constraint Management_QMenu_2", "Update Status");
        waitForObjectItem(":*.Update Status_QMenu_2", "by Item...");
        activateItem(":*.Update Status_QMenu_2", "by Item...");
        
        waitForObject(":Run Buffer Status by Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Run Buffer Status by Item.VirtualClusterLineEdit_ItemLineEdit","YTRUCK1");
        nativeType("<Tab>");
        snooze(1);        
        waitForObject(":Run Buffer Status by Item.Schedule_QPushButton");
        clickButton(":Run Buffer Status by Item.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Creating Buffer Status by Item" + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for creating buffer status by Item");
    
    else test.fail("Batch Manager not responding");
    
    //******** Change Reorder level ******
    
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Item Site");
        activateItem(":*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        if(!object.exists(":_filterGroup.xcomboBox1_XComboBox_2"))
        {
            waitForObject(":Item Sites.More_QToolButton");
            clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox_2");
        clickItem(":_filterGroup.xcomboBox1_XComboBox_2", "Site", 10, 10, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox", "WH1", 10, 10, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObjectItem(":_list_XTreeWidget_7", "WTRUCK1");
        doubleClickItem(":_list_XTreeWidget_7", "WTRUCK1", 56, 11, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        findObject(":_reorderLevel_XLineEdit").clear();
        type(":_reorderLevel_XLineEdit", "20");
        waitForObject(":Database Information.Save_QPushButton");
        clickButton(":Database Information.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Reorder level set");
    }
    catch(e)
    {
        test.fail("Error in changing Reorder level");
    }
    
    //------Check planned orders----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Reports");
        activateItem(":*.Schedule_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu", "Planned Orders...");
        activateItem(":*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");
        
        var before = findObject(":_list_XTreeWidget_8").topLevelItemCount;
        
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying Planner orders" + e);
    }
    
    //-----Run MPS by Plannercode-----
    try
    {
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
        
        waitForObject(":Run MPS by Planner Code.Schedule_QPushButton");
        clickButton(":Run MPS by Planner Code.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Creating Buffer Status by Planner code" + e);
    }
    
    
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for run MPS by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //------Verify Planned orders------------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Reports");
        activateItem(":*.Schedule_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu", "Planned Orders...");
        activateItem(":*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");
        
        if(findObject(":_list_XTreeWidget_8").topLevelItemCount > before)
            test.pass("Run MPS successful");
        else
            test.fail("Run MPS failed");
        
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying Planner orders" + e);
    }
    
    //-----Enabling Sites for creating Planned Transfer Order-----
    
    try
    {
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
    }
    catch(e)
    {
        test.fail("Error in enabling item sites " + e);
    }
    
    //-----Creating a Supply site for the Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Item Site");
        activateItem(":*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        if(!object.exists(":_filterGroup.xcomboBox1_XComboBox_2"))
        {
            waitForObject(":Item Sites.More_QToolButton");
            clickButton(":Item Sites.More_QToolButton");
        }
        
        waitForObject(":_filterGroup.xcomboBox1_XComboBox_2");
        clickItem(":_filterGroup.xcomboBox1_XComboBox_2","Site", 47, 7, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox", "WH2", 41, 3, 0, Qt.LeftButton);
        waitForObject(":Item Sites.Query_QToolButton");   
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_7");
        doubleClickItem(":_list_XTreeWidget_7", "BTRUCK1", 19, 7, 0, Qt.LeftButton);
        
        if(!findObject(":Item Sites.Site can purchase this Item_QGroupBox").checked)
        {
            type(":Item Sites.Site can purchase this Item_QGroupBox"," ");
        }
        waitForObject(":Database Information.Save_QPushButton");
        clickButton(":Database Information.Save_QPushButton");
        
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox", "WH1", 41, 3, 0, Qt.LeftButton);
        waitForObject(":Item Sites.Query_QToolButton");   
        clickButton(":Item Sites.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_7");
        doubleClickItem(":_list_XTreeWidget_7", "BTRUCK1", 19, 7, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        if(!findObject(":Scheduling.Create Planned Transfer Orders_QGroupBox_2").checked)
        {
            type(":Scheduling.Create Planned Transfer Orders_QGroupBox_2", " ");
        }
        
        waitForObject(":Create Planned Transfer Orders._suppliedFromSite_WComboBox_2");
        clickItem(":Create Planned Transfer Orders._suppliedFromSite_WComboBox_2", "WH2", 36, 2, 0, Qt.LeftButton);
        waitForObject(":Database Information.Save_QPushButton");
        clickButton(":Database Information.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in Creating supply site for item" + e);
    }
    //-----Creating Planned Transfer Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
        activateItem(":*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":*.Scheduling_QMenu", "New Planned Order...");
        activateItem(":*.Scheduling_QMenu", "New Planned Order...");
        
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_4");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_4", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
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
    }
    catch(e)
    {
        test.fail("Error in Creating Planned Transfer Order " + e);
    }
    
    //-----Releasing Planned Transfer Order-----
    try
    {
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
        
        waitForObject(":Release Planned Orders by Planner Code.Schedule_QPushButton");
        clickButton(":Release Planned Orders by Planner Code.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Releasing Planned Transfer Order " + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for releasing Planned Transfer Order");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Demand by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
        activateItem(":*.Schedule_QMenu", "Capacity Planning");
        waitForObjectItem(":*.Capacity Planning_QMenu_2", "Time-Phased Demand...");
        activateItem(":*.Capacity Planning_QMenu_2", "Time-Phased Demand...");
        
        waitForObject(":_warehouse.All Sites_QRadioButton_5");
        clickButton(":_warehouse.All Sites_QRadioButton_5");
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_5");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_5");
        waitForObject(":Time Phased Demand by Planner Code._calendar_CalendarComboBox");
        clickItem(":Time Phased Demand by Planner Code._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Time Phased Demand by Planner Code.Query_QPushButton");
        clickButton(":Time Phased Demand by Planner Code.Query_QPushButton");
        
        waitForObject(":Time Phased Demand by Planner Code.Schedule_QPushButton");
        clickButton(":Time Phased Demand by Planner Code.Schedule_QPushButton");
        
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Time Phased Demand by Planner Code.Close_QPushButton_2");
        clickButton(":Time Phased Demand by Planner Code.Close_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Demand by Planner Code " + e);
    }
  
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Demand by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Production by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
        activateItem(":*.Schedule_QMenu", "Capacity Planning");
        waitForObjectItem(":*.Capacity Planning_QMenu_2", "Time-Phased Production");
        activateItem(":*.Capacity Planning_QMenu_2", "Time-Phased Production");
        waitForObjectItem(":*.Time-Phased Production_QMenu_2", "by Planner Code...");
        activateItem(":*.Time-Phased Production_QMenu_2", "by Planner Code...");
        
        waitForObject(":_warehouse.All Sites_QRadioButton_6");
        clickButton(":_warehouse.All Sites_QRadioButton_6");
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_6");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_6");
        waitForObject(":Time-Phased Production by Planner Code._calendar_CalendarComboBox");
        clickItem(":Time-Phased Production by Planner Code._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Time-Phased Production by Planner Code.Query_QPushButton");
        clickButton(":Time-Phased Production by Planner Code.Query_QPushButton");
        
        waitForObject(":Time-Phased Production by Planner Code.Schedule_QPushButton");
        clickButton(":Time-Phased Production by Planner Code.Schedule_QPushButton");
        
        waitForObject(":Time-Phased Production by Planner Code._fromEmail_XLineEdit");
        findObject(":Time-Phased Production by Planner Code._fromEmail_XLineEdit").clear();
        type(":Time-Phased Production by Planner Code._fromEmail_XLineEdit", fromemail);
        waitForObject(":Time-Phased Production by Planner Code._email_XLineEdit");
        findObject(":Time-Phased Production by Planner Code._email_XLineEdit").clear();
        type(":Time-Phased Production by Planner Code._email_XLineEdit", toemail);
        
        waitForObject(":Time-Phased Production by Planner Code.Schedule_QPushButton_2");
        clickButton(":Time-Phased Production by Planner Code.Schedule_QPushButton_2");
        
        waitForObject(":Time-Phased Production by Planner Code.Close_QPushButton");
        clickButton(":Time-Phased Production by Planner Code.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Production by Planner Code " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Production by planner code");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Production by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
        activateItem(":*.Schedule_QMenu", "Capacity Planning");
        waitForObjectItem(":*.Capacity Planning_QMenu_2", "Time-Phased Production");
        activateItem(":*.Capacity Planning_QMenu_2", "Time-Phased Production");
        waitForObjectItem(":*.Time-Phased Production_QMenu_2", "by Item...");
        activateItem(":*.Time-Phased Production_QMenu_2", "by Item...");
        
        waitForObject(":_warehouse.All Sites_QRadioButton_7");
        clickButton(":_warehouse.All Sites_QRadioButton_7");
        waitForObject(":_plannerCode.All Planner Codes_QRadioButton_7");
        clickButton(":_plannerCode.All Planner Codes_QRadioButton_7");
        waitForObject(":Time-Phased Production by Item._calendar_CalendarComboBox");
        clickItem(":Time-Phased Production by Item._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Time-Phased Production by Item.Query_QPushButton");
        clickButton(":Time-Phased Production by Item.Query_QPushButton");
        
        waitForObject(":Time-Phased Production by Item.Schedule_QPushButton");
        clickButton(":Time-Phased Production by Item.Schedule_QPushButton");
        
        waitForObject(":Time-Phased Production by Item._fromEmail_XLineEdit");
        findObject(":Time-Phased Production by Item._fromEmail_XLineEdit").clear();
        type(":Time-Phased Production by Item._fromEmail_XLineEdit", fromemail);
        waitForObject(":Time-Phased Production by Item._email_XLineEdit");
        findObject(":Time-Phased Production by Item._email_XLineEdit").clear();
        type(":Time-Phased Production by Item._email_XLineEdit", toemail);
        
        
        waitForObject(":Time-Phased Production by Item.Schedule_QPushButton_2");
        clickButton(":Time-Phased Production by Item.Schedule_QPushButton_2");
        
        waitForObject(":Time-Phased Production by Item.Close_QPushButton");
        clickButton(":Time-Phased Production by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Production by Item " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Production by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Availability-----
    try
    {
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
        
        waitForObject(":Time-Phased Availability.Query_QToolButton");
        clickButton(":Time-Phased Availability.Query_QToolButton");
        waitForObject(":Time-Phased Availability.Schedule_QToolButton");
        clickButton(":Time-Phased Availability.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Availability.Close_QToolButton");
        clickButton(":Time-Phased Availability.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Availability " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Availability");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Booking by Customer-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Bookings...");
        activateItem(":*.Analysis_QMenu", "Time Phased Bookings...");
        
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_3");
        clickItem(":Time-Phased Report._calendar_CalendarComboBox_3", "2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Time-Phased Bookings.Query_QToolButton");
        clickButton(":Time-Phased Bookings.Query_QToolButton");
        waitForObject(":Time-Phased Bookings.Schedule_QToolButton");
        clickButton(":Time-Phased Bookings.Schedule_QToolButton");
        
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Bookings.Close_QToolButton");
        clickButton(":Time-Phased Bookings.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Booking by Customer " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Booking by Customer");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Booking by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Bookings...");
        activateItem(":*.Analysis_QMenu", "Time Phased Bookings...");
        
        waitForObject(":groupBox._groupBy_XComboBox");
        clickItem(":groupBox._groupBy_XComboBox", "Item", 73, 3, 0, Qt.LeftButton);
        
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_3");
        clickItem(":Time-Phased Report._calendar_CalendarComboBox_3", "2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Time-Phased Bookings.Query_QToolButton");
        clickButton(":Time-Phased Bookings.Query_QToolButton");
        waitForObject(":Time-Phased Bookings.Schedule_QToolButton");
        clickButton(":Time-Phased Bookings.Schedule_QToolButton");
        
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Bookings.Close_QToolButton");
        clickButton(":Time-Phased Bookings.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Booking by Item " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Booking by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Bookings by Product Category-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Bookings...");
        activateItem(":*.Analysis_QMenu", "Time Phased Bookings...");
        
        waitForObject(":groupBox._groupBy_XComboBox");
        clickItem(":groupBox._groupBy_XComboBox", "Product Category", 73, 3, 0, Qt.LeftButton);
        
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_3");
        clickItem(":Time-Phased Report._calendar_CalendarComboBox_3", "2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Time-Phased Bookings.Query_QToolButton");
        clickButton(":Time-Phased Bookings.Query_QToolButton");
        waitForObject(":Time-Phased Bookings.Schedule_QToolButton");
        clickButton(":Time-Phased Bookings.Schedule_QToolButton");
        
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Bookings.Close_QToolButton");
        clickButton(":Time-Phased Bookings.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Bookings by Product Category " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Booking by Product Category");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //-----Time Phased Sales History by Customer-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        activateItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        
        waitForObject(":groupBox._groupBy_XComboBox_2")
                clickItem(":groupBox._groupBy_XComboBox_2","Customer",84, 2, 0, Qt.LeftButton);
        
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_4")
                clickItem(":Time-Phased Report._calendar_CalendarComboBox_4","2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Time-Phased Sales History.Query_QToolButton");
        clickButton(":Time-Phased Sales History.Query_QToolButton");
        waitForObject(":Time-Phased Sales History.Schedule_QToolButton");
        clickButton(":Time-Phased Sales History.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Sales History.Close_QToolButton");
        clickButton(":Time-Phased Sales History.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Sales History by Customer" + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Customer");
    
    else test.fail("Batch Manager not responding");
    
    
    //-----Time Phased Sales History by Customer by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        activateItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
            waitForObject(":Time-Phased Sales History.More_QToolButton");
            clickButton(":Time-Phased Sales History.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox", "Customer", 92, 3, 0, Qt.LeftButton);
        
        waitForObject(":_filterGroup.VirtualClusterLineEdit_CLineEdit");
        type(":_filterGroup.VirtualClusterLineEdit_CLineEdit","TTOYS");
        nativeType("<Tab>");
        
        waitForObject(":groupBox._groupBy_XComboBox_2")
                clickItem(":groupBox._groupBy_XComboBox_2","Item",84, 2, 0, Qt.LeftButton);
        
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_4")
                clickItem(":Time-Phased Report._calendar_CalendarComboBox_4","2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Time-Phased Sales History.Query_QToolButton");
        clickButton(":Time-Phased Sales History.Query_QToolButton");
        waitForObject(":Time-Phased Sales History.Schedule_QToolButton");
        clickButton(":Time-Phased Sales History.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Sales History.Close_QToolButton");
        clickButton(":Time-Phased Sales History.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Sales History by Customer by Item" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Customer by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Sales History by Product Category-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        activateItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        
        waitForObject(":groupBox._groupBy_XComboBox_2")
                clickItem(":groupBox._groupBy_XComboBox_2","Product Category",84, 2, 0, Qt.LeftButton);
        
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_4")
                clickItem(":Time-Phased Report._calendar_CalendarComboBox_4","2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Time-Phased Sales History.Query_QToolButton");
        clickButton(":Time-Phased Sales History.Query_QToolButton");
        waitForObject(":Time-Phased Sales History.Schedule_QToolButton");
        clickButton(":Time-Phased Sales History.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Sales History.Close_QToolButton");
        clickButton(":Time-Phased Sales History.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Sales History by Product Category" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Product Category");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Sales History by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        activateItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        
        waitForObject(":groupBox._groupBy_XComboBox_2")
                clickItem(":groupBox._groupBy_XComboBox_2","Item",84, 2, 0, Qt.LeftButton);
        
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_4")
                clickItem(":Time-Phased Report._calendar_CalendarComboBox_4","2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Time-Phased Sales History.Query_QToolButton");
        clickButton(":Time-Phased Sales History.Query_QToolButton");
        waitForObject(":Time-Phased Sales History.Schedule_QToolButton");
        clickButton(":Time-Phased Sales History.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Sales History.Close_QToolButton");
        clickButton(":Time-Phased Sales History.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Sales History by Item" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Sales History by Customer Group-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        activateItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
            waitForObject(":Time-Phased Sales History.More_QToolButton");
            clickButton(":Time-Phased Sales History.More_QToolButton");
        }
        
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox", "Customer Group", 92, 3, 0, Qt.LeftButton);
        
        waitForObject(":_filterGroup.widget1_XComboBox");
        clickItem(":_filterGroup.widget1_XComboBox","NAT-VA",67, 2, 0, Qt.LeftButton);
        
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_4")
                clickItem(":Time-Phased Report._calendar_CalendarComboBox_4","2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Time-Phased Sales History.Query_QToolButton");
        clickButton(":Time-Phased Sales History.Query_QToolButton");
        waitForObject(":Time-Phased Sales History.Schedule_QToolButton");
        clickButton(":Time-Phased Sales History.Schedule_QToolButton");
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Sales History.Close_QToolButton");
        clickButton(":Time-Phased Sales History.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Sales History by Customer Group" + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Sales History by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Usage Statistics by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
        activateItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
        
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_5");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_5", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_warehouse.All Sites_QRadioButton_13");
        clickButton(":_warehouse.All Sites_QRadioButton_13");
        waitForObject(":Time-Phased Item Usage Statistics by Item._calendar_CalendarComboBox");
        clickItem(":Time-Phased Item Usage Statistics by Item._calendar_CalendarComboBox", "2009", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Time-Phased Item Usage Statistics by Item.Query_QToolButton");
        clickButton(":Time-Phased Item Usage Statistics by Item.Query_QToolButton");
        waitForObject(":Time-Phased Item Usage Statistics by Item.Schedule_QToolButton");
        clickButton(":Time-Phased Item Usage Statistics by Item.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        mouseClick(":_deststack._fromEmail_XLineEdit", 135, 9, 0, Qt.LeftButton);
        waitForObject(":_deststack._email_XLineEdit");
        mouseClick(":_deststack._email_XLineEdit", 130, 10, 0, Qt.LeftButton);
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit",toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Time-Phased Item Usage Statistics by Item.Close_QToolButton");
        clickButton(":Time-Phased Item Usage Statistics by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Usage Statistics by Item " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Usage Statistics by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Actual Costs by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Update Actual Costs");
        activateItem(":*.Costing_QMenu", "Update Actual Costs");
        waitForObjectItem(":*.Update Actual Costs_QMenu", "by Item...");
        activateItem(":*.Update Actual Costs_QMenu", "by Item...");
        
        waitForObject(":Update Actual Costs by Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Update Actual Costs by Item.VirtualClusterLineEdit_ItemLineEdit", "BTRUCK1");
        snooze(1);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Update Actual Costs by Item.Select all Costs_QPushButton");
        clickButton(":Update Actual Costs by Item.Select all Costs_QPushButton");
        
        waitForObject(":Update Actual Costs by Item.Schedule_QPushButton");
        clickButton(":Update Actual Costs by Item.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in Updating Actual Costs by Item " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Actual Costs by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Actual Costs by Classcode-----
    try
    {
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
        
        waitForObject(":Update Actual Costs by Class Code.Schedule_QPushButton");
        clickButton(":Update Actual Costs by Class Code.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Actual Costs by Class Code " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Actual Costs by Classcode ");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Actual Costs by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Post Actual Costs");
        activateItem(":*.Costing_QMenu", "Post Actual Costs");
        waitForObjectItem(":*.Post Actual Costs_QMenu", "by Item...");
        activateItem(":*.Post Actual Costs_QMenu", "by Item...");
        
        waitForObject(":Post Actual Costs by Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Post Actual Costs by Item.VirtualClusterLineEdit_ItemLineEdit", "CTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Post Actual Costs by Item.Select all Costs_QPushButton");
        clickButton(":Post Actual Costs by Item.Select all Costs_QPushButton");
        
        
        waitForObject(":Post Actual Costs by Item.Schedule_QPushButton");
        clickButton(":Post Actual Costs by Item.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        
        
    }
    catch(e)
    {
        test.fail("Error in Posting Actual Costs by Item " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Post Actual Costs by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Actual Costs by Classcode-----
    try
    {
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
        
        waitForObject(":Post Actual Costs by Class Code.Schedule_QPushButton");
        clickButton(":Post Actual Costs by Class Code.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Posting Actual Costs by Class Code " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Post Actual Costs by Classcode");
    
    else test.fail("Batch Manager not responding");
    
    
    //-----Post Standard Costs by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Post Standard Costs");
        activateItem(":*.Costing_QMenu", "Post Standard Costs");
        waitForObjectItem(":*.Post Standard Costs_QMenu", "by Item...");
        activateItem(":*.Post Standard Costs_QMenu", "by Item...");
        waitForObject(":Update Standard Costs By Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Update Standard Costs By Item.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":Update Standard Costs By Item.Select all Costs_QPushButton");
        clickButton(":Update Standard Costs By Item.Select all Costs_QPushButton");
        
        waitForObject(":Update Standard Costs By Item.Schedule_QPushButton");
        clickButton(":Update Standard Costs By Item.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Posting Standard Costs by Item " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Post Standard Costs by Item");
    
    else test.fail("Batch Manager not responding");
    
    
    //-----Post Standard Costs by Classcode-----
    try
    {
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
        
        waitForObject(":Update Standard Costs By Class Code.Schedule_QPushButton");
        clickButton(":Update Standard Costs By Class Code.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Posting Standard Costs by Class Code " + e);
    }
    
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Post Standard Costs by Classcode");
    
    else test.fail("Batch Manager not responding");
    
    //**-----Update Order Upto Level by Item-----
    try
    {
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
        
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_warehouse.All Sites_QRadioButton_14");
        clickButton(":_warehouse.All Sites_QRadioButton_14");
        waitForObject(":Periods to Include in Analysis._calendar_CalendarComboBox");
        clickItem(":Periods to Include in Analysis._calendar_CalendarComboBox", "2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Update Order Up To Level by Item.Schedule_QPushButton");
        clickButton(":Update Order Up To Level by Item.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Order Upto Level by Item " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Order Upto Level by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Order Upto Level by Plannercode-----
    try
    {
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
        
        waitForObject(":Update Order Up To Levels by Planner Code.Schedule_QPushButton");
        clickButton(":Update Order Up To Levels by Planner Code.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Order Upto Level by Planner Code " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Order Upto Level by Plannercode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Order Upto Level by Classcode-----    
    try
    {
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
        
        waitForObject(":Update Order Up To Levels by Class Code.Schedule_QPushButton");
        clickButton(":Update Order Up To Levels by Class Code.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Order Upto Level by Class Code  " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Order Upto Level by Classcode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Reorder Level by Item-----
    try
    {
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
        waitForObject(":_stack.VirtualClusterLineEdit_ItemLineEdit");
        type(":_stack.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Site Selection.All Sites_QRadioButton");
        clickButton(":Site Selection.All Sites_QRadioButton");
        waitForObject(":Options.Update Immediately_QRadioButton");
        clickButton(":Options.Update Immediately_QRadioButton");
        waitForObjectItem(":Periods to Include in Analysis._calendar_CalendarComboBox_2", "2008");
        clickItem(":Periods to Include in Analysis._calendar_CalendarComboBox_2", "2008", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":_criteriaTab.Schedule_QPushButton_3");
        clickButton(":_criteriaTab.Schedule_QPushButton_3");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Reorder Level by Item " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Reorder Level by Item");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Reorder Level by Plannercode-----
    try
    {
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
        
        waitForObject(":_criteriaTab.Schedule_QPushButton");
        clickButton(":_criteriaTab.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Reorder Level by Planner Code  " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Reorder Level by Plannercode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Reorder Level by Classcode-----
    try
    {
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
        clickItem(":Periods to Include in Analysis._calendar_CalendarComboBox_4", "2009", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_criteriaTab.Schedule_QPushButton_2");
        clickButton(":_criteriaTab.Schedule_QPushButton_2");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Reorder Level by Class Code " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Reorder Level by Classcode");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Open AP Items------
    try
    {
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
        
        waitForObject(":Payables Aging.Query_QToolButton");
        clickButton(":Payables Aging.Query_QToolButton");
        
        waitForObject(":Payables Aging.Schedule_QToolButton");
        clickButton(":Payables Aging.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Payables Aging.Close_QToolButton");
        clickButton(":Payables Aging.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in submitting Time Phased Open AP Items " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Open AP Items");
    
    else test.fail("Batch Manager not responding");
    
    //-----Time Phased Open AR Items------  
    try
    {
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
        waitForObject(":Receivables Aging.Query_QToolButton");
        clickButton(":Receivables Aging.Query_QToolButton");
        waitForObject(":Receivables Aging.Schedule_QToolButton");
        clickButton(":Receivables Aging.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Receivables Aging.Close_QToolButton");
        clickButton(":Receivables Aging.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in  submitting Time Phased Open AR Items " + e);
    }
    
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Time Phased Open AR Items");
    
    else test.fail("Batch Manager not responding");
    
    //**-----Create Recurring Invoice-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Utilities");
        activateItem(":*.Accounting_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_3", "Create Recurring Invoices...");
        activateItem(":*.Utilities_QMenu_3", "Create Recurring Invoices...");
        
        waitForObject(":Create Recurring Invoices.Schedule_QPushButton");
        clickButton(":Create Recurring Invoices.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Creating Recurring Invoices " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Creating Recurring Invoices");
    
    else test.fail("Batch Manager not responding");
    
    //-----Create an Invoice-----
    try
    {
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
        waitForObject(":_billtoFrame.VirtualClusterLineEdit_CLineEdit");
        type(":_billtoFrame.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        var invoice = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":lineItemsTab.New_QPushButton");
        clickButton(":lineItemsTab.New_QPushButton");
        waitForObject(":Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Item.VirtualClusterLineEdit_ItemLineEdit", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_ordered_XLineEdit_2");
        type(":_ordered_XLineEdit_2", "25");
        waitForObject(":_billed_XLineEdit");
        type(":_billed_XLineEdit", "25");
        
        waitForObject(":Invoice.Save_QPushButton");
        clickButton(":Invoice.Save_QPushButton");
        waitForObject(":Invoice.Save_QPushButton_2");
        clickButton(":Invoice.Save_QPushButton_2"); 
    }
    catch(e)
    {
        test.fail("Error in Creating Invoice " + e);
    }
    
    
    
    //-----Print Invoices(Sales)-----
    try
    {
        waitForObject(":_invchead_XTreeWidget");
        clickItem(":_invchead_XTreeWidget", invoice, 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":List Unposted Invoices.Print_QPushButton");
        clickButton(":List Unposted Invoices.Print_QPushButton");
        
        waitForObject(":List Unposted Invoices.Print_QPushButton_2");
        clickButton(":List Unposted Invoices.Print_QPushButton_2");
        snooze(1);	  
        nativeType("<Return>");  
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
        
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in printing Invoice " + e);
    }   
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Invoices from Sales");
    
    else test.fail("Batch Manager not responding");
    
    
    //-----Create an Invoice-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        nativeType("<Down>");
        nativeType("<Down>");
        nativeType("<Down>");
        
        waitForObjectItem(":*.Sales_QMenu", "Billing");
        activateItem(":*.Sales_QMenu", "Billing");
        nativeType("<Right>");
        waitForObjectItem(":*.Billing_QMenu", "Invoice");
        activateItem(":*.Billing_QMenu", "Invoice");
        
        waitForObjectItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
        activateItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
        
        waitForObject(":List Unposted Invoices.New_QPushButton");
        clickButton(":List Unposted Invoices.New_QPushButton");
        waitForObject(":_billtoFrame.VirtualClusterLineEdit_CLineEdit");
        type(":_billtoFrame.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        
        var yinvoice =  findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":lineItemsTab.New_QPushButton");
        clickButton(":lineItemsTab.New_QPushButton");
        waitForObject(":Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Item.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5); 
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
    }
    catch(e)
    {
        test.fail("Error in Creating Invoice " + e);
    }
    
    
    
    
    //-----Re-Print Invoices-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObject(":*.Sales_QMenu");
        type(":*.Sales_QMenu", "<Down>");
        waitForObject(":*.Sales_QMenu");
        type(":*.Sales_QMenu", "<Down>");
        waitForObject(":*.Sales_QMenu");
        type(":*.Sales_QMenu", "<Down>");
        waitForObject(":*.Sales_QMenu");
        type(":*.Sales_QMenu", "<Right>");
        waitForObject(":*.Billing_QMenu");
        type(":*.Billing_QMenu", "<Down>");
        waitForObject(":*.Billing_QMenu");
        type(":*.Billing_QMenu", "<Down>");
        waitForObject(":*.Billing_QMenu");
        type(":*.Billing_QMenu", "<Right>");
        waitForObject(":*.Forms_QMenu_2");
        type(":*.Forms_QMenu_2", "<Down>");
        waitForObject(":*.Forms_QMenu_2");
        type(":*.Forms_QMenu_2", "<Down>");
        waitForObjectItem(":*.Forms_QMenu_2", "Re-Print Invoices...");
        activateItem(":*.Forms_QMenu_2", "Re-Print Invoices...");
        
        waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit");
        type(":Re-Print Invoices.XDateEdit_XDateEdit", "-30"); 
        waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit_2");
        type(":Re-Print Invoices.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Re-Print Invoices.Query_QPushButton");
        clickButton(":Re-Print Invoices.Query_QPushButton");
        waitForObject(":_invoice_XTreeWidget");
        clickItem(":_invoice_XTreeWidget", yinvoice, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Re-Print Invoices.Print_QPushButton");
        clickButton(":Re-Print Invoices.Print_QPushButton");   
        snooze(1);	  
        nativeType("<Return>");
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
        
        waitForObject(":Re-Print Invoices.Close_QPushButton");
        clickButton(":Re-Print Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Re Printing Invoice " + e);
    }
    
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Re-Printing Invoices from Sales");
    
    else test.fail("Batch Manager not responding");
    
    
    //**-----Create an Invoice-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Down>");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Down>");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Right>");
        waitForObject(":*.Accounts Receivable_QMenu");
        type(":*.Accounts Receivable_QMenu", "<Right>");
        waitForObject(":*.Invoice_QMenu");
        type(":*.Invoice_QMenu", "<Down>");
        waitForObject(":*.Invoice_QMenu");
        type(":*.Invoice_QMenu", "<Down>");
        waitForObjectItem(":*.Invoice_QMenu", "List Unposted...");
        activateItem(":*.Invoice_QMenu", "List Unposted...");
        
        waitForObject(":List Unposted Invoices.New_QPushButton");
        clickButton(":List Unposted Invoices.New_QPushButton");
        waitForObject(":_billtoFrame.VirtualClusterLineEdit_CLineEdit");
        type(":_billtoFrame.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        
        var arinvoice = findObject(":_invoiceNumber_XLineEdit").text;
        
        waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":lineItemsTab.New_QPushButton");
        clickButton(":lineItemsTab.New_QPushButton");
        waitForObject(":Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Item.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_ordered_XLineEdit_2");
        type(":_ordered_XLineEdit_2", "25");
        waitForObject(":_billed_XLineEdit");
        type(":_billed_XLineEdit", "25");
        
        waitForObject(":Invoice.Save_QPushButton");
        clickButton(":Invoice.Save_QPushButton");
        waitForObject(":Invoice.Save_QPushButton_2");
        clickButton(":Invoice.Save_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in Creating Invoice " + e);
    }
    
    
    
    //-----Print Invoices(AR)-----
    try
    {
        waitForObject(":_invchead_XTreeWidget");
        clickItem(":_invchead_XTreeWidget", arinvoice , 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Print_QPushButton");
        clickButton(":List Unposted Invoices.Print_QPushButton");
        waitForObject(":List Unposted Invoices.Print_QPushButton_2");
        clickButton(":List Unposted Invoices.Print_QPushButton_2");
        snooze(1);	  
        nativeType("<Return>");
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
        
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");  
    }
    catch(e)
    {
        test.fail("Error in printing Invoice " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Invoices from AR module");
    
    else test.fail("Batch Manager not responding");
    
    
    
    //-----Re-Print Invoices(AR)-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Down>");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Down>");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Right>");
        waitForObject(":*.Accounts Receivable_QMenu");
        type(":*.Accounts Receivable_QMenu", "<Down>");
        waitForObject(":*.Accounts Receivable_QMenu");
        type(":*.Accounts Receivable_QMenu", "<Down>");
        waitForObject(":*.Accounts Receivable_QMenu");
        type(":*.Accounts Receivable_QMenu", "<Down>");
        waitForObject(":*.Accounts Receivable_QMenu");
        type(":*.Accounts Receivable_QMenu", "<Down>");
        waitForObject(":*.Accounts Receivable_QMenu");
        type(":*.Accounts Receivable_QMenu", "<Right>");
        waitForObject(":*.Forms_QMenu_4");
        type(":*.Forms_QMenu_4", "<Down>");
        waitForObjectItem(":*.Forms_QMenu_4", "Re-Print Invoices...");
        activateItem(":*.Forms_QMenu_4", "Re-Print Invoices...");
        
        
        waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit");
        type(":Re-Print Invoices.XDateEdit_XDateEdit", "-30");
        waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit_2");
        type(":Re-Print Invoices.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Re-Print Invoices.Query_QPushButton");
        clickButton(":Re-Print Invoices.Query_QPushButton");
        waitForObject(":_invoice_XTreeWidget");
        clickItem(":_invoice_XTreeWidget", arinvoice, 5, 5, 1, Qt.LeftButton);
        waitForObject(":Re-Print Invoices.Print_QPushButton");
        clickButton(":Re-Print Invoices.Print_QPushButton");   
        snooze(1);	  
        nativeType("<Return>");
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
        
        waitForObject(":Re-Print Invoices.Close_QPushButton");
        clickButton(":Re-Print Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Re Printing Invoice " + e);
    }
    
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Re-Printing Invoices from AR module");
    
    else test.fail("Batch Manager not responding");
    
    
    //-----Post Invoices-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Down>");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Down>");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Right>");
        waitForObject(":*.Accounts Receivable_QMenu");
        type(":*.Accounts Receivable_QMenu", "<Right>");
        waitForObject(":*.Invoice_QMenu");
        type(":*.Invoice_QMenu", "<Down>");
        waitForObject(":*.Invoice_QMenu");
        type(":*.Invoice_QMenu", "<Down>");
        waitForObject(":*.Invoice_QMenu");
        type(":*.Invoice_QMenu", "<Down>");
        waitForObjectItem(":*.Invoice_QMenu", "Post...");
        activateItem(":*.Invoice_QMenu", "Post...");
        waitForObject(":Post Invoices.Schedule_QPushButton");
        clickButton(":Post Invoices.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.log("Exception in posting invoices:"+e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for posting Invoices from AR module");
    
    else test.fail("Batch Manager not responding");
    
    
    //-----Send Electronic Invoice(AR)-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Down>");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Down>");
        waitForObject(":*.Accounting_QMenu");
        type(":*.Accounting_QMenu", "<Right>");
        waitForObject(":*.Accounts Receivable_QMenu");
        type(":*.Accounts Receivable_QMenu", "<Right>");
        waitForObject(":*.Invoice_QMenu");
        type(":*.Invoice_QMenu", "<Down>");
        waitForObject(":*.Invoice_QMenu");
        type(":*.Invoice_QMenu", "<Down>");
        waitForObject(":*.Invoice_QMenu");
        type(":*.Invoice_QMenu", "<Down>");
        waitForObject(":*.Invoice_QMenu");
        type(":*.Invoice_QMenu", "<Down>");
        waitForObjectItem(":*.Invoice_QMenu", "Send Electronic Invoice...");
        activateItem(":*.Invoice_QMenu", "Send Electronic Invoice...");
        
        waitForObject(":_docstack_QLabel");
        sendEvent("QMouseEvent", ":_docstack_QLabel", QEvent.MouseButtonPress, 8, 8, Qt.RightButton, 0);
        waitForObject(":_QMenu");
        sendEvent("QContextMenuEvent", ":_QMenu", QContextMenuEvent.Mouse, 0, 0, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_5");
        doubleClickItem(":_listTab_XTreeWidget_5", arinvoice, 5, 5, 0, Qt.LeftButton);
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in sending Electronic Invoice " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for sending Electronic Invoice from AR module");
    
    else test.fail("Batch Manager not responding");
    
    
    
    
    //-----Post Standard Journal-----
    try
    {
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
        
        waitForObject(":Post Standard Journal.Schedule_QPushButton");
        clickButton(":Post Standard Journal.Schedule_QPushButton");
        
        waitForObject(":Series G/L Journal Entry.Schedule_QPushButton");
        clickButton(":Series G/L Journal Entry.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Post Standard Journal.Close_QPushButton");
        clickButton(":Post Standard Journal.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Posting Standard Journal " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Posting Standard Journal");
    
    else test.fail("Batch Manager not responding");
    
    //-----Post Standard Journal Group-----
    try
    {
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
        
        waitForObject(":Post Standard Journal Group.Schedule_QPushButton");
        clickButton(":Post Standard Journal Group.Schedule_QPushButton");
        waitForObject(":Series G/L Journal Entry.Schedule_QPushButton");
        clickButton(":Series G/L Journal Entry.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Post Standard Journal Group.Close_QPushButton");
        clickButton(":Post Standard Journal Group.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Posting Standard Journal Group " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Posting Standard Journal Group");
    
    else test.fail("Batch Manager not responding");
    
    //-----Update Late Customer Credit Status-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Utilities");
        activateItem(":*.Accounting_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_3", "Update Late Customer Credit Status...");
        activateItem(":*.Utilities_QMenu_3", "Update Late Customer Credit Status...");
        
        waitForObject(":Update Late Customer Credit Status.Schedule_QPushButton");
        clickButton(":Update Late Customer Credit Status.Schedule_QPushButton");
        waitForObject(":Schedule Action with xTuple Connect._email_XLineEdit");
        findObject(":Schedule Action with xTuple Connect._email_XLineEdit").clear();
        type(":Schedule Action with xTuple Connect._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Action with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Action with xTuple Connect.Schedule_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Late Customer Credit Status"+ e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Update Late Customer Credit Status");
    
    else test.fail("Batch Manager not responding");
    
    //-----Print CreditMemo-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
        activateItem(":*.Accounts Receivable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_4", "Open Receivables...");
        activateItem(":*.Reports_QMenu_4", "Open Receivables...");
        
        waitForObjectItem(":Open Receivables._select_XComboBox", "All Customers");
        clickItem(":Open Receivables._select_XComboBox", "All Customers", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Show.Both_QRadioButton");
        clickButton(":Show.Both_QRadioButton");
        if(!findObject(":Show.Unposted_XCheckBox").checked)
            clickButton(":Show.Unposted_XCheckBox");
        
        waitForObject(":Open Receivables.Query_QToolButton");
        clickButton(":Open Receivables.Query_QToolButton");
        
        
        waitForObject(":_list_XTreeWidget_4");
        openItemContextMenu(":_list_XTreeWidget_4","Invoice", 38, 5, 0);
        waitForObjectItem(":*._menu_QMenu", "Print...");
        activateItem(":*._menu_QMenu", "Print...");
        waitForObject(":Open Receivables.Print_QPushButton_2");
        clickButton(":Open Receivables.Print_QPushButton_2");
        snooze(1);	  
        nativeType("<Return>");
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
        waitForObject(":Open Receivables.Close_QToolButton");
        clickButton(":Open Receivables.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in printing Credit Memo " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Credit Memos");
    
    else test.fail("Batch Manager not responding");
    
    //-----Print Statement by Customer-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Forms");
        activateItem(":*.Accounts Receivable_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu_4", "Print Statement by Customer...");
        activateItem(":*.Forms_QMenu_4", "Print Statement by Customer...");
        
        waitForObject(":Print Statement by Customer.VirtualClusterLineEdit_CLineEdit");
        type(":Print Statement by Customer.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":Print Statement by Customer.Print_QPushButton");
        clickButton(":Print Statement by Customer.Print_QPushButton");
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");  
        snooze(1);	  
        nativeType("<Return>");
        
        waitForObject(":Print Statement by Customer.Close_QPushButton");
        clickButton(":Print Statement by Customer.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Print Statement by Customer " + e);
    }

    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Statement by Customer");
    
    else test.fail("Batch Manager not responding");

    //-----Print Statement by Customer Type-----
  try
  {
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
      snooze(1);	  
      nativeType("<Return>");
      waitForObject(":Review EDI Before Sending.OK_QPushButton");
      clickButton(":Review EDI Before Sending.OK_QPushButton");  

      
      waitForObject(":Print Statements by Customer Type.Close_QPushButton");
      clickButton(":Print Statements by Customer Type.Close_QPushButton");
  }
  catch(e)
  {
      test.fail("Error in Print Statement by Customer Type " + e);
  }
  

    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Printing Statement by Customer Type");
    
    else test.fail("Batch Manager not responding");

  
    //-----Operation Buffer Status-----
    try
    {
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
        
        waitForObject(":Work Order Operation Buffer Status by Work Center.Schedule_QPushButton");
        clickButton(":Work Order Operation Buffer Status by Work Center.Schedule_QPushButton");
        waitForObject(":Work Order Operation Buffer Status by Work Center._fromEmail_XLineEdit");
        findObject(":Work Order Operation Buffer Status by Work Center._fromEmail_XLineEdit").clear();
        
        type(":Work Order Operation Buffer Status by Work Center._fromEmail_XLineEdit", fromemail);
        waitForObject(":Work Order Operation Buffer Status by Work Center._email_XLineEdit");
        findObject(":Work Order Operation Buffer Status by Work Center._email_XLineEdit").clear();
        type(":Work Order Operation Buffer Status by Work Center._email_XLineEdit", toemail); 
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Work Order Operation Buffer Status by Work Center.Close_QPushButton");
        clickButton(":Work Order Operation Buffer Status by Work Center.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Operation Buffer Status " + e);
    }
    
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Operation Buffer Status");
    
    else test.fail("Batch Manager not responding");
    
    //-----Incident-----
    try
    {
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
        
        waitForObject(":_crmacctGroup.VirtualClusterLineEdit_CRMAcctLineEdit");
        type(":_crmacctGroup.VirtualClusterLineEdit_CRMAcctLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":Contact.VirtualClusterLineEdit_ContactClusterLineEdit");
        type(":Contact.VirtualClusterLineEdit_ContactClusterLineEdit", "Mike");
        nativeType("<Tab>");
        snooze(0.5);
        
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
        
        findObject(":_alarmGroup._emailRecipient_QLineEdit").clear();
        waitForObject(":_alarmGroup._emailRecipient_QLineEdit");
        type(":_alarmGroup._emailRecipient_QLineEdit",toemail);
        
        waitForObject(":_alarmTab.Save_QPushButton_3");
        clickButton(":_alarmTab.Save_QPushButton_3");
        waitForObject(":Database Information.Save_QPushButton");
        clickButton(":Database Information.Save_QPushButton");
        
        test.log("Created an Incident with alarms");
    }
    catch(e)
    {
        test.fail("Error in Creating Incident " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Incidents");
    
    else test.fail("Batch Manager not responding");
    
    //------Create an EDI Profile-----
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu", "Setup...");
        waitForObject(":Master Information.EDI Profiles_QModelIndex");
        mouseClick(":Master Information.EDI Profiles_QModelIndex", 20, 2, 0, Qt.LeftButton);
        waitForObject(":_stack.New_QPushButton");
        clickButton(":_stack.New_QPushButton");
        waitForObject(":_name_QLineEdit_4");
        type(":_name_QLineEdit_4", "ZTOYS-Quote");
        waitForObjectItem(":_type_XComboBox_5", "EMail");
        clickItem(":_type_XComboBox_5", "EMail", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_stack.Review Before Sending_QCheckBox");
        clickButton(":_stack.Review Before Sending_QCheckBox");
        waitForObject(":_emailTo_QLineEdit_3");
        type(":_emailTo_QLineEdit_3", fromemail);
        
        waitForObject(":_emailSubject_QLineEdit_3");
        type(":_emailSubject_QLineEdit_3", "Please find the Quote </docnumber> enclosed");
        
        waitForObject(":_emailBody_QTextEdit_3");
        type(":_emailBody_QTextEdit_3", "Hi ZTOYS,Please find enclosed the Quote </docnumber> Thanks.");
        
        waitForObject(":_formsTab.New_QPushButton_2");
        clickButton(":_formsTab.New_QPushButton_2");
        waitForObject(":_stack.OK_QPushButton");
        clickButton(":_stack.OK_QPushButton");
        
        waitForObjectItem(":_type_XComboBox_6", "Quote");
        clickItem(":_type_XComboBox_6", "Quote", 5, 5, 1, Qt.LeftButton);
        waitForObjectItem(":_output_XComboBox_3", "Report");
        clickItem(":_output_XComboBox_3", "Report", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_file_QLineEdit_3");
        type(":_file_QLineEdit_3", "Report");
        waitForObjectItem(":_reportReport_XComboBox_3", "Quote");
        clickItem(":_reportReport_XComboBox_3", "Quote", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_stack.OK_QPushButton_2");
        clickButton(":_stack.OK_QPushButton_2");
        
        waitForObject(":_stack.Save_QPushButton");
        clickButton(":_stack.Save_QPushButton");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("EDI Profile for ZTOYS-Quote is created");
    }
    catch(e)
    {
        test.fail("Error in Creating EDI profile " + e);
    }
    
    
    //-----Create a Prospect-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Prospect");
        activateItem(":*.Sales_QMenu", "Prospect");
        waitForObjectItem(":*.Prospect_QMenu", "List...");
        activateItem(":*.Prospect_QMenu", "List...");
        
        
        waitForObject(":Prospects.New_QToolButton");
        clickButton(":Prospects.New_QToolButton");
        waitForObject(":_number_XLineEdit");
        type(":_number_XLineEdit", "ZTOYS");
        waitForObject(":_name_QLineEdit_2");
        type(":_name_QLineEdit_2", "Zen Toys Ltd.");
        waitForObjectItem(":_salesrep_XComboBox", "1000-Sam Masters");
        clickItem(":_salesrep_XComboBox", "1000-Sam Masters", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":_contactTab.VirtualClusterLineEdit_ContactClusterLineEdit");
        mouseClick(":_contactTab.VirtualClusterLineEdit_ContactClusterLineEdit", 30, 12, 0, Qt.LeftButton);
        waitForObject(":_contactTab.VirtualClusterLineEdit_ContactClusterLineEdit");
        type(":_contactTab.VirtualClusterLineEdit_ContactClusterLineEdit", "Colin");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Prospect.Save_QPushButton");
        clickButton(":Prospect.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_5");
        if(!clickItem(":_list_XTreeWidget_5", "ZTOYS", 5, 5, 1, Qt.LeftButton))
            test.pass("Prospect - ZTOYS created"); 
        else test.fail("Prospect - ZTOYS not created");
        
    }
    catch(e)
    {
        test.fail("Error in Creating Prospect " + e);
    }
    
    //-----Attach an EDI Profile to Prospect-----
    try
    {
        waitForObject(":Prospects.Query_QToolButton");
        clickButton(":Prospects.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_5");
        doubleClickItem(":_list_XTreeWidget_5", "ZTOYS", 5, 5, 0, Qt.LeftButton);
        
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
        
        waitForObject(":Prospects.Close_QToolButton");
        clickButton(":Prospects.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in attaching EDI profile to Prospect " + e);
    }
    
    
    //-----Create a Quote using Prospect-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Quote");
        activateItem(":*.Sales_QMenu", "Quote");
        waitForObjectItem(":*.Quote_QMenu", "New...");
        activateItem(":*.Quote_QMenu", "New...");
        
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2", "ZTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
        
        var quote = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
        
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_3");
        clickButton(":_lineItemsPage.New_QPushButton_3");
        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3");
        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit_3", "YTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
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
        
        waitForObject(":Database Information.Save_QPushButton");
        clickButton(":Database Information.Save_QPushButton");
        
        waitForObject(":Quote.Cancel_QPushButton"); 
        clickButton(":Quote.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Creating Quote by Prospect " + e);
    }
    //-----Electronic Quote for Prospect-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Forms");
        activateItem(":*.Sales_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu_3", "Send Electronic Quote ...");
        activateItem(":*.Forms_QMenu_3", "Send Electronic Quote ...");
        waitForObject(":_docstack_QLabel");
        sendEvent("QMouseEvent", ":_docstack_QLabel", QEvent.MouseButtonPress, 8, 10, Qt.RightButton, 0);
        waitForObject(":_QMenu");
        sendEvent("QContextMenuEvent", ":_QMenu", QContextMenuEvent.Mouse, 0, 0, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_7");
        doubleClickItem(":_listTab_XTreeWidget_7", quote, 5, 5, 0, Qt.LeftButton);
        
        waitForObject(":Review EDI Before Sending.OK_QPushButton");
        clickButton(":Review EDI Before Sending.OK_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Submitting Electronic Quote " + e);
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Quote using Prospects ");
    
    else test.fail("Batch Manager not responding");
    
    //-----Single Level Bill of Materials Screen-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Bills of Materials");
        activateItem(":*.Reports_QMenu_6", "Bills of Materials");
        waitForObjectItem(":*.Bills of Materials_QMenu", "Single Level...");
        activateItem(":*.Bills of Materials_QMenu", "Single Level...");
        waitForObject(":Bill of Materials.VirtualClusterLineEdit_ItemLineEdit_2");
        type(":Bill of Materials.VirtualClusterLineEdit_ItemLineEdit_2", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":Single Level Bill of Materials.Query_QToolButton");
        clickButton(":Single Level Bill of Materials.Query_QToolButton");
        waitForObject(":Single Level Bill of Materials.Schedule_QToolButton");
        clickButton(":Single Level Bill of Materials.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        
        waitForObject(":Single Level Bill of Materials.Close_QToolButton");
        clickButton(":Single Level Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Single Level Bill of Materials Screen");
    }

    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Single Level Bill of Materials ");
    
    else test.fail("Batch Manager not responding");

    //----- Indented Bill of Materials Screen -----
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Bills of Materials");
        activateItem(":*.Reports_QMenu_6", "Bills of Materials");
        waitForObjectItem(":*.Bills of Materials_QMenu", "Indented...");
        activateItem(":*.Bills of Materials_QMenu", "Indented...");
        
        waitForObject(":Bill of Materials.VirtualClusterLineEdit_ItemLineEdit_3");
        type(":Bill of Materials.VirtualClusterLineEdit_ItemLineEdit_3", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":Indented Bill of Materials.Query_QToolButton");
        clickButton(":Indented Bill of Materials.Query_QToolButton");
        waitForObject(":Indented Bill of Materials.Schedule_QToolButton");
        clickButton(":Indented Bill of Materials.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Indented Bill of Materials.Close_QToolButton");
        clickButton(":Indented Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Indented Bill of Materials Screen");
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Indented Bill of Materials ");
    
    else test.fail("Batch Manager not responding");
    
    //------ Summarized Bill of Materials Screen ---------
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Bills of Materials");
        activateItem(":*.Reports_QMenu_6", "Bills of Materials");
        waitForObjectItem(":*.Bills of Materials_QMenu", "Summarized...");
        activateItem(":*.Bills of Materials_QMenu", "Summarized...");
        
        waitForObject(":Bill of Materials.VirtualClusterLineEdit_ItemLineEdit");
        type(":Bill of Materials.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        waitForObject(":Summarized Bill of Materials.Query_QToolButton");
        clickButton(":Summarized Bill of Materials.Query_QToolButton");
        waitForObject(":Summarized Bill of Materials.Schedule_QToolButton");
        clickButton(":Summarized Bill of Materials.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Summarized Bill of Materials.Close_QToolButton");
        clickButton(":Summarized Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Summarized Bill of Materials Screen");
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Summarized Bill of Materials  ");
    
    else test.fail("Batch Manager not responding");
    
    
    //------ Single Level Where Used Screen ---------
    
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Where Used");
        activateItem(":*.Reports_QMenu_6", "Where Used");
        waitForObjectItem(":*.Where Used_QMenu", "Single Level...");
        activateItem(":*.Where Used_QMenu", "Single Level...");
        
        waitForObject(":Single Level Where Used.VirtualClusterLineEdit_ItemLineEdit");
        type(":Single Level Where Used.VirtualClusterLineEdit_ItemLineEdit", "TBOX1");
        nativeType("<Tab>");
        waitForObject(":Single Level Where Used.Query_QToolButton");
        clickButton(":Single Level Where Used.Query_QToolButton");
        waitForObject(":Single Level Where Used.Schedule_QToolButton");
        clickButton(":Single Level Where Used.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Single Level Where Used.Close_QToolButton");
        clickButton(":Single Level Where Used.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in scheduling single level where used Screen");
    }
    
    //-----Verify the submission in Batch Manager-----
    
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for single level where used Screen  ");
    
    else test.fail("Batch Manager not responding");
    
    //------ Indented Where Used Screen ---------
    
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Where Used");
        activateItem(":*.Reports_QMenu_6", "Where Used");
        waitForObjectItem(":*.Where Used_QMenu", "Indented...");
        activateItem(":*.Where Used_QMenu", "Indented...");
        
        waitForObject(":Indented Where Used.VirtualClusterLineEdit_ItemLineEdit");
        type(":Indented Where Used.VirtualClusterLineEdit_ItemLineEdit", "TBOX1");
        nativeType("<Tab>");
        waitForObject(":Indented Where Used.Query_QToolButton");
        clickButton(":Indented Where Used.Query_QToolButton");
        waitForObject(":Indented Where Used.Schedule_QToolButton");
        clickButton(":Indented Where Used.Schedule_QToolButton");
        
        waitForObject(":_deststack._fromEmail_XLineEdit");
        findObject(":_deststack._fromEmail_XLineEdit").clear();
        type(":_deststack._fromEmail_XLineEdit", fromemail);
        
        waitForObject(":_deststack._email_XLineEdit");
        findObject(":_deststack._email_XLineEdit").clear();
        type(":_deststack._email_XLineEdit", toemail);
        
        waitForObject(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        clickButton(":Schedule Report with xTuple Connect.Schedule_QPushButton");
        waitForObject(":Indented Where Used.Close_QToolButton");
        clickButton(":Indented Where Used.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in Scheduling Indented Where Used Screen");
    }
    
    //-----Verify the submission in Batch Manager-----
    var result = batchmanager();
    
    if(result == true)
        test.pass("Batch Manager Submitted for Scheduling Indented where used Screen  ");
    
    else test.fail("Batch Manager not responding");
    
    
}
