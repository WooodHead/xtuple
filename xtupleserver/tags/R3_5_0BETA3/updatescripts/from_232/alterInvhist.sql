BEGIN;

ALTER TABLE invhist ALTER COLUMN invhist_posted SET DEFAULT TRUE;
ALTER TABLE invhist ADD invhist_created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE invhist SET invhist_created = invhist_transdate;

COMMIT;
