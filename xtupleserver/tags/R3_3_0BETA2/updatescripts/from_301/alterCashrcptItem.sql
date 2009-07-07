BEGIN;

ALTER TABLE cashrcptitem add constraint cashrcptitem_cashrcpt_cashrcpt_id_fkey foreign key (cashrcptitem_cashrcpt_id) references cashrcpt (cashrcpt_id); 
ALTER TABLE cashrcptitem add constraint cashrcptitem_aropen_aropen_id_fkey foreign key (cashrcptitem_aropen_id) references aropen (aropen_id); 

COMMIT;
