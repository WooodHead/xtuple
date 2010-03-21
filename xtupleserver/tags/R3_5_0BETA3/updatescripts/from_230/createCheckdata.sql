BEGIN;

CREATE TYPE checkdata AS (
  checkdata_page INTEGER,
  checkdata_checknumber TEXT,
  checkdata_checkwords TEXT,
  checkdata_checkdate TEXT,
  checkdata_checkamount TEXT,
  checkdata_checkcurrsymbol TEXT,
  checkdata_checkcurrabbr TEXT,
  checkdata_checkcurrname TEXT,
  checkdata_checkpayto TEXT,
  checkdata_checkaddress TEXT,
  checkdata_checkmemo TEXT,
  checkdata_docnumber TEXT,
  checkdata_docreference TEXT,
  checkdata_docdate TEXT,
  checkdata_docamount TEXT,
  checkdata_docdiscount TEXT,
  checkdata_docnetamount TEXT
);

COMMIT;

