ALTER TABLE te.tehead ADD COLUMN tehead_status CHAR(1) CHECK (tehead_status IN ('O','A','C'));
UPDATE te.tehead SET tehead_status='C';
ALTER TABLE te.tehead ALTER COLUMN tehead_status SET NOT NULL;
ALTER TABLE te.tehead DROP COLUMN tehead_billable_status;
ALTER TABLE te.tehead DROP COLUMN tehead_payable_status;
ALTER TABLE te.tehead ALTER COLUMN tehead_status SET DEFAULT 'O';
ALTER TABLE te.tehead ALTER COLUMN tehead_number SET DEFAULT nextval('te.timesheet_seq')