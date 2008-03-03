CREATE OR REPLACE FUNCTION updateCharAssignment(TEXT, INTEGER, INTEGER, TEXT) RETURNS INTEGER AS '
DECLARE
  pTargetType ALIAS FOR $1;
  pTargetId ALIAS FOR $2;
  pCharId ALIAS FOR $3;
  pValue ALIAS FOR $4;
  _charassid INTEGER;

BEGIN

  SELECT updateCharAssignment(pTargetType, pTargetId, pCharId, pValue, 0) INTO _charassid;

  RETURN _charassid;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION updateCharAssignment(TEXT, INTEGER, INTEGER, TEXT, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pTargetType ALIAS FOR $1;
  pTargetId ALIAS FOR $2;
  pCharId ALIAS FOR $3;
  pValue ALIAS FOR $4;
  pPrice ALIAS FOR $5;
  _charassid INTEGER;
  _charassprice NUMERIC;

BEGIN

  -- Check for Valid Assignment
  IF (pTargetType=''SI'') THEN
    IF (SELECT (item_type=''J'' AND wo_status != ''O'')
        FROM coitem,itemsite,item,wo
        WHERE ((coitem_id=pTargetId)
        AND (itemsite_id=coitem_itemsite_id)
        AND (item_id=itemsite_item_id)
        AND (wo_ordtype=''S'')
        AND (wo_ordid=coitem_id)))  THEN
      RAISE EXCEPTION  ''Characteristic may not be updated for Job Item with exploded Work Order.'';
    END IF;
  END IF;
  
  SELECT charass_id INTO _charassid
    FROM charass
   WHERE ((charass_target_type=pTargetType)
     AND  (charass_target_id=pTargetId)
     AND  (charass_char_id=pCharId) )
   LIMIT 1;
  IF (FOUND) THEN
    IF(COALESCE(pValue, '''')!='''') THEN
        UPDATE charass
        SET charass_value = pValue,
            charass_price = pPrice
        WHERE (charass_id=_charassid);
    ELSE
      DELETE
        FROM charass
       WHERE (charass_id=_charassid);
      _charassid := 0;
    END IF;
  ELSE
    IF(COALESCE(pValue, '''')!='''') THEN
      SELECT nextval(''charass_charass_id_seq'') INTO _charassid;
      INSERT INTO charass
            (charass_id, charass_target_type, charass_target_id,
             charass_char_id, charass_value, charass_price)
      VALUES(_charassid, pTargetType, pTargetId,
             pCharId, pValue, pPrice);
    ELSE
      _charassid := 0;
    END IF;
  END IF;

  RETURN _charassid;

END;
' LANGUAGE 'plpgsql';

