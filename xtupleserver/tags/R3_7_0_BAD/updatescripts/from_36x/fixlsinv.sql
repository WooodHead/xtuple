CREATE OR REPLACE FUNCTION fixlsinv() RETURNS BOOLEAN AS $$
DECLARE
  _row RECORD;
BEGIN
  -- first consolidate split lots into the endOfTime row and delete startOfTime row
  FOR _row IN
  SELECT itemloc_itemsite_id, itemloc_location_id, itemloc_ls_id, count(*) AS kount, SUM(itemloc_qty) AS totqty
  FROM itemloc
  WHERE (itemloc_expiration=endOfTime()) OR (itemloc_expiration=startOfTime())
  GROUP BY itemloc_itemsite_id, itemloc_location_id, itemloc_ls_id LOOP
    IF (_row.kount > 1) THEN
      UPDATE itemloc SET itemloc_qty = _row.totqty
      WHERE (itemloc_itemsite_id=_row.itemloc_itemsite_id)
        AND (itemloc_location_id=_row.itemloc_location_id)
        AND (itemloc_ls_id=_row.itemloc_ls_id)
        AND (itemloc_expiration=endOfTime());
      DELETE FROM itemloc
      WHERE (itemloc_itemsite_id=_row.itemloc_itemsite_id)
        AND (itemloc_location_id=_row.itemloc_location_id)
        AND (itemloc_ls_id=_row.itemloc_ls_id)
        AND (itemloc_expiration=startOfTime());
    END IF;
  END LOOP;

  -- now change all remaining startOfTime rows to endOfTime
  UPDATE itemloc SET itemloc_expiration=endOfTime()
  WHERE itemloc_expiration=startOfTime();

  RETURN TRUE;

END;
$$ LANGUAGE 'plpgsql';

SELECT fixlsinv();
DROP FUNCTION fixlsinv();
