BEGIN;

ALTER TABLE bankrec ADD COLUMN bankrec_postdate timestamp;

UPDATE bankrec SET bankrec_postdate = bankrec_created WHERE bankrec_posted;

COMMIT;