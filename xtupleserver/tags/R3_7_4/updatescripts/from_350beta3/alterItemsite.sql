UPDATE itemsite SET itemsite_ordergroup = 1 WHERE itemsite_ordergroup <= 0;
ALTER TABLE itemsite ALTER COLUMN itemsite_ordergroup SET DEFAULT 1;
ALTER TABLE itemsite ADD CHECK (itemsite_ordergroup > 0);
