function executeChapter4()
{
    source(findFile("scripts","functions.js"));
    
  
   //---------------Create BOM for Items---------------------
  waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
  activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
  waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
  activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Bill Of Materials");
  waitForObjectItem(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu", "List...");
  activateItem(":xTuple ERP: OpenMFG Edition.Bill Of Materials_QMenu", "List...");
  
  
  //---------------Create BOM for YTRUCK1---------------
  waitForObject(":Bills of Materials.New_QPushButton");
  clickButton(":Bills of Materials.New_QPushButton");
  waitForObject(":_itemGroup._itemNumber_ItemLineEdit");
  type(":_itemGroup._itemNumber_ItemLineEdit", "YTRUCK1");
  waitForObject(":_itemGroup._itemNumber_ItemLineEdit");
  type(":_itemGroup._itemNumber_ItemLineEdit", "<Tab>");
 
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TBODY1");
  type(":_qtyPer_XLineEdit", "1");
  type(":_scrap_XLineEdit", "0");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Paint _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "intail definition");
  clickButton(":Bill of Materials Item.Save_QPushButton");


  
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "YPAINT1");
  waitForObject(":_qtyPer_XLineEdit");
  type(":_qtyPer_XLineEdit", ".01");
  type(":_scrap_XLineEdit", "0");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Paint _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "intial defintion");
  clickButton(":Bill of Materials Item.Save_QPushButton");
  
 
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TWHEEL1");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "<Tab>");
  waitForObject(":_qtyPer_XLineEdit");
  type(":_qtyPer_XLineEdit", "4");
  type(":_scrap_XLineEdit", "0");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Assembly _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "initial definition");
  clickButton(":Bill of Materials Item.Save_QPushButton");
  
  
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TKIT1");
  type(":_qtyPer_XLineEdit", "1");
  type(":_scrap_XLineEdit", "0");
  waitForObject(":_scrap_XLineEdit");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Shipping _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "initial defintion");
  clickButton(":Bill of Materials Item.Save_QPushButton");
  
  waitForObject(":Bill of Materials.Save_QPushButton");
  clickButton(":Bill of Materials.Save_QPushButton");
  waitForObject(":Bills of Materials._bom_XTreeWidget");
  if(!clickItem(":Bills of Materials._bom_XTreeWidget", "YTRUCK1", 5, 5, 1, Qt.LeftButton))
      test.pass("BOM created for: YTRUCK1");


  
  
  //---------------Create BOM for TKIT1---------------
  waitForObject(":Bills of Materials.New_QPushButton");
  clickButton(":Bills of Materials.New_QPushButton");
  waitForObject(":_itemGroup._itemNumber_ItemLineEdit");
  type(":_itemGroup._itemNumber_ItemLineEdit", "TKIT1");
  waitForObject(":_itemGroup._itemNumber_ItemLineEdit");
  type(":_itemGroup._itemNumber_ItemLineEdit", "<Tab>");
 
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TBOX1");
  type(":_qtyPer_XLineEdit", "1");
  type(":_scrap_XLineEdit", "0");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Assembly _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "intail definition");
  clickButton(":Bill of Materials Item.Save_QPushButton");
  
  waitForObject(":frame_2.New_QPushButton");
  clickButton(":frame_2.New_QPushButton");
  waitForObject(":Bill of Materials Item._itemNumber_ItemLineEdit");
  type(":Bill of Materials Item._itemNumber_ItemLineEdit", "TINSERT1");
  waitForObject(":_qtyPer_XLineEdit");
  type(":_qtyPer_XLineEdit", "1");
  type(":_scrap_XLineEdit", "10");
  clickButton(":Bill of Materials Item...._QPushButton");
  waitForObject(":Bill of Operations Items._booitem_XTreeWidget");
  doubleClickItem(":Bill of Operations Items._booitem_XTreeWidget", "Standard Operation - Assembly _1", 5, 5, 0, Qt.LeftButton);
  waitForObject(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  clickButton(":Bill of Materials Item.Schedule at W/O Operation_QCheckBox");
  type(":_ecn_XLineEdit", "intial defintion");
  clickButton(":Bill of Materials Item.Save_QPushButton");
 
  waitForObject(":Bill of Materials.Save_QPushButton");
  clickButton(":Bill of Materials.Save_QPushButton");
  waitForObject(":Bills of Materials._bom_XTreeWidget");  
  if(!clickItem(":Bills of Materials._bom_XTreeWidget", "TKIT1", 5, 5, 1, Qt.LeftButton))
      test.pass("BOM created for: TKIT1");

  
  waitForObject(":Bills of Materials.Close_QPushButton");
  clickButton(":Bills of Materials.Close_QPushButton");
    
     
    
}
