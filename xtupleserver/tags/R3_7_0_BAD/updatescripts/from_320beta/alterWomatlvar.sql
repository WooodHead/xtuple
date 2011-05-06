BEGIN;

ALTER TABLE womatlvar ADD COLUMN womatlvar_ref TEXT;
ALTER TABLE womatlvar ADD COLUMN womatlvar_notes TEXT;

COMMIT;