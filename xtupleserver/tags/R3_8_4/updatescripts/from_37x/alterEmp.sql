SELECT dropIfExists('TRIGGER', 'empBeforeTrigger');
SELECT dropIfExists('TRIGGER', 'empAfterTrigger');

ALTER TABLE emp ADD COLUMN emp_name TEXT;
UPDATE emp SET emp_code = UPPER(emp_code)
  WHERE emp_code != UPPER(emp_code);
UPDATE emp SET emp_name = usr_propername
  FROM usr
  WHERE LOWER(emp_code)=LOWER(usr_username);
UPDATE emp SET emp_name = COALESCE(formatCntctName(emp_cntct_id),
                                   emp_number)
  WHERE COALESCE(TRIM(emp_name), '') = '';
ALTER TABLE emp ALTER COLUMN emp_name SET NOT NULL;

COMMENT ON COLUMN emp.emp_username IS 'DEPRECATED - the relationship between Employee and User is now maintained through the crmacct table.';
