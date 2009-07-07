BEGIN;

ALTER TABLE poitem ADD COLUMN poitem_tax_recoverable BOOLEAN;
UPDATE poitem SET poitem_tax_recoverable=true;
ALTER TABLE poitem ALTER COLUMN poitem_tax_recoverable SET NOT NULL;
ALTER TABLE poitem ALTER COLUMN poitem_tax_recoverable SET DEFAULT true;

COMMIT;