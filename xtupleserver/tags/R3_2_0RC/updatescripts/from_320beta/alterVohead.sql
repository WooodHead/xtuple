BEGIN;

ALTER TABLE vohead ADD UNIQUE(vohead_number);

COMMIT;