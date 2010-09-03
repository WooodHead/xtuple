CREATE OR REPLACE FUNCTION te.maxline(integer) RETURNS integer AS $$
DECLARE
  pHeadID ALIAS FOR $1;
  _returnVal INTEGER := 0;
BEGIN

  SELECT COALESCE(max(teitem_linenumber), 0) INTO _returnVal
  FROM te.teitem
  WHERE (teitem_tehead_id=pHeadID);

  RETURN _returnVal;
END;
$$
LANGUAGE 'plpgsql';
