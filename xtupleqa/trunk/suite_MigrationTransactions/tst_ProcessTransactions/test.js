function main()
{
  //---Post Production----
    waitForObject(":frame._wo_XTreeWidget");
    clickItem(":frame._wo_XTreeWidget", "50195-1", 5, 5, 1, Qt.RightButton);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Post Production...");
    waitForObject(":_qty_XLineEdit");
    type(":_qty_XLineEdit", "100");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton");
    waitForObjectItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget", "50196-1");
    clickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget", "50196-1", 58, 4, 1, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code._itemloc_XTreeWidget");
    doubleClickItem(":W/O Schedule by Planner Code._itemloc_XTreeWidget","No", 5, 5, 0, Qt.LeftButton);
    waitForObject(":W/O Schedule by Planner Code.Distribute_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Distribute_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Post_QPushButton_2");
    clickButton(":W/O Schedule by Planner Code.Post_QPushButton_2");
    
    waitForObject(":W/O Schedule by Planner Code.Close_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close_QPushButton");
    
    
    
    
    
    
    
    
    //----Issue stock to Shipping----        
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50195", 5, 5, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    aitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    
    
    //----Issue stock to Shipping and Ship the Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50196", 13, 7, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    clickButton(":groupBox.Select for Billing_QCheckBox");
    waitForObject(":groupBox.Create and Print Invoice_XCheckBox");
    clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    waitForObject(":groupBox.Print Packing List_XCheckBox");
    clickButton(":groupBox.Print Packing List_XCheckBox");
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    waitForObject(":Issue to Shipping.Post Invoices after Printing_QCheckBox");
    clickButton(":Issue to Shipping.Post Invoices after Printing_QCheckBox");
    waitForObject(":Issue to Shipping.Cancel_QPushButton");
    clickButton(":Issue to Shipping.Cancel_QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    
    
    //----Issue stock to Shipping, Select for Billing and Ship the Order----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50197", 13, 7, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    clickButton(":groupBox.Select for Billing_QCheckBox");
    waitForObject(":groupBox.Create and Print Invoice_XCheckBox");
    clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    waitForObject(":groupBox.Print Packing List_XCheckBox");
    clickButton(":groupBox.Print Packing List_XCheckBox");
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    waitForObject(":Issue to Shipping.Post Invoices after Printing_QCheckBox");
    clickButton(":Issue to Shipping.Post Invoices after Printing_QCheckBox");
    waitForObject(":Issue to Shipping.Cancel_QPushButton");
    clickButton(":Issue to Shipping.Cancel_QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    
    
    
    //----Issue stock to Shipping, Select for Billing and Ship the Order - Create the Invoice----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50198", 13, 7, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    clickButton(":groupBox.Select for Billing_QCheckBox");
    waitForObject(":groupBox.Create and Print Invoice_XCheckBox");
    clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    waitForObject(":groupBox.Print Packing List_XCheckBox");
    clickButton(":groupBox.Print Packing List_XCheckBox");
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    waitForObject(":Issue to Shipping.Post Invoices after Printing_QCheckBox");
    clickButton(":Issue to Shipping.Post Invoices after Printing_QCheckBox");
    waitForObject(":Issue to Shipping.Cancel_QPushButton");
    clickButton(":Issue to Shipping.Cancel_QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    
    
    //----Issue stock to Shipping, Select for Billing and Ship the Order -Post the Invoice----
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Inventory");
    waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    activateItem(":xTuple ERP:*.Inventory_QMenu", "Shipping");
    waitForObjectItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    activateItem(":xTuple ERP:*.Shipping_QMenu", "Issue to Shipping...");
    waitForObject(":Issue to Shipping...._QPushButton");
    clickButton(":Issue to Shipping...._QPushButton");
    waitForObject(":_listTab_XTreeWidget_4");
    doubleClickItem(":_listTab_XTreeWidget_4", "50198", 13, 7, 0, Qt.LeftButton);
    waitForObject(":frame.Issue All Bal._QPushButton");
    clickButton(":frame.Issue All Bal._QPushButton");
    waitForObject(":Issue to Shipping.Ship Order_QPushButton");
    clickButton(":Issue to Shipping.Ship Order_QPushButton");
    waitForObject(":groupBox.Select for Billing_QCheckBox");
    clickButton(":groupBox.Select for Billing_QCheckBox");
    waitForObject(":groupBox.Create and Print Invoice_XCheckBox");
    clickButton(":groupBox.Create and Print Invoice_XCheckBox");
    waitForObject(":groupBox.Print Packing List_XCheckBox");
    clickButton(":groupBox.Print Packing List_XCheckBox");
    waitForObject(":Issue to Shipping.Ship_QPushButton");
    clickButton(":Issue to Shipping.Ship_QPushButton");
    waitForObject(":Issue to Shipping.Post Invoices after Printing_QCheckBox");
    clickButton(":Issue to Shipping.Post Invoices after Printing_QCheckBox");
    waitForObject(":Issue to Shipping.Cancel_QPushButton");
    clickButton(":Issue to Shipping.Cancel_QPushButton");
    waitForObject(":Issue to Shipping.Close_QPushButton");
    clickButton(":Issue to Shipping.Close_QPushButton");
    
    
    
  
    
    
        //-------Close Work Order-------
    var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
    for(i=0;i<iNumberOfRootItems ;i++)
    {
        obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
        sNameOfRootItem = obj_TreeTopLevelItem.text(1);
        if(sNameOfRootItem=="10067-1") break;
        type(sWidgetTreeControl,"<Down>"); 
    }
    sendEvent("QContextMenuEvent", ":frame._wo_XTreeWidget", QContextMenuEvent.Keyboard, 5, 5, 0);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Close W/O...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Close W/O...");
    waitForObject(":W/O Schedule by Planner Code.Close W/O_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close W/O_QPushButton");
    waitForObject(":W/O Schedule by Planner Code.Close Work Order_QPushButton");
    clickButton(":W/O Schedule by Planner Code.Close Work Order_QPushButton");

        
    
  
    
    
   
   
    
    
    
    
    
    
   
     
   
    
    //------Release Purchase Request-------
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    activateItem(":xTuple ERP:*_QMenuBar_2", "Purchase");
    waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
    activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Requests");
    waitForObjectItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code...");
    activateItem(":xTuple ERP:*.Purchase Requests_QMenu", "by Planner Code...");
    
    waitForObject(":Purchase Requests by Planner Code.Query_QPushButton");
    clickButton(":Purchase Requests by Planner Code.Query_QPushButton");
    waitForObject(":Purchase Requests by Planner Code._pr_XTreeWidget");
    clickItem(":Purchase Requests by Planner Code._pr_XTreeWidget","10054", 5, 5, 1,Qt.RightButton);
    waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
    activateItem(":xTuple ERP:*._menu_QMenu", "Release P/R...");
    waitForObject(":_frame._itemsrc_XTreeWidget");
    doubleClickItem(":_frame._itemsrc_XTreeWidget", "Toy Parts Inc\\.", 18, 8, 0, Qt.LeftButton);
    waitForObject(":Purchase Order Item.Save_QPushButton");
    clickButton(":Purchase Order Item.Save_QPushButton");
    waitForObject(":Purchase Order.Save_QPushButton");
    clickButton(":Purchase Order.Save_QPushButton");
    waitForObject(":Purchase Order.Close_QPushButton");
    clickButton(":Purchase Order.Close_QPushButton");
    
    waitForObject(":Purchase Requests by Planner Code.Close_QPushButton");
    clickButton(":Purchase Requests by Planner Code.Close_QPushButton");    
}
    
    
