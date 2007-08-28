CREATE OR REPLACE FUNCTION deleteItem(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  _result INTEGER;

BEGIN

  SELECT bomitem_id INTO _result
  FROM bomitem
  WHERE (bomitem_item_id=pItemid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -1;
  END IF;

  SELECT itemsite_id INTO _result
  FROM itemsite
  WHERE (itemsite_item_id=pItemid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -2;
  END IF;

  SELECT itemsub_id INTO _result
  FROM itemsub
  WHERE (itemsub_sub_item_id=pItemid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -3;
  END IF;

  SELECT bbomitem_id INTO _result
  FROM bbomitem
  WHERE (bbomitem_item_id=pItemid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -4;
  END IF;

  SELECT assitem_id INTO _result
  FROM assitem
  WHERE (assitem_item_id=pItemid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -5;
  END IF;

  DELETE FROM bomhead
  WHERE (bomhead_item_id=pItemid);
  DELETE FROM bomitem
  WHERE (bomitem_parent_item_id=pItemid);
  DELETE FROM bomitem
  WHERE (bomitem_item_id=pItemid);

  DELETE FROM boohead
  WHERE (boohead_item_id=pItemid);

  DELETE FROM bbomitem
  WHERE (bbomitem_parent_item_id=pItemid);
  DELETE FROM bbomitem
  WHERE (bbomitem_item_id=pItemid);

  DELETE FROM asshead
  WHERE (asshead_item_id=pItemid);
  DELETE FROM assitem
  WHERE (assitem_parent_item_id=pItemid);
  DELETE FROM assitem
  WHERE (assitem_item_id=pItemid);

  DELETE FROM itemcost
  WHERE (itemcost_item_id=pItemid);
  DELETE FROM costhist
  WHERE (costhist_item_id=pItemid);

  DELETE FROM itemsub
  WHERE (itemsub_parent_item_id=pItemid);
  DELETE FROM itemsub
  WHERE (itemsub_sub_item_id=pItemid);

  DELETE FROM itematr
  WHERE (itematr_itemopn_id IN (SELECT itemopn_id FROM itemopn WHERE (itemopn_item_id=pItemid)));
  DELETE FROM itemopn
  WHERE (itemopn_item_id=pItemid);

  DELETE FROM itemsrcp
  WHERE (itemsrcp_itemsrc_id IN (SELECT itemsrc_id FROM itemsrc WHERE (itemsrc_item_id=pItemid)));
  DELETE FROM itemsrc
  WHERE (itemsrc_item_id=pItemid);

  DELETE FROM itemalias
  WHERE (itemalias_item_id=pItemid);

  DELETE FROM itemgrpitem
  WHERE (itemgrpitem_item_id=pItemid);

  DELETE FROM ipsitem
  WHERE (ipsitem_item_id=pItemid);

  DELETE FROM itemimage
  WHERE (itemimage_item_id=pItemid);

  DELETE FROM locitem
  WHERE (locitem_item_id=pItemid);

  DELETE FROM itemsite
  WHERE (itemsite_item_id=pItemid);

  DELETE FROM item
  WHERE (item_id=pItemid);

  RETURN 0;

END;
' LANGUAGE 'plpgsql';
