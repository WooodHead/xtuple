CREATE OR REPLACE FUNCTION deleteItem(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemid ALIAS FOR $1;
  _result INTEGER;
  _routings BOOLEAN;
  _bbom BOOLEAN;

BEGIN

  SELECT metric_value=''t'' INTO _bbom
    FROM metric
   WHERE (metric_name=''BBOM'');

  SELECT metric_value=''t'' INTO _routings
    FROM metric
   WHERE (metric_name=''Routings'');

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

  IF(_bbom) THEN
    SELECT bbomitem_id INTO _result
    FROM bbomitem
    WHERE (bbomitem_item_id=pItemid)
    LIMIT 1;
    IF (FOUND) THEN
      RETURN -4;
    END IF;
  END IF;

  SELECT assitem_id INTO _result
  FROM assitem
  WHERE (assitem_item_id=pItemid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -5;
  END IF;

  IF (fetchmetricbool(''RevControl'')) THEN
    SELECT rev_id INTO _result
    FROM rev
    WHERE ((rev_target_id=pItemid)
    AND (rev_target_type IN (''BOM'',''BOO'')))
    LIMIT 1;
    IF (FOUND) THEN
      RETURN -6;
    END IF;
  END IF;

  DELETE FROM bomhead
  WHERE (bomhead_item_id=pItemid);
  DELETE FROM bomitem
  WHERE (bomitem_item_id=pItemid);

  IF (_routings) THEN
    DELETE FROM boohead
    WHERE (boohead_item_id=pItemid);
  END IF;

  IF (_bbom) THEN
    DELETE FROM bbomitem
    WHERE (bbomitem_parent_item_id=pItemid);
    DELETE FROM bbomitem
    WHERE (bbomitem_item_id=pItemid);
  END IF;

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

  DELETE FROM imageass
  WHERE ( (imageass_source=''I'')
    AND   (imageass_source_id=pItemid) );

  DELETE FROM locitem
  WHERE (locitem_item_id=pItemid);

  DELETE FROM itemtax
   WHERE(itemtax_item_id=pItemid);

  DELETE FROM itemsite
  WHERE (itemsite_item_id=pItemid);

  DELETE FROM itemuom
   WHERE(itemuom_itemuomconv_id IN (SELECT itemuomconv_id
                                      FROM itemuomconv
                                     WHERE(itemuomconv_item_id=pItemid)));

  DELETE FROM itemuomconv
   WHERE(itemuomconv_item_id=pItemid);

  DELETE FROM item
  WHERE (item_id=pItemid);

  RETURN 0;

END;
' LANGUAGE 'plpgsql';
