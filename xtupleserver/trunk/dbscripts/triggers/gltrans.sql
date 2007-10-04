CREATE OR REPLACE FUNCTION _gltransTrigger() RETURNS TRIGGER AS '
DECLARE
  _check BOOLEAN;

BEGIN
  -- Checks
  -- Start with privileges
  IF (TG_OP = ''INSERT'') THEN
    SELECT checkPrivilege(''PostJournalEntries'') INTO _check;
    IF NOT (_check) THEN
      RAISE EXCEPTION ''You do not have privileges to create a Journal Entry.'';
    END IF;
  END IF;

  IF ((NEW.gltrans_doctype=''JE'') AND (NEW.gltrans_notes IS NULL)) THEN
      RAISE EXCEPTION ''Notes are required for Journal Entries.'';
  END IF;
  
  RETURN;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER gltransTrigger ON gltrans;
CREATE TRIGGER gltransTrigger BEFORE INSERT ON gltrans FOR EACH ROW EXECUTE PROCEDURE _gltransTrigger();
