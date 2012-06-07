BEGIN;

--We'll implement package support a different way at another time
ALTER TABLE metasql DROP COLUMN metasql_pkgitem_id;
ALTER TABLE metasql ADD COLUMN metasql_lastuser TEXT;
ALTER TABLE metasql ADD COLUMN metasql_lastupdate DATE;

COMMIT;