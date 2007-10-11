BEGIN;

ALTER TABLE booitem ADD COLUMN booitem_rev_id INTEGER DEFAULT -1;
ALTER TABLE booitem ADD COLUMN booitem_seq_id SERIAL;

UPDATE bomitem SET bomitem_booitem_id=booitem_seq_id
FROM booitem 
WHERE booitem_id=bomitem_booitem_id;

COMMIT;