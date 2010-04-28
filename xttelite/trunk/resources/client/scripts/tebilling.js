// Variables
var _item		= mywindow.findChild("_item");

_item.populate("select item_id,item_number,item_descrip1,item_listprice from item where item_sold = true and item_active = true and item_type = 'R'");

//toolbox.messageBox("critical", mywindow, "test","items");