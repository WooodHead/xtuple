ALTER TABLE quhead ADD COLUMN quhead_saletype_id INTEGER REFERENCES saletype(saletype_id);
ALTER TABLE quhead ADD COLUMN quhead_shipzone_id INTEGER REFERENCES shipzone(shipzone_id);

UPDATE quhead SET quhead_shipzone_id=(SELECT shipto_shipzone_id FROM shiptoinfo WHERE shipto_id=quhead_shipto_id);

COMMENT ON COLUMN quhead.quhead_saletype_id IS 'Associated sale type for quote.';
COMMENT ON COLUMN quhead.quhead_shipzone_id IS 'Associated shipping zone for quote.';
