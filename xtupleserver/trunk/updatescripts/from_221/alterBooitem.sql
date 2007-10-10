BEGIN;

ALTER TABLE booitem ADD COLUMN booitem_rev_id INTEGER DEFAULT -1;
ALTER TABLE booitem ADD COLUMN booitem_seq_id SERIAL;

COMMIT;