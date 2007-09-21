-- TODO: rewrite this to return INTEGER instead of BOOLEAN
-- it should return three values: -1 true error - cohead in use
--				   0 orderseq previously incremented past $1
--				   1 orderseq decremented
CREATE OR REPLACE FUNCTION releaseSoNumber(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pSoNumber ALIAS FOR $1;
  _test INTEGER;

BEGIN
--  Check to see if a S/O exists with the passed S/O Number
  SELECT cohead_id INTO _test
  FROM cohead
  WHERE (cohead_number=pSoNumber);

  IF (FOUND) THEN
    RETURN FALSE;
  END IF;

--  Check to see if SoNumber orderseq has been incremented past the passed S/O Number
  SELECT orderseq_number INTO _test
  FROM orderseq
  WHERE (orderseq_name=''SoNumber'');

  IF ((_test - 1) <> pSoNumber) THEN
    RETURN FALSE;
  END IF;

--  Decrement the SoNumber orderseq, releasing the passed S/O Number
  UPDATE orderseq
  SET orderseq_number = (orderseq_number - 1)
  WHERE (orderseq_name=''SoNumber'');

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';
