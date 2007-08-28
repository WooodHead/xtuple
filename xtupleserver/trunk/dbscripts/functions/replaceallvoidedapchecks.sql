CREATE OR REPLACE FUNCTION replaceAllVoidedAPChecks(INTEGER) RETURNS INTEGER AS '
DECLARE
  pBankaccntid ALIAS FOR $1;
  _r RECORD;

BEGIN

  FOR _r IN SELECT apchk_id
            FROM apchk
            WHERE ( (apchk_void)
             AND (NOT apchk_posted)
             AND (NOT apchk_replaced)
             AND (NOT apchk_deleted)
             AND (apchk_bankaccnt_id=pBankaccntid) ) LOOP
    PERFORM replaceVoidedAPCheck(_r.apchk_id);
  END LOOP;

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
