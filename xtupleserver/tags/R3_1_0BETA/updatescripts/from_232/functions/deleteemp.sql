CREATE OR REPLACE FUNCTION deleteEmp(INTEGER) RETURNS INTEGER AS '
DECLARE
  pEmpid ALIAS FOR $1;
  _count        INTEGER;

BEGIN
  UPDATE salesrep  SET salesrep_emp_id = NULL WHERE (salesrep_emp_id=pEmpid);
  DELETE FROM emp WHERE (emp_id=pEmpid);

  RETURN 1;
END;
' LANGUAGE 'plpgsql';
