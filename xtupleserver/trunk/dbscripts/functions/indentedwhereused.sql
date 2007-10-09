CREATE OR REPLACE FUNCTION indentedWhereUsed(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  _indexid INTEGER;
  _level INTEGER;

BEGIN

--  Check on the temporary workspace
--  PERFORM maintainBOMWorkspace();

  _indexid := (SELECT NEXTVAL(''misc_index_seq''));
  _level := 1;

  INSERT INTO bomwork
  ( bomwork_set_id, bomwork_parent_id,
    bomwork_level, bomwork_seqnumber,
    bomwork_item_id, bomwork_item_type, bomwork_createwo,
    bomwork_qtyper, bomwork_scrap, bomwork_issuemethod,
    bomwork_effective, bomwork_expires, bomwork_status,
    bomwork_stdunitcost, bomwork_actunitcost )
  SELECT _indexid, -1,
         1, bomitem_seqnumber,
         item_id, item_type, bomitem_createwo,
         itemuomtouom(bomitem_item_id, bomitem_uom_id, NULL, bomitem_qtyper), bomitem_scrap, bomitem_issuemethod,
         bomitem_effective, bomitem_expires, ''U'',
         stdcost(item_id), actcost(item_id)
  FROM bomitem, item
  WHERE ((bomitem_item_id=pItemid)
    AND (bomitem_parent_item_id=item_id)
    AND (CURRENT_DATE BETWEEN bomitem_effective AND (bomitem_expires - 1) ));

  WHILE ( ( SELECT count(*)
            FROM bomwork
            WHERE ((bomwork_item_type IN (''M'', ''F''))
              AND (bomwork_status=''U'')
              AND (bomwork_set_id=_indexid)) ) > 0) LOOP

    _level := _level + 1;

    INSERT INTO bomwork
    ( bomwork_set_id, bomwork_parent_id,
      bomwork_level, bomwork_seqnumber,
      bomwork_item_id, bomwork_item_type, bomwork_createwo,
      bomwork_qtyper,
      bomwork_scrap, bomwork_issuemethod,
      bomwork_effective, bomwork_expires, bomwork_status,
      bomwork_stdunitcost, bomwork_actunitcost )
    SELECT _indexid, bomwork_id,
           _level, bomitem_seqnumber,
           item_id, item_type, bomitem_createwo,
           (bomwork_qtyper * itemuomtouom(bomitem_item_id, bomitem_uom_id, NULL, bomitem_qtyper)),
           bomitem_scrap, bomitem_issuemethod,
           bomitem_effective, bomitem_expires, ''N'',
           stdcost(item_id), actcost(item_id)
    FROM bomitem, item, bomwork
    WHERE ((bomitem_item_id=bomwork_item_id)
      AND (bomitem_parent_item_id=item_id)
      AND (bomwork_item_type IN (''M'', ''F''))
      AND (bomwork_status=''U'')
      AND (CURRENT_DATE BETWEEN bomitem_effective AND (bomitem_expires - 1) ));

    UPDATE bomwork
    SET bomwork_status=''C''
    WHERE ((bomwork_status=''U'')
      AND (bomwork_set_id=_indexid));

    UPDATE bomwork
    SET bomwork_status=''U''
    WHERE ((bomwork_status=''N'')
      AND (bomwork_set_id=_indexid));

  END LOOP;

  RETURN _indexid;
END;
' LANGUAGE 'plpgsql';
