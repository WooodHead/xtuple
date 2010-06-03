BEGIN;

-- Set values in constrained fields where they might be missing
UPDATE prj SET prj_number = prj_id::text WHERE (prj_number IS NULL);
UPDATE prj SET prj_name = 'Project ' || prj_number WHERE (prj_name IS NULL);
UPDATE prj SET prj_descrip = '' WHERE (prj_descrip IS NULL);
UPDATE prj SET prj_status = 'P' WHERE (prj_status IS NULL);
UPDATE prj SET prj_status = 'P' WHERE (prj_status NOT IN ('P','O','C'));
UPDATE prj SET prj_so = false WHERE (prj_so IS NULL);
UPDATE prj SET prj_wo = false WHERE (prj_wo IS NULL);
UPDATE prj SET prj_po = false WHERE (prj_po IS NULL);

-- Add constraints
ALTER TABLE prj ADD UNIQUE (prj_number);
ALTER TABLE prj ALTER COLUMN prj_number SET NOT NULL;
ALTER TABLE prj ALTER COLUMN prj_name SET NOT NULL;
ALTER TABLE prj ALTER COLUMN prj_status SET NOT NULL;
ALTER TABLE prj ADD CHECK (prj_status IN ('P','O','C'));

COMMIT;