ALTER TABLE apopen ADD COLUMN apopen_status text;

ALTER TABLE apopen
ADD CONSTRAINT apopen_apopen_status_check
CHECK (apopen_status = 'O'::text OR apopen_status = 'H'::text OR apopen_status = 'C'::text);

UPDATE apopen
SET apopen_status = 'O'
WHERE (apopen_open)
AND (COALESCE(apopen_status, '') = '');

UPDATE apopen
SET apopen_status = 'C'
WHERE NOT(apopen_open)
AND (COALESCE(apopen_status, '') = '');

ALTER TABLE apopen
ADD CONSTRAINT apopen_apopen_status_notnull
CHECK (apopen_status IS NOT NULL);