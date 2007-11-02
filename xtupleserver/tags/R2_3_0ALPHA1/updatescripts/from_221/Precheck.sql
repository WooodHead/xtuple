-- Check to make sure there are no duplicate UOM name entries
-- Treat everything as UpperCase.
-- returns true if there are no duplicate entries.
SELECT COALESCE((SELECT FALSE FROM uom GROUP BY UPPER(uom_name) HAVING count(*) > 1), TRUE); 

-- look for potential problems populating the checkhead table
-- ApchkUpgradePrereqs
-- There is a check for a non-existent vendor
-- or	                a non-existent bank account
-- or                   a 0 or negative amount
-- or                   a non-existent expense category
SELECT COUNT(*) = 0
FROM apchk
WHERE NOT apchk_deleted
  AND ((apchk_vend_id NOT IN (SELECT vend_id FROM vendinfo)
	     AND apchk_vend_id > 0)
	OR  (apchk_bankaccnt_id NOT IN (SELECT bankaccnt_id FROM bankaccnt)
	     AND apchk_bankaccnt_id > 0)
	OR  (apchk_expcat_id NOT IN (SELECT expcat_id FROM expcat)
	     AND apchk_expcat_id > 0)
      );

-- look for potential problems populating the checkitem table
-- ApchkItemUpgradePrereqs
-- There is a check item with no corresponding check
-- or                         a non-existent apopen
SELECT COUNT(*) = 0
FROM apchkitem LEFT OUTER JOIN apchk ON (apchkitem_apchk_id=apchk_id)
WHERE ((apchk_id IS NULL)
  OR   (apchkitem_apopen_id NOT IN (SELECT apopen_id FROM apopen)
	AND apchkitem_apopen_id > 0)
      );
