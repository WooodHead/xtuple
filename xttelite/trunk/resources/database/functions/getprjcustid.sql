-- Function: te.getprjcustid(integer)

-- DROP FUNCTION te.getprjcustid(integer);

CREATE OR REPLACE FUNCTION te.getprjcustid(integer)
  RETURNS integer AS
$BODY$
DECLARE
  pPrjID ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  IF (pPrjID is null) THEN
    RETURN NULL;
  END IF;

  SELECT teprj_cust_id INTO _returnVal
        FROM te.teprj 
         WHERE teprj_prj_id = pPrjID;
  
  RETURN _returnVal;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.getprjcustid(integer) OWNER TO "admin";
