BEGIN;

ALTER TABLE cohead DISABLE TRIGGER soheadtrigger;   
UPDATE cohead SET cohead_warehous_id=NULL WHERE (cohead_warehous_id=-1);
UPDATE cohead SET cohead_shipto_id=NULL WHERE (cohead_shipto_id=-1);
UPDATE cohead SET cohead_misc_accnt_id=NULL WHERE (cohead_misc_accnt_id=-1);
UPDATE cohead SET cohead_prj_id=NULL WHERE (cohead_prj_id=-1);
ALTER TABLE cohead ADD UNIQUE (cohead_number);
ALTER TABLE cohead ADD CHECK ((cohead_misc = 0) OR 
                              (cohead_misc != 0 AND cohead_misc_accnt_id IS NOT NULL));
ALTER TABLE cohead ADD FOREIGN KEY (cohead_warehous_id) REFERENCES whsinfo (warehous_id);       
ALTER TABLE cohead ADD FOREIGN KEY (cohead_cust_id) REFERENCES custinfo (cust_id);
ALTER TABLE cohead ADD FOREIGN KEY (cohead_salesrep_id) REFERENCES salesrep (salesrep_id);
ALTER TABLE cohead ADD FOREIGN KEY (cohead_shipform_id) REFERENCES shipform (shipform_id);
ALTER TABLE cohead ADD FOREIGN KEY (cohead_terms_id) REFERENCES terms (terms_id);
ALTER TABLE cohead ADD FOREIGN KEY (cohead_shipto_id) REFERENCES shiptoinfo (shipto_id);
ALTER TABLE cohead ADD FOREIGN KEY (cohead_misc_accnt_id) REFERENCES accnt (accnt_id);
ALTER TABLE cohead ADD FOREIGN KEY (cohead_prj_id) REFERENCES prj (prj_id);
ALTER TABLE cohead ALTER COLUMN cohead_cust_id SET NOT NULL;
ALTER TABLE cohead ALTER COLUMN cohead_salesrep_id SET NOT NULL;
ALTER TABLE cohead ALTER COLUMN cohead_shipform_id SET NOT NULL;
ALTER TABLE cohead ALTER COLUMN cohead_terms_id SET NOT NULL;
ALTER TABLE cohead ENABLE TRIGGER soheadtrigger;   

COMMIT;