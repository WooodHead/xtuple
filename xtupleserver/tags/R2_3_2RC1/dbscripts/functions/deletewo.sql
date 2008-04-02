CREATE OR REPLACE FUNCTION deleteWo(INTEGER, BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pWoid ALIAS FOR $1;
  deleteChildren ALIAS FOR $2;
  woStatus CHAR(1);
  returnCode INTEGER;
  _wotcCnt	INTEGER;
  _routings BOOLEAN;

BEGIN
  SELECT metric_value=''t'' INTO _routings
           FROM metric
           WHERE (metric_name=''Routings'');

  IF _routings THEN
    SELECT count(*) INTO _wotcCnt
    FROM wotc
    WHERE (wotc_wo_id=pWoid);
    IF (_wotcCnt > 0) THEN
      RETURN -1;
    END IF;
  END IF;

  SELECT wo_status INTO woStatus
  FROM wo
  WHERE (wo_id=pWoid);

  IF (woStatus = ''R'') THEN
    INSERT INTO evntlog (evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
                         evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id, evntlog_number)
    SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
           ''W'', wo_id, itemsite_warehous_id, formatWoNumber(wo_id)
    FROM evntnot, evnttype, itemsite, item, wo
    WHERE ( (evntnot_evnttype_id=evnttype_id)
     AND (evntnot_warehous_id=itemsite_warehous_id)
     AND (wo_itemsite_id=itemsite_id)
     AND (itemsite_item_id=item_id)
     AND (evnttype_name=''RWoRequestCancel'')
     AND (wo_id=pWoid) );

     RETURN 0;
  ELSE
    IF (woStatus = ''E'') THEN
      returnCode := (SELECT implodeWo(pWoid, FALSE));
    END IF;
  END IF;

  IF (woStatus IN (''O'', ''E'', ''C'')) THEN
    DELETE FROM womatl
    WHERE (womatl_wo_id=pWoid);

    IF _routings THEN
      DELETE FROM wooper
      WHERE (wooper_wo_id=pWoid);
    END IF;

    DELETE FROM wo
    WHERE (wo_id=pWoid);
  END IF;

  IF (deleteChildren) THEN
    returnCode := (SELECT MAX(deleteWo(wo_id, TRUE))
                   FROM wo
                   WHERE ((wo_ordtype=''W'')
                    AND (wo_ordid=pWoid)));
  END IF;

  RETURN 0;
END;
' LANGUAGE 'plpgsql';