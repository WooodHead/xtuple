//-***-This script doc contains all the common code libraries/functions required by the Main driver script-***-



//--------Login into Appl----------
function loginAppl(userrole)
{
    
    var set = testData.dataset("login.tsv");
    var url, db, port, pwd,realname,username;
    db=pwd=port=url=realname=username="";
    for(var records in set)
    {
        url=testData.field(set[records],"HOST");
        db=testData.field(set[records],"DB");
        port=testData.field(set[records],"PORT");
        pwd=testData.field(set[records],"PASSWORD");
        role=testData.field(set[records],"ROLE");
        username=testData.field(set[records],"USERNAME");
        realname=testData.field(set[records],"REALNAME");
        if(userrole==role) break;
        
    }
    
    if(userrole!=role)
    {
        test.fatal("Please enter user details in login.tsv for the role: "+userrole);
        exit(1);
    }
    
    
    waitForObject(":Log In.Options..._QPushButton");
    clickButton(":Log In.Options..._QPushButton");
    waitForObject(":_server_QLineEdit");
    if(findObject(":_server_QLineEdit").text!= url)
    {
        findObject(":_server_QLineEdit").text=url;
        test.log("URL Changed to: "+url);
    }
    if(findObject(":_database_QLineEdit").text!=db)
    {
        findObject(":_database_QLineEdit").text=db;
        test.log("Database Changed to: "+db);
    }
    if(findObject(":_port_QLineEdit").text!=port)
    {
        findObject(":_port_QLineEdit").text=port;
        test.log("Port Changed to:" + port);
    }
    clickButton(":Login Options.Save_QPushButton");
    waitForObject(":_username_QLineEdit");    
    type(":_username_QLineEdit", username);
    waitForObject(":_username_QLineEdit");
    type(":_username_QLineEdit", "<Tab>");
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", pwd);
    waitForObject(":_password_QLineEdit");
    type(":_password_QLineEdit", "<Return>");
    test.log("Logged in Application");
    
}


function handleCrash()
{
    test.log("The application Crashed - exiting Execution");
}


//-----Verify the submission in Batch Manager-----
function batchmanager( )
{
    
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *.System_QMenu", "Batch Manager...");
    activateItem(":xTuple ERP: *.System_QMenu", "Batch Manager...");
    
    waitForObject(":Submitted By:.Current User_QRadioButton");
    clickButton(":Submitted By:.Current User_QRadioButton");
    if(!findObject(":_frame.Automatically Update_QCheckBox").checked)
        clickButton(":_frame.Automatically Update_QCheckBox");
    if(findObject(":Batch Manager.Show Completed Actions_QCheckBox").checked)
        clickButton(":Batch Manager.Show Completed Actions_QCheckBox");
    var _delay=0;
    while(findObject(":_frame._batch_XTreeWidget").topLevelItemCount!=0)
    {
        snooze(1);
        _delay=_delay+1;
        if(_delay==1800 && findObject(":_frame._batch_XTreeWidget").topLevelItemCount!=0)
        {
            test.fail("Waited for 30 minutes, Job not Done - Switching to next Job..");
            return false;
        }
        
    }
   
    if(!findObject(":Batch Manager.Show Completed Actions_QCheckBox").checked)
        clickButton(":Batch Manager.Show Completed Actions_QCheckBox");
    
    waitForObject(":_frame._batch_XTreeWidget");
    var sWidgetTreeControl = ":_frame._batch_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    type(":_frame._batch_XTreeWidget","<Ctrl+End>");
    
    var allDoneStatus = true;
    for(var loop=0; loop<findObject(":_frame._batch_XTreeWidget").topLevelItemCount;loop++)
    {
       
        obj_TreeTopLevelItem = obj_TreeRootItem.child(loop);
        if(obj_TreeTopLevelItem.text(3)=="Scheduled" && obj_TreeTopLevelItem.text(5)!="")
        {
            test.log("Error in Submission");
            return false;
        }
         
       
    }
    
    waitForObject(":Batch Manager.Close_QPushButton");
    clickButton(":Batch Manager.Close_QPushButton");
    
    test.log("Time Taken for this submission:"+_delay+" sec");
    return allDoneStatus;
    
    
}
    
    
    
