
CREATE OR REPLACE FUNCTION getInvcitemLotSerial(INTEGER) RETURNS TEXT AS '
DECLARE
  pInvcitemid ALIAS FOR $1;
  _lotserial text;
  _r RECORD;
  _first BOOLEAN;
  _newMethod BOOLEAN;
BEGIN
 
  --Test to see if Lot/Serial Enabled
  SELECT metric_value INTO _lotserial
  FROM metric
  WHERE ((metric_name=''LotSerialControl'')
  AND (metric_value =''t''));

  IF (FOUND) THEN
    _lotserial := '''';
    _first := true;

--  Two ways of doing this: old method and new method
--  First, find out if new method employed.
--  (new method is more accurate, but unfortunately no
--  way to migrate or correct old data.  Have to keep
--  old method in case someone reprints an old invoice.)

    SELECT (COUNT(*) > 0) INTO _newMethod 
    FROM shipitem 
    WHERE ((shipitem_invcitem_id=pInvcitemid)
    AND (shipitem_invhist_id IS NOT NULL));

    IF (_newMethod) THEN
      FOR _r IN SELECT DISTINCT invdetail_lotserial
                FROM invdetail, invhist, shipitem
               WHERE ((shipitem_invcitem_id=pInvcitemid)
                 AND  (shipitem_invhist_id=invhist_id)
                 AND  (invhist_id=invdetail_invhist_id)
                 AND  (invdetail_invcitem_id=pInvcitemid)) LOOP
        IF ((_r.invdetail_lotserial IS NOT NULL) AND (_r.invdetail_lotserial != '''')) THEN
          IF (_first = false) THEN
            _lotserial := _lotserial || '', '';
          END IF;
          _lotserial := _lotserial || _r.invdetail_lotserial;
          _first := false;
        END IF;
      END LOOP;

      RETURN _lotserial;
    ELSE
      -- Handle it old way
      FOR _r IN SELECT DISTINCT invdetail_lotserial
                FROM invdetail JOIN invhist ON (invdetail_invhist_id=invhist_id)
               WHERE ((invhist_transtype=''SH'')
                 AND  (invdetail_invcitem_id=pInvcitemid)) LOOP
        IF ((_r.invdetail_lotserial IS NOT NULL) AND (_r.invdetail_lotserial != '''')) THEN
          IF (_first = false) THEN
            _lotserial := _lotserial || '', '';
          END IF;
          _lotserial := _lotserial || _r.invdetail_lotserial;
          _first := false;
        END IF;
      END LOOP;

      RETURN _lotserial;
    END IF;
  ELSE
    RETURN '''';
  END IF;
  
END
' LANGUAGE 'plpgsql';