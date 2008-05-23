CREATE OR REPLACE FUNCTION _bomitemsubTrigger() RETURNS TRIGGER AS '
BEGIN

-- Privilege Checks
  IF (NOT checkPrivilege(''MaintainBOMs'')) THEN
    RAISE EXCEPTION ''You do not have privileges to maintain Bills of Material.'';
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER bomitemsubTrigger ON bomitemsub;
CREATE TRIGGER bomitemsubTrigger BEFORE INSERT OR UPDATE OR DELETE ON bomitemsub FOR EACH ROW EXECUTE PROCEDURE _bomitemsubTrigger();
