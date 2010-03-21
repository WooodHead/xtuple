BEGIN;

--Correct bad values if we need to
UPDATE itemsrc SET itemsrc_invvendoruomratio=1 WHERE itemsrc_invvendoruomratio IS NULL;
UPDATE itemsrc SET itemsrc_minordqty=0 WHERE itemsrc_minordqty IS NULL;
UPDATE itemsrc SET itemsrc_multordqty=0 WHERE itemsrc_multordqty IS NULL;
UPDATE itemsrc SET itemsrc_active=false WHERE itemsrc_active IS NULL;
UPDATE itemsrc SET itemsrc_leadtime=0 WHERE itemsrc_leadtime IS NULL;
UPDATE itemsrc SET itemsrc_ranking=1 WHERE itemsrc_ranking IS NULL;

ALTER TABLE itemsrc ADD UNIQUE (itemsrc_vend_id,itemsrc_item_id);
ALTER TABLE itemsrc ALTER COLUMN itemsrc_vend_uom SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_item_id SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_vend_id SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_invvendoruomratio SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_minordqty SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_multordqty SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_active SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_ranking SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_leadtime SET NOT NULL;
ALTER TABLE itemsrc ADD FOREIGN KEY (itemsrc_vend_id) REFERENCES vendinfo (vend_id) ON DELETE CASCADE;
ALTER TABLE itemsrc ADD FOREIGN KEY (itemsrc_item_id) REFERENCES item (item_id) ON DELETE CASCADE;

COMMIT;