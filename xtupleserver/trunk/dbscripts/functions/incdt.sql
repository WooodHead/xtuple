CREATE OR REPLACE FUNCTION incdt() RETURNS SETOF incdt AS $$
DECLARE
  _row incdt%ROWTYPE;

BEGIN
  FOR _row IN SELECT * FROM incdt(false)
  LOOP
    RETURN NEXT _row;
  END LOOP;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION incdt(boolean) RETURNS SETOF incdt AS $$
DECLARE
  pCanBrowse ALIAS FOR $1;
  _row incdt%ROWTYPE;
  _priv TEXT;
  _grant BOOLEAN;

BEGIN
  -- This query will give us the most permissive privilege the user has been granted
  SELECT privilege, granted INTO _priv, _grant
  FROM privgranted 
  WHERE privilege IN ('MaintainAllIncidents','ViewAllIncidents','MaintainPersonalIncidents','ViewPersonalIncidents')
  ORDER BY granted DESC, sequence
  LIMIT 1;

  -- If have an 'All' privilege return all results
  IF (_priv ~ 'All' AND _grant) THEN
    FOR _row IN 
      SELECT * FROM incdt
    LOOP
      RETURN NEXT _row;
    END LOOP;
  -- Otherwise if have any other grant, must be personal privilege.
  ELSIF (_grant) THEN
    FOR _row IN 
      SELECT * FROM incdt 
      WHERE incdt_owner_username = getEffectiveXtUser()
      UNION
      SELECT * FROM incdt 
      WHERE incdt_assigned_username = getEffectiveXtUser()
    LOOP
      RETURN NEXT _row;
    END LOOP;
    -- Allow partial view data they don't own if browsing enabled
    IF(pCanBrowse) THEN
      FOR _row IN 
        SELECT incdt_id, 
          incdt_number, 
          null AS incdt_crmacct_id,
          null AS incdt_cntct_id,
          incdt_summary, 
          null AS incdt_descrip,
          null AS incdt_item_id,
          null AS incdt_timestamp,
          incdt_status, 
          incdt_owner_username 
        FROM incdt 
        WHERE COALESCE(incdt_owner_username,'') != getEffectiveXtUser()
          AND COALESCE(incdt_assigned_username, '') != getEffectiveXtUser()
      LOOP
        RETURN NEXT _row;
      END LOOP;
    END IF;
  -- No privilege so only allow basic browsing info if specified
  ELSIF(pCanBrowse) THEN
    FOR _row IN 
      SELECT incdt_id, 
        incdt_number, 
        null AS incdt_crmacct_id,
        null AS incdt_cntct_id,
        incdt_summary, 
        null AS incdt_descrip,
        null AS incdt_item_id,
        null AS incdt_timestamp,
        incdt_status, 
        incdt_owner_username 
      FROM incdt
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION incdt() IS 'A table function that returns Incident results according to privilege settings. Optional boolen for canBrowse can be passed in to view at least partial data for all records.';