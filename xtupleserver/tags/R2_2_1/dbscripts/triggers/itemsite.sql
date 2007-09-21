CREATE OR REPLACE FUNCTION _itemsiteTrigger () RETURNS TRIGGER AS '
DECLARE
  _cmnttypeid INTEGER;

BEGIN

  IF (TG_OP = ''UPDATE'') THEN
    IF ( (NEW.itemsite_qtyonhand <> OLD.itemsite_qtyonhand) ) THEN
      IF (OLD.itemsite_freeze) THEN
        NEW.itemsite_qtyonhand := OLD.itemsite_qtyonhand;
      ELSE
        NEW.itemsite_datelastused := CURRENT_DATE;
      END IF;

      IF ( (NEW.itemsite_qtyonhand < 0) AND (OLD.itemsite_qtyonhand >= 0) ) THEN
        INSERT INTO evntlog
        ( evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
          evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id,
          evntlog_number )
        SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
               ''I'', NEW.itemsite_id, warehous_id,
               (item_number || ''/'' || warehous_code)
        FROM evntnot, evnttype, item, warehous
        WHERE ( (evntnot_evnttype_id=evnttype_id)
         AND (evntnot_warehous_id=NEW.itemsite_warehous_id)
         AND (NEW.itemsite_item_id=item_id)
         AND (NEW.itemsite_warehous_id=warehous_id)
         AND (evnttype_name=''QOHBelowZero'') );
      END IF;
    END IF;
  END IF;

--  Handle the ChangeLog
  IF ( SELECT (metric_value=''t'')
       FROM metric
       WHERE (metric_name=''ItemSiteChangeLog'') ) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name=''ChangeLog'');
    IF (FOUND) THEN
      IF (TG_OP = ''INSERT'') THEN
        PERFORM postComment(_cmnttypeid, ''IS'', NEW.itemsite_id, ''Created'');

      ELSIF (TG_OP = ''UPDATE'') THEN

        IF (OLD.itemsite_plancode_id <> NEW.itemsite_plancode_id) THEN
          PERFORM postComment( _cmnttypeid, ''IS'', NEW.itemsite_id,
                               ( ''Planner Code Changed from "'' || oldplancode.plancode_code ||
                                 ''" to "'' || newplancode.plancode_code || ''"'' ) )
          FROM plancode AS oldplancode, plancode AS newplancode
          WHERE ( (oldplancode.plancode_id=OLD.itemsite_plancode_id)
           AND (newplancode.plancode_id=NEW.itemsite_plancode_id) );
        END IF;

        IF (NEW.itemsite_reorderlevel <> OLD.itemsite_reorderlevel) THEN
          PERFORM postComment( _cmnttypeid, ''IS'', NEW.itemsite_id,
                               ( ''Reorder Level Changed from '' || formatQty(OLD.itemsite_reorderlevel) ||
                                 '' to '' || formatQty(NEW.itemsite_reorderlevel ) ) );
        END IF;

        IF (NEW.itemsite_ordertoqty <> OLD.itemsite_ordertoqty) THEN
          PERFORM postComment( _cmnttypeid, ''IS'', NEW.itemsite_id,
                               ( ''Order Up To Changed from '' || formatQty(OLD.itemsite_ordertoqty) ||
                                 '' to '' || formatQty(NEW.itemsite_ordertoqty ) ) );
        END IF;

      END IF;
    END IF;
  END IF;

  RETURN NEW;

END;
' LANGUAGE 'plpgsql';

DROP TRIGGER itemsiteTrigger ON itemsite;
CREATE TRIGGER itemsiteTrigger BEFORE INSERT OR UPDATE ON itemsite FOR EACH ROW EXECUTE PROCEDURE _itemsiteTrigger();
