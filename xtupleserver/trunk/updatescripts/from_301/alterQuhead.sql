BEGIN;

UPDATE quhead SET quhead_warehous_id=NULL WHERE (quhead_warehous_id=-1);
UPDATE quhead SET quhead_shipto_id=NULL WHERE (quhead_shipto_id=-1);
UPDATE quhead SET quhead_misc_accnt_id=NULL WHERE (quhead_misc_accnt_id=-1);
UPDATE quhead SET quhead_prj_id=NULL WHERE (quhead_prj_id=-1);
ALTER TABLE quhead ADD UNIQUE (quhead_number);
ALTER TABLE quhead ADD CHECK ((quhead_misc = 0 AND quhead_misc_accnt_id IS NULL) OR 
                              (quhead_misc > 0 AND quhead_misc_accnt_id IS NOT NULL));
ALTER TABLE quhead ADD FOREIGN KEY (quhead_warehous_id) REFERENCES whsinfo (warehous_id); 
ALTER TABLE quhead ADD FOREIGN KEY (quhead_salesrep_id) REFERENCES salesrep (salesrep_id);
ALTER TABLE quhead ADD FOREIGN KEY (quhead_terms_id) REFERENCES terms (terms_id);
ALTER TABLE quhead ADD FOREIGN KEY (quhead_shipto_id) REFERENCES shiptoinfo (shipto_id);
ALTER TABLE quhead ADD FOREIGN KEY (quhead_misc_accnt_id) REFERENCES accnt (accnt_id);
ALTER TABLE quhead ADD FOREIGN KEY (quhead_prj_id) REFERENCES prj (prj_id);
ALTER TABLE quhead ALTER COLUMN quhead_cust_id SET NOT NULL;

COMMIT;