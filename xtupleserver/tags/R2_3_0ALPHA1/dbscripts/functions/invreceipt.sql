CREATE OR REPLACE FUNCTION invReceipt(INTEGER, NUMERIC, TEXT, TEXT, TEXT) RETURNS INTEGER AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pOrdernumber ALIAS FOR $3;
  pDocumentNumber ALIAS FOR $4;
  pComments ALIAS FOR $5;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;

BEGIN

--  Make sure the passed itemsite points to a real item
  IF ( ( SELECT (item_type IN (''R'', ''F''))
         FROM itemsite, item
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid) ) ) ) THEN
    RETURN 0;
  END IF;

  SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
  SELECT postInvTrans( itemsite_id, ''RX'', pQty,
                       ''I/M'', '''', pDocumentNumber, '''',
                       (''Miscellaneous Receipt\n'' ||  pComments),
                       costcat_asset_accnt_id, costcat_liability_accnt_id, _itemlocSeries ) INTO _invhistid
  FROM itemsite, costcat
  WHERE ( (itemsite_costcat_id=costcat_id)
   AND (itemsite_id=pItemsiteid) );

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
