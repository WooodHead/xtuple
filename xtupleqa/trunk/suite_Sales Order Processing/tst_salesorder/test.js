function main()
{
    
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Variable Declaration-----
    var quote, quoteitem, quoteqty;
    
    //-----Create a Quote-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
    activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
    
    waitForObject(":frame.New_QPushButton");
    clickButton(":frame.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton");
    clickButton(":_headerPage...._QPushButton");
    waitForObject(":_listTab_XTreeWidget")
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
    
    quote = findObject(":_headerPage._orderNumber_XLineEdit").text
            
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
   
    waitForObject(":Quote.Close_QPushButton");
    clickButton(":Quote.Close_QPushButton");
    waitForObject(":Quote.Save_QPushButton_2");
    clickButton(":Quote.Save_QPushButton_2");
    waitForObject(":Quote.Cancel_QPushButton");
    clickButton(":Quote.Cancel_QPushButton");
    
    waitForObject(":_quote_XTreeWidget");
    if(!clickItem(":_quote_XTreeWidget", quote, 5, 5, 0, Qt.LeftButton))
       test.pass("Quote Created Successfully");
    else test.fail("Quote Creation Failed");
    
    //-----Convert Quote To Sales Order-----
    waitForObject(":frame.Convert_QPushButton");
    clickButton(":frame.Convert_QPushButton");
    
    waitForObject(":List Quotes.Yes_QPushButton");
    clickButton(":List Quotes.Yes_QPushButton");
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage._soitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
    snooze(0.5);
   
    quoteitem = findObject(":_itemGroup._itemNumber_ItemLineEdit").text;
    
    quoteqty = findObject(":_qtyOrdered_XLineEdit_2").text;      
   
    waitForObject(":Sales Order.Save_QPushButton");
    clickButton(":Sales Order.Save_QPushButton");
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":List Quotes.Close_QPushButton");
    clickButton(":List Quotes.Close_QPushButton");
    
    //-----Quote Converted to Sales Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame._so_XTreeWidget");
    if(!clickItem(":frame._so_XTreeWidget", quote, 5, 5, 1, Qt.LeftButton))
        test.pass("Quote successfully converted to Sales Order");
    else test.fail("Quote convertion failed");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //-----Create a Prospect-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Prospect");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Prospect");
    waitForObjectItem(":xTuple ERP: *.Prospect_QMenu", "List...");
    activateItem(":xTuple ERP: *.Prospect_QMenu", "List...");
    
    waitForObject(":List Prospects.New_QPushButton");
    clickButton(":List Prospects.New_QPushButton");
    waitForObject(":_number_XLineEdit");
    type(":_number_XLineEdit", "zprospect");
    waitForObject(":_name_QLineEdit");
    type(":_name_QLineEdit", "Zen Prospect");
    waitForObject(":_salesrep_XComboBox");
    clickItem(":_salesrep_XComboBox", "1000-Sam Masters", 5, 5, 5, Qt.LeftButton);
    waitForObject(":Prospect...._QPushButton");
    clickButton(":Prospect...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_2");
    doubleClickItem(":_listTab_XTreeWidget_2", "Susie", 5, 5, 0, Qt.LeftButton);
    waitForObjectItem(":_taxzone_XComboBox", "VA TAX-Virginia Sales Tax");
    clickItem(":_taxzone_XComboBox", "VA TAX-Virginia Sales Tax", 5, 5, 0, Qt.LeftButton);
  
    waitForObject(":Prospect.Save_QPushButton");
    clickButton(":Prospect.Save_QPushButton");
    
    waitForObject(":List Prospects._prospect_XTreeWidget");
    if(!clickItem(":List Prospects._prospect_XTreeWidget", "ZPROSPECT", 5, 5, 1, Qt.LeftButton))
        test.pass("ZPROSPECT created");
    else test.fail("Prospect creation failed");
    
    waitForObject(":List Prospects.Close_QPushButton");
    clickButton(":List Prospects.Close_QPushButton");
    
    //-----Create a Quote using Prospect-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
    activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
    
    waitForObject(":frame.New_QPushButton");
    clickButton(":frame.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton");
    clickButton(":_headerPage...._QPushButton");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "ZPROSPECT", 5, 5, 0, Qt.LeftButton);
    
    var pquote = findObject(":_headerPage._orderNumber_XLineEdit").text
            
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "100");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit");
    type(":_schedGroup.XDateEdit_XDateEdit", "+7");
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
   
    waitForObject(":Quote.Close_QPushButton");
    clickButton(":Quote.Close_QPushButton");
    waitForObject(":Quote.Save_QPushButton_2");
    clickButton(":Quote.Save_QPushButton_2");
    waitForObject(":Quote.Cancel_QPushButton");
    clickButton(":Quote.Cancel_QPushButton");
    
    waitForObject(":_quote_XTreeWidget");
    if(!clickItem(":_quote_XTreeWidget", pquote, 5, 5, 0, Qt.LeftButton))
       test.pass("Quote Created Successfully");
    else test.fail("Quote Creation Failed");
    
    
    
}
