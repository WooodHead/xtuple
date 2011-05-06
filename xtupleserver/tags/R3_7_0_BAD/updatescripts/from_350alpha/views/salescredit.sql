BEGIN;

-- View: api.salescredit

SELECT dropIfExists('VIEW', 'salescredit', 'api');

CREATE OR REPLACE VIEW api.salescredit AS 
 SELECT custinfo.cust_number AS customer_number, aropen.aropen_docnumber AS cm_number, cohead.cohead_number AS so_number, aropenco.aropenco_amount::numeric(16,4) AS amount, curr.curr_abbr AS currency
   FROM aropenco
   LEFT JOIN aropen ON aropen.aropen_id = aropenco.aropenco_aropen_id
   LEFT JOIN custinfo ON custinfo.cust_id = aropen.aropen_cust_id
   LEFT JOIN cohead ON cohead.cohead_id = aropenco.aropenco_cohead_id
   LEFT JOIN curr_symbol curr ON curr.curr_id = aropenco.aropenco_curr_id;

ALTER TABLE api.salescredit OWNER TO "admin";
GRANT ALL ON TABLE api.salescredit TO "admin";
GRANT ALL ON TABLE api.salescredit TO xtrole;
COMMENT ON VIEW api.salescredit IS 'Payments (credit memos) pre-applied to sales orders';

-- Rules

-- Rule: ""_INSERT" ON api.salescredit"

-- DROP RULE "_INSERT" ON api.salescredit;

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.salescredit DO INSTEAD
    INSERT INTO aropenco VALUES ( 
    getaropenid( new.customer_number, 'C', new.cm_number ),
    getcoheadid(new.so_number),
    new.amount, getcurrid(new.currency) );

COMMIT;

