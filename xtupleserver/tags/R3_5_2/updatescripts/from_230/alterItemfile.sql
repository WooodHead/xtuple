BEGIN;

ALTER TABLE itemfile ADD FOREIGN KEY (itemfile_item_id) REFERENCES item (item_id);

COMMIT;