BEGIN;

ALTER TABLE poitem DROP CONSTRAINT poitem_poitem_wohead_id_fkey;
ALTER TABLE poitem ADD FOREIGN KEY (poitem_wohead_id) REFERENCES wo (wo_id) ON DELETE SET NULL;

COMMIT;
