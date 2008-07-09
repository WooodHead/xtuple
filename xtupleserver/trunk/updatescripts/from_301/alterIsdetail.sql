BEGIN;

--Take out some trash
ALTER TABLE lsdetail DROP COLUMN lsdetail_lotserial;

COMMIT;