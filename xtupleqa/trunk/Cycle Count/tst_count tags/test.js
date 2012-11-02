function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(6);
    
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
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Preferences...");
            }
            snooze(0.5);
            if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
           {
                if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                    clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
            }
          snooze(0.3);

        
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
  
    snooze(1);
    
    var appE = findApplicationEdition();
 
    //------------Variable declaration-----
    
    var item1 = "PITEM2",item2 = "CLASSITEM1", regQty = "100", cntslipNum = "1245";
    var itemReg = "YTRUCK1", itemMlc = "WTRUCK1",itemLot = "YPAINT1";
  
  
    ////----Set 'Allow Duplications' in the Inventory setup-----
    
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup..."));
    clickButton(waitForObject(":Count Slip # Auditing.Allow Duplications_QRadioButton"));
    clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
     //--------------- Set the window to Tab view mode -------------

  tabView();
    //---------- Creating a new Planner Code---------------
  var flag = 0;
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Setup...");
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Planner Codes");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Planner Codes", 25, 5, 0, Qt.LeftButton);
        waitForObject(":_stack.New_QPushButton");
        clickButton(":_stack.New_QPushButton");
        waitForObject(":_code_XLineEdit");
        type(":_code_XLineEdit", "New Planner1");
        nativeType("<Tab>");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "New Planner Code1");
        nativeType("<Tab>");
        snooze(1);
        if(appE!="PostBooks")
        {
            waitForObject(":_stack.Automatically Explode Planned Orders_QCheckBox");
            clickButton(":_stack.Automatically Explode Planned Orders_QCheckBox");
            nativeType("<Tab>");
            snooze(1);
            
        }
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("Planner code created successful");
        flag =1;
    }
    catch(e)
    {
        test.fail("error in creation of Planner code" + e);
        if(object.exists(":_stack.Cancel_QPushButton"))
            clickButton(waitForObject(":_stack.Cancel_QPushButton"));
        if(object.exists(":Cash Receipt.Save_QPushButton_3"))
            clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        
    }
  
//-----------copying Item---------------- 
    if(flag)
    {
        copyItem("YTRUCK1",item1);
        
        //----------Creating Item Site------------
        createRIS(item1);   
    }
    //----------Editing Item Site--------------
    flag = 0;
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":xTuple ERP:*._search_XLineEdit");
        type(":xTuple ERP:*._search_XLineEdit",item1);
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",item1, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(2);
        waitForObject(":_plannerCode_XComboBox_3");
        clickItem(":_plannerCode_XComboBox_3","NEW PLANNER1-New Planner Code1", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("editing item site is successful");
        flag = 1;
        
    }    
    catch(e)
    {
        test.fail("error in editing item site"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }
  
    //---------------- Creating Count tags by Planner code-----------
    if(flag)
    {
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Create Count Tags");
            activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Create Count Tags");
            waitForObjectItem(":xTuple ERP:*.Create Count Tags_QMenu", "by Planner Code...");
            activateItem(":xTuple ERP:*.Create Count Tags_QMenu", "by Planner Code...");
            waitForObject(":_parameter.Selected:_QRadioButton");
            clickButton(":_parameter.Selected:_QRadioButton");
            snooze(0.5);
            waitForObject(":_parameter._items_XComboBox");
            clickItem(":_parameter._items_XComboBox","NEW PLANNER1-New Planner Code1", 0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            if(!findObject(":_siteGroup.Freeze Inventory_XCheckBox").checked)
                clickButton(":_siteGroup.Freeze Inventory_XCheckBox");
            snooze(2);
            waitForObject(":Create Count Tags by Planner Code.Create Tags_QPushButton");
            clickButton(":Create Count Tags by Planner Code.Create Tags_QPushButton");
            test.log("count tags created by Planner code");
            flag = 1;
        }
        catch(e)
        {
            test.fail("error in creating count tags by Planner code"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        
        //-------------Verifying in Count tag edit list----------------  
        verifyCntTag(item1);
    }
    //--------------Posting Count Tag-----------------
    if(flag)
    {
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports");
            activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports");
            waitForObjectItem(":xTuple ERP:*.Reports_QMenu_3", "Count Tag Edit List...");
            activateItem(":xTuple ERP:*.Reports_QMenu_3", "Count Tag Edit List...");
            
            waitForObject(":Receivables Workbench.Query_QPushButton");
            clickButton(":Receivables Workbench.Query_QPushButton");
            
            waitForObject(":xTuple ERP:*.Show Count Slips_XCheckBox");
            if(!findObject(":xTuple ERP:*.Show Count Slips_XCheckBox").checked)
                clickButton(":xTuple ERP:*.Show Count Slips_XCheckBox");
            
            waitForObject(":_frame._cnttag_XTreeWidget");
            clickItem(":_frame._cnttag_XTreeWidget",item1, 0, 0, 5, Qt.LeftButton);
            waitForObject(":_frame.Enter Slip_QPushButton");
            clickButton(":_frame.Enter Slip_QPushButton");
            waitForObject(":Count Slip._number_XLineEdit");
            type(":Count Slip._number_XLineEdit", cntslipNum);
            nativeType("<Tab>");
            waitForObject(":_qty_XLineEdit_2");
            type(":_qty_XLineEdit_2",regQty);
            nativeType("<Tab>");
            waitForObject(":_comments_XTextEdit");
            type(":_comments_XTextEdit", "qty:100");
            snooze(0.5);
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":No.slipnum_QModelIndex");
            mouseClick(":No.slipnum_QModelIndex", 37, 8, 0, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            snooze(0.5);
            waitForObject(":Count Slip.Post_QPushButton");
            clickButton(":Count Slip.Post_QPushButton");
            test.log("count slip posted");
            waitForObject(":_frame._cnttag_XTreeWidget");
            clickItem(":_frame._cnttag_XTreeWidget",item1, 0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            waitForObject(":Post Count Tag.Thaw Inventory_QCheckBox");
            if(!findObject(":Post Count Tag.Thaw Inventory_QCheckBox").checked)
                clickButton(":Post Count Tag.Thaw Inventory_QCheckBox");
            waitForObject(":Post Count Tag.Post Count_QPushButton");
            clickButton(":Post Count Tag.Post Count_QPushButton");
            waitForObject(":Receivables Workbench.Query_QPushButton");
            clickButton(":Receivables Workbench.Query_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            test.pass("count tag posted successfully");
            flag = 1;
        }
        catch(e)
        {
            test.fail("error in posting count tag");
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            
        }
    }
    //-----------Verifying updated QOH----------
    if(flag)
    {
        var result=queryQoh(item1,"WH1",appE);
        test.log(result);
        if(result == parseInt(regQty))
            test.pass(" "+item1+" QOH updated sucessfully:");
        else
            test.fail("failed to update QOH: "+item1+" ");
        
  }
    //-----------------Creating Count Tags by Class Code Process------------- 
    //-------- Creating a new Class Code-------
    flag=0;
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
        snooze(0.5);
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Class Codes");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Class Codes", 32, 5, 0, Qt.LeftButton);
        waitForObject(":_stack.New_QPushButton");
        clickButton(":_stack.New_QPushButton");
        waitForObject(":_classCode_XLineEdit");
        type(":_classCode_XLineEdit", "NEW CLASS");
        snooze(1);
        nativeType("<Tab>");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "class New");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("class code is created successfully");
        flag = 1;
    }
    catch(e)
    {
        test.fail("failed to create a new class code"+ e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }

//-----------copying Item----------------
    if(flag)
    {
      
        copyItem("YTRUCK1",item2);
        
        //---------------Editing the created item-------------
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
            activateItem(":xTuple ERP: *_QMenuBar", "Products");
            waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
            activateItem(":xTuple ERP:*.Products_QMenu", "Item");
            waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
            activateItem(":xTuple ERP:*.Item_QMenu", "List...");
            waitForObject(":xTuple ERP:*._search_XLineEdit");
            type(":xTuple ERP:*._search_XLineEdit",item2);
            waitForObject(":Quotes.Query_QToolButton");
            clickButton(":Quotes.Query_QToolButton");
            waitForObject(":_list_XTreeWidget_3");
            openItemContextMenu(":_list_XTreeWidget_3",item2, 5, 5, Qt.LeftButton);
            waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
            activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
            snooze(0.5);
            waitForObject(":_itemGroup._classcode_XComboBox");
            clickItem(":_itemGroup._classcode_XComboBox","NEW CLASS-class New", 0, 0, 5, Qt.LeftButton);
            snooze(0.5);
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
            test.log("CLASSITEM1 is assigned to classcode");
            flag = 1;
        }
        catch(e)
        {
            test.fail("Error in editing item" +e);
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
            
        }
        //----------Creating Item Site------------
        createRIS(item2);
    }
  //------ To avoid unexpected blocks ----
  if(OS.name != "Windows")
  {
      
      doNothing();
  }
  //----------Creating count tags by class code--------------
    if(flag)
    {
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Create Count Tags");
            activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Create Count Tags");
            waitForObjectItem(":xTuple ERP:*.Create Count Tags_QMenu", "by Class Code...");
            activateItem(":xTuple ERP:*.Create Count Tags_QMenu", "by Class Code...");
            waitForObject(":_parameter.Selected:_QRadioButton_2");
            clickButton(":_parameter.Selected:_QRadioButton_2");
            snooze(0.5);
            waitForObject(":_parameter._items_XComboBox_2");
            clickItem(":_parameter._items_XComboBox_2","NEW CLASS-class New", 0, 0, 5, Qt.LeftButton);			
            if(!findObject(":_siteGroup.Freeze Inventory_XCheckBox_2").checked)
                clickButton(":_siteGroup.Freeze Inventory_XCheckBox_2");
            snooze(2);
            waitForObject(":Create Count Tags by Class Code.Create Tags_QPushButton");
            clickButton(":Create Count Tags by Class Code.Create Tags_QPushButton");
            test.log("Count tags creation by class code successful");
            flag = 1;
        }
        catch(e)
        {
            test.fail("Error in Count tags creation by classcode");
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        
      //-----------Verifying Count tag---------------
        
        verifyCntTag(item2);
    }
  //----------Entering Count Slip-------------
    if(flag)
    {
        try{
            flag = 0;
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip...");
            activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip...");
            waitForObject(":..._QPushButton");
            clickButton(":..._QPushButton");
            snooze(2);
            waitForObject(":_frame._cnttag_XTreeWidget");
            clickItem(":_frame._cnttag_XTreeWidget",item2, 0, 0, 5, Qt.LeftButton);
            waitForObject(":Count Tag List.Select_QPushButton");
            clickButton(":Count Tag List.Select_QPushButton");
            waitForObject(":Count Slip._number_XLineEdit");
            type(":Count Slip._number_XLineEdit", cntslipNum);
            nativeType("<Tab>");
            waitForObject(":_qty_XLineEdit_2");
            type(":_qty_XLineEdit_2", regQty);
            nativeType("<Tab>");
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            test.log("Entering count slip for the Count Tag successful");
        }
        catch(e)
        {
            test.fail("failed to enter slip for the created count tag"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        //----------Posting Count Slips---------------
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Slips...");
            activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Slips...");
            if(appE!="PostBooks")
            {
                waitForObject(":_warehouse.Selected:_QRadioButton_2");
                clickButton(":_warehouse.Selected:_QRadioButton_2");
                waitForObject(":_warehouse._warehouses_WComboBox_2");
                clickItem(":_warehouse._warehouses_WComboBox_2","WH1", 0, 0, 5, Qt.LeftButton);
            }
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            test.log("Count Slips posted successful");
        }
        catch(e)
        {
            test.fail("Error in posting Count Slips"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        //---- To avoid unexpected blocks ------
        if(OS.name != "Windows")
        {
            doNothing();
        }
        //---------------------Posting Count Tag------------------
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Tags...");
            activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Tags...");
            snooze(1);
            waitForObject(":Item Sites by.Class Code_QRadioButton");
            clickButton(":Item Sites by.Class Code_QRadioButton");
            waitForObject(":_parameter.Selected:_QRadioButton_3");
            clickButton(":_parameter.Selected:_QRadioButton_3");
            snooze(0.5);
            waitForObject(":_parameter._items_XComboBox_3");
            clickItem(":_parameter._items_XComboBox_3","NEW CLASS-class New", 0, 0, 5, Qt.LeftButton);			snooze(0.5);
            if(!findObject(":Post Count Tags.Thaw Frozen Inventory_QCheckBox").checked)
                clickItem(":Post Count Tags.Thaw Frozen Inventory_QCheckBox");
            snooze(0.5);
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            test.pass("count tags posted successfully");
            flag = 1;
        }
        catch(e)
        {
            test.fail("error in posting count tags"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
      }
    }
  //-----------Verifying updated QOH----------
    if(flag)
    {
        var result = queryQoh(item2,"WH1",appE);
        test.log(result);
        if(result == parseInt(regQty))
            test.pass(" "+item2+" QOH updated sucessfully:");
        else
            test.fail("failed to update QOH: "+item2+" ");
        
    }
    //-----------Creating Count tags by Item---------
    flag = 0;
    createCTItem(itemReg,"WH1",appE);
  //-----------Verifying in Count tag edit list-----
    
    verifyCntTag(itemReg);
    //---- To avoid unexpected blocks ------
        if(OS.name != "Windows")
        {
            doNothing();
        }
    //---------Processing count tag-------------------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_3", "Count Tag Edit List...");
        activateItem(":xTuple ERP:*.Reports_QMenu_3", "Count Tag Edit List...");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        //---Entering a Count Slip for Count Tag---
        waitForObject(":_frame._cnttag_XTreeWidget");
        clickItem(":_frame._cnttag_XTreeWidget",itemReg, 0, 0, 5, Qt.LeftButton);
        waitForObject(":_frame.Enter Slip_QPushButton");
        clickButton(":_frame.Enter Slip_QPushButton");
        snooze(1);
        waitForObject(":Count Slip._number_XLineEdit");
        type(":Count Slip._number_XLineEdit", cntslipNum);
        nativeType("<Tab>");
        slipnum = findObject(":Count Slip._number_XLineEdit").text;
        
        waitForObject(":_qty_XLineEdit_2");
        type(":_qty_XLineEdit_2", regQty);
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        //--Verifying in Count Slip Edit List---
        waitForObject(":_frame._cnttag_XTreeWidget");
        openItemContextMenu(":_frame._cnttag_XTreeWidget",itemReg, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Count Slip Edit List...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Count Slip Edit List...");
        snooze(1);
        waitForObject(":frame._cntslip_XTreeWidget");
        if(object.exists("{column='1' container=':frame._cntslip_XTreeWidget' text='"+slipnum+"' type='QModelIndex'}"))
        {
            test.pass("count slip is present in count slip edit list");
        }
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        
        //-----Posting Count Slip-----
        waitForObject(":_frame._cnttag_XTreeWidget");
        clickItem(":_frame._cnttag_XTreeWidget", "Yes.1245", 0, 0, 5, Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Count Slip.Post_QPushButton");
        clickButton(":Count Slip.Post_QPushButton");
        
        //----posting Count Tag--------
        waitForObject(":_cnttag.YTRUCK1_QModelIndex");
        mouseClick(":_cnttag.YTRUCK1_QModelIndex", 24, 6, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        snooze(0.5);
        waitForObject(":Post Count Tag.Post Count_QPushButton");
        clickButton(":Post Count Tag.Post Count_QPushButton");
        snooze(0.5);
        if(!object.exists("{column='3' container=':_frame._cnttag_XTreeWidget' text='"+itemReg+"' type='QModelIndex'}"))
            test.pass("count tag posted successful");
        else 
            test.fail("error in posting count tag");
        snooze(2);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Count Tag process successful");
        flag = 1;
    }  
    catch(e)
    {
        test.fail("error in process of Count Tag");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }
    //-----------Verifying updated QOH----------
    if(flag)
    {
        var result=queryQoh(itemReg,"WH1",appE);
        if(result == parseInt(regQty))
            test.pass(" "+itemReg+" QOH updated sucessfully:");
        else
            test.fail("failed to update QOH: "+itemReg+" ");
        
    }
    
    //-----------Creating Count Tag for MLC type Item------------
    flag = 0;
    createCTItem(itemMlc,"WH1",appE);
  //-----------Verifying in Count tag edit list-----
    
    verifyCntTag(itemMlc);
//    
    //---------Processing MLC item Count Tag-------------------
    //-------Entering Count Slip------  
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
        clickButton(waitForObject(":..._QPushButton"));
        snooze(2);
        waitForObject(":_frame._cnttag_XTreeWidget");
        clickItem(":_frame._cnttag_XTreeWidget",itemMlc, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Count Tag List.Select_QPushButton"));
        nativeType("<Tab>");
        type(waitForObject(":Count Slip._number_XLineEdit"),cntslipNum);
        nativeType("<Tab>");
        type(waitForObject(":_qty_XLineEdit_2"),regQty);
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in entering Count Slip of a MLC type item" + e);
    }
    //------------ Verifying in Count Slip edit list---------
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Reports_QMenu_3", "Count Slip Edit List..."));
        clickButton(waitForObject(":..._QPushButton_2"));
        snooze(2);
        waitForObject(":_frame._cnttag_XTreeWidget");
        clickItem(":_frame._cnttag_XTreeWidget", itemMlc, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Count Tag List.Select_QPushButton"));
        
        waitForObject(":frame._cntslip_XTreeWidget");
        slipWidget = findObject(":frame._cntslip_XTreeWidget");        
        row = slipWidget.topLevelItem(0);
        snooze(1);
        if(row.text(1) == cntslipNum)
            test.pass("Count slip existed in count-slip edit list");       
        else 
            test.fail("Count slip not existed in count-slip edit list");
        
        cntslipNum++;
        
        //---Creating Count Slips from Count Slip edit list---------
        //------------Creating new Count Slips---------
        for(i=0;i<3;i++)
        {
            
            clickButton(waitForObject(":frame.New_QPushButton_5"));
            type(waitForObject(":Count Slip._number_XLineEdit"),cntslipNum);
            nativeType("<Tab>");
            type(waitForObject(":_qty_XLineEdit_2"), "50");
            nativeType("<Tab>");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            cntslipNum++;
            
        }
        
        //------------Editing Count Slip---------
        waitForObject(":frame._cntslip_XTreeWidget");
        clickItem(":frame._cntslip_XTreeWidget",--cntslipNum, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":frame.Edit_QPushButton"));
        waitForObject(":_qty_XLineEdit_2");
        findObject(":_qty_XLineEdit_2").clear();
        type(waitForObject(":_qty_XLineEdit_2"), "100");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        
        //------------Deleting Count Slip---------
        waitForObject(":frame._cntslip_XTreeWidget");
        clickItem(":frame._cntslip_XTreeWidget", --cntslipNum, 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":frame.Delete_QPushButton_3"));
        clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        
        --cntslipNum;
        // -------Posting Count slips
        waitForObject(":frame._cntslip_XTreeWidget");
        clickItem(":frame._cntslip_XTreeWidget",cntslipNum, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        // -------Posting all Count slips 
        clickButton(waitForObject(":frame.Post All_QPushButton"));
        waitForObject(":frame._cntslip_XTreeWidget");
        clickItem(":frame._cntslip_XTreeWidget", "Yes_1", 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        flag =1;
    }
    catch(e)
    {
        test.fail("Error in Performing operations in Count Slip Edit list");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    
    //--------------Posting Count Tag from Count Tag edit list---------
    if(flag)
    {
        try{
            flag =0;
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Reports_QMenu_3", "Count Tag Edit List..."));
            clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
            
            if(!findObject(":xTuple ERP:*.Show Count Slips_XCheckBox").checked)
                clickButton(":xTuple ERP:*.Show Count Slips_XCheckBox");
            
            waitForObject(":_frame._cnttag_XTreeWidget");
            tagWidget = findObject(":_frame._cnttag_XTreeWidget");
            count = tagWidget.topLevelItemCount;
            row = tagWidget.topLevelItem(0);
            var mlcCnt = row.text(9);
            test.log(mlcCnt);
            waitForObject(":_frame._cnttag_XTreeWidget");
            clickItem(":_frame._cnttag_XTreeWidget", itemMlc, 0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
            if(!findObject(":Post Count Tag.Thaw Inventory_QCheckBox").checked)
                clickButton(":Post Count Tag.Thaw Inventory_QCheckBox");
            clickButton(waitForObject(":Post Count Tag.Post Count_QPushButton"));
            if(!object.exists("{column='3' container=':_frame._cnttag_XTreeWidget' text='"+itemMlc+"' type='QModelIndex'}"))
                test.pass("count tag posted successfully");
            else 
                test.fail("error in posting count tag");
            
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            flag = 1;
        }
        catch(e)
        {
            test.fail("Error in posting Count tag for Mlc type Item" +e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            
        }
    } 
    //-----------Verifying updated QOH----------
    if(flag)
    {
        var result = queryQoh(itemMlc,"WH1",appE);
        test.log(result);
        if(result == parseInt(mlcCnt))
            test.pass(" "+itemMlc+" QOH updated sucessfully:");
        else
            test.fail("failed to update QOH: "+itemMlc+" ");   
    }
    
    //-----------Creating Count Tag for LOT type Item------------
    flag = 0;
    createCTItem(itemLot,"WH1",appE);
  
  //-----------Verifying in Count tag edit list-----
  
    verifyCntTag(itemLot);
    if(appE!= "Postbooks")
    {
    //---------Processing LOT item Count Tag-------------------
    //  //-------Entering Count Slip------  
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
        clickButton(waitForObject(":..._QPushButton"));
        snooze(2);
        waitForObject(":_frame._cnttag_XTreeWidget");
        clickItem(":_frame._cnttag_XTreeWidget",itemLot, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Count Tag List.Select_QPushButton"));
        
        type(waitForObject(":Count Slip._number_XLineEdit"),cntslipNum);
        nativeType("<Tab>");
        type(waitForObject(":_qty_XLineEdit_2"),regQty);
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        flag =1;
    }
    catch(e)
    {
        test.fail("Error in entering Count Slip of a LOT type item" + e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    if(flag)
    {
        try{
            //------------Posting Count slips---------    
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Slips..."));
              snooze(2);
            if(appE!="PostBooks")
            {
                clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_2"));
                waitForObject(":_warehouse._warehouses_WComboBox_2");
                clickItem(":_warehouse._warehouses_WComboBox_2","WH1", 0, 0, 5, Qt.LeftButton);
            }
          
            clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
            //----- To avoid unexpected blocks -------
            if(OS.name != "Windows")
            {
                doNothing();
            }
            //----------Posting Count tag----------
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Tags..."));
            snooze(1);
            if(!findObject(":Post Count Tags.Thaw Frozen Inventory_QCheckBox").checked)
                clickButton(":Post Count Tags.Thaw Frozen Inventory_QCheckBox");
            snooze(2);
            clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
        }
        catch(e)
        {
            test.fail("error in posting count tags " +e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
    }
    //----------Verifying in Count tag edit list after posting count tag--------
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Count Tag Edit List..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
        snooze(1);
        waitForObject(":_frame._cnttag_XTreeWidget");
        var taglist = findObject(":_frame._cnttag_XTreeWidget");
        var count = taglist.topLevelItemCount;
        if(count>0)
            test.fail("Some unposted count tags exist");
        else
            test.pass("All count tags are posted successfully");
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("error in posting count tags " +e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    
    //-----------Verifying updated QOH----------
    if(flag)
    {
        var result = queryQoh(itemLot,"WH1",appE);
        test.log(result);
        if(result == parseInt(regQty))
            test.pass(" "+itemLot+" QOH updated sucessfully:");
        else
            test.fail("failed to update QOH: "+itemLot+" "); 
    }
}
    if(appE!="PostBooks")
    {
        //-----------Creating Count Tag for Serial type Item------------
        var itemSer = "STRUCK1",serNo = "111", serQty = "3";
        flag = 0;
        createCTItem(itemSer,"WH1",appE);
      //-----------Verifying in Count tag edit list-----
      
        verifyCntTag(itemSer);
        test.log("verified in count tag list successfully");    
        
        
        //---------Processing Serial Item Count Tag-------------------
        //  //-------Entering Count Slips------  
        
        for(i=0;i<serQty;i++)
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
            clickButton(waitForObject(":..._QPushButton"));
            snooze(2);
            waitForObject(":_frame._cnttag_XTreeWidget");
            clickItem(":_frame._cnttag_XTreeWidget",itemSer, 0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":Count Tag List.Select_QPushButton"));
            
            type(waitForObject(":Count Slip._number_XLineEdit"),cntslipNum);
            nativeType("<Tab>");
            type(waitForObject(":Count Slip._lotSerial_XLineEdit"), serNo);
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            serNo++;
            test.log(serNo);
            
        }
        
        try{
            //------------Posting Count slips---------    
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Slips..."));
            snooze(2);
            if(appE!="PostBooks")
            {
                clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_2"));
                waitForObject(":_warehouse._warehouses_WComboBox_2");
                clickItem(":_warehouse._warehouses_WComboBox_2","WH1", 0, 0, 5, Qt.LeftButton);
            }
            snooze(2);
            clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
            
            //----------Posting Count tag----------
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Tags..."));
            snooze(2);            
            if(!findObject(":Post Count Tags.Thaw Frozen Inventory_QCheckBox").checked)
                clickButton(":Post Count Tags.Thaw Frozen Inventory_QCheckBox");
            snooze(2);
            clickButton(waitForObject(":List Unposted Invoices.Post_QPushButton"));
            flag = 1;
        }
        catch(e)
        {
            test.fail("error in posting count tags " +e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            
        }
        //----------Verifying in Count tag edit list--------
        try{
            
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Count Tag Edit List..."));
            clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
            snooze(0.5);
            waitForObject(":_frame._cnttag_XTreeWidget");
            var taglist = findObject(":_frame._cnttag_XTreeWidget");
            var count = taglist.topLevelItemCount;
            if(count>0)
                test.fail("Some unposted count tags exist");
            else
                test.pass("All count tags are posted successfully");
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
        catch(e)
        {
            test.fail("error in posting count tags " +e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
        
        //-----------Verifying updated QOH----------
        if(flag)
        {
            var result = queryQoh(itemSer,"WH1",appE);
            test.log(result);
            if(result == parseInt(serQty))
                test.pass(" "+itemSer+" QOH updated sucessfully:");
            else
                test.fail("failed to update QOH: "+itemSer+" ");   
        }
    }
    
    //-----------Creating Count tags by Item for performing exceptional flows---------
    
    createCTItem(itemReg,"WH1",appE);
  //-----------Verifying in Count tag edit list-----
  
    verifyCntTag(itemReg);
    
    //---------Performing some exceptional flows in count tag edit list-------------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu_3", "Count Tag Edit List...");
        activateItem(":xTuple ERP:*.Reports_QMenu_3", "Count Tag Edit List...");
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        
        //---Entering a Count Slip for Count Tag---
        waitForObject(":_frame._cnttag_XTreeWidget");
        openItemContextMenu(waitForObject(":_frame._cnttag_XTreeWidget"), itemReg, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Enter Count Slip..."));
        type(waitForObject(":Count Slip._number_XLineEdit"), cntslipNum);
        nativeType("<Tab>");
        type(waitForObject(":_qty_XLineEdit_2"),regQty);
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        //----Deleting count slip-----
        waitForObject(":_frame._cnttag_XTreeWidget");
        clickItem(":_frame._cnttag_XTreeWidget", "Yes.Unposted", 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_frame.Delete_QPushButton"));
        //----Deleting count tag-----
        waitForObject(":_frame._cnttag_XTreeWidget");
        clickItem(":_frame._cnttag_XTreeWidget", itemReg,  0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_frame.Delete_QPushButton"));
        if(object.exists(":Sales Order.Yes_QPushButton"))
        {
            clickButton(waitForObject(":Sales Order.Yes_QPushButton"));
        }
        waitForObject(":Receivables Workbench.Query_QPushButton");
        clickButton(":Receivables Workbench.Query_QPushButton");
        snooze(1);
        waitForObject(":_frame._cnttag_XTreeWidget");
        var taglist = findObject(":_frame._cnttag_XTreeWidget");
        var count = taglist.topLevelItemCount;
        if(count>0)
            test.fail("Some unposted count tags exist");
        else
            test.pass("All count tags are posted successfully");
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("error in performing some exceptional flows" +e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    
    //---------Verifying in count tags by Item-------------------
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Count Tags"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Count Tags_QMenu", "by Item..."));
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), itemMlc);
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        itemWidget = findObject(":_list_XTreeWidget_3");
        var obj = itemWidget.topLevelItemCount;
        
        for(var i=0;i<obj;i++)
        {
            var obj_TreeTopLevelItem = itemWidget.topLevelItem(i);
            var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
            
            if(sNameOfRootItem == itemMlc)
                test.pass("Count tags by Item consists the entry for the item "+ itemMlc +"");
            else
                test.fail("Count tags by Item doesn't consists the entry for the item "+ itemMlc +"")   
                    }
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
            }
    catch(e)
    {
        test.fail("Error in verifying Count tags by Item" +e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    //---------Verifying in count tags by Site-------------------
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Count Tags"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Count Tags_QMenu", "by Site..."));
        if(appE!="PostBooks")
        {
            clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_4"));
            waitForObject(":_warehouse._warehouses_WComboBox_3");
            clickItem(":_warehouse._warehouses_WComboBox_3", "WH1", 0,0, 5, Qt.LeftButton);
        }
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_dateGroup.XDateEdit_XDateEdit_3"), "0");
        nativeType("<Tab>");
        if(!findObject(":_optionsGroup.Show Unposted Count Tags_XCheckBox").checked)
            clickButton(waitForObject(":_optionsGroup.Show Unposted Count Tags_XCheckBox"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        siteWidget = findObject(":_list_XTreeWidget_3");
        var obj = siteWidget.topLevelItemCount;
        for(var i=0;i<obj;i++)
        {
            var obj_TreeTopLevelItem = siteWidget.topLevelItem(i);
            var sNameOfRootItem = obj_TreeTopLevelItem.text(1);
            //        test.log(sNameOfRootItem);
            if(sNameOfRootItem == "WH1")
                test.pass("Count tags by Site consists the entry for the selected site WH1");
            else
                test.fail("Count tags by Site doesn't consists the entry for the selected site WH1")   
                        
                    }
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
                
            }
    catch(e)
    {
        test.fail("Error in verifying Count tags by Site" +e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
  
  //---------Verifying in count tags by Class Code-------------------
  
  var classcode = "NEW CLASS-class New";
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Count Tags"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Count Tags_QMenu", "by Class Code..."));
        snooze(0.5);
        clickButton(waitForObject(":_parameter.Selected:_QRadioButton_4"));
        snooze(0.5);
        waitForObject(":_parameter._items_XComboBox_4");
        clickItem(":_parameter._items_XComboBox_4",classcode, 0, 0, 5, Qt.LeftButton);
        if(appE!="PostBooks")
        {
            clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_4"));
            waitForObject(":_warehouse._warehouses_WComboBox_3");
            clickItem(":_warehouse._warehouses_WComboBox_3","WH1", 0, 0, 5, Qt.LeftButton);
        }
        waitForObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(":_filterGroup.XDateEdit_XDateEdit","0");
        nativeType("<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_3").clear();
        type(":_dateGroup.XDateEdit_XDateEdit_3","0");
        nativeType("<Tab>");
        
        if(!findObject(":_optionsGroup.Show Unposted Count Tags_XCheckBox").checked)
            clickButton(waitForObject(":_optionsGroup.Show Unposted Count Tags_XCheckBox"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        
        classWidget = findObject(":_list_XTreeWidget_3");
        var obj = classWidget.topLevelItemCount;
        for(var i=0;i<obj;i++)
        {
            var obj_TreeTopLevelItem = classWidget.topLevelItem(i);
            var sNameOfRootItem = obj_TreeTopLevelItem.text(2);
            //        test.log(sNameOfRootItem);
            if(sNameOfRootItem == item2)
                test.pass("Count tags by Item consists the entry for the selected class code "+ classcode +"");
            else
                test.fail("Count tags by Item doesn't consists the entry for the  selected class code "+ classcode +"")     	  }
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
            }
    catch(e)
    {
        test.fail("Error in verifying Count tags by class code" +e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }             
    
    
    //-------------Entering Misc. Count for an Item---------
    try{
        flag = 0;
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Misc. Inventory Count..."));
        type(waitForObject(":Enter Miscellaneous Count.ItemLineEdit_ItemLineEdit"), itemReg);
        nativeType("<Tab>");
        snooze(1);
        if(appE!="PostBooks")
        {
            waitForObject(":Enter Miscellaneous Count._warehouse_WComboBox");
            clickItem(":Enter Miscellaneous Count._warehouse_WComboBox", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        type(waitForObject(":_qty_XLineEdit_2"), regQty);
        nativeType("<Tab>");
        snooze(0.1);
        clickButton(waitForObject(":Enter Miscellaneous Count.Post Count_QPushButton"));
        snooze(1);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        test.log("Misc. Inventory Count posted for an item"+itemReg+"");
        snooze(0.5);
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        flag = 1;
        
    }
    catch(e)
    {
        test.fail("error in posting Misc. Count for an Item" +e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    //-----------Verifying updated QOH----------
    if(flag)
    {
        var result=queryQoh(itemReg,"WH1",appE);
        if(result == regQty)
            test.pass(" "+itemReg+" QOH updated sucessfully after posting Misc. Count");
        else
            test.fail("failed to update QOH after posting Misc. Count "+itemReg+" ");              
    }
    //-----------------Frozen Item Sites------------------
    
    //-------------Thawing Frozen Item Sites---------
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Thaw Item Sites..."));
        snooze(1);
        clickButton(waitForObject(":_classCode.All Class Codes_QRadioButton"));
        if(appE!="PostBooks")
        {
            waitForObject(":Thaw Item Sites by Class Code/Site._warehouse_WComboBox");
            clickItem(":Thaw Item Sites by Class Code/Site._warehouse_WComboBox", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        snooze(2);
        clickButton(waitForObject(":Thaw Item Sites by Class Code/Site.Thaw_QPushButton"));
        // --------Verifying in frozen Item Sites-----          
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Frozen Item Sites..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        frozeWidget = findObject(":_list_XTreeWidget_3");
        var count = frozeWidget.topLevelItemCount;
        if(count>0)
            test.fail("Error in Thawing Item Sites: Frozen Item Sites are existed");
        else
            test.pass("Thawing Item Sites successful");
        snooze(1);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in Thawing Item Sites: Frozen Item Sites are existed"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    //-------------Viewing in Frozen Item Sites---------
    createCTItem(itemMlc,"WH1",appE);
    
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Frozen Item Sites..."));
        snooze(1);
        frozeWidget = findObject(":_list_XTreeWidget_3");
        snooze(1);
        var count = frozeWidget.topLevelItemCount;
        test.log(count);
        openItemContextMenu(waitForObject(":_list_XTreeWidget_3"),itemMlc, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Thaw"));
        snooze(1);
        frozeWidget = findObject(":_list_XTreeWidget_3");
        var count1 = frozeWidget.topLevelItemCount;
        test.log(count1);
        
        if(count1 == count - 1)
            test.pass("Thawing a Item site is successful");
        else
            test.fail("failed to Thaw a Item Site");
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("error in Thawing a Item site" +e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    //----------Viewing Count slips by site------
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Count Slips..."));
        if(appE!="PostBooks")
        {
            waitForObject(":_warehouse.Selected:_QRadioButton_4");
            waitForObject(":_warehouse._warehouses_WComboBox_4");
            clickItem(":_warehouse._warehouses_WComboBox_4", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_dateGroup.XDateEdit_XDateEdit_4"), "0");
        nativeType("<Tab>");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        slipWidget = findObject(":_list_XTreeWidget_3");
        var obj = slipWidget.topLevelItem(0);
        if(obj.text(2) == "WH1")
            test.pass("Count slips by Site verified sucessfully");
        else
            test.fail("Error in verifying Count slips by Site");    	 
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("error in viewing count slips by site" +e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    //------------Inventory Setup---------
    test.log(cntslipNum);
    //-----------Creating Count tags by Item---------
    createCTItem(itemReg,"WH1",appE);
  //-----------Verifying in Count tag edit list-----
    
    verifyCntTag(itemReg);
    
    //---Create slip----
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
        clickButton(waitForObject(":..._QPushButton"));
        snooze(2);
        waitForObjectItem(":_frame._cnttag_XTreeWidget", itemReg);
        doubleClickItem(":_frame._cnttag_XTreeWidget", itemReg, 31, 7, 0, Qt.LeftButton);
        mouseClick(waitForObject(":Count Slip._number_XLineEdit"), 47, 11, 0, Qt.LeftButton);
        type(waitForObject(":Count Slip._number_XLineEdit"), cntslipNum);
        nativeType("<Tab>");
        type(waitForObject(":_qty_XLineEdit_2"), regQty);
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("error in creating count slip" +e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    
    ////----Set 'No Slip # duplications' in the inventory setup-----
    
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup..."));
    clickButton(waitForObject(":Count Slip # Auditing.No Slip # Duplications_QRadioButton"));
    clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
    
    // //-----Create Slip with same slip#---
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
        clickButton(waitForObject(":..._QPushButton"));
        snooze(2);
        waitForObjectItem(":_frame._cnttag_XTreeWidget", itemReg);
        doubleClickItem(":_frame._cnttag_XTreeWidget", itemReg, 34, 4, 0, Qt.LeftButton);
        mouseClick(waitForObject(":Count Slip._number_XLineEdit"), 19, 8, 0, Qt.LeftButton);
        type(waitForObject(":Count Slip._number_XLineEdit"), cntslipNum);
        nativeType("<Tab>");
        type(waitForObject(":_qty_XLineEdit_2"), regQty);
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        snooze(1);
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            test.pass("Unable to enter Count slip with Same Number");
        }
        else
            test.fail("Count slip created with same number");
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    catch(e)
    {
        test.fail("error in creating count slip"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    if(appE!="PostBooks")
    {
        
        //-----------Creating Count tags by Item for site 'WH2'---------
        createCTItem(itemReg,"WH2",appE);
        
        ////----Set 'No Slip # duplications within a Site' in the inventory setup-----
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup..."));
        clickButton(waitForObject(":Count Slip # Auditing.No Slip # Duplications within a Site_QRadioButton"));
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        
        // //-----Create Slip with same slip# in same site---
        try{
            
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
            clickButton(waitForObject(":..._QPushButton"));
            snooze(2);
            clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_4"));
            waitForObject(":_warehouse._warehouses_WComboBox_5");
            clickItem(":_warehouse._warehouses_WComboBox_5", "WH1", 0, 0, 5, Qt.LeftButton);
            waitForObjectItem(":_frame._cnttag_XTreeWidget", itemReg);
            doubleClickItem(":_frame._cnttag_XTreeWidget", itemReg, 34, 4, 0, Qt.LeftButton);
            mouseClick(waitForObject(":Count Slip._number_XLineEdit"), 19, 8, 0, Qt.LeftButton);
            type(waitForObject(":Count Slip._number_XLineEdit"), cntslipNum);
            nativeType("<Tab>");
            type(waitForObject(":_qty_XLineEdit_2"),regQty);
            nativeType("<Tab>");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            snooze(1);
            if(object.exists(":Sales Order.OK_QPushButton_2"))
            {
                clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
                test.pass("Unable to enter Count slip with Same Number in same site");
            }
            else
                test.fail("Count slip created with same number");
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        catch(e)
        {
            test.fail("error in creating count slip"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            
        }
         //----- To avoid unexpected blocks -------
            if(OS.name != "Windows")
            {
                doNothing();
            }
        // ----------entering same slip in different site----
        try{
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
            clickButton(waitForObject(":..._QPushButton"));
            snooze(2);
            clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_4"));
            waitForObject(":_warehouse._warehouses_WComboBox_5");
            clickItem(":_warehouse._warehouses_WComboBox_5", "WH2", 0, 0, 5, Qt.LeftButton);
            waitForObjectItem(":_frame._cnttag_XTreeWidget", itemReg);
            doubleClickItem(":_frame._cnttag_XTreeWidget", itemReg, 34, 4, 0, Qt.LeftButton);
            mouseClick(waitForObject(":Count Slip._number_XLineEdit"), 19, 8, 0, Qt.LeftButton);
            type(waitForObject(":Count Slip._number_XLineEdit"), cntslipNum);
            nativeType("<Tab>");
            type(waitForObject(":_qty_XLineEdit_2"),regQty);
            nativeType("<Tab>");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            snooze(1);
            if(object.exists(":Sales Order.OK_QPushButton_2"))
            {
                clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
                test.fail("Unable to create Count slip with Same Number in different site");
            }
            else
                test.pass("Count slip created with same number in for a different site");
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
        catch(e)
        {
            test.fail("error in creating count slip"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            
        }
    }
    //----Set 'No Unposted Slip # duplications' in the inventory setup-----
    
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup..."));
    snooze(1);
    clickButton(waitForObject(":Count Slip # Auditing.No Unposted Slip # Duplications_QRadioButton"));	 snooze(1);
    clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
     //----- To avoid unexpected blocks -------
            if(OS.name != "Windows")
            {
                doNothing();
            }
    // //-----Create Slip with same slip# in same site---
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
        clickButton(waitForObject(":..._QPushButton"));
        snooze(2);
        if(appE!="PostBooks")
        {
            clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_4"));
            waitForObject(":_warehouse._warehouses_WComboBox_5");
            clickItem(":_warehouse._warehouses_WComboBox_5", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        waitForObjectItem(":_frame._cnttag_XTreeWidget", itemReg);
        doubleClickItem(":_frame._cnttag_XTreeWidget", itemReg, 34, 4, 0, Qt.LeftButton);
        mouseClick(waitForObject(":Count Slip._number_XLineEdit"), 19, 8, 0, Qt.LeftButton);
        type(waitForObject(":Count Slip._number_XLineEdit"), cntslipNum);
        nativeType("<Tab>");
        type(waitForObject(":_qty_XLineEdit_2"),regQty);
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            test.pass("Unable to enter Count slip with Same Number as unposted count slip");
        }
        else
            test.fail("Count slip created with same number");
        clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    catch(e)
    {
        test.fail("error in creating count slip"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    //----------Posting Count Slips---------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
        waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Slips...");
        activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Slips...");
        if(appE!="PostBooks")
            clickButton(waitForObject(":_warehouse.All Sites_QRadioButton_4"));
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        test.pass("count slips posted successful");
    }
    catch(e)
    {
        test.fail("error in posting count slips"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    // ----------entering same slip with posted count slip number----
    try{
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
        clickButton(waitForObject(":..._QPushButton"));
         snooze(2);
        if(appE!="PostBooks")
        {
            clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_4"));
            waitForObject(":_warehouse._warehouses_WComboBox_5");
            clickItem(":_warehouse._warehouses_WComboBox_5", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        waitForObjectItem(":_frame._cnttag_XTreeWidget", itemReg);
        doubleClickItem(":_frame._cnttag_XTreeWidget", itemReg, 34, 4, 0, Qt.LeftButton);
        mouseClick(waitForObject(":Count Slip._number_XLineEdit"), 19, 8, 0, Qt.LeftButton);
        type(waitForObject(":Count Slip._number_XLineEdit"), cntslipNum);
        nativeType("<Tab>");
        type(waitForObject(":_qty_XLineEdit_2"), "100");
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            test.fail("Unable to create Count slip with Same Number in different site");
        }
        
        else
            test.pass("Count slip created with posted count slip number ");
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("error in creating count slip"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
    }
    
    if(appE!="PostBooks")
    {
        
        ////----Set 'No Unposted Slip # duplications in a site' in the inventory setup-----
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Setup..."));
        snooze(2);
        clickButton(waitForObject(":Count Slip # Auditing.No Unposted Slip # Duplications in a Site_QRadioButton"));
        snooze(1);
        clickButton(waitForObject(":Cash Receipt.Save_QPushButton_3"));
        
        // //-----Create Slip with same slip# in same site---
        try{
            
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
            clickButton(waitForObject(":..._QPushButton"));
             snooze(2);
            clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_4"));
            waitForObject(":_warehouse._warehouses_WComboBox_5");
            clickItem(":_warehouse._warehouses_WComboBox_5", "WH1", 0, 0, 5, Qt.LeftButton);
            waitForObjectItem(":_frame._cnttag_XTreeWidget", itemReg);
            doubleClickItem(":_frame._cnttag_XTreeWidget", itemReg, 34, 4, 0, Qt.LeftButton);
            mouseClick(waitForObject(":Count Slip._number_XLineEdit"), 19, 8, 0, Qt.LeftButton);
            type(waitForObject(":Count Slip._number_XLineEdit"), cntslipNum);
            nativeType("<Tab>");
            type(waitForObject(":_qty_XLineEdit_2"), "100");
            nativeType("<Tab>");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            if(object.exists(":Sales Order.OK_QPushButton_2"))
            {
                clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
                test.pass("Unable to enter Count slip with Same Number as unposted count slip in same site");
            }
            else
                test.fail("Count slip created with same number");
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating count slip"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
        
        // ----------Entering same slip with posted count slip number in different site----
        try{
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip..."));
            clickButton(waitForObject(":..._QPushButton"));
             snooze(2);
            clickButton(waitForObject(":_warehouse.Selected:_QRadioButton_4"));
            waitForObject(":_warehouse._warehouses_WComboBox_5");
            clickItem(":_warehouse._warehouses_WComboBox_5", "WH2", 0, 0, 5, Qt.LeftButton);
            waitForObjectItem(":_frame._cnttag_XTreeWidget", itemReg);
            doubleClickItem(":_frame._cnttag_XTreeWidget", itemReg, 34, 4, 0, Qt.LeftButton);
            mouseClick(waitForObject(":Count Slip._number_XLineEdit"), 19, 8, 0, Qt.LeftButton);
            type(waitForObject(":Count Slip._number_XLineEdit"), cntslipNum);
            nativeType("<Tab>");
            type(waitForObject(":_qty_XLineEdit_2"), "100");
            nativeType("<Tab>");
            snooze(1);
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        snooze(1);
            if(object.exists(":Sales Order.OK_QPushButton_2"))
            {
                clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
                test.fail("Unable to create Count slip with posted count slip number in same site");
            }
            else
                test.pass("Count slip created with posted count slip number in same site ");
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
        catch(e)
        {
            test.fail("error in creating count slip"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
    }
    //-------Creating an Item-------
    var cycleItem = "CYCLETRUCK1";
    flag = 0;
  
  copyItem("YTRUCK1",cycleItem);
    
    createRIS1(cycleItem,"WH1");
    
    //----------Editing Item Site--------------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":xTuple ERP:*._search_XLineEdit");
        type(":xTuple ERP:*._search_XLineEdit",cycleItem);
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        openItemContextMenu(waitForObject(":_list_XTreeWidget_3"), cycleItem, 41, 4, 0);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        waitForObject(":Settings.qt_spinbox_lineedit_QLineEdit").clear();
        type(waitForObject(":Settings.qt_spinbox_lineedit_QLineEdit"), "30");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        waitForObject(":_list_XTreeWidget_3");
        var siteWidget = findObject(":_list_XTreeWidget_3");
        var row = siteWidget.topLevelItem(0);
        if(row.text(10) == "30")
            test.pass("Cycle count set to '30' days and verified in item site screen");
        else
            test.fail("Cycle count doesn't set to '30' days and error in verifing in item site screen");
        snooze(2);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        flag =1;
    }
    catch(e)
    {
        test.fail("Error in setting cycle count frequency in item site");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    //---------Cost setup--------
    if(flag)
    {
        try{
            flag =0;
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Costing"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Costing_QMenu", "Maintain Item Costs..."));
            type(waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit"), cycleItem)
                    nativeType("<Tab>");
            
            clickButton(waitForObject(":_stack.New_QPushButton"));
            snooze(1);
            waitForObject(":Create Item Cost._costelem_XComboBox");
            clickItem(":Create Item Cost._costelem_XComboBox", "Machine Overhead", 0, 0, 5, Qt.LeftButton);
            type(waitForObject(":Create Item Cost.XLineEdit_XLineEdit"), "10");
            nativeType("<Tab>");
            clickButton(waitForObject(":Create Item Cost.Post Cost to Standard_QCheckBox"));
            snooze(0.5);
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            snooze(0.5);
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }	
        catch(e)
        {
            test.fail("Error in creating Item Cost " +e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            
        }
        //---Creating Cycle Count Tags---
        try{
            
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
            snooze(0.5);
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Create Cycle Count Tags..."));
            clickButton(waitForObject(":Item Sites in.Class Code_QRadioButton"));
            clickButton(waitForObject(":_parameter.All Class Codes_QRadioButton"));
            if(appE!="PostBooks")
            {
                waitForObject(":_warehouse_WComboBox_5");
                clickItem(":_warehouse_WComboBox_5", "WH1", 0, 0, 5, Qt.LeftButton);
            }
            if(!findObject(":_siteGroup.Freeze Inventory_XCheckBox_3").checked)
                clickButton(waitForObject(":_siteGroup.Freeze Inventory_XCheckBox_3"));
            snooze(0.5);
            clickButton(waitForObject(":Create Cycle Count Tags.Create Tags_QPushButton"));
            flag = 1;
        }
        catch(e)
        {
            test.fail("Error in creating Cycle Count Tags" +e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //---Verifying in Count Tag edit list---
    if(flag)
    {
        try{
            snooze(0.1);
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
             snooze(0.5);
            activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
            activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Count Tag Edit List..."));
            clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
            
            var tWidget = findObject(":_frame._cnttag_XTreeWidget");
            var obj = tWidget.topLevelItemCount;
            for(var i=0;i<obj;i++)
            {
                var row = tWidget.topLevelItem(i);
                if(row.text(3) == cycleItem)
                {
                    var docNo = row.text(1);
                    test.log(docNo);
                    test.pass("count Tag is created for the item"+cycleItem+"")
                 }
            }
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
            flag = 1;
        }
        catch(e)
        {
            test.fail("error in processing count tag"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    //----------Entering Count Slip-------------
    if(flag)
    {
        try{
            flag = 0;
            snooze(1);
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            snooze(0.1);
            waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip...");
            activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Enter Count Slip...");
            waitForObject(":..._QPushButton");
            clickButton(":..._QPushButton");
            waitForObject(":_frame._cnttag_XTreeWidget");
            clickItem(":_frame._cnttag_XTreeWidget",cycleItem, 0, 0, 5, Qt.LeftButton);
            waitForObject(":Count Tag List.Select_QPushButton");
            clickButton(":Count Tag List.Select_QPushButton");
            waitForObject(":Count Slip._number_XLineEdit");
            type(":Count Slip._number_XLineEdit", ++cntslipNum);
            nativeType("<Tab>");
            waitForObject(":_qty_XLineEdit_2");
            type(":_qty_XLineEdit_2", regQty);
            nativeType("<Tab>");
            waitForObject(":Select Order for Billing.Save_QPushButton");
            clickButton(":Select Order for Billing.Save_QPushButton");
            waitForObject(":Select Order for Billing.Close_QPushButton");
            clickButton(":Select Order for Billing.Close_QPushButton");
            test.log("Entering count slip for the Count Tag successful");
        }
        catch(e)
        {
            test.fail("failed to enter slip for the created count tag"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            
        }
        //----------Posting Count Slips---------------
        try{
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            snooze(0.1);
            waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Slips...");
            activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Slips...");
            if(appE!="PostBooks")
            {
                waitForObject(":_warehouse.Selected:_QRadioButton_2");
                clickButton(":_warehouse.Selected:_QRadioButton_2");
                waitForObject(":_warehouse._warehouses_WComboBox_2");
                clickItem(":_warehouse._warehouses_WComboBox_2","WH1", 0, 0, 5, Qt.LeftButton);
            }
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            test.log("Count Slips posted successful");
            flag = 1;
        }
        catch(e)
        {
            test.fail("Error in posting Count Slips"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
    }
    
    //---------------------Posting Count Tag------------------
    if(flag)
    {
        try{
            
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
            activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
            waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            activateItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory");
            snooze(0.1);
            waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Tags...");
            activateItem(":xTuple ERP:*.Physical Inventory_QMenu", "Post Count Tags...");
            snooze(1);
            if(appE!="PostBooks")
            {
                waitForObject(":_warehouse.Selected:_QRadioButton_3");
                clickButton(":_warehouse.Selected:_QRadioButton_3");
            }
            waitForObject(":Item Sites by.Class Code_QRadioButton");
            clickButton(":Item Sites by.Class Code_QRadioButton");
            snooze(0.5);
            if(!findObject(":Post Count Tags.Thaw Frozen Inventory_QCheckBox").checked)
                clickItem(":Post Count Tags.Thaw Frozen Inventory_QCheckBox");
            
            waitForObject(":List Unposted Invoices.Post_QPushButton");
            clickButton(":List Unposted Invoices.Post_QPushButton");
            test.pass("count tags posted successfully");
            flag =1;
        }
        catch(e)
        {
            test.fail("error in posting count tags"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
        }
    }  
    //---------Verifying in count tag edit list after posting count tag----
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Physical Inventory"));
        snooze(0.5);
        activateItem(waitForObjectItem(":xTuple ERP:*.Physical Inventory_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Count Tag Edit List..."));
        clickButton(waitForObject(":Receivables Workbench.Query_QPushButton"));
         snooze(0.5);
        if(!object.exists("{column='3' container=':_frame._cnttag_XTreeWidget' text='"+cycleItem+"' type='QModelIndex'}"))
            test.pass("count tag posted successful");
        else 
            test.fail("error in posting count tag");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("error in verifying count tag edit list");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    
    //-----------Verifying updated QOH----------
    if(flag)
    {
        var result=queryQoh(cycleItem,"WH1",appE);
        test.log(result);
        if(result == "100")
            test.pass(" "+cycleItem+" QOH updated sucessfully:");
        else
            test.fail("failed to update QOH: "+cycleItem+" ");
    }
    //---------retrieving today's date----
    
    var d = new Date();
    var mm =d.getMonth()+1;
    var dd =d.getDate();
    var year=d.getYear();
    var ystring = year.toString();
    var year2 = ystring.substring(1,3);
    
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm} 
    var today = "20" + year2 + "-" + mm + "-" + dd;
    test.log(today);
    
    //-----Verifying Last Counted Date in Item Site------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":xTuple ERP:*._search_XLineEdit");
        type(":xTuple ERP:*._search_XLineEdit",cycleItem);
        nativeType("<Tab>");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        
        var siteWidget = findObject(":_list_XTreeWidget_3");
        var row = siteWidget.topLevelItem(0);
        if(row.text(11) == today)
            test.pass("Last Counted date verified successfully in item site screen");
        else
            test.fail("Last Counted date doesn't verified successfully in item site screen");
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in verifying Last counted date in otem sites" +e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }  
    //--------verifying in GL----
    if(flag)
    {
        var bool = glTransactions(/for Item CYCLETRUCK1/, docNo);
        if(bool == 1)
        {
            test.pass("Item" + cycleItem + " has a GL entry for its cycle count tag Transactions ");
        }
        else
            test.fail("No GL entry is made for its cycle count tag Transactions " + cycleItem);
        
    }
}