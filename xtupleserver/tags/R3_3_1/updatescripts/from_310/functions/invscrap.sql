CREATE OR REPLACE FUNCTION invScrap(INTEGER, NUMERIC, TEXT, TEXT) RETURNS INTEGER AS $$
BEGIN
  RETURN invScrap($1, $2, $3, $4, CURRENT_TIMESTAMP);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION invScrap(INTEGER, NUMERIC, TEXT, TEXT, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS $$
DECLARE
  pItemsiteid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pDocumentNumber ALIAS FOR $3;
  pComments ALIAS FOR $4;
  pGlDistTS     ALIAS FOR $5;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;

BEGIN

--  Make sure the passed itemsite points to a real item
  IF ( ( SELECT (item_type IN ('R', 'F', 'J'))
         FROM itemsite, item
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid) ) ) ) THEN
    RETURN 0;
  END IF;

  SELECT NEXTVAL('itemloc_series_seq') INTO _itemlocSeries;
  SELECT postInvTrans( itemsite_id, 'SI', pQty,
                       'I/M', 'SI', pDocumentNumber, '',
                       ('Material Scrap for item ' || item_number || E'\n' ||  pComments),
                       costcat_scrap_accnt_id, costcat_asset_accnt_id,
                       _itemlocSeries, pGlDistTS) INTO _invhistid
  FROM itemsite, item, costcat
  WHERE ( (itemsite_item_id=item_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (itemsite_id=pItemsiteid) );

  RETURN _itemlocSeries;

END;
$$ LANGUAGE 'plpgsql';
