BEGIN;

ALTER TABLE labelform ADD COLUMN labelform_report_name TEXT;
UPDATE labelform SET labelform_report_name=report_name FROM report WHERE report_id=labelform_report_id;

COMMENT ON COLUMN labelform.labelform_report_id IS 'Obsolete -- reference labelform_report_name instead.';

COMMIT;
