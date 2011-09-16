UPDATE poreject SET poreject_vend_id = NULL WHERE poreject_vend_id < 0;
ALTER TABLE poreject ADD CONSTRAINT poreject_poreject_vend_id_fkey
                                            FOREIGN KEY (poreject_vend_id)
                                            REFERENCES vendinfo (vend_id);

COMMENT ON TABLE poreject IS 'The poreject table describes Purchase Order Items that were returned to Vendors.';
COMMENT ON COLUMN poreject.poreject_id IS 'This is the internal id of this poreject record';
COMMENT ON COLUMN poreject.poreject_date IS 'This is the date and time the return was entered into the database';
COMMENT ON COLUMN poreject.poreject_ponumber IS 'This is the number of the original Purchase Order of this item';
COMMENT ON COLUMN poreject.poreject_itemsite_id IS 'This is the Item Site into which the item had been received';
COMMENT ON COLUMN poreject.poreject_vend_id IS 'This is the Vendor from which the item had been purchased';
COMMENT ON COLUMN poreject.poreject_vend_item_number IS 'This is the Vendor''s item number for this item';
COMMENT ON COLUMN poreject.poreject_vend_item_descrip IS 'This is the Vendor''s description of this item';
COMMENT ON COLUMN poreject.poreject_vend_uom IS 'This is the Unit of Measure in which the Vendor sold this item';
COMMENT ON COLUMN poreject.poreject_qty IS 'This is the quantity of the item that was returned';
COMMENT ON COLUMN poreject.poreject_posted IS 'This indicates whether or not the return has been recorded in the General Ledger, Inventory History, and Purchase Order Item';
COMMENT ON COLUMN poreject.poreject_rjctcode_id IS 'This indicates the reason for the return';
COMMENT ON COLUMN poreject.poreject_poitem_id IS 'This is the internal id of the original Purchase Order Item';
COMMENT ON COLUMN poreject.poreject_invoiced IS 'This indicates whether the Credit Memo associated with the return has been posted';
COMMENT ON COLUMN poreject.poreject_vohead_id IS 'This is the Voucher associated with the Purchase Order Item';
COMMENT ON COLUMN poreject.poreject_agent_username IS 'This is the Purchase Order Agent responsible for the original Purchase Order';
COMMENT ON COLUMN poreject.poreject_voitem_id IS 'This is the Voucher Item associated with the Purchase Order Item';
COMMENT ON COLUMN poreject.poreject_value IS 'This is the value (in base currency) of the return at the time it was posted to the General Ledger';
COMMENT ON COLUMN poreject.poreject_trans_username IS 'This is the user who recorded the return';
