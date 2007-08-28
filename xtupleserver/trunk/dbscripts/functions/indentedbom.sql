CREATE OR REPLACE FUNCTION indentedBOM(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
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
                   item_id, bomitem_createwo,
                   bomitem_qtyper, bomitem_scrap, bomitem_issuemethod,
                   bomitem_effective, bomitem_expires,
                   stdcost(item_id) AS standardcost, actcost(item_id) AS actualcost
  FROM bomitem, item
  WHERE ( (bomitem_item_id=item_id)
   AND (bomitem_parent_item_id=pItemid) ) LOOP

--  Insert the component and bomitem parameters
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
      _r.bomitem_qtyper, _r.bomitem_scrap, _r.bomitem_issuemethod,
      _r.bomitem_effective, _r.bomitem_expires,
      _r.standardcost, _r.actualcost );

--  Explode the components of the current component
    PERFORM explodeBOM(_r.item_id, _bomworkid, 1);

  END LOOP;

--  Return a key to the result
  RETURN _indexid;

END;
' LANGUAGE 'plpgsql';
