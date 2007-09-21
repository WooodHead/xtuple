CREATE OR REPLACE FUNCTION fetchShipmentNumber() RETURNS INTEGER AS '
DECLARE
  _number		INTEGER;
  _test			INTEGER;

BEGIN
  LOOP

    SELECT orderseq_number INTO _number
    FROM orderseq
    WHERE (orderseq_name=''ShipmentNumber'');
    IF (NOT FOUND) THEN
      RETURN -1;
    END IF;

    UPDATE orderseq
    SET orderseq_number=(orderseq_number + 1)
    WHERE (orderseq_name=''ShipmentNumber'');
    
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
