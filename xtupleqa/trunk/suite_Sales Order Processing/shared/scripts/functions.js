//-***-This script doc contains all the common code libraries/functions required by the Main driver script-***-



//--------Login into Appl----------
try
{
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
 
   
    waitForObject(":Log In.Options..._QPushButton_2");
    clickButton(":Log In.Options..._QPushButton_2");
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
    waitForObject(":Login Options.Save_QPushButton_2");
    clickButton(":Login Options.Save_QPushButton_2");
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
}
catch(e)
{
    test.fail("Error in logging to application" + e);
}
   
//--------To Calculate Absolute Value of QOH ----------
try
{
function replaceSubstring(inputString, fromString, toString) 
{
   // Goes through the inputString and replaces every occurrence of fromString with toString
   var temp = inputString;
   
   if (fromString == " ") 
   {
      return inputString;
   }
   if (toString.indexOf(fromString) == -1) 
   { // If the string being replaced is not a part of the replacement string (normal situation)
     // while (temp.indexOf(fromString) != -1)
       do
       {
         var toTheLeft = temp.substring(0, temp.indexOf(fromString));
         var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
         temp = toTheLeft + toString + toTheRight;
      }while (temp.indexOf(fromString) != -1); 
   } 
   else
   { // String being replaced is part of replacement string (like "+" being replaced with "++") - prevent an infinite loop
      var midStrings = new Array("~", "`", "_", "^", "#");
      var midStringLen = 1;
      var midString = "";
      // Find a string that doesn't exist in the inputString to be used as an "inbetween" string
      while (midString == "") 
      {
         for (var i=0; i < midStrings.length; i++)
          {
            var tempMidString = "";
            for (var j=0; j < midStringLen; j++) 
            { 
                tempMidString += midStrings[i]; 
            }
            if (fromString.indexOf(tempMidString) == -1)
            {
               midString = tempMidString;
               i = midStrings.length + 1;
            }
         }
      } // Keep on going until we build an "inbetween" string that doesn't exist
      // Now go through and do two replaces - first, replace the "fromString" with the "inbetween" string
      while (temp.indexOf(fromString) != -1) 
      {
         var toTheLeft = temp.substring(0, temp.indexOf(fromString));
         var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
         temp = toTheLeft + midString + toTheRight;
      }
      // Next, replace the "inbetween" string with the "toString"
      while (temp.indexOf(midString) != -1)
      {
         var toTheLeft = temp.substring(0, temp.indexOf(midString));
         var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
         temp = toTheLeft + toString + toTheRight;
      }
   } // Ends the check to see if the string being replaced is part of the replacement string or not
   return temp; // Send the updated string back to the user
} // Ends the "replaceSubstring" function
    
}
catch(e)
{
    test.fail("Error in calculating the absolute value of QOH" + e);
}

//-----------------To verify the QOH by item-------------

try
{
    function queryQoh(inputString)
    {
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand...");
    activateItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand...");
     
    if(!object.exists(":_filterGroup.Manage_QPushButton"))
    {
     waitForObject(":Quantities on Hand.More_QToolButton");
     clickButton(":Quantities on Hand.More_QToolButton");
    }
    waitForObject(":_filterGroup.xcomboBox1_XComboBox");
     clickItem(":_filterGroup.xcomboBox1_XComboBox","Site",10,10,0, Qt.LeftButton);
    waitForObject(":_filterGroup.widget1_WComboBox");
    clickItem(":_filterGroup.widget1_WComboBox","WH1",10,10,0, Qt.LeftButton);
    waitForObject(":_filterGroup.+_QToolButton");
    clickButton(":_filterGroup.+_QToolButton");
    waitForObject(":_filterGroup.xcomboBox2_XComboBox");
    clickItem(":_filterGroup.xcomboBox2_XComboBox","Item",10,10,0, Qt.LeftButton);
    waitForObject(":_filterGroup.ItemLineEdit_ItemLineEdit");
    type(":_filterGroup.ItemLineEdit_ItemLineEdit",inputString);
    snooze(0.5);
    nativeType("<Tab>");
    waitForObject(":Quantities on Hand.Query_QToolButton");
    clickButton(":Quantities on Hand.Query_QToolButton");
    waitForObject(":_list.QOH_QModelIndex");
    var qoh=findObject(":_list.QOH_QModelIndex").text;
    var qohi=parseInt(replaceSubstring(qoh,",",""));
    waitForObject(":Quantities on Hand.Close_QToolButton");
    clickButton(":Quantities on Hand.Close_QToolButton");
    
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
//        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
//        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
//        activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
//        waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand..");
//        activateItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand..");
//        waitForObjectItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
//        activateItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
//        
//        waitForObject(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit");
//        type(":_itemGroup.VirtualClusterLineEdit_ItemLineEdit", inputString);
//        snooze(0.5);
//        waitForObject(":_QTreeView");
//        type(":_QTreeView", "<Tab>");
//        waitForObject(":Quantities on Hand by Item.Query_QToolButton");
//        clickButton(":Quantities on Hand by Item.Query_QToolButton");
//        waitForObject(":_list.QOH_QModelIndex");
//        var qoh=findObject(":_list.QOH_QModelIndex").text;
//        var qohi=parseInt(replaceSubstring(qoh,",",""));
//        waitForObject(":Quantities on Hand by Item.Close_QToolButton");
//         clickButton(":Quantities on Hand by Item.Close_QToolButton");
        return qohi;
   }
}
catch(e)
{
    test.fail("Error in querying QOH by item");
}
    









