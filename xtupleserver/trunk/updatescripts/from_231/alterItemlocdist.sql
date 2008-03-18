BEGIN;

ALTER TABLE itemlocdist ADD COLUMN itemlocdist_warranty DATE;

COMMIT;