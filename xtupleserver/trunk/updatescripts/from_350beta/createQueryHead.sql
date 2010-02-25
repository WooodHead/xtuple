CREATE TABLE qryhead (qryhead_id       SERIAL PRIMARY KEY,
                      qryhead_name     TEXT UNIQUE,
                      qryhead_descrip  TEXT,
                      qryhead_notes    TEXT,
                      qryhead_username TEXT NOT NULL DEFAULT CURRENT_USER,
                      qryhead_updated  DATE NOT NULL DEFAULT CURRENT_DATE);
REVOKE ALL ON qryhead FROM PUBLIC;
GRANT  ALL ON qryhead TO   xtrole;

REVOKE ALL ON qryhead_qryhead_id_seq FROM PUBLIC;
GRANT  ALL ON qryhead_qryhead_id_seq TO   xtrole;

COMMENT ON TABLE qryhead IS 'A header record for a set of queries to be run sequentially. One use is for data export.';
COMMENT ON COLUMN qryhead.qryhead_id IS 'The primary key, holding an internal value used to cross-reference this table.';
COMMENT ON COLUMN qryhead.qryhead_name IS 'The user-assigned short name for this set of queries.';
COMMENT ON COLUMN qryhead.qryhead_descrip IS 'A long description of the purpose of this set of queries.';
COMMENT ON COLUMN qryhead.qryhead_notes IS 'General information about this queryset.';
COMMENT ON COLUMN qryhead.qryhead_username IS 'The name of the user who last modified this qryhead record.';
COMMENT ON COLUMN qryhead.qryhead_updated IS 'The date this qryhead was last modified.';
