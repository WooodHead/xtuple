function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE");
    snooze(6);
    //--------------- Set the window to Tab view mode -------------
    
    tabView();
    //---Updating pricing schedule by item using fixed amount-----------
    //---Verifying the price of Pricing Schedule before updation-----
    var prcname = "PRICING SCHEDULE1";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        waitForObject(":_ipshead_XTreeWidget_3");
        clickItem(":_ipshead_XTreeWidget_3",prcname, 0, 0, 5, Qt.LeftButton); 
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
        snooze(0.5);
        waitForObject(":Pricing Schedule._ipsitem_XTreeWidget");
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}"))
            var bprc1 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text);
        
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='100.00' type='QModelIndex'}"))
            var bprc2 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text);
        snooze(0.5);        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(1);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in veifying the Prices before updating the pricing schedule:"+e);
        
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Pricing Schedule Updation by Item------
    
    var itemname = "PRCITEM";
    var upamnt = 5;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Update Pricing Schedules..."));	snooze(1);
        if(!findObject(":Update By.Item_QRadioButton").checked)
            clickButton(waitForObject(":Update By.Item_QRadioButton"));
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"),itemname);
        nativeType("<Tab>");
        waitForObject(":_frame._avail_XTreeWidget");
        clickItem(":_frame._avail_XTreeWidget", prcname,0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        clickButton(waitForObject(":_frame.>_QPushButton"));
        if(!findObject(":frame.Fixed Amount_QRadioButton").checked)
        {
            clickButton(waitForObject(":frame.Fixed Amount_QRadioButton"));
        }
        type(waitForObject(":Update Pricing Schedules._updateBy_XLineEdit"),upamnt);
        snooze(0.5);
        clickButton(waitForObject(":Update Pricing Schedules.Update_QPushButton"));
        snooze(0.5);
        clickButton(waitForObject(":OK_QPushButton"));
        snooze(1);
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
    }
    catch(e)
    {
        test.fail("Error in updating the pricing schedule:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
    }
    //---Verifying the price of Pricing Schedule after updation-----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        snooze(0.5);
        clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
        snooze(1);
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}"))
            var aprc1 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text);
        
        var aprc2 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text);
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in veifying the Prices after updating the pricing schedule:"+e);
        
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    
    //--verifying updated prices----
    
    if(aprc1 ==parseInt(bprc1+upamnt) && aprc2 == parseInt(bprc2+upamnt))
    {
        test.pass("Prices in Pricing Schedule updated correctly according to the Fixed amount assisned to item");
    }
    else
        test.fail("Error in updating the Price in Pricing Schedule according to the fixed amount assigned to item");
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //----Updating Pricing schedule by item using percent--------
    
    //---Verifying the price of Pricing Schedule before updation-----
    var prcname = "PRICING SCHEDULE1";
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        waitForObject(":_ipshead_XTreeWidget_3");
        clickItem(":_ipshead_XTreeWidget_3",prcname, 0, 0, 5, Qt.LeftButton); 
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
        snooze(0.5);
        waitForObject(":Pricing Schedule._ipsitem_XTreeWidget");
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}"))
            var bprc1 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text);
        
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='100.00' type='QModelIndex'}"))
            var bprc2 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text);
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in veifying the Prices before updating the pricing schedule:"+e);
        
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Pricing Schedule Updation by Item using percentage------
    
    var itemname = "PRCITEM";
    var uperc = 2;
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Update Pricing Schedules..."));
        snooze(0.5);
        if(!findObject(":Update By.Item_QRadioButton").checked)
            clickButton(waitForObject(":Update By.Item_QRadioButton"));
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"),itemname);
        nativeType("<Tab>");
        waitForObject(":_frame._avail_XTreeWidget");
        clickItem(":_frame._avail_XTreeWidget", prcname,0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        clickButton(waitForObject(":_frame.>_QPushButton"));
        if(!findObject(":frame.Percent_QRadioButton").checked)
        {
            clickButton(waitForObject(":frame.Percent_QRadioButton"));
        }
        type(waitForObject(":Update Pricing Schedules._updateBy_XLineEdit"),uperc);
        clickButton(waitForObject(":Update Pricing Schedules.Update_QPushButton"));
        clickButton(waitForObject(":OK_QPushButton"));
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
    }
    catch(e)
    {
        test.fail("Error in updating the pricing schedule:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
    }
    //---Verifying the price of Pricing Schedule after updation-----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
        snooze(1);
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}"))
            var aprc1 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text);
        
        var aprc2 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text);
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in veifying the Prices after updating the pricing schedule:"+e);
        
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    
    //--verifying updated prices----
    prc1 = (bprc1*uperc/100)+bprc1;
    prc2 = (bprc2*uperc/100)+bprc2;
    var pc1 = roundNumber( prc1, 0);
    var pc2 = roundNumber( prc2, 0);
    var aprc3 = roundNumber( aprc1, 0);
    var aprc4 = roundNumber( aprc2, 0);
    if(aprc3 ==parseInt( pc1) && aprc4 == parseInt(pc2))
    {
        test.pass("Prices in Pricing Schedule updated correctly according to the percentage assigned to item");
    }
    else
        test.fail("Error in updating the Price in Pricing Schedule according to the percentage assigned to item");
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Updating pricing schedule by Product Catageory using fixed amount----------- 
    //---Verifying the price of Pricing Schedule before updation----- 
    var prcname = "PRICING SCHEDULE1"; 
    try 
    { 
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules...")); 
        waitForObject(":_ipshead_XTreeWidget_3"); 
        clickItem(":_ipshead_XTreeWidget_3",prcname, 0, 0, 5, Qt.LeftButton);  
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton")); 
        snooze(0.5);
        waitForObject(":Pricing Schedule._ipsitem_XTreeWidget"); 
        
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}")) 
            var bprc1 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text); 
        
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='100.00' type='QModelIndex'}")) 
            var bprc2 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text); 
        
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2")); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton")); 
    } 
    catch(e) 
    { 
        test.fail("Error in veifying the Prices before updating the pricing schedule:"+e); 
        
        if(object.exists(":Select Order for Billing.Close_QPushButton")) 
        { 
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton")); 
        } 
    } 
    
    //---Pricing Schedule Updation by Item------ 
    var prdctry = "CLASSIC-METAL - Classic Metal Product Line"; 
    var itemname = "PRCITEM"; 
    var upamnt = 5; 
    try 
    { 
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Update Pricing Schedules...")); 	
        snooze(1);
        if(!findObject(":Update By.Product Category_QRadioButton").checked) 
        { 
            clickButton(waitForObject(":Update By.Product Category_QRadioButton")); 
        } 
        if(!findObject(":_paramGroup.Selected:_QRadioButton").checked) 
        { 
            clickButton(waitForObject(":_paramGroup.Selected:_QRadioButton")); 
        } 
        waitForObject(":_paramGroup._items_XComboBox"); 
        clickItem(":_paramGroup._items_XComboBox",prdctry,0, 0, 5, Qt.LeftButton); 
        snooze(0.5);
        nativeType("<Tab>"); 
        
        waitForObject(":_frame._avail_XTreeWidget"); 
        clickItem(":_frame._avail_XTreeWidget", prcname,0, 0, 5, Qt.LeftButton); 
        snooze(0.5);
        clickButton(waitForObject(":_frame.>_QPushButton")); 
        if(!findObject(":frame.Fixed Amount_QRadioButton").checked) 
        { 
            clickButton(waitForObject(":frame.Fixed Amount_QRadioButton")); 
        } 
        type(waitForObject(":Update Pricing Schedules._updateBy_XLineEdit"),upamnt); 
        snooze(0.5);
        clickButton(waitForObject(":Update Pricing Schedules.Update_QPushButton")); 
        snooze(.5);
        clickButton(waitForObject(":OK_QPushButton")); 
        snooze(1);
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3")); 
    } 
    catch(e) 
    { 
        test.fail("Error in updating the pricing schedule:"+e); 
        if(object.exists(":Sales Order.Cancel_QPushButton_3")) 
        { 
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3")); 
        } 
    } 
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---Verifying the price of Pricing Schedule after updation----- 
    try 
    { 
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules...")); 
        clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton); 
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton")); 
        snooze(1);
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}")) 
            var aprc1 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text); 
        
        var aprc2 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2")); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton")); 
    } 
    catch(e) 
    { 
        test.fail("Error in veifying the Prices after updating the pricing schedule:"+e); 
        
        if(object.exists(":Select Order for Billing.Close_QPushButton")) 
        { 
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton")); 
        } 
    } 
    
    
    //--verifying updated prices---- 
    
    if(aprc1 ==parseInt(bprc1+upamnt) && aprc2 == parseInt(bprc2+upamnt)) 
    { 
        test.pass("Prices in Pricing Schedule updated correctly according to the Fixed amount assisned to Product Catageory"); 
    } 
    else 
        test.fail("Error in updating the Price in Pricing Schedule according to the fixed amount assigned to Product Catageory"); 
    //---- To avoid unexpected blocks ---------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //----Updating Pricing schedule by Product Catageory using percent-------- 
    
    //---Verifying the price of Pricing Schedule before updation----- 
    var prcname = "PRICING SCHEDULE1"; 
    try 
    { 
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules...")); 
        waitForObject(":_ipshead_XTreeWidget_3"); 
        clickItem(":_ipshead_XTreeWidget_3",prcname, 0, 0, 5, Qt.LeftButton);  
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton")); 
        snooze(0.5);
        waitForObject(":Pricing Schedule._ipsitem_XTreeWidget"); 
        
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}")) 
            var bprc1 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text); 
        
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='100.00' type='QModelIndex'}")) 
            var bprc2 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2")); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton")); 
    } 
    catch(e) 
    { 
        test.fail("Error in veifying the Prices before updating the pricing schedule:"+e); 
        
        if(object.exists(":Select Order for Billing.Close_QPushButton")) 
        { 
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton")); 
        } 
    } 
    
    //---Pricing Schedule Updation by Product Catageory using percentage------ 
    
    
    //---Pricing Schedule Updation by Product Catageory using percentage------ 
    
    var itemname = "PRCITEM"; 
    var uperc = 2; 
    try 
    { 
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Update Pricing Schedules...")); 	
        snooze(1);
        if(!findObject(":Update By.Product Category_QRadioButton").checked) 
        { 
            clickButton(waitForObject(":Update By.Product Category_QRadioButton")); 
        } 
        if(!findObject(":_paramGroup.Selected:_QRadioButton").checked) 
        { 
            clickButton(waitForObject(":_paramGroup.Selected:_QRadioButton")); 
        } 
        waitForObject(":_paramGroup._items_XComboBox"); 
        clickItem(":_paramGroup._items_XComboBox",prdctry,0, 0, 5, Qt.LeftButton); 
        snooze(0.5);
        nativeType("<Tab>"); 
        waitForObject(":_frame._avail_XTreeWidget"); 
        clickItem(":_frame._avail_XTreeWidget", prcname,0, 0, 5, Qt.LeftButton); 
        snooze(0.5);
        clickButton(waitForObject(":_frame.>_QPushButton")); 
        
        if(!findObject(":frame.Percent_QRadioButton").checked) 
        { 
            clickButton(waitForObject(":frame.Percent_QRadioButton")); 
        } 
        snooze(0.5);
        type(waitForObject(":Update Pricing Schedules._updateBy_XLineEdit"),uperc); 
        snooze(0.5);
        clickButton(waitForObject(":Update Pricing Schedules.Update_QPushButton")); 
        snooze(0.5);
        clickButton(waitForObject(":OK_QPushButton")); 
        snooze(0.5);
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3")); 
    } 
    catch(e) 
    { 
        test.fail("Error in updating the pricing schedule:"+e); 
        if(object.exists(":Sales Order.Cancel_QPushButton_3")) 
        { 
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3")); 
        } 
    } 
    //---Verifying the price of Pricing Schedule after updation----- 
    try 
    { 
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing")); 
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules...")); 
        clickItem(":_ipshead_XTreeWidget_3",prcname, 5, 5, 1, Qt.LeftButton); 
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton")); 
        snooze(1);
        if(object.exists("{column='4' container=':Pricing Schedule._ipsitem_XTreeWidget' text='0.00' type='QModelIndex'}")) 
            var aprc1 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text); 
        
        var aprc2 =parseInt(findObject("{column='6' container=':Pricing Schedule._ipsitem_XTreeWidget' type='QModelIndex'}").text); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2")); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton")); 
    } 
    catch(e) 
    { 
        test.fail("Error in veifying the Prices after updating the pricing schedule:"+e); 
        
        if(object.exists(":Select Order for Billing.Close_QPushButton")) 
        { 
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton")); 
        } 
    } 
    
    
    //--verifying updated prices---- 
    prc1 = (bprc1*uperc/100)+bprc1; 
    prc2 = (bprc2*uperc/100)+bprc2; 
    var pc1 = roundNumber( prc1, 0); 
    var pc2 = roundNumber( prc2, 0); 
    var aprc3 = roundNumber( aprc1, 0); 
    var aprc4 = roundNumber( aprc2, 0); 
    if(aprc3 ==parseInt( pc1) && aprc4 == parseInt(pc2)) 
    { 
        test.pass("Prices in Pricing Schedule updated correctly according to the percentage assigned to Product Catageory"); 
    } 
    else 
        test.fail("Error in updating the Price in Pricing Schedule according to the percentage assigned toProduct Catageory"); 
}
