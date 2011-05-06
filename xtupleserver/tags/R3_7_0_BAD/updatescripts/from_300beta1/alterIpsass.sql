BEGIN;

ALTER TABLE ipsass ADD FOREIGN KEY (ipsass_ipshead_id) references ipshead (ipshead_id); 
ALTER TABLE ipsass ADD UNIQUE (ipsass_ipshead_id,ipsass_cust_id,ipsass_custtype_id,ipsass_custtype_pattern,ipsass_shipto_id,ipsass_shipto_pattern);
ALTER TABLE ipsass ALTER COLUMN ipsass_ipshead_id SET NOT NULL;

COMMIT;