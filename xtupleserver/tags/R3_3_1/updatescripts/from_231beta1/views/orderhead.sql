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
	 pohead_vend_id		AS orderhead_from_id,
	 vend_name		AS orderhead_from,
	 NULL			AS orderhead_to_id,
	 ''			AS orderhead_to,
	 pohead_curr_id		AS orderhead_curr_id,
	 pohead_agent_username	AS orderhead_agent_username,
	 pohead_shipvia		AS orderhead_shipvia
  FROM pohead LEFT OUTER JOIN vendinfo ON (pohead_vend_id=vend_id)
  UNION
  SELECT cohead_id		AS orderhead_id,
	 'SO'			AS orderhead_type,
	 cohead_number		AS orderhead_number,
	 -- depends on cohead_status in ('X', 'O', 'C') exclusively and
	 -- 'O' sorting before 'C' DESC
	 COALESCE(coitem_status,'C') AS orderhead_status,
	 cohead_orderdate	AS orderhead_orderdate,
	 (SELECT count(*)
	   FROM coitem
	   WHERE coitem_cohead_id=cohead_id) AS orderhead_linecount,
	 NULL			AS orderhead_from_id,
	 ''			AS orderhead_from,
	 cohead_cust_id		AS orderhead_to_id,
	 cust_name		AS orderhead_to,
	 cohead_curr_id		AS orderhead_curr_id,
	 ''			AS orderhead_agent_username,
	 cohead_shipvia		AS orderhead_shipvia
  FROM cohead LEFT OUTER JOIN custinfo ON (cohead_cust_id=cust_id)
              LEFT OUTER JOIN coitem ON ((cohead_id=coitem_cohead_id)
                                     AND (coitem_status='O'));
REVOKE ALL ON TABLE orderhead FROM PUBLIC;
GRANT  ALL ON TABLE orderhead TO mfgadmin;
GRANT  ALL ON TABLE orderhead TO GROUP openmfg;

COMMENT ON VIEW orderhead IS 'Union of all orders for use by widgets and stored procedures which process multiple types of order';
