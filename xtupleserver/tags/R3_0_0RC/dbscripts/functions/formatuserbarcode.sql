
CREATE OR REPLACE FUNCTION formatUserBarcode(INTEGER) RETURNS TEXT IMMUTABLE AS '
DECLARE
  pUserid ALIAS FOR $1;
  _barcode TEXT;
BEGIN

  SELECT ( ''\138USER'' ||
           LENGTH(usr_username)::TEXT || usr_username ) INTO _barcode
  FROM usr
  WHERE (usr_id=pUserid);

  RETURN _barcode;

END;
' LANGUAGE 'plpgsql';

