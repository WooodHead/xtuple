CREATE TABLE xsltmap (
  xsltmap_id		  SERIAL	PRIMARY KEY,
  xsltmap_name		  TEXT		NOT NULL CHECK (xsltmap_name   != ''),
  xsltmap_doctype	  TEXT		NOT NULL,
  xsltmap_system	  TEXT		NOT NULL,
  xsltmap_import	  TEXT		NOT NULL CHECK (xsltmap_import != ''),
  xsltmap_export	  TEXT		NOT NULL DEFAULT '',

  CHECK (xsltmap_doctype != '' OR xsltmap_system != '')
);

REVOKE ALL ON TABLE xsltmap FROM PUBLIC;
GRANT  ALL ON TABLE xsltmap TO   mfgadmin;
GRANT  ALL ON TABLE xsltmap TO   GROUP openmfg;

REVOKE ALL ON TABLE xsltmap_xsltmap_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE xsltmap_xsltmap_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE xsltmap_xsltmap_id_seq TO   GROUP openmfg;

ALTER TABLE xsltmap ADD CONSTRAINT xsltmap_name_key UNIQUE (xsltmap_name);

COMMENT ON TABLE xsltmap IS 'Mapping of XML System identifiers to XSLT transformation files';

INSERT INTO xsltmap (
  xsltmap_id, xsltmap_name, xsltmap_doctype,
  xsltmap_system, xsltmap_import,
  xsltmap_export
) VALUES (
  NEXTVAL('xsltmap_xsltmap_id_seq'), 'Yahoo', 'OrderList',
  'http://store.yahoo.com/doc/dtd/OrderList2.dtd', 'yahoo_to_xtupleapi.xsl',
  '');
