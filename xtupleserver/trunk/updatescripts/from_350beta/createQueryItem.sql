CREATE TABLE qryitem(qryitem_id         SERIAL,
                     qryitem_qryhead_id INTEGER NOT NULL REFERENCES qryhead(qryhead_id),
                     qryitem_name       TEXT NOT NULL,
                     qryitem_order      INTEGER NOT NULL,
                     qryitem_src        TEXT NOT NULL
                                        CHECK (qryitem_src IN ('REL', 'MQL', 'CUSTOM')),
                     qryitem_group      TEXT,
                     qryitem_detail     TEXT NOT NULL
                                        CHECK (TRIM(qryitem_detail) != ''),
                     qryitem_notes      TEXT NOT NULL DEFAULT '',
                     qryitem_username   TEXT NOT NULL DEFAULT CURRENT_USER,
                     qryitem_updated    DATE NOT NULL DEFAULT CURRENT_DATE,
                     
                     UNIQUE (qryitem_qryhead_id, qryitem_name),
                     UNIQUE (qryitem_qryhead_id, qryitem_order)
);

REVOKE ALL ON qryitem FROM PUBLIC;
GRANT  ALL ON qryitem TO   xtrole;

COMMENT ON TABLE qryitem IS 'The description of a query to be run as part of a set (see qryhead).';
COMMENT ON COLUMN qryitem.qryitem_id IS 'The primary key, holding an internal value used to cross-reference this table.';
COMMENT ON COLUMN qryitem.qryitem_qryhead_id IS 'The primary key of the query set to which this individual query belongs.';
COMMENT ON COLUMN qryitem.qryitem_order IS 'The order in which query items within a query set should be run.';
COMMENT ON COLUMN qryitem.qryitem_src IS 'The source of the query. If the qryitem_src is "REL" then the qryitem_group and _detail name a particular table or view and all rows will be returned. If the source is "MQL" then the qryitem_group and _detail name a pre-defined MetaSQL query in the metasql table. If the source is "CUSTOM" then the qryitem_detail contains the full MetaSQL text of the query to run.';
COMMENT ON COLUMN qryitem.qryitem_group IS 'Information to help find the query to run. If the qryitem_src is "REL" then this is the schema in which to find the table or view to query and all rows will be returned (the qryitem_detail names the table or view). If the qryitem_src is "MQL" then this is the group of the query in the metasql table to run (the name is in qryitem_detail). If the qryitem_src IS "CUSTOM" then this ignored.';
COMMENT ON COLUMN qryitem.qryitem_detail IS 'The particular query to run. If the qryitem_src is "REL" then this is the name of the table or view to query and all rows will be returned. If the qryitem_src is "MQL" then this is the name of the query in the metasql table to run. If the qryitem_src IS "CUSTOM" then this is the actual MetaSQL query text to be parsed and run.';
COMMENT ON COLUMN qryitem.qryitem_notes IS 'General information about this query.';
COMMENT ON COLUMN qryitem.qryitem_username IS 'The name of the user who last modified this qryitem record.';
COMMENT ON COLUMN qryitem.qryitem_updated IS 'The date this qryitem was last modified.';
