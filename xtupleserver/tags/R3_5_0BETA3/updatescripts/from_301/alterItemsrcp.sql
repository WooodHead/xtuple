BEGIN;

UPDATE itemsrcp SET itemsrcp_curr_id=basecurrid() WHERE (itemsrcp_curr_id IS NULL);

ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_itemsrc_id SET NOT NULL;
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_curr_id SET NOT NULL;
ALTER TABLE itemsrcp ADD FOREIGN KEY (itemsrcp_itemsrc_id) REFERENCES itemsrc (itemsrc_id) ON DELETE CASCADE;
ALTER TABLE itemsrcp ADD UNIQUE (itemsrcp_itemsrc_id,itemsrcp_qtybreak);

COMMIT;