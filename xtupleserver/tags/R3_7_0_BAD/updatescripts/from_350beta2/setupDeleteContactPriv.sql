
CREATE FUNCTION setupPrivs() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN

  IF (EXISTS(SELECT priv_name FROM priv WHERE priv_name  = 'DeleteContacts')) THEN
   --NEXT ACTION
   --raise notice 'found';
  ELSE
	_statement = 'INSERT INTO priv (priv_module, priv_name, priv_descrip) VALUES (''CRM'', ''DeleteContacts'', ''Can Delete Contacts'');';
	EXECUTE _statement;
  END IF;

  _statement := '';

  IF (EXISTS(SELECT priv_name FROM priv WHERE priv_name  = 'MaintainContacts')) THEN
    _statement = 'UPDATE priv SET priv_descrip = ''Can Add/Edit Contacts'' WHERE priv_name = ''MaintainContacts'';';
    EXECUTE _statement;
  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT setupPrivs();
DROP FUNCTION setupPrivs();

