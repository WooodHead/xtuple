CREATE OR REPLACE FUNCTION voidPostedAPCheck(INTEGER) RETURNS INTEGER AS '
DECLARE
  pApchkid ALIAS FOR $1;

BEGIN
  RETURN voidPostedAPCheck(pApchkid, fetchJournalNumber(''AP-CK''), CURRENT_DATE);
END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION voidPostedAPCheck(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pApchkid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
BEGIN
  RETURN voidPostedAPCheck(pApchkid, pJournalNumber, CURRENT_DATE);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION voidPostedAPCheck(INTEGER, INTEGER, DATE) RETURNS INTEGER AS '
DECLARE
  pApchkid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  pVoidDate	ALIAS FOR $3;
  _sequence INTEGER;
  _p RECORD;
  _r RECORD;
  _amount_base NUMERIC := 0;
  _exchGainTmp NUMERIC := 0;
  _exchGain NUMERIC := 0;
  _apopenid INTEGER;
  _docnumber TEXT;

BEGIN

  SELECT fetchGLSequence() INTO _sequence;

  SELECT apchk_vend_id, (vend_number||''-''||vend_name) AS vendnote,
         apchk_checkdate, apchk_number, apchk_amount,
         currToBase(apchk_curr_id, apchk_amount, apchk_checkdate) AS apchk_amount_base,
         apchk_misc, apchk_expcat_id, apchk_notes,
         bankaccnt_accnt_id AS bankaccntid,
         findAPAccount(apchk_vend_id) AS apaccntid,
         apchk_curr_id, apchk_posted INTO _p
  FROM bankaccnt, apchk LEFT OUTER JOIN vend ON (apchk_vend_id=vend_id)
  WHERE ( (apchk_bankaccnt_id=bankaccnt_id)
   AND (apchk_id=pApchkid) );

  IF (NOT _p.apchk_posted) THEN
    RETURN -1;
  END IF;

--  Is this a miscellaneous check?
  IF (_p.apchk_misc) THEN

--  Yep, create a D/M?
    IF (_p.apchk_expcat_id=-1) THEN
      PERFORM createAPDebitMemo( _p.apchk_vend_id, pJournalNumber, fetchARMemoNumber(), '''',
                                 pVoidDate, _p.apchk_amount,
                                 ''Void Posted Check #''||_p.apchk_number||'' ''||_p.apchk_notes,
				 -1, pVoidDate, -1, _p.apchk_curr_id );

      PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CK'', _p.apchk_number,
                                  findAPPrepaidAccount(_p.apchk_vend_id),
                                  round(_p.apchk_amount_base, 2),
                                  pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote );
      IF (NOT FOUND) THEN
        RETURN -2;
      END IF;

    ELSE
--  Post the expense G/L transaction
      PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CK'', _p.apchk_number,
                                  expcat_exp_accnt_id,
                                  round(_p.apchk_amount_base, 2),
                                  pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote )
      FROM expcat
      WHERE (expcat_id=_p.apchk_expcat_id);
      IF (NOT FOUND) THEN
        RETURN -3;
      END IF;
    END IF;

    _amount_base := _p.apchk_amount_base;

  ELSE
    FOR _r IN SELECT apchkitem_amount, apchkitem_discount,
                     currToBase(apchkitem_curr_id,
                                apchkitem_amount,
                                COALESCE(apchkitem_docdate, _p.apchk_checkdate)) AS apchkitem_amount_base,
                     apopen_id, apopen_doctype, apopen_docnumber,
                     apchkitem_curr_id, apopen_curr_id,
                     COALESCE(apchkitem_docdate, _p.apchk_checkdate) AS docdate
              FROM apchkitem LEFT OUTER JOIN apopen ON (apchkitem_apopen_id=apopen_id)
              WHERE (apchkitem_apchk_id=pApchkid) LOOP

      _exchGainTmp := 0;
      IF (NOT (_r.apopen_id IS NULL)) THEN
--  We have to undo the APDiscount Credit Memo if a discount was taken in the first place.
        IF(_r.apchkitem_discount > 0) THEN
          SELECT NEXTVAL(''apopen_apopen_id_seq'') INTO _apopenid;
          SELECT fetchARMemoNumber() INTO _docnumber;
          INSERT INTO apopen
          ( apopen_id, apopen_username, apopen_journalnumber,
            apopen_vend_id, apopen_docnumber, apopen_doctype, apopen_ponumber,
            apopen_docdate, apopen_duedate, apopen_terms_id,
            apopen_amount, apopen_paid, apopen_open, apopen_notes, apopen_accnt_id, apopen_curr_id, apopen_discount )
          VALUES
          ( _apopenid, CURRENT_USER, pJournalNumber,
            _p.apchk_vend_id, _docnumber, ''D'', '''',
            pVoidDate, pVoidDate, -1,
            _r.apchkitem_discount, _r.apchkitem_discount, TRUE,
            (''Reverse Posted Discount '' || _r.apopen_doctype || '' '' || _r.apopen_docnumber), -1, _p.apchk_curr_id, TRUE );


          PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''DS'', _r.apopen_docnumber,
                                      findAPDiscountAccount(_p.apchk_vend_id),
                                      round(currToBase(_r.apchkitem_curr_id, _r.apchkitem_discount, _r.docdate), 2) * -1,
                                      pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote );

          PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''DS'', _r.apopen_docnumber,
                                      findAPAccount(_p.apchk_vend_id),
                                      round(currToBase(_r.apchkitem_curr_id, _r.apchkitem_discount, _r.docdate), 2),
                                      pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote );

--  Post the application
          INSERT INTO apapply
          ( apapply_vend_id, apapply_postdate, apapply_username,
            apapply_source_apopen_id, apapply_source_doctype, apapply_source_docnumber,
            apapply_target_apopen_id, apapply_target_doctype, apapply_target_docnumber,
            apapply_journalnumber, apapply_amount, apapply_curr_id )
          VALUES
          ( _p.apchk_vend_id, pVoidDate, CURRENT_USER,
            _apopenid, ''D'', _docnumber,
            _r.apopen_id, _r.apopen_doctype, _r.apopen_docnumber,
            pJournalNumber, (_r.apchkitem_discount * -1), _r.apchkitem_curr_id );

--        _amount_base := (_amount_base + currToBase(_r.apchkitem_curr_id, _r.apchkitem_discount, _r.docdate));
        END IF;

--  Update the apopen
        UPDATE apopen
        SET apopen_paid = round(apopen_paid - currToCurr(_r.apchkitem_curr_id, apopen_curr_id, (_r.apchkitem_amount + noNeg(_r.apchkitem_discount)), _r.docdate), 2),
            apopen_open = round(apopen_amount, 2) > round(apopen_paid - currToCurr(_r.apchkitem_curr_id, apopen_curr_id, (_r.apchkitem_amount + noNeg(_r.apchkitem_discount)), _r.docdate), 2)
        WHERE (apopen_id=_r.apopen_id);

--  Post the application
        INSERT INTO apapply
        ( apapply_vend_id, apapply_postdate, apapply_username,
          apapply_source_apopen_id, apapply_source_doctype, apapply_source_docnumber,
          apapply_target_apopen_id, apapply_target_doctype, apapply_target_docnumber,
          apapply_journalnumber, apapply_amount, apapply_curr_id )
        VALUES
        ( _p.apchk_vend_id, pVoidDate, CURRENT_USER,
          -1, ''K'', _p.apchk_number,
          _r.apopen_id, _r.apopen_doctype, _r.apopen_docnumber,
          pJournalNumber, (_r.apchkitem_amount * -1), _r.apchkitem_curr_id );
      END IF;

--  calculate currency gain/loss
      SELECT currGain(_r.apchkitem_curr_id, _r.apchkitem_amount,
                      _r.docdate, _p.apchk_checkdate)
            INTO _exchGainTmp;
      _exchGain := _exchGain + _exchGainTmp;

      PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CK'', _p.apchk_number,
                                  _p.apaccntid,
                                  round(_r.apchkitem_amount_base, 2),
                                  pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote );
      IF (_exchGainTmp <> 0) THEN
          PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CK'',
                                  _p.apchk_number,
                                  getGainLossAccntId(), round(_exchGainTmp, 2) * -1,
                                  pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote );
      END IF;

      _amount_base := (_amount_base + _r.apchkitem_amount_base);

    END LOOP;

--  Make sure that the check balances and attribute rounding errors to gain/loss
    IF round(_amount_base, 2) - round(_exchGain, 2) <> round(_p.apchk_amount_base, 2) THEN
      IF round(_amount_base - _exchGain, 2) = round(_p.apchk_amount_base, 2) THEN
          PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CK'',
                                      _p.apchk_number, getGainLossAccntId(),
                                      (round(_amount_base, 2) - round(_exchGain, 2) -
                                                 round(_p.apchk_amount_base, 2)) * -1,
                                      pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote );
    ELSE
          RAISE EXCEPTION ''apchk_id % does not balance (% - % <> %)'', pApchkid,
                _amount_base, _exchGain, _p.apchk_amount_base;
      END IF;
    END IF;

-- Find the currency gain/loss on any discount previously taken
-- could also do this via the apapply table
-- ToDo: should this be discount specific or used for any credit memo application?
    SELECT SUM(COALESCE(currGain(apopen_curr_id, apopen_amount,
                               _p.apchk_checkdate, apopen_docdate), 0)) INTO _exchGainTmp
      FROM apchkitem JOIN
           apopen ON (apchkitem_ponumber = apopen_ponumber)
           WHERE apopen_discount
             AND apopen_open
           GROUP BY apchkitem_ponumber
           ORDER BY apchkitem_ponumber;
    IF (_exchGainTmp <> 0) THEN
        PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CK'', _p.apchk_number,
                                    findAPPrepaidAccount(_p.apchk_vend_id),
                                    round(_exchGainTmp, 2),
                                    pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote );
        PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CK'', _p.apchk_number,
                                    getGainLossAccntId(),
                                    round(_exchGainTmp * -1, 2),
                                    pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote );
    END IF;
  END IF;

  PERFORM insertIntoGLSeries( _sequence, ''A/P'', ''CK'', _p.apchk_number,
                              _p.bankaccntid, round(_p.apchk_amount_base, 2) * -1,
                              pVoidDate, ''Void Posted Check #''||_p.apchk_number||'' ''||_p.vendnote );

  PERFORM postGLSeries(_sequence, pJournalNumber);

  UPDATE gltrans
     SET gltrans_misc_id=pApchkid
   WHERE gltrans_sequence=_sequence;

  UPDATE apchk
  SET apchk_posted=false,
      apchk_void=true,
      apchk_journalnumber=pJournalNumber
  WHERE (apchk_id=pApchkid);

  RETURN pJournalNumber;

END;
' LANGUAGE 'plpgsql';
