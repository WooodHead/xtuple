BEGIN;

ALTER TABLE cntslip ADD COLUMN cntslip_username TEXT;
UPDATE cntslip SET cntslip_username = (SELECT usename FROM pg_user WHERE usesysid=cntslip_user_id);
ALTER TABLE cntslip DROP COLUMN cntslip_user_id;

COMMIT;

