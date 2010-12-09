CREATE OR REPLACE FUNCTION _checkheadBeforeTrigger() RETURNS TRIGGER AS '
  DECLARE _amount NUMERIC;

BEGIN

  IF (TG_OP = ''INSERT'' OR TG_OP = ''UPDATE'') THEN
    IF (NOT EXISTS (SELECT checkrecip_id
		    FROM checkrecip
		    WHERE ((checkrecip_type=NEW.checkhead_recip_type)
		      AND  (checkrecip_id=NEW.checkhead_recip_id)) )) THEN
      RAISE EXCEPTION ''Cannot verify recipient for check % (type %  id %)'',
		      NEW.checkhead_number, NEW.checkhead_recip_type,
		      NEW.checkhead_recip_id;
    END IF;

    IF (NEW.checkhead_journalnumber IS NOT NULL
        AND NOT EXISTS (SELECT jrnluse_number
			FROM jrnluse
			WHERE (jrnluse_number=NEW.checkhead_journalnumber))
	) THEN
      RAISE EXCEPTION ''Journal Number % does not exist and cannot be used for check %.'',
		      NEW.checkhead_journalnumber, NEW.checkhead_number;
    END IF;
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'checkheadBeforeTrigger');
CREATE TRIGGER checkheadBeforeTrigger BEFORE INSERT OR UPDATE ON checkhead FOR EACH ROW EXECUTE PROCEDURE _checkheadBeforeTrigger();

