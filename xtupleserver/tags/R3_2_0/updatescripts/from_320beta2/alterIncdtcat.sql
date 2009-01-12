BEGIN;

ALTER TABLE incdtcat ADD COLUMN incdtcat_ediprofile_id INTEGER REFERENCES ediprofile (ediprofile_id);

COMMIT;