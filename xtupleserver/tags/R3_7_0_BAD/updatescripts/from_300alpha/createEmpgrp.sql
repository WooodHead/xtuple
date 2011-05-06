BEGIN;

CREATE TABLE empgrp (
  empgrp_id      SERIAL PRIMARY KEY NOT NULL,
  empgrp_name    TEXT UNIQUE NOT NULL,
  empgrp_descrip TEXT NOT NULL
);

REVOKE ALL ON empgrp FROM PUBLIC;
GRANT ALL ON empgrp TO GROUP openmfg;

REVOKE ALL ON empgrp_empgrp_id_seq FROM PUBLIC;
GRANT ALL ON empgrp_empgrp_id_seq TO GROUP openmfg;

COMMIT;

