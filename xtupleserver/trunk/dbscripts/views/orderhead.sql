SELECT dropIfExists('view', 'orderhead');
CREATE VIEW orderhead AS
  SELECT pohead_id		AS orderhead_id,
	 'PO'			AS orderhead_type,
	 pohead_number		AS orderhead_number,
	 pohead_status		AS orderhead_status,
	 pohead_orderdate	AS orderhead_orderdate,
	 (SELECT count(*)
	   FROM poitem
	   WHERE poitem_pohead_id=pohead_id) AS orderhead_linecount,
	 vend_name		AS orderhead_from,
	 ''			AS orderhead_to
  FROM pohead LEFT OUTER JOIN vendinfo ON (pohead_vend_id=vend_id)
  UNION
  SELECT cohead_id		AS orderhead_id,
	 'SO'			AS orderhead_type,
	 cohead_number		AS orderhead_number,
	 -- depends on cohead_status in ('X', 'O', 'C') exclusively and
	 -- 'O' sorting before 'C' DESC
	 (SELECT coitem_status
	   FROM coitem
	   WHERE coitem_cohead_id=cohead_id
	     AND coitem_status != 'X'
	   ORDER BY coitem_status DESC
	   LIMIT 1)		AS orderhead_status,
	 cohead_orderdate	AS orderhead_orderdate,
	 (SELECT count(*)
	   FROM coitem
	   WHERE coitem_cohead_id=cohead_id) AS orderhead_linecount,
	 ''			AS orderhead_from,
	 cust_name		AS orderhead_to
  FROM cohead LEFT OUTER JOIN custinfo ON (cohead_cust_id=cust_id);
REVOKE ALL ON TABLE orderhead FROM PUBLIC;
GRANT  ALL ON TABLE orderhead TO mfgadmin;
GRANT  ALL ON TABLE orderhead TO GROUP openmfg;

COMMENT ON VIEW orderhead IS 'Summary of all orders for use by OrderLineEdit and OrderCluster';
