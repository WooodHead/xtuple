BEGIN;

ALTER TABLE cntct ADD COLUMN cntct_owner_username text;

COMMIT;