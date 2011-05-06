BEGIN;

SELECT dropIfExists('FUNCTION', 'calculatetaxbasis( integer, integer, date, integer, numeric )');
SELECT dropIfExists('FUNCTION', 'createardebitmemo( integer, text, text, text, date, numeric, text, integer, integer, integer, date, integer, integer, numeric, integer )');
SELECT dropIfExists('FUNCTION', 'changeinvoicetaxzone(integer, integer)');
SELECT dropIfExists('FUNCTION', 'changecobtaxzone(integer, integer)');
SELECT dropIfExists ('FUNCTION', 'addTaxToGLSeries(INTEGER, INTEGER, TEXT, TEXT, TEXT, DATE, DATE, INTEGER, NUMERIC, NUMERIC, NUMERIC)');
SELECT dropIfExists ('FUNCTION', 'addTaxToGLSeries(INTEGER, INTEGER, TEXT, TEXT, TEXT, DATE, DATE, INTEGER, NUMERIC, NUMERIC, NUMERIC, TEXT)');
SELECT dropIfExists('FUNCTION', 'createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT)');
SELECT dropIfExists('FUNCTION', 'createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER)');
SELECT dropIfExists('FUNCTION', 'createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, INTEGER, INTEGER)');
SELECT dropIfExists('FUNCTION', 'createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, INTEGER, INTEGER, DATE, INTEGER, INTEGER, NUMERIC)');
SELECT dropIfExists('FUNCTION', 'createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, INTEGER, INTEGER, DATE, INTEGER, INTEGER, NUMERIC, INTEGER)');
SELECT dropIfExists('FUNCTION', 'createARDebitMemo(INTEGER, INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, INTEGER, INTEGER, DATE, INTEGER, INTEGER, NUMERIC, INTEGER)');
SELECT dropIfExists('FUNCTION', 'createARDebitMemo(INTEGER, INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, INTEGER, INTEGER, DATE, INTEGER, INTEGER, NUMERIC, INTEGER)');

COMMIT;
