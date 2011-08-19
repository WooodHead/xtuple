SELECT dropIfExists('view', 'invoiceitem');
CREATE VIEW invoiceitem AS
SELECT invcitem.*, itemsite_id,
       COALESCE((invcitem_billed * invcitem_qty_invuomratio), 0) AS qty,
       COALESCE((invcitem_price / invcitem_price_invuomratio), 0) AS unitprice,
       COALESCE(round((invcitem_billed * invcitem_qty_invuomratio) *
                      (invcitem_price / invcitem_price_invuomratio), 2), 0) AS extprice,
       currToBase(invchead_curr_id,
                  COALESCE(round((invcitem_billed * invcitem_qty_invuomratio) *
                                 (invcitem_price / invcitem_price_invuomratio), 2), 0),
                  invchead_invcdate) AS baseextprice,
       ( SELECT COALESCE(SUM(taxhist_tax), 0)
         FROM invcitemtax
         WHERE (taxhist_parent_id = invcitem_id) ) AS tax,
       ( SELECT COALESCE(SUM(shipitem_value), 0)
         FROM shipitem
         WHERE (shipitem_invcitem_id = invcitem_id) ) / (invcitem_billed * invcitem_qty_invuomratio) AS unitcost
FROM invcitem JOIN invchead ON (invchead_id = invcitem_invchead_id)
              LEFT OUTER JOIN itemsite ON ( (itemsite_item_id = invcitem_item_id)
                                       AND  (itemsite_warehous_id = invcitem_warehous_id) );

REVOKE ALL ON TABLE invoiceitem FROM PUBLIC;
GRANT  ALL ON TABLE invoiceitem TO GROUP xtrole;

COMMENT ON VIEW invoiceitem IS 'Single point for invoice item (invcitem) calculations.';
