BEGIN;

ALTER TABLE shipform ADD COLUMN shipform_report_name TEXT;
UPDATE shipform SET shipform_report_name=report_name FROM report WHERE report_id=shipform_report_id;

COMMENT ON COLUMN shipform.shipform_report_id IS 'Obsolete -- reference shipform_report_name instead.';

COMMIT;
