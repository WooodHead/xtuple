BEGIN;

CREATE TABLE grppriv (
  grppriv_id SERIAL PRIMARY KEY NOT NULL,
  grppriv_grp_id INTEGER NOT NULL REFERENCES grp(grp_id),
  grppriv_priv_id INTEGER NOT NULL REFERENCES priv(priv_id)
);

REVOKE ALL ON grppriv FROM PUBLIC;
GRANT ALL ON grppriv TO GROUP openmfg;

REVOKE ALL ON grppriv_grppriv_id_seq FROM PUBLIC;
GRANT ALL ON grppriv_grppriv_id_seq TO GROUP openmfg;

COMMENT ON TABLE grppriv IS 'This is a specific priv for a specific group.';

COMMIT;

