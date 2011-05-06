CREATE OR REPLACE FUNCTION correctProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN) RETURNS INTEGER AS $$
BEGIN
  RAISE NOTICE 'correctProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN) has been deprecated. Use corrrectProduction(INTEGER, NUMERIC, BOOLEAN, INTEGER) or a package-specific version instead.';
  RETURN  correctProduction($1, $2, $3, 0);
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION correctProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN, INTEGER) RETURNS INTEGER AS $$
BEGIN
  RAISE NOTICE 'correctProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN, INTEGER) has been deprecated. Use corrrectProduction(INTEGER, NUMERIC, BOOLEAN, INTEGER) or a package-specific version instead.';
  RETURN correctProduction($1, $2, $3, $5);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION correctProduction(INTEGER, NUMERIC, BOOLEAN, INTEGER) RETURNS INTEGER AS $$
DECLARE
  pWoid          ALIAS FOR $1;
  pQty           ALIAS FOR $2;
  pBackflush     ALIAS FOR $3;
  pItemlocSeries ALIAS FOR $4;
  _invhistid        INTEGER;
  _itemlocSeries    INTEGER;
  _r                RECORD;
  _parentWIPAccntid INTEGER;
  _parentQty        NUMERIC;
  _qty              NUMERIC;
  _invqty           NUMERIC;
  _sense            TEXT;
  _status           TEXT;
  _type             TEXT;

BEGIN

  IF (pQty = 0) THEN
    RETURN pItemlocseries;
  ELSIF (pQty > 0) THEN
    _sense := 'from';
  ELSE
    _sense := 'to';
  END IF;

  SELECT item_type, roundQty(item_fractional, pQty), wo_status
    INTO _type, _parentQty, _status
    FROM wo, itemsite, item
   WHERE ((wo_itemsite_id=itemsite_id)
      AND (itemsite_item_id=item_id)
      AND (wo_id=pWoid));
  
  IF (_status != 'I') THEN
    RETURN -1;
  END IF;

  IF (_type = 'J') THEN
    RETURN -2;
  END IF;

  IF (pItemlocSeries = 0) THEN
    SELECT NEXTVAL('itemloc_series_seq') INTO _itemlocSeries;
  ELSE
    _itemlocSeries := pItemlocSeries;
  END IF;

  --  Cache the parent WIP account (No SELECT ... INTO x, ... INTO x;!)
  SELECT costcat_wip_accnt_id INTO _parentWIPAccntid
  FROM wo, itemsite, costcat
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (wo_id=pWoid) );
 
  IF (pBackflush) THEN
    FOR _r IN SELECT item_id, item_fractional,
                      itemsite_id, itemsite_warehous_id,
                      itemsite_controlmethod, itemsite_loccntrl,
                      itemsite_costmethod,
                      womatl_id, womatl_qtyper, womatl_scrap,
                      womatl_issuemethod, womatl_uom_id
               FROM womatl, wo, itemsite, item
               WHERE ( (womatl_wo_id=wo_id)
                AND (womatl_itemsite_id=itemsite_id)
                AND (itemsite_item_id=item_id)
                AND (womatl_issuemethod = 'L')
                AND (wo_id=pWoid) ) FOR UPDATE LOOP

      --  Cache the qty to be issued
      _qty = roundQty(_r.item_fractional, (_parentQty * _r.womatl_qtyper * (1 + _r.womatl_scrap)));
      _invqty = itemuomtouom(_r.item_id, _r.womatl_uom_id, NULL, (_parentQty * _r.womatl_qtyper * (1 + _r.womatl_scrap)));

      IF (_itemlocSeries = 0) THEN
        SELECT NEXTVAL('itemloc_series_seq') INTO _itemlocSeries;
      END IF;

      SELECT postInvTrans( itemsite_id, 'IM', (_invqty * -1),
                           'W/O', 'WO', formatwonumber(pWoid), '',
                           ('Correct Receive Inventory ' || item_number || ' ' || _sense || ' Manufacturing'),
                           _parentWIPAccntid, costcat_asset_accnt_id, _itemlocSeries ) INTO _invhistid
      FROM itemsite, item, costcat
      WHERE ( (itemsite_item_id=item_id)
       AND (itemsite_costcat_id=costcat_id)
       AND (itemsite_id=_r.itemsite_id) );

      --  Decrease the parent W/O's WIP value by the value of the returned components
      UPDATE wo
      SET wo_wipvalue = (wo_wipvalue -
                         (CASE WHEN(_r.itemsite_costmethod='A')
                                      THEN avgcost(_r.itemsite_id)
                                      ELSE stdcost(_r.item_id) END * _invqty)),
          wo_postedvalue = (wo_postedvalue -
                            (CASE WHEN(_r.itemsite_costmethod='A')
                                      THEN avgcost(_r.itemsite_id)
                                      ELSE stdcost(_r.item_id) END * _invqty))
      WHERE (wo_id=pWoid);

      UPDATE womatl
      SET womatl_qtyiss = (womatl_qtyiss - _qty),
          womatl_lastreturn = CURRENT_DATE
      WHERE (womatl_id=_r.womatl_id);

    END LOOP;

  END IF;

  --  Post the inventory transaction
  SELECT postInvTrans( itemsite_id, 'RM', (_parentQty * -1),
                       'W/O', 'WO', formatwonumber(pWoid), '',
                       ('Correct Receive Inventory ' || item_number || ' ' || _sense || ' Manufacturing'),
                       costcat_asset_accnt_id, costcat_wip_accnt_id, _itemlocSeries, CURRENT_DATE,
                       CASE WHEN (wo_qtyrcv > 0) THEN
                       ((wo_postedvalue - wo_wipvalue) / wo_qtyrcv) * _parentQty -- only used when cost is average
                            ELSE 0 END
                       ) INTO _invhistid
  FROM wo, itemsite, item, costcat
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (wo_id=pWoid) );

  --  Decrease this W/O's qty. received and increase its WIP value
  UPDATE wo
  SET wo_qtyrcv = (wo_qtyrcv - _parentQty),
      wo_wipvalue = (wo_wipvalue + (CASE WHEN(itemsite_costmethod='A') THEN ((wo_postedvalue - wo_wipvalue) / wo_qtyrcv) ELSE stdcost(itemsite_item_id) END * _parentQty))
  FROM itemsite, item
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (wo_id=pWoid) );

  RETURN _itemlocSeries;

END;
$$ LANGUAGE 'plpgsql';
