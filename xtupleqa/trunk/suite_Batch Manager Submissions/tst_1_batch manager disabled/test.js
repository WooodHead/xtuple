//--***--This script is developed to check the status of Batch Manager Submissions (when Batch Manager is disabled)--***--


function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    waitForObject(":Registration Key.Yes_QPushButton");
    clickButton(":Registration Key.Yes_QPushButton");
    
    var set = testData.dataset("login.tsv");
    var email;
    for(var records in set)
    {
        fromemail=testData.field(set[records],"FROM EMAIL");
        toemail=testData.field(set[records],"TO EMAIL");
        role=testData.field(set[records],"ROLE")
             if(role=="CONFIGURE") break;     
    }
    
    //-----Editing of preferences----
        try
        {
            if(OS.name == "Darwin")
            {
                activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
                activateItem(waitForObjectItem(":*.Products_QMenu", "Preferences..."));
            }
            else
            {

        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Preferences...");
        activateItem(":xTuple ERP: *.System_QMenu", "Preferences...");
    }
        waitForObject(":Interface Options.Show windows inside workspace_QRadioButton");
        if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
            clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        
        if(object.exists(":Notice.Remind me about this again._QCheckBox"))   
        {
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
            { 
                
                waitForObject(":Notice.Remind me about this again._QCheckBox");
                snooze(0.5);
                clickButton(":Notice.Remind me about this again._QCheckBox");
                waitForObject(":Notice.OK_QPushButton");
                clickButton(":Notice.OK_QPushButton");
            }
        }
        waitForObject(":_idleTimeout_QSpinBox");
        findObject(":_idleTimeout_QSpinBox").clear();
        waitForObject(":_idleTimeout_QSpinBox");
        type(":_idleTimeout_QSpinBox", "0");
        
        waitForObject(":User Preferences.Save_QPushButton_2");
        clickButton(":User Preferences.Save_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in assigning preferences" + e);
    }
    
    //-----Enable Sales Reservations-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Sales",10,10,0, Qt.LeftButton);
        
        if(!findObject(":general.Enable Sales Reservations_QCheckBox").checked)
            clickButton(":general.Enable Sales Reservations_QCheckBox");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");  
        test.log("Enabled Sales Reservations");
    }
    catch(e)
    {
        test.fail("Error in enabling sales reservations" + e);
    }
    //-----Verify Batch Manager Status-----  
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu", "Setup...");
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);  
        
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        if(object.exists(":_stack.Use toolbars on displays when available_QCheckBox"))   
        {
            if(!(findObject(":_stack.Use toolbars on displays when available_QCheckBox").checked))
            { 
                
                waitForObject(":_stack.Use toolbars on displays when available_QCheckBox");
                clickButton(":_stack.Use toolbars on displays when available_QCheckBox");
            }
        }
        if(object.exists(":Database Information.Batch Manager_QGroupBox"))   
        {
            waitForObject(":Database Information.Batch Manager_QGroupBox");
            if(findObject(":Database Information.Batch Manager_QGroupBox").checked)
                type(":Database Information.Batch Manager_QGroupBox", " ");
        }
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
        snooze(2);
    }
    catch(e)
    {
        test.fail("Error in verifying Batch Manager status" + e);
    }
    
    
    //-----Exit the Application-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
        activateItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
    }
    catch(e)
    {
        test.fail("Error in exiting the application" + e);
    }
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    waitForObject(":Registration Key.Yes_QPushButton");
    clickButton(":Registration Key.Yes_QPushButton");
    
    
    //---find Application Edition------ 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu", "Setup...");
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);  
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex",0, 0, 0, Qt.LeftButton);
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton); 
        }
        
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in identifying application edition" + e);
    }
    
    //-----Assign All Privileges-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Maintain Users...");
        activateItem(":xTuple ERP: *.System_QMenu", "Maintain Users...");
        
        waitForObject(":List Users._usr_XTreeWidget");
        doubleClickItem(":List Users._usr_XTreeWidget", "admin", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_email_XLineEdit");
        findObject(":_email_XLineEdit").clear();
        type(":_email_XLineEdit", fromemail);
        waitForObject(":_module_XComboBox");
        for(i = findObject(":_module_XComboBox").count;i>0;i--)
        {
            waitForObject(":_privTab.Add All->>_QPushButton");     
            clickButton(":_privTab.Add All->>_QPushButton");
            waitForObject(":_module_XComboBox");
            type(":_module_XComboBox", "<Down>");
        }
        waitForObject(":List Users.Save_QPushButton");
        clickButton(":List Users.Save_QPushButton");
        
        waitForObject(":List Users.Close_QPushButton");
        clickButton(":List Users.Close_QPushButton");
        test.log("Assigned all privileges to the user: Admin");
    }
    catch(e)
    {
        test.fail("Error in assigning privileges" + e);
    }
    
    
    
    
    //----verify xTuple Connect console----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    snooze(1);
    menu = waitForObject(":xTuple ERP: *.System_QMenu");
    menuItem = "xTuple Connect Console...";
    
    actions = menu.actions();
    for(i=0;i<actions.count();i++)
        if(actions.at(i).text == menuItem || i==actions.count()-1) break;
    if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+appEdition);
    else test.pass(menuItem+"not found in "+appEdition);
    
    //--------------- Set the window to Tab view mode -------------
    try
    {
    activateItem(waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products"));
    activateItem(waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Item"));
    activateItem(waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item_QMenu", "List..."));
    if(object.exists(":Tax Authorities.Close_QToolButton"))
    {
        test.log("item screen opened");
        activateItem(waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Window"));
        if(waitForObjectItem(":xTuple ERP: *.Window_QMenu", "Tab View"))
        {
        activateItem(waitForObjectItem(":xTuple ERP: *.Window_QMenu", "Tab View"));
        }
        clickButton(waitForObject(":Tax Authorities.Close_QToolButton"));
    }
    }
    catch(e)
    {
        test.fail("exception in changing to Tab view mode" + e);
    }
    
    //-----Purchase Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Forms");
        activateItem(":*.Purchase_QMenu", "Forms");  
        snooze(1);
        menu = waitForObject(":*.Forms_QMenu");
        menuItem = "Send &Electronic Purchase Order...";
        
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
        else test.pass(menuItem+"not found in "+appEdition);
        
        
        
        
        //-----Print Purchase Order-----
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":*.Purchase_QMenu", "Forms");
        activateItem(":*.Purchase_QMenu", "Forms");
        snooze(1);
        menu = waitForObject(":*.Forms_QMenu");
        menuItem = "Print Purchase &Order...";
        
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
        else test.pass(menuItem+"not found in "+appEdition);
        
        
        
        //-----Electronic Sales Order Form-----
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Forms");
        activateItem(":*.Sales_QMenu", "Forms");   
        snooze(1);
        menu = waitForObject(":*.Forms_QMenu_3");
        menuItem = "Send Electronic &Sales Order Form ...";
        
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
        else test.pass(menuItem+"not found in "+appEdition);
    }
    catch(e)
    {
        test.fail("Error in verifying electronic sales order form" + e);
    }
    
    
    
    //-----Electronic Quote-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Forms");
        activateItem(":*.Sales_QMenu", "Forms");     
        snooze(1);
        menu = waitForObject(":*.Forms_QMenu_3");
        menuItem = "Send Electronic &Quote ...";
        
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
        else test.pass(menuItem+"not found in "+appEdition);
    }
    catch(e)
    {
        test.fail("Error in verifying Electronic quote form" + e);
    }
    
    
    //-----Allocate Reservations-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Utilities");
        activateItem(":*.Sales_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu", "Allocate Reservations...");
        activateItem(":*.Utilities_QMenu", "Allocate Reservations...");
        
        if(object.exists(":Allocate Reservations.Schedule_QPushButton"))
            test.fail("Schedule Button exists in Allocate Reservations screen");
        
        else test.pass("Schedule Button does not exist in Allocate Reservations screen");
        
        waitForObject(":Allocate Reservations.Cancel_QPushButton_2");
        clickButton(":Allocate Reservations.Cancel_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in verifying Allocate Reservations screen" + e);
    }
    
    
    
    //-----Create Planned Orders by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
        activateItem(":*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":*.Scheduling_QMenu", "Run MRP");
        activateItem(":*.Scheduling_QMenu", "Run MRP");
        waitForObjectItem(":*.Run MRP_QMenu", "by Planner Code...");
        activateItem(":*.Run MRP_QMenu", "by Planner Code...");
        
        if(object.exists(":Run MRP by Planner Code.Schedule_QPushButton"))
            test.fail("Schedule Button exists in Create Planned Order by Plannercode screen");
        
        else test.pass("Schedule Button does not exist in Create Planned Order by Plannercode screen");
        
        waitForObject(":Run MRP by Planner Code.Cancel_QPushButton_2");
        clickButton(":Run MRP by Planner Code.Cancel_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in creating planned order" + e);
    }
    
    //------------Schedule Planned orders--------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule")
                activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Reports");
        activateItem(":*.Schedule_QMenu", "Reports");  
        waitForObjectItem(":*.Reports_QMenu", "Planned Orders...");
        activateItem(":*.Reports_QMenu", "Planned Orders...");
        
        if(object.exists(":Planned Orders.Schedule_QToolButton"))
            test.fail("Schedule button exists in Planned orders screen");
        else
            test.pass("Schedule button doesn't exists in Planned orders screen");
        
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton"); 
    }
    catch(e)
    {
        test.fail("Exception in scheduling planned orders report" + e);
    }
    
    
    //-----Release Planned Orders by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
        activateItem(":*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":*.Scheduling_QMenu", "Release Planned Orders...");
        activateItem(":*.Scheduling_QMenu", "Release Planned Orders...");
        
        if(object.exists(":Release Planned Orders by Planner Code.Schedule_QPushButton"))
            test.fail("Schedule Button exists in Release Planned Order by Plannercode screen");
        
        else test.pass("Schedule Button does not exist in Release Planned Order by Plannercode screen");
        
        waitForObject(":Release Planned Orders by Planner Code.Cancel_QPushButton_2");
        clickButton(":Release Planned Orders by Planner Code.Cancel_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in releasing planned order" + e);
    }
    
    
    //-----Create Buffer Status by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Constraint Management");
        activateItem(":*.Schedule_QMenu", "Constraint Management");
        waitForObjectItem(":*.Constraint Management_QMenu_2", "Update Status");
        activateItem(":*.Constraint Management_QMenu_2", "Update Status");
        waitForObjectItem(":*.Update Status_QMenu_2", "by Planner Code...");
        activateItem(":*.Update Status_QMenu_2", "by Planner Code...");
        
        if(object.exists(":Run Buffer Status by Planner Code.Schedule_QPushButton"))
            test.fail("Schedule Button exists in Create Buffer status by Plannercode screen");
        
        else test.pass("Schedule Button does not exist in Create Buffer status by Plannercode screen");
        
        waitForObject(":Run Buffer Status by Planner Code.Cancel_QPushButton");
        clickButton(":Run Buffer Status by Planner Code.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating buffer status  by planner code" + e);
    }
    
    
    //-----Create Buffer Status by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        type(":*.Schedule_QMenu","<Down>");
        type(":*.Schedule_QMenu","<Down>");    
        type(":*.Schedule_QMenu","<Down>");        
        type(":*.Schedule_QMenu","<Right>");
        type(":*.Constraint Management_QMenu_2","<Right>");
        type(":*.Update Status_QMenu_2","<Down>");
        type(":*.Update Status_QMenu_2","<Enter>");
        
        if(object.exists(":Run Buffer Status by Item.Schedule_QPushButton"))
            test.fail("Schedule Button exists in Create Buffer status by Item screen");               
        else test.pass("Schedule Button does not exists in Create Buffer status by Item screen");
        
        waitForObject(":Run Buffer Status by Item.Cancel_QPushButton");
        clickButton(":Run Buffer Status by Item.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating buffer status by item" + e);
    }
    
    
    //-----Run MPS by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
        activateItem(":*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":*.Scheduling_QMenu", "Run MPS...");
        activateItem(":*.Scheduling_QMenu", "Run MPS...");
        
        if(object.exists(":Run MPS by Planner Code.Schedule_QPushButton"))
            test.fail("Schedule Button exists in MPS screen");
        
        else test.pass("Schedule Button does not exists in MPS screen");        
        
        waitForObject(":Run MPS by Planner Code.Cancel_QPushButton_2");
        clickButton(":Run MPS by Planner Code.Cancel_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in running MPS" + e);
    }
    
    
    //-----Releasing Planned Transfer Order-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
        activateItem(":*.Schedule_QMenu", "Scheduling");
        waitForObjectItem(":*.Scheduling_QMenu", "Release Planned Orders...");
        activateItem(":*.Scheduling_QMenu", "Release Planned Orders...");
        
        if(object.exists(":Release Planned Orders by Planner Code.Schedule_QPushButton"))
            test.fail("Schedule Button exists in Release Planned Order by Plannercode screen");
        
        else test.pass("Schedule Button does not exist in Release Planned Order by Plannercode screen");
        
        waitForObject(":Release Planned Orders by Planner Code.Cancel_QPushButton_2");
        clickButton(":Release Planned Orders by Planner Code.Cancel_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in releasing planned transfer order" + e);
    }
    
    
    //-----Time Phased Demand by Plannercode-----  
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
        activateItem(":*.Schedule_QMenu", "Capacity Planning");
        waitForObjectItem(":*.Capacity Planning_QMenu_2", "Time-Phased Demand...");
        activateItem(":*.Capacity Planning_QMenu_2", "Time-Phased Demand...");
        
        if(object.exists(":Time Phased Demand by Planner Code.Schedule_QPushButton"))
            test.fail("Schedule button exits in Time Phased Demand by Planner code");
        
        else test.pass("Schedule button does not exit in Time Phased Demand by Planner code");
        
        waitForObject(":Time Phased Demand by Planner Code.Close_QPushButton_2");
        clickButton(":Time Phased Demand by Planner Code.Close_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Demand by planner code screen " + e);
    }
    
    
    //-----Time Phased Production by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
        activateItem(":*.Schedule_QMenu", "Capacity Planning");
        waitForObjectItem(":*.Capacity Planning_QMenu_2", "Time-Phased Production");
        activateItem(":*.Capacity Planning_QMenu_2", "Time-Phased Production");
        waitForObjectItem(":*.Time-Phased Production_QMenu_2", "by Planner Code...");
        activateItem(":*.Time-Phased Production_QMenu_2", "by Planner Code...");
        
        if(object.exists(":Time-Phased Production by Planner Code.Schedule_QPushButton"))
            test.fail("Schedule button exists in Time Phased Production by Planner code screen");
        
        else test.pass("Schedule button does not exist in Time Phased Production by Planner code screen");
        
        waitForObject(":Time-Phased Production by Planner Code.Close_QPushButton");
        clickButton(":Time-Phased Production by Planner Code.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Production by planner code screen " + e);
    }
    
    //-----Time Phased Production by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
        activateItem(":*.Schedule_QMenu", "Capacity Planning");
        waitForObjectItem(":*.Capacity Planning_QMenu_2", "Time-Phased Production");
        activateItem(":*.Capacity Planning_QMenu_2", "Time-Phased Production");
        waitForObjectItem(":*.Time-Phased Production_QMenu_2", "by Item...");
        activateItem(":*.Time-Phased Production_QMenu_2", "by Item...");
        
        if(object.exists(":Time-Phased Production by Item.Schedule_QPushButton"))
            test.fail("Schedule button exists in Time Phased Production by Item screen");
        
        else test.pass("Schedule button does not exist in Time Phased Production by Item screen");
        
        waitForObject(":Time-Phased Production by Item.Close_QPushButton");
        clickButton(":Time-Phased Production by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased production by Item screen " + e);
    }
    
    //-----Time Phased Availability-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
        activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
        waitForObjectItem(":*.Schedule_QMenu", "Reports");
        activateItem(":*.Schedule_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu", "Time-Phased Availability...");
        activateItem(":*.Reports_QMenu", "Time-Phased Availability...");
        
        if(object.exists(":Time-Phased Availability.Schedule_QToolButton"))
            test.fail("Schedule button exists in Time Phased availability screen");
        
        else test.pass("Schedule button does not exist in Time Phased availability screen");
        
        waitForObject(":Time-Phased Availability.Close_QToolButton");
        clickButton(":Time-Phased Availability.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Availability screen " + e);
    }
    
    //-----Time Phased Booking-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Bookings...");
        activateItem(":*.Analysis_QMenu", "Time Phased Bookings...");
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_3");
        clickItem(":Time-Phased Report._calendar_CalendarComboBox_3", "2008", 161, 4, 0, Qt.LeftButton);
        waitForObject(":Time-Phased Bookings.Query_QToolButton");
        clickButton(":Time-Phased Bookings.Query_QToolButton");
        if(object.exists(":Time-Phased Bookings.Schedule_QToolButton"))
            test.fail("Schedule button exists in Time Phased Booking screen");
        
        else test.pass("Schedule button doesnot exist in Time Phased Booking screen");
        
        waitForObject(":Time-Phased Bookings.Close_QToolButton");
        clickButton(":Time-Phased Bookings.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Booking by customer screen " + e);
    }
    
    
    
    //-----Time Phased Sales History-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Analysis");
        activateItem(":*.Sales_QMenu", "Analysis");
        waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        activateItem(":*.Analysis_QMenu", "Time Phased Sales History...");
        
        waitForObject(":Time-Phased Report._calendar_CalendarComboBox_4");
        clickItem(":Time-Phased Report._calendar_CalendarComboBox_4","2008", 84, 2, 0, Qt.LeftButton);
        
        waitForObject(":Time-Phased Sales History.Query_QToolButton");
        clickButton(":Time-Phased Sales History.Query_QToolButton"); 
        
        if(object.exists(":Time-Phased Sales History.Schedule_QToolButton"))
            test.fail("Schedule button exists in Time Phased Sales History screen");
        
        else test.pass("Schedule button does not exist in Time Phased Sales History by customer group screen");
        
        waitForObject(":Time-Phased Sales History.Close_QToolButton");
        clickButton(":Time-Phased Sales History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Sales History screen " + e);
    }
    
    //-----Time Phased Usage Statistics by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Reports");
        activateItem(":*.Inventory_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
        activateItem(":*.Reports_QMenu_2", "Time Phased Usage Statistics...");
        
        if(object.exists(":Time-Phased Item Usage Statistics by Item.Schedule_QToolButton"))
            test.fail("Schedule button exists in Time Phased Usage Statistics by Item screen");
        
        else test.pass("Schedule button does not exist in Time Phased Usage Statistics by Item screen");   
        
        waitForObject(":Time-Phased Item Usage Statistics by Item.Close_QToolButton");
        clickButton(":Time-Phased Item Usage Statistics by Item.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Usage Statistics screen " + e);
    }
    
    //-----Update Actual Costs by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Update Actual Costs");
        activateItem(":*.Costing_QMenu", "Update Actual Costs");
        waitForObjectItem(":*.Update Actual Costs_QMenu", "by Item...");
        activateItem(":*.Update Actual Costs_QMenu", "by Item...");
        
        if(object.exists(":Update Actual Costs by Item.Schedule_QPushButton"))
            test.fail("Schedule button exists in Update Actual Costs by Item screen");
        
        else test.pass("Schedule button does not exist in Update Actual Costs by Item screen");
        
        waitForObject(":Update Actual Costs by Item.Cancel_QPushButton");
        clickButton(":Update Actual Costs by Item.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Actual Costs by Item " + e);
    }
    
    
    //-----Update Actual Costs by Classcode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Update Actual Costs");
        activateItem(":*.Costing_QMenu", "Update Actual Costs");
        waitForObjectItem(":*.Update Actual Costs_QMenu", "by Class Code...");
        activateItem(":*.Update Actual Costs_QMenu", "by Class Code...");
        
        if(object.exists(":Schedule Action to Batch Manager.Schedule_QPushButton"))
            test.fail("Schedule button exists in Update Actual Costs by Class code screen");
        
        else test.pass("Schedule button  does not exists in Update Actual Costs by Class code screen");
        
        waitForObject(":Update Actual Costs by Class Code.Cancel_QPushButton");
        clickButton(":Update Actual Costs by Class Code.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Actual Costs by class code " + e);
    }
    
    //-----Post Actual Costs by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Post Actual Costs");
        activateItem(":*.Costing_QMenu", "Post Actual Costs");
        waitForObjectItem(":*.Post Actual Costs_QMenu", "by Item...");
        activateItem(":*.Post Actual Costs_QMenu", "by Item...");
        
        if(object.exists(":Schedule Action to Batch Manager.Schedule_QPushButton"))
            test.fail("Schedule button exists in Post Actual Costs by Item screen");
        
        else test.pass("Schedule button does not exist in Post Actual Costs by Item screen");
        
        waitForObject(":Post Actual Costs by Item.Cancel_QPushButton");
        clickButton(":Post Actual Costs by Item.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Posting Actual Costs by Item " + e);
    }
    
    //-----Post Actual Costs by Classcode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Post Actual Costs");
        activateItem(":*.Costing_QMenu", "Post Actual Costs");
        waitForObjectItem(":*.Post Actual Costs_QMenu", "by Class Code...");
        activateItem(":*.Post Actual Costs_QMenu", "by Class Code...");
        
        if(object.exists(":Schedule Action to Batch Manager.Schedule_QPushButton"))
            test.fail("Schedule button exists in Post Actual Costs by Class code screen");
        
        else test.pass("Schedule button does not exist in Post Actual Costs by Class code screen");
        
        waitForObject(":Post Actual Costs by Class Code.Cancel_QPushButton");
        clickButton(":Post Actual Costs by Class Code.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Posting Actual Costs by class code " + e);
    }
    
    //-----Post Standard Costs by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Post Standard Costs");
        activateItem(":*.Costing_QMenu", "Post Standard Costs");
        waitForObjectItem(":*.Post Standard Costs_QMenu", "by Item...");
        activateItem(":*.Post Standard Costs_QMenu", "by Item...");
        
        if(object.exists(":Schedule Action to Batch Manager.Schedule_QPushButton"))
            test.fail("Schedule button exists in Post Standard Costs by Item screen");
        
        else test.pass("Schedule button does not exist in Post Standard Costs by Item screen");
        
        waitForObject(":Update Standard Costs By Item.Cancel_QPushButton");
        clickButton(":Update Standard Costs By Item.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Posting Standard Costs by Item " + e);
    }
    
    //-----Post Standard Costs by Classcode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Post Standard Costs");
        activateItem(":*.Costing_QMenu", "Post Standard Costs");
        waitForObjectItem(":*.Post Standard Costs_QMenu", "by Class Code...");
        activateItem(":*.Post Standard Costs_QMenu", "by Class Code...");
        
        if(object.exists(":Schedule Action to Batch Manager.Schedule_QPushButton"))
            test.fail("Schedule button exists in Post Standard Costs by Class code screen");
        
        else test.pass("Schedule button does not exist in Post Standard Costs by Class code screen");
        
        waitForObject(":Update Standard Costs By Class Code.Cancel_QPushButton");
        clickButton(":Update Standard Costs By Class Code.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Posting Standard Costs by class code " + e);
    }
    
    //-----Update Order Upto Level by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Utilities");
        activateItem(":*.Inventory_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
        activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
        waitForObjectItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
        activateItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
        waitForObjectItem(":*.Order Up To Levels_QMenu", "by Item...");
        activateItem(":*.Order Up To Levels_QMenu", "by Item...");
        
        if(object.exists(":Update Order Up To Level by Item.Schedule_QPushButton"))
            test.fail("Schedule button exists in Update Order Upto Level by Item screen");
        
        else test.pass("Schedule button does not exist in Update Order Upto Level by Item screen");
        
        waitForObject(":Update Order Up To Level by Item.Cancel_QPushButton");
        clickButton(":Update Order Up To Level by Item.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Order Upto Level by Item " + e);
    }
    
    
    //-----Update Order Upto Level by Plannercode----- 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Utilities");
        activateItem(":*.Inventory_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
        activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
        waitForObjectItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
        activateItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
        waitForObjectItem(":*.Order Up To Levels_QMenu", "by Planner Code...");
        activateItem(":*.Order Up To Levels_QMenu", "by Planner Code...");
        
        if(object.exists(":Update Order Up To Levels by Planner Code.Schedule_QPushButton"))
            test.fail("Schedule button exists in Update Order Upto Level by Planner code screen");
        
        else test.pass("Schedule button does not exist in Update Order Upto Level by Planner code screen");
        
        waitForObject(":Update Order Up To Levels by Planner Code.Cancel_QPushButton");
        clickButton(":Update Order Up To Levels by Planner Code.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Order Upto Level by Planner code " + e);
    }
    
    //-----Update Order Upto Level by Classcode-----    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Utilities");
        activateItem(":*.Inventory_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
        activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
        waitForObjectItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
        activateItem(":*.Update Item Controls_QMenu", "Order Up To Levels");
        waitForObjectItem(":*.Order Up To Levels_QMenu", "by Class Code...");
        activateItem(":*.Order Up To Levels_QMenu", "by Class Code...");
        
        if(object.exists(":Update Order Up To Levels by Class Code.Schedule_QPushButton"))
            test.fail("Schedule button exists in Update Order Upto Level by Class code screen");
        
        else test.pass("Schedule button does not exist in Update Order Upto Level by Class code screen");
        
        waitForObject(":Update Order Up To Levels by Class Code.Cancel_QPushButton");
        clickButton(":Update Order Up To Levels by Class Code.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Order Upto Level by Class code " + e);
    }
    
    
    //-----Update Reorder Level by Item-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Utilities");
        activateItem(":*.Inventory_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
        activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
        waitForObjectItem(":*.Update Item Controls_QMenu", "Reorder Levels");
        activateItem(":*.Update Item Controls_QMenu", "Reorder Levels");
        waitForObjectItem(":*.Reorder Levels_QMenu", "by Item...");
        activateItem(":*.Reorder Levels_QMenu", "by Item...");
        
        if(object.exists(":_criteriaTab.Schedule_QPushButton"))
            test.fail("Schedule button exists in Update ReOrder Upto Level by Item screen");
        
        else test.pass("Schedule button does not exist in Update ReOrder Upto Level by Item screen");
        
        waitForObject(":_criteriaTab.Cancel_QPushButton");
        clickButton(":_criteriaTab.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Reorder Level by Item " + e);
    }
    
    
    //-----Update Reorder Level by Plannercode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Utilities");
        activateItem(":*.Inventory_QMenu", "Utilities");
        waitForObjectItem(":*.Inventory_QMenu", "Utilities");
        activateItem(":*.Inventory_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
        activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
        waitForObjectItem(":*.Update Item Controls_QMenu", "Reorder Levels");
        activateItem(":*.Update Item Controls_QMenu", "Reorder Levels");
        waitForObjectItem(":*.Reorder Levels_QMenu", "by Planner Code...");
        activateItem(":*.Reorder Levels_QMenu", "by Planner Code...");
        
        if(object.exists(":_criteriaTab.Schedule_QPushButton_2"))
            test.fail("Schedule button exists in Update ReOrder Upto Level by Planner code screen");
        
        else test.pass("Schedule button does not exist in Update ReOrder Upto Level by Planner code screen"); 
        
        waitForObject(":_criteriaTab.Cancel_QPushButton_2");
        clickButton(":_criteriaTab.Cancel_QPushButton_2");
    }
    catch(e)
    {
        test.fail("Error in Updating Reorder Level by planner code " + e);
    }
    
    
    //-----Update Reorder Level by Classcode-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":*.Inventory_QMenu", "Utilities");
        activateItem(":*.Inventory_QMenu", "Utilities");
        waitForObjectItem(":*.Inventory_QMenu", "Utilities");
        activateItem(":*.Inventory_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_2", "Update Item Controls");
        activateItem(":*.Utilities_QMenu_2", "Update Item Controls");
        waitForObjectItem(":*.Update Item Controls_QMenu", "Reorder Levels");
        activateItem(":*.Update Item Controls_QMenu", "Reorder Levels");
        waitForObjectItem(":*.Reorder Levels_QMenu", "by Class Code...");
        activateItem(":*.Reorder Levels_QMenu", "by Class Code...");
        
        if(object.exists(":_criteriaTab.Schedule_QPushButton_3"))
            test.fail("Schedule button exists in Update ReOrder Upto Level by Class code screen");
        
        else test.pass("Schedule button does not exist in Update ReOrder Upto Level by Class code screen"); 
        
        waitForObject(":_criteriaTab.Cancel_QPushButton_3");
        clickButton(":_criteriaTab.Cancel_QPushButton_3");
    }
    catch(e)
    {
        test.fail("Error in Updating Reorder Level by Class code " + e);
    }
    
    //-----Time Phased Open AP Items------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Payable");
        activateItem(":*.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":*.Accounts Payable_QMenu", "Reports");
        activateItem(":*.Accounts Payable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_3", "Aging...");
        activateItem(":*.Reports_QMenu_3", "Aging...");
        
        if(object.exists(":Payables Aging.Schedule_QToolButton"))
            test.fail("Schedule button exists in Time Phased Open AP Items screen");
        
        else test.pass("Schedule button does not exist in Time Phased Open AP Items screen"); 
        
        waitForObject(":Payables Aging.Close_QToolButton");
        clickButton(":Payables Aging.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Open AP Items screen " + e);
    }
    
    //-----Time Phased Open AR Items------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Reports");
        activateItem(":*.Accounts Receivable_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_4", "Aging...");
        activateItem(":*.Reports_QMenu_4", "Aging...");
        
        if(object.exists(":Receivables Aging.Schedule_QToolButton"))
            test.fail("Schedule button exists in Time Phased Open AR Items screen");
        
        else test.pass("Schedule button does not exist in Time Phased Open AR Items screen"); 
        
        waitForObject(":Receivables Aging.Close_QToolButton");
        clickButton(":Receivables Aging.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Open AR Items screen " + e);
    }
    
    //-----Create Recurring Invoice-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Utilities");
        activateItem(":*.Accounting_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_3", "Create Recurring Invoices...");
        activateItem(":*.Utilities_QMenu_3", "Create Recurring Invoices...");
        
        if(object.exists(":Create Recurring Invoices.Schedule_QPushButton"))
            test.fail("Schedule button exists in Create Recurring Invoice screen");
        
        else test.pass("Schedule button does not exist in Create Recurring Invoice screen"); 
        
        waitForObject(":Create Recurring Invoices.Cancel_QPushButton");
        clickButton(":Create Recurring Invoices.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Create Recurring Invoices  screen " + e);
    }
    
    //-----Create an Invoice-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Billing");
        activateItem(":*.Sales_QMenu", "Billing");
        waitForObjectItem(":*.Billing_QMenu", "Invoice");
        activateItem(":*.Billing_QMenu", "Invoice");
        type(":*.Billing_QMenu","<Right>");
        type(":*.Billing_QMenu","<Right>");
        waitForObjectItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
        activateItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
        waitForObject(":List Unposted Invoices.New_QPushButton");
        clickButton(":List Unposted Invoices.New_QPushButton");
        
        waitForObject(":_billtoFrame.VirtualClusterLineEdit_CLineEdit");
        type(":_billtoFrame.VirtualClusterLineEdit_CLineEdit","TTOYS");
        
        waitForObject(":Bill To.XLineEdit_XLineEdit");
        mouseClick(":Bill To.XLineEdit_XLineEdit", 7, 12, 0, Qt.LeftButton);
        
        snooze(0.5);
        
        waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":lineItemsTab.New_QPushButton");
        clickButton(":lineItemsTab.New_QPushButton");
        waitForObject(":Item.VirtualClusterLineEdit_ItemLineEdit");
        mouseClick(":Item.VirtualClusterLineEdit_ItemLineEdit", 58, 12, 0, Qt.LeftButton);
        waitForObject(":Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Item.VirtualClusterLineEdit_ItemLineEdit", "BTRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_ordered_XLineEdit_2");
        type(":_ordered_XLineEdit_2", "25");
        waitForObject(":_billed_XLineEdit");
        type(":_billed_XLineEdit", "25");
        
        waitForObject(":Invoice.Save_QPushButton");
        clickButton(":Invoice.Save_QPushButton");
        waitForObject(":Invoice.Save_QPushButton_2");
        clickButton(":Invoice.Save_QPushButton_2");
        
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating invoice " + e);
    }
    
    //-----Print Invoices(Sales)-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Billing");
        activateItem(":*.Sales_QMenu", "Billing");
        waitForObjectItem(":*.Billing_QMenu", "Forms");
        activateItem(":*.Billing_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu_2", "Print Invoices...");
        activateItem(":*.Forms_QMenu_2", "Print Invoices...");
        
        waitForObject(":Print Invoices.Print_QPushButton");
        clickButton(":Print Invoices.Print_QPushButton");  
        snooze(1);
        if(OS.name=="Linux")
        {
            nativeType("<Tab>"); 
            nativeType("<Tab>");
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            snooze(1);	  
            nativeType("<Return>");
        }
        else
        {
            snooze(1);
            nativeType("<Tab>"); 
            nativeType("<Tab>");
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>");    
            snooze(1);	  
            nativeType("<Return>");
        }
        if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))
            test.fail("Schedule button exists in Priting Invoice screen");
        
        else test.pass("Schedule button does not exist in Printing Invoice screen"); 
        
        waitForObject(":Print Invoices.Cancel_QPushButton");
        clickButton(":Print Invoices.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in printing invoices " + e);
    }
    
    if(OS.name=="Linux" || OS.name=="Darwin")
    {
        //-----Exit the Application-----
        try
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
            activateItem(":xTuple ERP: *_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
            activateItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
        }
        catch(e)
        {
            test.fail("Error in exiting the application" + e);
        }
        snooze(5);
        
        if(OS.name=="Linux")
            startApplication("xtuple.bin");
        
        else
            startApplication("xtuple");
        
        snooze(2);
        
        //-----login Application-----
        loginAppl("CONFIGURE"); 
        waitForObject(":Registration Key.Yes_QPushButton");
        clickButton(":Registration Key.Yes_QPushButton");
    }
    
    //---find Application Edition------ 
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.System_QMenu", "Setup...");
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);  
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        }
        else	
        {
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex",0, 0, 0, Qt.LeftButton);
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton); 
        }
        
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in identifying application edition" + e);
    }
    
    
    //-----Re-Print Invoices-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Billing");
        activateItem(":*.Sales_QMenu", "Billing");
        waitForObjectItem(":*.Billing_QMenu", "Forms");
        activateItem(":*.Billing_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu_2", "Re-Print Invoices...");
        activateItem(":*.Forms_QMenu_2", "Re-Print Invoices...");
        
        waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit");
        type(":Re-Print Invoices.XDateEdit_XDateEdit", "-30"); 
        waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit_2");
        type(":Re-Print Invoices.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Re-Print Invoices.Query_QPushButton");
        clickButton(":Re-Print Invoices.Query_QPushButton");
        waitForObject(":_invoice_XTreeWidget");
        clickItem(":_invoice_XTreeWidget", "TTOYS - Tremendous Toys Incorporated", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Re-Print Invoices.Print_QPushButton");
        clickButton(":Re-Print Invoices.Print_QPushButton");
        snooze(2);
        if(OS.name=="Linux")
        {
            nativeType("<Tab>"); 
            nativeType("<Tab>");
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            snooze(1);	  
            nativeType("<Return>");
        }
        else
        {
            snooze(1);
            nativeType("<Tab>"); 
            nativeType("<Tab>");
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>");    
            snooze(1);	  
            nativeType("<Return>");
        }
        
        if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))
            test.fail("Schedule button exists in Re-priting Invoice screen");
        
        else test.pass("Schedule button does not exist in Re-printing Invoice screen"); 
        
        waitForObject(":Re-Print Invoices.Cancel_QPushButton");
        clickButton(":Re-Print Invoices.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Re Printing invoice " + e);
    }
    
    
    //-----Post Invoices(Sales)-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Billing");
        activateItem(":*.Sales_QMenu", "Billing");
        waitForObjectItem(":*.Billing_QMenu", "Invoice");
        activateItem(":*.Billing_QMenu", "Invoice");
        waitForObjectItem(":*.Invoice_QMenu_2", "Post Invoices...");
        activateItem(":*.Invoice_QMenu_2", "Post Invoices...");
        snooze(1);
        if(object.exists(":Post Invoices.Schedule_QPushButton"))
            test.fail("Schedule button exists in Post Invoices screen");
        else
            test.pass("Schedule button does not exists in Post Invoices screen");
        waitForObject(":Post Invoices.Cancel_QPushButton");
        clickButton(":Post Invoices.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in posting invoice " + e);
    }
    
    //-----Send Electronic Invoice(Sales)-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Billing");
        activateItem(":*.Sales_QMenu", "Billing");
        waitForObjectItem(":*.Billing_QMenu", "Forms");
        activateItem(":*.Billing_QMenu", "Forms");
        
        snooze(1);
        menu = waitForObject(":*.Forms_QMenu_2");
        menuItem = "Send &Electronic Invoice...";
        
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+appEdition);
        else test.pass(menuItem+"not found in "+appEdition);
    }
    catch(e)
    {
        test.fail("Error in checking send Electronic Invoice " + e);
    }
    
    
    //Preferences
    
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Preferences...");
    activateItem(":xTuple ERP: *.System_QMenu", "Preferences...");
    waitForObject(":User Preferences.Save_QPushButton_2");
    clickButton(":User Preferences.Save_QPushButton_2");
    
    //-----Create an Invoice-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":*.Sales_QMenu", "Billing");
        activateItem(":*.Sales_QMenu", "Billing");
        waitForObjectItem(":*.Billing_QMenu", "Invoice");
        activateItem(":*.Billing_QMenu", "Invoice");
        type(":*.Billing_QMenu","<Right>");
        type(":*.Billing_QMenu","<Right>");
        waitForObjectItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
        activateItem(":*.Invoice_QMenu_2", "List Unposted Invoices...");
        
        waitForObject(":List Unposted Invoices.New_QPushButton");
        clickButton(":List Unposted Invoices.New_QPushButton");
        
        
        waitForObject(":_billtoFrame.VirtualClusterLineEdit_CLineEdit");
        type(":_billtoFrame.VirtualClusterLineEdit_CLineEdit","TTOYS");
        
        waitForObject(":Bill To.XLineEdit_XLineEdit");
        mouseClick(":Bill To.XLineEdit_XLineEdit", 7, 12, 0, Qt.LeftButton);
        
        snooze(0.5);
        
        waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":lineItemsTab.New_QPushButton");
        clickButton(":lineItemsTab.New_QPushButton");
        waitForObject(":Item.VirtualClusterLineEdit_ItemLineEdit");
        mouseClick(":Item.VirtualClusterLineEdit_ItemLineEdit", 58, 12, 0, Qt.LeftButton);
        waitForObject(":Item.VirtualClusterLineEdit_ItemLineEdit");
        type(":Item.VirtualClusterLineEdit_ItemLineEdit", "YTRUCK1");
        snooze(0.5);
        nativeType("<Tab>");
        
        waitForObject(":_ordered_XLineEdit_2");
        type(":_ordered_XLineEdit_2", "25");
        waitForObject(":_billed_XLineEdit");
        type(":_billed_XLineEdit", "25");
        
        waitForObject(":Invoice.Save_QPushButton");
        clickButton(":Invoice.Save_QPushButton");
        waitForObject(":Invoice.Save_QPushButton_2");
        clickButton(":Invoice.Save_QPushButton_2");
        
        waitForObject(":List Unposted Invoices.Close_QPushButton");
        clickButton(":List Unposted Invoices.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating invoice " + e);
    }
    
    
    //-----Print Invoices(AR)-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Forms");
        activateItem(":*.Accounts Receivable_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu_4", "Print Invoices...");
        activateItem(":*.Forms_QMenu_4", "Print Invoices...");
        
        waitForObject(":Print Invoices.Print_QPushButton");
        clickButton(":Print Invoices.Print_QPushButton");
        snooze(1);
        if(OS.name=="Linux")
        {
            nativeType("<Tab>"); 
            nativeType("<Tab>");
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            snooze(1);	  
            nativeType("<Return>");
        }
        else
        {
            nativeType("<Tab>"); 
            nativeType("<Tab>");
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>");    
            snooze(1);	  
            nativeType("<Return>");
        }
        if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))
            test.fail("Schedule button exists in Priting Invoice screen");
        
        else test.pass("Schedule button does not exist in Printing Invoice screen"); 
        
        waitForObject(":Print Invoices.Cancel_QPushButton");
        clickButton(":Print Invoices.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in printing invoice " + e);
    }
    
    //-----Re-Print Invoices(AR)-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Forms");
        activateItem(":*.Accounts Receivable_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu_4", "Re-Print Invoices...");
        activateItem(":*.Forms_QMenu_4", "Re-Print Invoices...");
        
        waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit");
        type(":Re-Print Invoices.XDateEdit_XDateEdit", "-30");
        waitForObject(":Re-Print Invoices.XDateEdit_XDateEdit_2");
        type(":Re-Print Invoices.XDateEdit_XDateEdit_2", "0");
        waitForObject(":Re-Print Invoices.Query_QPushButton");
        clickButton(":Re-Print Invoices.Query_QPushButton");
        waitForObject(":_invoice_XTreeWidget");
        clickItem(":_invoice_XTreeWidget", "TTOYS - Tremendous Toys Incorporated", 5, 5, 1, Qt.LeftButton);
        waitForObject(":Re-Print Invoices.Print_QPushButton");
        clickButton(":Re-Print Invoices.Print_QPushButton");
        snooze(1);
        if(OS.name=="Linux")
        {
            nativeType("<Tab>"); 
            nativeType("<Tab>");
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            snooze(1);	  
            nativeType("<Return>");
        }
        else
        {
            
            nativeType("<Tab>"); 
            nativeType("<Tab>");
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>"); 
            nativeType("<Tab>");    
            snooze(1);	  
            nativeType("<Return>");
        }
        if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))      
            test.fail("Schedule button exists in Re-priting Invoice screen");
        
        else test.pass("Schedule button does not exist in Re-printing Invoice screen"); 
        
        waitForObject(":Re-Print Invoices.Cancel_QPushButton");
        clickButton(":Re-Print Invoices.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Re printing invoice " + e);
    }
    
     //-----Post Standard Journal-----
    try
    {
     if(OS.name!="Linux")
        {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    }
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "General Ledger");
        activateItem(":*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Standard Journals");
        activateItem(":*.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":*.Standard Journals_QMenu", "Post...");
        activateItem(":*.Standard Journals_QMenu", "Post...");
        
        if(object.exists(":Post Standard Journal.Schedule_QPushButton"))
            test.fail("Schedule button exists in Post Standard Journal screen");
        
        else test.pass("Schedule button does not exist in Post Standard Journal screen"); 
        
        waitForObject(":Post Standard Journal.Cancel_QPushButton");
        clickButton(":Post Standard Journal.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in posting standard journal " + e);
    }
    
    //-----Post Standard Journal Group-----
    try
    {	
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "General Ledger");
        activateItem(":*.Accounting_QMenu", "General Ledger");
        waitForObjectItem(":*.General Ledger_QMenu", "Standard Journals");
        activateItem(":*.General Ledger_QMenu", "Standard Journals");
        waitForObjectItem(":*.Standard Journals_QMenu", "Post Group...");
        activateItem(":*.Standard Journals_QMenu", "Post Group...");
        
        if(object.exists(":Post Standard Journal Group.Schedule_QPushButton"))
            test.fail("Schedule button exists in Post Standard JournalGroup screen");
        
        else test.pass("Schedule button does not exist in Post Standard Journal Group screen"); 
        
        waitForObject(":Post Standard Journal Group.Cancel_QPushButton");
        clickButton(":Post Standard Journal Group.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in posting standard journal group" + e);
    }
    
    //-----Update Late Customer Credit Status-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Utilities");
        activateItem(":*.Accounting_QMenu", "Utilities");
        waitForObjectItem(":*.Utilities_QMenu_3", "Update Late Customer Credit Status...");
        activateItem(":*.Utilities_QMenu_3", "Update Late Customer Credit Status...");
        
        if(object.exists(":Update Late Customer Credit Status.Schedule_QPushButton"))
            test.fail("Schedule button exists in Update Late Customer Credit Status screen");
        
        else test.pass("Schedule button does not exist in Update Late Customer Credit Status screen"); 
        
        waitForObject(":Update Late Customer Credit Status.Cancel_QPushButton");
        clickButton(":Update Late Customer Credit Status.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Updating Late Customer Credit Status " + e);
    }

   //-----Print Statement by Customer-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Forms");
        activateItem(":*.Accounts Receivable_QMenu", "Forms");
        waitForObjectItem(":*.Forms_QMenu_4", "Print Statement by Customer...");
        activateItem(":*.Forms_QMenu_4", "Print Statement by Customer...");
        
        waitForObject(":Print Statement by Customer.VirtualClusterLineEdit_CLineEdit");
        type(":Print Statement by Customer.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Print Statement by Customer.Print_QPushButton");
        clickButton(":Print Statement by Customer.Print_QPushButton");
        if(OS.name=="Linux")
        {
        snooze(1);
        nativeType("<Tab>"); 
        nativeType("<Tab>");
        nativeType("<Tab>"); 
        nativeType("<Tab>"); 
        nativeType("<Tab>"); 
        snooze(1);
        nativeType("<Return>");
    }
        else
        {
        snooze(1);
        nativeType("<Tab>"); 
        nativeType("<Tab>");
        nativeType("<Tab>"); 
        nativeType("<Tab>"); 
        nativeType("<Tab>"); 
        nativeType("<Tab>"); 
        nativeType("<Tab>"); 
        nativeType("<Return>");
    }
        snooze(1);
        if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))
            test.fail("Schedule button exists in Print Statement by Customer screen");
        
        else test.pass("Schedule button does not exist in Print Statement by Customer screen"); 
        waitForObject(":Print Statement by Customer.Close_QPushButton");
        clickButton(":Print Statement by Customer.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in printing statement by customer " + e);
    }
    
    //-----Operation Buffer Status-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        activateItem(":xTuple ERP: *_QMenuBar", "Manufacture");
        waitForObjectItem(":*.Manufacture_QMenu", "Reports");
        activateItem(":*.Manufacture_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_5", "Operation Buffer Status...");
        activateItem(":*.Reports_QMenu_5", "Operation Buffer Status...");
        
        if(object.exists(":Work Order Operation Buffer Status by Work Center.Schedule_QPushButton"))
            test.fail("Schedule button exists in Operation Buffer Status screen");
        
        else test.pass("Schedule button does not exist in Operation Buffer Status screen"); 
        
        waitForObject(":Work Order Operation Buffer Status by Work Center.Close_QPushButton");
        clickButton(":Work Order Operation Buffer Status by Work Center.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Operation buffer status screen " + e);
    }
    
    //-----Send Electronic Invoice-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Invoice");
        activateItem(":*.Accounts Receivable_QMenu", "Invoice"); 
        type(":*.Accounts Receivable_QMenu", "<Right>");
        type(":*.Accounts Receivable_QMenu", "<Right>");
        snooze(1);
        menu = waitForObject(":*.Invoice_QMenu");
        menuItem = "Send &Electronic Invoice...";
        
        actions = menu.actions();
        for(i=0;i<actions.count();i++)
            if(actions.at(i).text == menuItem || i==actions.count()-1) break;
        if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+appEdition);
        else test.pass(menuItem+"not found in "+appEdition);    
    }
    catch(e)
    {
        test.fail("Error in Sending Electronic invoice " + e);
    }
    
    //-----Single Level Bill of Materials Screen-----
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Bills of Materials");
        activateItem(":*.Reports_QMenu_6", "Bills of Materials");
        waitForObjectItem(":*.Bills of Materials_QMenu", "Single Level...");
        activateItem(":*.Bills of Materials_QMenu", "Single Level...");
        if(object.exists(":Single Level Bill of Materials.Schedule_QToolButton"))
            test.fail("Schedule button exists in Single Level Bill of Materials screen");
        else
            test.pass("Schedule button doesn't exists in Single Level Bill of Materials screen");
        
        waitForObject(":Single Level Bill of Materials.Close_QToolButton");
        clickButton(":Single Level Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in checking Single Level Bill of Materials Screen");
    }
    
    //----- Indented Bill of Materials Screen -----
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Bills of Materials");
        activateItem(":*.Reports_QMenu_6", "Bills of Materials");
        waitForObjectItem(":*.Bills of Materials_QMenu", "Indented...");
        activateItem(":*.Bills of Materials_QMenu", "Indented...");
        if(object.exists(":Indented Bill of Materials.Schedule_QToolButton"))
            test.fail("Schedule button exists in Indented Bill of Materials screen");
        else
            test.pass("Schedule button doesn't exists in Indented Bill of Materials screen");
        waitForObject(":Indented Bill of Materials.Close_QToolButton");
        clickButton(":Indented Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in checking Indented Bill of Materials Screen");
    }
    
    //------ Summarized Bill of Materials Screen ---------
    
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Bills of Materials");
        activateItem(":*.Reports_QMenu_6", "Bills of Materials");
        waitForObjectItem(":*.Bills of Materials_QMenu", "Summarized...");
        activateItem(":*.Bills of Materials_QMenu", "Summarized...");
        if(object.exists(":Summarized Bill of Materials.Schedule_QToolButton"))
            test.fail("Schedule button exists in Summarized Bill of Materials screen");
        else
            test.pass("Schedule button doesn't exists in Summarized Bill of Materials screen");
        
        waitForObject(":Summarized Bill of Materials.Close_QToolButton");
        clickButton(":Summarized Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in checking Summarized Bill of Materials Screen");
    }
    
    
    //------ Single Level Where Used Screen ---------
    
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Where Used");
        activateItem(":*.Reports_QMenu_6", "Where Used");
        waitForObjectItem(":*.Where Used_QMenu", "Single Level...");
        activateItem(":*.Where Used_QMenu", "Single Level...");
        
        if(object.exists(":Single Level Where Used.Schedule_QToolButton"))
            test.fail("Schedule button exists in Single Level Where Used screen");
        else
            test.pass("Schedule button doesn't exists in Single Level Where Used screen");
        
        waitForObject(":Single Level Where Used.Close_QToolButton");
        clickButton(":Single Level Where Used.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in checking Single Level Bill of Materials Screen");
    }
    
    //------ Indented Where Used Screen ---------
    
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Where Used");
        activateItem(":*.Reports_QMenu_6", "Where Used");
        waitForObjectItem(":*.Where Used_QMenu", "Indented...");
        activateItem(":*.Where Used_QMenu", "Indented...");
        
        if(object.exists(":Indented Where Used.Schedule_QToolButton"))
            test.fail("Schedule button exists in Indented Where Used screen");
        else
            test.pass("Schedule button doesn't exists in Indented Where Used screen");
        
        waitForObject(":Indented Where Used.Close_QToolButton");
        clickButton(":Indented Where Used.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Exception in checking Single Level Bill of Materials Screen");
    }  
    //---------------Capacity UOM by Product Category----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Capacity UOMs");
        activateItem(":*.Reports_QMenu_6", "Capacity UOMs");
        waitForObjectItem(":*.Capacity UOMs_QMenu", "by Product Category...");
        activateItem(":*.Capacity UOMs_QMenu", "by Product Category...");
        
        if(object.exists(":Capacity UOMs by Product Category.Schedule_QToolButton"))
            test.fail("Schedule button exists in Capacity UOMs by Product Category screen");
        else
            test.pass("Schedule button doesn't exists in Capacity UOMs by Product Category screen");
        
        waitForObject(":Capacity UOMs by Product Category.Close_QToolButton");
        clickButton(":Capacity UOMs by Product Category.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in checking Capacity UOM by product category"+ e);
    }
    
    
    //---------------Capacity UOM by Class Code----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Reports");
        activateItem(":*.Products_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_6", "Capacity UOMs");
        activateItem(":*.Reports_QMenu_6", "Capacity UOMs");
        waitForObjectItem(":*.Capacity UOMs_QMenu", "by Class Code...");
        activateItem(":*.Capacity UOMs_QMenu", "by Class Code...");
        if(object.exists(":Capacity UOMs by Class Code.Schedule_QToolButton"))
            test.fail("Schedule button exists in Capacity UOMs by Class Code screen");
        else
            test.pass("Schedule button doesn't exists in Capacity UOMs by Class Code screen");
        
        waitForObject(":Capacity UOMs by Class Code.Close_QToolButton");
        clickButton(":Capacity UOMs by Class Code.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling Capacity UOM by class code"+ e);
    }
    
    
    //---------------Item List----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Item");
        activateItem(":*.Products_QMenu", "Item");
        waitForObjectItem(":*.Item_QMenu", "List...");
        activateItem(":*.Item_QMenu", "List...");
        waitForObject(":Items.Query_QToolButton");
        if(object.exists(":Items.Schedule_QToolButton"))
            test.fail("Schedule button exists in Items List screen");
        else
            test.pass("Schedule button doesn't exists in Items List screen");
        waitForObject(":Items.Close_QToolButton");
        clickButton(":Items.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in scheduling item list"+ e);
    }
    
    
    //------------Costed single level BOM----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Costed BOM");
        activateItem(":*.Reports_QMenu_7", "Costed BOM");
        waitForObjectItem(":*.Costed BOM_QMenu", "Single Level...");
        activateItem(":*.Costed BOM_QMenu", "Single Level...");    
        if(object.exists(":Costed Single Level Bill of Materials.Schedule_QToolButton"))
            test.fail("Schedule button exists in Costed Single Level Bill of Materials screen");
        else
            test.pass("Schedule button doesn't exists in Costed Single Level Bill of Materials screen");
        waitForObject(":Costed Single Level Bill of Materials.Close_QToolButton");
        clickButton(":Costed Single Level Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in costed single level BOM"+ e);
    }
    
    //------------Costed Indented level BOM----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Costed BOM");
        activateItem(":*.Reports_QMenu_7", "Costed BOM");
        waitForObjectItem(":*.Costed BOM_QMenu", "Indented...");
        activateItem(":*.Costed BOM_QMenu", "Indented...");  
        if(object.exists(":Costed Indented Bill of Materials.Schedule_QToolButton"))
            test.fail("Schedule button exists in Costed Indented Bill of Materials screen");
        else
            test.pass("Schedule button doesn't exists in Costed Indented Bill of Materials screen");
        waitForObject(":Costed Indented Bill of Materials.Close_QToolButton");
        clickButton(":Costed Indented Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in costed indented level BOM"+ e);
    }
    
    //------------Costed Summarized level BOM----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Costed BOM");
        activateItem(":*.Reports_QMenu_7", "Costed BOM");
        waitForObjectItem(":*.Costed BOM_QMenu", "Summarized...");
        activateItem(":*.Costed BOM_QMenu", "Summarized...");  
        if(object.exists(":Costed Summarized Bill of Materials.Schedule_QToolButton"))
            test.fail("Schedule button exists in Costed Summarized Bill of Materials screen");
        else
            test.pass("Schedule button doesn't exists in Costed Summarized Bill of Materials screen");
        waitForObject(":Costed Summarized Bill of Materials.Close_QToolButton");
        clickButton(":Costed Summarized Bill of Materials.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in costed summarized level BOM"+ e);
    }
    
    //------------Item Cost by class code----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Item Costs");
        activateItem(":*.Reports_QMenu_7", "Item Costs");
        waitForObjectItem(":*.Item Costs_QMenu", "by Class Code...");
        activateItem(":*.Item Costs_QMenu", "by Class Code...");
        if(object.exists(":Item Costs by Class Code.Schedule_QToolButton"))
            test.fail("Schedule button exists in Item Costs by Class Code screen");
        else
            test.pass("Schedule button doesn't exists in Item Costs by Class Code screen");
        waitForObject(":Item Costs by Class Code.Close_QToolButton");
        clickButton(":Item Costs by Class Code.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in item cost by class code"+ e);
    }
    
    
    //------------Item cost by summary----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Item Costs");
        activateItem(":*.Reports_QMenu_7", "Item Costs");
        waitForObjectItem(":*.Item Costs_QMenu", "Summary...");
        activateItem(":*.Item Costs_QMenu", "Summary...");
        if(object.exists(":Item Costs Summary.Schedule_QToolButton"))
            test.fail("Schedule button exists in Item Costs Summary screen");
        else
            test.pass("Schedule button doesn't exists in Item Costs Summary screen");
        waitForObject(":Item Costs Summary.Close_QToolButton");
        clickButton(":Item Costs Summary.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in item costs by summary"+ e);
    }
    
    
    //------------Item cost History----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":*.Products_QMenu", "Costing");
        activateItem(":*.Products_QMenu", "Costing");
        waitForObjectItem(":*.Costing_QMenu", "Reports");
        activateItem(":*.Costing_QMenu", "Reports");
        waitForObjectItem(":*.Reports_QMenu_7", "Item Costs");
        activateItem(":*.Reports_QMenu_7", "Item Costs");
        waitForObjectItem(":*.Item Costs_QMenu", "History...");
        activateItem(":*.Item Costs_QMenu", "History...");
        if(object.exists(":Item Costs History.Schedule_QToolButton"))
            test.fail("Schedule button exists in Item Costs History screen");
        else
            test.pass("Schedule button doesn't exists in Item Costs History screen");
        
        waitForObject(":Item Costs History.Close_QToolButton");
        clickButton(":Item Costs History.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in item cost History"+ e);
    }
    
   
    //-----Post Invoices(AR)-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
        activateItem(":*.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":*.Accounts Receivable_QMenu", "Invoice");
        activateItem(":*.Accounts Receivable_QMenu", "Invoice");
        waitForObjectItem(":*.Invoice_QMenu", "Post...");
        activateItem(":*.Invoice_QMenu", "Post...");
        snooze(1);
        if(object.exists(":Post Invoices.Schedule_QPushButton"))
            test.fail("Schedule button exists in Post Invoices screen");
        else
            test.pass("Schedule button does not exists in Post Invoices screen");
        waitForObject(":Post Invoices.Cancel_QPushButton");
        clickButton(":Post Invoices.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in checking Post invoices(AR)" + e);
    }
    
    
}

