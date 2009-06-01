BEGIN;

--  This query inserts records into aropen for invoices with zero amounts so 
--  we can streamline queries concerning aropen history

INSERT INTO aropen
  ( aropen_id, aropen_username, 
    aropen_open, aropen_posted,
    aropen_cust_id, aropen_ponumber,
    aropen_docnumber, aropen_applyto, aropen_doctype,
    aropen_docdate, aropen_duedate, aropen_distdate, aropen_terms_id,
    aropen_amount, aropen_paid,
    aropen_salesrep_id, aropen_commission_due, aropen_commission_paid,
    aropen_ordernumber, aropen_notes, aropen_cobmisc_id,
    aropen_curr_id, aropen_closedate )
SELECT nextval('aropen_aropen_id_seq'), CURRENT_USER,
    FALSE, FALSE,
    invchead_cust_id, invchead_ponumber,
    invchead_invcnumber, invchead_invcnumber, 'I',
    invchead_invcdate, determineDueDate(invchead_terms_id, invchead_invcdate), invchead_gldistdate, invchead_terms_id,
    0, 0, 
    invchead_salesrep_id, 0, FALSE,
    invchead_ordernumber::text, invchead_notes, invchead_id,
    invchead_curr_id, invchead_invcdate
FROM (SELECT * 
      FROM invchead
        LEFT OUTER JOIN aropen ON ((aropen_docnumber=invchead_invcnumber)
                               AND (aropen_doctype='I'))
      WHERE (aropen_id IS NULL)) AS data
WHERE (invoicetotal(invchead_id) = 0);

COMMIT;