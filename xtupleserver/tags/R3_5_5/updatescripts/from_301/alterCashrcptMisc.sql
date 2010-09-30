BEGIN;

ALTER TABLE cashrcptmisc add constraint cashrcptmisc_cashrcpt_cashrcpt_id_fkey foreign key (cashrcptmisc_cashrcpt_id) references cashrcpt (cashrcpt_id); 
ALTER TABLE cashrcptmisc add constraint cashrcptmisc_accnt_accnt_id_fkey foreign key (cashrcptmisc_accnt_id) references accnt (accnt_id); 

COMMIT;
