
INSERT INTO priv
  (priv_module, priv_name, priv_descrip)
VALUES
  ('System', 'MaintainScripts',
   'Can Change or Create Scripts that are executed by windows when they are opened.');

INSERT INTO priv
  (priv_module, priv_name, priv_descrip)
VALUES
  ('System', 'MaintainUIForms',
   'Can Change or Create UI Forms that are executed by custom windows when they are opened.');

INSERT INTO priv (priv_module, priv_name, priv_descrip)
VALUES
  ('Inventory', 'AlterTransactionDates',
   'Can set the Transaction Date written to the G/L and Inventory History tables for inventory transactions.');
