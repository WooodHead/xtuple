BEGIN;

--  Make apopen docdate match g/l distribution date
UPDATE apopen SET apopen_docdate=
(SELECT COALESCE(MAX(gltrans_date),apopen_docdate)
  FROM gltrans
  WHERE (gltrans_journalnumber=apopen_journalnumber))
WHERE (apopen_docdate != 
(SELECT COALESCE(MAX(gltrans_date),apopen_docdate)
  FROM gltrans
  WHERE (gltrans_journalnumber=apopen_journalnumber)))

COMMIT;