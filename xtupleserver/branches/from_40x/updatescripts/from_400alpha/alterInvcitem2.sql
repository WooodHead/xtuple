select dropifexists('VIEW', 'invoiceline', 'api', true);
select dropifexists('VIEW', 'invoiceitem', 'public', true);
alter table invcitem alter column invcitem_ordered type numeric(20,6);
alter table invcitem alter column invcitem_billed type numeric(20,6);
