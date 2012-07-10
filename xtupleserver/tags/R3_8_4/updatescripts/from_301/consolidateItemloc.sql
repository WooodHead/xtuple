BEGIN;

CREATE OR REPLACE FUNCTION consolidateItemLoc() RETURNS INTEGER AS '
DECLARE
  _r RECORD;

BEGIN

  UPDATE itemloc
  SET itemloc_consolflag = TRUE;

  FOR _r IN SELECT itemloc_itemsite_id, itemloc_location_id,
                   SUM(itemloc_qty) AS itemloc_qty, itemloc_expiration,
                   itemloc_ls_id, itemloc_warrpurc
            FROM itemloc
            WHERE itemloc_consolflag
            GROUP BY itemloc_itemsite_id, itemloc_location_id,
                     itemloc_expiration, itemloc_ls_id, itemloc_warrpurc
            LOOP
    INSERT INTO itemloc (
      itemloc_itemsite_id, itemloc_location_id, itemloc_qty,
      itemloc_lotserial,
      itemloc_expiration, itemloc_consolflag, itemloc_ls_id, itemloc_warrpurc
    ) VALUES (
      _r.itemloc_itemsite_id, _r.itemloc_location_id, _r.itemloc_qty,
      NULL,
      _r.itemloc_expiration, FALSE, _r.itemloc_ls_id, _r.itemloc_warrpurc);
  END LOOP;

  DELETE FROM itemloc
  WHERE (itemloc_consolflag);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

SELECT * FROM itemloc ORDER BY itemloc_itemsite_id, itemloc_location_id;
SELECT consolidateItemLoc();
SELECT * FROM itemloc ORDER BY itemloc_itemsite_id, itemloc_location_id;

COMMIT;
