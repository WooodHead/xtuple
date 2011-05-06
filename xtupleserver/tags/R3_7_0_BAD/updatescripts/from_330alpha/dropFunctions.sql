BEGIN;

SELECT dropIfExists('FUNCTION', 'changecmheadtaxauth(integer, integer)');
SELECT dropIfExists('FUNCTION', 'orderhead()');
SELECT dropIfExists('FUNCTION', 'orderitem()');
SELECT dropIfExists('FUNCTION', 'recalculateCmheadTaxTotal(INTEGER)');
SELECT dropIfExists('FUNCTION', 'recalculatecobmisctaxtotal(integer)');
SELECT dropIfExists('FUNCTION', 'recalculateinvcheadtaxtotal(integer)');
SELECT dropIfExists('FUNCTION', 'changesotaxzone(integer, integer)');
SELECT dropIfExists('FUNCTION', 'changequotetaxzone(integer, integer)');

COMMIT;
