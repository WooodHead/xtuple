CREATE OR REPLACE FUNCTION openRecurringItems(INTEGER, TEXT, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS $$
DECLARE
  pParentid  ALIAS FOR $1;
  pType      TEXT := UPPER($2);
  pDatetime  TIMESTAMP WITH TIME ZONE := COALESCE($3, CURRENT_TIMESTAMP);

  _count     INTEGER := -1;

BEGIN
  IF (pParentid IS NULL) THEN
    RETURN -11;
  END IF;
  
  -- TODO: special case for now
  IF (pType = 'INVOICE') THEN
    RETURN -12;

  ELSIF (pType = 'TODO') THEN
    SELECT COUNT(*) INTO _count
      FROM todoitem
     WHERE ((todoitem_completed_date IS NULL)
        AND (todoitem_due_date >= pDatetime)
        AND (todoitem_recurring_todoitem_id=pParentid));

  ELSIF (pType = 'INCDT') THEN
    SELECT COUNT(*) INTO _count
      FROM incdt
     WHERE ((incdt_status='N') -- cLosed
        AND (incdt_timestamp>=pDatetime)
        AND (incdt_recurring_incdt_id=pParentid));

  ELSIF (pType = 'J') THEN
    SELECT COUNT(*) INTO _count
      FROM prj
     WHERE ((prj_completed_date IS NULL)
        AND (prj_due_date >= pDatetime)
        AND (prj_recurring_prj_id=pParentid));

  ELSE
    RETURN -10; -- unrecognized pType

  END IF;

  RETURN _count;
END;
$$ LANGUAGE 'plpgsql';
