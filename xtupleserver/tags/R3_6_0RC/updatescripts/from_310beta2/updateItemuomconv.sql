BEGIN;

UPDATE itemuomconv 
SET itemuomconv_to_value = uomconv_to_value, 
itemuomconv_from_value = uomconv_from_value
FROM uomconv
WHERE((itemuomconv_to_uom_id = uomconv_to_uom_id)
AND (itemuomconv_from_uom_id = uomconv_from_uom_id));

COMMIT;
