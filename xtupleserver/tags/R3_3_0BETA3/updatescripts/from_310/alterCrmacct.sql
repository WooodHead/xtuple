BEGIN;

ALTER TABLE crmacct ADD COLUMN crmacct_owner_username text;

COMMIT;