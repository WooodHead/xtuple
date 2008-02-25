CREATE OR REPLACE FUNCTION saveItemImage(INTEGER, CHAR, INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  pPurpose ALIAS FOR $2;
  pImageid ALIAS FOR $3;
  _itemimageId INTEGER;

BEGIN
-- See if a record with this purpose already exists
  SELECT itemimage_id INTO _itemimageId
  FROM itemimage
  WHERE ((itemimage_item_id=pItemid)
  AND (itemimage_purpose=pPurpose));

  IF (FOUND) THEN
    UPDATE itemimage SET
      itemimage_image_id=pImageId
    WHERE (itemimage_id=_itemimageId);
  ELSE
    _itemimageId := NEXTVAL(''itemimage_itemimage_id_seq'');
    INSERT INTO itemimage VALUES (_itemimageId,pItemid,pImageid,pPurpose);
  END IF;
  
  RETURN _itemimageId;
END;
' LANGUAGE 'plpgsql';