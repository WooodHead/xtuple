
CREATE OR REPLACE FUNCTION selectDueItemsForPayment(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pVendid ALIAS FOR $1;
  pBankaccntid ALIAS FOR $2;
  _r RECORD;

BEGIN

  FOR _r IN SELECT apopen_id
              FROM apopen
             WHERE((apopen_duedate <= CURRENT_DATE)
               AND (apopen_open)
               AND (apopen_doctype IN (''V'', ''D''))
               AND (apopen_vend_id=pVendid) ) LOOP
    PERFORM selectPayment(_r.apopen_id, pBankaccntid);
  END LOOP;

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

