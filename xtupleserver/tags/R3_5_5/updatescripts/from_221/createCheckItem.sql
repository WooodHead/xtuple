CREATE TABLE checkitem (
  checkitem_id		SERIAL	PRIMARY KEY,
  checkitem_checkhead_id INTEGER NOT NULL REFERENCES checkhead(checkhead_id),
  checkitem_amount	NUMERIC(20,2)	NOT NULL DEFAULT 0.0,
  checkitem_discount	NUMERIC(20,2)	NOT NULL DEFAULT 0.0,
  checkitem_ponumber	TEXT,
  checkitem_vouchernumber TEXT,
  checkitem_invcnumber	TEXT,
  checkitem_apopen_id	INTEGER	REFERENCES apopen(apopen_id),
  checkitem_aropen_id	INTEGER	REFERENCES aropen(aropen_id),
  checkitem_docdate	DATE,
  checkitem_curr_id	INTEGER	NOT NULL DEFAULT basecurrid()
						REFERENCES curr_symbol(curr_id),

  -- cannot be both AR and AP
  CHECK (NOT (checkitem_apopen_id IS NOT NULL
	      AND checkitem_aropen_id IS NOT NULL))
);

REVOKE ALL ON TABLE checkitem FROM PUBLIC;
GRANT  ALL ON TABLE checkitem TO   mfgadmin;
GRANT  ALL ON TABLE checkitem TO   GROUP openmfg;

REVOKE ALL ON TABLE checkitem_checkitem_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE checkitem_checkitem_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE checkitem_checkitem_id_seq TO   GROUP openmfg;

COMMENT ON TABLE checkitem IS 'Accounts Payable Check Line Item Information';

INSERT INTO checkitem (
  checkitem_id, checkitem_checkhead_id, checkitem_vouchernumber,
  checkitem_ponumber, checkitem_amount,
  checkitem_apopen_id,
  checkitem_docdate, checkitem_curr_id, checkitem_discount
) SELECT
  apchkitem_id, apchkitem_apchk_id, apchkitem_vouchernumber,
  apchkitem_ponumber, COALESCE(apchkitem_amount, 0.0),
  CASE WHEN (apchkitem_apopen_id < 0) THEN NULL
       ELSE apchkitem_apopen_id
       END,
  apchkitem_docdate, apchkitem_curr_id,
  COALESCE(apchkitem_discount, 0.0)
FROM apchkitem
WHERE apchkitem_apchk_id IN (SELECT checkhead_id FROM checkhead);

SELECT SETVAL('checkitem_checkitem_id_seq', MAX(checkitem_id)) FROM checkitem;

ALTER TABLE apchkitem RENAME TO obsolete_apchkitem;
