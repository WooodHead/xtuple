CREATE OR REPLACE FUNCTION formatNumeric(NUMERIC, TEXT) RETURNS TEXT IMMUTABLE AS '
DECLARE
  _value        NUMERIC := COALESCE($1, 0);
  _type         TEXT    := LOWER(COALESCE($2, ''curr''));
  _abs          NUMERIC := ABS(_value);
  _whole        INTEGER := TRUNC(_abs);
  _fractional   NUMERIC := _abs - _whole;
  _scale        INTEGER;
  _neg          TEXT;
  _decimal      TEXT;
  _string       TEXT;
  _debug        BOOL := false;
  _r            RECORD;

BEGIN
  SELECT * INTO _r
  FROM locale, usr
  WHERE ((usr_locale_id=locale_id)
     AND (usr_username=CURRENT_USER));

  _neg     := COALESCE(SUBSTRING(_r.locale_qtyformat FROM 2 FOR 1), ''-'');
  _decimal := COALESCE(SUBSTRING(_r.locale_qtyformat FROM 1 FOR 1), ''.'');
  _scale   := CASE WHEN _type = ''cost''       THEN _r.locale_cost_scale
                   WHEN _type = ''extprice''   THEN _r.locale_extprice_scale
                   WHEN _type = ''percent''    THEN 2
                   WHEN _type = ''purchprice'' THEN _r.locale_purchprice_scale
                   WHEN _type = ''qty''        THEN _r.locale_qty_scale
                   WHEN _type = ''qtyper''     THEN _r.locale_qtyper_scale
                   WHEN _type = ''salesprice'' THEN _r.locale_salesprice_scale
                   WHEN _type = ''uomratio''   THEN _r.locale_uomratio_scale
                   WHEN _type = ''weight''     THEN 2
                   WHEN SUBSTRING(_type FOR 4) = ''curr'' THEN _r.locale_curr_scale
                   ELSE 2
              END;

  IF (_debug) THEN
    RAISE NOTICE ''_formatinfo % _neg % _decimal % _scale %'',
                 _formatinfo, _neg, _decimal, _scale;
  END IF;

  IF (_value < 0) THEN
    _string := _neg;
  ELSE
    _string := '''';
  END IF;

  _string := _string || CAST(_whole AS TEXT);

  IF (_scale > 0) THEN
    _string := _string || _decimal;
    FOR _scale IN REVERSE _scale..1 LOOP
      _fractional := (_fractional - TRUNC(_fractional, 0)) * 10;
      IF _debug THEN RAISE NOTICE ''_fractional is now %'', _fractional; END IF;
      IF (_scale = 1) THEN
        _string := _string || CAST(ROUND(_fractional) AS TEXT);
      ELSE
        _string := _string || CAST(TRUNC(_fractional) AS TEXT);
      END IF;
    END LOOP;
  END IF;

  RETURN _string;
END;'
LANGUAGE 'plpgsql';
