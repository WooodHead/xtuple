BEGIN;

ALTER TABLE poitem DISABLE TRIGGER poitemTrigger;

ALTER TABLE poitem ALTER poitem_wohead_id DROP NOT NULL;

--Clean up data
UPDATE poitem SET poitem_itemsite_id=NULL WHERE poitem_itemsite_id = -1;
UPDATE poitem SET poitem_expcat_id=NULL WHERE poitem_expcat_id = -1;
UPDATE poitem SET poitem_itemsrc_id=NULL WHERE poitem_itemsrc_id= -1;
UPDATE poitem SET poitem_wohead_id=NULL WHERE poitem_wohead_id= -1;
UPDATE poitem SET poitem_prj_id=NULL WHERE poitem_prj_id=-1;
--These references might have been purged or deleted because the system allowed that
--We'll save users some pain and take care of potential problems for them
UPDATE poitem SET poitem_itemsrc_id=NULL WHERE poitem_itemsrc_id NOT IN (
  SELECT itemsrc_id FROM itemsrc WHERE (poitem_itemsrc_id=itemsrc_id));
UPDATE poitem SET poitem_wohead_id=NULL WHERE poitem_wohead_id NOT IN (
  SELECT wo_id FROM wo WHERE (poitem_wohead_id=wo_id));

--Copy unimplemented columns to temp table just in case
CREATE TABLE obsolete_poitemcol (
poitem_id INTEGER,
poitem_vend_id INTEGER,
poitem_nocharge BOOLEAN,
poitem_date_promise DATE,
poitem_date_lastreceive DATE,
poitem_date_lastreturn DATE,
poitem_date_closed DATE
);

COMMENT ON TABLE obsolete_poitemcol IS 'Backup table to store any data in columns that appear
to have never been implemented and will be dropped.  If no objections surface, this table can be dropped by v. 4.0';

INSERT INTO obsolete_poitemcol (
poitem_id,poitem_vend_id,
poitem_nocharge,poitem_date_promise,
poitem_date_lastreceive,poitem_date_lastreturn,
poitem_date_closed)
SELECT
poitem_id,poitem_vend_id,
poitem_nocharge,poitem_date_promise,
poitem_date_lastreceive,poitem_date_lastreturn,
poitem_date_closed
FROM poitem
WHERE ((poitem_nocharge IS NOT NULL) 
OR (poitem_vend_id IS NOT NULL)
OR (poitem_date_promise IS NOT NULL)
OR (poitem_date_lastreceive IS NOT NULL)
OR (poitem_date_lastreturn IS NOT NULL)
OR (poitem_date_closed IS NOT NULL));

--Remove unimplemented columns
ALTER TABLE poitem DROP COLUMN poitem_vend_id;
ALTER TABLE poitem DROP COLUMN poitem_nocharge;
ALTER TABLE poitem DROP COLUMN poitem_date_promise;
ALTER TABLE poitem DROP COLUMN poitem_date_lastreceive;
ALTER TABLE poitem DROP COLUMN poitem_date_lastreturn;
ALTER TABLE poitem DROP COLUMN poitem_date_closed;
ALTER TABLE poitem ALTER COLUMN poitem_wohead_id DROP DEFAULT;

--Add Constraints
ALTER TABLE poitem ADD FOREIGN KEY (poitem_itemsite_id) REFERENCES itemsite (itemsite_id); 
ALTER TABLE poitem ADD FOREIGN KEY (poitem_expcat_id) REFERENCES expcat (expcat_id);
ALTER TABLE poitem ADD FOREIGN KEY (poitem_wohead_id) REFERENCES wo (wo_id);
ALTER TABLE poitem ADD FOREIGN KEY (poitem_prj_id) REFERENCES prj (prj_id);
ALTER TABLE poitem ADD FOREIGN KEY (poitem_itemsrc_id) REFERENCES itemsrc (itemsrc_id);
ALTER TABLE poitem ADD CHECK (poitem_status IN ('U','O','C'));
ALTER TABLE poitem ADD UNIQUE (poitem_pohead_id,poitem_linenumber);

ALTER TABLE poitem ENABLE TRIGGER poitemTrigger;

COMMIT;
