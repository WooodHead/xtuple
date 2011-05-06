UPDATE invchead SET
  invchead_shipchrg_id=cohead_shipchrg_id
FROM cohead
WHERE ((cohead_number=invchead_ordernumber)
AND (invchead_shipchrg_id IS NULL));