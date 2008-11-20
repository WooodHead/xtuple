BEGIN;

ALTER TABLE coitem DISABLE TRIGGER soitemtrigger;
ALTER TABLE coitem DISABLE TRIGGER soitemaftertrigger;  
  
--Remove invalid coitem records
DELETE FROM coitem WHERE coitem_cohead_id NOT IN (SELECT cohead_id FROM cohead WHERE cohead_id=coitem_cohead_id);

--Alter table
UPDATE coitem SET coitem_unitcost=0 WHERE (coitem_unitcost IS NULL);
ALTER TABLE coitem ADD UNIQUE (coitem_cohead_id,coitem_linenumber);
ALTER TABLE coitem ADD FOREIGN KEY (coitem_itemsite_id) REFERENCES itemsite (itemsite_id); 
ALTER TABLE coitem ADD FOREIGN KEY (coitem_substitute_item_id) REFERENCES itemsite (itemsite_id); 
ALTER TABLE coitem ADD FOREIGN KEY (coitem_cohead_id) REFERENCES cohead (cohead_id) ON DELETE CASCADE;
ALTER TABLE coitem ADD CHECK (coitem_status IN ('O','C','X'));
ALTER TABLE coitem ALTER coitem_linenumber SET NOT NULL;
ALTER TABLE coitem ALTER coitem_unitcost SET NOT NULL;

ALTER TABLE coitem ENABLE TRIGGER soitemtrigger;
ALTER TABLE coitem ENABLE TRIGGER soitemaftertrigger;  

COMMIT;