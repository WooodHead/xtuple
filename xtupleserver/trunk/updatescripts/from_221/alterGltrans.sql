BEGIN;

--Add constraint to force journal entries entered through api to have notes same as UI
UPDATE gltrans SET gltrans_notes = '' WHERE gltrans_notes IS NULL AND gltrans_doctype='JE';
ALTER TABLE gltrans ADD CONSTRAINT gltrans_notes_chk CHECK (((gltrans_notes IS NULL) AND (gltrans_doctype = 'JE'))=FALSE);

COMMIT;