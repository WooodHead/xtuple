CREATE OR REPLACE FUNCTION bomLevelByItem(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  _cnt INTEGER;
  _result INTEGER;
  _bomitem RECORD;

BEGIN
  _cnt := 0;

  FOR _bomitem IN SELECT bomitem_parent_item_id
                    FROM bomitem
                   WHERE (bomitem_item_id=pItemid) LOOP
    SELECT bomLevelByItem(_bomitem.bomitem_parent_item_id) + 1 INTO _result;
    IF (_result > _cnt) THEN
      _cnt := _result;
    END IF;
  END LOOP;

  return _cnt;
END;
' LANGUAGE 'plpgsql';
