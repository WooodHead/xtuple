BEGIN;

UPDATE itemsite SET itemsite_qtyonhand=COALESCE((
SELECT SUM(itemloc_qty)
FROM itemloc,location
WHERE ((location_netable)
AND (itemloc_itemsite_id=itemsite_id)
AND (itemloc_location_id=location_id))),0)
WHERE (itemsite_loccntrl);

UPDATE itemsite SET itemsite_nnqoh=COALESCE((
SELECT SUM(itemloc_qty)
FROM itemloc,location
WHERE ((NOT location_netable)
AND (itemloc_itemsite_id=itemsite_id)
AND (itemloc_location_id=location_id))),0)
WHERE (itemsite_loccntrl);

COMMIT;