BEGIN;

--Customer Tax Registration View

SELECT dropIfExists('VIEW', 'customertaxreg', 'api');
CREATE OR REPLACE VIEW api.customertaxreg AS

SELECT
  cust_number::varchar AS customer_number,
  taxauth_code::varchar AS tax_authority,
  taxreg_number AS registration_number
FROM taxreg
     LEFT OUTER JOIN custinfo ON (cust_id=taxreg_rel_id)
     LEFT OUTER JOIN taxauth ON (taxauth_id=taxreg_taxauth_id)
WHERE (taxreg_rel_type='C')
ORDER BY cust_number, taxreg_number;

GRANT ALL ON TABLE api.customertaxreg TO openmfg;
COMMENT ON VIEW api.customertaxreg IS 'Customer Tax Registrations';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
  ON INSERT TO api.customertaxreg DO INSTEAD

INSERT INTO taxreg (
  taxreg_rel_id,
  taxreg_rel_type,
  taxreg_taxauth_id,
  taxreg_number )
VALUES (
  getCustId(NEW.customer_number),
  'C',
  (SELECT cust_taxauth_id
   FROM custinfo
   WHERE cust_id=getCustId(NEW.customer_number)),
  COALESCE(NEW.registration_number,'') );

COMMIT;
