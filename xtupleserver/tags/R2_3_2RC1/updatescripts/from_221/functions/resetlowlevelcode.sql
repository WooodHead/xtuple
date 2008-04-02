CREATE OR REPLACE FUNCTION resetLowLevelCode(INTEGER) RETURNS INTEGER AS '
DECLARE

    pItemId ALIAS FOR $1;
    _result	INTEGER;
    _counterNum	INTEGER	:= 1;
    _feedBackNum INTEGER := 1;

BEGIN
    DELETE FROM costUpdate;

    IF pItemId = -1 THEN 	-- -1 is an invalid item_id => do them all
	INSERT INTO costUpdate ( costUpdate_item_id, costUpdate_item_type )
			SELECT item_id, item_type
			FROM   item;
    ELSE
	INSERT INTO costUpdate ( costUpdate_item_id, costUpdate_item_type )
			SELECT item_id, item_type
			FROM   item
			WHERE  item_id = pItemId;
	GET DIAGNOSTICS _result = ROW_COUNT;
	WHILE _result != 0 LOOP
	    INSERT INTO costUpdate ( costUpdate_item_id, costUpdate_item_type )
		 SELECT DISTINCT item_id, item_type
		 FROM item,
		      bomitem(pItemId) JOIN
		      costUpdate ON (bomitem_parent_item_id = costUpdate_item_id)
		 WHERE item_id NOT IN (SELECT costUpdate_item_id
				       FROM costUpdate)
		   AND ( CURRENT_DATE BETWEEN bomitem_effective
                                               AND (bomitem_expires - 1) );
	    GET DIAGNOSTICS _result = ROW_COUNT;
	END LOOP;
    END IF;

    -- Recalculate the Item Lowlevel codes
    WHILE _feedBackNum > 0 LOOP
	SELECT updateLowlevel(_counterNum) INTO _feedBackNum;
	_counterNum := _counterNum + 1;
    END LOOP;

    SELECT count(*) INTO _result
    FROM costUpdate;

    RETURN _result;

END;
' LANGUAGE 'plpgsql';

