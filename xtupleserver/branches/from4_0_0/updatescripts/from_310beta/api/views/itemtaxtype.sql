BEGIN;

-- Item Tax Type

DROP VIEW api.itemtaxtype;
CREATE VIEW api.itemtaxtype
AS 
   SELECT 
     item_number::varchar AS item_number,
     CASE
       WHEN (taxauth_id IS NULL) THEN
         'Any'::varchar
       ELSE
         taxauth_code::varchar
     END AS tax_authority,
     taxtype_name AS tax_type
   FROM item, itemtax
     LEFT OUTER JOIN taxauth ON (itemtax_taxauth_id=taxauth_id),
     taxtype
   WHERE ((item_id=itemtax_item_id)
   AND (itemtax_taxtype_id=taxtype_id));

GRANT ALL ON TABLE api.itemtaxtype TO openmfg;
COMMENT ON VIEW api.itemtaxtype IS 'Item Tax Type';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.itemtaxtype DO INSTEAD

  INSERT INTO itemtax (
    itemtax_item_id,
    itemtax_taxauth_id,
    itemtax_taxtype_id)
  VALUES (
    getItemId(NEW.item_number),
    getTaxAuthId(NEW.tax_authority),
    getTaxTypeId(NEW.tax_type));

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.itemtaxtype DO INSTEAD

  UPDATE itemtax SET
    itemtax_taxauth_id=getTaxAuthId(NEW.tax_authority),
    itemtax_taxtype_id=getTaxTypeId(NEW.tax_type)
  WHERE  ((itemtax_item_id=getItemId(OLD.item_number))
  AND (itemtax_taxauth_id=getTaxAuthId(OLD.tax_authority))
  AND (itemtax_taxtype_id=getTaxTypeId(OLD.tax_type)));
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.itemtaxtype DO INSTEAD

  DELETE FROM itemtax
  WHERE  ((itemtax_item_id=getItemId(OLD.item_number))
  AND (itemtax_taxauth_id=getTaxAuthId(OLD.tax_authority))
  AND (itemtax_taxtype_id=getTaxTypeId(OLD.tax_type)));

COMMIT;
