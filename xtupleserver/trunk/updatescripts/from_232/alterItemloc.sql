BEGIN;

ALTER TABLE itemloc ADD COLUMN itemloc_ls_id INTEGER;
ALTER TABLE itemloc ALTER COLUMN itemloc_lotserial DROP NOT NULL;
ALTER TABLE itemloc ADD COLUMN itemloc_warrpurc DATE;

COMMIT;