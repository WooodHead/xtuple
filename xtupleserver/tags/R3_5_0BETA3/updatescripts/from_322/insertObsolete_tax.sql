INSERT INTO obsolete_tax
SELECT tax_id, tax_code, tax_descrip, tax_ratea, tax_sales_accnt_id, tax_freight, tax_cumulative, tax_rateb, tax_salesb_accnt_id, tax_ratec, tax_salesc_accnt_id
FROM tax;