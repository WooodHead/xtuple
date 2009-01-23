BEGIN;

INSERT INTO priv (priv_module, priv_name, priv_descrip) VALUES ('Sales', 'ModifyFirmedSalesOrders', 'Can modify sales orders that have been firmed.');

COMMIT;