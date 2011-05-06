BEGIN;

UPDATE apopen SET apopen_closedate=NULL WHERE apopen_open AND apopen_closedate IS NOT NULL;

COMMIT;