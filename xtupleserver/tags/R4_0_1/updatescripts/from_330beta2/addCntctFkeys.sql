-- Adding in contact foreign keys for all remaining tables
BEGIN;
-- Clear out any bad data
ALTER TABLE cohead DISABLE TRIGGER ALL;
ALTER TABLE quhead DISABLE TRIGGER ALL;
ALTER TABLE shiptoinfo DISABLE TRIGGER ALL;
ALTER TABLE vendaddrinfo DISABLE TRIGGER ALL;

UPDATE cohead SET cohead_billto_cntct_id=NULL 
WHERE cohead_billto_cntct_id IS NOT NULL AND cohead_billto_cntct_id  NOT IN (SELECT cntct_id FROM cntct WHERE cntct_id=cohead_billto_cntct_id);
UPDATE cohead SET cohead_shipto_cntct_id=NULL 
WHERE cohead_shipto_cntct_id IS NOT NULL AND cohead_shipto_cntct_id NOT IN (SELECT cntct_id FROM cntct WHERE cntct_id=cohead_shipto_cntct_id);
UPDATE quhead SET quhead_billto_cntct_id=NULL 
WHERE quhead_billto_cntct_id IS NOT NULL AND quhead_billto_cntct_id NOT IN (SELECT cntct_id FROM cntct WHERE cntct_id=quhead_billto_cntct_id);
UPDATE quhead SET quhead_shipto_cntct_id=NULL 
WHERE quhead_shipto_cntct_id IS NOT NULL AND quhead_shipto_cntct_id NOT IN (SELECT cntct_id FROM cntct WHERE cntct_id=quhead_shipto_cntct_id);
UPDATE shiptoinfo SET shipto_cntct_id=NULL 
WHERE shipto_cntct_id IS NOT NULL AND shipto_cntct_id NOT IN (SELECT cntct_id FROM cntct WHERE cntct_id=shipto_cntct_id);
UPDATE vendaddrinfo SET vendaddr_cntct_id=NULL 
WHERE vendaddr_cntct_id IS NOT NULL AND vendaddr_cntct_id NOT IN (SELECT cntct_id FROM cntct WHERE cntct_id=vendaddr_cntct_id);

-- Add keys
ALTER TABLE cohead ADD FOREIGN KEY (cohead_billto_cntct_id) REFERENCES cntct (cntct_id);
ALTER TABLE cohead ADD FOREIGN KEY (cohead_shipto_cntct_id) REFERENCES cntct (cntct_id);
ALTER TABLE quhead ADD FOREIGN KEY (quhead_billto_cntct_id) REFERENCES cntct (cntct_id);
ALTER TABLE quhead ADD FOREIGN KEY (quhead_shipto_cntct_id) REFERENCES cntct (cntct_id);
ALTER TABLE shiptoinfo ADD FOREIGN KEY (shipto_cntct_id) REFERENCES cntct (cntct_id);
ALTER TABLE vendaddrinfo ADD FOREIGN KEY (vendaddr_cntct_id) REFERENCES cntct (cntct_id);

ALTER TABLE cohead ENABLE TRIGGER ALL;
ALTER TABLE quhead ENABLE TRIGGER ALL;
ALTER TABLE shiptoinfo ENABLE TRIGGER ALL;
ALTER TABLE vendaddrinfo ENABLE TRIGGER ALL;

COMMIT;