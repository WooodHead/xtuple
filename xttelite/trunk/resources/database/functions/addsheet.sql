-- Function: te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text, text)

-- DROP FUNCTION te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text, text);

CREATE OR REPLACE FUNCTION te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text, text)
  RETURNS integer AS
$BODY$

BEGIN
RETURN te.addsheet($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,NULL);
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text, text) OWNER TO admin;

CREATE OR REPLACE FUNCTION te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text, text, integer)
  RETURNS integer AS
$BODY$
DECLARE
_sheetid int;
_headid int;
_itemid int;
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
pSheetNotes ALIAS FOR $19;
pItemID ALIAS FOR $20;

BEGIN

  _headid := pHeadID;
  _itemid := pItemID;
--  raise exception '_headid=%, _itemid=%', _headid, _itemid;

--if new sheet, do an insert to te.timehead, else, update or insert te.timedtl
  IF (_headid IS NULL) THEN
    select nextval('te.timesheet_seq') into _sheetid;
    select nextval('te.tehead_tehead_id_seq') into _headid;

    INSERT INTO te.tehead(tehead_id,tehead_site,tehead_weekending,tehead_number,tehead_notes)
         VALUES (_headid,pSite,pWeekEnding,_sheetid,pSheetNotes);
  ELSE
    UPDATE te.tehead set tehead_lastupdated = ('now'::text)::timestamp(6) with time zone,
                         tehead_username = current_user,
                         tehead_notes = pSheetNotes
    WHERE tehead_id = _headid;
  END IF;

--update the timestamp/user on both tables

-- fetch price uom
   select item_price_uom_id into _uom from item where item_id = pItem;

  IF (_itemid IS NULL) THEN
    INSERT INTO te.teitem(teitem_tehead_id,teitem_linenumber,
                          teitem_workdate,teitem_emp_id,teitem_cust_id,
                          teitem_item_id,teitem_po, 
                          teitem_qty, teitem_rate, 
                          teitem_total, teitem_prj_id,teitem_prjtask_id,
                          teitem_type,teitem_billable,
                          teitem_prepaid,teitem_uom_id,teitem_notes)
         VALUES (_headid,pLine,
                 pWorkDate,pEmpID,pCustID,
                 pItem,pPO,
                 pHours,pRate,
                 pTotal,pPrjID,pTaskID,
                 pType,pBillable,
                 pPrepaid,_uom,pNotes);
  ELSE
    UPDATE te.teitem set teitem_workdate = pWorkDate,
                         teitem_emp_id = pEmpID,
                         teitem_cust_id = pCustID,
                         teitem_item_id = pItem,teitem_po = pPO, 
                         teitem_qty = pHours,
                         teitem_rate = pRate, 
                         teitem_total = pTotal,
                         teitem_prj_id = pPrjID,
                         teitem_prjtask_id = pTaskID,
                         teitem_type = pType,
                         teitem_billable = pBillable,
                         teitem_prepaid = pPrepaid,
                         teitem_uom_id = _uom,
                         teitem_notes = pNotes
     WHERE teitem_id = _itemid;
  END IF;

RETURN 1;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.addsheet(date, date, integer, integer, text, integer, double precision, double precision, double precision, integer, text, integer, integer, character, integer, boolean, boolean, text, text) OWNER TO admin;
