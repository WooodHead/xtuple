CREATE OR REPLACE FUNCTION releasePurchaseOrder(INTEGER) RETURNS INTEGER AS $$
DECLARE
  pPoheadid ALIAS FOR $1;

BEGIN

  IF ( ( SELECT (COUNT(*) = 0)
         FROM poitem
         WHERE ( (poitem_pohead_id=pPoheadid)
           AND   (poitem_status='U') ) ) ) THEN
    RETURN -1;
  END IF;

  IF ( ( SELECT (pohead_status='U')
         FROM pohead
         WHERE (pohead_id=pPoheadid) ) ) THEN

    UPDATE pohead
    SET pohead_status='O'
    WHERE (pohead_id=pPoheadid);

  END IF;

  UPDATE poitem
  SET poitem_status='O'
  WHERE (poitem_pohead_id=pPoheadid);

  RETURN 1;

END;
$$ LANGUAGE 'plpgsql';
