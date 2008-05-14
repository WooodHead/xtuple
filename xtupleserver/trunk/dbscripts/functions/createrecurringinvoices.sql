CREATE OR REPLACE FUNCTION createRecurringInvoices() RETURNS INTEGER AS $$
DECLARE
  _count INTEGER := 0;
  _cutoffDate DATE;
  _i RECORD;
BEGIN
  SELECT CURRENT_DATE + CAST(metric_value AS INTEGER)
    INTO _cutoffDate
    FROM metric
   WHERE(metric_name='RecurringInvoiceBuffer');
  IF(_cutoffDate IS NULL) THEN
    _cutoffDate := CURRENT_DATE;
  END IF;

  FOR _i IN SELECT *
              FROM invchead
             WHERE((invchead_recurring)
               AND (COALESCE(invchead_recurring_until, endOfTime())>=CURRENT_DATE)) LOOP
-- add code here to determine the last date an invoice was created
-- then step through and figure out the next date an invoice needs to be generated
-- if the date is inside the _cutoffDate then create the invoice and calc the next date
  END LOOP;

  RETURN _count;
END;
$$ LANGUAGE 'plpgsql';

