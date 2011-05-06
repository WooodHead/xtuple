CREATE OR REPLACE FUNCTION formatCntctName(INTEGER) RETURNS TEXT AS $$ 
DECLARE
  pCntctId ALIAS FOR $1;
  _r RECORD;
  _name TEXT := '';
  _rows NUMERIC;

BEGIN

  SELECT cntct_honorific, cntct_first_name, cntct_middle, 
    cntct_last_name, cntct_suffix INTO _r
  FROM cntct
  WHERE (cntct_id=pCntctId);

  GET DIAGNOSTICS _rows = ROW_COUNT;
  IF (_rows = 0) THEN
    RETURN _name;
  END IF;

  IF (LENGTH(TRIM(both from _r.cntct_honorific)) > 0) THEN
    _name:=_r.cntct_honorific || '.';
  END IF;

  IF (LENGTH(TRIM(both from _r.cntct_first_name)) > 0)  THEN
        IF (LENGTH(TRIM(both from _name)) > 0) THEN
                _name:=_name || ' ';
        END IF;
    _name:=_name || _r.cntct_first_name;
  END IF;

  IF (LENGTH(TRIM(both from _r.cntct_middle)) > 0)  THEN
        IF (LENGTH(TRIM(both from _name)) > 0) THEN
                _name:=_name || ' ';
        END IF;
    _name:=_name || _r.cntct_middle || '.';
  END IF;

  IF (LENGTH(TRIM(both from _r.cntct_last_name)) > 0)  THEN
        IF (LENGTH(TRIM(both from _name)) > 0) THEN
                _name:=_name || ' ';
        END IF;
    _name:=_name || _r.cntct_last_name;
  END IF;

  IF (LENGTH(TRIM(both from _r.cntct_suffix)) > 0)  THEN
        IF (LENGTH(TRIM(both from _name)) > 0) THEN
                _name:=_name || ' ';
        END IF;
    _name:=_name || _r.cntct_suffix;
  END IF;

  RETURN _name;

END;
$$ LANGUAGE 'plpgsql';

