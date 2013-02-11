CREATE OR REPLACE FUNCTION getSoStatus(INTEGER) RETURNS CHAR(1) AS $$
DECLARE
  pCoheadid ALIAS FOR $1;
  _r RECORD;

BEGIN

  SELECT coitem_status,
  CASE 
    WHEN (coitem_status = 'O') THEN 1
    WHEN (coitem_status = 'C') then 2
    ELSE  3
  END AS seq INTO _r
  FROM coitem
  WHERE (coitem_cohead_id=pCoheadid)
  ORDER BY seq
  LIMIT 1;

  RETURN COALESCE(_r.coitem_status,'O');

END;
$$ LANGUAGE 'plpgsql';
