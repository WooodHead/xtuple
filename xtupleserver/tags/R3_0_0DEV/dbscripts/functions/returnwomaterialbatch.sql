CREATE OR REPLACE FUNCTION returnWoMaterialBatch(INTEGER) RETURNS INTEGER AS '
DECLARE
  pWoid ALIAS FOR $1;
  _itemlocSeries INTEGER;
  _woid INTEGER;
  _r RECORD;

BEGIN

  SELECT wo_id INTO _woid
  FROM wo
  WHERE ( (wo_status=''I'')
   AND (wo_qtyrcv=0)
   AND (wo_id=pWoid) );

  IF (FOUND) THEN
    SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;

    FOR _r IN SELECT womatl_id, womatl_qtyiss
                       FROM womatl, itemsite
                       WHERE ((womatl_itemsite_id=itemsite_id)
                        AND (womatl_qtyiss > 0)
                        AND (womatl_issuemethod IN (''S''))
                        AND (womatl_wo_id=pWoid)) LOOP

      PERFORM returnWoMaterial(_r.womatl_id, _r.womatl_qtyiss, _itemlocSeries);

    END LOOP;

--  Reset the W/O Status to E
    UPDATE wo
    SET wo_status=''E''
    WHERE (wo_id=pWoid);

    RETURN _itemlocSeries;

  ELSE 
    RETURN -1;
  END IF;

END;
' LANGUAGE 'plpgsql';