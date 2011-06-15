-- Function: te.addteprj(integer, integer, numeric)

-- DROP FUNCTION te.addteprj(integer, integer, numeric);

CREATE OR REPLACE FUNCTION te.addteprj(integer, integer, numeric)
  RETURNS integer AS
$BODY$
DECLARE
_prjid int4;
pPrjID ALIAS FOR $1;
pCustID ALIAS FOR $2;
pRate ALIAS FOR $3;

BEGIN

--if new, do an insert to teprj, else, update
	select teprj_id into _prjid from te.teprj where teprj_prj_id = pPrjID;


	IF (_prjid > 0) THEN
		update te.teprj set teprj_rate = pRate,teprj_cust_id = pCustID where teprj_id = _prjid;
	ELSE
	        insert into  te.teprj(teprj_prj_id,teprj_cust_id,teprj_rate) VALUES (pPrjID,pCustID,pRate);
	END IF;

RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.addteprj(integer, integer, numeric) OWNER TO "admin";
