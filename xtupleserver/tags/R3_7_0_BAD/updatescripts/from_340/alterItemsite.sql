ALTER TABLE itemsite ADD COLUMN itemsite_cosdefault CHARACTER(1);
ALTER TABLE itemsite ADD COLUMN itemsite_createsopr boolean DEFAULT false;
COMMENT ON COLUMN itemsite.itemsite_createsopr IS 'Used to flag Sales items that create P/Rs';
UPDATE itemsite SET itemsite_createsopr = TRUE WHERE itemsite_createpr = TRUE;
ALTER TABLE itemsite ADD COLUMN itemsite_createsopo boolean DEFAULT false;
COMMENT ON COLUMN itemsite.itemsite_createsopo IS 'Used to flag Sales items that create P/Os';
ALTER TABLE itemsite ADD COLUMN itemsite_dropship boolean DEFAULT false;
COMMENT ON COLUMN itemsite.itemsite_dropship IS 'Used to flag Sales items to drop ship';