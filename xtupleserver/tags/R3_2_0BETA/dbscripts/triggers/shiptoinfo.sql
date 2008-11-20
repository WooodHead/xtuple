CREATE OR REPLACE FUNCTION _shiptoinfoAfterTrigger () RETURNS TRIGGER AS '
BEGIN
  IF (NEW.shipto_default) THEN
    UPDATE shiptoinfo
    SET shipto_default = false
    WHERE ((shipto_cust_id=NEW.shipto_cust_id)
    AND (shipto_id <> NEW.shipto_id));
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER shiptoinfoAfterTrigger ON shiptoinfo;
CREATE TRIGGER shiptoinfoAfterTrigger AFTER INSERT OR UPDATE ON shiptoinfo FOR EACH ROW EXECUTE PROCEDURE _shiptoinfoAfterTrigger();

