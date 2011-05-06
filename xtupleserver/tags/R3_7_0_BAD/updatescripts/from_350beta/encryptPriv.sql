CREATE OR REPLACE FUNCTION addEncryptionPrivIfRequired() RETURNS INTEGER AS $$
BEGIN
  IF (NOT EXISTS(SELECT priv_name
                   FROM priv
                  WHERE (priv_name='ConfigureEncryption'))) THEN
    INSERT INTO priv (priv_module, priv_name, priv_descrip
            ) VALUES ('Sys', 'ConfigureEncryption',
                      'Allowed to view and change the Encryption Key File');
    RETURN 1;
  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT addEncryptionPrivIfRequired();

SELECT dropIfExists('FUNCTION', 'addEncryptionPrivIfRequired()', 'public');
