ALTER TABLE accnt ADD CHECK (accnt_type IN ('A','E','L','Q','R'));
ALTER TABLE accnt ALTER COLUMN accnt_type SET NOT NULL;
