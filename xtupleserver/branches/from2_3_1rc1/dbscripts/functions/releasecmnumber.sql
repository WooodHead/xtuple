CREATE OR REPLACE FUNCTION releaseCMNumber(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pCmNumber ALIAS FOR $1;
  _test INTEGER;

BEGIN

--  Check to see if a C/M exists with the passed C/M Number
  SELECT cmhead_id INTO _test
  FROM cmhead
  WHERE (cmhead_number=pCmNumber);

  IF (FOUND) THEN
    RETURN FALSE;
  END IF;

--  Check to see if CmNumber orderseq has been incremented past the passed S/O Number
  SELECT orderseq_number INTO _test
  FROM orderseq
  WHERE (orderseq_name=''CmNumber'');

  IF ((_test - 1) <> pCmNumber) THEN
    RETURN FALSE;
  END IF;

--  Decrement the CmNumber orderseq, releasing the passed C/M Number
  UPDATE orderseq
  SET orderseq_number = (orderseq_number - 1)
  WHERE (orderseq_name=''CmNumber'');

  RETURN TRUE;

END;
' LANGUAGE plpgsql;
