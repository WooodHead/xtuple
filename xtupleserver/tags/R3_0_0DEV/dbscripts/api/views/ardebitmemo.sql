
/*
select * from api.ardebitmemo 
insert into api.ardebitmemo 
values('1010',111,'1111','2008-03-29',1000,'NOTES','PREPAY',
'NORMAL','01-01-1000-01','2008-03-29','NET30',10,'111')
*/

BEGIN;

-- AR DEbit memo
DROP VIEW api.ardebitmemo;
CREATE VIEW api.ardebitmemo
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
sc.salescat_name,
--aropen_accnt_id, --
formatglaccount(acc.accnt_id) as acct_id,
aro.aropen_duedate,
--aropen_terms_id, --
term.terms_code,
sp.salesrep_number,
aro.aropen_commission_due
FROM aropen aro,custinfo cust,rsncode rsn,terms term, salesrep sp,accnt acc
,salescat sc

WHERE aro.aropen_cust_id = cust.cust_id
AND aro.aropen_terms_id = term.terms_id
AND aro.aropen_salesrep_id = sp.salesrep_id
AND aro.aropen_rsncode_id = rsn.rsncode_id
AND aro.aropen_accnt_id = acc.accnt_id
AND aro.aropen_doctype = 'D';


GRANT ALL ON TABLE api.ardebitmemo TO openmfg;
COMMENT ON VIEW api.ardebitmemo IS 'AR Debit Memo';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.ardebitmemo DO INSTEAD

select createardebitmemo(
getCustId(NEW.cust_number), 
NEW.aropen_docnumber,
NEW.aropen_ordernumber,
NEW.aropen_docdate, 
NEW.aropen_amount,
NEW.aropen_notes,
--NEW.aropen_rsncode_id,
getRsnId(NEW.rsncode_code),
--NEW.aropen_salescat_id,
getSalesCatId(NEW.salescat_name),
--NEW.aropen_accnt_id,
getGlAccntId(NEW.acct_id),
NEW.aropen_duedate,
--NEW.aropen_terms_id,
getTermsId(NEW.terms_code), ------------
getSalesRepId(NEW.salesrep_number),
NEW.aropen_commission_due
);

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.ardebitmemo DO INSTEAD

  NOTHING;
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.ardebitmemo DO INSTEAD

  NOTHING;


COMMIT;
