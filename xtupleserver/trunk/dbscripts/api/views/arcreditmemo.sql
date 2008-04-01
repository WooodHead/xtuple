BEGIN;

-- AR Credit memo
DROP VIEW api.arcreditmemo;
CREATE VIEW api.arcreditmemo
AS 

SELECT 
cust.cust_number,  --
aro.aropen_docnumber,
aro.aropen_ordernumber,
aro.aropen_docdate, 
aro.aropen_amount,
aro.aropen_notes,
--aropen_rsncode_id, --
rsn.rsncode_code, 
--aro.aropen_salescat_id, --
--aropen_accnt_id, --
acc.accnt_number,
aro.aropen_duedate,
--aropen_terms_id, --
term.terms_code,
sp.salesrep_number,
aro.aropen_commission_due
FROM aropen aro,custinfo cust,rsncode rsn,terms term, salesrep sp,accnt acc
WHERE aro.aropen_cust_id = cust.cust_id
AND aro.aropen_terms_id = term.terms_id
AND aro.aropen_salesrep_id = sp.salesrep_id
AND aro.aropen_rsncode_id = rsn.rsncode_id
AND aro.aropen_accnt_id = acc.accnt_id
AND aro.aropen_doctype = 'C'


GRANT ALL ON TABLE api.arcreditmemo TO openmfg;
COMMENT ON VIEW api.arcreditmemo IS 'AR Credit Memo';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.arcreditmemo DO INSTEAD

select createARCebitMemo(
getCustId(NEW.cust_number), 
NEW.aropen_docnumber,
NEW.aropen_ordernumber,
NEW.aropen_docdate, 
NEW.aropen_amount,
NEW.aropen_notes,
--NEW.aropen_rsncode_id,
getRsnId(NEW.rsncode_code),
--NEW.aropen_accnt_id,
getGlAccntId(NEW.accnt_number),
NEW.aropen_duedate,
--NEW.aropen_terms_id,
getItemId(NEW.terms_code)
getSalesRepId(NEW.salesrep_number),
NEW.aropen_commission_due
);

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.arcreditmemo DO INSTEAD

  NOTHING;
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.arcreditmemo DO INSTEAD

  NOTHING;


COMMIT;
