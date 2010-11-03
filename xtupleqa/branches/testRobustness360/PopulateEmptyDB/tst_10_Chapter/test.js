function main()
{
    
    
    source(findFile("scripts","functions.js"));
    
    
    //---login Application--------
    loginAppl("RUNREGISTER");       
    var appEdition = findApplicationEdition();
  
  
    //--------------Define: Check Formats-------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Accounting", 82, 7, 0, Qt.LeftButton);
        waitForObject(":Master Information.Check Formats_QModelIndex");
        mouseClick(":Master Information.Check Formats_QModelIndex", 63, 2, 0, Qt.LeftButton);
        waitForObject(":List Check Formats.New_QPushButton");
        clickButton(":List Check Formats.New_QPushButton");
        waitForObject(":_name_XLineEdit_17");
        type(":_name_XLineEdit_17", "GENERIC-CHECK");
        type(":Check Format._descrip_XLineEdit", "Generic Check Format");
        waitForObject(":_report_XComboBox_3");
        if(findObject(":_report_XComboBox_3").currentText!="APCheck")        
            clickItem(":_report_XComboBox_3", "APCheck",0,0,1,Qt.LeftButton); 
        snooze(2);
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Check Formats._form_XTreeWidget");
        if(object.exists(":_form.GENERIC-CHECK_QModelIndex"))
            test.pass("Check Format created: GENERIC-CHECK");
        else test.fail("Check Format not created: GENERIC-CHECK");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e){test.fail("Exception in creating Check Format @ " + e.lineNumber + ": "+e);}
    
    
    //------------------Chart Of Accounts------------------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        
        COA("01","01","1000","01","Cash at eBank","Asset","CA"); 
        
        COA("01","01","1010","01","Cash at EuroBank","Asset","CA"); 
        
        COA("01","01","6750","01","Finance Fees and Expenses","Expense","EXP"); 
        
        COA("01","01","1500","01","Fixed Assets","Asset","FA");
        
        COA("01","01","6400","01","Depreciation Expense","Expense","DXP");
        
        COA("01","01","3010","01","Paid-In Capital","Equity","EDC");
        
        waitForObject(":Chart of Accounts.Close_QPushButton_2");
        clickButton(":Chart of Accounts.Close_QPushButton_2");
    }
    catch(e){test.fail("Exception in creating Chart of Accounts @ " + e.lineNumber + ": " + e);}
    
    
    
    if(appEdition=="Manufacturing"||appEdition=="Standard")
    {
        
        //---------------Configure ACH in Accounting-------------
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            waitForObject(":Setup._modules_QComboBox");
            clickItem(":Setup._modules_QComboBox","Accounting", 82, 7, 0, Qt.LeftButton);
            waitForObject(":Configure.Accounting_QModelIndex");
            mouseClick(":Configure.Accounting_QModelIndex", 43, 5, 0, Qt.LeftButton);
            
            waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar", "Accounts Payable");
            
            
            waitForObject(":tab.Enable EFT Check Printing_QGroupBox");
            type(":tab.Enable EFT Check Printing_QGroupBox"," ");
            
            waitForObject(":_nextACHBatchNumber_XLineEdit_2");
            type(":_nextACHBatchNumber_XLineEdit_2", "<Ctrl+A>");
            type(":_nextACHBatchNumber_XLineEdit_2", "<Del>");
            type(":_nextACHBatchNumber_XLineEdit_2", "10000");
            type(":_companyId_XLineEdit_2", "<Ctrl+A>");
            type(":_companyId_XLineEdit_2", "<Del>");
            type(":_companyId_XLineEdit_2", "987654");
            clickButton(":Enable EFT Check Printing.Other_QRadioButton");
            type(":_companyName_XLineEdit_2", "ProDiem Inc.");
            clickButton(":Accounting Configuration.Save_QPushButton");
            test.log("Accounting for ACH configured");
        }
	catch(e){test.fail("Exception in configuring Accounting @ " + e.lineNumber + ": " + e);}
        
    }
    else if(appEdition=="PostBooks")
    {
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
            waitForObject(":Setup._modules_QComboBox");
            clickItem(":Setup._modules_QComboBox","Accounting", 82, 7, 0, Qt.LeftButton);
            waitForObject(":Configure.Accounting_QModelIndex");
            mouseClick(":Configure.Accounting_QModelIndex", 43, 5, 0, Qt.LeftButton);
            
            waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar", "Accounts Payable");
            
            test.xverify(object.exists(":tab.Enable ACH Check Printing_QGroupBox"), "Enable ACH Check Printing GroupBox not found");
            waitForObject(":Setup.Save_QPushButton");
            clickButton(":Setup.Save_QPushButton");
        }
	catch(e){test.fail("Exception in configuring Accounting @ " + e.lineNumber + ": " + e);}
    }
    snooze(3);//delay to allow save
    
    if(object.exists(":No_QPushButton"))
        clickButton(":No_QPushButton");
    
    
    
    
    //---------------Define: Bank Accounts------------------
    
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Accounting", 82, 7, 0, Qt.LeftButton);
        waitForObject(":Accounting Mappings.Bank Accounts_QModelIndex");
        mouseClick(":Accounting Mappings.Bank Accounts_QModelIndex", 0, 0, 0, Qt.LeftButton);
        
        waitForObject(":List Bank Accounts.New_QPushButton");
        clickButton(":List Bank Accounts.New_QPushButton");
        waitForObject(":_name_XLineEdit_18");
        type(":_name_XLineEdit_18", "EBANK");
        type(":_description_XLineEdit_27", "eBank Checking Account");
        type(":_bankName_XLineEdit", "eBank");
        type(":_accountNumber_XLineEdit_2", "123456");
        if(!findObject(":_currency_XComboBox").currentText!= "USD -$");
        type(":_currency_XComboBox","USD");
        waitForObject(":_type_XComboBox");
        if(findObject(":_type_XComboBox").currentText!="Checking")
            type(":_type_XComboBox","Checking");
        if(!findObject(":_useGroup.Used in Accounts Payable_QCheckBox").checked)
            clickButton(":_useGroup.Used in Accounts Payable_QCheckBox");
        waitForObject(":_useGroup._nextCheckNum_XLineEdit");
        type(":_useGroup._nextCheckNum_XLineEdit", "3000");
        waitForObject(":_useGroup._form_XComboBox_2");
        if(!findObject(":_useGroup._form_XComboBox_2").currentText!= "GENERIC-CHECK")
            clickItem(":_useGroup._form_XComboBox_2","GENERIC-CHECK",0,0,1,Qt.LeftButton);
        waitForObject(":_useGroup.Used in Accounts Receivable_QCheckBox");
        if(!findObject(":_useGroup.Used in Accounts Receivable_QCheckBox").checked)
            clickButton(":_useGroup.Used in Accounts Receivable_QCheckBox");       
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit","01-01-1000-01");
        nativeType("<Tab>");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        snooze(2);
        waitForObject(":List Bank Accounts._bankaccnt_XTreeWidget");
        if(object.exists(":_bankaccnt.EBANK_QModelIndex"))
            test.pass("Bank Account created: EBANK");
        else test.fail("Bank Account not created: EBANK");
        
        waitForObject(":List Bank Accounts.New_QPushButton");
        clickButton(":List Bank Accounts.New_QPushButton");
        waitForObject(":_name_XLineEdit_18");
        type(":_name_XLineEdit_18", "EURBANK");
        type(":_description_XLineEdit_27", "Euro Bank Checking");
        type(":_bankName_XLineEdit", "Euro Bank");
        type(":_accountNumber_XLineEdit_2", "654321");
        if(!findObject(":_currency_XComboBox").currentText!= "EUR -EUR");
        type(":_currency_XComboBox","EUR");
        if(findObject(":_type_XComboBox").currentText!="Checking")
            type(":Bank Account._bankGroup_QGroupBox","Checking");
        if(!findObject(":_useGroup.Used in Accounts Payable_QCheckBox").checked)
            clickButton(":_useGroup.Used in Accounts Payable_QCheckBox");
        waitForObject(":_useGroup._nextCheckNum_XLineEdit");
        type(":_useGroup._nextCheckNum_XLineEdit", "9000");
        waitForObject(":_useGroup._form_XComboBox_2");
        if(!findObject(":_useGroup._form_XComboBox_2").currentText!= "GENERIC-CHECK")
            clickItem(":_useGroup._form_XComboBox_2","GENERIC-CHECK",0,0,1,Qt.LeftButton);
        waitForObject(":_useGroup.Used in Accounts Receivable_QCheckBox");
        if(!findObject(":_useGroup.Used in Accounts Receivable_QCheckBox").checked)
            clickButton(":_useGroup.Used in Accounts Receivable_QCheckBox");
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit","01-01-1010-01");
        nativeType("<Tab>");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        snooze(1);
        waitForObject(":List Bank Accounts._bankaccnt_XTreeWidget");
        if(object.exists(":_bankaccnt.EURBANK_QModelIndex"))
            test.pass("Bank Account created: EURBANK");
        else test.fail("Bank Account not created: EURBANK");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e){test.fail("Exception in defining Bank Accounts @ " + e.lineNumber + ": "+e)}  
    
    
    //--------------Create: Adjustment Types--------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Accounting", 82, 7, 0, Qt.LeftButton);
        waitForObject(":Accounting Mappings.Bank Adjustment Types_QModelIndex");
        mouseClick(":Accounting Mappings.Bank Adjustment Types_QModelIndex", 0,0, 0, Qt.LeftButton);
        waitForObject(":List Adjustment Types.New_QPushButton");
        clickButton(":List Adjustment Types.New_QPushButton");
        waitForObject(":_name_XLineEdit_19");
        type(":_name_XLineEdit_19", "BANKFEE");
        type(":_description_XLineEdit_28", "Bank Account Fee");
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":_stack_QLabel");
        sendEvent("QMouseEvent", ":_stack_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_10");
        doubleClickItem(":_listTab_XTreeWidget_10","6750",10,10,0,Qt.LeftButton); 
        clickButton(":Type.Debit_QRadioButton");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Adjustment Types._bankadjtype_XTreeWidget");
        if(object.exists(":_bankadjtype.BANKFEE_QModelIndex"))
            test.pass("Adjustment Type created: BANKFEE");
        else test.fail("Adjustment Type not created: BANKFEE");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e){test.fail("Exception in defining Adjustment types @ " + e.lineNumber + ": "+e);}
  
    //------------Define: Fiscal Year----------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Fiscal Calendar");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Fiscal Calendar");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Fiscal Calendar_QMenu", "Fiscal Years...");
        activateItem(":xTuple ERP: OpenMFG Edition.Fiscal Calendar_QMenu", "Fiscal Years...");
        
        waitForObject(":List Fiscal Years.New_QPushButton");
        clickButton(":List Fiscal Years.New_QPushButton");
        waitForObject(":Fiscal Year.XDateEdit_XDateEdit");
        var d = new Date();
        var CurrentYearFull = d.getFullYear();
        var CurrentYear = CurrentYearFull.toString().slice(2);
        type(":Fiscal Year.XDateEdit_XDateEdit","1/1/"+CurrentYearFull);
        type(":Fiscal Year.XDateEdit_XDateEdit_2", "12/31/"+CurrentYearFull);
        waitForObject(":Fiscal Year.Save_QPushButton");
        clickButton(":Fiscal Year.Save_QPushButton");
        var NxtYear = CurrentYearFull+1;
        snooze(0.5);
        waitForObject(":List Fiscal Years.New_QPushButton");
        clickButton(":List Fiscal Years.New_QPushButton");
        waitForObject(":Fiscal Year.XDateEdit_XDateEdit");
        type(":Fiscal Year.XDateEdit_XDateEdit","1/1/"+NxtYear);
        type(":Fiscal Year.XDateEdit_XDateEdit_2", "12/31/"+NxtYear);
        waitForObject(":Fiscal Year.Save_QPushButton");
        clickButton(":Fiscal Year.Save_QPushButton");
        waitForObject(":List Fiscal Years._period_XTreeWidget");
        if(object.exists(":_period.No_QModelIndex"))
            test.pass("Fiscal Year created");
        else test.fail("Fiscal Year not created");
        
        if(object.exists(":_period.No_QModelIndex_2"))
            test.pass("Fiscal Year created");
        else test.fail("Fiscal Year not created");
        
        waitForObject(":List Fiscal Years.Close_QPushButton");
        clickButton(":List Fiscal Years.Close_QPushButton");
    }
    catch(e){test.fail("Exception in creating Fiscal Year @ " + e.lineNumber + ": " + e);}
    
    
    //-------------Define: Fiscal Calendar--------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Fiscal Calendar");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Fiscal Calendar");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Fiscal Calendar_QMenu", "Accounting Periods...");
        activateItem(":xTuple ERP: OpenMFG Edition.Fiscal Calendar_QMenu", "Accounting Periods...");
        
        for(loop=0;loop<2; loop++,CurrentYearFull++) //for two years
        {
            var CurrentYear = CurrentYearFull.toString().slice(2);
            i=CurrentYear;
            if(IsLeapYear(CurrentYearFull)) //find whether the current year is leap year
                var YearSet = new Array("31","29","31","30","31","30","31","31","30","31","30","31");
            else 
                var YearSet = new Array("31","28","31","30","31","30","31","31","30","31","30","31");
            for(j=1;j<=12;j++) //for twelve months of the year
            {
                waitForObject(":List Accounting Periods.New_QPushButton");
                clickButton(":List Accounting Periods.New_QPushButton");
                
                waitForObject(":_year_XComboBox");
                if(findObject(":_year_XComboBox").currentText!="01/01/"+CurrentYear+"-12/31/"+CurrentYear)
                    clickItem(":_year_XComboBox", "01/01/"+CurrentYear+"-12/31/"+CurrentYear,0,0,1,Qt.LeftButton);
                while(findObject(":_year_XComboBox").currentText!="01/01/"+CurrentYear+"-12/31/"+CurrentYear)
                    snooze(0.1);
                
                
                waitForObject(":Accounting Period.XDateEdit_XDateEdit");
                findObject(":Accounting Period.XDateEdit_XDateEdit").clear();
                type(":Accounting Period.XDateEdit_XDateEdit", j+"/1/"+i);
                waitForObject(":Accounting Period.XDateEdit_XDateEdit_2");
                findObject(":Accounting Period.XDateEdit_XDateEdit_2").clear();        
                type(":Accounting Period.XDateEdit_XDateEdit_2", j+"/"+YearSet[j-1]+"/"+i);
                type(":Accounting Period.XDateEdit_XDateEdit_2", "<Tab>");
                while(findObject(":Accounting Period.XDateEdit_XDateEdit_2").text!=j+"/"+YearSet[j-1]+"/"+i)
                    snooze(0.1);
                
                snooze(2);
                waitForObject(":_name_QLineEdit");
                findObject(":_name_QLineEdit").clear();
                snooze(2);
                type(":_name_QLineEdit", CurrentYearFull+"-");
                type(":_name_QLineEdit", (j<10?"0"+j:j));
                snooze(0.5);
                waitForObject(":List Accounting Periods.qt_spinbox_lineedit_QLineEdit");
                findObject(":List Accounting Periods.qt_spinbox_lineedit_QLineEdit").clear();
                snooze(1);
                if(j>=1 && j<=3)
                    type(":List Accounting Periods.qt_spinbox_lineedit_QLineEdit", "1");
                else if(j>=4 && j<=6)
                    type(":List Accounting Periods.qt_spinbox_lineedit_QLineEdit", "2");
                else if(j>=7 && j<=9)
                    type(":List Accounting Periods.qt_spinbox_lineedit_QLineEdit", "3");
                else if(j>=10 && j<=12)
                    type(":List Accounting Periods.qt_spinbox_lineedit_QLineEdit", "4");
                
                
                
                waitForObject(":Accounting Period.Save_QPushButton");
                clickButton(":Accounting Period.Save_QPushButton");
                snooze(1);
                while(!object.exists("{column='0' container=':List Accounting Periods._period_XTreeWidget' text='"+CurrentYearFull+"-"+(j<10?"0"+j:j)+"' type='QModelIndex'}"))
                    snooze(0.1);
            }
            
        }
        waitForObject(":List Accounting Periods.Close_QPushButton");
        clickButton(":List Accounting Periods.Close_QPushButton");
        test.log("Accounting Periods Defined");
        
    }
    catch(e){test.fail("Exception in creating fiscal calendar @ " + e.lineNumber + ": "+e);}
    
}
