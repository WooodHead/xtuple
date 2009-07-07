BEGIN;

ALTER TABLE item ADD COLUMN item_tax_recoverable BOOLEAN;
UPDATE item SET item_tax_recoverable=true;
ALTER TABLE item ALTER COLUMN item_tax_recoverable SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_tax_recoverable SET DEFAULT true;

COMMIT;