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
    
    //---find Application Edition------ 
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
    
    //-----Assign All Privileges-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Maintain Users...");
    activateItem(":xTuple ERP: *.System_QMenu", "Maintain Users...");
    
    waitForObject(":List Users._usr_XTreeWidget");
    doubleClickItem(":List Users._usr_XTreeWidget", "admin", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_email_XLineEdit");
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
    
    //-----System Preferrences-----
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
    
    //-----Enable Sales Reservations-----
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
    
    //-----Exit the Application-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: *.System_QMenu", "Exit xTuple ERP...");
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
        
    //-----Verify Batch Manager Status-----  
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Master Information");
    activateItem(":xTuple ERP: *.System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: *.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP: *.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.Batch Manager_QGroupBox");
    if(findObject(":Database Information.Batch Manager_QGroupBox").checked)
        type(":Database Information.Batch Manager_QGroupBox", " ");
    
    waitForObject(":Database Information.Save_QPushButton");
    clickButton(":Database Information.Save_QPushButton");
    
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    snooze(1);
    menu = waitForObject(":xTuple ERP: *.System_QMenu");
    menuItem = "&Batch Manager...";
    
    actions = menu.actions();
    for(i=0;i<actions.count();i++)
        if(actions.at(i).text == menuItem || i==actions.count()-1) break;
    if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
    else test.pass(menuItem+"not found in "+appEdition);
    
    //-----Purchase Order-----
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
    
    //-----Electronic Quote-----
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
    
     //-----Allocate Reservations-----
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
    
    //-----Create Planned Orders by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
    activateItem(":*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":*.Scheduling_QMenu", "Run MRP");
    activateItem(":*.Scheduling_QMenu", "Run MRP");
    waitForObjectItem(":*.Run MRP_QMenu", "by Planner Code...");
    activateItem(":*.Run MRP_QMenu", "by Planner Code...");
    
    if(!object.exists(":Run MRP by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Create Planned Order by Plannercode screen");
    
    else test.pass("Submit Button does not exist in Create Planned Order by Plannercode screen");
        
    waitForObject(":Run MRP by Planner Code.Cancel_QPushButton");
    clickButton(":Run MRP by Planner Code.Cancel_QPushButton");
    
    //-----Create Planned Orders by Plannercode-----
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
    
    //-----Release Planned Orders by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
    activateItem(":*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":*.Scheduling_QMenu", "Release Planned Orders...");
    activateItem(":*.Scheduling_QMenu", "Release Planned Orders...");
    
    if(object.exists(":Release Planned Orders by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Release Planned Order by Plannercode screen");
    
    else test.pass("Submit Button does not exist in Release Planned Order by Plannercode screen");
    
    waitForObject(":Release Planned Orders by Planner Code.Cancel_QPushButton");
    clickButton(":Release Planned Orders by Planner Code.Cancel_QPushButton");
    
    //-----Create Buffer Status by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Constraint Management");
    activateItem(":*.Schedule_QMenu", "Constraint Management");
    type(":*.Schedule_QMenu","<Right>");
    type(":*.Schedule_QMenu","<Right>");
    waitForObjectItem(":*.Constraint Management_QMenu", "Update Status");
    activateItem(":*.Constraint Management_QMenu", "Update Status");
    waitForObjectItem(":*.Update Status_QMenu", "by Planner Code...");
    activateItem(":*.Update Status_QMenu", "by Planner Code...");
    
    if(object.exists(":Run Buffer Status by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Create Buffer status by Plannercode screen");
    
    else test.pass("Submit Button does not exist in Create Buffer status by Plannercode screen");
    
    waitForObject(":Run Buffer Status by Planner Code.Cancel_QPushButton");
    clickButton(":Run Buffer Status by Planner Code.Cancel_QPushButton");
    
    //-----Create Buffer Status by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Constraint Management");
    activateItem(":*.Schedule_QMenu", "Constraint Management");
    waitForObjectItem(":*.Constraint Management_QMenu", "Update Status");
    activateItem(":*.Constraint Management_QMenu", "Update Status");
    type(":*.Constraint Management_QMenu", "<Right>");
    type(":*.Constraint Management_QMenu", "<Right>");
    waitForObjectItem(":*.Update Status_QMenu", "by Item...");
    activateItem(":*.Update Status_QMenu", "by Item...");
    
    if(object.exists(":Run Buffer Status by Item.Submit_QPushButton"))
        test.fail("Submit Button exists in Create Buffer status by Item screen");               
    else test.pass("Submit Button does not exists in Create Buffer status by Item screen");
                
    waitForObject(":Run Buffer Status by Item.Cancel_QPushButton");
    clickButton(":Run Buffer Status by Item.Cancel_QPushButton");
    
    //-----Run MPS by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
    activateItem(":*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":*.Scheduling_QMenu", "Run MPS...");
    activateItem(":*.Scheduling_QMenu", "Run MPS...");
    
    if(object.exists(":Run MPS by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Create Buffer status by Item screen");
                
    else test.pass("Submit Button does not exists in Create Buffer status by Item screen");        
    
    waitForObject(":Run MPS by Planner Code.Cancel_QPushButton");
    clickButton(":Run MPS by Planner Code.Cancel_QPushButton");
          
    //-----Releasing Planned Transfer Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Scheduling");
    activateItem(":*.Schedule_QMenu", "Scheduling");
    waitForObjectItem(":*.Scheduling_QMenu", "Release Planned Orders...");
    activateItem(":*.Scheduling_QMenu", "Release Planned Orders...");
    
    if(object.exists(":Release Planned Orders by Planner Code.Submit_QPushButton"))
        test.fail("Submit Button exists in Release Planned Order by Plannercode screen");
    
    else test.pass("Submit Button does not exist in Release Planned Order by Plannercode screen");
    
    waitForObject(":Release Planned Orders by Planner Code.Cancel_QPushButton");
    clickButton(":Release Planned Orders by Planner Code.Cancel_QPushButton");
    
    //-----Time Phased Demand by Plannercode-----  
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
    activateItem(":*.Schedule_QMenu", "Capacity Planning");
    waitForObjectItem(":*.Capacity Planning_QMenu", "Time-Phased Demand...");
    activateItem(":*.Capacity Planning_QMenu", "Time-Phased Demand...");
    
    if(object.exists(":Time Phased Demand by Planner Code.Submit_QPushButton"))
        test.fail("Submit button exits in Time Phased Demand by Planner code");
    
    else test.pass("Submit button does not exit in Time Phased Demand by Planner code");
    
    waitForObject(":Time Phased Demand by Planner Code.Close_QPushButton");
    clickButton(":Time Phased Demand by Planner Code.Close_QPushButton");
    
    //-----Time Phased Production by Plannercode-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
    activateItem(":*.Schedule_QMenu", "Capacity Planning");
    waitForObjectItem(":*.Capacity Planning_QMenu", "Time-Phased Production");
    activateItem(":*.Capacity Planning_QMenu", "Time-Phased Production");
    waitForObjectItem(":*.Time-Phased Production_QMenu", "by Planner Code...");
    activateItem(":*.Time-Phased Production_QMenu", "by Planner Code...");
    
    if(object.exists(":Time-Phased Production by Planner Code.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Production by Planner code screen");
    
    else test.pass("Submit button does not exist in Time Phased Production by Planner code screen");
    
    waitForObject(":Time-Phased Production by Planner Code.Close_QPushButton");
    clickButton(":Time-Phased Production by Planner Code.Close_QPushButton");
    
    //-----Time Phased Production by Item-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Schedule");
    activateItem(":xTuple ERP: *_QMenuBar", "Schedule");
    waitForObjectItem(":*.Schedule_QMenu", "Capacity Planning");
    activateItem(":*.Schedule_QMenu", "Capacity Planning");
    waitForObjectItem(":*.Capacity Planning_QMenu", "Time-Phased Production");
    activateItem(":*.Capacity Planning_QMenu", "Time-Phased Production");
    waitForObjectItem(":*.Time-Phased Production_QMenu", "by Item...");
    activateItem(":*.Time-Phased Production_QMenu", "by Item...");
         
    if(object.exists(":Time-Phased Production by Item.Submit_QPushButton"))
        test.fail("Submit button exists in Time Phased Production by Item screen");
    
    else test.pass("Submit button does not exist in Time Phased Production by Item screen");
    
    waitForObject(":Time-Phased Production by Item.Close_QPushButton");
    clickButton(":Time-Phased Production by Item.Close_QPushButton");
    
    //-----Time Phased Availability-----
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
    
    //-----Time Phased Booking by Customer-----
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
    
    //-----Time Phased Booking by Item-----
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
    
    //-----Time Phased Bookings by Product Category-----
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
    
    //-----Time Phased Sales History by Customer Group-----
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
    
    //-----Time Phased Sales History by Customer-----
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
    
    //-----Time Phased Sales History by Customer by Item-----
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
    
    //-----Time Phased Sales History by Product Category-----
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
    
    //-----Time Phased Sales History by Item-----
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
    
    //-----Time Phased Usage Statistics by Item-----
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
    
    //-----Update Actual Costs by Item-----
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
    
    else test.pass("Submit button exists in Update Actual Costs by Item screen");
    
    waitForObject(":Update Actual Costs by Item.Cancel_QPushButton");
    clickButton(":Update Actual Costs by Item.Cancel_QPushButton");
    
    //-----Update Actual Costs by Classcode-----
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
    
    else test.pass("Submit button exists in Update Actual Costs by Class code screen");
    
    waitForObject(":Update Actual Costs by Class Code.Cancel_QPushButton");
    clickButton(":Update Actual Costs by Class Code.Cancel_QPushButton");
    
    //-----Post Actual Costs by Item-----
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
    
    else test.pass("Submit button exists in Post Actual Costs by Item screen");
    
    waitForObject(":Post Actual Costs by Item.Cancel_QPushButton");
    clickButton(":Post Actual Costs by Item.Cancel_QPushButton");
    
    //-----Post Actual Costs by Classcode-----
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
    
    else test.pass("Submit button exists in Post Actual Costs by Class code screen");
    
    waitForObject(":Post Actual Costs by Class Code.Cancel_QPushButton");
    clickButton(":Post Actual Costs by Class Code.Cancel_QPushButton");
    
    //-----Post Standard Costs by Item-----
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
    
    else test.pass("Submit button exists in Post Standard Costs by Item screen");
    
    waitForObject(":Update Standard Costs By Item.Cancel_QPushButton");
    clickButton(":Update Standard Costs By Item.Cancel_QPushButton");
    
    //-----Post Standard Costs by Classcode-----
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
    
    else test.pass("Submit button exists in Post Standard Costs by Class code screen");
    
    waitForObject(":Update Standard Costs By Class Code.Cancel_QPushButton");
    clickButton(":Update Standard Costs By Class Code.Cancel_QPushButton");
        
    //-----Send Electronic Invoice-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":*.Accounting_QMenu", "Accounts Receivable");
    activateItem(":*.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":*.Accounts Receivable_QMenu", "Invoice");
    activateItem(":*.Accounts Receivable_QMenu", "Invoice");        
    snooze(1);
    menu = waitForObject(":*.Invoice_QMenu");
    menuItem = "Send &Electronic Invoice...";
    
    actions = menu.actions();
    for(i=0;i<actions.count();i++)
        if(actions.at(i).text == menuItem || i==actions.count()-1) break;
    if(actions.at(i).text==menuItem) test.fail(menuItem+"present in "+ appEdition);
    else test.pass(menuItem+"not found in "+appEdition);
   
    
}
