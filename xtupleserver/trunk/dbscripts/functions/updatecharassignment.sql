CREATE OR REPLACE FUNCTION updateCharAssignment(TEXT, INTEGER, INTEGER, TEXT) RETURNS INTEGER AS '
DECLARE
  pTargetType ALIAS FOR $1;
  pTargetId ALIAS FOR $2;
  pCharId ALIAS FOR $3;
  pValue ALIAS FOR $4;
  _charassid INTEGER;

BEGIN

  SELECT updateCharAssignment(pTargetType, pTargetId, pCharId, pValue, FALSE) _charassid;

  RETURN charassid;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION updateCharAssignment(TEXT, INTEGER, INTEGER, TEXT, BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pTargetType ALIAS FOR $1;
  pTargetId ALIAS FOR $2;
  pCharId ALIAS FOR $3;
  pValue ALIAS FOR $4;
  pUpdatePrice ALIAS FOR $5;
  _charassid INTEGER;
  _charassprice NUMERIC;

BEGIN
    
  SELECT charass_id INTO _charassid
    FROM charass
   WHERE ((charass_target_type=pTargetType)
     AND  (charass_target_id=pTargetId)
     AND  (charass_char_id=pCharId) )
   LIMIT 1;
  IF (FOUND) THEN
    IF(COALESCE(pValue, '''')!='''') THEN
      IF (pUpdatePrice) THEN
        IF (pTargetType=''SI'') THEN
          UPDATE charass
          SET charass_value = pValue,
              charass_price = itemcharprice(item_id,pCharId,pValue,cohead_cust_id,cohead_shipto_id,coitem_qtyord,cohead_curr_id,cohead_orderdate) INTO _charassprice
          FROM cohead,coitem,itemsite,item
          WHERE ((coitem_id=pTargetId)
          AND (coitem_cohead_id=cohead_id)
          AND (coitem_itemsite_id=itemsite_id)
          AND (itemsite_item_id=item_id));
        ELSIF (pTargetType=''QI'') THEN
          UPDATE charass
          SET charass_value = pValue,
              charass_price = itemcharprice(item_id,pCharId,pValue,quhead_cust_id,quhead_shipto_id,quitem_qtyord,quhead_curr_id,quhead_quotedate) INTO _charassprice
          FROM quhead,quitem,itemsite,item
          WHERE ((quitem_id=pTargetId)
          AND (quitem_cohead_id=quhead_id)
          AND (quitem_itemsite_id=itemsite_id)
          AND (itemsite_item_id=item_id));
        ELSE
          UPDATE charass
          SET charass_value = pValue
          WHERE (charass_id=_charassid);
        END IF;
    ELSE
      UPDATE charass
      SET charass_value = pValue
      WHERE (charass_id=_charassid);
    END IF;
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
             pCharId, pValue, _charassprice);
    ELSE
      _charassid := 0;
    END IF;
  END IF;

  RETURN _charassid;

END;
' LANGUAGE 'plpgsql';

