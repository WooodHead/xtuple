
CREATE OR REPLACE FUNCTION roundLocale(pFractional BOOLEAN,
                                       pQty NUMERIC,
                                       pLocale TEXT) RETURNS NUMERIC AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _r RECORD;
  _scale INTEGER;

BEGIN
  SELECT * INTO _r
  FROM locale, usr
  WHERE ((usr_locale_id=locale_id) AND (usr_username=getEffectiveXtUser()));

  _scale := CASE pLocale WHEN 'qtyper' THEN _r.locale_qtyper_scale
                         WHEN 'cost' THEN _r.locale_cost_scale
                         ELSE _r.locale_qty_scale
            END;

  IF (pFractional) THEN
    RETURN ROUND(pQty, _scale);
  ELSE
    IF (TRUNC(pQty) < ROUND(pQty, _scale)) THEN
      RETURN (TRUNC(pQty) + 1);
    ELSE
      RETURN TRUNC(pQty);
    END IF;
  END IF;
END;
$$ LANGUAGE 'plpgsql';

