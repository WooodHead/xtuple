-- Table: docass

-- DROP TABLE docass;

CREATE TABLE docass
(
  docass_id serial NOT NULL,
  docass_source_id integer NOT NULL,
  docass_source_type text NOT NULL,
  docass_target_id integer NOT NULL,
  docass_target_type text NOT NULL DEFAULT 'URL'::text,
  docass_purpose character(1) NOT NULL DEFAULT 'S'::bpchar,
  CONSTRAINT docass_pkey PRIMARY KEY (docass_id),
  CONSTRAINT docass_docass_purpose_check CHECK (docass_purpose = 'I'::bpchar OR docass_purpose = 'E'::bpchar OR docass_purpose = 'M'::bpchar OR docass_purpose = 'P'::bpchar OR docass_purpose = 'A'::bpchar OR docass_purpose = 'C'::bpchar OR docass_purpose = 'S'::bpchar OR docass_purpose = 'D'::bpchar)
)
WITH (OIDS=FALSE);
ALTER TABLE docass OWNER TO "admin";
GRANT ALL ON TABLE docass TO "admin";
GRANT ALL ON TABLE docass TO xtrole;
COMMENT ON TABLE docass IS 'Document Assignement References';