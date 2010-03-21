
CREATE TABLE itemuom (
  itemuom_id SERIAL PRIMARY KEY,
  itemuom_itemuomconv_id INTEGER NOT NULL REFERENCES itemuomconv(itemuomconv_id),
  itemuom_uomtype_id INTEGER NOT NULL REFERENCES uomtype(uomtype_id)
);

REVOKE ALL ON TABLE itemuom FROM PUBLIC;
GRANT  ALL ON TABLE itemuom TO   mfgadmin;
GRANT  ALL ON TABLE itemuom TO   GROUP openmfg;

REVOKE ALL ON TABLE itemuom_itemuom_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE itemuom_itemuom_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE itemuom_itemuom_id_seq TO   GROUP openmfg;

COMMENT ON TABLE itemuom IS 'A UOM type relation for a specific conversion.';
