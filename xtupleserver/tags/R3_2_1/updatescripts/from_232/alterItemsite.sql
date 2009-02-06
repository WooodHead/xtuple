BEGIN;

ALTER TABLE itemsite ADD COLUMN itemsite_warrpurc BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE itemsite ADD COLUMN itemsite_autoreg BOOLEAN DEFAULT FALSE;

ALTER TABLE itemsite DROP CONSTRAINT itemsite_itemsite_abcclass_check;
ALTER TABLE itemsite ADD CHECK (itemsite_abcclass IN ('A','B','C','T'));

COMMIT;
