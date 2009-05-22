CREATE OR REPLACE FUNCTION calculatetax(integer, numeric, numeric)
  RETURNS numeric AS
$BODY$
DECLARE
  pTaxid ALIAS FOR $1;
  pSubtotal ALIAS FOR $2;
  pFreight ALIAS FOR $3;
BEGIN
  RETURN calculateTax(pTaxid, pSubtotal, pFreight, 'T');
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;


-------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION calculatetax(integer, numeric, numeric, bpchar)
  RETURNS numeric AS
$BODY$
DECLARE
  pTaxid ALIAS FOR $1;
  pSubtotal ALIAS FOR $2;
  pFreight ALIAS FOR $3;
  pRate ALIAS FOR $4;
  _params RECORD;
  _value NUMERIC;
  _tax NUMERIC;
  _taxA NUMERIC;
  _taxB NUMERIC;
  _taxC NUMERIC;
BEGIN

  SELECT tax_ratea, tax_rateb, tax_ratec,
         tax_freight, tax_cumulative INTO _params
  FROM tax
  WHERE (tax_id=pTaxid);

  IF (FOUND) THEN
    _value := pSubtotal;

--    IF (_params.tax_freight) THEN
--      _value := _value + pFreight;
--    END IF;

    _taxA := COALESCE(_params.tax_ratea,0.0) * _value;

    IF (_params.tax_cumulative) THEN
      _value := _value + _taxA;
    END IF;

    _taxB := COALESCE(_params.tax_rateb,0.0) * _value;

    IF (_params.tax_cumulative) THEN
      _value := _value + _taxB;
    END IF;

    _taxC := COALESCE(_params.tax_ratec,0.0) * _value;

  ELSE
    _taxA := 0;
    _taxB := 0;
    _taxC := 0;
  END IF;

  _tax := _taxA + _taxB + _taxC;

  IF (UPPER(pRate) = 'A') THEN
    RETURN _taxA;
  END IF;

  IF (UPPER(pRate) = 'B') THEN
    RETURN _taxB;
  END IF;

  IF (UPPER(pRate) = 'C') THEN
    RETURN _taxC;
  END IF;

  RETURN _tax;

END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;


-------------------------------------------------------------------------


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