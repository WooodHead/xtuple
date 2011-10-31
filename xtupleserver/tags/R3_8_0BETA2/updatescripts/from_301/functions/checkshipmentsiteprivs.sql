CREATE OR REPLACE FUNCTION checkShipmentSitePrivs(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pShipheadid ALIAS FOR $1;
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
    FROM ( SELECT coitem_id
             FROM shipitem, coitem, itemsite
            WHERE ( (shipitem_shiphead_id=pShipheadid)
              AND   (coitem_id=shipitem_orderitem_id)
              AND   (coitem_itemsite_id=itemsite_id)
              AND   (itemsite_warehous_id NOT IN (SELECT usrsite_warehous_id
                                                    FROM usrsite
                                                   WHERE (usrsite_username=current_user))) )
           UNION
           SELECT cohead_warehous_id
             FROM shipitem, coitem, cohead
            WHERE ( (shipitem_shiphead_id=pShipheadid)
              AND   (coitem_id=shipitem_orderitem_id)
              AND   (cohead_id=coitem_cohead_id)
              AND   (cohead_warehous_id NOT IN (SELECT usrsite_warehous_id
                                                  FROM usrsite
                                                 WHERE (usrsite_username=current_user))) )
         ) AS data;
  IF (_result > 0) THEN
    RETURN false;
  END IF;

  RETURN true;
END;
' LANGUAGE 'plpgsql';