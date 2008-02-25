BEGIN;

ALTER TABLE bomitem ADD COLUMN bomitem_char_id INTEGER REFERENCES char (char_id);
ALTER TABLE bomitem ADD COLUMN bomitem_char_value TEXT;

COMMIT;