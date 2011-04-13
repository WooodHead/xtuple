BEGIN;

DELETE FROM report WHERE report_name='SummarizedTaxableSales' AND report_grade = 0;

COMMIT;