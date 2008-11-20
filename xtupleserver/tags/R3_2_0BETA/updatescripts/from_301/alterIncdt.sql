BEGIN;

ALTER TABLE incdt ADD COLUMN incdt_aropen_id INTEGER;

ALTER TABLE incdt add constraint incdt_incdt_aropen_id_fkey foreign key (incdt_aropen_id) references aropen (aropen_id); 

COMMIT;

