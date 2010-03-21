SELECT dropIfExists('view', 'orderhead');
CREATE VIEW orderhead AS
  SELECT * FROM orderhead();
REVOKE ALL ON TABLE orderhead FROM PUBLIC;
GRANT  ALL ON TABLE orderhead TO GROUP openmfg;

COMMENT ON VIEW orderhead IS 'Union of all orders for use by widgets and stored procedures which process multiple types of order';
