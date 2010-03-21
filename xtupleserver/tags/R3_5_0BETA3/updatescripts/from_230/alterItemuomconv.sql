BEGIN;

-- Add constraints
ALTER TABLE itemuomconv ADD CONSTRAINT itemuomconv_uom CHECK (itemuomconv_from_uom_id != itemuomconv_to_uom_id);

COMMIT;