-- Check to make sure there are no duplicate UOM name entries
-- Treat everything as UpperCase.
-- returns true if there are no duplicate entries.
SELECT COALESCE((SELECT FALSE FROM uom GROUP BY UPPER(uom_name) HAVING count(*) > 1), TRUE); 
