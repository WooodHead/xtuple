INSERT INTO evnttype(
            evnttype_name, evnttype_descrip, evnttype_module)
    VALUES ('PoItemCreatedBySo', 'Purchase Order Item Created by a Sales Order', 'P/O');

INSERT INTO evnttype(
            evnttype_name, evnttype_descrip, evnttype_module)
    VALUES ('PoItemUpdatedBySo', 'Purchase Order Item Updated by a Sales Order', 'P/O');

INSERT INTO evnttype(
            evnttype_name, evnttype_descrip, evnttype_module)
    VALUES ('PoItemSoCancelled', 'The Sales Order item has been cancelled for a linked Purchase Item', 'P/O');

INSERT INTO evnttype(
            evnttype_name, evnttype_descrip, evnttype_module)
    VALUES ('PoItemDropShipped', 'A Purchase Order Item has been Drop Shipped', 'P/O');