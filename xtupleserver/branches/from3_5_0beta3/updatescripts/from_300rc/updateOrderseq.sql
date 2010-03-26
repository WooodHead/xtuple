-- really a patch for 6906/6907
BEGIN;

CREATE FUNCTION patch6906and6907() RETURNS INTEGER AS '
DECLARE
  _maxaddr      INTEGER;
  _maxcntct     INTEGER;
  _rows         INTEGER := 0;
  _count        INTEGER := 0;

BEGIN
  SELECT MAX(addr_id) INTO _maxaddr FROM addr;

  SELECT MAX(cntct_id) INTO _maxcntct FROM cntct;

  UPDATE orderseq SET orderseq_number = COALESCE(_maxaddr, 1)
  WHERE orderseq_name = ''AddressNumber''
    AND orderseq_number IS NULL;

  GET DIAGNOSTICS _count = ROW_COUNT;
  _rows := _rows + _count;

  UPDATE orderseq SET orderseq_number = COALESCE(_maxcntct, 1)
  WHERE orderseq_name = ''ContactNumber''
    AND orderseq_number IS NULL;

  GET DIAGNOSTICS _count = ROW_COUNT;
  _rows := _rows + _count;

  RETURN _rows;
END;'
LANGUAGE 'plpgsql';

SELECT patch6906and6907();
DROP FUNCTION patch6906and6907();

COMMIT;
