
ALTER TABLE custform ADD COLUMN custform_invoice_report_name TEXT;
ALTER TABLE custform ADD COLUMN custform_creditmemo_report_name TEXT;
ALTER TABLE custform ADD COLUMN custform_quote_report_name TEXT;
ALTER TABLE custform ADD COLUMN custform_packinglist_report_name TEXT;
ALTER TABLE custform ADD COLUMN custform_statement_report_name TEXT;
ALTER TABLE custform ADD COLUMN custform_sopicklist_report_name TEXT;

COMMENT ON COLUMN custform.custform_invoice_report_id IS 'Obsolete -- reference custform_invoice_report_name instead.';
COMMENT ON COLUMN custform.custform_creditmemo_report_id IS 'Obsolete -- reference custform_creditmemo_report_name instead.';
COMMENT ON COLUMN custform.custform_quote_report_id IS 'Obsolete -- reference custform_quote_report_name instead.';
COMMENT ON COLUMN custform.custform_packinglist_report_id IS 'Obsolete -- reference custform_packinglist_report_name instead.';
COMMENT ON COLUMN custform.custform_statement_report_id IS 'Obsolete -- reference custform_statement_report_name instead.';
COMMENT ON COLUMN custform.custform_sopicklist_report_id IS 'Obsolete -- reference custform_sopicklist_report_name instead.';

UPDATE custform SET custform_invoice_report_name=report_name FROM report WHERE report_id=custform_invoice_report_id;
UPDATE custform SET custform_creditmemo_report_name=report_name FROM report WHERE report_id=custform_creditmemo_report_id;
UPDATE custform SET custform_quote_report_name=report_name FROM report WHERE report_id=custform_quote_report_id;
UPDATE custform SET custform_packinglist_report_name=report_name FROM report WHERE report_id=custform_packinglist_report_id;
UPDATE custform SET custform_statement_report_name=report_name FROM report WHERE report_id=custform_statement_report_id;
UPDATE custform SET custform_sopicklist_report_name=report_name FROM report WHERE report_id=custform_sopicklist_report_id;

