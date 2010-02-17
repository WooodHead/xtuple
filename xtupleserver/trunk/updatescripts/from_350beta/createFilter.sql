-- Table: filter

-- DROP TABLE filter;

CREATE TABLE filter
(
  filter_id serial NOT NULL,
  filter_screen text NOT NULL,
  filter_value text NOT NULL,
  filter_username text,
  filter_name text NOT NULL,
  filter_selected boolean DEFAULT false,
  CONSTRAINT filter_pkey PRIMARY KEY (filter_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE filter OWNER TO "admin";
GRANT ALL ON TABLE filter TO "admin";
GRANT ALL ON TABLE filter TO xtrole;
GRANT ALL ON SEQUENCE filter_filter_id_seq TO xtrole;
-- Index: filter_idx

-- DROP INDEX filter_idx;

CREATE INDEX filter_idx
  ON filter
  USING btree
  (filter_screen, filter_username, filter_name);

