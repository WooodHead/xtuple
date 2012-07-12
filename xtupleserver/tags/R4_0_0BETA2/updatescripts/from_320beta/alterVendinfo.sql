CREATE FUNCTION xTupleTmpTextToByteA(TEXT) RETURNS bytea AS '
BEGIN
  RETURN $1;
END;
' LANGUAGE 'plpgsql' VOLATILE;

ALTER TABLE vendinfo ADD ach_routingnumber bytea NOT NULL DEFAULT E'\\000';
ALTER TABLE vendinfo ADD ach_accntnumber   bytea NOT NULL DEFAULT E'\\000';
UPDATE vendinfo SET ach_routingnumber=xTupleTmpTextToByteA(vend_ach_routingnumber),
                    ach_accntnumber=xTupleTmpTextToByteA(vend_ach_accntnumber);
ALTER TABLE vendinfo DROP vend_ach_routingnumber;
ALTER TABLE vendinfo DROP vend_ach_accntnumber;
ALTER TABLE vendinfo RENAME ach_routingnumber TO vend_ach_routingnumber;
ALTER TABLE vendinfo RENAME ach_accntnumber   TO vend_ach_accntnumber;

DROP FUNCTION xTupleTmpTextToByteA(TEXT);
