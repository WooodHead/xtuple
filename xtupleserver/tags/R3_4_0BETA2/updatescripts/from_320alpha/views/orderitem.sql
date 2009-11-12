SELECT dropIfExists('view', 'orderitem');

CREATE VIEW orderitem AS
  SELECT * FROM orderitem();

REVOKE ALL ON TABLE orderitem FROM PUBLIC;
GRANT  ALL ON TABLE orderitem TO GROUP openmfg;

COMMENT ON VIEW orderitem IS 'Union of all order line items for use by widgets and stored procedures which process multiple types of order';
