BEGIN;

  ALTER TABLE itemalias ADD UNIQUE (itemalias_item_id, itemalias_number);
  ALTER TABLE itemalias ALTER COLUMN itemalias_usedescrip SET NOT NULL;

COMMIT;