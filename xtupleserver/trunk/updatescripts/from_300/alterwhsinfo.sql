BEGIN;

ALTER TABLE whsinfo ADD UNIQUE(warehous_code);
ALTER TABLE whsinfo add constraint whsinfo_warehous_cntct_id_fkey foreign key (warehous_cntct_id) references cntct (cntct_id); 
ALTER TABLE whsinfo add constraint whsinfo_warehous_accnt_id_fkey foreign key (warehous_default_accnt_id) references accnt (accnt_id); 

COMMIT;