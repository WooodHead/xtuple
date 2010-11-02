//--***--This script is developed to check the status of Batch Manager Submissions (when Batch Manager is disabled)--***--


function main()
{
   
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    
    var set = testData.dataset("login.tsv");
    var email;
    for(var records in set)
    {
        fromemail=testData.field(set[records],"FROM EMAIL");
        toemail=testData.field(set[records],"TO EMAIL");
        role=testData.field(set[records],"ROLE")
             if(role=="CONFIGURE") break;     
    }
    
    //-----Edit User Preferences----
    try
    {
     waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Preferences...");
    activateItem(":xTuple ERP: *.System_QMenu", "Preferences...");
    if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
    {
        if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
      clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
    }
    if(object.exists(":Search Navigation.Buttons_QRadioButton"))
    {
        if(!findObject(":Search Navigation.Buttons_QRadioButton").checked)
      clickButton(":Search Navigation.Buttons_QRadioButton");
    }
     waitForObject(":User Preferences.Save_QPushButton");
    clickButton(":User Preferences.Save_QPushButton");
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
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Configure Modules");
    activateItem(":xTuple ERP: *.System_QMenu", "Configure Modules");
    waitForObjectItem(":*.Configure Modules_QMenu", "Sales...");
    activateItem(":*.Configure Modules_QMenu", "Sales...");
    
    if(!findObject(":general.Enable Sales Reservations_QCheckBox").checked)
        clickButton(":general.Enable Sales Reservations_QCheckBox");
    
    waitForObject(":Sales Configuration.Save_QPushButton");
    clickButton(":Sales Configuration.Save_QPushButton");
    test.log("Enabled Sales Reservations");
    }
    catch(e)
    {
        test.fail("Error in enabling sales reservations" + e);
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
    
    //---find Application Edition------ 
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: *.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP: *.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
    
    waitForObject(":Database Information.Save_QPushButton");
    clickButton(":Database Information.Save_QPushButton");
    test.log("Application Edition: "+appEdition);
    }
    catch(e)
    {
        test.fail("Error in finding application edition" + e);
    }
    appEdition = "Manufacturing";
    
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
    
    //-----System Preferences-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Preferences...");
    activateItem(":xTuple ERP: *.System_QMenu", "Preferences...");
    
    waitForObject(":_idleTimeout_QSpinBox");
    findObject(":_idleTimeout_QSpinBox").clear();
    waitForObject(":_idleTimeout_QSpinBox");
    type(":_idleTimeout_QSpinBox", "0");
    
    waitForObject(":User Preferences.Save_QPushButton");
    clickButton(":User Preferences.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in assigning preferences" + e);
    }
    

    
    //-----Verify Batch Manager Status-----  
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: *.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP: *.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
    
    waitForObject(":Database Information.Batch Manager_QGroupBox");
    if(findObject(":Database Information.Batch Manager_QGroupBox").checked)
        type(":Database Information.Batch Manager_QGroupBox", " ");
    
    waitForObject(":Database Information.Save_QPushButton");
    clickButton(":Database Information.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in verifying Batch Manager status" + e);
    }
    
    
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    snooze(1);
    menu = waitForObject(":xTuple ERP: *.System_QMenu");
    menuItem = "&Batch Manager...";
    
    actions = menu.actions();
    for(i=0;i<actions.count();i++)
        if(actions.at(i).text == menuItem || i==actions.count()-1) break;
    if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+appEdition);
    else test.pass(menuItem+"not found in "+appEdition);
    
    
    
    
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
    
    if(object.exists(":Allocate Reservations.Submit_QPushButton"))
        test.fail("Submit Button exists in Allocate Reservations screen");
    
    else test.pass("Submit Button does not exist in Allocate Reservations screen");
    
    waitForObject(":Allocate Reservations.Cancel_QPushButton");
    clickButton(":Allocate Reservations.Cancel_QPushButton");
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
    
    if(object.exists(":Run MRP by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Create Planned Order by Plannercode screen");
    
    else test.pass("Submit Button does not exist in Create Planned Order by Plannercode screen");
    
    waitForObject(":Run MRP by Planner Code.Cancel_QPushButton");
    clickButton(":Run MRP by Planner Code.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating planned order" + e);
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
    
    if(object.exists(":Run MRP by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Create Planned Order by Plannercode screen");
    
    else test.pass("Submit Button does not exist in Create Planned Order by Plannercode screen");
    
    waitForObject(":Run MRP by Planner Code.Cancel_QPushButton");
    clickButton(":Run MRP by Planner Code.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating planned order" + e);
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
    
    if(object.exists(":Release Planned Orders by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Release Planned Order by Plannercode screen");
    
    else test.pass("Submit Button does not exist in Release Planned Order by Plannercode screen");
    
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
    
    if(object.exists(":Run Buffer Status by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Create Buffer status by Plannercode screen");
    
    else test.pass("Submit Button does not exist in Create Buffer status by Plannercode screen");
    
    waitForObject(":Run Buffer Status by Planner Code.Cancel_QPushButton_2");
    clickButton(":Run Buffer Status by Planner Code.Cancel_QPushButton_2");
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
    type(":*.Update Status_QMenu_2","<Enter>");
    
    if(object.exists(":Run Buffer Status by Item.Submit_QPushButton"))
        test.fail("Submit Button exists in Create Buffer status by Item screen");               
    else test.pass("Submit Button does not exists in Create Buffer status by Item screen");
    
    waitForObject(":Run Buffer Status by Planner Code.Cancel_QPushButton_2");
    clickButton(":Run Buffer Status by Planner Code.Cancel_QPushButton_2");
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
    
    if(object.exists(":Run MPS by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Create Buffer status by Item screen");
    
    else test.pass("Submit Button does not exists in Create Buffer status by Item screen");        
    
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
    
    if(object.exists(":Release Planned Orders by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Release Planned Order by Plannercode screen");
    
    else test.pass("Submit Button does not exist in Release Planned Order by Plannercode screen");
    
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
    
    if(object.exists(":Time Phased Demand by Planner Code.Submit_QPushButton"))
        test.fail("Submit button exits in Time Phased Demand by Planner code");
    
    else test.pass("Submit button does not exit in Time Phased Demand by Planner code");
    
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
    
    if(object.exists(":Time-Phased Production by Planner Code.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Production by Planner code screen");
    
    else test.pass("Submit button does not exist in Time Phased Production by Planner code screen");
    
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
    
    if(object.exists(":Time-Phased Production by Item.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Production by Item screen");
    
    else test.pass("Submit button does not exist in Time Phased Production by Item screen");
    
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
    
    if(object.exists(":Time-Phased Availability.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased availability screen");
    
    else test.pass("Submit button does not exist in Time Phased availability screen");
    
    waitForObject(":Time-Phased Availability.Close_QPushButton");
    clickButton(":Time-Phased Availability.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Availability screen " + e);
    }
    
    
    //-----Time Phased Booking by Customer-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    activateItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    waitForObjectItem(":*.Time-Phased Bookings_QMenu", "by Customer...");
    activateItem(":*.Time-Phased Bookings_QMenu", "by Customer...");
    
    if(object.exists(":Time-Phased Bookings by Customer.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Booking by customer screen");
    
    else test.pass("Submit button doesnot exist in Time Phased Booking by customer screen");
    
    waitForObject(":Time-Phased Bookings by Customer.Close_QPushButton");
    clickButton(":Time-Phased Bookings by Customer.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Booking by customer screen " + e);
    }
    
    //-----Time Phased Booking by Item-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    activateItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    waitForObjectItem(":*.Time-Phased Bookings_QMenu", "by Item...");
    activateItem(":*.Time-Phased Bookings_QMenu", "by Item...");
    
    if(object.exists(":Time-Phased Bookings by Item.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Booking by Item screen");
    
    else test.pass("Submit button does not exist in Time Phased Booking by Item screen");
    
    waitForObject(":Time-Phased Bookings by Item.Close_QPushButton");
    clickButton(":Time-Phased Bookings by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Booking by Item screen " + e);
    }
    
    //-----Time Phased Bookings by Product Category-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    activateItem(":*.Analysis_QMenu", "Time-Phased Bookings");
    waitForObjectItem(":*.Time-Phased Bookings_QMenu", "by Product Category...");
    activateItem(":*.Time-Phased Bookings_QMenu", "by Product Category...");
    
    if(object.exists(":Time-Phased Bookings by Product Category.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Booking by Product category screen");
    
    else test.pass("Submit button does not exist in Time Phased Booking by Product category screen");
    
    waitForObject(":Time-Phased Bookings by Product Category.Close_QPushButton");
    clickButton(":Time-Phased Bookings by Product Category.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Booking by product category screen " + e);
    }
    
    //-----Time Phased Sales History by Customer Group-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Customer Group...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Customer Group...");
    
    if(object.exists(":Time-Phased Sales History by Customer Group.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Sales History by customer group screen");
    
    else test.pass("Submit button does not exist in Time Phased Sales History by customer group screen");
    
    waitForObject(":Time-Phased Sales History by Customer Group.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Customer Group.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Sales History by customer group screen " + e);
    }
    
    
    //-----Time Phased Sales History by Customer-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Customer...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Customer...");
    
    if(object.exists(":Time-Phased Sales History by Customer.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Sales History by customer screen");
    
    else test.pass("Submit button does not exist in Time Phased Sales History by customer screen");
    
    waitForObject(":Time-Phased Sales History by Customer.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Customer.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Sales History by customer screen " + e);
    }
    
    
    //-----Time Phased Sales History by Customer by Item-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Customer by Item...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Customer by Item...");
    
    if(object.exists(":Time-Phased Sales History by Customer by Item.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Sales History by customer by item screen");
    
    else test.pass("Submit button does not exist in Time Phased Sales History by customer by item screen");
    
    waitForObject(":Time-Phased Sales History by Customer by Item.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Customer by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Sales History by customer by Item screen " + e);
    }
    
    
    //-----Time Phased Sales History by Product Category-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Product Category...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Product Category...");
    
    if(object.exists(":Time-Phased Sales History by Product Category.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Sales History by product category screen");
    
    else test.pass("Submit button does not exist in Time Phased Sales History by product category screen");
    
    waitForObject(":Time-Phased Sales History by Product Category.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Product Category.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Sales History by Product Category screen " + e);
    }
    
    //-----Time Phased Sales History by Item-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Analysis");
    activateItem(":*.Sales_QMenu", "Analysis");
    waitForObjectItem(":*.Analysis_QMenu", "Time Phased Sales History");
    activateItem(":*.Analysis_QMenu", "Time Phased Sales History");
    waitForObjectItem(":*.Time Phased Sales History_QMenu", "by Item...");
    activateItem(":*.Time Phased Sales History_QMenu", "by Item...");
    
    if(object.exists(":Time-Phased Sales History by Item.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Sales History by Item screen");
    
    else test.pass("Submit button does not exist in Time Phased Sales History by Item screen");
    
    waitForObject(":Time-Phased Sales History by Item.Close_QPushButton");
    clickButton(":Time-Phased Sales History by Item.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Time Phased Sales History by Item screen " + e);
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
    
    if(object.exists(":Time-Phased Item Usage Statistics by Item.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Usage Statistics by Item screen");
    
    else test.pass("Submit button does not exist in Time Phased Usage Statistics by Item screen");   
    
    waitForObject(":Time-Phased Item Usage Statistics by Item.Close_QPushButton");
    clickButton(":Time-Phased Item Usage Statistics by Item.Close_QPushButton");
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
    
    if(object.exists(":Update Actual Costs by Item.Submit_QPushButton"))
        test.fail("Submit button exists in Update Actual Costs by Item screen");
    
    else test.pass("Submit button does not exist in Update Actual Costs by Item screen");
    
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
    
    if(object.exists(":Submit Action to Batch Manager.Submit_QPushButton"))
        test.fail("Submit button exists in Update Actual Costs by Class code screen");
    
    else test.pass("Submit button  does not exists in Update Actual Costs by Class code screen");
    
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
    
    if(object.exists(":Submit Action to Batch Manager.Submit_QPushButton"))
        test.fail("Submit button exists in Post Actual Costs by Item screen");
    
    else test.pass("Submit button does not exist in Post Actual Costs by Item screen");
    
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
    
    if(object.exists(":Submit Action to Batch Manager.Submit_QPushButton"))
        test.fail("Submit button exists in Post Actual Costs by Class code screen");
    
    else test.pass("Submit button does not exist in Post Actual Costs by Class code screen");
    
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
    
    if(object.exists(":Submit Action to Batch Manager.Submit_QPushButton"))
        test.fail("Submit button exists in Post Standard Costs by Item screen");
    
    else test.pass("Submit button does not exist in Post Standard Costs by Item screen");
    
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
    
    if(object.exists(":Submit Action to Batch Manager.Submit_QPushButton"))
        test.fail("Submit button exists in Post Standard Costs by Class code screen");
    
    else test.pass("Submit button does not exist in Post Standard Costs by Class code screen");
    
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
    
    if(object.exists(":Update Order Up To Level by Item.Submit_QPushButton"))
        test.fail("Submit button exists in Update Order Upto Level by Item screen");
    
    else test.pass("Submit button does not exist in Update Order Upto Level by Item screen");
    
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
    
    if(object.exists(":Update Order Up To Levels by Planner Code.Submit_QPushButton"))
        test.fail("Submit button exists in Update Order Upto Level by Planner code screen");
    
    else test.pass("Submit button does not exist in Update Order Upto Level by Planner code screen");
    
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
    
    if(object.exists(":Update Order Up To Levels by Class Code.Submit_QPushButton"))
        test.fail("Submit button exists in Update Order Upto Level by Class code screen");
    
    else test.pass("Submit button does not exist in Update Order Upto Level by Class code screen");
    
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
    
    if(object.exists(":_criteriaTab.Submit_QPushButton"))
        test.fail("Submit button exists in Update ReOrder Upto Level by Item screen");
    
    else test.pass("Submit button does not exist in Update ReOrder Upto Level by Item screen");
    
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
    
    if(object.exists(":_criteriaTab.Submit_QPushButton_2"))
        test.fail("Submit button exists in Update ReOrder Upto Level by Planner code screen");
    
    else test.pass("Submit button does not exist in Update ReOrder Upto Level by Planner code screen"); 
    
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
    
    if(object.exists(":_criteriaTab.Submit_QPushButton_3"))
        test.fail("Submit button exists in Update ReOrder Upto Level by Class code screen");
    
    else test.pass("Submit button does not exist in Update ReOrder Upto Level by Class code screen"); 
    
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
    
    if(object.exists(":Payables Aging.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Open AP Items screen");
    
    else test.pass("Submit button does not exist in Time Phased Open AP Items screen"); 
    
    waitForObject(":Payables Aging.Close_QPushButton");
    clickButton(":Payables Aging.Close_QPushButton");
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
    
    if(object.exists(":Receivables Aging.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Open AR Items screen");
    
    else test.pass("Submit button does not exist in Time Phased Open AR Items screen"); 
    
    waitForObject(":Receivables Aging.Close_QPushButton");
    clickButton(":Receivables Aging.Close_QPushButton");
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
    
    if(object.exists(":Create Recurring Invoices.Submit_QPushButton"))
        test.fail("Submit button exists in Create Recurring Invoice screen");
    
    else test.pass("Submit button does not exist in Create Recurring Invoice screen"); 
    
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
    
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
   
     waitForObject(":Item...._QPushButton_2");
    clickButton(":Item...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_13");
    doubleClickItem(":_listTab_XTreeWidget_13", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
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
    
    if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))
        test.fail("Submit button exists in Priting Invoice screen");
    
    else test.pass("Submit button does not exist in Printing Invoice screen"); 
    
    waitForObject(":Print Invoices.Cancel_QPushButton");
    clickButton(":Print Invoices.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in printing invoices " + e);
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
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
    waitForObject(":Item...._QPushButton_2");
    clickButton(":Item...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_13");
    doubleClickItem(":_listTab_XTreeWidget_13", "YTRUCK1", 5, 5, 0, Qt.LeftButton);   
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
    
    
    //-----Print Invoice by Ship via-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":*.Sales_QMenu", "Billing");
    activateItem(":*.Sales_QMenu", "Billing");
    waitForObjectItem(":*.Billing_QMenu", "Forms");
    activateItem(":*.Billing_QMenu", "Forms");
    waitForObjectItem(":*.Forms_QMenu_2", "Print Invoices by Ship Via...");
    activateItem(":*.Forms_QMenu_2", "Print Invoices by Ship Via...");
    
    waitForObject(":Print Invoices by Ship Via.Print_QPushButton");
    clickButton(":Print Invoices by Ship Via.Print_QPushButton");
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
    
    if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))
        test.fail("Submit button exists in Priting Invoice by ship via screen");
    
    else test.pass("Submit button does not exist in Printing Invoice by ship via screen"); 
    
    waitForObject(":Print Invoices by Ship Via.Cancel_QPushButton");
    clickButton(":Print Invoices by Ship Via.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in printing invoice  by ship via" + e);
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
    
    if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))
        test.fail("Submit button exists in Re-priting Invoice screen");
    
    else test.pass("Submit button does not exist in Re-printing Invoice screen"); 
    
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
        test.fail("Error in posting invoice " + e);
    }
    
    
    //-----Create an Invoice-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
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
    
    waitForObject(":headerTab...._QPushButton");
    clickButton(":headerTab...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_8");
    doubleClickItem(":_listTab_XTreeWidget_8", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Invoice.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Invoice.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":lineItemsTab.New_QPushButton");
    clickButton(":lineItemsTab.New_QPushButton");
    waitForObject(":Item...._QPushButton_2");
    clickButton(":Item...._QPushButton_2");
    waitForObject(":_listTab_XTreeWidget_13");
    doubleClickItem(":_listTab_XTreeWidget_13", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
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
    
    if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))
        test.fail("Submit button exists in Priting Invoice screen");
    
    else test.pass("Submit button does not exist in Printing Invoice screen"); 
    
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
    
    if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))      
        test.fail("Submit button exists in Re-priting Invoice screen");
    
    else test.pass("Submit button does not exist in Re-printing Invoice screen"); 
    
    waitForObject(":Re-Print Invoices.Cancel_QPushButton");
    clickButton(":Re-Print Invoices.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Re printing invoice " + e);
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
    type(":*.Accounts Receivable_QMenu","<Right>");
    
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
        test.fail("Error in posting invoice " + e);
    }
    
    //-----Post Standard Journal-----
    try
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "General Ledger");
    activateItem(":*.Accounting_QMenu", "General Ledger");
    waitForObjectItem(":*.General Ledger_QMenu", "Standard Journals");
    activateItem(":*.General Ledger_QMenu", "Standard Journals");
    waitForObjectItem(":*.Standard Journals_QMenu", "Post...");
    activateItem(":*.Standard Journals_QMenu", "Post...");
    
    if(object.exists(":Post Standard Journal.Submit_QPushButton"))
        test.fail("Submit button exists in Post Standard Journal screen");
    
    else test.pass("Submit button does not exist in Post Standard Journal screen"); 
    
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
    
    if(object.exists(":Post Standard Journal Group.Submit_QPushButton"))
        test.fail("Submit button exists in Post Standard JournalGroup screen");
    
    else test.pass("Submit button does not exist in Post Standard Journal Group screen"); 
    
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
    
    if(object.exists(":Update Late Customer Credit Status.Submit_QPushButton"))
        test.fail("Submit button exists in Update Late Customer Credit Status screen");
    
    else test.pass("Submit button does not exist in Update Late Customer Credit Status screen"); 
    
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
    
    waitForObject(":Print Statement by Customer...._QPushButton");
    clickButton(":Print Statement by Customer...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_12");
    doubleClickItem(":_listTab_XTreeWidget_12", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Print Statement by Customer.Print_QPushButton");
    clickButton(":Print Statement by Customer.Print_QPushButton");
    snooze(1);	  
    nativeType("<Return>");
    
    if(object.exists(":Review EDI Before Sending.Accept_QPushButton"))
        test.fail("Submit button exists in Print Statement by Customer screen");
    
    else test.pass("Submit button does not exist in Print Statement by Customer screen"); 
    
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
    
    if(object.exists(":Work Order Operation Buffer Status by Work Center.Submit_QPushButton"))
        test.fail("Submit button exists in Operation Buffer Status screen");
    
    else test.pass("Submit button does not exist in Operation Buffer Status screen"); 
    
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
    
   
}
