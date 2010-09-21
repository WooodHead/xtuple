ALTER TABLE te.teitem DROP COLUMN teitem_billable_status;
ALTER TABLE te.teitem DROP COLUMN teitem_payable_status;
ALTER TABLE te.teitem ADD COLUMN teitem_vodist_id INTEGER REFERENCES vodist(vodist_id) ON DELETE SET NULL;
ALTER TABLE te.teitem ADD COLUMN teitem_posted BOOLEAN DEFAULT FALSE;
ALTER TABLE te.teitem ADD FOREIGN KEY (teitem_tehead_id) REFERENCES te.tehead (tehead_id) ON DELETE CASCADE;
ALTER TABLE te.teitem DROP COLUMN teitem_username;
ALTER TABLE te.teitem DROP COLUMN teitem_emp_id;
ALTER TABLE te.teitem ADD COLUMN teitem_curr_id INTEGER NOT NULL DEFAULT baseCurrId() REFERENCES curr_symbol(curr_id) ON DELETE SET DEFAULT;
ALTER TABLE te.teitem ADD FOREIGN KEY (teitem_invchead_id) REFERENCES invchead (invchead_id) ON DELETE SET NULL;
ALTER TABLE te.teitem DROP COLUMN teitem_prj_id;
ALTER TABLE te.teitem ADD COLUMN teitem_invcitem_id INTEGER REFERENCES invcitem (invcitem_id) ON DELETE SET NULL;
UPDATE te.teitem SET teitem_invcitem_id = invcitem_id
FROM invcitem WHERE teitem_invchead_id = invcitem_invchead_id AND teitem_linenumber = invcitem_linenumber;
ALTER TABLE te.teitem DROP COLUMN teitem_invchead_id;