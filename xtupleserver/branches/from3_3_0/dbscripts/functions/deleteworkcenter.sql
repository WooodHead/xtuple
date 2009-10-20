CREATE OR REPLACE FUNCTION deleteWorkCenter(INTEGER) RETURNS INTEGER AS '
DECLARE
  pWrkcntid ALIAS FOR $1;
  _check INTEGER;

BEGIN

  SELECT woopervar_id INTO _check
  FROM woopervar
  WHERE (woopervar_wrkcnt_id=pWrkcntid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -1;
  END IF;
 
  SELECT stdopn_id INTO _check
  FROM stdopn
  WHERE (stdopn_wrkcnt_id=pWrkcntid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -2;
  END IF;

  SELECT booitem_id INTO _check
  FROM booitem
  WHERE (booitem_wrkcnt_id=pWrkcntid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -3;
  END IF;

  SELECT wooper_id INTO _check
  FROM wooper
  WHERE (wooper_wrkcnt_id=pWrkcntid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -4;
  END IF;

  DELETE FROM wrkcnt
  WHERE (wrkcnt_id=pWrkcntid);

  RETURN pWrkcntid;

END;
' LANGUAGE 'plpgsql';