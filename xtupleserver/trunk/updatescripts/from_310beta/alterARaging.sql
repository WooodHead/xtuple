BEGIN;
DROP TYPE araging CASCADE;
CREATE TYPE araging AS
   (araging_docdate DATE,
    araging_duedate DATE,
    araging_ponumber TEXT,
    araging_docnumber TEXT,
    araging_doctype TEXT,
    araging_cust_id INTEGER,
    araging_cust_number TEXT,
    araging_cust_name TEXT,
    araging_cust_custtype_id INTEGER,
    araging_custtype_code TEXT,
    araging_terms_descrip TEXT,
    araging_aropen_amount TEXT,
    araging_cur_amt TEXT,
    araging_cur_val NUMERIC,
    araging_thirty_amt TEXT,
    araging_thirty_val NUMERIC,
    araging_sixty_amt TEXT,
    araging_sixty_val NUMERIC,
    araging_ninety_amt TEXT,
    araging_ninety_val NUMERIC,
    araging_plus_amt TEXT,
    araging_plus_val NUMERIC,
    araging_total_amt TEXT,
    araging_total_val NUMERIC);

COMMIT;