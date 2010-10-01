CREATE TABlE te.teemp
(
  teemp_id serial,
  teemp_emp_id integer REFERENCES emp (emp_id) ON DELETE CASCADE,
  teemp_contractor boolean default false
);

GRANT ALL ON TABLE te.teemp TO xtrole;
GRANT ALL ON SEQUENCE te.teemp_teemp_id_seq TO xtrole;