-- SELECT dropIfExists('TABLE', 'schemaord');

CREATE TABLE schemaord (schemaord_id    SERIAL PRIMARY KEY,
                        schemaord_name  TEXT
                                        NOT NULL
                                        UNIQUE
                                        CHECK(LENGTH(schemaord_name) > 0),
                        schemaord_order INTEGER NOT NULL UNIQUE
                       );

COMMENT ON TABLE schemaord IS 'Set the order in which db schemas will appear in the search path after login';

REVOKE ALL ON schemaord FROM public;
GRANT  ALL ON schemaord TO   xtrole;

REVOKE ALL ON schemaord_schemaord_id_seq FROM public;
GRANT  ALL ON schemaord_schemaord_id_seq TO   xtrole;

