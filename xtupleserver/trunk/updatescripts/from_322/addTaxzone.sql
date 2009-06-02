BEGIN;

-- Add taxzone column

ALTER TABLE asohist      ADD COLUMN asohist_taxzone_id  INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE cmhead       ADD COLUMN cmhead_taxzone_id   INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE cobmisc      ADD COLUMN cobmisc_taxzone_id  INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE cohead       ADD COLUMN cohead_taxzone_id   INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE cohist       ADD COLUMN cohist_taxzone_id   INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE custinfo     ADD COLUMN cust_taxzone_id     INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE invchead     ADD COLUMN invchead_taxzone_id INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE itemtax      ADD COLUMN itemtax_taxzone_id  INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE prospect     ADD COLUMN prospect_taxzone_id INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE pohead       ADD COLUMN pohead_taxzone_id   INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE quhead       ADD COLUMN quhead_taxzone_id   INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE rahead       ADD COLUMN rahead_taxzone_id   INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE shiptoinfo   ADD COLUMN shipto_taxzone_id   INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE vendaddrinfo ADD COLUMN vendaddr_taxzone_id INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE vendinfo     ADD COLUMN vend_taxzone_id     INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE vohead       ADD COLUMN vohead_taxzone_id   INTEGER REFERENCES taxzone (taxzone_id);
ALTER TABLE whsinfo      ADD COLUMN warehous_taxzone_id INTEGER REFERENCES taxzone (taxzone_id);

COMMIT;
