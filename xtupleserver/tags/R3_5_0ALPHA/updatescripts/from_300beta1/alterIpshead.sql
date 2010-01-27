BEGIN;

ALTER TABLE ipshead ADD UNIQUE (ipshead_name);
ALTER TABLE ipshead ALTER COLUMN ipshead_curr_id SET NOT NULL;

COMMIT;