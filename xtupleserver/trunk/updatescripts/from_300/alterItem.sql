BEGIN;

ALTER TABLE item ADD UNIQUE(item_number);
SELECT dropIfExists('CONSTRAINT', 'item_item_price_uom_id_fkey1');
SELECT dropIfExists('CONSTRAINT', 'item_item_inv_uom_id_fkey1');

--Take out some trash
ALTER TABLE item DROP COLUMN item_invuom;
ALTER TABLE item DROP COLUMN item_capuom;
ALTER TABLE item DROP COLUMN item_capinvrat;
ALTER TABLE item DROP COLUMN item_altcapuom;
ALTER TABLE item DROP COLUMN item_altcapinvrat;
ALTER TABLE item DROP COLUMN item_priceuom;
ALTER TABLE item DROP COLUMN item_priceinvrat;
ALTER TABLE item DROP COLUMN item_taxable;
ALTER TABLE item DROP COLUMN item_shipuom;
ALTER TABLE item DROP COLUMN item_shipinvrat;
ALTER TABLE item DROP COLUMN item_invpricerat;

COMMIT;
