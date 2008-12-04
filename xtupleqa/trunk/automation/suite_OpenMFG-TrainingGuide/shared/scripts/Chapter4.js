function executeChapter4()
{
    source(findFile("scripts","functions.js"));
    
    
    //-------------Standard Labor Rate -------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Standard Labor Rates...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Standard Labor Rates...");
   
    waitForObject(":List Standard Labor Rates.New_QPushButton_2");
    clickButton(":List Standard Labor Rates.New_QPushButton_2");
    waitForObject(":_code_XLineEdit_7");
    type(":_code_XLineEdit_7", "Assembly");
    waitForObject(":_description_XLineEdit_17");
    type(":_description_XLineEdit_17", "Assembly Rate");
    type(":_rate_XLineEdit_2", "12.00");
    waitForObject(":Standard Labor Rate.Save_QPushButton");
    clickButton(":Standard Labor Rate.Save_QPushButton");
    waitForObject(":_lbrrate_XTreeWidget");
    if(!clickItem(":_lbrrate_XTreeWidget", "Assembly", 5, 5, 1, Qt.LeftButton))
      test.pass("Standard Labor Rate created: Assembly");
  
    waitForObject(":List Standard Labor Rates.New_QPushButton_2");
    clickButton(":List Standard Labor Rates.New_QPushButton_2");
    waitForObject(":_code_XLineEdit_7");
    type(":_code_XLineEdit_7", "SETUP");
    waitForObject(":_description_XLineEdit_17");
    type(":_description_XLineEdit_17", "Setup Rate");
    type(":_rate_XLineEdit_2", "15.00");
    waitForObject(":Standard Labor Rate.Save_QPushButton");
    clickButton(":Standard Labor Rate.Save_QPushButton");
    test.log("Standard Labor Rate: Setup Rate created");
    waitForObject(":_lbrrate_XTreeWidget");
    if(!clickItem(":_lbrrate_XTreeWidget", "SETUP", 5, 5, 1, Qt.LeftButton))
      test.pass("Standard Labor Rate created: SETUP");
        
    waitForObject(":List Standard Labor Rates.Close_QPushButton_2");
    clickButton(":List Standard Labor Rates.Close_QPushButton_2");
    
    
    //---------------Work Centers--------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Work Centers...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Work Centers...");
    
    waitForObject(":List Work Centers.New_QPushButton_2");
    clickButton(":List Work Centers.New_QPushButton_2");
    waitForObject(":Work Center._code_XLineEdit_2");
    type(":Work Center._code_XLineEdit_2", "ASSEMBLY1");
    type(":Work Center._description_XLineEdit_2", "Assembly Work Center #1");
    type(":Work Center._warehouse_WComboBox_2", "WH1");
    clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar_2", "Scheduling");
    waitForObject(":Department.VirtualClusterLineEdit_DeptClusterLineEdit_2");
    type(":Department.VirtualClusterLineEdit_DeptClusterLineEdit_2", "MFG");
    waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar_2");
    clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar_2", "Costs");
    waitForObject(":Overhead._numOfMachines_QSpinBox_2");
    type(":Overhead._numOfMachines_QSpinBox_2", "<Ctrl+A>");
    type(":Overhead._numOfMachines_QSpinBox_2", "<Del>");
    type(":Overhead._numOfMachines_QSpinBox_2", "1");
    type(":Overhead._numOfPeople_QSpinBox_2", "<Ctrl+A>");
    type(":Overhead._numOfPeople_QSpinBox_2", "<Del>");
    type(":Overhead._numOfPeople_QSpinBox_2", "1");
    type(":Overhead._overheadPrcntOfLabor_XLineEdit_2", "10.00");
    type(":Overhead._overheadPerLaborHour_XLineEdit_2", "<Ctrl+A>");
    type(":Overhead._overheadPerLaborHour_XLineEdit_2", "<Del>");
    type(":Overhead._overheadPerLaborHour_XLineEdit_2", "0.00");
    waitForObject(":Overhead._overheadPerMachHour_XLineEdit_2");
    type(":Overhead._overheadPerMachHour_XLineEdit_2", "<Ctrl+A>");
    type(":Overhead._overheadPerMachHour_XLineEdit_2", "<Del>");
    type(":Overhead._overheadPerMachHour_XLineEdit_2", "0.00");
    type(":Overhead._overheadPerUnit_XLineEdit_2", "<Ctrl+A");
    type(":Overhead._overheadPerUnit_XLineEdit_2", "<Del>");
    type(":Overhead._overheadPerUnit_XLineEdit_2", "0.00");
    clickButton(":Setup Labor Rate.Specify Labor Rate:_QRadioButton");
    waitForObject(":Setup Labor Rate._setupRate_XLineEdit_2");
    type(":Setup Labor Rate._setupRate_XLineEdit_2", "<Ctrl+A>");
    type(":Setup Labor Rate._setupRate_XLineEdit_2", "<Del>");
    type(":Setup Labor Rate._setupRate_XLineEdit_2", "10.00");
    clickButton(":Run Labor Rate.Specify Labor Rate:_QRadioButton");
    waitForObject(":Run Labor Rate._runRate_XLineEdit_2");
    type(":Run Labor Rate._runRate_XLineEdit_2", "<Ctrl+A>");
    type(":Run Labor Rate._runRate_XLineEdit_2", "<Del>");
    type(":Run Labor Rate._runRate_XLineEdit_2", "10.00");
    clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar_2", "Scheduling");
    waitForObject(":Average._avgQueueDays_QSpinBox_2");
    type(":Average._avgQueueDays_QSpinBox_2", "<Ctrl+A>");
    type(":Average._avgQueueDays_QSpinBox_2", "<Del>");
    type(":Average._avgQueueDays_QSpinBox_2", "0");
    type(":Average._avgSetup_XLineEdit_2", "<Ctrl+A>");
    type(":Average._avgSetup_XLineEdit_2", "<Del>");
    type(":Average._avgSetup_XLineEdit_2", "6.00");
    type(":Average._setupType_XComboBox_2", "Labor");
    type(":Capacity._dailyCapacity_XLineEdit_2", "480.00");
    type(":Capacity._efficiencyFactor_XLineEdit_2", "100.00");
    clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar_2", "Notes");
    waitForObject(":_notesTab._comments_QTextEdit_2");
    type(":_notesTab._comments_QTextEdit_2", "<Ctrl+A>");
    type(":_notesTab._comments_QTextEdit_2", "<Del>");
    type(":_notesTab._comments_QTextEdit_2", "Assembly Work Center Number 1");
    waitForObject(":Work Center.Save_QPushButton_2");
    clickButton(":Work Center.Save_QPushButton_2");
    waitForObject(":List Work Centers._wrkcnt_XTreeWidget_2");
    if(!clickItem(":List Work Centers._wrkcnt_XTreeWidget_2", "ASSEMBLY1", 5, 5, 1, Qt.LeftButton))
      test.pass("Work Center created: ASSEMBLY1");

    
    waitForObjectItem(":List Work Centers._wrkcnt_XTreeWidget_2", "Assembly Work Center #1");
    clickItem(":List Work Centers._wrkcnt_XTreeWidget_2", "Assembly Work Center #1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Work Centers.Copy_QPushButton_2");
    clickButton(":List Work Centers.Copy_QPushButton_2");
    waitForObject(":Work Center._code_XLineEdit_2");
    type(":Work Center._code_XLineEdit_2", "<Ctrl+A>");
    type(":Work Center._code_XLineEdit_2", "<Del>");
    type(":Work Center._code_XLineEdit_2", "SHIPPING1");
    type(":Work Center._description_XLineEdit_2", "<Ctrl+A>");
    type(":Work Center._description_XLineEdit_2", "<Del>");
    type(":Work Center._description_XLineEdit_2", "Shipping Work Center #1");
    clickButton(":Run Labor Rate.Select Standard Rate:_QRadioButton_2");
    type(":Run Labor Rate._stdRunRate_XComboBox", "SETUP");
    clickButton(":Setup Labor Rate.Select Standard Rate:_QRadioButton_2");
    type(":Setup Labor Rate._stdSetupRate_XComboBox_2", "SETUP");
    clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar_2", "Notes");
    waitForObject(":_notesTab._comments_QTextEdit_2");
    type(":_notesTab._comments_QTextEdit_2", "<Ctrl+A>");
    type(":_notesTab._comments_QTextEdit_2", "<Del>");
    type(":_notesTab._comments_QTextEdit_2", "Shipping Work Center Number 1");
    waitForObject(":Work Center.Save_QPushButton_2");
    clickButton(":Work Center.Save_QPushButton_2");
    waitForObject(":List Work Centers._wrkcnt_XTreeWidget_2");
    if(!clickItem(":List Work Centers._wrkcnt_XTreeWidget_2", "SHIPPING1", 5, 5, 1, Qt.LeftButton))
      test.pass("Work Center created: SHIPPING1");

    
     waitForObjectItem(":List Work Centers._wrkcnt_XTreeWidget_2", "Assembly Work Center #1");
    clickItem(":List Work Centers._wrkcnt_XTreeWidget_2", "Assembly Work Center #1", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Work Centers.Copy_QPushButton_2");
    clickButton(":List Work Centers.Copy_QPushButton_2");
    waitForObject(":Work Center._code_XLineEdit_2");
    type(":Work Center._code_XLineEdit_2", "<Ctrl+A>");
    type(":Work Center._code_XLineEdit_2", "<Del>");
    type(":Work Center._code_XLineEdit_2", "PAINT1");
    type(":Work Center._description_XLineEdit_2", "<Ctrl+A>");
    type(":Work Center._description_XLineEdit_2", "<Del>");
    type(":Work Center._description_XLineEdit_2", "Paint Work Center #1");
    clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar_2", "Notes");
    waitForObject(":_notesTab._comments_QTextEdit_2");
    type(":_notesTab._comments_QTextEdit_2", "<Ctrl+A>");
    type(":_notesTab._comments_QTextEdit_2", "<Del>");
    type(":_notesTab._comments_QTextEdit_2", "Paint Work Center Number 1");
    waitForObject(":Work Center.Save_QPushButton_2");
    clickButton(":Work Center.Save_QPushButton_2");
    waitForObject(":List Work Centers._wrkcnt_XTreeWidget_2");
    if(!clickItem(":List Work Centers._wrkcnt_XTreeWidget_2", "PAINT1", 5, 5, 1, Qt.LeftButton))
      test.pass("Work Center created: PAINT1");

    waitForObject(":List Work Centers.Close_QPushButton_2");
    clickButton(":List Work Centers.Close_QPushButton_2");
  


  //---------------------Products: Standard Operation--------------------
  waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
  activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
  waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
  activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Master Information");
  waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Standard Operations...");
  activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_4", "Standard Operations...");
  
  waitForObject(":List Standard Operations.New_QPushButton");
  clickButton(":List Standard Operations.New_QPushButton");
  waitForObject(":Standard Operation._number_XLineEdit");
  type(":Standard Operation._number_XLineEdit", "ASSEMBLY");
  type(":Standard Operation._description1_XLineEdit", "Standard Operation - Assembly");
  type(":Standard Operation._wrkcnt_XComboBox", "ASSEMBLY1");
  type(":Standard Operation._prodUOM_XComboBox", "EA");
  type(":Standard Operation._invProdUOMRatio_XLineEdit", "1");
  clickButton(":Standard Operation.Use Standard Times_QCheckBox");
  type(":_standardGroup._setupReport_XComboBox", "Direct");
  type(":_standardGroup._runTime_XLineEdit", "60.00");
  type(":_standardGroup._runReport_XComboBox", "Direct");
  type(":_standardGroup._runQtyPer_XLineEdit", "100.00");
  type(":Standard Operation._instructions_QTextEdit", "Enter standard instructions through the Standard Operations session");
  clickButton(":Standard Operation.Save_QPushButton");
  waitForObject(":List Standard Operations._stdopn_XTreeWidget");
  if(!clickItem(":List Standard Operations._stdopn_XTreeWidget", "ASSEMBLY", 5, 5, 1, Qt.LeftButton))
      test.pass("Standard Operation created: ASSEMBLY");
 
  
  waitForObject(":List Standard Operations.New_QPushButton");
  clickButton(":List Standard Operations.New_QPushButton");
  waitForObject(":Standard Operation._number_XLineEdit");
  type(":Standard Operation._number_XLineEdit", "PAINT");
  type(":Standard Operation._description1_XLineEdit", "Standard Operation - Paint");
  type(":Standard Operation._wrkcnt_XComboBox", "PAINT1");
  type(":Standard Operation._prodUOM_XComboBox", "EA");
  type(":Standard Operation._invProdUOMRatio_XLineEdit", "1");
  clickButton(":Standard Operation.Use Standard Times_QCheckBox");
  type(":_standardGroup._setupReport_XComboBox", "Direct");
  type(":_standardGroup._runTime_XLineEdit", "60.00");
  type(":_standardGroup._runReport_XComboBox", "Direct");
  type(":_standardGroup._runQtyPer_XLineEdit", "100.00");
  type(":Standard Operation._instructions_QTextEdit", "Enter standard instructions through the Standard Operations session");
  clickButton(":Standard Operation.Save_QPushButton");
  waitForObject(":List Standard Operations._stdopn_XTreeWidget");
  if(!clickItem(":List Standard Operations._stdopn_XTreeWidget", "PAINT", 5, 5, 1, Qt.LeftButton))
      test.pass("Standard Operation created: PAINT");
 
  

  waitForObject(":List Standard Operations.New_QPushButton");
  clickButton(":List Standard Operations.New_QPushButton");
  waitForObject(":Standard Operation._number_XLineEdit");
  type(":Standard Operation._number_XLineEdit", "SHIPPING");
  type(":Standard Operation._description1_XLineEdit", "Standard Operation - Shipping");
  type(":Standard Operation._wrkcnt_XComboBox", "SHIPPING1");
  waitForObject(":Standard Operation._prodUOM_XComboBox");
  type(":Standard Operation._prodUOM_XComboBox", "EA");
  type(":Standard Operation._invProdUOMRatio_XLineEdit", "1");
  clickButton(":Standard Operation.Use Standard Times_QCheckBox");
  type(":_standardGroup._setupReport_XComboBox", "Direct");
  type(":_standardGroup._runTime_XLineEdit", "60.00");
  type(":_standardGroup._runReport_XComboBox", "Direct");
  type(":_standardGroup._runQtyPer_XLineEdit", "100.00");
  type(":Standard Operation._instructions_QTextEdit", "Enter standard instructions through the Standard Operations session");
  clickButton(":Standard Operation.Save_QPushButton");
  waitForObject(":List Standard Operations._stdopn_XTreeWidget");
  if(!clickItem(":List Standard Operations._stdopn_XTreeWidget", "SHIPPING", 5, 5, 1, Qt.LeftButton))
      test.pass("Standard Operation created: SHIPPING");
 
  waitForObject(":List Standard Operations.Close_QPushButton");
  clickButton(":List Standard Operations.Close_QPushButton");


  //-----------Define BOO for Items---------------
  waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
  activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
  waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Operations");
  activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Operations");
  waitForObjectItem(":xTuple ERP: OpenMFG Edition.Bill Of Operations_QMenu", "List...");
  activateItem(":xTuple ERP: OpenMFG Edition.Bill Of Operations_QMenu", "List...");
  
  
  //-----------Define BOO for YTRUCK1---------------
  waitForObject(":Bills of Operations.New_QPushButton");
  clickButton(":Bills of Operations.New_QPushButton");
  waitForObject(":itemGroup._itemNumber_ItemLineEdit");
  type(":itemGroup._itemNumber_ItemLineEdit", "YTRUCK1");
  type(":itemGroup._itemNumber_ItemLineEdit", "<Tab>");
  
  waitForObject(":frame.New_QPushButton_2");
  clickButton(":frame.New_QPushButton_2");
  type(":_stdopn_XComboBox", "PAINT");
  clickButton(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");
  clickButton(":Bill of Operations Item.Save_QPushButton");
  
  waitForObject(":frame.New_QPushButton_2");
  clickButton(":frame.New_QPushButton_2");
  waitForObjectItem(":_stdopn_XComboBox", "ASSEMBLY");
  type(":_stdopn_XComboBox", "ASSEMBLY");
  clickButton(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");
  clickButton(":Bill of Operations Item.Save_QPushButton");
 
  waitForObject(":frame.New_QPushButton_2");
  clickButton(":frame.New_QPushButton_2");
  waitForObjectItem(":_stdopn_XComboBox", "SHIPPING");
  type(":_stdopn_XComboBox", "SHIPPING");
  clickButton(":_optionsGroup.Receive Inventory at this Operation_QCheckBox");
  clickButton(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");
  clickButton(":Bill of Operations Item.Save_QPushButton");
  waitForObject(":Bill of Operations.Save_QPushButton");
  clickButton(":Bill of Operations.Save_QPushButton");
  waitForObject(":_boo_XTreeWidget");
  if(!clickItem(":_boo_XTreeWidget", "YTRUCK1", 5, 5, 1, Qt.LeftButton))
      test.pass("BOO created for: YTRUCK1");
  
  
  //-----------Define BOO for TKIT1---------------
  clickButton(":Bills of Operations.New_QPushButton");
  waitForObject(":itemGroup._itemNumber_ItemLineEdit");
  type(":itemGroup._itemNumber_ItemLineEdit", "TKIT1");
  type(":itemGroup._itemNumber_ItemLineEdit", "<Tab>");
  waitForObject(":frame.New_QPushButton_2");
  clickButton(":frame.New_QPushButton_2");
  waitForObjectItem(":_stdopn_XComboBox", "ASSEMBLY");
  type(":_stdopn_XComboBox", "ASSEMBLY");
  waitForObject(":_optionsGroup.Receive Inventory at this Operation_QCheckBox");
  clickButton(":_optionsGroup.Receive Inventory at this Operation_QCheckBox");
  clickButton(":_optionsGroup.Auto. Issue Components at this Operation_QCheckBox");
  clickButton(":Bill of Operations Item.Save_QPushButton");
  waitForObject(":Bill of Operations.Save_QPushButton");
  clickButton(":Bill of Operations.Save_QPushButton");
  waitForObject(":Bills of Operations.Close_QPushButton");
  clickButton(":Bills of Operations.Close_QPushButton");
  waitForObject(":_boo_XTreeWidget");
  if(!clickItem(":_boo_XTreeWidget", "TKIT1", 5, 5, 1, Qt.LeftButton))
      test.pass("BOO created for: TKIT1");
  
  
  
   //---------------Create BOM for Items---------------------
  waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
  activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
  waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
  activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
  waitForObjectItem(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu", "List...");
  activateItem(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu", "List...");
  
  
  //---------------Create BOM for YTRUCK1---------------
  waitForObject(":Bills of Materials.New_QPushButton");
  clickButton(":Bills of Materials.New_QPushButton");
  waitForObject(":_itemGroup._itemNumber_ItemLineEdit");
  type(":_itemGroup._itemNumber_ItemLineEdit", "YTRUCK1");
  waitForObject(":_itemGroup._itemNumber_ItemLineEdit");
  type(":_itemGroup._itemNumber_ItemLineEdit", "<Tab>");
 
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TBODY1");
  type(":_qtyPer_XLineEdit", "1");
  type(":_scrap_XLineEdit", "0");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Paint _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "intail definition");
  clickButton(":Bill of Materials Item.Save_QPushButton");


  
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "YPAINT1");
  waitForObject(":_qtyPer_XLineEdit");
  type(":_qtyPer_XLineEdit", ".01");
  type(":_scrap_XLineEdit", "0");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Paint _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "intial defintion");
  clickButton(":Bill of Materials Item.Save_QPushButton");
  
 
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TWHEEL1");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "<Tab>");
  waitForObject(":_qtyPer_XLineEdit");
  type(":_qtyPer_XLineEdit", "4");
  type(":_scrap_XLineEdit", "0");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Assembly _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "initial definition");
  clickButton(":Bill of Materials Item.Save_QPushButton");
  
  
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TKIT1");
  type(":_qtyPer_XLineEdit", "1");
  type(":_scrap_XLineEdit", "0");
  waitForObject(":_scrap_XLineEdit");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Shipping _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "initial defintion");
  clickButton(":Bill of Materials Item.Save_QPushButton");
  
  waitForObject(":Bill of Materials.Save_QPushButton");
  clickButton(":Bill of Materials.Save_QPushButton");
  waitForObject(":Bills of Materials._bom_XTreeWidget");
  if(!clickItem(":Bills of Materials._bom_XTreeWidget", "YTRUCK1", 5, 5, 1, Qt.LeftButton))
      test.pass("BOM created for: YTRUCK1");


  
  
  //---------------Create BOM for TKIT1---------------
  waitForObject(":Bills of Materials.New_QPushButton");
  clickButton(":Bills of Materials.New_QPushButton");
  waitForObject(":_itemGroup._itemNumber_ItemLineEdit");
  type(":_itemGroup._itemNumber_ItemLineEdit", "TKIT1");
  waitForObject(":_itemGroup._itemNumber_ItemLineEdit");
  type(":_itemGroup._itemNumber_ItemLineEdit", "<Tab>");
 
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TBOX1");
  type(":_qtyPer_XLineEdit", "1");
  type(":_scrap_XLineEdit", "0");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Assembly _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "intail definition");
  clickButton(":Bill of Materials Item.Save_QPushButton");
  
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TINSERT1");
  waitForObject(":_qtyPer_XLineEdit");
  type(":_qtyPer_XLineEdit", "1");
  type(":_scrap_XLineEdit", "10");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Assembly _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "intial defintion");
  clickButton(":Bill of Materials Item.Save_QPushButton");
 
  waitForObject(":Bill of Materials.Save_QPushButton");
  clickButton(":Bill of Materials.Save_QPushButton");
  waitForObject(":Bills of Materials._bom_XTreeWidget");  
  if(!clickItem(":Bills of Materials._bom_XTreeWidget", "TKIT1", 5, 5, 1, Qt.LeftButton))
      test.pass("BOM created for: TKIT1");

  
  waitForObject(":Bills of Materials.Close_QPushButton");
  clickButton(":Bills of Materials.Close_QPushButton");
    
     
    
}
