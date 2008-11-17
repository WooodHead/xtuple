BEGIN;

ALTER TABLE aropen ADD COLUMN aropen_distdate DATE;

UPDATE aropen SET aropen_distdate=(SELECT gltrans_date
                                   FROM gltrans
                                   WHERE (gltrans_journalnumber=aropen_journalnumber)
                                   LIMIT 1);

COMMIT;
