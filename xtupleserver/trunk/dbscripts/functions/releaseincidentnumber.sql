CREATE OR REPLACE FUNCTION releaseIncidentNumber(INTEGER) RETURNS BOOLEAN AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pNumber ALIAS FOR $1;

BEGIN

  RETURN (releaseNumber('IncidentNumber', pNumber) = 1);

END;
$$ LANGUAGE plpgsql;

