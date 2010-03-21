BEGIN;

ALTER TABLE quhead ADD COLUMN quhead_calcfreight BOOLEAN;
UPDATE quhead SET quhead_calcfreight=FALSE;
ALTER TABLE quhead ALTER quhead_calcfreight SET NOT NULL;
ALTER TABLE quhead ALTER quhead_calcfreight SET DEFAULT FALSE;

ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_id INT;
ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_honorific text;
ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_first_name text;
ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_middle text;
ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_last_name text;
ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_suffix text;
ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_phone text;
ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_title text;
ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_fax text;
ALTER TABLE quhead ADD COLUMN quhead_shipto_cntct_email text;

ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_id INT;
ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_honorific text;
ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_first_name text;
ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_middle text;
ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_last_name text;
ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_suffix text;
ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_phone text;
ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_title text;
ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_fax text;
ALTER TABLE quhead ADD COLUMN quhead_billto_cntct_email text;

COMMIT;
