BEGIN;

DROP VIEW creditmemoeditlist;
DROP VIEW creditmemoitem;
DROP view invoiceitem;
ALTER TABLE taxhist ALTER COLUMN taxhist_tax TYPE NUMERIC(16,6);
ALTER TABLE taxhist ADD COLUMN taxhist_journalnumber INTEGER;

COMMIT;