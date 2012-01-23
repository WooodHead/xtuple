CREATE OR REPLACE FUNCTION deleteQuote(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pQuheadid ALIAS FOR $1;
BEGIN
  RETURN deleteQuote(pQuheadid, NULL);
END;
' LANGUAGE 'plpgsql';

-- should change deleteQuote and releaseQuNumber to return INTEGER
-- see comments for releaseSoNumber
CREATE OR REPLACE FUNCTION deleteQuote(INTEGER, INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pQuheadid	ALIAS FOR $1;
  pQuoteNumber	ALIAS FOR $2;

  _quNumberScheme	TEXT;
  _quoteNumber		INTEGER;
  _returnVal		BOOLEAN	:= FALSE;

BEGIN

  SELECT metric_value INTO _quNumberScheme
  FROM metric WHERE metric_name = ''QUNumberGeneration'';

  IF (pQuoteNumber IS NULL) THEN
    SELECT quhead_number INTO _quoteNumber
    FROM quhead
    WHERE (quhead_id=pQuheadid);
  ELSE
    _quoteNumber := pQuoteNumber;
  END IF;

  DELETE FROM quitem
  WHERE (quitem_quhead_id=pQuheadid);

  DELETE FROM quhead
  WHERE (quhead_id=pQuheadid);

  IF (_quoteNumber IS NOT NULL) THEN
    IF (_quNumberScheme = ''A'' OR _quNumberScheme = ''O'') THEN
      -- do not release quote # if quote converted to sales order
      IF (NOT EXISTS (SELECT cohead_id
		      FROM cohead
		      WHERE (cohead_number=CAST(_quoteNumber AS text)))) THEN
	_returnVal = releaseQuNumber(_quoteNumber);
      END IF;
    ELSEIF (_quNumberScheme = ''S'') THEN
      _returnVal = releaseSoNumber(_quoteNumber);
    END IF;
  END IF;

  RETURN TRUE;	-- ToDo: use returnVal when releaseQuNumber returns INTEGER

END;
' LANGUAGE 'plpgsql';
