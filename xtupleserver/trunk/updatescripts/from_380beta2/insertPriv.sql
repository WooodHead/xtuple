INSERT INTO priv (priv_module, priv_name, priv_descrip) VALUES ('Accounting','VoidPostedVouchers','Can void posted A/P Vouchers.');
INSERT INTO priv (priv_module, priv_name, priv_descrip) VALUES ('Accounting','VoidPostedARCreditMemos','Can void posted A/R Credit Memos.');
INSERT INTO priv (priv_module, priv_name, priv_descrip) VALUES ('Accounting','VoidPostedInvoices','Can void posted A/R Invoices.');
UPDATE priv set priv_name='VoidPostedCashReceipts', priv_descrip='Can void posted A/R Cash Receipts.' where priv_name='ReversePostedCashReceipt';

