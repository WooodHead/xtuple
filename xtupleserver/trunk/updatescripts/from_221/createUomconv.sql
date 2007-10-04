
CREATE TABLE uomconv (
  uomconv_id SERIAL PRIMARY KEY,
  uomconv_from_uom_id INTEGER NOT NULL REFERENCES uom(uom_id),
  uomconv_from_value NUMERIC(20, 10) NOT NULL,
  uomconv_to_uom_id INTEGER NOT NULL REFERENCES uom(uom_id),
  uomconv_to_value NUMERIC(20, 10) NOT NULL,
  uomconv_fractional BOOLEAN NOT NULL DEFAULT FALSE
);

REVOKE ALL ON TABLE uomconv FROM PUBLIC;
GRANT  ALL ON TABLE uomconv TO   mfgadmin;
GRANT  ALL ON TABLE uomconv TO   GROUP openmfg;

REVOKE ALL ON TABLE uomconv_uomconv_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE uomconv_uomconv_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE uomconv_uomconv_id_seq TO   GROUP openmfg;

COMMENT ON TABLE uomconv IS 'UOM conversion information. From Unit to To Unit with a value per ratio.';
