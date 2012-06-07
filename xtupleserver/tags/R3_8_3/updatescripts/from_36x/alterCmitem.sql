ALTER TABLE cmitem ADD COLUMN cmitem_updateinv BOOLEAN;
UPDATE cmitem SET cmitem_updateinv=true;
ALTER TABLE cmitem ALTER COLUMN cmitem_updateinv SET NOT NULL;
ALTER TABLE cmitem ALTER COLUMN cmitem_updateinv SET DEFAULT true;
