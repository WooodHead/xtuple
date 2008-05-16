CREATE OR REPLACE FUNCTION _warehousTrigger () RETURNS TRIGGER AS '
DECLARE
  _cmnttypeid INTEGER;

BEGIN

  IF ( SELECT (metric_value=''t'')
       FROM metric
       WHERE (metric_name=''WarehouseChangeLog'') ) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name=''ChangeLog'');
    IF (FOUND) THEN
      IF (TG_OP = ''INSERT'') THEN
        PERFORM postComment(_cmnttypeid, ''WH'', NEW.warehous_id, ''Created'');

      ELSIF (TG_OP = ''UPDATE'') THEN
        IF (OLD.warehous_code <> NEW.warehous_code) THEN
          PERFORM postComment( _cmnttypeid, ''WH'', NEW.warehous_id,
                               (''Code Changed from "'' || OLD.warehous_code || ''" to "'' || NEW.warehous_code || ''"'') );
        END IF;

        IF (OLD.warehous_descrip <> NEW.warehous_descrip) THEN
          PERFORM postComment( _cmnttypeid, ''WH'', NEW.warehous_id,
                               ( ''Description Changed from "'' || OLD.warehous_descrip ||
                                 ''" to "'' || NEW.warehous_descrip || ''"'' ) );
        END IF;

        IF (OLD.warehous_active <> NEW.warehous_active) THEN
          IF (NEW.warehous_active) THEN
            PERFORM postComment(_cmnttypeid, ''WH'', NEW.warehous_id, ''Activated'');
          ELSE
            PERFORM postComment(_cmnttypeid, ''WH'', NEW.warehous_id, ''Deactivated'');
          END IF;
        END IF;

      END IF;
    END IF;
  END IF;
  
  RETURN NEW;

END;
' LANGUAGE 'plpgsql';

DROP TRIGGER warehousTrigger ON whsinfo;
CREATE TRIGGER warehousTrigger BEFORE INSERT OR UPDATE ON whsinfo FOR EACH ROW EXECUTE PROCEDURE _warehousTrigger();
