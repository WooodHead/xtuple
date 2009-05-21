CREATE OR REPLACE FUNCTION calculatetax(integer, integer, date, integer, numeric)
  RETURNS numeric AS
$BODY$
DECLARE
  pTaxZoneId ALIAS FOR  $1;
  pTaxTypeId ALIAS FOR  $2;
  pDate ALIAS FOR  $3;
  pCurrId ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  _tottax numeric := 0;  -- total tax
  
BEGIN

  SELECT SUM(taxdetail_tax)
    INTO _tottax 
  FROM calculateTaxDetail(pTaxZoneId, pTaxTypeId, pDate, pCurrId, pAmount);

  RETURN _tottax;
  
END;
$BODY$
LANGUAGE 'plpgsql' VOLATILE;