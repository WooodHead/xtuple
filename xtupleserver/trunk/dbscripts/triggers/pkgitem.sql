SELECT dropIfExists('TRIGGER', 'pkgitembeforetrigger');
CREATE OR REPLACE FUNCTION _pkgitembeforetrigger() RETURNS "trigger" AS '
  BEGIN
    IF (TG_OP = ''UPDATE'') THEN

    ELSIF (TG_OP = ''INSERT'') THEN
      IF (NEW.pkgitem_type = ''C'') THEN
        IF (NOT EXISTS(SELECT script_id
                       FROM script
                       WHERE ((script_id=NEW.pkgitem_item_id)
                          AND (script_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create Script % as a Package Item without a corresponding script record.'',
            NEW.pkgitem_name;
        END IF;
      ELSIF (NEW.pkgitem_type = ''D'') THEN
        IF (NOT EXISTS(SELECT cmd_id
                       FROM cmd
                       WHERE ((cmd_id=NEW.pkgitem_item_id)
                          AND (cmd_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create Custom Command % as a Package Item without a corresponding cmd record.'',
            NEW.pkgitem_name;
        END IF;
      ELSIF (NEW.pkgitem_type = ''F'') THEN
        RAISE EXCEPTION ''Functions are not yet supported pkgitems.'';
      ELSIF (NEW.pkgitem_type = ''G'') THEN
        RAISE EXCEPTION ''Triggers are not yet supported pkgitems.'';
      ELSIF (NEW.pkgitem_type = ''I'') THEN
        RAISE EXCEPTION ''Images are not yet supported pkgitems.'';
      ELSIF (NEW.pkgitem_type = ''M'') THEN
        RAISE EXCEPTION ''Menus are not yet supported pkgitems.'';
      ELSIF (NEW.pkgitem_type = ''P'') THEN
        RAISE EXCEPTION ''Privileges are not yet supported pkgitems.'';
      ELSIF (NEW.pkgitem_type = ''R'') THEN
        IF (NOT EXISTS(SELECT report_id
                       FROM report
                       WHERE ((report_id=NEW.pkgitem_item_id)
                          AND (report_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create Report % as a Package Item without a corresponding report record.'',
            NEW.pkgitem_name;
        END IF;
      ELSIF (NEW.pkgitem_type = ''S'') THEN
        RAISE EXCEPTION ''Schemas are not yet supported pkgitems.'';
      ELSIF (NEW.pkgitem_type = ''T'') THEN
        RAISE EXCEPTION ''Tables are not yet supported pkgitems.'';
      ELSIF (NEW.pkgitem_type = ''U'') THEN
        IF (NOT EXISTS(SELECT uiform_id
                       FROM uiform
                       WHERE ((uiform_id=NEW.pkgitem_item_id)
                          AND (uiform_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create User Interface Form % as a Package Item without a corresponding uiform record.'',
            NEW.pkgitem_name;
        END IF;
      ELSIF (NEW.pkgitem_type = ''V'') THEN
        RAISE EXCEPTION ''Views are not yet supported pkgitems.'';
      ELSE
        RAISE EXCEPTION ''"%" is not a valid type of package item.'',
          NEW.pkgitem_type;
      END IF;

    ELSIF (TG_OP = ''DELETE'') THEN
    RAISE NOTICE ''Deleting % % %'', OLD.pkgitem_item_id, OLD.pkgitem_name, OLD.pkgitem_type;
      IF (OLD.pkgitem_type = ''C'') THEN
        DELETE FROM script WHERE ((script_id=OLD.pkgitem_item_id)
                              AND (script_name=OLD.pkgitem_name));
      ELSIF (OLD.pkgitem_type = ''D'') THEN
        DELETE FROM cmd
          WHERE ((cmd_id=OLD.pkgitem_item_id)
            AND  (cmd_name=OLD.pkgitem_name));
      ELSIF (OLD.pkgitem_type = ''F'') THEN
        RAISE EXCEPTION ''Functions are not yet supported pkgitems.'';
      ELSIF (OLD.pkgitem_type = ''G'') THEN
        RAISE EXCEPTION ''Triggers are not yet supported pkgitems.'';
      ELSIF (OLD.pkgitem_type = ''I'') THEN
        RAISE EXCEPTION ''Images are not yet supported pkgitems.'';
      ELSIF (OLD.pkgitem_type = ''M'') THEN
        RAISE EXCEPTION ''Menus are not yet supported pkgitems.'';
      ELSIF (OLD.pkgitem_type = ''P'') THEN
        RAISE EXCEPTION ''Privileges are not yet supported pkgitems.'';
      ELSIF (OLD.pkgitem_type = ''R'') THEN
        DELETE FROM report
        WHERE ((report_id=OLD.pkgitem_item_id)
           AND (report_name=OLD.pkgitem_name));
      ELSIF (OLD.pkgitem_type = ''S'') THEN
        RAISE EXCEPTION ''Schemas are not yet supported pkgitems.'';
      ELSIF (OLD.pkgitem_type = ''T'') THEN
        RAISE EXCEPTION ''Tables are not yet supported pkgitems.'';
      ELSIF (OLD.pkgitem_type = ''U'') THEN
        DELETE FROM uiform
        WHERE ((uiform_id=OLD.pkgitem_item_id)
           AND (uiform_name=OLD.pkgitem_name));
      ELSIF (OLD.pkgitem_type = ''V'') THEN
        RAISE EXCEPTION ''Views are not yet supported pkgitems.'';
      ELSE
        RAISE EXCEPTION ''"%" is not a valid type of package item.'',
          OLD.pkgitem_type;
      END IF;
      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

CREATE TRIGGER pkgitembeforetrigger
  BEFORE  INSERT OR
	  UPDATE OR DELETE
  ON pkgitem
  FOR EACH ROW
  EXECUTE PROCEDURE _pkgitembeforetrigger();
