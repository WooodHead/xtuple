BEGIN;

ALTER TABLE cashrcpt DISABLE TRIGGER ALL;

--Initialize orderseq taking care to save
--existing information if it exists
INSERT INTO orderseq
  (orderseq_name, orderseq_number, orderseq_table, orderseq_numcol)
VALUES
  ('CashRcptNumber', 10000, 'cashrcpt', 'cashrcpt_number');
UPDATE orderseq
SET orderseq_number=COALESCE((SELECT orderseq_number
                              FROM orderseq
                              WHERE ( (orderseq_name='CashRcptNumber')
                                AND   (orderseq_table IS NULL) )), 10000)
WHERE ( (orderseq_name='CashRcptNumber')
  AND   (orderseq_table IS NOT NULL) );
DELETE FROM orderseq
WHERE ( (orderseq_name='CashRcptNumber')
  AND   (orderseq_table IS NULL) );

--Populate cashrcpt_number
UPDATE cashrcpt
   SET cashrcpt_number=fetchCashRcptNumber()
WHERE (cashrcpt_number IS NULL);

ALTER TABLE cashrcpt ENABLE TRIGGER ALL;

COMMIT;
