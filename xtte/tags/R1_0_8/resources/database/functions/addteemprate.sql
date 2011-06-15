-- Function: te.addteemprate(integer, numeric)

-- DROP FUNCTION te.addteemprate(integer, numeric);

CREATE OR REPLACE FUNCTION te.addteemprate(integer, numeric)
  RETURNS integer AS
$BODY$
DECLARE
_empid int4;
pEmpID ALIAS FOR $1;
pRate ALIAS FOR $2;

BEGIN

--if new, do an insert to teemprate, else, update
	select teemprate_emp_id into _empid from te.teemprate where teemprate_emp_id = pEmpID;


	IF (_empid > 0) THEN
		update te.teemprate set teemprate_rate = pRate where teemprate_emp_id = pEmpID;
	ELSE
	        insert into  te.teemprate(teemprate_emp_id,teemprate_rate) VALUES (pEmpID,pRate);
	END IF;

RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.addteemprate(integer, numeric) OWNER TO "admin";
