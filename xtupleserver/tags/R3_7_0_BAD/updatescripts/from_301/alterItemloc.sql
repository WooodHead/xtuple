BEGIN;

--Take out some trash
ALTER TABLE itemloc DROP COLUMN itemloc_lotserial;

COMMIT;