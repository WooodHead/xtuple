CREATE OR REPLACE FUNCTION deletePo(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pPoheadid ALIAS FOR $1;

BEGIN

  IF ( ( SELECT pohead_status
         FROM pohead
         WHERE (pohead_id=pPoheadid) ) = ''U'' ) THEN

    DELETE FROM poitem
    WHERE (poitem_pohead_id=pPoheadid);

    DELETE FROM pohead
    WHERE (pohead_id=pPoheadid);

    RETURN TRUE;

  ELSE
    RETURN FALSE;
  END IF;

END;
' LANGUAGE 'plpgsql';
