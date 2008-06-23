BEGIN;

ALTER TABLE item ADD UNIQUE(item_number);
ALTER TABLE item DROP CONSTRAINT item_item_price_uom_id_fkey1;
ALTER TABLE item DROP CONSTRAINT item_item_inv_uom_id_fkey1;

COMMIT;