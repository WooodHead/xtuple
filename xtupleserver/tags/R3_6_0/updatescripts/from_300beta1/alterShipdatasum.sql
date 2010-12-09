BEGIN;

ALTER TABLE shipdatasum ADD COLUMN shipdatasum_shiphead_number TEXT REFERENCES shiphead(shiphead_number); 
ALTER TABLE shipdatasum ADD COLUMN shipdatasum_base_freight_curr_id INTEGER REFERENCES curr_symbol(curr_id) DEFAULT basecurrid();
ALTER TABLE shipdatasum ADD COLUMN shipdatasum_total_freight_curr_id INTEGER REFERENCES curr_symbol(curr_id) DEFAULT basecurrid();

COMMIT;
