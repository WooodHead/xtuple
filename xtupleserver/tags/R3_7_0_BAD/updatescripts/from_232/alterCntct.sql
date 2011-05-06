BEGIN;

ALTER TABLE cntct ADD COLUMN cntct_number TEXT;
UPDATE cntct SET cntct_number=CAST(cntct_id AS TEXT);
ALTER TABLE cntct ALTER COLUMN cntct_number SET NOT NULL;
ALTER TABLE cntct ADD UNIQUE (cntct_number);

INSERT INTO orderseq (orderseq_name,orderseq_number,orderseq_table,orderseq_numcol)
SELECT 'ContactNumber',MAX(cntct_id)+1,'cntct','cntct_number' FROM cntct;

COMMIT;