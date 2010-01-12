
SELECT dropIfExists('VIEW', 'itemsourceprice', 'api');
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_price TYPE numeric(16,6);

