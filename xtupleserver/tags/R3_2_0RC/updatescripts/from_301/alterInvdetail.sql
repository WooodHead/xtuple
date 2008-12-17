BEGIN;

--Take out some trash
ALTER TABLE invdetail DROP COLUMN invdetail_lotserial;

COMMIT;