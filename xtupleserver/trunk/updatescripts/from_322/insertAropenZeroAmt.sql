BEGIN;

--  This query inserts records into aropen for invoices and credit memos with zero amounts so 
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
      WHERE ((invchead_posted)
      AND (aropen_id IS NULL))) AS data
WHERE (invoicetotal(invchead_id) = 0);

INSERT INTO aropen
  ( aropen_id, aropen_username, 
    aropen_open, aropen_posted,
    aropen_cust_id, aropen_ponumber,
    aropen_docnumber, aropen_applyto, aropen_doctype,
    aropen_docdate, aropen_duedate, aropen_distdate, aropen_terms_id,
    aropen_amount, aropen_paid,
    aropen_salesrep_id, aropen_commission_due, aropen_commission_paid,
    aropen_ordernumber, aropen_notes,
    aropen_rsncode_id, aropen_curr_id, aropen_closedate )
SELECT nextval('aropen_aropen_id_seq'), CURRENT_USER,
    FALSE, FALSE,
    cmhead_cust_id, cmhead_custponumber,
    cmhead_number, cmhead_number, 'C',
    cmhead_docdate, cmhead_docdate, cmhead_gldistdate, -1,
    0, 0, 
    cmhead_salesrep_id, 0, FALSE,
    cmhead_number::text, cmhead_comments,
    cmhead_rsncode_id, cmhead_curr_id, cmhead_docdate
FROM (SELECT * 
      FROM cmhead
        LEFT OUTER JOIN aropen ON ((aropen_docnumber=cmhead_invcnumber)
                               AND (aropen_doctype='C'))
      WHERE ((cmhead_posted)
      AND (aropen_id IS NULL))) AS data
WHERE (creditmemototal(cmhead_id) = 0);


COMMIT;