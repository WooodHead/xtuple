CREATE OR REPLACE FUNCTION createCrmAccountsForUpgrade() RETURNS INTEGER AS $$
DECLARE
  _count INTEGER;
  _total INTEGER := 0;
BEGIN
  UPDATE crmacct SET crmacct_salesrep_id = salesrep_id
    FROM salesrep
   WHERE UPPER(crmacct_number)=UPPER(salesrep_number)
     AND COALESCE(crmacct_salesrep_id, -1) != salesrep_id;
  GET DIAGNOSTICS _count = ROW_COUNT;
  _total := _total + _count;
  RAISE NOTICE 'updated % sales reps', _count;

  INSERT INTO crmacct (crmacct_number, crmacct_name, crmacct_active,
                       crmacct_type,   crmacct_salesrep_id)
    SELECT UPPER(salesrep_number), salesrep_name, salesrep_active, 'I', salesrep_id
      FROM salesrep
     WHERE salesrep_number NOT IN (SELECT crmacct_number FROM crmacct);
  GET DIAGNOSTICS _count = ROW_COUNT;
  _total := _total + _count;
  RAISE NOTICE 'inserted % sales reps', _count;
  ------------------------------------------------------------------
  UPDATE crmacct SET crmacct_emp_id = emp_id
    FROM emp
   WHERE UPPER(crmacct_number)=UPPER(emp_code)
     AND COALESCE(crmacct_emp_id, -1) != emp_id;
  GET DIAGNOSTICS _count = ROW_COUNT;
  _total := _total + _count;
  RAISE NOTICE 'updated % employees', _count;

  INSERT INTO crmacct (crmacct_number, crmacct_name,   crmacct_active,
                      crmacct_type,    crmacct_emp_id, crmacct_cntct_id_1)
   SELECT UPPER(emp_code), emp_name, emp_active,
         'I',       emp_id,   emp_cntct_id
     FROM emp
    WHERE UPPER(emp_code) NOT IN (SELECT crmacct_number FROM crmacct);
  GET DIAGNOSTICS _count = ROW_COUNT;
  _total := _total + _count;
  RAISE NOTICE 'inserted % employees', _count;
  ------------------------------------------------------------------
  UPDATE crmacct SET crmacct_usr_username = LOWER(usr_username)
    FROM usr
   WHERE crmacct_number=UPPER(usr_username)
     AND COALESCE(LOWER(crmacct_usr_username), '') != LOWER(usr_username);
  GET DIAGNOSTICS _count = ROW_COUNT;
  _total := _total + _count;
  RAISE NOTICE 'updated % users', _count;

  INSERT INTO crmacct (crmacct_number, crmacct_name,   crmacct_active,
                      crmacct_type,    crmacct_usr_username)
   SELECT UPPER(usr_username), usr_propername, usr_active,
         'I',           usr_username
     FROM usr
    WHERE LOWER(usr_username) NOT IN (SELECT LOWER(crmacct_number) FROM crmacct);
  GET DIAGNOSTICS _count = ROW_COUNT;
  _total := _total + _count;
  RAISE NOTICE 'inserted % users', _count;

  RETURN _total;
END;
$$
LANGUAGE 'plpgsql';

SELECT createCrmAccountsForUpgrade();
SELECT dropIfExists('FUNCTION', 'createCrmAccountsForUpgrade()');

UPDATE orderseq SET orderseq_table='crmacct', orderseq_numcol='crmacct_number'
 WHERE orderseq_name='CRMAccountNumber';
