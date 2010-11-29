-- bug 5813
ALTER TABLE whsinfo ADD CHECK
   ((warehous_transit AND warehous_costcat_id IS NOT NULL)
 OR (NOT warehous_transit));
