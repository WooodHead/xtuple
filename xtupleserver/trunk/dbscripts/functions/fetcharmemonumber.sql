
CREATE OR REPLACE FUNCTION fetchARMemoNumber() RETURNS TEXT AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _number TEXT;
  _test INTEGER;

BEGIN

  LOOP

    SELECT CAST(orderseq_number AS text) INTO _number
    FROM orderseq
    WHERE (orderseq_name='ARMemoNumber');
    IF (NOT FOUND) THEN
      RETURN -1;
    END IF;

    UPDATE orderseq
    SET orderseq_number = (orderseq_number + 1)
    WHERE (orderseq_name='ARMemoNumber');

    SELECT aropen_id INTO _test
    FROM aropen
    WHERE ( (aropen_doctype IN ('D', 'C', 'R'))
     AND (aropen_docnumber=_number) );

    CONTINUE WHEN FOUND;

    SELECT cmhead_id INTO _test
    FROM cmhead
    WHERE (cmhead_number=_number);

    CONTINUE WHEN FOUND;

    EXIT;

  END LOOP;

  RETURN _number;

END;
$$ LANGUAGE 'plpgsql';

