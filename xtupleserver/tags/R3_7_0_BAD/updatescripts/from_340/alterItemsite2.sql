ALTER TABLE itemsite ADD COLUMN itemsite_lsseq_id integer;
COMMENT ON COLUMN itemsite.itemsite_lsseq_id IS 'Foreign key reference for automatic lot/serial numbering';