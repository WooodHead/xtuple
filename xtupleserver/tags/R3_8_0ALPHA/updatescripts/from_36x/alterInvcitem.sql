ALTER TABLE invcitem ADD COLUMN invcitem_updateinv BOOLEAN;
ALTER TABLE invcitem ALTER COLUMN invcitem_updateinv SET DEFAULT false;
