BEGIN;

ALTER TABLE coitem ADD   COLUMN coitem_qtyreserved NUMERIC(18,6);
ALTER TABLE coitem ALTER COLUMN coitem_qtyreserved SET DEFAULT 0.0;
UPDATE coitem SET coitem_qtyreserved = 0.0;
ALTER TABLE coitem ALTER COLUMN coitem_qtyreserved SET NOT NULL;

COMMIT;

