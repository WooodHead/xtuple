BEGIN;
SELECT dropIfExists('TABLE', 'pkgdep', 'public');

CREATE TABLE pkgdep (
  pkgdep_id                SERIAL  PRIMARY KEY,
  pkgdep_pkghead_id        INTEGER NOT NULL REFERENCES pkghead(pkghead_id),
  pkgdep_parent_pkghead_id INTEGER NOT NULL REFERENCES pkghead(pkghead_id)
);
COMMENT ON TABLE pkgdep IS
'Package Dependencies list describing which packages are dependent on which other packages.';

COMMENT ON COLUMN pkgdep.pkgdep_pkghead_Id IS 'This is the internal ID of a package which requires at least one other package to be installed first to operate successfully';
COMMENT ON COLUMN pkgdep.pkgdep_parent_pkghead_id IS 'This is the internal ID of a package which must be installed for the package pointed to by pkgdep_pkghead_id to operate successfully.';

REVOKE ALL ON pkgdep FROM PUBLIC;
GRANT ALL ON pkgdep TO GROUP openmfg;

REVOKE ALL ON pkgdep_pkgdep_id_seq FROM PUBLIC;
GRANT ALL ON pkgdep_pkgdep_id_seq TO GROUP openmfg;

COMMIT;
