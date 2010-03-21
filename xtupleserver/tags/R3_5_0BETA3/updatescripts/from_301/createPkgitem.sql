CREATE TABLE pkgitem (
  pkgitem_id            SERIAL  PRIMARY KEY,
  pkgitem_pkghead_id    INTEGER REFERENCES pkghead(pkghead_id) ON DELETE CASCADE,
  pkgitem_type          TEXT    CHECK (pkgitem_type IN
                                               ('C', 'D', 'F', 'G', 'I', 'M',
                                                'P', 'R', 'S', 'T', 'U', 'V')),
  pkgitem_item_id       INTEGER NOT NULL,
  pkgitem_name          TEXT    NOT NULL,
  pkgitem_descrip       TEXT,

  UNIQUE (pkgitem_pkghead_id, pkgitem_type, pkgitem_name),
  UNIQUE (pkgitem_pkghead_id, pkgitem_type, pkgitem_item_id)
);

REVOKE ALL ON TABLE pkgitem FROM PUBLIC;
GRANT  ALL ON TABLE pkgitem TO   admin;
GRANT  ALL ON TABLE pkgitem TO   GROUP openmfg;

REVOKE ALL ON TABLE pkgitem_pkgitem_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE pkgitem_pkgitem_id_seq TO   admin;
GRANT  ALL ON TABLE pkgitem_pkgitem_id_seq TO   GROUP openmfg;

COMMENT ON TABLE pkgitem IS 'Detailed information about the contents of non-core Packages added to the database';
