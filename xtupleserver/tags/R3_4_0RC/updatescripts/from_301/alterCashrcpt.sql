BEGIN;

ALTER TABLE cashrcpt add constraint cashrcpt_cust_cust_id_fkey foreign key (cashrcpt_cust_id) references custinfo (cust_id); 
ALTER TABLE cashrcpt add constraint cashrcpt_bankaccnt_bankaccnt_id_fkey foreign key (cashrcpt_bankaccnt_id) references bankaccnt (bankaccnt_id); 

COMMIT;
