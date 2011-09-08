CREATE OR REPLACE FUNCTION crmacct() RETURNS SETOF crmacct AS $$
DECLARE
  _row crmacct%ROWTYPE;

BEGIN
  FOR _row IN SELECT * FROM crmacct(false)
  LOOP
    RETURN NEXT _row;
  END LOOP;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION crmacct(boolean) RETURNS SETOF crmacct AS $$
DECLARE
  pCanBrowse ALIAS FOR $1;
  _row crmacct%ROWTYPE;
  _priv TEXT;
  _grant BOOLEAN;

BEGIN
  -- This query will give us the most permissive privilege the user has been granted
  SELECT privilege, granted INTO _priv, _grant
  FROM privgranted 
  WHERE privilege IN ('MaintainAllCRMAccounts','ViewAllCRMAccounts','MaintainPersonalCRMAccounts','ViewPersonalCRMAccounts')
  ORDER BY granted DESC, sequence
  LIMIT 1;

  -- If have an 'All' privilege return all results
  IF (_priv ~ 'All' AND _grant) THEN
    FOR _row IN 
      SELECT * FROM crmacct
    LOOP
      RETURN NEXT _row;
    END LOOP;
  -- Otherwise if have any other grant, must be personal privilege.
  ELSIF (_grant) THEN
    FOR _row IN 
      SELECT * FROM crmacct 
      WHERE crmacct_owner_username = getEffectiveXtUser()
    LOOP
      RETURN NEXT _row;
    END LOOP;
    -- Allow partial view data they don't own if browsing enabled
    IF(pCanBrowse) THEN
      FOR _row IN 
        SELECT crmacct_id, 
          crmacct_number, 
          crmacct_name, 
          crmacct_active, 
          null AS crmacct_type,
          null AS crmacct_cust_id,
          null AS crmacct_competitor_id,
          null AS crmacct_partner_id,
          null AS crmacct_prospect_id,
          null AS crmacct_vend_id,
          null AS crmacct_cntct_id_1,
          null AS crmacct_cntct_id_2,
          null AS crmacct_parent_id,
          null AS crmacct_notes,
          null AS crmacct_taxauth_id,
          crmacct_owner_username 
        FROM crmacct 
        WHERE COALESCE(crmacct_owner_username,'') != getEffectiveXtUser()
      LOOP
        RETURN NEXT _row;
      END LOOP;
    END IF;
  -- No privilege so only allow basic browsing info if specified
  ELSIF(pCanBrowse) THEN
    FOR _row IN 
      SELECT crmacct_id, 
        crmacct_number, 
        crmacct_name, 
        crmacct_active, 
        null AS crmacct_type,
        null AS crmacct_cust_id,
        null AS crmacct_competitor_id,
        null AS crmacct_partner_id,
        null AS crmacct_prospect_id,
        null AS crmacct_vend_id,
        null AS crmacct_cntct_id_1,
        null AS crmacct_cntct_id_2,
        null AS crmacct_parent_id,
        null AS crmacct_notes,
        null AS crmacct_taxauth_id,
        crmacct_owner_username 
      FROM crmacct
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION crmacct() IS 'A table function that returns CRM Account results according to privilege settings. Optional boolen for canBrowse can be passed in to view at least partial data for all records.';