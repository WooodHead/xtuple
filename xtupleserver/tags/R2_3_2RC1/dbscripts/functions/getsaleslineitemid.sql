CREATE OR REPLACE FUNCTION getSalesLineItemId(text,integer) RETURNS INTEGER AS '
DECLARE
  pSalesOrderNumber ALIAS FOR $1;
  pLineNumber ALIAS FOR $2;
  _returnVal INTEGER;
BEGIN
  IF ((pSalesOrderNumber IS NULL) OR (pLineNumber IS NULL)) THEN
    RETURN NULL;
  END IF;

  SELECT coitem_id INTO _returnVal
  FROM cohead, coitem
  WHERE ((cohead_number=pSalesOrderNumber)
  AND (cohead_id=coitem_cohead_id)
  AND (coitem_linenumber=pLineNumber));

  IF (_returnVal IS NULL) THEN
	RAISE EXCEPTION ''Sales Line Item %-%not found.'', pSalesOrderNumber,pLineNumber;
  END IF;

  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
