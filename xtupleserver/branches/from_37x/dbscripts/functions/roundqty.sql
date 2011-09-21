
CREATE OR REPLACE FUNCTION roundQty(BOOLEAN, NUMERIC) RETURNS NUMERIC AS '
DECLARE
  _fractional ALIAS FOR $1;
  _qty ALIAS FOR $2;
  _scale INTEGER;

BEGIN
  IF (_fractional) THEN
    SELECT locale_qty_scale INTO _scale
    FROM locale, usr
    WHERE ((usr_locale_id=locale_id) AND (usr_username=CURRENT_USER));

    RETURN ROUND(_qty, _scale);
  ELSE

    IF (TRUNC(_qty) < _qty) THEN
      RETURN (TRUNC(_qty) + 1);
    ELSE
      RETURN _qty;
    END IF;

  END IF;
END;
' LANGUAGE 'plpgsql';

