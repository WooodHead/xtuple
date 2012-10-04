CREATE OR REPLACE FUNCTION deleteSaleType(pSaletypeid INTEGER) RETURNS INTEGER AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _check INTEGER;

BEGIN

--  Check to see if any sales orders are assigned to the passed saletype
  SELECT cohead_id INTO _check
  FROM cohead
  WHERE (cohead_saletype_id=pSaletypeid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -1;
  END IF;

--  Check to see if any quotes are assigned to the passed saletype
  SELECT quhead_id INTO _check
  FROM quhead
  WHERE (quhead_saletype_id=pSaletypeid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -2;
  END IF;

--  Check to see if any invoice are assigned to the passed saletype
  SELECT invchead_id INTO _check
  FROM invchead
  WHERE (invchead_saletype_id=pSaletypeid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -3;
  END IF;

--  Check to see if any credit memos are assigned to the passed saletype
  SELECT cmhead_id INTO _check
  FROM cmhead
  WHERE (cmhead_saletype_id=pSaletypeid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -4;
  END IF;

--  Delete the passed saletype
  DELETE FROM saletype
  WHERE (saletype_id=pSaletypeid);

  RETURN pSaletypeid;

END;
$$ LANGUAGE 'plpgsql';
