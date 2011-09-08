CREATE OR REPLACE FUNCTION ophead() RETURNS SETOF ophead AS $$
DECLARE
  _row ophead%ROWTYPE;

BEGIN
  FOR _row IN SELECT * FROM ophead(false)
  LOOP
    RETURN NEXT _row;
  END LOOP;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION ophead(boolean) RETURNS SETOF ophead AS $$
DECLARE
  pCanBrowse ALIAS FOR $1;
  _row ophead%ROWTYPE;
  _priv TEXT;
  _grant BOOLEAN;

BEGIN
  -- This query will give us the most permissive privilege the user has been granted
  SELECT privilege, granted INTO _priv, _grant
  FROM privgranted 
  WHERE privilege IN ('MaintainAllOpportunities','ViewAllOpportunities','MaintainPersonalOpportunities','ViewPersonalOpportunities')
  ORDER BY granted DESC, sequence
  LIMIT 1;

  -- If have an 'All' privilege return all results
  IF (_priv ~ 'All' AND _grant) THEN
    FOR _row IN 
      SELECT * FROM ophead
    LOOP
      RETURN NEXT _row;
    END LOOP;
  -- Otherwise if have any other grant, must be personal privilege.
  ELSIF (_grant) THEN
    FOR _row IN 
      SELECT * FROM ophead 
      WHERE ophead_owner_username = getEffectiveXtUser()
      UNION
      SELECT * FROM ophead 
      WHERE ophead_username = getEffectiveXtUser()
    LOOP
      RETURN NEXT _row;
    END LOOP;
    -- Allow partial view data they don't own if browsing enabled
    IF(pCanBrowse) THEN
      FOR _row IN 
        SELECT ophead_id, 
          ophead_name, 
          null as ophead_crmacct_id, 
          ophead_owner_username, 
          null AS ophead_opstage_id,
          null AS ophead_opsource_id,
          null AS ophead_optype_id,
          null AS ophead_probability_prcnt,
          null AS ophead_amount,
          null AS ophead_target_date,
          null AS ophead_actual_date,
          null AS ophead_notes,
          null AS ophead_curr_id,
          ophead_active,
          null AS ophead_cntct_id,
          null AS ophead_username,
          null AS ophead_start_date,
          null AS ophead_assigned_date,
          null AS ophead_priority_id,
          ophead_number
        FROM ophead 
        WHERE COALESCE(ophead_owner_username,'') != getEffectiveXtUser()
          AND COALESCE(ophead_username,'') != getEffectiveXtUser()
      LOOP
        RETURN NEXT _row;
      END LOOP;
    END IF;
  -- No privilege so only allow basic browsing info if specified
  ELSIF(pCanBrowse) THEN
    FOR _row IN 
      SELECT ophead_id, 
        ophead_name, 
        null as ophead_crmacct_id, 
        ophead_owner_username, 
        null AS ophead_opstage_id,
        null AS ophead_opsource_id,
        null AS ophead_optype_id,
        null AS ophead_probability_prcnt,
        null AS ophead_amount,
        null AS ophead_target_date,
        null AS ophead_actual_date,
        null AS ophead_notes,
        null AS ophead_curr_id,
        ophead_active,
        null AS ophead_cntct_id,
        null AS ophead_username,
        null AS ophead_start_date,
        null AS ophead_assigned_date,
        null AS ophead_priority_id,
        ophead_number
      FROM ophead
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION ophead() IS 'A table function that returns Opportunity results according to privilege settings. Optional boolen for canBrowse can be passed in to view at least partial data for all records.';