ALTER TABLE cohead ADD COLUMN cohead_saletype_id INTEGER REFERENCES saletype(saletype_id);
ALTER TABLE cohead ADD COLUMN cohead_shipzone_id INTEGER REFERENCES shipzone(shipzone_id);

UPDATE cohead SET cohead_shipzone_id=(SELECT shipto_shipzone_id FROM shiptoinfo WHERE shipto_id=cohead_shipto_id);

COMMENT ON COLUMN cohead.cohead_saletype_id IS 'Associated sale type for sales order.';
COMMENT ON COLUMN cohead.cohead_shipzone_id IS 'Associated shipping zone for sales order.';
