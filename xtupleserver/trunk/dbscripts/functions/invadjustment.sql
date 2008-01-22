CREATE OR REPLACE FUNCTION invAdjustment(INTEGER, NUMERIC, TEXT, TEXT) RETURNS INTEGER AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pDocumentNumber ALIAS FOR $3;
  pComments ALIAS FOR $4;
  _invhistid INTEGER;

BEGIN

  SELECT invAdjustment(pItemsiteId, pQty, NULL, pDocumentNumber, pComments) INTO _invhistid;

  RETURN _invhistid;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION invAdjustment(INTEGER, NUMERIC, INTEGER[], TEXT, TEXT) RETURNS INTEGER AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pItemlocSeriesList ALIAS FOR $3;
  pDocumentNumber ALIAS FOR $4;
  pComments ALIAS FOR $5;
  _p RECORD;
  _invhistid INTEGER;

BEGIN

--  Make sure the passed itemsite points to a real item and check distribution requirement
  IF (SELECT (item_type IN (''R'', ''F'', ''R''))
         FROM itemsite, item, whsinfo
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid)
          AND (itemsite_warehous_id=warehous_id ) ) ) THEN
    RETURN 0;
  END IF;

  SELECT postInvTrans( itemsite_id, ''AD'', pQty,
                       ''I/M'', '''', pDocumentNumber, '''',
                       (''Miscellaneous Adjustment\n'' ||  pComments),
                       costcat_asset_accnt_id, costcat_adjustment_accnt_id, pItemlocSeriesList ) INTO _invhistid
  FROM itemsite, costcat
  WHERE ( (itemsite_costcat_id=costcat_id)
   AND (itemsite_id=pItemsiteid) );

  RETURN _invhistid;

END;
' LANGUAGE 'plpgsql';
