-- TODO: bomitemTrigger
CREATE OR REPLACE FUNCTION _bomitemTrigger() RETURNS TRIGGER AS '
DECLARE
  _cmnttypeid INTEGER;
BEGIN

  IF ( SELECT (metric_value=''t'')
       FROM metric
       WHERE (metric_name=''ItemChangeLog'') ) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name=''ChangeLog'');
    IF (FOUND) THEN
      IF (TG_OP = ''INSERT'') THEN
        PERFORM postComment(_cmnttypeid, ''BMI'', NEW.bomitem_id, (''Created BOM Item'' || NEW.bomitem_seqnumber::TEXT));

      ELSIF (TG_OP = ''UPDATE'') THEN
        IF (NEW.bomitem_effective <> OLD.bomitem_effective) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Effective Date Changed from '' || formatDate(OLD.bomitem_effective, ''Always'') ||
                                 '' to '' || formatDate(NEW.bomitem_effective, ''Always'' ) ) );
        END IF;

        IF (NEW.bomitem_expires <> OLD.bomitem_expires) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Expiration Date Changed from '' || formatDate(OLD.bomitem_expires, ''Never'') ||
                                 '' to '' || formatDate(NEW.bomitem_expires, ''Never'' ) ) );
        END IF;

        IF (NEW.bomitem_qtyper <> OLD.bomitem_qtyper) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Qty. Per Changed from '' || formatQtyPer(OLD.bomitem_qtyper) ||
                                 '' to '' || formatQtyPer(NEW.bomitem_qtyper ) ) );
        END IF;

        IF (NEW.bomitem_scrap <> OLD.bomitem_scrap) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Scrap % Changed from '' || formatPrcnt(OLD.bomitem_scrap) ||
                                 '' to '' || formatPrcnt(NEW.bomitem_scrap ) ) );
        END IF;

        IF (NEW.bomitem_issuemethod <> OLD.bomitem_issuemethod) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Issue Method Changed from '' || (CASE WHEN(OLD.bomitem_issuemethod=''S'') THEN ''Push''
                                                                         WHEN(OLD.bomitem_issuemethod=''L'') THEN ''Pull''
                                                                         WHEN(OLD.bomitem_issuemethod=''M'') THEN ''Mixed''
                                                                         ELSE OLD.bomitem_issuemethod END) ||
                                 '' to '' || (CASE WHEN(NEW.bomitem_issuemethod=''S'') THEN ''Push''
                                                   WHEN(NEW.bomitem_issuemethod=''L'') THEN ''Pull''
                                                   WHEN(NEW.bomitem_issuemethod=''M'') THEN ''Mixed''
                                                   ELSE NEW.bomitem_issuemethod END) ) );
        END IF;

        IF (NEW.bomitem_ecn <> OLD.bomitem_ecn) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''ECN Changed from '' || OLD.bomitem_ecn ||
                                 '' to '' || NEW.bomitem_ecn ) );
        END IF;

      END IF;
    END IF;
  END IF;

  IF (TG_OP = ''DELETE'') THEN
    DELETE FROM comment
     WHERE ( (comment_source=''BMI'')
       AND   (comment_source_id=OLD.bomitem_id) );

    RETURN OLD;
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER bomitemTrigger ON bomitem;
CREATE TRIGGER bomitemTrigger BEFORE INSERT OR UPDATE OR DELETE ON bomitem FOR EACH ROW EXECUTE PROCEDURE _bomitemTrigger();
