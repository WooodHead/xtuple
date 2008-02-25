BEGIN;

CREATE TABLE ipsitemchar
(
  ipsitemchar_id SERIAL PRIMARY KEY,
  ipsitemchar_ipsitem_id INTEGER NOT NULL REFERENCES ipsitem (ipsitem_id),
  ipsitemchar_char_id INTEGER NOT NULL REFERENCES char (char_id),
  ipsitemchar_value TEXT NOT NULL,
  ipsitemchar_price NUMERIC (16,4)
);

ALTER TABLE ipsitemchar ADD UNIQUE (ipsitemchar_ipsitem_id, ipsitemchar_char_id, ipsitemchar_value);

REVOKE ALL ON TABLE ipsitemchar FROM PUBLIC;
GRANT  ALL ON TABLE ipsitemchar TO   mfgadmin;
GRANT  ALL ON TABLE ipsitemchar TO   GROUP openmfg;

REVOKE ALL ON TABLE ipsitemchar_ipsitemchar_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE ipsitemchar_ipsitemchar_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE ipsitemchar_ipsitemchar_id_seq TO   GROUP openmfg;

COMMENT ON TABLE ipsitemchar IS 'Item Price Schedule Characteristic Prices.';

COMMIT;