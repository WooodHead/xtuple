BEGIN;

ALTER TABLE shipitem ADD COLUMN shipitem_invhist_id INTEGER REFERENCES invhist (invhist_id);

COMMIT;