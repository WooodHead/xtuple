INSERT INTO recur (recur_parent_id, recur_parent_type,
                   recur_period,    recur_freq,
                   recur_start,     recur_end,
                   recur_max
          ) SELECT invchead_id,             'I',
                   invchead_recurring_type, invchead_recurring_interval,
                   invchead_invcdate,       invchead_recurring_until,
                   fetchMetricValue('RecurringInvoiceBuffer')
              FROM invchead
             WHERE invchead_recurring;

COMMENT ON COLUMN invchead.invchead_recurring          IS 'Deprecated.';
COMMENT ON COLUMN invchead.invchead_recurring_interval IS 'Deprecated.';
COMMENT ON COLUMN invchead.invchead_recurring_type     IS 'Deprecated.';
COMMENT ON COLUMN invchead.invchead_recurring_until    IS 'Deprecated.';
