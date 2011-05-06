BEGIN;

DELETE FROM report WHERE report_name='ItemImage' AND report_grade=0;

COMMIT;