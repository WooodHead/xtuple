BEGIN;

DELETE FROM prjtask WHERE prjtask_prj_id IS NULL;

ALTER TABLE prjtask ALTER COLUMN prjtask_prj_id SET NOT NULL;

COMMIT;