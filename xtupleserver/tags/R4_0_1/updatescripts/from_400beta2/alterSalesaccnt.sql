ALTER TABLE salesaccnt ADD COLUMN salesaccnt_saletype_id INTEGER;
ALTER TABLE salesaccnt ADD COLUMN salesaccnt_shipzone_id INTEGER;

UPDATE salesaccnt SET salesaccnt_saletype_id=-1, salesaccnt_shipzone_id=-1;

COMMENT ON COLUMN salesaccnt.salesaccnt_saletype_id IS 'Associated sale type for sales account.';
COMMENT ON COLUMN salesaccnt.salesaccnt_shipzone_id IS 'Associated shipping zone for sales account.';
