BEGIN;
SELECT dropIfExists('TABLE', 'emp');

CREATE TABLE emp (
  emp_id           SERIAL       PRIMARY KEY,
  emp_code         TEXT         NOT NULL UNIQUE,
  emp_number       TEXT         NOT NULL UNIQUE,
  emp_active       BOOLEAN      NOT NULL DEFAULT true,
  emp_cntct_id     INTEGER      REFERENCES cntct(cntct_id),
  emp_warehous_id  INTEGER      REFERENCES whsinfo(warehous_id),
  emp_mgr_emp_id   INTEGER      REFERENCES emp(emp_id),
  emp_wage_type    TEXT         CHECK(COALESCE(emp_wage_type, '') IN ('', 'H', 'S') AND
                                      (COALESCE(emp_wage, 0) = 0 OR
                                       (COALESCE(emp_wage_type, '') != '') AND emp_wage IS NOT NULL)
                                     ),
  emp_wage         NUMERIC,
  emp_wage_curr_id INTEGER      DEFAULT basecurrid() REFERENCES curr_symbol(curr_id),
  emp_wage_period  TEXT         CHECK(COALESCE(emp_wage_period, '') IN
                                      ('', 'H', 'D', 'W', 'BW', 'M', 'Y')),
  emp_dept_id      INTEGER      REFERENCES dept(dept_id),
  emp_shift_id     INTEGER      REFERENCES shift(shift_id),
  emp_usr_id       INTEGER      REFERENCES usr(usr_id),
  emp_notes        TEXT
);
COMMENT ON TABLE emp IS
'Employee table describing the basic properties of an employee. Employees need not be system users.';

COMMENT ON COLUMN emp.emp_code IS 'Short, human-readable name for employee. This value is kept synchronized with usr_username and salesrep_number, and so is unique across all three tables emp, usr, and salesrep.';
COMMENT ON COLUMN emp.emp_number IS 'Official employee number. This might be used for ID badges, payroll accounting, or other purposes.';
COMMENT ON COLUMN emp.emp_mgr_emp_id IS 'Internal ID of this employee''s manager/supervisor.';
COMMENT ON COLUMN emp.emp_wage_type IS 'The nature of the wage or employment agreement. ''H'' indicates this employee is paid on an hourly basis (or some other period) while ''S'' indicates this employee is salaried.';
COMMENT ON COLUMN emp.emp_wage_period IS 'The periodicity of wage payment: ''H'' for hourly, ''D'' for daily, ''W'' for weekly, ''BW'' for biweekly, ''M'' for monthly, ''Y'' for yearly.';

REVOKE ALL ON emp FROM PUBLIC;
GRANT ALL ON emp TO GROUP openmfg;

REVOKE ALL ON emp_emp_id_seq FROM PUBLIC;
GRANT ALL ON emp_emp_id_seq TO GROUP openmfg;

INSERT INTO emp (emp_code, emp_number, emp_dept_id, emp_shift_id, emp_usr_id, emp_wage_curr_id)
  SELECT usr_username, usr_username, usr_dept_id, usr_shift_id, usr_id, curr_id
  FROM usr LEFT OUTER JOIN curr_symbol ON (curr_base);

CREATE TABLE backup_usr AS SELECT * FROM usr;

ALTER TABLE usr DROP COLUMN usr_dept_id;
ALTER TABLE usr DROP COLUMN usr_shift_id;

COMMIT;
