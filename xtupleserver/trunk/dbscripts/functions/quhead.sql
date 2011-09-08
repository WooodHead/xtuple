CREATE OR REPLACE FUNCTION quhead() RETURNS SETOF quhead AS $$
DECLARE
  _row quhead%ROWTYPE;

BEGIN
  FOR _row IN SELECT * FROM quhead(false)
  LOOP
    RETURN NEXT _row;
  END LOOP;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION quhead(boolean) RETURNS SETOF quhead AS $$
DECLARE
  pCanBrowse ALIAS FOR $1;
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
      SELECT * FROM quhead 
      WHERE quhead_owner_username = getEffectiveXtUser()
    LOOP
      RETURN NEXT _row;
    END LOOP;
    -- Allow partial view data they don't own if browsing enabled
    IF(pCanBrowse) THEN
      FOR _row IN 
        SELECT quhead_id, 
          quhead_number, 
          null AS quhead_cust_id,
          null AS quhead_quotedate,
          null AS quhead_shipto_id,
          null AS quhead_shiptoname,
          null AS quhead_shiptoaddress1,
          null AS quhead_shiptoaddress2,
          null AS quhead_shiptoaddress3,
          null AS quhead_shiptocity,
          null AS quhead_shiptostate,
          null AS quhead_shiptozipcode,
          null AS quhead_shiptophone,
          null AS quhead_salesrep_id,
          null AS quhead_terms_id,
          null AS quhead_origin,
          null AS quhead_freight,
          null AS quhead_ordercomments,
          null AS quhead_shipcomments,
          quhead_billtoname,
          null AS quhead_billtoaddress1,
          null AS quhead_billtoaddress2,
          null AS quhead_billtoaddress3,
          null AS quhead_billtocity,
          null AS quhead_billtostate,
          null AS quhead_billtozip,
          null AS quhead_commission,
          null AS quhead_custponumber,
          null AS quhead_fob,
          null AS quhead_shipvia,
          null AS quhead_warehous_id,
          null AS quhead_packdate,
          null AS quhead_prj_id,
          null AS quhead_misc,
          null AS quhead_misc_accnt_id,
          null AS quhead_misc_descrip,
          null AS quhead_billtocountry,
          null AS quhead_shiptocountry,
          null AS quhead_curr_id,
          null AS quhead_imported,
          null AS quhead_expire,
          null AS quhead_calcfreight,
          null AS quhead_shipto_cntct_id,
          null AS quhead_shipto_cntct_honorific,
          null AS quhead_shipto_cntct_first_name,
          null AS quhead_shipto_cntct_middle,
          null AS quhead_shipto_cntct_last_name,
          null AS quhead_shipto_cntct_suffix,
          null AS quhead_shipto_cntct_phone,
          null AS quhead_shipto_cntct_title,
          null AS quhead_shipto_cntct_fax,
          null AS quhead_shipto_cntct_email,
          null AS quhead_billto_cntct_id,
          null AS quhead_billto_cntct_honorific,
          null AS quhead_billto_cntct_first_name,
          null AS quhead_billto_cntct_middle,
          null AS quhead_billto_cntct_last_name,
          null AS quhead_billto_cntct_suffix,
          null AS quhead_billto_cntct_phone,
          null AS quhead_billto_cntct_title,
          null AS quhead_billto_cntct_fax,
          null AS quhead_billto_cntct_email,
          null AS quhead_taxzone_id,
          null AS quhead_taxtype_id,
          null AS quhead_ophead_id,
          quhead_status,
          quhead_owner_username
        FROM quhead 
        WHERE COALESCE(quhead_owner_username,'') != getEffectiveXtUser()
      LOOP
        RETURN NEXT _row;
      END LOOP;
    END IF;
  -- No privilege so only allow basic browsing info if specified
  ELSIF(pCanBrowse) THEN
    FOR _row IN 
      SELECT quhead_id, 
        quhead_number, 
        null AS quhead_cust_id,
        null AS quhead_quotedate,
        null AS quhead_shipto_id,
        null AS quhead_shiptoname,
        null AS quhead_shiptoaddress1,
        null AS quhead_shiptoaddress2,
        null AS quhead_shiptoaddress3,
        null AS quhead_shiptocity,
        null AS quhead_shiptostate,
        null AS quhead_shiptozipcode,
        null AS quhead_shiptophone,
        null AS quhead_salesrep_id,
        null AS quhead_terms_id,
        null AS quhead_origin,
        null AS quhead_freight,
        null AS quhead_ordercomments,
        null AS quhead_shipcomments,
        quhead_billtoname,
        null AS quhead_billtoaddress1,
        null AS quhead_billtoaddress2,
        null AS quhead_billtoaddress3,
        null AS quhead_billtocity,
        null AS quhead_billtostate,
        null AS quhead_billtozip,
        null AS quhead_commission,
        null AS quhead_custponumber,
        null AS quhead_fob,
        null AS quhead_shipvia,
        null AS quhead_warehous_id,
        null AS quhead_packdate,
        null AS quhead_prj_id,
        null AS quhead_misc,
        null AS quhead_misc_accnt_id,
        null AS quhead_misc_descrip,
        null AS quhead_billtocountry,
        null AS quhead_shiptocountry,
        null AS quhead_curr_id,
        null AS quhead_imported,
        null AS quhead_expire,
        null AS quhead_calcfreight,
        null AS quhead_shipto_cntct_id,
        null AS quhead_shipto_cntct_honorific,
        null AS quhead_shipto_cntct_first_name,
        null AS quhead_shipto_cntct_middle,
        null AS quhead_shipto_cntct_last_name,
        null AS quhead_shipto_cntct_suffix,
        null AS quhead_shipto_cntct_phone,
        null AS quhead_shipto_cntct_title,
        null AS quhead_shipto_cntct_fax,
        null AS quhead_shipto_cntct_email,
        null AS quhead_billto_cntct_id,
        null AS quhead_billto_cntct_honorific,
        null AS quhead_billto_cntct_first_name,
        null AS quhead_billto_cntct_middle,
        null AS quhead_billto_cntct_last_name,
        null AS quhead_billto_cntct_suffix,
        null AS quhead_billto_cntct_phone,
        null AS quhead_billto_cntct_title,
        null AS quhead_billto_cntct_fax,
        null AS quhead_billto_cntct_email,
        null AS quhead_taxzone_id,
        null AS quhead_taxtype_id,
        null AS quhead_ophead_id,
        quhead_status,
        quhead_owner_username 
      FROM quhead
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION quhead() IS 'A table function that returns Quote results according to privilege settings. Optional boolen for canBrowse can be passed in to view at least partial data for all records.';