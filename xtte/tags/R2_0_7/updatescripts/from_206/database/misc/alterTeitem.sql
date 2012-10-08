CREATE FUNCTION te.altertable_teitem() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN

-- Check existence of empcost column
  IF (EXISTS(
             SELECT 1
             FROM INFORMATION_SCHEMA.COLUMNS
             WHERE TABLE_SCHEMA = 'te'
             AND TABLE_NAME = 'teitem'
             AND COLUMN_NAME = 'teitem_empcost'
            )) THEN

  -- Amend Table
     SELECT pkghead_version INTO _version
       FROM pkghead
       WHERE  pkghead_name = 'te';
     IF (_version = '2.0.7') THEN             
         _statement = '';
     ELSE
      -- Do nothing
     END IF;     
  ELSE
  -- Create New table
    _statement ='ALTER TABLE te.teitem ADD COLUMN teitem_empcost numeric;';
  END IF;

  EXECUTE _statement;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT te.altertable_teitem();
DROP FUNCTION te.altertable_teitem();





