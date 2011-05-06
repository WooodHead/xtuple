BEGIN;

--For Issue 6568
SELECT postintotrialbalance(gltrans_sequence)
FROM gltrans
WHERE (NOT gltrans_posted);

END;