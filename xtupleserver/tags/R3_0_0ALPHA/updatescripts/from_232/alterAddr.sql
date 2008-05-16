BEGIN;

ALTER TABLE addr ADD COLUMN addr_number TEXT;
UPDATE addr SET addr_number=CAST(addr_id AS TEXT);
ALTER TABLE addr ALTER COLUMN addr_number SET NOT NULL;
ALTER TABLE addr ADD UNIQUE (addr_number);

INSERT INTO orderseq (orderseq_name,orderseq_number,orderseq_table,orderseq_numcol)
SELECT 'AddressNumber',MAX(addr_id)+1,'addr','addr_number' FROM addr;

COMMIT;