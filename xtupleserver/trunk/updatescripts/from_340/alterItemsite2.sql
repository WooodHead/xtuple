ALTER TABLE itemsite ADD COLUMN itemsite_autolsnum boolean default false;
COMMENT ON COLUMN itemsite.itemsite_autolsnum IS 'Enable automatic lot/serial numbering';