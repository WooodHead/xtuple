CREATE OR REPLACE FUNCTION getBooitemSeqId(text,text) RETURNS INTEGER AS '
DECLARE
  pItemNumber ALIAS FOR $1;
  pSeqNumber ALIAS FOR $2;
  _revid INTEGER;
  _returnVal INTEGER;
  
BEGIN
  IF ((pItemNumber IS NULL) OR (pSeqNumber IS NULL)) THEN
    RETURN NULL;
  END IF;

  IF (NOT fetchMetricBool(''Routings'')) THEN
    RETURN -1;
  ELSE
    SELECT booitem_seq_id INTO _returnVal
    FROM booitem(getItemId(pItemNumber))
    WHERE (booitem_seqnumber=CAST(pSeqNumber AS integer));
  END IF;
    
  IF (_returnVal IS NULL) THEN
    RAISE EXCEPTION ''% revision % for % not found.'', pType, pRevision, pItemNumber;
  END IF;

  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
