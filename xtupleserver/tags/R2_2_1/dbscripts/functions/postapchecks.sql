CREATE OR REPLACE FUNCTION postAPChecks(INTEGER) RETURNS INTEGER AS '
DECLARE
  pBankaccntid ALIAS FOR $1;
  _journalNumber INTEGER;

BEGIN

  SELECT fetchJournalNumber(''AP-CK'') INTO _journalNumber;

  PERFORM postAPCheck(apchk_id, _journalNumber)
  FROM apchk
  WHERE ( (NOT apchk_void)
   AND (NOT apchk_posted)
   AND (apchk_printed)
   AND (apchk_bankaccnt_id=pBankaccntid) );

  RETURN _journalNumber;

END;
' LANGUAGE 'plpgsql';
