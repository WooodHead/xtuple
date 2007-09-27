BEGIN;
UPDATE item SET item_invuom=UPPER(item_invuom),
                item_priceuom=UPPER(item_priceuom),
                item_capuom=UPPER(item_capuom),
                item_altcapuom=UPPER(item_altcapuom);
UPDATE item SET item_capinvrat=1.0 WHERE (COALESCE(item_capinvrat,0)=0);
UPDATE item SET item_altcapinvrat=1.0 WHERE (COALESCE(item_altcapinvrat,0)=0);
UPDATE item SET item_shipinvrat=1.0 WHERE (COALESCE(item_shipinvrat,0)=0);
UPDATE item SET item_invpricerat=1.0 WHERE (COALESCE(item_invpricerat,0)=0);

INSERT INTO uom (uom_name) SELECT DISTINCT item_invuom FROM item EXCEPT SELECT DISTINCT uom_name FROM uom;
INSERT INTO uom (uom_name) SELECT DISTINCT item_priceuom FROM item WHERE item_invpricerat!=1.0 EXCEPT SELECT DISTINCT uom_name FROM uom;
INSERT INTO uom (uom_name) SELECT DISTINCT item_capuom FROM item WHERE item_capinvrat!=1.0 EXCEPT SELECT DISTINCT uom_name FROM uom;
INSERT INTO uom (uom_name) SELECT DISTINCT item_altcapuom FROM item WHERE item_altcapinvrat!=1.0 EXCEPT SELECT DISTINCT uom_name FROM uom;
INSERT INTO uom (uom_name) SELECT DISTINCT item_shipuom FROM item WHERE item_shipinvrat!=1.0 EXCEPT SELECT DISTINCT uom_name FROM uom;

ALTER TABLE item ADD COLUMN item_inv_uom_id INTEGER;
ALTER TABLE item ADD FOREIGN KEY (item_inv_uom_id) REFERENCES uom(uom_id);
UPDATE item SET item_inv_uom_id=uom_id FROM uom WHERE (item_invuom=uom_name);
ALTER TABLE item ALTER COLUMN item_inv_uom_id SET NOT NULL;

ALTER TABLE item ADD COLUMN item_price_uom_id INTEGER;
ALTER TABLE item ADD FOREIGN KEY (item_price_uom_id) REFERENCES uom(uom_id);
UPDATE item SET item_price_uom_id=item_inv_uom_id WHERE (item_invpricerat=1.0);
UPDATE item SET item_price_uom_id=uom_id FROM uom WHERE ((item_priceuom=uom_name) AND (item_invpricerat!=1.0));
ALTER TABLE item ALTER COLUMN item_price_uom_id SET NOT NULL;

COMMIT;

CREATE OR REPLACE FUNCTION convertItemUOMValues() RETURNS BOOLEAN AS '
DECLARE
  _sellid INTEGER;
  _capid INTEGER;
  _altcapid INTEGER;
  _item RECORD;
  _itemuomconvid INTEGER;
  _uomid INTEGER;
BEGIN
  SELECT uomtype_id INTO _sellid FROM uomtype WHERE uomtype_name=''Selling'';
  SELECT uomtype_id INTO _capid FROM uomtype WHERE uomtype_name=''Capacity'';
  SELECT uomtype_id INTO _altcapid FROM uomtype WHERE uomtype_name=''AltCapacity'';

  IF(_sellid IS NULL OR _capid IS NULL OR _altcapid IS NULL) THEN
    RAISE EXCEPTION ''Could not find one or more of the predefined uomtype values.'';
  END IF;

  FOR _item IN SELECT item_id, item_inv_uom_id, uom_name, item_fractional,
                      item_price_uom_id, item_invpricerat,
                      item_capuom, item_capinvrat,
                      item_altcapuom, item_altcapinvrat,
                      item_shipuom, item_shipinvrat
                 FROM item JOIN uom ON (item_inv_uom_id=uom_id) LOOP

    IF(_item.item_invpricerat!=1.0 AND _item.item_price_uom_id!=_item.item_inv_uom_id) THEN
      SELECT nextval(''itemuomconv_itemuomconv_id_seq'') INTO _itemuomconvid;
      INSERT INTO itemuomconv (itemuomconv_id, itemuomconv_item_id, itemuomconv_to_uom_id, itemuomconv_ratio, item_uomconv_fractional)
           VALUES(_itemuomconvid, _item.item_id, _item.item_price_uom_id, _item.item_invpricerat, _item.item_fractional);
      INSERT INTO itemuom (itemuom_itemuomconv_id, itemuom_uomtype_id) VALUES(_itemuomconvid, _sellid);
    END IF;

    IF(_item.item_capinvrat!=1.0 AND _item.item_capuom!=_item.uom_name) THEN
      SELECT uom_id INTO _uomid FROM uom WHERE (uom_name=_item.capuom);
      IF(_uomid IS NULL) THEN
        RAISE EXCEPTION ''There was an error looking up a UOM.'';
      END IF;

      SELECT itemuomconv_id INTO _itemuomconvid FROM itemuomconv WHERE ((itemuomconv_item_id=_item.item_id) AND (itemuomconv_to_uom_id=_uomid));
      IF(_itemuomconvid IS NULL) THEN
        SELECT nextval(''itemuomconv_itemuomconv_id_seq'') INTO _itemuomconvid;
        INSERT INTO itemuomconv (itemuomconv_id, itemuomconv_item_id, itemuomconv_to_uom_id, itemuomconv_ratio, item_uomconv_fractional)
             VALUES(_itemuomconvid, _item.item_id, _uomid, _item.item_capinvrat, _item.item_fractional);
      END IF;
      INSERT INTO itemuom (itemuom_itemuomconv_id, itemuom_uomtype_id) VALUES(_itemuomconvid, _capid);
    END IF;

    IF(_item.item_altcapinvrat!=1.0 AND _item.item_altcapuom!=_item.uom_name) THEN
      SELECT uom_id INTO _uomid FROM uom WHERE (uom_name=_item.altcapuom);
      IF(_uomid IS NULL) THEN
        RAISE EXCEPTION ''There was an error looking up a UOM.'';
      END IF;

      SELECT itemuomconv_id INTO _itemuomconvid FROM itemuomconv WHERE ((itemuomconv_item_id=_item.item_id) AND (itemuomconv_to_uom_id=_uomid));
      IF(_itemuomconvid IS NULL) THEN
        SELECT nextval(''itemuomconv_itemuomconv_id_seq'') INTO _itemuomconvid;
        INSERT INTO itemuomconv (itemuomconv_id, itemuomconv_item_id, itemuomconv_to_uom_id, itemuomconv_ratio, item_uomconv_fractional)
             VALUES(_itemuomconvid, _item.item_id, _uomid, _item.item_altcapinvrat, _item.item_fractional);
      END IF;
      INSERT INTO itemuom (itemuom_itemuomconv_id, itemuom_uomtype_id) VALUES(_itemuomconvid, _altcapid);
    END IF;

    IF(_item.item_shipinvrat!=1.0 AND _item.item_shipuom!=_item.uom_name) THEN
      SELECT uom_id INTO _uomid FROM uom WHERE (uom_name=_item.shipuom);
      IF(_uomid IS NULL) THEN
        RAISE EXCEPTION ''There was an error looking up a UOM.'';
      END IF;

      SELECT itemuomconv_id INTO _itemuomconvid FROM itemuomconv WHERE ((itemuomconv_item_id=_item.item_id) AND (itemuomconv_to_uom_id=_uomid));
      IF(_itemuomconvid IS NULL) THEN
        SELECT nextval(''itemuomconv_itemuomconv_id_seq'') INTO _itemuomconvid;
        INSERT INTO itemuomconv (itemuomconv_id, itemuomconv_item_id, itemuomconv_to_uom_id, itemuomconv_ratio, item_uomconv_fractional)
             VALUES(_itemuomconvid, _item.item_id, _uomid, _item.item_shipinvrat, _item.item_fractional);
      END IF;
      INSERT INTO itemuom (itemuom_itemuomconv_id, itemuom_uomtype_id) VALUES(_itemuomconvid, _sellid);
    END IF;

  END LOOP;

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';

SELECT convertItemUOMValues();
DROP FUNCTION convertItemUOMValues();

