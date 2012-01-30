CREATE OR REPLACE FUNCTION fetchToNumber() RETURNS TEXT AS '
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RETURN fetchNextNumber(''ToNumber'');
END;
' LANGUAGE 'plpgsql';
