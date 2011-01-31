BEGIN;

SELECT dropIfExists('FUNCTION', 'createbomitem(integer, integer, integer, character, integer, numeric, numeric, date, date, boolean, integer, boolean, text, character, integer, integer, text, text)');
SELECT dropIfExists('FUNCTION', 'createbomitem(integer, integer, integer, integer, character, integer, numeric, numeric, date, date, boolean, integer, boolean, text, character, integer, integer, text, text)');
SELECT dropIfExists('FUNCTION', 'createbomitem(integer, integer, integer, character, integer, numeric, numeric, date, date, boolean, integer, boolean, text, character, integer, integer, text)');

COMMIT;
