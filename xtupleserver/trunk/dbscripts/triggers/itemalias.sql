CREATE OR REPLACE FUNCTION _itemaliasTrigger () RETURNS TRIGGER AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN

-- Privilege Checks
   IF (NOT checkPrivilege(''MaintainItemMasters'') OR NOT checkPrivilege(''MaintainItemAliases'')) THEN
     RAISE EXCEPTION ''You do not have privileges to maintain Item Aliases.'';
   END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER itemaliasTrigger ON itemalias;
CREATE TRIGGER itemaliasTrigger AFTER INSERT OR UPDATE ON itemalias FOR EACH ROW EXECUTE PROCEDURE _itemaliasTrigger();
