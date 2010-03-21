BEGIN;

ALTER TABLE ipsitem add constraint ipsitem_item_id_fk foreign key (ipsitem_item_id) references item (item_id); 
ALTER TABLE ipsitem add constraint ipsitem_ipshead_id_fk foreign key (ipsitem_ipshead_id) references ipshead (ipshead_id) on delete cascade; 
ALTER TABLE ipsitem ADD UNIQUE (ipsitem_ipshead_id,ipsitem_item_id,ipsitem_qtybreak,ipsitem_qty_uom_id, ipsitem_price_uom_id);

COMMIT;