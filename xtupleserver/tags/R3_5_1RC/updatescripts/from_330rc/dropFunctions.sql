BEGIN;

SELECT dropifexists('FUNCTION','selectforbilling(integer, numeric, boolean, integer, integer)');

COMMIT;