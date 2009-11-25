
CREATE OR REPLACE FUNCTION explodeKit(INTEGER, INTEGER, INTEGER, INTEGER, NUMERIC) RETURNS INTEGER AS $$
DECLARE
  pSoheadid ALIAS FOR $1;
  pLinenumber ALIAS FOR $2;
  pSubnumber ALIAS FOR $3;
  pItemsiteid ALIAS FOR $4;
  pQty ALIAS FOR $5;
  _subnumber INTEGER := COALESCE(pSubnumber,0);
  _revid INTEGER;
  _itemid INTEGER;
  _warehousid INTEGER;
  _item RECORD;
BEGIN

  SELECT getActiveRevId('BOM',itemsite_item_id), itemsite_warehous_id, itemsite_item_id
    INTO _revid, _warehousid, _itemid
    FROM itemsite
   WHERE(itemsite_id=pItemsiteid);
  IF(NOT FOUND) THEN
    RAISE EXCEPTION 'No Item Site for the specified line was found.';
  END IF;

  FOR _item IN
  SELECT bomitem_id, 
         itemsite_id,
         itemsite_warehous_id,
         COALESCE((itemsite_active AND item_active), false) AS active,
         COALESCE((itemsite_sold AND item_sold), false) AS sold,
         item_id,
         item_type,
         item_price_uom_id,
         bomitem_uom_id,
         itemuomtouomratio(item_id, bomitem_uom_id, item_inv_uom_id) AS invuomratio,
         roundQty(itemuomfractionalbyuom(bomitem_item_id, bomitem_uom_id), (bomitem_qtyper * pQty * (1 + bomitem_scrap))) AS qty
    FROM bomitem, item LEFT OUTER JOIN itemsite ON ((itemsite_item_id=item_id) AND (itemsite_warehous_id=_warehousid))
   WHERE((bomitem_parent_item_id=_itemid)
     AND (bomitem_item_id=item_id)
     AND (bomitem_rev_id=_revid)
     AND (CURRENT_DATE BETWEEN bomitem_effective AND (bomitem_expires - 1))) LOOP
    IF (NOT _item.active) THEN
      RAISE EXCEPTION 'One or more of the components for the kit is inactive for the selected item site.';
    ELSIF (NOT _item.sold) THEN
      RAISE EXCEPTION 'One or more of the components for the kit is not sold for the selected item site.';
    ELSIF (_item.item_type='F') THEN
      SELECT explodeKit(pSoheadid, pLinenumber, _subnumber, _item.itemsite_id, _item.qty)
        INTO _subnumber;
    ELSE
      _subnumber := _subnumber + 1;
      INSERT INTO coitem
            (coitem_cohead_id,
             coitem_linenumber, coitem_subnumber,
             coitem_itemsite_id, coitem_status,
             coitem_scheddate, coitem_promdate,
             coitem_qtyord, coitem_qty_uom_id, coitem_qty_invuomratio,
             coitem_qtyshipped, coitem_qtyreturned,
             coitem_unitcost, coitem_custprice,
             coitem_price, coitem_price_uom_id, coitem_price_invuomratio,
             coitem_order_type, coitem_order_id,
             coitem_custpn, coitem_memo,
             coitem_prcost)
      VALUES(pSoheadid,
             pLinenumber, _subnumber,
             _item.itemsite_id, 'O',
             CURRENT_DATE, NULL,
             _item.qty, _item.bomitem_uom_id, _item.invuomratio,
             0, 0,
             stdCost(_item.item_id), 0,
             0, _item.item_price_uom_id, 1,
             '', -1,
             '', '',
             0);
    END IF;
  END LOOP;

  RETURN _subnumber;
END;
$$ LANGUAGE 'plpgsql';

