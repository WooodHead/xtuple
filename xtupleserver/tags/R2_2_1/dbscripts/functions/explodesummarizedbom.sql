CREATE OR REPLACE FUNCTION explodeSummarizedBOM( INTEGER, INTEGER, INTEGER, INTEGER,
                                                 INTEGER, NUMERIC, DATE, DATE ) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  pParentid ALIAS FOR $2;
  pLevel ALIAS FOR $3;
  pSetid ALIAS FOR $4;
  pSeqNumber ALIAS FOR $5;
  pQtyPer ALIAS FOR $6;
  pEffective ALIAS FOR $7;
  pExpires ALIAS FOR $8;
  _bomworkid INTEGER;
  _level INTEGER;
  _p RECORD;
  _r RECORD;
  _temp TEXT;

BEGIN

  _level := (pLevel + 1);

--  Step through all of the components of the parent component
  FOR _r IN SELECT bomitem_seqnumber,
                   item_id, item_type, bomitem_createwo,
                   bomitem_qtyper, bomitem_scrap, bomitem_issuemethod,
                   CASE WHEN (pEffective > bomitem_effective) THEN pEffective
                        ELSE bomitem_effective
                   END AS effective,
                   CASE WHEN (pExpires < bomitem_expires) THEN pExpires
                        ELSE bomitem_expires
                   END AS expires,
                   stdcost(item_id) AS standardcost, actcost(item_id) AS actualcost
  FROM bomitem, item
  WHERE ( (bomitem_item_id=item_id)
   AND (bomitem_parent_item_id=pItemid) ) LOOP

    IF (_r.item_type IN (''M'', ''F'')) THEN
      PERFORM explodeSummarizedBOM( _r.item_id, pParentid, _level, pSetid, pSeqnumber,
                                    pQtyPer, pEffective, pExpires );
--      RAISE NOTICE ''Summarized Explosion at Mfg/Phantom %'', _r.item_id;
    ELSE
--  Insert the current component and some bomitem parameters into the bomwork set
--      RAISE NOTICE ''Summarized Explosion at Insert Item %'', _r.item_id;
      SELECT NEXTVAL(''bomwork_bomwork_id_seq'') INTO _bomworkid;
      INSERT INTO bomwork
      ( bomwork_id, bomwork_set_id, bomwork_parent_id, bomwork_level,
        bomwork_parent_seqnumber, bomwork_seqnumber,
        bomwork_item_id, bomwork_createwo,
        bomwork_qtyper, bomwork_scrap, bomwork_issuemethod,
        bomwork_effective, bomwork_expires,
        bomwork_stdunitcost, bomwork_actunitcost )
      VALUES
      ( _bomworkid, pSetid, pParentid, _level,
        pSeqnumber, _r.bomitem_seqnumber,
        _r.item_id, _r.bomitem_createwo,
        (pQtyPer * _r.bomitem_qtyper), _r.bomitem_scrap, _r.bomitem_issuemethod,
        _r.effective, _r.expires,
        _r.standardcost, _r.actualcost );
    END IF;

  END LOOP;

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
