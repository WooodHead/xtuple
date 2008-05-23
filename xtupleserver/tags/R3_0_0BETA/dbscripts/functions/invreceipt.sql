CREATE OR REPLACE FUNCTION invReceipt(INTEGER, NUMERIC, TEXT, TEXT, TEXT) RETURNS INTEGER AS '
BEGIN
  RETURN invReceipt($1, $2, $3, $4, $5, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION invReceipt(INTEGER, NUMERIC, TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pOrdernumber ALIAS FOR $3;
  pDocumentNumber ALIAS FOR $4;
  pComments ALIAS FOR $5;
  pGlDistTS     ALIAS FOR $6;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;

BEGIN

--  Make sure the passed itemsite points to a real item
  IF ( ( SELECT (item_type IN (''R'', ''F'', ''J''))
         FROM itemsite, item
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid) ) ) ) THEN
    RETURN 0;
  END IF;

  SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
  SELECT postInvTrans( itemsite_id, ''RX'', pQty,
                       ''I/M'', '''', pDocumentNumber, '''',
                       (E''Miscellaneous Receipt\n'' ||  pComments),
                       costcat_asset_accnt_id, costcat_liability_accnt_id,
                       _itemlocSeries, pGlDistTS) INTO _invhistid
  FROM itemsite, costcat
  WHERE ( (itemsite_costcat_id=costcat_id)
   AND (itemsite_id=pItemsiteid) );

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
