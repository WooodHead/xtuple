
BEGIN;

ALTER TABLE itemlocdist ADD COLUMN itemlocdist_order_type TEXT;
ALTER TABLE itemlocdist ADD COLUMN itemlocdist_order_id INTEGER;

COMMIT;
