BEGIN;

-- Quote Line

DROP VIEW _quoteline;
CREATE VIEW _quoteline
AS 
  SELECT 
     quhead_number AS quote_number,
     quitem_linenumber AS line_number,
     l.item_number AS item_number,
     quitem_custpn AS customer_pn,
     i.warehous_code AS sold_from_whs,
     quitem_qtyord AS qty_ordered,
     quitem_price AS net_unit_price,
     quitem_scheddate AS scheduled_date,
     COALESCE((
       SELECT taxtype_name
       FROM taxtype
       WHERE (taxtype_id=getItemTaxType(l.item_id, quhead_taxauth_id))),'None') AS tax_type,
     COALESCE(tax_code,'None') AS tax_code,
     CASE
       WHEN quitem_price = 0 THEN
         '100'
       WHEN quitem_custprice = 0 THEN
         'N/A'
       ELSE
         CAST(ROUND(((1 - quitem_price / quitem_custprice) * 100),4) AS text)
     END AS discount_pct_from_list,
     quitem_createorder AS create_order,
     s.warehous_code AS supplying_whs,
     quitem_prcost AS overwrite_po_price,
     quitem_memo AS notes
  FROM quhead, quitem
    LEFT OUTER JOIN tax ON (quitem_tax_id=tax_id)
    LEFT OUTER JOIN whsinfo s ON (quitem_order_warehous_id=s.warehous_id),
  itemsite il, item l, whsinfo i
  WHERE ((quhead_id=quitem_quhead_id)
  AND (quitem_itemsite_id=il.itemsite_id)
  AND (il.itemsite_item_id=l.item_id)
  AND (il.itemsite_warehous_id=i.warehous_id))
ORDER BY quhead_number,quitem_linenumber;
    

GRANT ALL ON TABLE _quoteline TO openmfg;
COMMENT ON VIEW _quoteline IS '
This view can be used as an interface to import Quote Line Items data directly  
into the system.  Required fields will be checked';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO _quoteline DO INSTEAD

  INSERT INTO quitem (
    quitem_quhead_id,
    quitem_linenumber,
    quitem_itemsite_id,
    quitem_scheddate,
    quitem_qtyord,
    quitem_unitcost,
    quitem_price,
    quitem_custprice,
    quitem_memo,
    quitem_imported,
    quitem_custpn,
    quitem_createorder,
    quitem_order_warehous_id,
    quitem_item_id,
    quitem_prcost,
    quitem_tax_id)
  SELECT
    getQuoteId(NEW.quote_number),
    COALESCE(NEW.line_number,(
      SELECT (COALESCE(MAX(quitem_linenumber), 0) + 1)
              FROM quitem
              WHERE (quitem_quhead_id=getQuoteId(NEW.quote_number)))),
    itemsite_id,
    COALESCE(NEW.scheduled_date,(
      SELECT MIN(quitem_scheddate)
      FROM quitem
      WHERE (quitem_quhead_id=getQuoteId(NEW.quote_number)))),
    NEW.qty_ordered,
    stdCost(item_id),
    COALESCE(NEW.net_unit_price,itemPrice(getItemId(NEW.item_number),quhead_cust_id,
             quhead_shipto_id,NEW.qty_ordered,quhead_curr_id,quhead_quotedate)),
    itemPrice(getItemId(NEW.item_number),quhead_cust_id,
             quhead_shipto_id,NEW.qty_ordered,quhead_curr_id,quhead_quotedate),
    COALESCE(NEW.notes,''),
    true,
    NEW.customer_pn,
    COALESCE(NEW.create_order,false),
    COALESCE(getWarehousId(NEW.supplying_whs,'SHIPPING'),itemsite_warehous_id),
    getItemId(NEW.item_number),
    COALESCE(NEW.overwrite_po_price,0),
    COALESCE(getTaxId(NEW.tax_code),(
             SELECT tax_id
             FROM tax
             WHERE ((tax_id=getTaxSelection(quhead_taxauth_id,
	           getItemTaxType(itemsite_item_id, quhead_taxauth_id))))))
  FROM quhead, itemsite, item, whsinfo
  WHERE ((quhead_id=getQuoteId(NEW.quote_number))
  AND (itemsite_id=getItemsiteId(COALESCE(NEW.sold_from_whs,(
                                SELECT warehous_code 
                                FROM usrpref, whsinfo
                                WHERE ((warehous_id=CAST(usrpref_value AS INTEGER))
                                AND (warehous_active)
                                AND (usrpref_username=current_user)
                                AND (usrpref_name='PreferredWarehouse'))),''),
                                COALESCE(NEW.item_number,(
                                SELECT item_number
                                FROM item, itemalias
                                WHERE ((item_id=itemalias_item_id)
                                AND (itemalias_number=NEW.customer_pn)))),
                                'SOLD'))
  AND (itemsite_item_id=item_id)
  AND (warehous_id=itemsite_warehous_id));

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO _quoteline DO INSTEAD

  UPDATE quitem SET
    quitem_scheddate=NEW.scheduled_date,
    quitem_qtyord=NEW.qty_ordered,
    quitem_price=NEW.net_unit_price,
    quitem_memo=NEW.notes,
    quitem_createorder=NEW.create_order,
    quitem_order_warehous_id=getWarehousId(NEW.supplying_whs,'SHIPPING'),
    quitem_prcost=NEW.overwrite_po_price,
    quitem_tax_id=getTaxId(NEW.tax_code)
   FROM item
   WHERE ((quitem_quhead_id=getQuoteId(OLD.quote_number))
   AND (quitem_linenumber=OLD.line_number));

CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO _quoteline DO INSTEAD

  DELETE FROM quitem
  WHERE ((quitem_quhead_id=getQuoteId(OLD.quote_number))
  AND (quitem_linenumber=OLD.line_number));

COMMIT;
