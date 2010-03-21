BEGIN;

ALTER TABLE prjtask ADD COLUMN prjtask_owner_username TEXT;
ALTER TABLE prjtask ADD COLUMN prjtask_usr_id INTEGER;
ALTER TABLE prjtask ADD COLUMN prjtask_start_date DATE;
ALTER TABLE prjtask ADD COLUMN prjtask_due_date DATE;
ALTER TABLE prjtask ADD COLUMN prjtask_assigned_date DATE;
ALTER TABLE prjtask ADD COLUMN prjtask_completed_date DATE;

COMMIT;
