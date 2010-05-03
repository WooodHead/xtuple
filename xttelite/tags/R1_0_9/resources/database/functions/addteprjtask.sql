
-- Function: te.addteprjtask(integer, text, integer, numeric, integer)

-- DROP FUNCTION te.addteprjtask(integer, text, integer, numeric, integer);

CREATE OR REPLACE FUNCTION te.addteprjtask(integer, text, integer, numeric, integer)
  RETURNS integer AS
$BODY$
DECLARE
_tasknumber text;
pPrjID ALIAS FOR $1;
pTaskNumber ALIAS FOR $2;
pCustID ALIAS FOR $3;
pRate ALIAS FOR $4;
pItemID ALIAS FOR $5;

BEGIN

--if new, do an insert to teprjtsk, else, update
	select teprjtask_prjtask_number into _tasknumber from te.teprjtask where teprjtask_prjtask_number = pTaskNumber and teprjtask_prj_id = pPrjID;

	IF NOT FOUND THEN
	        insert into  te.teprjtask(teprjtask_prj_id,teprjtask_prjtask_number,teprjtask_cust_id,teprjtask_rate,teprjtask_item_id) VALUES (pPrjID,pTaskNumber,pCustID,pRate,pItemID);
        ELSE
		update te.teprjtask set teprjtask_rate = pRate,teprjtask_cust_id = pCustID,teprjtask_item_id = pItemID where teprjtask_prj_id = pPrjID and teprjtask_prjtask_number = pTaskNumber;
	END IF;

RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.addteprjtask(integer, text, integer, numeric, integer) OWNER TO "admin";
