CREATE OR REPLACE FUNCTION fetchshipmentnumber() RETURNS INTEGER AS '
DECLARE
  _number		INTEGER;
  _test			INTEGER;

BEGIN
  LOOP

    SELECT nextval(''shipment_number_seq'') INTO _number;
    
    SELECT shiphead_id INTO _test
      FROM shiphead
     WHERE (shiphead_number=_number);
    IF (NOT FOUND) THEN
      EXIT;
    END IF;

  END LOOP;

  RETURN _number;
  
END;
' LANGUAGE 'plpgsql';



