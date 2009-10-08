//--***--This script is developed to check the status of Batch Manager Submissions (when Batch Manager is disabled)--***--


function main()
{
   
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
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
