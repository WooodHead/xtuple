ALTER TABLE cmhead ADD COLUMN cmhead_saletype_id INTEGER REFERENCES saletype(saletype_id);
ALTER TABLE cmhead ADD COLUMN cmhead_shipzone_id INTEGER REFERENCES shipzone(shipzone_id);

UPDATE cmhead SET cmhead_shipzone_id=(SELECT shipto_shipzone_id FROM shiptoinfo WHERE shipto_id=cmhead_shipto_id);

COMMENT ON COLUMN cmhead.cmhead_saletype_id IS 'Associated sale type for credit memo.';
COMMENT ON COLUMN cmhead.cmhead_shipzone_id IS 'Associated shipping zone for credit memo.';
