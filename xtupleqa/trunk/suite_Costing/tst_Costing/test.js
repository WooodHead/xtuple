function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
       
     //   -----Editing of preferences----
        try
        {
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
            activateItem(":xTuple ERP: *_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
            activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
            if(object.exists(":Interface Options.Tabbed Windows_QRadioButton"))
            {
                if(!findObject(":Interface Options.Tabbed Windows_QRadioButton").checked)
                    clickButton(":Interface Options.Tabbed Windows_QRadioButton");
            }
            
            if(object.exists(":Notice.Notice_QDialog"))
            {
                if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                    clickButton(":Notice.Remind me about this again._QCheckBox");
                snooze(0.2);
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
 
  snooze(3);
    // -------------Create new Items-------------------------
    copyItem("YTRUCK1","YTRUCK2");
    copyItem("YTRUCK1","YTRUCK3");
    copyItem("YTRUCK1","YTRUCK4");
    copyItem("YTRUCK1","YTRUCK5");
 
    
    //--------------Create Itemsites for new items------------
    createRIS("YTRUCK2");
    createRIS("YTRUCK3");
    createRIS("YTRUCK4");
    createRIS("YTRUCK5");
    
    //--------------Adjust QOH -------------------------------
    
    adjustQoh("YTRUCK2","100","WH1","");
    adjustQoh("YTRUCK3","100","WH1","");
    adjustQoh("YTRUCK4","100","WH1","");
    adjustQoh("YTRUCK5","100","WH1","");
  
//---------Veriable Declaration-------------    
var obj_TreeTopLevelItem,obj_tree,tree;  
tree = ":_itemcost_XTreeWidget";
    
    //---------------Verifying the costs -------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK2");
        nativeType("<Tab>");
        
        waitForObject(tree);
        obj_tree = findObject(tree);
        var count = obj_tree.topLevelItemCount;
        if(count <= "1")
        {
            test.log("No item costs exist for YTRUCK2");
        }
        else
        {
            test.log("Item costs exist for YTRUCK2");
            for(var i=0;i<count-1;i++)
            {
                waitForObject(":_itemcost_XTreeWidget");
                obj_TreeTopLevelItem = obj_tree.topLevelItem(0);
                waitForObject(":_itemcost_XTreeWidget");
                snooze(0.5);
                clickItem(":_itemcost_XTreeWidget", obj_TreeTopLevelItem.text(0), 0, 0, 5, Qt.LeftButton);
                waitForObject(":xTuple ERP:*.Delete_QPushButton");
                clickButton(":xTuple ERP:*.Delete_QPushButton");
                waitForObject(":Sales Order.OK_QPushButton_2");
                clickButton(":Sales Order.OK_QPushButton_2");
                waitForObject(":xTuple ERP:*.Edit_QPushButton");
                clickButton(":xTuple ERP:*.Edit_QPushButton");
                if(!findObject(":Enter Actual Cost.Post Cost to Standard_QCheckBox").checked)
                    clickButton(":Enter Actual Cost.Post Cost to Standard_QCheckBox");
                waitForObject(":Select Order for Billing.Save_QPushButton");
                clickButton(":Select Order for Billing.Save_QPushButton");
             }
            
        }
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in checking the maintain costs" + e);
    }
    
    //-------Create Item costs-----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK2");
        nativeType("<Tab>");
        
        var costElement = new Array();
        costElement[0] = "Direct Labor";
        costElement[1] = "Machine Overhead";
        for(i=0;i<costElement.length;i++)
        {
            waitForObject(":xTuple ERP:*.New_QPushButton");
            clickButton(":xTuple ERP:*.New_QPushButton");
            waitForObject(":Create Item Cost._costelem_XComboBox");
            clickItem(":Create Item Cost._costelem_XComboBox", costElement[i], 0, 0, 5, Qt.LeftButton);
            waitForObject(":Create Item Cost.XLineEdit_XLineEdit");
            type(":Create Item Cost.XLineEdit_XLineEdit", "0.5");
            if(!findObject(":Create Item Cost.Post Cost to Standard_QCheckBox").checked)
            {
                clickButton(":Create Item Cost.Post Cost to Standard_QCheckBox");
            }
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
        }
        
        waitForObject(tree);
        obj_tree = findObject(tree);
        count = obj_tree.topLevelItemCount;
        if(parseInt(count)>"0")
        {
            test.pass("Item costs created for YTRUCK2");
        }
        else
            test.fail("Item costs not created for YTRUCK2");
        
        waitForObject(tree);
        obj_tree = findObject(tree);
        obj_treeTopLevelItem = obj_tree.topLevelItem(0);
        if(obj_treeTopLevelItem.text(2) == obj_treeTopLevelItem.text(5))
            test.pass("Actual cost posted to Standard cost");
        else
            test.fail("Actual cost not posted to standard cost");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in creating item cost" + e);   
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
 
    //-------------Edit Actual cost------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK2");
        nativeType("<Tab>");
        tree = ":_itemcost_XTreeWidget";
        waitForObject(tree);
        obj_tree = findObject(tree);
        obj_TreeTopLevelItem = obj_tree.topLevelItem(0);
        waitForObject(tree);
        snooze(0.5);
        clickItem(":_itemcost_XTreeWidget", obj_TreeTopLevelItem.text(0), 0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Edit_QPushButton");
        clickButton(":xTuple ERP:*.Edit_QPushButton");
        
        findObject(":Enter Actual Cost.XLineEdit_XLineEdit").clear();
        type(":Enter Actual Cost.XLineEdit_XLineEdit", ".4");
        snooze(0.5);
        if(findObject(":Enter Actual Cost.Post Cost to Standard_QCheckBox").checked)
            clickButton(":Enter Actual Cost.Post Cost to Standard_QCheckBox");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        snooze(0.5);
        tree = ":_itemcost_XTreeWidget";
        waitForObject(tree);
        obj_tree = findObject(tree);
        obj_TreeTopLevelItem = obj_tree.topLevelItem(0);
        snooze(1);
        if(obj_TreeTopLevelItem.text(2) == obj_TreeTopLevelItem.text(5))
            test.fail("Edit Actual cost is successful");
        else
            test.pass("Edit Actual cost is not successful");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in creating item cost" + e);   
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
 
  
    //-------------Delete Item cost-------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs..."); 
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK2");
        nativeType("<Tab>");
        tree = ":_itemcost_XTreeWidget";
        waitForObject(tree);
        obj_tree = findObject(tree);
        var count1 = obj_tree.topLevelItemCount;
        obj_TreeTopLevelItem = obj_tree.topLevelItem(1);
        waitForObject(tree);
        snooze(0.5);
        clickItem(":_itemcost_XTreeWidget", obj_TreeTopLevelItem.text(0), 0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*.Delete_QPushButton");
        clickButton(":xTuple ERP:*.Delete_QPushButton");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        waitForObject(":xTuple ERP:*.Edit_QPushButton");
        clickButton(":xTuple ERP:*.Edit_QPushButton");
        if(!findObject(":Enter Actual Cost.Post Cost to Standard_QCheckBox").checked)
            clickButton(":Enter Actual Cost.Post Cost to Standard_QCheckBox");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        var count2 = obj_tree.topLevelItemCount;
        if(count2 = parseInt(count1) - 1)
            test.pass("Item cost is deleted successfully");
        else
            test.fail("Item cost is not deleted");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    catch(e)
    {
        test.fail("Exception in deleted item cost" + e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    //------------Update Actual costs by Item-------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Update Actual Costs");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Update Actual Costs");
        waitForObjectItem(":xTuple ERP:*.Update Actual Costs_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Update Actual Costs_QMenu", "by Item...");
            sendEvent("QMouseEvent", waitForObject(":Update Actual Costs by Item_QLabel"), QEvent.MouseButtonPress, 9, 9, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        snooze(1);
        waitForObject(":_search_QLineEdit")
        type(":_search_QLineEdit", "YTRUCK3");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        waitForObject(":Update Actual Costs by Item.Select all Costs_QPushButton");
        clickButton(":Update Actual Costs by Item.Select all Costs_QPushButton");
        waitForObject(":Update Actual Costs by Item.Update_QPushButton");
        clickButton(":Update Actual Costs by Item.Update_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in updating actual costs by item" + e);
    }
    //---------------Verify Actual cost by Item-------  
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK3");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(tree);
        obj_tree = findObject(tree);
        count = obj_tree.topLevelItemCount;
        if(parseInt(count)>"1")
        {
            test.pass("Update Actual cost by item is successful");
        }
        else
            test.fail("Update Actual cost by item failed");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying actual cost of 'YTRUCK3':"+e);
    }
    //---------------Post Actual Cost by Item-------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
        waitForObjectItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Item...");
          sendEvent("QMouseEvent", waitForObject(":Post Actual Costs by Item_QLabel"), QEvent.MouseButtonPress, 9, 9, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        snooze(1);
        waitForObject(":_search_QLineEdit")
        type(":_search_QLineEdit", "YTRUCK3");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        waitForObject(":Post Actual Costs by Item.Select all Costs_QPushButton");
        clickButton(":Post Actual Costs by Item.Select all Costs_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail(" Exception in Post Actual Cost by Item:"+e);
    }
    
    //---------------Verify Post Actual cost by item-------  
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK3");
        nativeType("<Tab>");
        snooze(0.5);
        var flag = 0;
        waitForObject(tree);
        obj_tree = findObject(tree);
        count = obj_tree.topLevelItemCount;
        for( var k=0;k<count;k++)
        {
            obj_treeTopLevelItem = obj_tree.topLevelItem(k);
            if(obj_treeTopLevelItem.text(2) != obj_treeTopLevelItem.text(5))
            {
                flag = 1;
                break;
            }
        }
        if(flag == 0)
        {
            test.pass("Actual costs posted to standard costs successfully");
        }
        else
        {
            test.fail("Post Actual cost by item failed");
        }
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying actual cost of 'YTRUCK3':"+e);
    }
    //--------------Verify GL entry for Post Actual Cost to Standard cost-------
    
    verifyGL(/Post Actual Cost to Standard for item YTRUCK3/);
    
    //--------------Post Standard cost by Item-------------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Post Standard Costs");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Post Standard Costs");
        waitForObjectItem(":xTuple ERP:*.Post Standard Costs_QMenu", "by Item...");
        activateItem(":xTuple ERP:*.Post Standard Costs_QMenu", "by Item...");
          sendEvent("QMouseEvent", waitForObject(":Update Standard Costs By Item_QLabel"), QEvent.MouseButtonPress, 9, 9, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        snooze(1);
        waitForObject(":_search_QLineEdit")
        type(":_search_QLineEdit", "YTRUCK4");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        waitForObject(":Update Standard Costs By Item.Select all Costs_QPushButton");
        clickButton(":Update Standard Costs By Item.Select all Costs_QPushButton");
        waitForObject(":Update Standard Costs By Item.Update_QPushButton");
        clickButton(":Update Standard Costs By Item.Update_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in posting standard cost by item");
    }
    //---------------Verify Standard cost by Item-----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK4");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(tree);
        obj_tree = findObject(tree);
        count = obj_tree.topLevelItemCount;
        if(parseInt(count)>"1")
        {
            test.pass("Post Standard cost by Item is successful");
        }
        else
            test.fail("Post Standard cost by Item failed");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying actual cost of 'YTRUCK4':"+e);
    }
    
  
    //----------------Update Actual Cost by Class code---------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Update Actual Costs");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Update Actual Costs");
        waitForObjectItem(":xTuple ERP:*.Update Actual Costs_QMenu", "by Class Code...");
        activateItem(":xTuple ERP:*.Update Actual Costs_QMenu", "by Class Code...");
        waitForObject(":_classCode.Selected:_QRadioButton");
        clickButton(":_classCode.Selected:_QRadioButton");
        waitForObject(":_classCode._items_XComboBox");
        clickItem(":_classCode._items_XComboBox", "TOYS-TRUCKS-Toy Trucks", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Update Actual Costs by Class Code.Select all Costs_QPushButton");
        clickButton(":Update Actual Costs by Class Code.Select all Costs_QPushButton");
        if(findObject(":Update Actual Costs by Class Code.Roll Up Actual Costs_QCheckBox").checked)
        {
            clickButton(":Update Actual Costs by Class Code.Roll Up Actual Costs_QCheckBox");
        }
        waitForObject(":Update Actual Costs by Class Code.Update_QPushButton");
        clickButton(":Update Actual Costs by Class Code.Update_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in update Actual cost by class code:" + e);
    }
    //-----------------Verification of update actual cost by class code-------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK5");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(tree);
        obj_tree = findObject(tree);
        count = obj_tree.topLevelItemCount;
        if(parseInt(count)>"1")
        {
            test.pass("Update Actual Cost by Class code is successful");
        }
        else
            test.fail("Update Actual Cost by Class code failed");
        
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying actual cost of 'YTRUCK5':"+e);
    }
    
    //-------------------Post Actual cost by Class code---------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Post Actual Costs");
        waitForObjectItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Class Code...");
        activateItem(":xTuple ERP:*.Post Actual Costs_QMenu", "by Class Code...");
        waitForObject(":_classCode.Selected:_QRadioButton_2");
        clickButton(":_classCode.Selected:_QRadioButton_2");
        waitForObject(":_classCode._items_XComboBox_2");
        clickItem(":_classCode._items_XComboBox_2", "TOYS-TRUCKS-Toy Trucks", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Post Actual Costs by Class Code.Select all Costs_QPushButton");
        clickButton(":Post Actual Costs by Class Code.Select all Costs_QPushButton");
        if(!findObject(":Post Actual Costs by Class Code.Roll Up Standard Costs_QCheckBox").checked)
        {
            clickButton(":Post Actual Costs by Class Code.Roll Up Standard Costs_QCheckBox");
        }
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in post standard cost by class code: " + e);
    }
    //---------------Verify Post Actual cost by Class code-------  
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK5");
        nativeType("<Tab>");
        snooze(0.5);
        var flag = 0;
        waitForObject(tree);
        obj_tree = findObject(tree);
        count = obj_tree.topLevelItemCount;
        for( var k=0;k<count;k++)
        {
            obj_treeTopLevelItem = obj_tree.topLevelItem(k);
            if(obj_treeTopLevelItem.text(2) != obj_treeTopLevelItem.text(5))
            {
                flag = 1;
                break;
            }
        }
        if(flag == 0)
        {
            test.pass("Post Actual cost by Class code operation is successful");
        }
        else
        {
            test.fail("Post Actual cost by Class code operation failed");
        }
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying actual cost of 'YTRUCK5':"+e);
    }
    
    //--------------Verify GL entry for Post Actual Cost by Class code-------
    
    verifyGL(/Post Actual Cost to Standard for item YTRUCK5/);
    
    //---------------Post standard costs by Class code--------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Post Standard Costs");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Post Standard Costs");
        waitForObjectItem(":xTuple ERP:*.Post Standard Costs_QMenu", "by Class Code...");
        activateItem(":xTuple ERP:*.Post Standard Costs_QMenu", "by Class Code...");
        waitForObject(":_classCode.Selected:_QRadioButton_3");
        clickButton(":_classCode.Selected:_QRadioButton_3");
        waitForObject(":_classCode._items_XComboBox_3");
        clickItem(":_classCode._items_XComboBox_3", "TOYS-TRUCKS-Toy Trucks", 0, 0, 5, Qt.LeftButton);
        if(!findObject(":Update Standard Costs By Class Code.Roll Up Standard Costs_QCheckBox").checked)
            clickButton(":Update Standard Costs By Class Code.Roll Up Standard Costs_QCheckBox");
        waitForObject(":Update Standard Costs By Class Code.Select all Costs_QPushButton");
        clickButton(":Update Standard Costs By Class Code.Select all Costs_QPushButton");
        waitForObject(":Update Standard Costs By Class Code.Update_QPushButton");
        clickButton(":Update Standard Costs By Class Code.Update_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in posting standard costs by class code: "+e);
    }
    //---------------Verify Post Standard cost by Class code-------  
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing");
        activateItem(":xTuple ERP:*.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs...");
        waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit");
        type(":xTuple ERP:*.ItemLineEdit_ItemLineEdit", "YTRUCK5");
        nativeType("<Tab>");
        snooze(0.5);
        var flag = 0;
        waitForObject(tree);
        obj_tree = findObject(tree);
        count = obj_tree.topLevelItemCount;
        obj_treeTopLevelItem = obj_tree.topLevelItem(count-1);
        if(obj_treeTopLevelItem.text(2) != obj_treeTopLevelItem.text(5))
        {
            flag = 1;
        }
    
        if(flag == 1)
        {
            test.pass("Post standard costs by class code is successfull");
        }
        else
        {
            test.fail("Post standard costs by class code operation failed");
        }
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Exception in verifying actual cost of 'YTRUCK5':"+e);
    }
     //-----------------Verify GL entry for Post Standard cost by Item------
    
    verifyGL(/Set Standard Cost - (Direct Labor|Overhead|Material|Special Handling) for item YTRUCK5/i);
    
}
