CREATE OR REPLACE FUNCTION releaseQuNumber(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pQuNumber ALIAS FOR $1;
  _test INTEGER;

BEGIN

--  Check to see if a Quote exists with the passed Quote Number
  SELECT quhead_id INTO _test
  FROM quhead
  WHERE (quhead_number=pQuNumber);

  IF (FOUND) THEN
    RETURN FALSE;
  END IF;

--  Check to see if QuNumber orderseq has been incremented past the
--  passed Quote Number
  SELECT orderseq_number INTO _test
  FROM orderseq
  WHERE (orderseq_name=''QuNumber'');

  IF ((_test - 1) <> pQuNumber) THEN
    RETURN FALSE;
  END IF;

--  Decrement the QuNumber orderseq, releasing the passed Quote Number
  UPDATE orderseq
  SET orderseq_number = (orderseq_number - 1)
  WHERE (orderseq_name=''QuNumber'');

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';
