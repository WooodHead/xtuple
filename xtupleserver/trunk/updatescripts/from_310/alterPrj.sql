BEGIN;

ALTER TABLE prj ADD COLUMN prj_owner_username text;
ALTER TABLE prj ADD COLUMN prj_usr_id INTEGER;
ALTER TABLE prj ADD COLUMN prj_start_date date;
ALTER TABLE prj ADD COLUMN prj_due_date date;
ALTER TABLE prj ADD COLUMN prj_assigned_date date;
ALTER TABLE prj ADD COLUMN prj_completed_date date;

COMMIT;
