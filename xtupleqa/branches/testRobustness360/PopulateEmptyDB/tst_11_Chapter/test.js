function main()
{
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER");       
    var appEdition = findApplicationEdition();
    
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Financial Statements");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Financial Statements");
        waitForObject(":xTuple ERP: OpenMFG Edition.Financial Statements_QMenu");
        activateItem(":xTuple ERP: OpenMFG Edition.Financial Statements_QMenu", "List Financial Reports...");
        
        //---------------Create Basic Income Statement---------------
        waitForObjectItem(":List Financial Reports._flhead_XTreeWidget", "Basic Income Statement");
        clickItem(":List Financial Reports._flhead_XTreeWidget", "Basic Income Statement", 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Financial Reports.Copy_QPushButton");
        clickButton(":List Financial Reports.Copy_QPushButton");
        waitForObject(":Target Report:_QLineEdit");
        type(":Target Report:_QLineEdit", "Official Income Statement");
        clickButton(":Copy Financial Report.OK_QPushButton");
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "Official Income Statement", 5, 5, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "INCOME", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Delete_QPushButton");
        waitForObject(":frame.Add Top Level Group_QPushButton");
        clickButton(":frame.Add Top Level Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "REVENUE");
        type(":_description_XLineEdit_29", "REVENUE");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)	
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Gross Revenue");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        waitForObject(":frame.Add Top Level Group_QPushButton");
        clickButton(":frame.Add Top Level Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "EXPENSES");
        type(":_description_XLineEdit_29", "EXPENSES");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)        
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");  
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Expenses");
        clickButton(":Operation.Subtract from Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Sales");
        type(":_description_XLineEdit_29", "Sales");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Sales");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Add Group_QPushButton");
        clickButton(":frame.Add Group_QPushButton");
        
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Other Revenue");
        type(":_description_XLineEdit_29", "Other Revenue");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Other Revenue");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Cost of Goods Sold");
        type(":_description_XLineEdit_29", "Cost of Goods Sold");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)        
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox")!= "Parent");
        clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        snooze(1);
        type(":_altSubtotalLabel_QLineEdit", "Total COGS");
        clickButton(":Operation.Subtract from Group Total_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Add Group_QPushButton");
        clickButton(":frame.Add Group_QPushButton");
        snooze(2);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "General Expenses");
        type(":_description_XLineEdit_29", "General Expenses");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        snooze(1);
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox")!= "Parent");
        clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total General Expenses");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Depreciation Expense");
        type(":_description_XLineEdit_29", "Depreciation Expense");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox")!= "Parent");
        clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Depreciation Expenses");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "Official Income Statement", 5, 5, 0, Qt.LeftButton);     
        snooze(2);
        waitForObject(":Financial Report.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show Grand Total_QCheckBox");
        if(!findObject(":_options.Show Grand Total_QCheckBox").checked)
            clickButton(":_options.Show Grand Total_QCheckBox");
        waitForObject(":Alternate Labels.Alternate Budget:_QCheckBox");
        if(!findObject(":Alternate Labels.Alternate Budget:_QCheckBox").checked)
            clickButton(":Alternate Labels.Alternate Budget:_QCheckBox");
        waitForObject(":Alternate Labels._altBudgetText_QLineEdit");
        type(":Alternate Labels._altBudgetText_QLineEdit", "Total Budget");
        if(!findObject(":Alternate Labels.Alternate Grand Total:_QCheckBox").checked)
            clickButton(":Alternate Labels.Alternate Grand Total:_QCheckBox");
        waitForObject(":Alternate Labels._altTotalText_QLineEdit");
        type(":Alternate Labels._altTotalText_QLineEdit", "Net Income");
        waitForObject(":Financial Report.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report.qt_tabwidget_tabbar_QTabBar", "Row Layout");
        snooze(0.5);
        
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget", "REVENUE", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget", "REVENUE.Sales", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");    
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget", "REVENUE.Other Revenue", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");    
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget", "REVENUE.Cost of Goods Sold", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");    
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget", "EXPENSES", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");    
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");    
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget", "EXPENSES.Depreciation Expense", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "Official Income Statement", 5, 5, 0, Qt.LeftButton);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE.Sales", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Revenue")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Revenue",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="SI-Sales Income");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "SI-Sales Income",0,0,1,Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales");
        clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
          waitForObject(":List Financial Reports.Save_QPushButton");        
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE.Other Revenue", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Revenue")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Revenue",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="SO-Other Revenue");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "SO-Other Revenue",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales");
        clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");        
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE.Cost of Goods Sold", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Expense")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Expense",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="COGS-Cost of Goods Sold");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "COGS-Cost of Goods Sold",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Subtract from Group Total_QRadioButton_2");
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales");
        clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");         
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Expense")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Expense",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="EXP-Expenses");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "EXP-Expenses",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales");
        clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.Depreciation Expense", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Expense")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Expense",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="DXP-Depreciation Expense");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "DXP-Depreciation Expense",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales");
        clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        if(object.exists(":_flhead.Official Income Statement_QModelIndex"))
            test.pass("Financial Report created:Official Income Statement");
        else test.fail("Financial Report not created:Official Income Statement");
        
    }catch(e){test.fail("Exception in creating official income statement:"+e);}  
    
    try{
        //-------------Create Official Balance Sheet------------
        waitForObjectItem(":List Financial Reports._flhead_XTreeWidget", "Basic Balance Sheet");
        clickItem(":List Financial Reports._flhead_XTreeWidget", "Basic Balance Sheet", 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Financial Reports.Copy_QPushButton");
        clickButton(":List Financial Reports.Copy_QPushButton");
        waitForObject(":Target Report:_QLineEdit");
        type(":Target Report:_QLineEdit", "Official Balance Sheet");
        waitForObject(":Copy Financial Report.OK_QPushButton");
        clickButton(":Copy Financial Report.OK_QPushButton");
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "Official Balance Sheet", 5, 5, 0, Qt.LeftButton);
        waitForObjectItem(":frame._layout_XTreeWidget", "ASSETS");
        clickItem(":frame._layout_XTreeWidget", "ASSETS", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Delete_QPushButton");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY", 81, 10, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Delete_QPushButton");
        
        clickButton(":frame.Add Top Level Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "ASSETS");
        type(":_description_XLineEdit_29", "ASSETS");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)	
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Assets");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame.Add Top Level Group_QPushButton");
        clickButton(":frame.Add Top Level Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "LIABILITIES AND OWNERS EQUITY");
        type(":_description_XLineEdit_29", "LIABILITIES AND OWNERS EQUITY");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)	
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Liabilities and O.E.");
        clickButton(":Operation.Subtract from Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        snooze(1); 
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Cash Assets");
        type(":_description_XLineEdit_29", "Cash Assets");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Cash Assets");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(2);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Current Assets");
        type(":_description_XLineEdit_29", "Current Assets");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Current Assets");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Inventory Assets");
        type(":_description_XLineEdit_29", "Inventory Assets");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Inventory Assets");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Fixed Assets");
        type(":_description_XLineEdit_29", "Fixed Assets");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Fixed Assets");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "LIABILITIES");
        type(":_description_XLineEdit_29", "LIABILITIES");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Liabilities");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "OWNERS EQUITY");
        type(":_description_XLineEdit_29", "OWNERS EQUITY");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Owners Equity");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.LIABILITIES", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Current Liabilities");
        type(":_description_XLineEdit_29", "Current Liabilities");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Current Liabilities");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.LIABILITIES", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Long Term Liabilities");
        type(":_description_XLineEdit_29", "Long Term Liabilities");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Long Term Liabilities");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Capital Stock");
        type(":_description_XLineEdit_29", "Capital Stock");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Capital Stock");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Retained Earnings");
        type(":_description_XLineEdit_29", "Retained Earnings");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)        
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Retained Earnings");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Year To Date Net Income");
        type(":_description_XLineEdit_29", "Year To Date Net Income");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        snooze(1);
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "Official Balance Sheet", 5, 5, 0, Qt.LeftButton);
        
        waitForObject(":Financial Report.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show Grand Total_QCheckBox");
        if(!findObject(":_options.Show Grand Total_QCheckBox").checked)
            clickButton(":_options.Show Grand Total_QCheckBox");
        waitForObject(":Alternate Labels.Alternate Budget:_QCheckBox");
        if(findObject(":Alternate Labels.Alternate Budget:_QCheckBox").checked)
            clickButton(":Alternate Labels.Alternate Budget:_QCheckBox");
        waitForObject(":Alternate Labels.Alternate Grand Total:_QCheckBox");
        if(!findObject(":Alternate Labels.Alternate Grand Total:_QCheckBox").checked)
            clickButton(":Alternate Labels.Alternate Grand Total:_QCheckBox");
        waitForObject(":Alternate Labels._altTotalText_QLineEdit");
        type(":Alternate Labels._altTotalText_QLineEdit", "Balance Sheet Check Total");
        clickTab(":Financial Report.qt_tabwidget_tabbar_QTabBar", "Row Layout");
        waitForObject(":frame._layout_XTreeWidget");
        
        doubleClickItem(":frame._layout_XTreeWidget", "ASSETS", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget", "ASSETS.Cash Assets", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");    
        clickButton(":List Financial Reports.Save_QPushButton");
        
        snooze(1);
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget", "ASSETS.Inventory Assets", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "ASSETS.Fixed Assets", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.LIABILITIES", 5, 5, 0, Qt.LeftButton);    waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.LIABILITIES.Current Liabilities", 5, 5, 0, Qt.LeftButton);    
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.LIABILITIES.Long Term Liabilities", 5, 5, 0, Qt.LeftButton);    
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY", 5, 5, 0, Qt.LeftButton);    
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Capital Stock", 5, 5, 0, Qt.LeftButton);    
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Retained Earnings", 5, 5, 0, Qt.LeftButton);    
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");    
        doubleClickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 0, Qt.LeftButton);    
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="ASSETS")
            clickItem(":_group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");  
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "Official Balance Sheet", 5, 5, 0, Qt.LeftButton);
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Cash Assets", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Asset")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Asset",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="CA-Cash Assets");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "CA-Cash Assets",0,0,1,Qt.LeftButton);    waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Asset")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Asset",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="CAS-Current Assets");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "CAS-Current Assets",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Inventory Assets", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Asset")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Asset",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="IN-Inventory");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "IN-Inventory",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Fixed Assets", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Asset")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Asset",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="FA-Fixed Assets");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "FA-Fixed Assets",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.LIABILITIES.Current Liabilities", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Liability")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Liability",0,0,1,Qt.LeftButton);
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="AP-Accounts Payable");        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "AP-Accounts Payable",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.LIABILITIES.Current Liabilities", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Liability")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Liability",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="CL-Current Liabilities");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "CL-Current Liabilities",0,0,1,Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.LIABILITIES.Long Term Liabilities", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Liability")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Liability",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="LTL-Long Term Liabilities");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "LTL-Long Term Liabilities",0,0,1,Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Capital Stock", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Equity")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Equity",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="EDC-Equity do not close");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "EDC-Equity do not close",0,0,1,Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Retained Earnings", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Equity")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Equity",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="EC-Equity close");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "EC-Equity close",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Revenue")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Revenue",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="All");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "All",0,0,1,Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(!findObject(":_selection.Select Multiple Accounts by Segment_QGroupBox").checked)
            type(":_selection.Select Multiple Accounts by Segment_QGroupBox"," ");
        waitForObject(":_selection.Select Multiple Accounts by Segment_QGroupBox");
        if(findObject(":Select Multiple Accounts by Segment._type_XComboBox").currentText!= "Expense")
            clickItem(":Select Multiple Accounts by Segment._type_XComboBox", "Expense",0,0,1,Qt.LeftButton);
        waitForObject(":Select Multiple Accounts by Segment._subType_XComboBox");
        if(findObject(":Select Multiple Accounts by Segment._subType_XComboBox").currentText!="All");
        clickItem(":Select Multiple Accounts by Segment._subType_XComboBox", "All",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Subtract from Group Total_QRadioButton_2");
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(0.5);
        waitForObject(":_options.Show % of Group Total_QCheckBox");
        if(!findObject(":_options.Show % of Group Total_QCheckBox").checked)
            clickButton(":_options.Show % of Group Total_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="ASSETS");
        clickItem(":_options._group_XComboBox", "ASSETS",0,0,1,Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        if(object.exists(":_flhead.Official Balance Sheet_QModelIndex"))
            test.pass("Financial Report created:Official Balance Sheet");
        else test.fail("Financial Report not created:Official Balance Sheet");
        
    }catch(e){test.fail("Exception in creating Official Balanace Sheet");}
    
    
    //-----------Create: Adhoc Income Statement--------------
    try{
        waitForObject(":List Financial Reports.New_QPushButton");
        clickButton(":List Financial Reports.New_QPushButton");
        waitForObject(":_name_XLineEdit_21");
        type(":_name_XLineEdit_21", "INCOME_STATEMENT");
        type(":_descrip_XLineEdit", "Income Statement");
        clickButton(":Report Type.Ad Hoc_QRadioButton");
        clickTab(":Financial Report.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":_options.Show Grand Total_QGroupBox");
        if(!findObject(":_options.Show Grand Total_QGroupBox").checked)
            type(":_options.Show Grand Total_QGroupBox"," ");
        waitForObject(":Show Grand Total.Show Beginning_QCheckBox");
        if(findObject(":Show Grand Total.Show Beginning_QCheckBox").checked)
            clickButton(":Show Grand Total.Show Ending_QCheckBox");
        waitForObject(":Show Grand Total.Show Ending_QCheckBox");
        if(!findObject(":Show Grand Total.Show Ending_QCheckBox").checked)
            clickButton(":Show Grand Total.Show Ending_QCheckBox");
        waitForObject(":Show Grand Total.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Grand Total.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Grand Total.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Grand Total.Show Budget_QCheckBox");
        if(findObject(":Show Grand Total.Show Budget_QCheckBox").checked)
            clickButton(":Show Grand Total.Show Budget_QCheckBox");
        waitForObject(":Show Grand Total.Show Difference_QCheckBox");
        if(!findObject(":Show Grand Total.Show Difference_QCheckBox").checked)
            clickButton(":Show Grand Total.Show Difference_QCheckBox");
        waitForObject(":Show Grand Total.Show Custom_QCheckBox");
        if(!findObject(":Show Grand Total.Show Custom_QCheckBox").checked)
            clickButton(":Show Grand Total.Show Custom_QCheckBox");
        waitForObject(":Alternate Labels.Alternate Ending Balance:_QCheckBox");
        if(!findObject(":Alternate Labels.Alternate Ending Balance:_QCheckBox").checked)
            clickButton(":Alternate Labels.Alternate Ending Balance:_QCheckBox");
        waitForObject(":Alternate Labels._altEndText_QLineEdit");
        type(":Alternate Labels._altEndText_QLineEdit","Year-To-Date");
        waitForObject(":Alternate Labels.Alternate Difference:_QCheckBox");
        if(!findObject(":Alternate Labels.Alternate Difference:_QCheckBox").checked)
            clickButton(":Alternate Labels.Alternate Difference:_QCheckBox");
        waitForObject(":Alternate Labels._altDiffText_QLineEdit");
        type(":Alternate Labels._altDiffText_QLineEdit", "Current Period");
        waitForObject(":Alternate Labels.Alternate Grand Total:_QCheckBox");
        if(!findObject(":Alternate Labels.Alternate Grand Total:_QCheckBox").checked)
            clickButton(":Alternate Labels.Alternate Grand Total:_QCheckBox");
        waitForObject(":Alternate Labels._altTotalText_QLineEdit");
        type(":Alternate Labels._altTotalText_QLineEdit", "Net Income");
        type(":_customText_QLineEdit", "Income Statement");
        clickButton(":List Employees.Save_QPushButton_2");
        snooze(1);
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        snooze(1);
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "INCOME\\_STATEMENT", 5, 5, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Top Level Group_QPushButton");
        clickButton(":frame.Add Top Level Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "REVENUE");
        type(":_description_XLineEdit_29", "REVENUE");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Net Revenue");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame.Add Top Level Group_QPushButton");
        clickButton(":frame.Add Top Level Group_QPushButton");
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "EXPENSES");
        type(":_description_XLineEdit_29", "EXPENSES");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Expenses");
        clickButton(":Operation.Subtract from Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","REVENUE",5, 5, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Group_QPushButton");
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Sales");
        type(":_description_XLineEdit_29", "Sales");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(!findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Sales");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "INCOME\\_STATEMENT", 5, 5, 0, Qt.LeftButton);  
        waitForObject(":frame._layout_XTreeWidget");
        doubleClickItem(":frame._layout_XTreeWidget","REVENUE.Sales",5, 5, 0, Qt.LeftButton);
        waitForObject(":_group_XComboBox");
        if(!findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales", 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","REVENUE",5, 5, 0, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Cost of Goods Sold");
        type(":_description_XLineEdit_29", "Cost of Goods Sold");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total Sales");
        clickButton(":Operation.Subtract from Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","EXPENSES",5, 5, 0, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "General Expenses");
        type(":_description_XLineEdit_29", "General Expenses");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Sales")
            clickItem(":_group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_altSubtotalLabel_QLineEdit");
        type(":_altSubtotalLabel_QLineEdit", "Total General Expenses");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        snooze(1);
        clickItem(":frame._layout_XTreeWidget", "REVENUE.Sales", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        nativeType("<Tab>");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
         waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4000",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        try {
            waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
            if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        } catch (e) { test.fail('exception ' + e + ' while handling ":Show Columns.Show Beginning Balance_QCheckBox"'); }
        try {
            waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
            if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
                clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        } catch (e) { test.fail('exception ' + e + ' while handling ":Show Columns.Show % of Group Total_QCheckBox"'); }
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE.Sales", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4800",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE.Sales", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4900",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE.Sales", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4050",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton); 
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE.Sales", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(0.5);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4060",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton); 
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "REVENUE.Cost of Goods Sold", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","5000",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);   
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6000",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton); 
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6750",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton); 
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6550",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton); 
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6400",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton); 
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6050",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton); 
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6060",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton); 
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8910",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton); 
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8920",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");      
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8930",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8980",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8990",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8995",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Sales")
            clickItem(":_options._group_XComboBox", "Sales",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        if(!clickItem(":List Financial Reports._flhead_XTreeWidget", "INCOME\\_STATEMENT", 5, 5, 1, Qt.LeftButton))
            test.pass("Financial Report created:INCOME_STATEMENT");
        
        
        //-------------Create Adhoc Balance Sheet--------------
        waitForObject(":List Financial Reports.New_QPushButton");
        clickButton(":List Financial Reports.New_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_21");
        type(":_name_XLineEdit_21", "BALANCE_SHEET");
        type(":_descrip_XLineEdit", "Balance Sheet");
        clickButton(":Report Type.Ad Hoc_QRadioButton");
        waitForObject(":Financial Report.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Financial Report.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":_options.Show Grand Total_QGroupBox");    
        if(!findObject(":_options.Show Grand Total_QGroupBox").checked)
            type(":_options.Show Grand Total_QGroupBox"," ");
        if(!findObject(":Alternate Labels.Alternate Ending Balance:_QCheckBox").checked)
            clickButton(":Alternate Labels.Alternate Ending Balance:_QCheckBox");
        waitForObject(":Alternate Labels._altEndText_QLineEdit");
        type(":Alternate Labels._altEndText_QLineEdit", "Account Balance");
        clickButton(":Alternate Labels.Alternate Grand Total:_QCheckBox");
        waitForObject(":Alternate Labels._altTotalText_QLineEdit");
        type(":Alternate Labels._altTotalText_QLineEdit", "Balance Total");
        type(":_customText_QLineEdit", "Balance Sheet");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        snooze(1);
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "BALANCE\\_SHEET", 5, 5, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":frame.Add Top Level Group_QPushButton");
        clickButton(":frame.Add Top Level Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "ASSETS");
        type(":_description_XLineEdit_29", "ASSETS");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        type(":_altSubtotalLabel_QLineEdit", "Total Assets");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        snooze(1);
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "BALANCE\\_SHEET", 5, 5, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Top Level Group_QPushButton");
        clickButton(":frame.Add Top Level Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "LIABILITIES AND OWNERS EQUITY");
        type(":_description_XLineEdit_29", "LIABILITIES AND OWNERS EQUITY");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        type(":_altSubtotalLabel_QLineEdit", "Total Liabilities and Owners Equity");
        clickButton(":Operation.Subtract from Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","ASSETS",5, 5, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Group_QPushButton");
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Current Assets");
        type(":_description_XLineEdit_29", "Current Assets");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        snooze(0.1);
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Current Assets");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","ASSETS",5, 5, 0, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Fixed Assets");
        type(":_description_XLineEdit_29", "Fixed Assets");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Fixed Assets");
        waitForObject(":Operation.Add to Group Total_QRadioButton");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        snooze(1);
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","ASSETS",5, 5, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Group_QPushButton");
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Other Assets");
        type(":_description_XLineEdit_29", "Other Assets");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        snooze(1);
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)        
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Other Assets");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","LIABILITIES AND OWNERS EQUITY",5, 5, 0, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "LIABILITIES");
        type(":_description_XLineEdit_29", "LIABILITIES");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Liabilities");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","LIABILITIES AND OWNERS EQUITY",5, 5, 0, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "OWNERS EQUITY");
        type(":_description_XLineEdit_29", "OWNERS EQUITY");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Owners Equity");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","LIABILITIES AND OWNERS EQUITY.LIABILITIES",5, 5, 0, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Current Liabilities");
        type(":_description_XLineEdit_29", "Current Liabilities");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        snooze(1);
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton); 
        type(":_altSubtotalLabel_QLineEdit", "Current Liabilities");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","LIABILITIES AND OWNERS EQUITY.LIABILITIES",5, 5, 0, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Long Term Liabilities");
        type(":_description_XLineEdit_29", "Long Term Liabilities");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Long Term Liabilities");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY",5, 5, 0, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Shareholders Equity");
        type(":_description_XLineEdit_29", "Shareholders Equity");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Shareholders Equity");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY",5, 5, 0, Qt.LeftButton);
        snooze(1);
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Year To Date Net Income");
        type(":_description_XLineEdit_29", "Year To Date Net Income");
        waitForObject(":Subtotal/Summarize.Summarized_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Summarized_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Summarized_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        snooze(0.5);
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        snooze(1);
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget","LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY",5, 5, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Group_QPushButton");
        clickButton(":frame.Add Group_QPushButton");
        snooze(1);
        waitForObject(":_name_XLineEdit_20");
        type(":_name_XLineEdit_20", "Retained Earnings");
        type(":_description_XLineEdit_29", "Retained Earnings");
        waitForObject(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
        waitForObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Beginning Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Ending Balance_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Ending Balance_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_3");
        waitForObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        if(findObject(":Subtotal/Summarize.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Debits/Credits_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show Budget_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Budget_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Budget_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_4");
        waitForObject(":Subtotal/Summarize.Show Difference_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Difference_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Difference_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_5");
        waitForObject(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        if(!findObject(":Subtotal/Summarize.Show Custom Column_QCheckBox").checked)
            clickButton(":Subtotal/Summarize.Show Custom Column_QCheckBox");
        waitForObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6").checked)
            clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox_6");
        waitForObject(":_group_XComboBox");
        if(findObject(":_group_XComboBox").currentText!="Parent")
            clickItem(":_group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        type(":_altSubtotalLabel_QLineEdit", "Total Retained Earnings");
        clickButton(":Operation.Add to Group Total_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1000",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1010",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1100",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            type(":_options._group_XComboBox", "Parent");
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1250",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        waitForObject(":Financial Report Item.qt_tabwidget_tabbar_QTabBar");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1210",10,10,0, Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1400",10,10,0, Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1620",10,10,0, Qt.LeftButton);
        waitForObject(":Operation.Add to Group Total_QRadioButton_2");
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1470",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1460",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1260",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");    
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1930",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Current Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1950",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);    
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Fixed Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","1500",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Fixed Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","2000",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Fixed Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","2320",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "ASSETS.Fixed Assets", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","2490",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Shareholders Equity", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","3010",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4000",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(2);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4800",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        snooze(2);
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4900",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4050",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(2);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","4060",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
            clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","5000",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6000",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6050",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)        
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6060",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6750",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6550",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        snooze(1);
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        snooze(1);
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");       
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","6400",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);     
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8910",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);    
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");  
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");      
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8920",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8930",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8980",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8990",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Year To Date Net Income", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","8995",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Subtract from Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);    
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        
        
        waitForObject(":frame._layout_XTreeWidget");
        clickItem(":frame._layout_XTreeWidget", "LIABILITIES AND OWNERS EQUITY.OWNERS EQUITY.Retained Earnings", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":frame.Add Account_QPushButton");
        clickButton(":frame.Add Account_QPushButton");
        snooze(1);
        waitForObject(":Select one Account.VirtualClusterLineEdit_GLClusterLineEdit");
        waitForObject(":Select one Account_QLabel");
        sendEvent("QMouseEvent", ":Select one Account_QLabel", QEvent.MouseButtonPress, 0, 0, Qt.LeftButton, 0);
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");        
        waitForObject(":_listTab_XTreeWidget_11");
        doubleClickItem(":_listTab_XTreeWidget_11","3030",10,10,0, Qt.LeftButton);
        clickButton(":Operation.Add to Group Total_QRadioButton_2");
        clickTab(":Financial Report Item.qt_tabwidget_tabbar_QTabBar", "Options");
        waitForObject(":Show Columns.Show Beginning Balance_QCheckBox");
        ":Show Columns.Show Beginning Balance_QCheckBox"
                if(findObject(":Show Columns.Show Beginning Balance_QCheckBox").checked)
                    clickButton(":Show Columns.Show Beginning Balance_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_3");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_3").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_3");
        waitForObject(":Show Columns.Show Debits/Credits_QCheckBox");
        if(findObject(":Show Columns.Show Debits/Credits_QCheckBox").checked)
            clickButton(":Show Columns.Show Debits/Credits_QCheckBox");
        waitForObject(":Show Columns.Show % of Group Total_QCheckBox_2");
        if(!findObject(":Show Columns.Show % of Group Total_QCheckBox_2").checked)
            clickButton(":Show Columns.Show % of Group Total_QCheckBox_2");
        waitForObject(":Show Columns.Show Difference_QCheckBox");
        if(!findObject(":Show Columns.Show Difference_QCheckBox").checked)
            clickButton(":Show Columns.Show Difference_QCheckBox");
        waitForObject(":_options._group_XComboBox");
        if(findObject(":_options._group_XComboBox").currentText!="Parent")
            clickItem(":_options._group_XComboBox", "Parent",0,0,1,Qt.LeftButton);
        waitForObject(":_options.Show Custom Column_QGroupBox");
        type(":_options.Show Custom Column_QGroupBox"," ");
        waitForObject(":Show Custom Column.Show % of Group Total_QCheckBox");
        if(!findObject(":Show Custom Column.Show % of Group Total_QCheckBox").checked)
            clickButton(":Show Custom Column.Show % of Group Total_QCheckBox");
        waitForObject(":Show Custom Column.Use Difference_QRadioButton");
        clickButton(":Show Custom Column.Use Difference_QRadioButton");
        waitForObject(":List Financial Reports.Save_QPushButton");
        clickButton(":List Financial Reports.Save_QPushButton");
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        
        waitForObject(":List Financial Reports._flhead_XTreeWidget");
        if(!clickItem(":List Financial Reports._flhead_XTreeWidget", "BALANCE\\_SHEET", 5, 5, 1, Qt.LeftButton))
            test.pass("Financial Report created: BALANCE_SHEET");
        
    }catch(e){test.fail("Exception in creating Official Balance Sheet:"+e);}
    
    waitForObject(":List Financial Reports.Close_QPushButton");
    clickButton(":List Financial Reports.Close_QPushButton");
    
    
}
