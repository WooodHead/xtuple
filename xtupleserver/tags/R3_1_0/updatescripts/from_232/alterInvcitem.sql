BEGIN;

ALTER TABLE invcitem ADD CONSTRAINT invcitem_invchead_id_fkey FOREIGN KEY (invcitem_invchead_id) REFERENCES invchead (invchead_id)    ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE invcitem ADD CONSTRAINT invcitem_invchead_id_linenumber_unique UNIQUE (invcitem_invchead_id, invcitem_linenumber);
ALTER TABLE invcitem ALTER COLUMN invcitem_ordered SET NOT NULL;

COMMIT;
