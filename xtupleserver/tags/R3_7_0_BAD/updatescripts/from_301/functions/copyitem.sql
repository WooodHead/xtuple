CREATE OR REPLACE FUNCTION copyItem(INTEGER, TEXT) RETURNS INTEGER AS '
DECLARE
  pSItemid ALIAS FOR $1;
  pTItemNumber ALIAS FOR $2;
  _itemid INTEGER;
  _r RECORD;
  _id INTEGER;

BEGIN

  SELECT NEXTVAL(''item_item_id_seq'') INTO _itemid;
  INSERT INTO item
  ( item_id, item_number, item_descrip1, item_descrip2,
    item_classcode_id, item_type,
    item_active, item_picklist, item_sold, item_fractional,
    item_maxcost, item_prodweight, item_packweight,
    item_prodcat_id,item_exclusive, item_listprice,
    item_config, item_comments, item_extdescrip,
    item_upccode, item_planning_type,
    item_inv_uom_id, item_price_uom_id )
  SELECT _itemid, pTItemNumber, item_descrip1, item_descrip2,
         item_classcode_id, item_type,
         item_active, item_picklist, item_sold, item_fractional,
         item_maxcost, item_prodweight, item_packweight,
         item_prodcat_id, item_exclusive, item_listprice,
         item_config, item_comments, item_extdescrip,
         item_upccode, item_planning_type,
         item_inv_uom_id, item_price_uom_id
  FROM item
  WHERE (item_id=pSItemid);

  INSERT INTO itemimage
  (itemimage_item_id, itemimage_image_id, itemimage_purpose)
  SELECT _itemid, itemimage_image_id, itemimage_purpose
  FROM itemimage
  WHERE (itemimage_item_id=pSItemid);

  INSERT INTO itemtax
        (itemtax_item_id, itemtax_taxauth_id, itemtax_taxtype_id)
  SELECT _itemid, itemtax_taxauth_id, itemtax_taxtype_id
    FROM itemtax
   WHERE(itemtax_item_id=pSItemid);

  INSERT INTO charass
  ( charass_target_type, charass_target_id,
    charass_char_id, charass_value )
  SELECT ''I'', _itemid, charass_char_id, charass_value
  FROM charass
  WHERE ( (charass_target_type=''I'')
   AND (charass_target_id=pSItemid) );

  FOR _r IN SELECT itemuomconv_id,
                   itemuomconv_from_uom_id,
                   itemuomconv_from_value,
                   itemuomconv_to_uom_id,
                   itemuomconv_to_value,
                   itemuomconv_fractional
              FROM itemuomconv
             WHERE(itemuomconv_item_id=pSItemid) LOOP
    SELECT nextval(''itemuomconv_itemuomconv_id_seq'') INTO _id;
    INSERT INTO itemuomconv
          (itemuomconv_id, itemuomconv_item_id,
           itemuomconv_from_uom_id, itemuomconv_from_value,
           itemuomconv_to_uom_id, itemuomconv_to_value,
           itemuomconv_fractional)
    VALUES(_id, _itemid,
           _r.itemuomconv_from_uom_id, _r.itemuomconv_from_value,
           _r.itemuomconv_to_uom_id, _r.itemuomconv_to_value,
           _r.itemuomconv_fractional);

    INSERT INTO itemuom
          (itemuom_itemuomconv_id, itemuom_uomtype_id)
    SELECT _id, itemuom_uomtype_id
      FROM itemuom
     WHERE(itemuom_itemuomconv_id=_r.itemuomconv_id);
  END LOOP;

  RETURN _itemid;

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION copyItem(integer, text, boolean, boolean, boolean) RETURNS integer AS '
DECLARE
  pSItemid ALIAS FOR $1;
  pTItemNumber ALIAS FOR $2;
  pCopyBOM ALIAS FOR $3;
  pCopyBOO ALIAS FOR $4;
  pCopyCosts ALIAS FOR $5;
BEGIN
  RETURN copyItem(pSItemid, pTItemNumber, pCopyBOM, pCopyBOO, pCopyCosts, FALSE);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION copyItem(integer, text, boolean, boolean, boolean, boolean) RETURNS integer AS '
DECLARE
  pSItemid ALIAS FOR $1;
  pTItemNumber ALIAS FOR $2;
  pCopyBOM ALIAS FOR $3;
  pCopyBOO ALIAS FOR $4;
  pCopyCosts ALIAS FOR $5;
  pCopyUsedAt ALIAS FOR $6;
  _itemid INTEGER;

BEGIN

  SELECT copyItem(pSItemid, pTItemNumber) INTO _itemid;

  IF (pCopyBOM) THEN
    PERFORM copyBOM(pSItemid, _itemid, (pCopyBOO AND pCopyUsedAt));
  END IF;

  IF (pCopyBOO) THEN
    PERFORM copyBOO(pSItemid, _itemid);
  END IF;

  IF (pCopyCosts) THEN
    INSERT INTO itemcost
    ( itemcost_item_id, itemcost_costelem_id, itemcost_lowlevel,
      itemcost_stdcost, itemcost_posted,
      itemcost_actcost, itemcost_curr_id, itemcost_updated )
    SELECT _itemid, itemcost_costelem_id, itemcost_lowlevel,
      itemcost_stdcost, CURRENT_DATE,
      itemcost_actcost, itemcost_curr_id, CURRENT_DATE
    FROM itemcost
    WHERE (itemcost_item_id=pSItemid);
  END IF;

  RETURN _itemid;

END;
' LANGUAGE 'plpgsql';
