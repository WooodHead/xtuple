CREATE OR REPLACE FUNCTION public.fixSearchPath() RETURNS TEXT AS $$
DECLARE
  _path   TEXT    := '';
  _schema TEXT;
  _seq    INTEGER;
BEGIN

  IF (SELECT dropIfExists('TRIGGER', 'saletypeBeforeDeleteTrigger') = 1) THEN
    RAISE NOTICE 'Dropped saletypeBeforeDeleteTrigger';
  END IF;

  FOR _schema, _seq IN
      SELECT pkghead_name AS schema, 1 AS seq
        FROM pkghead
       WHERE packageisenabled(pkghead_id)
      UNION ALL
      SELECT 'api', 0
      ORDER BY seq, schema
  LOOP
    IF (SELECT dropIfExists('FUNCTION', 'bomlevelbyitem(integer)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.bomlevelitem(integer)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'bomlevelbyitem(integer,integer)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.bomlevelitem(integer,integer)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'copylocale(integer)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.copylocale(integer)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'createpurchasetosale(integer,integer,boolean)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.bomlevelitem(integer,integer,boolean)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'createpurchasetosale(integer,integer,boolean,numeric)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.bomlevelitem(integer,integer,boolean,numeric)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'explodewo(integer,boolean)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.bomlevelitem(integer,boolean)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'insertccard(text,boolean,text,bytea,bytea,bytea,bytea,bytea,bytea,bytea,bytea,bytea,bytea,text)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.insertccard(text,boolean,text,bytea,bytea,bytea,bytea,bytea,bytea,bytea,bytea,bytea,bytea,text)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'postProduction(INTEGER, NUMERIC, BOOLEAN, INTEGER, TIMESTAMP WITH TIME ZONE)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.postProduction(INTEGER, NUMERIC, BOOLEAN, INTEGER, TIMESTAMP WITH TIME ZONE)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'postProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.postProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'postProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN, INTEGER)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.postProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN, INTEGER)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'postProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN, INTEGER, TEXT, TEXT)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.postProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN, INTEGER, TEXT, TEXT)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'purgeInvoiceRecord(DATE, INTEGER)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.purgeInvoiceRecord(DATE, INTEGER)', _schema;
    END IF;
    IF (SELECT dropIfExists('VIEW', 'vendor', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.vendor', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'saveAddr(int4, text, text, text, text, text, text, text, text, boolean, text, text)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.saveAddr(int4, text, text, text, text, text, text, text, text, boolean, text, text)', _schema;
    END IF;
    IF (SELECT dropIfExists('FUNCTION', 'saveAddr(int4, text, text, text, text, text, text, text, text, text)', _schema) = 1) THEN
      RAISE NOTICE 'Dropped %.saveAddr(int4, text, text, text, text, text, text, text, text, text)', _schema;
    END IF;
  END LOOP;

  RETURN _path;
END;
$$
LANGUAGE 'plpgsql';

SELECT public.fixSearchPath();
DROP FUNCTION public.fixSearchPath();
