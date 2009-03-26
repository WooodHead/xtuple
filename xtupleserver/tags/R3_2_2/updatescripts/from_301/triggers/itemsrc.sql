CREATE OR REPLACE FUNCTION _itemsrcTrigger () RETURNS TRIGGER AS '
BEGIN

-- Privilege Checks
   IF (NOT checkPrivilege(''MaintainItemSources'')) THEN
     RAISE EXCEPTION ''You do not have privileges to maintain Item Sources.'';
   END IF;

-- Set defaults
   NEW.itemsrc_invvendoruomratio	:= COALESCE(NEW.itemsrc_invvendoruomratio,1);
   NEW.itemsrc_minordqty		:= COALESCE(NEW.itemsrc_minordqty,0);
   NEW.itemsrc_multordqty		:= COALESCE(NEW.itemsrc_multordqty,0);
   NEW.itemsrc_active			:= COALESCE(NEW.itemsrc_active,true);
   NEW.itemsrc_leadtime			:= COALESCE(NEW.itemsrc_leadtime,0);
   NEW.itemsrc_ranking			:= COALESCE(NEW.itemsrc_ranking,1);
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropifexists('TRIGGER', 'itemsrcTrigger');
CREATE TRIGGER itemsrcTrigger BEFORE INSERT OR UPDATE ON itemsrc FOR EACH ROW EXECUTE PROCEDURE _itemsrcTrigger();
