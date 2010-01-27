
SELECT dropIfExists('VIEW', 'purchaseline', 'api');
SELECT dropIfExists('VIEW', 'orderitem');
ALTER TABLE poitem ALTER COLUMN poitem_unitprice TYPE numeric(16,6);

