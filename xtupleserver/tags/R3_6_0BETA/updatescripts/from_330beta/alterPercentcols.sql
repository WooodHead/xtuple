BEGIN;

SELECT dropIfExists('VIEW', 'customer', 'api', true);
SELECT dropIfExists('VIEW', 'cust', 'public', true);
SELECT dropIfExists('VIEW', 'ipsprice', 'public', true);
SELECT dropIfExists('VIEW', 'pricingscheduleitem', 'api', true);
ALTER TABLE taxhist ALTER COLUMN taxhist_percent TYPE NUMERIC(10,6);
ALTER TABLE taxrate ALTER COLUMN taxrate_percent TYPE NUMERIC(10,6);
ALTER TABLE custinfo ALTER COLUMN cust_commprcnt TYPE NUMERIC (10,6);
ALTER TABLE custinfo ALTER COLUMN cust_discntprcnt TYPE NUMERIC (10,6);
ALTER TABLE terms ALTER COLUMN terms_discprcnt TYPE NUMERIC (10,6);
ALTER TABLE ipsprodcat ALTER COLUMN ipsprodcat_discntprcnt TYPE NUMERIC (10,6);

COMMIT;