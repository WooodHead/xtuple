BEGIN;

ALTER TABLE salesrep ADD salesrep_emp_id INTEGER REFERENCES emp(emp_id);

COMMIT;
