
CREATE OR REPLACE FUNCTION formatShipmentNumber(INTEGER) RETURNS TEXT IMMUTABLE AS '
DECLARE
  pCosmiscid    ALIAS FOR $1;
BEGIN
  RETURN ( SELECT COALESCE(cosmisc_number::TEXT, '''')
           FROM cosmisc
           WHERE (cosmisc_id=pCosmiscid) );
END;
' LANGUAGE 'plpgsql';

