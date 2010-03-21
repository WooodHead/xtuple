CREATE OR REPLACE FUNCTION fetchCMNumber() RETURNS text AS '
DECLARE
  _cmNumber text;
  _test INTEGER;

BEGIN

  LOOP

    SELECT CAST(orderseq_number AS text) INTO _cmNumber
    FROM orderseq
    WHERE (orderseq_name=''CmNumber'')
    FOR UPDATE;

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
