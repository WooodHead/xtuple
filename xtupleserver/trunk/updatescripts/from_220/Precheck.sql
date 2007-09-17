-- look for transit warehouses with missing cost categories - c.f. bug 5813
-- if the following select returns TRUE then 
-- warn the user that s/he must set cost categories for all transit warehouses
-- before upgrading
SELECT count(*) > 0
FROM whsinfo
WHERE (warehous_transit
  AND (warehous_costcat_id IS NULL
    OR warehous_costcat_id NOT IN (SELECT costcat_id
				   FROM costcat))
  );
