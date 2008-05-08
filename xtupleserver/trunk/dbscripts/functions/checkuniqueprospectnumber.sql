CREATE OR REPLACE FUNCTION checkUniqueProspectNumber(TEXT, TEXT) RETURNS TEXT AS $$
DECLARE
  pNewNumber ALIAS FOR $1;
  pOldNumber ALIAS FOR $2;
  _returnVal INTEGER;
BEGIN
  IF ((pOldNumber IS NOT NULL) AND (pOldNumber = pNewNumber)) THEN
    RETURN pNewNumber;
  END IF;

  SELECT cust_id INTO _returnVal
  FROM custinfo
  WHERE (UPPER(cust_number)=UPPER(pNewNumber));
  
  IF (_returnVal IS NULL) THEN
    SELECT prospect_id INTO _returnVal
      FROM prospect
     WHERE (UPPER(prospect_number)=UPPER(pNewNumber));
    IF (_returnVal IS NOT NULL) THEN
      RAISE EXCEPTION 'The Number ''%'' is not unique for Prospects for Customers.', pNewNumber;
    END IF;
  END IF;

  RETURN pNewNumber;
END;
$$ LANGUAGE 'plpgsql';
