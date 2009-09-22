BEGIN;

SELECT dropIfExists('FUNCTION', 'deleteworkcenter(integer)');
SELECT dropIfExists('FUNCTION', 'explodePlannedOrder(INTEGER, BOOLEAN)');

COMMIT;

