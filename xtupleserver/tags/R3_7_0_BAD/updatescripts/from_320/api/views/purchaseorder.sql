BEGIN;

  --Purchase Order View

  SELECT dropIfExists('VIEW', 'purchaseorder', 'api');
  CREATE OR REPLACE VIEW api.purchaseorder AS

  SELECT
    pohead_number::varchar AS order_number,
    pohead_orderdate AS order_date,
    terms_code AS terms,
    warehous_code AS receiving_site,
    pohead_agent_username AS purchasing_agent,
    vend_number AS vendor_number,
    COALESCE(vendaddr_code,'MAIN') AS alt_address,
    pohead_fob AS fob,
    pohead_shipvia AS ship_via,
    curr_abbr AS currency,
    pohead_tax AS tax,
    pohead_freight AS freight,
    pohead_comments AS notes
  FROM pohead
    LEFT OUTER JOIN terms ON (pohead_terms_id=terms_id)
    LEFT OUTER JOIN whsinfo ON (pohead_warehous_id=warehous_id)
    LEFT OUTER JOIN vendaddrinfo ua ON (pohead_vendaddr_id=vendaddr_id)
    JOIN vendinfo ON (pohead_vend_id=vend_id)
    JOIN curr_symbol ON (pohead_curr_id=curr_id)
  ORDER BY pohead_number;

GRANT ALL ON TABLE api.purchaseorder TO openmfg;
COMMENT ON VIEW api.purchaseorder IS 'Purchase Order';

  --Rules

  CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.purchaseorder DO INSTEAD

  INSERT INTO pohead (
    pohead_number,
    pohead_orderdate,
    pohead_status,
    pohead_terms_id,
    pohead_warehous_id,
    pohead_agent_username,
    pohead_vend_id,
    pohead_vendaddr_id,
    pohead_fob,
    pohead_shipvia,
    pohead_curr_id,
    pohead_tax,
    pohead_freight,
    pohead_comments)
  SELECT
    NEW.order_number,
    COALESCE(NEW.order_date,current_date),
    'U',
    COALESCE(getTermsId(NEW.terms),vend_terms_id),
    COALESCE(getWarehousId(NEW.receiving_site,'ALL'),fetchPrefwarehousid()),
    COALESCE(NEW.purchasing_agent,current_user),
    getVendId(NEW.vendor_number),
    CASE WHEN (NEW.alt_address='MAIN') THEN NULL
      ELSE getVendAddrId(NEW.vendor_number, NEW.alt_address) END,
    COALESCE(NEW.fob,
      CASE WHEN (vend_fobsource='W') THEN (
        SELECT warehous_fob
        FROM whsinfo
        WHERE (warehous_id=COALESCE(getWarehousId(NEW.receiving_site,'ALL'),fetchPrefWarehousId()))
      )
      ELSE vend_fob END),
    COALESCE(NEW.ship_via,vend_shipvia),
    COALESCE(getCurrId(NEW.currency),vend_curr_id),
    0,
    COALESCE(NEW.freight,0),
    COALESCE(NEW.notes,'')
  FROM vend
  WHERE (vend_id=getVendId(NEW.vendor_number));
 
  CREATE OR REPLACE RULE "_UPDATE" AS
  ON UPDATE TO api.purchaseorder DO INSTEAD

  UPDATE pohead SET
    pohead_terms_id=getTermsId(NEW.terms),
    pohead_warehous_id=getWarehousId(NEW.receiving_site,'ALL'),
    pohead_agent_username=NEW.purchasing_agent,
    pohead_vendaddr_id=
      CASE WHEN (NEW.alt_address='MAIN') THEN NULL
      ELSE getVendAddrId(OLD.vendor_number, NEW.alt_address) END,
    pohead_fob=NEW.fob,
    pohead_shipvia=NEW.ship_via,
    pohead_curr_id=getCurrId(NEW.currency),
    pohead_tax=NEW.tax,
    pohead_freight=NEW.freight,
    pohead_comments=NEW.notes
  WHERE (pohead_number=OLD.order_number);

  CREATE OR REPLACE RULE "_DELETE" AS
  ON DELETE TO api.purchaseorder DO INSTEAD

  SELECT deletepo(pohead_id)
  FROM pohead
  WHERE (pohead_number=OLD.order_number);

COMMIT;
