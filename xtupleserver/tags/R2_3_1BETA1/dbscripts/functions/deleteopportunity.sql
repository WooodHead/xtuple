
CREATE OR REPLACE FUNCTION deleteOpportunity(INTEGER) RETURNS INTEGER AS '
DECLARE
  pOpheadid ALIAS FOR $1;
  _test INTEGER;
BEGIN

  SELECT todoitem_id INTO _test
    FROM todoitem
   WHERE(todoitem_ophead_id=pOpheadid)
   LIMIT 1;
  IF(FOUND) THEN
    RETURN -1;
  END IF;

  DELETE
    FROM charass
   WHERE((charass_target_type=''OPP'')
     AND (charass_target_id=pOpheadid));

  DELETE
    FROM comment
   WHERE((comment_source=''OPP'')
     AND (comment_source_id=pOpheadid));

  DELETE
    FROM ophead
   WHERE(ophead_id=pOpheadid);
  
  return 0;
END;
' LANGUAGE 'plpgsql';
