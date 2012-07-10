BEGIN;

SELECT dropifexists('FUNCTION','saveitemimage(INTEGER, CHAR, INTEGER)','PUBLIC');

COMMIT;