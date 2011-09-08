CREATE OR REPLACE FUNCTION cntct() RETURNS SETOF cntct AS $$
DECLARE
  _row cntct%ROWTYPE;

BEGIN
  FOR _row IN SELECT * FROM cntct(false)
  LOOP
    RETURN NEXT _row;
  END LOOP;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION cntct(boolean) RETURNS SETOF cntct AS $$
DECLARE
  pCanBrowse ALIAS FOR $1;
  _row cntct%ROWTYPE;
  _priv TEXT;
  _grant BOOLEAN;

BEGIN
  -- This query will give us the most permissive privilege the user has been granted
  SELECT privilege, granted INTO _priv, _grant
  FROM privgranted 
  WHERE privilege IN ('MaintainAllContacts','ViewAllContacts','MaintainPersonalContacts','ViewPersonalContacts')
  ORDER BY granted DESC, sequence
  LIMIT 1;

  -- If have an 'All' privilege return all results
  IF (_priv ~ 'All' AND _grant) THEN
    FOR _row IN 
      SELECT * FROM cntct
    LOOP
      RETURN NEXT _row;
    END LOOP;
  -- Otherwise if have any other grant, must be personal privilege.
  ELSIF (_grant) THEN
    FOR _row IN 
      SELECT * FROM cntct 
      WHERE cntct_owner_username = getEffectiveXtUser()
    LOOP
      RETURN NEXT _row;
    END LOOP;
    -- Allow partial view data they don't own if browsing enabled
    IF(pCanBrowse) THEN
      FOR _row IN 
        SELECT cntct_id,
          cntct_crmacct_id,
          cntct_addr_id,
          cntct_first_name,
          cntct_last_name,
          cntct_honorific,
          cntct_initials,
          cntct_active,
          cntct_phone,
          cntct_phone2,
          cntct_fax,
          cntct_email,
          cntct_webaddr,
          null as cntct_notes,
          cntct_title,
          cntct_number,
          cntct_middle,
          cntct_suffix,
          cntct_owner_username,
          cntct_name
        FROM cntct 
        WHERE COALESCE(cntct_owner_username,'') != getEffectiveXtUser()
      LOOP
        RETURN NEXT _row;
      END LOOP;
    END IF;
  -- No privilege so only allow basic browsing info if specified
  ELSIF(pCanBrowse) THEN
    FOR _row IN 
      SELECT cntct_id,
        cntct_crmacct_id,
        cntct_addr_id,
        cntct_first_name,
        cntct_last_name,
        cntct_honorific,
        cntct_initials,
        cntct_active,
        cntct_phone,
        cntct_phone2,
        cntct_fax,
        cntct_email,
        cntct_webaddr,
        null as cntct_notes,
        cntct_title,
        cntct_number,
        cntct_middle,
        cntct_suffix,
        cntct_owner_username,
        cntct_name
      FROM cntct
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION cntct() IS 'A table function that returns Contact results according to privilege settings. Optional boolen for canBrowse can be passed in to view at least partial data for all records.';