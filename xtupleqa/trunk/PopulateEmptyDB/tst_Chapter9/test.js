function main()
{
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER");       
    var appEdition = findApplicationEdition();
    
    //---------Define: Incident Categories----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Categories...");
        activateItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Categories...");
        
        waitForObject(":List Incident Categories.New_QPushButton");
        clickButton(":List Incident Categories.New_QPushButton");
        waitForObject(":_name_XLineEdit_14");
        type(":_name_XLineEdit_14", "Product");
        type(":Incident Category._order_QSpinBox", "<Ctrl+A>");
        type(":Incident Category._order_QSpinBox", "<Del>");
        type(":Incident Category._order_QSpinBox", "10");
        type(":Incident Category._descrip_QTextEdit", "Product related incidents");
        waitForObject(":Incident Category.Save_QPushButton");
        clickButton(":Incident Category.Save_QPushButton");
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
        waitForObject(":Incident Category.Save_QPushButton");
        clickButton(":Incident Category.Save_QPushButton");
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
        waitForObject(":Incident Category.Save_QPushButton");
        clickButton(":Incident Category.Save_QPushButton");
        waitForObject(":List Incident Categories._incidentCategories_XTreeWidget");
        if(object.exists("{column='1' container=':List Incident Categories._incidentCategories_XTreeWidget' text='Vendor' type='QModelIndex'}"))
            test.pass("Incident Categories created for: Vendor");
        else test.fail("Incident Categories not created for: Vendor");
        
        waitForObject(":List Incident Categories.Close_QPushButton");
        clickButton(":List Incident Categories.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Incident category:"+e);}
    
    //--------------Create: Incident Severities----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Severities...");
        activateItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Severities...");
        waitForObject(":List Incident Severities.New_QPushButton");
        clickButton(":List Incident Severities.New_QPushButton");
        waitForObject(":_name_XLineEdit_15");
        type(":_name_XLineEdit_15", "Crash");
        type(":Incident Severity._order_QSpinBox", "<Ctrl+A>");
        type(":Incident Severity._order_QSpinBox", "<Del>");
        type(":Incident Severity._order_QSpinBox", "5");
        type(":Incident Severity._descrip_QTextEdit", "System Down");
        clickButton(":Incident Severity.Save_QPushButton");
        waitForObject(":List Incident Severities._incidentSeverities_XTreeWidget");
        if(object.exists(":_incidentSeverities.Crash_QModelIndex"))
            test.pass("Incident Severity created : Crash");
        else test.fail("Incident Severity not created : Crash");
        
        waitForObject(":List Incident Severities.Close_QPushButton");
        clickButton(":List Incident Severities.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Incident Severities:"+e)}
    
    
    //--------------Create Incident Resolutions----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Incident");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Resolutions...");
        activateItem(":xTuple ERP: OpenMFG Edition.Incident_QMenu", "Resolutions...");
        
        waitForObject(":List Incident Resolutions.New_QPushButton");
        clickButton(":List Incident Resolutions.New_QPushButton");
        waitForObject(":_name_XLineEdit_16");
        type(":_name_XLineEdit_16", "Replace");
        type(":Incident Resolution._order_QSpinBox", "<Ctrl+A>");
        type(":Incident Resolution._order_QSpinBox", "<Del>");
        type(":Incident Resolution._order_QSpinBox", "40");
        type(":Incident Resolution._descrip_QTextEdit", "Replace Unit");
        waitForObject(":Incident Resolution.Save_QPushButton");
        clickButton(":Incident Resolution.Save_QPushButton");
        waitForObject(":List Incident Resolutions._incidentResolutions_XTreeWidget");
        if(object.exists(":_incidentResolutions.Replace_QModelIndex"))
            test.pass("Incident Resolution created : Replace");
        else test.fail("Incident Resolution not created: Replace");
        
        waitForObject(":List Incident Resolutions.Close_QPushButton");
        clickButton(":List Incident Resolutions.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Incident Resolution:"+e);}
    
  
    //------------CRM Oppurtunity Sources---------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Opportunity");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Opportunity");
        waitForObjectItem(":xTuple ERP: *.Opportunity_QMenu", "Sources...");
        activateItem(":xTuple ERP: *.Opportunity_QMenu", "Sources...");
        
        waitForObject(":List Opportunity Sources.New_QPushButton_2");
        clickButton(":List Opportunity Sources.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_27");
        type(":_name_XLineEdit_27", "ADVERT");
        type(":_description_XLineEdit_35", "Advertising");
        clickButton(":Opportunity Source.Save_QPushButton");
        
        waitForObject(":List Opportunity Sources.New_QPushButton_2");
        clickButton(":List Opportunity Sources.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_27");
        type(":_name_XLineEdit_27", "TRADE");
        type(":_description_XLineEdit_35", "Trade Show");
        clickButton(":Opportunity Source.Save_QPushButton");
        waitForObject(":List Opportunity Sources._oplist_XTreeWidget");
       if(object.exists(":_oplist.TRADE_QModelIndex"))
           test.pass("Opportunity Trade saved");
       else test.fail("Opportunity trade not saved");
       
       if(object.exists("{column='0' container=':List Opportunity Sources._oplist_XTreeWidget' text='ADVERT' type='QModelIndex'}"))
           test.pass("Opportunity Advert saved");
       else test.fail("Opportunity Advert not saved");
        waitForObject(":List Opportunity Sources.Close_QPushButton_2");
        clickButton(":List Opportunity Sources.Close_QPushButton_2");
       
    }catch(e){test.fail("Exception in creating Opportunity sources:"+e)}
    
    //------------CRM Oppurtunity Stages-------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Opportunity");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Opportunity");
        waitForObjectItem(":xTuple ERP: *.Opportunity_QMenu", "Stages...");
        activateItem(":xTuple ERP: *.Opportunity_QMenu", "Stages...");
        
        waitForObject(":List Opportunity Stages.New_QPushButton_2");
        clickButton(":List Opportunity Stages.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_28");
        type(":_name_XLineEdit_28", "RFQ");
        type(":_description_XLineEdit_36", "Request For Quote");
        clickButton(":Opportunity Stage.Save_QPushButton");
        
        waitForObject(":List Opportunity Stages.New_QPushButton_2");
        clickButton(":List Opportunity Stages.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_28");
        type(":_name_XLineEdit_28", "ORDER");
        type(":_description_XLineEdit_36", "Sales Order");
        clickButton(":Opportunity Stage.Save_QPushButton");
        
        waitForObject(":List Opportunity Stages.New_QPushButton_2");
        clickButton(":List Opportunity Stages.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_28");
        type(":_name_XLineEdit_28", "LOST");
        type(":_description_XLineEdit_36", "Lost Order");
        clickButton(":Opportunity Stage.Save_QPushButton");
        
        if(object.exists(":_oplist.LOST_QModelIndex"))
            test.pass("Opportunity stage: LOST created");
        else test.fail("Opportunity stage: LOST not created");
        if(object.exists("{column='0' container=':List Opportunity Stages._oplist_XTreeWidget' text='ORDER' type='QModelIndex'}"))
            test.pass("Opportunity Stage: ORDER created");
        else test.fail("Opportunity Stage: ORDER not created");
        if(object.exists("{column='0' container=':List Opportunity Stages._oplist_XTreeWidget' text='RFQ' type='QModelIndex'}"))
            test.pass("Opportunity Stage: RFQ created ");
        else test.fail("Opportunity Stage: RFQ not created ");
                    

        waitForObject(":List Opportunity Stages.Close_QPushButton_2");
        clickButton(":List Opportunity Stages.Close_QPushButton_2");
        test.log("CRM oppurtunity stages created");
        
    }catch(e){test.fail("Exception in creating CRM opportunity stages:"+e);}
    
    //---------------CRM Oppurtunity Types------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Opportunity");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Opportunity");
        waitForObjectItem(":xTuple ERP: *.Opportunity_QMenu", "Types...");
        activateItem(":xTuple ERP: *.Opportunity_QMenu", "Types...");
        
        waitForObject(":List Opportunity Types.New_QPushButton_2");
        clickButton(":List Opportunity Types.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_29");
        type(":_name_XLineEdit_29", "PRIVATE");
        type(":_description_XLineEdit_37", "Private Label Product");
        clickButton(":Opportunity Type.Save_QPushButton");
        
        waitForObject(":List Opportunity Types.New_QPushButton_2");
        clickButton(":List Opportunity Types.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_29");
        type(":_name_XLineEdit_29", "PRICING");
        type(":_description_XLineEdit_37", "Pricing For Recurring Orders");
        clickButton(":Opportunity Type.Save_QPushButton");
        
        waitForObject(":List Opportunity Types.New_QPushButton_2");
        clickButton(":List Opportunity Types.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_29");
        type(":_name_XLineEdit_29", "ONETIME");
        type(":_description_XLineEdit_37", "One Time Quote");
        clickButton(":Opportunity Type.Save_QPushButton");
        
        if(object.exists(":_oplist.ONETIME_QModelIndex"))
            test.pass("Oppotunity type: ONETIME created");
        else test.fail("Oppotunity type: ONETIME not created");
        
        if(object.exists("{column='0' container=':List Opportunity Types._oplist_XTreeWidget' text='PRICING' type='QModelIndex'}"))
            test.pass("Opportunity type: PRICING created:");
        else test.fail("Opportunity type: PRICING not reated:");
             if(object.exists("{column='0' container=':List Opportunity Types._oplist_XTreeWidget' text='PRIVATE' type='QModelIndex'}"))
                 test.pass("Opportunity type: PRIVATE created");
             else test.fail("Opportunity type: PRIVATE not created");
        waitForObject(":List Opportunity Types.Close_QPushButton_2");
        clickButton(":List Opportunity Types.Close_QPushButton_2");
        test.log("CRM Oppurtunity Types created");
        
    }catch(e){test.fail("Exception in creating Opportunity types");}
    
    
    
    //--------------CRM Priorities-----------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Priorities...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Priorities...");
        
        waitForObject(":List Priorities.New_QPushButton_2");
        clickButton(":List Priorities.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_30");
        type(":_name_XLineEdit_30", "None");
        findObject(":Priority.qt_spinbox_lineedit_QLineEdit").clear();
        type(":Priority.qt_spinbox_lineedit_QLineEdit", "60");
        type(":Priority._descrip_QTextEdit", "Priority not set.");
        clickButton(":Priority.Save_QPushButton");
       if(object.exists(":_incidentPriorities.Priority not set._QModelIndex"))
           test.pass("Incident Priorities created");
       else test.fail("Incident Priorities not created");
        waitForObject(":List Priorities.Close_QPushButton_2");
        clickButton(":List Priorities.Close_QPushButton_2");
        test.log("CRM Priorities created");
    }catch(e){test.fail("Exception in creating CRM priorities");} 
  
    
    //-------------CRM Characteristics-----------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "CRM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.CRM_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Characteristics...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_2", "Characteristics...");
        
        waitForObject(":List Characteristics.New_QPushButton_2");
        clickButton(":List Characteristics.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_6");
        type(":_name_XLineEdit_6", "RFP#");
        waitForObject(":May be used on:.Opportunity_QCheckBox_2");
        clickButton(":May be used on:.Opportunity_QCheckBox_2");
        type(":_description_QTextEdit_6", "Request For Quote #");
        waitForObject(":_mask_QLineEdit");
        type(":_mask_QLineEdit", ".*");
        waitForObject(":Characteristic.Save_QPushButton");
        clickButton(":Characteristic.Save_QPushButton");
        
        waitForObject(":List Characteristics.New_QPushButton_2");
        clickButton(":List Characteristics.New_QPushButton_2");
        waitForObject(":_name_XLineEdit_6");
        type(":_name_XLineEdit_6", "START"); 
        waitForObject(":May be used on:.Employee_QCheckBox_2");
        clickButton(":May be used on:.Employee_QCheckBox_2");
        type(":_description_QTextEdit_6", "Employee Start Date");
        waitForObject(":_mask_QLineEdit");
        type(":_mask_QLineEdit", ".*");
        if(object.exists(":_char.I-COLOR_QModelIndex"))
            test.pass("Characteristics: START created");
        else test.fail("Characteristics: START not created");
        if(object.exists(":_char.I-COLOR_QModelIndex"))
            test.pass("Characteristics: I-COLOR created");
        else test.fail("Characteristics: I-COLOR not created");
        waitForObject(":Characteristic.Save_QPushButton");
        clickButton(":Characteristic.Save_QPushButton");
        
        waitForObject(":List Characteristics.Close_QPushButton_2");
        clickButton(":List Characteristics.Close_QPushButton_2");
        test.log("CRM Characteristics created");
        
    }catch(e){test.fail("Exception in defining Characteristics");}
    
}
