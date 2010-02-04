CREATE OR REPLACE FUNCTION deleteOpenRecurringItems(INTEGER, TEXT, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS $$
DECLARE
  pParentid     ALIAS FOR $1;
  pType         TEXT := UPPER($2);
  pDatetime     TIMESTAMP WITH TIME ZONE := COALESCE($3, startOfTime());

  _count        INTEGER := 0;
BEGIN
  IF (pParentid IS NULL) THEN
    RETURN -11;
  END IF;

  IF (pType = 'TODO') THEN
    DELETE FROM todoitem
     WHERE ((todoitem_completed_date IS NULL)
        AND (todoitem_due_date >= pDatetime)
        AND (todoitem_recurring_todoitem_id=pParentid)
        AND (todoitem_id!=pParentid));
    GET DIAGNOSTICS _count = ROW_COUNT;
  ELSE
    RETURN -10; -- pType not handled
  END IF;

  RETURN _count;
END;
$$ LANGUAGE 'plpgsql';
