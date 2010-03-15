BEGIN;

CREATE TYPE orderitemtype AS (
  orderitem_id INTEGER,
  orderitem_orderhead_type TEXT,
  orderitem_orderhead_id INTEGER,
  orderitem_linenumber INTEGER,
  orderitem_status TEXT,
  orderitem_itemsite_id INTEGER,
  orderitem_scheddate DATE,
  orderitem_qty_ordered NUMERIC,
  orderitem_qty_shipped NUMERIC,
  orderitem_qty_received NUMERIC,
  orderitem_qty_uom_id INTEGER,
  orderitem_qty_invuomratio NUMERIC,
  orderitem_unitcost NUMERIC,
  orderitem_unitcost_curr_id INTEGER,
  orderitem_freight NUMERIC,
  orderitem_freight_received NUMERIC,
  orderitem_freight_curr_id INTEGER
);

COMMIT;
