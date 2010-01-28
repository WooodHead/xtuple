function main()
{
    
    
    source(findFile("scripts","functions.js"));
    
    
    //---login Application--------
    loginAppl("RUNREGISTER");       
    var appEdition = findApplicationEdition();
    
  
    //--------------Define: Check Formats-------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Check Formats...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Check Formats...");
        waitForObject(":List Check Formats.New_QPushButton");
        clickButton(":List Check Formats.New_QPushButton");
        waitForObject(":_name_XLineEdit_17");
        type(":_name_XLineEdit_17", "GENERIC-CHECK");
        type(":Check Format._descrip_XLineEdit", "Generic Check Format");
        waitForObject(":_report_XComboBox_3");
        if(findObject(":_report_XComboBox_3").currentText!="APCheck")        
            clickItem(":_report_XComboBox_3", "APCheck",0,0,1,Qt.LeftButton); 
        snooze(2);
        waitForObject(":Check Format.Save_QPushButton");
        clickButton(":Check Format.Save_QPushButton");
        waitForObject(":List Check Formats._form_XTreeWidget");
        if(object.exists(":_form.GENERIC-CHECK_QModelIndex"))
            test.pass("Check Format created: GENERIC-CHECK");
        else test.fail("Check Format not created: GENERIC-CHECK");
        waitForObject(":List Check Formats.Close_QPushButton");
        clickButton(":List Check Formats.Close_QPushButton");
    }catch(e){test.fail("Exception in creating Check Format:"+e);}
    
    
    //------------------Chart Of Accounts------------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
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
    }catch(e){test.fail("Exception in creating Chart of Accounts");}
    
    
    
    
    if(appEdition=="Manufacturing"||appEdition=="Standard")
    {
        
        //---------------Configure ACH in Accounting-------------
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
            activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
            
            waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar", "Accounts Payable");
            waitForObject(":tab.Enable ACH Check Printing_QGroupBox");
            if(!findObject(":tab.Enable ACH Check Printing_QGroupBox").checked)
                type(":tab.Enable ACH Check Printing_QGroupBox"," ");
            waitForObject(":_nextACHBatchNumber_XLineEdit");
            type(":_nextACHBatchNumber_XLineEdit", "<Ctrl+A>");
            type(":_nextACHBatchNumber_XLineEdit", "<Del>");
            type(":_nextACHBatchNumber_XLineEdit", "10000");
            type(":_companyId_XLineEdit", "<Ctrl+A>");
            type(":_companyId_XLineEdit", "<Del>");
            type(":_companyId_XLineEdit", "987654");
            clickButton(":Enable ACH Check Printing.Other_QRadioButton");
            type(":_companyName_XLineEdit", "ProDiem Inc.");
            waitForObject(":Enable ACH Check Printing._achSuffix_QComboBox");
            type(":Enable ACH Check Printing._achSuffix_QComboBox","<Ctrl+A>");
            type(":Enable ACH Check Printing._achSuffix_QComboBox","<Del>");
            type(":Enable ACH Check Printing._achSuffix_QComboBox",".dat");
            clickButton(":Accounting Configuration.Save_QPushButton");
            test.log("Accounting for ACH configured");
        }catch(e){test.fail("Exception in configuring Accounting");}
        
    }
    else if(appEdition=="PostBooks")
    {
        try{
            waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
            activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Configure Modules");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
            activateItem(":xTuple ERP: OpenMFG Edition.Configure Modules_QMenu", "Accounting...");
            
            waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
            clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar", "Accounts Payable");
            
            test.xverify(object.exists(":tab.Enable ACH Check Printing_QGroupBox"), "Enable ACH Check Printing GroupBox not found");
            waitForObject(":Accounting Configuration.Save_QPushButton");
            clickButton(":Accounting Configuration.Save_QPushButton");
        }catch(e){test.fail("Exception in configuring Accounting");}
    }
    snooze(3);//delay to allow save
    
    if(object.exists(":No_QPushButton"))
        clickButton(":No_QPushButton");
    
    
    
    
    //---------------Define: Bank Accounts------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Bank Accounts...");
        activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Bank Accounts...");
        
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
        waitForObject(":_accountGroup._main_XLineEdit");
        type(":_accountGroup._main_XLineEdit", "01-01-1000-01");
        clickButton(":Bank Account.Save_QPushButton");
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
        type(":_accountGroup._main_XLineEdit", "01-01-1010-01");
        waitForObject(":Bank Account.Save_QPushButton");
        clickButton(":Bank Account.Save_QPushButton");
        snooze(1);
        waitForObject(":List Bank Accounts._bankaccnt_XTreeWidget");
        if(object.exists(":_bankaccnt.EURBANK_QModelIndex"))
            test.pass("Bank Account created: EURBANK");
        else test.fail("Bank Account not created: EURBANK");
        
        waitForObject(":List Bank Accounts.Close_QPushButton");
        clickButton(":List Bank Accounts.Close_QPushButton");
    }catch(e){test.fail("Exception in defining Bank Accounts:"+e)}  


//--------------Create: Adjustment Types--------------
try{
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Adjustment Types...");
    activateItem(":xTuple ERP: OpenMFG Edition.Master Information_QMenu_8", "Adjustment Types...");
    waitForObject(":List Adjustment Types.New_QPushButton");
    clickButton(":List Adjustment Types.New_QPushButton");
    waitForObject(":_name_XLineEdit_19");
    type(":_name_XLineEdit_19", "BANKFEE");
    type(":_description_XLineEdit_28", "Bank Account Fee");
    type(":Adjustment Type._main_XLineEdit", "01-01-6750-01");
    clickButton(":Type.Debit_QRadioButton");
    clickButton(":Adjustment Type.Save_QPushButton");
    waitForObject(":List Adjustment Types._bankadjtype_XTreeWidget");
    if(object.exists(":_bankadjtype.BANKFEE_QModelIndex"))
        test.pass("Adjustment Type created: BANKFEE");
    else test.fail("Adjustment Type not created: BANKFEE");
    
    waitForObject(":List Adjustment Types.Close_QPushButton");
    clickButton(":List Adjustment Types.Close_QPushButton");
}catch(e){test.fail("Exception in defining Adjustment types:"+e);}

    //------------Define: Fiscal Year----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
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
    }catch(e){test.fail("Exception in creating Fiscal Year");}
  
    //-------------Define: Fiscal Calendar--------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
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
                waitForObject(":Accounting Period.qt_spinbox_lineedit_QLineEdit");
                findObject(":Accounting Period.qt_spinbox_lineedit_QLineEdit").clear();
                snooze(1);
                if(j>=1 && j<=3)
                    type(":Accounting Period.qt_spinbox_lineedit_QLineEdit", "1");
                else if(j>=4 && j<=6)
                    type(":Accounting Period.qt_spinbox_lineedit_QLineEdit", "2");
                else if(j>=7 && j<=9)
                    type(":Accounting Period.qt_spinbox_lineedit_QLineEdit", "3");
                else if(j>=10 && j<=12)
                    type(":Accounting Period.qt_spinbox_lineedit_QLineEdit", "4");
                
                
                
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
        
    }catch(e){test.fail("Exception in creating fiscal calendar:"+e);}
    
}
