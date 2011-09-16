BEGIN;

CREATE TABLE script (
  script_id SERIAL PRIMARY KEY NOT NULL,
  script_name TEXT NOT NULL,
  script_order INTEGER NOT NULL,
  script_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  script_source TEXT NOT NULL,
  script_notes TEXT
);

REVOKE ALL ON script FROM PUBLIC;
GRANT ALL ON script TO GROUP openmfg;

REVOKE ALL ON script_script_id_seq FROM PUBLIC;
GRANT ALL ON script_script_id_seq TO GROUP openmfg;

COMMIT;

