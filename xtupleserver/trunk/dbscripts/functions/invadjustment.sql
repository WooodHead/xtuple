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
  _distCounter NUMERIC;
  _result NUMERIC;

BEGIN

  _distCounter := 0;

--  Make sure the passed itemsite points to a real item and check distribution requirement
  SELECT (item_type NOT IN (''R'', ''F'', ''R'')) AS inventory,
         ((itemsite_controlmethod IN (''L'',''S'')) OR itemsite_loccntrl) AS distribute,
         itemsite_loccntrl, item_number, warehous_code INTO _p
         FROM itemsite, item, whsinfo
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid)
          AND (itemsite_warehous_id=warehous_id ) );
  IF (NOT FOUND) THEN
    RETURN 0;
  ELSIF (NOT _p.inventory) THEN
    RETURN 0;
  ElSIF ( (_p.distribute) AND (pItemlocSeriesList IS NULL) ) THEN
    RAISE EXCEPTION ''Item % at warehouse % is lot, serial or location controlled and requires distribution.'', _p.item_number, _p.warehous_code;
  END IF;

  SELECT postInvTrans( itemsite_id, ''AD'', pQty,
                       ''I/M'', '''', pDocumentNumber, '''',
                       (''Miscellaneous Adjustment\n'' ||  pComments),
                       costcat_asset_accnt_id, costcat_adjustment_accnt_id, 0 ) INTO _invhistid
  FROM itemsite, costcat
  WHERE ( (itemsite_costcat_id=costcat_id)
   AND (itemsite_id=pItemsiteid) );

-- Handle Location/Lot/Serial Distribution if applicable
  IF (pItemlocSeriesList[1] != -1) THEN  -- Negative one on array means force the trans w/o distribution
    IF  (_p.distribute) THEN
      IF (_p.itemsite_loccntrl) THEN -- location controled so the array is a location series to process
        FOR _i IN 1..ARRAY_UPPER(pItemlocSeriesList,1)
        LOOP
          UPDATE itemlocdist SET itemlocdist_invhist_id=_invhistid
          WHERE (itemlocdist_id=pItemlocSeriesList[_i]);
 
          UPDATE itemlocdist SET itemlocdist_invhist_id=_invhistid
          WHERE (itemlocdist_itemlocdist_id=pItemlocSeriesList[_i]);

          SELECT distributeToLocations(pItemlocSeriesList[_i]) INTO _result;

          _distCounter := _distCounter + _result;
        END LOOP;
      ELSE -- Must be lot serial w/o location, so just process the series
          UPDATE itemlocdist SET itemlocdist_invhist_id=_invhistid
          WHERE (itemlocdist_series = pItemlocSeriesList[1]);

          SELECT distributeItemlocSeries(pItemlocSeriesList[1]) INTO _result;

          _distCounter := _distCounter + _result;  
      END IF;    
    END IF;

    IF (_distCounter != pQty) THEN
      RAISE EXCEPTION ''Distribution qty not equal to transaction quantity.'';
    END IF;
  END IF;

  RETURN _invhistid;

END;
' LANGUAGE 'plpgsql';
