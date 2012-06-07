UPDATE salesrep SET salesrep_number=UPPER(salesrep_number)
 WHERE salesrep_number!=UPPER(salesrep_number);

COMMENT ON COLUMN salesrep.salesrep_emp_id IS 'DEPRECATED - the relationship between Sales Rep and Employee is now maintained through the crmacct table.';
