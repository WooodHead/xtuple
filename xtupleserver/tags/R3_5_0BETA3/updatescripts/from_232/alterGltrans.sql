BEGIN;

UPDATE gltrans SET gltrans_doctype = 'SO' WHERE gltrans_doctype = 'SH';

COMMIT;

