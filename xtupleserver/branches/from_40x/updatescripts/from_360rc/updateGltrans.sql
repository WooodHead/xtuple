ALTER TABLE gltrans DISABLE trigger gltransaltertrigger;
UPDATE gltrans SET
  gltrans_doctype='JP',
  gltrans_notes=overlay(gltrans_notes placing 'Journal' from 1 for 9)
WHERE gltrans_doctype='SL';
ALTER TABLE gltrans ENABLE trigger gltransaltertrigger;