
CREATE TABLE itemuomconv (
  itemuomconv_id SERIAL PRIMARY KEY,
  itemuomconv_item_id INTEGER NOT NULL REFERENCES item(item_id),
  itemuomconv_from_uom_id INTEGER NOT NULL REFERENCES uom(uom_id),
  itemuomconv_from_value NUMERIC(20, 10) NOT NULL,
  itemuomconv_to_uom_id INTEGER NOT NULL REFERENCES uom(uom_id),
  itemuomconv_to_value NUMERIC(20, 10) NOT NULL,
  itemuomconv_fractional BOOLEAN NOT NULL DEFAULT FALSE
);

REVOKE ALL ON TABLE itemuomconv FROM PUBLIC;
GRANT  ALL ON TABLE itemuomconv TO   mfgadmin;
GRANT  ALL ON TABLE itemuomconv TO   GROUP openmfg;

REVOKE ALL ON TABLE itemuomconv_itemuomconv_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE itemuomconv_itemuomconv_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE itemuomconv_itemuomconv_id_seq TO   GROUP openmfg;

COMMENT ON TABLE itemuomconv IS 'UOM conversion information. From Unit to To Unit with a value per.';
