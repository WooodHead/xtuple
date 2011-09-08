CREATE OR REPLACE FUNCTION prjtask() RETURNS SETOF prjtask AS $$
DECLARE
  _row prjtask%ROWTYPE;

BEGIN
  FOR _row IN SELECT * FROM prjtask(false)
  LOOP
    RETURN NEXT _row;
  END LOOP;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION prjtask(boolean) RETURNS SETOF prjtask AS $$
DECLARE
  pCanBrowse ALIAS FOR $1;
  _row prjtask%ROWTYPE;
  _priv TEXT;
  _grant BOOLEAN;

BEGIN
  -- This query will give us the most permissive privilege the user has been granted
  SELECT privilege, granted INTO _priv, _grant
  FROM privgranted 
  WHERE privilege IN ('MaintainAllProjects','ViewAllProjects','MaintainPersonalProjects','ViewPersonalProjects')
  ORDER BY granted DESC, sequence
  LIMIT 1;

  -- If have an 'All' privilege return all results
  IF (_priv ~ 'All' AND _grant) THEN
    FOR _row IN 
      SELECT * FROM prjtask
    LOOP
      RETURN NEXT _row;
    END LOOP;
  -- Otherwise if have any other grant, must be personal privilege.
  ELSIF (_grant) THEN
    FOR _row IN 
      SELECT * FROM prjtask 
      WHERE prjtask_owner_username = getEffectiveXtUser()
      UNION
      SELECT * FROM prjtask 
      WHERE prjtask_username = getEffectiveXtUser()
      UNION
      SELECT prjtask.* FROM prjtask
      JOIN prj ON prj_id=prjtask_prj_id
      WHERE prj_username = getEffectiveXtUser()
      UNION
      SELECT prjtask.* FROM prjtask
      JOIN prj ON prj_id=prjtask_prj_id
      WHERE prj_owner_username = getEffectiveXtUser()
    LOOP
      RETURN NEXT _row;
    END LOOP;
    -- Allow partial view data they don't own if browsing enabled
    IF(pCanBrowse) THEN
      FOR _row IN 
        SELECT prjtask_id, 
          prjtask_number, 
          prjtask_name, 
          null AS prjtask_descrip,
          null AS prjtask_prj_id,
          null AS prjtask_anyuser,
          null AS prjtask_status,
          null AS prjtask_hours_budget,
          null AS prjtask_hours_actual,
          null AS prjtask_exp_budget,
          null AS prjtask_exp_actual,
          prjtask_owner_username
        FROM prjtask 
          JOIN prj ON prj_id=prjtask_prj_id
        WHERE COALESCE(prjtask_owner_username,'') != getEffectiveXtUser()
         AND COALESCE(prjtask_username,'') != getEffectiveXtUser()
         AND COALESCE(prj_owner_username,'') != getEffectiveXtUser()
         AND COALESCE(prj_username,'') != getEffectiveXtUser()
      LOOP
        RETURN NEXT _row;
      END LOOP;
    END IF;
  -- No privilege so only allow basic browsing info if specified
  ELSIF(pCanBrowse) THEN
    FOR _row IN 
      SELECT prjtask_id, 
          prjtask_number, 
          prjtask_name, 
          null AS prjtask_descrip,
          null AS prjtask_prj_id,
          null AS prjtask_anyuser,
          null AS prjtask_status,
          null AS prjtask_hours_budget,
          null AS prjtask_hours_actual,
          null AS prjtask_exp_budget,
          null AS prjtask_exp_actual,
          prjtask_owner_username 
      FROM prjtask
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION prjtask() IS 'A table function that returns Project results according to privilege settings. Optional boolen for canBrowse can be passed in to view at least partial data for all records.';