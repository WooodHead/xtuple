CREATE OR REPLACE FUNCTION massReplaceBomitem(INTEGER, INTEGER, DATE, TEXT) RETURNS INTEGER AS '
DECLARE
  pNewItemid ALIAS FOR $1;
  pOriginalItemid ALIAS FOR $2;
  pEffectiveDate ALIAS FOR $3;
  pECN ALIAS FOR $4;
  _effectiveDate DATE;
  _result		INTEGER;

BEGIN

  _effectiveDate := COALESCE(pEffectiveDate, CURRENT_DATE);

  IF (BOMContains(pOriginalItemid, pNewItemid) OR
      BOMContains(pNewItemid, pOriginalItemid)) THEN
    RETURN -1;
  END IF;

  INSERT INTO bomitem
  ( bomitem_parent_item_id, bomitem_seqnumber,
    bomitem_item_id, bomitem_qtyper,
    bomitem_configtype, bomitem_configid,
    bomitem_scrap, bomitem_effective, bomitem_expires, bomitem_ecn,
    bomitem_createwo, bomitem_issuemethod, bomitem_subtype,
    bomitem_booitem_id, bomitem_schedatwooper, bomitem_moddate )
  SELECT bomitem_parent_item_id, bomitem_seqnumber,
         pNewItemid, bomitem_qtyper,
         bomitem_configtype, bomitem_configid,
         bomitem_scrap, _effectiveDate, endOfTime(), pECN,
         bomitem_createwo, bomitem_issuemethod, ''I'',
         bomitem_booitem_id, bomitem_schedatwooper, CURRENT_DATE
  FROM bomitem
  WHERE ( (_effectiveDate BETWEEN bomitem_effective AND (bomitem_expires - 1))
   AND (bomitem_item_id=pOriginalItemid) );

  UPDATE bomitem
  SET bomitem_expires=_effectiveDate
  WHERE ( (_effectiveDate BETWEEN bomitem_effective AND (bomitem_expires - 1))
   AND (bomitem_item_id=pOriginalItemid) );

  RETURN 1;
END;
' LANGUAGE 'plpgsql';
