
CREATE OR REPLACE FUNCTION roundQty(BOOLEAN, NUMERIC) RETURNS NUMERIC AS '
DECLARE
  _fractional ALIAS FOR $1;
  _qty ALIAS FOR $2;

BEGIN
  IF (_fractional) THEN
    RETURN _qty;
  ELSE

    IF (TRUNC(_qty) < _qty) THEN
      RETURN (TRUNC(_qty) + 1);
    ELSE
      RETURN _qty;
    END IF;

  END IF;
END;
' LANGUAGE 'plpgsql';

