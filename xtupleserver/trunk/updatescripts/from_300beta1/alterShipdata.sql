BEGIN;

ALTER TABLE shipdata ADD COLUMN shipdata_shiphead_number TEXT REFERENCES shiphead(shiphead_number); 
ALTER TABLE shipdata ADD COLUMN shipdata_base_freight_curr_id INTEGER REFERENCES curr_symbol(curr_id) DEFAULT basecurrid();
ALTER TABLE shipdata ADD COLUMN shipdata_total_freight_curr_id INTEGER REFERENCES curr_symbol(curr_id) DEFAULT basecurrid();

UPDATE shipdata SET shipdata_shiphead_number=shiphead_number
FROM shiphead JOIN cohead ON ((shiphead_order_id=cohead_id)
                          AND (shiphead_order_type='SO'))
WHERE (TRIM(cohead_number)=TRIM(shipdata_cohead_number));

COMMIT;
