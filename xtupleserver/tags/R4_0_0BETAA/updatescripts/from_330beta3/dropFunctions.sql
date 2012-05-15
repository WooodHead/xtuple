BEGIN;

SELECT dropIfExists('FUNCTION', 'indentedwo(integer, boolean, boolean)');
SELECT dropIfExists('FUNCTION', 'indentedwo(integer, integer, boolean, boolean)');
SELECT dropIfExists('FUNCTION', 'getwoqtyscrap(integer)');
SELECT dropIfExists('FUNCTION', 'getwoqtyiss(integer)');

COMMIT;
