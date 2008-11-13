BEGIN;

ALTER TABLE bomhist ADD COLUMN bomhist_notes TEXT;
ALTER TABLE bomhist ADD COLUMN bomhist_ref TEXT;

COMMIT;