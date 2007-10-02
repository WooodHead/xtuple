CREATE OR REPLACE FUNCTION itemUOMRatioByType(INTEGER, TEXT) RETURNS NUMERIC AS '
DECLARE
  pItemid ALIAS FOR $1;
  pUomtype ALIAS FOR $2;
  _ratio NUMERIC;
BEGIN
  SELECT itemuomconv_ratio
    INTO _ratio
    FROM item
    JOIN itemuomconv ON (itemuomconv_item_id=item_id)
    JOIN itemuom ON (itemuom_itemuomconv_id=itemuomconv_id)
    JOIN uomtype ON (itemuom_uomtype_id=uomtype_id)
   WHERE((item_id=pItemid)
     AND (uomtype_name=pUomtype))
   LIMIT 1;

  IF (NOT FOUND) THEN
    _ratio := 1.0;
  END IF;

  RETURN _ratio;
END;
' LANGUAGE 'plpgsql';
