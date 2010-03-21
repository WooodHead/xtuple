BEGIN;

ALTER TABLE invdetail ADD COLUMN invdetail_warrpurc DATE;
ALTER TABLE invdetail ADD COLUMN invdetail_ls_id INTEGER;
COMMENT ON COLUMN invdetail.invdetail_lotserial IS 'invdetail_lotserial is deprecated';

COMMIT;
