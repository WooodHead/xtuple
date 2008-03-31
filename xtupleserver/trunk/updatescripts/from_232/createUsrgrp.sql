BEGIN;

CREATE TABLE usrgrp (
  usrgrp_id SERIAL PRIMARY KEY NOT NULL,
  usrgrp_grp_id INTEGER NOT NULL REFERENCES grp(grp_id),
  usrgrp_username TEXT NOT NULL
);

REVOKE ALL ON usrgrp FROM PUBLIC;
GRANT ALL ON usrgrp TO GROUP openmfg;

REVOKE ALL ON usrgrp_usrgrp_id_seq FROM PUBLIC;
GRANT ALL ON usrgrp_usrgrp_id_seq TO GROUP openmfg;

COMMENT ON TABLE usrgrp IS 'This is which group a user belongs to.';

COMMIT;

