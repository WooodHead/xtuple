BEGIN;

-- Fix data corruption caused by Issues #8703 and #7628.  
-- invhist_posted was not set to true when inventory thawed
-- set invhist_posted to true

UPDATE invhist SET invhist_posted=true
WHERE NOT invhist_posted AND invhist_itemsite_id IN (SELECT itemsite_id
                                                     FROM itemsite
                                                     WHERE NOT itemsite_freeze);

COMMIT;