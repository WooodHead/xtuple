BEGIN;

ALTER TABLE itemlocdist ADD COLUMN itemlocdist_warranty DATE;
ALTER TABLE itemlocdist ADD COLUMN itemlocdist_ls_id INTEGER;
ALTER TABLE itemlocdist DROP COLUMN itemlocdist_lotserial;

COMMIT;