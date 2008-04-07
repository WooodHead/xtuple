CREATE OR REPLACE FUNCTION fetchCMNumber() RETURNS INTEGER AS '
DECLARE
  _cmNumber INTEGER;
  _test INTEGER;

BEGIN

  LOOP

    SELECT orderseq_number INTO _cmNumber
    FROM orderseq
    WHERE (orderseq_name=''CmNumber'');

    UPDATE orderseq
    SET orderseq_number = (orderseq_number + 1)
    WHERE (orderseq_name=''CmNumber'');

    SELECT cmhead_id INTO _test
    FROM cmhead
    WHERE (cmhead_number=_cmNumber);

    IF (NOT FOUND) THEN
      EXIT;
    END IF;

  END LOOP;

  RETURN _cmNumber;

END;
' LANGUAGE plpgsql;
