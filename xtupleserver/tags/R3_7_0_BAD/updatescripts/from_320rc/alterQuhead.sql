BEGIN;

ALTER TABLE quhead DROP CONSTRAINT quhead_check;
ALTER TABLE quhead ADD CHECK ((quhead_misc = 0 AND quhead_misc_accnt_id IS NULL) OR 
                              (quhead_misc != 0 AND quhead_misc_accnt_id IS NOT NULL));

COMMIT;