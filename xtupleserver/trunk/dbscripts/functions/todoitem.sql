CREATE OR REPLACE FUNCTION todoitem() RETURNS SETOF todoitem AS $$
DECLARE
  _row todoitem%ROWTYPE;

BEGIN
  FOR _row IN SELECT * FROM todoitem(false)
  LOOP
    RETURN NEXT _row;
  END LOOP;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION todoitem(boolean) RETURNS SETOF todoitem AS $$
DECLARE
  pCanBrowse ALIAS FOR $1;
  _row todoitem%ROWTYPE;
  _priv TEXT;
  _grant BOOLEAN;

BEGIN
  -- This query will give us the most permissive privilege the user has been granted
  SELECT privilege, granted INTO _priv, _grant
  FROM privgranted 
  WHERE privilege IN ('MaintainAllToDoItems','ViewAllToDoItems','MaintainPersonalToDoItems','ViewPersonalToDoItems')
  ORDER BY granted DESC, sequence
  LIMIT 1;

  -- If have an 'All' privilege return all results
  IF (_priv ~ 'All' AND _grant) THEN
    FOR _row IN 
      SELECT * FROM todoitem
    LOOP
      RETURN NEXT _row;
    END LOOP;
  -- Otherwise if have any other grant, must be personal privilege.
  ELSIF (_grant) THEN
    FOR _row IN 
      SELECT * FROM todoitem 
      WHERE todoitem_owner_username = getEffectiveXtUser()
      UNION
      SELECT * FROM todoitem 
      WHERE todoitem_username = getEffectiveXtUser()
    LOOP
      RETURN NEXT _row;
    END LOOP;
    -- Allow partial view data they don't own if browsing enabled
    IF(pCanBrowse) THEN
      FOR _row IN 
        SELECT todoitem_id, 
          todoitem_name, 
          null as todoitem_descrip, 
          null as todoitem_incdt_id, 
          null as todoitem_creator_username, 
          null as todoitem_status, 
          todoitem_active, 
          null as todoitem_start_date,
          null as todoitem_due_date,
          null as todoitem_assigned_date,
          null as todoitem_completed_date,
          null as todoitem_seq,
          null as todoitem_notes,
          null as todoitem_crmacct_id,
          null as todoitem_ophead_id,
          todoitem_owner_username 
        FROM todoitem 
        WHERE COALESCE(todoitem_owner_username,'') != getEffectiveXtUser()
          AND COALESCE(todoitem_username,'') != getEffectiveXtUser()
      LOOP
        RETURN NEXT _row;
      END LOOP;
    END IF;
  -- No privilege so only allow basic browsing info if specified
  ELSIF(pCanBrowse) THEN
    FOR _row IN 
      SELECT todoitem_id, 
          todoitem_name, 
          null as todoitem_descrip, 
          null as todoitem_incdt_id, 
          null as todoitem_creator_username, 
          null as todoitem_status, 
          todoitem_active, 
          null as todoitem_start_date,
          null as todoitem_due_date,
          null as todoitem_assigned_date,
          null as todoitem_completed_date,
          null as todoitem_seq,
          null as todoitem_notes,
          null as todoitem_crmacct_id,
          null as todoitem_ophead_id,
          todoitem_owner_username 
      FROM todoitem
    LOOP
      RETURN NEXT _row;
    END LOOP;
  END IF;

  RETURN;

END;
$$ LANGUAGE 'plpgsql';

COMMENT ON FUNCTION todoitem() IS 'A table function that returns To Do Items results according to privilege settings. Optional boolen for canBrowse can be passed in to view at least partial data for all records.';