ALTER TABLE cohist ADD COLUMN cohist_saletype_id INTEGER;
ALTER TABLE cohist ADD COLUMN cohist_shipzone_id INTEGER;

UPDATE cohist SET cohist_shipzone_id=(SELECT shipto_shipzone_id FROM shiptoinfo WHERE shipto_id=cohist_shipto_id);

COMMENT ON COLUMN cohist.cohist_saletype_id IS 'Associated sale type for sales history.';
COMMENT ON COLUMN cohist.cohist_shipzone_id IS 'Associated shipping zone for sales history.';
