
ALTER TABLE emp ADD COLUMN emp_extrate numeric;
ALTER TABLE emp ADD COLUMN emp_extrate_period text;
ALTER TABLE emp ADD COLUMN emp_startdate date;
ALTER TABLE emp ALTER COLUMN emp_startdate SET DEFAULT ('now'::text)::date;

COMMENT ON COLUMN emp.emp_extrate_period IS 'The periodicity of external rate payment: ''H'' for hourly, ''D'' for daily, ''W'' for weekly, ''BW'' for biweekly, ''M'' for monthly, ''Y'' for yearly.';
