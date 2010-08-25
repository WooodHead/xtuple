
-- Function: te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text)

-- DROP FUNCTION te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text);

CREATE OR REPLACE FUNCTION te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text)
  RETURNS integer AS
$BODY$
DECLARE
_sheetid int;
_headid int;
_linenumber int;
_uom int;
pWeekEnding ALIAS FOR $1;
pWorkDate ALIAS FOR $2;
pItem ALIAS FOR $3;
pEmpID ALIAS FOR $4;
pPO ALIAS FOR $5;
pCustID ALIAS FOR $6;
pHours ALIAS FOR $7;
pRate ALIAS FOR $8;
pTotal ALIAS FOR $9;
pHeadID ALIAS FOR $10;
pSite ALIAS FOR $11;
pPrjID ALIAS FOR $12;
pTaskID ALIAS FOR $13;
pType ALIAS FOR $14;
pLine ALIAS FOR $15;
pBillable ALIAS FOR $16;
pPrepaid ALIAS FOR $17;
pNotes ALIAS FOR $18;

BEGIN

_headid := pHeadID;

--if new sheet, do an insert to te.timehead, else, update or insert te.timedtl
	IF (pHeadID IS NULL) THEN
		-- if $10 null, then add new header...and get a sheet id
		select nextval('te.timesheet_seq') into _sheetid;
		select nextval('te.tehead_tehead_id_seq') into _headid;

		insert into  te.tehead(tehead_id,tehead_site,tehead_weekending,tehead_number,tehead_notes) VALUES (_headid,pSite,pWeekEnding,_sheetid);
	ELSE
		update te.tehead set tehead_lastupdated = ('now'::text)::timestamp(6) with time zone,tehead_username = current_user where tehead_id = pHeadID;
	END IF;

	--update the timestamp/user on both tables

        -- fetch price uom
        select item_price_uom_id into _uom from item where item_id = pItem;

	IF (pLine IS NULL) THEN
		insert into  te.teitem(teitem_tehead_id,teitem_linenumber,
		teitem_workdate,teitem_emp_id,teitem_cust_id,
		teitem_item_id,teitem_po, 
		teitem_qty, teitem_rate, 
		teitem_total, teitem_prj_id,teitem_prjtask_id,teitem_type,teitem_billable,teitem_prepaid,teitem_uom_id,teitem_notes)
		VALUES (_headid,(SELECT COALESCE(max(teitem_linenumber), 0) + 1
                 FROM te.teitem
                 WHERE teitem_tehead_id = pHeadID),pWorkDate,pEmpID,pCustID,pItem,pPO,pHours,pRate,pTotal,pPrjID,pTaskID,pType,pBillable,pPrepaid,_uom,pNotes);
	ELSE
		UPDATE  te.teitem set teitem_workdate = pWorkDate,teitem_emp_id = pEmpID,teitem_cust_id = pCustID,
		teitem_item_id = pItem,teitem_po = pPO, 
		teitem_qty = pHours, teitem_rate = pRate, 
		teitem_total = pTotal, teitem_prj_id = pPrjID,teitem_prjtask_id = pTaskID,teitem_type = pType,
		teitem_billable = pBillable,teitem_prepaid = pPrepaid, teitem_uom_id = _uom,teitem_notes = pNotes
                 WHERE teitem_tehead_id = pHeadID and teitem_linenumber = pLine;
	END IF;

RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text) OWNER TO admin;