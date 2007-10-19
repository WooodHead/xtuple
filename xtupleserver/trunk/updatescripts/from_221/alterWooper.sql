BEGIN;

ALTER TABLE wooper ADD COLUMN wooper_booitem_seq_id INTEGER DEFAULT -1;
ALTER TABLE wooper DROP COLUMN wooper_booitem_id;

COMMIT;