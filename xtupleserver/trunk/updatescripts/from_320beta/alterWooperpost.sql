BEGIN;

ALTER TABLE wooperpost DROP CONSTRAINT "$1";
ALTER TABLE wooperpost DROP CONSTRAINT wooperpost_wooperpost_wooper_id_fkey;

ALTER TABLE wooperpost ADD FOREIGN KEY (wooperpost_wo_id) REFERENCES wo (wo_id) ON DELETE CASCADE;
ALTER TABLE wooperpost ADD FOREIGN KEY (wooperpost_wooper_id) REFERENCES wooper (wooper_id) ON DELETE CASCADE;


COMMIT;