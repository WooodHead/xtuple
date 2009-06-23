BEGIN;

SELECT dropIfExists('FUNCTION', 'calculatetaxbasis( integer, integer, date, integer, numeric )');
SELECT dropIfExists('FUNCTION', 'createardebitmemo( integer, text, text, text, date, numeric, text, integer, integer, integer, date, integer, integer, numeric, integer )');

COMMIT;