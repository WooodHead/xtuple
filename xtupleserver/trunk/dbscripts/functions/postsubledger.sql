CREATE OR REPLACE FUNCTION postSubLedger(INTEGER) RETURNS INTEGER AS $$
DECLARE
  pSequence	ALIAS FOR $1;
  _transCount INTEGER := 0;
  _journalnumber INTEGER := fetchJournalNumber('S/L');
  _sequence INTEGER := fetchGLSequence();
  _sltrans RECORD;
BEGIN

--  Make sure that we balance
  IF (SELECT SUM(sltrans_amount) != 0
      FROM sltrans
      WHERE ((NOT sltrans_posted )
       AND (sltrans_sequence=pSequence))) THEN
     RAISE EXCEPTION 'Can not post Sub Ledger. Transactions do not balance in selected date range.';
  END IF;

--  March through the sltrans members, posting them one at a time
  FOR _sltrans IN SELECT sltrans_source, sltrans_accnt_id,
                          SUM(sltrans_amount) as amount
                     FROM sltrans
                    WHERE ((sltrans_amount<>0.0)
                      AND  (NOT sltrans_posted)
                      AND  (sltrans_sequence=pSequence))
                    GROUP BY sltrans_source, sltrans_accnt_id LOOP

-- refuse to accept postings into closed periods if any of the accounts disallow it
    IF (SELECT NOT BOOL_AND(accnt_closedpost) AND
               BOOL_AND(COALESCE(period_closed, FALSE))
        FROM accnt LEFT OUTER JOIN
             period ON (CURRENT_DATE BETWEEN period_start AND period_end)
        WHERE (accnt_id = _sltrans.sltrans_accnt_id)) THEN
      RAISE EXCEPTION 'Cannot post to closed period (%).', _sltrans.sltrans_distdate;
      RETURN -4;        -- remove raise exception when all callers check return code
    END IF;

    IF (_sltrans.amount != 0) THEN
       INSERT INTO gltrans
        ( gltrans_posted, gltrans_exported, gltrans_created, gltrans_date,
          gltrans_sequence, gltrans_accnt_id, gltrans_source, gltrans_notes,
          gltrans_doctype, gltrans_docnumber, gltrans_amount, gltrans_journalnumber )
        VALUES
        ( FALSE, FALSE, CURRENT_TIMESTAMP, CURRENT_DATE,
          _sequence, _sltrans.sltrans_accnt_id, _sltrans.sltrans_source, 'Subledger Posting',
          'SL', _journalnumber, _sltrans.amount, _journalnumber );
      
      _transCount := _transCount + 1;
    END IF;
  END LOOP;

--  Update all of the posted sltrans members
  UPDATE sltrans SET
    sltrans_posted=true,
    sltrans_gltrans_sequence=_sequence
  WHERE ((NOT sltrans_posted)
    AND (sltrans_sequence=pSequence));

  PERFORM postIntoTrialBalance(_sequence);

  RETURN _transCount;

END;
$$ LANGUAGE 'plpgsql';




CREATE OR REPLACE FUNCTION postSubLedger(TEXT, DATE, DATE, DATE) RETURNS INTEGER AS $$
DECLARE
  pSource		ALIAS FOR $1;
  pStartDate 		ALIAS FOR $2;
  pEndDate		ALIAS FOR $3;
  pDistDate     	ALIAS FOR $4;
  _transCount INTEGER := 0;
  _journalnumber INTEGER := fetchJournalNumber('S/L');
  _sequence INTEGER := fetchGLSequence();
  _sltrans RECORD;
BEGIN

--  Make sure that we balance
  IF (SELECT SUM(sltrans_amount) != 0
      FROM sltrans
      WHERE ((NOT sltrans_posted )
       AND (sltrans_source=pSource)
       AND (sltrans_date BETWEEN pStartDate AND pEndDate))) THEN
     RAISE EXCEPTION 'Can not post Sub Ledger. Transactions do not balance in selected date range.';
  END IF;

--  March through the sltrans members, posting them one at a time
  FOR _sltrans IN SELECT sltrans_source, sltrans_accnt_id,
                          SUM(sltrans_amount) as amount
                     FROM sltrans
                    WHERE ((sltrans_amount<>0.0)
                      AND  (NOT sltrans_posted)
                      AND  (sltrans_source=pSource)
                      AND  (sltrans_date BETWEEN pStartDate AND pEndDate))
                    GROUP BY sltrans_source, sltrans_accnt_id LOOP

-- refuse to accept postings into closed periods if any of the accounts disallow it
    IF (SELECT NOT BOOL_AND(accnt_closedpost) AND
               BOOL_AND(COALESCE(period_closed, FALSE))
        FROM accnt LEFT OUTER JOIN
             period ON (pDistDate BETWEEN period_start AND period_end)
        WHERE (accnt_id = _sltrans.sltrans_accnt_id)) THEN
      RAISE EXCEPTION 'Cannot post to closed period (%).', _sltrans.sltrans_distdate;
      RETURN -4;        -- remove raise exception when all callers check return code
    END IF;

    IF (_sltrans.amount != 0) THEN
       INSERT INTO gltrans
        ( gltrans_posted, gltrans_exported, gltrans_created, gltrans_date,
          gltrans_sequence, gltrans_accnt_id, gltrans_source, gltrans_notes,
          gltrans_doctype, gltrans_docnumber, gltrans_amount, gltrans_journalnumber )
        VALUES
        ( FALSE, FALSE, CURRENT_TIMESTAMP, pDistDate,
          _sequence, _sltrans.sltrans_accnt_id, _sltrans.sltrans_source, 'Subledger Posting',
          'SL', _journalnumber, _sltrans.amount, _journalnumber );
      
      _transCount := _transCount + 1;
    END IF;
  END LOOP;

--  Update all of the posted sltrans members
  UPDATE sltrans SET
    sltrans_posted=true,
    sltrans_gltrans_sequence=_sequence
  WHERE ((NOT sltrans_posted)
    AND (sltrans_source=pSource)
    AND (sltrans_date BETWEEN pStartDate AND pEndDate));

  PERFORM postIntoTrialBalance(_sequence);

  RETURN _transCount;

END;
$$ LANGUAGE 'plpgsql';

