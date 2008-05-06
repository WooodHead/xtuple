CREATE OR REPLACE FUNCTION _gltransInsertTrigger() RETURNS TRIGGER AS $$
BEGIN
  -- Checks
  -- Start with privileges
  IF ((NEW.gltrans_doctype='JE') AND (NOT checkPrivilege('PostJournalEntries'))) THEN
      RAISE EXCEPTION 'You do not have privileges to create a Journal Entry.';
  END IF;

  IF ((NEW.gltrans_doctype='JE') AND (NEW.gltrans_notes IS NULL)) THEN
      RAISE EXCEPTION 'Notes are required for Journal Entries.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'gltransInsertTrigger');
CREATE TRIGGER gltransInsertTrigger BEFORE INSERT ON gltrans FOR EACH ROW EXECUTE PROCEDURE _gltransInsertTrigger();

CREATE OR REPLACE FUNCTION _gltransAlterTrigger() RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'You may not make alterations to, or delete, G/L Transactions once they have been created.';
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'gltransAlterTrigger');
CREATE TRIGGER gltransAlterTrigger BEFORE UPDATE OR DELETE ON gltrans FOR EACH ROW EXECUTE PROCEDURE _gltransAlterTrigger();

