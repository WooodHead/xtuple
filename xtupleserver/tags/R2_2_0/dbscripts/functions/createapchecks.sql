CREATE OR REPLACE FUNCTION createAPChecks(INTEGER, DATE) RETURNS INTEGER AS '
DECLARE
  pBankaccntid ALIAS FOR $1;
  pCheckDate ALIAS FOR $2;
  _v RECORD;
  _r RECORD;
  _c RECORD;
  _apchkid INTEGER;
  _checkAmount NUMERIC;
  _counter INTEGER := 0;
  _apchk_curr_id INTEGER;

BEGIN

  SELECT bankaccnt_curr_id INTO _apchk_curr_id
    FROM bankaccnt
    WHERE ( bankaccnt_id = pBankaccntid );

  FOR _v IN SELECT DISTINCT vend_id, vend_number, vend_name,
                            vend_address1, vend_address2, vend_address3,
                            vend_city, vend_state, vend_zip
            FROM apselect, apopen, vend
            WHERE ( (apselect_apopen_id=apopen_id)
             AND (apopen_vend_id=vend_id)
             AND (apselect_bankaccnt_id=pBankaccntid) ) LOOP

    SELECT NEXTVAL(''apchk_apchk_id_seq'') INTO _apchkid;

    FOR _r IN SELECT apopen_id, apselect_id,
                     apopen_docnumber, apopen_invcnumber, apopen_ponumber,
                     apopen_docdate, apselect_curr_id,
                     apselect_amount, apselect_discount
              FROM apselect, apopen
              WHERE ( (apselect_apopen_id=apopen_id)
               AND (apopen_vend_id=_v.vend_id)
               AND (apselect_bankaccnt_id=pBankaccntid) ) LOOP

      INSERT INTO apchkitem
      ( apchkitem_apchk_id, apchkitem_apopen_id,
        apchkitem_vouchernumber, apchkitem_invcnumber, apchkitem_ponumber,
        apchkitem_amount, apchkitem_discount, apchkitem_docdate,
        apchkitem_curr_id )
      VALUES
      ( _apchkid, _r.apopen_id,
        _r.apopen_docnumber, _r.apopen_invcnumber, _r.apopen_ponumber,
        _r.apselect_amount, _r.apselect_discount, _r.apopen_docdate,
        _r.apselect_curr_id );

      DELETE FROM apselect
      WHERE (apselect_id=_r.apselect_id);

    END LOOP;

--  Figuring out how much to write the check for is complicated by the fact that
--  it can be used to pay for purchases on multiple dates in multiple currencies
    _checkAmount := 0;
    SELECT SUM(currToCurr(apchkitem_curr_id, _apchk_curr_id,
                          apchkitem_amount, pCheckDate))
                INTO _checkAmount
      FROM apchkitem
      WHERE ( apchkitem_apchk_id = _apchkid );

    INSERT INTO apchk
    ( apchk_id, apchk_vend_id, apchk_bankaccnt_id,
      apchk_checkdate, apchk_number, apchk_amount,
      apchk_misc, apchk_expcat_id,
      apchk_printed, apchk_posted, apchk_void, apchk_replaced,
      apchk_curr_id )
    VALUES
    ( _apchkid, _v.vend_id, pBankaccntid,
      pCheckDate, fetchNextCheckNumber(pBankaccntid),
      _checkAmount,
      FALSE, -1,
      FALSE, FALSE, FALSE, FALSE,
      _apchk_curr_id );

    _counter := (_counter + 1);

  END LOOP;

  RETURN _counter;

END;
' LANGUAGE 'plpgsql';
