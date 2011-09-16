CREATE OR REPLACE FUNCTION consolidateLotSerial(INTEGER) RETURNS INTEGER AS $$
DECLARE
  pItemsiteid ALIAS FOR $1;
  _r RECORD;

BEGIN

  UPDATE itemloc
  SET itemloc_consolflag = TRUE
  WHERE (itemloc_itemsite_id=pItemsiteid);

  FOR _r IN SELECT itemloc_location_id, itemloc_ls_id, itemloc_expiration, itemloc_warrpurc, SUM(itemloc_qty) AS qty
            FROM itemloc
            WHERE (itemloc_itemsite_id=pItemsiteid)
            GROUP BY itemloc_location_id, itemloc_ls_id, itemloc_expiration, itemloc_warrpurc LOOP
    INSERT INTO itemloc
    ( itemloc_itemsite_id, itemloc_location_id, itemloc_ls_id,
      itemloc_expiration, itemloc_warrpurc, itemloc_qty, itemloc_consolflag )
    VALUES
    ( pItemsiteid, _r.itemloc_location_id, _r.itemloc_ls_id,
      _r.itemloc_expiration, _r.itemloc_warrpurc, _r.qty, FALSE );
  END LOOP;

  DELETE FROM itemloc
  WHERE ( (itemloc_itemsite_id=pItemsiteid)
   AND (itemloc_consolflag) );

  RETURN 1;

END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION fixlsinv() RETURNS BOOLEAN AS $$
DECLARE
  _row RECORD;
BEGIN
  -- change non-perishable itemlocs
  FOR _row IN
  SELECT itemsite_id
  FROM itemsite JOIN itemloc ON (itemloc_itemsite_id=itemsite_id AND itemloc_expiration <> endOfTime())
  WHERE ((itemsite_controlmethod IN ('L', 'S'))
    AND  (NOT itemsite_perishable))
  GROUP BY itemsite_id LOOP
      UPDATE itemloc SET itemloc_expiration = endOfTime()
      WHERE (itemloc_itemsite_id=_row.itemsite_id);
      PERFORM consolidateLotSerial(_row.itemsite_id);
  END LOOP;

  -- consolidate split lots into the endOfTime row and delete startOfTime row
  FOR _row IN
  SELECT itemloc_itemsite_id, itemloc_location_id, itemloc_ls_id, itemloc_warrpurc, count(*) AS kount, SUM(itemloc_qty) AS totqty
  FROM itemloc
  WHERE (itemloc_expiration=endOfTime()) OR (itemloc_expiration=startOfTime())
  GROUP BY itemloc_itemsite_id, itemloc_location_id, itemloc_ls_id, itemloc_warrpurc LOOP
    IF (_row.kount > 1) THEN
      UPDATE itemloc SET itemloc_qty = _row.totqty
      WHERE (itemloc_itemsite_id=_row.itemloc_itemsite_id)
        AND (itemloc_location_id=_row.itemloc_location_id)
        AND (itemloc_ls_id=_row.itemloc_ls_id)
        AND (COALESCE(itemloc_warrpurc, endOfTime())=COALESCE(_row.itemloc_warrpurc, endOfTime()))
        AND (itemloc_expiration=endOfTime());
      DELETE FROM itemloc
      WHERE (itemloc_itemsite_id=_row.itemloc_itemsite_id)
        AND (itemloc_location_id=_row.itemloc_location_id)
        AND (itemloc_ls_id=_row.itemloc_ls_id)
        AND (COALESCE(itemloc_warrpurc, endOfTime())=COALESCE(_row.itemloc_warrpurc, endOfTime()))
        AND (itemloc_expiration=startOfTime());
    END IF;
  END LOOP;

  -- change all remaining startOfTime rows to endOfTime
  UPDATE itemloc SET itemloc_expiration=endOfTime()
  WHERE itemloc_expiration=startOfTime();

  RETURN TRUE;

END;
$$ LANGUAGE 'plpgsql';

SELECT fixlsinv();
DROP FUNCTION fixlsinv();

CREATE OR REPLACE FUNCTION _itemlocFixTrigger () RETURNS TRIGGER AS $$
DECLARE
  _row RECORD;
BEGIN

  -- find any existing itemlocs that match, merge into new row and delete old rows
  FOR _row IN
  SELECT *
  FROM itemloc
  WHERE ( (itemloc_id <> NEW.itemloc_id)
    AND   (itemloc_itemsite_id=NEW.itemloc_itemsite_id)
    AND   (itemloc_location_id=NEW.itemloc_location_id)
    AND   (itemloc_ls_id=NEW.itemloc_ls_id)
    AND   (COALESCE(itemloc_warrpurc, endOfTime())=COALESCE(NEW.itemloc_warrpurc, endOfTime()))
    AND   (NEW.itemloc_expiration=endOfTime() OR NEW.itemloc_expiration=startOfTime())
    AND   (itemloc_expiration=endOfTime() OR itemloc_expiration=startOfTime()) ) LOOP
      UPDATE itemloc SET itemloc_qty = itemloc_qty + _row.itemloc_qty
      WHERE (itemloc_id=NEW.itemloc_id);
      DELETE FROM itemloc
      WHERE (itemloc_id=_row.itemloc_id);
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('trigger', 'itemlocFixTrigger');
CREATE TRIGGER itemlocFixTrigger AFTER INSERT ON itemloc FOR EACH ROW EXECUTE PROCEDURE _itemlocFixTrigger();
