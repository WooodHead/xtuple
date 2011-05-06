-- Table: sltrans

-- DROP TABLE sltrans;

CREATE TABLE sltrans
(
  sltrans_id serial PRIMARY KEY,
  sltrans_created timestamp with time zone,
  sltrans_date date NOT NULL,
  sltrans_sequence integer,
  sltrans_accnt_id integer NOT NULL,
  sltrans_source text,
  sltrans_docnumber text,
  sltrans_misc_id integer,
  sltrans_amount numeric(12,2) NOT NULL,
  sltrans_notes text,
  sltrans_journalnumber integer,
  sltrans_posted boolean NOT NULL,
  sltrans_doctype text,
  sltrans_username text NOT NULL DEFAULT "current_user"(),
  sltrans_gltrans_journalnumber integer
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sltrans OWNER TO "admin";
GRANT ALL ON TABLE sltrans TO "admin";
GRANT ALL ON TABLE sltrans TO xtrole;
COMMENT ON TABLE sltrans IS 'Sub Ledger transaction information';

-- Index: sltrans_sltrans_accnt_id_idx

-- DROP INDEX sltrans_sltrans_accnt_id_idx;

CREATE INDEX sltrans_sltrans_accnt_id_idx
  ON sltrans
  USING btree
  (sltrans_accnt_id);

-- Index: sltrans_sltrans_date_idx

-- DROP INDEX sltrans_sltrans_date_idx;

CREATE INDEX sltrans_sltrans_date_idx
  ON sltrans
  USING btree
  (sltrans_date);

-- Index: sltrans_sltrans_journalnumber_idx

-- DROP INDEX sltrans_sltrans_journalnumber_idx;

CREATE INDEX sltrans_sltrans_journalnumber_idx
  ON sltrans
  USING btree
  (sltrans_journalnumber);

-- Index: sltrans_sequence_idx

-- DROP INDEX sltrans_sequence_idx;

CREATE INDEX sltrans_sequence_idx
  ON sltrans
  USING btree
  (sltrans_sequence);	

GRANT ALL ON sltrans TO xtrole;
GRANT ALL ON sltrans_sltrans_id_seq TO GROUP xtrole;
