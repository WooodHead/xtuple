
ALTER TABLE accnt ADD COLUMN accnt_active BOOLEAN;
ALTER TABLE accnt ALTER COLUMN accnt_active SET DEFAULT TRUE;
UPDATE accnt SET accnt_active = true;
ALTER TABLE accnt ALTER COLUMN accnt_active SET NOT NULL;

