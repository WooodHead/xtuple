
CREATE OR REPLACE FUNCTION postComment(INTEGER, TEXT, INTEGER, TEXT) RETURNS INTEGER AS '
DECLARE
  pCmnttypeid ALIAS FOR $1;
  pSource ALIAS FOR $2;
  pSourceid ALIAS FOR $3;
  pText ALIAS FOR $4;
  _commentid INTEGER;

BEGIN

  SELECT NEXTVAL(''comment_comment_id_seq'') INTO _commentid;

  INSERT INTO comment
  ( comment_id, comment_cmnttype_id, comment_source, comment_source_id,
    comment_date, comment_user, comment_text )
  VALUES
  ( _commentid, pCmnttypeid, pSource, pSourceid,
    CURRENT_TIMESTAMP, CURRENT_USER, pText );

  RETURN _commentid;

END;
' LANGUAGE 'plpgsql';

