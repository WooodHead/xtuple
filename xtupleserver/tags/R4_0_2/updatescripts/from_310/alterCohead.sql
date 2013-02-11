BEGIN;

ALTER TABLE cohead ADD COLUMN cohead_calcfreight BOOLEAN;
UPDATE cohead SET cohead_calcfreight=FALSE;
ALTER TABLE cohead ALTER cohead_calcfreight SET NOT NULL;
ALTER TABLE cohead ALTER cohead_calcfreight SET DEFAULT FALSE;

ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_id INT;
ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_honorific text;
ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_first_name text;
ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_middle text;
ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_last_name text;
ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_suffix text;
ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_phone text;
ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_title text;
ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_fax text;
ALTER TABLE cohead ADD COLUMN cohead_shipto_cntct_email text;

ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_id INT;
ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_honorific text;
ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_first_name text;
ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_middle text;
ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_last_name text;
ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_suffix text;
ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_phone text;
ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_title text;
ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_fax text;
ALTER TABLE cohead ADD COLUMN cohead_billto_cntct_email text;

COMMIT;
