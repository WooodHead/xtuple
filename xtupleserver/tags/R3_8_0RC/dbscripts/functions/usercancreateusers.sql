CREATE OR REPLACE FUNCTION userCanCreateUsers(TEXT) RETURNS BOOLEAN AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
SELECT usesuper FROM pg_user
WHERE usename=($1);
' LANGUAGE 'sql';
