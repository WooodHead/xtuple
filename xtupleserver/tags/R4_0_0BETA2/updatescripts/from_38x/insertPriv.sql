INSERT INTO priv (priv_module, priv_name, priv_descrip)
  SELECT 'Accounting','MaintainTaxRegistrations','Can Add/Edit/Delete Tax Registrations.'
    WHERE NOT EXISTS(SELECT 1
                       FROM priv WHERE priv_name = 'MaintainTaxRegistrations');
INSERT INTO priv (priv_module, priv_name, priv_descrip)
  SELECT 'Accounting','ViewTaxRegistrations','Can View Tax Registrations.'
    WHERE NOT EXISTS(SELECT 1
                       FROM priv WHERE priv_name = 'ViewTaxRegistrations');

