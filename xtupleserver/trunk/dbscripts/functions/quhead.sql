CREATE OR REPLACE FUNCTION quhead() RETURNS SETOF quhead AS $$
DECLARE
  _row quhead%ROWTYPE;
  _priv TEXT;
  _grant BOOLEAN;

BEGIN
  -- This query will give us the most permissive privilege the user has been granted
  SELECT privilege, granted INTO _priv, _grant
  FROM privgranted 
  WHERE privilege IN ('MaintainAllQuotes','ViewAllQuotes','MaintainPersonalQuotes','ViewPersonalQuotes')
  ORDER BY granted DESC, sequence
  LIMIT 1;

  -- If have an 'All' privilege return all results
  IF (_priv ~ 'All' AND _grant) THEN
    FOR _row IN 
      SELECT * FROM quhead
    LOOP
      RETURN NEXT _row;
    END LOOP;
  -- Otherwise if have any other grant, must be personal privilege.
  ELSIF (_grant) THEN
    FOR _row IN 
      SELECT quhead.* FROM quhead
        JOIN salesrep ON quhead_salesrep_id=salesrep_id
        JOIN crmacct ON salesrep_id=crmacct_salesrep_id
      WHERE getEffectiveXtUser() IN (quhead_owner_username, crmacct_usr_username)
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION quhead() IS 'A table function that returns Quote results according to privilege settings.';