BEGIN;

ALTER TABLE arapply ADD COLUMN arapply_distdate DATE;
UPDATE arapply SET arapply_distdate=gltrans_date
FROM gltrans
WHERE (arapply_journalnumber=CAST(gltrans_journalnumber AS text));
UPDATE arapply SET arapply_distdate=arapply_postdate 
WHERE (arapply_distdate IS NULL);
ALTER TABLE arapply ALTER COLUMN arapply_distdate SET NOT NULL;

END;