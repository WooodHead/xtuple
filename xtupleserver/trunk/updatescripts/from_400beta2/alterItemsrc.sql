ALTER TABLE itemsrc ADD COLUMN itemsrc_effective DATE;
ALTER TABLE itemsrc ADD COLUMN itemsrc_expires DATE;
ALTER TABLE itemsrc ADD COLUMN itemsrc_contrct_id INTEGER REFERENCES contrct(contrct_id);

UPDATE itemsrc SET itemsrc_effective=startOfTime(), itemsrc_expires=endOfTime();

ALTER TABLE itemsrc ALTER COLUMN itemsrc_effective SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_effective SET DEFAULT startOfTime();
ALTER TABLE itemsrc ALTER COLUMN itemsrc_expires SET NOT NULL;
ALTER TABLE itemsrc ALTER COLUMN itemsrc_expires SET DEFAULT endOfTime();

ALTER TABLE itemsrc DROP CONSTRAINT itemsrc_itemsrc_vend_id_key;
ALTER TABLE itemsrc ADD CONSTRAINT itemsrc_itemsrc_vend_id_key UNIQUE
  (itemsrc_vend_id, itemsrc_item_id, itemsrc_effective, itemsrc_expires,
   itemsrc_vend_item_number, itemsrc_manuf_name, itemsrc_manuf_item_number);
