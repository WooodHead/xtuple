
CREATE TABLE incdt_subs
(
  incdt_subs_idx serial NOT NULL,
  incdt_assoc_id integer NOT NULL,
  subscriber_id integer NOT NULL,
  subscriber_type text NOT NULL,
  CONSTRAINT incdt_subs_pkey PRIMARY KEY (incdt_subs_idx),
  CONSTRAINT incdt_subs_fkey_incdt_assoc_id FOREIGN KEY (incdt_assoc_id)
      REFERENCES incdt (incdt_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT incdt_subs_enum_type CHECK (subscriber_type = ANY (ARRAY['contact'::text, 'user'::text]))
)
WITH (
  OIDS=FALSE
);
GRANT ALL ON TABLE incdt_subs TO xtrole;
COMMENT ON TABLE incdt_subs IS 'Incident Subscribers Helper Table';
