BEGIN;

--Clean up data
UPDATE pohead SET pohead_vend_id=NULL WHERE pohead_vend_id = -1;
UPDATE pohead SET pohead_terms_id=NULL WHERE pohead_terms_id = -1;
UPDATE pohead SET pohead_vendaddr_id=NULL WHERE pohead_vendaddr_id= -1;
UPDATE pohead SET pohead_warehous_id=NULL WHERE pohead_warehous_id= -1;

--Copy unimplemented columns to temp table just in case
CREATE TABLE obsolete_poheadcol (
pohead_id INTEGER,
pohead_release INTEGER,
pohead_changedate DATE,
pohead_prj_id INTEGER,
pohead_ppdcol CHAR(1),
pohead_specmsg TEXT
);

COMMENT ON TABLE obsolete_poheadcol IS 'Backup table to store any data in columns that appear
to have never been implemented and will be dropped.  If no objections surface, this table can be dropped by v. 4.0';

INSERT INTO obsolete_poheadcol (
pohead_id,pohead_release,pohead_changedate,
pohead_prj_id,pohead_ppdcol,pohead_specmsg)
SELECT
pohead_id,pohead_release,pohead_changedate,
pohead_prj_id,pohead_ppdcol,pohead_specmsg
FROM pohead
WHERE ((pohead_release IS NOT NULL) 
OR (pohead_changedate IS NOT NULL)
OR (pohead_prj_id IS NOT NULL AND pohead_prj_id != -1)
OR (pohead_ppdcol IS NOT NULL)
OR (pohead_specmsg IS NOT NULL));

--Remove unimplemented columns
ALTER TABLE pohead DROP COLUMN pohead_release;
ALTER TABLE pohead DROP COLUMN pohead_changedate;
ALTER TABLE pohead DROP COLUMN pohead_prj_id;
ALTER TABLE pohead DROP COLUMN pohead_ppdcol;
ALTER TABLE pohead DROP COLUMN pohead_specmsg;

--Add Constraints
ALTER TABLE pohead ADD FOREIGN KEY (pohead_terms_id) REFERENCES terms (terms_id); 
ALTER TABLE pohead ADD FOREIGN KEY (pohead_vend_id) REFERENCES vendinfo (vend_id);
ALTER TABLE pohead ADD FOREIGN KEY (pohead_vendaddr_id) REFERENCES vendaddrinfo (vendaddr_id);
ALTER TABLE pohead ADD FOREIGN KEY (pohead_warehous_id) REFERENCES whsinfo (warehous_id);
ALTER TABLE pohead ADD CHECK (pohead_status IN ('U','O','C'));

COMMIT;
