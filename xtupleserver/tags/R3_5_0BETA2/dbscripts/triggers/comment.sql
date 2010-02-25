CREATE OR REPLACE FUNCTION _commentTrigger () RETURNS TRIGGER AS '
BEGIN
  IF (NEW.comment_cmnttype_id IS NULL) THEN
	RAISE EXCEPTION ''You must supply a valid Comment Type ID.'';
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER commentTrigger ON comment;
CREATE TRIGGER commentTrigger BEFORE INSERT OR UPDATE ON comment FOR EACH ROW EXECUTE PROCEDURE _commentTrigger();
