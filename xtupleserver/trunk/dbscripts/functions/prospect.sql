CREATE OR REPLACE FUNCTION prospect() RETURNS SETOF prospect AS $$
DECLARE
  _row prospect%ROWTYPE;

BEGIN
  FOR _row IN SELECT * FROM prospect(false)
  LOOP
    RETURN NEXT _row;
  END LOOP;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION prospect(boolean) RETURNS SETOF prospect AS $$
DECLARE
  pCanBrowse ALIAS FOR $1;
  _row prospect%ROWTYPE;
  _priv TEXT;
  _grant BOOLEAN;

BEGIN
  -- This query will give us the most permissive privilege the user has been granted
  SELECT privilege, granted INTO _priv, _grant
  FROM privgranted 
  WHERE privilege IN ('MaintainAllProspects','ViewAllProspects','MaintainPersonalProspects','ViewAllProspects')
  ORDER BY granted DESC, sequence;

  -- If have an 'All' privilege return all results
  IF (_priv ~ 'All' AND _grant) THEN
    FOR _row IN 
      SELECT * FROM prospect
    LOOP
      RETURN NEXT _row;
    END LOOP;
  -- Otherwise if have any other grant, must be personal privilege.
  ELSIF (_grant) THEN
    FOR _row IN 
      SELECT * FROM prospect 
      WHERE prospect_owner_username = getEffectiveXtUser()
    LOOP
      RETURN NEXT _row;
    END LOOP;
    -- Allow partial view data they don't own if browsing enabled
    IF(pCanBrowse) THEN
      FOR _row IN 
        SELECT prospect_id, 
          prospect_active,
          prospect_number, 
          prospect_name, 
          null AS prospect_cntct_id,
          null AS prospect_comments,
          null AS prospect_created,
          null AS salesrep_id,
          null As prospect_warehous_id,
          null AS prospect_taxzone_id,
          prospect_owner_username
        FROM prospect 
        WHERE COALESCE(prospect_owner_username,'') != getEffectiveXtUser()
      LOOP
        RETURN NEXT _row;
      END LOOP;
    END IF;
  -- No privilege so only allow basic browsing info if specified
  ELSIF(pCanBrowse) THEN
    FOR _row IN 
      SELECT prospect_id, 
        prospect_active,
        prospect_number, 
        prospect_name, 
        null AS prospect_cntct_id,
        null AS prospect_comments,
        null AS prospect_created,
        null AS salesrep_id,
        null As prospect_warehous_id,
        null AS prospect_taxzone_id,
        prospect_owner_username
      FROM prospect
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION prospect() IS 'A table function that returns Prospect results according to privilege settings. Optional boolen for canBrowse can be passed in to view at least partial data for all records.';