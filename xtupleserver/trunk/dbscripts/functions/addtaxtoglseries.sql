-- convenience function for use in postInvoices
-- add tax information to a GL Series
-- return the base currency value of the GL Series records inserted
--	  NULL if there has been an error
SELECT dropIfExists ('FUNCTION', 'addTaxToGLSeries(INTEGER, INTEGER, TEXT, TEXT, TEXT, DATE, DATE, INTEGER, NUMERIC, NUMERIC, NUMERIC)');
CREATE OR REPLACE FUNCTION addTaxToGLSeries(INTEGER, INTEGER, TEXT, TEXT, TEXT, DATE, DATE, INTEGER, NUMERIC, NUMERIC, NUMERIC,TEXT) RETURNS NUMERIC AS $$
  DECLARE
    pSequence	ALIAS FOR $1;
    pTaxCurrId	ALIAS FOR $2;
    pSource	ALIAS FOR $3;
    pDocType	ALIAS FOR $4;
    pDocNumber	ALIAS FOR $5;
    pGLDate	ALIAS FOR $6;
    pExchDate	ALIAS FOR $7;
    pTaxId	ALIAS FOR $8;
    pAvalue	ALIAS FOR $9;
    pBvalue	ALIAS FOR $10;
    pCvalue	ALIAS FOR $11;
    pNotes	ALIAS FOR $12;

    _count	INTEGER;
    _returnVal	NUMERIC;
    _t		RECORD;
    _test	INTEGER;
  BEGIN
    _count := 0;
    _returnVal := 0;

    -- if there's no tax then there's nothing to add
    IF (COALESCE(pAvalue,0) = 0
        AND COALESCE(pBvalue,0) = 0
        AND COALESCE(pCvalue,0) = 0) THEN
      RETURN 0;
    -- if there IS tax but no tax_id to use for account lookup then fail
    ELSIF (pTaxId IS NULL) THEN
      RETURN NULL;
    END IF;

    FOR _t in SELECT tax_sales_accnt_id AS tax_accnt_id,
		     currToBase(pTaxCurrId, pAvalue, pExchDate) AS tax_baseval
	      FROM tax
	      WHERE tax_id=pTaxId
	        AND pAvalue <> 0
	      UNION
	      SELECT tax_salesb_accnt_id AS tax_accnt_id,
		     currToBase(pTaxCurrId, pBvalue, pExchDate) AS tax_baseval
	      FROM tax
	      WHERE tax_id=pTaxId
	        AND pBvalue <> 0
	      UNION
	      SELECT tax_salesc_accnt_id AS tax_accnt_id,
		     currToBase(pTaxCurrId, pCvalue, pExchDate) AS tax_baseval
	      FROM tax
	      WHERE tax_id=pTaxId
	        AND pCvalue <> 0 LOOP
      _count := _count + 1;
      IF (_t.tax_accnt_id IS NOT NULL AND _t.tax_accnt_id > 0) THEN
	_t.tax_baseval := ROUND(_t.tax_baseval, 2);
	SELECT insertIntoGLSeries( pSequence, pSource, pDocType, pDocNumber,
				   _t.tax_accnt_id, _t.tax_baseval,
				   pGLDate, pNotes ) INTO _test;
	IF (_test < 0) THEN
	  RETURN NULL;	-- error: insertIntoGLSeries failed
	END IF;
	_returnVal := _returnVal + _t.tax_baseval;
      END IF;
    END LOOP;

    IF (_count = 0 AND (pAvalue + pBvalue + pCvalue) <> 0) THEN
      RETURN NULL; -- error: if there is a tax value then we must find the accounts
    END IF;

    RETURN _returnVal;
  END;
$$ LANGUAGE 'plpgsql';