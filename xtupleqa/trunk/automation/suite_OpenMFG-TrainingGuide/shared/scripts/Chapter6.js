executeChapter6()
{

    //---------Define: User defined costing element----------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "User-Defined Costing Elements...");
    activateItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "User-Defined Costing Elements...");
    waitForObject(":List User-Defined Costing Elements_costingElements");
    waitForObject(":List User-Defined Costing Elements.New_QPushButton");
    clickButton(":List User-Defined Costing Elements.New_QPushButton");
    waitForObject(":_name_XLineEdit_7");
    type(":_name_XLineEdit_7", "Special Handling");
    clickButton(":User Costing Element.Accept P/O Distributions_QCheckBox");
    clickButton(":User Costing Element.Save_QPushButton");
    waitForObject(":List User-Defined Costing Elements.Close_QPushButton");
    clickButton(":List User-Defined Costing Elements.Close_QPushButton");
    test.log("User defined Costing Element: Special Handling created");
    
    
    //-------------Maintain Item Costs------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Maintain Item Costs...");
    activateItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Maintain Item Costs...");
   
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Ctrl+A>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Del>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "TBODY1");
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Tab>");
    clickButton(":Maintain Item Costs.New Cost_QPushButton");
    waitForObjectItem(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost._costelem_XComboBox").currentText!="Material")
        type(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost_XComboBox").currentText!="USD - $")
        type(":Create Item Cost_XComboBox", "USD");
    type(":Create Item Cost_XLineEdit", "1.0");
    clickButton(":Create Item Cost.Post Cost to Standard_QCheckBox");
    clickButton(":Create Item Cost.Save_QPushButton");
    test.log("Material cost for TBODY1 defined");    
    
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Ctrl+A>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Del>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "TBOX1");
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Tab>");
    clickButton(":Maintain Item Costs.New Cost_QPushButton");
    waitForObjectItem(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost._costelem_XComboBox").currentText!="Material")
        type(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost_XComboBox").currentText!="USD - $")
        type(":Create Item Cost_XComboBox", "USD");
    type(":Create Item Cost_XLineEdit", "0.25");
    clickButton(":Create Item Cost.Post Cost to Standard_QCheckBox");
    clickButton(":Create Item Cost.Save_QPushButton");
    test.log("Material cost for TBOX1 defined");    
      
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Ctrl+A>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Del>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "TINSERT1");
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Tab>");
    clickButton(":Maintain Item Costs.New Cost_QPushButton");
    waitForObjectItem(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost._costelem_XComboBox").currentText!="Material")
        type(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost_XComboBox").currentText!="USD - $")
        type(":Create Item Cost_XComboBox", "USD");
    type(":Create Item Cost_XLineEdit", "0.5");
    clickButton(":Create Item Cost.Post Cost to Standard_QCheckBox");
    clickButton(":Create Item Cost.Save_QPushButton");
    test.log("Material cost for TINSERT1 defined");    
    
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Ctrl+A>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Del>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "TWHEEL1");
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Tab>");
    clickButton(":Maintain Item Costs.New Cost_QPushButton");
    waitForObjectItem(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost._costelem_XComboBox").currentText!="Material")
        type(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost_XComboBox").currentText!="USD - $")
        type(":Create Item Cost_XComboBox", "USD");
    type(":Create Item Cost_XLineEdit", "0.10");
    clickButton(":Create Item Cost.Post Cost to Standard_QCheckBox");
    clickButton(":Create Item Cost.Save_QPushButton");
    test.log("Material cost for TWHEEL1 defined");    
    
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Ctrl+A>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Del>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "YPAINT1");
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Tab>");
    clickButton(":Maintain Item Costs.New Cost_QPushButton");
    waitForObjectItem(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost._costelem_XComboBox").currentText!="Material")
        type(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost_XComboBox").currentText!="USD - $")
        type(":Create Item Cost_XComboBox", "USD");
    type(":Create Item Cost_XLineEdit", "5.00");
    clickButton(":Create Item Cost.Post Cost to Standard_QCheckBox");
    clickButton(":Create Item Cost.Save_QPushButton");
    test.log("Material cost for YPAINT1 defined");    
   
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Ctrl+A>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Del>");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "YPAINT1");
    waitForObject(":Maintain Item Costs._itemNumber_ItemLineEdit");
    type(":Maintain Item Costs._itemNumber_ItemLineEdit", "<Tab>");
    clickButton(":Maintain Item Costs.New Cost_QPushButton");
    waitForObjectItem(":Create Item Cost._costelem_XComboBox", "Material");
    if(findObject(":Create Item Cost._costelem_XComboBox").currentText!="Special Handling")
        type(":Create Item Cost._costelem_XComboBox", "Special");
    if(findObject(":Create Item Cost_XComboBox").currentText!="USD - $")
        type(":Create Item Cost_XComboBox", "USD");
    type(":Create Item Cost_XLineEdit", "2.00");
    clickButton(":Create Item Cost.Post Cost to Standard_QCheckBox");
    clickButton(":Create Item Cost.Save_QPushButton");
    test.log("Special Handling cost for YPAINT1 defined");    
    waitForObject(":Maintain Item Costs.Close_QPushButton");
    clickButton(":Maintain Item Costs.Close_QPushButton");
    
    
     //---------Update Actual Costs-------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Update Actual Costs");
    activateItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Update Actual Costs");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Update Actual Costs_QMenu", "by Class Code...");
    activateItem(":xTuple ERP: OpenMFG Edition.Update Actual Costs_QMenu", "by Class Code...");
    waitForObject(":_classCode.All Class Codes_QRadioButton");
    clickButton(":_classCode.All Class Codes_QRadioButton");
    clickButton(":Update Actual Costs by Class Code.Select all Costs_QPushButton");
    waitForObject(":Update Actual Costs by Class Code.Roll Up Actual Costs_QCheckBox");
    clickButton(":Update Actual Costs by Class Code.Roll Up Actual Costs_QCheckBox");
    waitForObject(":Update Actual Costs by Class Code.Update_QPushButton");
    clickButton(":Update Actual Costs by Class Code.Update_QPushButton");
    test.log("Updated Actual Costs");
    
    //-----------Post Actual Costs------------------
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
    activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Post Actual Costs");
    activateItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Post Actual Costs");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Post Actual Costs_QMenu", "by Class Code...");
    activateItem(":xTuple ERP: OpenMFG Edition.Post Actual Costs_QMenu", "by Class Code...");
    waitForObject(":_classCode.All Class Codes_QRadioButton_2");
    clickButton(":_classCode.All Class Codes_QRadioButton_2");
    waitForObject(":Post Actual Costs by Class Code.Select all Costs_QPushButton");
    clickButton(":Post Actual Costs by Class Code.Select all Costs_QPushButton");
    waitForObject(":Post Actual Costs by Class Code.Roll Up Standard Costs_QCheckBox");
    clickButton(":Post Actual Costs by Class Code.Roll Up Standard Costs_QCheckBox");
    waitForObject(":Post Actual Costs by Class Code.Post_QPushButton");
    clickButton(":Post Actual Costs by Class Code.Post_QPushButton");
    test.log("Posted Actual Costs");
    
}