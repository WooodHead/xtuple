BEGIN;

CREATE TABLE uiform (
  uiform_id SERIAL PRIMARY KEY NOT NULL,
  uiform_name TEXT NOT NULL,
  uiform_order INTEGER NOT NULL,
  uiform_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  uiform_source TEXT NOT NULL,
  uiform_notes TEXT
);

REVOKE ALL ON uiform FROM PUBLIC;
GRANT ALL ON uiform TO GROUP openmfg;

REVOKE ALL ON uiform_uiform_id_seq FROM PUBLIC;
GRANT ALL ON uiform_uiform_id_seq TO GROUP openmfg;

COMMIT;

