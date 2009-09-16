function main()
{
    
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //-----Variable Declaration-----
    var quote, quoteitem, quoteqty, sonumber, soitem, soqty, qtinvoice, qtamount, soinvoice, soamount;
    
    //---find Application Edition------
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *._System_QMenu", "Master Information");
    activateItem(":xTuple ERP: *._System_QMenu", "Master Information");
    waitForObjectItem(":xTuple ERP: *_.Master Information_QMenu", "Database Information...");
    activateItem(":xTuple ERP: *_.Master Information_QMenu", "Database Information...");
    
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
    waitForObject(":Database Information.Save_QPushButton");
    clickButton(":Database Information.Save_QPushButton");
    
    //-----Create a Quote-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
    activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
    
    waitForObject(":frame.New_QPushButton");
    clickButton(":frame.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton_3");
    clickButton(":_headerPage...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
    
    quote = findObject(":_headerPage._orderNumber_XLineEdit").text;
    
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
    
    //-----Verify - Conversion of Quote to Sales Order-----
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
    type(":_number_XLineEdit", "zenprospect");
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
    if(!clickItem(":List Prospects._prospect_XTreeWidget", "ZENPROSPECT", 5, 5, 1, Qt.LeftButton))
        test.pass("ZENPROSPECT created");
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
    waitForObject(":_headerPage...._QPushButton_3");
    clickButton(":_headerPage...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget");
    doubleClickItem(":_listTab_XTreeWidget", "ZENPROSPECT", 5, 5, 0, Qt.LeftButton);
    
    var pquote = findObject(":_headerPage._orderNumber_XLineEdit").text;
    
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "STRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "10");
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
    
    if(!findObject(":Show.Quotes For Prospects_XCheckBox").checked)
        clickButton(":Show.Quotes For Prospects_XCheckBox");
    
    waitForObject(":_quote_XTreeWidget");
    if(!clickItem(":_quote_XTreeWidget", pquote, 5, 5, 0, Qt.LeftButton))
        test.pass("Quote using Prospect as Customer created Successfully");
    else test.fail("Quote using Prospect as Customer creation Failed");
    
    //-----Conversion of Quote to Sales Order & Prospect to Customer-----
    waitForObject(":_quote_XTreeWidget");
    clickItem(":_quote_XTreeWidget", pquote, 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Convert_QPushButton");
    clickButton(":frame.Convert_QPushButton");
    
    waitForObject(":List Quotes.Yes_QPushButton");
    clickButton(":List Quotes.Yes_QPushButton");
    snooze(0.5);
    
    waitForObject(":List Quotes.Yes_QPushButton");
    clickButton(":List Quotes.Yes_QPushButton");
    
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":List Quotes.Close_QPushButton");
    clickButton(":List Quotes.Close_QPushButton");
    
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame._so_XTreeWidget");
    if(!clickItem(":frame._so_XTreeWidget", pquote, 5, 5, 0, Qt.LeftButton))
        test.pass("Quote using prospect as Customer converted successfully");
    else test.fail("Quote using prospect as Customer conversion failed");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //-----Verify - Conversion of Prospect to Customer-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Customer");
    waitForObjectItem(":xTuple ERP: *.Customer_QMenu", "List...");
    activateItem(":xTuple ERP: *.Customer_QMenu", "List...");
    
    waitForObject(":List Customers._cust_XTreeWidget");
    if(!clickItem(":List Customers._cust_XTreeWidget", "ZENPROSPECT", 5, 5, 1, Qt.LeftButton))
        test.pass("Prospect converted to Customer successfully");
    else test.fail("Prospect conversion to Customer failed");
    
    waitForObject(":List Customers.Close_QPushButton");
    clickButton(":List Customers.Close_QPushButton");
    
    //-----Create and Edit a Quote-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
    activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
    
    waitForObject(":frame.New_QPushButton");
    clickButton(":frame.New_QPushButton");
    waitForObject(":_headerPage...._QPushButton_3");
    clickButton(":_headerPage...._QPushButton_3");
    waitForObject(":_listTab_XTreeWidget")
            doubleClickItem(":_listTab_XTreeWidget", "TTOYS", 5, 5, 0, Qt.LeftButton);
    
    var quotenumber = findObject(":_headerPage._orderNumber_XLineEdit").text;
    
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton");
    clickButton(":_lineItemsPage.New_QPushButton");
    waitForObject(":_itemGroup...._QPushButton");
    clickButton(":_itemGroup...._QPushButton");
    waitForObject(":_item_XTreeWidget");
    doubleClickItem(":_item_XTreeWidget", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
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
    doubleClickItem(":_quote_XTreeWidget",  quotenumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage._soitem_XTreeWidget_2");
    doubleClickItem(":_lineItemsPage._soitem_XTreeWidget_2", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    type(":_qtyOrdered_XLineEdit", "50");
    
    var quotequantity = findObject(":_qtyOrdered_XLineEdit").text;   
    
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
    waitForObject(":Quote.Yes_QPushButton");
    clickButton(":Quote.Yes_QPushButton");
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
    waitForObject(":Quote.Close_QPushButton_2");
    clickButton(":Quote.Close_QPushButton_2");
    waitForObject(":Quote.Save_QPushButton_2");
    clickButton(":Quote.Save_QPushButton_2");
    
    waitForObject(":_quote_XTreeWidget");
    doubleClickItem(":_quote_XTreeWidget", quotenumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Quote.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage._soitem_XTreeWidget_2");
    doubleClickItem(":_lineItemsPage._soitem_XTreeWidget_2", "CTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit");
    
    var quotechange = findObject(":_qtyOrdered_XLineEdit").text;  
    
    waitForObject(":Quote.Save_QPushButton");
    clickButton(":Quote.Save_QPushButton");
    waitForObject(":Quote.Close_QPushButton_2");
    clickButton(":Quote.Close_QPushButton_2");
    waitForObject(":Quote.Save_QPushButton_2");
    clickButton(":Quote.Save_QPushButton_2");
    
    if(parseInt(quotequantity.toString()) == parseInt(quotechange.toString()))
        test.pass("Quote edit successful");
    else test.fail("Quote edit failed");
    
    waitForObject(":List Quotes.Close_QPushButton");
    clickButton(":List Quotes.Close_QPushButton");
    
    //-----Delete a Quote-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Quote");
    waitForObjectItem(":xTuple ERP: *.Quote_QMenu", "List...");
    activateItem(":xTuple ERP: *.Quote_QMenu", "List...");
    
    waitForObject(":_quote_XTreeWidget");
    clickItem(":_quote_XTreeWidget",quotenumber , 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Delete_QPushButton_2");
    clickButton(":frame.Delete_QPushButton_2");
    waitForObject(":List Quotes.Yes_QPushButton");
    clickButton(":List Quotes.Yes_QPushButton");
    
    test.verify(quotenumber, "Quote deleted");
    
    waitForObject(":List Quotes.Close_QPushButton");
    clickButton(":List Quotes.Close_QPushButton");
    
    //-----Create a Sales Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame.New_QPushButton_2");
    clickButton(":frame.New_QPushButton_2");
    waitForObject(":_headerPage...._QPushButton_4");
    clickButton(":_headerPage...._QPushButton_4");
    waitForObject(":_listTab_XTreeWidget_3");
    doubleClickItem(":_listTab_XTreeWidget_3", "TTOYS", 5, 5, 0, Qt.LeftButton);
    
    sonumber = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
    
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage.New_QPushButton_2");
    clickButton(":_lineItemsPage.New_QPushButton_2");
    waitForObject(":_itemGroup...._QPushButton_2");
    clickButton(":_itemGroup...._QPushButton_2");
    waitForObject(":_item_XTreeWidget_2");
    doubleClickItem(":_item_XTreeWidget_2", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "100");
    
    soitem = findObject(":_itemGroup._itemNumber_ItemLineEdit").text;
    
    soqty = findObject(":_qtyOrdered_XLineEdit_2").text;
    
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
    type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
    waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
    type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
    waitForObject(":Sales Order.Save_QPushButton");
    clickButton(":Sales Order.Save_QPushButton");
    waitForObject(":Sales Order.Close_QPushButton_2");
    clickButton(":Sales Order.Close_QPushButton_2");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    waitForObject(":Sales Order.Cancel_QPushButton");
    clickButton(":Sales Order.Cancel_QPushButton");
    
    waitForObject(":frame._so_XTreeWidget");
    if(!clickItem(":frame._so_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton))
        test.pass("Sales Order creation successful");
    else test.fail("Sales Order creation failed");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //-----Copy a Sales Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame._so_XTreeWidget");
    clickItem(":frame._so_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Copy_QPushButton");
    clickButton(":frame.Copy_QPushButton");
    waitForObject(":List Open Sales Orders.Copy_QPushButton");
    clickButton(":List Open Sales Orders.Copy_QPushButton");
    waitForObject(":frame._so_XTreeWidget");
    
    waitForObject(":frame._so_XTreeWidget");
    doubleClickItem(":frame._so_XTreeWidget", parseInt(sonumber.toString()) + 1, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage._soitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
    snooze(0.5);
    
    var soitem1 =findObject(":_itemGroup._itemNumber_ItemLineEdit").text;
    
    var soqty1 = findObject(":_qtyOrdered_XLineEdit_2").text;
    
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    
    if(soitem == soitem1 && parseInt(soqty.toString()) == parseInt(soqty1.toString()))
        test.pass("Sales Order Copy successful");
    else test.fail("Sales order copy not successful");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //-----Edit a Sales Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame._so_XTreeWidget");
    doubleClickItem(":frame._so_XTreeWidget", parseInt(sonumber.toString()) + 1, 5, 5, 0, Qt.LeftButton); 
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage._soitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    type(":_qtyOrdered_XLineEdit_2", "50");
    
    var soquantity = findObject(":_qtyOrdered_XLineEdit_2").text; 
    
    waitForObject(":Sales Order.Save_QPushButton");
    clickButton(":Sales Order.Save_QPushButton");
    waitForObject(":Sales Order.Yes_QPushButton");
    clickButton(":Sales Order.Yes_QPushButton");
    
    if(findObject(":Sales Order.Yes_QPushButton"))
        clickButton(":Sales Order.Yes_QPushButton");
    
    waitForObject(":Sales Order.Save_QPushButton");
    clickButton(":Sales Order.Save_QPushButton");
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    
    waitForObject(":frame._so_XTreeWidget");
    doubleClickItem(":frame._so_XTreeWidget", parseInt(sonumber.toString()) + 1, 5, 5, 0, Qt.LeftButton); 
    waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
    waitForObject(":_lineItemsPage._soitem_XTreeWidget");
    doubleClickItem(":_lineItemsPage._soitem_XTreeWidget", "1", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_qtyOrdered_XLineEdit_2");
    
    var  sochange = findObject(":_qtyOrdered_XLineEdit_2").text; 
    
    waitForObject(":Sales Order.Close_QPushButton");
    clickButton(":Sales Order.Close_QPushButton");
    waitForObject(":Sales Order.Save_QPushButton_2");
    clickButton(":Sales Order.Save_QPushButton_2");
    
    if(parseInt(soquantity.toString()) == parseInt(sochange.toString()))
        test.pass("Sales Order edit successful");
    else test.fail("Sales Order edit failed");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    //-----Delete a Sales Order-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
    waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
    
    waitForObject(":frame._so_XTreeWidget");
    clickItem(":frame._so_XTreeWidget",  parseInt(sonumber.toString()) + 1, 5, 5, 1, Qt.LeftButton);
    waitForObject(":frame.Delete_QPushButton");
    clickButton(":frame.Delete_QPushButton");
    
    waitForObject(":List Open Sales Orders.Yes_QPushButton");
    clickButton(":List Open Sales Orders.Yes_QPushButton");
    
    test.verify(parseInt(sonumber.toString()) + 1, "Sales Order deleted");
    
    waitForObject(":List Open Sales Orders.Close_QPushButton");
    clickButton(":List Open Sales Orders.Close_QPushButton");
    
    
    //--***--Ship the Sales Order with 'Select for Billing' option checked--***--    
    
    //-----Verification of QOH by Item (Issue Stock to Shipping)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand");
    activateItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":_itemGroup...._QPushButton_3");
    clickButton(":_itemGroup...._QPushButton_3");
    waitForObject(":_item_XTreeWidget_3");
    doubleClickItem(":_item_XTreeWidget_3", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    
    if(appEdition=="Manufacturing" || appEdition=="Standard")
    {            
        waitForObject(":_warehouse.Selected:_QRadioButton");
        clickButton(":_warehouse.Selected:_QRadioButton");
        waitForObject(":_warehouse._warehouses_WComboBox");
        clickItem(":_warehouse._warehouses_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    }
    
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Issue Stock to Shipping-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
    
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", quote, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    
    //-----Ship the Sales Order (with'Select for Billing' option checked)-----
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    if(findObject(":groupBox.Select for Billing_QCheckBox").unchecked)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    test.log("Issued stock and shipped the Sales Order");
    
    //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----    
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand");
    activateItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":_itemGroup...._QPushButton_3");
    clickButton(":_itemGroup...._QPushButton_3");
    waitForObject(":_item_XTreeWidget_3");
    doubleClickItem(":_item_XTreeWidget_3", "BTRUCK1", 5, 5, 0, Qt.LeftButton);
    
    if(appEdition=="Manufacturing" || appEdition=="Standard")
    {            
        waitForObject(":_warehouse.Selected:_QRadioButton");
        clickButton(":_warehouse.Selected:_QRadioButton");
        waitForObject(":_warehouse._warehouses_WComboBox");
        clickItem(":_warehouse._warehouses_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    }
   
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    waitForObject(":_qoh_XTreeWidget");
    
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) - parseInt(soqty.toString()))
        test.pass(" QOH updated correctly for Issue Stock to Shipping"); 
    else test.fail("QOH updated incorrectly for Issue Stock to Shipping");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    
    //--***--Ship the Sales Order with 'Select for Billing' option unchecked--***--   
    
    //-----Verification of QOH by Item (Issue Stock to Shipping)-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand");
    activateItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":_itemGroup...._QPushButton_3");
    clickButton(":_itemGroup...._QPushButton_3");
    waitForObject(":_item_XTreeWidget_3");
    doubleClickItem(":_item_XTreeWidget_3", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    
    if(appEdition=="Manufacturing" || appEdition=="Standard")
    {            
        waitForObject(":_warehouse.Selected:_QRadioButton");
        clickButton(":_warehouse.Selected:_QRadioButton");
        waitForObject(":_warehouse._warehouses_WComboBox");
        clickItem(":_warehouse._warehouses_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    }
    
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem = obj_TreeTopLevelItem.text(3);
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Issue Stock to Shipping-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
    
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", sonumber, 5, 5, 0, Qt.LeftButton);
    
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    
    //-----Ship the Sales Order (with'Select for Billing' option unchecked)-----
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    if(findObject(":groupBox.Select for Billing_QCheckBox").checked)
        clickButton(":groupBox.Select for Billing_QCheckBox");
    
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    test.log("Issued stock and shipped the Sales Order");
    
    //-----Verification of updated QOH by Item (Issue Stock to Shipping)-----    
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
    activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
    waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Inventory_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand");
    activateItem(":xTuple ERP: *_.Reports_QMenu", "Quantities On Hand");
    waitForObjectItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    activateItem(":xTuple ERP: *.Quantities On Hand_QMenu", "by Item...");
    
    waitForObject(":_itemGroup...._QPushButton_3");
    clickButton(":_itemGroup...._QPushButton_3");
    waitForObject(":_item_XTreeWidget_3");
    doubleClickItem(":_item_XTreeWidget_3", "YTRUCK1", 5, 5, 0, Qt.LeftButton);
    
    if(appEdition=="Manufacturing" || appEdition=="Standard")
    {            
        waitForObject(":_warehouse.Selected:_QRadioButton");
        clickButton(":_warehouse.Selected:_QRadioButton");
        waitForObject(":_warehouse._warehouses_WComboBox");
        clickItem(":_warehouse._warehouses_WComboBox", "WH1", 5, 5, 1, Qt.LeftButton);
    }
    
    waitForObject(":Quantities on Hand by Item.Query_QPushButton");
    clickButton(":Quantities on Hand by Item.Query_QPushButton");
    waitForObject(":_qoh_XTreeWidget");
    var sWidgetTreeControl = ":_qoh_XTreeWidget";
    waitForObject(sWidgetTreeControl);
    var obj_TreeWidget = findObject(sWidgetTreeControl);
    var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
    var iNumberOfRootItems = obj_TreeRootItem.childCount();
    var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
    var sNameOfRootItem2 = obj_TreeTopLevelItem.text(3);
    
    if(parseInt(sNameOfRootItem2.toString()) == parseInt(sNameOfRootItem.toString()) - parseInt(soqty.toString()))
        test.pass(" QOH updated correctly for Issue Stock to Shipping"); 
    else test.fail("QOH updated incorrectly for Issue Stock to Shipping");
    
    waitForObject(":Quantities on Hand by Item.Close_QPushButton");
    clickButton(":Quantities on Hand by Item.Close_QPushButton");
    
    //-----Select Order for Billing-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
    waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
    waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
    activateItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
    
    waitForObject(":_orderGroup...._QPushButton");
    clickButton(":_orderGroup...._QPushButton");
    waitForObject(":Select Order for Billing._so_XTreeWidget");
    doubleClickItem(":Select Order for Billing._so_XTreeWidget", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":_lineitemsTab.Select Balance_QPushButton");
    clickButton(":_lineitemsTab.Select Balance_QPushButton");
    waitForObject(":Select Order for Billing.Save_QPushButton");
    clickButton(":Select Order for Billing.Save_QPushButton");
    
    waitForObject(":Select Order for Billing.Close_QPushButton");
    clickButton(":Select Order for Billing.Close_QPushButton");
    test.log("Sales order Selected for Billing"); 
    
    //-----Creating Invoices-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
    waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
    type(":xTuple ERP: *.Billing_QMenu","<Right>");
    waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
    activateItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
    
    waitForObject(":Billing Selections.Create All_QPushButton");
    clickButton(":Billing Selections.Create All_QPushButton");
    
    waitForObject(":Billing Selections.Post_QPushButton");
    clickButton(":Billing Selections.Post_QPushButton");
    
    waitForObject(":Billing Selections.Close_QPushButton");
    clickButton(":Billing Selections.Close_QPushButton");
    test.log("Invoice created successful");
    
    //-----Posting Invoices-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
    activateItem(":xTuple ERP: *_QMenuBar", "Sales");
    waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
    activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
    waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
    activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
    type(":xTuple ERP: *.Billing_QMenu","<Right>");
    waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
    activateItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
    
    waitForObject(":_invchead_XTreeWidget");
    doubleClickItem(":_invchead_XTreeWidget", quote, 5, 5, 1, Qt.LeftButton);
    snooze(0.5);
    
    qtinvoice = findObject(":_invoiceNumber_XLineEdit").text;
    
    waitForObject(":Invoice.Close_QPushButton");
    clickButton(":Invoice.Close_QPushButton");
    
    waitForObject(":List Unposted Invoices.Post_QPushButton");
    clickButton(":List Unposted Invoices.Post_QPushButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");
    
    waitForObject(":List Unposted Invoices.Query_QPushButton");
    clickButton(":List Unposted Invoices.Query_QPushButton");
    
    waitForObject(":_invchead_XTreeWidget");
    doubleClickItem(":_invchead_XTreeWidget", sonumber, 5, 5, 1, Qt.LeftButton);
    snooze(0.5);
    
    soinvoice = findObject(":_invoiceNumber_XLineEdit").text;
    
    waitForObject(":Invoice.Close_QPushButton");
    clickButton(":Invoice.Close_QPushButton");
    
    waitForObject(":List Unposted Invoices.Post_QPushButton");
    clickButton(":List Unposted Invoices.Post_QPushButton");
    waitForObject(":List Unposted Invoices.Continue_QPushButton");
    clickButton(":List Unposted Invoices.Continue_QPushButton");
    
    
    waitForObject(":List Unposted Invoices.Close_QPushButton");
    clickButton(":List Unposted Invoices.Close_QPushButton");
    test.log("Invoice posted successful");
    
    //-----Entering Cash Receipts-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
    activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Workbench...");
    waitForObject(":Receivables Workbench.qt_tabwidget_tabbar_QTabBar");
    clickTab(":Receivables Workbench.qt_tabwidget_tabbar_QTabBar", "Cash Receipts");
    
    waitForObject(":_cashRecptTab.New_QPushButton");
    clickButton(":_cashRecptTab.New_QPushButton");
    waitForObject(":Cash Receipt...._QPushButton");
    clickButton(":Cash Receipt...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_5");
    doubleClickItem(":_listTab_XTreeWidget_5", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_applicationsTab._aropen_XTreeWidget");
    doubleClickItem(":_applicationsTab._aropen_XTreeWidget", quote, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Cash Receipt_XLineEdit");
    
    qtamount = findObject(":Cash Receipt._currency_XLineEdit").text;
    
    type(":Cash Receipt_XLineEdit", qtamount);
    waitForObject(":Cash Receipt.Save_QPushButton");
    clickButton(":Cash Receipt.Save_QPushButton");
    
    waitForObject(":_amountGroup._currency_XLineEdit");
    type(":_amountGroup._currency_XLineEdit", qtamount);
    waitForObject(":Cash Receipt.Save_QPushButton_2");
    clickButton(":Cash Receipt.Save_QPushButton_2");
    
    waitForObject(":_cashRecptTab.New_QPushButton");
    clickButton(":_cashRecptTab.New_QPushButton");
    waitForObject(":Cash Receipt...._QPushButton");
    clickButton(":Cash Receipt...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_5");
    doubleClickItem(":_listTab_XTreeWidget_5", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":_applicationsTab._aropen_XTreeWidget");
    doubleClickItem(":_applicationsTab._aropen_XTreeWidget", sonumber, 5, 5, 0, Qt.LeftButton);
    waitForObject(":Cash Receipt_XLineEdit");
    
    soamount = findObject(":Cash Receipt._currency_XLineEdit").text;
    
    type(":Cash Receipt_XLineEdit", soamount);
    waitForObject(":Cash Receipt.Save_QPushButton");
    clickButton(":Cash Receipt.Save_QPushButton");
    
    waitForObject(":_amountGroup._currency_XLineEdit");
    type(":_amountGroup._currency_XLineEdit", soamount);
    waitForObject(":Cash Receipt.Save_QPushButton_2");
    clickButton(":Cash Receipt.Save_QPushButton_2");
    
    //-----Posting Cash Receipts-----
    waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
    
    while(findObject(":_cashRecptTab._cashrcpt_XTreeWidget").topLevelItemCount >= 1)
    {
        clickItem(":_cashRecptTab._cashrcpt_XTreeWidget", "TTOYS", 5, 5, 1, Qt.LeftButton);
        waitForObject(":_cashRecptTab.Post_QPushButton");
        clickButton(":_cashRecptTab.Post_QPushButton");
    }   
    
    waitForObject(":Receivables Workbench.Close_QPushButton");
    clickButton(":Receivables Workbench.Close_QPushButton");
    test.log("Cash receipts posted successful");
    
    //-----Customer History-----
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
    activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
    waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
    activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
    waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Reports");
    activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Reports");
    waitForObjectItem(":xTuple ERP:  *.Reports_QMenu", "Customer History...");
    activateItem(":xTuple ERP:  *.Reports_QMenu", "Customer History...");
    
    waitForObject(":Selection...._QPushButton");
    clickButton(":Selection...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_6");
    doubleClickItem(":_listTab_XTreeWidget_6", "TTOYS", 5, 5, 0, Qt.LeftButton);
    waitForObject(":Document Date Range.XDateEdit_XDateEdit");
    type(":Document Date Range.XDateEdit_XDateEdit", "0");  
    waitForObject(":Document Date Range.XDateEdit_XDateEdit_2");
    type(":Document Date Range.XDateEdit_XDateEdit_2", "0");
    waitForObject(":Customer History.Query_QPushButton");
    clickButton(":Customer History.Query_QPushButton");
    waitForObject(":_frame._custhist_XTreeWidget");
    
    if(!clickItem(":_frame._custhist_XTreeWidget", qtinvoice, 5, 5, 1, Qt.LeftButton))
        test.pass(" Invoice for Quote posted and available in Customer History");
    else test.fail("Invoice for Quote not available in Customer History");
    
    if(!clickItem(":_frame._custhist_XTreeWidget", soinvoice, 5, 5, 1, Qt.LeftButton))
        test.pass(" Invoice for Sales Order posted and available in Customer History");
    else test.fail("Invoice for Sales Order not available in Customer History");
    
    waitForObject(":Customer History.Close_QPushButton");
    clickButton(":Customer History.Close_QPushButton");
    
    
}
