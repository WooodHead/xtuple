CREATE OR REPLACE FUNCTION checkQuoteSitePrivs(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pQuheadid ALIAS FOR $1;
  _check    BOOLEAN;
  _result   INTEGER;

BEGIN

  IF (NOT fetchMetricBool(''MultiWhs'')) THEN
    RETURN true;
  END IF;

  IF (NOT fetchUsrPrefBool(''selectedSites'')) THEN
    RETURN true;
  END IF;

  SELECT COALESCE(COUNT(*), 0) INTO _result
    FROM ( SELECT quitem_id
             FROM quitem, itemsite
            WHERE ( (quitem_quhead_id=pQuheadid)
              AND   (quitem_itemsite_id=itemsite_id)
              AND   (itemsite_warehous_id NOT IN (SELECT usrsite_warehous_id
                                                    FROM usrsite
                                                   WHERE (usrsite_username=current_user))) )
           UNION
           SELECT quhead_warehous_id
             FROM quhead
            WHERE ( (quhead_id=pQuheadid)
              AND   (quhead_warehous_id NOT IN (SELECT usrsite_warehous_id
                                                  FROM usrsite
                                                 WHERE (usrsite_username=current_user))) )
         ) AS data;
  IF (_result > 0) THEN
    RETURN false;
  END IF;

  RETURN true;
END;
' LANGUAGE 'plpgsql';