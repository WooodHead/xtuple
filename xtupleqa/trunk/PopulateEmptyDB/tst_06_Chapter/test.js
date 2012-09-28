function main()
{
    source(findFile("scripts","functions.js"));    
    
    //---login Application--------
    loginAppl("RUNREGISTER");   
    
    var appEdition = findApplicationEdition();
    
    
    
    //---------Define: User defined costing element----------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
        waitForObject(":xTuple ERP: OpenMFG Edition.Costing_QMenu");
        activateItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "User-Defined Costing Elements...");
        
        waitForObject(":List User-Defined Costing Elements.New_QPushButton");
        clickButton(":List User-Defined Costing Elements.New_QPushButton");
        waitForObject(":_name_XLineEdit_7");
        type(":_name_XLineEdit_7", "Special Handling");
        clickButton(":User Costing Element.Accept P/O Distributions_QCheckBox");
        clickButton(":User Costing Element.Save_QPushButton");
        waitForObject(":List User-Defined Costing Elements._costelem_XTreeWidget");
        if(object.exists(":_costelem.Special Handling_QModelIndex_2"))
            test.pass("Costing Element Created: Special Handling");
        else test.fail("Costing Element not Created: Special Handling");
        
        waitForObject(":Tax Assignment.Close_QPushButton");
        clickButton(":Tax Assignment.Close_QPushButton");
    }catch(e){test.fail("Exception in creating User defined Costing:"+e)}
    
    
    //-------------Maintain Item Costs------------------
    
    maintainItemCosts("TBODY1","1.0");
    maintainItemCosts("TBOX1","0.25");
    maintainItemCosts("TINSERT1","0.5");
    maintainItemCosts("TWHEEL1","0.10");
    maintainItemCosts("YPAINT1","5.00");
    
    snooze(2);
    //---------Update Actual Costs-------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
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
    }catch(e){test.fail("Exception in updating Actual Costs");}
    
    //-----------Post Actual Costs------------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
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
    }catch(e){test.fail("Exception in Posting Actual Costs");}
    
    //-------------Verify standard and actual cost in Intended Costed BOM---------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Reports");
        activateItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Reports_QMenu", "Costed BOM");
        activateItem(":xTuple ERP: OpenMFG Edition.Reports_QMenu", "Costed BOM");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Costed BOM_QMenu", "Indented...");
        activateItem(":xTuple ERP: OpenMFG Edition.Costed BOM_QMenu", "Indented...");
        
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "YTRUCK1");
        nativeType("<Tab>");
        snooze(1);
        
        waitForObject(":Items.Query_QToolButton");
        clickButton(":Items.Query_QToolButton");
        
        
        waitForObject(":_costsGroup.Use Actual Costs_QRadioButton");
        clickButton(":_costsGroup.Use Actual Costs_QRadioButton");
        
        var actlcost= grabWidget(findObject(":_list_XTreeWidget_2"));
        actlcost.save("actlcost.png");
        waitForObject(":_costsGroup.Use Standard Costs_QRadioButton");
        clickButton(":_costsGroup.Use Standard Costs_QRadioButton");
        var stdcost= grabWidget(findObject(":_list_XTreeWidget_2"));
        stdcost.save("stdcost.png");
        if(actlcost.toImage()==stdcost.toImage())
            test.pass("Actual costs are equal to Standard costs");
        else 
            test.fail("Actual costs are not equal to Standard costs");
        waitForObject(":Items.Query_QToolButton");
        
        
        nativeType("<Ctrl+w>");
    }catch(e){test.fail("Exception in verifying standard and actual costs:"+e)}
    
}
