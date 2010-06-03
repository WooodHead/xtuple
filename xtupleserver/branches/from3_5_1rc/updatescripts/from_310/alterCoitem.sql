BEGIN;

ALTER TABLE coitem ADD COLUMN coitem_firm BOOLEAN;
UPDATE coitem SET coitem_firm=FALSE;
ALTER TABLE coitem ALTER coitem_firm SET NOT NULL;
ALTER TABLE coitem ALTER coitem_firm SET DEFAULT FALSE;

INSERT INTO priv (priv_module, priv_name, priv_descrip)
 VALUES ('Sales', 'FirmSalesOrder',
  'Can Firm a Sales Order line item to prevent editing');

COMMIT;