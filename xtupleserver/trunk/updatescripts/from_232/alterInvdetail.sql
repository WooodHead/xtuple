BEGIN;

ALTER TABLE invdetail ADD COLUMN invdetail_warrpurc DATE;
ALTER TABLE invdetail ADD COLUMN invdetail_ls_id INTEGER;
COMMENT ON COLUMN invdetail.invdetail_lotserial IS 'invdetail_lotserial is deprecated';

UPDATE invdetail SET
  invdetail_ls_id=ls_id
FROM ls,itemsite,invhist
WHERE ((ls_number=invdetail_lotserial)
AND (invhist_id=invdetail_invhist_id)
AND (itemsite_id=invhist_itemsite_id)
AND (itemsite_item_id=ls_item_id));

COMMIT;