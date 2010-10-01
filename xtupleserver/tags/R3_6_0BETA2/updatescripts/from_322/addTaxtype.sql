BEGIN;

-- Add taxtype column

-- ALTER TABLE asohist ADD COLUMN asohist_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE cmhead ADD COLUMN cmhead_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
-- ALTER TABLE cmitem ADD COLUMN cmitem_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
-- ALTER TABLE cobill ADD COLUMN cobill_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE cobmisc ADD COLUMN cobmisc_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
-- ALTER TABLE cohist ADD COLUMN cohist_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE cohead ADD COLUMN cohead_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE coitem ADD COLUMN coitem_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE invchead ADD COLUMN invchead_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
-- ALTER TABLE invcitem ADD COLUMN invcitem_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE pohead ADD COLUMN pohead_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE poitem ADD COLUMN poitem_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE quhead ADD COLUMN quhead_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE quitem ADD COLUMN quitem_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
ALTER TABLE vohead ADD COLUMN vohead_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);
-- ALTER TABLE voitem ADD COLUMN voitem_taxtype_id INTEGER REFERENCES taxtype (taxtype_id);

COMMIT;
