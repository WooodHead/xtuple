DROP VIEW IF EXISTS api.apmemo          CASCADE;
DROP VIEW IF EXISTS api.armemo          CASCADE;
DROP VIEW IF EXISTS api.bom;
DROP VIEW IF EXISTS api.bomitem;
DROP VIEW IF EXISTS api.bomitemsubstitute;
DROP VIEW IF EXISTS api.budget;
DROP VIEW IF EXISTS api.budgetentry;
DROP VIEW IF EXISTS api.cashreceipt;
DROP VIEW IF EXISTS api.cashreceiptapply;
DROP VIEW IF EXISTS api.cashreceiptapplymisc;
DROP VIEW IF EXISTS api.creditmemo      CASCADE;
DROP VIEW IF EXISTS api.creditmemoline  CASCADE;
DROP VIEW IF EXISTS api.customer;
DROP VIEW IF EXISTS api.custshipto;
DROP VIEW IF EXISTS api.employee        CASCADE;
DROP VIEW IF EXISTS api.extshipmaint;
DROP VIEW IF EXISTS api.freightpricingscheduleitem;
DROP VIEW IF EXISTS api.invoice         CASCADE;
DROP VIEW IF EXISTS api.invoiceline     CASCADE;
DROP VIEW IF EXISTS api.item;
DROP VIEW IF EXISTS api.itemcost;
DROP VIEW IF EXISTS api.itemsite;
DROP VIEW IF EXISTS api.itemsource;
DROP VIEW IF EXISTS api.itemsourceprice;
DROP VIEW IF EXISTS api.itemsubstitute;
DROP VIEW IF EXISTS api.itemuomconversion;
DROP VIEW IF EXISTS api.journalentry;
DROP VIEW IF EXISTS api.plannedorder;
DROP VIEW IF EXISTS api.pricingscheduleitem;
DROP VIEW IF EXISTS api.pricingscheduleitemchar;
DROP VIEW IF EXISTS api.purchaseline    CASCADE;
DROP VIEW IF EXISTS api.purchaselinechar;
DROP VIEW IF EXISTS api.purchaseorder;
DROP VIEW IF EXISTS api.quote;
DROP VIEW IF EXISTS api.quoteline;
DROP VIEW IF EXISTS api.salescredit;
DROP VIEW IF EXISTS api.saleshistory;
DROP VIEW IF EXISTS api.salesline               CASCADE;
DROP VIEW IF EXISTS api.saleslinechar;
DROP VIEW IF EXISTS api.salesorder;
DROP VIEW IF EXISTS api.salesrep;
DROP VIEW IF EXISTS api.site;
DROP VIEW IF EXISTS api.task;
DROP VIEW IF EXISTS public.apchk;
DROP VIEW IF EXISTS public.apchkitem;
DROP VIEW IF EXISTS public.budget;
DROP VIEW IF EXISTS public.coship;
DROP VIEW IF EXISTS public.cosmisc;
DROP VIEW IF EXISTS public.creditmemoeditlist;
DROP VIEW IF EXISTS public.creditmemoitem       CASCADE;
DROP VIEW IF EXISTS public.cust;
DROP VIEW IF EXISTS public.invoiceitem;
DROP VIEW IF EXISTS public.ipsitem              CASCADE;
DROP VIEW IF EXISTS public.ipsprice;
DROP VIEW IF EXISTS api.lotserialreg;
DROP VIEW IF EXISTS public.orderitem;
DROP VIEW IF EXISTS public.porecv;
DROP VIEW IF EXISTS public.saleshistory;
DROP VIEW IF EXISTS public.saleshistorymisc;
DROP VIEW IF EXISTS public.shipto;
DROP VIEW IF EXISTS public.sopack;
DROP VIEW IF EXISTS public.warehous;
DROP VIEW IF EXISTS xtmfg.api_booitem;
DROP VIEW IF EXISTS xtpos.api_cashregister;
DROP VIEW IF EXISTS xtpos.api_sale;
DROP VIEW IF EXISTS xtpos.api_saleitem;

\i alter_currsymbol.sql
\i move_scales.sql
\i populate_curr_symbol.sql
\i alter_country.sql

\i ../../dbscripts/functions/getnumscale.sql

\i ../../dbscripts/types/xmoney.sql
\i ../../dbscripts/types/xcost.sql
\i ../../dbscripts/types/xpercent.sql
\i ../../dbscripts/types/xpurchp.sql
\i ../../dbscripts/types/xqty.sql
\i ../../dbscripts/types/xqtyper.sql
\i ../../dbscripts/types/xsalep.sql
\i ../../dbscripts/types/xuomratio.sql
\i ../../dbscripts/types/xweight.sql

\i ../../dbscripts/functions/abs.sql

\i ../../dbscripts/operators/star.sql
\i ../../dbscripts/operators/plus.sql
\i ../../dbscripts/operators/minus.sql
\i ../../dbscripts/operators/slash.sql

\i ../../dbscripts/operators/eq.sql
\i ../../dbscripts/operators/lt.sql
\i ../../dbscripts/operators/gt.sql
\i ../../dbscripts/operators/lt_eq.sql
\i ../../dbscripts/operators/gt_eq.sql
\i ../../dbscripts/operators/lt_gt.sql

\i ../../dbscripts/aggregates/max.sql
\i ../../dbscripts/aggregates/min.sql
\i ../../dbscripts/aggregates/sum.sql
\i ../../dbscripts/aggregates/avg.sql

\i alter_numerics.sql

