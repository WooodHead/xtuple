
CREATE OR REPLACE FUNCTION releaseIncidentNumber(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pNumber ALIAS FOR $1;
  _test INTEGER;

BEGIN

--  Check to see if a Inident exists with the passed Number
  SELECT incdt_id INTO _test
    FROM incdt
   WHERE (incdt_number=pNumber);

  IF (FOUND) THEN
    RETURN FALSE;
  END IF;

--  Check to see if IncdentNumber orderseq has been incremented past the passed Number
  SELECT orderseq_number INTO _test
    FROM orderseq
   WHERE (orderseq_name=''IncdentNumber'');

  IF ((_test - 1) <> pNumber) THEN
    RETURN FALSE;
  END IF;

--  Decrement the IncdentNumber orderseq, releasing the passed Incdent Number
  UPDATE orderseq
     SET orderseq_number = (orderseq_number - 1)
   WHERE (orderseq_name=''IncdentNumber'');

  RETURN TRUE;

END;
' LANGUAGE plpgsql;

