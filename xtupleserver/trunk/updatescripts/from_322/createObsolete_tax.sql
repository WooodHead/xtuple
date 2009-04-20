CREATE TABLE obsolete_tax
(
  tax_id integer NOT NULL DEFAULT nextval(('"tax_tax_id_seq"'::text)::regclass),
  tax_code text,
  tax_descrip text,
  tax_ratea numeric(8,4),
  tax_sales_accnt_id integer,
  tax_freight boolean NOT NULL DEFAULT false, -- Deprecated in 2.1 and moved to taxsel table where taxtype is the system defined Freight.
  tax_cumulative boolean NOT NULL DEFAULT false,
  tax_rateb numeric(8,4),
  tax_salesb_accnt_id integer,
  tax_ratec numeric(8,4),
  tax_salesc_accnt_id integer,
  CONSTRAINT obsolete_tax_pkey PRIMARY KEY (tax_id)
)
WITH (OIDS=FALSE);
ALTER TABLE obsolete_tax OWNER TO "admin";
GRANT ALL ON TABLE obsolete_tax TO "admin";
COMMENT ON TABLE obsolete_tax IS 'Tax information. Obsolete table structure.';
COMMENT ON COLUMN obsolete_tax.tax_freight IS 'Deprecated in 2.1 and moved to taxsel table where taxtype is the system defined Freight.';