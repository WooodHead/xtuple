CREATE TABLE pkghead (
  pkghead_id		SERIAL	PRIMARY KEY,
  pkghead_name	        TEXT	NOT NULL CHECK (LENGTH(pkghead_name) > 0),
  pkghead_descrip	TEXT,
  pkghead_version       TEXT    NOT NULL,
  pkghead_developer     TEXT    NOT NULL,
  pkghead_notes         TEXT,
  pkghead_created       TIMESTAMP WITH TIME ZONE,
  pkghead_updated       TIMESTAMP WITH TIME ZONE
);

REVOKE ALL ON TABLE pkghead FROM PUBLIC;
GRANT  ALL ON TABLE pkghead TO   admin;
GRANT  ALL ON TABLE pkghead TO   GROUP openmfg;

REVOKE ALL ON TABLE pkghead_pkghead_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE pkghead_pkghead_id_seq TO   admin;
GRANT  ALL ON TABLE pkghead_pkghead_id_seq TO   GROUP openmfg;

COMMENT ON TABLE pkghead IS 'Information about non-core Packages added to the database';
