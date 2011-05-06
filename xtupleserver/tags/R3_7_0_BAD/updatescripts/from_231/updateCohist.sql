BEGIN;

--Correct data for log 6557

UPDATE cohist SET cohist_qtyshipped = (cohist_qtyshipped + 1) * -1
WHERE ((cohist_doctype = 'C')
AND (cohist_qtyshipped > 0));

COMMIT;