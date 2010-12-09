BEGIN;

ALTER TABLE taxhist ADD COLUMN taxhist_curr_id INTEGER REFERENCES curr_symbol (curr_id);
ALTER TABLE taxhist ADD COLUMN taxhist_curr_rate NUMERIC(11,6);

COMMIT;