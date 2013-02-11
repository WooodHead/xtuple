ALTER TABLE invchead ADD COLUMN invchead_saletype_id INTEGER REFERENCES saletype(saletype_id);
ALTER TABLE invchead ADD COLUMN invchead_shipzone_id INTEGER REFERENCES shipzone(shipzone_id);

UPDATE invchead SET invchead_shipzone_id=(SELECT shipto_shipzone_id FROM shiptoinfo WHERE shipto_id=invchead_shipto_id);

COMMENT ON COLUMN invchead.invchead_saletype_id IS 'Associated sale type for invoice.';
COMMENT ON COLUMN invchead.invchead_shipzone_id IS 'Associated shipping zone for invoice.';
