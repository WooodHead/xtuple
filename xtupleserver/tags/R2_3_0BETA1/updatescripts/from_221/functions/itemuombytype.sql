CREATE OR REPLACE FUNCTION itemUOMByType(INTEGER, TEXT) RETURNS TEXT AS '
DECLARE
  pItemid ALIAS FOR $1;
  pUomtype ALIAS FOR $2;
  _uom TEXT;
BEGIN
  SELECT uom_name
    INTO _uom
    FROM item
    JOIN itemuomconv ON (itemuomconv_item_id=item_id)
    JOIN itemuom ON (itemuom_itemuomconv_id=itemuomconv_id)
    JOIN uomtype ON (itemuom_uomtype_id=uomtype_id)
    JOIN uom ON (itemuomconv_to_uom_id=uom_id)
   WHERE((item_id=pItemid)
     AND (uomtype_name=pUomtype))
   LIMIT 1;

  IF (NOT FOUND) THEN
    SELECT uom_name
      INTO _uom
      FROM item
      JOIN uom ON (item_inv_uom_id=uom_id)
     WHERE(item_id=pItemid);
  END IF;

  RETURN _uom;
END;
' LANGUAGE 'plpgsql';
