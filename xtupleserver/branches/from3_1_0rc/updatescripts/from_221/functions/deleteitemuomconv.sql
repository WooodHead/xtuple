CREATE OR REPLACE FUNCTION deleteItemUOMConv(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemuomconvid ALIAS FOR $1;

BEGIN
  DELETE FROM itemuom WHERE itemuom_itemuomconv_id=pItemuomconvid;
  DELETE FROM itemuomconv WHERE itemuomconv_id=pItemuomconvid;

  RETURN 0;
END;
' LANGUAGE 'plpgsql';
