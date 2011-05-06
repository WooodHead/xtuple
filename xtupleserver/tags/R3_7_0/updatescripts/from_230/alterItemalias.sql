BEGIN;

  UPDATE itemalias SET itemalias_usedescrip=FALSE WHERE (itemalias_usedescrip IS NULL);

  ALTER TABLE itemalias ADD FOREIGN KEY (itemalias_item_id) REFERENCES item (item_id);
  ALTER TABLE itemalias ADD UNIQUE (itemalias_item_id, itemalias_number);
  ALTER TABLE itemalias ALTER COLUMN itemalias_item_id SET NOT NULL;
  ALTER TABLE itemalias ALTER COLUMN itemalias_number SET NOT NULL;
  ALTER TABLE itemalias ALTER COLUMN itemalias_usedescrip SET NOT NULL;

COMMIT;
