CREATE OR REPLACE FUNCTION xtpos.getTerminalId(text) RETURNS INTEGER AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pTerminalNumber 	ALIAS FOR $1;
  _returnVal 		INTEGER;
BEGIN
  IF (pTerminalNumber IS NULL) THEN
	RETURN NULL;
  END IF;

  SELECT terminal_id INTO _returnVal
  FROM xtpos.terminal
  WHERE (terminal_number=UPPER(pTerminalNumber));

  IF (_returnVal IS NULL) THEN
	_returnVal := nextval('terminal_terminal_id_seq');

	INSERT INTO terminal (terminal_id, terminal_number)
	VALUES (_returnVal, UPPER(pTerminalNumber));
  END IF;

  RETURN _returnVal;
END;
$$ LANGUAGE 'plpgsql';
