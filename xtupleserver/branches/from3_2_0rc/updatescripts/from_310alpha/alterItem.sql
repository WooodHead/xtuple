BEGIN;

ALTER TABLE item DROP CONSTRAINT "item_item_type_check";
ALTER TABLE item ADD CONSTRAINT "item_item_type_check" CHECK (item_type IN ('P', 'M', 'F', 'J', 'O', 'R', 'S', 'T', 'B', 'L', 'Y', 'C', 'K'));

COMMIT;
