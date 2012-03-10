CREATE OR REPLACE FUNCTION releaseSoNumber(INTEGER) RETURNS INTEGER AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT releaseNumber('SoNumber', $1);
$$ LANGUAGE 'sql';

CREATE OR REPLACE FUNCTION releaseSoNumber(TEXT) RETURNS INTEGER AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT releaseNumber('SoNumber', $1::INTEGER);
$$ LANGUAGE 'sql';
