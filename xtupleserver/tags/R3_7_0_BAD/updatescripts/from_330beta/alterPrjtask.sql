BEGIN;
-- Clean up any bad data
DELETE FROM prjtask WHERE prjtask_prj_id NOT IN (SELECT prj_id FROM prj);

ALTER TABLE prjtask ADD FOREIGN KEY (prjtask_prj_id) REFERENCES prj (prj_id);

COMMIT;