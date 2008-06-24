BEGIN;

ALTER TABLE item ADD UNIQUE(item_number);
SELECT dropIfExists('CONSTRAINT', 'item_item_price_uom_id_fkey1');
SELECT dropIfExists('CONSTRAINT', 'item_item_inv_uom_id_fkey1');

COMMIT;
