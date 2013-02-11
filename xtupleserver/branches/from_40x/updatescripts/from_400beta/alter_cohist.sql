ALTER TABLE cohist ADD COLUMN cohist_cohead_ccpay_id INTEGER REFERENCES ccpay(ccpay_id);

COMMENT ON COLUMN cohist.cohist_cohead_ccpay_id IS 'Credit card payments made at sales order time (as opposed to invoice time) need special treatment. This field allows checking for this case.';
