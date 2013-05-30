BEGIN;

UPDATE priv SET priv_module='Accounting' WHERE priv_name in ('MaintainTerms','PostARDocuments','PrintInvoices');

COMMIT;