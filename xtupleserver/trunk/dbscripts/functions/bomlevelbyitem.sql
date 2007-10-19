CREATE OR REPLACE FUNCTION bomLevelByItem(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  _bomRevid INTEGER;

BEGIN

  IF fetchmetricbool(''RevControl'') THEN
    SELECT getActiveRev(''BOM'',pItemid) INTO _bomrevid;
  ELSE
    _bomrevid:=-1;
  END IF;

  RETURN bomLevelByItem(pItemid,_bomRevid);

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION bomLevelByItem(INTEGER,INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  pBomrevid ALIAS FOR $2;
  _cnt INTEGER;
  _result INTEGER;
  _bomitem RECORD;

BEGIN
  _cnt := 0;

  FOR _bomitem IN SELECT bomitem_parent_item_id
                    FROM bomitem(pItemid,pBomrevid)
                   WHERE (bomitem_item_id=pItemid) LOOP
    SELECT bomLevelByItem(_bomitem.bomitem_parent_item_id) + 1 INTO _result;
    IF (_result > _cnt) THEN
      _cnt := _result;
    END IF;
  END LOOP;

  return _cnt;
END;
' LANGUAGE 'plpgsql';
