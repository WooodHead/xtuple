BEGIN;

-- Do not include this in OpenMFG upgrade from 3.0.0 Beta1
ALTER TABLE incdt ADD COLUMN incdt_ls_id INTEGER;
COMMENT ON COLUMN incdt.incdt_lotserial IS 'incdt_lotserial is deprecated';

COMMIT;
