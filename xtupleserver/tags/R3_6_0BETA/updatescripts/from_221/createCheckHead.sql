CREATE TABLE checkhead (
  checkhead_id		  SERIAL	PRIMARY KEY,
  checkhead_recip_id	  INTEGER	NOT NULL,
  checkhead_recip_type	  TEXT		NOT NULL CHECK
				      (checkhead_recip_type IN ('C', 'V', 'T')),
  checkhead_bankaccnt_id  INTEGER	NOT NULL REFERENCES bankaccnt(bankaccnt_id),
  checkhead_printed	  BOOLEAN	NOT NULL DEFAULT FALSE,
  checkhead_checkdate	  DATE		NOT NULL,
  checkhead_number	  INTEGER	NOT NULL,
  checkhead_amount	  NUMERIC(20,2)	NOT NULL CHECK (checkhead_amount > 0),
  checkhead_void	  BOOLEAN	NOT NULL DEFAULT FALSE,
  checkhead_replaced	  BOOLEAN	NOT NULL DEFAULT FALSE,
  checkhead_posted	  BOOLEAN	NOT NULL DEFAULT FALSE,
  checkhead_rec		  BOOLEAN	NOT NULL DEFAULT FALSE,
  checkhead_misc	  BOOLEAN	NOT NULL DEFAULT FALSE,
  checkhead_expcat_id	  INTEGER	REFERENCES expcat(expcat_id),
  checkhead_for		  TEXT		NOT NULL,
  checkhead_notes	  TEXT		NOT NULL,
  checkhead_journalnumber INTEGER,
  checkhead_curr_id	  INTEGER	NOT NULL DEFAULT basecurrid()
						REFERENCES curr_symbol(curr_id),
  checkhead_deleted	  BOOLEAN	NOT NULL DEFAULT FALSE
);

REVOKE ALL ON TABLE checkhead FROM PUBLIC;
GRANT  ALL ON TABLE checkhead TO   mfgadmin;
GRANT  ALL ON TABLE checkhead TO   GROUP openmfg;

REVOKE ALL ON TABLE checkhead_checkhead_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE checkhead_checkhead_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE checkhead_checkhead_id_seq TO   GROUP openmfg;

COMMENT ON TABLE checkhead IS 'Accounts Payable Check Information';

CREATE INDEX checkhead_posted_idx  ON checkhead USING btree (checkhead_posted);
CREATE INDEX checkhead_replaced_idx  ON checkhead USING btree (checkhead_replaced);

INSERT INTO checkhead (
  checkhead_id, checkhead_recip_id, checkhead_recip_type, checkhead_bankaccnt_id,
  checkhead_printed, checkhead_checkdate, checkhead_number, checkhead_amount,
  checkhead_void, checkhead_replaced,
  checkhead_posted, checkhead_rec,
  checkhead_misc, checkhead_expcat_id,
  checkhead_for, checkhead_notes,
  checkhead_journalnumber, checkhead_curr_id, checkhead_deleted
) SELECT
  apchk_id,
  CASE WHEN (apchk_vend_id < 0) THEN NULL ELSE apchk_vend_id END,
  'V',
  CASE WHEN (apchk_bankaccnt_id < 0) THEN NULL ELSE apchk_bankaccnt_id END,
  COALESCE(apchk_printed, false), apchk_checkdate, apchk_number, apchk_amount,
  COALESCE(apchk_void, false), COALESCE(apchk_replaced, false),
  COALESCE(apchk_posted, false), COALESCE(apchk_rec, false),
  COALESCE(apchk_misc, false),
  CASE WHEN(apchk_expcat_id < 0) THEN NULL ELSE apchk_expcat_id END,
  COALESCE(apchk_for, ''), COALESCE(apchk_notes, ''),
  apchk_journalnumber, apchk_curr_id, COALESCE(apchk_deleted, false)
FROM apchk
WHERE ((NOT apchk_deleted)
  AND (apchk_amount > 0));

SELECT SETVAL('checkhead_checkhead_id_seq', MAX(checkhead_id)) FROM checkhead;

ALTER TABLE apchk RENAME TO obsolete_apchk;
