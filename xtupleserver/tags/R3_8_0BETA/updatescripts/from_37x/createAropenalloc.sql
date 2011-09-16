CREATE TABLE aropenalloc ( 
  aropenalloc_aropen_id integer NOT NULL, 
  aropenalloc_doctype character(1) NOT NULL, 
  aropenalloc_doc_id integer NOT NULL, 
  aropenalloc_amount numeric(20,2) NOT NULL default 0.00, 
  aropenalloc_curr_id integer default basecurrid(),
CONSTRAINT aropenalloc_pkey PRIMARY KEY (aropenalloc_aropen_id, aropenalloc_doctype, aropenalloc_doc_id)
);

CREATE INDEX aropenalloc_aropen_id_idx ON aropenalloc (aropenalloc_aropen_id);
CREATE INDEX aropenalloc_doc_id_idx ON aropenalloc (aropenalloc_doc_id);

REVOKE ALL ON TABLE aropenalloc FROM public;
GRANT ALL ON TABLE aropenalloc TO xtrole;

INSERT INTO aropenalloc (aropenalloc_aropen_id, aropenalloc_doctype, aropenalloc_doc_id, aropenalloc_amount, aropenalloc_curr_id) 
SELECT aropenco_aropen_id, 'S', aropenco_cohead_id, aropenco_amount, aropenco_curr_id
FROM aropenco;

DROP TABLE aropenco CASCADE;
