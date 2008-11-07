BEGIN;

ALTER TABLE invhist ADD COLUMN invhist_costmethod CHAR(1) CHECK(invhist_costmethod IN ('S', 'A'));
ALTER TABLE invhist ADD COLUMN invhist_value_before numeric(12, 2);
ALTER TABLE invhist ADD COLUMN invhist_value_after numeric(12, 2);

UPDATE invhist
   SET invhist_costmethod='S',
       invhist_value_before=COALESCE(invhist_unitcost * invhist_qoh_before, 0),
       invhist_value_after=COALESCE(invhist_unitcost * invhist_qoh_after, 0);

ALTER TABLE invhist ALTER COLUMN invhist_costmethod SET NOT NULL;
ALTER TABLE invhist ALTER COLUMN invhist_value_before SET NOT NULL;
ALTER TABLE invhist ALTER COLUMN invhist_value_after SET NOT NULL;

COMMIT;

