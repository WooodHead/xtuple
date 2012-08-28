ALTER TABLE ipsprodcat ADD COLUMN ipsprodcat_type CHAR(1);
ALTER TABLE ipsprodcat ADD COLUMN ipsprodcat_warehous_id INTEGER;
UPDATE ipsprodcat SET ipsprodcat_type='D'; 
