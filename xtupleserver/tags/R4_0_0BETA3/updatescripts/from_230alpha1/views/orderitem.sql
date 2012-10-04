SELECT dropIfExists('view', 'orderitem');
CREATE VIEW orderitem AS
  SELECT poitem_id		AS orderitem_id,
	 'PO'			AS orderitem_orderhead_type,
	 poitem_pohead_id	AS orderitem_orderhead_id,
	 poitem_linenumber	AS orderitem_linenumber,
	 poitem_status		AS orderitem_status,
	 poitem_itemsite_id	AS orderitem_itemsite_id,
	 poitem_date_promise	AS orderitem_scheddate,
	 poitem_qty_ordered	AS orderitem_qty_ordered,
	 poitem_qty_returned	AS orderitem_qty_shipped,
	 poitem_qty_received	AS orderitem_qty_received,
	 uom_id			AS orderitem_qty_uom_id,
	 poitem_invvenduomratio	AS orderitem_qty_invuomratio,
	 poitem_unitprice	AS orderitem_unitcost,
	 (SELECT pohead_curr_id FROM pohead WHERE pohead_id=poitem_pohead_id)
	 			AS orderitem_unitcost_curr_id,
	 poitem_freight		AS orderitem_freight,
	 poitem_freight_received AS orderitem_freight_received,
	 (SELECT pohead_curr_id FROM pohead WHERE pohead_id=poitem_pohead_id)
	 			AS orderitem_freight_curr_id

  FROM poitem LEFT OUTER JOIN uom ON (uom_name=poitem_vend_uom)
  UNION
  SELECT coitem_id		AS orderitem_id,
	 'SO'			AS orderitem_orderhead_type,
	 coitem_cohead_id	AS orderitem_orderhead_id,
	 coitem_linenumber	AS orderitem_linenumber,
	 coitem_status		AS orderitem_status,
	 coitem_itemsite_id	AS orderitem_itemsite_id,
	 coitem_scheddate	AS orderitem_scheddate,
	 coitem_qtyord		AS orderitem_qty_ordered,
	 coitem_qtyshipped	AS orderitem_qty_shipped,
	 coitem_qtyreturned	AS orderitem_qty_received,
	 coitem_qty_uom_id	AS orderitem_qty_uom_id,
	 coitem_qty_invuomratio	AS orderitem_qty_invuomratio,
	 coitem_unitcost	AS orderitem_unitcost,
	 basecurrid()		AS orderitem_unitcost_curr_id,
	 NULL			AS orderitem_freight,
	 NULL			AS orderitem_freight_received,
	 basecurrid()		AS orderitem_freight_curr_id
  FROM coitem;

REVOKE ALL ON TABLE orderitem FROM PUBLIC;
GRANT  ALL ON TABLE orderitem TO mfgadmin;
GRANT  ALL ON TABLE orderitem TO GROUP openmfg;

COMMENT ON VIEW orderitem IS 'Union of all order line items for use by widgets and stored procedures which process multiple types of order';
