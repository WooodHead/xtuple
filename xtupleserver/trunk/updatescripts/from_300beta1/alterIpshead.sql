BEGIN;

ALTER TABLE ipshead ADD UNIQUE (ipshead_name);

COMMIT;