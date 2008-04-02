CREATE OR REPLACE FUNCTION fetchPoNumber() RETURNS INTEGER AS '
DECLARE
  _poNumber INTEGER;
  _test INTEGER;

BEGIN

  LOOP

    SELECT orderseq_number INTO _poNumber
    FROM orderseq
    WHERE (orderseq_name=''PoNumber'');

    UPDATE orderseq
    SET orderseq_number = (orderseq_number + 1)
    WHERE (orderseq_name=''PoNumber'');

    SELECT pohead_id INTO _test
    FROM pohead
    WHERE (pohead_number=_poNumber);

    IF (NOT FOUND) THEN
      EXIT;
    END IF;

  END LOOP;

  RETURN _poNumber;

END;
' LANGUAGE 'plpgsql';
