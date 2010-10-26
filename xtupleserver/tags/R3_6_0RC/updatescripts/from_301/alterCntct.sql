BEGIN;

ALTER TABLE cntct ADD COLUMN cntct_middle text;
ALTER TABLE cntct ADD COLUMN cntct_suffix text;

COMMIT;