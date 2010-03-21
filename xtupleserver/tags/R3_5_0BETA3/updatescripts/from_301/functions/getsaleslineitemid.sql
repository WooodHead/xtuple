CREATE OR REPLACE FUNCTION getSalesLineItemId(text) RETURNS INTEGER AS '
DECLARE
  pSalesOrderItem ALIAS FOR $1;
  _delpos INTEGER = 0;
BEGIN
  IF (pSalesOrderItem IS NULL) THEN
    RETURN NULL;
  END IF;
  _delpos = STRPOS(pSalesOrderItem, ''-'');
  IF (_delpos > 0) THEN
    RETURN getSalesLineItemId( SUBSTR(pSalesOrderItem, 1, (_delpos - 1)),
                               CAST(SUBSTR(pSalesOrderItem, (_delpos + 1), 2) AS INTEGER) );
  END IF;
  RETURN 0;
END;
' LANGUAGE 'plpgsql';

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
