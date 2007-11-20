
CREATE OR REPLACE FUNCTION fetchJournalNumber(TEXT) RETURNS INTEGER AS '
DECLARE
  pUse ALIAS FOR $1;
  _number INTEGER;

BEGIN

  SELECT orderseq_number INTO _number
  FROM orderseq
  WHERE (orderseq_name=''JournalNumber'');

  INSERT INTO jrnluse
  (jrnluse_date, jrnluse_number, jrnluse_use)
  VALUES
  (CURRENT_TIMESTAMP, _number, pUse);

  UPDATE orderseq
  SET orderseq_number = (orderseq_number + 1)
  WHERE (orderseq_name=''JournalNumber'');

  RETURN _number;

END;
' LANGUAGE 'plpgsql';

