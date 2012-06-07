
CREATE OR REPLACE FUNCTION reverseGLSeries(INTEGER, DATE, TEXT) RETURNS INTEGER AS $$
DECLARE
  pSequence ALIAS FOR $1;
  pDistDate ALIAS FOR $2;
  pNotes ALIAS FOR $3;
  _sequence INTEGER := fetchGLSequence();	
  _journal INTEGER;

BEGIN

  SELECT fetchJournalNumber(jrnluse_use) INTO _journal
  FROM gltrans
    JOIN jrnluse ON (gltrans_journalnumber=jrnluse_number)
  WHERE (gltrans_sequence=pSequence)
  LIMIT 1;
  
  INSERT INTO gltrans (gltrans_created, gltrans_posted, gltrans_exported,
                       gltrans_date, gltrans_sequence, gltrans_accnt_id,
                       gltrans_source, gltrans_docnumber, gltrans_misc_id,
                       gltrans_amount, gltrans_notes, gltrans_journalnumber,
                       gltrans_doctype)
               SELECT  CURRENT_TIMESTAMP, FALSE, FALSE,
                       pDistDate, _sequence, gltrans_accnt_id,
                       gltrans_source, gltrans_docnumber, gltrans_misc_id,
                       (gltrans_amount * -1), pNotes, _journal,
                       gltrans_doctype
                  FROM gltrans
                 WHERE (gltrans_sequence=pSequence);

  PERFORM postIntoTrialBalance(_sequence);

  RETURN _journal;
END;
$$ LANGUAGE 'plpgsql';

