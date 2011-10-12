CREATE OR REPLACE FUNCTION te.sheetstate(INTEGER, CHAR(1)) RETURNS INTEGER AS $$
DECLARE
  pTeheadId ALIAS FOR $1;
  pType     ALIAS FOR $2;
  _state    INTEGER := -1;

BEGIN
  -- Check and return the process state of the sheet
  --    1 = All processed
  --    0 = Processing required
  --   -1 = Not Applicable

  IF (pType = 'I') THEN
    SELECT MIN(CASE teitem_invcitem_id IS NULL WHEN TRUE THEN 0 ELSE 1 END) INTO _state
      FROM te.teitem
     WHERE ((teitem_tehead_id=pTeheadId)
        AND (teitem_billable)
        AND (teitem_qty >= 0));

  ELSIF (pType = 'V') THEN
    -- todo: why outer join then check teitem_type and vend_id is not null?
    SELECT MIN(CASE teitem_vodist_id IS NULL WHEN TRUE THEN 0 ELSE 1 END) INTO _state
      FROM te.tehead
        JOIN emp ON (tehead_emp_id=emp_id)
        LEFT OUTER JOIN te.teemp ON (emp_id=teemp_emp_id)
        LEFT OUTER JOIN te.teitem ON (teitem_tehead_id=tehead_id)
        LEFT OUTER JOIN vendinfo ON (UPPER(emp_number)=UPPER(vend_number))
      WHERE ((teitem_tehead_id=pTeheadId)
         AND ((teitem_type = 'E' AND NOT teitem_prepaid) 
           OR (teitem_type = 'T' AND COALESCE(teemp_contractor,false)))
         AND (vend_id IS NOT NULL)
         AND (teitem_qty > 0));

  ELSIF (pType = 'P') THEN
    SELECT MIN(CASE teitem_posted WHEN FALSE THEN 0 ELSE 1 END) INTO _state
      FROM te.teitem
      JOIN te.tehead ON (teitem_tehead_id=tehead_id)
      JOIN te.teemp ON (tehead_emp_id=teemp_emp_id)
     WHERE ((teitem_tehead_id=pTeheadId)
        AND (teitem_type = 'T')
        AND (NOT teemp_contractor));

  ELSE
    -- TODO: either make ErrorReporter::error find this or use xtuple
    RAISE EXCEPTION 'Unknown process type % [xtte: sheetstate, -2, %]',
                    pType, pType;
  END IF;

  RETURN _state;

END;
$$ LANGUAGE 'plpgsql';
