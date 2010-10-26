BEGIN;

ALTER TABLE bomwork ADD COLUMN bomwork_char_id INTEGER REFERENCES char (char_id);
ALTER TABLE bomwork ADD COLUMN bomwork_value TEXT;

COMMIT;