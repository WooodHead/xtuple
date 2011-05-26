BEGIN;

UPDATE priv SET priv_module = 'Accounting'
 WHERE priv_name IN ('MaintainVouchers', 'PostVouchers', 'ViewVouchers');

COMMIT;

