BEGIN;

CREATE TABLE empgrpitem (
  empgrpitem_id        SERIAL PRIMARY KEY NOT NULL,
  empgrpitem_empgrp_id INTEGER NOT NULL REFERENCES empgrp(empgrp_id),
  empgrpitem_emp_id    INTEGER NOT NULL REFERENCES emp(emp_id)
);

REVOKE ALL ON empgrpitem FROM PUBLIC;
GRANT ALL ON empgrpitem TO GROUP openmfg;

REVOKE ALL ON empgrpitem_empgrpitem_id_seq FROM PUBLIC;
GRANT ALL ON empgrpitem_empgrpitem_id_seq TO GROUP openmfg;

COMMIT;

