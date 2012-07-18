CREATE OR REPLACE FUNCTION formatNumeric(NUMERIC, TEXT) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _value        NUMERIC := $1;
  _type         TEXT    := LOWER(COALESCE($2, 'curr'));
  _abs          NUMERIC;
  _magnitudecnt NUMERIC(1000);
  _wholefmt     TEXT    := '0';
  _scale        INTEGER;
  _neg          TEXT;
  _decimal      TEXT;
  _group        TEXT;
  _string       TEXT;
  _exampleFmt   TEXT;

BEGIN
  -- If the value passed in is NULL then we want to pass back an empty string
  IF(_value IS NULL) THEN
    RETURN '';
  END IF;

  SELECT locale_qtyformat INTO _exampleFmt
  FROM locale
  JOIN usr ON (usr_locale_id=locale_id)
  WHERE (usr_username=getEffectiveXtUser());

  _decimal := COALESCE(SUBSTRING(_exampleFmt FROM 1 FOR 1), '.');
  _neg     := COALESCE(SUBSTRING(_exampleFmt FROM 2 FOR 1), '-');
  _group   := COALESCE(SUBSTRING(_exampleFmt FROM 3 FOR 1), ',');

  -- explicitly handle just those cases that differ from what getNumScale knows
  _scale   := CASE WHEN SUBSTRING(_type FOR 4) = 'curr' THEN getNumScale('MONEY')
                   WHEN _type = 'extprice'   THEN getNumScale('MONEY')
                   WHEN _type = 'purchprice' THEN getNumScale('PURCHP')
                   WHEN _type = 'salesprice' THEN getNumScale('SALEP')
                   ELSE getNumScale(_type)
              END;

  _value        := round(_value, _scale);
  _abs          := ABS(_value);
  _magnitudecnt := TRUNC(_abs / 10);

  RAISE DEBUG '_value % _abs % _scale % _neg % _decimal % _group % ',
               _value, _abs, _scale, _decimal, _group, _scale;

  IF (_value < 0) THEN
    _string := _neg;
  ELSE
    _string := '';
  END IF;

  WHILE (_magnitudecnt >= 1) LOOP
    _magnitudecnt := TRUNC(_magnitudecnt / 10);
    IF (LENGTH(_wholefmt) % 3 = 0) THEN
      _wholefmt := '"' || _group || '"' || _wholefmt;
    END IF;
    _wholefmt := '9' || _wholefmt;
  END LOOP;

  IF (_scale > 0) THEN
    _abs := (_abs * (10 ^ _scale));
    _abs := TRUNC(_abs);
    _wholefmt := _wholefmt || '"' || _decimal || '"' || REPEAT('0', _scale);
  END IF;

  _wholefmt := 'FM' || _wholefmt;
  _string := _string || to_char(_abs, _wholefmt);

  RETURN _string;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;
