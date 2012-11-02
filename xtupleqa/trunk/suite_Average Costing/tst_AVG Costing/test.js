function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(3);
    //-----Editing of preferences----
    try
    {
        if(OS.name == "Darwin")
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Preferences..."));
        }
        else
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
            activateItem(":xTuple ERP: *_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
            activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        }
        snooze(0.5);
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
        if(object.exists(":Notice.Notice_QDialog"))
        {
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                clickButton(":Notice.Remind me about this again._QCheckBox");
            snooze(0.5);
            waitForObject(":Notice.OK_QPushButton");
            clickButton(":Notice.OK_QPushButton");
        }
        waitForObject(":User Preferences.Save_QPushButton_2");
        clickButton(":User Preferences.Save_QPushButton_2");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in editing preferences"+ e);
    }  
    
    //--------Exiting the application------
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    
    
    // -------Inventory Setup -------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
        
        waitForObject(":When Posting a Count Tag for Avg. Cost Items.Use Average Cost_QRadioButton");
        clickButton(":When Posting a Count Tag for Avg. Cost Items.Use Average Cost_QRadioButton");
        if(!findObject(":When Posting a Count Tag for Avg. Cost Items.Use Actual Cost if no Average Cost_QCheckBox").checked)
            clickButton(":When Posting a Count Tag for Avg. Cost Items.Use Actual Cost if no Average Cost_QCheckBox");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Inventory setup successfully");
    }
    catch(e)
    {
        test.fail("Error in Inventory setup"+e);
    }
    //-------- Local Setup to 4 decimal places-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Master Information.Locales_QModelIndex");
        mouseClick(":Master Information.Locales_QModelIndex", 26, 5, 0, Qt.LeftButton);
        waitForObject(":_stack._locale_XTreeWidget");
        clickItem(":_stack._locale_XTreeWidget","Default",0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Edit_QPushButton");
        clickButton(":xTuple ERP:*.Edit_QPushButton");
        snooze(1);
        waitForObject(":_stack.qt_spinbox_lineedit_QLineEdit").clear();
        type(":_stack.qt_spinbox_lineedit_QLineEdit", "4");
        snooze(.5);
        waitForObject(":_stack.qt_spinbox_lineedit_QLineEdit_2").clear();
        type(":_stack.qt_spinbox_lineedit_QLineEdit_2", "4");
        snooze(.5);
        waitForObject(":_stack.qt_spinbox_lineedit_QLineEdit_3").clear();
        type(":_stack.qt_spinbox_lineedit_QLineEdit_3", "4");
        snooze(2);
        waitForObject(":_stack.qt_spinbox_lineedit_QLineEdit_4").clear();
        type(":_stack.qt_spinbox_lineedit_QLineEdit_4", "4");
        snooze(.5);
        waitForObject(":_stack.qt_spinbox_lineedit_QLineEdit_5").clear();
        type(":_stack.qt_spinbox_lineedit_QLineEdit_5", "4");
        snooze(.5);
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        
        test.log("Local setup is successful");
    }
    catch(e)
    {
        test.fail("Error in Local Setup"+e);
    }
    
    //--------Exiting the application------
    
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    snooze(0.5);
    waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE");
    
    
    var appEdition = findApplicationEdition();
    snooze(0.5);
    //------Enabling Tab View --------
    tabView();
    //--------Copy YTRUCK1-----
    
    copyItem("YTRUCK1","AVGTRUCK 1");
    createRIS("AVGTRUCK 1");
    
    //------ Changing the costing method to Average -----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list.AVGTRUCK 1_QModelIndex");
        doubleClick(":_list.AVGTRUCK 1_QModelIndex", 18, 6, 0, Qt.LeftButton);
        snooze(2);
        if(!findObject(":Item Site.Site can manufacture this Item_QGroupBox").checked)
            mouseClick(":Item Site.Site can manufacture this Item_QGroupBox", 56, 9, 0, Qt.LeftButton);
        waitForObject(":Costing Method.Average_QRadioButton");
        clickButton(":Costing Method.Average_QRadioButton");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Costing method set to Average successfully");
    }
    catch(e)
    {
        test.fail("Error in setting costing method to Average"+e);
    }
    
    
    
    //----- Inventory Adjustment Relatively by using 'Manual' radio button --------------
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    snooze(0.5);
    var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
    var qtyavgtruck1 = array[0];
    var avgtruckuc1 = array[1];
    var avgtruckval1 = array[2];
    
    snooze(1);
    
    //----- Adjusting the Quantity Relatively by selecting 'Manual' radio button -----
    try{   
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        snooze(0.5);
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        snooze(0.5);
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        snooze(0.5);
        waitForObject(":_itemGroup._item_ItemCluster");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
        nativeType("<Tab>");
        
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        nativeType("<Tab>");
        if(findObject(":tabCost.Adjust Value_QGroupBox").checked)
            test.log("Cost tab is enabled");
        else
            clickItem(":tabCost.Adjust Value_QGroupBox"," ",0, 0, 5, Qt.LeftButton);
        
        waitForObject(":Adjust Value.Manual_QRadioButton");
        clickButton(":Adjust Value.Manual_QRadioButton");
        waitForObject(":Adjust Value._cost_XLineEdit");
        type(":Adjust Value._cost_XLineEdit", "200");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_adjustmentTypeGroup.Relative_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Relative_QRadioButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Quantity Adjusted Relatively by selecting 'Manual' radio button ");
    }
    catch(e)
    {
        test.fail("Error in Adjusting the Quantity Relatively by selecting 'Manual' radio button"+e);
    }
    
    
    //------- Unit Cost and Inventory value verification after posting Adjustment -----
    
    
    try{
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck2 = array[0];
        test.log(qtyavgtruck2);
        snooze(0.5);
        if(qtyavgtruck2 == qtyavgtruck1 + 100)
            test.pass("QOH Updated correctly for the Adjustment posted Relatively");
        else
            test.fail("QOH is not updated correctly for the Adjustment Posted Relatively");
        
        snooze(0.5);
        var avgtruckval2 = array[2];
        avgtruckval2 = replaceSubsting(avgtruckval2);
        avgtruckval2 = parseInt(avgtruckval2);
        avgtruckval1 = replaceSubsting(avgtruckval1);
        avgtruckval1 = parseInt(avgtruckval1);
        if(avgtruckval2 == (avgtruckval1 + 200))
            test.pass("Inventory value updated correctly for the Adjustment posted Relatively");
        else
            test.fail("Inventory value is not updated correctly for the Adjustment Posted Relatively");
        
        var avgtruckuc2 = array[1];
        result = (avgtruckval2/qtyavgtruck2);
        result = roundNumber(result,4);
        if(avgtruckuc2 == result)
            test.pass("Unit Cost Updated correctly for the Adjustment posted Relatively");
        else
            test.fail("Unit Cost is not updated correctly for the Adjustment Posted Relatively");
    }
    catch(e)
    {
        test.fail("Error in comparing values for the Adjustment posted Relatively"+e);
    }
    
    
    
    
    
    //-------- Inventory Adjustment Relatively by using 'Calculated' radio button --------------
    
    
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    var qtyavgtruck3 = qtyavgtruck2;
    var avgtruckuc3 = avgtruckuc2;
    var avgtruckval3 = avgtruckval2;
    snooze(1);
    //----- Do nothing -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    
    //----- Adjusting the Quantity -----
    try{   
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup._item_ItemCluster");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        nativeType("<Tab>");
        snooze(0.5);
        if(findObject(":tabCost.Adjust Value_QGroupBox").checked)
            test.log("Cost tab is enabled");
        else
            clickItem(":tabCost.Adjust Value_QGroupBox"," ",0, 0, 5, Qt.LeftButton);
        waitForObject(":Adjust Value.Calculated_QRadioButton");
        clickButton(":Adjust Value.Calculated_QRadioButton");
        waitForObject(":Adjust Value._cost_XLineEdit");
        type(":Adjust Value._cost_XLineEdit", "200");
        nativeType("<Tab>");
        waitForObject(":_adjustmentTypeGroup.Relative_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Relative_QRadioButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Quantity Adjusted Relatively by selecting 'Calculated' radio button ");
    }
    catch(e)
    {
        test.fail("Error in Adjusting the Quantity Relatively by selecting 'Calculate' radio button"+e);
    }
    
    //------- Unit Cost and Inventory value verification after posting Adjustment -----
    
    
    try{
        //---- QOH verification-----
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck4 = array[0];
        
        if(qtyavgtruck4== qtyavgtruck3 + 100)
            test.pass("QOH Updated correctly for the Adjustment posted Relatively");
        else
            test.fail("QOH is not updated correctly for the Adjustment Posted Relatively");
        
        //---- Unit Cost Verification -----    
        var avgtruckuc4 = array[1];
        if(avgtruckuc4 == avgtruckuc3)
            test.pass("Unit Cost Updated correctly for the Adjustment posted Relatively");
        else
            test.fail("Unit Cost is not updated correctly for the Adjustment Posted Relatively");
        
        //----- Value verification -----
        var avgtruckval4 = array[2];
        avgtruckval4 = replaceSubsting(avgtruckval4);
        avgtruckval4 = parseInt(avgtruckval4);
        test.log(avgtruckval4);
        result = avgtruckuc4 * qtyavgtruck4;
        result = parseInt(result);
        if(avgtruckval4 == result)
            test.pass("Inventory value updated correctly for the Adjustment posted Relatively");
        else
            test.fail("Inventory value is not updated correctly for the Adjustment Posted Relatively");
        
        
    }
    catch(e)
    {
        test.fail("Error in comparing values for the Adjustment posted Relatively"+e);
    }
    
    
    //----- Do nothing -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    
    
    //-------- Inventory Adjustment Absolutely by using 'Calculated' radio button -------
    
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    var qtyavgtruck5 = qtyavgtruck4;
    var avgtruckuc5 = avgtruckuc4;
    var avgtruckval5 = avgtruckval4;
    
    snooze(1);
    
    
    //----- Adjusting the Quantity Absolutely by selecting 'Calculated' radio button -----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "400");
        nativeType("<Tab>");
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        if(findObject(":tabCost.Adjust Value_QGroupBox").checked)
            test.log("Cost tab is enabled");
        else
            clickItem(":tabCost.Adjust Value_QGroupBox"," ",0, 0, 5, Qt.LeftButton);
        waitForObject(":Adjust Value.Calculated_QRadioButton");
        clickButton(":Adjust Value.Calculated_QRadioButton");
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Quantity Adjusted Absolutely by selecting 'Calculated' radio button ");
    }
    catch(e)
    {
        test.fail("Error in Posting the Adjustment Absolutely by using Calculated radio button"+e);
    }
    
    
    
    //------- Unit Cost and Inventory value verification after posting Adjustment -----
    
    
    try{
        //---- QOH verification-----
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck6 = array[0];
        if(qtyavgtruck6 == 400)
            test.pass("QOH Updated correctly for the Adjustment posted Absolutelyly");
        else
            test.fail("QOH is not updated correctly for the Adjustment Posted Absolutely");
        
        //---- Unit Cost Verification -----    
        var avgtruckuc6 = array[1];
        if(avgtruckuc6 == avgtruckuc5)
            test.pass("Unit Cost Updated correctly for the Adjustment posted Absolutely");
        else
            test.fail("Unit Cost is not updated correctly for the Adjustment Posted Absolutely");
        
        //----- Value verification -----
        var avgtruckval6 = array[2];
        avgtruckval6 = replaceSubsting(avgtruckval6);
        avgtruckval6 = parseInt(avgtruckval6);
        test.log(avgtruckval6);
        result = avgtruckuc6 * qtyavgtruck6;
        result = parseInt(result);
        
        if(avgtruckval6 == result)
            test.pass("Inventory value updated correctly for the Adjustment posted Absolutely");
        else
            test.fail("Inventory value is not updated correctly for the Adjustment Posted Absolutely");
        
        
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    }  
    
    
    //----- To avoid unexpected blocks -----
    if(OS.name != "Windows")
    {
        doNothing();
    }
    
    //---- Inventory Adjustment Absolutely by unchecking 'Adjust Value Check box--
    
    
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    var qtyavgtruck7 = qtyavgtruck6;
    var avgtruckuc7 = avgtruckuc6;
    var avgtruckval7 = avgtruckval6;
    snooze(1);
    
    
    //----- Adjusting the Quantity Absolutely by selecting unchecking Adjust Value check box-----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "900");
        nativeType("<Tab>");
        waitForObject(":_adjustmentTypeGroup.Absolute_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Absolute_QRadioButton");
        if(findObject(":tabCost.Adjust Value_QGroupBox").checked)
            mouseClick(":tabCost.Adjust Value_QGroupBox", 45, 8, 0, Qt.LeftButton);
        else
            test.log("Cost tab is disabled already");
        
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Quantity Adjusted Absolutely by selecting 'Calculated' radio button ");
    }
    catch(e)
    {
        test.fail("Error in Posting the Adjustment Absolutely by using Calculated radio button"+e);
    }
    
    
    
    //------- Unit Cost and Inventory value verification after posting Adjustment -----
    
    
    try{
        //---- QOH verification-----
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck8 = array[0];
        if(qtyavgtruck8 == 900)
            test.pass("QOH Updated correctly for the Adjustment posted Absolutelyly");
        else
            test.fail("QOH is not updated correctly for the Adjustment Posted Absolutely");
        
        //----- Value verification -----
        var avgtruckval8 = array[2];
        test.log(avgtruckval8);
        if(avgtruckval8 == avgtruckval7)
            test.pass("Inventory value updated correctly for the Adjustment posted Absolutely");
        else
            test.fail("Inventory value is not updated correctly for the Adjustment Posted Absolutely");
        
        //---- Unit Cost Verification -----    
        var avgtruckuc8 = array[1];
        test.log(avgtruckuc8);
        avgtruckval8 = replaceSubsting(avgtruckval8);
        result = (avgtruckval8)/qtyavgtruck8;
        result = roundNumber(result,4);
        test.log(result);
        if(avgtruckuc8 == result)
            test.pass("Unit Cost Updated correctly for the Adjustment posted Absolutely");
        else
            test.fail("Unit Cost is not updated correctly for the Adjustment Posted Absolutely");
        
        
        
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    }
    //---- To avoid unexpected blocks -----
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //-------- Inventory Adjustment Relatively by unchecking 'Adjust Value Check box--
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    var qtyavgtruck9 = qtyavgtruck8;
    var avgtruckuc9 = avgtruckuc8;
    var avgtruckval9 = avgtruckval8;
    snooze(1);
    
    
    //----- Adjusting the Quantity Relatively by selecting unchecking Adjust Value check box-----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":_adjustmentTypeGroup.Relative_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Relative_QRadioButton");
        snooze(0.5);
        if(findObject(":tabCost.Adjust Value_QGroupBox").checked)
            mouseClick(":tabCost.Adjust Value_QGroupBox", 45, 8, 0, Qt.LeftButton);
        else
            test.log("Cost tab is disabled already");
        nativeType("<Tab>");
        waitForObject(":_adjustmentTypeGroup.Relative_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Relative_QRadioButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Quantity Adjusted Relatively by unchcecking the 'Adjust Value'check box ");
    }
    catch(e)
    {
        test.fail("Error in Posting the Adjustment Relatively by unchcecking the 'Adjust Value'check box"+e);
    }
    
    
    
    //------- Unit Cost and Inventory value verification after posting Adjustment -----
    
    
    try{
        //---- QOH verification-----
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck10 = array[0];
        if(qtyavgtruck10 == qtyavgtruck9 + 100)
            test.pass("QOH Updated correctly for the Adjustment posted Relatively");
        else
            test.fail("QOH is not updated correctly for the Adjustment Posted Relatively");
        
        //----- Value verification -----
        var avgtruckval10 = array[2];
        if(avgtruckval10 == avgtruckval9)
            test.pass("Inventory value updated correctly for the Adjustment posted Relatively");
        else
            test.fail("Inventory value is not updated correctly for the Adjustment Posted Relatively");
        
        //---- Unit Cost Verification -----    
        var avgtruckuc10 = array[1];
        avgtruckval10 = replaceSubsting(avgtruckval10);
        result = (avgtruckval10)/qtyavgtruck10;
        result = roundNumber(result,4);
        test.log(result);
        if(avgtruckuc10 == result)
            test.pass("Unit Cost Updated correctly for the Adjustment posted Relatively");
        else
            test.fail("Unit Cost is not updated correctly for the Adjustment Posted Relatively");
        
        
        
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    }
    //--------Purchase Order Processing for an Average Costing Item --------
    
    //--------Copy TBOX1-----
    
    copyItem("TBOX1","AVGBOX 1");
    createRIS("AVGBOX 1");
    //------ Changing the costing method to Average -----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3","AVGBOX 1", 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        waitForObject(":Costing Method.Average_QRadioButton");
        clickButton(":Costing Method.Average_QRadioButton");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Costing method set to Average successfully");
    }
    catch(e)
    {
        test.fail("Error in setting costing method to Average"+e);
    }
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    snooze(3);
    var array = inventoryVariables("AVGBOX 1","WH1",appEdition);
    var qtyavgbox1 = array[0];
    var avgboxuc1 = array[1];
    var avgboxval1 = array[2];
    
    
    //------ To avoid unexpected failures -----
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //-----Creating a Purchase Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
        type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        snooze(1);
        nativeType("<Tab>");
        
        ponumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        snooze(0.5);
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
        type(":groupBox_2.ItemLineEdit_ItemLineEdit", "AVGBOX 1");
        snooze(1);
        nativeType("<Tab>");
        
        waitForObject(":_ordered_XLineEdit_2");
        type(":_ordered_XLineEdit_2", "100");
        waitForObject(":_priceGroup.XLineEdit_XLineEdit");
        type(":_priceGroup.XLineEdit_XLineEdit", "1");
        nativeType("<Tab>");
        polineitem = findObject(":groupBox_2.ItemLineEdit_ItemLineEdit").text;         
        nativeType("<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        snooze(0.5);
        waitForObject(":Invalid Unit Price.Continue_QPushButton");
        clickButton(":Invalid Unit Price.Continue_QPushButton");
        // Verification Point 'VP1'
        var povalue = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text= '"+ponumber+"' type='QModelIndex'}"))
            
            test.pass("Purchase order created successfully");
        else 
            test.fail("Purchase order couldn't be created");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in creating purchase order" + e);
    }
    //---------- Releasing Purchase Order ---------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",ponumber, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Purchase Order "+ponumber+" released successfully");
        
    }
    catch(e)
    {
        test.fail("Error in Releasing the PO "+ponumber+"");
    }
    //-----Receiving Purchase Goods-----
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");  
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", ponumber);
        snooze(1);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Purchase Order for AVGBOX 1  received successfully")
            }
    catch(e)
    {
        test.fail("Error in receiving Purchase Order"+e);
    }
    
    //-------- QOH, Unit Cost and Inventory value verification after Receiving the PO 
    
    try{
        //------------- QOH Verification -----------
        var array = inventoryVariables("AVGBOX 1","WH1",appEdition);
        var qtyavgbox2 = array[0];
        if(qtyavgbox2 == qtyavgbox1 + 100)
            test.pass("QOH Updated correctly for the Purchase Order Receipt");
        else
            test.fail("QOH is not updated correctly for the Purchase Order Receipt");
        //----- Value verification -----
        var avgboxval2 = array[2];
        avgboxval2 = replaceSubsting(avgboxval2);
        avgboxval2 = parseInt(avgboxval2);
        result = parseInt(povalue) + parseInt(avgboxval1);
        result = parseInt(result);
        if(avgboxval2 == result)
            test.pass("Inventory value updated correctly for the Purchase Order Receipt ");
        else
            test.fail("Inventory value is not updated correctly for the Purchase Order Receipt");
        
        //---- Unit Cost Verification -----    
        var avgboxuc2 = array[1];
        if(avgboxuc2 == (avgboxval2/qtyavgbox2))
            test.pass("Unit Cost Updated correctly for the Purchase Order Receipt");
        else
            test.fail("Unit Cost is not updated correctly for the Purchase Order Receipt");
        
    }
    catch(e)
    {
        test.fail("Error in comparing the values"+e);
    }
    //--------- Purchase Order Returning ----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "Purchase Order Return...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "Purchase Order Return...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", ponumber);
        nativeType("<Tab>");
        waitForObject(":xTuple ERP:*._poitem_XTreeWidget");
        clickItem(":xTuple ERP:*._poitem_XTreeWidget","AVGBOX 1",0, 0, 5, Qt.LeftButton); 
        waitForObject(":xTuple ERP:*.Enter Return_QPushButton");
        clickButton(":xTuple ERP:*.Enter Return_QPushButton");
        waitForObject(":Enter P/O Item Return._toReturn_XLineEdit").clear();
        type(":Enter P/O Item Return._toReturn_XLineEdit", "50");
        
        snooze(1);
        waitForObject(":Enter P/O Item Return._rejectCode_XComboBox");
        clickItem(":Enter P/O Item Return._rejectCode_XComboBox","PO-DAMAGED-RETURNED",0, 0, 5, Qt.LeftButton); 
        
        snooze(1);
        waitForObject(":Enter P/O Item Return.Return_QPushButton");
        clickButton(":Enter P/O Item Return.Return_QPushButton");
        snooze(0.5);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        snooze(1);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("PO Returned successfully for a Qty of '50'");
    }
    catch(e)
    {
        test.fail("Error in Returning the PO");
    }
    //------- QOH, Unit Cost and Inventory value verification after Returnig the PO -----
    try{
        //------------- QOH Verification -----------
        var array = inventoryVariables("AVGBOX 1","WH1",appEdition);
        var qtyavgbox3 = array[0];
        if(qtyavgbox3 == qtyavgbox2 - 50)
            test.pass("QOH Updated correctly for the Purchase Order Return");
        else
            test.fail("QOH is not updated correctly for the Purchase Order Return");
        //----- Value verification -----
        var avgboxval3 = array[2];
        avgboxval3 = replaceSubsting(avgboxval3);
        avgboxval3 = parseInt(avgboxval3);
        result = parseInt(povalue/2) + parseInt(avgboxval1);
        result = parseInt(result);
        if(avgboxval3 == result)
            test.pass("Inventory value updated correctly for the Purchase Order Return ");
        else
            test.fail("Inventory value is not updated correctly for the Purchase Order Return");
        
        //---- Unit Cost Verification -----    
        var avgboxuc3 = array[1];
        if(avgboxuc3 == (avgboxval3/qtyavgbox3))
            test.pass("Unit Cost Updated correctly for the Purchase Order  Return");
        else
            test.fail("Unit Cost is not updated correctly for the Purchase Order  Return");
        
    }
    catch(e)
    {
        test.fail("Error in comparing the values"+e);
    }
    
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    var qtyavgtruck11 = qtyavgtruck10;
    var avgtruckuc11 = avgtruckuc10;
    var avgtruckval11 = avgtruckval10;
    
    snooze(1);
    
    
    
    //--------- Material Receipt by enabling 'Manual' radio button--------
    
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Material Receipt...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Material Receipt...");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        mouseClick(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", 49, 12, 0, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
        nativeType("<Tab>");
        waitForObject(":_qty_XLineEdit_4");
        type(":_qty_XLineEdit_4", "100");
        nativeType("<Tab>");
        if(findObject(":tabCost.Adjust Value_QGroupBox").checked)
            test.log("Cost tab is enabled");
        else
            clickItem(":tabCost.Adjust Value_QGroupBox"," ",0, 0, 5, Qt.LeftButton);
        waitForObject(":Adjust Value.Manual_QRadioButton");
        clickButton(":Adjust Value.Manual_QRadioButton");
        waitForObject(":Adjust Value._cost_XLineEdit");
        type(":Adjust Value._cost_XLineEdit", "500");
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Material Receipt posted successfully for the average costing item");
    }
    catch(e)
    {
        test.fail("Error in posting Material Receipt by Manual radio button enabled"+e);
    }
    
    
    //------- QOH, Unit Cost and Inventory value verification after posting Adjustment -----
    
    
    try{
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck12 = array[0];
        if(qtyavgtruck12 == qtyavgtruck11 + 100)
            test.pass("QOH Updated correctly for the Materail Receipt posted Relatively");
        else
            test.fail("QOH is not updated correctly for the Materail Receipt Posted Relatively");
        
        
        var avgtruckval12 = array[2];
        avgtruckval12 = replaceSubsting(avgtruckval12);
        avgtruckval12 = parseInt(avgtruckval12);
        avgtruckval11 = replaceSubsting(avgtruckval11);
        avgtruckval11 = parseInt(avgtruckval11);
        if(avgtruckval12 == (avgtruckval11 + 500))
            test.pass("Inventory value updated correctly for the Materail Receipt posted Relatively");
        else
            test.fail("Inventory value is not updated correctly for the Materail Receipt Posted Relatively");
        var avgtruckuc12 = array[1];
        result = (avgtruckval12/qtyavgtruck12);
        result = roundNumber(result,4);
        if(avgtruckuc12 == result)
            test.pass("Unit Cost Updated correctly for the Materail Receipt posted Relatively");
        else
            test.fail("Unit Cost is not updated correctly for the Materail Receipt Posted Relatively");
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    }
    //-------- Material Receipt by using 'Calculated' radio button --------------
    
    
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    var qtyavgtruck13 = qtyavgtruck12;
    var avgtruckuc13 = avgtruckuc12;
    var avgtruckval13 = avgtruckval12;
    snooze(1);
    
    
    //--------- Material Receipt by enabling 'Calulated' radio button--------
    
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Material Receipt...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Material Receipt...");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        mouseClick(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", 49, 12, 0, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
        nativeType("<Tab>");
        waitForObject(":_qty_XLineEdit_4");
        type(":_qty_XLineEdit_4", "100");
        nativeType("<Tab>");
        if(findObject(":tabCost.Adjust Value_QGroupBox").checked)
            test.log("Cost tab is enabled");
        else
            clickItem(":tabCost.Adjust Value_QGroupBox"," ",0, 0, 5, Qt.LeftButton);
        waitForObject(":Adjust Value.Calculated_QRadioButton");
        clickButton(":Adjust Value.Calculated_QRadioButton");
        waitForObject(":Adjust Value._cost_XLineEdit");
        type(":Adjust Value._cost_XLineEdit", "500");
        nativeType("<Tab>");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Material Receiot posted successfully for the average costing item");
    }
    catch(e)
    {
        test.fail("Error in posting Material Receipt by 'Calculated' radio button enabled "+e);
    }
    
    
    //------- QOH,Unit Cost and Inventory value verification after posting Adjustment -----
    
    
    try{
        //---- QOH verification-----
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck14 = array[0];
        if(qtyavgtruck14== qtyavgtruck13 + 100)
            test.pass("QOH Updated correctly for the Materail Receipt posted Relatively");
        else
            test.fail("QOH is not updated correctly for the Materail Receipt posted Relatively");
        
        //---- Unit Cost Verification -----    
        var avgtruckuc14 = array[1];
        if(avgtruckuc14 == avgtruckuc13)
            test.pass("Unit Cost Updated correctly for the Materail Receipt posted Relatively");
        else
            test.fail("Unit Cost is not updated correctly for the Materail Receipt posted Relatively");
        
        //----- Value verification -----
        var avgtruckval14 = array[2];
        avgtruckval14 = replaceSubsting(avgtruckval14);
        avgtruckval14 = parseInt(avgtruckval14);
        test.log(avgtruckval14);
        result = avgtruckuc14 * qtyavgtruck14;
        result = parseInt(result);
        if(avgtruckval14 == result)
            test.pass("Inventory value updated correctly for the Materail Receipt posted Relatively");
        else
            test.fail("Inventory value is not updated correctly for the Materail Receipt posted Relatively");
        
        
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    }
    
    //----- To avoid Unexpected blocks ------
    doNothing();
    
    //-------- Material Receipt by unchecking 'Adjust Value Check box--
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    
    var qtyavgtruck15 = qtyavgtruck14;
    var avgtruckuc15 = avgtruckuc14;
    var avgtruckval15 = avgtruckval14;
    snooze(1);
    
    
    //-----  Material Receipt by unchecking Adjust Value check box-----
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
        waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        activateItem(":xTuple ERP:*.Transactions_QMenu", "Adjustment...");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
        nativeType("<Tab>");
        waitForObject(":_qtyGroup._qty_XLineEdit");
        type(":_qtyGroup._qty_XLineEdit", "100");
        nativeType("<Tab>");
        waitForObject(":_adjustmentTypeGroup.Relative_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Relative_QRadioButton");
        if(findObject(":tabCost.Adjust Value_QGroupBox").checked)
            mouseClick(":tabCost.Adjust Value_QGroupBox", 45, 8, 0, Qt.LeftButton);
        else
            test.log("Cost tab is disabled already");
        nativeType("<Tab>");
        waitForObject(":_adjustmentTypeGroup.Relative_QRadioButton");
        clickButton(":_adjustmentTypeGroup.Relative_QRadioButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Material Receipt posted successfully by unchcecking the 'Adjust Value'check box ");
    }
    catch(e)
    {
        test.fail("Error in Posting the Material Receipt by unchcecking the 'Adjust Value'check box"+e);
    }
    
    
    
    //------- Unit Cost and Inventory value verification after posting Adjustment -----
    
    
    try{
        //---- QOH verification-----
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck16 = array[0];
        if(qtyavgtruck16 == qtyavgtruck15 + 100)
            test.pass("QOH Updated correctly for the Material Receipt posted");
        else
            test.fail("QOH is not updated correctly for the Material Receipt Posted");
        
        //----- Value verification -----
        var avgtruckval16 = array[2];
        if(avgtruckval16 == avgtruckval15)
            test.pass("Inventory value updated correctly for the Material Receipt posted");
        else
            test.fail("Inventory value is not updated correctly for the Material Receipt Posted");
        
        //---- Unit Cost Verification -----    
        var avgtruckuc16 = array[1];
        avgtruckval16 = replaceSubsting(avgtruckval16);
        result = (avgtruckval16)/qtyavgtruck16;
        result = roundNumber(result,4);
        test.log(result);
        if(avgtruckuc16 == result)
            test.pass("Unit Cost Updated correctly for the Material Receipt posted");
        else
            test.fail("Unit Cost is not updated correctly for the Material Receipt Posted");
        
        
        
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    }
    
    
    
    
    
    
    
    
    //------- Sales Order processing for an AVG costing item ----
    
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    
    var qtyavgtruck22 = qtyavgtruck16;
    var avgtruckuc22 = avgtruckuc16;
    var avgtruckval22 = avgtruckval16;
    
    //--- To Avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //------ Sales Order Creation --------
    
    var sonumber = createSalesOrder("AVGTRUCK 1", 100 ,"TTOYS");
    
    //----- Issuing Stock to Sales Order -------
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber);
        nativeType("<Tab>");
        waitForObject(":_frame._soitem_XTreeWidget");
        clickItem(":_frame._soitem_XTreeWidget","AVGTRUCK 1",0, 0, 5, Qt.LeftButton);
        waitForObject(":_frame.Issue Line_QPushButton");
        clickButton(":_frame.Issue Line_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Stock issue  Successfully to the SO "+sonumber+"");
    }
    catch(e)
    {
        test.fail("Error in issuing the Stock to SO "+sonumber+"");
    }
    
    
    //------ QOH, Unit Cost and Inv Value Verification after issueing the stock ----- 
    try{
        //------------- QOH Verification -----------
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck23 = array[0];
        if(qtyavgtruck23 == qtyavgtruck22 - 100)
            test.pass("QOH Updated correctly for the Stock issue to the Sales Order");
        else
            test.fail("QOH is not updated correctly for the Stock issue to the Sales Order");
        //---- Unit Cost Verification -----    
        var avgtruckuc23 = array[1];
        if(avgtruckuc23 == avgtruckuc22)
            test.pass("Unit Cost Updated correctly for the Stock issue to the Sales Order");
        else
            test.fail("Unit Cost is not updated correctly for the Stock issue to the Sales Order");
        
        //----- Value verification -----
        var avgtruckval23 = array[2];
        avgtruckval23 = replaceSubsting(avgtruckval23);
        avgtruckval22 = replaceSubsting(avgtruckval22);
        
        var result = avgtruckval22-(avgtruckuc22 * 100);
        result = roundNumber(result,4);
        test.log("result is "+result+"");
        test.log("avgtruckval23 "+avgtruckval23+"");
        if(avgtruckval23 == result)
            test.pass("Inventory value updated correctly for the Stock issue to the Sales Order");
        else
            test.fail("Inventory value is not updated correctly for the Stock issue to the Sales Order");
        
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    } 
    //--- To avoid unexpected failures --------
    
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //------ Returning the Stock issued -------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Maintain Shipping Contents...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Maintain Shipping Contents...");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        waitForObject(":_ship_XTreeWidget");
        if(object.exists("{column='2' container=':_ship_XTreeWidget' text='"+sonumber+"' type='QModelIndex'}"))
        {
            test.pass("stock issued to the SO "+sonumber+" successfully");
            openItemContextMenu(":_ship_XTreeWidget",sonumber, 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Return ALL Stock Issued to Order...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Return ALL Stock Issued to Order...");
            test.log("Stock returned successfully");
        }
        else
            test.fail("SO "+sonumber+" not found in Maintain Shipping Contents screen");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Returning the Stock"+e);
    }
    //------QOH, Unit Cost and Inventory Value Verification after Returning the Stock -------
    try{
        //------------- QOH Verification -----------
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck24 = array[0];
        
        if(qtyavgtruck24 == qtyavgtruck23 + 100)
            test.pass("QOH Updated correctly for the Stock Returned");
        else
            test.fail("QOH is not updated correctly for the Stock Returned");
        //---- Unit Cost Verification -----    
        
        var avgtruckuc24 = array[1];
        if(avgtruckuc24 == avgtruckuc23)
            test.pass("Unit Cost Updated correctly for the Stock Returned");
        else
            test.fail("Unit Cost is not updated correctly for the Stock Returned");
        
        //----- Value verification -----
        
        var avgtruckval24 = array[2];
        avgtruckval24 = replaceSubsting(avgtruckval24);
        avgtruckval24 = roundNumber(avgtruckval24,0);
        result = avgtruckuc24 * qtyavgtruck24;
        result = roundNumber(result,0)
                 result = replaceSubsting(result);
        if(avgtruckval24 == result)
            test.pass("Inventory value updated correctly for the Stock issue to the Sales Order");
        else
            test.fail("Inventory value is not updated correctly for the Stock issue to the Sales Order");
        
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    } 
    //----- To avoid unexpected Failures -----
    if(OS.name != "Windows")
    {
        doNothing();
    }
    var sonumber1 = sonumber+"-1";
    
    //---------G/L verification for Returning the Stock ----------
    bool = glTransactions(/Return from Shipping/, sonumber1);
    if(bool == 1)
        test.pass("" + sonumber1 + " SO has a GL entry for its stock return");
    else
        test.fail("No GL entry is made for the " + sonumber1 + " SO ");
    
    
    //------- Work Order processing for an Average Costing Item ---- 
    
    
    //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
    snooze(3);
    var qtyavgtruck19 = qtyavgtruck24;
    var avgtruckval19 = avgtruckval24;
    
    //-----Creating a Work Order-----
    var wonumber = createWorkOrder("AVGTRUCK 1", 100);
    //--------To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
        doNothing();
    }
    //------ Issue material by Batch ----------
    issueBatch(wonumber,"AVGTRUCK 1",appEdition);
    //--------To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    // -------Post Production -------------
    postProductionim(wonumber, 100,appEdition);
    //------- Unit Cost and Inventory value verification after posting Adjustment -----
    
    
    try{
        //---- QOH verification-----
        
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck20 = array[0];
        if(qtyavgtruck20 == qtyavgtruck19 + 100)
            test.pass("QOH Updated correctly for the Production Posted");
        else
            test.fail("QOH is not updated correctly for the Production Posted");
        
        //----finding Unit Cost for the posted Qty -----    
        
        var avgtruckval20 = array[2];
        var   avgtruckuc20 = (parseInt(avgtruckval20) - parseInt(avgtruckval19))/100;
        
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    }
    
    
    //--------To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //------- Correcting the Post Production ----------
    correctProduction(wonumber, 50,appEdition);
    
    //------- Unit Cost and Inventory value verification after posting Adjustment -----
    
    try{
        //---- QOH verification-----
        var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
        var qtyavgtruck21 = array[0];
        if(qtyavgtruck21== qtyavgtruck20 - 50)
            test.pass("QOH Updated correctly for the corrected Production");
        else
            test.fail("QOH is not updated correctly for the corrected prodcution");
        
        
        //----Unit Cost Verification -----  
        
        var avgtruckval21 = array[2];
        var avgtruckuc21 = array[1];
        test.log(avgtruckuc21);
        test.log(avgtruckval21);
        
        
        
    }
    catch(e)
    {
        test.fail("Error in comparing values"+e);
    }
    
    if(appEdition != "PostBooks")
    {
        //---- Transforming Avg item Qty to Standard Item --
        
        
        //--- Adding transformation for an average costing item ----
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
            activateItem(":xTuple ERP: *_QMenuBar", "Products");
            waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
            activateItem(":xTuple ERP:*.Products_QMenu", "Item");
            waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
            activateItem(":xTuple ERP:*.Item_QMenu", "List...");
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");    
            waitForObject(":_list.AVGTRUCK 1_QModelIndex_2");
            doubleClick(":_list.AVGTRUCK 1_QModelIndex_2", 30, 8, 0, Qt.LeftButton);
            waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Relationships");
            waitForObject(":_relationshipsTab.Transformations_QRadioButton");
            clickButton(":_relationshipsTab.Transformations_QRadioButton");
            waitForObject(":_relationshipsStack.New_QPushButton");
            clickButton(":_relationshipsStack.New_QPushButton");
            waitForObject(":_listTab_XTreeWidget_19");
            clickItem(":_listTab_XTreeWidget_19","BTRUCK1",0, 0, 5, Qt.LeftButton);
            waitForObject(":Sales Order.OK_QPushButton_2");
            clickButton(":Sales Order.OK_QPushButton_2");
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            test.log("Transformation added succesfully for the Avg Costing item");
        }
        catch(e)
        {
            test.fail("Error in adding Transformation to the Avg Costing item"+e);
        }
        
        //-------To avoid unexpected blocks ------
        if(OS.name != "Windows")
        {
            doNothing();
        }
        
        //----- QOH,Unit Cost and Inventory value verification before posting Adjustment -----
        
        var qtybtruck1 = queryQoh("BTRUCK1","WH1",appEdition);
        var qtyavgtruck17 = qtyavgtruck21;
        
        var avgtruckuc17 = avgtruckuc21;
        var avgtruckval17 = avgtruckval21;
        
        //---- Transforming avg costing item's QOH to Standard Costing Item's QOH -------
        var trfmnum = "12346";
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
            waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Transform...");
            activateItem(":xTuple ERP:*.Transactions_QMenu", "Transform...");
            waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
            type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
            nativeType("<Tab>");
            waitForObject(":xTuple ERP:*._warehouse_WComboBox");
            clickItem(":xTuple ERP:*._warehouse_WComboBox","WH1",0, 0, 5, Qt.LeftButton);
            waitForObject(":xTuple ERP:*._target_XComboBox");
            clickItem(":xTuple ERP:*._target_XComboBox","BTRUCK1",0, 0, 5, Qt.LeftButton);
            waitForObject(":xTuple ERP:*._qty_XLineEdit");
            type(":xTuple ERP:*._qty_XLineEdit", "100");
            nativeType("<Tab>");
            waitForObject(":_documentNum_QLineEdit");
            type(":_documentNum_QLineEdit", trfmnum);
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            snooze(2);
            test.log("Avg Costing item's qty succesfully transfered to Standard Costing item's QOH");
        }
        catch(e)
        {
            test.fail("Error in transforming the Avg Costing item's QOH to Standard Itemss QOH");
        }
        //----- To 
        //------- Unit Cost and Inventory value verification after posting Adjustment -----
        try{
            snooze(1);
            //------------- QOH Verification -----------
            
            var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
            var qtyavgtruck18 = array[0];
            if(qtyavgtruck18 == qtyavgtruck17 - 100)
                test.pass("QOH Updated correctly for the Material Transformation");
            else
                test.fail("QOH is not updated correctly for the Material Transformation");
            //---- Unit Cost Verification -----    
            var avgtruckuc18 = array[1];
            
            if(avgtruckuc18 == avgtruckuc17)
                test.pass("Unit Cost Updated correctly for the Material Transformation");
            else
                test.fail("Unit Cost is not updated correctly for the Material Transformation");
            
            //----- Value verification -----
            
            var avgtruckval18 = array[2];
            avgtruckval18 = replaceSubsting(avgtruckval18);
            avgtruckval18 = parseInt(avgtruckval18);
            test.log(avgtruckval18);
            result = avgtruckuc18 * qtyavgtruck18;
            result = parseInt(result);
            if(avgtruckval18 == result)
                test.pass("Inventory value updated correctly for the Material Transformation");
            else
                test.fail("Inventory value is not updated correctly for the Material Transformation");
            
            var qtybtruck2 = queryQoh("BTRUCK1","WH1",appEdition);
            if(qtybtruck2 == qtybtruck1 + 100)
                test.pass("QOH Updated correctly for the Material Transformation");
            else
                test.fail("QOH is not updated correctly for the Material Transformation");  
        }
        catch(e)
        {
            test.fail("Error in comparing the values"+e);
        }
        
        
        
        //---------G/L verification for Cost Variance ----------
        bool = glTransactions(/Transform Variance/, trfmnum);
        if(bool == 1)
        {
            test.pass("Material Transformation " + trfmnum + " has a GL entry for its variance of cost");
        }
        else
            test.fail("No GL entry is made for the variance of cost for the material transformation " + trfmnum);
    }
    
    //----Qty Transforming between Avg site to Standard site-----
    
    
    //----- QOH,Unit Cost and Inventory value verification before posting Site Transforming -----  
    if(appEdition != "PostBooks")
    {
        snooze(3);
        createRIS1("AVGTRUCK 1", "WH2");
        var array = inventoryVariables("AVGTRUCK 1","WH2",appEdition);
        var qtyavgtruck26 = array[0];
        var qtyavgtruck25 = qtyavgtruck18;
        
        var avgtruckuc25 = avgtruckuc18;
        var avgtruckval25 = avgtruckval18;
        var strfmnum = "12345";
        
        
        
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Transactions");
            waitForObjectItem(":xTuple ERP:*.Transactions_QMenu", "Site Transfer...");
            activateItem(":xTuple ERP:*.Transactions_QMenu", "Site Transfer...");
            waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
            mouseClick(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", 28, 17, 0, Qt.LeftButton);
            waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
            type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "AVGTRUCK 1");
            nativeType("<Tab>");
            waitForObject(":xTuple ERP:*._fromWarehouse_WComboBox");
            clickItem(":xTuple ERP:*._fromWarehouse_WComboBox","WH1",0, 0, 5, Qt.LeftButton);
            waitForObject(":xTuple ERP:*._toWarehouse_WComboBox");
            clickItem(":xTuple ERP:*._toWarehouse_WComboBox","WH2",0, 0, 5, Qt.LeftButton);
            waitForObject(":xTuple ERP:*._qty_XLineEdit");
            type(":xTuple ERP:*._qty_XLineEdit", "100");
            waitForObject(":xTuple ERP:*._documentNum_XLineEdit");
            type(":xTuple ERP:*._documentNum_XLineEdit",strfmnum);
            nativeType("<Tab>")
                    waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            test.log("Site Transformation successful");
        }
        catch(e)
        {
            test.fail("Error in Site Transformation"+e);
        }
        //------- Unit Cost and Inventory value verification after posting site Transformation -----
        try{
            //------------- QOH Verification -----------
            
            var array = inventoryVariables("AVGTRUCK 1","WH1",appEdition);
            var qtyavgtruck27 = array[0];
            if(qtyavgtruck27 == qtyavgtruck25 - 100)
                test.pass("QOH Updated correctly for the site Transformation");
            else
                test.fail("QOH is not updated correctly for the site Transformation");
            //---- Unit Cost Verification -----    
            var avgtruckuc27 = array[1];
            if(avgtruckuc27 == avgtruckuc25)
                test.pass("Unit Cost Updated correctly for the site Transformation");
            else
                test.fail("Unit Cost is not updated correctly for the site Transformation");
            
            //----- Value verification -----
            var avgtruckval27 = array[2];
            
            avgtruckval27 = replaceSubsting(avgtruckval27);
            avgtruckval27 = roundNumber(avgtruckval27,1);
            result = avgtruckuc27 * qtyavgtruck27;
            
            result = replaceSubsting( result);
            
            result = roundNumber(result,1);
            if(avgtruckval27 == result)
                test.pass("Inventory value updated correctly for the site Transformation");
            else
                test.fail("Inventory value is not updated correctly for the site Transformation");
            
            var qtyavgtruck28 = queryQoh("AVGTRUCK 1","WH2",appEdition);
            
            result = qtyavgtruck26 + 100;
            
            if(qtyavgtruck28 == result)
                test.pass("QOH Updated correctly for the site Transformation");
            else
                test.fail("QOH is not updated correctly for the site Transformation");  
        }
        catch(e)
        {
            test.fail("Error in comparing the values"+e);
        }
        //---------G/L verification for Cost Variance ----------
        bool = glTransactions(/Inter-Warehouse Transfer Variance/, strfmnum);
        if(bool == 1)
        {
            test.pass("Site Transformation " + strfmnum + " has a GL entry for its variance of cost");
        }
        else
            test.fail("No GL entry is made for the variance of cost for the site transformation " + strfmnum);
        
    }
    
    
    
}