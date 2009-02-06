BEGIN;
SELECT dropIfExists('TABLE', 'backup_payco');
CREATE TABLE backup_payco AS SELECT * FROM payco;

SELECT ccpay_status, payco.* FROM payco LEFT OUTER JOIN ccpay ON (payco_ccpay_id=ccpay_id);

DELETE FROM payco
WHERE ((payco_cohead_id NOT IN (SELECT cohead_id FROM cohead))
     OR (payco_ccpay_id NOT IN (SELECT ccpay_id FROM ccpay)));

ALTER TABLE payco ADD FOREIGN KEY (payco_ccpay_id)  REFERENCES ccpay(ccpay_id);
ALTER TABLE payco ADD FOREIGN KEY (payco_cohead_id) REFERENCES cohead(cohead_id);
ALTER TABLE payco DROP CONSTRAINT payco_pkey;

SELECT ccpay_status, payco.* FROM payco LEFT OUTER JOIN ccpay ON (payco_ccpay_id=ccpay_id);

COMMIT;
