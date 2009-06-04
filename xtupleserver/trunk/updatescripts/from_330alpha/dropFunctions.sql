BEGIN;

SELECT dropIfExists('FUNCTION', 'changecmheadtaxauth(integer, integer)');
SELECT dropIfExists('FUNCTION', 'orderhead()');
SELECT dropIfExists('FUNCTION', 'orderitem()');

COMMIT;
