function executeChapter10()
{
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Financial Statements");
    activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Financial Statements");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.Financial Statements_QMenu", "List Financial Reports...");
    activateItem(":xTuple ERP: OpenMFG Edition.Financial Statements_QMenu", "List Financial Reports...");
    
    waitForObjectItem(":List Financial Reports._flhead_XTreeWidget", "Basic Income Statement");
    clickItem(":List Financial Reports._flhead_XTreeWidget", "Basic Income Statement", 5, 5, 1, Qt.LeftButton);
    waitForObject(":List Financial Reports.Copy_QPushButton");
    clickButton(":List Financial Reports.Copy_QPushButton");
    waitForObject(":Target Report:_QLineEdit");
    type(":Target Report:_QLineEdit", "Official Income Statement");
    clickButton(":Copy Financial Report.OK_QPushButton");
    waitForObject(":List Financial Reports._flhead_XTreeWidget");
    doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "Official Income Statement", 5, 5, 0, Qt.LeftButton);
    waitForObjectItem(":frame._layout_XTreeWidget", "INCOME");
    clickItem(":frame._layout_XTreeWidget", "INCOME", 5, 5, 1, Qt.LeftButton);
    clickButton(":frame.Delete_QPushButton");
    waitForObject(":frame.Add Top Level Group_QPushButton");
    clickButton(":frame.Add Top Level Group_QPushButton");
    waitForObject(":_name_XLineEdit_20");
    type(":_name_XLineEdit_20", "REVENUE");
    type(":_description_XLineEdit_29", "REVENUE");
    if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)	
        clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
    type(":_altSubtotalLabel_QLineEdit", "Total Gross Revenue");
    clickButton(":Operation.Add to Group Total_QRadioButton");
    clickButton(":Financial Report Group.Save_QPushButton");
  
    waitForObject(":frame._layout_XTreeWidget");
    clickButton(":frame.Add Top Level Group_QPushButton");
    waitForObject(":_name_XLineEdit_20");
    type(":_name_XLineEdit_20", "EXPENSES");
    type(":_description_XLineEdit_29", "EXPENSES");
   if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");  
    type(":_altSubtotalLabel_QLineEdit", "Total Expenses");
    clickButton(":Operation.Subtract from Group Total_QRadioButton");
    clickButton(":Financial Report Group.Save_QPushButton");
 
    
    waitForObject(":frame._layout_XTreeWidget");
    clickItem(":frame._layout_XTreeWidget", "REVENUE", 5, 5, 1, Qt.LeftButton);
    clickButton(":frame.Add Group_QPushButton");
    waitForObject(":_name_XLineEdit_20");
    type(":_name_XLineEdit_20", "Sales");
    type(":_description_XLineEdit_29", "Sales");
    if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
    if(findObject(":_group_XComboBox").currentText!="Parent")
        type(":_group_XComboBox", "Parent");
    type(":_altSubtotalLabel_QLineEdit", "Total Sales");
    clickButton(":Operation.Add to Group Total_QRadioButton");
    clickButton(":Financial Report Group.Save_QPushButton");
   
    
    waitForObject(":frame._layout_XTreeWidget");
    clickItem(":frame._layout_XTreeWidget", "REVENUE", 5, 5, 1, Qt.LeftButton);
    clickButton(":frame.Add Group_QPushButton");
    waitForObject(":_name_XLineEdit_20");
    type(":_name_XLineEdit_20", "Other Revenue");
    type(":_description_XLineEdit_29", "Other Revenue");
    if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
    if(findObject(":_group_XComboBox").currentText!="Parent")
        type(":_group_XComboBox", "Parent");
    type(":_altSubtotalLabel_QLineEdit", "Total Other Revenue");
    clickButton(":Operation.Add to Group Total_QRadioButton");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    
    waitForObject(":frame._layout_XTreeWidget");
    clickItem(":frame._layout_XTreeWidget", "REVENUE", 5, 5, 1, Qt.LeftButton);
    clickButton(":frame.Add Group_QPushButton");
    waitForObject(":_name_XLineEdit_20");
    type(":_name_XLineEdit_20", "Cost of Goods Sold");
    type(":_description_XLineEdit_29", "Cost of Goods Sold");
    if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
    if(findObject(":_group_XComboBox")!= "Parent");
        type(":_group_XComboBox", "Parent");
    type(":_altSubtotalLabel_QLineEdit", "Total COGS");
    clickButton(":Operation.Subtract from Group Total_QRadioButton");
    waitForObject(":Financial Report Group.Save_QPushButton");
    clickButton(":Financial Report Group.Save_QPushButton");
     
    waitForObject(":frame._layout_XTreeWidget");
    clickItem(":frame._layout_XTreeWidget", "EXPENSES", 5, 5, 1, Qt.LeftButton);
    clickButton(":frame.Add Group_QPushButton");
    waitForObject(":_name_XLineEdit_20");
    type(":_name_XLineEdit_20", "General Expenses");
    type(":_description_XLineEdit_29", "General Expenses");
    if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
    if(findObject(":_group_XComboBox")!= "Parent");
        type(":_group_XComboBox", "Parent");
    type(":_altSubtotalLabel_QLineEdit", "Total General Expenses");
    clickButton(":Operation.Add to Group Total_QRadioButton");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    waitForObject(":frame._layout_XTreeWidget");
    clickItem(":frame._layout_XTreeWidget", "EXPENSES", 5, 5, 1, Qt.LeftButton);
    clickButton(":frame.Add Group_QPushButton");
    waitForObject(":_name_XLineEdit_20");
    type(":_name_XLineEdit_20", "Depreciation Expense");
    type(":_description_XLineEdit_29", "Depreciation Expense");
    if(!findObject(":Subtotal/Summarize.Show Subtotal_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show Subtotal_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Use Alt. Label_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Use Alt. Label_QCheckBox");
    if(!findObject(":Subtotal/Summarize.Show % of Group Total_QCheckBox").checked)
        clickButton(":Subtotal/Summarize.Show % of Group Total_QCheckBox");
    if(findObject(":_group_XComboBox")!= "Parent");
        type(":_group_XComboBox", "Parent");
    type(":_altSubtotalLabel_QLineEdit", "Total Depreciation Expenses");
    clickButton(":Operation.Add to Group Total_QRadioButton");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    clickButton(":Financial Report.Save_QPushButton");
    
    waitForObject(":List Financial Reports._flhead_XTreeWidget");
    doubleClickItem(":List Financial Reports._flhead_XTreeWidget", "Official Income Statement", 5, 5, 0, Qt.LeftButton);     waitForObject(":Financial Report.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Financial Report.qt_tabwidget_tabbar_QTabBar", "Options");
    if(!findObject(":_options.Show Grand Total_QCheckBox").checked)
        clickButton(":_options.Show Grand Total_QCheckBox");
    if(!findObject(":Alternate Labels.Alternate Budget:_QCheckBox").checked)
        clickButton(":Alternate Labels.Alternate Budget:_QCheckBox");
    type(":Alternate Labels._altBudgetText_QLineEdit", "Total Budget");
    if(!findObject(":Alternate Labels.Alternate Grand Total:_QCheckBox").checked)
        clickButton(":Alternate Labels.Alternate Grand Total:_QCheckBox");
    type(":Alternate Labels._altTotalText_QLineEdit", "Net Income");
    clickTab(":Financial Report.qt_tabwidget_tabbar_QTabBar", "Row Layout");
    waitForObject(":frame._layout_XTreeWidget");
    
    doubleClickItem(":frame._layout_XTreeWidget", "REVENUE", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_group_XComboBox");
    if(findObject(":_group_XComboBox").currentText!="Sales")
        type(":_group_XComboBox", "Sales");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    doubleClickItem(":frame._layout_XTreeWidget", "REVENUE.Sales", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_group_XComboBox");
    if(findObject(":_group_XComboBox").currentText!="Sales")
        type(":_group_XComboBox", "Sales");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    doubleClickItem(":frame._layout_XTreeWidget", "REVENUE.Other Revenue", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_group_XComboBox");
    if(findObject(":_group_XComboBox").currentText!="Sales")
        type(":_group_XComboBox", "Sales");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    doubleClickItem(":frame._layout_XTreeWidget", "REVENUE.Cost of Goods Sold", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_group_XComboBox");
    if(findObject(":_group_XComboBox").currentText!="Sales")
        type(":_group_XComboBox", "Sales");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    
    doubleClickItem(":frame._layout_XTreeWidget", "EXPENSES", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_group_XComboBox");
    if(findObject(":_group_XComboBox").currentText!="Sales")
        type(":_group_XComboBox", "Sales");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    doubleClickItem(":frame._layout_XTreeWidget", "EXPENSES.General Expenses", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_group_XComboBox");
    if(findObject(":_group_XComboBox").currentText!="Sales")
        type(":_group_XComboBox", "Sales");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    doubleClickItem(":frame._layout_XTreeWidget", "EXPENSES.Depreciation Expense", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_group_XComboBox");
    if(findObject(":_group_XComboBox").currentText!="Sales")
        type(":_group_XComboBox", "Sales");
    clickButton(":Financial Report Group.Save_QPushButton");
    
    clickButton(":Financial Report.Save_QPushButton");
    
    
    
    
    
    
    
    waitForObject(":List Financial Reports.Close_QPushButton");
    clickButton(":List Financial Reports.Close_QPushButton");
}