CREATE OR REPLACE FUNCTION summarizedBOM(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  _revid INTEGER;

BEGIN

  --See if revcontrol turned on
  IF (fetchmetricbool(''RevControl'')) THEN
    SELECT getActiveRevId(''BOM'',pItemid) INTO _revid;
  ELSE
    _revid:=-1;
  END IF;

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
  _revid INTEGER;
BEGIN

  --See if revcontrol turned on
  IF (fetchmetricbool(''RevControl'')) THEN
    SELECT getActiveRevId(''BOM'',pItemid) INTO _revid;
  ELSE
    _revid:=-1;
  END IF;

  RETURN summarizedBOM(pItemid, pExpired, pFuture, _revid);

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION summarizedBOM(INTEGER, INTEGER, INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  pExpired ALIAS FOR $2;
  pFuture ALIAS FOR $3;
  pRevisionid ALIAS FOR $4;
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
  FROM bomitem(pItemid,pRevisionid), item
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
