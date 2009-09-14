BEGIN;

SELECT dropIfExists('FUNCTION', 'deleteworkcenter(integer)');

COMMIT;

