CREATE OR REPLACE FUNCTION summarizedBOM(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  _revid INTEGER;

BEGIN

  SELECT getActiveRevId(''BOM'',pItemid) INTO _revid;
  
  RETURN summarizedBOM(pItemid, _revid);

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION summarizedBOM(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  pRevisionid ALIAS FOR $2;
  _bomworkid INTEGER;
  _indexid INTEGER;
  _r RECORD;

BEGIN

--  Check on the temporary workspace
--  PERFORM maintainBOMWorkspace();

--  Grab a new index for this bomwork set
  SELECT NEXTVAL(''misc_index_seq'') INTO _indexid;

--  Step through all of the components of the passed pItemid
  FOR _r IN SELECT bomitem_seqnumber,
                   item_id, item_type, bomitem_createwo,
                   itemuomtouom(bomitem_item_id, bomitem_uom_id, NULL, bomitem_qtyper) AS qtyper, bomitem_scrap, bomitem_issuemethod,
                   bomitem_effective, bomitem_expires,
                   stdcost(item_id) AS standardcost, actcost(item_id) AS actualcost
  FROM bomitem(pItemid, pRevisionid), item
  WHERE (bomitem_item_id=item_id) LOOP

  IF (_r.item_type IN (''M'', ''F'')) THEN
--  Explode the components of the current component
--      RAISE NOTICE ''Summarized BOM at Mfg/Phantom %'', _r.item_id;
      PERFORM explodeSummarizedBOM( _r.item_id, -1, 1, _indexid, _r.bomitem_seqnumber,
                                    _r.qtyper, _r.bomitem_effective, _r.bomitem_expires );
  ELSE
--  Insert the component and bomitem parameters
--    RAISE NOTICE ''Summarized Explosion at Insert Item %'', _r.item_id;
    SELECT NEXTVAL(''bomwork_bomwork_id_seq'') INTO _bomworkid;
    INSERT INTO bomwork
    ( bomwork_id, bomwork_set_id, bomwork_parent_id, bomwork_level,
      bomwork_parent_seqnumber, bomwork_seqnumber,
      bomwork_item_id, bomwork_createwo,
      bomwork_qtyper, bomwork_scrap, bomwork_issuemethod,
      bomwork_effective, bomwork_expires,
      bomwork_stdunitcost, bomwork_actunitcost )
    VALUES
    ( _bomworkid, _indexid, -1, 1,
      0, _r.bomitem_seqnumber,
      _r.item_id, _r.bomitem_createwo,
      _r.qtyper, _r.bomitem_scrap, _r.bomitem_issuemethod,
      _r.bomitem_effective, _r.bomitem_expires,
      _r.standardcost, _r.actualcost );
    END IF;

  END LOOP;

--  Return a key to the result
  RETURN _indexid;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION summarizedBOM(INTEGER, INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  pExpired ALIAS FOR $2;
  pFuture ALIAS FOR $3;
  _bomworkid INTEGER;
  _indexid INTEGER;
  _r RECORD;
BEGIN

--  Check on the temporary workspace
--  PERFORM maintainBOMWorkspace();

--  Grab a new index for this bomwork set
  SELECT NEXTVAL(''misc_index_seq'') INTO _indexid;

--  Step through all of the components of the passed pItemid
  FOR _r IN SELECT bomitem_seqnumber,
                   item_id, item_type, bomitem_createwo,
                   itemuomtouom(bomitem_item_id, bomitem_uom_id, NULL, bomitem_qtyper) AS qtyper, bomitem_scrap, bomitem_issuemethod,
                   bomitem_effective, bomitem_expires,
                   stdcost(item_id) AS standardcost, actcost(item_id) AS actualcost
  FROM bomitem(pItemid), item
  WHERE ( (bomitem_item_id=item_id)
   AND (bomitem_expires > (CURRENT_DATE - pExpired) )
   AND (bomitem_effective <= (CURRENT_DATE + pFuture) ) ) LOOP

  IF (_r.item_type IN (''M'', ''F'')) THEN
--  Explode the components of the current component
--      RAISE NOTICE ''Summarized BOM at Mfg/Phantom %'', _r.item_id;
      PERFORM explodeSummarizedBOM( _r.item_id, -1, 1, _indexid, _r.bomitem_seqnumber,
                                    _r.qtyper, _r.bomitem_effective, _r.bomitem_expires );
  ELSE
--  Insert the component and bomitem parameters
--    RAISE NOTICE ''Summarized Explosion at Insert Item %'', _r.item_id;
    SELECT NEXTVAL(''bomwork_bomwork_id_seq'') INTO _bomworkid;
    INSERT INTO bomwork
    ( bomwork_id, bomwork_set_id, bomwork_parent_id, bomwork_level,
      bomwork_parent_seqnumber, bomwork_seqnumber,
      bomwork_item_id, bomwork_createwo,
      bomwork_qtyper, bomwork_scrap, bomwork_issuemethod,
      bomwork_effective, bomwork_expires,
      bomwork_stdunitcost, bomwork_actunitcost )
    VALUES
    ( _bomworkid, _indexid, -1, 1,
      0, _r.bomitem_seqnumber,
      _r.item_id, _r.bomitem_createwo,
      _r.qtyper, _r.bomitem_scrap, _r.bomitem_issuemethod,
      _r.bomitem_effective, _r.bomitem_expires,
      _r.standardcost, _r.actualcost );
    END IF;

  END LOOP;

--  Return a key to the result
  RETURN _indexid;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION summarizedBOM(INTEGER, INTEGER, INTEGER, INTEGER) RETURNS SETOF bomdata AS '
DECLARE
  pItemid ALIAS FOR $1;
  pRevisionid ALIAS FOR $2;
  pExpiredDays ALIAS FOR $3;
  pFutureDays ALIAS FOR $4;
  _row bomdata%ROWTYPE;
  _bomworksetid INTEGER;
  _x RECORD;
  _check CHAR(1);

BEGIN

  --Is this a deactivated revision?
  SELECT rev_status INTO _check
  FROM rev
  WHERE ((rev_id=pRevisionid)
  AND (rev_status=''I''));
  
  IF (NOT FOUND) THEN

    --We can explode this out based on current data
    SELECT indentedBOM(pItemid, pRevisionid) INTO _bomworksetid;  

    FOR _x IN
       SELECT item_number, uom_name,
               item_descrip1, item_descrip2,
               (item_descrip1 || '' '' || item_descrip2) AS itemdescription,
               formatQtyPer(SUM(bomwork_qtyper * (1 + bomwork_scrap))) AS f_qtyper,
       CASE WHEN (bomwork_expires <= CURRENT_DATE) THEN TRUE
         ELSE FALSE
       END AS expired,
       CASE WHEN (bomwork_effective > CURRENT_DATE) THEN TRUE
         ELSE FALSE
       END AS future 
       FROM bomwork, item, uom 
       WHERE ( (bomwork_item_id=item_id)
       AND (item_inv_uom_id=uom_id)
       AND (bomwork_set_id=_bomworksetid) )
       AND (bomwork_expires > (CURRENT_DATE - pExpiredDays))
       AND (bomwork_effective <= (CURRENT_DATE + pFutureDays))
       GROUP BY item_number, uom_name,
                item_descrip1, item_descrip2,
	        bomwork_expires, bomwork_effective
       ORDER BY item_number
    LOOP
        _row.bomdata_item_number := _x.item_number;
        _row.bomdata_uom_name := _x.uom_name;
        _row.bomdata_item_descrip1 := _x.item_descrip1;
        _row.bomdata_item_descrip2 := _x.item_descrip2;
        _row.bomdata_itemdescription := _x.itemdescription;
        _row.bomdata_qtyper := _x.f_qtyper;
        _row.bomdata_expired := _x.expired;
        _row.bomdata_future := _x.future;
        RETURN NEXT _row;
    END LOOP;
    
    PERFORM deleteBOMWorkset(_bomworksetid);

  ELSE
   
-- Use historical snapshot for inactive revisions
    FOR _x IN
       SELECT item_number, uom_name,
               item_descrip1, item_descrip2,
               (item_descrip1 || '' '' || item_descrip2) AS itemdescription,
               formatQtyPer(SUM(bomhist_qtyper * (1 + bomhist_scrap))) AS f_qtyper,
       CASE WHEN (bomhist_expires <= CURRENT_DATE) THEN TRUE
         ELSE FALSE
       END AS expired,
       CASE WHEN (bomhist_effective > CURRENT_DATE) THEN TRUE
         ELSE FALSE
       END AS future 
       FROM bomhist, item, uom 
       WHERE ( (bomhist_item_id=item_id)
       AND (item_inv_uom_id=uom_id)
       AND (bomhist_rev_id=pRevisionid) )
       AND (bomhist_expires > (CURRENT_DATE - pExpiredDays))
       AND (bomhist_effective <= (CURRENT_DATE + pFutureDays))
       GROUP BY item_number, uom_name,
                item_descrip1, item_descrip2,
	        bomhist_expires, bomhist_effective
       ORDER BY item_number
    LOOP
        _row.bomdata_item_number := _x.item_number;
        _row.bomdata_uom_name := _x.uom_name;
        _row.bomdata_item_descrip1 := _x.item_descrip1;
        _row.bomdata_item_descrip2 := _x.item_descrip2;
        _row.bomdata_itemdescription := _x.itemdescription;
        _row.bomdata_qtyper := _x.f_qtyper;
        _row.bomdata_expired := _x.expired;
        _row.bomdata_future := _x.future;
        RETURN NEXT _row;
    END LOOP;

  END IF;

  RETURN;

END;
' LANGUAGE 'plpgsql';
