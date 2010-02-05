CREATE OR REPLACE FUNCTION _cntctTrigger() RETURNS "trigger" AS $$
BEGIN
   
  NEW.cntct_name := formatCntctName(NEW.cntct_honorific, NEW.cntct_first_name, NEW.cntct_middle, NEW.cntct_last_name, NEW.cntct_suffix);
  
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'cntct');
CREATE TRIGGER cntcttrigger
  BEFORE INSERT OR UPDATE
  ON cntct
  FOR EACH ROW
  EXECUTE PROCEDURE _cntctTrigger();

