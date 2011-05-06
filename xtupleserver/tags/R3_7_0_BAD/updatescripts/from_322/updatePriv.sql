UPDATE priv
SET priv_name = 'MaintainTaxAssignments', priv_descrip = 'Can Add/Edit/Delete Tax Assignments'
WHERE ((priv_name = 'MaintainTaxSel')
  AND (priv_module = 'Accounting'));

UPDATE priv
SET priv_name = 'ViewTaxAssignments', priv_descrip = 'Can View Tax Assignments'
WHERE ((priv_name = 'ViewTaxSel')
  AND (priv_module = 'Accounting'));