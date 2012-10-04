BEGIN;

ALTER TABLE poitem ADD COLUMN poitem_bom_rev_id INTEGER;
ALTER TABLE poitem ADD COLUMN poitem_boo_rev_id INTEGER;

END;