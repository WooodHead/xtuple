CREATE OR REPLACE FUNCTION releasePoNumber(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pPoNumber ALIAS FOR $1;
  _test INTEGER;

BEGIN

--  Check to see if a P/O exists with the passed P/O Number
  SELECT pohead_id INTO _test
  FROM pohead
  WHERE (pohead_number=pPoNumber);

  IF (FOUND) THEN
    RETURN FALSE;
  END IF;

--  Check to see if PoNumber orderseq has been incremented past the passed P/O Number
  SELECT orderseq_number INTO _test
  FROM orderseq
  WHERE (orderseq_name=''PoNumber'');

  IF ((_test - 1) <> pPoNumber) THEN
    RETURN FALSE;
  END IF;

--  Decrement the PoNumber orderseq, releasing the passed P/O Number
  UPDATE orderseq
  SET orderseq_number = (orderseq_number - 1)
  WHERE (orderseq_name=''PoNumber'');

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';
