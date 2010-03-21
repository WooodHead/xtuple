CREATE OR REPLACE FUNCTION _gltransTrigger() RETURNS TRIGGER AS '
BEGIN
  -- Checks
  -- Start with privileges
  IF ((NEW.gltrans_doctype=''JE'') AND (NOT checkPrivilege(''PostJournalEntries''))) THEN
      RAISE EXCEPTION ''You do not have privileges to create a Journal Entry.'';
  END IF;

  IF ((NEW.gltrans_doctype=''JE'') AND (NEW.gltrans_notes IS NULL)) THEN
      RAISE EXCEPTION ''Notes are required for Journal Entries.'';
  END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER gltransTrigger ON gltrans;
CREATE TRIGGER gltransTrigger BEFORE INSERT ON gltrans FOR EACH ROW EXECUTE PROCEDURE _gltransTrigger();
