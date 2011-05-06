BEGIN;

-- Set values in constrained fields where they might be missing
UPDATE prjtask SET prjtask_number = prjtask_id::text WHERE (prjtask_number IS NULL);
UPDATE prjtask SET prjtask_name = 'Project ' || prjtask_number WHERE (prjtask_name IS NULL);
UPDATE prjtask SET prjtask_descrip = '' WHERE (prjtask_descrip IS NULL);
UPDATE prjtask SET prjtask_status = 'P' WHERE (prjtask_status IS NULL);
UPDATE prjtask SET prjtask_status = 'P' WHERE (prjtask_status NOT IN ('P','O','C'));
UPDATE prjtask SET prjtask_hours_budget = 0 WHERE (prjtask_hours_budget IS NULL);
UPDATE prjtask SET prjtask_hours_actual = 0 WHERE (prjtask_hours_actual IS NULL);
UPDATE prjtask SET prjtask_exp_budget = 0 WHERE (prjtask_exp_budget IS NULL);
UPDATE prjtask SET prjtask_exp_actual = 0 WHERE (prjtask_exp_actual IS NULL);

-- Add constraints
ALTER TABLE prjtask ADD UNIQUE (prjtask_prj_id,prjtask_number);
ALTER TABLE prjtask ALTER COLUMN prjtask_number SET NOT NULL;
ALTER TABLE prjtask ALTER COLUMN prjtask_name SET NOT NULL;
ALTER TABLE prjtask ALTER COLUMN prjtask_status SET NOT NULL;
ALTER TABLE prjtask ADD CHECK (prjtask_status IN ('P','O','C'));
ALTER TABLE prjtask ALTER COLUMN prjtask_hours_budget SET NOT NULL;
ALTER TABLE prjtask ALTER COLUMN prjtask_hours_actual SET NOT NULL;
ALTER TABLE prjtask ALTER COLUMN prjtask_exp_budget SET NOT NULL;
ALTER TABLE prjtask ALTER COLUMN prjtask_exp_actual SET NOT NULL;

COMMIT;