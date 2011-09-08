CREATE OR REPLACE FUNCTION prj() RETURNS SETOF prj AS $$
DECLARE
  _row prj%ROWTYPE;

BEGIN
  FOR _row IN SELECT * FROM prj(false)
  LOOP
    RETURN NEXT _row;
  END LOOP;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION prj(boolean) RETURNS SETOF prj AS $$
DECLARE
  pCanBrowse ALIAS FOR $1;
  _row prj%ROWTYPE;
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
      SELECT * FROM prj
    LOOP
      RETURN NEXT _row;
    END LOOP;
  -- Otherwise if have any other grant, must be personal privilege.
  ELSIF (_grant) THEN
    FOR _row IN 
      SELECT * FROM prj 
      WHERE prj_owner_username = getEffectiveXtUser()
      UNION
      SELECT * FROM prj 
      WHERE prj_username = getEffectiveXtUser()
    LOOP
      RETURN NEXT _row;
    END LOOP;
    -- Allow partial view data they don't own if browsing enabled
    IF(pCanBrowse) THEN
      FOR _row IN 
        SELECT prj_id, 
          prj_number, 
          prj_name, 
          null AS prj_descrip,
          prj_status,
          null AS prj_so,
          null AS prj_wo,
          null AS prj_po,
          prj_owner_username 
        FROM prj 
        WHERE prj_owner_username != getEffectiveXtUser()
          AND prj_username != getEffectiveXtUser()
      LOOP
        RETURN NEXT _row;
      END LOOP;
    END IF;
  -- No privilege so only allow basic browsing info if specified
  ELSIF(pCanBrowse) THEN
    FOR _row IN 
      SELECT prj_id, 
        prj_number, 
        prj_name, 
        null AS prj_descrip,
        prj_status,
        null AS prj_so,
        null AS prj_wo,
        null AS prj_po,
        prj_owner_username 
      FROM prj
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION prj() IS 'A table function that returns Project results according to privilege settings. Optional boolen for canBrowse can be passed in to view at least partial data for all records.';