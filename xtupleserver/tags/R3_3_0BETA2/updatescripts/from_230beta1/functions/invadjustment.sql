CREATE OR REPLACE FUNCTION invAdjustment(INTEGER, NUMERIC, TEXT, TEXT) RETURNS INTEGER AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pDocumentNumber ALIAS FOR $3;
  pComments ALIAS FOR $4;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;

BEGIN

--  Make sure the passed itemsite points to a real item
  IF ( ( SELECT (item_type IN (''R'', ''F'', ''R''))
         FROM itemsite, item
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid) ) ) ) THEN
    RETURN 0;
  END IF;

  SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
  SELECT postInvTrans( itemsite_id, ''AD'', pQty,
                       ''I/M'', '''', pDocumentNumber, '''',
                       (''Miscellaneous Adjustment\n'' ||  pComments),
                       costcat_asset_accnt_id, costcat_adjustment_accnt_id, _itemlocSeries ) INTO _invhistid
  FROM itemsite, costcat
  WHERE ( (itemsite_costcat_id=costcat_id)
   AND (itemsite_id=pItemsiteid) );

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
