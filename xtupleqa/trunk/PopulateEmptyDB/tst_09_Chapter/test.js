function main()
{
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER");     
   
    var appEdition = findApplicationEdition();
    
    //---------Define: Incident Categories----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10,10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Incident Categories_QModelIndex");
        mouseClick(":Master Information.Incident Categories_QModelIndex", 86, 4, 0, Qt.LeftButton);
        
        waitForObject(":List Incident Categories.New_QPushButton");
        clickButton(":List Incident Categories.New_QPushButton");
        waitForObject(":_name_XLineEdit_14");
        type(":_name_XLineEdit_14", "Product");
        type(":Incident Category._order_QSpinBox", "<Ctrl+A>");
        type(":Incident Category._order_QSpinBox", "<Del>");
        type(":Incident Category._order_QSpinBox", "10");
        type(":Incident Category._descrip_QTextEdit", "Product related incidents");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Incident Categories._incidentCategories_XTreeWidget");
        if(object.exists(":_incidentCategories.Product_QModelIndex"))
            test.pass("Incident Categories created for: Product");
        else test.fail("Incident Categories not created for: Product");
        waitForObject(":List Incident Categories.New_QPushButton");
        clickButton(":List Incident Categories.New_QPushButton");
        waitForObject(":_name_XLineEdit_14");
        type(":_name_XLineEdit_14", "Customer");
        type(":Incident Category._order_QSpinBox", "<Ctrl+A>");
        type(":Incident Category._order_QSpinBox", "<Del>");
        type(":Incident Category._order_QSpinBox", "20");
        type(":Incident Category._descrip_QTextEdit", "Customer related incidents");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        snooze(1);
        waitForObject(":List Incident Categories._incidentCategories_XTreeWidget");
        if(object.exists("{column='1' container=':List Incident Categories._incidentCategories_XTreeWidget' text='Customer' type='QModelIndex'}"))
            test.pass("Incident Categories created for: Customer");
        else test.fail("Incident Categories not created for: Customer");
        waitForObject(":List Incident Categories.New_QPushButton");
        clickButton(":List Incident Categories.New_QPushButton");
        waitForObject(":_name_XLineEdit_14");
        type(":_name_XLineEdit_14", "Vendor");
        type(":Incident Category._order_QSpinBox", "<Ctrl+A>");
        type(":Incident Category._order_QSpinBox", "<Del>");
        type(":Incident Category._order_QSpinBox", "30");
        type(":Incident Category._descrip_QTextEdit", "Vendor related incidents");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Incident Categories._incidentCategories_XTreeWidget");
        if(object.exists("{column='1' container=':List Incident Categories._incidentCategories_XTreeWidget' text='Vendor' type='QModelIndex'}"))
            test.pass("Incident Categories created for: Vendor");
        else test.fail("Incident Categories not created for: Vendor");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in defining Incident category:"+e);}
    
    //--------------Create: Incident Severities----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10,10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Incident Severities_QModelIndex");
        mouseClick(":Master Information.Incident Severities_QModelIndex", 60, 8, 0, Qt.LeftButton);
        waitForObject(":List Incident Severities.New_QPushButton");
        clickButton(":List Incident Severities.New_QPushButton");
        waitForObject(":_name_XLineEdit_15");
        type(":_name_XLineEdit_15", "Crash");
        type(":Incident Severity._order_QSpinBox", "<Ctrl+A>");
        type(":Incident Severity._order_QSpinBox", "<Del>");
        type(":Incident Severity._order_QSpinBox", "5");
        type(":Incident Severity._descrip_QTextEdit", "System Down");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Incident Severities._incidentSeverities_XTreeWidget");
        if(object.exists(":_incidentSeverities.Crash_QModelIndex"))
            test.pass("Incident Severity created : Crash");
        else test.fail("Incident Severity not created : Crash");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in defining Incident Severities:"+e)}
    
    
    //--------------Create Incident Resolutions----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10,10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Incident Resolutions_QModelIndex");
        mouseClick(":Master Information.Incident Resolutions_QModelIndex", 65, 3, 0, Qt.LeftButton);
        
        waitForObject(":List Incident Resolutions.New_QPushButton");
        clickButton(":List Incident Resolutions.New_QPushButton");
        waitForObject(":_name_XLineEdit_16");
        type(":_name_XLineEdit_16", "Replace");
        type(":Incident Resolution._order_QSpinBox", "<Ctrl+A>");
        type(":Incident Resolution._order_QSpinBox", "<Del>");
        type(":Incident Resolution._order_QSpinBox", "40");
        type(":Incident Resolution._descrip_QTextEdit", "Replace Unit");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Incident Resolutions._incidentResolutions_XTreeWidget");
        if(object.exists(":_incidentResolutions.Replace_QModelIndex"))
            test.pass("Incident Resolution created : Replace");
        else test.fail("Incident Resolution not created: Replace");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in defining Incident Resolution:"+e);}
    
    
    //------------CRM Oppurtunity Sources---------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10,10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Opportunity Sources_QModelIndex");
        mouseClick(":Master Information.Opportunity Sources_QModelIndex", 87, 7, 0, Qt.LeftButton);
        
        waitForObject(":List Opportunity Sources.New_QPushButton_2");
        clickButton(":List Opportunity Sources.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_27");
        type(":_name_XLineEdit_27", "ADVERT");
        type(":_description_XLineEdit_35", "Advertising");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
        waitForObject(":List Opportunity Sources.New_QPushButton_2");
        clickButton(":List Opportunity Sources.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_27");
        type(":_name_XLineEdit_27", "TRADE");
        type(":_description_XLineEdit_35", "Trade Show");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Opportunity Sources._oplist_XTreeWidget");
        if(object.exists(":_oplist.TRADE_QModelIndex"))
            test.pass("Opportunity Trade saved");
        else test.fail("Opportunity trade not saved");
        
        if(object.exists("{column='0' container=':List Opportunity Sources._oplist_XTreeWidget' text='ADVERT' type='QModelIndex'}"))
            test.pass("Opportunity Advert saved");
        else test.fail("Opportunity Advert not saved");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
    }catch(e){test.fail("Exception in creating Opportunity sources:"+e)}
    
    //------------CRM Oppurtunity Stages-------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10,10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Opportunity Stages_QModelIndex");
        mouseClick(":Master Information.Opportunity Stages_QModelIndex", 86, 8, 0, Qt.LeftButton);
        
        waitForObject(":List Opportunity Stages.New_QPushButton_2");
        clickButton(":List Opportunity Stages.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_28");
        type(":_name_XLineEdit_28", "RFQ");
        type(":_description_XLineEdit_36", "Request For Quote");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
        waitForObject(":List Opportunity Stages.New_QPushButton_2");
        clickButton(":List Opportunity Stages.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_28");
        type(":_name_XLineEdit_28", "ORDER");
        type(":_description_XLineEdit_36", "Sales Order");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
        waitForObject(":List Opportunity Stages.New_QPushButton_2");
        clickButton(":List Opportunity Stages.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_28");
        type(":_name_XLineEdit_28", "LOST");
        type(":_description_XLineEdit_36", "Lost Order");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Opportunity Stages._oplist_XTreeWidget");
        if(object.exists(":_oplist.LOST_QModelIndex"))
            test.pass("Opportunity stage: LOST created");
        else test.fail("Opportunity stage: LOST not created");
        if(object.exists("{column='0' container=':List Opportunity Stages._oplist_XTreeWidget' text='ORDER' type='QModelIndex'}"))
            test.pass("Opportunity Stage: ORDER created");
        else test.fail("Opportunity Stage: ORDER not created");
        waitForObject(":List Opportunity Stages._oplist_XTreeWidget");
        if(object.exists("{column='0' container=':List Opportunity Stages._oplist_XTreeWidget' text='RFQ' type='QModelIndex'}"))
            test.pass("Opportunity Stage: RFQ created ");
        else test.fail("Opportunity Stage: RFQ not created ");
        
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("CRM oppurtunity stages created");
        
    }catch(e){test.fail("Exception in creating CRM opportunity stages:"+e);}
    
    //---------------CRM Oppurtunity Types------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10,10, 0, Qt.LeftButton);
        
        waitForObject(":Master Information.Opportunity Types_QModelIndex");
        mouseClick(":Master Information.Opportunity Types_QModelIndex", 80, 7, 0, Qt.LeftButton);
        waitForObject(":List Opportunity Types.New_QPushButton_2");
        clickButton(":List Opportunity Types.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_29");
        type(":_name_XLineEdit_29", "PRIVATE");
        type(":_description_XLineEdit_37", "Private Label Product");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
        waitForObject(":List Opportunity Types.New_QPushButton_2");
        clickButton(":List Opportunity Types.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_29");
        type(":_name_XLineEdit_29", "PRICING");
        type(":_description_XLineEdit_37", "Pricing For Recurring Orders");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
        waitForObject(":List Opportunity Types.New_QPushButton_2");
        clickButton(":List Opportunity Types.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_29");
        type(":_name_XLineEdit_29", "ONETIME");
        type(":_description_XLineEdit_37", "One Time Quote");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Opportunity Types._oplist_XTreeWidget")
                if(object.exists(":_oplist.ONETIME_QModelIndex"))
                    test.pass("Oppotunity type: ONETIME created");
        else test.fail("Oppotunity type: ONETIME not created");
        
        if(object.exists("{column='0' container=':List Opportunity Types._oplist_XTreeWidget' text='PRICING' type='QModelIndex'}"))
            test.pass("Opportunity type: PRICING created:");
        else test.fail("Opportunity type: PRICING not reated:");
        if(object.exists("{column='0' container=':List Opportunity Types._oplist_XTreeWidget' text='PRIVATE' type='QModelIndex'}"))
            test.pass("Opportunity type: PRIVATE created");
        else test.fail("Opportunity type: PRIVATE not created");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("CRM Oppurtunity Types created");
        
    }catch(e){test.fail("Exception in creating Opportunity types");}
    
    
    //--------------CRM Priorities-----------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10,10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Incident Priorities_QModelIndex");
        mouseClick(":Master Information.Incident Priorities_QModelIndex", 69, 8, 0, Qt.LeftButton);
        
        waitForObject(":List Priorities.New_QPushButton_2");
        clickButton(":List Priorities.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_30");
        type(":_name_XLineEdit_30", "None");
        findObject(":Priority.qt_spinbox_lineedit_QLineEdit").clear();
        type(":Priority.qt_spinbox_lineedit_QLineEdit", "60");
        type(":Priority._descrip_QTextEdit", "Priority not set.");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Priorities._incidentPriorities_XTreeWidget");
        if(object.exists(":_incidentPriorities.Priority not set._QModelIndex"))
            test.pass("Incident Priorities created");
        else test.fail("Incident Priorities not created");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("CRM Priorities created");
    }catch(e){test.fail("Exception in creating CRM priorities");} 
    
    

    
    //------------ we are getting Exception error here cross check once again--------
    //-------------CRM Characteristics-----------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","CRM",10,10, 0, Qt.LeftButton);
        waitForObject(":Master Information.Characteristics_QModelIndex");
        mouseClick(":Master Information.Characteristics_QModelIndex", 60, 5, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Characteristics.New_QPushButton_2");
        clickButton(":List Characteristics.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_6");
        type(":_name_XLineEdit_6", "RFP#");
        waitForObject(":May be used on:.Opportunity_QCheckBox_2");
        clickButton(":May be used on:.Opportunity_QCheckBox_2");
        waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar", "Description");
        waitForObject(":_descripPage._description_QTextEdit");
        type(":_descripPage._description_QTextEdit","Request For Quote #");
        
        waitForObject(":xTuple ERP: *_QPushButton");
        clickButton(":xTuple ERP: *_QPushButton");
        snooze(0.5);
        waitForObject(":List Characteristics.New_QPushButton_2");
        clickButton(":List Characteristics.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_6");
        type(":_name_XLineEdit_6", "START"); 
        waitForObject(":May be used on:.Employee_QCheckBox_2");
        clickButton(":May be used on:.Employee_QCheckBox_2");
        waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar", "Description");
        waitForObject(":_descripPage._description_QTextEdit");
        type(":_descripPage._description_QTextEdit","Employee Start Date");
        waitForObject(":xTuple ERP: *_QPushButton");
        clickButton(":xTuple ERP: *_QPushButton");
        snooze(0.5);
        if(object.exists(":_char.I-COLOR_QModelIndex"))
            test.pass("Characteristics: START created");
        else test.fail("Characteristics: START not created");
        snooze(0.5);
        if(object.exists(":_char.I-COLOR_QModelIndex"))
            test.pass("Characteristics: I-COLOR created");
        else test.fail("Characteristics: I-COLOR not created");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("CRM Characteristics created");
        
    }catch(e){test.fail("Exception in defining Characteristics");}
    
}
