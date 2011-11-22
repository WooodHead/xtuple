ALTER TABLE coitem DROP CONSTRAINT coitem_coitem_substitute_item_id_fkey;
ALTER TABLE coitem ADD FOREIGN KEY (coitem_substitute_item_id) REFERENCES item (item_id); 
