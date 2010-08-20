CREATE OR REPLACE FUNCTION getPrjAccnt(INTEGER, INTEGER) RETURNS INTEGER STABLE AS $$
DECLARE
  pPrjid ALIAS FOR $1;
  pAccntid ALIAS FOR $2;
  
BEGIN

  -- Project Accounting is required to fully implement this functionality
  RETURN pAccntId;

END;
$$ LANGUAGE 'plpgsql';
