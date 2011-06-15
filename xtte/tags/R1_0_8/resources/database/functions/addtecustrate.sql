-- Function: te.addtecustrate(text, numeric)

-- DROP FUNCTION te.addtecustrate(text, numeric);

CREATE OR REPLACE FUNCTION te.addtecustrate(text, numeric)
  RETURNS integer AS
$BODY$
DECLARE
_custname text;
pCustName ALIAS FOR $1;
pRate ALIAS FOR $2;

BEGIN

--if new, do an insert to tecustrate, else, update
	select tecustrate_cust_name into _custname from te.tecustrate where tecustrate_cust_name = pCustName;

	IF (_custname is not null) THEN
		update te.tecustrate set tecustrate_rate = pRate where tecustrate_cust_name = pCustName;
	ELSE
	        insert into  te.tecustrate(tecustrate_cust_name,tecustrate_rate) VALUES (pCustName,pRate);
	END IF;

RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.addtecustrate(text, numeric) OWNER TO "admin";
