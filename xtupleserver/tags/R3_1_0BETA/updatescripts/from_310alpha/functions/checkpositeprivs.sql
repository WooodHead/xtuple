CREATE OR REPLACE FUNCTION checkPOSitePrivs(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pPoheadid ALIAS FOR $1;
  _check    BOOLEAN;
  _result   INTEGER;

BEGIN

  SELECT COALESCE(usrpref_value::BOOLEAN, false) INTO _check
    FROM usrpref
   WHERE ( (usrpref_username=current_user)
     AND   (usrpref_name=''selectedSites'') );
  IF (NOT _check) THEN
    RETURN true;
  END IF;

  SELECT COALESCE(COUNT(*), 0) INTO _result
    FROM ( SELECT poitem_id
             FROM poitem, itemsite
            WHERE ( (poitem_pohead_id=pPoheadid)
              AND   (poitem_itemsite_id=itemsite_id)
              AND   (itemsite_warehous_id NOT IN (SELECT usrsite_warehous_id
                                                    FROM usrsite
                                                   WHERE (usrsite_username=current_user))) )
           UNION
           SELECT pohead_warehous_id
             FROM pohead
            WHERE ( (pohead_id=pPoheadid)
              AND   (pohead_warehous_id NOT IN (SELECT usrsite_warehous_id
                                                  FROM usrsite
                                                 WHERE (usrsite_username=current_user))) )
         ) AS data;
  IF (_result > 0) THEN
    RETURN false;
  END IF;

  RETURN true;
END;
' LANGUAGE 'plpgsql';