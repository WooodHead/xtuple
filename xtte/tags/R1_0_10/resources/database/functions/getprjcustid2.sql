-- Function: te.getprjcustid(text)

-- DROP FUNCTION te.getprjcustid(text);

CREATE OR REPLACE FUNCTION te.getprjcustid(text)
  RETURNS integer AS
$BODY$
DECLARE
  pPrj ALIAS FOR $1;
  _returnVal INTEGER;
  _prjID INTEGER;
BEGIN
  IF (pPrj is null) THEN
    RETURN NULL;
  END IF;

  SELECT prj_id INTO _prjID from prj where prj_name = pPrj;

  IF _prjID > 0 THEN
	SELECT teprj_cust_id INTO _returnVal
        FROM te.teprj 
         WHERE teprj_prj_id = getprjid(pPrj);
  END IF;
  
  RETURN _returnVal;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.getprjcustid(text) OWNER TO "admin";
