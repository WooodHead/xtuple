CREATE OR REPLACE FUNCTION te.triggerteprj() RETURNS "trigger" AS $$
BEGIN

  -- Reset status if any processing reversed
  IF (COALESCE(OLD.teprj_cust_id,-1) != COALESCE(NEW.teprj_cust_id,-1)) THEN
    UPDATE te.teprjtask SET teprjtask_cust_id=NEW.teprj_cust_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'teprjtrigger', 'te');
CREATE TRIGGER teprjtrigger
  AFTER UPDATE
  ON te.teprj
  FOR EACH ROW
  EXECUTE PROCEDURE te.triggerteprj();
