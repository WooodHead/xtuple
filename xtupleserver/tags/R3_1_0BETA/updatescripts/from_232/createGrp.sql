BEGIN;

CREATE TABLE grp (
  grp_id SERIAL PRIMARY KEY NOT NULL,
  grp_name TEXT UNIQUE NOT NULL,
  grp_descrip TEXT
);

REVOKE ALL ON grp FROM PUBLIC;
GRANT ALL ON grp TO GROUP openmfg;

REVOKE ALL ON grp_grp_id_seq FROM PUBLIC;
GRANT ALL ON grp_grp_id_seq TO GROUP openmfg;

COMMENT ON TABLE grp IS 'This table is the basic group information.';

INSERT INTO priv
      (priv_module, priv_name, priv_descrip)
VALUES('System', 'MaintainGroups', 'Can Change or Create Settings For Groups');


COMMIT;

