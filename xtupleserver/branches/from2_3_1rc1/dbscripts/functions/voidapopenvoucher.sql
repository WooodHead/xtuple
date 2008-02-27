CREATE OR REPLACE FUNCTION voidApopenVoucher(INTEGER) RETURNS INTEGER AS '
DECLARE
  pApopenid ALIAS FOR $1;
BEGIN
  RETURN voidApopenVoucher(pApopenid, fetchJournalNumber(''AP-MISC''));
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION voidApopenVoucher(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pApopenid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  _ap RECORD;
  _sequence INTEGER;
  _apopenid INTEGER;
  _apcreditapplyid INTEGER;
  _result INTEGER;
  _crAccnt INTEGER;
  _dbAccnt INTEGER;
  _reference    TEXT;
  _discountDate DATE;
  _discountDateAmt NUMERIC;
  _apopenDateAmt   NUMERIC;
  _amount NUMERIC;

BEGIN

  SELECT NEXTVAL(''apopen_apopen_id_seq'') INTO _apopenid;

  SELECT * INTO _ap
  FROM apopen
  WHERE (apopen_id = pApopenid);
  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

  _amount := _ap.apopen_amount - _ap.apopen_paid;

  IF(COALESCE(_amount, 0.0) <= 0.0) THEN
    RETURN -2;
  END IF;

-- the 1st MC iteration calculated a currency gain/loss on the discount, but
-- but see issue 3892.  leave this condition as TRUE until we learn more.
-- if it turns out that some users want to calculate the gain/loss on discount
-- and others don''t, then replace TRUE with an appropriate condition and
-- CURRENT_DATE with a more reasonable value.  the rest of the logic of this
-- function can then remain unchanged.
  IF TRUE THEN
      _discountDate := _ap.apopen_docdate;
  ELSE
      _discountDate := CURRENT_DATE;
  END IF;

  _crAccnt := findAPPrepaidAccount(_ap.apopen_vend_id);
  _dbAccnt := findAPAccount(_ap.apopen_vend_id);
  _reference := (''Void Voucher #'' || _ap.apopen_docnumber);

  SELECT fetchGLSequence() INTO _sequence;

  _discountDateAmt = round(currToBase(_ap.apopen_curr_id, _amount, _discountDate), 2);
  _apopenDateAmt = round(currToBase(_ap.apopen_curr_id, _amount, _ap.apopen_docdate), 2);
  PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CM'', _ap.apopen_docnumber,
                              _dbAccnt,
                              _discountDateAmt * -1,
                              CURRENT_DATE,
                              _reference);
  PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CM'', _ap.apopen_docnumber,
                              _crAccnt,
                              _apopenDateAmt,
                              CURRENT_DATE,
                              _reference);

  IF (_discountDateAmt <> _apopenDateAmt) THEN
    PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CM'', _ap.apopen_docnumber,
                                getGainLossAccntId(),
                                _discountDateAmt - _apopenDateAmt,
                                CURRENT_DATE,
                                _reference);
  END IF;

  PERFORM postGLSeries(_sequence, pJournalNumber);

  INSERT INTO apopen
  ( apopen_id, apopen_username, apopen_journalnumber,
    apopen_vend_id, apopen_docnumber, apopen_doctype, apopen_ponumber,
    apopen_docdate, apopen_duedate, apopen_terms_id, apopen_curr_id,
    apopen_amount, apopen_paid, apopen_open, apopen_notes, apopen_discount )
  SELECT _apopenid, CURRENT_USER, pJournalNumber,
         apopen_vend_id, apopen_docnumber, ''C'', apopen_ponumber,
         CURRENT_DATE, CURRENT_DATE, -1, apopen_curr_id,
         _amount, 0, TRUE, _reference, TRUE
    FROM apopen
   WHERE (apopen_id=pApopenid);

  SELECT apcreditapply_id INTO _apcreditapplyid
    FROM apcreditapply
   WHERE ( (apcreditapply_source_apopen_id=_apopenid)
     AND   (apcreditapply_target_apopen_id=pApopenid) );
  IF (FOUND) THEN
    UPDATE apcreditapply
       SET apcreditapply_amount=_amount
     WHERE (apcreditapply_id=_apcreditapplyid);
  ELSE
    SELECT nextval(''apcreditapply_apcreditapply_id_seq'') INTO _apcreditapplyid;
    INSERT INTO apcreditapply
           ( apcreditapply_id, apcreditapply_source_apopen_id,
             apcreditapply_target_apopen_id, apcreditapply_amount,
             apcreditapply_curr_id )
    VALUES ( _apcreditapplyid, _apopenid, pApopenid, _amount, _ap.apopen_curr_id );
  END IF;

  SELECT postAPCreditMemoApplication(_apopenid) INTO _result;

  IF (_result < 0) THEN
    RETURN _result;
  END IF;

  RETURN pJournalNumber;

END;
' LANGUAGE 'plpgsql';
