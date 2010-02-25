CREATE OR REPLACE FUNCTION calculateTaxBasis(INTEGER, INTEGER, DATE, INTEGER, NUMERIC) RETURNS NUMERIC AS $$
DECLARE
  pTaxZoneId ALIAS FOR $1;
  pTaxTypeId ALIAS FOR $2;
  pDate ALIAS FOR $3;
  pCurrId ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  _result INTEGER;
  _x RECORD;
  _tax NUMERIC := 0;         -- Running amount
  _amount NUMERIC := 0;      -- Calculated base amount
BEGIN

--  Check for valid inputs, throw an error if anything missing
  SELECT taxzone_id INTO _result
  FROM taxzone
  WHERE (taxzone_id=pTaxZoneID);
  IF (NOT FOUND) THEN
    RAISE EXCEPTION 'calculateTaxBasis - invalid TaxZoneID %', pTaxZoneID;
  END IF;

  SELECT taxtype_id INTO _result
  FROM taxtype
  WHERE (taxtype_id=pTaxTypeID);
  IF (NOT FOUND) THEN
    RAISE EXCEPTION 'calculateTaxBasis - invalid TaxTypeID %', pTaxTypeID;
  END IF;

  SELECT curr_id INTO _result
  FROM curr_symbol
  WHERE (curr_id=pCurrID);
  IF (NOT FOUND) THEN
    RAISE EXCEPTION 'calculateTaxBasis - invalid CurrID %', pCurrID;
  END IF;


  _amount := pAmount;

--  We will leverage the regular calculateTaxDetail function to get the 
--  list of taxes and tax rates, but process in reverse.
  FOR _x IN
    SELECT SUM(taxdetail_taxrate_percent) AS tax_percent, 
           SUM(taxdetail_taxrate_amount) AS tax_amount
    FROM calculateTaxDetail(pTaxZoneId, pTaxTypeId, pDate, pCurrId, 0)
    GROUP BY taxdetail_taxclass_sequence, taxdetail_level
    ORDER BY taxdetail_taxclass_sequence DESC, taxdetail_level DESC
  LOOP
    -- Calculate backward
    _amount := _amount - round((_amount - _x.tax_amount) / (1 + _x.tax_percent), 2);
  END LOOP;

  RETURN _amount;

END;
$$ LANGUAGE 'plpgsql';
