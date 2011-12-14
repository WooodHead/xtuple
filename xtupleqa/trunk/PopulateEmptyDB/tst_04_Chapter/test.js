function main()
{
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER"); 
    waitForObject(":Cancel.Yes_QPushButton");
    clickButton(":Cancel.Yes_QPushButton");
    snooze(1);
    var appEdition = findApplicationEdition();
  
    if(appEdition=="Manufacturing")
    {
        
        //-------------Standard Labor Rate -------------------
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            waitForObject(":Setup._modules_QComboBox");
            clickItem(":Setup._modules_QComboBox","Products", 74, 11, 0, Qt.LeftButton);
            waitForObject(":Master Information.Standard Labor Rates_QModelIndex");
            mouseClick(":Master Information.Standard Labor Rates_QModelIndex", 96, 7, 0, Qt.LeftButton);
            
            waitForObject(":List Work Centers.New_QPushButton");
            clickButton(":List Work Centers.New_QPushButton");
            waitForObject(":_code_XLineEdit_17");
            type(":_code_XLineEdit_17", "Assembly");
            waitForObject(":_description_XLineEdit_41");
            type(":_description_XLineEdit_41", "Assembly Rate");
            type(":_rate_XLineEdit_3", "12.00");
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":_lbrrate_XTreeWidget_3");
            if(object.exists("{column='0' container=':_lbrrate_XTreeWidget_3' text='Assembly' type='QModelIndex'}"))
                test.pass("Standard Labor Rate created: Assembly");
            
            waitForObject(":List Work Centers.New_QPushButton");
            clickButton(":List Work Centers.New_QPushButton");
            waitForObject(":_code_XLineEdit_17");
            type(":_code_XLineEdit_17", "SETUP");
            waitForObject(":_description_XLineEdit_41");
            type(":_description_XLineEdit_41", "Setup Rate");
            type(":_rate_XLineEdit_3", "15.00");
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":_lbrrate_XTreeWidget_3");
            if(object.exists("{column='0' container=':_lbrrate_XTreeWidget_3' text='SETUP' type='QModelIndex'}"))
                test.pass("Standard Labor Rate created: SETUP");
            else test.fail("Standard Labor Rate not created: SETUP");
            
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
        }catch(e){test.fail("Exception in creating Standard Labor Rate:"+e);}
        
        try{
            //---------Create Work Centers------------
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            waitForObject(":Setup._modules_QComboBox");
            clickItem(":Setup._modules_QComboBox","Products", 74, 11, 0, Qt.LeftButton);
            waitForObject(":Master Information.Work Centers_QModelIndex");
            mouseClick(":Master Information.Work Centers_QModelIndex", 52, 5, 0, Qt.LeftButton);
            
            waitForObject(":List Work Centers.New_QPushButton");
            clickButton(":List Work Centers.New_QPushButton");
            waitForObject(":Work Center._code_XLineEdit");
            type(":Work Center._code_XLineEdit", "ASSEMBLY1");
            waitForObject(":Work Center._description_XLineEdit");
            type(":Work Center._description_XLineEdit", "Assembly Work Center #1");
            waitForObject(":Work Center._warehouse_WComboBox");
            clickItem(":Work Center._warehouse_WComboBox","WH1",0,0,0,Qt.LeftButton);
            waitForObject(":Setup Labor Rate.Specify Labor Rate:_QRadioButton");
            clickButton(":Setup Labor Rate.Specify Labor Rate:_QRadioButton");
            waitForObject(":Setup Labor Rate._setupRate_XLineEdit");
            findObject(":Setup Labor Rate._setupRate_XLineEdit").clear();
            type(":Setup Labor Rate._setupRate_XLineEdit", "10");
            waitForObject(":Run Labor Rate.Specify Labor Rate:_QRadioButton");
            clickButton(":Run Labor Rate.Specify Labor Rate:_QRadioButton");
            waitForObject(":Run Labor Rate._runRate_XLineEdit");
            findObject(":Run Labor Rate._runRate_XLineEdit").clear();
            type(":Run Labor Rate._runRate_XLineEdit", "10");
            waitForObject(":Overhead._numOfMachines_QSpinBox");
            findObject(":Overhead._numOfMachines_QSpinBox").clear();
            type(":Overhead._numOfMachines_QSpinBox", "1");
            waitForObject(":Overhead._numOfPeople_QSpinBox");
            findObject(":Overhead._numOfPeople_QSpinBox").clear()
                    type(":Overhead._numOfPeople_QSpinBox", "1");
            waitForObject(":Overhead._overheadPrcntOfLabor_XLineEdit");
            findObject(":Overhead._overheadPrcntOfLabor_XLineEdit").clear();
            type(":Overhead._overheadPrcntOfLabor_XLineEdit", "10");
            waitForObject(":Overhead._overheadPerLaborHour_XLineEdit");
            findObject(":Overhead._overheadPerLaborHour_XLineEdit").clear();
            type(":Overhead._overheadPerLaborHour_XLineEdit", "0");
            waitForObject(":Overhead._overheadPerMachHour_XLineEdit");
            findObject(":Overhead._overheadPerMachHour_XLineEdit").clear();
            type(":Overhead._overheadPerMachHour_XLineEdit", "0");
            waitForObject(":Overhead._overheadPerUnit_XLineEdit");
            findObject(":Overhead._overheadPerUnit_XLineEdit").clear();
            type(":Overhead._overheadPerUnit_XLineEdit", "0");
            
            waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar", "Scheduling");
            snooze(1);
            waitForObject(":Department.VirtualClusterLineEdit_DeptClusterLineEdit");
            type(":Department.VirtualClusterLineEdit_DeptClusterLineEdit", "mfg");
            waitForObject(":Department.VirtualClusterLineEdit_DeptClusterLineEdit");
            type(":Department.VirtualClusterLineEdit_DeptClusterLineEdit", "<Tab>");
            waitForObject(":Average._avgQueueDays_QSpinBox");
            findObject(":Average._avgQueueDays_QSpinBox").clear();
            type(":Average._avgQueueDays_QSpinBox", "0");
            waitForObject(":Average._avgSetup_XLineEdit");
            findObject(":Average._avgSetup_XLineEdit").clear();
            type(":Average._avgSetup_XLineEdit", "6");
            waitForObject(":Average._setupType_XComboBox");
            clickItem(":Average._setupType_XComboBox","Labor Time",0,0,0,Qt.LeftButton);
            waitForObject(":Capacity._dailyCapacity_XLineEdit");
            findObject(":Capacity._dailyCapacity_XLineEdit").clear();
            type(":Capacity._dailyCapacity_XLineEdit", "480");
            waitForObject(":Capacity._efficiencyFactor_XLineEdit");
            type(":Capacity._efficiencyFactor_XLineEdit", "100");
            
            waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar", "Notes");
            waitForObject(":_notesTab._comments_QTextEdit");
            findObject(":_notesTab._comments_QTextEdit").clear();
            type(":_notesTab._comments_QTextEdit", "Assembly Work Center Number 1");
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":List Work Centers._wrkcnt_XTreeWidget");
            if(object.exists(":_wrkcnt.ASSEMBLY1_QModelIndex_2"))
                test.pass("Work Center created: ASSEMBLY1");
            else test.fail("Work Center not created: ASSEMBLY1");
            waitForObject(":_wrkcnt.ASSEMBLY1_QModelIndex_2");
            mouseClick(":_wrkcnt.ASSEMBLY1_QModelIndex_2", 0, 0, 0, Qt.LeftButton);
            waitForObject(":List Work Centers.Copy_QPushButton");
            clickButton(":List Work Centers.Copy_QPushButton");
            
            waitForObject(":Work Center._code_XLineEdit");
            findObject(":Work Center._code_XLineEdit").clear();
            type(":Work Center._code_XLineEdit", "PAINT1");
            waitForObject(":Work Center._description_XLineEdit");
            findObject(":Work Center._description_XLineEdit").clear();
            type(":Work Center._description_XLineEdit", "Paint Work Center #1");
            waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar", "Scheduling");
            snooze(1);
            waitForObject(":Department.VirtualClusterLineEdit_DeptClusterLineEdit");
            type(":Department.VirtualClusterLineEdit_DeptClusterLineEdit", "mfg");
            waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar", "Notes");
            waitForObject(":_notesTab._comments_QTextEdit");
            findObject(":_notesTab._comments_QTextEdit").clear();
            type(":_notesTab._comments_QTextEdit", "Paint Work Center Number 1");
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":List Work Centers._wrkcnt_XTreeWidget");
            if(object.exists("{column='1' container=':List Work Centers._wrkcnt_XTreeWidget' text='PAINT1' type='QModelIndex'}"))
                test.pass("Work Center created: PAINT1");
            else test.fail("Work Center not created: PAINT1");
            mouseClick(":_wrkcnt.ASSEMBLY1_QModelIndex_2", 0, 0, 0, Qt.LeftButton);
            waitForObject(":List Work Centers.Copy_QPushButton");
            clickButton(":List Work Centers.Copy_QPushButton");
            
            waitForObject(":Work Center._code_XLineEdit");
            findObject(":Work Center._code_XLineEdit").clear();
            type(":Work Center._code_XLineEdit", "SHIPPING1");
            waitForObject(":Work Center._description_XLineEdit");
            findObject(":Work Center._description_XLineEdit").clear();
            type(":Work Center._description_XLineEdit", "Shipping Work Center #1");
            waitForObject(":Setup Labor Rate.Select Standard Rate:_QRadioButton");
            clickButton(":Setup Labor Rate.Select Standard Rate:_QRadioButton");
            clickItem(":Setup Labor Rate._stdSetupRate_XComboBox_4","Assembly",0,0,0,Qt.LeftButton);
            clickButton(":Run Labor Rate.Select Standard Rate:_QRadioButton");
            clickItem(":Run Labor Rate._stdRunRate_XComboBox_3","SETUP",0,0,0,Qt.LeftButton);
            
            waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar", "Scheduling");
            snooze(1);
            waitForObject(":Department.VirtualClusterLineEdit_DeptClusterLineEdit");
            type(":Department.VirtualClusterLineEdit_DeptClusterLineEdit", "mfg");
            
            waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar", "Notes");
            snooze(1);
            waitForObject(":_notesTab._comments_QTextEdit");
            findObject(":_notesTab._comments_QTextEdit").clear();
            type(":_notesTab._comments_QTextEdit", "Shipping Work Center Number 1");
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":List Work Centers._wrkcnt_XTreeWidget");
            if(object.exists("{column='1' container=':List Work Centers._wrkcnt_XTreeWidget' text='SHIPPING1' type='QModelIndex'}"))
                test.pass("Work Center created: SHIPPING1");
            else test.fail("Work Center not created: SHIPPING1");
            
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
        }catch(e){test.fail("Exception in creating work center:"+e)}
        
        
        //---------------------Products: Standard Operation--------------------
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            waitForObject(":Setup._modules_QComboBox");
            clickItem(":Setup._modules_QComboBox","Products", 74, 11, 0, Qt.LeftButton);
            waitForObject(":Master Information.Standard Operations_QModelIndex");
            mouseClick(":Master Information.Standard Operations_QModelIndex", 74, 3, 0, Qt.LeftButton);
            
            waitForObject(":List Work Centers.New_QPushButton");
            clickButton(":List Work Centers.New_QPushButton");
            waitForObject(":Standard Operation._number_XLineEdit");
            type(":Standard Operation._number_XLineEdit", "ASSEMBLY");
            type(":Standard Operation._description1_XLineEdit", "Standard Operation - Assembly");
            waitForObject(":Standard Operation._wrkcnt_XComboBox");
            clickItem(":Standard Operation._wrkcnt_XComboBox", "ASSEMBLY1",0,0,1,Qt.LeftButton);
            waitForObject(":Standard Operation._prodUOM_XComboBox");
            clickItem(":Standard Operation._prodUOM_XComboBox", "EA",0,0,1,Qt.LeftButton);
            waitForObject(":Standard Operation._invProdUOMRatio_XLineEdit");
            type(":Standard Operation._invProdUOMRatio_XLineEdit", "1");
            clickButton(":Standard Operation.Use Standard Times_QCheckBox");
            snooze(1);
            waitForObject(":_standardGroup._setupReport_XComboBox");
            clickItem(":_standardGroup._setupReport_XComboBox", "Direct Labor",0,0,1,Qt.LeftButton);
            type(":_standardGroup._runTime_XLineEdit", "60.00");
            waitForObject(":_standardGroup._runReport_XComboBox");
            clickItem(":_standardGroup._runReport_XComboBox", "Direct Labor",0,0,1,Qt.LeftButton);
            type(":_standardGroup._runQtyPer_XLineEdit", "100.00");
            type(":Standard Operation._instructions_QTextEdit", "Enter standard instructions through the Standard Operations session");
            
            waitForObject(":List Employees.Save_QPushButton_2");        
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":_stack._stdopn_XTreeWidget");
            if(!clickItem(":_stack._stdopn_XTreeWidget", "ASSEMBLY", 5, 5, 1, Qt.LeftButton))
                test.pass("Standard Operation created: ASSEMBLY");
            
            
            waitForObject(":List Work Centers.New_QPushButton");
            clickButton(":List Work Centers.New_QPushButton");
            waitForObject(":Standard Operation._number_XLineEdit");
            type(":Standard Operation._number_XLineEdit", "PAINT");
            type(":Standard Operation._description1_XLineEdit", "Standard Operation - Paint");
            clickItem(":Standard Operation._wrkcnt_XComboBox", "PAINT1",0,0,1,Qt.LeftButton);
            clickItem(":Standard Operation._prodUOM_XComboBox", "EA",0,0,1,Qt.LeftButton);
            type(":Standard Operation._invProdUOMRatio_XLineEdit", "1");
            clickButton(":Standard Operation.Use Standard Times_QCheckBox");
            waitForObject(":_standardGroup._setupReport_XComboBox");
            clickItem(":_standardGroup._setupReport_XComboBox", "Direct Labor",0,0,1,Qt.LeftButton);
            type(":_standardGroup._runTime_XLineEdit", "60.00");
            clickItem(":_standardGroup._runReport_XComboBox", "Direct Labor",0,0,1,Qt.LeftButton);
            type(":_standardGroup._runQtyPer_XLineEdit", "100.00");
            type(":Standard Operation._instructions_QTextEdit", "Enter standard instructions through the Standard Operations session");
            waitForObject(":List Employees.Save_QPushButton_2");    
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":_stack._stdopn_XTreeWidget");
            if(!clickItem(":_stack._stdopn_XTreeWidget", "PAINT", 5, 5, 1, Qt.LeftButton))
                test.pass("Standard Operation created: PAINT");
            
            
            
            waitForObject(":List Work Centers.New_QPushButton");
            clickButton(":List Work Centers.New_QPushButton");
            waitForObject(":Standard Operation._number_XLineEdit");
            type(":Standard Operation._number_XLineEdit", "SHIPPING");
            type(":Standard Operation._description1_XLineEdit", "Standard Operation - Shipping");
            clickItem(":Standard Operation._wrkcnt_XComboBox", "SHIPPING1",0,0,1,Qt.LeftButton);
            waitForObject(":Standard Operation._prodUOM_XComboBox");
            clickItem(":Standard Operation._prodUOM_XComboBox", "EA",0,0,1,Qt.LeftButton);
            type(":Standard Operation._invProdUOMRatio_XLineEdit", "1");
            clickButton(":Standard Operation.Use Standard Times_QCheckBox");
            waitForObject(":_standardGroup._setupReport_XComboBox");
            clickItem(":_standardGroup._setupReport_XComboBox", "Direct Labor",0,0,1,Qt.LeftButton);
            type(":_standardGroup._runTime_XLineEdit", "60.00");
            clickItem(":_standardGroup._runReport_XComboBox", "Direct Labor",0,0,1,Qt.LeftButton);
            type(":_standardGroup._runQtyPer_XLineEdit", "100.00");
            type(":Standard Operation._instructions_QTextEdit", "Enter standard instructions through the Standard Operations session");
            waitForObject(":List Employees.Save_QPushButton_2");            
            clickButton(":List Employees.Save_QPushButton_2");
            waitForObject(":_stack._stdopn_XTreeWidget");
            if(!clickItem(":_stack._stdopn_XTreeWidget", "SHIPPING", 5, 5, 1, Qt.LeftButton))
                test.pass("Standard Operation created: SHIPPING");
            
            waitForObject(":List Employees.Save_QPushButton_2");
            clickButton(":List Employees.Save_QPushButton_2");
        }catch(e){test.fail("Exception in creating Standard Operations:"+e);}
//        
//        
//        
        //-----------Define BOO for Items---------------
        try{
            waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Operations");
            activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Operations");
            waitForObjectItem(":xTuple ERP: *.Bill Of Operations_QMenu", "List...");
            activateItem(":xTuple ERP: *.Bill Of Operations_QMenu", "List...");    
            
            //-----------Define BOO for YTRUCK1---------------
            waitForObject(":Bills of Operations.New_QPushButton");
            clickButton(":Bills of Operations.New_QPushButton");
            
   
            waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
            type(":Item Sites.ItemLineEdit_ItemLineEdit","YTRUCK1");
            snooze(0.5);
            nativeType("<Tab>");
            
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":_stdopn_XComboBox");
            clickItem(":_stdopn_XComboBox", "PAINT", 0, 0, 1, Qt.LeftButton);
            snooze(1);
            waitForObject(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");
            clickButton(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");
            waitForObject(":Bill of Operations Item.Save_QPushButton");    
            clickButton(":Bill of Operations Item.Save_QPushButton");
            
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":_stdopn_XComboBox");
            clickItem(":_stdopn_XComboBox", "ASSEMBLY", 0, 0, 1, Qt.LeftButton);
            snooze(1);
            waitForObject(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");        
            clickButton(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");
            waitForObject(":Bill of Operations Item.Save_QPushButton");
            clickButton(":Bill of Operations Item.Save_QPushButton");
            
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":_stdopn_XComboBox");
            clickItem(":_stdopn_XComboBox", "SHIPPING", 0, 0, 1, Qt.LeftButton);
            snooze(1);
            waitForObject(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");        
            clickButton(":_optionsGroup.Receive Inventory at this Operation_QCheckBox");
            clickButton(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");
            clickButton(":Bill of Operations Item.Save_QPushButton");
            waitForObject(":Bill of Operations.Save_QPushButton");
            clickButton(":Bill of Operations.Save_QPushButton");
            waitForObject(":_boo_XTreeWidget");
            if(object.exists(":_boo.YTRUCK1_QModelIndex"))
                test.pass("BOO created for: YTRUCK1");
            else test.fail("BOO not created for: YTRUCK1");
        }catch(e){test.fail("Exception in creating BOO for Item YTRUCK1"+e);}
        
        //-----------Define BOO for TSUB1---------------
        try{
            waitForObject(":Bills of Operations.New_QPushButton");
            clickButton(":Bills of Operations.New_QPushButton");
            waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
            type(":Item Sites.ItemLineEdit_ItemLineEdit","TSUB1");
            snooze(0.5);
            nativeType("<Tab>");    
            waitForObject(":frame.New_QPushButton_2");
            clickButton(":frame.New_QPushButton_2");
            waitForObject(":_stdopn_XComboBox");
            clickItem(":_stdopn_XComboBox", "ASSEMBLY", 0, 0, 1, Qt.LeftButton);
            waitForObject(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");      
            waitForObject(":_optionsGroup.Receive Inventory at this Operation_QCheckBox");
            clickButton(":_optionsGroup.Receive Inventory at this Operation_QCheckBox");
            clickButton(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");
            waitForObject(":Bill of Operations Item.Save_QPushButton");
            clickButton(":Bill of Operations Item.Save_QPushButton");
            waitForObject(":Bill of Operations.Save_QPushButton");
            clickButton(":Bill of Operations.Save_QPushButton");
            waitForObject(":_boo_XTreeWidget");
            if(object.exists("{column='0' container=':_boo_XTreeWidget' text='TSUB1' type='QModelIndex'}"))
                test.pass("BOO created for: TSUB1");
            else test.fail("BOO not created for: TSUB1");
            waitForObject(":Bills of Operations.Close_QPushButton");
            clickButton(":Bills of Operations.Close_QPushButton");
        }catch(e){test.fail("Exception in creating BOO for Item TSUB1"+e);}
        
    }
    else if(appEdition=="PostBooks" || appEdition=="Standard")
    {
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Products", 74, 11, 0, Qt.LeftButton);
        
        
        if(object.exists("{column='0' container=':_tree.Master Information_QModelIndex' text='Standard Labor Rates' type='QModelIndex'}"))
            test.fail("standard labor rates menu found in "+appEdition);
        else
            test.pass("standard labor rates menu not found in "+appEdition);
        
        
        if(object.exists("{column='0' container=':_tree.Master Information_QModelIndex' text='Work Centers' type='QModelIndex'}"))
            test.fail("Work centers menu found in "+appEdition);
        else
            test.pass("Work centers menu not found in "+appEdition); 
        
        if(object.exists("{column='0' container=':_tree.Master Information_QModelIndex' text='Standard Operations' type='QModelIndex'}"))
            test.fail("Standard Operations menu found in "+appEdition);
        else
            test.pass("Standard Operations menu not found in "+appEdition);
        
        
        if(object.exists("{column='0' container=':_tree.Master Information_QModelIndex' text='Bill Of operations' type='QModelIndex'}"))
            test.fail("Bill Of operations menufound in "+appEdition);
        else
            test.pass("Bill Of operations menu not found in "+appEdition);
        
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");    
        
    }
           
    //---------------Create BOM for Items---------------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu", "List...");
        activateItem(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu", "List...");
        
        
        //---------------Create BOM for YTRUCK1---------------
        waitForObject(":Bills of Materials.New_QPushButton");
        clickButton(":Bills of Materials.New_QPushButton");

        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit","YTRUCK1");
        nativeType("<Tab>");
        snooze(1);
        
        
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "TBODY1");
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", "1");
        findObject(":_scrap_XLineEdit").clear();
        type(":_scrap_XLineEdit", "0");
        if(appEdition=="Manufacturing")
        {
            clickButton(":Bill of Materials Item...._QPushButton");
            waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
            snooze(0.5);
            doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Paint", 141, 10, 0, Qt.LeftButton);
            waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
            clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
        }
        else if(appEdition=="PostBooks" || appEdition=="Standard")
        {
            test.xverify(object.exists(":Bill of Operations Items._booitem_XTreeWidget"), "Bill of Operations Items not found");
            test.xverify(object.exists(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox"), "Bill of Materials Item doesnot have Schedule at W/O Operation checkbox");
        }
        
        type(":_ecn_XLineEdit", "initial definition");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        
        
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "YPAINT1");
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", ".01");
        findObject(":_scrap_XLineEdit").clear();
        type(":_scrap_XLineEdit", "0");
        if(appEdition=="Manufacturing")
        {
            clickButton(":Bill of Materials Item...._QPushButton");
            waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
            snooze(0.5);
            doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Paint", 5, 5, 0, Qt.LeftButton);
            waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
            clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
        }
        else if(appEdition=="PostBooks" || appEdition=="Standard")
        {
            test.xverify(object.exists(":Bill of Operations Items._booitem_XTreeWidget"), "Bill of Operations Item not found");
            test.xverify(object.exists(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox"), "Bill of Materials Item doesnot have Schedule at W/O Operation checkbox");
        }
        
        type(":_ecn_XLineEdit", "initial defintion");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "TWHEEL1");
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", "4");
        findObject(":_scrap_XLineEdit").clear();
        type(":_scrap_XLineEdit", "0");
      if(appEdition=="Manufacturing")
        {
            
            clickButton(":Bill of Materials Item...._QPushButton");
            waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
            snooze(0.5);
            doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Assembly", 5, 5, 0, Qt.LeftButton);
            waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
            clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
        }
        else if(appEdition=="PostBooks" || appEdition=="Standard")
        {
            test.xverify(object.exists(":Bill of Operations Items._booitem_XTreeWidget"), "Bill of Operations Item not found");
            test.xverify(object.exists(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox"), "Bill of Materials Item doesnot have Schedule at W/O Operation checkbox");
        }
        
        type(":_ecn_XLineEdit", "initial definition");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "TSUB1");
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":_qtyPer_XLineEdit"); 
        type(":_qtyPer_XLineEdit", "1");
        findObject(":_scrap_XLineEdit").clear();
        type(":_scrap_XLineEdit", "0");
        waitForObject(":_scrap_XLineEdit");
        
        if(appEdition=="Manufacturing")
        {
            
            clickButton(":Bill of Materials Item...._QPushButton");
            waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
            snooze(0.5);
            doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Shipping", 5, 5, 0, Qt.LeftButton);
            waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
            clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
        }
        else if(appEdition=="PostBooks" || appEdition=="Standard")
        {
            test.xverify(object.exists(":Bill of Operations Items._booitem_XTreeWidget"), "Bill of Operations Item not found");
            test.xverify(object.exists(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox"), "Bill of Materials Item doesnot have Schedule at W/O Operation checkbox");
        } 
        
        type(":_ecn_XLineEdit", "initial defintion");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":Bill of Materials.Save_QPushButton");
        clickButton(":Bill of Materials.Save_QPushButton");
        snooze(1);
        if(object.exists(":_bom.YTRUCK1_QModelIndex"))
            test.pass("BOM created for: YTRUCK1");
        else test.fail("BOM not created for: YTRUCK1");
    }catch(e){test.fail("Exception in creating BOM for Item YTRUCK1"+e);}
    
    
    //---------------Create BOM for TSUB1---------------
    try{

        waitForObject(":Bills of Materials.New_QPushButton");
        clickButton(":Bills of Materials.New_QPushButton");
        
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "TSUB1");
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "TBOX1");
        nativeType("<Tab>");
        snooze(1);
        
        waitForObject(":_qtyPer_XLineEdit"); 
        type(":_qtyPer_XLineEdit", "1");
        findObject(":_scrap_XLineEdit").clear();
        type(":_scrap_XLineEdit", "0");
        
        if(appEdition=="Manufacturing")
        {
            
            clickButton(":Bill of Materials Item...._QPushButton");
            waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
            snooze(0.5);
            doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Assembly", 5, 5, 0, Qt.LeftButton);
            waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
            clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
        }
        else if(appEdition=="PostBooks" || appEdition=="Standard")
        {
            test.xverify(object.exists(":Bill of Operations Items._booitem_XTreeWidget"), "Bill of Operations Item not found");
            test.xverify(object.exists(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox"), "Bill of Materials Item doesnot have Schedule at W/O Operation checkbox");
        } 
        
        type(":_ecn_XLineEdit", "intial definition");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":frame_2.New_QPushButton");
        clickButton(":frame_2.New_QPushButton");
        waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit");
        type(":Bill of Materials.ItemLineEdit_ItemLineEdit", "TINSERT1");
        nativeType("<Tab>");
        snooze(1);
        waitForObject(":_qtyPer_XLineEdit"); 
        waitForObject(":_qtyPer_XLineEdit");
        type(":_qtyPer_XLineEdit", "1");
        findObject(":_scrap_XLineEdit").clear();
        type(":_scrap_XLineEdit", "10");
        if(appEdition=="Manufacturing")
        {
            clickButton(":Bill of Materials Item...._QPushButton");
            waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
            snooze(0.5);
            doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Assembly", 5, 5, 0, Qt.LeftButton);
            waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
            clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
        }
        else if(appEdition=="PostBooks" || appEdition=="Standard")
        {
            test.xverify(object.exists(":Bill of Operations Items._booitem_XTreeWidget"), "Bill of Operations Item not found");
            test.xverify(object.exists(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox"), "Bill of Materials Item doesnot have Schedule at W/O Operation checkbox");
        } 
        
        type(":_ecn_XLineEdit", "intial defintion");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":Bill of Materials.Save_QPushButton");
        clickButton(":Bill of Materials.Save_QPushButton");
        waitForObject(":Bills of Materials._bom_XTreeWidget");  
        snooze(1);
        if(object.exists("{column='0' container=':Bills of Materials._bom_XTreeWidget' text='TSUB1' type='QModelIndex'}"))
            test.pass("BOM created for: TSUB1");
        else test.fail("BOM not creatd for: TSUB1");
        
        
        waitForObject(":Bills of Materials.Close_QPushButton");
        clickButton(":Bills of Materials.Close_QPushButton");
    }catch(e){test.fail("Exception in creating BOM for Item TSUB1"+e);}
    
}
