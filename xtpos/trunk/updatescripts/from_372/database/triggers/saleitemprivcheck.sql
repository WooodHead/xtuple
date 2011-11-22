CREATE OR REPLACE FUNCTION xtpos.saleitemPrivCheck() RETURNS "trigger" AS $$  
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  --Privilege Checks
  IF (NOT checkPrivilege('MaintainRetailSales')) THEN
    RAISE EXCEPTION 'You do not have privileges to edit cash register sales.';
  END IF;

  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'saleitemPrivCheck','xtpos');
CREATE TRIGGER saleitemPrivCheck BEFORE INSERT OR UPDATE OR DELETE ON xtpos.saleitem FOR EACH ROW EXECUTE PROCEDURE xtpos.saleitemPrivCheck();
