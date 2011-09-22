UPDATE emp SET emp_wage_period = 'H' WHERE emp_wage_period IS NULL;
UPDATE emp SET emp_extrate_period = 'H' WHERE emp_extrate_period IS NULL;
UPDATE emp SET emp_wage_type = 'H' WHERE emp_wage_type IS NULL;
ALTER TABLE emp ALTER COLUMN emp_wage_period SET NOT NULL;
ALTER TABLE emp ALTER COLUMN emp_extrate_period SET NOT NULL;
ALTER TABLE emp ALTER COLUMN emp_wage_type SET NOT NULL;
