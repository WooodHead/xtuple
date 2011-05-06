BEGIN;

ALTER TABLE form ADD COLUMN form_report_name TEXT;
UPDATE form SET form_report_name=report_name FROM report WHERE report_id=form_report_id;

COMMENT ON COLUMN form.form_report_id IS 'Obsolete -- reference form_report_name instead.';

COMMIT;
